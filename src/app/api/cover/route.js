import { list, put } from '@vercel/blob';
import { getRole } from '../../../lib/auth.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MANIFEST_PATH = 'voyages21/cover/manifest.json';

const DEFAULT_COVER = {
  eyebrow: 'BROCHURE VOYAGES21',
  title: 'EVASIONS ETE 2026',
  subtitle: 'La selection voyages de VOYAGES 21',
  buttonText: 'Votre bonheur commence ici',
  buttonUrl: '/design/homepage-v2-luxe.html',
  audio: { url: '', name: '', size: 0, duration: 0 },
  media: [],
};

const noStore = { 'Cache-Control': 'no-store' };

export async function GET() {
  try {
    const cover = await readCover();
    return Response.json(cover, { headers: noStore });
  } catch {
    return Response.json(DEFAULT_COVER, { headers: noStore });
  }
}

export async function PUT(request) {
  if ((await getRole(request)) !== 'owner') {
    return Response.json({ ok: false, error: 'non autorisé' }, { status: 401, headers: noStore });
  }
  try {
    const body = await request.json();
    const data = normalizeCover(body || {});
    await put(MANIFEST_PATH, JSON.stringify(data, null, 2), {
      access: 'public',
      contentType: 'application/json',
      allowOverwrite: true,
    });
    return Response.json({ ok: true, cover: data }, { headers: noStore });
  } catch (error) {
    return Response.json(
      { ok: false, error: error.message || 'Server error' },
      { status: 500, headers: noStore },
    );
  }
}

async function readCover() {
  const result = await list({ prefix: MANIFEST_PATH, limit: 1 });
  const blob = result.blobs.find((item) => item.pathname === MANIFEST_PATH);
  if (!blob) return DEFAULT_COVER;
  const response = await fetch(`${blob.url}?t=${Date.now()}`, { cache: 'no-store' });
  if (!response.ok) return DEFAULT_COVER;
  const data = await response.json();
  return normalizeCover(data);
}

function normalizeCover(data) {
  const media = Array.isArray(data.media)
    ? data.media
    : Array.isArray(data.images)
      ? data.images.map((image) => ({ type: 'image', url: image && image.url }))
      : [];

  return {
    eyebrow: text(data.eyebrow, DEFAULT_COVER.eyebrow),
    title: text(data.title, DEFAULT_COVER.title),
    subtitle: text(data.subtitle, DEFAULT_COVER.subtitle),
    buttonText: text(data.buttonText, DEFAULT_COVER.buttonText),
    buttonUrl: text(data.buttonUrl, DEFAULT_COVER.buttonUrl),
    audio: normalizeAudio(data.audio || {}),
    media: media.map(normalizeMedia).filter((item) => item.url),
  };
}

function normalizeMedia(item) {
  return {
    type: item && item.type === 'video' ? 'video' : 'image',
    url: text(item && item.url, ''),
    localId: text(item && item.localId, ''),
    poster: text(item && item.poster, ''),
    name: text(item && item.name, ''),
    size: number(item && item.size),
    width: number(item && item.width),
    height: number(item && item.height),
    duration: number(item && item.duration) || 6,
  };
}

function normalizeAudio(audio) {
  return {
    url: text(audio && audio.url, ''),
    name: text(audio && audio.name, ''),
    size: number(audio && audio.size),
    duration: number(audio && audio.duration),
  };
}

function text(value, fallback) {
  const str = String(value || '').trim();
  return str || fallback;
}

function number(value) {
  const n = Number(value || 0);
  return Number.isFinite(n) ? n : 0;
}
