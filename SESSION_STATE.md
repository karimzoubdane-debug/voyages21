# SESSION STATE — Voyages21
<!-- Cowork met à jour ce fichier OBLIGATOIREMENT avant fin de session ou limite de tokens -->

## DERNIERE SESSION
- **Date :** 2026-05-21
- **Agent :** Claude (Cowork)
- **Branche :** `claude/automate-content-publishing-umPJI`
- **Duree estimee :** session d'arbitrage architecture + scaffolding

## TACHE EN COURS
Scaffolding initial de l'**Usine Virale 2026** (infrastructure parallèle d'automatisation contenu social) — dossier `/usine-virale/` créé sur la branche dédiée. Architecture validée, doc + workflow n8n prêts. Attente déploiement VPS par Karim.

## CE QUI A ETE FAIT CETTE SESSION
- [x] Arbitrage architecture NotebookLM vs vérification web
- [x] Vérification factuelle de 6 outils (Nano Banana Pro, Topaz, Wondershare, Readable.ai, Otterly, Claid.ai)
- [x] Confirmation hallucination NotebookLM sur Readable.ai → retiré de l'archi
- [x] Création dossier `/usine-virale/` avec :
  - `README.md` (vue d'ensemble 2 blocs)
  - `01-architecture.md` (archi validée + outils retirés)
  - `02-vps-setup.md` (install n8n pas à pas Hostinger/OVH/Contabo)
  - `03-airtable-schema.md` (3 tables, statuts Human-in-the-loop)
  - `04-first-workflow.md` (premier workflow Airtable Trigger + download)
  - `docker/docker-compose.yml` (stack n8n + PostgreSQL prête)
  - `.env.example` (variables à remplir)
  - `workflows/01-airtable-trigger.json` (workflow importable)
  - `decisions.md` (journal sourcé)

## PROCHAINE ETAPE IMMEDIATE
**Karim doit :**
1. Choisir et louer un VPS (Hostinger VPS 2 recommandé, ~7 €/mois) — voir `02-vps-setup.md`
2. Créer la base Airtable "Usine Virale Voyages21" avec les 3 tables — voir `03-airtable-schema.md`
3. Récupérer la Base ID + créer un Personal Access Token Airtable
4. Suivre `02-vps-setup.md` pour installer n8n via Docker
5. Importer `workflows/01-airtable-trigger.json` et configurer les credentials
6. Faire le test décrit en bas de `04-first-workflow.md`

Une fois ce premier test vert, on enchaîne avec l'intégration Topaz Image Web (futur `05-topaz-integration.md`).

## FICHIERS MODIFIES CETTE SESSION
- `/usine-virale/README.md` (nouveau)
- `/usine-virale/01-architecture.md` (nouveau)
- `/usine-virale/02-vps-setup.md` (nouveau)
- `/usine-virale/03-airtable-schema.md` (nouveau)
- `/usine-virale/04-first-workflow.md` (nouveau)
- `/usine-virale/decisions.md` (nouveau)
- `/usine-virale/docker/docker-compose.yml` (nouveau)
- `/usine-virale/.env.example` (nouveau)
- `/usine-virale/workflows/01-airtable-trigger.json` (nouveau)
- `/SESSION_STATE.md` (mis à jour)

## DECISIONS PRISES
- **Usine Virale = infrastructure parallèle au site**, dossier `/usine-virale/` dans le repo pour la doc et les configs, mais le runtime est sur un VPS séparé
- **Stack Bloc 1** : Airtable + n8n + Nano Banana Pro + Topaz Image Web + Claid.ai + Opus Clip + Claude/Gemini API + APIs sociales natives
- **Stack Bloc 2** : Otterly.ai + Syften + boucle n8n J+2
- **Readable.ai retiré définitivement** (hallucination NotebookLM confirmée par recherche web)
- **TikTok Symphony retiré** (produit TikTok ads, pas d'API tierce)
- **Make.com conservé pour le site** ; n8n pour l'Usine uniquement
- **Budget cible Usine** : ~150 €/mois en croisière

## CONTEXTE IMPORTANT
- Site live : https://voyages21.vercel.app
- Repo : karimzoubdane-debug/voyages21
- Stack site : Next.js + Tailwind + Sanity.io + Vercel
- 4 langues site : FR/EN/ES/DE
- Jamais suggérer WordPress
- Usine Virale = projet séparé du site, runtime sur VPS

## COMMANDE GIT POUR REPRENDRE
```bash
cd voyages21
git checkout claude/automate-content-publishing-umPJI
git pull
cat SESSION_STATE.md
cat usine-virale/README.md
```
