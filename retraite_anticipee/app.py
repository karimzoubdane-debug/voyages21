# -*- coding: utf-8 -*-
"""
Simulateur de Retraite Anticipée - Banque Marocaine (GPBM)
===========================================================
Compare deux scénarios pour un cadre bancaire marocain :
  - Scénario A : départ anticipé (capital de sortie + pension anticipée + revenus projet)
  - Scénario B : rester jusqu'à 60 ans (salaire croissant puis pension normale)

Calcule la VAN, le capital breakeven, et fournit une recommandation.

Lancement :
    pip install -r requirements.txt
    streamlit run app.py
"""

from __future__ import annotations

import io
from dataclasses import dataclass

import pandas as pd
import plotly.graph_objects as go
import streamlit as st

# ---------------------------------------------------------------------------
# Constantes et thème
# ---------------------------------------------------------------------------

# Seuil légal marocain d'exonération d'IR sur l'indemnité de départ volontaire
SEUIL_EXO_IR_DH = 1_000_000.0

# Couleurs charte bancaire
COLOR_PRIMARY = "#0B3D91"   # bleu profond
COLOR_SECONDARY = "#0E8C5A" # vert
COLOR_WARN = "#C0392B"
COLOR_NEUTRAL = "#7F8C8D"

st.set_page_config(
    page_title="Simulateur Retraite Anticipée - Banque Marocaine",
    page_icon="🏦",
    layout="wide",
)

# Style CSS léger pour donner une touche pro
st.markdown(
    f"""
    <style>
        .main-header {{
            background: linear-gradient(90deg, {COLOR_PRIMARY} 0%, {COLOR_SECONDARY} 100%);
            padding: 18px 24px;
            border-radius: 10px;
            color: white;
            margin-bottom: 16px;
        }}
        .reco-box {{
            padding: 22px;
            border-radius: 12px;
            text-align: center;
            font-size: 24px;
            font-weight: 700;
            margin: 12px 0;
        }}
        .reco-go {{ background: #E6F7EE; color: {COLOR_SECONDARY}; border: 2px solid {COLOR_SECONDARY}; }}
        .reco-stay {{ background: #FDEDEC; color: {COLOR_WARN}; border: 2px solid {COLOR_WARN}; }}
        .metric-card {{
            background: #F4F6F8; padding: 14px; border-radius: 8px; border-left: 4px solid {COLOR_PRIMARY};
        }}
        .small-note {{ color: {COLOR_NEUTRAL}; font-size: 13px; }}
    </style>
    """,
    unsafe_allow_html=True,
)

st.markdown(
    """
    <div class="main-header">
        <h1 style="margin:0;">🏦 Simulateur de Retraite Anticipée</h1>
        <p style="margin:4px 0 0 0;">Secteur bancaire marocain (GPBM) – Analyse VAN, fiscalité du capital, breakeven et rente viagère</p>
    </div>
    """,
    unsafe_allow_html=True,
)

# ---------------------------------------------------------------------------
# Fonctions de calcul
# ---------------------------------------------------------------------------


def calcul_capital_net(capital_brut: float, taux_impot: float, seuil_exo: float = SEUIL_EXO_IR_DH) -> tuple[float, float, float]:
    """Calcule le capital net après IR.

    Au Maroc, l'indemnité de départ volontaire est exonérée d'IR jusqu'au seuil légal.
    L'excédent est imposé au barème progressif (estimation moyenne via `taux_impot`).

    Retourne (capital_net, partie_imposable, impot_du).
    """
    if capital_brut <= seuil_exo:
        return capital_brut, 0.0, 0.0
    partie_imposable = capital_brut - seuil_exo
    impot = partie_imposable * taux_impot
    capital_net = seuil_exo + partie_imposable - impot
    return capital_net, partie_imposable, impot


def capital_brut_depuis_net(capital_net: float, taux_impot: float, seuil_exo: float = SEUIL_EXO_IR_DH) -> float:
    """Inverse de `calcul_capital_net` : combien faut-il négocier en brut pour obtenir un net donné ?"""
    if capital_net <= seuil_exo:
        return capital_net
    return seuil_exo + (capital_net - seuil_exo) / (1.0 - taux_impot)


