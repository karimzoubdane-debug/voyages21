# SESSION STATE — Voyages21 Site Web
<!-- Cowork met à jour ce fichier OBLIGATOIREMENT avant fin de session ou limite de tokens -->

## ⚠️ ATTENTION — PROJET EN COURS
**Ce projet est la BROCHURE HTML standalone : `public/design/homepage-v2.html`**
**Ce n'est PAS le site Next.js (src/app/) qui est déjà en production.**
**Ne jamais toucher à src/app/ ni à voyages21.vercel.app.**

## DERNIERE SESSION
- **Date :** 2026-05-29
- **Branche Git :** `claude/confident-meitner-Fiqzd`
- **Dernier commit :** `38d8979`

## FICHIER DE TRAVAIL
`public/design/homepage-v2.html`
Preview live : https://voyages21-git-claude-confident-meitner-fiqzd-voyages21.vercel.app/design/homepage-v2.html

## CE QUI EST FAIT — SECTION 1 COMPLÈTE

### Bloc 1 — Grille des risques (3 colonnes)
- Col 1 : "Organiser seul votre voyage : le vrai risque" — titre Playfair gold + rouge + sous-titre
- Col 2 : "Un transfert raté, un litige sur place" — stat rouge "2 à 3× le prix prévu" + texte
- Col 3 : "L'accès à l'invisible, sans mauvaise surprise" — stat "Zéro déception à l'arrivée" + texte

### Bloc 2 — Warning & Résolution (pleine largeur sous la grille)
- Gauche : triangle SVG rouge + "Vol annulé · Transfert introuvable · Changement urgent : personne au bout du fil" + stat "Votre problème devient notre problème."
- Droite : paragraphe équipe avec prénoms Wafa, Fouad, Ghizlane, Houda stylés en or Playfair

### Bloc 3 — Ticker fond navy (pleine largeur)
- Fond #1B2D4F, 4 scénarios en boucle :
  - [REBOOKING IMPOSSIBLE] — Ghizlane trouve une alternative en 10 minutes.
  - [LITIGE COMPAGNIE] — Houda prend en charge votre dossier.
  - [VOL ANNULÉ] — Wafa vous rappelle avant même que vous ne stressiez.
  - [BAGAGE PERDU] — Fouad active notre correspondant local sur place.
- Tags or bordés, tiret or, prénoms Playfair blanc italic, texte cream

## SECTIONS DÉJÀ CONSTRUITES (ordre de la page)
1. NAV — blanche fixe style Evaneos
2. HERO — vidéo Cloudinary plein écran, "Ici commence votre bonheur."
3. STATSBAR — bande chiffres clés
4. SECTION 1 "Pourquoi nous choisir" — COMPLÈTE (blocs 1+2+3)
5. SECTION 2 "Réserver tôt" — 4 colonnes + modal (déjà codée)
6. SECTION ÉQUIPE — 5 membres : Wafa, Wafa, Fouad, Ghizlane, Houda (fond navy)
7. Placeholders — Destinations, Croisières, Omra & Hajj

## PROCHAINE ÉTAPE IMMÉDIATE
Construire les sections suivantes section par section :
- **Destinations** (Maroc, Europe, Monde)
- **Croisières**
- **Omra & Hajj**
- **Footer**
- Puis fusion avec `BROCHURE_VOYAGES21_AVEC_IMAGES_V7.html`

## DESIGN SYSTEM (brochure)
```css
--navy:  #1B2D4F
--gold:  #C8A440
--cream: #F5F0E8
--white: #FFFFFF
--light: #FAF7F2
--muted: #6B7A8D
```
Fonts : Playfair Display (titres, italic 900) + DM Sans (corps)
Référence style : Evaneos.fr

## ÉQUIPE (noms confirmés)
Wafa (×2) · Fouad · Ghizlane · Houda

## RÈGLE ABSOLUE
Ce fichier = brochure standalone HTML uniquement.
Ne jamais toucher à src/app/page.jsx ni au site Next.js voyages21.vercel.app.

## CONTEXTE
- Repo : karimzoubdane-debug/voyages21
- Branche de travail : claude/confident-meitner-Fiqzd
- Branche production : main

## POUR REPRENDRE EN NOUVELLE SESSION
```
Lis SESSION_STATE.md et reprends le travail.
```
