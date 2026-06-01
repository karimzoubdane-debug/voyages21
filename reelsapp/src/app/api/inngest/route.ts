import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest";
import { processProject } from "@/inngest/processProject";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [processProject],
});
