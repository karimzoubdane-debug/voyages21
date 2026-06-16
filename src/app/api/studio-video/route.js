import { createHiggsfieldClient } from '@higgsfield/client/v2';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// La génération vidéo peut prendre 1 à 3 min : on laisse la fonction tourner.
export const maxDuration = 300;

const noStore = { 'Cache-Control': 'no-store' };

// 9:16 (Reel/Story) → format portrait le plus haut supporté par Soul (exactement 9:16).
const PORTRAIT_9_16 = '1152x2048';
const SQUARE = '1536x1536';
const LANDSCAPE_16_9 = '2048x1152';

function sizeForRatio(ratio) {
  if (ratio === '1:1') return SQUARE;
  if (ratio === '16:9') return LANDSCAPE_16_9;
  return PORTRAIT_9_16; // 9:16 par défaut (et 4:5 ramené au portrait)
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

  const client = createHiggsfieldClient({ apiKey, apiSecret });

  try {
    // Étape 1 — image fixe depuis le prompt (Soul)
    const imageRes = await client.subscribe('/v1/text2image/soul', {
      input: {
        prompt,
        width_and_height: sizeForRatio(ratio),
        quality: '1080p',
        batch_size: 1,
        enhance_prompt: true,
      },
      withPolling: true,
    });

    if (imageRes.status !== 'completed' || !imageRes.images?.[0]?.url) {
      return Response.json(
        { error: `Échec de la génération d'image (statut : ${imageRes.status}).` },
        { status: 502, headers: noStore },
      );
    }
    const imageUrl = imageRes.images[0].url;

    // Étape 2 — animation de l'image en vidéo (DoP Turbo)
    const videoRes = await client.subscribe('/v1/image2video/dop', {
      input: {
        model: 'dop-turbo',
        prompt,
        input_images: [{ type: 'image_url', image_url: imageUrl }],
        enhance_prompt: true,
      },
      withPolling: true,
    });

    if (videoRes.status !== 'completed' || !videoRes.video?.url) {
      // L'image a réussi : on la renvoie quand même comme livrable partiel.
      return Response.json(
        {
          imageUrl,
          videoUrl: null,
          error: `Image générée, mais échec vidéo (statut : ${videoRes.status}).`,
        },
        { status: 200, headers: noStore },
      );
    }

    return Response.json(
      { imageUrl, videoUrl: videoRes.video.url },
      { status: 200, headers: noStore },
    );
  } catch (e) {
    return Response.json(
      { error: 'Erreur Higgsfield : ' + String(e?.message || e) },
      { status: 502, headers: noStore },
    );
  }
}
