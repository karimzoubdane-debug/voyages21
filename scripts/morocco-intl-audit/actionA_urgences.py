#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ACTION A — les quatre urgences photo du site international.

Ce ne sont pas des questions de goût : deux images appartiennent à des tiers et sont
publiées sans droit, une troisième n'a aucun rapport avec le circuit qu'elle illustre,
la quatrième vend un lac de barrage comme une ville impériale.

  1. casablanca.jpg — filigrane iStock visible (« Credit: Sergi Formoso »), image
     d'aperçu non achetée, sur la vignette du circuit « À la découverte du Royaume ».
  2. « surf dakhla » — filigrane « Waterwind.it », galerie du séjour Dakhla.
  3. Un singe magot en 1ʳᵉ photo de la galerie du circuit des villes impériales
     (Casablanca · Rabat · Tanger · Meknès · Fès · Marrakech).
  4. meknes.jpg — ne montre pas Meknès mais un lac de barrage, vignette du circuit
     « À la découverte du Royaume ».

Le script RETIRE. Il ne remplace pas : les remplaçantes viendront de la photothèque
à constituer (voir le rapport de curation), et c'est action9_photos.py qui les posera.

Après passage, la vignette « À la découverte du Royaume » garde 4 photos
(Marrakech, Fès, Merzouga, Ouarzazate) — exactement le nombre recommandé.

Usage : python3 actionA_urgences.py <dossier WelcomeChina>
"""

import json
import pathlib
import re
import sys

# --- ce qu'on retire, et pourquoi -------------------------------------------

# Vignettes : (identifiant du carrousel, nom du fichier, motif)
VIGNETTES = [
    ("sl-circuit-discover-kingdom", "casablanca.jpg", "filigrane iStock visible"),
    ("sl-circuit-discover-kingdom", "meknes.jpg",     "ne montre pas Meknes"),
]

# Galeries : (clé de la médiathèque, fragment reconnaissable de l'URL, motif)
GALERIES = [
    ("modal-circuit-imperial-cities", "Went%20to%20the%20Atlas%20Mountains",
     "singe magot, hors sujet sur un circuit de villes"),
    ("modal-maroc-dakhla", "surf%20dakhla",
     "filigrane Waterwind.it, photo d'un tiers"),
]


def dots_html(slider_id, n):
    return "".join(
        '<button class="slider-dot%s" onclick="goSlide(\'%s\', %d)"></button>'
        % (" active" if i == 0 else "", slider_id, i) for i in range(n))


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    racine = pathlib.Path(sys.argv[1])
    idx = racine / "index.html"
    if not idx.exists():
        sys.exit("index.html introuvable dans %s" % racine)
    h = idx.read_text(encoding="utf-8")
    faits, rates = [], []

    # ---- 1) vignettes de la brochure ---------------------------------------
    for slider_id, fichier, motif in VIGNETTES:
        bloc = re.compile(
            r'(<div class="img-slider" data-slider-id="%s">)(.*?)(<button class="slider-arrow slider-prev)'
            % re.escape(slider_id), re.S)
        m = bloc.search(h)
        if not m:
            rates.append("carrousel %s introuvable" % slider_id)
            continue
        slides = m.group(2)
        # la diapo est un <div class="slide" style="background-image: url('…fichier')"></div>
        motif_slide = re.compile(
            r'<div class="slide[^"]*" style="background-image: url\(\'[^\']*%s\'\)"></div>'
            % re.escape(fichier))
        if not motif_slide.search(slides):
            rates.append("%s absente du carrousel %s" % (fichier, slider_id))
            continue
        slides = motif_slide.sub("", slides, count=1)
        # la première diapo restante doit porter la classe « active »
        if 'class="slide active"' not in slides:
            slides = slides.replace('class="slide"', 'class="slide active"', 1)
        h = h[:m.start()] + m.group(1) + slides + m.group(3) + h[m.end():]
        faits.append("vignette : %s retirée (%s)" % (fichier, motif))

    # ---- 2) pastilles : autant que de diapos restantes ----------------------
    for slider_id in {s for s, _, _ in VIGNETTES}:
        m = re.search(
            r'<div class="img-slider" data-slider-id="%s">(.*?)<button class="slider-arrow slider-prev'
            % re.escape(slider_id), h, re.S)
        if not m:
            continue
        n = len(re.findall(r'class="slide[ "]', m.group(1)))
        motif_dots = re.compile(
            r'(data-slider-id="%s".*?<div class="slider-dots">).*?(</div>)'
            % re.escape(slider_id), re.S)
        if motif_dots.search(h):
            h = motif_dots.sub(lambda mm: mm.group(1) + dots_html(slider_id, n) + mm.group(2),
                               h, count=1)
            faits.append("pastilles de %s ramenées à %d" % (slider_id, n))

    # ---- 3) galeries : la médiathèque intégrée en dur -----------------------
    m = re.search(r"(window\.__V21_MEDIA__\s*=\s*)(\{.*?\})(\s*;)", h, re.S)
    if not m:
        sys.exit("ALERTE : window.__V21_MEDIA__ absent — fichier inattendu, rien n'a été écrit.")
    depart = h.index("{", m.start())
    niveau = 0
    for k in range(depart, len(h)):
        if h[k] == "{":
            niveau += 1
        elif h[k] == "}":
            niveau -= 1
            if niveau == 0:
                fin = k + 1
                break
    media = json.loads(h[depart:fin])

    for cle, fragment, motif in GALERIES:
        images = media.get(cle, {}).get("images")
        if images is None:
            rates.append("clé %s absente de la médiathèque" % cle)
            continue
        avant = len(images)
        media[cle]["images"] = [im for im in images if fragment not in im.get("url", "")]
        retire = avant - len(media[cle]["images"])
        if retire:
            faits.append("galerie %s : %d photo retirée (%s), %d restantes"
                         % (cle, retire, motif, len(media[cle]["images"])))
        else:
            rates.append("aucune photo « %s » trouvée dans %s" % (fragment, cle))

    h = h[:depart] + json.dumps(media, ensure_ascii=False) + h[fin:]

    idx.write_text(h, encoding="utf-8")

    # ---- 4) vérification : plus aucune trace ailleurs -----------------------
    restes = []
    for fichier, _ in [(f, m) for _, f, m in VIGNETTES]:
        if fichier in h:
            restes.append(fichier)
    for _, fragment, _ in GALERIES:
        if fragment in h:
            restes.append(fragment)

    print("ACTION A — les quatre urgences")
    for f in faits:
        print("  ✓ %s" % f)
    for r in rates:
        print("  ⚠ %s" % r)
    if restes:
        print("  ⚠ traces encore présentes dans index.html : %s" % ", ".join(restes))
    else:
        print("  ✓ plus aucune référence à ces images dans index.html")
    print("  index.html : %d Ko" % (len(h.encode()) / 1000))
    if rates:
        sys.exit(1)


if __name__ == "__main__":
    main()
