'use client';

// Mini-app de validation des réponses aux avis Google (réservée au propriétaire).
// Flux : le cron dépose les avis + une proposition de réponse → Karim relit,
// ajuste si besoin, puis « Valider & publier » poste la réponse sur Google.
// Rien n'est publié sans son action explicite.

import { useEffect, useState, useCallback } from 'react';

const COLORS = {
  forest: '#1B3A28',
  forestDark: '#152E1F',
  gold: '#C8A440',
  cream: '#F5F0E8',
  ink: '#23211c',
  line: '#e6ddcc',
  danger: '#b3261e',
  ok: '#1f7a3d',
  muted: '#8a8272',
};

const TABS = [
  { key: 'pending', label: 'À valider' },
  { key: 'published', label: 'Publiés' },
  { key: 'rejected', label: 'Refusés' },
  { key: 'all', label: 'Tous' },
];

function stars(n) {
  const full = Math.max(0, Math.min(5, n || 0));
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

function frDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return '';
  }
}

export default function AvisGooglePage() {
  const [phase, setPhase] = useState('loading'); // loading | login | ready
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [busyLogin, setBusyLogin] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [counts, setCounts] = useState({});
  const [meta, setMeta] = useState({});
  const [config, setConfig] = useState({ google: false, ai: false, email: false });
  const [tab, setTab] = useState('pending');
  const [drafts, setDrafts] = useState({}); // reviewId → texte en cours d'édition
  const [busyId, setBusyId] = useState('');
  const [polling, setPolling] = useState(false);
  const [flash, setFlash] = useState('');

  const load = useCallback(async () => {
    const r = await fetch('/api/avis-google', { cache: 'no-store' });
    if (r.status === 401) {
      setPhase('login');
      return;
    }
    const d = await r.json();
    if (d.ok) {
      setReviews(d.reviews || []);
      setCounts(d.counts || {});
      setMeta(d.meta || {});
      setConfig(d.config || {});
      setDrafts((prev) => {
        const next = { ...prev };
        for (const rev of d.reviews || []) {
          if (next[rev.reviewId] === undefined) next[rev.reviewId] = rev.proposedReply || '';
        }
        return next;
      });
      setPhase('ready');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function submitLogin(e) {
    e.preventDefault();
    setLoginError('');
    setBusyLogin(true);
    try {
      const r = await fetch('/api/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const d = await r.json();
      if (d.ok && d.role === 'owner') {
        setPassword('');
        await load();
      } else if (d.ok) {
        setLoginError('Cet espace est réservé au propriétaire.');
      } else {
        setLoginError(d.error || 'Connexion refusée');
      }
    } catch {
      setLoginError('Erreur réseau');
    } finally {
      setBusyLogin(false);
    }
  }

  function showFlash(msg) {
    setFlash(msg);
    setTimeout(() => setFlash(''), 3500);
  }

  async function poll() {
    setPolling(true);
    try {
      const r = await fetch('/api/avis-google/poll', { method: 'POST' });
      const d = await r.json();
      if (d.ok) {
        showFlash(d.newReviews ? `✅ ${d.newReviews} nouvel(s) avis récupéré(s).` : '✅ À jour, aucun nouvel avis.');
        await load();
      } else {
        showFlash('❌ ' + (d.error || 'Échec de la récupération.'));
      }
    } catch {
      showFlash('❌ Erreur réseau');
    } finally {
      setPolling(false);
    }
  }

  async function act(review, action) {
    setBusyId(review.reviewId);
    try {
      const r = await fetch(`/api/avis-google/${encodeURIComponent(review.reviewId)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, text: drafts[review.reviewId] }),
      });
      const d = await r.json();
      if (d.ok) {
        if (action === 'approve') showFlash('✅ Réponse publiée sur Google.');
        else if (action === 'reject') showFlash('Avis marqué comme refusé.');
        else if (action === 'save') showFlash('💾 Brouillon enregistré.');
        else if (action === 'reset') showFlash('Avis remis en attente.');
        await load();
      } else {
        showFlash('❌ ' + (d.error || 'Action impossible.'));
      }
    } catch {
      showFlash('❌ Erreur réseau');
    } finally {
      setBusyId('');
    }
  }

  // ── Rendus ──────────────────────────────────────────────────────────────────

  if (phase === 'loading') {
    return <Shell><p style={{ color: COLORS.cream, opacity: 0.8 }}>Chargement…</p></Shell>;
  }

  if (phase === 'login') {
    return (
      <Shell>
        <div style={card}>
          <h1 style={h1}>Avis Google</h1>
          <p style={{ color: COLORS.muted, margin: '0 0 1.2rem', fontSize: '.95rem' }}>
            Espace réservé au propriétaire. Entrez votre mot de passe.
          </p>
          <form onSubmit={submitLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              autoFocus
              style={input}
            />
            {loginError ? <div style={{ color: COLORS.danger, fontSize: '.88rem', marginTop: '.6rem' }}>{loginError}</div> : null}
            <button type="submit" disabled={busyLogin} style={{ ...btn, marginTop: '1rem', width: '100%' }}>
              {busyLogin ? '…' : 'Entrer'}
            </button>
          </form>
        </div>
      </Shell>
    );
  }

  const filtered = reviews.filter((r) => (tab === 'all' ? true : r.status === tab));

  return (
    <Shell>
      <div style={{ width: '100%', maxWidth: 820 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '.6rem' }}>
          <div>
            <div style={{ color: COLORS.gold, letterSpacing: '.12em', fontSize: '.72rem', fontWeight: 700 }}>VOYAGES 21</div>
            <h1 style={{ ...h1, color: COLORS.cream, margin: '.2rem 0 0' }}>Avis Google</h1>
          </div>
          <div style={{ display: 'flex', gap: '.5rem' }}>
            <button onClick={poll} disabled={polling} style={{ ...btn, background: COLORS.gold, color: COLORS.forestDark }}>
              {polling ? 'Récupération…' : '↻ Rafraîchir'}
            </button>
            <a href="/admin" style={{ ...logoutBtn, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>← Espace</a>
          </div>
        </div>

        {/* Bandeaux de configuration manquante */}
        {!config.google ? (
          <Banner tone="warn">
            ⚠️ Connexion Google Business Profile non configurée : les avis ne peuvent pas encore être récupérés ni les réponses publiées.
            Voir <code>docs/AVIS-GOOGLE.md</code> pour brancher l&apos;API.
          </Banner>
        ) : null}
        {config.google && !config.email ? (
          <Banner tone="info">ℹ️ Alertes e-mail désactivées (Resend non configuré). Les avis restent visibles ici.</Banner>
        ) : null}
        {config.google && !config.ai ? (
          <Banner tone="info">ℹ️ IA non configurée : les propositions utilisent un modèle de texte de secours (à personnaliser).</Banner>
        ) : null}
        {meta.lastError ? <Banner tone="warn">Dernier incident : {meta.lastError}</Banner> : null}

        {flash ? <Banner tone="ok">{flash}</Banner> : null}

        {/* Onglets */}
        <div style={{ display: 'flex', gap: '.4rem', margin: '1rem 0', flexWrap: 'wrap' }}>
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                ...tabBtn,
                background: tab === t.key ? COLORS.cream : 'transparent',
                color: tab === t.key ? COLORS.forest : COLORS.cream,
                borderColor: tab === t.key ? COLORS.cream : 'rgba(245,240,232,.3)',
              }}
            >
              {t.label} {counts[t.key] !== undefined ? `(${counts[t.key]})` : t.key === 'all' ? `(${counts.total || 0})` : ''}
            </button>
          ))}
        </div>

        {meta.lastPollAt ? (
          <div style={{ color: 'rgba(245,240,232,.6)', fontSize: '.78rem', marginBottom: '.8rem' }}>
            Dernière synchronisation : {frDate(meta.lastPollAt)}
          </div>
        ) : null}

        {filtered.length === 0 ? (
          <div style={{ ...reviewCard, textAlign: 'center', color: COLORS.muted }}>
            {tab === 'pending' ? 'Aucun avis en attente. 🎉' : 'Rien à afficher ici pour l’instant.'}
          </div>
        ) : (
          filtered.map((r) => (
            <ReviewCard
              key={r.reviewId}
              review={r}
              draft={drafts[r.reviewId] ?? r.proposedReply ?? ''}
              onDraft={(v) => setDrafts((prev) => ({ ...prev, [r.reviewId]: v }))}
              busy={busyId === r.reviewId}
              disabled={!config.google}
              onAction={(action) => act(r, action)}
            />
          ))
        )}
      </div>
    </Shell>
  );
}

function ReviewCard({ review, draft, onDraft, busy, disabled, onAction }) {
  const isPending = review.status === 'pending';
  const isPublished = review.status === 'published';
  const isRejected = review.status === 'rejected';

  return (
    <div style={reviewCard}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '.6rem', flexWrap: 'wrap' }}>
        <div>
          <span style={{ fontWeight: 700, color: COLORS.forest }}>{review.reviewerName}</span>
          <span style={{ color: COLORS.gold, marginLeft: '.5rem', letterSpacing: '.05em' }}>{stars(review.rating)}</span>
        </div>
        <div style={{ display: 'flex', gap: '.4rem', alignItems: 'center' }}>
          {review.aiGenerated ? <span style={pill('#eef3ee', COLORS.ok)}>proposé par IA</span> : null}
          {isPublished ? <span style={pill('#eef3ee', COLORS.ok)}>publié</span> : null}
          {isRejected ? <span style={pill('#fdeceb', COLORS.danger)}>refusé</span> : null}
          <span style={{ color: COLORS.muted, fontSize: '.78rem' }}>{frDate(review.createTime)}</span>
        </div>
      </div>

      <p style={{ color: '#4b463d', fontSize: '.95rem', margin: '.6rem 0 .2rem', whiteSpace: 'pre-wrap' }}>
        {review.comment || <em style={{ color: COLORS.muted }}>(avis sans texte, seulement une note)</em>}
      </p>

      {isPending ? (
        <>
          <div style={{ fontSize: '.72rem', color: COLORS.muted, textTransform: 'uppercase', letterSpacing: '.08em', margin: '.8rem 0 .3rem' }}>
            Votre réponse (modifiable)
          </div>
          <textarea
            value={draft}
            onChange={(e) => onDraft(e.target.value)}
            rows={5}
            style={textarea}
          />
          <div style={{ display: 'flex', gap: '.5rem', marginTop: '.6rem', flexWrap: 'wrap' }}>
            <button onClick={() => onAction('approve')} disabled={busy || disabled} style={{ ...btn, background: COLORS.ok }}>
              {busy ? '…' : '✅ Valider & publier'}
            </button>
            <button onClick={() => onAction('save')} disabled={busy} style={{ ...btn, background: 'transparent', color: COLORS.forest, border: `1px solid ${COLORS.line}` }}>
              💾 Enregistrer
            </button>
            <button onClick={() => onAction('reject')} disabled={busy} style={{ ...btn, background: 'transparent', color: COLORS.danger, border: `1px solid ${COLORS.line}` }}>
              Refuser
            </button>
          </div>
          {disabled ? <div style={{ color: COLORS.danger, fontSize: '.8rem', marginTop: '.5rem' }}>Publication indisponible tant que Google n&apos;est pas connecté.</div> : null}
        </>
      ) : null}

      {isPublished ? (
        <div style={{ background: '#F5F0E8', borderRadius: 8, padding: '.8rem', marginTop: '.7rem' }}>
          <div style={{ fontSize: '.72rem', color: COLORS.muted, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '.3rem' }}>
            Réponse publiée {review.publishedAt ? `le ${frDate(review.publishedAt)}` : ''}
          </div>
          <div style={{ color: COLORS.ink, fontSize: '.92rem', whiteSpace: 'pre-wrap' }}>{review.finalReply || review.existingReply}</div>
        </div>
      ) : null}

      {isRejected ? (
        <div style={{ display: 'flex', marginTop: '.7rem' }}>
          <button onClick={() => onAction('reset')} disabled={busy} style={{ ...btn, background: 'transparent', color: COLORS.forest, border: `1px solid ${COLORS.line}` }}>
            Remettre en attente
          </button>
        </div>
      ) : null}
    </div>
  );
}

// ── Petits éléments visuels ───────────────────────────────────────────────────

function Banner({ tone, children }) {
  const tones = {
    warn: { bg: '#fff7e6', border: COLORS.gold, color: '#7a5d12' },
    info: { bg: '#eef4fb', border: '#9cc0e8', color: '#25507e' },
    ok: { bg: '#eef3ee', border: '#9bc7a6', color: COLORS.ok },
  };
  const t = tones[tone] || tones.info;
  return (
    <div style={{ background: t.bg, border: `1px solid ${t.border}`, color: t.color, borderRadius: 10, padding: '.7rem .9rem', fontSize: '.85rem', margin: '0 0 .7rem' }}>
      {children}
    </div>
  );
}

function pill(bg, color) {
  return { background: bg, color, fontSize: '.68rem', fontWeight: 700, padding: '.15rem .5rem', borderRadius: 999, textTransform: 'uppercase', letterSpacing: '.05em' };
}

function Shell({ children }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: `linear-gradient(160deg, ${COLORS.forest}, ${COLORS.forestDark})`,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '2.5rem 1rem',
        fontFamily: '"DM Sans", system-ui, sans-serif',
      }}
    >
      {children}
    </div>
  );
}

const h1 = { fontFamily: '"Playfair Display", Georgia, serif', fontSize: '1.6rem', color: COLORS.forest, margin: 0, fontStyle: 'italic' };
const card = { width: '100%', maxWidth: 420, background: '#fff', borderRadius: 16, padding: '2rem', boxShadow: '0 20px 60px rgba(0,0,0,.25)' };
const reviewCard = { width: '100%', background: '#fff', borderRadius: 14, padding: '1.2rem', marginBottom: '1rem', boxShadow: '0 8px 30px rgba(0,0,0,.15)' };
const input = { width: '100%', padding: '.75rem .9rem', borderRadius: 10, border: `1px solid ${COLORS.line}`, fontSize: '1rem', boxSizing: 'border-box', fontFamily: 'inherit' };
const textarea = { ...input, resize: 'vertical', lineHeight: 1.5 };
const btn = { background: COLORS.forest, color: '#fff', border: 0, borderRadius: 999, padding: '.6rem 1.1rem', fontWeight: 700, fontSize: '.9rem', cursor: 'pointer', fontFamily: 'inherit' };
const logoutBtn = { background: 'rgba(245,240,232,.12)', color: COLORS.cream, border: '1px solid rgba(245,240,232,.3)', borderRadius: 999, padding: '.5rem 1rem', fontSize: '.85rem', cursor: 'pointer', fontFamily: 'inherit' };
const tabBtn = { border: '1px solid', borderRadius: 999, padding: '.4rem .9rem', fontSize: '.82rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' };
