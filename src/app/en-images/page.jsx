import Link from 'next/link'

export const metadata = {
  title: 'En Images — Voyages21',
  description: 'Galerie photos et vidéos du Maroc — Voyages21.',
}

export default function EnImagesPage() {
  return (
    <main style={{ paddingTop: '100px', minHeight: '60vh', background: 'var(--light-gray)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>Galerie</p>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: 'var(--navy)', marginBottom: '1rem' }}>En Images</h1>
        <p style={{ color: 'var(--gray)', marginBottom: '2rem' }}>Cette page est en cours de construction.</p>
        <Link href="/" className="btn-primary">Retour à l'accueil</Link>
      </div>
    </main>
  )
}
