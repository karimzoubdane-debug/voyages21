#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Voyages21 — Hajj 2027 promo Reel (9:16, 1080x1920, 24 s).

Méthode "cinématique fidèle" : on n'altère JAMAIS les pixels des maquettes.
Chaque scène = la maquette d'origine + mouvement de caméra (Ken Burns) +
calques d'or superposés (particules, halo, voile) + transitions or/noir.
=> textes arabes et numéros 100 % intacts. Aucun watermark, aucun texte ajouté.

Sortie : MP4 H.264, 1080x1920, 30 fps, 24 s, SANS SON (audio ajouté ensuite).

Usage:
  python3 render_reel.py [out.mp4]
Env:
  SRC_DIR   dossier des maquettes (défaut: ./sources) ; fichiers scene1..scene4.png
  FPS, CRF, PRESET   réglages encodage (optionnels)
"""
import os, sys, math, subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFont

# ----------------------------------------------------------------------------- config
W, H        = 1080, 1920
FPS         = int(os.environ.get("FPS", "30"))
SCENE_DUR   = 6.0
N_SCENES    = 4
DUR         = SCENE_DUR * N_SCENES            # 24 s
XFADE       = 0.7                             # fondu enchaîné entre scènes (s)
FADE_IN     = 0.6                             # fondu depuis le noir
FADE_OUT    = 1.0                             # fondu vers le noir (logo visible)
ZMAX        = 1.14                            # marge de sur-cadrage pour zoom/pan
SEED        = 21
CRF         = os.environ.get("CRF", "17")
PRESET      = os.environ.get("PRESET", "medium")
GOLD        = np.array([255.0, 198.0, 104.0], dtype=np.float32)
GOLDN       = (GOLD / 255.0).astype(np.float32)

SRC_DIR = os.environ.get("SRC_DIR", os.path.join(os.path.dirname(__file__), "sources"))
OUT     = sys.argv[1] if len(sys.argv) > 1 else "hajj_reel_silent.mp4"
TOTAL_FRAMES = int(round(DUR * FPS))

# Ken Burns par scène : (zk0, zk1, (cx0,cy0), (cx1,cy1)) centres normalisés sur la base.
# cy plus petit = plus haut. Affiné après réception des vraies maquettes.
KB = [
    (1.00, 1.085, (0.50, 0.46), (0.50, 0.42)),   # S1 ouverture : zoom vers le logo
    (1.055, 1.055, (0.50, 0.63), (0.50, 0.40)),  # S2 "pourquoi" : panoramique bas->haut
    (1.00, 1.10,  (0.50, 0.45), (0.50, 0.45)),   # S3 prix : zoom lent sur les cartes
    (1.06, 1.00,  (0.50, 0.50), (0.50, 0.50)),   # S4 contact : léger zoom arrière
]
SWEEP_STR = {0: 16.0, 1: 26.0, 2: 24.0, 3: 16.0}

def smooth(p):
    p = 0.0 if p < 0 else (1.0 if p > 1 else p)
    return p * p * (3 - 2 * p)

# ----------------------------------------------------------------------------- sources
def load_or_placeholder(idx):
    path = os.path.join(SRC_DIR, f"scene{idx+1}.png")
    if os.path.exists(path):
        img = Image.open(path).convert("RGB")
    else:
        img = Image.new("RGB", (1200, 2133), (12, 12, 14))
        d = ImageDraw.Draw(img)
        for y in range(img.height):
            t = y / img.height
            d.line([(0, y), (img.width, y)], fill=(int(10 + 18*t), int(9 + 12*t), int(8 + 6*t)))
        try:
            f = ImageFont.truetype("DejaVuSans-Bold.ttf", 90)
        except Exception:
            f = ImageFont.load_default()
        labels = ["HAJJ 2027", "POURQUOI NOUS", "67 500 / 95 000 DH", "RESERVATION"]
        d.multiline_text((img.width//2, img.height//2),
                         f"SCENE {idx+1}\n{labels[idx]}\n[ PLACEHOLDER ]",
                         fill=(212, 170, 90), font=f, anchor="mm", align="center", spacing=24)
        d.rectangle([30, 30, img.width-30, img.height-30], outline=(150, 120, 60), width=6)
    bw, bh = int(W * ZMAX), int(H * ZMAX)
    sw, sh = img.size
    scale = max(bw / sw, bh / sh)
    img = img.resize((max(1, int(sw*scale)), max(1, int(sh*scale))), Image.LANCZOS)
    sw, sh = img.size
    left, top = (sw - bw)//2, (sh - bh)//2
    return img.crop((left, top, left + bw, top + bh))

BASES = [load_or_placeholder(i) for i in range(N_SCENES)]

# ----------------------------------------------------------------------------- precompute (constant) layers
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
cx_pix, cy_pix = W / 2.0, H * 0.34

rn = np.sqrt(((xx - W/2)/(W/2))**2 + ((yy - H/2)/(H/2))**2)
VIGNETTE = (1.0 - 0.30 * np.clip(rn - 0.25, 0, 1.4)**2).clip(0.55, 1.0)[..., None].astype(np.float32)

halo_r = np.sqrt((xx - cx_pix)**2 + (yy - cy_pix)**2)
HALO = np.exp(-(halo_r**2) / (2 * (W*0.42)**2)).astype(np.float32)[..., None]
HALO_GOLD = (HALO * GOLD).astype(np.float32)               # (H,W,3) constant

# voile d'or diagonal : projection constante précalculée
_ang = math.radians(58)
PROJ = (xx * math.cos(_ang) + yy * math.sin(_ang)).astype(np.float32)
PMIN = float(PROJ.min()); PSPAN = float(PROJ.max()) - PMIN
PSIG = PSPAN * 0.10
P2S2 = 2.0 * PSIG * PSIG

rng = np.random.default_rng(SEED)
GRAIN = [(rng.standard_normal((H, W, 1)).astype(np.float32) * 2.2) for _ in range(8)]

# particules d'or
NP_ = 46
px  = rng.uniform(0, W, NP_);   py  = rng.uniform(0, H, NP_)
pr  = rng.uniform(1.4, 5.2, NP_)
psy = rng.uniform(6, 24, NP_);  psw = rng.uniform(4, 20, NP_)
pswf= rng.uniform(0.08, 0.36, NP_); pph = rng.uniform(0, 2*np.pi, NP_)
ptwf= rng.uniform(0.18, 0.8, NP_);  ptwp= rng.uniform(0, 2*np.pi, NP_)
pa  = rng.uniform(0.16, 0.5, NP_)

def _sprite(r):
    s = max(2, int(round(3.0 * r)))
    ax = np.arange(-s, s + 1, dtype=np.float32)
    gx, gy = np.meshgrid(ax, ax)
    return np.exp(-(gx*gx + gy*gy) / (2 * r * r)).astype(np.float32)
SPRITES = [_sprite(r) for r in pr]

PL = np.zeros((H, W, 1), dtype=np.float32)
def particle_layer(t):
    PL.fill(0.0)
    for i in range(NP_):
        a = pa[i] * (0.5 + 0.5 * math.sin(2*math.pi*ptwf[i]*t + ptwp[i]))
        if a <= 0.01:
            continue
        y = (py[i] - psy[i]*t) % (H + 200) - 100
        x = px[i] + psw[i]*math.sin(2*math.pi*pswf[i]*t + pph[i])
        sp = SPRITES[i]; s = sp.shape[0] // 2
        xi, yi = int(round(x)), int(round(y))
        dx0, dy0 = max(0, xi-s), max(0, yi-s)
        dx1, dy1 = min(W, xi+s+1), min(H, yi+s+1)
        if dx1 <= dx0 or dy1 <= dy0:
            continue
        sx0, sy0 = dx0-(xi-s), dy0-(yi-s)
        PL[dy0:dy1, dx0:dx1, 0] += a * sp[sy0:sy0+(dy1-dy0), sx0:sx0+(dx1-dx0)]
    return PL

def sweep_band(scene_t01):
    pos = PMIN + PSPAN * (0.12 + 0.76 * scene_t01)
    d = PROJ - pos
    return np.exp(-(d*d) / P2S2)[..., None]

def render_scene(idx, st):
    p = smooth(st / SCENE_DUR)
    zk0, zk1, c0, c1 = KB[idx]
    zk = zk0 + (zk1 - zk0)*p
    cx = c0[0] + (c1[0]-c0[0])*p
    cy = c0[1] + (c1[1]-c0[1])*p
    base = BASES[idx]; BW, BH = base.size
    vw, vh = BW/zk, BH/zk
    vx = min(max(cx*BW - vw/2.0, 0.0), BW - vw)
    vy = min(max(cy*BH - vh/2.0, 0.0), BH - vh)
    arr = np.asarray(base.resize((W, H), Image.BICUBIC, box=(vx, vy, vx+vw, vy+vh)),
                     dtype=np.float32)
    arr += (sweep_band(st / SCENE_DUR) * SWEEP_STR[idx]) * GOLDN
    return arr

def scene_at(tg):
    s = min(N_SCENES-1, int(tg // SCENE_DUR))
    st = tg - s*SCENE_DUR
    out = [(s, st, 1.0)]
    if s < N_SCENES-1:
        b = (s+1)*SCENE_DUR
        if tg >= b - XFADE/2:
            a = (tg - (b - XFADE/2)) / XFADE
            out = [(s, st, 1-a), (s+1, st - SCENE_DUR, a)]
    if s > 0:
        b = s*SCENE_DUR
        if tg < b + XFADE/2:
            a = (tg - (b - XFADE/2)) / XFADE
            out = [(s-1, st + SCENE_DUR, 1-a), (s, st, a)]
    return out

# ----------------------------------------------------------------------------- encode
ffmpeg = os.environ.get("FFMPEG_BIN")
if not ffmpeg:
    import imageio_ffmpeg
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()

cmd = [ffmpeg, "-y", "-f", "rawvideo", "-pix_fmt", "rgb24",
       "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
       "-an", "-c:v", "libx264", "-preset", PRESET, "-crf", str(CRF),
       "-pix_fmt", "yuv420p", "-movflags", "+faststart", OUT]
proc = subprocess.Popen(cmd, stdin=subprocess.PIPE,
                        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

print(f"Rendu : {TOTAL_FRAMES} frames @ {FPS}fps -> {OUT}", flush=True)
for fi in range(TOTAL_FRAMES):
    tg = fi / FPS
    parts = scene_at(tg)
    if len(parts) == 1:
        idx, st, _ = parts[0]
        frame = render_scene(idx, st)
    else:
        (i0, s0, w0), (i1, s1, w1) = parts
        frame = render_scene(i0, min(SCENE_DUR, max(0.0, s0))) * w0
        frame += render_scene(i1, min(SCENE_DUR, max(0.0, s1))) * w1
        frame += ((1.0 - abs(w0 - w1)) * 10.0) * GOLDN          # flash d'or transition

    frame += particle_layer(tg) * GOLD
    frame += (0.085 * (0.82 + 0.18*math.sin(2*math.pi*0.1*tg))) * HALO_GOLD
    frame *= VIGNETTE
    frame += GRAIN[fi % 8]

    k = 1.0
    if tg < FADE_IN:            k = smooth(tg / FADE_IN)
    if tg > DUR - FADE_OUT:     k = min(k, smooth((DUR - tg) / FADE_OUT))
    if k < 1.0:                 frame *= k

    np.clip(frame, 0, 255, out=frame)
    proc.stdin.write(frame.astype(np.uint8).tobytes())
    if fi % 90 == 0:
        print(f"  {fi}/{TOTAL_FRAMES}", flush=True)

proc.stdin.close()
proc.wait()
print(f"OK -> {OUT}", flush=True)
