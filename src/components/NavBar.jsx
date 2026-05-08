'use client'
import { useState, useEffect, useRef, Fragment } from 'react'
import Link from 'next/link'

// ── Données ──────────────────────────────────────────────────────────────────

const INSPIRATION = [
  { label: 'Villes & Cultures',      img: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=300&q=75', href: '/circuits/classiques' },
  { label: 'Dunes & Désert',         img: 'https://images.unsplash.com/photo-1548813395-edd5373a8e72?w=300&q=75', href: '/circuits/raid-4x4' },
  { label: 'Plages paradisiaques',   img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&q=75', href: '/circuits/classiques' },
  { label: '100% Solidaire',         img: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=300&q=75', href: '/marhaba' },
  { label: 'Au cœur des Médinas',    img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=300&q=75', href: '/circuits/classiques' },
  { label: "Au cœur de l'Atlas",     img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=300&q=75', href: '/circuits/classiques' },
  { label: '100% Culinaire',         img: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=300&q=75', href: '/experiences' },
]

const AVEC_QUI = [
  { label: 'Solo',                   img: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=300&q=75', href: '/experiences' },
  { label: 'En couple',             img: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=300&q=75', href: '/experiences' },
  { label: 'Entre amis & famille',  img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&q=75', href: '/experiences' },
  { label: 'En petits groupes',     img: 'https://images.unsplash.com/photo-1501554728187-ce583db33af7?w=300&q=75', href: '/marhaba' },
]

const EXPERIENCES_GROUPS = [
  {
    cat: 'Séjours',
    items: [
      { label: 'Marrakech', href: '/circuits/classiques' },
      { label: 'Fès',       href: '/circuits/classiques' },
      { label: 'Tanger',    href: '/circuits/classiques' },
    ],
  },
  {
    cat: 'Circuits',
    items: [
      { label: 'Circuit Mini Bus', href: '/circuits/classiques' },
      { label: 'Autotours',        href: '/experiences/circuits-autotours' },
    ],
  },
  {
    cat: 'Rally 4x4',
    items: [
      { label: 'Atlas & Chegaga',   href: '/circuits/raid-4x4' },
      { label: 'Folies Berbères',   href: '/circuits/raid-4x4' },
      { label: 'Grand Erg Chebbi',  href: '/circuits/raid-4x4' },
    ],
  },
  {
    cat: 'Circuit Bike',
    items: [
      { label: 'Atlantique & Anti-Atlas', href: '/circuits/moto' },
      { label: 'Haut Atlas & Désert',     href: '/circuits/moto' },
    ],
  },
]

const APROPOS = [
  { label: 'Notre expertise',   href: '/about' },
  { label: 'Nos engagements',   href: '/about#engagements' },
  { label: 'FAQ',               href: '/faq', separator: true },
]

const MOBILE_ITEMS = [
  { label: 'Marhaba',                       href: '/marhaba' },
  { label: 'Inspiration',                   href: '#',                          section: true },
  { label: 'Villes & Cultures',             href: '/circuits/classiques',       indent: true },
  { label: 'Dunes & Désert',                href: '/circuits/raid-4x4',         indent: true },
  { label: 'Plages paradisiaques',          href: '/circuits/classiques',       indent: true },
  { label: '100% Solidaire',               href: '/marhaba',                   indent: true },
  { label: 'Au cœur des Médinas',          href: '/circuits/classiques',       indent: true },
  { label: "Au cœur de l'Atlas",           href: '/circuits/classiques',       indent: true },
  { label: '100% Culinaire',               href: '/experiences',               indent: true },
  { label: 'Explorer',                      href: '#',                          section: true },
  { label: 'Solo',                          href: '/experiences',               indent: true },
  { label: 'En couple',                     href: '/experiences',               indent: true },
  { label: 'Entre amis & famille',          href: '/experiences',               indent: true },
  { label: 'En petits groupes',            href: '/marhaba',                   indent: true },
  { label: 'Séjours (Marra. / Fès / Tang.)', href: '/circuits/classiques',     indent: true },
  { label: 'Circuits & Autotours',          href: '/experiences/circuits-autotours', indent: true },
  { label: 'Rally 4x4',                    href: '/circuits/raid-4x4',         indent: true },
  { label: 'Circuit Bike',                 href: '/circuits/moto',             indent: true },
  { label: 'À propos',                     href: '#',                          section: true },
  { label: 'Notre expertise',              href: '/about',                     indent: true },
  { label: 'Nos engagements',              href: '/about#engagements',         indent: true },
  { label: 'FAQ',                          href: '/faq',                       indent: true },
]

// ── Composants locaux ─────────────────────────────────────────────────────────

function Chevron({ active }) {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ marginTop: 1, flexShrink: 0 }}>
      <path
        d="M1 1l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ transition: 'transform .2s', display: 'block', transform: active ? 'rotate(180deg)' : 'rotate(0deg)' }}
      />
    </svg>
  )
}

const LABEL_STYLE = {
  fontFamily:    "'DM Sans', sans-serif",
  fontSize:      '0.68rem',
  fontWeight:    600,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color:         'var(--gold)',
  marginBottom:  '1.4rem',
}

// ── NavBar ────────────────────────────────────────────────────────────────────

export default function NavBar() {
  const [scrolled,    setScrolled]   = useState(false)
  const [mobileOpen,  setMobileOpen] = useState(false)
  const [openMenu,    setOpenMenu]   = useState(null) // 'inspiration' | 'explorer' | 'apropos' | null
  const closeTimer = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openPanel    = (name) => { clearTimeout(closeTimer.current); setOpenMenu(name) }
  const scheduleClose = ()    => { closeTimer.current = setTimeout(() => setOpenMenu(null), 180) }
  const cancelClose  = ()     => clearTimeout(closeTimer.current)

  const triggerStyle = (name) => ({
    display:       'flex',
    alignItems:    'center',
    gap:           '4px',
    padding:       '0.5rem 0.9rem',
    background:    'none',
    border:        'none',
    cursor:        'pointer',
    color:         openMenu === name ? 'var(--gold)' : 'rgba(255,255,255,0.9)',
    fontFamily:    "'DM Sans', sans-serif",
    fontSize:      '0.82rem',
    fontWeight:    500,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    transition:    'color .2s',
    whiteSpace:    'nowrap',
  })

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>

        {/* ── Groupe gauche : Logo + nav principale ── */}
        <div className="nav-left">

          <Link href="/" className="navbar-logo" style={{ textDecoration: 'none', marginRight: '0.6rem' }}>
            <span>VOYAGES<span style={{ color: 'var(--gold)' }}>21</span></span>
          </Link>

          {/* Marhaba */}
          <Link
            href="/marhaba"
            style={{
              padding:       '0.5rem 0.9rem',
              color:         'rgba(255,255,255,0.9)',
              textDecoration:'none',
              fontFamily:    "'DM Sans', sans-serif",
              fontSize:      '0.82rem',
              fontWeight:    500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              transition:    'color .2s',
              whiteSpace:    'nowrap',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.9)'}
          >
            Marhaba
          </Link>

          {/* Inspiration trigger */}
          <div onMouseEnter={() => openPanel('inspiration')} onMouseLeave={scheduleClose}>
            <button style={triggerStyle('inspiration')}>
              Inspiration <Chevron active={openMenu === 'inspiration'} />
            </button>
          </div>

          {/* Explorer trigger */}
          <div onMouseEnter={() => openPanel('explorer')} onMouseLeave={scheduleClose}>
            <button style={triggerStyle('explorer')}>
              Explorer <Chevron active={openMenu === 'explorer'} />
            </button>
          </div>
        </div>

        {/* ── Groupe droit : À propos + Contact ── */}
        <div className="nav-right">

          {/* À propos — dropdown relatif */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => openPanel('apropos')}
            onMouseLeave={scheduleClose}
          >
            <button style={triggerStyle('apropos')}>
              À propos <Chevron active={openMenu === 'apropos'} />
            </button>

            {openMenu === 'apropos' && (
              <ul
                onMouseEnter={cancelClose}
                onMouseLeave={scheduleClose}
                style={{
                  position:   'absolute',
                  top:        'calc(100% + 8px)',
                  right:      0,
                  background: 'var(--navy)',
                  border:     '1px solid rgba(200,160,10,0.3)',
                  borderTop:  '2px solid var(--gold)',
                  minWidth:   '210px',
                  zIndex:     1001,
                  boxShadow:  '0 8px 30px rgba(0,0,0,0.4)',
                  padding:    '0.4rem 0',
                  listStyle:  'none',
                }}
              >
                {APROPOS.map((item) => (
                  <Fragment key={item.href + item.label}>
                    {item.separator && (
                      <li><div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '0.3rem 0' }} /></li>
                    )}
                    <li>
                      <Link
                        href={item.href}
                        onClick={() => setOpenMenu(null)}
                        style={{
                          display:        'block',
                          padding:        '0.7rem 1.4rem',
                          color:          'rgba(255,255,255,0.85)',
                          textDecoration: 'none',
                          fontSize:       '0.82rem',
                          fontWeight:     400,
                          letterSpacing:  '0.04em',
                          transition:     'color .15s, background .15s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,160,10,0.12)'; e.currentTarget.style.color = 'var(--gold)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)' }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  </Fragment>
                ))}
              </ul>
            )}
          </div>

          {/* Contact CTA */}
          <Link href="/contact" className="navbar-cta">Contact</Link>
        </div>

        {/* ── Burger mobile ── */}
        <button
          className="burger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span style={{ transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : '' }} />
          <span style={{ opacity: mobileOpen ? 0 : 1 }} />
          <span style={{ transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : '' }} />
        </button>
      </nav>

      {/* ══════════════════════════════════════════════════════════════════════
          MEGA MENU — INSPIRATION
      ══════════════════════════════════════════════════════════════════════ */}
      {openMenu === 'inspiration' && (
        <div
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          style={{
            position:   'fixed',
            top:        '80px',
            left:       0,
            right:      0,
            background: 'var(--navy)',
            borderTop:  '2px solid var(--gold)',
            zIndex:     999,
            padding:    '2rem 3rem 1.8rem',
            boxShadow:  '0 8px 40px rgba(0,0,0,0.5)',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p style={LABEL_STYLE}>Voyagez par thème</p>

            <div style={{ display: 'flex', gap: '1.4rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {INSPIRATION.map(item => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpenMenu(null)}
                  style={{
                    textDecoration: 'none',
                    flexShrink:     0,
                    display:        'flex',
                    flexDirection:  'column',
                    alignItems:     'center',
                    gap:            '0.65rem',
                    width:          '115px',
                  }}
                >
                  <div
                    style={{
                      width:               '110px',
                      height:              '110px',
                      borderRadius:        '10px',
                      backgroundImage:     `url(${item.img})`,
                      backgroundSize:      'cover',
                      backgroundPosition:  'center',
                      border:              '2px solid transparent',
                      transition:          'border-color .2s, transform .2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.transform = 'scale(1.05)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'scale(1)' }}
                  />
                  <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.74rem', fontWeight: 500, textAlign: 'center', lineHeight: 1.3 }}>
                    {item.label}
                  </span>
                </Link>
              ))}

              {/* Card "Où partir ?" comme Evaneos */}
              <Link
                href="/contact"
                onClick={() => setOpenMenu(null)}
                style={{
                  textDecoration: 'none',
                  flexShrink:     0,
                  display:        'flex',
                  flexDirection:  'column',
                  alignItems:     'center',
                  gap:            '0.65rem',
                  width:          '115px',
                }}
              >
                <div
                  style={{
                    width:          '110px',
                    height:         '110px',
                    borderRadius:   '10px',
                    border:         '2px solid rgba(255,255,255,0.25)',
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    transition:     'border-color .2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'}
                >
                  <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.78rem', textAlign: 'center', padding: '0.5rem', lineHeight: 1.4 }}>Où<br/>partir ?</span>
                </div>
                <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.74rem', fontWeight: 500, textAlign: 'center' }}>
                  Demandez-nous
                </span>
              </Link>
            </div>

            <Link
              href="/circuits/classiques"
              onClick={() => setOpenMenu(null)}
              style={{
                display:        'inline-flex',
                alignItems:     'center',
                gap:            '6px',
                marginTop:      '1.5rem',
                color:          'var(--gold)',
                fontSize:       '0.82rem',
                textDecoration: 'none',
                fontWeight:     600,
                letterSpacing:  '0.04em',
                transition:     'gap .2s',
              }}
              onMouseEnter={e => e.currentTarget.style.gap = '10px'}
              onMouseLeave={e => e.currentTarget.style.gap = '6px'}
            >
              Voir tous nos circuits →
            </Link>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          MEGA MENU — EXPLORER
      ══════════════════════════════════════════════════════════════════════ */}
      {openMenu === 'explorer' && (
        <div
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          style={{
            position:   'fixed',
            top:        '80px',
            left:       0,
            right:      0,
            background: 'var(--navy)',
            borderTop:  '2px solid var(--gold)',
            zIndex:     999,
            padding:    '2rem 3rem',
            boxShadow:  '0 8px 40px rgba(0,0,0,0.5)',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '4rem', alignItems: 'flex-start' }}>

            {/* Avec qui partir ? */}
            <div style={{ flexShrink: 0 }}>
              <p style={LABEL_STYLE}>Avec qui partir ?</p>
              <div style={{ display: 'flex', gap: '1.2rem' }}>
                {AVEC_QUI.map(item => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpenMenu(null)}
                    style={{
                      textDecoration: 'none',
                      display:        'flex',
                      flexDirection:  'column',
                      alignItems:     'center',
                      gap:            '0.5rem',
                      width:          '90px',
                    }}
                  >
                    <div
                      style={{
                        width:              '80px',
                        height:             '80px',
                        borderRadius:       '50%',
                        backgroundImage:    `url(${item.img})`,
                        backgroundSize:     'cover',
                        backgroundPosition: 'center',
                        border:             '2px solid transparent',
                        transition:         'border-color .2s, transform .2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.transform = 'scale(1.08)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'scale(1)' }}
                    />
                    <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.72rem', fontWeight: 500, textAlign: 'center', lineHeight: 1.3 }}>
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Séparateur vertical */}
            <div style={{ width: '1px', background: 'rgba(255,255,255,0.12)', alignSelf: 'stretch', flexShrink: 0 }} />

            {/* Expériences */}
            <div style={{ flex: 1 }}>
              <p style={LABEL_STYLE}>Expériences</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0 2.5rem' }}>
                {EXPERIENCES_GROUPS.map(group => (
                  <div key={group.cat}>
                    <p style={{
                      fontSize:      '0.68rem',
                      fontWeight:    700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color:         'rgba(255,255,255,0.4)',
                      marginBottom:  '0.7rem',
                    }}>
                      {group.cat}
                    </p>
                    <ul style={{ listStyle: 'none' }}>
                      {group.items.map(item => (
                        <li key={item.label} style={{ marginBottom: '0.4rem' }}>
                          <Link
                            href={item.href}
                            onClick={() => setOpenMenu(null)}
                            style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.84rem', transition: 'color .15s' }}
                            onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          MENU MOBILE
      ══════════════════════════════════════════════════════════════════════ */}
      {mobileOpen && (
        <div style={{
          position:    'fixed',
          top:         '80px',
          left:        0,
          right:       0,
          background:  'var(--navy)',
          zIndex:      999,
          borderTop:   '2px solid var(--gold)',
          maxHeight:   'calc(100vh - 80px)',
          overflowY:   'auto',
          padding:     '1.2rem 1.5rem',
        }}>
          <ul style={{ listStyle: 'none' }}>
            {MOBILE_ITEMS.map(item => (
              <li
                key={item.href + item.label}
                style={{ borderBottom: item.section ? 'none' : '1px solid rgba(255,255,255,0.06)' }}
              >
                <Link
                  href={item.href}
                  onClick={item.section ? undefined : () => setMobileOpen(false)}
                  style={{
                    display:       'block',
                    padding:       item.section ? '1.1rem 0 0.4rem' : '0.75rem 0',
                    paddingLeft:   item.indent ? '1rem' : '0',
                    color:         item.section ? 'var(--gold)' : 'rgba(255,255,255,0.85)',
                    textDecoration:'none',
                    fontSize:      item.section ? '0.68rem' : '0.85rem',
                    fontWeight:    item.section ? 700 : 400,
                    letterSpacing: item.section ? '0.2em' : '0.04em',
                    textTransform: item.section ? 'uppercase' : 'none',
                    cursor:        item.section ? 'default' : 'pointer',
                    pointerEvents: item.href === '#' ? 'none' : 'auto',
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li style={{ paddingTop: '1.2rem' }}>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                style={{
                  display:        'block',
                  padding:        '0.85rem 1.5rem',
                  background:     'var(--gold)',
                  color:          'var(--dark)',
                  textDecoration: 'none',
                  fontSize:       '0.85rem',
                  fontWeight:     700,
                  letterSpacing:  '0.1em',
                  textTransform:  'uppercase',
                  textAlign:      'center',
                }}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}
