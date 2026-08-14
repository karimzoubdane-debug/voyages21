#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AUDIT PHOTO — site international « Morocco Voyages 21 » (morocco.voyages21.com).

Ce script mesure. Il ne juge pas : les descriptions et les décisions vivent dans
`fiches.json`, écrites à la main (ou par Claude après avoir REGARDÉ les photos).

Ce qu'il fait, à chaque exécution :
  1. télécharge les fichiers réellement EN LIGNE (index.html, voyages/render.js,
     voyages/data.js) — jamais la version GitHub, qui est antérieure à « mediafix3 » ;
  2. en extrait les trois sources de visuels du site :
       · les vignettes des cartes de la brochure (liens Unsplash ou fichiers locaux),
       · la médiathèque intégrée en dur (window.__V21_MEDIA__),
       · les fichiers locaux assets/… ;
  3. télécharge chaque photo Maroc, mesure définition, poids, format ;
  4. compare à `fiches.json` et signale : photos NOUVELLES (à décrire), photos
     DISPARUES, photos MODIFIÉES (poids/définition), doublons ;
  5. écrit `audit-<date>.json`, consommé par `build_report.js` pour le rapport Word.

Usage :
    python3 audit_photos.py                 # audit du jour
    python3 audit_photos.py --date 2026-08-14
"""

import argparse
import concurrent.futures
import datetime
import hashlib
import json
import os
import pathlib
import re
import struct
import sys
import urllib.parse
import urllib.request

BASE = "https://morocco.voyages21.com/WelcomeChina/"
ICI = pathlib.Path(__file__).parent
CACHE = ICI / ".cache"

# Les 5 circuits vendus + les 3 séjours masqués (décision du 11/08/2026).
CIRCUITS = {
    "modal-circuit-imperial-south":   ("sl-circuit-imperial-south",   "Circuit Villes imperiales & Sud marocain", True),
    "modal-circuit-imperial-cities":  ("sl-circuit-imperial-cities",  "Circuit des villes imperiales",            True),
    "modal-circuit-best-morocco":     ("sl-circuit-best-morocco",     "Le meilleur du Maroc",                     True),
    "modal-circuit-discover-kingdom": ("sl-circuit-discover-kingdom", "A la decouverte du Royaume",               True),
    "modal-circuit-grand-discovery":  ("sl-circuit-grand-discovery",  "Splendide Maroc - le grand tour",          True),
    "modal-maroc-merzouga":           ("sl-merzouga",                 "Sejour Merzouga (masque)",                 False),
    "modal-maroc-bin-el-ouidane":     ("sl-binouidane",               "Sejour Bin El Ouidane (masque)",           False),
    "modal-maroc-dakhla":             ("sl-dakhla",                   "Sejour Dakhla (masque)",                   False),
}

# Seuils de la charte (voir PHOTOS-A-FOURNIR.md).
LARGEUR_MINI = 1600
POIDS_MAXI = 300_000
RATIO_MINI = 1.2          # en deçà : l'image n'est pas vraiment en paysage


# ---------------------------------------------------------------- réseau

def telecharger(url, timeout=90):
    req = urllib.request.Request(url, headers={"User-Agent": "voyages21-audit/1.0"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def telecharger_cache(url):
    """Cache disque : une même photo n'est téléchargée qu'une fois par exécution."""
    CACHE.mkdir(exist_ok=True)
    cle = hashlib.sha1(url.encode()).hexdigest()[:16]
    f = CACHE / cle
    if f.exists():
        return f.read_bytes(), None
    try:
        d = telecharger(url)
    except Exception as e:                      # noqa: BLE001 — on veut le message
        return None, "%s: %s" % (type(e).__name__, str(e)[:80])
    f.write_bytes(d)
    return d, None


# ---------------------------------------------------------------- mesure

def dimensions(data):
    """Largeur/hauteur d'un JPEG, PNG ou WebP, sans dépendance externe."""
    if data[:2] == b"\xff\xd8":                                     # JPEG
        i = 2
        while i < len(data) - 9:
            if data[i] != 0xFF:
                i += 1
                continue
            marqueur = data[i + 1]
            if marqueur in (0xD8, 0x01) or 0xD0 <= marqueur <= 0xD7:
                i += 2
                continue
            taille = struct.unpack(">H", data[i + 2:i + 4])[0]
            if marqueur in (0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7,
                            0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF):
                h, w = struct.unpack(">HH", data[i + 5:i + 9])
                return w, h
            i += 2 + taille
    if data[:8] == b"\x89PNG\r\n\x1a\n":                            # PNG
        return struct.unpack(">II", data[16:24])
    if data[:4] == b"RIFF" and data[8:12] == b"WEBP":               # WebP
        codec = data[12:16]
        if codec == b"VP8 ":
            return (struct.unpack("<H", data[26:28])[0] & 0x3FFF,
                    struct.unpack("<H", data[28:30])[0] & 0x3FFF)
        if codec == b"VP8L":
            b = struct.unpack("<I", data[21:25])[0]
            return (b & 0x3FFF) + 1, ((b >> 14) & 0x3FFF) + 1
        if codec == b"VP8X":
            return (int.from_bytes(data[24:27], "little") + 1,
                    int.from_bytes(data[27:30], "little") + 1)
    return 0, 0


