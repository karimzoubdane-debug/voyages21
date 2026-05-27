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
    whatsapp: "212673280009",
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
    whatsapp: "212673280009",
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
    whatsapp: "212673280009",
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
  }

};
