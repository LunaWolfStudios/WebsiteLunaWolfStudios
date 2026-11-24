/**
 * Pitch deck generator. Renders each deck in scripts/decks/content.mts as one standalone
 * HTML document of 1280x720 slides, and prints PDFs from it with headless Edge.
 *
 *   tsx scripts/decks/build.mts            HTML only: public/decks/<slug>/index.html (the prebuild runs this)
 *   tsx scripts/decks/build.mts --pdf      also public/decks/luna-wolf-studios-<slug>.pdf (`npm run decks`)
 *   tsx scripts/decks/build.mts --extras   also light-theme HTML and PDFs and one PNG per slide in
 *                                          .review/leads/decks/ (local review only, never published)
 *   --only=<slug,slug>                     limit to some decks
 *
 * The HTML is generated and gitignored. The PDFs are committed, because CI has no browser:
 * run `npm run decks` after changing a deck's content or the data it shows, and commit them.
 *
 * Everything a deck needs is inside its HTML: the site's design tokens (src/styles/tokens.css,
 * inlined as is), Outfit and Inter as base64 woff2, images resized with sharp, inline SVG icons
 * (src/lib/icons.ts) and the wordmark (src/lib/wordmark.ts). The only outside references are
 * the screen-only bar (home, PDF, contact) and the favicon. A few lines of script apply the
 * visitor's theme (the site's `lw-theme` key and `?theme=`) and scale the slides to the window.
 * Print and PDF use the slides at their real size, one per page, without the bar.
 *
 * Decks are unlisted: every deck page is noindex. src/data/decks.ts is the one record of each
 * deck's slug, cover, and slide count; the build fails if a deck's slides no longer match it.
 *
 * Resized images are cached in node_modules/.cache/lws-decks/ so the prebuild stays fast.
 * Edge: EDGE_PATH, or the default Windows install path.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { SERVICE_PAGES, ENGAGEMENT_STEPS } from "../../src/data/servicePages.ts";
import { REVIEWS } from "../../src/data/reviews.ts";
import { PARTNERS } from "../../src/data/partners.ts";
import { SITE } from "../../src/data/site.ts";
import { deck as deckMeta, deckPdf } from "../../src/data/decks.ts";
import { ICONS } from "../../src/lib/icons.ts";
import { WORDMARK } from "../../src/lib/wordmark.ts";
import { DECKS, PRODUCTS, type Card, type Deck, type Slide, type Picture, type Grant } from "./content.mts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const ASSETS = path.join(ROOT, "src", "assets");
const PUBLIC_DIR = path.join(ROOT, "public");
const LOCAL = path.join(ROOT, ".review", "leads", "decks");
const CACHE = path.join(ROOT, "node_modules", ".cache", "lws-decks");
const EDGE = process.env.EDGE_PATH ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const PROFILE = path.join(process.env.TEMP ?? process.env.TMPDIR ?? LOCAL, "lws-deck-edge-profile");
const ORIGIN = SITE.url;
const EMAIL = SITE.email;

// ─── Helpers ────────────────────────────────────────────────────────────────────────────────

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const b64 = (file: string) => fs.readFileSync(file).toString("base64");

/** Inline SVG icon from the site's icon library (decorative). */
function icon(name: string, size = 22): string {
  const d = ICONS[name];
  if (!d) throw new Error(`No icon ${name}`);
  const stroke = d.stroke
    ? `fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`
    : `fill="currentColor"`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${d.viewBox ?? "0 0 24 24"}" ${stroke} aria-hidden="true" focusable="false"><path d="${d.path}"/></svg>`;
}

const imgCache = new Map<string, string>();
/**
 * An image from src/assets/, resized to `w` px wide (about twice its largest display width),
 * as a data URI. Cached on disk, keyed by file, size, modification time, and width.
 */
async function img(rel: string, w: number): Promise<string> {
  const key = `${rel}@${w}`;
  const hit = imgCache.get(key);
  if (hit) return hit;
  const file = path.join(ASSETS, rel);
  const st = fs.statSync(file);
  const hash = crypto.createHash("sha1").update(`v1|${rel}|${st.size}|${st.mtimeMs}|${w}`).digest("hex");
  const cached = path.join(CACHE, `${hash}.txt`);
  let uri: string;
  if (fs.existsSync(cached)) uri = fs.readFileSync(cached, "utf8");
  else {
    const meta = await sharp(file).metadata();
    const pipe = sharp(file).rotate().resize({ width: Math.min(w, meta.width ?? w), withoutEnlargement: true });
    if (meta.hasAlpha) {
      const buf = await pipe.png({ compressionLevel: 9 }).toBuffer();
      uri = `data:image/png;base64,${buf.toString("base64")}`;
    } else {
      const buf = await pipe.flatten().jpeg({ quality: 74, mozjpeg: true }).toBuffer();
      uri = `data:image/jpeg;base64,${buf.toString("base64")}`;
    }
    fs.mkdirSync(CACHE, { recursive: true });
    fs.writeFileSync(cached, uri);
  }
  imgCache.set(key, uri);
  return uri;
}

const svgFile = (rel: string) => `data:image/svg+xml;base64,${b64(path.join(ASSETS, rel))}`;

const review = (id: string) => {
  const r = REVIEWS.find((x) => x.id === id);
  if (!r) throw new Error(`No review ${id}`);
  return r;
};

const wordmark = () =>
  `<svg class="wordmark" viewBox="${WORDMARK.viewBox}" role="img" aria-label="Luna Wolf Studios"><path fill="currentColor" d="${WORDMARK.d}"/></svg>`;

const urlText = (u: string) => `lunawolfstudios.com${u}`;

// ─── Fonts and CSS ──────────────────────────────────────────────────────────────────────────

const FONT_DIR = path.join(ROOT, "node_modules", "@fontsource-variable");
const FONTS = `
@font-face{font-family:"Outfit Variable";font-style:normal;font-display:block;font-weight:100 900;src:url(data:font/woff2;base64,${b64(`${FONT_DIR}/outfit/files/outfit-latin-wght-normal.woff2`)}) format("woff2")}
@font-face{font-family:"Inter Variable";font-style:normal;font-display:block;font-weight:100 900;src:url(data:font/woff2;base64,${b64(`${FONT_DIR}/inter/files/inter-latin-wght-normal.woff2`)}) format("woff2")}`;

/** The site's tokens, copied in unchanged (both themes). */
const TOKENS = fs.readFileSync(path.join(ROOT, "src", "styles", "tokens.css"), "utf8");

