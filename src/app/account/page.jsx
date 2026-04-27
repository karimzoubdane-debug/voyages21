'use client'
import { useState } from 'react'
import Link from 'next/link'

const PROFILES = [
  {
    id: 'client',
    label: 'Client',
    description: 'Accédez à vos réservations, devis et documents de voyage.',
    color: 'var(--navy)',
  },
  {
    id: 'agence',
    label: 'Agence',
    description: 'Espace B2B : tarifs nets, suivi groupes, extranet partenaire.',
    color: 'var(--gold)',
  },
  {
    id: 'affilie',
    label: 'Affilié',
    description: 'Tableau de bord affiliation : clics, réservations, commissions.',
    color: 'var(--red)',
  },
]

export default function AccountPage() {
  const [profile, setProfile] = useState('client')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Placeholder — authentification à connecter (Phase 2)
    setSubmitted(true)
  }

  return (
    <>
      <section style={{
        minHeight: '100vh',
        background: 'var(--cream)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 1.5rem 3rem',
      }}>
        <div style={{ width: '100%', maxWidth: '480px' }}>

          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <span style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.6rem', fontWeight: 700,
                color: 'var(--navy)', letterSpacing: '0.08em',
              }}>
                VOYAGES<span style={{ color: 'var(--gold)' }}>21</span>
              </span>
            </Link>
            <p style={{
              fontSize: '0.78rem', color: '#6B7280',
              marginTop: '0.4rem', letterSpacing: '0.06em',
            }}>
              Espace personnel
            </p>
          </div>

          {/* Sélecteur profil */}
          <div style={{
            background: 'var(--white)',
            padding: '2rem',
            boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
          }}>
            <p style={{
              fontSize: '0.68rem', fontWeight: 700,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: '#9CA3AF', marginBottom: '1rem',
            }}>
              Vous êtes
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
              {PROFILES.map(p => (
                <button
                  key={p.id}
                  onClick={() => setProfile(p.id)}
                  style={{
                    flex: 1,
                    padding: '0.6rem 0.4rem',
                    border: `2px solid ${profile === p.id ? p.color : 'rgba(0,0,0,0.1)'}`,
                    background: profile === p.id ? p.color : 'transparent',
                    color: profile === p.id ? 'white' : '#4B5563',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <p style={{
              fontSize: '0.82rem', color: '#6B7280',
              lineHeight: 1.5, marginBottom: '1.75rem',
              minHeight: '2.5rem',
            }}>
              {PROFILES.find(p => p.id === profile)?.description}
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{
                    display: 'block', fontSize: '0.72rem', fontWeight: 600,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: 'var(--navy)', marginBottom: '0.4rem',
                  }}>
                    Adresse email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '1px solid rgba(0,0,0,0.15)',
                      fontSize: '0.9rem',
                      color: 'var(--dark)',
                      outline: 'none',
                      boxSizing: 'border-box',
                      fontFamily: 'DM Sans, sans-serif',
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block', fontSize: '0.72rem', fontWeight: 600,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: 'var(--navy)', marginBottom: '0.4rem',
                  }}>
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '1px solid rgba(0,0,0,0.15)',
                      fontSize: '0.9rem',
                      color: 'var(--dark)',
                      outline: 'none',
                      boxSizing: 'border-box',
                      fontFamily: 'DM Sans, sans-serif',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    padding: '0.85rem',
                    background: PROFILES.find(p => p.id === profile)?.color,
                    color: profile === 'agence' ? 'var(--dark)' : 'white',
                    border: 'none',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    marginTop: '0.5rem',
                    transition: 'opacity 0.2s',
                  }}
                >
                  Se connecter
                </button>

                <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                  <a href="mailto:contact@voyages21.com?subject=Mot de passe oublié" style={{
                    fontSize: '0.78rem', color: '#6B7280', textDecoration: 'underline',
                  }}>
                    Mot de passe oublié ?
                  </a>
                </div>
              </form>
            ) : (
              <div style={{
                textAlign: 'center', padding: '2rem 0',
              }}>
                <div style={{
                  width: '48px', height: '48px',
                  background: 'var(--navy)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1rem',
                }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M4 11l5 5 9-9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.1rem', color: 'var(--navy)',
                  marginBottom: '0.5rem',
                }}>
                  Demande reçue
                </p>
                <p style={{ fontSize: '0.85rem', color: '#6B7280', lineHeight: 1.6 }}>
                  L'espace client complet est en cours de déploiement.
                  Notre équipe vous contactera sous 24h à <strong>{email}</strong>.
                </p>
                <Link href="/" style={{
                  display: 'inline-block', marginTop: '1.5rem',
                  fontSize: '0.78rem', color: 'var(--navy)',
                  fontWeight: 600, textDecoration: 'underline',
                }}>
                  Retour à l'accueil
                </Link>
              </div>
            )}
          </div>

          {/* Pas encore de compte */}
          <p style={{
            textAlign: 'center', marginTop: '1.5rem',
            fontSize: '0.82rem', color: '#6B7280',
          }}>
            Pas encore de compte ?{' '}
            <Link href="/contact" style={{ color: 'var(--navy)', fontWeight: 600, textDecoration: 'underline' }}>
              Contactez-nous
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
