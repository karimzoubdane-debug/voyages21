/* Service worker du Cockpit Projets Voyages21 (PWA).
   - App shell en cache (offline).
   - Les donnees (cockpit-data.json sur raw GitHub) restent en reseau d'abord :
     l'appli gere elle-meme son cache localStorage en secours. */
const CACHE = 'cockpit-v2';
const SHELL = [
  '/cockpit.html',
  '/cockpit.webmanifest',
  '/icons/cockpit-192.png',
  '/icons/cockpit-512.png',
  '/icons/cockpit-180.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  // Ne jamais mettre en cache les donnees GitHub (toujours frais).
  if (url.hostname.includes('raw.githubusercontent.com')) return;
  // App shell : cache d'abord, reseau en secours.
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(e.request).then((hit) => hit || fetch(e.request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match('/cockpit.html')))
    );
  }
});
