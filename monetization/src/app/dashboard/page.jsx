"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [tokensUsed, setTokensUsed] = useState(0);
  const [tokensLimit, setTokensLimit] = useState(0);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.replace("/login");
      return;
    }
    setFirstName(localStorage.getItem("firstName") || "");
    fetch("/api/verify-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (!data.valid) {
          localStorage.clear();
          router.replace("/login");
          return;
        }
        setTokensUsed(data.tokensUsed || 0);
        setTokensLimit(data.tokensLimit || 0);
      })
      .catch(() => {
        setError("Erreur de connexion");
      });
  }, [router]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  function handleLogout() {
    localStorage.clear();
    router.push("/login");
  }

  async function handleSend(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;
    setError("");
    setSending(true);
    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("accessToken") || "",
        },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();

      if (res.status === 401) {
        localStorage.clear();
        router.replace("/login");
        return;
      }
      if (res.status === 403) {
        setError(data.error || "Accès suspendu, contactez l'administrateur");
        setMessages(newMessages);
        setSending(false);
        return;
      }
      if (res.status === 429) {
        setError(
          `Limite mensuelle atteinte (${data.tokensUsed}/${data.tokensLimit} tokens). Contactez l'administrateur pour renouveler.`,
        );
        setTokensUsed(data.tokensUsed);
        setTokensLimit(data.tokensLimit);
        setSending(false);
        return;
      }
      if (!res.ok) {
        setError(data.error || "Erreur");
        setSending(false);
        return;
      }
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
      setTokensUsed(data.tokensUsed);
      setTokensLimit(data.tokensLimit);
    } catch {
      setError("Erreur réseau");
    } finally {
      setSending(false);
    }
  }

  const usagePercent = tokensLimit
    ? Math.min(100, Math.round((tokensUsed / tokensLimit) * 100))
    : 0;

  const isEmpty = messages.length === 0;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header
        style={{
          padding: "16px 24px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "var(--bg-elevated)",
        }}
      >
        <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", fontWeight: 500 }}>
          Espace personnel
        </div>
        <div className="row">
          <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
            {tokensUsed.toLocaleString()} / {tokensLimit.toLocaleString()} tokens
          </div>
          <div className="progress" style={{ width: 100 }}>
            <div className="progress-bar" style={{ width: `${usagePercent}%` }} />
          </div>
          <button
            type="button"
            className="btn-ghost"
            style={{ padding: "6px 12px", fontSize: "0.875rem", borderRadius: 8 }}
            onClick={() => router.push("/profile")}
          >
            Profil
          </button>
          <button
            type="button"
            className="btn-ghost"
            style={{ padding: "6px 12px", fontSize: "0.875rem", borderRadius: 8 }}
            onClick={handleLogout}
          >
            Déconnexion
          </button>
        </div>
      </header>

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "24px",
          overflow: "hidden",
        }}
      >
        {isEmpty ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: 720,
              width: "100%",
              textAlign: "center",
              padding: "0 16px",
            }}
          >
            <h1 style={{ fontSize: "2.75rem", marginBottom: 12 }}>
              Bonjour {firstName || ""}
            </h1>
            <p
              style={{
                fontSize: "1.25rem",
                color: "var(--text-secondary)",
                marginBottom: 40,
                fontFamily: "var(--font-serif)",
              }}
            >
              Sur quoi allons-nous travailler aujourd'hui&nbsp;?
            </p>
            <form onSubmit={handleSend} style={{ width: "100%" }}>
              <ChatComposer
                input={input}
                setInput={setInput}
                sending={sending}
                large
              />
            </form>
            {error && <div className="error" style={{ marginTop: 16 }}>{error}</div>}
          </div>
        ) : (
          <>
            <div
              ref={scrollRef}
              style={{
                flex: 1,
                width: "100%",
                maxWidth: 760,
                overflowY: "auto",
                padding: "16px 0",
              }}
            >
              {messages.map((m, i) => (
                <Message key={i} role={m.role} content={m.content} />
              ))}
              {sending && (
                <div style={{ color: "var(--text-muted)", padding: "8px 0", fontStyle: "italic" }}>
                  Claude réfléchit...
                </div>
              )}
            </div>
            <form onSubmit={handleSend} style={{ width: "100%", maxWidth: 760, marginTop: 12 }}>
              <ChatComposer input={input} setInput={setInput} sending={sending} />
            </form>
            {error && <div className="error" style={{ marginTop: 8, maxWidth: 760, width: "100%" }}>{error}</div>}
          </>
        )}
      </main>
    </div>
  );
}

function ChatComposer({ input, setInput, sending, large }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        background: "var(--surface)",
        border: "1px solid var(--border-strong)",
        borderRadius: 16,
        padding: 8,
        boxShadow: "var(--shadow)",
        gap: 8,
      }}
    >
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={large ? "Écrivez un message..." : "Continuer la conversation..."}
        rows={large ? 3 : 2}
        style={{
          flex: 1,
          padding: "10px 12px",
          border: "none",
          outline: "none",
          resize: "none",
          background: "transparent",
          fontFamily: "inherit",
          fontSize: large ? "1.05rem" : "1rem",
          lineHeight: 1.5,
          maxHeight: 240,
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            e.currentTarget.form?.requestSubmit();
          }
        }}
        disabled={sending}
      />
      <button
        type="submit"
        className="btn"
        style={{ padding: "10px 16px", borderRadius: 10 }}
        disabled={sending || !input.trim()}
      >
        Envoyer
      </button>
    </div>
  );
}

function Message({ role, content }) {
  const isUser = role === "user";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: 12,
      }}
    >
      <div
        style={{
          maxWidth: "85%",
          padding: "12px 16px",
          borderRadius: 14,
          background: isUser ? "var(--accent-soft)" : "var(--surface)",
          border: isUser ? "none" : "1px solid var(--border)",
          color: "var(--text)",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          lineHeight: 1.55,
        }}
      >
        {content}
      </div>
    </div>
  );
}
