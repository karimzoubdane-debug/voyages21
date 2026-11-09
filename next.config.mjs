/** @type {import('next').NextConfig} */
const nextConfig = {
  // L'offre Maroc n'est plus sur ce site (outgoing) : elle vit sur le site incoming
  // www.moroccovoyages21.com (choix de Karim, 08/11/2026). Les 7 anciennes pages Maroc
  // (Expériences, Circuits classiques, Moto, Raid 4x4, Autotours…) sont supprimées ; leurs
  // adresses, déjà connues de Google, mènent pour de bon à la page Maroc, qui donne le lien
  // et le code QR du site incoming.
  async redirects() {
    return [
      { source: '/experiences', destination: '/voyages/destinations/maroc.html', permanent: true },
      { source: '/experiences/:page', destination: '/voyages/destinations/maroc.html', permanent: true },
      { source: '/circuits/:page', destination: '/voyages/destinations/maroc.html', permanent: true },
      // Les 8 fiches voyage Maroc du catalogue (retirées le 09/11/2026, même raison) :
      { source: '/voyages/maroc-merzouga.html', destination: '/voyages/destinations/maroc.html', permanent: true },
      { source: '/voyages/maroc-bin-el-ouidane.html', destination: '/voyages/destinations/maroc.html', permanent: true },
      { source: '/voyages/maroc-dakhla.html', destination: '/voyages/destinations/maroc.html', permanent: true },
      { source: '/voyages/maroc-circuit-imperial-south.html', destination: '/voyages/destinations/maroc.html', permanent: true },
      { source: '/voyages/maroc-circuit-imperial-cities.html', destination: '/voyages/destinations/maroc.html', permanent: true },
      { source: '/voyages/maroc-circuit-best-morocco.html', destination: '/voyages/destinations/maroc.html', permanent: true },
      { source: '/voyages/maroc-circuit-discover-kingdom.html', destination: '/voyages/destinations/maroc.html', permanent: true },
      { source: '/voyages/maroc-circuit-grand-discovery.html', destination: '/voyages/destinations/maroc.html', permanent: true },
    ]
  },
  async rewrites() {
    return [
      // La racine du site sert la vraie page d'accueil (indexable par Google),
      // qui contient déjà sa propre vidéo hero. L'URL reste "/" (pas de
      // redirection) : Google lit l'accueil, pas l'ancien splash vidéo.
      { source: '/', destination: '/design/homepage-v2-luxe.html' },
      // Page perso « Pékin — mes liens » (séjour du 13 au 18/10/2026), non indexée.
      { source: '/beijing', destination: '/beijing/index.html' },
    ]
  },
};

export default nextConfig;
