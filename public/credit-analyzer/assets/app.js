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
    try { localStorage.setItem(LS_KEY, JSON.stringify({ societe: state.societe, exercices: state.exercices, notes: state.notes, renseignements: state.renseignements, traces: state.traces, config: config })); } catch (e) {}
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
    refreshDocPick();
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
    return m;
  }
  // Contexte chiffré transmis à l'analyste IA
  function buildContext() {
    var cur = ref(), prev = prevRef(); if (!cur) return {};
    var r = cur.r, cap = E.termCapacity(cur, config, { taux: config.tauxDefaut });
    var fc = E.evalFaciliteCaisse(cur, config), le = E.evalLeasing(cur, config), af = E.evalAffacturage(cur, config);
    var syn = E.buildSynthese(results, config);
    function r2(x) { return (x == null || !isFinite(x)) ? null : Math.round(x * 100) / 100; }
    function ri(x) { return (x == null || !isFinite(x)) ? null : Math.round(x); }
    var d7 = (cap.parDuree.filter(function (p) { return p.duree === 7; })[0] || {});
    return {
      societe: state.societe, exercice: cur.annee, exercicePrecedent: prev ? prev.annee : null,
      scoreSolidite: E.scoreSante(cur, config, prev),
      masses: { FDR: ri(r.FDR), BFR: ri(r.BFR), TN: ri(r.TN), EBITDA: ri(r.EBITDA), CAF: ri(r.caf), horsBilan: ri(r.horsBilan) },
      ratios: { autonomie: r2(r.autonomie), gearing: r2(r.gearing), netGearing: r2(r.netGearing), detteCaf_annees: r2(r.detteCaf), detteNetteEbitda: r2(r.detteNetteEbitda), dscr: r2(r.dscr), liquiditeGenerale: r2(r.liquiditeGenerale), margeNette: r2(r.margeNette), roe: r2(r.roe), croissanceCA: r2(r.croissanceCA), bfrJoursCA: r2(r.bfrJoursCA), poidsPersonnelVA: r2(r.poidsPersonnel) },
      capaciteEndettement: { detteCafActuel_annees: r2(cap.detteCafActuel), additionnel_3xCAF: ri(cap.stockMaxAdd), additionnel_4xCAF: ri(cap.stockMaxAddHard), max_7ans: ri(d7.max) },
      faciliteCaisse: { verdict: fc.verdict, max: ri(fc.max) },
      leasing: { verdict: le.verdict, max: ri(le.max) },
      affacturage: { verdict: af.verdict, max: ri(af.max), reserve: af.reserve || null },
      forces: syn.forces, vigilances: syn.vigilances, unite: 'DH'
    };
  }
  var convo = [];
  var aiModel = 'claude-sonnet-4-6';
  var AI_ERR = '[[__AI_ERR__]] ';   // marqueur d'erreur en cours de flux (côté serveur)
  function postJSON(url, body) {
    return fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) {
        if (!r.ok || !j.ok) throw new Error(j.error || ('HTTP ' + r.status)); return j; }); });
  }
  // Détecte le marqueur d'erreur dans le texte reçu ; lève une erreur le cas échéant.
  function checkErr(t) {
    var k = t.indexOf(AI_ERR);
    if (k >= 0) { var e = new Error(t.slice(k + AI_ERR.length).trim() || 'flux interrompu'); e.partial = t.slice(0, k); throw e; }
    if (!t) throw new Error('réponse vide');
    return t;
  }
  // Appel chat EN FLUX : lit la réponse token par token et appelle onDelta(texteCumulé).
  function aiAnswer(q, onDelta) {
    return fetch('/api/credit/chat', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: convo, context: buildContext(), notes: state.notes, model: aiModel })
    }).then(function (r) {
      if (!r.ok) return r.json().catch(function () { return {}; }).then(function (j) { throw new Error(j.error || ('HTTP ' + r.status)); });
      if (!r.body || !r.body.getReader) { return r.text().then(checkErr); } // repli navigateur sans flux
      var reader = r.body.getReader(), dec = new TextDecoder(), full = '';
      function pump() {
        return reader.read().then(function (res) {
          if (res.done) return checkErr(full);
          full += dec.decode(res.value, { stream: true });
          if (full.indexOf(AI_ERR) >= 0) return checkErr(full);
          if (onDelta) onDelta(full);
          return pump();
        });
      }
      return pump();
    });
  }
  // Point d'entrée unique : tente l'IA (analyste senior) en flux, repli déterministe.
  function ask(q, onDelta) {
    convo.push({ role: 'user', content: q });
    return aiAnswer(q, onDelta).then(function (t) { convo.push({ role: 'assistant', content: t }); return t; },
      function (e) {
        var det = answer(q);
        convo.push({ role: 'assistant', content: det });
        return det + '\n\n— (réponse du moteur de règles ; IA indisponible : ' + (e.message || e) + ')';
      });
  }
  function sendChat() {
    var inp = $('chatInput'); var q = inp.value.trim(); if (!q) return;
    pushMsg(q, 'user'); inp.value = '';
    var bot = pushMsg('…', 'bot');
    var live = function (partial) { bot.textContent = partial; $('chatLog').scrollTop = $('chatLog').scrollHeight; };
    ask(q, live).then(function (t) { bot.textContent = t; $('chatLog').scrollTop = $('chatLog').scrollHeight; });
  }
  // Champ de discussion présent dans chaque onglet (historisé dans l'Assistant)
  function discussSend(key) {
    var inp = $('discussIn-' + key); if (!inp) return;
    var q = inp.value.trim(); if (!q) return; inp.value = '';
    var box = $('discussAns-' + key), bot = null;
    if (box) { box.appendChild(el('div', 'msg user', esc(q))); bot = el('div', 'msg bot', '…'); box.appendChild(bot); box.scrollTop = box.scrollHeight; }
    pushMsg(q, 'user'); var botMain = pushMsg('…', 'bot');
    var live = function (partial) { if (bot) { bot.textContent = partial; box.scrollTop = box.scrollHeight; } botMain.textContent = partial; };
    ask(q, live).then(function (t) { if (bot) { bot.textContent = t; box.scrollTop = box.scrollHeight; } botMain.textContent = t; });
  }
  // ---------------- Bloc 2 : Veille & marché (IA) ----------------
  // Dernières réponses IA mémorisées pour téléchargement Word « à la demande »
  var lastResearch = '', lastBrief = null, lastSummarize = '', lastSummarizeName = '';
  function refreshDocPick() {
    var sel = $('docPick'); if (!sel) return;
    sel.innerHTML = '<option value="">— choisir un document importé —</option>' +
      documents.map(function (d, i) { return '<option value="' + i + '"' + (d.text ? '' : ' disabled') + '>' + esc(d.name) + (d.text ? '' : ' (texte non extrait)') + '</option>'; }).join('');
  }
  function runResearch() {
    var q = $('researchIn').value.trim(); if (!q) return;
    var out = $('researchOut'); out.style.whiteSpace = 'pre-wrap'; out.textContent = 'Recherche en cours…';
    postJSON('/api/credit/research', { query: q, model: aiModel }).then(function (j) { lastResearch = j.text || ''; out.textContent = j.text || '(vide)'; },
      function (e) { out.textContent = '⚠ ' + (e.message || e); });
  }
  function runBrief() {
    var out = $('briefOut'); out.style.whiteSpace = 'pre-wrap'; out.textContent = 'Génération du brief…';
    postJSON('/api/credit/brief', { focus: $('briefFocus').value.trim(), model: aiModel }).then(function (j) {
      if (j.items && j.items.length) {
        lastBrief = { items: j.items };
        out.style.whiteSpace = 'normal';
        out.innerHTML = j.items.map(function (it) {
          return '<div style="border-left:3px solid var(--gold);padding:6px 12px;margin-bottom:10px;background:#fff;border-radius:8px">' +
            '<b style="color:var(--green)">' + esc(it.titre) + '</b><div class="interp" style="margin-top:4px;white-space:pre-wrap">' + esc(it.description) + '</div></div>';
        }).join('');
      } else { lastBrief = { text: j.text || '' }; out.textContent = j.text || '(vide)'; }
    }, function (e) { out.textContent = '⚠ ' + (e.message || e); });
  }
  function runSummarize() {
    var sel = $('docPick'), paste = $('docPaste').value.trim(), text = paste, name = 'texte collé';
    if (!text && sel && sel.value !== '') { var d = documents[+sel.value]; if (d) { text = d.text || ''; name = d.name; } }
    var out = $('summarizeOut'); out.style.whiteSpace = 'pre-wrap';
    if (!text) { out.textContent = 'Choisis un document (avec texte extrait) ou colle un texte.'; return; }
    out.textContent = 'Résumé en cours…';
    postJSON('/api/credit/summarize', { text: text, name: name, model: aiModel }).then(function (j) { lastSummarize = j.text || ''; lastSummarizeName = name; out.textContent = j.text; },
      function (e) { out.textContent = '⚠ ' + (e.message || e); });
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
    return wordDoc('Étude crédit ' + (state.societe || ''), o.join('\n'));
  }

  // ---------------- Word « à la demande » (Veille & Assistant) ----------------
  // Enveloppe Word commune (namespaces Office) — réutilisée par tous les exports .doc
  function wordDoc(title, bodyHtml) {
    return "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>" +
      "<head><meta charset='utf-8'><title>" + hesc(title) + "</title></head>" +
      "<body style=\"font-family:Calibri,Arial,sans-serif;font-size:11pt;color:#222\">" + bodyHtml + "</body></html>";
  }
  // Markdown léger → HTML (titres, listes, gras, code, liens) pour de jolis .doc
  function mdToWordHTML(text) {
    var lines = String(text == null ? '' : text).split('\n');
    var out = [], inList = false;
    function inline(s) {
      s = hesc(s);
      s = s.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
      s = s.replace(/`([^`]+)`/g, "<span style='font-family:Consolas,monospace'>$1</span>");
      s = s.replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, "<a href='$2'>$1</a>");
      return s;
    }
    function closeList() { if (inList) { out.push('</ul>'); inList = false; } }
    lines.forEach(function (raw) {
      var line = raw.replace(/\s+$/, '');
      var h = line.match(/^(#{1,4})\s+(.*)$/);
      var li = line.match(/^\s*[-*•]\s+(.*)$/);
      if (h) { closeList(); var lv = Math.min(4, h[1].length) + 1; out.push("<h" + lv + " style='color:" + GREENH + ";font-family:Georgia,serif'>" + inline(h[2]) + "</h" + lv + ">"); }
      else if (li) { if (!inList) { out.push('<ul>'); inList = true; } out.push('<li>' + inline(li[1]) + '</li>'); }
      else if (line.trim() === '') { closeList(); }
      else { closeList(); out.push("<p style='margin:5px 0'>" + inline(line) + "</p>"); }
    });
    closeList();
    return out.join('\n');
  }
  // En-tête daté commun aux exports « Veille & marché »
  function veilleWordDoc(title, subtitle, bodyHtml) {
    var dt = new Date();
    var dateStr = dt.toLocaleDateString('fr-FR') + ' ' + dt.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    var head =
      "<h1 style='color:" + GREENH + ";font-family:Georgia,serif;margin-bottom:2px'>" + hesc(title) + "</h1>" +
      "<p style='color:#555;margin-top:0'>" + (subtitle ? hesc(subtitle) + " · " : "") + "Édité le " + hesc(dateStr) + "</p>";
    var foot = "<p style='color:#999;font-size:9pt;margin-top:18px'>Analyseur Crédit — Veille & marché. Informations issues de sources publiques : à recouper et vérifier avant toute décision.</p>";
    return wordDoc(title, head + bodyHtml + foot);
  }
  function dlWord(filename, html) {
    download(filename.replace(/\s+/g, '_'), html, 'doc');
    toast('Téléchargé (Word)');
  }
  function downloadResearch() {
    if (!lastResearch) { toast('Lance d\'abord une recherche'); return; }
    var q = ($('researchIn').value || '').trim();
    dlWord('recherche_marche.doc', veilleWordDoc('Recherche — Veille & marché', q ? 'Requête : ' + q : '', mdToWordHTML(lastResearch)));
  }
  function downloadBrief() {
    if (!lastBrief) { toast('Génère d\'abord le brief'); return; }
    var body;
    if (lastBrief.items && lastBrief.items.length) {
      body = lastBrief.items.map(function (it) {
        return "<h3 style='color:" + GREENH + ";margin-bottom:2px'>" + hesc(it.titre) + "</h3>" +
          "<p style='margin:2px 0 12px;white-space:pre-wrap'>" + hesc(it.description) + "</p>";
      }).join('\n');
    } else { body = mdToWordHTML(lastBrief.text || ''); }
    var foc = ($('briefFocus').value || '').trim();
    dlWord('brief_du_jour.doc', veilleWordDoc('Brief du jour — actualité éco & finance', foc ? 'Focus : ' + foc : 'Maroc & international', body));
  }
  function downloadSummarize() {
    if (!lastSummarize) { toast('Génère d\'abord un résumé'); return; }
    dlWord('resume_document.doc', veilleWordDoc('Résumé de document', lastSummarizeName ? 'Source : ' + lastSummarizeName : '', mdToWordHTML(lastSummarize)));
  }
  function downloadChat() {
    if (!convo.length) { toast('Aucune discussion à télécharger'); return; }
    var body = convo.map(function (m) {
      if (m.role === 'user') return "<p style='margin:14px 0 2px;color:" + GREENH + ";font-weight:700'>❓ " + hesc(m.content) + "</p>";
      return "<div style='margin:0 0 10px;padding-left:10px;border-left:3px solid " + GOLDH + "'>" + mdToWordHTML(m.content) + "</div>";
    }).join('\n');
    dlWord('discussion_analyste.doc', veilleWordDoc('Discussion avec l\'analyste crédit', state.societe ? 'Société : ' + state.societe : '', body));
  }

  // ================= Onglet Note d'analyse & décision =================
  // Champs de renseignement (qualitatifs, TOUS optionnels — jamais bloquants)
  var RENSEIGN = [
    ['Identité', [
      ['formeJuridique', 'Forme juridique (SARL, SA…)'], ['capitalSocial', 'Capital social (DH)'],
      ['dateCreation', 'Date de création (année)'], ['secteur', 'Secteur'], ['region', 'Région'],
      ['objetSocial', "Objet social / description de l'activité", 1]
    ]],
    ['Actionnariat & dirigeants', [['actionnariat', 'Actionnariat / dirigeants (noms, âges, %)', 1]]],
    ['Demande de concours', [
      ['objetConcours', 'Objet du concours (besoin, montant, durée, affectation)', 1],
      ['sourceRemb', 'Source de remboursement']
    ]],
    ['Marché & concentration', [
      ['clientsPrincipaux', 'Principaux clients (+ poids %)'], ['fournisseursPrincipaux', 'Principaux fournisseurs (+ poids %)'],
      ['saisonnalite', 'Saisonnalité']
    ]],
    ['Relations bancaires', [
      ['poolBancaire', 'Pool bancaire'], ['fluxConfies', 'Flux confiés (% du CA / flux mensuel)'],
      ['lignesEnPlace', 'Lignes en place'], ['incidents', 'Incidents (impayés, chèques)'],
      ['cotation', 'Cotation Bank Al-Maghrib'], ['wl', 'Statut Watch List (WL)']
    ]],
    ['Garanties & faits marquants', [
      ['garanties', 'Garanties / sûretés proposées'], ['cautionsDonnees', 'Cautions données (hors-bilan)'],
      ['litiges', 'Litiges / contentieux'], ['faitMarquant', 'Faits marquants', 1],
      ['piecesManquantes', 'Pièces demandées non fournies']
    ]]
  ];
  function renderRenseign() {
    var g = $('renseignGrid'); if (!g) return; g.innerHTML = '';
    var R = state.renseignements || (state.renseignements = {});
    RENSEIGN.forEach(function (grp) {
      var h = el('div', 'rens-grp', esc(grp[0])); h.style.gridColumn = '1/-1'; g.appendChild(h);
      grp[1].forEach(function (f) {
        var key = f[0], lab = f[1], area = f[2];
        var wrap = el('div', 'field'); if (area) wrap.style.gridColumn = '1/-1';
        var val = esc(R[key] == null ? '' : R[key]);
        wrap.innerHTML = '<label>' + esc(lab) + '</label>' +
          (area ? '<textarea data-r="' + key + '" rows="2" style="width:100%;padding:8px 10px;border:1px solid var(--line);border-radius:8px;font:inherit">' + val + '</textarea>'
                : '<input data-r="' + key + '" value="' + val + '">');
        g.appendChild(wrap);
      });
    });
    Array.prototype.forEach.call(g.querySelectorAll('[data-r]'), function (inp) {
      inp.addEventListener('input', function () { (state.renseignements || (state.renseignements = {}))[inp.dataset.r] = inp.value; save(); });
    });
  }

  // Phrase explicative simple par ratio / terme (affichée sous chaque chiffre + Lexique)
  var EXPLAIN = {
    ca: "Ce que l'entreprise a vendu sur l'exercice (chiffre d'affaires).",
    croissanceCA: "Hausse ou baisse des ventes par rapport à l'exercice précédent.",
    margeCommercialeBrute: "Ce qui reste des ventes après avoir payé la marchandise revendue (négoce).",
    margeNette: "Bénéfice final pour 100 DH de ventes (profitabilité).",
    ebe: "Argent dégagé par l'exploitation avant impôts, intérêts et amortissements. S'il est négatif on parle d'IBE.",
    resultatNet: "Bénéfice ou perte final de l'exercice.",
    caf: "Trésorerie récurrente dégagée par l'activité pour rembourser et investir (cash-flow brut, CFBE).",
    cfne: "Ce qui reste de cette trésorerie une fois le cycle (stocks/clients) financé (cash-flow net, CFNE).",
    autonomie: "Part des fonds propres dans le bilan (ER) : plus c'est haut, moins l'entreprise dépend des banques.",
    erElargi: "Même mesure en comptant les comptes courants d'associés comme des fonds propres.",
    cca: "Argent laissé par les associés dans l'entreprise (quasi-fonds propres).",
    gearing: "Dette bancaire pour 1 DH de fonds propres : sous 1, l'endettement est sain.",
    gearingElargi: "Le gearing en intégrant les comptes courants d'associés aux fonds propres.",
    detteNetteEbitda: "Nombre d'années d'EBE nécessaires pour rembourser la dette nette.",
    pbp: "Nombre d'années pour rembourser la dette de financement avec le cash-flow brut (pay-back).",
    dscr: "Nombre de fois où l'EBE couvre le service annuel de la dette.",
    liquiditeGenerale: "Capacité de l'actif à court terme à couvrir les dettes à court terme.",
    FDR: "Matelas de sécurité du haut de bilan (ressources stables − actif immobilisé).",
    BFR: "Argent immobilisé par le cycle : stocks + créances clients − dettes fournisseurs.",
    TN: "Cash réellement disponible (FDR − BFR). Négatif = trésorerie « en rouge ».",
    fdrSurBfr: "Le fonds de roulement couvre-t-il le besoin du cycle (BFR) ?",
    rotationStocks: "Durée moyenne avant que le stock soit vendu.",
    delaiClients: "Temps moyen pour être payé par les clients.",
    delaiFournisseurs: "Temps moyen pour payer les fournisseurs.",
    amortissementAI: "Usure comptable de l'outil de production (proche de 100 % = matériel ancien).",
    endettementGlobal: "Poids de l'ensemble des dettes dans le bilan.",
    roe: "Rendement des fonds propres (résultat net / fonds propres)."
  };

  function ancienneteTxt() {
    var d = (state.renseignements || {}).dateCreation; if (!d) return '';
    var m = String(d).match(/\d{4}/); if (!m) return '';
    return 'créée en ' + m[0] + ' (' + (new Date().getFullYear() - (+m[0])) + " ans d'ancienneté)";
  }
  function nNeg(v, fmt) {
    var s = fval(v, fmt);
    return (v != null && isFinite(v) && v < 0) ? "<b style='color:#b03a2e'>" + s + " (en rouge)</b>" : "<b>" + s + "</b>";
  }
  function nH(t) { return "<h3 style='color:" + GREENH + ";font-family:Georgia,serif;border-bottom:1px solid " + GOLDH + ";padding-bottom:3px;margin:18px 0 6px'>" + hesc(t) + "</h3>"; }
  function nStat(label, val, exKey) {
    var ex = EXPLAIN[exKey] || '';
    return "<div style='margin:7px 0;padding:6px 11px;border-left:3px solid " + GOLDH + ";background:#fbfaf6;border-radius:0 8px 8px 0'>" +
      "<span style='color:" + GREENH + ";font-weight:700'>" + hesc(label) + "</span> : " + val +
      (ex ? "<div style='color:#5a6b60;font-size:12.5px;font-style:italic;margin-top:2px'>" + hesc(ex) + "</div>" : "") + "</div>";
  }
  function rP(txt) { return txt ? "<p style='margin:4px 0'>" + hesc(txt) + "</p>" : ""; }

  // HTML de la note (utilisé à l'écran ET dans l'export Word — styles inline)
  // Note RÉDIGÉE (texte interprétatif par rubriques + appréciation). Les chiffres « parlent ».
  function noteHTML() {
    var cur = ref(), prev = prevRef(); if (!cur) return "<p>Aucun bilan chargé — saisis un dossier dans l'onglet 1.</p>";
    var r = cur.r, pr = prev ? prev.r : null, R = state.renseignements || {}, syn = E.buildSynthese(results, config);
    var score = E.scoreSante(cur, config, prev), num = E.num;
    var ebeNeg = (r.EBITDA != null && r.EBITDA < 0), fpNeg = num(cur.input.capitauxPropres) < 0,
        rnNeg = num(cur.input.resultatNet) < 0, tnNeg = num(r.TN) < 0;
    var dstr = new Date().toLocaleDateString('fr-FR');
    function red(v) { return "<span style='color:#b03a2e;font-weight:700'>" + F.dh(v) + "</span>"; }
    function pp(h) { return "<p style='margin:9px 0;text-align:justify'>" + h + "</p>"; }
    var o = [];
    // En-tête
    o.push("<h1 style='color:" + GREENH + ";font-family:Georgia,serif;margin-bottom:2px'>Note d'analyse — " + hesc(state.societe || 'Société') + "</h1>");
    var sub = [];
    if (R.objetSocial || R.activite) sub.push(hesc(R.objetSocial || R.activite));
    if (R.secteur) sub.push(hesc(R.secteur));
    if (ancienneteTxt()) sub.push(hesc(ancienneteTxt()));
    sub.push('exercice ' + hesc(cur.annee) + (prev ? ' vs ' + hesc(prev.annee) : ''));
    sub.push('solidité <b>' + score + '/100</b> · édité le ' + dstr);
    o.push("<p style='color:#555;margin-top:0'>" + sub.join(' · ') + "</p>");
    if (R.actionnariat) o.push(pp("<b>Actionnariat.</b> " + hesc(R.actionnariat)));
    if (R.objetConcours) o.push(pp("<b>Objet du concours.</b> " + hesc(R.objetConcours) + (R.sourceRemb ? " Source de remboursement : " + hesc(R.sourceRemb) + "." : "")));

    // === Exploitation & rentabilité ===
    o.push(nH('Exploitation & rentabilité'));
    var pa = "Le chiffre d'affaires s'établit à <b>" + F.dh(cur.input.ca) + "</b>";
    if (r.croissanceCA != null) pa += ", " + (r.croissanceCA >= 0.001 ? "en progression de " + F.signePct(r.croissanceCA) : (r.croissanceCA <= -0.001 ? "en recul de " + F.signePct(r.croissanceCA) : "quasi stable")) + " par rapport à l'exercice " + hesc(prev ? prev.annee : 'précédent') + (r.croissanceCA >= 0.03 ? ", traduisant une bonne dynamique commerciale" : (r.croissanceCA < 0 ? ", ce qui traduit un tassement de l'activité" : ", soit une activité globalement stable"));
    pa += ".";
    if (r.margeCommercialeBrute != null) pa += " La marge commerciale brute ressort à " + F.pct(r.margeCommercialeBrute) + ".";
    pa += " L'exploitation dégage " + (ebeNeg ? "une <b>insuffisance</b> brute d'exploitation (IBE) de " + red(r.EBITDA) : "un excédent brut d'exploitation (EBE) de <b>" + F.dh(r.EBITDA) + "</b>") + " (marge " + F.pct(r.margeEbitda) + "), " + (ebeNeg ? "l'activité ne couvrant pas ses charges d'exploitation" : (num(r.margeEbitda) >= 0.08 ? "signe d'une exploitation rentable" : "avec une rentabilité d'exploitation modeste")) + ".";
    o.push(pp(pa));
    o.push(pp("Le résultat net est " + (rnNeg ? "<b>déficitaire</b> à " + red(cur.input.resultatNet) : "bénéficiaire à <b>" + F.dh(cur.input.resultatNet) + "</b>") + " (profitabilité " + F.pct(r.margeNette) + ")" + (pr ? ", contre " + F.dh(prev.input.resultatNet) + " l'exercice précédent" : "") + ". " + (rnNeg ? "L'entreprise détruit de la valeur sur l'exercice." : "La profitabilité " + (num(r.margeNette) >= 0.05 ? "est correcte" : "reste modeste") + ".")));

    // === Assise financière ===
    o.push(nH('Assise financière'));
    var lvAut = level(r.autonomie, config.autonomieMin, config.autonomieMin * 0.8, 'high');
    var ps = "Les fonds propres " + (fpNeg ? "ressortent <b>en rouge</b> à " + red(cur.input.capitauxPropres) : "s'élèvent à <b>" + F.dh(cur.input.capitauxPropres) + "</b>");
    if (r.autonomie != null) ps += ", soit une autonomie financière (ER) de " + F.pct(r.autonomie) + (r.erElargi != null && num(r.cca) > 0 ? " — ER élargi " + F.pct(r.erElargi) + " en intégrant les comptes courants d'associés" : "");
    ps += fpNeg ? ". La structure est fragilisée par les pertes accumulées et dépend des tiers." : (lvAut === 'ok' ? ", ce qui traduit une structure <b>solide</b> et peu dépendante des banques." : (lvAut === 'soft' ? ", une structure correcte mais à conforter." : ", une assise <b>faible</b> et dépendante des créanciers."));
    o.push(pp(ps));
    if (num(r.cca) > 0) o.push(pp("Les associés soutiennent l'affaire via des comptes courants (" + F.dh(r.cca) + "), assimilables à des quasi-fonds propres qui renforcent l'assise."));

    // === Endettement & capacité de remboursement ===
    o.push(nH('Endettement & capacité de remboursement'));
    var DF = num(cur.input.dettesFinancement), pd;
    if (DF <= 0) pd = "L'entreprise ne porte <b>pas d'endettement financier</b> à terme.";
    else {
      var lvG = level(r.gearing, config.gearingMax, config.gearingHard, 'low');
      pd = "Les dettes de financement s'élèvent à <b>" + F.dh(DF) + "</b>" + (r.gearing != null ? " (gearing " + F.ratio(r.gearing) + (r.gearingElargi != null ? ", gearing élargi " + F.ratio(r.gearingElargi) : "") + ")" : "") + ", " + (lvG === 'ok' ? "soit un levier <b>maîtrisé</b>" : (lvG === 'soft' ? "soit un levier à surveiller" : "soit un levier <b>tendu</b>")) + ".";
    }
    var capConf = (r.pbp != null && r.pbp <= config.detteCafMax) || (r.detteNetteEbitda != null && r.detteNetteEbitda <= config.detteNetteEbitdaMax);
    var capBits = [];
    if (r.pbp != null) capBits.push("pay-back de " + F.annees(r.pbp));
    if (r.detteNetteEbitda != null) capBits.push("dette nette/EBE de " + F.ratio(r.detteNetteEbitda) + "×");
    if (capBits.length) pd += " La capacité de remboursement apparaît " + (capConf ? "<b>confortable</b>" : "<b>tendue</b>") + " (" + capBits.join(", ") + ").";
    if (r.dscr != null) pd += " Le service de la dette est " + (r.dscr >= config.dscrMin ? "bien couvert" : (r.dscr < config.dscrHard ? "<b>insuffisamment couvert</b>" : "juste couvert")) + " (EBE/service " + F.ratio(r.dscr) + "×).";
    if (num(r.horsBilan) > 0) pd += " Des engagements hors-bilan (" + F.dh(r.horsBilan) + ") alourdissent l'endettement réel.";
    o.push(pp(pd));

    // === Cycle d'exploitation ===
    o.push(nH("Cycle d'exploitation"));
    var cb = [];
    if (num(cur.input.stocks) > 0 && r.rotationStocks != null) cb.push("des stocks tournant en " + F.jours(r.rotationStocks) + " (" + F.mois(r.stockMois) + ")");
    if (r.delaiClients != null) cb.push("un délai clients de " + F.jours(r.delaiClients));
    if (r.delaiFournisseurs != null) cb.push("un délai fournisseurs de " + F.jours(r.delaiFournisseurs));
    var bfrLourd = (r.bfrJoursCA != null && r.bfrJoursCA > 90);
    o.push(pp("Le cycle d'exploitation " + (cb.length ? "présente " + cb.join(", ") + ". Il en résulte un" : "génère un") + " besoin en fonds de roulement (BFR) de " + (num(r.BFR) < 0 ? red(r.BFR) : "<b>" + F.dh(r.BFR) + "</b>") + (r.bfrJoursCA != null ? " (" + F.jours(r.bfrJoursCA) + " de CA)" : "") + ", " + (num(r.BFR) <= 0 ? "le cycle libère de la trésorerie" : (bfrLourd ? "un cycle <b>lourd</b> à financer" : "un besoin de cycle contenu")) + "."));

    // === Équilibre financier & trésorerie ===
    o.push(nH('Équilibre financier & trésorerie'));
    var pe = "Le fonds de roulement " + (num(r.FDR) < 0 ? "est négatif (" + red(r.FDR) + ")" : "s'élève à <b>" + F.dh(r.FDR) + "</b>");
    if (r.fdrSurBfr != null && num(r.BFR) > 0) pe += " et couvre " + F.pct(r.fdrSurBfr) + " du BFR";
    pe += ", " + (tnNeg ? "laissant une trésorerie nette <b>en rouge</b> de " + red(r.TN) + " : le cycle absorbe le haut de bilan." : "dégageant une trésorerie nette de <b>" + F.dh(r.TN) + "</b>.");
    pe += " Les cash-flows d'exploitation ressortent à " + (num(r.cfbe) < 0 ? red(r.cfbe) : "<b>" + F.dh(r.cfbe) + "</b>") + " (CFBE)" + (r.cfne != null ? ", nets de la variation du BFR à " + (num(r.cfne) < 0 ? red(r.cfne) : F.dh(r.cfne)) + " (CFNE)" + (r.cfne < 0 ? ", en rouge du fait du gonflement du cycle" : "") : "") + ".";
    o.push(pp(pe));

    // === Relations bancaires (si renseigné) ===
    var rels = [];
    if (R.fluxConfies) rels.push("les flux confiés représentent " + hesc(R.fluxConfies));
    if (R.poolBancaire) rels.push("le pool bancaire comprend " + hesc(R.poolBancaire));
    if (R.lignesEnPlace) rels.push("lignes en place : " + hesc(R.lignesEnPlace));
    if (R.incidents) rels.push("incidents relevés : " + hesc(R.incidents));
    if (R.cotation) rels.push("cotation Bank Al-Maghrib : " + hesc(R.cotation));
    if (R.wl) rels.push("statut Watch List : " + hesc(R.wl));
    if (rels.length) { o.push(nH('Relations bancaires')); o.push(pp(rels.join(" ; ").replace(/^./, function (c) { return c.toUpperCase(); }) + ".")); }
    if (R.faitMarquant) o.push(pp("<b>Fait marquant.</b> " + hesc(R.faitMarquant)));

    // === Appréciation d'ensemble (se prononce sur la santé financière) ===
    o.push(nH("Appréciation d'ensemble — santé financière"));
    var santeAdj = score >= 70 ? "confortable" : (score >= 55 ? "acceptable" : (score >= 40 ? "moyenne" : "fragile"));
    var pApp = "Au global, la santé financière de " + hesc(state.societe || "l'entreprise") + " apparaît <b>" + santeAdj + "</b> (solidité structurelle " + score + "/100). ";
    pApp += "L'exploitation est " + (ebeNeg ? "<b>déficitaire</b>" : "bénéficiaire") + " et l'assise financière " + (fpNeg ? "<b>fragilisée</b>" : (lvAut === 'ok' ? "solide" : "perfectible")) + ", ";
    pApp += (num(r.TN) >= 0 ? "avec une trésorerie à l'équilibre" : "avec une trésorerie sous tension") + " et un endettement " + (DF <= 0 ? "nul" : (level(r.gearing, config.gearingMax, config.gearingHard, 'low') === 'ok' ? "maîtrisé" : "à surveiller")) + ". ";
    pApp += (score >= 55 && !ebeNeg && !fpNeg) ? "Le dossier se prête à un accompagnement bancaire, sous réserve du suivi des points ci-dessous." : "En l'état, le dossier appelle des réserves et un suivi rapproché.";
    o.push(pp(pApp));
    if (syn.forces.length) o.push("<p style='margin:6px 0 2px'><b>✓ Points d'appui</b></p><ul>" + syn.forces.map(function (x) { return "<li>" + hesc(x) + "</li>"; }).join('') + "</ul>");
    o.push("<p style='margin:6px 0 2px'><b>⚠ Points de vigilance</b></p><ul>" + ((syn.vigilances.length ? syn.vigilances : ['Aucun point de vigilance majeur.']).map(function (x) { return "<li>" + hesc(x) + "</li>"; }).join('')) + "</ul>");
    if (R.piecesManquantes) o.push(pp("<b>Pièces demandées, non fournies :</b> " + hesc(R.piecesManquantes) + " — à recueillir pour compléter l'analyse."));

    // === Lexique (définitions) ===
    var used = ['ca', 'margeNette', 'ebe', 'caf', 'cfne', 'autonomie', 'erElargi', 'gearing', 'detteNetteEbitda', 'pbp', 'FDR', 'BFR', 'TN', 'fdrSurBfr', 'rotationStocks', 'delaiClients', 'delaiFournisseurs', 'amortissementAI'];
    o.push(nH('Lexique — chaque terme en une phrase'));
    o.push("<ul style='font-size:12.5px;color:#333'>" + used.map(function (k) { return "<li><b>" + hesc(termLabel(k)) + "</b> : " + hesc(EXPLAIN[k]) + "</li>"; }).join('') + "</ul>");
    o.push("<p style='color:#999;font-size:9pt;margin-top:14px'>Note d'analyse — aide à la décision, non engageante. Méthode CGNC (modèle normal) + CPC/ESG/CAF. Contrôle : TN = FDR − BFR.</p>");
    return o.join('\n');
  }
  function termLabel(k) {
    return ({ ca: "Chiffre d'affaires", margeNette: 'Marge nette / profitabilité', ebe: 'EBE / IBE', caf: 'CFBE (cash-flow brut)',
      cfne: 'CFNE (cash-flow net)', autonomie: 'ER (autonomie)', erElargi: 'ER élargi', gearing: 'Gearing',
      detteNetteEbitda: 'Net leverage (dette nette/EBE)', pbp: 'PBP (pay-back)', FDR: 'FDR', BFR: 'BFR', TN: 'Trésorerie nette',
      fdrSurBfr: 'Couverture du BFR', rotationStocks: 'Rotation des stocks', delaiClients: 'Délai clients',
      delaiFournisseurs: 'Délai fournisseurs', amortissementAI: "Amortissement de l'actif" })[k] || k;
  }

  // ---- Décision / Recommandation (bouton séparé) ----
  function recommendLignes(cur) {
    var r = cur.r, R = state.renseignements || {}, out = [];
    var fc = E.evalFaciliteCaisse(cur, config), af = E.evalAffacturage(cur, config);
    var cap = E.termCapacity(cur, config, { taux: config.tauxDefaut });
    var d7 = cap.parDuree.filter(function (x) { return x.duree === 7; })[0] || {};
    var ctx = ((R.objetConcours || '') + ' ' + (R.objetSocial || '') + ' ' + (R.activite || '') + ' ' + (R.clientsPrincipaux || '')).toLowerCase();
    if (E.num(r.BFR) > 0) out.push(['Facilité de caisse', 'Couvre les décalages encaissements/décaissements du cycle (BFR ' + F.dh(r.BFR) + ').', 'jusqu\'à ~' + F.dh(fc.max)]);
    if (E.num(r.rotationStocks) > 90) out.push(['Avance sur marchandises / Refinancement des importations', 'Stocks lourds (' + F.jours(r.rotationStocks) + ') à financer, adossés au nantissement.', 'selon l\'assiette de stock']);
    if (/export/.test(ctx)) out.push(["Préfinancement export / Mobilisation de créances sur l'étranger", "Activité tournée vers l'export : financer le cycle jusqu'à l'encaissement.", 'selon commandes']);
    if (E.num(r.delaiClients) > 75) out.push(['Escompte de papier commercial / Affacturage', 'Délais clients longs (' + F.jours(r.delaiClients) + ') : mobiliser le poste clients.', 'ligne ~' + F.dh(af.max)]);
    if (/march[eé]s? public|adjudicat|ma[iî]tre d.ouvrage/.test(ctx)) out.push(['Avances sur marchés publics nantis + cautions', 'Activité sur marchés publics : avances sur créances nanties et cautions de marché.', 'selon marchés']);
    if (/investiss|acqui|mat[eé]riel|local|extension|cr[eé]ation|modernis/.test(ctx)) out.push(['CMT / CLT ou Crédit-bail', "Besoin d'investissement : financement à terme ou crédit-bail (même enveloppe de capacité).", 'jusqu\'à ~' + F.dh(d7.max) + ' (7 ans)']);
    if (!out.length) out.push(['Ligne à cibler selon le besoin', "Précise l'« Objet du concours » pour cibler la ligne adaptée.", '—']);
    return out;
  }
  function decisionHTML() {
    var cur = ref(), prev = prevRef(); if (!cur) return "<p>Aucun bilan chargé.</p>";
    var r = cur.r, R = state.renseignements || {}, syn = E.buildSynthese(results, config);
    var score = E.scoreSante(cur, config, prev);
    var avis = score >= 60 ? 'favorable' : (score >= 40 ? 'reserves' : 'defavorable');
    var lab = { favorable: 'FAVORABLE', reserves: 'FAVORABLE SOUS RÉSERVES', defavorable: "DÉFAVORABLE EN L'ÉTAT" }[avis];
    var o = [];
    o.push("<h1 style='color:" + GREENH + ";font-family:Georgia,serif'>Décision / Recommandation — " + hesc(state.societe || 'Société') + "</h1>");
    o.push("<p style='margin:2px 0'>Avis : <b style='color:" + vColor(avis) + ";font-size:14pt'>" + lab + "</b> — solidité structurelle " + score + "/100 · exercice " + hesc(cur.annee) + ".</p>");
    o.push(nH('Lignes recommandées'));
    o.push("<ul>" + recommendLignes(cur).map(function (l) { return "<li><b>" + hesc(l[0]) + "</b> — " + hesc(l[1]) + " <i>(" + hesc(l[2]) + ")</i></li>"; }).join('') + "</ul>");
    o.push(nH('Conditions & covenants proposés'));
    o.push("<ul><li>Fonds propres / dette ≥ 100 % sur la durée du concours.</li>" +
      "<li>DSCR ≥ " + config.dscrHard + "× ; gearing ≤ " + config.gearingMax + " ; autonomie ≥ " + Math.round(config.autonomieMin * 100) + " %.</li>" +
      "<li>Domiciliation des flux, negative pledge, reporting annuel des états financiers.</li></ul>");
    o.push(nH('Réserves & charge au gestionnaire'));
    var charges = (syn.vigilances.length ? syn.vigilances.slice() : ['Aucune vigilance majeure.']);
    if (R.piecesManquantes) charges.push('Recueillir les pièces demandées non fournies : ' + R.piecesManquantes + '.');
    if (R.garanties) charges.push('Formaliser / renouveler les garanties : ' + R.garanties + '.');
    if (R.wl) charges.push('Suivre le statut Watch List : ' + R.wl + '.');
    o.push("<ul>" + charges.map(function (x) { return '<li>' + hesc(x) + '</li>'; }).join('') + "</ul>");
    o.push("<p style='color:#999;font-size:9pt;margin-top:14px'>Aide à la décision — non engageante. À statuer en comité.</p>");
    return o.join('\n');
  }

  // ---- Commentaire IA (optionnel, en flux) ----
  var lastCommentaire = '';
  function streamPost(body, onDelta) {
    return fetch('/api/credit/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      .then(function (r) {
        if (!r.ok) return r.json().catch(function () { return {}; }).then(function (j) { throw new Error(j.error || ('HTTP ' + r.status)); });
        if (!r.body || !r.body.getReader) return r.text().then(checkErr);
        var reader = r.body.getReader(), dec = new TextDecoder(), full = '';
        function pump() {
          return reader.read().then(function (res) {
            if (res.done) return checkErr(full);
            full += dec.decode(res.value, { stream: true });
            if (full.indexOf(AI_ERR) >= 0) return checkErr(full);
            if (onDelta) onDelta(full);
            return pump();
          });
        }
        return pump();
      });
  }
  function runCommentaire() {
    var out = $('noteComment'); if (!out) return;
    out.style.whiteSpace = 'pre-wrap'; out.textContent = "Rédaction du commentaire d'analyste…";
    var prompt = "Rédige un COMMENTAIRE d'analyste crédit senior (10 à 15 lignes) sur ce dossier, à partir des chiffres du contexte : " +
      "appréciation de la solidité et des tendances, principaux risques, et une orientation de décision (lignes à privilégier, réserves). " +
      "Style banque marocaine, français, structuré, sans réafficher tous les chiffres.";
    lastCommentaire = '';
    streamPost({ messages: [{ role: 'user', content: prompt }], context: buildContext(), notes: state.notes, model: aiModel }, function (p) { out.textContent = p; })
      .then(function (t) {
        out.textContent = t; lastCommentaire = t;
        addTrace('Commentaire', "Commentaire — " + (state.societe || '') + " (" + hesc(ref() ? ref().annee : '') + ")",
          "<h1 style='color:" + GREENH + "'>Commentaire de l'analyste — " + hesc(state.societe || '') + "</h1><div style='white-space:pre-wrap'>" + hesc(t) + "</div>");
      }, function (e) { out.textContent = '⚠ Commentaire IA indisponible : ' + (e.message || e); });
  }

  // ---- Traces conservées (historique local, supprimables à la demande) ----
  function addTrace(type, titre, html) {
    if (!state.traces) state.traces = [];
    var d = new Date();
    state.traces.unshift({ id: 't' + d.getTime() + '_' + Math.floor(Math.random() * 1e4), date: d.toLocaleString('fr-FR'), societe: state.societe || '', type: type, titre: titre, html: html });
    if (state.traces.length > 60) state.traces = state.traces.slice(0, 60);
    save(); renderTraces();
  }
  function findTrace(id) { var t = state.traces || []; for (var i = 0; i < t.length; i++) if (t[i].id === id) return t[i]; return null; }
  function renderTraces() {
    var box = $('tracesList'); if (!box) return;
    var t = state.traces || [];
    if (!t.length) { box.innerHTML = '<div class="small muted">Aucune trace. Les notes, décisions et commentaires que tu génères ou enregistres sont conservés ici (jusqu\'à suppression).</div>'; return; }
    box.innerHTML = t.map(function (x) {
      return "<div class='trace'><div style='flex:1;min-width:0'><b>" + esc(x.titre) + "</b><div class='small muted'>" + esc(x.type) + " · " + esc(x.date) + "</div></div>" +
        "<button class='btn sm' data-tr-open='" + x.id + "'>Ouvrir</button>" +
        "<button class='btn sm' data-tr-word='" + x.id + "' title='Exporter en Word'>⬇</button>" +
        "<button class='btn sm danger' data-tr-del='" + x.id + "' title='Supprimer'>🗑</button></div>";
    }).join('');
    Array.prototype.forEach.call(box.querySelectorAll('[data-tr-open]'), function (b) { b.addEventListener('click', function () { var x = findTrace(b.dataset.trOpen); if (x && $('noteSheet')) { $('noteSheet').innerHTML = x.html; try { $('noteSheet').scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (e) {} } }); });
    Array.prototype.forEach.call(box.querySelectorAll('[data-tr-word]'), function (b) { b.addEventListener('click', function () { var x = findTrace(b.dataset.trWord); if (x) download((x.titre || 'trace').replace(/\s+/g, '_') + '.doc', wordDoc(x.titre, x.html), 'doc'); }); });
    Array.prototype.forEach.call(box.querySelectorAll('[data-tr-del]'), function (b) { b.addEventListener('click', function () { state.traces = (state.traces || []).filter(function (y) { return y.id !== b.dataset.trDel; }); save(); renderTraces(); toast('Trace supprimée'); }); });
  }
  function clearTraces() { if (window.confirm('Effacer TOUTES les traces conservées ?')) { state.traces = []; save(); renderTraces(); toast('Historique vidé'); } }
  function noteFullHTML() {
    return noteHTML() + (lastCommentaire ? "<h3 style='color:" + GREENH + "'>Commentaire de l'analyste</h3><div style='white-space:pre-wrap'>" + hesc(lastCommentaire) + "</div>" : '');
  }
  function saveNoteTrace() {
    if (!ref()) { toast('Aucune analyse'); return; }
    addTrace("Note d'analyse", "Note — " + (state.societe || '') + " (" + hesc(ref().annee) + ")", noteFullHTML());
    toast("Note enregistrée dans l'historique");
  }

  function renderNote() {
    renderRenseign();
    var s = $('noteSheet'); if (s) s.innerHTML = noteHTML();
    var d = $('decisionOut'); if (d && !d.dataset.done) d.innerHTML = '<p class="muted">Clique « Générer la décision » pour obtenir l\'avis et les lignes recommandées.</p>';
    renderTraces();
  }
  function renderDecision() {
    var d = $('decisionOut'); if (!d) return;
    var html = decisionHTML();
    d.innerHTML = html; d.dataset.done = '1';
    addTrace('Décision', "Décision — " + (state.societe || '') + " (" + hesc(ref() ? ref().annee : '') + ")", html);
  }
  function downloadNote() {
    if (!ref()) { toast('Aucune analyse'); return; }
    download((state.societe || 'dossier').replace(/\s+/g, '_') + '_note_analyse.doc', wordDoc("Note d'analyse — " + (state.societe || ''), noteFullHTML()), 'doc');
    toast('Note exportée (Word)');
  }
  function downloadDecision() {
    if (!ref()) { toast('Aucune analyse'); return; }
    download((state.societe || 'dossier').replace(/\s+/g, '_') + '_decision.doc', wordDoc('Décision — ' + (state.societe || ''), decisionHTML()), 'doc');
    toast('Décision exportée (Word)');
  }
  // ---- Export Word du commentaire d'analyste ----
  function commentaireDocHTML() {
    return "<h1 style='color:" + GREENH + ";font-family:Georgia,serif'>Commentaire de l'analyste — " + hesc(state.societe || '') + "</h1>" +
      "<p style='color:#555'>Exercice " + hesc(ref() ? ref().annee : '') + "</p><div style='white-space:pre-wrap'>" + hesc(lastCommentaire) + "</div>";
  }
  function downloadCommentaire() {
    if (!lastCommentaire) { toast("Génère d'abord le commentaire"); return; }
    download((state.societe || 'dossier').replace(/\s+/g, '_') + '_commentaire.doc', wordDoc('Commentaire — ' + (state.societe || ''), commentaireDocHTML()), 'doc');
    toast('Commentaire exporté (Word)');
  }
  // ---- Champ « Demander une explication » (contextualisée à la société) ----
  var lastExplain = '', lastExplainTerm = '';
  function explainDocHTML(term, text) {
    return "<h1 style='color:" + GREENH + ";font-family:Georgia,serif'>Explication — " + hesc(term) + "</h1>" +
      "<p style='color:#555'>" + hesc(state.societe || '') + (ref() ? " · exercice " + hesc(ref().annee) : '') + "</p>" +
      "<div style='white-space:pre-wrap'>" + hesc(text) + "</div>";
  }
  function runExplain() {
    var inp = $('explainIn'); if (!inp) return;
    var q = inp.value.trim(); if (!q) return;
    var out = $('explainOut'); if (!out) return;
    out.style.whiteSpace = 'pre-wrap'; out.textContent = 'Explication en cours…';
    var prompt = "Explique de façon simple et pédagogique « " + q + " » DANS LE CONTEXTE de cette société. " +
      "Donne : la définition, la formule, la VALEUR chez cette société (utilise les chiffres du contexte fourni) et ce que cela traduit concrètement pour elle (bon / à surveiller / risqué). " +
      "Français, clair, 6 à 10 lignes, sans jargon inutile.";
    lastExplain = ''; lastExplainTerm = q;
    streamPost({ messages: [{ role: 'user', content: prompt }], context: buildContext(), notes: state.notes, model: aiModel }, function (p) { out.textContent = p; })
      .then(function (t) {
        out.textContent = t; lastExplain = t;
        addTrace('Explication', "Explication : " + q.slice(0, 48) + " — " + (state.societe || ''), explainDocHTML(q, t));
      }, function (e) { out.textContent = '⚠ IA indisponible : ' + (e.message || e); });
  }
  function downloadExplain() {
    if (!lastExplain) { toast("Demande d'abord une explication"); return; }
    download('explication_' + (lastExplainTerm || '').replace(/\s+/g, '_').slice(0, 30) + '.doc', wordDoc('Explication — ' + lastExplainTerm, explainDocHTML(lastExplainTerm, lastExplain)), 'doc');
    toast('Explication exportée (Word)');
  }

  // ---------------- Navigation & init ----------------
  function showTab(name) {
    currentTab = name;
    Array.prototype.forEach.call(document.querySelectorAll('.tab'), function (t) { t.classList.toggle('active', t.dataset.tab === name); });
    Array.prototype.forEach.call(document.querySelectorAll('.panel'), function (p) { p.classList.toggle('active', p.id === 'panel-' + name); });
    if (name === 'analyse') renderAnalyse();
    if (name === 'eligibilite') renderEligibilite();
    if (name === 'note') renderNote();
    if (name === 'documents') renderDocuments();
    if (name === 'veille') refreshDocPick();
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
    // Sélecteur de modèle IA (mémorisé)
    var msel = $('aiModel');
    if (msel) {
      var saved = null; try { saved = localStorage.getItem('credit-ai-model'); } catch (e) {}
      if (saved) msel.value = saved;
      aiModel = msel.value;
      msel.addEventListener('change', function () {
        aiModel = msel.value; try { localStorage.setItem('credit-ai-model', aiModel); } catch (e) {}
        toast('Modèle : ' + msel.options[msel.selectedIndex].text.split(' —')[0]);
      });
    }
    // Bloc 2 — Veille & marché
    $('researchBtn').addEventListener('click', runResearch);
    $('researchIn').addEventListener('keydown', function (e) { if (e.key === 'Enter') runResearch(); });
    $('briefBtn').addEventListener('click', runBrief);
    $('summarizeBtn').addEventListener('click', runSummarize);
    // Téléchargements Word « à la demande » des réponses IA
    var dlMap = { researchDl: downloadResearch, briefDl: downloadBrief, summarizeDl: downloadSummarize, chatDl: downloadChat };
    Object.keys(dlMap).forEach(function (id) { var b = $(id); if (b) b.addEventListener('click', dlMap[id]); });
    // Onglet Note d'analyse
    var noteMap = { btnNoteRefresh: renderNote, btnNoteWord: downloadNote, btnNoteSave: saveNoteTrace, btnDecision: renderDecision, btnDecisionWord: downloadDecision, btnCommentaire: runCommentaire, btnCommentaireWord: downloadCommentaire, explainBtn: runExplain, explainWord: downloadExplain, btnTracesClear: clearTraces };
    Object.keys(noteMap).forEach(function (id) { var b = $(id); if (b) b.addEventListener('click', noteMap[id]); });
    var explainIn = $('explainIn'); if (explainIn) explainIn.addEventListener('keydown', function (e) { if (e.key === 'Enter') runExplain(); });
    // champs de discussion par onglet
    Array.prototype.forEach.call(document.querySelectorAll('[data-discuss]'), function (b) {
      var key = b.dataset.discuss;
      b.addEventListener('click', function () { discussSend(key); });
      var inp = $('discussIn-' + key);
      if (inp) inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') discussSend(key); });
    });
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
