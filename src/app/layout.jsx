import './globals.css'
import SiteChrome from '@/components/SiteChrome'
import ScrollToTop from '@/components/ScrollToTop'
import Script from 'next/script'

export const metadata = {
  title: 'Voyages21 — Le Maroc Cousu Main depuis 2000',
  description: 'Agence de voyages sur mesure au Maroc. Circuits classiques, Raid 4x4, Moto Expédition, Experiences. Depuis Marrakech, depuis 2000.',
  keywords: 'voyage maroc, circuit maroc, raid 4x4 maroc, moto expedition maroc, agence voyage marrakech, maroc sur mesure',
  openGraph: {
    title: 'Voyages21 — Le Maroc Cousu Main',
    description: 'Circuits, Raids 4x4, Moto Expédition et Expériences au Maroc sur mesure.',
    url: 'https://voyages21.com',
    siteName: 'Voyages21',
    locale: 'fr_FR',
    type: 'website',
  },
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
        <SiteChrome>{children}</SiteChrome>

        {/* Scroll to top */}
        <ScrollToTop />
      </body>
    </html>
  )
}
