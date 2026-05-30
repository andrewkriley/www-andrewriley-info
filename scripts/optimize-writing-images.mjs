#!/usr/bin/env node
/**
 * Optimises post hero/inline images under public/images/writing/.
 *
 * Walks every file under public/images/writing/ (including <slug>/ subdirs),
 * backs full-resolution originals up to backup/writing-images-originals/<timestamp>/,
 * then rewrites each image in place:
 *   - PNG → re-encoded PNG (palette quantised, max compression). Keeps PNG so
 *     screenshots / diagrams / alpha don't degrade.
 *   - JPG/JPEG → re-encoded mozjpeg q85 progressive.
 *   - Long edge capped at MAX_LONG_EDGE px.
 *
 * Unlike scripts/optimize-hero-images.mjs (hero-only, PNG → JPG) this script
 * is format-preserving because writing/ mixes photos and diagrams.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const WRITING = path.join(ROOT, "public/images/writing");
const BACKUP_ROOT = path.join(ROOT, "backup", "writing-images-originals");

const MAX_LONG_EDGE = 2560;
const JPEG_QUALITY = 85;
const IMG_RE = /\.(jpe?g|png)$/i;

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk(p));
    } else if (entry.isFile() && IMG_RE.test(entry.name)) {
      out.push(p);
    }
  }
  return out;
}

function backupAll(files) {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const dest = path.join(BACKUP_ROOT, stamp);
  for (const f of files) {
    const rel = path.relative(WRITING, f);
    const target = path.join(dest, rel);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(f, target);
  }
  return dest;
}

async function optimizeOne(file) {
  const ext = path.extname(file).toLowerCase();
  const tmp = `${file}.tmp-${process.pid}`;

  const meta = await sharp(file).metadata();
  const w = meta.width ?? 0;
  const h = meta.height ?? 0;
  const longEdge = Math.max(w, h);

  let pipeline = sharp(file).rotate();
  if (longEdge > MAX_LONG_EDGE) {
    pipeline = pipeline.resize({
      width: w >= h ? MAX_LONG_EDGE : undefined,
      height: h > w ? MAX_LONG_EDGE : undefined,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  if (ext === ".png") {
    await pipeline
      .png({ compressionLevel: 9, palette: true })
      .toFile(tmp);
  } else {
    await pipeline
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true })
      .toFile(tmp);
  }

  fs.renameSync(tmp, file);
  return { ext };
}

async function main() {
  if (!fs.existsSync(WRITING)) {
    console.error("No directory:", WRITING);
    process.exit(1);
  }

  const files = walk(WRITING);
  if (files.length === 0) {
    console.error("No images found under", WRITING);
    process.exit(1);
  }

  const dest = backupAll(files);
  console.log(`Backed up ${files.length} file(s) to:\n  ${dest}`);

  let totalBefore = 0;
  let totalAfter = 0;
  for (const f of files) {
    const before = fs.statSync(f).size;
    await optimizeOne(f);
    const after = fs.statSync(f).size;
    totalBefore += before;
    totalAfter += after;
    const rel = path.relative(WRITING, f);
    console.log(
      `${rel.padEnd(48)} ${(before / 1e6).toFixed(2)} MB → ${(after / 1e6).toFixed(2)} MB`,
    );
  }
  console.log(
    `\nTotal: ${(totalBefore / 1e6).toFixed(2)} MB → ${(totalAfter / 1e6).toFixed(2)} MB`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
