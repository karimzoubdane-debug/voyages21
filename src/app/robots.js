// robots.txt généré par Next.js (App Router).
// Autorise l'indexation du site public, bloque l'espace client, les API et le
// studio, et déclare le sitemap.
//
// Les adresses d'administration ne sont PLUS listées ici : robots.txt est un
// fichier public, les y nommer revenait à les annoncer à tout le monde. Depuis
// la phase 2.6, le middleware sert la page « introuvable » du site aux visiteurs
// ordinaires — un moteur qui les explorerait n'y trouve donc aucun contenu.

const SITE_URL = 'https://www.voyages21.com'

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/account',
        '/api/',
        '/studio',
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
