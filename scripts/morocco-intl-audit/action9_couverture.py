#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ACTION 9 — la page de COUVERTURE du site international.

C'est la première page que voit un visiteur de morocco.voyages21.com : une vidéo
plein écran et un bouton d'entrée. Elle était restée telle quelle depuis le clonage
du site chinois — onglet « Hello Morocco », bouton en mandarin. Les actions 1 à 8 ne
la touchaient pas : elles travaillent dans le sous-dossier WelcomeChina/, alors que
la couverture est le index.html de la RACINE de morocco-intl.

Ce que fait ce script :
  · titre d'onglet et description Google en « Morocco Voyages 21 » ;
  · aperçu de partage (WhatsApp, réseaux) ajouté ;
  · bouton d'entrée bilingue anglais / français, plus un caractère chinois ;
  · la police chinoise du bouton laisse la place à la police du site.

Ce qu'il NE fait PAS : renommer le dossier WelcomeChina/. Les chemins sont écrits en
absolu partout ; les renommer casserait toutes les images et tous les liens. Ce
chantier-là se fera au branchement de moroccovoyages21.com, avec ses redirections.

Usage : python3 action9_couverture.py <dossier morocco-intl>
        (le dossier qui CONTIENT index.html et WelcomeChina/)
"""

import pathlib
import re
import sys

TITRE = "Morocco Voyages 21 — Tailor-made Morocco Tours 2026"
DESCRIPTION = ("Tailor-made Morocco tours by Voyages 21, a Marrakech travel agency since 2000. "
               "Imperial cities, Sahara desert and Atlantic coast. "
               "Circuits sur mesure au Maroc, de Marrakech au Sahara.")
BOUTON_EN = "Discover Morocco"
BOUTON_FR = "Découvrez le Maroc"


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    racine = pathlib.Path(sys.argv[1])
    idx = racine / "index.html"
    if not idx.exists():
        sys.exit("index.html introuvable dans %s\n"
                 "Attendu : le dossier morocco-intl, celui qui contient WelcomeChina/." % racine)

    h = idx.read_text(encoding="utf-8")
    if "magicButton" not in h:
        sys.exit("Ce index.html n'est pas la page de couverture (bouton d'entrée absent).\n"
                 "Ne pas confondre avec WelcomeChina/index.html, qui est la brochure.")

    faits = []

    # ---- 1) titre de l'onglet ---------------------------------------------
    h, n = re.subn(r"<title>.*?</title>", "<title>%s</title>" % TITRE, h, count=1, flags=re.S)
    if n:
        faits.append("titre de l'onglet : « Morocco Voyages 21 »")

    # ---- 2) description Google + aperçu de partage -------------------------
    if 'name="description"' not in h:
        balises = (
            '<meta name="description" content="%s">\n'
            '<meta property="og:type" content="website">\n'
            '<meta property="og:site_name" content="Morocco Voyages 21">\n'
            '<meta property="og:title" content="%s">\n'
            '<meta property="og:description" content="%s">\n'
            '<meta name="twitter:card" content="summary_large_image">\n'
        ) % (DESCRIPTION, TITRE, DESCRIPTION)
        h = h.replace("<title>", balises + "<title>", 1)
        faits.append("description Google et aperçu de partage ajoutés")

    # ---- 3) le bouton d'entrée --------------------------------------------
    # Structure d'origine : <span class="btn-zh">开启…</span><span class="btn-en">…</span>
    bouton = re.search(r'<a class="magicButton".*?</a>', h, re.S)
    if bouton:
        neuf = ('<a class="magicButton" href="/WelcomeChina/" '
                'aria-label="%s · %s">\n'
                '      <span class="btn-main">%s</span>\n'
                '      <span class="btn-second">%s</span>\n'
                '    </a>') % (BOUTON_EN, BOUTON_FR, BOUTON_EN, BOUTON_FR)
        h = h[:bouton.start()] + neuf + h[bouton.end():]
        faits.append("bouton d'entrée : « %s / %s »" % (BOUTON_EN, BOUTON_FR))

    # ---- 4) les styles du bouton : plus de police chinoise -----------------
    h = h.replace(
        '.btn-zh {\n'
        '    font-family: "PingFang SC", "Microsoft YaHei", "Noto Sans SC", "Hiragino Sans GB", sans-serif;',
        '.btn-main {\n'
        '    font-family: Georgia, "Times New Roman", serif;')
    h = h.replace(".btn-zh {", ".btn-main {")
    h = h.replace(".btn-en {", ".btn-second {")
    if ".btn-main" in h:
        faits.append("police chinoise du bouton remplacée par celle du site")

    # ---- 5) le nom accessible de la page -----------------------------------
    h, n = re.subn(r'(<main class="cover" aria-label=")[^"]*(")',
                   r'\1Morocco Voyages 21\2', h, count=1)
    if n:
        faits.append("nom accessible de la page corrigé")

    idx.write_text(h, encoding="utf-8")

    # ---- vérification -------------------------------------------------------
    chinois = re.findall(r"[一-鿿]", h)
    print("ACTION 9 — couverture internationale")
    for f in faits:
        print("  ✓ %s" % f)
    if chinois:
        print("  ⚠ %d caractère(s) chinois encore présent(s)" % len(chinois))
        sys.exit(1)
    print("  ✓ plus aucun caractère chinois sur la page d'entrée")
    print("  index.html (racine) : %.1f Ko" % (len(h.encode()) / 1000))
    print()
    print("  Reste à faire au branchement de moroccovoyages21.com :")
    print("    og:image en adresse absolue + une image 1200x630 dédiée,")
    print("    l'aperçu de partage n'affichera pas de visuel avant cela.")


if __name__ == "__main__":
    main()
