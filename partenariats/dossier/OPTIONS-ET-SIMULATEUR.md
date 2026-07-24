# 🧠 Mémoire — Options d'accès partenaire & brief du simulateur d'avantages

> Décisions en attente + cahier des charges. Projet Cockpit #51 (mot-clé `APPORTEUR`).
> Mis à jour : 2026-07-24.

## 1. Deux options d'accès à garder en mémoire *(décision Karim)*
Comment le client/partenaire voit ses avantages :

- **Option A — Page d'avantages dédiée** *(fait, en ligne : `offre.html`)*
  Le client ouvre le **lien de son partenaire** ; il voit un mini-catalogue = **prix + avantage réservé** sur la même ligne. Pas de login.
- **Option A + login** *(à faire si retenu)*
  Même page, mais protégée par un **code partenaire** (ex. code CIMR) → sensation d'exclusivité, accès « réservé ».
- **Option B — Avantage sur le site public** *(à faire si retenu, plus lourd)*
  Quand le client navigue sur voyages21.com **via son lien**, chaque fiche produit affiche un **badge « Votre prix [PARTENAIRE] : -5 % »**. Immersif, avantage collé au produit.

➡️ **En attente du choix de Karim : A / A+login / B.**

## 2. Brief du simulateur d'avantages *(à construire)*
Un outil qui **recommande l'avantage à accorder par produit** (et ma commission DA21) selon :
- **Marge** de l'agence sur le produit → *plus la marge est confortable, plus l'avantage ET ma commission sont forts*.
- **Remplissage / places restantes** + **jours avant départ (J-)** → *quand il reste peu de places et que les ventes ont déjà été bonnes (rentabilité atteinte), déclencher du **last-minute** et brader les dernières places* — sans jamais passer sous une **marge plancher**.
- **Taille du groupe** (remise volume, gratuité 1 pour X).
- **Saison** (haute/moyenne/basse).
Sortie : avantage recommandé (%/DH), prix net client, gratuités éventuelles, ma commission, marge restante, badge « last-minute possible ».
Relié au **catalogue en direct** (data.js), dans le même style que la matrice.

## 3. Modes d'intéressement corpo à cataloguer *(recherche en cours)*
Principe contractuel voulu : *les clients corpo ont TOUJOURS de meilleurs avantages que le site public.*
Familles : remises 5-20 % (selon programme/saison), gratuités (1 pour X, seuils groupes), cadeaux/extras (dîner, excursion, surclassement, transfert VIP…), facilités de paiement, fidélité/statut, exclusivités (last-minute réservé, préventes), co-marketing/cagnotte CSE, parrainage.
➡️ Fait : `MODES-INTERESSEMENT-CORPO.md` (catalogue + 6 mécaniques prioritaires) et le simulateur en ligne.

## 4. Option C — Mini-site partenaire co-brandé *(nouvelle piste, à décider)*
URL par partenaire (ex. `voyages21.com/p/cimr`) : espace co-brandé (logo partenaire + V21),
son catalogue, ses avantages, CTA devis. Version « site à lui » de l'offre. Le plus premium.

## 5. Tombola « voyage pour deux » *(à construire sur go)*
Gagner un voyage pour 2 / à offrir à son conjoint. Lot = 1 place au prix d'achat. Collecte
d'opt-in conforme (anime la convention, qualifie les contacts). Lot de consolation (-500 DH).

## 6. Calendrier des occasions de voyage + reminder mensuel *(à construire sur go)*
Outil qui **rappelle ~1 mois à l'avance** chaque occasion qui pousse au voyage — pour
« bombarder » les partenaires d'offres : week-ends prolongés, ponts (jeudi férié), Aïd,
Saint-Sylvestre, jours fériés, été, fin d'année, rentrée, Saint-Valentin, etc. Chaque
occasion → un angle d'offre + segment cible. Alerte J-30. + une **Routine mensuelle** qui
prévient Karim des occasions du mois suivant.

## 7. RÉCAP DES DÉCISIONS EN ATTENTE (à trancher par Karim)
- Option d'accès partenaire : **A** (en ligne) / **A+login** / **B** / **C (mini-site)**
- Simulateur : version **simplifiée** (3 chiffres) ou **colonne commission** dans la matrice
- Contrat apporteur : base de commission (**% marge** ou **% CA**) + **taux** ; **durée de
  rattachement** (12/24/36 mois) ; **statut** (auto-entrepreneur/société) ; **exclusivité** oui/non
- Données adhérents : acter le montage **« relais + opt-in »** (conforme 09-08/RGPD)
- Format code apporteur : **DA21-[PARTENAIRE]** (à confirmer)
- Valider la **grille d'avantages par gamme** + remplir le **tableur** (taux par produit)
- Valider les **6 mécaniques d'intéressement** à mettre dans les conventions
- **Validation juridique** (avocat + comptable) avant signature

### Actions en attente (moi, sur go)
Tombola · mini-site partenaire (si C) · simulateur simplifié / colonne commission ·
**registre des ventes par partenaire × produit** · **calendrier des occasions + reminder** ·
PDF signable des contrats · pré-remplissage du tableur.
