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
2. **Appli d'analyse de portefeuille** (v24 en production) : page unique chiffrée.

## L'appli — état v24 (09/07/2026)
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
- **Analyse Flux vs CA v15 (09/07/2026)** : exploitation complète de la data flux confiés.
  Onglet **📈 Flux vs CA** = tableau trié (56 clients à CA, 53 avec flux couplés) — captation
  crédit (CR réel / CA), tendance CR, ratio DB/CR (sorties/recettes), CA non capté ; tri par
  colonne, code couleur. + fiche Cours « Flux confiés vs CA » (sous-captés / fuites / loyaux /
  couple CR-DB déséquilibré) + 10 questions de quiz ciblées (rubrique 📈 Flux). Données jointes
  depuis les tableaux CA/Part de marché + Flux couplés ; captation validée = part de marché
  déclarée au %. Sources de reconstruction : `scratchpad/ca.csv`, `flux.csv`, `analyse_flux.json`
  (à re-générer depuis les scans si besoin — non commités car données clients).
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
- 09/07/2026 : v24 — recentrage **DÉCONCENTRATION** (axe fort du CAF, validé avec Karim). (1) Mémo
  oral **refait aéré** (8 sections, bascule Aéré/Compact) : par rubrique = chiffres clés + top/Pareto
  + risque si départ + effort de déconcentration. Pareto calculé : **26 clients = 80% du PNB** ; ramener
  top3 à 20% = +3,48 M sur le reste. (2) **Objectifs** avec vrais chiffres scorecards (prod CMT+CPI 130 M
  = Elantry 50/Talbi 40/Hajjani 40 à 0 ; TRO par rubrique ; PNB par CA). (3) **Organigramme corrigé** :
  DCAF + 2 RM + 1 animateur commercial. Validé (0 err JS).
- 09/07/2026 : v23 — 3 vues : **🎯 Objectifs** (actuel/cible/levier ; production 130 M officiel,
  reste proposé), **🛡️ Risque opérationnel** (déf + cas PLADER/082/AUTUTI/échues + 3 lignes de
  défense + plan), **🧭 Feuille de route externe** (organigramme cible + ciblage prospects par
  RM/DCAF + foyers : terrain/pages jaunes, CRI, Maroc PME, chambre de commerce, fournisseurs &
  clients de nos clients, marchés publics + KPIs/planning). Comble les écarts b) et c). Validé (0 err JS).
- 09/07/2026 : v22 — **prépa oral + risque** : (1) rubrique quiz **🎤 Oral CAF** (36 q : chiffres
  du CAF, clients, technicité financière, management, lignes de crédit, risque) ; (2) onglet
  **⚠️ Risque & CA** = concentration PNB (top3 27,5%, ALSA 12,6%, PNB total 9,33 M/218 clients),
  scénarios de départ (ALSA −12,6%, top3 −27,5%), plan par CA (Elantry/Talbi/Hajjani) + planning
  de suivi ; (3) fiche Cours **couverture de la présentation** (sommaire vs appli + écarts : taux
  par client, risque op dédié, feuille de route externe). PNB/concentration calculés depuis dataset
  PNB de l'appli. Validé (0 err JS).
- 09/07/2026 : v21 — fix décalage : les sous-menus (Oral/Outils, alignés à droite) sortaient
  hors écran à gauche → passés en **panneau pleine largeur sous la barre** (vrai méga-menu),
  items en pastilles qui s'enroulent. Tous dans l'écran (390px). Validé (0 err JS).
- 09/07/2026 : v20 — **navigation « style site web voyages21 »** : les 18 onglets remplacés
  par un bandeau (vert forêt #1B3A28 + or #C8A440, titres serif) avec **5 rubriques déroulantes
  au clic** — Portefeuille · Analyse · Réviser · Oral · Outils. Sélection ferme le menu, rubrique
  active en or, clic dehors ferme. Reprend le pattern méga-menu du site. Validé (0 err JS).
- 09/07/2026 : v19 — **UX mobile** : la barre d'onglets (18 onglets) ne s'empile plus
  (`flex-wrap`) mais défile sur **une seule ligne horizontale** (swipe), boutons compacts,
  onglet actif recentré auto. Hauteur barre 600→48 px. Résout « le menu occupe tout l'écran ».
- 09/07/2026 : v18 — onglet **🗺️ Plan d'action** (portefeuille interne) : liste des
  **26 autorisations échues (836 M** ; Talbi 500 M groupe MENARA, Elantry 230 M, Hajjani 105 M/16 doss.),
  synthèse flux CR/DB, et feuille de route PNB & maîtrise du risque (renouvellements, production CMT/CPI
  0/130 M, auto-util 64%, captation sous-captés, pilotage par chargé). Échues calculées depuis le dataset
  ENG/ENG_ASM/ENG_HAJ de l'appli (échéances < 09/07/2026). Le plan externe viendra ensuite. Validé (0 err JS).
- 09/07/2026 : v17 — onglet **🎤 Mémo oral** (aide-mémoire chiffres du CAF pour le jour J) :
  bascule **1 page dense** ⇄ **2-3 pages aéré** + bouton **Imprimer/PDF** (`@media print`
  n'imprime que le mémo actif). Reprend scorecard (67,1% −1,1pt, CORPO 91,9%, PME-MID 80,4%),
  encours (autoris. 1 349 M / util. 857 M, auto-util 64%), PNB 8,8 M −14%, production CMT+CPI
  0/130 M (piège TRO 169%), segments, captation flux vs CA, repères circulaires, posture.
  Karim compare les 2 formats et choisit ; le toggle reste dispo. Validé navigateur (0 err JS).
- 09/07/2026 : v16 — onglet 📈 Flux vs CA doté d'un **sélecteur multi-clients** (liste
  déroulante avec recherche + tout cocher/décocher), d'un **filtre par segment** et d'un
  filtre texte + réinitialiser. Validé navigateur (0 erreur JS).
- 09/07/2026 : v15 — **analyse Flux confiés vs CA** : onglet 📈 Flux vs CA (tableau trié
  captation/DB-CR/CA non capté, 56 clients), fiche Cours de synthèse + 10 questions ciblées.
  Data flux entièrement exploitée (captation crédit CR/CA + couple CR/DB + momentum). Validé
  navigateur (0 erreur JS), aucune donnée en clair. Répond à la demande A+B+C de Karim.
- 09/07/2026 : v14 — modules **circulaires BMCI & Trade Finance** : onglet 📚 Cours
  (5 fiches), 75 questions de quiz (🏦 Segmentation R/C · 📁 Octroi de crédit · 🌍 Trade
  Finance & AENG · 📈 Flux portefeuille) + 27 flashcards, niveaux N1→N5 généralisés.
  Et **ouverture par lien/souvenir retirée** (saisie manuelle uniquement, « jusqu'à
  nouvel ordre »). Vérifié en navigateur headless (0 erreur JS, aucune donnée en clair).
- 09/07/2026 : v13 — ouverture automatique par lien (clé en fragment), plus de saisie.
- 09/07/2026 : v12 — quiz analyse financière 100 questions (5 niveaux) + moteur
  adaptatif + 20 flashcards ; filtres corrigés sur mobile ; carte « direct » retirée des CA.
- 09/07/2026 : v11 — en-têtes de tableaux figés + filtres par colonne partout.
