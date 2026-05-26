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
- **Stockage** : IndexedDB — base `voyages21-media`, store `media`, keyPath `key`.
  (On a quitté localStorage qui plafonnait à ~5 Mo et faisait perdre vidéos/photos.)
- **Synchro temps réel** admin ↔ brochure : `BroadcastChannel('v21_media')`.
- **Modèle d'un enregistrement** :
  ```js
  { key: 'modal-xxx', videoLink: '', videoBlob: Blob|null,
    images: [ {url:'...'} | {blob: Blob} ] }
  ```
- **Correspondance clé ↔ carrousel** : `modal-XXX` ↔ `sl-XXX` (28 produits).

### Côté brochure (fonctions clés dans le `<script>`)
- `loadMedia()` : lit IndexedDB → remplit `V21_MEDIA` → `applyMediaOverrides()`.
  Appelé au chargement (après `initSliders()`) et sur message BroadcastChannel.
- `applyMediaOverrides()` : (1) remplace le **fond** des diapos d'origine par les
  photos perso (`.slide:not(.slide-video)`, cyclage) ; (2) injecte une **diapo
  vidéo** `.slide.slide-video` + sa puce `[data-dot-video]`, avec réconciliation
  (supprime l'ancienne avant de recréer → pas de doublon). Tout en `try/catch`.
- `showSlide()` : joue/pause la vidéo de la diapo active (mp4, **muet, autoplay**)
  et **tient le carrousel** le temps de la vidéo (`video.onended` → avance +
  relance le timer 3500 ms). Repli si `play()` rejeté (relance le timer).
- `openVideo(key)` (bouton « Voir la vidéo ») : priorité `videoLink`
  (YouTube/Vimeo) → `CIRCUIT_VIDEOS[key]` → `videoBlob` → repli WhatsApp.
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
- **Export / Import JSON** (sauvegarde + transport), **Tout effacer**,
  **migration** unique depuis l'ancien localStorage.

## Limite ASSUMÉE de la version actuelle
Le stockage est **local à l'appareil/navigateur** (IndexedDB) : les médias ne
sont **pas encore partagés** avec les autres appareils ni avec les visiteurs du
site. C'est volontaire (« on fait simple, pas de login pour l'instant »).

## Prochaine étape probable
Rendre les médias **partagés/publics** via un **stockage en ligne** (ex. Sanity,
Vercel Blob/KV, ou autre) — l'interface d'admin ne changerait quasiment pas,
on remplacerait juste la couche de stockage. Cette étape nécessitera un compte
/ des identifiants (à décider avec l'utilisateur).

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
