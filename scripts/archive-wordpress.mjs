/**
 * One-off export of the old WordPress site (lunawolfstudios.com, HostGator) into `archive/`.
 *
 * It is kept in the repo as a record of how `archive/` was produced. The new site does not
 * read from `archive/` at build time; the archive exists so no content from the old site is
 * lost, and so the blog survives the move even though it is not published on the new site.
 *
 * Input is a folder holding the raw REST API dumps and front-end HTML fetched from the live
 * site before the cutover:
 *
 *   pages.json posts.json media.json media2.json categories.json tags.json users.json
 *   html/<slug>.html        the rendered front-end page for every page and post
 *   media/<yyyy>/<mm>/...   every original from the media library
 *
 * Usage: node scripts/archive-wordpress.mjs <dump-folder>
 */
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dump = process.argv[2];
if (!dump || !existsSync(dump)) {
  console.error("Usage: node scripts/archive-wordpress.mjs <dump-folder>");
  process.exit(1);
}

const OLD_ORIGIN = /^https?:\/\/(www\.)?lunawolfstudios\.com/i;
const UPLOADS = "/wp-content/uploads/";

const readJson = (file) => JSON.parse(readFileSync(path.join(dump, file), "utf8"));
const pages = readJson("pages.json");
const posts = readJson("posts.json");
const media = [...readJson("media.json"), ...readJson("media2.json")];
const categories = Object.fromEntries(readJson("categories.json").map((c) => [c.id, c.name]));
const tags = Object.fromEntries(readJson("tags.json").map((t) => [t.id, t.name]));
const userList = existsSync(path.join(dump, "users.json")) ? readJson("users.json") : [];
const users = Object.fromEntries(userList.map((u) => [u.id, u.name]));

/**
 * Bylines the owner corrected. WordPress credited three posts to the account that uploaded
 * them (user 4), but that person was not their author; the studio is. The correction is
 * applied to the Markdown front matter and to the saved copy of each rendered page. The
 * account's name and URL slug are read from the dump, so they are not written down here.
 */
const BYLINE_FIXES = [{ userId: 4, credit: "Luna Wolf Studios" }].map((fix) => {
  const user = userList.find((u) => u.id === fix.userId);
  return { ...fix, wordpressName: user?.name, authorSlug: user?.slug };
});
const creditFor = (userId) => BYLINE_FIXES.find((f) => f.userId === userId)?.credit ?? users[userId];
const fixBylines = (html) =>
  BYLINE_FIXES.reduce(
    (out, f) =>
      f.wordpressName
        ? out
            .replaceAll(f.wordpressName, f.credit)
            .replaceAll(`/author/${f.authorSlug}/`, "/")
            .replaceAll(`author-${f.authorSlug}`, "author-studio")
        : out,
    html,
  );

const out = path.join(root, "archive");
const outWp = path.join(out, "wordpress");
const outBlog = path.join(out, "blog");
for (const dir of [path.join(outWp, "pages"), outBlog]) mkdirSync(dir, { recursive: true });

// ── HTML → Markdown ────────────────────────────────────────────────────────

const ENTITIES = {
  nbsp: " ", amp: "&", lt: "<", gt: ">", quot: '"', rsquo: "’", lsquo: "‘", ldquo: "“",
  rdquo: "”", ndash: "–", mdash: "—", hellip: "…", copy: "©", trade: "™", reg: "®", raquo: "»",
};
const decode = (s) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, name) => ENTITIES[name.toLowerCase()] ?? m);

const attr = (tag, name) => {
  const m =
    tag.match(new RegExp(`[\\s"']${name}\\s*=\\s*"([^"]*)"`, "i")) ??
    tag.match(new RegExp(`[\\s"']${name}\\s*=\\s*'([^']*)'`, "i"));
  return m ? decode(m[1]) : "";
};

/** Every original in the media library, keyed by its path under /wp-content/uploads/. */
const originals = new Set(media.map((m) => m.source_url.split(UPLOADS)[1]));

