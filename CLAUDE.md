# Voyages21 — Fiche projet

> 🤝 **À LIRE EN PREMIER : `COLLAB-IA.md`** (racine du dépôt) — règles communes à
> toutes les IA (Codex, Claude, autres) : source de vérité du site (vrai site
> `src/app` + `public/voyages` vs maquettes `public/design`), jamais de push direct
> sur `main`, toujours branche + PR + preview, une seule IA par branche à la fois.
> Le site officiel est **https://www.voyages21.com** (`voyages21.vercel.app` = adresse technique).

## 🎛️ Cockpit Projets — mémoire centrale (mot-clé « REVUE COCKPIT » / « COCKPIT »)
Le **Cockpit** (appli PWA `public/cockpit.html`, en ligne sur
`https://voyages21.vercel.app/cockpit.html`, données `cockpit-data.json` racine ;
`cockpit-v4.html` = redirection) est la **mémoire de TOUS les projets de Karim** (site, Hajj, avis, B2B, HAYDEN 21, agence
web IA, devis, content-studio, V21 USA, ReelsApp, YouTube Monitor, sauvegarde…),
360° par **catégorie** et par **statut** (publié / en cours / en suspens / planifié /
terminé / abandonné), avec pour chaque projet son URL, ses **3 dernières actions** et
ses **questions/décisions en attente**. Un cron (`.github/workflows/revue-cockpit.yml`)
ouvre chaque soir (20:00 Maroc) une **Issue de rappel**. Dès que Karim écrit
**« REVUE COCKPIT »** (ou « COCKPIT » seul), exécuter la procédure de `REVUE-COCKPIT.md`
(collecter les évolutions du jour → mettre à jour `cockpit-data.json` → commit + PR →
remonter les questions en attente). **Karim ne doit jamais réexpliquer ses projets :
c'est le Cockpit qui se souvient.**

**Reprise d'UN projet depuis l'appli (mot-clé « COCKPIT PROJET #<id> » ou « COCKPIT <nom> ») :**
depuis le Cockpit, le bouton **« ▶ Travailler avec Claude »** de chaque fiche copie une
instruction et ouvre Claude Code. Quand Karim colle « COCKPIT PROJET #<id> … » (ou écrit
« COCKPIT » + un nom/numéro de projet) : lire `cockpit-data.json`, charger CE projet,
résumer en 3 lignes (statut + 3 dernières actions + questions en attente), proposer la
prochaine étape concrète, **attendre le go**. Après chaque avancée, mettre à jour la fiche
du projet (`lastActions`, `pending`, `status`, `nextStep`) dans `cockpit-data.json` + PR.

