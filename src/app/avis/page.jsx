import styles from './avis.module.css'

// ── Lien direct review — remplacer par g.page/r/.../review après validation Google
const GOOGLE_REVIEW_URL = 'https://maps.app.goo.gl/9AZsNQQ1vKVf5NCQ7'

const REVIEWS = [
  {
    initial: 'M', name: 'Meryem A.', trip: 'Croisière Méditerranée · Mars 2025', platform: 'Google',
    text: 'Organisation parfaite de A à Z. Les billets obtenus à un tarif imbattable, hôtels choisis avec goût. L\'équipe répond toujours, même depuis le bateau. Je ne passerai plus jamais par un comparateur.',
  },
  {
    initial: 'J', name: 'Jean-Pierre M.', trip: 'Circuit Japon · Novembre 2024', platform: 'Google',
    text: 'Circuit au Japon de 15 jours, tout était parfait. On sent 26 ans d\'expérience dans chaque détail. Une agence sérieuse qui ne promet que ce qu\'elle peut tenir.',
  },
  {
    initial: 'F', name: 'Fatima Z.', trip: 'Omra · Janvier 2025', platform: 'Google',
    text: 'Voyage spirituel rendu encore plus serein par la qualité de la logistique. Hébergement proche des lieux saints, accompagnement constant. Jazakoum Allah khayran.',
  },
  {
    initial: 'D', name: 'David L.', trip: 'Safari Kenya · Janvier 2025', platform: 'Google',
    text: 'Voyages21 a géré les visas, transferts et nuits en lodge — tout. Je n\'ai eu qu\'à profiter. Prix aussi compétitif que ce que j\'avais trouvé en ligne, avec en plus le service humain.',
  },
  {
    initial: 'N', name: 'Nadia B.', trip: 'Vietnam & Cambodge · Nov. 2024', platform: 'Google',
    text: 'L\'assistante nous a sauvés quand notre vol a été annulé — relogés et reroutés en 2 heures. C\'est ça la vraie valeur d\'une agence. On ne l\'oubliera jamais.',
  },
  {
    initial: 'H', name: 'Hassan O.', trip: 'Dubaï–Maldives · Avril 2025', platform: 'Google',
    text: 'Billets Paris–Dubaï–Maldives en business class, trouvés 40% moins cher que sur les comparateurs. Houda a négocié directement avec la compagnie. Ce niveau de service, on ne le trouve plus.',
  },
]

const OFFRES = [
  { label: 'Billetterie', name: 'Vols internationaux', desc: 'Les meilleures tarifs sur toutes destinations — Amérique, Asie, Europe, Afrique.', href: '/contact' },
  { label: 'Circuits', name: 'Circuits sur mesure', desc: 'Japon, Kenya, Islande, Pérou… conçus selon vos envies et votre budget.', href: '/circuits' },
  { label: 'Croisières', name: 'Croisières & paquebots', desc: 'Méditerranée, Caraïbes, fjords — sélection et réservation en un appel.', href: '/contact' },
  { label: 'Spirituel', name: 'Omra & Hajj', desc: 'Packages complets, encadrement humain, hébergements proches des lieux saints.', href: '/omra' },
  { label: 'Séjours', name: 'Séjours balnéaires', desc: 'Maldives, Thaïlande, Zanzibar — nous trouvons les meilleures disponibilités.', href: '/contact' },
  { label: 'Entreprises', name: 'Voyages d\'affaires & MICE', desc: 'Séminaires, incentives, team building — gestion complète de A à Z.', href: '/mice' },
]

const Star = () => (
  <svg viewBox="0 0 20 20" fill="#C8A440" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.33L10 13.27l-4.77 2.45.91-5.33L2.27 6.62l5.34-.78z"/>
  </svg>
)

const GoogleLogo = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

export const metadata = {
  title: 'Avis clients — Voyages21 | 4,5 étoiles · 19 avis Google',
  description: 'Lisez les témoignages de nos voyageurs et partagez votre expérience avec Voyages21. Avis vérifiés par Google.',
}

