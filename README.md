<p align="center">
  <img src="public/og-default.png" alt="Luna Wolf Studios" width="600">
</p>

<p align="center"><b>Game and software development studio.</b><br>
Newark, Delaware. Since 2015.</p>

<p align="center">
  <a href="https://lunawolfstudios.com/"><b>Website</b></a> &nbsp;|&nbsp;
  <a href="https://assetstore.unity.com/packages/tools/utilities/scriptable-sheets-284559">Scriptable Sheets</a> &nbsp;|&nbsp;
  <a href="https://www.sheeptag2.com/">Sheep Tag 2</a> &nbsp;|&nbsp;
  <a href="https://discord.gg/jNf5RsaZPp">Discord</a>
</p>

---

## Overview

Source for <https://lunawolfstudios.com>, the studio site of Luna Wolf Studios, LLC.

The site is a static [Astro](https://astro.build) build deployed to GitHub Pages on the apex domain `lunawolfstudios.com`. It replaces the old WordPress site, keeps every one of its URLs working, and follows the stack and conventions of its sister site, [sheeptag2.com](https://www.sheeptag2.com/).

- The project brief, the URL plan, and the copy and SEO rules are in [CLAUDE.md](CLAUDE.md).
- Taking the site live, including the DNS records, is in [docs/launch.md](docs/launch.md).

## Requirements

- Node.js 22 or newer (CI builds on 22; the hourly price check runs on 24)
- npm

## Getting started

```bash
npm ci
npm run dev
```

The dev server runs at `http://localhost:4321`. Open `/styleguide/` to see every component in both themes (add `?theme=light` or `?theme=dark` to any page).

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Runs the prebuild step, then starts the Astro dev server |
| `npm run build` | Runs the prebuild step, then builds the static site into `dist/` |
| `npm run preview` | Serves the contents of `dist/` locally |
| `npm run check` | Runs the prebuild step, then `astro check` for type and template diagnostics |
| `npm run check:data` | Checks the content data: every image exists, slugs are unique, routes are real, and no price or banned claim has crept in |
| `npm run lint:links` | Checks `dist/`: every internal link and asset resolves; every page has a title, description, canonical and one `<h1>` |
| `npm run store` | Reads current prices from the stores and prints what differs from the snapshot |
| `npm run store:update` | Same, and writes `src/data/store.json` |
| `npm run store:test` | Runs the store parsers against saved responses |
| `npm run assets:shrink` | Reports oversized source images in `src/assets/`; add `-- --write` to convert them |
| `npm run brand` | Regenerates the outlined wordmark, favicons, manifest icons and the default Open Graph image (run by hand; output is committed) |

`scripts/build.mts` is the prebuild step, wired to `predev`, `prebuild` and `check`. It runs three named steps:

1. **legacy-uploads.** Copies the WordPress uploads other sites still hotlink (logos, the Hypno Halo logo and icon) from `archive/wordpress/media/` to `public/wp-content/uploads/` at their old paths.
2. **store-data.** In CI, reads current prices from the stores into `src/data/store.json`; locally it uses the committed snapshot. Then publishes the data as `public/store-data.json`.
3. **press.** Writes the press kit downloads into `public/press/`: the studio logos from `brand/` and a zip of them, a zip of the studio photos, and for each project sheet in `src/data/presskit.ts` (`PRESS_SHEETS`) the original screenshots and art under clear names plus two zips (everything, and screenshots only). It fails if a project's kit passes 25 MB.

All of its output is gitignored. Delete it and rerun at any time.

`scripts/brand-assets.mts` outlines the "LUNA WOLF STUDIOS" wordmark from the Soup of Justice font into `src/lib/wordmark.ts`. The font's license allows embedding but not redistribution, so the TTF is read from outside the repo (`--font <path>`, default `S:/splashkit/assets/fonts/soup_of_justice/soupofjustice.ttf`); without it the step is skipped and the committed outlines are kept.

## Repository layout

| Path | Contents |
|---|---|
| `src/pages/` | One file per route. `styleguide.astro` documents the components (noindex) |
| `src/layouts/BaseLayout.astro` | Head (SEO, Open Graph, JSON-LD, theme, fonts), header, footer, video theater |
| `src/components/` | Shared components at the top level, each starting with a comment on how to use it. Page-specific ones sit in a folder named for the page |
| `src/data/` | Everything the pages say that is data. See "Changing content" below |
| `src/lib/` | Helpers: `seo.ts` (JSON-LD builders), `store.ts` (prices), `images.ts` (image lookup), `icons.ts`, `wordmark.ts` (generated) |
| `src/styles/` | `tokens.css` (both themes), `global.css` (base and helpers), `prose.css` (long-form text) |
| `src/scripts/` | Client scripts shared by components (`forms.ts`) |
| `src/assets/` | Images processed at build time. Each folder has a `SOURCES.md` saying where its files came from |
| `public/` | Files served at a fixed URL: favicons, manifest, `og-default.png`, `robots.txt`, `llms.txt`, `privacy.html`, and the hero and splash videos in `media/` |
| `brand/` | The studio logo files the press kit serves |
| `design/splash/` | SplashKit sources and commands for the home page hero video |
| `scripts/` | Prebuild, store price reader, checks, brand asset generator, image shrinker, WordPress archiver |
| `docs/launch.md` | Launch runbook: accounts, GitHub Pages, DNS cutover, rollback |
| `archive/` | Not built. The old WordPress site, the old blog, and research notes with sources. See [archive/README.md](archive/README.md) |

## Changing content

Copy that is a list of things lives in `src/data/`, so a fact is written once and every page that shows it stays in step. Run `npm run check:data` after editing.

| To change | Edit |
|---|---|
| Studio facts, form and analytics settings | `src/data/site.ts` |
| Any external URL | `src/data/links.ts` (the single source of truth) |
| Header menus and footer columns | `src/data/nav.ts` |
| A game, client project, jam game or internship project | `src/data/games.ts`, with its images in `src/assets/games/<slug>/` or `src/assets/portfolio/` |
| The long text of a game page or a service page | `src/data/gamePages.ts`, `src/data/servicePages.ts` |
| Service summaries (cards, menus) | `src/data/services.ts` |
| Reviews and press quotes | `src/data/reviews.ts`. Quotes are curated: the reviewer's own words, chosen for what they say about quality |
| Partners | `src/data/partners.ts`, with a logo on a white square in `src/assets/partners/` |
| Founders and their portfolios | `src/data/team.ts` and `src/data/founders/` |
| Awards, timeline, videos | `src/data/awards.ts`, `timeline.ts`, `videos.ts` |
| The press kit and a game's press sheet (`/presskit/<slug>/`) | `src/data/presskit.ts`. A new entry in `PRESS_SHEETS` makes the page and its downloads |
| The Anatomy of Play embed | `src/components/AnatomyOfPlay.astro`. The app itself lives in the `web-tools` repository; see "Anatomy of Play" in [docs/launch.md](docs/launch.md) |
| A redirect from an old URL | `REDIRECTS` in `src/data/legacy.ts` |

To add a page, create `src/pages/<name>.astro`, render it inside `BaseLayout` with a unique `title` and `description`, add it to the navigation if it belongs there, and add its route to the table in `CLAUDE.md`.

## Store prices

Prices and sales for the studio's games and Scriptable Sheets appear on the site without a visitor's browser ever contacting a store. `scripts/store-data.mts` reads Steam, the Nintendo eShop (US) and the Unity Asset Store listing; the build bakes the result into the HTML from `src/data/store.json` and publishes it as `/store-data.json`. Pages show a price with the `Price` component and never type one by hand.

- **Every hour** (minute 17) `.github/workflows/store-data.yml` reads the stores and compares with the live `/store-data.json`. If a price, discount, sale end date, or the Asset Store rating or version changed, it redeploys. Every push to `main` also refreshes prices. To refresh at once, for example the moment a sale starts: Actions > Store prices > Run workflow.
- **A sale that ends** is also handled in the page: `Price` switches back to the regular price in the visitor's browser once a known end time has passed. Steam and Nintendo give end times; the Asset Store does not.
- **Cost.** The repository is public, and GitHub does not charge for standard runners in public repositories ([billing docs](https://docs.github.com/en/billing/concepts/product-billing/github-actions)), so the hourly check is free. Each check takes well under a minute: a sparse checkout, Node 24 running the script directly, no install. If the repository is ever made private, hourly is about 730 one-minute runs a month, over a third of the free 2,000 minutes; change the `cron` line first.
- **Schedule switched off?** GitHub disables scheduled workflows in a public repository after 60 days without activity. Switch it back on under Actions > Store prices > Enable workflow.
- **Add a product.** Add a row to `src/data/storeCatalog.ts` (slug, store, store ID, URL), run `npm run store:update`, and commit both files.
- **The Asset Store rating.** The listing reports its star rating rounded to a whole star (an average of 4.9 reads as 5). Printing that would overstate the average, so the Scriptable Sheets page prints only the review count, which is exact: "N reviews on the Unity Asset Store". If the listing ever reports a decimal, the page prints "Rated 4.9 out of 5 from N reviews" with no code change.
- **When a source breaks.** Each store is read on its own with a short timeout and one retry. A store that fails, or a value that looks wrong, keeps the previous value and logs a warning; the run still succeeds and nothing is deployed for it. The Asset Store is the fragile one, because it has no API and the listing page is read instead. `npm run store:test` checks the parsers against saved responses in `scripts/fixtures/store/`.

Prices shown are US store prices in USD.

## Forms, newsletter and analytics

All three are configured in [`src/data/site.ts`](src/data/site.ts). Nothing loads a third-party script before the page is interactive.

- **Contact form.** Posts to [FormSubmit](https://formsubmit.co), which relays the message to support@lunawolfstudios.com. With JavaScript the visitor stays on the page; without it the form posts normally and returns to `/contact/?sent=1`. The first message sent from a new domain triggers a one-time activation email from FormSubmit.
- **Newsletter.** `FORMS.newsletter.provider` is `"relay"` until a Kit form exists: signups are emailed to the studio through the same relay. Set it to `"kit"` and fill in `kitFormId` to post to Kit instead, which confirms each address by email. Steps are in [docs/launch.md](docs/launch.md).
- **Analytics.** `ANALYTICS.provider` is `"none"`, `"goatcounter"` or `"metricool"`. Both services are cookieless and are injected after the window's `load` event, in an idle callback.

The privacy policy (`src/pages/privacy-policy.astro`) describes these services. Update it when one changes.

## Design tokens

Dark is the default theme for every visitor; the header toggle switches to light and remembers the choice (`localStorage` key `lw-theme`). `?theme=light|dark` overrides for one page view. All text pairs meet WCAG AA (ratios computed, not estimated):

| Token | Dark | Light |
|---|---|---|
| `--lw-bg` | `#04070a` | `#f3f8f8` |
| `--lw-bg-raised` | `#070d12` | `#e8f1f2` |
| `--lw-surface` | `#0b141a` | `#ffffff` |
| `--lw-ink` | `#eef7f7` (18.5:1) | `#071216` (17.7:1) |
| `--lw-ink-muted` | `#a9c0c4` (10.6:1) | `#3d565c` (7.3:1) |
| `--lw-ink-subtle` | `#7a9399` (6.2:1; 5.3:1 on surface hover) | `#52696f` (5.4:1; 5.1:1 on raised) |
| `--lw-accent` (links) | `#81ebe1` (14.3:1) | `#0f6b66` (5.9:1) |
| Primary button | `#04070a` on `#81ebe1` (14.3:1) | `#ffffff` on `#0f6b66` (6.3:1) |
| `--lw-gold` | `#ffc96b` (13.3:1) | `#8a5a00` (5.5:1) |

The palette comes from the studio logo and the SplashKit brand palette: wordmark teal `#81ebe1`, the moon's five tones, night `#04070a`, and the warm accents gold and rose.

## Redirects and legacy URLs

- Pages that existed on WordPress keep their exact URLs.
- Moved or retired URLs (`/press/`, `/privacy/`, `/internships/`, the five old blog posts, and the 29 WordPress image pages the old sitemap listed) are static meta-refresh pages generated from `REDIRECTS` in `src/data/legacy.ts`, each with a canonical to its target and `noindex`.
- `/privacy.html`, linked from inside older games, is a fixed redirect page in `public/`.
- `/?p=ID` and `/?page_id=ID` short links are forwarded by the home page through `WP_IDS`.
- The 404 page forwards WordPress archive paths (`/category/`, `/tag/`, `/author/`, `/feed/`, `/wp-content/uploads/`).
- The sitemap leaves out redirects, the 404 and the styleguide, and is also served at `/sitemap.xml`, the old WordPress address.
- The old blog is not published. It is kept as Markdown in `archive/blog/`.

## Workflow and deployment

`main` is production. Every push to it deploys.

1. Branch from `main`, make the change, and run `npm run check`, `npm run build` and `npm run lint:links`.
2. Open a pull request. `.github/workflows/ci.yml` runs the store parser tests, `astro check`, a full build, and the link check.
3. Merge. `.github/workflows/deploy.yml` builds, checks links, and publishes to GitHub Pages. It can also be run by hand from the Actions tab.

| Workflow | Runs | Does |
|---|---|---|
| `deploy.yml` | Push to `main`, manual, or called by the price check | Build, link check, deploy to Pages |
| `ci.yml` | Pull requests to `main` | Parser tests, type check, build, link check |
| `store-data.yml` | Hourly, manual | Reads store prices; redeploys only if one changed |

Both build workflows restore Astro's image cache (`node_modules/.astro`), so a run only encodes the images that changed; a cold build encodes about 1,100. If a store cannot be read during a deploy, prices stay as the live site shows them (`STORE_BASELINE_URL` in `deploy.yml`, which follows the Pages address, preview or production).

Dependabot opens one grouped pull request a month for npm packages and one for GitHub Actions.

One-time repository setup: Settings > Pages > Build and deployment > Source: **GitHub Actions**, then the custom domain in the same panel. For a workflow deploy GitHub takes the domain from that setting; `public/CNAME` is kept for the record only. The full sequence, with the DNS records, is in [docs/launch.md](docs/launch.md).

### Preview before the domain is attached

Until the custom domain is set, GitHub Pages serves the site at <https://lunawolfstudios.github.io/WebsiteLunaWolfStudios/>, under the repository name. The deploy workflow handles this by itself: `actions/configure-pages` reports the address, and when it has a sub-path the build becomes a preview build for it. Set the custom domain in Settings > Pages and run "Deploy site" again, and the next build is the production build. No code changes either way.

What a preview build does differently (`SITE_BASE` and `SITE_ORIGIN` set):

- Astro's `base` is the sub-path, so every generated asset URL carries it.
- `scripts/rebase-dist.mjs` then runs over the output: hand-written links such as `/contact/` become `/WebsiteLunaWolfStudios/contact/`, and `https://lunawolfstudios.com/...` in Open Graph tags, JSON-LD, the sitemaps and form return addresses becomes the github.io address. Pages and data files keep writing plain root-relative paths.
- Every page carries `noindex` and no canonical, so search engines leave the preview alone. Shared links still unfurl with the right title and picture.
- `npm run lint:links` checks it as a preview: every internal link must start with the base and resolve.

To build a preview locally (Git Bash needs `MSYS_NO_PATHCONV=1`, or it rewrites the path):

```sh
SITE_BASE=/WebsiteLunaWolfStudios SITE_ORIGIN=https://lunawolfstudios.github.io npx astro build --outDir dist-preview
SITE_BASE=/WebsiteLunaWolfStudios SITE_ORIGIN=https://lunawolfstudios.github.io node scripts/check-links.mjs dist-preview
```

With neither variable set, `npm run build` and `npm run lint:links` are the production build and check, unchanged.

Recommended on `main`: require a pull request and the `CI / check` status before merging (Settings > Branches).

## License

Copyright Luna Wolf Studios, LLC, all rights reserved. See [LICENSE](LICENSE).

---

<p align="center"><sub>Copyright 2015-2026 Luna Wolf Studios, LLC. All rights reserved.</sub></p>
