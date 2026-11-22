/**
 * Preview builds only: move a finished build from the site root to a sub-path.
 *
 * Until the custom domain is attached, GitHub Pages serves this project repository at
 * https://<owner>.github.io/<repo>/, a sub-path. Astro's `base` option (set from SITE_BASE in
 * astro.config.mjs) already prefixes everything Astro and Vite generate: /_astro/ files, font
 * URLs, astro:assets images, the prefetch script. The site's own links are written by hand
 * as root-relative paths (`href="/contact/"`), and absolute URLs (canonical, Open Graph,
 * JSON-LD, sitemaps, form return addresses) are built from the production origin. This step
 * fixes both after the build, so no page or data file has to know about the preview:
 *
 * - every root-relative URL that does not already start with the base gets the base: in
 *   HTML attributes (href, src, poster, action, srcset and imagesrcset candidates, the
 *   meta-refresh target, data-* attributes that hold a path), in inline <style> and style=""
 *   url()s, in inline scripts (quoted string literals whose first segment is a file or
 *   folder of the build, like "/media/hero-desktop"), in CSS files, and in site.webmanifest;
 * - every absolute URL on the production origin becomes the preview origin plus the base
 *   (or just the preview origin when Astro already put the base in the path, as in an
 *   og:image built from an astro:assets URL), in HTML attributes, JSON-LD, inline scripts,
 *   and in the .xml, .txt and .webmanifest files.
 *
 * Never touched: text between tags, comments, protocol-relative `//host/` URLs, fragments,
 * mailto:, tel:, data:, other hosts (games.lunawolfstudios.com, an email address), and the
 * bundled JavaScript in _astro/ (it holds no site paths).
 *
 * It runs from the `lws:preview-rebase` integration in astro.config.mjs, and only when
 * SITE_BASE is set. A production build never calls it. It can also run by hand:
 *   node scripts/rebase-dist.mjs <dir> <base> <origin>
 *   node scripts/rebase-dist.mjs dist-preview /WebsiteLunaWolfStudios https://lunawolfstudios.github.io
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const PRODUCTION_ORIGIN = "https://lunawolfstudios.com";

/** "/WebsiteLunaWolfStudios/" or "WebsiteLunaWolfStudios" → "/WebsiteLunaWolfStudios"; "" or "/" → "". */
export function normalizeBase(raw = "") {
  const trimmed = String(raw).trim().replace(/^\/+|\/+$/g, "");
  if (!trimmed) return "";
  if (!/^[A-Za-z0-9._~-]+(\/[A-Za-z0-9._~-]+)*$/.test(trimmed)) {
    throw new Error(`SITE_BASE must be a path like /WebsiteLunaWolfStudios, got ${JSON.stringify(raw)}`);
  }
  return `/${trimmed}`;
}

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * @param {{ dir: string, base: string, origin: string, site?: string, log?: (msg: string) => void }} options
 */
