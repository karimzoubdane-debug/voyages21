// Connexion / déconnexion / session de l'espace admin.
//   GET    → rôle courant
//   POST   { password } → connexion (pose le cookie de session)
//   DELETE → déconnexion (efface le cookie)

import { NextResponse } from 'next/server';
import {
  COOKIE_NAME,
  SESSION_MAX_AGE,
  OWNER_PASSWORD,
  RECOVERY_CODE,
  IS_CONFIGURED,
  createToken,
  getRole,
  hashPassword,
} from '../../../lib/auth.js';
import { readAdminConfig, writeAdminConfig } from '../../../lib/adminConfig.js';

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

  // ── Réinitialisation du mot de passe propriétaire par code de secours ──
  if (body.reset) {
    if (!RECOVERY_CODE) {
      return NextResponse.json(
        { ok: false, error: 'Réinitialisation non configurée (définir V21_RECOVERY_CODE dans Vercel).' },
        { status: 400, headers: noStore },
      );
    }
    const code = String(body.recoveryCode || '');
    const newPassword = String(body.newPassword || '');
    if (!code || !newPassword) {
      return NextResponse.json({ ok: false, error: 'Code de secours et nouveau mot de passe requis.' }, { status: 400, headers: noStore });
    }
    if (code !== RECOVERY_CODE) {
      return NextResponse.json({ ok: false, error: 'Code de secours incorrect.' }, { status: 401, headers: noStore });
    }
    const cfg = await readAdminConfig();
    cfg.ownerPasswordHash = await hashPassword(newPassword);
    await writeAdminConfig(cfg);
    return NextResponse.json({ ok: true }, { headers: noStore });
  }

  const password = String(body.password || '');
  if (!password) {
    return NextResponse.json({ ok: false, error: 'Mot de passe requis' }, { status: 400, headers: noStore });
  }

  const cfg = await readAdminConfig();
  let role = null;
  // Propriétaire : mot de passe réinitialisé (stocké) prioritaire, sinon le mot de passe initial (Vercel).
  if (cfg.ownerPasswordHash) {
    if ((await hashPassword(password)) === cfg.ownerPasswordHash) role = 'owner';
  } else if (password === OWNER_PASSWORD) {
    role = 'owner';
  }
  // Équipe : si l'accès est ouvert et le mot de passe correspond.
  if (!role && cfg.teamOpen && cfg.teamPasswordHash) {
    if ((await hashPassword(password)) === cfg.teamPasswordHash) role = 'team';
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
