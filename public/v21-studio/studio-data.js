/* V21 STUDIO — données de la plateforme (source unique, mise à jour par Claude
   à chaque session V21 STUDIO ; Vercel redéploie automatiquement).
   Contenant = index.html · Contenu = ce fichier. */
window.V21_STUDIO = {
  meta: {
    version: "v1",
    maj: "13/06/2026",
    note: "Plateforme de pilotage contenu Voyages21 — partageable avec les équipes."
  },

  // Sélecteur de produit (ascenseur). 'pret' = données complètes.
  produits: [
    { id: "egypte", label: "🇪🇬 Égypte (outgoing)", etat: "pret" },
    { id: "turquie", label: "🇹🇷 Turquie (outgoing)", etat: "pret" },
    { id: "omra", label: "🕋 Omra", etat: "preparation" }
  ],

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

    // 2) VEILLE CONCURRENTS — comptes ciblés (données vérifiées 13/06/2026)
    concurrents: {
      comptes: [
        { nom: "@vacancia.ma", abonnes: "139 K", type: "Outgoing — concurrent Égypte n°1", note: "Discount/volume, croisière Nil confirmée, ton darija" },
        { nom: "@yaallatour", abonnes: "47 K", type: "Outgoing", note: "Le Caire 12j affiché, ton familial" },
        { nom: "@simplymorocco", abonnes: "478 K", type: "INCOMING (Maroc only)", note: "Benchmark de contenu, PAS concurrent commercial" },
        { nom: "@qafilat.tayba", abonnes: "9,5 K", type: "Outgoing Omra/Hajj", note: "Audience religieuse, pas d'Égypte loisirs" }
      ],
      // Benchmark prix Égypte (Caire+Sharm / Hurghada / croisière), départ Maroc, vols inclus
      benchmarkPrix: [
        { agence: "Olé Voyages", offre: "Caire + croisière + Hurghada", duree: "~11j", hotels: "nd", prix: "15 500 DH", verifie: false },
        { agence: "AjiNsafro", offre: "Caire + Sharm (comparable direct)", duree: "10j/9n", hotels: "5★ (3n+6n AI)", prix: "16 700 DH", verifie: true },
        { agence: "Al Hassania", offre: "Grand Tour Caire+Hurghada+Sharm", duree: "14j/13n", hotels: "5★", prix: "16 900 DH", verifie: false },
        { agence: "Vacancia", offre: "Caire + Hurghada", duree: "10j/9n", hotels: "4★ AI", prix: "17 500 DH", verifie: false },
        { agence: "ESF", offre: "Caire + croisière Nil + Hurghada", duree: "nd", hotels: "5★ + croisière 5★", prix: "17 900 DH", verifie: false },
        { agence: "AjiNsafro", offre: "Caire + croisière + Hurghada", duree: "12j/11n", hotels: "5★", prix: "18 700 DH", verifie: true },
        { agence: "Galaxy Voyage", offre: "Caire + Sharm (structure identique V21)", duree: "11j/10n", hotels: "5★", prix: "non publié", verifie: false }
      ],
      apifyStatut: "⚠️ Engagement réel PARTIEL : le run Apify lu (SrzMu16Ph9KxYWV74) couvrait @qafilat.tayba (Omra/Hajj — témoignages « shahadat » 1,5-6k vues, 15-135 likes ; combiné Omra+Istanbul 04-18 août 2026 affiché). Les posts ÉGYPTE de Vacancia ne sont pas dans cet échantillon (feed récent = Turquie). → Pour l'engagement Égypte de Vacancia : lire le run « 72 résultats » ou relancer un scrape ciblé Égypte (donne-moi l'ID du run)."
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

    // 5) INSPIRATION VIRALE (web global + France + Pinterest) — recherche 13/06/2026
    viral: {
      statut: "✅ Recherche virale réalisée (sources : Later, Sprout Social, W3Era Pinterest, Soundverse… juin 2026). Détail complet : content-studio/veille-virale.md. Stats externes = indicatives.",
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
      audio: [
        "Cinématique oriental fusion (cordes + tabla, builds) — B-rolls pyramides/Nil [dominant]",
        "Ambient oriental doux (oud/nay) — day-in-life, croisière contemplative",
        "Pop électronique arabisante (maqam + EDM) — transitions Sharm/mer Rouge",
        "Orchestral épique — intro choc Gizeh/Karnak/Abou Simbel",
        "Lo-fi travel / bossa douce — slow travel (petit-déj bateau, souk le soir)",
        "Sound design / ASMR (muezzin, eau sur la coque) — pattern interrupt en ouverture",
        "Afrobeat/afropop fusion — contenus festifs (snorkeling, beach Dahab)"
      ],
      postsClesEnMain: [
        { titre: "Reel POV arrivée Caire (45-60s)", detail: "Révélation des pyramides au coucher de soleil. Audio cinématique oriental qui climaxe à l'apparition. CTA : programme Caire+Nil+Mer Rouge." },
        { titre: "Reel « 5 erreurs croisière Nil » (60-90s)", detail: "Format liste expert (éviter août, dahabeya privée, Abou Simbel tôt, Kom Ombo/Edfou, guide FR). Fort taux de sauvegarde + positionnement référence." },
        { titre: "Carrousel + épingles « Itinéraire 10 jours »", detail: "Double usage Instagram (10 slides) + Pinterest (1 épingle/jour). Le format le plus sauvegardé, durée de vie 3-6 mois." },
        { titre: "Reel transition « 3 destinations, 1 voyage » (15-30s)", detail: "Pyramides→Nil→mer Rouge, transitions au beat. Ancrage « depuis Casablanca » pour la cible MA outgoing." },
        { titre: "Reel témoignage Karim expert (60-90s)", detail: "Talking head, 3 conseils d'insider, 25 ans d'expertise. Format anti-IA qui monte en 2026, construit la confiance d'achat premium." }
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
      comptes: [
        { nom: "@vacancia.ma", abonnes: "139 K", type: "Outgoing — Turquie phare", note: "Page Turquie dédiée, Istanbul/Antalya en volume" },
        { nom: "@msm_voyages", abonnes: "121 K", type: "Outgoing", note: "Turquie + Omra+Istanbul combinés" },
        { nom: "@follow_me_travel_", abonnes: "111 K", type: "Outgoing", note: "Turquie active" },
        { nom: "@yaallatour", abonnes: "47 K", type: "Outgoing", note: "Istanbul 8j affiché" }
      ],
      benchmarkPrix: [
        { agence: "Vacancia (vol direct Marrakech, Turkish Airlines)", offre: "Combo Istanbul + Antalya", duree: "—", hotels: "—", prix: "13 900 DH", verifie: true },
        { agence: "Vacancia", offre: "Antalya (séjour)", duree: "—", hotels: "—", prix: "15 900 DH", verifie: true },
        { agence: "Vacancia", offre: "Circuit Antalya + Marmaris + Fethiye", duree: "—", hotels: "—", prix: "15 900 DH", verifie: true }
      ],
      apifyStatut: "✅ Engagement réel récupéré via Apify (run SrzMu16Ph9KxYWV74, 13/06/2026). Prix Vacancia ci-dessus = réels (vol direct Marrakech). Pour benchmark hôtels/durée détaillé, relancer un scrape ciblé.",
      engagementReel: [
        { compte: "@vacancia.ma", format: "Reel Istanbul (audio original)", vues: "203 646", likes: "547", comm: "33" },
        { compte: "@vacancia.ma", format: "Reel Istanbul + Bali", vues: "157 018", likes: "386", comm: "14" },
        { compte: "@vacancia.ma", format: "Carrousel « Earlybooking dès 19 900 DH, 10× sans frais »", vues: "—", likes: "703", comm: "14" },
        { compte: "@vacancia.ma", format: "Reel Antalya", vues: "25 078", likes: "114", comm: "18" },
        { compte: "@maroua_merzouqui (influenceuse → Vacancia)", format: "UGC partenariat", vues: "41 070", likes: "1 291", comm: "13" }
      ],
      learnings: [
        "Le format qui scale = Reel court « destination + numéro de résa » en audio original (jusqu'à 200k vues) — prod simple, pas léchée",
        "Like-rate faible mais reach énorme : le volume vient des VUES, pas des likes",
        "Carrousels « prix choc dès X DH + paiement 10× sans frais » = plus de likes (703)",
        "Vacancia active des influenceuses (UGC) → @maroua 41k vues, 1 291 likes",
        "Argument martelé : VOL DIRECT Marrakech (Turkish Airlines) — V21 peut en faire autant"
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
    viral: {
      statut: "Même playbook que l'Égypte, adapté Turquie (détail : content-studio/veille-virale.md).",
      pistes: [
        "POV première personne — « POV : ton 1er matin sur le Bosphore »",
        "Transition tenue/lieu — Istanbul historique → plage Bodrum/Antalya (format viral combiné)",
        "Cost breakdown — « 8 jours Turquie tout compris depuis Casa, le vrai budget »",
        "« 5 erreurs à éviter pour un combiné Istanbul + plage »",
        "Hidden gems — Îles des Princesses, quartiers de Balat, Cappadoce en extension"
      ]
    }
  },

  // 6) ESPACE QUESTIONS DE CLAUDE → réponses de Karim attendues
  questions: [
    { q: "Décision PRIX Caire & Sharm : tenir 19 600 (vendre le 5★ nommé), baisser ~17 900–18 500, ou ne pas afficher de prix ?", statut: "en attente" },
    { q: "Quels sont les HORAIRES DE VOL réels de l'offre Caire & Sharm (arrivée J1 tôt ou tard) ?", statut: "en attente" },
    { q: "Apify est bloqué par le gate de permission de la session web (PAS un problème de crédit, solde ~4,42$ OK). Lances-tu le scrape Instagram Scraper sur la console Apify et me donnes-tu l'ID du run ? (recette fournie dans le chat)", statut: "en attente" },
    { q: "Pour générer les visuels Higgsfield (crédits OK : 466), ouvres-tu la session depuis un client qui permet d'approuver l'action ?", statut: "en attente" },
    { q: "Identifiants YouTube/Snapchat/LinkedIn + conversion du Facebook en Page pro : où en est-on ?", statut: "en attente" }
  ]
};
