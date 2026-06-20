# Roadmap de stabilisation Voyages21

Objectif : remettre le site dans un état propre, stable et documenté, sans casser l'existant.

## Règle de base

Une PR = un seul sujet = un test = une validation.

Aucune grosse PR ne doit mélanger :

- design ;
- navigation ;
- contenus voyages ;
- corrections d'accents ;
- CMS ;
- admin médias ;
- sécurité ;
- documentation.

## Phase 0 — Sauvegarde et documentation

But : sécuriser l'état actuel et installer la mémoire projet.

Actions :

1. Créer une branche documentaire depuis `main`.
2. Ajouter / mettre à jour :
   - `AGENTS.md`
   - `CLAUDE.md`
   - `AUDIT_VOYAGES21.md`
   - `ROADMAP_STABILISATION_VOYAGES21.md`
   - `CHECKLIST_NON_REGRESSION.md`
   - `.github/PULL_REQUEST_TEMPLATE.md`
3. Ne toucher à aucun fichier visible du site.

Statut : cette PR documentaire correspond à la phase 0.

## Phase 1 — Inventaire officiel des voyages

But : savoir exactement quels voyages existent, où ils sont visibles, et où ils sont mal reliés.

Créer un inventaire avec au minimum :

- slug ;
- titre ;
- catégorie ;
- présence dans `data.js` ;
- fiche HTML existante ;
- page destination ;
- visibilité menu ;
- visibilité homepage ;
- visibilité brochure ;
- `mediaKey` ;
- statut : complet / partiel / absent / à vérifier.

Fichiers possibles :

- `AUDIT_CATALOGUE_VOYAGES.md`
- ou `public/voyages/inventory.json`

Interdit dans cette phase : modifier les contenus produits.

## Phase 2 — Correction des accents cassés

But : supprimer les caractères `�` visibles sur le site.

Actions :

- scanner les fichiers HTML/JS publics ;
- corriger uniquement les caractères cassés ;
- ne pas modifier le design ;
- ne pas modifier la navigation ;
- ne pas toucher au CMS.

Exemples :

- `Croisi�res` → `Croisières`
- `s�jours` → `séjours`
- `d�parts` → `départs`
- `�t�` → `été`
- `M�diterran�e` → `Méditerranée`

## Phase 3 — Réconciliation catalogue voyages

But : faire réapparaître proprement les voyages ajoutés mais mal reliés.

Vérifier notamment :

- Tunisie — Tunis & Hammamet ;
- Albanie — Riviera albanaise ;
- Ouzbékistan — Route de la Soie ;
- Croisière Turquie & Égypte ;
- Croisière Turquie & Grèce ;
- Azerbaïdjan & Turquie ;
- Omra 27 juillet Etihad ;
- Égypte Caire & Hurghada ;
- autres voyages détectés dans l'inventaire.

Pour chaque voyage, vérifier :

1. entrée dans `data.js` ;
2. fiche HTML ;
3. page destination ;
4. carte visible si souhaitée ;
5. lien menu ;
6. mediaKey ;
7. WhatsApp/devis ;
8. affichage mobile.

## Phase 4 — Correction catégorie `Combinés`

But : faire de `Combinés` une vraie catégorie utile.

Inclure, selon validation Karim, les voyages qui combinent deux destinations ou plus :

- Istanbul & Antalya ;
- Istanbul & Bodrum ;
- Istanbul, Marmaris & Bodrum ;
- Malaisie & Thaïlande ;
- Azerbaïdjan & Turquie ;
- Espagne & Portugal ;
- France & Suisse ;
- Angleterre & Écosse ;
- Canada & USA ;
- Croisière Turquie & Égypte ;
- Croisière Turquie & Grèce.

Ne pas ajouter de nouveaux produits non validés.

## Phase 5 — Masquage durable de `Pourquoi nous choisir`

But : éviter que la section réapparaisse lors d'une future fusion.

Options acceptables :

- variable claire du type `SHOW_WHY_CHOOSE = false` ;
- classe CSS dédiée ;
- commentaire clair dans le HTML indiquant que la section est masquée à la demande de Karim.

Interdit : suppression définitive sans validation.

## Phase 6 — Sécurisation admin médias et PR #42

But : traiter l'admin propriétaire / CMS produits sans casser le site existant.

Conditions avant fusion :

- PR #42 remise à jour depuis `main` stabilisé ;
- tests sur Vercel Preview ;
- login propriétaire testé ;
- session testée ;
- upload photo/vidéo testé ;
- ajout produit testé ;
- fiche produit générée/testée ;
- affichage public testé ;
- accès API non autorisé refusé ;
- rollback documenté.

## Phase 7 — Nettoyage et documentation finale

But : rendre le projet maintenable.

Actions :

- mettre à jour README ;
- documenter comment ajouter un voyage ;
- documenter comment ajouter un média ;
- documenter comment tester une PR ;
- documenter comment faire un revert ;
- identifier pages anciennes/temporaires ;
- identifier pages officielles.

## Méthode de validation après chaque PR

Pour chaque PR :

1. Lire la description PR.
2. Vérifier qu'elle ne traite qu'un sujet.
3. Ouvrir la Preview Vercel.
4. Tester desktop.
5. Tester mobile.
6. Tester la navigation.
7. Tester 5 à 10 fiches produits.
8. Vérifier que les anciennes corrections ne régressent pas.
9. Vérifier le plan de rollback.
10. Fusionner uniquement après validation humaine.

## Plan de retour arrière

Niveau 1 : ne pas fusionner une PR douteuse.

Niveau 2 : si une PR fusionnée casse le site, faire un revert de la PR.

Niveau 3 : si le site est fortement cassé, repartir d'une branche backup saine.

Règle : ne pas faire de force push sur `main` sans validation explicite.