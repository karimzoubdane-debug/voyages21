// Configuration du MENU / NAVIGATION du site, stockée dans Vercel Blob.
// Pilotée par le back-office /admin-menu.html (propriétaire uniquement).
// Lue publiquement par le site (menu-render.js) et par les pages de destination.
//
// Modèle : un arbre de « titres » (items) de haut niveau, chacun pouvant être :
//   - type 'mega'    : ouvre le grand panneau Destinations (continents → pays)
//   - type 'submenu' : petit menu déroulant (ex. Croisières → avec / sans visa)
//   - type 'link'    : simple lien (ex. Omra, Mon Maroc)
// Chaque « pays/page » (leaf) pointe soit vers une page existante (url),
// soit vers une page générique auto-créée (key → /voyages/destinations/page.html?key=…).

import { list, put } from '@vercel/blob';

const MENU_PATH = 'voyages21/menu-config.json';

// Menu par défaut = reproduction fidèle du menu actuel de homepage-v2-luxe.html.
// Tant que Karim n'a rien modifié, le site est strictement identique.
export const DEFAULT_MENU = {
  v: 1,
  items: [
    {
      id: 'destinations-monde',
      label: 'Destinations Monde',
      type: 'mega',
      hidden: false,
      continents: [
        {
          id: 'europe', label: 'Europe', hidden: false,
          cols: [
            { id: 'circuits-europe', label: 'Circuits Europe', url: '/voyages/destinations/europe.html', hidden: false },
            { id: 'turquie', label: 'Turquie', url: '/voyages/destinations/turquie.html', hidden: false },
          ],
        },
        {
          id: 'afrique', label: 'Afrique', hidden: false,
          cols: [
            { id: 'egypte', label: 'Égypte', url: '/voyages/destinations/egypte.html', hidden: false },
            { id: 'zanzibar', label: 'Zanzibar', url: '/voyages/destinations/zanzibar.html', hidden: false },
            { id: 'tunisie', label: 'Tunisie', url: '/voyages/destinations/tunisie.html', hidden: false },
          ],
        },
        {
          id: 'ameriques', label: 'Amériques', hidden: false,
          cols: [
            { id: 'usa-canada', label: 'USA & Canada', url: '/voyages/destinations/usa-canada.html', hidden: false },
            { id: 'cuba', label: 'Cuba', url: '/voyages/destinations/cuba.html', hidden: false },
            { id: 'perou', label: 'Pérou', url: '/voyages/destinations/perou.html', hidden: false },
          ],
        },
        {
          id: 'asie', label: 'Asie', hidden: false,
          cols: [
            { id: 'chine', label: 'Chine', url: '/voyages/destinations/chine.html', hidden: false },
            { id: 'ouzbekistan', label: 'Ouzbékistan', url: '/voyages/destinations/ouzbekistan.html', hidden: false },
            { id: 'malaisie-thailande', label: 'Malaisie & Thaïlande', url: '/voyages/destinations/malaisie-thailande.html', hidden: false },
            { id: 'bangkok-thailande', label: 'Bangkok & Thaïlande', url: '/voyages/destinations/malaisie-thailande.html', hidden: false },
            { id: 'vietnam', label: 'Vietnam', url: '/voyages/destinations/vietnam.html', hidden: false },
          ],
        },
        {
          id: 'combines', label: 'Combinés', hidden: false,
          cols: [
            { id: 'azerbaidjan-turquie', label: 'Azerbaïdjan & Turquie', url: '/voyages/asie-azerbaidjan-turquie.html', hidden: false },
            { id: 'malaisie-thailande-c', label: 'Malaisie & Thaïlande', url: '/voyages/asie-malaisie-thailande.html', hidden: false },
            { id: 'malaisie-singapour', label: 'Malaisie & Singapour', url: '/voyages/asie-malaisie-singapour.html', hidden: false },
            { id: 'malaisie-indonesie', label: 'Malaisie & Indonésie', url: '/voyages/asie-malaisie-indonesie.html', hidden: false },
            { id: 'indonesie-thailande', label: 'Indonésie & Thaïlande', url: '/voyages/asie-indonesie-thailande.html', hidden: false },
          ],
        },
      ],
    },
    {
      id: 'croisieres',
      label: 'Croisières',
      type: 'submenu',
      url: '/voyages/destinations/croisieres.html',
      hidden: false,
      children: [
        { id: 'croisieres-schengen', label: 'Croisières avec visa Schengen', url: '/voyages/destinations/croisieres.html#schengen', hidden: false },
        { id: 'croisieres-sans-schengen', label: 'Croisières sans visa Schengen', url: '/voyages/destinations/croisieres.html#sans-schengen', alert: true, hidden: false },
      ],
    },
    { id: 'omra', label: 'Omra', type: 'link', url: '/voyages/destinations/omra.html', hidden: false },
    { id: 'maroc', label: 'Mon Maroc', type: 'link', url: '/voyages/destinations/maroc.html', hidden: false },
  ],
};

export async function readMenuConfig() {
  try {
    const { blobs } = await list({ prefix: MENU_PATH, limit: 1 });
    const hit = blobs.find((b) => b.pathname === MENU_PATH);
    if (!hit) return { ...DEFAULT_MENU };
    // Anti-cache CDN (même URL après overwrite) : on relit toujours la dernière version.
    const fresh = hit.url + (hit.url.includes('?') ? '&' : '?') + 'ts=' + Date.now();
    const res = await fetch(fresh, { cache: 'no-store' });
    if (!res.ok) return { ...DEFAULT_MENU };
    const data = await res.json();
    if (!data || !Array.isArray(data.items)) return { ...DEFAULT_MENU };
    return data;
  } catch {
    return { ...DEFAULT_MENU };
  }
}

export async function writeMenuConfig(data) {
  await put(MENU_PATH, JSON.stringify(data), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}
