import Link from 'next/link'

export const metadata = {
  title: 'Circuits Classiques & Autotours Maroc — Voyages21',
  description: 'Circuits au Maroc en bus/minibus avec guide ou en autotour (voiture autonome). Villes imperiales, desert, Sahara, montagnes. Sur mesure depuis Marrakech.',
}

const circuits = [
  { duree: '18 jours', titre: 'Couleurs du Maroc — Entre Medinas et Sahara', desc: 'De Marrakech a Chefchaouen, en passant par les medinas, le Sahara et la cote atlantique. Le Maroc dans toute sa diversite.', tags: ['Desert', 'Villes', 'Montagnes', 'Plages'] },
  { duree: '18 jours', titre: 'Maroc Premium : entre montagnes, desert et mer', desc: 'De Chefchaouen aux dunes de l\'Erg Chebbi, des medinas sacrees aux embruns d\'Essaouira. Une ode au Maroc profond.', tags: ['Premium', 'Desert', 'Villes', 'Mer'] },
  { duree: '12 jours', titre: 'Au fil des dynasties et des dunes', desc: 'Les grandes capitales du Maroc imperial, les villages suspendus du Moyen Atlas, les gorges du Sud et les dunes du desert.', tags: ['Imperial', 'Desert', 'Culture'] },
  { duree: '12 jours', titre: 'Maroc en Famille — Souks, sable et saveurs', desc: 'Circuit familial avec activites pour enfants des 5 ans. Marrakech, cote atlantique, desert et kasbahs. 12 activites incluses.', tags: ['Famille', 'Desert', 'Activites'] },
  { duree: '11 jours', titre: 'Decouverte du Sud Marocain', desc: 'Les paysages les plus spectaculaires du Sud : gorges du Dades, Erg Chebbi, vallee du Draa, kasbahs et palmeraies.', tags: ['Sud', 'Desert', 'Kasbahs'] },
  { duree: '10 jours', titre: 'Les Incontournables du Maroc', desc: 'Marrakech, ruelles bleues de Chefchaouen, Fes, desert de l\'Erg Chebbi. L\'essentiel du Maroc en 10 jours d\'emotions.', tags: ['Incontournables', 'Desert', 'Villes'] },
  { duree: '9 jours', titre: 'Nord du Maroc — Entre Rif et Royaumes', desc: 'Casablanca, Rabat, Tanger, Chefchaouen et Fes. Le nord du Maroc entre heritage colonial, medinas et paysages du Rif.', tags: ['Nord', 'Villes', 'Culture'] },
  { duree: '8 jours', titre: 'Jewels of Morocco — De Casablanca au Sahara', desc: 'De Casablanca aux ruelles bleues de Chefchaouen — les villes les plus iconiques et paysages du Maroc en 8 jours.', tags: ['8 jours', 'Desert', 'Villes'] },
  { duree: '8 jours', titre: 'Femmes du Maroc — Rencontres, savoirs et traditions', desc: 'De Marrakech aux vallees secretes du Haut Atlas, guidee par une femme amazighe. Une celebration du feminin marocain.', tags: ['Femmes', 'Atlas', 'Culture'] },
  { duree: '8 jours', titre: 'L\'echo des kasbahs en velo electrique', desc: 'Une traversee unique des kasbahs de legende et des dunes de l\'Erg Lihoudi en velo electrique. Chegaga, Ait Ben Haddou.', tags: ['Velo', 'Desert', 'Kasbahs'] },
  { duree: '6 jours', titre: 'Du Haut Atlas au coeur de Fes', desc: 'Depuis Marrakech : franchissement du Haut Atlas, kasbahs de legende, bivouac au desert et decouverte de Fes.', tags: ['Atlas', 'Desert', 'Fes'] },
]

