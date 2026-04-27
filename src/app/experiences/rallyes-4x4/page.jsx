import Link from 'next/link'

export const metadata = {
  title: 'Rallyes 4x4 — Voyages21',
  description: '4 circuits exclusifs de Raid 4x4 au Maroc. Page en cours de construction.',
}

export default function RallyesPage() {
  return (
    <main style={{ paddingTop: '100px', minHeight: '60vh', background: 'var(--light-gray)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>Bientôt disponible</p>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: 'var(--navy)', marginBottom: '1rem' }}>Rallyes 4x4</h1>
        <p style={{ color: 'var(--gray)', marginBottom: '2rem' }}>Cette page est en cours de construction.</p>
        <Link href="/" className="btn-primary">Retour à l'accueil</Link>
      </div>
    </main>
  )
}
