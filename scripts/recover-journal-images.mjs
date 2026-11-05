import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Original post bundles immediately before the Hugo scaffold was removed.
const revision = "f5b1589806646c289fd3eff61298370ede3f1686";
const files = execFileSync("git", ["ls-tree", "-r", "--name-only", revision, "content/post"], { encoding: "utf8" }).trim().split("\n");
let recovered = 0;
for (const source of files.filter(p => /\.(png|jpe?g)$/i.test(p))) {
  const slug = path.basename(path.dirname(source));
  const postPath = `src/content/posts/${slug}.mdx`;
  let post;
  try { post = await fs.readFile(postPath, "utf8"); } catch { continue; }
  const original = path.basename(source);
  if (!post.includes(original)) continue;
  const name = original.replace(/\.[^.]+$/, ".webp");
  const directory = `public/images/writing/${slug}`;
  await fs.mkdir(directory, { recursive: true });
  const bytes = execFileSync("git", ["show", `${revision}:${source}`], { maxBuffer: 32 * 1024 * 1024 });
  await sharp(bytes).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 88 }).toFile(`${directory}/${name}`);
  post = post.replaceAll(original, `/images/writing/${slug}/${name}`);
  await fs.writeFile(postPath, post);
  recovered++;
}
console.log(`Recovered ${recovered} referenced journal images from ${revision}.`);
