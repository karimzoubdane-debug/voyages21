// POST /api/produits-from-pdf
//
// Lit le PDF d'un voyage (brochure envoyée par l'équipe) et en déduit une fiche
// complète — prix, hôtels, vols, dates, inclus — au format attendu par
// public/voyages/render.js, puis l'enregistre dans le catalogue.
//
// Le voyage est créé MASQUÉ (status.hidden) : l'extraction automatique n'est pas
// infaillible, Karim relit la fiche dans l'Admin Produits puis la rend visible
// avec le bouton « Statut ». Rien n'est publié sans son accord.
//
// Corps attendu : { pdfUrl, tag, title?, destinations?, groupId? }
//   pdfUrl  — l'URL Blob du PDF déjà téléversé par /api/pdf/upload, ou d'une image
//             (JPG, PNG, WEBP) téléversée par /api/media/upload : une brochure
//             reçue en photo se lit de la même façon
//   tag     — la destination choisie dans l'admin (ex. « عمرة », « Turquie »)
//   title   — titre imposé ; sinon celui que le modèle lit dans le PDF

import Anthropic from '@anthropic-ai/sdk';
import { readJson, writeJson } from '../../../lib/blob-json.js';
import { getRole } from '../../../lib/auth.js';
import { docxText } from '../../../lib/docx-text.js';
import { rtfText } from '../../../lib/rtf-text.js';
import WordExtractor from 'word-extractor';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// L'extraction dure typiquement 20 à 60 s ; on laisse de la marge.
export const maxDuration = 300;

const MANIFEST = 'voyages21/produits-manifest.json';
const MODEL = 'claude-opus-5';
// Limite volontairement basse (la 1ʳᵉ brochure fait ~4 Mo) : au-delà, la requête
// coûte cher et risque de dépasser le temps d'exécution de la fonction.
const MAX_PDF_BYTES = 8 * 1024 * 1024;
// Images : 10 Mo maximum une fois encodées (limite de l'API), soit ~7,5 Mo bruts.
// L'admin réduit d'elle-même les images plus lourdes avant l'envoi.
const MAX_IMAGE_BYTES = 7.5 * 1024 * 1024;
const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
// Documents Word (Karim, 07/11/2026) : .docx / .docm / .dotx / .dotm (archives ZIP),
// .doc / .dot (ancien format binaire) et RTF. Leur texte est extrait ici puis lu comme
// la brochure.
const DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
const WORD_ZIP = [DOCX, 'application/vnd.ms-word.document.macroEnabled.12',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.template', 'application/vnd.ms-word.template.macroEnabled.12'];
const WORD_BIN = 'application/msword';
const RTF = 'application/rtf';
const WORD_TYPES = WORD_ZIP.concat([WORD_BIN, RTF, 'text/rtf']);
const MAX_DOCX_BYTES = 8 * 1024 * 1024;
function estWord(kind) { return WORD_TYPES.includes(kind); }
async function texteWord(kind, buf) {
  if (kind === RTF || kind === 'text/rtf') return rtfText(buf);
  if (WORD_ZIP.includes(kind)) {
    try { return docxText(buf); } catch { /* sinon, lecteur général ci-dessous */ }
  }
  const doc = await new WordExtractor().extract(buf);
  return String(doc.getBody() || '').trim();
}

// Type du fichier : d'abord l'en-tête renvoyé par le stockage, sinon l'extension.
function fileKind(res, url) {
  const ct = String(res.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
  if (ct === 'application/pdf' || WORD_TYPES.includes(ct) || IMAGE_TYPES.includes(ct)) return ct === 'text/rtf' ? RTF : ct;
  const ext = (String(url).split('?')[0].split('.').pop() || '').toLowerCase();
  return { pdf: 'application/pdf', docx: DOCX, docm: WORD_ZIP[1], dotx: WORD_ZIP[2], dotm: WORD_ZIP[3], doc: WORD_BIN, dot: WORD_BIN, rtf: RTF,
    jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', gif: 'image/gif', webp: 'image/webp' }[ext] || '';
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || ('voyage-' + Date.now());
}

async function readManifest() {
  const empty = { custom: {}, status: {}, pending: {}, trash: {}, order: {}, groupOrder: {} };
  const data = await readJson(MANIFEST, null);
  return data ? { ...empty, ...data } : { ...empty };
}

async function writeManifest(data) {
  await writeJson(MANIFEST, data);
}

// Schéma de la réponse. Il doit rester PLAT et COURT : le moteur de sorties
// structurées compile une grammaire à partir du schéma et refuse (400 « compiled
// grammar is too large ») dès qu'il y a trop de champs optionnels, de anyOf ou
// d'imbrications. D'où : que des chaînes et des listes de chaînes, pas de type
// nullable (un champ inconnu revient en chaîne vide), deux objets imbriqués au
// maximum. La forme attendue par render.js est reconstruite plus bas, dans
// assembleFiche().
const str = { type: 'string' };
const strList = { type: 'array', items: { type: 'string' } };

const FICHE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: [
    'lang', 'title', 'eyebrow', 'duration', 'price', 'pricePrefix',
    'cadranLabels', 'cadranValues', 'intro', 'highlights', 'programme', 'route',
    'hotels', 'priceStyle', 'priceColumns', 'priceCurrency', 'priceNote', 'priceRows',
    'datesList', 'datesLine', 'datesNote', 'inclus', 'exclus', 'days',
  ],
  properties: {
    lang: { type: 'string', enum: ['fr', 'ar'] },
    title: str,
    eyebrow: str,
    duration: str,
    price: str,
    pricePrefix: str,
    cadranLabels: strList,
    cadranValues: strList,
    intro: strList,
    highlights: strList,
    programme: strList,
    route: strList,
    hotels: strList,
    priceStyle: { type: 'string', enum: ['hotel-grid', 'simple', 'none'] },
    priceColumns: strList,
    priceCurrency: str,
    priceNote: str,
    priceRows: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['left', 'right', 'cells'],
        properties: { left: str, right: str, cells: strList },
      },
    },
    datesList: strList,
    datesLine: str,
    datesNote: str,
    inclus: strList,
    exclus: strList,
    days: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['num', 'title', 'text'],
        properties: { num: str, title: str, text: str },
      },
    },
  },
};

