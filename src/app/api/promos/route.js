import { list, put } from '@vercel/blob';
import { getRole } from '../../../lib/auth.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MANIFEST_PATH = 'voyages21/promos/manifest.json';

const DEFAULT_PROMOS = {
  actif: true,
  scrollPourcent: 25,
  delaiMiniSecondes: 4,
  frequence: 'jour',
  offres: [
    {
      id: 'caire-sharm-ete-2026',
      actif: true,
      badge: 'Offre du jour',
      titre: 'Le Caire & Sharm El Sheikh',
      sousTitre: 'Départ limité — Été 2026',
      prix: 'À partir de 17 900 DH / personne',
      image: '',
      video: '',
      poster: '',
      lienOffre: '',
      texteBoutonOffre: 'Voir le programme',
      whatsappNumero: '212614152686',
      whatsappMessage:
        "Bonjour Voyages 21 👋 Je suis intéressé(e) par l'offre Le Caire & Sharm El Sheikh (Été 2026, à partir de 17 900 DH). Pouvez-vous m'envoyer le programme ?",
      dateFin: '',
    },
  ],
};

const noStore = { 'Cache-Control': 'no-store' };

export async function GET() {
  try {
    const data = await readPromos();
    return Response.json(data, { headers: noStore });
  } catch {
    return Response.json(DEFAULT_PROMOS, { headers: noStore });
  }
}

export async function PUT(request) {
  if ((await getRole(request)) !== 'owner') {
    return Response.json({ ok: false, error: 'non autorisé' }, { status: 401, headers: noStore });
  }
  try {
    const body = await request.json();
    const data = normalizePromos(body || {});
    await put(MANIFEST_PATH, JSON.stringify(data, null, 2), {
      access: 'public',
      contentType: 'application/json',
      allowOverwrite: true,
    });
    return Response.json({ ok: true, promos: data }, { headers: noStore });
  } catch (error) {
    return Response.json(
      { ok: false, error: error.message || 'Server error' },
      { status: 500, headers: noStore },
    );
  }
}

async function readPromos() {
  const result = await list({ prefix: MANIFEST_PATH, limit: 1 });
  const blob = result.blobs.find((item) => item.pathname === MANIFEST_PATH);
  if (!blob) return DEFAULT_PROMOS;
  const response = await fetch(`${blob.url}?t=${Date.now()}`, { cache: 'no-store' });
  if (!response.ok) return DEFAULT_PROMOS;
  const data = await response.json();
  return normalizePromos(data);
}

function normalizePromos(data) {
  if (data && data.promos) data = data.promos;
  const offres = Array.isArray(data && data.offres) ? data.offres.map(normalizeOffre) : [];
  return {
    actif: data && data.actif === false ? false : true,
    scrollPourcent: clampNumber(data && data.scrollPourcent, 25, 0, 100),
    delaiMiniSecondes: clampNumber(data && data.delaiMiniSecondes, 4, 0, 60),
    frequence: text(data && data.frequence, 'jour'),
    offres: offres.length ? offres : DEFAULT_PROMOS.offres,
  };
}

function normalizeOffre(item) {
  return {
    id: text(item && item.id, ''),
    actif: item && item.actif === false ? false : true,
    badge: text(item && item.badge, 'Offre du jour'),
    titre: text(item && item.titre, ''),
    sousTitre: text(item && item.sousTitre, ''),
    prix: text(item && item.prix, ''),
    image: text(item && item.image, ''),
    video: text(item && item.video, ''),
    poster: text(item && item.poster, ''),
    lienOffre: text(item && item.lienOffre, ''),
    texteBoutonOffre: text(item && item.texteBoutonOffre, 'Voir le programme'),
    whatsappNumero: text(item && item.whatsappNumero, '212614152686').replace(/[^0-9]/g, ''),
    whatsappMessage: text(item && item.whatsappMessage, ''),
    dateFin: text(item && item.dateFin, ''),
  };
}

function text(value, fallback) {
  const str = String(value == null ? '' : value).trim();
  return str || fallback;
}

function clampNumber(value, fallback, min, max) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}