const CSS = `
*,*::before,*::after{box-sizing:border-box}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact;-webkit-text-size-adjust:100%}
body{margin:0;background:var(--lw-bg-raised);color:var(--lw-ink);font-family:var(--lw-font-body);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
img{display:block;max-width:100%}
a{color:var(--lw-accent);text-decoration-line:underline;text-decoration-thickness:1px;text-decoration-color:var(--lw-accent-line);text-underline-offset:.22em}
h1,h2,h3{font-family:var(--lw-font-display);font-weight:600;line-height:1.12;letter-spacing:-.012em;color:var(--lw-ink);text-wrap:balance;margin:0}
p{margin:0}
ul,ol{list-style:none;margin:0;padding:0}

/* Deck on screen: 1280x720 slides, stacked, scaled to the window by --z. */
.deck{display:flex;flex-direction:column;align-items:center;gap:28px;padding:28px 0 56px}
.slide{position:relative;flex:none;width:1280px;height:720px;overflow:hidden;zoom:var(--z,1);isolation:isolate;
  background:var(--lw-bg);color:var(--lw-ink);font-size:20px;line-height:1.45;border-radius:18px;box-shadow:var(--lw-shadow-lg)}
.flat .deck{gap:0;padding:0}
.flat .slide{border-radius:0;box-shadow:none}

/* Night sky: the site's starfield (off in the light theme) and the moon's glow in a corner. */
.slide::before{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:var(--lw-star-opacity);
  background-image:radial-gradient(1px 1px at 23px 41px,var(--lw-star),transparent 60%),radial-gradient(1px 1px at 157px 97px,var(--lw-star),transparent 60%),radial-gradient(1.4px 1.4px at 89px 173px,var(--lw-star),transparent 60%),radial-gradient(1px 1px at 211px 19px,var(--lw-star),transparent 60%),radial-gradient(1px 1px at 61px 251px,var(--lw-star),transparent 60%),radial-gradient(1.6px 1.6px at 271px 211px,var(--lw-star),transparent 60%),radial-gradient(1px 1px at 331px 127px,var(--lw-star),transparent 60%),radial-gradient(1.2px 1.2px at 199px 313px,var(--lw-star),transparent 60%);
  background-size:347px 337px,421px 389px,383px 461px,509px 433px,457px 353px,541px 499px,401px 419px,467px 379px;
  -webkit-mask-image:linear-gradient(to bottom,#000,transparent 70%);mask-image:linear-gradient(to bottom,#000,transparent 70%)}
.slide::after{content:"";position:absolute;z-index:-1;pointer-events:none;right:-220px;top:-260px;width:720px;height:720px;border-radius:50%;
  background:radial-gradient(closest-side,var(--lw-glow-strong),transparent)}

.s-in{position:absolute;inset:44px 64px 58px;display:flex;flex-direction:column;gap:24px}
.sh{display:flex;flex-direction:column;gap:10px}
.sh h2{font-size:40px;letter-spacing:-.018em}
.sh .lead{font-size:20px;line-height:1.5;color:var(--lw-ink-muted)}
.sb{flex:1;min-height:0}
.sf{position:absolute;left:64px;right:64px;bottom:18px;display:flex;justify-content:space-between;gap:24px;
  font-family:var(--lw-font-display);font-size:14px;letter-spacing:.02em;color:var(--lw-ink-subtle)}

.eyebrow{display:inline-flex;align-items:flex-start;gap:.6em;font-family:var(--lw-font-display);font-size:15px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--lw-accent)}
.eyebrow::before{content:"";flex:none;width:1.6em;height:1px;margin-top:.62em;background:currentColor;opacity:.7}

.card{position:relative;background:var(--lw-surface);border:1px solid var(--lw-border);border-radius:var(--lw-radius-lg);box-shadow:var(--lw-shadow)}
.badge{display:inline-flex;align-items:center;gap:.4em;font-family:var(--lw-font-display);font-weight:600;font-size:16px;letter-spacing:.02em;line-height:1.2;padding:.32em .75em;border-radius:var(--lw-radius-pill);background:var(--lw-accent-tint);color:var(--lw-accent);border:1px solid var(--lw-accent-line)}
.badge--gold{background:var(--lw-gold-tint);color:var(--lw-gold);border-color:color-mix(in srgb,var(--lw-gold) 34%,transparent)}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:.55em;font-family:var(--lw-font-display);font-weight:600;font-size:21px;line-height:1;text-decoration:none;white-space:nowrap;padding:.8em 1.4em;min-height:54px;border-radius:var(--lw-radius-pill);border:1px solid transparent}
.btn--primary{background:var(--lw-btn-bg);color:var(--lw-btn-ink);box-shadow:var(--lw-btn-glow)}
.ico{flex:none;width:44px;height:44px;border-radius:12px;display:grid;place-items:center;background:var(--lw-accent-tint);color:var(--lw-accent);border:1px solid var(--lw-accent-line)}
.ico--gold{background:var(--lw-gold-tint);color:var(--lw-gold);border-color:color-mix(in srgb,var(--lw-gold) 34%,transparent)}

/* Cover and contact: the night sky whatever the theme (like the site's hero). */
.cover .bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-2}
.cover::before{opacity:0}
.cover::after{inset:0;left:0;top:0;width:auto;height:auto;border-radius:0;right:0;
  background:linear-gradient(90deg,color-mix(in srgb,var(--lw-bg) 72%,transparent) 0%,color-mix(in srgb,var(--lw-bg) 35%,transparent) 48%,transparent 62%)}
.cover .s-in{inset:56px 64px 52px;justify-content:space-between}
.cover .wordmark{width:380px;height:auto;color:var(--lw-wordmark)}
.cover-copy{display:flex;flex-direction:column;gap:18px;max-width:640px}
.cover h1{font-size:62px;font-weight:650;line-height:1.04;letter-spacing:-.02em}
.cover .lead{font-size:25px;line-height:1.45;color:var(--lw-ink-muted);max-width:590px}
.cover-foot{display:flex;gap:28px;font-family:var(--lw-font-display);font-weight:500;font-size:18px;color:var(--lw-ink-muted)}
.cover-foot span{display:inline-flex;align-items:center;gap:8px}
.cover-foot svg{color:var(--lw-accent)}

/* Who we are */
.who{display:grid;grid-template-columns:minmax(0,1fr) 460px;gap:44px;height:100%}
.who-l{display:flex;flex-direction:column;gap:22px;min-height:0}
.facts{display:flex;flex-direction:column;gap:12px}
.facts li{display:flex;gap:14px;align-items:center;font-size:20px;line-height:1.35}
.facts .ico{width:38px;height:38px;border-radius:10px}
.pack{margin-top:auto;display:flex;flex-direction:column;gap:10px}
.pack-label{font-family:var(--lw-font-display);font-size:15px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--lw-ink-subtle)}
.pack ul{display:flex;flex-wrap:wrap;align-items:center;gap:10px 30px}
.pack img{height:62px;width:auto;filter:var(--lw-logo-filter);mix-blend-mode:var(--lw-logo-blend)}
.prods-wrap{display:flex;flex-direction:column;gap:10px;justify-content:center}
.prods{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.prod{display:flex;flex-direction:column;overflow:hidden}
.prod img{width:100%;aspect-ratio:16/9;object-fit:cover;background:var(--lw-media-bg)}
.prod div{display:flex;flex-direction:column;gap:2px;padding:10px 14px 12px}
.prod h3{font-size:19px;line-height:1.2}
.prod p{font-size:16px;line-height:1.3;color:var(--lw-ink-muted)}
figcaption{font-size:16px;color:var(--lw-ink-subtle);line-height:1.4}

/* What we build */
.what{display:grid;grid-template-columns:minmax(0,1fr) 450px;gap:48px;align-items:center;height:100%}
.items{display:flex;flex-direction:column;gap:16px}
.items li{display:grid;grid-template-columns:44px minmax(0,1fr);gap:16px;align-items:start}
.items h3{font-size:22px;line-height:1.25}
.items p{margin-top:2px;font-size:19px;line-height:1.4;color:var(--lw-ink-muted)}
.pic{margin:0;display:flex;flex-direction:column;gap:10px}
.pic img{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:var(--lw-radius-lg);border:1px solid var(--lw-border);box-shadow:var(--lw-shadow-lg);background:var(--lw-media-bg)}
.note{font-size:18px;line-height:1.45;color:var(--lw-ink-muted);padding:14px 18px;border-left:3px solid var(--lw-accent-line);background:var(--lw-accent-tint);border-radius:0 var(--lw-radius-sm) var(--lw-radius-sm) 0}

/* Work cards */
.grid{display:grid;grid-template-columns:repeat(var(--cols,3),minmax(0,1fr));gap:18px;align-content:start}
.wc{display:flex;flex-direction:column;overflow:hidden}
.wc-img{flex:none;width:100%;height:var(--img-h,142px);object-fit:cover;background:var(--lw-media-bg)}
.wc.contain .wc-img{object-fit:contain;padding:8px}
.wc-b{display:flex;flex-direction:column;gap:3px;padding:12px 18px 14px}
.wc h3{font-size:22px;line-height:1.2}
.own{font-family:var(--lw-font-display);font-weight:600;font-size:17px;line-height:1.3;color:var(--lw-accent)}
.own .yr{color:var(--lw-ink-subtle);font-weight:500}
.desc{font-size:18px;line-height:1.35;color:var(--lw-ink-muted)}

/* Feature (picture with facts) */
.feat{display:grid;grid-template-columns:520px minmax(0,1fr);gap:48px;height:100%}
.feat-l{display:flex;flex-direction:column;gap:14px}
.feat-l .pic img{aspect-ratio:16/9}
.thumbs{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.thumbs img{width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:var(--lw-radius);border:1px solid var(--lw-border)}
.feat-r{display:flex;flex-direction:column;gap:16px}
.feat-r h3{font-size:26px}
.pts{display:flex;flex-direction:column;gap:9px}
.pts li{display:flex;gap:12px;align-items:flex-start;font-size:20px;line-height:1.35}
.pts svg{flex:none;margin-top:3px;color:var(--lw-accent)}
.awards{display:flex;flex-direction:column;gap:10px;margin-top:6px}
.award{display:flex;gap:14px;align-items:center;padding:12px 16px;border-radius:var(--lw-radius);background:var(--lw-gold-tint);border:1px solid color-mix(in srgb,var(--lw-gold) 34%,transparent)}
.award svg{flex:none;color:var(--lw-gold)}
.award-t{display:flex;flex-direction:column;gap:1px;font-size:17px;line-height:1.3;color:var(--lw-ink-muted)}
.award-t b{font-family:var(--lw-font-display);font-weight:600;font-size:19px;color:var(--lw-gold)}
.small-notes{display:flex;flex-direction:column;gap:6px;font-size:18px;line-height:1.4;color:var(--lw-ink-muted)}

/* Stats */
.stats-wrap{display:grid;grid-template-columns:minmax(0,1fr) 330px;gap:28px;align-items:center;height:100%}
.stats{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.stat{padding:22px 24px;display:flex;flex-direction:column;gap:10px}
.stat .n{font-family:var(--lw-font-display);font-weight:650;font-size:48px;line-height:1;letter-spacing:-.02em;color:var(--lw-accent)}
.stat p{font-size:19px;line-height:1.4;color:var(--lw-ink-muted)}

/* Platform row */
.avail{display:flex;align-items:center;gap:28px;flex-wrap:wrap}
.avail-label{font-family:var(--lw-font-display);font-weight:600;font-size:18px;color:var(--lw-ink-muted)}
.on-light{display:none}
[data-theme="light"] .on-dark{display:none}
[data-theme="light"] .on-light{display:block}
.tm{font-size:12px;line-height:1.4;color:var(--lw-ink-subtle)}

/* Detail cards and quote */
.detail{display:grid;grid-template-columns:1fr 1fr;gap:22px}
.detail .wc-img{height:176px}
.detail .pts{margin-top:6px;gap:6px}
.detail .pts li{font-size:19px}
.quote{display:flex;gap:16px;align-items:flex-start;margin:0;padding:16px 22px}
.quote svg{flex:none;color:var(--lw-accent);margin-top:2px}
.quote p{font-size:19px;line-height:1.45;color:var(--lw-ink)}
.quote cite{display:block;margin-top:6px;font-style:normal;font-family:var(--lw-font-display);font-weight:600;font-size:16px;color:var(--lw-ink-subtle)}

/* Therapy hardware line, device tiles, grants */
.hw{display:flex;align-items:center;gap:7px;margin-top:2px;font-family:var(--lw-font-display);font-weight:500;font-size:16px;line-height:1.3;color:var(--lw-ink-subtle)}
.hw svg{flex:none;color:var(--lw-accent)}
.dev h3{font-size:20px}
.dev .proj{font-family:var(--lw-font-display);font-weight:600;font-size:17px;line-height:1.3;color:var(--lw-ink)}
.dev .own{font-size:15px}
.dev .desc{font-size:17px;margin-top:3px}
.devlist{display:flex;flex-direction:column;gap:10px}
.devlist ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
.devlist li{display:flex;gap:12px;align-items:center;padding:12px 16px}
.devlist svg{flex:none;color:var(--lw-accent)}
.devlist div{display:flex;flex-direction:column}
.devlist b{font-family:var(--lw-font-display);font-weight:600;font-size:18px;color:var(--lw-ink)}
.devlist span{font-size:16px;color:var(--lw-ink-muted)}
.grants-wrap{display:flex;flex-direction:column;gap:10px}
.grants{display:flex;flex-direction:column;gap:8px}
.grant{display:flex;flex-direction:column;gap:1px;padding:8px 16px;border-radius:var(--lw-radius-sm);background:var(--lw-accent-tint);border:1px solid var(--lw-accent-line)}
.grant b{font-family:var(--lw-font-display);font-weight:600;font-size:18px;color:var(--lw-ink)}
.grant span{font-size:17px;line-height:1.3;color:var(--lw-ink-muted)}
.grants-wrap--row .grants{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}
.grants-wrap--row .grant{padding:8px 12px}
.grants-wrap--row .grant b{font-size:16px}
.grants-wrap--row .grant span{font-size:15px}
.feat--grants{grid-template-columns:500px minmax(0,1fr)}
.feat--grants .feat-l h3{font-size:22px;margin-top:4px}
.feat--grants .pts li{font-size:18px}
.feat--grants .awards{margin-top:0}
.feat--grants .grant{flex-direction:row;align-items:baseline;gap:12px;padding:6px 16px}
.feat--grants .grant b{flex:none;width:122px}
.feat--grants .feat-r{gap:16px}
.feat--grants .award{padding:8px 14px}
.feat--grants .award-t,.feat--grants .award-t b{font-size:16px}

/* Tool */
.tool{display:grid;grid-template-columns:540px minmax(0,1fr);grid-template-rows:minmax(0,1fr) auto;gap:14px 44px;height:100%}
.tool .tm{grid-column:1 / -1}
.tool .quote{padding:14px 18px}
.tool .quote p{font-size:18px}
.tool-r{display:flex;flex-direction:column;gap:14px}
.tool-r .lead{font-size:20px;line-height:1.45;color:var(--lw-ink-muted)}

/* Contact */
.contact .s-in{gap:22px}
.cta{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:40px;align-items:center}
.cta-copy{display:flex;flex-direction:column;gap:16px}
.cta h2{font-size:46px;letter-spacing:-.02em}
.cta .lead{font-size:21px;line-height:1.5;color:var(--lw-ink-muted)}
.emblem{width:300px;height:300px;filter:drop-shadow(0 0 46px var(--lw-glow-strong))}
.reach{display:flex;flex-direction:column;gap:10px;margin-top:6px}
.reach-links{display:flex;flex-direction:column;gap:8px}
.reach-links a{display:inline-flex;align-items:center;gap:10px;font-family:var(--lw-font-display);font-weight:600;font-size:21px}
.reach-links svg{flex:none}
.steps-wrap{margin-top:auto;display:flex;flex-direction:column;gap:12px}
.steps{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px}
.step{display:flex;gap:12px;align-items:center;padding:14px 16px}
.step .n{flex:none;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;font-family:var(--lw-font-display);font-weight:700;font-size:17px;background:var(--lw-accent-tint);color:var(--lw-accent);border:1px solid var(--lw-accent-line)}
.step span{font-family:var(--lw-font-display);font-weight:600;font-size:18px;line-height:1.25}

/* The case for the category */
.case{display:flex;flex-direction:column;gap:20px}
.case-top{display:grid;grid-template-columns:minmax(0,1fr) 400px;gap:40px;align-items:center}
.case--tall .case-top{grid-template-columns:minmax(0,1fr) 460px;flex:1}
.case-pts{display:flex;flex-direction:column;gap:14px}
.case-pts li{display:flex;gap:12px;align-items:flex-start;font-size:20px;line-height:1.4}
.case-pts svg{flex:none;margin-top:3px;color:var(--lw-accent)}
.case .pic img{aspect-ratio:16/9}
.evid{display:grid;grid-template-columns:repeat(var(--cols,2),minmax(0,1fr));gap:16px;margin-top:auto}
.ev{display:flex;flex-direction:column;gap:6px;padding:14px 18px}
.ev-n{font-family:var(--lw-font-display);font-weight:650;font-size:34px;line-height:1;letter-spacing:-.02em;color:var(--lw-accent)}
.ev-t{font-size:16px;line-height:1.4;color:var(--lw-ink)}
.ev-s{margin-top:auto;font-size:12px;line-height:1.35;color:var(--lw-ink-subtle);overflow-wrap:anywhere}
.steps-v{display:flex;flex-direction:column;gap:18px}
.steps-v li{display:grid;grid-template-columns:40px 44px minmax(0,1fr);gap:14px;align-items:center}
.sv-n{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;font-family:var(--lw-font-display);font-weight:700;font-size:19px;background:var(--lw-btn-bg);color:var(--lw-btn-ink)}
.steps-v h3{font-size:23px}
.steps-v p{margin-top:2px;font-size:19px;line-height:1.4;color:var(--lw-ink-muted)}

/* Screen-only bar: home, PDF, contact */
.deckbar{position:sticky;top:0;z-index:10;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:10px clamp(16px,4vw,32px);
  background:var(--lw-header-bg);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border-bottom:1px solid var(--lw-border)}
.db-home{display:inline-flex;color:var(--lw-wordmark)}
.db-home .wordmark{display:block;height:20px;width:auto}
.db-nav{display:flex;align-items:center;gap:clamp(12px,3vw,24px)}
.db-link{display:inline-flex;align-items:center;gap:6px;font-family:var(--lw-font-display);font-weight:600;font-size:15px;text-decoration:none}
.db-cta{display:inline-flex;align-items:center;min-height:38px;padding:.5em 1.1em;border-radius:var(--lw-radius-pill);background:var(--lw-btn-bg);color:var(--lw-btn-ink);
  font-family:var(--lw-font-display);font-weight:600;font-size:15px;text-decoration:none;white-space:nowrap}
.db-cta:hover{background:var(--lw-btn-bg-hover);color:var(--lw-btn-ink)}
a:focus-visible{outline:2px solid var(--lw-accent);outline-offset:3px;border-radius:4px}
.flat .deckbar{display:none}

/* Phones: the slide becomes a column of content at the phone's own width (screen only). */
@media screen and (max-width:700px){
  .db-home .wordmark{height:14px}
  .db-link svg{display:none}
  .prods{gap:10px}
  .prod h3{font-size:16px}
  .prod p{font-size:14px}
  .deck{gap:16px;padding:16px 12px 32px}
  .slide{width:100%;height:auto;zoom:1!important;font-size:16px;border-radius:14px}
  .s-in{position:relative;inset:auto;padding:26px 20px 52px;gap:18px}
  .sb{flex:none}
  .sh h2,.cta h2{font-size:27px}
  .sh .lead,.cta .lead,.tool-r .lead{font-size:16px}
  .eyebrow,.pack-label{font-size:12px}
  .who,.what,.feat,.stats-wrap,.tool,.cta,.detail,.case-top{grid-template-columns:minmax(0,1fr)!important;height:auto;gap:18px}
  .evid{grid-template-columns:minmax(0,1fr)}
  .case-pts li,.steps-v p{font-size:16px}
  .steps-v h3{font-size:18px}
  .ev-n{font-size:28px}
  .ev-t{font-size:15px}
  .grid{grid-template-columns:minmax(0,1fr)!important}
  .wc-img,.detail .wc-img{height:auto!important;aspect-ratio:16/9}
  .wc.contain .wc-img{aspect-ratio:1}
  .facts li,.pts li,.detail .pts li{font-size:16px}
  .items h3,.wc h3{font-size:18px}
  .items p,.desc,.own,.small-notes,.note,.stat p,.quote p,.tool .quote p{font-size:15px}
  .stat .n{font-size:34px}
  .stats{grid-template-columns:1fr 1fr;gap:12px}
  .stat{padding:16px}
  .feat-r h3{font-size:20px}
  .award-t,.award-t b{font-size:15px}
  .pack img{height:44px}
  .pack ul{gap:10px 20px}
  .cover{min-height:700px}
  .cover .bg{height:62%;object-position:71% 50%}
  .cover::after{background:linear-gradient(180deg,transparent 0%,transparent 34%,var(--lw-bg) 62%,var(--lw-bg) 100%)}
  .cover .s-in{position:absolute;inset:0;padding:26px 20px 26px;justify-content:flex-start;gap:16px}
  .cover-copy{margin-top:auto}
  .cover .wordmark{width:220px}
  .cover h1{font-size:34px}
  .cover .lead{font-size:17px}
  .cover-foot{flex-direction:column;gap:8px;font-size:15px}
  .emblem{width:150px;height:150px;order:-1}
  .btn{white-space:normal;font-size:16px;min-height:46px}
  .reach-links a{font-size:15px;overflow-wrap:anywhere}
  .steps{grid-template-columns:minmax(0,1fr)}
  .devlist ul,.grants-wrap--row .grants{grid-template-columns:minmax(0,1fr)}
  .hw,.dev .desc,.grant span,.devlist span{font-size:15px}
  .step span{font-size:16px}
  .avail{gap:16px}
  .sf{left:20px;right:20px;bottom:16px;font-size:11px}
}

@page{size:1280px 720px;margin:0}
@media print{
  html,body{background:var(--lw-bg)}
  .deck{display:block;padding:0}
  .slide{zoom:1!important;border-radius:0;box-shadow:none;break-after:page;page-break-after:always}
  .slide:last-child{break-after:auto;page-break-after:auto}
  .deckbar{display:none}
  /* Shadows and filters print as extra raster images; on a slide they barely show. */
  .card,.pic img,.thumbs img,.btn--primary{box-shadow:none}
  .emblem{filter:none}
}
`;

