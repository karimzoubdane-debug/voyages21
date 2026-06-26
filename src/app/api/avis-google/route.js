// Route serveur : renvoie les vrais avis Google de Voyages 21 (note, nombre
// total d'avis, et les avis les plus récents) pour alimenter le site.
//
// Principes :
//  - La clé reste SECRÈTE (lue côté serveur via process.env, jamais exposée au
//    navigateur). Elle est aussi retirée des éventuels messages d'erreur.
//  - Réponse en cache ~6 h (succès uniquement) + cache CDN → coût Google ~0 €.
//  - Repli silencieux : si pas de clé ou si Google échoue, on renvoie
//    { ok: false } (la page garde alors ses cartes statiques).
//  - Mode diagnostic : ?debug=1 force un appel frais (sans cache) et renvoie le
//    détail de ce que Google répond (status + message) pour dépanner.
//
// L'API Places officielle ne renvoie qu'au maximum 5 avis ; la note et le
// nombre total restent en revanche exacts et à jour.

export const revalidate = 21600; // 6 heures

const PLACE_ID = process.env.GOOGLE_PLACE_ID || 'ChIJPaMFhYzurw0R50-J4mRz7oc';
const API_KEY = process.env.GOOGLE_PLACES_API_KEY || '';
const REVALIDATE = 21600;

// Ne JAMAIS laisser fuiter la clé dans un message d'erreur renvoyé au client.
function scrub(s) {
  if (s == null) return null;
  let out = String(s);
  if (API_KEY) out = out.split(API_KEY).join('***');
  return out;
}

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

function fetchOpts(noStore) {
  return noStore ? { cache: 'no-store' } : { next: { revalidate: REVALIDATE } };
}

// Ancienne API Places (Place Details) — la plus simple et la mieux documentée.
async function fromLegacy(noStore) {
  const fields = 'name,rating,user_ratings_total,reviews,url';
  const url =
    'https://maps.googleapis.com/maps/api/place/details/json' +
    `?place_id=${encodeURIComponent(PLACE_ID)}` +
    `&fields=${fields}&language=fr&reviews_sort=newest&key=${API_KEY}`;

  const res = await fetch(url, fetchOpts(noStore));
  const json = await res.json().catch(() => ({}));
  if (json.status !== 'OK' || !json.result) {
    return {
      ok: false, api: 'legacy', http: res.status,
      status: json.status || null, message: scrub(json.error_message),
    };
  }
  const r = json.result;
  return {
    ok: true, api: 'legacy',
    rating: typeof r.rating === 'number' ? r.rating : null,
    total: typeof r.user_ratings_total === 'number' ? r.user_ratings_total : null,
    mapsUrl: r.url || null,
    reviews: (r.reviews || []).map((rv) =>
      mapReview(rv.author_name, rv.rating, rv.text, rv.relative_time_description,
        rv.profile_photo_url, rv.time, rv.author_url)),
  };
}

// Nouvelle API Places — repli si l'ancienne n'est pas activée sur le projet.
async function fromNew(noStore) {
  const url =
    `https://places.googleapis.com/v1/places/${encodeURIComponent(PLACE_ID)}?languageCode=fr`;
  const fieldMask = 'displayName,rating,userRatingCount,googleMapsUri,reviews';

  const res = await fetch(url, {
    headers: { 'X-Goog-Api-Key': API_KEY, 'X-Goog-FieldMask': fieldMask },
    ...fetchOpts(noStore),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json || json.error) {
    return {
      ok: false, api: 'new', http: res.status,
      status: (json.error && json.error.status) || null,
      message: scrub(json.error && json.error.message),
    };
  }
  return {
    ok: true, api: 'new',
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
        rv.authorAttribution && rv.authorAttribution.uri)),
  };
}

const noStoreHeaders = { 'cache-control': 'no-store' };

export async function GET(request) {
  let debug = false;
  try { debug = new URL(request.url).searchParams.get('debug') === '1'; } catch (e) {}
  const noStore = debug;

  if (!API_KEY) {
    return Response.json(
      { ok: false, reason: 'no-key',
        hint: "GOOGLE_PLACES_API_KEY n'est pas visible par la fonction. Vérifier qu'elle est bien cochée pour l'environnement Preview/Production, puis redéployer." },
      { headers: noStoreHeaders });
  }

  try {
    const attempts = [];
    let data = null;

    const legacy = await fromLegacy(noStore);
    attempts.push({ api: 'legacy', http: legacy.http, status: legacy.status, message: legacy.message });
    if (legacy.ok) data = legacy;

    if (!data) {
      const fresh = await fromNew(noStore);
      attempts.push({ api: 'new', http: fresh.http, status: fresh.status, message: fresh.message });
      if (fresh.ok) data = fresh;
    }

    if (!data) {
      // Échec → on ne met PAS en cache (pour que la correction prenne effet de suite).
      return Response.json({ ok: false, reason: 'google-error', attempts }, { headers: noStoreHeaders });
    }

    const payload = {
      ok: true, rating: data.rating, total: data.total,
      mapsUrl: data.mapsUrl, reviews: data.reviews,
    };
    if (debug) { payload._api = data.api; payload._count = data.reviews.length; }

    return new Response(JSON.stringify(payload), {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': debug ? 'no-store' : 'public, s-maxage=21600, stale-while-revalidate=86400',
      },
    });
  } catch (e) {
    return Response.json({ ok: false, reason: 'exception', message: scrub(e && e.message) }, { headers: noStoreHeaders });
  }
}
