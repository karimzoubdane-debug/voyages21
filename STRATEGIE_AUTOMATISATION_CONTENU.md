# 🎯 Projet — Automatisation Création de Contenu & Réseaux Sociaux

**Agence :** Voyages21 (Incoming Maroc)
**Document de stratégie créé le :** 2026-05-14
**Statut :** 🟡 En cours de conception — pas encore lancé
**Branche Git :** `claude/debug-chatbot-error-lsgD1`

---

## 🔗 Adresses GitHub (pour retrouver ce document partout)

- 📄 **Fichier en ligne (lecture directe) :**
  https://github.com/karimzoubdane-debug/voyages21/blob/claude/debug-chatbot-error-lsgD1/STRATEGIE_AUTOMATISATION_CONTENU.md

- 📥 **Version brute (téléchargement) :**
  https://github.com/karimzoubdane-debug/voyages21/raw/claude/debug-chatbot-error-lsgD1/STRATEGIE_AUTOMATISATION_CONTENU.md

- 🔄 **Pull Request associée :**
  https://github.com/karimzoubdane-debug/voyages21/pull/10

- 📁 **Repo GitHub :**
  https://github.com/karimzoubdane-debug/voyages21

- 🌿 **Branche :**
  https://github.com/karimzoubdane-debug/voyages21/tree/claude/debug-chatbot-error-lsgD1

---

## 📌 Objectif global

Mettre en place un système **semi-automatisé pilotable depuis Claude Code** qui :

1. **Crée** du contenu (textes, visuels, vidéos) pour les réseaux sociaux et le blog
2. **Planifie & publie** automatiquement sur Meta (Facebook/Instagram), YouTube, TikTok, LinkedIn
3. **Capture & qualifie les leads** via les commentaires et DM (automatisation 24/7)
4. **Optimise le SEO** via des articles de blog générés et publiés automatiquement
5. **Mesure** les performances et boucle d'amélioration continue

---

## 🧭 Contexte & point de départ

### Plateformes évaluées

| Plateforme | Verdict |
|---|---|
| **Google Agent Platform (Vertex AI)** | ❌ Nécessite facturation Google Cloud + activation API. Erreur reçue : *« Agent Platform API has not been used in project you-tube-organiser before or it is disabled »*. Adapté pour déployer un chatbot client, pas l'orchestration de contenu. |
| **Claude Code (Anthropic)** | ✅ Déjà accessible. Sert de "cerveau" d'orchestration. C'est ce qui est utilisé dans la session actuelle. |

### Besoin réel exprimé

> Automatisation complète : création de contenu pour Meta / YouTube / etc. + planning de diffusion automatique + suivi des commentaires et demandes.

---

## 🏛️ Stratégie — Les 3 piliers de contenu

Règle d'or des agences voyages qui convertissent : **chaque post appartient à UN seul pilier.**

| Pilier | But | % calendrier | Formats | Exemples Maroc |
|---|---|---|---|---|
| 🌅 **INSPIRATION** | Faire rêver, max de portée | **50%** | Reels, vidéos courtes, photos cinématiques | Lever de soleil Erg Chebbi, ruelles bleues de Chefchaouen, thé à la menthe au désert |
| 📚 **ÉDUCATION** | Établir l'autorité, sauvegardes | **30%** | Carrousels, guides, tips | « 5 erreurs des voyageurs au Maroc », « Que mettre dans la valise pour le Sahara », « Marrakech vs Fès » |
| 💰 **PROMOTION** | Convertir, capture leads | **20%** | Stories + 1 post/semaine | « 2 places restantes circuit Sahara septembre — DM SAHARA » |

**Règle prouvée :** promotion = spécifique, datée, avec rareté réelle (« 2 places » > « profitez de notre offre »).

---

## 🛠️ Stack d'outils retenu

### Niveau 1 — Démarrage (~80€/mois)

