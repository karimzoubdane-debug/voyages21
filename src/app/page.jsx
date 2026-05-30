'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import styles from './home.module.css'

// ── DONNÉES ────────────────────────────────────────────────────────────────────

const IMPREVU_CARDS = [
  { type: 'Vol annulé',       action: "Vous n'avez même pas encore stressé que Wafa vous a déjà appelé. Elle gère le reroutage et sécurise votre hôtel si nécessaire.", agent: 'Wafa, votre conseillère' },
  { type: 'Bagage perdu',     action: "Fouad active immédiatement notre correspondant local. Un kit de première nécessité est organisé pendant que la compagnie est mise en demeure.", agent: 'Fouad, coordinateur terrain' },
  { type: 'Hôtel surréservé', action: "Ghizlane vous trouve un établissement équivalent ou supérieur en moins de 20 minutes. Vous n'avez qu'à vous laisser accompagner.", agent: 'Ghizlane, responsable hébergement' },
  { type: 'Transfert manqué', action: "Houda coordonne un chauffeur de remplacement sur place. Vous ne restez jamais seul face à l'imprévu — l'équipe prend le relais.", agent: 'Houda, logistique & transferts' },
  { type: 'Malaise en voyage',action: "Fouad contacte notre médecin partenaire sur place dans les minutes qui suivent. Votre assistance rapatriement est activée si nécessaire.", agent: 'Fouad, coordinateur terrain' },
  { type: 'Météo extrême',    action: "Wafa réorganise votre itinéraire en temps réel. Les activités sont reprogrammées, les déplacements sécurisés — votre voyage continue.", agent: 'Wafa, votre conseillère' },
  { type: 'Vol retardé',      action: "Ghizlane repousse les réservations en cascade — hôtel, guide, restaurant. Vous arrivez serein, tout est recalé sans frais.", agent: 'Ghizlane, responsable hébergement' },
  { type: 'Formalité bloquée',action: "Houda prend en charge les démarches consulaires et coordonne avec nos contacts locaux pour débloquer la situation le plus vite possible.", agent: 'Houda, logistique & transferts' },
]

const IMG = {
  turquie:   'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80',
  egypte:    'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=600&q=80',
  usa:       'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80',
  cuba:      'https://images.unsplash.com/photo-1520454974749-a8d17df2f6b8?w=600&q=80',
  perou:     'https://images.unsplash.com/photo-1526772662643-f8ccd6c23e21?w=600&q=80',
  espagne:   'https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&q=80',
  grece:     'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&q=80',
  italie:    'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=600&q=80',
  angleterre:'https://images.unsplash.com/photo-1501980689-03cb2f39a7a4?w=600&q=80',
  chine:     'https://images.unsplash.com/photo-1545893835-abaa50cbe628?w=600&q=80',
  malaisie:  'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=600&q=80',
  vietnam:   'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80',
  zanzibar:  'https://images.unsplash.com/photo-1516815231560-8f41ec531527?w=600&q=80',
  croisiere: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&q=80',
}

