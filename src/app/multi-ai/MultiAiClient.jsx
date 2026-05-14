'use client';

import { useState } from 'react';
import { MODELS, DEFAULT_SELECTION } from '@/lib/ai-providers';
import styles from './multi-ai.module.css';

const initialAnswer = () => ({ status: 'idle', text: '', error: null });

export default function MultiAiClient() {
  const [question, setQuestion] = useState('');
  const [selectedModels, setSelectedModels] = useState(DEFAULT_SELECTION);
  const [answers, setAnswers] = useState(DEFAULT_SELECTION.map(initialAnswer));
  const [verdict, setVerdict] = useState(null);
  const [verdictStatus, setVerdictStatus] = useState('idle'); // idle | loading | done | error
  const [running, setRunning] = useState(false);

  function changeModel(slot, modelId) {
    const next = [...selectedModels];
    next[slot] = modelId;
    setSelectedModels(next);
  }

  async function askOne(modelId, prompt) {
    try {
      const res = await fetch('/api/multi-ai/ask', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ modelId, prompt }),
      });
      const data = await res.json();
      if (!res.ok) return { status: 'error', text: '', error: data.error || `HTTP ${res.status}` };
      return { status: 'done', text: data.text || '', error: null };
    } catch (e) {
      return { status: 'error', text: '', error: e.message };
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!question.trim() || running) return;

    setRunning(true);
    setVerdict(null);
    setVerdictStatus('idle');
    setAnswers(selectedModels.map(() => ({ status: 'loading', text: '', error: null })));

    // Lance les 4 appels en parallèle, met à jour chaque case dès qu'elle revient
    const results = new Array(selectedModels.length);
    await Promise.all(
      selectedModels.map(async (modelId, i) => {
        const r = await askOne(modelId, question);
        results[i] = r;
        setAnswers((prev) => {
          const next = [...prev];
          next[i] = r;
          return next;
        });
      })
    );

    // Lancer le juge
    setVerdictStatus('loading');
    try {
      const payload = {
        question,
        answers: selectedModels.map((modelId, i) => ({
          modelId,
          text: results[i].text,
          error: results[i].error,
        })),
      };
      const res = await fetch('/api/multi-ai/judge', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setVerdict({ error: data.error || `HTTP ${res.status}` });
        setVerdictStatus('error');
      } else {
        setVerdict(data);
        setVerdictStatus('done');
      }
    } catch (err) {
      setVerdict({ error: err.message });
      setVerdictStatus('error');
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Multi-AI Comparator</h1>
        <p className={styles.subtitle}>
          Pose une question, 4 IA y répondent en parallèle, un juge désigne la meilleure réponse.
        </p>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        <textarea
          className={styles.textarea}
          placeholder="Pose ta question, ton sujet, ton problème à résoudre…"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={4}
          disabled={running}
        />
        <button
          type="submit"
          className={styles.submit}
          disabled={running || !question.trim()}
        >
          {running ? 'En cours…' : 'Envoyer aux 4 IA'}
        </button>
      </form>

      <section className={styles.grid}>
        {selectedModels.map((modelId, i) => {
          const a = answers[i];
          const isWinner = verdict?.winnerIndex === i + 1;
          return (
            <article key={i} className={`${styles.card} ${isWinner ? styles.winner : ''}`}>
              <div className={styles.cardHeader}>
                <span className={styles.slot}>IA #{i + 1}</span>
                <select
                  className={styles.select}
                  value={modelId}
                  onChange={(e) => changeModel(i, e.target.value)}
                  disabled={running}
                >
                  {MODELS.map((m) => (
                    <option key={m.id} value={m.id}>{m.label}</option>
                  ))}
                </select>
                {isWinner && <span className={styles.crown}>🏆</span>}
              </div>
              <div className={styles.cardBody}>
                {a.status === 'idle'    && <p className={styles.muted}>En attente…</p>}
                {a.status === 'loading' && <p className={styles.muted}>Génération en cours…</p>}
                {a.status === 'error'   && <p className={styles.error}>Erreur : {a.error}</p>}
                {a.status === 'done'    && <pre className={styles.answer}>{a.text}</pre>}
              </div>
            </article>
          );
        })}
      </section>

      <section className={styles.verdict}>
        <h2 className={styles.verdictTitle}>🏆 Verdict du juge</h2>
        {verdictStatus === 'idle'    && <p className={styles.muted}>Le verdict apparaîtra après les 4 réponses.</p>}
        {verdictStatus === 'loading' && <p className={styles.muted}>Analyse des réponses en cours…</p>}
        {verdictStatus === 'error'   && <p className={styles.error}>Erreur : {verdict?.error}</p>}
        {verdictStatus === 'done' && verdict && (
          <div className={styles.verdictBody}>
            <p className={styles.winnerLine}>
              <strong>Meilleure réponse :</strong>{' '}
              {verdict.winnerLabel || `IA #${verdict.winnerIndex}`}
              {verdict.winnerIndex ? ` (IA #${verdict.winnerIndex})` : ''}
            </p>
            <p className={styles.reasoning}>{verdict.reasoning}</p>
            {Array.isArray(verdict.scores) && verdict.scores.length > 0 && (
              <div className={styles.scores}>
                <h3>Scores</h3>
                <ul>
                  {verdict.scores.map((s, idx) => (
                    <li key={idx}>
                      <strong>IA #{s.index} — {s.label}</strong> : {s.score}/10
                      {s.comment ? ` — ${s.comment}` : ''}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