| Outil | Rôle | Pourquoi |
|---|---|---|
| **Claude Code** (déjà actif) | Cerveau d'orchestration, génération contenu | Lit tes assets, comprend ta marque, exécute |
| **Canva Pro** | Visuels, carrousels, miniatures | Templates voyages prêts |
| **Metricool** ou **Blotato** | Planification + Inbox unifiée + Analytics | Metricool = meilleur rapport qualité/prix. Blotato = piloté par API Claude (vu dans la vidéo) |
| **ManyChat** | Auto-réponse DM Instagram/Facebook | Roi du « commentaire → DM » pour capture leads |
| **CapCut** | Montage Reels/Shorts/TikTok | Gratuit, sous-titres auto |

### Niveau 2 — Scaling (+50€/mois)

| Outil | Rôle |
|---|---|
| **Arvo** | Auto-rédige et publie articles SEO sur le site |
| **n8n** (optionnel) | Orchestration avancée si besoin de workflows complexes |
| **Runway / Pika** | Animer photos Maroc en vidéo cinématique |
| **Submagic** | Sous-titres dynamiques pour Reels (+40% rétention) |
| **Perplexity API** | Détection automatique sujets tendance voyage |

---

## ⚙️ Workflow cible (basé sur la vidéo Claude Code + Blotato + Arvo)

```
ÉTAPE 0 — UNE FOIS POUR TOUTES (master prompt)
  • Site web actuel
  • 3-5 concurrents principaux
  • Photos / vidéos (Google Drive ou Dropbox)
  • Ton de marque (luxe / aventure / culturel...)
  • Circuits phares
  → Claude construit le MASTER PROMPT personnalisé

────────────────────────────────────────────────────
FLUX A — SEO (1 fois / semaine)
  1. Claude analyse ton site + concurrents
     → mots-clés à attaquer (ex : "circuit privé Sahara 5 jours")
  2. Claude génère un brief d'article ultra-précis
  3. Arvo rédige + publie l'article sur ton site

────────────────────────────────────────────────────
FLUX B — SOCIAL (déclenché par le nouvel article)
  4. RSS du blog notifie Claude
  5. Claude transforme 1 article → 7 contenus :
     • 1 carrousel Instagram (10 slides)
     • 1 Reel (script + plan tournage)
     • 1 post LinkedIn (angle B2B partenaires)
     • 1 thread Twitter/X
     • 1 post Facebook long format
     • 1 Short YouTube (script)
     • 3 Stories Instagram
  6. Blotato programme tout aux heures optimales

────────────────────────────────────────────────────
FLUX C — ENGAGEMENT (24/7)
  7. ManyChat surveille les commentaires
     Mot-clé "SAHARA" → DM avec PDF + lien WhatsApp
     Mot-clé "PRIX" → DM avec formulaire devis
  8. Leads → Google Sheet + alerte WhatsApp à l'équipe
```

---

## 📅 Calendrier éditorial type (1 semaine)

| Jour | Heure | Plateforme | Pilier | Exemple |
|---|---|---|---|---|
| Lundi | 19h | Instagram Reel | Inspiration | Drone Aït-Ben-Haddou + musique gnawa |
| Mardi | 12h | Carrousel IG + Facebook | Éducation | « 7 jours au Maroc : itinéraire parfait » |
| Mercredi | 18h | Stories (3) | Promo douce | Sondage : « Désert ou océan ? » |
| Jeudi | 19h | YouTube Short + Reel | Inspiration | Time-lapse souk Marrakech |
| Vendredi | 11h | Carrousel + LinkedIn | Éducation | « Pourquoi voyager au Maroc en automne » |
| Samedi | 19h | Reel + Story | **PROMO** | « 3 places septembre — DM SAHARA » |
| Dimanche | 10h | Post inspiration | Inspiration | Témoignage client + photo |

**Heures optimales (audience Europe/Maghreb voyage) :**
- Reels : 19h-21h
- Carrousels éducatifs : 11h-13h
- Promos : samedi soir (préparation week-end)

---

## 💬 Système de capture leads (ManyChat)

Workflow type pour une publication promotionnelle :

```
1. Post Reel : « Circuit Sahara 5 jours en septembre —
                commentez DESERT pour recevoir le programme »
2. Commentaire "DESERT" déclenche ManyChat
3. ManyChat envoie en <10 sec :
   • Message d'accueil personnalisé
   • PDF du programme détaillé
   • Question : "Pour combien de personnes ?"
4. ManyChat collecte : nom, email, téléphone, dates
5. Lead envoyé vers :
   • Google Sheet / HubSpot / Notion
   • Email équipe commerciale
   • Tag WhatsApp Business
6. Séquence email J+1, J+3, J+7 (drip campaign)
```