export default function ClassiquesPage() {
  return (
    <>
      {/* HERO */}
      <section style={{
        height: '65vh', minHeight: '440px',
        background: 'linear-gradient(135deg, #1B2D4F 0%, #2d1a0e 60%, #8C2020 100%)',
        display: 'flex', alignItems: 'flex-end',
        padding: '0 5rem 5rem', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url('/images/hero-classiques.jpg')",
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.4,
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>
            12 circuits — Bus, minibus ou voiture
          </p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem,5vw,4rem)', color: 'white', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem' }}>
            Circuits Classiques<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>& Autotours</em>
          </h1>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)', maxWidth: '560px', lineHeight: 1.65 }}>
            Le meme itineraire, votre rythme. Choisissez le bus ou minibus avec guide, ou partez en autotour en voiture a votre guise.
          </p>
        </div>
      </section>

      {/* BANDEAU COUSU MAIN */}
      <div className="cousu-main-banner">
        Nos circuits se vivent en <strong>solo, a deux, en famille ou entre amis</strong> — en bus, en minibus avec guide, ou en autotour en voiture.{' '}
        Chacun sa formule, chacun son desir. <strong>Voyages21, l'agence cousu main depuis 2000.</strong>
      </div>

      {/* BUS vs AUTOTOUR */}
      <section style={{ padding: '4rem 3rem', background: 'var(--white)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p className="section-label" style={{ textAlign: 'center' }}>Votre mode de voyage</p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: 'var(--navy)', textAlign: 'center', marginBottom: '2.5rem' }}>
            Meme circuit, votre choix
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {[
              {
                titre: 'En bus ou minibus avec guide',
                desc: 'Un guide francophone ou anglophone dedie, un vehicule confortable, toute la logistique geree. Vous profitez, nous conduisons. Ideal pour les familles, groupes et solo.',
                items: ['Guide expert francophone/anglophone', 'Vehicule climatise 4x4 ou minibus selon groupe', 'Programme jour par jour geree pour vous', 'Flexibilite sur les horaires et arrets'],
              },
              {
                titre: 'En autotour — Voiture autonome',
                desc: 'Le meme itineraire, mais a votre rythme, avec votre propre voiture ou vehicule de location. Road book detaille et assistance telephonique incluse.',
                items: ['Road book complet avec GPS et points d\'interet', 'Reservations hebergements organisees', 'Assistance telephonique Voyages21 a tout moment', 'Liberte totale des horaires et des arrets'],
              },
            ].map(f => (
              <div key={f.titre} style={{ borderTop: '4px solid var(--gold)', padding: '2rem', background: 'var(--light-gray)' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.25rem', color: 'var(--navy)', marginBottom: '0.75rem' }}>{f.titre}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--gray)', lineHeight: 1.65, marginBottom: '1.2rem' }}>{f.desc}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {f.items.map((item, i) => (
                    <li key={i} style={{ fontSize: '0.82rem', color: 'var(--gray)', paddingLeft: '1.2rem', position: 'relative', lineHeight: 1.5 }}>
                      <span style={{ position: 'absolute', left: 0, color: '#22c55e', fontWeight: 700 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LISTE CIRCUITS */}
      <section style={{ padding: '4rem 3rem', background: 'var(--light-gray)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p className="section-label">12 itineraires</p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem,3vw,2.4rem)', color: 'var(--navy)', marginBottom: '2.5rem' }}>
            Nos circuits 2026
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.2rem' }}>
            {circuits.map((c, i) => (
              <div key={i} style={{ background: 'var(--white)', borderTop: '3px solid var(--gold)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)' }}>{c.duree}</span>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', color: 'var(--navy)', lineHeight: 1.3, flex: 1 }}>{c.titre}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--gray)', lineHeight: 1.55 }}>{c.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.5rem' }}>
                  {c.tags.map(t => (
                    <span key={t} style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'var(--light-gray)', color: 'var(--navy)', padding: '0.15rem 0.5rem' }}>{t}</span>
                  ))}
                </div>
                <Link href="/contact" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gold)', textDecoration: 'none', marginTop: '0.5rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Demander ce circuit →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--navy)', textAlign: 'center', padding: '5rem 3rem' }}>
        <p className="section-label" style={{ color: 'var(--gold)' }}>Votre voyage sur mesure</p>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--white)', marginBottom: '1rem' }}>
          Aucun circuit n'est identique
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto 2rem' }}>
          Chaque programme est modulable : duree, hebergements, activites integrees, mode de transport. Parlez-nous de votre projet.
        </p>
        <Link href="/contact" className="btn-primary" style={{ marginRight: '1rem' }}>Demander un devis gratuit</Link>
        <a href="https://wa.me/212661181618" target="_blank" rel="noopener noreferrer" className="btn-outline">
          WhatsApp direct
        </a>
      </section>
    </>
  )
}
