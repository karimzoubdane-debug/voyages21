import './globals.css'

export const metadata = {
  title: 'V21 PILOT',
  description: 'Cockpit contacts & campagnes Voyages21',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
