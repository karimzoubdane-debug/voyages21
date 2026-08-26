/* Voyages21 — moteur de rendu unique des pages voyage.
   Structure centralisée + localisation (fr/ar). Le contenu vient de data.js ;
   les médias (vidéo/photos) de la médiathèque en ligne (/api/media).
   Pour une page en arabe : data.voyage.lang = "ar" et la coquille <html dir="rtl" lang="ar">. */
(function () {
    var slug = document.body.getAttribute("data-voyage");
    var v = (window.VOYAGES || {})[slug];
    var app = document.getElementById("app");
    if (!v) { app.innerHTML = '<p style="padding:2rem;text-align:center">Voyage introuvable.</p>'; return; }

    var WHATSAPP = v.whatsapp || "212614152686";
    var MEDIA_KEY_ALIASES = {
        "modal-omra": "modal-omra-mouharram",
        "modal-omra-06": "modal-omra-06-juillet",
        "modal-omra-08": "modal-omra-08-juillet",
        "modal-omra-01": "modal-omra-01-juillet"
    };
    var TITLE = v.title;
    document.title = TITLE + " — Voyages21";

    var LABELS = {
        fr: {
            back: "‹ Retour à l'accueil", soundOn: "Activer le son", soundOff: "Couper le son",
            from: "À partir de", quote: "Demander un devis", quoteWa: "Demander un devis sur WhatsApp",
            seeVideo: "Voir la vidéo", trust: "Sur mesure · Voyages 21, depuis 2000",
            why: "Pourquoi vous allez adorer ce voyage", itinDays: "Itinéraire jour par jour", itin: "Itinéraire",
            included: "Ce qui est inclus", includes: "Notre tarif comprend", excludes: "Notre tarif ne comprend pas",
            accommodation: "Hébergement", mapTitle: "L'itinéraire en un coup d'œil", datesPrices: "Dates & prix",
            childPrices: "Tarifs enfants :", photos: "photos", videoSoon: "Vidéo bientôt disponible", openLink: "Ouvrir le lien",
            tabWhy: "Le voyage", tabItin: "Itinéraire", tabIncl: "Inclus", tabHotel: "Hébergement", tabMap: "Carte", tabDates: "Dates & prix",
            possibleTrip: "Voyage possible", surDevis: "Sur devis",
            surDevisNote: "Ce voyage est proposé sur mesure. Contactez-nous pour un itinéraire et un tarif personnalisés.",
            pdf: "📎 Télécharger la brochure",
            askText: function (t, l) { return "Bonjour, je suis intéressé(e) par le voyage « " + t + " »" + (l ? " (" + l + ")" : "") + ". Pouvez-vous me faire une proposition ?"; }
        },
        ar: {
            back: "‹ العودة إلى الكتيّب", soundOn: "تشغيل الصوت", soundOff: "كتم الصوت",
            from: "ابتداءً من", quote: "اطلب عرض سعر", quoteWa: "اطلب عرض سعر عبر واتساب",
            seeVideo: "شاهد الفيديو", trust: "رحلة على المقاس · Voyages 21 منذ 2000",
            why: "لماذا ستحبّون هذه الرحلة", itinDays: "البرنامج يوماً بيوم", itin: "البرنامج",
            included: "ما يشمله العرض", includes: "يشمل سعرنا", excludes: "لا يشمل سعرنا",
            accommodation: "الإقامة", mapTitle: "مسار الرحلة", datesPrices: "التواريخ والأسعار",
            childPrices: "أسعار الأطفال:", photos: "صور", videoSoon: "الفيديو متوفّر قريباً", openLink: "افتح الرابط",
            tabWhy: "الرحلة", tabItin: "البرنامج", tabIncl: "المشمول", tabHotel: "الإقامة", tabMap: "الخريطة", tabDates: "التواريخ",
            possibleTrip: "رحلة ممكنة", surDevis: "حسب الطلب",
            surDevisNote: "هذه الرحلة مقترحة على المقاس. تواصلوا معنا لبرنامج وسعر مخصّصين.",
            pdf: "📎 تحميل الكتيّب",
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
    var askUrl = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(L.askText(TITLE, ""));
    var phone = v.phone || "+212614152686";
    var telHref = "tel:" + String(phone).replace(/[^+0-9]/g, "");
    var ICONS = {
        wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.5 3.5A11.7 11.7 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.2 1.6 6L.2 24l6.4-1.7a11.8 11.8 0 0 0 5.6 1.4h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.1-1.3-6.1-3.6-8.4ZM12.2 21.7h-.1a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 1 1 8.5 4.7Zm5.4-7.3c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.2-1.3-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.4.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.3 5.2 4.6.7.3 1.3.5 1.8.6.8.2 1.4.2 2 0 .6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4Z"/></svg>',
        tel: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8c1.7 3.4 3.2 4.9 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.3 1.3.4 2.6.6 4 .6.7 0 1.2.5 1.2 1.2v3.5c0 .7-.5 1.2-1.2 1.2C10.7 21.4 2.6 13.3 2.6 3.4c0-.7.5-1.2 1.2-1.2h3.5c.7 0 1.2.5 1.2 1.2 0 1.4.2 2.8.6 4 .1.4 0 .9-.3 1.2l-2.2 2.2Z"/></svg>',
        ig: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm4.5 3.4A4.6 4.6 0 1 1 7.4 12 4.6 4.6 0 0 1 12 7.4Zm0 2A2.6 2.6 0 1 0 14.6 12 2.6 2.6 0 0 0 12 9.4Zm5-2.6a1.1 1.1 0 1 1-1.1 1.1A1.1 1.1 0 0 1 17 6.8Z"/></svg>',
        fb: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14.2 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.6-1.5h1.7V4.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H8v3.1h2.8V22h3.4Z"/></svg>'
    };

    var hotelsHtml = (v.hotels && v.hotels.length)
        ? '<ul class="hotels">' + v.hotels.map(function (h) { return "<li>" + h + "</li>"; }).join("") + "</ul>"
        : (v.hebergement ? '<div class="stay">' + v.hebergement + "</div>" : "");
    var priceHtml = "";
    if (v.priceTable && v.priceTable.style === "hotel-grid") {
        var pt = v.priceTable;
        var ptColgroup = '<colgroup><col class="c-hotel"><col class="c-hotel">'
            + pt.columns.map(function () { return '<col class="c-price">'; }).join("") + '</colgroup>';
        priceHtml = '<div class="ptwrap"><table class="price-table price-table--grid">' + ptColgroup + '<thead><tr>'
            + '<th class="hotel">' + (pt.medina.label || "") + "</th>"
            + '<th class="hotel">' + (pt.mecca.label || "") + "</th>"
            + pt.columns.map(function (c) { return "<th>" + c + "</th>"; }).join("")
            + "</tr></thead><tbody>" + pt.rows.map(function (r) {
                var pricesHtml = (r.prices || []).map(function (p) {
                    return (p == null || p === "—")
                        ? '<td class="price">—</td>'
                        : '<td class="price"><span class="num">' + bidiNum(p) + '</span><small>' + (pt.currency || "درهم") + "</small></td>";
                }).join("");
                return "<tr><td class=\"hotel\">" + r.medinaHotel.name + "</td>"
                    + "<td class=\"hotel\">" + r.meccaHotel.name + "</td>"
                    + pricesHtml + "</tr>";
            }).join("") + "</tbody></table></div>"
            + (pt.note ? '<p class="note">' + bidiNum(pt.note) + "</p>" : "");
    } else if (v.priceTable && v.priceTable.style === "hotel-pairs") {
        priceHtml = '<div class="ptwrap"><table class="price-table"><thead><tr><th class="hotel">' + (v.priceTable.hotelHeader || "") + "</th>"
            + v.priceTable.columns.map(function (c) { return "<th>" + c + "</th>"; }).join("")
            + "</tr></thead><tbody>" + v.priceTable.rows.map(function (r) {
                var hotelsHtml = (r.hotels || []).map(function (h) {
                    return '<div class="hcity"><span class="ct">' + h.city + '</span><span class="hotel-name">' + h.name + "</span>"
                        + (h.key ? '<button class="hotel-gal is-empty" type="button" data-gal="' + h.key + '" aria-label="صور الفندق · Photos">📷</button>' : "")
                        + "</div>";
                }).join("");
                var pricesHtml = (r.prices || []).map(function (p) {
                    return (p == null || p === "—")
                        ? '<td class="price">—</td>'
                        : '<td class="price"><span class="num">' + bidiNum(p) + '</span><small>' + (v.priceTable.currency || "درهم") + "</small></td>";
                }).join("");
                return "<tr><td class=\"hotel\">" + hotelsHtml + "</td>" + pricesHtml + "</tr>";
            }).join("") + "</tbody></table></div>"
            + (v.priceTable.note ? '<p class="note">' + bidiNum(v.priceTable.note) + "</p>" : "");
    } else if (v.priceTable) {
        priceHtml = '<div class="ptable-wrap"><table class="ptable"><thead><tr>' + v.priceTable.head.map(function (h) { return "<th>" + h + "</th>"; }).join("")
            + "</tr></thead><tbody>" + v.priceTable.rows.map(function (r) {
                return "<tr>" + r.map(function (c, i) { return i === 0 ? "<th>" + c + "</th>" : '<td>' + bidiNum(c) + "</td>"; }).join("") + "</tr>";
            }).join("") + "</tbody></table></div>"
            + (v.priceTable.note ? '<p class="note">' + bidiNum(v.priceTable.note) + "</p>" : "");
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
        '<div class="topbar"><div class="topbar-inner"><a href="/design/homepage-v2-luxe.html">' + L.back + '</a><span class="brand">VOYAGES 21</span></div></div>'
        + '<div class="page">'
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
        + '<div id="pdf-slot"></div>'
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
        + '<div class="gallery" id="gallery" onclick="if(event.target===this)closeGallery()"><div class="gbox"><button class="gallery-close" onclick="closeGallery()">×</button><div class="gallery-inner" id="galleryInner"></div></div></div>'
        + '<div class="contact-bar" id="contactBar" aria-label="Contacts rapides">'
        + '<button class="contact-bar-main" type="button" aria-label="Ouvrir les contacts" onclick="toggleContactBar()">' + ICONS.wa + '</button>'
        + '<a class="contact-bar-link wing-wa" href="' + askUrl + '" target="_blank" rel="noopener" aria-label="WhatsApp">' + ICONS.wa + '</a>'
        + '<a class="contact-bar-link wing-tel" href="' + telHref + '" aria-label="T?l?phone">' + ICONS.tel + '</a>'
        + '<a class="contact-bar-link wing-ig" href="https://www.instagram.com/voyages21maroc" target="_blank" rel="noopener" aria-label="Instagram">' + ICONS.ig + '</a>'
        + '<a class="contact-bar-link wing-fb" href="https://www.facebook.com/Voyages21" target="_blank" rel="noopener" aria-label="Facebook">' + ICONS.fb + '</a>'
        + '<span class="contact-bar-link wing-tiktok" role="img" aria-label="TikTok bientôt disponible" aria-disabled="true" title="TikTok bientôt disponible"><img src="/social-icons/tiktok.svg" alt=""></span>'
        + '<span class="contact-bar-link wing-snapchat" role="img" aria-label="Snapchat bientôt disponible" aria-disabled="true" title="Snapchat bientôt disponible"><img src="/social-icons/snapchat.svg" alt=""></span>'
        + '<span class="contact-bar-link wing-youtube" role="img" aria-label="YouTube bientôt disponible" aria-disabled="true" title="YouTube bientôt disponible"><img src="/social-icons/youtube.svg" alt=""></span>'
        + '</div>';

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
    function mediaRecord(map, key) {
        map = map || {};
        return map[key] || map[MEDIA_KEY_ALIASES[key]] || null;
    }
    fetch("/api/media", { cache: "no-store" })
        .then(function (r) { return r.ok ? r.json() : {}; })
        .then(function (m) {
            applyMedia(mediaRecord(m, v.mediaKey));
            Array.prototype.forEach.call(document.querySelectorAll(".hotel-gal[data-gal]"), function (btn) {
                var key = btn.getAttribute("data-gal");
                var hrec = (m && m[key]) || {};
                var himgs = (hrec.images || []).map(function (x) { return x && x.url; }).filter(Boolean);
                if (himgs.length) btn.classList.remove("is-empty");
                btn.addEventListener("click", function () { window.openHotelGallery(himgs); });
            });
        })
        .catch(function () { applyMedia(null); });

    fetch("/api/produits", { cache: "no-store" })
        .then(function (r) { return r.ok ? r.json() : {}; })
        .then(function (manifest) {
            var statusEntry = (manifest.status || {})[slug] || {};
            // Voyage retiré du site via l'admin : fiche indisponible.
            if (statusEntry.removed) {
                document.title = "Voyage indisponible — Voyages21";
                if (app) app.innerHTML = '<div style="max-width:640px;margin:5rem auto;padding:2rem;text-align:center;font-family:\'DM Sans\',system-ui,sans-serif">'
                    + '<h1 style="font-family:\'Playfair Display\',Georgia,serif;color:#1B3A28;font-style:italic">Voyage indisponible</h1>'
                    + '<p style="color:#6b6457;line-height:1.5">Ce voyage n\'est plus proposé. Découvrez nos autres destinations sur mesure.</p>'
                    + '<a href="/" style="display:inline-block;margin-top:1.2rem;background:#1B3A28;color:#fff;padding:.75rem 1.5rem;border-radius:9px;text-decoration:none;font-weight:700">Retour à l\'accueil</a>'
                    + '</div>';
                return;
            }
            // Mode « Sur devis / Voyage possible » : prix masqué (→ Sur devis),
            // section Dates & prix remplacée par une note, bouton devis conservé.
            if (statusEntry.surDevis) {
                var cp = document.querySelector(".cadran-price");
                if (cp) cp.innerHTML = '<span style="display:inline-block;background:#C8A440;color:#152E1F;font-weight:700;font-size:.72rem;letter-spacing:.04em;padding:.2rem .6rem;border-radius:999px;margin-bottom:.45rem">' + L.possibleTrip + '</span><br><b>' + L.surDevis + "</b>";
                var ds = document.getElementById("dates");
                if (ds) ds.innerHTML = '<h2 class="sec-title">' + L.datesPrices + '</h2><p class="note">' + L.surDevisNote + "</p>";
            }
            var customEntry = (manifest.custom || {})[slug] || {};
            var pdfUrl = statusEntry.pdfUrl || customEntry.pdfUrl;
            if (!pdfUrl) return;
            var slot = document.getElementById("pdf-slot");
            if (!slot) return;
            slot.innerHTML = '<a href="' + pdfUrl + '" target="_blank" rel="noopener" class="btn btn-gold full" style="margin-top:.5rem;background:transparent;color:var(--forest);border:1px solid var(--gold);text-decoration:none;display:flex;justify-content:center;align-items:center">' + L.pdf + '</a>';
        })
        .catch(function () {});

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
            if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 52, behavior: "smooth" });
        });
    });
    window.addEventListener("scroll", function () {
        var y = window.scrollY + 90, cur = links[0];
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
    window.openHotelGallery = function (imgs) {
        if (!imgs || !imgs.length) return;
        var inner = document.getElementById("galleryInner");
        inner.innerHTML = imgs.map(function (u) { return '<img src="' + u + '" alt="" loading="lazy">'; }).join("");
        document.getElementById("gallery").classList.add("active");
        document.body.style.overflow = "hidden";
    };
    window.ask = function (label) {
        window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(L.askText(TITLE, label)), "_blank");
    };
    window.toggleContactBar = function () {
        var fan = document.getElementById("contactBar");
        if (fan) fan.classList.toggle("open");
    };
    document.addEventListener("click", function (event) {
        var fan = document.getElementById("contactBar");
        if (fan && fan.classList.contains("open") && !fan.contains(event.target)) fan.classList.remove("open");
    });})();
