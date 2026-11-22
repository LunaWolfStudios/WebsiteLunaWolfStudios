/**
 * Prebuild step, wired to `predev`, `prebuild` and `check` so it always runs first.
 * Idempotent: every step rebuilds its output from scratch, and all output is gitignored.
 *
 * Steps run in order from STEPS below. To add one, write an async function that logs what
 * it did and append it to STEPS with a name.
 *
 * 1. legacy-uploads: copies the WordPress uploads that other sites hotlink (logos, Hypno Halo
 *    logo and icon) from archive/wordpress/media/ to public/wp-content/uploads/, so their
 *    old URLs keep answering.
 * 2. store-data: in CI, reads Steam, the Nintendo eShop and the Unity Asset Store into
 *    src/data/store.json first (a store that fails keeps its previous value and never fails
 *    the build); local builds use the committed snapshot untouched. Then copies the data to
 *    public/store-data.json, the published copy the "Store prices" workflow compares against.
 * 3. press: the press kit downloads for /presskit/ and its project sheets: the studio logos
 *    from brand/ in public/press/logos/ and luna-wolf-studios-logos.zip, the studio photos
 *    zip, and per product the original screenshots and art in public/press/<slug>/ with a
 *    press kit zip and a screenshots zip (lists in src/data/presskit.ts).
 */
