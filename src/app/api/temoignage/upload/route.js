import { handleUpload } from '@vercel/blob/client';
import { list, put } from '@vercel/blob';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Upload PUBLIC d'un témoignage client (photo ou vidéo) : déposé dans le Blob
// sous le préfixe « temoignages/ ». Le fichier va directement du navigateur au
// Blob (le endpoint ne délivre qu'un jeton signé). Aucune authentification :
// c'est le client qui partage volontairement son témoignage avec l'agence.

const ALLOWED = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
  'video/mp4',
  'video/webm',
  'video/quicktime',
]

const MANIFEST = 'temoignages-manifest.json'
const MAX = 200 * 1024 * 1024 // 200 Mo (vidéos courtes)

const corsHeaders = {
  'Cache-Control': 'no-store',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders })
}

async function appendManifest(entry) {
  let data = []
  try {
    const { blobs } = await list({ prefix: MANIFEST, limit: 1 })
    const hit = blobs.find((b) => b.pathname === MANIFEST)
    if (hit) {
      const res = await fetch(hit.url, { cache: 'no-store' })
      if (res.ok) {
        const json = await res.json()
        if (Array.isArray(json)) data = json
      }
    }
  } catch {
    /* premier témoignage : manifeste inexistant */
  }
  data.unshift(entry)
  await put(MANIFEST, JSON.stringify(data.slice(0, 1000)), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  })
}

export async function POST(request) {
  const body = await request.json()
  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => ({
        allowedContentTypes: ALLOWED,
        addRandomSuffix: true,
        maximumSizeInBytes: MAX,
        // On transmet les infos du formulaire (pays, date…) jusqu'au manifeste.
        tokenPayload: clientPayload || '{}',
      }),
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        let meta = {}
        try {
          meta = tokenPayload ? JSON.parse(tokenPayload) : {}
        } catch {
          meta = {}
        }
        await appendManifest({
          url: blob.url,
          pathname: blob.pathname,
          contentType: blob.contentType || '',
          ...meta,
        })
      },
    })
    return Response.json(json, { headers: corsHeaders })
  } catch (e) {
    return Response.json(
      { error: String((e && e.message) || e) },
      { status: 400, headers: corsHeaders },
    )
  }
}
