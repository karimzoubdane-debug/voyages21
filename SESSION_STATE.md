# SESSION STATE — Voyages21 Site Web
<!-- Cowork met à jour ce fichier OBLIGATOIREMENT avant fin de session ou limite de tokens -->

## DERNIERE SESSION
- **Date :** 2026-04-19
- **Agent :** Karim (setup initial)
- **Duree estimee :** N/A

## TACHE EN COURS
_Aucune tâche en cours — démarrage du projet Phase 3_

## CE QUI A ETE FAIT CETTE SESSION
- [x] Fichier CLAUDE_SITE_V21.md créé et déployé sur GitHub
- [x] cockpit-data.json créé (source de vérité pour le Cockpit)
- [x] Cockpit v4 HTML créé (lit depuis GitHub automatiquement)
- [x] SESSION_STATE.md créé (ce fichier)

## PROCHAINE ETAPE IMMEDIATE
**Phase 3 — Page d'accueil :**
1. Analyser le design Black Tomato (https://www.blacktomato.com/)
2. Créer `src/app/page.jsx` avec vidéo header (fichier 2964957128)
3. Structure hero section : vidéo plein écran + overlay + titre + CTA

## FICHIERS MODIFIES CETTE SESSION
- `/CLAUDE_SITE_V21.md` (nouveau)
- `/cockpit-data.json` (nouveau)
- `/SESSION_STATE.md` (nouveau)

## DECISIONS PRISES
- Design ref = Black Tomato
- Video header = fichier local `2964957128` (à uploader sur Cloudinary ou Vercel Blob)
- Cockpit source de données = cockpit-data.json sur GitHub (plus localStorage)

## CONTEXTE IMPORTANT
- Site live : https://voyages21.vercel.app
- Repo : karimzoubdane-debug/voyages21
- Stack : Next.js + Tailwind + Sanity.io + Vercel
- 4 langues : FR/EN/ES/DE
- Jamais suggérer WordPress

## COMMANDE GIT POUR REPRENDRE
```bash
cd voyages21
git pull
cat SESSION_STATE.md
cat CLAUDE_SITE_V21.md
```
