import { HiggsfieldClient } from '@higgsfield/client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// La génération vidéo peut prendre 1 à 3 min : on laisse la fonction tourner.
export const maxDuration = 300;

const noStore = { 'Cache-Control': 'no-store' };

// 9:16 (Reel/Story) → format portrait exact 9:16 supporté par Soul.
const PORTRAIT_9_16 = '1152x2048';
const SQUARE = '1536x1536';
const LANDSCAPE_16_9 = '2048x1152';

function sizeForRatio(ratio) {
  if (ratio === '1:1') return SQUARE;
  if (ratio === '16:9') return LANDSCAPE_16_9;
  return PORTRAIT_9_16; // 9:16 par défaut (et 4:5 ramené au portrait)
}

function resultUrl(jobSet) {
  const jobs = jobSet?.jobs || [];
  for (const j of jobs) {
    const url = j?.results?.raw?.url || j?.results?.min?.url;
    if (url) return url;
  }
  return null;
}

export async function POST(request) {
  const apiKey = process.env.HF_API_KEY;
  const apiSecret = process.env.HF_API_SECRET;
  if (!apiKey || !apiSecret) {
    return Response.json(
      {
        error:
          "Clés Higgsfield non configurées. Ajoute HF_API_KEY et HF_API_SECRET dans les variables d'environnement Vercel, puis redéploie.",
      },
      { status: 503, headers: noStore },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Requête invalide.' }, { status: 400, headers: noStore });
  }

  const prompt = typeof body?.prompt === 'string' ? body.prompt.trim() : '';
  if (!prompt) {
    return Response.json({ error: 'Prompt manquant.' }, { status: 400, headers: noStore });
  }
  const ratio = typeof body?.aspect_ratio === 'string' ? body.aspect_ratio : '9:16';

  // Budget de polling borné pour rester sous la limite Vercel (maxDuration 300s).
  const client = new HiggsfieldClient({ apiKey, apiSecret, maxPollTime: 240000 });

  try {
    // Étape 1 — image fixe depuis le prompt (Soul). params est enveloppé par le SDK v1.
    const imageJob = await client.generate(
      '/v1/text2image/soul',
      {
        prompt,
        width_and_height: sizeForRatio(ratio),
        quality: '1080p',
        batch_size: 1,
        enhance_prompt: true,
      },
      { withPolling: true },
    );

    const imageUrl = resultUrl(imageJob);
    if (!imageJob.isCompleted || !imageUrl) {
      return Response.json(
        { error: "Échec de la génération d'image (Higgsfield)." },
        { status: 502, headers: noStore },
      );
    }

    // Étape 2 — animation de l'image en vidéo (DoP Turbo).
    const videoJob = await client.generate(
      '/v1/image2video/dop',
      {
        model: 'dop-turbo',
        prompt,
        input_images: [{ type: 'image_url', image_url: imageUrl }],
        enhance_prompt: true,
      },
      { withPolling: true },
    );

    const videoUrl = resultUrl(videoJob);
    if (!videoJob.isCompleted || !videoUrl) {
      // L'image a réussi : on la renvoie quand même comme livrable partiel.
      return Response.json(
        { imageUrl, videoUrl: null, error: 'Image générée, mais échec de la vidéo.' },
        { status: 200, headers: noStore },
      );
    }

    return Response.json({ imageUrl, videoUrl }, { status: 200, headers: noStore });
  } catch (e) {
    return Response.json(
      { error: 'Erreur Higgsfield : ' + String(e?.message || e) },
      { status: 502, headers: noStore },
    );
  }
}
