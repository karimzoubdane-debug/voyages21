# HANDOFF — Reprise du chantier Voyages21 (médias)

> Pour reprendre dans une NOUVELLE discussion : ouvrir une session Claude Code
> sur la branche `claude/gracious-cori-hpQlE` et dire « lis HANDOFF.md ».
> Tout le code est déjà committé + poussé : ce fichier ne contient que le
> contexte, l'architecture et les décisions qui ne se devinent pas dans le code.

## Où on en est
- **Dépôt** : `karimzoubdane-debug/voyages21`
- **Branche de travail** : `claude/gracious-cori-hpQlE`
- **PR** : #14 (brouillon, base `main`). Son titre parle d'anciens placeholders
  mais elle contient TOUS les commits ci-dessous.
- **Production** (`main`, auto-déployée Vercel) : **non touchée** tant que la PR
  n'est pas fusionnée.

## Ce qui a été construit (médias photos/vidéos)
Objectif : permettre à Karim d'ajouter **photos + vidéos par produit** sans
toucher au code, **sans login/compte** (version « simple » pour l'instant).

Fichiers concernés (statiques, dans `/public`) :
- `public/BROCHURE_VOYAGES21_AVEC_IMAGES_V7.html` — la brochure (28 produits).
- `public/admin-medias.html` — interface d'admin autonome (lien séparé).
- `scripts/check_brochure.py` — contrôle structurel (lancé avant chaque push).

## Architecture du système médias
- **Stockage** : **Vercel Blob** (en ligne, partagé). Un manifeste JSON unique
  `media-manifest.json` mappe chaque produit → médias ; les fichiers (photos/mp4)
  sont des blobs publics référencés par URL. (On a quitté IndexedDB, qui était
  local à l'appareil et ne partageait rien.)
- **API** (Next.js App Router, jeton `BLOB_READ_WRITE_TOKEN` côté serveur) :
  - `src/app/api/media/route.js` — `GET` lit le manifeste, `PUT` l'écrit
    (fusion par produit `{key, rec}` pour ne pas écraser le travail d'un autre,
    ou remplacement complet pour import / tout effacer).
  - `src/app/api/media/upload/route.js` — `handleUpload` : upload **direct
    navigateur → Blob** (contourne la limite de taille des fonctions serverless,
    indispensable pour les vidéos).
- **Synchro temps réel** admin ↔ brochure du même appareil : `BroadcastChannel('v21_media')`.
- **Modèle d'un enregistrement** (manifeste) :
  ```js
  { key: 'modal-xxx', videoLink: '', videoUrl: '', images: [ {url:'...'} ] }
  ```
- **Correspondance clé ↔ carrousel** : `modal-XXX` ↔ `sl-XXX` (28 produits).
- **⚠️ Pré-requis Vercel** : créer un store Blob (Storage → Create → Blob →
  Connect au projet) pour injecter `BLOB_READ_WRITE_TOKEN`. Sans lui, l'admin
  affiche un bandeau d'avertissement et la brochure reste à l'original.

### Côté brochure (fonctions clés dans le `<script>`)
- `loadMedia()` : `fetch('/api/media')` → remplit `V21_MEDIA` → `applyMediaOverrides()`.
  Appelé au chargement (après `initSliders()`) et sur message BroadcastChannel.
- `applyMediaOverrides()` : (1) remplace le **fond** des diapos d'origine par les
  photos perso (`.slide:not(.slide-video)`, cyclage) ; (2) injecte une **diapo
  vidéo** `.slide.slide-video` + sa puce `[data-dot-video]`, avec réconciliation
  (supprime l'ancienne avant de recréer → pas de doublon). Tout en `try/catch`.
- `showSlide()` : joue/pause la vidéo de la diapo active (mp4, **muet, autoplay**)
  et **tient le carrousel** le temps de la vidéo (`video.onended` → avance +
  relance le timer 3500 ms). Repli si `play()` rejeté (relance le timer).
- `openVideo(key)` (bouton « Voir la vidéo ») : priorité `videoLink`
  (YouTube/Vimeo) → `CIRCUIT_VIDEOS[key]` → `videoUrl` (mp4 hébergé) → repli WhatsApp.
- `buildLinkEmbed(value)` : YouTube (id/url/shorts), Vimeo, ou fichier direct.
- CSS : `.slide video { object-fit: cover; ... }` ; popup vidéo `max-width: 640px`.

### Distinction d'usage (validée avec l'utilisateur)
- **Fichier mp4 (upload)** → diapo du **carrousel** qui démarre **toute seule,
  sans son**.
- **Lien YouTube/Vimeo** → bouton **« Voir la vidéo »** (au clic, **avec son**).
  ⚠️ YouTube intégré peut afficher des **pubs** (non désactivables côté site) →
  recommander **Vimeo** ou mp4 pour une expérience sans pub.

### Côté admin (`admin-medias.html`)
- **Liste déroulante** : on choisit un voyage puis on le renseigne (les voyages
  déjà remplis sont marqués d'une coche ✓).
- Par voyage : lien vidéo, fichier mp4 (galerie), photos par lien ou fichier
  (multiples), miniatures avec suppression.
- **Alertes automatiques** (bandeau orange) à l'upload :
  - vidéo > 10 Mo / > 30 s / > 720p ;
  - photo > 500 Ko / format portrait / largeur < 1200 px.
  - Specs idéales rappelées : photo paysage ≈ 1600×1000, < 500 Ko, JPG ~80 % ;
    clip < 30 s, < 10 Mo, 720p.
- À l'ajout d'un fichier : **upload direct vers Blob** puis enregistrement de
  l'URL dans le manifeste (PUT `/api/media`). Bandeau de connexion si le store
  Blob n'est pas joignable.
- **Export / Import JSON** (sauvegarde + transport du manifeste), **Tout effacer**
  (vide le manifeste en ligne pour tout le monde).

## État du partage (version en ligne)
Les médias sont désormais **partagés** : tout ce que l'équipe saisit dans l'admin
est stocké en ligne (Vercel Blob) et **visible par tous les visiteurs** du site
après rechargement. L'admin reste **sans login** (lien simple à partager).
Limite restante : pas d'authentification (quiconque a l'URL de l'admin peut
éditer) ni de gestion de conflits fine (dernier `PUT` par produit gagne).

## Prochaine étape probable
- Protéger l'accès admin (mot de passe simple) si besoin.
- Éventuel cache court du manifeste pour la brochure si le trafic grandit.

## Garde-fous / règle d'or
- Tout est **additif et défensif** : sans média saisi, la brochure affiche
  exactement l'original.
- On développe sur une **branche séparée** ; `main` (prod) intacte jusqu'à
  fusion de la PR.
- **Avant chaque push** : `python3 scripts/check_brochure.py public/BROCHURE_VOYAGES21_AVEC_IMAGES_V7.html`
  (doit afficher : 13 onglets, 28 modales/sliders, div équilibrées, « sain »).
- Vérifier la syntaxe JS : extraire les `<script>` et `node --check`.

## Historique des commits (récents → anciens)
- `44287f1` Admin : alertes automatiques poids/dimensions à l'upload
- `4cf7e4e` Vidéo galerie auto-jouée (mp4) + bouton « Voir la vidéo » (YouTube/Vimeo)
- `33735a7` Réduit la largeur de la popup vidéo (900px → 640px)
- `8df2295` Admin médias : stockage IndexedDB + sélection par liste déroulante
- `d4dd5d3` Première interface admin locale des médias
- `f0997e0` Bouton vidéo par carte ouvrant une popup YouTube
- `9a21489` Menu réorganisé en 3 titres avec méga-menu continents
- `1861268` Bouton WhatsApp flottant

## Liens de prévisualisation (branche)
- Admin : `…/admin-medias.html`
- Brochure : `…/BROCHURE_VOYAGES21_AVEC_IMAGES_V7.html`
  (domaine Vercel de prévisualisation de la branche)
