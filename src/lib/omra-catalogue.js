// Les programmes Omra de l'Admin Produits, lus côté serveur pour les pages /omra.
//
// Pourquoi : les fiches de l'admin (voyage-admin.html?slug=…) sont écrites par un script,
// donc vides pour Google et pour les robots d'IA. Relevé du 09/11/2026 (performances-sites,
// revue/etude-maroc) : voyages21.com est absent des 10 premiers résultats sur les cinq
// recherches Omra tapées depuis le Maroc ; les premiers ont une page par programme, au nom
// de la recherche. Ces pages servent le MÊME catalogue que l'admin (rien n'est recopié à la
// main) : un programme ajouté, modifié, masqué ou prescrit dans l'admin l'est ici aussi.
//
// Les textes des programmes restent ceux de l'équipe (en arabe) ; seuls les repères
// (titre de page, dates, ville de départ, compagnie, prix) sont donnés en français, par des
// correspondances exactes — un mot inconnu reste tel quel, rien n'est deviné.
import { readJson } from './blob-json.js';
import '../../public/voyages/fin-voyage.js'; // pose globalThis.V21Fin (règle des voyages passés)

const MANIFEST = 'voyages21/produits-manifest.json';
const OMRA = /عمرة|عمره|omra|umrah/i;
const ARABE = /[؀-ۿ]/;

export const AGENCE = 'Voyages21, agence de voyages à Marrakech depuis 2000';

// Lecture du catalogue : le stockage du site (Vercel Blob). Pour un essai hors de Vercel
// (pas de jeton Blob), V21_CATALOGUE_PUBLIC_URL peut pointer vers l'API publique du site,
// qui sert le même catalogue ; cette variable n'est pas posée sur Vercel.
export async function lireCatalogue() {
  try {
    if (process.env.V21_CATALOGUE_PUBLIC_URL) {
      const r = await fetch(process.env.V21_CATALOGUE_PUBLIC_URL, { cache: 'no-store' });
      return r.ok ? r.json() : null;
    }
    const data = await readJson(MANIFEST, null);
    return data || null;
  } catch {
    return null; // la page dit alors que les programmes sont momentanément indisponibles
  }
}

function fin() {
  return globalThis.V21Fin || null;
}

// Les programmes Omra visibles, comme la page « Omra & Hajj » les montre : ni masqués,
// ni retirés, ni prescrits (7 jours après la date de fin, règle de Karim du 07/11/2026).
export function programmesOmra(catalogue) {
  if (!catalogue || !catalogue.custom) return [];
  const status = catalogue.status || {};
  const F = fin();
  const out = [];
  for (const [slug, v] of Object.entries(catalogue.custom)) {
    if (!v || typeof v !== 'object') continue;
    const texte = [v.title, v.eyebrow, v.tag].join(' ');
    if (!OMRA.test(texte)) continue;
    const st = status[slug] || {};
    if (st.hidden || st.removed) continue;
    const info = F ? F.prescritInfo(v, st) : { solde: false, aSupprimer: false, fin: '' };
    if (info.aSupprimer) continue;
    out.push({ slug, produit: v, solde: !!info.solde, fin: info.fin || '' });
  }
  // Les programmes en cours d'abord, par date de fin ; les passés (badge SOLDÉ) ensuite.
  out.sort((a, b) => (a.solde - b.solde) || ((a.fin || '9999') < (b.fin || '9999') ? -1 : 1));
  return out;
}

export function programmeOmra(catalogue, slug) {
  return programmesOmra(catalogue).find((p) => p.slug === slug) || null;
}

