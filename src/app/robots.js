// robots.txt généré par Next.js (App Router).
// Autorise l'indexation du site public, bloque l'admin, l'espace client et les API,
// et déclare le sitemap.

const SITE_URL = 'https://www.voyages21.com'

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',
        '/account',
        '/api/',
        '/studio',
        '/admin-produits.html',
        '/admin-cover.html',
        '/admin-medias.html',
        '/formulaire-voyage.html',
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
