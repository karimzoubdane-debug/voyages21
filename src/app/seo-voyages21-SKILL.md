# SKILL: seo-voyages21

## name
seo-voyages21

## description
Agent SEO autonome pour Voyages21 (DMC Maroc). Utilise ce skill quand l'utilisateur parle de : créer un article SEO, publier un contenu, pipeline Make.com, Perplexity → Claude → GitHub, agent SEO Maroc, article blog Voyages21, contenu circuits 4x4 moto, SEO international voyages21.com. Également déclenché par : "lance l'agent SEO", "crée un article", "pipeline SEO", "contenu Maroc", "blog Voyages21".

---

## CONTEXTE DU PROJET

**Site** : voyages21.com — DMC Maroc (circuits 4x4, moto, MICE), Marrakech depuis 2000  
**Fondateur** : Karim Zoubdane  
**Stack** : Next.js 16 App Router + CSS Modules + Vercel Pro + GitHub (karimzoubdane-debug/voyages21)  
**Langues** : FR (principal) / EN / DE — sous-répertoires /fr/ /en/ /de/ + hreflang  
**Hébergement** : Vercel Pro — déploiement automatique via git push

---

## PIPELINE SEO AUTONOME (5 ÉTAPES)

### ÉTAPE 1 — RECHERCHE (Perplexity)
- Interroger Perplexity sur le mot-clé cible (ex: "circuits 4x4 Maroc désert")
- Récupérer : volume de recherche estimé, concurrents, questions fréquentes, tendances
- Identifier l'intention de recherche (informationnel / transactionnel / navigationnel)

### ÉTAPE 2 — RÉDACTION (Claude API)
- Générer l'article en FR d'abord (langue principale)
- Structure obligatoire :
  - Titre H1 avec mot-clé principal
  - Introduction (150 mots max, accroche + promesse)
  - 3 à 5 sections H2 avec sous-titres H3
  - Section FAQ (5 questions minimum, format schema.org)
  - Call-to-action vers configurateur de devis
  - Meta title (55-60 caractères) + Meta description (150-160 caractères)
- Ton : expert tourisme luxe, direct, factuel, pas de superlatifs creux

### ÉTAPE 3 — TRADUCTION (DeepL API)
- Traduire en EN et DE automatiquement
- Vérifier les termes spécifiques Maroc (Sahara, Todra, Dades, medina, riad, hammam)
- Adapter le CTA selon la langue (pas juste traduire mot-à-mot)

### ÉTAPE 4 — VALIDATION (WhatsApp Business API)
- Envoyer un résumé de l'article (titre + intro + 3 points clés) à Karim via WhatsApp
- Numéro : +212 661 181 618
- Message type : "ARTICLE PRÊT — [Titre] — Valider ? Répondre OUI ou CORRIGER"
- Si OUI → passer à l'étape 5
- Si CORRIGER → réviser puis renvoyer

### ÉTAPE 5 — PUBLICATION (GitHub API → Vercel)
- Créer le fichier MDX dans `/content/blog/[slug].mdx`
- Front matter obligatoire :
  ```yaml
  ---
  title: ""
  description: ""
  date: ""
  lang: "fr"
  hreflang:
    fr: "/fr/blog/[slug]"
    en: "/en/blog/[slug]"
    de: "/de/blog/[slug]"
  keywords: []
  image: ""
  ---
  ```
- Commit + push → déploiement Vercel automatique
- Soumettre URL à Google Search Console via API

---

## TYPES D'ARTICLES PRIORITAIRES

| Type | Exemple | Fréquence |
|------|---------|-----------|
| Circuit détaillé | "Circuit raid 4x4 Sahara 10 jours" | 2/mois |
| Guide destination | "Que faire à Zagora en hiver" | 1/mois |
| Comparatif | "4x4 vs moto au Maroc : lequel choisir" | 1/mois |
| MICE | "Séminaire incentive Maroc : tout savoir" | 1/mois |
| Pratique | "Meilleure saison moto Maroc" | 1/mois |

---

## MOTS-CLÉS STRATÉGIQUES (FR / EN / DE)

**FR** : circuit 4x4 Maroc, raid moto Maroc, voyage désert Maroc, DMC Maroc, MICE Maroc, circuit privatif Maroc, séjour Marrakech luxe  
**EN** : Morocco 4x4 tour, Morocco motorcycle tour, Sahara desert trip Morocco, DMC Morocco, incentive travel Morocco  
**DE** : Marokko 4x4 Tour, Motorrad Reise Marokko, Sahara Wüste Marokko, Incentive Reise Marokko

---

## STRUCTURE TECHNIQUE SEO

- **URL** : `/fr/blog/[slug-en-francais]` — slug court, mot-clé inclus, tirets
- **Images** : WebP, alt text descriptif, nommage `circuit-4x4-sahara-maroc.webp`
- **Schema.org** : Article + FAQPage + TouristTrip (pour les circuits)
- **Sitemap** : auto-généré par Next.js + soumis à Search Console
- **Core Web Vitals** : LCP < 2.5s, INP < 200ms, CLS < 0.1

---

## OUTILS ET COÛTS ESTIMÉS

| Outil | Usage | Coût mensuel estimé |
|-------|-------|---------------------|
| Make.com | Orchestrateur | ~9€/mois (plan Pro) |
| Perplexity API | Recherche | ~5-10€/mois |
| Claude API | Rédaction | ~10-20€/mois |
| DeepL API | Traduction | ~5€/mois (Free jusqu'à 500k chars) |
| WhatsApp Business API | Validation | Gratuit (Meta) |
| GitHub API | Publication | Gratuit |
| Vercel | Déploiement | Inclus plan Pro |
| Google Search Console API | Indexation | Gratuit |
| **TOTAL** | | **~30-45€/mois** |

---

## PRÉREQUIS AVANT ACTIVATION (CHECKLIST)

- [ ] Phase 1 site terminée (7 pages + NavBar + Footer opérationnels)
- [ ] Dossier `/content/blog/` créé dans le repo GitHub
- [ ] Page `/blog` créée dans Next.js avec liste d'articles
- [ ] Make.com compte créé et scénario configuré
- [ ] Clés API : Perplexity + DeepL + Claude API + GitHub Personal Token
- [ ] WhatsApp Business API configuré (Meta for Developers)
- [ ] Google Search Console vérifié pour voyages21.com
- [ ] next-intl installé et configuré pour /fr/ /en/ /de/

---

## KPIs PAR PHASE

**Phase 3 (activation)** : 4 articles/mois publiés, 0 erreurs de déploiement  
**Phase 4 (6 mois)** : 50 articles indexés, 500 visites organiques/mois  
**Phase 5 (12 mois)** : 100+ articles, 2000+ visites organiques/mois, 10+ leads/mois via formulaire

---

## INSTRUCTIONS POUR CLAUDE QUAND CE SKILL EST INVOQUÉ

1. Demander à Karim le mot-clé cible ou le type d'article souhaité
2. Vérifier que les prérequis techniques sont en place (Phase 1 terminée)
3. Si Phase 1 non terminée : rappeler que l'agent SEO est Phase 3
4. Simuler le pipeline si demandé (rédiger l'article directement sans Make.com)
5. Toujours respecter la règle d'or : 3 phrases max + recommandation claire + jamais de flatterie
6. Se référer au document Drive "AGENT SEO AUTONOME" (ID: 15VY5FJRGfVfCIEPvVlVOsfnGYj4BoJgXGoQvmBdEyPY) pour les dernières décisions

---

*Skill créé le 25 avril 2026 — Projet Voyages21 — Karim Zoubdane*
