(function () {
  var CMS_KEY = '__cmsConfig';
  var HOME_KEY = '__homepageCover';
  var DETAIL_URL = '/voyages/cms-detail.html?slug=';

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function normalizeCms(raw) {
    raw = raw || {};
    return {
      menus: Array.isArray(raw.menus) ? raw.menus : [],
      voyages: Array.isArray(raw.voyages) ? raw.voyages.filter(function (v) { return v && v.published !== false; }) : [],
      sections: raw.sections || {},
      globals: raw.globals || {}
    };
  }

  function imageFor(v, manifest) {
    if (v.image) return v.image;
    var rec = manifest && v.mediaKey ? manifest[v.mediaKey] : null;
    if (rec && rec.images && rec.images[0] && rec.images[0].url) return rec.images[0].url;
    if (rec && rec.videoUrl) return rec.videoUrl;
    return '';
  }

  function cardHtml(v, manifest) {
    var img = imageFor(v, manifest);
    var href = DETAIL_URL + encodeURIComponent(v.slug || v.mediaKey || v.title || 'voyage');
    var style = img ? ' style="background-image:url(' + esc(img) + ')"' : '';
    return '<article class="v21-cms-card voyage-card" data-cms-voyage="' + esc(v.slug || '') + '">'
      + '<a class="v21-cms-media" href="' + href + '"' + style + ' aria-label="' + esc(v.title || 'Voyage') + '"></a>'
      + '<div class="v21-cms-body">'
      + '<div class="v21-cms-meta">' + esc([v.dest, v.duration].filter(Boolean).join(' · ')) + '</div>'
      + '<h3>' + esc(v.title || 'Nouveau voyage') + '</h3>'
      + (v.summary ? '<p>' + esc(v.summary) + '</p>' : '')
      + '<div class="v21-cms-actions"><span>' + esc(v.price || 'Sur demande') + '</span><a href="' + href + '">Voir detail</a></div>'
      + '</div></article>';
  }

  function ensureStyles() {
    if (document.getElementById('v21-cms-styles')) return;
    var css = '.v21-cms-card{background:#fff;border:1px solid rgba(196,154,60,.18);overflow:hidden;min-height:100%;display:flex;flex-direction:column}.v21-cms-media{display:block;min-height:240px;background:#0d1a14 center/cover no-repeat}.v21-cms-body{padding:22px;display:flex;flex-direction:column;gap:10px;flex:1}.v21-cms-body h3{font-family:Fraunces,Georgia,serif;font-size:1.35rem;line-height:1.15;color:#0c0c0c}.v21-cms-body p{font-size:.9rem;color:#5f594f;line-height:1.55}.v21-cms-meta{font-size:.68rem;letter-spacing:.15em;text-transform:uppercase;color:#c49a3c;font-weight:700}.v21-cms-actions{margin-top:auto;display:flex;justify-content:space-between;gap:14px;align-items:center;font-size:.8rem;text-transform:uppercase;letter-spacing:.08em;font-weight:800}.v21-cms-actions a{color:#0c0c0c;text-decoration:none;border-bottom:1px solid #c49a3c}.v21-cms-menu{position:relative}.v21-cms-menu>a::after{content:""}.v21-cms-badge{background:#c8a440;color:#142016;border-radius:999px;padding:5px 9px;font-size:.64rem;letter-spacing:.12em;text-transform:uppercase;font-weight:900;margin-left:8px;vertical-align:middle}';
    var s = document.createElement('style');
    s.id = 'v21-cms-styles';
    s.textContent = css;
    document.head.appendChild(s);
  }

  function applyHomeCover(home) {
    if (!home) return;
    var title = document.querySelector('.hero-title, .home-title, h1');
    var subtitle = document.querySelector('.hero-subtitle, .home-subtitle');
    var label = document.querySelector('.hero-eyebrow, .home-eyebrow');
    var button = document.querySelector('.hero .btn-gold, .hero-cta, a[href="#programmes"]');
    if (title && home.title) title.innerHTML = esc(home.title).replace(/\n/g, '<br>');
    if (subtitle && home.subtitle) subtitle.innerHTML = esc(home.subtitle).replace(/\n/g, '<br>');
    if (label && home.label) label.textContent = home.label;
    if (button && home.buttonText) button.textContent = home.buttonText;
  }

  function applyMenus(cms) {
    var nav = document.querySelector('.nav-menu');
    if (!nav) return;
    cms.menus.forEach(function (m) {
      if (!m.label) return;
      var li = document.createElement('li');
      li.className = 'v21-cms-menu';
      var a = document.createElement('a');
      a.href = m.url || '#programmes';
      a.textContent = m.submenu ? (m.label + ' · ' + m.submenu) : m.label;
      li.appendChild(a);
      nav.appendChild(li);
    });
  }

  function applyVoyages(cms, manifest) {
    if (!cms.voyages.length) return;
    var grid = document.querySelector('#grid-voyages, .voyages-grid, .programmes-grid');
    if (!grid) return;
    ensureStyles();
    cms.voyages.forEach(function (v) {
      if (!v.title) return;
      var wrap = document.createElement('div');
      wrap.innerHTML = cardHtml(v, manifest);
      grid.appendChild(wrap.firstElementChild);
    });
  }

  function applySections(cms) {
    var s = cms.sections || {};
    if (s.searchPlaceholder) {
      document.querySelectorAll('input[type="search"], input[placeholder*="destination" i]').forEach(function (el) { el.placeholder = s.searchPlaceholder; });
    }
    if (s.destTitle) {
      var h = document.querySelector('#destinations h2, .destinations h2');
      if (h) h.textContent = s.destTitle;
    }
    if (s.destSub) {
      var p = document.querySelector('#destinations .section-sub, .destinations .section-sub');
      if (p) p.textContent = s.destSub;
    }
  }

  function boot() {
    fetch('/api/media', { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : {}; })
      .then(function (manifest) {
        var cms = normalizeCms(manifest[CMS_KEY]);
        applyHomeCover(manifest[HOME_KEY]);
        applyMenus(cms);
        applySections(cms);
        applyVoyages(cms, manifest);
      })
      .catch(function () {});
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
