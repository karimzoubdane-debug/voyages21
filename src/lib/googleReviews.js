// File d'attente des avis Google et de leurs réponses, stockée dans Vercel Blob.
// Même principe que src/lib/adminConfig.js : un seul fichier JSON réécrit à chaque
// modification. À n'utiliser que côté runtime Node (jamais dans le middleware Edge).
//
// Cycle de vie d'un avis :
//   pending    → réponse proposée par l'IA, en attente de validation de Karim
//   approved   → validé par Karim (transitoire, avant publication effective)
//   published  → réponse effectivement postée sur Google
//   rejected   → Karim ne veut pas répondre à cet avis
//
// Chaque entrée conserve la donnée brute renvoyée par Google (`raw`) pour ne rien
// perdre, plus les champs normalisés utiles à l'interface et à la publication.

import { list, put } from '@vercel/blob';

const STORE_PATH = 'voyages21/google-reviews.json';

const DEFAULT_STORE = {
  reviews: [], // liste d'objets « review » (cf. normalizeReview)
  meta: {
    lastPollAt: null, // ISO date du dernier passage du cron
    lastError: null, // dernier message d'erreur du poll (diagnostic)
    createdAt: null,
  },
};

export const REVIEW_STATUS = Object.freeze({
  PENDING: 'pending',
  APPROVED: 'approved',
  PUBLISHED: 'published',
  REJECTED: 'rejected',
});

// ── Lecture / écriture du blob ────────────────────────────────────────────────

export async function readReviewStore() {
  try {
    const { blobs } = await list({ prefix: STORE_PATH, limit: 1 });
    const hit = blobs.find((b) => b.pathname === STORE_PATH);
    if (!hit) return structuredCloneStore(DEFAULT_STORE);
    // Cache-bust : relecture fraîche après une modification (cf. adminConfig.js).
    const fresh = hit.url + (hit.url.includes('?') ? '&' : '?') + 'ts=' + Date.now();
    const res = await fetch(fresh, { cache: 'no-store' });
    if (!res.ok) return structuredCloneStore(DEFAULT_STORE);
    const data = await res.json();
    return {
      reviews: Array.isArray(data.reviews) ? data.reviews : [],
      meta: { ...DEFAULT_STORE.meta, ...(data.meta || {}) },
    };
  } catch {
    return structuredCloneStore(DEFAULT_STORE);
  }
}

export async function writeReviewStore(store) {
  await put(STORE_PATH, JSON.stringify(store), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

function structuredCloneStore(store) {
  return JSON.parse(JSON.stringify(store));
}

// ── Normalisation d'un avis Google (API v4) ───────────────────────────────────

const STAR_TO_NUMBER = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };

// Transforme la structure brute de l'API Google en objet exploitable par le reste
// de l'application. `nowIso` est injecté par l'appelant (les libs ne dépendent pas
// de l'horloge directement, plus simple à tester).
export function normalizeReview(raw, nowIso) {
  const rating = STAR_TO_NUMBER[raw.starRating] || 0;
  return {
    reviewId: raw.reviewId,
    reviewerName: raw?.reviewer?.displayName || 'Client Google',
    reviewerPhoto: raw?.reviewer?.profilePhotoUrl || '',
    rating,
    comment: raw.comment || '', // certains avis n'ont que des étoiles, pas de texte
    createTime: raw.createTime || null,
    updateTime: raw.updateTime || null,
    // Réponse déjà présente sur Google (si l'avis avait déjà été traité côté Google)
    existingReply: raw?.reviewReply?.comment || '',
    // Champs gérés par notre pipeline
    status: REVIEW_STATUS.PENDING,
    proposedReply: '',
    finalReply: '',
    aiGenerated: false,
    detectedAt: nowIso,
    updatedAt: nowIso,
    publishedAt: null,
    raw,
  };
}

// ── Opérations sur la file ────────────────────────────────────────────────────

export function findReview(store, reviewId) {
  return store.reviews.find((r) => r.reviewId === reviewId) || null;
}

// Fusionne les avis fraîchement récupérés dans le magasin.
// - Nouvel avis  → ajouté avec le statut PENDING.
// - Avis connu   → on met à jour uniquement les champs venant de Google
//                  (note, texte, réponse existante) sans écraser notre pipeline.
// Renvoie la liste des avis réellement nouveaux (pour déclencher IA + email).
export function mergeReviews(store, incoming) {
  const known = new Map(store.reviews.map((r) => [r.reviewId, r]));
  const freshlyAdded = [];
  for (const review of incoming) {
    const existing = known.get(review.reviewId);
    if (!existing) {
      store.reviews.push(review);
      freshlyAdded.push(review);
    } else {
      existing.rating = review.rating;
      existing.comment = review.comment;
      existing.updateTime = review.updateTime;
      existing.reviewerName = review.reviewerName;
      existing.reviewerPhoto = review.reviewerPhoto;
      existing.existingReply = review.existingReply;
      existing.raw = review.raw;
    }
  }
  // Les plus récents d'abord (par date de détection puis date de création Google).
  store.reviews.sort((a, b) => {
    const ta = Date.parse(a.createTime || a.detectedAt || 0) || 0;
    const tb = Date.parse(b.createTime || b.detectedAt || 0) || 0;
    return tb - ta;
  });
  return freshlyAdded;
}

// Compteurs par statut pour l'entête de la mini-app.
export function reviewCounts(store) {
  const counts = { pending: 0, approved: 0, published: 0, rejected: 0, total: store.reviews.length };
  for (const r of store.reviews) {
    if (counts[r.status] !== undefined) counts[r.status] += 1;
  }
  return counts;
}
