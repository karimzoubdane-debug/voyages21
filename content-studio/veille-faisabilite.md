# Veille destinations — Rapport de faisabilité (Phase 0)

> Livrable n°1 du *Cahier des charges de la veille voyages — Proposition V2*.
> **Tests réalisés le 15/09/2026.** Tous les chiffres ci-dessous sont **mesurés**,
> pas estimés — sauf ceux explicitement marqués « estimation ».
> Objet : établir la couverture réellement disponible **avant** tout développement.

---

## 1. Verdict

**Faisable**, et à un coût de collecte plus faible que prévu.
Aucune famille de sources n'est perdue ; deux d'entre elles changent la façon de construire l'outil.

---

## 2. Les quatre acteurs du benchmark

| Acteur | Accès | Catalogue accessible | Extraction des prix |
|---|---|---|---|
| Evaneos | 200 | 1 095 pages voyage · 332 destinations · 279 articles | Difficile — modèle « sur devis » |
| Intrepid | 200 | 2 470 pages (plan du site `/en/`) | Prix présents dans le HTML, extraction sur mesure |
| G Adventures | 200 | 3 010 voyages | Site React — données dans la charge applicative |
| **Explore Worldwide** | 200 | **503 voyages** | **Fiche technique JSON-LD standard** |

### Explore Worldwide — la source de référence

Les pages produit exposent un bloc `application/ld+json` de type `Product` + `TouristTrip`.
Relevé réel sur `/holidays/argentina-chile-patagonia-walking` :

    name          : Adventures in Patagonia
    priceCurrency : USD
    price         : 7280.0
    durée         : 14 days

C'est le seul des quatre dans ce cas. Il sert donc de **source pivot** du benchmark :
structure fiable, comparaison reproductible d'un cycle à l'autre.

### Blogs et nouveautés éditoriales

| Source | Flux RSS | Volume |
|---|---|---|
| Intrepid — `/adventures/feed/` | oui | 1 733 articles |
| G Adventures — `/blog/feed/` | oui | 9 articles récents |
| Evaneos — magazine | non | 279 articles via le plan du site |
| Explore — blog | non | à collecter via le plan du site |

### Contrainte à respecter

`robots.txt` de G Adventures impose `Crawl-delay: 5`. Sur 3 010 voyages cela
représente environ 4 heures de collecte : la veille doit **cibler un sous-ensemble**
(destinations réellement vendues par Voyages21), jamais aspirer le catalogue entier.

---

## 3. YouTube — gratuit, sans clé API

Le script `youtube-monitor/monitor.js` n'utilise pas la YouTube Data API : il lit les
**flux RSS publics** (`youtube.com/feeds/videos.xml?channel_id=…`).

- Aucune clé, aucun quota, aucun coût.
- Renvoie : titre, date de publication, description, vignette, identifiant vidéo.
- Le cahier des charges prévoyait la YouTube Data API : **elle n'est pas nécessaire
  pour détecter les nouveautés.**

**Limite mesurée** : le flux RSS ne fournit ni le nombre de vues ni les commentaires
de manière garantie. Pour alimenter le critère « qualité des retours et échanges avec
les voyageurs » de la grille de fiabilité, la YouTube Data API reste nécessaire **en
complément** (quota gratuit quotidien).

---

## 4. Instagram et TikTok

| Test direct | Résultat |
|---|---|
| Instagram (profil public) | **HTTP 429** — blocage immédiat |
| TikTok (profil public) | page servie mais **captcha + mur de connexion** |

C'est la reproduction exacte de l'échec constaté en juin 2026 et consigné dans
`veille-concurrents.md`. Ce n'est pas un incident : c'est le comportement normal de
ces plateformes face à une collecte automatisée.

**Contournement retenu : Apify** (connecteur déjà rattaché au compte, niveau BRONZE).
Tarifs relevés le 15/09/2026 :

| Outil | Prix unitaire |
|---|---|
| Instagram — posts de profil | 0,00055 $ / résultat |
| TikTok — profils (`clockworks/tiktok-profile-scraper`) | 0,002 $ / résultat |
| TikTok — transcription d'une vidéo | 0,041 $ / vidéo — à n'utiliser qu'exceptionnellement |

Volume cible (25 créateurs × 12 publications × 2 cycles par mois) :

    Instagram : 600 résultats × 0,00055 $ = 0,33 $ / mois
    TikTok    : 600 résultats × 0,002   $ = 1,20 $ / mois
    ----------------------------------------------------
    Total collecte sociale              ≈ 1,50 $ / mois

---

## 5. Budget de fonctionnement

| Poste | Coût mensuel | Fiabilité |
|---|---|---|
| YouTube (flux RSS) | 0 $ | mesuré |
| 4 tour-opérateurs (pages + RSS) | 0 $ | mesuré |
| Instagram + TikTok (Apify) | ~1,50 $ | tarifs officiels relevés |
| Hébergement Vercel | 0 à 20 $ | à confirmer selon le plan |
| Base PostgreSQL (Supabase) | 0 à 25 $ | à confirmer selon le plan |
| Moteur IA (rédaction et notation des fiches) | ~5 à 15 $ | **estimation non mesurée** |

**Fourchette réaliste : 7 $ à 60 $ par mois.** Le chiffre définitif ne peut être établi
qu'après un premier cycle réel : le coût du moteur IA dépend du volume de contenu analysé.

---

## 6. Écarts par rapport au cahier des charges

1. **YouTube Data API** — non nécessaire pour la détection ; utile seulement pour les
   statistiques d'engagement.
2. **Explore Worldwide** — devient la source pivot du benchmark (données structurées).
3. **Instagram / TikTok** — impossibles en accès direct ; passage obligatoire par Apify.
4. **G Adventures** — collecte à restreindre (délai imposé de 5 s entre deux pages).
5. **Fiches produit HTML** — le modèle cité (`turquie-sejour-istanbul.html`) est une
   coquille de 729 octets : les 60 fiches du site partagent un moteur unique
   (`public/voyages/data.js` + `render.js`). La veille doit donc produire **un objet au
   format `data.js`**, pas du HTML autonome.
6. **Trois montants séparés** (séjour hors vol · aérien · total consolidé) — le schéma
   actuel de `data.js` ne comporte qu'un champ `price` unique. Son extension est un
   prérequis non prévu par le cahier des charges.
7. **Benchmark à deux étages** — aux 4 acteurs internationaux s'ajoutent les concurrents
   marocains déjà documentés dans `veille-concurrents.md` (concurrence directe).

---

## 7. Sources vérifiées

- https://www.evaneos.fr/ · https://www.intrepidtravel.com/ · https://www.gadventures.com/ · https://www.exploreworldwide.com/
- Plans de site et `robots.txt` des quatre acteurs
- https://www.youtube.com/feeds/videos.xml?channel_id=… (flux RSS publics)
- Apify Store — tarifs des acteurs Instagram et TikTok (niveau BRONZE)
