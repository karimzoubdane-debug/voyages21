// Réglages réservés au propriétaire :
//   GET → état (accès équipe ouvert/fermé, mot de passe équipe défini ou non)
//   PUT { teamOpen?, teamPassword? } → met à jour l'interrupteur et/ou le mot de passe équipe

import { NextResponse } from 'next/server';
import { getRole, hashPassword } from '../../../lib/auth.js';
import { readAdminConfig, writeAdminConfig } from '../../../lib/adminConfig.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const noStore = { 'Cache-Control': 'no-store' };

function summarize(cfg) {
  return { ok: true, teamOpen: !!cfg.teamOpen, teamPasswordSet: !!cfg.teamPasswordHash };
}

export async function GET(request) {
  if ((await getRole(request)) !== 'owner') {
    return NextResponse.json({ ok: false, error: 'non autorisé' }, { status: 401, headers: noStore });
  }
  const cfg = await readAdminConfig();
  return NextResponse.json(summarize(cfg), { headers: noStore });
}

export async function PUT(request) {
  if ((await getRole(request)) !== 'owner') {
    return NextResponse.json({ ok: false, error: 'non autorisé' }, { status: 401, headers: noStore });
  }
  let body = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const cfg = await readAdminConfig();
  if (typeof body.teamOpen === 'boolean') cfg.teamOpen = body.teamOpen;
  if (typeof body.teamPassword === 'string' && body.teamPassword.trim().length > 0) {
    cfg.teamPasswordHash = await hashPassword(body.teamPassword.trim());
  }
  await writeAdminConfig(cfg);
  return NextResponse.json(summarize(cfg), { headers: noStore });
}