// ── Repères en français ──
const MOIS = {
  'يناير': 'janvier', 'فبراير': 'février', 'مارس': 'mars', 'أبريل': 'avril', 'ابريل': 'avril', 'إبريل': 'avril',
  'ماي': 'mai', 'مايو': 'mai', 'يونيو': 'juin', 'يونيه': 'juin', 'يوليوز': 'juillet', 'يوليو': 'juillet', 'يوليه': 'juillet',
  'غشت': 'août', 'أغسطس': 'août', 'اغسطس': 'août', 'شتنبر': 'septembre', 'سبتمبر': 'septembre',
  'أكتوبر': 'octobre', 'اكتوبر': 'octobre', 'نونبر': 'novembre', 'نوفمبر': 'novembre', 'دجنبر': 'décembre', 'ديسمبر': 'décembre',
};
const MOTS = { 'الذهاب': 'Départ', 'العودة': 'Retour', 'من': 'du', 'إلى': 'au', 'الى': 'au', 'و': 'et' };
const SAISONS = [['رمضان', 'Ramadan'], ['رجب', 'Rajab'], ['شعبان', 'Chaâbane'], ['شوال', 'Chawwal'], ['محرم', 'Mouharram'], ['المولد', 'Mawlid']];
const VILLES = [['مراكش', 'Marrakech'], ['الدار البيضاء', 'Casablanca'], ['الدارالبيضاء', 'Casablanca'], ['كازا', 'Casablanca'], ['CASA', 'Casablanca'], ['الرباط', 'Rabat'], ['أكادير', 'Agadir'], ['اكادير', 'Agadir'], ['فاس', 'Fès'], ['طنجة', 'Tanger']];
const COMPAGNIES = [
  ['الخطوط الملكية المغربية', 'Royal Air Maroc'], ['الخطوط المغربية', 'Royal Air Maroc'], ['لارام', 'Royal Air Maroc'],
  ['الخطوط الجوية التركية', 'Turkish Airlines'], ['الخطوط التركية', 'Turkish Airlines'],
  ['الخطوط الجوية السعودية', 'Saudia'], ['الخطوط السعودية', 'Saudia'],
  ['فلاي ناس', 'flynas'], ['طيران ناس', 'flynas'], ['الاتحاد للطيران', 'Etihad Airways'], ['العربية للطيران', 'Air Arabia'],
];

function texteDe(v) {
  const cadran = Array.isArray(v.cadran) ? v.cadran.map((c) => (Array.isArray(c) ? c.join(' ') : String(c))).join(' ') : '';
  return [v.title, v.eyebrow, cadran, ...(Array.isArray(v.datesList) ? v.datesList : [])].filter(Boolean).join(' · ');
}

function valeurCadran(v, ...labels) {
  for (const c of Array.isArray(v.cadran) ? v.cadran : []) {
    if (Array.isArray(c) && labels.includes(String(c[0]).trim())) return String(c[1] || '');
  }
  return '';
}

function premier(table, texte) {
  for (const [ar, fr] of table) if (texte.includes(ar)) return fr;
  return '';
}

export function annee(v) {
  const ans = (texteDe(v).match(/20\d\d/g) || []).map(Number);
  return ans.length ? String(Math.max(...ans)) : '';
}

export function saison(v) {
  return premier(SAISONS, [v.title, v.eyebrow].join(' '));
}

export function villeDepart(v) {
  return premier(VILLES, valeurCadran(v, 'المغادرة', 'مدينة المغادرة')) || premier(VILLES, texteDe(v));
}

export function compagnie(v) {
  const t = valeurCadran(v, 'شركة الطيران', 'الطيران') + ' ' + texteDe(v);
  const c = premier(COMPAGNIES, t);
  if (c) return c;
  if (/\bTK\b/.test(t)) return 'Turkish Airlines';
  if (/\bRAM\b/.test(t)) return 'Royal Air Maroc';
  return '';
}

// Une ligne de dates traduite mot à mot ; si un mot arabe reste inconnu, la ligne d'origine
// est rendue telle quelle (on ne traduit pas à moitié).
export function dateFr(ligne) {
  const s = String(ligne || '').trim();
  if (!ARABE.test(s)) return s;
  const out = s.replace(/[؀-ۿ]+/g, (mot) => {
    const nu = mot.replace(/[:،]+$/, '');
    const fr = MOIS[nu] || MOTS[nu];
    return fr ? fr + mot.slice(nu.length).replace(/^:$/, ' :') : mot;
  });
  return ARABE.test(out) ? s : out.replace(/\s+/g, ' ').replace(/ :\s*/g, ' : ').trim();
}

