# 🔁 REPRISE — Site Voyages21

> Fichier lu automatiquement quand Karim écrit **« www.voyages21.com »** au début
> d'une conversation. But : reprendre sans que Karim réexplique le contexte.
> **À mettre à jour après chaque avancée** (PR créée/fusionnée, décision, livraison).

_Dernière mise à jour : 2026-06-25_

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

## ⏳ Hajj 2027 — PR #88, branche `claude/voyages21-website-ufgere` (EN COURS, mode test)
Page : `public/voyages/destinations/hajj-2027.html` · Carte d'accès : bannière en haut
de `public/voyages/destinations/omra.html` (rubrique « Omra & Hajj » → mène à la page).
Preview : `https://voyages21-git-claude-voyages21-website-ufgere-voyages21.vercel.app/voyages/destinations/hajj-2027.html`

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

**🐞 PROBLÈME OUVERT — le carrousel galerie ne s'affiche pas :**
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
