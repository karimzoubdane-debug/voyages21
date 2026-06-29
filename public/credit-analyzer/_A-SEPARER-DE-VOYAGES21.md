# ⚠️ À FAIRE — Dissocier l'Analyseur Crédit de voyages21

**Décision (Karim) :** l'app est temporairement greffée sur le projet Vercel
**voyages21** pour disposer d'une URL tout de suite. Elle doit être **séparée**
dès que possible en **projet Vercel autonome** (URL, clé `ANTHROPIC_API_KEY` et
domaine distincts). Karim ne veut **aucun risque** pour le site voyages21.

## Étapes de séparation (à exécuter plus tard)
1. Empaqueter en app **Next autonome** dans `credit-app/` (sa propre `package.json`
   avec `next` + `@anthropic-ai/sdk`, son `app/`, ses routes `app/api/{chat,research,brief,summarize}`,
   ses assets dans `public/`).
2. Créer un **nouveau projet Vercel** → Root Directory = `credit-app/` → définir
   `ANTHROPIC_API_KEY` **sur ce projet uniquement**.
3. Retirer la version greffée du site : supprimer `public/credit-analyzer/` **et**
   `src/app/api/credit/`, retirer `@anthropic-ai/sdk` de la `package.json` racine
   si plus utilisé ailleurs.
4. (Option) Déplacer `credit-app/` vers un dépôt GitHub dédié.

## Garde-fous tant que c'est greffé
- Ne jamais modifier un fichier du site (`src/app/<pages>`, composants, layout, lib).
- Tester chaque changement avant push ; un build qui échoue **ne casse pas** la prod
  (Vercel garde le dernier déploiement valide), mais on évite quand même.
- Sans `ANTHROPIC_API_KEY`, les routes renvoient 503 proprement (aucun crash).
