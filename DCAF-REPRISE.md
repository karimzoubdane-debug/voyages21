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
2. **Appli d'analyse de portefeuille** (v39 en production) : page unique chiffrée.

## L'appli — état v62 (15/07/2026) — Fix impression PDF vide (Présentation dossier + Note de synthèse)
- **🐞 Bug signalé Karim** : « quand je veux imprimer le PDF est vide » sur les 2 nouveaux onglets.
- **Cause** : la règle `@media print` globale de l'appli (pour le Mémo oral) masque TOUT sauf `#p-memo`
  (`body *{visibility:hidden!important} #p-memo{visible}`) → impression blanche depuis tout autre onglet.
- **Fix** : fonction `dcafPrint(id)` (ajoute une classe `pr-pdos`/`pr-ndos` sur `body`, imprime, retire au
  `afterprint`) + règles `@media print` dédiées (guardées par la classe, `!important`, placées après la règle
  globale pour gagner la cascade) qui révèlent le panneau ciblé, masquent le reste, cassent les ombres/bordures
  et gèrent les sauts de page. Boutons « Imprimer / PDF » recâblés sur `dcafPrint`.
- **Validé** : PDF généré headless (page chiffrée) = **2 pages, 2540 caractères, chiffres présents** (plus vide).
- NB : les onglets Présentation/Note **du portefeuille** (existants) gardent l'ancien comportement d'impression
  (hors périmètre de la demande) — à harmoniser plus tard si besoin.

## L'appli — état v61 (15/07/2026) — 2 onglets « Réviser » : Présentation dossier + Note de synthèse (plan-cible)
- **✅ Demande Karim** : après validation du plan-cible (livré en Word `Plan-cible_DCAF_entretien.docx`),
  intégrer dans le menu **Réviser** deux onglets dédiés reprenant le plan **sauf la Partie 4** (projet de
  directeur, réservée à l'oral) : **📊 Présentation dossier** (`p-pdos`) et **📝 Note de synthèse** (`p-ndos`).
- **Présentation dossier** : 3 sections (① Photographie — KPIs 218 clients/30 groupes/PNB 8,33 M/CA 10 443 M/
  engagement 1 591 M util. 66 %/flux 3 756 M capt. 36 % + FDC, PNB, engagements, flux, vue groupe ;
  ② Situation — scorecard 67,1 %, TRO, stock vs production, qualité risque, rendement ; ③ Diagnostic —
  concentration −10,6/−27,5/−37,4/−53,5 %, opportunités, menaces). Bouton Imprimer/PDF.
- **Note de synthèse** : même périmètre en prose (3 parties). Partie 4 explicitement exclue (oral).
- **Plan-cible Word** = document de méthode SANS donnée client nominative (structure 4 temps + Annexe A
  correspondance plan↔appli + Annexe B rappels fond & ton). Livré à Karim pour validation.
- Validé headless chiffré (2 onglets ouvrent, chiffres présents, 0 err JS).

## L'appli — état v60 (15/07/2026) — IdSAB max (188/218) + slide « Par groupe » dans la présentation
- **✅ Demande Karim** : « tous les ID doivent figurer » + « rafraîchir la présentation avec les données
  des groupes et par groupe ».
- **IdSAB** : porté de 177 → **188/218** en fusionnant TOUTES les sources (répertoire scan +
  objet IDS interne + tableau LOOKUP de la recherche). `scratchpad/gvue3.json`. **Les 30 restants
  n'ont AUCUN IdSAB dans aucune source fournie** (répertoire, IDS, LOOKUP tous vides) → affichés « — »
  (hors répertoire officiel). **Non inventés** (règle confidentialité). Liste des 30 à compléter par
  Karim depuis la colonne « id SAB » de l'Excel PNB : SUEZ INTERNATIONAL, SNL BITUME, SL PARTICIPATIONS,
  LE PALAIS BERBERE, ATLAS SAHARA TREKS, SOCIETE D'INVESTISSEMENT MEKKA, ATLAS MAREE, STE INTERCONTINENTALE,
  SONASTRAVO, PLACE DU MARCHE PRODUCTIONS, SOMITRA, FIOSEM SYSTEMS, LES DEUX TOURS, LES HOTELS NOUVELLE
  GENERATION, ST MECAGRI ET TRAVAUX P, PROTEBAT, LE GROUPEMENT SOGECTA, NABAD, CITY TILES, IJIOUI TRAVAUX,
  INGRE-HOSPITALITY, SOCIETE COMPLEXE SPORTIF, PERFECT WALLS, OUSNI RACHID, OURIKA PRESTIGE, APPLE GARDENS
  TRAVEL, GROUPEMENT MOJAZINE, ACIERS ET MATERIAUX, DEPOMETAL, IMMOBILIERE MILANO.
- **Présentation** : nouvelle **slide « Vue par groupe d'affaires »** (après « Risque de concentration »,
  slide 16/19) : tableau top 7 groupes (Sociétés · CA consolidé · PNB · Engagement · Tx util.) — ZAHID,
  ALSA, ROUANDI, PB/YSL, EL BAROUDI, SADEQ, CARTIER — + encarts « À retenir » (ALSA modèle 91 % captation ;
  ZAHID 1er CA mais PNB négatif ; top 3 groupes = 34 % du PNB) et « Marges d'activation » (ROUANDI 36 %,
  EL HARDA 55 %). Validé headless chiffré (0 err JS).

## L'appli — état v59 (15/07/2026) — 📋 Liste triable (IdSAB) dans la Vue 360
- **✅ Demande Karim** : « rajoute l'IdSAB et fais une SEULE liste pour pouvoir classer par ordre
  décroissant le CA, le PNB, l'engagement, etc. ». Ajout d'une **bascule de vue** dans l'onglet
  🧭 360 Groupe/Client : **🏢 Par groupe** (v58) / **📋 Liste triable**.
- **Liste triable** = une seule liste plate de 218 clients, colonnes **IdSAB · Société · Groupe · Seg ·
  RM · PNB · Engagement · Utilisation · CA · Flux confié · Capt. %**. **Clic sur un entête = tri
  décroissant** (2ᵉ clic = croissant, flèche ▼/▲). Ligne TOTAL en pied (sticky). Nom + engagement
  cliquables → détail des lignes de crédit (eng360).
