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

// Le catalogue est modifiable par le propriétaire ET par l'équipe.
// (Accès complet accordé à l'équipe : statuts, modification, suppression, validation.)
async function denyIfNotAdmin(request, headers) {
  const role = await getRole(request);
  if (role === 'owner' || role === 'team') return null;
  return Response.json({ ok: false, error: 'non autorisé' }, { status: 401, headers });
}

// La corbeille (voir / restaurer / vider) est réservée au PROPRIÉTAIRE.
async function denyIfNotOwner(request, headers) {
  if ((await getRole(request)) === 'owner') return null;
  return Response.json({ ok: false, error: 'réservé au propriétaire' }, { status: 401, headers });
}

async function readManifest() {
  const empty = { custom: {}, status: {}, pending: {}, trash: {}, order: {}, groupOrder: {} };
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
    // La file « en attente » (soumissions équipe) est visible du propriétaire et de l'équipe.
    const role = await getRole(request);
    const out = { custom: data.custom || {}, status: data.status || {}, order: data.order || {}, groupOrder: data.groupOrder || {}, role: role || '' };
    if (role === 'owner' || role === 'team') out.pending = data.pending || {};
    // La corbeille n'est visible QUE du propriétaire.
    if (role === 'owner') out.trash = data.trash || {};
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

    // Publication directe : propriétaire ou équipe.
    if (role !== 'owner' && role !== 'team') {
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
  const denied = await denyIfNotAdmin(request, corsHeaders);
  if (denied) return denied;
  try {
    const body = await request.json();
    const data = await readManifest();

    // Restaurer un voyage depuis la corbeille → PROPRIÉTAIRE uniquement.
    if (body.action === 'restore' && body.slug) {
      const deniedOwner = await denyIfNotOwner(request, corsHeaders);
      if (deniedOwner) return deniedOwner;
      const t = data.trash && data.trash[body.slug];
      if (!t) {
        return Response.json({ ok: false, error: 'introuvable dans la corbeille' }, { status: 404, headers: corsHeaders });
      }
      data.custom[body.slug] = t.product;
      if (t.status) data.status[body.slug] = t.status; else delete data.status[body.slug];
      delete data.trash[body.slug];
      await writeManifest(data);
      return Response.json({ ok: true, restored: body.slug }, { headers: corsHeaders });
    }

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

    if (body.type === 'order') {
      // Ordre d'affichage des produits (rang par slug). On FUSIONNE la carte
      // reçue (souvent une seule catégorie visible) dans l'ordre global.
      if (!body.order || typeof body.order !== 'object') {
        return Response.json({ ok: false, error: 'order requis' }, { status: 400, headers: corsHeaders });
      }
      data.order = data.order || {};
      Object.keys(body.order).forEach(function (slug) {
        const n = parseInt(body.order[slug], 10);
        if (!isNaN(n)) data.order[slug] = n;
      });
      await writeManifest(data);
      return Response.json({ ok: true }, { headers: corsHeaders });
    }

    if (body.type === 'groupOrder') {
      // Ordre des cadrans (sous-sections) d'une destination : { dest, order:[ids] }.
      if (!body.dest || !Array.isArray(body.order)) {
        return Response.json({ ok: false, error: 'dest + order requis' }, { status: 400, headers: corsHeaders });
      }
      data.groupOrder = data.groupOrder || {};
      data.groupOrder[String(body.dest)] = body.order.map(String);
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

// DELETE /api/produits?slug=xxx&type=hide|delete|purge   (+ type=empty sans slug)
//   hide   → marque hidden:true dans status (défaut)
//   delete → met le voyage à la CORBEILLE (récupérable) — équipe autorisée
//   purge  → supprime DÉFINITIVEMENT un élément de la corbeille — propriétaire seul
//   empty  → vide TOUTE la corbeille (définitif) — propriétaire seul
export async function DELETE(request) {
  const denied = await denyIfNotAdmin(request, corsHeaders);
  if (denied) return denied;
  const role = await getRole(request);
  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');
    const type = url.searchParams.get('type') || 'hide';

    // Vider toute la corbeille (définitif) — propriétaire uniquement.
    if (type === 'empty') {
      const deniedOwner = await denyIfNotOwner(request, corsHeaders);
      if (deniedOwner) return deniedOwner;
      const data = await readManifest();
      const keys = Object.keys(data.trash || {});
      for (const k of keys) await removeMediaEntry(k); // enlève aussi les médias
      data.trash = {};
      await writeManifest(data);
      return Response.json({ ok: true, emptied: keys.length }, { headers: corsHeaders });
    }

    if (!slug) {
      return Response.json({ ok: false, error: 'slug requis' }, { status: 400, headers: corsHeaders });
    }
    const data = await readManifest();

    // Suppression DÉFINITIVE d'un élément de la corbeille — propriétaire uniquement.
    if (type === 'purge') {
      const deniedOwner = await denyIfNotOwner(request, corsHeaders);
      if (deniedOwner) return deniedOwner;
      if (data.trash && data.trash[slug]) {
        delete data.trash[slug];
        await removeMediaEntry(slug);
      }
      await writeManifest(data);
      return Response.json({ ok: true }, { headers: corsHeaders });
    }

    if (type === 'delete') {
      if (data.custom[slug]) {
        // Voyage ajouté via l'admin : on le MET À LA CORBEILLE (pas d'effacement).
        // La donnée et les médias sont conservés → restauration complète possible.
        data.trash = data.trash || {};
        data.trash[slug] = {
          slug,
          product: data.custom[slug],
          status: data.status[slug] || null,
          deletedAt: new Date().toISOString(),
          deletedBy: role || '',
        };
        delete data.custom[slug];
        delete data.status[slug];
      } else {
        // Voyage du catalogue de base (codé dans data.js) : impossible d'effacer
        // le code depuis l'admin. On le marque « supprimé » → retiré des listes
        // ET fiche rendue indisponible. Réversible via « Restaurer » (removed:false).
        data.status[slug] = { ...(data.status[slug] || {}), removed: true, hidden: true };
      }
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
