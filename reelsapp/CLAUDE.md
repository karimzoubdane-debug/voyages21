@AGENTS.md

# REELSAPP — État du projet (PR #20 mergé)

## URLs
- **Production** : https://reelsapp-two.vercel.app
- **Repo** : karimzoubdane-debug/voyages21 (sous-dossier `reelsapp/`)
- **Branche prod** : main (auto-déployée sur Vercel)

## Stack
- Next.js 16.2.6 (App Router, Turbopack)
- Clerk v7 — auth (`src/proxy.ts` avec export nommé `proxy`, PAS `middleware.ts`)
- Prisma v7.8.0 + `@prisma/adapter-pg` — moteur WASM, adapter OBLIGATOIRE
- Supabase PostgreSQL — Transaction Pooler port 6543 (pas 5432)
- Inngest v4.5.0 — jobs async YouTube
- YouTube Data API v3

## Ce qui fonctionne (après PR #20)
- Homepage, auth Clerk, dashboard, création de projet
- DB connectée via pooler Supabase
- Inngest connecté à Vercel (clés auto-injectées)
- Build Vercel passe (prisma generate + next build)

## Points critiques à retenir

### Prisma v7
- Le moteur WASM require obligatoirement `@prisma/adapter-pg`
- `new PrismaPg(connectionString)` — passer la string directement, pas `{ connectionString }`
- `new PrismaClient({ adapter } as any)` — le cast `as any` est nécessaire

### Inngest v4 + Turbopack
- `createFunction` = 2 arguments seulement : `(config, handler)`
- `triggers` doit être un objet singulier : `{ event: "..." }` PAS un tableau `[{ event: "..." }]`
- Le tableau est transformé par Turbopack en 3ème argument → erreur runtime

### Next.js 16 — Route params
- Les `params` dans les route handlers sont une `Promise` :
  ```ts
  async function GET(req, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
  }
  ```

### DB — Ne pas mettre `prisma db push` dans le build command Vercel
- Les tables existent déjà (créées via Supabase SQL Editor)
- `vercel.json` buildCommand = `npx prisma generate && next build`

## Prochaine étape — "Générer clips"
Le job YouTube tourne (PENDING → DONE avec 3 vidéos). Il reste à implémenter :
1. Bouton "Générer clips" sur la page projet
2. Téléchargement vidéo via yt-dlp
3. Découpe FFmpeg en segments (startTime/endTime)
4. Reframe 9:16 pour Reels/Shorts/TikTok
5. Ajout sous-titres + CTA overlay
6. Export final par plateforme

## Env vars Vercel (projet reelsapp)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` + `CLERK_SECRET_KEY`
- `DATABASE_URL` = postgresql pooler port 6543
- `YOUTUBE_API_KEY`
- `INNGEST_EVENT_KEY` + `INNGEST_SIGNING_KEY` (auto via intégration Vercel)
- `BLOB_READ_WRITE_TOKEN` (Vercel Blob, pour stocker les clips)

### Récupération vidéo YouTube — anti-blocage (CRITIQUE)
YouTube bloque les IP datacenter de Vercel (HTTP 403) → c'est la cause n°1 des
clips qui passent `GENERATING → ERROR`. Deux leviers, optionnels et combinables,
lus par `src/lib/ytdl.ts` :
- `YOUTUBE_PROXY_URL` : proxy (idéalement **résidentiel**) au format
  `http://user:pass@host:port`. Fait sortir la requête d'une IP non-flaggée.
  C'est la solution la plus fiable.
- `YOUTUBE_COOKIES_JSON` : cookies d'un navigateur connecté à un compte Google.
  Accepte **deux formats** : un tableau JSON (style EditThisCookie) **ou** le
  contenu brut d'un export `cookies.txt` Netscape (extension « Get cookies.txt
  LOCALLY » → on colle le contenu du .txt tel quel).
- En plus : retry x3 avec backoff (1s/2s/4s) + user-agent navigateur déjà câblés.
Sans proxy ni cookies, l'échec sur Vercel reste probable.
