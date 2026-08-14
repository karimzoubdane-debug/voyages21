# 📸 Audit photo — site international *Morocco Voyages 21*

Outil qui surveille les photos réellement en ligne sur **morocco.voyages21.com**
(dossier serveur `public_html/morocco-intl`, futur `moroccovoyages21.com`) et
produit le **rapport de curation au format Word**.

Il tourne **automatiquement chaque lundi** (Routine « Rapport photos Morocco
Voyages 21 »), et peut être lancé à la main à tout moment.

---

## Lancer l'audit

```bash
npm install          # une seule fois : installe la librairie docx
npm run audit        # mesure le site puis écrit le rapport Word
```

Le rapport arrive dans `rapports/Rapport-curation-photos-<date>.docx`.

Les deux étapes séparément :

```bash
python3 audit_photos.py            # → audit-<date>.json
node build_report.js               # → rapports/Rapport-…docx (dernier audit)
node build_report.js 2026-08-14    # → un audit précis
```

Aucune dépendance Python : le script mesure les JPEG, PNG et WebP lui-même.

---

## Le partage des rôles

| Fichier | Rôle | Qui l'écrit |
|---|---|---|
| `audit_photos.py` | **Mesure** : télécharge les fichiers en ligne, en extrait les photos, mesure définition / poids / format, compare au dernier état | le script |
| `fiches.json` | **Jugement** : ce qu'on voit sur la photo, ses inconvénients, la décision | un humain, ou Claude **après avoir regardé** la photo |
| `build_report.js` | Assemble les deux en un document Word | le script |
| `vignettes/` | Les aperçus insérés dans le rapport | généré une fois, à compléter pour les nouvelles photos |

Le script ne juge jamais une photo qu'il n'a pas vue. Quand une photo apparaît
sur le site sans fiche correspondante, il l'affiche en rouge avec la mention
**NOUVELLE** et la signale en tête de rapport : c'est le signal qu'il faut la
regarder et écrire sa fiche.

---

## Ce que l'audit vérifie

D'après la charte de `PHOTOS-A-FOURNIR.md` (dépôt `v21-cockpit`, `scripts/morocco-intl/`) :

- **format paysage** — largeur au moins 1,2 fois la hauteur ;
- **définition** — au moins 1600 px de large ;
- **poids** — 300 Ko maximum ;
- **accessibilité** — la photo répond bien (les vignettes Unsplash sont des liens
  externes : elles ne sont pas mesurables, et c'est précisément un des reproches).

Il suit les **trois sources** de visuels du site : les vignettes des cartes de la
brochure, la médiathèque intégrée en dur (`window.__V21_MEDIA__`, issue de la
correction « mediafix3 ») et les fichiers locaux `assets/`.

⚠️ Le script part **toujours des fichiers en ligne**, jamais de la version GitHub :
celle-ci est antérieure à `mediafix3` et repartir d'elle ferait réapparaître le bug
des photos. Si `window.__V21_MEDIA__` disparaît de la page, le script s'arrête avec
une alerte — c'est le garde-fou.

---

## Après l'audit : installer les nouvelles photos

Une fois les photos choisies et déposées dans
`public_html/morocco-intl/WelcomeChina/assets/photos/<circuit>/`, c'est le script
**`action9_photos.py`** (dépôt `v21-cockpit`, `scripts/morocco-intl/`) qui les
installe partout dans le site, à partir d'un fichier `photos.json`.

Cet outil-ci **constate**, `action9_photos.py` **applique**.
