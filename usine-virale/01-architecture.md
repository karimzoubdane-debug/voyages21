# Architecture validée — Usine Virale 2026

Architecture issue de l'arbitrage entre proposition NotebookLM et vérifications web Claude (mai 2026). Tous les outils listés ont été **confirmés réels avec API documentée**.

## BLOC 1 — Moteur d'exécution

| Composant | Rôle | Statut vérification |
|---|---|---|
| **Airtable** | Cerveau central : 7 champs, orchestration des statuts (Human-in-the-loop) | ✅ API publique mature |
| **n8n self-hosted (VPS)** | Orchestrateur, gère les binaires 4K, gratuit en licence | ✅ Open source, docker-compose officiel |
| **Nano Banana Pro** | Reconstruction faciale et texture 4K via Gemini API | ✅ Confirmé — 0,24 $/image 4K, 0,134 $/image 2K |
| **Topaz Image Web** | Débruitage, sharpening, restauration via API cloud | ✅ API officielle (developer.topazlabs.com) |
| **Claid.ai** | Édition images masse (background, upscale, restoration) | ✅ API documentée (docs.claid.ai), plan 15 $/mois |
| **Opus Clip** | Extraction de clips viraux + B-Rolls IA | ⚠️ API en early access — à valider sur le compte |
| **Claude API ou Gemini Pro** | SEO, hooks viraux, descriptions multilingues | ✅ APIs publiques |
| **APIs sociales natives** | Publication multi-plateformes via nœuds HTTP n8n | ⚠️ Variable selon plateforme (voir détail) |

### Détail APIs sociales

| Plateforme | API | Difficulté d'accès |
|---|---|---|
| Instagram | Meta Graph API (compte Business + page FB liée) | Modérée |
| Facebook | Meta Graph API | Faible |
| YouTube Shorts | YouTube Data API v3 | Faible |
| LinkedIn | LinkedIn Marketing API | Modérée (compte Page) |
| TikTok | Content Posting API | **Élevée** — approbation longue et incertaine |

> Recommandation : démarrer avec les 4 premières, ajouter TikTok quand l'approbation arrive (ou via intermédiaire payant comme Metricool).

## BLOC 2 — Cerveau stratégique

| Composant | Rôle | Statut vérification |
|---|---|---|
| **Otterly.ai** | Suivi mentions marque dans ChatGPT, Gemini, Perplexity, Google AI Overviews, Copilot | ✅ Confirmé, cité par 8+ benchmarks 2026 |
| **Syften** | Veille communautés Reddit/forums en temps réel | ✅ ~20 €/mois |
| **Boucle feedback n8n** | Récupération J+2 des stats publication | ✅ Via APIs analytics natives |
| **Agent IA Stratégiste** | Corrélation perf vs tendances, propositions de réglages | ⚠️ À cadrer strictement (risque hallucination) |

### Outils explicitement retirés (et pourquoi)

| Outil | Raison du retrait |
|---|---|
| ~~Readable.ai~~ | Hallucination NotebookLM confirmée : aucun benchmark LLM monitoring 2026 ne le cite. Remplacé par Otterly.ai. |
| ~~Wondershare Symphony Creative Studio API~~ | Confusion de nom : "Symphony Creative Studio" est un produit **TikTok/ByteDance**, pas Wondershare. Pas d'API tierce. Remplacé par Claid.ai. |
| ~~Filmora desktop API~~ | Pas d'API d'automatisation pour piloter face swap depuis n8n. Wondershare AILab API existe mais redondante avec Claid.ai. |
| ~~Brandwatch~~ | Tarif entreprise (1000+ €/mois), hors budget. |
| ~~Make.com~~ | Conservé pour le site Voyages21 ; pour l'Usine Virale, n8n self-hosted est plus économique à grande échelle et meilleur sur les fichiers binaires 4K. |

## Le maillon de liaison

```
Bloc 2 détecte tendance / mesure perf
        │
        ▼
Onglet "Veille & Tendances" dans Airtable
        │
        ▼
Master Prompts mis à jour (avec validation humaine)
        │
        ▼
Bloc 1 utilise les nouveaux prompts → production
        │
        ▼
Stats remontées dans Airtable principal (Unified Analytics)
```

**Principe de résilience** : les 2 blocs sont indépendants. Un bug analytics (Bloc 2) n'arrête jamais la production (Bloc 1).

## Sources de vérification

Toutes les vérifications outils ont été faites le 21 mai 2026 via recherche web directe. Voir [`decisions.md`](./decisions.md) pour le journal complet avec liens.
