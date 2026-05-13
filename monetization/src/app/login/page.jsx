"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Identifiants invalides");
        setLoading(false);
        return;
      }
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("firstName", data.firstName || "");
      localStorage.setItem("email", data.email || "");
      router.push("/dashboard");
    } catch {
      setError("Erreur réseau, réessayez");
      setLoading(false);
    }
  }

  return (
    <main className="center-screen">
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 style={{ marginBottom: 8 }}>Bienvenue</h1>
          <p className="muted">Connectez-vous à votre espace personnel</p>
        </div>
        <form onSubmit={handleSubmit} className="card stack">
          <div>
            <label className="label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              autoFocus
            />
          </div>
          <div>
            <label className="label" htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>
          {error && <div className="error">{error}</div>}
        </form>
        <p
          className="muted"
          style={{ textAlign: "center", marginTop: 20, fontSize: "0.875rem" }}
        >
          Pas encore de compte ? Contactez l'administrateur.
        </p>
      </div>
    </main>
  );
}