const SCRIPT = `(function(){var r=document.documentElement;if(location.hash=="#flat")r.classList.add("flat");function f(){var w=r.clientWidth,g=w<700?16:64;r.style.setProperty("--z",r.classList.contains("flat")?1:Math.min(1.5,(w-g)/1280))}f();addEventListener("resize",f)})();`;

// ─── Slide parts ────────────────────────────────────────────────────────────────────────────

interface Ctx {
  deck: Deck;
  n: number;
  total: number;
}

const footer = (c: Ctx) =>
  `<footer class="sf"><span>Luna Wolf Studios, LLC</span><span>lunawolfstudios.com · ${c.n} / ${c.total}</span></footer>`;

const head = (eyebrow: string, title: string, lead?: string) =>
  `<header class="sh"><p class="eyebrow">${esc(eyebrow)}</p><h2>${esc(title)}</h2>${lead ? `<p class="lead">${esc(lead)}</p>` : ""}</header>`;

const slide = (c: Ctx, title: string, body: string, opts: { cls?: string; dark?: boolean; foot?: boolean } = {}) =>
  `<section class="slide ${opts.cls ?? ""}"${opts.dark ? ' data-theme="dark"' : ""} aria-label="Slide ${c.n} of ${c.total}: ${esc(title)}">${body}${opts.foot === false ? "" : footer(c)}</section>`;

