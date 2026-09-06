// Relais sécurisé vers l'admin de l'appli PackAc (Configurateur de séjour).
//
// But : l'équipe, déjà connectée à l'admin maître, clique la carte
// « Packs & Activités » et arrive dans l'admin PackAc DÉJÀ déverrouillé —
// sans taper de 2e mot de passe, et sans que la clé soit visible dans le code.
//
// Fonctionnement :
//   1. On vérifie la session admin (cookie) via getRole().
//   2. Si connecté (owner ou team), on redirige vers l'admin PackAc avec la
//      clé d'édition (?edit=…), lue ICI côté serveur — jamais dans le code public.
//   3. Sinon, on renvoie vers la page de connexion de l'admin maître.
//
// Variables d'environnement (Vercel, projet voyages21) :
//   PACKAC_EDIT_TOKEN  — la même valeur que EDIT_TOKEN du projet PackAc.
//   PACKAC_ADMIN_URL   — (optionnel) URL de l'admin PackAc ; défaut ci-dessous.

import { NextResponse } from 'next/server';
import { getRole } from '../../../lib/auth.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const DEFAULT_ADMIN_URL = 'https://packages-appli-da-21.vercel.app/admin';

export async function GET(request) {
  const role = await getRole(request);

  // Pas connecté → on renvoie vers la connexion de l'admin maître.
  if (!role) {
    return NextResponse.redirect(new URL('/admin', request.url), { status: 302 });
  }

  const base = (process.env.PACKAC_ADMIN_URL || DEFAULT_ADMIN_URL).trim();
  const token = (process.env.PACKAC_EDIT_TOKEN || '').trim();

  // Connecté mais clé non configurée → on ouvre l'admin sans clé (il affichera
  // son écran « mode édition fermé »), plutôt que d'échouer.
  if (!token) {
    return NextResponse.redirect(base, { status: 302 });
  }

  const url = base + (base.includes('?') ? '&' : '?') + 'edit=' + encodeURIComponent(token);
  return NextResponse.redirect(url, { status: 302 });
}
