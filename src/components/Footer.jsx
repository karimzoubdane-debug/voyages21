import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        {/* Colonne marque */}
        <div className="footer-brand">
          <h3>VOYAGES<span style={{ color: 'var(--gold)' }}>21</span></h3>
          <p className="footer-tagline">Le Voyage Cousu Main depuis 2000</p>
          <p>
            Depuis Marrakech, Voyages21 conçoit des voyages sur mesure au Maroc avec exigence, passion et precision. Chaque itineraire est une creation exclusive.
          </p>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
            <a
              href="https://wa.me/212661181618"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.8rem',
                color: 'var(--gold)',
                textDecoration: 'none',
                fontWeight: '500',
              }}
            >
              WhatsApp +212 661 181 618
            </a>
          </div>
          {/* Site sœur : l'agence réceptive (étrangers → Maroc). Seul lien de voyages21.com
              vers moroccovoyages21.com — demandé par l'audit 212 (07/10/2026), go de Karim le 08/11/2026. */}
          <p className="footer-soeur" style={{ marginTop: '1.25rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>
            Vous visitez le Maroc ?{' '}
            <a
              href="https://www.moroccovoyages21.com"
              target="_blank"
              rel="noopener"
              style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: '500' }}
            >
              Notre agence réceptive : moroccovoyages21.com ↗
            </a>
          </p>
        </div>

        {/* Contact */}
        <div className="footer-col footer-contact">
          <h4>Contact</h4>
          <p>Bd Prince My Abdellah<br />Imm. Taiba — 1er Etage, Appt. N°1<br />Marrakech, Maroc</p>
          <p style={{ marginTop: '0.75rem' }}>
            <a href="tel:+212524331007" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
              +212 524 331 007
            </a>
          </p>
          <p>
            <a href="mailto:contact@voyages21.com" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
              contact@voyages21.com
            </a>
          </p>
          <div style={{ marginTop: '1rem' }}>
            <Link href="/contact" style={{
              display: 'inline-block',
              padding: '0.6rem 1.2rem',
              background: 'var(--gold)',
              color: 'var(--dark)',
              textDecoration: 'none',
              fontSize: '0.75rem',
              fontWeight: '700',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              Demander un devis
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2000–2026 Voyages21. Tous droits reserves.</span>
        <span>Marrakech, Maroc — L'agence cousu main</span>
      </div>
    </footer>
  )
}
