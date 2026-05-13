# Système de monétisation

Application Next.js autonome qui permet de :

- Vendre l'accès à un chat Claude par email + mot de passe
- Limiter la consommation de tokens par utilisateur (forfait mensuel)
- Suivre les coûts en temps réel via un panel admin
- Révoquer / réactiver l'accès d'un client en 1 clic

Ce projet est **totalement indépendant** du site `voyages21` (même repo, dossier séparé, propre `package.json`, propre déploiement Vercel).

---

## Architecture

```
monetization/
├── src/
│   ├── lib/                      → mongodb.js, auth.js (bcrypt, tokens)
│   └── app/
│       ├── login/                → /login
│       ├── dashboard/            → /dashboard (chat Claude)
│       ├── profile/              → /profile (changer mot de passe)
│       ├── admin-panel/          → /admin-panel
│       ├── access/               → /access?token=... (lien magique)
│       └── api/
│           ├── login/            → POST email+password → accessToken
│           ├── change-password/  → POST change pwd
│           ├── verify-token/     → POST vérifier token
│           ├── chat/             → POST appel Anthropic + comptage tokens
│           └── admin/
│               ├── generate-link/  → POST créer/MAJ compte
│               ├── users/          → GET + DELETE (révoquer/réactiver)
│               └── usage/          → GET stats globales
```

## Couleurs et typographie

Inspirées de Claude.ai :

- Fond crème `#F5F4ED`, accent corail `#D97757`
- Titres en **Spectral** (serif), corps en **Inter** (sans-serif), chargés via Google Fonts

---

## Configuration (~10 min)

### 1. MongoDB Atlas (BDD gratuite)

1. Aller sur https://cloud.mongodb.com et créer un compte
2. Créer un cluster **M0 (Free)**
3. Dans **Database Access**, créer un utilisateur avec mot de passe
4. Dans **Network Access**, ajouter `0.0.0.0/0` (accès depuis Vercel)
5. Dans **Connect → Drivers**, récupérer l'URI au format :
   ```
   mongodb+srv://user:password@cluster.mongodb.net/monetization?retryWrites=true&w=majority
   ```

### 2. Variables d'environnement Vercel

Sur Vercel (Settings → Environment Variables), ajouter :

| Variable | Valeur |
|---|---|
| `MONGODB_URI` | URI MongoDB Atlas |
| `ADMIN_KEY` | Mot de passe admin long et secret (ex: `gK7-x9Pq-zM2-bR4-2026`) |
| `ANTHROPIC_API_KEY` | Clé Anthropic existante (`sk-ant-...`) |
| `NEXT_PUBLIC_BASE_URL` | URL publique du déploiement (ex: `https://monetization-xxx.vercel.app`) |
| `ANTHROPIC_MODEL` | (optionnel) `claude-sonnet-4-6` par défaut |

### 3. Déploiement Vercel

1. Créer un **nouveau projet** Vercel pointant sur ce repo
2. Dans **Build & Development Settings** :
   - **Root Directory** : `monetization`
   - Framework : Next.js (auto-détecté)
3. Ajouter les variables d'environnement ci-dessus
4. Deploy

Vercel construit uniquement le dossier `monetization/`, indépendamment de voyages21.

---

## Utilisation

### Côté administrateur

1. Aller sur `https://<ton-domaine>/admin-panel`
2. Entrer la `ADMIN_KEY`
3. **Créer un nouvel accès** :
   - Saisir email + prénom du client
   - Choisir un mot de passe (ou cliquer "Générer")
   - Définir la limite de tokens mensuels (ex: 100 000)
   - Optionnel : ajouter une note (ex: "Virement reçu 13/05")
4. **Copier les identifiants** affichés et les envoyer au client
5. **Révoquer un accès** : 1 clic sur le bouton "Révoquer" → le client est déconnecté à sa prochaine requête
6. **Réactiver** : 1 clic sur "Réactiver" si paiement reçu
7. **Stats globales** : tokens consommés, coût estimé, utilisateurs actifs

### Côté client

1. Reçoit email + mot de passe par message privé
2. Va sur `https://<ton-domaine>/login`
3. Se connecte → écran d'accueil "Bonjour {prénom}, sur quoi allons-nous travailler aujourd'hui ?"
4. Discute avec Claude
5. Peut changer son mot de passe via `/profile`
6. Quand limite atteinte : message "Limite mensuelle atteinte, contactez l'administrateur"

---

## Sécurité

- Mots de passe hashés avec **bcryptjs** (salage automatique)
- `accessToken` 64 caractères aléatoires (`crypto.randomBytes`)
- `ADMIN_KEY` vérifiée en temps constant (`crypto.timingSafeEqual`)
- Tokens jamais loggés ni retournés dans les listings users
- Index unique MongoDB sur `email` et `accessToken`
- Reset automatique de `tokensUsed` après 30 jours

---

## Modèle de données

Collection `users` (MongoDB) :

```js
{
  _id: ObjectId,
  email: "client@example.com",       // unique, normalisé en lowercase
  firstName: "Jean",
  passwordHash: "$2a$10$...",        // bcrypt
  accessToken: "abc123...64chars",   // unique
  paid: true,                        // false = accès suspendu
  paidDate: ISODate,
  tokensLimit: 100000,
  tokensUsed: 25000,
  resetDate: ISODate,                // +30 jours après paiement
  notes: "Virement reçu",
  createdAt: ISODate,
  updatedAt: ISODate,
  lastActivityAt: ISODate,
}
```

---

## Coûts estimés

Calcul de référence (panel admin) : **0,80 USD / 1M de tokens**. Ajuster `COST_PER_MILLION_TOKENS_USD` dans `src/app/api/admin/usage/route.js` si tu utilises un autre modèle.

| Forfait | Tokens | Coût Anthropic ~ |
|---|---|---|
| Bronze | 50 000 | $0,04 |
| Argent | 100 000 | $0,08 |
| Or | 500 000 | $0,40 |

(à multiplier selon le mix input/output réel — Sonnet 4.6 input ~$3/M, output ~$15/M)

---

## Développement local

```bash
cd monetization
cp .env.local.example .env.local
# éditer .env.local avec tes vraies clés
npm install
npm run dev
```

Ouvrir http://localhost:3000

---

## Tests de bout en bout

1. `/admin-panel` → entrer `ADMIN_KEY` → créer un compte test
2. `/login` → se connecter avec les identifiants → arrivée sur dashboard avec "Bonjour {prénom}"
3. Envoyer un message → vérifier que les tokens s'incrémentent
4. Dans `/admin-panel`, cliquer "Révoquer" → l'utilisateur est déconnecté à la requête suivante
5. Cliquer "Réactiver" → l'accès est rétabli
