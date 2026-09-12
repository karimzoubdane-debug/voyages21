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
//   pdfUrl  — l'URL Blob du PDF déjà téléversé par /api/pdf/upload
//   tag     — la destination choisie dans l'admin (ex. « عمرة », « Turquie »)
//   title   — titre imposé ; sinon celui que le modèle lit dans le PDF

import Anthropic from '@anthropic-ai/sdk';
import { list, put } from '@vercel/blob';
import { getRole } from '../../../lib/auth.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// L'extraction dure typiquement 20 à 60 s ; on laisse de la marge.
export const maxDuration = 300;

const MANIFEST = 'voyages21/produits-manifest.json';
const MODEL = 'claude-opus-5';
// Limite volontairement basse (la 1ʳᵉ brochure fait ~4 Mo) : au-delà, la requête
// coûte cher et risque de dépasser le temps d'exécution de la fonction.
const MAX_PDF_BYTES = 8 * 1024 * 1024;

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
  const { blobs } = await list({ prefix: MANIFEST, limit: 1 });
  const hit = blobs.find((b) => b.pathname === MANIFEST);
  if (!hit) return { ...empty };
  const fresh = hit.url + (hit.url.includes('?') ? '&' : '?') + 'ts=' + Date.now();
  const res = await fetch(fresh, { cache: 'no-store' });
  if (!res.ok) return { ...empty };
  return { ...empty, ...(await res.json()) };
}

async function writeManifest(data) {
  await put(MANIFEST, JSON.stringify(data), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

// Champs lus par public/voyages/render.js. Tout est requis (contrainte des
// sorties structurées) : les parties absentes de la brochure reviennent à null
// ou en tableau vide, et sont retirées avant enregistrement.
const nullableString = { type: ['string', 'null'] };
const stringList = { type: 'array', items: { type: 'string' } };

const FICHE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: [
    'lang', 'title', 'eyebrow', 'duration', 'price', 'pricePrefix',
    'cadran', 'intro', 'highlights', 'programme', 'route', 'hotels',
    'priceTable', 'datesList', 'dates', 'inclus', 'exclus', 'days', 'cta',
  ],
  properties: {
    lang: { type: 'string', enum: ['fr', 'ar'], description: 'Langue de la brochure : "ar" si elle est en arabe.' },
    title: { type: 'string', description: 'Titre du voyage, dans la langue de la brochure.' },
    eyebrow: nullableString,
    duration: { ...nullableString, description: 'Ex. "13 ليلة" ou "8 jours / 7 nuits".' },
    price: { ...nullableString, description: 'Prix le plus bas du tableau, ex. "13 900 درهم". null si la brochure n\'affiche aucun prix.' },
    pricePrefix: { ...nullableString, description: '"انطلاقا من" en arabe, "À partir de" en français.' },
    cadran: {
      type: 'array',
      description: 'Paires [libellé, valeur] : départ, compagnie, durée, dates.',
      items: { type: 'array', items: { type: 'string' }, minItems: 2, maxItems: 2 },
    },
    intro: { ...stringList, description: '1 à 3 paragraphes de présentation, rédigés à partir de la brochure.' },
    highlights: { ...stringList, description: 'Les points forts, une phrase chacun.' },
    programme: { ...stringList, description: 'Étapes du séjour, une ligne chacune.' },
    route: { ...stringList, description: 'Villes traversées, dans l\'ordre.' },
    hotels: { ...stringList, description: 'Hébergements par formule, une ligne chacune.' },
    priceTable: {
      type: ['object', 'null'],
      additionalProperties: false,
      required: ['style', 'medina', 'mecca', 'head', 'columns', 'currency', 'rows', 'note'],
      description: 'Tableau des prix. Omra : style "hotel-grid" (couples d\'hôtels Médine/Mecque). Autres voyages : style "simple" avec head + rows.',
      properties: {
        style: { type: 'string', enum: ['hotel-grid', 'simple'] },
        medina: { type: ['object', 'null'], additionalProperties: false, required: ['label'], properties: { label: { type: 'string' } } },
        mecca: { type: ['object', 'null'], additionalProperties: false, required: ['label'], properties: { label: { type: 'string' } } },
        head: { ...stringList, description: 'En-têtes du tableau, uniquement pour le style "simple".' },
        columns: { ...stringList, description: 'Types de chambre, ex. ["ثنائية","ثلاثية","رباعية"].' },
        currency: { type: 'string' },
        rows: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['medinaHotel', 'meccaHotel', 'prices', 'cells'],
            properties: {
              medinaHotel: { type: ['object', 'null'], additionalProperties: false, required: ['name'], properties: { name: { type: 'string' } } },
              meccaHotel: { type: ['object', 'null'], additionalProperties: false, required: ['name'], properties: { name: { type: 'string' } } },
              prices: { ...stringList, description: 'Un prix par colonne, "—" si la case est vide.' },
              cells: { ...stringList, description: 'Cellules de la ligne, uniquement pour le style "simple".' },
            },
          },
        },
        note: nullableString,
      },
    },
    datesList: { ...stringList, description: 'Dates de départ, ex. "04 أكتوبر ← 18 أكتوبر 2026".' },
    dates: {
      type: ['object', 'null'],
      additionalProperties: false,
      required: ['line', 'note'],
      properties: { line: nullableString, note: { ...nullableString, description: 'Horaires de vol et mentions légales de la brochure, recopiées fidèlement.' } },
    },
    inclus: { ...stringList, description: 'Ce que le programme comprend.' },
    exclus: { ...stringList, description: 'Ce qui n\'est pas compris.' },
    days: {
      type: 'array',
      description: 'Jour par jour, pour les circuits. Vide pour une Omra.',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['num', 'title', 'text'],
        properties: { num: { type: 'string' }, title: { type: 'string' }, text: { type: 'string' } },
      },
    },
    cta: {
      type: ['object', 'null'],
      additionalProperties: false,
      required: ['title', 'text'],
      properties: { title: { type: 'string' }, text: { type: 'string' } },
    },
  },
};

