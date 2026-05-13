"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AccessInner() {
  const router = useRouter();
  const params = useSearchParams();
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    const token = params.get("token");
    if (!token) {
      setStatus("invalid");
      return;
    }
    fetch("/api/verify-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (!data.valid) {
          setStatus("invalid");
          return;
        }
        localStorage.setItem("accessToken", token);
        localStorage.setItem("firstName", data.firstName || "");
        localStorage.setItem("email", data.email || "");
        router.replace("/dashboard");
      })
      .catch(() => setStatus("invalid"));
  }, [params, router]);

  return (
    <main className="center-screen">
      <div className="card" style={{ textAlign: "center", maxWidth: 420 }}>
        {status === "verifying" && (
          <>
            <h2>Vérification...</h2>
            <p className="muted" style={{ marginTop: 8 }}>Activation de votre accès en cours</p>
          </>
        )}
        {status === "invalid" && (
          <>
            <h2>Lien invalide ou expiré</h2>
            <p className="muted" style={{ marginTop: 8 }}>
              Ce lien n'est plus valide. Contactez l'administrateur pour obtenir un nouvel accès.
            </p>
            <button className="btn" style={{ marginTop: 16 }} onClick={() => router.push("/login")}>
              Aller à la connexion
            </button>
          </>
        )}
      </div>
    </main>
  );
}

export default function AccessPage() {
  return (
    <Suspense fallback={<main className="center-screen"><div className="card">Chargement...</div></main>}>
      <AccessInner />
    </Suspense>
  );
}