def defauts(largeur, hauteur, poids):
    d = []
    if hauteur and largeur / hauteur < RATIO_MINI:
        d.append("pas en paysage")
    if largeur and largeur < LARGEUR_MINI:
        d.append("moins de %d px de large" % LARGEUR_MINI)
    if poids > POIDS_MAXI:
        d.append("plus de %d Ko" % (POIDS_MAXI // 1000))
    return d


# ---------------------------------------------------------------- extraction

def bloc_media(html):
    """Le manifeste intégré en dur par « mediafix3 » : window.__V21_MEDIA__ = {...}."""
    depart = html.find("window.__V21_MEDIA__")
    if depart < 0:
        raise SystemExit("ALERTE : window.__V21_MEDIA__ absent du index.html en ligne.\n"
                         "Le site est peut-être revenu à une version antérieure à mediafix3.")
    i = html.index("{", depart)
    niveau = 0
    for k in range(i, len(html)):
        if html[k] == "{":
            niveau += 1
        elif html[k] == "}":
            niveau -= 1
            if niveau == 0:
                return json.loads(html[i:k + 1])
    raise SystemExit("window.__V21_MEDIA__ mal formé (accolade non refermée).")


def vignettes(html, slider_id):
    motif = re.compile(r'data-slider-id="%s">(.*?)<button class="slider-arrow slider-prev'
                       % re.escape(slider_id), re.S)
    m = motif.search(html)
    if not m:
        return []
    return re.findall(r"url\('([^']+)'\)", m.group(1))


def absolue(url):
    if url.startswith("http"):
        return url
    return "https://morocco.voyages21.com/" + url.lstrip("/")


# ---------------------------------------------------------------- audit

def auditer(date):
    print("→ récupération des fichiers en ligne…")
    fichiers = {}
    for nom in ("index.html", "voyages/render.js", "voyages/data.js"):
        fichiers[nom] = telecharger(BASE + nom).decode("utf-8", "replace")
        print("   %-20s %6d Ko" % (nom, len(fichiers[nom].encode()) / 1000))

    html = fichiers["index.html"]
    media = bloc_media(html)
    print("→ médiathèque intégrée : %d clés, %d images au total"
          % (len(media), sum(len(v.get("images", [])) for v in media.values())))

    # --- constitution de la liste des photos à mesurer -------------------
    a_mesurer = []          # (ref_provisoire, circuit, emplacement, position, url)
    for cle, (slider, libelle, affiche) in CIRCUITS.items():
        for pos, url in enumerate(vignettes(html, slider), 1):
            a_mesurer.append((libelle, "vignette", pos, absolue(url), affiche))
        for pos, img in enumerate(media.get(cle, {}).get("images", []), 1):
            if img.get("url"):
                a_mesurer.append((libelle, "galerie", pos, img["url"], affiche))

    print("→ %d photos à mesurer…" % len(a_mesurer))

    def mesurer(item):
        libelle, emplacement, pos, url, affiche = item
        data, err = telecharger_cache(url)
        if data is None:
            return dict(circuit=libelle, emplacement=emplacement, position=pos, url=url,
                        affiche=affiche, erreur=err, largeur=0, hauteur=0, poids=0,
                        defauts=["inaccessible"], empreinte=None)
        w, h = dimensions(data)
        return dict(circuit=libelle, emplacement=emplacement, position=pos, url=url,
                    affiche=affiche, erreur=None, largeur=w, hauteur=h, poids=len(data),
                    defauts=defauts(w, h, len(data)),
                    empreinte=hashlib.sha1(data).hexdigest()[:12])

    with concurrent.futures.ThreadPoolExecutor(8) as pool:
        photos = list(pool.map(mesurer, a_mesurer))

    # --- doublons : même contenu binaire à deux endroits -----------------
    par_empreinte = {}
    for p in photos:
        if p["empreinte"]:
            par_empreinte.setdefault(p["empreinte"], []).append(
                "%s / %s #%d" % (p["circuit"], p["emplacement"], p["position"]))
    doublons = {k: v for k, v in par_empreinte.items() if len(v) > 1}
    # Le même fichier octet pour octet est rare : Pinterest re-encode. Les vrais
    # doublons sont visuels, ils sont notés à la main dans fiches.json.

    # --- rapprochement avec les fiches écrites à la main -----------------
    fiches = json.loads((ICI / "fiches.json").read_text(encoding="utf-8"))
    par_url = {f["url"]: f for f in fiches["photos"]}
    connues, nouvelles = 0, []
    for p in photos:
        f = par_url.get(p["url"])
        if f:
            p.update(ref=f["ref"], description=f["description"],
                     inconvenients=f["inconvenients"], action=f["action"])
            connues += 1
        else:
            p.update(ref=None, description=None, inconvenients=None, action=None)
            nouvelles.append(p)
    urls_en_ligne = {p["url"] for p in photos}
    disparues = [f for f in fiches["photos"] if f["url"] not in urls_en_ligne]

    # --- synthèse chiffrée -----------------------------------------------
    galerie = [p for p in photos if p["emplacement"] == "galerie"]
    mesurees = [p for p in photos if p["empreinte"]]
    doublons_vus = sum(1 for p in photos
                       if (p.get("inconvenients") or "").upper().count("DOUBLON"))
    synthese = dict(
        total=len(photos),
        vignettes=len(photos) - len(galerie),
        galerie=len(galerie),
        mesurees=len(mesurees),
        paysage=sum(1 for p in galerie if "pas en paysage" not in p["defauts"]),
        assez_larges=sum(1 for p in galerie if p["largeur"] >= LARGEUR_MINI),
        assez_legeres=sum(1 for p in galerie if 0 < p["poids"] <= POIDS_MAXI),
        inaccessibles=sum(1 for p in photos if p["erreur"]),
        doublons_octets=len(doublons),
        doublons_vus=doublons_vus,
        conformes=sum(1 for p in mesurees if not p["defauts"]),
    )

    resultat = dict(
        date=date,
        source=BASE,
        tailles_fichiers={n: len(c.encode()) for n, c in fichiers.items()},
        cles_mediatheque=len(media),
        images_mediatheque=sum(len(v.get("images", [])) for v in media.values()),
        synthese=synthese,
        photos=photos,
        doublons=doublons,
        nouvelles=[p["url"] for p in nouvelles],
        disparues=[f["ref"] for f in disparues],
        fiches_connues=connues,
    )

    sortie = ICI / ("audit-%s.json" % date)
    sortie.write_text(json.dumps(resultat, ensure_ascii=False, indent=1), encoding="utf-8")

    # --- ce que l'humain (ou Claude) doit lire ---------------------------
    print()
    print("╔══ AUDIT DU %s ══" % date)
    print("║ %d photos Maroc  (%d vignettes + %d galerie)"
          % (synthese["total"], synthese["vignettes"], synthese["galerie"]))
    print("║ Conformes à la charte : %d / %d mesurées" % (synthese["conformes"], synthese["mesurees"]))
    print("║ En galerie — paysage %d/%d · ≥1600 px %d/%d · ≤300 Ko %d/%d"
          % (synthese["paysage"], synthese["galerie"],
             synthese["assez_larges"], synthese["galerie"],
             synthese["assez_legeres"], synthese["galerie"]))
    print("║ Doublons repérés : %d · Non mesurables (liens externes) : %d"
          % (synthese["doublons_vus"], synthese["inaccessibles"]))
    if nouvelles:
        print("║")
        print("║ ⚠ %d PHOTO(S) NOUVELLE(S) — à regarder et à décrire dans fiches.json :" % len(nouvelles))
        for p in nouvelles:
            print("║    %s / %s #%d" % (p["circuit"], p["emplacement"], p["position"]))
            print("║    %s" % urllib.parse.unquote(p["url"])[:110])
    if disparues:
        print("║")
        print("║ ⚠ %d photo(s) DISPARUE(S) du site : %s"
              % (len(disparues), ", ".join(f["ref"] for f in disparues)))
    if not nouvelles and not disparues:
        print("║")
        print("║ ✓ Aucun changement depuis le dernier audit.")
    print("╚══ écrit dans %s" % sortie.name)
    return resultat


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--date", default=datetime.date.today().isoformat(),
                    help="date de l'audit (par défaut : aujourd'hui)")
    args = ap.parse_args()
    try:
        auditer(args.date)
    except urllib.error.URLError as e:
        sys.exit("Le site est injoignable (%s). Vérifier que morocco.voyages21.com répond." % e)


if __name__ == "__main__":
    main()
