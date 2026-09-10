// Authentification de l'espace admin Voyages21.
// Volontairement sans dépendance et basée sur Web Crypto, pour fonctionner
// à la fois côté middleware (runtime Edge) et côté routes API (runtime Node).
//
// Deux rôles : 'owner' (Karim, accès total) et 'team' (équipe, accès limité).
// Le cookie de session est un jeton signé (HMAC-SHA256) : impossible à forger
// sans connaître V21_AUTH_SECRET.

export const COOKIE_NAME = 'v21_session';
export const SESSION_MAX_AGE = 60 * 60 * 12; // 12 heures

// Réglages secrets (à définir dans Vercel). Valeurs de repli = "mode démo"
// pour pouvoir tester la preview avant configuration. À NE PAS laisser en prod.
export const OWNER_PASSWORD = process.env.V21_OWNER_PASSWORD || 'admin21';
const AUTH_SECRET = process.env.V21_AUTH_SECRET || 'dev-secret-voyages21-change-me';
export const IS_CONFIGURED = !!(process.env.V21_OWNER_PASSWORD && process.env.V21_AUTH_SECRET);

// Code de secours pour réinitialiser le mot de passe propriétaire en cas d'oubli.
// Vide = fonction désactivée (il faut définir V21_RECOVERY_CODE dans Vercel).
export const RECOVERY_CODE = process.env.V21_RECOVERY_CODE || '';

// Jeton d'API (admin maître sur admin.moroccovoyages21.com) : un jeton signé
// avec V21_API_SECRET, envoyé dans l'en-tête « Authorization: Bearer … ».
// Vide = fonction désactivée (seul le cookie de session est accepté).
const API_SECRET = process.env.V21_API_SECRET || '';
export const API_AUDIENCE = 'v21-api';

const encoder = new TextEncoder();

function base64urlFromBytes(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64urlFromString(str) {
  return base64urlFromBytes(encoder.encode(str));
}

function stringFromBase64url(input) {
  let s = input.replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  const binary = atob(s);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

async function hmacWith(secret, message) {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
  return base64urlFromBytes(signature);
}

function hmac(message) {
  return hmacWith(AUTH_SECRET, message);
}

// Empreinte d'un mot de passe (pour stocker le code équipe sans le mot de passe clair).
export async function hashPassword(password) {
  return hmac('pw:' + password);
}

export async function createToken(role) {
  const payload = { role, exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE };
  const body = base64urlFromString(JSON.stringify(payload));
  const signature = await hmac(body);
  return body + '.' + signature;
}

async function verifyWith(secret, token) {
  if (!token || token.indexOf('.') === -1) return null;
  const cut = token.lastIndexOf('.');
  const body = token.slice(0, cut);
  const signature = token.slice(cut + 1);
  const expected = await hmacWith(secret, body);
  if (signature !== expected) return null;
  let payload;
  try {
    payload = JSON.parse(stringFromBase64url(body));
  } catch {
    return null;
  }
  if (!payload || !payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
  return payload;
}

export function verifyTokenString(token) {
  return verifyWith(AUTH_SECRET, token);
}

// Jeton d'API : même format que le cookie, mais signé avec V21_API_SECRET et
// portant aud = 'v21-api' (un cookie de session ne peut pas servir de jeton d'API
// et inversement). Désactivé tant que V21_API_SECRET n'est pas défini.
export async function verifyApiToken(token) {
  if (!API_SECRET) return null;
  const payload = await verifyWith(API_SECRET, token);
  if (!payload || payload.aud !== API_AUDIENCE) return null;
  if (payload.role !== 'owner' && payload.role !== 'team') return null;
  return payload;
}

function readBearer(request) {
  const header = request.headers.get('authorization') || '';
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : null;
}

function readCookie(request, name) {
  const header = request.headers.get('cookie') || '';
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = header.match(new RegExp('(?:^|; )' + escaped + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

// Rôle courant ('owner' | 'team' | null) : cookie de session en priorité,
// sinon jeton d'API « Authorization: Bearer … » (admin maître à distance).
export async function getRole(request) {
  const payload = await verifyTokenString(readCookie(request, COOKIE_NAME));
  if (payload) return payload.role;
  const bearer = readBearer(request);
  if (!bearer) return null;
  const api = await verifyApiToken(bearer);
  return api ? api.role : null;
}