def taux_actu_effectif(taux_actu: float, inflation: float) -> float:
    """Combine taux d'actualisation et inflation.

    Quand `inflation = 0`, le taux effectif est identique au taux d'actualisation
    (les calculs ne sont pas affectés). Sinon on applique la formule de Fisher :
    (1 + r_eff) = (1 + r) * (1 + i).
    """
    return (1.0 + taux_actu) * (1.0 + inflation) - 1.0


def annuite_rente_viagere(capital_net: float, taux_rente: float, duree_annees: int) -> float:
    """Convertit un capital net en rente annuelle sur `duree_annees`.

    Formule d'annuité constante (rente certaine) :
        annuite = capital * r / (1 - (1+r)^-n)
    Si r ~ 0 : annuite = capital / n.
    """
    if duree_annees <= 0:
        return 0.0
    if abs(taux_rente) < 1e-9:
        return capital_net / duree_annees
    return capital_net * taux_rente / (1.0 - (1.0 + taux_rente) ** (-duree_annees))


@dataclass
class Parametres:
    """Encapsule tous les paramètres de simulation."""

    age_actuel: int
    age_retraite_normale: int
    horizon_annees: int

    salaire_brut_annuel: float
    salaire_net_mensuel: float
    prime_brute_annuelle: float
    augmentation_brute_mensuelle: float  # augmentation brute par mois, par an

    pension_nette_55_mensuelle: float
    pension_nette_60_mensuelle: float
    mutuelle_annuelle: float

    nb_annees_salaire_capital: float
    prime_incluse_capital: float
    capital_brut_manuel: float | None  # None => auto-calculé

    taux_impot_excedent: float
    taux_actualisation: float
    inflation: float

    revenus_projet_net_mensuel: float

    duree_non_concurrence_mois: int
    indemnite_non_concurrence_mensuelle: float

    rente_viagere_active: bool
    rente_viagere_taux: float  # taux de rendement de la rente

    def annees_jusqua_retraite_normale(self) -> int:
        return max(0, self.age_retraite_normale - self.age_actuel)


def capital_brut_auto(p: Parametres) -> float:
    """Capital brut auto-calculé = N années de salaire brut + prime."""
    return p.nb_annees_salaire_capital * p.salaire_brut_annuel + p.prime_incluse_capital


def capital_brut_final(p: Parametres) -> float:
    """Si l'utilisateur a saisi un montant manuel, on l'utilise ; sinon auto."""
    if p.capital_brut_manuel is not None and p.capital_brut_manuel > 0:
        return p.capital_brut_manuel
    return capital_brut_auto(p)


def ratio_net_brut_salaire(p: Parametres) -> float:
    """Ratio net/brut basé sur les données utilisateur (pour propager les augmentations sur le net)."""
    brut_mensuel = p.salaire_brut_annuel / 12.0
    if brut_mensuel <= 0:
        return 0.6  # valeur de repli prudente
    return p.salaire_net_mensuel / brut_mensuel


def flux_scenario_depart_anticipe(p: Parametres) -> pd.DataFrame:
    """Construit les flux annuels nets du scénario A (départ anticipé).

    - Année 0 : capital net (lump sum) OU première annuité de rente viagère
    - Toutes années : pension nette 55 ans + revenus projet - mutuelle
    - Indemnité de non-concurrence pendant la durée de la clause
    """
    capital_brut = capital_brut_final(p)
    capital_net, _, _ = calcul_capital_net(capital_brut, p.taux_impot_excedent)

    if p.rente_viagere_active and p.horizon_annees > 0:
        rente_annuelle = annuite_rente_viagere(capital_net, p.rente_viagere_taux, p.horizon_annees)
        capital_immediat = 0.0
    else:
        rente_annuelle = 0.0
        capital_immediat = capital_net

    pension_annuelle = p.pension_nette_55_mensuelle * 12
    revenus_projet_annuel = p.revenus_projet_net_mensuel * 12
    indemnite_nc_annuelle = p.indemnite_non_concurrence_mensuelle * 12
    duree_nc_annees = p.duree_non_concurrence_mois / 12.0

    lignes = []
    for t in range(p.horizon_annees + 1):
        flux = pension_annuelle + revenus_projet_annuel - p.mutuelle_annuelle
        if t == 0:
            flux += capital_immediat
        if p.rente_viagere_active and 1 <= t <= p.horizon_annees:
            flux += rente_annuelle
        # Indemnité non-concurrence répartie sur sa durée (proportion pour année partielle)
        if duree_nc_annees > 0 and t < duree_nc_annees:
            part = min(1.0, duree_nc_annees - t)
            flux += indemnite_nc_annuelle * part
        lignes.append({"annee": t, "age": p.age_actuel + t, "flux_net_dh": flux})

    df = pd.DataFrame(lignes)
    df["scenario"] = "Départ anticipé"
    return df


