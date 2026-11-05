import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import sharp from "sharp";

const posts = JSON.parse(fs.readFileSync("src/content/linkedin-posts.json", "utf8"));
assert.equal(new Set(posts.map(p => p.sourceUrn)).size, posts.length, "Duplicate LinkedIn publication ID");
const references = [];
for (const post of posts) {
  assert.equal(post.authorUrl, "https://www.linkedin.com/in/andrewriley/");
  assert.equal(post.sourceUrl, `https://www.linkedin.com/feed/update/${post.sourceUrn}/`);
  assert.ok(post.text.trim());
  assert.ok(!post.text.endsWith("… more"), "Truncated LinkedIn post");
  assert.ok(Number.isFinite(Date.parse(post.date)), "Invalid publication date");
  for (const image of post.images) {
    references.push(image.src);
    const metadata = await sharp(`public${image.src}`).metadata();
    assert.equal(metadata.width, image.width);
    assert.equal(metadata.height, image.height);
  }
}
const postDirectory = "src/content/posts";
for (const file of fs.readdirSync(postDirectory).filter(f => f.endsWith(".mdx"))) {
  const { data, content } = matter(fs.readFileSync(path.join(postDirectory, file), "utf8"));
  if (data.image) references.push(data.image);
  for (const match of content.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) references.push(match[1]);
}
for (const image of references) {
  assert.ok(image.startsWith("/images/"), `Unresolved or remote journal image: ${image}`);
  assert.ok(fs.existsSync(`public${image}`), `Missing image: ${image}`);
}
console.log(`Validated ${posts.length} LinkedIn source references and ${references.length} local journal image references.`);
