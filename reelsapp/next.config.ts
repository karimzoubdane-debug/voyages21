import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't bundle ffmpeg-static — keep it as a native require so its
  // __dirname resolves to the real runtime path (/var/task/node_modules/...)
  // instead of being frozen to the build path (/ROOT/reelsapp/...).
  serverExternalPackages: ["ffmpeg-static"],
  // The 79 MB ffmpeg binary is a non-JS file, so Next's tracer won't copy it
  // into the serverless function on its own. Force it into the Inngest route,
  // which is where the clip-generation jobs run FFmpeg.
  outputFileTracingIncludes: {
    "/api/inngest": ["./node_modules/ffmpeg-static/ffmpeg"],
  },
};

export default nextConfig;