async function card(cd: Card, imgW = 760): Promise<string> {
  const meta = [cd.year ? ` <span class="yr">· ${esc(cd.year)}</span>` : ""].join("");
  return `<article class="card wc${cd.contain ? " contain" : ""}"><img class="wc-img" src="${await img(cd.img, imgW)}" alt="${esc(cd.alt)}"${cd.pos ? ` style="object-position:${cd.pos}"` : ""}><div class="wc-b"><h3>${esc(cd.title)}</h3><p class="own">${esc(cd.owner)}${meta}</p><p class="desc">${esc(cd.desc)}</p>${cd.hw ? `<p class="hw">${icon("cube", 16)}${esc(cd.hw)}</p>` : ""}</div></article>`;
}

async function picture(p: Picture, w = 960, cls = "pic"): Promise<string> {
  return `<figure class="${cls}"><img src="${await img(p.src, w)}" alt="${esc(p.alt)}"${p.pos ? ` style="object-position:${p.pos}"` : ""}>${p.caption ? `<figcaption>${esc(p.caption)}</figcaption>` : ""}</figure>`;
}

const points = (pts: string[]) => `<ul class="pts">${pts.map((p) => `<li>${icon("check", 20)}<span>${esc(p)}</span></li>`).join("")}</ul>`;