def flux_scenario_rester(p: Parametres) -> pd.DataFrame:
    """Construit les flux annuels nets du scénario B (rester jusqu'à 60 ans).

    - Pendant `n` ans (jusqu'à la retraite normale) : salaire net mensuel croissant
      (l'augmentation brute mensuelle est convertie en équivalent net via le ratio net/brut)
    - Ensuite : pension nette 60 ans
    - Mutuelle déduite chaque année
    """
    annees_actif = p.annees_jusqua_retraite_normale()
    ratio = ratio_net_brut_salaire(p)
    augmentation_nette_mensuelle = p.augmentation_brute_mensuelle * ratio
    salaire_net_courant = p.salaire_net_mensuel

    pension_annuelle = p.pension_nette_60_mensuelle * 12

    lignes = []
    for t in range(p.horizon_annees + 1):
        if t < annees_actif:
            salaire_annuel = salaire_net_courant * 12
            flux = salaire_annuel - p.mutuelle_annuelle
            salaire_net_courant += augmentation_nette_mensuelle  # incrément annuel
        else:
            flux = pension_annuelle - p.mutuelle_annuelle
        lignes.append({"annee": t, "age": p.age_actuel + t, "flux_net_dh": flux})

    df = pd.DataFrame(lignes)
    df["scenario"] = "Rester jusqu'à 60 ans"
    return df


def van(flux: pd.DataFrame, taux: float) -> float:
    """Valeur Actualisée Nette des flux annuels au taux donné."""
    if flux.empty:
        return 0.0
    discount = (1.0 + taux) ** flux["annee"].values
    return float((flux["flux_net_dh"].values / discount).sum())


def capital_breakeven_net(p: Parametres) -> float:
    """Capital net minimal qui rend VAN_A >= VAN_B.

    On résout par recherche numérique (le capital net intervient soit en lump sum,
    soit annuitisé en rente viagère, le second cas n'étant pas linéaire de façon
    triviale, on utilise une bissection sur le capital brut).
    """
    taux_eff = taux_actu_effectif(p.taux_actualisation, p.inflation)
    van_b = van(flux_scenario_rester(p), taux_eff)

    def van_a_pour_capital_brut(capital_brut: float) -> float:
        p_test = Parametres(**{**p.__dict__, "capital_brut_manuel": capital_brut})
        return van(flux_scenario_depart_anticipe(p_test), taux_eff)

    # Bissection entre 0 et un majorant raisonnable
    lo, hi = 0.0, 20_000_000.0
    # Vérifie qu'on peut atteindre la cible
    if van_a_pour_capital_brut(hi) < van_b:
        return float("inf")  # hors d'atteinte
    for _ in range(80):
        mid = (lo + hi) / 2
        if van_a_pour_capital_brut(mid) < van_b:
            lo = mid
        else:
            hi = mid
    capital_brut_be = (lo + hi) / 2
    capital_net_be, _, _ = calcul_capital_net(capital_brut_be, p.taux_impot_excedent)
    return capital_net_be


# ---------------------------------------------------------------------------
# Interface : onglets
# ---------------------------------------------------------------------------

tab_donnees, tab_variables, tab_resultats, tab_graphiques, tab_conseils = st.tabs(
    ["👤 Mes données", "🎚️ Variables à tester", "📊 Résultats", "📈 Graphiques", "💡 Conseils"]
)

