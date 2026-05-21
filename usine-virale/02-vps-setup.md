# Installation n8n sur VPS — Pas à pas

Guide rédigé pour **un non-développeur**. Chaque étape explique le quoi et le pourquoi.

## 1. Choisir et louer un VPS

### VPS recommandés (mai 2026)

| Fournisseur | Offre | Prix | Pourquoi |
|---|---|---|---|
| **Hostinger** | VPS 2 | ~7 €/mois | Interface simple, panneau pré-installé Docker, support FR |
| **OVH** | VPS Value (2 vCore, 4 Go RAM) | ~6 €/mois | Datacenter en France (RGPD propre), bonne réputation |
| **Contabo** | VPS S | ~5 €/mois | Le moins cher, RAM/CPU généreux, mais support plus rugueux |

**Spec minimum** : 2 vCPU, 4 Go RAM, 80 Go SSD. Pour traiter de la vidéo 4K en local, viser **8 Go RAM** si budget le permet.

**OS à choisir** : **Ubuntu 22.04 LTS** (le plus compatible avec les tutos Docker).

### Action

Crée ton compte chez l'un des trois, loue le VPS, note bien :
- L'**adresse IP** du serveur
- Le mot de passe **root** (ou ta clé SSH)

## 2. Se connecter au serveur

Sur ton ordinateur :

```bash
ssh root@TON_IP_VPS
```

(remplace `TON_IP_VPS` par l'IP reçue par le fournisseur)

Tu vas être prompté pour le mot de passe. Si tu n'as jamais fait de SSH, sur Windows utilise **MobaXterm** ou **Windows Terminal** ; sur Mac/Linux, le Terminal natif suffit.

## 3. Installer Docker

Docker permet de faire tourner n8n dans un "conteneur" isolé, plus simple à gérer.

```bash
apt update && apt upgrade -y
curl -fsSL https://get.docker.com | sh
apt install -y docker-compose-plugin
```

Vérification :

```bash
docker --version
docker compose version
```

Tu dois voir les versions s'afficher.

## 4. Récupérer le docker-compose de l'Usine

Sur le VPS, crée un dossier de travail :

```bash
mkdir -p /opt/usine-virale && cd /opt/usine-virale
```

Copie le fichier [`docker/docker-compose.yml`](./docker/docker-compose.yml) du repo dans ce dossier. Trois façons :

**Option A — git clone le repo** (plus propre) :
```bash
apt install -y git
git clone https://github.com/karimzoubdane-debug/voyages21.git
cp voyages21/usine-virale/docker/docker-compose.yml .
cp voyages21/usine-virale/.env.example .env
```

**Option B — wget direct** :
```bash
wget https://raw.githubusercontent.com/karimzoubdane-debug/voyages21/claude/automate-content-publishing-umPJI/usine-virale/docker/docker-compose.yml
wget https://raw.githubusercontent.com/karimzoubdane-debug/voyages21/claude/automate-content-publishing-umPJI/usine-virale/.env.example -O .env
```

## 5. Configurer les variables d'environnement

Édite le fichier `.env` créé à l'étape précédente :

```bash
nano .env
```

Remplis les valeurs **obligatoires pour démarrer** (les autres viendront au fur et à mesure) :

| Variable | Quoi mettre |
|---|---|
| `N8N_HOST` | Le sous-domaine que tu veux (ex: `n8n.voyages21.com`) ou l'IP du VPS |
| `N8N_BASIC_AUTH_USER` | Un identifiant que tu choisis |
| `N8N_BASIC_AUTH_PASSWORD` | Un mot de passe fort |
| `POSTGRES_PASSWORD` | Un mot de passe fort pour la base interne |

Sauvegarde (`Ctrl+O`, `Enter`, `Ctrl+X`).

## 6. Lancer n8n

```bash
docker compose up -d
```

Attendre ~30 secondes que tout démarre. Vérifier :

```bash
docker compose ps
```

Tu dois voir 2 services `running` : `n8n` et `postgres`.

## 7. Accéder à l'interface

Ouvre dans ton navigateur : `http://TON_IP_VPS:5678`

Tu seras prompté pour le `N8N_BASIC_AUTH_USER` / `PASSWORD` choisis à l'étape 5.

Puis n8n te demandera de créer le **compte propriétaire** (email + mot de passe) — c'est différent du basic auth, c'est le compte admin n8n.

## 8. Sécurisation (à faire dans les 24h)

⚠️ **Ne pas laisser le VPS exposé en HTTP brut longtemps**. Deux options :

- **Simple** : passer derrière Cloudflare Tunnel (gratuit, sans HTTPS à configurer)
- **Pro** : installer Caddy + Let's Encrypt pour avoir un vrai HTTPS sur `n8n.tondomaine.com`

Je documenterai cette étape dans `02b-securisation-https.md` quand on y arrivera (pas bloquant pour les premiers tests).

## En cas de problème

```bash
docker compose logs n8n     # voir les logs n8n
docker compose logs postgres # voir les logs base de données
docker compose restart       # redémarrer si bloqué
```

---

**Prochaine étape** : `03-airtable-schema.md` pour préparer la base Airtable avant de configurer le premier workflow n8n.
