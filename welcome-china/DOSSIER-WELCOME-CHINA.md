# 🇨🇳 DOSSIER WELCOME CHINA — Conquérir le marché chinois (A → Z)

> **Projet Cockpit #42 — mot-clé de reprise : `WELCOME CHINA`** (aliases : CHINE, WECHAT, XIAOHONGSHU, DOUYIN, HELLO MOROCCO)
> Objectif : amener des voyageurs chinois au Maroc via Voyages21 (incoming), en s'appuyant sur
> le mini-site HelloMorroco, WeChat, Xiaohongshu (RED), Douyin et la publicité chinoise.
> Rédigé le 2026-07-08 · À mettre à jour après chaque avancée.

---

## 1. Vision & objectifs

| Horizon | Objectif mesurable |
|---|---|
| 3 mois | Mini-site 100 % chinois accessible depuis la Chine + WeChat Official Account vérifié + compte Xiaohongshu actif (30 posts) |
| 6 mois | 1 000 abonnés XHS · premières demandes de devis via WeChat · 1ʳᵉ campagne pub XHS testée |
| 12 mois | Flux régulier de leads B2C + 3 partenariats B2B avec agences outbound chinoises · paiement WeChat Pay cross-border opérationnel |

**Cible** : voyageurs chinois indépendants (FIT) 25-45 ans, urbains (Shanghai, Pékin, Canton, Chengdu),
déjà consommateurs de destinations « exotiques » (Turquie, Égypte, Iran) — le Maroc est une destination
émergente à fort capital image (Chefchaouen, Sahara, médinas = très photogénique pour XHS).
**Atout visa** : le Maroc est exempt de visa pour les ressortissants chinois depuis 2016 — argument n°1 à MARTELER.

---

## 2. État des lieux (2026-07-08)

### Ce qui existe
- **Mini-site HelloMorroco** (`/HelloMorroco` → brochure `/WelcomeChina/`, branche `codex/welcomechina-maroc-circuits`) :
  couverture vidéo, 5 circuits Maroc avec cartes (Imperial Cities, Imperial South, Discover Kingdom,
  Grand Discovery, Best Morocco), bouton WeChat flottant + popup QR, attributs vidéo compatibles
  navigateur WeChat (`x5-playsinline`), un embryon de texte chinois.
- **Compte WeChat personnel** de Karim + QR code intégré au site.

### Faiblesses bloquantes identifiées
1. 🔴 **`*.vercel.app` est bloqué en Chine continentale** (DNS pollué + SNI bloqué sur le port 443).
   Le mini-site est donc **invisible pour la cible** tant qu'il n'a pas de domaine personnalisé.
   ✅ Parade confirmée : lier un **domaine custom** (CNAME → `vercel-dns.com`) — les domaines customs
   sur Vercel restent généralement accessibles (lenteur possible, nœuds les plus proches : HK/Corée/Japon).
2. 🔴 **Fiches circuits en français** : `voyages/data.js` ne contient aucun caractère chinois.
   Le prospect chinois clique « 查看详情 » et tombe sur du français → abandon.
3. 🟡 Pas de meta/SEO chinois, pas de version 简体中文 complète, pas de présence sociale chinoise.

---

## 3. CHANTIER 0 — Fondations techniques (semaines 1-3) · coût ≈ prix d'un domaine

### 0.1 Domaine accessible depuis la Chine — PRIORITÉ ABSOLUE
- [ ] **Karim** : choisir et acheter un domaine dédié court, mémorisable, sans tiret. Suggestions :
  `hellomorocco.travel`, `morocco21.com`, `v21china.com` — ou un sous-domaine `cn.voyages21.com`
  (sous-domaine du domaine existant = gratuit et immédiat, très bon 1ᵉʳ choix).
- [ ] **Claude** : configurer le domaine dans Vercel + vérifier le rendu.
- [ ] **Karim** : tester l'accessibilité réelle depuis la Chine (outils de test type « website speed test China »
  17ce.com / boce.com, ou demander à un contact sur place via WeChat).