const VOYAGES = [
  { img: IMG.turquie,    dest: 'Turquie',              titre: 'Séjour à Istanbul',                             duree: '8 jours' },
  { img: IMG.turquie,    dest: 'Turquie',              titre: 'Istanbul & Antalya',                            duree: '8 jours' },
  { img: IMG.turquie,    dest: 'Turquie',              titre: 'Istanbul & Bodrum',                             duree: '8 jours' },
  { img: IMG.turquie,    dest: 'Turquie',              titre: 'Istanbul, Marmaris & Bodrum',                   duree: '11 jours' },
  { img: IMG.turquie,    dest: 'Turquie',              titre: 'Istanbul & Antalya',                            duree: '11 jours' },
  { img: IMG.egypte,     dest: 'Égypte',               titre: 'Le Caire · Nil · Hurghada',                    duree: '12 jours' },
  { img: IMG.egypte,     dest: 'Égypte',               titre: 'Le Caire & Sharm El Sheikh',                   duree: '11 jours' },
  { img: IMG.usa,        dest: 'USA & Canada',          titre: "L'Ouest Complet USA",                          duree: '13 jours' },
  { img: IMG.usa,        dest: 'USA & Canada',          titre: 'Les Joyaux du Canada & des USA',               duree: '11 jours' },
  { img: IMG.usa,        dest: 'USA & Canada',          titre: "Les Rocheuses & l'Ouest Classique",            duree: '17 jours' },
  { img: IMG.cuba,       dest: 'Cuba',                  titre: 'Cuba — La Havane & Varadero',                  duree: '9 jours' },
  { img: IMG.perou,      dest: 'Pérou',                 titre: 'Pérou — Les Merveilles Incas',                 duree: '11 jours' },
  { img: IMG.espagne,    dest: 'Europe',                titre: 'Al-Andalus — Madrid, Grenade, Séville',        duree: '7 jours' },
  { img: IMG.grece,      dest: 'Europe',                titre: 'Athènes, Rhodes & Kos',                        duree: '8 jours' },
  { img: IMG.grece,      dest: 'Europe',                titre: 'Athènes — Grèce Classique',                    duree: '7 jours' },
  { img: IMG.espagne,    dest: 'Europe',                titre: 'Espagne & Portugal',                           duree: '10 jours' },
  { img: IMG.italie,     dest: 'Europe',                titre: 'Circuit Italie',                               duree: '8 jours' },
  { img: IMG.angleterre, dest: 'Europe',                titre: 'Angleterre & Écosse',                          duree: '10 jours' },
  { img: IMG.chine,      dest: 'Chine',                 titre: 'Pékin, Shanghai & Merveilles',                 duree: '14 jours' },
  { img: IMG.malaisie,   dest: 'Malaisie & Thaïlande', titre: 'KL, Krabi & Phuket',                           duree: '14 jours' },
  { img: IMG.malaisie,   dest: 'Bangkok & Thaïlande',  titre: 'Bangkok, Krabi & Phuket',                      duree: '14 jours' },
  { img: IMG.vietnam,    dest: 'Vietnam',               titre: 'Hanoi à Saigon',                               duree: '14 jours' },
  { img: IMG.zanzibar,   dest: 'Zanzibar',              titre: 'Zanzibar — Détente & Loisirs',                 duree: '8 jours' },
  { img: IMG.croisiere,  dest: 'Croisières',            titre: 'Méditerranée — Espagne & Italie',              duree: '10 jours' },
  { img: IMG.croisiere,  dest: 'Croisières',            titre: 'Croisière Méditerranée Premium',               duree: '10 jours' },
]

const DESTINATIONS = [
  { img: IMG.turquie,   name: 'Turquie',              count: '5 circuits' },
  { img: IMG.egypte,    name: 'Égypte',               count: '2 circuits' },
  { img: IMG.espagne,   name: 'Europe',               count: '9 circuits' },
  { img: IMG.zanzibar,  name: 'Zanzibar',             count: '1 circuit'  },
  { img: IMG.usa,       name: 'USA & Canada',         count: '3 circuits' },
  { img: IMG.cuba,      name: 'Cuba',                 count: '1 circuit'  },
  { img: IMG.perou,     name: 'Pérou',                count: '1 circuit'  },
  { img: IMG.chine,     name: 'Chine',                count: '1 circuit'  },
  { img: IMG.malaisie,  name: 'Malaisie & Thaïlande', count: '2 circuits' },
  { img: IMG.vietnam,   name: 'Vietnam',              count: '1 circuit'  },
  { img: IMG.croisiere, name: 'Croisières',           count: '2 circuits' },
  { img: null,          name: 'Omra & Hajj',          count: '5 programmes', gradient: true },
]

const CURATEDVOYAGES = ['Turquie', 'Égypte', 'USA & Canada', 'Cuba', 'Pérou', 'Zanzibar', 'Vietnam', 'Croisières']
  .map(dest => VOYAGES.find(v => v.dest === dest))
  .filter(Boolean)

const HOWIT_CARDS = [
  {
    num: '1',
    title: 'Partagez votre projet',
    sub: "Vos envies, vos dates, votre budget. Un premier échange humain — jamais un formulaire impersonnel — pour cerner le voyage qui vous ressemble.",
    widget: 'chat1',
  },
  {
    num: '2',
    title: 'Co-créez votre itinéraire sur mesure',
    sub: "Avec votre conseillère, affinez chaque étape jusqu'à la perfection. Des adresses confidentielles, testées par nos équipes de terrain.",
    widget: 'chat2',
  },
  {
    num: '3',
    title: "Partez l'esprit totalement libre",
    sub: "Logistique verrouillée, carnet de voyage en main, numéro direct de votre conseillère. Votre seul rôle, désormais : profiter.",
    widget: 'notif1',
  },
  {
    num: '+',
    title: "Un imprévu ? Toute l'équipe se met en action",
    sub: "Vol annulé, litige, changement de dernière minute : vous n'êtes jamais seul. Nous prenons le relais à votre place, immédiatement.",
    widget: 'notif2',
  },
]

