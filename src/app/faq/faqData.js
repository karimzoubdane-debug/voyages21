// Données FAQ partagées entre le rendu client (FaqClient.jsx, accordéon)
// et le rendu serveur (page.jsx, données structurées Schema.org FAQPage).
// Source unique de vérité : ne pas dupliquer les questions/réponses ailleurs.

export const faqs = [
  {
    categorie: 'Avant de partir',
    questions: [
      {
        q: 'Comment se déroule la réservation d\'un circuit Voyages21 ?',
        r: 'Vous nous contactez via le formulaire de devis ou par WhatsApp. Nous étudions votre demande et vous envoyons une proposition personnalisée sous 48h. Un acompte de 30% confirme la réservation, le solde est réglé 30 jours avant le départ.',
      },
      {
        q: 'Faut-il un visa pour entrer au Maroc ?',
        r: 'Les ressortissants français, belges, suisses et européens n\'ont pas besoin de visa — l\'entrée est libre pour 90 jours. Les ressortissants allemands et britanniques sont également exemptés. Nous vous conseillons de vérifier les conditions en vigueur auprès de l\'ambassade du Maroc avant le départ.',
      },
      {
        q: 'Quelle est la meilleure période pour visiter le Maroc ?',
        r: 'Les périodes idéales sont le printemps (mars-mai) et l\'automne (septembre-novembre) : températures douces, paysages verts et ciel dégagé. L\'été est déconseillé dans le désert (50°C à Merzouga). L\'hiver est parfait pour le désert mais froid en montagne.',
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
        r: 'Le Raid 4x4 est une expédition technique sur pistes et dunes — conduite autonome ou encadrée, guide-pisteur, véhicule d\'assistance. Le Circuit Classique se fait en bus ou en autotour sur routes goudronnées, adapté à tous les profils.',
      },
      {
        q: 'Peut-on conduire soi-même lors d\'un Raid 4x4 ?',
        r: 'Oui — nous proposons la formule "Self-Drive" : vous conduisez votre propre 4x4 loué chez nous avec un guide-pisteur en tête de convoi et un véhicule d\'assistance. Aucune expérience de piste requise pour les circuits niveau débutant.',
      },
      {
        q: 'Les circuits moto incluent-ils les motos ?',
        r: 'Oui. Nos circuits moto incluent la location de BMW R1250GS, F850GS ou KTM Adventure selon disponibilité. Permis moto obligatoire. Nous proposons également la formule "venez avec votre propre moto" avec assistance technique intégrée.',
      },
      {
        q: 'Que comprend exactement la formule "à partir de" affichée sur le site ?',
        r: 'Le prix "à partir de" correspond à la formule Essentielle : hébergement en hôtel 3 étoiles, petit-déjeuner inclus, transport et guide uniquement. Les activités et upgrades sont en option via notre configurateur de devis.',
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
        r: 'Annulation plus de 45 jours avant le départ : remboursement intégral hors frais de dossier (50€). Entre 45 et 30 jours : 30% retenus. Entre 30 et 15 jours : 50% retenus. Moins de 15 jours : aucun remboursement.',
      },
      {
        q: 'Proposez-vous une assurance voyage ?',
        r: 'Nous ne vendons pas d\'assurance directement, mais nous recommandons vivement une assurance "annulation + rapatriement + assistance" avant tout voyage. AXA, Allianz ou MAIF proposent des formules adaptées aux voyages organisés.',
      },
    ],
  },
  {
    categorie: 'MICE & Groupes',
    questions: [
      {
        q: 'À partir de combien de personnes proposez-vous des tarifs groupes ?',
        r: 'Nos tarifs groupes s\'appliquent à partir de 10 personnes. Pour les événements MICE, nous intervenons à partir de 15 participants avec prise en charge logistique complète depuis l\'aéroport de Marrakech-Menara.',
      },
      {
        q: 'Pouvez-vous organiser un séminaire ou un événement d\'entreprise ?',
        r: 'Oui — c\'est l\'une de nos spécialités depuis 2000. Nous gérons de A à Z : transferts, hôtel, activités team building, soirées de gala, restauration et gestion administrative complète.',
      },
    ],
  },
  {
    categorie: 'Agences & Partenaires',
    questions: [
      {
        q: 'Travaillez-vous avec des agences de voyages revendeuses ?',
        r: 'Oui — nous sommes un DMC et travaillons en B2B avec des agences en France, Belgique, Suisse, Allemagne et UK. Nous proposons des tarifs nets, des commissions et un espace partenaire dédié.',
      },
      {
        q: 'Comment devenir affilié Voyages21 ?',
        r: 'Notre programme d\'affiliation est en cours de lancement pour les créateurs de contenu voyage. Envoyez votre profil à contact@voyages21.com — nous étudions chaque candidature individuellement.',
      },
    ],
  },
]
