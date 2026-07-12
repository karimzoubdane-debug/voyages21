/* Voyages21 — données des voyages (source unique de contenu).
   Chaque voyage est un objet ; la structure de page est rendue par render.js.
   Ajouter un voyage = ajouter une entrée ici + un petit fichier-page (data-voyage). */
window.VOYAGES = {

  "turquie-sejour-istanbul": {
    mediaKey: "modal-istanbul",
    whatsapp: "212614152686",
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
    hotels: ["Comfortlife 3★ — Laleli", "All Season 4★ — Fatih", "Taksim Square 4★"],
    priceTable: {
      head: ["Catégorie", "Saison", "Prix / pers."],
      rows: [
        ["Triple · 3★", "Basse", "9 700 DH"],
        ["Triple · 4★", "Moyenne", "9 900 DH"],
        ["Triple · 4★", "Haute", "11 900 DH"],
        ["Double · 3★", "Basse", "9 900 DH"],
        ["Double · 4★", "Moyenne", "10 900 DH"],
        ["Double · 4★", "Haute", "12 600 DH"],
        ["Single · 4★", "Moyenne", "13 900 DH"]
      ]
    },
    children: "0–2 ans : 1 500 DH · 2–6 ans : 6 900 DH · 7–11 ans : 8 700–10 100 DH",
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
    whatsapp: "212614152686",
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
    hotels: ["Beyazsamay 4★ + Kemer Ring Beach Resort 5★", "Taksim Gonen 4★ + Kemer Ring Beach Resort 5★", "Taksim Square 4★ + Sirene Belek Resort 5★ (vue mer)"],
    priceTable: {
      head: ["Chambre", "Basse", "Moyenne", "Haute"],
      rows: [
        ["Triple", "16 300 DH", "16 500 DH", "20 500 DH"],
        ["Double", "17 900 DH", "18 500 DH", "22 500 DH"],
        ["Single", "23 800 DH", "24 500 DH", "31 800 DH"]
      ]
    },
    children: "0–2 ans : 1 800 DH · 2–6 ans : 8 900 DH",
    route: ["Casablanca", "Istanbul", "Antalya", "Istanbul", "Casablanca"],
    dates: {
      line: "Dates de voyages garanties au départ de Casablanca, tout l'été 2026.",
      note: "Contactez-nous pour le tarif et les disponibilités selon vos dates."
    },
    cta: {
      title: "Envie de partir en Turquie ?",
      text: "Nous composons chaque voyage sur mesure, selon vos dates et vos envies — comme nous le faisons depuis 2000."
    }
  },

  "turquie-istanbul-bodrum": {
    mediaKey: "modal-istanbul-bodrum",
    whatsapp: "212614152686",
    eyebrow: "Turquie · Combiné été 2026",
    title: "Istanbul & Bodrum",
    duration: "8 jours",
    tag: "Turquie",
    cadran: [
      ["Départ", "Casablanca"],
      ["Destinations", "Istanbul et Bodrum"],
      ["Durée", "8 jours / 7 nuits"],
      ["Vols", "Inclus — Turkish Airlines et AJet"],
      ["Pension", "2 nuits petit-déj · 5 nuits tout compris (vue mer)"],
      ["Période", "Été 2026"]
    ],
    price: "16 900 DH",
    intro: [
      "Istanbul d'abord, le temps d'une nuit qui ouvre le voyage : la ville aux deux continents, ses coupoles et la lumière du Bosphore, avant le grand saut vers la mer Égée.",
      "Puis Bodrum, la perle blanche de la côte turque. Maisons immaculées, marina élégante, eaux limpides : votre séjour s'y déroule en formule tout compris, chambre face à la mer. Cinq nuits pour ne plus penser à rien, sinon au prochain bain et au coucher de soleil sur la baie.",
      "Un peu de ville, beaucoup de large : ce combiné réunit l'effervescence d'Istanbul et la douceur balnéaire de l'Égée, vols et transferts entièrement pris en charge."
    ],
    highlights: [
      "Une nuit à Istanbul à l'aller, une au retour, entre Europe et Asie",
      "Cinq nuits en formule tout compris à Bodrum, chambre vue mer",
      "Vols Casablanca – Istanbul – Bodrum inclus (Turkish Airlines et AJet)",
      "Tous les transferts privés assurés",
      "Les eaux turquoise et la marina de la côte égéenne"
    ],
    days: [
      { num: "J1", title: "Casablanca – Istanbul",
        text: "Rendez-vous à l'aéroport, assistance aux formalités d'embarquement et envol vers Istanbul. Accueil par notre correspondant local et transfert à l'hôtel. Nuitée.",
        meta: [["Nuit", "Istanbul"]] },
      { num: "J2", title: "Istanbul – Bodrum",
        text: "Petit-déjeuner, puis transfert vers l'aéroport Sabiha et envol vers Bodrum. Accueil et transfert à votre hôtel. Début de votre séjour en formule tout compris.",
        meta: [["Repas", "petit-déjeuner"], ["Nuit", "Bodrum"]] },
      { num: "J3–6", title: "Bodrum — séjour en tout compris (vue mer)",
        text: "Journées libres en formule tout compris à Bodrum, chambre face à la mer : plage, piscines, marina et détente, à votre rythme.",
        meta: [["Repas", "tout compris"], ["Nuit", "Bodrum"]] },
      { num: "J7", title: "Bodrum – Istanbul",
        text: "Après le petit-déjeuner, transfert à l'aéroport de Bodrum et envol vers Istanbul. Accueil, transfert et nuitée à l'hôtel.",
        meta: [["Repas", "petit-déjeuner"], ["Nuit", "Istanbul"]] },
      { num: "J8", title: "Istanbul – Casablanca",
        text: "Après le petit-déjeuner, transfert à l'aéroport d'Istanbul et envol vers Casablanca. Fin de nos services.",
        meta: [["Repas", "petit-déjeuner"]] }
    ],
    inclus: [
      "Le billet d'avion aller-retour Casablanca / Istanbul / Bodrum — Turkish Airlines et AJet",
      "2 nuits avec petit-déjeuner à Istanbul",
      "5 nuits en formule tout compris à Bodrum, chambres vue mer",
      "Les transferts arrivées et départs à Istanbul",
      "Les transferts arrivées et départs à Bodrum",
      "L'assistance de Voyages 21"
    ],
    exclus: [
      "Les extras aux hôtels et les boissons",
      "Les pourboires des guides et chauffeurs"
    ],
    hotels: ["Beyazsamay 4★ + Club Blue Dream Resort 5★", "Taksim Gonen 4★ + Club Blue Dream 5★", "Taksim Square 4★ + La Blanche Island 5★"],
    priceTable: {
      head: ["Chambre", "Basse", "Moyenne", "Haute"],
      rows: [
        ["Triple", "16 900 DH", "17 500 DH", "20 500 DH"],
        ["Double", "19 700 DH", "19 900 DH", "24 900 DH"],
        ["Single", "24 500 DH", "24 600 DH", "40 500 DH"]
      ]
    },
    route: ["Casablanca", "Istanbul", "Bodrum", "Istanbul", "Casablanca"],
    dates: {
      line: "Dates garanties au départ de Casablanca, tout l'été 2026.",
      note: "Contactez-nous pour le tarif et les disponibilités selon vos dates."
    },
    cta: {
      title: "Envie de partir à Bodrum ?",
      text: "Nous composons chaque voyage sur mesure, selon vos dates et vos envies — comme nous le faisons depuis 2000."
    }
  },

  "turquie-istanbul-marmaris-bodrum": {
    mediaKey: "modal-marmaris-bodrum",
    whatsapp: "212614152686",
    eyebrow: "Turquie · Combiné été 2026",
    title: "Istanbul, Marmaris & Bodrum",
    duration: "11 jours",
    tag: "Turquie",
    cadran: [
      ["Départ", "Casablanca"],
      ["Destinations", "Istanbul, Marmaris et Bodrum"],
      ["Durée", "11 jours / 10 nuits"],
      ["Vols", "Inclus — Turkish Airlines"],
      ["Pension", "3 nuits petit-déj · 7 nuits tout compris"],
      ["Période", "Été 2026"]
    ],
    price: "23 500 DH",
    intro: [
      "Trois temps, une même Turquie. D'abord Istanbul, trois nuits pour s'imprégner de la ville aux deux continents : ses monuments, ses bazars, et une croisière sur le Bosphore au fil de l'eau.",
      "Puis cap sur l'Égée. Marmaris et sa baie protégée, ses pinèdes qui descendent jusqu'à la mer, en formule tout compris. Avant Bodrum la blanche, ses maisons immaculées et sa marina, chambre face au large.",
      "Onze jours pour conjuguer culture et farniente, du Bosphore aux criques turquoise — vols, transferts et croisière compris."
    ],
    highlights: [
      "Trois nuits à Istanbul, avec croisière incluse sur le Bosphore",
      "Trois nuits en tout compris à Marmaris, sur l'Égée",
      "Quatre nuits en tout compris à Bodrum, chambre vue mer",
      "Vols inclus et tous les transferts assurés",
      "Visite de la vieille ville d'Istanbul (en option)"
    ],
    days: [
      { num: "J1", title: "Casablanca – Istanbul",
        text: "Rendez-vous à l'aéroport, formalités et envol vers Istanbul. Accueil et transfert à l'hôtel. Nuitée.",
        meta: [["Nuit", "Istanbul"]] },
      { num: "J2", title: "Istanbul — visite historique", titleOpt: "(en option)",
        text: "Journée consacrée aux principaux monuments : l'Hippodrome, la Mosquée Bleue et ses faïences d'Iznik, le palais de Topkapı (en option), puis le Grand Bazar. Déjeuner libre.",
        meta: [["Repas", "petit-déjeuner"]], opt: "Visites en option" },
      { num: "J3", title: "Istanbul — croisière sur le Bosphore",
        text: "Traversée du Bosphore par le pont suspendu vers la rive asiatique, retour vers l'Europe, puis visite du Bazar égyptien, souk d'épices et de spécialités orientales. Déjeuner libre.",
        meta: [["Repas", "petit-déjeuner"], ["Inclus", "croisière sur le Bosphore"]] },
      { num: "J4", title: "Istanbul – Dalaman – Marmaris",
        text: "Petit-déjeuner, transfert et vol vers Dalaman, puis route vers Marmaris. Installation en formule tout compris ; temps libre sur la marina.",
        meta: [["Repas", "tout compris"], ["Nuit", "Marmaris"]] },
      { num: "J5–6", title: "Marmaris — séjour en tout compris",
        text: "Journées libres en formule tout compris à Marmaris : plage, baie protégée et détente.",
        meta: [["Repas", "tout compris"], ["Nuit", "Marmaris"]] },
      { num: "J7", title: "Marmaris – Bodrum",
        text: "Petit-déjeuner, route vers Bodrum, installation en formule tout compris. Temps libre à la marina ou en centre-ville.",
        meta: [["Repas", "tout compris"], ["Nuit", "Bodrum"]] },
      { num: "J8–10", title: "Bodrum — séjour en tout compris (vue mer)",
        text: "Journées libres en formule tout compris à Bodrum, chambre vue mer : plage, piscines et détente.",
        meta: [["Repas", "tout compris"], ["Nuit", "Bodrum"]] },
      { num: "J11", title: "Bodrum – Istanbul – Casablanca",
        text: "Après le petit-déjeuner, transfert à l'aéroport de Bodrum et envol vers Casablanca via Istanbul. Fin de nos services.",
        meta: [["Repas", "petit-déjeuner"]] }
    ],
    inclus: [
      "Le billet d'avion aller-retour Casablanca / Istanbul / Dalaman et Bodrum / Istanbul / Casablanca — Turkish Airlines",
      "3 nuits avec petit-déjeuner à Istanbul",
      "3 nuits en formule tout compris à Marmaris",
      "4 nuits en formule tout compris à Bodrum, chambres vue mer",
      "Les transferts arrivées et départs à Istanbul",
      "Le transfert arrivée à Dalaman et le transfert Marmaris – Bodrum",
      "Le transfert départ à Bodrum",
      "Excursion d'une demi-journée : croisière sur le Bosphore",
      "L'assistance de Voyages 21"
    ],
    exclus: [
      "Les extras aux hôtels et les boissons",
      "Les pourboires des guides et chauffeurs",
      "Les excursions (hors croisière sur le Bosphore incluse)"
    ],
    hebergement: "<b>Istanbul</b> — 3 nuits, logement et petit-déjeuner.<br><b>Marmaris</b> — 3 nuits, tout compris.<br><b>Bodrum</b> — 4 nuits, tout compris (chambre vue mer).",
    priceTable: {
      head: ["Chambre", "Basse", "Moyenne", "Haute"],
      rows: [
        ["Triple", "23 500 DH", "23 900 DH", "27 500 DH"],
        ["Double", "24 700 DH", "25 700 DH", "29 500 DH"],
        ["Single", "35 000 DH", "35 900 DH", "44 500 DH"]
      ]
    },
    datesList: ["31/07", "03/08", "04/08", "09/08", "10/08", "16/08", "17/08", "21/08"],
    route: ["Casablanca", "Istanbul", "Marmaris", "Bodrum", "Istanbul", "Casablanca"],
    dates: {
      line: "Départs garantis au départ de Casablanca (été 2026) :",
      note: "Contactez-nous pour le tarif et les disponibilités selon vos dates."
    },
    cta: {
      title: "Envie de partir en Turquie ?",
      text: "Nous composons chaque voyage sur mesure, selon vos dates et vos envies — comme nous le faisons depuis 2000."
    }
  },

  "turquie-istanbul-antalya-11j": {
    mediaKey: "modal-istanbul-antalya-11j",
    whatsapp: "212614152686",
    eyebrow: "Turquie · Combiné été 2026",
    title: "Istanbul & Antalya",
    duration: "11 jours",
    tag: "Turquie",
    cadran: [
      ["Départ", "Casablanca"],
      ["Destinations", "Istanbul et Antalya"],
      ["Durée", "11 jours / 10 nuits"],
      ["Vols", "Inclus — Turkish Airlines"],
      ["Pension", "3 nuits petit-déj · 7 nuits tout compris"],
      ["Période", "Été 2026"]
    ],
    price: "19 900 DH",
    intro: [
      "Istanbul, trois nuits durant. Le temps de voir la Mosquée Bleue et le palais de Topkapı, de se perdre dans le Grand Bazar, et de voguer sur le Bosphore — la croisière est offerte — entre les rives d'Europe et d'Asie.",
      "Puis Antalya, et sept nuits de pur repos sur la Riviera turque. En formule tout compris, face à une Méditerranée d'un bleu profond : baignades, piscines et soleil, sans avoir à penser à rien.",
      "La version longue de notre combiné turc : assez de jours pour goûter vraiment à Istanbul, et tout le temps de se détendre à Antalya. Vols et transferts compris."
    ],
    highlights: [
      "Trois nuits à Istanbul, croisière sur le Bosphore offerte",
      "Sept nuits en formule tout compris à Antalya",
      "Mosquée Bleue, Topkapı, Grand Bazar et Bazar égyptien",
      "Vols Casablanca – Istanbul – Antalya inclus (Turkish Airlines)",
      "Tous les transferts et les taxes inclus"
    ],
    days: [
      { num: "J1", title: "Casablanca – Istanbul",
        text: "Rendez-vous à l'aéroport, formalités et envol vers Istanbul. Accueil et transfert à l'hôtel. Nuitée.",
        meta: [["Nuit", "Istanbul"]] },
      { num: "J2", title: "Istanbul — visite historique", titleOpt: "(en option)",
        text: "Journée consacrée aux principaux monuments : l'Hippodrome, la Mosquée Bleue, le palais de Topkapı (en option), puis le Grand Bazar. Déjeuner libre.",
        meta: [["Repas", "petit-déjeuner"]], opt: "Visites en option" },
      { num: "J3", title: "Istanbul — croisière sur le Bosphore (offerte)",
        text: "Traversée du Bosphore vers la rive asiatique, retour vers l'Europe, puis visite du Bazar égyptien, souk d'épices et de spécialités orientales. Déjeuner libre.",
        meta: [["Repas", "petit-déjeuner"], ["Inclus", "croisière sur le Bosphore (offerte)"]] },
      { num: "J4", title: "Istanbul – Antalya",
        text: "Petit-déjeuner, transfert à l'aéroport et envol vers Antalya. Accueil et transfert à l'hôtel. Dîner et nuitée ; début du séjour en formule tout compris.",
        meta: [["Repas", "tout compris"], ["Nuit", "Antalya"]] },
      { num: "J5–10", title: "Antalya — séjour en tout compris",
        text: "Sept nuits en formule tout compris à Antalya : plage, piscines et détente face à la Méditerranée, à votre rythme.",
        meta: [["Repas", "tout compris"], ["Nuit", "Antalya"]] },
      { num: "J11", title: "Antalya – Istanbul – Casablanca",
        text: "Après le petit-déjeuner, transfert à l'aéroport d'Antalya et envol vers Casablanca via Istanbul. Fin de nos services.",
        meta: [["Repas", "petit-déjeuner"]] }
    ],
    inclus: [
      "Le billet d'avion aller-retour Casablanca / Istanbul / Antalya — Turkish Airlines",
      "3 nuits avec petit-déjeuner à Istanbul",
      "Excursion : croisière sur le Bosphore (offerte)",
      "7 nuits en formule tout compris à Antalya",
      "Les transferts arrivées et départs à Istanbul",
      "Les transferts arrivées et départs à Antalya",
      "Les taxes aéroportuaires et de séjour",
      "L'assistance de Voyages 21"
    ],
    exclus: [
      "Les extras aux hôtels et les boissons",
      "Les pourboires des guides et chauffeurs"
    ],
    hebergement: "<b>Istanbul</b> — 3 nuits, logement et petit-déjeuner.<br><b>Antalya</b> — 7 nuits, en formule tout compris.",
    priceTable: {
      head: ["Chambre", "Basse", "Moyenne", "Haute"],
      rows: [
        ["Triple", "19 900 DH", "20 500 DH", "25 500 DH"],
        ["Double", "21 000 DH", "21 500 DH", "26 500 DH"],
        ["Single", "29 500 DH", "29 900 DH", "39 900 DH"]
      ]
    },
    datesList: ["23/07", "24/07", "30/07", "31/07", "06/08", "07/08", "13/08", "14/08", "20/08", "21/08"],
    route: ["Casablanca", "Istanbul", "Bosphore", "Antalya", "Istanbul", "Casablanca"],
    dates: {
      line: "Départs garantis au départ de Casablanca (été 2026) :",
      note: "Contactez-nous pour le tarif et les disponibilités selon vos dates."
    },
    cta: {
      title: "Envie de partir en Turquie ?",
      text: "Nous composons chaque voyage sur mesure, selon vos dates et vos envies — comme nous le faisons depuis 2000."
    }
  },

  "egypte-caire-nil-hurghada": {
    mediaKey: "modal-caire-nil-hurghada",
    whatsapp: "212614152686",
    eyebrow: "Égypte · Circuit & croisière été 2026",
    title: "Le Caire, Croisière du Nil & Hurghada",
    duration: "12 jours",
    tag: "Égypte",
    cadran: [
      ["Départ", "Casablanca"],
      ["Destinations", "Le Caire · Nil · Hurghada"],
      ["Durée", "12 jours / 11 nuits"],
      ["Vols", "Inclus — Royal Air Maroc"],
      ["Date", "Du 17 au 28 août 2026"],
      ["Guide", "Francophone"]
    ],
    price: "19 300 DH",
    intro: [
      "L'Égypte des pharaons, dans les règles de l'art. Au Caire, vous vous tiendrez au pied des pyramides de Gizeh et face au Sphinx, ces merveilles que le temps n'a pas su user, avant de percer les secrets des parfums et du papyrus.",
      "Puis le Nil vous prend par la main. Trois nuits à bord d'un bateau de croisière, d'Assouan à Louxor, au fil des temples de Kom Ombo, d'Edfou et de Karnak, des felouques et des couchers de soleil sur le fleuve. La Vallée des Rois vous attend sur l'autre rive.",
      "Enfin Hurghada, et la mer Rouge : quatre nuits en tout compris pour se reposer face à des eaux d'un bleu incomparable. Un grand voyage, des pyramides aux récifs, vols et pension compris."
    ],
    highlights: [
      "Les pyramides de Gizeh et le Sphinx, au Caire",
      "Trois nuits de croisière sur le Nil, d'Assouan à Louxor",
      "Temples de Kom Ombo, Edfou, Karnak et Vallée des Rois",
      "Quatre nuits en tout compris à Hurghada, sur la mer Rouge",
      "Vols Royal Air Maroc inclus et guide francophone"
    ],
    days: [
      { num: "J1", title: "Casablanca – Le Caire",
        text: "Envol pour Le Caire. À l'arrivée à l'aéroport international, accueil et transfert à l'hôtel. Installation et nuitée.",
        meta: [["Nuit", "Le Caire (hôtel 4★ sup.)"]] },
      { num: "J2", title: "Le Caire — Pyramides & Musée, puis train de nuit", titleOpt: "(Musée et déjeuner en option)",
        text: "Petit-déjeuner, puis plateau de Gizeh pour les trois pyramides et le Sphinx, visite d'une parfumerie et d'une fabrique de papyrus. En option : déjeuner avec vue sur le Nil et Musée égyptien. En soirée, transfert vers le train-couchettes pour Assouan (dîner et petit-déjeuner servis à bord).",
        meta: [["Repas", "petit-déjeuner, dîner"], ["Nuit", "Train-couchettes"]] },
      { num: "J3", title: "Assouan – Kom Ombo",
        text: "Arrivée à Assouan et embarquement sur le bateau de croisière. Déjeuner, visite du Haut Barrage, promenade en felouque sur le Nil et jardin botanique. Dîner et nuit à bord.",
        meta: [["Repas", "pension complète"], ["Nuit", "Croisière 5★"]] },
      { num: "J4", title: "Kom Ombo",
        text: "Visite du temple de Kom Ombo, dédié à Sobek et Horus. Retour au bateau, navigation, déjeuner et dîner à bord.",
        meta: [["Repas", "pension complète"], ["Nuit", "Croisière 5★"]] },
      { num: "J5", title: "Edfou",
        text: "Visite du temple d'Edfou, l'un des mieux conservés d'Égypte. Retour au bateau, déjeuner et dîner à bord.",
        meta: [["Repas", "pension complète"], ["Nuit", "Croisière 5★"]] },
      { num: "J6", title: "Louxor – Hurghada",
        text: "Rive ouest de Louxor : Vallée des Rois et temple d'Hatchepsout, puis temple de Karnak sur la rive est. Transfert en bus climatisé vers Hurghada ; début du séjour en tout compris.",
        meta: [["Repas", "petit-déjeuner"], ["Nuit", "Hurghada (4★ de luxe)"]] },
      { num: "J7–9", title: "Hurghada — séjour en tout compris",
        text: "Journées libres en formule tout compris à Hurghada, sur la mer Rouge : plage, piscines et détente, avec excursions possibles en option.",
        meta: [["Repas", "tout compris"], ["Nuit", "Hurghada"]] },
      { num: "J10", title: "Hurghada – Le Caire",
        text: "Petit-déjeuner, puis transfert en bus climatisé vers Le Caire. Arrivée et nuitée à l'hôtel.",
        meta: [["Repas", "petit-déjeuner"], ["Nuit", "Le Caire"]] },
      { num: "J11", title: "Le Caire",
        text: "Journée et nuit au Caire, en logement et petit-déjeuner.",
        meta: [["Repas", "petit-déjeuner"], ["Nuit", "Le Caire"]] },
      { num: "J12", title: "Le Caire – Casablanca",
        text: "Petit-déjeuner, puis transfert à l'aéroport du Caire et envol vers Casablanca.",
        meta: [["Repas", "petit-déjeuner"]] }
    ],
    inclus: [
      "Le billet d'avion Casablanca – Le Caire – Casablanca sur Royal Air Maroc (2 × 23 kg + bagage à main)",
      "1 nuit avec petit-déjeuner au Caire (hôtel 4★ sup.)",
      "1 nuit en train-couchettes, en demi-pension",
      "3 nuits de croisière sur le Nil (5★, pension complète)",
      "4 nuits en tout compris à Hurghada (4★ de luxe)",
      "2 nuits avec petit-déjeuner au Caire (hôtel 4★ sup.)",
      "Les transferts privés (arrivée, départ et vers Hurghada)",
      "Les taxes de séjour et de promotion touristique",
      "L'assistance de Voyages 21"
    ],
    exclus: [
      "Les dépenses personnelles",
      "Les pourboires (20 $/adulte, 5 $/enfant, collectés à l'arrivée)",
      "Le visa Égypte (600 DH)"
    ],
    hotels: ["Le Caire — hôtel 4★ sup. (1 nuit à l'arrivée + 2 nuits au retour)", "Croisière du Nil — bateau 5★, pension complète (3 nuits)", "Hurghada — resort 4★ de luxe, tout compris (4 nuits)"],
    priceTable: {
      head: ["Forfait", "Prix / pers."],
      rows: [
        ["Chambre double ou triple", "19 300 DH"]
      ]
    },
    route: ["Casablanca", "Le Caire", "Assouan", "Kom Ombo · Edfou", "Louxor", "Hurghada", "Le Caire", "Casablanca"],
    dates: {
      line: "Date fixe : du 17 au 28 août 2026, au départ de Casablanca.",
      note: "Visa Égypte : 600 DH (2 photos, copie CIN, relevés bancaires des 3 derniers mois, attestation de travail). À prévoir : dépenses personnelles et pourboires."
    },
    cta: {
      title: "Envie de découvrir l'Égypte ?",
      text: "Nous composons chaque voyage sur mesure, selon vos dates et vos envies — comme nous le faisons depuis 2000."
    }
  },

  "egypte-caire-hurghada": {
    mediaKey: "modal-caire-hurghada",
    whatsapp: "212614152686",
    eyebrow: "Égypte · Combiné été 2026",
    title: "Le Caire & Hurghada",
    duration: "12 jours",
    tag: "Égypte",
    cadran: [
      ["Départ", "Casablanca"],
      ["Destinations", "Le Caire et Hurghada"],
      ["Durée", "12 jours / 11 nuits"],
      ["Vols", "Inclus — Royal Air Maroc"],
      ["Pension", "4 nuits B&B · 7 nuits tout compris"],
      ["Date", "17 au 28 août 2026"],
      ["Hôtels", "4★"]
    ],
    price: "15 600 DH",
    intro: [
      "Un voyage simple et équilibré entre les incontournables du Caire et le repos au bord de la mer Rouge.",
      "Au Caire, vous découvrez les grandes pyramides de Gizeh, le Sphinx et l'ambiance du célèbre marché Khan El Khalili.",
      "Puis Hurghada prend le relais avec sept nuits en formule tout compris au Blend Resort and Aqua Park, entre détente, marina et centre-ville."
    ],
    highlights: [
      "Les pyramides de Gizeh, le Sphinx et Khan El Khalili",
      "Sept nuits à Hurghada en formule tout compris",
      "Visite de la marina de Hurghada et du centre-ville",
      "Vols Casablanca — Le Caire — Casablanca inclus avec Royal Air Maroc",
      "Transferts et transport privé Le Caire / Hurghada / Le Caire"
    ],
    days: [
      { num: "J1", title: "Arrivée au Caire", text: "Arrivée à l'aéroport du Caire, accueil, assistance et transfert à l'hôtel.", meta: [["Nuit", "Le Caire"]] },
      { num: "J2", title: "Le Caire — Pyramides & Khan El Khalili", text: "Visite des grandes pyramides de Gizeh et du Sphinx, puis continuation vers le célèbre marché de Khan El Khalili.", meta: [["Repas", "petit-déjeuner"], ["Nuit", "Le Caire"]] },
      { num: "J3", title: "Le Caire — journée libre", text: "Journée libre pour découvertes personnelles ou activités optionnelles.", meta: [["Repas", "petit-déjeuner"], ["Nuit", "Le Caire"]] },
      { num: "J4-J10", title: "Le Caire — Hurghada", text: "Départ vers Hurghada en autocar climatisé privé, installation à l'hôtel et séjour libre de 7 nuits en formule tout compris.", meta: [["Repas", "tout compris"], ["Nuits", "Hurghada"]] },
      { num: "J11", title: "Hurghada — Le Caire", text: "Petit-déjeuner, départ vers Le Caire en autocar climatisé, arrivée et installation à l'hôtel.", meta: [["Repas", "petit-déjeuner"], ["Nuit", "Le Caire"]] },
      { num: "J12", title: "Départ du Caire", text: "Petit-déjeuner, transfert à l'aéroport du Caire selon l'horaire du vol et assistance aux formalités de départ.", meta: [["Repas", "petit-déjeuner"]] }
    ],
    inclus: [
      "Billet d'avion Casablanca — Le Caire — Casablanca avec Royal Air Maroc",
      "Bagage en soute 46 kg + bagage à main",
      "4 nuits au Caire à l'hôtel Marwa Palace 4★ avec petit-déjeuner",
      "7 nuits à Hurghada au Blend Resort and Aqua Park 4★ en formule tout compris",
      "Tous les transferts mentionnés au programme",
      "Transport Le Caire / Hurghada / Le Caire en autocar climatisé privé",
      "Visite des pyramides de Gizeh, du Sphinx et de Khan El Khalili",
      "Visite de la marina de Hurghada et du centre-ville",
      "Assistance et accueil durant le séjour"
    ],
    exclus: [
      "Dépenses personnelles",
      "Pourboires : 20 USD par adulte et 5 USD par enfant collectés à l'arrivée",
      "Frais de visa Égypte : 600 DH"
    ],
    hotels: ["Hôtel Marwa Palace 4★ Cairo", "Hôtel Blend Resorts 4★ Hurghada"],
    priceTable: {
      head: ["Chambre", "Prix / pers."],
      rows: [
        ["Triple", "15 600 DH"],
        ["Double", "15 900 DH"],
        ["Single", "20 100 DH"]
      ]
    },
    children: "1er enfant moins de 11 ans : 8 600 DH · 2ème enfant moins de 11 ans : 11 900 DH",
    route: ["Casablanca", "Le Caire", "Hurghada", "Le Caire", "Casablanca"],
    dates: {
      line: "Date fixe : du 17 au 28 août 2026.",
      note: "Visa Égypte : 600 DH. Documents : 2 photos, copie CIN, relevés bancaires des 3 derniers mois et attestation de travail."
    },
    cta: {
      title: "Envie de combiner Le Caire et Hurghada ?",
      text: "Nous préparons votre séjour entre pyramides, mer Rouge et assistance Voyages 21."
    }
  },

  "egypte-caire-sharm": {
    mediaKey: "modal-caire-sharm",
    whatsapp: "212614152686",
    eyebrow: "Égypte · Combiné été 2026",
    title: "Le Caire & Sharm El Sheikh",
    duration: "11 jours",
    tag: "Égypte",
    cadran: [
      ["Départ", "Casablanca"],
      ["Destinations", "Le Caire et Sharm El Sheikh"],
      ["Durée", "11 jours / 10 nuits"],
      ["Vols", "Inclus"],
      ["Pension", "3 nuits B&B · 7 nuits tout compris"],
      ["Hôtels", "5★"]
    ],
    price: "17 700 DH",
    pricePrefix: "À partir de",
    intro: [
      "Le Caire pour commencer : trois jours au cœur de l'Égypte éternelle, entre les pyramides de Gizeh, le Sphinx, les ruelles animées de Khan El Khalili et les mosquées d'Al-Hussein et Al-Azhar. Un soir, vous dînerez sur le Nil, au rythme d'un spectacle folklorique.",
      "Puis Sharm El Sheikh, joyau de la mer Rouge. Sept nuits en formule tout compris dans un resort 5★, face à l'un des plus beaux jardins de corail du monde : farniente, baignades et soleil garanti.",
      "De la pierre des pharaons au bleu de la mer Rouge, ce combiné réunit culture et détente — vols, excursions et pension compris."
    ],
    highlights: [
      "Trois nuits au Caire en hôtel 5★, visites comprises",
      "Pyramides de Gizeh, Sphinx et Khan El Khalili",
      "Dîner-croisière sur le Nil avec spectacle",
      "Sept nuits en tout compris à Sharm El Sheikh, resort 5★",
      "Vols et transferts inclus, guide professionnel"
    ],
    days: [
      { num: "J1", title: "Casablanca – Le Caire",
        text: "Envol vers Le Caire. Accueil par notre représentant local, assistance aux formalités de visa et transfert à l'hôtel. Nuitée.",
        meta: [["Nuit", "Le Caire (5★)"]] },
      { num: "J2", title: "Le Caire — pyramides & vieille ville",
        text: "Journée de visite : les grandes pyramides et le Sphinx, l'institut du papyrus et une fabrique de parfums, puis Khan El Khalili et les mosquées d'Al-Hussein et Al-Azhar. Déjeuner et retour à l'hôtel.",
        meta: [["Repas", "petit-déjeuner, déjeuner"], ["Nuit", "Le Caire"]] },
      { num: "J3", title: "Le Caire — dîner-croisière sur le Nil",
        text: "Petit-déjeuner, journée libre, puis dîner-croisière sur le Nil avec spectacle folklorique et musique live à bord. Retour et nuit au Caire.",
        meta: [["Repas", "petit-déjeuner, dîner"], ["Nuit", "Le Caire"]] },
      { num: "J4", title: "Le Caire – Sharm El Sheikh",
        text: "Petit-déjeuner, transfert à l'aéroport et envol vers Sharm El Sheikh. Transfert et dîner à l'hôtel ; début du séjour en tout compris.",
        meta: [["Repas", "petit-déjeuner, dîner"], ["Nuit", "Sharm El Sheikh (5★)"]] },
      { num: "J5–10", title: "Sharm El Sheikh — séjour en tout compris",
        text: "Sept nuits en formule tout compris à Sharm El Sheikh, dans un resort 5★ : plage, récifs de corail, piscines et détente, à votre rythme.",
        meta: [["Repas", "tout compris"], ["Nuit", "Sharm El Sheikh"]] },
      { num: "J11", title: "Sharm El Sheikh – Casablanca",
        text: "Transfert à l'aéroport de Sharm El Sheikh et envol vers Casablanca via Le Caire. Fin de nos services.",
        meta: [["Repas", "petit-déjeuner"]] }
    ],
    inclus: [
      "Les billets d'avion Casablanca / Le Caire / Sharm El Sheikh / Casablanca",
      "3 nuits au Caire en hôtel 5★, logement et petit-déjeuner",
      "7 nuits à Sharm El Sheikh en resort 5★, tout compris (soft)",
      "Excursion d'une journée complète au Caire + 1 déjeuner",
      "Dîner-croisière sur le Nil avec spectacle",
      "Tous les transferts en autocar Deluxe climatisé et un guide professionnel"
    ],
    exclus: [
      "Les dépenses personnelles",
      "Les pourboires (20 $/adulte, 5 $/enfant)",
      "Le visa Égypte (600 DH)"
    ],
    hotels: ["Option A : Marriott Cairo City View 5★ + Aurora Oriental Resort Sharm El Sheikh 5★ (vue jardin)", "Option B : Marriott & Omar Khayyam Casino City View 5★ + Cleopatra Luxury Resort ou Mövenpick 5★"],
    priceTable: {
      head: ["Formule", "Triple", "Double", "Supplément single"],
      rows: [
        ["Option A", "17 700 DH", "17 900 DH", "+ 4 900 DH"],
        ["Option B", "19 600 DH", "19 800 DH", "+ 5 900 DH"]
      ]
    },
    children: "Option A : 2–5 ans 8 900 DH · 1ᵉʳ enfant 6–11 ans 12 000 DH · 2ᵉ enfant 4–11 ans 13 500 DH. Option B : 2–5 ans 8 900 DH · 1ᵉʳ enfant 6–11 ans 11 900 DH · 2ᵉ enfant 4–11 ans 14 900 DH",
    datesList: ["16→26 juil.", "23 juil.→2 août", "6→16 août", "10→20 août", "13→23 août", "20→30 août", "30 août→9 sept."],
    route: ["Casablanca", "Le Caire", "Sharm El Sheikh", "Le Caire", "Casablanca"],
    dates: {
      line: "Départs garantis au départ de Casablanca :",
      note: "Visa Égypte : 600 DH (dossier à remettre 15 jours avant le départ). Annulation : 30–15 j (50 %), 14–8 j (70 %), moins de 7 j (100 %). Paiement : 50 % à la confirmation, solde 30 j avant le départ."
    },
    cta: {
      title: "Envie de découvrir l'Égypte ?",
      text: "Nous composons chaque voyage sur mesure, selon vos dates et vos envies — comme nous le faisons depuis 2000."
    }
  },

  "usa-ouest-complet": {
    mediaKey: "modal-ouest-usa", whatsapp: "212614152686",
    eyebrow: "États-Unis · Circuit accompagné", title: "L'Ouest Complet — USA", duration: "13 jours", tag: "États-Unis",
    cadran: [["Destinations", "Ouest américain"], ["Durée", "13 jours / 12 nuits"], ["Vols", "Non inclus"], ["Pension", "Petit-déjeuner + 10 repas"], ["Guide", "Accompagnateur francophone"], ["Type", "Départs garantis"]],
    price: "21 250 DH",
    intro: [
      "Le grand Ouest américain comme dans les films. De Los Angeles aux gratte-ciel de San Francisco, en passant par les canyons rouges et les déserts de l'Arizona, ce circuit accompagné déroule les paysages les plus mythiques des États-Unis.",
      "Grand Canyon, Monument Valley, les néons de Las Vegas, la côte de Monterey : quinze jours de route, d'émerveillements et de grands espaces, guidés en français."
    ],
    highlights: ["Le Grand Canyon et Monument Valley", "Las Vegas et ses lumières", "San Francisco et la côte Pacifique", "Accompagnateur francophone tout au long du circuit", "12 nuits d'hôtel et 10 repas inclus"],
    programme: ["Los Angeles", "Grand Canyon", "Monument Valley", "Las Vegas", "San Francisco", "Monterey", "Los Angeles"],
    inclus: ["12 nuits d'hôtel avec petit-déjeuner", "10 repas mentionnés au programme", "Les entrées selon programme", "Un accompagnateur francophone", "Les transferts d'aéroports", "Autocar climatisé 38-56 places", "Les taxes et services"],
    exclus: ["Les vols internationaux", "Les repas non mentionnés", "Les dépenses personnelles et pourboires"],
    priceTable: { head: ["Triple", "Double", "Suppl. single", "Enfant -12 ans"], rows: [["21 250 DH", "22 400 DH", "7 650 DH", "18 900 DH"]] },
    datesList: ["25/03", "15/04", "27/05", "08/07", "29/07", "23/09", "20/10"],
    dates: { line: "Départs garantis (GIR) :", note: "" },
    cta: { title: "Envie de partir dans l'Ouest américain ?", text: "Nous composons chaque voyage sur mesure, selon vos dates et vos envies — comme nous le faisons depuis 2000." }
  },

  "canada-usa-joyaux": {
    mediaKey: "modal-joyaux-canada", whatsapp: "212614152686",
    eyebrow: "Canada & USA · Circuit accompagné", title: "Les joyaux du Canada et des USA", duration: "11 jours", tag: "Canada & USA",
    cadran: [["Destinations", "Est canadien et américain"], ["Durée", "11 jours / 10 nuits"], ["Vols", "Non inclus"], ["Pension", "Petit-déjeuner + 9 repas"], ["Guide", "Accompagnateur francophone"], ["Type", "Départs garantis"]],
    price: "20 550 DH",
    intro: [
      "L'Est du continent nord-américain, du Saint-Laurent à la côte atlantique. Montréal et Québec la française, Boston l'historique, New York l'électrique, Washington la monumentale.",
      "Et la nature en majesté : les chutes du Niagara, les Mille-Îles, le pays Amish. Un grand circuit accompagné en français, ponctué d'une croisière."
    ],
    highlights: ["Montréal, Québec et la côte atlantique", "New York et Washington", "Les chutes du Niagara", "Croisière des Mille-Îles", "Accompagnateur francophone et guides locaux"],
    programme: ["Montréal", "Québec", "Boston", "New York", "Washington", "Pays Amish", "Niagara", "Toronto", "Mille-Îles", "Ottawa", "Montréal"],
    inclus: ["10 nuits d'hôtel avec petit-déjeuner", "9 repas mentionnés au programme", "La croisière des Mille-Îles", "Un accompagnateur francophone et des guides locaux", "Les transferts d'aéroports", "Autocar climatisé"],
    exclus: ["Les vols internationaux", "Les repas non mentionnés", "Les dépenses personnelles et pourboires"],
    priceTable: { head: ["Triple", "Double", "Suppl. single", "Enfant -12 ans"], rows: [["20 550 DH", "21 800 DH", "8 200 DH", "17 600 DH"]] },
    datesList: ["12/05", "09/06", "30/06", "14/07", "04/08", "11/08", "02/09", "08/09", "15/09", "22/09", "29/09", "06/10"],
    dates: { line: "Départs garantis :", note: "" },
    cta: { title: "Envie de partir au Canada ?", text: "Nous composons chaque voyage sur mesure, selon vos dates et vos envies — comme nous le faisons depuis 2000." }
  },

  "usa-rocheuses": {
    mediaKey: "modal-rocheuses", whatsapp: "212614152686",
    eyebrow: "États-Unis · Grand circuit", title: "Les Rocheuses et l'Ouest classique — USA", duration: "17 jours", tag: "États-Unis",
    cadran: [["Destinations", "Ouest américain et Rocheuses"], ["Durée", "17 jours / 16 nuits"], ["Vols", "Non inclus"], ["Pension", "Petit-déjeuner + 15 repas"], ["Guide", "Accompagnateur francophone"], ["Type", "Départs garantis"]],
    price: "32 000 DH",
    intro: [
      "Le plus complet de nos circuits américains. Aux grands classiques de l'Ouest — Grand Canyon, Las Vegas, San Francisco — s'ajoutent les merveilles des Rocheuses : Bryce Canyon, et surtout Yellowstone et Grand Teton, royaumes des geysers et de la vie sauvage.",
      "Dix-sept jours pour traverser des paysages parmi les plus spectaculaires de la planète, accompagnés en français."
    ],
    highlights: ["Yellowstone et Grand Teton", "Bryce Canyon et Grand Canyon", "Monument Valley et Las Vegas", "San Francisco", "16 nuits et 15 repas inclus, accompagnateur francophone"],
    programme: ["Los Angeles", "Las Vegas", "Bryce Canyon", "Grand Canyon", "Monument Valley", "Yellowstone", "Grand Teton", "San Francisco", "Los Angeles"],
    inclus: ["16 nuits d'hôtel avec petit-déjeuner", "15 repas mentionnés au programme", "Les entrées selon programme", "Un accompagnateur francophone", "Autocar climatisé 38-56 places", "Les taxes et services"],
    exclus: ["Les vols internationaux", "Les repas non mentionnés", "Les dépenses personnelles et pourboires"],
    priceTable: { head: ["Triple", "Double", "Suppl. single", "Enfant -12 ans"], rows: [["32 000 DH", "34 000 DH", "13 600 DH", "27 300 DH"]] },
    datesList: ["20/05", "27/05", "03/06", "24/06", "05/08", "12/08", "02/09", "16/09"],
    dates: { line: "Départs garantis :", note: "" },
    cta: { title: "Envie de partir dans les Rocheuses ?", text: "Nous composons chaque voyage sur mesure, selon vos dates et vos envies — comme nous le faisons depuis 2000." }
  },

  "cuba-havane-varadero": {
    mediaKey: "modal-cuba", whatsapp: "212614152686",
    eyebrow: "Cuba · Circuit & plages", title: "Cuba — La Havane & Varadero", duration: "9 jours", tag: "Cuba",
    cadran: [["Destinations", "La Havane, Viñales, Trinidad, Varadero"], ["Durée", "9 jours / 8 nuits"], ["Vols", "Non inclus"], ["Pension", "Repas selon programme, boissons incluses"], ["Guide", "Local francophone"], ["Minimum", "4 personnes"]],
    price: "17 000 DH",
    intro: [
      "Cuba comme une chanson. La Havane et son Malecón, ses voitures américaines et ses façades colorées ; Viñales et ses plantations de tabac ; Trinidad la coloniale, figée dans le temps.",
      "Et pour finir, les plages de sable blanc de Varadero, en formule tout compris. Un voyage entre culture, mojitos et farniente, guidé en français."
    ],
    highlights: ["La Havane, le Malecón et la vieille ville", "La vallée de Viñales et le tabac", "Trinidad, joyau colonial", "Les plages de Varadero en all-inclusive", "Visites avec guide local francophone, boissons incluses"],
    programme: ["La Havane (vieille ville, Malecón, musées)", "Viñales (vallée du tabac)", "Trinidad (architecture coloniale)", "Varadero (plages all-inclusive)"],
    inclus: ["Les hébergements proposés ou similaires", "Les repas selon programme et les boissons incluses", "Toutes les visites avec guide local francophone", "La carte de tourisme (visa) obligatoire", "L'assistance de nos représentants sur place"],
    exclus: ["Les vols internationaux", "L'assurance assistance-rapatriement (obligatoire)", "Les pourboires et le port des bagages"],
    priceTable: { head: ["Double", "Suppl. single"], rows: [["17 000 DH", "3 400 DH"]] },
    datesList: ["09/05", "21/06", "11/10"],
    dates: { line: "Dates de départ (à partir de 4 personnes) :", note: "" },
    cta: { title: "Envie de partir à Cuba ?", text: "Nous composons chaque voyage sur mesure, selon vos dates et vos envies — comme nous le faisons depuis 2000." }
  },

  "perou-merveilles-incas": {
    mediaKey: "modal-perou", whatsapp: "212614152686",
    eyebrow: "Pérou · Circuit accompagné", title: "Pérou — Les merveilles Incas", duration: "11 jours", tag: "Pérou",
    cadran: [["Destinations", "Lima, Arequipa, Titicaca, Cusco, Machu Picchu"], ["Durée", "11 jours / 9 nuits"], ["Vols", "Non inclus"], ["Pension", "Pension complète (J2 au J10)"], ["Guide", "Guides locaux francophones"], ["Train", "Machu Picchu (classe Expedition)"]],
    price: "18 700 DH",
    intro: [
      "Le Pérou des Incas, du Pacifique aux sommets des Andes. Lima la coloniale, Arequipa la blanche, le lac Titicaca et ses îles de roseaux, Cusco l'impériale.",
      "Et bien sûr le Machu Picchu, cité perdue suspendue dans les nuages, que l'on rejoint en train à travers la Vallée sacrée. Un grand voyage en pension complète, guidé en français."
    ],
    highlights: ["Le Machu Picchu, merveille du monde", "Le lac Titicaca, îles Uros et Llachón", "Cusco et la Vallée sacrée", "Arequipa et le canyon de Colca", "Train vers le Machu Picchu, pension complète"],
    programme: ["Lima", "Arequipa", "Puno", "Lac Titicaca (Uros et Llachón)", "Cusco", "Machu Picchu", "Lima"],
    inclus: ["Les transferts et excursions selon programme", "Les entrées dans les sites et musées visités", "Le logement en chambre double (hôtels 3★/3★ sup.)", "La pension complète (du petit-déjeuner J2 au petit-déjeuner J10)", "Le train Ollanta / Machu Picchu / Ollanta en classe Expedition", "Des guides locaux francophones", "L'assistance de nos agences locales"],
    exclus: ["Les vols internationaux", "Les dépenses personnelles et pourboires"],
    priceTable: { head: ["Triple", "Double", "Suppl. single"], rows: [["18 700 DH", "19 500 DH", "4 700 DH"]] },
    datesList: ["12 juin", "27 sept.", "04 oct.", "19 nov."],
    dates: { line: "Dates de départ 2026 :", note: "" },
    cta: { title: "Envie de partir au Pérou ?", text: "Nous composons chaque voyage sur mesure, selon vos dates et vos envies — comme nous le faisons depuis 2000." }
  },

  "europe-las-palmas": {
    mediaKey: "modal-europe-1", whatsapp: "212614152686",
    eyebrow: "Canaries · Séjour balnéaire", title: "Séjour à Las Palmas", duration: "8 jours", tag: "Espagne",
    cadran: [["Destination", "Las Palmas de Gran Canaria"], ["Durée", "8 jours / 7 nuits"], ["Vols", "Inclus — Ryanair"], ["Hôtel", "3★"], ["Plage", "Las Canteras"]],
    price: "6 900 DH",
    intro: [
      "Le soleil toute l'année, à quelques heures de vol. Las Palmas de Gran Canaria et sa plage de Las Canteras, l'une des plus belles d'Europe, posée au cœur de la ville.",
      "Une semaine de douceur atlantique, entre baignades, promenades sur le front de mer et tapas au soleil."
    ],
    highlights: ["La plage urbaine de Las Canteras", "Le climat doux des Canaries toute l'année", "Vols et transferts inclus", "Une semaine en hôtel 3★"],
    programme: ["Las Palmas de Gran Canaria", "Plage de Las Canteras"],
    inclus: ["Le vol aller-retour (Ryanair)", "Les transferts", "L'hôtel 3★", "L'assistance de Voyages 21"],
    exclus: [],
    priceTable: { head: ["Chambre", "Prix / pers."], rows: [["Triple (3★)", "6 900 DH"], ["Double", "7 500 DH"], ["Single", "11 800 DH"]] },
    datesList: ["22 mai", "11 juin", "09 juil.", "29 août"],
    dates: { line: "Départs été 2026 :", note: "" },
    cta: { title: "Envie de soleil aux Canaries ?", text: "Nous composons chaque voyage sur mesure, selon vos dates et vos envies — comme nous le faisons depuis 2000." }
  },

  "europe-vienne-budapest-prague": {
    mediaKey: "modal-europe-2", whatsapp: "212614152686",
    eyebrow: "Europe centrale · Circuit", title: "Capitales impériales — Vienne, Budapest, Prague", duration: "6 jours", tag: "Europe",
    cadran: [["Destinations", "Vienne, Budapest, Prague"], ["Durée", "6 jours / 5 nuits"], ["Vols", "Inclus"], ["Transport", "Bus avec guide"], ["Inclus", "Croisière sur le Danube"]],
    price: "13 600 DH",
    intro: [
      "Trois capitales, trois joyaux de l'Europe impériale. Vienne et ses palais, Budapest et son Danube, Prague et ses toits d'or.",
      "Un circuit élégant entre Mitteleuropa et romantisme, ponctué d'une croisière sur le Danube et de la visite du château de Prague."
    ],
    highlights: ["Vienne, Budapest et Prague en un voyage", "Croisière sur le Danube", "Visite du château de Prague", "Bus avec guide, vols inclus"],
    programme: ["Vienne (2 nuits)", "Budapest (2 nuits)", "Prague (1 nuit)"],
    inclus: ["Le vol aller-retour", "Le bus avec guide", "La croisière sur le Danube", "La visite du château de Prague"],
    exclus: [],
    priceTable: { head: ["Forfait", "Prix / pers."], rows: [["À partir de", "13 600 DH"]] },
    datesList: ["13-18 mai", "17-22 juin", "08-13 juil."],
    dates: { line: "Départs (et plus selon calendrier) :", note: "" },
    cta: { title: "Envie des capitales impériales ?", text: "Nous composons chaque voyage sur mesure, selon vos dates et vos envies — comme nous le faisons depuis 2000." }
  },

  "europe-andalousie": {
    mediaKey: "modal-europe-3", whatsapp: "212614152686",
    eyebrow: "Espagne · Circuit", title: "Al-Andalus — Madrid, Grenade, Séville", duration: "7 jours", tag: "Espagne",
    cadran: [["Destinations", "Madrid, Grenade, Séville"], ["Durée", "7 jours / 6 nuits"], ["Vols", "Inclus"], ["Inclus", "Alhambra · bateau Guadalquivir"], ["Repas", "Repas inclus"]],
    price: "14 900 DH",
    intro: [
      "L'Andalousie, là où l'Orient a laissé ses plus belles traces en Europe. Madrid pour commencer, puis Grenade et l'Alhambra, palais de dentelle de pierre, et Séville la flamboyante.",
      "Un voyage parfumé d'oranger et de jasmin, entre patios, fontaines et soirées andalouses."
    ],
    highlights: ["L'Alhambra de Grenade", "Madrid et Séville", "Croisière sur le Guadalquivir", "Vols et repas inclus"],
    programme: ["Madrid (2 nuits)", "Grenade (2 nuits)", "Séville (2 nuits)"],
    inclus: ["Le vol aller-retour", "La visite de l'Alhambra", "La croisière sur le Guadalquivir", "Les repas inclus", "Le bus avec guide"],
    exclus: [],
    priceTable: { head: ["Forfait", "Prix / pers."], rows: [["À partir de", "14 900 DH"]] },
    datesList: ["20-26 mai", "17-23 juin", "15-21 juil."],
    dates: { line: "Départs (et plus selon calendrier) :", note: "" },
    cta: { title: "Envie de l'Andalousie ?", text: "Nous composons chaque voyage sur mesure, selon vos dates et vos envies — comme nous le faisons depuis 2000." }
  },

  "europe-grece-iles": {
    mediaKey: "modal-europe-4", whatsapp: "212614152686",
    eyebrow: "Grèce · Îles", title: "Athènes, Rhodes & Kos", duration: "8 jours", tag: "Grèce",
    cadran: [["Destinations", "Athènes, Rhodes, Kos"], ["Durée", "8 jours / 7 nuits"], ["Vols", "Inclus"], ["Inclus", "Acropole · ferry Rhodes-Kos"], ["Hôtel", "à partir de 3★"]],
    price: "14 900 DH",
    intro: [
      "La Grèce des dieux et des îles. Athènes et l'Acropole d'abord, berceau de notre civilisation. Puis le cap sur le Dodécanèse : Rhodes la médiévale et Kos la tranquille.",
      "Entre sites antiques, ruelles blanches et eaux turquoise, une semaine au rythme de la mer Égée."
    ],
    highlights: ["L'Acropole d'Athènes", "Rhodes et sa vieille ville médiévale", "L'île de Kos", "Vols, ferry et transferts inclus"],
    programme: ["Athènes (2 nuits)", "Rhodes (3 nuits)", "Kos (2 nuits)"],
    inclus: ["Le vol aller-retour", "La visite de l'Acropole", "Le ferry Rhodes-Kos", "Les transferts"],
    exclus: [],
    priceTable: { head: ["Chambre", "Prix / pers."], rows: [["Triple (3★)", "14 900 DH"]] },
    datesList: ["21-28 mai", "18-25 juin", "02-09 juil."],
    dates: { line: "Départs (et plus selon calendrier) :", note: "" },
    cta: { title: "Envie des îles grecques ?", text: "Nous composons chaque voyage sur mesure, selon vos dates et vos envies — comme nous le faisons depuis 2000." }
  },

  "europe-grece-classique": {
    mediaKey: "modal-europe-5", whatsapp: "212614152686",
    eyebrow: "Grèce · Circuit", title: "Athènes — Grèce classique", duration: "7 jours", tag: "Grèce",
    cadran: [["Destinations", "Athènes, Olympie, Delphes, Météores"], ["Durée", "7 jours / 6 nuits"], ["Vols", "Inclus"], ["Transport", "Bus avec guide"], ["Hôtel", "à partir de 3★"]],
    price: "16 700 DH",
    intro: [
      "Un voyage au cœur de la Grèce antique. D'Athènes à Olympie, berceau des Jeux, de l'oracle de Delphes aux monastères perchés des Météores.",
      "Sept jours sur les traces des dieux et des philosophes, à travers des paysages où l'histoire affleure à chaque pas."
    ],
    highlights: ["Athènes et l'Acropole", "Olympie et Delphes", "Les Météores et leurs monastères", "Bus avec guide, vols inclus"],
    programme: ["Athènes", "Olympie", "Delphes", "Kalambaka", "Météores"],
    inclus: ["Le vol aller-retour", "Le bus avec guide", "Les sites archéologiques au programme"],
    exclus: [],
    priceTable: { head: ["Chambre", "Prix / pers."], rows: [["Triple (3★)", "16 700 DH"]] },
    datesList: ["10-16 juin", "01-07 juil.", "26 août-01 sept."],
    dates: { line: "Départs (et plus selon calendrier) :", note: "" },
    cta: { title: "Envie de la Grèce classique ?", text: "Nous composons chaque voyage sur mesure, selon vos dates et vos envies — comme nous le faisons depuis 2000." }
  },

  "europe-espagne-portugal": {
    mediaKey: "modal-europe-6", whatsapp: "212614152686",
    eyebrow: "Espagne & Portugal · Circuit", title: "Circuit Espagne & Portugal", duration: "10 jours", tag: "Espagne & Portugal",
    cadran: [["Destinations", "Barcelone, Valence, Grenade, Séville, Lisbonne"], ["Durée", "10 jours / 9 nuits"], ["Vols", "Inclus"], ["Inclus", "Alhambra · Sagrada Família"], ["Transport", "Bus avec guide"]],
    price: "19 500 DH",
    intro: [
      "Toute la péninsule ibérique en un grand circuit. De Barcelone et la Sagrada Família à Lisbonne et ses tramways, en passant par Valence, Grenade et Séville.",
      "Dix jours de Méditerranée et d'Atlantique, de tapas et de pastéis, entre Espagne flamboyante et douceur portugaise."
    ],
    highlights: ["La Sagrada Família de Barcelone", "L'Alhambra de Grenade", "Séville et Lisbonne", "Bus avec guide, vols inclus"],
    programme: ["Barcelone", "Valence", "Grenade", "Séville", "Lisbonne"],
    inclus: ["Le vol aller-retour", "Le bus avec guide", "La visite de l'Alhambra", "La visite de la Sagrada Família"],
    exclus: [],
    priceTable: { head: ["Forfait", "Prix / pers."], rows: [["À partir de", "19 500 DH"]] },
    datesList: ["15-24 juil.", "05-14 août", "09-18 sept."],
    dates: { line: "Départs (et plus selon calendrier) :", note: "" },
    cta: { title: "Envie de l'Espagne et du Portugal ?", text: "Nous composons chaque voyage sur mesure, selon vos dates et vos envies — comme nous le faisons depuis 2000." }
  },

  "europe-italie": {
    mediaKey: "modal-europe-7", whatsapp: "212614152686",
    eyebrow: "Italie · Circuit", title: "Circuit Italie", duration: "8 jours", tag: "Italie",
    cadran: [["Destinations", "Milan, Vérone, Venise, Pérouse, Rome"], ["Durée", "8 jours / 7 nuits"], ["Vols", "Inclus"], ["Inclus", "Venise · Pompéi"], ["Transport", "Bus avec guide"]],
    price: "21 500 DH",
    intro: [
      "L'Italie du nord au sud, comme un musée à ciel ouvert. Milan l'élégante, Vérone et ses amours, Venise et ses canaux, puis Rome la Ville éternelle.",
      "Huit jours de dolce vita, d'art et de gastronomie, jusqu'aux vestiges de Pompéi figés par le Vésuve."
    ],
    highlights: ["Venise et ses canaux", "Rome, la Ville éternelle", "Les vestiges de Pompéi", "Vérone et Milan", "Bus avec guide, vols inclus"],
    programme: ["Milan", "Vérone", "Venise", "Pérouse", "Rome"],
    inclus: ["Le vol au départ de Casablanca", "Le bus avec guide", "La visite de Venise", "La visite de Pompéi", "Les transferts"],
    exclus: [],
    priceTable: { head: ["Forfait", "Prix / pers."], rows: [["À partir de", "21 500 DH"]] },
    datesList: ["06-13 mai", "27 mai-03 juin", "10-17 juin"],
    dates: { line: "Départs (et plus selon calendrier) :", note: "" },
    cta: { title: "Envie de l'Italie ?", text: "Nous composons chaque voyage sur mesure, selon vos dates et vos envies — comme nous le faisons depuis 2000." }
  },

  "europe-france-suisse": {
    mediaKey: "modal-europe-8", whatsapp: "212614152686",
    eyebrow: "France & Suisse · Circuit", title: "France & Suisse", duration: "8 jours", tag: "France & Suisse",
    cadran: [["Destinations", "Paris, Lyon, Zurich"], ["Durée", "8 jours / 7 nuits"], ["Vols", "Inclus"], ["Inclus", "Tour Eiffel · Alpes"], ["Transport", "Bus avec guide"]],
    price: "22 400 DH",
    intro: [
      "De la Ville Lumière aux cimes des Alpes. Paris et sa Tour Eiffel, Lyon la gourmande, puis Zurich et les paysages suisses qui semblent peints à la main.",
      "Huit jours entre élégance française et grandeur alpine, au fil d'une excursion au cœur des montagnes."
    ],
    highlights: ["Paris et la Tour Eiffel", "Lyon, capitale de la gastronomie", "Excursion dans les Alpes suisses", "Bus avec guide, vols inclus"],
    programme: ["Paris", "Lyon", "Zurich"],
    inclus: ["Le vol aller-retour", "Le bus avec guide", "La Tour Eiffel", "L'excursion dans les Alpes"],
    exclus: [],
    priceTable: { head: ["Forfait", "Prix / pers."], rows: [["À partir de", "22 400 DH"]] },
    datesList: ["08-15 juil.", "05-12 août", "02-09 sept."],
    dates: { line: "Départs (et plus selon calendrier) :", note: "" },
    cta: { title: "Envie de la France et de la Suisse ?", text: "Nous composons chaque voyage sur mesure, selon vos dates et vos envies — comme nous le faisons depuis 2000." }
  },

  "europe-angleterre-ecosse": {
    mediaKey: "modal-europe-9", whatsapp: "212614152686",
    eyebrow: "Royaume-Uni · Circuit", title: "Angleterre & Écosse", duration: "10 jours", tag: "Royaume-Uni",
    cadran: [["Destinations", "Londres, Newcastle, Édimbourg"], ["Durée", "10 jours / 9 nuits"], ["Vols", "Inclus"], ["Inclus", "Tour de Londres · Écosse"], ["Transport", "Bus avec guide"]],
    price: "27 000 DH",
    intro: [
      "De Londres aux Highlands. La capitale britannique et ses monuments d'abord, puis la route vers le nord, jusqu'à Édimbourg la majestueuse et les paysages d'Écosse.",
      "Dix jours entre tradition anglaise et grands espaces écossais, châteaux, lochs et villes de caractère."
    ],
    highlights: ["Londres et ses monuments", "Édimbourg et son château", "Les paysages d'Écosse", "Bus avec guide, vols inclus"],
    programme: ["Londres", "Newcastle", "Édimbourg"],
    inclus: ["Le vol aller-retour", "Le bus avec guide", "Le tour de Londres", "La visite de l'Écosse"],
    exclus: [],
    priceTable: { head: ["Forfait", "Prix / pers."], rows: [["À partir de", "27 000 DH"]] },
    datesList: ["10-19 juil.", "07-16 août", "04-13 sept."],
    dates: { line: "Départs (et plus selon calendrier) :", note: "" },
    cta: { title: "Envie de l'Angleterre et de l'Écosse ?", text: "Nous composons chaque voyage sur mesure, selon vos dates et vos envies — comme nous le faisons depuis 2000." }
  },

  "europe-albanie-riviera": {
    mediaKey: "modal-albanie-riviera", whatsapp: "212614152686",
    eyebrow: "Europe · Albanie 2026",
    title: "Albanie — Mer & Galets, Côte Ionienne",
    duration: "8 jours",
    tag: "Europe",
    cadran: [
      ["Départ", "Casablanca"],
      ["Destination", "Albanie"],
      ["Durée", "8 jours / 7 nuits"],
      ["Vols", "Inclus — via Istanbul"],
      ["Pension", "Petits-déjeuners"],
      ["Période", "Juin · Juillet · Août 2026"],
      ["Circuit", "Tirana · Vlora · Dhërmi · Himara · Saranda"]
    ],
    price: "13 500 DH",
    intro: [
      "L'Albanie offre une Europe encore confidentielle, entre mer Ionienne, villages de pierre, montagnes et plages aux eaux cristallines.",
      "Ce circuit de huit jours relie Tirana, Durrës, Vlora, Dhërmi, Himara, Saranda, Butrint, Porto Palermo et Apollonia.",
      "Un voyage équilibré entre culture, route côtière, sites antiques, plages et atmosphère méditerranéenne."
    ],
    highlights: [
      "Tirana, capitale albanaise, selon horaires d'arrivée",
      "Durrës et son amphithéâtre, l'un des plus grands des Balkans",
      "Vlora, point de départ de la Riviera albanaise",
      "Dhërmi, Himara, Jale et les plages de la côte Ionienne",
      "Butrint, site archéologique classé UNESCO",
      "Porto Palermo, Llogara et Apollonia"
    ],
    days: [
      { num: "J1", title: "Aéroport — Tirana", text: "Arrivée à l'aéroport Mère Teresa de Tirana, transfert et visite de Tirana selon horaire d'arrivée.", meta: [["Nuit", "Tirana"]] },
      { num: "J2", title: "Tirana — Durrës — Vlora", text: "Route vers Durrës, découverte de son amphithéâtre et de son front de mer, puis continuation vers Vlora, ville historique et station balnéaire.", meta: [["Repas", "petit-déjeuner"], ["Nuit", "Vlora"]] },
      { num: "J3", title: "Vlora — Dhërmi", text: "Départ vers Dhërmi, entre vieux village, maisons en pierre, monastère et plages aux eaux cristallines.", meta: [["Repas", "petit-déjeuner"], ["Nuit", "côte Ionienne"]] },
      { num: "J4", title: "Dhërmi — Vuno — Jale — Himara", text: "Journée libre pour découvrir Drymades, Vuno, Jale, Livadh et Himara, entre plages, panoramas et ruelles de pierre.", meta: [["Repas", "petit-déjeuner"], ["Nuit", "côte Ionienne"]] },
      { num: "J5", title: "Himara — Saranda — Butrint", text: "Route vers Saranda puis visite possible du parc national de Butrint, site archéologique classé UNESCO, lac et château d'Ali Pasha.", meta: [["Repas", "petit-déjeuner"], ["Nuit", "Saranda"]] },
      { num: "J6", title: "Saranda — Qeparo — Porto Palermo — Dhërmi", text: "Remontée vers le nord avec arrêt à Qeparo puis visite de la forteresse vénitienne de Porto Palermo ou pause plage.", meta: [["Repas", "petit-déjeuner"], ["Nuit", "côte Ionienne"]] },
      { num: "J7", title: "Dhërmi — Llogara — Apollonia — Tirana", text: "Dernière baignade, passage par le parc national de Llogara, arrêt à Apollonia puis retour vers Tirana.", meta: [["Repas", "petit-déjeuner"], ["Nuit", "Tirana"]] },
      { num: "J8", title: "Tirana — retour", text: "Petit-déjeuner, visite libre selon horaires de vol puis transfert à l'aéroport de Tirana.", meta: [["Repas", "petit-déjeuner"]] }
    ],
    inclus: [
      "Billet d'avion aller-retour Casablanca — Istanbul — Tirana",
      "Transferts arrivée et départ à Tirana",
      "Transferts durant tout le circuit en transport touristique privé",
      "Hébergement en hôtels avec petits-déjeuners du J2 au J8",
      "Assistance Voyages 21 durant tout le circuit",
      "Activités et entrées dans les monuments mentionnées dans le programme"
    ],
    exclus: [
      "Repas non mentionnés",
      "Activités et entrées non mentionnées dans le programme",
      "Dépenses personnelles"
    ],
    hotels: ["Hôtels selon programme ou similaires"],
    priceTable: { head: ["Forfait", "Prix / pers."], rows: [["Chambre double", "13 500 DH"], ["Chambre single", "16 900 DH"]] },
    children: "Enfant 0 à 2 ans : 5 500 DH · Enfant selon programme : 10 900 DH",
    route: ["Casablanca", "Istanbul", "Tirana", "Durrës", "Vlora", "Dhërmi", "Himara", "Saranda", "Butrint", "Tirana"],
    datesList: ["14 au 21 juin 2026", "12 au 19 juillet 2026", "20 au 27 août 2026"],
    dates: { line: "Départs : 14/06, 12/07 et 20/08/2026.", note: "Tarifs et disponibilités sous réserve de confirmation." },
    cta: { title: "Envie de découvrir la Riviera albanaise ?", text: "Nous préparons votre circuit entre mer Ionienne, villages et sites antiques." }
  },

  "croisiere-mediterranee-espagne-italie": {
    mediaKey: "modal-croisiere-1", whatsapp: "212614152686",
    eyebrow: "Croisière · Méditerranée", title: "Croisière Méditerranée — Espagne & Italie", duration: "10 jours", tag: "Croisière",
    cadran: [["Bateau", "Harmony of the Seas (Royal Caribbean)"], ["Durée", "10 jours / 9 nuits"], ["Vols", "Inclus — Ryanair"], ["Formule", "2 nuits hôtel + 7 nuits croisière"], ["Cabine", "Double"]],
    price: "19 800 DH",
    intro: [
      "La Méditerranée vue de la mer, à bord de l'un des plus grands paquebots du monde. De Barcelone aux côtes italiennes, le Harmony of the Seas vous emmène de port en port sans jamais défaire vos valises.",
      "Palma, La Spezia, Rome, Naples : chaque matin une nouvelle escale, chaque soir le confort d'un palace flottant."
    ],
    highlights: ["Le Harmony of the Seas (Royal Caribbean)", "Escales à Rome, Naples et Palma", "7 nuits de croisière + 2 nuits d'hôtel", "Vols et transferts inclus"],
    programme: ["Barcelone", "Palma", "La Spezia", "Rome", "Naples", "Barcelone"],
    inclus: ["Le vol aller-retour (Ryanair)", "2 nuits en hôtel 3★", "7 nuits de croisière", "Les transferts"],
    exclus: [],
    priceTable: { head: ["Cabine", "Prix / pers."], rows: [["Double", "19 800 DH"]] },
    dates: { line: "Départs à partir de juin 2026.", note: "" },
    cta: { title: "Envie d'une croisière en Méditerranée ?", text: "Nous composons chaque voyage sur mesure, selon vos dates et vos envies — comme nous le faisons depuis 2000." }
  },

  "croisiere-mediterranee-premium": {
    mediaKey: "modal-croisiere-2", whatsapp: "212614152686",
    eyebrow: "Croisière · Méditerranée", title: "Croisière Méditerranée Premium", duration: "10 jours", tag: "Croisière",
    cadran: [["Bateau", "Royal Caribbean International"], ["Durée", "10 jours / 9 nuits"], ["Vols", "Inclus"], ["Formule", "2 nuits hôtel + 7 nuits croisière"], ["Cabine", "Double"]],
    price: "21 800 DH",
    intro: [
      "Une croisière premium au fil de la Méditerranée occidentale. De Marseille à Barcelone, en passant par Gênes, Naples, Messine et Palma : les plus beaux ports d'Italie, de France et d'Espagne.",
      "Sept nuits à bord d'un navire Royal Caribbean, dans un confort raffiné, escales comprises."
    ],
    highlights: ["Marseille, Gênes, Naples, Messine, Palma, Barcelone", "Navire Royal Caribbean", "7 nuits de croisière + 2 nuits d'hôtel", "Vols et transferts inclus"],
    programme: ["Marseille", "Gênes", "Naples", "Messine", "Palma", "Barcelone"],
    inclus: ["Le vol aller-retour", "2 nuits en hôtel 3★", "7 nuits de croisière", "Les transferts"],
    exclus: [],
    priceTable: { head: ["Cabine", "Prix / pers."], rows: [["Double", "21 800 DH"]] },
    dates: { line: "Départs à partir de juin 2026.", note: "" },
    cta: { title: "Envie d'une croisière premium ?", text: "Nous composons chaque voyage sur mesure, selon vos dates et vos envies — comme nous le faisons depuis 2000." }
  },

  "croisiere-turquie-grece": {
    mediaKey: "modal-croisiere-turquie-grece", whatsapp: "212614152686",
    eyebrow: "Croisière · Méditerranée 2026",
    title: "Croisière Turquie & Grèce",
    duration: "8 jours",
    tag: "Croisières",
    cadran: [
      ["Départ", "Port Istanbul"],
      ["Itinéraire", "Istanbul · Bodrum · Rhodes · Mykonos · Athènes"],
      ["Durée", "8 jours / 7 nuits"],
      ["Bateau", "Aroya"],
      ["Compagnie", "Aroya Cruises"],
      ["Pension", "Pension complète avec boissons soft"],
      ["Vols", "Non inclus"]
    ],
    price: "13 900 DH",
    intro: [
      "Une croisière méditerranéenne au départ d'Istanbul, entre Turquie et îles grecques.",
      "À bord du bateau Aroya, vous profitez de sept nuits en cabine intérieure double, en pension complète avec boissons soft.",
      "L'itinéraire relie Istanbul, Bodrum, Rhodes, Mykonos, Athènes Le Pirée et des journées en mer."
    ],
    highlights: [
      "Croisière 7 nuits / 8 jours à bord du bateau Aroya",
      "Itinéraire : Istanbul, en mer, Bodrum, Rhodes, Mykonos, Athènes Le Pirée, en mer, Istanbul",
      "Pension complète avec boissons soft en cabine intérieure",
      "Transferts aéroport — port Istanbul — aéroport inclus",
      "Assistance Voyages 21"
    ],
    days: [
      { num: "J1", title: "Embarquement à Istanbul", text: "Transfert vers le port d'Istanbul et embarquement à bord du bateau Aroya.", meta: [["Nuit", "à bord"]] },
      { num: "J2", title: "En mer", text: "Journée de navigation pour profiter des services du bateau et de la pension complète.", meta: [["Repas", "pension complète"]] },
      { num: "J3", title: "Bodrum", text: "Escale à Bodrum, port turc animé aux eaux claires et à l'ambiance méditerranéenne.", meta: [["Nuit", "à bord"]] },
      { num: "J4", title: "Rhodes", text: "Escale à Rhodes, île grecque connue pour sa vieille ville et son patrimoine méditerranéen.", meta: [["Nuit", "à bord"]] },
      { num: "J5", title: "Mykonos", text: "Escale à Mykonos, entre ruelles blanches, mer Égée et atmosphère des Cyclades.", meta: [["Nuit", "à bord"]] },
      { num: "J6", title: "Athènes Le Pirée", text: "Escale au Pirée, porte d'entrée d'Athènes et de ses sites antiques.", meta: [["Nuit", "à bord"]] },
      { num: "J7", title: "En mer", text: "Journée de navigation retour vers Istanbul.", meta: [["Repas", "pension complète"]] },
      { num: "J8", title: "Débarquement à Istanbul", text: "Débarquement au port d'Istanbul puis transfert vers l'aéroport selon programme.", meta: [["Fin", "services"]] }
    ],
    inclus: [
      "Transferts aéroport — port Istanbul — aéroport",
      "Séjour 7 nuits / 8 jours en croisière en pension complète avec boissons soft",
      "Cabine intérieure double",
      "Assistance Voyages 21"
    ],
    exclus: [
      "Billet d'avion",
      "Excursions non mentionnées au programme",
      "Extras et dépenses personnelles"
    ],
    hotels: ["Bateau Aroya — cabine intérieure double"],
    priceTable: { head: ["Cabine", "Prix / pers."], rows: [["Cabine intérieure double", "13 900 DH"]] },
    route: ["Istanbul", "En mer", "Bodrum", "Rhodes", "Mykonos", "Athènes Le Pirée", "En mer", "Istanbul"],
    datesList: ["20/06 au 27/06/2026", "04/07 au 11/07/2026"],
    dates: { line: "Départs 2026 : 20/06 et 04/07.", note: "Tarifs et disponibilités sous réserve de confirmation." },
    cta: { title: "Envie de cette croisière Turquie Grèce ?", text: "Nous préparons votre cabine, vos transferts et l'assistance Voyages 21." }
  },

  "croisiere-turquie-egypte": {
    mediaKey: "modal-croisiere-turquie-egypte", whatsapp: "212614152686",
    eyebrow: "Croisière · Méditerranée 2026",
    title: "Croisière Turquie & Égypte",
    duration: "8 jours",
    tag: "Croisières",
    cadran: [
      ["Départ", "Port Istanbul"],
      ["Itinéraire", "Istanbul · Bodrum · Kas · Alexandrie"],
      ["Durée", "8 jours / 7 nuits"],
      ["Bateau", "Aroya"],
      ["Compagnie", "Aroya Cruises"],
      ["Pension", "Pension complète avec boissons soft"],
      ["Vols", "Non inclus"]
    ],
    price: "15 500 DH",
    intro: [
      "Une croisière méditerranéenne au départ d'Istanbul, entre rivages turcs et escale égyptienne à Alexandrie.",
      "À bord du bateau Aroya, vous profitez de sept nuits en cabine intérieure double, en pension complète avec boissons soft.",
      "L'itinéraire passe par Istanbul, Bodrum, Kas, Alexandrie et des journées en mer pour vivre la Méditerranée autrement."
    ],
    highlights: [
      "Croisière 7 nuits / 8 jours à bord du bateau Aroya",
      "Itinéraire : Istanbul, en mer, Bodrum, Kas, Alexandrie, en mer, Istanbul",
      "Pension complète avec boissons soft en cabine intérieure",
      "Transferts aéroport — port Istanbul — aéroport inclus",
      "Assistance Voyages 21"
    ],
    days: [
      { num: "J1", title: "Embarquement à Istanbul", text: "Accueil et transfert vers le port d'Istanbul pour l'embarquement à bord du bateau Aroya.", meta: [["Nuit", "à bord"]] },
      { num: "J2", title: "En mer", text: "Journée en mer pour profiter du bateau, des services à bord et de la pension complète.", meta: [["Repas", "pension complète"]] },
      { num: "J3", title: "Bodrum", text: "Escale à Bodrum, station balnéaire turque réputée pour son port, ses plages et son ambiance méditerranéenne.", meta: [["Nuit", "à bord"]] },
      { num: "J4", title: "Kas", text: "Escale à Kas, entre eaux turquoise, charme côtier et paysages du sud de la Turquie.", meta: [["Nuit", "à bord"]] },
      { num: "J5", title: "Alexandrie", text: "Escale à Alexandrie, grande ville méditerranéenne d'Égypte au patrimoine historique remarquable.", meta: [["Nuit", "à bord"]] },
      { num: "J6-J7", title: "En mer", text: "Journées de navigation vers Istanbul, avec pension complète et temps libre à bord.", meta: [["Repas", "pension complète"]] },
      { num: "J8", title: "Débarquement à Istanbul", text: "Débarquement au port d'Istanbul puis transfert vers l'aéroport selon programme.", meta: [["Fin", "services"]] }
    ],
    inclus: [
      "Transferts aéroport — port Istanbul — aéroport",
      "Séjour 7 nuits / 8 jours en croisière en pension complète avec boissons soft",
      "Cabine intérieure double",
      "Assistance Voyages 21"
    ],
    exclus: [
      "Billet d'avion",
      "Excursions non mentionnées au programme",
      "Extras et dépenses personnelles"
    ],
    hotels: ["Bateau Aroya — cabine intérieure double"],
    priceTable: { head: ["Cabine", "Prix / pers."], rows: [["Cabine intérieure double", "15 500 DH"]] },
    route: ["Istanbul", "En mer", "Bodrum", "Kas", "Alexandrie", "En mer", "Istanbul"],
    datesList: ["03/07 au 10/07/2026", "17/07 au 24/07/2026", "31/07 au 07/08/2026", "14/08 au 22/08/2026", "28/08 au 04/09/2026"],
    dates: { line: "Départs 2026 : 03/07, 17/07, 31/07, 14/08 et 28/08.", note: "Tarifs et disponibilités sous réserve de confirmation." },
    cta: { title: "Envie de cette croisière Turquie Égypte ?", text: "Nous préparons votre cabine, vos transferts et l'assistance Voyages 21." }
  },

  "asie-ouzbekistan": {
    mediaKey: "modal-ouzbekistan", whatsapp: "212614152686",
    eyebrow: "Asie · Ouzbékistan 2026",
    title: "Ouzbékistan — Route de la Soie",
    duration: "10 jours",
    tag: "Asie",
    cadran: [
      ["Départ", "Selon vols"],
      ["Destination", "Ouzbékistan"],
      ["Durée", "10 jours / 9 nuits"],
      ["Vols", "Non inclus"],
      ["Pension", "Pension complète selon programme"],
      ["Circuit", "Tachkent · Samarkand · Boukhara · Khiva"],
      ["Guide", "Francophone"]
    ],
    price: "15 700 DH",
    intro: [
      "Un circuit au cœur de la Route de la Soie, entre cités bleues, déserts, médersas et artisanat traditionnel.",
      "De Tachkent à Samarkand, puis vers le désert du Kyzylkoum, Boukhara et Khiva, ce voyage traverse les grands joyaux culturels de l'Ouzbékistan.",
      "Le programme combine train rapide Afrosiyob, transport privé climatisé, guide francophone et visites des sites majeurs."
    ],
    highlights: [
      "Tachkent : Khast Imam, bazar Chorsu, métro décoré et places centrales",
      "Samarkand : Régistan, Bibi-Khanoum, Siab, Gour-Emir et Chakh-i-Zinda",
      "Nuit en camp de yourtes dans le désert du Kyzylkoum",
      "Boukhara : Poi-Kalyan, Liab-i Haouz, Ark et artisanat",
      "Khiva : vieille ville Ichan Kala classée UNESCO",
      "Guide local francophone et transport privé climatisé"
    ],
    days: [
      { num: "J1", title: "Vol vers Tachkent", text: "Envol à destination de Tachkent selon horaires de vol. Dîner et nuit à bord ou selon arrivée.", meta: [["Vol", "non inclus"]] },
      { num: "J2", title: "Tachkent", text: "Accueil par le guide francophone, transfert, vieille ville, Khast Imam, bazar Chorsu, métro décoré, musée des Arts appliqués et places centrales.", meta: [["Nuit", "Tachkent"]] },
      { num: "J3", title: "Tachkent — Samarkand", text: "Train rapide Afrosiyob vers Samarkand, visite du Régistan, de Bibi-Khanoum et du bazar Siab.", meta: [["Transport", "train rapide"], ["Nuit", "Samarkand"]] },
      { num: "J4", title: "Samarkand", text: "Mausolée Gour-Emir, nécropole Chakh-i-Zinda, musée d'Afrasiab et observatoire d'Ouloug Beg.", meta: [["Nuit", "Samarkand"]] },
      { num: "J5", title: "Samarkand — Nourata — camp de yourtes", text: "Route vers le désert du Kyzylkoum, arrêt à Nourata et nuit en camp de yourtes avec dîner typique.", meta: [["Nuit", "yourtes"]] },
      { num: "J6", title: "Lac Aydarkul — Guijdouvan — Boukhara", text: "Excursion au lac Aydarkul, atelier de poterie à Guijdouvan, arrivée à Boukhara.", meta: [["Nuit", "Boukhara"]] },
      { num: "J7", title: "Boukhara", text: "Poi-Kalyan, mosquée Kalon, médersa Mir-i-Arab, coupoles marchandes et quartier Liab-i Haouz.", meta: [["Nuit", "Boukhara"]] },
      { num: "J8", title: "Boukhara — traditions", text: "Mausolée Ismaïl Samani, citadelle Ark, mosquée Bolo-Khaouz et temps libre pour l'artisanat.", meta: [["Nuit", "Boukhara"]] },
      { num: "J9", title: "Boukhara — Khiva", text: "Route à travers le Kyzylkoum vers Khiva, installation près de la vieille ville Ichan Kala.", meta: [["Route", "environ 450 km"], ["Nuit", "Khiva"]] },
      { num: "J10", title: "Khiva", text: "Visite d'Ichan Kala : Kounia-Ark, mosquée Djouma, minaret Islam-Khodja, palais Tach-Khaouli et Kalta Minor.", meta: [["Nuit", "Khiva"]] },
      { num: "J11", title: "Ourguentch — Tachkent — retour", text: "Transfert à l'aéroport d'Ourguentch, vol intérieur vers Tachkent puis correspondance internationale.", meta: [["Fin", "services"]] }
    ],
    inclus: [
      "Hébergement dans les hôtels mentionnés ou similaires selon disponibilité",
      "Transport privé climatisé pendant tout le circuit",
      "Billet de train rapide Afrosiyob Tachkent — Samarkand",
      "Droits d'entrée dans tous les sites mentionnés",
      "Guide local francophone durant tout le voyage",
      "Pension complète sauf repas libres mentionnés"
    ],
    exclus: [
      "Vols internationaux",
      "Vol domestique Ourguentch — Tachkent si choisi",
      "Frais de e-visa environ 20 à 30 euros",
      "Pourboires, boissons et dépenses personnelles",
      "Assurance voyage"
    ],
    hotels: ["Hôtels 3★ : Arien Plaza / Uzbekistan Hotel, Zilol Baxt / Malika Prime, Malika Bukhara / Fatima Hotel", "Hôtels 4★ : Wyndham Garden / Ramada, Dilimah Premium / Emirkhan"],
    priceTable: { head: ["Catégorie", "Chambre double", "Supplément single"], rows: [["Hôtels 3★", "15 700 DH", "3 500 DH"], ["Hôtels 4★", "17 400 DH", "3 850 DH"]] },
    route: ["Tachkent", "Samarkand", "Nourata", "Kyzylkoum", "Aydarkul", "Boukhara", "Khiva", "Ourguentch"],
    datesList: ["14/07 au 24/07/2026", "04/08 au 14/08/2026", "01/09 au 11/09/2026", "06/10 au 16/10/2026", "13/10 au 23/10/2026"],
    dates: { line: "Départs restants 2026 : juillet, août, septembre et octobre.", note: "Vols non inclus. Tarifs et disponibilités sous réserve de confirmation." },
    cta: { title: "Envie de découvrir l'Ouzbékistan ?", text: "Nous préparons votre circuit sur la Route de la Soie avec guide francophone et assistance Voyages 21." }
  },

  "asie-chine": {
    mediaKey: "modal-chine", whatsapp: "212614152686",
    eyebrow: "Chine · Grand circuit", title: "Circuit Chine — Pékin, Shanghai & Merveilles", duration: "14 jours", tag: "Chine",
    cadran: [["Destinations", "Pékin, Shanghai et merveilles"], ["Durée", "14 jours / 11 nuits"], ["Vols", "Inclus — Qatar Airways"], ["Hôtels", "5★"], ["Guide", "Francophone"]],
    price: "29 900 DH",
    intro: [
      "La Chine des merveilles, de la Grande Muraille aux gratte-ciel de Shanghai. À Pékin, la Cité interdite et le Temple du Ciel ; puis les canaux de Suzhou, le Lac de l'Ouest de Hangzhou, et la modernité vertigineuse de Shanghai.",
      "Quatorze jours entre empire millénaire et Chine d'aujourd'hui, en hôtels 5★ et guide francophone."
    ],
    highlights: ["La Grande Muraille et la Cité interdite", "Le Temple du Ciel à Pékin", "Suzhou et le Lac de l'Ouest de Hangzhou", "Shanghai et Shenzhen", "Vols Qatar Airways inclus, hôtels 5★, guide francophone"],
    programme: ["Pékin (Cité interdite, Grande Muraille, Temple du Ciel)", "Nanjing", "Suzhou", "Hangzhou (Lac de l'Ouest)", "Shanghai", "Shenzhen"],
    inclus: ["Le vol Qatar Airways Casablanca – Pékin / Shanghai – Casablanca", "Les hôtels 5★", "Les repas mentionnés au programme", "Les visites au programme", "Un guide francophone"],
    exclus: ["Le visa chinois (600 DH)", "Les pourboires (≈ 40 $)", "Les dépenses personnelles"],
    priceTable: { head: ["Forfait", "Prix / pers."], rows: [["À partir de", "29 900 DH"]] },
    datesList: ["05-18 août", "12-25 août"],
    dates: { line: "Départs été 2026 :", note: "" },
    cta: { title: "Envie de découvrir la Chine ?", text: "Nous composons chaque voyage sur mesure, selon vos dates et vos envies — comme nous le faisons depuis 2000." }
  },

  "asie-chine-pekin-xian-guilin-shanghai": {
    mediaKey: "modal-chine-pekin-xian-guilin-shanghai", whatsapp: "212614152686",
    eyebrow: "Chine · Départ 10 août 2026",
    title: "Chine impériale & paysages du Sud — Pékin, Xi'an, Guilin & Shanghai",
    duration: "15 jours",
    tag: "Chine",
    cadran: [
      ["Départ", "Casablanca"],
      ["Destination", "Chine"],
      ["Durée", "15 jours / 12 nuits"],
      ["Vols", "Inclus — Royal Air Maroc"],
      ["Hôtels", "5☆"],
      ["Visa", "600 DH"],
      ["Date", "10 au 24 août 2026"]
    ],
    price: "39 000 DH",
    intro: [
      "Un grand circuit Chine de Pékin à Shanghai, avec Xi'an, Guilin, Yangshuo, Suzhou et les villages d'eau.",
      "Le programme réunit les grands symboles impériaux, la Grande Muraille, l'armée de terre cuite, la rivière Li, les jardins de Suzhou et l'énergie de Shanghai.",
      "Un itinéraire complet avec vols Royal Air Maroc, trains rapides, vols intérieurs, hôtels 5☆ et guides locaux francophones."
    ],
    highlights: [
      "Pékin : place Tian An Men, Cité Interdite, Temple du Ciel, Grande Muraille et Palais d'Été",
      "Xi'an : Grande Mosquée, Grande Pagode de l'Oie Sauvage et armée de terre cuite",
      "Guilin et Yangshuo : rivière Li, Xingping, champs de thé et paysages karstiques",
      "Shanghai : Bund, Pudong, vieux Shanghai, jardin Yu et concession française",
      "Suzhou et Tongli : jardins, canaux, soierie et quartier Shantanjie"
    ],
    days: [
      { num: "J1", title: "Casablanca — Pékin", text: "Rendez-vous à l'aéroport Mohammed V et envol à destination de Pékin.", meta: [["Date", "10 août 2026"]] },
      { num: "J2", title: "Arrivée à Pékin", text: "Accueil, transfert en ville, installation à l'hôtel et dîner inclus.", meta: [["Nuit", "Pékin"]] },
      { num: "J3", title: "Pékin historique", text: "Place Tian An Men, Cité Interdite, déjeuner local et visite du Temple du Ciel.", meta: [["Repas", "petit déjeuner, déjeuner"]] },
      { num: "J4", title: "Grande Muraille et Palais d'Été", text: "Excursion à la Grande Muraille de Juyongguan, déjeuner puis découverte du Palais d'Été.", meta: [["Nuit", "Pékin"]] },
      { num: "J5", title: "Pékin", text: "Parc olympique, initiation au Taiji, déjeuner chez l'habitant dans les Hutong, cours de raviolis chinois et Temple des Lamas.", meta: [["Nuit", "Pékin"]] },
      { num: "J6", title: "Pékin — Xi'an", text: "Transfert à la gare, train rapide vers Xi'an, promenade dans les vieux quartiers et visite de la Grande Mosquée.", meta: [["Train", "5h"], ["Nuit", "Xi'an"]] },
      { num: "J7", title: "Xi'an", text: "Grande Pagode de l'Oie Sauvage, Tang Dynasty Ever Bright City, cours de calligraphie, fabrique de jade et armée de terre cuite.", meta: [["Nuit", "Xi'an"]] },
      { num: "J8", title: "Xi'an — Guilin — Yangshuo", text: "Vol vers Guilin, route vers Yangdi, croisière en radeau sur la rivière Li jusqu'à Xingping puis route vers Yangshuo.", meta: [["Nuit", "Yangshuo"]] },
      { num: "J9", title: "Yangshuo", text: "Journée libre et temps libre dans le marché Ouest.", meta: [["Nuit", "Yangshuo"]] },
      { num: "J10", title: "Yangshuo — Guilin — Shanghai", text: "Route vers Guilin, champs de thé avec dégustation, tour de ville, déjeuner puis vol vers Shanghai.", meta: [["Nuit", "Shanghai"]] },
      { num: "J11", title: "Shanghai", text: "Bund, traversée de la rivière Huangpu, Pudong, vieux Shanghai, jardin Yu et ancienne concession française.", meta: [["Nuit", "Shanghai"]] },
      { num: "J12", title: "Shanghai — Suzhou — Shanghai", text: "Tongli, mini-croisière sur les canaux, Suzhou, jardin du maître des filets, quartier Shantanjie et visite d'une soierie.", meta: [["Nuit", "Shanghai"]] },
      { num: "J13", title: "Shanghai — Pékin", text: "Journée libre, puis transfert à la gare et TGV vers Pékin.", meta: [["Train", "TGV"], ["Nuit", "Pékin"]] },
      { num: "J14", title: "Pékin — retour", text: "Petit déjeuner, transfert à l'aéroport et vol retour.", meta: [["Date", "23 août 2026"]] },
      { num: "J15", title: "Casablanca", text: "Arrivée à Casablanca et fin de nos services.", meta: [["Date", "24 août 2026"]] }
    ],
    inclus: [
      "Vol direct en classe économique avec Royal Air Maroc",
      "Transferts aéroport / hôtel / aéroport",
      "Logement 12 nuits en hôtels avec petits déjeuners",
      "Repas mentionnés au programme",
      "Services des guides locaux francophones",
      "2 TGV / trains rapides Pékin / Xi'an et Shanghai / Pékin en 2ème classe",
      "Vols Xi'an / Guilin et Guilin / Shanghai TTC",
      "Frais d'entrée des visites mentionnées au programme",
      "Guide national accompagnant le groupe"
    ],
    exclus: [
      "Repas et boissons non mentionnés au programme",
      "Pourboires chauffeurs et guides : 5 USD par personne et par jour",
      "Dépenses personnelles",
      "Frais visa : 600 DH",
      "Assurance voyage"
    ],
    hotels: [
      "Pékin — New Yunnan Crown Plaza 5☆, 5 nuits",
      "Xi'an — Grand Mercure 5☆, 2 nuits",
      "Yangshuo — Greenlotus Hotel 5☆, 2 nuits",
      "Shanghai — The Yangtse Boutique Hotel 5☆, 3 nuits"
    ],
    priceTable: { head: ["Occupation", "Prix / pers."], rows: [["Chambre triple", "39 000 DH"], ["Chambre double", "39 500 DH"], ["Supplément single", "7 800 DH"], ["Visa", "600 DH"]] },
    route: ["Casablanca", "Pékin", "Xi'an", "Guilin", "Yangdi", "Yangshuo", "Shanghai", "Suzhou", "Pékin", "Casablanca"],
    datesList: ["10/08 au 24/08/2026"],
    dates: { line: "Départ unique : du 10 au 24 août 2026.", note: "Passeport valide 6 mois minimum, dossier visa touristique et relevé bancaire requis selon conditions du programme." },
    cta: { title: "Envie de cette grande Chine ?", text: "Nous préparons votre circuit Chine impériale et paysages du Sud avec vols, hôtels 5☆, trains rapides et assistance Voyages 21." }
  },
  "asie-malaisie-thailande": {
    mediaKey: "modal-malaisie", whatsapp: "212614152686",
    eyebrow: "Malaisie & Thaïlande · Circuit", title: "Malaisie & Thaïlande — KL, Krabi & Phuket", duration: "14 jours", tag: "Asie",
    cadran: [["Destinations", "Kuala Lumpur, Krabi, Phuket"], ["Durée", "14 jours / 11 nuits"], ["Vols", "Inclus — Qatar Airways"], ["Hôtels", "5★"], ["Guide", "Inclus"]],
    price: "28 500 DH",
    intro: [
      "Deux pays, deux ambiances. Kuala Lumpur et ses tours Petronas, les hauteurs de Genting Highlands, puis l'envol vers le sud de la Thaïlande.",
      "Krabi et Phuket, leurs plages de carte postale et leurs îles émeraude : quatorze jours entre villes modernes et paradis balnéaires, en hôtels 5★."
    ],
    highlights: ["Les tours Petronas et Genting Highlands", "Les plages de Krabi et Phuket", "Vol intérieur KL – Krabi inclus", "Hôtels 5★, vols Qatar Airways, guide"],
    programme: ["Kuala Lumpur (tours Petronas, Genting Highlands)", "Vol KL – Krabi", "Krabi", "Phuket"],
    inclus: ["Le vol Qatar Airways Casablanca – Kuala Lumpur", "Les hôtels 5★", "Les repas mentionnés au programme", "Le vol intérieur KL – Krabi", "Un guide"],
    exclus: [],
    priceTable: { head: ["Forfait", "Prix / pers."], rows: [["À partir de", "28 500 DH"]] },
    datesList: ["31 juil.-13 août", "05-18 août"],
    dates: { line: "Départs été 2026 :", note: "" },
    cta: { title: "Envie de la Malaisie et de la Thaïlande ?", text: "Nous composons chaque voyage sur mesure, selon vos dates et vos envies — comme nous le faisons depuis 2000." }
  },

  "asie-malaisie-singapour": {
    mediaKey: "modal-malaisie-singapour", whatsapp: "212614152686",
    eyebrow: "Combiné Asie · Malaisie & Singapour",
    title: "Malaisie & Singapour — Kuala Lumpur, Penang & Singapour",
    duration: "14 jours",
    tag: "Combiné",
    cadran: [
      ["Départ", "Casablanca"],
      ["Destinations", "Kuala Lumpur, Penang, Singapour"],
      ["Durée", "14 jours / 11 nuits"],
      ["Vols", "Inclus — Qatar Airways"],
      ["Hôtels", "5☆ et 4☆ sup."],
      ["Visa", "Singapour : 400 DH"],
      ["Dates", "01 au 13 août · 06 au 19 août"]
    ],
    price: "27 500 DH",
    intro: [
      "Un combiné entre Malaisie et Singapour, de Kuala Lumpur à Penang puis vers la cité-État la plus futuriste d'Asie.",
      "Le programme associe plage à Batu Ferringhi, visites de Georgetown, tours Petronas, Genting Highlands, Malacca, Johor Bahru et découverte guidée de Singapour.",
      "Un voyage pensé pour alterner culture, modernité, détente balnéaire et shopping."
    ],
    highlights: [
      "Penang : Georgetown, Batu Ferringhi et marché de nuit",
      "Kuala Lumpur : tours Petronas, Palais Royal, Mosquée Nationale et déjeuner à la tour KL",
      "Genting Highlands : parc d'attractions, casino, shopping et loisirs",
      "Malacca et Johor Bahru avant l'entrée à Singapour",
      "Singapour : Chinatown, Little India, jardin botanique et temps libre shopping"
    ],
    days: [
      { num: "J1", title: "Casablanca — Kuala Lumpur", text: "Rendez-vous à l'aéroport de Casablanca et envol avec Qatar Airways vers Kuala Lumpur. Repas et nuit à bord.", meta: [["Vols", "Qatar Airways"]] },
      { num: "J2", title: "Kuala Lumpur", text: "Arrivée à Kuala Lumpur, accueil et transfert vers un hôtel 5☆ au cœur du Triangle d'Or.", meta: [["Nuit", "Kuala Lumpur"]] },
      { num: "J3", title: "Kuala Lumpur — Butterworth — Penang", text: "Départ en train rapide vers Butterworth, face à Penang, puis installation à Batu Ferringhi.", meta: [["Nuit", "Penang"]] },
      { num: "J4", title: "Penang", text: "Visite de l'île de Penang et de Georgetown, puis retour à l'hôtel en fin d'après-midi.", meta: [["Nuit", "Penang"]] },
      { num: "J5", title: "Penang", text: "Journée libre pour la détente en bord de mer.", meta: [["Nuit", "Penang"]] },
      { num: "J6", title: "Penang — Kuala Lumpur", text: "Route vers Kuala Lumpur et installation dans un hôtel 5☆ situé au cœur du Triangle d'Or.", meta: [["Nuit", "Kuala Lumpur"]] },
      { num: "J7", title: "Kuala Lumpur", text: "Visite du Palais Royal, de la Mosquée Nationale, du Monument National, des tours Petronas et déjeuner à la tour KL.", meta: [["Nuit", "Kuala Lumpur"]] },
      { num: "J8", title: "Genting Highlands", text: "Excursion à Genting Highlands avec temps libre dans le complexe de loisirs.", meta: [["Nuit", "Kuala Lumpur"]] },
      { num: "J9", title: "Kuala Lumpur", text: "Journée libre pour détente ou shopping dans les grands centres commerciaux de la ville.", meta: [["Nuit", "Kuala Lumpur"]] },
      { num: "J10", title: "Kuala Lumpur — Malacca — Johor Bahru", text: "Départ vers Malacca, visite de la ville historique, puis continuation vers Johor Bahru.", meta: [["Nuit", "Johor Bahru"]] },
      { num: "J11", title: "Singapour", text: "Entrée à Singapour, installation en hôtel 4☆ supérieur puis visite guidée : Chinatown, Little India, jardin botanique et quartiers emblématiques.", meta: [["Nuit", "Singapour"]] },
      { num: "J12", title: "Singapour", text: "Journée libre pour profiter du shopping, de la gastronomie et des centres commerciaux de Singapour.", meta: [["Nuit", "Singapour"]] },
      { num: "J13", title: "Singapour — aéroport", text: "Libération des chambres à midi, temps libre puis transfert à l'aéroport de Singapour pour le vol retour.", meta: [["Retour", "via Doha"]] },
      { num: "J14", title: "Casablanca", text: "Arrivée à Casablanca et fin de nos services.", meta: [["Fin", "services"]] }
    ],
    inclus: [
      "Billet d'avion Casablanca / Doha / Kuala Lumpur / Singapour / Doha / Casablanca avec Qatar Airways",
      "Hébergement en hôtels 5☆ et 4☆ supérieur",
      "Repas mentionnés au programme",
      "Visites mentionnées au programme",
      "Transport en autocar climatisé",
      "Assistance d'un guide arabophone ou francophone durant le circuit"
    ],
    exclus: [
      "Frais de visa Singapour : 400 DH",
      "Repas non mentionnés au programme",
      "Dépenses personnelles",
      "Excursions non prévues au programme",
      "Pourboires chauffeur et guide, à prévoir environ 20 USD"
    ],
    hotels: [
      "Penang / Batu Ferringhi — Shangri-La 5☆ ou similaire",
      "Kuala Lumpur — hôtel 5☆ au Triangle d'Or",
      "Singapour — hôtel 4☆ supérieur en centre-ville"
    ],
    priceTable: { head: ["Occupation", "Prix / pers."], rows: [["Enfant -12 ans", "27 500 DH"], ["3ème personne", "31 900 DH"], ["Chambre double", "32 900 DH"], ["Supplément single", "11 500 DH"], ["Visa Singapour", "400 DH"]] },
    route: ["Casablanca", "Kuala Lumpur", "Butterworth", "Penang", "Genting Highlands", "Malacca", "Johor Bahru", "Singapour", "Casablanca"],
    datesList: ["01/08 au 13/08", "06/08 au 19/08"],
    dates: { line: "Départs : du 01 au 13 août et du 06 au 19 août.", note: "Formulaire MDAC Malaisie à remplir au minimum 3 jours avant le départ. Visa Singapour selon dossier. Tarif à confirmer selon disponibilités." },
    cta: { title: "Envie du combiné Malaisie & Singapour ?", text: "Nous préparons votre circuit entre Kuala Lumpur, Penang et Singapour avec vols, hôtels et assistance Voyages 21." }
  },
  "asie-malaisie-indonesie": {
    mediaKey: "modal-malaisie-indonesie", whatsapp: "212614152686",
    eyebrow: "Combiné Asie · Malaisie & Indonésie",
    title: "Malaisie & Indonésie — Kuala Lumpur, Bali & Jakarta",
    duration: "15 jours",
    tag: "Combiné",
    cadran: [
      ["Départ", "Casablanca"],
      ["Destinations", "Kuala Lumpur, Bali, Jakarta"],
      ["Durée", "15 jours / 12 nuits"],
      ["Vols", "Inclus — Qatar Airways"],
      ["Hôtels", "5☆"],
      ["Guide", "Arabophone en Malaisie et francophone durant le circuit"],
      ["Dates", "03 au 17 août · 09 au 23 août"]
    ],
    price: "27 800 DH",
    intro: [
      "Un combiné entre Malaisie et Indonésie, avec Kuala Lumpur, les plages de Bali et la découverte de Jakarta.",
      "Le voyage mêle ville moderne, shopping, excursion à Genting Highlands, séjour balnéaire à Nusa Dua et visite de la capitale indonésienne.",
      "Une formule confortable en hôtels 5☆, avec vols internationaux et vols Kuala Lumpur / Bali / Jakarta inclus."
    ],
    highlights: [
      "Kuala Lumpur : tours Petronas, Mosquée Nationale, Palais Royal et déjeuner à la tour KL",
      "Genting Highlands : complexe de loisirs, centre commercial et parc d'attractions",
      "Bali : Nusa Dua, Ubud, Kintamani, volcan du lac Batur et croisière en mer",
      "Jakarta : centre historique de Batavia et port traditionnel de Sunda Kelapa",
      "Vols Qatar Airways et vols Kuala Lumpur / Bali / Jakarta avec 20 kg de bagages en soute"
    ],
    days: [
      { num: "J1", title: "Casablanca — Kuala Lumpur", text: "Enregistrement à Casablanca et envol avec Qatar Airways vers Kuala Lumpur. Repas et nuit à bord.", meta: [["Vols", "Qatar Airways"]] },
      { num: "J2", title: "Kuala Lumpur", text: "Arrivée à Kuala Lumpur, accueil, transfert et installation dans un hôtel 5☆ au cœur du Triangle d'Or.", meta: [["Nuit", "Kuala Lumpur"]] },
      { num: "J3", title: "Kuala Lumpur", text: "Visite du Palais Royal, de la Mosquée Nationale, du Monument National et des tours Petronas, avec déjeuner dans le restaurant tournant de la tour KL.", meta: [["Nuit", "Kuala Lumpur"]] },
      { num: "J4", title: "Genting Highlands", text: "Excursion au complexe de loisirs de Genting Highlands, avec temps libre pour le parc, le shopping et les animations.", meta: [["Nuit", "Kuala Lumpur"]] },
      { num: "J5-J6", title: "Kuala Lumpur", text: "Journées libres pour détente ou shopping dans les grands centres commerciaux de la ville.", meta: [["Nuits", "Kuala Lumpur"]] },
      { num: "J7", title: "Kuala Lumpur — Bali", text: "Vol vers Bali, accueil et transfert à Nusa Dua, installation à l'hôtel Grand Mirage 5☆.", meta: [["Vol", "3h"], ["Nuit", "Bali"]] },
      { num: "J8", title: "Bali — Ubud et tour de l'île", text: "Visite d'Ubud, continuation vers Kintamani, volcan du lac Batur, déjeuner en cours d'excursion et retour à l'hôtel.", meta: [["Nuit", "Bali"]] },
      { num: "J9", title: "Bali — croisière en mer", text: "Croisière au large de Bali avec escale à Nusa Penida, balade découverte, activités nautiques à disposition et déjeuner buffet.", meta: [["Nuit", "Bali"]] },
      { num: "J10-J11", title: "Nusa Dua", text: "Journées libres pour profiter de la plage, de l'hôtel, de Kuta ou du centre Bali Collection.", meta: [["Nuits", "Bali"]] },
      { num: "J12", title: "Bali — Jakarta", text: "Vol vers Jakarta, accueil et transfert à l'hôtel Borobudur 5☆.", meta: [["Vol", "1h30"], ["Nuit", "Jakarta"]] },
      { num: "J13", title: "Jakarta", text: "Découverte du centre historique de Jakarta, anciennement Batavia, et du port traditionnel de Sunda Kelapa.", meta: [["Nuit", "Jakarta"]] },
      { num: "J14", title: "Jakarta — aéroport", text: "Temps libre selon l'horaire de vol puis transfert à l'aéroport pour le retour.", meta: [["Retour", "via Doha"]] },
      { num: "J15", title: "Casablanca", text: "Arrivée à Casablanca et fin de nos services.", meta: [["Fin", "services"]] }
    ],
    inclus: [
      "Billet d'avion Casablanca / Doha / Kuala Lumpur / Jakarta / Doha / Casablanca avec Qatar Airways",
      "Hébergement en hôtels 5☆",
      "Repas mentionnés au programme",
      "Visites mentionnées au programme",
      "Vols Kuala Lumpur / Bali / Jakarta avec 20 kg de bagages en soute",
      "Transport en autocar climatisé",
      "Assistance d'un guide arabophone en Malaisie et francophone durant le circuit"
    ],
    exclus: [
      "Repas non mentionnés au programme",
      "Dépenses personnelles",
      "Excursions non prévues au programme",
      "Pourboires chauffeur et guide, à prévoir environ 20 USD"
    ],
    hotels: [
      "Kuala Lumpur — hôtel 5☆ au Triangle d'Or",
      "Bali / Nusa Dua — Grand Mirage 5☆",
      "Jakarta — Hotel Borobudur 5☆"
    ],
    priceTable: { head: ["Occupation", "Prix / pers."], rows: [["Enfant -12 ans", "27 800 DH"], ["3ème personne", "32 900 DH"], ["Chambre double", "33 900 DH"], ["Supplément single", "10 900 DH"]] },
    route: ["Casablanca", "Kuala Lumpur", "Genting Highlands", "Bali", "Nusa Penida", "Jakarta", "Doha", "Casablanca"],
    datesList: ["03/08 au 17/08", "09/08 au 23/08"],
    dates: { line: "Départs : du 03 au 17 août et du 09 au 23 août.", note: "Formulaire MDAC Malaisie à remplir au minimum 3 jours avant le départ. Tarif à confirmer selon disponibilités." },
    cta: { title: "Envie du combiné Malaisie & Indonésie ?", text: "Nous préparons votre voyage entre Kuala Lumpur, Bali et Jakarta avec vols, hôtels 5☆ et assistance Voyages 21." }
  },
  "asie-indonesie-thailande": {
    mediaKey: "modal-indonesie-thailande", whatsapp: "212614152686",
    eyebrow: "Combiné Asie · Indonésie & Thaïlande",
    title: "Indonésie & Thaïlande — Jakarta, Bali & Phuket",
    duration: "14 jours",
    tag: "Combiné",
    cadran: [
      ["Départ", "Casablanca"],
      ["Destinations", "Jakarta, Bali, Phuket"],
      ["Durée", "14 jours / 11 nuits"],
      ["Vols", "Inclus — Qatar Airways"],
      ["Hôtels", "5☆"],
      ["Guide", "Arabophone ou francophone"],
      ["Date", "02 au 15 août"]
    ],
    price: "31 500 DH",
    intro: [
      "Un combiné exclusif entre Indonésie et Thaïlande, pensé pour relier Jakarta, Bali et Phuket dans un même voyage.",
      "Le programme associe découverte culturelle, hôtels 5☆, croisière à Bali, temps balnéaire à Nusa Dua et extension à Phuket avec excursion à Koh Phi Phi.",
      "Une traversée d'Asie entre capitale, îles mythiques et plages de l'océan Indien."
    ],
    highlights: [
      "Jakarta : centre historique, port traditionnel de Sunda Kelapa et séjour à l'hôtel Borobudur 5☆",
      "Bali : Nusa Dua, Ubud, Kintamani, volcan du lac Batur et croisière vers Nusa Penida",
      "Phuket : séjour au Dusit Laguna Phuket 5☆ en bord de mer",
      "Excursion à Koh Phi Phi avec bateau, droits d'entrée et déjeuner inclus",
      "Vols Qatar Airways et vols Jakarta / Bali / Phuket avec 20 kg de bagages en soute"
    ],
    days: [
      { num: "J1", title: "Casablanca — Jakarta", text: "Rendez-vous à l'aéroport de Casablanca et envol avec Qatar Airways à destination de Jakarta. Repas et nuit à bord.", meta: [["Vols", "Qatar Airways"]] },
      { num: "J2", title: "Jakarta", text: "Arrivée à Jakarta, accueil, transfert et installation à l'hôtel Borobudur 5☆. Dîner et nuit.", meta: [["Nuit", "Jakarta"]] },
      { num: "J3", title: "Jakarta", text: "Journée de découverte de la capitale : centre historique de Batavia, port traditionnel de Sunda Kelapa et déjeuner local en cours de visite.", meta: [["Nuit", "Jakarta"]] },
      { num: "J4", title: "Jakarta — Bali", text: "Vol vers Bali, accueil et transfert vers Nusa Dua. Installation à l'hôtel Grand Mirage 5☆ avec accès direct à la plage.", meta: [["Vol", "1h40"], ["Nuit", "Bali"]] },
      { num: "J5", title: "Bali — Ubud et tour de l'île", text: "Visite du village d'Ubud, continuation vers Kintamani et le volcan du lac Batur, déjeuner en cours de visite puis retour à l'hôtel.", meta: [["Nuit", "Bali"]] },
      { num: "J6", title: "Bali — croisière", text: "Croisière au large de Bali vers Nusa Penida, balade découverte, activités nautiques à disposition et déjeuner buffet.", meta: [["Nuit", "Bali"]] },
      { num: "J7-J8", title: "Nusa Dua", text: "Journées libres pour profiter de la plage, des installations de l'hôtel, de Kuta ou du centre commercial Bali Collection.", meta: [["Nuits", "Bali"]] },
      { num: "J9", title: "Bali — Phuket", text: "Transfert à l'aéroport de Bali et vol vers Phuket. Accueil puis installation à l'hôtel Dusit Laguna Phuket 5☆.", meta: [["Vol", "3h30"], ["Nuit", "Phuket"]] },
      { num: "J10", title: "Koh Phi Phi", text: "Excursion à Koh Phi Phi avec transferts en bateau, droits d'entrée et déjeuner inclus.", meta: [["Excursion", "incluse"]] },
      { num: "J11-J12", title: "Phuket", text: "Journées libres avec petit déjeuner pour profiter de l'hôtel, de la plage et des excursions disponibles sur place.", meta: [["Nuits", "Phuket"]] },
      { num: "J13", title: "Phuket — Doha — Casablanca", text: "Temps libre selon l'horaire de vol, transfert à l'aéroport de Phuket et envol vers Doha.", meta: [["Retour", "via Doha"]] },
      { num: "J14", title: "Casablanca", text: "Arrivée à Casablanca et fin de nos services.", meta: [["Fin", "services"]] }
    ],
    inclus: [
      "Billet d'avion Casablanca / Doha / Jakarta / Phuket / Doha / Casablanca avec Qatar Airways",
      "Hébergement en hôtels 5☆",
      "Repas mentionnés au programme",
      "Visites mentionnées au programme",
      "Vols Jakarta / Bali / Phuket avec 20 kg de bagages en soute",
      "Transport en autocar climatisé",
      "Assistance d'un guide arabophone ou francophone durant le circuit"
    ],
    exclus: [
      "Repas non mentionnés au programme",
      "Dépenses personnelles",
      "Excursions non prévues au programme",
      "Pourboires chauffeur et guide, à prévoir environ 20 USD"
    ],
    hotels: [
      "Jakarta — Hotel Borobudur 5☆",
      "Bali / Nusa Dua — Grand Mirage 5☆",
      "Phuket — Dusit Laguna Phuket 5☆"
    ],
    priceTable: { head: ["Occupation", "Prix / pers."], rows: [["Enfant -12 ans", "31 500 DH"], ["3ème personne", "34 500 DH"], ["Chambre double", "35 900 DH"], ["Supplément single", "11 500 DH"]] },
    route: ["Casablanca", "Jakarta", "Bali", "Nusa Penida", "Phuket", "Koh Phi Phi", "Doha", "Casablanca"],
    datesList: ["02/08 au 15/08"],
    dates: { line: "Départ : du 02 au 15 août.", note: "Formulaire TDAC Thaïlande à remplir au minimum 3 jours avant le départ. Tarif à confirmer selon disponibilités." },
    cta: { title: "Envie du combiné Indonésie & Thaïlande ?", text: "Nous préparons votre voyage entre Jakarta, Bali et Phuket avec vols, hôtels 5☆ et assistance Voyages 21." }
  },
  "asie-thailande-bangkok": {
    mediaKey: "modal-bangkok", whatsapp: "212614152686",
    eyebrow: "Thaïlande · Circuit", title: "Exotic Thailand — Bangkok, Krabi & Phuket", duration: "14 jours", tag: "Thaïlande",
    cadran: [["Destinations", "Bangkok, Krabi, Phuket"], ["Durée", "14 jours / 11 nuits"], ["Vols", "Inclus — Qatar Airways"], ["Hôtels", "5★ et 4★ Deluxe"], ["Guide", "Francophone"]],
    price: "26 900 DH",
    intro: [
      "La Thaïlande dans toute sa diversité. Bangkok l'effervescente d'abord : ses marchés flottants, ses temples dorés et une croisière sur la Chao Phraya.",
      "Puis le sud et ses eaux turquoise, entre Krabi et Phuket. Quatorze jours de temples, de saveurs et de plages, vols intérieurs et guide francophone compris."
    ],
    highlights: ["Bangkok, ses marchés flottants et ses temples", "Croisière sur la Chao Phraya", "Les plages de Krabi et Phuket", "Vol intérieur Bangkok – Krabi inclus", "Vols Qatar Airways, guide francophone"],
    programme: ["Bangkok (marchés flottants, temples, croisière Chao Phraya)", "Vol Bangkok – Krabi", "Krabi", "Phuket"],
    inclus: ["Le vol Qatar Airways", "Les hôtels (Bangkok 4★ Deluxe, Krabi/Phuket 5★)", "Les repas mentionnés au programme", "Les visites au programme", "Le vol intérieur Bangkok – Krabi", "Un guide francophone"],
    exclus: [],
    hotels: ["Bangkok — Rembrandt Hotel 4★ Deluxe", "Krabi / Phuket — hôtels 5★"],
    priceTable: { head: ["Forfait", "Prix / pers."], rows: [["À partir de", "26 900 DH"]] },
    datesList: ["01-14 août", "07-20 août", "11-24 août"],
    dates: { line: "Départs été 2026 :", note: "" },
    cta: { title: "Envie de la Thaïlande ?", text: "Nous composons chaque voyage sur mesure, selon vos dates et vos envies — comme nous le faisons depuis 2000." }
  },

  "asie-vietnam": {
    mediaKey: "modal-vietnam", whatsapp: "212614152686",
    eyebrow: "Vietnam · Grand circuit", title: "Découverte du Vietnam — Hanoi à Saigon", duration: "14 jours", tag: "Vietnam",
    cadran: [["Destinations", "Hanoi, Halong, Hué, Hoi An, Saigon"], ["Durée", "14 jours / 11 nuits"], ["Vols", "Inclus — Qatar Airways"], ["Hôtels", "5★"], ["Guide", "Francophone"]],
    price: "33 900 DH",
    intro: [
      "Le Vietnam du nord au sud, dans toute sa beauté. Hanoi et ses ruelles, la baie d'Halong et ses pitons karstiques, Hué l'impériale, Hoi An la lanternée.",
      "Jusqu'à Hô Chi Minh-Ville, l'ancienne Saigon trépidante. Quatorze jours d'histoire, de rizières et de croisières, en hôtels 5★ et guide francophone."
    ],
    highlights: ["La croisière dans la baie d'Halong (UNESCO)", "Hué impériale et Hoi An (UNESCO)", "Da Nang et China Beach", "Hô Chi Minh-Ville (Saigon)", "Vols Qatar Airways et vols intérieurs inclus, hôtels 5★"],
    programme: ["Hanoi", "Croisière baie d'Halong (UNESCO)", "Hué (UNESCO)", "Da Nang / Hoi An", "China Beach", "Hô Chi Minh-Ville (Saigon)"],
    inclus: ["Le vol Qatar Airways Casablanca – Hanoi / Saigon – Casablanca", "Les hôtels 5★", "Les repas mentionnés au programme", "Les vols intérieurs", "Un guide francophone"],
    exclus: ["Le visa (800 DH)", "Les pourboires", "Les dépenses personnelles"],
    priceTable: { head: ["Forfait", "Prix / pers."], rows: [["À partir de", "33 900 DH"]] },
    datesList: ["02-15 août", "08-21 août"],
    dates: { line: "Départs été 2026 :", note: "" },
    cta: { title: "Envie de découvrir le Vietnam ?", text: "Nous composons chaque voyage sur mesure, selon vos dates et vos envies — comme nous le faisons depuis 2000." }
  },


  "afrique-tunisie-tunis-hammamet": {
    mediaKey: "modal-tunis-hammamet", whatsapp: "212614152686",
    eyebrow: "Tunisie · Été 2026",
    title: "Combiné Tunis & Hammamet",
    duration: "8 jours",
    tag: "Tunisie",
    cadran: [["Départ", "Casablanca"], ["Destination", "Tunis et Hammamet"], ["Durée", "8 jours / 7 nuits"], ["Vols", "Inclus — Nouvelair"], ["Pension", "Petit déjeuner"], ["Hôtels", "Samarons 5★ · Sol Azur Beach 4★"]],
    price: "10 400 DH",
    intro: [
      "Un séjour tunisien entre la capitale Tunis et la douceur balnéaire d'Hammamet.",
      "Le forfait comprend deux nuits à Tunis, cinq nuits à Hammamet, les vols Nouvelair, les transferts privatifs et l'assistance Voyages 21."
    ],
    highlights: ["2 nuits à Tunis au Samarons Hotels 5★", "5 nuits à Hammamet au Sol Azur Beach 4★", "Vols Casablanca — Tunis — Casablanca avec Nouvelair", "Bagage à main 8 kg et bagage en soute 25 kg", "Transferts privatifs arrivée et départ"],
    days: [
      { num: "J1", title: "Casablanca — Tunis", text: "Vol Nouvelair vers Tunis, accueil, transfert privatif et installation à l'hôtel.", meta: [["Nuit", "Tunis"]] },
      { num: "J2", title: "Tunis", text: "Journée libre à Tunis pour découvrir la ville ou organiser une visite selon vos envies.", meta: [["Nuit", "Tunis"]] },
      { num: "J3", title: "Tunis — Hammamet", text: "Transfert vers Hammamet et installation pour le séjour balnéaire.", meta: [["Nuit", "Hammamet"]] },
      { num: "J4-J7", title: "Hammamet", text: "Séjour libre à Hammamet en petit déjeuner, entre plage, détente et découvertes personnelles.", meta: [["Nuits", "Hammamet"], ["Formule", "Petit déjeuner"]] },
      { num: "J8", title: "Tunis — Casablanca", text: "Transfert privatif à l'aéroport de Tunis et vol retour vers Casablanca.", meta: [["Fin", "services"]] }
    ],
    inclus: ["Billet d'avion aller-retour Casablanca — Tunis — Casablanca avec Nouvelair", "8 kg de bagage à main et 25 kg de bagage en soute", "2 nuits à Tunis avec petit déjeuner", "5 nuits à Hammamet avec petit déjeuner", "Transferts privatifs arrivée et départ", "Taxes aéroportuaires et taxes de séjour aux hôtels", "Assistance Voyages 21"],
    exclus: ["Extras aux hôtels", "Boissons", "Pourboires des guides et chauffeurs", "Dépenses personnelles"],
    hotels: ["Tunis — Samarons Hotels 5★", "Hammamet — Hotel Sol Azur Beach 4★"],
    priceTable: { head: ["Forfait", "Prix par personne"], rows: [["Adulte en chambre double", "10 400 DH"], ["Enfant 2 à 12 ans partageant la chambre des parents", "6 400 DH"]] },
    route: ["Casablanca", "Tunis", "Hammamet", "Tunis", "Casablanca"],
    datesList: ["20 au 27 août 2026"],
    dates: { line: "Départ du 20 au 27 août 2026.", note: "Tarifs et disponibilités sous réserve de confirmation." },
    cta: { title: "Envie de partir en Tunisie ?", text: "Nous préparons votre séjour Tunis et Hammamet avec vols, transferts et assistance Voyages 21." }
  },

  "zanzibar-detente": {
    mediaKey: "modal-zanzibar", whatsapp: "212614152686",
    eyebrow: "Zanzibar · Séjour balnéaire", title: "Séjour à Zanzibar — Détente & Loisirs", duration: "8 jours", tag: "Zanzibar",
    cadran: [["Destination", "Zanzibar (Tanzanie)"], ["Durée", "8 jours / 7 nuits"], ["Vols", "Inclus — Turkish Airlines"], ["Plages", "Nungwi et Kendwa"], ["Hôtels", "3★ / 4★"]],
    price: "18 500 DH",
    intro: [
      "L'île aux épices, posée sur l'océan Indien. Stone Town et ses ruelles classées à l'UNESCO, parfum de girofle et héritage swahili ; puis le nord de l'île, ses plages de sable blanc et son lagon turquoise.",
      "Une semaine de pure détente entre Nungwi et Kendwa, avec excursions possibles pour qui veut explorer."
    ],
    highlights: ["Stone Town, classée à l'UNESCO", "Les plages de Nungwi et Kendwa", "Le lagon turquoise de l'océan Indien", "Vols Turkish Airlines et transferts inclus", "Excursions optionnelles"],
    programme: ["Stone Town (UNESCO)", "Nungwi et Kendwa (plages turquoise)", "Excursions optionnelles"],
    inclus: ["Le vol Turkish Airlines aller-retour", "Les transferts privés", "Les taxes de séjour", "L'assurance obligatoire"],
    exclus: ["Le visa à l'aéroport (50 USD)", "Les excursions optionnelles"],
    hotels: ["Fun Beach Hotel 3★ (petit-déjeuner ou demi-pension)", "Breeze's Beach Club & Spa 4★ (demi-pension)"],
    priceTable: {
      head: ["Hôtel (juin-août)", "Single", "Double", "Triple"],
      rows: [
        ["Fun Beach 3★ (petit-déj)", "24 800 DH", "21 500 DH", "18 500 DH"],
        ["Breeze's 4★ (demi-pension)", "27 500 DH", "24 300 DH", "22 500 DH"],
        ["Fun Beach 3★ (demi-pension)", "29 700 DH", "26 000 DH", "23 900 DH"],
        ["Breeze's 4★ (demi-pension premium)", "38 900 DH", "34 900 DH", "31 000 DH"]
      ]
    },
    dates: { line: "Départs garantis (juin à août 2026).", note: "" },
    cta: { title: "Envie de partir à Zanzibar ?", text: "Nous composons chaque voyage sur mesure, selon vos dates et vos envies — comme nous le faisons depuis 2000." }
  },

  "asie-azerbaidjan-turquie": {
    mediaKey: "modal-azerbaidjan-turquie",
    whatsapp: "212614152686",
    eyebrow: "Asie · Combiné septembre 2026",
    title: "Combiné Azerbaïdjan & Turquie",
    duration: "12 jours",
    tag: "Asie",
    cadran: [
      ["Départ", "Casablanca"],
      ["Destinations", "Bakou, Gabala et Istanbul"],
      ["Durée", "12 jours / 10 nuits"],
      ["Vols", "Inclus — Turkish Airlines"],
      ["Pension", "Petit-déjeuner"],
      ["Date", "15 au 26 septembre 2026"],
      ["Hôtels", "3★ ou 4★ selon formule"]
    ],
    price: "16 750 DH",
    intro: [
      "Ce combiné relie les lumières de Bakou, les paysages de montagne de Gabala et l'énergie d'Istanbul dans un même voyage de douze jours.",
      "En Azerbaïdjan, vous découvrez la vieille ville classée UNESCO, les Flame Towers, le musée du Tapis, le centre Heydar Aliyev, les paysages du Grand Caucase et la station de Tufandag.",
      "Le séjour se termine à Istanbul avec une journée de visite, du temps libre et des options comme les Îles des Princesses, Sapanca & Masukiye ou un dîner sur le Bosphore."
    ],
    highlights: [
      "Bakou : vieille ville, Highland Park, Flame Towers et boulevard de la mer Caspienne",
      "Centre Heydar Aliyev, musée du Tapis, Gala et Gobustan selon programme",
      "Excursions vers Guba, Gabala, le lac Nohur et Tufandag",
      "Quatre nuits à Istanbul avec visite de ville et journées libres",
      "Vols Casablanca — Istanbul — Bakou — Istanbul — Casablanca inclus"
    ],
    days: [
      { num: "J1", title: "Casablanca — Istanbul — Bakou", text: "Rendez-vous à l'aéroport de Casablanca et envol Turkish Airlines vers Istanbul, puis continuation vers Bakou.", meta: [["Nuit", "à bord / arrivée Bakou"]] },
      { num: "J2", title: "Bakou — tour panoramique", text: "Arrivée à Bakou, accueil, transfert à l'hôtel puis visite de Highland Park, des Flame Towers, du boulevard de la mer Caspienne, du musée du Tapis et de la rue Nizami.", meta: [["Nuit", "Bakou"]] },
      { num: "J3", title: "Vieille ville de Bakou", text: "Découverte d'Icherisheher, de la Tour de la Vierge, du Palais des Chirvanchahs, du Centre Heydar Aliyev, du panneau I Love Baku et du complexe de Gala.", meta: [["Repas", "petit-déjeuner"], ["Nuit", "Bakou"]] },
      { num: "J4", title: "Bakou — Guba — Bakou", text: "Excursion vers Guba à travers les paysages du Grand Caucase avec découverte du Village Rouge et des traditions locales.", meta: [["Repas", "petit-déjeuner"], ["Nuit", "Bakou"]] },
      { num: "J5", title: "Bakou — Gabala", text: "Route vers Gabala avec visite de la mosquée Juma de Shamakhi, de la cascade Yeddi Gozel et du lac Nohur.", meta: [["Repas", "petit-déjeuner"], ["Nuit", "Gabala"]] },
      { num: "J6", title: "Gabala — Tufandag", text: "Découverte de la station de montagne Tufandag avec trajet en téléphérique et temps libre face aux paysages du Caucase.", meta: [["Repas", "petit-déjeuner"], ["Nuit", "Gabala"]] },
      { num: "J7", title: "Gabala — Bakou", text: "Retour vers Bakou à travers les paysages de montagne, puis temps shopping dans les grands centres commerciaux.", meta: [["Repas", "petit-déjeuner"], ["Nuit", "Bakou"]] },
      { num: "J8", title: "Bakou — Istanbul", text: "Transfert à l'aéroport de Bakou, envol vers Istanbul, accueil et transfert à l'hôtel. Après-midi libre.", meta: [["Repas", "petit-déjeuner"], ["Nuit", "Istanbul"]] },
      { num: "J9", title: "Istanbul — visite de ville", text: "Journée de visite : Pierre Loti, Miniatürk, Balat, Aya Sophia, Mosquée Bleue, Hippodrome, Palais de Topkapi et Grand Bazar selon programme.", meta: [["Repas", "petit-déjeuner"], ["Nuit", "Istanbul"]] },
      { num: "J10-11", title: "Istanbul — journées libres", text: "Journées libres avec options possibles : Sapanca & Masukiye, Îles des Princesses ou dîner de gala en bateau sur le Bosphore.", meta: [["Repas", "petit-déjeuner"], ["Nuits", "Istanbul"]] },
      { num: "J12", title: "Istanbul — Casablanca", text: "Petit-déjeuner, transfert à l'aéroport d'Istanbul et envol retour vers Casablanca.", meta: [["Repas", "petit-déjeuner"]] }
    ],
    inclus: [
      "Billet d'avion aller-retour Casablanca — Istanbul — Bakou — Istanbul — Casablanca sur Turkish Airlines",
      "4 nuits à Bakou avec petit-déjeuner",
      "2 nuits à Gabala avec petit-déjeuner",
      "4 nuits à Istanbul avec petit-déjeuner",
      "Activités et tickets d'entrée mentionnés au programme",
      "Transport privé pendant tout le circuit en Azerbaïdjan",
      "Transferts arrivée et départ à Bakou et Istanbul",
      "Excursion d'une journée à Istanbul selon programme",
      "Guide arabophone pendant les excursions",
      "Assistance Voyages 21"
    ],
    exclus: [
      "Dépenses personnelles",
      "Pourboires pour guide et chauffeur",
      "Activités et entrées non mentionnées dans le programme",
      "Dîners indiqués comme optionnels"
    ],
    hotels: [
      "Formule 3★ : Hotel Alba Bakou, Hotel Lakeside Gabala, Hotel Vatan 3★ sup Istanbul",
      "Formule 4★ : Hotel Qafqaz Sahil Bakou, Hotel Karvansaray Gabala, Hotel Taksim Express Istanbul"
    ],
    priceTable: {
      head: ["Formule", "Triple", "Double", "Single"],
      rows: [
        ["Hôtels 3★", "16 750 DH", "17 100 DH", "19 650 DH"],
        ["Hôtels 4★", "17 900 DH", "18 500 DH", "21 600 DH"]
      ]
    },
    children: "Moins de 2 ans : 3 300 DH · 2 à 11 ans : 11 300 DH en formule 3★, 12 000 DH en formule 4★",
    route: ["Casablanca", "Istanbul", "Bakou", "Guba", "Gabala", "Istanbul", "Casablanca"],
    dates: {
      line: "Départ du 15 au 26 septembre 2026.",
      note: "Tarifs sous réserve de disponibilité à la confirmation."
    },
    cta: {
      title: "Envie de découvrir Bakou et Istanbul ?",
      text: "Nous préparons votre départ avec les vols, les hôtels, les visites et l'assistance Voyages 21."
    }
  },

  "omra-mouharram": {
    lang: "ar",
    mediaKey: "modal-omra",
    whatsapp: "212614152686",
    eyebrow: "عمرة · رحلة مباشرة إلى المدينة المنورة",
    title: "عمرة محرّم 1448",
    duration: "14 ليلة",
    tag: "عمرة",
    cadran: [
      ["نقطة الانطلاق", "الدار البيضاء"],
      ["الطيران", "الخطوط الملكية المغربية — مباشر إلى المدينة"],
      ["المدة", "04 ليالٍ بالمدينة + 10 ليالٍ بمكة"],
      ["تواريخ المغادرة", "29 يوليوز أو 05 غشت 2026"],
      ["التأطير", "مؤطّر تقني ذو خبرة"]
    ],
    price: "17 200 درهم",
    intro: [
      "رحلة العمر، كما ينبغي أن تكون. تبدأ رحلتكم من المدينة المنوّرة، مدينة رسول الله ﷺ، حيث الطمأنينة والسكينة، والصلاة في المسجد النبوي الشريف وزيارة الروضة الشريفة.",
      "ثم إلى مكة المكرّمة، حيث تطوفون ببيت الله الحرام وتسعون بين الصفا والمروة، في أيامٍ من الخشوع والدعاء. عشر ليالٍ بجوار الحرم لتعيشوا العمرة على مهلٍ، دون عجلة.",
      "طيران مباشر إلى المدينة على الخطوط الملكية المغربية، فنادق مختارة، تنقّلات مريحة وتأطير من ذوي الخبرة: كل ما تحتاجونه لتتفرّغوا للعبادة — Voyages 21، منذ سنة 2000."
    ],
    highlights: [
      "طيران مباشر إلى المدينة المنوّرة مع الخطوط الملكية المغربية",
      "04 ليالٍ بالمدينة المنوّرة بجوار المسجد النبوي",
      "10 ليالٍ بمكة المكرّمة قرب الحرم",
      "تنقّلات بحافلة حديثة مكيّفة ومؤطّر تقني ذو خبرة",
      "زيارة المزارات بالمدينة ومكة، وحجز الروضة الشريفة عبر تطبيق نُسُك"
    ],
    programme: [
      "الدار البيضاء ← المدينة المنوّرة (طيران مباشر)",
      "المدينة المنوّرة — 04 ليالٍ (المسجد النبوي، الروضة الشريفة، المزارات)",
      "مكة المكرّمة — 10 ليالٍ (الحرم، الطواف والسعي، المزارات)",
      "العودة إلى الدار البيضاء"
    ],
    inclus: [
      "تذكرة الطائرة ذهاباً وإياباً",
      "الإقامة بالفنادق المذكورة (مع إمكانية حجز فنادق أخرى حسب الطلب)",
      "التنقّل بحافلة حديثة مكيّفة",
      "مؤطّر تقني ذو خبرة عالية في مجال العمرة والحج",
      "المزارات في المدينة المنوّرة ومكة المكرّمة",
      "حجز الروضة الشريفة عبر تطبيق نُسُك (بشكل فردي)"
    ],
    exclus: [],
    hotels: [
      "المدينة المنوّرة: إعمار طيبة",
      "مكة المكرّمة: إعمار الديوان / الخليل / المنار / إليت / رويال / جراند / الشهداء (حسب الصيغة)"
    ],
    priceTable: {
      head: ["فنادق المدينة المنوّرة", "فنادق مكة المكرّمة", "رباعية", "ثلاثية", "ثنائية"],
      rows: [
        ["إعمار طيبة — بدون إفطار", "إعمار الديوان — بدون إفطار", "17 200", "17 800", "18 900"],
        ["إعمار طيبة — بدون إفطار", "إعمار الخليل — بدون إفطار", "—", "18 750", "20 200"],
        ["إعمار طيبة — بدون إفطار", "إعمار المنار — إفطار", "18 800", "19 600", "21 000"],
        ["إعمار إليت — إفطار", "إعمار جراند — إفطار", "20 000", "20 950", "22 800"],
        ["إعمار رويال — إفطار", "إعمار الشهداء — إفطار", "22 800", "23 800", "25 800"]
      ]
    },
    datesList: ["29 يوليوز ← 12 غشت 2026", "05 غشت ← 19 غشت 2026"],
    route: ["الدار البيضاء", "المدينة المنوّرة", "مكة المكرّمة", "الدار البيضاء"],
    dates: {
      line: "تواريخ المغادرة من الدار البيضاء:",
      note: "الأسعار تختلف حسب الفندق ونوع الغرفة (من 17 200 إلى 25 800 درهم). طبقاً لقانون مكتب الصرف، تقتطع الوكالة مبلغ منحة المعتمر لأداء قيمة الفنادق والخدمات بالديار المقدّسة. الأسعار قابلة للتغيير حسب الطيران."
    },
    cta: {
      title: "هل تنوون أداء العمرة؟",
      text: "ننظّم رحلتكم على المقاس وفق تواريخكم ورغباتكم — Voyages 21، منذ سنة 2000."
    }
  },

  "omra-06-juillet": {
    lang: "ar", mediaKey: "modal-omra-06", whatsapp: "212614152686",
    eyebrow: "عمرة · رحلة مباشرة إلى المدينة المنورة", title: "عمرة 06 يوليوز", duration: "12 ليلة", tag: "عمرة",
    cadran: [
      ["نقطة الانطلاق", "الدار البيضاء"],
      ["الطيران", "الخطوط الملكية المغربية — مباشر إلى المدينة"],
      ["المدة", "04 ليالٍ بالمدينة + 08 ليالٍ بمكة"],
      ["تواريخ المغادرة", "06 / 10 / 18 / 25 يوليوز 2026"],
      ["التأطير", "أطر الوكالة"]
    ],
    price: "21 500 درهم",
    intro: [
      "عمرة في أبهى صورها. أربع ليالٍ بالمدينة المنوّرة في فندق شذا ريجنسي، بجوار المسجد النبوي الشريف، حيث الصلاة والسكينة وزيارة الروضة الشريفة.",
      "ثم ثماني ليالٍ بمكة المكرّمة في فنادق راقية قرب الحرم — أجياد مكارم، سويس، الحرم أو الفيرمونت — لتطوفوا وتسعوا في راحة وخشوع. طيران مباشر إلى المدينة على الخطوط الملكية المغربية، وتأطير من ذوي الخبرة — Voyages 21، منذ سنة 2000."
    ],
    highlights: [
      "طيران مباشر إلى المدينة المنوّرة مع الخطوط الملكية المغربية",
      "04 ليالٍ بالمدينة في فندق شذا ريجنسي قرب المسجد النبوي",
      "08 ليالٍ بمكة في فنادق راقية قرب الحرم",
      "التنقّلات داخل المملكة العربية السعودية",
      "تأطير ومساعدة من أطر الوكالة"
    ],
    programme: [
      "الدار البيضاء ← المدينة المنوّرة (طيران مباشر)",
      "المدينة المنوّرة — 04 ليالٍ (المسجد النبوي والروضة الشريفة والمزارات)",
      "مكة المكرّمة — 08 ليالٍ (الحرم، الطواف والسعي)",
      "العودة إلى الدار البيضاء"
    ],
    inclus: [
      "تذكرة الطائرة ذهاباً وإياباً على الخطوط المغربية مباشرة إلى المدينة",
      "الإقامة بالفنادق المذكورة مع التنقّلات وزيارة مزارات المدينة",
      "التأطير والمساعدة من أطر الوكالة",
      "التنقّلات داخل المملكة العربية السعودية"
    ],
    exclus: [],
    hotels: [
      "المدينة المنوّرة: فندق شذا ريجنسي (بالإفطار)",
      "مكة المكرّمة: أجياد مكة مكارم / سويس مكة / فندق الحرم / الفيرمونت (بالإفطار)"
    ],
    priceTable: {
      head: ["فندق مكة المكرّمة", "رباعية", "ثلاثية", "ثنائية"],
      rows: [
        ["أجياد مكة مكارم أو ما يعادله", "21 500", "22 500", "24 500"],
        ["سويس مكة / الحرم", "24 900", "26 500", "29 500"],
        ["الفيرمونت أو ما يعادله", "25 900", "27 500", "30 500"]
      ]
    },
    datesList: ["06/07", "10/07", "18/07", "25/07"],
    route: ["الدار البيضاء", "المدينة المنوّرة", "مكة المكرّمة", "الدار البيضاء"],
    dates: {
      line: "تواريخ المغادرة من الدار البيضاء (2026):",
      note: "بخصوص الفنادق 5 نجوم، الغرف الثلاثية والرباعية بأسرّة إضافية. جواز سفر صالح لمدة لا تقل عن 8 أشهر قبل السفر. الأسعار قابلة للتغيير حسب الطيران."
    },
    cta: { title: "هل تنوون أداء العمرة؟", text: "ننظّم رحلتكم على المقاس وفق تواريخكم ورغباتكم — Voyages 21، منذ سنة 2000." }
  },

  "omra-09-septembre-ram": {
    lang: "ar", mediaKey: "modal-omra-09-septembre", whatsapp: "212614152686",
    eyebrow: "عمرة · رحلة مباشرة إلى المدينة المنورة", title: "عمرة مباشرة مع الخطوط المغربية", duration: "14 ليلة", tag: "عمرة",
    cadran: [
      ["نقطة الانطلاق", "الدار البيضاء"],
      ["الطيران", "الخطوط الملكية المغربية — مباشر إلى المدينة"],
      ["المدة", "04 ليالٍ بالمدينة + 10 ليالٍ بمكة"],
      ["تاريخ المغادرة", "09 شتنبر 2026"],
      ["العودة", "23 شتنبر 2026"]
    ],
    price: "14 900 درهم",
    pricePrefix: "انطلاقا من",
    intro: [
      "عمرة مباشرة إلى المدينة المنورة مع الخطوط الملكية المغربية، في رحلة من 15 يوماً (14 ليلة) تجمع بين الطمأنينة بالمدينة المنورة والعبادة بمكة المكرمة.",
      "أربع ليالٍ بالمدينة المنورة، ثم عشر ليالٍ بمكة المكرمة، مع تأطير ومتابعة من طرف Voyages 21 — منذ سنة 2000."
    ],
    highlights: [
      "طيران مباشر ذهاباً وإياباً على متن الخطوط الملكية المغربية",
      "04 ليالٍ بالمدينة المنورة + 10 ليالٍ بمكة المكرمة",
      "تأشيرة الدخول إلى المملكة العربية السعودية مشمولة",
      "تنقّلات داخل الأراضي السعودية بحافلة مكيّفة",
      "التأطير التقني والمتابعة من طرف Voyages 21"
    ],
    programme: [
      "الدار البيضاء ← المدينة المنورة (طيران مباشر، 09 شتنبر)",
      "المدينة المنورة — 04 ليالٍ (المسجد النبوي والمزارات)",
      "مكة المكرمة — 10 ليالٍ (العبادة والزيارات)",
      "مكة المكرمة ← الدار البيضاء (23 شتنبر)"
    ],
    inclus: [
      "تذكرة الطائرة ذهاباً وإياباً على متن الخطوط الملكية المغربية مباشرة إلى المدينة",
      "مصاريف استخراج تأشيرة الدخول إلى المملكة العربية السعودية",
      "الإقامة بالفنادق المذكورة بالمدينة المنورة ومكة المكرمة",
      "التنقّلات داخل الأراضي السعودية بحافلة مكيّفة",
      "التأطير التقني",
      "زيارة مزارات المدينة المنورة",
      "الروضة الشريفة عبر تطبيق نسك بشكل فردي",
      "التأطير والمتابعة من طرف Voyages 21"
    ],
    exclus: [],
    hotels: [
      "المدينة المنورة: كراند بلازا المدينة (بدون إفطار) · كراند بلازا بدر المقام (بالإفطار) · ميسان الحارثية (بالإفطار) — حسب الفئة",
      "مكة المكرمة: موطن لمار (بدون إفطار) · ضيافة الرجاء (بالإفطار) · الشهداء (بالإفطار) — حسب الفئة"
    ],
    priceTable: {
      style: "hotel-pairs",
      hotelHeader: "الفندق (مكة) / الفندق (المدينة)",
      columns: ["الغرفة الخماسية", "الغرفة الرباعية", "الغرفة الثلاثية", "الغرفة الثنائية"],
      currency: "درهم",
      rows: [
        {
          hotels: [
            { city: "مكة", name: "موطن لمار (بدون إفطار)", key: "hotel-mk-watan-lamar" },
            { city: "المدينة", name: "كراند بلازا المدينة (بدون إفطار)", key: "hotel-md-grand-plaza" }
          ],
          prices: ["14 900", "15 700", "16 000", "16 800"]
        },
        {
          hotels: [
            { city: "مكة", name: "ضيافة الرجاء (بالإفطار)", key: "hotel-mk-diyafat-alraja" },
            { city: "المدينة", name: "كراند بلازا بدر المقام (بالإفطار)", key: "hotel-md-badr-almaqam" }
          ],
          prices: ["—", "18 500", "19 500", "21 500"]
        },
        {
          hotels: [
            { city: "مكة", name: "الشهداء (بالإفطار)", key: "hotel-mk-shuhada" },
            { city: "المدينة", name: "ميسان الحارثية (بالإفطار)", key: "hotel-md-maysan-harithiya" }
          ],
          prices: ["—", "21 600", "22 800", "25 500"]
        }
      ],
      note: "الأسعار بالدرهم المغربي للفرد بالغرفة."
    },
    route: ["الدار البيضاء", "المدينة المنورة", "مكة المكرمة", "الدار البيضاء"],
    dates: {
      line: "تاريخ المغادرة من الدار البيضاء: 09 شتنبر 2026 (عودة 23 شتنبر 2026)",
      note: "جواز سفر صالح لمدة لا تقل عن 6 أشهر قبل موعد السفر. الوكالة لا تتحمل أي مسؤولية عن الوزن الزائد وكذلك ضياع الأمتعة."
    },
    cta: { title: "هل تنوون أداء العمرة في شتنبر؟", text: "عمرة مباشرة إلى المدينة المنورة، منظّمة بعناية — Voyages 21، منذ سنة 2000." }
  },

  "omra-24-septembre-saudia": {
    lang: "ar", mediaKey: "modal-omra-24-septembre", whatsapp: "212614152686",
    eyebrow: "عمرة · رحلة عبر الخطوط السعودية عبر جدة", title: "عمرة مباشرة مع الخطوط السعودية", duration: "11 ليلة", tag: "عمرة",
    cadran: [
      ["نقطة الانطلاق", "الدار البيضاء"],
      ["الطيران", "الخطوط السعودية — عبر جدة"],
      ["المدة", "04 ليالٍ بالمدينة + 07 ليالٍ بمكة"],
      ["تاريخ المغادرة", "24 شتنبر 2026"],
      ["العودة", "05 أكتوبر 2026"]
    ],
    price: "13 500 درهم",
    pricePrefix: "انطلاقا من",
    intro: [
      "عمرة عبر الخطوط السعودية عبر جدة، في رحلة من 12 يوماً (11 ليلة) تجمع بين الإقامة بالمدينة المنورة ومكة المكرمة.",
      "أربع ليالٍ بالمدينة المنورة، ثم سبع ليالٍ بمكة المكرمة، مع تأطير ومتابعة من طرف Voyages 21 — منذ سنة 2000."
    ],
    highlights: [
      "طيران ذهاباً وإياباً على متن الخطوط السعودية عبر جدة",
      "04 ليالٍ بالمدينة المنورة + 07 ليالٍ بمكة المكرمة",
      "تأشيرة الدخول إلى المملكة العربية السعودية مشمولة",
      "تنقّلات داخل الأراضي السعودية بحافلة مكيّفة",
      "التأطير التقني والمتابعة من طرف Voyages 21"
    ],
    programme: [
      "الدار البيضاء ← المدينة المنورة عبر جدة (24 شتنبر)",
      "المدينة المنورة — 04 ليالٍ (المسجد النبوي والمزارات)",
      "مكة المكرمة — 07 ليالٍ (العبادة والزيارات)",
      "مكة المكرمة ← الدار البيضاء عبر جدة (05 أكتوبر)"
    ],
    inclus: [
      "تذكرة الطائرة ذهاباً وإياباً على متن الخطوط السعودية عبر جدة",
      "مصاريف استخراج تأشيرة الدخول إلى المملكة العربية السعودية",
      "الإقامة بالفنادق المذكورة بالمدينة المنورة ومكة المكرمة",
      "التنقّلات داخل الأراضي السعودية بحافلة مكيّفة",
      "التأطير التقني",
      "زيارة مزارات المدينة المنورة",
      "الروضة الشريفة عبر تطبيق نسك بشكل فردي",
      "التأطير والمتابعة من طرف Voyages 21"
    ],
    exclus: [],
    hotels: [
      "المدينة المنورة: كراند بلازا المدينة (بدون إفطار) · كراند بلازا بدر المقام (بالإفطار) · ميسان الحارثية (بالإفطار) — حسب الفئة",
      "مكة المكرمة: موطن لمار (بدون إفطار) · ضيافة الرجاء (بالإفطار) · الشهداء (بالإفطار) — حسب الفئة"
    ],
    priceTable: {
      style: "hotel-pairs",
      hotelHeader: "الفندق (مكة) / الفندق (المدينة)",
      columns: ["الغرفة الخماسية", "الغرفة الرباعية", "الغرفة الثلاثية", "الغرفة الثنائية"],
      currency: "درهم",
      rows: [
        {
          hotels: [
            { city: "مكة", name: "موطن لمار (بدون إفطار)", key: "hotel-mk-watan-lamar" },
            { city: "المدينة", name: "كراند بلازا المدينة (بدون إفطار)", key: "hotel-md-grand-plaza" }
          ],
          prices: ["13 500", "14 000", "14 500", "15 000"]
        },
        {
          hotels: [
            { city: "مكة", name: "ضيافة الرجاء (بالإفطار)", key: "hotel-mk-diyafat-alraja" },
            { city: "المدينة", name: "كراند بلازا بدر المقام (بالإفطار)", key: "hotel-md-badr-almaqam" }
          ],
          prices: ["—", "16 000", "16 800", "18 200"]
        },
        {
          hotels: [
            { city: "مكة", name: "الشهداء (بالإفطار)", key: "hotel-mk-shuhada" },
            { city: "المدينة", name: "ميسان الحارثية (بالإفطار)", key: "hotel-md-maysan-harithiya" }
          ],
          prices: ["—", "17 900", "19 000", "20 900"]
        }
      ],
      note: "الأسعار بالدرهم المغربي للفرد بالغرفة."
    },
    route: ["الدار البيضاء", "المدينة المنورة", "مكة المكرمة", "الدار البيضاء"],
    dates: {
      line: "تاريخ المغادرة من الدار البيضاء: 24 شتنبر 2026 (عودة 05 أكتوبر 2026)",
      note: "جواز سفر صالح لمدة لا تقل عن 6 أشهر قبل موعد السفر. الوكالة لا تتحمل أي مسؤولية عن الوزن الزائد وكذلك ضياع الأمتعة."
    },
    cta: { title: "هل تنوون أداء العمرة نهاية شتنبر؟", text: "عمرة عبر الخطوط السعودية، منظّمة بعناية — Voyages 21، منذ سنة 2000." }
  },

  "omra-08-juillet": {
    lang: "ar", mediaKey: "modal-omra-08", whatsapp: "212614152686",
    eyebrow: "عمرة · رحلة مباشرة إلى المدينة المنورة", title: "عمرة 08 يوليوز", duration: "10 ليالٍ", tag: "عمرة",
    cadran: [
      ["نقطة الانطلاق", "الدار البيضاء"],
      ["الطيران", "الخطوط الملكية المغربية — مباشر إلى المدينة"],
      ["المدة", "04 ليالٍ بالمدينة + 06 ليالٍ بمكة"],
      ["تواريخ المغادرة", "08 ← 18 يوليوز 2026"],
      ["التأطير", "مؤطّر تقني ذو خبرة"]
    ],
    price: "16 850 درهم",
    intro: [
      "عمرة ميسّرة في عشر ليالٍ. أربع ليالٍ بالمدينة المنوّرة بجوار المسجد النبوي الشريف، للصلاة وزيارة الروضة الشريفة في طمأنينة.",
      "ثم ست ليالٍ بمكة المكرّمة في فنادق إعمار قرب الحرم، لأداء العمرة في خشوع. طيران مباشر إلى المدينة على الخطوط الملكية المغربية — Voyages 21، منذ سنة 2000."
    ],
    highlights: [
      "طيران مباشر إلى المدينة المنوّرة مع الخطوط الملكية المغربية",
      "04 ليالٍ بالمدينة المنوّرة قرب المسجد النبوي",
      "06 ليالٍ بمكة المكرّمة قرب الحرم",
      "تنقّلات بحافلة حديثة مكيّفة ومؤطّر تقني ذو خبرة",
      "زيارة المزارات بالمدينة ومكة"
    ],
    programme: [
      "الدار البيضاء ← المدينة المنوّرة (طيران مباشر)",
      "المدينة المنوّرة — 04 ليالٍ",
      "مكة المكرّمة — 06 ليالٍ",
      "العودة إلى الدار البيضاء"
    ],
    inclus: [
      "تذكرة الطائرة ذهاباً وإياباً",
      "الإقامة بالفنادق المذكورة (مع إمكانية حجز فنادق أخرى حسب الطلب)",
      "التنقّل بحافلة حديثة مكيّفة",
      "مؤطّر تقني ذو خبرة عالية في مجال العمرة والحج",
      "المزارات في المدينة المنوّرة ومكة المكرّمة"
    ],
    exclus: [],
    hotels: [
      "المدينة المنوّرة: إعمار طيبة",
      "مكة المكرّمة: إعمار الديوان / الخليل / المنار / البيت / جراند / رويال / الشهداء (حسب الصيغة)"
    ],
    priceTable: {
      head: ["فندق مكة المكرّمة", "رباعية", "ثلاثية", "ثنائية"],
      rows: [
        ["إعمار الديوان (بدون إفطار)", "16 850", "17 300", "18 200"],
        ["إعمار الخليل (بدون إفطار)", "—", "17 900", "19 000"],
        ["إعمار المنار (بدون إفطار)", "17 800", "18 400", "19 500"],
        ["إعمار البيت / جراند (بالإفطار)", "19 000", "19 700", "21 000"],
        ["إعمار رويال / الشهداء (بالإفطار)", "21 000", "21 900", "23 500"]
      ]
    },
    datesList: ["08/07 ← 18/07 2026"],
    route: ["الدار البيضاء", "المدينة المنوّرة", "مكة المكرّمة", "الدار البيضاء"],
    dates: {
      line: "تاريخ المغادرة من الدار البيضاء:",
      note: "مع إمكانية حجز فنادق أخرى حسب الطلب. الأسعار قابلة للتغيير حسب الطيران."
    },
    cta: { title: "هل تنوون أداء العمرة؟", text: "ننظّم رحلتكم على المقاس وفق تواريخكم ورغباتكم — Voyages 21، منذ سنة 2000." }
  },

  "omra-istanbul": {
    lang: "ar", mediaKey: "modal-omra-istanbul", whatsapp: "212614152686",
    eyebrow: "عمرة مع إسطنبول · الخطوط التركية", title: "عمرة مع إسطنبول", duration: "14 ليلة", tag: "عمرة",
    cadran: [
      ["نقطة الانطلاق", "الدار البيضاء"],
      ["الطيران", "الخطوط التركية — عبر إسطنبول، الوصول جدّة"],
      ["المدة", "04 ليالٍ بإسطنبول + 06 بمكة + 04 بالمدينة"],
      ["تواريخ المغادرة", "05 ← 19 يوليوز 2026"],
      ["التأطير", "مؤطّر تقني ذو خبرة"]
    ],
    price: "20 000 درهم",
    intro: [
      "عمرة مع لمسة من إسطنبول. تبدأ رحلتكم بأربع ليالٍ في إسطنبول، الجسر بين القارّتين، بين القباب والمساجد العثمانية، قبل التوجّه إلى الديار المقدّسة.",
      "ثم ست ليالٍ بمكة المكرّمة وأربع بالمدينة المنوّرة، لأداء العمرة وزيارة المسجد النبوي في خشوع. طيران مع الخطوط التركية والوصول عبر جدّة — Voyages 21، منذ سنة 2000."
    ],
    highlights: [
      "04 ليالٍ بإسطنبول، الجسر بين أوروبا وآسيا",
      "06 ليالٍ بمكة المكرّمة قرب الحرم",
      "04 ليالٍ بالمدينة المنوّرة قرب المسجد النبوي",
      "طيران مع الخطوط التركية",
      "تنقّلات بحافلة حديثة مكيّفة ومؤطّر تقني ذو خبرة"
    ],
    programme: [
      "الدار البيضاء ← إسطنبول (الخطوط التركية)",
      "إسطنبول — 04 ليالٍ",
      "مكة المكرّمة — 06 ليالٍ (الوصول عبر جدّة)",
      "المدينة المنوّرة — 04 ليالٍ",
      "العودة إلى الدار البيضاء"
    ],
    inclus: [
      "تذكرة الطائرة ذهاباً وإياباً مع الخطوط التركية",
      "الإقامة بالفنادق المذكورة (مع إمكانية حجز فنادق أخرى حسب الطلب)",
      "التنقّل بحافلة حديثة مكيّفة",
      "مؤطّر تقني ذو خبرة عالية في مجال العمرة والحج",
      "المزارات في المدينة المنوّرة ومكة المكرّمة"
    ],
    exclus: [],
    hotels: [
      "إسطنبول: رمادا سلطان أحمد (بالإفطار)",
      "مكة المكرّمة: إعمار الخليل / المنار / البيت / جراند / رويال / الشهداء",
      "المدينة المنوّرة: إعمار طيبة"
    ],
    priceTable: {
      head: ["فندق مكة المكرّمة", "رباعية", "ثلاثية", "ثنائية"],
      rows: [
        ["إعمار الخليل", "20 000", "", "21 500"],
        ["إعمار المنار", "20 300", "20 600", "22 000"],
        ["إعمار البيت / جراند", "21 500", "22 000", "23 500"],
        ["إعمار رويال / الشهداء", "23 000", "23 600", "25 500"]
      ]
    },
    datesList: ["05/07 ← 19/07 2026"],
    route: ["الدار البيضاء", "إسطنبول", "مكة المكرّمة", "المدينة المنوّرة", "الدار البيضاء"],
    dates: {
      line: "تاريخ المغادرة من الدار البيضاء:",
      note: "مع إمكانية حجز فنادق أخرى حسب الطلب. الأسعار قابلة للتغيير حسب الطيران."
    },
    cta: { title: "هل تنوون أداء العمرة مع إسطنبول؟", text: "ننظّم رحلتكم على المقاس وفق تواريخكم ورغباتكم — Voyages 21، منذ سنة 2000." }
  },


  "omra-27-juillet-etihad": {
    lang: "ar", mediaKey: "modal-omra-27-juillet-etihad", whatsapp: "212614152686",
    eyebrow: "عمرة · الاتحاد للطيران عبر أبو ظبي", title: "عمرتين في عمرة واحدة", duration: "19 ليلة", tag: "عمرة",
    cadran: [
      ["نقطة الانطلاق", "الدار البيضاء"],
      ["الطيران", "الاتحاد للطيران — عبر أبو ظبي إلى جدة"],
      ["المدة", "09 ليالٍ بمكة + 04 ليالٍ بالمدينة + 06 ليالٍ بمكة"],
      ["تاريخ الذهاب", "27/07/2026"],
      ["تاريخ العودة", "15/08/2026"],
      ["الوصول", "مطار جدة عبر أبو ظبي"]
    ],
    price: "12 900 درهم",
    intro: [
      "برنامج عمرة مميز بعنوان عمرتين في عمرة واحدة، على متن الاتحاد للطيران عبر أبو ظبي إلى مطار جدة.",
      "الإقامة تبدأ بمكة المكرمة، ثم المدينة المنورة، ثم العودة إلى مكة المكرمة، مع اختيارات فنادق وأسعار حسب نوع الغرفة."
    ],
    highlights: [
      "رحلة على متن الاتحاد للطيران عبر أبو ظبي",
      "09 ليالٍ أولى بمكة من 27/07 إلى 05/08",
      "04 ليالٍ بالمدينة من 05/08 إلى 09/08",
      "06 ليالٍ أخيرة بمكة من 09/08 إلى 15/08",
      "ثلاث صيغ أسعار حسب الفنادق ونوع الغرفة"
    ],
    programme: [
      "27 يوليوز: الدار البيضاء — أبو ظبي — جدة",
      "27 يوليوز إلى 05 غشت: الإقامة بمكة المكرمة 09 ليالٍ",
      "05 غشت إلى 09 غشت: الإقامة بالمدينة المنورة 04 ليالٍ",
      "09 غشت إلى 15 غشت: الإقامة بمكة المكرمة 06 ليالٍ",
      "15 غشت: جدة — أبو ظبي، ثم 16 غشت أبو ظبي — الدار البيضاء"
    ],
    inclus: [
      "تذكرة الطائرة ذهاباً وإياباً على متن الاتحاد للطيران عبر أبو ظبي",
      "الإقامة بالفنادق المذكورة أو ما يعادلها",
      "التنقلات داخل المملكة العربية السعودية",
      "التأطير والمساعدة من طرف أطر الوكالة"
    ],
    exclus: [
      "المصاريف الشخصية",
      "أي خدمات غير مذكورة ضمن البرنامج",
      "أي ارتفاع مفاجئ في أسعار الطيران"
    ],
    hotels: [
      "مكة: فندق روابي الحجاز أو فندق فلسطين أو فندق ضيافة الرجاء حسب الصيغة",
      "المدينة: فندق ديار الإيمان أو ما يعادله"
    ],
    priceTable: {
      head: ["الفنادق", "ثنائية", "ثلاثية", "رباعية"],
      rows: [
        ["روابي الحجاز بمكة + ديار الإيمان بالمدينة، بدون وجبات", "15 500", "14 500", "12 900"],
        ["فندق فلسطين بمكة + ديار الإيمان بالمدينة، بدون وجبات", "17 900", "15 900", "14 900"],
        ["ضيافة الرجاء بمكة + ديار الإيمان بالمدينة، بالإفطار", "18 900", "16 900", "15 900"]
      ]
    },
    datesList: ["27/07/2026 إلى 15/08/2026"],
    route: ["الدار البيضاء", "أبو ظبي", "جدة", "مكة", "المدينة", "مكة", "جدة", "أبو ظبي", "الدار البيضاء"],
    dates: { line: "تواريخ الرحلة: الذهاب 27/07/2026، العودة من جدة 15/08/2026، الوصول إلى الدار البيضاء 16/08/2026.", note: "الأسعار قابلة للتغيير في حالة ارتفاع مفاجئ في أسعار الطيران. جواز السفر يجب أن يكون صالحاً لمدة لا تقل عن 8 أشهر." },
    cta: { title: "هل ترغبون في عمرتين في رحلة واحدة؟", text: "نرتب لكم البرنامج مع الإقامة والتنقلات والتأطير حسب الصيغة المناسبة لكم." }
  },

  "omra-01-juillet": {
    lang: "ar", mediaKey: "modal-omra-01", whatsapp: "212614152686",
    eyebrow: "عمرة · صيغة اقتصادية", title: "عمرة 01 يوليوز", duration: "12 ليلة", tag: "عمرة",
    cadran: [
      ["نقطة الانطلاق", "الدار البيضاء"],
      ["الطيران", "الخطوط الملكية المغربية — مباشر إلى المدينة"],
      ["المدة", "04 ليالٍ بالمدينة + 08 ليالٍ بمكة"],
      ["تواريخ المغادرة", "01 / 05 / 08 يوليوز 2026"],
      ["الصيغة", "اقتصادية"]
    ],
    price: "15 900 درهم",
    intro: [
      "عمرة في المتناول، دون تنازل عن جوهر الرحلة. أربع ليالٍ بالمدينة المنوّرة بجوار المسجد النبوي الشريف، وزيارة الروضة الشريفة.",
      "ثم ثماني ليالٍ بمكة المكرّمة قرب الحرم، لأداء العمرة في يُسرٍ وطمأنينة. طيران مباشر إلى المدينة على الخطوط الملكية المغربية — Voyages 21، منذ سنة 2000."
    ],
    highlights: [
      "طيران مباشر إلى المدينة المنوّرة مع الخطوط الملكية المغربية",
      "04 ليالٍ بالمدينة المنوّرة قرب المسجد النبوي",
      "08 ليالٍ بمكة المكرّمة قرب الحرم",
      "صيغة اقتصادية بأسعار في المتناول",
      "التأطير والمساعدة من أطر الوكالة"
    ],
    programme: [
      "الدار البيضاء ← المدينة المنوّرة (طيران مباشر)",
      "المدينة المنوّرة — 04 ليالٍ",
      "مكة المكرّمة — 08 ليالٍ",
      "العودة إلى الدار البيضاء"
    ],
    inclus: [
      "تذكرة الطائرة ذهاباً وإياباً على الخطوط المغربية مباشرة إلى المدينة",
      "الإقامة بالفنادق المذكورة مع التنقّلات وزيارة مزارات المدينة",
      "التأطير والمساعدة من أطر الوكالة",
      "التنقّلات داخل المملكة العربية السعودية"
    ],
    exclus: [],
    hotels: [
      "المدينة المنوّرة: مجموعة المختارة (بدون وجبات) أو ديار الإيمان (بالإفطار)",
      "مكة المكرّمة: فندق فلسطين (بدون وجبات) أو ضيافة الرجاء (بالإفطار)"
    ],
    priceTable: {
      head: ["الصيغة", "رباعية", "ثلاثية", "ثنائية"],
      rows: [
        ["فلسطين (بدون وجبات)", "15 900", "16 700", "17 900"],
        ["ضيافة الرجاء (بالإفطار)", "17 900", "18 700", "19 900"]
      ]
    },
    datesList: ["01/07", "05/07", "08/07"],
    route: ["الدار البيضاء", "المدينة المنوّرة", "مكة المكرّمة", "الدار البيضاء"],
    dates: {
      line: "تواريخ المغادرة من الدار البيضاء (2026):",
      note: "بخصوص الفنادق 5 نجوم، الغرف الثلاثية والرباعية بأسرّة إضافية. جواز سفر صالح لمدة لا تقل عن 8 أشهر قبل السفر. الأسعار قابلة للتغيير حسب الطيران."
    },
    cta: { title: "هل تنوون أداء العمرة؟", text: "ننظّم رحلتكم على المقاس وفق تواريخكم ورغباتكم — Voyages 21، منذ سنة 2000." }
  },

  "maroc-merzouga": {
    mediaKey: "modal-maroc-merzouga",
    whatsapp: "212614152686",
    eyebrow: "Mon Maroc · Départ garanti 2026",
    title: "Merzouga — Marrakech · Ouarzazate · Dadès",
    duration: "Circuit",
    tag: "Maroc",
    cadran: [
      ["Départ", "Marrakech"],
      ["Destination", "Merzouga — Erg Chebbi"],
      ["Étapes", "Ouarzazate · Dadès · Todra · Merzouga"],
      ["Transport", "Inclus — véhicule touristique"],
      ["Pension", "Hébergement + repas mentionnés"],
      ["Départs", "Garantis chaque jour en 2026"]
    ],
    price: "1 200 DH",
    intro: [
      "Quelque part au-delà des Haut Atlas et des kasbahs de terre ocre, les dunes de l'Erg Chebbi surgissent de la plaine comme une promesse de bout du monde. Ce circuit vous emmène de Marrakech au cœur du Sahara marocain, à travers des paysages qui changent à chaque virage.",
      "La route longe les gorges du Dadès, suspendues entre falaises roses et jardins d'amandiers. Plus loin, les gorges de Todra, failles vertigineuses où le soleil ne pénètre qu'à certaines heures. Et enfin Merzouga, ses dunes qui rougeoient au coucher du soleil, et une nuit en tente berbère au silence du désert.",
      "Un départ garanti chaque jour, au départ de Marrakech. Transport, hébergement et repas mentionnés inclus — il ne reste qu'à laisser le Maroc vous surprendre."
    ],
    highlights: [
      "Les gorges du Dadès et les kasbahs de terre rose",
      "Les gorges de Todra, failles spectaculaires au cœur du Haut Atlas",
      "Les dunes de l'Erg Chebbi à Merzouga, au lever et coucher du soleil",
      "Nuit sous tente berbère au bord des dunes",
      "Balade à dos de dromadaire incluse"
    ],
    days: [
      { num: "J1", title: "Marrakech – Ouarzazate – Dadès",
        text: "Départ de Marrakech tôt le matin. Route vers Ouarzazate via le col du Tichka (2 260 m). Visite de la kasbah Aït Ben Haddou (classée UNESCO). Poursuite vers les gorges du Dadès. Installation et nuit.",
        meta: [["Nuit", "Gorges du Dadès"]] },
      { num: "J2", title: "Dadès – Gorges de Todra – Merzouga",
        text: "Après le petit-déjeuner, visite des gorges de Todra. Route vers Errachidia puis Merzouga. Arrivée aux dunes en fin d'après-midi. Balade à dos de dromadaire au coucher du soleil. Nuit sous tente berbère.",
        meta: [["Repas", "petit-déjeuner"], ["Nuit", "Camp désert — Merzouga"]] },
      { num: "J3", title: "Merzouga – Retour Marrakech",
        text: "Lever au soleil sur les dunes. Petit-déjeuner au camp. Route retour vers Marrakech. Arrivée en fin de journée.",
        meta: [["Repas", "petit-déjeuner"]] }
    ],
    inclus: [
      "Transport en véhicule touristique (départ Marrakech)",
      "Hébergement (2 nuits : hôtel + nuit en tente berbère)",
      "Repas mentionnés au programme",
      "Balade à dos de dromadaire",
      "L'assistance de Voyages 21"
    ],
    exclus: [
      "Les repas non mentionnés",
      "Les extras et les boissons",
      "Les pourboires des guides et chauffeurs"
    ],
    hotels: ["Hôtel en route (Dadès ou Todra)", "Camp berbère sous tente — Merzouga"],
    priceTable: {
      head: ["Catégorie", "Type", "Prix / pers."],
      rows: [
        ["Partagé", "Standard", "1 200 DH"]
      ]
    },
    children: "Tarifs enfants sur demande",
    route: ["Marrakech", "Ouarzazate", "Aït Ben Haddou", "Gorges du Dadès", "Gorges de Todra", "Merzouga"],
    dates: {
      line: "Départ garanti chaque jour en 2026, au départ de Marrakech.",
      note: "Contactez-nous pour les disponibilités et tarifs groupes."
    },
    cta: {
      title: "Envie de découvrir le désert marocain ?",
      text: "Nous organisons votre circuit sur mesure, selon vos dates et votre groupe — comme nous le faisons depuis 2000."
    }
  },

  "maroc-bin-el-ouidane": {
    mediaKey: "modal-maroc-bin-el-ouidane",
    whatsapp: "212614152686",
    eyebrow: "Mon Maroc · Week-end nature 2026",
    title: "Bin El Ouidane — La beauté divine de la nature",
    duration: "2 jours / 1 nuit",
    tag: "Maroc",
    cadran: [
      ["Départ", "Marrakech"],
      ["Destination", "Lac de Bin El Ouidane"],
      ["Durée", "2 jours / 1 nuit"],
      ["Transport", "Inclus"],
      ["Pension", "Hôtel + programme organisé"],
      ["Prochains départs", "03–04 mai · 10–11 mai 2026"]
    ],
    price: "1 100 DH",
    intro: [
      "À deux heures de Marrakech, niché entre les plis du Haut Atlas, le lac de Bin El Ouidane est l'un des plus beaux secrets du Maroc. Ses eaux turquoise découpent la montagne, les aigles planent dans le silence, et le temps s'étire à la mesure du paysage.",
      "Ce week-end nature est conçu pour souffler : programme de visites organisé, hôtel au bord du lac, transport pris en charge depuis Marrakech. Deux jours, une nuit, pour se rappeler que le plus beau voyage est parfois le plus proche."
    ],
    highlights: [
      "Le lac de Bin El Ouidane, joyau turquoise du Haut Atlas",
      "Programme de visites et activités nature organisé",
      "Hôtel au bord du lac",
      "Transport inclus depuis Marrakech",
      "Week-end accessible à tous"
    ],
    days: [
      { num: "J1", title: "Marrakech – Bin El Ouidane",
        text: "Départ de Marrakech tôt le matin. Route vers Azilal et Bin El Ouidane. Arrivée au lac, installation à l'hôtel. Après-midi : programme de visites et activités nature au bord de l'eau. Soirée et nuit au lac.",
        meta: [["Nuit", "Bin El Ouidane"]] },
      { num: "J2", title: "Bin El Ouidane – Marrakech",
        text: "Petit-déjeuner à l'hôtel. Matinée libre au bord du lac. Départ après le déjeuner, retour à Marrakech en fin d'après-midi.",
        meta: [["Repas", "petit-déjeuner"]] }
    ],
    inclus: [
      "Transport aller-retour depuis Marrakech",
      "1 nuit à l'hôtel au bord du lac",
      "Programme de visites organisé",
      "L'assistance de Voyages 21"
    ],
    exclus: [
      "Les repas non mentionnés",
      "Les activités nautiques en option",
      "Les extras"
    ],
    hotels: ["Hôtel au bord du lac de Bin El Ouidane"],
    priceTable: {
      head: ["Catégorie", "Type", "Prix / pers."],
      rows: [
        ["Double", "Standard", "1 100 DH"]
      ]
    },
    children: "Tarifs enfants sur demande",
    route: ["Marrakech", "Azilal", "Bin El Ouidane", "Marrakech"],
    dates: {
      line: "Prochains départs : 03–04 mai · 10–11 mai 2026 · et autres dates.",
      note: "Contactez-nous pour les disponibilités et tarifs groupes."
    },
    cta: {
      title: "Envie d'un week-end au cœur de la nature ?",
      text: "Nous organisons votre escapade sur mesure, selon vos dates — comme nous le faisons depuis 2000."
    }
  },

  "maroc-dakhla": {
    mediaKey: "modal-maroc-dakhla",
    whatsapp: "212614152686",
    eyebrow: "Mon Maroc · Wini Bik — Dakhla 2026",
    title: "Dakhla — Wini Bik",
    duration: "4 jours / 3 nuits",
    tag: "Maroc",
    cadran: [
      ["Départ", "Casablanca"],
      ["Destination", "Dakhla, Sahara atlantique"],
      ["Durée", "4 jours / 3 nuits"],
      ["Vols", "Inclus — aller-retour"],
      ["Pension", "Hôtel + excursions + transport"],
      ["Formule", "Tout compris"]
    ],
    price: "5 500 DH",
    intro: [
      "Dakhla est une péninsule posée entre deux infinis : le Sahara d'un côté, l'Atlantique de l'autre. Une lagune turquoise de 40 kilomètres, battue par un vent régulier qui en a fait la capitale mondiale du kitesurf — et un paradis pour ceux qui cherchent simplement l'espace, le silence et la lumière.",
      "Ce séjour est un tout compris : vols, hôtel, excursions et transport sur place. Quatre jours pour découvrir la lagune de Dakhla depuis une pirogue, vous perdre dans les dunes roses de Lassarga, ou regarder les kitesurfeurs tracer sur l'eau comme des oiseaux. Le tout dans une lumière que l'Atlantique rend incomparable.",
      "Wini Bik — littéralement « je suis avec toi » — c'est l'esprit de ce voyage : une destination hors des sentiers battus, organisée avec le soin de Voyages 21 depuis Marrakech."
    ],
    highlights: [
      "La lagune de Dakhla, turquoise et venteuse, entre désert et océan",
      "Les dunes roses de Lassarga au coucher du soleil",
      "Excursions organisées : lagune, dunes, ville",
      "Vols aller-retour et transport sur place inclus",
      "Capital mondiale du kitesurf et paradis de la glisse"
    ],
    days: [
      { num: "J1", title: "Casablanca – Dakhla",
        text: "Vol au départ de Casablanca vers Dakhla. Accueil à l'aéroport et transfert à l'hôtel. Installation et présentation du séjour. Soirée libre.",
        meta: [["Nuit", "Dakhla"]] },
      { num: "J2", title: "Dakhla — Excursion lagune et dunes",
        text: "Journée d'excursion : balade en pirogue sur la lagune de Dakhla, visite des dunes roses de Lassarga. Coucher de soleil face à l'Atlantique. Retour à l'hôtel.",
        meta: [["Repas", "petit-déjeuner"], ["Nuit", "Dakhla"]] },
      { num: "J3", title: "Dakhla — Ville et activités libres",
        text: "Matinée : visite de la ville de Dakhla, marché aux poissons, corniche. Après-midi libre : plage, kitesurf (en option), kayak. Soirée à l'hôtel.",
        meta: [["Repas", "petit-déjeuner"], ["Nuit", "Dakhla"]] },
      { num: "J4", title: "Dakhla – Casablanca",
        text: "Petit-déjeuner à l'hôtel. Transfert à l'aéroport. Vol retour vers Casablanca. Fin de nos services.",
        meta: [["Repas", "petit-déjeuner"]] }
    ],
    inclus: [
      "Le billet d'avion aller-retour Casablanca / Dakhla",
      "3 nuits à l'hôtel à Dakhla",
      "Excursions (lagune, dunes de Lassarga)",
      "Transferts aéroport / hôtel",
      "L'assistance de Voyages 21"
    ],
    exclus: [
      "Les activités nautiques en option (kitesurf, paddle)",
      "Les repas non mentionnés",
      "Les extras et les boissons",
      "Les pourboires"
    ],
    hotels: ["Hôtel à Dakhla (3 nuits)"],
    priceTable: {
      head: ["Catégorie", "Type", "Prix / pers."],
      rows: [
        ["Double", "Tout compris", "5 500 DH"]
      ]
    },
    children: "Tarifs enfants sur demande",
    route: ["Casablanca", "Dakhla", "Lagune", "Lassarga", "Casablanca"],
    dates: {
      line: "Départs disponibles en 2026 depuis Casablanca.",
      note: "Contactez-nous pour les disponibilités et tarifs groupes."
    },
    cta: {
      title: "Envie de découvrir Dakhla ?",
      text: "Nous organisons votre séjour sur mesure, selon vos dates et vos envies — comme nous le faisons depuis 2000."
    }
  },

  "maroc-circuit-imperial-south": {
    mediaKey: "modal-circuit-imperial-south",
    whatsapp: "212614152686",
    eyebrow: "Mon Maroc · Circuits 2026",
    title: "Imperial Cities & Southern Morocco",
    duration: "8 jours / 7 nuits",
    tag: "Maroc",
    cadran: [
      ["Départ", "Casablanca"],
      ["Arrivée", "Marrakech"],
      ["Durée", "8 jours / 7 nuits"],
      ["Transport", "Véhicule touristique"],
      ["Pension", "Logement + petits-déjeuners"],
      ["Guide", "Arabophone + local UNESCO"]
    ],
    price: "1 117 USD",
    intro: [
      "Du blanc immaculé de Casablanca jusqu'aux dunes ocres de l'Erg Chebbi, ce circuit vous mène à travers les grandes pages de l'histoire marocaine. Vous traverserez les villes impériales, vous perdrez dans les ruelles de la médina de Fez classée UNESCO, et vous éveillerez au son du désert à Merzouga.",
      "La route descend ensuite vers Aït Ben Haddou, kasbah de terre millénaire inscrite elle aussi au patrimoine mondial, avant d'achever son chemin dans la douceur rouge de Marrakech. Huit jours pour toucher le Maroc dans sa plus grande diversité — côtes atlantiques, villes impériales, Sahara et routes des kasbahs."
    ],
    highlights: [
      "La médina de Fez (UNESCO) et la Bou Inania Madrasa",
      "Chefchaouen, la ville bleue du Rif",
      "Les dunes de l'Erg Chebbi à Merzouga, nuit sous tente berbère",
      "Aït Ben Haddou, kasbah millénaire classée UNESCO",
      "Le Bahia Palace et la Koutoubia à Marrakech"
    ],
    days: [
      { num: "J1", title: "Arrivée à Casablanca",
        text: "Accueil à l'aéroport Mohammed V. Visite de la Mosquée Hassan II, l'une des plus grandes du monde. Installation à l'hôtel.",
        meta: [["Nuit", "Casablanca"]] },
      { num: "J2", title: "Casablanca – Rabat – Chefchaouen",
        text: "Départ pour Rabat, capitale du royaume. Visite du Mausolée Mohammed V et de la Tour Hassan. Route vers Chefchaouen, la perle bleue du Rif. Découverte des ruelles aux teintes indigo et cobalt.",
        meta: [["Nuit", "Chefchaouen"]] },
      { num: "J3", title: "Chefchaouen – Fez",
        text: "Matinée libre à Chefchaouen. Route vers Fez, capitale spirituelle du Maroc. Première découverte des remparts et de la médina.",
        meta: [["Nuit", "Fez"]] },
      { num: "J4", title: "Fez — Ville impériale (UNESCO)",
        text: "Journée complète dans la médina de Fez, la plus grande médina du monde. Visite guidée : Bou Inania Madrasa, tanneries Chouara, fondouk des marchands, quartier Al-Andalus.",
        meta: [["Nuit", "Fez"], ["Guide", "local inclus"]] },
      { num: "J5", title: "Fez – Route du désert – Merzouga",
        text: "Départ tôt vers le Sahara. Route via Midelt et Errachidia. Arrivée à Merzouga en fin d'après-midi. Balade à dos de dromadaire au coucher du soleil. Nuit sous tente berbère.",
        meta: [["Nuit", "Camp berbère — Merzouga"]] },
      { num: "J6", title: "Merzouga – Ouarzazate – Aït Ben Haddou",
        text: "Lever sur les dunes au soleil matinal. Route des kasbahs vers Ouarzazate. Visite d'Aït Ben Haddou, village fortifié classé au patrimoine mondial UNESCO.",
        meta: [["Nuit", "Ouarzazate"]] },
      { num: "J7", title: "Ouarzazate – Marrakech",
        text: "Traversée du col du Tichka (2 260 m). Arrivée à Marrakech. Découverte de la place Jemaa el-Fna et du souk.",
        meta: [["Nuit", "Marrakech"]] },
      { num: "J8", title: "Marrakech — Visite et départ",
        text: "Visite du Bahia Palace et de la Koutoubia. Après-midi libre dans les souks. Transfert à l'aéroport selon votre vol.",
        meta: [["Repas", "petit-déjeuner"]] }
    ],
    inclus: [
      "Transport en véhicule touristique climatisé",
      "7 nuits en hôtels et camp berbère",
      "Petits-déjeuners inclus chaque matin",
      "Guide arabophone pour le circuit",
      "Guide local pour la médina de Fez",
      "Balade à dos de dromadaire à Merzouga",
      "Les visites de sites mentionnés au programme",
      "L'assistance de Voyages 21"
    ],
    exclus: [
      "Les vols internationaux",
      "Les déjeuners et dîners sauf mention",
      "Les entrées dans les musées non mentionnées",
      "Les pourboires et extras personnels"
    ],
    hotels: [
      "Casablanca — hôtel 4★",
      "Chefchaouen — riad de charme",
      "Fez — riad médina 4★",
      "Merzouga — camp berbère sous tente",
      "Ouarzazate — hôtel 4★",
      "Marrakech — hôtel 4★"
    ],
    priceTable: {
      head: ["Saison", "Base 20", "Base 25", "Base 30", "Base 35", "Base 40", "Suppl. single"],
      rows: [
        ["Haute saison", "1 512 USD", "1 423 USD", "1 362 USD", "1 314 USD", "1 284 USD", "414 USD"],
        ["Basse saison", "1 314 USD", "1 231 USD", "1 182 USD", "1 140 USD", "1 117 USD", "372 USD"]
      ],
      note: "Prix par personne en hôtels 4★, pension complète. Conversion appliquée : 1 EUR = 1,20 USD."
    },
    children: "Tarifs enfants sur demande",
    route: ["Casablanca", "Rabat", "Chefchaouen", "Fez", "Merzouga", "Aït Ben Haddou", "Ouarzazate", "Marrakech"],
    dates: {
      line: "Départs 2026 à la demande, individuels ou en groupe.",
      note: "Contactez-nous pour un devis personnalisé selon vos dates."
    },
    cta: {
      title: "8 jours, deux univers — villes impériales et désert",
      text: "Nous concevons ce circuit sur mesure depuis Casablanca, pour groupes ou voyageurs individuels — avec les mêmes soins depuis 2000."
    }
  },

  "maroc-circuit-imperial-cities": {
    mediaKey: "modal-circuit-imperial-cities",
    whatsapp: "212614152686",
    eyebrow: "Mon Maroc · Circuits 2026",
    title: "Imperial Cities Tour",
    duration: "8 jours / 7 nuits",
    tag: "Maroc",
    cadran: [
      ["Départ", "Casablanca"],
      ["Arrivée", "Marrakech"],
      ["Durée", "8 jours / 7 nuits"],
      ["Transport", "Véhicule touristique"],
      ["Pension", "Logement + petits-déjeuners"],
      ["Guide", "Arabophone + guides locaux"]
    ],
    price: "1 116 USD",
    intro: [
      "Le Maroc est une mosaïque de villes impériales, chacune portant l'empreinte d'une dynastie différente. Ce circuit vous invite à les traverser une à une : Casablanca et sa mosquée face à l'Atlantique, Rabat la capitale royale, Tanger la cosmopolite, Meknès l'élégante, Fez la mystique, et enfin Marrakech l'insoumise.",
      "Huit jours pour lire l'histoire du Maroc dans ses pierres, ses mosquées, ses palais et ses médinas. Un voyage dans le temps autant qu'un voyage dans l'espace."
    ],
    highlights: [
      "Rabat : Mausolée Mohammed V et Tour Hassan",
      "Tanger : Kasbah et vue sur le Détroit de Gibraltar",
      "Meknès : Mausolée Moulay Ismail, perle de la dynastique alaouite",
      "Fez (UNESCO) : Al Attarine Madrasa, tanneries, souks impériaux",
      "Marrakech : Bahia Palace, Saadian Tombs, souks de la médina"
    ],
    days: [
      { num: "J1", title: "Casablanca — arrivée",
        text: "Accueil à l'aéroport Mohammed V. Visite de la Mosquée Hassan II. Installation à l'hôtel.",
        meta: [["Nuit", "Casablanca"]] },
      { num: "J2", title: "Casablanca – Rabat",
        text: "Route vers Rabat. Visite du Mausolée Mohammed V, de la Tour Hassan, de la Kasbah des Oudayas et des remparts almohades.",
        meta: [["Nuit", "Rabat"]] },
      { num: "J3", title: "Rabat – Tanger",
        text: "Route vers Tanger via Asilah. Visite de la médina et de la Kasbah de Tanger, avec vue panoramique sur le Détroit de Gibraltar.",
        meta: [["Nuit", "Tanger"]] },
      { num: "J4", title: "Tanger – Meknès",
        text: "Route vers Meknès. Visite de la ville impériale : Bab Mansour, Mausolée Moulay Ismail, grenier Heri es-Souani. Excursion aux ruines de Volubilis (site romain UNESCO).",
        meta: [["Nuit", "Meknès ou Fez"]] },
      { num: "J5", title: "Fez — Ville impériale (UNESCO)",
        text: "Journée dans la médina de Fez. Visite guidée : Al Attarine Madrasa, tanneries Chouara, Kissaria, quartier des potiers.",
        meta: [["Nuit", "Fez"], ["Guide", "local inclus"]] },
      { num: "J6", title: "Fez — journée libre / Azrou",
        text: "Matinée libre dans Fez. En option : excursion à Azrou et sa forêt de cèdres. Après-midi retour à la médina.",
        meta: [["Nuit", "Fez"]] },
      { num: "J7", title: "Fez – Marrakech",
        text: "Route vers Marrakech via le Moyen Atlas. Arrivée en soirée. Découverte de Jemaa el-Fna.",
        meta: [["Nuit", "Marrakech"]] },
      { num: "J8", title: "Marrakech — Visite et départ",
        text: "Visite du Bahia Palace, des Tombeaux Saadiens, de la Koutoubia. Après-midi libre dans les souks. Transfert à l'aéroport.",
        meta: [["Repas", "petit-déjeuner"]] }
    ],
    inclus: [
      "Transport en véhicule touristique climatisé",
      "7 nuits en hôtels et riads",
      "Petits-déjeuners inclus chaque matin",
      "Guide arabophone pour le circuit",
      "Guides locaux pour Fez et Meknès",
      "Visite de Volubilis incluse",
      "L'assistance de Voyages 21"
    ],
    exclus: [
      "Les vols internationaux",
      "Les déjeuners et dîners sauf mention",
      "Les billets d'entrée non mentionnés",
      "Les pourboires et extras personnels"
    ],
    hotels: [
      "Casablanca — hôtel 4★",
      "Rabat — hôtel 4★",
      "Tanger — hôtel 4★",
      "Fez — riad médina 4★",
      "Marrakech — hôtel 4★"
    ],
    priceTable: {
      head: ["Saison", "Base 20", "Base 25", "Base 30", "Base 35", "Base 40", "Suppl. single"],
      rows: [
        ["Haute saison", "1 524 USD", "1 422 USD", "1 356 USD", "1 308 USD", "1 272 USD", "438 USD"],
        ["Basse saison", "1 290 USD", "1 236 USD", "1 182 USD", "1 140 USD", "1 116 USD", "385 USD"]
      ],
      note: "Prix par personne en hôtels 4★, pension complète. Conversion appliquée : 1 EUR = 1,20 USD."
    },
    children: "Tarifs enfants sur demande",
    route: ["Casablanca", "Rabat", "Tanger", "Meknès", "Fez", "Marrakech"],
    dates: {
      line: "Départs 2026 à la demande, individuels ou en groupe.",
      note: "Contactez-nous pour un devis personnalisé selon vos dates."
    },
    cta: {
      title: "Six villes impériales, un seul circuit",
      text: "Nous concevons ce voyage sur mesure pour groupes ou individus — comme nous le faisons depuis 2000."
    }
  },

  "maroc-circuit-best-morocco": {
    mediaKey: "modal-circuit-best-morocco",
    whatsapp: "212614152686",
    eyebrow: "Mon Maroc · Circuits 2026",
    title: "Best of Morocco — Cities, Heritage & Sahara",
    duration: "10 jours / 9 nuits",
    tag: "Maroc",
    cadran: [
      ["Départ", "Casablanca"],
      ["Arrivée", "Marrakech"],
      ["Durée", "10 jours / 9 nuits"],
      ["Transport", "Véhicule touristique"],
      ["Pension", "Logement + petits-déjeuners"],
      ["Guide", "Arabophone + guides locaux"]
    ],
    price: "1 250 USD",
    intro: [
      "Ce circuit est la quintessence du Maroc : dix jours pour toucher chaque facette d'un pays d'une richesse exceptionnelle. Des rives atlantiques de Casablanca aux dunes du Sahara, en passant par Chefchaouen la bleue, les médinas impériales et les routes de kasbahs du Sud.",
      "Dix étapes, des siècles d'histoire, des paysages qui se renouvellent à chaque aurore. Le meilleur du Maroc, composé comme un voyage complet que l'on ne regrettera pas."
    ],
    highlights: [
      "Mosquée Hassan II de Casablanca, l'une des plus grandes du monde",
      "Chefchaouen, la ville bleue du Rif marocain",
      "Fez (UNESCO) : médina, tanneries, madrasas",
      "Merzouga — nuit sous tente berbère face à l'Erg Chebbi",
      "Aït Ben Haddou (UNESCO) et les routes des kasbahs",
      "Marrakech : Bahia Palace, Tombeaux Saadiens, souks"
    ],
    days: [
      { num: "J1", title: "Casablanca — arrivée",
        text: "Accueil à l'aéroport. Visite de la Mosquée Hassan II. Installation à l'hôtel.",
        meta: [["Nuit", "Casablanca"]] },
      { num: "J2", title: "Casablanca – Rabat",
        text: "Visite du Mausolée Mohammed V, de la Tour Hassan et de la Kasbah des Oudayas. Route côtière vers le Nord.",
        meta: [["Nuit", "Rabat"]] },
      { num: "J3", title: "Rabat – Tanger – Grottes d'Hercule",
        text: "Route vers Tanger. Visite des Grottes d'Hercule, de Cap Spartel et de la Kasbah de Tanger avec vue sur le Détroit.",
        meta: [["Nuit", "Tanger"]] },
      { num: "J4", title: "Tanger – Chefchaouen",
        text: "Route vers Chefchaouen, la ville bleue du Rif. Découverte des ruelles, fontaines et places de cette médina unique.",
        meta: [["Nuit", "Chefchaouen"]] },
      { num: "J5", title: "Chefchaouen – Fez",
        text: "Route via Ouazzane vers Fez. Arrivée et première exploration de la médina en soirée.",
        meta: [["Nuit", "Fez"]] },
      { num: "J6", title: "Fez — Ville impériale (UNESCO)",
        text: "Journée complète dans la médina de Fez : Bou Inania Madrasa, tanneries Chouara, Kissaria, musée de Batha.",
        meta: [["Nuit", "Fez"], ["Guide", "local inclus"]] },
      { num: "J7", title: "Fez – Sahara – Merzouga",
        text: "Longue route vers le Sahara via Midelt. Arrivée à Merzouga. Dromadaire au coucher du soleil. Nuit en camp berbère.",
        meta: [["Nuit", "Camp berbère — Merzouga"]] },
      { num: "J8", title: "Merzouga – Ouarzazate – Aït Ben Haddou",
        text: "Lever au soleil sur les dunes. Route des kasbahs vers Ouarzazate. Visite d'Aït Ben Haddou (UNESCO).",
        meta: [["Nuit", "Ouarzazate"]] },
      { num: "J9", title: "Ouarzazate – Marrakech",
        text: "Traversée du col du Tichka. Arrivée à Marrakech. Place Jemaa el-Fna en soirée.",
        meta: [["Nuit", "Marrakech"]] },
      { num: "J10", title: "Marrakech — Visite et départ",
        text: "Visite du Bahia Palace, des Tombeaux Saadiens et de la Koutoubia. Transfert à l'aéroport.",
        meta: [["Repas", "petit-déjeuner"]] }
    ],
    inclus: [
      "Transport en véhicule touristique climatisé",
      "9 nuits en hôtels, riads et camp berbère",
      "Petits-déjeuners inclus chaque matin",
      "Guide arabophone pour le circuit",
      "Guide local pour la médina de Fez",
      "Balade à dos de dromadaire à Merzouga",
      "L'assistance de Voyages 21"
    ],
    exclus: [
      "Les vols internationaux",
      "Les déjeuners et dîners sauf mention",
      "Les billets d'entrée non mentionnés",
      "Les pourboires et extras personnels"
    ],
    hotels: [
      "Casablanca — hôtel 4★",
      "Rabat — hôtel 4★",
      "Tanger — hôtel 4★",
      "Chefchaouen — riad de charme",
      "Fez — riad médina 4★",
      "Merzouga — camp berbère sous tente",
      "Ouarzazate — hôtel 4★",
      "Marrakech — hôtel 4★"
    ],
    priceTable: {
      head: ["Saison", "Base 20", "Base 25", "Base 30", "Base 35", "Base 40", "Suppl. single"],
      rows: [
        ["Haute saison", "1 634 USD", "1 585 USD", "1 571 USD", "1 524 USD", "1 458 USD", "508 USD"],
        ["Basse saison", "1 392 USD", "1 354 USD", "1 344 USD", "1 306 USD", "1 250 USD", "372 USD"]
      ],
      note: "Prix par personne en hôtels 4★, pension complète. Conversion appliquée : 1 EUR = 1,20 USD."
    },
    children: "Tarifs enfants sur demande",
    route: ["Casablanca", "Rabat", "Tanger", "Chefchaouen", "Fez", "Merzouga", "Ouarzazate", "Marrakech"],
    dates: {
      line: "Départs 2026 à la demande, individuels ou en groupe.",
      note: "Contactez-nous pour un devis personnalisé selon vos dates."
    },
    cta: {
      title: "Le Maroc complet en 10 jours",
      text: "Côtes atlantiques, villes impériales, Sahara et routes des kasbahs — nous vous composons ce voyage sur mesure depuis 2000."
    }
  },

  "maroc-circuit-discover-kingdom": {
    mediaKey: "modal-circuit-discover-kingdom",
    whatsapp: "212614152686",
    eyebrow: "Mon Maroc · Circuits 2026",
    title: "Discover the Kingdom",
    duration: "12 jours / 11 nuits",
    tag: "Maroc",
    cadran: [
      ["Départ", "Marrakech"],
      ["Arrivée", "Marrakech"],
      ["Durée", "12 jours / 11 nuits"],
      ["Transport", "Véhicule touristique"],
      ["Pension", "Pension complète"],
      ["Guide", "Guides locaux selon les étapes"]
    ],
    price: "1 474 USD",
    intro: [
      "Un circuit complet pour traverser le Royaume dans ses grandes lignes : Marrakech, Casablanca, Meknès, Fez, les reliefs du Moyen Atlas, le Sahara de Merzouga, Ouarzazate, Agadir et retour vers Marrakech.",
      "Pensé comme une découverte structurée du Maroc impérial, saharien et atlantique, ce voyage mêle patrimoine, paysages de montagne, désert, route des kasbahs et temps libre sur la côte."
    ],
    highlights: [
      "Marrakech, Casablanca, Meknès et Fez",
      "Volubilis, Moulay Idriss et les sites impériaux",
      "Ifrane et le Moyen Atlas",
      "Expérience Sahara à Merzouga",
      "Gorges de Todra, vallée du Dadès et Ouarzazate",
      "Agadir et la côte atlantique"
    ],
    days: [
      ["Jour 1", "Arrivée à Marrakech", "Accueil à l'aéroport Marrakech-Menara, transfert à l'hôtel et première découverte libre selon l'heure d'arrivée."],
      ["Jour 2", "Marrakech", "Visite guidée de Marrakech : Koutoubia, Bahia Palace, Menara, remparts et place Jemaa El-Fna."],
      ["Jour 3", "Marrakech · Casablanca", "Route vers Casablanca, tour panoramique : place Mohammed V, Habous, corniche Ain Diab et mosquée Hassan II en extérieur."],
      ["Jour 4", "Casablanca · Meknès · Volubilis · Fez", "Départ vers Fez avec visite de Meknès, Heri es-Souani, Volubilis et Moulay Idriss."],
      ["Jour 5", "Fez", "Journée de visite de Fez : médina, université Al Quaraouiyine, Attarine Madrasa, quartiers artisanaux, tanneries et Mellah."],
      ["Jour 6", "Fez · Merzouga", "Traversée d'Ifrane, des forêts de cèdres, Midelt et de la vallée du Ziz jusqu'à Merzouga."],
      ["Jour 7", "Merzouga · Ouarzazate", "Route via Erfoud, les gorges de Todra, la vallée du Dadès et la route des mille kasbahs."],
      ["Jour 8", "Ouarzazate · Agadir", "Visite extérieure de la kasbah de Taourirt et route vers Agadir par l'Anti-Atlas."],
      ["Jour 9", "Agadir", "Journée libre à Agadir pour profiter de la plage, de l'hôtel ou d'excursions optionnelles."],
      ["Jour 10", "Agadir · Marrakech", "Retour vers Marrakech par autoroute, installation et temps libre."],
      ["Jour 11", "Marrakech", "Journée libre à Marrakech : souks, détente, excursions optionnelles, hammam ou dîner spectacle."],
      ["Jour 12", "Marrakech · Départ", "Transfert à l'aéroport Marrakech-Menara selon l'horaire du vol et assistance au départ."]
    ],
    inclus: [
      "Hébergement en chambre double avec salle de bain privée dans les hôtels mentionnés ou similaires",
      "Taxes de séjour et de promotion touristique",
      "Transport avec véhicule privé",
      "Taxes locales et TVA 20%",
      "Guide local anglophone ou sinophone selon les étapes",
      "Assistance pendant tout le séjour",
      "Deux petites bouteilles d'eau minérale par personne et par jour pendant les trajets",
      "Tous les services mentionnés au programme"
    ],
    exclus: [
      "Supplément single",
      "Extras et dépenses personnelles",
      "Pourboires guide, chauffeur, restaurants et hôtels",
      "Billets d'avion",
      "Visite intérieure de la mosquée Hassan II",
      "Fantasia Chez Ali à Marrakech",
      "Tous les services non mentionnés au programme"
    ],
    hotels: [
      "Marrakech — hôtel 4★",
      "Casablanca — hôtel 4★",
      "Fez — hôtel 4★",
      "Merzouga — hôtel ou camp désert",
      "Ouarzazate — hôtel 4★",
      "Agadir — hôtel 4★"
    ],
    priceTable: {
      head: ["Saison", "Base 20", "Base 25", "Base 30", "Base 35", "Base 40", "Suppl. single"],
      rows: [
        ["Haute saison", "1 910 USD", "1 850 USD", "1 829 USD", "1 771 USD", "1 692 USD", "521 USD"],
        ["Basse saison", "1 650 USD", "1 602 USD", "1 588 USD", "1 540 USD", "1 474 USD", "425 USD"]
      ],
      note: "Prix par personne en hôtels 4★, pension complète. Conversion appliquée : 1 EUR = 1,20 USD."
    },
    children: "Tarifs enfants sur demande",
    route: ["Marrakech", "Casablanca", "Meknès", "Volubilis", "Fez", "Merzouga", "Ouarzazate", "Agadir", "Marrakech"],
    dates: {
      line: "Départs 2026 à la demande, individuels ou en groupe.",
      note: "Saisonnalité selon la grille Maroc circuits 2026."
    },
    cta: {
      title: "12 jours pour découvrir le Royaume",
      text: "Nous concevons ce circuit pour groupes et voyageurs individuels, avec la même logique de service Voyages 21."
    }
  },

  "maroc-circuit-grand-discovery": {
    mediaKey: "modal-circuit-grand-discovery",
    whatsapp: "212614152686",
    eyebrow: "Mon Maroc · Circuits 2026",
    title: "Splendid Morocco — Grand Discovery",
    duration: "15 jours / 14 nuits",
    tag: "Maroc",
    cadran: [
      ["Départ", "Marrakech"],
      ["Arrivée", "Marrakech"],
      ["Durée", "15 jours / 14 nuits"],
      ["Transport", "Véhicule touristique"],
      ["Pension", "Logement + petits-déjeuners"],
      ["Guide", "Arabophone + guides locaux"]
    ],
    price: "1 907 USD",
    intro: [
      "Quinze jours pour découvrir le Maroc dans toute son ampleur. Ce grand circuit vous mène des palais ocre de Marrakech jusqu'à la façade atlantique d'Essaouira et Agadir, en passant par les médinas impériales, la ville bleue de Chefchaouen, les dunes infinies de Merzouga et les kasbahs de terre du Sud.",
      "C'est le voyage pour ceux qui veulent ne rien manquer : les grandes villes, les paysages contrastés, le Sahara, l'Atlantique et les routes millénaires des caravanes. Un grand tour qui revient à son point de départ, riche de chaque étape parcourue."
    ],
    highlights: [
      "Marrakech : Bahia Palace, Tombeaux Saadiens, Jemaa el-Fna",
      "Casablanca : Mosquée Hassan II face à l'Atlantique",
      "Chefchaouen, la perle bleue du Rif",
      "Fez (UNESCO) : Bou Inania Madrasa, tanneries Chouara",
      "Merzouga — nuit sous tente berbère face à l'Erg Chebbi",
      "Aït Ben Haddou (UNESCO) et les routes des kasbahs",
      "Essaouira : Skala de la Ville, médina et port atlantique"
    ],
    days: [
      { num: "J1", title: "Marrakech — arrivée",
        text: "Accueil à l'aéroport. Visite de la Koutoubia et de la place Jemaa el-Fna. Installation à l'hôtel.",
        meta: [["Nuit", "Marrakech"]] },
      { num: "J2", title: "Marrakech — Bahia, Saadiens, souks",
        text: "Journée dans la médina : Bahia Palace, Tombeaux Saadiens, Medersa Ben Youssef, souks et teintureries.",
        meta: [["Nuit", "Marrakech"]] },
      { num: "J3", title: "Marrakech – Casablanca",
        text: "Route vers Casablanca. Visite de la Mosquée Hassan II. Promenade sur la Corniche atlantique.",
        meta: [["Nuit", "Casablanca"]] },
      { num: "J4", title: "Casablanca – Rabat",
        text: "Route vers la capitale. Mausolée Mohammed V, Tour Hassan, Kasbah des Oudayas, remparts almohades.",
        meta: [["Nuit", "Rabat"]] },
      { num: "J5", title: "Rabat – Meknès – Volubilis",
        text: "Route vers Meknès. Visite de Bab Mansour, Mausolée Moulay Ismail, grenier Heri es-Souani. Excursion aux ruines romaines de Volubilis (UNESCO).",
        meta: [["Nuit", "Meknès ou Fez"]] },
      { num: "J6", title: "Fez — Ville impériale (UNESCO)",
        text: "Journée dans la médina de Fez : Bou Inania Madrasa, tanneries Chouara, Kissaria, musée de Batha.",
        meta: [["Nuit", "Fez"], ["Guide", "local inclus"]] },
      { num: "J7", title: "Fez — journée libre",
        text: "Deuxième journée à Fez pour explorer à votre rythme : souks, quartier al-Andalus, fondouks, ateliers d'artisans.",
        meta: [["Nuit", "Fez"]] },
      { num: "J8", title: "Fez – Chefchaouen",
        text: "Route vers Chefchaouen, la ville bleue du Rif. Arrivée et découverte des ruelles aux tons bleu cobalt.",
        meta: [["Nuit", "Chefchaouen"]] },
      { num: "J9", title: "Chefchaouen — journée et route",
        text: "Matinée libre à Chefchaouen. Déjeuner. Route vers Fez ou le Sud selon programme.",
        meta: [["Nuit", "Route vers le Sud"]] },
      { num: "J10", title: "Route du désert – Merzouga",
        text: "Longue route vers le Sahara via Midelt. Arrivée à Merzouga. Balade à dos de dromadaire. Nuit en camp berbère.",
        meta: [["Nuit", "Camp berbère — Merzouga"]] },
      { num: "J11", title: "Merzouga – Ouarzazate",
        text: "Lever au soleil. Route des kasbahs : Rissani, Tinghir, gorges de Todra, Skoura, Ouarzazate.",
        meta: [["Nuit", "Ouarzazate"]] },
      { num: "J12", title: "Ouarzazate – Aït Ben Haddou – Marrakech",
        text: "Visite d'Aït Ben Haddou (UNESCO). Traversée du Tichka. Arrivée à Marrakech en soirée.",
        meta: [["Nuit", "Marrakech"]] },
      { num: "J13", title: "Marrakech – Essaouira",
        text: "Route vers Essaouira. Visite de la Skala de la Ville, du port de pêche et de la médina classée UNESCO.",
        meta: [["Nuit", "Essaouira"]] },
      { num: "J14", title: "Essaouira – Agadir",
        text: "Route côtière vers Agadir. Découverte de la baie, de la Kasbah et de la corniche atlantique.",
        meta: [["Nuit", "Agadir"]] },
      { num: "J15", title: "Agadir – Marrakech — départ",
        text: "Route retour vers Marrakech. Transfert à l'aéroport selon votre vol de retour.",
        meta: [["Repas", "petit-déjeuner"]] }
    ],
    inclus: [
      "Transport en véhicule touristique climatisé",
      "14 nuits en hôtels, riads et camp berbère",
      "Petits-déjeuners inclus chaque matin",
      "Guide arabophone pour l'ensemble du circuit",
      "Guide local pour la médina de Fez",
      "Balade à dos de dromadaire à Merzouga",
      "Visite de Volubilis incluse",
      "L'assistance de Voyages 21"
    ],
    exclus: [
      "Les vols internationaux",
      "Les déjeuners et dîners sauf mention",
      "Les billets d'entrée non mentionnés",
      "Les pourboires et extras personnels"
    ],
    hotels: [
      "Marrakech — hôtel 4★",
      "Casablanca — hôtel 4★",
      "Rabat — hôtel 4★",
      "Fez — riad médina 4★",
      "Chefchaouen — riad de charme",
      "Merzouga — camp berbère sous tente",
      "Ouarzazate — hôtel 4★",
      "Essaouira — riad médina",
      "Agadir — hôtel 4★"
    ],
    priceTable: {
      head: ["Saison", "Base 20", "Base 25", "Base 30", "Base 35", "Base 40", "Suppl. single"],
      rows: [
        ["Haute saison", "2 508 USD", "2 434 USD", "2 413 USD", "2 342 USD", "2 240 USD", "685 USD"],
        ["Basse saison", "2 124 USD", "2 064 USD", "2 050 USD", "1 992 USD", "1 907 USD", "534 USD"]
      ],
      note: "Prix par personne en hôtels 4★, pension complète. Conversion appliquée : 1 EUR = 1,20 USD."
    },
    children: "Tarifs enfants sur demande",
    route: ["Marrakech", "Casablanca", "Rabat", "Meknès", "Fez", "Chefchaouen", "Merzouga", "Ouarzazate", "Essaouira", "Agadir", "Marrakech"],
    dates: {
      line: "Départs 2026 à la demande, individuels ou en groupe.",
      note: "Contactez-nous pour un devis personnalisé selon vos dates."
    },
    cta: {
      title: "15 jours, le grand tour du Maroc",
      text: "Des villes impériales à l'Atlantique, en passant par le Sahara — nous vous composons ce voyage sur mesure depuis 2000."
    }
  }

};