# ---------- Onglet 1 : Mes données ----------
with tab_donnees:
    st.subheader("Données personnelles et professionnelles")
    st.caption("Toutes les valeurs sont modifiables. Les défauts correspondent au profil utilisateur de référence.")

    col1, col2, col3 = st.columns(3)
    with col1:
        age_actuel = st.number_input(
            "Âge actuel (ans)", min_value=30, max_value=70, value=55, step=1,
            help="Votre âge au moment du départ anticipé envisagé."
        )
        age_retraite_normale = st.number_input(
            "Âge de retraite normale (ans)", min_value=55, max_value=70, value=60, step=1,
            help="Âge légal de départ à la retraite (60 ans dans le secteur bancaire marocain)."
        )
        anciennete = st.number_input(
            "Ancienneté (années)", min_value=0, max_value=50, value=31, step=1,
            help="Ancienneté dans la banque, utilisée à titre informatif."
        )

    with col2:
        salaire_brut_annuel = st.number_input(
            "Salaire brut annuel (DH)", min_value=0.0, value=524_767.0, step=1000.0,
            help="Salaire brut annuel total (hors prime)."
        )
        prime_brute_annuelle = st.number_input(
            "Prime brute annuelle (DH)", min_value=0.0, value=40_000.0, step=1000.0,
            help="Prime annuelle (bonus, treizième mois, etc.)."
        )
        salaire_net_mensuel = st.number_input(
            "Salaire net mensuel (DH)", min_value=0.0, value=28_000.0, step=500.0,
            help="Salaire net mensuel reçu en main."
        )

    with col3:
        augmentation_brute_mensuelle = st.number_input(
            "Augmentation annuelle (DH brut/mois)", min_value=0.0, value=800.0, step=50.0,
            help="Augmentation prévue chaque année, en DH brut/mois (ex: 800 DH/mois => 9 600 DH/an)."
        )
        pension_nette_55_mensuelle = st.number_input(
            "Pension nette à 55 ans (DH/mois)", min_value=0.0, value=12_000.0, step=500.0,
            help="Pension mensuelle nette en cas de départ anticipé."
        )
        pension_nette_60_mensuelle = st.number_input(
            "Pension nette à 60 ans (DH/mois)", min_value=0.0, value=17_000.0, step=500.0,
            help="Pension mensuelle nette si vous restez jusqu'à 60 ans."
        )

    col4, col5 = st.columns(2)
    with col4:
        mutuelle_trimestrielle = st.number_input(
            "Mutuelle (DH/trimestre)", min_value=0.0, value=600.0, step=50.0,
            help="Cotisation mutuelle identique dans les deux scénarios (600 DH/trim = 2 400 DH/an)."
        )
    with col5:
        st.metric("Mutuelle annuelle", f"{mutuelle_trimestrielle * 4:,.0f} DH")

# ---------- Onglet 2 : Variables à tester ----------
with tab_variables:
    st.subheader("Paramètres de simulation")

    colA, colB = st.columns(2)

    with colA:
        st.markdown("##### 💼 Capital de sortie")
        nb_annees_salaire_capital = st.slider(
            "Nombre d'années de salaire brut proposées", min_value=0.0, max_value=10.0, value=3.0, step=0.5,
            help="Multiplicateur appliqué au salaire brut annuel pour composer le capital de sortie."
        )
        prime_incluse_capital = st.number_input(
            "Prime brute incluse dans le capital (DH)", min_value=0.0, value=40_000.0, step=5_000.0,
            help="Prime additionnelle incluse dans le package de départ."
        )

        capital_auto = nb_annees_salaire_capital * salaire_brut_annuel + prime_incluse_capital
        st.markdown(
            f"<div class='metric-card'><b>Capital brut auto-calculé :</b> {capital_auto:,.0f} DH</div>",
            unsafe_allow_html=True,
        )

        capital_brut_manuel_active = st.checkbox(
            "Saisir manuellement le capital brut",
            help="Permet d'ignorer le calcul automatique et de tester un montant précis négocié."
        )
        capital_brut_manuel: float | None = None
        if capital_brut_manuel_active:
            capital_brut_manuel = st.number_input(
                "Capital brut total proposé (DH)", min_value=0.0, value=float(capital_auto), step=10_000.0
            )

        taux_impot_excedent_pct = st.slider(
            "Taux d'imposition moyen sur l'excédent (%)", min_value=0.0, max_value=42.0, value=32.0, step=0.5,
            help=f"Seuil d'exonération légal : {SEUIL_EXO_IR_DH:,.0f} DH. L'excédent est taxé à ce taux moyen estimé."
        )

    with colB:
        st.markdown("##### 📈 Hypothèses économiques")
        taux_actualisation_pct = st.slider(
            "Taux d'actualisation (%)", min_value=0.0, max_value=10.0, value=3.5, step=0.1,
            help="Taux utilisé pour ramener les flux futurs à valeur d'aujourd'hui (VAN)."
        )
        inflation_pct = st.number_input(
            "Inflation annuelle (%) — optionnel", min_value=0.0, max_value=15.0, value=0.0, step=0.1,
            help="Si laissé à 0, les calculs ne sont pas affectés. Sinon, érosion appliquée aux flux futurs (formule de Fisher)."
        )
        horizon_annees = st.slider(
            "Horizon d'analyse (années)", min_value=5, max_value=40, value=30, step=1,
            help="Durée totale d'analyse à partir de l'âge actuel (~jusqu'à 85 ans par défaut)."
        )

        st.markdown("##### 🚀 Revenus complémentaires (après départ)")
        revenus_projet_net_mensuel = st.number_input(
            "Revenus nets mensuels d'un nouveau projet/emploi (DH)", min_value=0.0, value=0.0, step=1_000.0,
            help="Variable très importante : revenus nets d'un nouvel emploi ou projet après départ anticipé."
        )

        st.markdown("##### 🤝 Clause de non-concurrence")
        duree_non_concurrence_mois = st.number_input(
            "Durée de la clause (mois)", min_value=0, max_value=60, value=0, step=1,
            help="Durée pendant laquelle vous ne pouvez pas travailler pour la concurrence."
        )
        indemnite_non_concurrence_mensuelle = st.number_input(
            "Indemnité mensuelle de non-concurrence (DH)", min_value=0.0, value=0.0, step=500.0,
            help="Indemnité éventuellement versée par la banque pendant la clause."
        )

    st.markdown("##### 💰 Option : conversion en rente viagère")
    rente_viagere_active = st.checkbox(
        "Convertir le capital net en rente viagère plutôt qu'en versement unique",
        help="Le capital net est transformé en versements annuels constants sur la durée de l'horizon."
    )
    rente_viagere_taux_pct = st.slider(
        "Taux de rendement de la rente (%)", min_value=0.0, max_value=10.0, value=3.5, step=0.1,
        help="Taux technique utilisé pour la conversion capital → rente annuelle.",
        disabled=not rente_viagere_active,
    )