const TEAM_MEMBERS = [
  {
    name: 'Wafa',
    role: 'Vols & Hébergements',
    desc: "Dès le premier imprévu, elle appelle immédiatement notre représentant sur place. Vos vols et hébergements libérés avant que vous ayez eu le temps de stresser.",
  },
  {
    name: 'Wafa',
    role: 'Confirmations & Suivi',
    desc: "Confirmations, relances, ajustements de dernière minute — elle ne raccroche pas avant que tout soit réglé.",
  },
  {
    name: 'Fouad',
    role: 'Correspondants mondiaux',
    desc: "Il déploie notre réseau de partenaires terrain — où que vous soyez, une réponse locale en quelques minutes.",
  },
  {
    name: 'Ghizlane',
    role: 'Solutions & Alternatives',
    desc: "Rebooking, relogement, ajustement de dernière minute — elle trouve la sortie avant que vous ne voyiez l'impasse.",
  },
  {
    name: 'Houda',
    role: 'Supervision & Sérénité',
    desc: "En coulisses, elle supervise l'ensemble. Elle vous rappelle personnellement pour valider chaque étape.",
  },
]

// ── COMPOSANTS HELPERS ─────────────────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg className={styles.heroSearchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  )
}

function DestCard({ v }) {
  return (
    <div className={styles.destCard}>
      <div className={styles.destCardImg} style={{ backgroundImage: `url('${v.img}')` }} />
      <div className={styles.destCardBody}>
        <span className={styles.destCardTag}>{v.dest}</span>
        <h3 className={styles.destCardTitle}>{v.titre}</h3>
        <span className={styles.destCardDur}>{v.duree}</span>
      </div>
    </div>
  )
}

function DestCtaCard() {
  return (
    <Link href="/contact" className={styles.destCardCta}>
      <span className={styles.destCardCtaLabel}>Sur mesure</span>
      <p className={styles.destCardCtaTitle}>Votre voyage n&apos;existe pas encore.<br />Créons-le ensemble.</p>
      <span className={styles.destCardCtaBtn}>Nous contacter →</span>
    </Link>
  )
}

function Chat1() {
  return (
    <div className={styles.mockChat}>
      <div className={`${styles.chatBubble} ${styles.chatBubbleIn}`}>
        <span className={styles.chatWho}>Vous</span>
        Bonjour, on rêve d&apos;un Maroc authentique en avril, avec 2 nuits dans le désert.
      </div>
      <div className={styles.chatRow}>
        <div className={styles.chatAvatar}>W</div>
        <div className={`${styles.chatBubble} ${styles.chatBubbleOut}`}>
          <span className={styles.chatWho}>Wafa, votre conseillère</span>
          Avec grand plaisir ! Je vous prépare une première idée d&apos;itinéraire dès aujourd&apos;hui.
        </div>
      </div>
    </div>
  )
}

function Chat2() {
  return (
    <div className={styles.mockChat}>
      <div className={`${styles.chatBubble} ${styles.chatBubbleIn}`}>
        <span className={styles.chatWho}>Vous</span>
        On aimerait ajouter une journée et visiter Fès avec un guide local.
      </div>
      <div className={styles.chatRow}>
        <div className={styles.chatAvatar}>W</div>
        <div className={`${styles.chatBubble} ${styles.chatBubbleOut}`}>
          <span className={styles.chatWho}>Wafa, votre conseillère</span>
          Parfait ✦ je vous réserve notre guide historien et une table secrète dans la médina.
        </div>
      </div>
    </div>
  )
}

function Notif1() {
  return (
    <div className={styles.mockNotif}>
      <div className={styles.notifAvatar}>V</div>
      <div className={styles.notifBody}>
        <div className={styles.notifHead}>
          <strong>Tout est prêt 🎉</strong><span>il y a 2 min</span>
        </div>
        <div className={styles.notifText}>
          Votre carnet de voyage, vos billets et vos contacts sur place sont disponibles. Bon voyage !
        </div>
      </div>
    </div>
  )
}

