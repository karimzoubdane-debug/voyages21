'use client'
import { useState } from 'react'
import Link from 'next/link'

const faqs = [
  {
    categorie: 'Avant de partir',
    questions: [
      {
        q: 'Comment se déroule la réservation d\'un circuit Voyages21 ?',
        r: 'Vous nous contactez via le formulaire de devis ou par WhatsApp. Nous étudions votre demande et vous envoyons une proposition personnalisée sous 48h. Un acompte de 30% confirme la réservation, le solde est réglé 30 jours avant le départ.',
      },
      {
        q: 'Faut-il un visa pour entrer au Maroc ?',
        r: 'Les ressortissants français, belges, suisses et européens n\'ont pas besoin de visa — l\'entrée est libre pour 90 jours. Les ressortissants allemands et britanniques sont également exemptés. Nous vous conseillons de vérifier les conditions en vigueur auprès de l\'ambassade du Maroc de votre pays avant le départ.',
      },
      {
        q: 'Quelle est la meilleure période pour visiter le Maroc ?',
        r: 'Les périodes idéales sont le printemps (mars-mai) et l\'automne (septembre-novembre) : températures douces, paysages verts et ciel dégagé. L\'été est déconseillé dans le désert (50°C à Merzouga). L\'hiver est parfait pour le désert mais froid en montagne (neige sur l\'Atlas).',
      },
      {
        q: 'Proposez-vous des circuits pour les personnes à mobilité réduite ?',
        r: 'Certains de nos circuits classiques et séjours MICE peuvent être adaptés. Contactez-nous directement pour étudier votre situation — nous faisons notre possible pour rendre le Maroc accessible à tous.',
      },
    ],
  },
  {
    categorie: 'Circuits & Logistique',
    questions: [
      {
        q: 'Quelle est la différence entre un Raid 4x4 et un Circuit Classique ?',
        r: 'Le Raid 4x4 est une expédition technique sur pistes et dunes — conduite autonome ou encadrée, guide-pisteur, véhicule d\'assistance. Le Circuit Classique se fait en bus ou en autotour sur routes goudronnées, avec guide culturel, adapté à tous les profils de voyageurs.',
      },
      {
        q: 'Peut-on conduire soi-même lors d\'un Raid 4x4 ?',
        r: 'Oui — nous proposons la formule "Self-Drive" : vous conduisez votre propre 4x4 (loué chez nous) avec un guide-pisteur en tête de convoi et un véhicule d\'assistance. Aucune expérience de piste requise pour les circuits niveau débutant.',
      },
      {
        q: 'Les circuits moto incluent-ils les motos ?',
        r: 'Oui. Nos circuits moto incluent la location de BMW R1250GS, F850GS ou KTM Adventure selon disponibilité. Permis moto obligatoire. Nous proposons également la formule "venez avec votre propre moto" avec assistance technique intégrée.',
      },
      {
        q: 'Que comprend exactement la formule "à partir de" affichée sur le site ?',
        r: 'Le prix "à partir de" correspond à la formule Essentielle : hébergement en hôtel 3 étoiles, petit-déjeuner inclus, transport et guide uniquement. Les activités, déjeuners, dîners et upgrades hôtel sont en option — vous les ajoutez via notre configurateur de devis selon vos préférences.',
      },
    ],
  },
  {
    categorie: 'Paiement & Annulation',
    questions: [
      {
        q: 'Quels modes de paiement acceptez-vous ?',
        r: 'Nous acceptons PayPal (EUR, USD, GBP), virement bancaire international (SWIFT), et pour les clients basés au Maroc, les cartes bancaires via CMI/Payzone. Toutes les transactions sont sécurisées.',
      },
      {
        q: 'Quelle est votre politique d\'annulation ?',
        r: 'Annulation plus de 45 jours avant le départ : remboursement intégral hors frais de dossier (50€). Entre 45 et 30 jours : 30% retenus. Entre 30 et 15 jours : 50% retenus. Moins de 15 jours : aucun remboursement. Nous recommandons une assurance annulation voyage.',
      },
      {
        q: 'Proposez-vous une assurance voyage ?',
        r: 'Nous ne vendons pas d\'assurance directement, mais nous recommandons vivement une assurance "annulation + rapatriement + assistance" avant tout voyage au Maroc. Les assureurs comme AXA, Allianz ou MAIF proposent des formules adaptées aux voyages organisés.',
      },
    ],
  },
  {
    categorie: 'MICE & Groupes',
    questions: [
      {
        q: 'À partir de combien de personnes proposez-vous des tarifs groupes ?',
        r: 'Nos tarifs groupes s\'appliquent à partir de 10 personnes. Pour les événements MICE (incentive, team building, séminaires), nous intervenons à partir de 15 participants avec prise en charge logistique complète depuis l\'aéroport de Marrakech-Menara.',
      },
      {
        q: 'Pouvez-vous organiser un séminaire ou un événement d\'entreprise ?',
        r: 'Oui — c\'est l\'une de nos spécialités depuis 2000. Nous gérons de A à Z : transferts aéroport, hôtel (riad, resort ou camp de luxe), activités team building, soirées de gala, restauration et gestion administrative complète. Demandez un cahier des charges personnalisé.',
      },
    ],
  },
  {
    categorie: 'Agences & Partenaires',
    questions: [
      {
        q: 'Travaillez-vous avec des agences de voyages revendeuses ?',
        r: 'Oui — nous sommes un DMC (Destination Management Company) et travaillons en B2B avec des agences en France, Belgique, Suisse, Allemagne et UK. Nous proposons des tarifs nets, des commissions et un espace partenaire dédié. Contactez-nous pour ouvrir un compte agence.',
      },
      {
        q: 'Comment devenir affilié Voyages21 ?',
        r: 'Notre programme d\'affiliation est en cours de lancement pour les créateurs de contenu voyage (YouTubeurs, blogueurs, influenceurs). Envoyez-nous votre profil à contact@voyages21.com — nous étudions chaque candidature individuellement.',
      },
    ],
  },
]

