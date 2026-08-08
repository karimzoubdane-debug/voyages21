// Client minimal de l'API Google Business Profile (ex « Google My Business »).
// Sert à LIRE les avis d'une fiche et à PUBLIER une réponse, sans dépendance
// externe : on parle directement à l'API REST v4 avec `fetch`.
//
// ── Authentification ──────────────────────────────────────────────────────────
// Google utilise OAuth2. On stocke un « refresh token » à vie (obtenu une seule
// fois, voir docs/AVIS-GOOGLE.md) et on l'échange à la volée contre un « access
// token » de courte durée. Variables d'environnement à définir dans Vercel :
//   GOOGLE_CLIENT_ID        — identifiant OAuth du projet Google Cloud
//   GOOGLE_CLIENT_SECRET    — secret OAuth
//   GOOGLE_REFRESH_TOKEN    — jeton de rafraîchissement (compte propriétaire fiche)
//   GBP_ACCOUNT_ID          — identifiant du compte GBP (ex : 1234567890)
//   GBP_LOCATION_ID         — identifiant de l'établissement (ex : 0987654321)
//
// L'API des avis est restée sur l'ancien hôte v4 `mybusiness.googleapis.com`,
// même si la gestion des comptes/établissements a migré vers de nouvelles API.

const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';
const V4_BASE = 'https://mybusiness.googleapis.com/v4';

export function googleConfig() {
  return {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN || '',
    accountId: process.env.GBP_ACCOUNT_ID || '',
    locationId: process.env.GBP_LOCATION_ID || '',
  };
}

export function isGoogleConfigured() {
  const c = googleConfig();
  return !!(c.clientId && c.clientSecret && c.refreshToken && c.accountId && c.locationId);
}

// Échange le refresh token contre un access token frais.
async function getAccessToken() {
  const c = googleConfig();
  const body = new URLSearchParams({
    client_id: c.clientId,
    client_secret: c.clientSecret,
    refresh_token: c.refreshToken,
    grant_type: 'refresh_token',
  });
  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
    cache: 'no-store',
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.access_token) {
    throw new Error(
      'Échec OAuth Google : ' + (data.error_description || data.error || res.status),
    );
  }
  return data.access_token;
}

function locationPath() {
  const c = googleConfig();
  return `accounts/${c.accountId}/locations/${c.locationId}`;
}

// Récupère les avis de la fiche (pagination gérée, page par page).
// `limit` borne le nombre total récupéré pour éviter des appels sans fin.
export async function listReviews({ limit = 50 } = {}) {
  if (!isGoogleConfigured()) {
    throw new Error('Google Business Profile non configuré (variables manquantes).');
  }
  const token = await getAccessToken();
  const collected = [];
  let pageToken = '';
  do {
    const url = new URL(`${V4_BASE}/${locationPath()}/reviews`);
    url.searchParams.set('pageSize', '50');
    if (pageToken) url.searchParams.set('pageToken', pageToken);
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error('Lecture avis Google échouée : ' + (data?.error?.message || res.status));
    }
    if (Array.isArray(data.reviews)) collected.push(...data.reviews);
    pageToken = data.nextPageToken || '';
  } while (pageToken && collected.length < limit);
  return collected.slice(0, limit);
}

// Publie (ou remplace) la réponse à un avis donné.
// Google utilise le même point d'entrée PUT pour créer et mettre à jour la réponse.
export async function publishReply(reviewId, comment) {
  if (!isGoogleConfigured()) {
    throw new Error('Google Business Profile non configuré (variables manquantes).');
  }
  const text = String(comment || '').trim();
  if (!text) throw new Error('Réponse vide : rien à publier.');
  const token = await getAccessToken();
  const url = `${V4_BASE}/${locationPath()}/reviews/${reviewId}/reply`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ comment: text }),
    cache: 'no-store',
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error('Publication réponse Google échouée : ' + (data?.error?.message || res.status));
  }
  return data; // { comment, updateTime }
}
