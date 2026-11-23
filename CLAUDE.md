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
| `/coppervalle-rush/`, `/railbound/`, `/on-the-rocks/` | Internship game pages (new) |
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

The old WordPress site is kept on HostGator at `legacy.lunawolfstudios.com`, marked
`noindex`. This site does not link to it. DNS is at Squarespace Domains; how the records and
the legacy host are set up is in `docs/launch.md`.

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
- Do not explain the page or ourselves. No caption, note, hint, or lead that says how a
  control works, where something loads from, or what the visitor can already see ("Each card
  names the studio", "It loads from ... when you press the button").
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
- Jeremy's full name is for his own page, the founder cards, the press kit, and credits that
  stand alone (a game's developer, an award). In a sentence he is "Jeremy".
- Contact: support@lunawolfstudios.com.
- Sheep Tag 2, Hypno Halo, ParaLily, and The Brave Hearts II: False Skies are Unity games
  (the owner's word, November 2026; `engine` in `src/data/games.ts`).
- Everything else is in `src/data/` and `archive/`.

- Engines: the site says "Unity, Unreal, Godot, and more" (the owner's wording). Not
  "mostly Unity; open to...". Lanebreak and Cell to Singularity are Unity games too.
- Unity, stated plainly (the owner): we have worked with every render pipeline, and with
  Unity versions as far back as Unity 4; we like to work in modern versions, 2022 and up.
  No list of which project uses which version or pipeline. A product's own supported
  versions (Scriptable Sheets: Unity 2020.3 LTS and later) are a product fact and stay.
- The studio works with clients remotely.
- The studio has no public Discord. The Sheep Tag 2 server is linked from Sheep Tag 2's page
  and press sheet only (`LINKS.sheepTag2Discord`).
- The studio's GitHub is not listed with the socials (footer, contact, newsletter, press
  kit links, `sameAs`), and the site does not link its repositories. A founder's own GitHub
  profile is fine on the founder cards and pages. Product documentation keeps its links,
  without saying "on GitHub".

## Speak as the company

The service copy speaks as the studio, not as its founders.

- The service pages, the services hub, the home page's services, and the publishing offer
  never name a founder. They say "we" and "our team": "We build in Unreal Engine 5 with C++,
  and our team teaches Unreal Engine at ...", not "Jeremy Bregermann works in Unreal".
- No "who you'll work with" strip of founders on a service page, and no founder's name as a
  label on a service page's project card.
- Everywhere else founders are named as before: `/about/`, the founder pages, the bootcamp's
  mentors, the press kit's team, product and project pages (the Scriptable Sheets pitch,
  Sheep Tag 2's history, HELIX's team, a game's credits), a photo caption, and a quote that
  names them.

## Whose work it is

We make games, and the site shows what we have worked on, with no credit, role,
employment, or contractor bookkeeping.

- Say "we", plainly: "Games we've worked on", "We worked on Lanebreak, by Peloton." The
  studio is its founders, and their work is its body of work. No hedging ("on Jeff's
  portfolio", "where our records say") and no employment or contract labels ("contractor",
  "employee", "Jeremy's role:"). No founder's name as a label or link on a project card
  either ("Jeremy's experience").
- Every project names the company that owns it, as a plain label. No sentence says the
  studio owns, built alone, or published another company's product: "we worked on
  Lanebreak", never "we built Lanebreak" or "our game Lanebreak".
- The studio's own: Sheep Tag 2, Hypno Halo, ParaLily ("our game", made by Team ParaLily:
  artist Nate Flynn and Jeff), Scriptable Sheets, HELIX (with Nemours Children's Hospital),
  Haberdashery, Target Crack, the jam and intern games. Published by the studio: The Brave
  Hearts II (developer Connor Butler).
- The "FDA-approved treatments" line in Jeff's bio refers to the Barron Associates projects.
- Relevate Health Games: we have worked on dozens of its training and education projects,
  playable ads among them, for patients and for healthcare providers (HCPs) (the owner,
  November 2026). The site names a few (Discover TD, Level One, Expression Lab, and the CORE
  Concepts in Telehealth Interactive Game for the American Heart Association), never every
  one, and never a drug's brand name. Playable ads are a service we offer
  in any field, described at `/services/serious-games/#playable-ads`. The healthcare ones
  are experience we bring, credited to Relevate Health Games: the copy never reads as
  competing with them.
- "Our Trusted Pack" is the owner's list of partners.

## Pictures before words

More images, less text. A project with art shows its art. A
section that is a wall of paragraphs is cut to what the reader needs. Prefer a grid of image
cards to a list of sentences. Never an image that is not of the thing described, and never
a placeholder that looks like a missing image.

A game's card shows the art that carries its logo (Sheep Tag 2: `key-art-logo.jpg`). The
art without the logo is for a hero that lays the logo over it.

## Latest work first

The site leads with the latest work: Sheep Tag 2, Scriptable Sheets, Hypno Halo, ParaLily,
and the projects on Anatomy of Play. Older projects are shown with care.

- Every list of work runs newest first. Nothing old leads a page, a section, a menu, or a
  founder's portfolio (his 2014 to 2016 reel sits at the foot of his page).
- The ten projects on Anatomy of Play lead any list of health, fitness, and education work:
  HELIX, Lanebreak, Discover TD, Level One, Expression Lab, NeuroSPARKS, GRASP, KneeBRIGHT,
  MOVE-IT, iCare.
- Jam entries, early prototypes, and older small games (Haberdashery, Target Crack, Turbo
  Hobo Cannon) sit under "Game jams, prototypes, and legacy projects". Never "graveyard".
- Rowan of Bramblebrook, Jeremy's game in development, is in the Games menu below The Brave
  Hearts II and has its own section on the games hub.
- Citytopia is not shown anywhere (the owner's call).
- Studio photos come from recent events, and the recent ones lead `/about/` and the press
  kit. The owner picks them: `.review/photos/` (not in git) holds the keep or remove gallery
  and his choices; `src/data/photos.ts` holds the set, his captions, and the row layout
  (`Gallery`'s `rows`, which shows portrait and landscape photos together without cropping).
  A photo he removed is not used anywhere. No photo shows a child's face.

## Notes and commit messages

- A commit message says what changed, in this repository's style (`feat:`, `fix:`, `docs:`,
  a short body). It never quotes a chat message and never says who asked for a change or
  when.
- Comments and this file state the rule itself, not the conversation that led to it.
