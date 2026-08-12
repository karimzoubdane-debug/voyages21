# USINE VIRALE 2026 — Voyages21

Infrastructure d'automatisation pour la production et la diffusion de contenus sociaux multi-plateformes.

> **À ne pas confondre avec le site web Voyages21** (le dossier racine du repo). L'Usine Virale est un système **séparé**, hébergé sur un VPS, qui produit et publie du contenu sur Instagram, TikTok, Facebook, LinkedIn et YouTube Shorts.

---

## Les deux blocs

```
┌───────────────────────────────────────────────────────────────┐
│                    BLOC 1 — MOTEUR D'EXÉCUTION                 │
│                                                                │
│   Airtable (cerveau)                                           │
│        │                                                       │
│        ▼                                                       │
│     n8n (orchestrateur, VPS)                                   │
│        │                                                       │
│        ├──► Topaz Image Web API   (restauration/upscale)       │
│        ├──► Nano Banana Pro       (reconstruction 4K)          │
│        ├──► Claid.ai API          (édition images mass)        │
│        ├──► Opus Clip API         (clips viraux vidéo)         │
│        ├──► Claude/Gemini API     (SEO, hooks, descriptions)   │
│        │                                                       │
│        └──► APIs sociales : IG, TikTok, FB, LinkedIn, YT       │
└───────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────┐
│                  BLOC 2 — CERVEAU STRATÉGIQUE                  │
│                                                                │
│   Otterly.ai      → monitoring marque dans LLM                 │
│   Syften          → veille communautés (Reddit, forums)        │
│   n8n boucle J+2  → récup stats réelles de publication         │
│   Agent IA        → corrélation perf vs tendances              │
│                                                                │
│        └──► écrit dans l'onglet "Veille" d'Airtable            │
└───────────────────────────────────────────────────────────────┘
```

## Budget cible

| Poste | Mensuel |
|---|---|
| VPS (Hostinger / OVH KS-LE-B) | ~5-10 € |
| Airtable Team | 20 € |
| Topaz Image Web | 9 € |
| Claid.ai Essential | 14 € (15 $) |
| Gemini Pro API (Nano Banana Pro) | ~20 € (variable) |
| Opus Clip | 30 € |
| Otterly.ai | ~30 € (à confirmer) |
| Syften | 20 € |
| **TOTAL estimé** | **~150 €/mois** |

## Documentation

1. [Architecture détaillée et sources](./01-architecture.md)
2. [Installation n8n sur VPS](./02-vps-setup.md)
3. [Schéma Airtable (cerveau central)](./03-airtable-schema.md)
4. [Premier workflow n8n](./04-first-workflow.md)
5. [Journal des décisions et sources](./decisions.md)

## Fichiers prêts à l'emploi

- [`docker/docker-compose.yml`](./docker/docker-compose.yml) — stack n8n + PostgreSQL prête à déployer
- [`workflows/01-airtable-trigger.json`](./workflows/01-airtable-trigger.json) — workflow n8n importable
- [`.env.example`](./.env.example) — variables d'environnement nécessaires

## Prochaine étape immédiate

Lire `02-vps-setup.md` puis `03-airtable-schema.md` dans cet ordre.
