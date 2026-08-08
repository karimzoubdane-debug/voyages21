// Point d'entrée du « poll » des avis Google.
//   - Appelé automatiquement par le cron Vercel (voir vercel.json), qui joint
//     l'en-tête « Authorization: Bearer <CRON_SECRET> ».
//   - Peut aussi être déclenché à la main depuis la mini-app (rôle propriétaire).
//
// Étapes : lire la fiche Google → repérer les nouveaux avis → générer une
// proposition de réponse (IA) → envoyer l'alerte e-mail → tout enregistrer.
// Rien n'est jamais publié ici : la publication n'a lieu qu'après validation.

import { NextResponse } from 'next/server';
import { getRole } from '../../../../lib/auth.js';
import { listReviews, isGoogleConfigured } from '../../../../lib/googleBusiness.js';
import { generateReply } from '../../../../lib/reviewReply.js';
import { sendReviewAlert } from '../../../../lib/reviewEmail.js';
import {
  readReviewStore,
  writeReviewStore,
  normalizeReview,
  mergeReviews,
  reviewCounts,
} from '../../../../lib/googleReviews.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const noStore = { 'Cache-Control': 'no-store' };

// Autorisé si : bon secret de cron, OU session propriétaire (déclenchement manuel).
async function isAuthorized(request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const header = request.headers.get('authorization') || '';
    if (header === `Bearer ${secret}`) return true;
    const url = new URL(request.url);
    if (url.searchParams.get('key') === secret) return true;
  }
  return (await getRole(request)) === 'owner';
}

async function runPoll(request) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ ok: false, error: 'non autorisé' }, { status: 401, headers: noStore });
  }

  const nowIso = new Date().toISOString();
  const store = await readReviewStore();
  if (!store.meta.createdAt) store.meta.createdAt = nowIso;

  if (!isGoogleConfigured()) {
    store.meta.lastPollAt = nowIso;
    store.meta.lastError = 'Google Business Profile non configuré (variables manquantes).';
    await writeReviewStore(store);
    return NextResponse.json(
      { ok: false, configured: false, error: store.meta.lastError },
      { status: 200, headers: noStore },
    );
  }

  try {
    const rawReviews = await listReviews({ limit: 50 });
    const normalized = rawReviews.map((raw) => normalizeReview(raw, nowIso));
    const freshlyAdded = mergeReviews(store, normalized);

    // Génération des propositions uniquement pour les nouveaux avis.
    for (const review of freshlyAdded) {
      const { text, aiGenerated } = await generateReply(review);
      review.proposedReply = text;
      review.aiGenerated = aiGenerated;
    }

    let emailResult = { sent: false };
    if (freshlyAdded.length > 0) {
      emailResult = await sendReviewAlert(freshlyAdded);
    }

    store.meta.lastPollAt = nowIso;
    store.meta.lastError = null;
    await writeReviewStore(store);

    return NextResponse.json(
      {
        ok: true,
        configured: true,
        newReviews: freshlyAdded.length,
        emailSent: emailResult.sent,
        counts: reviewCounts(store),
      },
      { headers: noStore },
    );
  } catch (e) {
    store.meta.lastPollAt = nowIso;
    store.meta.lastError = e.message;
    await writeReviewStore(store);
    return NextResponse.json({ ok: false, error: e.message }, { status: 502, headers: noStore });
  }
}

// GET pour le cron Vercel (qui n'envoie que des GET), POST pour le bouton manuel.
export async function GET(request) {
  return runPoll(request);
}

export async function POST(request) {
  return runPoll(request);
}
