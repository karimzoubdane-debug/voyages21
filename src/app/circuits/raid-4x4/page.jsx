import Link from 'next/link'

export const metadata = {
  title: 'Raid 4x4 Collection 2026 — Voyages21',
  description: '4 circuits exclusifs de Raid 4x4 au Maroc : Chegaga, Route des Caravanes, Folies Berberes, Perle du Sud. Logistique de pointe, guide-pisteur, assistance 24h/7.',
}

const circuits = [
  {
    tag: 'Circuit phare',
    duree: '4 jours',
    titre: 'Raid Dunes & SSV : De l\'Atlas a Chegaga',
    accroche: 'Une immersion technique alliant le franchissement de dunes geantes, le pilotage de SSV et la decouverte des joyaux du Sud.',
    itineraire: ['J1 — Marrakech', 'J2 — Chegaga', 'J3 — Ait Ben Haddou', 'J4 — Marrakech'],
    points: ['Pilotage SSV sur les pistes sablonneuses de Chegaga', 'Nuit en bivouac nomade a Msoufa avec troupe folklorique', 'Visite de la Kasbah d\'Ait Ben Haddou — UNESCO'],
    inclus: ['4x4 Self-Drive — Location 4x4 (4 pers/vehicule) avec Gaz-oil inclus', '04 vehicules SSV mis a disposition pour les etapes de sable', 'Guide-pisteur, mecanicien et 02 vehicules d\'assistance', 'Pension complete avec boissons incluses a chaque repas'],
  },
  {
    tag: 'Expedition Grand Sud',
    duree: '8 jours',
    titre: 'La Route des Caravanes : Entre Oasis et Dunes Chantantes',
    accroche: 'Une expedition conçue comme un voyage dans le temps, suivant les traces des anciennes caravanes transsahariennes.',
    itineraire: ['J1-2 — Marrakech', 'J3 — Zagora', 'J4 — Chegaga', 'J5 — Oasis de Fint', 'J6 — Ait Ben Haddou', 'J7-8 — Marrakech'],
    points: ['Visite de la bibliotheque medievale de Tamegroute', 'Traversee technique des regs et oueds pour atteindre Chegaga — nuit sous les etoiles', 'Passage par le col du Tizi n\'Tichka (2260 m)'],
    inclus: ['Land Rover ou Toyota prepares pour les pistes desertiques', 'Guide-pisteur expert — connaissance approfondie de la region', 'Vehicule d\'assistance et mecanicien pour les zones isolees', 'Riads de charme a Marrakech et bivouacs nomades traditionnels'],
  },
  {
    tag: 'Montagnes & Sable',
    duree: '8 jours',
    titre: 'Folies Berberes — Le Raid des Contrastes',
    accroche: 'Une traversee spectaculaire reliant les cols du Haut Atlas aux dunes geantes du Tafilalet. Des cimes de l\'Atlas aux dunes de Merzouga.',
    itineraire: ['J1 — Marrakech', 'J2 — Telouet', 'J3 — Zagora', 'J4 — Merzouga', 'J5 — Todra', 'J6-7 — Marrakech', 'J8 — Depart'],
    points: ['Franchissement du col du Tizi n\'Tichka (2260 m)', 'Dunes de l\'Erg Chebbi a 300 m de hauteur — experience de pilotage pur sable', 'Concept exclusif : 4x4, bivouacs nomades, soirees orientales et immersion berbere'],
    inclus: ['Location 4x4 Expert (Land Rover/Toyota) avec briefing technique', 'Pension complete avec dejeuners typiques et soirees de gala', 'Guide-pisteur, mecanicien dedie et vehicule d\'assistance 4x4', 'Bivouac sous tentes nomades et hebergement en Kasbahs historiques'],
  },
  {
    tag: 'Perle du Sud',
    duree: '8 jours',
    titre: 'La Trace des Caravanes : De l\'Atlas aux Oasis Secretes',
    accroche: 'Une boucle technique conçue pour les pilotes amoureux d\'histoire et de paysages insolites. Les palmeraies les plus denses du Royaume.',
    itineraire: ['J1 — Arrivee Marrakech', 'J2 — Haut Atlas', 'J3 — Vallee du Draa', 'J4 — Zagora & Oasis', 'J5 — Boumalne Dades', 'J6 — Oasis de Fint & Ouarzazate', 'J7 — Telouet & retour', 'J8 — Depart'],
    points: ['Pilotage sur la piste de Tansikht, au fil de l\'Oued Draa', 'Bivouac prive dans l\'oasis de Fint — authenticite rare et preservee', 'Traversee technique entre Telouet et Marrakech — l\'Ancienne Piste de l\'Or'],
    inclus: ['4x4 Land Rover prepares pour l\'endurance sur pistes longues', 'Logistique de Raid — Guide-pisteur (Abdou), mecanicien expert, vehicule d\'assistance', 'Riads de prestige et bivouacs nomades exclusifs', 'Dejeuners sous tentes bedouines, diners gastronomiques en Kasbahs'],
  },
]

