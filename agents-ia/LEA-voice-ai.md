# LÉA — Voice AI (réception téléphonique, qualification, prise de RDV)

> Équivalent ClientX : « Léa · Voice AI » (99€/mois, 50 min incluses, puis 0,07€/min
> sortant · 0,04€/min entrant)
> Statut : **le seul agent où Claude seul ne suffit pas** — il faut une plateforme vocale
> temps réel (recommandation : Vapi ou Retell AI) qui gère téléphonie, reconnaissance
> vocale et synthèse vocale, avec Claude comme cerveau conversationnel.
> À construire en dernier, seulement si le volume d'appels manqués le justifie.

---

## Prompt à me donner pour lancer la construction

```
Construis l'agent LÉA pour Voyages21 : une assistante vocale qui répond au téléphone
quand Karim ne peut pas décrocher (occupé, soir, week-end).

Objectif :
1. Décrocher en français : « Voyages 21 bonjour, je suis Léa, l'assistante de Karim... »
   (bascule en anglais ou arabe si l'appelant ne parle pas français — selon les voix
   disponibles sur la plateforme choisie).
2. Comprendre la demande : renseignement circuit, demande de devis, client en voyage
   (urgence), partenaire/fournisseur.
3. Qualifier comme Axel : destination souhaitée, dates, nombre de voyageurs, budget.
4. Issues possibles : (a) prendre un créneau de rappel par Karim et l'inscrire,
   (b) envoyer par SMS/WhatsApp le lien du site ou d'une landing page,
   (c) urgence client en voyage → transfert d'appel direct vers le mobile de Karim.
5. Après chaque appel : résumé écrit (transcription + lead créé dans la base partagée)
   envoyé à Karim par WhatsApp/email.

Plateforme : Vapi (vapi.ai) — assistant configuré avec model provider Anthropic
(claude-opus-4-8 ou claude-haiku-4-5 pour la latence), voix française naturelle
(ElevenLabs), numéro marocain ou français selon disponibilité (sinon numéro Twilio).
```

## Architecture

```
Appelant ──► Numéro (Twilio/Vapi) ──► Vapi / Retell AI
                                          │  (STT temps réel → texte)
                                          ▼
                              Claude (cerveau conversationnel)
                              system prompt Léa + catalogue V21
                              + tools : create_lead, book_callback,
                                        transfer_call, send_sms
                                          │  (texte → TTS voix naturelle)
                                          ▼
                                     Réponse vocale
                                          │ fin d'appel (webhook)
                                          ▼
                        /api/voice/webhook (Next.js)
                        → lead en base + résumé à Karim
```

## Répartition du travail

| Composant | Qui le fait |
|---|---|
| Persona, system prompt, scénarios d'appel, qualification | **Moi (Claude)** — cœur du travail |
| Tools (create_lead, book_callback, transfer_call) | **Moi** — endpoints Next.js appelés par Vapi |
| Webhook post-appel + résumé + base leads | **Moi** — intégré au site existant |
| Téléphonie, STT, TTS, latence | **Vapi/Retell** (configuration guidée par moi) |
| Choix de la voix française | **Karim** valide à l'écoute |

## Scénarios à couvrir dans le system prompt

1. Demande d'information circuit → mini-qualification → SMS avec lien + créneau de rappel.
2. Demande de devis → qualification complète → lead chaud + rappel prioritaire.
3. Client actuellement en voyage avec un problème → empathie + transfert immédiat
   vers le mobile de Karim (tool `transfer_call`), jamais de file d'attente.
4. Démarchage commercial → réponse polie et brève, pas de transfert.
5. Hors horaires → préciser les horaires + proposer le rappel.

Règles : ne jamais inventer un prix (donner une fourchette du catalogue uniquement),
ne jamais confirmer une réservation par téléphone (toujours « Karim vous rappelle pour
finaliser »), durée max d'appel 6 minutes puis proposition de rappel.

## Étapes de construction

1. Compte Vapi + numéro + choix voix française — 1h de configuration (guidée).
2. System prompt Léa + catalogue + scénarios — 1 session (moi).
3. Tools/webhooks Next.js (`/api/voice/*`) branchés sur la base leads — 1 session.
4. Tests d'appels réels (latence, accent, interruptions) + itérations — 1-2 sessions.
5. Renvoi d'appel conditionnel depuis le numéro principal de Karim (occupé/non-réponse
   → Léa) — configuration opérateur.

## Coût estimé (le seul agent avec un vrai coût récurrent)

- Vapi : ~0,05-0,10 $/min tout compris (téléphonie + STT + TTS + marge) selon config.
- Claude via Vapi : facturé à l'usage (faible — conversations courtes).
- 100 min d'appels/mois ≈ 8-12 $/mois. Comparable au pricing ClientX, mais sans
  l'abonnement de 99€/mois — vous ne payez que les minutes réelles.
