# Archive

Reference material. Nothing in this folder is built into the site, except the handful of old
upload files that `scripts/build.mts` copies to `public/wp-content/uploads/` so that links
other sites hold to them keep working.

| Folder | Contents |
|---|---|
| `wordpress/` | The WordPress site that lunawolfstudios.com ran on until the 2026 rebuild |
| `blog/` | The five blog posts from that site, as Markdown. The blog is not published on the new site |
| `research/` | Notes gathered for the rebuild, each fact with its source and the date it was checked |

## `wordpress/`

Exported on 21 November 2026 with `scripts/archive-wordpress.mjs` from the live site's REST
API and rendered pages.

- `pages/<slug>.md`: each of the 16 pages as Markdown, with the original URL, title, meta
  description, and dates in the front matter. `pages/<slug>.html` is the full rendered page
  as it was served, theme and all.
- `media/`: all 131 originals from the media library, in their `yyyy/mm/` upload folders.
  Resized copies that WordPress generated are not kept. `media-index.json` lists every file
  with its old URL, upload date, and size.
- `urls.json`: every page and post URL with its WordPress ID. `src/data/legacy.ts` is built
  from it.

The Markdown holds each page's own content. The theme repeated three things on every page,
which are recorded here once rather than in every file:

- **Navigation:** Home; Games (Hypno Halo, HELIX, ParaLily → paralilygame.com, Sheep Tag 2 →
  sheeptag2.com, Haberdashery); About (Jeff, Jeremy, Olivia); Contact.
- **Social links** (top bar and sidebar): email support@lunawolfstudios.com,
  [YouTube](https://youtube.com/channel/UChazyMKvfyTFi5tgD3i_SGg),
  [Twitter](https://twitter.com/lunawolfstudios),
  [LinkedIn](https://www.linkedin.com/company/luna-wolf-studios),
  [Facebook](https://facebook.com/LunaWolfStudio/),
  [Instagram](https://www.instagram.com/lunawolfstudios),
  [Twitch](https://www.twitch.tv/lunawolfstudios),
  [itch.io](https://lunawolfstudios.itch.io/).
- **Footer:** a band reading "Let's create experiences that matter" with a "Contact us"
  button, then "© 2015-2026 · Luna Wolf Studios, LLC. · Privacy Policy · Presskit ·
  Publishing · Internships".

Not exported: two unpublished placeholder posts from 2017 (lorem ipsum), empty theme post
types, plugin settings, and the single Jetpack email subscriber.

How the old site behaved, for anyone comparing: it ran the Highend theme with WPBakery,
Contact Form 7 with reCAPTCHA v3, Jetpack Stats, and a retired Universal Analytics tag. It
redirected `/?p=<id>` and `/?page_id=<id>` to the matching page, `/privacy` to
`/privacy-policy/`, and `/press` to `/presskit/`.

## `blog/`

One Markdown file per post, named `<date>-<slug>.md`, with title, date, author, categories,
tags, and the original URL in the front matter. Images point at the originals in
`wordpress/media/`. `<date>-<slug>.original.html` is the rendered page as it was served.

Three of the posts were uploaded to WordPress from an account whose holder did not write
them. Their byline here is "Luna Wolf Studios", corrected at the owner's direction in both
the Markdown and the saved page.

Also at the owner's direction (November 2026), because this repository is public: the names
and personal profile links of the student team in the Save Samia post, one of those names in
the Summer 2017 post, and a photographer's name in one saved page's image metadata were
removed. Roles and everything else stand as published. Two images the old site had already
lost are replaced by a note. Photo files here and in `src/assets/` carry no location or
author metadata.

On the new site each old post URL redirects to the closest page; the table is in
`src/data/legacy.ts`.

## `research/`

Working notes from the rebuild: store facts for each game, the Scriptable Sheets listing and
Unity Awards record, the itch.io, Newgrounds, and YouTube catalogs, the client portfolio,
verified quotes and studio history, official brand assets and their usage rules, platform
decisions (newsletter, forms, analytics, DNS), the SEO plan, and how the hero media was made.
Store facts such as prices and review counts were true on the day they were read and will
drift. Check the source before reusing one.
