# DCAF — Fichier de reprise (mot-clé « DCAF »)

> Dès que Karim écrit **« DCAF »** (même seul) : lire CE fichier, résumer en 3 lignes
> (dernière action + points en suspens + prochaine étape proposée), puis **attendre le go**.
> Mettre à jour ce fichier après chaque avancée. **PROJET CLOISONNÉ ET CONFIDENTIEL** :
> ne pas mélanger avec le site, ne JAMAIS écrire de données clients bancaires en clair
> dans ce dépôt (noms, montants, identifiants) — elles ne vivent que dans la page chiffrée.

## Contexte (résumé)
Karim prépare un entretien de promotion interne (poste de direction d'un centre
d'affaires bancaire, ~60 candidats, contexte de fusion). Deux volets :
1. **Entretien blanc** : Claude joue le jury, une question à la fois, Karim dicte,
   débrief sans complaisance (fond, structure, ton, longueur), puis « version directeur »
   à mémoriser. **21 questions traitées** (Cahier d'oral). Règles de ton impératives :
   sobre, jamais pompeux ; le retrait actuel = choix familial ASSUMÉ ; ne JAMAIS dire
   « redresser le centre » (dire continuité / développement / préparer la fusion) ;
   mots bannis : résigné, chance, épuisé, m'offrir ; point à muscler : poser la
   DÉFINITION EXACTE d'un terme avant de dérouler — le corriger net là-dessus.
2. **Appli d'analyse de portefeuille** (v14 en production) : page unique chiffrée.

## L'appli — état v14 (09/07/2026)
- **URL** : https://www.voyages21.com/dcaf/ (fichier `public/dcaf/index.html` de ce dépôt).
  Contenu 100 % chiffré AES-GCM (PBKDF2 200 000 itérations). Depuis la v14, la page
  **s'ouvre UNIQUEMENT par saisie manuelle du mot de passe** : l'ouverture automatique
  par souvenir (localStorage `dcafpw`) ET par clé dans le fragment d'URL (`#<mot de passe>`)
  a été **retirée « jusqu'à nouvel ordre »** (demande de Karim) — au chargement, la page
  purge `dcafpw` et nettoie l'URL (retire le `#`). Le mot de passe n'est PAS écrit dans ce
  dépôt : le demander à Karim, il sert à reconstruire la source.
- **Artifact Claude** privé « CAF Marrakech — Analyse portefeuille 04/2026 »
  (version v12-quiz100-adaptatif), même contenu.
- **14+ onglets** : Synthèse (cadrans cliquables, concentration 50/80 %), Clients,
  Par chargé d'affaires (3 portefeuilles — carte du 4ᵉ « direct » retirée), Alertes,
  Engagements (popup 360° par client), Munitions oral, Scorecards (reconstruction des
  scores par itérations, ±2 pts), Segments (parts CO1/CO2/MNC/INST), Cahier d'oral
  (21 questions), Marchés publics (film + fiche), **📚 Cours** (5 fiches circulaires,
  onglet ajouté v14), **Quiz** (dont « 🎓 Analyse financière » 100 q/5 niveaux + les
  nouvelles rubriques v14 : 🏦 Segmentation R/C, 📁 Octroi de crédit, 🌍 Trade Finance
  & AENG, 📈 Flux portefeuille — 75 q, la plupart en 5 niveaux N1→N5), **Flashcards**
  (+20 analyse financière +27 circulaires v14), Mises à jour (import Excel/CSV via SheetJS
  embarqué), Question à Claude (chat API Anthropic, clé de Karim en localStorage).
- **Modules v14 (procédures BMCI, ajout 09/07/2026)** : bâtis à partir des scans de Karim
  — COR 1490 (segmentation Retail/Corpo CO1/CO2/SE + MNC), COR 0821 (processus d'octroi
  + Watch List 9-10 / compromis 11-12 + check-list), procédures COMEX (AVAL/REFI, préfi,
  EADD, comptes 082/001, cas pratiques) et COR 0606 (AENG : notation ≥7,
  SMAEX, plafond 80 %, 150 j, prorogation J-4). Ajoutés en **append** (RUBS + push QUIZ/
  FCALL + onglet `p-cours`), sans toucher à l'existant ; niveaux généralisés via `LEVELED`.
- **Moteur adaptatif** : réponses persistées (localStorage `qzAns`/`qzHist`/`qzFail`),
  maîtrise par rubrique, « 🎯 Mode ciblé » (rejoue erreurs + rubriques < 75 %),
  badge « à retravailler », flashcards « Faiblesses d'abord ».
- **Tableaux** : en-têtes figés (sticky) + filtres type Excel par colonne (multi-
  sélection, recherche) ; sur mobile : volet fixe en bas + bouton ✕.

## Reconstruire la source pour modifier l'appli
La source maître n'est PAS en clair dans le dépôt (confidentialité). Pour la retrouver :
1. Prendre `public/dcaf/index.html`, extraire les constantes `SALT`, `IV`, `CT` (base64)
   et déchiffrer en AES-GCM avec clé PBKDF2(SHA-256, 200 000 itér.) du mot de passe
   fourni par Karim → on obtient `DcafHub.html` complet (~560 Ko).
2. Architecture interne : page unique, datasets en variables `let` (PNB, DAV, CMT, OVD,
   CCT, FACT, AUT, ENG…), référentiels IDS (identifiants) et GRP (groupes), un
   commentaire `// Tabs` sert de point d'insertion des modules, un slot
   `<script id="xlsxslot">` contient SheetJS 0.18.5 (échapper `</script` et `<!--` à
   l'injection ; utiliser des remplacements en forme fonction pour éviter `$&`).
3. Re-chiffrer avec le même schéma (page wrapper : invite + auto-ouverture localStorage
   + fragment d'URL) et vérifier par grep qu'AUCUN nom/terme n'apparaît en clair.
4. Déployer : commit sur branche `claude/…` + PR + squash merge (jamais de push main).
   Republier l'artifact avec le même chemin de fichier pour garder l'URL.

## Points en suspens (à rappeler à chaque reprise)
- 🔔 **« go migration »** : sortir l'appli de voyages21 vers un dépôt privé dédié +
  URL propre (rappel demandé par Karim JUSQU'À réalisation — il donnera le go).
- 🔓 **Ouverture par lien / souvenir retirée « jusqu'à nouvel ordre » (v14)** : la page
  ne s'ouvre plus QUE par saisie manuelle du mot de passe (fragment `#…` + localStorage
  `dcafpw` désactivés et purgés). Quand Karim demandera de **ré-activer l'ouverture par
  lien** : re-ajouter le support du fragment (`location.hash`) au wrapper + redéployer.
- 🎤 **Q21 de l'entretien blanc ouverte** : « Production CMT en baisse, un portefeuille
  à zéro — vos 90 premiers jours ? » (Karim dira « Repose Q21 »).
- 📄 **Apprentissage méthodologie** : Karim envoie des scans (data + circulaires) DANS la
  conversation → transformer en cours + flashcards + quiz → redéployer. **1er lot fait v14**
  (COR 1490, COR 0821, procédures COMEX, COR 0606 AENG + flux portefeuille). Pistes de
  complément si Karim renvoie : « Situation 2 » (page 8 des procédures, restée vide) et
  COR 1490 pages 2/7 & 4/7 (non scannées). Le moteur adaptatif est déjà en place.
- ❓ Vérifier avec Karim le segment d'un client (hésitation MNC vs autre — voir fiche
  Segments dans l'appli).
- 📦 Livrés côté Karim : dossier PDF + PowerPoint du jour J, pack « Projet Claude »
  (instructions + données JSON) pour son chat mobile.

## Dernières actions
- 09/07/2026 : v14 — modules **circulaires BMCI & Trade Finance** : onglet 📚 Cours
  (5 fiches), 75 questions de quiz (🏦 Segmentation R/C · 📁 Octroi de crédit · 🌍 Trade
  Finance & AENG · 📈 Flux portefeuille) + 27 flashcards, niveaux N1→N5 généralisés.
  Et **ouverture par lien/souvenir retirée** (saisie manuelle uniquement, « jusqu'à
  nouvel ordre »). Vérifié en navigateur headless (0 erreur JS, aucune donnée en clair).
- 09/07/2026 : v13 — ouverture automatique par lien (clé en fragment), plus de saisie.
- 09/07/2026 : v12 — quiz analyse financière 100 questions (5 niveaux) + moteur
  adaptatif + 20 flashcards ; filtres corrigés sur mobile ; carte « direct » retirée des CA.
- 09/07/2026 : v11 — en-têtes de tableaux figés + filtres par colonne partout.
