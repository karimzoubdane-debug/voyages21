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
    return esc(s).replace(/(\d[\d ]*\d|\d)/g, '<span dir="ltr" style="unicode-bidi:isolate">$1</span>');
  }

  // Fusionne l'édition « reconduction » active par-dessus l'ossature (pour la carte).
  function withEdition(slug, base) {
    var st = statusMap[slug];
    var ed = st && st.editions;
    if (!base || !ed || !ed.active) return base;
    var arr = ed.versions || [], ver = null;
    for (var i = 0; i < arr.length; i++) { if (arr[i] && arr[i].id === ed.active) { ver = arr[i]; break; } }
    if (!ver || !ver.data) return base;
    var out = {}, k, d = ver.data;
    for (k in base) out[k] = base[k];
    for (k in d) {
      var val = d[k];
      if (val == null) continue;
      if (typeof val === 'string' && val.trim() === '') continue;
      if (Array.isArray(val) && val.length === 0) continue;
      out[k] = val;
    }
    return out;
  }

  function firstImage(v) {
    // Produits admin : images stockées directement sur le produit
    if (v.images && v.images.length) return v.images[0];
    var rec = media[v.mediaKey] || media[MEDIA_KEY_ALIASES[v.mediaKey]] || {};
    var img = rec.images && rec.images[0] && rec.images[0].url;
    return img || '';
  }

  function badgeHtml(slug) {
    var st = statusMap[slug];
    if (st && st.surDevis) return '<span class="card-badge card-badge--gold">Voyage possible</span>';
    if (!st || !st.badge) return '';
    var color = st.badgeColor || 'danger';
    return '<span class="card-badge card-badge--' + esc(color) + '">' + esc(st.badge) + '</span>';
  }

  function isHidden(slug) {
    var st = statusMap[slug];
    return st && (st.hidden || st.removed);
  }

  function isMarocSejour(slug) {
    return /^maroc-(merzouga|bin-el-ouidane|dakhla)$/.test(slug || '');
  }

  // Produits de la destination courante filtrés depuis le manifeste admin
  function customSlugsForDest() {
    var destTitle = (cfg.title || '').toLowerCase();
    return Object.keys(customProducts).filter(function (slug) {
      var v = customProducts[slug];
      if (!v) return false;
      var tag = (v.tag || '').toLowerCase();
      var dests = v.destinations || [];
      return tag === destTitle
        || dests.some(function (d) { return d.toLowerCase() === destTitle; });
    });
  }

  function card(slug, customData) {
    var v = customData || withEdition(slug, all[slug]);
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
      + badgeHtml(slug)
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

  function priceValue(slug, customData) {
    var v = customData || withEdition(slug, all[slug]) || {};
    var n = parseInt(String(v.price || '').replace(/[^0-9]/g, ''), 10);
    return isNaN(n) ? Infinity : n;
  }

  function sortByPrice(arr) {
    return arr.slice().sort(function (a, b) { return priceValue(a) - priceValue(b); });
  }

  // Rang manuel d'un produit (défini dans Admin Produits). Absent = rangé après,
  // trié par prix comme avant.
  function orderValue(slug) {
    var n = orderMap[slug];
    return (typeof n === 'number' && !isNaN(n)) ? n : Infinity;
  }
  // Tri : d'abord l'ordre manuel (ascendant), puis le prix pour les non-classés.
  function byOrderThenPrice(a, b) {
    var oa = orderValue(a.slug), ob = orderValue(b.slug);
    if (oa !== ob) return oa - ob;
    return a.price - b.price;
  }

  function renderGrid(items, extraCustom) {
    var extraCustom = extraCustom || [];
    var existingCards = items
      .filter(function (s) { return !isHidden(s); })
      .map(function (s) { return { slug: s, price: priceValue(s), html: card(s) }; })
      .filter(function (x) { return x.html; });

    var customCards = extraCustom
      .filter(function (s) { return !isHidden(s); })
      .map(function (s) { return { slug: s, price: priceValue(s, customProducts[s]), html: card(s, customProducts[s]) }; })
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
      cfg.groups.forEach(function (g, i) {
        var active = i === 0;
        var cls = 'dest-tab' + (active ? ' active' : '') + (g.accent === 'red' ? ' is-alert' : '');
        nav += '<button class="' + cls + '" type="button" data-dest-tab="'
          + esc(g.id) + '" aria-selected="' + (active ? 'true' : 'false') + '">' + esc(g.label) + '</button>';
        // Répartit les produits custom entre groupes si leur slug commence par l'id du groupe
        var groupCustom = extraCustom.filter(function (s) {
          var v = customProducts[s] || {};
          return (v.groupId || '') === g.id;
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

  // Chargement parallèle : médias + produits admin
  Promise.all([
    fetch('/api/media', { cache: 'no-store' }).then(function (r) { return r.ok ? r.json() : {}; }).catch(function () { return {}; }),
    fetch('/api/produits', { cache: 'no-store' }).then(function (r) { return r.ok ? r.json() : {}; }).catch(function () { return {}; })
  ]).then(function (results) {
    media = results[0] || {};
    var manifest = results[1] || {};
    customProducts = manifest.custom || {};
    statusMap = manifest.status || {};
    orderMap = manifest.order || {};
    groupOrderMap = manifest.groupOrder || {};
    render();
  }).catch(render);
})();
