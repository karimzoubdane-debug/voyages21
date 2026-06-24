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
- **Admin produits** : https://www.voyages21.com/admin-produits.html (prod)
- **Admin médias** : https://www.voyages21.com/admin-medias.html
- **Formulaire équipe** : https://www.voyages21.com/formulaire-voyage.html (l'équipe remplit + clique "⬇ Télécharger la fiche" → envoie le .json à Karim)
- **Vercel Blob partagé** : les données admin (manifest produits, médias) sont partagées entre preview et prod — toute action dans l'admin preview est immédiatement visible sur www.voyages21.com
- **Sauvegarde** : workflow `.github/workflows/sauvegarde.yml` → Release à chaque PR fusionnée + chaque lundi. Dossier Drive : **« VOYAGES21 — SAUVEGARDES »** (id `1zA-k8LdhxbdSx7R4wGsKtqlQUMkWKyOI`).

## ✅ Déjà livré (fusionné sur main)
- Tri des voyages par prix croissant sur les pages destination.
- Croisières : sous-titres « avec / sans visa Schengen » + sous-menu nav + onglets.
- Compteur de voyages animé sur les pages destination.
- Barre de recherche accueil.
- Admin médias : sélecteur classé par univers.
- Sauvegarde automatique du site (Releases).
- **PR #79 (2026-06-24)** — Admin produits complet :
  - `⚡ Ajout rapide` : destination + PDF → fiche minimale instantanée
  - `⬆ Importer une fiche` : importe un `.json` du formulaire équipe → fiche complète (titre, prix, durée, programme, inclus/exclus, hôtels, points forts…)
  - Bouton **👁 Voir** sur chaque fiche du catalogue admin
  - Bouton **📎 Télécharger la brochure** sur les fiches publiques (si pdfUrl présent)
  - Les produits admin apparaissent automatiquement sur les pages destination
  - Panel **« Îles paradisiaques »** dans la NavBar
  - `/api/pdf/upload` : endpoint dédié pour upload de PDF (server-side Vercel Blob)

## Flux de travail équipe → site (opérationnel)
1. L'équipe remplit `formulaire-voyage.html` → clique "⬇ Télécharger la fiche" → envoie le `.json` à Karim
2. Karim dans l'admin → "⬆ Importer une fiche" → sélectionne le `.json` → fiche complète créée, visible sur le site
3. (Optionnel) Upload du PDF pour le bouton "Télécharger la brochure"

## ▶️ Prochaines étapes (feux verts attendus)

- **"go #75"** → fusionner l'accueil (n° tél + WhatsApp + hero sans décalage)
- **"go #77"** → activer le dépôt auto de la sauvegarde sur Drive (nécessite secret `GDRIVE_SA_JSON`)
- Éventuelle nouvelle PR pour nouvelle destination si Karim confirme laquelle

## 💾 Rappel sauvegarde (règle depuis 2026-06-23)
Après chaque session, rappeler à Karim de télécharger la dernière Release GitHub et de déposer les fichiers dans le Drive **« VOYAGES21 — SAUVEGARDES »**.