export function datesFr(v) {
  return (Array.isArray(v.datesList) ? v.datesList : []).map(dateFr).filter(Boolean);
}

export function prixFr(v) {
  const p = String(v.price || '').trim();
  if (!p) return '';
  const m = p.match(/(\d{1,3}(?:[.,\s]\d{3})+|\d+)/);
  if (!m) return '';
  return m[1].replace(/[.,\s]/g, ' ') + ' DH';
}

export function prefixePrix(v) {
  const p = String(v.pricePrefix || '').trim();
  if (/انطلاقا من|à partir de|a partir de/i.test(p)) return 'à partir de';
  return ARABE.test(p) ? '' : p;
}

// Le prix le plus bas écrit (pour la fiche machine) : celui de « price », sinon le plus bas
// de la grille des hôtels.
export function prixMinimal(v) {
  const nombres = [];
  const lire = (s) => { const m = String(s || '').match(/\d{1,3}(?:[.,\s]\d{3})+|\d{3,}/); if (m) nombres.push(Number(m[0].replace(/[.,\s]/g, ''))); };
  lire(v.price);
  for (const r of (v.priceTable && Array.isArray(v.priceTable.rows)) ? v.priceTable.rows : []) {
    for (const p of r.prices || []) lire(p);
  }
  return nombres.length ? Math.min(...nombres) : null;
}

const MOIS_FR = Object.values(MOIS).filter((m, i, a) => a.indexOf(m) === i);
const MOIS_RX = new RegExp('\\b(' + MOIS_FR.join('|') + ')\\b', 'i');

// Le mois et l'année du départ, lus sur la première ligne de dates traduite ; sans année
// sur cette ligne, l'année écrite plus loin — moins un si le retour est écrit dans un mois
// antérieur (un départ en décembre pour un retour en janvier 2027 part en 2026).
export function departFr(v) {
  const d = datesFr(v);
  if (!d.length) return { mois: '', annee: annee(v) };
  const m1 = d[0].match(MOIS_RX);
  const a1 = d[0].match(/20\d\d/);
  if (!m1) return { mois: '', annee: annee(v) };
  if (a1) return { mois: m1[1].toLowerCase(), annee: a1[0] };
  const an = annee(v);
  const dernier = d[d.length - 1].match(MOIS_RX);
  const idx = (m) => MOIS_FR.indexOf(String(m).toLowerCase());
  if (an && dernier && idx(dernier[1]) < idx(m1[1])) return { mois: m1[1].toLowerCase(), annee: String(Number(an) - 1) };
  return { mois: m1[1].toLowerCase(), annee: an };
}

export function titreFr(v) {
  const dep = departFr(v);
  const base = ['Omra', saison(v) || dep.mois, dep.annee].filter(Boolean).join(' ');
  const ville = villeDepart(v);
  return ville ? `${base} depuis ${ville}` : base;
}

export function descriptionFr(v) {
  const parts = [titreFr(v)];
  const c = compagnie(v);
  if (c) parts.push(`avec ${c}`);
  let s = parts.join(' ');
  const d = datesFr(v);
  if (d.length) s += ' : ' + d.join(' · ');
  const prix = prixFr(v);
  if (prix) s += `. ${prefixePrix(v) ? prefixePrix(v).charAt(0).toUpperCase() + prefixePrix(v).slice(1) + ' ' : ''}${prix}`;
  return s + `. ${AGENCE}.`;
}

export function whatsappUrl(v, texte) {
  const num = String(v.whatsapp || '').replace(/\D/g, '');
  if (!num) return '';
  return `https://wa.me/${num}?text=${encodeURIComponent(texte)}`;
}
