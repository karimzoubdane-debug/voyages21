import { put } from '@vercel/blob';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const corsHeaders = {
  'Cache-Control': 'no-store',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(request) {
  try {
    const url = new URL(request.url);
    const filename = url.searchParams.get('filename') || 'brochure.pdf';
    const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');

    const blob = await put(`voyages21/pdfs/${safeName}`, request.body, {
      access: 'public',
      contentType: 'application/pdf',
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
