/* Voyages21 — moteur de rendu unique des pages voyage.
   Structure centralisée + localisation (fr/ar). Le contenu vient de data.js ;
   les médias (vidéo/photos) de la médiathèque en ligne (/api/media).
   Pour une page en arabe : data.voyage.lang = "ar" et la coquille <html dir="rtl" lang="ar">. */
(function () {

    // ─── Header partagé — même nav que la homepage ────────────────────────
    (function injectNav() {
        // Polices Fraunces + Geist pour le logo et les boutons nav
        var fonts = document.createElement('link');
        fonts.rel = 'stylesheet';
        fonts.href = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@1,9..144,900&family=Geist:wght@400;500;600;700&display=swap';
        document.head.appendChild(fonts);

        var style = document.createElement('style');
        style.textContent = [
            'body{padding-top:64px;}',
            'nav#site-nav{position:fixed;inset:0 0 auto;z-index:300;height:64px;padding:0 48px;display:flex;align-items:center;justify-content:space-between;background:rgba(13,26,20,.96);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid rgba(76,175,113,.12);transition:box-shadow .3s;}',
            'nav#site-nav.elevated{box-shadow:0 4px 32px rgba(0,0,0,.5);}',
            '.vn-logo{font-family:"Fraunces",serif;font-weight:900;font-size:1.35rem;color:#FDFAF5;text-decoration:none;letter-spacing:.02em;flex-shrink:0;}',
            '.vn-logo sup{font-size:.48em;font-family:"Geist",sans-serif;font-weight:700;color:#C49A3C;vertical-align:super;margin-left:1px;letter-spacing:.06em;}',
            '.vn-center{display:flex;position:absolute;left:50%;transform:translateX(-50%);}',
            '.vn-title{padding:0 22px;height:64px;line-height:64px;border:none;background:transparent;cursor:pointer;font-family:"Geist",sans-serif;font-size:.75rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:rgba(253,250,245,.7);text-decoration:none;border-bottom:2px solid transparent;display:inline-flex;align-items:center;gap:6px;white-space:nowrap;transition:color .2s,border-color .2s;}',
            '.vn-title:hover{color:#C49A3C;border-bottom-color:rgba(196,154,60,.4);}',
            '.vn-title.open{color:#C49A3C;border-bottom-color:#C49A3C;}',
            '.vn-caret{font-size:.55rem;transition:transform .25s;}',
            '.vn-title.open .vn-caret{transform:rotate(180deg);}',
            '.vn-right{display:flex;align-items:center;gap:20px;flex-shrink:0;}',
            '.vn-tel{font-size:.75rem;font-weight:400;color:rgba(253,250,245,.65);text-decoration:none;letter-spacing:.06em;transition:color .2s;}',
            '.vn-tel:hover{color:#C49A3C;}',
            '.vn-cta{background:transparent;color:#C49A3C;border:1px solid rgba(196,154,60,.6);padding:8px 22px;font-size:.72rem;font-weight:500;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;transition:background .2s,color .2s;white-space:nowrap;}',
            '.vn-cta:hover{background:#C49A3C;color:#0C0C0C;}',
            '.vn-burger{display:none;}',
            '.vn-mobile-panel{display:none;}',
            '.vn-mega{display:none;position:fixed;top:64px;left:0;right:0;background:rgba(10,18,14,.97);border-bottom:2px solid #C49A3C;box-shadow:0 8px 32px rgba(0,0,0,.5);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);z-index:299;}',
            '.vn-mega.open{display:block;}',
            '.vn-mega-inner{max-width:900px;margin:0 auto;display:flex;min-height:200px;}',
            '.vn-mega-continents{width:200px;background:rgba(255,255,255,.03);display:flex;flex-direction:column;padding:1rem 0;border-right:1px solid rgba(196,154,60,.15);flex-shrink:0;}',
            '.vn-cont{text-align:left;padding:.8rem 1.4rem;border:none;background:transparent;cursor:pointer;font-family:"Geist",sans-serif;font-size:.8rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:rgba(253,250,245,.55);border-left:3px solid transparent;transition:all .2s;}',
            '.vn-cont:hover{background:rgba(255,255,255,.04);color:rgba(253,250,245,.9);}',
            '.vn-cont.active{background:rgba(196,154,60,.06);border-left-color:#C49A3C;color:#C49A3C;}',
            '.vn-mega-countries{flex:1;padding:1.5rem 2rem;}',
            '.vn-col{display:none;flex-direction:column;gap:.2rem;}',
            '.vn-col.active{display:flex;}',
            '.vn-col a{color:rgba(253,250,245,.75);text-decoration:none;padding:.6rem .8rem;border-radius:4px;font-family:"Geist",sans-serif;font-size:.9rem;font-weight:400;transition:all .2s;}',
            '.vn-col a:hover{background:rgba(196,154,60,.08);color:#C49A3C;padding-left:1.2rem;}',
            '@media(max-width:768px){',
            'body{padding-top:52px;}',
            'nav#site-nav{padding:0 16px;height:52px;}',
            '.vn-center{display:none;}',
            '.vn-mega{top:52px;}',
            '.vn-tel,.vn-cta{display:none;}',
            '.vn-logo{font-size:1.1rem;}',
            '.vn-burger{display:flex;flex-direction:column;justify-content:center;gap:5px;width:40px;height:40px;background:none;border:1px solid rgba(196,154,60,.4);border-radius:6px;cursor:pointer;padding:8px;flex-shrink:0;}',
            '.vn-burger span{display:block;height:2px;background:#C49A3C;border-radius:2px;transition:transform .25s,opacity .2s;}',
            '.vn-burger.open span:nth-child(1){transform:translateY(7px) rotate(45deg);}',
            '.vn-burger.open span:nth-child(2){opacity:0;}',
            '.vn-burger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}',
            '.vn-mobile-panel{display:none;position:fixed;top:52px;left:0;right:0;background:rgba(13,26,20,.98);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);flex-direction:column;border-bottom:1px solid rgba(76,175,113,.25);z-index:299;width:100%;}',
            '.vn-mobile-panel.open{display:flex;}',
            '.vn-mobile-panel ul{display:flex;flex-direction:column;list-style:none;padding:8px 0 0;margin:0;width:100%;}',
            '.vn-mobile-panel li{width:100%;}',
            '.vn-mobile-panel a{display:block;width:100%;height:auto;line-height:1;padding:16px 24px;font-size:.9rem;font-weight:500;letter-spacing:.08em;color:rgba(255,255,255,.85);text-decoration:none;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,.06);box-sizing:border-box;}',
            '.vn-mobile-panel a:active{color:#C49A3C;}',
            '}'
        ].join('');
        document.head.appendChild(style);

        document.body.insertAdjacentHTML('afterbegin',
            '<nav id="site-nav">'
            + '<a href="../" class="vn-logo">Voyages<sup>21</sup></a>'
            + '<div class="vn-center">'
            + '<button class="vn-title" id="vnDest" onclick="vnToggleDest(this)">Destinations Monde <span class="vn-caret">▾</span></button>'
            + '<a href="../BROCHURE_VOYAGES21_AVEC_IMAGES_V7.html#croisiere" class="vn-title">Croisières</a>'
            + '<a href="../BROCHURE_VOYAGES21_AVEC_IMAGES_V7.html#omra" class="vn-title">Omra</a>'
            + '<a href="../BROCHURE_VOYAGES21_AVEC_IMAGES_V7.html#maroc" class="vn-title">Mon Maroc</a>'
            + '</div>'
            + '<div class="vn-mobile-panel" id="vnMobilePanel">'
            + '<ul>'
            + '<li><a href="../BROCHURE_VOYAGES21_AVEC_IMAGES_V7.html#europe" onclick="vnCloseMenu()">Europe</a></li>'
            + '<li><a href="../BROCHURE_VOYAGES21_AVEC_IMAGES_V7.html#egypte" onclick="vnCloseMenu()">Afrique</a></li>'
            + '<li><a href="../BROCHURE_VOYAGES21_AVEC_IMAGES_V7.html#usa" onclick="vnCloseMenu()">Amériques</a></li>'
            + '<li><a href="../BROCHURE_VOYAGES21_AVEC_IMAGES_V7.html#chine" onclick="vnCloseMenu()">Asie</a></li>'
            + '<li><a href="../BROCHURE_VOYAGES21_AVEC_IMAGES_V7.html#croisiere" onclick="vnCloseMenu()">Croisières</a></li>'
            + '<li><a href="../BROCHURE_VOYAGES21_AVEC_IMAGES_V7.html#omra" onclick="vnCloseMenu()">Omra</a></li>'
            + '<li><a href="../BROCHURE_VOYAGES21_AVEC_IMAGES_V7.html#maroc" onclick="vnCloseMenu()">Mon Maroc</a></li>'
            + '</ul></div>'
            + '<div class="vn-right">'
            + '<a href="tel:+212673280009" class="vn-tel">+212 6 73 28 00 09</a>'
            + '<a href="../#contact" class="vn-cta">Réserver</a>'
            + '<button class="vn-burger" id="vnBurger" aria-label="Menu" onclick="vnToggleMenu()">'
            + '<span></span><span></span><span></span></button>'
            + '</div></nav>'
            + '<div class="vn-mega" id="vnMega">'
            + '<div class="vn-mega-inner">'
            + '<div class="vn-mega-continents">'
            + '<button class="vn-cont active" onclick="vnShowContinent(\'vc-europe\',this)">Europe</button>'
            + '<button class="vn-cont" onclick="vnShowContinent(\'vc-afrique\',this)">Afrique</button>'
            + '<button class="vn-cont" onclick="vnShowContinent(\'vc-ameriques\',this)">Amériques</button>'
            + '<button class="vn-cont" onclick="vnShowContinent(\'vc-asie\',this)">Asie</button>'
            + '</div>'
            + '<div class="vn-mega-countries">'
            + '<div class="vn-col active" id="vc-europe">'
            + '<a href="../BROCHURE_VOYAGES21_AVEC_IMAGES_V7.html#europe">Circuits Europe</a>'
            + '<a href="../BROCHURE_VOYAGES21_AVEC_IMAGES_V7.html#turquie">Turquie</a>'
            + '</div>'
            + '<div class="vn-col" id="vc-afrique">'
            + '<a href="../BROCHURE_VOYAGES21_AVEC_IMAGES_V7.html#egypte">Égypte</a>'
            + '<a href="../BROCHURE_VOYAGES21_AVEC_IMAGES_V7.html#zanzibar">Zanzibar</a>'
            + '</div>'
            + '<div class="vn-col" id="vc-ameriques">'
            + '<a href="../BROCHURE_VOYAGES21_AVEC_IMAGES_V7.html#usa">USA &amp; Canada</a>'
            + '<a href="../BROCHURE_VOYAGES21_AVEC_IMAGES_V7.html#cuba">Cuba</a>'
            + '<a href="../BROCHURE_VOYAGES21_AVEC_IMAGES_V7.html#perou">Pérou</a>'
            + '</div>'
            + '<div class="vn-col" id="vc-asie">'
            + '<a href="../BROCHURE_VOYAGES21_AVEC_IMAGES_V7.html#chine">Chine</a>'
            + '<a href="../BROCHURE_VOYAGES21_AVEC_IMAGES_V7.html#malaisie">Malaisie &amp; Thaïlande</a>'
            + '<a href="../BROCHURE_VOYAGES21_AVEC_IMAGES_V7.html#bangkok">Bangkok &amp; Thaïlande</a>'
            + '<a href="../BROCHURE_VOYAGES21_AVEC_IMAGES_V7.html#vietnam">Vietnam</a>'
            + '</div>'
            + '</div></div></div>'
        );

        window.vnToggleDest = function (btn) {
            var mega = document.getElementById('vnMega');
            var open = mega.classList.toggle('open');
            btn.classList.toggle('open', open);
        };
        window.vnShowContinent = function (colId, btn) {
            document.querySelectorAll('.vn-col').forEach(function (c) { c.classList.remove('active'); });
            document.querySelectorAll('.vn-cont').forEach(function (b) { b.classList.remove('active'); });
            var col = document.getElementById(colId);
            if (col) col.classList.add('active');
            if (btn) btn.classList.add('active');
        };
        window.vnToggleMenu = function () {
            document.getElementById('vnBurger').classList.toggle('open');
            document.getElementById('vnMobilePanel').classList.toggle('open');
        };
        window.vnCloseMenu = function () {
            document.getElementById('vnBurger').classList.remove('open');
            document.getElementById('vnMobilePanel').classList.remove('open');
        };
        document.addEventListener('click', function (e) {
            var panel = document.getElementById('vnMobilePanel');
            var burger = document.getElementById('vnBurger');
            if (panel && panel.classList.contains('open') && !panel.contains(e.target) && !burger.contains(e.target)) {
                window.vnCloseMenu();
            }
            var mega = document.getElementById('vnMega');
            var dest = document.getElementById('vnDest');
            if (mega && mega.classList.contains('open') && !mega.contains(e.target) && dest && !dest.contains(e.target)) {
                mega.classList.remove('open');
                dest.classList.remove('open');
            }
        });

        window.addEventListener('scroll', function () {
            var nav = document.getElementById('site-nav');
            if (nav) nav.classList.toggle('elevated', window.scrollY > 10);
        });
    })();

    // ─── Contenu page voyage ──────────────────────────────────────────────
    var slug = document.body.getAttribute("data-voyage");
    var v = (window.VOYAGES || {})[slug];
    var app = document.getElementById("app");
    if (!v) { app.innerHTML = '<p style="padding:2rem;text-align:center">Voyage introuvable.</p>'; return; }

    var WHATSAPP = v.whatsapp || "212673280009";
    var TITLE = v.title;
    document.title = TITLE + " — Voyages21";

    var LABELS = {
        fr: {
            back: "‹ Accueil", soundOn: "Activer le son", soundOff: "Couper le son",
            from: "À partir de", quote: "Demander un devis", quoteWa: "Demander un devis sur WhatsApp",
            seeVideo: "Voir la vidéo", trust: "Sur mesure · Voyages 21, depuis 2000",
            why: "Pourquoi vous allez adorer ce voyage", itinDays: "Itinéraire jour par jour", itin: "Itinéraire",
            included: "Ce qui est inclus", includes: "Notre tarif comprend", excludes: "Notre tarif ne comprend pas",
            accommodation: "Hébergement", mapTitle: "L'itinéraire en un coup d'œil", datesPrices: "Dates & prix",
            childPrices: "Tarifs enfants :", photos: "photos", videoSoon: "Vidéo bientôt disponible", openLink: "Ouvrir le lien",
            tabWhy: "Le voyage", tabItin: "Itinéraire", tabIncl: "Inclus", tabHotel: "Hébergement", tabMap: "Carte", tabDates: "Dates & prix",
            askText: function (t, l) { return "Bonjour, je suis intéressé(e) par le voyage « " + t + " »" + (l ? " (" + l + ")" : "") + ". Pouvez-vous me faire une proposition ?"; }
        },
        ar: {
            back: "‹ الرئيسية", soundOn: "تشغيل الصوت", soundOff: "كتم الصوت",
            from: "ابتداءً من", quote: "اطلب عرض سعر", quoteWa: "اطلب عرض سعر عبر واتساب",
            seeVideo: "شاهد الفيديو", trust: "رحلة على المقاس · Voyages 21 منذ 2000",
            why: "لماذا ستحبّون هذه الرحلة", itinDays: "البرنامج يوماً بيوم", itin: "البرنامج",
            included: "ما يشمله العرض", includes: "يشمل سعرنا", excludes: "لا يشمل سعرنا",
            accommodation: "الإقامة", mapTitle: "مسار الرحلة", datesPrices: "التواريخ والأسعار",
            childPrices: "أسعار الأطفال:", photos: "صور", videoSoon: "الفيديو متوفّر قريباً", openLink: "افتح الرابط",
            tabWhy: "الرحلة", tabItin: "البرنامج", tabIncl: "المشمول", tabHotel: "الإقامة", tabMap: "الخريطة", tabDates: "التواريخ",
            askText: function (t, l) { return "السلام عليكم، أنا مهتمّ برحلة « " + t + " »" + (l ? " (" + l + ")" : "") + ". هل يمكنكم تقديم عرض؟"; }
        }
    };
    var L = LABELS[v.lang] || LABELS.fr;

    // En arabe (RTL), un nombre composé "17 200" est réordonné en "200 17" par l'algorithme
    // bidirectionnel. On isole chaque suite de chiffres dans un span LTR pour la lire correctement.
    function bidiNum(s) {
        if (v.lang !== "ar" || s == null) return s;
        return String(s).replace(/(\d[\d ]*\d|\d)/g, '<span dir="ltr" style="unicode-bidi:isolate">$1</span>');
    }

    var cadran = (v.cadran || []).map(function (r) {
        return '<div class="cadran-row"><span class="k">' + r[0] + '</span><span class="v">' + bidiNum(r[1]) + '</span></div>';
    }).join("");

    var intro = (v.intro || []).map(function (p) { return "<p>" + p + "</p>"; }).join("");
    var highlights = (v.highlights || []).map(function (h) { return "<li>" + h + "</li>"; }).join("");

    var days = (v.days || []).map(function (d, i) {
        var meta = (d.meta || []).map(function (m) { return "<span><b>" + m[0] + " :</b> " + m[1] + "</span>"; }).join("");
        if (d.opt) meta += '<span class="opt">' + d.opt + "</span>";
        var topt = d.titleOpt ? ' <span class="opt">' + d.titleOpt + "</span>" : "";
        return '<div class="day' + (i === 0 ? " open" : "") + '">'
            + '<button class="day-head" onclick="toggleDay(this)"><span class="day-num">' + d.num + '</span>'
            + '<span class="day-title">' + d.title + topt + '</span><span class="day-chev"></span></button>'
            + '<div class="day-body"><div class="day-body-inner">' + d.text
            + (meta ? '<div class="day-meta">' + meta + "</div>" : "") + "</div></div></div>";
    }).join("");

    var inc = (v.inclus || []).map(function (x) { return "<li>" + x + "</li>"; }).join("");
    var exc = (v.exclus || []).map(function (x) { return "<li>" + x + "</li>"; }).join("");
    var route = (v.route || v.programme || []).map(function (s, i) {
        return (i ? '<span class="sep">—</span>' : "") + '<span class="stop">' + s + "</span>";
    }).join("");
    var dates = v.dates || {};
    var cta = v.cta || {};

    var hotelsHtml = (v.hotels && v.hotels.length)
        ? '<ul class="hotels">' + v.hotels.map(function (h) { return "<li>" + h + "</li>"; }).join("") + "</ul>"
        : (v.hebergement ? '<div class="stay">' + v.hebergement + "</div>" : "");
    var priceHtml = "";
    if (v.priceTable) {
        priceHtml = '<table class="ptable" dir="ltr"><thead><tr>' + v.priceTable.head.map(function (h) { return "<th>" + h + "</th>"; }).join("")
            + "</tr></thead><tbody>" + v.priceTable.rows.map(function (r) {
                return "<tr>" + r.map(function (c, i) { return i === 0 ? "<th>" + c + "</th>" : '<td>' + bidiNum(c) + "</td>"; }).join("") + "</tr>";
            }).join("") + "</tbody></table>";
    }
    var childrenHtml = v.children ? '<p class="note"><b>' + L.childPrices + "</b> " + bidiNum(v.children) + "</p>" : "";
    var datesListHtml = (v.datesList && v.datesList.length)
        ? '<div class="datechips">' + v.datesList.map(function (x) { return "<span>" + bidiNum(x) + "</span>"; }).join("") + "</div>"
        : "";
    var inclusBlock = '<div class="incbox in"><h3>' + L.includes + '</h3><ul class="ticks">' + inc + "</ul></div>";
    if (exc) inclusBlock = '<div class="twocol">' + inclusBlock + '<div class="incbox out"><h3>' + L.excludes + '</h3><ul class="ticks">' + exc + "</ul></div></div>";
    var itinTitle = (v.days && v.days.length) ? L.itinDays : L.itin;
    var itinBody = (v.days && v.days.length) ? days
        : ((v.programme && v.programme.length) ? '<ol class="steps">' + v.programme.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ol>" : "");

    app.innerHTML =
        '<div class="page">'
        + (v.eyebrow ? '<div class="eyebrow">' + v.eyebrow + "</div>" : "")
        + '<h1 class="voyage-title">' + v.title + (v.duration ? ' <span class="dur-badge">' + v.duration + "</span>" : "") + "</h1>"
        + '<div class="hero-row">'
        + '<div class="media-col"><div class="media-main" id="hero">'
        + (v.tag ? '<span class="media-tag">' + v.tag + "</span>" : "")
        + '<video id="heroVideo" muted loop playsinline autoplay preload="auto"></video>'
        + '<button class="sound-toggle" id="soundBtn" onclick="toggleSound()">' + L.soundOn + '</button>'
        + '</div><div class="thumbs" id="thumbs" style="display:none"></div></div>'
        + '<aside class="cadran">' + cadran
        + '<div class="cadran-price">' + L.from + ' <b>' + bidiNum(v.price || "—") + "</b></div>"
        + '<button class="btn btn-gold full" onclick="ask(\'\')">' + L.quote + '</button>'
        + '<button class="btn btn-gold full" id="voirVideo" style="display:none;background:transparent;color:var(--forest);border:1px solid var(--gold);margin-top:.5rem">' + L.seeVideo + '</button>'
        + '<div class="cadran-note">' + L.trust + '</div>'
        + "</aside></div>"
        + '<nav class="tabs"><a href="#apercu" class="active">' + L.tabWhy + '</a><a href="#itineraire">' + L.tabItin + '</a><a href="#inclus">' + L.tabIncl + '</a><a href="#hebergement">' + L.tabHotel + '</a><a href="#carte">' + L.tabMap + '</a><a href="#dates">' + L.tabDates + '</a></nav>'
        + '<section id="apercu"><h2 class="sec-title">' + L.why + '</h2><div class="lead">' + intro + '</div><ul class="highlights">' + highlights + "</ul></section>"
        + '<section id="itineraire"><h2 class="sec-title">' + itinTitle + "</h2>" + itinBody + "</section>"
        + '<section id="inclus"><h2 class="sec-title">' + L.included + "</h2>" + inclusBlock + "</section>"
        + '<section id="hebergement"><h2 class="sec-title">' + L.accommodation + "</h2>" + hotelsHtml + "</section>"
        + '<section id="carte"><h2 class="sec-title">' + L.mapTitle + '</h2><div class="route">' + route + "</div></section>"
        + '<section id="dates"><h2 class="sec-title">' + L.datesPrices + "</h2>" + (dates.line ? '<div class="stay">' + bidiNum(dates.line) + "</div>" : "") + datesListHtml + priceHtml + childrenHtml + (dates.note ? '<p class="note">' + bidiNum(dates.note) + "</p>" : "") + "</section>"
        + '<div class="cta-final"><h3>' + (cta.title || "") + "</h3><p>" + (cta.text || "") + '</p><button class="btn btn-gold" onclick="ask(\'\')">' + L.quoteWa + '</button></div>'
        + "</div>"
        + '<div class="vmodal" id="vmodal" onclick="if(event.target===this)closeVideo()"><div class="box"><button class="close" onclick="closeVideo()">×</button><div class="ratio" id="vframe"></div></div></div>'
        + '<div class="gallery" id="gallery" onclick="if(event.target===this)closeGallery()"><div class="gbox"><button class="gallery-close" onclick="closeGallery()">×</button><div class="gallery-inner" id="galleryInner"></div></div></div>';

    // ===== Médias en ligne + comportements =====
    var hero = document.getElementById("heroVideo");
    var heroBox = document.getElementById("hero");
    var voirVideoBtn = document.getElementById("voirVideo");
    var thumbsBox = document.getElementById("thumbs");
    var PHOTOS = [];

    function playHero() {
        if (!hero) return;
        hero.muted = true;
        var p = hero.play();
        if (p && p.catch) p.catch(function () {
            var once = function () { hero.removeEventListener("canplay", once); hero.muted = true; hero.play().catch(function () {}); };
            hero.addEventListener("canplay", once);
        });
    }
    function buildThumbs(images) {
        PHOTOS = (images || []).map(function (it) { return it && it.url; }).filter(Boolean);
        thumbsBox.innerHTML = "";
        if (!PHOTOS.length) { thumbsBox.style.display = "none"; return; }
        thumbsBox.style.display = "";
        var max = 4, n = Math.min(PHOTOS.length, max);
        for (var i = 0; i < n; i++) {
            var d = document.createElement("div");
            d.className = "thumb";
            d.style.backgroundImage = "url('" + PHOTOS[i] + "')";
            (function (idx) { d.onclick = function () { openGallery(idx); }; })(i);
            if (i === max - 1 && PHOTOS.length > max) {
                var more = document.createElement("div");
                more.className = "more";
                more.textContent = "+" + (PHOTOS.length - max + 1) + " " + L.photos;
                d.appendChild(more);
            }
            thumbsBox.appendChild(d);
        }
    }
    function applyMedia(rec) {
        rec = rec || {};
        if (rec.videoUrl && hero) {
            if (rec.images && rec.images[0] && rec.images[0].url) hero.setAttribute("poster", rec.images[0].url);
            hero.src = rec.videoUrl;
            playHero();
        } else {
            if (hero) hero.style.display = "none";
            var bg = (rec.images && rec.images[0] && rec.images[0].url) ? rec.images[0].url : null;
            if (bg && heroBox) heroBox.style.backgroundImage = "url('" + bg + "')";
            var st = document.getElementById("soundBtn"); if (st) st.style.display = "none";
        }
        if (voirVideoBtn) {
            if (rec.videoLink) { voirVideoBtn.style.display = ""; voirVideoBtn.onclick = function () { openVideo(rec.videoLink); }; }
            else { voirVideoBtn.style.display = "none"; }
        }
        buildThumbs(rec.images);
    }
    fetch("/api/media", { cache: "no-store" })
        .then(function (r) { return r.ok ? r.json() : {}; })
        .then(function (m) { applyMedia(m && m[v.mediaKey]); })
        .catch(function () { applyMedia(null); });

    window.toggleSound = function () {
        if (!hero) return;
        hero.muted = !hero.muted;
        var b = document.getElementById("soundBtn");
        if (b) b.textContent = hero.muted ? L.soundOn : L.soundOff;
        if (!hero.muted) hero.play().catch(function () {});
    };
    window.toggleDay = function (btn) { btn.parentElement.classList.toggle("open"); };

    var links = Array.prototype.slice.call(document.querySelectorAll(".tabs a"));
    links.forEach(function (a) {
        a.addEventListener("click", function (e) {
            e.preventDefault();
            var t = document.querySelector(a.getAttribute("href"));
            if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
        });
    });
    window.addEventListener("scroll", function () {
        var y = window.scrollY + 100, cur = links[0];
        links.forEach(function (a) { var t = document.querySelector(a.getAttribute("href")); if (t && t.offsetTop <= y) cur = a; });
        links.forEach(function (a) { a.classList.toggle("active", a === cur); });
    });

    function extractYouTubeId(u) {
        u = String(u || "").trim();
        if (/^[A-Za-z0-9_-]{11}$/.test(u)) return u;
        var m = u.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([A-Za-z0-9_-]{11})/);
        return m ? m[1] : "";
    }
    function buildLinkEmbed(value) {
        value = String(value || "").trim();
        if (!value) return "";
        if (/^data:video\//i.test(value) || /\.(mp4|webm|ogg)(\?|$)/i.test(value)) return '<video src="' + value + '" controls autoplay playsinline></video>';
        var vm = value.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
        if (vm) return '<iframe src="https://player.vimeo.com/video/' + vm[1] + '?autoplay=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
        var yt = extractYouTubeId(value);
        if (yt) return '<iframe src="https://www.youtube.com/embed/' + yt + '?autoplay=1&rel=0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
        return '<div class="video-soon"><strong>' + L.videoSoon + '</strong><a href="' + value + '" target="_blank" rel="noopener">' + L.openLink + "</a></div>";
    }
    function showModal(html) {
        document.getElementById("vframe").innerHTML = html;
        document.getElementById("vmodal").classList.add("active");
        document.body.style.overflow = "hidden";
    }
    window.openVideo = function (link) { showModal(buildLinkEmbed(link)); };
    window.closeVideo = function () {
        document.getElementById("vframe").innerHTML = "";
        document.getElementById("vmodal").classList.remove("active");
        document.body.style.overflow = "";
    };
    window.openGallery = function (idx) {
        if (!PHOTOS.length) return;
        var inner = document.getElementById("galleryInner");
        inner.innerHTML = PHOTOS.map(function (u) { return '<img src="' + u + '" alt="" loading="lazy">'; }).join("");
        document.getElementById("gallery").classList.add("active");
        document.body.style.overflow = "hidden";
        setTimeout(function () { var imgs = inner.querySelectorAll("img"); if (imgs[idx]) imgs[idx].scrollIntoView(); }, 30);
    };
    window.closeGallery = function () {
        document.getElementById("gallery").classList.remove("active");
        document.getElementById("galleryInner").innerHTML = "";
        document.body.style.overflow = "";
    };
    window.ask = function (label) {
        window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(L.askText(TITLE, label)), "_blank");
    };
})();
