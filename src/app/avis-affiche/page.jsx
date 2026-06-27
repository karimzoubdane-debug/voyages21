// Affiche « cliquable » à partager (WhatsApp, mail…).
// On colle le lien https://www.voyages21.com/avis-affiche : WhatsApp affiche
// directement le visuel de l'affiche en aperçu (balises Open Graph) ; la page
// montre des consignes douces pour un avis utile, puis un grand bouton vers la
// fenêtre « Laisser un avis » Google Business. Pensé pour les personnes âgées.

const GOOGLE_AVIS_URL =
  'https://search.google.com/local/writereview?placeid=ChIJPaMFhYzurw0R50-J4mRz7oc'

// Consignes douces (jamais de faux avis — simples suggestions authentiques)
const CONSEILS = [
  ['⭐', 'Mettez 5 étoiles si vous avez été satisfait'],
  ['📍', 'Citez votre destination ou circuit (Marrakech, désert, Hajj, croisière…)'],
  ['💬', 'Dites ce qui vous a marqué : organisation, accompagnement, hôtels…'],
  ['🙋', 'Mentionnez le prénom de votre conseiller (Karim, Wafa, Fouad…)'],
  ['📸', 'Ajoutez une photo de votre voyage, ça fait toute la différence'],
]

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
    <div
      style={{
        minHeight: '100vh',
        background: '#F5F0E8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 16px 48px',
        fontFamily: "'DM Sans', system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        color: '#152E1F',
      }}
    >
      <div style={{ width: '100%', maxWidth: 540 }}>
        {/* L'affiche : cliquable aussi */}
        <a href={GOOGLE_AVIS_URL} aria-label="Laisser un avis à Voyages 21 sur Google">
          <img
            src="/images/affiche-avis.png"
            alt="Laissez un avis à Voyages 21 sur Google"
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
              borderRadius: 16,
              boxShadow: '0 12px 40px rgba(27,58,40,.18)',
            }}
          />
        </a>

        {/* Consignes douces pour un avis utile */}
        <section
          style={{
            background: '#fff',
            border: '2px solid #C8A440',
            borderRadius: 16,
            padding: '22px 22px 6px',
            margin: '22px 0',
            boxShadow: '0 8px 28px rgba(27,58,40,.10)',
          }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: 'italic',
              fontSize: 23,
              color: '#1B3A28',
              margin: '0 0 14px',
              textAlign: 'center',
            }}
          >
            Pour un avis qui nous aide vraiment 🌟
          </h2>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {CONSEILS.map(([emoji, texte]) => (
              <li
                key={texte}
                style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                  fontSize: 16.5,
                  lineHeight: 1.5,
                  color: '#2c3a31',
                  padding: '9px 0',
                  borderBottom: '1px solid #efe7d8',
                }}
              >
                <span style={{ fontSize: 20, flexShrink: 0 }}>{emoji}</span>
                <span>{texte}</span>
              </li>
            ))}
          </ul>
          <p style={{ fontSize: 13.5, color: '#7a8a7f', textAlign: 'center', margin: '14px 0 16px' }}>
            Ce sont juste des idées — écrivez avec vos propres mots, en toute sincérité 🙏
          </p>
        </section>

        {/* Grand bouton d'action */}
        <a
          href={GOOGLE_AVIS_URL}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            background: '#1B3A28',
            color: '#fff',
            fontSize: 21,
            fontWeight: 700,
            textDecoration: 'none',
            padding: '20px 24px',
            borderRadius: 60,
            border: '3px solid #C8A440',
            boxShadow: '0 12px 30px rgba(27,58,40,.25)',
            textAlign: 'center',
          }}
        >
          ⭐ Laisser mon avis sur Google
        </a>

        <a
          href="/avis-guide"
          style={{
            display: 'block',
            textAlign: 'center',
            marginTop: 16,
            fontSize: 15.5,
            color: '#1B3A28',
            fontWeight: 600,
            textDecoration: 'underline',
          }}
        >
          ✍️ Pas sûr de quoi écrire ? Laissez-vous guider →
        </a>

        <p style={{ textAlign: 'center', fontSize: 14, color: '#C8A440', fontWeight: 700, marginTop: 16 }}>
          Merci pour votre confiance — Voyages 21
        </p>
      </div>
    </div>
  )
}