/**
 * Point an old upload URL at the archived original. WordPress serves resized copies as
 * `name-1024x576.jpg`; only originals are archived, so the size suffix is dropped when the
 * original exists.
 */
const localMedia = (url, fromDir) => {
  if (!OLD_ORIGIN.test(url) || !url.includes(UPLOADS)) return url;
  let rel = url.split(UPLOADS)[1].split("?")[0];
  if (!originals.has(rel)) {
    const unsized = rel.replace(/-\d+x\d+(\.\w+)$/, "$1");
    if (originals.has(unsized)) rel = unsized;
    else return url;
  }
  return path.relative(fromDir, path.join(outWp, "media", rel)).replace(/\\/g, "/");
};

const toMarkdown = (html, fromDir) => {
  let s = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");
  s = s.replace(/<iframe[^>]*>/gi, (t) => {
    const src = attr(t, "src") || attr(t, "data-src");
    const yt = src.match(/youtube(?:-nocookie)?\.com\/embed\/([\w-]{6,})/);
    return `\n\n[Embedded video](${yt ? `https://www.youtube.com/watch?v=${yt[1]}` : src})\n\n`;
  });
  s = s.replace(/<img[^>]*>/gi, (t) => {
    const src = attr(t, "data-src") || attr(t, "data-lazy-src") || attr(t, "src");
    return ` ![${attr(t, "alt")}](${localMedia(src, fromDir)}) `;
  });
  s = s.replace(/<a\b[^>]*>([\s\S]*?)<\/a>/gi, (m, inner) => {
    const href = attr(m.match(/<a\b[^>]*>/i)[0], "href");
    const text = inner.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    // An image wrapped in a link keeps the image; the link target goes after it.
    if (/!\[[^\]]*\]\([^)]*\)/.test(inner)) return `${inner.replace(/<[^>]+>/g, " ").trim()} ([link](${localMedia(href, fromDir)}))`;
    return text ? `[${text}](${localMedia(href, fromDir)})` : "";
  });
  s = s.replace(/<h([1-6])[^>]*>/gi, (_, n) => `\n\n${"#".repeat(Number(n))} `).replace(/<\/h[1-6]>/gi, "\n\n");
  s = s.replace(/<li[^>]*>/gi, "\n- ").replace(/<\/li>/gi, "");
  s = s.replace(/<br\s*\/?>/gi, "\n");
  s = s.replace(/<blockquote[^>]*>/gi, "\n\n> ").replace(/<\/blockquote>/gi, "\n\n");
  s = s.replace(/<\/?(p|div|section|ul|ol|table|tr|figure|figcaption|article|header|footer|nav)\b[^>]*>/gi, "\n\n");
  s = s.replace(/<\/?(strong|b)>/gi, "**").replace(/<\/?(em|i)>/gi, "_");
  s = decode(s.replace(/<[^>]+>/g, ""));
  return s
    .split("\n")
    .map((line) => line.replace(/[ \t]+/g, " ").trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

const yaml = (value) => JSON.stringify(value);
const frontMatter = (fields) =>
  `---\n${Object.entries(fields)
    .filter(([, v]) => v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0))
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? `[${v.map(yaml).join(", ")}]` : yaml(v)}`)
    .join("\n")}\n---\n\n`;

// ── Pages ──────────────────────────────────────────────────────────────────
// Pages were built in WPBakery, so the REST API returns raw shortcodes. The rendered
// front-end HTML is the faithful copy: everything between the header and the footer.

const mainContent = (html) => {
  const start = html.indexOf('id="main-content"');
  // The page body ends where the theme's chrome begins: the back-to-top link, then the
  // "Let's create experiences that matter" band, then the copyright bar.
  const ends = ['<a id="to-top"', 'id="pre-footer-area"', 'id="copyright-wrapper"', "<footer"]
    .map((marker) => html.indexOf(marker, start))
    .filter((i) => i > 0);
  const end = ends.length ? Math.min(...ends) : undefined;
  const slice = html
    .slice(start < 0 ? html.indexOf("<body") : start, end)
    // Pages with a sidebar repeat the social icon widget there. It is theme chrome, recorded
    // once in archive/README.md, and it has to go before comments are stripped because the
    // closing comment is the only reliable end marker.
    .replace(/<div[^>]*id="hb_soc_net_widget-\d+"[\s\S]*?<!-- END \.hb-sidebar -->/g, "");
  return `<div ${slice}`;
};
const metaOf = (html) => ({
  title: decode((html.match(/<title>([^<]*)<\/title>/i) ?? [])[1] ?? ""),
  description: decode((html.match(/<meta name="description" content="([^"]*)"/i) ?? [])[1] ?? ""),
});

const pagesDir = path.join(outWp, "pages");
for (const page of pages) {
  const htmlFile = path.join(dump, "html", `${page.slug}.html`);
  if (!existsSync(htmlFile)) continue;
  const html = readFileSync(htmlFile, "utf8");
  const meta = metaOf(html);
  const body = toMarkdown(mainContent(html), pagesDir);
  writeFileSync(
    path.join(pagesDir, `${page.slug}.md`),
    frontMatter({
      title: decode(page.title.rendered),
      url: page.link,
      wordpress_id: page.id,
      html_title: meta.title,
      meta_description: meta.description,
      published: page.date,
      modified: page.modified,
    }) + `${body}\n`,
  );
  cpSync(htmlFile, path.join(pagesDir, `${page.slug}.html`));
}

// ── Blog posts ─────────────────────────────────────────────────────────────

for (const post of posts) {
  const date = post.date.slice(0, 10);
  const body = toMarkdown(post.content.rendered, outBlog);
  writeFileSync(
    path.join(outBlog, `${date}-${post.slug}.md`),
    frontMatter({
      title: decode(post.title.rendered),
      date: post.date,
      modified: post.modified,
      author: creditFor(post.author) ?? `WordPress user ${post.author}`,
      categories: post.categories.map((id) => categories[id]).filter(Boolean),
      tags: post.tags.map((id) => tags[id]).filter(Boolean),
      original_url: post.link,
      wordpress_id: post.id,
    }) + `${body}\n`,
  );
  const htmlFile = path.join(dump, "html", `${post.slug}.html`);
  if (existsSync(htmlFile)) {
    writeFileSync(path.join(outBlog, `${date}-${post.slug}.original.html`), fixBylines(readFileSync(htmlFile, "utf8")));
  }
}

// ── Media library ──────────────────────────────────────────────────────────

if (existsSync(path.join(dump, "media"))) {
  cpSync(path.join(dump, "media"), path.join(outWp, "media"), { recursive: true });
}
writeFileSync(
  path.join(outWp, "media-index.json"),
  `${JSON.stringify(
    media.map((m) => ({
      id: m.id,
      file: m.source_url.split(UPLOADS)[1],
      original_url: m.source_url,
      uploaded: m.date,
      title: decode(m.title.rendered),
      alt: m.alt_text,
      mime: m.mime_type,
      width: m.media_details?.width,
      height: m.media_details?.height,
    })),
    null,
    2,
  )}\n`,
);

// ── URL inventory (drives the redirects on the new site) ───────────────────

writeFileSync(
  path.join(outWp, "urls.json"),
  `${JSON.stringify(
    [
      ...pages.map((p) => ({ type: "page", id: p.id, slug: p.slug, url: p.link, title: decode(p.title.rendered) })),
      ...posts.map((p) => ({ type: "post", id: p.id, slug: p.slug, url: p.link, title: decode(p.title.rendered) })),
    ],
    null,
    2,
  )}\n`,
);

console.log(
  `archive/: ${pages.length} pages, ${posts.length} posts, ${media.length} media files, ${readdirSync(outBlog).length} blog files`,
);
