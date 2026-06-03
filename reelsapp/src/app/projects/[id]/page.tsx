"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Clip {
  id: string;
  videoId: string;
  platform: string;
  startTime: number;
  endTime: number;
  status: string;
  outputPath: string | null;
  subtitle: string | null;
}

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
  clips: Clip[];
}

function formatDuration(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec) % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const PLATFORM_LABELS: Record<string, string> = {
  YOUTUBE_SHORT: "YouTube Short",
  INSTAGRAM_REEL: "Instagram Reel",
  TIKTOK: "TikTok",
};

const STATUS_STYLES: Record<string, string> = {
  PENDING: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
  GENERATING: "text-blue-400 bg-blue-500/10 border-blue-500/30",
  DONE: "text-green-400 bg-green-500/10 border-green-500/30",
  ERROR: "text-red-400 bg-red-500/10 border-red-500/30",
};

export default function ProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState<Record<string, boolean>>({});
  const pollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchAndSchedule = useCallback(async () => {
    const res = await fetch(`/api/projects/${id}`);
    const data: Project = await res.json();
    setProject(data);
    setLoading(false);

    const hasInProgress = data.clips?.some(
      (c) => c.status === "PENDING" || c.status === "GENERATING"
    );
    const hasProjectInProgress = data.status === "PENDING" || data.status === "PROCESSING";
    if (hasInProgress || hasProjectInProgress) {
      pollTimeout.current = setTimeout(fetchAndSchedule, 3000);
    }
  }, [id]);

  useEffect(() => {
    fetchAndSchedule();
    return () => {
      if (pollTimeout.current) clearTimeout(pollTimeout.current);
    };
  }, [fetchAndSchedule]);

  const handleGenerateClips = async (videoId: string) => {
    setGenerating((prev) => ({ ...prev, [videoId]: true }));
    try {
      await fetch("/api/clips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId }),
      });
      await fetchAndSchedule();
    } finally {
      setGenerating((prev) => ({ ...prev, [videoId]: false }));
    }
  };

  const handleRetryClips = async (videoId: string) => {
    setGenerating((prev) => ({ ...prev, [videoId]: true }));
    try {
      await fetch("/api/clips/retry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId }),
      });
      await fetchAndSchedule();
    } finally {
      setGenerating((prev) => ({ ...prev, [videoId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-400">
        Chargement...
      </div>
    );
  }
  if (!project) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-red-400">
        Projet introuvable.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <Link href="/dashboard" className="text-gray-400 hover:text-white text-sm transition">
          ← Dashboard
        </Link>
        <h1 className="text-xl font-bold">{project.name}</h1>
        <span className="text-xs bg-violet-500/20 text-violet-400 px-2 py-1 rounded-full">
          {project.status}
        </span>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-8">
          <p className="text-gray-400 text-sm mb-1">Prompt</p>
          <p className="text-white">{project.prompt}</p>
          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 text-sm mt-2 inline-block hover:underline"
            >
              {project.sourceUrl}
            </a>
          )}
        </div>

        <h2 className="text-xl font-semibold mb-4">
          Vidéos analysées ({project.videos?.length ?? 0})
        </h2>

        {project.status === "PROCESSING" && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6 text-blue-400 text-sm">
            Analyse en cours — les vidéos apparaîtront automatiquement.
          </div>
        )}

        <div className="grid gap-6">
          {(project.videos ?? []).map((v) => {
            const videoClips = (project.clips ?? []).filter((c) => c.videoId === v.id);
            const isGenerating =
              generating[v.id] ||
              videoClips.some((c) => c.status === "PENDING" || c.status === "GENERATING");
            const hasClips = videoClips.length > 0;
            const hasError = videoClips.some((c) => c.status === "ERROR");
            const allDone = hasClips && videoClips.every((c) => c.status === "DONE");

            return (
              <div key={v.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                <div className="p-4 flex gap-4">
                  {v.thumbnailUrl && (
                    <img
                      src={v.thumbnailUrl}
                      alt={v.title}
                      className="w-32 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white line-clamp-2">{v.title}</h3>
                    <p className="text-gray-500 text-sm mt-1">
                      {v.channelName} · {formatDuration(v.duration)}
                    </p>
                    <div className="flex gap-4 mt-2 text-sm text-gray-400">
                      <span>{Number(v.viewCount).toLocaleString("fr-FR")} vues</span>
                      <span>{Number(v.likeCount).toLocaleString("fr-FR")} likes</span>
                      <span className="text-violet-400 font-medium">
                        Score viralité : {v.viralityScore}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 flex items-center gap-2">
                    {!hasClips && (
                      <button
                        onClick={() => handleGenerateClips(v.id)}
                        disabled={isGenerating}
                        className="bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm px-4 py-2 rounded-lg transition"
                      >
                        {isGenerating ? "Génération..." : "Générer clips"}
                      </button>
                    )}
                    {hasClips && allDone && (
                      <span className="text-green-400 text-sm">Clips prêts ✓</span>
                    )}
                    {hasClips && (hasError || isGenerating) && (
                      <button
                        onClick={() => handleRetryClips(v.id)}
                        disabled={generating[v.id]}
                        className="bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm px-4 py-2 rounded-lg transition"
                      >
                        {generating[v.id] ? "En cours..." : "Réessayer"}
                      </button>
                    )}
                  </div>
                </div>

                {hasClips && (
                  <div className="border-t border-gray-800 p-4">
                    <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide font-medium">
                      Clips générés
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {videoClips.map((clip) => (
                        <div key={clip.id} className="bg-gray-800 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-300 font-medium">
                              {PLATFORM_LABELS[clip.platform] ?? clip.platform}
                            </span>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full border ${STATUS_STYLES[clip.status] ?? "text-gray-400"}`}
                            >
                              {clip.status}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">
                            {formatDuration(clip.startTime)} → {formatDuration(clip.endTime)}
                          </p>
                          {clip.status === "GENERATING" && (
                            <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full animate-pulse w-2/3" />
                            </div>
                          )}
                          {clip.status === "ERROR" && clip.subtitle && (
                            <p className="mt-2 text-[10px] text-red-400/80 break-words leading-tight">
                              {clip.subtitle}
                            </p>
                          )}
                          {clip.status === "DONE" && clip.outputPath && (
                            <a
                              href={clip.outputPath}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 block text-center text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded transition"
                            >
                              Télécharger
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
