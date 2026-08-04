/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // La racine du site sert la vraie page d'accueil (indexable par Google),
      // qui contient déjà sa propre vidéo hero. L'URL reste "/" (pas de
      // redirection) : Google lit l'accueil, pas l'ancien splash vidéo.
      { source: '/', destination: '/design/homepage-v2-luxe.html' },
    ]
  },
};

export default nextConfig;