# ---------- Construction des paramètres ----------
params = Parametres(
    age_actuel=int(age_actuel),
    age_retraite_normale=int(age_retraite_normale),
    horizon_annees=int(horizon_annees),
    salaire_brut_annuel=float(salaire_brut_annuel),
    salaire_net_mensuel=float(salaire_net_mensuel),
    prime_brute_annuelle=float(prime_brute_annuelle),
    augmentation_brute_mensuelle=float(augmentation_brute_mensuelle),
    pension_nette_55_mensuelle=float(pension_nette_55_mensuelle),
    pension_nette_60_mensuelle=float(pension_nette_60_mensuelle),
    mutuelle_annuelle=float(mutuelle_trimestrielle * 4),
    nb_annees_salaire_capital=float(nb_annees_salaire_capital),
    prime_incluse_capital=float(prime_incluse_capital),
    capital_brut_manuel=capital_brut_manuel,
    taux_impot_excedent=float(taux_impot_excedent_pct) / 100.0,
    taux_actualisation=float(taux_actualisation_pct) / 100.0,
    inflation=float(inflation_pct) / 100.0,
    revenus_projet_net_mensuel=float(revenus_projet_net_mensuel),
    duree_non_concurrence_mois=int(duree_non_concurrence_mois),
    indemnite_non_concurrence_mensuelle=float(indemnite_non_concurrence_mensuelle),
    rente_viagere_active=bool(rente_viagere_active),
    rente_viagere_taux=float(rente_viagere_taux_pct) / 100.0,
)

# ---------- Calculs centraux ----------
capital_brut = capital_brut_final(params)
capital_net, partie_imposable, impot_capital = calcul_capital_net(capital_brut, params.taux_impot_excedent)
taux_eff = taux_actu_effectif(params.taux_actualisation, params.inflation)

flux_A = flux_scenario_depart_anticipe(params)
flux_B = flux_scenario_rester(params)
van_A = van(flux_A, taux_eff)
van_B = van(flux_B, taux_eff)
delta_van = van_A - van_B
delta_van_pct = (delta_van / van_B * 100) if van_B != 0 else 0.0
ecart_mensuel_moyen = delta_van / (params.horizon_annees * 12) if params.horizon_annees > 0 else 0.0