export default function Raid4x4Page() {
  return (
    <>
      {/* HERO */}
      <section style={{
        height: '70vh',
        minHeight: '480px',
        background: 'linear-gradient(135deg, #111 0%, #1B2D4F 50%, #8C2020 100%)',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '0 5rem 5rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url('/images/hero-raid.jpg')",
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.4,
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>
            Collection 2026 — Depuis l'an 2000
          </p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: 'white', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem' }}>
            Maroc : L'Ingenierie<br />du Raid 4x4
          </h1>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)', maxWidth: '520px', lineHeight: 1.65, marginBottom: '2rem' }}>
            Plus qu'un voyage, une trace. 4 circuits exclusifs conçus pour les passionnes de pilotage, encadres par une logistique de rallye-raid.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary">Devis & reservation</Link>
            <a href="#circuits" className="btn-outline">Voir les circuits</a>
          </div>
        </div>
      </section>

      {/* POURQUOI NOUS */}
      <section style={{ background: 'var(--dark)', padding: '4rem 3rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2rem' }}>
          {[
            { titre: 'Expertise Terrain', texte: 'Des traces reconnus et testes, adaptes au niveau de chaque pilote — du debutant au chevronné du Paris-Dakar. Chaque piste est validee par nos equipes avant d\'etre proposee.' },
            { titre: 'Securite Totale', texte: 'Chaque expedition est encadree par une equipe technique complete : Guide-pisteur, mecanicien specialise 4x4 et vehicule d\'assistance dedie en permanence.' },
            { titre: 'Flexibilite', texte: 'Specialiste du "Self-Drive" (conduite autonome) ou avec chauffeurs-experts selon vos preferences et le profil de vos groupes.' },
          ].map(p => (
            <div key={p.titre} style={{ border: '1px solid rgba(200,134,10,0.3)', padding: '2rem' }}>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', color: 'var(--gold)', marginBottom: '0.75rem' }}>{p.titre}</h3>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>{p.texte}</p>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--gold)', marginTop: '3rem' }}>
          "Le desert ne s'improvise pas, il se maitrise avec les bons outils et la bonne equipe."
        </p>
      </section>

      {/* CIRCUITS */}
      <section id="circuits" style={{ padding: '5rem 3rem', background: 'var(--light-gray)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p className="section-label">4 itineraires exclusifs</p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem,3vw,2.6rem)', color: 'var(--navy)', marginBottom: '3rem' }}>
            La Collection 2026
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {circuits.map((c, i) => (
              <div key={i} style={{ background: 'var(--white)', borderLeft: '4px solid var(--gold)' }}>
                <div style={{ padding: '2rem 2.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <div>
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', marginRight: '1rem' }}>{c.tag}</span>
                      <span style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray)', background: 'var(--light-gray)', padding: '0.2rem 0.6rem' }}>{c.duree}</span>
                    </div>
                  </div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: 'var(--navy)', marginBottom: '0.6rem' }}>{c.titre}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--gray)', lineHeight: 1.65, marginBottom: '1.5rem' }}>{c.accroche}</p>

                  {/* Itineraire */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '0.5rem' }}>Itineraire</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0', alignItems: 'center' }}>
                      {c.itineraire.map((etape, j) => (
                        <span key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy)', whiteSpace: 'nowrap' }}>{etape}</span>
                          {j < c.itineraire.length - 1 && <span style={{ color: 'var(--gold)', margin: '0 0.3rem', fontSize: '0.8rem' }}>→</span>}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    {/* Points forts */}
                    <div>
                      <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '0.5rem' }}>Points forts</p>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        {c.points.map((p, j) => (
                          <li key={j} style={{ fontSize: '0.82rem', color: 'var(--gray)', lineHeight: 1.5, paddingLeft: '1rem', position: 'relative' }}>
                            <span style={{ position: 'absolute', left: 0, color: 'var(--gold)', fontWeight: 700 }}>—</span>
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Inclus */}
                    <div>
                      <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '0.5rem' }}>Inclus</p>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        {c.inclus.map((inc, j) => (
                          <li key={j} style={{ fontSize: '0.82rem', color: 'var(--gray)', lineHeight: 1.5, paddingLeft: '1.2rem', position: 'relative' }}>
                            <span style={{ position: 'absolute', left: 0, color: '#22c55e', fontWeight: 700, fontSize: '0.9rem' }}>✓</span>
                            {inc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--light-gray)', paddingTop: '1.5rem' }}>
                    <Link href="/contact" className="btn-primary" style={{ fontSize: '0.75rem' }}>
                      Demander ce circuit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TABLEAU RECAP */}
      <section style={{ padding: '4rem 3rem', background: 'var(--navy)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p className="section-label" style={{ textAlign: 'center', color: 'var(--gold)' }}>Collection 2026</p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: 'var(--white)', textAlign: 'center', marginBottom: '2rem' }}>Recapitulatif</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--gold)' }}>
                {['Circuit', 'Duree', 'Theme', 'Points forts'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--gold)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Raid Dunes & SSV', '4 jours', 'Dunes & Pilotage SSV', 'Chegaga, Ait Ben Haddou, Bivouac Msoufa'],
                ['Route des Caravanes', '8 jours', 'Immersion Transsaharienne', 'Tamegroute, Nuit etoilee, Tizi n\'Tichka'],
                ['Folies Berberes', '8 jours', 'Montagne & Erg Chebbi', 'Merzouga, Gorges du Todra, Soirees orientales'],
                ['Perle du Sud', '8 jours', 'Oasis & Histoire', 'Oasis de Fint, Piste de l\'Or, Vallee du Draa'],
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: '0.9rem 0.75rem', color: j === 0 ? 'var(--white)' : 'rgba(255,255,255,0.65)', fontWeight: j === 0 ? 600 : 400 }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--cream)', textAlign: 'center', padding: '5rem 3rem', borderTop: '2px solid var(--gold)' }}>
        <p className="section-label">Pret a tracer la route ?</p>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--navy)', marginBottom: '1rem' }}>
          Votre expedition sur mesure
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--gray)', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto 2rem' }}>
          Voyages21 est votre partenaire terrain au Maroc. Nous concevons, operons et securisons chaque expedition. Contactez-nous pour personnaliser votre programme.
        </p>
        <Link href="/contact" className="btn-primary" style={{ marginRight: '1rem' }}>Demander un devis</Link>
        <a href="https://wa.me/212661181618" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', color: 'var(--navy)', fontWeight: 600, textDecoration: 'underline' }}>
          WhatsApp +212 661 181 618
        </a>
      </section>
    </>
  )
}
