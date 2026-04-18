'use client'
import { useState } from 'react'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const form = e.target
    const data = new FormData(form)

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      })
      if (res.ok) {
        setSent(true)
        form.reset()
      }
    } catch (_) {}
    setLoading(false)
  }

  return (
    <>
      {/* HERO */}
      <section style={{
        height: '45vh', minHeight: '320px',
        background: 'var(--navy)',
        display: 'flex', alignItems: 'flex-end',
        padding: '0 5rem 4rem', position: 'relative',
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>Devis gratuit</p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem,5vw,3.5rem)', color: 'white', fontWeight: 700, lineHeight: 1.1 }}>
            Parlons de votre<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>voyage au Maroc</em>
          </h1>
        </div>
      </section>

      <section style={{ padding: '5rem 3rem', background: 'var(--white)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '4rem' }}>
          {/* Infos contact */}
          <div>
            <p className="section-label">Nous trouver</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', color: 'var(--navy)', marginBottom: '2rem' }}>Contact direct</h2>

            {[
              { label: 'Adresse', val: 'Bd Prince My Abdellah\nImm. Taiba — 1er Etage, Appt. N°1\nMarrakech, Maroc' },
              { label: 'Telephone', val: '+212 524 331 007\n+212 524 305 152' },
              { label: 'WhatsApp', val: '+212 661 181 618' },
              { label: 'Email', val: 'contact@voyages21.com' },
              { label: 'Site', val: 'www.boutique.voyages21.com' },
            ].map(info => (
              <div key={info.label} style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--light-gray)' }}>
                <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.3rem' }}>{info.label}</p>
                <p style={{ fontSize: '0.88rem', color: 'var(--navy)', lineHeight: 1.65, whiteSpace: 'pre-line' }}>{info.val}</p>
              </div>
            ))}

            <a
              href="https://wa.me/212661181618"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: '#25D366',
                color: 'white',
                padding: '0.85rem 1.5rem',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                marginTop: '1rem',
              }}
            >
              Contacter sur WhatsApp
            </a>
          </div>

          {/* Formulaire */}
          <div>
            <p className="section-label">Votre projet</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', color: 'var(--navy)', marginBottom: '2rem' }}>Demande de devis</h2>

            {sent ? (
              <div style={{ background: 'var(--cream)', border: '2px solid var(--gold)', padding: '2rem', textAlign: 'center' }}>
                <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', color: 'var(--navy)', marginBottom: '0.5rem' }}>Message envoye !</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--gray)' }}>Notre equipe vous repondra dans les meilleurs delais. Pour une reponse immediate : WhatsApp +212 661 181 618</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Web3Forms access key — a remplacer par la votre sur web3forms.com */}
                <input type="hidden" name="access_key" value="VOTRE_CLE_WEB3FORMS" />
                <input type="hidden" name="subject" value="Nouvelle demande de devis — Voyages21" />
                <input type="hidden" name="from_name" value="Voyages21 Website" />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {[
                    { name: 'prenom', label: 'Prenom', type: 'text', req: true },
                    { name: 'nom', label: 'Nom', type: 'text', req: true },
                  ].map(f => (
                    <div key={f.name}>
                      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '0.4rem' }}>{f.label}</label>
                      <input
                        type={f.type}
                        name={f.name}
                        required={f.req}
                        style={{ width: '100%', padding: '0.75rem', border: '1.5px solid #ddd', fontSize: '0.88rem', fontFamily: 'DM Sans, sans-serif', outline: 'none', background: 'var(--light-gray)' }}
                      />
                    </div>
                  ))}
                </div>

                {[
                  { name: 'email', label: 'Email', type: 'email', req: true },
                  { name: 'telephone', label: 'Telephone / WhatsApp', type: 'tel', req: false },
                ].map(f => (
                  <div key={f.name}>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '0.4rem' }}>{f.label}</label>
                    <input
                      type={f.type}
                      name={f.name}
                      required={f.req}
                      style={{ width: '100%', padding: '0.75rem', border: '1.5px solid #ddd', fontSize: '0.88rem', fontFamily: 'DM Sans, sans-serif', outline: 'none', background: 'var(--light-gray)' }}
                    />
                  </div>
                ))}

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '0.4rem' }}>Type de voyage souhaite</label>
                  <select name="type_voyage" style={{ width: '100%', padding: '0.75rem', border: '1.5px solid #ddd', fontSize: '0.88rem', fontFamily: 'DM Sans, sans-serif', outline: 'none', background: 'var(--light-gray)' }}>
                    <option value="">Choisir...</option>
                    <option value="raid_4x4">Raid 4x4</option>
                    <option value="moto">Moto Expedition</option>
                    <option value="circuit_classique">Circuit classique</option>
                    <option value="autotour">Autotour</option>
                    <option value="experience">Experience / Activite</option>
                    <option value="mice">MICE & Groupes</option>
                    <option value="sur_mesure">Voyage sur mesure</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '0.4rem' }}>Nombre de voyageurs</label>
                    <input type="number" name="voyageurs" min="1" style={{ width: '100%', padding: '0.75rem', border: '1.5px solid #ddd', fontSize: '0.88rem', fontFamily: 'DM Sans, sans-serif', outline: 'none', background: 'var(--light-gray)' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '0.4rem' }}>Dates envisagees</label>
                    <input type="text" name="dates" placeholder="ex: Mars 2026" style={{ width: '100%', padding: '0.75rem', border: '1.5px solid #ddd', fontSize: '0.88rem', fontFamily: 'DM Sans, sans-serif', outline: 'none', background: 'var(--light-gray)' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '0.4rem' }}>Votre projet (details, attentes, questions...)</label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    style={{ width: '100%', padding: '0.75rem', border: '1.5px solid #ddd', fontSize: '0.88rem', fontFamily: 'DM Sans, sans-serif', outline: 'none', background: 'var(--light-gray)', resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ alignSelf: 'flex-start', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? 'Envoi en cours...' : 'Envoyer ma demande'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
