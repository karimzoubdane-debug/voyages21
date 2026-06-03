import ytdl from "@distube/ytdl-core";

function buildAgent() {
  const raw = process.env.YOUTUBE_COOKIES_JSON;
  if (!raw) return ytdl.createAgent([]);
  try {
    const cookies = JSON.parse(raw);
    return ytdl.createAgent(cookies);
  } catch {
    console.warn("YOUTUBE_COOKIES_JSON is not valid JSON — falling back to no-cookie agent");
    return ytdl.createAgent([]);
  }
}

export interface StreamUrls {
  videoUrl: string;
  audioUrl: string;
}

// Resolve direct googlevideo URLs. Prefers DASH (video-only + audio-only) so
// FFmpeg can seek with HTTP range requests without downloading the full file.
// Falls back to the best muxed stream when DASH is unavailable — in that case
// videoUrl === audioUrl and ffmpeg.ts uses a single -i input.
export async function getStreamUrls(youtubeId: string): Promise<StreamUrls> {
  const agent = buildAgent();
  const info = await ytdl.getInfo(`https://www.youtube.com/watch?v=${youtubeId}`, { agent });

  const all = info.formats;
  const videoOnly = all.filter(f => f.hasVideo && !f.hasAudio && f.url);
  const audioOnly = all.filter(f => !f.hasVideo && f.hasAudio && f.url);

  if (videoOnly.length > 0 && audioOnly.length > 0) {
    const bestVideo = videoOnly.reduce((a, b) => ((b.height ?? 0) > (a.height ?? 0) ? b : a));
    const bestAudio = audioOnly.reduce((a, b) => ((b.audioBitrate ?? 0) > (a.audioBitrate ?? 0) ? b : a));
    return { videoUrl: bestVideo.url!, audioUrl: bestAudio.url! };
  }

  const muxed = all.filter(f => f.hasVideo && f.hasAudio && f.url);
  if (muxed.length > 0) {
    const best = muxed.reduce((a, b) => ((b.height ?? 0) > (a.height ?? 0) ? b : a));
    console.warn(`[ytdl] No DASH streams for ${youtubeId}, using muxed fallback (${best.height}p)`);
    return { videoUrl: best.url!, audioUrl: best.url! };
  }

  throw new Error(
    `No playable formats for ${youtubeId}. ` +
    `Total=${all.length} VideoOnly=${videoOnly.length} AudioOnly=${audioOnly.length} Muxed=${muxed.length}`
  );
}
