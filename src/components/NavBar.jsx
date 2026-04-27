'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function NavBar() {
  const [scrolled, setScrolled]       = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [expOpen, setExpOpen]         = useState(false)
  const closeTimer                    = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openExp  = () => { clearTimeout(closeTimer.current); setExpOpen(true) }
  const closeExp = () => { closeTimer.current = setTimeout(() => setExpOpen(false), 180) }

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>

      {/* Logo */}
      <Link href="/" className="navbar-logo" style={{ textDecoration: 'none' }}>
        <span>VOYAGES<span style={{ color: 'var(--gold)' }}>21</span></span>
      </Link>

      {/* ── Menu desktop ── */}
      <ul className="navbar-menu">

        {/* Marhaba */}
        <li>
          <Link href="/marhaba">Marhaba</Link>
        </li>

        {/* Notre Signature */}
        <li>
          <Link href="/marhaba#signature">Notre Signature</Link>
        </li>

        {/* Expériences — sous-menu hover */}
        <li
          style={{ position: 'relative' }}
          onMouseEnter={openExp}
          onMouseLeave={closeExp}
        >
          <button
            aria-haspopup="true"
            aria-expanded={expOpen}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Expériences
            <svg
              width="10" height="6" viewBox="0 0 10 6" fill="none"
              style={{
                marginLeft: '5px',
                verticalAlign: 'middle',
                transition: 'transform .2s',
                transform: expOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            >
              <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Sous-menu */}
          {expOpen && (
            <ul
              onMouseEnter={openExp}
              onMouseLeave={closeExp}
              style={{
                position:   'absolute',
                top:        '100%',
                left:       '50%',
                transform:  'translateX(-50%)',
                background: 'var(--navy)',
                border:     '1px solid rgba(200,160,10,0.3)',
                borderTop:  '2px solid var(--gold)',
                listStyle:  'none',
                padding:    '0.5rem 0',
                minWidth:   '240px',
                zIndex:     1000,
                boxShadow:  '0 8px 30px rgba(0,0,0,0.35)',
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
                      display:       'block',
                      padding:       '0.75rem 1.4rem',
                      color:         'rgba(255,255,255,0.85)',
                      textDecoration:'none',
                      fontSize:      '0.82rem',
                      fontWeight:    '500',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      transition:    'color .15s, background .15s',
                      whiteSpace:    'nowrap',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color      = 'var(--gold)'
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color      = 'rgba(255,255,255,0.85)'
                      e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* Chroniques */}
        <li>
          <Link href="/chroniques">Chroniques</Link>
        </li>

        {/* En Images */}
        <li>
          <Link href="/en-images">En Images</Link>
        </li>

        {/* Contact CTA */}
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
              { href: '/marhaba#signature',              label: 'Notre Signature' },
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
                    display:       'block',
                    padding:       '0.85rem 0',
                    color:         'rgba(255,255,255,0.85)',
                    textDecoration:'none',
                    fontSize:      '0.88rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    fontWeight:    '500',
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
                  display:       'block',
                  padding:       '0.85rem 1.5rem',
                  background:    'var(--gold)',
                  color:         'var(--dark)',
                  textDecoration:'none',
                  fontSize:      '0.85rem',
                  fontWeight:    '700',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textAlign:     'center',
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
