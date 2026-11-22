/**
 * Image lookup for data files. Content data names images by file (see src/data/types.ts);
 * `image()` turns that name into the `ImageMetadata` that <Image> and <Picture> need.
 *
 *   import { image } from "../lib/images";
 *   <Image src={image("games/hypno-halo/cover.png")} alt="..." width={300} />
 *   <Image src={image("peloton.jpg")} alt="Peloton" />          // bare name, must be unique
 *
 * The glob is eager, so every image under src/assets/ is known at build time; Astro only
 * emits the files a page actually renders. A missing or ambiguous name throws during the
 * build with the list of close matches, rather than shipping a broken <img>.
 */
import type { ImageMetadata } from "astro";

const modules = import.meta.glob<ImageMetadata>("../assets/**/*.{png,jpg,jpeg,webp,avif,gif,svg}", {
  eager: true,
  import: "default",
});

/** Path relative to src/assets/ → image. */
const byPath = new Map<string, ImageMetadata>();
/** Bare file name → every path that has it. */
const byName = new Map<string, string[]>();
for (const [p, img] of Object.entries(modules)) {
  const rel = p.replace(/^\.\.\/assets\//, "");
  byPath.set(rel, img);
  const name = rel.split("/").pop()!;
  byName.set(name, [...(byName.get(name) ?? []), rel]);
}

/**
 * Resolve an image under src/assets/. `ref` is a relative path ("games/x/cover.png") or a
 * bare file name that exists exactly once. `scope` is an optional folder tried first, so
 * `image("cover.png", "games/hypno-halo")` finds that game's cover among many covers.
 */
export function image(ref: string, scope?: string): ImageMetadata {
  const clean = ref.replace(/^\/+/, "").replace(/^src\/assets\//, "");
  if (scope) {
    const scoped = byPath.get(`${scope.replace(/\/+$/, "")}/${clean}`);
    if (scoped) return scoped;
  }
  const direct = byPath.get(clean);
  if (direct) return direct;
  if (!clean.includes("/")) {
    const hits = byName.get(clean) ?? [];
    if (hits.length === 1) return byPath.get(hits[0])!;
    if (hits.length > 1) {
      throw new Error(
        `[images] "${ref}" is ambiguous: it exists at ${hits.map((h) => `src/assets/${h}`).join(", ")}. Use the path relative to src/assets/.`,
      );
    }
  }
  const stem = clean.split("/").pop()!.replace(/\.[^.]+$/, "").toLowerCase();
  const near = [...byPath.keys()].filter((k) => k.toLowerCase().includes(stem)).slice(0, 5);
  throw new Error(
    `[images] "${ref}" was not found under src/assets/.` +
      (near.length ? ` Did you mean: ${near.join(", ")}?` : " Check the file name and folder."),
  );
}

/** Like `image()`, but returns undefined instead of throwing (for optional artwork). */
export function maybeImage(ref: string | undefined, scope?: string): ImageMetadata | undefined {
  if (!ref) return undefined;
  try {
    return image(ref, scope);
  } catch {
    return undefined;
  }
}
