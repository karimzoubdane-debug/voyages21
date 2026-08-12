# Journal des décisions — Usine Virale 2026

Toute décision d'architecture validée avec sa preuve. Sert de mémoire pour ne pas refaire les mêmes débats.

## 2026-05-21 — Architecture initiale validée

### Décisions structurantes

| Décision | Justification | Source |
|---|---|---|
| Séparation en 2 blocs (Production / Stratégie) | Résilience : un bug analytics n'arrête pas la production | NotebookLM (acceptée par Claude) |
| Airtable comme cerveau central (vs Notion initialement) | API plus mature pour automatisation, statuts plus rigides | Comparatif des deux outils |
| n8n self-hosted sur VPS (vs Make.com initialement) | Gestion supérieure des binaires 4K, coût flat à l'échelle | Benchmarks 2026 |
| Make.com conservé pour le site Voyages21 | Pas de migration inutile sur ce qui marche | Décision Karim |

### Outils retenus avec preuves

| Outil | Vérification | Source |
|---|---|---|
| **Nano Banana Pro (Gemini)** | Sorti nov. 2025, génère 4K via API Gemini, 0,24 $/image 4K | https://blog.google/innovation-and-ai/products/nano-banana-pro/ |
| **Topaz Image Web API** | Cloud, workflows automatisés (Autopilot, Photo Restoration, Sharpen) | https://www.topazlabs.com/api, https://developer.topazlabs.com/ |
| **Claid.ai** | Plateforme édition images mass, API documentée, 15 $/mois Essential | https://docs.claid.ai/, https://claid.ai/pricing |
| **Opus Clip (ClipAnything)** | Extraction clips viraux. API en early access — à valider sur le compte | Marché 2026 |
| **Otterly.ai** | AI brand monitoring sur ChatGPT/Gemini/Perplexity/AI Overviews/Copilot | https://otterly.ai/, cité par 8+ benchmarks 2026 |
| **Syften** | Veille communautés Reddit/forums, ~20 €/mois | https://syften.com |

### Outils explicitement retirés

| Outil | Raison | Source |
|---|---|---|
| ~~Readable.ai~~ | Hallucination NotebookLM persistante : aucune trace dans 10+ benchmarks LLM monitoring 2026 | Recherche web 21/05/2026, https://www.semrush.com/blog/llm-monitoring-tools/, https://backlinko.com/llm-tracking-tools |
| ~~Wondershare Symphony Creative Studio API~~ | "Symphony Creative Studio" est un produit TikTok/ByteDance, pas Wondershare. Pas d'API tierce | https://ads.tiktok.com/creative/creativestudio/home/en |
| ~~Brandwatch~~ | Tarif entreprise 1000+ €/mois, hors budget | Tarifs publics Brandwatch |

### Failure mode NotebookLM observé

NotebookLM a halluciné le pivot de Readable.ai vers "AI Search Intelligence" et a **persisté dans son hallucination** quand on lui a demandé de re-vérifier. Cause : il ne va pas sur internet, il reste fidèle aux documents qu'on lui fournit. Si un de ces documents contient de la désinformation, il la propage avec confiance.

**Règle pour la suite** : toute affirmation outil → vérification web directe avant intégration.

## Convention de mise à jour

Chaque nouvelle décision validée est ajoutée ici avec :
- Date
- Décision
- Pourquoi (1-2 phrases)
- Source / preuve

Format pour faciliter la lecture chronologique en bas de fichier.