function quote(id: string): string {
  const r = review(id);
  return `<blockquote class="card quote">${icon("quote", 26)}<div><p>${esc(r.quote)}</p><cite>${esc(r.author)}, ${esc(r.source)}</cite></div></blockquote>`;
}

function grantList(grants: Grant[], row = false): string {
  return `<div class="grants-wrap${row ? " grants-wrap--row" : ""}"><p class="pack-label">Grant funding</p><ul class="grants">${grants
    .map((g) => `<li class="grant"><b>${esc(g.project)}</b><span>${esc(g.line)}</span></li>`)
    .join("")}</ul></div>`;
}

const TM_VALVE = `©2026 Valve Corporation. Steam and the Steam logo are trademarks and/or registered trademarks of Valve Corporation in the U.S. and/or other countries.`;
const TM_NINTENDO = `Nintendo Switch is a trademark of Nintendo.`;
const TM_UNITY = `Luna Wolf Studios is not sponsored by or affiliated with Unity Technologies or its affiliates. Unity and Unity Asset Store are trademarks or registered trademarks of Unity Technologies or its affiliates in the U.S. and elsewhere.`;

// ─── Slides ─────────────────────────────────────────────────────────────────────────────────

async function coverSlide(c: Ctx): Promise<string> {
  const d = c.deck.cover;
  const bg = await img("hero/hero-desktop-final.png", 1920);
  return slide(
    c,
    d.title,
    `<img class="bg" src="${bg}" alt="A wolf's head in front of a full teal moon in a starry night sky.">
<div class="s-in">${wordmark()}
<div class="cover-copy"><p class="eyebrow">${esc(d.eyebrow)}</p><h1>${esc(d.title)}</h1><p class="lead">${esc(d.lead)}</p></div>
<div class="cover-foot"><span>${icon("globe", 20)}lunawolfstudios.com</span><span>${icon("mail", 20)}${EMAIL}</span></div></div>`,
    { cls: "cover", dark: true, foot: false },
  );
}

