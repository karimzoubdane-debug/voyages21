# Voyages21 — Fiche projet

## Priorité — stabilisation site Voyages21

Avant toute modification du site, Claude Code doit lire :

1. `AGENTS.md`
2. `AUDIT_VOYAGES21.md`
3. `ROADMAP_STABILISATION_VOYAGES21.md`
4. `CHECKLIST_NON_REGRESSION.md`

Puis Claude doit faire son propre diagnostic indépendant et dire clairement s'il confirme ou non l'audit existant.

Aucune correction ne doit être exécutée avant validation humaine.

Règles de travail :

- Travailler sur une branche dédiée, pas directement sur `main`.
- Une PR = un seul sujet = un test = une validation.
- Ne pas mélanger design, navigation, contenus voyages, CMS, admin médias, sécurité et encodage dans la même PR.
- Ne pas réactiver une section masquée ou supprimer un contenu existant sans validation.
- Toujours indiquer les fichiers consultés, fichiers modifiés, tests et plan de retour arrière.

## Content Studio
Pour toute tâche de contenu/marketing, lire d'abord le dossier `content-studio/` : `aboutme.md`, `prompts-higgsfield.md`, `calendrier-editorial.md`, `README.md`.

Reprise automatique : dès que Karim écrit « V21 STUDIO », lire `content-studio/REPRISE.md`, résumer la dernière étape, proposer la prochaine action et attendre le go.

## Identité

- Projet : site web Voyages21 — agence de voyages sur mesure au Maroc depuis 2000.
- Fondateur : Karim Zoubdane.
- Repo : `karimzoubdane-debug/voyages21`.
- Branche officielle : `main`.

## Architecture actuelle à surveiller

```txt
src/app/page.jsx
public/cover-ete-2026.html
public/design/homepage-v2-luxe.html
public/BROCHURE_VOYAGES21_AVEC_IMAGES_V7.html
public/voyages/data.js
public/voyages/*.html
public/voyages/destinations/*.html
public/admin-medias.html
PR #42 — admin propriétaire / CMS / médias sécurisés
```

## Points d'attention issus de l'audit

- Accents cassés de type `Croisi�res` à corriger dans une PR dédiée.
- Voyages ajoutés mais parfois non visibles partout : Tunisie, Albanie, Ouzbékistan, croisières Turquie/Égypte et Turquie/Grèce, etc.
- Catégorie `Combinés` existante mais incomplète.
- Section `Pourquoi nous choisir` à maintenir masquée si Karim le confirme.
- Admin médias actuel à sécuriser avant usage réel.
- PR #42 importante mais à tester après stabilisation du catalogue.

## Réponse obligatoire avant modification

- Fichiers consultés :
- Diagnostic personnel :
- Alignement avec l'audit existant :
- Action proposée :
- Fichiers à modifier :
- Tests prévus :
- Plan de retour arrière :