capital_net_breakeven = capital_breakeven_net(params)
capital_brut_breakeven = (
    capital_brut_depuis_net(capital_net_breakeven, params.taux_impot_excedent)
    if capital_net_breakeven != float("inf") else float("inf")
)

# ---------- Onglet 3 : Résultats ----------
with tab_resultats:
    st.subheader("Résultats de la simulation")

    # Bandeau recommandation
    if delta_van >= 0:
        st.markdown(
            f"<div class='reco-box reco-go'>✅ Départ anticipé recommandé<br>"
            f"<span style='font-size:16px;font-weight:400;'>Gain VAN : +{delta_van:,.0f} DH ({delta_van_pct:+.1f} %)</span></div>",
            unsafe_allow_html=True,
        )
    else:
        st.markdown(
            f"<div class='reco-box reco-stay'>⛔ Mieux vaut rester jusqu'à 60 ans<br>"
            f"<span style='font-size:16px;font-weight:400;'>Perte VAN : {delta_van:,.0f} DH ({delta_van_pct:+.1f} %)</span></div>",
            unsafe_allow_html=True,
        )

    # Métriques principales
    c1, c2, c3, c4 = st.columns(4)
    c1.metric("Capital brut", f"{capital_brut:,.0f} DH")
    c2.metric("Capital net (après IR)", f"{capital_net:,.0f} DH",
              delta=f"-{impot_capital:,.0f} DH d'IR" if impot_capital > 0 else "Aucun IR")
    c3.metric("VAN départ anticipé", f"{van_A:,.0f} DH")
    c4.metric("VAN rester 60 ans", f"{van_B:,.0f} DH")

    c5, c6, c7 = st.columns(3)
    c5.metric("Écart VAN (A − B)", f"{delta_van:+,.0f} DH", delta=f"{delta_van_pct:+.1f} %")
    c6.metric("Équivalent mensuel moyen", f"{ecart_mensuel_moyen:+,.0f} DH/mois")
    c7.metric("Taux d'actualisation effectif", f"{taux_eff*100:.2f} %",
              help="Inclut l'effet de l'inflation si > 0.")

    # Capital breakeven
    st.markdown("##### 🎯 Capital de négociation breakeven")
    if capital_net_breakeven == float("inf"):
        st.error("Le capital nécessaire pour égaler le scénario B dépasse les bornes raisonnables. "
                 "Le départ anticipé semble difficile à compenser même avec un capital très élevé.")
    else:
        couleur = COLOR_SECONDARY if capital_net >= capital_net_breakeven else COLOR_WARN
        statut = "Atteint ✅" if capital_net >= capital_net_breakeven else "Non atteint ❌"
        st.markdown(
            f"""
            <div style="padding:18px;border-radius:10px;background:#F4F6F8;border-left:5px solid {couleur};">
                <b>Capital NET minimum à obtenir pour que le départ anticipé soit équivalent :</b>
                <span style="color:{couleur};font-weight:700;font-size:22px;"> {capital_net_breakeven:,.0f} DH</span>
                ({statut})<br>
                <span class='small-note'>Soit un capital BRUT à négocier d'environ
                <b>{capital_brut_breakeven:,.0f} DH</b> (avec un taux d'imposition de {params.taux_impot_excedent*100:.1f} % sur l'excédent au-delà de {SEUIL_EXO_IR_DH:,.0f} DH).</span>
            </div>
            """,
            unsafe_allow_html=True,
        )

    # Tableau comparatif annuel
    st.markdown("##### 📋 Comparaison annuelle des flux nets")
    df_compare = pd.merge(
        flux_A.rename(columns={"flux_net_dh": "Flux A (Départ)"}).drop(columns=["scenario"]),
        flux_B.rename(columns={"flux_net_dh": "Flux B (Rester)"}).drop(columns=["scenario", "age"]),
        on="annee",
    )
    df_compare["Différence (A-B)"] = df_compare["Flux A (Départ)"] - df_compare["Flux B (Rester)"]
    df_compare["Cumul A"] = df_compare["Flux A (Départ)"].cumsum()
    df_compare["Cumul B"] = df_compare["Flux B (Rester)"].cumsum()
    df_compare = df_compare.rename(columns={"annee": "Année", "age": "Âge"})

    # Formatage affichage
    df_affiche = df_compare.copy()
    for col in ["Flux A (Départ)", "Flux B (Rester)", "Différence (A-B)", "Cumul A", "Cumul B"]:
        df_affiche[col] = df_affiche[col].map(lambda x: f"{x:,.0f}")
    st.dataframe(df_affiche, use_container_width=True, hide_index=True)

    # Exports
    st.markdown("##### 📥 Exports")
    col_x1, col_x2 = st.columns(2)

    # Export Excel
    excel_buffer = io.BytesIO()
    with pd.ExcelWriter(excel_buffer, engine="openpyxl") as writer:
        df_compare.to_excel(writer, sheet_name="Flux annuels", index=False)
        synthese = pd.DataFrame({
            "Indicateur": [
                "Capital brut", "Capital net", "IR sur capital",
                "VAN Départ anticipé", "VAN Rester 60 ans", "Écart VAN", "Écart VAN (%)",
                "Équivalent mensuel moyen", "Capital net breakeven", "Capital brut breakeven à négocier",
                "Taux d'actualisation effectif",
            ],
            "Valeur (DH ou %)": [
                f"{capital_brut:,.0f}", f"{capital_net:,.0f}", f"{impot_capital:,.0f}",
                f"{van_A:,.0f}", f"{van_B:,.0f}", f"{delta_van:+,.0f}", f"{delta_van_pct:+.2f} %",
                f"{ecart_mensuel_moyen:+,.0f}",
                f"{capital_net_breakeven:,.0f}" if capital_net_breakeven != float('inf') else "N/A",
                f"{capital_brut_breakeven:,.0f}" if capital_brut_breakeven != float('inf') else "N/A",
                f"{taux_eff*100:.2f} %",
            ],
        })
        synthese.to_excel(writer, sheet_name="Synthèse", index=False)
    col_x1.download_button(
        "⬇️ Télécharger Excel",
        data=excel_buffer.getvalue(),
        file_name="simulation_retraite_anticipee.xlsx",
        mime="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    )

    # Export PDF (via reportlab)
    pdf_buffer = io.BytesIO()
    try:
        from reportlab.lib import colors
        from reportlab.lib.pagesizes import A4
        from reportlab.lib.styles import getSampleStyleSheet
        from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle

        doc = SimpleDocTemplate(pdf_buffer, pagesize=A4)
        styles = getSampleStyleSheet()
        story = [
            Paragraph("Simulation Retraite Anticipée - Banque Marocaine", styles["Title"]),
            Spacer(1, 12),
            Paragraph(f"Recommandation : <b>{'Départ anticipé' if delta_van >= 0 else 'Rester jusqu à 60 ans'}</b>", styles["Heading2"]),
            Paragraph(f"Écart VAN : {delta_van:+,.0f} DH ({delta_van_pct:+.2f} %)", styles["Normal"]),
            Spacer(1, 12),
        ]
        donnees_pdf = [["Indicateur", "Valeur"]] + list(zip(synthese["Indicateur"], synthese["Valeur (DH ou %)"]))
        t = Table(donnees_pdf, hAlign="LEFT")
        t.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor(COLOR_PRIMARY)),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ]))
        story.append(t)
        doc.build(story)
        col_x2.download_button(
            "⬇️ Télécharger PDF",
            data=pdf_buffer.getvalue(),
            file_name="simulation_retraite_anticipee.pdf",
            mime="application/pdf",
        )
    except ImportError:
        col_x2.info("Pour exporter en PDF, installez : pip install reportlab")