export async function rebaseDist({ dir, base, origin, site = PRODUCTION_ORIGIN, log = console.log }) {
  const BASE = normalizeBase(base);
  if (!BASE) throw new Error("rebaseDist: no base path given, nothing to do");
  const ORIGIN = String(origin ?? "").replace(/\/+$/, "");
  if (!/^https?:\/\/[^/]+$/.test(ORIGIN)) throw new Error(`rebaseDist: origin must be like https://owner.github.io, got ${JSON.stringify(origin)}`);
  const ROOT = path.resolve(dir);

  // First segments a script string literal may start with: the build's own top-level
  // files and folders ("/media/...", "/_astro/...", "/presskit/").
  const topLevel = new Set(await readdir(ROOT));

  const stats = { files: 0, paths: 0, absolute: 0, literals: 0 };

  const hasBase = (p) => p === BASE || p.startsWith(`${BASE}/`) || p.startsWith(`${BASE}?`) || p.startsWith(`${BASE}#`);

  /** A root-relative path gets the base; anything else is returned as is. */
  const rebasePath = (url) => {
    if (typeof url !== "string" || !url.startsWith("/") || url.startsWith("//") || hasBase(url)) return url;
    stats.paths++;
    return BASE + url;
  };

  // The production origin, not followed by more host characters (so not
  // lunawolfstudios.com.example) and not preceded by a subdomain (the scheme anchors it).
  const absRe = new RegExp(`${escapeRe(site)}(?![\\w.:@-])`, "g");
  /** Production-origin URLs anywhere in a string become preview URLs. */
  const rebaseAbsolute = (text) =>
    text.replace(absRe, (match, offset, whole) => {
      stats.absolute++;
      // Already under the base (an astro:assets URL Astro prefixed): swap the origin only.
      const next = whole.slice(offset + match.length, offset + match.length + BASE.length + 1);
      const based = next.startsWith(BASE) && !/[\w.~-]/.test(next.charAt(BASE.length));
      return based ? ORIGIN : ORIGIN + BASE;
    });

  /** One URL value (an attribute holding exactly one URL). */
  const rebaseUrl = (value) => {
    const v = value.trim();
    if (v.startsWith("/")) return value.replace(v, rebasePath(v));
    return rebaseAbsolute(value);
  };

  /**
   * "a.jpg 1x, /b.jpg 2x" → each candidate's URL rebased, descriptors kept. Read the way the
   * browser reads a srcset: a URL runs to the next white space and may hold commas (a data
   * URI does), so a candidate ends at the comma after its descriptors, or at the commas that
   * end the URL itself.
   */
  const rebaseSrcset = (value) => {
    let out = "";
    let i = 0;
    while (i < value.length) {
      const lead = /^[\s,]*/.exec(value.slice(i))[0];
      out += lead;
      i += lead.length;
      if (i >= value.length) break;
      const token = /^\S+/.exec(value.slice(i))[0];
      i += token.length;
      const commas = /,+$/.exec(token)?.[0] ?? "";
      out += rebaseUrl(commas ? token.slice(0, -commas.length) : token) + commas;
      if (commas) continue;
      const next = value.indexOf(",", i);
      const end = next === -1 ? value.length : next;
      out += value.slice(i, end);
      i = end;
    }
    return out;
  };

  /** url(...) in CSS: root-relative ones get the base, production-origin ones the preview origin. */
  const rebaseCss = (css) =>
    rebaseAbsolute(
      css.replace(/url\(\s*(["']?)(\/(?!\/)[^"')\s]*)\1\s*\)/gi, (m, q, url) => `url(${q}${rebasePath(url)}${q})`),
    );

  /** Quoted string literals in inline JavaScript that name a file or folder of the build. */
  const rebaseScript = (js) =>
    rebaseAbsolute(
      js.replace(/(["'`])(\/(?![/*])[A-Za-z0-9._~%\-/]*)\1/g, (m, q, url) => {
        const first = url.slice(1).split("/")[0];
        if (!first || hasBase(url) || !topLevel.has(first)) return m;
        stats.literals++;
        return q + BASE + url + q;
      }),
    );

  const URL_ATTRS = new Set(["href", "src", "poster", "action", "formaction", "data", "xlink:href", "background", "cite", "longdesc", "manifest", "ping"]);
  const SRCSET_ATTRS = new Set(["srcset", "imagesrcset"]);

  /** Rewrite one attribute value of one tag. */
  const rebaseAttr = (tagName, name, value, tagSource) => {
    const n = name.toLowerCase();
    if (SRCSET_ATTRS.has(n) || (n.startsWith("data-") && n.endsWith("srcset"))) return rebaseSrcset(value);
    if (URL_ATTRS.has(n)) return rebaseUrl(value);
    if (n === "style") return rebaseCss(value);
    if (n === "content" && tagName === "meta" && /\shttp-equiv\s*=\s*["']?refresh/i.test(tagSource)) {
      return value.replace(/^(\s*\d*\s*;?\s*url\s*=\s*)(.*)$/i, (m, lead, url) => lead + rebaseUrl(url));
    }
    // data-webm="/media/...", data-poster="/_astro/...": a data attribute that is exactly one path.
    if (n.startsWith("data-") && /^\/(?!\/)[^\s]*$/.test(value) && value !== "/") return rebasePath(value);
    return rebaseAbsolute(value);
  };

  /** Rebuild a start tag with rewritten attribute values; everything else byte for byte. */
  const rebaseTag = (tag, tagName) => {
    let i = 1 + tagName.length; // after "<name"
    let out = tag.slice(0, i);
    const attrRe = /(\s+)([^\s"'>/=]+)(?:(\s*=\s*)(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/y;
    while (i < tag.length) {
      attrRe.lastIndex = i;
      const m = attrRe.exec(tag);
      if (!m) {
        out += tag.slice(i);
        break;
      }
      const [whole, ws, name, eq, dq, sq, uq] = m;
      if (eq === undefined) out += whole;
      else {
        const raw = dq ?? sq ?? uq ?? "";
        const next = rebaseAttr(tagName, name, raw, tag);
        const quote = dq !== undefined ? '"' : sq !== undefined ? "'" : "";
        out += `${ws}${name}${eq}${quote}${next}${quote}`;
      }
      i = attrRe.lastIndex;
    }
    return out;
  };

  /** Walk an HTML document: tags, raw-text elements (script, style), comments, text. */
  const rebaseHtml = (html) => {
    let out = "";
    let i = 0;
    const lower = html.toLowerCase();
    while (i < html.length) {
      const lt = html.indexOf("<", i);
      if (lt === -1) {
        out += html.slice(i);
        break;
      }
      out += html.slice(i, lt);
      i = lt;
      if (html.startsWith("<!--", i)) {
        const end = html.indexOf("-->", i + 4);
        const stop = end === -1 ? html.length : end + 3;
        out += html.slice(i, stop);
        i = stop;
        continue;
      }
      if (html[i + 1] === "!" || html[i + 1] === "?" || html[i + 1] === "/") {
        const end = html.indexOf(">", i);
        const stop = end === -1 ? html.length : end + 1;
        out += html.slice(i, stop);
        i = stop;
        continue;
      }
      const nameMatch = /^<([a-zA-Z][a-zA-Z0-9:-]*)/.exec(html.slice(i, i + 64));
      if (!nameMatch) {
        out += "<";
        i++;
        continue;
      }
      // The end of the start tag: the first ">" outside a quoted attribute value.
      const tagRe = /<[a-zA-Z][a-zA-Z0-9:-]*(?:\s+[^\s"'>/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>`]+))?)*\s*\/?>/y;
      tagRe.lastIndex = i;
      const tm = tagRe.exec(html);
      if (!tm) {
        out += "<";
        i++;
        continue;
      }
      const tagName = nameMatch[1].toLowerCase();
      const tag = tm[0];
      out += rebaseTag(tag, tagName);
      i = tagRe.lastIndex;
      if (tagName === "script" || tagName === "style") {
        const close = lower.indexOf(`</${tagName}`, i);
        const stop = close === -1 ? html.length : close;
        const body = html.slice(i, stop);
        const type = (/\stype\s*=\s*["']?([^"'\s>]*)/i.exec(tag)?.[1] ?? "").toLowerCase();
        if (tagName === "style") out += rebaseCss(body);
        else if (type === "application/ld+json") out += rebaseAbsolute(body);
        else if (type === "" || type === "module" || type === "text/javascript") out += rebaseScript(body);
        else out += body;
        i = stop;
      }
    }
    return out;
  };

  /** site.webmanifest: every root-relative string value (start_url, icon src) gets the base. */
  const rebaseManifest = (text) => {
    const walk = (v) => {
      if (typeof v === "string") return rebaseAbsolute(rebasePath(v));
      if (Array.isArray(v)) return v.map(walk);
      if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x)]));
      return v;
    };
    return `${JSON.stringify(walk(JSON.parse(text)), null, 2)}\n`;
  };

  const entries = await readdir(ROOT, { recursive: true, withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const full = path.join(entry.parentPath ?? entry.path, entry.name);
    const ext = path.extname(entry.name).toLowerCase();
    let transform;
    if (ext === ".html") transform = rebaseHtml;
    else if (ext === ".webmanifest") transform = rebaseManifest;
    else if (ext === ".css") transform = rebaseCss;
    else if (ext === ".xml" || ext === ".txt") transform = rebaseAbsolute;
    else continue;
    const before = await readFile(full, "utf8");
    const after = transform(before);
    if (after !== before) {
      await writeFile(full, after);
      stats.files++;
    }
  }

  log(
    `rebased for ${ORIGIN}${BASE}/: ${stats.files} files changed, ${stats.paths} root-relative URLs, ` +
      `${stats.literals} script paths, ${stats.absolute} absolute URLs`,
  );
  return stats;
}

// Run by hand: node scripts/rebase-dist.mjs <dir> <base> <origin>
if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  const [dir, base, origin] = process.argv.slice(2);
  if (!dir || !base || !origin) {
    console.error("usage: node scripts/rebase-dist.mjs <dir> <base> <origin>");
    process.exit(2);
  }
  await rebaseDist({ dir, base, origin });
}