Séquences à créer en priorité :
- **SAHARA** — circuit désert
- **MARRAKECH** — city break
- **SUR-MESURE** — devis personnalisé

---

## 📈 KPIs à suivre (auto via Metricool)

| KPI | Cible M1 | Cible M3 | Cible M6 |
|---|---|---|---|
| Portée Instagram | 5 000 | 25 000 | 100 000+ |
| Taux d'engagement | 3% | 5% | 7%+ |
| DMs reçus/semaine | 20 | 80 | 200+ |
| Leads qualifiés/mois | 15 | 60 | 150+ |
| Coût par lead | 8€ | 4€ | <2€ |
| Conversion lead → réservation | 5% | 10% | 15%+ |

---

## 📚 Vidéos analysées

### Vidéo 1 — Claude Code + Blotato + Arvo (la référence pour ce projet)

**ID YouTube :** `IR4buVTRpEg`
**Lien :** https://www.youtube.com/watch?v=IR4buVTRpEg

**Outils présentés :**
- Claude Code (Anthropic) — cerveau de l'automatisation
- Blotato — création + planification posts sociaux via API
- Arvo — SEO blog automation

**Workflow décrit :**
1. Master prompt apprend la voix de marque
2. Claude crée posts LinkedIn / Instagram / Twitter / Facebook → Blotato programme
3. Stratégie combinée SEO + Social :
   - Claude analyse site + concurrents → mots-clés
   - Arvo génère articles → auto-publiés sur le site
   - Claude utilise RSS du blog → posts sociaux cohérents

**Avantages mis en avant :**
- Remplace équipes entières de gestion de contenu
- Pages atteignant 1M+ vues, croissance "cross de hockey"
- Personnalisation via assets propres (images, vidéos, base de connaissances)

**Timestamps clés :**
- 00:55 — gain de temps
- 01:01 — résultats concrets
- 01:43 — présentation Blotato
- 01:52 — présentation Arvo
- 02:41 — Claude Code comme cerveau
- 04:14 — automatisation réseaux sociaux
- 08:17 — analyse concurrents
- 08:52 — génération articles via Arvo
- 10:07 — flux RSS → posts sociaux
- 15:10 — personnalisation avec assets propres

---

### Vidéo 2 — Nathan Levallois : Agent IA Make.com + Telegram

**ID YouTube :** `aiLkDjZBbB4`
**Lien :** https://www.youtube.com/watch?v=aiLkDjZBbB4

**Outils présentés :**
- **Make.com** (ex-Integromat) — orchestrateur no-code avec fonctionnalité "AI Agent"
- **OpenAI GPT-4o mini** — cerveau de l'agent
- **DALL-E 3** — génération d'images
- **Cloudinary** — hébergement des images générées (URL publique)
- **Telegram bot** — interface utilisateur (texte + vocal via Whisper)
- **API Instagram + Facebook** — publication directe

**Workflow décrit :**
1. L'utilisateur envoie un message texte ou vocal à un bot Telegram
2. Whisper transcrit la voix (si vocal)
3. Make AI Agent (GPT-4o mini) interprète la demande
4. Outil 1 : DALL-E 3 génère une image → Cloudinary → URL publique
5. GPT-4o rédige la légende avec émojis et hashtags
6. Telegram demande validation à l'utilisateur ("c'est top, publie-la")
7. Outil 2 : publication automatique Instagram + Facebook

**Avantages mis en avant :**
- Création d'un post en moins de 2 minutes
- Pilotable **depuis un téléphone**, en mobilité
- Commandes vocales possibles (idéal sur le terrain)
- No-code, beaucoup plus accessible techniquement que la vidéo 1

**Idées à reprendre pour Voyages21 :**
- ✅ Le **bot Telegram pilotable en vocal** = parfait pour les guides sur le terrain (Sahara, Atlas, médinas)
- ✅ Commande vocale en français/arabe/anglais depuis le désert
- ✅ Validation rapide avant publication (garde le contrôle qualité)
- ⚠️ DALL-E 3 à utiliser avec parcimonie : préférer les vraies photos du Maroc pour l'authenticité
- ⚠️ Pas de stratégie SEO → reste complémentaire à la Vidéo 1

