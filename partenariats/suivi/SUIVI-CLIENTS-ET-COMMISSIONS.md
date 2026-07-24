# 🅲 Volet C — Suivi des clients apportés & contrôle des commissions

> Outil opérationnel du dossier Apporteur (#51). Objectif : **ne perdre aucun client
> apporté** et **encaisser chaque commission due**, sans dépendre de la seule confiance.
> Se lit avec la section 6 du `dossier/DOSSIER-STRATEGIQUE-APPORTEUR.md` (les 6 garde-fous).

---

## 1. Le principe en une phrase
Chaque client que vous présentez est **enregistré, daté et codé** dès le 1ᵉʳ contact, puis
**suivi jusqu'à l'encaissement**, et sa commission est **rapprochée chaque mois** avec ce
que l'agence a réellement encaissé.

---

## 2. Le registre des apports *(votre tableau de bord — à tenir à jour)*

| # | Client (nom/société) | Date d'apport | Code apporteur | Statut dossier | Base (CA ou marge) HT | Taux | Commission due | Encaissé par l'agence ? | Commission versée | Écart | Échéance règlement |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `[…]` | `jj/mm/aa` | `KZ-001` | Devis / Confirmé / Encaissé / Annulé | `[__] MAD` | `[__] %` | `[__] MAD` | Oui / Non / Partiel | `[__] MAD` | `[__]` | `jj/mm/aa` |
| 2 | | | `KZ-002` | | | | | | | | |

> 💡 Une **ligne = un dossier**. Un même client qui repart = **nouvelle ligne**, même code,
> tant qu'il est dans la **durée de rattachement** (Art. 6.3 du contrat).

**Statuts (cycle de vie d'un dossier) :**
`Apporté → Devis envoyé → Confirmé (acompte) → Encaissé (soldé) → Commission versée`
*(ou `Annulé` — la commission suit le sort des sommes réellement conservées.)*

---

## 3. Comment se calcule la commission *(rappel)*
- **Base** : % de la **marge nette** (sur-mesure) **ou** % du **CA HT** (volume) — selon le contrat.
- **Fait générateur** : **encaissement effectif** du client par l'agence (prorata si acomptes).
- **Règlement** : sous **`[15]` jours** après chaque encaissement.
- Barème complet : Annexe 1 du `contrats/CONTRAT-APPORTEUR-AFFAIRES.md`.

---

## 4. Le contrôle mensuel *(la routine anti-oubli — 15 min/mois)*
1. **Récupérer** de l'agence l'état des dossiers de vos clients (droit de regard, Art. 8).
2. **Pointer** ligne par ligne le registre : statut réel vs statut noté.
3. **Vérifier les encaissements** : tout dossier passé à « Encaissé » doit générer une
   commission **due**.
4. **Calculer l'écart** : `Commission due − Commission versée`. Si écart > 0 → **relancer**.
5. **Émettre la facture** de commission pour les dossiers encaissés non réglés.
6. **Archiver** les preuves (fiche d'apport, email d'accusé, relevé d'encaissement).

> 🚩 **Signaux d'alerte** : un client apporté qui « disparaît » du reporting · un dossier
> encaissé sans commission · une réservation répétée d'un client rattaché non déclarée.

---

## 5. Les outils *(du plus simple au plus automatisé)*
| Niveau | Outil | Pour qui |
|---|---|---|
| 1 — Simple | **Tableur** (Excel/Google Sheets) reprenant le registre ci-dessus | Démarrage, faible volume |
| 2 — Suivi | **HubSpot** (déjà dans le stack B2B) : chaque contact horodaté + pipeline | Volume moyen, traçabilité forte |
| 3 — Automatisé | **Rewardful** : lien/code d'affiliation, calcul auto des commissions | Volume, affiliation en ligne |

👉 Recommandé : **démarrer au niveau 1** (tableur), passer au 2/3 quand le volume grandit.

---

## 6. Les 6 garde-fous *(rappel — détail dans le dossier stratégique)*
1. Fiche d'apport **signée & datée** (preuve d'antériorité).
2. **Code apporteur** unique sur chaque devis/dossier.
3. Clause de **rattachement** (durée) — commandes répétées incluses.
4. **Reporting mensuel** + droit de regard.
5. Commission **due à l'encaissement**, délai de règlement fixe.
6. Clause de **non-contournement**.

---

## 7. Modèle de fiche d'apport *(à envoyer à l'agence à chaque nouveau client)*
```
FICHE D'APPORT — Apporteur : [Karim Zoubdane] — Code : [KZ-000]
Client apporté : [nom / société]
Contact : [tel / email]         Date de présentation : [jj/mm/aaaa]
Nature du projet : [voyage / groupe / MICE / …]
Canal : [email / WhatsApp / réunion]
--------------------------------------------------------------
Accusé de réception de l'Agence :  Nom : [____]  Date : [__/__/__]
```

## 8. Modèle de facture de commission *(vous → l'agence)*
```
FACTURE N° [AAAA-000] — [votre statut / ICE / IF]
Émetteur : [Karim Zoubdane]      Client : [l'Agence]
Objet : Commission d'apport d'affaires — dossier [réf. client]
Base : [CA/marge] HT [__] MAD  ×  Taux [__] %  =  [__] MAD
TVA : [selon statut]              Total : [__] MAD
Échéance : [jj/mm/aaaa]           Règlement : [virement]
```

---

## 9. KPIs à suivre *(pilotage — Phase 5 de la feuille de route)*
- Nombre de clients apportés / mois · Taux de transformation (apporté → encaissé)
- CA HT apporté · Commissions **dues** vs **encaissées** · Écart moyen · Délai de règlement
