(function () {
  var cfg = window.DESTINATION_PAGE || {};
  var app = document.getElementById('destinationApp');
  if (!app) return;

  var slugs = cfg.slugs || [];
  var all = window.VOYAGES || {};
  var media = {};
  var customProducts = {};  // produits ajoutés via admin-produits
  var statusMap = {};       // overrides de statut (soldé, places, masqué)
  var orderMap = {};        // rang d'affichage manuel par slug (Admin Produits)
  var groupOrderMap = {};   // ordre des cadrans par destination (Admin Produits)
  var overridesMap = {};    // corrections d'un voyage « en dur » saisies dans l'admin
  // Clé stable de la destination (ex. /voyages/destinations/omra.html -> "omra").
  var destKey = (location.pathname.split('/').pop() || '').replace(/\.html?$/, '');

  var MEDIA_KEY_ALIASES = {
    'modal-omra': 'modal-omra-mouharram',
    'modal-omra-06': 'modal-omra-06-juillet',
    'modal-omra-08': 'modal-omra-08-juillet',
    'modal-omra-01': 'modal-omra-01-juillet'
  };

  document.title = (cfg.title || 'Destination') + ' — Voyages21';

  function esc(s) {
    return String(s || '').replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function bidiNum(s) {
    // « 19,900 » ou « 19.900 » : la virgule/le point des milliers restent dans le nombre
    // (sinon, en arabe, « 19 » et « 900 » s'affichent séparés et inversés : « 900,19 »).
    return esc(s).replace(/(\d(?:[\d ]|[,.](?=\d{3}))*\d|\d)/g, '<span dir="ltr" style="unicode-bidi:isolate">$1</span>');
  }

  // Fiche d'un voyage telle que la montre sa page : data.js + corrections de l'admin.
  function tripData(slug, customData) {
    if (customData) return customData;
    var base = all[slug];
    var corr = overridesMap[slug];
    if (!base || !corr) return base;
    var v = {};
    Object.keys(base).forEach(function (k) { v[k] = base[k]; });
    Object.keys(corr).forEach(function (k) { if (k !== 'updatedAt') v[k] = corr[k]; });
    return v;
  }

  // Voyage soldé : date de fin passée (ou badge « SOLDÉ » posé dans l'admin). Il reste
  // en ligne, badge SOLDÉ clignotant, rangé après les voyages en cours (Karim, 04/11/2026).
  function isSolde(slug, customData) {
    var F = window.V21Fin;
    if (!F) return /^sold[ée]$/i.test(String((statusMap[slug] || {}).badge || '').trim());
    return F.soldeInfo(tripData(slug, customData) || {}, statusMap[slug]).solde;
  }

  function firstImage(v) {
    // Produits admin : images stockées directement sur le produit
    if (v.images && v.images.length) return v.images[0];
    var rec = media[v.mediaKey] || media[MEDIA_KEY_ALIASES[v.mediaKey]] || {};
    var img = rec.images && rec.images[0] && rec.images[0].url;
    return img || '';
  }

  function badgeHtml(slug, customData) {
    var st = statusMap[slug];
    if (isSolde(slug, customData)) return '<span class="card-badge card-badge--solde">SOLDÉ</span>';
    if (st && st.surDevis) return '<span class="card-badge card-badge--gold">Voyage possible</span>';
    if (!st || !st.badge) return '';
    var color = st.badgeColor || 'danger';
    return '<span class="card-badge card-badge--' + esc(color) + '">' + esc(st.badge) + '</span>';
  }

  function isHidden(slug) {
    var st = statusMap[slug];
    if (st && (st.hidden || st.removed)) return true;
    // Prescrit : 7 jours après sa date de fin, le voyage n'est plus montré (Karim, 07/11/2026)
    var F = window.V21Fin;
    if (!F) return false;
    var v = tripData(slug, customProducts[slug]);
    return !!v && F.prescritInfo(v, st).aSupprimer;
  }

  function isMarocSejour(slug) {
    return /^maroc-(merzouga|bin-el-ouidane|dakhla)$/.test(slug || '');
  }

  // Produits de la destination courante filtrés depuis le manifeste admin.
  // La page accepte son titre (« Omra & Hajj ») mais aussi les libellés déclarés
  // dans cfg.tags : l'Admin Produits range les Omra sous « عمرة », qui ne
  // ressemble pas au titre de la page — sans cet alias, ces fiches n'apparaissent
  // sur aucune page du site.
  function destNames() {
    return [cfg.title].concat(cfg.tags || [])
      .filter(Boolean)
      .map(function (n) { return String(n).toLowerCase(); });
  }

  function customSlugsForDest() {
    var names = destNames();
    return Object.keys(customProducts).filter(function (slug) {
      var v = customProducts[slug];
      if (!v) return false;
      var tag = (v.tag || '').toLowerCase();
      var dests = v.destinations || [];
      return names.indexOf(tag) !== -1
        || dests.some(function (d) { return names.indexOf(String(d).toLowerCase()) !== -1; });
    });
  }

  function card(slug, customData) {
    var v = tripData(slug, customData);
    if (!v) return '';
    if (isHidden(slug)) return '';

    var img = firstImage(v);
    var style = img ? "background-image:url('" + esc(img) + "')" : '';
    var intro = (v.intro && (Array.isArray(v.intro) ? v.intro[0] : v.intro)) || (v.cta && v.cta.text) || '';
    var link = customData
      ? '../voyage-admin.html?slug=' + encodeURIComponent(slug)
      : '../' + esc(slug) + '.html';

    return '<article class="card">'
      + '<div class="media" style="' + style + '">'
      + badgeHtml(slug, customData)
      + '</div>'
      + '<div class="body">'
      + '<div class="tag">' + esc(v.tag || cfg.title) + '</div>'
      + '<h2 class="title">' + esc(v.title) + '</h2>'
      + (v.duration ? '<div class="meta">' + bidiNum(v.duration) + '</div>' : '')
      + ((statusMap[slug] && statusMap[slug].surDevis)
          ? '<div class="card-price">Sur devis</div>'
          : (v.price ? '<div class="card-price">' + bidiNum((v.pricePrefix ? v.pricePrefix + ' ' : '') + v.price) + '</div>' : ''))
      + '<p class="excerpt">' + esc(intro) + '</p>'
      + '<a class="more" href="' + link + '">Voir plus</a>'
      + '</div>'
      + '</article>';
  }

  // Prix d'un voyage pour le tri, ou null s'il est « Sur devis » (réglage du statut) ou
  // sans montant. Chiffres arabes acceptés ; on lit le PREMIER montant (« 13 500 », « 15,900 »,
  // « 8.100 ») pour ne pas coller deux prix d'une fourchette.
  function priceValue(slug, customData) {
    if (statusMap[slug] && statusMap[slug].surDevis) return null;
    var v = tripData(slug, customData) || {};
    var t = String(v.price || '').replace(/[٠-٩]/g, function (d) { return String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)); });
    var m = t.match(/\d{1,3}(?:[\s.,\u00a0\u202f]\d{3})+|\d+/);
    return m ? parseInt(m[0].replace(/\D/g, ''), 10) : null;
  }

  // Rang manuel d'un produit (défini dans Admin Produits). Absent = rangé après,
  // trié par prix comme avant.
  function orderValue(slug) {
    var n = orderMap[slug];
    return (typeof n === 'number' && !isNaN(n)) ? n : Infinity;
  }
  // Tri d'une page (Karim, 08/11/2026) : du moins cher au plus cher, les « Sur devis »
  // (ou sans prix) après ceux qui ont un prix ; les soldés à la fin, dans le même ordre.
  // À prix égal, l'ordre choisi dans l'Admin Produits départage.
  function byOrderThenPrice(a, b) {
    if (a.solde !== b.solde) return a.solde ? 1 : -1;
    var da = a.price === null, db = b.price === null;
    if (da !== db) return da ? 1 : -1;
    if (!da && a.price !== b.price) return a.price - b.price;
    var oa = orderValue(a.slug), ob = orderValue(b.slug);
    return oa === ob ? 0 : (oa < ob ? -1 : 1);
  }

  function renderGrid(items, extraCustom) {
    var extraCustom = extraCustom || [];
    var existingCards = items
      .filter(function (s) { return !isHidden(s); })
      .map(function (s) { return { slug: s, price: priceValue(s), solde: isSolde(s), html: card(s) }; })
      .filter(function (x) { return x.html; });

    var customCards = extraCustom
      .filter(function (s) { return !isHidden(s); })
      .map(function (s) { return { slug: s, price: priceValue(s, customProducts[s]), solde: isSolde(s, customProducts[s]), html: card(s, customProducts[s]) }; })
      .filter(function (x) { return x.html; });

    var allCards = existingCards.concat(customCards)
      .sort(byOrderThenPrice)
      .map(function (x) { return x.html; });

    return allCards.length
      ? '<section class="grid">' + allCards.join('') + '</section>'
      : '<p class="empty">Aucun voyage publié pour cette destination.</p>';
  }

  function wireTabs() {
    var tabs = app.querySelectorAll('[data-dest-tab]');
    if (!tabs.length) return;
    Array.prototype.forEach.call(tabs, function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.getAttribute('data-dest-tab');
        Array.prototype.forEach.call(tabs, function (item) {
          var active = item === tab;
          item.classList.toggle('active', active);
          item.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        Array.prototype.forEach.call(app.querySelectorAll('[data-dest-panel]'), function (panel) {
          panel.hidden = panel.getAttribute('data-dest-panel') !== target;
        });
      });
    });
  }

  function activateHashTab() {
    var id = (location.hash || '').replace(/^#/, '').replace(/[^a-z0-9_-]/gi, '');
    if (!id) return;
    var tab = app.querySelector('[data-dest-tab="' + id + '"]');
    if (tab) tab.click();
  }

  function loadSocialContactBar() {
    if (document.querySelector('script[src="/social-contact-bar.js"]')) return;
    var script = document.createElement('script');
    script.src = '/social-contact-bar.js';
    script.defer = true;
    document.body.appendChild(script);
  }

  function render() {
    var extraCustom = customSlugsForDest();
    var visibleExisting = slugs.filter(function (s) { return !isHidden(s); });
    var visibleCustom = extraCustom.filter(function (s) { return !isHidden(s); });
    var totalVisible = visibleExisting.length + visibleCustom.length;

    var content;
    if (cfg.groups && cfg.groups.length) {
      // Ordre des cadrans défini dans l'Admin Produits (sinon ordre d'origine).
      var wanted = groupOrderMap[destKey];
      if (wanted && wanted.length) {
        cfg.groups.sort(function (a, b) {
          var ia = wanted.indexOf(a.id), ib = wanted.indexOf(b.id);
          if (ia === -1) ia = 999; if (ib === -1) ib = 999;
          return ia - ib;
        });
      }
      var nav = '<nav class="dest-tabs" aria-label="Catégories">';
      var panels = '';
      // Les onglets connus de cette page : une fiche de l'Admin Produits qui ne
      // désigne aucun d'eux (groupId absent ou inconnu) tomberait sinon entre les
      // onglets et n'apparaîtrait nulle part — elle rejoint le premier onglet.
      var groupIds = cfg.groups.map(function (g) { return g.id; });
      cfg.groups.forEach(function (g, i) {
        var active = i === 0;
        var cls = 'dest-tab' + (active ? ' active' : '') + (g.accent === 'red' ? ' is-alert' : '');
        nav += '<button class="' + cls + '" type="button" data-dest-tab="'
          + esc(g.id) + '" aria-selected="' + (active ? 'true' : 'false') + '">' + esc(g.label) + '</button>';
        // Répartit les produits custom entre groupes selon leur groupId ; ceux
        // qui n'en ont pas de valide vont dans le premier onglet.
        var groupCustom = extraCustom.filter(function (s) {
          var gid = (customProducts[s] || {}).groupId || '';
          if (groupIds.indexOf(gid) !== -1) return gid === g.id;
          return active;
        });
        // Un groupe peut fournir du HTML libre (g.html) — utile pour un onglet
        // qui pointe vers une page dédiée (ex. Hajj), en plus ou à la place des fiches.
        var groupInner = g.html || '';
        if ((g.slugs && g.slugs.length) || groupCustom.length) {
          groupInner += renderGrid(g.slugs || [], groupCustom);
        }
        panels += '<section data-dest-panel="' + esc(g.id) + '"' + (active ? '' : ' hidden') + '>'
          + groupInner + '</section>';
      });
      content = nav + '</nav>' + panels;
    } else {
      var isMaroc = (cfg.title || '').toLowerCase().indexOf('maroc') !== -1;
      if (isMaroc) {
        var sejours = slugs.filter(isMarocSejour);
        var circuits = slugs.filter(function (s) { return !isMarocSejour(s); });
        if (sejours.length && circuits.length) {
          // Cadrans Séjours / Circuits : ordre pilotable depuis l'Admin Produits
          // (groupOrder['maroc']), par défaut Séjours puis Circuits.
          var pieces = {
            sejours: { tab: 'Séjours', panel: renderGrid(sejours, extraCustom.filter(function(s){ return (customProducts[s]||{}).sejourType==='sejour'; })) },
            circuits: { tab: 'Circuits', panel: renderGrid(circuits, extraCustom.filter(function(s){ return (customProducts[s]||{}).sejourType!=='sejour'; })) }
          };
          var mo = (groupOrderMap[destKey] && groupOrderMap[destKey].length) ? groupOrderMap[destKey] : ['sejours', 'circuits'];
          var ord = mo.filter(function(id){ return pieces[id]; });
          ['sejours', 'circuits'].forEach(function(id){ if (ord.indexOf(id) < 0) ord.push(id); });
          var mnav = '<nav class="dest-tabs" aria-label="Catégories Maroc">';
          var mpanels = '';
          ord.forEach(function(id, i){
            var active = i === 0;
            mnav += '<button class="dest-tab' + (active ? ' active' : '') + '" type="button" data-dest-tab="' + id + '" aria-selected="' + (active ? 'true' : 'false') + '">' + pieces[id].tab + '</button>';
            mpanels += '<section data-dest-panel="' + id + '"' + (active ? '' : ' hidden') + '>' + pieces[id].panel + '</section>';
          });
          content = mnav + '</nav>' + mpanels;
        } else {
          content = renderGrid(slugs, extraCustom);
        }
      } else {
        content = renderGrid(slugs, extraCustom);
      }
    }

    app.innerHTML = '<div class="topbar"><div class="topbar-inner">'
      + '<a href="/design/homepage-v2-luxe.html">‹ Retour à l\'accueil</a>'
      + '<span class="brand">VOYAGES 21</span>'
      + '</div></div>'
      + '<main class="page">'
      + '<section class="hero">'
      + '<div><div class="eyebrow">Destination</div>'
      + '<h1>' + esc(cfg.title) + '</h1>'
      + '<p>' + esc(cfg.description || 'Découvrez les voyages disponibles pour cette destination, puis ouvrez la fiche détaillée du programme qui vous intéresse.') + '</p></div>'
      + '<aside class="summary"><b>' + totalVisible + '</b><span>' + esc(String(cfg.countLabel || 'programmes disponibles').replace(/^\s*\d+\s*/, '')) + '</span></aside>'
      + '</section>'
      + (cfg.featured || '')
      + content
      + '</main>';
    wireTabs();
    activateHashTab();
    loadSocialContactBar();
  }

  // Date de fin des voyages (statut SOLDÉ), partagée avec les fiches et l'admin.
  function loadFin() {
    if (window.V21Fin) return Promise.resolve();
    return new Promise(function (ok) {
      var s = document.createElement('script');
      s.src = '/voyages/fin-voyage.js?v=prescrit-v1';
      s.onload = ok; s.onerror = ok;
      document.head.appendChild(s);
    });
  }

  // Chargement parallèle : médias + produits admin + dates de fin
  Promise.all([
    fetch('/api/media', { cache: 'no-store' }).then(function (r) { return r.ok ? r.json() : {}; }).catch(function () { return {}; }),
    fetch('/api/produits', { cache: 'no-store' }).then(function (r) { return r.ok ? r.json() : {}; }).catch(function () { return {}; }),
    loadFin()
  ]).then(function (results) {
    media = results[0] || {};
    var manifest = results[1] || {};
    customProducts = manifest.custom || {};
    statusMap = manifest.status || {};
    orderMap = manifest.order || {};
    groupOrderMap = manifest.groupOrder || {};
    overridesMap = manifest.overrides || {};
    render();
  }).catch(render);
})();
