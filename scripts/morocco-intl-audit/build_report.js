/*
 * RAPPORT WORD — curation des photos du site international « Morocco Voyages 21 ».
 *
 * Consomme `audit-<date>.json` (produit par audit_photos.py) + `fiches.json`
 * + les aperçus de `vignettes/`, et écrit
 * `rapports/Rapport-curation-photos-<date>.docx`.
 *
 *   node build_report.js                # dernier audit trouvé
 *   node build_report.js 2026-08-14     # un audit précis
 */
const fs = require('fs');
const path = require('path');
const D = require('docx');
const {Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell,
       WidthType, ShadingType, ImageRun, AlignmentType, BorderStyle, PageBreak,
       ExternalHyperlink, convertInchesToTwip} = D;

const ICI = __dirname;
const arg = process.argv[2];
const date = arg || fs.readdirSync(ICI).filter(f => /^audit-\d{4}-\d\d-\d\d\.json$/.test(f))
  .sort().pop()?.slice(6, 16);
if (!date) { console.error('Aucun fichier audit-<date>.json. Lancer d\'abord audit_photos.py.'); process.exit(1); }

const A = JSON.parse(fs.readFileSync(path.join(ICI, `audit-${date}.json`), 'utf8'));
const F = JSON.parse(fs.readFileSync(path.join(ICI, 'fiches.json'), 'utf8'));
const FICHE = Object.fromEntries(F.photos.map(f => [f.url, f]));

const GOLD = 'C8A440', FOREST = '1B3A28', GREY = '6B6B6B', RED = 'B3261E', CREAM = 'F7F3EA';
const FULL = 9900, COLS = [2900, 7000];

const t = (s, o = {}) => new TextRun(Object.assign({text: String(s), font: 'Calibri'}, o));
const h1 = s => new Paragraph({heading: HeadingLevel.HEADING_1, spacing: {before: 380, after: 160},
  children: [t(s, {bold: true, size: 30, color: FOREST})]});
const h2 = s => new Paragraph({heading: HeadingLevel.HEADING_2, spacing: {before: 280, after: 120},
  children: [t(s, {bold: true, size: 24, color: FOREST})]});
const h3 = s => new Paragraph({heading: HeadingLevel.HEADING_3, spacing: {before: 200, after: 90},
  children: [t(s, {bold: true, size: 21, color: '2E5D42'})]});
const body = (s, o = {}) => new Paragraph({spacing: {after: 110}, alignment: o.align,
  children: [t(s, Object.assign({size: 21}, o))]});
const bullet = s => new Paragraph({bullet: {level: 0}, spacing: {after: 60}, children: [t(s, {size: 21})]});
const rule = () => new Paragraph({spacing: {before: 60, after: 160},
  border: {bottom: {style: BorderStyle.SINGLE, size: 6, color: GOLD}}, children: [t('')]});
const link = (url, label) => new ExternalHyperlink({link: url,
  children: [t(label || url, {size: 15, color: '1155CC', underline: {}})]});

function cell(children, w, opt = {}) {
  return new TableCell({width: {size: w, type: WidthType.DXA}, children,
    shading: opt.fill ? {type: ShadingType.CLEAR, fill: opt.fill, color: 'auto'} : undefined,
    margins: {top: 90, bottom: 90, left: 110, right: 110}, verticalAlign: opt.va});
}
function simpleTable(headers, rows, widths) {
  const hr = new TableRow({tableHeader: true, children: headers.map((x, i) =>
    cell([new Paragraph({children: [t(x, {bold: true, size: 19, color: 'FFFFFF'})]})], widths[i], {fill: FOREST}))});
  const body_ = rows.map((r, ri) => new TableRow({children: r.map((x, i) =>
    cell(String(x).split('\n').map(l => new Paragraph({children: [t(l, {size: 19})]})), widths[i],
      {fill: ri % 2 ? CREAM : undefined}))}));
  return new Table({columnWidths: widths, width: {size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA},
    rows: [hr, ...body_]});
}

