'use client'
import { useState } from 'react'
import Link from 'next/link'
import { faqs } from './faqData'

export default function FaqClient() {
  const [open, setOpen] = useState({})
  const toggle = (key) => setOpen(prev => ({ ...prev, [key]: !prev[key] }))

  return (
    <>
      {/* HERO */}
      <section style={{
        background: 'var(--navy)',
        padding: '8rem 3rem 5rem',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
          Questions frequentes
        </p>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--white)', fontWeight: 700, lineHeight: 1.2, marginBottom: '1.5rem' }}>
          Tout ce que vous voulez<br />savoir sur votre voyage
        </h1>
        <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
          Si vous ne trouvez pas la réponse ici, notre équipe à Marrakech vous répond sous 24h.
        </p>
      </section>

      {/* ACCORDEON */}
      <section style={{ padding: '5rem 3rem', background: 'var(--cream)' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          {faqs.map((section) => (
            <div key={section.categorie} style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', color: 'var(--navy)', fontWeight: 600, marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '2px solid var(--gold)' }}>
                {section.categorie}
              </h2>
              <div>
                {section.questions.map((item, idx) => {
                  const key = `${section.categorie}-${idx}`
                  const isOpen = open[key]
                  return (
                    <div key={key} style={{ borderBottom: '1px solid rgba(27,45,79,0.12)' }}>
                      <button
                        onClick={() => toggle(key)}
                        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '1rem' }}
                        aria-expanded={isOpen}
                      >
                        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', fontWeight: 600, color: isOpen ? 'var(--gold)' : 'var(--navy)', lineHeight: 1.5, transition: 'color 0.2s' }}>
                          {item.q}
                        </span>
                        <span style={{ flexShrink: 0, width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isOpen ? 'var(--gold)' : 'var(--navy)', borderRadius: '50%', transition: 'background 0.2s' }}>
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            {isOpen
                              ? <path d="M1 5h8" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                              : <path d="M5 1v8M1 5h8" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                            }
                          </svg>
                        </span>
                      </button>
                      {isOpen && (
                        <div style={{ padding: '0 0 1.25rem 0', fontSize: '0.9rem', color: '#4B5563', lineHeight: 1.75 }}>
                          {item.r}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--navy)', padding: '5rem 3rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
          Une autre question ?
        </p>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: 'var(--white)', marginBottom: '1rem' }}>
          Notre equipe repond sous 24h
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', lineHeight: 1.6 }}>
          Marrakech — Du lundi au samedi, 9h–19h (GMT+1)
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/contact" style={{ display: 'inline-block', padding: '0.85rem 2rem', background: 'var(--gold)', color: 'var(--dark)', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Formulaire de contact
          </Link>
          <a href="https://wa.me/212661181618" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '0.85rem 2rem', border: '1px solid rgba(255,255,255,0.3)', color: 'var(--white)', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            WhatsApp +212 661 181 618
          </a>
        </div>
      </section>
    </>
  )
}
