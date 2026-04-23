'use client'
import Link from 'next/link'
import styles from './home.module.css'

export default function HomePage() {
  return (
    <>
      {/* ===== HERO VIDEO PLEIN ECRAN ===== */}
      <section className={styles.hero}>
        <div className={styles.heroVideo}>
          <video
            autoPlay
            muted
            loop
            playsInline
            className={styles.videoEl}
            poster="https://images.unsplash.com/photo-1548813395-edd5373a8e72?w=1920&q=80"
          >
            <source src="/video/2964957128.mp4" type="video/mp4" />
          </video>
          {/* Fond de secours pendant le chargement de la video */}
          <div className={styles.videoBg} />
        </div>
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <p className={styles.heroLabel}>Depuis 2000 — Marrakech, Maroc</p>
          <h1 className={styles.heroTitle}>
            Le Maroc<br /><em>comme vous</em><br />le rêvez
          </h1>
          <div className={styles.heroRule} />
          <p className={styles.heroSub}>
            Circuits sur mesure · Raids 4x4 · Moto Expédition · Expériences authentiques
          </p>
          <div className={styles.heroCta}>
            <Link href="/circuits/classiques" className={styles.btnHeroPrimary}>
              Découvrir nos circuits
            </Link>
            <Link href="/contact" className={styles.btnHeroOutline}>
              Devis gratuit
            </Link>
          </div>
        </div>

        <div className={styles.scrollHint}>
          <span>Découvrir</span>
          <div className={styles.scrollLine} />
        </div>
      </section>

      {/* ===== BANDEAU SIGNATURE ===== */}
      <div className={styles.signatureBand}>
        Chaque voyage est conçu sur mesure — solo, à deux, en famille ou entre amis.&nbsp;
        <strong>Voyages21, l'agence cousu main depuis 2000.</strong>
      </div>

      {/* ===== NOS UNIVERS ===== */}
      <section className={styles.univers}>
        <div className={styles.universHeader}>
          <p className={styles.sectionLabel}>Nos univers</p>
          <h2 className={styles.sectionTitle}>Choisissez votre aventure</h2>
        </div>
        <div className={styles.universGrid}>
          {[
            {
              img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80',
              label: 'Raid 4x4',
              title: "L'Ingénierie du Raid",
              desc: "4 circuits exclusifs. De l'Atlas à Chegaga, des dunes géantes aux oasis secrètes. Logistique militaire, émotion garantie.",
              href: '/circuits/raid-4x4',
            },
            {
              img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
              label: 'Moto Expédition',
              title: 'BMW GS & KTM Adventure',
              desc: 'Atlantique & Anti-Atlas (930 km) ou Haut Atlas & Désert (1 180 km). Liberté ou expédition encadrée, à vous de choisir.',
              href: '/circuits/moto',
            },
            {
              img: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&q=80',
              label: 'Circuits & Autotours',
              title: 'Le Maroc Classique',
              desc: 'Villes impériales, désert, montagnes, plages. En bus, en voiture ou en autotour — le même itinéraire, votre rythme.',
              href: '/circuits/classiques',
            },
          ].map((u) => (
            <Link href={u.href} key={u.href} className={styles.universCard}>
              <div className={styles.universImg} style={{ backgroundImage: `url(${u.img})` }} />
              <div className={styles.universCardContent}>
                <p className={styles.universLabel}>{u.label}</p>
                <h3 className={styles.universCardTitle}>{u.title}</h3>
                <p className={styles.universCardDesc}>{u.desc}</p>
                <span className={styles.universArrow}>Découvrir →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== CIRCUITS PHARES ===== */}
      <section className={styles.featured}>
        <div className={styles.featuredInner}>
          <p className={styles.sectionLabel}>Sélection</p>
          <h2 className={styles.sectionTitle}>Circuits phares 2026</h2>
        </div>
        <div className={styles.featuredGrid}>
          {[
            {
              tag: '4x4 · 4 jours',
              title: "Raid Dunes & SSV : De l'Atlas à Chegaga",
              desc: 'Franchissement de dunes géantes, pilotage SSV, bivouac sous les étoiles à Msoufa.',
              img: 'https://images.unsplash.com/photo-1548813395-edd5373a8e72?w=600&q=80',
              href: '/circuits/raid-4x4',
            },
            {
              tag: 'Moto · 6 jours · 930 km',
              title: 'Atlantique & Anti-Atlas',
              desc: "Essaouira, falaises de Mirleft, Tafraoute et le mythique col du Tizi n'Test à 2 092 m.",
              img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
              href: '/circuits/moto',
            },
            {
              tag: 'Circuit · 12 jours',
              title: 'Au fil des dynasties et des dunes',
              desc: 'Villes impériales, Moyen Atlas, kasbahs du Sud et silence du désert.',
              img: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=600&q=80',
              href: '/circuits/classiques',
            },
            {
              tag: '4x4 · 8 jours',
              title: 'Folies Berbères — Le Raid des Contrastes',
              desc: "Du col du Tizi n'Tichka aux dunes de l'Erg Chebbi. Merzouga, Todra, bivouacs nomades.",
              img: 'https://images.unsplash.com/photo-1509027572446-af8401acfdc3?w=600&q=80',
              href: '/circuits/raid-4x4',
            },
          ].map((c, i) => (
            <Link href={c.href} key={i} className={styles.featuredCard}>
              <div className={styles.featuredImg} style={{ backgroundImage: `url(${c.img})` }} />
              <div className={styles.featuredCardBody}>
                <span className={styles.featuredTag}>{c.tag}</span>
                <h3 className={styles.featuredCardTitle}>{c.title}</h3>
                <p className={styles.featuredCardDesc}>{c.desc}</p>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/circuits/classiques" className={styles.btnPrimary}>
            Voir tous les circuits
          </Link>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className={styles.stats}>
        <div className={styles.statsInner}>
          {[
            { n: '25+', label: "Années d'expérience" },
            { n: '50+', label: 'Circuits & activités' },
            { n: '4', label: "Univers d'expédition" },
            { n: '24/7', label: 'Assistance terrain' },
          ].map((s) => (
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
          <p className={styles.sectionLabel}>À la carte</p>
          <h2 className={styles.sectionTitle}>Expériences & Activités</h2>
          <p className={styles.expSub}>
            Montgolfière, Quad, Ateliers Cuisine, Bivouac, Hammam... Chaque activité est disponible
            à la carte ou intégrée dans vos circuits.
          </p>
        </div>
        <div className={styles.expGrid}>
          {[
            { label: 'Montgolfière', sub: 'Le Maroc vu du ciel', img: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=600&q=80' },
            { label: 'Quad Désert', sub: 'Sensations entre dunes et vallées', img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80' },
            { label: 'Atelier Cuisine', sub: 'Saveurs et traditions', img: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&q=80' },
            { label: 'Dîner de Gala', sub: 'Élégance marocaine', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80' },
            { label: 'Hammam Privé', sub: 'Bien-être et détente', img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80' },
            { label: 'Balade Dromadaire', sub: 'Le Maroc au rythme nomade', img: 'https://images.unsplash.com/photo-1548813395-edd5373a8e72?w=600&q=80' },
          ].map((e) => (
            <Link href="/experiences" key={e.label} className={styles.expCard}>
              <div className={styles.expImg} style={{ backgroundImage: `url(${e.img})` }} />
              <div className={styles.expCardBody}>
                <h3 className={styles.expCardTitle}>{e.label}</h3>
                <p className={styles.expCardSub}>{e.sub}</p>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/experiences" className={styles.btnPrimary}>
            Toutes les expériences
          </Link>
        </div>
      </section>

      {/* ===== A PROPOS BAND ===== */}
      <section className={styles.aboutBand}>
        <div
          className={styles.aboutBandImg}
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=1200&q=80')" }}
        />
        <div className={styles.aboutBandContent}>
          <p className={styles.sectionLabel}>Notre histoire</p>
          <h2 className={styles.sectionTitleWhite}>25 ans de passion pour le Maroc</h2>
          <p className={styles.aboutBandText}>
            Depuis l&apos;an 2000, Voyages21 conçoit des voyages sur mesure pour une clientèle de
            passionnés et de pilotes exigeants. Nous ne vendons pas de simples voyages, mais une
            logistique de pointe héritée de l&apos;esprit Rallye-Raid. Chaque expédition est pensée
            comme une opération technique, où sécurité, précision et passion du terrain convergent.
          </p>
          <blockquote className={styles.aboutQuote}>&ldquo;Plus qu&apos;un voyage, une trace.&rdquo;</blockquote>
          <Link href="/about" className={styles.btnOutline}>
            Notre histoire
          </Link>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Votre voyage sur mesure commence ici</h2>
        <p className={styles.ctaSub}>
          Parlez-nous de votre projet. Nous concevons, opérons et sécurisons chaque expédition.
        </p>
        <div className={styles.ctaButtons}>
          <Link href="/contact" className={styles.btnPrimary}>
            Demander un devis gratuit
          </Link>
          <a
            href="https://wa.me/212661181618"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnOutline}
          >
            WhatsApp direct
          </a>
        </div>
      </section>
    </>
  )
}
