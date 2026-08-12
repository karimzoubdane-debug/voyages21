# AXEL — Agent Conversationnel (chat site + WhatsApp)

> Équivalent ClientX : « Axel · Conversation AI » (99€/mois + 0,10€/message)
> Priorité recommandée : **#1** — impact direct sur la conversion des visiteurs du site V21.

---

## Prompt à me donner pour lancer la construction

```
Construis l'agent AXEL pour le site Voyages21 (Next.js 14 App Router, déployé sur Vercel).

Objectif : un widget de chat flottant présent sur toutes les pages du site, alimenté par
l'API Claude (claude-opus-4-8), qui :
1. Accueille chaque visiteur en français (puis anglais si le visiteur écrit en anglais).
2. Connaît tout le catalogue Voyages21 (circuits, séjours, "Avec qui partir", styles de
   voyage) et recommande le bon produit selon les réponses du visiteur.
3. Qualifie le lead : dates envisagées, nombre de voyageurs, budget, type d'expérience.
4. Collecte nom + email/WhatsApp et enregistre le lead dans la base de données.
5. Propose un rendez-vous téléphonique avec Karim quand le lead est chaud.

Respecte le design system du site : vert forêt #1B3A28, or #C8A440, crème #F5F0E8,
Playfair Display pour les titres, DM Sans pour le corps. Le widget ne doit jamais
masquer le bouton WhatsApp existant.
```

## Architecture

```
Visiteur (navigateur)                    Client WhatsApp
      │                                        │
      ▼                                        ▼
┌──────────────────┐              ┌─────────────────────────┐
│ <ChatWidget />   │              │ Meta WhatsApp Cloud API │
│ (client comp.)   │              │ (webhook entrant)       │
└────────┬─────────┘              └───────────┬─────────────┘
         │ POST /api/chat                     │ POST /api/whatsapp
         ▼                                    ▼
┌─────────────────────────────────────────────────────────┐
│  Route Handler Next.js (Vercel serverless)              │
│  • charge le catalogue (src/data/catalogue.json)        │
│  • appelle l'API Claude en streaming                    │
│  • tool use : save_lead, propose_rdv                    │
└──────────────┬──────────────────────────┬───────────────┘
               ▼                          ▼
        API Claude                 Vercel Postgres
        claude-opus-4-8            table `leads`
```

## Structure de fichiers

```
src/
  components/ChatWidget.jsx        — bulle flottante + fenêtre de chat (CSS Module)
  components/chatWidget.module.css
  app/api/chat/route.js            — endpoint chat web (streaming SSE)
  app/api/whatsapp/route.js        — webhook WhatsApp (vérification + messages)
  data/catalogue.json              — catalogue structuré (circuits, prix, durées)
  lib/claude.js                    — client Anthropic + system prompt + tools
  lib/db.js                        — accès Vercel Postgres (leads, conversations)
```

## Points techniques clés

- **API Claude** : SDK `@anthropic-ai/sdk`, modèle `claude-opus-4-8`, `thinking: {type: "adaptive"}`, streaming (`client.messages.stream`). Le system prompt (persona Axel + catalogue + règles de qualification) est mis en cache avec `cache_control: {type: "ephemeral"}` pour réduire le coût de ~90% sur les tours suivants.
- **Tool use** : deux outils définis — `save_lead` (nom, contact, dates, budget, circuit d'intérêt → INSERT en base) et `propose_rdv` (génère un lien Calendly/WhatsApp). Claude décide quand les appeler.
- **Mémoire de conversation** : historique stocké côté client (sessionStorage) et renvoyé à chaque tour ; conversation WhatsApp indexée par numéro de téléphone en base.
- **WhatsApp** : compte Meta Business + numéro vérifié ; le webhook reçoit les messages, les passe au même cerveau Claude, répond via l'API Cloud (gratuite jusqu'à 1000 conversations/mois).

## Étapes de construction

1. Catalogue structuré (`catalogue.json`) extrait des pages du site — 1 session.
2. Widget de chat UI + endpoint `/api/chat` streaming — 1 session.
3. Tool use `save_lead` + table Postgres + notification email/WhatsApp à Karim — 1 session.
4. Canal WhatsApp (config Meta + webhook) — 1 session.
5. Tests réels + ajustement du ton (vouvoiement, signature « l'équipe Voyages 21 »).

## Variables d'environnement

| Variable | Rôle |
|---|---|
| `ANTHROPIC_API_KEY` | API Claude |
| `POSTGRES_URL` | Base leads (Vercel Postgres) |
| `WHATSAPP_TOKEN` / `WHATSAPP_VERIFY_TOKEN` | Meta Cloud API |
| `NOTIFY_EMAIL` | où prévenir Karim d'un lead chaud |

## Coût estimé

- API Claude : ~0,01 à 0,03 € par conversation complète (avec cache). 500 conversations/mois ≈ 10-15 €.
- WhatsApp Cloud API : gratuit < 1000 conversations/mois.
- Vercel Postgres : offre gratuite suffisante au départ.
