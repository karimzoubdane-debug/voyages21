# V21 PILOT — application (Lot 0 : fondations)

Cockpit interne Voyages21 (contacts, segments, campagnes…). **Application isolée
du site public** : elle vit dans son propre dossier `pilot-app/` avec son propre
`package.json`, elle n'est **pas** buildée par le déploiement du site
voyages21.com. Aucun risque pour le site.

## Stack
- Next.js 14 (App Router) · React
- Supabase (base de données + authentification par lien e-mail)

## Ce que fait le Lot 0
- Ossature de l'app + page de connexion (lien magique par e-mail)
- Tableau de bord vide protégé par authentification
- Écran de « mise en route » tant que Supabase n'est pas branché
- Rien n'est connecté aux vraies données (ça vient au Lot 1)

## Mise en route (à faire une fois)
1. **Créer un projet Supabase** sur https://supabase.com (gratuit).
2. Dans Supabase → Réglages → API, copier **Project URL** et **anon public key**.
3. Copier `.env.example` en `.env.local` et coller les deux valeurs.
4. Installer et lancer :
   ```bash
   cd pilot-app
   npm install
   npm run dev
   ```
   Ouvrir http://localhost:3000 → tu es redirigé vers /login.

## Déploiement (lien de test)
- Créer un **nouveau projet Vercel** pointant sur le dossier `pilot-app/`
  (Root Directory = `pilot-app`) — séparé du projet du site.
- Y ajouter les deux variables d'environnement `NEXT_PUBLIC_SUPABASE_URL` et
  `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Brancher le sous-domaine `pilot.voyages21.com`.

## Prochains lots
Voir `outils/nettoyage-contacts/ROADMAP-V21-PILOT.md`. Lot 1 = Contacts
(import + nettoyage + affichage).