**Timestamps clés :**
- 00:46 — présentation Make.com AI Agent
- 01:41 — config OpenAI GPT-4o mini
- 02:54 — système de prompt (rôle, objectifs, outils)
- 04:22 — outil DALL-E 3 + Cloudinary
- 08:06 — outil publication Instagram + Facebook
- 11:01 — interface Telegram (texte + vocal Whisper)
- 13:21 — démonstration pratique complète

---

## 🔄 Synthèse : Système hybride recommandé (Vidéo 1 + Vidéo 2)

Les deux vidéos sont **complémentaires**, pas concurrentes.

| Aspect | Vidéo 1 (Claude Code + Blotato + Arvo) | Vidéo 2 (Make.com + Telegram) |
|---|---|---|
| Rôle | **L'usine de contenu** (80% du volume) | **Le scout mobile** (20% spontané) |
| Mode | Planifié, industriel, SEO + Social | À la demande, terrain, vocal |
| Interface | Terminal / IDE | Téléphone via Telegram |
| Cerveau | Claude (Anthropic) | OpenAI GPT-4o mini |
| Images | Assets propres (photos Maroc) | DALL-E 3 (à doser) |
| SEO | ✅ Oui (Arvo) | ❌ Non |
| Coût | ~80€/mois | ~40€/mois |
| Accessibilité tech | Moyen-élevé | Bas (no-code) |

### Combinaison cible :

```
┌─────────────────────────────────────────────────────────┐
│  PILIER 1 — L'USINE (vidéo 1)                            │
│  Claude Code + Blotato + Arvo                            │
│  → 80% du contenu (planifié, régulier, SEO)              │
│  → Master prompt + RSS, tourne en autopilote             │
└─────────────────────────────────────────────────────────┘
                          +
┌─────────────────────────────────────────────────────────┐
│  PILIER 2 — LE SCOUT MOBILE (vidéo 2)                    │
│  Make.com + GPT-4o + DALL-E + Telegram                   │
│  → 20% du contenu (spontané, terrain)                    │
│  → Vocal depuis le désert, validation 1 clic             │
└─────────────────────────────────────────────────────────┘
```

**Exemple concret :**
- Lundi 8h : l'usine publie l'article SEO + 7 posts de la semaine (automatique)
- Mardi 16h, le guide est à Aït-Ben-Haddou : vocal Telegram → post publié en 90 sec

---

### Vidéo 3 — Emmanuel Gutman (Joyeux No-Code) : Notion + Make pour publication automatique

**ID YouTube :** `9AdejqEdUC4`
**Lien :** https://www.youtube.com/watch?v=9AdejqEdUC4
**Titre :** Automatisez vos publications sur les réseaux sociaux avec Notion et Make !

**Outils présentés :**
- **Notion** — base de données = calendrier éditorial (gratuit)
- **Make.com** — orchestrateur d'automatisation (free/low cost selon volume)
- **API officielles** : Facebook Pages, Instagram for Business, LinkedIn

**Workflow décrit :**

**Étape 1 — Base Notion (calendrier éditorial)** avec colonnes :
- Titre et Contenu du post
- Date et Heure de publication
- Image de couverture (fichier attaché)
- Plateforme (Facebook / Instagram / LinkedIn)
- État (Brouillon / Programmé / Publié)

**Étape 2 — Déclencheur Make**
- Module Notion `Search Objects` ou `Watch Database Items`
- Filtre statut : récupère uniquement les lignes "Programmé"
- Filtre temporel : ne traite que les posts dans une fenêtre de 30 min autour de l'heure actuelle
- Make tourne toutes les 30 minutes

**Étape 3 — Routeur par plateforme**
- Route Facebook → module "Facebook Pages" → post texte + image
- Route Instagram → module "Instagram for Business" → image avec contraintes API (format/taille)
- Route LinkedIn → plus complexe : ajout d'un module HTTP "Get a file" pour télécharger l'image avant envoi

