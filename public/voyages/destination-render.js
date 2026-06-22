(function () {
  var cfg = window.DESTINATION_PAGE || {};
  var app = document.getElementById('destinationApp');
  if (!app) return;

  var slugs = cfg.slugs || [];
  var all = window.VOYAGES || {};
  var media = {};
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

  function firstImage(v) {
    var rec = media[v.mediaKey] || media[MEDIA_KEY_ALIASES[v.mediaKey]] || {};
    var img = rec.images && rec.images[0] && rec.images[0].url;
    return img || '';
  }

  function isMarocSejour(slug) {
    return /^maroc-(merzouga|bin-el-ouidane|dakhla)$/.test(slug || '');
  }

  function renderGrid(items) {
    var cards = items.map(card).filter(Boolean).join('');
    return cards ? '<section class="grid">' + cards + '</section>' : '<p class="empty">Aucun voyage publié pour cette destination.</p>';
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
    // Permet d'arriver directement sur le bon onglet via l'ancre d'URL
    // (ex. croisieres.html#schengen / #sans-schengen depuis le menu).
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

  function card(slug) {
    var v = all[slug];
    if (!v) return '';
    var img = firstImage(v);
    var style = img ? "background-image:url('" + esc(img) + "')" : '';
    var intro = (v.intro && v.intro[0]) || (v.cta && v.cta.text) || '';
    return '<article class="card">'
      + '<div class="media" style="' + style + '"></div>'
      + '<div class="body">'
      + '<div class="tag">' + esc(v.tag || cfg.title) + '</div>'
      + '<h2 class="title">' + esc(v.title) + '</h2>'
      + (v.duration ? '<div class="meta">' + bidiNum(v.duration) + '</div>' : '')
      + (v.price ? '<div class="card-price">' + bidiNum((v.pricePrefix ? v.pricePrefix + ' ' : '') + v.price) + '</div>' : '')
      + '<p class="excerpt">' + esc(intro) + '</p>'
      + '<a class="more" href="../' + esc(slug) + '.html">Voir plus</a>'
      + '</div>'
      + '</article>';
  }

  function priceValue(slug) {
    var v = all[slug] || {};
    // Tous les prix sont en DH : on ne garde que les chiffres pour comparer.
    var n = parseInt(String(v.price || '').replace(/[^0-9]/g, ''), 10);
    return isNaN(n) ? Infinity : n; // voyages sans prix affiche : classes en dernier
  }
  function sortByPrice(arr) {
    return arr.slice().sort(function (a, b) { return priceValue(a) - priceValue(b); });
  }

  // Onglets generiques definis par la page (ex. croisieres avec/sans visa Schengen)
  function renderGroups(groups) {
    var nav = '<nav class="dest-tabs" aria-label="Catégories">';
    var panels = '';
    groups.forEach(function (g, i) {
      var active = i === 0;
      var cls = 'dest-tab' + (active ? ' active' : '') + (g.accent === 'red' ? ' is-alert' : '');
      nav += '<button class="' + cls + '" type="button" data-dest-tab="'
        + esc(g.id) + '" aria-selected="' + (active ? 'true' : 'false') + '">' + esc(g.label) + '</button>';
      panels += '<section data-dest-panel="' + esc(g.id) + '"' + (active ? '' : ' hidden') + '>'
        + renderGrid(sortByPrice(g.slugs || [])) + '</section>';
    });
    return nav + '</nav>' + panels;
  }

  function render() {
    var content;
    if (cfg.groups && cfg.groups.length) {
      content = renderGroups(cfg.groups);
    } else {
      var isMaroc = (cfg.title || '').toLowerCase().indexOf('maroc') !== -1;
      var sejours = sortByPrice(slugs.filter(isMarocSejour));
      var circuits = sortByPrice(slugs.filter(function (slug) { return !isMarocSejour(slug); }));
      content = renderGrid(sortByPrice(slugs));
      if (isMaroc && sejours.length && circuits.length) {
        content = '<nav class="dest-tabs" aria-label="Catégories Maroc">'
          + '<button class="dest-tab active" type="button" data-dest-tab="sejours" aria-selected="true">Séjours</button>'
          + '<button class="dest-tab" type="button" data-dest-tab="circuits" aria-selected="false">Circuits</button>'
          + '</nav>'
          + '<section data-dest-panel="sejours">' + renderGrid(sejours) + '</section>'
          + '<section data-dest-panel="circuits" hidden>' + renderGrid(circuits) + '</section>';
      }
    }
    app.innerHTML = '<div class="topbar"><div class="topbar-inner">'
      + '<a href="/design/homepage-v2-luxe.html">‹ Retour à l’accueil</a>'
      + '<span class="brand">VOYAGES 21</span>'
      + '</div></div>'
      + '<main class="page">'
      + '<section class="hero">'
      + '<div><div class="eyebrow">Destination</div>'
      + '<h1>' + esc(cfg.title) + '</h1>'
      + '<p>' + esc(cfg.description || 'Découvrez les voyages disponibles pour cette destination, puis ouvrez la fiche détaillée du programme qui vous intéresse.') + '</p></div>'
      + '<aside class="summary"><b>' + slugs.length + '</b><span>' + esc(String(cfg.countLabel || 'programmes disponibles').replace(/^\s*\d+\s*/, '')) + '</span></aside>'
      + '</section>'
      + content
      + '</main>';
    wireTabs();
    activateHashTab();
    loadSocialContactBar();
  }

  fetch('/api/media', { cache: 'no-store' })
    .then(function (r) { return r.ok ? r.json() : {}; })
    .then(function (m) { media = m || {}; render(); })
    .catch(render);
})();
