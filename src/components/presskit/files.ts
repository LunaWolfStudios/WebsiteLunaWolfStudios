/**
 * File sizes for the press kit's download buttons, read from disk at build time so a button
 * always states the real size. Paths are relative to the repo root. The zips exist only after
 * the "press" step of scripts/build.mts has run (it runs before `dev`, `build`, and `check`);
 * a missing file yields "" and the button simply leaves the size out.
 */
import { statSync } from "node:fs";
import path from "node:path";

// The project root. Not import.meta.url: Astro bundles this module into a chunk elsewhere
// before it runs, and every npm script runs from the root.
const ROOT = process.cwd();

/** "840 KB", "2.4 MB", "10 MB", or "" when the file is missing. */
export function fileSize(repoPath: string): string {
  try {
    const bytes = statSync(path.join(ROOT, repoPath)).size;
    if (bytes < 1048576) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
    const mb = bytes / 1048576;
    return `${mb >= 10 ? Math.round(mb) : mb.toFixed(1)} MB`;
  } catch {
    return "";
  }
}

/** "PNG", "JPG", "ZIP": the file type from a name. */
export const fileType = (name: string) => (name.split(".").pop() ?? "").toUpperCase().replace("JPEG", "JPG");

/** "ZIP, 7.3 MB" or "ZIP" when the size is unknown. */
export const typeAndSize = (repoPath: string) => {
  const size = fileSize(repoPath);
  return size ? `${fileType(repoPath)}, ${size}` : fileType(repoPath);
};
