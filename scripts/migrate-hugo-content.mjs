import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourceRoot = path.join(root, "content", "post");
const destinationRoot = path.join(root, "src", "content", "posts");

function walkPostFiles(directory) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return walkPostFiles(entryPath);
      }

      return entry.name === "index.md" ? [entryPath] : [];
    });
}

function readFrontMatter(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n?/);

  if (!match) {
    return { frontMatter: "", content: markdown };
  }

  return {
    frontMatter: match[1],
    content: markdown.slice(match[0].length),
  };
}

function frontMatterValue(frontMatter, key) {
  const match = frontMatter.match(new RegExp(`^${key}:\\s*"?([^"\\n]+)"?\\s*$`, "m"));
  return match?.[1]?.trim();
}

function slugForPost(filePath, frontMatter) {
  const explicitSlug = frontMatterValue(frontMatter, "slug");

  if (explicitSlug) {
    return explicitSlug.replace(/^\/|\/$/g, "");
  }

  return path.basename(path.dirname(filePath));
}

function ensureSlug(frontMatter, slug) {
  if (/^slug:/m.test(frontMatter)) {
    return frontMatter;
  }

  return `${frontMatter}\nslug: ${slug}`;
}

function normaliseMdx(content) {
  return content
    .replaceAll("<br>", "<br />")
    .replace(/<([A-Za-z0-9_./-]+)>/g, "&lt;$1&gt;")
    .replaceAll("—", "-")
    .replaceAll("“", '"')
    .replaceAll("”", '"')
    .replaceAll("’", "'")
    .replaceAll("‘", "'");
}

fs.rmSync(destinationRoot, { recursive: true, force: true });
fs.mkdirSync(destinationRoot, { recursive: true });

const postFiles = walkPostFiles(sourceRoot);

for (const postFile of postFiles) {
  const markdown = fs.readFileSync(postFile, "utf8");
  const { frontMatter, content } = readFrontMatter(markdown);
  const slug = slugForPost(postFile, frontMatter);
  const destination = path.join(destinationRoot, `${slug}.mdx`);
  const mdx = `---\n${ensureSlug(frontMatter, slug)}\n---\n\n${normaliseMdx(content).trim()}\n`;

  fs.writeFileSync(destination, mdx);
}

console.log(`Migrated ${postFiles.length} posts to ${path.relative(root, destinationRoot)}.`);
