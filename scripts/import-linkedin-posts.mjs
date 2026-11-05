import fs from "node:fs/promises";
import sharp from "sharp";

const topicLabels = JSON.parse(await fs.readFile(new URL("../src/data/journal-topics.json", import.meta.url), "utf8"));

const profile = "https://www.linkedin.com/in/andrewriley/";
const [archiveFile, ...manifestFiles] = process.argv.slice(2);
if (!archiveFile) throw new Error("Usage: node scripts/import-linkedin-posts.mjs verified-archive.json [media-manifest.json ...]");
const archive = JSON.parse(await fs.readFile(archiveFile, "utf8"));
if (archive.profile !== profile) throw new Error("Archive must belong to Andrew Riley's verified profile.");
const media = new Map();
for (const file of manifestFiles) {
  const manifest = JSON.parse(await fs.readFile(file, "utf8"));
  for (const asset of manifest.assets) media.set(asset.url, asset.path);
}
const outputFile = "src/content/linkedin-posts.json";
let existing = [];
try { existing = JSON.parse(await fs.readFile(outputFile, "utf8")); } catch (error) { if (error.code !== "ENOENT") throw error; }
const posts = new Map(existing.map(post => [post.sourceUrn, post]));
let added = 0;
for (const entry of archive.posts) {
  // Fail closed: classification is verified at acquisition, never inferred from text.
  if (entry.kind !== "post" || entry.authorUrl !== profile) throw new Error("Only verified original posts by Andrew Riley may be imported.");
  if (!/^urn:li:(activity|share|ugcPost):\d{19}$/.test(entry.urn) || !entry.text?.trim()) throw new Error("Invalid post identity or empty text.");
  const id = entry.urn.split(":").at(-1);
  const date = new Date(Number(BigInt(id) >> 22n)).toISOString();
  if (date > archive.capturedAt) throw new Error(`Future publication ID: ${id}`);
  if (posts.has(entry.urn)) continue;
  if (!Array.isArray(entry.topics) || !entry.topics.length || entry.topics.some(topic => typeof topic !== "string" || !Object.hasOwn(topicLabels, topic))) throw new Error(`Missing or unknown reviewed topics for ${id}`);
  const topics = [...new Set(entry.topics)];
  const slug = `linkedin-${id}`;
  const images = [];
  for (const [index, image] of entry.images.entries()) {
    const sourcePath = image.path || media.get(image.url);
    if (!sourcePath) throw new Error(`Missing downloaded image for ${id}: ${image.url}`);
    const directory = `public/images/writing/${slug}`;
    await fs.mkdir(directory, { recursive: true });
    const name = `${index + 1}.webp`;
    const result = await sharp(sourcePath).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 88 }).toFile(`${directory}/${name}`);
    images.push({ src: `/images/writing/${slug}/${name}`, alt: image.alt || `Image accompanying Andrew Riley's LinkedIn post`, width: result.width, height: result.height });
  }
  const opening = entry.text.split(/\n/).find(line => line.trim()).trim();
  const title = opening.length > 110 ? `${opening.slice(0, 107).replace(/\s+\S*$/, "")}…` : opening;
  posts.set(entry.urn, { slug, title, description: entry.text.replace(/\s+/g, " ").slice(0, 180), date, dateSource: "LinkedIn publication ID timestamp", sourceUrn: entry.urn, sourceUrl: `https://www.linkedin.com/feed/update/${entry.urn}/`, authorUrl: profile, importedAt: archive.capturedAt, text: entry.text, images, topics });
  added++;
}
await fs.writeFile(outputFile, JSON.stringify([...posts.values()].sort((a, b) => b.date.localeCompare(a.date)), null, 2) + "\n");
console.log(`Imported ${added} new original LinkedIn posts; ${posts.size} total. Existing posts were left intact.`);
