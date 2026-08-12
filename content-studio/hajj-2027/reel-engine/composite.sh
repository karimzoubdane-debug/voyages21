#!/usr/bin/env bash
# ==========================================================================
# composite.sh — pose les VRAIS clips vidéo Higgsfield SOUS les animations.
#
# Prérequis (fait automatiquement en session, une fois les domaines autorisés) :
#   1) Télécharger les 5 clips depuis Higgsfield dans ./clips/ :
#        kaaba_day.mp4  kaaba_dusk.mp4  mina.mp4  medina.mp4  hotel.mp4
#      (URLs/job-ids dans content-studio/REPRISE.md — re-générables via
#       job_display si les liens CloudFront ont expiré).
#   2) Rendre le PREMIER PLAN transparent (PNG alpha) avec capture_composite.js :
#        node capture_composite.js chromium_path.txt "$PWD/reel_composite.html" ./fg <version>
#
# Puis : bash composite.sh <version>   (full | short | hookprix)
# Sortie : reel_VIDEO_<version>.mp4 (master) + preview compressé.
# ==========================================================================
set -euo pipefail
V="${1:-full}"
FG="./fg"                     # dossier des PNG transparents (premier plan)
CLIPS="./clips"              # dossier des 5 clips réels
OV=520                        # chevauchement inter-scènes (ms), = OV du moteur
FPS=24

# --- Table des scènes par version : "nom:clip:duree_ms" dans l'ORDRE de lecture.
#     (durées = DUR[version] du moteur ; clips = mapping choisi, modifiable.)
case "$V" in
  full)     SCENES=(cover:kaaba_day:5200 pourquoi:kaaba_dusk:9500 programme:mina:9500 prix:medina:6800 options:hotel:6000 cta:kaaba_dusk:6500);;
  short)    SCENES=(cover:kaaba_day:3800 pourquoi:kaaba_dusk:7000 prix:medina:5200 options:hotel:4800 cta:kaaba_dusk:5000);;
  hookprix) SCENES=(prix:medina:6800 options:hotel:6000 cover:kaaba_day:5200 pourquoi:kaaba_dusk:9500 programme:mina:9500 cta:kaaba_dusk:6500);;
  *) echo "version inconnue: $V"; exit 1;;
esac

# --- 1) Construire un segment vidéo par scène : le clip (5 s) est ÉTIRÉ (setpts)
#     pour couvrir exactement la durée de la scène (mouvement ralenti = cinéma),
#     recadré en cover 1080x1920.
mkdir -p _seg
i=0; inputs=(); filters=""
for s in "${SCENES[@]}"; do
  name="${s%%:*}"; rest="${s#*:}"; clip="${rest%%:*}"; dur="${rest##*:}"
  src="$CLIPS/$clip.mp4"
  [ -f "$src" ] || { echo "MANQUE: $src"; exit 2; }
  # durée source réelle du clip :
  cdur=$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$src")
  factor=$(awk -v d="$dur" -v c="$cdur" 'BEGIN{printf "%.5f", (d/1000.0)/c}')
  ffmpeg -y -i "$src" -an -vf "setpts=${factor}*PTS,scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=$FPS" \
    -t "$(awk -v d="$dur" 'BEGIN{printf "%.3f", d/1000.0}')" -c:v libx264 -crf 18 -pix_fmt yuv420p "_seg/seg_$i.mp4"
  inputs+=(-i "_seg/seg_$i.mp4"); i=$((i+1))
done

# --- 2) Chaîner les segments avec des fondus enchaînés (xfade) de OV ms.
n=${#SCENES[@]}; od=$(awk -v o="$OV" 'BEGIN{printf "%.3f", o/1000.0}')
if [ "$n" -eq 1 ]; then
  cp "_seg/seg_0.mp4" _bg.mp4
else
  fc=""; prev="0:v"; off=0
  # durée cumulée pour l'offset du xfade : off_k = somme(dur_0..k) - (k+1)*OV
  declare -a durs=(); for s in "${SCENES[@]}"; do durs+=("${s##*:}"); done
  acc=0
  for ((k=1;k<n;k++)); do
    acc=$(( ${durs[$((k-1))]} + acc )); off=$(awk -v a="$acc" -v o="$OV" -v kk="$k" 'BEGIN{printf "%.3f", (a - kk*o)/1000.0}')
    out="x$k"; [ "$k" -eq $((n-1)) ] && out="bg"
    fc+="[$prev][$k:v]xfade=transition=fade:duration=$od:offset=$off[$out];"; prev="$out"
  done
  fc="${fc%;}"
  ffmpeg -y "${inputs[@]}" -filter_complex "$fc" -map "[bg]" -c:v libx264 -crf 18 -pix_fmt yuv420p _bg.mp4
fi

# --- 3) Poser le PREMIER PLAN (PNG alpha, séquence complète) SUR le fond vidéo.
ffmpeg -y -i _bg.mp4 -framerate $FPS -i "$FG/f%04d.png" \
  -filter_complex "[0:v][1:v]overlay=shortest=1,format=yuv420p[v]" -map "[v]" \
  -c:v libx264 -crf 17 -movflags +faststart "reel_VIDEO_${V}.mp4"

# --- 4) Preview web compressé (comme les aperçus actuels).
ffmpeg -y -i "reel_VIDEO_${V}.mp4" -vf "scale=608:1080" -c:v libx264 -crf 26 -movflags +faststart "preview_${V}.mp4"
echo "OK -> reel_VIDEO_${V}.mp4 (+ preview_${V}.mp4)"
rm -rf _seg _bg.mp4