export const metadata = {
  title: 'FAQ — Questions fréquentes — Voyages21',
  description: 'Toutes les réponses à vos questions sur les circuits Maroc, la logistique, les paiements, les annulations et nos services MICE. Voyages21, DMC Marrakech.',
}

export default function FaqPage() {
  const [open, setOpen] = useState({})

  const toggle = (key) => {
    setOpen(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <>
      {/* HERO */}
      <section style={{
        background: 'var(--navy)',
        padding: '8rem 3rem 5rem',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem',
        }}>
          Questions frequentes
        </p>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          color: 'var(--white)', fontWeight: 700, lineHeight: 1.2,
          marginBottom: '1.5rem',
        }}>
          Tout ce que vous voulez<br />savoir sur votre voyage
        </h1>
        <p style={{
          fontSize: '1rem', color: 'rgba(255,255,255,0.7)',
          maxWidth: '560px', margin: '0 auto', lineHeight: 1.7,
        }}>
          Si vous ne trouvez pas la réponse ici, notre équipe à Marrakech
          vous répond sous 24h.
        </p>
      </section>

      {/* ACCORDEON FAQ */}
      <section style={{ padding: '5rem 3rem', background: 'var(--cream)' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          {faqs.map((section) => (
            <div key={section.categorie} style={{ marginBottom: '3rem' }}>
              {/* Titre catégorie */}
              <h2 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.3rem',
                color: 'var(--navy)',
                fontWeight: 600,
                marginBottom: '1.25rem',
                paddingBottom: '0.75rem',
                borderBottom: '2px solid var(--gold)',
              }}>
                {section.categorie}
              </h2>

              {/* Questions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {section.questions.map((item, idx) => {
                  const key = `${section.categorie}-${idx}`
                  const isOpen = open[key]
                  return (
                    <div key={key} style={{
                      borderBottom: '1px solid rgba(27,45,79,0.12)',
                    }}>
                      <button
                        onClick={() => toggle(key)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '1.2rem 0',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left',
                          gap: '1rem',
                        }}
                        aria-expanded={isOpen}
                      >
                        <span style={{
                          fontFamily: 'DM Sans, sans-serif',
                          fontSize: '0.95rem',
                          fontWeight: 600,
                          color: isOpen ? 'var(--gold)' : 'var(--navy)',
                          lineHeight: 1.5,
                          transition: 'color 0.2s',
                        }}>
                          {item.q}
                        </span>
                        <span style={{
                          flexShrink: 0,
                          width: '24px', height: '24px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: isOpen ? 'var(--gold)' : 'var(--navy)',
                          borderRadius: '50%',
                          transition: 'background 0.2s',
                        }}>
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            {isOpen
                              ? <path d="M1 5h8" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                              : <path d="M5 1v8M1 5h8" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                            }
                          </svg>
                        </span>
                      </button>

                      {isOpen && (
                        <div style={{
                          padding: '0 0 1.25rem 0',
                          fontSize: '0.9rem',
                          color: '#4B5563',
                          lineHeight: 1.75,
                        }}>
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

      {/* CTA CONTACT */}
      <section style={{
        background: 'var(--navy)',
        padding: '5rem 3rem',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem',
        }}>
          Une autre question ?
        </p>
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
          color: 'var(--white)', marginBottom: '1rem',
        }}>
          Notre equipe repond sous 24h
        </h2>
        <p style={{
          fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)',
          marginBottom: '2rem', lineHeight: 1.6,
        }}>
          Marrakech — Du lundi au samedi, 9h–19h (GMT+1)
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/contact" style={{
            display: 'inline-block',
            padding: '0.85rem 2rem',
            background: 'var(--gold)',
            color: 'var(--dark)',
            textDecoration: 'none',
            fontSize: '0.82rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            Formulaire de contact
          </Link>
          <a href="https://wa.me/212661181618" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-block',
            padding: '0.85rem 2rem',
            border: '1px solid rgba(255,255,255,0.3)',
            color: 'var(--white)',
            textDecoration: 'none',
            fontSize: '0.82rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            WhatsApp +212 661 181 618
          </a>
        </div>
      </section>
    </>
  )
}
