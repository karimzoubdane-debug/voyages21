import Link from 'next/link'

export const metadata = {
  title: 'Moto Expedition Maroc — BMW GS & KTM Adventure — Voyages21',
  description: '2 circuits moto au Maroc : Atlantique & Anti-Atlas (930 km) et Haut Atlas & Desert (1180 km). BMW R1250GS, F850GS, KTM Adventure. Formule Liberte ou Expedition encadree.',
}

export default function MotoPage() {
  return (
    <>
      {/* HERO */}
      <section style={{
        height: '70vh', minHeight: '480px',
        background: 'linear-gradient(135deg, #111 0%, #1B2D4F 60%, #0a1a2e 100%)',
        display: 'flex', alignItems: 'flex-end',
        padding: '0 5rem 5rem', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url('/images/hero-moto.jpg')",
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.45,
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>
            Raids Moto — BMW GS & KTM Adventure
          </p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem,5vw,4rem)', color: 'white', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem' }}>
            L'Aventure<br />Maitrisee au Maroc
          </h1>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)', maxWidth: '540px', lineHeight: 1.65, marginBottom: '2rem' }}>
            Des cretes vertigineuses du Haut Atlas aux immensites dorees du Sahara. L'aventure ne se vit pas — elle se savoure.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary">Demander un devis</Link>
            <a href="#circuits" className="btn-outline">Voir les circuits</a>
          </div>
        </div>
      </section>

      {/* POURQUOI MOTO AU MAROC */}
      <section style={{ background: 'var(--dark)', padding: '5rem 3rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <p className="section-label" style={{ color: 'var(--gold)' }}>Pourquoi le Maroc en Moto ?</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: 'var(--white)', marginBottom: '1.2rem', lineHeight: 1.2 }}>
              Le terrain de jeu ultime des deux-roues
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.8, marginBottom: '1rem' }}>
              Le Maroc est un terrain de jeu exceptionnel pour les passionnes de deux-roues et de tout-terrain. Des cretes vertigineuses du Haut Atlas aux immensites dorees du Sahara, chaque kilometre offre un spectacle renouvele.
            </p>
            <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.8 }}>
              Nos raids conjuguent exigence technique, confort haut de gamme et immersion authentique. Securite irreprochable, logistique millinetree, hebergements d'exception et accompagnement par des pilotes pisteurs certifies.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { n: '930 km', l: 'Circuit Atlantique' },
              { n: '1 180 km', l: 'Circuit Haut Atlas & Desert' },
              { n: '3', l: 'Niveaux — Decouverte / Aventure / Expedition' },
              { n: '2', l: 'Formules — Liberte ou Expedition encadree' },
            ].map(s => (
              <div key={s.n} style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.75rem' }}>
                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', color: 'var(--gold)', fontWeight: 700, minWidth: '80px' }}>{s.n}</span>
                <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em' }}>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2 CIRCUITS */}
      <section id="circuits" style={{ padding: '5rem 3rem', background: 'var(--light-gray)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p className="section-label">Nos circuits</p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem,3vw,2.6rem)', color: 'var(--navy)', marginBottom: '3rem' }}>
            Deux itineraires d'exception
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {/* Circuit 1 */}
            <div style={{ background: 'var(--white)', borderTop: '4px solid var(--gold)' }}>
              <div style={{ height: '240px', backgroundImage: "url('/images/moto-atlantique.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#1B2D4F' }} />
              <div style={{ padding: '2rem' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)' }}>Circuit 01</span>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', color: 'var(--navy)', margin: '0.5rem 0', lineHeight: 1.25 }}>
                  Atlantique & Anti-Atlas
                </h3>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.75rem', background: 'var(--light-gray)', padding: '0.2rem 0.6rem', color: 'var(--navy)', fontWeight: 600 }}>6 jours</span>
                  <span style={{ fontSize: '0.75rem', background: 'var(--light-gray)', padding: '0.2rem 0.6rem', color: 'var(--navy)', fontWeight: 600 }}>930 km</span>
                  <span style={{ fontSize: '0.75rem', background: 'var(--light-gray)', padding: '0.2rem 0.6rem', color: 'var(--navy)', fontWeight: 600 }}>90% asphalte</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--gray)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                  L'itineraire ideal pour ceux qui veulent marier la douceur de l'Atlantique a la rudesse minerale de l'Anti-Atlas. Essaouira, Mirleft, Tafraoute et le mythique col du Tizi n'Test a 2 092 m.
                </p>
                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '0.5rem' }}>Etapes</p>
                  {[
                    ['J1', 'Marrakech → Essaouira', '180 km'],
                    ['J2', 'Essaouira → Imouzzer', '110 km'],
                    ['J3', 'Imouzzer → Mirleft', '160 km'],
                    ['J4', 'Mirleft → Tafraoute', '150 km'],
                    ['J5', 'Tafraoute → Taroudant', '150 km'],
                    ['J6', 'Taroudant → Marrakech', '180 km'],
                  ].map(([j, e, km]) => (
                    <div key={j} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', borderBottom: '1px solid var(--light-gray)', fontSize: '0.8rem' }}>
                      <span style={{ color: 'var(--gold)', fontWeight: 700, minWidth: '24px' }}>{j}</span>
                      <span style={{ color: 'var(--navy)', flex: 1, paddingLeft: '0.5rem' }}>{e}</span>
                      <span style={{ color: 'var(--gray)' }}>{km}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: '0.78rem', fontStyle: 'italic', color: 'var(--gray)', borderLeft: '2px solid var(--gold)', paddingLeft: '0.75rem', lineHeight: 1.55 }}>
                  "Le contraste entre les embruns de l'Atlantique et les gorges minerales de Tafraoute, les couchers de soleil sur Mirleft, le franchissement solennel du Tizi n'Test."
                </p>
              </div>
            </div>

            {/* Circuit 2 */}
            <div style={{ background: 'var(--white)', borderTop: '4px solid var(--navy)' }}>
              <div style={{ height: '240px', backgroundImage: "url('/images/moto-atlas.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#1B2D4F' }} />
              <div style={{ padding: '2rem' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)' }}>Circuit 02</span>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', color: 'var(--navy)', margin: '0.5rem 0', lineHeight: 1.25 }}>
                  Haut Atlas & Desert
                </h3>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.75rem', background: 'var(--light-gray)', padding: '0.2rem 0.6rem', color: 'var(--navy)', fontWeight: 600 }}>6 jours</span>
                  <span style={{ fontSize: '0.75rem', background: 'var(--light-gray)', padding: '0.2rem 0.6rem', color: 'var(--navy)', fontWeight: 600 }}>1 180 km</span>
                  <span style={{ fontSize: '0.75rem', background: 'var(--light-gray)', padding: '0.2rem 0.6rem', color: 'var(--navy)', fontWeight: 600 }}>Mixte asphalte & off-road</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--gray)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                  L'itineraire le plus complet pour ceux qui aspirent a l'aventure totale. Ait Bouguemez, gorges du Todra, Erg Chebbi (Merzouga), route des mille kasbahs et col du Tichka (2 260 m).
                </p>
                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '0.5rem' }}>Etapes</p>
                  {[
                    ['J1', 'Marrakech → Ait Bouguemez', '190 km'],
                    ['J2', 'Ait Bouguemez → Todra', '180 km'],
                    ['J3', 'Todra → Merzouga', '200 km'],
                    ['J4', 'Merzouga → Zagora', '250 km · Off-road'],
                    ['J5', 'Zagora → Ouarzazate', '160 km'],
                    ['J6', 'Ouarzazate → Marrakech', '200 km · Tichka'],
                  ].map(([j, e, km]) => (
                    <div key={j} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', borderBottom: '1px solid var(--light-gray)', fontSize: '0.8rem' }}>
                      <span style={{ color: 'var(--gold)', fontWeight: 700, minWidth: '24px' }}>{j}</span>
                      <span style={{ color: 'var(--navy)', flex: 1, paddingLeft: '0.5rem' }}>{e}</span>
                      <span style={{ color: 'var(--gray)', fontSize: '0.75rem' }}>{km}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: '0.78rem', fontStyle: 'italic', color: 'var(--gray)', borderLeft: '2px solid var(--gold)', paddingLeft: '0.75rem', lineHeight: 1.55 }}>
                  "La montee d'adrenaline sur les pistes sahariennes entre Merzouga et Zagora, le bivouac sous les etoiles, la traversee mythique du Haut Atlas au petit matin."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARC MOTO */}
      <section style={{ padding: '4rem 3rem', background: 'var(--navy)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p className="section-label" style={{ textAlign: 'center', color: 'var(--gold)' }}>Le Parc Moto</p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: 'var(--white)', textAlign: 'center', marginBottom: '0.5rem' }}>
            BMW GS & KTM Adventure
          </h2>
          <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)', marginBottom: '2.5rem' }}>
            Toutes nos motos sont revisees avant votre depart. Le choix du modele depend de votre experience et du type de circuit.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1.2rem' }}>
            {[
              { label: 'Gamme Haute BMW (Gros cubes)', motos: ['BMW R 1250 GS — Derniere generation', 'BMW R 1200 GS'] },
              { label: 'Gamme Intermediaire BMW', motos: ['BMW F 850 GS', 'BMW F 800 GS', 'BMW F 750 GS', 'BMW F 700 GS'] },
              { label: 'Gamme Debutant BMW', motos: ['BMW G 310 GS'] },
              { label: 'KTM Adventure', motos: ['KTM 390 Adventure — Legere · 158 kg · 44 ch · Polyvalente piste & asphalte'] },
            ].map(g => (
              <div key={g.label} style={{ border: '1px solid rgba(200,134,10,0.25)', padding: '1.5rem' }}>
                <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>{g.label}</h3>
                <ul style={{ listStyle: 'none' }}>
                  {g.motos.map(m => (
                    <li key={m} style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)', padding: '0.25rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2 FORMULES */}
      <section style={{ padding: '5rem 3rem', background: 'var(--white)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p className="section-label" style={{ textAlign: 'center' }}>Nos formules</p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: 'var(--navy)', textAlign: 'center', marginBottom: '3rem' }}>
            Deux facons de vivre l'aventure
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {[
              {
                formule: 'Formule Liberte',
                tag: 'Rider en Solo',
                desc: 'Pour les pilotes autonomes qui veulent tracer leur propre route.',
                items: [
                  'Moto selon notre parc',
                  'Road book numerique complet avec points GPS geolocalises',
                  'Carte des etapes avec les incontournables : cols, kasbahs, gorges, dunes, bivouacs',
                  'Gestion complete de la logistique : hebergements, repas, carburant',
                  'Intervention rapide en cas de panne, chute ou besoin logistique',
                ],
                ideal: 'Les riders souhaitant vivre le Maroc a leur rythme, sans contrainte de groupe.',
                border: 'var(--gold)',
              },
              {
                formule: 'Formule Expedition',
                tag: 'Encadre & Securise',
                desc: 'Pour ceux qui veulent pousser les limites en toute serenite.',
                items: [
                  'Pilote pisteur certifie en tete de convoi — guide, secouriste, expert terrain',
                  'Pickup 4x4 d\'assistance en queue avec mecanicien et moto de rechange',
                  'Briefing quotidien : meteo, profil de piste, points critiques, consignes',
                  'Gestion complete de la logistique : hebergements, repas, carburant',
                ],
                ideal: 'Les groupes et riders souhaitant s\'aventurer sur des pistes engagees sans se soucier de la logistique.',
                border: 'var(--navy)',
              },
            ].map(f => (
              <div key={f.formule} style={{ borderTop: `4px solid ${f.border}`, padding: '2rem', background: 'var(--light-gray)' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>{f.tag}</span>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', color: 'var(--navy)', margin: '0.5rem 0 0.75rem' }}>{f.formule}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--gray)', marginBottom: '1.2rem', lineHeight: 1.55 }}>{f.desc}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.2rem' }}>
                  {f.items.map((item, i) => (
                    <li key={i} style={{ fontSize: '0.82rem', color: 'var(--gray)', paddingLeft: '1.2rem', position: 'relative', lineHeight: 1.5 }}>
                      <span style={{ position: 'absolute', left: 0, color: '#22c55e', fontWeight: 700 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p style={{ fontSize: '0.78rem', fontStyle: 'italic', color: 'var(--navy)', borderLeft: '2px solid var(--gold)', paddingLeft: '0.75rem', lineHeight: 1.55 }}>
                  Ideal pour : {f.ideal}
                </p>
              </div>
            ))}
          </div>

          {/* Niveaux de difficulte */}
          <div style={{ marginTop: '3rem' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', color: 'var(--navy)', marginBottom: '1.5rem', textAlign: 'center' }}>
              3 niveaux d'experience
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }}>
              {[
                { niveau: 'Decouverte', desc: 'Itineraires principalement asphaltes, rythme modere. Ideal pour une premiere experience de raid.' },
                { niveau: 'Aventure', desc: 'Mix asphalte et pistes, passages techniques moderes. Pour pilotes a l\'aise en tout-terrain leger.' },
                { niveau: 'Expedition', desc: 'Pistes engagees, sable, pierrier et haute montagne. Reserve aux riders experimentes et audacieux.' },
              ].map(n => (
                <div key={n.niveau} style={{ background: 'var(--navy)', padding: '1.5rem', textAlign: 'center' }}>
                  <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', color: 'var(--gold)', marginBottom: '0.5rem' }}>{n.niveau}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{n.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--cream)', textAlign: 'center', padding: '5rem 3rem', borderTop: '2px solid var(--gold)' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--navy)', marginBottom: '1rem' }}>
          Composez votre expedition moto
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--gray)', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto 2rem' }}>
          Les deux formules sont disponibles sur les deux circuits. Contactez-nous pour composer votre expedition sur mesure.
        </p>
        <Link href="/contact" className="btn-primary" style={{ marginRight: '1rem' }}>Demander un devis</Link>
        <a href="https://wa.me/212661181618" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', color: 'var(--navy)', fontWeight: 600, textDecoration: 'underline' }}>
          WhatsApp +212 661 181 618
        </a>
      </section>
    </>
  )
}
