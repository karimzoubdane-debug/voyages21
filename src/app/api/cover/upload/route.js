import { handleUpload } from '@vercel/blob/client';
import { getRole } from '../../../../lib/auth.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOWED = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'video/mp4',
  'video/webm',
  'audio/mpeg',
  'audio/mp3',
  'audio/mp4',
  'audio/aac',
  'audio/wav',
];

const corsHeaders = {
  'Cache-Control': 'no-store',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(request) {
  const body = await request.json();
  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        if ((await getRole(request)) !== 'owner') throw new Error('non autorisé');
        return {
          allowedContentTypes: ALLOWED,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({ area: 'voyages21-cover' }),
        };
      },
      onUploadCompleted: async () => {},
    });
    return Response.json(json, { headers: corsHeaders });
  } catch (error) {
    return Response.json(
      { ok: false, error: error.message || 'Upload failed' },
      { status: 400, headers: corsHeaders },
    );
  }
}
