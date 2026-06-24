import { list, put } from '@vercel/blob';
import { getRole } from '../../../lib/auth.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MANIFEST = 'voyages21/produits-manifest.json';

function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || ('voyage-' + Date.now());
}

// Le catalogue n'est modifiable que par le propriétaire (l'équipe n'y touche pas).
async function denyIfNotOwner(request, headers) {
  if ((await getRole(request)) === 'owner') return null;
  return Response.json({ ok: false, error: 'non autorisé' }, { status: 401, headers });
}

async function readManifest() {
  const empty = { custom: {}, status: {}, pending: {} };
  const { blobs } = await list({ prefix: MANIFEST, limit: 1 });
  const hit = blobs.find((b) => b.pathname === MANIFEST);
  if (!hit) return { ...empty };
  // Le CDN Blob sert l'ancienne version après un overwrite (même URL) : on
  // casse le cache avec un paramètre unique pour toujours relire la dernière
  // version (sinon une suppression/un badge semble « ne pas prendre »).
  const fresh = hit.url + (hit.url.includes('?') ? '&' : '?') + 'ts=' + Date.now();
  const res = await fetch(fresh, { cache: 'no-store' });
  if (!res.ok) return { ...empty };
  const data = await res.json();
  return { ...empty, ...data };
}

