# Voyages21 — Fiche projet

> 🤝 **À LIRE EN PREMIER : `COLLAB-IA.md`** (racine du dépôt) — règles communes à
> toutes les IA (Codex, Claude, autres) : source de vérité du site (vrai site
> `src/app` + `public/voyages` vs maquettes `public/design`), jamais de push direct
> sur `main`, toujours branche + PR + preview, une seule IA par branche à la fois.
> Le site officiel est **https://www.voyages21.com** (`voyages21.vercel.app` = adresse technique).

## 🗣️ Style de réponse à Karim (RÈGLE GRAVÉE — toujours)
Répondre **TOUJOURS** à Karim en **liste de points, 1 point = 1 phrase courte**, droit
au but, sans blabla ni longs paragraphes. Une action = une phrase, puis attendre son
« go » avant l'étape suivante quand il pilote pas à pas.

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

## 🕋 Reprise « V21 HAJJ » (promotion produit Hajj 2027 + Google Ads)
Dès que Karim écrit **« V21 HAJJ »** (même seul) au début d'une conversation :
lire `REPRISE-HAJJ.md` (racine du dépôt). Résumer en **3 lignes** où on en est
(dernière action + tâches en suspens + prochaine étape proposée), puis
**TOUJOURS attendre le « go »** avant d'agir. Mettre à jour `REPRISE-HAJJ.md`
après chaque avancée (config campagne, décision, tâche livrée). Karim n'a JAMAIS
à réexpliquer le contexte : c'est Claude qui rappelle où on en était.
- **Périmètre** : booster la page `public/voyages/destinations/hajj-2027.html`
  via Google Ads (Performance Max) + Meta Pixel/GA4 + campagne Meta phase 2.

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
