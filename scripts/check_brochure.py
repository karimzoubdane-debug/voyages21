#!/usr/bin/env python3
"""Controle structurel de la brochure HTML Voyages 21.

Verifie que la brochure ne contient pas les erreurs qui ont deja casse le
rendu par le passe : balises div desequilibrees, modale incrustee (contenu
duplique), onglet/fiche/slider casse. Sort en erreur (code 1) si un probleme
est detecte, avec un message clair.

Usage:
    python3 scripts/check_brochure.py [chemin_du_fichier_html]
"""

import re
import sys

DEFAULT_FILE = "public/BROCHURE_VOYAGES21_AVEC_IMAGES_V7.html"


def check(path):
    try:
        s = open(path, encoding="utf-8").read()
    except FileNotFoundError:
        print(f"ERREUR: fichier introuvable: {path}")
        return [f"fichier introuvable: {path}"]

    erreurs = []

    # 1) Equilibre des balises <div> / </div>
    ouvrants = len(re.findall(r"<div\b", s))
    fermants = len(re.findall(r"</div>", s))
    if ouvrants != fermants:
        erreurs.append(
            f"Balises div desequilibrees: {ouvrants} <div> pour {fermants} </div> "
            "(risque de contenu qui deborde / s'incruste sur la page)"
        )

    # 2) Onglets: chaque switchTab(...) doit pointer vers une section existante
    onglets = set(re.findall(r"switchTab\('([^']+)'", s))
    sections = set(re.findall(r'id="([^"]+)"[^>]*class="tab-content', s)) | set(
        re.findall(r'class="tab-content[^"]*"[^>]*id="([^"]+)"', s)
    )
    manquants = sorted(onglets - sections)
    if manquants:
        erreurs.append(f"Onglets sans section cible: {manquants}")

    # 3) Modales: openModal(...) <-> id de modale, sans orphelin ni doublon
    boutons = re.findall(r"openModal\('([^']+)'", s)
    modale_ids = re.findall(r'<div class="modal"[^>]*id="([^"]+)"', s)
    modale_set = set(modale_ids)
    sans_modale = sorted(set(boutons) - modale_set)
    if sans_modale:
        erreurs.append(f"Boutons 'Voir details' sans modale cible: {sans_modale}")
    sans_bouton = sorted(modale_set - set(boutons))
    if sans_bouton:
        erreurs.append(f"Modales sans bouton d'ouverture: {sans_bouton}")
    doublons = sorted({i for i in modale_ids if modale_ids.count(i) > 1})
    if doublons:
        erreurs.append(f"IDs de modales dupliques: {doublons}")

    # 4) Une modale = un seul modal-content (le doublon = la modale incrustee)
    nb_modales = len(modale_ids)
    nb_content = len(re.findall(r'<div class="modal-content">', s))
    if nb_modales != nb_content:
        erreurs.append(
            f"Nombre de modal-content ({nb_content}) different du nombre de modales "
            f"({nb_modales}): contenu de fiche duplique hors de sa modale "
            "(c'est ce qui incruste une fiche sur toutes les pages)"
        )

    # 5) Sliders: chaque controle pointe vers un conteneur data-slider-id existant
    conteneurs = set(re.findall(r'data-slider-id="(sl-[^"]+)"', s))
    references = set(re.findall(r"(?:prevSlide|nextSlide|goSlide)\('(sl-[^']+)'", s))
    sliders_casses = sorted(references - conteneurs)
    if sliders_casses:
        erreurs.append(f"Controles de slider sans conteneur: {sliders_casses}")

    # 6) Fonctions JS essentielles definies
    for fn in ["switchTab", "openModal", "closeModal", "initSliders", "goSlide",
               "prevSlide", "nextSlide"]:
        if not re.search(r"function\s+" + fn + r"\b", s):
            erreurs.append(f"Fonction JS manquante: {fn}()")

    # Rapport
    print(f"Controle de: {path}")
    print(f"  onglets: {len(onglets)} | modales: {nb_modales} | "
          f"modal-content: {nb_content} | sliders: {len(conteneurs)} | "
          f"div {ouvrants}/{fermants}")
    return erreurs


def main():
    path = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_FILE
    erreurs = check(path)
    if erreurs:
        print("\nECHEC - problemes detectes:")
        for e in erreurs:
            print(f"  - {e}")
        sys.exit(1)
    print("\nOK - la brochure est structurellement saine.")


if __name__ == "__main__":
    main()