import { copyFile, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { crc32 } from "node:zlib";
import { runStoreData } from "./store-data.mts";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const ARCHIVE_MEDIA = path.join(ROOT, "archive", "wordpress", "media");

/** WordPress upload paths (relative to wp-content/uploads/) that must keep resolving. */
const LEGACY_UPLOADS = [
  "2025/10/LWS_2048x2048.png",
  "2025/10/LWS_2048x2048_transparent.png",
  "2025/10/LWS_2048x1024_with-text.png",
  "2025/10/LWS_2048x1024_transparent_with-text.png",
  "2025/10/LWS_1024x1024_transparent_text-only.png",
  "2025/10/title-logo-2560x1440-1.png",
  "2025/10/icon-1024x1024-1.png",
  "2025/04/LWS_1024x512.jpg",
  // The old Hypno Halo page was the game's press page: it embedded these four screenshots
  // from these addresses, and the fifth was its share image. An embedded image cannot follow
  // the 404 page's script, so the files stay where they were.
  "2025/10/50_HypnoHaloSS-Easy_1920x1080.png",
  "2025/10/69_HypnoHaloSS-Medium_1920x1080.png",
  "2025/10/98_HypnoHaloSS-Medium_1920x1080.png",
  "2025/10/113_HypnoHalo_Hard_1920x1080.png",
  "2025/10/hypno-halo-featured-image.png",
  // The old site's icons and share image (its <head> pointed at these).
  "2017/01/LWS_512x512.jpg",
  "2017/01/LWS_114x114.jpg",
  "2017/01/LWS_72x72.jpg",
  "2017/01/LWS_57x57.jpg",
  "2017/01/cropped-LWS_512x512.jpg",
];

async function legacyUploads() {
  const dest = path.join(PUBLIC_DIR, "wp-content", "uploads");
  await rm(dest, { recursive: true, force: true });
  let bytes = 0;
  for (const rel of LEGACY_UPLOADS) {
    const from = path.join(ARCHIVE_MEDIA, rel);
    const to = path.join(dest, rel);
    await mkdir(path.dirname(to), { recursive: true });
    await copyFile(from, to); // throws (and fails the build) if an archive file went missing
    bytes += (await stat(to)).size;
  }
  console.log(
    `[build] legacy-uploads: ${LEGACY_UPLOADS.length} files (${(bytes / 1048576).toFixed(1)} MB) → public/wp-content/uploads/`,
  );
}

async function storeData() {
  if (process.env.CI) {
    const args = ["--write"];
    // The live site's copy is the fallback when it is known, so a store that is down during
    // a deploy keeps what visitors already see instead of an older committed snapshot.
    if (process.env.STORE_BASELINE_URL) args.push("--baseline", process.env.STORE_BASELINE_URL);
    const code = await runStoreData(args);
    if (code !== 0) throw new Error(`store-data exited with ${code}`);
  }
  await copyFile(path.join(ROOT, "src", "data", "store.json"), path.join(PUBLIC_DIR, "store-data.json"));
  console.log("[build] store-data: src/data/store.json → public/store-data.json");
}

/**
 * Studio logos for /presskit/: published name → source in brand/. The page lists the same
 * names (src/data/presskit.ts LOGOS); keep the two in step.
 */
const PRESS_LOGOS: Record<string, string> = {
  "luna-wolf-studios-logo-2048.png": "LWS_2048x2048.png",
  "luna-wolf-studios-logo-transparent-2048.png": "LWS_2048x2048_transparent.png",
  "luna-wolf-studios-logo-with-text-2048x1024.png": "LWS_2048x1024_with-text.png",
  "luna-wolf-studios-logo-with-text-transparent-2048x1024.png": "LWS_2048x1024_transparent_with-text.png",
  "luna-wolf-studios-wordmark-1024.png": "LWS_1024x1024_transparent_text-only.png",
};
const PRESS_ZIP = "luna-wolf-studios-logos.zip";

/**
 * Minimal STORED zip writer, as on sheeptag2.com: the entries are PNGs (already compressed),
 * small enough to need no zip64, so the build needs no zip dependency.
 */
function zipStored(entries: Array<{ name: string; data: Buffer; mtime: Date }>): Buffer {
  const chunks: Buffer[] = [];
  const central: Buffer[] = [];
  let offset = 0;
  for (const { name, data, mtime } of entries) {
    const nameBytes = Buffer.from(name, "utf8");
    const crc = crc32(data) >>> 0;
    const dosTime = (mtime.getHours() << 11) | (mtime.getMinutes() << 5) | (mtime.getSeconds() >> 1);
    const dosDate = ((mtime.getFullYear() - 1980) << 9) | ((mtime.getMonth() + 1) << 5) | mtime.getDate();

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0); // local file header
    local.writeUInt16LE(20, 4); // version needed
    local.writeUInt16LE(0x0800, 6); // flags: UTF-8 names
    local.writeUInt16LE(0, 8); // method: stored
    local.writeUInt16LE(dosTime, 10);
    local.writeUInt16LE(dosDate, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(data.length, 18); // compressed = uncompressed when stored
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBytes.length, 26);
    chunks.push(local, nameBytes, data);

    const dir = Buffer.alloc(46);
    dir.writeUInt32LE(0x02014b50, 0); // central directory header
    dir.writeUInt16LE(20, 4); // version made by
    dir.writeUInt16LE(20, 6); // version needed
    dir.writeUInt16LE(0x0800, 8); // flags: UTF-8 names
    dir.writeUInt16LE(dosTime, 12);
    dir.writeUInt16LE(dosDate, 14);
    dir.writeUInt32LE(crc, 16);
    dir.writeUInt32LE(data.length, 20);
    dir.writeUInt32LE(data.length, 24);
    dir.writeUInt16LE(nameBytes.length, 28);
    dir.writeUInt32LE(offset, 42); // local header offset
    central.push(dir, nameBytes);
    offset += 30 + nameBytes.length + data.length;
  }
  const dirSize = central.reduce((n, b) => n + b.length, 0);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0); // end of central directory
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(dirSize, 12);
  end.writeUInt32LE(offset, 16);
  chunks.push(...central, end);
  return Buffer.concat(chunks);
}

type ZipEntry = { name: string; data: Buffer; mtime: Date };
const mb = (bytes: number) => `${(bytes / 1048576).toFixed(1)} MB`;
/** A zip over this size is too much to hand a journalist in one click (CLAUDE.md, press kit). */
const PRESS_ZIP_LIMIT = 25 * 1048576;

/** Reads a repo file for a zip entry; throws (and fails the build) if it went missing. */
async function zipEntry(name: string, repoPath: string): Promise<ZipEntry> {
  const from = path.join(ROOT, repoPath);
  return { name, data: await readFile(from), mtime: (await stat(from)).mtime };
}

async function writeZip(file: string, entries: ZipEntry[]): Promise<number> {
  const zip = zipStored(entries);
  await writeFile(file, zip);
  return zip.length;
}

