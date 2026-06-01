import Link from 'next/link'

export const metadata = {
  title: 'En Autotours au Maroc — Voyages21',
  description: 'Partez en autotour au Maroc à votre rythme. Road book GPS, hébergements réservés, assistance 24h/24. Itinéraires de 6 à 18 jours depuis Marrakech.',
}

const itineraires = [
  {
    duree: '18 jours',
    titre: 'Grand Tour du Maroc',
    desc: 'L\'itinéraire complet pour découvrir toute la diversité du Maroc : villes impériales, Haut Atlas, désert du Sahara, côte atlantique et palmeraies du Sud.',
    tags: ['Complet', 'Désert', 'Villes', 'Montagne'],
    km: '3 200 km',
  },
  {
    duree: '12 jours',
    titre: 'Kasbahs & Désert',
    desc: 'De Marrakech aux dunes de l\'Erg Chebbi via la Route des Mille Kasbahs. Gorges du Dadès, vallée du Draa et bivouac au cœur du Sahara.',
    tags: ['Désert', 'Kasbahs', 'Bivouac'],
    km: '1 800 km',
  },
  {
    duree: '10 jours',
    titre: 'Villes Impériales',
    desc: 'Le Maroc des dynasties : Marrakech, Fès, Meknès, Rabat et Casablanca. Médinas classées UNESCO, palais royaux et architectures andalouses.',
    tags: ['Culture', 'Villes', 'Impérial'],
    km: '1 400 km',
  },
  {
    duree: '8 jours',
    titre: 'Atlas & Gorges du Sud',
    desc: 'Franchissement du Haut Atlas par le Tizi n\'Tichka (2 260 m), gorges du Todra, gorges du Dadès et retour par la Route de Caravanes.',
    tags: ['Montagne', 'Gorges', 'Paysages'],
    km: '1 200 km',
  },
  {
    duree: '8 jours',
    titre: 'Côte Atlantique & Anti-Atlas',
    desc: 'Essaouira, Mirleft, Sidi Ifni, Tafraoute et le mythique col du Tizi n\'Test. Embruns atlantiques, villages berbères et cédraies centenaires.',
    tags: ['Mer', 'Anti-Atlas', 'Atlantique'],
    km: '1 100 km',
  },
  {
    duree: '6 jours',
    titre: 'Long Weekend — Sud Marocain',
    desc: 'L\'essentiel du Sud en 6 jours : Aït Ben Haddou, vallée du Draa, Zagora et bivouac dans les dunes de l\'Erg Lihoudi. Retour par Ouarzazate.',
    tags: ['Court', 'Désert', 'Week-end'],
    km: '900 km',
  },
]

