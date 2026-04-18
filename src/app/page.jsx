import Link from 'next/link'
import styles from './home.module.css'

export default function HomePage() {
  return (
    <>
      {/* ===== HERO VIDEO ===== */}
      <section className={styles.hero}>
        {/* Vidéo placeholder — remplacer hero.mp4 par votre vidéo dans /public/videos/ */}
        <div className={styles.heroVideo}>
          <video
            autoPlay
            muted
            loop
            playsInline
            className={styles.videoEl}
            poster="/images/hero-poster.jpg"
          >
            {/* Quand vous avez une vidéo : */}
            {/* <source src="/videos/hero.mp4" type="video/mp4" /> */}
          </video>
          {/* Fond de secours tant que la vidéo n'est pas disponible */}
          <div className={styles.videoBg} />
        </div>

        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <p className="section-label" style={{ color: 'var(--gold)', marginBottom: '1rem' }}>
            Depuis 2000 — Marrakech, Maroc
          </p>
          <h1 className={styles.heroTitle}>
            Le Maroc<br />
            <em>comme vous</em><br />
            le revez
          </h1>
          <p className={styles.heroSub}>
            Circuits sur mesure, Raids 4x4, Moto Expedition et Experiences authentiques.
            <br />Chacun sa formule, chacun son desir.
          </p>
          <div className={styles.heroCta}>
            <Link href="/circuits/classiques" className="btn-primary">
              Voir les circuits
            </Link>
            <Link href="/contact" className="btn-outline">
              Devis gratuit
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={styles.scrollHint}>
          <span>Decouvrir</span>
          <div className={styles.scrollLine} />
        </div>
      </section>

      {/* ===== BANDEAU COUSU MAIN ===== */}
      <div className="cousu-main-banner">
        Nos circuits se vivent en solo, a deux, en famille ou entre amis —{' '}
        <strong>chacun sa formule, chacun son desir.</strong>{' '}
        Voyages21, l'agence cousu main depuis 2000.
      </div>

      {/* ===== 3 UNIVERS ===== */}
      <section className={styles.univers}>
        <div className={styles.universHeader}>
          <p className="section-label">Nos univers</p>
          <h2 className={styles.sectionTitle}>Choisissez votre aventure</h2>
        </div>

        <div className={styles.universGrid}>
          {[
            {
              img: '/images/univers-4x4.jpg',
              label: 'Raid 4x4',
              title: 'L\'Ingenierie du Raid',
              desc: '4 circuits exclusifs. De l\'Atlas a Chegaga, des dunes geantes aux oasis secretes. Logistique militaire, emotion garantie.',
              href: '/circuits/raid-4x4',
            },
            {
              img: '/images/univers-moto.jpg',
              label: 'Moto Expedition',
              title: 'BMW GS & KTM Adventure',
              desc: 'Atlantique & Anti-Atlas (930 km) ou Haut Atlas & Desert (1 180 km). Liberté ou expedition encadree, a vous de choisir.',
              href: '/circuits/moto',
            },
            {
              img: '/images/univers-classique.jpg',
              label: 'Circuits & Autotours',
              title: 'Le Maroc Classique',
              desc: 'Villes imperiales, desert, montagnes, plages. En bus, en voiture ou en autotour — le meme itineraire, votre rythme.',
              href: '/circuits/classiques',
            },
          ].map(u => (
            <Link href={u.href} key={u.href} className={styles.universCard}>
              <div
                className={styles.universImg}
                style={{ backgroundImage: `url(${u.img})` }}
              />
              <div className={styles.universCardContent}>
                <p className={styles.universLabel}>{u.label}</p>
                <h3 className={styles.universCardTitle}>{u.title}</h3>
                <p className={styles.universCardDesc}>{u.desc}</p>
                <span className={styles.universArrow}>Decouvrir →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== CIRCUITS PHARES ===== */}
      <section className={styles.featured}>
        <div className={styles.featuredInner}>
          <p className="section-label">Selection</p>
          <h2 className={styles.sectionTitle}>Circuits phares 2026</h2>
        </div>

        <div className={styles.featuredGrid}>
          {[
            {
              tag: '4x4 · 4 jours',
              title: 'Raid Dunes & SSV : De l\'Atlas a Chegaga',
              desc: 'Franchissement de dunes geantes, pilotage SSV, bivouac sous les etoiles a Msoufa.',
              img: '/images/raid-chegaga.jpg',
              href: '/circuits/raid-4x4',
            },
            {
              tag: 'Moto · 6 jours · 930 km',
              title: 'Atlantique & Anti-Atlas',
              desc: 'Essaouira, falaises de Mirleft, Tafraoute et le mythique col du Tizi n\'Test a 2 092 m.',
              img: '/images/moto-atlantique.jpg',
              href: '/circuits/moto',
            },
            {
              tag: 'Circuit · 12 jours',
              title: 'Au fil des dynasties et des dunes',
              desc: 'Villes imperiales, Moyen Atlas, kasbahs du Sud et silence du desert.',
              img: '/images/circuit-dynasties.jpg',
              href: '/circuits/classiques',
            },
            {
              tag: '4x4 · 8 jours',
              title: 'Folies Berberes — Le Raid des Contrastes',
              desc: 'Du col du Tizi n\'Tichka aux dunes de l\'Erg Chebbi. Merzouga, Todra, bivouacs nomades.',
              img: '/images/raid-folies.jpg',
              href: '/circuits/raid-4x4',
            },
          ].map((c, i) => (
            <Link href={c.href} key={i} className={styles.featuredCard}>
              <div
                className={styles.featuredImg}
                style={{ backgroundImage: `url(${c.img})` }}
              />
              <div className={styles.featuredCardBody}>
                <span className={styles.featuredTag}>{c.tag}</span>
                <h3 className={styles.featuredCardTitle}>{c.title}</h3>
                <p className={styles.featuredCardDesc}>{c.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/circuits/classiques" className="btn-primary">
            Voir tous les circuits
          </Link>
        </div>
      </section>

      {/* ===== CHIFFRES CLES ===== */}
      <section className={styles.stats}>
        <div className={styles.statsInner}>
          {[
            { n: '25+', label: 'Annees d\'experience' },
            { n: '50+', label: 'Circuits & activites' },
            { n: '4', label: 'Univers d\'expedition' },
            { n: '24/7', label: 'Assistance terrain' },
          ].map(s => (
            <div key={s.label} className={styles.statItem}>
              <span className={styles.statNum}>{s.n}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== EXPERIENCES ===== */}
      <section className={styles.expSection}>
        <div className={styles.expHeader}>
          <p className="section-label">A la carte</p>
          <h2 className={styles.sectionTitle}>Experiences & Activites</h2>
          <p className={styles.expSub}>
            Montgolfiere, Quad, Ateliers Cuisine, Bivouac, Hammam... Chaque activite est disponible a la carte ou integree dans vos circuits.
          </p>
        </div>

        <div className={styles.expGrid}>
          {[
            { label: 'Montgolfiere', sub: 'Le Maroc vu du ciel', img: '/images/exp-ballon.jpg' },
            { label: 'Quad Desert', sub: 'Sensations entre dunes et vallees', img: '/images/exp-quad.jpg' },
            { label: 'Atelier Cuisine', sub: 'Saveurs et traditions', img: '/images/exp-cuisine.jpg' },
            { label: 'Diner de Gala', sub: 'Elegance marocaine', img: '/images/exp-gala.jpg' },
            { label: 'Hammam Prive', sub: 'Bien-etre et detente', img: '/images/exp-hammam.jpg' },
            { label: 'Balade Dromadaire', sub: 'Le Maroc au rythme nomade', img: '/images/exp-dromadaire.jpg' },
          ].map(e => (
            <Link href="/experiences" key={e.label} className={styles.expCard}>
              <div
                className={styles.expImg}
                style={{ backgroundImage: `url(${e.img})` }}
              />
              <div className={styles.expCardBody}>
                <h3 className={styles.expCardTitle}>{e.label}</h3>
                <p className={styles.expCardSub}>{e.sub}</p>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/experiences" className="btn-primary">
            Toutes les experiences
          </Link>
        </div>
      </section>

      {/* ===== A PROPOS MINI ===== */}
      <section className={styles.aboutBand}>
        <div className={styles.aboutBandImg} style={{ backgroundImage: "url('/images/about-maroc.jpg')" }} />
        <div className={styles.aboutBandContent}>
          <p className="section-label">Notre histoire</p>
          <h2 className={styles.sectionTitle} style={{ color: 'var(--white)' }}>
            25 ans de passion pour le Maroc
          </h2>
          <p className={styles.aboutBandText}>
            Depuis l'an 2000, Voyages21 conçoit des voyages sur mesure pour une clientele de passionnes et de pilotes exigeants. Nous ne vendons pas de simples voyages, mais une logistique de pointe heritee de l'esprit Rallye-Raid. Chaque expedition est pensee comme une operation technique, où securite, precision et passion du terrain convergent.
          </p>
          <blockquote className={styles.aboutQuote}>
            "Plus qu'un voyage, une trace."
          </blockquote>
          <Link href="/about" className="btn-outline">
            Notre histoire
          </Link>
        </div>
      </section>

      {/* ===== CTA DEVIS ===== */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Votre voyage sur mesure commence ici</h2>
        <p className={styles.ctaSub}>Parlez-nous de votre projet. Nous concevons, operons et securisons chaque expedition.</p>
        <Link href="/contact" className="btn-primary" style={{ marginRight: '1rem' }}>
          Demander un devis gratuit
        </Link>
        <a href="https://wa.me/212661181618" target="_blank" rel="noopener noreferrer" className="btn-outline">
          WhatsApp direct
        </a>
      </section>
    </>
  )
}