**Étape 4 — Gestion des cas particuliers (LinkedIn sans image)**
- Second routeur testant si une image existe
- Si OUI → télécharger + publier avec image
- Si NON → publier texte seul (évite l'erreur d'arrêt)

**Étape 5 — Mise à jour automatique du statut**
- Module Notion `Update a Database Item` à la fin de chaque branche
- Après succès → état passe de "Programmé" à "Publié" automatiquement

**Points techniques clés :**
- Compte **Facebook professionnel obligatoire** (pas perso) — limite des API officielles
- Notion gratuit suffit pour démarrer
- Make gratuit jusqu'à un certain volume d'opérations

**Idées à reprendre pour Voyages21 :**
- ✅ **Notion comme calendrier éditorial visuel** = parfait pour collaboration en équipe (rédacteur + validateur + community manager)
- ✅ **État "Brouillon → Programmé → Publié"** = workflow clair, n'importe qui peut voir où on en est
- ✅ **Pas besoin de cerveau IA** dans cette config = simple, fiable, prévisible
- ✅ **Coût ultra-bas** (proche de 0€ au démarrage)
- ✅ **Multi-utilisateur** dans Notion = ton équipe peut alimenter sans toi
- ⚠️ Ce système **publie** mais ne **crée pas** le contenu → à combiner avec un générateur (Claude / GPT)
- ⚠️ Pas de capture de leads, pas de SEO

**Timestamps clés :**
- 00:39 — préparation Notion (base de données)
- 01:45 — déclencheur Make
- 03:00 — filtre statut "Programmé"
- 04:43 — filtre temporel (fenêtre 30 min)
- 06:26 — routeur par plateforme
- 08:14 — route Facebook
- 10:03 — mise à jour statut Notion
- 11:55 — passage à "Publié"
- 12:38 — route Instagram
- 15:28 — route LinkedIn + HTTP file
- 19:25 — gestion sans image
- 20:51 — fallback texte seul

---

### Vidéo 4 — CréActifs : Top 10 outils IA réseaux sociaux 2026

**Lien :** https://creactifs.com/blog/les-10-meilleurs-outils-ia-pour-les-reseaux-sociaux-en-2026/

**Outils présentés (6 confirmés) :**
1. **ChatGPT** — angle, légendes, scripts Reels, déclinaisons multi-réseaux
2. **Adobe Express** — visuels et formats courts (écosystème Adobe)
3. **Hootsuite** — centralisation + assistant IA + planification + gouvernance
4. **SocialBee** — catégories de contenu + calendrier éditorial cohérent
5. **Publer** — programmation légère + suivi de base
6. **Predis.ai** — brief → contenus adaptés tous formats

**Classification 3 familles :**
- Création de contenu
- Programmation/automatisation
- Analyse et écoute sociale

**À retenir pour Voyages21 :**
- ✅ SocialBee = excellent pour calendrier "evergreen" (témoignages, conseils voyage)
- ✅ Hootsuite = si besoin de social listening (que disent les voyageurs du Maroc)
- ⚠️ Publer = trop léger pour une agence sérieuse
- ⚠️ Predis.ai = qualité moyenne, plus pour solo

---

### Vidéo 5 — Metricool : 7 outils IA gratuits YouTube

**Lien :** https://metricool.com/fr/ia-youtube/

**Outils confirmés (5 sur 7) :**
1. **ChatGPT Summarize** (extension Chrome) — transcrit + résume une vidéo
2. **Venngage** — bannières YouTube IA depuis un prompt
3. **Magic Media Canva** — miniatures captivantes IA
4. **PlayPlay** — générateur de scripts vidéo IA
5. **Wordcount Ahrefs** — générateur de noms originaux

**À retenir pour Voyages21 :**
- ✅ **Magic Media Canva** + **PlayPlay** = combo gagnant gratuit pour produire des vidéos voyages rapidement
- ✅ ChatGPT Summarize = utile pour transformer des avis Google en posts

---

### Vidéo 6 — Non Stop Reality : 10 outils IA réseaux sociaux

**Lien :** https://non-stop-reality.fr/strategies/crea/10-outils-ia-incontournables-pour-dynamiser-vos-reseaux-sociaux-en-2026/

