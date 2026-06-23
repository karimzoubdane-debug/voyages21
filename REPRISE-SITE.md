# 🔁 REPRISE — Site Voyages21

> Fichier lu automatiquement quand Karim écrit **« www.voyages21.com »** au début
> d'une conversation. But : reprendre sans que Karim réexplique le contexte.
> **À mettre à jour après chaque avancée** (PR créée/fusionnée, décision, livraison).

_Dernière mise à jour : 2026-06-23_

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

## ⏳ PR #79 — EN COURS (branche `claude/voyages21-website-3x5q1x`)
**Ce que contient PR #79 (à valider point par point avant merge) :**

### ✅ Points validés
- (à confirmer par Karim au fur et à mesure)

### 🔄 Point 4 — Admin produits + PDF équipe (EN TEST)
**Ce qui est fait :**
- `⚡ Ajout rapide` dans l'onglet "+ Nouveau voyage" : destination + PDF → crée une fiche minimale instantanément
- `⬆ Importer une fiche` : importe un fichier `.json` exporté par le formulaire équipe → crée une fiche **complète** (titre, prix, durée, cadran, programme, inclus/exclus, hôtels, points forts…)
- `/api/pdf/upload` : endpoint dédié PDF (server-side `put` Vercel Blob)
- Bouton **👁 Voir** sur chaque fiche du catalogue admin → ouvre la fiche sur le site
- Bouton **📎 Télécharger la brochure** sur les fiches publiques (si pdfUrl présent)
- Les produits admin apparaissent automatiquement parmi les cartes sur les pages destination (ex: turquie.html)

**Flux de travail équipe → Karim :**
1. L'équipe remplit `formulaire-voyage.html` → clique "⬇ Télécharger la fiche" → envoie le `.json` à Karim
2. Karim dans l'admin → "⬆ Importer une fiche" → sélectionne le `.json` → fiche complète créée, visible sur le site
3. (Optionnel) L'équipe peut aussi envoyer le PDF pour le bouton "Télécharger la brochure"

**Point en suspens :**
- Karim doit tester l'import d'un vrai `.json` complet (pas le test "sdv" vide) pour valider que la fiche s'affiche bien avec tous les champs remplis

### 🔄 Point 5 — Panel "Îles paradisiaques" dans la NavBar
- Déjà implémenté dans PR #79
- **À valider par Karim** : vérifier que le panel s'affiche correctement dans la navigation

### ❓ Nouvelle destination (décision en suspens)
- Karim a demandé si on peut ajouter une destination qui n'existe pas encore
- Réponse : la fiche est créable via admin (sync immédiate), mais la page destination + le menu de navigation nécessitent une PR séparée
- **À décider** : quelle nouvelle destination Karim veut ajouter ?

## ▶️ Prochaines étapes
1. Karim teste l'import d'un `.json` complet depuis le formulaire équipe → valide Point 4
2. Karim valide le panel Îles paradisiaques (Point 5)
3. Dire **"go #79"** → merge PR #79 → visible sur www.voyages21.com
4. PR #75 (accueil tél+WhatsApp) et PR #77 (Drive auto) → toujours en attente de "go"
5. Éventuelle nouvelle PR pour nouvelle destination si Karim confirme laquelle

## 💾 Rappel sauvegarde (règle depuis 2026-06-23)
Après chaque session, rappeler à Karim de télécharger la dernière Release GitHub et de déposer les fichiers dans le Drive **« VOYAGES21 — SAUVEGARDES »**.
