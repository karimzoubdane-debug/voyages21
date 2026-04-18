import Link from 'next/link'

export const metadata = {
  title: 'MICE & Groupes Maroc — Voyages21',
  description: 'Incentive, team building, evenementiel professionnel et groupes constitues au Maroc. Organisation complete depuis Marrakech.',
}

export default function MicePage() {
  return (
    <>
      <section style={{
        height: '55vh', minHeight: '380px',
        background: 'linear-gradient(135deg, #1B2D4F 0%, #111 100%)',
        display: 'flex', alignItems: 'flex-end',
        padding: '0 5rem 4rem', position: 'relative',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/images/hero-mice.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.35 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>Professionnel & Groupes</p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem,5vw,4rem)', color: 'white', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem' }}>
            MICE<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>& Groupes</em>
          </h1>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)', maxWidth: '520px', lineHeight: 1.65 }}>
            Incentive, team building, conventions, seminaires et voyages de groupes constitues. Voyages21 prend en charge l'integralite de votre programme.
          </p>
        </div>
      </section>

      <section style={{ padding: '5rem 3rem', background: 'var(--white)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p className="section-label">Nos services MICE</p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: 'var(--navy)', marginBottom: '2.5rem' }}>Ce que nous organisons</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
            {[
              { titre: 'Voyages Incentive', desc: 'Recompensez vos equipes avec une experience marocaine d\'exception. Circuits privatises, hebergements de prestige et activites exclusives.' },
              { titre: 'Team Building', desc: 'Rallye 4x4, cuisine en equipe, chasse au tresor dans les medinas. Des activites concues pour renforcer la cohesion de vos equipes.' },
              { titre: 'Conventions & Seminaires', desc: 'Organisation complete de vos evenements professionnels : transferts, hebergements, salles de reunion et programme social.' },
              { titre: 'Groupes Constitues', desc: 'Associations, clubs, colleges, retraites... Nous concevons des programmes adaptes a chaque profil de groupe, quel que soit l\'age ou la composition.' },
            ].map((s, i) => (
              <div key={i} style={{ borderTop: '3px solid var(--gold)', padding: '1.8rem', background: 'var(--light-gray)' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', color: 'var(--navy)', marginBottom: '0.6rem' }}>{s.titre}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--gray)', lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--navy)', padding: '3rem', textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', color: 'var(--white)', marginBottom: '0.75rem' }}>
              Parlons de votre projet
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem', maxWidth: '440px', margin: '0 auto 1.5rem', lineHeight: 1.7 }}>
              Chaque demande MICE est unique. Contactez-nous avec vos dates, effectif et objectifs — nous construisons votre programme sur mesure.
            </p>
            <Link href="/contact" className="btn-primary">Envoyer votre brief</Link>
          </div>
        </div>
      </section>
    </>
  )
}
