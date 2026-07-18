// Liste des avis et de leur état, pour la mini-app de validation (propriétaire).
//   GET → { reviews, counts, meta, config }

import { NextResponse } from 'next/server';
import { getRole } from '../../../lib/auth.js';
import { isGoogleConfigured } from '../../../lib/googleBusiness.js';
import { isAiConfigured } from '../../../lib/reviewReply.js';
import { isEmailConfigured } from '../../../lib/reviewEmail.js';
import { readReviewStore, reviewCounts } from '../../../lib/googleReviews.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const noStore = { 'Cache-Control': 'no-store' };

export async function GET(request) {
  if ((await getRole(request)) !== 'owner') {
    return NextResponse.json({ ok: false, error: 'non autorisé' }, { status: 401, headers: noStore });
  }
  const store = await readReviewStore();
  // On n'expose pas la donnée brute Google (`raw`) à l'interface : payload allégé.
  const reviews = store.reviews.map(({ raw, ...rest }) => rest);
  return NextResponse.json(
    {
      ok: true,
      reviews,
      counts: reviewCounts(store),
      meta: store.meta,
      config: {
        google: isGoogleConfigured(),
        ai: isAiConfigured(),
        email: isEmailConfigured(),
      },
    },
    { headers: noStore },
  );
}
