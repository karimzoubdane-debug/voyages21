// POST /api/credit/chat — discussion avec l'analyste crédit senior.
// Corps : { messages:[{role,content}], context:{...analyse calculée...}, notes?:string }
import { NextResponse } from 'next/server';
import { getClient, runMessages, textFrom, PERSONA } from '../_lib.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

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
  const history = Array.isArray(body.messages) ? body.messages.slice(-16) : [];
  const ctx = body.context || {};
  const notes = (body.notes || '').toString().slice(0, 6000);

  const preamble =
    "CONTEXTE DU DOSSIER (chiffres déjà calculés par l'outil, ne pas recalculer) :\n" +
    JSON.stringify(ctx).slice(0, 12000) +
    (notes ? "\n\nNOTES DE L'ANALYSTE :\n" + notes : '');

  const messages = [
    { role: 'user', content: preamble },
    { role: 'assistant', content: "Bien reçu, j'ai les chiffres du dossier. Je suis prêt à instruire la demande." },
    ...history.filter((m) => m && (m.role === 'user' || m.role === 'assistant') && m.content),
  ];
  if (messages[messages.length - 1].role !== 'user') {
    return NextResponse.json({ ok: false, error: 'Dernier message non utilisateur.' }, { status: 400 });
  }
  try {
    const msg = await runMessages(client, { system: PERSONA, messages, max_tokens: 6000 });
    return NextResponse.json({ ok: true, text: textFrom(msg) });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String((e && e.message) || e) }, { status: 500 });
  }
}
