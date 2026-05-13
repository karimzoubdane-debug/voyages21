"use client";

import { useState } from "react";

export default function AdminPanelPage() {
  const [adminKey, setAdminKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState("");

  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [tokenLimit, setTokenLimit] = useState(100000);
  const [notes, setNotes] = useState("");
  const [created, setCreated] = useState(null);

  async function refresh(key = adminKey) {
    setLoading(true);
    try {
      const [usersRes, statsRes] = await Promise.all([
        fetch("/api/admin/users", { headers: { "x-admin-key": key } }),
        fetch("/api/admin/usage", { headers: { "x-admin-key": key } }),
      ]);
      if (usersRes.status === 401 || usersRes.status === 403) {
        setError("Clé admin invalide");
        setAuthed(false);
        return;
      }
      const u = await usersRes.json();
      const s = await statsRes.json();
      setUsers(u.users || []);
      setStats(s);
      setError("");
    } catch {
      setError("Erreur réseau");
    } finally {
      setLoading(false);
    }
  }

  async function handleAuth(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users", {
        headers: { "x-admin-key": adminKey },
      });
      if (res.status === 401 || res.status === 403) {
        setError("Clé admin invalide");
        setLoading(false);
        return;
      }
      setAuthed(true);
      await refresh(adminKey);
    } catch {
      setError("Erreur réseau");
      setLoading(false);
    }
  }

  function generateRandomPassword() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
    let result = "";
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
  }

  async function handleCreate(e) {
    e.preventDefault();
    setError("");
    setCreated(null);
    try {
      const res = await fetch("/api/admin/generate-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({
          email,
          firstName,
          password,
          tokenLimit: Number(tokenLimit),
          notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erreur");
        return;
      }
      setCreated({ ...data, password });
      setEmail("");
      setFirstName("");
      setPassword("");
      setNotes("");
      setTokenLimit(100000);
      await refresh();
    } catch {
      setError("Erreur réseau");
    }
  }

  async function handleRevoke(userEmail) {
    if (!confirm(`Révoquer l'accès de ${userEmail} ?`)) return;
    await fetch("/api/admin/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey,
      },
      body: JSON.stringify({ email: userEmail, action: "revoke" }),
    });
    await refresh();
  }

  async function handleReactivate(userEmail) {
    await fetch("/api/admin/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey,
      },
      body: JSON.stringify({ email: userEmail, action: "reactivate" }),
    });
    await refresh();
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
  }

  if (!authed) {
    return (
      <main className="center-screen">
        <form onSubmit={handleAuth} className="card stack" style={{ width: "100%", maxWidth: 420 }}>
          <h2 style={{ marginBottom: 8 }}>Panel administrateur</h2>
          <p className="muted" style={{ fontSize: "0.875rem" }}>
            Entrez la clé administrateur pour accéder au panel.
          </p>
          <div>
            <label className="label" htmlFor="key">Clé admin</label>
            <input
              id="key"
              type="password"
              className="input"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              required
              autoFocus
            />
          </div>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Vérification..." : "Entrer"}
          </button>
          {error && <div className="error">{error}</div>}
        </form>
      </main>
    );
  }

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
        <h1>Administration</h1>
        <button className="btn-ghost" onClick={() => { setAuthed(false); setAdminKey(""); }}>
          Verrouiller
        </button>
      </div>

      {stats && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 32 }}>
          <StatCard label="Utilisateurs actifs" value={stats.activeUsers} />
          <StatCard label="Tokens consommés (total)" value={(stats.totalTokensUsed || 0).toLocaleString()} />
          <StatCard label="Coût estimé" value={`$${(stats.estimatedCostUSD || 0).toFixed(4)}`} />
          <StatCard label="Utilisateurs total" value={stats.totalUsers} />
        </div>
      )}

      <section className="card stack" style={{ marginBottom: 32 }}>
        <h2>Créer un nouvel accès</h2>
        <form onSubmit={handleCreate} className="stack">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label className="label">Email</label>
              <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="label">Prénom</label>
              <input className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8, alignItems: "flex-end" }}>
            <div>
              <label className="label">Mot de passe (à transmettre au client)</label>
              <input className="input" type="text" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
            </div>
            <button type="button" className="btn-secondary" onClick={generateRandomPassword} style={{ height: 42 }}>
              Générer
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label className="label">Limite de tokens / mois</label>
              <input className="input" type="number" min={1000} value={tokenLimit} onChange={(e) => setTokenLimit(e.target.value)} required />
            </div>
            <div>
              <label className="label">Notes (optionnel)</label>
              <input className="input" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Ex: Virement reçu 13/05" />
            </div>
          </div>
          <button type="submit" className="btn">Créer le compte</button>
          {error && <div className="error">{error}</div>}
        </form>

        {created && (
          <div style={{ background: "var(--accent-soft)", padding: 16, borderRadius: 10, marginTop: 12 }}>
            <strong>Compte créé pour {created.email}</strong>
            <div style={{ marginTop: 12 }}>
              <div className="label">Identifiants à transmettre au client</div>
              <div style={{ fontFamily: "monospace", background: "var(--surface)", padding: 12, borderRadius: 8, marginBottom: 8 }}>
                Email : {created.email}<br />
                Mot de passe : {created.password}<br />
                URL de connexion : {created.loginUrl}
              </div>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => copyToClipboard(
                  `Email: ${created.email}\nMot de passe: ${created.password}\nURL: ${created.loginUrl}`
                )}
              >
                Copier
              </button>
            </div>
          </div>
        )}
      </section>

      <section>
        <h2 style={{ marginBottom: 16 }}>Utilisateurs</h2>
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Prénom</th>
                <th>Tokens</th>
                <th>État</th>
                <th>Reset</th>
                <th>Notes</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && (
                <tr><td colSpan={7} style={{ textAlign: "center", padding: 24 }} className="muted">Aucun utilisateur</td></tr>
              )}
              {users.map((u) => (
                <tr key={u.email}>
                  <td>{u.email}</td>
                  <td>{u.firstName}</td>
                  <td>
                    {u.tokensUsed.toLocaleString()} / {u.tokensLimit.toLocaleString()}
                    <div className="progress" style={{ marginTop: 4, width: 120 }}>
                      <div className="progress-bar" style={{ width: `${Math.min(100, (u.tokensUsed / u.tokensLimit) * 100)}%` }} />
                    </div>
                  </td>
                  <td>
                    {u.paid ? <span className="badge badge-success">Actif</span> : <span className="badge badge-danger">Révoqué</span>}
                  </td>
                  <td style={{ fontSize: "0.85rem" }}>{u.resetDate ? new Date(u.resetDate).toLocaleDateString("fr-FR") : "-"}</td>
                  <td style={{ fontSize: "0.85rem" }} className="muted">{u.notes || "-"}</td>
                  <td>
                    {u.paid ? (
                      <button className="btn-ghost" style={{ color: "var(--danger)", padding: "4px 10px" }} onClick={() => handleRevoke(u.email)}>
                        Révoquer
                      </button>
                    ) : (
                      <button className="btn-ghost" style={{ color: "var(--success)", padding: "4px 10px" }} onClick={() => handleReactivate(u.email)}>
                        Réactiver
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="card">
      <div className="label">{label}</div>
      <div style={{ fontSize: "1.75rem", fontFamily: "var(--font-serif)", fontWeight: 500 }}>{value}</div>
    </div>
  );
}