const SYSTEM = [
  "Tu remplis la fiche d'un voyage de l'agence marocaine Voyages 21 à partir de sa brochure PDF.",
  '',
  "RÈGLE ABSOLUE : n'invente jamais. Prix, noms d'hôtels, horaires, dates et compagnies",
  'doivent venir du PDF, au caractère près. Toute information absente de la brochure',
  'reste une chaîne vide ou une liste vide — ne la devine pas, ne la complète pas.',
  '',
  'Écris dans la langue de la brochure : une brochure en arabe donne une fiche en arabe',
  '(lang "ar"), titres, intros et libellés compris.',
  '',
  'Champ par champ :',
  '- eyebrow : une ligne de contexte, ex. "عمرة · طيران مباشر إلى جدة مع طيران ناس".',
  '- duration : ex. "13 ليلة" ou "8 jours / 7 nuits".',
  '- price : le prix le PLUS BAS du tableau, ex. "13 900 درهم" ; vide si la brochure',
  '  n\'affiche aucun prix. pricePrefix : "انطلاقا من" en arabe, "À partir de" en français.',
  '- cadranLabels et cadranValues : deux listes de MÊME longueur, lues en parallèle',
  '  (départ, compagnie, durée, date d\'aller, date de retour).',
  '- priceStyle : "hotel-grid" pour une Omra (chaque ligne = un couple d\'hôtels),',
  '  "simple" pour un circuit ou un séjour, "none" s\'il n\'y a pas de tableau.',
  '- priceRows, style "hotel-grid" : left = hôtel de Médine, right = hôtel de La Mecque,',
  '  cells = un prix par colonne de priceColumns (ex. ثنائية, ثلاثية, رباعية), "—" si vide.',
  '- priceRows, style "simple" : left et right vides, cells = les cellules de la ligne,',
  '  dans l\'ordre des en-têtes donnés par priceColumns.',
  '- datesNote : horaires de vol et mentions légales de la brochure, recopiés fidèlement.',
  '- days : le jour par jour, pour les circuits seulement ; liste vide pour une Omra.',
  '',
  'intro et highlights sont les seuls textes que tu rédiges : factuels, appuyés sur le PDF,',
  'sans superlatif inventé, 3 phrases maximum par paragraphe.',
].join('\n');

