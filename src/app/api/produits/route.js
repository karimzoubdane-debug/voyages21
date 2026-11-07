import { readJson, writeJson } from '../../../lib/blob-json.js';
import { getRole } from '../../../lib/auth.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MANIFEST = 'voyages21/produits-manifest.json';

function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || ('voyage-' + Date.now());
}

// Le catalogue est modifiable par le propriétaire ET par l'équipe.
// (Accès complet accordé à l'équipe : statuts, modification, suppression, validation.)
async function denyIfNotAdmin(request, headers) {
  const role = await getRole(request);
  if (role === 'owner' || role === 'team') return null;
  return Response.json({ ok: false, error: 'non autorisé' }, { status: 401, headers });
}

// La corbeille (voir / restaurer / vider) est réservée au PROPRIÉTAIRE.
async function denyIfNotOwner(request, headers) {
  if ((await getRole(request)) === 'owner') return null;
  return Response.json({ ok: false, error: 'réservé au propriétaire' }, { status: 401, headers });
}

// Catalogue versionné (voir lib/blob-json.js) : chaque écriture est un nouveau fichier,
// la lecture prend le plus récent — plus de version périmée resservie par le cache.
async function readManifest() {
  const empty = { custom: {}, status: {}, pending: {}, trash: {}, order: {}, groupOrder: {}, overrides: {} };
  const data = await readJson(MANIFEST, null);
  return data ? { ...empty, ...data } : { ...empty };
}

async function writeManifest(data) {
  await writeJson(MANIFEST, data);
}

// Les médias d'un voyage supprimé ne sont JAMAIS effacés (Karim, 04/11/2026 : « je ne
// veux pas perdre les médias ») : on les garde dans le manifeste des médias avec une
// étiquette « archived » (titre, destination, date) pour les retrouver dans Gestion des
// médias (« Médias conservés ») et pour le tirage « 🎲 Photos au hasard ».
// Le manifeste des médias est un blob séparé (media-manifest.json).
const MEDIA_MANIFEST = 'media-manifest.json';
// Renvoie true si tout est rangé (ou rien à ranger), false si la médiathèque n'a pas pu
// être écrite. `create: true` crée la fiche de médias quand elle n'existe pas encore, pour
// garder au moins le lien du PDF ; `pdfUrl` range ce lien avec l'étiquette.
async function archiveMediaEntries(entries) {
  try {
    const media = await readJson(MEDIA_MANIFEST, null);
    if (!media) return false;
    let changed = false;
    for (const e of entries) {
      let rec = media && media[e.key];
      if (e.seulementSiAbsent && rec && rec.archived) continue;
      if ((!rec || typeof rec !== 'object') && e.create && e.pdfUrl) {
        rec = media[e.key] = { key: e.key, videoLink: '', videoUrl: '', images: [] };
      }
      if (!rec || typeof rec !== 'object') continue;
      rec.archived = { title: String(e.title || ''), tag: String(e.tag || ''), deletedAt: new Date().toISOString() };
      if (e.pdfUrl) rec.archived.pdfUrl = String(e.pdfUrl);
      if (e.reason) rec.archived.reason = String(e.reason);
      changed = true;
    }
    if (changed) await writeJson(MEDIA_MANIFEST, media);
    return true;
  } catch {
    // best-effort : si la médiathèque n'est pas joignable, on n'échoue pas la suppression du voyage
    return false;
  }
}