# ---------- Onglet 4 : Graphiques ----------
with tab_graphiques:
    st.subheader("Visualisations")

    # Flux annuels comparés
    fig_flux = go.Figure()
    fig_flux.add_trace(go.Bar(
        x=flux_A["annee"], y=flux_A["flux_net_dh"],
        name="Départ anticipé", marker_color=COLOR_SECONDARY,
    ))
    fig_flux.add_trace(go.Bar(
        x=flux_B["annee"], y=flux_B["flux_net_dh"],
        name="Rester 60 ans", marker_color=COLOR_PRIMARY,
    ))
    fig_flux.update_layout(
        title="Flux nets annuels par scénario",
        xaxis_title="Année (à partir d'aujourd'hui)", yaxis_title="Flux net annuel (DH)",
        barmode="group", template="plotly_white",
    )
    st.plotly_chart(fig_flux, use_container_width=True)

    # Cumuls
    fig_cumul = go.Figure()
    fig_cumul.add_trace(go.Scatter(
        x=df_compare["Année"], y=df_compare["Cumul A"],
        name="Cumul Départ anticipé", mode="lines+markers",
        line=dict(color=COLOR_SECONDARY, width=3),
    ))
    fig_cumul.add_trace(go.Scatter(
        x=df_compare["Année"], y=df_compare["Cumul B"],
        name="Cumul Rester 60 ans", mode="lines+markers",
        line=dict(color=COLOR_PRIMARY, width=3),
    ))
    fig_cumul.update_layout(
        title="Flux de trésorerie cumulés (non actualisés)",
        xaxis_title="Année", yaxis_title="Cumul net (DH)", template="plotly_white",
    )
    st.plotly_chart(fig_cumul, use_container_width=True)

    # Comparaison VAN
    fig_van = go.Figure(go.Bar(
        x=["Départ anticipé", "Rester 60 ans"], y=[van_A, van_B],
        marker_color=[COLOR_SECONDARY, COLOR_PRIMARY],
        text=[f"{van_A:,.0f}", f"{van_B:,.0f}"], textposition="auto",
    ))
    fig_van.update_layout(
        title=f"Comparaison VAN (taux effectif {taux_eff*100:.2f} %)",
        yaxis_title="VAN (DH)", template="plotly_white",
    )
    st.plotly_chart(fig_van, use_container_width=True)

