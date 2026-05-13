'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const CADRAN = {
  img:  'https://images.unsplash.com/photo-1548813395-edd5373a8e72?w=700&q=80',
  href: '/comment-voir-le-maroc',
}

const SEJOURS = [
  { label: 'Marrakech',   href: '/circuits/classiques', img: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=240&q=75' },
  { label: 'Casablanca',  href: '/circuits/classiques', img: 'https://images.unsplash.com/photo-1551913902-c92207136625?w=240&q=75' },
  { label: 'Fez',         href: '/circuits/classiques', img: 'https://images.unsplash.com/photo-1489493585363-d69421e0edd3?w=240&q=75' },
  { label: 'Chefchaouen', href: '/circuits/classiques', img: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=240&q=75' },
  { label: 'Tanger',      href: '/circuits/classiques', img: 'https://images.unsplash.com/photo-1580834341580-8c17a3a630ca?w=240&q=75' },
]

const CIRCUITS = [
  { label: 'En minibus',               href: '/circuits/classiques',            img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=240&q=75' },
  { label: 'En autotours',             href: '/experiences/circuits-autotours', img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=240&q=75' },
  { label: 'Rally 4x4',               href: '/circuits/raid-4x4',              img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=240&q=75' },
  { label: 'Virée en Moto cylindrée', href: '/circuits/moto',                  img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=240&q=75' },
]

const AVEC_QUI = [
  { label: 'En petits groupes',     href: '/experiences', img: 'https://images.unsplash.com/photo-1501554728187-ce583db33af7?w=240&q=75' },
  { label: 'Solo',                  href: '/experiences', img: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=240&q=75' },
  { label: 'En couple',            href: '/experiences', img: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=240&q=75' },
  { label: 'Entre amis et famille', href: '/experiences', img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=240&q=75' },
]

const STYLES_VOYAGE = [
  { label: 'Essentiel',   href: '/circuits/classiques', img: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=240&q=75' },
  { label: 'Authentique', href: '/circuits/classiques', img: 'https://images.unsplash.com/photo-1548813395-edd5373a8e72?w=240&q=75' },
  { label: 'Prestige',    href: '/circuits/classiques', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=240&q=75' },
]

const EXPLORER_ITEMS = [
  { label: 'Comment voir le Maroc', href: '/comment-voir-le-maroc', img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=240&q=75' },
  { label: 'Que voir au Maroc',     href: '/que-voir-au-maroc',     img: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=240&q=75' },
]

// ── Icônes ────────────────────────────────────────────────────────────────────

function PhoneIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
    </svg>
  )
}

function WAIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#4ADE80" style={{ flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="13" height="10" viewBox="0 0 24 18" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M22 0H2C.9 0 0 .9 0 2v14c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zm0 4l-10 7L2 4V2l10 7 10-7v2z"/>
    </svg>
  )
}

function Chevron({ active }) {
  return (
    <svg width="9" height="5" viewBox="0 0 10 6" fill="none" style={{ marginTop: 1, flexShrink: 0 }}>
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
        style={{ transition: 'transform .2s', display: 'block', transform: active ? 'rotate(180deg)' : 'none' }} />
    </svg>
  )
}

// Carte image-top / texte-bottom compacte (menus Séjours/Circuits/Avec qui)
function MiniItem({ item, onClose }) {
  return (
    <Link href={item.href} onClick={onClose}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.6rem',
        textDecoration: 'none', padding: '0.3rem 0',
        color: 'rgba(255,255,255,0.82)', fontSize: '0.76rem', fontWeight: 400,
        transition: 'color .15s',
      }}
      onMouseEnter={e => e.currentTarget.style.color = '#C8A440'}
      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.82)'}
    >
      {item.img && (
        <div style={{
          width: '40px', height: '30px', borderRadius: '3px', flexShrink: 0,
          backgroundImage: `url(${item.img})`, backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
      )}
      <span>{item.label}</span>
    </Link>
  )
}

// Grande carte image-top / texte-bottom (menus Styles & Explorer)
function LargeCard({ item, onClose }) {
  return (
    <Link href={item.href} onClick={onClose}
      style={{
        textDecoration: 'none', flexShrink: 0, cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        width: '160px',
      }}
    >
      <div
        style={{
          width: '156px', height: '116px', borderRadius: '7px',
          backgroundImage: `url(${item.img})`, backgroundSize: 'cover', backgroundPosition: 'center',
          border: '2px solid transparent', transition: 'border-color .2s, transform .2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#C8A440'; e.currentTarget.style.transform = 'scale(1.04)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'scale(1)' }}
      />
      <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.78rem', fontWeight: 600, textAlign: 'center', lineHeight: 1.3 }}>
        {item.label}
      </span>
    </Link>
  )
}

// Cadran droit pleine hauteur
function RightCadran({ onClose }) {
  return (
    <Link href={CADRAN.href} onClick={onClose}
      style={{
        position: 'relative', width: '155px', flexShrink: 0, alignSelf: 'stretch',
        borderRadius: '7px', overflow: 'hidden', minHeight: '110px',
        backgroundImage: `url(${CADRAN.img})`, backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        textDecoration: 'none', cursor: 'pointer',
        transition: 'transform .25s, box-shadow .25s',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 0 0 2px #C8A440' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none' }}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(21,46,31,0.95) 0%, rgba(21,46,31,0.40) 55%, rgba(21,46,31,0.05) 100%)' }} />
      <div style={{ position: 'relative', padding: '0.9rem', textAlign: 'center' }}>
        <p style={{ color: '#FFFFFF', fontSize: '0.76rem', fontWeight: 600, letterSpacing: '0.04em', lineHeight: 1.4, marginBottom: '0.2rem' }}>
          Voir tous<br />nos circuits
        </p>
        <span style={{ color: '#C8A440', fontSize: '0.9rem' }}>→</span>
      </div>
    </Link>
  )
}

const SEC = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '0.54rem', fontWeight: 700, letterSpacing: '0.24em',
  textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)',
  marginBottom: '0.45rem', display: 'block',
}

// Bouton trigger pill — fond solide au survol
function triggerStyle(active) {
  return {
    display: 'flex', alignItems: 'center', gap: '5px',
    padding: '0.3rem 1.05rem',
    background: active ? '#1D4030' : 'transparent',
    border: `1.5px solid ${active ? '#C8A440' : 'rgba(255,255,255,0.52)'}`,
    borderRadius: '50px',
    cursor: 'pointer',
    color: active ? '#C8A440' : '#FFFFFF',
    fontFamily: "'Playfair Display', serif",
    fontStyle: 'italic',
    fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.02em',
    transition: 'color .2s, background .2s, border-color .2s',
    whiteSpace: 'nowrap',
  }
}

const BAR_LINK = {
  color: 'rgba(255,255,255,0.78)', textDecoration: 'none',
  fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem',
  fontWeight: 400, letterSpacing: '0.04em',
  transition: 'color .15s', whiteSpace: 'nowrap',
}

// ── Composant principal ───────────────────────────────────────────────────────

export default function NavBar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu,   setOpenMenu]   = useState(null)
  const closeTimer = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const open     = (name) => { clearTimeout(closeTimer.current); setOpenMenu(name) }
  const schedule = ()     => { closeTimer.current = setTimeout(() => setOpenMenu(null), 200) }
  const keep     = ()     => clearTimeout(closeTimer.current)
  const closeNow = ()     => setOpenMenu(null)

  const hoverGold = (e) => { e.currentTarget.style.color = '#C8A440' }
  const hoverOff  = (e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.78)' }

  // Barre 3 : solid quand scrollé OU quand un menu est ouvert (pour tangence avec le panel)
  const bar3Bg = (scrolled || openMenu !== null)
    ? 'rgba(27,58,40,0.97)'
    : 'transparent'

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════
          HEADER FIXE — 3 barres empilées  (48 + 40 + 68 = 156px)
      ══════════════════════════════════════════════════════════════════════ */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, display: 'flex', flexDirection: 'column' }}>

        {/* ── BARRE 1 : Logo centré ── */}
        <div style={{
          background: '#1B3A28', height: '48px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderBottom: '1px solid rgba(200,164,64,0.18)',
        }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px' }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.08em', lineHeight: 1 }}>
              VOYAGES<span style={{ color: '#C8A440' }}>21</span>
            </span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.52rem', fontWeight: 500, color: 'rgba(200,164,64,0.75)', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
              le voyage cousu main
            </span>
          </Link>
        </div>

        {/* ── BARRE 2 : Info bar ── */}
        <div className="bar2" style={{
          background: '#152E1F', height: '40px',
          display: 'flex', alignItems: 'center',
          padding: '0 2.5rem',
          borderBottom: '1px solid rgba(200,164,64,0.12)',
        }}>
          {/* Gauche : contacts avec icônes */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.4rem', flex: 1 }}>
            <Link href="/faq" style={BAR_LINK} onMouseEnter={hoverGold} onMouseLeave={hoverOff}>
              Have a Question
            </Link>
            <a href="https://wa.me/212661181618" target="_blank" rel="noopener noreferrer"
              style={{ ...BAR_LINK, display: 'flex', alignItems: 'center', gap: '4px' }}
              onMouseEnter={hoverGold} onMouseLeave={hoverOff}>
              <WAIcon /> WhatsApp
            </a>
            <a href="mailto:contact@voyages21.com"
              style={{ ...BAR_LINK, display: 'flex', alignItems: 'center', gap: '4px' }}
              onMouseEnter={hoverGold} onMouseLeave={hoverOff}>
              <EmailIcon /> Email Us
            </a>
            <a href="tel:+212661181618"
              style={{ ...BAR_LINK, display: 'flex', alignItems: 'center', gap: '4px' }}
              onMouseEnter={hoverGold} onMouseLeave={hoverOff}>
              <PhoneIcon /> Call Us
            </a>
          </div>

          {/* Centre */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Link href="/marhaba" style={{ ...BAR_LINK, fontWeight: 600, letterSpacing: '0.1em' }} onMouseEnter={hoverGold} onMouseLeave={hoverOff}>MARHABA</Link>
            <Link href="/chroniques" style={{ ...BAR_LINK, fontWeight: 600, letterSpacing: '0.1em' }} onMouseEnter={hoverGold} onMouseLeave={hoverOff}>BLOG</Link>
          </div>

          {/* Droite : About avec sous-titres empilés */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', gap: '1px', lineHeight: 1 }}>
              <Link href="/about" style={{ ...BAR_LINK, fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em' }} onMouseEnter={hoverGold} onMouseLeave={hoverOff}>
                About
              </Link>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Link href="/about#expertise" style={{ ...BAR_LINK, fontSize: '0.61rem' }} onMouseEnter={hoverGold} onMouseLeave={hoverOff}>Notre expertise</Link>
                <Link href="/about#engagements" style={{ ...BAR_LINK, fontSize: '0.61rem' }} onMouseEnter={hoverGold} onMouseLeave={hoverOff}>Nos engagements</Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── BARRE 3 : NavBar principale ── */}
        <div style={{
          height: '68px',
          background: bar3Bg,
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.35)' : 'none',
          transition: 'background .25s ease, box-shadow .35s ease',
          display: 'flex', alignItems: 'center', padding: '0 2.5rem',
        }}>

          {/* Espace gauche */}
          <div style={{ flex: '0 0 180px' }} />

          {/* Menus desktop centrés */}
          <div className="bar3-menu" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flex: 1, justifyContent: 'center' }}>

            <div onMouseEnter={() => open('inspirations')} onMouseLeave={schedule}>
              <button style={triggerStyle(openMenu === 'inspirations')}>
                Inspirations <Chevron active={openMenu === 'inspirations'} />
              </button>
            </div>

            <div onMouseEnter={() => open('styles')} onMouseLeave={schedule}>
              <button style={triggerStyle(openMenu === 'styles')}>
                Choisissez votre style <Chevron active={openMenu === 'styles'} />
              </button>
            </div>

            <div onMouseEnter={() => open('explorer')} onMouseLeave={schedule}>
              <button style={triggerStyle(openMenu === 'explorer')}>
                Explorer <Chevron active={openMenu === 'explorer'} />
              </button>
            </div>
          </div>

          {/* Droite : téléphone + Contact + burger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '0 0 auto' }}>
            <a href="tel:+212661181618" style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              color: 'rgba(255,255,255,0.70)', textDecoration: 'none',
              fontFamily: "'DM Sans', sans-serif", fontSize: '0.74rem',
              fontWeight: 500, letterSpacing: '0.03em',
              transition: 'color .15s', whiteSpace: 'nowrap',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#C8A440'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.70)'}
            >
              <PhoneIcon /> +212 661 181 618
            </a>

            <Link href="/contact" className="nav-cta-btn" style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.74rem', fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#111', background: '#C8A440',
              padding: '0.5rem 1.4rem', textDecoration: 'none',
              flexShrink: 0, transition: 'background .2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#b09030'}
              onMouseLeave={e => e.currentTarget.style.background = '#C8A440'}
            >
              Contact
            </Link>

            <button className="burger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
              <span style={{ transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : '' }} />
              <span style={{ opacity: mobileOpen ? 0 : 1 }} />
              <span style={{ transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : '' }} />
            </button>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════════════
          MEGA MENU — INSPIRATIONS  (3 colonnes compactes)
      ══════════════════════════════════════════════════════════════════════ */}
      {openMenu === 'inspirations' && (
        <div className="mega-panel" onMouseEnter={keep} onMouseLeave={schedule}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '2rem', alignItems: 'stretch' }}>

            {/* 3 colonnes */}
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>

              <div>
                <span style={SEC}>Séjours</span>
                {SEJOURS.map(item => <MiniItem key={item.label} item={item} onClose={closeNow} />)}
              </div>

              <div>
                <span style={SEC}>Circuits</span>
                {CIRCUITS.map(item => <MiniItem key={item.label} item={item} onClose={closeNow} />)}
              </div>

              <div>
                <span style={SEC}>Avec qui partir</span>
                {AVEC_QUI.map(item => <MiniItem key={item.label} item={item} onClose={closeNow} />)}
              </div>
            </div>

            <RightCadran onClose={closeNow} />
          </div>

          {/* Pied du menu : CTA cousu main */}
          <div style={{
            maxWidth: '1400px', margin: '0.75rem auto 0',
            paddingTop: '0.65rem',
            borderTop: '1px solid rgba(200,164,64,0.18)',
            textAlign: 'center',
          }}>
            <Link href="/contact" onClick={closeNow} style={{
              color: '#C8A440', fontSize: '0.78rem', fontWeight: 600,
              textDecoration: 'none', letterSpacing: '0.05em',
              fontFamily: "'Playfair Display', serif", fontStyle: 'italic',
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Contactez-nous pour votre voyage cousu main →
            </Link>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          MEGA MENU — CHOISISSEZ VOTRE STYLE  (grandes cartes)
      ══════════════════════════════════════════════════════════════════════ */}
      {openMenu === 'styles' && (
        <div className="mega-panel" onMouseEnter={keep} onMouseLeave={schedule}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '2rem', alignItems: 'stretch' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: '1.2rem', marginBottom: '1rem' }}>
                {STYLES_VOYAGE.map(item => <LargeCard key={item.label} item={item} onClose={closeNow} />)}
              </div>
              <Link href="/about#styles" onClick={closeNow}
                style={{ color: '#C8A440', fontSize: '0.76rem', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.04em', transition: 'opacity .15s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                À propos de nos styles de voyages →
              </Link>
            </div>
            <RightCadran onClose={closeNow} />
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          MEGA MENU — EXPLORER  (grandes cartes)
      ══════════════════════════════════════════════════════════════════════ */}
      {openMenu === 'explorer' && (
        <div className="mega-panel" onMouseEnter={keep} onMouseLeave={schedule}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '2rem', alignItems: 'stretch' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: '1.2rem' }}>
                {EXPLORER_ITEMS.map(item => <LargeCard key={item.label} item={item} onClose={closeNow} />)}
              </div>
            </div>
            <RightCadran onClose={closeNow} />
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          MENU MOBILE
      ══════════════════════════════════════════════════════════════════════ */}
      {mobileOpen && (
        <div className="mobile-panel">
          <ul style={{ listStyle: 'none', padding: '1rem 1.5rem' }}>
            {[
              { label: 'Marhaba',                   href: '/marhaba',                        section: true },
              { label: 'Blog',                      href: '/chroniques',                     section: true },
              { label: 'Inspirations',              href: '#',                               section: true },
              { label: 'Marrakech',                 href: '/circuits/classiques',            indent: true },
              { label: 'Casablanca',                href: '/circuits/classiques',            indent: true },
              { label: 'Fez',                       href: '/circuits/classiques',            indent: true },
              { label: 'Chefchaouen',               href: '/circuits/classiques',            indent: true },
              { label: 'Tanger',                    href: '/circuits/classiques',            indent: true },
              { label: 'En minibus',                href: '/circuits/classiques',            indent: true },
              { label: 'En autotours',              href: '/experiences/circuits-autotours', indent: true },
              { label: 'Rally 4x4',                href: '/circuits/raid-4x4',              indent: true },
              { label: 'Virée en Moto cylindrée',  href: '/circuits/moto',                  indent: true },
              { label: 'En petits groupes',        href: '/experiences',                    indent: true },
              { label: 'Solo',                      href: '/experiences',                    indent: true },
              { label: 'En couple',                href: '/experiences',                    indent: true },
              { label: 'Entre amis et famille',    href: '/experiences',                    indent: true },
              { label: 'Choisissez votre style',   href: '#',                               section: true },
              { label: 'Essentiel',                 href: '/circuits/classiques',            indent: true },
              { label: 'Authentique',               href: '/circuits/classiques',            indent: true },
              { label: 'Prestige',                 href: '/circuits/classiques',            indent: true },
              { label: 'Explorer',                 href: '#',                               section: true },
              { label: 'Comment voir le Maroc',    href: '/comment-voir-le-maroc',          indent: true },
              { label: 'Que voir au Maroc',        href: '/que-voir-au-maroc',             indent: true },
              { label: 'À propos',                 href: '#',                               section: true },
              { label: 'Notre expertise',          href: '/about#expertise',               indent: true },
              { label: 'Nos engagements',          href: '/about#engagements',             indent: true },
            ].map(item => (
              <li key={item.href + item.label}
                style={{ borderBottom: item.section ? 'none' : '1px solid rgba(255,255,255,0.06)' }}>
                <Link
                  href={item.href}
                  onClick={item.href === '#' ? undefined : () => setMobileOpen(false)}
                  style={{
                    display: 'block',
                    padding: item.section ? '1rem 0 0.35rem' : '0.72rem 0',
                    paddingLeft: item.indent ? '1rem' : '0',
                    color: item.section ? '#C8A440' : 'rgba(255,255,255,0.85)',
                    textDecoration: 'none',
                    fontSize: item.section ? '0.6rem' : '0.84rem',
                    fontWeight: item.section ? 700 : 400,
                    letterSpacing: item.section ? '0.22em' : '0.03em',
                    textTransform: item.section ? 'uppercase' : 'none',
                    pointerEvents: item.href === '#' ? 'none' : 'auto',
                    cursor: item.href === '#' ? 'default' : 'pointer',
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li style={{ paddingTop: '1.2rem' }}>
              <Link href="/contact" onClick={() => setMobileOpen(false)} style={{
                display: 'block', padding: '0.85rem', background: '#C8A440',
                color: '#111', textDecoration: 'none', fontSize: '0.85rem',
                fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center',
              }}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}
