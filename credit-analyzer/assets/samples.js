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
      clients: 772916.64, fournisseurs: 165496.45, stocks: 0 },
    { annee: 2025, ca: 11228163.76, va: 911689.21, ebe: 328812.60, resultatExploitation: 291420.56,
      dotationsExploitation: 37392.04, resultatNet: 228277.30, caf: 265669.34, chargesFinancieres: 0,
      chargesPersonnel: 566448.61, achats: 10107841.90,
      actifImmobilise: 691951.05, actifCirculant: 2116782.07, tresoActif: 125756.93,
      capitauxPropres: 1212863.97, dettesFinancement: 325226.64, financementPermanent: 1538090.61,
      passifCirculant: 1280393.51, tresoPassif: 116005.93, totalBilan: 2934490.05,
      clients: 454315.41, fournisseurs: 171969.00, stocks: 0 }
  ]
};
