"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  prompt: string;
  status: string;
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-500/20 text-yellow-400",
  PROCESSING: "bg-blue-500/20 text-blue-400",
  DONE: "bg-green-500/20 text-green-400",
  ERROR: "bg-red-500/20 text-red-400",
};

export default function DashboardPage() {
  const { user } = useUser();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", prompt: "", sourceUrl: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => { setProjects(data); setLoading(false); });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const project = await res.json();
    setProjects((prev) => [project, ...prev]);
    setForm({ name: "", prompt: "", sourceUrl: "" });
    setShowForm(false);
    setSubmitting(false);
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Reels<span className="text-violet-500">App</span></h1>
        <span className="text-gray-400 text-sm">{user?.emailAddresses[0]?.emailAddress}</span>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">Mes projets</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-lg font-medium transition"
          >
            + Nouveau projet
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8 space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Nom du projet</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-violet-500"
                placeholder="Ex: Maroc 12 jours juin 2026"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Prompt IA</label>
              <textarea
                required
                value={form.prompt}
                onChange={(e) => setForm({ ...form, prompt: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-violet-500 h-24 resize-none"
                placeholder="Ex: Voyage au Maroc 12 jours, désert, médinas, famille, tout inclus"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">URL du programme (optionnel)</label>
              <input
                type="url"
                value={form.sourceUrl}
                onChange={(e) => setForm({ ...form, sourceUrl: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-violet-500"
                placeholder="https://votreagence.com/programme-maroc"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg font-medium transition disabled:opacity-50"
              >
                {submitting ? "Lancement..." : "Lancer l'analyse"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-white px-4 py-2 transition"
              >
                Annuler
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <p className="text-gray-500">Chargement...</p>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 text-gray-600">
            <p className="text-lg">Aucun projet pour l'instant.</p>
            <p className="text-sm mt-2">Créez votre premier projet pour commencer.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {projects.map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.id}`}
                className="bg-gray-900 border border-gray-800 hover:border-violet-600 rounded-xl p-5 transition group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-violet-400 transition">{p.name}</h3>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-1">{p.prompt}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${STATUS_COLORS[p.status] ?? "bg-gray-700 text-gray-400"}`}>
                    {p.status}
                  </span>
                </div>
                <p className="text-gray-600 text-xs mt-3">
                  {new Date(p.createdAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}
                </p>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
