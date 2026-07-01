# Moule — Note d'analyse & décision crédit

Spécification de la page **« Note d'analyse »** de l'Analyseur Crédit, construite à partir
des modèles fournis (notes narratives négoce & industriel, catalogue des lignes de crédit,
note de synthèse BNP Paribas 7 pages, Avis Risk, Présentation Crédit / MEP + Recommandation).

> **Règles d'or**
> 1. **Jamais de blocage** : un champ vide ou une date absente n'empêche jamais la note. La phrase
>    concernée est omise ou remplacée par « non renseigné » / « demandé, non fourni ».
> 2. **Déterministe d'abord** : la note se génère instantanément à partir des données saisies
>    (privé, gratuit). Bouton optionnel **« Enrichir avec l'IA »**.
> 3. **Unité automatique** : DH / KMAD (milliers) / MMAD (millions) selon l'ordre de grandeur.
> 4. **Placement** : onglet inséré **avant « Éligibilité crédit »**.

---

## 1. Emplacement & présentation
- Onglet **« 3 · Note d'analyse »** (Dossier · Analyse · **Note d'analyse** · Éligibilité · Documents · Assistant · Veille).
- **Grande feuille façon document A4** : bloc blanc centré (≈ 820 px), interligne large, titres et
  paragraphes lisibles (pas de tableaux denses), imprimable.
- Boutons : **⬇ Exporter la note (Word)**, **Enrichir avec l'IA** (optionnel), **Actualiser**.
- **La « Décision / Recommandation » est un BOUTON À PART** : elle ne s'affiche pas automatiquement
  dans la note ; on clique **« Générer la décision »** → elle sort dans son propre bloc, avec son
  **propre export Word** (toujours exportable).

## 2. Champs de renseignement (qualitatifs, tous optionnels — non bloquants)
Regroupés dans un panneau repliable en tête de page.
- **Identité** : raison sociale, forme juridique, capital social, RC / ICE / ID, **date de création**
  (→ ancienneté), **objet social + description de l'activité**, secteur, région.
- **Actionnariat / dirigeants** : noms, âges, quotités %, groupe d'appartenance.
- **Objet du concours** : nature (exploitation / investissement), montant, durée, affectation,
  **source de remboursement**.
- **Marché / concentration** : positionnement, **principaux clients & fournisseurs + poids %**, saisonnalité.
- **Comportement bancaire** : pool bancaire, **flux confiés (% du CA / flux mensuel moyen)**,
  incidents (impayés, chèques — INT/CH), **cotation Bank Al-Maghrib**, statut **WL**, lignes en place.
- **Garanties & faits marquants** : sûretés (hypothèque, **NFDC**, **DPA**, cautions), **cautions données**
  (hors-bilan), litiges / contentieux, faits marquants (investissement récent…).
- **Pièces** : LF, SP, RCAC, BAG, tableau engagements CB… → traçage « fourni / demandé, non fourni ».

## 3. Nouveaux champs chiffrés (onglet Dossier) pour coller au moule
- **Comptes courants d'associés (CCA)** créditeurs / débiteurs → ER élargi, apports, quasi-FP.
- **Achats revendus** (négoce) → marge commerciale brute.
- **Immobilisations brutes** + **amortissements cumulés** → % d'amortissement de l'AI.
- **Redevances / annuités de crédit-bail** (déjà présent), **EENE** (déjà présent).
- **Lignes de crédit demandées** : par ligne → type, **Autorisé / Utilisé / Demandé**, échéance, bénéficiaire.
- **CA TTC** déduit automatiquement (TVA 20 % par défaut, paramétrable).

## 4. Indicateurs calculés — formules & notations
| Indicateur | Formule | Note |
|---|---|---|
| Évolution du CA | CA_n / CA_n-1 − 1 | |
| Marge commerciale brute | (Ventes − Achats revendus) / Ventes | négoce |
| Marge nette / **profitabilité** | RN / CA | |
| **ER** (autonomie) | Capitaux propres / Total bilan | |
| **ER élargi** | (Capitaux propres + CCA) / Total bilan | CCA = quasi-FP |
| Capitalisation | Capital social / Total bilan | |
| **Gearing** | Dettes de financement / Capitaux propres | |
| **Gearing élargi** | Dettes de financement / (Capitaux propres + CCA) | |
| **Net leverage** | Dette nette / Capitaux propres · et Dette nette / EBE | |
| **EBE / IBE** | Excédent (ou Insuffisance) Brut d'Exploitation | IBE si < 0 |
| Couverture des FF | EBE / (frais financiers + annuités CB) | ≈ « couvre n× » |
| **CFBE** (CFs bruts) | CAF = RN + dotations | |
| **CFNE** (CFs nets) | CFBE − variation du BFR | « en rouge » si < 0 |
| **PBP** (pay-back) | Dettes de financement / CFBE | années |
| Dette nette / EBE | (Dettes fin. − trésorerie) / EBE | |
| Rotation des stocks | Stocks / CA × 360 | jours **et** mois |
| Délai clients | Clients / CA TTC × 360 | + % du CA TTC |
| Délai fournisseurs | Fournisseurs / Achats TTC × 360 | jours **et** mois |
| Couverture du BFR par le FDR | FDR / BFR | % |
| % d'amortissement de l'AI | Amortissements cumulés / Immobilisations brutes | |
| FDR / BFR / Trésorerie nette | (haut de bilan) | « en rouge » si < 0 |

