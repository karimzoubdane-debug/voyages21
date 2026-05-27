/* Voyages21 — moteur de rendu unique des pages voyage.
   Toute la STRUCTURE est ici : modifier/ajouter une section se fait une seule
   fois et s'applique à toutes les pages. Le contenu vient de data.js, les
   médias (vidéo/photos) de la médiathèque en ligne (/api/media). */
(function () {
    var slug = document.body.getAttribute("data-voyage");
    var v = (window.VOYAGES || {})[slug];
    var app = document.getElementById("app");
    if (!v) { app.innerHTML = '<p style="padding:2rem;text-align:center">Voyage introuvable.</p>'; return; }

    var WHATSAPP = v.whatsapp || "212673280009";
    var TITLE = v.title;
    document.title = TITLE + " — Voyages21";

    var cadran = (v.cadran || []).map(function (r) {
        return '<div class="cadran-row"><span class="k">' + r[0] + '</span><span class="v">' + r[1] + '</span></div>';
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
        priceHtml = '<table class="ptable"><thead><tr>' + v.priceTable.head.map(function (h) { return "<th>" + h + "</th>"; }).join("")
            + "</tr></thead><tbody>" + v.priceTable.rows.map(function (r) {
                return "<tr>" + r.map(function (c, i) { return i === 0 ? "<th>" + c + "</th>" : "<td>" + c + "</td>"; }).join("") + "</tr>";
            }).join("") + "</tbody></table>";
    }
    var childrenHtml = v.children ? '<p class="note"><b>Tarifs enfants :</b> ' + v.children + "</p>" : "";
    var datesListHtml = (v.datesList && v.datesList.length)
        ? '<div class="datechips">' + v.datesList.map(function (x) { return "<span>" + x + "</span>"; }).join("") + "</div>"
        : "";
    var inclusBlock = '<div class="incbox in"><h3>Notre tarif comprend</h3><ul class="ticks">' + inc + "</ul></div>";
    if (exc) inclusBlock = '<div class="twocol">' + inclusBlock + '<div class="incbox out"><h3>Notre tarif ne comprend pas</h3><ul class="ticks">' + exc + "</ul></div></div>";
    var itinTitle = (v.days && v.days.length) ? "Itinéraire jour par jour" : "Itinéraire";
    var itinBody = (v.days && v.days.length) ? days
        : ((v.programme && v.programme.length) ? '<ol class="steps">' + v.programme.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ol>" : "");

    app.innerHTML =
        '<div class="topbar"><div class="topbar-inner"><a href="../BROCHURE_VOYAGES21_AVEC_IMAGES_V7.html">‹ Retour à la brochure</a><span class="brand">VOYAGES 21</span></div></div>'
        + '<div class="page">'
        + (v.eyebrow ? '<div class="eyebrow">' + v.eyebrow + "</div>" : "")
        + '<h1 class="voyage-title">' + v.title + (v.duration ? ' <span class="dur-badge">' + v.duration + "</span>" : "") + "</h1>"
        + '<div class="hero-row">'
        + '<div class="media-col"><div class="media-main" id="hero">'
        + (v.tag ? '<span class="media-tag">' + v.tag + "</span>" : "")
        + '<video id="heroVideo" muted loop playsinline autoplay preload="auto"></video>'
        + '<button class="sound-toggle" id="soundBtn" onclick="toggleSound()">Activer le son</button>'
        + '</div><div class="thumbs" id="thumbs" style="display:none"></div></div>'
        + '<aside class="cadran">' + cadran
        + '<div class="cadran-price">À partir de <b>' + (v.price || "sur demande") + "</b></div>"
        + '<button class="btn btn-gold full" onclick="ask(\'\')">Demander un devis</button>'
        + '<button class="btn btn-gold full" id="voirVideo" style="display:none;background:transparent;color:var(--forest);border:1px solid var(--gold);margin-top:.5rem">Voir la vidéo</button>'
        + '<div class="cadran-note">Sur mesure · Voyages 21, depuis 2000</div>'
        + "</aside></div>"
        + '<nav class="tabs"><a href="#apercu" class="active">Le voyage</a><a href="#itineraire">Itinéraire</a><a href="#inclus">Inclus</a><a href="#hebergement">Hébergement</a><a href="#carte">Carte</a><a href="#dates">Dates &amp; prix</a></nav>'
        + '<section id="apercu"><h2 class="sec-title">Pourquoi vous allez adorer ce voyage</h2><div class="lead">' + intro + '</div><ul class="highlights">' + highlights + "</ul></section>"
        + '<section id="itineraire"><h2 class="sec-title">' + itinTitle + "</h2>" + itinBody + "</section>"
        + '<section id="inclus"><h2 class="sec-title">Ce qui est inclus</h2>' + inclusBlock + "</section>"
        + '<section id="hebergement"><h2 class="sec-title">Hébergement</h2>' + hotelsHtml + "</section>"
        + '<section id="carte"><h2 class="sec-title">L\'itinéraire en un coup d\'œil</h2><div class="route">' + route + "</div></section>"
        + '<section id="dates"><h2 class="sec-title">Dates &amp; prix</h2>' + (dates.line ? '<div class="stay">' + dates.line + "</div>" : "") + datesListHtml + priceHtml + childrenHtml + (dates.note ? '<p class="note">' + dates.note + "</p>" : "") + "</section>"
        + '<div class="cta-final"><h3>' + (cta.title || "") + "</h3><p>" + (cta.text || "") + '</p><button class="btn btn-gold" onclick="ask(\'\')">Demander un devis sur WhatsApp</button></div>'
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
                more.textContent = "+" + (PHOTOS.length - max + 1) + " photos";
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
        if (b) b.textContent = hero.muted ? "Activer le son" : "Couper le son";
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
        return '<div class="video-soon"><strong>Vidéo bientôt disponible</strong><a href="' + value + '" target="_blank" rel="noopener">Ouvrir le lien</a></div>';
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
    // Galerie type Intrepid : ascenseur de photos sur fond clair.
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
        var txt = "Bonjour, je suis intéressé(e) par le voyage « " + TITLE + " »" + (label ? " (" + label + ")" : "") + ". Pouvez-vous me faire une proposition ?";
        window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(txt), "_blank");
    };
})();
