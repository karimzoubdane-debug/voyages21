// POST /api/credit/research — recherche web (sources publiques) + synthèse.
// Corps : { query:string }
import { NextResponse } from 'next/server';
import { getClient, runMessages, textFrom, WEB_SEARCH } from '../_lib.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 120;

const SYSTEM =
  "Tu es analyste crédit / finance. Tu fais une recherche sur des sources PUBLIQUES fiables et tu " +
  "produis une synthèse claire et sourcée (cite les sources et leur date). Concentre-toi sur les " +
  "informations économiques, comptables, financières et sectorielles pertinentes pour une décision " +
  "de crédit. Distingue les faits des hypothèses. En français. Si l'information est incertaine ou " +
  "introuvable en accès libre, dis-le.";

export async function POST(request) {
  const client = getClient();
  if (!client) {
    return NextResponse.json(
      { ok: false, error: "IA non configurée : ajoute ANTHROPIC_API_KEY dans les variables d'environnement Vercel." },
      { status: 503 }
    );
  }
  let body = {};
  try { body = await request.json(); } catch (e) {}
  const query = (body.query || '').toString().slice(0, 2000);
  if (!query.trim()) return NextResponse.json({ ok: false, error: 'Question vide.' }, { status: 400 });
  try {
    const msg = await runMessages(client, {
      system: SYSTEM,
      tools: [WEB_SEARCH],
      max_tokens: 8000,
      messages: [{ role: 'user', content: query }],
    });
    return NextResponse.json({ ok: true, text: textFrom(msg) });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String((e && e.message) || e) }, { status: 500 });
  }
}
