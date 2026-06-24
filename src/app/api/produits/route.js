import { list, put } from '@vercel/blob';
import { getRole } from '../../../lib/auth.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MANIFEST = 'voyages21/produits-manifest.json';

// Le catalogue n'est modifiable que par le propriétaire (l'équipe n'y touche pas).
async function denyIfNotOwner(request, headers) {
  if ((await getRole(request)) === 'owner') return null;
  return Response.json({ ok: false, error: 'non autorisé' }, { status: 401, headers });
}

async function readManifest() {
  const { blobs } = await list({ prefix: MANIFEST, limit: 1 });
  const hit = blobs.find((b) => b.pathname === MANIFEST);
  if (!hit) return { custom: {}, status: {} };
  // Le CDN Blob sert l'ancienne version après un overwrite (même URL) : on
  // casse le cache avec un paramètre unique pour toujours relire la dernière
  // version (sinon une suppression/un badge semble « ne pas prendre »).
  const fresh = hit.url + (hit.url.includes('?') ? '&' : '?') + 'ts=' + Date.now();
  const res = await fetch(fresh, { cache: 'no-store' });
  if (!res.ok) return { custom: {}, status: {} };
  const data = await res.json();
  return { custom: {}, status: {}, ...data };
}

async function writeManifest(data) {
  await put(MANIFEST, JSON.stringify(data), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
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
    return Response.json(data, { headers: corsHeaders });
  } catch {
    return Response.json({ custom: {}, status: {} }, { headers: corsHeaders });
  }
}

// POST /api/produits  { slug, product }  → créer un nouveau produit
export async function POST(request) {
  const denied = await denyIfNotOwner(request, corsHeaders);
  if (denied) return denied;
  try {
    const body = await request.json();
    if (!body.slug || !body.product) {
      return Response.json(
        { ok: false, error: 'slug et product requis' },
        { status: 400, headers: corsHeaders },
      );
    }
    const slug = body.slug
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const data = await readManifest();
    data.custom[slug] = { ...body.product, slug, createdAt: new Date().toISOString() };
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
