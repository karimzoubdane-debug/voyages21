// Réglages de l'espace admin stockés dans Vercel Blob :
//   - teamPasswordHash : empreinte du mot de passe équipe (jamais le mot de passe clair)
//   - teamOpen         : interrupteur ouvert/fermé de l'accès équipe
// À n'utiliser que côté runtime Node (jamais dans le middleware Edge).

import { list, put } from '@vercel/blob';

const CONFIG_PATH = 'voyages21/admin-config.json';

const DEFAULT = { teamPasswordHash: '', teamOpen: false };

export async function readAdminConfig() {
  try {
    const { blobs } = await list({ prefix: CONFIG_PATH, limit: 1 });
    const hit = blobs.find((b) => b.pathname === CONFIG_PATH);
    if (!hit) return { ...DEFAULT };
    // Cache-bust : relecture fraîche après une modification (cf. /api/produits).
    const fresh = hit.url + (hit.url.includes('?') ? '&' : '?') + 'ts=' + Date.now();
    const res = await fetch(fresh, { cache: 'no-store' });
    if (!res.ok) return { ...DEFAULT };
    const data = await res.json();
    return { ...DEFAULT, ...data };
  } catch {
    return { ...DEFAULT };
  }
}

export async function writeAdminConfig(data) {
  await put(CONFIG_PATH, JSON.stringify(data), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}
