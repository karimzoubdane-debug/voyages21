import ffmpegStatic from "ffmpeg-static";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import { streamVideoSegment } from "./ytdl";

const FFMPEG = ffmpegStatic ?? "ffmpeg";
const TMP_DIR = "/tmp/reelsapp";

function ensureTmpDir() {
  if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true });
}

// Single-pass: stream from YouTube → crop 9:16 → cut to duration → output MP4.
// ctaText is burned in if provided.
export async function generateClip(params: {
  youtubeId: string;
  startSec: number;
  endSec: number;
  ctaText?: string;
  outputName: string;
}): Promise<string> {
  const { youtubeId, startSec, endSec, ctaText, outputName } = params;
  ensureTmpDir();
  const outputPath = path.join(TMP_DIR, outputName);
  const duration = endSec - startSec;

  let vf = "crop=ih*9/16:ih,scale=1080:1920";
  if (ctaText) {
    const safe = ctaText.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/:/g, "\\:");
    vf += `,drawtext=text='${safe}':fontsize=28:fontcolor=white:x=(w-text_w)/2:y=h-80:box=1:boxcolor=black@0.5:boxborderw=10`;
  }

  const args = [
    "-i", "pipe:0",
    "-t", String(duration),
    "-vf", vf,
    "-c:v", "libx264",
    "-preset", "fast",
    "-crf", "23",
    "-c:a", "aac",
    "-y", outputPath,
  ];

  // Stream starting at startSec so ytdl fetches only what FFmpeg needs
  const ytStream = streamVideoSegment(youtubeId, Math.floor(startSec * 1000));

  return new Promise((resolve, reject) => {
    const proc = spawn(FFMPEG, args);

    ytStream.pipe(proc.stdin!);

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
    ytStream.on("error", (err: Error) => {
      proc.stdin?.destroy();
      reject(err);
    });
  });
}
