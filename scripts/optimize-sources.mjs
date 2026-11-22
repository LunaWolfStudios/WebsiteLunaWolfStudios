/**
 * Shrinks oversized source images under `src/assets/` so the repository and the build stay
 * small. Run it after adding screenshots or key art:
 *
 *   node scripts/optimize-sources.mjs          report what would change
 *   node scripts/optimize-sources.mjs --write  do it
 *
 * `astro:assets` re-encodes every image for the page (AVIF and WebP at the widths a layout
 * asks for), so a source only has to be good enough to resize from. A 2560x1440 screenshot
 * stored as a 6 MB PNG gains nothing over a 900 KB JPEG at quality 90, and costs seconds of
 * build time for every size generated from it.
 *
 * Rules:
 *  - Opaque images over the size limit become JPEG (quality 90, 4:4:4 chroma so interface text
 *    in screenshots stays crisp), capped at 2560 px on the long edge. A `.png` is replaced by a
 *    `.jpg` with the same base name.
 *  - Images with transparency stay PNG, capped at 2048 px on the long edge and recompressed.
 *  - Nothing is ever enlarged, and a result that is not at least 15% smaller is discarded.
 *  - `src/assets/hero/` is skipped: those stills must match the hero video's frames exactly.
 *  - A renamed file is renamed in the `SOURCES.md` beside it and in every file under `src/`.
 */
import { readdirSync, readFileSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assets = path.join(root, "src", "assets");
const write = process.argv.includes("--write");

const LIMIT_BYTES = 450 * 1024;
const MAX_OPAQUE = 2560;
const MAX_ALPHA = 2048;
const SKIP_DIRS = new Set([path.join(assets, "hero")]);

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return SKIP_DIRS.has(full) ? [] : walk(full);
    return /\.(png|jpe?g|webp)$/i.test(entry.name) ? [full] : [];
  });

/** True when any pixel is meaningfully transparent. A PNG can carry an unused alpha channel. */
const usesAlpha = async (file, meta) => {
  if (!meta.hasAlpha) return false;
  const { channels } = await sharp(file).stats();
  return channels[channels.length - 1].min < 250;
};

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;
const renames = [];
let before = 0;
let after = 0;

// sharp keeps an open handle on a file it reads by path, and on Windows that blocks writing
// the result back to the same path. Work from a buffer instead, with sharp's cache off.
sharp.cache(false);

for (const file of walk(assets)) {
  const size = statSync(file).size;
  if (size < LIMIT_BYTES) continue;
  const input = readFileSync(file);
  const meta = await sharp(input).metadata();
  const alpha = await usesAlpha(input, meta);
  const cap = alpha ? MAX_ALPHA : MAX_OPAQUE;
  const longEdge = Math.max(meta.width, meta.height);
  const pipeline = sharp(input).rotate();
  if (longEdge > cap) pipeline.resize({ width: meta.width >= meta.height ? cap : undefined, height: meta.height > meta.width ? cap : undefined });

  const target = alpha ? file.replace(/\.(jpe?g|webp)$/i, ".png") : file.replace(/\.(png|webp|jpeg)$/i, ".jpg");
  const buffer = alpha
    ? await pipeline.png({ compressionLevel: 9, effort: 10, palette: false }).toBuffer()
    : await pipeline.flatten({ background: "#000000" }).jpeg({ quality: 90, chromaSubsampling: "4:4:4", mozjpeg: true }).toBuffer();

  const rel = path.relative(root, file).replace(/\\/g, "/");
  if (buffer.length > size * 0.85) {
    console.log(`keep   ${rel} (${kb(size)}; re-encoding saves too little)`);
    continue;
  }
  before += size;
  after += buffer.length;
  const renamed = target !== file;
  console.log(
    `${write ? "shrink" : "would "} ${rel} ${meta.width}x${meta.height} ${kb(size)} -> ${kb(buffer.length)}` +
      (longEdge > cap ? ` (resized to ${cap}px)` : "") +
      (renamed ? ` -> ${path.basename(target)}` : ""),
  );
  if (!write) continue;
  writeFileSync(target, buffer);
  if (renamed) {
    unlinkSync(file);
    renames.push({ dir: path.dirname(file), from: path.basename(file), to: path.basename(target) });
  }
}

// Keep references pointing at the files that now exist.
if (write && renames.length) {
  const textFiles = (dir) =>
    readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return textFiles(full);
      return /\.(astro|ts|mts|mjs|md|json|css)$/i.test(entry.name) ? [full] : [];
    });
  const candidates = [...textFiles(path.join(root, "src")), ...textFiles(path.join(root, "archive", "research"))];
  for (const file of candidates) {
    const text = readFileSync(file, "utf8");
    let next = text;
    for (const r of renames) {
      const folder = path.basename(r.dir);
      // Only touch a mention that sits in the same asset folder, or in that folder's own notes.
      const sameFolder = path.dirname(file) === r.dir;
      const pattern = new RegExp(`(${sameFolder ? "" : `${folder}/`})${r.from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "g");
      next = next.replace(pattern, `$1${r.to}`);
    }
    if (next !== text) {
      writeFileSync(file, next);
      console.log(`updated references in ${path.relative(root, file).replace(/\\/g, "/")}`);
    }
  }
}

console.log(`\n${write ? "Saved" : "Would save"} ${kb(before - after)} (${kb(before)} -> ${kb(after)}).${write ? "" : " Run with --write to apply."}`);
