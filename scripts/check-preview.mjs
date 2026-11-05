import fs from "node:fs";
import matter from "gray-matter";

const origin = process.argv[2];
if (!origin) throw new Error("Pass the local or deployed dev preview URL.");
const base = new URL(origin);
if (base.hostname !== "127.0.0.1" && base.hostname !== "localhost" && base.hostname !== "www-andrewriley-info-dev.andrew-23e.workers.dev") throw new Error("Preview checks are restricted to local and dev URLs.");
const imported = JSON.parse(fs.readFileSync("src/content/linkedin-posts.json", "utf8"));
const mdx = fs.readdirSync("src/content/posts").filter(name => name.endsWith(".mdx")).map(name => {
  const { data } = matter(fs.readFileSync(`src/content/posts/${name}`, "utf8"));
  return { slug: data.slug || name.replace(/\.mdx$/, ""), image: data.image };
});
const pages = ["/", "/journal", "/about", "/work", "/beyond", "/connect", ...mdx.map(p => `/p/${p.slug}`), ...imported.map(p => `/p/${p.slug}`)];
const assets = new Set(imported.flatMap(p => p.images.map(i => i.src)));
for (const post of mdx) if (post.image) assets.add(post.image);
for (const directory of fs.readdirSync("public/images/writing", { withFileTypes: true }).filter(d => d.isDirectory())) {
  for (const file of fs.readdirSync(`public/images/writing/${directory.name}`)) assets.add(`/images/writing/${directory.name}/${file}`);
}
const checks = [...pages.map(route => ({ route, image: false })), ...[...assets].map(route => ({ route, image: true }))];
const failures = [];
for (let start = 0; start < checks.length; start += 6) {
  await Promise.all(checks.slice(start, start + 6).map(async ({ route, image }) => {
    try {
      const response = await fetch(new URL(route, base), { signal: AbortSignal.timeout(15000) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      if (image && !response.headers.get("content-type")?.startsWith("image/")) throw new Error("Invalid image content type");
      if (!image) {
        const html = await response.text();
        const post = imported.find(p => route === `/p/${p.slug}`);
        if (post && !html.includes(post.sourceUrl)) throw new Error("Missing original LinkedIn reference");
        if (!html.includes("ANDREW RILEY")) throw new Error("Missing site layout");
      }
    } catch (error) { failures.push(`${route}: ${error.message}`); }
  }));
}
if (failures.length) throw new Error(failures.join("\n"));
console.log(`Passed: ${pages.length} pages and ${assets.size} image URLs at ${base.origin}.`);
