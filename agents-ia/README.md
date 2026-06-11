# Agents IA Voyages21 — Plan de construction

Réponse à l'offre ClientX (6 agents à 99€/mois chacun) : ce que nous construisons
nous-mêmes avec Claude, intégré au site V21 (Next.js 14 / Vercel), pour un coût
marginal quasi nul.

## Les 6 agents — fichiers de prompts

| Ordre | Agent | Fichier | Difficulté | Dépendance externe |
|---|---|---|---|---|
| 1 | **Axel** — chat site + WhatsApp | [AXEL-agent-conversationnel.md](AXEL-agent-conversationnel.md) | Moyenne | Meta WhatsApp Cloud API |
| 2 | **Jade** — e-réputation, entonnoir d'avis | [JADE-e-reputation.md](JADE-e-reputation.md) | Faible (brique 1) | API Google Business Profile (brique 2) |
| 3 | **Max** — relances automatiques | [MAX-workflow-relances.md](MAX-workflow-relances.md) | Moyenne | Resend (email) |
| 4 | **Noa** — contenu réseaux sociaux | [NOA-social-media.md](NOA-social-media.md) | Faible (phase 1) | Higgsfield (déjà connecté) + Meta Graph API |
| 5 | **Eva** — landing pages & tunnels | [EVA-web-funnel.md](EVA-web-funnel.md) | Déjà opérationnel | Aucune |
| 6 | **Léa** — voice AI téléphonique | [LEA-voice-ai.md](LEA-voice-ai.md) | Élevée | Vapi/Retell (plateforme vocale) |

## Socle commun (à construire une fois, partagé par tous)

- **Base de données** : Vercel Postgres — tables `leads`, `followups`, `bookings`,
  `reviews`. Créée avec le premier agent (Axel), réutilisée par tous.
- **Catalogue structuré** : `src/data/catalogue.json` — circuits, séjours, prix,
  durées. Source de vérité pour Axel, Léa, Eva et Noa.
- **API Claude** : modèle `claude-opus-4-8`, adaptive thinking, prompt caching sur
  le catalogue. Une seule clé `ANTHROPIC_API_KEY` pour tous les agents.
- **Notifications Karim** : email + WhatsApp pour chaque lead chaud, avis négatif,
  ou réponse de prospect.

## Synergies entre agents

```
Eva (LP) ──lead──► Base ◄──lead── Axel (chat/WhatsApp) ◄──lead── Léa (téléphone)
                    │
                    ▼
              Max (relances J+1/J+3/J+7/J+14, rappels J-7/J-2)
                    │ fin de voyage J+2
                    ▼
              Jade (entonnoir d'avis → Google ou rattrapage privé)
                    ▲
              Noa (posts qui renvoient vers les LP d'Eva)
```

## Comparaison de coût mensuel (estimation usage agence)

| Poste | ClientX | Construction maison |
|---|---|---|
| 6 agents | 594 €/mois + consommation | 0 € d'abonnement |
| API Claude (tous agents) | — | ~15-25 € |
| Vapi (100 min de voix) | inclus partiel + 0,04-0,07€/min | ~10 € |
| Resend, Postgres, crons, Meta APIs | — | 0 € (offres gratuites) |
| **Total** | **~650-700 €/mois** | **~25-35 €/mois** |

Pour démarrer un agent : ouvrir son fichier, copier le bloc « Prompt à me donner »,
le coller dans une session Claude Code.
