// Assistant d'avis : page séparée à envoyer par WhatsApp / email.
// Le client choisit le sujet (voyage / service accueil / autre), coche ce qui
// lui a plu, et la page rédige un avis qu'il copie puis colle dans Google.
// Le composant interactif est dans AvisGuide.jsx (client component) ; cette
// page serveur porte les balises Open Graph pour l'aperçu WhatsApp/email.

import AvisGuide from './AvisGuide'

export const metadata = {
  metadataBase: new URL('https://www.voyages21.com'),
  title: 'Laissez un avis à Voyages 21 — assistant ⭐',
  description:
    'Répondez à 3 questions, on rédige votre avis, vous le collez sur Google en 2 gestes.',
  openGraph: {
    title: 'Laissez un avis à Voyages 21 ⭐',
    description: 'On vous aide à écrire votre avis Google en 30 secondes.',
    url: '/avis-guide',
    type: 'website',
    images: [
      {
        url: '/images/plaquette-avis.png',
        width: 1080,
        height: 1350,
        alt: 'Laissez un avis à Voyages 21',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Laissez un avis à Voyages 21 ⭐',
    images: ['/images/plaquette-avis.png'],
  },
}

export default function AvisGuidePage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#F5F0E8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px 16px 48px',
        fontFamily: "'DM Sans', system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        color: '#152E1F',
      }}
    >
      <AvisGuide />
    </div>
  )
}
