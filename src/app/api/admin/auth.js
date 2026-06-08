import { createHmac, timingSafeEqual } from 'node:crypto';

const COOKIE = 'v21_admin';
const DEFAULT_SECRET = 'voyages21-change-this-secret';

function secret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.NEXTAUTH_SECRET || DEFAULT_SECRET;
}

function sign(payload) {
  return createHmac('sha256', secret()).update(payload).digest('hex');
}

function safeEqual(a, b) {
  const aa = Buffer.from(String(a || ''));
  const bb = Buffer.from(String(b || ''));
  if (aa.length !== bb.length) return false;
  return timingSafeEqual(aa, bb);
}

function encode(data) {
  return Buffer.from(JSON.stringify(data)).toString('base64url');
}

function decode(payload) {
  return JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
}

export function makeSession(role, ttlHours) {
  const exp = Date.now() + Math.max(1, Number(ttlHours || 24)) * 60 * 60 * 1000;
  const payload = encode({ role, exp });
  return `${payload}.${sign(payload)}`;
}

export function parseSession(request) {
  const raw = request.cookies.get(COOKIE)?.value || '';
  const [payload, sig] = raw.split('.');
  if (!payload || !sig || !safeEqual(sign(payload), sig)) return null;
  try {
    const session = decode(payload);
    if (!session.exp || Date.now() > session.exp) return null;
    if (session.role !== 'owner' && session.role !== 'media') return null;
    return session;
  } catch {
    return null;
  }
}

export function canWriteMedia(request) {
  const session = parseSession(request);
  return !!session && (session.role === 'owner' || session.role === 'media');
}

export function canWriteOwner(request) {
  const session = parseSession(request);
  return !!session && session.role === 'owner';
}

export function passwordFor(role) {
  if (role === 'owner') return process.env.OWNER_ADMIN_PASSWORD || '';
  return process.env.MEDIA_ADMIN_PASSWORD || '';
}

export function cookieOptions(ttlHours) {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    path: '/',
    maxAge: Math.max(1, Number(ttlHours || 24)) * 60 * 60,
  };
}

export { COOKIE, safeEqual };
