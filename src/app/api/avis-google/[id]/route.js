// Actions sur un avis précis, réservées au propriétaire.
//   POST { action, text? }
//     - "save"    → enregistrer un brouillon modifié (reste en attente)
//     - "approve" → publier la réponse sur Google puis marquer « publié »
//     - "reject"  → ne pas répondre à cet avis
//     - "reset"   → remettre en attente (annule un rejet)
//
// C'est le SEUL endroit où une réponse est réellement postée sur Google, et
// uniquement sur action explicite « approve » de Karim.

import { NextResponse } from 'next/server';
import { getRole } from '../../../../lib/auth.js';
import { publishReply } from '../../../../lib/googleBusiness.js';
import {
  readReviewStore,
  writeReviewStore,
  findReview,
  REVIEW_STATUS,
} from '../../../../lib/googleReviews.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const noStore = { 'Cache-Control': 'no-store' };

export async function POST(request, { params }) {
  if ((await getRole(request)) !== 'owner') {
    return NextResponse.json({ ok: false, error: 'non autorisé' }, { status: 401, headers: noStore });
  }

  const { id } = await params;
  let body = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  const action = String(body.action || '');
  const text = typeof body.text === 'string' ? body.text : undefined;

  const store = await readReviewStore();
  const review = findReview(store, id);
  if (!review) {
    return NextResponse.json({ ok: false, error: 'avis introuvable' }, { status: 404, headers: noStore });
  }

  const nowIso = new Date().toISOString();

  switch (action) {
    case 'save': {
      if (typeof text === 'string') review.proposedReply = text;
      review.status = REVIEW_STATUS.PENDING;
      review.updatedAt = nowIso;
      break;
    }
    case 'approve': {
      const finalText = (typeof text === 'string' ? text : review.proposedReply || '').trim();
      if (!finalText) {
        return NextResponse.json({ ok: false, error: 'réponse vide' }, { status: 400, headers: noStore });
      }
      try {
        await publishReply(review.reviewId, finalText);
      } catch (e) {
        return NextResponse.json({ ok: false, error: e.message }, { status: 502, headers: noStore });
      }
      review.finalReply = finalText;
      review.proposedReply = finalText;
      review.existingReply = finalText;
      review.status = REVIEW_STATUS.PUBLISHED;
      review.publishedAt = nowIso;
      review.updatedAt = nowIso;
      break;
    }
    case 'reject': {
      review.status = REVIEW_STATUS.REJECTED;
      review.updatedAt = nowIso;
      break;
    }
    case 'reset': {
      review.status = REVIEW_STATUS.PENDING;
      review.updatedAt = nowIso;
      break;
    }
    default:
      return NextResponse.json({ ok: false, error: 'action inconnue' }, { status: 400, headers: noStore });
  }

  await writeReviewStore(store);
  const { raw, ...clean } = review;
  return NextResponse.json({ ok: true, review: clean }, { headers: noStore });
}
