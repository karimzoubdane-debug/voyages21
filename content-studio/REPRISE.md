# REPRISE — Où on s'est arrêtés (Content Studio Voyages21)

> Claude relit ce fichier au début de CHAQUE session quand Karim écrit
> l'amorce générique. Claude DOIT : 1) résumer en 3 lignes la dernière étape
> ci-dessous, 2) proposer la prochaine action concrète, 3) attendre le « go ».
> Après chaque avancée, Claude met à jour ce fichier (section « Dernier point »
> + « Prochaine étape ») et le commit.

## 🔑 Amorce générique (Karim tape juste ça, sans rien d'autre)
**« V21 STUDIO »**  (ou « V21 STUDIO : » + une demande précise si Karim veut
court-circuiter et aller droit au but).

## 🗣️ Vocabulaire de pilotage (règles de nommage)
- **« tour de contrôle »** = déclenche le skill d'orchestration
  `.claude/skills/tour-de-controle/` (planifier → déléguer à des sous-agents
  Haiku/Sonnet → vérifier). À réserver aux grosses tâches multi-lots
  (veille multi-comptes, production de séries de contenus). Installé le
  12/06/2026 — À TESTER en nouvelle session.
- **« point V21 »** (ou « où on en est ») = récap de situation : étapes
  faites, état du PR, en attente côté Karim, prochaines étapes.

## 🖥️ PLATEFORME V21 STUDIO (point d'entrée équipes)
- **URL partageable** : `https://voyages21.vercel.app/v21-studio/` (après merge sur main ;
  sinon URL preview de la branche). ⚠️ NE PAS utiliser `/studio` = pris par Sanity Studio.
- Fichiers : `public/v21-studio/index.html` (contenant) + `public/v21-studio/studio-data.js`
  (contenu — Claude met à jour ce JSON à CHAQUE session V21 STUDIO, Vercel redéploie).
- Sections : sélecteur produit · offres brochure (détails techniques) · veille
  concurrents + benchmark prix · cadran forces/faiblesses/à améliorer ·
  propositions contenu (posts/hooks/audio) · inspiration virale · questions Claude.
- Règle : à chaque avancée contenu, mettre à jour `studio-data.js` + commit/push.

## 📍 Dernier point (03/07/2026) — 🎬 REEL HAJJ 2027 — MOTION DESIGN
- Départ : 5 maquettes ChatGPT (commit `4dbda78`) → `content-studio/hajj-2027/01_cover…05_cta.png`.
- Le style « Ken Burns » (zoom sur images fixes) a été **abandonné** (trop statique).
- ✅ **Reels en MOTION DESIGN** (typographie cinétique) : moteur HTML/CSS animé →
  capturé image par image (**Playwright/Chromium**) → assemblé en mp4 (**ffmpeg**).
  Moteur **sauvegardé dans le dépôt** : `content-studio/hajj-2027/reel-engine/`
  (`reel_full.html` + `capture.js` + 3 fonds + `README.md` de rebuild).
- **3 formats** (param version) : `full` ~41 s · `short` ~24 s · `hookprix` ~41 s.
  Aperçus web déployés → `public/reels/` + page `public/reels/hajj.html` (URL preview
  Vercel de la branche). Masters HD livrés dans le chat.
- Validé par Karim (v6) : plein couleur (fonds La Mecque **animés**), cadrans **dorés**
  (montée douce) **2 par 2**, prix visibles (67 500 / 95 000), scène **Options**
  (Kidana +23 000 / train +2 000), scène **avis Google** (atterrissage + ★★★★★),
  fin **« زوروا موقعنا » + site tapé lettre par lettre**, rayons obliques **supprimés**,
  petits textes **agrandis**.
- ✅ **v7 LIVRÉE (03/07 soir) — 3 formats rendus, envoyés dans le chat, poussés** :
  1. **Avis Google** (cadran pw5) : atterrit doucement **puis grandit** (~×1,5) — occupe
     les 3/4 de l'écran, avec « Nos avis Google ★★★★★ ».
  2. **Prix** : **une formule par écran** (Confort 67 500 apparaît → disparaît → Premium
     95 000), les deux centrées.
  3. **Fin figée** : sur les ~1,3 dernières s tout se fige (fonds, particules, curseur)
     → image statique avec **WhatsApp Wafaa/Fouad + www.voyages21.com** visibles et fixes.
  Aperçus : `public/reels/reel_30s.mp4` (e98bbdf) · `reel_15s.mp4` (cc029dd) ·
  `reel_hookprix.mp4` (6870c80). PR #111 (branche `claude/adoring-goodall-ulziw4`).
