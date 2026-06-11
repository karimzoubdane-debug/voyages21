# MAX — Agent Workflow & Relances (pipeline de leads)

> Équivalent ClientX : « Max · Workflow AI » (99€/mois + 0,05€/exécution)
> Argument ClientX repris : « 70% des ventes nécessitent 5 relances » — Max relance
> automatiquement chaque prospect jusqu'à la réservation, et réduit les no-shows.

---

## Prompt à me donner pour lancer la construction

```
Construis l'agent MAX pour Voyages21 : un système de relances automatiques des leads,
intégré au site Next.js existant et à la base Postgres partagée avec Axel et Eva.

Objectif :
1. Chaque lead (formulaire LP, chat Axel, WhatsApp) entre dans un pipeline avec statuts :
   nouveau → contacté → devis envoyé → relancé (x1-x5) → gagné / perdu.
2. Un cron Vercel quotidien (9h00 Maroc) détecte les leads à relancer selon la séquence :
   J+1 (email chaleureux), J+3 (valeur ajoutée : itinéraire PDF, témoignage), J+7
   (urgence douce : disponibilités), J+14 (dernière relance), puis statut "dormant".
3. Chaque message de relance est RÉDIGÉ PAR CLAUDE (claude-opus-4-8) à partir du contexte
   du lead : circuit d'intérêt, dates, budget, échanges précédents — jamais de template
   figé, toujours personnalisé, en français, ton Voyages21.
4. Envoi par email (Resend) et/ou WhatsApp selon le contact disponible. Karim reçoit
   une copie + peut stopper une séquence en un clic (lien dans la copie).
5. Anti-no-show : pour toute réservation confirmée, rappels automatiques J-7 et J-2
   avant le départ ou le rendez-vous.
6. Tableau de bord minimal : page protégée /admin/pipeline listant les leads par statut,
   avec historique des relances.

Contraintes : aucune relance sans consentement (case RGPD sur les formulaires), lien de
désinscription dans chaque email, maximum 5 relances puis arrêt définitif.
```

## Architecture

```
┌─────────────┐   ┌──────────────┐   ┌───────────────┐
│ Leads (Axel,│   │ Vercel Cron  │   │ /admin/       │
│ Eva, manuel)│   │ daily 09:00  │   │ pipeline (UI) │
└──────┬──────┘   └──────┬───────┘   └───────┬───────┘
       ▼                 ▼                   │
┌──────────────────────────────────────────┐ │
│ Vercel Postgres                          │◄┘
│ tables: leads, followups, bookings       │
└──────┬───────────────────────────────────┘
       ▼
┌──────────────────────────────────────────┐
│ /api/cron/followups (route handler)      │
│ 1. sélectionne les leads dus             │
│ 2. Claude rédige chaque message          │
│ 3. envoi Resend (email) / WhatsApp API   │
│ 4. log en base + copie à Karim           │
└──────────────────────────────────────────┘
```

## Structure de fichiers

```
src/
  app/api/cron/followups/route.js   — job quotidien (protégé par CRON_SECRET)
  app/api/cron/reminders/route.js   — rappels anti-no-show J-7 / J-2
  app/admin/pipeline/page.jsx       — tableau de bord (auth simple par mot de passe)
  lib/followup-sequences.js         — définition des séquences (délais, intentions)
  lib/claude-writer.js              — appel Claude : rédaction d'un message de relance
  lib/mailer.js                     — Resend (email transactionnel)
vercel.json                         — config des crons
```

## Points techniques clés

- **Rédaction Claude** : un appel `claude-opus-4-8` par message, `thinking: {type: "adaptive"}`,
  sortie structurée (`output_config.format` JSON : objet, sujet email, corps, canal).
  Le prompt inclut l'intention de l'étape (J+3 = apporter de la valeur, pas presser).
- **Idempotence** : chaque relance enregistrée dans `followups` avec (lead_id, étape)
  unique — un cron rejoué n'envoie jamais deux fois le même message.
- **Vercel Cron** : `vercel.json` → `{"crons":[{"path":"/api/cron/followups","schedule":"0 8 * * *"}]}`
  (8h UTC = 9h Maroc en hiver). Header `Authorization: Bearer CRON_SECRET` vérifié.
- **Escalade humaine** : si un lead répond à une relance, la séquence se met en pause
  et Karim est notifié — Max ne discute pas, il passe la main (ou à Axel sur WhatsApp).

## Étapes de construction

1. Tables `leads` (si pas déjà créée par Axel), `followups`, `bookings` — 1 session.
2. Séquences + rédacteur Claude + envoi email Resend — 1 session.
3. Cron Vercel + idempotence + copie Karim — même session.
4. Rappels anti-no-show + page /admin/pipeline — 1 session.

## Coût estimé

- Claude : ~0,01 €/message rédigé → 200 relances/mois ≈ 2-3 €.
- Resend : gratuit jusqu'à 3000 emails/mois.
- Vercel Cron : inclus. Total : quasi nul vs 99€/mois ClientX.
