// Route serveur : renvoie les vrais avis Google de Voyages 21 (note, nombre
// total d'avis, et les avis les plus récents) pour alimenter la page d'accueil.
//
// Principes :
//  - La clé reste SECRÈTE (lue côté serveur via process.env, jamais exposée au
//    navigateur).
//  - Réponse mise en cache ~6 h (revalidate) + cache CDN → coût Google ~0 €.
//  - Repli silencieux : si pas de clé ou si Google échoue, on renvoie
//    { ok: false } (la page d'accueil garde alors ses cartes statiques).
//
// L'API Places officielle ne renvoie qu'au maximum 5 avis : la note et le
// nombre total restent en revanche exacts et à jour.

export const revalidate = 21600; // 6 heures

const PLACE_ID = process.env.GOOGLE_PLACE_ID || 'ChIJPaMFhYzurw0R50-J4mRz7oc';
const API_KEY = process.env.GOOGLE_PLACES_API_KEY || '';
const REVALIDATE = 21600;

function mapReview(author, rating, text, when, photo, time, link) {
  return {
    author: author || 'Client',
    rating: typeof rating === 'number' ? rating : 5,
    text: text || '',
    when: when || '',
    photo: photo || '',
    time: time || 0,
    link: link || '',
  };
}

// Ancienne API Places (Place Details) — la plus simple et la mieux documentée.
async function fromLegacy() {
  const fields = 'name,rating,user_ratings_total,reviews,url';
  const url =
    'https://maps.googleapis.com/maps/api/place/details/json' +
    `?place_id=${encodeURIComponent(PLACE_ID)}` +
    `&fields=${fields}&language=fr&reviews_sort=newest&key=${API_KEY}`;

  const res = await fetch(url, { next: { revalidate: REVALIDATE } });
  if (!res.ok) return null;
  const json = await res.json();
  if (json.status !== 'OK' || !json.result) return null;

  const r = json.result;
  return {
    rating: typeof r.rating === 'number' ? r.rating : null,
    total: typeof r.user_ratings_total === 'number' ? r.user_ratings_total : null,
    mapsUrl: r.url || null,
    reviews: (r.reviews || []).map((rv) =>
      mapReview(
        rv.author_name,
        rv.rating,
        rv.text,
        rv.relative_time_description,
        rv.profile_photo_url,
        rv.time,
        rv.author_url,
      ),
    ),
  };
}

// Nouvelle API Places — repli si l'ancienne n'est pas activée sur le projet.
async function fromNew() {
  const url =
    `https://places.googleapis.com/v1/places/${encodeURIComponent(PLACE_ID)}` +
    '?languageCode=fr';
  const fieldMask =
    'displayName,rating,userRatingCount,googleMapsUri,reviews';

  const res = await fetch(url, {
    headers: { 'X-Goog-Api-Key': API_KEY, 'X-Goog-FieldMask': fieldMask },
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok) return null;
  const json = await res.json();
  if (!json || json.error) return null;

  return {
    rating: typeof json.rating === 'number' ? json.rating : null,
    total: typeof json.userRatingCount === 'number' ? json.userRatingCount : null,
    mapsUrl: json.googleMapsUri || null,
    reviews: (json.reviews || []).map((rv) =>
      mapReview(
        rv.authorAttribution && rv.authorAttribution.displayName,
        rv.rating,
        (rv.text && rv.text.text) || (rv.originalText && rv.originalText.text),
        rv.relativePublishTimeDescription,
        rv.authorAttribution && rv.authorAttribution.photoUri,
        rv.publishTime ? Math.floor(Date.parse(rv.publishTime) / 1000) : 0,
        rv.authorAttribution && rv.authorAttribution.uri,
      ),
    ),
  };
}

export async function GET() {
  if (!API_KEY) {
    return Response.json({ ok: false, reason: 'no-key' });
  }

  try {
    let data = await fromLegacy();
    if (!data) data = await fromNew();
    if (!data) return Response.json({ ok: false, reason: 'no-data' });

    return new Response(JSON.stringify({ ok: true, ...data }), {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        // Cache CDN : 6 h, puis sert la version périmée pendant 24 h le temps
        // de rafraîchir en arrière-plan.
        'cache-control': 'public, s-maxage=21600, stale-while-revalidate=86400',
      },
    });
  } catch (e) {
    return Response.json({ ok: false, reason: 'error' });
  }
}