**Pitch :** planificateurs intelligents + plateformes de veille sociale + apprentissage automatique pour optimiser moments de publication, créer légendes pertinentes, proposer idées d'engagement.

**Cibles :** créateurs individuels, équipes marketing, agences.

**Note :** Article publié le 27 avril 2026. La liste complète n'a pas été extraite, mais la philosophie rejoint celle de la Vidéo 4. **Pas d'apport nouveau majeur** vs Vidéo 4.

---

### Vidéo 7 — How to Auto Publish Social Media Posts on All Platforms Using n8n (YouTube)

**Lien :** https://www.youtube.com/watch?v=EoAEkaSw85A

**Workflow type décrit :**
1. **Google Sheet comme calendrier** (colonnes : video_url, title, platforms, scheduled_date, status)
2. n8n lit la sheet et déclenche les publications
3. **Upload-Post API** distribue le contenu vers TikTok, Instagram Reels, YouTube Shorts, LinkedIn **en un appel HTTP**
4. Statut mis à jour automatiquement après publication

**Variantes :**
- Form-based publishing : formulaire unifié (plateforme + caption + photo/vidéo)
- AI-generated content factory : chat → posts optimisés par plateforme

**À retenir pour Voyages21 :**
- ✅ **Upload-Post API** = alternative très puissante à Blotato (1 appel pour tout publier)
- ✅ Google Sheet comme calendrier = encore plus simple que Notion si on veut minimaliste
- ⚠️ n8n vs Make : équivalent pour ce cas. Make est plus visuel, n8n plus puissant en self-hosted gratuit

---

### Vidéo 8 — AI Influencer Automation in n8n (YouTube)

**Lien :** https://www.youtube.com/watch?v=R9c_JQrEtu8

**Workflow décrit :**
- n8n + Blotato + outils de génération vidéo IA
- **Schedule trigger** (toutes les 6h ou choisi)
- Génération automatique de contenu IA → publication multi-réseaux
- Concept de "AI Influencer Factory" : créer une présence multi-plateformes pilotée 100% par IA

**À retenir pour Voyages21 :**
- ❌ **À éviter** : ce modèle vise les "AI Influencers" 100% générés. Une agence de voyages doit garder son **authenticité humaine et marocaine**
- ✅ L'idée du **schedule trigger n8n** est utile pour automatiser le rythme
- ✅ Confirmation que **Blotato** est un outil de référence

---

### Vidéo 9 — n8n Community : Long-Form Videos Virales avec IA

**Lien :** https://community.n8n.io/t/how-i-built-a-youtube-automation-that-creates-viral-long-form-videos-with-ai/105676

**Stack technique :**
- **OpenAI Whisper** — transcription word-level
- **Google Gemini** — sélection de clips + métadonnées
- **Upload-Post FFmpeg API** — cutting/cropping accéléré GPU + scheduling
- **GPT-4** — concepts vidéo uniques
- **Fal.ai** — texte → scènes cinématiques + audio ASMR
- Alternatives : Vizard AI, Klap, Seedance, Blotato

**Coût :** Spikes Studio gratuit + Upload-Post free trial sans CB

**À retenir pour Voyages21 :**
- ⚠️ **Trop complexe** pour démarrer. Excellente roadmap pour Phase 3 (mois 6+) quand le système simple sera maîtrisé
- ✅ **Fal.ai** = à tester pour générer des scènes vidéo Maroc impossibles à filmer (ex : caravane historique)

---

### Vidéo 10 — Thinkpeak AI : Guide YouTube Automation 2026

**Lien :** https://thinkpeak.ai/youtube-automations-2026-guide/

**Concepts clés :**

1. **Agentic AI** — l'IA ne génère plus seulement du contenu, elle **raisonne, planifie, exécute**. Traiter ton stack comme une "équipe d'employés digitaux".

2. **SEO automatique** — titres, descriptions, tags générés automatiquement à partir des mots-clés cibles.

3. **Cross-platform repurposing** — 1 vidéo longue → shorts TikTok / Reels / YouTube Shorts automatiquement.

4. **Audience engagement** — chatbots IA entraînés pour répondre aux questions communes, accuser réception des feedbacks, maintenir la conversation.

