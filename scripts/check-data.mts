/**
 * Checks the shared content data in src/data/ against the disk and the project rules.
 *
 *   npx tsx scripts/check-data.mts
 *
 * Fails (exit code 1) when:
 * - an image file a data entry names does not exist under src/assets/ (or a bare name is
 *   ambiguous), resolved the way src/lib/images.ts resolves it;
 * - a slug is duplicated (games and projects share one namespace; also services, reviews,
 *   founders, videos);
 * - a `page` route is not in CLAUDE.md's URL table;
 * - a tagline is longer than 90 characters, a service's `short` longer than 60;
 * - a cross-reference points nowhere (service proof, founder portfolio, review and award
 *   subjects, video `about`, timeline slugs);
 * - a studio photo has no alt text or caption, or a photo gallery's rows do not add up to its
 *   photos;
 * - a store id disagrees with src/data/storeCatalog.ts, or a priced product has no catalog row;
 * - a banned string appears (a name the owner asked to keep out, Steam Deck ratings, "winner"
 *   or "finalist" for the Unity Awards, prices);
 * - one of the owner's old-site quotes no longer matches the archived page word for word
 *   (apart from the attribution and spelling fixes the owner approved).
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { GAMES, PROJECTS } from "../src/data/games.ts";
import { SERVICES, ADJACENT_OFFERS } from "../src/data/services.ts";
import { REVIEWS, HOME_REVIEWS, SCRIPTABLE_SHEETS_REVIEWS, HYPNO_HALO_REVIEWS, INTERN_TESTIMONIALS, PRESS } from "../src/data/reviews.ts";
import { PARTNERS } from "../src/data/partners.ts";
import { FOUNDERS, FOUNDER_PORTFOLIO } from "../src/data/team.ts";
import { ALL_AWARDS as AWARDS } from "../src/data/awards.ts";
import { TIMELINE } from "../src/data/timeline.ts";
import { EARLIER_LAYOUT, EARLIER_PHOTOS, EVENT_LAYOUT, EVENT_PHOTOS, STUDIO_PHOTOS } from "../src/data/photos.ts";
import { ALL_VIDEOS } from "../src/data/videos.ts";
import { LINKS } from "../src/data/links.ts";
import { STORE_CATALOG } from "../src/data/storeCatalog.ts";

const ROOT = process.cwd();
const ASSETS = path.join(ROOT, "src", "assets");
const errors: string[] = [];
const fail = (msg: string) => errors.push(msg);
let imageCount = 0;

// ─── Images, resolved like src/lib/images.ts ─────────────────────────────────────────────
const IMAGE_EXT = /\.(png|jpe?g|webp|avif|gif|svg)$/i;
const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => {
    const p = path.join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
const assetPaths = new Set(
  walk(ASSETS)
    .filter((f) => IMAGE_EXT.test(f))
    .map((f) => path.relative(ASSETS, f).split(path.sep).join("/")),
);
const byName = new Map<string, string[]>();
for (const rel of assetPaths) {
  const name = rel.split("/").pop()!;
  byName.set(name, [...(byName.get(name) ?? []), rel]);
}

function checkImage(ref: string | undefined, where: string, scope?: string) {
  if (ref === undefined) return;
  imageCount++;
  const clean = ref.replace(/^\/+/, "").replace(/^src\/assets\//, "");
  if (!clean) return fail(`${where}: empty image reference`);
  if (scope && assetPaths.has(`${scope}/${clean}`)) return;
  if (assetPaths.has(clean)) return;
  if (!clean.includes("/")) {
    const hits = byName.get(clean) ?? [];
    if (hits.length === 1) return;
    if (hits.length > 1) return fail(`${where}: image "${ref}" is ambiguous (${hits.join(", ")})`);
  }
  fail(`${where}: image "${ref}" does not exist under src/assets/`);
}

// ─── Routes from CLAUDE.md's URL table ───────────────────────────────────────────────────
const claude = readFileSync(path.join(ROOT, "CLAUDE.md"), "utf8");
const routes = new Set<string>();
for (const line of claude.split("\n")) {
  if (!line.startsWith("| `/")) continue;
  const firstCell = line.split("|")[1];
  for (const m of firstCell.matchAll(/`(\/[^`]*)`/g)) routes.add(m[1]);
}
if (routes.size < 10) fail(`CLAUDE.md: found only ${routes.size} routes in the URL table; the parser needs a look`);
const checkPage = (page: string | undefined, where: string) => {
  if (page !== undefined && !routes.has(page)) fail(`${where}: page "${page}" is not in CLAUDE.md's URL table`);
};

// ─── Games and projects ──────────────────────────────────────────────────────────────────
const work = [...GAMES, ...PROJECTS];
const slugs = new Set<string>();
const dupes = (list: string[], what: string) => {
  const seen = new Set<string>();
  for (const s of list) {
    if (seen.has(s)) fail(`${what}: "${s}" is duplicated`);
    seen.add(s);
  }
};
dupes(work.map((w) => w.slug), "games/projects slug");
for (const w of work) slugs.add(w.slug);

const TAGLINE_MAX = 90;
for (const w of work) {
  const where = `games.ts ${w.slug}`;
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(w.slug)) fail(`${where}: slug is not kebab-case`);
  if (!w.title.trim()) fail(`${where}: no title`);
  if (!w.tagline.trim()) fail(`${where}: no tagline`);
  if (w.tagline.length > TAGLINE_MAX) fail(`${where}: tagline is ${w.tagline.length} characters (max ${TAGLINE_MAX})`);
  if (!w.summary.trim()) fail(`${where}: no summary`);
  const sentences = w.summary.split(/(?<=[.!?])\s+(?=[A-Z"])/).length;
  if (sentences > 3) fail(`${where}: summary has ${sentences} sentences (max 3)`);
  checkPage(w.page, where);
  const scope = `games/${w.slug}`;
  checkImage(w.cover, `${where} cover`, scope);
  checkImage(w.wide, `${where} wide`, scope);
  checkImage(w.icon, `${where} icon`, scope);
  for (const s of w.screenshots ?? []) checkImage(s, `${where} screenshot`, scope);
  if (w.cover && !w.coverShape) fail(`${where}: cover without coverShape`);
  for (const l of w.links) {
    if (!/^https:\/\//.test(l.url)) fail(`${where}: link ${l.url} is not https`);
    if (/web\.archive\.org/.test(l.url)) fail(`${where}: archive.org links are not allowed on game entries (${l.url})`);
  }
  if (w.videoId && !/^[A-Za-z0-9_-]{11}$/.test(w.videoId)) fail(`${where}: videoId "${w.videoId}" is not a YouTube id`);
}

// Store ids must agree with the price pipeline's catalog.
for (const w of work) {
  const rows = STORE_CATALOG.filter((r) => r.slug === w.slug);
  const want = [
    ["steam", w.steamAppId],
    ["switch", w.nsuid],
    ["unity", w.assetStoreId],
  ] as const;
  for (const [store, id] of want) {
    const row = rows.find((r) => r.store === store);
    if (id && !row) fail(`games.ts ${w.slug}: ${store} id ${id} has no row in storeCatalog.ts (report it; do not edit the catalog here)`);
    if (id && row && row.id !== id) fail(`games.ts ${w.slug}: ${store} id ${id} differs from storeCatalog.ts (${row.id})`);
    if (!id && row) fail(`games.ts ${w.slug}: storeCatalog.ts has a ${store} row (${row.id}) but the entry has no id for it`);
  }
}
for (const row of STORE_CATALOG) {
  const owner = row.parent ?? row.slug;
  if (!slugs.has(owner)) fail(`storeCatalog.ts: "${owner}" has no entry in games.ts`);
}

// ─── Founders and their portfolios ───────────────────────────────────────────────────────
dupes(FOUNDERS.map((f) => f.slug), "founder slug");
for (const f of FOUNDERS) {
  checkPage(f.page, `team.ts ${f.slug}`);
  checkImage(f.photo, `team.ts ${f.slug} photo`);
  const sentences = f.blurb.split(/(?<=[.!?])\s+(?=[A-Z])/).length;
  if (sentences !== 2) fail(`team.ts ${f.slug}: blurb has ${sentences} sentences (want 2)`);
}
for (const [founder, groups] of Object.entries(FOUNDER_PORTFOLIO)) {
  for (const g of groups)
    for (const i of g.items) {
      if (i.slug && !slugs.has(i.slug)) fail(`team.ts FOUNDER_PORTFOLIO.${founder} "${g.heading}": unknown slug "${i.slug}"`);
      if (!i.slug && !i.label) fail(`team.ts FOUNDER_PORTFOLIO.${founder} "${g.heading}": item with neither slug nor label`);
    }
}

// ─── Services ────────────────────────────────────────────────────────────────────────────
const services = [...SERVICES, ...ADJACENT_OFFERS];
dupes(services.map((s) => s.slug), "service slug");
if (SERVICES.length !== 6) fail(`services.ts: expected 6 services, found ${SERVICES.length}`);
let icons = "";
try {
  icons = readFileSync(path.join(ROOT, "src", "lib", "icons.ts"), "utf8");
} catch {
  fail("src/lib/icons.ts could not be read");
}
for (const s of services) {
  const where = `services.ts ${s.slug}`;
  checkPage(s.page, where);
  if (s.short.length > 60) fail(`${where}: short is ${s.short.length} characters (max 60)`);
  if (s.bullets.length < 3 || s.bullets.length > 4) fail(`${where}: ${s.bullets.length} bullets (want 3 or 4)`);
  const sentences = s.summary.split(/(?<=[.!?])\s+(?=[A-Z])/).length;
  if (sentences !== 2) fail(`${where}: summary has ${sentences} sentences (want 2)`);
  if (!new RegExp(`^\\s+${s.icon}:`, "m").test(icons)) fail(`${where}: icon "${s.icon}" is not in src/lib/icons.ts`);
  for (const p of s.proof) if (!slugs.has(p)) fail(`${where}: proof "${p}" is not a game or project slug`);
}

// ─── Reviews ─────────────────────────────────────────────────────────────────────────────
dupes(REVIEWS.map((r) => r.id ?? ""), "review id");
const subjectOk = (s: string) => slugs.has(s) || s === "studio" || s === "internship";
for (const r of REVIEWS) {
  const where = `reviews.ts ${r.id}`;
  if (!r.id) fail(`reviews.ts: a review has no id (${r.quote.slice(0, 40)}…)`);
  if (!r.aboutSlug || !subjectOk(r.aboutSlug)) fail(`${where}: aboutSlug "${r.aboutSlug}" is not a known subject`);
  if (r.kind === "judge" && r.url) fail(`${where}: judge quotes carry no link`);
  if (r.url && /web\.archive\.org/.test(r.url) && r.id !== "home-13") fail(`${where}: only the IndieGameMag quote may link an archive copy`);
  if (/^["“]|["”]$/.test(r.quote)) fail(`${where}: quote includes surrounding quote marks`);
}
if (HOME_REVIEWS.length !== 18) fail(`reviews.ts: HOME_REVIEWS has ${HOME_REVIEWS.length} quotes (the old home page has 18)`);
if (HOME_REVIEWS.some((r) => r.quote.startsWith("Take some mushrooms"))) fail("reviews.ts: the mushrooms quote must stay off HOME_REVIEWS");
for (const [name, list] of Object.entries({ HOME_REVIEWS, SCRIPTABLE_SHEETS_REVIEWS, HYPNO_HALO_REVIEWS, INTERN_TESTIMONIALS })) {
  if (list.some((r) => r.about === "unknown")) fail(`reviews.ts: ${name} includes a quote about "unknown"`);
}
for (const p of PRESS) if (!subjectOk(p.about)) fail(`reviews.ts PRESS "${p.title}": about "${p.about}" is not a known subject`);

// The owner's old-site quotes must still match the archived pages word for word.
const archive = ["game-design-and-development.md", "hypno-halo.md", "bootcamp.md"]
  .map((f) => readFileSync(path.join(ROOT, "archive", "wordpress", "pages", f), "utf8"))
  .join("\n");
const OWNER_FIXED = new Set(["intern-03"]); // spelling fixes the owner approved
for (const r of REVIEWS) {
  if (!r.id || !/^(home|hh-0|intern)/.test(r.id) || OWNER_FIXED.has(r.id)) continue;
  if (!archive.includes(r.quote)) fail(`reviews.ts ${r.id}: quote no longer matches the archived old-site text`);
}

// ─── Partners ────────────────────────────────────────────────────────────────────────────
dupes(PARTNERS.map((p) => p.name), "partner name");
for (const p of PARTNERS) {
  checkImage(p.logo, `partners.ts ${p.name}`, "partners");
  if (p.url && !/^https:\/\//.test(p.url)) fail(`partners.ts ${p.name}: url is not https`);
}

// ─── Awards ──────────────────────────────────────────────────────────────────────────────
for (const a of AWARDS) {
  const where = `awards.ts "${a.title}" (${a.subject})`;
  if (a.subjectSlug && !subjectOk(a.subjectSlug) && !FOUNDERS.some((f) => f.slug === a.subjectSlug))
    fail(`${where}: subjectSlug "${a.subjectSlug}" is unknown`);
  if (/unity awards/i.test(a.body) && (!/^Nominee,/.test(a.title) || a.status !== "Nominee"))
    fail(`${where}: Unity Awards entries are "Nominee", never a win`);
}

// ─── Timeline ────────────────────────────────────────────────────────────────────────────
let lastDate = "";
for (const t of TIMELINE) {
  const where = `timeline.ts ${t.date}`;
  if (!/^\d{4}(-\d{2}(-\d{2})?)?$/.test(t.date)) fail(`${where}: date is not YYYY, YYYY-MM, or YYYY-MM-DD`);
  if (t.date.slice(0, 4) < lastDate.slice(0, 4)) fail(`${where}: out of order`);
  lastDate = t.date;
  if (t.slug && !slugs.has(t.slug)) fail(`${where}: unknown slug "${t.slug}"`);
  checkImage(t.photo, `${where} photo`);
  if (t.photo && !t.caption) fail(`${where}: photo without a caption`);
  if (t.photo && /gameacon-2016-booth-crowd|convention-2017-wolf-shirt-cosplay/.test(t.photo))
    fail(`${where}: this photo shows children's faces and must not be used`);
  const sentences = t.text.split(/(?<=[.!?])\s+(?=[A-Z])/).length;
  if (sentences > 2) fail(`${where}: ${sentences} sentences (max 2)`);
}

// ─── Studio photos ───────────────────────────────────────────────────────────────────────
dupes(STUDIO_PHOTOS.map((x) => x.image), "studio photo");
dupes(STUDIO_PHOTOS.map((x) => x.out), "studio photo zip name");
for (const x of STUDIO_PHOTOS) {
  checkImage(x.image, `photos.ts ${x.out}`);
  if (!x.alt.trim() || !x.caption.trim()) fail(`photos.ts ${x.out}: needs alt text and a caption`);
}
// A justified gallery's rows are set by hand and must hold exactly its photos.
for (const [name, photos, layout] of [
  ["EVENT", EVENT_PHOTOS, EVENT_LAYOUT],
  ["EARLIER", EARLIER_PHOTOS, EARLIER_LAYOUT],
] as const) {
  for (const key of ["rows", "rowsSm"] as const) {
    const held = layout[key].reduce((a, b) => a + b, 0);
    if (held !== photos.length) fail(`photos.ts ${name}_LAYOUT.${key} holds ${held} photos, but ${name}_PHOTOS has ${photos.length}`);
  }
}

// ─── Videos ──────────────────────────────────────────────────────────────────────────────
dupes(ALL_VIDEOS.map((x) => x.id), "video id");
for (const x of ALL_VIDEOS) {
  checkImage(x.poster, `videos.ts ${x.id} poster`);
  if (x.about && !slugs.has(x.about)) fail(`videos.ts ${x.id}: about "${x.about}" is unknown`);
}
for (const w of work) if (w.videoId && !ALL_VIDEOS.some((x) => x.id === w.videoId)) fail(`games.ts ${w.slug}: videoId ${w.videoId} is not in videos.ts`);

// ─── Links ───────────────────────────────────────────────────────────────────────────────
for (const [key, url] of Object.entries(LINKS)) if (!/^https:\/\//.test(url)) fail(`links.ts ${key}: not an https URL`);

// ─── Banned strings across every data file ───────────────────────────────────────────────
const DATA_DIR = path.join(ROOT, "src", "data");
// No personal names are listed here on purpose: a guard that spells out a name publishes it.
// The naming rule (Jeff and Olivia by first name only) is in CLAUDE.md and is checked in review.
const BANNED: Array<[RegExp, string]> = [
  [/Steam Deck (Verified|Playable)|\b(Verified|Playable) on Steam Deck/i, "Steam Deck rating (Valve rates the games Unknown)"],
  [/Unity Awards?[^.\n]{0,60}\b(winner|finalist|won)\b|\b(winner|finalist)\b[^.\n]{0,60}Unity Awards?/i, "Unity Awards win or finalist claim"],
  [/\$\d+\.\d{2}/, "a price (store.json owns prices)"],
];
const dataFiles = readdirSync(DATA_DIR).filter((f) => f.endsWith(".ts") && !["legacy.ts", "nav.ts"].includes(f));
for (const f of dataFiles) {
  const text = readFileSync(path.join(DATA_DIR, f), "utf8");
  for (const [re, why] of BANNED) {
    const m = text.match(re);
    if (m) fail(`src/data/${f}: "${m[0]}" (${why})`);
  }
}

// ─── Report ──────────────────────────────────────────────────────────────────────────────
const summary = [
  `${GAMES.length} games`,
  `${PROJECTS.length} projects`,
  `${SERVICES.length} services + ${ADJACENT_OFFERS.length} adjacent offers`,
  `${REVIEWS.length} reviews`,
  `${PRESS.length} press items`,
  `${PARTNERS.length} partners`,
  `${FOUNDERS.length} founders`,
  `${AWARDS.length} awards`,
  `${TIMELINE.length} timeline entries`,
  `${STUDIO_PHOTOS.length} studio photos`,
  `${ALL_VIDEOS.length} videos`,
  `${imageCount} image references`,
].join(", ");

if (errors.length) {
  console.error(`check-data: ${errors.length} problem(s)\n`);
  for (const e of errors) console.error(`  - ${e}`);
  console.error(`\n(${summary})`);
  process.exit(1);
}
console.log(`check-data: OK (${summary})`);