// Passe de la réponse plate à la forme attendue par public/voyages/render.js.
function assembleFiche(raw) {
  const txt = (v) => (typeof v === 'string' ? v.trim() : '');
  const listOf = (v) => (Array.isArray(v) ? v.filter((x) => txt(x)) : []);
  const product = {};

  const put1 = (key, value) => { if (value) product[key] = value; };
  const putList = (key, value) => { if (value.length) product[key] = value; };

  product.lang = raw.lang === 'ar' ? 'ar' : 'fr';
  put1('title', txt(raw.title));
  put1('eyebrow', txt(raw.eyebrow));
  put1('duration', txt(raw.duration));
  put1('price', txt(raw.price));
  put1('pricePrefix', txt(raw.pricePrefix));

  // Le cadran arrive en deux listes parallèles ; render.js attend des paires.
  const labels = listOf(raw.cadranLabels);
  const values = Array.isArray(raw.cadranValues) ? raw.cadranValues : [];
  const cadran = labels
    .map((label, i) => [label, txt(values[i])])
    .filter(([, value]) => value);
  putList('cadran', cadran);

  putList('intro', listOf(raw.intro));
  putList('highlights', listOf(raw.highlights));
  putList('programme', listOf(raw.programme));
  putList('route', listOf(raw.route));
  putList('datesList', listOf(raw.datesList));
  putList('inclus', listOf(raw.inclus));
  putList('exclus', listOf(raw.exclus));

  const days = (Array.isArray(raw.days) ? raw.days : [])
    .filter((d) => d && txt(d.title))
    .map((d) => ({ num: txt(d.num), title: txt(d.title), text: txt(d.text) }));
  putList('days', days);

  const rows = (Array.isArray(raw.priceRows) ? raw.priceRows : [])
    .filter((r) => r && listOf(r.cells).length);
  // Sur une Omra, le tableau porte déjà les hôtels ligne par ligne : reprendre la
  // liste « Hébergement » ferait doublon. Sur un circuit ou un séjour, le tableau
  // ne les contient pas — on la garde.
  if (raw.priceStyle !== 'hotel-grid') putList('hotels', listOf(raw.hotels));
  if (raw.priceStyle === 'hotel-grid' && rows.length) {
    product.priceTable = {
      style: 'hotel-grid',
      medina: { label: product.lang === 'ar' ? 'المدينة المنورة' : 'Médine' },
      mecca: { label: product.lang === 'ar' ? 'مكة المكرمة' : 'La Mecque' },
      columns: listOf(raw.priceColumns),
      currency: txt(raw.priceCurrency) || (product.lang === 'ar' ? 'درهم' : 'DH'),
      rows: rows.map((r) => ({
        medinaHotel: { name: txt(r.left) },
        meccaHotel: { name: txt(r.right) },
        prices: r.cells.map((c) => txt(c) || '—'),
      })),
    };
    if (txt(raw.priceNote)) product.priceTable.note = txt(raw.priceNote);
  } else if (raw.priceStyle === 'simple' && rows.length) {
    product.priceTable = {
      head: listOf(raw.priceColumns),
      rows: rows.map((r) => r.cells.map((c) => txt(c))),
    };
    if (txt(raw.priceNote)) product.priceTable.note = txt(raw.priceNote);
  }

  if (txt(raw.datesLine) || txt(raw.datesNote)) {
    product.dates = {};
    if (txt(raw.datesLine)) product.dates.line = txt(raw.datesLine);
    if (txt(raw.datesNote)) product.dates.note = txt(raw.datesNote);
  }

  product.cta = product.lang === 'ar'
    ? { title: 'هل تنوون السفر معنا؟', text: 'ننظّم رحلتكم على المقاس وفق تواريخكم ورغباتكم — Voyages 21، منذ سنة 2000.' }
    : { title: 'Envie de partir ?', text: 'Nous organisons votre voyage sur mesure, à vos dates — Voyages 21, depuis 2000.' };

  return product;
}

