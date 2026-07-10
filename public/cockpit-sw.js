/* Service worker "kill-switch" : l'ancien Cockpit a déménagé sur v21-cockpit.vercel.app.
   Ce SW remplace l'ancien (cockpit-v4), purge tous les caches, se désinstalle
   et recharge les onglets pour qu'ils suivent la redirection. */
self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => caches.delete(k)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach((c) => c.navigate(c.url));
  })());
});