// ── Prescription : préparation d'un voyage (sans écrire) ──
// Renvoie { garde } (ce qu'il faut ranger dans la médiathèque) et retire le voyage de
// `data` en mémoire, ou { erreur } / { deja }. L'écriture se fait une seule fois après.
function prescrireDans(data, item) {
  const slug = String(item.slug || '');
  const fin = String(item.fin || '');
  if (!slug) return { erreur: 'slug requis' };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fin)) return { erreur: 'date de fin requise' };
  const limite = new Date(fin + 'T00:00:00Z');
  limite.setUTCDate(limite.getUTCDate() + 8);
  if (Date.now() < limite.getTime()) return { erreur: 'pas encore prescrit (moins de 7 jours après la fin)' };
  const prev = data.status[slug] || {};
  const snap = item.snapshot && typeof item.snapshot === 'object' ? item.snapshot : {};
  let garde;
  if (data.custom[slug]) {
    const p = data.custom[slug];
    garde = { key: String(p.mediaKey || slug), title: p.title || slug, tag: p.tag || '', pdfUrl: p.pdfUrl || prev.pdfUrl || p.sourceUrl || '' };
    delete data.custom[slug];
    delete data.status[slug];
  } else if (item.static) {
    if (prev.removed) return { deja: true };
    garde = { key: String(snap.mediaKey || slug), title: String(snap.title || slug), tag: String(snap.tag || ''), pdfUrl: prev.pdfUrl || '' };
    data.status[slug] = { ...prev, removed: true, hidden: true, prescritLe: fin };
  } else {
    return { deja: true };
  }
  if (data.order) delete data.order[slug];
  if (data.trash) delete data.trash[slug];
  return { garde: { ...garde, create: true, reason: 'prescrit (fin le ' + fin + ')' } };
}

// Rattrapage du 07/11/2026 : lors du premier passage, des suppressions faites à la suite
// ont relu une version périmée du stockage ; ces voyages ont bien quitté le site mais
// leur étiquette « médias conservés » (et, pour l'Omra 1448, le lien de son PDF) a été
// perdue. On la repose si elle manque encore (sans rien changer d'autre).
const RATTRAPAGE_07_11 = [
  { key: '2026-1448', title: 'عمرة اكتوبر 2026 1448', tag: 'عمرة', reason: 'prescrit (fin le 2026-10-18)',
    pdfUrl: 'https://t6usmpynhzdvfouf.public.blob.vercel-storage.com/voyages21/pdfs/____________2026-1448-4ddkqsHgXmFrphy5Ywp45o7O027wD4.pdf' },
  { key: 'modal-albanie-riviera', title: 'Albanie — Mer & Galets, Côte Ionienne', tag: 'Europe', reason: 'prescrit (fin le 2026-08-27)' },
  { key: 'modal-chine', title: 'Circuit Chine — Pékin, Shanghai & Merveilles', tag: 'Chine', reason: 'prescrit (fin le 2026-08-25)' },
  { key: 'modal-chine-pekin-xian-guilin-shanghai', title: "Chine impériale & paysages du Sud — Pékin, Xi'an, Guilin & Shanghai", tag: 'Chine', reason: 'prescrit (fin le 2026-08-24)' },
  { key: 'modal-vietnam', title: 'Découverte du Vietnam — Hanoi à Saigon', tag: 'Vietnam', reason: 'prescrit (fin le 2026-08-21)' },
];

const corsHeaders = {
  'Cache-Control': 'no-store',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

// GET /api/produits              → manifeste complet
// GET /api/produits?slug=xxx     → fiche produit unique
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');
    const data = await readManifest();
    if (slug) {
      const product = (data.custom || {})[slug];
      if (!product) {
        return Response.json({ ok: false, error: 'not found' }, { status: 404, headers: corsHeaders });
      }
      return Response.json({ ok: true, product }, { headers: corsHeaders });
    }
    // La file « en attente » (soumissions équipe) est visible du propriétaire et de l'équipe.
    const role = await getRole(request);
    const out = { custom: data.custom || {}, status: data.status || {}, order: data.order || {}, groupOrder: data.groupOrder || {}, overrides: data.overrides || {}, role: role || '' };
    if (role === 'owner' || role === 'team') out.pending = data.pending || {};
    // La corbeille n'est visible QUE du propriétaire.
    if (role === 'owner') out.trash = data.trash || {};
    return Response.json(out, { headers: corsHeaders });
  } catch {
    return Response.json({ custom: {}, status: {} }, { headers: corsHeaders });
  }
}

