import ffmpegStatic from "ffmpeg-static";
import { spawn, execFileSync } from "child_process";
import path from "path";
import fs from "fs";
import { getStreamUrls } from "./ytdl";

const FFMPEG = ffmpegStatic ?? "ffmpeg";
const TMP_DIR = "/tmp/reelsapp";

// The bundled ffmpeg-static binary is often compiled without libfreetype, so
// the `drawtext` filter is missing. Probe the binary once and cache the result
// so a CTA overlay degrades gracefully (clip without text) instead of crashing
// the whole encode with "No such filter: 'drawtext'".
let drawtextSupport: boolean | null = null;
function hasDrawtext(): boolean {
  if (drawtextSupport !== null) return drawtextSupport;
  try {
    const filters = execFileSync(FFMPEG, ["-hide_banner", "-filters"], {
      encoding: "utf8",
    });
    drawtextSupport = /\bdrawtext\b/.test(filters);
  } catch {
    drawtextSupport = false;
  }
  return drawtextSupport;
}

// When drawtext IS available we still need a font: serverless runtimes have no
// fontconfig, so pass an explicit fontfile if we can find one bundled or on the
// system. Returns "" when none is found (let ffmpeg try its default).
let resolvedFontFile: string | null = null;
function findFontFile(): string {
  if (resolvedFontFile !== null) return resolvedFontFile;
  const candidates = [
    path.join(process.cwd(), "public", "fonts", "DejaVuSans.ttf"),
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
  ];
  resolvedFontFile = candidates.find((p) => fs.existsSync(p)) ?? "";
  return resolvedFontFile;
}

function ensureTmpDir() {
  if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true });
}

// On Vercel the traced binary can lose its +x bit. Ensure it's executable once.
let ffmpegReady = false;
function ensureFfmpegExecutable() {
  if (ffmpegReady) return;
  if (ffmpegStatic && fs.existsSync(ffmpegStatic)) {
    try {
      fs.chmodSync(ffmpegStatic, 0o755);
    } catch {
      // best-effort; ignore if not permitted
    }
  }
  ffmpegReady = true;
}

// Resolve direct googlevideo URLs, then let FFmpeg seek with HTTP range
// requests (-ss before each -i) so only the needed segment is fetched.
// Muxes video + audio, crops 9:16, cuts to duration, burns in optional CTA.
export async function generateClip(params: {
  youtubeId: string;
  startSec: number;
  endSec: number;
  ctaText?: string;
  outputName: string;
}): Promise<string> {
  const { youtubeId, startSec, endSec, ctaText, outputName } = params;
  ensureTmpDir();
  ensureFfmpegExecutable();
  const outputPath = path.join(TMP_DIR, outputName);
  const duration = endSec - startSec;

  let vf = "crop=ih*9/16:ih,scale=1080:1920";
  if (ctaText) {
    if (hasDrawtext()) {
      const safe = ctaText.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/:/g, "\\:");
      const fontFile = findFontFile();
      const fontArg = fontFile ? `fontfile='${fontFile.replace(/'/g, "\\'")}':` : "";
      vf += `,drawtext=${fontArg}text='${safe}':fontsize=28:fontcolor=white:x=(w-text_w)/2:y=h-80:box=1:boxcolor=black@0.5:boxborderw=10`;
    } else {
      console.warn(
        "[ffmpeg] drawtext filter unavailable in this build — skipping CTA overlay",
      );
    }
  }

  const { videoUrl, audioUrl } = await getStreamUrls(youtubeId);
  const isMuxed = videoUrl === audioUrl;

  // HTTP input flags: reconnect on drop, spoof browser user-agent so
  // YouTube CDN doesn't reject FFmpeg's default Lavf user-agent.
  const httpFlags = [
    "-reconnect", "1",
    "-reconnect_streamed", "1",
    "-reconnect_delay_max", "5",
    "-user_agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  ];

  // Muxed fallback: single input, both tracks in one stream.
  // DASH default: two inputs, FFmpeg seeks each independently via HTTP range.
  const args = isMuxed
    ? [
        ...httpFlags, "-ss", String(startSec), "-i", videoUrl,
        "-map", "0:v:0",
        "-map", "0:a:0",
        "-t", String(duration),
        "-vf", vf,
        "-c:v", "libx264",
        "-preset", "fast",
        "-crf", "23",
        "-c:a", "aac",
        "-y", outputPath,
      ]
    : [
        ...httpFlags, "-ss", String(startSec), "-i", videoUrl,
        ...httpFlags, "-ss", String(startSec), "-i", audioUrl,
        "-map", "0:v:0",
        "-map", "1:a:0",
        "-t", String(duration),
        "-vf", vf,
        "-c:v", "libx264",
        "-preset", "fast",
        "-crf", "23",
        "-c:a", "aac",
        "-y", outputPath,
      ];

  return new Promise((resolve, reject) => {
    const proc = spawn(FFMPEG, args);

    let stderr = "";
    proc.stderr?.on("data", (d: Buffer) => { stderr += d.toString(); });

    proc.on("close", (code: number | null) => {
      if (code === 0) {
        resolve(outputPath);
      } else {
        reject(new Error(`FFmpeg exited ${code}: ${stderr.slice(-800)}`));
      }
    });

    proc.on("error", (err: Error) => reject(err));
  });
}
