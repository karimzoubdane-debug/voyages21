# Analyseur Crédit — étude de faisabilité (vue banque)

Application web **autonome** (HTML/CSS/JS, sans backend, sans dépendance) qui, à partir des
**bilans d'une société** (plusieurs exercices) :

- calcule une **batterie de ratios** (structure, liquidité, équilibre, capacité de remboursement,
  rentabilité, rotation) et les **interprète** ;
- produit une **synthèse** : santé financière, **points forts**, **points à surveiller**, score de solidité ;
- rend un **verdict par ligne de crédit** — **CMT/CLT**, **facilité de caisse**, **leasing**, **affacturage** —
  *favorable / sous réserves / défavorable*, avec le **pourquoi** et le **montant maximum** (selon durée/taux) ;
- propose un **simulateur** CMT/CLT (montant, durée, différé, taux) ;
- calcule la **capacité d'endettement par la méthode banque** : cash disponible pour le service de la
  dette (CDSD = EBE − investissement − Δ BFR − IS − dividendes) **actualisé** sur la durée ;
- applique les **retraitements hors-bilan** (méthode banque) : **crédit-bail** (encours réintégré en
  immobilisations + dettes) et **EENE** (effets escomptés non échus réintégrés en clients + concours CT) ;
- permet d'**importer des documents** et d'écrire des **notes** pour l'étude ;
- intègre un **assistant** (champ de **discussion présent dans chaque onglet**, historisé) qui répond aux questions d'éligibilité.

Ratios « vue banque » inclus (inspirés d'un modèle d'analyse crédit bancaire) : **DSCR** (EBE / service de
la dette), **net gearing** & **leverage** (nets d'incorporels), **ROA**, **rotation de l'actif**, **rotation
des stocks**, en plus des ratios de structure / liquidité / rentabilité. Deux dossiers d'exemple fournis :
**Voyages 21** et **La Maison du Fil** (cas réel issu d'un modèle bancaire).

> Hypothèse de travail : **les garanties sont supposées déjà prises** — l'étude porte uniquement sur la
> **capacité financière** de la société à honorer les crédits.

## Confidentialité
Les données restent **dans le navigateur** (session privée). Aucune information n'est envoyée à un serveur.

## Lien immédiat (preview du site)
L'app est servie par le déploiement existant du site, à l'URL :
`https://<preview-du-site>.vercel.app/credit-analyzer/index.html`
(pratique pour tester tout de suite, le temps de monter le projet dédié).

## Aperçu en local
Ouvrir `index.html` dans un navigateur, ou servir le dossier :
```bash
cd public/credit-analyzer && python3 -m http.server 8080
# puis http://localhost:8080
```

## Déploiement — projet Vercel dédié
Site **100 % statique** : aucun build, aucune variable d'environnement.

1. Vercel → **Add New… › Project** → importer le dépôt `karimzoubdane-debug/voyages21`.
2. **Root Directory** = `public/credit-analyzer`.
3. **Framework Preset** = *Other* (build command : vide ; output : `.`).
4. **Deploy**.

> Le code est sur la branche `claude/exciting-albattani-erio2s`. Pour déployer cette branche
> immédiatement : dans le projet Vercel, **Settings › Git › Production Branch** = cette branche
> (ou fusionner la PR sur `main` au préalable).

Ensuite, brancher le **domaine dédié** dans **Settings › Domains**.

## Activer l'assistant IA (plus tard)
La v1 est **déterministe** (moteur de règles). Pour le chat conversationnel complet, ajouter une route
serveur (`/api/chat`) appelant l'API Anthropic avec la clé `ANTHROPIC_API_KEY` côté hébergeur, puis
brancher `sendChat()` sur cette route. La structure du code est prête pour cet ajout.

## Structure
```
public/credit-analyzer/
  index.html            interface (onglets)
  assets/styles.css     design (charte V21)
  assets/engine.js      moteur financier (ratios + éligibilité) — testé
  assets/samples.js     schéma des champs + dossier d'exemple (VOYAGES 21)
  assets/app.js         rendu, simulateur, assistant, import PDF, export
  vercel.json           config statique
```

## Méthode
Bilan marocain **CGNC** (modèle normal) + **CPC / ESG / CAF**. Contrôle d'or vérifié : `TN = FDR − BFR`.
Seuils par défaut = pratique bancaire courante (paramétrables dans l'onglet *Dossier*).
Outil d'aide à la décision — **non engageant**.