export async function POST(request) {
  const role = await getRole(request);
  if (role !== 'owner' && role !== 'team') {
    return Response.json({ ok: false, error: 'non autorisé' }, { status: 401, headers: corsHeaders });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { ok: false, error: "La clé ANTHROPIC_API_KEY n'est pas réglée dans Vercel : la lecture automatique du PDF est indisponible." },
      { status: 503, headers: corsHeaders },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'corps de requête illisible' }, { status: 400, headers: corsHeaders });
  }

  const { pdfUrl, tag } = body || {};
  if (!pdfUrl || !tag) {
    return Response.json({ ok: false, error: 'pdfUrl et tag requis' }, { status: 400, headers: corsHeaders });
  }

  // 1) Récupérer le PDF (ou l'image) déjà téléversé.
  let pdfBase64;
  let kind;
  let docTexte = '';
  try {
    const res = await fetch(pdfUrl, { cache: 'no-store' });
    if (!res.ok) throw new Error('fichier introuvable (' + res.status + ')');
    kind = fileKind(res, pdfUrl);
    if (!kind) {
      return Response.json(
        { ok: false, error: 'Format non pris en charge : envoyez un PDF, un document Word (.docx, .doc, .rtf…) ou une image JPG, PNG ou WEBP.' },
        { status: 415, headers: corsHeaders },
      );
    }
    const buf = Buffer.from(await res.arrayBuffer());
    if (estWord(kind)) {
      if (buf.length > MAX_DOCX_BYTES) {
        return Response.json({ ok: false, error: 'Document Word trop lourd (' + Math.round(buf.length / 1e6) + ' Mo, maximum 8 Mo).' }, { status: 413, headers: corsHeaders });
      }
      docTexte = await texteWord(kind, buf);
      if (!docTexte) throw new Error('le document Word ne contient pas de texte lisible');
    }
    const isPdf = kind === 'application/pdf';
    if (!estWord(kind) && buf.length > (isPdf ? MAX_PDF_BYTES : MAX_IMAGE_BYTES)) {
      return Response.json(
        { ok: false, error: (isPdf ? 'PDF' : 'Image') + ' trop lourd' + (isPdf ? '' : 'e') + ' (' + Math.round(buf.length / 1e6) + ' Mo, maximum ' + (isPdf ? '8' : '7') + ' Mo).' },
        { status: 413, headers: corsHeaders },
      );
    }
    pdfBase64 = buf.toString('base64');
  } catch (e) {
    return Response.json(
      { ok: false, error: 'Lecture du PDF impossible : ' + String((e && e.message) || e) },
      { status: 502, headers: corsHeaders },
    );
  }

  // 2) Demander la fiche au modèle, au format imposé par FICHE_SCHEMA.
  let raw;
  try {
    const client = new Anthropic();
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 16000,
      system: SYSTEM,
      output_config: { format: { type: 'json_schema', schema: FICHE_SCHEMA } },
      messages: [
        {
          role: 'user',
          content: estWord(kind)
            ? [
              { type: 'text', text: 'La brochure est fournie en document Word ; en voici le texte (les cellules de tableau sont séparées par « | ») :\n\n' + docTexte },
              { type: 'text', text: 'Lis ce texte comme le PDF de la brochure. Remplis la fiche de ce voyage. Destination retenue dans l\'admin : ' + tag + '.' },
            ]
            : [
            kind === 'application/pdf'
              ? { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: pdfBase64 } }
              : { type: 'image', source: { type: 'base64', media_type: kind, data: pdfBase64 } },
            { type: 'text', text: (kind === 'application/pdf' ? '' : 'La brochure est fournie en image (photo ou capture) : lis-la comme le PDF. ')
              + 'Remplis la fiche de ce voyage. Destination retenue dans l\'admin : ' + tag + '.' },
          ],
        },
      ],
    });
    if (response.stop_reason === 'refusal') {
      throw new Error('le modèle a refusé de traiter ce document');
    }
    const text = (response.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('');
    raw = JSON.parse(text);
  } catch (e) {
    return Response.json(
      { ok: false, error: 'Lecture automatique impossible : ' + String((e && e.message) || e) },
      { status: 502, headers: corsHeaders },
    );
  }

  // 3) Reconstruire la fiche au format du site.
  const product = assembleFiche(raw);

  const title = String(body.title || product.title || '').trim();
  if (!title) {
    return Response.json({ ok: false, error: 'aucun titre trouvé dans le PDF' }, { status: 422, headers: corsHeaders });
  }
  product.title = title;
  product.tag = tag;
  // Un document Word n'est pas proposé aux clients comme brochure : il est gardé comme
  // fichier source de la fiche (et rangé avec les médias si le voyage est supprimé).
  if (estWord(kind)) product.sourceUrl = pdfUrl;
  else product.pdfUrl = pdfUrl;
  product.whatsapp = '212614152686';
  if (Array.isArray(body.destinations) && body.destinations.length) product.destinations = body.destinations;
  if (body.groupId) product.groupId = body.groupId;

  // 4) Enregistrer, masqué jusqu'à relecture.
  const slug = slugify(title);
  try {
    const data = await readManifest();
    data.custom[slug] = { ...product, slug, mediaKey: slug, createdAt: new Date().toISOString() };
    data.status[slug] = { ...(data.status[slug] || {}), hidden: true };
    await writeManifest(data);
  } catch (e) {
    return Response.json(
      { ok: false, error: 'Enregistrement impossible : ' + String((e && e.message) || e) },
      { status: 500, headers: corsHeaders },
    );
  }

  return Response.json({ ok: true, slug, title, hidden: true }, { headers: corsHeaders });
}
