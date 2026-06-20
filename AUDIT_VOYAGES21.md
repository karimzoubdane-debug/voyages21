# Audit Voyages21 — diagnostic de stabilisation

Date : 2026-06-20
Branche de documentation : `docs-roadmap-stabilisation-v21`

## Objectif du document

Ce document sert de mémoire projet pour les agents IA et pour Karim. Il décrit l'état du site, les anomalies constatées, les causes probables et la logique de correction prudente.

Il ne modifie pas le site visible.

## État général observé

Le site Voyages21 est composé de plusieurs couches :

- `main` : branche officielle actuelle.
- `src/app/page.jsx` : redirection de la racine vers la cover Été 2026.
- `public/cover-ete-2026.html` : page d'entrée / cover.
- `public/design/homepage-v2-luxe.html` : homepage luxe.
- `public/BROCHURE_VOYAGES21_AVEC_IMAGES_V7.html` : brochure / catalogue.
- `public/voyages/data.js` : source principale des données voyages.
- `public/voyages/*.html` : fiches produits individuelles.
- `public/voyages/destinations/*.html` : pages de catégories et destinations.
- `public/admin-medias.html` : admin médias actuel.
- PR #42 : chantier admin propriétaire / CMS produits / médias sécurisés.

## Diagnostic visuel et ergonomique

La direction visuelle est premium : noir, crème, or, navigation fixe, homepage luxe, hero vidéo, typographies élégantes.

Points positifs :

- identité visuelle haut de gamme ;
- vraie richesse de contenu ;
- nombreuses fiches voyages ;
- navigation par destinations ;
- base média et CMS en cours ;
- logique future permettant de gérer les produits sans revenir au code.

Points faibles :

- parcours visiteur encore confus : cover, homepage luxe, brochure, fiches ;
- CTA d'entrée peu explicite commercialement ;
- navigation riche mais pas toujours synchronisée ;
- plusieurs sources de contenu à maintenir en parallèle ;
- risque de régression élevé lorsqu'une IA modifie un gros fichier HTML.

## Anomalies constatées

### 1. Accents cassés

Des textes affichent parfois `�`, par exemple `Croisi�res` au lieu de `Croisières`.

Gravité : élevée, car c'est immédiatement visible pour le client.

Cause probable : caractères français importés ou sauvegardés avec un encodage incompatible malgré les pages déclarées en UTF-8.

Correction recommandée : PR dédiée uniquement aux accents cassés.

### 2. Fichier `acceuil-v21-maroc.html`

Le fichier contient une faute dans son nom : `acceuil` au lieu de `accueil`.

Gravité : moyenne. Ce n'est pas forcément bloquant mais ce n'est pas propre.

Correction recommandée : ne pas renommer immédiatement sans vérifier les liens entrants. Prévoir une correction avec redirection ou alias.

### 3. Voyages ajoutés mais visibilité incomplète

Plusieurs voyages semblent exister dans certains fichiers mais ne sont pas toujours visibles dans les menus, catégories, cartes ou brochure.

Exemples observés :

- Tunisie — Tunis & Hammamet ;
- Albanie — Riviera albanaise ;
- Ouzbékistan — Route de la Soie ;
- Croisière Turquie & Égypte ;
- Croisière Turquie & Grèce ;
- Azerbaïdjan & Turquie ;
- Omra 27 juillet Etihad ;
- Égypte Caire & Hurghada.

Cause probable : chaque voyage doit être synchronisé dans plusieurs endroits.

Pour qu'un voyage soit complet, il faut vérifier :

- entrée dans `public/voyages/data.js` ;
- fiche HTML dans `public/voyages/` ;
- présence dans la page destination ;
- présence dans la navigation ;
- présence dans la brochure ou homepage si demandé ;
- `mediaKey` cohérente ;
- bouton WhatsApp/devis fonctionnel.

### 4. Catégorie `Combinés` incomplète

La page `public/voyages/destinations/combines.html` existe mais semble ne contenir qu'une partie des voyages combinés.

Correction recommandée : PR dédiée pour lister tous les voyages combinant deux destinations ou plus.

### 5. Section `Pourquoi nous choisir` réapparue

La section a été masquée à un moment puis semble réapparaître après une autre évolution.

Cause probable : une PR ou branche a réintroduit une ancienne version de la homepage.

Correction recommandée : masquer durablement avec une règle claire dans le code et dans la documentation.

### 6. Admin médias à sécuriser

L'admin médias existe déjà sur `main`, avec routes API média/upload.

Risque : l'accès et les écritures doivent être protégés avant usage réel.

Correction recommandée : traiter avec la PR #42 ou une PR dédiée sécurité après stabilisation du catalogue.

### 7. PR #42 importante mais à tester prudemment

La PR #42 ajoute le chantier admin propriétaire / CMS produits / médias sécurisés.

Elle est importante, mais ne doit pas être fusionnée avant :

- réconciliation catalogue ;
- test Vercel Preview ;
- test login/session ;
- test ajout produit ;
- test médias ;
- test affichage public ;
- test rollback.

### 8. Documentation insuffisante

Les agents IA ont besoin d'un cadre clair. Sans documentation, ils peuvent :

- modifier le mauvais fichier ;
- écraser une évolution récente ;
- mélanger plusieurs sujets dans une même PR ;
- réactiver des sections masquées ;
- perdre des liens de navigation ;
- consommer inutilement du quota.

## Cause générale des imperfections

Le problème principal est la désynchronisation des sources.

Le catalogue n'est pas encore géré par une source unique totalement automatisée. Une même évolution voyage peut toucher :

- `data.js` ;
- une fiche HTML ;
- une page destination ;
- la homepage ;
- la brochure ;
- le menu ;
- les médias.

Si une IA modifie seulement une partie, le voyage existe techniquement mais disparaît visuellement.

Si une PR ancienne est fusionnée après une PR récente, elle peut restaurer une ancienne version.

## Conclusion audit

Le site est avancé et la direction est bonne. La priorité n'est pas d'ajouter encore des fonctionnalités, mais de stabiliser :

1. documenter ;
2. inventorier ;
3. corriger les accents ;
4. réconcilier les voyages ;
5. corriger les catégories ;
6. verrouiller les sections masquées ;
7. sécuriser l'admin ;
8. seulement ensuite faire évoluer le CMS.