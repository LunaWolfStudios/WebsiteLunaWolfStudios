/**
 * Legacy WordPress URLs. The old site's permalinks are indexed by search engines and linked
 * from stores, games and press, so every one of them keeps working: pages that survive keep
 * their exact URL, and everything else lands here.
 *
 * - `REDIRECTS` feeds `redirects` in astro.config.mjs. Each key becomes a static
 *   meta-refresh page (`/press/index.html` and so on) with a canonical to the target and
 *   `noindex`. Keys have no trailing slash; Astro serves them at `/key/`. Targets end in `/`.
 * - `WP_IDS` maps WordPress post and page IDs (from archive/wordpress/urls.json) to their new
 *   URL. WordPress answered `/?p=440` and `/?page_id=1533` by redirecting to that ID's
 *   permalink, and short links still point at that form; the home page reads the query
 *   string and forwards (see src/pages/index.astro and `wpQueryRedirectScript`).
 * - `DEAD_PATTERNS` are WordPress archive paths with no equivalent here. The 404 page sends
 *   them somewhere useful.
 *
 * Note: `/privacy.html` (linked from inside older games) is a hand-written redirect page in
 * public/, since a redirect key cannot end in `.html`.
 */

export const REDIRECTS: Record<string, string> = {
  // Press kit aliases
  "/press": "/presskit/",
  "/press-kit": "/presskit/",
  // Legal
  "/privacy": "/privacy-policy/",
  // Internships run through the bootcamp page
  "/internships": "/bootcamp/",
  "/internship": "/bootcamp/",
  // Newsletter
  "/subscribe": "/newsletter/",
  // The blog is retired (archived in archive/blog/); its index points at the studio page
  "/our-blog": "/about/",
  "/blog": "/about/",
  // The old front page's own slug
  "/game-design-and-development": "/",
  // The five old blog posts, each to the page about its main subject
  "/luna-wolf-studios-summer-2017-project-update": "/sheep-tag-2/",
  "/magfest-2017": "/about/",
  "/save-samia-endless-arcade-runner": "/games/",
  "/haberdashery-at-gameacon-2016": "/haberdashery/",
  // Plan C's jam win, Haberdashery at Tech2gether, and the Delaware Innovation Awards: all
  // three are November 2016 entries in the timeline on /about/.
  "/plan-c-diw-ecrb-t2g": "/about/",
  // The two game pages' first addresses, as children of Games. WordPress still redirected
  // them, and the Summer 2017 blog post links one.
  "/games/haberdashery": "/haberdashery/",
  "/games/target-crack": "/target-crack/",
  // Lightning Luther had a page of its own until 2018; its card is on the games page.
  "/lightning-luther": "/games/",
  // WordPress attachment pages. The old image sitemap listed every one of these, so they are
  // indexed. Each goes to the page that now shows the image.
  "/lws_2048x2048": "/presskit/",
  "/lws_2048x2048_transparent": "/presskit/",
  "/lws_2048x1024_with-text": "/presskit/",
  "/lws_2048x1024_transparent_with-text": "/presskit/",
  "/lws_1024x1024_transparent_text-only": "/presskit/",
  "/lws_1024x512": "/presskit/",
  "/lws_512x512": "/presskit/",
  "/lws_114x114": "/presskit/",
  "/lws_72x72": "/presskit/",
  "/lws_57x57": "/presskit/",
  "/cropped-lws_512x512-jpg": "/presskit/",
  "/jeff_headshot": "/about-jeff/",
  "/img_1199": "/about/",
  "/sheep-tag-2_600x900": "/sheep-tag-2/",
  // Lightning Luther screenshots (the files match src/assets/games/lightning-luther/).
  "/screenshot_2017-10-19_23-02-20-4127": "/games/",
  "/screenshot_2017-10-19_23-03-17-5312": "/games/",
  "/screenshot_2017-10-19_23-03-23-5319": "/games/",
  "/screenshot_2017-10-19_23-03-34-9495": "/games/",
  "/screenshot_2017-10-19_23-04-08-3988": "/games/",
  "/paralily_600x900": "/paralily/",
  "/haberdashery_pc_9-21-15-2015-09-21-17-53-13-75": "/haberdashery/",
  "/haberdashery_pc_9-21-15-2015-09-21-17-53-34-56": "/haberdashery/",
  "/haberdashery_pc_9-21-15-2015-09-21-17-55-58-64": "/haberdashery/",
  "/haberdashery_pc_9-21-15-2015-09-21-18-14-33-00": "/haberdashery/",
  "/haberdashery_pc_9-21-15-2015-09-21-18-17-15-69": "/haberdashery/",
  "/lanebreak_600x900": "/games/",
  "/cell-to-singularity_600x900": "/games/",
  "/citytopia_469x704": "/games/",
  "/travelers-refrain_600x900": "/games/",
};

