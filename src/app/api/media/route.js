import { list, put } from '@vercel/blob';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MANIFEST = 'media-manifest.json';

async function readManifest() {
  const { blobs } = await list({ prefix: MANIFEST, limit: 1 });
  const hit = blobs.find((b) => b.pathname === MANIFEST);
  if (!hit) return {};
  const res = await fetch(hit.url, { cache: 'no-store' });
  if (!res.ok) return {};
  return res.json();
}

async function writeManifest(data) {
  await put(MANIFEST, JSON.stringify(data), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

const noStore = { 'Cache-Control': 'no-store' };

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
    return Response.json(out, { headers: noStore });
  }
  try {
    const data = await readManifest();
    return Response.json(data, { headers: noStore });
  } catch {
    // Pas de store Blob configuré (ou indisponible) : la brochure garde l'original.
    return Response.json({}, { headers: noStore });
  }
}

export async function PUT(request) {
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
    return Response.json({ ok: true }, { headers: noStore });
  } catch (e) {
    return Response.json(
      { ok: false, error: String((e && e.message) || e) },
      { status: 500, headers: noStore },
    );
  }
}
