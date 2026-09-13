// Gardien d'accès des pages d'administration du site.
//
// Depuis la phase 2.6, les anciennes adresses (/admin et ses sous-chemins,
// /admin-*.html, /formulaire-voyage.html) ne RÉVÈLENT plus rien : pour un
// visiteur ordinaire elles répondent une vraie « 404 — introuvable », la page
// 404 standard du site, identique à n'importe quelle URL inexistante. Plus
// aucune redirection vers le portail admin.moroccovoyages21.com : l'existence
// d'un admin n'est plus déductible depuis voyages21.com.
//
// Trois cas, dans cet ordre :
//   1. Jeton d'API valide (« Authorization: Bearer … ») → la vraie page (200).
//      C'est le fetch serveur du portail admin.moroccovoyages21.com.
//   2. Porte de secours du propriétaire (une visite de
//      /admin?secours=<V21_RESCUE_KEY> pose un cookie signé de 12 h) → la vraie
//      page, avec les règles d'accès historiques de l'ancien admin.
//   3. Tout le reste → 404.

import { NextResponse } from 'next/server';
import { apiRoleFromRequest, getRole, hasRescue, isRescueKey, rescueCookieValue, RESCUE_COOKIE, RESCUE_MAX_AGE } from './lib/auth.js';

// Anciennes pages d'administration (masquées derrière une 404).
const GUARDED = new Set([
  '/admin',
  '/admin-produits.html',
  '/admin-cover.html',
  '/admin-medias.html',
  '/formulaire-voyage.html',
]);

// /admin et TOUS ses sous-chemins sont concernés (le cookie de secours doit
// rouvrir /admin/... aussi bien que /admin).
function isGuarded(path) {
  return GUARDED.has(path) || path.startsWith('/admin/');
}

// Réservées au propriétaire (Karim)
const OWNER_ONLY = new Set(['/formulaire-voyage.html']);
// Accessibles à l'équipe ET au propriétaire
const TEAM_OR_OWNER = new Set(['/admin-produits.html', '/admin-cover.html', '/admin-medias.html']);

// 404 « banale » : on réécrit la requête vers une adresse interne qui n'existe
// pas, donc Next rend sa page 404 standard avec le code 404 — exactement la même
// réponse que pour n'importe quelle URL inconnue du site. Rien n'est divulgué.
function notFound(request) {
  // « status: 404 » est indispensable : sans lui, la réécriture renvoie le
  // contenu de la page 404 avec un code 200, alors qu'une URL réellement
  // inexistante renvoie 404. Cet écart de code suffisait à révéler que ces
  // adresses sont particulières — exactement ce que le camouflage veut éviter.
  const res = NextResponse.rewrite(new URL('/_not-found', request.url), { status: 404 });
  // Même en-tête de cache qu'une 404 ordinaire de Next : la réponse n'est mise
  // en cache ni par le navigateur ni par le CDN. Indispensable pour que la porte
  // de secours et le portail ne se heurtent jamais à une 404 mémorisée.
  res.headers.set('cache-control', 'private, no-cache, no-store, max-age=0, must-revalidate');
  return res;
}

function toLogin(request) {
  const url = request.nextUrl.clone();
  url.pathname = '/admin';
  url.search = '';
  return NextResponse.redirect(url);
}

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  if (isGuarded(path)) {
    // 1) Ouverture de la porte de secours : cookie signé, puis même page sans la clé dans l'URL.
    const key = request.nextUrl.searchParams.get('secours');
    if (key !== null && isRescueKey(key)) {
      const url = request.nextUrl.clone();
      url.searchParams.delete('secours');
      const res = NextResponse.redirect(url, { status: 302 });
      res.cookies.set(RESCUE_COOKIE, await rescueCookieValue(), {
        httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: RESCUE_MAX_AGE,
      });
      return res;
    }
    // 2) Jeton d'API valide (en-tête « Authorization: Bearer … ») : c'est le
    //    fetch serveur du portail admin.moroccovoyages21.com qui vient relire la
    //    vraie page. On la SERT (200). Seul un jeton valide (HMAC V21_API_SECRET,
    //    aud = 'v21-api', non expiré) ouvre cette exception ; un visiteur normal
    //    n'a pas d'en-tête et tombe en (4).
    if (await apiRoleFromRequest(request)) {
      return NextResponse.next();
    }
    // 3) Porte de secours fermée (pas de cookie valide) → 404, comme une URL inexistante.
    if (!(await hasRescue(request))) {
      return notFound(request);
    }
  }

  // 4) Porte de secours ouverte : règles d'accès historiques de l'ancien admin.
  const role = await getRole(request);
  if (OWNER_ONLY.has(path) && role !== 'owner') return toLogin(request);
  if (TEAM_OR_OWNER.has(path) && role !== 'owner' && role !== 'team') return toLogin(request);

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin',
    '/admin/:path*',
    '/admin-produits.html',
    '/admin-cover.html',
    '/admin-medias.html',
    '/formulaire-voyage.html',
  ],
};
