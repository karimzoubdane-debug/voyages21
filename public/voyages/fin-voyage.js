/* Voyages21 — date de fin d'un voyage et statut « SOLDÉ » (expiré).
   Partagé par les pages destination, les fiches voyage et l'Admin Produits.
   Un voyage dont la date de fin écrite est passée est « soldé » : il reste en ligne
   avec un badge SOLDÉ qui clignote, rangé après les voyages en cours ; c'est l'équipe
   qui décide ensuite de le supprimer, de le mettre en corbeille ou de le mettre à jour
   (choix de Karim, 04/11/2026 — Omra comprises, plus aucune corbeille automatique).
   Sans année écrite, on ne peut pas savoir : le voyage n'est pas soldé. */
(function (root) {
  // ── Fin d'un voyage (date après laquelle il est « passé ») ──
  var FIN_MOIS = {
    'janvier':1,'janv':1,'février':2,'fevrier':2,'févr':2,'fevr':2,'mars':3,'avril':4,'avr':4,'mai':5,'juin':6,
    'juillet':7,'juil':7,'août':8,'aout':8,'aôut':8,'septembre':9,'sept':9,'octobre':10,'oct':10,'novembre':11,'nov':11,
    'décembre':12,'decembre':12,'déc':12,'dec':12,
    'january':1,'february':2,'march':3,'april':4,'may':5,'june':6,'july':7,'august':8,'september':9,'october':10,'december':12,
    'يناير':1,'فبراير':2,'مارس':3,'أبريل':4,'ابريل':4,'إبريل':4,'ماي':5,'مايو':5,'يونيو':6,'يونيه':6,'يوليوز':7,'يوليو':7,'يوليه':7,
    'غشت':8,'أغسطس':8,'اغسطس':8,'شتنبر':9,'سبتمبر':9,'أكتوبر':10,'اكتوبر':10,'نونبر':11,'نوفمبر':11,'دجنبر':12,'ديسمبر':12
  };
  var FIN_MOIS_RX = Object.keys(FIN_MOIS).sort(function(a, b) { return b.length - a.length; }).join('|');
  var FIN_JOUR_MOIS = new RegExp('(?<!\\d)(\\d{1,2})(?:er)?\\s*(?:(?:[-–—→←]|au|à|to|إلى|الى)\\s*(\\d{1,2})(?:er)?\\s*)?(' + FIN_MOIS_RX + ')(?![\\p{L}])\\.?(?:\\s*(20\\d\\d)(?!\\d))?', 'giu');
  var FIN_NUM = /(?<!\d)(\d{1,2})\/(\d{1,2})(?:\/(20\d\d))?(?![\d\/])/g;
  var FIN_MOIS_AN = new RegExp('(?<![\\p{L}])(' + FIN_MOIS_RX + ')(?![\\p{L}])\\.?\\s+(20\\d\\d)(?!\\d)', 'giu');
  var FIN_SAISON = /(printemps|été|ete|summer|spring|automne|autumn|fall|hiver|winter)\s+(?:d[e'’]\s*)?(20\d\d)(?:\s*[-\/–]\s*(20\d\d))?/gi;
  var FIN_SAISON_FIN = { printemps:[6,20], spring:[6,20], 'été':[9,22], ete:[9,22], summer:[9,22], automne:[12,20], autumn:[12,20], fall:[12,20], hiver:[3,20], winter:[3,20] };
  var FIN_AN = /(?<!\d)(20\d\d)(?!\d)/g;
  // Phrases qui annoncent d'autres départs : la date la plus tardive écrite n'est pas la fin.
  var FIN_OUVERT = /autres dates|selon calendrier|à la demande|a la demande|sur demande|chaque jour|tous les jours|toute l['’]année|à partir de|a partir de|dès |on request|all year|every day/i;

  function finIso(y, m, d) {
    var dt = new Date(Date.UTC(+y, +m - 1, +d));
    if (dt.getUTCMonth() !== +m - 1 || dt.getUTCDate() !== +d) return '';
    return dt.toISOString().slice(0, 10);
  }
  function finDuMois(y, m) { return new Date(Date.UTC(+y, +m, 0)).toISOString().slice(0, 10); }
  function maxIso(list) { return list.reduce(function(a, b) { return b > a ? b : a; }, ''); }
  function yearsIn(s) { var out = [], m; FIN_AN.lastIndex = 0; while ((m = FIN_AN.exec(s))) out.push(+m[1]); return out; }

  // Renvoie { fin: 'AAAA-MM-JJ', base: 'jour'|'mois'|'année' } ou { fin: '', raison } si on ne peut pas savoir.
  function tripEnd(v) {
    v = v || {};
    var dl = Array.isArray(v.datesList) ? v.datesList.map(String) : (v.datesList ? [String(v.datesList)] : []);
    var d = v.dates || {};
    var textes = [d.line || '', d.note || '', v.eyebrow || '', v.title || ''].map(String);
    var tout = dl.concat(textes).join(' · ');
    var anContexte = Math.max.apply(null, [0].concat(yearsIn(tout)));
    if (!anContexte) return { fin: '', raison: 'aucune année écrite' };

    if (FIN_OUVERT.test(tout)) {
      var ans = yearsIn(tout);
      return { fin: finIso(Math.max.apply(null, ans), 12, 31), base: 'année', ouvert: true };
    }
    var jours = [], m;
    dl.concat(textes).forEach(function(s) {
      var anLigne = Math.max.apply(null, [0].concat(yearsIn(s))) || anContexte;
      FIN_JOUR_MOIS.lastIndex = 0;
      while ((m = FIN_JOUR_MOIS.exec(s))) {
        var mois = FIN_MOIS[m[3].toLowerCase()], an = m[4] || anLigne;
        [m[1], m[2]].forEach(function(j) { if (j) { var x = finIso(an, mois, j); if (x) jours.push(x); } });
      }
      FIN_NUM.lastIndex = 0;
      while ((m = FIN_NUM.exec(s))) { var y = finIso(m[3] || anLigne, m[2], m[1]); if (y) jours.push(y); }
    });
    if (jours.length) return { fin: maxIso(jours), base: 'jour' };

    var mois2 = [];
    FIN_MOIS_AN.lastIndex = 0;
    while ((m = FIN_MOIS_AN.exec(tout))) mois2.push(finDuMois(m[2], FIN_MOIS[m[1].toLowerCase()]));
    FIN_SAISON.lastIndex = 0;
    while ((m = FIN_SAISON.exec(tout))) {
      var f = FIN_SAISON_FIN[m[1].toLowerCase()];
      mois2.push(finIso(m[3] || m[2], f[0], f[1]));
    }
    if (mois2.length) return { fin: maxIso(mois2), base: 'mois' };
    return { fin: finIso(anContexte, 12, 31), base: 'année' };
  }

  function todayCasa() {
    return new Date().toLocaleDateString('en-CA', { timeZone: 'Africa/Casablanca' });
  }
  // Voyage soldé : date de fin passée (avant aujourd'hui, heure du Maroc), ou badge
  // « SOLDÉ » posé à la main dans l'Admin Produits. Une fiche « Sur devis » n'a plus
  // de date proposée au client : elle n'est pas soldée.
  function soldeInfo(v, st, today) {
    st = st || {};
    if (st.surDevis) return { solde: false };
    var manuel = /^sold[ée]$/i.test(String(st.badge || '').trim());
    var r = tripEnd(v);
    var expire = !!r.fin && r.fin < (today || todayCasa());
    return { solde: manuel || expire, manuel: manuel, expire: expire, fin: r.fin || '', base: r.base || '' };
  }

  root.V21Fin = { tripEnd: tripEnd, soldeInfo: soldeInfo, todayCasa: todayCasa, finIso: finIso };
})(typeof window !== 'undefined' ? window : globalThis);
