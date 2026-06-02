import ytdl from "@distube/ytdl-core";
import fs from "fs";
import path from "path";

const TMP_DIR = "/tmp/reelsapp";

export async function downloadVideo(youtubeId: string): Promise<string> {
  if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true });
  const outputPath = path.join(TMP_DIR, `${youtubeId}.mp4`);

  if (fs.existsSync(outputPath)) return outputPath;

  const url = `https://www.youtube.com/watch?v=${youtubeId}`;

  return new Promise((resolve, reject) => {
    const stream = ytdl(url, { quality: "highestvideo", filter: "audioandvideo" });
    const writer = fs.createWriteStream(outputPath);
    stream.pipe(writer);
    writer.on("finish", () => resolve(outputPath));
    writer.on("error", reject);
    stream.on("error", reject);
  });
}
