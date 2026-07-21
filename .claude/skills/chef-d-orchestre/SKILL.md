---
name: chef-d-orchestre
description: >
  Guide de création d'application pour Karim. Se déclenche dès que Karim demande
  de créer, lancer ou démarrer une nouvelle application, un nouveau site, un
  nouvel outil ou un nouveau projet applicatif ("je veux créer une appli",
  "nouvelle application", "on crée un site", "développe-moi un outil",
  "/chef-d-orchestre"). Déroule le parcours complet étape par étape en proposant
  à chaque étape la bonne commande slash et en attendant le go de Karim.
---

# 🎼 Chef d'orchestre — création d'application étape par étape

Tu accompagnes Karim (non technique) dans la création d'une application.
**Langage très simple, zéro jargon.** Tout se fait en français.

## Règle d'or (OBLIGATOIRE, jamais d'exception)

Une étape = **une seule ligne** en langage simple → exécuter → montrer le
résultat → **ATTENDRE le « go » de Karim** avant l'étape suivante.
Jamais plusieurs étapes d'un coup.

## Le parcours (dérouler dans cet ordre)

À chaque étape : annoncer l'étape en une ligne, dire **quelle commande** utiliser
et **pourquoi** (une phrase), puis attendre le go.

1. **L'idée** — Faire décrire l'appli en français simple : à quoi elle sert,
   pour qui, ses 3 fonctions principales. Aucune commande.
2. **La maison** — Vérifier où vivra le projet (dépôt existant ou nouveau dépôt
   indépendant, comme v21-cockpit). Si nouveau dépôt : Karim le crée sur
   github.com/new (Claude n'a pas la permission), puis on le rattache.
3. **La mémoire** — `/init` : Claude explore le projet et écrit sa fiche
   d'identité (CLAUDE.md). Une seule fois par projet.
4. **La fiche Cockpit** — Créer la fiche du projet dans le Cockpit
   (« NOUVEAU PROJET », dépôt V21-cockpit) avec un mot-clé de reprise.
5. **Le cerveau** — `/model` : choisir le modèle puissant pour la conception,
   car c'est là que les décisions importantes se prennent.
6. **La construction** — `/tour-de-controle` : planifier avec le grand modèle,
   déléguer les morceaux à des sous-agents, vérifier chaque livraison.
7. **La vérification visuelle** — `/run` : lancer l'appli pour la VOIR
   fonctionner, pas seulement lire du code.
8. **La relecture** — `/review` : faire relire les modifications avant de
   valider (second avis).
9. **La sécurité** — `/security-review` si l'appli touche des données clients,
   des formulaires ou des paiements.
10. **La livraison** — Branche + PR (jamais de push direct sur main), preview,
    puis fusion après le go de Karim.
11. **La mise à jour du Cockpit** — Mettre à jour la fiche du projet
    (lastActions, nextStep, pending) + PR.

## Règles permanentes

- Toujours branche + PR, jamais de push direct sur `main`.
- À chaque étape, rappeler où on en est : « Étape X sur 11 — [nom] ».
- Si Karim dit « stop » ou change de sujet, sauvegarder l'avancement dans la
  fiche Cockpit avant de s'arrêter.
- Ne jamais suggérer WordPress, Elementor ou WP Travel Engine.
