/* V21 STUDIO — données de la plateforme (source unique, mise à jour par Claude
   à chaque session V21 STUDIO ; Vercel redéploie automatiquement).
   Contenant = index.html · Contenu = ce fichier. */
window.V21_STUDIO = {
  meta: {
    version: "v5",
    maj: "14/06/2026",
    note: "Voyages21 — 9 destinations + Règles & Playbook + Tendances. v5 (benchmark enrichi, viral 2 colonnes, influenceurs)."
  },

  // Sélecteur de produit (ascenseur). 'pret' = données complètes.
  produits: [
    { id: "egypte", label: "🇪🇬 Égypte (outgoing)", etat: "pret" },
    { id: "turquie", label: "🇹🇷 Turquie (outgoing)", etat: "pret" },
    { id: "omra", label: "🕋 Omra (juil.–août 2026)", etat: "pret" },
    { id: "zanzibar", label: "🏝️ Zanzibar (juin–août 2026)", etat: "pret" },
    { id: "vietnam", label: "🇻🇳 Vietnam (été 2026)", etat: "pret" },
    { id: "thailande", label: "🇹🇭 Thaïlande (été 2026)", etat: "pret" },
    { id: "malaisiethai", label: "🇲🇾 Malaisie & Thaïlande (été 2026)", etat: "pret" },
    { id: "chine", label: "🇨🇳 Chine (été 2026)", etat: "pret" },
    { id: "ouzbekistan", label: "🇺🇿 Ouzbékistan (juil.–oct. 2026)", etat: "pret" },
    { id: "playbook", label: "📐 Règles & Playbook (réseaux/web/vidéo)", etat: "pret" },
    { id: "tendances", label: "🔥 Tendances & niches + croisières", etat: "pret" }
  ],

  // PAGE — RÈGLES & PLAYBOOK (règles d'or générales, transversales)
  playbook: {
    type: "playbook",
    titre: "Règles & Playbook — les règles d'or pour réussir et se distinguer",
    intro: "Socle théorique transversal (réseaux · web · vidéo · marque). Les déclinaisons concrètes par destination sont dans chaque page « 📡 Stratégie réseaux déclinée ».",
    blocs: [
      { titre: "🎬 Vidéo / Reels — les règles d'or", regles: [
        "Hook < 3 s : montrer le meilleur plan ou poser la promesse AVANT 3 secondes (l'algo juge la rétention dès le départ).",
        "Format 9:16 plein écran, sous-titres brûlés (80 % regardent sans le son au début).",
        "Audio TENDANCE du jour (onglet « audios en hausse »), pas une banque libre : le son porte le reach.",
        "Couper au beat, 5-8 plans max, pas de temps mort. La 1re seconde décide de tout.",
        "1 idée = 1 reel. CTA simple à la fin (DM, lien bio, WhatsApp).",
        "Volume > perfection : la régularité (4/sem) bat le léché occasionnel."
      ]},
      { titre: "📱 Réseaux sociaux — codes par plateforme", regles: [
        "Instagram : Reels = reach, Carrousels = saves (intention d'achat), Stories = conversion (lien WhatsApp).",
        "Facebook : audience 40+/MRE, textes longs OK, Page pro obligatoire pour les ads.",
        "TikTok : reel brut > léché, tendances propres (≠ IG), séries épisodiques fidélisent.",
        "Snapchat : surtout ADS géolocalisées MA (16-30 ans), format flash/direct.",
        "Pinterest : moteur de recherche (pas un réseau), épingles verticales keyword-first, trafic 3-6 mois.",
        "YouTube Shorts : SEO durable, talking-head expert = autorité + confiance d'achat."
      ]},
      { titre: "🪝 Hooks & copywriting", regles: [
        "Hooks qui marchent : « POV : … », « 5 erreurs… », « Ce que personne ne te dit… », « Le vrai budget… », « X choses à faire… ».",
        "Concours = levier de portée n°1 (commentaires explosent → l'algo pousse). Règlement transparent.",
        "Afficher DATES + rareté (« places limitées ») = déclencheur de DM.",
        "Caption courte : l'audio et le visuel font le travail, pas le pavé de texte."
      ]},
      { titre: "🌐 Web / SEO / conversion", regles: [
        "Une fiche = un prix clair + inclus/exclus + dates + CTA WhatsApp visible.",
        "Transparence (compagnie, horaires, visa) = différenciant vs concurrents flous.",
        "Pinterest + Shorts = SEO social long terme ; publier 45-90 j avant la saison.",
        "WhatsApp Business = canal de conversion (catalogue + statuts + réponse rapide)."
      ]},
      { titre: "🏛️ Marque & confiance (règles non négociables)", regles: [
        "Jamais de faux témoignage ni d'influenceur IA. UGC = vrais clients/créateurs identifiés.",
        "Lieux réels = vraies images (retravaillées IA si besoin) ; IA = inspiration/ambiance.",
        "Omra : sobriété, nasheed vocal (pas d'instrumental), respect des Lieux Saints.",
        "Cohérence visuelle (vert/or/crème, Playfair/DM Sans) = premium reconnaissable."
      ]}
    ]
  },

  // PAGE — TENDANCES & NICHES (influenceurs MA + Europe) + croisières sans Schengen
  tendances: {
    type: "tendances",
    titre: "Tendances & niches — ce dont parlent les influenceurs (MA + Europe)",
    intro: "Veille des destinations qui montent chez les blogueurs/youtubeurs (focus France), comment ils les vendent, et mes recos pour V21. ⚠️ Synthèse recherche web juin 2026 (Skyscanner/TikTok, presse voyage FR) — à affiner par scrape ciblé d'influenceurs.",
    top10: [
      { dest: "Montagne en été (Alpes, Caucase, Atlas)", nouveau: false, appat: "« Fuir la foule et la chaleur » : 57 % des Français visent la montagne l'été 2026. Reels fraîcheur/rando/lacs.", analyse: "V21 a l'Atlas/Ouzbékistan (Caucase via combiné). Opportunité : packager « montagne fraîche » l'été." },
      { dest: "Slow travel / immersion longue", nouveau: false, appat: "« Vivre comme un local », séjours longs, fermes rénovées. 40 % des voyageurs FR préfèrent l'immersion.", analyse: "Décliner une Égypte/Vietnam « slow » (petits groupes, sens) = marge + différenciation vs promo." },
      { dest: "Ouzbékistan / Route de la Soie", nouveau: false, appat: "« Pépite méconnue », cités bleues, esthétique unique. Niche qui monte fort chez les créateurs.", analyse: "DÉJÀ programmée par V21 → pousser le contenu maintenant, peu de concurrence MA." },
      { dest: "Arabie Saoudite (AlUla, Riyad)", nouveau: true, appat: "« La nouvelle destination », déserts/Nabatéens, ouverture touristique. Très poussée par les influenceurs.", analyse: "⚡ NON programmée. Synergie forte avec audience Omra. À étudier (combiné Omra + AlUla ?)." },
      { dest: "Japon", nouveau: true, appat: "Yen faible, culture pop, cerisiers/automne. Contenu massivement viral (food, villes).", analyse: "⚡ NON programmée en propre. Cher mais désir énorme ; testable en haut de gamme." },
      { dest: "Jordanie (Pétra, Wadi Rum)", nouveau: true, appat: "« Indiana Jones », désert rouge, bivouac étoilé. Très instagrammable, sans visa lourd.", analyse: "⚡ NON programmée. Proche culturellement, combinable avec l'Égypte (Caire+Pétra)." },
      { dest: "Albanie / Balkans", nouveau: true, appat: "« Les Maldives de l'Europe à petit prix », plages turquoise. Hype budget 2025-2026.", analyse: "⚡ NON programmée. ⚠️ Schengen-adjacent (visa à vérifier pour MA)." },
      { dest: "Oman", nouveau: true, appat: "Wadis, désert, authenticité « Golfe sans le clinquant ». Niche premium calme.", analyse: "⚡ NON programmée. Premium, sans visa compliqué, proche de l'offre Dubaï." },
      { dest: "Égypte (regain culturel)", nouveau: false, appat: "Grand Musée égyptien (ouverture), Nil, montgolfière Louxor. Fort regain de contenu.", analyse: "DÉJÀ programmée. Surfer sur l'ouverture du Grand Musée comme accroche d'actualité." },
      { dest: "Croisières (Méditerranée/Nil/Golfe)", nouveau: true, appat: "« Tout compris, plusieurs pays en un voyage », famille. Croît chez les familles MA.", analyse: "⚡ Croisières non programmées en propre → voir section dédiée ci-dessous." }
    ],
    croisieresIntro: "Croisières accessibles aux Marocains SANS visa Schengen (escales hors espace Schengen ou e-visa simple). À explorer comme nouveau produit famille.",
    croisieres: [
      { nom: "🚢 Croisière du Nil (Louxor-Assouan)", visa: "e-visa Égypte simple (pas de Schengen)", note: "Le « must » culturel, combinable Caire+mer Rouge. Forte demande, déjà dans l'univers Égypte V21." },
      { nom: "🚢 Méditerranée orientale (Turquie/Grèce hors UE selon escales)", visa: "à vérifier escale par escale (éviter ports Schengen)", note: "⚠️ La Grèce = Schengen. Privilégier itinéraires Turquie + îles non-Schengen. Infrastructure mature." },
      { nom: "🚢 Golfe Persique (Dubaï, Abou Dhabi, Qatar, Oman)", visa: "e-visa/visa on arrival selon pays, pas de Schengen", note: "Haut de gamme, hiver, sans Schengen → idéal cible MA premium. Synergie vols du Golfe." },
      { nom: "🚢 Mer Rouge (Égypte/Jordanie/Arabie)", visa: "e-visa, pas de Schengen", note: "Plongée + désert, combinable avec un séjour balnéaire. Niche à fort potentiel visuel." }
    ],
    reco: [
      "MISER MAINTENANT (déjà programmé, contenu à pousser) : Ouzbékistan (niche qui monte, peu de concurrence MA) + Égypte (surfer sur l'ouverture du Grand Musée).",
      "À ÉTUDIER EN PRIORITÉ (non programmé, fort signal influenceurs + synergie V21) : Jordanie (combiné avec l'Égypte) et Arabie Saoudite/AlUla (synergie audience Omra).",
      "PRODUIT NEUF à tester : une CROISIÈRE famille SANS visa Schengen (Nil ou Golfe) — répond à une demande qui monte et contourne le frein n°1 des Marocains (le visa).",
      "⚠️ Prudence Schengen : Albanie/Balkans et Méditerranée à escales UE = friction visa pour la cible MA → ne pas mettre en avant sans vérifier.",
      "MÉTHODE : ces signaux viennent de la recherche web (presse voyage FR). Pour une reco chiffrée par VOLUME de vues/engagement, lance-moi un scrape ciblé d'influenceurs FR/MA (je le fais si tu valides)."
    ]
  },

  egypte: {
    // 1) NOS OFFRES (fiches brochure, données techniques réelles du site)
    offres: [
      {
        titre: "Le Caire & Sharm El Sheikh",
        badge: "Offre héros",
        duree: "11 j / 10 nuits",
        prix: "dès 19 600 DH/pers",
        prixDetail: "Triple 19 600 · Double 19 800 · Suppl. single +5 900",
        hotels: "5★ — Marriott Cairo City View + Aurora Oriental / Cleopatra Luxury / Mövenpick (Sharm)",
        pension: "3 nuits Caire (petit-déj) + 7 nuits Sharm (tout compris)",
        vols: "Inclus — Casablanca / Le Caire / Sharm / Casablanca",
        volsHoraires: "⚠️ horaires non publiés sur la fiche — À CONFIRMER",
        inclus: ["Vols A/R", "10 nuits 5★", "Visite complète du Caire + déjeuner", "Dîner-croisière sur le Nil avec spectacle", "Transferts en autocar Deluxe + guide pro"],
        exclus: ["Visa Égypte 600 DH", "Pourboires 20$/adulte · 5$/enfant", "Dépenses perso & boissons"],
        visites: "Pyramides de Gizeh, Sphinx, Khan El Khalili, mosquées Al-Hussein & Al-Azhar, institut papyrus & parfums",
        dates: "16→26 juil · 23 juil→2 août · 6→16 août · 10→20 août · 13→23 août · 20→30 août · 30 août→9 sept"
      },
      {
        titre: "Le Caire, Croisière du Nil & Hurghada",
        badge: "Premium culture+mer",
        duree: "12 j / 11 nuits",
        prix: "dès 19 300 DH/pers",
        prixDetail: "Chambre double ou triple : 19 300 DH",
        hotels: "Croisière Nil 5★ (3n) + Hurghada 4★ luxe (4n) + Le Caire 4★ sup. (3n)",
        pension: "Pension complète en croisière · tout compris à Hurghada",
        vols: "Inclus — Royal Air Maroc (Casablanca / Le Caire)",
        volsHoraires: "Date fixe : 17→28 août 2026 · guide francophone",
        inclus: ["Vols RAM A/R", "Croisière 5★ Assouan→Louxor (3n)", "Pyramides, Sphinx, temples Kom Ombo/Edfou/Karnak, Vallée des Rois", "4 nuits Hurghada tout compris", "Guide francophone"],
        exclus: ["Visa Égypte 600 DH", "Pourboires 20$/adulte", "Dépenses perso"],
        visites: "Gizeh + Sphinx, croisière du Nil, temples pharaoniques, Vallée des Rois",
        dates: "Date fixe : 17→28 août 2026"
      },
      {
        titre: "Le Caire & Hurghada",
        badge: "Meilleur prix",
        duree: "12 j / 11 nuits",
        prix: "dès 15 600 DH/pers",
        prixDetail: "Triple 15 600 · Double 15 900 · Single 20 100",
        hotels: "4★ — Marwa Palace (Caire) + Blend Resort & Aqua Park (Hurghada)",
        pension: "4 nuits Caire (petit-déj) + 7 nuits Hurghada (tout compris)",
        vols: "Inclus — Royal Air Maroc (bagage 46 kg)",
        volsHoraires: "Date fixe : 17→28 août 2026",
        inclus: ["Vols RAM A/R", "Pyramides, Sphinx, Khan El Khalili", "7 nuits Hurghada tout compris", "Transport privé climatisé"],
        exclus: ["Visa Égypte 600 DH", "Pourboires 20$/adulte", "Dépenses perso"],
        visites: "Gizeh + Sphinx + Khan El Khalili",
        dates: "Date fixe : 17→28 août 2026"
      }
    ],

    // 2) VEILLE CONCURRENTS — veille ÉLARGIE + engagement réel (scrape Apify 14/06/2026)
    concurrents: {
      benchmarkTitre: "Benchmark prix Égypte (départ Maroc, vols inclus)",
      comptes: [
        { nom: "@vacancia.ma", abonnes: "139 K", type: "Outgoing — concurrent Égypte n°1", note: "Discount/volume, croisière Nil confirmée, ton darija. Reels « Réservation + numéro » + audio = jusqu'à 95k vues" },
        { nom: "@msm_voyages", abonnes: "121 K", type: "Outgoing — concurrent direct", note: "Égypte + Turquie + Omra+Istanbul. Forts carrousels (likes méd. 137), peu de reels → reach plafonné" },
        { nom: "@follow_me_travel_", abonnes: "111 K", type: "Outgoing — concurrent direct", note: "Égypte, Turquie, combinés Asie. Reels actifs (méd. ~4,7k vues, max 17k)" },
        { nom: "@olevoyages.ma", abonnes: "93 K", type: "Outgoing — concurrent direct", note: "Égypte/Turquie/Hajj. ⚠️ non récupéré au scrape (compte restreint) — à re-scraper" },
        { nom: "@ajinsafro.ma", abonnes: "70 K", type: "Outgoing — concurrent FRONTAL Égypte", note: "Offre Caire & Sharm quasi identique à la nôtre, MAIS contenu en sous-performance (121 vues / 2 likes) → fenêtre ouverte" },
        { nom: "@terratour_voyages", abonnes: "75 K", type: "Outgoing — top performeur contenu", note: "Le PLUS fort en engagement (méd. ~15,7k vues, max 71k, 1888 likes). Reels « destination + dates + places limitées »" },
        { nom: "@transatourmaroc", abonnes: "28 K", type: "Outgoing — ISO 9001", note: "Istanbul dès 6 547 DH (Bosphore offert). Concours « gagne une Omra » = 1 769 commentaires (hack engagement)" },
        { nom: "▶ @voyages21maroc (NOUS)", abonnes: "petit compte · Meta Verified", type: "Notre compte — point de départ", note: "Posts récents ~25-150 vues, 0-6 likes. Le compte est à (re)lancer : régularité reels + audio tendance d'abord" }
      ],
      // Benchmark MAROC — colonnes alignées (inclus/non inclus/compagnie/horaires/dates/site/IG)
      benchmarkTitre: "Benchmark concurrents Maroc — Le Caire & Sharm (départ Maroc)",
      benchmarkPrix: [
        { agence: "▶ Voyages21 (NOUS)", offre: "Le Caire & Sharm", inclus: ["Vols A/R","10 nuits 5★","Visite Caire + déjeuner","Dîner-croisière Nil + spectacle","Transferts + guide pro"], exclus: ["Visa 600 DH","Pourboires 20$/ad","Boissons & perso"], compagnie: "nd (à confirmer)", horaires: "non publiés", dates: "16-26 juil · 23 juil-2 août · 6-16 · 10-20 · 13-23 · 20-30 août · 30 août-9 sept", duree: "11j/10n", hotels: "5★ nommés (Marriott/Aurora/Cleopatra/Mövenpick)", prix: "19 600 DH", site: "https://voyages21.com", instagram: "https://www.instagram.com/voyages21maroc/", verifie: true, nous: true },
        { agence: "AjiNsafro", offre: "Caire + Sharm", inclus: ["Vol A/R","Hôtel 4★ et 5★","Transferts","Repas & visites du programme"], exclus: ["nd"], compagnie: "nd", horaires: "nd", dates: "nd (post : « été 2026 »)", duree: "10j/9n", hotels: "4★ et 5★", prix: "16 700 DH", site: "https://www.ajinsafro.ma", instagram: "https://www.instagram.com/ajinsafro.ma/", verifie: true },
        { agence: "Vacancia", offre: "Caire + Hurghada", inclus: ["nd"], exclus: ["nd"], compagnie: "nd", horaires: "nd", dates: "nd", duree: "10j/9n", hotels: "4★ tout compris", prix: "17 500 DH", site: "https://vacancia.ma", instagram: "https://www.instagram.com/vacancia.ma/", verifie: false },
        { agence: "Olé Voyages", offre: "Caire + croisière + Hurghada", inclus: ["nd"], exclus: ["nd"], compagnie: "nd", horaires: "nd", dates: "nd", duree: "~11j", hotels: "nd", prix: "15 500 DH", site: "https://www.olevoyages.ma", instagram: "https://www.instagram.com/olevoyages.ma/", verifie: false },
        { agence: "ESF (Évasions Sans Frontières)", offre: "Caire + croisière Nil + Hurghada", inclus: ["nd"], exclus: ["nd"], compagnie: "nd", horaires: "nd", dates: "nd", duree: "nd", hotels: "5★ + croisière 5★", prix: "17 900 DH", site: "nd", instagram: "https://www.instagram.com/evasions_sans_frontieres/", verifie: false },
        { agence: "Al Hassania", offre: "Grand Tour Caire+Hurghada+Sharm", inclus: ["nd"], exclus: ["nd"], compagnie: "nd", horaires: "nd", dates: "nd", duree: "14j/13n", hotels: "5★", prix: "16 900 DH", site: "nd", instagram: "nd", verifie: false }
      ],
      benchmarkAnalyse: [
        "OÙ JE SUIS : sur Caire & Sharm, V21 (19 600 DH) est le PLUS cher des lignes scrapées le 14/06.",
        "MON FORT (visible data) : seul à garantir des 5★ NOMMÉS + 11j/10n (1 nuit de plus qu'AjiNsafro 10j/9n) + dîner-croisière Nil inclus. Comparable direct vérifié = AjiNsafro 16 700 → écart +17 %, qui COÏNCIDE avec ces 2 plus (data, sans autre interprétation).",
        "MON FAIBLE (visible data) : je n'affiche NI compagnie aérienne NI horaires NI liste claire d'inclus/exclus dans la com — les concurrents non plus, mais c'est justement un terrain où me différencier (transparence).",
        "⚠️ Limite : Olé/ESF/Vacancia/Al Hassania = prix non vérifiés et inclus « nd » → comparaison partielle. Pour trancher saison/saison, il faut leurs dates exactes (colonne Dates à compléter)."
      ],
      benchmarkIntlTitre: "Benchmark international — agences France & Espagne (Le Caire / Nil / Sharm)",
      benchmarkIntl: [
        { agence: "▶ Voyages21 (NOUS)", offre: "Caire & Sharm (départ Maroc)", inclus: ["Vols A/R Casa","10 nuits 5★","Caire + dîner-croisière Nil","Sharm 7 nuits AI"], exclus: ["Visa 600 DH","Pourboires"], compagnie: "nd", horaires: "non publiés", dates: "juil → sept 2026", duree: "11j/10n", hotels: "5★ nommés", prix: "19 600 DH (~1 815 €)", site: "https://voyages21.com", instagram: "https://www.instagram.com/voyages21maroc/", verifie: true, nous: true },
        { agence: "Voyages Rive Gauche 🇫🇷", offre: "Croisière Nil + Le Caire 5★", inclus: ["Bateau + hôtel 5★","Pension complète","Visites"], exclus: ["Vol depuis Europe selon offre"], compagnie: "nd", horaires: "nd", dates: "03 sept 2026", duree: "8j", hotels: "5★ + bateau 5★", prix: "≈1 659 € (~17 900 DH)", site: "https://www.rive-gauche.fr", instagram: "nd", verifie: true },
        { agence: "Havas Voyages 🇫🇷", offre: "Caire + croisière Nil + Grand Musée", inclus: ["Croisière Louxor-Assouan","Grand Musée égyptien"], exclus: ["nd"], compagnie: "nd", horaires: "nd", dates: "nd", duree: "nd", hotels: "nd", prix: "dès 1 316 € (~14 200 DH)", site: "https://www.havas-voyages.fr", instagram: "nd", verifie: true },
        { agence: "Jet tours 🇫🇷", offre: "Circuits/croisières Égypte (429 offres)", inclus: ["selon circuit"], exclus: ["nd"], compagnie: "nd", horaires: "nd", dates: "2026-2027", duree: "variable", hotels: "variable", prix: "dès 499 € (~5 400 DH, hors vol selon offre)", site: "https://www.jettours.com", instagram: "nd", verifie: true },
        { agence: "TD Viajes 🇪🇸", offre: "Caire + croisière Nil", inclus: ["Vols depuis Espagne","Croisière + Caire"], exclus: ["nd"], compagnie: "nd", horaires: "nd", dates: "départs lundi & samedi (Madrid/Bilbao/BCN)", duree: "8j/7n", hotels: "nd", prix: "1 121 € (~12 100 DH)", site: "https://tdviajes.net", instagram: "nd", verifie: true },
        { agence: "B travel 🇪🇸", offre: "Croisière Nil + montgolfière Louxor + Caire", inclus: ["Croisière","Montgolfière Louxor","Le Caire complet"], exclus: ["nd"], compagnie: "nd", horaires: "nd", dates: "2026", duree: "8j/7n", hotels: "nd", prix: "1 552 € (~16 800 DH)", site: "https://www.btravel.com", instagram: "nd", verifie: true }
      ],
      benchmarkIntlAnalyse: [
        "⚠️ Comparaison à manier : les prix FR/ES partent d'EUROPE (vol différent) et sont majoritairement CROISIÈRE NIL, pas Caire+Sharm balnéaire comme notre offre héros → pas un strict apples-to-apples.",
        "MON FORT : je pars du MAROC (pas de vol Europe à ajouter pour le client MA), je combine culture (Caire+Nil) ET balnéaire 5★ Sharm 7 nuits, en darija/FR. Les FR/ES vendent surtout la croisière Nil seule.",
        "CE QUI ME DISTINGUE : ancrage marché marocain + Sharm inclus. Là où l'Europe est plus forte : croisière Nil packagée + extras (Grand Musée, montgolfière Louxor) que je pourrais ajouter pour monter en gamme.",
        "MON FAIBLE : en € convertis, TD Viajes (~12 100 DH) et Havas (~14 200 DH) affichent moins cher SUR LA CROISIÈRE NIL — mais data incomplète (inclus/vol origine). À surveiller si je lance une offre croisière Nil pure."
      ],
      // Engagement réel — POSTS ÉGYPTE uniquement (scrape 6 mois). Chaque ligne = 1 post réel sur l'Égypte (pas une moyenne de compte).
      engagementReelNote: "À LIRE : ces chiffres = les VRAIES vues/likes de POSTS portant sur l'ÉGYPTE (filtrés sur 6 mois), pas une moyenne du compte. Ils servent à voir ce que rapporte un contenu Égypte chez les concurrents.",
      engagementReel: [
        { compte: "@amr.a.salah (créateur 🇪🇬)", format: "Reel humour célébrités au Caire", vues: "42 575", likes: "1 923", comm: "—" },
        { compte: "@terratour_voyages (agence MA)", format: "Reel « Grand Tour Égypte »", vues: "23 987", likes: "422", comm: "—" },
        { compte: "@ajinsafro.ma (agence MA)", format: "Reel « Évasion Égypte 11j dès 16 950 »", vues: "15 553", likes: "294", comm: "—" },
        { compte: "@travelwithraad (UGC 🇪🇬)", format: "Reel patrimoine (Sainte Famille)", vues: "11 048", likes: "2 168", comm: "—" },
        { compte: "@experienceegypt (officiel)", format: "Reel actu Mondial 2026", vues: "9 535", likes: "874", comm: "—" },
        { compte: "@ajinsafro.ma (agence MA)", format: "Reel Caire & Sharm (concurrent direct)", vues: "125", likes: "2", comm: "0" },
        { compte: "▶ @voyages21maroc (NOUS)", format: "Meilleur reel récent (toutes dest.)", vues: "149", likes: "6", comm: "1" }
      ],
      learnings: [
        "Le format qui scale chez les leaders = REEL court + audio tendance, caption quasi vide (« Réservation + numéro ») → l'audio et le format font le reach, pas le texte (Vacancia : jusqu'à 95k vues)",
        "Terratour est le meilleur en engagement (méd. ~15,7k vues) avec un schéma simple : 1 destination + dates précises + « places limitées » + n° de tél",
        "OPPORTUNITÉ : AjiNsafro vend un Caire & Sharm quasi identique au nôtre mais son contenu plafonne à ~120 vues / 2 likes malgré 70k abonnés → le terrain contenu Égypte est OUVERT",
        "Hack d'engagement : un concours « gagne une Omra » (Transatour) génère 1 769 commentaires — utile pour gonfler la portée d'un lancement",
        "MSM mise sur les carrousels (likes corrects) mais sans reels → reach plafonné : les reels sont le levier manquant que V21 peut prendre",
        "Réalité V21 : on démarre à ~50-150 vues. Priorité = régularité (4 reels/sem) + audio tendance, AVANT le léché. Le volume précède le perfectionnisme"
      ],
      apifyStatut: "✅ Scrape Apify AUTONOME via API REST (14/06/2026, run xX5xp5YSctnvvqkhE = 85 posts / 8 comptes, + run V21 jH5WMU4rjZ66G8evx = 12 posts). Médianes sur 12 posts récents/compte. ⚠️ @olevoyages.ma non récupéré (compte restreint au scrape) — à relancer. Données likes/vues = réelles à la date du scrape."
    },

    // 3) CADRAN forces / faiblesses / à améliorer (offre Caire & Sharm)
    cadran: {
      forces: [
        "Hôtels 5★ NOMMÉS et garantis (Marriott, Aurora, Cleopatra, Mövenpick) — vs « au choix » non nommé chez AjiNsafro",
        "7 nuits balnéaires à Sharm (1 de plus qu'AjiNsafro)",
        "Dîner-croisière sur le Nil avec spectacle inclus",
        "Marque 25 ans + assistance Voyages21 (réassurance)"
      ],
      faiblesses: [
        "Prix +18 % vs AjiNsafro (≈20 600 vs ≈17 400 DH coût réel) pour un programme quasi identique",
        "Programme Caire MOINS dense qu'AjiNsafro (pas de Citadelle ni Musée égyptien)",
        "Horaires de vol non publiés → le J1 peut être perdu (arrivée tardive)",
        "Hôtels 5★ peu différenciants si le concurrent est aussi 5★"
      ],
      ameliorer: [
        "Publier les horaires de vol : si arrivée tôt au J1 → argument « +1 journée » qu'aucun concurrent n'a",
        "Ajouter Citadelle de Salah Eddine + Musée égyptien au programme Caire",
        "Clarifier dans la com si visa/tips sont inclus ou non (transparence)",
        "Mettre en avant les hôtels NOMMÉS dans chaque post (vs concurrent flou)"
      ]
    },

    // 4) PROPOSITIONS DE CONTENU (posts, hooks, accroches, audio)
    contenu: {
      posts: [
        {
          visuel: "Pyramides de Gizeh & Sphinx (coucher de soleil)",
          accroche: "L'Égypte éternelle, en 5 étoiles. ✨ Au pied des pyramides de Gizeh, là où le temps s'est arrêté depuis 4 500 ans.",
          legende: "Le Caire & Sharm El Sheikh — 11 jours, hôtels 5★, vols Casablanca inclus. À partir de 19 600 DH/pers. 📲 WhatsApp 0661 24 70 49",
          hashtags: "#Voyages21 #Égypte #LeCaire #Pyramides #VoyageDeLuxe",
          audio: "Musique orientale cinématographique douce (oud + nappes), montée épique sur la révélation des pyramides."
        },
        {
          visuel: "Dîner-croisière sur le Nil au coucher du soleil",
          accroche: "Un dîner sur le Nil, au coucher du soleil. 🌅 Spectacle, musique live et la plus belle des tables, sur le fleuve des pharaons.",
          legende: "Inclus dans notre circuit Le Caire & Sharm El Sheikh — 5★, vols compris. Dès 19 600 DH/pers · départs juillet→septembre 2026. 📲 0661 24 70 49",
          hashtags: "#Voyages21 #Égypte #CroisièreNil #LeCaire",
          audio: "Ambiance lounge orientale chaleureuse, percussions légères, voix off posée et premium."
        },
        {
          visuel: "Sharm El Sheikh — mer Rouge turquoise & resort 5★",
          accroche: "Après les pharaons, la mer Rouge. 🐠 7 nuits en tout compris dans un resort 5★ face aux récifs de Sharm El Sheikh.",
          legende: "Culture ET détente : le grand voyage d'Égypte, signé Voyages21. 11 jours, vols inclus, dès 19 600 DH/pers. 📲 0661 24 70 49 · voyages21.com",
          hashtags: "#Voyages21 #Égypte #SharmElSheikh #MerRouge",
          audio: "Musique fraîche et solaire (deep-house douce), respiration, sons d'eau."
        }
      ],
      noteVisuels: "⚠️ Visuels Higgsfield NON encore générés (gate web). Prompts prêts dans content-studio/campagne-egypte-sharm.md — à lancer depuis l'app desktop (crédits OK : 466).",
      planning: "Rythme 4 posts/sem (IG+FB+TikTok). Suggestion : mardi 18h30, jeudi 18h30, samedi 11h, dimanche 18h30. Validation Karim : libre, n'importe quand."
    },

    // INFLUENCEURS / BLOGUEURS / YOUTUBEURS — Égypte (4 MA + 4 EU)
    influenceurs: [
      { origine: "🇲🇦 Maroc", nom: "Maroua Merzouqui", plateforme: "Instagram (UGC voyage)", audience: "micro-influence, fort like-rate", sujet: "Voyages organisés vus de l'intérieur, ton sincère prix/valeur (partenariats agences MA).", lien: "https://www.instagram.com/maroua_merzouqui/" },
      { origine: "🇲🇦 Maroc", nom: "Comptes outgoing MA (Vacancia/Olé/AjiNsafro)", plateforme: "Instagram (agences-créateurs)", audience: "70-139 K", sujet: "Promo Égypte (Caire/Nil/Hurghada), reels prix + réservation. Concurrents qui font office d'influence.", lien: "https://www.instagram.com/vacancia.ma/" },
      { origine: "🇲🇦 Maroc", nom: "⚠️ Blogueur MA spécial Égypte", plateforme: "à identifier", audience: "—", sujet: "Pas de blogueur MA purement « Égypte » identifié au scrape → à confirmer via scrape ciblé (sinon compléter en EU).", lien: "" },
      { origine: "🇲🇦 Maroc", nom: "Voyageurs MA (UGC à recruter)", plateforme: "Instagram/TikTok", audience: "micro", sujet: "Clients V21 réels = futur vivier UGC Égypte (à activer systématiquement au retour de voyage).", lien: "" },
      { origine: "🇫🇷 France", nom: "Bruno Maltor", plateforme: "Instagram/YouTube/TikTok", audience: "~2 M (multi-plateformes)", sujet: "Voyage grand public premium, storytelling lieux iconiques. Reels 300-450 k vues. Référence de prod.", lien: "https://www.instagram.com/brunomaltor/" },
      { origine: "🇫🇷 France", nom: "Asgard Projet (Guillaume)", plateforme: "Instagram", audience: "niche", sujet: "« Voyages initiatiques » Égypte = angle spiritualité/transformation, premium expérientiel.", lien: "https://www.instagram.com/asgardprojet/" },
      { origine: "🇪🇺 Intl", nom: "El Yakout Voyages 🇫🇷", plateforme: "Instagram (agence FR)", audience: "—", sujet: "Vend « Sharm El Sheikh & Le Caire » → vocabulaire et arguments FR à comparer/observer.", lien: "https://www.instagram.com/elyakoutvoyages/" },
      { origine: "🇪🇺 Intl", nom: "Beyond Egypt Travel", plateforme: "Instagram (expert Égypte)", audience: "—", sujet: "Ton « insider/guide » sur l'Égypte (Louxor, montgolfière, conseils) → modèle éditorial expert.", lien: "https://www.instagram.com/beyondegypt_travel_/" }
    ],
    influenceursNote: "⚠️ Garde-fou : aucun blogueur marocain purement spécialisé Égypte n'a été identifié de façon fiable au scrape. 2 lignes MA sont donc « à activer » (UGC clients + partenariats). Pour 4 MA solides, un scrape ciblé d'influenceurs voyage MA est recommandé.",

    // STRATÉGIE RÉSEAUX déclinée à l'Égypte
    reseauxDestIntro: "Application du playbook général au contexte Égypte (culture + balnéaire, cible familles/couples MA, darija+FR).",
    reseauxDest: [
      { nom: "📸 Instagram", conseil: "Reels révélation pyramides + transition Caire→Nil→Sharm, audio tendance. Carrousel « itinéraire 10 jours » pour les saves. Stories quotidiennes avec sticker WhatsApp.", exemple: "Reproduire le plan @athira.asok (face aux pyramides) avec chaque client + le format @vacancia (audio, 95k vues)." },
      { nom: "👍 Facebook", conseil: "Cible MRE/40+ : posts détaillés prix+programme+dîner-croisière, cross-post des reels. Indispensable : convertir en Page pro pour les ads Égypte.", exemple: "Post « Caire & Sharm 5★ dès 19 600 DH » avec la liste inclus/exclus (transparence = différenciant vs concurrents flous)." },
      { nom: "🎵 TikTok", conseil: "Reel brut « POV : 1re fois face aux pyramides » + série « Jour X/10 en Égypte ». Audio TikTok (≠ tendances IG).", exemple: "Décliner le POV @melianjulio en darija ; tester un cost-breakdown « Égypte depuis Casa, le vrai budget »." },
      { nom: "👻 Snapchat", conseil: "Phase ads d'abord : Snap Ads géolocalisées (Casa/Rabat/Marrakech) sur l'offre Égypte, format vertical direct « dernières places ».", exemple: "Story flash « départ 6 août, 4 places » → swipe-up WhatsApp." },
      { nom: "📌 Pinterest", conseil: "Épingles verticales « Itinéraire Égypte 10 jours », « Croisière Nil guide », keyword-first → trafic long terme vers voyages21.com.", exemple: "Recycler chaque slide du carrousel itinéraire en épingle ; publier dès juillet pour la saison oct→avril." },
      { nom: "🎬 Vidéo / YouTube", conseil: "Talking-head Karim « 5 erreurs croisière Nil » (autorité) + B-roll Égypte. YouTube Shorts = SEO durable.", exemple: "Un Short « L'Égypte, c'est safe ? » répond à LA question qui bloque l'achat." }
    ],

    // 5) INSPIRATION VIRALE (web global + France + Pinterest) — recherche 13/06/2026
    viral: {
      statut: "✅ Reels (8) + UGC (8) réels cliquables, analyse experte. Garde-fou UGC actif (voir note). Scrape Apify 14/06.",
      // Exemples viraux réels — liens cliquables (à reproduire avec la marque V21, pas plagier)
      ugcGardeFou: "Garde-fou : UGC = vrais voyageurs/créateurs montrant l'Égypte, triés par VUES réelles (scrape 6 mois, déc. 2025→juin 2026). ⚠️ Constat : les agences MA font surtout des CARROUSELS pour l'Égypte (sans compteur de vues) → peu de reels MA à fort reach (2 vraiment forts). Pour plus, scrape d'influenceurs Égypte dédiés.",
      viralReelsMa: [
        { origine: "🇲🇦 Maroc", titre: "Grand Tour Égypte (le reel MA Égypte n°1)", compte: "@terratour_voyages", lien: "https://www.instagram.com/p/DTSVUJuDJWF/", stat: "23 987 vues · 422 ❤️", son: "Audio original (terratour)", sonLien: "https://www.instagram.com/p/DTSVUJuDJWF/", pourquoi: "Le reel Égypte d'agence MA le plus vu (6 mois). Montage « voyage d'exception » soigné + audio original = perçu premium.", message: "« Offrez-vous un voyage d'exception »", hook: "Plan d'ouverture monumental (temple/Nil)", plans: "B-roll varié Caire/Nil/temples, rythme posé premium.", posture: "Qualité de prod = signal de sérieux. Filmer en 4K, étalonnage chaud." },
        { origine: "🇲🇦 Maroc", titre: "Évasion Égypte 11j/10n dès 16 950 DH", compte: "@ajinsafro.ma", lien: "https://www.instagram.com/p/DYWs4-ngLZD/", stat: "15 553 vues · 294 ❤️", son: "« The Pharaoh Is Coming » — Anthony Lo Re", sonLien: "https://www.instagram.com/p/DYWs4-ngLZD/", pourquoi: "Le son cinématique « pharaonique » colle à la destination et crée l'épique → forte rétention. Prix affiché = clarté.", message: "« 11 jours en Égypte dès 16 950 DH »", hook: "Drop épique sur la révélation des pyramides", plans: "Montée musicale + monuments + carton prix.", posture: "Choisir un SON thématique Égypte (cf. ce track) plutôt qu'un son générique." },
        { origine: "🇲🇦 Maroc", titre: "Caire & Sharm (concurrent direct — reel faible)", compte: "@ajinsafro.ma", lien: "https://www.instagram.com/p/DZXvWc2mkKD/", stat: "125 vues · 2 ❤️", son: "Audio original (faible portée)", sonLien: "https://www.instagram.com/p/DZXvWc2mkKD/", pourquoi: "MÊME offre que notre héros mais visuel pauvre → la demande existe, le contenu manque. Preuve que le terrain est ouvert.", message: "« Caire + Sharm, pyramides + plages »", hook: "Aucun hook fort (à éviter)", plans: "Photos figées + texte. Contre-modèle.", posture: "Faire l'inverse : vrai film, hôtel 5★ nommé, son thématique." }
      ],
      viralReelsIntl: [
        { origine: "🇪🇬 Égypte", titre: "Humour viral — célébrités au Caire", compte: "@amr.a.salah", lien: "https://www.instagram.com/p/DYsZfOVuJzi/", stat: "42 575 vues · 1 923 ❤️", son: "« Loco » — Ramzuto", sonLien: "https://www.instagram.com/p/DYsZfOVuJzi/", pourquoi: "L'HUMOUR + people (« Amr Diab & Jason Statham ») = partage massif. L'émotion (rire) bat la promo.", message: "Surprise / second degré local", hook: "« When you spot [célébrité]… »", plans: "Caméra spontanée, punchline visuelle.", posture: "Oser un ton léger/humour localisé (rare chez les agences = différenciant)." },
        { origine: "🇪🇬 Égypte", titre: "Officiel tourisme — coup d'envoi Mondial 2026", compte: "@experienceegypt", lien: "https://www.instagram.com/p/DZekY39tEy8/", stat: "9 535 vues · 874 ❤️", son: "Audio original (officiel)", sonLien: "https://www.instagram.com/p/DZekY39tEy8/", pourquoi: "Surfer sur l'ACTUALITÉ (Mondial, Grand Musée) = reach gratuit. Le compte officiel donne le ton « fierté nationale ».", message: "« L'Égypte au cœur de l'événement »", hook: "Accroche actualité forte", plans: "Images institutionnelles léchées.", posture: "Accrocher nos posts à l'actu Égypte (Grand Musée, Mondial)." },
        { origine: "🇪🇬 Égypte", titre: "Officiel — « la merveille qui a captivé le monde »", compte: "@experienceegypt", lien: "https://www.instagram.com/p/DZM8BxSNMvN/", stat: "7 767 vues · 513 ❤️", son: "Audio original (officiel)", sonLien: "https://www.instagram.com/p/DZM8BxSNMvN/", pourquoi: "Storytelling patrimonial (millénaire, éternité) + visuels soignés = aspirationnel intemporel.", message: "« Découvre la merveille »", hook: "« Captivated the world for centuries »", plans: "Plans larges monuments, lumière dorée.", posture: "Vendre l'émotion patrimoniale, pas que le prix." },
        { origine: "🇪🇬 Égypte", titre: "Officiel — carnaval voitures classiques", compte: "@experienceegypt", lien: "https://www.instagram.com/p/DYcvXNctCx9/", stat: "2 681 vues · 319 ❤️", son: "Audio original (officiel)", sonLien: "https://www.instagram.com/p/DYcvXNctCx9/", pourquoi: "Montre une Égypte VIVANTE/lifestyle (pas que pyramides) → élargit l'imaginaire de la destination.", message: "« L'Égypte au-delà des clichés »", hook: "Événement insolite", plans: "Ambiance festive, couleurs.", posture: "Diversifier l'image : culture + lifestyle + mer." }
      ],
      viralUgc: [
        { origine: "🇲🇦 Maroc", titre: "Concurrent direct — Caire & Sharm", compte: "@ajinsafro.ma", lien: "https://www.instagram.com/p/DZXvWc2mkKD/", stat: "121 vues · 2 ❤️", pourquoi: "Même offre que nous mais visuel pauvre (photos figées) → la demande existe, le contenu manque. À REFAIRE en mieux.", message: "« Caire + Sharm, pyramides + plages »", hook: "Offre spéciale Caire & Sharm 🌴", plans: "Photos statiques pyramides/plage + texte prix. À remplacer par un vrai film 5★.", posture: "Montrer l'hôtel 5★ NOMMÉ et le dîner-croisière (preuves concrètes vs promesse vague)." },
        { origine: "🇲🇦 Maroc", titre: "Le format qui scale — reel + audio", compte: "@vacancia.ma", lien: "https://www.instagram.com/p/DZFivwkN-x-/", stat: "95 482 vues · 571 ❤️", pourquoi: "Audio tendance + montage court + caption quasi vide = l'algo pousse au reach, pas le texte. Le copywriting ne fait pas le reach, le SON et le RYTHME oui.", message: "« Réserve, tu peux partir »", hook: "Plan d'ouverture spectaculaire (skyline/monument) sur le drop", plans: "5-7 plans serrés au beat, transitions sur temps fort de l'audio.", posture: "Choisir un audio TENDANCE du jour, pas une banque libre. Couper au beat." },
        { origine: "🇲🇦 Maroc", titre: "Squelette « destination + dates + places limitées »", compte: "@terratour_voyages", lien: "https://www.instagram.com/p/DX9xEMlMHjW/", stat: "71 551 vues · 1 888 ❤️", pourquoi: "Structure ultra-claire qui convertit : 1 destination + dates précises + rareté (« places limitées ») + n° de tél. Crée l'urgence.", message: "« Pars en [destination], du [date] au [date], places limitées »", hook: "Beau plan destination + date en gros à l'écran", plans: "B-roll destination + cartons dates + CTA téléphone.", posture: "Toujours afficher DATES + rareté : c'est ce qui déclenche le DM." },
        { origine: "🇲🇦 Maroc", titre: "Reel circuit Asie premium (transposable)", compte: "@terratour_voyages", lien: "https://www.instagram.com/p/DZKRrxNszhZ/", stat: "40 477 vues · 1 141 ❤️", pourquoi: "Prouve qu'un circuit « lointain culturel » se vend en reel propre et rythmé. Modèle pour un reel Caire+Nil premium.", message: "« Vis le [pays] avec nous »", hook: "Verbe d'action + pays + emoji drapeau", plans: "Montage paysages forts + 2-3 dates.", posture: "Qualité de prod = perçue comme qualité de l'agence (premium)." },
        { origine: "🇲🇦 Maroc", titre: "Reel combiné Asie (reach)", compte: "@follow_me_travel_", lien: "https://www.instagram.com/p/DZWC40AznlA/", stat: "16 953 vues · 454 ❤️", pourquoi: "Montage multi-décors rapide = effet « waouh » qui retient → fort taux de complétion.", message: "« 2-3 destinations en un voyage »", hook: "Enchaînement rapide de 3 décors dès la 1re seconde", plans: "Whip-cuts entre décors, tempo soutenu.", posture: "Transposer Caire → Nil → mer Rouge en 3 temps." },
        { origine: "🇲🇦 Maroc", titre: "★ Concours « gagne une Omra » (mécanique de portée)", compte: "@voyage.or", lien: "https://www.instagram.com/p/DYKcyl7oogK/", stat: "22 014 vues · 4 283 ❤️ · 2 244 comm", pourquoi: "Le concours fait EXPLOSER les commentaires (2 244) → l'algo interprète = contenu chaud → reach démultiplié. Levier n°1 pour lancer un compte.", message: "« Suis + partage + commente, tu peux gagner »", hook: "« GAGNE [récompense] 🎁 »", plans: "Visuel récompense + règles claires en carton.", posture: "Adapter en concours Égypte (« gagne ton voyage / une nuit 5★ »), règlement transparent." },
        { origine: "🇲🇦 Maroc", titre: "Concours communautaire (confirmation)", compte: "@transatourmaroc", lien: "https://www.instagram.com/p/DXq9aEZD7GQ/", stat: "3 163 vues · 629 ❤️ · 1 769 comm", pourquoi: "Confirme la mécanique : « chaque 2 semaines un gagnant » → engagement récurrent qui fidélise et nourrit le reach dans la durée.", message: "« Un gagnant toutes les 2 semaines »", hook: "Récompense forte + récurrence", plans: "Carton récompense + tag d'amis demandé.", posture: "Demander de TAGUER des amis = portée organique gratuite." },
        { origine: "🇲🇦 Maroc", titre: "Carrousel « prix choc » (sauvegardes)", compte: "@msm_voyages", lien: "https://www.instagram.com/p/DYCoCVeCEiV/", stat: "carrousel · 400 ❤️", pourquoi: "Le carrousel « offre détaillée + prix » génère des SAVES (intention d'achat) même sans reach reel. Complément du reel.", message: "« Programme premium, prix net »", hook: "Prix barré / « à partir de » en slide 1", plans: "Slides : prix → programme → inclus → CTA.", posture: "Carrousel = closing (détails), reel = reach. Faire les DEUX." }
      ],
      viralUgc: [
        { origine: "🇪🇬 Égypte", titre: "Le sens du patrimoine — la Sainte Famille en Égypte", compte: "@travelwithraad", lien: "https://www.instagram.com/p/DZE6wl7stET/", stat: "11 048 vues · 2 168 ❤️", son: "Audio original", sonLien: "https://www.instagram.com/p/DZE6wl7stET/", pourquoi: "Like-rate ÉNORME (2 168/11k) : le récit historico-spirituel touche profond → partages. L'Histoire racontée > la promo.", message: "« Marcher là où l'Histoire s'est écrite »", hook: "Référence patrimoniale forte dès le départ", plans: "Lieux chargés de sens + narration posée.", posture: "Raconter une HISTOIRE (pas vendre un prix) ; idéal en voix off darija/FR." },
        { origine: "🇪🇬 Égypte", titre: "Aspirationnel plage — North Coast / Sahel", compte: "@linashible", lien: "https://www.instagram.com/p/DZW-CpdqMHm/", stat: "6 539 vues · 338 ❤️", son: "Mix — alexmacknzie / nadia_maras", sonLien: "https://www.instagram.com/p/DZW-CpdqMHm/", pourquoi: "Esthétique « summer/lifestyle » léchée + son mix tendance → désir immédiat. Montre l'Égypte balnéaire chic.", message: "« L'été égyptien, version chic »", hook: "Plan eau turquoise + mood d'été", plans: "Montage lumineux, transitions douces.", posture: "Soigner l'image (étalonnage, tenue) pour la cible jeune CSP+." },
        { origine: "🌍 Intl", titre: "UGC désert — « plus vieux que 4 000 ans »", compte: "@alishasakpal", lien: "https://www.instagram.com/p/DZfzFEEN4yi/", stat: "1 155 vues · 161 ❤️", son: "Audio tendance (lifestyle)", sonLien: "https://www.instagram.com/p/DZfzFEEN4yi/", pourquoi: "Punchline temporelle (« older than 4,000 years ») + esthétique désert = scroll-stopper. L'Histoire comme accroche.", message: "« Marcher dans 4 000 ans d'Histoire »", hook: "« Serving looks older than 4,000 years »", plans: "Plan large désert/temple + tenue soignée.", posture: "Jouer la fierté patrimoniale + soin de l'image." },
        { origine: "🌍 Intl", titre: "UGC Pyramides de Gizeh", compte: "@athira.asok", lien: "https://www.instagram.com/p/DZe6BnWCKaM/", stat: "❤️ 261", son: "Audio tendance", sonLien: "https://www.instagram.com/p/DZe6BnWCKaM/", pourquoi: "Le plan « moi face aux pyramides » reste un aimant universel à likes. Preuve sociale + rêve.", message: "« J'y suis, face aux pyramides »", hook: "Révélation des pyramides plein cadre", plans: "Contre-plongée pyramides + silhouette voyageur.", posture: "Le plan signature à recréer avec chaque client (UGC systématique)." },
        { origine: "🌍 Intl", titre: "POV Gizeh — « l'Égypte change ta perception du temps »", compte: "@melianjulio", lien: "https://www.instagram.com/p/DZjBzseDfO0/", stat: "❤️ 91", son: "Audio original", sonLien: "https://www.instagram.com/p/DZjBzseDfO0/", pourquoi: "Angle réflexif/émotionnel (le temps, l'éternité) → différencie de la promo. Touche une corde sensible.", message: "« Face aux pyramides, le temps s'arrête »", hook: "« L'Égypte change ta perception du temps »", plans: "Plan contemplatif + voix off posée.", posture: "Reproduire en darija/FR avec voix off de Karim (autorité + émotion)." },
        { origine: "🇪🇬 Égypte", titre: "UGC mer Rouge — « Merci Hurghada »", compte: "@derwalux", lien: "https://www.instagram.com/p/DZjqne6jU-y/", stat: "❤️ 64", son: "Audio original", sonLien: "https://www.instagram.com/p/DZjqne6jU-y/", pourquoi: "La partie balnéaire (Hurghada/Sharm) vue par un vrai voyageur → preuve que l'Égypte n'est pas QUE culturelle.", message: "« L'Égypte, c'est aussi la mer Rouge »", hook: "Eau turquoise + remerciement spontané", plans: "Plan plage/snorkeling + sourire.", posture: "Mettre en avant le balnéaire 5★ Sharm de notre offre (différenciant)." }
      ],
      formats: [
        "POV première personne — « POV : tu arrives en Égypte pour la 1re fois » (identification + complétion)",
        "« X choses que personne ne te dit » — liste numérotée (sauvegarde max)",
        "Transition tenue/lieu — désert→croisière→mer Rouge (viral sans barrière de langue)",
        "Attentes vs réalité — clichés vs vraie Égypte (dahabeya privée, temples sans foule)",
        "Day in my life cinématique — une journée à Louxor/Abou Simbel",
        "Cost breakdown — « 10 jours tout compris depuis Casa, le vrai budget »",
        "Hidden gems — Dahchour, Abydos, Désert Blanc, Siwa (anti-masse, premium)",
        "B-roll cinématique + voix off Karim (image de marque)",
        "Série épisodique — « Jour 3/10 en Égypte » (fidélise)",
        "FAQ / réponse à une question — « L'Égypte c'est safe ? » (SEO social + confiance)"
      ],
      hooks: [
        "Ce que personne ne te dit avant l'Égypte",
        "L'Égypte en 2026, ce n'est plus ce que tu crois",
        "Tu penses que l'Égypte c'est juste les pyramides ? Regarde ça",
        "5 erreurs qui gâchent une croisière sur le Nil (et comment les éviter)",
        "10 jours en Égypte : ce qu'on a fait jour par jour",
        "Je n'étais pas prêt pour Abou Simbel au lever du soleil",
        "L'Égypte depuis Casa → combien ça coûte vraiment, sans surprises",
        "Wach 3arftou belli Misra men a7san safar f 2026 ? (darija)",
        "POV : tu prends l'avion avec Voyages21 pour la croisière de tes rêves"
      ],
      pinterest: [
        "Format vertical 2:3 — 1000×1500px, sans watermark ; le TEXTE sur image = le hook (autoplay muet)",
        "Pinterest = moteur de recherche : boards keyword-first, descriptions ≤500 car., PAS de hashtags en 2026",
        "Boards à créer : « Voyage en Égypte — Circuits & Croisières 2026 », « Croisière sur le Nil — Guide », « Pyramides & Le Caire », « Louxor Aswan Temples », « Sharm El Sheikh Mer Rouge », « Moodboard Égypte Luxe », « Égypte en Famille », « Préparer son Voyage »",
        "Cadence 5-10 épingles/jour ; durée de vie 3-6 mois (trafic long terme)",
        "Types gagnants : itinéraires > comparatifs > moodboards > infographies budget > tips",
        "Saisonnalité : publier 45-90 j avant (haute saison oct.→avril → publier dès juillet)",
        "Long-tail : « circuit Égypte 10 jours pas cher », « croisière Nil tout compris depuis Maroc », « Sharm ou Hurghada snorkeling »",
        "Activer Pinterest Business + Rich Pins (vérifier le domaine voyages21)"
      ],
      audioNote: "🔥 Sons qui CARTONNENT réellement sur l'Égypte (relevés sur les reels les plus vus, scrape 6 mois). Le lien ouvre le reel où le son joue — clique « audio » dans IG pour le réutiliser. Les liens libres de droits (Pixabay) = uniquement pour les ADS (où le son tendance est interdit).",
      audio: [
        { style: "🔥 « The Pharaoh Is Coming » — Anthony Lo Re (cinématique pharaonique)", usage: "LE son qui colle à l'Égypte — utilisé par le reel ajinsafro 15 553 vues. Épique sur la révélation des pyramides.", lien: "https://www.instagram.com/p/DYWs4-ngLZD/" },
        { style: "🔥 « Loco » — Ramzuto (énergie virale)", usage: "Son du reel le plus vu (amr.a.salah, 42 575 vues). Pour un ton dynamique/léger.", lien: "https://www.instagram.com/p/DYsZfOVuJzi/" },
        { style: "🔥 Audios en TENDANCE du jour (IG/TikTok)", usage: "Le levier n°1 du reach. Onglet « audios en hausse » de l'app, PAS une banque libre.", lien: "https://www.instagram.com/reels/audio/" },
        { style: "Cinématique oriental (libre de droits — ADS)", usage: "Pour les pubs payantes (son tendance interdit en ads).", lien: "https://pixabay.com/music/world-egypt-ethnic-arabic-cinematic-background-music-136331/" },
        { style: "Ambient oud/ney (libre de droits — ADS)", usage: "Croisière contemplative, voix off, en publicité.", lien: "https://pixabay.com/music/world-fading-light-of-the-faiyum-ancient-egyptian-arabic-ney-flute-176523/" }
      ],
      postsClesEnMain: [
        {
          titre: "Reel POV arrivée au Caire (45-60s)",
          format: "Reel cinématique · audio tendance",
          lienCible: "https://www.instagram.com/p/DYWs4-ngLZD/",
          promptIA: "Cinematic first-person POV, ultra realistic, shot on iPhone 15 Pro, 9:16 vertical. A traveler arrives at the Giza pyramids at golden hour: warm low sunlight, long shadows, fine desert sand drifting. Slow reveal of the Great Pyramid filling the frame, a lone camel and silhouette in foreground. Photorealistic textures, natural film grain, soft volumetric light, 4K, shallow depth of field, no text. Camera: slow push-in then tilt up to the pyramid apex.",
          musique: "« The Pharaoh Is Coming » — Anthony Lo Re (son cinématique égyptien, utilisé par le reel ajinsafro 15 553 vues)",
          musiqueLien: "https://www.instagram.com/p/DYWs4-ngLZD/",
          langues: "FR (légende) + darija (voix off) — 2 versions",
          script: "Plan 1 (0-2s, HOOK) : noir → texte « POV : tu vois les pyramides pour la 1re fois ». Plan 2-4 : taxi, fenêtre, première silhouette de Gizeh. Plan 5 (climax) : pyramide plein cadre au coucher de soleil, drop musical. Plan final : carton « Le Caire & Sharm · 11j · 5★ · dès 19 600 DH » + logo V21.",
          visuel: "Lumière dorée fin de journée, ton chaud, transitions au beat. Format 9:16, sous-titres FR brûlés.",
          casting: "Pas d'acteur requis (POV caméra subjective). Si voix : Karim ou voix off darija chaleureuse.",
          tournage: "Vraies images Égypte (banque/UGC client autorisé) ou B-roll retravaillé. JAMAIS de faux client. Montage CapCut, 6-8 plans max.",
          cta: "« Programme complet en bio · WhatsApp 0661 24 70 49 »",
          kpis: "Vues > 10 000 · rétention 3s > 60 % · saves > 100 · 1er reel = test d'audience"
        },
        {
          titre: "Reel « 5 erreurs sur la croisière du Nil » (60-90s)",
          format: "Reel expert · liste numérotée",
          lienCible: "https://www.instagram.com/p/DZM8BxSNMvN/",
          promptIA: "Ultra realistic cinematic B-roll of a luxury Nile river cruise, 9:16 vertical, 4K. A traditional dahabiya sailboat glides on the Nile at sunset, palm-lined banks, golden reflections on calm water. Cut to ancient temple columns (Kom Ombo) in warm light, then a hot-air balloon over Luxor at dawn. Photorealistic, natural light, gentle camera movement, film grain, no text, documentary travel look.",
          musique: "Cinématique oriental doux (oud/ney) pour la voix off experte — ex. son libre de droits Pixabay",
          musiqueLien: "https://pixabay.com/music/world-fading-light-of-the-faiyum-ancient-egyptian-arabic-ney-flute-176523/",
          langues: "FR principal · variante darija",
          script: "HOOK (0-3s) : « 5 erreurs qui gâchent une croisière sur le Nil ❌ ». Puis 1→5 en plans rapides : 1. partir en plein août, 2. bateau surpeuplé (vs dahabeya), 3. rater Abou Simbel au lever, 4. sauter Kom Ombo/Edfou, 5. guide non francophone. Carton final : « Chez Voyages21, tout est déjà réglé ✅ ».",
          visuel: "Texte plein écran par erreur, B-roll temples/Nil, rythme soutenu. Couleurs V21 (vert/or) sur les cartons.",
          casting: "Optionnel : Karim en talking-head sur l'intro/outro (autorité).",
          tournage: "B-roll + cartons animés. 90s max. Sauvegardable = on garde l'info dense.",
          cta: "« Enregistre ce reel pour ton prochain voyage · DM pour le programme »",
          kpis: "Saves > 200 (objectif n°1) · partages > 50 · commentaires « infos ? »"
        },
        {
          titre: "Carrousel + épingles « Itinéraire 10 jours en Égypte »",
          format: "Carrousel IG 10 slides + Pinterest",
          lienCible: "https://www.instagram.com/p/DYCoCVeCEiV/",
          langues: "FR (Pinterest = audience FR/SEO) + version IG darija possible",
          script: "Slide 1 : titre « 10 jours en Égypte depuis Casa · l'itinéraire ». Slides 2-9 : J1 Caire… J10 retour, 1 jour/slide avec visuel + 1 ligne. Slide 10 : récap prix + CTA. Réutiliser chaque slide en épingle Pinterest.",
          visuel: "Template carré 1080² (IG) + vertical 1000×1500 (Pinterest), titres Playfair, fond crème/vert.",
          casting: "Aucun.",
          tournage: "Design only (Canva). Double usage = 1 production, 2 plateformes, durée de vie 3-6 mois sur Pinterest.",
          cta: "« Itinéraire complet + prix → lien en bio »",
          kpis: "Saves > 300 · trafic Pinterest vers voyages21.com · épingles vues > 5 000 / mois"
        },
        {
          titre: "Reel transition « 3 destinations, 1 voyage » (15-30s)",
          format: "Reel transition · au beat",
          lienCible: "https://www.instagram.com/p/DTSVUJuDJWF/",
          promptIA: "Ultra realistic 9:16 vertical travel reel, 3 fast match-cuts, 4K. Shot 1: Giza pyramids at golden hour. Whip transition to Shot 2: a Nile cruise boat sailing past temples. Whip transition to Shot 3: turquoise Red Sea in Sharm El Sheikh with a snorkeler. Photorealistic, vivid warm colors, dynamic handheld feel, natural light, film grain, no text overlays. Each shot 2 seconds, cut on the beat.",
          musique: "Son tendance Égypte « The Pharaoh Is Coming » (Anthony Lo Re) ou audio en hausse du jour",
          musiqueLien: "https://www.instagram.com/p/DYWs4-ngLZD/",
          langues: "FR + darija (texte court)",
          script: "3 temps au beat : Pyramides (claquement) → Nil/croisière (claquement) → mer Rouge Sharm. Texte « Culture. Croisière. Mer Rouge. » Carton final prix + « depuis Casablanca ».",
          visuel: "Transitions whip/match-cut, audio tendance, 9:16, montage serré 15-25s.",
          casting: "Aucun (B-roll).",
          tournage: "3-6 plans, CapCut. Le format le plus partageable (pas de barrière de langue).",
          cta: "« Lien en bio · places limitées été 2026 »",
          kpis: "Vues > 15 000 · partages > 80 · taux de complétion > 80 %"
        },
        {
          titre: "★ Reel UGC témoignage VOYAGEUR (avec acteur) (60-90s)",
          format: "UGC authentique · talking-head + B-roll",
          lienCible: "https://www.instagram.com/p/DZE6wl7stET/",
          promptIA: "⚠️ PAS d'IA pour le témoignage (vrai voyageur = règle marque). Prompt IA uniquement pour un B-roll d'illustration : « Ultra realistic 9:16 cinematic B-roll of Cairo & the Nile — hotel arrival, 5-star lobby, Nile dinner cruise at night with lights, 4K, warm light, photorealistic, no text » à incruster derrière la voix du voyageur.",
          musique: "Lit/ambiance discrète sous le témoignage (ou aucun son sous la parole). B-roll : son cinématique doux.",
          musiqueLien: "https://pixabay.com/music/world-egypt-ethnic-arabic-cinematic-background-music-136331/",
          langues: "Darija dominante (authenticité MA) + sous-titres FR",
          script: "Un VRAI voyageur (client réel volontaire OU créateur partenaire identifié comme tel) raconte face caméra : « K`nt khayf men l'organisation… » (j'avais peur de l'organisation) → 3 moments forts (accueil aéroport, hôtel 5★ nommé, dîner-croisière) → « Voyages21 dar liya kulchi » (a tout géré). Incrustation B-roll de SON voyage.",
          visuel: "Brut, vertical, lumière naturelle, look « story » non léché = crédibilité. Logo discret.",
          casting: "BRIEF CASTING : client réel V21 (Égypte récente) OU micro-créateur MA 5-50k abonnés, voyage offert/défrayé, mention « partenariat » obligatoire. ⚠️ Règle marque : JAMAIS de faux témoignage ni d'influenceur IA.",
          tournage: "Tourné par le voyageur (smartphone) + 3 B-roll fournis par lui. Karim valide le montage. Droits à l'image signés.",
          cta: "« Ton tour ? DM “ÉGYPTE” · WhatsApp 0661 24 70 49 »",
          kpis: "Vues > 20 000 · taux de confiance (DM/commentaires positifs) · 1 UGC/mois en routine. Réf. : UGC @maroua→Vacancia = 41k vues / 1 291 ❤️"
        }
      ]
    }
  },

  turquie: {
    offres: [
      {
        titre: "Séjour à Istanbul", badge: "Entrée de gamme", duree: "8 j / 7 nuits",
        prix: "dès 9 700 DH/pers", prixDetail: "Triple 3★ 9 700 · Double 4★ 10 900–12 600 · Single 4★ 13 900",
        hotels: "3★ Laleli / 4★ Fatih / Taksim Square 4★",
        pension: "7 nuits logement + petit-déjeuner", vols: "Inclus — Turkish Airlines (Casablanca/Istanbul)",
        volsHoraires: "Été 2026 (juil.–août), départs garantis",
        inclus: ["Vols A/R Turkish Airlines", "7 nuits B&B", "Croisière sur le Bosphore incluse", "Transferts + taxes", "Guide arabophone (excursions)", "Assistance Voyages21"],
        exclus: ["Excursions (hors Bosphore)", "Extras & boissons", "Pourboires"],
        visites: "Mosquée Bleue, Hippodrome, Topkapı, Grand Bazar, Bosphore, Îles des Princesses (option)",
        dates: "Été 2026 (juillet–août)"
      },
      {
        titre: "Istanbul & Antalya", badge: "Combiné culture + mer", duree: "8 j / 7 nuits",
        prix: "dès 16 300 DH/pers", prixDetail: "Triple 16 300 · Double 17 900 · Single 23 800",
        hotels: "Istanbul 4★ + Antalya resort 5★ (Kemer/Belek)",
        pension: "2 nuits Istanbul (petit-déj) + 5 nuits Antalya tout compris", vols: "Inclus — Turkish Airlines + AJet",
        volsHoraires: "Été 2026", inclus: ["Vols A/R (bagages généreux)", "2 nuits Istanbul B&B", "5 nuits Antalya tout compris", "Tous les transferts", "Assistance Voyages21"],
        exclus: ["Extras & boissons", "Pourboires"],
        visites: "Escale Istanbul + balnéaire Antalya (Méditerranée)", dates: "Été 2026"
      },
      {
        titre: "Istanbul & Bodrum", badge: "Combiné mer Égée", duree: "8 j / 7 nuits",
        prix: "dès 16 900 DH/pers", prixDetail: "Triple 16 900 · Double 19 700 · Single 24 500",
        hotels: "Istanbul 4★ + Bodrum resort 5★ (vue mer)",
        pension: "2 nuits Istanbul (petit-déj) + 5 nuits Bodrum tout compris", vols: "Inclus — Turkish Airlines + AJet",
        volsHoraires: "Été 2026", inclus: ["Vols A/R", "2 nuits Istanbul B&B", "5 nuits Bodrum tout compris vue mer", "Tous les transferts", "Assistance Voyages21"],
        exclus: ["Extras & boissons", "Pourboires"],
        visites: "Escale Istanbul + marina & criques de Bodrum", dates: "Été 2026"
      },
      {
        titre: "Istanbul & Antalya (long séjour)", badge: "11 jours", duree: "11 j / 10 nuits",
        prix: "dès 19 900 DH/pers", prixDetail: "Triple 19 900 · Double 21 000 · Single 29 500",
        hotels: "Istanbul 3★/4★ + Antalya resort 5★",
        pension: "3 nuits Istanbul (petit-déj) + 7 nuits Antalya tout compris", vols: "Inclus — Turkish Airlines",
        volsHoraires: "Départs garantis : 23/07, 24/07, 30/07, 31/07, 06/08, 07/08, 13/08, 14/08, 20/08, 21/08",
        inclus: ["Vols A/R Turkish Airlines", "3 nuits Istanbul B&B", "Croisière sur le Bosphore offerte", "7 nuits Antalya tout compris", "Transferts + taxes", "Assistance Voyages21"],
        exclus: ["Extras & boissons", "Pourboires"],
        visites: "Mosquée Bleue, Topkapı, Grand Bazar, Bazar égyptien, Bosphore + 7 nuits Méditerranée", dates: "Été 2026"
      },
      {
        titre: "Istanbul, Marmaris & Bodrum", badge: "Grand combiné 11j", duree: "11 j / 10 nuits",
        prix: "dès 23 500 DH/pers", prixDetail: "Triple 23 500 · Double 24 700 · Single 35 000",
        hotels: "Istanbul 3★/4★ + Marmaris 5★ + Bodrum 5★ (vue mer)",
        pension: "3 nuits Istanbul (petit-déj) + 3 nuits Marmaris + 4 nuits Bodrum (tout compris)", vols: "Inclus — Turkish Airlines",
        volsHoraires: "Départs : 31/07, 03/08, 04/08, 09/08, 10/08, 16/08, 17/08, 21/08",
        inclus: ["Vols A/R Turkish Airlines", "3 nuits Istanbul B&B", "Croisière sur le Bosphore incluse", "3 nuits Marmaris + 4 nuits Bodrum tout compris", "Transferts", "Assistance Voyages21"],
        exclus: ["Excursions (hors Bosphore)", "Extras & boissons", "Pourboires"],
        visites: "Istanbul (vieille ville, Bosphore) + Égée (Marmaris, Bodrum)", dates: "Été 2026"
      }
    ],
    concurrents: {
      benchmarkTitre: "Benchmark prix Turquie (départ Maroc, vols inclus)",
      comptes: [
        { nom: "@vacancia.ma", abonnes: "139 K", type: "Outgoing — Turquie phare", note: "Istanbul/Antalya en volume. Reels Istanbul 63k-95k vues. Argument martelé : VOL DIRECT Marrakech (Turkish Airlines)" },
        { nom: "@msm_voyages", abonnes: "121 K", type: "Outgoing — concurrent direct", note: "Turquie + Omra+Istanbul combinés. Carrousels-forts, reels rares" },
        { nom: "@follow_me_travel_", abonnes: "111 K", type: "Outgoing — concurrent direct", note: "Turquie + combinés Asie. Reels actifs (max 17k vues)" },
        { nom: "@transatourmaroc", abonnes: "28 K", type: "Outgoing — ISO 9001", note: "Istanbul 8j dès 6 547 DH, croisière Bosphore OFFERTE (même hook que nous, prix d'appel plus bas)" },
        { nom: "▶ @voyages21maroc (NOUS)", abonnes: "petit compte · Meta Verified", type: "Notre compte — point de départ", note: "~25-150 vues/post. Turquie = notre 2e priorité : pousser des reels été dès maintenant" }
      ],
      benchmarkPrix: [
        { agence: "▶ Voyages21 (NOUS)", offre: "Séjour Istanbul 8j", inclus: ["Vols Turkish A/R","7 nuits B&B","Croisière Bosphore incluse","Transferts + taxes","Guide arabophone"], exclus: ["Excursions hors Bosphore","Extras & boissons","Pourboires"], compagnie: "Turkish Airlines", horaires: "non publiés", dates: "Été 2026 (juillet · août)", duree: "8j/7n", hotels: "3★/4★", prix: "9 700 DH", site: "https://voyages21.com", instagram: "https://www.instagram.com/voyages21maroc/", verifie: true, nous: true },
        { agence: "Transatour", offre: "Istanbul 8j (Bosphore offert)", inclus: ["Vols A/R","Hébergement","Transferts","Croisière Bosphore offerte"], exclus: ["nd"], compagnie: "nd", horaires: "nd", dates: "nd", duree: "8j/7n", hotels: "nd", prix: "6 547 DH", site: "https://www.transatour.ma", instagram: "https://www.instagram.com/transatourmaroc/", verifie: true },
        { agence: "Vacancia", offre: "Combo Istanbul + Antalya", inclus: ["Vol DIRECT Marrakech (Turkish)"], exclus: ["nd"], compagnie: "Turkish Airlines (direct Marrakech)", horaires: "nd", dates: "nd", duree: "—", hotels: "nd", prix: "13 900 DH", site: "https://vacancia.ma", instagram: "https://www.instagram.com/vacancia.ma/", verifie: true },
        { agence: "Vacancia", offre: "Antalya (séjour)", inclus: ["nd"], exclus: ["nd"], compagnie: "nd", horaires: "nd", dates: "nd", duree: "—", hotels: "nd", prix: "15 900 DH", site: "https://vacancia.ma", instagram: "https://www.instagram.com/vacancia.ma/", verifie: true },
        { agence: "Vacancia", offre: "Circuit Antalya + Marmaris + Fethiye", inclus: ["nd"], exclus: ["nd"], compagnie: "nd", horaires: "nd", dates: "nd", duree: "—", hotels: "nd", prix: "15 900 DH", site: "https://vacancia.ma", instagram: "https://www.instagram.com/vacancia.ma/", verifie: true }
      ],
      benchmarkAnalyse: [
        "OÙ JE SUIS : sur l'entrée de gamme Istanbul même durée (8j/7n), V21 (9 700 DH) est AU-DESSUS de Transatour (6 547 DH, vérifié) → écart +3 153 DH (+48 %).",
        "MON FORT (data) : je précise compagnie (Turkish), inclus (croisière Bosphore + guide + transferts) et exclus ; Transatour laisse hôtel/vol en « nd ».",
        "MON FAIBLE (data) : prix d'appel plus haut, et je ne publie pas mes horaires de vol (colonne vide). Transatour casse le prix avec le MÊME hook « Bosphore offert ».",
        "⚠️ Origine de l'écart NON déterminable sur la seule data : la catégorie d'hôtel et le type de vol de Transatour sont absents → à clarifier avant de conclure."
      ],
      benchmarkIntlTitre: "Benchmark international — agences France & Espagne (Turquie)",
      benchmarkIntl: [
        { agence: "▶ Voyages21 (NOUS)", offre: "Séjour Istanbul (départ Maroc)", inclus: ["Vols Turkish depuis Casa","Croisière Bosphore","Guide"], exclus: ["Excursions hors Bosphore"], compagnie: "Turkish Airlines", horaires: "nd", dates: "Été 2026", duree: "8j/7n", hotels: "3★/4★", prix: "9 700 DH (~900 €)", site: "https://voyages21.com", instagram: "https://www.instagram.com/voyages21maroc/", verifie: true, nous: true },
        { agence: "Fram 🇫🇷", offre: "Circuit Antalya → Cappadoce", inclus: ["Vols depuis France","Circuit guidé"], exclus: ["nd"], compagnie: "nd", horaires: "nd", dates: "2026", duree: "8j/7n", hotels: "4★", prix: "dès 699 € (~7 550 DH)", site: "https://www.fram.fr", instagram: "nd", verifie: true },
        { agence: "Logitravel 🇫🇷🇪🇸", offre: "Istanbul + Cappadoce + Pamukkale + Antalya", inclus: ["Vols Europe","Circuit + plage"], exclus: ["nd"], compagnie: "nd", horaires: "nd", dates: "2026", duree: "11j", hotels: "nd", prix: "dès 939 € (~10 140 DH)", site: "https://www.logitravel.fr", instagram: "nd", verifie: true },
        { agence: "Voyage Privé 🇫🇷", offre: "Istanbul + Cappadoce + Antalya 4★", inclus: ["Vols","Circuit 4★"], exclus: ["nd"], compagnie: "nd", horaires: "nd", dates: "2026", duree: "8j/7n", hotels: "4★", prix: "promo (jusqu'à -70 %)", site: "https://www.voyage-prive.com", instagram: "nd", verifie: true },
        { agence: "Leclerc Voyages 🇫🇷", offre: "D'Antalya à la Cappadoce", inclus: ["Vols","Circuit"], exclus: ["nd"], compagnie: "nd", horaires: "nd", dates: "2026", duree: "nd", hotels: "4★", prix: "dès 699 € (~7 550 DH)", site: "https://www.leclercvoyages.com", instagram: "nd", verifie: true },
        { agence: "Fram « Regard sur la Turquie » 🇫🇷", offre: "Grand circuit Turquie", inclus: ["Vols","Circuit complet"], exclus: ["nd"], compagnie: "nd", horaires: "nd", dates: "2026", duree: "9j/8n", hotels: "nd", prix: "dès 901 € (~9 730 DH)", site: "https://www.fram.fr", instagram: "nd", verifie: true }
      ],
      benchmarkIntlAnalyse: [
        "⚠️ Pas un apples-to-apples : les offres FR/ES sont des CIRCUITS (Istanbul + Cappadoce + Pamukkale + Antalya), pas un séjour Istanbul+Bosphore comme notre entrée de gamme.",
        "MON FORT : départ MAROC (pas de vol Europe à ajouter), Turkish Airlines, croisière Bosphore incluse, guide arabophone, ton darija/FR.",
        "CE QUI ME DISTINGUE / MON FAIBLE : les FR/ES incluent la CAPPADOCE (montgolfières) que je n'ai PAS dans cette offre → manque à combler si je veux monter en gamme. En € convertis, leurs circuits (699-939 €) paraissent compétitifs MAIS partent d'Europe et durent plus longtemps.",
        "Conclusion (data) : sur un MÊME format « séjour Istanbul », je n'ai pas de comparable FR/ES strict ; sur le CIRCUIT, l'Europe est plus complète → opportunité d'ajouter une option Cappadoce."
      ],
      apifyStatut: "✅ Scrape Apify 6 mois (déc. 2025→juin 2026). Engagement Turquie réel ci-dessous (posts TURQUIE uniquement, triés par vues). Prix concurrents MA : Transatour 6 547 (vérifié) ; Vacancia 13 900-15 900 (vérifié).",
      engagementReelNote: "À LIRE : vraies vues/likes de POSTS sur la TURQUIE (filtrés 6 mois), pas une moyenne de compte.",
      engagementReel: [
        { compte: "@istanbul (officiel)", format: "Reel Istanbul vue du ciel", vues: "1 059 353", likes: "236 823", comm: "—" },
        { compte: "@maroua_merzouqui (UGC 🇲🇦)", format: "Reel « mon escale de 25h à Istanbul »", vues: "525 890", likes: "5 015", comm: "—" },
        { compte: "@vacancia.ma (agence MA)", format: "Reel Istanbul « Réservation + n° »", vues: "99 167", likes: "595", comm: "—" },
        { compte: "@vacancia.ma (agence MA)", format: "Reel Antalya", vues: "93 012", likes: "863", comm: "—" },
        { compte: "@transatourmaroc (agence MA)", format: "Post Istanbul dès 6 547 DH (Bosphore offert)", vues: "3 279", likes: "104", comm: "18" },
        { compte: "▶ @voyages21maroc (NOUS)", format: "Meilleur reel récent (toutes dest.)", vues: "149", likes: "6", comm: "1" }
      ],
      learnings: [
        "Le format qui scale = Reel court « destination + numéro de résa » en audio tendance (Vacancia : 63k-95k vues) — prod simple, pas léchée",
        "Like-rate faible mais reach énorme : le volume vient des VUES, pas des likes",
        "Transatour casse les prix Istanbul (6 547 DH < notre 9 700) avec le MÊME hook « Bosphore offert » → on doit différencier (Turkish Airlines, croisière incluse, qualité hôtel nommée) plutôt que s'aligner",
        "Argument martelé par Vacancia : VOL DIRECT Marrakech (Turkish Airlines) — V21 peut en faire autant et le dire",
        "Turquie = marché le plus saturé : sortir de la guerre des prix par le sur-mesure premium et le contenu, pas par le -10 DH"
      ]
    },
    cadran: {
      forces: [
        "Vols Turkish Airlines (qualité + franchise bagages généreuse) sur la plupart des offres",
        "Combinés culture + balnéaire tout compris (Istanbul + Antalya/Bodrum/Marmaris)",
        "Croisière sur le Bosphore incluse (offerte sur le 11j Antalya)",
        "Large gamme de prix : 9 700 DH (séjour) → 23 500 DH (grand combiné)"
      ],
      faiblesses: [
        "Destination la PLUS saturée du marché outgoing marocain → guerre des prix",
        "Benchmark prix Turquie pas encore réalisé (à faire en priorité)",
        "Guide arabophone seulement (pas de guide francophone affiché)",
        "Horaires de vol non publiés sur les fiches"
      ],
      ameliorer: [
        "Lancer le benchmark prix Turquie (Apify/recherche) — marché ultra-concurrentiel",
        "Mettre en avant Turkish Airlines + croisière Bosphore incluse comme différenciateurs",
        "Packager une offre premium/sur-mesure pour sortir de la guerre des prix",
        "Clarifier la langue du guide et les horaires de vol"
      ]
    },
    contenu: {
      posts: [
        {
          visuel: "Istanbul — Mosquée Bleue & Bosphore au coucher du soleil",
          accroche: "Istanbul, la ville aux deux continents. 🕌 Entre l'appel à la prière et la lumière dorée du Bosphore.",
          legende: "Séjour à Istanbul — 8 jours, vols Turkish Airlines + croisière sur le Bosphore incluse. Dès 9 700 DH/pers. 📲 0661 24 70 49",
          hashtags: "#Voyages21 #Turquie #Istanbul #Bosphore",
          audio: "Cinématique ottoman doux (oud + cordes), montée sur les coupoles."
        },
        {
          visuel: "Antalya / Bodrum — piscine à débordement face à la Méditerranée",
          accroche: "Un peu de ville, beaucoup de mer. 🌊 5 nuits tout compris sur la Riviera turque.",
          legende: "Istanbul & Antalya — 8 jours, hôtel 5★ tout compris, vols inclus. Dès 16 300 DH/pers. 📲 0661 24 70 49",
          hashtags: "#Voyages21 #Turquie #Antalya #ToutCompris",
          audio: "Pop électronique arabisante solaire, drop sur le plan piscine."
        },
        {
          visuel: "Transition Istanbul (coupoles) → plage turquoise de Bodrum",
          accroche: "Istanbul le matin, la mer Égée l'après-midi. ✈️ Le meilleur des deux mondes.",
          legende: "Combinés Istanbul + plage dès 16 300 DH — vols Turkish Airlines inclus. Été 2026, places limitées. 📲 0661 24 70 49 · voyages21.com",
          hashtags: "#Voyages21 #Turquie #Istanbul #Bodrum",
          audio: "Transition au beat (whip), montage culture→mer."
        }
      ],
      noteVisuels: "⚠️ Visuels Higgsfield à générer depuis l'app desktop (gate web). Réutiliser le préfixe de marque V21.",
      planning: "Rythme 4 posts/sem (IG+FB+TikTok). Turquie = forte saisonnalité été → pousser dès maintenant."
    },
    influenceurs: [
      { origine: "🇲🇦 Maroc", nom: "Maroua Merzouqui", plateforme: "Instagram (UGC voyage)", audience: "reel Istanbul 525 890 vues", sujet: "Récits de voyage vécus (escale Istanbul, prix/valeur). Le meilleur UGC MA sur la Turquie.", lien: "https://www.instagram.com/maroua_merzouqui/" },
      { origine: "🇲🇦 Maroc", nom: "@vacancia.ma", plateforme: "Instagram (agence-créateur)", audience: "139 K · reels 90k-99k vues", sujet: "Promo Istanbul/Antalya en reels audio + numéro. Concurrent qui fait office d'influence.", lien: "https://www.instagram.com/vacancia.ma/" },
      { origine: "🇲🇦 Maroc", nom: "@msm_voyages / @follow_me_travel_", plateforme: "Instagram (agences)", audience: "121 K / 111 K", sujet: "Combinés Turquie + Omra+Istanbul, séjours. Volume.", lien: "https://www.instagram.com/msm_voyages/" },
      { origine: "🇲🇦 Maroc", nom: "Voyageurs MA (UGC à recruter)", plateforme: "IG/TikTok", audience: "micro", sujet: "Clients V21 Istanbul/Antalya = vivier UGC à activer au retour.", lien: "" },
      { origine: "🇹🇷 Turquie", nom: "Czn Burak", plateforme: "Instagram (créateur food/lifestyle)", audience: "reels 0,5-26 M vues", sujet: "Gastronomie/expérience Istanbul, démesure. Modèle mondial de storytelling local.", lien: "https://www.instagram.com/cznburak/" },
      { origine: "🇹🇷 Turquie", nom: "@istanbul (officiel ville)", plateforme: "Instagram", audience: "reels jusqu'à 1 M+ vues", sujet: "Beauté de la ville, plans drone, sons turcs. Banque d'inspiration n°1.", lien: "https://www.instagram.com/istanbul/" },
      { origine: "🇹🇷 Turquie", nom: "GoTürkiye (office tourisme)", plateforme: "Instagram", audience: "reels 500k+ vues", sujet: "Storytelling narratif (récits, couples), promotion nationale léchée.", lien: "https://www.instagram.com/goturkiye/" },
      { origine: "🌍 Intl", nom: "@maazsafder", plateforme: "Instagram (créateur)", audience: "reel 1,9 M vues", sujet: "Humour + rencontres à Istanbul. Preuve que l'humour/UGC scale le plus.", lien: "https://www.instagram.com/maazsafder/" }
    ],
    reseauxDestIntro: "Application du playbook au contexte Turquie (marché saturé, culture Istanbul + balnéaire Antalya/Bodrum, cible familles/couples MA).",
    reseauxDest: [
      { nom: "📸 Instagram", conseil: "Reels Istanbul (plan drone/Bosphore) + transition ville→plage Antalya, audio TENDANCE ou son turc. Carrousel « combiné 8 jours » pour les saves.", exemple: "Reproduire le plan aérien @istanbul (1M vues) + le format reel @vacancia (99k) ; tester un son turc émotionnel (Buray)." },
      { nom: "👍 Facebook", conseil: "Cible MRE/familles : offres combinées détaillées (Istanbul + Antalya), cross-post reels. Page pro pour ads Turquie.", exemple: "Post « Istanbul + Antalya 8j, Turkish Airlines, croisière Bosphore incluse, dès 16 300 DH »." },
      { nom: "🎵 TikTok", conseil: "Reel brut « POV 1er matin sur le Bosphore » + « 5 erreurs combiné Istanbul + plage ». Audio TikTok.", exemple: "Décliner le récit @maroua (escale Istanbul) en astuces ; cost-breakdown « 8j Turquie depuis Casa »." },
      { nom: "👻 Snapchat", conseil: "Snap Ads géolocalisées MA, offres flash été (« dernières places Antalya »), format vertical direct.", exemple: "Story flash « départ 10 août, 3 places Bodrum » → swipe WhatsApp." },
      { nom: "📌 Pinterest", conseil: "Épingles « Itinéraire Istanbul 8 jours », « Cappadoce montgolfière », keyword-first → trafic long terme.", exemple: "Recycler le carrousel combiné en épingles ; viser « Turquie depuis le Maroc »." },
      { nom: "🎬 YouTube/Vidéo", conseil: "Talking-head « Istanbul ou Antalya : que choisir ? » + B-roll. Short SEO « Visa Turquie pour Marocains ».", exemple: "Un Short « Faut-il un visa pour la Turquie ? » répond au frein n°1." }
    ],

    viral: {
      statut: "✅ Reels TURQUIE réels, triés par VUES (scrape 6 mois). Maroc séparé des étrangers. Sons réels indiqués.",
      ugcGardeFou: "Garde-fou : UGC = vrais voyageurs/créateurs sur la TURQUIE, triés par vues réelles (6 mois). Istanbul génère un contenu massif (jusqu'à 1,9 M de vues) → vivier idéal pour s'inspirer et reposter (avec accord).",
      viralReelsMa: [
        { origine: "🇲🇦 Maroc", titre: "Reel Istanbul « Réservation + n° » + audio", compte: "@vacancia.ma", lien: "https://www.instagram.com/p/DZFivwkN-x-/", stat: "99 167 vues · 595 ❤️", son: "Audio original (vacancia)", sonLien: "https://www.instagram.com/p/DZFivwkN-x-/", pourquoi: "Le reel MA Turquie le plus vu : audio + montage court + caption quasi vide = reach maximal. Le texte ne fait pas le reach.", message: "« Réserve, tu pars »", hook: "Plan iconique Istanbul sur le 1er temps de l'audio", plans: "5-7 plans serrés (Bosphore, mosquées), coupés au beat.", posture: "Audio tendance du jour + 1er plan fort. Caption minimale assumée." },
        { origine: "🇲🇦 Maroc", titre: "Reel Antalya (Riviera turque)", compte: "@vacancia.ma", lien: "https://www.instagram.com/p/DXTrWu4ALhZ/", stat: "93 012 vues · 863 ❤️", son: "Audio original (vacancia)", sonLien: "https://www.instagram.com/p/DXTrWu4ALhZ/", pourquoi: "Le balnéaire Antalya scale autant qu'Istanbul → la mer fait rêver la cible MA. À exploiter (V21 a Antalya/Bodrum).", message: "« La Riviera turque t'attend »", hook: "Eau turquoise / piscine à débordement", plans: "Plans plage/resort lumineux.", posture: "Mettre le balnéaire en avant, pas que la culture." },
        { origine: "🇲🇦 Maroc", titre: "Reel Antalya (2e)", compte: "@vacancia.ma", lien: "https://www.instagram.com/p/DXKB0q7Ap2C/", stat: "91 439 vues · 216 ❤️", son: "Audio original (vacancia)", sonLien: "https://www.instagram.com/p/DXKB0q7Ap2C/", pourquoi: "Confirme la régularité : poster souvent le même format = plusieurs reels à 90k+. La constance paie.", message: "« Antalya, tout compris »", hook: "Plan resort + emoji plage", plans: "B-roll resort/mer.", posture: "Cadence > perfection : publier régulièrement." },
        { origine: "🇲🇦 Maroc", titre: "Combiné « 2 décors » — Istanbul + Bali", compte: "@vacancia.ma", lien: "https://www.instagram.com/p/DYo9YhegdXn/", stat: "65 954 vues · 419 ❤️", son: "Audio original (vacancia)", sonLien: "https://www.instagram.com/p/DYo9YhegdXn/", pourquoi: "Les combinés multi-décors font rêver → V21 a Istanbul + Antalya/Bodrum à monter pareil.", message: "« 2 destinations, 1 voyage »", hook: "Whip-cut entre 2 décors dès la 1re seconde", plans: "Transitions ville→mer.", posture: "Monter Istanbul → Bodrum en transition." },
        { origine: "🇲🇦 Maroc", titre: "Concurrent — Istanbul dès 6 547 DH (Bosphore offert)", compte: "@transatourmaroc", lien: "https://www.instagram.com/p/DTSu2h2iNrk/", stat: "3 279 vues · 104 ❤️", son: "Audio original", sonLien: "https://www.instagram.com/p/DTSu2h2iNrk/", pourquoi: "Prix d'appel bas + même hook « Bosphore offert » → on ne s'aligne pas, on oppose Turkish + hôtels nommés.", message: "« Istanbul dès 6 547 DH »", hook: "Prix choc en slide 1", plans: "Carrousel/photos + prix.", posture: "Répondre par la valeur (compagnie, croisière incluse), pas le prix." }
      ],
      viralReelsIntl: [
        { origine: "🇹🇷 Turquie", titre: "★ Officiel — Istanbul vue du ciel", compte: "@istanbul", lien: "https://www.instagram.com/p/C0EYt6eNXYw/", stat: "1 059 353 vues · 236 823 ❤️", son: "Audio original", sonLien: "https://www.instagram.com/p/C0EYt6eNXYw/", pourquoi: "Like-rate colossal : le plan aérien « beautiful even from above » + question en caption = engagement énorme. La beauté brute suffit.", message: "« Istanbul est belle, même vue d'en haut »", hook: "Plan drone spectaculaire", plans: "Aérien + skyline + Bosphore.", posture: "Investir 1-2 plans drone signature d'Istanbul." },
        { origine: "🇹🇷 Turquie", titre: "Officiel — « Istanbul is inspiring »", compte: "@istanbul", lien: "https://www.instagram.com/p/Cq2gA3qAN_c/", stat: "937 194 vues · 142 371 ❤️", son: "« Seni Sevmiyorum Artık » — Buray", sonLien: "https://www.instagram.com/p/Cq2gA3qAN_c/", pourquoi: "Son turc émotionnel + storytelling « code esthétique de la ville » → identité forte. Le son local ancre la destination.", message: "« Istanbul a son propre code esthétique »", hook: "Texte poétique sur la ville", plans: "Ruelles, lumière, détails.", posture: "Utiliser un son turc tendance pour l'authenticité." },
        { origine: "🇹🇷 Turquie", titre: "Czn Burak — expérience Istanbul", compte: "@cznburak", lien: "https://www.instagram.com/p/DYurTpwoHKU/", stat: "581 815 vues · 24 825 ❤️", son: "Audio original (cznburak)", sonLien: "https://www.instagram.com/p/DYurTpwoHKU/", pourquoi: "Le créateur Istanbul n°1 (gastronomie/démesure). « Expérience + lieu iconique » = la recette. Filmer une VRAIE expérience, pas une promo.", message: "Expérience spectaculaire à Istanbul", hook: "Mise en scène généreuse/food", plans: "Plans food + lieu emblématique.", posture: "Filmer une expérience client réelle à Istanbul." },
        { origine: "🇹🇷 Turquie", titre: "Officiel GoTürkiye — « An Istanbul Story »", compte: "@goturkiye", lien: "https://www.instagram.com/p/DXoOHvwDWXK/", stat: "524 730 vues · 19 320 ❤️", son: "Audio original (goturkiye)", sonLien: "https://www.instagram.com/p/DXoOHvwDWXK/", pourquoi: "Mini-récit romantique (Duru & Selim) → le STORYTELLING narratif fonctionne mieux que la fiche produit.", message: "« Une histoire d'amour à Istanbul »", hook: "Personnages + intrigue", plans: "Récit en plans cinématiques.", posture: "Raconter une histoire (couple/famille) plutôt que lister." }
      ],
      viralUgc: [
        { origine: "🌍 Intl", titre: "★ UGC viral — prank Czn Burak (Istanbul)", compte: "@maazsafder", lien: "https://www.instagram.com/p/DYhqyAPoFrT/", stat: "1 927 576 vues · 138 216 ❤️", son: "Audio original", sonLien: "https://www.instagram.com/p/DYhqyAPoFrT/", pourquoi: "Le créateur étranger qui rencontre une célébrité locale (Czn Burak) = 1,9 M de vues. L'HUMOUR + la rencontre = viralité maximale.", message: "Humour / rencontre célébrité", hook: "Situation comique avec une star", plans: "Caméra spontanée, punchline.", posture: "Collaborer avec un créateur sur place pour un moment authentique/drôle." },
        { origine: "🇲🇦 Maroc", titre: "UGC « mon escale de 25h à Istanbul »", compte: "@maroua_merzouqui", lien: "https://www.instagram.com/p/DW1zCvvDphv/", stat: "525 890 vues · 5 015 ❤️", son: "Audio original (maroua)", sonLien: "https://www.instagram.com/p/DW1zCvvDphv/", pourquoi: "UGC MA n°1 sur la Turquie : une histoire vécue (« je pensais 1h, c'était 25 ») → narration + utile = 525k vues. Le récit personnel scale.", message: "« Que faire d'une longue escale à Istanbul »", hook: "« Je pensais avoir 1h d'escale. C'était 25. »", plans: "Vlog perso, lieux d'Istanbul.", posture: "Activer une voyageuse MA réelle qui RACONTE (pas une promo)." },
        { origine: "🌍 Intl", titre: "UGC émotionnel — « Dear Istanbul »", compte: "@pey.pey.33", lien: "https://www.instagram.com/p/DY-jlbtp_gg/", stat: "483 395 vues · 69 376 ❤️", son: "Audio original (3li.zara)", sonLien: "https://www.instagram.com/p/DY-jlbtp_gg/", pourquoi: "Lettre d'amour à la ville (« ce n'est pas ton skyline qui... ») : l'émotion pure + like-rate très élevé. Le sentiment vend la destination.", message: "« Istanbul, ce n'est pas que ton skyline »", hook: "« Dear Istanbul… »", plans: "Plans esthétiques + texte intime.", posture: "Écrire une déclaration sincère à la ville, pas un argumentaire." }
      ],
      pistes: [
        "POV première personne — « POV : ton 1er matin sur le Bosphore »",
        "Transition tenue/lieu — Istanbul historique → plage Bodrum/Antalya (format viral combiné)",
        "Cost breakdown — « 8 jours Turquie tout compris depuis Casa, le vrai budget »",
        "« 5 erreurs à éviter pour un combiné Istanbul + plage »",
        "Hidden gems — Îles des Princesses, quartiers de Balat, Cappadoce en extension"
      ],
      audioNote: "🔥 Sons qui cartonnent réellement sur la Turquie (relevés sur les reels les plus vus). Le lien ouvre le reel où le son joue. Le son LOCAL turc ancre l'authenticité.",
      audio: [
        { style: "🔥 « Seni Sevmiyorum Artık » — Buray (son turc émotionnel)", usage: "Istanbul storytelling — utilisé par le compte officiel @istanbul (937k vues). Authenticité locale.", lien: "https://www.instagram.com/p/Cq2gA3qAN_c/" },
        { style: "🔥 Audios en TENDANCE du jour (IG/TikTok)", usage: "Le levier n°1 du reach (cf. vacancia 99k, istanbul 1M). Onglet « audios en hausse ».", lien: "https://www.instagram.com/reels/audio/" },
        { style: "Cinématique ottoman / Middle Eastern (libre — ADS)", usage: "Pour les pubs payantes (son tendance interdit en ads).", lien: "https://uppbeat.io/browse/collection/middle-eastern-groove" },
        { style: "Deep-house solaire (libre — ADS)", usage: "Antalya/Bodrum, plage, en publicité.", lien: "https://pixabay.com/music/search/summer%20background%20music/" }
      ],
      postsClesEnMain: [
        {
          titre: "Reel transition « Istanbul le matin, la mer l'après-midi » (15-30s)",
          format: "Reel transition · au beat",
          lienCible: "https://www.instagram.com/p/DYo9YhegdXn/",
          langues: "FR + darija (texte court)",
          script: "Temps 1 : coupoles/Bosphore au lever (claquement). Temps 2 : whip → plage turquoise Bodrum/Antalya. Texte « Istanbul + la mer Égée, un seul voyage ✈️ ». Carton prix « dès 16 300 DH · vols Turkish Airlines inclus ».",
          visuel: "Match-cut culture→mer, audio tendance, 9:16, 15-25s.",
          casting: "Aucun (B-roll).",
          tournage: "3-6 plans, CapCut. Le combiné = l'angle différenciant vs séjour simple.",
          cta: "« Places limitées été 2026 · lien en bio »",
          kpis: "Vues > 15 000 · partages > 80 · complétion > 80 %"
        },
        {
          titre: "★ Reel UGC voyageur Turquie (avec acteur) (60-90s)",
          format: "UGC authentique · talking-head + B-roll",
          lienCible: "https://www.instagram.com/p/DZFivwkN-x-/",
          langues: "Darija dominante + sous-titres FR",
          script: "Vrai voyageur (ou créateur partenaire identifié) : « Sift 8 ayam f Turkiya m3a Voyages21… » → 3 moments (croisière Bosphore offerte, hôtel 5★ Antalya nommé, vol direct Turkish Airlines) → « kulchi kan organisé ». B-roll de son séjour.",
          visuel: "Brut/vertical, lumière naturelle, crédibilité « story ».",
          casting: "BRIEF : client réel V21 Turquie OU micro-créateur MA 5-50k, défrayé, mention « partenariat ». ⚠️ Jamais de faux témoignage ni d'influenceur IA.",
          tournage: "Smartphone du voyageur + 3 B-roll. Droits à l'image signés. Karim valide.",
          cta: "« Ton tour ? DM “TURQUIE” · 0661 24 70 49 »",
          kpis: "Vues > 20 000 · DM/commentaires confiance · 1 UGC/mois. Réf. : @maroua→Vacancia 41k vues / 1 291 ❤️"
        }
      ]
    }
  },

  omra: {
    // 1) NOS OFFRES (fiches réelles du site voyages21.com, juil.–août 2026)
    offres: [
      {
        titre: "« 2 Omras en 1 » — Etihad (Abu Dhabi)", badge: "Prix d'appel", duree: "19 nuits", prix: "dès 12 900 DH/pers",
        prixDetail: "Quadruple 12 900 · Triple 14 500 · Double 15 500 (Rawabi Hijaz + Diyar Al Iman)",
        hotels: "Mecque : Rawabi Hijaz / Palestine / Diyafat Al Raja — Médine : Diyar Al Iman",
        pension: "9 nuits Mecque + 4 nuits Médine + 6 nuits Mecque (selon formule, sans repas → petit-déj)",
        vols: "Etihad Airways via Abou Dhabi → Jeddah", volsHoraires: "Aller 27/07/2026 · retour 15/08 (arrivée Casa 16/08)",
        inclus: ["Vols A/R Etihad via Abu Dhabi", "Hôtels mentionnés ou équivalents", "Transferts en Arabie Saoudite", "Encadrement & assistance des cadres de l'agence"],
        exclus: ["Dépenses personnelles", "Services non mentionnés", "Hausse soudaine du prix des vols"],
        visites: "Mecque (Haram, Tawaf, Saï) + Médine (Mosquée du Prophète, Rawda, mazarat)",
        dates: "27/07 → 15/08/2026 (départ unique)"
      },
      {
        titre: "Omra 01 Juillet — Économique", badge: "Éco · vol direct", duree: "12 nuits", prix: "dès 15 900 DH/pers",
        prixDetail: "Quadruple 15 900 · Triple 16 700 · Double 17 900 (Palestine, sans repas)",
        hotels: "Mecque : Palestine / Diyafat Al Raja — Médine : Al Mokhtara / Diyar Al Iman",
        pension: "4 nuits Médine + 8 nuits Mecque", vols: "Royal Air Maroc — DIRECT vers Médine",
        volsHoraires: "Départs 01 / 05 / 08 juillet 2026", inclus: ["Vols RAM A/R direct Médine", "Hôtels mentionnés + transferts", "Visite des mazarat de Médine", "Encadrement & assistance agence"],
        exclus: ["Dépenses personnelles", "Hausse soudaine du prix des vols"],
        visites: "Médine (Mosquée du Prophète, Rawda) + Mecque (Haram, Tawaf, Saï)",
        dates: "01 / 05 / 08 juillet 2026"
      },
      {
        titre: "Omra 08 Juillet", badge: "Vol direct Médine", duree: "10 nuits", prix: "dès 16 850 DH/pers",
        prixDetail: "Quadruple 16 850 · Triple 17 300 · Double 18 200 (Emaar Diwan)",
        hotels: "Mecque : Emaar (Diwan/Khalil/Manar/Bayt/Grand/Royal/Shuhada) — Médine : Emaar Taïba",
        pension: "4 nuits Médine + 6 nuits Mecque", vols: "Royal Air Maroc — DIRECT vers Médine",
        volsHoraires: "08 → 18 juillet 2026 · mouattir technique expérimenté", inclus: ["Vols RAM A/R direct Médine", "Bus moderne climatisé", "Mouattir technique expérimenté Omra/Hajj", "Mazarat Médine & Mecque"],
        exclus: ["Dépenses personnelles"], visites: "Médine + Mecque (mazarat inclus)",
        dates: "08 → 18 juillet 2026"
      },
      {
        titre: "Omra Mouharram 1448", badge: "14 nuits · vol direct", duree: "14 nuits", prix: "dès 17 200 DH/pers",
        prixDetail: "Quadruple 17 200 · Triple 17 800 · Double 18 900 → jusqu'à 25 800 (Emaar Royal/Shuhada)",
        hotels: "Médine : Emaar Taïba — Mecque : Emaar (Diwan→Royal/Shuhada selon formule)",
        pension: "4 nuits Médine + 10 nuits Mecque", vols: "Royal Air Maroc — DIRECT vers Médine",
        volsHoraires: "Départs 29 juillet ou 05 août 2026", inclus: ["Vols RAM A/R direct Médine", "Bus moderne climatisé + mouattir technique", "Mazarat Médine & Mecque", "Réservation Rawda via l'appli Nusuk (individuelle)"],
        exclus: ["Dépenses personnelles"], visites: "Médine (Rawda) + Mecque, 10 nuits près du Haram",
        dates: "29/07 → 12/08 ou 05/08 → 19/08/2026"
      },
      {
        titre: "Omra + Istanbul — Turkish Airlines", badge: "Combiné spirituel+culturel", duree: "14 nuits", prix: "dès 20 000 DH/pers",
        prixDetail: "Quadruple 20 000 · Double 21 500 → jusqu'à 25 500 (Emaar Royal/Shuhada)",
        hotels: "Istanbul : Ramada Sultanahmet — Mecque : Emaar (Khalil→Royal) — Médine : Emaar Taïba",
        pension: "4 nuits Istanbul + 6 nuits Mecque + 4 nuits Médine", vols: "Turkish Airlines (arrivée via Jeddah)",
        volsHoraires: "05 → 19 juillet 2026", inclus: ["Vols A/R Turkish Airlines", "4 nuits Istanbul (le pont entre deux continents)", "Bus moderne climatisé + mouattir technique", "Mazarat Médine & Mecque"],
        exclus: ["Dépenses personnelles"], visites: "Istanbul (coupoles, mosquées ottomanes) + Mecque + Médine",
        dates: "05 → 19 juillet 2026"
      },
      {
        titre: "Omra 06 Juillet — Premium 5★ proche Haram", badge: "Premium", duree: "12 nuits", prix: "dès 21 500 DH/pers",
        prixDetail: "Quadruple 21 500 · Triple 22 500 · Double 24 500 → jusqu'à 30 500 (Fairmont)",
        hotels: "Médine : Shaza Regency — Mecque : Ajyad Makkah Makarem / Swiss / Al Haram / Fairmont (5★ près du Haram)",
        pension: "4 nuits Médine + 8 nuits Mecque (avec petit-déj)", vols: "Royal Air Maroc — DIRECT vers Médine",
        volsHoraires: "Départs 06 / 10 / 18 / 25 juillet 2026", inclus: ["Vols RAM A/R direct Médine", "Hôtels 5★ proches du Haram (chambres triple/quadruple avec lits d'appoint)", "Transferts en Arabie Saoudite", "Encadrement agence"],
        exclus: ["Dépenses personnelles"], visites: "Médine (Mosquée du Prophète) + Mecque (Haram à quelques pas)",
        dates: "06 / 10 / 18 / 25 juillet 2026"
      }
    ],

    // 2) VEILLE CONCURRENTS Omra — engagement réel (scrape Apify 14/06/2026)
    concurrents: {
      benchmarkTitre: "Benchmark prix Omra été 2026 (départ Maroc, vols inclus)",
      comptes: [
        { nom: "@voyage.or", abonnes: "52 K", type: "Omra/Hajj exclusif — concurrent direct", note: "Le PLUS viral du créneau : concours « Omra hadiya » (gagne une Omra) = 22k vues / 4 283 ❤️ / 2 244 comm. Ton communautaire arabophone" },
        { nom: "@qafilat.tayba", abonnes: "9,5 K", type: "Spécialiste Omra/Hajj (Marrakech)", note: "Contenu spirituel/témoignages (shahadat), audience fidèle. Médiane ~1k vues, sobre" },
        { nom: "@sabilevoyages", abonnes: "—", type: "Omra 100% en ligne", note: "Angle commodité « réserver son Omra en ligne, simple et rapide ». Engagement modeste (~550 vues méd.)" },
        { nom: "@transatourmaroc", abonnes: "28 K", type: "Outgoing + Omra (ISO 9001)", note: "Omra été dès 10 990 DH (vérifié) + concours « gagne une Omra » = 1 769 commentaires" },
        { nom: "@msm_voyages", abonnes: "121 K", type: "Outgoing + Omra+Istanbul", note: "Combinés Omra+Istanbul, gros compte mais carrousels (peu de reels)" },
        { nom: "▶ @voyages21maroc (NOUS)", abonnes: "petit · Meta Verified", type: "Notre compte — point de départ", note: "~50-150 vues. Aucun concours lancé pour l'instant → levier viral inexploité sur ce créneau" }
      ],
      benchmarkPrix: [
        { agence: "Transatour", offre: "Omra été (formule éco)", duree: "—", hotels: "nd", prix: "10 990 DH", verifie: true },
        { agence: "Kabdani", offre: "Omra été 2026", duree: "—", hotels: "nd", prix: "15 900 DH", verifie: true },
        { agence: "▶ Voyages21 (NOUS)", offre: "« 2 Omras en 1 » Etihad (Abu Dhabi)", duree: "19 nuits", hotels: "3★ proches", prix: "12 900 DH", verifie: true },
        { agence: "▶ Voyages21 (NOUS)", offre: "Omra éco — vol DIRECT Médine (RAM)", duree: "12 nuits", hotels: "Palestine/Diyafat", prix: "15 900 DH", verifie: true },
        { agence: "▶ Voyages21 (NOUS)", offre: "Omra premium 5★ proche Haram", duree: "12 nuits", hotels: "Ajyad Makarem/Fairmont", prix: "21 500 DH", verifie: true },
        { agence: "voyage.or / qafilat.tayba / sabile", offre: "Omra (prix non affiché dans les posts)", duree: "—", hotels: "—", prix: "à demander", verifie: false }
      ],
      benchmarkAnalyse: [
        "Position : le prix d'appel V21 « 2 omras en 1 » (12 900 DH, Etihad, 19 nuits) se situe ENTRE Transatour (10 990) et Kabdani (15 900).",
        "Sur l'éco vol DIRECT (RAM, 12 nuits), V21 (15 900 DH) = même prix affiché que Kabdani (15 900).",
        "Vs le moins cher scrapé (Transatour 10 990) : écart +1 910 DH. ⚠️ Limite data : le post Transatour ne précise NI durée NI hôtels NI compagnie → l'écart n'est pas explicable par la seule data (on ignore ce que couvre le 10 990).",
        "Conclusion (data seule) : V21 n'est pas le moins cher affiché, mais c'est le seul à préciser durée + vol direct Médine. Les spécialistes (voyage.or/qafilat/sabile) n'affichent aucun prix en post → comparaison impossible sur ces 3."
      ],
      engagementReelNote: "À LIRE : vraies vues/likes de POSTS sur l'OMRA (filtrés 6 mois), triés par vues. Pas une moyenne de compte.",
      engagementReel: [
        { compte: "@transatourmaroc (agence MA)", format: "Reel spirituel Omra (n°1 MA)", vues: "268 392", likes: "7 505", comm: "—" },
        { compte: "@voyage.or (agence MA)", format: "Reel spirituel Omra", vues: "23 196", likes: "1 014", comm: "—" },
        { compte: "@voyage.or (agence MA)", format: "Concours « gagne une Omra »", vues: "22 194", likes: "4 307", comm: "2 244" },
        { compte: "@pelerinhajj (FR)", format: "Récit émotionnel pèlerinage", vues: "8 769", likes: "3 673", comm: "—" },
        { compte: "@sabilevoyages (agence MA)", format: "« Réserver son Omra en ligne »", vues: "6 474", likes: "378", comm: "—" },
        { compte: "▶ @voyages21maroc (NOUS)", format: "Meilleur reel récent (toutes dest.)", vues: "149", likes: "6", comm: "1" }
      ],
      learnings: [
        "🏆 Le CONCOURS « gagne une Omra » est l'arme virale n°1 du créneau (voyage.or : 22k vues / 4 283 ❤️ / 2 244 commentaires ; Transatour : 1 769 comm). À lancer pour amorcer notre communauté.",
        "Le contenu spirituel/émotionnel (témoignages, Rawda, Haram de nuit) crée du lien et des saves — mais doit rester SOBRE et respectueux (jamais de mise en scène ni de faux témoignage).",
        "Langue du créneau = darija + arabe (≠ français des offres Égypte/Turquie premium).",
        "Sabile capitalise sur « réserver en ligne » : V21 a déjà WhatsApp Business → mettre en avant la réservation simple.",
        "Différenciateur RÉEL V21 à marteler : VOL DIRECT RAM vers Médine (on commence par la ville du Prophète, sans escale) — peu de concurrents l'ont."
      ],
      apifyStatut: "✅ Scrape Apify autonome (14/06/2026, run PvZPK9iCG1iujK1U3 : voyage.or, qafilat.tayba, sabilevoyages — 36 posts) + Transatour/MSM des runs précédents. Prix concurrents affichés publiquement : Transatour 10 990 DH + Kabdani 15 900 DH (vérifiés en post) ; VoyageOr/Qafilat/Sabile ne publient pas de prix en post (à demander/scraper sur fiche)."
    },

    // 3) CADRAN
    cadran: {
      forces: [
        "VOL DIRECT Royal Air Maroc vers Médine (commence par la ville du Prophète, sans escale) — confort fort et rare",
        "Gamme complète : de 12 900 DH (« 2 omras en 1 » Etihad) au premium 5★ collé au Haram (Fairmont, Ajyad Makkah Makarem)",
        "Encadrement technique expérimenté Omra/Hajj + réservation Rawda via l'appli Nusuk",
        "Marque 25 ans, assistance, réservation simple (WhatsApp Business)"
      ],
      faiblesses: [
        "Créneau Omra très concurrentiel et fidélisé (VoyageOr, Qafilat… communautés ancrées)",
        "Aucune mécanique de concours viral pour l'instant → reach organique faible",
        "Prix d'appel concurrent plus bas affiché (Transatour 10 990) que notre éco RAM direct 15 900 (mais notre Etihad 12 900 s'en rapproche)",
        "Compte @voyages21maroc embryonnaire sur ce public arabophone"
      ],
      ameliorer: [
        "Lancer un CONCOURS « Rib7 Omra » (gagne une Omra) pour amorcer la communauté — le format prouvé du créneau",
        "Mettre en avant le VOL DIRECT Médine comme différenciateur n°1 dans chaque post",
        "Produire des reels darija sobres : Rawda, Haram de nuit, départ groupe, témoignage réel volontaire",
        "Afficher clairement le prix d'appel 12 900 DH (Etihad) pour rivaliser sur l'entrée de gamme"
      ]
    },

    // 4) CONTENU
    contenu: {
      posts: [
        {
          visuel: "Le Haram de La Mecque de nuit, la Kaaba au centre, foule en prière (vraie image)",
          accroche: "بيت الله الحرام ينتظرك هاد الصيف 🕋 — العمرة مع Voyages 21، طيران مباشر للمدينة المنورة.",
          legende: "عمرة صيف 2026 · طيران مباشر RAM للمدينة · صيغ من 12 900 درهم. 📲 0661 24 70 49 — Voyages 21, منذ 2000.",
          hashtags: "#عمرة #Omra #Voyages21 #المدينة_المنورة #مكة",
          audio: "Nasheed vocal sobre (sans instruments) — respect de l'audience. PAS de musique instrumentale sur le contenu Omra."
        },
        {
          visuel: "Mosquée du Prophète à Médine, dôme vert au coucher du soleil (vraie image)",
          accroche: "نبداو من المدينة المنورة 🌙 — طيران مباشر، بلا تبديل، نيشان لمدينة الرسول ﷺ.",
          legende: "العمرة مع طيران مباشر RAM للمدينة المنورة. 04 ليالٍ بالمدينة + الإقامة بمكة. من 15 900 درهم. 📲 0661 24 70 49",
          hashtags: "#عمرة #المدينة_المنورة #طيران_مباشر #Voyages21",
          audio: "Ambiance spirituelle sobre / nasheed vocal. Lecture posée, pas de drop musical."
        },
        {
          visuel: "Groupe de pèlerins au départ aéroport Casablanca, sourire, ihram (avec accord des personnes)",
          accroche: "رِبْح عمرة مع Voyages 21 🎁 — شارك، اعلّق « آمين » وكون أنت الرابح هاد العام.",
          legende: "مسابقة العمرة : تابعنا + شارك المنشور + علّق. الفايز كيربح عمرة كاملة 🕋 (الشروط فالبيو). 📲 0661 24 70 49",
          hashtags: "#ربح_عمرة #مسابقة #عمرة #Voyages21",
          audio: "Nasheed sobre. (Mécanique concours = levier de portée n°1 du créneau, cf. VoyageOr.)"
        }
      ],
      noteVisuels: "⚠️ Omra = vraies images uniquement (Haram, Mosquée du Prophète, groupes réels avec accord). PAS de visuel IA des Lieux Saints, PAS de musique instrumentale. Sobriété et respect avant tout.",
      planning: "Rythme adapté au public Omra (darija/arabe). Pousser un CONCOURS de lancement, puis reels spirituels sobres + offres prix d'appel."
    },

    // 5) INSPIRATION VIRALE
    influenceurs: [
      { origine: "🇲🇦 Maroc", nom: "@transatourmaroc", plateforme: "Instagram (agence ISO 9001)", audience: "28 K · reel Omra 268k vues", sujet: "Omra été (dès 10 990 DH), concours « gagne une Omra », reels spirituels sobres. Le plus viral du créneau MA.", lien: "https://www.instagram.com/transatourmaroc/" },
      { origine: "🇲🇦 Maroc", nom: "@voyage.or", plateforme: "Instagram (Omra/Hajj exclusif)", audience: "52 K · concours 22k vues / 4,3k ❤️", sujet: "Concours Omra, contenu communautaire régulier. Modèle d'engagement.", lien: "https://www.instagram.com/voyage.or/" },
      { origine: "🇲🇦 Maroc", nom: "@qafilat.tayba", plateforme: "Instagram (Marrakech)", audience: "9,5 K", sujet: "Témoignages spirituels sobres (rihla, Rawda), audience fidèle arabophone.", lien: "https://www.instagram.com/qafilat.tayba/" },
      { origine: "🇲🇦 Maroc", nom: "@sabilevoyages", plateforme: "Instagram (Omra en ligne)", audience: "—", sujet: "Angle « réserver son Omra en ligne, simple et rapide ».", lien: "https://www.instagram.com/sabilevoyages/" },
      { origine: "🇫🇷 France", nom: "@pelerinhajj", plateforme: "Instagram (agence Omra/Hajj)", audience: "reels 8-9k vues, fort like-rate", sujet: "Récits émotionnels + conseils pratiques. Le modèle de ton sincère qui fédère.", lien: "https://www.instagram.com/pelerinhajj/" },
      { origine: "🇫🇷 France", nom: "@omradusavoir", plateforme: "Instagram (institut)", audience: "❤️ jusqu'à 2,8k", sujet: "« Par des diplômés de Médine » : pédagogie religieuse sobre. Référence de crédibilité.", lien: "https://www.instagram.com/omradusavoir/" },
      { origine: "🇫🇷 France", nom: "@saudinewsfrench", plateforme: "Instagram (média FR Arabie)", audience: "reels 3k+ vues", sujet: "Actualité/émotion des Lieux Saints. Idées de sujets « autour » de l'Omra.", lien: "https://www.instagram.com/saudinewsfrench/" },
      { origine: "🇫🇷 France", nom: "@les_e.i.l", plateforme: "Instagram (association)", audience: "micro", sujet: "Départs de groupe encadrés — l'esprit du voyage communautaire (= V21).", lien: "https://www.instagram.com/les_e.i.l/" }
    ],
    reseauxDestIntro: "Application du playbook au contexte Omra : sobriété, langue darija/arabe, audience croyante. Pas de musique instrumentale (nasheed/voix), vraies images des Lieux Saints, jamais d'IA.",
    reseauxDest: [
      { nom: "📸 Instagram", conseil: "Reels sobres (Haram, Médine, Rawda) + nasheed/voix. Le CONCOURS « Rib7 Omra » pour amorcer la communauté. Carrousel « formules Omra expliquées ».", exemple: "Reproduire le format @transatour (reel spirituel 268k) + le concours @voyage.or (22k vues, 2 244 comm)." },
      { nom: "👍 Facebook", conseil: "Audience 40+/familles : programmes Omra détaillés (vol direct Médine, hôtels, prix en DH), groupes communautaires. Page pro pour ads.", exemple: "Post « Omra été : vol DIRECT RAM Médine, dès 12 900 DH » + formules (lecture des prix arabes de gauche à droite)." },
      { nom: "🎵 TikTok", conseil: "Reels darija sobres : « pourquoi commencer par Médine », « différence vol direct vs escale ». Nasheed tendance du créneau.", exemple: "Explainer « vol direct Médine, sans escale » en darija." },
      { nom: "👻 Snapchat", conseil: "Snap Ads géolocalisées MA pour annoncer les départs / dernières places. Ton sobre.", exemple: "Story « départ Mouharram 29/07, places limitées » → WhatsApp." },
      { nom: "📌 Pinterest", conseil: "Épingles « guide Omra », « checklist pèlerin », « dou'a » → SEO durable + valeur pratique (saves).", exemple: "Recycler une checklist préparation Omra en épingles." },
      { nom: "🎬 YouTube/Vidéo", conseil: "Talking-head sobre : « Omra : tout ce qu'il faut savoir », témoignages de vrais pèlerins volontaires. Short « vol direct Médine ».", exemple: "Un Short « Faut-il un visa pour l'Omra ? » répond à une vraie question." }
    ],

    viral: {
      statut: "✅ Reels OMRA réels, triés par VUES (scrape 6 mois). Maroc séparé des comptes étrangers. Sobriété : sons nasheed/voix, pas d'instrumental.",
      ugcGardeFou: "Garde-fou OMRA : sobriété absolue. UGC = vrais pèlerins volontaires (récits sobres), jamais de mise en scène ni d'IA des Lieux Saints. ⚠️ L'UGC pèlerin viral est rare/sensible (souvent privé) → engagement modeste ici ; le levier de PORTÉE du créneau reste le CONCOURS et le témoignage sobre.",
      viralReelsMa: [
        { origine: "🇲🇦 Maroc", titre: "★ Reel Omra n°1 du marché MA", compte: "@transatourmaroc", lien: "https://www.instagram.com/p/DV9oZa7jkdn/", stat: "268 392 vues · 7 505 ❤️", son: "Audio original (nasheed/voix)", sonLien: "https://www.instagram.com/p/DV9oZa7jkdn/", pourquoi: "De très loin le reel Omra MA le plus vu (268k). Émotion + sobriété + nasheed = portée massive sans surenchère.", message: "L'appel spirituel de l'Omra", hook: "Plan fort du Haram + nasheed dès la 1re seconde", plans: "Haram/Kaaba, foule en prière, lumière. Aucun gimmick.", posture: "Sobriété : laisser l'image et le nasheed parler. Jamais de musique instrumentale." },
        { origine: "🇲🇦 Maroc", titre: "Reel spirituel VoyageOr", compte: "@voyage.or", lien: "https://www.instagram.com/p/DYmjHc4IxHm/", stat: "23 196 vues · 1 014 ❤️", son: "Audio original (nasheed)", sonLien: "https://www.instagram.com/p/DYmjHc4IxHm/", pourquoi: "Contenu communautaire régulier → fidélise une audience croyante. La constance bâtit la confiance.", message: "Vivre l'Omra avec sérénité", hook: "Image du Haram / Rawda", plans: "Lieux Saints, moments de recueillement.", posture: "Ton respectueux, récurrence." },
        { origine: "🇲🇦 Maroc", titre: "★ Concours « gagne une Omra » (le format roi)", compte: "@voyage.or", lien: "https://www.instagram.com/p/DYKcyl7oogK/", stat: "22 194 vues · 4 307 ❤️ · 2 244 comm", son: "Audio original", sonLien: "https://www.instagram.com/p/DYKcyl7oogK/", pourquoi: "Le concours fait exploser commentaires (2 244) → reach démultiplié. LE levier pour lancer un compte sur ce créneau.", message: "« Suis + partage + commente آمين, tu peux gagner »", hook: "« GAGNE UNE OMRA 🕋 »", plans: "Visuel récompense + règles claires.", posture: "Règlement transparent, tirage en live." },
        { origine: "🇲🇦 Maroc", titre: "Omra été dès 10 990 DH (offre)", compte: "@transatourmaroc", lien: "https://www.instagram.com/p/DYpgpEnoBuq/", stat: "7 334 vues · 99 ❤️", son: "Audio original", sonLien: "https://www.instagram.com/p/DYpgpEnoBuq/", pourquoi: "Le post-offre prix (10 990 DH) : utile pour le closing, mais reach < contenu émotionnel. Faire les deux.", message: "« Omra été dès 10 990 DH »", hook: "Prix en arabe (lu de gauche à droite : 10 990)", plans: "Carton offre + hôtels.", posture: "Offre = closing ; le reel émotionnel = reach." },
        { origine: "🇲🇦 Maroc", titre: "Reel Omra en ligne (Sabile)", compte: "@sabilevoyages", lien: "https://www.instagram.com/p/DVs1oukjPh9/", stat: "6 474 vues · 378 ❤️", son: "Audio original", sonLien: "https://www.instagram.com/p/DVs1oukjPh9/", pourquoi: "Angle « réserver son Omra en ligne, simple ». V21 a WhatsApp Business → capitaliser sur la réservation facile.", message: "« Réserve ton Omra en ligne »", hook: "Promesse de simplicité", plans: "Écran/app + Lieux Saints.", posture: "Mettre en avant la facilité de réservation." }
      ],
      viralReelsIntl: [
        { origine: "🇫🇷 France", titre: "Agence Omra & Hajj FR — récit (1)", compte: "@pelerinhajj", lien: "https://www.instagram.com/p/DX41SCRsX3b/", stat: "8 776 vues · 1 885 ❤️", son: "Audio original (nasheed/voix)", sonLien: "https://www.instagram.com/p/DX41SCRsX3b/", pourquoi: "Concurrent étranger sur le MÊME produit : ton pédagogique + émotion. Fort like-rate → la sincérité paie.", message: "Préparer et vivre son pèlerinage", hook: "Question/conseil utile", plans: "Lieux Saints + voix off posée.", posture: "Comparer offres/ton FR pour s'améliorer." },
        { origine: "🇫🇷 France", titre: "PèlerinHajj — récit émotionnel (2)", compte: "@pelerinhajj", lien: "https://www.instagram.com/p/DXkF4yNjGXY/", stat: "8 769 vues · 3 673 ❤️", son: "Audio original (nasheed)", sonLien: "https://www.instagram.com/p/DXkF4yNjGXY/", pourquoi: "Like-rate énorme (3 673/8 769) : le contenu émotionnel sincère bat la promo. Le sentiment vend.", message: "L'émotion du pèlerinage", hook: "Moment fort/larme", plans: "Visages, prière, Rawda (avec pudeur).", posture: "Émotion authentique, jamais forcée." },
        { origine: "🇫🇷 France", titre: "PèlerinHajj — conseils (3)", compte: "@pelerinhajj", lien: "https://www.instagram.com/p/DYFvjcsIRtN/", stat: "8 706 vues · 723 ❤️", son: "Audio original", sonLien: "https://www.instagram.com/p/DYFvjcsIRtN/", pourquoi: "Le format « conseils utiles » (préparation, dou'a, logistique) génère des saves → valeur pratique.", message: "Mieux préparer son Omra", hook: "« Ce qu'il faut savoir avant… »", plans: "Cartons conseils + B-roll.", posture: "Apporter de la valeur pratique (saves)." },
        { origine: "🇫🇷 France", titre: "Institut FR « par des diplômés de Médine »", compte: "@omradusavoir", lien: "https://www.instagram.com/p/DYwLcvXsodX/", stat: "❤️ 2 800 (vues non captées)", son: "Audio original (voix)", sonLien: "https://www.instagram.com/p/DYwLcvXsodX/", pourquoi: "Contenu pédagogique sobre (savoir + émotion) : le meilleur modèle de TON pour une audience exigeante.", message: "« Le savoir au service du pèlerinage »", hook: "Enseignement court", plans: "Voix calme + texte.", posture: "Allier savoir religieux et émotion, avec sobriété." }
      ],
      viralUgc: [
        { origine: "🇫🇷 France", titre: "UGC pèlerine — récit sobre", compte: "@can_dela_16", lien: "https://www.instagram.com/p/DZh676GooCF/", stat: "❤️ 24 (vues non captées)", son: "Audio original", sonLien: "https://www.instagram.com/p/DZh676GooCF/", pourquoi: "Récit personnel d'une vraie pèlerine → confiance. Le public se méfie des promos d'agence.", message: "« Mon Omra, mon ressenti »", hook: "Témoignage sincère", plans: "Face caméra sobre + B-roll perso.", posture: "Activer un vrai client V21 volontaire (jamais d'acteur)." },
        { origine: "🇫🇷 France", titre: "UGC associatif — départ groupe", compte: "@les_e.i.l", lien: "https://www.instagram.com/p/DZiPRRejJTo/", stat: "❤️ 25 (vues non captées)", son: "Audio original", sonLien: "https://www.instagram.com/p/DZiPRRejJTo/", pourquoi: "Contenu de groupe (départ, encadrement) = exactement l'esprit du voyage encadré V21.", message: "« Partir ensemble, bien encadrés »", hook: "Ambiance départ groupe", plans: "Aéroport, groupe, encadrant.", posture: "Montrer l'encadrement réel V21 (réassurance)." },
        { origine: "🌍 Intl", titre: "UGC quotidien — ambiance Omra", compte: "@gateaux_aiicha", lien: "https://www.instagram.com/p/DZfydBgiJEn/", stat: "❤️ 21 (vues non captées)", son: "Audio original", sonLien: "https://www.instagram.com/p/DZfydBgiJEn/", pourquoi: "Compte lifestyle qui partage son Omra → preuve que le contenu spontané existe et fédère (reposter avec accord).", message: "« Mon quotidien pendant l'Omra »", hook: "Moment du jour", plans: "Vlog sobre.", posture: "Reposter de l'UGC client avec autorisation." }
      ],
      pistes: [
        "Concours « Rib7 Omra » (gagne une Omra) — suivre + partager + commenter « آمين »",
        "Reel Haram de nuit / Tawaf au ralenti + nasheed sobre (B-roll réel)",
        "Témoignage pèlerin réel volontaire : « pourquoi commencer par Médine » (vol direct)",
        "Explainer darija : « différence entre une Omra à escale et un vol direct Médine »",
        "Carrousel « les formules Omra V21 expliquées » (du 12 900 Etihad au 5★ Haram)"
      ],
      audio: [
        { style: "Nasheed vocal sobre (sans instruments)", usage: "TOUT contenu Omra — respect de l'audience. À privilégier", lien: "https://pixabay.com/music/search/nasheed/" },
        { style: "Ambiance spirituelle / islamic ambient", usage: "B-roll Haram/Médine, lecture posée", lien: "https://pixabay.com/music/search/islamic/" },
        { style: "🔥 Audio/nasheed tendance IG du créneau", usage: "Le son que les comptes Omra utilisent (à repérer dans l'app) — booste le reach", lien: "https://www.instagram.com/reels/audio/" }
      ],
      postsClesEnMain: [
        {
          titre: "★ Concours « Rib7 Omra » — lancement de communauté (reel 30-45s)",
          format: "Concours · reel + carton règles",
          lienCible: "https://www.instagram.com/p/DYKcyl7oogK/",
          langues: "Darija + arabe (sous-titres)",
          script: "HOOK : « Rib7 omra kamla m3a Voyages21 🕋 ». Plans Haram/Médine sobres + carton règles : 1) Suivre @voyages21maroc, 2) Partager en story, 3) Commenter « آمين » + taguer 2 personnes. Tirage transparent en live. Carton final : date du tirage + offres dès 12 900 DH.",
          visuel: "Vraies images Lieux Saints, nasheed sobre, cartons vert/or V21. Aucune musique instrumentale.",
          casting: "Aucun acteur. Voix off darija posée.",
          tournage: "B-roll réel (banque/UGC autorisé) + cartons animés. ⚠️ Règlement de jeu écrit (conditions, tirage, date) pour conformité.",
          cta: "« Suis + partage + commente آمين · résultat le [date] »",
          kpis: "Commentaires > 1 000 · abonnés gagnés (objectif n°1 du concours) · partages > 200"
        },
        {
          titre: "★ Reel UGC témoignage PÈLERIN réel (60-90s)",
          format: "UGC authentique · talking-head sobre",
          lienCible: "https://www.instagram.com/p/DXXDQCHgpi1/",
          langues: "Darija + sous-titres FR",
          script: "Un pèlerin V21 réel et volontaire raconte : « Bdina men Médine, vol direct, bla ta3b… » → l'arrivée à la Rawda, l'organisation, l'encadrement → « Allah ybarek, kulchi kan mrtab ». B-roll de SON voyage (avec accord).",
          visuel: "Brut, sobre, respectueux. Pas de musique sous le témoignage (ou nasheed très discret).",
          casting: "BRIEF : pèlerin réel V21 (Omra récente) volontaire, accord écrit à l'image. ⚠️ JAMAIS de faux témoignage ni d'acteur jouant un pèlerin.",
          tournage: "Smartphone du pèlerin + B-roll fournis. Karim valide. Respect total des Lieux Saints au montage.",
          cta: "« Ton tour cet été ? DM “OMRA” · vol direct Médine dès 15 900 DH »",
          kpis: "Vues > 10 000 · saves · DM qualifiés · confiance (sentiment commentaires)"
        }
      ]
    }
  },

  zanzibar: {
    // 1) NOS OFFRES (fiche réelle du site, départs garantis juin–août 2026)
    offres: [
      {
        titre: "Séjour Zanzibar — Fun Beach 3★", badge: "Détente · prix d'appel", duree: "8 j / 7 nuits", prix: "dès 18 500 DH/pers",
        prixDetail: "Triple 18 500 · Double 21 500 · Single 24 800 (petit-déj) — demi-pension dès 23 900",
        hotels: "Fun Beach Hotel 3★ (Nungwi, petit-déj ou demi-pension)",
        pension: "7 nuits petit-déjeuner (ou demi-pension)", vols: "Inclus — Turkish Airlines A/R",
        volsHoraires: "Départs garantis juin → août 2026", inclus: ["Vol Turkish Airlines A/R", "Transferts privés", "Taxes de séjour", "Assurance obligatoire"],
        exclus: ["Visa à l'aéroport (50 USD)", "Excursions optionnelles"],
        visites: "Stone Town (UNESCO), plages de Nungwi & Kendwa, lagon turquoise de l'océan Indien",
        dates: "Départs garantis juin → août 2026"
      },
      {
        titre: "Séjour Zanzibar — Breeze's 4★", badge: "Confort 4★", duree: "8 j / 7 nuits", prix: "dès 22 500 DH/pers",
        prixDetail: "Triple 22 500 · Double 24 300 · Single 27 500 → premium jusqu'à 38 900 (demi-pension)",
        hotels: "Breeze's Beach Club & Spa 4★ (demi-pension / premium)",
        pension: "7 nuits demi-pension", vols: "Inclus — Turkish Airlines A/R",
        volsHoraires: "Départs garantis juin → août 2026", inclus: ["Vol Turkish Airlines A/R", "Transferts privés", "Taxes de séjour", "Assurance obligatoire"],
        exclus: ["Visa à l'aéroport (50 USD)", "Excursions optionnelles"],
        visites: "Stone Town (UNESCO), Nungwi & Kendwa, excursions possibles (dauphins, Safari Blue, île aux épices)",
        dates: "Départs garantis juin → août 2026"
      }
    ],

    // 2) VEILLE CONCURRENTS Zanzibar — créneau de NICHE (scrape Apify 14/06/2026)
    concurrents: {
      benchmarkTitre: "Benchmark Zanzibar (départ Maroc, vols inclus) — créneau de niche",
      comptes: [
        { nom: "@olevoyages.ma", abonnes: "93 K", type: "Outgoing — propose Zanzibar (catalogue web)", note: "A un circuit Zanzibar sur son site, mais ⚠️ peu mis en avant sur IG + compte non récupérable au scrape" },
        { nom: "@ajinsafro.ma", abonnes: "70 K", type: "Outgoing — Zanzibar au catalogue", note: "Zanzibar existe dans l'offre web mais absent du feed IG récent (pas une priorité de com)" },
        { nom: "@kabdani.ma", abonnes: "—", type: "Séjours balnéaires", note: "Pousse Saïdia / Marrakech / Espagne / Omra — PAS de Zanzibar dans le feed → confirme la niche" },
        { nom: "@vacancia.ma / @terratour_voyages", abonnes: "139K / 75K", type: "Diversifiés (Bali, Vietnam…)", note: "Très actifs sur d'autres lointains, mais Zanzibar absent du feed récent" },
        { nom: "▶ @voyages21maroc (NOUS)", abonnes: "petit · Meta Verified", type: "Notre compte", note: "Aucun concurrent MA ne « possède » Zanzibar sur IG → place à prendre" }
      ],
      benchmarkPrix: [
        { agence: "▶ Voyages21 (NOUS)", offre: "Zanzibar Fun Beach 3★ (petit-déj)", duree: "8j/7n", hotels: "3★ Nungwi", prix: "18 500 DH", verifie: true },
        { agence: "▶ Voyages21 (NOUS)", offre: "Zanzibar Breeze's 4★ (demi-pension)", duree: "8j/7n", hotels: "4★", prix: "22 500 DH", verifie: true },
        { agence: "Concurrents MA (olé, ajinsafro…)", offre: "Zanzibar (offre rare, prix non publié sur IG)", duree: "—", hotels: "—", prix: "à demander", verifie: false }
      ],
      benchmarkAnalyse: [
        "Position : INDÉTERMINABLE sur la seule data — aucun prix concurrent marocain Zanzibar n'a été capté au scrape du 14/06 (offre rare, prix non publiés sur IG).",
        "On ne dispose que des 2 prix V21 (Fun Beach 3★ 18 500 / Breeze's 4★ 22 500) → impossible de dire si V21 est cher ou bon marché vs concurrents MA.",
        "Conclusion (data seule) : situer V21 nécessite d'obtenir d'abord des prix concurrents (fiche olevoyages/ajinsafro). Tant qu'ils manquent, pas de comparaison honnête possible."
      ],
      apifyStatut: "✅ Scrape Apify autonome (14/06/2026, run Dm4cvv2QSdbLeXXh3 : kabdani.ma 20 posts + hashtag + tentative olevoyages). RÉSULTAT CLÉ : aucun reel Zanzibar marocain marquant trouvé → le créneau est quasi inoccupé sur l'IG MA. Pas de benchmark prix concurrent fiable (offre rare, prix non affichés). C'est un WHITE SPACE.",
      learnings: [
        "🎯 WHITE SPACE confirmé : sur ~42 posts scrapés, aucun reel Zanzibar marocain marquant → personne ne « possède » Zanzibar sur l'IG MA. V21 peut devenir LA référence Zanzibar depuis le Maroc.",
        "Revers : peu de demande chaude → il faut CRÉER l'envie (contenu aspirationnel fort), pas récolter une demande existante comme pour l'Égypte.",
        "Zanzibar coche toutes les cases « virales » : eau turquoise, dauphins, Stone Town & épices, plages de carte postale → matière à reels premium.",
        "Le format qui scale ailleurs (reel transition plage + audio afro/tropical) se transpose parfaitement à Nungwi/Kendwa.",
        "Argument V21 : vol Turkish Airlines + transferts privés inclus + 3★/4★ dès 18 500 DH → « l'évasion océan Indien, accessible et clé en main »."
      ]
    },

    // 3) CADRAN
    cadran: {
      forces: [
        "Vols Turkish Airlines + transferts privés inclus (confort, pas de logistique pour le client)",
        "Double ambiance : Stone Town (UNESCO, épices, swahili) + plages Nungwi/Kendwa (lagon turquoise)",
        "Gamme 3★ → 4★ premium (18 500 → 38 900 DH), s'adapte aux budgets",
        "Créneau peu concurrencé au Maroc → first-mover possible"
      ],
      faiblesses: [
        "Destination de niche : demande à CRÉER (notoriété Zanzibar faible chez la cible MA)",
        "Visa 50 USD + excursions non inclus → à clarifier dans la com (transparence)",
        "Aucune notoriété V21 sur la destination (on part de zéro)",
        "Concurrence des TO français/internationaux pour la clientèle déjà informée"
      ],
      ameliorer: [
        "Créer du contenu aspirationnel FORT (reels plage/dauphins/Stone Town) pour générer l'envie",
        "Packager une excursion phare (dauphins Kizimkazi, Safari Blue, île aux épices) pour enrichir l'offre",
        "Afficher le prix d'appel 18 500 DH + « vol Turkish Airlines inclus » dans chaque post",
        "Capter en amont via Pinterest + Reels (recherche « Zanzibar depuis le Maroc », « voyage océan Indien »)"
      ]
    },

    // 4) CONTENU
    contenu: {
      posts: [
        {
          visuel: "Plage de Nungwi, sable blanc, lagon turquoise, boutre (dhow) traditionnel (vraie image)",
          accroche: "Zanzibar. 🏝️ Le lagon turquoise de l'océan Indien, à 7h de vol de Casa.",
          legende: "Séjour Zanzibar 8 jours — vol Turkish Airlines inclus, plages de Nungwi & Kendwa. Dès 18 500 DH/pers. 📲 0661 24 70 49 · voyages21.com",
          hashtags: "#Voyages21 #Zanzibar #Nungwi #OcéanIndien #VoyageDeRêve",
          audio: "Afrobeat / amapiano doux & solaire — énergie plage, drop sur le plan lagon."
        },
        {
          visuel: "Ruelles de Stone Town, portes sculptées, marché aux épices (vraie image)",
          accroche: "Avant la plage, l'âme swahili. 🌿 Stone Town, classée UNESCO, parfum de girofle et d'histoire.",
          legende: "Zanzibar, ce n'est pas que la plage : Stone Town, les épices, l'héritage swahili. 8 jours, vols inclus, dès 18 500 DH. 📲 0661 24 70 49",
          hashtags: "#Voyages21 #Zanzibar #StoneTown #UNESCO #ÎleAuxÉpices",
          audio: "World/swahili fusion douce (percussions, kora) — ambiance authentique."
        },
        {
          visuel: "Transition : ruelle Stone Town → saut → lagon turquoise + dauphins (B-roll réel)",
          accroche: "Culture le matin, dauphins l'après-midi. 🐬 Une semaine entre histoire et océan.",
          legende: "Stone Town + Nungwi + Kendwa, en un seul séjour. Vol Turkish Airlines inclus, dès 18 500 DH. Places limitées été 2026. 📲 0661 24 70 49",
          hashtags: "#Voyages21 #Zanzibar #Dauphins #Kendwa #SafariBlue",
          audio: "Transition au beat, afro-house tropical. Whip-cut culture→océan."
        }
      ],
      noteVisuels: "⚠️ Lieux réels (Stone Town, Nungwi, Kendwa) = vraies photos/vidéos (retravaillées IA si besoin). Visuels IA = ambiance/inspiration uniquement.",
      planning: "Zanzibar = jouer l'ASPIRATIONNEL (créer l'envie). Pousser des reels « carte postale » + Pinterest pour capter la recherche en amont."
    },

    // 5) INSPIRATION VIRALE
    viral: {
      statut: "⚠️ Aucun reel Zanzibar marocain viral existant (niche) → les exemples ci-dessous sont des FORMATS réels prouvés à transposer sur Zanzibar. À toi de créer le 1er reel Zanzibar marocain qui perce.",
      viralExamples: [
        { cat: "ugc", origine: "🇹🇿 Zanzibar", titre: "★ Créatrice locale — « Zanzibar Tastemaker »", compte: "@sabah_adeem", lien: "https://www.instagram.com/p/DYUa_wZsIWN/", stat: "3 813 vues · 676 ❤️", pourquoi: "UGC d'une créatrice basée à Zanzibar : l'aspirationnel authentique « vie sur l'île ». Le ton exact à reproduire (réel > promo)." },
        { cat: "ugc", origine: "🇹🇿 Tanzanie", titre: "UGC « Beautiful Tanzania »", compte: "@storynzuri", lien: "https://www.instagram.com/p/C5yvyy_LyRr/", stat: "1 762 vues · 1 233 ❤️", pourquoi: "Like-rate très élevé sur du contenu nature/plage → preuve que l'image « carte postale » crée l'envie. Modèle B-roll." },
        { cat: "ugc", origine: "🇹🇿 Zanzibar", titre: "UGC voyageur — Ahmed de Zanzibar", compte: "@ahmed_dezan", lien: "https://www.instagram.com/p/DZhegKICGnw/", stat: "❤️ 11 (vues non captées)", pourquoi: "Guide/créateur local : le format « insider qui te montre l'île » à reproduire avec un partenaire sur place." },
        { cat: "reel", origine: "🇲🇦 Maroc", titre: "Format combiné/transition « 2 décors en 1 »", compte: "@vacancia.ma", lien: "https://www.instagram.com/p/DYo9YhegdXn/", stat: "63 611 vues · 410 ❤️", pourquoi: "À transposer : Stone Town → lagon Nungwi. (Pas de reel Zanzibar MA viral existant → format à importer.)" },
        { cat: "reel", origine: "🇲🇦 Maroc", titre: "Squelette « destination + dates + places limitées »", compte: "@terratour_voyages", lien: "https://www.instagram.com/p/DX9xEMlMHjW/", stat: "71 551 vues · 1 888 ❤️", pourquoi: "Le plus efficace du marché MA → l'appliquer à Zanzibar (départs garantis juin-août, places limitées)." },
        { cat: "reel", origine: "🇹🇿 Zanzibar", titre: "Hôtel/resort local — reel séjour", compte: "@thegarten.living", lien: "https://www.instagram.com/p/DZhFcKbgDEH/", stat: "❤️ 48 (vues non captées)", pourquoi: "Reel « resort/chambre vue océan » : le type de plan qui vend le rêve balnéaire. À filmer sur nos hôtels Nungwi/Kendwa." },
        { cat: "intl", origine: "🇹🇿 Tanzanie", titre: "★ Créateur Tanzanie — « beach villa »", compte: "@rena_callist", lien: "https://www.instagram.com/p/DRSE98cjIAN/", stat: "10 690 vues · 2 832 ❤️", pourquoi: "Le contenu lifestyle/villa de plage scale (10k vues, fort like-rate). Modèle de viralité « art de vivre océan Indien »." },
        { cat: "intl", origine: "🇹🇿 Zanzibar", titre: "Créateur local — design/lifestyle île", compte: "@dogoelishaofficial", lien: "https://www.instagram.com/p/DZjq9vNAk2B/", stat: "❤️ 46 (vues non captées)", pourquoi: "Créateur zanzibari : esthétique locale (couleurs, Stone Town). Source d'inspiration visuelle authentique." },
        { cat: "intl", origine: "🌍 Intl", titre: "UGC voyageur étranger — Zanzibar", compte: "@dakotacrooks89", lien: "https://www.instagram.com/p/DZgUcZ5zFX4/", stat: "❤️ 12 (vues non captées)", pourquoi: "Touriste international qui documente son séjour → preuve de la demande internationale, et modèle d'UGC à solliciter auprès de nos clients." }
      ],
      pistes: [
        "Reel transition « Stone Town → lagon turquoise » (whip-cut, afro-house)",
        "POV « POV : ton réveil face à l'océan Indien à Nungwi »",
        "Cost breakdown « Zanzibar depuis Casa, le vrai budget 8 jours »",
        "« 5 choses à faire à Zanzibar » (dauphins, Safari Blue, épices, Stone Town, Kendwa)",
        "Carrousel + épingles Pinterest « Itinéraire 8 jours à Zanzibar »"
      ],
      audio: [
        { style: "Afrobeat / Amapiano solaire", usage: "Plages, transitions, énergie océan Indien", lien: "https://pixabay.com/music/search/afrobeat/" },
        { style: "Tropical / island chill", usage: "Day-in-life, lagon, slow travel", lien: "https://pixabay.com/music/search/tropical/" },
        { style: "Travel cinématique (Uppbeat)", usage: "Stone Town, plans aériens, récap", lien: "https://uppbeat.io/browse/music/travel" },
        { style: "🔥 Audio tendance IG/TikTok", usage: "Le levier de reach n°1 — son du moment dans l'app", lien: "https://www.instagram.com/reels/audio/" }
      ],
      postsClesEnMain: [
        {
          titre: "Reel transition « Stone Town → lagon » (15-30s)",
          format: "Reel transition · afro-house",
          lienCible: "https://www.instagram.com/p/DYo9YhegdXn/",
          langues: "FR + darija (texte court)",
          script: "Temps 1 : ruelle Stone Town, porte sculptée (claquement). Temps 2 : whip → plage turquoise Nungwi, boutre. Temps 3 : dauphins / lagon. Texte « Zanzibar : l'histoire + l'océan, en 8 jours ». Carton « vol Turkish inclus · dès 18 500 DH ».",
          visuel: "Match-cut culture→océan, afro-house, 9:16, 15-25s, couleurs chaudes.",
          casting: "Aucun (B-roll réel).",
          tournage: "3-6 plans réels (banque/UGC autorisé), CapCut. Le combiné = l'angle différenciant.",
          cta: "« Places limitées été 2026 · lien en bio »",
          kpis: "Vues > 15 000 (1er test niche) · saves > 100 · partages > 50"
        },
        {
          titre: "★ Reel UGC voyageur Zanzibar (avec acteur) (60-90s)",
          format: "UGC authentique · talking-head + B-roll",
          lienCible: "https://www.instagram.com/p/DX9xEMlMHjW/",
          langues: "Darija + sous-titres FR",
          script: "Voyageur réel (ou créateur partenaire identifié) : « Ma kuntش 3aref belli Zanzibar qrib hakka… » → réveil à Nungwi, excursion dauphins, Stone Town → « b 18 500 DH, vol Turkish, kulchi organisé ». B-roll de son séjour.",
          visuel: "Brut/vertical, lumière naturelle, crédibilité « story ».",
          casting: "BRIEF : voyageur réel V21 Zanzibar OU micro-créateur MA 5-50k, défrayé, mention « partenariat ». ⚠️ Jamais de faux témoignage ni d'influenceur IA.",
          tournage: "Smartphone du voyageur + 3 B-roll. Droits à l'image signés. Karim valide.",
          cta: "« Tenté par l'océan Indien ? DM “ZANZIBAR” · 0661 24 70 49 »",
          kpis: "Vues > 10 000 · DM qualifiés (création de demande) · saves"
        }
      ]
    }
  },

  vietnam: {
    offres: [
      {
        titre: "Découverte du Vietnam — Hanoi à Saigon", badge: "Grand circuit 5★", duree: "14 j / 11 nuits", prix: "dès 33 900 DH/pers",
        prixDetail: "À partir de 33 900 DH/pers", hotels: "5★", pension: "Repas mentionnés au programme",
        vols: "Inclus — Qatar Airways + vols intérieurs", volsHoraires: "Départs 02-15 août · 08-21 août 2026 · guide francophone",
        inclus: ["Vols Qatar Airways Casablanca–Hanoi / Saigon–Casablanca", "Hôtels 5★", "Vols intérieurs", "Croisière baie d'Halong (UNESCO)", "Guide francophone"],
        exclus: ["Visa (800 DH)", "Pourboires", "Dépenses personnelles"],
        visites: "Hanoi, baie d'Halong (UNESCO), Hué & Hoi An (UNESCO), Da Nang, Hô Chi Minh-Ville",
        dates: "02-15 août · 08-21 août 2026"
      }
    ],
    concurrents: {
      benchmarkTitre: "Benchmark Vietnam (départ Maroc, vols inclus)",
      comptes: [
        { nom: "@terratour_voyages", abonnes: "75 K", type: "Outgoing — vend le Vietnam", note: "Reel Vietnam (40 477 vues / 1 141 ❤️) : « destination + dates + places limitées ». Concurrent MA actif sur l'Asie lointaine" },
        { nom: "@follow_me_travel_", abonnes: "111 K", type: "Outgoing — combinés Asie", note: "Très actif sur l'Asie (KL+Bali, etc.). Reels combinés performants" },
        { nom: "@vacancia.ma", abonnes: "139 K", type: "Outgoing — lointains", note: "Pousse Bali/Asie en volume. Vietnam non vu dans le feed récent" },
        { nom: "▶ @voyages21maroc (NOUS)", abonnes: "petit · Meta Verified", type: "Notre compte", note: "Aucun contenu Vietnam pour l'instant" }
      ],
      benchmarkPrix: [
        { agence: "▶ Voyages21 (NOUS)", offre: "Vietnam Hanoi→Saigon 5★", duree: "14j/11n", hotels: "5★ + vols intérieurs", prix: "33 900 DH", verifie: true },
        { agence: "Concurrents MA (terratour, etc.)", offre: "Vietnam (prix non affiché en post)", duree: "—", hotels: "—", prix: "à demander", verifie: false }
      ],
      benchmarkAnalyse: [
        "Position : INDÉTERMINABLE sur la seule data — aucun prix concurrent Vietnam n'a été capté (terratour vend le Vietnam mais n'affiche PAS le prix dans le reel scrapé du 14/06).",
        "Seule donnée chiffrée = V21 33 900 DH (14j/11n, 5★, Qatar + vols intérieurs).",
        "Conclusion (data seule) : situer V21 nécessite d'obtenir le prix terratour/concurrents. Tant qu'il manque, pas de comparaison honnête."
      ],
      engagementReel: [
        { compte: "@terratour_voyages", format: "Reel Vietnam « destination + dates »", vues: "40 477", likes: "1 141", comm: "6" },
        { compte: "▶ @voyages21maroc (NOUS)", format: "Meilleur reel récent (toutes dest.)", vues: "149", likes: "6", comm: "1" }
      ],
      learnings: [
        "Terratour prouve que le Vietnam SE VEND en reel MA (40k vues) avec le schéma « destination + dates + places limitées + n° ».",
        "Le Vietnam est très visuel (Halong, Hoi An lanternes, rizières) → matière à reels premium que V21 peut surpasser.",
        "Marché émetteur international massif (Inde, Europe) → audios et formats universels disponibles."
      ],
      apifyStatut: "✅ Scrape Apify (14/06/2026, run hashtag #vietnam + reels MA). ⚠️ Le hashtag international ramène du contenu RÉCENT à faible engagement (vues non captées) → pour des exemples internationaux vraiment viraux, un scrape d'influenceurs Vietnam ciblé (depuis desktop) est recommandé."
    },
    cadran: {
      forces: ["Circuit 5★ complet Hanoi→Saigon avec vols intérieurs inclus", "Croisière baie d'Halong (UNESCO) + Hué/Hoi An", "Vols Qatar Airways + guide francophone", "Destination « bucket-list » très désirable"],
      faiblesses: ["Prix élevé (33 900) → cible CSP+ uniquement", "Aucune notoriété V21 sur le Vietnam", "Concurrence MA active (terratour) + TO internationaux", "Pas de prix concurrent connu pour se positionner"],
      ameliorer: ["Produire un reel « destination + dates » à la terratour, mais mieux filmé (Halong/Hoi An)", "Obtenir le prix concurrent pour ajuster le positionnement", "Mettre en avant guide FR + vols intérieurs inclus (réassurance)", "Carrousel/Pinterest « itinéraire 14 jours Vietnam »"]
    },
    contenu: {
      posts: [
        { visuel: "Baie d'Halong au lever du soleil, jonque traditionnelle (vraie image)", accroche: "La baie d'Halong, classée par l'UNESCO. ⛰️ 14 jours du nord au sud du Vietnam, en 5★.", legende: "Hanoi, Halong, Hué, Hoi An, Saigon — vols Qatar Airways + vols intérieurs inclus. Dès 33 900 DH/pers. 📲 0661 24 70 49", hashtags: "#Voyages21 #Vietnam #Halong #HoiAn", audio: "Cinématique asiatique douce (cordes + flûte), montée sur la baie." },
        { visuel: "Hoi An la nuit, lanternes colorées sur la rivière", accroche: "Hoi An, la ville aux mille lanternes. 🏮", legende: "Le Vietnam authentique, en circuit 5★ guidé en français. Dès 33 900 DH. 📲 0661 24 70 49 · voyages21.com", hashtags: "#Voyages21 #Vietnam #HoiAn #Lanternes", audio: "Lo-fi travel asiatique, ambiance contemplative." }
      ],
      noteVisuels: "Lieux réels = vraies images. Visuels IA = inspiration uniquement.",
      planning: "Cible CSP+. Pousser l'aspirationnel (Halong/Hoi An) + carrousel itinéraire + Pinterest."
    },
    viral: {
      statut: "✅ Reels MA réels + exemples internationaux. ⚠️ L'international Vietnam scrapé (hashtag) est RÉCENT et peu viral (likes faibles, vues non captées) — un scrape d'influenceurs ciblé enrichirait cette section.",
      viralExamples: [
        { cat: "reel", origine: "🇲🇦 Maroc", titre: "★ Concurrent — reel Vietnam qui marche", compte: "@terratour_voyages", lien: "https://www.instagram.com/p/DZKRrxNszhZ/", stat: "40 477 vues · 1 141 ❤️", pourquoi: "Preuve que le Vietnam se vend en reel MA. Schéma « destination + dates + places limitées ». À refaire mieux filmé." },
        { cat: "reel", origine: "🇲🇦 Maroc", titre: "Format « circuit Asie premium »", compte: "@terratour_voyages", lien: "https://www.instagram.com/p/DY62Ijgsjlw/", stat: "33 196 vues · 865 ❤️", pourquoi: "Modèle de reel circuit Asie (Japon) transposable au Vietnam." },
        { cat: "reel", origine: "🇲🇦 Maroc", titre: "Reel combiné Asie", compte: "@follow_me_travel_", lien: "https://www.instagram.com/p/DZWC40AznlA/", stat: "16 953 vues · 454 ❤️", pourquoi: "Reach correct sur l'Asie : montage rythmé multi-décors." },
        { cat: "ugc", origine: "🌍 Intl", titre: "UGC voyageuse — Vietnam", compte: "@diaenarys", lien: "https://www.instagram.com/p/DZjzImHGiEM/", stat: "❤️ 7 (vues non captées)", pourquoi: "UGC voyageuse : le ton « carnet de voyage » à reproduire avec un client V21." },
        { cat: "ugc", origine: "🇮🇳 Inde", titre: "UGC voyageuse indienne — Vietnam", compte: "@ruchira600", lien: "https://www.instagram.com/p/DZjzDl3tqSv/", stat: "❤️ 4 (vues non captées)", pourquoi: "L'Inde est un marché émetteur énorme vers le Vietnam → codes/audios universels à observer." },
        { cat: "ugc", origine: "🌍 Intl", titre: "UGC — quotidien au Vietnam", compte: "@ems_home_", lien: "https://www.instagram.com/p/DZjyRi7GjZl/", stat: "❤️ 5 (vues non captées)", pourquoi: "Contenu « slow travel » du quotidien : authenticité à solliciter chez nos voyageurs." },
        { cat: "intl", origine: "🌍 Intl", titre: "Street photography — Vietnam", compte: "@ir.raw.street", lien: "https://www.instagram.com/p/DZj0Co-sxrS/", stat: "❤️ 3 (vues non captées)", pourquoi: "Esthétique « scènes de rue » : direction artistique premium pour se différencier des promos." },
        { cat: "intl", origine: "🌍 Intl", titre: "Créateur voyage — Vietnam", compte: "@h_jpegz", lien: "https://www.instagram.com/p/DZjxJPbiT7h/", stat: "❤️ 3 (vues non captées)", pourquoi: "Voyageur étranger documentant le pays : preuve de la désirabilité internationale." },
        { cat: "intl", origine: "🌍 Intl", titre: "UGC voyageuse — Vietnam", compte: "@cthrnkhdv", lien: "https://www.instagram.com/p/DZjyYVYkyaV/", stat: "❤️ 4 (vues non captées)", pourquoi: "Format « POV découverte » réutilisable en darija/FR." }
      ],
      pistes: ["Reel « destination + dates » Halong/Hoi An (modèle terratour, mieux filmé)", "Transition « du nord au sud » Hanoi→Saigon", "Carrousel + Pinterest « itinéraire 14 jours Vietnam »"],
      audio: [
        { style: "Cinématique asiatique (cordes + flûte)", usage: "Halong, temples, rizières", lien: "https://pixabay.com/music/search/asian/" },
        { style: "Lo-fi travel", usage: "Hoi An, slow travel", lien: "https://pixabay.com/music/search/travel/" },
        { style: "🔥 Audio tendance IG", usage: "Le levier de reach n°1", lien: "https://www.instagram.com/reels/audio/" }
      ],
      postsClesEnMain: [
        { titre: "Reel transition « du nord au sud du Vietnam » (15-30s)", format: "Reel transition", lienCible: "https://www.instagram.com/p/DZKRrxNszhZ/", langues: "FR + darija", script: "Halong (claquement) → Hoi An lanternes → Saigon trépidante. Texte « 14 jours, du nord au sud ». Carton « 5★ · vols inclus · dès 33 900 DH ».", visuel: "Match-cut 3 ambiances, audio asiatique, 9:16.", casting: "Aucun (B-roll).", tournage: "3-6 plans réels, CapCut.", cta: "« Lien en bio · départs août 2026 »", kpis: "Vues > 15 000 · saves > 100" },
        { titre: "★ Reel UGC voyageur Vietnam (avec acteur) (60-90s)", format: "UGC authentique", lienCible: "https://www.instagram.com/p/DZjzImHGiEM/", langues: "Darija + sous-titres FR", script: "Voyageur réel V21 : « 14 jours au Vietnam… » → Halong, Hoi An, street-food → « guide FR, tout organisé ». B-roll de son voyage.", visuel: "Brut, vertical, lumière naturelle.", casting: "BRIEF : client réel V21 OU micro-créateur, défrayé, mention « partenariat ». Jamais de faux témoignage.", tournage: "Smartphone du voyageur + B-roll. Droits signés.", cta: "« Tenté ? DM “VIETNAM” »", kpis: "Vues > 10 000 · DM qualifiés" }
      ]
    }
  },

  thailande: {
    offres: [
      {
        titre: "Exotic Thailand — Bangkok, Krabi & Phuket", badge: "Circuit temples + plages", duree: "14 j / 11 nuits", prix: "dès 26 900 DH/pers",
        prixDetail: "À partir de 26 900 DH/pers", hotels: "Bangkok 4★ Deluxe + Krabi/Phuket 5★", pension: "Repas mentionnés au programme",
        vols: "Inclus — Qatar Airways + vol intérieur Bangkok–Krabi", volsHoraires: "Départs 01-14 · 07-20 · 11-24 août 2026 · guide francophone",
        inclus: ["Vols Qatar Airways", "Hôtels (Bangkok 4★ Dlx, Krabi/Phuket 5★)", "Vol intérieur Bangkok–Krabi", "Croisière sur la Chao Phraya", "Guide francophone"],
        exclus: ["Visa selon nationalité", "Pourboires", "Dépenses personnelles"],
        visites: "Bangkok (marchés flottants, temples, croisière), plages de Krabi & Phuket",
        dates: "01-14 · 07-20 · 11-24 août 2026"
      }
    ],
    concurrents: {
      benchmarkTitre: "Benchmark Thaïlande (départ Maroc, vols inclus)",
      comptes: [
        { nom: "@follow_me_travel_", abonnes: "111 K", type: "Outgoing — combinés Asie", note: "Pousse les combinés Asie (KL+Bali, etc.). Reels actifs (max 17k vues)" },
        { nom: "@terratour_voyages", abonnes: "75 K", type: "Outgoing — circuits Asie", note: "Vend Japon/Vietnam en reel (33-40k vues). Même logique applicable à la Thaïlande" },
        { nom: "@vacancia.ma", abonnes: "139 K", type: "Outgoing — lointains", note: "Bali/Asie en volume" },
        { nom: "▶ @voyages21maroc (NOUS)", abonnes: "petit · Meta Verified", type: "Notre compte", note: "Aucun contenu Thaïlande" }
      ],
      benchmarkPrix: [
        { agence: "▶ Voyages21 (NOUS)", offre: "Bangkok + Krabi + Phuket", duree: "14j/11n", hotels: "4★ Dlx + 5★", prix: "26 900 DH", verifie: true },
        { agence: "Concurrents MA", offre: "Thaïlande (prix non affiché en post)", duree: "—", hotels: "—", prix: "à demander", verifie: false }
      ],
      benchmarkAnalyse: [
        "Position : INDÉTERMINABLE sur la seule data — aucun prix concurrent Thaïlande capté au scrape du 14/06.",
        "Seule donnée chiffrée = V21 26 900 DH (14j/11n, 4★ Dlx + 5★, Qatar + vol intérieur).",
        "Conclusion (data seule) : comparaison impossible tant qu'aucun prix concurrent n'est obtenu."
      ],
      learnings: [
        "La Thaïlande génère énormément de contenu international (marchés émetteurs Inde/Europe) → audios et formats universels disponibles.",
        "Le combiné « temples + plages » (Bangkok puis Krabi/Phuket) est une transition idéale pour le format reel viral.",
        "Aucun concurrent MA ne domine la Thaïlande en reel → fenêtre de contenu ouverte."
      ],
      apifyStatut: "✅ Scrape Apify (14/06/2026, hashtag #thailandtravel/#krabi). ⚠️ Contenu international RÉCENT à engagement modeste (vues non captées). Pour des références vraiment virales, scrape d'influenceurs Thaïlande ciblé (desktop) recommandé."
    },
    cadran: {
      forces: ["Combiné temples (Bangkok) + plages (Krabi/Phuket)", "Vol intérieur + croisière Chao Phraya inclus", "Qatar Airways + guide francophone", "Destination accessible et très désirable"],
      faiblesses: ["Pas de notoriété V21 sur la destination", "Prix concurrent inconnu", "Visa variable selon nationalité (à clarifier)", "Marché très concurrentiel à l'international"],
      ameliorer: ["Reel transition « temples → plages turquoise »", "Obtenir des prix concurrents", "Mettre en avant guide FR + croisière incluse", "Carrousel/Pinterest itinéraire 14 jours"]
    },
    contenu: {
      posts: [
        { visuel: "Krabi, longtail boat sur eau turquoise et falaises calcaires (vraie image)", accroche: "Bangkok le matin, les îles de Krabi l'après-midi. 🏝️", legende: "Exotic Thailand 14 jours — temples, croisière Chao Phraya, plages de Krabi & Phuket. Vols Qatar inclus, dès 26 900 DH. 📲 0661 24 70 49", hashtags: "#Voyages21 #Thailande #Krabi #Phuket", audio: "Tropical / afro-house douce, drop sur le plan plage." },
        { visuel: "Temple doré de Bangkok au coucher du soleil", accroche: "La Thaïlande des temples dorés. 🛕", legende: "Bangkok, ses marchés flottants et ses temples — puis le sud et ses eaux turquoise. Guide FR, dès 26 900 DH. 📲 0661 24 70 49", hashtags: "#Voyages21 #Thailande #Bangkok", audio: "Cinématique asiatique douce." }
      ],
      noteVisuels: "Lieux réels = vraies images. IA = inspiration.",
      planning: "Aspirationnel temples+plages, transitions virales, Pinterest itinéraire."
    },
    viral: {
      statut: "✅ Reels MA réels (format Asie) + exemples internationaux. ⚠️ International Thaïlande scrapé = RÉCENT, engagement modeste (vues non captées) — scrape d'influenceurs ciblé recommandé.",
      viralExamples: [
        { cat: "reel", origine: "🇲🇦 Maroc", titre: "Format circuit Asie premium", compte: "@terratour_voyages", lien: "https://www.instagram.com/p/DY62Ijgsjlw/", stat: "33 196 vues · 865 ❤️", pourquoi: "Modèle de reel « circuit Asie » (Japon) directement transposable à la Thaïlande." },
        { cat: "reel", origine: "🇲🇦 Maroc", titre: "Concurrent — combiné Asie (KL + Bali)", compte: "@follow_me_travel_", lien: "https://www.instagram.com/p/DZSz6w3TtLR/", stat: "4 694 vues · 148 ❤️", pourquoi: "Le combiné « 2-3 décors » se vend → V21 a Bangkok + Krabi + Phuket à monter pareil." },
        { cat: "reel", origine: "🇲🇦 Maroc", titre: "Reel Asie rythmé", compte: "@follow_me_travel_", lien: "https://www.instagram.com/p/DZWC40AznlA/", stat: "16 953 vues · 454 ❤️", pourquoi: "Montage multi-décors au beat, reach correct." },
        { cat: "ugc", origine: "🌍 Intl", titre: "UGC voyageuse — Thaïlande", compte: "@sweetiefernandes783", lien: "https://www.instagram.com/p/DZVVHA4SuM1/", stat: "❤️ 150 (vues non captées)", pourquoi: "Le meilleur UGC Thaïlande de l'échantillon : carnet de voyage à reproduire." },
        { cat: "ugc", origine: "🇮🇳 Inde", titre: "UGC voyageuse — Krabi/Phuket", compte: "@partolepaurnima", lien: "https://www.instagram.com/p/DZjsmCsimr1/", stat: "❤️ 63 (vues non captées)", pourquoi: "Marché émetteur indien massif → codes d'UGC plage à observer." },
        { cat: "ugc", origine: "🇮🇳 Inde", titre: "UGC — balade en Thaïlande", compte: "@walk_with_teesta", lien: "https://www.instagram.com/p/DZjt3FlCWAD/", stat: "❤️ 59 (vues non captées)", pourquoi: "Format « walk with me » immersif, réutilisable." },
        { cat: "intl", origine: "🇮🇳 Inde", titre: "Créateur voyage — Thaïlande", compte: "@rakshatsingh__", lien: "https://www.instagram.com/p/DZjqfqcmb3I/", stat: "❤️ 77 (vues non captées)", pourquoi: "Voyageur d'un autre marché émetteur : preuve de l'universalité du contenu plage." },
        { cat: "intl", origine: "🇮🇳 Inde", titre: "UGC — Thaïlande", compte: "@kash_khandelwal", lien: "https://www.instagram.com/p/DZjwaxsE711/", stat: "❤️ 32 (vues non captées)", pourquoi: "Format court « highlights du séjour » à transposer." },
        { cat: "intl", origine: "🌍 Intl", titre: "UGC voyageur — Thaïlande", compte: "@doctorsagardc", lien: "https://www.instagram.com/p/DZjpXrGTHo5/", stat: "❤️ 28 (vues non captées)", pourquoi: "Preuve de contenu spontané abondant → solliciter nos voyageurs pour de l'UGC." }
      ],
      pistes: ["Reel transition « temples → plages turquoise »", "Cost breakdown « 14 jours Thaïlande depuis Casa »", "Carrousel + Pinterest itinéraire Bangkok-Krabi-Phuket"],
      audio: [
        { style: "Tropical / afro-house", usage: "Plages Krabi/Phuket, transitions", lien: "https://pixabay.com/music/search/tropical/" },
        { style: "Cinématique asiatique", usage: "Temples Bangkok", lien: "https://pixabay.com/music/search/asian/" },
        { style: "🔥 Audio tendance IG", usage: "Levier de reach n°1", lien: "https://www.instagram.com/reels/audio/" }
      ],
      postsClesEnMain: [
        { titre: "Reel transition « temples → plages » (15-30s)", format: "Reel transition", lienCible: "https://www.instagram.com/p/DZSz6w3TtLR/", langues: "FR + darija", script: "Temple Bangkok (claquement) → whip → longtail boat Krabi. Texte « Bangkok + les îles, en 14 jours ». Carton « vols Qatar inclus · dès 26 900 DH ».", visuel: "Match-cut culture→plage, tropical, 9:16.", casting: "Aucun (B-roll).", tournage: "3-6 plans réels, CapCut.", cta: "« Lien en bio · départs août »", kpis: "Vues > 15 000 · saves > 100" },
        { titre: "★ Reel UGC voyageur Thaïlande (avec acteur) (60-90s)", format: "UGC authentique", lienCible: "https://www.instagram.com/p/DZVVHA4SuM1/", langues: "Darija + sous-titres FR", script: "Voyageur réel : Bangkok, marchés flottants, snorkeling Krabi → « guide FR, tout organisé ». B-roll de son séjour.", visuel: "Brut, vertical.", casting: "BRIEF : client réel V21 OU micro-créateur défrayé (mention partenariat). Jamais de faux témoignage.", tournage: "Smartphone + B-roll, droits signés.", cta: "« DM “THAILANDE” »", kpis: "Vues > 10 000 · DM qualifiés" }
      ]
    }
  },

  malaisiethai: {
    offres: [
      {
        titre: "Malaisie & Thaïlande — KL, Krabi & Phuket", badge: "Combiné 2 pays 5★", duree: "14 j / 11 nuits", prix: "dès 28 500 DH/pers",
        prixDetail: "À partir de 28 500 DH/pers", hotels: "5★", pension: "Repas mentionnés au programme",
        vols: "Inclus — Qatar Airways + vol intérieur KL–Krabi", volsHoraires: "Départs 31 juil-13 août · 05-18 août 2026",
        inclus: ["Vols Qatar Airways Casablanca–Kuala Lumpur", "Hôtels 5★", "Vol intérieur KL–Krabi", "Tours Petronas & Genting Highlands", "Guide"],
        exclus: ["Visa selon nationalité", "Pourboires", "Dépenses personnelles"],
        visites: "Kuala Lumpur (Petronas, Genting Highlands), plages de Krabi & Phuket",
        dates: "31 juil-13 août · 05-18 août 2026"
      }
    ],
    concurrents: {
      benchmarkTitre: "Benchmark Malaisie & Thaïlande (départ Maroc, vols inclus)",
      comptes: [
        { nom: "@follow_me_travel_", abonnes: "111 K", type: "Outgoing — CONCURRENT DIRECT", note: "Vend exactement le combiné « Kuala Lumpur + Bali / Singapore / Phuket » en reel → concurrent frontal sur ce produit" },
        { nom: "@terratour_voyages", abonnes: "75 K", type: "Outgoing — circuits Asie", note: "Format reel circuit Asie performant (33-40k vues)" },
        { nom: "@vacancia.ma", abonnes: "139 K", type: "Outgoing — lointains", note: "Bali/Asie en volume" },
        { nom: "▶ @voyages21maroc (NOUS)", abonnes: "petit · Meta Verified", type: "Notre compte", note: "Aucun contenu sur ce combiné" }
      ],
      benchmarkPrix: [
        { agence: "▶ Voyages21 (NOUS)", offre: "KL + Krabi + Phuket 5★", duree: "14j/11n", hotels: "5★", prix: "28 500 DH", verifie: true },
        { agence: "Concurrents MA (follow_me…)", offre: "Combiné Asie (prix non affiché en post)", duree: "—", hotels: "—", prix: "à demander", verifie: false }
      ],
      benchmarkAnalyse: [
        "Position : INDÉTERMINABLE sur la seule data — follow_me_travel vend le MÊME type de combiné « KL + … » mais n'affiche PAS de prix dans les reels scrapés (14/06).",
        "Seule donnée chiffrée = V21 28 500 DH (14j/11n, 5★, Qatar + vol intérieur).",
        "Conclusion (data seule) : le concurrent direct est identifié (follow_me) mais son prix manque → pas de comparaison chiffrée possible."
      ],
      learnings: [
        "follow_me_travel est le concurrent DIRECT (même combiné KL+plages) → étudier ses reels de près.",
        "Le combiné « ville moderne (Petronas) + plages (Krabi/Phuket) » est un fort contraste visuel pour le reel transition.",
        "Aucun prix concurrent affiché → V21 peut tester l'affichage transparent du prix comme différenciateur."
      ],
      apifyStatut: "✅ Scrape Apify (14/06/2026, hashtag #malaysiatravel/#kualalumpur + reels follow_me). ⚠️ International RÉCENT à faible engagement (vues non captées). Scrape d'influenceurs ciblé recommandé pour des références virales."
    },
    cadran: {
      forces: ["Combiné 2 pays (Malaisie + Thaïlande) en un seul voyage", "Tours Petronas + Genting + plages Krabi/Phuket", "5★ + vol intérieur inclus", "Fort contraste visuel ville/plage (idéal reel)"],
      faiblesses: ["Concurrent direct identifié (follow_me) déjà actif", "Pas de notoriété V21", "Prix concurrent inconnu", "Produit complexe à expliquer (2 pays)"],
      ameliorer: ["Reel transition « gratte-ciels KL → plages Krabi »", "Surclasser follow_me sur la qualité de prod", "Afficher le prix (transparence) comme test", "Carrousel itinéraire 2 pays"]
    },
    contenu: {
      posts: [
        { visuel: "Tours Petronas illuminées la nuit (vraie image)", accroche: "Kuala Lumpur la futuriste, puis les îles de la Thaïlande. 🌃🏝️", legende: "Malaisie & Thaïlande — KL, Krabi & Phuket, 14 jours 5★, vols Qatar inclus. Dès 28 500 DH/pers. 📲 0661 24 70 49", hashtags: "#Voyages21 #Malaisie #Thailande #KualaLumpur", audio: "Électro solaire / afro-house, drop sur Petronas." },
        { visuel: "Plage de Phuket, eau turquoise et longtail boats", accroche: "Deux pays, une seule envie : l'évasion. ✈️", legende: "Petronas, Genting, puis Krabi & Phuket. 5★, vol intérieur inclus. Dès 28 500 DH. 📲 0661 24 70 49", hashtags: "#Voyages21 #Phuket #Krabi", audio: "Tropical chill, transition ville→plage." }
      ],
      noteVisuels: "Lieux réels = vraies images. IA = inspiration.",
      planning: "Jouer le contraste ville/plage en reel transition + carrousel itinéraire."
    },
    viral: {
      statut: "✅ Reels MA réels (dont le concurrent direct follow_me) + exemples internationaux. ⚠️ International scrapé = RÉCENT, engagement modeste (vues non captées).",
      viralExamples: [
        { cat: "reel", origine: "🇲🇦 Maroc", titre: "★ Concurrent DIRECT — combiné KL + plages", compte: "@follow_me_travel_", lien: "https://www.instagram.com/p/DZSz6w3TtLR/", stat: "4 694 vues · 148 ❤️", pourquoi: "Exactement notre produit (KL + Bali/Singapore/Phuket). À surclasser sur la prod et l'offre." },
        { cat: "reel", origine: "🇲🇦 Maroc", titre: "Reel Asie rythmé (reach)", compte: "@follow_me_travel_", lien: "https://www.instagram.com/p/DZWC40AznlA/", stat: "16 953 vues · 454 ❤️", pourquoi: "Le format multi-décors au beat marche : à appliquer KL→Krabi→Phuket." },
        { cat: "reel", origine: "🇲🇦 Maroc", titre: "Format circuit Asie premium", compte: "@terratour_voyages", lien: "https://www.instagram.com/p/DY62Ijgsjlw/", stat: "33 196 vues · 865 ❤️", pourquoi: "Modèle « circuit Asie » bien filmé à viser." },
        { cat: "ugc", origine: "🌍 Intl", titre: "UGC voyageuse — KL/Malaisie", compte: "@spoorthy_nayak", lien: "https://www.instagram.com/p/DZicTZUEx5L/", stat: "❤️ 117 (vues non captées)", pourquoi: "Meilleur UGC Malaisie de l'échantillon : carnet de voyage à reproduire." },
        { cat: "ugc", origine: "🇮🇳 Inde", titre: "UGC voyageuse — Malaisie", compte: "@devanshi246", lien: "https://www.instagram.com/p/DZjVoIckvRU/", stat: "❤️ 43 (vues non captées)", pourquoi: "Marché émetteur indien → codes d'UGC à observer." },
        { cat: "ugc", origine: "🇹🇭 Thaïlande", titre: "UGC local — lifestyle", compte: "@milk_lakchaya", lien: "https://www.instagram.com/p/DZjetFRCYIm/", stat: "❤️ 13 (vues non captées)", pourquoi: "Créateur local : esthétique authentique à intégrer." },
        { cat: "intl", origine: "🇨🇳 Chine", titre: "UGC voyageuse — Malaisie", compte: "@rub_yyyyyyyyyy", lien: "https://www.instagram.com/p/DZjx4kkE7Ay/", stat: "❤️ 16 (vues non captées)", pourquoi: "Autre marché émetteur (Chine) : universalité du contenu." },
        { cat: "intl", origine: "🌍 Intl", titre: "Moments & Miles — voyage", compte: "@momentsandmiles__", lien: "https://www.instagram.com/p/DZjmLWrEWuA/", stat: "❤️ 5 (vues non captées)", pourquoi: "Compte « travel diary » : format storytelling réutilisable." },
        { cat: "intl", origine: "🌍 Intl", titre: "UGC voyageur — Malaisie", compte: "@andish27", lien: "https://www.instagram.com/p/DZjvij1l5eL/", stat: "❤️ 12 (vues non captées)", pourquoi: "Preuve de contenu spontané → solliciter nos voyageurs." }
      ],
      pistes: ["Reel transition « Petronas → plages Krabi »", "« 14 jours, 2 pays : le vrai budget depuis Casa »", "Carrousel itinéraire Malaisie + Thaïlande"],
      audio: [
        { style: "Électro solaire / afro-house", usage: "KL moderne, transitions", lien: "https://pixabay.com/music/search/afrobeat/" },
        { style: "Tropical chill", usage: "Plages Krabi/Phuket", lien: "https://pixabay.com/music/search/tropical/" },
        { style: "🔥 Audio tendance IG", usage: "Levier de reach n°1", lien: "https://www.instagram.com/reels/audio/" }
      ],
      postsClesEnMain: [
        { titre: "Reel transition « ville futuriste → plages » (15-30s)", format: "Reel transition", lienCible: "https://www.instagram.com/p/DZSz6w3TtLR/", langues: "FR + darija", script: "Petronas de nuit (claquement) → whip → plage Phuket. Texte « Malaisie + Thaïlande, 2 pays en 14 jours ». Carton « 5★ · vols inclus · dès 28 500 DH ».", visuel: "Match-cut ville→plage, 9:16.", casting: "Aucun (B-roll).", tournage: "3-6 plans réels, CapCut.", cta: "« Lien en bio · départs août »", kpis: "Vues > 15 000 · saves > 100" },
        { titre: "★ Reel UGC voyageur (avec acteur) (60-90s)", format: "UGC authentique", lienCible: "https://www.instagram.com/p/DZicTZUEx5L/", langues: "Darija + sous-titres FR", script: "Voyageur réel : Petronas, Genting, snorkeling Krabi → « 2 pays, tout organisé ». B-roll de son séjour.", visuel: "Brut, vertical.", casting: "BRIEF : client réel V21 OU micro-créateur défrayé (mention partenariat). Jamais de faux témoignage.", tournage: "Smartphone + B-roll, droits signés.", cta: "« DM “ASIE” »", kpis: "Vues > 10 000 · DM qualifiés" }
      ]
    }
  },

  chine: {
    offres: [
      {
        titre: "Circuit Chine — Pékin, Shanghai & Merveilles", badge: "Grand circuit 5★", duree: "14 j / 11 nuits", prix: "dès 29 900 DH/pers",
        prixDetail: "À partir de 29 900 DH/pers", hotels: "5★", pension: "Repas mentionnés au programme",
        vols: "Inclus — Qatar Airways", volsHoraires: "Départs 05-18 août · 12-25 août 2026 · guide francophone",
        inclus: ["Vols Qatar Airways Casablanca–Pékin / Shanghai–Casablanca", "Hôtels 5★", "Visites au programme", "Guide francophone"],
        exclus: ["Visa chinois (600 DH)", "Pourboires (≈ 40 $)", "Dépenses personnelles"],
        visites: "Pékin (Cité interdite, Grande Muraille, Temple du Ciel), Nanjing, Suzhou, Hangzhou (Lac de l'Ouest), Shanghai, Shenzhen",
        dates: "05-18 août · 12-25 août 2026"
      }
    ],
    concurrents: {
      benchmarkTitre: "Benchmark Chine (départ Maroc, vols inclus)",
      comptes: [
        { nom: "@terratour_voyages", abonnes: "75 K", type: "Outgoing — circuits Asie premium", note: "Vend Japon/Vietnam en reel (33-40k vues). Même logique « grand circuit » applicable à la Chine" },
        { nom: "@follow_me_travel_", abonnes: "111 K", type: "Outgoing — Asie", note: "Combinés Asie actifs" },
        { nom: "@vacancia.ma", abonnes: "139 K", type: "Outgoing — lointains", note: "Asie en volume" },
        { nom: "▶ @voyages21maroc (NOUS)", abonnes: "petit · Meta Verified", type: "Notre compte", note: "Aucun contenu Chine" }
      ],
      benchmarkPrix: [
        { agence: "▶ Voyages21 (NOUS)", offre: "Pékin + Shanghai + merveilles 5★", duree: "14j/11n", hotels: "5★", prix: "29 900 DH", verifie: true },
        { agence: "Concurrents MA", offre: "Chine (prix non affiché en post)", duree: "—", hotels: "—", prix: "à demander", verifie: false }
      ],
      benchmarkAnalyse: [
        "Position : INDÉTERMINABLE sur la seule data — aucun prix concurrent Chine capté au scrape du 14/06.",
        "Seule donnée chiffrée = V21 29 900 DH (14j/11n, 5★, Qatar, guide FR).",
        "Conclusion (data seule) : comparaison impossible sans prix concurrent."
      ],
      learnings: [
        "La Chine est un circuit « bucket-list » (Grande Muraille) → fort potentiel aspirationnel mais cible CSP+ étroite.",
        "Peu de concurrents MA communiquent la Chine en reel → fenêtre de contenu ouverte.",
        "Les créateurs chinois/asiatiques produisent une esthétique forte (villes futuristes, traditions) à observer."
      ],
      apifyStatut: "✅ Scrape Apify (14/06/2026, hashtag #chinatravel/#beijing). ⚠️ International RÉCENT à engagement modeste (vues non captées). Scrape d'influenceurs ciblé recommandé."
    },
    cadran: {
      forces: ["Grand circuit complet Pékin→Shanghai (Grande Muraille, Cité interdite)", "Hôtels 5★ + guide francophone", "Vols Qatar Airways", "Destination « bucket-list » iconique"],
      faiblesses: ["Prix élevé (29 900) → cible CSP+ étroite", "Visa chinois requis (à anticiper)", "Aucune notoriété V21", "Prix concurrent inconnu"],
      ameliorer: ["Reel « contraste » Grande Muraille → skyline Shanghai", "Communiquer la prise en charge visa", "Mettre en avant le guide FR (rassure sur la barrière de langue)", "Carrousel itinéraire 14 jours"]
    },
    contenu: {
      posts: [
        { visuel: "La Grande Muraille de Chine serpentant sur les crêtes (vraie image)", accroche: "Marcher sur la Grande Muraille. 🧱 Puis dîner face au skyline de Shanghai.", legende: "Circuit Chine 14 jours 5★ — Pékin, Cité interdite, Grande Muraille, Shanghai. Vols Qatar + guide FR. Dès 29 900 DH. 📲 0661 24 70 49", hashtags: "#Voyages21 #Chine #GrandeMuraille #Shanghai", audio: "Orchestral épique sur la Muraille, puis électro sur Shanghai." },
        { visuel: "Skyline de Shanghai (Pudong) illuminé la nuit", accroche: "L'empire millénaire ET la Chine de demain. 🌆", legende: "De la Cité interdite aux gratte-ciels de Shanghai, en 14 jours 5★. Guide FR. Dès 29 900 DH. 📲 0661 24 70 49", hashtags: "#Voyages21 #Chine #Shanghai #Pekin", audio: "Cinématique asiatique → drop électro futuriste." }
      ],
      noteVisuels: "Lieux réels = vraies images. IA = inspiration.",
      planning: "Aspirationnel « empire + modernité », contraste visuel fort en reel."
    },
    viral: {
      statut: "✅ Reels MA réels (format circuit Asie) + exemples internationaux. ⚠️ International Chine scrapé = RÉCENT, engagement modeste (vues non captées) — scrape d'influenceurs ciblé recommandé.",
      viralExamples: [
        { cat: "reel", origine: "🇲🇦 Maroc", titre: "Format circuit Asie premium (Japon)", compte: "@terratour_voyages", lien: "https://www.instagram.com/p/DY62Ijgsjlw/", stat: "33 196 vues · 865 ❤️", pourquoi: "Modèle « grand circuit Asie » bien filmé, directement transposable à la Chine." },
        { cat: "reel", origine: "🇲🇦 Maroc", titre: "Reel Vietnam (preuve Asie qui scale)", compte: "@terratour_voyages", lien: "https://www.instagram.com/p/DZKRrxNszhZ/", stat: "40 477 vues · 1 141 ❤️", pourquoi: "Preuve que l'Asie lointaine se vend en reel MA → appliquer à la Chine." },
        { cat: "reel", origine: "🇲🇦 Maroc", titre: "Reel Asie rythmé", compte: "@follow_me_travel_", lien: "https://www.instagram.com/p/DZWC40AznlA/", stat: "16 953 vues · 454 ❤️", pourquoi: "Montage multi-décors au beat : Muraille → Shanghai." },
        { cat: "ugc", origine: "🇨🇳 Chine", titre: "★ Créatrice locale — Chine", compte: "@veny_liew", lien: "https://www.instagram.com/p/DZjpfPOEXeQ/", stat: "❤️ 525 (vues non captées)", pourquoi: "Meilleur UGC Chine de l'échantillon : esthétique locale authentique à reproduire." },
        { cat: "ugc", origine: "🇨🇳 Chine", titre: "UGC voyageur — Chine", compte: "@wenbo.qi", lien: "https://www.instagram.com/p/DZjrIVvCCim/", stat: "❤️ 13 (vues non captées)", pourquoi: "Regard local sur les villes : direction artistique premium." },
        { cat: "ugc", origine: "🌍 Intl", titre: "UGC voyageuse — Chine", compte: "@cha_jense", lien: "https://www.instagram.com/p/DZjw9EDjczp/", stat: "❤️ 30 (vues non captées)", pourquoi: "Carnet de voyage étranger : format storytelling à transposer." },
        { cat: "intl", origine: "🇮🇷 Iran", titre: "Créateur voyage — Chine", compte: "@alireza.akhlaghi.official", lien: "https://www.instagram.com/p/DZjtI6SjcGS/", stat: "❤️ 11 (vues non captées)", pourquoi: "Autre marché émetteur : universalité du contenu « grandes merveilles »." },
        { cat: "intl", origine: "🌍 Intl", titre: "UGC voyageuse — Chine", compte: "@mrrgl8", lien: "https://www.instagram.com/p/DZjqPwVjfq0/", stat: "❤️ 14 (vues non captées)", pourquoi: "Format court « highlights » réutilisable." },
        { cat: "intl", origine: "🌍 Intl", titre: "UGC — Chine", compte: "@b1nasoul", lien: "https://www.instagram.com/p/DZjzWVaksbo/", stat: "❤️ 9 (vues non captées)", pourquoi: "Preuve de contenu spontané → solliciter nos voyageurs CSP+." }
      ],
      pistes: ["Reel contraste « Grande Muraille → skyline Shanghai »", "« Visa Chine : on s'occupe de tout » (explainer)", "Carrousel itinéraire 14 jours Pékin-Shanghai"],
      audio: [
        { style: "Orchestral épique", usage: "Grande Muraille, monuments", lien: "https://pixabay.com/music/search/cinematic/" },
        { style: "Cinématique asiatique / électro futuriste", usage: "Shanghai moderne", lien: "https://pixabay.com/music/search/asian/" },
        { style: "🔥 Audio tendance IG", usage: "Levier de reach n°1", lien: "https://www.instagram.com/reels/audio/" }
      ],
      postsClesEnMain: [
        { titre: "Reel contraste « empire → modernité » (15-30s)", format: "Reel transition", lienCible: "https://www.instagram.com/p/DY62Ijgsjlw/", langues: "FR + darija", script: "Grande Muraille (orchestral, claquement) → whip → skyline Shanghai (électro). Texte « la Chine d'hier ET de demain ». Carton « 5★ · guide FR · dès 29 900 DH ».", visuel: "Match-cut tradition→futur, 9:16.", casting: "Aucun (B-roll).", tournage: "3-6 plans réels, CapCut.", cta: "« Lien en bio · départs août »", kpis: "Vues > 12 000 · saves > 80" },
        { titre: "★ Reel UGC voyageur Chine (avec acteur) (60-90s)", format: "UGC authentique", lienCible: "https://www.instagram.com/p/DZjpfPOEXeQ/", langues: "Darija + sous-titres FR", script: "Voyageur réel : Muraille, Cité interdite, Shanghai → « guide FR, visa géré, tout organisé ». B-roll de son voyage.", visuel: "Brut, vertical.", casting: "BRIEF : client réel V21 OU micro-créateur défrayé (mention partenariat). Jamais de faux témoignage.", tournage: "Smartphone + B-roll, droits signés.", cta: "« DM “CHINE” »", kpis: "Vues > 8 000 · DM qualifiés CSP+" }
      ]
    }
  },

  ouzbekistan: {
    offres: [
      {
        titre: "Ouzbékistan — Route de la Soie", badge: "Circuit culturel · guide FR", duree: "10 j / 9 nuits", prix: "dès 15 700 DH/pers",
        prixDetail: "Double 3★ 15 700 (suppl. single 3 500) · Double 4★ 17 400 (suppl. single 3 850)", hotels: "3★ ou 4★ selon formule",
        pension: "Pension complète sauf repas libres", vols: "⚠️ NON INCLUS (à ajouter)", volsHoraires: "Départs 14/07 · 04/08 · 01/09 · 06/10 · 13/10/2026 · guide francophone",
        inclus: ["Hôtels mentionnés", "Transport privé climatisé", "Train rapide Afrosiyob Tachkent–Samarkand", "Droits d'entrée des sites", "Guide local francophone", "Pension complète (sauf repas libres)"],
        exclus: ["Vols internationaux", "Vol domestique Ourguentch–Tachkent", "e-visa (≈ 20-30 €)", "Pourboires, boissons, assurance"],
        visites: "Tachkent, Samarkand (Régistan), désert du Kyzylkoum (yourtes), Boukhara, Khiva (Ichan Kala UNESCO)",
        dates: "14/07 · 04/08 · 01/09 · 06/10 · 13/10/2026"
      }
    ],
    concurrents: {
      benchmarkTitre: "Benchmark Ouzbékistan (départ Maroc — ⚠️ vols NON inclus)",
      comptes: [
        { nom: "@terratour_voyages", abonnes: "75 K", type: "Outgoing — circuits culturels", note: "Format reel « circuit + dates » performant (Croatie 71k, Vietnam 40k). Logique transposable à la Route de la Soie" },
        { nom: "@vacancia.ma / @follow_me_travel_", abonnes: "139K / 111K", type: "Outgoing — lointains", note: "Ouzbékistan non vu dans les feeds récents → destination de niche" },
        { nom: "▶ @voyages21maroc (NOUS)", abonnes: "petit · Meta Verified", type: "Notre compte", note: "Aucun contenu Ouzbékistan" }
      ],
      benchmarkPrix: [
        { agence: "▶ Voyages21 (NOUS)", offre: "Route de la Soie 3★ (hors vols)", duree: "10j/9n", hotels: "3★", prix: "15 700 DH", verifie: true },
        { agence: "▶ Voyages21 (NOUS)", offre: "Route de la Soie 4★ (hors vols)", duree: "10j/9n", hotels: "4★", prix: "17 400 DH", verifie: true },
        { agence: "Concurrents MA", offre: "Ouzbékistan (offre rare, prix non publié)", duree: "—", hotels: "—", prix: "à demander", verifie: false }
      ],
      benchmarkAnalyse: [
        "Position : INDÉTERMINABLE sur la seule data — aucun prix concurrent Ouzbékistan capté (destination de niche, absente des feeds MA scrapés le 14/06).",
        "⚠️ Point clé visible dans la data : le prix V21 (15 700/17 400) est HORS VOLS — toute comparaison devra réintégrer le coût du vol pour être honnête.",
        "Conclusion (data seule) : pas de comparaison possible ; en plus, l'absence de vol dans le prix interdit toute lecture brute du tarif vs des offres « vols inclus »."
      ],
      learnings: [
        "Ouzbékistan = niche culturelle (Route de la Soie) → demande à créer, cible voyageurs cultivés.",
        "Atout visuel énorme : Régistan, cités bleues, yourtes, Khiva → matière à reels « pépite méconnue ».",
        "⚠️ Prix hors vols : à communiquer clairement pour éviter toute déception (transparence)."
      ],
      apifyStatut: "✅ Scrape Apify (14/06/2026, hashtag #uzbekistan/#samarkand). ⚠️ International RÉCENT à engagement modeste (vues non captées) ; aucun concurrent MA capté. Scrape d'influenceurs « Asie centrale » ciblé recommandé."
    },
    cadran: {
      forces: ["Circuit Route de la Soie complet avec guide francophone", "Train rapide Afrosiyob + nuit en yourtes (expérience)", "4 cités majeures (Samarkand, Boukhara, Khiva UNESCO)", "Esthétique unique (cités bleues) très « instagrammable »"],
      faiblesses: ["⚠️ VOLS NON INCLUS → prix d'appel trompeur si mal communiqué", "Destination de niche, notoriété faible", "Demande à créer (peu de recherche spontanée)", "Aucun repère prix concurrent"],
      ameliorer: ["Communiquer CLAIREMENT « hors vols » + proposer un package vol", "Reels « pépite méconnue » (Régistan, cités bleues)", "Cibler une audience cultivée (Pinterest, carrousels histoire)", "Mettre en avant guide FR + expérience yourtes"]
    },
    contenu: {
      posts: [
        { visuel: "Le Régistan de Samarkand, médersas aux mosaïques bleues (vraie image)", accroche: "Samarkand, la perle de la Route de la Soie. 🕌 Des mosaïques bleues à couper le souffle.", legende: "Ouzbékistan 10 jours, guide francophone — Samarkand, Boukhara, Khiva. À partir de 15 700 DH/pers (hors vols). 📲 0661 24 70 49", hashtags: "#Voyages21 #Ouzbekistan #Samarkand #RouteDeLaSoie", audio: "Musique d'Asie centrale (cordes + percussions), ambiance épique douce." },
        { visuel: "Nuit en camp de yourtes dans le désert du Kyzylkoum, ciel étoilé", accroche: "Une nuit sous les étoiles, en yourte. ✨ L'Ouzbékistan hors des sentiers.", legende: "Cités bleues, désert, artisanat — la Route de la Soie en 10 jours, guide FR. Dès 15 700 DH (hors vols). 📲 0661 24 70 49", hashtags: "#Voyages21 #Ouzbekistan #Yourte #Kyzylkoum", audio: "Ambiance contemplative, instruments traditionnels." }
      ],
      noteVisuels: "Lieux réels = vraies images. IA = inspiration. ⚠️ Toujours préciser « hors vols » dans les posts prix.",
      planning: "Niche cultivée : Pinterest + carrousels histoire + reels « pépite méconnue »."
    },
    viral: {
      statut: "✅ Reels MA réels (format circuit) + exemples internationaux. ⚠️ International Ouzbékistan scrapé = RÉCENT, engagement modeste (vues non captées) ; destination de niche → scrape d'influenceurs « Asie centrale » ciblé recommandé.",
      viralExamples: [
        { cat: "reel", origine: "🇲🇦 Maroc", titre: "Format « circuit + dates + places limitées »", compte: "@terratour_voyages", lien: "https://www.instagram.com/p/DX9xEMlMHjW/", stat: "71 551 vues · 1 888 ❤️", pourquoi: "Le squelette de reel le plus efficace du marché MA (Croatie) → l'appliquer à la Route de la Soie." },
        { cat: "reel", origine: "🇲🇦 Maroc", titre: "Format circuit Asie premium", compte: "@terratour_voyages", lien: "https://www.instagram.com/p/DY62Ijgsjlw/", stat: "33 196 vues · 865 ❤️", pourquoi: "Modèle « circuit culturel » bien filmé à viser pour l'Ouzbékistan." },
        { cat: "reel", origine: "🇲🇦 Maroc", titre: "Reel Asie rythmé (reach)", compte: "@follow_me_travel_", lien: "https://www.instagram.com/p/DZWC40AznlA/", stat: "16 953 vues · 454 ❤️", pourquoi: "Montage multi-décors au beat : Tachkent → Samarkand → Khiva." },
        { cat: "ugc", origine: "🇺🇿 Ouzbékistan", titre: "★ Créateur local — Ouzbékistan", compte: "@iamshakhjakhan", lien: "https://www.instagram.com/p/DZjKeWAglOe/", stat: "❤️ 96 (vues non captées)", pourquoi: "Créateur local : l'esthétique authentique des cités bleues à reproduire." },
        { cat: "ugc", origine: "🌏 Indonésie", titre: "UGC expat — « Kehidupan Bule »", compte: "@jenny_fed", lien: "https://www.instagram.com/p/DZjkLWOiPIb/", stat: "❤️ 145 (vues non captées)", pourquoi: "Meilleur UGC de l'échantillon : format « expat découvre » très partageable." },
        { cat: "ugc", origine: "🇫🇷 France", titre: "UGC — « les chemins de Marie »", compte: "@marie_le_chemin", lien: "https://www.instagram.com/p/DZjZlVlMYFr/", stat: "❤️ 18 (vues non captées)", pourquoi: "Créatrice FR « slow travel » : ton carnet de route à reproduire pour une cible cultivée." },
        { cat: "intl", origine: "🇰🇷 Corée", titre: "Créateur voyage — Ouzbékistan", compte: "@chaeryeon85", lien: "https://www.instagram.com/p/BXj8LpPAyWO/", stat: "❤️ 60 (vues non captées)", pourquoi: "Marché émetteur asiatique : preuve de la désirabilité internationale de la destination." },
        { cat: "intl", origine: "🇯🇵 Japon", titre: "UGC voyageur — Asie centrale", compte: "@hanpen_p", lien: "https://www.instagram.com/p/DZii7ulEzBY/", stat: "❤️ 28 (vues non captées)", pourquoi: "Voyageur japonais : esthétique soignée à observer." },
        { cat: "intl", origine: "🌍 Intl", titre: "Urbex / esthétique — Ouzbékistan", compte: "@unforgiving.urban", lien: "https://www.instagram.com/p/DZjKfjztSRd/", stat: "❤️ 35 (vues non captées)", pourquoi: "Direction artistique forte (architecture) pour se différencier des promos." }
      ],
      pistes: ["Reel « pépite méconnue » Régistan/cités bleues", "Reel « nuit en yourte sous les étoiles »", "Carrousel + Pinterest « itinéraire Route de la Soie » (cible cultivée)"],
      audio: [
        { style: "Musique d'Asie centrale / ethnique", usage: "Samarkand, Khiva, désert", lien: "https://pixabay.com/music/search/ethnic/" },
        { style: "Cinématique contemplative", usage: "Yourtes, paysages", lien: "https://pixabay.com/music/search/cinematic/" },
        { style: "🔥 Audio tendance IG", usage: "Levier de reach n°1", lien: "https://www.instagram.com/reels/audio/" }
      ],
      postsClesEnMain: [
        { titre: "Reel « pépite méconnue » Samarkand (15-30s)", format: "Reel découverte", lienCible: "https://www.instagram.com/p/DX9xEMlMHjW/", langues: "FR + darija", script: "HOOK « Tu connais Samarkand ? » → travelling sur les mosaïques bleues du Régistan → yourtes étoilées. Carton « Route de la Soie · guide FR · dès 15 700 DH (hors vols) ».", visuel: "Plans amples cités bleues, musique Asie centrale, 9:16.", casting: "Aucun (B-roll).", tournage: "3-6 plans réels, CapCut. ⚠️ Préciser « hors vols ».", cta: "« Lien en bio · départs juil→oct »", kpis: "Vues > 12 000 · saves > 120 (fort potentiel save sur la niche)" },
        { titre: "★ Reel UGC voyageur Ouzbékistan (avec acteur) (60-90s)", format: "UGC authentique", lienCible: "https://www.instagram.com/p/DZjkLWOiPIb/", langues: "Darija + sous-titres FR", script: "Voyageur réel : Régistan, train Afrosiyob, nuit en yourte → « guide FR, pépite méconnue ». B-roll de son voyage.", visuel: "Brut, vertical.", casting: "BRIEF : client réel V21 OU micro-créateur défrayé (mention partenariat). Jamais de faux témoignage.", tournage: "Smartphone + B-roll, droits signés.", cta: "« DM “OUZBEKISTAN” »", kpis: "Vues > 8 000 · saves · DM qualifiés" }
      ]
    }
  },

  // STRATÉGIE RÉSEAUX (commune aux produits) — même contenu, codes par plateforme
  reseaux: {
    intro: "Règle d'or : on produit le contenu UNE fois (reel/carrousel), puis on le DÉCLINE selon les codes de chaque réseau. 4 publications/semaine pour démarrer (mardi 18h30, jeudi 18h30, samedi 11h, dimanche 18h30, heure Maroc).",
    plateformes: [
      { nom: "📸 Instagram", compte: "@voyages21maroc (Meta Verified)", role: "Vitrine n°1 — Reels pour le reach, carrousels pour le save, stories pour la conversion (lien WhatsApp).", codes: ["Reel 9:16, hook < 3s, audio TENDANCE (pas banque libre)", "Carrousels itinéraires/prix = sauvegardes", "Stories quotidiennes + stickers lien WhatsApp + sondages", "Highlights par destination (Égypte, Turquie, Omra)", "3-5 hashtags max, géolocalisation Maroc"], cadence: "4 reels + stories quotidiennes", kpi: "Vues, saves, DM" },
      { nom: "👍 Facebook", compte: "« Voyages Maroc » → ⚠️ convertir en PAGE PRO (requis ads)", role: "Audience plus âgée/MRE, fort pour les offres détaillées et le partage familial. Canal n°1 pour les ads Meta.", codes: ["Mêmes reels qu'IG (cross-post) + posts liens vers fiches voyages", "Texte plus long OK (audience lit les détails prix/programme)", "Groupes/communautés voyage Maroc", "Posts partageables (familles taguent)", "Indispensable : Page pro pour le Gestionnaire de pub"], cadence: "4 posts/sem + reels cross-postés", kpi: "Portée, clics site, messages" },
      { nom: "🎵 TikTok", compte: "@voyages.maroc (73 abonnés — à rebrander)", role: "Reach froid maximal, audience jeune. Le reel brut performe mieux que le léché.", codes: ["Vertical brut, audio tendance TikTok (≠ tendances IG)", "Hook parlé dès la 1re seconde, sous-titres", "Tester 1 même reel sur IG ET TikTok (tendances différentes)", "Séries « Jour X/10 en Égypte » (fidélise)", "Pas de watermark IG (pénalisé)"], cadence: "3-4 vidéos/sem", kpi: "Vues, taux de complétion, abonnés" },
      { nom: "👻 Snapchat", compte: "à créer (phase 3 / si budget ads)", role: "Très fort au Maroc chez les 16-30 ans. Pertinent surtout en ADS géolocalisées (Casa, Rabat, Marrakech) plus qu'en organique.", codes: ["Format vertical plein écran, très direct", "Snap Ads géolocalisées Maroc = le vrai usage", "Ton spontané, offres flash / « dernières places »", "Public Profile + Spotlight pour l'organique"], cadence: "Phase ads d'abord (organique léger)", kpi: "Swipe-up, coût/lead" },
      { nom: "📌 Pinterest", compte: "à activer (Business + Rich Pins)", role: "Moteur de recherche, pas un réseau social. Trafic LONG terme vers voyages21.com (durée de vie 3-6 mois/épingle).", codes: ["Vertical 1000×1500, le TEXTE sur image = le hook", "Boards keyword-first (« Circuit Égypte 10 jours », « Croisière Nil »)", "Descriptions ≤ 500 car., PAS de hashtags en 2026", "5-10 épingles/jour, publier 45-90j avant la saison", "Rich Pins + domaine voyages21 vérifié"], cadence: "5-10 épingles/jour (recyclage carrousels)", kpi: "Vues d'épingles, clics site, SEO" }
    ]
  },

  // 6) ESPACE QUESTIONS DE CLAUDE → réponses de Karim attendues
  questions: [
    { q: "Décision PRIX Caire & Sharm : tenir 19 600 (vendre le 5★ nommé), baisser ~17 900–18 500, ou ne pas afficher de prix ?", statut: "en attente" },
    { q: "Quels sont les HORAIRES DE VOL réels de l'offre Caire & Sharm (arrivée J1 tôt ou tard) ?", statut: "en attente" },
    { q: "Apify : ✅ RÉSOLU — scrape désormais AUTONOME via l'API REST (token APIFY_TOKEN dans l'env). Plus besoin d'approuver à la main. Veille élargie 8 comptes + engagement réel intégrés le 14/06.", statut: "résolu" },
    { q: "Pour générer les visuels Higgsfield (crédits OK : 466), ouvres-tu la session depuis un client qui permet d'approuver l'action ?", statut: "en attente" },
    { q: "Identifiants YouTube/Snapchat/LinkedIn + conversion du Facebook en Page pro : où en est-on ?", statut: "en attente" }
  ]
};
