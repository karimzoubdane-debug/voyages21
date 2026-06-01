import type { YouTubeVideo } from "@/types";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY!;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

function parseDuration(iso: string): number {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  return (
    (parseInt(match[1] || "0") * 3600) +
    (parseInt(match[2] || "0") * 60) +
    parseInt(match[3] || "0")
  );
}

function computeViralityScore(
  views: number,
  likes: number,
  durationSec: number
): number {
  if (views === 0) return 0;
  const engagementRate = likes / views;
  const viewsScore = Math.min(views / 1_000_000, 1);
  const durationPenalty = durationSec > 3600 ? 0.8 : 1;
  return Math.round((viewsScore * 0.5 + engagementRate * 10 * 0.5) * durationPenalty * 100) / 100;
}

export async function searchYouTubeVideos(
  query: string,
  maxResults = 10
): Promise<YouTubeVideo[]> {
  const searchRes = await fetch(
    `${BASE_URL}/search?part=snippet&type=video&q=${encodeURIComponent(query)}&maxResults=${maxResults}&relevanceLanguage=fr&key=${YOUTUBE_API_KEY}`
  );
  const searchData = await searchRes.json();

  if (!searchData.items?.length) return [];

  const ids = searchData.items.map((i: any) => i.id.videoId).join(",");

  const statsRes = await fetch(
    `${BASE_URL}/videos?part=statistics,contentDetails&id=${ids}&key=${YOUTUBE_API_KEY}`
  );
  const statsData = await statsRes.json();

  return statsData.items.map((item: any) => {
    const snippet = searchData.items.find((s: any) => s.id.videoId === item.id)?.snippet;
    const views = parseInt(item.statistics?.viewCount || "0");
    const likes = parseInt(item.statistics?.likeCount || "0");
    const duration = parseDuration(item.contentDetails?.duration || "PT0S");

    return {
      id: item.id,
      title: snippet?.title || "",
      channelName: snippet?.channelTitle || "",
      duration,
      viewCount: views,
      likeCount: likes,
      thumbnailUrl: snippet?.thumbnails?.high?.url || "",
      viralityScore: computeViralityScore(views, likes, duration),
    } satisfies YouTubeVideo;
  });
}

export async function getVideoTranscript(videoId: string): Promise<string> {
  // Whisper transcription handled server-side via /api/transcribe
  // This fetches the audio stream URL via yt-dlp in the job worker
  return videoId;
}
