(function () {
  var cfg = window.DESTINATION_PAGE || {};
  var app = document.getElementById('destinationApp');
  if (!app) return;

  var slugs = cfg.slugs || [];
  var all = window.VOYAGES || {};
  var media = {};

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
    var rec = media[v.mediaKey] || {};
    var img = rec.images && rec.images[0] && rec.images[0].url;
    return img || '';
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
      + '<div class="meta">' + bidiNum([v.duration, v.price].filter(Boolean).join(' \u00b7 ')) + '</div>'
      + '<p class="excerpt">' + esc(intro) + '</p>'
      + '<a class="more" href="../' + esc(slug) + '.html">Voir plus</a>'
      + '</div>'
      + '</article>';
  }

  function render() {
    var cards = slugs.map(card).filter(Boolean).join('');
    app.innerHTML = '<div class="topbar"><div class="topbar-inner">'
      + '<a href="../../acceuil-v21-maroc.html">‹ Retour à l’accueil</a>'
      + '<a href="../../BROCHURE_VOYAGES21_AVEC_IMAGES_V7.html">Brochure complète</a>'
      + '<span class="brand">VOYAGES 21</span>'
      + '</div></div>'
      + '<main class="page">'
      + '<section class="hero">'
      + '<div><div class="eyebrow">Destination</div>'
      + '<h1>' + esc(cfg.title) + '</h1>'
      + '<p>' + esc(cfg.description || 'Découvrez les voyages disponibles pour cette destination, puis ouvrez la fiche détaillée du programme qui vous intéresse.') + '</p></div>'
      + '<aside class="summary"><b>' + slugs.length + '</b><span>' + esc(cfg.countLabel || 'programmes disponibles') + '</span></aside>'
      + '</section>'
      + (cards ? '<section class="grid">' + cards + '</section>' : '<p class="empty">Aucun voyage publié pour cette destination.</p>')
      + '</main>';
  }

  fetch('/api/media', { cache: 'no-store' })
    .then(function (r) { return r.ok ? r.json() : {}; })
    .then(function (m) { media = m || {}; render(); })
    .catch(render);
})();
