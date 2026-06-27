// Affiche « cliquable » à partager (WhatsApp, mail…).
// On colle le lien https://www.voyages21.com/avis-affiche : WhatsApp affiche
// directement le visuel de l'affiche en aperçu (balises Open Graph) et toute
// la page est cliquable → fenêtre « Laisser un avis » Google Business.
// Pensé pour les personnes âgées : un visuel + un seul geste.

const GOOGLE_AVIS_URL =
  'https://search.google.com/local/writereview?placeid=ChIJPaMFhYzurw0R50-J4mRz7oc'

export const metadata = {
  metadataBase: new URL('https://www.voyages21.com'),
  title: 'Laissez un avis à Voyages 21 ⭐',
  description:
    'Vous avez voyagé avec nous ? Notez-nous sur Google en quelques secondes.',
  openGraph: {
    title: 'Laissez un avis à Voyages 21 ⭐',
    description: 'Appuyez sur l’affiche et notez-nous sur Google en quelques secondes.',
    url: '/avis-affiche',
    type: 'website',
    images: [
      {
        url: '/images/affiche-avis.png',
        width: 1080,
        height: 1350,
        alt: 'Laissez un avis à Voyages 21 sur Google',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Laissez un avis à Voyages 21 ⭐',
    images: ['/images/affiche-avis.png'],
  },
}

export default function AvisAffichePage() {
  return (
    <a
      href={GOOGLE_AVIS_URL}
      aria-label="Laisser un avis à Voyages 21 sur Google"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#F5F0E8',
        textDecoration: 'none',
        padding: '16px',
      }}
    >
      <img
        src="/images/affiche-avis.png"
        alt="Laissez un avis à Voyages 21 sur Google"
        style={{
          display: 'block',
          width: '100%',
          maxWidth: '540px',
          height: 'auto',
          borderRadius: '16px',
          boxShadow: '0 12px 40px rgba(27,58,40,.18)',
        }}
      />
    </a>
  )
}