- **IdSAB** : 177/218 renseignés depuis le répertoire scanné (`scratchpad/gvue2.json`, jointure par
  nom normalisé) ; « — » = société hors répertoire officiel. (Meilleure couverture que l'objet IDS
  interne qui n'en couvrait que 90.)
- Validé headless **chiffré** : 218 lignes, tri CA/PNB/IdSAB OK, totaux OK (PNB 8 329 580 · CA 10 443 M ·
  Flux 3 756 M = 36 %), popups OK, **0 erreur JS**.

## L'appli — état v58 (15/07/2026) — 🧭 Vue 360° Groupe / Client (CA consolidé · Flux confié)
- **✅ Demande Karim** : « catégoriser les clients par groupe pour connaître le CA consolidé du groupe ;
  un visuel groupé/client avec PNB, Engagement, CA, Flux confié (chiffres + %), Seg, RM ; clic sur
  l'engagement total → popup détaillant les engagements ».
- **Nouvel onglet** `🧭 360 Groupe/Client` (menu Analyse, à côté de Flux vs CA). Pour chaque groupe :
  entête consolidé **CA · PNB · Engagement · Flux confié (valeur + %)**, triable (CA / Flux / PNB / Engagement),
  N/C en fin de liste. Par société : **Seg · RM (chargé) · PNB · Engagement (clic → lignes de crédit via eng360)
  · CA · Flux confié (valeur + %)**. Ligne CONSOLIDÉ en pied de tableau.
- **Clic sur l'engagement total d'un groupe** (🔎) → popup : total autorisé / utilisation / taux + tableau
  société par société (autorisé, utilisé, taux), chaque société cliquable vers le détail des lignes.
- **Convention** : Flux confié société = captation crédit × CA ; Flux confié groupe = Σ flux ÷ Σ CA.
  KPIs globaux : **30 groupes · CA consolidé 10 443 M · PNB 8 329 580 · Engagement 1 591 M · Flux confié 3 756 M (36 % du CA)**.
  CA/flux affichés seulement pour les 55 sociétés dont le CA figure au dossier (« — » sinon).
- Données : `scratchpad/gvue.json` (218 clients : nom, grp, seg, rm, pnb, aut, util, ca, capt, flux).
  Validé headless **chiffré** (déverrouillage OK, 31 details = 30 groupes + N/C, popups OK, **0 erreur JS**).

## L'appli — état v57 (14/07/2026) — Recherche société → groupe (N/C explicite)
- **✅ Demande Karim** : « insérer le nom d'une société et avoir le groupe auquel elle appartient,
  sinon N/C ». La recherche (en tête de 🏭 Par secteur) le faisait déjà (colonne Groupe) ; ajusté pour
  afficher **« N/C » en clair** (au lieu de « — ») quand la société n'a aucun groupe, + libellé mis à jour.
  Ex. Menara Real Estate → ZAHID ; Dushow Maroc → N/C. Validé headless (0 err JS).

## L'appli — état v56 (14/07/2026) — 🔴 Recontrôle complet des groupes (répertoire scan CamScanner) + IdSAB
- **Karim a détecté des erreurs de rattachement** (« je trouve Jardin Majorelle dans le groupe de
  Jakubowicz »). Il a envoyé le **répertoire scanné (PDF CamScanner, 4 pages, net)** = source de vérité.
- **Cause** : ma transcription depuis les photos floues était **décalée sur plusieurs lignes (page 1)**.
  **Rebuild complet du mapping société→groupe depuis le scan** (`scratchpad/repertoire.csv`, 200 clients :
  nom;groupe;idsab). **Erreurs corrigées** : JARDIN MAJORELLE JAKUBOWICZ→**PB/YSL** ; DUSHOW MAROC →N/C ;
  INVEST IMMO CONSULTING PB/YSL→**SBAI** ; L'INDUSTRIE DE L'HYGIENE ZAHID→N/C ; MAZAYA BINAA ZAHID→N/C ;
  TALEB VENTURE CAPITAL ZAHID→N/C ; SOCIETE REGIONALE MULTISERVICES LAKHMIRI→N/C ; ATLAS KARTING
  BIHMIDEN→N/C ; 360 S SMIRI→N/C ; LES RESIDENCES DU GUELIZ LAHLOU→N/C ; + ajouts (MARRAKECH GRAND PRIX
  →ZAHID, RATH CAPITAL→ROUANDI, PACK POWER→LAKHMIRI, MENARA UNIVERSITE→ZAHID, Z5 HOLDING→ZAHID,
  ATLANTIS GRAN BLEU→SMIRI, LES VILLAS DE LA PAIX→LAHLOU…). **30 groupes** désormais.
- **✅ Bonus IdSAB** : le scan net donne aussi l'IdSAB (règle confirmée **app = « 1 » + idsab répertoire**).
  **Validation : 82/82 IdSAB concordent** avec les 92 déjà connus → transcription fiable. Recherche
  société→secteur : **couverture IdSAB 92 → 181/218**. (1 doublon mineur Food Toast/Sucre, tous 2 N/C, blanchi.)
- **Régénéré depuis les données corrigées** : group_360, group_credit (crédit ré-attribué par le bon
  groupe), panneau 🏢 Vue 360 groupes (cartes + KPI + classement décroissant), et l'array LOOKUP de la
  recherche. Validé headless (JAKUBOWICZ sans Jardin Majorelle, Jardin Majorelle→PB/YSL, recherche OK,
  0 err JS), round-trip OK. `scratchpad/pdfpg/p01..p04.png` = pages rendues du scan.

## L'appli — état v55 (13/07/2026) — Classement des groupes par PNB (décroissant)
- **✅ Tableau-classement compact** en tête de l'onglet 🏢 Vue 360 groupes (demande Karim « ordre
  décroissant de PNB par groupe ») : rang · groupe · nb sociétés · PNB · % du total · % cumulé.
  Les cartes étaient déjà triées ainsi ; ce tableau donne le classement d'un coup d'œil.
- **Classement (post-correction Menara)** : 1. ALSA 1,23 M · 2. JAKUBOWICZ 977 k · 3. EL BAROUDI
  548 k · 4. LAKHMIRI 356 k · 5. CARTIER 341 k … **ZAHID retombe 12ᵉ (131 k)** à cause de Menara
  Real Estate −502 k. Top 3 = 52 % du PNB des groupes. Total groupes 5,31 M. Validé headless (0 err JS).

## L'appli — état v54 (13/07/2026) — Bandeau PNB négatifs (Client 360) + tentative IdSAB photos
- **✅ Bandeau « PNB négatifs » en tête du Client 360** (Karim : « je ne vois pas encore les PNB
  négatifs, mentionne-les ») : bloc rouge calculé en direct depuis C360 listant tous les clients à
  PNB < 0, avec total. Actuellement **1 client = Menara Real Estate −502 k (ASM)**. Note : le
  scorecard officiel en compte 2 (base 222), le 2ᵉ est hors du tableau détaillé (218). Auto-adaptatif
  si un autre négatif apparaît. Validé headless (0 err JS).
