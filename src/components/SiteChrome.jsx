'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

// Le menu et le pied de page du site public sont masqués sur l'espace
// d'administration (/admin) : c'est une zone privée en plein écran, sans le
// décor du site grand public.
export default function SiteChrome({ children }) {
  const pathname = usePathname() || '';
  // Zones en plein écran, sans le décor du site grand public :
  // l'administration (/admin) et les pages d'avis (à envoyer aux clients).
  const bare =
    pathname === '/admin' ||
    pathname.startsWith('/admin/') ||
    pathname === '/avis-affiche' ||
    pathname === '/avis-guide';

  if (bare) {
    return <main>{children}</main>;
  }

  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
      <Script src="/social-contact-bar.js" strategy="afterInteractive" />
    </>
  );
}
