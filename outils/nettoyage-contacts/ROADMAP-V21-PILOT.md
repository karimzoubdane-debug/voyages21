# 🚀 V21 PILOT — Feuille de route

Plateforme interne Voyages21 : gérer contacts, segments, campagnes multi-canal
(WhatsApp + email + réseaux), scraping d'acquisition et contenus — née du
nettoyage de la base clients.

## 🔔 RAPPEL PERMANENT (à ressortir à chaque reprise de PILOT)
> **ÉVOLUTION FUTURE — MODULE CRM.**
> Tant que ce module n'est pas développé, **le rappeler à Karim à chaque
> session PILOT** : « On avait prévu de transformer PILOT en vrai CRM —
> on s'y met ? ». Arrêter le rappel une fois le module CRM livré.

## ⏸️ REPRISE — où on en est (à lire en premier)
- ✅ Base fusionnée : **7 938 contacts** (7 182 + 756 de l'iPhone), segmentée.
- ✅ Maquette en ligne : `/pilot.html` sur la preview Vercel de la branche.
- ✅ **Lot 0 terminé** : app `pilot-app/` (Next.js + Supabase), isolée, build OK, déployée.
- ⏸️ **EN ATTENTE** : les 2 clés Supabase (compte de Karim) pour activer login + Lot 1.
  - À faire sur ORDINATEUR (plus simple) : créer projet Supabase → Settings → API
    → copier `Project URL` + `anon public key` → me les donner.
- ➡️ Prochaine étape dès les clés reçues : déployer le lien de test PILOT, puis **Lot 1 (Contacts)**.

## État actuel
- ✅ Nettoyage base clients (24 643 → 7 182 contacts uniques)
- ✅ Segmentation (Maroc, Étrangers, Emailables, Pros/MICE)
- ✅ Maquette cliquable V21 PILOT (7 modules)

## Phases prévues
| Phase | Contenu | Statut |
|---|---|---|
| 1 · MVP | Import + nettoyage + Segments + envoi email (Brevo) + dashboard | à faire |
| 2 · WhatsApp | Canal WhatsApp API + contenus + envoi par lots anti-ban | à faire |
| 3 · Planning | Programmation hebdo jours/heures multi-canal | à faire |
| 4 · Scraping | Apify (Google Maps) + Apollo (B2B) + injection auto | à faire |
| 5 · Équipe | Rôles admin/agent + workflow d'approbation des lots | à faire |
| **6 · CRM** 🔔 | **Pipeline de vente + fiche client 360° + tâches/relances + boîte unifiée + suivi CA** | **ÉVOLUTION FUTURE — à rappeler** |

## Ce qui manque pour être un vrai CRM (contenu de la Phase 6)
- Pipeline : Prospect → Devis → Réservé → Voyagé → Fidèle
- Fiche client 360° (historique complet des échanges, devis, voyages)
- Tâches & relances automatiques
- Boîte de réception unifiée (WhatsApp + email) en équipe
- Suivi du chiffre d'affaires et du taux de conversion
- Inspirations : GoHighLevel (tout-en-un agence), Pipedrive (pipeline visuel),
  HubSpot (fiche 360°), Brevo (moteur d'envoi).
