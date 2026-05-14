import { NextResponse } from 'next/server';
import { callModel } from '@/lib/ai-providers';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(req) {
  try {
    const { modelId, prompt } = await req.json();
    if (!modelId || !prompt) {
      return NextResponse.json({ error: 'modelId et prompt requis' }, { status: 400 });
    }
    const text = await callModel({ modelId, prompt });
    return NextResponse.json({ text });
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Erreur inconnue' }, { status: 500 });
  }
}
