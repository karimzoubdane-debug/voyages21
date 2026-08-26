// Gardien d'accès des pages d'administration.
// Les fichiers HTML d'admin sont publics par nature ; ce middleware intercepte
// leurs URLs et renvoie vers /admin (connexion) si le rôle ne convient pas.

import { NextResponse } from 'next/server';
import { getRole } from './lib/auth.js';

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
  const role = await getRole(request);

  if (OWNER_ONLY.has(path) && role !== 'owner') return toLogin(request);
  if (TEAM_OR_OWNER.has(path) && role !== 'owner' && role !== 'team') return toLogin(request);

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin-produits.html', '/admin-cover.html', '/admin-medias.html', '/formulaire-voyage.html'],
};
