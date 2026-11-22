/**
 * Link and SEO lint for the built site (`npm run lint:links`, after `npm run build`).
 *
 * Walks every HTML file in dist/ and fails when:
 * - an internal href, src, srcset or poster does not resolve to a file in dist/
 *   (a path resolves if it is a file, or a directory with an index.html);
 * - an internal link points at a redirect page, or at a page URL without its trailing slash
 *   (both resolve, and both cost a hop: link to the real address);
 * - an <a> has no href (a link needs an address: crawlers and keyboards skip it);
 * - a page has no <title>, no meta description, no canonical (unless it is noindex), a
 *   canonical that is not its own address, or not exactly one <h1>;
 * - an indexable page has a title over 60 characters, a description outside 140 to 160, or
 *   a title or description another page already uses.
 * Redirect pages (meta refresh) and fixed files in public/ are only checked for links.
 *
 * PENDING lists routes that are linked from the navigation but not built yet. Links to them
 * are reported as warnings, not errors, until the page exists. It is empty now that every
 * page is built: add a route here only while its page is being written, and take it out
 * again before the change merges.
 *
 * Preview builds. With SITE_BASE and SITE_ORIGIN set (the same variables the build reads; the
 * deploy workflow passes both), the build is served under a sub-path of another origin, and
 * the lint checks it that way: pages live at SITE_ORIGIN + SITE_BASE, every internal
 * reference must start with the base and resolve below it, and it fails on anything left
 * behind by scripts/rebase-dist.mjs: a root-relative URL in any attribute that lacks the
 * base, or a production URL (https://lunawolfstudios.com) in an attribute, in JSON-LD, or in
 * the sitemaps, site.webmanifest, robots.txt and llms.txt. Every preview page is noindex,
 * so the title, description and canonical checks run on the pages that are indexable on the
 * real site (those that keep og:url) and expect no canonical at all.
 *
 *   node scripts/check-links.mjs [dir]          dir defaults to dist
 *   SITE_BASE=/WebsiteLunaWolfStudios SITE_ORIGIN=https://lunawolfstudios.github.io node scripts/check-links.mjs dist-preview
 */
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const DIST = path.resolve(process.argv[2] || "dist");
const PRODUCTION = "https://lunawolfstudios.com";
// "" in production; "/WebsiteLunaWolfStudios" in a github.io preview build.
const BASE = (process.env.SITE_BASE ?? "").trim().replace(/^\/*/, "/").replace(/\/+$/, "");
const PREVIEW = BASE !== "";
const SITE = PREVIEW ? (process.env.SITE_ORIGIN ?? "").replace(/\/+$/, "") : PRODUCTION;
if (PREVIEW && !/^https?:\/\/[^/]+$/.test(SITE)) {
  console.error("[lint:links] SITE_BASE is set, so SITE_ORIGIN must be too (for example https://lunawolfstudios.github.io).");
  process.exit(2);
}

const PENDING = new Set([]);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

const existsCache = new Map();
async function resolves(urlPath) {
  if (existsCache.has(urlPath)) return existsCache.get(urlPath);
  let ok = false;
  const rel = decodeURIComponent(urlPath).replace(/^\/+/, "");
  const target = path.join(DIST, rel);
  try {
    const s = await stat(target);
    if (s.isFile()) ok = true;
    else if (s.isDirectory()) ok = (await stat(path.join(target, "index.html")).catch(() => null))?.isFile() ?? false;
  } catch {
    ok = false;
  }
  existsCache.set(urlPath, ok);
  return ok;
}

/** Internal path for a reference found in a page, or null for external / non-navigational refs. */
function internalPath(ref, pageUrl) {
  const raw = ref.trim().replace(/&amp;/g, "&");
  if (!raw || /^(mailto:|tel:|javascript:|data:|#)/i.test(raw)) return null;
  let url;
  try {
    url = new URL(raw, pageUrl);
  } catch {
    return null;
  }
  if (url.origin !== SITE) return null;
  if (!PREVIEW) return url.pathname;
  // Preview: the site lives below the base. Return the path as the build's folders see it.
  if (!url.pathname.startsWith(`${BASE}/`)) return OUTSIDE;
  return url.pathname.slice(BASE.length);
}
/** Preview only: a reference on the preview origin but outside the base (a root-relative URL left behind). */
const OUTSIDE = Symbol("outside the base");

/** Preview only: true when a root-relative URL carries the base. */
const based = (u) => u === BASE || u.startsWith(`${BASE}/`);
// The production origin as a URL, not followed by more host (lunawolfstudios.com.example).
const PRODUCTION_URL = /https:\/\/lunawolfstudios\.com(?![\w.:@-])/;

/**
 * Preview only: every URL inside one start tag's attributes that starts with "/" but not with
 * the base: plain values, srcset candidates (any attribute ending in srcset), url() in a
 * style, and the meta-refresh target.
 */
function unbasedInTag(tag) {
  const bad = [];
  for (const [, name, value] of tag.matchAll(/\s([^\s"'>/=]+)\s*=\s*"([^"]*)"/g)) {
    const n = name.toLowerCase();
    let urls = [];
    if (n.endsWith("srcset")) urls = srcsetUrls(value);
    else if (n === "style") urls = [...value.matchAll(/url\(\s*["']?([^"')\s]+)/gi)].map((m) => m[1]);
    else if (n === "content" && /http-equiv\s*=\s*"refresh"/i.test(tag)) urls = [/url\s*=\s*(\S+)/i.exec(value)?.[1] ?? ""];
    else urls = [value.trim()];
    for (const u of urls) if (u.startsWith("/") && !u.startsWith("//") && !based(u)) bad.push(`${name}="${u}"`);
  }
  return bad;
}

/**
 * The URLs in a srcset, read the way the browser reads one: a URL runs to the next white
 * space and may hold commas (a data URI does), so a candidate ends at the comma after its
 * descriptors, or at the commas that end the URL itself.
 */
function srcsetUrls(value) {
  const urls = [];
  let rest = value;
  for (;;) {
    rest = rest.replace(/^[\s,]+/, "");
    if (!rest) return urls;
    const token = /^\S+/.exec(rest)[0];
    rest = rest.slice(token.length);
    const url = token.replace(/,+$/, "");
    urls.push(url);
    if (url.length !== token.length) continue;
    const next = rest.indexOf(",");
    rest = next === -1 ? "" : rest.slice(next + 1);
  }
}

const attr = (tag, name) => {
  const m = new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, "i").exec(tag);
  return m ? (m[1] ?? m[2]) : undefined;
};

/** "&amp;" and friends as the reader sees them, so lengths are counted in real characters. */
const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const errors = [];
const warnings = [];
const pendingHit = new Set();
let pages = 0;
let links = 0;

// First pass: read everything, and note which addresses are redirect pages.
const files = await walk(DIST);
const docs = [];
const redirects = new Set();
for (const file of files) {
  const html = await readFile(file, "utf8");
  const rel = "/" + path.relative(DIST, file).split(path.sep).join("/");
  const route = rel.replace(/index\.html$/, "");
  const isRedirect = /http-equiv=["']?refresh/i.test(html);
  if (isRedirect) redirects.add(route);
  docs.push({ html, rel, route, isRedirect });
}

const titles = new Map();
const descriptions = new Map();

for (const { html, rel, route, isRedirect } of docs) {
  const pageUrl = SITE + BASE + route;
  // A preview build marks every page noindex; the pages that are noindex on the real site
  // (the 404, the style guide) are the ones without og:url (BaseLayout drops it for them).
  const isNoindex =
    /<meta[^>]+name=["']robots["'][^>]+noindex/i.test(html) && (!PREVIEW || !/<meta\s+property=["']og:url["']/i.test(html));
  const isPage = !isRedirect && !rel.startsWith("/wp-content/") && rel !== "/privacy.html";

  // Strip inline scripts and JSON-LD so URLs inside code are not mistaken for links.
  const body = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");

  const refs = [];
  const anchors = [];
  for (const [tag] of body.matchAll(/<(a|link|img|source|script|video|audio|iframe)\b[^>]*>/gi)) {
    const name = tag.slice(1).split(/[\s>]/)[0].toLowerCase();
    if (name === "link") {
      const relAttr = (attr(tag, "rel") ?? "").toLowerCase();
      // Only links the browser fetches or that point at our own pages.
      if (!/(icon|manifest|preload|stylesheet|canonical|sitemap|apple-touch-icon)/.test(relAttr)) continue;
      if (relAttr === "canonical") continue; // canonical is checked as a page URL below
    }
    if (name === "a" && attr(tag, "href") === undefined && isPage) errors.push(`${rel}: <a> without an href → ${tag.slice(0, 100)}`);
    for (const a of ["href", "src", "poster"]) {
      const v = attr(tag, a);
      if (!v) continue;
      refs.push(v);
      if (name === "a" && a === "href") anchors.push(v);
    }
    const srcset = attr(tag, "srcset");
    if (srcset) refs.push(...srcsetUrls(srcset));
  }
  for (const [, url] of body.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)) refs.push(url);

  if (PREVIEW) {
    // The redirect target too, and anything the rewrite left behind: a root-relative URL
    // without the base in any attribute, or a production URL in an attribute or a script.
    const refresh = /<meta\s+http-equiv=["']refresh["']\s+content=["'][^"']*url=([^"']+)["']/i.exec(html)?.[1];
    if (refresh) refs.push(refresh);
    for (const [tag] of body.matchAll(/<[a-zA-Z][^>]*>/g)) {
      for (const bad of unbasedInTag(tag)) errors.push(`${rel}: root-relative URL without the base → ${bad}`);
      if (PRODUCTION_URL.test(tag)) errors.push(`${rel}: production URL left in ${tag.slice(0, 120)}`);
    }
    for (const [, code] of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)) {
      const hit = code.match(PRODUCTION_URL);
      if (hit) errors.push(`${rel}: production URL left in a script → ${code.slice(Math.max(0, hit.index - 40), hit.index + 60)}`);
    }
  }

  for (const ref of refs) {
    const p = internalPath(ref, pageUrl);
    if (p === null) continue;
    links++;
    if (p === OUTSIDE) {
      errors.push(`${rel}: internal reference outside the base ${BASE}/ → ${ref}`);
      continue;
    }
    if (await resolves(p)) continue;
    if (PENDING.has(p)) {
      pendingHit.add(p);
      continue;
    }
    errors.push(`${rel}: broken internal link → ${ref}`);
  }

  // Links a visitor clicks must be the real address: not a redirect page, and with the
  // trailing slash. Redirect pages themselves are exempt (their one link is the target).
  if (isPage) {
    for (const ref of new Set(anchors)) {
      const p = internalPath(ref, pageUrl);
      if (p === null || p === OUTSIDE || !(await resolves(p))) continue;
      if (redirects.has(p) || redirects.has(`${p}/`)) errors.push(`${rel}: link to a redirect page → ${ref}`);
      else if (!p.endsWith("/") && !/\.[a-z0-9]{2,5}$/i.test(p)) errors.push(`${rel}: link without a trailing slash → ${ref}`);
    }
  }

  if (!isPage) continue;
  pages++;
  const title = decode(/<title>([^<]*)<\/title>/i.exec(html)?.[1]?.trim() ?? "");
  // The value may hold the other kind of quote ("a shoot 'em up"), so match the pair that opened it.
  const descMatch = /<meta\s+name=["']description["']\s+content=(?:"([^"]*)"|'([^']*)')/i.exec(html);
  const desc = decode((descMatch?.[1] ?? descMatch?.[2] ?? "").trim());
  if (!title) errors.push(`${rel}: missing <title>`);
  if (!desc) errors.push(`${rel}: missing meta description`);
  const canonical = /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i.exec(html)?.[1];
  if (!isNoindex) {
    if (title.length > 60) errors.push(`${rel}: <title> is ${title.length} characters (60 or fewer)`);
    if (desc && (desc.length < 140 || desc.length > 160))
      errors.push(`${rel}: meta description is ${desc.length} characters (140 to 160)`);
    if (title) {
      if (titles.has(title)) errors.push(`${rel}: same <title> as ${titles.get(title)}`);
      else titles.set(title, rel);
    }
    if (desc) {
      if (descriptions.has(desc)) errors.push(`${rel}: same meta description as ${descriptions.get(desc)}`);
      else descriptions.set(desc, rel);
    }
    if (PREVIEW) {
      // Preview pages are noindex and carry no canonical; og:url is the preview address.
      const ogUrl = /<meta\s+property=["']og:url["']\s+content=["']([^"']+)["']/i.exec(html)?.[1];
      if (canonical) errors.push(`${rel}: a preview page has a canonical (${canonical})`);
      if (ogUrl !== pageUrl) errors.push(`${rel}: og:url is ${ogUrl}, expected ${pageUrl}`);
    } else if (!canonical) errors.push(`${rel}: missing canonical`);
    else if (canonical !== pageUrl) errors.push(`${rel}: canonical is ${canonical}, expected ${pageUrl}`);
  }
  const h1 = (body.match(/<h1\b/gi) ?? []).length;
  if (h1 !== 1) errors.push(`${rel}: has ${h1} <h1> elements (needs exactly one)`);
}

// Preview: the fixed text files must point at the preview too.
if (PREVIEW) {
  for (const name of await readdir(DIST)) {
    if (!/^(sitemap.*\.xml|robots\.txt|llms\.txt|site\.webmanifest)$/.test(name)) continue;
    const text = await readFile(path.join(DIST, name), "utf8");
    if (PRODUCTION_URL.test(text)) errors.push(`/${name}: production URL left behind`);
    if (name.endsWith(".webmanifest")) {
      for (const [, u] of text.matchAll(/"(\/(?!\/)[^"]*)"/g)) if (!based(u)) errors.push(`/${name}: root-relative URL without the base → ${u}`);
    }
  }
}

const nowBuilt = [];
for (const p of PENDING) if (await resolves(p)) nowBuilt.push(p);

console.log(
  `[lint:links] ${PREVIEW ? `preview at ${SITE}${BASE}/: ` : ""}${files.length} HTML files (${redirects.size} redirects), ${pages} pages checked, ${links} internal references.`,
);
if (pendingHit.size)
  console.log(`[lint:links] ${pendingHit.size} linked routes are not built yet (PENDING): ${[...pendingHit].sort().join(" ")}`);
if (nowBuilt.length)
  console.log(`[lint:links] these PENDING routes now exist; remove them from the list: ${nowBuilt.sort().join(" ")}`);
for (const w of warnings) console.warn(`  warn  ${w}`);
for (const e of errors) console.error(`  error ${e}`);
if (errors.length) {
  console.error(`[lint:links] FAILED with ${errors.length} error(s).`);
  process.exit(1);
}
console.log(`[lint:links] passed${warnings.length ? ` with ${warnings.length} warning(s)` : ""}.`);
