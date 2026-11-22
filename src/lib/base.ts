/**
 * The site's base path. Production serves the site at the domain root, so `BASE` is "" and
 * every helper here returns its input unchanged. A preview build on GitHub Pages without the
 * custom domain is served under the repository name (SITE_BASE in astro.config.mjs), and
 * then `BASE` is "/WebsiteLunaWolfStudios".
 *
 * Pages and data keep writing root-relative paths ("/contact/"); the preview build adds the
 * base to those after the build (scripts/rebase-dist.mjs). What this file is for is the
 * other direction: `Astro.url.pathname` includes the base, so code that compares the current
 * page with a root-relative href strips it first with `sitePath()`.
 */
export const BASE: string = import.meta.env.BASE_URL.replace(/\/+$/, "");

/** True for a sub-path preview build (github.io before the domain is attached). */
export const IS_PREVIEW = BASE !== "";

/** The current page's path as the site writes it: "/WebsiteLunaWolfStudios/about/" → "/about/". */
export function sitePath(pathname: string): string {
  if (!BASE) return pathname;
  if (pathname === BASE) return "/";
  return pathname.startsWith(`${BASE}/`) ? pathname.slice(BASE.length) : pathname;
}
