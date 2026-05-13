# Simulateur de Retraite Anticipée - Banque Marocaine

Application Streamlit qui compare deux scénarios pour un cadre du secteur bancaire marocain (GPBM) :

- **Scénario A** : départ anticipé (capital de sortie + pension anticipée + revenus complémentaires éventuels)
- **Scénario B** : rester jusqu'à 60 ans (salaire net croissant puis pension normale)

## Fonctionnalités

- Saisie complète des données personnelles (âge variable, salaire, pensions, etc.)
- Variables ajustables : capital, fiscalité, taux d'actualisation, inflation (optionnelle), horizon
- Option **rente viagère** pour convertir le capital en versements annuels
- Clause de **non-concurrence** avec durée et indemnité
- Calculs : capital brut → net (exo 1 000 000 DH + IR sur excédent), VAN, breakeven
- Recommandation automatique (rouge/vert)
- Tableau annuel comparatif, graphiques Plotly
- Export **Excel** et **PDF**

## Installation et lancement

```bash
cd retraite_anticipee
pip install -r requirements.txt
streamlit run app.py
```

L'application s'ouvre automatiquement sur `http://localhost:8501`.

## Structure des onglets

1. **Mes données** : profil personnel et professionnel
2. **Variables à tester** : paramètres du capital, hypothèses économiques, options
3. **Résultats** : recommandation, métriques clés, capital breakeven, tableau annuel, exports
4. **Graphiques** : flux annuels, cumuls, comparaison VAN
5. **Conseils** : cadre juridique marocain, leviers de négociation, jurisprudence

## Hypothèses fiscales

- Seuil d'exonération d'IR sur indemnité de départ volontaire : **1 000 000 DH**
- Excédent imposé au barème progressif (estimation moyenne 32 %, ajustable)
- Pensions et revenus complémentaires saisis en **net**

## Avertissement

Cet outil est une aide à la décision. Validez votre projet auprès d'un conseiller
fiscal et d'un avocat en droit social marocain avant de signer.
