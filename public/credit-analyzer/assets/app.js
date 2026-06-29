/* Analyseur Crédit — application (rendu + interactions, sans framework) */
(function () {
  'use strict';
  var E = window.CreditEngine, F = E.fmt, FIELDS = window.CREDIT_FIELDS;
  var LS_KEY = 'credit-analyzer-v1';

  // ---------------- État ----------------
  var state = load() || clone(window.SAMPLE_V21);
  var config = Object.assign({}, E.DEFAULT_CONFIG, state.config || {});
  var documents = []; // en mémoire (session)
  var currentTab = 'dossier';
  var results = [];

  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function load() { try { var s = JSON.parse(localStorage.getItem(LS_KEY)); return s && s.exercices ? s : null; } catch (e) { return null; } }
  function save() {
    try { localStorage.setItem(LS_KEY, JSON.stringify({ societe: state.societe, exercices: state.exercices, notes: state.notes, config: config })); } catch (e) {}
  }
  function $(id) { return document.getElementById(id); }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]; }); }

  // ---------------- Formatage ----------------
  function fval(v, fmt) {
    if (v == null || (typeof v === 'number' && !isFinite(v))) return '—';
    switch (fmt) {
      case 'pct': return F.pct(v);
      case 'spct': return F.signePct(v);
      case 'ratio': return F.ratio(v);
      case 'x': return F.ratio(v) + '×';
      case 'dh': return F.dh(v);
      case 'annees': return F.annees(v);
      case 'jours': return Math.round(v) + ' j';
      default: return F.ratio(v);
    }
  }
  function level(v, good, bad, dir) {
    if (v == null || !isFinite(v) || good == null) return null;
    if (dir === 'high') return v >= good ? 'ok' : (v >= bad ? 'soft' : 'hard');
    return v <= good ? 'ok' : (v <= bad ? 'soft' : 'hard');
  }
  function pill(lv) {
    if (!lv) return '';
    var t = { ok: 'Conforme', soft: 'À surveiller', hard: 'Hors norme' }[lv];
    return '<span class="pill ' + lv + '">' + t + '</span>';
  }

  // ---------------- Définitions de ratios ----------------
  function ratioDefs(cfg) {
    return [
      ['Structure financière & solvabilité', [
        ['autonomie', 'Autonomie financière', 'pct', 'Capitaux propres / Total bilan', cfg.autonomieMin, cfg.autonomieMin * 0.8, 'high', 'Part des fonds propres : indépendance vis-à-vis des créanciers.'],
        ['gearing', 'Gearing (levier)', 'ratio', 'Dettes financ. / Capitaux propres', cfg.gearingMax, cfg.gearingHard, 'low', 'Endettement à terme rapporté aux fonds propres.'],
        ['netGearing', 'Net gearing', 'ratio', 'Dettes nettes / Fonds propres nets d\'incorporels', cfg.gearingMax, cfg.gearingHard, 'low', 'Levier net de trésorerie et d\'incorporels (vision banque).'],
        ['leverage', 'Leverage', 'ratio', 'Total dettes / Fonds propres nets d\'incorporels', 2, 3, 'low', 'Endettement total rapporté aux fonds propres « durs ».'],
        ['endettementGlobal', 'Endettement global', 'pct', 'Total dettes / Total bilan', 0.70, 0.80, 'low', 'Poids de l\'ensemble des dettes.'],
        ['couvertureEmplois', 'Couverture des emplois stables', 'pct', 'Financement perm. / Actif immobilisé', 1, 1, 'high', 'Les ressources stables financent le long terme (FDR>0 si >100 %).'],
        ['solvabilite', 'Solvabilité générale', 'ratio', 'Total actif / Total dettes', 1.5, 1, 'high', 'Capacité de l\'actif à couvrir les dettes.']
      ]],
      ['Liquidité', [
        ['liquiditeGenerale', 'Liquidité générale', 'ratio', 'Actif circ.(+tréso) / Passif circ.(+tréso)', cfg.liquiditeGenMin, 0.8, 'high', 'Couverture des engagements à court terme.'],
        ['liquiditeReduite', 'Liquidité réduite', 'ratio', '(Créances+tréso) / Passif circulant', 0.8, 0.6, 'high', 'Liquidité hors stocks.'],
        ['liquiditeImmediate', 'Liquidité immédiate', 'pct', 'Trésorerie / Passif circulant', 0.10, 0.03, 'high', 'Coussin de cash immédiatement disponible.']
      ]],
      ['Équilibre financier (cycle)', [
        ['FDR', 'Fonds de roulement (FDR)', 'dh', 'Financement perm. − Actif immobilisé', null, null, null, 'Marge de sécurité du haut de bilan.'],
        ['BFR', 'Besoin en fonds de roulement', 'dh', 'Actif circ. HT − Passif circ. HT', null, null, null, 'Argent immobilisé par le cycle d\'exploitation.'],
        ['TN', 'Trésorerie nette', 'dh', 'Trésorerie actif − passif (= FDR − BFR)', 0, 0, 'high', 'Liquidités réelles disponibles.'],
        ['fdrSurBfr', 'Couverture du BFR', 'ratio', 'FDR / BFR', 1, 0.8, 'high', 'Le FDR couvre-t-il le besoin du cycle ?'],
        ['bfrJoursCA', 'BFR en jours de CA', 'jours', 'BFR / CA × 360', null, null, null, 'Poids du cycle exprimé en jours d\'activité.']
      ]],
      ['Capacité de remboursement', [
        ['caf', 'CAF', 'dh', 'Résultat net + dotations', null, null, null, 'Cash récurrent dégagé pour rembourser.'],
        ['detteCaf', 'Capacité de remboursement', 'annees', 'Dettes financ. / CAF', cfg.detteCafMax, cfg.detteCafHard, 'low', 'Nombre d\'années de CAF pour solder la dette à terme.'],
        ['detteNetteEbitda', 'Dette nette / EBITDA', 'x', 'Dette nette / EBITDA', cfg.detteNetteEbitdaMax, cfg.detteNetteEbitdaHard, 'low', 'Levier en multiple d\'EBITDA (covenant courant).'],
        ['dscr', 'Couverture du service de la dette (DSCR)', 'x', 'EBE / (frais fin. + échéance DLMT + crédit-bail)', cfg.dscrMin, cfg.dscrHard, 'high', 'L\'EBE couvre combien de fois le service annuel de la dette.'],
        ['cafSurCA', 'Marge d\'autofinancement', 'pct', 'CAF / CA', null, null, null, 'Capacité à générer du cash sur le CA.']
      ]],
      ['Rentabilité & activité', [
        ['croissanceCA', 'Croissance du CA', 'spct', 'CA n / CA n−1 − 1', 0, -0.05, 'high', 'Dynamique commerciale.'],
        ['margeEbitda', 'Marge EBITDA', 'pct', 'EBITDA / CA', null, null, null, 'Rentabilité d\'exploitation « cash ».'],
        ['margeExploitation', 'Marge d\'exploitation', 'pct', 'Résultat exploit. / CA', 0, 0, 'high', 'Rentabilité opérationnelle.'],
        ['margeNette', 'Marge nette', 'pct', 'Résultat net / CA', 0, 0, 'high', 'Rentabilité finale.'],
        ['roe', 'Rentabilité financière (ROE)', 'pct', 'Résultat net / Capitaux propres', null, null, null, 'Rendement des fonds propres.'],
        ['roa', 'Rentabilité économique (ROA)', 'pct', 'Résultat net / Total actif', null, null, null, 'Rendement de l\'actif engagé.'],
        ['rotationActif', 'Rotation de l\'actif', 'x', 'CA / Total actif', null, null, null, 'Intensité d\'utilisation de l\'actif.'],
        ['tauxVA', 'Taux de valeur ajoutée', 'pct', 'VA / CA', null, null, null, 'Création de valeur propre.'],
        ['poidsPersonnel', 'Poids de la masse salariale', 'pct', 'Charges personnel / VA', 0.60, 0.75, 'low', 'Part de la VA absorbée par les salaires.']
      ]],
      ['Rotation / délais', [
        ['rotationStocks', 'Rotation des stocks', 'jours', 'Stocks / CA × 360', null, null, null, 'Durée moyenne d\'écoulement des stocks.'],
        ['delaiClients', 'Délai clients', 'jours', 'Clients / CA TTC × 360', null, null, null, 'Délai moyen d\'encaissement.'],
        ['delaiFournisseurs', 'Délai fournisseurs', 'jours', 'Fournisseurs / Achats TTC × 360', null, null, null, 'Délai moyen de paiement.']
      ]]
    ];
  }

  // ---------------- Calcul ----------------
  function recompute() {
    results = E.analyzeDossier({ exercices: state.exercices }, config);
    var cur = results[results.length - 1], prev = results.length > 1 ? results[results.length - 2] : null;
    $('scoreNum').textContent = cur ? E.scoreSante(cur, config, prev) : '—';
    save();
    if (currentTab === 'analyse') renderAnalyse();
    if (currentTab === 'eligibilite') renderEligibilite();
  }
  function ref() { return results[results.length - 1]; }
  function prevRef() { return results.length > 1 ? results[results.length - 2] : null; }

  // ---------------- Onglet Dossier (saisie) ----------------
  function renderDossier() {
    $('societe').value = state.societe || '';
    var t = $('ioTable'); t.innerHTML = '';
    var exs = state.exercices;
    // header
    var thead = el('thead'); var hr = el('tr');
    hr.appendChild(el('th', null, 'Poste (DH)'));
    exs.forEach(function (ex, i) {
      var th = el('th', 'num');
      th.innerHTML = '<input value="' + esc(ex.annee) + '" data-i="' + i + '" data-k="annee" style="width:80px;text-align:center" class="yr">' +
        (exs.length > 1 ? ' <button class="btn sm danger" data-del="' + i + '" title="Supprimer">✕</button>' : '');
      hr.appendChild(th);
    });
    thead.appendChild(hr); t.appendChild(thead);
    var tb = el('tbody');
    FIELDS.forEach(function (grp) {
      var gr = el('tr', 'grp'); var gc = el('td'); gc.colSpan = exs.length + 1; gc.textContent = grp.group; gr.appendChild(gc); tb.appendChild(gr);
      grp.rows.forEach(function (row) {
        var tr = el('tr');
        var lc = el('td', 'lab-cell');
        lc.innerHTML = esc(row.label) + (row.hint ? '<div class="hint">' + esc(row.hint) + '</div>' : '');
        tr.appendChild(lc);
        exs.forEach(function (ex, i) {
          var td = el('td', 'num');
          var v = ex[row.key]; v = (v == null ? '' : v);
          td.innerHTML = '<input type="text" inputmode="decimal" data-i="' + i + '" data-k="' + row.key + '" value="' + (v === '' ? '' : esc(v)) + '">';
          tr.appendChild(td);
        });
        tb.appendChild(tr);
      });
    });
    t.appendChild(tb);
    // bind inputs
    Array.prototype.forEach.call(t.querySelectorAll('input'), function (inp) {
      inp.addEventListener('input', function () {
        var i = +inp.dataset.i, k = inp.dataset.k, val = inp.value.trim();
        if (k === 'annee') { state.exercices[i].annee = val; }
        else { state.exercices[i][k] = (val === '' ? '' : E.num(val)); }
        recompute();
      });
    });
    Array.prototype.forEach.call(t.querySelectorAll('[data-del]'), function (b) {
      b.addEventListener('click', function () {
        if (state.exercices.length <= 1) return;
        state.exercices.splice(+b.dataset.del, 1); renderDossier(); recompute();
      });
    });
    renderParams();
  }

  function renderParams() {
    var g = $('paramsGrid'); g.innerHTML = '';
    var defs = [
      ['autonomieMin', 'Autonomie min', 'pct'], ['gearingMax', 'Gearing max', 'n'],
      ['detteCafMax', 'Dettes/CAF max (ans)', 'n'], ['annuiteCafMax', 'Annuité/CAF max', 'pct'],
      ['detteNetteEbitdaMax', 'Dette nette/EBITDA max', 'n'], ['liquiditeGenMin', 'Liquidité gén. min', 'n'],
      ['fcMoisCA', 'FC : mois de CA', 'n'], ['affacturageQuotite', 'Affacturage : quotité', 'pct'],
      ['tauxDefaut', 'Taux indicatif', 'pct']
    ];
    defs.forEach(function (d) {
      var f = el('div', 'field');
      var val = config[d[0]]; if (d[2] === 'pct') val = Math.round(val * 1000) / 10;
      f.innerHTML = '<label>' + d[1] + (d[2] === 'pct' ? ' (%)' : '') + '</label><input type="number" step="any" data-p="' + d[0] + '" data-t="' + d[2] + '" value="' + val + '">';
      g.appendChild(f);
    });
    Array.prototype.forEach.call(g.querySelectorAll('input'), function (inp) {
      inp.addEventListener('input', function () {
        var v = parseFloat(inp.value); if (!isFinite(v)) return;
        config[inp.dataset.p] = inp.dataset.t === 'pct' ? v / 100 : v;
        recompute();
      });
    });
  }

  // ---------------- Onglet Analyse ----------------
  function renderAnalyse() {
    var cur = ref(), prev = prevRef(); if (!cur) return;
    var r = cur.r, pr = prev ? prev.r : null;
    // KPI
    var kpis = [
      ['Chiffre d\'affaires', F.dh(cur.input.ca), r.croissanceCA != null ? F.signePct(r.croissanceCA) : null],
      ['EBITDA', F.dh(r.EBITDA), 'marge ' + F.pct(r.margeEbitda)],
      ['Capacité de remb.', F.annees(r.detteCaf), 'dettes / CAF'],
      ['Trésorerie nette', F.dh(r.TN), pr ? F.dh(r.TN - pr.TN) + ' vs N-1' : null]
    ];
    var kr = $('kpiRow'); kr.innerHTML = '';
    kpis.forEach(function (k) {
      var up = k[2] && /^[+]/.test(k[2]); var down = k[2] && /^[-−]/.test(k[2]);
      kr.appendChild(el('div', 'kpi', '<div class="lab">' + k[0] + '</div><div class="val">' + k[1] + '</div>' +
        (k[2] ? '<div class="evo ' + (up ? 'up' : down ? 'down' : '') + '">' + esc(k[2]) + '</div>' : '')));
    });
    // Synthèse
    var syn = E.buildSynthese(results, config);
    $('synthSub').innerHTML = 'Société : <b>' + esc(state.societe || '—') + '</b> · Exercice ' + esc(cur.annee) +
      ' · Solidité structurelle <b>' + E.scoreSante(cur, config, prev) + '/100</b>';
    var sb = $('synthBox'); sb.innerHTML = '';
    sb.appendChild(el('div', 'box f', '<h4>✓ Points forts</h4><ul>' + (syn.forces.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') || '<li class="muted">—</li>') + '</ul>'));
    sb.appendChild(el('div', 'box v', '<h4>⚠ Points à surveiller</h4><ul>' + (syn.vigilances.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') || '<li class="muted">Aucun</li>') + '</ul>'));
    // Ratios
    var wrap = $('ratiosWrap'); wrap.innerHTML = '';
    var defs = ratioDefs(config);
    var y1 = cur.annee, y0 = prev ? prev.annee : 'N-1';
    defs.forEach(function (grp) {
      wrap.appendChild(el('h4', null, grp[0]));
      var tbl = el('table'); tbl.style.marginBottom = '18px';
      tbl.innerHTML = '<thead><tr><th>Ratio</th><th>Formule</th><th class="num">' + esc(y1) + '</th><th class="num">' + esc(y0) +
        '</th><th>Norme</th><th>Statut</th><th>Lecture</th></tr></thead>';
      var tb = el('tbody');
      grp[1].forEach(function (d) {
        var key = d[0], lab = d[1], fmt = d[2], formule = d[3], good = d[4], bad = d[5], dir = d[6], interp = d[7];
        var v1 = r[key], v0 = pr ? pr[key] : null;
        var lv = level(v1, good, bad, dir);
        var norme = good == null ? '—' : (dir === 'high' ? '≥ ' : '≤ ') + fval(good, fmt === 'spct' ? 'pct' : fmt);
        var tr = el('tr', 'ratio-row');
        tr.innerHTML = '<td>' + esc(lab) + '</td><td class="interp">' + esc(formule) + '</td>' +
          '<td class="num"><b>' + fval(v1, fmt) + '</b></td><td class="num muted">' + fval(v0, fmt) + '</td>' +
          '<td class="small muted">' + norme + '</td><td>' + (lv ? pill(lv) : '') + '</td>' +
          '<td class="interp">' + esc(interp) + '</td>';
        tb.appendChild(tr);
      });
      tbl.appendChild(tb); wrap.appendChild(tbl);
    });
  }

  // ---------------- Onglet Éligibilité ----------------
  function verdictBlock(o) {
    var amt = o.amountLabel || '';
    var reasons = (o.reasons || []).map(function (r) {
      var ic = r.level === 'ok' ? 'ok' : (r.level === 'hard' ? 'hard' : 'soft');
      var sym = r.level === 'ok' ? '✓' : (r.level === 'hard' ? '✕' : '!');
      var val = r.fmt === 'pct' ? F.pct(r.value) : r.fmt === 'dh' ? F.dh(r.value) :
        r.fmt === 'annees' ? F.annees(r.value) : r.fmt === 'x' ? F.ratio(r.value) + '×' : F.ratio(r.value);
      return '<li><span class="ic ' + ic + '">' + sym + '</span><span><b>' + esc(r.label) + '</b> — ' + val + '</span></li>';
    }).join('');
    var vlabel = { favorable: 'FAVORABLE', reserves: 'SOUS RÉSERVES', defavorable: 'DÉFAVORABLE' }[o.verdict];
    var html = '<div class="verdict ' + o.verdict + '">' +
      '<span class="ligne">' + esc(o.ligne) + '</span>' +
      '<span class="tag">' + vlabel + '</span>' +
      (amt ? '<span class="amt">' + amt + '</span>' : '') +
      (o.base ? '<span class="small muted">' + esc(o.base) + '</span>' : '') + '</div>' +
      (reasons ? '<ul class="reasons">' + reasons + '</ul>' : '') +
      (o.note ? '<div class="small muted" style="margin:6px 0 16px">' + esc(o.note) + '</div>' : '<div style="margin-bottom:14px"></div>');
    return html;
  }
  function renderEligibilite() {
    var cur = ref(); if (!cur) return;
    var cap = E.termCapacity(cur, config, { taux: config.tauxDefaut });
    var d5 = cap.parDuree.filter(function (x) { return x.duree === 5; })[0] || cap.parDuree[0];
    var d7 = cap.parDuree.filter(function (x) { return x.duree === 7; })[0] || cap.parDuree[0];
    var out = '';
    out += verdictBlock({
      ligne: 'CMT / CLT (crédit à terme)',
      verdict: (cap.CAF > 0 && cap.stockMaxAdd > 0) ? 'favorable' : 'reserves',
      amountLabel: 'jusqu\'à ~' + F.dh(d7.max) + ' (7 ans)',
      base: 'capacité structurelle ≤ ' + config.detteCafMax + '–' + config.detteCafHard + '× CAF',
      reasons: [
        { label: 'CAF (cash de remboursement)', value: cap.CAF, fmt: 'dh', level: cap.CAF > 0 ? 'ok' : 'hard' },
        { label: 'Capacité actuelle dettes/CAF', value: cap.detteCafActuel, fmt: 'annees', level: cap.detteCafActuel <= config.detteCafMax ? 'ok' : 'soft' },
        { label: 'Marge d\'endettement additionnelle (3×CAF)', value: cap.stockMaxAdd, fmt: 'dh', level: cap.stockMaxAdd > 0 ? 'ok' : 'soft' }
      ],
      note: 'Montant max par durée : 5 ans ≈ ' + F.dh(d5.max) + ' · 7 ans ≈ ' + F.dh(d7.max) + '. Affine dans le simulateur ci-dessous.'
    });
    var fc = E.evalFaciliteCaisse(cur, config);
    out += verdictBlock({ ligne: 'Facilité de caisse', verdict: fc.verdict,
      amountLabel: 'jusqu\'à ~' + F.dh(fc.max), base: fc.base, reasons: fc.raisons,
      note: 'Usage prudent conseillé ≈ ' + F.dh(fc.prudent) + ' (½ mois de CA). Justifiée par le cycle (BFR ' + F.dh(cur.r.BFR) + ').' });
    var le = E.evalLeasing(cur, config);
    out += verdictBlock({ ligne: le.ligne, verdict: le.verdict, amountLabel: 'jusqu\'à ~' + F.dh(le.max), reasons: le.raisons, note: le.note });
    var af = E.evalAffacturage(cur, config);
    out += verdictBlock({ ligne: af.ligne, verdict: af.verdict, amountLabel: 'ligne ~' + F.dh(af.max),
      base: 'quotité ' + Math.round(af.quotite * 100) + '% des créances clients', reasons: af.raisons, note: af.reserve });
    $('verdicts').innerHTML = out;
    runSimulator();
    runCDSD();
  }
  function runSimulator() {
    var cur = ref(); if (!cur) return;
    var demande = { montant: E.num($('simMontant').value), duree: E.num($('simDuree').value),
      differe: E.num($('simDiffere').value), taux: E.num($('simTaux').value) / 100 };
    var ev = E.evalCreditTerme(cur, demande, config);
    $('simResult').innerHTML = verdictBlock({
      ligne: ev.ligne + ' — ' + F.dh(demande.montant) + ' sur ' + demande.duree + ' ans (différé ' + demande.differe + ', ' + F.pct(demande.taux) + ')',
      verdict: ev.verdict, amountLabel: 'annuité ' + F.dh(ev.annuite),
      base: 'plafond pour cette durée ≈ ' + F.dh(ev.montantMax), reasons: ev.raisons.map(function (x) {
        return { label: x.label, value: x.value, fmt: x.fmt, level: x.level };
      })
    });
    var cap = E.termCapacity(cur, config, { taux: demande.taux, differe: demande.differe });
    var t = $('maxParDuree');
    t.innerHTML = '<thead><tr><th>Durée</th><th class="num">Montant max</th><th class="num">Annuité</th><th class="num">Annuité / CAF</th></tr></thead>';
    var tb = el('tbody');
    cap.parDuree.forEach(function (p) {
      var ac = p.annuite / cap.CAF;
      tb.appendChild(el('tr', null, '<td>' + p.duree + ' ans</td><td class="num"><b>' + F.dh(p.max) + '</b></td><td class="num">' + F.dh(p.annuite) + '</td><td class="num">' + F.pct(ac) + '</td>'));
    });
    t.appendChild(tb);
  }
  function runCDSD() {
    var cur = ref(); if (!cur) return;
    var margeVal = $('cdMarge').value.trim();
    var opts = {
      duree: E.num($('cdDuree').value), taux: E.num($('cdTaux').value) / 100,
      tauxIS: E.num($('cdIS').value) / 100, croissance: E.num($('cdCroissance').value) / 100,
      invest: E.num($('cdInvest').value), dividendes: E.num($('cdDiv').value)
    };
    if (margeVal !== '') opts.margeEBE = E.num(margeVal) / 100;
    var c = E.capaciteEndettementCDSD(cur, config, opts);
    $('cdsdResult').innerHTML = verdictBlock({
      ligne: 'Capacité d\'endettement — méthode banque (' + c.n + ' ans)',
      verdict: c.capaciteAdd > 0 ? 'favorable' : 'reserves',
      amountLabel: F.dh(c.capacite) + ' au total',
      base: 'actualisation après IS ' + F.pct(c.Ri) + ' · marge EBE ' + F.pct(c.hyp.margeEBE) + ' · croissance ' + F.pct(c.hyp.croissance),
      reasons: [
        { label: 'Capacité totale (VA des cash-flows pour la dette)', value: c.capacite, fmt: 'dh', level: c.capacite > 0 ? 'ok' : 'hard' },
        { label: 'Dettes financières déjà en place', value: c.DF, fmt: 'dh', level: 'ok' },
        { label: 'Capacité additionnelle mobilisable', value: c.capaciteAdd, fmt: 'dh', level: c.capaciteAdd > 0 ? 'ok' : 'soft' }
      ],
      note: 'Plus rigoureux que « 3× CAF » : tient compte, année par année, de la croissance, du BFR et des investissements.'
    });
    var t = $('cdsdTable');
    t.innerHTML = '<thead><tr><th>Année</th><th class="num">CA</th><th class="num">EBE</th><th class="num">Δ BFR</th><th class="num">IS</th><th class="num">CDSD</th><th class="num">VA du CDSD</th></tr></thead>';
    var tb = el('tbody');
    c.rows.forEach(function (row) {
      tb.appendChild(el('tr', null, '<td>n+' + row.t + '</td><td class="num">' + F.dh(row.ca) + '</td><td class="num">' + F.dh(row.ebe) +
        '</td><td class="num">' + F.dh(row.dbfr) + '</td><td class="num">' + F.dh(row.is) + '</td><td class="num"><b>' + F.dh(row.cdsd) +
        '</b></td><td class="num">' + F.dh(row.va) + '</td>'));
    });
    t.appendChild(tb);
  }

  // ---------------- Onglet Documents & notes ----------------
  function renderDocuments() {
    $('notes').value = state.notes || '';
    var list = $('docList'); list.innerHTML = '';
    documents.forEach(function (d, i) {
      var li = el('li');
      li.innerHTML = '<span>📄</span><span style="flex:1"><b>' + esc(d.name) + '</b> <span class="meta">' + (d.size / 1024 | 0) + ' Ko' + (d.text ? ' · texte extrait' : '') + '</span></span>' +
        '<button class="btn sm danger" data-doc="' + i + '">Retirer</button>';
      list.appendChild(li);
    });
    Array.prototype.forEach.call(list.querySelectorAll('[data-doc]'), function (b) {
      b.addEventListener('click', function () { documents.splice(+b.dataset.doc, 1); renderDocuments(); });
    });
  }
  function addFiles(files) {
    Array.prototype.forEach.call(files, function (file) {
      var d = { name: file.name, size: file.size, type: file.type, text: '' };
      documents.push(d); renderDocuments();
      if (file.type === 'application/pdf') { extractPdfText(file).then(function (txt) { d.text = txt ? txt.slice(0, 20000) : ''; renderDocuments(); }).catch(function () {}); }
      else if (/text|json|csv/.test(file.type)) { file.text().then(function (t) { d.text = t.slice(0, 20000); renderDocuments(); }); }
    });
  }

  // ---------------- Import PDF (pdf.js, lazy) ----------------
  var pdfjsLoading = null;
  function loadPdfJs() {
    if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
    if (pdfjsLoading) return pdfjsLoading;
    pdfjsLoading = new Promise(function (resolve, reject) {
      var base = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/';
      var u = document.createElement('script');
      u.src = base + 'pdf.min.js';
      u.onload = function () {
        if (window.pdfjsLib) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = base + 'pdf.worker.min.js';
          resolve(window.pdfjsLib);
        } else reject(new Error('pdfjs introuvable'));
      };
      u.onerror = function () { reject(new Error('réseau pdf.js')); };
      document.head.appendChild(u);
    });
    return pdfjsLoading;
  }
  function extractPdfText(file) {
    return loadPdfJs().then(function (pdfjsLib) {
      return file.arrayBuffer().then(function (buf) {
        return pdfjsLib.getDocument({ data: buf }).promise.then(function (pdf) {
          var pages = [];
          var seq = Promise.resolve();
          for (var p = 1; p <= pdf.numPages; p++) {
            (function (p) {
              seq = seq.then(function () {
                return pdf.getPage(p).then(function (page) {
                  return page.getTextContent().then(function (c) {
                    pages.push(c.items.map(function (it) { return it.str; }).join(' '));
                  });
                });
              });
            })(p);
          }
          return seq.then(function () { return pages.join('\n'); });
        });
      });
    });
  }
  // Extraction best-effort des grandeurs depuis le texte de la liasse
  function extractFigures(text) {
    var t = ' ' + text.replace(/ /g, ' ').replace(/\s+/g, ' ') + ' ';
    function grab(re) { var m = t.match(re); if (!m) return null; var n = m[1].replace(/[ .](?=\d{3}\b)/g, '').replace(/\s/g, '').replace(',', '.'); var v = parseFloat(n); return isFinite(v) ? v : null; }
    var N = '([0-9][0-9 .]*[0-9],[0-9]{2})';
    var ex = {};
    // Label → premier montant qui suit (colonne « exercice »)
    function after(label) { var re = new RegExp(label + '[^0-9-]{0,40}' + N, 'i'); return grab(re); }
    ex.ca = after('CHIFFRES? D.AFFAIRES?') || after('Ventes de bien');
    ex.va = after('VALEUR AJOUTEE');
    ex.ebe = after('EXCEDENT BRUT D.EXPLOITATION');
    ex.resultatExploitation = after('RESULTAT D.EXPLOITATION');
    ex.dotationsExploitation = after('Dotations d.exploitation');
    ex.chargesPersonnel = after('Charges de personnel');
    ex.resultatNet = after('RESULTAT NET DE L.EXERCICE') || after('Résultat net de l.exercice');
    ex.caf = after('CAPACITE D.AUTOFINANCEMENT');
    ex.capitauxPropres = after('TOTAL DES CAPITAUX PROPRES') || after('CAPITAUX PROPRES');
    ex.dettesFinancement = after('DETTES DE FINANCEMENT');
    ex.achats = after('Achats consomm');
    return ex;
  }

  // ---------------- Assistant déterministe ----------------
  function lower(s) { return s.toLowerCase().replace(/ /g, ' '); }
  function parseAmount(s) {
    s = lower(s);
    var m = s.match(/(\d+(?:[.,]\d+)?)\s*m(?:illion|io|\b)/); if (m) return parseFloat(m[1].replace(',', '.')) * 1e6;
    m = s.match(/(\d+(?:[.,]\d+)?)\s*k\b/); if (m) return parseFloat(m[1].replace(',', '.')) * 1e3;
    var all = s.match(/\d[\d  .]{2,}\d|\d{4,}/g);
    if (all) { var nums = all.map(function (x) { return parseFloat(x.replace(/[ .]/g, '')); }).filter(function (n) { return n >= 10000; }); if (nums.length) return Math.max.apply(null, nums); }
    return null;
  }
  function parseTaux(s) { s = lower(s); var m = s.match(/taux[^0-9]*(\d+(?:[.,]\d+)?)/) || s.match(/(\d+(?:[.,]\d+)?)\s*%/); return m ? parseFloat(m[1].replace(',', '.')) / 100 : config.tauxDefaut; }
  function parseDiffere(s) { s = lower(s); var m = s.match(/diff[ée]r[ée][^0-9]*(\d+)/) || s.match(/(\d+)\s*an[^0-9]*de\s*diff/); return m ? +m[1] : 0; }
  function parseDuree(s, differe) {
    s = lower(s); var all = (s.match(/(\d+)\s*an/g) || []).map(function (x) { return parseInt(x, 10); });
    all = all.filter(function (n) { return n !== differe; });
    if (all.length) return Math.max.apply(null, all); return 7;
  }
  var GLOSSARY = {
    'bfr': 'Le BFR (Besoin en Fonds de Roulement) = Actif circulant HT − Passif circulant HT. C\'est l\'argent immobilisé par le cycle (créances + stocks − dettes court terme).',
    'fdr': 'Le FDR (Fonds de Roulement) = Financement permanent − Actif immobilisé. C\'est la marge de sécurité du haut de bilan.',
    'fonds de roulement': 'Le FDR = Financement permanent − Actif immobilisé : la marge de sécurité du haut de bilan.',
    'tresorerie': 'La Trésorerie nette = Trésorerie actif − Trésorerie passif = FDR − BFR.',
    'trésorerie': 'La Trésorerie nette = Trésorerie actif − Trésorerie passif = FDR − BFR.',
    'caf': 'La CAF (Capacité d\'AutoFinancement) = Résultat net + dotations. C\'est le cash récurrent qui sert à rembourser la dette.',
    'ebitda': 'L\'EBITDA = résultat avant intérêts, impôts et dotations ≈ l\'EBE marocain. Mesure la rentabilité cash de l\'exploitation.',
    'gearing': 'Le gearing = Dettes de financement / Capitaux propres : le levier d\'endettement à terme (idéal < 1).',
    'autonomie': 'L\'autonomie financière = Capitaux propres / Total bilan : l\'indépendance vis-à-vis des créanciers (bon si > 25-33 %).'
  };

  function answer(q) {
    var cur = ref(); if (!cur) return 'Aucun bilan chargé.';
    var s = lower(q), r = cur.r;
    // glossaire / explications
    if (/explique|c.est quoi|d[ée]finition|que veut dire|comment.*calcul/.test(s)) {
      for (var key in GLOSSARY) { if (s.indexOf(key) >= 0) {
        var v = ({ bfr: F.dh(r.BFR), fdr: F.dh(r.FDR), 'fonds de roulement': F.dh(r.FDR), tresorerie: F.dh(r.TN), 'trésorerie': F.dh(r.TN), caf: F.dh(r.caf), ebitda: F.dh(r.EBITDA), gearing: F.ratio(r.gearing), autonomie: F.pct(r.autonomie) })[key];
        return GLOSSARY[key] + (v ? '\nValeur actuelle (' + cur.annee + ') : ' + v + '.' : '');
      } }
    }
    // détection ligne de crédit
    var ligne = /affactur|factoring/.test(s) ? 'affacturage'
      : /leasing|cr[ée]dit[- ]bail/.test(s) ? 'leasing'
      : /facilit[ée] de caisse|d[ée]couvert|caisse/.test(s) ? 'fc'
      : /cmt|clt|moyen terme|long terme|cr[ée]dit (?:à|a) terme|investiss|amortissable|emprunt/.test(s) ? 'cmt'
      : null;
    if (!ligne && parseAmount(s) && /an\b|ans\b/.test(s)) ligne = 'cmt';

    if (ligne === 'cmt') {
      var differe = parseDiffere(s), duree = parseDuree(s, differe), taux = parseTaux(s), montant = parseAmount(s);
      if (montant) {
        var ev = E.evalCreditTerme(cur, { montant: montant, duree: duree, differe: differe, taux: taux }, config);
        var head = ev.ligne + ' de ' + F.dh(montant) + ' sur ' + duree + ' ans (différé ' + differe + ', taux ' + F.pct(taux) + ') → ' +
          ({ favorable: 'FAVORABLE ✅', reserves: 'SOUS RÉSERVES 🟠', defavorable: 'DÉFAVORABLE ❌' })[ev.verdict];
        var lines = ev.raisons.map(function (x) {
          var val = x.fmt === 'pct' ? F.pct(x.value) : x.fmt === 'annees' ? F.annees(x.value) : x.fmt === 'x' ? F.ratio(x.value) + '×' : F.ratio(x.value);
          return (x.level === 'ok' ? '• ✓ ' : x.level === 'hard' ? '• ✕ ' : '• ! ') + x.label + ' = ' + val;
        });
        var concl = ev.verdict === 'favorable' ? 'Tous les indicateurs de capacité sont dans les normes : le dossier est finançable.' :
          ev.verdict === 'reserves' ? 'Faisable, mais des ratios sont en zone d\'alerte (voir « ! ») — à encadrer ou réduire le montant. Plafond conseillé pour cette durée : ' + F.dh(ev.montantMax) + '.' :
          'Un ratio clé est franchi (« ✕ ») : refus en l\'état. Montant supportable pour cette durée : ' + F.dh(ev.montantMax) + '.';
        return head + '\nAnnuité ≈ ' + F.dh(ev.annuite) + '.\n' + lines.join('\n') + '\n\n' + concl;
      } else {
        var cap = E.termCapacity(cur, config, { taux: taux });
        var d = cap.parDuree.filter(function (x) { return x.duree === duree; })[0] || cap.parDuree[2];
        return 'Capacité d\'endettement à terme : la société peut porter jusqu\'à ~' + F.dh(cap.stockMaxAdd) + ' de dette additionnelle (norme 3× CAF), ' + F.dh(cap.stockMaxAddHard) + ' au plafond (4× CAF).\nMontant max sur ' + duree + ' ans (taux ' + F.pct(taux) + ') ≈ ' + F.dh(d.max) + ' (annuité ' + F.dh(d.annuite) + ').\nPrécise un montant pour un verdict favorable/défavorable détaillé.';
      }
    }
    if (ligne === 'fc') {
      var fc = E.evalFaciliteCaisse(cur, config);
      return 'Facilité de caisse → ' + (fc.verdict === 'favorable' ? 'FAVORABLE ✅' : fc.verdict === 'reserves' ? 'SOUS RÉSERVES 🟠' : 'DÉFAVORABLE ❌') +
        '.\nMontant max ≈ ' + F.dh(fc.max) + ' (' + fc.base + '), usage prudent ≈ ' + F.dh(fc.prudent) + '.\nJustification : couvre les décalages de trésorerie du cycle (BFR ' + F.dh(r.BFR) + ', trésorerie nette ' + F.dh(r.TN) + '). Ligne court terme, remboursable, adossée à l\'activité.';
    }
    if (ligne === 'leasing') {
      var le = E.evalLeasing(cur, config);
      return 'Leasing (crédit-bail) → ' + (le.verdict === 'favorable' ? 'FAVORABLE ✅' : le.verdict === 'reserves' ? 'SOUS RÉSERVES 🟠' : 'DÉFAVORABLE ❌') +
        '.\nEnveloppe ~' + F.dh(le.max) + ' (≈ 5 ans). ' + le.note + '\nLe loyer s\'impute comme une annuité sur la CAF (' + F.dh(r.caf) + ').';
    }
    if (ligne === 'affacturage') {
      var af = E.evalAffacturage(cur, config);
      return 'Affacturage → ' + (af.verdict === 'favorable' ? 'FAVORABLE ✅' : af.verdict === 'reserves' ? 'SOUS RÉSERVES 🟠' : 'DÉFAVORABLE ❌') +
        '.\nLigne ≈ ' + F.dh(af.max) + ' (quotité ' + Math.round(af.quotite * 100) + '% des créances clients ' + F.dh(E.num(cur.input.clients)) + ').' + (af.reserve ? '\nRéserve : ' + af.reserve : '');
    }
    if (/solide|sant[ée]|forte|robuste|risqu|globale?|avis|synth/.test(s)) {
      var syn = E.buildSynthese(results, config);
      return 'Solidité structurelle : ' + E.scoreSante(cur, config, prevRef()) + '/100.\nForces : ' + (syn.forces[0] || '—') + (syn.forces[1] ? ' ' + syn.forces[1] : '') +
        '\nVigilances : ' + (syn.vigilances.join(' ') || 'aucune') ;
    }
    if (/[ée]ligib/.test(s)) return 'Précise la ligne (CMT/CLT, facilité de caisse, leasing, affacturage), le montant, la durée et le taux — ex : « CMT 600 000 sur 7 ans, différé 1 an, taux 6 % ».';
    return 'Je réponds aux questions d\'éligibilité (CMT/CLT, facilité de caisse, leasing, affacturage) et sur les ratios. Ex : « Éligible à un CMT de 800 000 sur 7 ans à 6 % ? » ou « explique le BFR ».';
  }

  function pushMsg(text, who) {
    var log = $('chatLog'); var m = el('div', 'msg ' + who); m.textContent = text; log.appendChild(m); log.scrollTop = log.scrollHeight;
  }
  function sendChat() {
    var inp = $('chatInput'); var q = inp.value.trim(); if (!q) return;
    pushMsg(q, 'user'); inp.value = '';
    setTimeout(function () { pushMsg(answer(q), 'bot'); }, 120);
  }

  // ---------------- Export rapport ----------------
  function buildReport() {
    var cur = ref(), prev = prevRef(); if (!cur) return '';
    var r = cur.r, syn = E.buildSynthese(results, config);
    var L = [];
    L.push('# Étude de faisabilité crédit — ' + (state.societe || 'Société'));
    L.push('Exercice ' + cur.annee + (prev ? ' (vs ' + prev.annee + ')' : '') + ' · Solidité structurelle ' + E.scoreSante(cur, config, prev) + '/100\n');
    L.push('## Synthèse');
    L.push('Points forts :'); syn.forces.forEach(function (x) { L.push('- ' + x); });
    L.push('\nPoints à surveiller :'); (syn.vigilances.length ? syn.vigilances : ['Aucun']).forEach(function (x) { L.push('- ' + x); });
    L.push('\n## Ratios (' + cur.annee + ')');
    ratioDefs(config).forEach(function (g) {
      L.push('\n### ' + g[0]);
      g[1].forEach(function (d) { L.push('- ' + d[1] + ' : ' + fval(r[d[0]], d[2]) + '  (' + d[3] + ')'); });
    });
    L.push('\n## Éligibilité (garanties supposées acquises)');
    var cap = E.termCapacity(cur, config, { taux: config.tauxDefaut });
    L.push('- CMT/CLT : capacité additionnelle ~' + F.dh(cap.stockMaxAdd) + ' (3×CAF) à ' + F.dh(cap.stockMaxAddHard) + ' (4×CAF).');
    cap.parDuree.forEach(function (p) { L.push('    · ' + p.duree + ' ans → max ' + F.dh(p.max) + ' (annuité ' + F.dh(p.annuite) + ')'); });
    var fc = E.evalFaciliteCaisse(cur, config); L.push('- Facilité de caisse : ' + fc.verdict + ' — max ~' + F.dh(fc.max) + ' (' + fc.base + ').');
    var le = E.evalLeasing(cur, config); L.push('- Leasing : ' + le.verdict + ' — enveloppe ~' + F.dh(le.max) + '.');
    var af = E.evalAffacturage(cur, config); L.push('- Affacturage : ' + af.verdict + ' — ligne ~' + F.dh(af.max) + (af.reserve ? ' (' + af.reserve + ')' : '') + '.');
    if (state.notes) { L.push('\n## Notes\n' + state.notes); }
    L.push('\n_Outil d\'aide à la décision — non engageant. Méthode CGNC + CPC/ESG._');
    return L.join('\n');
  }
  function download(name, text, type) {
    var blob = new Blob([type === 'doc' ? '﻿' + text : text],
      { type: type === 'doc' ? 'application/msword' : (type || 'text/plain;charset=utf-8') });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }

  // ---------------- Export Word (.doc) ----------------
  var GREENH = '#1B3A28', GOLDH = '#C8A440';
  function hesc(t) { return String(t == null ? '' : t).replace(/[&<>]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]; }); }
  function vColor(v) { return v === 'favorable' ? '#2e7d4f' : v === 'reserves' ? '#b8860b' : '#b03a2e'; }
  function vLabel(v) { return ({ favorable: 'FAVORABLE', reserves: 'SOUS RÉSERVES', defavorable: 'DÉFAVORABLE' })[v] || v; }
  function reasonVal(x) {
    return x.fmt === 'pct' ? F.pct(x.value) : x.fmt === 'dh' ? F.dh(x.value) :
      x.fmt === 'annees' ? F.annees(x.value) : x.fmt === 'x' ? F.ratio(x.value) + '×' : F.ratio(x.value);
  }
  function reasonsUL(rs) {
    return '<ul>' + rs.map(function (x) {
      var okk = x.level ? x.level === 'ok' : x.ok;
      var mark = okk ? '✓' : (x.level === 'hard' ? '✗' : '!');
      return '<li>' + mark + ' ' + hesc(x.label) + ' = ' + reasonVal(x) + '</li>';
    }).join('') + '</ul>';
  }
  function secT(t) { return "<h2 style='color:" + GREENH + ";font-family:Georgia,serif;border-bottom:2px solid " + GOLDH + ";padding-bottom:3px'>" + hesc(t) + "</h2>"; }
  function verdictH(ligne, verdict, amountText, bulletsHtml) {
    return "<h3 style='color:" + GREENH + ";margin-bottom:2px'>" + hesc(ligne) +
      " — <span style='color:" + vColor(verdict) + "'>" + vLabel(verdict) + "</span></h3>" +
      "<p style='margin:2px 0'>" + amountText + "</p>" + (bulletsHtml || '');
  }
  function buildReportHTML() {
    var cur = ref(), prev = prevRef(); if (!cur) return '';
    var r = cur.r, pr = prev ? prev.r : null, syn = E.buildSynthese(results, config);
    var dt = new Date();
    var dateStr = dt.toLocaleDateString('fr-FR') + ' ' + dt.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    var o = [];
    o.push("<h1 style='color:" + GREENH + ";font-family:Georgia,serif;margin-bottom:2px'>Étude de faisabilité crédit — " + hesc(state.societe || 'Société') + "</h1>");
    o.push("<p style='color:#555;margin-top:0'>Exercice " + hesc(cur.annee) + (prev ? " (vs " + hesc(prev.annee) + ")" : "") +
      " · Solidité structurelle <b>" + E.scoreSante(cur, config, prev) + "/100</b> · Édité le " + hesc(dateStr) + "</p>");
    // KPI résumé
    o.push("<p><b>Chiffre d'affaires</b> " + F.dh(cur.input.ca) + (r.croissanceCA != null ? " (" + F.signePct(r.croissanceCA) + ")" : "") +
      " &nbsp;·&nbsp; <b>EBITDA</b> " + F.dh(r.EBITDA) + " (marge " + F.pct(r.margeEbitda) + ")" +
      " &nbsp;·&nbsp; <b>CAF</b> " + F.dh(r.caf) + " &nbsp;·&nbsp; <b>FDR</b> " + F.dh(r.FDR) +
      " &nbsp;·&nbsp; <b>BFR</b> " + F.dh(r.BFR) + " &nbsp;·&nbsp; <b>Trésorerie nette</b> " + F.dh(r.TN) + "</p>");
    // Synthèse
    o.push(secT('Synthèse'));
    o.push("<p><b>Points forts</b></p><ul>" + (syn.forces.map(function (x) { return '<li>' + hesc(x) + '</li>'; }).join('') || '<li>—</li>') + "</ul>");
    o.push("<p><b>Points à surveiller</b></p><ul>" + ((syn.vigilances.length ? syn.vigilances : ['Aucun']).map(function (x) { return '<li>' + hesc(x) + '</li>'; }).join('')) + "</ul>");
    // Ratios
    o.push(secT('Batterie de ratios'));
    var y1 = cur.annee, y0 = prev ? prev.annee : 'N-1';
    ratioDefs(config).forEach(function (g) {
      o.push("<h3 style='color:" + GREENH + "'>" + hesc(g[0]) + "</h3>");
      o.push("<table border='1' cellspacing='0' cellpadding='5' style='border-collapse:collapse;width:100%;font-size:10pt'>");
      o.push("<tr style='background:" + GREENH + ";color:#fff'><td><b>Ratio</b></td><td><b>Formule</b></td><td align='right'><b>" + hesc(y1) + "</b></td><td align='right'><b>" + hesc(y0) + "</b></td><td><b>Norme</b></td><td><b>Statut</b></td><td><b>Lecture</b></td></tr>");
      g[1].forEach(function (dd) {
        var v1 = r[dd[0]], v0 = pr ? pr[dd[0]] : null, lv = level(v1, dd[4], dd[5], dd[6]);
        var norme = dd[4] == null ? '—' : (dd[6] === 'high' ? '≥ ' : '≤ ') + fval(dd[4], dd[2] === 'spct' ? 'pct' : dd[2]);
        var statut = lv ? ({ ok: 'Conforme', soft: 'À surveiller', hard: 'Hors norme' })[lv] : '—';
        var col = lv === 'ok' ? '#2e7d4f' : lv === 'soft' ? '#b8860b' : lv === 'hard' ? '#b03a2e' : '#555';
        o.push("<tr><td>" + hesc(dd[1]) + "</td><td style='color:#666'>" + hesc(dd[3]) + "</td><td align='right'><b>" + fval(v1, dd[2]) +
          "</b></td><td align='right' style='color:#888'>" + fval(v0, dd[2]) + "</td><td>" + norme + "</td><td style='color:" + col + "'><b>" + statut +
          "</b></td><td style='color:#666'>" + hesc(dd[7]) + "</td></tr>");
      });
      o.push("</table><p style='font-size:4pt'>&nbsp;</p>");
    });
    // Éligibilité
    o.push(secT('Éligibilité par ligne de crédit'));
    o.push("<p style='color:#555'>Étude de faisabilité financière — garanties supposées déjà prises.</p>");
    var cap = E.termCapacity(cur, config, { taux: config.tauxDefaut });
    o.push(verdictH('CMT / CLT (crédit à terme)', (cap.CAF > 0 && cap.stockMaxAdd > 0) ? 'favorable' : 'reserves',
      "Capacité additionnelle ~" + F.dh(cap.stockMaxAdd) + " (3×CAF) à " + F.dh(cap.stockMaxAddHard) + " (4×CAF). Dettes/CAF actuel : " + F.annees(cap.detteCafActuel) + ".",
      "<ul>" + cap.parDuree.map(function (p) { return "<li>" + p.duree + " ans → max " + F.dh(p.max) + " (annuité " + F.dh(p.annuite) + ", annuité/CAF " + F.pct(p.annuite / cap.CAF) + ")</li>"; }).join('') + "</ul>"));
    var fc = E.evalFaciliteCaisse(cur, config);
    o.push(verdictH('Facilité de caisse', fc.verdict, "Max ~" + F.dh(fc.max) + " (" + fc.base + "), prudent ~" + F.dh(fc.prudent) + ".", reasonsUL(fc.raisons)));
    var le = E.evalLeasing(cur, config);
    o.push(verdictH('Leasing (crédit-bail)', le.verdict, "Enveloppe ~" + F.dh(le.max) + ". " + hesc(le.note), reasonsUL(le.raisons)));
    var af = E.evalAffacturage(cur, config);
    o.push(verdictH('Affacturage', af.verdict, "Ligne ~" + F.dh(af.max) + " (quotité " + Math.round(af.quotite * 100) + "% des créances clients)." + (af.reserve ? " Réserve : " + hesc(af.reserve) : ""), reasonsUL(af.raisons)));
    // Simulation courante
    var sm = E.num($('simMontant').value), sd = E.num($('simDuree').value), sdf = E.num($('simDiffere').value), st = E.num($('simTaux').value) / 100;
    if (sm) {
      var ev = E.evalCreditTerme(cur, { montant: sm, duree: sd, differe: sdf, taux: st }, config);
      o.push(secT('Simulation CMT / CLT'));
      o.push("<p>" + hesc(ev.ligne + ' de ' + F.dh(sm) + ' sur ' + sd + ' ans (différé ' + sdf + ', taux ' + F.pct(st) + ')') +
        " → <b style='color:" + vColor(ev.verdict) + "'>" + vLabel(ev.verdict) + "</b>. Annuité " + F.dh(ev.annuite) + ". Plafond pour cette durée ≈ " + F.dh(ev.montantMax) + ".</p>");
      o.push(reasonsUL(ev.raisons.map(function (x) { return { label: x.label, value: x.value, fmt: x.fmt, level: x.level }; })));
    }
    // Capacité d'endettement — méthode banque (CDSD actualisé)
    var cdOpts = { duree: E.num($('cdDuree').value), taux: E.num($('cdTaux').value) / 100,
      tauxIS: E.num($('cdIS').value) / 100, croissance: E.num($('cdCroissance').value) / 100,
      invest: E.num($('cdInvest').value), dividendes: E.num($('cdDiv').value) };
    var cdMargeV = $('cdMarge').value.trim(); if (cdMargeV !== '') cdOpts.margeEBE = E.num(cdMargeV) / 100;
    var cd = E.capaciteEndettementCDSD(cur, config, cdOpts);
    o.push(secT('Capacité d\'endettement — méthode banque (' + cd.n + ' ans)'));
    o.push("<p>Cash disponible pour le service de la dette actualisé (après IS, taux " + F.pct(cd.Ri) + ") → <b>capacité totale " + F.dh(cd.capacite) + "</b>, dont <b>" + F.dh(cd.capaciteAdd) + "</b> mobilisables en plus des dettes existantes (" + F.dh(cd.DF) + "). Hypothèses : marge EBE " + F.pct(cd.hyp.margeEBE) + ", croissance " + F.pct(cd.hyp.croissance) + ".</p>");
    o.push("<table border='1' cellspacing='0' cellpadding='5' style='border-collapse:collapse;width:100%;font-size:10pt'><tr style='background:" + GREENH + ";color:#fff'><td><b>Année</b></td><td align='right'><b>CA</b></td><td align='right'><b>EBE</b></td><td align='right'><b>Δ BFR</b></td><td align='right'><b>IS</b></td><td align='right'><b>CDSD</b></td><td align='right'><b>VA</b></td></tr>" +
      cd.rows.map(function (row) { return "<tr><td>n+" + row.t + "</td><td align='right'>" + F.dh(row.ca) + "</td><td align='right'>" + F.dh(row.ebe) + "</td><td align='right'>" + F.dh(row.dbfr) + "</td><td align='right'>" + F.dh(row.is) + "</td><td align='right'><b>" + F.dh(row.cdsd) + "</b></td><td align='right'>" + F.dh(row.va) + "</td></tr>"; }).join('') + "</table>");
    // Notes & documents
    if (state.notes) { o.push(secT('Notes')); o.push("<p style='white-space:pre-wrap'>" + hesc(state.notes) + "</p>"); }
    if (documents.length) { o.push(secT('Documents joints')); o.push("<ul>" + documents.map(function (x) { return '<li>' + hesc(x.name) + '</li>'; }).join('') + "</ul>"); }
    o.push("<p style='color:#999;font-size:9pt;margin-top:18px'>Outil d'aide à la décision — non engageant. Méthode CGNC (modèle normal) + CPC / ESG. Contrôle d'or vérifié : TN = FDR − BFR.</p>");
    return "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>" +
      "<head><meta charset='utf-8'><title>Étude crédit " + hesc(state.societe || '') + "</title></head>" +
      "<body style=\"font-family:Calibri,Arial,sans-serif;font-size:11pt;color:#222\">" + o.join('\n') + "</body></html>";
  }

  // ---------------- Navigation & init ----------------
  function showTab(name) {
    currentTab = name;
    Array.prototype.forEach.call(document.querySelectorAll('.tab'), function (t) { t.classList.toggle('active', t.dataset.tab === name); });
    Array.prototype.forEach.call(document.querySelectorAll('.panel'), function (p) { p.classList.toggle('active', p.id === 'panel-' + name); });
    if (name === 'analyse') renderAnalyse();
    if (name === 'eligibilite') renderEligibilite();
    if (name === 'documents') renderDocuments();
  }
  function toast(msg) { var t = $('toast'); t.textContent = msg; t.classList.add('show'); setTimeout(function () { t.classList.remove('show'); }, 2600); }

  function bind() {
    Array.prototype.forEach.call(document.querySelectorAll('.tab'), function (t) { t.addEventListener('click', function () { showTab(t.dataset.tab); }); });
    $('societe').addEventListener('input', function () { state.societe = this.value; save(); });
    $('notes').addEventListener('input', function () { state.notes = this.value; save(); });
    $('btnAddExercice').addEventListener('click', function () {
      var last = state.exercices[state.exercices.length - 1] || {};
      var y = (parseInt(last.annee, 10) || new Date().getFullYear()) + 1;
      state.exercices.push({ annee: y }); renderDossier(); recompute(); toast('Exercice ajouté');
    });
    $('btnNew').addEventListener('click', function () {
      if (!confirm('Démarrer un dossier vierge ?\n\nPense à exporter l\'analyse en Word avant si tu veux la conserver — elle sera perdue sinon.')) return;
      state = { societe: '', notes: '', exercices: [{ annee: new Date().getFullYear() }] }; documents = [];
      renderDossier(); renderDocuments(); recompute(); showTab('dossier'); toast('Nouveau dossier');
    });
    $('btnExample').addEventListener('click', function () {
      state = clone(window.SAMPLE_V21); renderDossier(); renderDocuments(); recompute(); showTab('analyse'); toast('Exemple V21 chargé');
    });
    $('btnExample2').addEventListener('click', function () {
      state = clone(window.SAMPLE_MAISONDUFIL); renderDossier(); renderDocuments(); recompute(); showTab('analyse'); toast('Exemple Maison du Fil chargé');
    });
    $('btnExport').addEventListener('click', function () {
      if (!ref()) { toast('Aucune analyse à exporter'); return; }
      download((state.societe || 'dossier').replace(/\s+/g, '_') + '_etude_credit.doc', buildReportHTML(), 'doc');
      toast('Analyse exportée (Word)');
    });
    ['simMontant', 'simDuree', 'simDiffere', 'simTaux'].forEach(function (id) { $(id).addEventListener('input', runSimulator); });
    ['cdDuree', 'cdTaux', 'cdIS', 'cdCroissance', 'cdMarge', 'cdInvest', 'cdDiv'].forEach(function (id) { $(id).addEventListener('input', runCDSD); });
    $('chatSend').addEventListener('click', sendChat);
    $('chatInput').addEventListener('keydown', function (e) { if (e.key === 'Enter') sendChat(); });
    // suggestions
    var sugg = ['CMT 800 000 sur 7 ans, différé 1 an, taux 6 % ?', 'Montant max d\'une facilité de caisse ?', 'La société est-elle solide ?', 'Explique le BFR'];
    var sc = $('suggest'); sugg.forEach(function (q) { var b = el('button', null, esc(q)); b.addEventListener('click', function () { $('chatInput').value = q; sendChat(); }); sc.appendChild(b); });
    // documents
    var dz = $('dropzone');
    dz.addEventListener('dragover', function (e) { e.preventDefault(); dz.classList.add('drag'); });
    dz.addEventListener('dragleave', function () { dz.classList.remove('drag'); });
    dz.addEventListener('drop', function (e) { e.preventDefault(); dz.classList.remove('drag'); addFiles(e.dataTransfer.files); });
    $('docInput').addEventListener('change', function () { addFiles(this.files); this.value = ''; });
    // import bilan PDF
    $('pdfInput').addEventListener('change', function () {
      var file = this.files[0]; this.value = ''; if (!file) return;
      $('importMsg').textContent = 'Lecture du PDF…';
      extractPdfText(file).then(function (txt) {
        var fig = extractFigures(txt);
        var found = Object.keys(fig).filter(function (k) { return fig[k] != null; });
        if (!found.length) { $('importMsg').textContent = 'Aucune grandeur reconnue automatiquement — saisis les champs manuellement.'; return; }
        var exo = { annee: (new Date().getFullYear()) }; found.forEach(function (k) { exo[k] = fig[k]; });
        state.exercices.push(exo); renderDossier(); recompute();
        $('importMsg').innerHTML = '<b>Import best-effort :</b> ' + found.length + ' champ(s) détecté(s) (' + found.join(', ') + '). <b>Vérifie chaque valeur</b> et complète le reste.';
        toast('Bilan importé — à vérifier');
      }).catch(function () { $('importMsg').textContent = 'Import PDF indisponible (réseau bloqué pour pdf.js). Saisis les champs manuellement.'; });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    bind(); renderDossier(); renderDocuments(); recompute(); showTab('dossier');
  });
})();