// POST /api/produits
//   { submit: true, product }  → soumission équipe (tombe EN ATTENTE de validation)
//   { slug, product }          → publication directe d'un produit (propriétaire)
export async function POST(request) {
  const role = await getRole(request);
  try {
    const body = await request.json();

    // Soumission par l'équipe : le voyage n'est PAS publié, il attend la validation de Karim.
    if (body.submit && body.product) {
      if (role !== 'owner' && role !== 'team') {
        return Response.json({ ok: false, error: 'non autorisé' }, { status: 401, headers: corsHeaders });
      }
      const data = await readManifest();
      const id = 'sub-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);
      data.pending[id] = {
        id,
        product: body.product,
        title: body.product.title || '',
        submittedAt: new Date().toISOString(),
      };
      await writeManifest(data);
      return Response.json({ ok: true, id }, { headers: corsHeaders });
    }

    // Publication directe : propriétaire ou équipe.
    if (role !== 'owner' && role !== 'team') {
      return Response.json({ ok: false, error: 'non autorisé' }, { status: 401, headers: corsHeaders });
    }
    if (!body.slug || !body.product) {
      return Response.json({ ok: false, error: 'slug et product requis' }, { status: 400, headers: corsHeaders });
    }
    const slug = slugify(body.slug);
    const data = await readManifest();
    // mediaKey = slug : le voyage est géré dans Admin Médias sous cette clé
    // (le site lit ses photos/vidéos via mediaKey).
    data.custom[slug] = { ...body.product, slug, mediaKey: slug, createdAt: new Date().toISOString() };
    await writeManifest(data);
    return Response.json({ ok: true, slug }, { headers: corsHeaders });
  } catch (e) {
    return Response.json(
      { ok: false, error: String((e && e.message) || e) },
      { status: 500, headers: corsHeaders },
    );
  }
}

