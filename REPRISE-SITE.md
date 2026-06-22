# 🔁 REPRISE — Site Voyages21

> Fichier lu automatiquement quand Karim écrit **« www.voyages21.com »** au début
> d'une conversation. But : reprendre sans que Karim réexplique le contexte.
> **À mettre à jour après chaque avancée** (PR créée/fusionnée, décision, livraison).

_Dernière mise à jour : 2026-06-22_

## Méthode de travail (règles fixes)
- Site officiel : **https://www.voyages21.com** (page d'accueil = `public/design/homepage-v2-luxe.html`, servie par Vercel).
- Jamais de push direct sur `main`. Toujours : **branche dédiée → PR (draft) → preview Vercel → attendre le « go » de Karim → squash-merge**.
- Karim valide en disant **« go »** (ou « go #NN »). Tant qu'il n'a pas dit « go », on ne fusionne pas.
- Sauvegarde automatique active (voir plus bas) — règle dans `CLAUDE.md`.

## Repères utiles
- **Admin médias** (public, sans mot de passe) : https://www.voyages21.com/admin-medias.html — liste classée par univers.
  - Le site lie médias ↔ programmes par `mediaKey` (dans `public/voyages/data.js`, lus via `/api/media`). **Ne JAMAIS modifier ces clés.**
- **Sauvegarde** : workflow `.github/workflows/sauvegarde.yml` → Release à chaque PR fusionnée + chaque lundi.
  - Dossier Drive : **« VOYAGES21 — SAUVEGARDES »** (id `1zA-k8LdhxbdSx7R4wGsKtqlQUMkWKyOI`).
  - Dépôt Drive automatique : nécessite le secret GitHub `GDRIVE_SA_JSON` (clé compte de service Google).

## ✅ Déjà livré (fusionné sur main)
- Tri des voyages par prix croissant sur les pages destination.
- Croisières : sous-titres « avec / sans visa Schengen » (sans = rouge animé) + sous-menu nav + onglets sur la page cartes.
- Compteur de voyages animé (or + contour rouge) sur les pages destination.
- Barre de recherche accueil : aérée, sans chevauchement de texte.
- Admin médias : sélecteur classé par univers (clés intactes).
- Sauvegarde automatique du site (Releases).

## ⏳ En cours / à décider (au 2026-06-22)
- **PR #75** — Accueil : numéro `0614-152686` (tél+WhatsApp) + bouton « Voir l'introduction » dans la barre du haut (à la place de « Réserver », retiré de la vidéo) + hero sans décalage prix/vidéo. → **attend « go #75 ».**
  - Note hero : un prix ne s'affiche QUE si le produit a sa propre vidéo dans l'admin (« Hero produits accueil »).
- **PR #77** — Dépôt automatique de la sauvegarde dans Google Drive (clé secrète). → **attend « go #77 »** + réglage unique de la clé `GDRIVE_SA_JSON` côté Karim.
- **PR #73** (faite par Codex) — obsolète/conflictuelle (basée sur un ancien main). Le bon apport (admin médias par univers) a déjà été repris proprement. À fermer ou faire rebaser par Codex.
- **Test de redéploiement** : paquet Netlify prêt (preuve que le site est récupérable hors Vercel). Caveat : `/api/media` est une fonction Vercel → médias dynamiques absents sur un autre hébergeur.

## ▶️ Prochaines étapes proposées
1. Fusionner #75 (accueil) et #77 (dépôt Drive auto) quand Karim valide.
2. Régler la clé Google `GDRIVE_SA_JSON` pour activer le dépôt Drive automatique.
3. (Optionnel) Test de redéploiement Netlify.
