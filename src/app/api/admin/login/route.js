import { COOKIE, cookieOptions, makeSession, passwordFor, safeEqual } from '../auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const noStore = { 'Cache-Control': 'no-store' };

export async function POST(request) {
  try {
    const body = await request.json();
    const role = body?.role === 'owner' ? 'owner' : 'media';
    const ttlHours = Number(body?.ttlHours || 24);
    const expected = passwordFor(role);

    if (!expected) {
      return Response.json(
        { ok: false, error: `Mot de passe ${role} non configure sur Vercel.` },
        { status: 503, headers: noStore },
      );
    }

    if (!safeEqual(body?.password || '', expected)) {
      return Response.json({ ok: false, error: 'Mot de passe incorrect.' }, { status: 401, headers: noStore });
    }

    const res = Response.json({ ok: true, role, expiresInHours: ttlHours }, { headers: noStore });
    res.cookies.set(COOKIE, makeSession(role, ttlHours), cookieOptions(ttlHours));
    return res;
  } catch (e) {
    return Response.json(
      { ok: false, error: String((e && e.message) || e) },
      { status: 400, headers: noStore },
    );
  }
}
