# Luna Wolf Studios website

Source for <https://lunawolfstudios.com>, the studio site for Luna Wolf Studios, LLC. A static
Astro build deployed to GitHub Pages. It replaces a WordPress site and mirrors the stack,
structure, and quality bar of its sister site, Sheep Tag 2 (`S:\Unity\WebsiteSheepTag2`,
<https://www.sheeptag2.com>). When in doubt about how to build something, read how that repo
did it and do the same.

## What the site is for, in priority order

1. **Win client work.** Luna Wolf Studios builds games, tools, and software for other people.
   Those services must be easy to find in search and easy to act on. Every page leads to
   Contact.
2. **Promote the studio's own products.** Scriptable Sheets (Unity Asset Store tool) and
   Sheep Tag 2 (Early Access on Steam in 2027) come first. Then Hypno Halo, ParaLily, and
   The Brave Hearts II: False Skies (published by the studio for developer Connor Butler).
3. **Load instantly.** Static HTML, almost no JavaScript, no third-party requests on load.
4. **Keep every old URL working.** The WordPress URLs are indexed and linked from stores,
   games, and press. They stay canonical or redirect.

## Stack

- Astro 7, static output, TypeScript strict. No UI framework. Components are `.astro` files
  with scoped `<style>` and small inline `<script>` blocks.
- Images go through `astro:assets` (`<Image>` / `<Picture>`), sourced from `src/assets/`.
  Files in `public/` are copied as is and are only for things that need a fixed URL.
- Fonts are self-hosted with Fontsource (variable `Outfit` for headings, `Inter` for body).
- Icons: brand marks from `simple-icons`, UI glyphs hand-authored, all in `src/lib/icons.ts`
  and rendered by `src/components/Icon.astro`.
- `@astrojs/sitemap` for the sitemap. JSON-LD is built in the page frontmatter and passed to
  the layout.
- Deploys from `main` through `.github/workflows/deploy.yml`. Pull requests run
  `.github/workflows/ci.yml`.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Prebuild, then the dev server at `http://localhost:4321` |
| `npm run build` | Prebuild, then a static build into `dist/` |
| `npm run preview` | Serve `dist/` |
| `npm run check` | Prebuild, then `astro check` |
| `npm run lint:links` | Check every internal link and asset in `dist/` |

## Layout

| Path | Contents |
|---|---|
| `src/pages/` | One file per route |
| `src/layouts/BaseLayout.astro` | Head, SEO tags, theme, header, footer |
| `src/components/` | Shared components. Page-specific ones live in a subfolder named for the page |
| `src/data/` | All copy that is data: site facts, links, navigation, games, services, reviews, partners, team |
| `src/lib/` | Helpers |
| `src/styles/` | `tokens.css` (design tokens, both themes), `global.css` (base styles) |
| `src/assets/` | Images processed at build time |
| `public/` | Files served at a fixed URL |
| `scripts/` | Build and maintenance scripts |
| `archive/` | Not built. The old WordPress site (`wordpress/`), the old blog (`blog/`), and research notes with sources (`research/`) |

## URL rules

- Canonical origin is `https://lunawolfstudios.com` (apex, no `www`), and every URL ends in a
  slash: `/about/`, never `/about`. Internal links are written with the trailing slash.
- Existing pages keep their exact WordPress URLs. New pages follow the same flat pattern.

| URL | Page |
|---|---|
| `/` | Home |
| `/services/` | Services hub (new) |
| `/services/game-development/` | Service page (new) |
| `/services/unity-development/` | Service page (new) |
| `/services/unity-editor-tools/` | Service page (new) |
| `/services/vr-ar-development/` | Service page (new) |
| `/services/serious-games/` | Service page (new) |
| `/services/software-development/` | Service page (new) |
| `/games/` | Games hub |
| `/scriptable-sheets/` | Product page (new) |
| `/sheep-tag-2/` | Game page (new) |
| `/hypno-halo/` | Game page |
| `/paralily/` | Game page (new) |
| `/the-brave-hearts-ii-false-skies/` | Game page (new) |
| `/helix/` | Project page |
| `/haberdashery/` | Game page |
| `/target-crack/` | Game page |
| `/about/` | Studio |
| `/about-jeff/`, `/about-jeremy/`, `/about-olivia/` | Founder pages |
| `/publishing/` | Publishing |
| `/bootcamp/` | Internships and bootcamp |
| `/contact/` | Contact |
| `/newsletter/` | Newsletter signup (new) |
| `/presskit/` | Press kit (studio) |
| `/presskit/sheep-tag-2/`, `/presskit/hypno-halo/`, `/presskit/paralily/`, `/presskit/the-brave-hearts-ii-false-skies/`, `/presskit/scriptable-sheets/`, `/presskit/helix/` | Project press kits (new), one template: `src/pages/presskit/[slug].astro` |
| `/privacy-policy/` | Privacy policy |

Redirects (static meta-refresh pages, set in `astro.config.mjs`): `/press/`, `/press-kit/` →
`/presskit/`; `/privacy/`, `/privacy.html` → `/privacy-policy/`; `/internships/` →
`/bootcamp/`; `/our-blog/`, `/blog/` and the five old blog posts → the closest page. The old
blog is not published; it lives in `archive/blog/`.

## Design system

The look is the studio's own splash screen: a night sky, a teal moon, a wolf. Calm, confident,
and clean. Dark theme is the default. A light theme is one click away and is a first-class
design, not an inversion.

- Tokens live in `src/styles/tokens.css` as `--lw-*` custom properties. `:root` holds the dark
  theme; `[data-theme="light"]` overrides it. Components never hard-code a color.
- Brand constants, from the press kit and the SplashKit palette:
  wordmark teal `#81ebe1`; eye cyan `#00ffff` / `#71f6f7` / `#006666`;
  moon `#ade0e2 #90c4c9 #76a9b2 #5e919a #44777e`; night `#04070a`; ink `#000000`;
  paper `#ffffff`; warm accents gold `#ffc96b` and rose `#ff7aa8`.
  The wordmark font is Soup of Justice and is used for the logo only.
- Text contrast meets WCAG AA in both themes. Focus is always visible.
- Motion: blocks reveal on scroll with `data-reveal`, cards lift on hover, and everything
  stops under `prefers-reduced-motion`.
- Layout helpers: `.wrap` (max width and gutters), `.section` (vertical rhythm), `.btn`,
  `.card`, `.badge`. Reuse them before writing new CSS.

## Performance rules

- No render-blocking requests besides the HTML. CSS is inlined; fonts are preloaded.
- The largest element above the fold is an image or text that is in the HTML. It is never
  injected by script. Above-the-fold images are `loading="eager"` with `fetchpriority="high"`;
  everything else is lazy.
- Every image has width and height so nothing shifts.
- Video and YouTube never load until asked. YouTube is always a poster image that opens the
  shared theater dialog (`youtube-nocookie.com`). The one exception is the home page hero:
  its splash video starts loading only after the page's `load` event, behind a still that is
  already painted, and it is skipped under Save-Data, on a 2G connection, and under
  `prefers-reduced-motion`.
- Embedded apps follow the same rule. Anatomy of Play, our web app on
  tools.lunawolfstudios.com (source in the `web-tools` repository), is shown as a picture
  with a button (`src/components/AnatomyOfPlay.astro`). Its frame is created on the click,
  sandboxed without top navigation, and removed again by "Close".
- No third-party script runs before the page is interactive.

## Copy rules

- Direct and concise. Short sentences, active voice, plain words. Say what we do and what
  the reader gets.
- No filler or hype: no "cutting-edge", "world-class", "leverage", "seamless", "passionate",
  "unlock", "elevate", "immersive" as decoration. Use a number or a named project instead.
- Sentence case for headings. American English. No exclamation marks outside quotes.
- First person plural for the studio ("we"). The wolf pack is part of the voice ("the pack",
  "Our Trusted Pack") but used lightly.
- **Never invent a fact.** Names, dates, numbers, clients, awards, and quotes come from
  `archive/` or `src/data/`. If a fact is missing, leave it out and say so in your report.
- Quotes and reviews are the reviewer's own words, curated by the owner to speak to the
  quality of the product, and shown with their source and link. Use them exactly as
  `src/data/reviews.ts` records them. Never reword one, and never include a feature request,
  a caveat, or a criticism from a review.

## Stores, logos, and prices

- These are the studio's own products, so the platform's mark is shown on store buttons and
  in "Available on" rows. Official artwork lives in `src/assets/brands/` and is used
  unaltered.
- Prices, discounts, sale end dates, and the Asset Store rating are never typed into a page
  or a data file. `scripts/store-data.mts` reads them from Steam, the Nintendo eShop, and the
  Unity Asset Store into `src/data/store.json`; a scheduled workflow rebuilds the site when
  they change. Pages read them through `src/lib/store.ts` and the `Price` component.
- Sheep Tag 2 is "Early Access 2027". Steam carries a target day that may move; the site
  does not print it.

## SEO rules

- One `<h1>` per page that names what the page is about in the words people search for.
- `<title>` up to 60 characters, meta description 140 to 160 characters, both unique.
- Every page passes `title`, `description`, and where it applies `image` and `jsonLd` to
  `BaseLayout`. Subpages pass `breadcrumbs`.
- Link text describes its target. Images have real alt text; decorative ones get `alt=""`.
- Internal links connect services to the projects that prove them and to Contact.

## Studio facts

- Legal name: Luna Wolf Studios, LLC. Founded January 2015 by three Wilmington University
  students. Based in Newark, Delaware, USA.
- Co-founders, named exactly as the old site names them: Jeff, Jeremy Bregermann, Olivia.
  Jeff and Olivia go by first name only on the site. Do not add surnames.
- Contact: support@lunawolfstudios.com.
- Sheep Tag 2, Hypno Halo, ParaLily, and The Brave Hearts II: False Skies are Unity games
  (the owner's word, November 2026; `engine` in `src/data/games.ts`).
- Everything else is in `src/data/` and `archive/`.

- Most of the studio's work has been in Unity, including Lanebreak and Cell to Singularity.
  The studio is open to Unreal, Godot, and other engines.
- The studio works with clients remotely.

## Whose work it is

The owner's rule (November 2026): "Let's not overthink some of this
credit/role/employment/contractor stuff. We make games, here's what we've worked on."

- Say "we", plainly: "Games we've worked on", "We worked on Lanebreak, by Peloton." The
  studio is its founders, and their work is its body of work. No hedging ("on Jeff's
  portfolio", "where our records say") and no employment or contract labels ("contractor",
  "employee", "Jeremy's role:").
- Every project names the company that owns it, as a plain label. No sentence says the
  studio owns, built alone, or published another company's product: "we worked on
  Lanebreak", never "we built Lanebreak" or "our game Lanebreak".
- The studio's own: Sheep Tag 2, Hypno Halo, ParaLily ("our game", made by Team ParaLily:
  artist Nate Flynn and Jeff), Scriptable Sheets, HELIX (with Nemours Children's Hospital),
  Haberdashery, Target Crack, the jam and intern games. Published by the studio: The Brave
  Hearts II (developer Connor Butler).
- The "FDA-approved treatments" line in Jeff's bio refers to the Barron Associates projects.
- "Our Trusted Pack" is the owner's list of partners.

## Pictures before words

The owner's rule: "More images over text the better." A project with art shows its art. A
section that is a wall of paragraphs is cut to what the reader needs. Prefer a grid of image
cards to a list of sentences. Never an image that is not of the thing described, and never
a placeholder that looks like a missing image.
