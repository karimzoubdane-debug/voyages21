# COCKPIT V21 — Blueprint complet (recréer la même appli)

> Donne ce fichier à n'importe quelle IA : il contient **tout** pour recréer le Cockpit à l'identique.
> Maintenu en parallèle des évolutions. Voir la section **⏳ EN SUSPENS** en bas.
> Source de vérité des données : `cockpit-data.json` (repo `karimzoubdane-debug/voyages21`).

## 1. But
Tableau de bord **PWA** = mémoire centrale de TOUS les projets de Karim. 360° par **catégorie** et par
**statut**. Pour chaque projet : URL, **3 dernières actions**, **prochaine étape**, **questions en attente**.
Objectif : ne jamais réexpliquer un projet — on tape un mot-clé, l'appli/Claude se souvient.

## 2. Stack & principe
- **HTML/CSS/JS statique** (un seul fichier `public/cockpit.html`), aucune dépendance, aucun build.
- Servi par **Vercel** depuis `public/` → `https://voyages21.vercel.app/cockpit.html`.
- Données lues en direct depuis **`cockpit-data.json`** via `raw.githubusercontent.com/.../main/cockpit-data.json`
  (cache-busting `?t=Date.now()`), fallback **localStorage** hors-ligne.
- **PWA** : `cockpit.webmanifest` (display standalone) + service worker `cockpit-sw.js` (app shell en cache)
  + icône `public/icons/cockpit-512.png`. Installable mobile (écran d'accueil) et bureau.
- Polices : Sora + DM Mono (Google Fonts). Thème sombre (#0d1117), accents bleu #2f6fd4 / or #C8A440.

## 3. Modèle de données (`cockpit-data.json`)
```json
{
  "_meta": {
    "version": "5.x", "last_updated": "YYYY-MM-DD", "updated_by": "...",
    "last_review": "YYYY-MM-DD", "review_time": "20:00 (Maroc)",
    "categories": [ { "key": "site", "label": "Site Web Voyages21.com" }, ... ],
    "statuses": ["publie","en_cours","en_suspens","planifie","termine","abandonne"]
  },
  "projects": [
    {
      "id": 12, "cat": "outils", "status": "en_cours",
      "title": "...", "keyword": "COCKPIT APP", "aliases": ["APPLI COCKPIT"],
      "desc": "...", "url": "https://...", "nextStep": "...",
      "lastActions": [ { "date": "YYYY-MM-DD", "text": "..." } ],   // garder les 3 plus récentes
      "pending": [ "question/action en attente" ],
      "lastReview": "YYYY-MM-DD",
      "stack": "...",
      "livrables": [ { "name": "...", "type": "URL", "url": "..." } ],
      "phases": [ { "name": "...", "state": "done|in_progress|todo", "items": ["..."] } ]
    }
  ]
}
```
- **Catégories** : `site, business, eco, web, marketing, incoming, outils, veille`.
- **Statuts** : `publie, en_cours, en_suspens, planifie, termine, abandonne`.
- Avancement calculé depuis `phases` (done=100% de ses items, in_progress≈40%) ; `publie`→100%, `abandonne`→0%.

## 4. Fonctionnalités de l'appli
- En-tête : stats (Projets / En cours / En suspens / En attente / Avancement moyen) + badge synchro GitHub + Rafraîchir + bouton **Installer l'appli** (PWA).
- Bandeau **revue du soir** (heure + dernière revue + nb de questions en attente).
- Barre d'outils : filtres par **statut** + **⏳ En attente** ; sélecteur de **tri** (par catégorie / plus récent) ; **menu déroulant** « Aller à un projet » ; recherche.
- Grille de **cartes** groupées par catégorie (ou liste triée par date). Carte = titre + badge statut + description + bouton **Ouvrir** (URL) + puce **🔑 mot-clé** (clic = copie) + barre d'avancement + prochaine étape + pastille « N en attente ». En vue **En attente**, la carte liste ses questions.
- **Fiche détail (modale)** : titre + description + badge + boutons **Ouvrir le projet**, **▶ Travailler avec Claude** (copie le mot-clé + ouvre claude.ai/code), **📄 Générer le brief** (télécharge un `.md` complet du projet, avec section EN SUSPENS) ; bannière **🔑 mot-clé de reprise** ; avancement ; **questions/décisions en attente** ; **prochaine étape** ; **3 dernières actions** (timeline) ; planning ; stack ; livrables ; date de dernière revue.
- Auto-refresh toutes les 5 min.

## 5. Fichiers du projet
- `public/cockpit.html` — l'appli (canonique).
- `cockpit-data.json` (racine) — les données (mémoire).
- `public/cockpit.webmanifest`, `public/cockpit-sw.js`, `public/icons/cockpit-512.png` + `cockpit.svg` — PWA.
- `cockpit-v4.html` (racine) — redirection vers `/cockpit.html` (ancien lien).
- `.github/workflows/revue-cockpit.yml` — cron 20:00 Maroc → Issue de rappel « Revue Cockpit du jour ».
- `REVUE-COCKPIT.md` — procédure de revue + reprise par mot-clé. `CLAUDE.md` — règles/mots-clés (auto-lu par Claude Code).

## 6. Mots-clés de reprise
Chaque projet a un `keyword` (+ `aliases`). Dans une session Claude Code sur ce repo, taper le mot-clé
(ex. `HAYDEN`, `WWW.VOYAGES21.COM`) → Claude lit `cockpit-data.json`, charge le projet et répond en
**reprise standard** (statut + 3 dernières actions + où on s'est arrêté + questions en attente), propose la
suite, attend le go, puis met à jour la fiche.

## 7. Revue & mise à jour
- Cron du soir = rappel (n'écrit pas les données). La mise à jour intelligente se fait par l'IA sur
  « REVUE COCKPIT » (revue globale) ou sur un mot-clé projet (revue d'un projet).
- Règle : après chaque avancée, mettre à jour `lastActions` (garder 3), `pending`, `status`, `nextStep`,
  `lastReview`, `_meta.last_updated` → commit + PR (jamais de push direct sur `main`).

## 8. Recréer de zéro (checklist)
1. Créer `cockpit-data.json` (schéma §3) avec au moins 1 projet.
2. Créer `public/cockpit.html` (thème sombre, logique §4, fetch raw GitHub + fallback localStorage).
3. Ajouter la PWA (`cockpit.webmanifest`, `cockpit-sw.js`, icône 512 opaque plein-bord).
4. Déployer sur Vercel (dossier `public/`).
5. (Option) cron de rappel + règles `CLAUDE.md` pour la reprise par mot-clé.

## ⏳ EN SUSPENS (questions / actions / évolutions en attente)
- [ ] Brancher le Cockpit sur le domaine `voyages21.com` (une fois le domaine connecté) → `voyages21.com/cockpit`.
- [ ] Compléter/valider les fiches seedées automatiquement (les projets « oubliés » retrouvés dans les branches sont-ils toujours d'actualité ?).
- [ ] Préciser le périmètre du projet « Analyse Financière ».
- [ ] (Idée) écrire les briefs par projet dans un dossier du repo à chaque REVUE, pour un historique versionné.

---
_Ce blueprint est mis à jour au fil des évolutions. Dernière mise à jour : 2026-07-01._
