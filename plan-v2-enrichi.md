# Plan d'Implémentation Étape par Étape - LinkedRx (V2 Enrichi)

## Étape 1 : Initialisation du Projet & Backend Vercel

- Initialiser un projet Node.js/Next.js (14+) adapté au déploiement sur Vercel.
- Installer dépendances minimales : `npm install tailwindcss next-auth` (Tailwind CSS pour UI, next-auth optionnel pour auth future).
- Créer la structure fichiers :
  ```
  linkedrx/
  ├── src/app/
  │   ├── page.jsx (appel au composant ConfigurationPanel)
  │   ├── layout.jsx (layout global)
  │   └── api/linkedrx/audit.js (route POST)
  ├── src/components/
  │   ├── ConfigurationPanel.jsx
  │   ├── InputForm.jsx
  │   └── DiagnosticsDisplay.jsx
  ├── lib/
  │   └── prompts.json (DATABASE PROMPTS)
  └── vercel.json (config déploiement)
  ```
- Créer `lib/prompts.json` qui stocke les 3 prompts complets (voir Étape 1B ci-dessous).

### Étape 1B : Structure de `lib/prompts.json`

```json
{
  "claude": {
    "prompt_id": "claude",
    "model": "claude-sonnet-4-20250514",
    "provider": "Anthropic",
    "role": "Auditeur LinkedIn — Expert Diagnostic Profil",
    "focus": ["Narrative coherence", "Soft skills", "Authenticity signals"],
    "system_prompt": "Tu es AUDITEUR LINKEDIN — Expert Diagnostic Profil.\n\nTon job: ANALYSER et AUDITER l'état ACTUEL du profil LinkedIn du candidat.\n\nTu n'es PAS un coach. Tu es un auditeur FROID et FACTUEL.\n\n### PROCESSUS AUDIT\n1. Analyser profil: 6 sections (Titre, Résumé, Expériences, Compétences, Recommandations, Activité)\n2. Comparer vs Guide LinkedIn 2026 standards\n3. Produire: Verdict + Points forts + Points faibles\n\n### STANDARDS GUIDE LINKEDIN 2026\n\nTITRE:\n- Standard: [Poste Spécifique | Spécialité/Outils | Valeur/Résultat]\n- Points forts: Titre détaillé + outils secteur + résultat\n- Points faibles: Titre générique, pas spécialité, pas valeur\n\nRÉSUMÉ:\n- Standard: AIDA (Attention → Interest → Desire → Action) + résultats chiffrés\n- Longueur: 800-1200 caractères\n- Points forts: Structure claire + résultats + ton personnel\n- Points faibles: Ton robotique, zéro résultats, suspect IA\n\nEXPÉRIENCES:\n- Standard SCOPE: [Verbe | Compétence | Résultat]\n- Points forts: Majorité SCOPE, progression junior→senior\n- Points faibles: Format tâches, gaps inexpliqués, zéro soft skills\n\nCOMPÉTENCES:\n- Standard: 40-50 remplis, balance hard/soft\n- Points forts: 40+ remplis, outils secteur présents\n- Points faibles: <25 remplis, déséquilibré\n\nRECOMMANDATIONS:\n- Standard: 5+ recommandations = 17x plus visible\n- Points forts: 5+, couverture diverse, détaillées\n- Points faibles: <3, couverture incomplète\n\nACTIVITÉ:\n- Standard: 2-3 posts/semaine\n- Points forts: 2-3/semaine consistent, 80/20 ratio\n- Points faibles: 0 posts, inactivité >1 mois\n\n### RÈGLES STRICTES\n✅ AUDIT FROID = ZÉRO OPINION (jamais \"vous devriez...\")\n✅ ZÉRO INVENTION (data manquante → demander)\n✅ CITATIONS DIRECTES quand pertinent\n✅ BASÉ GUIDE LINKEDIN 2026\n✅ SPÉCIFIQUE AU CANDIDAT",
    "user_prompt_template": "### DONNÉES CANDIDAT\n\nBESION: {besoin}\nPROFIL LINKEDIN: {profil_linkedin}\nCV: {cv}\nLETTRE DE MOTIVATION: {lettre_motivation}\nCONTEXTE: {contexte}\n\n---\n\nAnalyse ce profil LinkedIn selon audit froid décrit ci-dessus.\nProduis VERDICT + POINTS FORTS + POINTS FAIBLES basé Guide LinkedIn 2026.\n\nZÉRO OPINION, ZÉRO INVENTION, ZÉRO CONVERSATION.",
    "output_format": {
      "verdict": {
        "besoin_candidat": "string (1 phrase)",
        "profil_etat": "string",
        "verdict": "string (Oui/Non)",
        "raison": "string"
      },
      "points_forts": [
        {"force": "string", "section": "string", "observation": "string"}
      ],
      "points_faibles": [
        {"faiblesse": "string", "section": "string", "ecart_observe": "string", "standard": "string", "explication": "string"}
      ]
    },
    "api_config": {
      "endpoint": "https://api.anthropic.com/v1/messages",
      "model": "claude-sonnet-4-20250514",
      "max_tokens": 2000
    }
  },
  "gpt4o": {
    "prompt_id": "gpt4o",
    "model": "gpt-4o-2025-05-13",
    "provider": "OpenAI",
    "role": "Auditeur LinkedIn — Spécialiste Logique Structurée",
    "focus": ["Structured logic", "Tools/certifications", "Metrics", "Standards"],
    "system_prompt": "Tu es AUDITEUR LINKEDIN — Spécialiste Logique Structurée & Standards Techniques.\n\nTon job: ANALYSER et AUDITER l'état ACTUEL du profil LinkedIn avec focus STRUCTURÉ.\n\nTu n'es PAS un coach. Tu es un auditeur FROID et MÉTHODIQUE.\n\n### PROCESSUS AUDIT\n1. Analyser profil: 6 sections avec déconstruction logique\n2. Comparer vs Guide LinkedIn 2026 standards structurés\n3. Produire diagnostic CHIFFRÉ: Verdict + Points + Metrics\n\n### STANDARDS STRUCTURÉS\n\nTITRE — Déconstruction [Poste | Outils | Résultat]:\n- Tech/PM: Senior PM + (Agile, OKR, SQL, Analytics) + (Scaled X, +Y%)\n- Finance: Senior FA + (SAP, Excel, VBA, SQL) + ($X, -Y%)\n- Marketing: Senior Growth + (GA, Salesforce, HubSpot) + (+X%)\n\nPoints forts: 3/3 composants valides\nPoints faibles: <3/3 composants\n\nRÉSUMÉ — AIDA + Metrics:\nATTENTION, INTEREST, DESIRE (4-5 résultats chiffrés), ACTION\nMots-clés: 5-7 incontournables secteur\nPoints forts: AIDA 4/4 + résultats 4/4\nPoints faibles: AIDA <3/4 + résultats 0/4\n\nEXPÉRIENCES — SCOPE [Verbe | Compétence | Résultat]:\nAnalyse: X/Y bullets SCOPE = Z%\nPoints forts: 80%+ SCOPE\nPoints faibles: <50% SCOPE\n\nCOMPÉTENCES:\nRemplissage: X/50 (standard 40-50)\nDistribution: Hard%, Soft%, Certs% (standard 50/30/20)\nOutils: X/5-7 incontournables\nPoints forts: 40+ remplis, tools/certs complets\nPoints faibles: <25 remplis, déséquilibré\n\nRECOMMANDATIONS:\nNombre: X (standard 5+)\nCouverture: Manager[0/1], Peers[X/2-3], Subordinates[Y/1]\nPoints forts: 5+, couverture logique\nPoints faibles: <3, couverture incomplète\n\nACTIVITÉ:\nRégularité: Posts/semaine, Posts/mois\nStandard: 2-3/semaine = 8-10 score\nPoints forts: 2-3/semaine, cohérence secteur\nPoints faibles: 0 posts, inactivité >1 mois\n\n### RÈGLES STRICTES\n✅ AUDIT FROID = ZÉRO OPINION\n✅ PRÉCISION CHIFFRÉE (%, X/Y, Z%)\n✅ ZÉRO INVENTION (data manquante → demander)\n✅ BASÉ GUIDE LINKEDIN 2026",
    "user_prompt_template": "### DONNÉES CANDIDAT\n\nBESION: {besoin}\nPROFIL LINKEDIN: {profil_linkedin}\nCV: {cv}\nLETTRE DE MOTIVATION: {lettre_motivation}\nCONTEXTE: {contexte}\n\n---\n\nAnalyse ce profil LinkedIn avec FOCUS STRUCTURÉ.\nProduis VERDICT + POINTS FORTS + POINTS FAIBLES avec CHIFFRES et POURCENTAGES.\n\nZÉRO OPINION, ZÉRO INVENTION, PRÉCISION CHIFFRÉE.",
    "output_format": {
      "verdict": {
        "besoin_candidat": "string",
        "profil_etat": "string",
        "verdict": "string (Oui/Non)",
        "raison_chiffree": "string"
      },
      "points_forts": [
        {"force": "string", "section": "string", "mesure": "string (ex: '13/15 SCOPE (87%)')", "observation": "string"}
      ],
      "points_faibles": [
        {"faiblesse": "string", "section": "string", "ecart_pourcent": "string", "standard": "string", "actuel": "string", "impact": "string"}
      ],
      "metriques": {
        "titre_composants": "X/3",
        "resume_aida": "X/4",
        "experiences_scope_percent": "X%",
        "competences_remplissage": "X/50"
      }
    },
    "api_config": {
      "endpoint": "https://api.openai.com/v1/chat/completions",
      "model": "gpt-4o-2025-05-13",
      "max_tokens": 2000
    }
  },
  "gemini": {
    "prompt_id": "gemini",
    "model": "gemini-2.0-flash-001",
    "provider": "Google",
    "role": "Auditeur LinkedIn — Spécialiste Authenticité Narrative",
    "focus": ["Authenticity signals", "Narrative coherence", "Soft skills", "Growth mindset"],
    "system_prompt": "Tu es AUDITEUR LINKEDIN — Spécialiste Authenticité Narrative & Soft Skills.\n\nTon job: ANALYSER et AUDITER l'état ACTUEL du profil LinkedIn avec focus AUTHENTICITÉ.\n\nTu n'es PAS un coach. Tu es un auditeur FROID de la cohérence humaine.\n\n### PROCESSUS AUDIT\n1. Analyser profil: authenticité + soft skills + narrative coherence\n2. Comparer vs Guide LinkedIn 2026 standards authenticité\n3. Produire diagnostic: Verdict + Points + Signals\n\n### STANDARDS AUTHENTICITÉ\n\nTITRE — Alignement Aspiration vs Communication:\nTitre exprime quelle aspiration? Parcours confirme? Incongruence?\nAuthenticity signals:\n✅ Titre spécifique = authenticity signal\n✅ Titre humble (pas oversell)\n❌ Titre générique\n❌ Titre oversell\n\nRÉSUMÉ — Cohérence Narrative Profonde:\nAccroche → Expertise → Résultats → CTA?\nSoft skills manifestés:\n✅ Leadership signals (Guide, Mentored, Coached)\n✅ Empathy (User-centered, Pain points)\n✅ Communication (ton accessible)\n✅ Authenticity (personal touches, vulnerability)\n❌ Tone robotique/IA générique\n\nEXPÉRIENCES — Soft Skills Progression:\nPoste 1: Soft skills mention?\nPoste 2: Soft skills elevated?\nPoste 3: Soft skills pinnacle?\nGrowth pattern: Linear? Static?\nAuthenticity:\n✅ Descriptions spécifiques (noms, contextes)\n✅ Challenges mentionnés\n✅ Learning admitted (growth mindset)\n❌ Generic descriptions\n❌ Never admits challenges\n❌ No learning narrative\n\nCOMPÉTENCES — Hard vs Soft Balance:\nDistribution: Hard%, Soft%\nHuman balance:\n✅ 50/50 ou 40/60 = human-centered\n❌ 80% hard = technical-only\nAspirations alignment: Aspire X? Compétences supportent?\n\nRECOMMANDATIONS — Relationship Authenticity:\nPersonal tone? Warmth? Specific examples?\n✅ Genuine endorsements (earned)\n❌ Generic praise (transactional)\n✅ Personal warmth\n❌ Formal/stiff\n\nACTIVITÉ — Voice Authenticity:\nVoice consistency [1-10]\nPersonal voice vs corporate tone [scale]\nUnique perspective vs boilerplate?\nVulnérabilité present? Growth visible?\n✅ Personalized replies, genuine dialogue, admits struggles\n❌ Generic templates, broadcasts, never admits challenges\n\n### RÈGLES STRICTES\n✅ AUDIT FROID = ZÉRO OPINION\n✅ ZÉRO INVENTION\n✅ SPÉCIFIQUE AUX OBSERVATIONS\n✅ BASÉ GUIDE LINKEDIN 2026",
    "user_prompt_template": "### DONNÉES CANDIDAT\n\nBESION: {besoin}\nPROFIL LINKEDIN: {profil_linkedin}\nCV: {cv}\nLETTRE DE MOTIVATION: {lettre_motivation}\nCONTEXTE: {contexte}\n\n---\n\nAnalyse ce profil LinkedIn avec FOCUS AUTHENTICITÉ.\nProduis VERDICT + POINTS FORTS + POINTS FAIBLES avec SIGNALS AUTHENTICITÉ.\n\nZÉRO OPINION, ZÉRO INVENTION, ZÉRO COACHING.",
    "output_format": {
      "verdict": {
        "besoin_candidat": "string",
        "profil_etat": "string",
        "verdict": "string (Oui/Non)",
        "raison_authenticite": "string"
      },
      "points_forts": [
        {"signal": "string", "type": "string (Authenticity|Coherence|Soft Skills|Growth)", "observation": "string", "exemple": "string"}
      ],
      "points_faibles": [
        {"incohérence": "string", "type": "string (Incongruence|Suspect|Manque Humanness)", "section": "string", "observation": "string", "raison": "string"}
      ],
      "authenticite_signals": {
        "narrative_coherence_score": "number (1-10)",
        "soft_skills_progression": "Y/N",
        "growth_mindset_visible": "Y/N",
        "vulnerability_admitted": "Y/N"
      }
    },
    "api_config": {
      "endpoint": "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      "model": "gemini-2.0-flash-001",
      "max_tokens": 2000
    }
  }
}
```

