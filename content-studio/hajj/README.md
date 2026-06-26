# Hajj 2027 — Reel promo Instagram (9:16, 24 s)

Production d'une vidéo verticale **1080×1920, 24 s, 30 fps**, à partir des **4
maquettes** noir & or « أسفار 21 / Hajj 2027 ». Style : luxe spirituel, kiswa
noire, or luisant, scintillement discret, sacré et premium.

## Méthode — « cinématique fidèle » (validée par Karim : option 2A)
On **n'altère jamais** les pixels des maquettes. Chaque scène = la maquette
d'origine + mouvement de caméra lent (Ken Burns) + calques d'or **superposés**
(particules, halo, voile) + transitions or/noir. ⇒ **textes arabes et numéros
100 % intacts**, aucun watermark, aucun texte ajouté, aucun visage généré.

Le moteur de rendu est déterministe (`render_reel.py`, ffmpeg + Pillow) : durée
exacte, reproductible.

## Les 4 scènes (6 s chacune)
| # | Maquette (Drive `V21 STUDIO/hajj`) | Animation |
|---|---|---|
| 1 · 0–6 s | `…10_28_24 (1).png` — *الحج 2027 مع وكالة أسفار 21* (Kaaba) | fondu depuis le noir, zoom doux vers le logo, halo + particules d'or |
| 2 · 6–12 s | `…10_59_35.png` — *لماذا تختاروننا؟* | panoramique vertical bas→haut (lecture des arguments), voile d'or |
| 3 · 12–18 s | `…10_28_25 (3).png` — *67 500 / 95 000 درهم* | zoom lent sur les deux cartes prix, scintillement or |
| 4 · 18–24 s | `…10_28_26 (4).png` — *احجزوا مكانكم + WhatsApp + www.voyages21.com* | halo autour du logo, focus numéros + site, fondu or/noir |

Transitions : fondus enchaînés or/noir, lents et fluides.

## Audio (ajouté APRÈS le montage visuel)
- **Version 1** : musique seule (piste fournie par Karim).
- **Version 2** : + voix off arabe homme, calme et posée (script ci-dessous).
- Le moteur produit d'abord la vidéo **muette** ; le son se mixe ensuite sans
  re-rendre l'image (`ffmpeg -i video.mp4 -i audio -c:v copy …`).

### Script voix off (4 scènes)
> S1 : «الحج 2027 مع وكالة أسفار 21. أنتم للعبادة… ونحن للتنظيم.»
> S2 : «وكالة معتمدة بعلامة جودة خدمات الحج منذ 2006. برنامج حج متكامل، فنادق قريبة من الحرمين، وتأطير ديني وتقني طيلة الرحلة.»
> S3 : «اختاروا الصيغة التي تناسبكم…»
> S4 : «…واحجزوا مكانكم الآن. أسفار 21، خبرة وثقة في خدمة ضيوف الرحمن.»

## Comment lancer le rendu
```bash
cd content-studio/hajj
# place les 4 maquettes dans sources/ (scene1.png … scene4.png)
python3 render_reel.py out/hajj_reel_silent.mp4
```
Sans les sources, le script génère des **placeholders** pour tester le pipeline.

## Contrainte d'environnement (sessions Claude Code sur le web)
Le réseau de la session cloud est **restreint à GitHub** : Google Drive et le
CDN Higgsfield sont bloqués en téléchargement direct. ⇒ les maquettes doivent
arriver **par le repo GitHub** (dossier `sources/`), pas par le Drive. La sortie
est renvoyée à Karim directement dans le chat (non bloqué).
