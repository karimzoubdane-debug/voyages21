import { handleUpload } from '@vercel/blob/client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Upload direct navigateur -> Vercel Blob (contourne la limite de taille des
// fonctions serverless, indispensable pour les vidéos). Ce endpoint ne fait que
// délivrer un jeton signé ; le fichier ne transite jamais par la fonction.
const ALLOWED = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
  'video/mp4',
  'video/webm',
  'video/quicktime',
];

export async function POST(request) {
  const body = await request.json();
  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ALLOWED,
        addRandomSuffix: true,
      }),
      onUploadCompleted: async () => {},
    });
    return Response.json(json);
  } catch (e) {
    return Response.json(
      { error: String((e && e.message) || e) },
      { status: 400 },
    );
  }
}
