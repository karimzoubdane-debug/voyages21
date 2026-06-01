# Voyages21 — Fiche projet

## Identité
- **Projet** : Site web Voyages21 — agence de voyages sur mesure au Maroc depuis 2000
- **Fondateur** : Karim Zoubdane (karimzoubdane@gmail.com)
- **Stack** : Next.js 14 App Router (production) + maquette HTML standalone (en cours)

## URLs
- **Production (Next.js)** : https://voyages21.vercel.app/
- **Maquette en cours** : https://voyages21-git-claude-confident-meitner-fiqzd-voyages21.vercel.app/design/homepage-v2-luxe.html
- **Page avis (maquette)** : https://voyages21-git-claude-confident-meitner-fiqzd-voyages21.vercel.app/design/avis.html

## Dépôt GitHub
- **Repo** : karimzoubdane-debug/voyages21
- **Branche de travail active** : `claude/confident-meitner-Fiqzd`
- **PR ouverte** : #15 (draft)
- **Branche production** : main (auto-déployée sur Vercel)

## ⚠️ RÈGLES ABSOLUES — NE JAMAIS ENFREINDRE

> **`voyages21.vercel.app` est le site de PRODUCTION Next.js — il ne doit JAMAIS être modifié.**
> **Tout le travail se fait EXCLUSIVEMENT dans `public/design/` sur la branche `claude/confident-meitner-Fiqzd`.**

- **INTERDIT** : toucher à `src/`, `main`, ou tout ce qui déploie sur `voyages21.vercel.app`
- **OBLIGATOIRE** : travailler uniquement dans `public/design/` sur la branche `claude/confident-meitner-Fiqzd`
- **DISSOCIATION** : `voyages21.vercel.app` (production Next.js) ≠ `voyages21-git-claude-confident-meitner-fiqzd-voyages21.vercel.app` (maquette HTML — site de travail)
- WordPress, Elementor, WP Travel Engine sont abandonnés définitivement. Ne jamais les suggérer.

## Fichiers actifs
```
public/design/
  homepage-v2-luxe.html   — maquette principale (~3 300 lignes), HTML standalone
  avis.html               — page avis clients standalone
  team/                   — photos équipe (houda.jpg, wafa.jpg, fouad.jpg,
                            ghizlane.jpg, rabii.jpg)
```

## Design system (maquette)
- **Fonts** : Fraunces (titres, italic, 900) · Geist (corps, UI)
- **Couleurs** :
  - `--navy` : #0C0C0C
  - `--gold` : #C49A3C
  - `--cream` : #F7F0E0
  - `--white` : #FDFAF5
  - `--pierre` : #1E1A14
  - Section sombre (imprévus) : #0D1A14

## Structure de homepage-v2-luxe.html (sections dans l'ordre)
1. **Hero** — barre de recherche destinations, vidéo/fond sombre
2. **"Le monde appartient à ceux…"** — 4 colonnes KPI, fond crème
3. **Pourquoi Voyages21** — why-blocks 3 colonnes
4. **"En cas d'imprévu"** (`sr-section`, fond #0D1A14)
   - Éventail de 7 cartes blanches interactives (JS)
   - Cartes : Houda (DG, badge gold), Rabii, WafaB (2 imprévus), WafaD (2 imprévus), Fouad, Ghizlane, Karel
   - **Comportement hover** : snap au centre de l'éventail + monte 150px + scale 1.85× (instantané) → ressort élastique 800ms au départ
   - Chaque carte : barre couleur top, badge rouge clignotant, titre Fraunces souligné, boîte action fond #EEF3F0, photo agent 54px à droite, pied fond #0D1A14
   - Ticker résolutions défilant en bas
5. **Localteam** — équipe photos, fond crème
6. **Avis clients** — 6 review cards, fond pierre (`--pierre`)
7. **CTA + offres**

## Données Google Business réelles
- Note : **4.5★ / 19 avis** — Voyages 21 Marrakech
- **Lien panel avis** : `https://www.google.com/maps/place/Voyages+21/@31.6492146,-8.0132699,17z/data=!4m8!3m7!1s0xdafee8c8505a33d:0x87ee7364e2894fe7!8m2!3d31.6492146!4d-8.0132699!9m1!1b1!16s%2Fg%2F11bc7119df`
- **Lien direct formulaire rédaction (✅ actif)** : `https://search.google.com/local/writereview?placeid=ChIJPaMFhYzurw0R50-J4mRz7oc`
  - Place ID calculé depuis feature ID `0xdafee8c8505a33d:0x87ee7364e2894fe7` (protobuf + base64url)
  - Ouvre directement le formulaire avec étoiles + champ texte, le client se connecte avec son Gmail

## Ce qui reste à faire
- **Priorité 1** : Remplacer les 6 review cards fictives par les vrais avis Google (le client doit fournir les textes des 19 avis par screenshot ou copie-colle)
- **Optionnel** : Mettre à jour les reviews dans `avis.html` (même travail)

## Architecture Next.js (production — ne pas modifier)
```
src/
  app/
    page.jsx              — Page d'accueil
    home.module.css       — Styles homepage
    globals.css           — Styles globaux (navbar, footer)
    about/page.jsx        — Page À propos
    contact/page.jsx      — Page Contact
    layout.jsx            — Layout racine (NavBar + Footer + WhatsApp)
  components/
    NavBar.jsx            — Header 3 barres fixes (156px total)
    Footer.jsx            — Footer vert foncé
```
