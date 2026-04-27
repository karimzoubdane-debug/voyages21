'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

/* Style hover commun à tous les items du menu */
const hoverOn  = e => {
  e.currentTarget.style.background = 'var(--gold)'
  e.currentTarget.style.color      = 'var(--dark)'
}
const hoverOff = e => {
  e.currentTarget.style.background = 'transparent'
  e.currentTarget.style.color      = ''
}

const menuLinkStyle = {
  display:        'block',
  padding:        '0.45rem 0.9rem',
  borderRadius:   '2px',
  textDecoration: 'none',
  fontSize:       '0.78rem',
  fontWeight:     '600',
  letterSpacing:  '0.1em',
  textTransform:  'uppercase',
  transition:     'background .18s, color .18s',
  cursor:         'pointer',
  background:     'transparent',
  border:         'none',
  color:          'inherit',
}

export default function NavBar() {
  const [scrolled,    setScrolled]  = useState(false)
  const [mobileOpen,  setMobileOpen] = useState(false)
  const [expOpen,     setExpOpen]   = useState(false)
  const closeTimer                  = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openExp  = () => { clearTimeout(closeTimer.current); setExpOpen(true) }
  const closeExp = () => { closeTimer.current = setTimeout(() => setExpOpen(false), 200) }

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>

      {/* Logo */}
      <Link href="/" className="navbar-logo" style={{ textDecoration: 'none' }}>
        <span>VOYAGES<span style={{ color: 'var(--gold)' }}>21</span></span>
      </Link>

      {/* ── Menu desktop ── */}
      <ul className="navbar-menu">

        {/* 1. Marhaba */}
        <li>
          <Link
            href="/marhaba"
            style={menuLinkStyle}
            onMouseEnter={hoverOn}
            onMouseLeave={hoverOff}
          >
            Marhaba
          </Link>
        </li>

        {/* 2. Expériences — sous-menu hover */}
        <li
          style={{ position: 'relative' }}
          onMouseEnter={openExp}
          onMouseLeave={closeExp}
        >
          <button
            aria-haspopup="true"
            aria-expanded={expOpen}
            style={{
              ...menuLinkStyle,
              display:    'flex',
              alignItems: 'center',
              gap:        '5px',
              background: expOpen ? 'var(--gold)' : 'transparent',
              color:      expOpen ? 'var(--dark)' : '',
            }}
          >
            Expériences
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path
                d="M1 1l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                style={{ transition: 'transform .2s', transform: expOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </svg>
          </button>

          {/* Sous-menu */}
          {expOpen && (
            <ul
              onMouseEnter={openExp}
              onMouseLeave={closeExp}
              style={{
                position:   'absolute',
                top:        'calc(100% + 4px)',
                left:       '50%',
                transform:  'translateX(-50%)',
                background: 'var(--navy)',
                border:     '1px solid rgba(200,160,10,0.3)',
                borderTop:  '3px solid var(--gold)',
                listStyle:  'none',
                padding:    '0.4rem 0',
                minWidth:   '220px',
                zIndex:     1000,
                boxShadow:  '0 8px 30px rgba(0,0,0,0.4)',
              }}
            >
              {[
                { href: '/experiences/rallyes-4x4',        label: 'Rallyes 4x4' },
                { href: '/experiences/moto-expeditions',   label: 'Moto Expéditions' },
                { href: '/experiences/circuits-autotours', label: 'Circuits & Autotours' },
              ].map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setExpOpen(false)}
                    style={{
                      display:        'block',
                      padding:        '0.75rem 1.4rem',
                      color:          'rgba(255,255,255,0.85)',
                      textDecoration: 'none',
                      fontSize:       '0.8rem',
                      fontWeight:     '600',
                      letterSpacing:  '0.08em',
                      textTransform:  'uppercase',
                      transition:     'background .15s, color .15s',
                      whiteSpace:     'nowrap',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'var(--gold)'
                      e.currentTarget.style.color      = 'var(--dark)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color      = 'rgba(255,255,255,0.85)'
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* 3. Chroniques */}
        <li>
          <Link
            href="/chroniques"
            style={menuLinkStyle}
            onMouseEnter={hoverOn}
            onMouseLeave={hoverOff}
          >
            Chroniques
          </Link>
        </li>

        {/* 4. En Images */}
        <li>
          <Link
            href="/en-images"
            style={menuLinkStyle}
            onMouseEnter={hoverOn}
            onMouseLeave={hoverOff}
          >
            En Images
          </Link>
        </li>

        {/* CTA Contact */}
        <li>
          <Link href="/contact" className="navbar-cta">Contact</Link>
        </li>

      </ul>

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

      {/* ── Menu mobile ── */}
      {mobileOpen && (
        <div style={{
          position:   'fixed',
          top:        '80px',
          left:       0,
          right:      0,
          background: 'var(--navy)',
          padding:    '1.5rem',
          zIndex:     999,
          borderTop:  '2px solid var(--gold)',
        }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { href: '/marhaba',                        label: 'Marhaba' },
              { href: '/experiences/rallyes-4x4',        label: '— Rallyes 4x4' },
              { href: '/experiences/moto-expeditions',   label: '— Moto Expéditions' },
              { href: '/experiences/circuits-autotours', label: '— Circuits & Autotours' },
              { href: '/chroniques',                     label: 'Chroniques' },
              { href: '/en-images',                      label: 'En Images' },
            ].map(item => (
              <li key={item.href} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display:        'block',
                    padding:        '0.85rem 0',
                    color:          'rgba(255,255,255,0.85)',
                    textDecoration: 'none',
                    fontSize:       '0.88rem',
                    letterSpacing:  '0.06em',
                    textTransform:  'uppercase',
                    fontWeight:     '500',
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li style={{ paddingTop: '1rem' }}>
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
                  fontWeight:     '700',
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
    </nav>
  )
}