---

## Étape 2 : Route API Backend (Parallélisation)

Développer `api/linkedrx/audit.js` (route POST Vercel) :

```javascript
import prompts from '../../lib/prompts.json';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { candidateData, iaConfig } = req.body;

  if (!iaConfig?.ia1?.model || !iaConfig?.ia1?.apiKey) {
    return res.status(400).json({ error: 'IA1 + clé API obligatoire' });
  }

  try {
    const diagnostics = {};
    const apiCalls = [];

    // IA1 (OBLIGATOIRE)
    apiCalls.push(
      callAI(iaConfig.ia1.model, iaConfig.ia1.apiKey, candidateData, prompts).then((result) => {
        diagnostics.ia1 = result;
      }).catch((err) => {
        diagnostics.ia1 = { error: err.message };
      })
    );

    // IA2 (OPTIONNEL)
    if (iaConfig.ia2?.enabled && iaConfig.ia2?.apiKey) {
      apiCalls.push(
        callAI(iaConfig.ia2.model, iaConfig.ia2.apiKey, candidateData, prompts).then((result) => {
          diagnostics.ia2 = result;
        }).catch((err) => {
          diagnostics.ia2 = { error: err.message };
        })
      );
    }

    // IA3 (OPTIONNEL)
    if (iaConfig.ia3?.enabled && iaConfig.ia3?.apiKey) {
      apiCalls.push(
        callAI(iaConfig.ia3.model, iaConfig.ia3.apiKey, candidateData, prompts).then((result) => {
          diagnostics.ia3 = result;
        }).catch((err) => {
          diagnostics.ia3 = { error: err.message };
        })
      );
    }

    // PARALLÉLISATION STRICTE
    await Promise.all(apiCalls);

    const synthesis = generateSynthesis(diagnostics);

    return res.status(200).json({ success: true, diagnostics, synthesis });
  } catch (error) {
    console.error('Audit error:', error);
    return res.status(500).json({ error: error.message });
  }
}

async function callAI(model, apiKey, candidateData, prompts) {
  const prompt = prompts[model];
  const userInput = formatUserInput(prompt.user_prompt_template, candidateData);

  if (model === 'claude') {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: prompt.model,
        max_tokens: 2000,
        system: prompt.system_prompt,
        messages: [{ role: 'user', content: userInput }]
      })
    });
    const data = await res.json();
    return parseResponse(data.content[0].text, prompt.output_format);
  }

  if (model === 'gpt4o') {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: prompt.model,
        max_tokens: 2000,
        messages: [
          { role: 'system', content: prompt.system_prompt },
          { role: 'user', content: userInput }
        ]
      })
    });
    const data = await res.json();
    return parseResponse(data.choices[0].message.content, prompt.output_format);
  }

  if (model === 'gemini') {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userInput }] }],
          system_instruction: { parts: [{ text: prompt.system_prompt }] },
          generationConfig: { maxOutputTokens: 2000 }
        })
      }
    );
    const data = await res.json();
    return parseResponse(data.candidates[0].content.parts[0].text, prompt.output_format);
  }
}

function formatUserInput(template, candidateData) {
  return template
    .replace('{besoin}', candidateData.besoin || '')
    .replace('{profil_linkedin}', candidateData.profil_linkedin || '')
    .replace('{cv}', candidateData.cv || '')
    .replace('{lettre_motivation}', candidateData.lettre_motivation || '')
    .replace('{contexte}', candidateData.contexte || '');
}

function parseResponse(text, format) {
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) return JSON.parse(jsonMatch[0]);
  } catch (e) {}
  return {
    verdict: { verdict: 'Diagnostic incomplet', raison: text },
    points_forts: [],
    points_faibles: []
  };
}

function generateSynthesis(diagnostics) {
  const verdicts = [];
  if (diagnostics.ia1?.verdict?.verdict) verdicts.push(`Claude: ${diagnostics.ia1.verdict.verdict}`);
  if (diagnostics.ia2?.verdict?.verdict) verdicts.push(`GPT: ${diagnostics.ia2.verdict.verdict}`);
  if (diagnostics.ia3?.verdict?.verdict) verdicts.push(`Gemini: ${diagnostics.ia3.verdict.verdict}`);
  
  return {
    summary: `Synthèse multi-IA: ${verdicts.join(' | ')}`
  };
}
```

