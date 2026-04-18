import Link from 'next/link'

export const metadata = {
  title: 'A propos — Voyages21, 25 ans d\'expertise au Maroc',
  description: 'Depuis l\'an 2000, Voyages21 conçoit des voyages sur mesure au Maroc depuis Marrakech. 25 ans d\'experience, logistique de pointe, agence cousu main.',
}

export default function AboutPage() {
  return (
    <>
      <section style={{
        height: '55vh', minHeight: '380px',
        background: 'var(--navy)',
        display: 'flex', alignItems: 'flex-end',
        padding: '0 5rem 4rem', position: 'relative',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/images/about-hero.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.35 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>Depuis l'an 2000</p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem,5vw,4rem)', color: 'white', fontWeight: 700, lineHeight: 1.1 }}>
            25 ans de passion<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>pour le Maroc</em>
          </h1>
        </div>
      </section>

      <section style={{ padding: '5rem 3rem', background: 'var(--white)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '4rem' }}>
            <div>
              <p className="section-label">Notre histoire</p>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: 'var(--navy)', marginBottom: '1.2rem', lineHeight: 1.2 }}>
                L'ingenierie du voyage au service de l'emotion
              </h2>
            </div>
            <div>
              <p style={{ fontSize: '0.9rem', color: 'var(--gray)', lineHeight: 1.8, marginBottom: '1rem' }}>
                Depuis l'an 2000, Voyages21 conçoit des aventures sur-mesure pour une clientele de passionnes et de pilotes exigeants. Nous ne vendons pas de simples voyages, mais une logistique de pointe heritee de l'esprit "Rallye-Raid".
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--gray)', lineHeight: 1.8 }}>
                Chaque expedition est pensee comme une operation technique, ou securite, precision et passion du terrain convergent. Notre signature : un Maroc revele avec justesse, elegance et engagement.
              </p>
            </div>
          </div>

          <blockquote style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '1.5rem', color: 'var(--navy)', borderLeft: '4px solid var(--gold)', paddingLeft: '2rem', marginBottom: '4rem', lineHeight: 1.4 }}>
            "Depuis 2000, VOYAGES21 façonne des voyages sur mesure au Maroc avec exigence, passion et precision."
          </blockquote>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.5rem', marginBottom: '4rem' }}>
            {[
              { n: '25+', l: 'Annees d\'experience' },
              { n: '2000', l: 'Annee de creation' },
              { n: '50+', l: 'Activites & circuits' },
              { n: '24/7', l: 'Assistance terrain' },
            ].map(s => (
              <div key={s.n} style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--light-gray)', borderTop: '3px solid var(--gold)' }}>
                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: 'var(--navy)', fontWeight: 700, display: 'block' }}>{s.n}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--gray)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.l}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem', marginBottom: '4rem' }}>
            {[
              { titre: 'Expertise Terrain', texte: 'Des traces reconnus et testes, adaptes au niveau de chaque pilote. Chaque piste est validee par nos equipes avant d\'etre proposee.' },
              { titre: 'Securite Totale', texte: 'Chaque expedition est encadree par une equipe technique complete : Guide-pisteur, mecanicien specialise et vehicule d\'assistance dedie.' },
              { titre: 'Voyage Cousu Main', texte: 'Chaque projet est pense comme une creation exclusive, alliant authenticite, confort et maitrise logistique. Nous ne suivons pas les standards — nous les redefinissons.' },
            ].map(p => (
              <div key={p.titre} style={{ padding: '1.8rem', background: 'var(--navy)' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', color: 'var(--gold)', marginBottom: '0.6rem' }}>{p.titre}</h3>
                <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7 }}>{p.texte}</p>
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--cream)', padding: '3rem', borderTop: '2px solid var(--gold)', textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', color: 'var(--navy)', marginBottom: '0.75rem' }}>
              Bd Prince My Abdellah, Imm. Taiba — 1er Etage, Appt. N°1, Marrakech
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--gray)', marginBottom: '0.4rem' }}>contact@voyages21.com</p>
            <p style={{ fontSize: '0.9rem', color: 'var(--gray)', marginBottom: '1.5rem' }}>+212 524 331 007 — +212 661 181 618</p>
            <Link href="/contact" className="btn-primary">Nous contacter</Link>
          </div>
        </div>
      </section>
    </>
  )
}