// PUT /api/produits
//   { type: 'status', slug, status: { badge, badgeColor, hidden } }  → statut
//   { slug, product }                                                  → modifier produit custom
export async function PUT(request) {
  const denied = await denyIfNotAdmin(request, corsHeaders);
  if (denied) return denied;
  try {
    const body = await request.json();
    const data = await readManifest();

    // Correctif sur un voyage du CATALOGUE DE BASE (codé dans data.js).
    // On ne touche pas au fichier du site : on range les champs corrigés dans
    // `overrides`, et render.js les applique par-dessus la fiche d'origine.
    // Un champ vide EFFACE le correctif de ce champ (retour à la valeur d'origine).
    if (body.type === 'override' && body.slug) {
      if (!body.product || typeof body.product !== 'object') {
        return Response.json({ ok: false, error: 'product requis' }, { status: 400, headers: corsHeaders });
      }
      if (!data.overrides) data.overrides = {};
      const clean = {};
      for (const [k, val] of Object.entries(body.product)) {
        if (val === '' || val === null || val === undefined) continue;
        if (Array.isArray(val) && val.length === 0) continue;
        clean[k] = val;
      }
      if (Object.keys(clean).length === 0) delete data.overrides[body.slug];
      else data.overrides[body.slug] = { ...clean, updatedAt: new Date().toISOString() };
      await writeManifest(data);
      return Response.json({ ok: true, slug: body.slug }, { headers: corsHeaders });
    }

    // Voyage OMRA PASSÉ (date de fin dépassée) → corbeille, sans rien changer à la fiche
    // (choix de Karim, 03/11/2026 : Omra seulement). Déclenché par l'Admin Produits à l'ouverture du
    // catalogue. Voyage admin : déplacé de `custom` vers `trash`. Voyage du catalogue
    // de base (data.js, non effaçable d'ici) : marqué « supprimé » (retiré du site)
    // et inscrit dans la corbeille pour pouvoir être restauré.
    if (body.action === 'expire' && body.slug) {
      const slug = String(body.slug);
      const fin = String(body.fin || '');
      const role = await getRole(request);
      data.trash = data.trash || {};
      if (data.trash[slug]) return Response.json({ ok: true, already: true }, { headers: corsHeaders });
      const prev = data.status[slug] || null;
      if (prev && prev.keepAfterExpiry) {
        return Response.json({ ok: false, error: 'gardé en ligne par le propriétaire' }, { status: 409, headers: corsHeaders });
      }
      // Omra seulement (étiquette « عمرة » ou « Omra »)
      const tagOf = (t) => String(t || '').trim().toLowerCase();
      const tag = data.custom[slug] ? data.custom[slug].tag : (body.snapshot && body.snapshot.tag);
      if (tagOf(tag) !== 'عمرة' && tagOf(tag) !== 'omra') {
        return Response.json({ ok: false, error: 'seuls les voyages Omra passent automatiquement à la corbeille' }, { status: 400, headers: corsHeaders });
      }
      const entry = { slug, status: prev, deletedAt: new Date().toISOString(), deletedBy: 'expiration', expiredOn: fin, movedBy: role || '' };
      if (data.custom[slug]) {
        entry.product = data.custom[slug];
        delete data.custom[slug];
        delete data.status[slug];
      } else if (body.static) {
        const snap = body.snapshot && typeof body.snapshot === 'object' ? body.snapshot : {};
        entry.static = true;
        entry.product = { title: String(snap.title || slug), tag: String(snap.tag || ''), price: String(snap.price || ''), duration: String(snap.duration || '') };
        data.status[slug] = { ...(prev || {}), removed: true, hidden: true };
      } else {
        return Response.json({ ok: false, error: 'voyage introuvable' }, { status: 404, headers: corsHeaders });
      }
      data.trash[slug] = entry;
      await writeManifest(data);
      return Response.json({ ok: true, expired: slug }, { headers: corsHeaders });
    }

    // Voyage PRESCRIT (Karim, 07/11/2026) : 7 jours après sa date de fin, il est supprimé
    // pour de bon (fiche, textes, prix) ; seuls son PDF et ses photos / vidéo sont gardés
    // dans la médiathèque (« Médias conservés »), pour de futurs voyages. Déclenché par
    // l'Admin Produits à l'ouverture du catalogue ; garde-fou : la date de fin envoyée doit
    // être passée depuis plus de 7 jours. Voyage du catalogue de base (data.js, non
    // effaçable d'ici) : retiré du site.
    if (body.action === 'prescrit' && body.slug) {
      const r = prescrireDans(data, body);
      if (r.erreur) return Response.json({ ok: false, error: r.erreur }, { status: 400, headers: corsHeaders });
      if (r.deja) return Response.json({ ok: true, already: true }, { headers: corsHeaders });
      // D'abord ranger le PDF et les médias : sans eux, on ne supprime rien.
      const ok = await archiveMediaEntries([r.garde]);
      if (!ok && r.garde.pdfUrl) {
        return Response.json({ ok: false, error: 'médiathèque injoignable : rien n\'est supprimé' }, { status: 503, headers: corsHeaders });
      }
      await writeManifest(data);
      return Response.json({ ok: true, prescrit: String(body.slug) }, { headers: corsHeaders });
    }

    // Tous les voyages prescrits EN UNE FOIS (une lecture, une écriture de chaque fichier) :
    // évite qu'une écriture reparte de l'état d'avant la précédente.
    if (body.action === 'prescrits' && Array.isArray(body.items)) {
      const faits = [], refus = [], gardes = [];
      for (const it of body.items) {
        const r = prescrireDans(data, it);
        if (r.erreur) refus.push({ slug: String(it.slug || ''), error: r.erreur });
        else if (r.garde) { faits.push(String(it.slug)); gardes.push(r.garde); }
      }
      const rattrapage = RATTRAPAGE_07_11.map((e) => ({ ...e, create: true, seulementSiAbsent: true }));
      const ok = await archiveMediaEntries(gardes.concat(rattrapage));
      if (!ok) {
        return Response.json({ ok: false, error: 'médiathèque injoignable : rien n\'est supprimé' }, { status: 503, headers: corsHeaders });
      }
      if (faits.length) await writeManifest(data);
      return Response.json({ ok: true, faits, refus }, { headers: corsHeaders });
    }

    // Restaurer un voyage depuis la corbeille → PROPRIÉTAIRE uniquement.
    if (body.action === 'restore' && body.slug) {
      const deniedOwner = await denyIfNotOwner(request, corsHeaders);
      if (deniedOwner) return deniedOwner;
      const t = data.trash && data.trash[body.slug];
      if (!t) {
        return Response.json({ ok: false, error: 'introuvable dans la corbeille' }, { status: 404, headers: corsHeaders });
      }
      // Un voyage passé que Karim restaure reste en ligne : on ne le renvoie plus
      // automatiquement à la corbeille.
      const st = t.status ? { ...t.status } : {};
      if (t.deletedBy === 'expiration') st.keepAfterExpiry = true;
      if (t.static) {
        delete st.removed;
        if (!(t.status && t.status.hidden)) delete st.hidden;
      } else {
        data.custom[body.slug] = t.product;
      }
      if (Object.keys(st).length) data.status[body.slug] = st; else delete data.status[body.slug];
      delete data.trash[body.slug];
      await writeManifest(data);
      return Response.json({ ok: true, restored: body.slug }, { headers: corsHeaders });
    }

    // Valider une soumission équipe → publie le voyage et le retire de la file.
    if (body.action === 'validate' && body.id) {
      const sub = data.pending[body.id];
      if (!sub) {
        return Response.json({ ok: false, error: 'soumission introuvable' }, { status: 404, headers: corsHeaders });
      }
      const slug = slugify((sub.product && sub.product.title) || sub.title || body.id);
      data.custom[slug] = { ...sub.product, slug, mediaKey: slug, createdAt: new Date().toISOString() };
      delete data.pending[body.id];
      await writeManifest(data);
      return Response.json({ ok: true, slug }, { headers: corsHeaders });
    }
    // Refuser une soumission → simple retrait de la file (rien n'est publié).
    if (body.action === 'reject' && body.id) {
      delete data.pending[body.id];
      await writeManifest(data);
      return Response.json({ ok: true }, { headers: corsHeaders });
    }

    if (body.type === 'order') {
      // Ordre d'affichage des produits (rang par slug). On FUSIONNE la carte
      // reçue (souvent une seule catégorie visible) dans l'ordre global.
      if (!body.order || typeof body.order !== 'object') {
        return Response.json({ ok: false, error: 'order requis' }, { status: 400, headers: corsHeaders });
      }
      data.order = data.order || {};
      Object.keys(body.order).forEach(function (slug) {
        const n = parseInt(body.order[slug], 10);
        if (!isNaN(n)) data.order[slug] = n;
      });
      await writeManifest(data);
      return Response.json({ ok: true }, { headers: corsHeaders });
    }

    if (body.type === 'groupOrder') {
      // Ordre des cadrans (sous-sections) d'une destination : { dest, order:[ids] }.
      if (!body.dest || !Array.isArray(body.order)) {
        return Response.json({ ok: false, error: 'dest + order requis' }, { status: 400, headers: corsHeaders });
      }
      data.groupOrder = data.groupOrder || {};
      data.groupOrder[String(body.dest)] = body.order.map(String);
      await writeManifest(data);
      return Response.json({ ok: true }, { headers: corsHeaders });
    }

    if (body.type === 'status') {
      if (!body.slug) {
        return Response.json({ ok: false, error: 'slug requis' }, { status: 400, headers: corsHeaders });
      }
      data.status[body.slug] = body.status || {};
    } else if (body.slug && body.product) {
      if (!data.custom[body.slug]) {
        return Response.json({ ok: false, error: 'produit introuvable' }, { status: 404, headers: corsHeaders });
      }
      data.custom[body.slug] = {
        ...data.custom[body.slug],
        ...body.product,
        slug: body.slug,
        mediaKey: body.slug,
        updatedAt: new Date().toISOString(),
      };
    } else {
      return Response.json({ ok: false, error: 'paramètres invalides' }, { status: 400, headers: corsHeaders });
    }

    await writeManifest(data);
    return Response.json({ ok: true }, { headers: corsHeaders });
  } catch (e) {
    return Response.json(
      { ok: false, error: String((e && e.message) || e) },
      { status: 500, headers: corsHeaders },
    );
  }
}