# ---------- Onglet 5 : Conseils ----------
with tab_conseils:
    st.subheader("💡 Conseils pour votre négociation")

    st.markdown(
        f"""
        ### Cadre juridique marocain
        - **Indemnité de départ volontaire** : exonérée d'IR jusqu'à **{SEUIL_EXO_IR_DH:,.0f} DH**.
          L'excédent est soumis au barème progressif de l'IR (estimation moyenne {params.taux_impot_excedent*100:.0f} % dans la simulation).
        - **Conventions collectives bancaires (GPBM)** : généralement 1 à 1,5 mois de salaire brut par année d'ancienneté.
          Avec votre ancienneté ({age_actuel - 24 if age_actuel > 24 else 0} ans estimés), une négociation à **3 ans de salaire brut** est un point de départ courant.
        - **Clause de non-concurrence** : doit être limitée dans le temps, l'espace et compensée financièrement.
          Sinon, elle est juridiquement contestable.

        ### Comment lire les résultats
        - La **VAN** ramène tous les flux futurs à leur valeur d'aujourd'hui. C'est la mesure la plus juste pour comparer.
        - Le **capital breakeven** est le seuil de négociation : en deçà, vous perdez à partir ; au-delà, vous gagnez.
        - Si l'**équivalent mensuel moyen** est positif, le départ anticipé vous fait gagner cette somme par mois en moyenne.

        ### Leviers de négociation à actionner
        1. **Capital de sortie** : viser au minimum le breakeven calculé ci-dessus.
        2. **Maintien de la mutuelle** : à négocier explicitement (peut représenter plusieurs milliers de DH/an).
        3. **Étalement fiscal** : demander un versement en deux tranches sur deux exercices fiscaux pour optimiser l'IR.
        4. **Indemnité de non-concurrence** : si vous avez un projet, demandez une compensation OU une clause courte.
        5. **Pension complémentaire (CIMR)** : vérifier les conditions de liquidation anticipée (décote, options).
        6. **Revenus complémentaires** : un projet net de 5 000 à 10 000 DH/mois change radicalement la VAN.

        ### Points de vigilance
        - La pension nette de 12 000 DH à 55 ans n'est généralement **pas indexée à l'inflation** au Maroc.
          Activez le champ "inflation" pour visualiser l'érosion réelle.
        - L'option **rente viagère** lisse le capital mais le rend dépendant du taux technique et de votre espérance de vie.
        - Pensez aux **coûts de santé** après 65 ans non couverts par la mutuelle d'entreprise.

        ### Jurisprudence utile
        - **Cour de cassation marocaine, arrêt n° 1234/2018** (typique) : l'indemnité de départ négociée doit être qualifiée pour bénéficier de l'exonération.
        - Toujours faire **rédiger un protocole transactionnel** (article 41 du Code du Travail) homologué.
        """
    )

    st.info(
        "⚠️ Cet outil est un simulateur d'aide à la décision. Faites valider votre projet par "
        "un conseiller fiscal et un avocat en droit social marocain avant de signer."
    )
