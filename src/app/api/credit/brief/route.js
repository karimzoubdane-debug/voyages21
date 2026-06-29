// POST /api/credit/brief — brèves d'actualité éco/finance (Maroc + international).
// Corps : { focus?:string, n?:number }  →  { ok, items:[{titre, description}] }
import { NextResponse } from 'next/server';
import { getClient, runMessages, textFrom, WEB_SEARCH } from '../_lib.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 120;

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
  const n = Math.min(8, Math.max(3, parseInt(body.n, 10) || 5));
  const focus = (body.focus || '').toString().slice(0, 500);

  const system =
    "Tu produis un BRIEF d'actualité économique et financière pour un banquier, couvrant le MAROC " +
    "et l'INTERNATIONAL. Cherche des informations RÉCENTES sur des sources publiques (L'Économiste, " +
    "Médias24, Le Matin, Maroc Hebdo, presse internationale). " +
    "Rends EXACTEMENT " + n + " brèves. Pour chacune : un TITRE court et une DESCRIPTION de 5 phrases " +
    "MAXIMUM. Réponds UNIQUEMENT par un tableau JSON valide, sans texte autour, au format : " +
    '[{"titre":"...","description":"..."}]' +
    (focus ? '. Oriente le brief vers : ' + focus : '');

  try {
    const msg = await runMessages(client, {
      system,
      tools: [WEB_SEARCH],
      max_tokens: 8000,
      messages: [{ role: 'user', content: "Génère le brief du jour (Maroc + international)." }],
    });
    const raw = textFrom(msg);
    let items = [];
    const m = raw.match(/\[[\s\S]*\]/);
    if (m) {
      try { items = JSON.parse(m[0]); } catch (e) { items = []; }
    }
    items = (Array.isArray(items) ? items : [])
      .filter((x) => x && x.titre)
      .map((x) => ({ titre: String(x.titre).slice(0, 200), description: String(x.description || '').slice(0, 1200) }));
    if (!items.length) {
      // repli : renvoyer le texte brut pour ne pas perdre le travail
      return NextResponse.json({ ok: true, items: [], text: raw });
    }
    return NextResponse.json({ ok: true, items });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String((e && e.message) || e) }, { status: 500 });
  }
}