- ⏳ **RESTE (besoin de Karim)** :
  - 🔊 **Son** (Talbiya + nappe) : env. bloque téléchargements audio ET génération
    Higgsfield → Karim **upload les fichiers audio dans le chat** (comme une image) →
    mixage ffmpeg local (voix devant, nappe atténuée, ducking, fondus).
  - 🎥 **Vrai fond vidéo filmé** : génération payante Higgsfield **échoue en session
    web/remote** (« permission stream closed », approbation impossible même via iPhone ;
    l'import URL, lui, marche). Solution = **clé API Higgsfield + domaine autorisé**
    (recette Apify) OU upload de clips réels ; le foreground (animations) sera rendu en
    transparence et posé par-dessus la vidéo.
- ⚠️ Instabilité env. : le conteneur **redémarre** parfois (tue les jobs de fond) →
  rendre **au premier plan**, une vidéo à la fois, frames **JPEG/24 i-s**.

## 📍 Point (13/06/2026 — matin)
- ✅ **Skill tour-de-contrôle TESTÉ** sur la veille concurrents (3 lots //,
  sous-agents sonnet, puis vérification adversariale). Fonctionne.
- ✅ **Veille concurrents livrée** → `content-studio/veille-concurrents.md` :
  fiches des 4 comptes (@yaallatour, @simplymorocco [= INCOMING, pas un
  concurrent Égypte], @qafilat.tayba [Omra], @vacancia.ma [concurrent Égypte
  n°1, vérifié]) + 20 agences marocaines outgoing/incoming sourcées + lecture
  stratégique Égypte (3 opportunités : Égypte premium sur-mesure, combiné
  Omra+culturel, contenu éditorial différenciant).
- ⚠️ **BLOCAGE Apify connu** : les sessions Claude Code **sur le web** ne peuvent
  PAS approuver une action MCP payante (`call-actor`) à chaud → scrape engagement
  réel impossible en web. Repli web-only utilisé (abonnés/positionnement/accroches
  publiques OK, mais pas de likes/cadence exacts). Pour l'engagement réel :
  relancer depuis l'app DESKTOP, ou lancer le run sur la console Apify + importer
  le dataset. Liste des données manquantes en bas de veille-concurrents.md.

## 📍 Point précédent (12/06/2026 — soir)
- Système installé : 4 connecteurs OK (Higgsfield, Drive, Notion, Apify).
- Dossier Drive `VOYAGES21-CONTENT-STUDIO` créé + partagé par lien.
- ✅ TESTÉ en session neuve : Notion répond (page « Voyages21 Content
  Studio » trouvée, id `37dd1486-4f86-800e-a94a-c6b6ad9e8fac`) et Apify
  répond (Instagram Scraper officiel dispo pour la veille concurrents).
- Noté : ancien espace Notion « Voyages 21 _Projet AUTOM RESEAUX SOCIAUX »
  existe encore (à réutiliser ou archiver plus tard).
- Mode de travail demandé par Karim : UNE étape à la fois, attendre son
  « go » entre chaque.
- ✅ Calendrier éditorial installé dans Notion : base « 📅 Calendrier
  éditorial Voyages21 » (data source `0bd16790-40ac-470d-8e59-12eae406df2b`,
  https://app.notion.com/p/b8d650921cbd47c5b8d00570e4d16785) + 3 idées
  Égypte pré-remplies en 💡 Idée.
- ✅ Interview de marque TERMINÉE : Q1→Q5 répondues (voir aboutme.md).
  Q4 : 4 posts/sem (IG+FB+TikTok), validation 30 min le samedi.
  Q5 : 4 comptes donnés (@yaallatour, @simplymorocco, @qafilat.tayba,
  @vacancia.ma) + mission : liste Apify d'agences marocaines
  outgoing/incoming. Règle : reposer Q1-Q5 régulièrement pour mise à jour.
- Priorité business n°1 : OUTGOING via voyages21.com → **Égypte d'abord**
  (stock de billets à écouler), puis Turquie, puis autres.

## 🧱 BLOCAGE TECHNIQUE — ✅ RÉSOLU EN PERMANENT (14/06/2026)
**Solution Apify permanente CONFIGURÉE** sur l'environnement cloud « Zakaria » :
- Accès réseau = **Personnalisé** + domaines autorisés `api.apify.com` et `*.apify.com`
  (case « inclure liste par défaut » cochée → GitHub/npm/amazonaws conservés).
- Variable d'environnement **`APIFY_TOKEN`** = token API Apify.
- ⚠️ S'applique aux **NOUVELLES sessions uniquement** (pas aux sessions déjà ouvertes).

➡️ **Dans une NOUVELLE session, faire ceci pour valider l'autonomie totale :**
```
curl -sS "https://api.apify.com/v2/users/me?token=$APIFY_TOKEN"
```
Si ça répond (JSON user) → je peux TOUT faire moi-même via l'API REST Apify + curl :
- Lister les runs : `GET https://api.apify.com/v2/acts/shu8hvrXbJbY3Eb9W/runs?token=$APIFY_TOKEN&desc=1&limit=30`
- Lire un dataset : `GET https://api.apify.com/v2/datasets/<DATASET_ID>/items?token=$APIFY_TOKEN&clean=true&fields=...`
- **Lancer un scrape** : `POST https://api.apify.com/v2/acts/apify~instagram-scraper/runs?token=$APIFY_TOKEN` (body JSON input) — plus besoin du MCP bloqué.
Actor Instagram Scraper : id `shu8hvrXbJbY3Eb9W` (apify/instagram-scraper).

🔐 **SÉCURITÉ** : le token actuel a circulé dans le chat → **le régénérer** dans Apify
(Settings → API tokens) et mettre le NOUVEAU dans la variable `APIFY_TOKEN` de l'env.

(Rappel : le MCP Apify reste utilisable en LECTURE — `get-actor-run`, `get-dataset-items`
— même sans token ; seul `call-actor` est bloqué par l'approval gate.)

## 📋 CAHIER DES CHARGES V21 STUDIO (à exécuter — donné par Karim le 14/06)
Périmètre : **Égypte + Turquie**. Tout va dans la plateforme `public/v21-studio/`.
1. **Veille concurrentielle** : NE PAS se limiter aux 4 comptes de Karim — chercher
   moi-même les concurrents les PLUS performants, sélectionner les meilleurs, et
   **inclure Voyages21 (toi) dans le tableau de benchmark** pour qu'il se situe.
   Concurrents sélectionnés (scrape Apify) : vacancia.ma, msm_voyages, olevoyages.ma,
   follow_me_travel_, ajinsafro.ma, transatourmaroc, royaltravelofficiel, terratour_voyages.
2. **Inspiration virale** : ajouter le **lien cliquable vers le post réel** pour chaque exemple.
3. **Stratégie réseaux** : pas que Pinterest — ajouter **Instagram, Facebook, TikTok,
   Snapchat** (+ Pinterest), chacun avec ses codes.
4. **Style audio** : ajouter un **lien pour écouter** chaque piste (son IG/TikTok ou
   banque libre type Pixabay/Uppbeat).
5. **Posts clés en main** : ajouter un **post UGC (avec acteur)** + livrer pour la vidéo :
   script, textes, **langues (FR/darija)**, direction visuelle, brief casting, plan de
   tournage, CTA, **KPIs cibles** (vues/rétention/saves). Et pour CHAQUE post clé en main,
   un **lien vers un post cible similaire** à reproduire avec la marque V21 (inspiration,
   pas plagiat, respect des droits).
Méthode : tour-de-contrôle (recherche déléguée en // → vérif → intégration plateforme).

## ▶️ Prochaine étape à proposer à Karim
1. ✅ FAIT — skill tour-de-contrôle testé + veille concurrents (`veille-concurrents.md`).
2. ✅ FAIT — campagne **Égypte Caire & Sharm** : brief créatif (3 accroches + 3
   prompts Higgsfield prêts) + benchmark prix vérifié + décortication
   apples-to-apples → `content-studio/campagne-egypte-sharm.md`.
3. ⏸️ EN PAUSE — **décision PRIX** (V21 19 600 = +18 % vs AjiNsafro 16 700 pour
   un Caire+Sharm 5★ quasi identique). Karim a dit : « laisse ces questions de
   cotes, on va y revenir ». NE PAS relancer le sujet prix tant qu'il ne le
   rouvre pas. 3 options en attente : A) tenir 19 600 + vendre l'hôtel 5★ nommé,
   B) baisser ~17 900–18 500, C) donner d'abord les horaires de vol réels V21.
4. ⏸️ EN PAUSE — **génération des visuels** : bloquée 2× (gate MCP web pour
   Higgsfield ET dépend de la décision prix). À lancer depuis l'app DESKTOP une
   fois le prix tranché. Crédits Higgsfield OK (466, Pro).
5. ⚠️ À FAIRE quand Karim redonne la main : récupérer les **horaires de vol
   réels** de l'offre Caire & Sharm V21 (fiche site ne les publie pas) — si
   arrivée tôt au J1 = argument « +1 journée » qu'aucun concurrent n'a.
6. (Optionnel) Engagement réel Apify depuis DESKTOP (gate web bloque le scrape).

### Note Higgsfield (génération images/audio)
Toujours bloqué en session web (approval gate), PAS de contournement lecture.
Nécessite un client qui autorise (desktop/claude.ai). Crédits OK (~466).
Run Apify déjà traité le 13/06 : `SrzMu16Ph9KxYWV74` → dataset
`emtJ0c7Zxn8WZb6Gk` (24 posts vacancia+qafilat, engagement réel intégré).

## ⏳ En attente côté Karim (à lui redemander)
- Identifiants YouTube, Snapchat, LinkedIn (quand créés).
- Convertir le Facebook « Voyages Maroc » (profil) en **Page pro** (requis ads).
- Déposer des photos `SRC-egypte-*.jpg` dans `01-SOURCES-A-DEPOSER-ICI`.
