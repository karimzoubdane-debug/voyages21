/* Schéma des champs de saisie + dossier d'exemple (VOYAGES 21, réel) */
window.CREDIT_FIELDS = [
  { group: 'Bilan — Actif', rows: [
    { key: 'actifImmobilise', label: 'Actif immobilisé (Total I, net)' },
    { key: 'actifCirculant',  label: 'Actif circulant hors trésorerie (Total II)' },
    { key: 'tresoActif',      label: 'Trésorerie – Actif (Total III)' }
  ]},
  { group: 'Bilan — Passif', rows: [
    { key: 'capitauxPropres',      label: 'Capitaux propres' },
    { key: 'dettesFinancement',    label: 'Dettes de financement' },
    { key: 'financementPermanent', label: 'Financement permanent (Total I)', hint: 'vide = CP + dettes fin. + provisions' },
    { key: 'passifCirculant',      label: 'Passif circulant hors trésorerie (Total II)' },
    { key: 'tresoPassif',          label: 'Trésorerie – Passif (Total III)' },
    { key: 'totalBilan',           label: 'Total bilan', hint: 'vide = calcul auto' }
  ]},
  { group: 'Détail cycle (optionnel)', rows: [
    { key: 'clients',     label: 'Clients et comptes rattachés' },
    { key: 'fournisseurs',label: 'Fournisseurs et comptes rattachés' },
    { key: 'stocks',      label: 'Stocks' }
  ]},
  { group: 'CPC / ESG', rows: [
    { key: 'ca',                   label: "Chiffre d'affaires" },
    { key: 'va',                   label: 'Valeur ajoutée' },
    { key: 'ebe',                  label: 'EBE / EBITDA' },
    { key: 'resultatExploitation', label: "Résultat d'exploitation" },
    { key: 'dotationsExploitation',label: "Dotations d'exploitation" },
    { key: 'chargesPersonnel',     label: 'Charges de personnel' },
    { key: 'chargesFinancieres',   label: "Charges d'intérêts" },
    { key: 'resultatNet',          label: 'Résultat net' },
    { key: 'caf',                  label: 'CAF (capacité d\'autofinancement)' },
    { key: 'achats',               label: 'Achats consommés', hint: 'pour les délais fournisseurs' }
  ]},
  { group: 'Retraitements & service de la dette (optionnel)', rows: [
    { key: 'provisionsDurables',   label: 'Provisions durables', hint: 'risques & charges stables' },
    { key: 'immoIncorporelles',    label: 'Immobilisations incorporelles', hint: 'pour le gearing net d\'incorporels' },
    { key: 'creditBail',           label: 'Annuités de crédit-bail', hint: 'incluses dans le service de la dette' },
    { key: 'echeanceDLMT',         label: 'Échéance DLMT (annuité en capital)', hint: 'vide = estimée par la variation des dettes' },
    { key: 'creditBailHorsBilan',  label: 'Crédit-bail hors bilan (encours)', hint: 'réintégré en immobilisations + dettes financières' },
    { key: 'eene',                 label: 'Effets escomptés non échus (EENE)', hint: 'réintégrés en créances clients + concours court terme' }
  ]},
  { group: 'Compléments Note d\'analyse (optionnel)', rows: [
    { key: 'comptesCourantsAssocies', label: 'Comptes courants d\'associés (CCA)', hint: 'quasi-fonds propres → ER élargi & apports' },
    { key: 'achatsRevendus',          label: 'Achats revendus (négoce)', hint: 'pour la marge commerciale brute' },
    { key: 'immoBrutes',              label: 'Immobilisations brutes', hint: 'pour le % d\'amortissement de l\'actif' },
    { key: 'amortissementsCumules',   label: 'Amortissements cumulés', hint: 'pour le % d\'amortissement de l\'actif' }
  ]}
];

