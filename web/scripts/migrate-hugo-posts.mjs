/**
 * Migrate Hugo posts: ../../content/post/<year>/<slug>/index.md -> content/posts/<slug>.mdx
 * Run from repo root: npm run migrate:posts --prefix web
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.join(__dirname, "..");
const repoRoot = path.join(webRoot, "..");
const hugoPostRoot = path.join(repoRoot, "content", "post");
const outDir = path.join(webRoot, "content", "posts");
const publicImgRoot = path.join(webRoot, "public", "images", "posts");

const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"]);

/** HTML / MDX element names we leave alone inside `<name>` or `<name ...>`. */
const KNOWN_ANGLE_TAGS = new Set([
  "br",
  "span",
  "div",
  "p",
  "a",
  "img",
  "pre",
  "code",
  "strong",
  "em",
  "b",
  "i",
  "u",
  "ul",
  "ol",
  "li",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "blockquote",
  "table",
  "thead",
  "tbody",
  "tr",
  "td",
  "th",
  "sup",
  "sub",
  "del",
  "ins",
  "s",
  "hr",
  "section",
  "article",
  "nav",
  "main",
  "header",
  "footer",
]);

/**
 * MDX treats `<foo>` as JSX. Escape placeholder-style angle brackets outside
 * fenced ``` blocks and inline `code`.
 */
function escapeMdxAnglePlaceholders(markdown) {
  const fence = /```[\s\S]*?```/g;
  const chunks = [];
  let last = 0;
  let m;
  while ((m = fence.exec(markdown)) !== null) {
    chunks.push({ text: true, s: markdown.slice(last, m.index) });
    chunks.push({ text: false, s: m[0] });
    last = m.index + m[0].length;
  }
  chunks.push({ text: true, s: markdown.slice(last) });

  function escapePlain(s) {
    return s.replace(/<([a-zA-Z][a-zA-Z0-9_-]*)>/g, (full, name) => {
      if (KNOWN_ANGLE_TAGS.has(name.toLowerCase())) return full;
      return `&lt;${name}&gt;`;
    });
  }

  function escapeWithInlineCode(s) {
    const out = [];
    let i = 0;
    while (i < s.length) {
      const start = s.indexOf("`", i);
      if (start === -1) {
        out.push(escapePlain(s.slice(i)));
        break;
      }
      out.push(escapePlain(s.slice(i, start)));
      const end = s.indexOf("`", start + 1);
      if (end === -1) {
        out.push(escapePlain(s.slice(start)));
        break;
      }
      out.push(s.slice(start, end + 1));
      i = end + 1;
    }
    return out.join("");
  }

  return chunks
    .map((c) => (c.text ? escapeWithInlineCode(c.s) : c.s))
    .join("");
}

function walkPostDirs(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, name.name);
    if (name.isDirectory()) {
      const indexMd = path.join(full, "index.md");
      if (fs.existsSync(indexMd)) acc.push({ dir: full, indexMd, slug: name.name });
      else walkPostDirs(full, acc);
    }
  }
  return acc;
}

function copyPostImages(postDir, slug) {
  const destDir = path.join(publicImgRoot, slug);
  if (!fs.existsSync(postDir)) return;
  for (const name of fs.readdirSync(postDir, { withFileTypes: true })) {
    if (!name.isFile()) continue;
    const ext = path.extname(name.name).toLowerCase();
    if (!IMAGE_EXT.has(ext)) continue;
    fs.mkdirSync(destDir, { recursive: true });
    fs.copyFileSync(path.join(postDir, name.name), path.join(destDir, name.name));
  }
}

function normalizeFm(data, slug) {
  const next = { ...data };
  if (next.image && typeof next.image === "string") {
    next.image = `/images/posts/${slug}/${path.basename(next.image)}`;
  }
  if (next.date) {
    const d = new Date(next.date);
    if (!Number.isNaN(d.getTime())) next.date = d.toISOString();
  }
  if (next.tags && !Array.isArray(next.tags)) next.tags = [next.tags];
  if (next.categories && !Array.isArray(next.categories))
    next.categories = [next.categories];
  delete next.weight;
  return next;
}

function main() {
  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(publicImgRoot, { recursive: true });

  const posts = walkPostDirs(hugoPostRoot);
  posts.sort((a, b) => a.slug.localeCompare(b.slug));

  for (const { dir, indexMd, slug } of posts) {
    const raw = fs.readFileSync(indexMd, "utf8");
    const { data, content } = matter(raw);
    const fm = normalizeFm(data, slug);
    let body = content.trimEnd() + "\n";
    const base = `/images/posts/${slug}/`;
    body = body.replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      (full, alt, href) => {
        const h = String(href).trim();
        if (/^https?:\/\//i.test(h) || h.startsWith("/") || h.startsWith("data:"))
          return full;
        const file = path.basename(h.split("?")[0] || h);
        return `![${alt}](${base}${file})`;
      },
    );
    body = body.replace(/<br\s*\/?>/gi, "<br />");
    body = escapeMdxAnglePlaceholders(body);
    const mdx = matter.stringify(body, fm);
    fs.writeFileSync(path.join(outDir, `${slug}.mdx`), mdx, "utf8");
    copyPostImages(dir, slug);
    console.log("migrated:", slug);
  }
  console.log("done,", posts.length, "posts");
}

main();
