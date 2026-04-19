# CONTEXTE PROJET — VOYAGES 21 SITE WEB

## Qui suis-je ?
Karim Zoub Dane, fondateur de **Voyages 21**, DMC basé à Marrakech, 25 ans d'expérience.
Spécialités : circuits sur mesure Maroc, expéditions 4x4 Raid Engineering, tours moto BMW/KTM.

## Ce projet
Refonte complète du site voyages21.com en Next.js.
**Règle absolue : WordPress, Elementor, WP Travel Engine sont abandonnés définitivement. Ne jamais les suggérer.**

---

## INSTRUCTIONS OBLIGATOIRES POUR COWORK

### 🔴 DEBUT DE CHAQUE SESSION — à faire en premier
```bash
git pull
cat SESSION_STATE.md
```
Lis SESSION_STATE.md pour reprendre exactement là où la session précédente s'est arrêtée.

### 🔴 FIN DE CHAQUE SESSION — à faire avant de terminer
**Toujours exécuter ces 3 actions avant la fin de session :**

**1. Mettre à jour SESSION_STATE.md**
```bash
# Editer SESSION_STATE.md avec :
# - Date et heure de fin
# - Ce qui a été fait
# - Prochaine étape immédiate (très précise)
# - Fichiers modifiés
# - Décisions prises
```

**2. Mettre à jour cockpit-data.json**
```bash
# Mettre à jour les champs dans cockpit-data.json :
# - "_meta.last_updated" avec la date du jour
# - "_meta.updated_by" avec "cowork"
# - Pour chaque projet modifié : status, nextStep, phases (state: done/in_progress/todo)
```

**3. Commit et push**
```bash
git add SESSION_STATE.md cockpit-data.json
git commit -m "Session [DATE] : [résumé en 1 ligne de ce qui a été fait]"
git push
```

### 🟡 SI LIMITE DE TOKENS APPROCHE
Dès que tu détectes que la session approche de sa limite (contexte long, nombreux échanges) :
1. **Stop** — ne commence pas une nouvelle tâche complexe
2. **Sauvegarde** — exécute les 3 actions ci-dessus immédiatement
3. **Informe Karim** : "Limite de tokens approche — j'ai sauvegardé l'état. Pour reprendre : ouvre une nouvelle session Cowork sur ce projet, je lirai SESSION_STATE.md automatiquement."

---

## Site déjà en ligne
- URL active : **https://voyages21.vercel.app/**
- Le site existe déjà, on travaille dessus de manière incrémentale

---

## Design de référence — Page d'accueil
- Référence : **Black Tomato** → https://www.blacktomato.com/
- Page d'accueil : immersive, luxe, grande typographie, visuel plein écran, hero vidéo

---

## Vidéo Header
- Fichier : `2964957128`
- Chemin local : `G:\Mon Drive\SITE WEB AVEC CLAUDE\SITE ZEB V21\VIDEO\2964957128`
- Usage : fond plein écran hero section page d'accueil
- A uploader sur Cloudinary ou Vercel Blob avant utilisation

---

## Stack technique validée

| Élément | Choix |
|---|---|
| Framework | Next.js + Tailwind CSS |
| CMS | Sanity.io |
| Hébergement | Vercel Pro (~$20/mo) |
| Paiement | PayPal |
| Internationalisation | next-intl |
| Traduction | DeepL |
| Automation | Make.com |
| CRM | HubSpot |
| Affiliation | Rewardful (~$49/mo) |
| Recherche IA | Perplexity |

**4 langues :** FR / EN / ES / DE

---

## Dépôt & déploiement
- GitHub : `karimzoubdane-debug/voyages21`
- URL Vercel : `voyages21.vercel.app`
- Domaine final : `voyages21.com` (chez Valablue — connecter en dernier)
- ⚠️ Migration emails OBLIGATOIRE avant de quitter Valablue

---

## Fichiers de continuité (à la racine du repo)
- `SESSION_STATE.md` — état de la session en cours
- `cockpit-data.json` — données du cockpit (mis à jour automatiquement)
- `CLAUDE_SITE_V21.md` — ce fichier

---

## Feuille de route

| Phase | Contenu | Statut |
|---|---|---|
| 1 | Infrastructure complète | ✅ Terminée |
| 2 | Google Apps Script photos | 🔄 En cours |
| 3 | Pages du site | ⏳ En attente |
| 4 | Domaine + emails + Make.com + HubSpot + Rewardful + DeepL | ⏳ En attente |

---

## Hors scope (ne jamais aborder)
- Golf.voyages21.com → abandonné
- WordPress / Elementor / WP Travel Engine → abandonnés définitivement

---

## Style de travail
- Réponses en **français**
- Ton factuel et concis, pas de style promotionnel
- Validation explicite avant exécution
- Karim n'est pas développeur : expliquer clairement chaque étape