// DELETE /api/produits?slug=xxx&type=hide|delete|purge   (+ type=empty sans slug)
//   hide   → marque hidden:true dans status (défaut)
//   delete → met le voyage à la CORBEILLE (récupérable) — équipe autorisée
//   purge  → supprime DÉFINITIVEMENT un élément de la corbeille — propriétaire seul
//   empty  → vide TOUTE la corbeille (définitif) — propriétaire seul
export async function DELETE(request) {
  const denied = await denyIfNotAdmin(request, corsHeaders);
  if (denied) return denied;
  const role = await getRole(request);
  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');
    const type = url.searchParams.get('type') || 'hide';

    // Vider toute la corbeille (définitif) — propriétaire uniquement.
    if (type === 'empty') {
      const deniedOwner = await denyIfNotOwner(request, corsHeaders);
      if (deniedOwner) return deniedOwner;
      const data = await readManifest();
      const keys = Object.keys(data.trash || {});
      // les médias sont gardés et étiquetés « conservés » (jamais effacés)
      await archiveMediaEntries(keys.filter((k) => !(data.trash[k] && data.trash[k].static)).map((k) => {
        const p = (data.trash[k] && data.trash[k].product) || {};
        return { key: k, title: p.title, tag: p.tag };
      }));
      data.trash = {};
      await writeManifest(data);
      return Response.json({ ok: true, emptied: keys.length }, { headers: corsHeaders });
    }

    if (!slug) {
      return Response.json({ ok: false, error: 'slug requis' }, { status: 400, headers: corsHeaders });
    }
    const data = await readManifest();

    // Suppression DÉFINITIVE d'un élément de la corbeille — propriétaire uniquement.
    if (type === 'purge') {
      const deniedOwner = await denyIfNotOwner(request, corsHeaders);
      if (deniedOwner) return deniedOwner;
      if (data.trash && data.trash[slug]) {
        const t = data.trash[slug];
        delete data.trash[slug];
        // Voyage du catalogue de base : il reste retiré du site (removed) ; son code
        // dans data.js et ses médias ne s'effacent pas d'ici. Voyage admin : ses médias
        // sont gardés et étiquetés « conservés ».
        if (!t.static) await archiveMediaEntries([{ key: slug, title: t.product && t.product.title, tag: t.product && t.product.tag }]);
      }
      await writeManifest(data);
      return Response.json({ ok: true }, { headers: corsHeaders });
    }

    if (type === 'delete') {
      if (data.custom[slug]) {
        // Voyage ajouté via l'admin : on le MET À LA CORBEILLE (pas d'effacement).
        // La donnée et les médias sont conservés → restauration complète possible.
        data.trash = data.trash || {};
        data.trash[slug] = {
          slug,
          product: data.custom[slug],
          status: data.status[slug] || null,
          deletedAt: new Date().toISOString(),
          deletedBy: role || '',
        };
        delete data.custom[slug];
        delete data.status[slug];
      } else {
        // Voyage du catalogue de base (codé dans data.js) : impossible d'effacer
        // le code depuis l'admin. On le marque « supprimé » → retiré des listes
        // ET fiche rendue indisponible. Réversible via « Restaurer » (removed:false).
        data.status[slug] = { ...(data.status[slug] || {}), removed: true, hidden: true };
      }
    } else {
      data.status[slug] = { ...(data.status[slug] || {}), hidden: true };
    }

    await writeManifest(data);
    return Response.json({ ok: true }, { headers: corsHeaders });
  } catch (e) {
    return Response.json(
      { ok: false, error: String((e && e.message) || e) },
      { status: 500, headers: corsHeaders },
    );
  }
}
