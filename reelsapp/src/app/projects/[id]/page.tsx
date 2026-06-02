"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Video {
  id: string;
  title: string;
  channelName: string;
  duration: number;
  viewCount: string;
  likeCount: string;
  viralityScore: number;
  thumbnailUrl: string;
  status: string;
}

interface Project {
  id: string;
  name: string;
  prompt: string;
  sourceUrl?: string;
  status: string;
  videos: Video[];
}

function formatDuration(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function ProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then((r) => r.json())
      .then((data) => { setProject(data); setLoading(false); });
  }, [id]);

  if (loading) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-400">Chargement...</div>;
  if (!project) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-red-400">Projet introuvable.</div>;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <Link href="/dashboard" className="text-gray-400 hover:text-white text-sm transition">← Dashboard</Link>
        <h1 className="text-xl font-bold">{project.name}</h1>
        <span className="text-xs bg-violet-500/20 text-violet-400 px-2 py-1 rounded-full">{project.status}</span>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-8">
          <p className="text-gray-400 text-sm mb-1">Prompt</p>
          <p className="text-white">{project.prompt}</p>
          {project.sourceUrl && (
            <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-violet-400 text-sm mt-2 inline-block hover:underline">
              {project.sourceUrl}
            </a>
          )}
        </div>

        <h2 className="text-xl font-semibold mb-4">Vidéos analysées ({project.videos?.length ?? 0})</h2>

        {project.status === "PROCESSING" && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6 text-blue-400 text-sm">
            Analyse en cours — les vidéos apparaîtront automatiquement.
          </div>
        )}

        <div className="grid gap-4">
          {(project.videos ?? []).map((v) => (
            <div key={v.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex gap-4">
              {v.thumbnailUrl && (
                <img src={v.thumbnailUrl} alt={v.title} className="w-32 h-20 object-cover rounded-lg flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-white line-clamp-2">{v.title}</h3>
                <p className="text-gray-500 text-sm mt-1">{v.channelName} · {formatDuration(v.duration)}</p>
                <div className="flex gap-4 mt-2 text-sm text-gray-400">
                  <span>{Number(v.viewCount).toLocaleString("fr-FR")} vues</span>
                  <span>{Number(v.likeCount).toLocaleString("fr-FR")} likes</span>
                  <span className="text-violet-400 font-medium">Score viralité : {v.viralityScore}</span>
                </div>
              </div>
              <div className="flex-shrink-0 flex items-center">
                <button className="bg-violet-600 hover:bg-violet-700 text-white text-sm px-4 py-2 rounded-lg transition">
                  Générer clips
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