async function whoSlide(c: Ctx): Promise<string> {
  const products = await Promise.all(
    PRODUCTS.map(
      async (p) =>
        `<li class="card prod"><img src="${await img(p.img, 640)}" alt="${esc(p.alt)}"${p.pos ? ` style="object-position:${p.pos}"` : ""}><div><h3>${esc(p.name)}</h3><p>${esc(p.words)}</p></div></li>`,
    ),
  );
  const logos = await Promise.all(
    c.deck.pack.map(async (name) => {
      const p = PARTNERS.find((x) => x.name === name);
      if (!p) throw new Error(`No partner ${name}`);
      return `<li><img src="${await img(p.logo, 360)}" alt="${esc(p.name)}"></li>`;
    }),
  );
  // Facts: CLAUDE.md "Studio facts"; site.ts; the home page hero ("Three Unity Awards
  // nominations"); servicePages.ts HUB.why ("We teach game development").
  const facts: Array<[string, string, boolean?]> = [
    ["calendar", "Founded in January 2015 by three Wilmington University students"],
    ["mapPin", "Based in Newark, Delaware, USA. We work with clients remotely."],
    ["cube", "We work in Unity, Unreal, Godot, and more."],
    ["award", "Three Unity Awards nominations", true],
    ["graduationCap", "Our team teaches game design at the University of Illinois Urbana-Champaign and Wilmington University."],
  ];
  return slide(
    c,
    "Who we are",
    `<div class="s-in"><div class="who"><div class="who-l">
${head("Who we are", "A game and software development studio", "We build games, Unity tools, VR apps, and software. We ship our own, and we can build yours.")}
<ul class="facts">${facts.map(([i, t, gold]) => `<li><span class="ico${gold ? " ico--gold" : ""}">${icon(i, 20)}</span><span>${esc(t)}</span></li>`).join("")}</ul>
<div class="pack"><p class="pack-label">Our Trusted Pack</p><ul>${logos.join("")}</ul></div>
</div>
<div class="prods-wrap"><p class="pack-label">Our games and tools</p><ul class="prods">${products.join("")}</ul></div>
</div></div>`,
  );
}

async function whatSlide(c: Ctx): Promise<string> {
  const w = c.deck.what;
  return slide(
    c,
    w.title,
    `<div class="s-in">${head(w.eyebrow, w.title)}<div class="sb what">
<ul class="items">${w.items.map((it) => `<li><span class="ico">${icon(it.icon, 22)}</span><div><h3>${esc(it.title)}</h3><p>${esc(it.text)}</p></div></li>`).join("")}</ul>
<div style="display:flex;flex-direction:column;gap:18px">${await picture(w.picture, 900)}${w.note ? `<p class="note">${esc(w.note)}</p>` : ""}</div>
</div></div>`,
  );
}

