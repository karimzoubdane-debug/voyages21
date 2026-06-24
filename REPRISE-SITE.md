# 🔁 REPRISE — Site Voyages21

> Fichier lu automatiquement quand Karim écrit **« www.voyages21.com »** au début
> d'une conversation. But : reprendre sans que Karim réexplique le contexte.
> **À mettre à jour après chaque avancée** (PR créée/fusionnée, décision, livraison).

_Dernière mise à jour : 2026-06-24_

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

## ⏳ EN TEST — Espace admin unifié (PR #80, accès équipe protégé)
PR ouverte (branche `claude/stoic-volta-u3hvla`, preview Vercel **au vert**).
Objectif : **un seul lien** `/admin` pour toute l'administration, avec
**séparation des rôles**. Karim doit tester puis dire « go #80 » → merge.

- **`/admin`** : page de connexion + portail. Selon le mot de passe :
  - **Propriétaire (Karim)** : accès aux 4 outils (Produits, Cover, Fiche
    Voyages, Médias) + réglages.
  - **Équipe** : accès **uniquement** à Fiche Voyages + Médias.
- **Connexion / récupération** :
  - Identifiant propriétaire de démo : **`DA21`** (tant que les variables Vercel
    ne sont pas posées → bannière « mode démo »).
  - **Mot de passe oublié** : code de secours **`VOYAGES21`** sur `/admin` pour
    réinitialiser → on n'est jamais bloqué.
- **Verrouillage serveur** (middleware) : `/admin-produits.html` et
  `/admin-cover.html` redirigent vers `/admin` si on n'est pas propriétaire ;
  `/admin-medias.html` et `/formulaire-voyage.html` exigent équipe ou
  propriétaire. Les **écritures API** sont protégées pareil (lecture publique du
  site ouverte).
- **Réglages propriétaire** : définir/changer le **mot de passe équipe** +
  **interrupteur ouvert/fermé** de l'accès équipe (instantané).
- **Nouveautés ajoutées dans cette PR** :
  - **Soumission directe par l'équipe** : l'équipe propose un voyage → il part
    dans une **file de validation**, Karim valide/refuse depuis son espace.
  - **Synchro Produits ↔ Médias** : les photos des voyages se piochent dans la
    médiathèque (plus de double saisie).
  - Bouton **« ← Espace admin »** sur chaque outil ; plus de menu/pied de page
    du site public sur les pages `/admin`.
- **À régler par Karim côté Vercel (1 fois)** : `V21_OWNER_PASSWORD` et
  `V21_AUTH_SECRET`. **Ne pas fusionner avant qu'ils soient mis.**

## ▶️ Prochaines étapes (feux verts attendus)
- **Espace admin unifié (#80)** : Karim teste sur la preview (login `DA21`,
  reset par `VOYAGES21`), pose `V21_OWNER_PASSWORD` + `V21_AUTH_SECRET` côté
  Vercel, puis « go #80 » → merge.
- **« go #75 »** → fusionner l'accueil (n° tél + WhatsApp + hero sans décalage).
- **« go #77 »** → activer le dépôt auto de la sauvegarde sur Drive (nécessite
  le secret `GDRIVE_SA_JSON`).
- **#73** (Codex, obsolète/conflictuelle) → **à fermer** (rien à fusionner).

## 💾 Rappel sauvegarde (règle depuis 2026-06-23)
Après chaque session, rappeler à Karim de télécharger la dernière Release GitHub et de déposer les fichiers dans le Drive **« VOYAGES21 — SAUVEGARDES »**.
