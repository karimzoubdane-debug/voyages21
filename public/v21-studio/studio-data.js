/* V21 STUDIO — données de la plateforme (source unique, mise à jour par Claude
   à chaque session V21 STUDIO ; Vercel redéploie automatiquement).
   Contenant = index.html · Contenu = ce fichier. */
window.V21_STUDIO = {
  meta: {
    version: "v2",
    maj: "14/06/2026",
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

    // 2) VEILLE CONCURRENTS — veille ÉLARGIE + engagement réel (scrape Apify 14/06/2026)
    concurrents: {
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
      // Benchmark prix Égypte (Caire+Sharm / Hurghada / croisière), départ Maroc, vols inclus — NOUS inclus
      benchmarkPrix: [
        { agence: "▶ Voyages21 (NOUS)", offre: "Le Caire & Sharm (offre héros)", duree: "11j/10n", hotels: "5★ nommés (Marriott/Aurora/Mövenpick)", prix: "19 600 DH", verifie: true },
        { agence: "AjiNsafro", offre: "Caire + Sharm (comparable direct)", duree: "10j/9n", hotels: "4★ et 5★", prix: "16 700 DH", verifie: true },
        { agence: "Olé Voyages", offre: "Caire + croisière + Hurghada", duree: "~11j", hotels: "nd", prix: "15 500 DH", verifie: false },
        { agence: "Al Hassania", offre: "Grand Tour Caire+Hurghada+Sharm", duree: "14j/13n", hotels: "5★", prix: "16 900 DH", verifie: false },
        { agence: "Vacancia", offre: "Caire + Hurghada", duree: "10j/9n", hotels: "4★ AI", prix: "17 500 DH", verifie: false },
        { agence: "ESF", offre: "Caire + croisière Nil + Hurghada", duree: "nd", hotels: "5★ + croisière 5★", prix: "17 900 DH", verifie: false },
        { agence: "AjiNsafro", offre: "Caire + croisière + Hurghada", duree: "12j/11n", hotels: "5★", prix: "18 700 DH", verifie: true }
      ],
      // Engagement réel — posts marquants scrapés + NOUS pour situer (run xX5xp5YSctnvvqkhE, 14/06/2026)
      engagementReel: [
        { compte: "@vacancia.ma", format: "Reel Istanbul « Réservation + n° » + audio", vues: "95 482", likes: "571", comm: "34" },
        { compte: "@terratour_voyages", format: "Reel Croatie « places limitées »", vues: "71 551", likes: "1 888", comm: "2" },
        { compte: "@follow_me_travel_", format: "Reel combiné Asie", vues: "16 953", likes: "454", comm: "34" },
        { compte: "@transatourmaroc", format: "Concours « gagne une Omra »", vues: "3 163", likes: "629", comm: "1 769" },
        { compte: "@ajinsafro.ma", format: "Post Caire & Sharm (concurrent direct)", vues: "121", likes: "2", comm: "0" },
        { compte: "@msm_voyages", format: "Carrousel « Premium 1140 DH »", vues: "carrousel", likes: "400", comm: "3" },
        { compte: "▶ @voyages21maroc (NOUS)", format: "Meilleur reel récent", vues: "149", likes: "6", comm: "1" }
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

    // 5) INSPIRATION VIRALE (web global + France + Pinterest) — recherche 13/06/2026
    viral: {
      statut: "✅ Recherche virale + exemples RÉELS cliquables (scrape Apify 14/06 + recherche web). Détail : content-studio/veille-virale.md. Stats = réelles à la date du scrape.",
      // Exemples viraux réels — liens cliquables (à reproduire avec la marque V21, pas plagier)
      viralExamples: [
        { titre: "AjiNsafro — offre Caire & Sharm", compte: "@ajinsafro.ma", lien: "https://www.instagram.com/p/DZXvWc2mkKD/", stat: "121 vues · 2 ❤️", pourquoi: "Offre quasi identique à la nôtre mais visuel pauvre → à REFAIRE en mieux (vrai film 5★ + hôtels nommés). La demande existe, le contenu manque." },
        { titre: "Vacancia — Reel Istanbul (format audio)", compte: "@vacancia.ma", lien: "https://www.instagram.com/p/DZFivwkN-x-/", stat: "95 482 vues · 571 ❤️", pourquoi: "Le format qui scale : reel court + audio tendance + caption « Réservation + n° ». À transposer sur l'Égypte." },
        { titre: "Terratour — Reel destination + dates", compte: "@terratour_voyages", lien: "https://www.instagram.com/p/DX9xEMlMHjW/", stat: "71 551 vues · 1 888 ❤️", pourquoi: "1 destination + dates précises + « places limitées » + n°. Le squelette de reel le plus efficace du marché MA." },
        { titre: "Transatour — Concours « gagne une Omra »", compte: "@transatourmaroc", lien: "https://www.instagram.com/p/DXq9aEZD7GQ/", stat: "1 769 commentaires", pourquoi: "Hack de portée : un concours fait exploser les commentaires → idéal pour lancer un compte neuf comme le nôtre." }
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
      audio: [
        { style: "Cinématique oriental fusion (cordes + tabla) [dominant]", usage: "B-rolls pyramides/Nil, montée épique à la révélation", lien: "https://pixabay.com/music/world-egypt-ethnic-arabic-cinematic-background-music-136331/" },
        { style: "Ambient oriental doux (oud / ney)", usage: "Day-in-life, croisière contemplative, voix off", lien: "https://pixabay.com/music/world-fading-light-of-the-faiyum-ancient-egyptian-arabic-ney-flute-176523/" },
        { style: "Cinématique arabe (banque Uppbeat)", usage: "Intro choc Gizeh/Karnak — son « propre droits » pour les ads", lien: "https://uppbeat.io/music/category/egyptian" },
        { style: "Middle Eastern Groove (Uppbeat)", usage: "Transitions Sharm / mer Rouge, énergie solaire", lien: "https://uppbeat.io/browse/collection/middle-eastern-groove" },
        { style: "Travel cinématique (Pixabay)", usage: "Récap voyage, slow travel, généraliste safe", lien: "https://pixabay.com/music/search/travel/" },
        { style: "🔥 Audio TENDANCE Instagram/TikTok du moment", usage: "Le LEVIER n°1 du reach (cf. Vacancia). À piocher dans l'onglet « audios en tendance » de l'app, PAS en banque libre — le trending son fait le reach", lien: "https://www.instagram.com/reels/audio/" }
      ],
      postsClesEnMain: [
        {
          titre: "Reel POV arrivée au Caire (45-60s)",
          format: "Reel cinématique · audio tendance",
          lienCible: "https://www.instagram.com/p/DZFivwkN-x-/",
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
          lienCible: "https://www.instagram.com/p/DX9xEMlMHjW/",
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
          lienCible: "https://www.instagram.com/p/DZFivwkN-x-/",
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
          lienCible: "https://www.instagram.com/p/DXq9aEZD7GQ/",
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
      comptes: [
        { nom: "@vacancia.ma", abonnes: "139 K", type: "Outgoing — Turquie phare", note: "Istanbul/Antalya en volume. Reels Istanbul 63k-95k vues. Argument martelé : VOL DIRECT Marrakech (Turkish Airlines)" },
        { nom: "@msm_voyages", abonnes: "121 K", type: "Outgoing — concurrent direct", note: "Turquie + Omra+Istanbul combinés. Carrousels-forts, reels rares" },
        { nom: "@follow_me_travel_", abonnes: "111 K", type: "Outgoing — concurrent direct", note: "Turquie + combinés Asie. Reels actifs (max 17k vues)" },
        { nom: "@transatourmaroc", abonnes: "28 K", type: "Outgoing — ISO 9001", note: "Istanbul 8j dès 6 547 DH, croisière Bosphore OFFERTE (même hook que nous, prix d'appel plus bas)" },
        { nom: "▶ @voyages21maroc (NOUS)", abonnes: "petit compte · Meta Verified", type: "Notre compte — point de départ", note: "~25-150 vues/post. Turquie = notre 2e priorité : pousser des reels été dès maintenant" }
      ],
      benchmarkPrix: [
        { agence: "▶ Voyages21 (NOUS)", offre: "Séjour Istanbul 8j (entrée de gamme)", duree: "8j/7n", hotels: "3★/4★ + Bosphore inclus", prix: "9 700 DH", verifie: true },
        { agence: "Transatour", offre: "Istanbul 8j (Bosphore offert)", duree: "8j/7n", hotels: "nd", prix: "6 547 DH", verifie: true },
        { agence: "Vacancia (vol direct Marrakech, Turkish Airlines)", offre: "Combo Istanbul + Antalya", duree: "—", hotels: "—", prix: "13 900 DH", verifie: true },
        { agence: "Vacancia", offre: "Antalya (séjour)", duree: "—", hotels: "—", prix: "15 900 DH", verifie: true },
        { agence: "Vacancia", offre: "Circuit Antalya + Marmaris + Fethiye", duree: "—", hotels: "—", prix: "15 900 DH", verifie: true }
      ],
      apifyStatut: "✅ Scrape Apify autonome via API REST (14/06/2026, run xX5xp5YSctnvvqkhE). Engagement Turquie réel ci-dessous. ⚠️ Transatour 6 547 DH = prix d'appel Istanbul plus bas que notre entrée 9 700 DH → à analyser (qualité hôtel ? vol direct ou escale ?).",
      engagementReel: [
        { compte: "@vacancia.ma", format: "Reel Istanbul « Réservation + n° » + audio", vues: "95 482", likes: "571", comm: "34" },
        { compte: "@vacancia.ma", format: "Reel Istanbul + Bali", vues: "63 611", likes: "410", comm: "16" },
        { compte: "@vacancia.ma", format: "Reel Turkey + Antalya", vues: "13 006", likes: "114", comm: "15" },
        { compte: "@transatourmaroc", format: "Post Istanbul 8j dès 6 547 DH (Bosphore offert)", vues: "3 279", likes: "104", comm: "18" },
        { compte: "▶ @voyages21maroc (NOUS)", format: "Meilleur reel récent", vues: "149", likes: "6", comm: "1" }
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
    viral: {
      statut: "✅ Playbook Turquie + exemples RÉELS cliquables (scrape Apify 14/06). Marché saturé → différencier par le contenu, pas le prix.",
      viralExamples: [
        { titre: "Vacancia — Reel Istanbul (audio)", compte: "@vacancia.ma", lien: "https://www.instagram.com/p/DZFivwkN-x-/", stat: "95 482 vues · 571 ❤️", pourquoi: "Le reel Istanbul + audio + caption minimale = la machine à reach du marché. À copier sur la FORME." },
        { titre: "Vacancia — Reel Istanbul + Bali", compte: "@vacancia.ma", lien: "https://www.instagram.com/p/DYo9YhegdXn/", stat: "63 611 vues · 410 ❤️", pourquoi: "Les combinés font rêver (2 décors en 1 reel). V21 a Istanbul + Antalya/Bodrum à mettre en avant pareil." },
        { titre: "Transatour — Istanbul dès 6 547 DH", compte: "@transatourmaroc", lien: "https://www.instagram.com/p/DTSu2h2iNrk/", stat: "3 279 vues", pourquoi: "Prix d'appel bas + « Bosphore offert ». On ne s'aligne PAS sur le prix : on oppose Turkish Airlines + hôtels nommés + croisière incluse." }
      ],
      pistes: [
        "POV première personne — « POV : ton 1er matin sur le Bosphore »",
        "Transition tenue/lieu — Istanbul historique → plage Bodrum/Antalya (format viral combiné)",
        "Cost breakdown — « 8 jours Turquie tout compris depuis Casa, le vrai budget »",
        "« 5 erreurs à éviter pour un combiné Istanbul + plage »",
        "Hidden gems — Îles des Princesses, quartiers de Balat, Cappadoce en extension"
      ],
      audio: [
        { style: "Cinématique ottoman (cordes + oud)", usage: "Istanbul historique, coupoles, Bosphore", lien: "https://uppbeat.io/browse/collection/middle-eastern-groove" },
        { style: "Pop électronique solaire / deep-house douce", usage: "Antalya/Bodrum, piscine, plage", lien: "https://pixabay.com/music/search/summer%20background%20music/" },
        { style: "Travel cinématique (Pixabay)", usage: "Transitions ville→mer, récap voyage", lien: "https://pixabay.com/music/search/travel/" },
        { style: "🔥 Audio TENDANCE IG/TikTok", usage: "Le levier n°1 du reach (cf. Vacancia 95k) — à prendre dans l'app", lien: "https://www.instagram.com/reels/audio/" }
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
