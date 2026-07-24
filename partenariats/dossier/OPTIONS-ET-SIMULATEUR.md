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
➡️ Deux agents de recherche compilent le catalogue complet + le modèle de calcul du simulateur ; synthèse à intégrer ici.
