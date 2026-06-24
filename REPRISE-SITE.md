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

## ▶️ Prochaines étapes (feux verts attendus)
- **« go #75 »** → fusionner l'accueil (n° tél + WhatsApp + hero sans décalage).
- **« go #77 »** → activer le dépôt auto de la sauvegarde sur Drive (nécessite
  le secret `GDRIVE_SA_JSON`).
- **#73** (Codex, obsolète/conflictuelle) → **à fermer** (rien à fusionner).

## 💾 Rappel sauvegarde (règle depuis 2026-06-23)
Après chaque session, rappeler à Karim de télécharger la dernière Release GitHub et de déposer les fichiers dans le Drive **« VOYAGES21 — SAUVEGARDES »**.
