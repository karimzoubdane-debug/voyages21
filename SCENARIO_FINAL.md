# 🎯 LE SCÉNARIO FINAL — Voyages21

**Pour :** Agence de voyages incoming Maroc
**Issu de l'analyse de 12 vidéos/articles**
**Date :** 2026-05-14
**Promesse :** Exécutable en 1 week-end. Maintenu en 30 min/semaine.

---

## ⚡ Le scénario en 1 phrase

> **Notion** rédige et planifie, **Claude** écrit les posts, **Make** publie partout automatiquement, **ManyChat** capture les leads dans les DM, **Canva** habille le tout, tes **vraies photos** font le reste.

---

## 🧰 Les 4 outils principaux + 2 supports (c'est tout)

| # | Outil | Rôle | Coût mensuel |
|---|---|---|---|
| 1 | **Notion** | Calendrier éditorial visuel (le carnet) | **Gratuit** |
| 2 | **Claude** (ici ou API) | Rédacteur multilingue (le rédacteur) | **0–18 €** |
| 3 | **Make.com** | Publication automatique (le facteur) | **0–9 €** |
| 4 | **ManyChat** | Capture leads via DM (le standardiste) | **0–15 €** |
| + | **Canva** (Magic Media) | Visuels et miniatures (l'imprimeur) | **0–12 €** |
| + | **Tes vraies photos/vidéos Maroc** | Authenticité | **0 €** |

**Total : 0 à 54 € / mois** (très probablement <30 € au démarrage).

---

## 🏗️ Le schéma complet du système

```
   ┌──────────────────────────────────────────────────────────┐
   │                                                            │
   │   NOTION (calendrier éditorial)                            │
   │   ┌──────────────────────────────────────────────────┐    │
   │   │ Titre │ Contenu │ Image │ Date │ Plateforme │État│    │
   │   ├──────────────────────────────────────────────────┤    │
   │   │ Sahara│ ...     │ 📷    │ Lun  │ IG + FB    │ ✅ │    │
   │   │ Fès   │ ...     │ 📷    │ Mar  │ Reel       │ 🟡 │    │
   │   │ ...   │ ...     │ ...   │ ...  │ ...        │ ⚪ │    │
   │   └──────────────────────────────────────────────────┘    │
   │              ▲                                  │           │
   │              │                                  │           │
   │     CLAUDE remplit                       MAKE lit           │
   │     les contenus                       toutes les 30 min    │
   │              │                                  ▼           │
   └──────────────┼──────────────────────────────────┼──────────┘
                  │                                  │
       ┌──────────┴────────┐               ┌─────────┴─────────┐
       │ CANVA + tes       │               │  Si "Programmé"   │
       │ photos perso pour │               │  + heure proche   │
       │ les visuels       │               │  → publier !      │
       └───────────────────┘               └─────────┬─────────┘
                                                     │
                              ┌──────────────────────┼──────────────────────┐
                              ▼                      ▼                      ▼
                        Instagram               Facebook              LinkedIn
                                                                       (YouTube
                                                                        manuel
                                                                        au début)
                              │                      │                      │
                              └──────────┬───────────┴──────────────────────┘
                                         │
                                         ▼
                              ┌──────────────────────────┐
                              │  Quelqu'un commente      │
                              │  ou envoie un DM         │
                              └──────────┬───────────────┘
                                         │
                                         ▼
                              ┌──────────────────────────┐
                              │  MANYCHAT répond auto    │
                              │  Capture nom/email/tel   │
                              │  → Google Sheet + alerte │
                              │    WhatsApp à l'équipe   │
                              └──────────────────────────┘
```

---

## 📖 STORYTELLING — Une semaine type chez Voyages21

### 🌅 Dimanche soir, 19h

Karim ouvre son ordinateur. Il a **30 minutes** devant lui.

Il ouvre Claude (ici) et dit :

> *« Génère-moi 7 posts pour la semaine prochaine, thème "Sahara automne". Pilier 1 inspiration (4 posts), pilier 2 éducation (2 posts), pilier 3 promo (1 post avec mot-clé SAHARA pour la capture leads). Langue : français. Inclus émojis et hashtags. »*

En **3 minutes**, Claude lui sort les 7 posts.
Karim relit, ajuste deux formulations. **5 minutes**.

Il ouvre Notion. Il colle chaque post dans une nouvelle ligne du calendrier :
- Titre, contenu, plateforme (IG / FB / LinkedIn), date prévue
- Il glisse une photo réelle de son disque dur Maroc (lever de soleil à Merzouga, médina de Fès…)
- Pour 2 visuels manquants, il ouvre Canva Magic Media : il tape « bivouac feu de camp Sahara, golden hour, style cinématique » → image générée en **15 secondes**
- Il passe le statut de "Brouillon" à **"Programmé"** sur chaque ligne

**Total : 25 minutes pour 1 semaine entière de contenu.**

Karim ferme son laptop. Il va boire un thé.

---

### 🌞 Lundi, 18h59

Karim est en réunion avec un partenaire à Marrakech. Il ne pense plus aux posts.

À **19h00 exactement**, Make.com se réveille (il tourne toutes les 30 minutes).
Il regarde dans Notion : *« Y a-t-il une ligne avec statut "Programmé" et date dans les 30 prochaines minutes ? »*

→ Oui. Le post inspiration #1 doit partir à 19h00 sur Instagram et Facebook.

Make :
1. Récupère le texte, l'image, les hashtags
2. Appelle l'API Instagram → publie le Reel
3. Appelle l'API Facebook → publie le post
4. Repasse la ligne Notion en **"Publié ✅"**

**Karim ne le sait même pas.** Il finit sa réunion.

---

### 🌙 Lundi, 19h47

Une dame à Lyon scrolle Instagram. Elle voit le Reel du désert de Karim. Elle commente :

> *« Magnifique 😍 Comment réserver ? »*

ManyChat repère immédiatement les mots-clés. Il connaît la règle.
En **8 secondes**, il envoie un DM à la dame :

> *« Bonjour 🌹 Merci pour votre message ! Notre circuit Sahara 5 jours en septembre commence à 890€. Voici le programme détaillé en PDF [📎 programme.pdf]. Vous voulez partir à combien de personnes ? »*

La dame répond *« 2 adultes »*.
ManyChat enchaîne :

> *« Parfait ! Une dernière chose pour qu'on vous prépare un devis personnalisé : votre prénom + nom + email + numéro WhatsApp ? »*

Elle répond.
**Boom.** ManyChat :
1. Enregistre le lead dans la Google Sheet "Leads Voyages21"
2. Envoie une notification WhatsApp à l'équipe commerciale
3. Tague la dame "SAHARA chaud" pour relance

Karim reçoit la notification WhatsApp pendant son dîner.
Il sourit. **Il n'a rien fait, et un lead qualifié vient d'entrer.**

---

### 🌞 Mardi, 12h00

Le carrousel éducatif « 7 jours au Maroc : itinéraire parfait » est publié automatiquement sur Instagram et Facebook.

Karim, lui, est sur la route entre Ouarzazate et Aït-Ben-Haddou avec un groupe de Belges. Il n'a pas touché à son téléphone.

Dans la voiture, il voit un troupeau de chèvres grimpé dans un arganier. **Image culte du Maroc.**

Il prend une photo. **Pas le temps de la publier maintenant.**

Le soir, il l'ajoute dans Notion comme **bonus de la semaine prochaine**. Il écrit juste 3 lignes de texte. Statut "Brouillon" → il finalisera plus tard. **2 minutes.**

---

### 🌅 Samedi, 19h00

Le post **promo** part automatiquement :

> *« Septembre approche 🇲🇦 Il nous reste **3 places** pour le circuit Sahara 5 jours.
> Commentez **SAHARA** ou envoyez un DM pour recevoir le programme et les disponibilités.
> Réservations jusqu'au 31 août. »*

En **24 heures**, le post reçoit :
- 47 commentaires « SAHARA »
- 12 DM directs
- ManyChat envoie 59 messages personnalisés
- 18 personnes répondent à la question « combien de personnes ? »
- Tous les 18 deviennent des **leads qualifiés** dans la Google Sheet
- 5 deviennent des **réservations confirmées** dans les 10 jours

**Recette de la semaine :** 1 post + 0 minute supplémentaire = 5 voyages vendus.

---

### 🌙 Dimanche soir, 19h

Karim rouvre son laptop. Il regarde le tableau de bord Notion : tout est "Publié ✅". Tous les posts ont tourné.

Il ouvre la Google Sheet Leads : 23 nouveaux contacts cette semaine.

Il dit à Claude :

> *« Génère 7 posts pour la semaine prochaine, thème : escapade Marrakech-Atlas. »*

Le cycle recommence. **25 minutes plus tard, c'est fait.**

---

## ✂️ Ce qu'on JETTE et POURQUOI

| Outil suggéré ailleurs | Verdict | Pourquoi |
|---|---|---|
| **Arvo** (SEO blog) | ❌ Pas tout de suite | Complexe, ajoute du blog avant de maîtriser le social. Phase 2-3. |
| **Blotato** | ❌ Make fait pareil | Doublon avec Make.com. Pas besoin d'empiler. |
| **Telegram bot vocal** | ❌ Trop fragile | Idée séduisante mais ajoute un point de défaillance. Phase 2 si besoin. |
| **n8n** | ❌ Make est plus simple | Identique en capacité, mais Make plus visuel pour démarrer. |
| **DALL-E 3 systématique** | ❌ Tue l'authenticité | Une agence Maroc DOIT montrer le vrai Maroc. Canva Magic en dépannage seulement. |
| **Fal.ai / Whisper / FFmpeg** | ❌ Surdimensionné | Pour des chaînes industrielles. Pas pour une agence terrain. |
| **Hootsuite / SocialBee / Publer** | ❌ Redondants | Notion + Make fait pareil, gratuit. |
| **AI Influencer faceless** | ❌ Anti-marque | Ton avantage = l'humain marocain. Ne le sacrifie jamais. |
| **Cross-platform repurposing auto** | ⏸️ Phase 2 | Bien, mais commence simple. |
| **YouTube long-form auto** | ⏸️ Phase 3 | Plus tard. Reste sur Reels/Shorts d'abord. |

---

## 🚀 Première action : LUNDI MATIN, 9h00

Une seule action. **Ne fais que ça.**

### ☑️ Création du calendrier Notion (45 minutes)

1. Va sur https://notion.so → crée un compte gratuit
2. Crée une nouvelle page → "Calendrier éditorial Voyages21"
3. Insère une "Base de données → Table"
4. Crée ces 7 colonnes (exactement) :
   - `Titre` (Texte)
   - `Contenu` (Texte long)
   - `Image` (Fichier)
   - `Date publication` (Date avec heure)
   - `Plateforme` (Sélection multiple : Instagram, Facebook, LinkedIn)
   - `État` (Sélection : Brouillon / Programmé / Publié)
   - `Lead capture` (Sélection : Oui/Non — coché = post promo avec mot-clé ManyChat)

5. Crée 7 lignes pour la semaine (utilise Claude pour les remplir)
6. **Tu n'as encore connecté aucun outil.** C'est juste un tableau visuel.

C'est ta **fondation**. Tout repose sur elle. Tant que tu ne l'as pas faite, ne touche à rien d'autre.

---

## 📅 Plan progressif (en 4 week-ends max)

| Week-end | Mission | Durée |
|---|---|---|
| **WE 1** | Créer le calendrier Notion + remplir 4 semaines de contenus avec Claude | 4h |
| **WE 2** | Configurer Make.com : Notion → Facebook + Instagram | 4h |
| **WE 3** | Configurer ManyChat : 2 séquences (SAHARA, MARRAKECH) | 3h |
| **WE 4** | Affiner, ajouter LinkedIn, tableau de bord KPI | 2h |

**Total : 13h sur 1 mois.** Après ça : 30 min/semaine.

---

## 🎯 KPIs après 3 mois (réalistes)

- 12 posts/semaine × 12 = **144 posts publiés**
- 0 effort de publication
- 30+ leads/mois capturés automatiquement
- 5-10 réservations attribuables au système

**ROI : positif dès le mois 1.**

---

## 🔗 Liens essentiels

- Notion : https://notion.so
- Make.com : https://make.com
- ManyChat : https://manychat.com
- Canva : https://canva.com
- Claude (ici) : tu y es déjà

---

## ✅ Le contrat de simplicité

Avant chaque ajout futur au système, **demande-toi** :

1. Est-ce que ça remplace quelque chose ? → ✅ OK
2. Est-ce que ça ajoute un nouvel outil ? → ⚠️ Réfléchis 7 jours
3. Est-ce qu'un humain peut faire ça en 10 min/semaine ? → ❌ N'automatise pas

**Règle d'or :** mieux vaut un système simple qui tourne 12 mois qu'une usine à gaz qui meurt en 3 semaines.
