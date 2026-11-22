/**
 * Site navigation: the header menus, the mobile menu and the footer columns all render
 * from here, so a page is added to the navigation in one place.
 */

export interface NavLink {
  label: string;
  href: string;
  /** Short line shown under the label in the desktop menu. */
  hint?: string;
}

export interface NavItem {
  label: string;
  href: string;
  /** Menu entries. A `divider: true` entry draws a rule before the entries that follow. */
  children?: Array<NavLink | { divider: true }>;
}

export const isDivider = (x: NavLink | { divider: true }): x is { divider: true } => "divider" in x;

export const NAV: NavItem[] = [
  {
    label: "Services",
    href: "/services/",
    children: [
      { label: "Game development", href: "/services/game-development/" },
      { label: "Unity development", href: "/services/unity-development/" },
      { label: "Unity editor tools", href: "/services/unity-editor-tools/" },
      { label: "VR and AR development", href: "/services/vr-ar-development/" },
      { label: "Serious games", href: "/services/serious-games/" },
      { label: "Software development", href: "/services/software-development/" },
      { divider: true },
      { label: "Publishing", href: "/publishing/", hint: "Bring your game to Steam and Switch" },
      { label: "Internships and bootcamp", href: "/bootcamp/", hint: "Learn in a working studio" },
    ],
  },
  {
    label: "Games",
    href: "/games/",
    children: [
      { label: "Sheep Tag 2", href: "/sheep-tag-2/" },
      { label: "Hypno Halo", href: "/hypno-halo/" },
      { label: "ParaLily", href: "/paralily/" },
      { label: "The Brave Hearts II", href: "/the-brave-hearts-ii-false-skies/" },
      { label: "HELIX", href: "/helix/" },
      // In the old site's Games menu too.
      { label: "Haberdashery", href: "/haberdashery/" },
      { divider: true },
      { label: "All games", href: "/games/" },
    ],
  },
  { label: "Scriptable Sheets", href: "/scriptable-sheets/" },
  {
    label: "About",
    href: "/about/",
    children: [
      { label: "Studio", href: "/about/" },
      { label: "Jeff", href: "/about-jeff/", hint: "Co-founder" },
      { label: "Jeremy", href: "/about-jeremy/", hint: "Co-founder" },
      { label: "Olivia", href: "/about-olivia/", hint: "Co-founder" },
      { divider: true },
      { label: "Press kit", href: "/presskit/" },
    ],
  },
];

export const CONTACT_HREF = "/contact/";

/** Footer link columns. */
export const FOOTER_COLUMNS: Array<{ title: string; links: NavLink[] }> = [
  {
    title: "Services",
    links: [
      { label: "All services", href: "/services/" },
      { label: "Game development", href: "/services/game-development/" },
      { label: "Unity development", href: "/services/unity-development/" },
      { label: "Unity editor tools", href: "/services/unity-editor-tools/" },
      { label: "VR and AR development", href: "/services/vr-ar-development/" },
      { label: "Serious games", href: "/services/serious-games/" },
      { label: "Software development", href: "/services/software-development/" },
    ],
  },
  {
    title: "Games and tools",
    links: [
      { label: "All games", href: "/games/" },
      { label: "Scriptable Sheets", href: "/scriptable-sheets/" },
      { label: "Sheep Tag 2", href: "/sheep-tag-2/" },
      { label: "Hypno Halo", href: "/hypno-halo/" },
      { label: "ParaLily", href: "/paralily/" },
      { label: "The Brave Hearts II", href: "/the-brave-hearts-ii-false-skies/" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "About", href: "/about/" },
      { label: "Publishing", href: "/publishing/" },
      { label: "Internships and bootcamp", href: "/bootcamp/" },
      { label: "Press kit", href: "/presskit/" },
      { label: "Contact", href: "/contact/" },
    ],
  },
];

/**
 * Is `href` the current page or one of its ancestors? Used to mark the active nav entry.
 * Home only matches itself.
 */
export const isCurrent = (path: string, href: string) =>
  href === "/" ? path === "/" : path === href || path.startsWith(href);
