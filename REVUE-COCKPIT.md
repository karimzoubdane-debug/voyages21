# 🌙 REVUE COCKPIT — Procédure de revue du soir

> **Déclencheur** : Karim tape **« REVUE COCKPIT »** (même seul) au début d'une
> conversation. L'IA exécute alors la procédure ci-dessous. Objectif : le Cockpit
> est la **mémoire centrale** de tous les projets de Karim — il ne doit rien oublier.

## 🎛️ De quoi on parle
- **Appli** : `cockpit-v4.html` (racine) — tableau de bord, lit `cockpit-data.json`.
  Rendu en ligne : `https://htmlpreview.github.io/?https://github.com/karimzoubdane-debug/voyages21/blob/main/cockpit-v4.html`
- **Données (source de vérité)** : `cockpit-data.json` (racine).
- **Rappel automatique** : le workflow `.github/workflows/revue-cockpit.yml` tourne
  chaque soir à **20:00 Maroc** et ouvre/rafraîchit une **GitHub Issue**
  « 🌙 Revue Cockpit — <date> » (label `cockpit-revue`) listant les projets et les
  **questions/décisions en attente**. Ce cron NE modifie PAS les données : il rappelle.
- **Mise à jour intelligente** : c'est l'IA (cette procédure) qui réécrit `cockpit-data.json`.

## 📋 Procédure (à faire quand Karim tape « REVUE COCKPIT »)
1. **Lire** `cockpit-data.json`.
2. **Collecter les évolutions du jour** :
   - `git log --since="1 day ago" --oneline` (commits/PR du jour).
   - Les PR fusionnées / ouvertes (via GitHub) et les fichiers REPRISE modifiés
     (`REPRISE-SITE.md`, `content-studio/REPRISE.md`, `v21-usa/REPRISE.md`).
   - Ce que Karim raconte avoir fait hors dépôt (demander en 1 question si besoin).
3. **Pour chaque projet**, mettre à jour :
   - `status` (publie / en_cours / en_suspens / planifie / termine / abandonne),
   - `lastActions` : garder les **3 plus récentes** (format `{ "date": "YYYY-MM-DD", "text": "..." }`),
   - `pending` : ajouter les nouvelles questions/décisions, **retirer celles résolues**,
   - `nextStep`, `phases`, `url`, `livrables` si ça a bougé,
   - `lastReview` = date du jour.
4. **Ajouter** tout **nouveau projet** repéré (nouveau dossier, nouvelle app, nouveau chantier).
5. **Mettre à jour `_meta`** : `last_updated`, `last_review` = date du jour, `updated_by`.
6. **Commit + push** sur la branche de travail, puis **PR** (jamais de push direct sur `main`).
7. **Répondre à Karim** en 3-5 lignes : ce qui a changé + la liste des **questions en attente
   qui réclament sa décision** (les `pending`).

## 🧱 Schéma d'un projet (rappel)
```json
{
  "id": 12, "cat": "outils", "status": "en_cours",
  "title": "...", "desc": "...", "url": "https://...",
  "nextStep": "...",
  "lastActions": [ { "date": "2026-07-01", "text": "..." } ],
  "pending": [ "Question / décision qui attend une réponse de Karim" ],
  "lastReview": "2026-07-01",
  "stack": "...", "livrables": [ { "name": "...", "type": "URL", "url": "..." } ],
  "phases": [ { "name": "...", "state": "done|in_progress|todo", "items": ["..."] } ]
}
```
- **Catégories** : `site`, `business`, `eco`, `web`, `marketing`, `incoming`, `outils`, `veille`.
- **Statuts** : `publie`, `en_cours`, `en_suspens`, `planifie`, `termine`, `abandonne`.

## ✅ Règle d'or
Karim réalise plusieurs projets en parallèle et les oublie. Cette appli est sa mémoire :
à chaque revue, **capturer ce qui a avancé** et **remonter clairement ce qui attend une décision**.
