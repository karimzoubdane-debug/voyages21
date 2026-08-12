// POST /api/credit/chat — discussion avec l'analyste crédit senior (réponse EN FLUX).
// Corps : { messages:[{role,content}], context:{...analyse calculée...}, notes?:string, model?:string }
// Réponse : flux texte (token par token). Si une erreur survient pendant le flux, on émet
// un marqueur ASCII " [[__AI_ERR__]] " + message, que le client détecte pour basculer
// proprement sur le moteur de règles.
import { NextResponse } from 'next/server';
import { getClient, PERSONA, pickModel } from '../_lib.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 120;

export const ERR_MARK = '[[__AI_ERR__]] ';

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

  const model = pickModel(body);
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (s) => { try { controller.enqueue(encoder.encode(s)); } catch (e) {} };
      try {
        const s = client.messages.stream({
          model,
          max_tokens: 6000,
          thinking: { type: 'adaptive' },
          system: PERSONA,
          messages,
        });
        s.on('text', (delta) => { if (delta) send(delta); });
        await s.finalMessage();
      } catch (e) {
        send(ERR_MARK + String((e && e.message) || e));
      } finally {
        try { controller.close(); } catch (e) {}
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
    },
  });
}