async function writeManifest(data) {
  await put(MANIFEST, JSON.stringify(data), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

// Supprimer aussi l'entrée média du voyage (synchro Produits → Médias).
// Le manifeste des médias est un blob séparé (media-manifest.json).
const MEDIA_MANIFEST = 'media-manifest.json';
async function removeMediaEntry(key) {
  try {
    const { blobs } = await list({ prefix: MEDIA_MANIFEST, limit: 1 });
    const hit = blobs.find((b) => b.pathname === MEDIA_MANIFEST);
    if (!hit) return;
    const res = await fetch(hit.url + '?ts=' + Date.now(), { cache: 'no-store' });
    if (!res.ok) return;
    const media = await res.json();
    if (media && Object.prototype.hasOwnProperty.call(media, key)) {
      delete media[key];
      await put(MEDIA_MANIFEST, JSON.stringify(media), {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
        allowOverwrite: true,
      });
    }
  } catch {
    // best-effort : si la médiathèque n'est pas joignable, on n'échoue pas la suppression du voyage
  }
}

const corsHeaders = {
  'Cache-Control': 'no-store',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

// GET /api/produits              → manifeste complet
// GET /api/produits?slug=xxx     → fiche produit unique
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');
    const data = await readManifest();
    if (slug) {
      const product = (data.custom || {})[slug];
      if (!product) {
        return Response.json({ ok: false, error: 'not found' }, { status: 404, headers: corsHeaders });
      }
      return Response.json({ ok: true, product }, { headers: corsHeaders });
    }
    // La file « en attente » (soumissions équipe) n'est visible que du propriétaire.
    const out = { custom: data.custom || {}, status: data.status || {} };
    if ((await getRole(request)) === 'owner') out.pending = data.pending || {};
    return Response.json(out, { headers: corsHeaders });
  } catch {
    return Response.json({ custom: {}, status: {} }, { headers: corsHeaders });
  }
}

// POST /api/produits
//   { submit: true, product }  → soumission équipe (tombe EN ATTENTE de validation)
//   { slug, product }          → publication directe d'un produit (propriétaire)
export async function POST(request) {
  const role = await getRole(request);
  try {
    const body = await request.json();

    // Soumission par l'équipe : le voyage n'est PAS publié, il attend la validation de Karim.
    if (body.submit && body.product) {
      if (role !== 'owner' && role !== 'team') {
        return Response.json({ ok: false, error: 'non autorisé' }, { status: 401, headers: corsHeaders });
      }
      const data = await readManifest();
      const id = 'sub-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);
      data.pending[id] = {
        id,
        product: body.product,
        title: body.product.title || '',
        submittedAt: new Date().toISOString(),
      };
      await writeManifest(data);
      return Response.json({ ok: true, id }, { headers: corsHeaders });
    }

    // Publication directe : propriétaire uniquement.
    if (role !== 'owner') {
      return Response.json({ ok: false, error: 'non autorisé' }, { status: 401, headers: corsHeaders });
    }
    if (!body.slug || !body.product) {
      return Response.json({ ok: false, error: 'slug et product requis' }, { status: 400, headers: corsHeaders });
    }
    const slug = slugify(body.slug);
    const data = await readManifest();
    // mediaKey = slug : le voyage est géré dans Admin Médias sous cette clé
    // (le site lit ses photos/vidéos via mediaKey).
    data.custom[slug] = { ...body.product, slug, mediaKey: slug, createdAt: new Date().toISOString() };
    await writeManifest(data);
    return Response.json({ ok: true, slug }, { headers: corsHeaders });
  } catch (e) {
    return Response.json(
      { ok: false, error: String((e && e.message) || e) },
      { status: 500, headers: corsHeaders },
    );
  }
}

// PUT /api/produits
//   { type: 'status', slug, status: { badge, badgeColor, hidden } }  → statut
//   { slug, product }                                                  → modifier produit custom
export async function PUT(request) {
  const denied = await denyIfNotOwner(request, corsHeaders);
  if (denied) return denied;
  try {
    const body = await request.json();
    const data = await readManifest();

    // Valider une soumission équipe → publie le voyage et le retire de la file.
    if (body.action === 'validate' && body.id) {
      const sub = data.pending[body.id];
      if (!sub) {
        return Response.json({ ok: false, error: 'soumission introuvable' }, { status: 404, headers: corsHeaders });
      }
      const slug = slugify((sub.product && sub.product.title) || sub.title || body.id);
      data.custom[slug] = { ...sub.product, slug, mediaKey: slug, createdAt: new Date().toISOString() };
      delete data.pending[body.id];
      await writeManifest(data);
      return Response.json({ ok: true, slug }, { headers: corsHeaders });
    }
    // Refuser une soumission → simple retrait de la file (rien n'est publié).
    if (body.action === 'reject' && body.id) {
      delete data.pending[body.id];
      await writeManifest(data);
      return Response.json({ ok: true }, { headers: corsHeaders });
    }

    if (body.type === 'status') {
      if (!body.slug) {
        return Response.json({ ok: false, error: 'slug requis' }, { status: 400, headers: corsHeaders });
      }
      data.status[body.slug] = body.status || {};
    } else if (body.slug && body.product) {
      if (!data.custom[body.slug]) {
        return Response.json({ ok: false, error: 'produit introuvable' }, { status: 404, headers: corsHeaders });
      }
      data.custom[body.slug] = {
        ...data.custom[body.slug],
        ...body.product,
        slug: body.slug,
        mediaKey: body.slug,
        updatedAt: new Date().toISOString(),
      };
    } else {
      return Response.json({ ok: false, error: 'paramètres invalides' }, { status: 400, headers: corsHeaders });
    }

    await writeManifest(data);
    return Response.json({ ok: true }, { headers: corsHeaders });
  } catch (e) {
    return Response.json(
      { ok: false, error: String((e && e.message) || e) },
      { status: 500, headers: corsHeaders },
    );
  }
}

// DELETE /api/produits?slug=xxx&type=hide|delete
//   hide   → marque hidden:true dans status (défaut)
//   delete → supprime le produit custom du manifeste
export async function DELETE(request) {
  const denied = await denyIfNotOwner(request, corsHeaders);
  if (denied) return denied;
  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');
    const type = url.searchParams.get('type') || 'hide';
    if (!slug) {
      return Response.json({ ok: false, error: 'slug requis' }, { status: 400, headers: corsHeaders });
    }
    const data = await readManifest();

    if (type === 'delete') {
      delete data.custom[slug];
      delete data.status[slug];
      await removeMediaEntry(slug); // le voyage disparaît aussi de la médiathèque
    } else {
      data.status[slug] = { ...(data.status[slug] || {}), hidden: true };
    }

    await writeManifest(data);
    return Response.json({ ok: true }, { headers: corsHeaders });
  } catch (e) {
    return Response.json(
      { ok: false, error: String((e && e.message) || e) },
      { status: 500, headers: corsHeaders },
    );
  }
}
