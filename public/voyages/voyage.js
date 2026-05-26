/* Voyages21 — comportement partagé des pages voyage.
   Le bloc média (vidéo) et les miniatures (photos) sont alimentés en ligne
   via la médiathèque gérée par l'équipe (/api/media). Aucun média codé en dur. */
(function () {
    var body = document.body;
    var KEY = body.getAttribute('data-media-key');
    var WHATSAPP = body.getAttribute('data-whatsapp') || '212673280009';
    var TITLE = body.getAttribute('data-title') || 'ce voyage';

    var hero = document.getElementById('heroVideo');
    var heroBox = document.getElementById('hero');
    var voirVideoBtn = document.getElementById('voirVideo');
    var thumbsBox = document.getElementById('thumbs');

    var PHOTOS = [];

    function playHero() {
        if (!hero) return;
        hero.muted = true;
        var p = hero.play();
        if (p && p.catch) p.catch(function () {
            var once = function () { hero.removeEventListener('canplay', once); hero.muted = true; hero.play().catch(function () {}); };
            hero.addEventListener('canplay', once);
        });
    }

    function buildThumbs(images) {
        if (!thumbsBox) return;
        PHOTOS = (images || []).map(function (it) { return it && it.url; }).filter(Boolean);
        thumbsBox.innerHTML = '';
        if (!PHOTOS.length) { thumbsBox.style.display = 'none'; return; }
        thumbsBox.style.display = '';
        var max = 4, n = Math.min(PHOTOS.length, max);
        for (var i = 0; i < n; i++) {
            var d = document.createElement('div');
            d.className = 'thumb';
            d.style.backgroundImage = "url('" + PHOTOS[i] + "')";
            (function (idx) { d.onclick = function () { openPhoto(idx); }; })(i);
            if (i === max - 1 && PHOTOS.length > max) {
                var more = document.createElement('div');
                more.className = 'more';
                more.textContent = '+' + (PHOTOS.length - max + 1) + ' photos';
                d.appendChild(more);
            }
            thumbsBox.appendChild(d);
        }
    }

    function applyMedia(rec) {
        rec = rec || {};
        if (rec.videoUrl && hero) {
            if (rec.images && rec.images[0] && rec.images[0].url) hero.setAttribute('poster', rec.images[0].url);
            hero.src = rec.videoUrl;
            playHero();
        } else {
            if (hero) hero.style.display = 'none';
            var bg = (rec.images && rec.images[0] && rec.images[0].url) ? rec.images[0].url : null;
            if (bg && heroBox) heroBox.style.backgroundImage = "url('" + bg + "')";
            var st = document.getElementById('soundBtn'); if (st) st.style.display = 'none';
        }
        if (voirVideoBtn) {
            if (rec.videoLink) { voirVideoBtn.style.display = ''; voirVideoBtn.onclick = function () { openVideo(rec.videoLink); }; }
            else { voirVideoBtn.style.display = 'none'; }
        }
        buildThumbs(rec.images);
    }

    fetch('/api/media', { cache: 'no-store' })
        .then(function (r) { return r.ok ? r.json() : {}; })
        .then(function (m) { applyMedia(m && m[KEY]); })
        .catch(function () { applyMedia(null); });

    window.toggleSound = function () {
        if (!hero) return;
        hero.muted = !hero.muted;
        var b = document.getElementById('soundBtn');
        if (b) b.textContent = hero.muted ? 'Activer le son' : 'Couper le son';
        if (!hero.muted) hero.play().catch(function () {});
    };

    window.toggleDay = function (btn) { btn.parentElement.classList.toggle('open'); };

    var links = Array.prototype.slice.call(document.querySelectorAll('.tabs a'));
    links.forEach(function (a) {
        a.addEventListener('click', function (e) {
            e.preventDefault();
            var t = document.querySelector(a.getAttribute('href'));
            if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 52, behavior: 'smooth' });
        });
    });
    window.addEventListener('scroll', function () {
        var y = window.scrollY + 90, cur = links[0];
        links.forEach(function (a) {
            var t = document.querySelector(a.getAttribute('href'));
            if (t && t.offsetTop <= y) cur = a;
        });
        links.forEach(function (a) { a.classList.toggle('active', a === cur); });
    });

    function extractYouTubeId(u) {
        u = String(u || '').trim();
        if (/^[A-Za-z0-9_-]{11}$/.test(u)) return u;
        var m = u.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([A-Za-z0-9_-]{11})/);
        return m ? m[1] : '';
    }
    function buildLinkEmbed(value) {
        value = String(value || '').trim();
        if (!value) return '';
        if (/^data:video\//i.test(value) || /\.(mp4|webm|ogg)(\?|$)/i.test(value)) {
            return '<video src="' + value + '" controls autoplay playsinline></video>';
        }
        var vm = value.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
        if (vm) return '<iframe src="https://player.vimeo.com/video/' + vm[1] + '?autoplay=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
        var yt = extractYouTubeId(value);
        if (yt) return '<iframe src="https://www.youtube.com/embed/' + yt + '?autoplay=1&rel=0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
        return '<div class="video-soon"><strong>Vidéo bientôt disponible</strong><a href="' + value + '" target="_blank" rel="noopener">Ouvrir le lien</a></div>';
    }
    function showModal(html) {
        document.getElementById('vframe').innerHTML = html;
        document.getElementById('vmodal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    window.openVideo = function (link) { showModal(buildLinkEmbed(link)); };
    window.openPhoto = function (idx) {
        var url = PHOTOS[idx]; if (!url) return;
        showModal('<img src="' + url + '" alt="">');
    };
    window.closeVideo = function () {
        document.getElementById('vframe').innerHTML = '';
        document.getElementById('vmodal').classList.remove('active');
        document.body.style.overflow = '';
    };

    window.ask = function (label) {
        var txt = 'Bonjour, je suis intéressé(e) par le voyage « ' + TITLE + ' »' + (label ? ' (' + label + ')' : '') + '. Pouvez-vous me faire une proposition ?';
        window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(txt), '_blank');
    };
})();
