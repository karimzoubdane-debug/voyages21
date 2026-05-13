"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.replace("/login");
      return;
    }
    setEmail(localStorage.getItem("email") || "");
    setFirstName(localStorage.getItem("firstName") || "");
  }, [router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    if (newPassword.length < 8) {
      setError("Le nouveau mot de passe doit faire au moins 8 caractères");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("accessToken") || "",
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erreur");
        setLoading(false);
        return;
      }
      setSuccess("Mot de passe mis à jour");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setError("Erreur réseau");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <button
        type="button"
        className="btn-ghost"
        style={{ padding: "6px 12px", marginBottom: 16 }}
        onClick={() => router.push("/dashboard")}
      >
        ← Retour
      </button>
      <h1 style={{ marginBottom: 24 }}>Mon profil</h1>

      <div className="card stack" style={{ maxWidth: 520, marginBottom: 24 }}>
        <div>
          <div className="label">Email</div>
          <div>{email}</div>
        </div>
        <div>
          <div className="label">Prénom</div>
          <div>{firstName}</div>
        </div>
      </div>

      <form className="card stack" onSubmit={handleSubmit} style={{ maxWidth: 520 }}>
        <h3>Changer mon mot de passe</h3>
        <div>
          <label className="label" htmlFor="current">Mot de passe actuel</label>
          <input
            id="current"
            type="password"
            className="input"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <div>
          <label className="label" htmlFor="new">Nouveau mot de passe</label>
          <input
            id="new"
            type="password"
            className="input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={8}
            autoComplete="new-password"
          />
        </div>
        <div>
          <label className="label" htmlFor="confirm">Confirmer</label>
          <input
            id="confirm"
            type="password"
            className="input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Mise à jour..." : "Mettre à jour"}
        </button>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
      </form>
    </div>
  );
}
