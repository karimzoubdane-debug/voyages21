# JADE — E-Réputation AI (avis Google, entonnoir de satisfaction)

> Équivalent ClientX : « Jade · E-Réputation AI » (99€/mois + 0,10€/réponse à un avis)
> Rappel important : ClientX promet d'« intercepter les avis négatifs avant publication » —
> c'est techniquement impossible sur Google. Ce qu'ils vendent (et ce que nous construisons)
> est un **entonnoir de satisfaction** : les clients satisfaits sont dirigés vers Google,
> les insatisfaits vers un formulaire privé traité en interne.

---

## Prompt à me donner pour lancer la construction

```
Construis l'agent JADE pour Voyages21, en trois briques :

BRIQUE 1 — Entonnoir de satisfaction (le cœur) :
1. Page /avis sur le site : « Comment s'est passé votre voyage ? » avec notation 1-5
   étoiles (design V21 : étoiles or #C8A440 sur crème).
2. Note 4-5 → redirection immédiate vers le lien d'avis Google de Voyages21 avec un
   message de remerciement pré-rédigé que le client peut copier.
3. Note 1-3 → formulaire privé détaillé (qu'est-ce qui n'a pas été ? champ libre) →
   enregistré en base + alerte email/WhatsApp IMMÉDIATE à Karim pour rattrapage à chaud.
4. Déclenchement : MAX envoie automatiquement l'email "votre avis compte" à J+2 après
   la fin de chaque voyage (table bookings), avec lien personnalisé /avis?b=[booking_id].

BRIQUE 2 — Réponses aux avis Google :
5. Connexion à l'API Google Business Profile : récupération quotidienne des nouveaux avis.
6. Pour chaque avis, Claude (claude-opus-4-8) rédige une réponse personnalisée en
   français (et dans la langue de l'avis si différente) : remerciement nominatif,
   référence au circuit effectué, signature « Karim — Voyages 21 ».
7. Mode validation : la réponse part dans une file d'attente, Karim valide en un clic
   (lien dans l'email) avant publication. Jamais de publication sans validation au début.

BRIQUE 3 — Veille :
8. Rapport mensuel : note moyenne, évolution, thèmes récurrents (positifs/négatifs)
   analysés par Claude, recommandations d'action.
```

## Architecture

```
Fin de voyage (table bookings, via MAX)
      │  J+2
      ▼
Email "votre avis compte" ──► /avis?b=xxx
                                  │
                    ┌─────────────┴─────────────┐
                    ▼ note 4-5                  ▼ note 1-3
            Lien avis Google            Formulaire privé
            (avis public ↑)             → base + alerte Karim
                                        (rattrapage avant avis public)

API Google Business Profile (cron quotidien)
      │ nouveaux avis
      ▼
Claude rédige la réponse ──► file de validation ──► Karim approuve ──► publication
```

## Structure de fichiers

```
src/
  app/avis/page.jsx + avis.module.css      — page de notation (lien personnalisé)
  app/api/avis/route.js                    — enregistre la note / le feedback privé
  app/api/cron/reviews/route.js            — poll Google Business Profile + rédaction
  app/api/reviews/approve/route.js         — validation en un clic depuis l'email
  lib/google-business.js                   — client API GBP (OAuth)
  lib/review-writer.js                     — prompt Claude pour les réponses aux avis
```

## Points techniques clés

- **API Google Business Profile** : nécessite un compte Google Business vérifié pour
  Voyages21 + projet Google Cloud + validation d'accès à l'API (formulaire Google,
  délai ~2 semaines). En attendant : la brique 1 fonctionne sans aucune API.
- **Rédaction des réponses** : règles strictes dans le prompt — jamais sur la défensive,
  toujours remercier, pour un avis négatif : reconnaître + proposer un contact direct,
  max 4 phrases, pas d'excuses génériques.
- **RGPD** : le formulaire privé mentionne l'usage interne ; les feedbacks sont
  conservés 24 mois max.

## Étapes de construction

1. **Brique 1 sans dépendance** : page /avis + routage par note + alerte Karim — 1 session,
   livrable immédiatement, c'est elle qui « intercepte » les avis négatifs.
2. Branchement sur MAX (envoi automatique J+2 post-voyage) — même session.
3. Demande d'accès API Google Business Profile (à lancer tôt, délai Google).
4. Brique 2 : cron avis + rédaction Claude + file de validation — 1 session.
5. Brique 3 : rapport mensuel — 1 session courte.

## Coût estimé

- Claude : ~0,01 €/réponse d'avis + ~0,10 €/rapport mensuel.
- API Google Business Profile : gratuite. Total : quelques euros/mois vs 99€ ClientX.