export default function CircuitsAutoToursPage() {
  return (
    <>
      {/* HERO */}
      <section style={{
        height: '65vh', minHeight: '440px',
        background: 'linear-gradient(135deg, #1B2D4F 0%, #2d3a1a 60%, #1B3A28 100%)',
        display: 'flex', alignItems: 'flex-end',
        padding: '0 5rem 5rem', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url('/images/hero-autotours.jpg')",
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.4,
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>
            Route libre — Votre rythme
          </p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem,5vw,4rem)', color: 'white', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem' }}>
            En Autotours<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>au Maroc</em>
          </h1>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)', maxWidth: '540px', lineHeight: 1.65, marginBottom: '2rem' }}>
            Le Maroc à votre rythme, avec votre voiture. Nous préparons tout — vous conduisez, vous choisissez, vous vivez.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary">Demander un road book</Link>
            <a href="#itineraires" className="btn-outline">Voir les itinéraires</a>
          </div>
        </div>
      </section>

      {/* POURQUOI L'AUTOTOUR */}
      <section style={{ background: 'var(--dark)', padding: '5rem 3rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <p className="section-label" style={{ color: 'var(--gold)' }}>Pourquoi l'autotour ?</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: 'var(--white)', marginBottom: '1.2rem', lineHeight: 1.2 }}>
              La liberté du voyage organisé
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.8, marginBottom: '1rem' }}>
              L'autotour réunit le meilleur des deux mondes : la liberté totale du road trip et la sérénité d'un voyage organisé par des professionnels. Vous choisissez où vous arrêter, combien de temps vous restez, quand vous partez le matin.
            </p>
            <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.8 }}>
              Nous préparons votre road book GPS complet, réservons vos hébergements sélectionnés, et restons disponibles par téléphone tout au long de votre périple. Vous profitez, nous veillons.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { n: '6', l: 'Itinéraires — de 6 à 18 jours' },
              { n: '900+', l: 'km sur le plus court itinéraire' },
              { n: '24h/24', l: 'Assistance téléphonique Voyages21' },
              { n: '100%', l: 'Modulable selon vos envies' },
            ].map(s => (
              <div key={s.n} style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.75rem' }}>
                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', color: 'var(--gold)', fontWeight: 700, minWidth: '80px' }}>{s.n}</span>
                <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em' }}>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CE QUI EST INCLUS */}
      <section style={{ padding: '5rem 3rem', background: 'var(--white)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p className="section-label" style={{ textAlign: 'center' }}>Votre kit autotour</p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: 'var(--navy)', textAlign: 'center', marginBottom: '3rem' }}>
            Tout est préparé. Il ne reste plus qu'à conduire.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
            {[
              {
                titre: 'Road Book GPS',
                desc: 'Un guide de route complet avec tous les waypoints géolocalisés, les points de carburant, les passages difficiles et les incontournables à ne pas manquer.',
              },
              {
                titre: 'Hébergements Sélectionnés',
                desc: 'Riads, ksours et lodges soigneusement choisis par notre équipe. Chaque étape est réservée et confirmée avant votre départ.',
              },
              {
                titre: 'Carte des Étapes',
                desc: 'Une carte papier et numérique avec les kasbahs, gorges, dunes, cols et bivouacs recommandés pour chaque nuit.',
              },
              {
                titre: 'Assistance 24h/24',
                desc: 'Notre équipe reste joignable tout au long de votre voyage. Problème mécanique, changement de programme, question d\'itinéraire — nous répondons.',
              },
              {
                titre: 'Briefing Avant Départ',
                desc: 'Une session de 30 minutes avec votre conseiller Voyages21 pour revoir l\'itinéraire, les conditions de route et les conseils pratiques de terrain.',
              },
              {
                titre: 'Activités à la Carte',
                desc: 'Montgolfière, balade dromadaire, atelier cuisine marocaine, bivouac saharien — toutes nos expériences s\'intègrent à votre programme.',
              },
            ].map((item, i) => (
              <div key={i} style={{ borderLeft: '3px solid var(--gold)', padding: '1.5rem', background: 'var(--light-gray)' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', color: 'var(--navy)', marginBottom: '0.6rem' }}>{item.titre}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--gray)', lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ITINÉRAIRES */}
      <section id="itineraires" style={{ padding: '5rem 3rem', background: 'var(--light-gray)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p className="section-label">6 itinéraires</p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem,3vw,2.4rem)', color: 'var(--navy)', marginBottom: '2.5rem' }}>
            Nos autotours 2026
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.2rem' }}>
            {itineraires.map((c, i) => (
              <div key={i} style={{ background: 'var(--white)', borderTop: '3px solid var(--gold)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)' }}>{c.duree}</span>
                  <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--gray)', letterSpacing: '0.05em' }}>{c.km}</span>
                </div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', color: 'var(--navy)', lineHeight: 1.3, flex: 1 }}>{c.titre}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--gray)', lineHeight: 1.55 }}>{c.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.5rem' }}>
                  {c.tags.map(t => (
                    <span key={t} style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'var(--light-gray)', color: 'var(--navy)', padding: '0.15rem 0.5rem' }}>{t}</span>
                  ))}
                </div>
                <Link href="/contact" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gold)', textDecoration: 'none', marginTop: '0.5rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Demander ce road book →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRATIQUE */}
      <section style={{ padding: '4rem 3rem', background: 'var(--navy)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p className="section-label" style={{ textAlign: 'center', color: 'var(--gold)' }}>Pratique</p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: 'var(--white)', textAlign: 'center', marginBottom: '2.5rem' }}>
            Questions fréquentes
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              {
                q: 'Faut-il louer une voiture sur place ?',
                r: 'Vous pouvez venir avec votre propre véhicule ou louer sur place. Nous vous recommandons un 4x4 ou SUV pour les itinéraires comprenant des pistes. Nous pouvons organiser la location via nos partenaires locaux.',
              },
              {
                q: 'Les routes sont-elles praticables toute l\'année ?',
                r: 'La majorité des itinéraires sont praticables 12 mois sur 12. Certains cols du Haut Atlas (Tizi n\'Tichka, Tizi n\'Test) peuvent être fermés en cas de neige en janvier-février — nous vous informons en temps réel.',
              },
              {
                q: 'Puis-je modifier l\'itinéraire en cours de route ?',
                r: 'Absolument. L\'autotour est conçu pour être flexible. Vous pouvez prolonger une étape, découvrir un détour ou changer d\'hébergement. Appelez-nous et nous nous adaptons.',
              },
              {
                q: 'Le road book est-il disponible sur smartphone ?',
                r: 'Oui. Vous recevez avant le départ un accès numérique au road book avec fichier GPS au format GPX compatible Google Maps, Maps.me et Garmin, ainsi qu\'une version PDF imprimable.',
              },
            ].map((item, i) => (
              <div key={i} style={{ border: '1px solid rgba(200,134,10,0.25)', padding: '1.5rem' }}>
                <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', fontWeight: 700, color: 'var(--gold)', marginBottom: '0.5rem' }}>{item.q}</h3>
                <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>{item.r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--cream)', textAlign: 'center', padding: '5rem 3rem', borderTop: '2px solid var(--gold)' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--navy)', marginBottom: '1rem' }}>
          Composez votre autotour
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--gray)', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto 2rem' }}>
          Durée, hébergements, activités intégrées, niveau de confort — tout est modulable. Parlez-nous de votre projet.
        </p>
        <Link href="/contact" className="btn-primary" style={{ marginRight: '1rem' }}>Demander un devis gratuit</Link>
        <a href="https://wa.me/212661181618" target="_blank" rel="noopener noreferrer" className="btn-outline">
          WhatsApp direct
        </a>
      </section>
    </>
  )
}
