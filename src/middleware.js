// Gardien d'accès des pages d'administration du site.
//
// Depuis la phase 2.5, l'admin vit sur le portail admin.moroccovoyages21.com :
// les anciennes adresses (/admin, /admin-*.html, /formulaire-voyage.html)
// REDIRIGENT vers le portail. Elles ne sont plus ni visibles ni accessibles.
//
// Porte de secours (propriétaire seulement) : une visite unique de
//   /admin?secours=<V21_RESCUE_KEY>
// pose un cookie signé de 12 h ; pendant ce temps, sur CE navigateur, l'ancien
// admin fonctionne comme avant (avec le mot de passe du site). Sans la clé,
// aucune exception. Sans V21_RESCUE_KEY dans Vercel, la porte est fermée.

import { NextResponse } from 'next/server';
import { apiRoleFromRequest, getRole, hasRescue, isRescueKey, rescueCookieValue, RESCUE_COOKIE, RESCUE_MAX_AGE } from './lib/auth.js';

const PORTAL = 'https://admin.moroccovoyages21.com';

// Anciennes pages → page équivalente du portail
const MOVED = {
  '/admin': '/',
  '/admin-produits.html': '/outgoing/produits',
  '/admin-cover.html': '/outgoing/cover',
  '/admin-medias.html': '/outgoing/medias',
  '/formulaire-voyage.html': '/outgoing/fiche',
};

// Réservées au propriétaire (Karim)
const OWNER_ONLY = new Set(['/formulaire-voyage.html']);
// Accessibles à l'équipe ET au propriétaire
const TEAM_OR_OWNER = new Set(['/admin-produits.html', '/admin-cover.html', '/admin-medias.html']);

function toLogin(request) {
  const url = request.nextUrl.clone();
  url.pathname = '/admin';
  url.search = '';
  return NextResponse.redirect(url);
}

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  if (Object.prototype.hasOwnProperty.call(MOVED, path)) {
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
    //    vraie page. On la SERT (200) au lieu de rediriger. Seul un jeton
    //    valide (HMAC V21_API_SECRET, aud = 'v21-api', non expiré) ouvre cette
    //    exception ; un visiteur normal n'a pas d'en-tête et tombe en (3).
    if (await apiRoleFromRequest(request)) {
      return NextResponse.next();
    }
    // 3) Porte fermée → le portail (redirection temporaire : jamais mise en cache).
    if (!(await hasRescue(request))) {
      return NextResponse.redirect(PORTAL + MOVED[path], { status: 302 });
    }
  }

  // Porte de secours ouverte : règles d'accès historiques de l'ancien admin.
  const role = await getRole(request);
  if (OWNER_ONLY.has(path) && role !== 'owner') return toLogin(request);
  if (TEAM_OR_OWNER.has(path) && role !== 'owner' && role !== 'team') return toLogin(request);

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin-produits.html', '/admin-cover.html', '/admin-medias.html', '/formulaire-voyage.html'],
};
