// POST /api/credit/summarize — résumé d'un document pour le dossier de crédit.
// Corps : { text:string, name?:string }
import { NextResponse } from 'next/server';
import { getClient, runMessages, textFrom } from '../_lib.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const SYSTEM =
  "Tu es analyste crédit. On te donne le texte d'un document de dossier (exposé d'activité, " +
  "historique, réalisations, relevés, contrats…). Produis un résumé STRUCTURÉ et concis utile à " +
  "une décision d'octroi : (1) Nature du document, (2) Activité / contexte, (3) Éléments financiers " +
  "marquants, (4) Clients / fournisseurs / marché, (5) Points de vigilance et risques, (6) Ce que ça " +
  "apporte à l'instruction crédit. En français. N'invente rien ; signale ce qui manque.";

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
  const text = (body.text || '').toString().slice(0, 60000);
  if (!text.trim()) return NextResponse.json({ ok: false, error: 'Aucun texte à résumer.' }, { status: 400 });
  const name = (body.name || 'document').toString().slice(0, 200);
  try {
    const msg = await runMessages(client, {
      system: SYSTEM,
      max_tokens: 4000,
      messages: [{ role: 'user', content: 'Document « ' + name + ' » à résumer :\n\n' + text }],
    });
    return NextResponse.json({ ok: true, text: textFrom(msg) });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String((e && e.message) || e) }, { status: 500 });
  }
}
