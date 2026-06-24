// Connexion / déconnexion / session de l'espace admin.
//   GET    → rôle courant
//   POST   { password } → connexion (pose le cookie de session)
//   DELETE → déconnexion (efface le cookie)

import { NextResponse } from 'next/server';
import {
  COOKIE_NAME,
  SESSION_MAX_AGE,
  OWNER_PASSWORD,
  IS_CONFIGURED,
  createToken,
  getRole,
  hashPassword,
} from '../../../lib/auth.js';
import { readAdminConfig } from '../../../lib/adminConfig.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const noStore = { 'Cache-Control': 'no-store' };

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  path: '/',
};

export async function GET(request) {
  const role = await getRole(request);
  return NextResponse.json({ role, configured: IS_CONFIGURED }, { headers: noStore });
}

export async function POST(request) {
  let body = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  const password = String(body.password || '');
  if (!password) {
    return NextResponse.json({ ok: false, error: 'Mot de passe requis' }, { status: 400, headers: noStore });
  }

  let role = null;
  if (password === OWNER_PASSWORD) {
    role = 'owner';
  } else {
    const cfg = await readAdminConfig();
    if (cfg.teamOpen && cfg.teamPasswordHash) {
      const candidate = await hashPassword(password);
      if (candidate === cfg.teamPasswordHash) role = 'team';
    }
  }

  if (!role) {
    return NextResponse.json(
      { ok: false, error: 'Mot de passe incorrect (ou accès équipe fermé).' },
      { status: 401, headers: noStore },
    );
  }

  const token = await createToken(role);
  const res = NextResponse.json({ ok: true, role }, { headers: noStore });
  res.cookies.set(COOKIE_NAME, token, { ...cookieOptions, maxAge: SESSION_MAX_AGE });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true }, { headers: noStore });
  res.cookies.set(COOKIE_NAME, '', { ...cookieOptions, maxAge: 0 });
  return res;
}
