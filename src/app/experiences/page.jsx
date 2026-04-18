// ========== EXPERIENCES ==========
import Link from 'next/link'

export const metadata = {
  title: 'Experiences & Activites au Maroc — Voyages21',
  description: 'Montgolfiere, Quad, Atelier Cuisine, Diner chez un Chef, Hammam, Balade Dromadaire et bien plus. Activites a la carte ou integrees dans vos circuits.',
}

const activites = [
  { titre: 'Le Maroc Vu du Ciel — Montgolfiere', desc: 'Survol du desert, de Marrakech ou des plaines agricoles au lever du soleil. Une experience unique et inoubliable.', duree: 'Demi-journee' },
  { titre: 'Quad — Sensations fortes entre dunes et vallees', desc: 'Pilotage de quad sur les pistes desertiques autour de Marrakech ou dans le desert. Pour tous niveaux.', duree: '2-4 heures' },
  { titre: 'Rallye 4x4 dans le desert', desc: 'Une initiation ou perfectionnement a la conduite 4x4 dans les dunes et regs du desert marocain.', duree: '1 journee' },
  { titre: 'Atelier de Cuisine Marocaine', desc: 'Apprenez a preparer tajine, pastilla, couscous et patisseries avec un chef. Marche des epices inclus.', duree: '3-4 heures' },
  { titre: 'Atelier de Poterie', desc: 'Decouvrez l\'artisanat marocain avec un potier traditionnel. Facon sur tour et decoration a l\'ancienne.', duree: '2-3 heures' },
  { titre: 'Balade a Dos de Dromadaire', desc: 'Le Maroc au rythme nomade. Balade en bordure de desert ou dans les dunes au coucher du soleil.', duree: '1-2 heures' },
  { titre: 'Diner Chez l\'Habitant', desc: 'Saveurs partagees, respect des convictions. Un repas authentique dans une maison marocaine, avec la famille.', duree: 'Soiree' },
  { titre: 'Diner chez un Chef', desc: 'Une experience gastronomique dans un riad ou une propriete d\'exception. Cuisine marocaine elevee au rang d\'art.', duree: 'Soiree' },
  { titre: 'Diner de Gala', desc: 'Saveurs, spectacle et elegance marocaine. Soiree de gala avec show folklorique, musique et decor exceptionnel.', duree: 'Soiree' },
  { titre: 'Hammam Prive', desc: 'Un hammam traditionnel privatise pour votre groupe. Gommage, savon beldi, massage et repos.', duree: '1-2 heures' },
  { titre: 'Henne Experience', desc: 'L\'art ephemere au coeur des traditions. Decoration de henne par une artisane pour une immersion culturelle.', duree: '1 heure' },
  { titre: 'La Chasse au Tresor', desc: 'Decouverte ludique et culture locale. Jeu de piste dans les ruelles d\'une medina. Ideal groupes et familles.', duree: '2-3 heures' },
  { titre: 'Viree Culinaire', desc: 'Tour des souks, marches locaux et degustations avec un guide gourmet. De l\'argan aux epices rares.', duree: '3-4 heures' },
  { titre: 'Golf', desc: 'Parcours prestigieux autour de Marrakech et d\'Agadir. Organisation complete sur les meilleurs golfs du Maroc.', duree: '1 journee' },
  { titre: 'Surf', desc: 'Les meilleures vagues du Maroc : Essaouira, Taghazout, Agadir. Cours debutants ou sessions intermediaires.', duree: '2-4 heures' },
  { titre: 'Windsurf', desc: 'Les eaux du Maroc offrent des conditions ideales. Organisation complete a Essaouira et sur la cote atlantique.', duree: 'Demi-journee' },
  { titre: 'Yoga & Bien-etre', desc: 'Seances de yoga dans un cadre exceptionnel : toit-terrasse de riad, desert ou montagne. Harmonie et serenite.', duree: '1-2 heures' },
]

export default function ExperiencesPage() {
  return (
    <>
      <section style={{
        height: '55vh', minHeight: '380px',
        background: 'linear-gradient(135deg, #111 0%, #1B2D4F 50%, #C8860A 100%)',
        display: 'flex', alignItems: 'flex-end',
        padding: '0 5rem 4rem', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/images/hero-exp.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.4 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>A la carte</p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem,5vw,4rem)', color: 'white', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem' }}>
            Experiences<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>& Activites</em>
          </h1>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)', maxWidth: '520px', lineHeight: 1.65 }}>
            Pour chaque activite, une histoire. Disponibles a la carte ou integrees dans vos circuits sur mesure.
          </p>
        </div>
      </section>

      <section style={{ padding: '5rem 3rem', background: 'var(--white)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p className="section-label">17 experiences</p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: 'var(--navy)', marginBottom: '3rem' }}>Notre catalogue</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.2rem' }}>
            {activites.map((a, i) => (
              <div key={i} style={{ background: 'var(--light-gray)', padding: '1.5rem', borderLeft: '3px solid var(--gold)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '0.95rem', color: 'var(--navy)', lineHeight: 1.3 }}>{a.titre}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--gray)', lineHeight: 1.55, flex: 1 }}>{a.desc}</p>
                <span style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)' }}>{a.duree}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/contact" className="btn-primary">Ajouter a mon voyage</Link>
          </div>
        </div>
      </section>
    </>
  )
}