window.SAMPLE_V21 = {
  societe: 'VOYAGES 21',
  notes: '',
  exercices: [
    { annee: 2024, ca: 9994366.34, va: 737786.21, ebe: 316551.58, resultatExploitation: 277971.59,
      dotationsExploitation: 38579.99, resultatNet: 222695.49, caf: 261275.48, chargesFinancieres: 0,
      chargesPersonnel: 407992.63, achats: 9097735.78,
      actifImmobilise: 709343.09, actifCirculant: 2065739.84, tresoActif: 383394.29,
      capitauxPropres: 984586.67, dettesFinancement: 480146.74, financementPermanent: 1464733.41,
      passifCirculant: 1693743.81, tresoPassif: 0, totalBilan: 3158477.22,
      clients: 772916.64, fournisseurs: 165496.45, stocks: 0,
      immoBrutes: 1015955.80, amortissementsCumules: 506612.71, comptesCourantsAssocies: 63430.19 },
    { annee: 2025, ca: 11228163.76, va: 911689.21, ebe: 328812.60, resultatExploitation: 291420.56,
      dotationsExploitation: 37392.04, resultatNet: 228277.30, caf: 265669.34, chargesFinancieres: 0,
      chargesPersonnel: 566448.61, achats: 10107841.90,
      actifImmobilise: 691951.05, actifCirculant: 2116782.07, tresoActif: 125756.93,
      capitauxPropres: 1212863.97, dettesFinancement: 325226.64, financementPermanent: 1538090.61,
      passifCirculant: 1280393.51, tresoPassif: 116005.93, totalBilan: 2934490.05,
      clients: 454315.41, fournisseurs: 171969.00, stocks: 0,
      immoBrutes: 1015955.80, amortissementsCumules: 544004.75, comptesCourantsAssocies: 8096.23 }
  ]
};

// Cas réel (modèle d'analyse crédit d'une banque). Montants en DH (= KF × 1000).
// Société en redressement : fonds propres négatifs en 2016-2017 puis positifs en 2018.
window.SAMPLE_MAISONDUFIL = {
  societe: 'LA MAISON DU FIL',
  notes: "Cas issu d'un modèle d'analyse crédit bancaire (groupe Zenata). Affaire de négoce textile, fortement endettée (dettes Groupe & associés), en redressement : fonds propres négatifs en 2016 et 2017, repassés positifs en 2018. Montants convertis en DH (× 1000).",
  exercices: [
    { annee: 2016, ca: 9538400, va: -383200, ebe: -383200, resultatExploitation: -384200,
      dotationsExploitation: 1000, resultatNet: -834000, caf: -833000, chargesFinancieres: 134200,
      chargesPersonnel: 0, achats: 9835000,
      actifImmobilise: 3500, actifCirculant: 16590800, tresoActif: 29300,
      capitauxPropres: -937200, dettesFinancement: 15742900, provisionsDurables: 93100,
      passifCirculant: 1724800, tresoPassif: 0, totalBilan: 16623600,
      clients: 3215500, fournisseurs: 976100, stocks: 9421600,
      immoIncorporelles: 3500, creditBail: 0, echeanceDLMT: 0 },
    { annee: 2017, ca: 13694500, va: 710300, ebe: 710300, resultatExploitation: 709300,
      dotationsExploitation: 1000, resultatNet: 714000, caf: 715000, chargesFinancieres: 16600,
      chargesPersonnel: 0, achats: 12943300,
      actifImmobilise: 2500, actifCirculant: 8282500, tresoActif: 956800,
      capitauxPropres: -223200, dettesFinancement: 6861300, provisionsDurables: 0,
      passifCirculant: 2603700, tresoPassif: 0, totalBilan: 9241800,
      clients: 2698600, fournisseurs: 1852600, stocks: 3170000,
      immoIncorporelles: 2500, creditBail: 0, echeanceDLMT: 0 },
    { annee: 2018, ca: 15982000, va: 1185800, ebe: 1185800, resultatExploitation: 1184800,
      dotationsExploitation: 1000, resultatNet: 863900, caf: 864900, chargesFinancieres: 54000,
      chargesPersonnel: 0, achats: 14626200,
      actifImmobilise: 2000, actifCirculant: 8019000, tresoActif: 48000,
      capitauxPropres: 640700, dettesFinancement: 6861300, provisionsDurables: 0,
      passifCirculant: 567000, tresoPassif: 0, totalBilan: 8069000,
      clients: 3737000, fournisseurs: 515000, stocks: 1712000,
      immoIncorporelles: 2000, creditBail: 0, echeanceDLMT: 0 }
  ]
};
