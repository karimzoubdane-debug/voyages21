// Catalogue de modèles disponibles dans les dropdowns
export const MODELS = [
  // Anthropic
  { id: 'anthropic:claude-opus-4-7',     label: 'Claude Opus 4.7',     provider: 'anthropic' },
  { id: 'anthropic:claude-sonnet-4-6',   label: 'Claude Sonnet 4.6',   provider: 'anthropic' },
  { id: 'anthropic:claude-haiku-4-5',    label: 'Claude Haiku 4.5',    provider: 'anthropic' },
  // OpenAI
  { id: 'openai:gpt-4o',                 label: 'GPT-4o',              provider: 'openai' },
  { id: 'openai:gpt-4o-mini',            label: 'GPT-4o mini',         provider: 'openai' },
  { id: 'openai:o1-mini',                label: 'OpenAI o1-mini',      provider: 'openai' },
  // DeepSeek
  { id: 'deepseek:deepseek-chat',        label: 'DeepSeek Chat',       provider: 'deepseek' },
  { id: 'deepseek:deepseek-reasoner',    label: 'DeepSeek Reasoner',   provider: 'deepseek' },
  // Gemini
  { id: 'gemini:gemini-1.5-pro',         label: 'Gemini 1.5 Pro',      provider: 'gemini' },
  { id: 'gemini:gemini-1.5-flash',       label: 'Gemini 1.5 Flash',    provider: 'gemini' },
];

export const DEFAULT_SELECTION = [
  'deepseek:deepseek-chat',
  'deepseek:deepseek-reasoner',
  'anthropic:claude-sonnet-4-6',
  'openai:gpt-4o-mini',
];

export const JUDGE_MODEL = 'anthropic:claude-sonnet-4-6';

function parseModelId(modelId) {
  const [provider, ...rest] = modelId.split(':');
  return { provider, model: rest.join(':') };
}

async function callAnthropic({ model, prompt, system }) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY manquante');

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: 2048,
      system: system || undefined,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Anthropic ${res.status}: ${txt}`);
  }
  const data = await res.json();
  return data.content?.map((c) => c.text).join('\n') ?? '';
}

async function callOpenAI({ model, prompt, system }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY manquante');

  const messages = [];
  if (system) messages.push({ role: 'system', content: system });
  messages.push({ role: 'user', content: prompt });

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model, messages }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`OpenAI ${res.status}: ${txt}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? '';
}

async function callDeepSeek({ model, prompt, system }) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error('DEEPSEEK_API_KEY manquante');

  const messages = [];
  if (system) messages.push({ role: 'system', content: system });
  messages.push({ role: 'user', content: prompt });

  const res = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model, messages }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`DeepSeek ${res.status}: ${txt}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? '';
}

async function callGemini({ model, prompt, system }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY manquante');

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const body = {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
  };
  if (system) {
    body.systemInstruction = { parts: [{ text: system }] };
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Gemini ${res.status}: ${txt}`);
  }
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.map((p) => p.text).join('\n') ?? '';
}

export async function callModel({ modelId, prompt, system }) {
  const { provider, model } = parseModelId(modelId);
  switch (provider) {
    case 'anthropic': return callAnthropic({ model, prompt, system });
    case 'openai':    return callOpenAI({ model, prompt, system });
    case 'deepseek':  return callDeepSeek({ model, prompt, system });
    case 'gemini':    return callGemini({ model, prompt, system });
    default: throw new Error(`Provider inconnu : ${provider}`);
  }
}

export function getModelLabel(modelId) {
  return MODELS.find((m) => m.id === modelId)?.label ?? modelId;
}
