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

## 📍 Dernier point (mis à jour le 13/06/2026 — matin)
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

## 🧱 BLOCAGE TECHNIQUE RÉCURRENT (à retenir)
Les sessions Claude Code **sur le web** ne peuvent PAS approuver une action MCP
**payante** (Apify `call-actor`, Higgsfield `generate_image` — même le préflight
coût). settings.json à chaud ne lève pas le gate. → Toute génération/scrape se
fait depuis l'app **DESKTOP**. Le travail web = recherche, analyse, brief, specs.

## ⏳ En attente côté Karim (à lui redemander)
- Identifiants YouTube, Snapchat, LinkedIn (quand créés).
- Convertir le Facebook « Voyages Maroc » (profil) en **Page pro** (requis ads).
- Déposer des photos `SRC-egypte-*.jpg` dans `01-SOURCES-A-DEPOSER-ICI`.
