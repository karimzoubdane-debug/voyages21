// API du MENU / NAVIGATION du site.
//   GET  /api/menu        → configuration complète du menu (publique, lue par le site)
//   PUT  /api/menu  { config }  → enregistre tout l'arbre (propriétaire uniquement)
//
// Même logique que /api/produits : stockage Vercel Blob, anti-cache, écriture protégée.

import { getRole } from '../../../lib/auth.js';
import { readMenuConfig, writeMenuConfig, DEFAULT_MENU } from '../../../lib/menuConfig.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const corsHeaders = {
  'Cache-Control': 'no-store',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

// GET → configuration du menu (avec repli sur le menu par défaut).
export async function GET() {
  try {
    const config = await readMenuConfig();
    return Response.json(config, { headers: corsHeaders });
  } catch {
    return Response.json(DEFAULT_MENU, { headers: corsHeaders });
  }
}

// PUT → enregistre tout l'arbre. Propriétaire (Karim) uniquement.
export async function PUT(request) {
  if ((await getRole(request)) !== 'owner') {
    return Response.json({ ok: false, error: 'non autorisé' }, { status: 401, headers: corsHeaders });
  }
  try {
    const body = await request.json();
    const config = body && body.config ? body.config : body;
    if (!config || !Array.isArray(config.items)) {
      return Response.json({ ok: false, error: 'config invalide (items requis)' }, { status: 400, headers: corsHeaders });
    }
    config.v = config.v || 1;
    await writeMenuConfig(config);
    return Response.json({ ok: true }, { headers: corsHeaders });
  } catch (e) {
    return Response.json(
      { ok: false, error: String((e && e.message) || e) },
      { status: 500, headers: corsHeaders },
    );
  }
}
