'use client';

import { useEffect, useState } from 'react';

const COLORS = {
  forest: '#1B3A28',
  forestDark: '#152E1F',
  gold: '#C8A440',
  cream: '#F5F0E8',
  ink: '#23211c',
  line: '#e6ddcc',
  danger: '#b3261e',
  ok: '#1f7a3d',
};

const TOOLS = {
  produits: { href: '/admin-produits.html', icon: '🗂️', title: 'Admin Produits', desc: 'Ajouter, modifier, retirer des voyages' },
  cover: { href: '/admin-cover.html', icon: '📕', title: 'Cover Magazine', desc: 'Gérer les couvertures du site' },
  fiche: { href: '/formulaire-voyage.html', icon: '📝', title: 'Fiche Voyages', desc: 'Préparer une fiche voyage' },
  medias: { href: '/admin-medias.html', icon: '🖼️', title: 'Gestion des médias', desc: 'Photos et vidéos des voyages' },
};

export default function AdminPortal() {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const [configured, setConfigured] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  // Réinitialisation par code de secours
  const [showReset, setShowReset] = useState(false);
  const [recoveryCode, setRecoveryCode] = useState('');
  const [resetPw, setResetPw] = useState('');
  const [resetMsg, setResetMsg] = useState('');

  // Réglages propriétaire
  const [cfg, setCfg] = useState({ teamOpen: false, teamPasswordSet: false });
  const [newTeamPw, setNewTeamPw] = useState('');
  const [cfgMsg, setCfgMsg] = useState('');

  async function loadSession() {
    try {
      const r = await fetch('/api/admin-auth', { cache: 'no-store' });
      const d = await r.json();
      setRole(d.role || null);
      setConfigured(d.configured !== false);
      if (d.role === 'owner') await loadConfig();
    } catch {
      setRole(null);
    } finally {
      setLoading(false);
    }
  }

  async function loadConfig() {
    try {
      const r = await fetch('/api/admin-config', { cache: 'no-store' });
      if (r.ok) {
        const d = await r.json();
        setCfg({ teamOpen: !!d.teamOpen, teamPasswordSet: !!d.teamPasswordSet });
      }
    } catch {
      /* ignore */
    }
  }

  useEffect(() => {
    loadSession();
  }, []);

  async function submitLogin(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const r = await fetch('/api/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const d = await r.json();
      if (d.ok) {
        setPassword('');
        setRole(d.role);
        if (d.role === 'owner') await loadConfig();
      } else {
        setError(d.error || 'Connexion refusée');
      }
    } catch {
      setError('Erreur réseau');
    } finally {
      setBusy(false);
    }
  }

  async function submitReset(e) {
    e.preventDefault();
    setResetMsg('Vérification…');
    try {
      const r = await fetch('/api/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reset: true, recoveryCode, newPassword: resetPw }),
      });
      const d = await r.json();
      if (d.ok) {
        setResetMsg('✅ Mot de passe changé. Connectez-vous avec le nouveau.');
        setRecoveryCode('');
        setResetPw('');
        setTimeout(() => { setShowReset(false); setResetMsg(''); }, 2500);
      } else {
        setResetMsg('❌ ' + (d.error || 'Échec'));
      }
    } catch {
      setResetMsg('❌ Erreur réseau');
    }
  }

  async function logout() {
    await fetch('/api/admin-auth', { method: 'DELETE' });
    setRole(null);
  }

  async function saveConfig(patch, okMsg) {
    setCfgMsg('Enregistrement…');
    try {
      const r = await fetch('/api/admin-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      });
      const d = await r.json();
      if (d.ok) {
        setCfg({ teamOpen: !!d.teamOpen, teamPasswordSet: !!d.teamPasswordSet });
        setCfgMsg(okMsg || '✅ Enregistré');
      } else {
        setCfgMsg('❌ ' + (d.error || 'erreur'));
      }
    } catch {
      setCfgMsg('❌ Erreur réseau');
    }
  }

  function setTeamPassword(e) {
    e.preventDefault();
    if (!newTeamPw.trim()) return;
    saveConfig({ teamPassword: newTeamPw.trim() }, '✅ Mot de passe équipe enregistré');
    setNewTeamPw('');
  }

  // ---- Rendu ----
  if (loading) {
    return (
      <Shell>
        <p style={{ color: COLORS.cream, opacity: 0.8 }}>Chargement…</p>
      </Shell>
    );
  }

  if (!role) {
    return (
      <Shell>
        <div style={card}>
          <h1 style={h1}>Espace privé</h1>
          <p style={{ color: '#6b6457', margin: '0 0 1.2rem', fontSize: '.95rem' }}>
            Entrez votre mot de passe pour accéder à votre espace.
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
            {error ? <div style={{ color: COLORS.danger, fontSize: '.88rem', marginTop: '.6rem' }}>{error}</div> : null}
            <button type="submit" disabled={busy} style={{ ...btn, marginTop: '1rem', width: '100%' }}>
              {busy ? '…' : 'Entrer'}
            </button>
          </form>

          {!showReset ? (
            <button
              type="button"
              onClick={() => { setShowReset(true); setError(''); }}
              style={{ background: 'none', border: 0, color: COLORS.gold, fontSize: '.82rem', marginTop: '.9rem', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}
            >
              Mot de passe oublié ?
            </button>
          ) : (
            <form onSubmit={submitReset} style={{ marginTop: '1.1rem', borderTop: `1px solid ${COLORS.line}`, paddingTop: '1rem' }}>
              <div style={{ fontWeight: 700, color: COLORS.forest, fontSize: '.92rem', marginBottom: '.5rem' }}>Réinitialiser le mot de passe</div>
              <input
                type="text"
                value={recoveryCode}
                onChange={(e) => setRecoveryCode(e.target.value)}
                placeholder="Code de secours"
                style={input}
              />
              <input
                type="password"
                value={resetPw}
                onChange={(e) => setResetPw(e.target.value)}
                placeholder="Nouveau mot de passe"
                style={{ ...input, marginTop: '.6rem' }}
              />
              {resetMsg ? <div style={{ fontSize: '.85rem', marginTop: '.6rem', color: COLORS.forest }}>{resetMsg}</div> : null}
              <div style={{ display: 'flex', gap: '.5rem', marginTop: '.9rem' }}>
                <button type="submit" style={{ ...btn, flex: 1 }}>Changer</button>
                <button type="button" onClick={() => { setShowReset(false); setResetMsg(''); }} style={{ ...btn, background: 'transparent', color: COLORS.ink, border: `1px solid ${COLORS.line}` }}>Annuler</button>
              </div>
            </form>
          )}

          {!configured ? (
            <div style={demoBanner}>
              ⚠️ Mode démo : sécurité non encore configurée. Définissez <code>V21_OWNER_PASSWORD</code>,{' '}
              <code>V21_AUTH_SECRET</code> et <code>V21_RECOVERY_CODE</code> dans Vercel avant la mise en production.
            </div>
          ) : null}
        </div>
      </Shell>
    );
  }

  const isOwner = role === 'owner';
  const tools = isOwner ? [TOOLS.produits, TOOLS.cover, TOOLS.fiche, TOOLS.medias] : [TOOLS.produits, TOOLS.cover, TOOLS.medias];

  return (
    <Shell>
      <div style={{ width: '100%', maxWidth: 760 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.4rem', flexWrap: 'wrap', gap: '.6rem' }}>
          <div>
            <div style={{ color: COLORS.gold, letterSpacing: '.12em', fontSize: '.72rem', fontWeight: 700 }}>VOYAGES 21</div>
            <h1 style={{ ...h1, color: COLORS.cream, margin: '.2rem 0 0' }}>
              {isOwner ? 'Votre espace' : 'Espace équipe'}
            </h1>
          </div>
          <button onClick={logout} style={logoutBtn}>Se déconnecter</button>
        </div>

        <div style={grid}>
          {tools.map((t) => (
            <a key={t.href} href={t.href} style={toolCard}>
              <span style={{ fontSize: '1.8rem' }}>{t.icon}</span>
              <span style={{ fontWeight: 700, color: COLORS.forest, fontSize: '1.05rem' }}>{t.title}</span>
              <span style={{ color: '#6b6457', fontSize: '.85rem' }}>{t.desc}</span>
            </a>
          ))}
        </div>

        {isOwner ? (
          <div style={{ ...card, marginTop: '1.4rem', maxWidth: 'none' }}>
            <h2 style={{ ...h1, fontSize: '1.15rem', margin: '0 0 1rem' }}>Accès de l'équipe</h2>

            {/* Interrupteur ouvert / fermé */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontWeight: 700, color: COLORS.ink }}>
                  État : {cfg.teamOpen ? <span style={{ color: COLORS.ok }}>🟢 Ouvert</span> : <span style={{ color: COLORS.danger }}>🔴 Fermé</span>}
                </div>
                <div style={{ fontSize: '.82rem', color: '#6b6457' }}>
                  {cfg.teamOpen ? 'Votre équipe peut se connecter.' : 'Votre équipe ne peut pas se connecter.'}
                </div>
              </div>
              <button
                onClick={() => saveConfig({ teamOpen: !cfg.teamOpen }, cfg.teamOpen ? '🔴 Accès équipe fermé' : '🟢 Accès équipe ouvert')}
                style={cfg.teamOpen ? { ...btn, background: COLORS.danger } : { ...btn, background: COLORS.ok }}
              >
                {cfg.teamOpen ? 'Fermer l’accès' : 'Ouvrir l’accès'}
              </button>
            </div>

            <hr style={{ border: 0, borderTop: `1px solid ${COLORS.line}`, margin: '1.1rem 0' }} />

            {/* Mot de passe équipe */}
            <div style={{ fontWeight: 700, color: COLORS.ink }}>
              Mot de passe équipe : {cfg.teamPasswordSet ? <span style={{ color: COLORS.ok }}>défini ✓</span> : <span style={{ color: COLORS.danger }}>non défini</span>}
            </div>
            <div style={{ fontSize: '.82rem', color: '#6b6457', margin: '.2rem 0 .7rem' }}>
              C'est le code à communiquer à votre équipe. Vous pouvez le changer à tout moment.
            </div>
            <form onSubmit={setTeamPassword} style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
              <input
                type="text"
                value={newTeamPw}
                onChange={(e) => setNewTeamPw(e.target.value)}
                placeholder={cfg.teamPasswordSet ? 'Nouveau mot de passe équipe…' : 'Définir le mot de passe équipe…'}
                style={{ ...input, flex: 1, minWidth: 200, marginTop: 0 }}
              />
              <button type="submit" style={btn}>{cfg.teamPasswordSet ? 'Changer' : 'Définir'}</button>
            </form>

            {cfgMsg ? <div style={{ marginTop: '.8rem', fontSize: '.88rem', color: COLORS.forest }}>{cfgMsg}</div> : null}

            {!cfg.teamPasswordSet || !cfg.teamOpen ? (
              <div style={{ ...demoBanner, background: '#fff7e6', borderColor: COLORS.gold, color: '#7a5d12' }}>
                ℹ️ Pour que votre équipe puisse se connecter : définissez un mot de passe équipe <b>et</b> mettez l'accès sur 🟢 Ouvert.
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </Shell>
  );
}

function Shell({ children }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: `linear-gradient(160deg, ${COLORS.forest}, ${COLORS.forestDark})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        fontFamily: '"DM Sans", system-ui, sans-serif',
      }}
    >
      {children}
    </div>
  );
}

const card = {
  background: '#fff',
  borderRadius: 16,
  padding: '2rem',
  width: '100%',
  maxWidth: 420,
  boxShadow: '0 18px 50px rgba(0,0,0,.28)',
};

const h1 = {
  fontFamily: '"Playfair Display", Georgia, serif',
  fontStyle: 'italic',
  color: COLORS.forest,
  fontSize: '1.7rem',
  margin: 0,
};

const input = {
  width: '100%',
  boxSizing: 'border-box',
  border: `1px solid ${COLORS.line}`,
  borderRadius: 9,
  padding: '.75rem .9rem',
  fontSize: '1rem',
  fontFamily: 'inherit',
  outline: 'none',
};

const btn = {
  border: 0,
  borderRadius: 9,
  padding: '.7rem 1.2rem',
  background: COLORS.forest,
  color: '#fff',
  fontWeight: 700,
  fontSize: '.95rem',
  cursor: 'pointer',
  fontFamily: 'inherit',
};

const logoutBtn = {
  border: `1px solid rgba(245,240,232,.4)`,
  borderRadius: 9,
  padding: '.5rem 1rem',
  background: 'transparent',
  color: COLORS.cream,
  fontWeight: 600,
  fontSize: '.85rem',
  cursor: 'pointer',
  fontFamily: 'inherit',
};

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '.9rem',
};

const toolCard = {
  background: '#fff',
  borderRadius: 14,
  padding: '1.3rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '.4rem',
  textDecoration: 'none',
  boxShadow: '0 10px 30px rgba(0,0,0,.18)',
  transition: 'transform .12s',
};

const demoBanner = {
  marginTop: '1.2rem',
  background: '#fdeceb',
  border: `1px solid ${COLORS.danger}`,
  borderRadius: 9,
  padding: '.7rem .8rem',
  fontSize: '.8rem',
  color: '#7a1f1a',
  lineHeight: 1.45,
};
