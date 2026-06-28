/* =====================================================================
   Analyseur Crédit — Moteur financier (déterministe)
   Calcul des ratios, interprétation, synthèse et éligibilité crédit
   (CMT / CLT, Facilité de caisse, Leasing, Affacturage).
   Méthode : bilan marocain CGNC (modèle normal) + CPC / ESG / CAF.
   Sans dépendance. Utilisable en navigateur (global CreditEngine)
   et en Node (module.exports) pour les tests.
   ===================================================================== */
(function (root) {
  'use strict';

  // -------- Paramètres normatifs (ajustables depuis l'UI) ----------------
  var DEFAULT_CONFIG = {
    autonomieMin: 0.25,        // capitaux propres / total bilan
    gearingMax: 1.0,           // dettes financement / capitaux propres (prudent)
    gearingHard: 1.5,          // plafond
    detteCafMax: 3,            // dettes financement / CAF (années, prudent)
    detteCafHard: 4,           // plafond
    annuiteCafMax: 0.50,       // annuités MLT / CAF (prudent)
    annuiteCafHard: 0.65,      // plafond
    detteNetteEbitdaMax: 3.0,  // dette nette / EBITDA (covenant courant)
    detteNetteEbitdaHard: 3.5,
    liquiditeGenMin: 1.0,      // actif circulant / passif circulant
    fcMoisCA: 1,               // facilité de caisse max = n mois de CA
    fcMoisCAprudent: 0.5,      // ~15 jours de CA
    affacturageQuotite: 0.85,  // % des créances clients financées
    tva: 0.20,                 // pour passage CA HT -> TTC (délais)
    tauxDefaut: 0.065          // taux indicatif si non précisé
  };

  function num(x) {
    var n = (typeof x === 'string') ? parseFloat(x.replace(/\s/g, '').replace(',', '.')) : x;
    return (typeof n === 'number' && isFinite(n)) ? n : 0;
  }
  function safeDiv(a, b) { b = num(b); return b === 0 ? null : num(a) / b; }

  // -------- Ratios d'un exercice ----------------------------------------
  function computeRatios(ex, cfg) {
    cfg = cfg || DEFAULT_CONFIG;
    var CP = num(ex.capitauxPropres), DF = num(ex.dettesFinancement),
        PROV = num(ex.provisionsDurables),
        AI = num(ex.actifImmobilise), AC = num(ex.actifCirculant), TA = num(ex.tresoActif),
        PC = num(ex.passifCirculant), TP = num(ex.tresoPassif),
        STK = num(ex.stocks), CLI = num(ex.clients), FRS = num(ex.fournisseurs),
        CA = num(ex.ca), VA = num(ex.va), EBE = num(ex.ebe),
        REX = num(ex.resultatExploitation), DOT = num(ex.dotationsExploitation),
        RN = num(ex.resultatNet), CAF = num(ex.caf),
        CF = num(ex.chargesFinancieres), PERS = num(ex.chargesPersonnel),
        ACH = num(ex.achats);

    var FP = (ex.financementPermanent != null && ex.financementPermanent !== '')
              ? num(ex.financementPermanent) : (CP + DF + PROV);
    var totalBilan = (ex.totalBilan != null && ex.totalBilan !== '')
              ? num(ex.totalBilan) : (AI + AC + TA);
    var FDR = FP - AI, BFR = AC - PC, TN = TA - TP;
    var EBITDA = EBE > 0 ? EBE : (REX + DOT);
    var detteNette = DF + TP - TA;
    var totalDettes = totalBilan - CP;
    var caTTC = CA * (1 + cfg.tva), achTTC = ACH * (1 + cfg.tva);

    return {
      FP: FP, totalBilan: totalBilan, totalDettes: totalDettes,
      FDR: FDR, BFR: BFR, TN: TN, EBITDA: EBITDA, detteNette: detteNette,
      // Structure & solvabilité
      autonomie: safeDiv(CP, totalBilan),
      gearing: safeDiv(DF, CP),
      endettementGlobal: safeDiv(totalDettes, totalBilan),
      couvertureEmplois: safeDiv(FP, AI),
      solvabilite: safeDiv(totalBilan, totalDettes),
      // Liquidité
      liquiditeGenerale: safeDiv(AC + TA, PC + TP),
      liquiditeReduite: safeDiv(AC - STK + TA, PC + TP),
      liquiditeImmediate: safeDiv(TA, PC + TP),
      // Équilibre
      fdrSurBfr: BFR !== 0 ? FDR / BFR : null,
      bfrJoursCA: safeDiv(BFR, CA) == null ? null : BFR / CA * 360,
      // Capacité de remboursement
      caf: CAF,
      detteCaf: safeDiv(DF, CAF),
      detteNetteEbitda: safeDiv(detteNette, EBITDA),
      cafSurCA: safeDiv(CAF, CA),
      couvertureInterets: CF > 0 ? EBITDA / CF : null,
      // Rentabilité & activité
      margeExploitation: safeDiv(REX, CA),
      margeNette: safeDiv(RN, CA),
      margeEbitda: safeDiv(EBITDA, CA),
      roe: safeDiv(RN, CP),
      tauxVA: safeDiv(VA, CA),
      poidsPersonnel: safeDiv(PERS, VA),
      // Rotation
      delaiClients: caTTC ? CLI / caTTC * 360 : null,
      delaiFournisseurs: achTTC ? FRS / achTTC * 360 : null,
      croissanceCA: null // rempli au niveau série
    };
  }

  // -------- Série d'exercices (du plus ancien au plus récent) ------------
  function analyzeDossier(dossier, cfg) {
    cfg = cfg || DEFAULT_CONFIG;
    var exs = (dossier.exercices || []).slice().sort(function (a, b) {
      return num(a.annee) - num(b.annee);
    });
    var results = exs.map(function (ex) {
      return { input: ex, annee: ex.annee, r: computeRatios(ex, cfg) };
    });
    for (var i = 1; i < results.length; i++) {
      var ca0 = num(results[i - 1].input.ca), ca1 = num(results[i].input.ca);
      results[i].r.croissanceCA = ca0 ? (ca1 / ca0 - 1) : null;
    }
    return results;
  }

  // -------- Annuités / actualisation ------------------------------------
  function pvFactor(i, n) {            // L = annuité * pvFactor
    if (n <= 0) return 0;
    if (i === 0) return n;
    return (1 - Math.pow(1 + i, -n)) / i;
  }
  function loanPayment(L, i, n) {      // annuité pour amortir L sur n ans
    if (n <= 0) return Infinity;
    if (i === 0) return L / n;
    return L * i / (1 - Math.pow(1 + i, -n));
  }

  // -------- Capacité d'endettement à terme (CMT / CLT / leasing) --------
  function termCapacity(ref, cfg, opts) {
    cfg = cfg || DEFAULT_CONFIG; opts = opts || {};
    var CAF = num(ref.r.caf), DF = num(ref.input.dettesFinancement);
    var k = opts.k != null ? opts.k : cfg.detteCafMax;
    var kHard = cfg.detteCafHard;
    var taux = opts.taux != null ? opts.taux : cfg.tauxDefaut;
    var stockMaxAdd = Math.max(0, k * CAF - DF);
    var stockMaxAddHard = Math.max(0, kHard * CAF - DF);
    var budgetAnnuel = cfg.annuiteCafMax * CAF;   // annuité du nouveau crédit <= 50% CAF
    // Montant max par durée (différé optionnel sur l'amortissement)
    var durees = opts.durees || [3, 5, 7, 10, 12, 15];
    var differe = opts.differe || 0;
    var parDuree = durees.map(function (n) {
      var amort = Math.max(1, n - differe);
      var flowMax = budgetAnnuel * pvFactor(taux, amort);
      var max = Math.min(stockMaxAddHard, flowMax);
      return { duree: n, max: max, flowMax: flowMax,
               annuite: loanPayment(max, taux, amort) };
    });
    return {
      CAF: CAF, DF: DF, detteCafActuel: safeDiv(DF, CAF),
      stockMaxAdd: stockMaxAdd, stockMaxAddHard: stockMaxAddHard,
      budgetAnnuel: budgetAnnuel, taux: taux, parDuree: parDuree
    };
  }

  function flag(ok, level) { return { ok: ok, level: ok ? 'ok' : level }; }

  // -------- Éligibilité d'une demande CMT/CLT précise -------------------
  function evalCreditTerme(ref, demande, cfg) {
    cfg = cfg || DEFAULT_CONFIG;
    var r = ref.r;
    var CAF = num(r.caf), CP = num(ref.input.capitauxPropres),
        DF = num(ref.input.dettesFinancement), EBITDA = num(r.EBITDA),
        detteNette = num(r.detteNette);
    var M = num(demande.montant), n = num(demande.duree),
        g = num(demande.differe), i = demande.taux != null ? num(demande.taux) : cfg.tauxDefaut;
    var amort = Math.max(1, n - g);
    var annuite = loanPayment(M, i, amort);

    var detteCafPost = safeDiv(DF + M, CAF);
    var gearingPost = safeDiv(DF + M, CP);
    var dnEbitdaPost = safeDiv(detteNette + M, EBITDA);
    var annuiteSurCaf = safeDiv(annuite, CAF);

    var raisons = [];
    function push(label, value, soft, hard, lowerIsBetter, fmt) {
      var bad, level;
      if (lowerIsBetter) { bad = value > soft; level = value > hard ? 'hard' : 'soft'; }
      else { bad = value < soft; level = value < hard ? 'hard' : 'soft'; }
      raisons.push({
        label: label, value: value, fmt: fmt || 'ratio',
        seuil: soft, plafond: hard, ok: !bad, level: bad ? level : 'ok'
      });
    }
    push('Endettement à terme / CAF (post-crédit, max ' + cfg.detteCafMax + '–' + cfg.detteCafHard + ' ans)',
         detteCafPost, cfg.detteCafMax, cfg.detteCafHard, true, 'annees');
    push('Annuité du crédit / CAF (max ' + Math.round(cfg.annuiteCafMax * 100) + '–' + Math.round(cfg.annuiteCafHard * 100) + ' %)',
         annuiteSurCaf, cfg.annuiteCafMax, cfg.annuiteCafHard, true, 'pct');
    push('Gearing post-crédit — dettes financ. / fonds propres (max ' + cfg.gearingMax + '–' + cfg.gearingHard + ')',
         gearingPost, cfg.gearingMax, cfg.gearingHard, true, 'ratio');
    push('Dette nette / EBITDA post-crédit (max ' + cfg.detteNetteEbitdaMax + '–' + cfg.detteNetteEbitdaHard + '×)',
         dnEbitdaPost, cfg.detteNetteEbitdaMax, cfg.detteNetteEbitdaHard, true, 'x');
    push('Autonomie financière (min ' + Math.round(cfg.autonomieMin * 100) + ' %)',
         num(r.autonomie), cfg.autonomieMin, cfg.autonomieMin * 0.8, false, 'pct');

    var hard = raisons.some(function (x) { return x.level === 'hard'; });
    var soft = raisons.some(function (x) { return x.level === 'soft'; });
    var verdict = hard ? 'defavorable' : (soft ? 'reserves' : 'favorable');

    var cap = termCapacity(ref, cfg, { taux: i, differe: g, durees: [n] });
    var montantMax = cap.parDuree[0].max;

    return {
      ligne: n > 7 ? 'CLT' : 'CMT',
      demande: { montant: M, duree: n, differe: g, taux: i },
      annuite: annuite, montantMax: montantMax,
      verdict: verdict, raisons: raisons,
      capacite: termCapacity(ref, cfg, { taux: i, differe: g })
    };
  }

  // -------- Facilité de caisse ------------------------------------------
  function evalFaciliteCaisse(ref, cfg, demande) {
    cfg = cfg || DEFAULT_CONFIG; demande = demande || {};
    var r = ref.r, CA = num(ref.input.ca);
    var max = CA / 12 * cfg.fcMoisCA;
    var prudent = CA / 12 * cfg.fcMoisCAprudent;
    var liq = num(r.liquiditeGenerale), caf = num(r.caf);
    var raisons = [];
    raisons.push({ label: 'Liquidité générale (min ' + cfg.liquiditeGenMin + ')',
      value: liq, fmt: 'ratio', seuil: cfg.liquiditeGenMin, ok: liq >= cfg.liquiditeGenMin,
      level: liq >= cfg.liquiditeGenMin ? 'ok' : 'soft' });
    raisons.push({ label: 'Capacité d\'autofinancement positive', value: caf, fmt: 'dh',
      ok: caf > 0, level: caf > 0 ? 'ok' : 'hard' });
    raisons.push({ label: 'Besoin du cycle (BFR)', value: num(r.BFR), fmt: 'dh', ok: true, level: 'ok' });
    var demandee = demande.montant != null ? num(demande.montant) : null;
    var hard = raisons.some(function (x) { return x.level === 'hard'; });
    var verdict = hard ? 'defavorable'
      : (demandee != null && demandee > max ? 'reserves' : 'favorable');
    return {
      ligne: 'Facilité de caisse', max: max, prudent: prudent,
      demande: demandee, verdict: verdict, raisons: raisons,
      base: '≈ 1 mois de chiffre d\'affaires (CA ' + Math.round(CA) + ' / 12)'
    };
  }

  // -------- Leasing (même enveloppe MLT) --------------------------------
  function evalLeasing(ref, cfg, demande) {
    cfg = cfg || DEFAULT_CONFIG;
    var cap = termCapacity(ref, cfg, demande || {});
    var d5 = cap.parDuree.filter(function (x) { return x.duree === 5; })[0] || cap.parDuree[0];
    var caf = num(ref.r.caf);
    var verdict = caf > 0 ? (cap.stockMaxAdd > 0 ? 'favorable' : 'reserves') : 'defavorable';
    return {
      ligne: 'Leasing (crédit-bail)', max: d5.max, capacite: cap, verdict: verdict,
      note: 'Le loyer de leasing est une annuité : il consomme la MÊME enveloppe à terme que le CMT/CLT.',
      raisons: [
        { label: 'CAF positive', value: caf, fmt: 'dh', ok: caf > 0, level: caf > 0 ? 'ok' : 'hard' },
        { label: 'Marge d\'endettement à terme (3×CAF − dettes financ.)', value: cap.stockMaxAdd, fmt: 'dh', ok: cap.stockMaxAdd > 0, level: cap.stockMaxAdd > 0 ? 'ok' : 'soft' }
      ]
    };
  }

  // -------- Affacturage --------------------------------------------------
  function evalAffacturage(ref, cfg) {
    cfg = cfg || DEFAULT_CONFIG;
    var CLI = num(ref.input.clients), CA = num(ref.input.ca);
    var ligneMax = cfg.affacturageQuotite * CLI;
    var poidsClients = safeDiv(CLI, CA);
    // Factorabilité : créances B2B significatives ?
    var faible = (poidsClients == null) || (poidsClients < 0.05);
    var raisons = [
      { label: 'Créances clients (assiette factorable)', value: CLI, fmt: 'dh', ok: CLI > 0, level: CLI > 0 ? 'ok' : 'hard' },
      { label: 'Poids des créances clients dans le CA', value: poidsClients, fmt: 'pct', ok: !faible, level: faible ? 'soft' : 'ok' }
    ];
    return {
      ligne: 'Affacturage', max: ligneMax, quotite: cfg.affacturageQuotite,
      verdict: CLI <= 0 ? 'defavorable' : (faible ? 'reserves' : 'favorable'),
      raisons: raisons,
      reserve: faible ? 'Créances clients faibles vs CA : activité probablement B2C / sur avances. L\'affacturage n\'a d\'intérêt que sur un poste clients B2B à paiement différé.' : null
    };
  }

  // -------- Synthèse : forces / vigilances ------------------------------
  function buildSynthese(results, cfg) {
    cfg = cfg || DEFAULT_CONFIG;
    if (!results.length) return { forces: [], vigilances: [], note: 'Aucun exercice.' };
    var cur = results[results.length - 1], prev = results.length > 1 ? results[results.length - 2] : null;
    var r = cur.r, forces = [], vig = [];
    function evo(field) { return prev ? num(r[field]) - num(prev.r[field]) : null; }

    if (num(r.autonomie) >= cfg.autonomieMin)
      forces.push('Autonomie financière solide (' + pct(r.autonomie) + ') : structure peu dépendante des créanciers.');
    else vig.push('Autonomie financière faible (' + pct(r.autonomie) + ', seuil ' + pct(cfg.autonomieMin) + ').');

    if (num(r.gearing) <= cfg.gearingMax)
      forces.push('Endettement à terme très maîtrisé (gearing ' + ratio(r.gearing) + ').');
    else vig.push('Gearing élevé (' + ratio(r.gearing) + ') : levier financier tendu.');

    if (r.detteCaf != null && r.detteCaf <= cfg.detteCafMax)
      forces.push('Capacité de remboursement confortable : dettes / CAF = ' + annees(r.detteCaf) + ' (norme < ' + cfg.detteCafMax + ' ans).');
    else if (r.detteCaf != null) vig.push('Capacité de remboursement tendue : dettes / CAF = ' + annees(r.detteCaf) + '.');

    if (num(r.liquiditeGenerale) >= cfg.liquiditeGenMin)
      forces.push('Liquidité générale satisfaisante (' + ratio(r.liquiditeGenerale) + ').');
    else vig.push('Liquidité générale sous 1 (' + ratio(r.liquiditeGenerale) + ').');

    if (num(r.margeNette) > 0)
      forces.push('Société bénéficiaire (marge nette ' + pct(r.margeNette) + ', ROE ' + pct(r.roe) + ').');
    else vig.push('Rentabilité nette négative.');

    if (r.croissanceCA != null) {
      if (r.croissanceCA >= 0) forces.push('Activité en croissance (CA ' + signePct(r.croissanceCA) + ').');
      else vig.push('Chiffre d\'affaires en recul (' + signePct(r.croissanceCA) + ').');
    }
    // Vigilances dynamiques
    if (prev && num(r.TN) < num(prev.r.TN) && num(r.TN) < num(r.BFR) * 0.1)
      vig.push('Trésorerie nette en forte baisse (' + dh(prev.r.TN) + ' → ' + dh(r.TN) + ') : le BFR a absorbé le fonds de roulement.');
    if (prev && num(r.BFR) > num(prev.r.BFR) * 1.3)
      vig.push('Le BFR progresse vite (' + dh(prev.r.BFR) + ' → ' + dh(r.BFR) + ') : surveiller le cycle (clients / avances).');
    if (r.poidsPersonnel != null && r.poidsPersonnel > 0.6)
      vig.push('Masse salariale lourde dans la valeur ajoutée (' + pct(r.poidsPersonnel) + ').');
    if (num(r.fdrSurBfr) != null && num(r.fdrSurBfr) > 0 && num(r.fdrSurBfr) < 1.1 && num(r.BFR) > 0)
      vig.push('Le fonds de roulement ne couvre plus que tout juste le BFR (FDR/BFR = ' + ratio(r.fdrSurBfr) + ').');

    return { forces: forces, vigilances: vig };
  }

  // -------- Note globale de santé (0–100) -------------------------------
  // Solidité structurelle (bilan) moins un malus de dynamique (tendance).
  function scoreSante(ref, cfg, prev) {
    cfg = cfg || DEFAULT_CONFIG; var r = ref.r, s = 0, max = 0;
    function add(cond, w) { max += w; if (cond) s += w; }
    add(num(r.autonomie) >= cfg.autonomieMin, 18);
    add(r.detteCaf != null && r.detteCaf <= cfg.detteCafMax, 18);
    add(num(r.gearing) <= cfg.gearingMax, 12);
    add(num(r.liquiditeGenerale) >= cfg.liquiditeGenMin, 12);
    add(num(r.margeNette) > 0, 12);
    add(r.detteNetteEbitda != null && r.detteNetteEbitda <= cfg.detteNetteEbitdaMax, 12);
    add(num(r.TN) >= 0, 8);
    add(r.fdrSurBfr == null || num(r.BFR) <= 0 || num(r.fdrSurBfr) >= 1, 8);
    var score = s / max * 100;
    // Malus de dynamique (max -15)
    var malus = 0;
    if (prev) {
      var tn0 = num(prev.r.TN), tn1 = num(r.TN);
      if (tn0 > 0 && tn1 < tn0 * 0.5) malus += 8;          // trésorerie divisée par >2
      if (num(prev.r.BFR) > 0 && num(r.BFR) > num(prev.r.BFR) * 1.3) malus += 7; // BFR +30%
    }
    return Math.max(0, Math.round(score - malus));
  }

  // -------- Formatteurs (réutilisés par l'UI) ---------------------------
  function dh(x) { x = num(x); return x.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' DH'; }
  function pct(x) { return x == null ? '—' : (num(x) * 100).toFixed(1).replace('.', ',') + ' %'; }
  function signePct(x) { return x == null ? '—' : (x >= 0 ? '+' : '') + (num(x) * 100).toFixed(1).replace('.', ',') + ' %'; }
  function ratio(x) { return x == null ? '—' : num(x).toFixed(2).replace('.', ','); }
  function annees(x) { return x == null ? '—' : num(x).toFixed(1).replace('.', ',') + ' an' + (num(x) >= 2 ? 's' : ''); }

  var api = {
    DEFAULT_CONFIG: DEFAULT_CONFIG, num: num,
    computeRatios: computeRatios, analyzeDossier: analyzeDossier,
    termCapacity: termCapacity, evalCreditTerme: evalCreditTerme,
    evalFaciliteCaisse: evalFaciliteCaisse, evalLeasing: evalLeasing,
    evalAffacturage: evalAffacturage, buildSynthese: buildSynthese,
    scoreSante: scoreSante, pvFactor: pvFactor, loanPayment: loanPayment,
    fmt: { dh: dh, pct: pct, signePct: signePct, ratio: ratio, annees: annees }
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.CreditEngine = api;
})(typeof window !== 'undefined' ? window : globalThis);