async function bodySlide(c: Ctx, s: Slide): Promise<string> {
  switch (s.kind) {
    case "cards": {
      const cols = s.cols ?? 3;
      const cards = await Promise.all(s.cards.map((cd) => card(cd)));
      return slide(
        c,
        s.title,
        `<div class="s-in">${head(s.eyebrow, s.title, s.lead)}<div class="sb grid" style="--cols:${cols}${s.imgH ? `;--img-h:${s.imgH}px` : ""}">${cards.join("")}</div></div>`,
      );
    }
    case "feature": {
      const awards = s.awards
        ? `<div class="awards">${s.awards
            .map((a) => `<div class="award">${icon("award", 26)}<div class="award-t"><b>${esc(a.title)}</b><span>${esc(a.body)} · ${esc(a.subject)}</span></div></div>`)
            .join("")}</div>`
        : "";
      const notes = s.notes ? `<div class="small-notes">${s.notes.map((n) => `<p>${esc(n)}</p>`).join("")}</div>` : "";
      if (s.grants)
        return slide(
          c,
          s.title,
          `<div class="s-in">${head(s.eyebrow, s.title)}<div class="sb feat feat--grants">
<div class="feat-l">${await picture(s.picture, 960)}<h3>${esc(s.heading)}</h3>${points(s.points)}</div>
<div class="feat-r">${grantList(s.grants)}${awards}${notes}</div>
</div></div>`,
        );
      return slide(
        c,
        s.title,
        `<div class="s-in">${head(s.eyebrow, s.title)}<div class="sb feat">
<div class="feat-l">${await picture(s.picture, 1040)}${s.awards ? notes : ""}${
          s.thumbs
            ? `<div class="thumbs">${(await Promise.all(s.thumbs.map(async (t) => `<img src="${await img(t.src, 520)}" alt="${esc(t.alt)}">`))).join("")}</div>`
            : ""
        }</div>
<div class="feat-r"><h3>${esc(s.heading)}</h3>${points(s.points)}${awards}${s.awards ? "" : notes}</div>
</div></div>`,
      );
    }
    case "stats": {
      return slide(
        c,
        s.title,
        `<div class="s-in">${head(s.eyebrow, s.title, s.lead)}<div class="sb stats-wrap">
<div class="stats">${s.stats.map((x) => `<div class="card stat"><span class="n">${esc(x.n)}</span><p>${esc(x.text)}</p></div>`).join("")}</div>
<div class="grid" style="--cols:1;--img-h:250px">${await card(s.side, 660)}</div>
</div></div>`,
      );
    }
    case "games": {
      const cards = await Promise.all(s.cards.map((cd) => card(cd, 580)));
      const logos: string[] = [];
      if (s.available.includes("steam"))
        logos.push(
          `<img class="on-dark" src="${svgFile("brands/steam/steam-logo-white.svg")}" alt="Steam" style="height:50px;width:auto"><img class="on-light" src="${svgFile("brands/steam/steam-logo-black.svg")}" alt="Steam" style="height:50px;width:auto">`,
        );
      if (s.available.includes("switch"))
        logos.push(`<img src="${svgFile("brands/nintendo-switch/nintendo-switch-logo-red.svg")}" alt="Nintendo Switch" style="height:64px;width:auto">`);
      return slide(
        c,
        s.title,
        `<div class="s-in">${head(s.eyebrow, s.title)}<div class="sb" style="display:flex;flex-direction:column;gap:26px">
<div class="grid" style="--cols:4;--img-h:170px">${cards.join("")}</div>
<div class="avail"><p class="avail-label">Available on</p>${logos.join("")}</div>
<p class="tm" style="margin-top:auto">${TM_VALVE} ${TM_NINTENDO}</p>
</div></div>`,
      );
    }
    case "detail": {
      const blocks = await Promise.all(
        s.blocks.map(
          async (b) =>
            `<article class="card wc"><img class="wc-img" src="${await img(b.card.img, 1100)}" alt="${esc(b.card.alt)}"><div class="wc-b"><h3>${esc(b.card.title)}</h3><p class="own">${esc(b.card.owner)}</p>${points(b.points)}</div></article>`,
        ),
      );
      return slide(
        c,
        s.title,
        `<div class="s-in">${head(s.eyebrow, s.title)}<div class="sb" style="display:flex;flex-direction:column;gap:20px"><div class="detail">${blocks.join("")}</div>${s.quote ? quote(s.quote) : ""}</div></div>`,
      );
    }
    case "devices": {
      const tiles = await Promise.all(
        s.tiles.map(
          async (t) =>
            `<article class="card wc dev"><img class="wc-img" src="${await img(t.img, 600)}" alt="${esc(t.alt)}"${t.pos ? ` style="object-position:${t.pos}"` : ""}><div class="wc-b"><h3>${esc(t.device)}</h3><p class="proj">${esc(t.project)}</p><p class="own">${esc(t.owner)}</p><p class="desc">${esc(t.text)}</p></div></article>`,
        ),
      );
      const list = s.list
        ? `<div class="devlist"><p class="pack-label">${esc(s.list.title)}</p><ul>${s.list.items
            .map((x) => `<li class="card">${icon("headset", 22)}<div><b>${esc(x.device)}</b><span>${esc(x.text)}</span></div></li>`)
            .join("")}</ul></div>`
        : "";
      return slide(
        c,
        s.title,
        `<div class="s-in">${head(s.eyebrow, s.title)}<div class="sb" style="display:flex;flex-direction:column;gap:18px">
<div class="grid" style="--cols:4;--img-h:${s.grants ? 140 : 156}px">${tiles.join("")}</div>${list}${s.grants ? grantList(s.grants, true) : ""}
</div></div>`,
      );
    }
    case "tool": {
      return slide(
        c,
        s.title,
        `<div class="s-in">${head(s.eyebrow, s.title)}<div class="sb tool">
<div style="display:flex;flex-direction:column;gap:18px">${await picture(s.picture, 1100)}
<div class="avail"><p class="avail-label">Available on</p><img class="on-dark" src="${svgFile("brands/unity/unity-logo-white.svg")}" alt="Unity" style="height:34px;width:auto"><img class="on-light" src="${svgFile("brands/unity/unity-logo-black.svg")}" alt="Unity" style="height:34px;width:auto"></div></div>
<div class="tool-r"><p class="lead">${esc(s.lead)}</p><p><span class="badge badge--gold">${icon("award", 18)}${esc(s.award)}</span></p>${points(s.points)}${quote(s.quote)}</div>
<p class="tm">${TM_UNITY}</p>
</div></div>`,
      );
    }
    case "case": {
      const evidence = s.evidence?.length
        ? `<ul class="evid" style="--cols:${s.evidence.length}">${s.evidence
            .map(
              (e) =>
                `<li class="card ev">${e.n ? `<span class="ev-n">${esc(e.n)}</span>` : ""}<p class="ev-t">${esc(e.text)}</p><p class="ev-s">${esc(e.source)}</p></li>`,
            )
            .join("")}</ul>`
        : "";
      return slide(
        c,
        s.title,
        `<div class="s-in">${head(s.eyebrow, s.title, s.lead)}<div class="sb case${evidence ? "" : " case--tall"}">
<div class="case-top"><ul class="case-pts">${s.points.map((p) => `<li>${icon("check", 22)}<span>${esc(p)}</span></li>`).join("")}</ul>${await picture(s.picture, 900)}</div>
${evidence}
</div></div>`,
      );
    }
    case "steps": {
      return slide(
        c,
        s.title,
        `<div class="s-in">${head(s.eyebrow, s.title, s.lead)}<div class="sb case case--tall"><div class="case-top">
<ol class="steps-v">${s.steps.map((st, i) => `<li><span class="sv-n">${i + 1}</span><span class="ico">${icon(st.icon, 22)}</span><div><h3>${esc(st.title)}</h3><p>${esc(st.text)}</p></div></li>`).join("")}</ol>
${await picture(s.picture, 900)}</div>
</div></div>`,
      );
    }
  }
}

async function contactSlide(c: Ctx): Promise<string> {
  const d = c.deck;
  const page = d.processFrom ? SERVICE_PAGES[d.processFrom] : undefined;
  const steps = (page?.process.steps ?? ENGAGEMENT_STEPS).map((s) => s.title);
  const title = d.cta.title ?? page?.cta.title ?? "Start a project";
  const lead = d.cta.lead ?? page?.cta.lead ?? "";
  const emblem = await img("logo/lws-emblem-512.png", 600);
  const links = [
    `<a href="${ORIGIN}/contact/">${icon("send", 22)}${urlText("/contact/")}</a>`,
    ...d.urls.map((u) => `<a href="${ORIGIN}${u}">${icon("arrowRight", 22)}${urlText(u)}</a>`),
  ];
  return slide(
    c,
    title,
    `<div class="s-in"><div class="cta"><div class="cta-copy"><p class="eyebrow">How to start</p><h2>${esc(title)}</h2><p class="lead">${esc(lead)}</p>
<div class="reach"><p><a class="btn btn--primary" href="mailto:${EMAIL}">${icon("mail", 22)}${EMAIL}</a></p><div class="reach-links">${links.join("")}</div></div></div>
<img class="emblem" src="${emblem}" alt="The Luna Wolf Studios emblem: a wolf's head against a full teal moon.">
</div>
<div class="steps-wrap"><p class="pack-label">How a project runs</p><ol class="steps">${steps.map((t, i) => `<li class="card step"><span class="n">${i + 1}</span><span>${esc(t)}</span></li>`).join("")}</ol></div></div>`,
    { cls: "contact", dark: true },
  );
}

// ─── Deck ───────────────────────────────────────────────────────────────────────────────────

/** The visitor's theme, as the site applies it: `?theme=` or the stored `lw-theme`, else the page default. */
const THEME_SCRIPT = `(function(){var d=document.documentElement,t=null;try{var q=new URLSearchParams(location.search).get("theme");t=q==="light"||q==="dark"?q:localStorage.getItem("lw-theme")}catch(e){}if(t==="light"||t==="dark")d.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.content=d.dataset.theme==="light"?"${SITE.themeColor.light}":"${SITE.themeColor.dark}"})();`;

