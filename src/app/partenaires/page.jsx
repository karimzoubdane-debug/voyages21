import Link from 'next/link'

export const metadata = {
  title: 'Partenaires & Affiliation — Voyages21 DMC Maroc',
  description: 'Agences revendeuses, tour-opérateurs et créateurs de contenu : rejoignez le réseau partenaires Voyages21. Tarifs nets, commissions, espace B2B dédié.',
}

export default function PartenairesPage() {
  return (
    <>
      {/* HERO */}
      <section style={{
        background: 'linear-gradient(135deg, var(--navy) 0%, #0f1e35 100%)',
        padding: '8rem 3rem 5rem',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{
            fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem',
          }}>
            Travaillons ensemble
          </p>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            color: 'var(--white)', fontWeight: 700, lineHeight: 1.15,
            marginBottom: '1.5rem',
          }}>
            Le Maroc entre de<br />bonnes mains — les votres
          </h1>
          <p style={{
            fontSize: '1.05rem', color: 'rgba(255,255,255,0.75)',
            maxWidth: '580px', lineHeight: 1.75,
          }}>
            Voyages21 est un DMC Maroc depuis 2000. Nous travaillons avec des agences
            de voyages, tour-opérateurs et créateurs de contenu dans toute l'Europe
            pour apporter à leurs clients une expérience marocaine authentique et soignée.
          </p>
        </div>
      </section>

      {/* DEUX TYPES DE PARTENAIRES */}
      <section style={{ padding: '5rem 3rem', background: 'var(--cream)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{
            fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem',
          }}>
            Deux programmes distincts
          </p>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
            color: 'var(--navy)', marginBottom: '3rem',
          }}>
            Trouvez votre programme
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>

            {/* Agences B2B */}
            <div style={{
              background: 'var(--white)',
              borderTop: '4px solid var(--navy)',
              padding: '2.5rem',
            }}>
              <p style={{
                fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '1rem',
              }}>
                Programme Agences
              </p>
              <h3 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.6rem', color: 'var(--navy)',
                marginBottom: '1rem',
              }}>
                Agences & Tour-Opérateurs
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#4B5563', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                Vous êtes une agence de voyages, un tour-opérateur ou un réceptif ?
                Voyages21 est votre partenaire terrain au Maroc. Nous opérons vos groupes,
                vos clientèles individuelles et vos événements MICE avec la même rigueur
                que vous attendez pour vos propres clients.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
                {[
                  'Tarifs nets compétitifs — commission agence 10 à 15%',
                  'Devis sous 24h, contrat annuel possible',
                  'Espace extranet dédié (disponibilités, devis en ligne)',
                  'Interlocuteur unique francophone à Marrakech',
                  'Reporting photos et feedback après chaque groupe',
                  'Prise en charge aéroport Marrakech-Menara incluse',
                ].map((item, i) => (
                  <li key={i} style={{
                    fontSize: '0.85rem', color: '#374151',
                    paddingLeft: '1.2rem', position: 'relative', lineHeight: 1.5,
                  }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--gold)', fontWeight: 700 }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="mailto:contact@voyages21.com?subject=Demande partenariat agence" style={{
                display: 'inline-block',
                padding: '0.8rem 1.8rem',
                background: 'var(--navy)',
                color: 'var(--white)',
                textDecoration: 'none',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                Ouvrir un compte agence
              </a>
            </div>

            {/* Créateurs / Affiliés */}
            <div style={{
              background: 'var(--white)',
              borderTop: '4px solid var(--gold)',
              padding: '2.5rem',
            }}>
              <p style={{
                fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem',
              }}>
                Programme Affiliation
              </p>
              <h3 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.6rem', color: 'var(--navy)',
                marginBottom: '1rem',
              }}>
                Créateurs & Influenceurs
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#4B5563', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                Vous avez une audience voyage sur YouTube, Instagram, TikTok ou un blog ?
                Partagez le Maroc authentique avec votre communauté et percevez une commission
                sur chaque réservation générée via votre lien personnel.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
                {[
                  'Commission 8% sur chaque réservation confirmée',
                  'Lien de tracking personnalisé + tableau de bord',
                  'Contenu exclusif fourni (photos HD, vidéos, descriptions)',
                  'Invitation presse possible pour les profils qualifiés',
                  'Paiement mensuel par virement ou PayPal',
                  'Pas de minimum de ventes requis',
                ].map((item, i) => (
                  <li key={i} style={{
                    fontSize: '0.85rem', color: '#374151',
                    paddingLeft: '1.2rem', position: 'relative', lineHeight: 1.5,
                  }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--gold)', fontWeight: 700 }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: '0.8rem', color: '#6B7280', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                Programme en cours de lancement — candidatures ouvertes.
              </p>
              <a href="mailto:contact@voyages21.com?subject=Candidature programme affiliation" style={{
                display: 'inline-block',
                padding: '0.8rem 1.8rem',
                background: 'var(--gold)',
                color: 'var(--dark)',
                textDecoration: 'none',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                Envoyer ma candidature
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* REFS CLIENTS */}
      <section style={{ padding: '4rem 3rem', background: 'var(--navy)', textAlign: 'center' }}>
        <p style={{
          fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem',
        }}>
          Ils nous font confiance
        </p>
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1.6rem', color: 'var(--white)', marginBottom: '1rem',
        }}>
          Un réseau actif depuis 2000
        </h2>
        <p style={{
          fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)',
          maxWidth: '560px', margin: '0 auto 2.5rem', lineHeight: 1.7,
        }}>
          Agences françaises, belges, suisses et allemandes nous confient leurs clients
          depuis plus de 20 ans. Voyages21 c'est la fiabilité d'un partenaire terrain
          qui connaît chaque piste, chaque riad, chaque prestataire du pays.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/contact" style={{
            display: 'inline-block', padding: '0.85rem 2rem',
            background: 'var(--gold)', color: 'var(--dark)',
            textDecoration: 'none', fontSize: '0.82rem',
            fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            Nous contacter
          </Link>
          <a href="https://wa.me/212661181618" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-block', padding: '0.85rem 2rem',
            border: '1px solid rgba(255,255,255,0.3)', color: 'var(--white)',
            textDecoration: 'none', fontSize: '0.82rem',
            fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            WhatsApp direct
          </a>
        </div>
      </section>
    </>
  )
}
