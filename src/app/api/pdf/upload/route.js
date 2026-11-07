import { put } from '@vercel/blob';
import { getRole } from '../../../../lib/auth.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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
  const role = await getRole(request);
  if (role !== 'owner' && role !== 'team') {
    return Response.json({ error: 'non autorisé' }, { status: 401, headers: corsHeaders });
  }
  try {
    const url = new URL(request.url);
    const filename = url.searchParams.get('filename') || 'brochure.pdf';
    const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');

    // Documents Word acceptés pour l'ajout rapide (Karim, 07/11/2026) : .docx, .doc, leurs
    // modèles, .docm et RTF. Rangés à part, avec leur vrai type, pour que la lecture
    // automatique les reconnaisse.
    const WORD_TYPES = {
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      docm: 'application/vnd.ms-word.document.macroEnabled.12',
      dotx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
      dotm: 'application/vnd.ms-word.template.macroEnabled.12',
      doc: 'application/msword',
      dot: 'application/msword',
      rtf: 'application/rtf',
    };
    const ext = (safeName.split('.').pop() || '').toLowerCase();
    const wordType = WORD_TYPES[ext];
    const blob = await put(`voyages21/${wordType ? 'docs' : 'pdfs'}/${safeName}`, request.body, {
      access: 'public',
      contentType: wordType || 'application/pdf',
      addRandomSuffix: true,
    });

    return Response.json({ url: blob.url }, { headers: corsHeaders });
  } catch (e) {
    return Response.json(
      { error: String((e && e.message) || e) },
      { status: 500, headers: corsHeaders },
    );
  }
}
