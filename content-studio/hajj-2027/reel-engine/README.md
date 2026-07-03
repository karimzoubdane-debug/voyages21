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

## Notes
- **Son** : les reels sont muets. Pour la Talbiya + nappe : mixer en local avec ffmpeg à partir des fichiers audio fournis (l'environnement bloque téléchargements et génération audio).
- **Vrai fond vidéo filmé** : nécessite Higgsfield débloqué (clé API + domaine autorisé, recette Apify) — la génération payante MCP échoue dans les sessions web/remote (approbation impossible).
- Aperçus web déployés dans `public/reels/` (page `public/reels/hajj.html`).