// dimensions d'un JPEG, pour caler l'aperçu sans dépendance graphique
function jpegSize(buf) {
  let i = 2;
  while (i < buf.length - 9) {
    if (buf[i] !== 0xFF) { i++; continue; }
    const m = buf[i + 1];
    if (m === 0xD8 || m === 0x01 || (m >= 0xD0 && m <= 0xD7)) { i += 2; continue; }
    const len = buf.readUInt16BE(i + 2);
    if ([0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7, 0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF].includes(m))
      return [buf.readUInt16BE(i + 7), buf.readUInt16BE(i + 5)];
    i += 2 + len;
  }
  return [4, 3];
}

function photoCard(p) {
  const f = FICHE[p.url] || {};
  let img;
  const vign = f.vignette ? path.join(ICI, f.vignette.replace(/^th\//, 'vignettes/')) : null;
  if (vign && fs.existsSync(vign)) {
    const buf = fs.readFileSync(vign);
    const [ow, oh] = jpegSize(buf);
    let w = 165, h = Math.round(165 * oh / ow);
    if (h > 200) { h = 200; w = Math.round(200 * ow / oh); }
    img = new Paragraph({children: [new ImageRun({data: buf, type: 'jpg', transformation: {width: w, height: h}})]});
  } else {
    img = new Paragraph({children: [t('(apercu indisponible)', {size: 16, italics: true, color: GREY})]});
  }
  const meta = p.erreur ? 'INACCESSIBLE — ' + p.erreur
    : `${p.largeur}x${p.hauteur} px - ${Math.round(p.poids / 1000)} Ko`;
  const inc = f.inconvenients || (p.defauts.length ? 'Mesures : ' + p.defauts.join(', ') + '.' : '—');
  const right = [
    new Paragraph({spacing: {after: 40}, children: [
      t((f.ref || 'NOUVELLE') + ' — ', {bold: true, size: 21, color: f.ref ? FOREST : RED}),
      t(meta, {size: 18, color: GREY})]}),
    new Paragraph({spacing: {after: 60}, children: [t('Ce qu\'on voit : ', {bold: true, size: 19}),
      t(f.description || 'Photo apparue depuis le dernier rapport : a regarder et a decrire dans fiches.json.', {size: 19})]}),
    new Paragraph({spacing: {after: 60}, children: [t('Inconvenients : ', {bold: true, size: 19, color: RED}), t(inc, {size: 19})]}),
    new Paragraph({spacing: {after: 60}, children: [t('A faire : ', {bold: true, size: 19}),
      t(f.action || 'A decider.', {size: 19, bold: /IMMEDIATEMENT|imperativement/.test(f.action || '')})]}),
    new Paragraph({spacing: {after: 20}, children: [t('Lien : ', {size: 15, color: GREY}),
      link(p.url.startsWith('http') ? p.url : 'https://morocco.voyages21.com' + p.url,
           decodeURIComponent(p.url).slice(0, 118))]})
  ];
  return new Table({columnWidths: COLS, width: {size: FULL, type: WidthType.DXA},
    borders: {insideHorizontal: {style: BorderStyle.NONE}, insideVertical: {style: BorderStyle.NONE},
      top: {style: BorderStyle.NONE}, bottom: {style: BorderStyle.SINGLE, size: 4, color: 'DDD6C6'},
      left: {style: BorderStyle.NONE}, right: {style: BorderStyle.NONE}},
    rows: [new TableRow({children: [cell([img], COLS[0], {va: 'top'}), cell(right, COLS[1], {va: 'top'})]})]});
}

const S = A.synthese;
const k = [];

// ---------- couverture ----------
k.push(new Paragraph({spacing: {before: 900, after: 60}, alignment: AlignmentType.CENTER,
  children: [t('MOROCCO VOYAGES 21', {bold: true, size: 26, color: GOLD, characterSpacing: 60})]}));
k.push(new Paragraph({spacing: {after: 120}, alignment: AlignmentType.CENTER,
  children: [t('Rapport de curation des photos', {bold: true, size: 52, color: FOREST})]}));
k.push(new Paragraph({spacing: {after: 500}, alignment: AlignmentType.CENTER,
  children: [t('Site international — morocco.voyages21.com  →  moroccovoyages21.com', {size: 22, color: GREY})]}));
k.push(new Paragraph({alignment: AlignmentType.CENTER, spacing: {after: 40},
  children: [t(`${S.total} photos auditees  ·  5 circuits + 3 sejours  ·  ${date}`, {size: 20, italics: true})]}));
k.push(new Paragraph({alignment: AlignmentType.CENTER, spacing: {after: 700},
  children: [t('Etabli automatiquement a partir des fichiers reellement en ligne', {size: 18, color: GREY})]}));
k.push(rule());
k.push(body('Ce rapport recense une par une les photos que le site affiche aujourd\'hui : ce qu\'elles montrent, ce qui ne va pas, et ce qu\'il faut en faire. Il se termine par un guide operationnel pour choisir les remplacantes, avec les banques d\'images et les outils a utiliser.', {italics: true}));
k.push(new Paragraph({children: [new PageBreak()]}));

// ---------- ce qui a change ----------
k.push(h1('1. Ce qui a change depuis le dernier rapport'));
if (!A.nouvelles.length && !A.disparues.length) {
  k.push(body('Aucun changement : le site affiche exactement les memes photos qu\'au dernier audit. Les constats et les decisions ci-dessous restent donc valables tels quels.'));
} else {
  if (A.nouvelles.length) {
    k.push(h3(`${A.nouvelles.length} photo(s) nouvelle(s)`));
    k.push(body('Elles apparaissent en rouge dans l\'inventaire, avec la mention NOUVELLE. Elles ont ete mesurees mais pas encore decrites.'));
    A.nouvelles.forEach(u => k.push(bullet(decodeURIComponent(u).slice(0, 130))));
  }
  if (A.disparues.length) {
    k.push(h3(`${A.disparues.length} photo(s) retiree(s) du site`));
    k.push(body('References : ' + A.disparues.join(', ') + '.'));
  }
}

// ---------- synthese ----------
k.push(h1('2. Ce qu\'il faut retenir'));
k.push(body('Le site international a herite de la mediatheque du site chinois. Cette mediatheque n\'a jamais ete constituee : elle a ete ramassee. La plupart des visuels sont des captures d\'ecran de Pinterest — largeur 736 pixels, format vertical, noms de fichiers en hashtags, doublons nommes « - Copie (2) ».'));
k.push(body('Le probleme n\'est pas le gout : plusieurs de ces images sont belles. Le probleme est qu\'elles sont techniquement inutilisables a l\'endroit ou le site les affiche, et que certaines ne nous appartiennent pas.'));
k.push(h3('Les chiffres du jour'));
k.push(simpleTable(['Mesure', 'Resultat', 'Cible'], [
  ['Photos Maroc affichees', `${S.total} (${S.galerie} en galerie + ${S.vignettes} en vignette)`, '—'],
  ['Conformes a la charte', `${S.conformes} sur ${S.mesurees} mesurees`, '100 %'],
  ['En galerie, au format paysage', `${S.paysage} sur ${S.galerie}`, '100 %'],
  ['En galerie, largeur >= 1600 px', `${S.assez_larges} sur ${S.galerie}`, '100 %'],
  ['En galerie, poids <= 300 Ko', `${S.assez_legeres} sur ${S.galerie}`, '100 %'],
  ['Photos en doublon (meme image ou meme sujet)', String(S.doublons_vus), '0'],
  ['Photos non mesurables (liens externes Unsplash)', String(S.inaccessibles), '0'],
  ['Poids du index.html en ligne', `${Math.round(A.tailles_fichiers['index.html'] / 1000)} Ko`, '—']
], [3400, 4000, 2500]));
k.push(h3('La conclusion'));
k.push(body('Ce n\'est pas un tri a faire, c\'est un remplacement. Il faut constituer une vraie photothèque : environ 60 photos (4 vignettes + 8 photos de galerie par circuit, sur 5 circuits), en paysage 1600 x 1000, sous 300 Ko, dont les droits sont clairs.', {bold: true}));

// ---------- sources ----------
k.push(h1('3. D\'ou viennent les photos du site'));
k.push(body('Comprendre les trois circuits d\'alimentation evite de corriger au mauvais endroit.'));
k.push(simpleTable(['Source', 'Ou elle s\'affiche', 'Etat'], [
  ['Unsplash (lien externe)', 'Les vignettes qui defilent sur les cartes de la brochure', 'Depend d\'un serveur exterieur'],
  ['Mediatheque integree en dur\n(window.__V21_MEDIA__)', 'Les galeries des pages detaillees de chaque circuit',
   `${A.cles_mediatheque} cles, ${A.images_mediatheque} images\n(toutes destinations confondues)`],
  ['Fichiers locaux\nassets/discover-kingdom/', 'La vignette du circuit « A la decouverte du Royaume »', 'Enormes, 1 filigranee iStock']
], [2900, 4200, 2800]));
k.push(body(''));
k.push(body('La mediatheque est ecrite en dur dans index.html depuis la correction « mediafix3 » : il n\'y a plus d\'appel a /api/media. Toute modification des photos passe donc par ces fichiers-la, et le script action9_photos.py est deja ecrit pour cela.', {italics: true}));

// ---------- urgences ----------
k.push(h1('4. Les quatre urgences'));
k.push(body('Ces quatre points ne relevent pas du gout : ils exposent l\'agence ou decredibilisent le site. A traiter avant toute autre chose.'));
k.push(simpleTable(['#', 'Probleme', 'Ou', 'Pourquoi c\'est urgent'], [
  ['1', 'Filigrane iStock visible\n(« Credit: Sergi Formoso »)', 'casablanca.jpg — vignette du circuit\n« A la decouverte du Royaume »', 'Image d\'apercu non achetee, publiee\nen ligne. Risque juridique reel.'],
  ['2', 'Filigrane « Waterwind.it »', 'Galerie du sejour Dakhla', 'Photo d\'un tiers publiee sans droit.'],
  ['3', 'Photo d\'un singe magot', '1re photo de la galerie du circuit\ndes villes imperiales', 'Premiere image que voit un client\nsur un circuit de villes. Aucun rapport.'],
  ['4', 'Fichier « meknes.jpg »\nqui ne montre pas Meknes', 'Vignette du circuit\n« A la decouverte du Royaume »', 'Un lac de barrage vendu comme\nune ville imperiale.']
], [500, 2900, 3100, 3400]));
k.push(new Paragraph({children: [new PageBreak()]}));

// ---------- inventaire ----------
k.push(h1('5. Inventaire detaille, photo par photo'));
k.push(body('Chaque fiche donne l\'apercu, la definition et le poids reels mesures ce jour, la description, les inconvenients et la decision. Le lien renvoie au fichier tel qu\'il est servi aujourd\'hui.'));

const ordre = [...new Set(A.photos.map(p => p.circuit))];
for (const c of ordre) {
  const gal = A.photos.filter(p => p.circuit === c && p.emplacement === 'galerie');
  const vig = A.photos.filter(p => p.circuit === c && p.emplacement === 'vignette');
  k.push(h2(c));
  k.push(body(`Vignette de la brochure : ${vig.length} photos.  ·  Galerie de la page detaillee : ${gal.length} photos.`,
    {italics: true, color: GREY}));
  for (const p of [...vig, ...gal]) {
    k.push(photoCard(p));
    k.push(new Paragraph({spacing: {after: 60}, children: [t('')]}));
  }
}

// ---------- doublons ----------
if (Object.keys(A.doublons).length) {
  k.push(new Paragraph({children: [new PageBreak()]}));
  k.push(h2('Images utilisees a plusieurs endroits'));
  k.push(body('Le meme fichier, servi sur plusieurs circuits : les produits se ressemblent et le client ne les distingue plus.'));
  k.push(simpleTable(['Emplacements'], Object.values(A.doublons).map(v => [v.join('\n')]), [9900]));
}

// ---------- guide ----------
k.push(new Paragraph({children: [new PageBreak()]}));
k.push(h1('6. Guide operationnel : choisir les bonnes photos'));
k.push(body('Cette partie est faite pour etre utilisee telle quelle, sans connaissance technique. Elle repond a une seule question : devant une photo, est-ce que je la prends ou non ?'));

k.push(h2('6.1  La regle des sept controles'));
k.push(body('Une photo entre sur le site si elle passe les sept. Une seule faute suffit a la rejeter.'));
k.push(simpleTable(['#', 'Controle', 'Le critere exact', 'Comment verifier'], [
  ['1', 'Les droits', 'Photo prise par toi ou ton equipe, fournie par un hotel ou un\npartenaire avec accord ecrit, ou issue d\'une banque libre de droits.\nJamais une image trouvee par recherche Google.', 'Si tu ne peux pas dire\nd\'ou elle vient, elle sort.'],
  ['2', 'Le filigrane', 'Aucun logo, aucun credit incruste, aucune date, aucun cadre.', 'Regarder les quatre coins\net le bas de l\'image.'],
  ['3', 'Le format', 'Paysage. Largeur au moins 1,5 fois la hauteur.', 'Plus haute que large :\nelle sera coupee.'],
  ['4', 'La definition', 'Au moins 1600 pixels de large. Ideal 1600 x 1000.', 'Clic droit > Proprietes,\nou Apercu sur Mac.'],
  ['5', 'Le poids', '300 Ko maximum apres compression.', 'Squoosh (voir 6.4).'],
  ['6', 'La verite', 'Le lieu est bien celui annonce, et il est bien au programme\ndu circuit. Pas de neige sur un circuit d\'ete,\npas de singe sur un circuit de villes.', 'Relire l\'itineraire\navant de choisir.'],
  ['7', 'L\'unicite', 'La photo n\'est utilisee qu\'a un seul endroit du site.', 'Tenir la liste au fur\net a mesure.']
], [400, 1700, 4600, 3200]));

k.push(h2('6.2  Ce qu\'il faut pour chaque circuit'));
k.push(body('Douze photos par circuit : 4 pour la vignette qui defile sur la brochure, 8 pour la galerie de la page detaillee. La premiere photo de la vignette est l\'image d\'appel : c\'est elle qui declenche le clic, elle doit etre la plus forte des douze.'));
k.push(simpleTable(['Circuit', 'Etapes', 'Sujets a couvrir en priorite'], [
  ['Villes imperiales\n& Sud marocain', 'Casablanca, Rabat, Chefchaouen,\nFes, Merzouga, Ait Ben Haddou,\nMarrakech', 'Dunes de Merzouga au lever du jour · ksar d\'Ait Ben Haddou\nen lumiere rasante · ruelles bleues de Chefchaouen ·\nmedersa Bou Inania a Fes'],
  ['Circuit des villes\nimperiales', 'Casablanca, Rabat, Tanger,\nMeknes, Fes, Marrakech', 'Mosquee Hassan II · tour Hassan · kasbah et baie de Tanger ·\nBab Mansour a Meknes · tanneries de Fes · Jemaa el-Fna'],
  ['Le meilleur\ndu Maroc', 'Casablanca, Rabat, Tanger,\nChefchaouen, Fes, Merzouga,\nOuarzazate, Marrakech', 'Une ambiance par photo : ocean, medina, montagne bleue,\ndesert, palmeraie. Le client doit voir la variete\ndu voyage en 4 vignettes.'],
  ['A la decouverte\ndu Royaume', 'Marrakech, Casablanca, Meknes,\nFes, Merzouga, Ouarzazate, Agadir', 'Atlas et vallees · studios et kasbahs de Ouarzazate ·\nbaie d\'Agadir. Des photos locales existent deja :\nelles sont a retraiter, pas a jeter.'],
  ['Splendide Maroc\nle grand tour', 'Marrakech, Casablanca, Rabat,\nMeknes, Fes, Chefchaouen,\nMerzouga, Ouarzazate,\nEssaouira, Agadir', 'Le tour complet : remparts et barques bleues d\'Essaouira ·\ncote atlantique · Sahara. C\'est le produit le plus riche,\nil doit avoir les 12 photos les plus variees.']
], [1900, 3100, 4900]));
k.push(body(''));
k.push(body('Les sejours Merzouga, Bin El Ouidane et Dakhla ne sont pas affiches (decision du 11/08/2026). Inutile de leur fournir des photos pour l\'instant.', {italics: true, color: GREY}));

k.push(h2('6.3  Les cinq photos qui vendent'));
k.push(body('Au-dela des controles techniques, une photo qui vend un voyage sur mesure obeit a quelques constantes. Pour chaque circuit, viser ces cinq registres plutot que cinq monuments.'));
[['L\'heure.', 'Lever ou coucher de soleil, jamais midi. La lumiere rasante donne le relief ; le plein midi ecrase tout et donne un ciel blanc.'],
 ['Une presence humaine discrete.', 'Une silhouette de dos, un guide, un dromadaire monte : le client se projette. Mais jamais de visage identifiable au premier plan sans autorisation ecrite.'],
 ['L\'art de vivre.', 'Un the servi sous la tente, une table dressee dans les dunes, une terrasse de riad. Ces images-la se transforment en devis plus souvent que les monuments.'],
 ['Le vide.', 'Une photo bondee de touristes vend mal un voyage sur mesure. Preferer les cadrages ou le lieu semble reserve au client.'],
 ['Le detail.', 'Sur douze photos, deux gros plans (zellige, cuir des tanneries, epices) reposent l\'oeil entre deux panoramas.']
].forEach(([a, b]) => k.push(new Paragraph({bullet: {level: 0}, spacing: {after: 60},
  children: [t(a + ' ', {bold: true, size: 21}), t(b, {size: 21})]})));

k.push(h2('6.4  Les outils'));
k.push(h3('Banques d\'images libres de droits — usage commercial autorise'));
[['Unsplash', 'https://unsplash.com/s/photos/morocco', 'Le plus grand fonds. Qualite tres inegale sur le Maroc. A utiliser en complement — et en telechargeant les fichiers, pas en lien externe.'],
 ['Pexels', 'https://www.pexels.com/search/morocco/', 'Plus homogene qu\'Unsplash sur les paysages. Bon fonds desert et Chefchaouen.'],
 ['Pixabay', 'https://pixabay.com/images/search/morocco/', 'Fonds plus ancien, definitions parfois faibles. Verifier la taille avant de telecharger.'],
 ['Wikimedia Commons', 'https://commons.wikimedia.org/wiki/Category:Morocco', 'Excellent pour les monuments. Attention : chaque photo a sa propre licence, souvent avec attribution obligatoire.']
].forEach(([n, u, d]) => k.push(new Paragraph({spacing: {after: 40}, bullet: {level: 0},
  children: [t(n + ' — ', {bold: true, size: 21}), link(u), t('  ' + d, {size: 20})]})));

k.push(h3('Banques payantes — quand la photo libre ne suffit pas'));
[['Getty / iStock', 'https://www.istockphoto.com/search/2/image?phrase=morocco', 'Le meilleur fonds Maroc, de loin. 10 a 35 EUR par image. C\'est de la que vient la photo filigranee en ligne : l\'acheter reglerait le probleme sans changer l\'image.'],
 ['Adobe Stock', 'https://stock.adobe.com/search?k=morocco', 'Equivalent, souvent moins cher en abonnement mensuel.'],
 ['Shutterstock', 'https://www.shutterstock.com/search/morocco', 'Fonds large, interface simple, formules a la carte.']
].forEach(([n, u, d]) => k.push(new Paragraph({spacing: {after: 40}, bullet: {level: 0},
  children: [t(n + ' — ', {bold: true, size: 21}), link(u), t('  ' + d, {size: 20})]})));

k.push(h3('Outils de preparation des fichiers'));
[['Squoosh', 'https://squoosh.app', 'Redimensionner et compresser dans le navigateur, sans rien installer. Largeur 1600, qualite 75-80, verifier que le poids passe sous 300 Ko.'],
 ['TinyPNG', 'https://tinypng.com', 'Compression sans redimensionner, jusqu\'a 20 fichiers a la fois. A utiliser apres avoir redimensionne.'],
 ['Google Images — recherche inversee', 'https://images.google.com', 'Deposer une photo pour savoir d\'ou elle vient. Utile pour verifier qu\'une image n\'appartient pas a un concurrent ou a une banque payante.'],
 ['TinEye', 'https://tineye.com', 'Meme principe, souvent plus precis pour retrouver la source originale.']
].forEach(([n, u, d]) => k.push(new Paragraph({spacing: {after: 40}, bullet: {level: 0},
  children: [t(n + ' — ', {bold: true, size: 21}), link(u), t('  ' + d, {size: 20})]})));

k.push(h2('6.5  Nommer et deposer les fichiers'));
k.push(body('Noms sans accent, sans espace, sans majuscule, numerotes dans l\'ordre d\'affichage. La numerotation compte : 01 est l\'image d\'appel.'));
k.push(new Paragraph({spacing: {before: 80, after: 80}, shading: {type: ShadingType.CLEAR, fill: CREAM, color: 'auto'},
  children: [t('public_html/morocco-intl/WelcomeChina/assets/photos/<circuit>/', {font: 'Consolas', size: 19})]}));
k.push(simpleTable(['Circuit', 'Dossier', 'Exemple de nom'], [
  ['Villes imperiales & Sud', 'assets/photos/imperial-south/', '01-merzouga-dunes-aube.jpg'],
  ['Circuit des villes imperiales', 'assets/photos/imperial-cities/', '01-casablanca-hassan-ii.jpg'],
  ['Le meilleur du Maroc', 'assets/photos/best-morocco/', '01-chefchaouen-ruelle.jpg'],
  ['A la decouverte du Royaume', 'assets/photos/discover-kingdom/', '01-marrakech-souk.jpg'],
  ['Splendide Maroc', 'assets/photos/grand-discovery/', '01-essaouira-barques.jpg']
], [3100, 3600, 3200]));
k.push(body(''));
k.push(body('Une fois les photos deposees, un seul script les installe partout : action9_photos.py (depot v21-cockpit, scripts/morocco-intl/). Il lit un fichier photos.json qui associe chaque circuit a ses photos de vignette et de galerie, puis met a jour index.html et la mediatheque integree. Aucune manipulation manuelle du code n\'est necessaire.', {italics: true}));

k.push(rule());
k.push(body('Sur un site qui vend du voyage sur mesure, la photo n\'illustre pas le produit, elle est le produit. Un client qui hesite entre deux agences ne compare pas les itineraires — il compare les images. C\'est le seul poste ou il ne faut pas transiger.', {italics: true}));

// ---------- ecriture ----------
const doc = new Document({
  creator: 'Voyages 21', title: `Rapport de curation des photos — Morocco Voyages 21 — ${date}`,
  description: 'Audit photo du site international morocco.voyages21.com',
  styles: {default: {document: {run: {font: 'Calibri', size: 21}}}},
  sections: [{properties: {page: {margin: {top: convertInchesToTwip(0.8), bottom: convertInchesToTwip(0.8),
    left: convertInchesToTwip(0.7), right: convertInchesToTwip(0.7)}}}, children: k}]
});
fs.mkdirSync(path.join(ICI, 'rapports'), {recursive: true});
const out = path.join(ICI, 'rapports', `Rapport-curation-photos-${date}.docx`);
Packer.toBuffer(doc).then(b => {
  fs.writeFileSync(out, b);
  console.log(`✓ ${path.relative(process.cwd(), out)}  (${Math.round(b.length / 1024)} Ko, ${A.photos.length} fiches)`);
});
