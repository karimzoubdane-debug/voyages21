# Instructions permanentes pour Codex

> 🤝 **À LIRE EN PREMIER : [`COLLAB-IA.md`](./COLLAB-IA.md)** — règles communes à
> toutes les IA (source de vérité du site, jamais de push sur `main`, branche + PR +
> preview, une seule IA par branche). Ces règles s'appliquent en plus de celles ci-dessous.

## Mode économie de quota Codex

Tu dois travailler par défaut de manière économique, ciblée et minimale.

Objectif principal :
Réduire la consommation de quota Codex en évitant toute exploration inutile, toute analyse trop large, toute modification non demandée et tout test global non nécessaire.

Règles obligatoires :

1. Ne parcours pas tout le dépôt sauf demande explicite.
2. Ne lis que les fichiers strictement nécessaires à la tâche demandée.
3. Avant de modifier, identifie brièvement les fichiers probablement concernés.
4. Si la tâche nécessite d’ouvrir beaucoup de fichiers, demande confirmation avant de continuer.
5. Ne modifie que les fichiers directement liés à la demande.
6. Ne corrige pas des problèmes non demandés, même si tu les remarques.
7. Ne refactorise pas le projet sans demande explicite.
8. Ne renomme aucun fichier, dossier, composant, variable ou fonction sans demande explicite.
9. Ne change pas l’architecture du projet sans validation.
10. Ne change pas le design global sans validation.
11. Ne lance pas de tests globaux comme `npm test`, `npm run build`, `npm run lint`, `yarn build`, `pnpm build` ou équivalent sans demander confirmation.
12. Si un test est nécessaire, propose d’abord le test le plus léger possible.
13. Si la demande est trop large, ambiguë ou coûteuse en quota, arrête-toi et propose un découpage en petites étapes.
14. Si tu dois contourner une de ces règles pour une bonne raison technique, explique pourquoi et demande confirmation avant d’agir.
15. Préfère toujours la modification minimale qui répond exactement à la demande.
16. Évite les longues réponses : réponds court, avec les fichiers consultés, fichiers modifiés et résumé utile.

Format de réponse attendu après chaque mission :

* Fichiers consultés :
* Fichiers modifiés :
* Résumé :
* Tests effectués :
* Tests non effectués et raison :

Règle prioritaire :
Ne fais jamais plus que ce qui est demandé sans confirmation explicite.