const SYSTEM = [
  "Tu remplis la fiche d'un voyage de l'agence marocaine Voyages 21 à partir de sa brochure PDF.",
  '',
  "RÈGLE ABSOLUE : n'invente jamais. Prix, noms d'hôtels, horaires, dates et compagnies",
  'doivent venir du PDF, au caractère près. Si une information est absente, laisse le champ',
  "vide (null ou tableau vide) — ne le devine pas, ne le complète pas par plausibilité.",
  '',
  'Écris dans la langue de la brochure : une brochure en arabe donne une fiche en arabe',
  '(lang "ar"), y compris les titres, les intros et les libellés du cadran.',
  '',
  'Pour une Omra, le tableau des prix a le style "hotel-grid" : une ligne par couple',
  "d'hôtels (Médine + Mecque) et un prix par type de chambre. Pour un circuit ou un séjour,",
  'utilise le style "simple" avec head (en-têtes) et cells (cellules de chaque ligne).',
  '',
  "Les champs intro et highlights sont les seuls que tu rédiges : reste factuel, appuie-toi",
  'sur le contenu du PDF, pas de superlatifs inventés, 3 phrases maximum par paragraphe.',
].join('\n');

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

  // 1) Récupérer le PDF déjà téléversé.
  let pdfBase64;
  try {
    const res = await fetch(pdfUrl, { cache: 'no-store' });
    if (!res.ok) throw new Error('PDF introuvable (' + res.status + ')');
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length > MAX_PDF_BYTES) {
      return Response.json(
        { ok: false, error: 'PDF trop lourd (' + Math.round(buf.length / 1e6) + ' Mo, maximum 8 Mo).' },
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
  let fiche;
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
          content: [
            { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: pdfBase64 } },
            { type: 'text', text: 'Remplis la fiche de ce voyage. Destination retenue dans l\'admin : ' + tag + '.' },
          ],
        },
      ],
    });
    if (response.stop_reason === 'refusal') {
      throw new Error('le modèle a refusé de traiter ce document');
    }
    const text = (response.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('');
    fiche = JSON.parse(text);
  } catch (e) {
    return Response.json(
      { ok: false, error: 'Lecture automatique impossible : ' + String((e && e.message) || e) },
      { status: 502, headers: corsHeaders },
    );
  }

  // 3) Nettoyer : ce que le PDF ne disait pas ne doit pas polluer la fiche.
  const product = {};
  for (const [key, value] of Object.entries(fiche)) {
    if (value === null || value === undefined) continue;
    if (Array.isArray(value) && value.length === 0) continue;
    product[key] = value;
  }
  if (product.priceTable) {
    const pt = product.priceTable;
    if (pt.style === 'hotel-grid') {
      delete pt.head;
      (pt.rows || []).forEach((r) => delete r.cells);
    } else {
      // Style "simple" : render.js attend { head, rows } avec rows = tableaux de cellules.
      product.priceTable = {
        head: pt.head || [],
        rows: (pt.rows || []).map((r) => r.cells || []),
        note: pt.note || undefined,
      };
    }
    Object.keys(product.priceTable).forEach((k) => {
      if (product.priceTable[k] === null) delete product.priceTable[k];
    });
  }

  const title = String(body.title || product.title || '').trim();
  if (!title) {
    return Response.json({ ok: false, error: 'aucun titre trouvé dans le PDF' }, { status: 422, headers: corsHeaders });
  }
  product.title = title;
  product.tag = tag;
  product.pdfUrl = pdfUrl;
  product.whatsapp = product.whatsapp || '212614152686';
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
