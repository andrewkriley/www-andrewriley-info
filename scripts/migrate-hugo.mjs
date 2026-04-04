/**
 * One-time migration: Hugo posts under content/post/ to src/content/posts/
 * Copies co-located assets to public/p/{slug}/
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = path.resolve("content/post");
const OUT_POSTS = path.resolve("src/content/posts");
const OUT_PAGES = path.resolve("src/content/sitePages");
const PUBLIC_P = path.resolve("public/p");
const PUBLIC_ROOT = path.resolve("public");

/** Remove legacy Hugo build output from public/; keep robots.txt and favicon.ico */
function cleanPublicRoot() {
  if (!fs.existsSync(PUBLIC_ROOT)) return;
  for (const name of fs.readdirSync(PUBLIC_ROOT)) {
    if (name === "robots.txt" || name === "favicon.ico") continue;
    fs.rmSync(path.join(PUBLIC_ROOT, name), { recursive: true, force: true });
  }
}

function walkPostIndexFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, name.name);
    if (name.isDirectory()) results.push(...walkPostIndexFiles(p));
    else if (name.name === "index.md") results.push(p);
  }
  return results;
}

function copyDirFiles(srcDir, destDir, skip = new Set(["index.md"])) {
  if (!fs.existsSync(srcDir)) return;
  fs.mkdirSync(destDir, { recursive: true });
  for (const name of fs.readdirSync(srcDir, { withFileTypes: true })) {
    if (skip.has(name.name)) continue;
    const from = path.join(srcDir, name.name);
    const to = path.join(destDir, name.name);
    if (name.isDirectory()) copyDirFiles(from, to, new Set());
    else fs.copyFileSync(from, to);
  }
}

function rewriteImageRefs(body, slug) {
  return body.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (full, alt, src) => {
    const s = src.trim();
    if (s.startsWith("http://") || s.startsWith("https://") || s.startsWith("/") || s.startsWith("data:"))
      return full;
    return `![${alt}](/p/${slug}/${s})`;
  });
}

function migratePost(file) {
  const dir = path.dirname(file);
  const folderSlug = path.basename(dir);
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const slug = typeof data.slug === "string" && data.slug.length ? data.slug : folderSlug;

  const destPublic = path.join(PUBLIC_P, slug);
  copyDirFiles(dir, destPublic);

  const image =
    typeof data.image === "string" && data.image.length ? `/p/${slug}/${data.image}` : undefined;

  const frontmatter = {
    title: data.title ?? "Untitled",
    ...(data.description ? { description: data.description } : {}),
    date: data.date ?? new Date().toISOString(),
    tags: Array.isArray(data.tags) ? data.tags : [],
    categories: Array.isArray(data.categories) ? data.categories : [],
    ...(image ? { image } : {}),
  };

  let body = rewriteImageRefs(content.trimEnd(), slug);
  body = body.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (full, text, href) => {
    const h = href.trim();
    if (h.startsWith("http") || h.startsWith("/") || h.startsWith("#") || h.startsWith("mailto:")) return full;
    return `[${text}](/p/${slug}/${h})`;
  });
  const out = matter.stringify(body, frontmatter);
  fs.mkdirSync(OUT_POSTS, { recursive: true });
  const mdxPath = path.join(OUT_POSTS, `${slug}.mdx`);
  if (fs.existsSync(mdxPath)) {
    console.log("post: skip (mdx exists):", slug);
    return;
  }
  fs.writeFileSync(path.join(OUT_POSTS, `${slug}.md`), out, "utf8");
  console.log("post:", slug);
}

function migrateSitePage(relPath, slug) {
  const file = path.resolve("content/page", relPath, "index.md");
  if (!fs.existsSync(file)) {
    console.warn("skip missing:", file);
    return;
  }
  const dir = path.dirname(file);
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const destPublic = path.join(path.resolve("public"), slug);
  copyDirFiles(dir, destPublic);

  let body = rewriteImageRefs(content.trimEnd(), slug);
  body = body.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (full, text, href) => {
    const h = href.trim();
    if (h.startsWith("http") || h.startsWith("/") || h.startsWith("#") || h.startsWith("mailto:")) return full;
    return `[${text}](/${slug}/${h})`;
  });
  body = body.replace(/src="([^"]+)"/g, (full, src) => {
    if (src.startsWith("http") || src.startsWith("/")) return full;
    return `src="/${slug}/${src}"`;
  });

  const frontmatter = {
    title: data.title ?? slug,
    ...(data.date ? { date: data.date } : {}),
    ...(data.image ? { image: `/${slug}/${data.image}` } : {}),
  };

  const out = matter.stringify(body, frontmatter);
  fs.mkdirSync(OUT_PAGES, { recursive: true });
  fs.writeFileSync(path.join(OUT_PAGES, `${slug}.md`), out, "utf8");
  console.log("page:", slug);
}

function copyCategoryAssets() {
  const catRoot = path.resolve("content/categories");
  if (!fs.existsSync(catRoot)) return;
  const dest = path.resolve("public/categories");
  fs.mkdirSync(dest, { recursive: true });
  for (const name of fs.readdirSync(catRoot, { withFileTypes: true })) {
    if (!name.isDirectory()) continue;
    const from = path.join(catRoot, name.name);
    copyDirFiles(from, path.join(dest, name.name), new Set(["_index.md"]));
  }
}

cleanPublicRoot();
/** Only remove migrated `.md` files so hand-authored `.mdx` posts survive `npm run migrate`. */
function clearMarkdownOnly(dir) {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    if (name.endsWith(".md")) fs.unlinkSync(path.join(dir, name));
  }
}
clearMarkdownOnly(OUT_POSTS);
clearMarkdownOnly(OUT_PAGES);

for (const f of walkPostIndexFiles(ROOT)) {
  migratePost(f);
}

migrateSitePage("djriles", "djriles");
migrateSitePage("letscollaborate", "letscollaborate");
copyCategoryAssets();

console.log("Done. Run: npm run build");
