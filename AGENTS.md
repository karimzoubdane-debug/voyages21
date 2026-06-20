# Instructions permanentes pour agents IA — Voyages21

## Priorité absolue avant toute modification

Avant toute modification du site, tout agent IA doit d'abord lire :

1. `AGENTS.md`
2. `CLAUDE.md` si l'agent est Claude Code
3. `AUDIT_VOYAGES21.md`
4. `ROADMAP_STABILISATION_VOYAGES21.md`
5. `CHECKLIST_NON_REGRESSION.md`

Puis l'agent doit produire un double diagnostic avant d'agir.

## Règle obligatoire — double diagnostic

Avant toute correction, l'agent doit :

1. Faire son propre diagnostic indépendant du repo et de la branche concernée.
2. Comparer son diagnostic avec `AUDIT_VOYAGES21.md`.
3. Dire clairement :
   - `Je confirme l'audit existant`, ou
   - `Je confirme partiellement l'audit existant`, ou
   - `Je ne suis pas aligné avec l'audit existant`.
4. Expliquer tout désaccord avec les fichiers concernés.
5. Proposer une action limitée, sûre et testable.
6. Attendre validation humaine avant toute modification.

Aucune correction ne doit commencer tant que ce double diagnostic n'a pas été présenté et validé.

## Règles de sécurité Git

- Ne jamais travailler directement sur `main`.
- Créer une branche dédiée pour chaque sujet.
- Une PR = un seul sujet = un test = une validation.
- Ne pas mélanger design, contenus voyages, navigation, CMS, sécurité et corrections d'accents dans la même PR.
- Ne jamais fusionner une PR sans validation humaine.
- Ne jamais supprimer une branche, un fichier ou une section sans validation humaine explicite.
- Ne jamais faire de force push sur `main`.
- Toujours prévoir un retour arrière : PR non fusionnée, revert de PR, ou branche backup.

## Règles de prudence projet

Le site Voyages21 contient plusieurs couches qui doivent rester synchronisées :

- `public/cover-ete-2026.html` : cover / intro Été 2026.
- `public/design/homepage-v2-luxe.html` : homepage luxe.
- `public/BROCHURE_VOYAGES21_AVEC_IMAGES_V7.html` : brochure / catalogue.
- `public/voyages/data.js` : source principale des données voyages.
- `public/voyages/*.html` : fiches produits.
- `public/voyages/destinations/*.html` : pages catégories / destinations.
- `public/admin-medias.html` : admin médias actuel.
- PR #42 : chantier admin propriétaire / CMS produits / médias sécurisés.

Pour qu'un voyage soit visible correctement, vérifier au minimum :

- entrée dans `public/voyages/data.js` ;
- fiche HTML dans `public/voyages/` ;
- présence dans la bonne page destination ;
- présence dans le menu ou la navigation ;
- présence dans les cartes visibles si demandé ;
- cohérence `mediaKey` avec l'admin médias ;
- bouton WhatsApp/devis fonctionnel.

## Mode économie de quota Codex

Tu dois travailler par défaut de manière économique, ciblée et minimale.

Objectif principal : réduire la consommation de quota Codex en évitant toute exploration inutile, toute analyse trop large, toute modification non demandée et tout test global non nécessaire.

Règles obligatoires :

1. Ne parcours pas tout le dépôt sauf demande explicite.
2. Ne lis que les fichiers strictement nécessaires à la tâche demandée.
3. Avant de modifier, identifie brièvement les fichiers probablement concernés.
4. Si la tâche nécessite d'ouvrir beaucoup de fichiers, demande confirmation avant de continuer.
5. Ne modifie que les fichiers directement liés à la demande.
6. Ne corrige pas des problèmes non demandés, même si tu les remarques.
7. Ne refactorise pas le projet sans demande explicite.
8. Ne renomme aucun fichier, dossier, composant, variable ou fonction sans demande explicite.
9. Ne change pas l'architecture du projet sans validation.
10. Ne change pas le design global sans validation.
11. Ne lance pas de tests globaux comme `npm test`, `npm run build`, `npm run lint`, `yarn build`, `pnpm build` ou équivalent sans demander confirmation.
12. Si un test est nécessaire, propose d'abord le test le plus léger possible.
13. Si la demande est trop large, ambiguë ou coûteuse en quota, arrête-toi et propose un découpage en petites étapes.
14. Si tu dois contourner une de ces règles pour une bonne raison technique, explique pourquoi et demande confirmation avant d'agir.
15. Préfère toujours la modification minimale qui répond exactement à la demande.
16. Évite les longues réponses : réponds court, avec les fichiers consultés, fichiers modifiés et résumé utile.

## Format de réponse attendu après chaque mission

- Fichiers consultés :
- Fichiers modifiés :
- Diagnostic personnel :
- Alignement avec l'audit existant :
- Résumé :
- Tests effectués :
- Tests non effectués et raison :
- Risque de régression :
- Plan de retour arrière :

## Règle finale

Ne fais jamais plus que ce qui est demandé sans confirmation explicite.