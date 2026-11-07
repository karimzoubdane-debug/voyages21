import { list } from '@vercel/blob';
import { readJson, writeJson } from '../../../lib/blob-json.js';
import { getRole } from '../../../lib/auth.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MANIFEST = 'media-manifest.json';

// Médiathèque versionnée (voir lib/blob-json.js) : plus de version périmée resservie
// par le cache entre deux écritures rapprochées.
async function readManifest() {
  return (await readJson(MANIFEST, null)) || {};
}

async function writeManifest(data) {
  await writeJson(MANIFEST, data);
}

const noStore = { 'Cache-Control': 'no-store' };
const corsHeaders = {
  ...noStore,
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function GET(request) {
  // Mode diagnostic : /api/media?debug=1 indique si la fonction voit le token.
  const debug = new URL(request.url).searchParams.get('debug');
  if (debug) {
    const token = process.env.BLOB_READ_WRITE_TOKEN || '';
    const out = { hasToken: !!token, tokenLength: token.length };
    try {
      const { blobs } = await list({ limit: 5 });
      out.list = 'ok';
      out.blobCount = blobs.length;
    } catch (e) {
      out.list = 'error';
      out.error = String((e && e.message) || e);
    }
    return Response.json(out, { headers: corsHeaders });
  }
  try {
    const data = await readManifest();
    return Response.json(data, { headers: corsHeaders });
  } catch {
    // Pas de store Blob configuré (ou indisponible) : la brochure garde l'original.
    return Response.json({}, { headers: corsHeaders });
  }
}

export async function PUT(request) {
  const role = await getRole(request);
  if (role !== 'owner' && role !== 'team') {
    return Response.json({ ok: false, error: 'non autorisé' }, { status: 401, headers: corsHeaders });
  }
  try {
    const body = await request.json();
    let data;
    // Mise à jour d'un seul produit : lecture-fusion-écriture (évite d'écraser
    // le travail d'un autre membre de l'équipe sur un autre voyage).
    if (body && typeof body.key === 'string' && body.rec) {
      data = await readManifest();
      data[body.key] = body.rec;
    } else {
      // Remplacement complet du manifeste (import / tout effacer).
      data = body && typeof body === 'object' ? body : {};
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