- Si la lenteur est rédhibitoire à terme : envisager un CDN avec nœuds HK (Cloudflare) — l'ICP
  (licence d'hébergement en Chine) n'est PAS nécessaire tant qu'on n'héberge pas en Chine continentale.

### 0.2 Localisation chinoise complète du mini-site
- [ ] **Claude** : traduire en chinois simplifié (简体中文) marketing — pas du mot-à-mot :
  les 5 fiches circuits (`data.js`), l'index, les CTA, le popup WeChat.
- [ ] **Claude** : meta tags chinois (title/description avec mots-clés 摩洛哥旅游 / 摩洛哥自由行 /
  摩洛哥定制游), Open Graph pour partage WeChat, favicon.
- [ ] **Claude** : ajouter les arguments de réassurance chinois : 🛂 免签 (sans visa),
  ⭐ agence locale depuis 2000, 🗣️ contact WeChat direct, paiement sécurisé.
- [ ] **Karim** : faire relire par un locuteur natif si possible (guide chinois partenaire, client fidèle).

### 0.3 Identité de marque chinoise
- [ ] Choisir le nom : garder **HelloMorocco (你好摩洛哥 Nǐhǎo Móluògē)** — littéral, chaleureux,
  facile à retenir — ou un nom plus court type 摩旅21. **Claude proposera 3 options finales avec vérification
  de disponibilité** (recherche XHS/WeChat + base des marques chinoises).
- [ ] 🟡 **Dépôt de marque en Chine (CNIPA)** : recommandé AVANT de devenir visible (la Chine est en
  « premier déposant » : n'importe qui peut déposer ton nom avant toi). Nécessaire de toute façon
  pour le compte entreprise Xiaohongshu. Coût ≈ 300-600 € via agent en ligne, délai ~9-12 mois,
  mais le récépissé de dépôt suffit souvent pour démarrer. → décision Karim.

---

## 4. CHANTIER 1 — WeChat (mois 1-2)

### 4.1 Court terme : compte personnel « pro-isé » (déjà en place — à optimiser)
- [ ] Photo de profil = logo Voyages21 ; nom : `Voyages21 · 摩洛哥地接 Karim` (地接 = réceptif local).
- [ ] Alimenter **Moments (朋友圈)** 2-3×/semaine : photos clients, désert, riads — c'est ta vitrine
  quand un prospect t'ajoute.
- [ ] Créer les **réponses types en chinois** (Claude les rédige) : présentation agence, sans-visa,
  fourchettes de prix, process de réservation, acompte.
- ⚠️ Limite : un compte perso ne peut pas faire de pub, pas de menu, pas de paiement marchand, et
  Tencent peut le restreindre s'il détecte un usage commercial intensif. → étape 4.2 indispensable.

### 4.2 WeChat Official Account (公众号) — le pas-à-pas exact
**Type imposé : Service Account** (les entités étrangères ne peuvent PAS ouvrir de Subscription Account).
C'est tant mieux : le Service Account apparaît dans la liste de conversations + API avancées.

1. [ ] **Karim** : aller sur `mp.weixin.qq.com` → langue EN (coin haut-droit) → « Register Now » →
   type **Service Account** → région : Morocco.
2. [ ] Email dédié jamais utilisé sur WeChat (créer p.ex. `wechat@voyages21.com`) + code de vérification.
3. [ ] **Documents à préparer** (Claude aide à tout rédiger) :
   - Registre de commerce marocain de l'agence (+ traduction EN certifiée si demandé) ;
   - Passeport du représentant légal (scan page identité) ;
   - **Lettre de vérification WeChat** signée/cachetée (modèle fourni par Tencent — Claude la pré-remplit) ;
   - Facture téléphone (mobile du contact ou fixe société) avec cachet société, ≥ 3 mois d'historique.
4. [ ] Payer les **frais de vérification : 99 USD/an** (CB internationale acceptée).
5. [ ] Délai d'approbation : **5-10 jours ouvrés à 2-4 semaines**. Tencent peut appeler/écrire pour vérifier.
6. [ ] **Claude** ensuite : configurer le menu du compte (3 onglets : 线路 Circuits / 咨询报价 Devis /
   关于我们 À propos), messages de bienvenue automatiques, et rédiger les 5 premiers articles.

### 4.3 WeChat « SEO » (搜一搜 Sou-Yi-Sou)
Les utilisateurs cherchent DANS WeChat. Les articles du compte officiel remontent dans cette recherche.
- Mots-clés cibles (Claude affine la liste) : 摩洛哥旅游 (voyage Maroc), 摩洛哥自由行 (Maroc en solo),
  摩洛哥旅行社 (agence Maroc), 摩洛哥地接 (réceptif Maroc), 卡萨布兰卡 / 马拉喀什 / 舍夫沙万 (Chefchaouen),
  撒哈拉沙漠团 (circuit Sahara), 摩洛哥免签 (Maroc sans visa).
- Cadence : 2 articles/mois minimum (le Service Account est limité à 4 envois push/mois — on les garde
  pour les offres ; les articles « SEO » peuvent être publiés sans push).

### 4.4 WeChat Pay cross-border (mois 3+, quand les leads arrivent)
- Programme marchand international : couvre **78 pays / 36 devises** — le client paie en RMB,
  **règlement en USD/EUR sur ton compte bancaire au Maroc** (pas d'entité chinoise requise).
- Passage obligé par un **agrégateur/acquéreur agréé** (intégration directe Tencent = entités chinoises
  seulement). Candidats à comparer le moment venu : **Citcon** (Alipay+WeChat Pay+UnionPay, 1 API),
  **Silkpay**, et demander à la banque de Karim si elle a un partenariat (CMI côté Maroc pour UnionPay).
- **Critère n°1 : le PSP doit régler sur ton compte bancaire MAROCAIN** (voir chantier 6 / Office des Changes).

---

## 5. CHANTIER 2 — Xiaohongshu 小红书 / RED (mois 1-4) ⭐ LA priorité contenu

XHS est le moteur de recherche voyage de facto des urbains 20-40 ans — exactement la cible Maroc.
Stratégie en 2 temps : **compte personnel d'abord (gratuit, immédiat), compte entreprise ensuite**.

### 5.1 Compte personnel (semaine 1 — aucun prérequis)
- [ ] **Karim** : télécharger l'app 小红书, s'inscrire avec le numéro marocain (+212 accepté).
- [ ] Profil : nom type `摩洛哥Karim` ou `你好摩洛哥` + bio « 摩洛哥本地旅行社创始人，2000年至今 »
  (fondateur d'agence locale au Maroc depuis 2000) — l'angle « local expert étranger » marche TRÈS fort sur XHS.
- [ ] Cadence : **3 posts/semaine**. Format gagnant : carrousel 4-9 photos + texte 200-500 caractères +
  5-8 hashtags. **Claude fournit chaque post clé en main** (texte chinois + hashtags + brief photo).
- Thèmes qui performent : guides pratiques (« 摩洛哥7天路线 » itinéraire 7 jours), listes
  (« 摩洛哥必去的5个城市 »), coulisses du métier, Chefchaouen/Sahara photogéniques, budget & sans-visa.
- ⚠️ Règles XHS : pas de lien externe ni de WeChat affiché en clair dans les posts (risque de bannissement) —
  le contact se donne en message privé, ou via le compte entreprise.

### 5.2 Compte entreprise (企业号) — quand le perso a fait ses preuves (~1 000 abonnés)
- Prérequis : registre de commerce (traduction certifiée EN ou ZH) + passeport du représentant +
  **preuve de marque déposée en Chine** (d'où le dépôt CNIPA du chantier 0.3) + un numéro joignable.
- Frais de vérification : **≈ 300 USD/an** (non remboursables si refus — donc dossier béton d'abord).
- Délai : 5-10 jours ouvrés. Débloque : lien externe, boutons de contact, statistiques, et l'accès à la pub.
- Nom du compte : doit être unique et ne pas empiéter sur une marque chinoise existante.

### 5.3 Le « SEO Xiaohongshu »
- Placer le mot-clé dans le TITRE du post (les 20 premiers caractères comptent le plus).
- Répondre à TOUS les commentaires (l'algorithme récompense l'engagement) — Claude peut préparer
  des réponses types chinoises.
- Viser les recherches « longue traîne » : 摩洛哥安全吗 (le Maroc est-il sûr ?), 摩洛哥几月去最好
  (quel mois partir ?), 摩洛哥旅游多少钱 (quel budget ?).

---

## 6. CHANTIER 3 — Douyin 抖音 (mois 4+, optionnel au départ)

- ⚠️ L'inscription exige en pratique un **numéro de mobile chinois** → c'est le réseau le PLUS difficile
  pour un étranger sans partenaire.
- Options par ordre de préférence :
  1. **Différer** et concentrer l'effort sur XHS (recommandation Claude) ;
  2. **Partenaire local** (guide chinois, étudiant, client ambassadeur) qui publie pour Voyages21 ;
  3. **Agence spécialisée** qui ouvre et gère un compte entreprise étranger (coût élevé, ~2-4 k€ setup).
- Le contenu vidéo produit pour Reels/TikTok (projet VIDEO du Cockpit) est **recyclable** sur Douyin
  avec sous-titres chinois — Claude peut préparer les scripts et les sous-titres.

---

## 7. CHANTIER 4 — Publicité (mois 3-6) · budget test 300-500 €/mois

| Régie | Ticket d'entrée | Verdict pour Voyages21 |
|---|---|---|
| **XHS Ads (聚光 Juguang)** | Le plus bas ; nécessite compte entreprise | ✅ Commencer ici : intention voyage forte |
| **WeChat Ads (Moments/banner)** | ~5 000 CNY (~650 €) min./campagne, via agence | 2ᵉ temps, retargeting des abonnés |
| **Douyin (巨量引擎 Ocean Engine)** | Élevé + compte requis | Plus tard, si Douyin activé |
| **Baidu SEA** | Moyen, mais exige souvent licence/ICP | Non prioritaire |

- Les annonceurs étrangers passent par un **revendeur agréé** (certifié Tencent/XHS). Claude fera la
  présélection comparative (frais de gestion, minimum mensuel) au moment du lancement.
- Ciblage recommandé pour le 1ᵉʳ test XHS : femmes 24-40, villes tier 1-2, intérêts « voyage à l'étranger /
  Afrique du Nord / Turquie / Égypte » (les voyageurs Turquie-Égypte sont les plus convertibles vers le Maroc).

---

## 8. CHANTIER 5 — « SEO chinois » (fil rouge permanent)

Hiérarchie réaliste des efforts pour une PME étrangère :
1. **SEO in-app XHS** (chantier 5.3) — le meilleur ROI, aucun prérequis ;
2. **WeChat 搜一搜** (chantier 4.3) — via les articles du compte officiel ;
3. **Baidu SEO on-page** : meta chinois, sitemap, vitesse — MAIS sans hébergement en Chine + ICP,
  le ranking Baidu restera modeste. On fait le minimum propre (Claude s'en charge dans le chantier 0.2)
  sans y investir davantage ;
4. **Fiches plateformes voyage** : Mafengwo 马蜂窝, Qyer 穷游 (carnets de voyage sponsorisés/organiques),
  Dianping — mois 6+.

---

## 9. CHANTIER 6 — Paiements & conformité marocaine (validé par recherche IGOC)

### Ce qui est CONFIRMÉ
- **Aucune entité chinoise requise** ni pour publier ni pour encaisser.
- Le tourisme réceptif = **exportation de services** → régime standard Office des Changes :
  1. Encaissement en devises cotées (USD/EUR) par virement via banque marocaine (intermédiaire agréé) ;
  2. **Rapatriement sous 60 jours** après la prestation — automatique si le PSP règle au Maroc ;
  3. Droit à un **compte en devises au Maroc crédité jusqu'à 70 %** des recettes rapatriées
     (utile pour payer la pub chinoise et les prestataires sans reconversion).
- ⚠️ **Piège unique à éviter** : un règlement PSP conservé sur un compte À L'ÉTRANGER (HK, UE) —
  détenir un compte hors Maroc exige une autorisation de l'Office des Changes.

### Checklist paiements
- [ ] **Karim** : rendez-vous avec la banque → confirmer le circuit « règlement WeChat Pay cross-border
  en USD/EUR sur compte Voyages21 » + ouvrir le compte en devises export si pas déjà fait.
- [ ] **Karim** : demander à CMI/banque si l'acceptation **UnionPay** (TPE) est disponible → paiement du
  solde à l'arrivée des clients.
- [ ] **Claude** : comparatif agrégateurs (Citcon, Silkpay, autres acceptant le Maroc) le moment venu.
- En attendant : **acompte par virement SWIFT** (B2B et B2C) — opérationnel dès aujourd'hui.

---

## 10. Budget récapitulatif année 1 (hors temps de travail)

| Poste | Coût estimé |
|---|---|
| Domaine custom (ou sous-domaine cn.voyages21.com) | 0-40 €/an |
| Vérification WeChat Official Account | 99 USD/an |
| Dépôt de marque Chine (CNIPA, recommandé) | 300-600 € une fois |
| Vérification compte entreprise XHS | ≈ 300 USD/an |
| Budget pub test (mois 3-6) | 300-500 €/mois |
| Agence/revendeur pub (frais de gestion) | souvent inclus/10-15 % du budget |
| **Total an 1 (sans Douyin, pub 4 mois)** | **≈ 2 500 - 3 500 €** |

---

## 11. Calendrier de travail (sessions Claude + actions Karim)

| Mois | Jalons |
|---|---|
| **M1** | Domaine custom ✚ localisation chinoise complète du mini-site ✚ compte XHS perso lancé ✚ dossier WeChat OA déposé |
| **M2** | WeChat OA approuvé → menu + 5 articles ✚ 12 posts XHS publiés ✚ décision dépôt de marque |
| **M3** | Réponses types + tunnel devis WeChat rodé ✚ RDV banque paiements ✚ 1ᵉʳˢ leads organiques |
| **M4** | Compte entreprise XHS (si ~1 000 abonnés) ✚ préparation campagne pub |
| **M5-6** | 1ʳᵉ campagne XHS Ads ✚ comparatif agrégateurs WeChat Pay ✚ bilan/ajustement |
| **M6-12** | Scale : Mafengwo/Qyer, B2B agences outbound, Douyin via partenaire, WeChat Pay live |

---

## 12. Qui fait quoi

| Claude (dans nos sessions) | Karim (seul lui peut le faire) |
|---|---|
| Traductions & rédaction chinoise (site, posts, articles, réponses types) | Créer les comptes (identité réelle, vérifications) |
| Code : localisation, meta, domaine Vercel, QR, tracking | Acheter le domaine, payer les frais de vérification |
| Stratégie, mots-clés, calendrier éditorial, briefs photo/vidéo | Photos/vidéos terrain, relation clients WeChat |
| Comparatifs (PSP, revendeurs pub) par recherche web | RDV banque, signature contrats PSP/agences |
| Mise à jour du Cockpit + de ce dossier à chaque avancée | Les « go » de décision |

---

## 13. Risques & parades

| Risque | Parade |
|---|---|
| Site inaccessible en Chine | Domaine custom (chantier 0.1) + test réel avant tout investissement pub |
| Nom de marque squatté en Chine | Dépôt CNIPA tôt (chantier 0.3) |
| Compte WeChat perso restreint pour usage commercial | Basculer vite sur l'Official Account |
| Post XHS banni (lien/WeChat en clair) | Respect strict des règles, contact en MP |
| Réglementations qui bougent | Vérification web par Claude avant chaque étape engageante |
| Délai de réponse aux prospects (fuseau +7h Chine/Maroc) | Réponses automatiques chinoises + réponses types |

---

## 14. 🚀 ÉTAPE 1 — la prochaine session de travail (au « go » de Karim)

1. **Décision Karim** : domaine → `cn.voyages21.com` (gratuit, immédiat) ou achat d'un domaine dédié ?
2. **Claude** : localisation chinoise complète du mini-site (fiches circuits, index, meta) sur la branche
   `claude/wechat-functionality-tx4l5e` → PR avec preview.
3. **Karim** en parallèle : créer `wechat@voyages21.com` (ou équivalent) + rassembler registre de commerce,
   passeport, facture téléphone → on dépose le dossier WeChat OA ensemble, écran par écran.
4. **Karim** : installer 小红书 et créer le compte perso — Claude fournit bio + 3 premiers posts le jour même.

---

## 15. Sources principales
- WeChat OA étranger : wechatwiki.com, qpsoftware.net, octoplusmedia.com (Service Account only, 99 USD/an, docs, délais)
- Xiaohongshu entreprise étrangère : dragontrail.com, hashmeta.com, octoplusmedia.com (≈300 USD, marque Chine requise)
- WeChat Pay cross-border : act.weixin.qq.com (officiel Tencent), citcon.com, silkpay.eu (78 pays/36 devises, règlement à l'étranger)
- Vercel en Chine : vercel.com/kb (guide officiel), github.com/vercel/community #803 (blocage *.vercel.app, parade domaine custom)
- Office des Changes : oc.gov.ma (rapatriement services, 60 jours, compte devises 70 %), IGOC 2024
