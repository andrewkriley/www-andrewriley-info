import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Workers Builds runs `npm run build` → opennextjs-cloudflare build.
// OpenNext's default is to invoke the package.json `build` script again, which
// would recurse. Point it at Next.js directly.
//
// Dummy incremental cache drops generateStaticParams HTML (all /p/<slug> posts
// 404). Static Assets cache is read-only and needs no R2/KV — fine here because
// posts are SSG and Play's hourly revalidate can wait for the next deploy.
const config = {
  ...defineCloudflareConfig({
    incrementalCache: staticAssetsIncrementalCache,
    enableCacheInterception: true,
  }),
  buildCommand: "npx next build",
};

export default config;