### ➕ Créer un projet (mot-clé « NOUVEAU PROJET »)
Depuis le Cockpit, le bouton **« ➕ Nouveau projet »** ouvre un formulaire qui copie une
instruction commençant par **« NOUVEAU PROJET (Cockpit) … »** et ouvre Claude Code. Quand
Karim colle ça (ou écrit **« NOUVEAU PROJET : … »** dans n'importe quelle conversation) :
1. Lire `cockpit-data.json`, **attribuer un `id`** libre (max des ids + 1) et **garder le `keyword`**
   fourni (sinon en dériver un depuis le titre, en MAJUSCULES, unique) + `aliases` éventuels.
2. Créer la fiche complète (schéma ci-dessous) : `cat`, `status`, `title`, `keyword`, `desc`,
   `url`, `nextStep`, `lastActions` (la 1ʳᵉ action datée du jour), `pending`, `lastReview`=aujourd'hui,
   `stack`, `livrables` (vide si rien), `phases` (au moins une phase de départ).
3. Mettre à jour `_meta.last_updated`. **Commit + PR** (jamais de push direct sur `main`).
4. Confirmer à Karim en 3 lignes + rappeler le **mot-clé** de reprise du nouveau projet.
Le projet se comporte ensuite **exactement comme les autres** (reprise par mot-clé, brief, revue du soir).

### 🔑 Mots-clés projets — reprise instantanée (RÈGLE GÉNÉRALE)
**Chaque projet a un mot-clé de reprise** (champ `keyword` + `aliases` dans `cockpit-data.json`).
Dès que Karim écrit **un de ces mots-clés** (même seul, au début d'une conversation) :
1. Lire `cockpit-data.json`, trouver le projet dont `keyword` ou un `aliases` **correspond**
   (insensible à la casse/accents ; correspondance souple).
2. Répondre par la **REPRISE STANDARD** (ne rien faire réexpliquer) :
   - **Statut** + les **3 dernières actions** (`lastActions`),
   - 📍 **Où on s'est arrêté** = `nextStep`,
   - ⏳ **Sujets / actions en attente** = `pending`.
3. **Proposer la prochaine étape concrète**, puis **attendre le « go »**.
4. Travailler en branche + PR (jamais de push direct sur `main`).
5. **Après chaque avancée**, mettre à jour la fiche (`lastActions`→garder les 3 plus récentes,
   `pending`, `status`, `nextStep`, `lastReview`) dans `cockpit-data.json` + PR.

Table de correspondance (mot-clé → projet) — la **source de vérité** reste `cockpit-data.json` :

| Mot-clé | Projet | | Mot-clé | Projet |
|---|---|---|---|---|
| `WWW.VOYAGES21.COM` | Site Web Voyages21 | | `V21 USA` | Incoming USA → Maroc |
| `HAJJ` | Page Hajj 2027 | | `DEVIS` | Application Devis |
| `OMRA` | Pôle Omra | | `REELSAPP` | ReelsApp SaaS |
| `CIRCUITS MAROC` | Circuits & Voyages Maroc | | `RETRAITE` | Simulateur retraite |
| `CATALOGUE INTERNATIONAL` | Catalogue international | | `MONETISATION` | Système de monétisation |
| `MARHABA` | Blog MARHABA & Chroniques | | `COCKPIT APP` | Le Cockpit (appli) |
| `MICE` | MICE & Groupes | | `MULTI-IA` | App comparaison multi-IA |
| `EXPERIENCES` | Expériences & Activités | | `PYTHON` | Plateforme apprentissage Python |
| `PARTENAIRES` | Partenaires & Affiliation | | `YOUTUBE MONITOR` | YouTube Monitor |
| `ESPACE CLIENT` | Espace Client | | `SAUVEGARDE` | Sauvegarde automatique |
| `ADMIN` | Espace Admin & CMS | | `AUDIT VERCEL` | Audit Vercel |
| `FORMULAIRE` | Formulaire de voyage | | `CRM` | Nettoyage base clients |
| `FAQ` | FAQ | | `QUESTIONNAIRE` | Questionnaire de satisfaction |
| `B2B` | Dossier stratégique B2B | | `VIDEO` | Contenu Vidéo & Reels |
| `HAYDEN` | HAYDEN 21 écotourisme | | `ANALYSE FINANCIERE` | Analyse Financière |
| `AGENCE WEB` | Agence Web IA | | `MONOREPO` | Infrastructure & Monorepo |
| `V21 STUDIO` | Content Studio | | `EGYPTE` | Campagne Égypte |
| `AVIS` / `GOOGLE MY BUSINESS` | Avis Google | | `SOCIAL SELLING` | Social selling |
| `VEILLE CONCURRENTS` | Veille concurrents | | `VEILLE VIRALE` | Veille virale |
| `CALENDRIER` | Calendrier éditorial | | `AUTOMATISATION` | Automatisation contenu + Chatbot |

> Note : `www.voyages21.com` / `V21 USA` / `V21 STUDIO` gardent leurs procédures dédiées ci-dessous
> (fichiers REPRISE), en plus de la fiche Cockpit. `REVUE COCKPIT` / `COCKPIT` seul = revue globale.

## 🔁 Reprise rapide du site (mot-clé « www.voyages21.com »)
Dès que Karim écrit **« www.voyages21.com »** (même seul, ou « V21 site », ou
« on reprend ») au début d'une conversation : NE PAS demander de contexte, NE PAS
faire réexpliquer. Lire `REPRISE-SITE.md` (racine du dépôt), résumer en **3 lignes**
où on en est (dernière action + PR ouvertes + prochaine étape proposée), puis
attendre le « go ». **Mettre à jour `REPRISE-SITE.md` après chaque avancée**
(PR créée/fusionnée, décision, livraison) pour que la session suivante reprenne
toute seule. (À ne pas confondre avec « V21 STUDIO » = contenu/marketing.)

## ⚡ Content Studio (système de création de contenu IA)
Pour TOUTE tâche de contenu/marketing (visuels, vidéos, posts, calendrier,
ads, veille concurrents), lire d'abord le dossier `content-studio/` :
`aboutme.md` (profil de marque + réponses interview), `prompts-higgsfield.md`,
`calendrier-editorial.md`, `README.md` (canaux médias + règles).
Médias sources : dossier Drive `VOYAGES21-CONTENT-STUDIO`
(id `1PPELuQYdp4sN9gXJHZ6ND5s6fJS_UpK5`). Tableau de bord : page Notion
« Voyages21 Content Studio ». Connecteurs : Higgsfield, Google Drive,
Notion, Apify. Karim peut démarrer une session par « V21 STUDIO : … »
suivi de son instruction — aucun contexte à répéter.
**Reprise automatique** : dès que Karim écrit « V21 STUDIO » (même seul),
lire `content-studio/REPRISE.md`, résumer en 3 lignes la dernière étape,
proposer la prochaine action et attendre le « go ». Mettre à jour
`REPRISE.md` après chaque avancée. Karim n'a JAMAIS à réexpliquer le contexte
ni à préciser la destination : c'est Claude qui rappelle où on en était.

## 🇺🇸 Reprise « V21 USA » (INCOMING — touristes étrangers → Maroc) — PROJET CLOISONNÉ
Dès que Karim écrit **« V21 USA »** (même seul) au début d'une conversation :
lire **UNIQUEMENT** `v21-usa/REPRISE.md`. Résumer en **3 lignes** où on en est
(dernière action + prochaine étape proposée), puis **TOUJOURS attendre le « go »
de Karim** avant d'agir. Mettre à jour `v21-usa/REPRISE.md` après chaque avancée.
- **Périmètre** : amener des étrangers présents aux USA à voyager au Maroc via
  l'agence (incoming) — ads Meta/autres + social selling + asset HelloMorroco.
- **CLOISONNEMENT STRICT** : ce projet est SÉPARÉ. NE PAS charger ni mélanger le
  contexte du site (`REPRISE-SITE.md` / « www.voyages21.com ») ni de l'outgoing
  (`content-studio/REPRISE.md` / « V21 STUDIO »). Aucune interférence entre les
  trois projets. Si Karim n'a pas tapé « V21 USA », ne pas ouvrir ce dossier.

## Identité
- **Projet** : Site web Voyages21 — agence de voyages sur mesure au Maroc depuis 2000
- **Fondateur** : Karim Zoubdane
- **Stack** : Next.js 14 App Router, React (client components), CSS Modules

## URLs
- **Production** : https://voyages21.vercel.app/
- **Preview branch** : https://voyages21-git-claude-websi-3d5966-karimzoubdane-debugs-projects.vercel.app/
- **Mot-clé** : "site web V21" → https://voyages21.vercel.app/

## Dépôt GitHub
- **Repo** : karimzoubdane-debug/voyages21
- **Branche de travail** : claude/website-work-tj3vz
- **Branche production** : main (auto-déployée sur Vercel)

## Règle absolue
WordPress, Elementor, WP Travel Engine sont abandonnés définitivement. Ne jamais les suggérer.

## Architecture
```
src/
  app/
    page.jsx              — Page d'accueil (client component)
    home.module.css       — Styles homepage
    globals.css           — Styles globaux (navbar, footer, keyframes)
    about/page.jsx        — Page À propos (#expertise, #engagements)
    contact/page.jsx      — Page Contact
    layout.jsx            — Layout racine (NavBar + Footer + WhatsApp)
  components/
    NavBar.jsx            — Header 3 barres fixe (48+40+68=156px)
    Footer.jsx            — Footer vert foncé
```

## Design system
- **Couleurs** : forest green #1B3A28 (bar1), #152E1F (bar2), gold #C8A440, cream #F5F0E8
- **Fonts** : Playfair Display (titres, italic), DM Sans (corps, UI)
- **Header** : 3 barres fixes, total 156px
  - Bar 1 (48px, #1B3A28) : logo centré
  - Bar 2 (40px, #152E1F) : contacts gauche | MARHABA BLOG centre | About dropdown droite
  - Bar 3 (68px, transparent→vert) : ← Accueil gauche | menus clic centre | téléphone+Contact droite
- **Mega menus** : position fixed top 156px, s'ouvrent au CLIC uniquement (pas au survol)
- **Dropdown About** : position absolute sous bar2, animation slideDown

## État de la version actuelle (V1 — mise en prod)
- Header 3 barres complet avec mega menus (Inspirations, Choisissez votre style, Explorer)
- Panel Inspirations : 4 blocs (Séjours 2×2, Circuits 2×2, Avec qui partir 2×2, Voir tous nos circuits + cadran), séparateurs dorés, maxWidth 1200px
- Panel Styles : 3 grandes cartes + cadran, centré
- Panel Explorer : 2 grandes cartes + cadran, centré
- About : dropdown au clic, slide-down animé
- Bouton ← Accueil visible sur toutes les pages (bar3 gauche)
- Bandeau signature agrandi : "De l'aventure intime aux projets d'envergure, Voyages 21 signe le voyage."
- Page About avec sections #expertise et #engagements
- Mega menus clic uniquement (pas de survol intempestif sur les autres pages)

## 💾 Sauvegarde du site (règle permanente)
- **Automatique** : le workflow `.github/workflows/sauvegarde.yml` génère à chaque
  fusion sur `main` (et chaque lundi) une **Release** contenant le zip du site,
  le bundle git (historique complet) et le manifeste des médias.
- **Gros fichiers à déposer à la main** : ces fichiers (zip + bundle, ~11 Mo chacun)
  doivent être déposés par Karim dans le Drive **« VOYAGES21 — SAUVEGARDES »**
  (id `1zA-k8LdhxbdSx7R4wGsKtqlQUMkWKyOI`).
- **RAPPEL À FAIRE** : à partir du 2026-06-23, **à la fin de chaque session**,
  rappeler à Karim de télécharger la dernière Release et de déposer les gros
  fichiers dans son Drive. **Continuer ce rappel jusqu'à ce que Karim confirme**
  (« c'est sauvegardé » / « j'ai fait le nécessaire ») — ensuite arrêter les rappels.