/** WordPress post, page and attachment IDs → new URL. Answers `/?p=ID`, `/?page_id=ID` and `/?attachment_id=ID`. */
export const WP_IDS: Record<number, string> = {
  // Pages
  5: "/", // game-design-and-development (the front page)
  48: "/about/", // our-blog
  153: "/games/",
  327: "/target-crack/",
  344: "/haberdashery/",
  440: "/privacy-policy/",
  960: "/about-jeff/",
  1010: "/helix/",
  1040: "/about/",
  1052: "/about-jeremy/",
  1095: "/contact/",
  1479: "/hypno-halo/",
  1533: "/presskit/",
  1552: "/bootcamp/",
  1609: "/publishing/",
  1638: "/about-olivia/",
  // Attachments (the one the Wayback Machine has a link to: a Hypno Halo screenshot)
  1485: "/hypno-halo/",
  // Posts
  379: "/about/", // plan-c-diw-ecrb-t2g
  386: "/haberdashery/", // haberdashery-at-gameacon-2016
  395: "/games/", // save-samia-endless-arcade-runner
  478: "/about/", // magfest-2017
  575: "/sheep-tag-2/", // luna-wolf-studios-summer-2017-project-update
};

/**
 * WordPress archive paths the static site has no page for, tested in order against the
 * missed path by the 404 page. `pattern` is a RegExp source string so it can be handed to
 * the inline script as JSON.
 */
export const DEAD_PATTERNS: Array<{ pattern: string; to: string }> = [
  { pattern: "^/(category|tag|author)(/|$)", to: "/about/" },
  { pattern: "^/feed(/|$)", to: "/" },
  { pattern: "^/[^/]+/feed(/|$)", to: "/" },
  // Paged blog and home archives (/our-blog/page/2/, /page/2/) and anything else under the blog.
  { pattern: "^/(our-blog|blog)/.+", to: "/about/" },
  { pattern: "^/page/\\d+/?$", to: "/" },
  // WordPress attachment pages nested under a page (/games/logo512/, /target-crack/img_2970/):
  // each goes to its parent. These only run on a 404, so the real pages are never affected.
  { pattern: "^/haberdashery/[^/]+/?$", to: "/haberdashery/" },
  { pattern: "^/hypno-halo/[^/]+/?$", to: "/hypno-halo/" },
  { pattern: "^/target-crack/[^/]+/?$", to: "/target-crack/" },
  { pattern: "^/plan-c-diw-ecrb-t2g/[^/]+/?$", to: "/about/" },
  { pattern: "^/(games|lightning-luther|save-samia-endless-arcade-runner)(/|$)", to: "/games/" },
  { pattern: "^/wp-content/uploads(/|$)", to: "/presskit/" },
];

/**
 * Inline head script for the home page: forwards `/?p=ID`, `/?page_id=ID` and
 * `/?attachment_id=ID` to the page that ID now lives at. Runs before first paint, so the
 * visitor never sees the home page flash. Unknown IDs stay on the home page.
 */
export function wpQueryRedirectScript(): string {
  const base = buildBase();
  // A preview build (served under the repository name on github.io) writes every target
  // with its base; the production script stays exactly as it was.
  const ids = base ? Object.fromEntries(Object.entries(WP_IDS).map(([id, to]) => [id, base + to])) : WP_IDS;
  return `(function(){var m=${JSON.stringify(ids)},q=new URLSearchParams(location.search),id=q.get("p")||q.get("page_id")||q.get("attachment_id");if(id&&m[id]&&m[id]!==${JSON.stringify(base + "/")})location.replace(m[id]+location.hash)})();`;
}

/**
 * The build's base path without its trailing slash: "" in production, "/WebsiteLunaWolfStudios"
 * in a github.io preview build (see src/lib/base.ts). Read inside the functions only, never at
 * the top level: astro.config.mjs imports this file to read REDIRECTS, and the config is
 * loaded outside Vite, where import.meta.env does not exist.
 */
function buildBase(): string {
  return (import.meta.env?.BASE_URL ?? "/").replace(/\/+$/, "");
}

/**
 * Inline head script for the 404 page: retries a mixed-case address in lower case, then
 * forwards a missed WordPress archive path (`DEAD_PATTERNS`) to its page. In a preview build
 * the patterns are tested against the path without the base, and every target gets it.
 */
export function deadPathRedirectScript(): string {
  const base = buildBase();
  if (!base) {
    return `(function(){var p=location.pathname,l=p.toLowerCase(),r=${JSON.stringify(DEAD_PATTERNS)};if(p!==l){location.replace(l+location.search+location.hash);return}for(var i=0;i<r.length;i++){if(new RegExp(r[i].pattern,"i").test(p)){location.replace(r[i].to);return}}})();`;
  }
  const patterns = DEAD_PATTERNS.map(({ pattern, to }) => ({ pattern, to: base + to }));
  // Only the part after the base is lowered: the repository name keeps its capitals.
  return `(function(){var b=${JSON.stringify(base)},f=location.pathname;if(f.indexOf(b+"/")!==0)return;var p=f.slice(b.length),l=p.toLowerCase(),r=${JSON.stringify(patterns)};if(p!==l){location.replace(b+l+location.search+location.hash);return}for(var i=0;i<r.length;i++){if(new RegExp(r[i].pattern,"i").test(p)){location.replace(r[i].to);return}}})();`;
}
