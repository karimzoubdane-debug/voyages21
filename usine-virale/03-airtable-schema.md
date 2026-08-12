# Schéma Airtable — Cerveau central de l'Usine

Airtable est la **source de vérité unique**. Tout passe par lui : idées, médias bruts, statuts de production, publication, stats.

## Base : "Usine Virale Voyages21"

### Table principale : `Publications`

| Champ | Type Airtable | Valeurs / Exemple |
|---|---|---|
| `Titre` | Single line text | "Coucher de soleil Erg Chebbi" |
| `Thématique` | Single select | `Sahara`, `Marrakech`, `Raid 4x4`, `Atlas`, `Côtes`, `Imperial Cities` |
| `Plateforme(s)` | Multiple select | `Instagram`, `TikTok`, `Facebook`, `LinkedIn`, `YouTube Shorts` |
| `Format` | Single select | `Reel`, `Carrousel`, `Photo`, `Short`, `Story` |
| `Médias Bruts` | Attachment | Une ou plusieurs photos/vidéos source |
| `Médias Restaurés` | Attachment | Sortie Bloc 1 (rempli automatiquement par n8n) |
| `Hook (titre viral)` | Long text | Généré par Claude/Gemini, modifiable par humain |
| `Description` | Long text | Texte de publication avec hashtags |
| `Langue` | Single select | `FR`, `EN`, `DE`, `IT`, `ES` |
| `Date programmée` | Date with time | Quand publier |
| `Statut` | Single select | Voir ci-dessous |
| `Lead capture mot-clé` | Single line text | Ex: `SAHARA`, `MARRAKECH`, `RAID` (déclenche ManyChat) |
| `Notes` | Long text | Libre |
| `Stats J+2 vues` | Number | Rempli par boucle Bloc 2 |
| `Stats J+2 engagement` | Number | Idem |
| `URL publication` | URL | Lien réel après publication |
| `Score viralité` | Formula | Calculé depuis les stats |

### Champ `Statut` — Workflow des statuts

```
Idée
  │
  ▼
Brouillon          ← humain rédige
  │
  ▼
En cours           ← DÉCLENCHEUR n8n Bloc 1 (restauration médias, génération SEO)
  │
  ▼
À valider          ← n8n a fini, humain doit vérifier le résultat
  │
  ├── Refusé       → retour Brouillon
  │
  ▼
Prêt               ← DÉCLENCHEUR n8n publication
  │
  ▼
Publié             ← n8n confirme la diffusion
  │
  ▼
Stats récupérées   ← Bloc 2 a écrit les stats J+2
```

**Règle critique** : seul un humain peut passer de `À valider` à `Prêt`. C'est le verrou Human-in-the-loop.

### Table secondaire : `Veille & Tendances`

| Champ | Type | Usage |
|---|---|---|
| `Source` | Single select | `Otterly.ai`, `Syften`, `Manuel`, `n8n boucle` |
| `Type` | Single select | `Tendance contenu`, `Nouvel outil`, `Mention marque`, `Insight perf` |
| `URL` | URL | Lien vers le contenu source |
| `Description` | Long text | Résumé |
| `Action proposée` | Long text | Ex: "passer les vidéos de 30s à 15s" |
| `Statut action` | Single select | `À analyser`, `Validé`, `Rejeté`, `Implémenté` |
| `Date détection` | Date | Auto |

### Table tertiaire : `Master Prompts`

Stocke les prompts utilisés par n8n pour générer SEO, hooks, descriptions. Permet de versionner sans toucher au workflow n8n.

| Champ | Type | Usage |
|---|---|---|
| `Nom prompt` | Single line | Ex: `hook-viral-reel-fr` |
| `Cas d'usage` | Single select | `Hook`, `Description`, `Hashtags`, `Réponse DM` |
| `Plateforme cible` | Multiple select | IG, TikTok, FB, LinkedIn, YT |
| `Langue` | Single select | FR/EN/DE/IT/ES |
| `Prompt template` | Long text | Le prompt avec variables `{{titre}}`, `{{theme}}`... |
| `Version` | Number | Incrémenté à chaque révision |
| `Statut` | Single select | `Actif`, `Test`, `Archivé` |
| `Performance moyenne` | Formula | Calculée depuis les stats des posts utilisant ce prompt |

## Mise en place pratique

1. Aller sur airtable.com, créer un workspace **"Usine Virale Voyages21"**.
2. Créer une base vide.
3. Créer les 3 tables ci-dessus avec les champs listés.
4. Récupérer la **Base ID** (visible dans l'URL : `airtable.com/appXXXXXXXXXXXXXX/...`) → la noter pour n8n.
5. Créer un **Personal Access Token** dans airtable.com/create/tokens avec les scopes `data.records:read`, `data.records:write`, `schema.bases:read` → noter le token pour n8n.

---

**Prochaine étape** : `04-first-workflow.md` pour configurer le premier flux n8n qui lit Airtable.
