// Reconstruit le menu de la page d'accueil à partir du back-office (/api/menu).
// Réutilise les classes CSS et les fonctions existantes (toggleDest, showContinent,
// toggleMobileDest, showMobileContinent, closeMobileNav) → comportement identique.
// SÛRETÉ : en cas d'erreur réseau ou de config absente, on ne touche à rien
// (le menu écrit en dur dans la page reste affiché). Aucune régression possible.
(function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  // Lien d'une feuille : URL explicite (page existante) ou page générique auto-créée.
  function href(node) {
    if (node.url) return node.url;
    return '/voyages/destinations/page.html?key=' + encodeURIComponent(node.key || node.id || '');
  }

  function visible(arr) {
    return (arr || []).filter(function (n) { return n && !n.hidden; });
  }

  function hasKids(n) { return n && n.children && visible(n.children).length; }

  // Liens d'un menu déroulant desktop, récursifs (sous-menu → sous-sous-menu indentés).
  function subLinks(nodes, depth) {
    return visible(nodes).map(function (n) {
      var pad = 14 + depth * 14;
      var a = '<a href="' + esc(href(n)) + '"' + (n.alert ? ' class="is-alert"' : '') +
        ' role="menuitem" style="padding-left:' + pad + 'px">' + esc(n.label) + '</a>';
      return a + (hasKids(n) ? subLinks(n.children, depth + 1) : '');
    }).join('');
  }

  // Liens mobiles d'un titre qui possède des enfants (indentés).
  function mobileSub(nodes, depth) {
    return visible(nodes).map(function (n) {
      var pad = 14 + depth * 16;
      var a = '<a href="' + esc(href(n)) + '" class="mobile-brochure-title" onclick="closeMobileNav()"' +
        ' style="padding-left:' + pad + 'px;font-weight:500">' + esc(n.label) + '</a>';
      return a + (hasKids(n) ? mobileSub(n.children, depth + 1) : '');
    }).join('');
  }

  function render(config) {
    if (!config || !Array.isArray(config.items)) return;
    var items = visible(config.items);
    if (!items.length) return;

    var megaItem = items.filter(function (it) { return it.type === 'mega' || it.continents; })[0] || null;

    // ---- Titres desktop (#navCenter) ----
    var navCenter = document.getElementById('navCenter');
    if (navCenter) {
      navCenter.innerHTML = items.map(function (it) {
        if (it.type === 'mega' || it.continents) {
          return '<button class="nav-title active" id="navDest" onclick="toggleDest(this)">' +
            esc(it.label) + ' <span class="nav-caret">▾</span></button>';
        }
        if (hasKids(it)) {
          return '<div class="nav-item"><a href="' + esc(href(it)) + '" class="nav-title">' +
            esc(it.label) + ' <span class="nav-caret">▾</span></a>' +
            '<div class="nav-submenu" role="menu" aria-label="' + esc(it.label) + '">' +
            subLinks(it.children, 0) + '</div></div>';
        }
        return '<a href="' + esc(href(it)) + '" class="nav-title">' + esc(it.label) + '</a>';
      }).join('');
    }

    // ---- Méga-panneau desktop (#destPanel) ----
    if (megaItem) {
      var conts = visible(megaItem.continents);
      var contsBox = document.querySelector('#destPanel .mega-continents');
      var colsBox = document.querySelector('#destPanel .mega-countries');
      if (contsBox && colsBox) {
        contsBox.innerHTML = conts.map(function (c, i) {
          return '<button class="mega-cont' + (i === 0 ? ' active' : '') +
            '" onclick="showContinent(\'c-' + esc(c.id) + '\', this)">' + esc(c.label) + '</button>';
        }).join('');
        colsBox.innerHTML = conts.map(function (c, i) {
          var links = visible(c.cols).map(function (col) {
            return '<a href="' + esc(href(col)) + '">' + esc(col.label) + '</a>';
          }).join('');
          return '<div class="mega-col' + (i === 0 ? ' active' : '') + '" id="c-' + esc(c.id) + '">' + links + '</div>';
        }).join('');
      }
    }

    // ---- Accordéon mobile ----
    var mobileNav = document.getElementById('mobileBrochureNav');
    if (mobileNav) {
      mobileNav.innerHTML = items.map(function (it) {
        if (it.type === 'mega' || it.continents) {
          return '<button class="mobile-brochure-title" id="mobileNavDest" onclick="toggleMobileDest(this)">' +
            esc(it.label) + ' <span class="nav-caret">▾</span></button>';
        }
        var line = '<a href="' + esc(href(it)) + '" class="mobile-brochure-title" onclick="closeMobileNav()">' +
          esc(it.label) + '</a>';
        return line + (hasKids(it) ? mobileSub(it.children, 1) : '');
      }).join('');
    }

    if (megaItem) {
      var mConts = visible(megaItem.continents);
      var mContsBox = document.querySelector('#mobileDestPanel .mobile-brochure-continents');
      var mColsBox = document.querySelector('#mobileDestPanel .mobile-brochure-countries');
      if (mContsBox && mColsBox) {
        mContsBox.innerHTML = mConts.map(function (c, i) {
          return '<button class="mobile-brochure-cont' + (i === 0 ? ' active' : '') +
            '" onclick="showMobileContinent(\'m-' + esc(c.id) + '\', this)">' + esc(c.label) + '</button>';
        }).join('');
        mColsBox.innerHTML = mConts.map(function (c, i) {
          var links = visible(c.cols).map(function (col) {
            return '<a href="' + esc(href(col)) + '" onclick="closeMobileNav()">' + esc(col.label) + '</a>';
          }).join('');
          return '<div class="mobile-brochure-col' + (i === 0 ? ' active' : '') + '" id="m-' + esc(c.id) + '">' + links + '</div>';
        }).join('');
      }
    }
  }

  function init() {
    fetch('/api/menu', { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (config) { try { render(config); } catch (e) { /* repli : on garde le menu en dur */ } })
      .catch(function () { /* repli : on garde le menu en dur */ });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
