import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Workers Builds runs `npm run build` → opennextjs-cloudflare build.
// Without an explicit buildCommand, OpenNext would call `npm run build` again (infinite loop).
export default {
  ...defineCloudflareConfig(),
  buildCommand: "npx next build",
};