/**
 * The press kit downloads (src/data/presskit.ts has the lists and the published names):
 * - the five studio logos → public/press/logos/ and public/press/luna-wolf-studios-logos.zip
 *   (these paths are linked from other sites: never move them);
 * - the studio photos → public/press/luna-wolf-studios-photos.zip;
 * - per project sheet, every screenshot and piece of art → public/press/<slug>/ under its
 *   press name, <slug>-press-kit.zip with all of them, and <slug>-screenshots.zip with the
 *   screenshots alone (when the sheet also has art; otherwise the one zip serves both).
 * Originals are copied byte for byte and stored in the zips, never recompressed.
 */
async function press() {
  const { STUDIO_PHOTOS, PRESS_SHEETS, pressPaths, pressSource } = await import("../src/data/presskit.ts");
  const dest = path.join(PUBLIC_DIR, "press");
  const logosDir = path.join(dest, "logos");
  await rm(dest, { recursive: true, force: true });
  await mkdir(logosDir, { recursive: true });

  // Studio logos.
  const logos: ZipEntry[] = [];
  for (const [out, src] of Object.entries(PRESS_LOGOS)) {
    await copyFile(path.join(ROOT, "brand", src), path.join(logosDir, out));
    logos.push(await zipEntry(`luna-wolf-studios-logos/${out}`, path.join("brand", src)));
  }
  const logoBytes = await writeZip(path.join(dest, PRESS_ZIP), logos);
  console.log(`[build] press: ${logos.length} logos → public/press/logos/, ${PRESS_ZIP} (${mb(logoBytes)})`);

  // Studio photos.
  const photos = await Promise.all(
    STUDIO_PHOTOS.map((p) => zipEntry(`luna-wolf-studios-photos/${p.out}`, path.join("src", "assets", p.image))),
  );
  const photoBytes = await writeZip(path.join(dest, "luna-wolf-studios-photos.zip"), photos);
  console.log(`[build] press: ${photos.length} photos → luna-wolf-studios-photos.zip (${mb(photoBytes)})`);

  // One folder and one or two zips per project sheet.
  let total = logoBytes + photoBytes;
  for (const sheet of PRESS_SHEETS) {
    const { kitZip, shotsZip } = pressPaths(sheet);
    const dir = path.join(dest, sheet.slug);
    await mkdir(dir, { recursive: true });
    const folder = `${sheet.slug}-press-kit`;
    const shots: ZipEntry[] = [];
    const art: ZipEntry[] = [];
    for (const [list, sub, into] of [
      [sheet.screenshots, "screenshots", shots],
      [sheet.art, "art", art],
    ] as const) {
      for (const item of list) {
        const entry = await zipEntry(`${folder}/${sub}/${item.out}`, pressSource(item));
        await writeFile(path.join(dir, item.out), entry.data);
        into.push(entry);
      }
    }
    const kitBytes = await writeZip(path.join(dir, kitZip), [...shots, ...art]);
    if (kitBytes > PRESS_ZIP_LIMIT) {
      throw new Error(`${kitZip} is ${mb(kitBytes)}, over the 25 MB limit: list fewer screenshots in presskit.ts`);
    }
    let shotBytes = 0;
    if (shotsZip !== kitZip) {
      shotBytes = await writeZip(
        path.join(dir, shotsZip),
        shots.map((e) => ({ ...e, name: e.name.replace(`${folder}/screenshots/`, `${sheet.slug}-screenshots/`) })),
      );
    }
    const fileBytes = [...shots, ...art].reduce((n, e) => n + e.data.length, 0);
    total += kitBytes + shotBytes + fileBytes;
    console.log(
      `[build] press: ${sheet.slug}: ${shots.length} screenshots, ${art.length} art → public/press/${sheet.slug}/, ` +
        `${kitZip} (${mb(kitBytes)})${shotBytes ? `, ${shotsZip} (${mb(shotBytes)})` : ""}`,
    );
  }
  console.log(`[build] press: ${mb(total)} in public/press/`);
}

const STEPS: Array<[name: string, run: () => Promise<void>]> = [
  ["legacy-uploads", legacyUploads],
  ["store-data", storeData],
  ["press", press],
];

for (const [name, run] of STEPS) {
  try {
    await run();
  } catch (err) {
    console.error(`[build] step "${name}" failed:`, err);
    process.exit(1);
  }
}
console.log("[build] done.");