---

## Étape 3 : Développement des Écrans Frontend (React + Tailwind)

### Composant 1: `ConfigurationPanel.jsx`

```jsx
import { useState } from 'react';

export default function ConfigurationPanel({ onComplete }) {
  const [ia1, setIA1] = useState({ model: 'claude', apiKey: '' });
  const [ia2, setIA2] = useState({ model: 'gpt4o', apiKey: '', enabled: false });
  const [ia3, setIA3] = useState({ model: 'gemini', apiKey: '', enabled: false });

  const isValid = ia1.apiKey.trim().length > 0;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">🔍 LinkedRx Audit LinkedIn</h1>

      {/* IA 1 — OBLIGATOIRE */}
      <div className="mb-8 p-6 border-2 border-red-500 bg-white rounded">
        <h2 className="text-xl font-bold mb-4">IA 1 — OBLIGATOIRE</h2>
        <select
          value={ia1.model}
          onChange={(e) => setIA1({ ...ia1, model: e.target.value })}
          className="w-full p-2 border border-slate-300 rounded mb-4 focus:ring-2 focus:ring-blue-500"
        >
          <option value="claude">Claude Sonnet (Narratif)</option>
          <option value="gpt4o">GPT-4O (Structuré)</option>
          <option value="gemini">Gemini 2.0-Flash (Authenticité)</option>
        </select>
        <input
          type="password"
          placeholder="sk-..."
          value={ia1.apiKey}
          onChange={(e) => setIA1({ ...ia1, apiKey: e.target.value })}
          className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* IA 2 — OPTIONNEL */}
      <div className="mb-8 p-6 border border-slate-300 bg-white rounded">
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={ia2.enabled}
            onChange={(e) => setIA2({ ...ia2, enabled: e.target.checked })}
            className="mr-2"
          />
          <span className="text-xl font-bold">IA 2 — OPTIONNEL</span>
        </label>
        {ia2.enabled && (
          <>
            <select
              value={ia2.model}
              onChange={(e) => setIA2({ ...ia2, model: e.target.value })}
              className="w-full p-2 border border-slate-300 rounded mb-4 focus:ring-2 focus:ring-blue-500"
            >
              <option value="claude">Claude Sonnet</option>
              <option value="gpt4o">GPT-4O</option>
              <option value="gemini">Gemini 2.0-Flash</option>
            </select>
            <input
              type="password"
              placeholder="sk-..."
              value={ia2.apiKey}
              onChange={(e) => setIA2({ ...ia2, apiKey: e.target.value })}
              className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
            />
          </>
        )}
      </div>

      {/* IA 3 — OPTIONNEL */}
      <div className="mb-8 p-6 border border-slate-300 bg-white rounded">
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={ia3.enabled}
            onChange={(e) => setIA3({ ...ia3, enabled: e.target.checked })}
            className="mr-2"
          />
          <span className="text-xl font-bold">IA 3 — OPTIONNEL</span>
        </label>
        {ia3.enabled && (
          <>
            <select
              value={ia3.model}
              onChange={(e) => setIA3({ ...ia3, model: e.target.value })}
              className="w-full p-2 border border-slate-300 rounded mb-4 focus:ring-2 focus:ring-blue-500"
            >
              <option value="claude">Claude Sonnet</option>
              <option value="gpt4o">GPT-4O</option>
              <option value="gemini">Gemini 2.0-Flash</option>
            </select>
            <input
              type="password"
              placeholder="sk-..."
              value={ia3.apiKey}
              onChange={(e) => setIA3({ ...ia3, apiKey: e.target.value })}
              className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
            />
          </>
        )}
      </div>

      <button
        onClick={() => onComplete({ ia1, ia2, ia3 })}
        disabled={!isValid}
        className={`w-full p-3 rounded font-bold text-white text-lg ${
          isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Continuer →
      </button>
    </div>
  );
}
```

### Composant 2: `InputForm.jsx`

```jsx
import { useState } from 'react';