## 5. Structure de la note produite

### En-tête
Société · ID/RC · secteur & activité · **ancienneté** (depuis date de création) · actionnariat ·
exercice(s) analysé(s) · unité · date d'édition · **notation / score de solidité**.

### A. Demande *(si renseignée)*
Objet du concours + **tableau des lignes sollicitées** : Ligne | Autorisé | Utilisé | Demandé | Échéance | Bénéficiaire.

### B. Analyse financière rédigée — 4 blocs *(cœur, style des modèles)*
1. **Activité & rentabilité** — CA & évolution, marge commerciale brute, marge nette, RN vs N-1, profitabilité ; EBE **ou IBE**.
2. **Assise financière** — FP (« en rouge » si négatifs, + ancienneté du déficit), **ER / ER élargi**, capitalisation, **apports (CCA)**, endettement (nul / DMLT / CCT / CB), Gearing / Gearing élargi / Net leverage, dettes fournisseurs (+ délai).
3. **Actif immobilisé & endettement** — composition de l'AI (principalement corporel), **% amorti**, participations (TPs) & réserves éventuelles ; détail dette (DMLT, CCT, crédit-bail, lignes spécifiques).
4. **Cycle d'exploitation & équilibre financier** — stocks (KMAD, rotation j/mois), clients (% CA TTC, délai), fournisseurs (délai), **FDR vs BFR** (couverture %), **trésorerie nette** (excédentaire / « en rouge »), **CFBE / CFNE**, **PBP**.

### C. Fondamentaux financiers *(synthèse condensée)*
Paragraphe de synthèse + **✓ points forts** / **⚠ points de vigilance** + appréciation qualifiée
(**faible / moyenne / acceptable / confortable**).

### D. Relations bancaires *(si renseigné)*
Flux confiés (% du CA / flux mensuel moyen), lignes en place, comportement du compte (débiteur, ruptures),
incidents (INT/CH), statut **WL**.

### E. Décision / Recommandation — **bouton séparé** (« Générer la décision ») + **export Word propre**
- **Lignes recommandées** (mapping besoin → ligne, depuis le catalogue) avec **montant indicatif** & justification :
  - décalages trésorerie → *Facilité de caisse / Découvert / Crédit Spot* ;
  - stocks importants / import MP → *Avance sur marchandises / Refinancement import / Obligations cautionnées douane* ;
  - saisonnalité → *Crédit de campagne* ;
  - export → *Préfinancement export / Mobilisation créances sur l'étranger* ;
  - délais clients longs → *Escompte papier commercial / Affacturage* ;
  - marchés publics → *Avances sur marchés nantis + cautions* ;
  - investissement → *CMT (<7 ans) / CLT (<12 ans) / Crédit-bail*.
- **Avis motivé** : **favorable / sous réserves / défavorable** + conditions & **covenants**
  (ex. **FP/dette ≥ 100 %**, **DSCR ≥ 100 % puis ≥ 130 %**, gearing max, negative pledge, reporting).
- **Réserves & charge au gestionnaire** : conditions à remplir (régularisations, garanties, suivi d'activité).
- **Rappel décision précédente / suivi** *(si renseigné)* : réserves passées → réalisé / non réalisé.
- **Paramètres** : échéance de revue, TRG SU, notation / NC (+ statut WL).

### Pièces & mentions
Pièces fournies / **demandées non fournies** · avertissement (aide à la décision, non engageant · méthode CGNC).

## 6. Règles de rédaction / affichage
- Valeurs négatives → **« en rouge »** (FP, trésorerie, CFBE/CFNE, résultat).
- **EBE** si ≥ 0, **IBE** si < 0. Idem CFBE/CFNE.
- Montants formatés (espaces milliers, virgule décimale) · style « à/h de » toléré.
- Unité auto : DH < 1 000 000 ; KMAD ; MMAD selon l'ordre de grandeur (cohérente dans toute la note).
- Champs manquants : phrase omise ou « non renseigné / demandé, non fourni » — **jamais de blocage**.

## 7. Périmètre technique
- **Confiné à `credit-analyzer/`** : `engine.js` (indicateurs + reco lignes), `app.js` (rendu feuille + export Word),
  `index.html` (onglet + panneau champs). IA optionnelle via `/api/credit/chat` (déjà en place, en flux).
- **Zéro impact** sur le site voyages21.

## 8. À confirmer (défauts proposés)
- **A.** ~~La note inclut la section Décision~~ → **DÉCIDÉ** : la **Décision / Recommandation** est un
  **bouton séparé** (« Générer la décision ») avec son **propre export Word**, distinct de la note d'analyse.
- **B.** Génération **déterministe** + bouton **« Enrichir avec l'IA »**. *(défaut : oui)*
- **C.** Nouveaux champs chiffrés (CCA, achats revendus, immo brutes+amort) ajoutés à l'onglet Dossier. *(défaut : oui)*
