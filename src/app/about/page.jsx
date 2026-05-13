import Link from 'next/link'

export const metadata = {
  title: 'About — Voyages21',
  description: "L'histoire, l'expertise et les engagements de Voyages21, agence de voyages sur mesure au Maroc depuis 2000.",
}

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section style={{
        position: 'relative',
        height: '52vh', minHeight: '380px',
        backgroundImage: "url('https://images.unsplash.com/photo-1548813395-edd5373a8e72?w=1600&q=80')",
        backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginTop: '156px',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,35,20,0.72)' }} />
        <div style={{ position: 'relative', textAlign: 'center', padding: '0 2rem' }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C8A440', marginBottom: '0.9rem' }}>
            Depuis 2000
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3.4rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15 }}>
            L&apos;art du voyage<br /><em>cousu main</em>
          </h1>
        </div>
      </section>

      {/* ── Intro ── */}
      <section style={{ background: '#faf8f4', padding: '5rem 3rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.25rem', color: '#1B3A28', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            &ldquo;Depuis 2000, nous ne vendons pas des voyages — nous signons des expéditions.&rdquo;
          </p>
          <p style={{ fontSize: '0.92rem', color: '#555', lineHeight: 1.85 }}>
            Fondée à Marrakech, Voyages21 conçoit chaque itinéraire comme une pièce unique.
            Raids 4x4, circuits classiques, moto expédition, expériences authentiques —
            chaque projet naît d&apos;une écoute attentive et d&apos;une expertise terrain incomparable.
          </p>
        </div>
      </section>

      {/* ── Notre expertise ── */}
      <section id="expertise" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '520px' }}>
        <div style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=900&q=80')",
          backgroundSize: 'cover', backgroundPosition: 'center',
          minHeight: '440px',
        }} />
        <div style={{
          background: '#1B3A28', padding: '5rem 4rem',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.2rem',
        }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C8A440' }}>
            Notre expertise
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>
            25 ans d&apos;expéditions<br />au cœur du Maroc
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.85 }}>
            {/* À compléter — texte expertise Voyages21 */}
            Notre expertise est née sur les pistes. Dès l&apos;an 2000, nous accompagnons
            des voyageurs exigeants sur des terrains où la logistique fait la différence.
            Chaque guide, chaque véhicule, chaque itinéraire est sélectionné avec la rigueur
            d&apos;un professionnel du Rallye-Raid.
          </p>
          <blockquote style={{
            fontFamily: "'Playfair Display', serif", fontStyle: 'italic',
            fontSize: '1.1rem', color: '#C8A440',
            borderLeft: '2px solid #C8A440', paddingLeft: '1.2rem',
            lineHeight: 1.55,
          }}>
            &ldquo;Chaque expédition est une opération technique autant qu&apos;une aventure humaine.&rdquo;
          </blockquote>
          <Link href="/contact" style={{
            display: 'inline-block', marginTop: '0.5rem',
            padding: '0.82rem 2rem', background: '#C8A440',
            color: '#111', fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', textDecoration: 'none',
            borderRadius: '50px', width: 'fit-content',
          }}>
            Parlez-nous de votre projet
          </Link>
        </div>
      </section>

      {/* ── Nos engagements ── */}
      <section id="engagements" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '520px' }}>
        <div style={{
          background: '#0d2018', padding: '5rem 4rem',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.2rem',
        }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C8A440' }}>
            Nos engagements
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>
            Sécurité, authenticité<br />& responsabilité
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.85 }}>
            {/* À compléter — texte engagements Voyages21 */}
            Nous nous engageons à offrir des expériences respectueuses des communautés locales,
            de l&apos;environnement et de la culture marocaine. Sécurité maximale sur chaque
            itinéraire, partenaires locaux soigneusement sélectionnés, et transparence totale
            sur chaque prestation.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
            {[
              { titre: 'Sécurité',     texte: "Protocoles hérités de l'expérience Rallye-Raid" },
              { titre: 'Local',        texte: 'Partenaires & guides marocains certifiés' },
              { titre: 'Sur mesure',   texte: 'Chaque voyage est unique, aucun catalogue' },
              { titre: 'Responsable',  texte: "Respect des cultures et de l'environnement" },
            ].map(e => (
              <div key={e.titre} style={{ borderLeft: '2px solid rgba(200,164,64,0.4)', paddingLeft: '1rem' }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C8A440', marginBottom: '0.3rem' }}>{e.titre}</p>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.5 }}>{e.texte}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=900&q=80')",
          backgroundSize: 'cover', backgroundPosition: 'center',
          minHeight: '440px',
        }} />
      </section>

      {/* ── CTA final ── */}
      <section style={{ background: '#faf8f4', textAlign: 'center', padding: '6rem 3rem', borderTop: '1px solid rgba(200,164,64,0.2)' }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C8A440', marginBottom: '1rem' }}>
          Votre voyage
        </p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: '#1B3A28', marginBottom: '1rem', fontWeight: 700 }}>
          Prêt à voyager autrement ?
        </h2>
        <p style={{ fontSize: '0.92rem', color: '#666', margin: '1rem auto 2.5rem', maxWidth: '480px', lineHeight: 1.75 }}>
          Partagez votre vision, nous dessinons le reste.
        </p>
        <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/contact" style={{
            padding: '0.85rem 2.2rem', background: '#C8A440', color: '#111',
            fontFamily: "'DM Sans', sans-serif", fontSize: '0.76rem', fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none',
            borderRadius: '50px',
          }}>
            Demander un devis gratuit
          </Link>
          <a href="https://wa.me/212661181618" target="_blank" rel="noopener noreferrer" style={{
            padding: '0.85rem 2.2rem', background: 'transparent', color: '#1B3A28',
            fontFamily: "'DM Sans', sans-serif", fontSize: '0.76rem', fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none',
            border: '1.5px solid #1B3A28', borderRadius: '50px',
          }}>
            WhatsApp direct
          </a>
        </div>
      </section>
    </>
  )
}
