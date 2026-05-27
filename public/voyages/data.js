/* Voyages21 — données des voyages (source unique de contenu).
   Chaque voyage est un objet ; la structure de page est rendue par render.js.
   Ajouter un voyage = ajouter une entrée ici + un petit fichier-page (data-voyage). */
window.VOYAGES = {

  "turquie-sejour-istanbul": {
    mediaKey: "modal-istanbul",
    whatsapp: "212673280009",
    eyebrow: "Turquie · Spécial été 2026",
    title: "Séjour à Istanbul",
    duration: "8 jours",
    tag: "Turquie",
    cadran: [
      ["Départ", "Casablanca"],
      ["Destination", "Istanbul, Turquie"],
      ["Durée", "8 jours / 7 nuits"],
      ["Vols", "Inclus — Turkish Airlines"],
      ["Pension", "Logement et petit-déjeuner"],
      ["Période", "Été 2026 (juil.–août)"],
      ["Guide", "Arabophone (excursions)"]
    ],
    price: "9 700 DH",
    intro: [
      "Il y a des villes que l'on visite, et d'autres que l'on habite, le temps d'une semaine. Istanbul est de celles-là. Posée à cheval sur deux continents, elle vous accueille au son de l'appel à la prière qui glisse au-dessus des coupoles, dans le parfum du thé et des épices. Vous lèverez les yeux vers les faïences d'Iznik de la Mosquée Bleue, traverserez l'Hippodrome où battait le cœur de Constantinople, et pousserez les portes du palais de Topkapı, fastueuse demeure des sultans.",
      "Un matin, un bateau vous emmènera au fil du Bosphore, entre les rives d'Europe et d'Asie, devant les yalis de bois des familles ottomanes. Un autre jour, le large vous tendra les bras vers les Îles des Princesses, leurs pinèdes et leurs calèches, loin du tumulte de la ville.",
      "Et parce qu'un beau voyage sait aussi laisser du temps au temps, plusieurs journées restent libres : pour flâner dans le Grand Bazar, vous perdre dans une ruelle, ou simplement regarder la ville vivre. Sept nuits pour faire d'Istanbul, un peu, la vôtre."
    ],
    highlights: [
      "La Mosquée Bleue et ses faïences d'Iznik, l'Hippodrome et le palais de Topkapı",
      "Une croisière incluse sur le Bosphore, entre Europe et Asie",
      "Une excursion aux Îles des Princesses (en option)",
      "Plusieurs journées libres pour explorer à votre rythme",
      "Vols Casablanca – Istanbul inclus sur Turkish Airlines"
    ],
    days: [
      { num: "J1", title: "Casablanca – Istanbul",
        text: "Rendez-vous à l'aéroport, assistance aux formalités d'embarquement et envol pour Istanbul. À l'arrivée, accueil par notre correspondant et transfert à votre hôtel. Installation dans vos chambres.",
        meta: [["Nuit", "Istanbul"]] },
      { num: "J2", title: "Istanbul — la vieille ville", titleOpt: "(city tour en option)",
        text: "Journée consacrée aux principaux monuments de la ville : l'Hippodrome, centre de la vie sociale et politique de Constantinople, la Mosquée Bleue, tapissée de faïences d'Iznik et seule à posséder six minarets, puis le palais de Topkapı, fastueuse résidence des sultans ottomans.",
        meta: [["Repas", "petit-déjeuner"]], opt: "Visites en option" },
      { num: "J3", title: "Istanbul — croisière sur le Bosphore",
        text: "Après le petit-déjeuner, promenade en bateau sur le Bosphore. Vous admirerez les jolis « yalis », résidences de bois des familles ottomanes. Retour et nuit à l'hôtel. Dîner libre.",
        meta: [["Repas", "petit-déjeuner"], ["Inclus", "croisière sur le Bosphore"]] },
      { num: "J4", title: "Istanbul — Îles des Princesses", titleOpt: "(en option)",
        text: "Départ pour une journée de visite des Îles des Princesses. Déjeuner dans un restaurant local, puis balade en calèche autour de Büyük Ada (en option). Le soir, retour à l'hôtel.",
        meta: [["Repas", "petit-déjeuner"]], opt: "Journée en option" },
      { num: "J5–7", title: "Istanbul — journées libres",
        text: "Journées libres pour une exploration personnelle : le Grand Bazar, les ruelles de Sultanahmet, les rives du Bosphore… à votre rythme.",
        meta: [["Repas", "petit-déjeuner"]] },
      { num: "J8", title: "Istanbul – Casablanca",
        text: "Petit-déjeuner à l'hôtel, puis transfert à l'aéroport pour le vol retour à destination de Casablanca.",
        meta: [["Repas", "petit-déjeuner"]] }
    ],
    inclus: [
      "Le billet d'avion Casablanca / Istanbul / Casablanca sur Turkish Airlines",
      "7 nuits à Istanbul en logement et petit-déjeuner",
      "Excursion d'une demi-journée : croisière sur le Bosphore",
      "Les transferts arrivée et départ en transport touristique (en groupe)",
      "Les taxes de séjour et de promotion touristique",
      "Les services d'un guide arabophone pendant les excursions",
      "L'assistance de Voyages 21"
    ],
    exclus: [
      "Les excursions (hors croisière sur le Bosphore incluse)",
      "Les extras aux hôtels et les boissons",
      "Les pourboires des guides et chauffeurs"
    ],
    hebergement: "<b>Istanbul</b> — 7 nuits, en logement et petit-déjeuner.",
    route: ["Casablanca", "Istanbul", "Bosphore", "Îles des Princesses", "Casablanca"],
    dates: {
      line: "Départs garantis tout l'été 2026 (juillet et août), au départ de Casablanca.",
      note: "Contactez-nous pour le tarif et les disponibilités selon vos dates."
    },
    cta: {
      title: "Envie de partir à Istanbul ?",
      text: "Nous composons chaque voyage sur mesure, selon vos dates et vos envies — comme nous le faisons depuis 2000."
    }
  },

  "turquie-istanbul-antalya": {
    mediaKey: "modal-istanbul-antalya",
    whatsapp: "212673280009",
    eyebrow: "Turquie · Combiné été 2026",
    title: "Istanbul & Antalya",
    duration: "8 jours",
    tag: "Turquie",
    cadran: [
      ["Départ", "Casablanca"],
      ["Destinations", "Istanbul et Antalya"],
      ["Durée", "8 jours / 7 nuits"],
      ["Vols", "Inclus — Turkish Airlines et AJet"],
      ["Pension", "2 nuits petit-déj · 5 nuits tout compris"],
      ["Période", "Été 2026"]
    ],
    price: "16 300 DH",
    intro: [
      "Istanbul d'abord, le temps d'une escale qui a tout d'une promesse : la ville aux deux continents vous accueille au bord du Bosphore, entre coupoles et lumière dorée, avant de vous laisser repartir vers le sud.",
      "Puis Antalya, et le grand bleu. Sur la Riviera turque, votre séjour se fait en formule tout compris, au rythme des bains de mer, des longues heures au bord de la piscine et des soirées douces face à la Méditerranée. Cinq nuits où l'on ne s'occupe de rien, sinon de profiter.",
      "Entre la profondeur d'Istanbul et la douceur balnéaire d'Antalya, ce combiné offre le meilleur des deux : un peu de ville, beaucoup de détente, et des vols comme des transferts entièrement pris en charge. Vous n'avez qu'à dire oui."
    ],
    highlights: [
      "Deux nuits à Istanbul, porte d'entrée entre Europe et Asie",
      "Cinq nuits en formule tout compris à Antalya, sur la Riviera turque",
      "Vols Casablanca – Istanbul – Antalya inclus (Turkish Airlines et AJet)",
      "Tous les transferts privés assurés, à Istanbul comme à Antalya",
      "Plage, piscines et farniente face à la Méditerranée"
    ],
    days: [
      { num: "J1", title: "Casablanca – Istanbul",
        text: "Rendez-vous à l'aéroport, assistance aux formalités d'embarquement et envol vers Istanbul. À l'arrivée, accueil par notre correspondant local et transfert à l'hôtel. Nuitée.",
        meta: [["Nuit", "Istanbul"]] },
      { num: "J2", title: "Istanbul – Antalya",
        text: "Petit-déjeuner à l'hôtel, puis transfert vers l'aéroport Sabiha et envol vers Antalya. À l'arrivée, accueil et transfert à votre hôtel. Début de votre séjour en formule tout compris.",
        meta: [["Repas", "petit-déjeuner"], ["Nuit", "Antalya"]] },
      { num: "J3–6", title: "Antalya — séjour en tout compris",
        text: "Journées libres en formule tout compris à Antalya : plage, piscines et détente, à votre rythme, face à la Méditerranée.",
        meta: [["Repas", "tout compris"], ["Nuit", "Antalya"]] },
      { num: "J7", title: "Antalya – Istanbul",
        text: "Après le petit-déjeuner, transfert à l'aéroport d'Antalya et envol vers Istanbul. Accueil et assistance à l'aéroport, transfert et nuitée à l'hôtel.",
        meta: [["Repas", "petit-déjeuner"], ["Nuit", "Istanbul"]] },
      { num: "J8", title: "Istanbul – Casablanca",
        text: "Après le petit-déjeuner, transfert à l'aéroport d'Istanbul et envol vers Casablanca. Fin de nos services.",
        meta: [["Repas", "petit-déjeuner"]] }
    ],
    inclus: [
      "Le billet d'avion aller-retour Casablanca / Istanbul / Antalya — Turkish Airlines (40 kg en soute + 8 kg en cabine) et AJet (20 kg en soute + 8 kg en cabine)",
      "2 nuits avec petit-déjeuner à Istanbul",
      "5 nuits en formule tout compris à Antalya",
      "Les transferts arrivées et départs à Istanbul",
      "Les transferts arrivées et départs à Antalya",
      "L'assistance de Voyages 21"
    ],
    exclus: [
      "Les extras aux hôtels et les boissons",
      "Les pourboires des guides et chauffeurs"
    ],
    hebergement: "<b>Istanbul</b> — 2 nuits, en logement et petit-déjeuner.<br><b>Antalya</b> — 5 nuits, en formule tout compris.",
    route: ["Casablanca", "Istanbul", "Antalya", "Istanbul", "Casablanca"],
    dates: {
      line: "Dates de voyages garanties au départ de Casablanca, tout l'été 2026.",
      note: "Contactez-nous pour le tarif et les disponibilités selon vos dates."
    },
    cta: {
      title: "Envie de partir en Turquie ?",
      text: "Nous composons chaque voyage sur mesure, selon vos dates et vos envies — comme nous le faisons depuis 2000."
    }
  }

};
