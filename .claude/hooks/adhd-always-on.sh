#!/usr/bin/env bash
# i-have-adhd — mode toujours actif pour ce repo.
# Injecte la consigne d'appliquer le skill i-have-adhd à chaque session.
# Désactivation ponctuelle : dire « stop adhd mode » dans la conversation.
set -euo pipefail
cat <<'JSON'
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "MODE i-have-adhd TOUJOURS ACTIF (repo voyages21) : applique les règles du skill i-have-adhd (.agents/skills/i-have-adhd/SKILL.md) à TOUTES tes réponses par défaut — action en premier, étapes numérotées, état restitué à chaque tour, tangentes reportées, estimations de temps précises, victoires visibles, aucun préambule ni formule de politesse. Exceptions du skill respectées (demandes « explique-moi », actions destructives, ambiguïté réelle). Reste actif tant que Karim n'a pas dit « stop adhd mode » ou « normal mode » dans la conversation."
  }
}
JSON
