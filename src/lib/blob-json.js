import { list, put, del } from '@vercel/blob';

// Fichiers JSON « versionnés » dans Vercel Blob (catalogue des voyages, médiathèque).
//
// Pourquoi : un fichier réécrit à la MÊME adresse peut être resservi dans son ancienne
// version par le cache du stockage pendant un moment, même avec un paramètre ?ts=. Deux
// écritures rapprochées repartaient alors d'une version périmée et effaçaient la
// précédente : le 07/11/2026, sur 13 voyages prescrits supprimés à la suite, une partie
// des suppressions et des étiquettes « médias conservés » a été perdue.
//
// Comment : chaque écriture crée un NOUVEAU fichier (même nom + suffixe aléatoire, donc
// une adresse jamais vue par le cache) ; la lecture prend le plus récent de la liste.
// On garde les GARDE dernières versions (petit historique), les plus anciennes sont
// effacées. L'ancien fichier à nom fixe reste lu tant qu'aucune version n'existe.
const GARDE = 10;

function baseOf(pathname) {
  return pathname.replace(/\.json$/, '');
}

async function versions(pathname) {
  const base = baseOf(pathname);
  const all = [];
  let cursor;
  do {
    const r = await list({ prefix: base, limit: 1000, cursor });
    all.push(...r.blobs);
    cursor = r.hasMore ? r.cursor : undefined;
  } while (cursor);
  return all
    .filter((b) => b.pathname === pathname || (b.pathname.startsWith(base + '-') && b.pathname.endsWith('.json')))
    .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
}

// Renvoie le contenu le plus récent, `fallback` s'il n'existe aucun fichier.
// Une lecture qui échoue LÈVE une erreur : repartir d'un catalogue vide puis l'écrire
// effacerait tout.
export async function readJson(pathname, fallback) {
  const v = await versions(pathname);
  if (!v.length) return fallback;
  const res = await fetch(v[0].url, { cache: 'no-store' });
  if (!res.ok) throw new Error('lecture de ' + pathname + ' impossible (' + res.status + ')');
  return res.json();
}

export async function writeJson(pathname, data) {
  const blob = await put(pathname, JSON.stringify(data), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: true,
  });
  // Ménage : on garde les GARDE versions les plus récentes (jamais l'ancien fichier fixe).
  try {
    const v = await versions(pathname);
    const vieux = v.filter((b) => b.pathname !== pathname).slice(GARDE).map((b) => b.url);
    if (vieux.length) await del(vieux);
  } catch {
    // le ménage peut attendre la prochaine écriture
  }
  return blob;
}
