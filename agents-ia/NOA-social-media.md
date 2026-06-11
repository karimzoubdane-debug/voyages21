# NOA — Social Media AI (contenu quotidien Instagram / Facebook)

> Équivalent ClientX : « Noa · Social Media AI » (99€/mois + 0,45€/1000 mots + 0,30€/image)
> Particularité ici : les visuels sont générés via **Higgsfield**, directement activable
> depuis nos sessions de chat (images, vidéos/reels, upscale, recadrage, prédicteur de viralité).

---

## Prompt à me donner pour lancer la construction

```
Construis l'agent NOA pour Voyages21 : production et planification de contenu pour
Instagram et Facebook (@voyages21).

Objectif :
1. Un calendrier éditorial mensuel généré par Claude : 3-4 posts/semaine alternant
   piliers de contenu — (a) inspiration destination (désert, Atlas, médinas, côte),
   (b) coulisses & expertise (25 ans, Karim, équipe locale), (c) témoignages clients,
   (d) offre du moment (lien vers landing page Eva).
2. Pour chaque post : caption en français (ton V21, élégant, storytelling), hashtags
   (mix FR/EN, niche + volume), heure de publication optimale, et le visuel.
3. Visuels : photos clients retouchées (Higgsfield : upscale, recadrage 4:5 et 9:16)
   ou images générées (Higgsfield generate_image) dans une direction artistique
   constante — lumière dorée, tons chauds, esthétique éditoriale, jamais "stock photo".
4. Reels : 2/mois générés avec Higgsfield generate_video (animation de photos de
   circuits), testés avec le prédicteur de viralité avant publication.
5. Publication : via l'API Meta Graph (Instagram Content Publishing API) avec
   programmation, OU export d'un lot mensuel (visuels + captions dans /content/AAAA-MM/)
   que Karim publie via Meta Business Suite — commencer par l'export, automatiser ensuite.

Mode de fonctionnement : une session mensuelle où je produis tout le lot du mois,
Karim valide, puis publication programmée.
```

## Architecture

```
Session mensuelle Claude Code
      │
      ├─► Claude (claude-opus-4-8) : calendrier + captions + hashtags
      │
      ├─► Higgsfield MCP : generate_image / generate_video / upscale / reframe
      │         └─► virality_predictor sur les reels
      │
      ▼
content/2026-07/
  calendrier.md                 — vue d'ensemble du mois
  01-merzouga/caption.md + visuel.jpg
  02-temoignage-sarah/caption.md + visuel.jpg
  ...
      │
      ▼ (phase 2 — automatisation)
/api/cron/publish  →  Meta Graph API (publication programmée)
```

## Structure de fichiers (phase 2 automatisée)

```
src/
  app/api/cron/publish/route.js    — publie les posts du jour (file d'attente en base)
  lib/meta-graph.js                — client Instagram/Facebook Publishing API
  lib/content-pillars.js           — piliers, ton, règles de la marque
content/                           — lots mensuels validés (source de vérité)
```

## Direction artistique (à respecter dans chaque génération Higgsfield)

- Palette naturelle chaude : ocres du désert, vert palmeraie, heure dorée.
- Cohérence avec le site : élégance Playfair, jamais de néon, jamais de filtres criards.
- Formats : 4:5 (feed), 9:16 (reels/stories), 16:9 (Facebook lien).
- Toujours des scènes crédibles du Maroc réel (Merzouga, Aït Ben Haddou, Chefchaouen,
  Essaouira, Atlas) — pas de paysages génériques inventés.
- Texte sur image : minimal, Playfair italic, or #C8A440 sur photo assombrie.

## Étapes de construction

1. **Phase 1 (immédiate, zéro infra)** : première session mensuelle — calendrier +
   captions + visuels Higgsfield livrés dans `content/2026-XX/`, publication manuelle
   par Karim via Meta Business Suite (programmation native gratuite).
2. **Phase 2** : compte développeur Meta + app + token longue durée → publication
   automatique par cron Vercel depuis la file en base.
3. **Phase 3** : boucle d'amélioration — je lis les statistiques (API Insights) et
   j'ajuste les piliers selon l'engagement réel.

## Coût estimé

- Claude : ~1-2 € par lot mensuel de captions.
- Higgsfield : selon crédits du compte (à vérifier via l'outil `balance` en session).
- Meta Graph API : gratuite. Total très inférieur aux 99€/mois + 0,30€/image de ClientX.
