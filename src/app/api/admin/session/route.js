import { COOKIE, parseSession } from '../auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const noStore = { 'Cache-Control': 'no-store' };

export async function GET(request) {
  const session = parseSession(request);
  if (!session) return Response.json({ ok: false }, { status: 401, headers: noStore });
  return Response.json({ ok: true, role: session.role, exp: session.exp }, { headers: noStore });
}

export async function DELETE() {
  const res = Response.json({ ok: true }, { headers: noStore });
  res.cookies.set(COOKIE, '', { path: '/', maxAge: 0 });
  return res;
}
