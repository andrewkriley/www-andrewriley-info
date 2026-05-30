#!/usr/bin/env node
/**
 * Backs up full-resolution copies under backup/hero-images-originals/<timestamp>/,
 * then rewrites public/images/hero/* with web-optimised JPEGs (max long edge 2560px,
 * mozjpeg q85, progressive). PNG photos become .jpg (same basename); .jpeg names kept.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const HERO = path.join(ROOT, "public/images/hero");
const BACKUP_ROOT = path.join(ROOT, "backup", "hero-images-originals");

const MAX_LONG_EDGE = 2560;
const JPEG_QUALITY = 85;

function listHeroImages() {
  return fs
    .readdirSync(HERO)
    .filter((f) => /\.(jpe?g|png)$/i.test(f) && !f.startsWith("."));
}

function backupAll(files) {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const dest = path.join(BACKUP_ROOT, stamp);
  fs.mkdirSync(dest, { recursive: true });
  for (const f of files) {
    fs.copyFileSync(path.join(HERO, f), path.join(dest, f));
  }
  return dest;
}

async function optimizeOne(filename) {
  const inputPath = path.join(HERO, filename);
  const ext = path.extname(filename).toLowerCase();
  const base = path.basename(filename, path.extname(filename));
  const tmp = path.join(HERO, `.tmp-optimize-${base}-${process.pid}.jpg`);

  let pipeline = sharp(inputPath).rotate();

  const meta = await sharp(inputPath).metadata();
  const w = meta.width ?? 0;
  const h = meta.height ?? 0;
  const longEdge = Math.max(w, h);
  if (longEdge > MAX_LONG_EDGE) {
    pipeline = pipeline.resize({
      width: w >= h ? MAX_LONG_EDGE : undefined,
      height: h > w ? MAX_LONG_EDGE : undefined,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  if (ext === ".png") {
    const outName = `${base}.jpg`;
    const outPath = path.join(HERO, outName);
    await pipeline
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .jpeg({
        quality: JPEG_QUALITY,
        mozjpeg: true,
        progressive: true,
      })
      .toFile(tmp);
    try {
      fs.unlinkSync(outPath);
    } catch {
      /* no existing */
    }
    fs.renameSync(tmp, outPath);
    if (filename !== outName) {
      fs.unlinkSync(inputPath);
    }
    return { action: "png→jpg", out: outName };
  }

  if (ext === ".jpg" || ext === ".jpeg") {
    const outPath = path.join(HERO, filename);
    await pipeline
      .jpeg({
        quality: JPEG_QUALITY,
        mozjpeg: true,
        progressive: true,
      })
      .toFile(tmp);
    fs.renameSync(tmp, outPath);
    return { action: "jpeg", out: filename };
  }

  return { action: "skip", out: filename };
}

async function main() {
  const files = listHeroImages();
  if (files.length === 0) {
    console.error("No images found in", HERO);
    process.exit(1);
  }

  const dest = backupAll(files);
  console.log(`Backed up ${files.length} file(s) to:\n  ${dest}`);

  for (const f of files) {
    const before = fs.statSync(path.join(HERO, f)).size;
    const r = await optimizeOne(f);
    const afterPath = path.join(HERO, r.out);
    const after = fs.existsSync(afterPath) ? fs.statSync(afterPath).size : 0;
    console.log(
      `${r.action.padEnd(10)} ${r.out.padEnd(28)} ${(before / 1e6).toFixed(2)} MB → ${(after / 1e6).toFixed(2)} MB`,
    );
  }

  console.log("\nDone. Update any /images/hero/*.png references to .jpg where PNGs were converted.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
