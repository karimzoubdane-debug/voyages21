# REPRENDRE LE PROJET - Mode d'emploi

Ce fichier est ton point d'entrée pour reprendre le projet Voyages21 dans n'importe quelle nouvelle conversation, avec Claude ou une autre IA.

Lien permanent : https://github.com/karimzoubdane-debug/voyages21/blob/claude/debug-chatbot-error-lsgD1/REPRENDRE_LE_PROJET.md

Branche de travail : claude/debug-chatbot-error-lsgD1

---

## CAS A - Nouvelle session Claude Code dans le dossier voyages21

C'est le cas le plus simple. Tu ouvres Claude Code dans le projet, et tu colles ce prompt :

```
Lis ces 3 fichiers dans cet ordre pour reprendre le projet :
1. PLANNING.md
2. MASTER_PROMPT_VOYAGES21.md
3. SCENARIO_FINAL.md

Puis dis-moi où on en est et quelle est l'action suivante.

Règles strictes à respecter pour toute la suite :
- Pas d'emoji, pas d'icônes (côté humain à préserver)
- Une action à la fois, jamais plus
- Tu n'avances jamais sans mon GO explicite
- Tu ne mets à jour le GitHub que quand je le demande
- Chaque action = une phrase qui explique son but et son objectif
```

L'assistant récupère tout le contexte en quelques secondes.

---

## CAS B - Nouvelle session sur claude.ai (web ou mobile)

L'IA n'a pas accès au repo. Tu dois lui coller manuellement le contenu des fichiers.

Procédure :
1. Aller sur https://github.com/karimzoubdane-debug/voyages21/blob/claude/debug-chatbot-error-lsgD1/PLANNING.md
2. Cliquer sur le bouton "Raw" en haut à droite
3. Copier tout le contenu
4. Faire la même chose pour MASTER_PROMPT_VOYAGES21.md
5. Démarrer la nouvelle conversation avec ce prompt :

```
Voici l'état actuel d'un projet en cours. Lis-le entièrement, puis attends mes instructions.

Règles strictes :
- Pas d'emoji, pas d'icônes (côté humain à préserver)
- Une action à la fois, jamais plus
- Tu attends mon GO explicite avant chaque action
- Tu ne décides rien tout seul
- Chaque action = une phrase qui explique son but et son objectif

VOICI LE PLANNING DU PROJET :
[colle ici le contenu de PLANNING.md]

VOICI LE MASTER PROMPT DE MARQUE :
[colle ici le contenu de MASTER_PROMPT_VOYAGES21.md]

Maintenant dis-moi où on en est et quelle est la prochaine action.
```

---

## CAS C - Autre IA (ChatGPT, Gemini, Perplexity, etc.)

Même chose que Cas B, mais ajoute une instruction de rôle au tout début :

```
Tu vas jouer le rôle d'un assistant marketing senior spécialisé dans l'automatisation
des réseaux sociaux pour une agence de voyage marocaine. Tu n'inventes rien, tu suis
strictement les documents qui suivent et tu attends mon GO avant chaque action.

[ensuite mêmes consignes que Cas B + collage des fichiers]
```

---

## État du projet à retenir

Phase actuelle : Phase 1 - Week-end 1 en cours.

Décisions actées :
- 5 plateformes en Phase 1 : Facebook, Instagram, LinkedIn, TikTok, YouTube Shorts
- Audience 60% couples-familles / 40% pilotes raids-moto
- Marchés prioritaires : Allemagne 30%, Italie 20%, UK 20%, Suisse 15%, Francophones 15%
- Aucun emoji ni icône dans aucun contenu
- Création des comptes avant la configuration Make.com
- Période de warming manuel entre la création des comptes et l'automatisation

Prochaine action : Action 14 - Création du premier compte social (Facebook Page).
Pré-requis avant cette action : réponses aux 6 questions de préparation (voir PLANNING.md).

---

## Liste complète des fichiers du projet

| Fichier | Rôle |
|---|---|
| REPRENDRE_LE_PROJET.md | Ce fichier - mode d'emploi pour reprendre |
| PLANNING.md | GPS du projet, journal d'exécution, état |
| MASTER_PROMPT_VOYAGES21.md | ADN de marque pour génération de contenu |
| SCENARIO_FINAL.md | Comment le système fonctionne |
| STRATEGIE_AUTOMATISATION_CONTENU.md | Analyses des 12 vidéos et articles sources |
| FICHE_VIDEOS_A_ANALYSER.md | Pour ajouter d'autres vidéos plus tard |

---

## Conseil pratique

Mets ce lien en favori sur tous tes appareils (PC, téléphone) :

https://github.com/karimzoubdane-debug/voyages21/blob/claude/debug-chatbot-error-lsgD1/REPRENDRE_LE_PROJET.md

Quand tu veux reprendre, ce sera ton point d'entrée unique.
