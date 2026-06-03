import ffmpegStatic from "ffmpeg-static";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import { getStreamUrls } from "./ytdl";

const FFMPEG = ffmpegStatic ?? "ffmpeg";
const TMP_DIR = "/tmp/reelsapp";

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
    const safe = ctaText.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/:/g, "\\:");
    vf += `,drawtext=text='${safe}':fontsize=28:fontcolor=white:x=(w-text_w)/2:y=h-80:box=1:boxcolor=black@0.5:boxborderw=10`;
  }

  const { videoUrl, audioUrl } = await getStreamUrls(youtubeId);

  const args = [
    "-ss", String(startSec), "-i", videoUrl,
    "-ss", String(startSec), "-i", audioUrl,
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
