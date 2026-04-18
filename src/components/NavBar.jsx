'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [circuitsOpen, setCircuitsOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      {/* Logo */}
      <Link href="/" className="navbar-logo" style={{ textDecoration: 'none' }}>
        <span>VOYAGES<span style={{ color: 'var(--gold)' }}>21</span></span>
      </Link>

      {/* Menu desktop */}
      <ul className="navbar-menu">
        <li>
          <Link href="/">Accueil</Link>
        </li>

        {/* Circuits avec sous-menu */}
        <li>
          <button aria-haspopup="true">
            Circuits
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ marginLeft: '4px' }}>
              <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <ul className="submenu">
            <li><Link href="/circuits/raid-4x4">Raid 4x4 — Collection 2026</Link></li>
            <li><Link href="/circuits/moto">Moto Expedition BMW & KTM</Link></li>
            <li><Link href="/circuits/classiques">Circuits Classiques & Autotours</Link></li>
          </ul>
        </li>

        <li>
          <Link href="/experiences">Experiences</Link>
        </li>

        <li>
          <Link href="/mice">MICE & Groupes</Link>
        </li>

        <li>
          <Link href="/about">A propos</Link>
        </li>

        <li>
          <Link href="/contact" className="navbar-cta">Devis gratuit</Link>
        </li>
      </ul>

      {/* Burger mobile */}
      <button
        className="burger"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Menu"
      >
        <span style={{ transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : '' }} />
        <span style={{ opacity: mobileOpen ? 0 : 1 }} />
        <span style={{ transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : '' }} />
      </button>

      {/* Menu mobile */}
      {mobileOpen && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: 0,
          right: 0,
          background: 'var(--navy)',
          padding: '1.5rem',
          zIndex: 999,
          borderTop: '2px solid var(--gold)',
        }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              { href: '/', label: 'Accueil' },
              { href: '/circuits/raid-4x4', label: 'Raid 4x4' },
              { href: '/circuits/moto', label: 'Moto Expedition' },
              { href: '/circuits/classiques', label: 'Circuits Classiques' },
              { href: '/experiences', label: 'Experiences' },
              { href: '/mice', label: 'MICE & Groupes' },
              { href: '/about', label: 'A propos' },
            ].map(item => (
              <li key={item.href} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'block',
                    padding: '0.85rem 0',
                    color: 'rgba(255,255,255,0.85)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    fontWeight: '500',
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
                  display: 'block',
                  padding: '0.85rem 1.5rem',
                  background: 'var(--gold)',
                  color: 'var(--dark)',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                }}
              >
                Devis gratuit
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