5. **Chaînes "faceless" rentables** — modèle économique fort en 2026 (ads + affiliate + sponsoring).

**À retenir pour Voyages21 :**
- ✅ **Cross-platform repurposing** = principe d'or à appliquer (1 contenu → toutes les plateformes)
- ✅ **Chatbot IA pour engagement** = à coupler avec ManyChat pour qualifier les leads
- ✅ Concept "Agentic AI" valide notre choix de Claude/Make comme orchestrateur intelligent
- ❌ "Faceless channel" pas adapté : une agence de voyages Maroc DOIT montrer du vrai humain et du vrai pays

---

### 🆕 Vidéos à ajouter (à compléter au fil de l'eau)

#### Vidéo 11 — [à ajouter]


#### Vidéo 12 — [à ajouter]


---

## ❓ Décisions à prendre avant de lancer

- [ ] **URL du site actuel** de l'agence : `__________`
- [ ] **3 concurrents** identifiés : `__________`
- [ ] **Positionnement** en 1 phrase : `__________`
- [ ] **Langue(s) cible(s)** : FR / EN / ES / AR (cocher)
- [ ] **Budget mensuel** consacré aux outils : `____ €`
- [ ] **Personne responsable** de la validation quotidienne des posts : `__________`
- [ ] **Outil de planification** retenu : Metricool / Blotato / autre
- [ ] **CRM** existant (HubSpot, Notion, Google Sheet, autre) : `__________`
- [ ] **Date cible de lancement** : `__________`

---

## 🚀 Plan d'action — 14 prochains jours (à activer quand prêt)

### Semaine 1 — Fondations
- [ ] J1-2 : Définir les 3 piliers + audit ton de marque
- [ ] J3 : Créer comptes Metricool/Blotato + ManyChat + connecter Meta/YouTube
- [ ] J4-5 : Audit photos/vidéos existantes + identifier les manques
- [ ] J6-7 : Générer 4 semaines de contenus avec Claude

### Semaine 2 — Activation
- [ ] J8 : Programmer le 1er mois dans l'outil de planif
- [ ] J9 : Configurer 3 séquences ManyChat (Sahara / Marrakech / Sur-mesure)
- [ ] J10 : Tester la capture leads avec 1 post promo
- [ ] J11-12 : Mettre en place tableau de bord KPI
- [ ] J13-14 : Optimisation + planification mois 2

---

## 🗂️ Ressources & liens utiles

### Outils
- Claude Code : https://claude.com/code
- Blotato : https://www.blotato.com
- Arvo : (à compléter)
- Make.com : https://www.make.com
- OpenAI (GPT-4o, DALL-E 3, Whisper) : https://platform.openai.com
- Cloudinary : https://cloudinary.com
- Telegram Bot API : https://core.telegram.org/bots
- Metricool : https://metricool.com
- ManyChat : https://manychat.com
- n8n : https://n8n.io
- Canva : https://www.canva.com
- CapCut : https://www.capcut.com
- Submagic : https://submagic.co
- Runway : https://runwayml.com

### Articles de référence
- Strategy Instagram pour agences de voyages — https://www.socialmon.ai/blog/instagram-strategy-for-travel-agencies-a-practical-guide
- Content Pillars travel agencies — https://worldviatravelnetwork.com/blog/5-powerful-ways-use-content-pillars-transform-your-travel-agency-marketing
- 60 idées posts Instagram agences voyages — https://www.socialmon.ai/blog/60-travel-agency-instagram-post-ideas-with-examples
- n8n Workflows social media — https://n8n.io/workflows/categories/social-media/
- YouTube Automations 2026 Guide — https://thinkpeak.ai/youtube-automations-2026-guide/

---

## 📝 Notes & idées libres

> Espace pour noter toutes les idées qui viennent au fil du temps.

-
-
-

---

## 📌 Historique des révisions

| Date | Modification | Par |
|---|---|---|
| 2026-05-14 | Création initiale du document | Claude Code |
| 2026-05-14 | Ajout des liens GitHub en en-tête | Claude Code |
| 2026-05-14 | Ajout Vidéo 2 (Make.com + Telegram) + synthèse système hybride | Claude Code |
|  |  |  |
