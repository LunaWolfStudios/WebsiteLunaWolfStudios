/**
 * Shared content types. The data files in src/data/ (games.ts, services.ts, reviews.ts,
 * partners.ts, team.ts, awards.ts, timeline.ts, videos.ts) export arrays of these, and the
 * components in src/components/ take them as props.
 *
 * Image fields are file references resolved by `image()` in src/lib/images.ts: either a
 * path relative to src/assets/ ("games/hypno-halo/cover.png") or a bare file name that is
 * unique under src/assets/ ("peloton.jpg"). A missing file fails the build with a clear error.
 * The data files always use the relative path. `npx tsx scripts/check-data.mts` checks every
 * reference against the disk.
 *
 * Never put a price, discount, sale date, store rating, review count, version number, or
 * follower count in a data file: src/data/store.json holds the store numbers (read through
 * src/lib/store.ts), keyed by the slug and store identifiers recorded here.
 */

/** Outbound store or platform link. `kind` picks the icon and label in StoreButton. */
export type StoreKind =
  | "steam"
  | "switch"
  | "unity"
  | "itch"
  | "newgrounds"
  | "web"
  | "apple"
  | "android"
  | "meta"
  | "kickstarter"
  | "youtube";

export interface StoreLink {
  kind: StoreKind;
  url: string;
  /** Overrides the default label ("Steam", "Nintendo Switch", ...). */
  label?: string;
}

export type GameCategory = "studio" | "published" | "client" | "experience" | "jam" | "internship";
export type GameStatus = "released" | "upcoming" | "in-development" | "archived";

/** The founder pages, by slug. */
export type FounderSlug = "jeff" | "jeremy" | "olivia";

/** Shape of an image file: portrait (the 2:3 capsule and other tall art), landscape, or square. */
export type ImageShape = "portrait" | "landscape" | "square";

export interface Game {
  slug: string;
  title: string;
  category: GameCategory;
  /** Release year, or the year the old site gives for a contract role. Left out when sources disagree. */
  year?: number;
  status?: GameStatus;
  /**
   * A short release or context line where a year alone does not say it: "Early Access 2027",
   * "Summer 2025 internship". Shown instead of, or beside, the year.
   */
  releaseNote?: string;
  /** One line, shown on cards. At most 90 characters. */
  tagline: string;
  /** One to three factual sentences. */
  summary: string;
  /**
   * What the studio or a founder did, in the old site's own words. Undefined when the old site
   * states no role (it only credits the owner, "Lanebreak by Peloton"). For the Kodeco
   * tutorials it is the credit the tutorial page shows.
   */
  role?: string;
  /** Who owns the IP when it is not the studio (client or developer name). */
  owner?: string;
  /** Developer as the store or official page names it. */
  developer?: string;
  /** Publisher as the store or official page names it. */
  publisher?: string;
  /** Game engine, only where a source or the owner states it. Never guessed. */
  engine?: string;
  platforms?: string[];
  /** Internal page on this site ("/hypno-halo/"). Cards link here first, else to links[0]. */
  page?: string;
  /** Store and official links. Empty when no working official page exists. */
  links: StoreLink[];
  /**
   * Best available card art. Its shape is `coverShape` (portrait, the 2:3 capsule, when left
   * out). No cover means no usable art: render a text card.
   */
  cover?: string;
  coverShape?: ImageShape;
  /** Landscape art (16:9 or wider), for wide cards and heroes. */
  wide?: string;
  /** Square art (an icon or logo), for compact tiles. */
  icon?: string;
  /** Screenshots, in display order. */
  screenshots?: string[];
  /** YouTube id of the trailer. */
  videoId?: string;
  featured?: boolean;
  /** Founder pages that list the project (team.ts FOUNDER_PORTFOLIO has the grouping and order). */
  listedBy?: FounderSlug[];
  /** Store identifiers the price pipeline keys on (src/data/storeCatalog.ts). Digits only. */
  steamAppId?: string;
  /** Nintendo eShop NSUID (US). */
  nsuid?: string;
  /** Unity Asset Store package id. */
  assetStoreId?: string;
  /** Game jam the entry was made for, and the result where research or the studio records one. */
  jam?: { name: string; year?: number; theme?: string; result?: string };
  /** Team size and schools (internship projects). Interns are not named. */
  team?: string;
  /** Feature lines, exactly as the official page words them. */
  features?: Array<{ text: string; url?: string }>;
  /** Named credits (music, art, development) as the official page gives them. */
  credits?: Array<{ name: string; role: string; url?: string }>;
}

/**
 * Work that is not a game card: the studio's Unity tool, web apps, tutorials, tabletop
 * credits, screen credits, and prototypes in development. Same fields as Game, its own
 * categories (GameCard only takes GameCategory).
 */