function Notif2() {
  return (
    <div className={styles.mockNotif}>
      <div className={styles.notifAvatar}>F</div>
      <div className={styles.notifBody}>
        <div className={styles.notifTag}>Vol annulé</div>
        <div className={styles.notifHead}>
          <strong>Fouad — Voyages 21</strong><span>il y a 1 min</span>
        </div>
        <div className={styles.notifText}>
          Votre vol retour était annulé. C&apos;est déjà réglé : je vous ai rebooké sur le vol de 14h. Rien à faire de votre côté.
        </div>
      </div>
    </div>
  )
}

const WIDGETS = { chat1: <Chat1 />, chat2: <Chat2 />, notif1: <Notif1 />, notif2: <Notif2 /> }

// ── PAGE PRINCIPALE ────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeTab, setActiveTab]     = useState('monde')
  const [searchQuery, setSearchQuery] = useState('')
  const [modal1Open, setModal1Open]   = useState(false)
  const [modal2Open, setModal2Open]   = useState(false)
  const [coups, setCoups]             = useState([])
  const [cardsVisible, setCardsVisible] = useState([false, false, false, false])
  const howitCards = useRef([])

  // Tirage aléatoire pour "coups de cœur"
  const shuffleCoups = useCallback(() => {
    const shuffled = [...VOYAGES].sort(() => Math.random() - 0.5)
    setCoups(shuffled.slice(0, 6))
  }, [])

  useEffect(() => { shuffleCoups() }, [shuffleCoups])

  // Scroll reveal pour les fiches "Comment ça marche"
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const i = howitCards.current.indexOf(entry.target)
          if (i >= 0) {
            setCardsVisible(prev => {
              const next = [...prev]
              next[i] = true
              return next
            })
          }
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.2 })

    howitCards.current.forEach(card => { if (card) observer.observe(card) })
    return () => observer.disconnect()
  }, [])

  // Ferme les modales au clic extérieur
  useEffect(() => {
    const close = (e) => {
      if (e.key === 'Escape') { setModal1Open(false); setModal2Open(false) }
    }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [])

  // Empêche le scroll du body quand une modale est ouverte
  useEffect(() => {
    document.body.style.overflow = (modal1Open || modal2Open) ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modal1Open, modal2Open])

  // Filtre la recherche sur l'onglet "Voir nos voyages"
  const filteredVoyages = searchQuery.trim()
    ? VOYAGES.filter(v =>
        v.dest.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.titre.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : CURATEDVOYAGES

  const handleSearch = (q) => {
    setSearchQuery(q)
    if (q.trim()) setActiveTab('voyages')
  }

  // Doublon pour le carrousel seamless
  const carouselCards = [...IMPREVU_CARDS, ...IMPREVU_CARDS]

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          HERO — vidéo plein écran
      ══════════════════════════════════════════════════════ */}
      <section className={styles.hero}>
        <div className={styles.heroFallback} />
        <video className={styles.heroVideo} autoPlay muted loop playsInline>
          <source src="/video/2964957128.mp4" type="video/mp4" />
        </video>
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <p className={styles.heroLabel}>Voyages d&apos;Été 2026</p>
          <h1 className={styles.heroTitle}>
            Ici commence<br />votre bonheur.
          </h1>
          <p className={styles.heroSub}>
            L&apos;avenir appartient à ceux qui réservent tôt :<br />
            tarifs exclusifs, options garanties.
          </p>

          <div className={styles.heroSearch}>
            <SearchIcon />
            <input
              type="text"
              className={styles.heroSearchInput}
              placeholder="Rechercher une destination… Istanbul, Cuba, Zanzibar"
              value={searchQuery}
              onChange={e => handleSearch(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
            />
            <button
              className={styles.heroSearchBtn}
              onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Rechercher
            </button>
          </div>

          <div className={styles.heroActions}>
            <a href="#destinations" className={styles.btnPrimary}>Voir les programmes</a>
            <Link href="/contact" className={styles.btnGhost}>Nous contacter</Link>
          </div>
        </div>

        <div className={styles.heroScroll}>
          <div className={styles.heroScrollBar} />
          <span className={styles.heroScrollLabel}>Défiler</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BANDE STATS
      ══════════════════════════════════════════════════════ */}
      <div className={styles.statsbar}>
        <div className={styles.statsbarItem}>
          <a href="#destinations" style={{ color: 'inherit', textDecoration: 'none' }}>
            Maroc · Croisières · Omra &amp; Hajj
          </a>
          <span>· Voyages sur mesure</span>
        </div>
        <div className={styles.statsbarItem}>
          <span className={styles.statsbarStar}>★★★★★</span>
          <span className={styles.statsbarBold}>Agence de confiance</span>
          <span>depuis 2000</span>
        </div>
        <div className={styles.statsbarItem}>
          Accompagnement personnalisé &amp; tarifs garantis
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          POURQUOI NOUS CHOISIR — 4 colonnes
      ══════════════════════════════════════════════════════ */}
      <section className={styles.why}>
        <div className={styles.whyHeader}>
          <p className={styles.whySurtitle}>Notre engagement</p>
          <h2 className={styles.whyMainTitle}>Pourquoi nous choisir</h2>
        </div>

        <div className={styles.whyGrid}>
          {/* Col 1 — Le Problème */}
          <div className={styles.whyLeft}>
            <h3 className={styles.whyLeftTitle}>
              Concocter son voyage sur internet : l&apos;illusion de l&apos;économie,{' '}
              <span style={{ color: '#C0392B' }}>un pari à haut risque</span>
            </h3>
            <ul className={`${styles.whyList} ${styles.whyLeftList}`}>
              <li><strong>Réalité amère :</strong> Un voyage bâti sur écran qui vire au parcours du combattant au moindre pépin.</li>
              <li><strong>Livré à vous-même :</strong> Aucun humain ni assistance immédiate en cas d&apos;urgence ou de vol annulé.</li>
              <li><strong>Leurre financier :</strong> Des taxes et frais cachés qui coûtent finalement dix fois plus cher que les économies espérées.</li>
            </ul>
            <button className={styles.whyReadBtn} onClick={() => setModal1Open(true)}>
              Ne laissez rien au hasard →
            </button>
          </div>

          {/* Col 2 — Maîtrise budgétaire */}
          <div className={styles.whyBlock}>
            <h3 className={styles.whyBlockTitle}>Maîtrise budgétaire &amp; logistique</h3>
            <ul className={styles.whyList}>
              <li><strong>Anticipation totale :</strong> Chaque étape verrouillée en amont pour éliminer les frais imprévus.</li>
              <li><strong>Transparence absolue :</strong> Visibilité tarifaire complète et contractuelle, sans aucune surprise à l&apos;arrivée.</li>
              <li><strong>Garantie de fluidité :</strong> Un itinéraire sans accroc, entièrement orchestré par des professionnels.</li>
            </ul>
          </div>

          {/* Col 3 — Savoir-faire */}
          <div className={styles.whyBlock}>
            <h3 className={styles.whyBlockTitle}>Notre Savoir-Faire Unique</h3>
            <ul className={styles.whyList}>
              <li><strong>Au-delà d&apos;internet :</strong> Des circuits singuliers et sur mesure, à l&apos;opposé du tourisme de masse.</li>
              <li><strong>Expertise Voyages 21 :</strong> Des prestations testées et validées par nos propres équipes de terrain.</li>
              <li><strong>Adresses confidentielles :</strong> Un accès exclusif à des lieux secrets impossibles à dénicher seul.</li>
            </ul>
          </div>

          {/* Col 4 — Assistance humaine */}
          <div className={styles.whyBlock}>
            <h3 className={styles.whyBlockTitle}>Assistance humaine &amp; immédiate</h3>
            <ul className={styles.whyList}>
              <li><strong>Zéro écran, zéro robot :</strong> Une équipe dédiée et joignable, jamais livré à vous-même.</li>
              <li><strong>Réactivité instantanée :</strong> En cas de perturbation, nous prenons le relais à votre place.</li>
              <li><strong>Esprit libre :</strong> Une présence locale attentive pour que votre seul rôle soit de profiter.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CAROUSEL IMPRÉVUS
      ══════════════════════════════════════════════════════ */}
      <div className={styles.imprevuSection}>
        <h3 className={styles.imprevuTitle}>
          En cas d&apos;imprévu,<br />
          <em>votre problème devient notre problème</em><br />
          et toute l&apos;équipe se met en action.
        </h3>
        <div className={styles.imprevuWrap} aria-hidden="true">
          <div className={styles.imprevuTrack}>
            {carouselCards.map((card, i) => (
              <div key={i} className={styles.imprevuCard}>
                <span className={styles.imprevuBadge}>⚡ Alerte</span>
                <div className={styles.imprevuType}>{card.type}</div>
                <p className={styles.imprevuAction}>{card.action}</p>
                <div className={styles.imprevuAgent}>{card.agent}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          DESTINATIONS — onglets
      ══════════════════════════════════════════════════════ */}
      <section className={styles.dest} id="destinations">
        <div className={styles.destHeader}>
          <p className={styles.destSup}>33 circuits · 13 destinations</p>
          <h2 className={styles.destTitle}>Des horizons<br /><em>taillés sur mesure.</em></h2>
          <p className={styles.destSub}>
            Depuis 2000, nous concevons des voyages d&apos;exception pour des voyageurs qui refusent
            le tourisme ordinaire. Chaque itinéraire est unique, jamais catalogué.
          </p>
        </div>

        <div className={styles.destTabs}>
          {[
            { id: 'monde',   label: 'Découvrir le monde' },
            { id: 'coups',   label: 'Nos coups de cœur' },
            { id: 'voyages', label: 'Voir nos voyages' },
          ].map(tab => (
            <button
              key={tab.id}
              className={`${styles.destTab} ${activeTab === tab.id ? styles.destTabActive : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Panel Découvrir le monde */}
        <div className={`${styles.destPanel} ${activeTab === 'monde' ? styles.destPanelActive : ''}`}>
          <div className={styles.destMondeGrid}>
            {DESTINATIONS.map(d => (
              <div
                key={d.name}
                className={styles.destMondeTile}
                style={d.gradient
                  ? { background: 'linear-gradient(160deg,#1B6B4A 0%,#0d2c1a 100%)' }
                  : { backgroundImage: `url('${d.img}')` }
                }
              >
                <div className={styles.destMondeName}>
                  {d.name}
                  <span className={styles.destMondeCount}>{d.count}</span>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.destActions}>
            <Link href="/circuits/classiques" className={styles.btnTous}>Voir tous nos voyages →</Link>
          </div>
        </div>

        {/* Panel Coups de cœur */}
        <div className={`${styles.destPanel} ${activeTab === 'coups' ? styles.destPanelActive : ''}`}>
          <div className={styles.destGrid}>
            {coups.map((v, i) => <DestCard key={i} v={v} />)}
          </div>
          <div className={styles.destActions}>
            <button className={styles.btnShuffle} onClick={shuffleCoups}>↻ Autres sélections</button>
            <Link href="/circuits/classiques" className={styles.btnTous}>Voir tous nos voyages →</Link>
          </div>
        </div>

        {/* Panel Voir nos voyages */}
        <div className={`${styles.destPanel} ${activeTab === 'voyages' ? styles.destPanelActive : ''}`}>
          {filteredVoyages.length === 0 ? (
            <p style={{ fontFamily: 'Geist, sans-serif', color: 'rgba(12,12,12,.6)', padding: '24px 0' }}>
              Aucun résultat pour &laquo;&nbsp;{searchQuery}&nbsp;&raquo;.
            </p>
          ) : (
            <div className={styles.destGrid}>
              {filteredVoyages.map((v, i) => <DestCard key={i} v={v} />)}
              <DestCtaCard />
            </div>
          )}
          <div className={styles.destActions}>
            <Link href="/circuits/classiques" className={styles.btnTous}>Voir tous nos voyages →</Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          RÉSERVER TÔT — 4 colonnes
      ══════════════════════════════════════════════════════ */}
      <section className={styles.early}>
        <div className={styles.earlyHeader}>
          <h2 className={styles.earlyTitle}>
            Le monde appartient<br />à ceux qui <em>réservent tôt.</em>
          </h2>
        </div>

        <div className={styles.earlyGrid}>
          <div className={styles.earlyCol}>
            <p className={styles.earlyColTitle}>Billets de transport</p>
            <div className={styles.earlyColNum}>−30%</div>
            <p className={styles.earlyColText}>
              En réservant plusieurs mois à l&apos;avance, les tarifs aériens baissent jusqu&apos;à 30&nbsp;%.
              Le même vol, deux fois moins cher.
            </p>
          </div>

          <div className={styles.earlyCol}>
            <p className={styles.earlyColTitle}>Meilleures disponibilités</p>
            <div className={styles.earlyColNum}>100%</div>
            <p className={styles.earlyColText}>
              Hôtels exclusifs, suites avec vue, excursions privées — les meilleures places partent
              en premier. Toujours.
            </p>
          </div>

          <div className={styles.earlyCol}>
            <p className={styles.earlyColTitle}>Compromis de dernière minute</p>
            <div className={styles.earlyColNum}>Zéro</div>
            <p className={styles.earlyColText}>
              Finis les choix par défaut. Vous voyagez exactement comme vous l&apos;avez imaginé,
              sans concession.
            </p>
          </div>

          <div className={styles.earlyCol}>
            <p className={styles.earlyColTitle}>Le secret des voyageurs avisés</p>
            <div className={styles.earlyPreview}>
              <p>
                Le luxe du voyage ne réside pas seulement dans la destination — il se niche aussi
                dans sa préparation. Concevoir votre projet plusieurs mois à l&apos;avance est le secret
                le mieux gardé pour conjuguer sérénité absolue et excellence tarifaire.
              </p>
            </div>
            <button className={styles.btnMalin} onClick={() => setModal2Open(true)}>
              Prenez une longueur d&apos;avance →
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          COMMENT ÇA MARCHE — scroll épinglé
      ══════════════════════════════════════════════════════ */}
      <section className={styles.howit} id="comment-ca-marche">
        <div className={styles.howitPin}>
          <p className={styles.howitSurtitle}>L&apos;expérience Voyages 21</p>
          <h2 className={styles.howitTitle}>Voyages 21,<br />comment ça marche&nbsp;?</h2>
        </div>

        <div className={styles.howitCards}>
          {HOWIT_CARDS.map((card, i) => (
            <article
              key={i}
              className={`${styles.howitCard} ${cardsVisible[i] ? styles.howitCardVisible : ''}`}
              ref={el => { howitCards.current[i] = el }}
            >
              <div className={styles.howitCardLeft}>
                <div className={styles.howitCardNum}>{card.num}</div>
                <h3 className={styles.howitCardTitle}>{card.title}</h3>
                <p className={styles.howitCardSub}>{card.sub}</p>
              </div>
              <div className={styles.howitCardRight}>
                {WIDGETS[card.widget]}
                <p className={styles.howitCardCaption}>
                  {i === 0 && <>Une conseillère dédiée vous répond <strong>sous 24h</strong>.</>}
                  {i === 1 && <>Votre voyage se construit <strong>de A à Z avec vous</strong>.</>}
                  {i === 2 && <>Un contact joignable <strong>à tout instant</strong>, où que vous soyez.</>}
                  {i === 3 && <>Votre équipe veille <strong>7j/7</strong>, partout dans le monde.</>}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ÉQUIPE
      ══════════════════════════════════════════════════════ */}
      <section className={styles.team} id="equipe">
        <div className={styles.teamHeader}>
          <p className={styles.teamSup}>Votre équipe dédiée</p>
          <h2 className={styles.teamTitle}>
            Seul, vous subissez.<br />
            Avec nous, <em>votre problème devient le nôtre.</em>
          </h2>
          <p className={styles.teamSub}>
            Pas de répondeur automatique. Jamais. Grâce à nos représentants sur place dans le monde
            entier, vous n&apos;êtes jamais livré à vous-même. Des personnes réelles — avec un prénom,
            une voix, une présence.
          </p>
        </div>

        <div className={styles.teamGrid}>
          {TEAM_MEMBERS.map((m, i) => (
            <div key={i} className={styles.teamMember}>
              <div className={styles.teamName}>{m.name}</div>
              <p className={styles.teamRole}>{m.role}</p>
              <p className={styles.teamDesc} dangerouslySetInnerHTML={{ __html: m.desc.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            </div>
          ))}
        </div>

        <div className={styles.teamQuote}>
          <blockquote>&ldquo;Laissez-nous la logistique. Profitez de votre voyage.&rdquo;</blockquote>
          <cite>— L&apos;équipe Voyages21</cite>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          MODALE 1 — Pourquoi nous choisir
      ══════════════════════════════════════════════════════ */}
      <div
        className={`${styles.modalBackdrop} ${modal1Open ? styles.modalBackdropOpen : ''}`}
        onClick={e => { if (e.target === e.currentTarget) setModal1Open(false) }}
      >
        <div className={styles.modal}>
          <button className={styles.modalClose} onClick={() => setModal1Open(false)}>&times;</button>
          <p className={styles.modalSup}>Pourquoi nous choisir</p>
          <h3 className={styles.modalH3}>
            L&apos;illusion du &laquo;&nbsp;faire soi-même&nbsp;&raquo;&nbsp;:<br />
            Pourquoi risquer vos vacances&nbsp;?
          </h3>
          <div className={styles.modalBody}>
            <p>
              Partir à l&apos;aventure par ses propres moyens a un parfum de liberté, mais la réalité
              du terrain réserve souvent un tout autre scénario. Entre un vol annulé sans aucun
              interlocuteur au bout du fil, une mauvaise surprise à l&apos;arrivée, ou la perte de
              vos billets sans recours, le voyage de vos rêves peut instantanément se transformer
              en parcours du combattant.
            </p>
            <p>
              On pense souvent économiser en organisant tout soi-même. Pourtant, la moindre fausse
              note logistique finit par coûter deux à trois fois le prix initialement prévu. Sans
              compter le stress qui gâche l&apos;expérience.
            </p>
            <h4>Le Choix de la Sérénité : L&apos;Engagement Voyages21</h4>
            <ul>
              <li><strong>Un accompagnement de bout en bout :</strong> Nous sommes à vos côtés, du premier jour des préparatifs jusqu&apos;à votre retour à la maison.</li>
              <li><strong>Une présence humaine réelle :</strong> En cas d&apos;imprévu, pas de répondeur automatique. Un représentant de Voyages21 est toujours présent sur place.</li>
              <li><strong>La souplesse et la garantie :</strong> Nous gérons la logistique avec la flexibilité que seul un professionnel peut offrir.</li>
            </ul>
          </div>
          <div className={styles.modalCta}>
            <a href="#destinations" className={styles.btnPrimary} onClick={() => setModal1Open(false)}>
              Voir tous nos voyages
            </a>
            <button className={styles.btnReplier} onClick={() => setModal1Open(false)}>Replier ↑</button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          MODALE 2 — Réserver tôt
      ══════════════════════════════════════════════════════ */}
      <div
        className={`${styles.modalBackdrop} ${modal2Open ? styles.modalBackdropOpen : ''}`}
        onClick={e => { if (e.target === e.currentTarget) setModal2Open(false) }}
      >
        <div className={styles.modal}>
          <button className={styles.modalClose} onClick={() => setModal2Open(false)}>&times;</button>
          <p className={styles.modalSup}>Le secret des voyageurs avisés</p>
          <h3 className={styles.modalH3}>
            Le monde appartient à ceux<br />qui réservent tôt.
          </h3>
          <div className={styles.modalBody}>
            <p>
              Le luxe du voyage ne réside pas seulement dans la destination — il se niche aussi dans
              sa préparation. Concevoir votre projet <strong>plusieurs mois à l&apos;avance</strong> est
              le secret le mieux gardé pour conjuguer <strong>sérénité absolue</strong> et{' '}
              <strong>excellence tarifaire</strong>.
            </p>
            <p>
              En réservant tôt, vous profitez des meilleures disponibilités dans nos hôtels les plus
              exclusifs à des prix souvent imbattables, tout en bénéficiant de billets de transport{' '}
              <strong>jusqu&apos;à 30&nbsp;% moins chers</strong>.
            </p>
            <p>
              Loin de la précipitation stressante et des choix par défaut de la dernière minute,
              l&apos;anticipation vous offre <strong>le privilège du choix</strong> et la certitude de
              la perfection.
            </p>
            <p>
              Le voyage idéal commence dès le premier jour de sa planification.{' '}
              <strong>Confiez-le à Voyages21 — et partez l&apos;esprit libre.</strong>
            </p>
          </div>
          <div className={styles.modalCta}>
            <a href="#destinations" className={styles.btnPrimary} onClick={() => setModal2Open(false)}>
              Voir tous nos voyages
            </a>
            <button className={styles.btnReplier} onClick={() => setModal2Open(false)}>Replier ↑</button>
          </div>
        </div>
      </div>
    </>
  )
}
