# Moteur des reels Hajj 2027 (motion design)

Pipeline qui génère les reels animés **Hajj 2027** (motion design HTML → capture Chromium → assemblage ffmpeg).
Sauvegardé ici car il était fabriqué dans un espace temporaire (éphémère).

## Fichiers
- `reel_full.html` — le moteur d'animation (5 scènes, piloté par version : `full` ~41 s, `short` ~24 s, `hookprix` ~41 s). Anime : couverture, « pourquoi nous » (cadrans dorés 2 par 2), programme, prix, **services optionnels**, CTA (avis Google qui atterrit, « زوروا موقعنا » + site tapé lettre par lettre).
- `capture.js` — script Playwright qui capture les frames (JPEG, 24 i/s, 1080×1920).
- `bg1_day.jpg` / `bg2_dusk.jpg` / `bg3_mina.jpg` — fonds La Mecque (jour / doré / Mina), extraits des 5 maquettes.

## Rebuild (dans une nouvelle session)
```bash
# 1) outils
apt-get install -y --no-install-recommends ffmpeg fonts-noto-core
mkdir -p /tmp/reelbuild && cd /tmp/reelbuild
npm init -y >/dev/null && npm install playwright-core
# chromium préinstallé : /opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell
CH=$(find /opt/pw-browsers -type f -name headless_shell | head -1)
cp -r <ce dossier>/* .

# 2) capture (choisir full | short | hookprix)
node capture.js <(echo -n "$CH") reel_full.html ./frames full

# 3) assemblage
ffmpeg -y -framerate 24 -i frames/f%04d.jpg -c:v libx264 -pix_fmt yuv420p -crf 17 -r 24 -movflags +faststart reel.mp4
```
(Le 1er argument de `capture.js` est un fichier contenant le chemin du binaire Chromium.)

## 🎥 VRAI FOND VIDÉO FILMÉ (composite) — pipeline prêt
La génération Higgsfield **fonctionne** désormais (testée le 03/07/2026, `kling3_0_turbo`,
7,5 crédits / clip 5 s). Le SEUL verrou restant = **télécharger** le clip : le proxy bloque
`*.cloudfront.net` / `*.higgsfield.ai` (403). Une fois ces 2 domaines ajoutés aux
**domaines autorisés** de l'environnement (comme `*.apify.com`), tout devient automatique.

Fichiers du composite (dans ce dossier) :
- `reel_composite.html` — même moteur + mode `window.__NOBG` (fond transparent, on garde
  texte + cadrans + scrim + particules).
- `capture_composite.js` — capture le PREMIER PLAN en **PNG alpha** (24 i/s, 1080×1920).
- `composite.sh` — étire chaque clip à la durée de sa scène, enchaîne les scènes en
  **xfade**, puis **superpose** le premier plan PNG sur le fond vidéo. Sort le master + preview.

Étapes (session avec domaines autorisés) :
```bash
# 1) récupérer les 5 clips dans ./clips/ (job-ids dans REPRISE.md, re-affichables via job_display)
#    kaaba_day.mp4 kaaba_dusk.mp4 mina.mp4 medina.mp4 hotel.mp4
# 2) premier plan transparent (par version)
node capture_composite.js chromium_path.txt "$PWD/reel_composite.html" ./fg full
# 3) montage final
bash composite.sh full        # -> reel_VIDEO_full.mp4 + preview_full.mp4
```
Mapping scène→clip par défaut (modifiable en tête de `composite.sh`) : cover=kaaba_day,
pourquoi=kaaba_dusk, programme=mina, prix=medina, options=hotel, cta=kaaba_dusk.
Pipeline **validé** le 03/07 avec des images fixes en guise de clips (graphe ffmpeg OK) —
il ne reste qu'à brancher les vrais clips.

## Notes
- **Son** : les reels sont muets. Pour la Talbiya + nappe : mixer en local avec ffmpeg à partir des fichiers audio fournis (l'environnement bloque téléchargements et génération audio).
- Aperçus web déployés dans `public/reels/` (page `public/reels/hajj.html`).