export type ProjectCategory = "tool" | "app" | "tutorial" | "tabletop" | "screen" | "prototype";

export interface Project extends Omit<Game, "category"> {
  category: ProjectCategory;
}

export interface Service {
  slug: string;
  title: string;
  /** A few words for menus and cards. */
  short: string;
  summary: string;
  /** Icon name from src/lib/icons.ts. */
  icon: string;
  bullets: string[];
  /** Names of projects that prove the service (slugs from GAMES or PROJECTS). */
  proof: string[];
  /** "/services/game-development/" */
  page: string;
  /** Search phrases the SEO plan assigns to the page (archive/research/seo-plan.md). */
  keywords?: string[];
}

export type ReviewKind = "press" | "curator" | "store" | "player" | "client" | "judge" | "intern";

export interface Review {
  /** Stable id ("home-01", "ss-karinarigby"). */
  id?: string;
  /** Reproduced exactly, without surrounding quote marks. */
  quote: string;
  author: string;
  /** Publication, platform or organisation. */
  source: string;
  url?: string;
  /** What the review is about, crediting the owner where it is not ours ("Lanebreak by Peloton"). */
  about: string;
  /** Slug of the game or project in games.ts ("studio" for the studio, "internship" for the program). */
  aboutSlug?: string;
  kind: ReviewKind;
  /**
   * False when research could not find the source (private judge feedback, unattributed
   * testimonials, a source that is gone). The owner's curated quotes stay; the orchestrator
   * lists these for the owner.
   */
  verified?: boolean;
  /** A line to show with the quote ("Translated from Russian"). */
  note?: string;
  /** Review date, ISO, when known. */
  date?: string;
}

/** A press article, video, podcast or list that covers a game (linked, not quoted). */
export interface PressItem {
  title: string;
  outlet: string;
  url: string;
  /** ISO date when known. */
  date?: string;
  /** Game or project slug. */
  about: string;
  kind: "article" | "review" | "video" | "podcast" | "list";
  /** Language when it is not English. */
  language?: string;
}

export interface Partner {
  name: string;
  /** Canonical site. Left out for a partner whose site is closed or no longer resolves. */
  url?: string;
  /** Logo file (the WordPress logos are 180px JPGs on white). */
  logo: string;
  kind?: "company" | "school" | "organization";
  /**
   * A long wordmark (the file is trimmed to it, not a square): PartnerCloud gives it a tile
   * two columns wide, so the name is large enough to read.
   */
  wide?: boolean;
}

export interface Founder {
  slug: FounderSlug;
  name: string;
  role: string;
  page: string;
  photo: string;
  /**
   * Where the face is in the photo, for round crops (FounderPhoto): x and y from 0 to 1,
   * and how far to zoom in (1 = the photo just covers the circle).
   */
  photoFocus?: { x: number; y: number; zoom?: number };
  blurb: string;
  links: Array<{ label: string; url: string; icon?: string }>;
  /** Contact address as the founder page gives it. */
  email?: string;
}

export interface Award {
  year: number;
  /** Includes the status word, so a badge never reads as a win: "Nominee, Best Development Tool". */
  title: string;
  /** The awarding body or event. */
  body: string;
  note?: string;
  url?: string;
  /** What won (a game title, a person, the studio). */
  subject: string;
  /** Slug in games.ts, "studio" for the studio, or a founder slug. */
  subjectSlug?: string;
  /** The status word the source uses: "Nominee", "Selected", "1st place", "Best in Show". */
  status?: string;
  /** "studio": only the studio's own pages state it. Left out when research verified it. */
  source?: "studio";
  /** A founder's personal award, not the studio's. */
  personal?: boolean;
}

export interface TimelineEntry {
  /** Sortable date: "2015", "2015-01", or "2015-01-31". */
  date: string;
  /** How the date reads on the page: "January 2015", "2015", "Summer 2025". */
  when: string;
  /** One or two factual sentences. */
  text: string;
  /** Slug of the game or project the entry is about. */
  slug?: string;
  /** Photo in src/assets/studio/ (or another folder), with its caption. */
  photo?: string;
  caption?: string;
  /** "studio": only the studio's own account supports it. */
  source?: "studio";
}

export interface VideoItem {
  /** YouTube video id. */
  id: string;
  title: string;
  /** Poster image file, resolved like every other image field. */
  poster: string;
  /** A second video id the theater plays when this one ends. */
  next?: string;
  /** "1:31" */
  length?: string;
  /** Publish date on YouTube, ISO (for VideoObject uploadDate). */
  published?: string;
  /** Channel, when it is not the studio's own. */
  channel?: string;
  /** Game or project slug the video is about. */
  about?: string;
}