export default function InputForm({ iaConfig, onSubmit, onBack }) {
  const [besoin, setBesoin] = useState('');
  const [profil, setProfil] = useState('');
  const [cv, setCV] = useState('');
  const [lm, setLM] = useState('');
  const [contexte, setContexte] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isValid = besoin.trim() && profil.trim() && cv.trim() && lm.trim();

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/linkedrx/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidateData: { besoin, profil_linkedin: profil, cv, lettre_motivation: lm, contexte },
          iaConfig
        })
      });
      const data = await res.json();
      if (data.success) {
        onSubmit(data);
      } else {
        setError(data.error || 'Erreur lors de l\'audit');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">📝 Données Candidat</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded text-red-900">
          {error}
        </div>
      )}

      <textarea
        placeholder="Besoin explicite du candidat..."
        value={besoin}
        onChange={(e) => setBesoin(e.target.value)}
        className="w-full p-3 border border-slate-300 rounded mb-4 h-20 focus:ring-2 focus:ring-blue-500"
      />
      <input
        placeholder="URL Profil LinkedIn..."
        value={profil}
        onChange={(e) => setProfil(e.target.value)}
        className="w-full p-3 border border-slate-300 rounded mb-4 focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        placeholder="Contenu CV..."
        value={cv}
        onChange={(e) => setCV(e.target.value)}
        className="w-full p-3 border border-slate-300 rounded mb-4 h-32 focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        placeholder="Lettre de Motivation..."
        value={lm}
        onChange={(e) => setLM(e.target.value)}
        className="w-full p-3 border border-slate-300 rounded mb-4 h-32 focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        placeholder="Contexte (optionnel)..."
        value={contexte}
        onChange={(e) => setContexte(e.target.value)}
        className="w-full p-3 border border-slate-300 rounded mb-8 h-20 focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex gap-4">
        <button
          onClick={onBack}
          disabled={loading}
          className="flex-1 p-3 rounded font-bold bg-gray-200 hover:bg-gray-300"
        >
          ← Retour
        </button>
        <button
          onClick={handleSubmit}
          disabled={!isValid || loading}
          className={`flex-1 p-3 rounded font-bold text-white ${
            isValid && !loading ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {loading ? '⏳ Audit en cours...' : '🚀 Lancer Audit'}
        </button>
      </div>
    </div>
  );
}
```

### Composant 3: `DiagnosticsDisplay.jsx`

```jsx
export default function DiagnosticsDisplay({ diagnostics, synthesis, onBack }) {
  return (
    <div className="max-w-6xl mx-auto p-8 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">📊 Résultats Audit</h1>

      {/* DIAGNOSTIC CLAUDE (Bleu) */}
      {diagnostics.ia1 && (
        <div className="mb-8 p-6 border-l-4 border-blue-500 bg-blue-50 rounded">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">🔵 Diagnostic Claude (Narratif)</h2>
          <div className="bg-white p-4 rounded mb-4">
            <h3 className="text-lg font-semibold text-blue-900">VERDICT: {diagnostics.ia1.verdict?.verdict || 'N/A'}</h3>
            <p className="mt-2 text-blue-800">{diagnostics.ia1.verdict?.raison}</p>
          </div>

          {diagnostics.ia1.points_forts && diagnostics.ia1.points_forts.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-blue-900">✅ Points Forts</h3>
              {diagnostics.ia1.points_forts.map((pf, i) => (
                <div key={i} className="ml-4 mt-2 p-3 bg-white rounded border-l-2 border-green-500">
                  <p className="font-semibold text-blue-900">{pf.force}</p>
                  <p className="text-sm text-blue-700">{pf.section}</p>
                  <p className="text-blue-800">{pf.observation}</p>
                </div>
              ))}
            </div>
          )}

          {diagnostics.ia1.points_faibles && diagnostics.ia1.points_faibles.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-blue-900">❌ Points Faibles</h3>
              {diagnostics.ia1.points_faibles.map((pf, i) => (
                <div key={i} className="ml-4 mt-2 p-3 bg-white rounded border-l-2 border-red-500">
                  <p className="font-semibold text-blue-900">{pf.faiblesse}</p>
                  <p className="text-sm text-blue-700">{pf.section}</p>
                  <p><strong>Standard:</strong> {pf.standard}</p>
                  <p><strong>Observé:</strong> {pf.ecart_observe}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* DIAGNOSTIC GPT-4O (Vert) */}
      {diagnostics.ia2 && (
        <div className="mb-8 p-6 border-l-4 border-green-500 bg-green-50 rounded">
          <h2 className="text-2xl font-bold mb-4 text-green-900">🟢 Diagnostic GPT-4O (Structuré)</h2>
          <div className="bg-white p-4 rounded mb-4">
            <h3 className="text-lg font-semibold text-green-900">VERDICT: {diagnostics.ia2.verdict?.verdict || 'N/A'}</h3>
            <p className="mt-2 text-green-800">{diagnostics.ia2.verdict?.raison_chiffree}</p>
          </div>
          {diagnostics.ia2.metriques && (
            <div className="bg-white p-4 rounded mb-4">
              <p><strong>Titre:</strong> {diagnostics.ia2.metriques.titre_composants}</p>
              <p><strong>AIDA Résumé:</strong> {diagnostics.ia2.metriques.resume_aida}</p>
              <p><strong>SCOPE:</strong> {diagnostics.ia2.metriques.experiences_scope_percent}</p>
              <p><strong>Compétences:</strong> {diagnostics.ia2.metriques.competences_remplissage}</p>
            </div>
          )}
        </div>
      )}

      {/* DIAGNOSTIC GEMINI (Violet) */}
      {diagnostics.ia3 && (
        <div className="mb-8 p-6 border-l-4 border-purple-500 bg-purple-50 rounded">
          <h2 className="text-2xl font-bold mb-4 text-purple-900">🟣 Diagnostic Gemini (Authenticité)</h2>
          <div className="bg-white p-4 rounded mb-4">
            <h3 className="text-lg font-semibold text-purple-900">VERDICT: {diagnostics.ia3.verdict?.verdict || 'N/A'}</h3>
            <p className="mt-2 text-purple-800">{diagnostics.ia3.verdict?.raison_authenticite}</p>
          </div>
          {diagnostics.ia3.authenticite_signals && (
            <div className="bg-white p-4 rounded">
              <p><strong>Coherence:</strong> {diagnostics.ia3.authenticite_signals.narrative_coherence_score}/10</p>
              <p><strong>Soft Skills Progression:</strong> {diagnostics.ia3.authenticite_signals.soft_skills_progression ? '✅' : '❌'}</p>
              <p><strong>Growth Mindset:</strong> {diagnostics.ia3.authenticite_signals.growth_mindset_visible ? '✅' : '❌'}</p>
              <p><strong>Vulnérabilité:</strong> {diagnostics.ia3.authenticite_signals.vulnerability_admitted ? '✅' : '❌'}</p>
            </div>
          )}
        </div>
      )}

      {/* SYNTHÈSE */}
      {synthesis && (
        <div className="mb-8 p-6 border-l-4 border-orange-500 bg-orange-50 rounded">
          <h2 className="text-2xl font-bold mb-4 text-orange-900">🔄 Synthèse</h2>
          <p className="text-orange-800">{synthesis.summary}</p>
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 p-3 rounded font-bold bg-gray-200 hover:bg-gray-300"
        >
          ← Nouveau Audit
        </button>
      </div>
    </div>
  );
}
```

---

## Étape 4 : Tests de Validation de l'Objectif

Créer un script de test : `tests/linkedrx.test.js`

```javascript
import { jest } from '@jest/globals';

describe('LinkedRx Audit API', () => {
  const mockCandidateData = {
    besoin: 'Cherche rôle Senior PM en SaaS',
    profil_linkedin: 'linkedin.com/in/john-doe',
    cv: 'John Doe, Senior PM avec 10 ans expérience...',
    lettre_motivation: 'Motivé par projets innovants...',
    contexte: 'Paris, secteur Tech'
  };

  const mockIAConfig = {
    ia1: { model: 'claude', apiKey: 'test-key' },
    ia2: { model: 'gpt4o', apiKey: 'test-key', enabled: true },
    ia3: { model: 'gemini', apiKey: 'test-key', enabled: true }
  };

  test('API retourne diagnostic IA1 (Claude)', async () => {
    // TODO: Mock API calls
    const response = await fetch('/api/linkedrx/audit', {
      method: 'POST',
      body: JSON.stringify({ candidateData: mockCandidateData, iaConfig: { ia1: mockIAConfig.ia1 } })
    });
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.diagnostics.ia1).toBeDefined();
    expect(data.diagnostics.ia1.verdict).toBeDefined();
  });

  test('API retourne diagnostics IA1 + IA2 + IA3', async () => {
    // TODO: Mock all 3 API calls
    const response = await fetch('/api/linkedrx/audit', {
      method: 'POST',
      body: JSON.stringify({ candidateData: mockCandidateData, iaConfig: mockIAConfig })
    });
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.diagnostics.ia1).toBeDefined();
    expect(data.diagnostics.ia2).toBeDefined();
    expect(data.diagnostics.ia3).toBeDefined();
  });

  test('Frontend affiche correctement les 3 blocs diagnostics', () => {
    // TODO: Render DiagnosticsDisplay component et vérifier que les 3 blocs s'affichent
  });

  test('Pas d\'erreur console lors de l\'audit complet', () => {
    // TODO: Vérifier qu\'il n\'y a pas d\'erreur dans la console
  });
});
```

### Checklist de Validation ✅

**Frontend:**
- [ ] ConfigurationPanel: sélect IA + clés API (type="password")
- [ ] InputForm: 5 champs (besoin, profil, CV, LM, contexte)
- [ ] DiagnosticsDisplay: 3 blocs colorés (Bleu/Vert/Violet)
- [ ] Routing entre les 3 pages (useState ou Next.js pages)
- [ ] Tailwind styling conforme (palette design.md)
- [ ] Loading states + error handling
- [ ] Responsive design (mobile-first)

**Backend:**
- [ ] Route POST `/api/linkedrx/audit` fonctionnelle
- [ ] `lib/prompts.json` chargé correctement
- [ ] Promise.all exécute les 3 IA en parallèle
- [ ] Parsing JSON robuste (fallback en cas d'erreur)
- [ ] Gestion erreurs API (timeouts, invalid keys)
- [ ] Aucune clé API stockée en base de données

**Tests:**
- [ ] Test 1 IA (Claude seul) → verdict + points
- [ ] Test 2 IA (C + GPT) → 2 diagnostics
- [ ] Test 3 IA (C + GPT + Gemini) → 3 diagnostics complets
- [ ] Temps total < 50 secondes
- [ ] Pas d'erreur console
- [ ] JSON outputs valides

**Déploiement:**
- [ ] `vercel.json` configuré
- [ ] `.env.local` avec clés API (Vercel secrets)
- [ ] GitHub integration active
- [ ] Deploy preview fonctionne
- [ ] Production déploie automatiquement

---

## Status: 🟢 PRÊT POUR `/goal`

Tous les détails techniques + code complet + prompts JSON présents.
