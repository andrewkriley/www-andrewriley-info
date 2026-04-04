import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://www.andrewriley.info",
  trailingSlash: "always",
  integrations: [mdx(), preact()],
  markdown: {
    allowHTML: true,
    shikiConfig: {
      theme: "github-dark-dimmed",
      wrap: true,
    },
  },
});