async function render(deck: Deck, theme: "dark" | "light"): Promise<{ html: string; total: number }> {
  // The reader first: the case for the category, what we build, the work that proves it,
  // then who we are and how to start.
  const body = [deck.work, ...(deck.proof ?? [])];
  const total = 1 + deck.cases.length + 1 + body.length + 2;
  const meta = deckMeta(deck.slug);
  if (total !== meta.slides) {
    throw new Error(`[decks] ${deck.slug} has ${total} slides, but src/data/decks.ts says ${meta.slides}.`);
  }
  let n = 0;
  const ctx = () => ({ deck, n: ++n, total });
  const slides: string[] = [];
  slides.push(await coverSlide(ctx()));
  for (const s of deck.cases) slides.push(await bodySlide(ctx(), s));
  slides.push(await whatSlide(ctx()));
  for (const s of body) slides.push(await bodySlide(ctx(), s));
  slides.push(await whoSlide(ctx()));
  slides.push(await contactSlide(ctx()));
  const html = `<!doctype html>
<html lang="en" data-theme="${theme}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(deck.docTitle)}</title>
<meta name="description" content="${esc(meta.lead)}">
<meta name="robots" content="noindex">
<meta name="theme-color" content="${theme === "light" ? SITE.themeColor.light : SITE.themeColor.dark}">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<script>${THEME_SCRIPT}</script>
<style>${FONTS}
${TOKENS}
${CSS}</style>
</head>
<body>
<header class="deckbar">
<a class="db-home" href="/" aria-label="Luna Wolf Studios home">${wordmark()}</a>
<nav class="db-nav" aria-label="Deck">
<a class="db-link" href="${deckPdf(deck.slug)}" download>${icon("download", 18)}Download PDF</a>
<a class="db-cta" href="/contact/">Contact us</a>
</nav>
</header>
<main class="deck">
${slides.join("\n")}
</main>
<script>${SCRIPT}</script>
</body>
</html>
`;
  return { html, total };
}

function edge(args: string[]) {
  if (!fs.existsSync(EDGE)) throw new Error(`[decks] Edge not found at ${EDGE}. Set EDGE_PATH to print PDFs.`);
  execFileSync(EDGE, ["--headless=new", "--disable-gpu", "--hide-scrollbars", `--user-data-dir=${PROFILE}`, "--no-first-run", ...args], {
    stdio: "pipe",
    timeout: 120000,
  });
}

const fileUrl = (p: string) => "file:///" + p.replace(/\\/g, "/");

/** Page count and page size of a PDF Edge printed (its page dictionaries are uncompressed). */
function pdfInfo(file: string) {
  const s = fs.readFileSync(file, "latin1");
  const pages = (s.match(/\/Type\s*\/Page(?![s\w])/g) ?? []).length;
  const box = s.match(/\/MediaBox\s*\[\s*([\d.\s]+)\]/)?.[1]?.trim();
  return { pages, box };
}

const mb = (bytes: number) => `${(bytes / 1048576).toFixed(2)} MB`;

/** Prints one deck; fails unless it is one 1280x720 page (960x540 pt) per slide. */
function printPdf(htmlFile: string, pdf: string, total: number): string {
  fs.mkdirSync(path.dirname(pdf), { recursive: true });
  edge(["--no-pdf-header-footer", "--virtual-time-budget=4000", `--print-to-pdf=${pdf}`, fileUrl(htmlFile)]);
  const info = pdfInfo(pdf);
  if (info.pages !== total) throw new Error(`[decks] ${path.basename(pdf)} has ${info.pages} pages, expected ${total}.`);
  if (info.box !== "0 0 960 540") throw new Error(`[decks] ${path.basename(pdf)} pages are ${info.box} pt, expected 0 0 960 540.`);
  return `${info.pages} pages, ${mb(fs.statSync(pdf).size)}`;
}

/** One PNG per slide, for review. */
async function shoot(htmlFile: string, slug: string, total: number, dir: string) {
  fs.mkdirSync(dir, { recursive: true });
  const tall = path.join(dir, `${slug}-all.png`);
  edge([`--window-size=1280,${720 * total}`, "--virtual-time-budget=4000", `--screenshot=${tall}`, fileUrl(htmlFile) + "#flat"]);
  for (let i = 0; i < total; i++) {
    await sharp(tall)
      .extract({ left: 0, top: i * 720, width: 1280, height: 720 })
      .toFile(path.join(dir, `${slug}-${String(i + 1).padStart(2, "0")}.png`));
  }
  fs.rmSync(tall);
}

export interface BuildDecksOptions {
  /** Also print the dark PDFs into public/decks/. */
  pdf?: boolean;
  /** Also write light HTML and PDFs, and slide PNGs in both themes, into .review/leads/decks/. */
  extras?: boolean;
  /** Only these slugs. */
  only?: string[];
  log?: (msg: string) => void;
}

export async function buildDecks({ pdf = false, extras = false, only, log = console.log }: BuildDecksOptions = {}) {
  for (const deck of DECKS.filter((d) => !only || only.includes(d.slug))) {
    const { html, total } = await render(deck, "dark");
    const dir = path.join(PUBLIC_DIR, "decks", deck.slug);
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });
    const htmlFile = path.join(dir, "index.html");
    fs.writeFileSync(htmlFile, html);
    const line = [`${deck.slug}: ${total} slides, ${mb(Buffer.byteLength(html))} → public/decks/${deck.slug}/`];
    if (pdf) line.push(`PDF ${printPdf(htmlFile, path.join(PUBLIC_DIR, ...deckPdf(deck.slug).split("/").filter(Boolean)), total)}`);
    if (extras) {
      const lightDir = path.join(LOCAL, "out", "light");
      fs.mkdirSync(lightDir, { recursive: true });
      const light = await render(deck, "light");
      const lightHtml = path.join(lightDir, `luna-wolf-studios-${deck.slug}.html`);
      fs.writeFileSync(lightHtml, light.html);
      line.push(`light PDF ${printPdf(lightHtml, lightHtml.replace(/\.html$/, ".pdf"), total)}`);
      await shoot(htmlFile, deck.slug, total, path.join(LOCAL, "shots", "dark"));
      await shoot(lightHtml, deck.slug, total, path.join(LOCAL, "shots", "light"));
      line.push("slide PNGs");
    }
    log(line.join(", "));
  }
}

const isCli =
  !!process.argv[1] && path.resolve(process.argv[1]).toLowerCase() === fileURLToPath(import.meta.url).toLowerCase();
if (isCli) {
  const args = process.argv.slice(2);
  buildDecks({
    pdf: args.includes("--pdf"),
    extras: args.includes("--extras"),
    only: args.find((a) => a.startsWith("--only="))?.slice("--only=".length).split(","),
    log: (m) => console.log(`[decks] ${m}`),
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