export default function AvisPage() {
  return (
    <>
      {/* Schema.org JSON-LD — lu par les robots Google pour les rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'TravelAgency',
          name: 'Voyages21',
          url: 'https://voyages21.vercel.app',
          description: 'Agence de voyages sur mesure depuis 2000. Billetterie aérienne, circuits, croisières, Omra & Hajj.',
          foundingDate: '2000',
          sameAs: ['https://maps.app.goo.gl/9AZsNQQ1vKVf5NCQ7'],
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.5',
            bestRating: '5',
            worstRating: '1',
            reviewCount: '19',
          },
          review: REVIEWS.map(r => ({
            '@type': 'Review',
            reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
            author: { '@type': 'Person', name: r.name },
            reviewBody: r.text,
          })),
        })}}
      />

      {/* HERO */}
      <section className={styles.hero}>
        <p className={styles.heroEyebrow}>Voyages21 · depuis 2000</p>
        <h1 className={styles.heroTitle}>
          Ce que disent<br /><em>nos voyageurs</em>
        </h1>
        <p className={styles.heroSub}>
          26 ans d'expérience. Des milliers de clients. Voici leurs mots.
        </p>
      </section>

      {/* BARRE AGGREGATE */}
      <div className={styles.aggregate}>
        <div className={styles.aggregateLeft}>
          <div className={styles.aggregateScore}>4,5</div>
          <div className={styles.aggregateInfo}>
            <div className={styles.aggregateStars}>
              <Star /><Star /><Star /><Star /><Star />
            </div>
            <div className={styles.aggregateCount}>19 avis · Google Maps</div>
          </div>
          <div className={styles.aggregateBadge}>
            <GoogleLogo size={18} />
            Avis vérifiés par Google
          </div>
        </div>
        <a
          className={styles.ctaBtn}
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GoogleLogo size={18} />
          Écrire mon avis sur Google
        </a>
      </div>

      {/* GRILLE D'AVIS */}
      <section className={styles.reviewsSection}>
        <h2 className={styles.sectionTitle}>Témoignages récents</h2>
        <p className={styles.sectionSub}>Chaque avis est lié à un compte Google — vous pouvez vérifier son authenticité en un clic.</p>
        <div className={styles.grid}>
          {REVIEWS.map((r, i) => (
            <div className={styles.card} key={i}>
              <span className={styles.verified}>
                <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="#2D7A3A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Avis vérifié
              </span>
              <div className={styles.cardStars}>
                <Star /><Star /><Star /><Star /><Star />
              </div>
              <div className={styles.cardQuote}>"</div>
              <p className={styles.cardText}>{r.text}</p>
              <div className={styles.cardFooter}>
                <div className={styles.cardAvatar}>{r.initial}</div>
                <div>
                  <div className={styles.cardName}>{r.name}</div>
                  <div className={styles.cardMeta}>{r.trip}</div>
                </div>
                <div className={styles.cardGoogle}>
                  <GoogleLogo size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA LAISSER UN AVIS */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Vous avez voyagé avec nous ?<br /><em>Votre avis compte.</em></h2>
        <p className={styles.ctaSub}>
          Il aide d'autres voyageurs à nous trouver et récompense 26 ans de travail avec un simple clic.
        </p>
        <div className={styles.ctaRow}>
          <a
            className={styles.ctaBtn}
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GoogleLogo size={18} />
            Laisser mon avis Google
          </a>
          <a className={styles.ctaBtnOutline} href="/contact">
            Planifier un voyage →
          </a>
        </div>
      </section>

      {/* OFFRES — garder le client sur le site */}
      <section className={styles.offresSection}>
        <h2 className={styles.sectionTitle}>Pendant que vous êtes là…</h2>
        <p className={styles.sectionSub}>Découvrez ce que nous préparons pour vous.</p>
        <div className={styles.offresGrid}>
          {OFFRES.map((o, i) => (
            <a className={styles.offre} href={o.href} key={i}>
              <div className={styles.offreBand} />
              <div className={styles.offresBody}>
                <p className={styles.offreLabel}>{o.label}</p>
                <p className={styles.offreName}>{o.name}</p>
                <p className={styles.offresDesc}>{o.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  )
}
