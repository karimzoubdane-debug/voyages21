#!/usr/bin/env bash
# Fabrique le zip à déposer sur l'hébergement : les 3 fichiers en ligne, passés
# par les actions 1 à 8 (personnalisation internationale) puis par l'action A
# (les quatre urgences photo).
#
# Rien n'est modifié en ligne : le script télécharge, transforme localement, et
# produit un zip. C'est Karim qui dépose.
#
#   ./preparer_depot.sh [dossier des scripts action1..8]
#
# Par défaut, les actions 1 à 8 sont cherchées dans le dépôt v21-cockpit cloné
# à côté (scripts/morocco-intl/). L'action A vit ici.
set -euo pipefail

ICI="$(cd "$(dirname "$0")" && pwd)"
ACTIONS="${1:-/workspace/v21-cockpit/scripts/morocco-intl}"
DATE="$(date +%F)"
BASE="https://morocco.voyages21.com/WelcomeChina"
TRAVAIL="$(mktemp -d)"
W="$TRAVAIL/WelcomeChina"

if [ ! -f "$ACTIONS/action1_langues.py" ]; then
  echo "Scripts d'action introuvables dans $ACTIONS" >&2
  echo "Cloner karimzoubdane-debug/v21-cockpit, ou passer le chemin en argument." >&2
  exit 1
fi

echo "→ récupération des fichiers EN LIGNE (jamais la version GitHub)"
mkdir -p "$W/voyages"
curl -fsS "$BASE/index.html"         -o "$W/index.html"
curl -fsS "$BASE/voyages/render.js"  -o "$W/voyages/render.js"
curl -fsS "$BASE/voyages/data.js"    -o "$W/voyages/data.js"

if ! grep -q "__V21_MEDIA__" "$W/index.html"; then
  echo "ALERTE : window.__V21_MEDIA__ absent du index.html en ligne." >&2
  echo "Le site serait revenu avant mediafix3. On s'arrête." >&2
  exit 1
fi

echo "→ actions 1 à 8"
for a in 1_langues 2_whatsapp 3_menu_vertical 3b_nettoyage 4_reseaux \
         5_euros 6_mentions_prix 7_branding 8_relecture; do
  printf '   %-18s ' "action$a"
  python3 "$ACTIONS/action$a.py" "$W" | tail -1
done

echo "→ action A (les quatre urgences)"
python3 "$ICI/actionA_urgences.py" "$W"

echo "→ zip"
mkdir -p "$ICI/depots"
cp "$ICI/depots/LISEZ-MOI-DEPOT-2026-08-14.txt" "$TRAVAIL/LISEZ-MOI-DEPOT.txt" 2>/dev/null || true
ZIP="$ICI/depots/morocco-intl-depot-$DATE.zip"
rm -f "$ZIP"
(cd "$TRAVAIL" && zip -qr "$ZIP" . )
echo "✓ $ZIP"
rm -rf "$TRAVAIL"
