import './globals.css'
import SiteChrome from '@/components/SiteChrome'
import ScrollToTop from '@/components/ScrollToTop'
import Script from 'next/script'

export const metadata = {
  metadataBase: new URL('https://www.voyages21.com'),
  title: 'Voyages21 — Le Maroc Cousu Main depuis 2000',
  description: 'Agence de voyages sur mesure au Maroc. Circuits classiques, Raid 4x4, Moto Expédition, Experiences. Depuis Marrakech, depuis 2000.',
  keywords: 'voyage maroc, circuit maroc, raid 4x4 maroc, moto expedition maroc, agence voyage marrakech, maroc sur mesure',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Voyages21 — Le Maroc Cousu Main',
    description: 'Circuits, Raids 4x4, Moto Expédition et Expériences au Maroc sur mesure.',
    url: 'https://www.voyages21.com',
    siteName: 'Voyages21',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/logo-voyages21.png',
        width: 512,
        height: 512,
        alt: 'Voyages21 — Agence de voyages sur mesure au Maroc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Voyages21 — Le Maroc Cousu Main',
    description: 'Circuits, Raids 4x4, Moto Expédition et Expériences au Maroc sur mesure.',
    images: ['/logo-voyages21.png'],
  },
}

// Données structurées Schema.org : identité de l'agence pour le Knowledge Graph Google.
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Voyages21',
  description: 'Agence de voyages (DMC) sur mesure au Maroc depuis 2000 : circuits classiques, Raid 4x4, Moto Expédition, MICE et expériences.',
  url: 'https://www.voyages21.com',
  logo: 'https://www.voyages21.com/logo-voyages21.png',
  image: 'https://www.voyages21.com/logo-voyages21.png',
  foundingDate: '2000',
  founder: { '@type': 'Person', name: 'Karim Zoubdane' },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Marrakech',
    addressCountry: 'MA',
  },
  areaServed: { '@type': 'Country', name: 'Maroc' },
  knowsLanguage: ['fr', 'en', 'de', 'es'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        {/* Cookieyes — Banniere RGPD obligatoire (visiteurs europeens) */}
        {/* IMPORTANT : remplacer VOTRE_CLE_COOKIEYES par votre ID apres inscription sur cookieyes.com */}
        <Script
          id="cookieyes"
          src="https://cdn-cookieyes.com/client_data/VOTRE_CLE_COOKIEYES/script.js"
          strategy="afterInteractive"
        />
      </head>
      <body>
        {/* Donnees structurees Schema.org — identite de l'agence */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SiteChrome>{children}</SiteChrome>

        {/* Scroll to top */}
        <ScrollToTop />
      </body>
    </html>
  )
}
