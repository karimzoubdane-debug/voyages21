# 🔁 REPRISE — Site Voyages21

> Fichier lu automatiquement quand Karim écrit **« www.voyages21.com »** au début
> d'une conversation. But : reprendre sans que Karim réexplique le contexte.
> **À mettre à jour après chaque avancée** (PR créée/fusionnée, décision, livraison).

_Dernière mise à jour : 2026-08-03_

## ▶️ Prochaine étape — Chantiers SEO restants (audit UX/SEO)
Les lots 1 & 2 de l'audit sont **fusionnés et en ligne** (voir ci-dessous). Restent
**2 chantiers séparés** (branche dédiée + PR draft chacun) :
1. **i18n FR/EN/ES/DE + hreflang** (`next-intl`) — le plus gros morceau.
2. **Bannière RGPD Cookieyes** (remplacer le placeholder `VOTRE_CLE_COOKIEYES`).
En parallèle (hors code) : **décision connexion domaine `voyages21.com`** (Valablue →
Vercel, migrer les emails AVANT) + choix hébergement vidéo header (fichier `2964957128`).

## ✅ Audit SEO lot 2 — Page d'accueil indexable à la racine (PR #245) — FUSIONNÉ le 2026-07-31
Branche `claude/voyages21-ux-seo-audit-gfyw9w` (repartie de `main` après #243).
- **Avant** : `/` = redirect 307 vers le splash vidéo `cover-ete-2026.html` (non indexable).
- **Maintenant** : rewrite `/` → `public/design/homepage-v2-luxe.html` (l'URL reste `/`,
  pas de redirection). La homepage a **déjà sa propre vidéo hero** → parcours visiteur
  inchangé. Suppression de `src/app/page.jsx`.
- `<head>` homepage : title/description/canonical/OG/Twitter — **positionnement corrigé**
  = agence généraliste Maroc + monde + Omra/Hajj + billetterie IATA (⚠️ PAS 4x4/circuits,
  qui relève du site **incoming**). `<h1>` rendu crawlable + `DEFAULTS.title`.
- ✅ **Avis Google RÉELS intégrés** au schéma `TravelAgency` **et** au carrousel : note
  **4,8 / 78 avis** (scraping Google Maps, Place ID `ChIJPaMFhYzurw0R50-J4mRz7oc`,
  état 2026-07-30) — les anciens avis fictifs (4,9/147, noms « Meryem A. », etc.) ont été
  **remplacés**. ➡️ La question « vrais avis ? » est donc **résolue**.

## ✅ Audit UX/SEO + correctifs SEO lot 1 (PR #243) — FUSIONNÉ le 2026-07-29 (squash `701a337`)
Branche `claude/voyages21-ux-seo-audit-gfyw9w`. Audit de conformité du site au plan
SEO (`src/app/seo-voyages21-SKILL.md`) : **UX ≈ 75 %, SEO ≈ 30 %**.
**Correctifs livrés (lot 1, sans toucher au design)** :
- `src/app/sitemap.js` (routes + scan `public/voyages/*.html`, **94 URLs**) et
  `src/app/robots.js` (blocage admin/account/api/studio + déclaration sitemap).
- `layout.jsx` : `metadataBase`, image OG par défaut, Twitter card, canonical,
  JSON-LD **`TravelAgency`**.
- FAQ : données extraites dans `faq/faqData.js` (source unique) + JSON-LD
  **`FAQPage`** rendu côté serveur.
- ✅ `npm run build` OK (`/robots.txt` + `/sitemap.xml` générés, JSON-LD dans le HTML).

## ✅ Hajj 2027 — Hôtel Médine « Baltimore 5★ » (PR #103) — FUSIONNÉ le 2026-06-27 (squash `283e16a`)
Correction du tableau des prix dans `public/voyages/destinations/hajj-2027.html`,
programme **برنامج الراحة الممتاز (Confort Premium)**. Le nom « بلتمور 5 نجوم »
était collé par erreur à la cellule Mecque ; c'est l'hôtel de **Médine**.
- Ligne 173 000 — Mecque : `السويس مكة` (retrait du « بلتمور 5 نجوم »).
- Lignes 173 000 et 185 900 — Médine : `المدينة المنورة بلتمور 5 نجوم` (ville puis hôtel).
- Programme Confort + ligne Mecque (الفيرمونت) inchangés. Aucun ajout admin média
  (clés galerie `hotel-md-premium` / `hotel-mk-swiss-biltmore` conservées).
- En ligne : `https://www.voyages21.com/voyages/destinations/hajj-2027.html`.

## 🆕 En cours — Affiche cliquable /avis-affiche (PR #100, DRAFT, 2026-06-27)
Au lieu d'un lien nu, envoyer **l'affiche cliquable**. Branche `claude/voyages21-website-56m5b9`.
- **Page** : `src/app/avis-affiche/page.jsx` → affiche entière = lien vers avis Google,
  + balises Open Graph (aperçu visuel sur WhatsApp). Lien : `https://www.voyages21.com/avis-affiche`.
- **Visuel** : `public/images/affiche-avis.png` (digital, gros bouton « Laisser mon avis »).
- **PDF cliquable** : `marketing/avis/voyages21-avis-affiche-CLIQUABLE.pdf` (annotation /Link pleine page).
- **Consignes** : encadré « Pour un avis qui nous aide vraiment » sous le visuel (note 5★, destination, conseiller, photo) + lien vers l'assistant.
- **Assistant d'avis** : `src/app/avis-guide/page.jsx` (server, OG) + `AvisGuide.jsx` (client).
  Page séparée à envoyer par WhatsApp/email : liste déroulante (voyages / service
  accueil / autre) + cases « ce qui a plu » + conseiller + mot perso → rédige
  l'avis (formulations variées) → boutons « Copier » et « Ouvrir Google et coller ».
  ⚠️ Google n'autorise pas le pré-remplissage : flux = copier → ouvrir → coller.
- **Preview** : `…/avis-affiche` et `…/avis-guide` sur `voyages21-git-claude-voyages21-website-56m5b9-voyages21.vercel.app`
- ⏭️ Attendre le « go #100 » de Karim après test → squash-merge sur main.

## ✅ Lien court /avis (PR #99) — FUSIONNÉ le 2026-06-27 (squash `f44021e`)
Lien simple à envoyer aux clients par WhatsApp pour laisser un avis Google en 1 clic
(pensé pour les personnes âgées). Branche `claude/voyages21-website-56m5b9`.
- **Route** : `src/app/avis/page.jsx` → `redirect()` vers la fenêtre « Laisser un avis »
  Google Business (`writereview?placeid=ChIJPaMFhYzurw0R50-J4mRz7oc`, Place ID déjà
  utilisé sur l'accueil + page Hajj).
- **Lien final** : `https://www.voyages21.com/avis`
- **Preview à tester** : `https://voyages21-git-claude-voyages21-website-56m5b9-voyages21.vercel.app/avis`
- **QR code + affiche A4** livrés (commit `dd8ee12`) dans `marketing/avis/` :
  QR couleur/noir/SVG + affiche A4 PDF prête à imprimer pour l'agence (scan →
  fenêtre d'avis Google). Le QR pointe vers le lien court → réimpression jamais
  nécessaire si le lien Google change.
- ⏭️ Attendre le « go #99 » de Karim après test → squash-merge sur main.

## Méthode de travail (règles fixes)
- Site officiel : **https://www.voyages21.com** (page d'accueil = `public/design/homepage-v2-luxe.html`, servie par Vercel).
- Jamais de push direct sur `main`. Toujours : **branche dédiée → PR (draft) → preview Vercel → attendre le « go » de Karim → squash-merge**.
- Karim valide en disant **« go »** (ou « go #NN »). Tant qu'il n'a pas dit « go », on ne fusionne pas.
- Sauvegarde automatique active (voir plus bas) — règle dans `CLAUDE.md`.

## Repères utiles
- **Admin produits** : https://voyages21-git-claude-voyages21-website-3x5q1x-voyages21.vercel.app/admin-produits.html (preview) / https://www.voyages21.com/admin-produits.html (prod après merge)
- **Admin médias** : https://www.voyages21.com/admin-medias.html
- **Formulaire équipe** : https://voyages21-git-claude-voyages21-website-3x5q1x-voyages21.vercel.app/formulaire-voyage.html (l'équipe remplit + clique "⬇ Télécharger la fiche" → envoie le .json à Karim)
- **Vercel Blob partagé** : les données admin (manifest produits, médias) sont partagées entre preview et prod — toute action dans l'admin preview est immédiatement visible sur www.voyages21.com
- **Sauvegarde** : workflow `.github/workflows/sauvegarde.yml` → Release à chaque PR fusionnée + chaque lundi. Dossier Drive : **« VOYAGES21 — SAUVEGARDES »** (id `1zA-k8LdhxbdSx7R4wGsKtqlQUMkWKyOI`).

## ⏳ EN COURS — Avis Google EN DIRECT (accueil + page Hajj) (PR #98, draft)
**Branche :** `claude/great-maxwell-k2yud3` · **Statut :** ✅ API OK (vrais avis récupérés) → preview à valider → attente « go ».
- Route serveur **`/api/avis-google`** (clé secrète, cache 6 h sur succès, **`?debug=1`** = appel frais + diagnostic
  sans exposer la clé). Source **unique** pour tout le site. **Repli total** : sans clé / erreur → contenu statique (zéro casse).
- **Accueil** (`public/design/homepage-v2-luxe.html`) : note + total + carrousel « Ce qu'ils écrivent sur Google »
  = **vrais avis** (réel : **4,8 / 42 avis** ; l'ancien 4,9/19 était codé en dur).
- **Page Hajj** (`public/voyages/destinations/hajj-2027.html`) : colonne d'avis Google en direct **à côté du cercle
  « آراء حجّاجنا »** (même route → synchronisé) + **galerie d'images déplacée en section en dessous** (IDs conservés).
- ✅ Clé `GOOGLE_PLACES_API_KEY` dans Vercel (Prod+Preview). Projet Google **918472731075** (« My First Project ») :
  **Places API (New)** activée + essai gratuit actif. (Le projet « REVIEWS SIT VOYAGES21 » n'était pas celui de la clé.)
- ⚠️ Limite API officielle = **5 avis max** (note + total complets). Avis Hajj = avis **agence généraux** (français),
  non filtrés Hajj (Google ne le permet pas) — choix « Option A » assumé par Karim.
- ⏭️ (1) valider la **preview** (accueil + Hajj), (2) **« go »** → squash-merge → en ligne.

## ✅ Déjà livré (fusionné sur main)
- Tri des voyages par prix croissant sur les pages destination.
- Croisières : sous-titres « avec / sans visa Schengen » + sous-menu nav + onglets.
- Compteur de voyages animé sur les pages destination.
- Barre de recherche accueil.
- Admin médias : sélecteur classé par univers.
- Sauvegarde automatique du site (Releases).
- **Admin Produits (#79, fusionné le 2026-06-24)** : back-office autonome pour
  ajouter/modifier/retirer des voyages (`/admin-produits.html`), formulaire
  équipe (`/formulaire-voyage.html`), API `/api/produits`, badges de statut,
  + corrections (bouton Confirmer, suppression immédiate, anti-cache Blob).
- **Espace admin unifié (#80, fusionné le 2026-06-24)** : **un seul lien**
  `/admin` pour toute l'administration, avec **séparation des rôles**.
  - **Propriétaire (Karim)** : 4 outils (Produits, Cover, Fiche Voyages, Médias)
    + réglages. **Équipe** : Fiche Voyages + Médias uniquement.
  - **Connexion = un mot de passe** (pas d'identifiant). Verrouillage serveur
    (middleware) + écritures API protégées (lecture publique ouverte).
  - **Réglages propriétaire** : mot de passe équipe + interrupteur ouvert/fermé
    de l'accès équipe. **Soumission directe par l'équipe** (file de validation)
    + **synchro Produits ↔ Médias** (photos piochées dans la médiathèque).
  - **Mot de passe oublié** : bouton sur `/admin` → code de secours + nouveau
    mot de passe (sans toucher à Vercel) → jamais bloqué.
  - ✅ **Réglages Vercel posés (2026-06-24)** : `V21_OWNER_PASSWORD`,
    `V21_AUTH_SECRET`, `V21_RECOVERY_CODE` (Production + Preview). Karim détient
    son mot de passe perso + son code de secours. Le « mode démo » a disparu.

## ✅ Hajj 2027 — PR #88 FUSIONNÉE sur `main` le 2026-06-26 (squash `c3f2beb`)
**En ligne :** `https://www.voyages21.com/voyages/destinations/hajj-2027.html`
Page : `public/voyages/destinations/hajj-2027.html` · Carte d'accès : bannière en haut
de `public/voyages/destinations/omra.html` (rubrique « Omra & Hajj » → mène à la page).
⏭️ **Reste à faire** : (1) brancher le lien Google « avis Hajj » quand la campagne a des
retours, (2) **vidéo réseaux** (prompt Higgsfield déjà rédigé : route A photo réelle animée
ou route B 100 % générée, format 9:16 + 1:1, textes « مناسك الحج 2027 », sans prix).

**Contenu en place (validé par Karim) :**
- Programme Hajj 2027 (1448 H), paiement Bareed Bank **20 juin → 10 juillet 2026**.
- 2 formules : **« برنامج الراحة » / « برنامج الراحة الممتاز »** (Confort / Confort Premium),
  tableau complet des prix (colonnes رباعية/ثلاثية/ثنائية), chiffres forcés LTR.
- Hôtels **Mecque ET Médine cliquables** (Google Maps), pastilles **taille uniforme**,
  emoji 👆 sautillant + infobulle, sans distances en mètres.
- Section **« Pourquoi nous choisir »** (3 cadrans, flux lumineux doré sur le contour) ;
  cadran avis cliquable + battement de cœur. Services optionnels en **3ᵉ colonne**.
- Label Ministère (`public/label-qualite-hajj.jpg`) + **licence 2D/02**.
- Slogan « أنتم للعبادة… ونحن للتنظيم » / « la dévotion pour vous, l'organisation pour nous ».
- Contacts **Wafa (0614 15 26 86) / Fouad (0673 28 00 09)**, WhatsApp + tél + Itinéraire GPS,
  barre flottante à droite, mention « contactez-nous » soulignée rouge.
- **Thème couleur (dernier choisi)** : **fond vert fluo uniforme `#c9f23a` + texte bleu nuit
  `#17263F`** (bloc CSS « Thème » en bas du `<style>`, facile à modifier).
- **Logo** dans la **bande bleue du haut, centré** (`#hajjLogo`), piloté par l'admin médias
  clé **`logo-hajj`** → ✅ fonctionne.
- **Visuel WhatsApp** : `public/images/share-hajj-2027.png` (« مناسك الحج 2027 · 1448 هـ »),
  source `public/share-hajj-2027.html` (capture via Chromium local + playwright-core).

**✅ RÉSOLU (2026-06-26) — carrousel galerie invisible :** c'était une **collision de
classe** : `.gallery` est déjà définie dans `voyage.css` comme lightbox modale
(`display:none; position:fixed`) → notre section héritait de `display:none` (0×0 px).
Corrigé en renommant la classe en **`.v21-gallery`**. Vérifié en local via Chromium
(section 1060×692, carrousel 1022×575, 6 images). La console affichait déjà
`[galerie-hajj] images détectées : 6` → les données étaient bonnes, c'était bien le rendu.

**Historique du diagnostic (pour mémoire) :**
- La galerie est pilotée par l'admin médias, clé **`galerie-hajj`** (univers Omra & Hajj).
- L'export du manifeste fourni par Karim (`voyages21medias_47.json`) **contient bien 6 images
  valides** sous `galerie-hajj` (URLs `*.blob.vercel-storage.com`), et `logo-hajj` (1 image).
- **Le logo s'affiche** (même mécanisme `/api/media`) **mais pas le carrousel.** Le code lit
  `media['galerie-hajj'].images[].url` exactement comme le logo ; carrousel reconstruit en
  `<img>` (object-fit cover) ; un **diagnostic visible** affiche « 0 photo détectée » si l'API
  ne renvoie rien pour cette clé (+ `console.log('[galerie-hajj]…')`).
- **Hypothèse n°1** : le live `/api/media` ne contient PAS `galerie-hajj` (enregistrement admin
  qui n'a pas persisté), alors que l'export en mémoire l'avait → **re-sauver dans l'admin**
  (preview) : Galerie Hajj 2027 → retirer/remettre une photo pour redéclencher « ✓ Enregistré ».
- **Hypothèse n°2** : souci de rendu côté page (à confirmer via la console / le diagnostic).
- ⚠️ **LIMITE ENVIRONNEMENT** : le proxy **bloque (403)** `www.voyages21.com` ET la preview
  `*.vercel.app` → impossible d'interroger `/api/media` en direct depuis l'agent pour trancher.
  Il faut le **retour visuel de Karim** (le diagnostic affiche « 0 photo détectée » ou le
  carrousel) ou qu'il regarde la **console navigateur** (`[galerie-hajj] images détectées : N`).
- ⚠️ **LIMITE FICHIERS** : les images **collées en aperçu** dans le chat ne sont PAS écrites sur
  le disque de l'agent (seuls le tout 1ᵉʳ label joint + le `.json` exporté l'ont été). Donc logo
  et photos passent **obligatoirement par l'admin médias** (clés `logo-hajj` / `galerie-hajj`).

**Admin à utiliser (PREVIEW, car les clés galerie-hajj/logo-hajj n'existent pas encore en prod) :**
`https://voyages21-git-claude-voyages21-website-ufgere-voyages21.vercel.app/admin`
→ Médias → univers « Omra & Hajj » → « Galerie Hajj 2027 » + « Logo Voyages 21 ».

⏭️ **Étapes restantes** : (1) résoudre l'affichage du carrousel, (2) « go officiel » = squash-merge
PR #88 sur main, (3) **vidéo réseaux** (prompt Higgsfield déjà rédigé : route A photo réelle animée
ou route B 100 % générée, format 9:16 + 1:1, textes « مناسك الحج 2027 », sans prix).

## ▶️ Prochaines étapes (feux verts attendus)
- **« go #75 »** → fusionner l'accueil (n° tél + WhatsApp + hero sans décalage).
- **« go #77 »** → activer le dépôt auto de la sauvegarde sur Drive (nécessite
  le secret `GDRIVE_SA_JSON`).
- **#73** (Codex, obsolète/conflictuelle) → **à fermer** (rien à fusionner).

## 💾 Rappel sauvegarde (règle depuis 2026-06-23)
Après chaque session, rappeler à Karim de télécharger la dernière Release GitHub et de déposer les fichiers dans le Drive **« VOYAGES21 — SAUVEGARDES »**.