- **⛔ IdSAB depuis les photos — NON livré (fiabilité insuffisante)** : test de transcription page 1
  recoupé aux 92 IdSAB connus (`IDS`) → **désalignements ligne/numéro** (ex. valeur lue pour
  « MAZAYA BINAA » en conflit avec l'IdSAB connu). À la résolution des photos, l'alignement sur ~200
  lignes n'est pas garantissable → refus de livrer des IdSAB faux pour un outil d'oral. **La recherche
  par IdSAB reste à 92/218.** Pour compléter proprement : Karim doit fournir la **colonne « id SAB » de
  l'Excel PNB** (export CSV `id SAB` + `Nom`, ou captures nettes de toutes les lignes) → mapping exact
  des 218 en un coup.

## L'appli — état v53 (13/07/2026) — Propagation Menara + outil de recherche société→secteur
- **✅ Propagation de la correction Menara** (demandée par Karim « remets tout à jour y compris présentation
  et note de synthèse ») : **Note de synthèse** — « PNB global −3,7 % » → **−14 %** (cohérent avec l'officiel
  et l'onglet Évolution). **Présentation** vérifiée : elle citait déjà le 8,8 M officiel + « Menara Prefa »
  (positif, entité différente) — pas de chiffre stale à corriger.
- **✅ Nouvel outil de recherche société → secteur** (demande Karim) : en tête de l'onglet 🏭 Par secteur,
  une barre de recherche. On tape un **nom** OU un **IdSAB** → tableau : Société · IdSAB · **Secteur
  d'activité** · Groupe · PNB. Construit depuis l'objet `IDS` (nom→IdSAB) de l'appli croisé à sect_map +
  group_map + C360. **92/218 sociétés ont un IdSAB** dans l'appli (recherche par nom OK pour les 218) ;
  pour couvrir les 126 restantes en IdSAB il faudrait transcrire la colonne IdSAB des 4 pages du répertoire.
  Ex. « 10069170 » ou « MENARA REAL » → MENARA REAL ESTATE · Promotion immobilière · ZAHID · −502 k.
- Validé headless (recherche nom + IdSAB OK, note −14 %, 0 err JS), round-trip OK.

## L'appli — état v52 (13/07/2026) — 🔴 CORRECTION MAJEURE : Menara Real Estate = PNB NÉGATIF −502 259 DH
- **Karim a détecté une erreur de signe** (preuve Excel, cellule G223 = −502259,09) : j'avais transcrit
  Menara Real Estate en **+502 259** au lieu de **−502 259** (PNB NÉGATIF). Ma base avait donc **0 négatif** ;
  c'était faux. Menara Real Estate est **l'un des clients à PNB négatif du scorecard** (passé de +1 396 565
  en 2025 à −502 259 en 2026 : baisse ET passage en négatif — probable provision/reprise d'agios).
- **Correction en cascade (tout recalculé)** :
  - **Base PNB** : Menara −502 259 ; total base **9,33 M → 8,33 M** (se rapproche de l'officiel 8,8 M).
  - **Client 360** : Menara en bas de tableau, PNB en **rouge −502 k**, % cumulé « — », évol −136 %.
    Pareto recalculé sur le PNB positif (N50=9, N80=26 conservés). Filtre « PNB nul » = strictement 0
    (Menara négatif n'est plus compté comme nul).
  - **Bandeau v44 + 1 flashcard + 1 quiz** qui affirmaient « Menara positif / évolution négative » →
    **corrigés** : Menara = PNB négatif (distinction PNB négatif vs simple baisse conservée, Menara sert
    d'exemple du négatif). Réponse du quiz basculée de « Positif » à « Négatif (−502 259) ».
  - **Par secteur** : Promotion immobilière devient **nette négative (−464 k)** (Menara la plombe) ; total 8,33 M.
  - **Vue 360 groupes** : ZAHID **633 k → 131 k** ; ALSA devient 1er groupe par PNB. KPI PNB cumulé 6,3→5,3 M.
  - **Évolution PNB** : base 9,69→**8,33 M (−14 %)** (au lieu de −3,7 %, colle désormais à l'officiel) ;
    Menara = 1ʳᵉ baisse **−1 898 824** (passe en négatif).
  - Toutes les mentions « 9,33 M » (base recalcul) → « 8,33 M » (sauf le distracteur de quiz).
- ⚠️ Le scorecard officiel indique **2 clients à PNB négatif** (base 222) : Menara en est **1 identifié** ;
  le 2ᵉ est hors du tableau détaillé (218 clients). Les compteurs « 2 négatifs » du scorecard restent.
- Validé headless (Client 360 Menara −502 k rouge, secteur Promo négatif, ZAHID 131 k, 0 err JS), round-trip OK.

## L'appli — état v51 (12/07/2026) — Fiche « Projet Vision BMCI » (Cahier d'oral)
- **✅ 5 photos « Projet Vision BMCI 2025 — Guide d'entretien des Ambassadeurs »** (démarche de
  transformation culturelle BMCI ; signature « collaborateurs engagés, audacieux et tournés vers
  l'avenir »). Karim y a participé comme **ambassadeur** (entretiens sur une expérience d'équipe
  engagée/audacieuse) ; ses réponses manuscrites : 3 souhaits = **Responsabiliser · Synergie
  siège↔réseau · Confiance**. Karim : « casez ces documents là où ils devraient être logiquement ».
- **Placement** : nouvelle fiche **🌟 VISION** dans le **Cahier d'oral** (nouvelle section
  « VII · Vision & valeurs »), 22 fiches désormais. Contenu : contexte Projet Vision + sa participation
  d'ambassadeur + facteurs clés de succès (engagement individuel/collectif, entraide, fiabilité,
  dépassement, solutions audacieuses) + ses 3 souhaits + réflexe oral (« ces 3 leviers = le rôle
  d'un directeur de CAF : responsabiliser, lien siège-réseau, piloter par la confiance »).
  Nom de l'interviewé volontairement gardé générique (« un directeur régional »). Validé headless
  (fiche s'ouvre au clic, 0 err JS), round-trip OK.

## L'appli — état v50 (12/07/2026) — Vue 360 groupes : cohérence PNB↔crédit + groupes non renseignés corrigés
- **✅ Re-contrôle Karim (« certains groupes pas renseignés »)**. Cause trouvée : le crédit était
  rattaché via les **parenthèses de l'engagement** et le PNB via le **répertoire** → divergences.
  Corrigé : **tout rattaché par le répertoire (source unique)**, parenthèses en secours seulement.
- **2 erreurs de rattachement corrigées** : **Menara Real Estate** (mis à tort en LAHLOU) →
  **ZAHID** (Menara), et **Jardin Majorelle** dont le crédit partait en PB/YSL revient à
  **JAKUBOWICZ** (cohérent avec son PNB). ZAHID passe à 13 sociétés / 345 M consolidé.
- **Groupes sans ligne de crédit affichés explicitement** (au lieu d'un vide) : 5 groupes
  (ROBBEZ MASSON, PB/YSL, PEREZ, SMIRI, LAHLOU) → note « Aucun engagement — dépôts/flux » ou
  « engagements globaux X M, détail non disponible » selon le cas. 24 groupes avec détail crédit.
- Validé headless : 29 cartes, 24 crédit + 5 notes, 0 err JS, round-trip OK.

## L'appli — état v49 (12/07/2026) — Vue 360 groupes : détail des lignes de crédit par société + consolidé
- **✅ Demande Karim** : pour chaque groupe, le **détail des lignes de crédit par société ET consolidé**.
- **Source** : datasets d'engagements `ENG` / `ENG_ASM` / `ENG_HAJ` (3 RM) — ils contiennent déjà, par
  société, le **détail des lignes** (CONFIRMING, FC, EPC, CADIV, CBM, CMT, Leasing, AVAL, CREDOC/REFI,
  CPI…) + montant + échéance, et **le groupe entre parenthèses** dans le nom (« ALSA AL BAIDA (ALSA) »).
  Parsé + rattaché au groupe → `scratchpad/group_credit.json`. **24 groupes** avec lignes détaillées,
  18 engagements hors-groupe (indépendants). Total lignes détaillées ≈ **1 215 M**.
- **UI** : dans chaque carte de l'onglet 🏢 Vue 360 groupes, sous le tableau des sociétés, nouvelle
  section **« 💳 Lignes de crédit — détail par société · consolidé XX M »** : par société engagée,
  montant + échéance + chargé d'affaires + **chaque ligne en chip** (type + montant). Ex. ZAHID 345 M
  consolidé (Menara Prefa 160 M : FC 19M/EPC 35M/CDIV 30M/CMT 28,8M/CBM 35M/Leasing 12,4M ; Carrière
  & Transport Menara 120 M ; Menara Real Estate 62 M ; Menara Transport 3 M). 5ᵉ KPI ajouté
  (« Lignes crédit détaillées »). Validé headless (29 cartes, 24 sections crédit, 0 err JS), round-trip OK.

## L'appli — état v48 (12/07/2026) — Chaque cadran Synthèse → liste des 80 % (Pareto)
- **✅ Demande Karim (5 captures)** : « je ne veux pas ces vues [fiches texte], je veux pour chaque
  cadran la liste des 80 % ». Les tuiles scorecard ouvraient une fiche explicative → remplacées par
  la **liste Pareto 50 %/80 %** des clients sous-jacents (comme le PNB).
- **Correspondances trouvées** (exactes) : **CMT 211 M = champ cmt** ; **Court terme 326 M =
  Overdraft + Autres CCT + Factoring** (composite ovd+cct+fact) ; **Ressources 336 M ≈ DAV**
  (dépôts à vue ; les DAT ne sont pas détaillés par client dans la base → signalé dans le pop-up).
  Helper générique `paretoList(acc,label,sub)` : trie, calcule n50/n80, tableau surligné 🟩/🟨.
- **Routage** : Ressources→80 % DAV · Court terme→80 % composite CT · CMT→80 % cmt · PNB &
  Concentration→80 % pnb (+ liste PNB nul) · Production neuve→liste des **clients à PNB sans
  engagement** (gisement, « 80 % » impossible car production nulle) · Clients PNB nul→liste.
- **Ratios sans liste 80 %** (honnête) : Trade (refi/crédoc), Taux de tirage, Dormantes, Clients
  en base → restent une fiche courte expliquant *pourquoi* pas de liste (ce sont des ratios/totaux,
  pas une somme répartie par client) + renvoi vers Autorisations/Utilisations. Échues→renvoi onglet
  Engagements/Alertes. Validé headless (Ressources 154, Court terme 49, CMT 12, Production 130 ;
  0 err JS), round-trip vérifié.

## L'appli — état v47 (12/07/2026) — Vue 360° par Groupe d'Affaires
- **✅ Nouvel onglet 🏢 Vue 360 groupes** (menu Portefeuille, après « Par secteur »). Demande de
  Karim : une vue 360° par **Groupe d'Affaires** (BERRADA, ZAHID/Menara, ALSA, PB/YSL, OUMAASSOU…)
  avec, pour chaque groupe, ses **sociétés** + **secteur** + en cumul **PNB, engagements
  (autorisations), utilisations** et **taux d'utilisation**.
- **Source** : colonne « Groupe d'Affaires » des 4 pages du répertoire → `scratchpad/group_map.csv`
  (109 sociétés, **29 groupes**). Croisé au **PNB** (C360) et aux **engagements/utilisations**
  (dataset AUT) de la base → `scratchpad/group_360.json`. 10 sociétés sans PNB ni AUT (affichées
  à 0, hors base).
- **Chiffres clés** : 29 groupes · PNB cumulé 6,3 M · engagements 1 063 M · utilisations 662 M.
  **ALSA** = 1er par PNB (1,2 M, 12 sociétés, 181 M autorisés, tx 71 %). **ZAHID/Menara** = 1er
  par engagements (196 M autorisés, 12 sociétés, tx 42 %). JAKUBOWICZ (Jardin Majorelle) tx 100 %.
- **UI** : panneau `#p-grp`, cartes dépliables (`<details>`) par groupe (triées par PNB), tableau
  société/secteur/PNB/engagement/utilisation, + bandeau synthèse et insight risque « vue
  consolidée groupe ». Construit sur main courant (v46). Validé headless (29 cartes, expand OK,
  0 err JS), round-trip de déchiffrement vérifié.
- ⚠️ Le rattachement société→groupe vient du répertoire (transcription photo) — fiable sur les
  grands groupes ; à vérifier au cas par cas pour les petites entités.

## L'appli — état v46 (12/07/2026) — Fiches détail cadrans « polies »
- **✅ Fix affichage « cassé » des pop-ups scorecard** (Karim, capture : la fiche « Court terme »
  s'affichait comme une simple boîte blanche titre+texte, perçue comme cassée/inachevée).
  Vérifié d'abord headless (mobile 390 px) : **aucun bug technique** — les 18 pop-ups s'ouvrent,
  0 vide, 0 débordement, 0 erreur JS ; c'était donc un souci d'apparence, pas de code.
  **Fix** : les fiches texte de `synDetail` (Ressources, Court terme, Production, Échues, Trade,
  Taux tirage, Dormantes, Clients base/nul) ont désormais un **bandeau d'en-tête dégradé
  navy→vert** avec la **valeur en gros + le libellé**, puis un corps propre (💡 + explication),
  cohérent avec le reste de l'appli. Capture de contrôle OK. Validé headless (0 err JS).

## L'appli — état v45 (12/07/2026) — Synthèse : PNB unique + tous cadrans cliquables
- **✅ Dédoublonnage des cadrans de la page Synthèse** (demande de Karim sur capture) : la page
  affichait **2 PNB** (tuile `#cafViz` « 8,8 M PNB cumulé » officielle + carte `#kpis`
  « 9 334 099 DH PNB cumulé 04/26 » recalculée) et **2 CMT** (« 211 M » / « 211,1 »).
  → Supprimé du bloc `#kpis` les cartes **PNB** et **Encours CMT** (doublons). Il ne reste
  **qu'UN cadran PNB = 8,8 M (le chiffre à annoncer)** et un seul CMT.
- **✅ Tous les cadrans cliquables (œil 👁 → détail)** : les 8 tuiles scorecard (`#cafViz`)
  étaient statiques → rendues cliquables via `synDetail(key)`. Le cadran **PNB** (et
  « Concentration ») ouvre un pop-up « **PNB — le chiffre à annoncer** » : rappelle 8,8 M / −14 %,
  puis liste **50 %/80 % (Pareto)** des clients + un **tableau des clients à PNB nul**
  (réactiver/sortir). CMT → concentration CMT. Les autres tuiles (Ressources, Court terme,
  Production, Échues, Trade) + les cartes `#kpis` sans champ (Taux tirage, Dormantes, Clients
  base, PNB nul) ouvrent une fiche explicative courte (argument d'oral). Aucun doublon restant.
- Construit **sur le main courant (v44)** — préserve v41 secteur + v42/43/44. Validé headless :
  8 tuiles cliquables, 10 cartes kpis (PNB & CMT retirés), pop-up PNB OK (50/80 + PNB nul),
  **0 erreur JS**, round-trip de déchiffrement vérifié.

## L'appli — état v44 (11/07/2026)
- **✅ Clarification PNB officiel vs recalcul interne** (Karim a repéré l'écart 8,8 M / 9,33 M
  et soupçonnait un bug de PNB négatif compté en positif). Vérifié : **0 PNB négatif** dans le
  tableau des 218 clients (Client 360) — pas de bug d'`abs()`. L'écart est un **écart de
  périmètre déjà connu** : 8,8 M (8 829 579 DH, −14 %) = chiffre **officiel** du scorecard
  (222 clients, inclut 23 inactifs + **2 clients à PNB négatif non identifiés nominativement**) ;
  9,33 M = **recalcul interne** sur les 218 clients du tableau détaillé (sert aussi de base à
  l'onglet Par secteur). **Menara Real Estate n'est PAS un des 2 PNB négatifs** : son PNB 2026
  est positif (502 259 DH) mais en forte baisse vs 2025 (1 396 565 DH), soit −894 306 DH —
  évolution négative ≠ PNB négatif. **Décision : retenir et citer à l'oral uniquement 8,8 M
  / −14 %** (jamais 9,33 M). Ajouts pour lever toute ambiguïté définitivement :
  - Bandeau d'alerte rouge en tête du tableau **Client 360** avec les deux chiffres et la
    distinction PNB négatif/évolution négative.
  - 2 nouvelles **flashcards + 2 questions de quiz** (rubrique Scorecard) verrouillant le
    chiffre 8,8 M et la distinction PNB négatif/évolution négative.
  Validé headless (0 err JS, 121 flashcards, 301 questions de quiz). Rebasé et réappliqué sur
  la version v41 PNB par secteur COMPLET (voir note collision multi-sessions ci-dessous).

## L'appli — état v43 (11/07/2026)
- **✅ Fix bug d'affichage Flashcards** (signalé par Karim : « pas bien cadrées »). Cause
  identifiée : `#fcQ`/`#fcA` sont en `display:flex` mais le contenu (texte + balises `<b>`)
  était injecté tel quel sans conteneur bloc → chaque fragment de texte devenait son propre
  **élément flex** (comportement flex par défaut sur du contenu non enveloppé), d'où un texte
  éclaté en colonnes façon puzzle sur les cartes à réponse longue (ex. cartes Scorecard,
  Management). **Fix** : le contenu est désormais injecté dans un `<div>` unique par face
  (un seul élément flex, texte qui s'enroule normalement) + petit ajustement de hauteur de
  carte auto-adaptatif (`fitFcCard()`, plafonné à 60 % de la fenêtre) en filet de sécurité pour
  les réponses très longues. Vérifié sur les 119 cartes (0 dépassement, 0 erreur JS), y compris
  les 5 plus longues (Scorecard ×3, Management ×2). Aucune régression sur les cartes courtes.

## L'appli — état v42 (11/07/2026)
- **✅ Cahier d'oral — Q21 « Quel est votre style de management ? »** (21 fiches). Sujet
  sensible traité : Karim porte une étiquette de management « dur/tyrannique » (racontars de
  détracteurs). Reformulé en réponse **indirecte** (le jury demandera probablement le style de
  management, pas l'étiquette frontalement) : distinction **bonne foi** (accompagnement) vs
  **mauvaise foi contagieuse** (deux choix — subir avec des résultats décevants pour la DG, ou
  réagir avec justesse/pragmatisme) → « une main ferme, dans un gant de velours », clôture sur
  **équité**. Réflexe imposé : ne jamais citer de cas individuel identifiable (ni fonction, ni
  service, ni origine) — leçon tirée du 1er jet de Karim qui citait un cas précis (CA à 34 % de
  scorecard, une cheffe de service) : trop identifiable, à proscrire à l'oral. Bascule prévue
  sur la question directe (« on dit que vous êtes dur ») si le jury la pose quand même. Inséré
  en section I (Posture & motivation), après Q2. Validé headless (0 err JS, clic/dépliage OK).
  ⚠️ **Homonymie à noter** : ce Q21 (fiche du Cahier d'oral) est SANS RAPPORT avec le
  « Q21 de l'entretien blanc » cité dans les points en suspens ci-dessous (question CMT/90
  premiers jours, déclenchée par « Repose Q21 » en conversation) — deux numérotations
  différentes qui coïncident par hasard. Pas de renumérotation faite (impact mineur), mais
  à garder en tête pour éviter toute confusion avec Karim.

## ⚠️ Collision multi-sessions résolue (12/07/2026)
Pendant que ce fil construisait le v41 « PNB par secteur » (nominatif 159/166, Travaux publics
en agrégé faute de 4ᵉ page), un autre fil a reçu la 4ᵉ page manquante et livré un **v41 COMPLET**
(187/218, Travaux publics + Transports nominatifs) directement fusionné sur `main` (PR #177).
Les deux fils avaient donc chacun modifié le même fichier chiffré `public/dcaf/index.html` en
parallèle → conflit de fusion sur la PR #175 au moment du merge. **Résolution** : re-parti de
`origin/main` (qui contient le v41 complet, la version à conserver), et **réappliqué
chirurgicalement** par-dessus les 3 correctifs de ce fil (v42 Q21, v43 fix flashcards, v44
clarification PNB) — aucune perte des deux côtés, validé headless après fusion (0 err JS,
121 flashcards, 301 quiz, section Par secteur complète intacte). **Rappel COLLAB-IA** : une
seule IA par branche à la fois ; en cas de nouvelle divergence, repartir de `origin/main` et
refusionner comme fait ici.

## L'appli — état v41 (11/07/2026) — PNB par secteur COMPLET (4 pages du répertoire)
- **✅ PNB par secteur — LIVRÉ COMPLET.** Karim a envoyé les **4 pages photos** du répertoire
  (IdSAB + Nom Abrégé + Seg + **Secteur Activité** + Total AUT), dont **la 4ᵉ page — celle
  qui manquait — contenant les clients « Travaux publics » ET « Transports terrestres &
  aériens » nominativement**. Transcription des 4 pages → `scratchpad/sect_map.csv`
  (17 secteurs), croisement par nom normalisé avec la base PNB avr-26 (`sect_pnb.json`).
- **Résultat : 187/218 clients rapprochés.** Les 31 non rapprochés sont des clients **hors
  répertoire** (écart base 218 vs répertoire ~187) et pèsent **0,5 % du PNB** (regroupés en
  « Non classé »). PNB total base = **9 334 098 DH**.
- **Classement secteurs par PNB** (onglet 🏭 Par secteur, nouvelle section « 📊 PNB par
  secteur — CALCULÉ ») : **Travaux publics 17,2 % (1,60 M, 25 cl) · Transports terrestres &
  aériens 15,7 % (1,46 M, 12 cl) · Industrie alim. & commerciale 15,3 % · Activités services
  13,4 %** → **top 4 = 61,6 %**. Sphère construction/BTP (TP + Promo immo + Carrières +
  Commerces équip./matériaux) ≈ **31 %** = 1ère concentration sectorielle.
- **Plus fait en v41** : section « 🔎 Détail par secteur » — chaque secteur dépliable
  (`<details>`) montre ses top clients (jusqu'à 80 % du PNB du secteur) **avec badge posture**
  (Augmenter/Stabiliser/Réduire) + croisement **secteur × posture** (PNB par posture).
  Cette version **remplace** la section « nominatif 159/166 / Travaux publics agrégé » qui
  avait été poussée en parallèle sur `main` (47657ce) **sans la 4ᵉ page** — l'ancienne était
  incomplète, la v41 finale la supersede avec les données complètes.
- Construit **sur le fichier main actuel** (préserve tout le reste), section secteur
  échangée chirurgicalement. Validé headless (0 erreur JS, Client 360 intact, 187/218
  affiché, Segments préservés), round-trip de déchiffrement vérifié avant déploiement.
- ⚠️ **Collision multi-sessions** : un autre fil a poussé un v41 en direct sur `main` pendant
  ce travail. Rappel COLLAB-IA : une seule IA par branche. Si nouvelle divergence, repartir
  de `origin/main` et re-fusionner comme fait ici.

## L'appli — état v40 (11/07/2026)
- **v40 — Posture commerciale par client (Client 360)** : intégration de la feuille
  « posture commerciale » du CA (65 clients ciblés). Nouvelle colonne **Posture** dans
  l'onglet 👤 Client 360, avec badge couleur : ▲ **Augmenter** (vert #00915A, développer
  l'encours/PNB) · ● **Stabiliser** (or, maintenir) · ▼ **Réduire** (rouge, sortir/alléger
  le risque) · « — » = client non listé sur la feuille. Colonne triable (Augmenter>Stabiliser>Réduire).
  Bandeau de synthèse en tête : 3 cartes (nb clients + PNB + % du total) par posture.
  66/218 clients de C360 rapprochés par nom normalisé (seul « CARRIPREFA » non retrouvé
  côté C360 — c'est un client d'engagement Hajjani). Validé headless : 0 erreur JS.
- **⏳ PNB par secteur — À CONSTRUIRE en v41 (décision 11/07 au soir)** : Karim confirme
  qu'il a envoyé **tout ce qu'il a** — les pages ne sont PAS illisibles, mais le secteur le
  plus lourd **« Travaux publics » (29 clients)** n'est **itemisé sur aucune page** (il
  n'existe que dans le total de la synthèse), idem pour la réconciliation « Transports ».
  → **DÉCISION** : ne plus attendre de page manquante. Construire le PNB par secteur avec
  **les secteurs itemisables** (liste nominative disponible) et marquer **« Travaux publics »
  + « Transports » en “niveau agrégé seulement”** avec une note honnête (pas de chiffre
  inventé). Prochaine étape concrète de reprise = coder cette vue « Par secteur » enrichie
  et la déployer en v41.

## L'appli — état v39 (11/07/2026)
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
- 🔓 **Ouverture automatique RÉ-ACTIVÉE (v25)** : à la demande de Karim (« je ne veux plus
  taper le mot de passe »), le wrapper ouvre de nouveau la page automatiquement par lien
  (`#clé`) et par souvenir (localStorage `dcafpw`). Zéro saisie pour lui ; **les données
  restent chiffrées** : un tiers sur l'URL nue voit l'invite mot de passe. ⚠️ Karim avait
  d'abord demandé de SUPPRIMER toute protection — refusé (secret bancaire, données ~200
  clients sur site public) et remplacé par cette option 1 (auto-open chiffré).
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
- 11/07/2026 : v41 — nouvelle section **💰 PNB par secteur d'activité (nominatif)** dans l'onglet
  🏭 Par secteur : croisement du PDF répertoire (client→secteur) envoyé par Karim avec la base
  PNB de l'appli, 159/166 clients rapprochés sur 15 secteurs itemisables (6 275 852 DH, 67,2 %
  du PNB base app). Travaux publics (29 clients) toujours marqué agrégé seulement (aucune liste
  nominative reçue) ; Transports terrestres & aériens affiché en partiel (8/12 clients). Rien
  d'inventé/estimé. Validé headless (0 err JS).
- 11/07/2026 : v39 — onglet **🏭 Par secteur** (Portefeuille) d'après le répertoire (Doc 2/3, 200 clients) : répartition par **secteur d'activité** (17 secteurs, Travaux publics 15 %, ~40 % BTP), **posture** (Augmenter 77 % / Stabiliser 19 % / Réduire 5 %), **couverture engagement** (66 % SANS engagement = gisement production), **segments officiels** (CO1 106/CO2 63/MNC1 25/MNC2 4/II 2). Écart de périmètre signalé (200 vs 222 base PNB). +5 flashcards +5 quiz. Doc 1 = engagements (déjà intégrés). Validé (0 err JS).
- 11/07/2026 : v38 — onglet **🔰 Basic COMEX** (sous Réviser) : 6 fiches ultra-simples néophyte (CREDOC, REMDOC, REFI, AENG, AVAL, documents à contrôler) d'après notes + circulaires, avec **export par fiche PDF / Word / Image** + tout-en-un. Données CAF laissées en Portefeuille. Validé (0 err JS).
- 11/07/2026 : v37 — **référence AUTONOME « Commerce international »** (Karim : atteindre l'expertise + page détachable). Page **publique non chiffrée** (que du savoir, aucune donnée client) : `public/commerce-international/index.html` → `/commerce-international/`. Expert sourcé : instruments, **UCP 600 + ISBP 821 (2023)**, URC 522, URDG 758, **Incoterms 2020**, **IGOC 2026 Office des Changes Maroc (1er janv. 2026)**, SMAEX, annexe documents, fraude Qingdao, glossaire, **quiz 8 Q**, podcast. Bouton **« 🌍 Réf. Commerce int'l ↗ »** dans le DCAF (nouvel onglet). Valeurs IGOC à confirmer sur oc.gov.ma (signalé). Validé (0 err JS).
- 11/07/2026 : v36 — nouvel onglet **🌐 COMEX** (commerce international) à partir du fichier
  `COMEX_FINEX.ods` de Karim + **recherche sources officielles** (ICC UCP 600 credoc / URC 522 remise doc /
  SMAEX ; cas Qingdao 2014 réel). Contenu : comparatif des 4 instruments (virement/REMDOC/CREDOC/AENG),
  fiche de révision enrichie, **annexe documents par instrument** (objet + points de contrôle), cas de
  fraude (SOMIA note interne + Qingdao sourcé), **2 écarts signalés** (REMDOC « 50 % garantie » vs URC 522
  banque = intermédiaire ; AENG export « rembourse le partenaire étranger » = logique import → à reclarifier),
  + **podcast spécial COMEX** (fiche NotebookLM + dialogue, boutons copier). Injecté aussi **+12 flashcards +
  9 quiz** rubrique 🌍 Trade Finance. Théorie sourcée, rien inventé ; règles BMCI (J+120) = notes de Karim.
  Validé headless (0 err JS). Wrapper anti-cache (swfix) conservé.
  ⏳ Écarts à confirmer avec Karim sur sa doc BMCI.
- 10/07/2026 : v35 — nouvel onglet **🎙️ Podcast** (dupliquer l'expérience NotebookLM de
  Karim) : (1) **fiche maître** = document source complet en 10 sections à coller dans NotebookLM pour
  qu'il génère son podcast à deux voix ; (2) **ma version** = dialogue écrit à deux voix (Yasmine &
  Mehdi, ≈10 min). Chacun avec **bouton « copier »** (clipboard + fallback execCommand) + mode d'emploi
  NotebookLM. Confidentiel (dans le blob chiffré). Option version anonymisée dispo sur demande. Validé
  headless (0 err JS). NB : Karim a beaucoup aimé le podcast NotebookLM.
- 10/07/2026 : v34 — nouvel onglet **📄 Note de synthèse** : compte rendu complet consolidant tous les
  chiffrages et analyses — **synthèse en tête** (hero : KPIs + 3 messages clés + 5 axes) puis 8 sections
  détaillées (scorecard complet, clients/segments, par-CA, concentration Pareto, évolution annuelle,
  trade, risques départ/échus/utilisation, points forts→plan) + conclusion. **Bouton Export PDF**
  (fenêtre d'impression A4 portrait). Confidentiel (reste dans le blob chiffré). Validé headless
  (0 err JS, 10 sections, 5 tableaux, PDF A4 OK).
- 10/07/2026 : v33 — présentation refondue (18 slides). (1) **Page d'accueil présentation étoffée** :
  la slide « chiffres clés » scindée en **2 slides scorecard** (« les masses » = PNB/DAV/DAT/ressources/
  overdraft/CCT/factoring/CMT/CPI/production avec obj·réalisé·TRO·vs2025 · « activité & qualité » =
  prospection EER/visites/couverture + équipement + auto-util + KPI qualitatifs échus/PRG/RMPM) → aucune
  rubrique du scorecard oubliée. (2) **chaque slide d'agrégat affiche la LISTE du top 80 %** (poids
  individuel + % cumulé, calcul live, 2 colonnes si >12) — le club 50 % surligné. (3) **fix listes
  coupées** : dossiers échus refait avec **les 26 échus en 2 colonnes** (plus de troncature), risque
  concentration ajusté ; tous les slides tiennent dans le 16:9 (overflow ≤3px vérifié). Validé headless
  (0 err JS, 18 slides, PDF paysage OK).
- 10/07/2026 : v32 — (1) **segments renommés** CO2/CO1/MC1/II/MC2 (ex-E2/E1/I1/ELS/I2), 222 clients
  vérifiés. (2) **CAF en chiffres = page d'accueil scorecard exhaustive** dans l'ordre PNB → agrégats
  cumulés → ressources détail → emplois/remplois détail → prospection (EER 110/visites 127/couverture
  81) → équipement 2,32 → KPI qualitatifs (échus réactif 6 %, 26 autoris. échues 836 M, PRG 59, RMPM 92,
  2 PNB nég). (3) **Présentation refondue → 17 slides** : une page par agrégat (①PNB ②DAV ③Overdraft
  ④CCT ⑤CMT ⑥Factoring) avec glissement an + objectif/TRO/production + concentration 50/80 ; + slide
  **taux d'utilisation** (64 %, 496 M dormants, dépassements) ; + slide **dossiers échus** (26/836 M avec
  échéances et poids) ; + slide **risque de concentration** (départ top1 −10,6 % / top3 −27,5 % / top10
  −53,5 %). (4) **Visuel CAF (dashboard hero + tuiles)** ajouté en tête de la page d'accueil (Synthèse).
  Fix : suppression des 2 slides « grandes masses » redondantes. Validé headless (0 err JS, 17 slides,
  PDF paysage OK). Données : échus = ENG (dates), utilisation = AUT, risque départ = PNB.
- 10/07/2026 : v31 — gros lot (demande Karim). (1) **CAF en chiffres enrichi** : bloc **clients &
  segments** (E2 50 %, I1 22 %, E1 15 %, ELS 10 %, I2 2 %), scorecard avec **objectif annuel +
  proratisé (×4/12)** + réalisé + TRO + vs 2025, **ligne rouge production** 0/130 M (proraté 43 M,
  écart −43 M), bloc **par CA** (stock DAV/OVD/CCT/CMT par RM). (2) nouvel onglet **🔍 Concentration** :
  sélecteur par rubrique (PNB/DAV/OVD/CCT/CMT/FACT), **liste des clients du 80 %** avec poids individuel
  + cumulé, seuils 50 %/80 % surlignés (calcul live). (3) nouvel onglet **🌍 Trade international** :
  11 clients (finex=refi+crédoc), aut 123 / util 80 Mmad (65 %, écart −43), **objectifs 2026 refi 225
  Mdhs (104 % ✅) · crédoc 32 Mdhs (16 % 🔴 → axe capter du crédoc)**. Source : « ETAT DES LIGNES TRADE
  CAF MARRAKECH AU 03-07-2026 ». (4) **Présentation** portée à 12 slides (+ clients/segments, + par-CA
  détail, + trade). Fix bug d'assemblage (le `</body>` dans la string presPDF cassait le script → borné
  sur `</script>`). Validé headless (0 err JS, pas de fuite de script, PDF paysage OK).
  ⏳ Pas de mars-26 (comparaison N-1 = avril-25) ; production par rubrique non dispo hors CMT+CPI.
- 10/07/2026 : v30 — (1) **recharte BMCI** : recolor global vers **vert BMCI #00915A + fond blanc**
  (navy→#00563A pour nav/entêtes, cream/paper→blanc), **or gardé uniquement pour les highlights**
  (choix de Karim). (2) Nouvel onglet **🖥️ Présentation** : diaporama projetable 9 slides (titre →
  chiffres clés → équipes → grandes masses ressources/emplois → PNB & évolution → concentration/top10
  → forces/attention → 5 axes), **alimenté par les datasets** (Pareto + top 10 calculés en direct →
  se met à jour tout seul). Navigation ←/→, plein écran, **Export PDF** (ouvre une fenêtre d'impression,
  1 slide/page A4 paysage — PDF seul, pas de PPTX à la demande de Karim). Validé headless (0 err JS,
  9 slides, PDF @page landscape OK). NB : onglet « Entretien blanc » NON créé (Karim a dit non).
- 10/07/2026 : v29 — **base PNB avril-26 vs avril-25 (glissement ANNUEL, pas mars — le doc n'a pas
  de colonne mars)** transcrite (222 lignes, `pnb_evol.csv` ; total 04/26 = 9 334 099 = identique
  à l'appli → validé). **3 volets** : (1) **CAF en chiffres refait sur le scorecard** : tableau
  objectif annuel (déduit du TRO) · réalisé avr-26 · TRO · vs N-1, + **zoom par agrégat** (PNB, DAV,
  Overdraft, CCT, CMT, Factoring) avec **concentration Pareto/club 50 %-80 %** et **répartition par
  paliers** de clients (PNB >200k/100-200/50-100/<50, paliers adaptés par agrégat). (2) nouvel onglet
  **📉 Évolution PNB** : global −3,7 % (base comparable −5,8 %), par RM (ELA +1,1 % seul en hausse ·
  ASM −4,4 % · HAJ −20,6 %), top hausses/baisses, nouveaux/perdus, concentration top3 35→27 %. Reframe
  clé : **déconcentration SUBIE (effondrement Menara Real Estate −894 k) → à rendre CHOISIE**. (3)
  **Client 360** : colonnes **PNB avr-25 + Évol. an %** (167/218 appariés) ; corrige au passage le bug
  « % cumul = undefined » (v27/v28). Validé headless (0 err JS, 10 colonnes, tri OK). ⏳ Si Karim a une
  colonne **mars-26**, refaire le comparatif en mensuel.
- 10/07/2026 : v28 — **Client 360 « version 100 % »** : CR/DB fin mai-26 désormais renseignés pour
  **les 218 clients** (avant : ~47). Transcription COMPLÈTE des flux couplés des 4 pages (255 lignes →
  `flux_all.csv`), fusion par nom normalisé avec le PNB (205 appariés + 13 sans flux couplé mis à 0).
  Plus aucun « — » dans la table. Note de bas de table mise à jour (« 100 % transcrits »). Wrapper
  auto-open inchangé (blob re-chiffré). Validé headless (218/218 flux, 0 « — », 0 err JS).
- 10/07/2026 : v27 — (1) onglet **👤 Client 360** : table client-par-client PNB + CR + DB (fin mai 2026)
  + solde CR−DB + % cumul, triable/filtrable ; **top 10 en or, club 50% (9 clients) souligné, club 80%
  (26, Pareto) fond crème** + séparateurs. PNB pour 218 clients, CR/DB pour ~46 (les gros ; reste = version
  100% sur transcription). (2) onglet **📊 CAF en chiffres** : KPIs + points forts + points d'attention
  déclinés en 5 axes d'action prioritaires (déconcentrer, produire, activer, assainir, homogénéiser).
  Validé (0 err JS). NB : entretien blanc en cours (Q1 débriefée).
- 10/07/2026 : v26 — onglet **🎯 Déconcentration** (l'axe fort du CAF) : objectif top3 <20% = +3,48 M
  sur le reste, répartition de l'effort par CA (Elantry +1,9 / Talbi +1,2 / Hajjani +0,4 M), 4 leviers
  (production neuve, activation dormantes, captation sous-captés, conquête externe), pilotage (part du
  top3/top10). Re-chiffré avec le wrapper auto-open v25. Validé (0 err JS). Entretien blanc lancé ensuite.
- 09/07/2026 : v25 — **ouverture automatique ré-activée** (lien `#clé` + souvenir localStorage) :
  plus de saisie du mot de passe ; contenu toujours chiffré (protégé pour un tiers). Suite au
  refus motivé de « supprimer toute protection » (secret bancaire). Wrapper seul modifié, blob
  chiffré inchangé. Validé (lien auto-ouvre · URL nue protégée · 0 err JS).
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
