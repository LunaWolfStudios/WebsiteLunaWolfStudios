/**
 * Copy, structure, and downloads for the press kit: the studio sheet at /presskit/ and one
 * project sheet per product at /presskit/<slug>/. The format is presskit() (dopresskit.com),
 * as on sheeptag2.com/presskit and presskit.megacatstudios.com: fact sheet, description,
 * history, projects or features, videos, images, logo and icon, awards and recognition,
 * selected articles, additional links, team or credits, contact.
 *
 * Facts come from src/data/ (site, games, gamePages, scriptableSheets, timeline, awards,
 * reviews, team, links, videos), archive/wordpress/pages/ (presskit.md, hypno-halo.md,
 * helix.md), the research notes in archive/research/, and the Sheep Tag 2 site's own press kit
 * (S:\Unity\WebsiteSheepTag2\src\data\presskit.ts). Descriptions are written in the third
 * person on purpose: they are boilerplate a writer may quote as is.
 *
 * No prices, ratings, review counts, or version numbers here: the sheets read prices through
 * the Price component (src/lib/store.ts). Quotes are referenced by id from reviews.ts, never
 * copied.
 *
 * Downloads are made by the "press" step in scripts/build.mts, which imports this file (so
 * everything here must stay plain TypeScript, with no Astro imports):
 * - the five studio logos (LOGOS) → public/press/logos/ and public/press/luna-wolf-studios-logos.zip
 * - the studio photos (STUDIO_PHOTOS) → public/press/luna-wolf-studios-photos.zip
 * - per project sheet (PRESS_SHEETS), the original screenshots and art under clear names →
 *   public/press/<slug>/, plus <slug>-press-kit.zip (everything) and, when the sheet has art
 *   too, <slug>-screenshots.zip (screenshots only). JPEG and PNG are stored, not recompressed.
 * public/press/ is gitignored and rebuilt every time. The animated logo files live in
 * public/media/press/ (archive/research/hero-media.md).
 */
import { LINKS } from "./links";

export const PRESS_EMAIL = "support@lunawolfstudios.com";

/** The Sheep Tag 2 press kit, which links back here for studio logos and company info. */
export const SHEEP_TAG_2_PRESSKIT = "https://www.sheeptag2.com/presskit";

export const LOGO_ZIP = { href: "/press/luna-wolf-studios-logos.zip", file: "luna-wolf-studios-logos.zip" };
export const PHOTO_ZIP = { href: "/press/luna-wolf-studios-photos.zip", file: "luna-wolf-studios-photos.zip" };

/**
 * The five logo files, the same five the old page offered. `label` is the visible name (the
 * old page's "Full Size", "Full Size Transparent", "Full Size With Text", "Full Size With
 * Text Transparent", and "Text Only", renamed to match the section lead); `src` is the file in
 * brand/ (also used for the on-page preview); `file` is the published name in
 * public/press/logos/, which must not change: outside sites link to it. `transparent` files
 * are previewed on both a dark and a light tile, unless `darkOnly` is set: the teal wordmark
 * is 1.4:1 on white, so it is shown on dark only until there is a version for light
 * backgrounds. `note` is printed under the file's details.
 */
export const LOGOS: Array<{
  label: string;
  src: string;
  file: string;
  width: number;
  height: number;
  transparent: boolean;
  darkOnly?: boolean;
  note?: string;
  alt: string;
}> = [
  {
    label: "Emblem",
    src: "LWS_2048x2048.png",
    file: "luna-wolf-studios-logo-2048.png",
    width: 2048,
    height: 2048,
    transparent: false,
    alt: "Luna Wolf Studios emblem: a wolf's head in front of a full moon, on black.",
  },
  {
    label: "Emblem, transparent",
    src: "LWS_2048x2048_transparent.png",
    file: "luna-wolf-studios-logo-transparent-2048.png",
    width: 2048,
    height: 2048,
    transparent: true,
    alt: "Luna Wolf Studios emblem on a transparent background.",
  },
  {
    label: "Emblem with wordmark",
    src: "LWS_2048x1024_with-text.png",
    file: "luna-wolf-studios-logo-with-text-2048x1024.png",
    width: 2048,
    height: 1024,
    transparent: false,
    alt: "Luna Wolf Studios emblem beside the teal wordmark, on black.",
  },
  {
    label: "Emblem with wordmark, transparent",
    src: "LWS_2048x1024_transparent_with-text.png",
    file: "luna-wolf-studios-logo-with-text-transparent-2048x1024.png",
    width: 2048,
    height: 1024,
    transparent: true,
    alt: "Luna Wolf Studios emblem and wordmark on a transparent background.",
  },
  {
    label: "Wordmark only",
    src: "LWS_1024x1024_transparent_text-only.png",
    file: "luna-wolf-studios-wordmark-1024.png",
    width: 1024,
    height: 1024,
    transparent: true,
    darkOnly: true,
    note: "For dark backgrounds.",
    alt: "The Luna Wolf Studios wordmark in teal, on a transparent background.",
  },
];

/** The wordmark font, linked to the source the old press kit links. */
export const FONT = { name: "Soup of Justice", url: "https://www.dafont.com/soup-of-justice.font" };

/** Brand colours (CLAUDE.md "Brand constants"), the wordmark teal first. */
export const PALETTE: Array<{ group: string; colors: Array<{ hex: string; name: string }> }> = [
  { group: "Wordmark", colors: [{ hex: "#81ebe1", name: "Wordmark teal" }] },
  {
    group: "Eyes",
    colors: [
      { hex: "#00ffff", name: "Eye cyan" },
      { hex: "#71f6f7", name: "Eye light" },
      { hex: "#006666", name: "Eye deep" },
    ],
  },
  {
    group: "Moon",
    colors: [
      { hex: "#ade0e2", name: "Moon 1" },
      { hex: "#90c4c9", name: "Moon 2" },
      { hex: "#76a9b2", name: "Moon 3" },
      { hex: "#5e919a", name: "Moon 4" },
      { hex: "#44777e", name: "Moon 5" },
    ],
  },
  {
    group: "Night, ink, and paper",
    colors: [
      { hex: "#04070a", name: "Night" },
      { hex: "#000000", name: "Ink" },
      { hex: "#ffffff", name: "Paper" },
    ],
  },
  {
    group: "Warm accents",
    colors: [
      { hex: "#ffc96b", name: "Gold" },
      { hex: "#ff7aa8", name: "Rose" },
    ],
  },
];

/**
 * The animated logo: the studio splash that opens our games and trailers (the owner's words;
 * files from archive/research/hero-media.md).
 * Sizes on the page are read from the files at build time.
 */
export const ANIMATED_LOGO: Array<{ label: string; file: string; what: string }> = [
  {
    label: "Splash with sound",
    file: "luna-wolf-studios-splash.webm",
    what: "The full splash in one opaque video, with the howl. 2560×1440, 3.6 seconds, WebM (VP8 and Vorbis).",
  },
  {
    label: "Background only",
    file: "luna-wolf-studios-splash-background.webm",
    what: "The night sky, fog, and snow without the emblem. No audio. 2560×1440, 3.6 seconds, WebM (VP8).",
  },
  {
    label: "Logo with alpha",
    file: "luna-wolf-studios-splash-logo-alpha.webm",
    what: "The animated emblem and wordmark on a transparent background, with the howl, to lay over your own footage. 2560×1440, 3.6 seconds, WebM (VP8 with alpha and Vorbis). Chrome and Firefox show the transparency; Safari does not play it.",
  },
];

/**
 * One-line pitch, then a short description. The owner's direction (decisions.md, second
 * message): say plainly what the studio makes and who it has worked with; each partner is
 * named, and no sentence says the studio owns or built alone another company's product.
 * HELIX is the studio's own project, made with Nemours.
 */
export const PITCH =
  "Luna Wolf Studios is an independent game and software studio in Newark, Delaware, founded in 2015.";

export const DESCRIPTION = [
  "It makes its own games and tools, builds games and software for clients, and publishes games by independent developers. Sheep Tag 2, the standalone successor to the Warcraft III mod Sheep Tag, is coming to Early Access on Steam in 2027.",
  "The studio has worked on games and software with Peloton, Cartoon Network, Barron Associates, Legends of Learning, and Nemours Children's Health. With Nemours Children's Hospital it developed HELIX, its own VR hearing assessment.",
];

/**
 * "About Luna Wolf Studios": the same short boilerplate at the foot of every project sheet,
 * as presskit() sheets carry an "About" block for the developer.
 */
export const BOILERPLATE = [
  "Luna Wolf Studios, LLC is an independent game and software studio in Newark, Delaware, founded in January 2015 by three Wilmington University students. It makes its own games and tools, including Sheep Tag 2, Hypno Halo, and Scriptable Sheets, builds games and software for clients, and publishes games by independent developers on Steam and Nintendo Switch.",
];

/** History in one paragraph; the dated timeline under it carries the milestones. */
export const HISTORY = [
  "The studio's first games came out of game jams and local festivals. Since then it has released games on Steam and Nintendo Switch and a tool on the Unity Asset Store, made VR software, and seen every internship cohort ship a game.",
];

/**
 * Timeline entries (src/data/timeline.ts) left out of the press kit's dated list: event
 * appearances and smaller steps that the About page tells in full. Keyed by `date`.
 */
export const TIMELINE_SKIP = new Set(["2015-11", "2016-11", "2016-11-16", "2017-02", "2017-06", "2017"]);

/** Fact sheet rows from the owner's own words (decisions.md, second message). */
export const SERVICES =
  "Game development, Unity development and editor tools, VR and AR, serious games, and software development";
export const ENGINES = "Mostly Unity; open to Unreal, Godot, and other engines";
export const CLIENTS = "Anywhere: the studio works with clients remotely";
export const INTERNSHIPS = "Remote; small student teams take a game from concept to demo release";

/**
 * Studio and event photos (src/assets/studio/), with the captions the research recorded
 * (archive/research/reviews-partners-history.md, section 5). Left out on purpose: the two
 * photos that clearly show children's faces (gameacon-2016-booth-crowd.jpg,
 * convention-2017-wolf-shirt-cosplay.jpg). People are named only where a blog caption names
 * them. Zipped as /press/luna-wolf-studios-photos.zip under `out`.
 */
export const STUDIO_PHOTOS: Array<{ image: string; out: string; alt: string; caption: string }> = [
  {
    image: "studio/gameacon-2016-team-at-booth.jpg",
    out: "gameacon-2016-luna-wolf-studios-booth.jpg",
    alt: "Three people stand behind the Luna Wolf Studios booth, one in a wolf shirt and an exhibitor badge, with Drift Space Zero and Haberdashery on the screens.",
    caption: "The Luna Wolf Studios booth at GameACon 2016 in Atlantic City.",
  },
  {
    image: "studio/tech2gether-2016-haberdashery-booth.jpg",
    out: "tech2gether-2016-haberdashery-booth.jpg",
    alt: "Jeremy Bregermann gives two thumbs up behind a table with Haberdashery on a TV, beside a tall Haberdashery banner.",
    caption: "Jeremy Bregermann at the Haberdashery booth, Tech2gether 2016.",
  },
  {
    image: "studio/gameacon-2016-demoing-at-booth.jpg",
    out: "gameacon-2016-demoing-at-booth.jpg",
    alt: "A team member in a Luna Wolf Studios shirt holds a controller and talks two visitors through a game, with vendor booths behind them.",
    caption: "Demoing games at GameACon 2016.",
  },
  {
    image: "studio/gameacon-2016-players-at-booth.jpg",
    out: "gameacon-2016-players-at-booth.jpg",
    alt: "Players, seen from behind, race in a four-way split screen, with Haberdashery on a second screen and a Haberdashery flyer on the table.",
    caption: "Drift Space Zero and Haberdashery on show at GameACon 2016.",
  },
  {
    image: "studio/ecrb-2015-game-jam-win-team.jpg",
    out: "east-coast-reboot-2015-game-jam-team.jpg",
    alt: "Six people pose with a Game Jam certificate that has Luna Wolf Studios written on it and an East Coast Reboot logo.",
    caption: "The Luna Wolf Studios team with the East Coast Reboot game jam certificate, 2015.",
  },
  {
    image: "studio/delaware-innovation-awards-2016-ceremony.jpg",
    out: "delaware-innovation-awards-2016.jpg",
    alt: "An overhead view of a crowd in an atrium before the 2016 Delaware Innovation Awards, with a Technically banner by the stage.",
    caption: "The crowd at the 2016 Delaware Innovation Awards, where Haberdashery was nominated for Indie Video Game of the Year.",
  },
  {
    image: "studio/magfest-2017-indie-showcase.jpg",
    out: "magfest-2017.jpg",
    alt: "Two photos of a team member in a wolf shirt and a blazer playing other developers' indie games on the MAGFest show floor.",
    caption: "Playing other developers' indie games at MAGFest 2017.",
  },
  {
    image: "studio/convention-2017-kids-playing-haberdashery.jpg",
    out: "summer-2017-haberdashery-players.jpg",
    alt: "Two young children, seen from behind, play Haberdashery on a monitor at a convention table.",
    caption: "Young players try Haberdashery, summer 2017.",
  },
];

/**
 * The studio's products in the press kit, by slug (games.ts), in the order the site promotes
 * them. Each card shows the product's `wide` art (or `art`) and links to its project sheet
 * (/presskit/<slug>/) and its page on this site. `credit` is the developer and publisher line.
 */
export const PROJECTS: Array<{ slug: string; credit: string; art?: string }> = [
  // The social crop: the key image is 3:2 and its title would be cut by the 16:9 card.
  { slug: "scriptable-sheets", credit: "Developed and published by Luna Wolf Studios", art: "scriptable-sheets/key-image-social.jpg" },
  { slug: "sheep-tag-2", credit: "Developed and published by Luna Wolf Studios" },
  { slug: "hypno-halo", credit: "Developed and published by Luna Wolf Studios" },
  {
    slug: "paralily",
    // Nintendo eShop names Luna Wolf Studios as publisher; Steam names Team ParaLily and Luna Wolf Studios.
    credit: "Developed by Team ParaLily, published by Luna Wolf Studios on Nintendo Switch and co-published on Steam",
  },
  { slug: "the-brave-hearts-ii-false-skies", credit: "Developed by Connor Butler, published by Luna Wolf Studios" },
  { slug: "helix", credit: "Developed by Luna Wolf Studios with Nemours Children's Hospital" },
];

/**
 * Monetization permission, as the owner wrote it on the Sheep Tag 2 press kit (its
 * MONETIZATION), for that game only. It is printed on the Sheep Tag 2 sheet. A policy for the
 * other games is the owner's to write; until then the sheets say nothing about it.
 */
export const MONETIZATION =
  "Luna Wolf Studios allows anyone to publish and monetize videos and streams of Sheep Tag 2 on YouTube, Twitch, and similar services. Let's Plays, streams, and reviews are all welcome. Please link to sheeptag2.com with your content.";

// ─── Project sheets ──────────────────────────────────────────────────────────────────────

/** One downloadable image on a project sheet. */
export interface PressImage {
  /** Path relative to src/assets/: the on-page preview, and the pixel size printed beside it. */
  image: string;
  /**
   * The original file to publish, relative to the repo root, when it is not the `image`
   * itself (the Hypno Halo title logo and icon are PNG originals in the WordPress archive).
   */
  file?: string;
  /** Published file name in /press/<slug>/. Lowercase, with the game's name and the pixel size. */
  out: string;
  /** What it is, on the download card ("Key art, no logo"). */
  label?: string;
  alt: string;
  caption?: string;
  /** PNG with transparency: previewed on a checker-free night tile. */
  transparent?: boolean;
}

export interface PressSheet {
  /** Slug in games.ts; the sheet lives at /presskit/<slug>/. */
  slug: string;
  seo: { title: string; description: string };
  h1: string;
  lead: string;
  /** The hero picture (path relative to src/assets/) and its alt text. */
  hero: { image: string; alt: string };
  /** The game's own full press kit, on its own site. */
  fullKit?: { label: string; href: string };
  /** Fact sheet rows, in order. A row with `price` renders live prices instead of `value`. */
  facts: Array<{ label: string; value?: string; href?: string }>;
  /** Live prices for the fact sheet, by store. */
  prices?: Array<{ store: "steam" | "switch" | "unity"; name: string; unreleasedLabel?: string; freeLabel?: string }>;
  /** Store buttons under the fact sheet. */
  stores?: Array<{ kind: "steam" | "switch" | "unity" | "itch"; href: string; verb: string }>;
  description: string[];
  /** A highlighted note under the description (the photosensitivity warning). */
  note?: { title: string; text: string };
  history?: { paragraphs?: string[]; items?: Array<{ when: string; text: string }> };
  features?: Array<{ text: string; url?: string }>;
  /** YouTube ids from videos.ts, in order. */
  videos?: string[];
  /** A trailer that lives only on Steam: a poster that opens the store page. */
  steamTrailer?: { href: string; image: string; alt: string; title: string };
  screenshots: PressImage[];
  /** Logos, key art, and store art. */
  art: PressImage[];
  /** Review ids from reviews.ts, in order. */
  quotes?: string[];
  /** PRESS items (reviews.ts) about these slugs. */
  pressAbout?: string[];
  links: Array<{ label: string; href: string; note?: string }>;
  /** Studio press contact rows after the email. */
  contact?: Array<{ label: string; text: string; href: string }>;
  monetization?: string;
  /** A badge image shown with the awards (path relative to src/assets/). */
  awardImage?: { image: string; alt: string };
}

const shot = (folder: string, n: number, alt: string, caption?: string): PressImage => {
  const nn = String(n).padStart(2, "0");
  const slug = folder.split("/").pop()!;
  return { image: `${folder}/screenshot-${nn}.jpg`, out: `${slug}-screenshot-${nn}.jpg`, alt, caption };
};

const ST2_SITE = "https://www.sheeptag2.com/";

export const PRESS_SHEETS: PressSheet[] = [
  // ─── Sheep Tag 2 ─────────────────────────────────────────────────────────────────────
  {
    slug: "sheep-tag-2",
    seo: {
      title: "Sheep Tag 2 press kit",
      description:
        "Sheep Tag 2 press kit: fact sheet, history, trailers, screenshots, logo, and key art for the Sheep vs. Wolves game coming to Early Access on Steam in 2027.",
    },
    h1: "Sheep Tag 2 press kit",
    lead: "Screenshots, key art, the logo, trailers, and the facts for our Sheep vs. Wolves strategy game, coming to Early Access on Steam in 2027.",
    hero: {
      image: "games/sheep-tag-2/key-art.jpg",
      alt: "Sheep Tag 2 key art: two sheep run across a farmyard while wolves close in behind them.",
    },
    fullKit: { label: "Full press kit on sheeptag2.com", href: `${ST2_SITE}presskit` },
    facts: [
      { label: "Developer", value: "Luna Wolf Studios (Newark, Delaware, USA)" },
      { label: "Publisher", value: "Luna Wolf Studios" },
      { label: "Release", value: "Early Access on Steam in 2027" },
      { label: "Platforms", value: "Windows, macOS, and Linux, on Steam" },
      { label: "Genre", value: "Asymmetric multiplayer strategy and survival" },
      { label: "Players", value: "Up to 32 online, or solo against bots" },
      { label: "Engine", value: "Unity, with Photon Quantum for online play" },
      { label: "Languages", value: "English (more planned)" },
      { label: "Funding", value: "Kickstarter, funded in November 2021", href: LINKS.sheepTag2Kickstarter },
      { label: "Website", value: "sheeptag2.com", href: ST2_SITE },
    ],
    prices: [{ store: "steam", name: "Steam", unreleasedLabel: "Free to play, never pay to win", freeLabel: "Free to play, never pay to win" }],
    stores: [{ kind: "steam", href: LINKS.sheepTag2Steam, verb: "Wishlist on" }],
    description: [
      "Sheep Tag 2 is a free-to-play team game of Sheep against Wolves for up to 32 players online. The Sheep build farms to wall themselves in and hold out until the timer runs out. The Wolves work together to break in and capture every Sheep. A captured Sheep becomes a Spirit in the pen, and any teammate still standing can save it.",
      "It is the standalone successor to Sheep Tag, a Warcraft III mod that people still play more than twenty years later. Luna Wolf Studios co-founder Jeff is the game's only core developer, working with a small group of artists, composers, and a sound designer.",
    ],
    history: {
      items: [
        { when: "Early 2000s", text: "Sheep Tag starts as a fan-made mod for Warcraft III, based on the Cat and Mouse custom games for StarCraft." },
        { when: "August 2015", text: "Jeff builds the first standalone prototypes of Sheep Tag 2." },
        { when: "2017", text: "Low-poly 3D artist Quaternius joins to make the game's models and animations." },
        { when: "2019", text: "Illustrator Nik Hagialas joins for the concept, cover, and UI art." },
        { when: "2020", text: "Baelex Metcalf, Lazerwolph, and M start work on the 17-track original soundtrack." },
        { when: "November 2021", text: "The Kickstarter is funded, raising $10,072 from 65 backers." },
        { when: "December 2022", text: "The closed beta begins, and every Kickstarter reward is delivered on time." },
        { when: "2027", text: "Early Access on Steam, for Windows, macOS, and Linux." },
      ],
    },
    features: [
      { text: "Up to 32 players online on US, EU, and AU servers. Join a game already in progress." },
      { text: "Solo play against bots at five difficulty levels; bots also fill empty seats online." },
      { text: "More than 20 farm types, from the Straw Farm to Illusion farms your team can walk through and Invisible farms the Wolves cannot see." },
      { text: "Wolf spells (Summon Pack Wolf, Lunar Strike, Phase Shift, Snare Trap), plus potions and upgrades bought with gold." },
      { text: "Five game modes: Classic, Switch, Vamp, VIP, and Practice, with rulesets you can build, save, and share." },
      { text: "A built-in level editor with Steam Workshop sharing, and a free library of community terrains." },
      { text: "Day and night: at night the Sheep cannot see as far, and the Wolves get stronger." },
      { text: "Replays from any player's view, and clips of your best plays exported as video." },
      { text: "Free to play, never pay to win. The optional Supporter Pack adds cosmetics, profile features, and double Wool and XP." },
      { text: "A 17-track original soundtrack by Baelex Metcalf, Lazerwolph, and M." },
    ],
    videos: ["ABIVaCo3QX4", "9eJ0F5nIWL0", "JwVvkdnIIQg", "ZAj3N36xC4k", "_IQO36AQHe0", "7OzmgL1tVVg", "PjNLCQmYS1c", "b-kbfnlHRtY"],
    // Captions and alt text from the Sheep Tag 2 site (src/data/gamePages.ts).
    screenshots: [
      shot("games/sheep-tag-2", 1, "A 32 player game seen from high above, with hundreds of farms filling a green terrain around the pen in the middle.", "Thirty two players, one pasture, and a farm on every patch of grass."),
      shot("games/sheep-tag-2", 2, "Playing as a Wolf, meteors rain down on a Sheep base while the pack waits at its edge.", "Lunar Strike takes a base apart."),
      shot("games/sheep-tag-2", 3, "A Sheep casts Fortify in the middle of a huge grid of farms on ReVoLuTiOn as Wolves close in from the right.", "Fortify your farms when the pack shows up."),
      shot("games/sheep-tag-2", 4, "Sheep and Wolves clash around the pen on a snowy terrain ringed by ice and lava.", "Fighting over the pen on Fire and Ice."),
      shot("games/sheep-tag-2", 5, "Playing as a Wolf, the hunter chases a Sheep between its farms, with the Wolf's abilities and gold on the HUD.", "Hunt as a Wolf."),
      shot("games/sheep-tag-2", 6, "At night a meteor falls toward the pen while Sheep rush in to free the Spirits held there.", "Night raids on the pen."),
      shot("games/sheep-tag-2", 7, "Sheep build on a small island of rock in the middle of a terrain made of lava.", "The Floor Is Lava."),
      shot("games/sheep-tag-2", 8, "In the Wardrobe, a Sheep up on its hind legs tries on a Mushroom hat and Bass Slippers.", "Dress your Sheep in the Wardrobe."),
    ],
    art: [
      { image: "games/sheep-tag-2/logo.png", out: "sheep-tag-2-logo-transparent-1280x720.png", label: "Logo, transparent", alt: "The Sheep Tag 2 logo: green and yellow lettering with a leaf.", transparent: true },
      { image: "games/sheep-tag-2/key-art.jpg", out: "sheep-tag-2-key-art-2560x1440.jpg", label: "Key art, no logo", alt: "Sheep Tag 2 key art: two sheep run across a farmyard while wolves close in behind them." },
      { image: "games/sheep-tag-2/hero.jpg", out: "sheep-tag-2-banner-1920x620.jpg", label: "Wide banner with logo", alt: "A wide Sheep Tag 2 banner: the logo beside a sheep in a farmyard." },
      { image: "games/sheep-tag-2/capsule-600x900.jpg", out: "sheep-tag-2-cover-600x900.jpg", label: "Cover art", alt: "Sheep Tag 2 cover art: a sheep runs across a farmyard with a wolf close behind, under the game's logo." },
      { image: "games/sheep-tag-2/header.png", out: "sheep-tag-2-header-460x215.png", label: "Store header", alt: "The Sheep Tag 2 Steam header: the logo and a sheep." },
      { image: "games/sheep-tag-2/icon-256.png", out: "sheep-tag-2-icon-256.png", label: "Icon", alt: "The Sheep Tag 2 icon.", transparent: true },
    ],
    pressAbout: ["sheep-tag-2"],
    links: [
      { label: "sheeptag2.com", href: ST2_SITE, note: "The game's own site: guides, terrains, and news" },
      { label: "Sheep Tag 2 press kit", href: `${ST2_SITE}presskit`, note: "The full kit, with credits, coverage, and more art" },
      { label: "Steam page", href: LINKS.sheepTag2Steam, note: "Wishlist Sheep Tag 2" },
      { label: "Original Soundtrack", href: LINKS.sheepTag2Soundtrack, note: "The 17-track soundtrack on Steam" },
      { label: "Kickstarter campaign", href: LINKS.sheepTag2Kickstarter, note: "Funded in November 2021" },
      { label: "Steam Workshop", href: LINKS.sheepTag2Workshop, note: "Terrains and rulesets made in the level editor" },
      { label: "Discord", href: LINKS.discord, note: "Talk to the players and the developer" },
    ],
    monetization: MONETIZATION,
  },

  // ─── Hypno Halo ──────────────────────────────────────────────────────────────────────
  {
    slug: "hypno-halo",
    seo: {
      title: "Hypno Halo press kit",
      description:
        "Hypno Halo press kit: fact sheet, trailers, screenshots, the title logo and icon, quotes, and coverage for our score attack game on Steam and Nintendo Switch.",
    },
    h1: "Hypno Halo press kit",
    lead: "Screenshots, the title logo and icon, trailers, quotes, and the facts for our minimalist score attack game on Steam and Nintendo Switch.",
    hero: {
      image: "games/hypno-halo/key-art.jpg",
      alt: "The Hypno Halo title logo in rainbow neon letters, inside rings of glowing halos.",
    },
    facts: [
      { label: "Developer", value: "Luna Wolf Studios (Newark, Delaware, USA)" },
      { label: "Publisher", value: "Luna Wolf Studios" },
      { label: "Release", value: "Steam: October 21, 2025. Nintendo Switch: November 25, 2025." },
      { label: "Platforms", value: "Windows, macOS, and Linux on Steam; Nintendo Switch" },
      { label: "Genre", value: "Minimalist score attack" },
      { label: "Players", value: "1 player, or co-op with shared controls. Up to 8 players on one Nintendo Switch." },
      { label: "Engine", value: "Unity" },
      { label: "Languages", value: "17 on Steam and 13 on Nintendo Switch, including English, French, German, Italian, Spanish, Japanese, Korean, Portuguese, Russian, and Chinese" },
      { label: "Free demo", value: "Hypno Halo Demo on Steam", href: LINKS.hypnoHaloDemo },
    ],
    prices: [
      { store: "steam", name: "Steam" },
      { store: "switch", name: "Nintendo eShop" },
    ],
    stores: [
      { kind: "steam", href: LINKS.hypnoHaloSteam, verb: "Buy on" },
      { kind: "switch", href: LINKS.hypnoHaloSwitch, verb: "Buy on" },
    ],
    description: [
      "Hypno Halo is a minimalist score attack game. There's only one shape that's perfect, eternal, and completely unbothered: the halo.",
      "Play more than 300 handcrafted levels and 51 bonus challenges in six difficulties, set to over 90 minutes of electronic and techno music. Chase high scores alone, or share the controls with friends on one screen for co-op chaos.",
    ],
    note: {
      title: "Photosensitivity warning",
      text: "Players with photosensitivity, and those susceptible to motion sickness, should not play Hypno Halo.",
    },
    history: {
      items: [
        { when: "June 2025", text: "The first trailer goes up on YouTube." },
        { when: "October 2025", text: "Hypno Halo comes out on Steam for Windows, macOS, and Linux on October 21, with a free demo." },
        { when: "November 2025", text: "It reaches Nintendo Switch on November 25." },
      ],
    },
    // The old Hypno Halo page's feature list, with "Immerse yourself in" cut (decisions.md).
    features: [
      { text: "Tackle 300+ handcrafted levels and 51 bonus challenges across 6 difficulties" },
      { text: "90+ minutes of electronic and techno music" },
      { text: "Unlock 50+ achievements and climb the leaderboards" },
      { text: "Full controller and touch screen support" },
      { text: "Steam Deck compatible", url: LINKS.hypnoHaloSteamDeck },
      { text: "Share controls with friends for co-op chaos" },
      { text: "Discover secret endings and hidden surprises" },
    ],
    videos: ["GiCsebs_FK4", "hB-5wimIR_I", "CZq4V7gRbCw", "WjP35zv8zNo"],
    // Steam's eight screenshots. The first four are the four the old press page offered.
    screenshots: [
      shot("games/hypno-halo", 1, "Hypno Halo, round 50 on easy: three neon rings around a single red line, with the Q, W, and E keys lit below.", "Easy, round 50"),
      shot("games/hypno-halo", 2, "Hypno Halo, round 69 on medium: red, blue, and purple rings around a six-spoke wheel, with four keys below.", "Medium, round 69"),
      shot("games/hypno-halo", 3, "Hypno Halo, round 98 on medium: teal and purple rings nest toward the centre over a field of spinning stars.", "Medium, round 98"),
      shot("games/hypno-halo", 4, "Hypno Halo, round 113 on hard: red, yellow, and purple rings with five keys below and a x4 multiplier.", "Hard, round 113"),
      shot("games/hypno-halo", 5, "Hypno Halo, round 134: a yellow ring and a blue ring frame a many-spoked wheel, with a x5 multiplier.", "Round 134"),
      shot("games/hypno-halo", 6, "Hypno Halo, round 155: teal and purple rings over a red background, with six keys below.", "Round 155"),
      shot("games/hypno-halo", 7, "Hypno Halo, round 206: purple and yellow rings over a deep red background, with seven keys below.", "Round 206"),
      shot("games/hypno-halo", 8, "Hypno Halo, round 219: blue, purple, and green rings around a wheel, with seven keys and a x4 multiplier.", "Round 219"),
    ],
    art: [
      {
        image: "games/hypno-halo/key-art.jpg",
        file: "archive/wordpress/media/2025/10/title-logo-2560x1440-1.png",
        out: "hypno-halo-title-logo-2560x1440.png",
        label: "Title logo",
        alt: "The Hypno Halo title logo in rainbow neon on a ring of halos.",
      },
      {
        image: "games/hypno-halo/icon-1024.jpg",
        file: "archive/wordpress/media/2025/10/icon-1024x1024-1.png",
        out: "hypno-halo-icon-1024.png",
        label: "Icon",
        alt: "The Hypno Halo icon: rainbow neon rings crossing over a dark centre.",
      },
      { image: "games/hypno-halo/hero.jpg", out: "hypno-halo-wide-art-2560x827.jpg", label: "Wide art, no logo", alt: "Rainbow neon halos crossing over a green and purple glow, without the logo." },
      { image: "games/hypno-halo/capsule-616x353.jpg", out: "hypno-halo-capsule-1232x706.jpg", label: "Store capsule", alt: "The Hypno Halo store capsule: the title in rainbow neon inside glowing rings." },
      { image: "games/hypno-halo/capsule-600x900.jpg", out: "hypno-halo-cover-600x900.jpg", label: "Cover art", alt: "Hypno Halo cover art: the title in rainbow neon letters inside glowing rings." },
      { image: "games/hypno-halo/header.jpg", out: "hypno-halo-header-920x430.jpg", label: "Store header", alt: "The Hypno Halo Steam header: the title inside glowing rings." },
    ],
    quotes: ["hh-01", "hh-02", "home-01", "home-02", "hh-higher-plain-games"],
    pressAbout: ["hypno-halo"],
    links: [
      { label: "Hypno Halo on Steam", href: LINKS.hypnoHaloSteam, note: "Windows, macOS, and Linux" },
      { label: "Hypno Halo on the Nintendo eShop", href: LINKS.hypnoHaloSwitch, note: "Nintendo Switch" },
      { label: "Free demo on Steam", href: LINKS.hypnoHaloDemo, note: "Hypno Halo Demo" },
      { label: "Hypno Halo on Steam Deck", href: LINKS.hypnoHaloSteamDeck, note: "Our Steam announcement" },
    ],
  },

  // ─── ParaLily ────────────────────────────────────────────────────────────────────────
  {
    slug: "paralily",
    seo: {
      title: "ParaLily press kit",
      description:
        "ParaLily press kit: fact sheet, history, trailer, screenshots, logo, and key art for the hand-drawn puzzle platformer on Steam and Nintendo Switch.",
    },
    h1: "ParaLily press kit",
    lead: "Screenshots, key art, the logo, the teaser trailer, and the facts for Team ParaLily's hand-drawn puzzle platformer, published by Luna Wolf Studios.",
    hero: {
      image: "games/paralily/key-art.jpg",
      alt: "ParaLily key art in black and white: Lily steps out of a portal beside the ParaLily logo.",
    },
    fullKit: { label: "Full press kit on paralilygame.com", href: LINKS.paralilyPresskit },
    facts: [
      { label: "Developer", value: "Team ParaLily (Nate Flynn and Jeff)" },
      { label: "Publisher", value: "Luna Wolf Studios on Nintendo Switch; Team ParaLily and Luna Wolf Studios on Steam" },
      { label: "Release", value: "Steam: November 9, 2021. Nintendo Switch: February 2, 2022." },
      { label: "Platforms", value: "Windows on Steam; Nintendo Switch" },
      { label: "Genre", value: "Precision and puzzle platformer" },
      { label: "Players", value: "Single-player" },
      { label: "Engine", value: "Unity" },
      { label: "Languages", value: "English" },
      { label: "Website", value: "paralilygame.com", href: LINKS.paralily },
    ],
    prices: [
      { store: "steam", name: "Steam" },
      { store: "switch", name: "Nintendo eShop" },
    ],
    stores: [
      { kind: "steam", href: LINKS.paralilySteam, verb: "Buy on" },
      { kind: "switch", href: LINKS.paralilySwitch, verb: "Buy on" },
    ],
    description: [
      "ParaLily is a hand-drawn precision and puzzle platformer. In the middle of the night, Lily's stuffed dinosaur Patches springs to life and runs off through a mysterious door. Lily follows him through a set of dangerous parallel universes, avoiding enemies and collecting magical glyphs along the way.",
      "Lily can shift between the universes at will to avoid danger and solve puzzles, and her momentum carries with her, so a jump that starts in one universe can finish in the next. The released game is the first chapter of her journey. It is made by Team ParaLily, artist Nate Flynn and Luna Wolf Studios co-founder Jeff.",
    ],
    history: {
      items: [
        { when: "Early 2017", text: "Nate Flynn brings Jeff a prototype; the two had made games together before." },
        { when: "September 2017", text: "ParaLily is playable for the first time, at A Video Game Con." },
        { when: "July 2018", text: "It wins Best in Show at Replay FX in Pittsburgh." },
        { when: "November 2021", text: "It comes out on Steam on November 9." },
        { when: "February 2022", text: "It reaches Nintendo Switch on February 2, published by Luna Wolf Studios." },
      ],
    },
    // Steam and Nintendo eShop "Game Features", with "Innovative" cut (decisions.md).
    features: [
      { text: "Familiar platforming and side-scrolling action." },
      { text: "Hand-drawn environments, characters, and animations." },
      { text: "Parallel universe shifting mechanics." },
      { text: "Collectibles, puzzles, and hidden pathways." },
      { text: "Creative multi-layered level designs." },
    ],
    videos: ["JcMM36wFX1U"],
    screenshots: [
      shot("games/paralily", 1, "Lily stands on a mushroom stump in a dark blue forest, with a glowing door on the right."),
      shot("games/paralily", 2, "Lily leaps toward a purple portal over a glowing orange universe, above white rock."),
      shot("games/paralily", 3, "Lily dashes through a purple portal along a mossy log in a misty forest."),
      shot("games/paralily", 4, "Lily stands between columns of fire in a lava cave."),
      shot("games/paralily", 5, "Lily jumps between two floating creatures inside a red-lit cave."),
      shot("games/paralily", 6, "Lily walks along rock ledges in a pale, washed-out desert universe."),
      shot("games/paralily", 7, "Lily faces a creature on a cave ledge, with a purple wall of another universe on the left."),
      shot("games/paralily", 8, "Lily leaps between tree stumps in a dark blue forest while Patches waits on the path ahead."),
      shot("games/paralily", 9, "A round stone puzzle ringed with purple glyph tiles."),
      shot("games/paralily", 10, "Two creatures guard a glowing ring on a ledge in a cave of orange fire, with a purple universe at the left edge."),
    ],
    art: [
      { image: "games/paralily/key-art.jpg", out: "paralily-key-art-1920x1080.jpg", label: "Key art with logo", alt: "ParaLily key art in black and white: Lily steps out of a portal beside the logo." },
      { image: "games/paralily/logo-1024x512.jpg", out: "paralily-logo-1024x512.jpg", label: "Logo", alt: "The ParaLily logo in brush lettering with a lily, on a white brush stroke." },
      { image: "games/paralily/hero.jpg", out: "paralily-banner-1920x620.jpg", label: "Wide banner", alt: "A wide ParaLily banner: the logo, Patches, and Lily stepping out of a portal." },
      { image: "games/paralily/capsule-616x353.jpg", out: "paralily-capsule-616x353.jpg", label: "Store capsule", alt: "The ParaLily store capsule." },
      { image: "games/paralily/capsule-600x900.jpg", out: "paralily-cover-600x900.jpg", label: "Cover art", alt: "ParaLily cover art: Lily steps out of a purple portal while Patches, her stuffed dinosaur, runs ahead." },
      { image: "games/paralily/header.jpg", out: "paralily-header-460x215.jpg", label: "Store header", alt: "The ParaLily Steam header." },
    ],
    awardImage: {
      image: "games/paralily/award-replay-fx-2018-best-in-show.jpg",
      alt: "The Replay FX 2018 Best in Show badge for ParaLily.",
    },
    quotes: ["home-10", "home-11"],
    pressAbout: ["paralily"],
    links: [
      { label: "paralilygame.com", href: LINKS.paralily, note: "The game's own site and devlog" },
      { label: "ParaLily press kit", href: LINKS.paralilyPresskit, note: "Team ParaLily's full kit" },
      { label: "ParaLily on Steam", href: LINKS.paralilySteam, note: "Windows" },
      { label: "ParaLily on the Nintendo eShop", href: LINKS.paralilySwitch, note: "Nintendo Switch" },
      { label: "ParaLily on itch.io", href: LINKS.paralilyItch },
    ],
  },

  // ─── The Brave Hearts II: False Skies ────────────────────────────────────────────────
  {
    slug: "the-brave-hearts-ii-false-skies",
    seo: {
      title: "Brave Hearts II: False Skies press kit",
      description:
        "The Brave Hearts II: False Skies press kit: fact sheet, screenshots, store art, and credits for Connor Butler's voice-acted shoot 'em up on Steam.",
    },
    h1: "The Brave Hearts II: False Skies press kit",
    lead: "Screenshots, store art, and the facts for Connor Butler's fully voice-acted top-down shoot 'em up, published by Luna Wolf Studios on Steam.",
    hero: {
      image: "games/the-brave-hearts-ii-false-skies/capsule-616x353.jpg",
      alt: "The Brave Hearts II: False Skies logo: a riveted metal heart over a fighter jet.",
    },
    facts: [
      { label: "Developer", value: "Connor Butler" },
      { label: "Publisher", value: "Luna Wolf Studios" },
      { label: "Release", value: "August 27, 2026, on Steam" },
      { label: "Platform", value: "Windows" },
      { label: "Genre", value: "Story-driven top-down shoot 'em up" },
      { label: "Players", value: "Single-player" },
      { label: "Engine", value: "Unity" },
      { label: "Languages", value: "English, fully voiced" },
      { label: "Modes", value: "Campaign, Training, Hardcore, FreePlay, and Endless" },
    ],
    prices: [{ store: "steam", name: "Steam" }],
    stores: [{ kind: "steam", href: LINKS.braveHearts2Steam, verb: "Buy on" }],
    description: [
      "The Brave Hearts II: False Skies is a fully voice-acted, story-driven top-down shoot 'em up. Four years after the Cruabar War, autonomous drones start appearing over former war zones and civilian airspace, and the player joins the Brave Hearts as a newly assigned pilot to protect Uflein's airspace.",
      "The campaign runs more than three hours, with 30 visual novel-style cutscenes, boss fights, quick-time moments, and branching mission choices. Developer Connor Butler came through the Luna Wolf Studios internship program, and the studio published the game on Steam.",
    ],
    history: {
      paragraphs: [
        "Connor Butler came through the Luna Wolf Studios internship program. False Skies follows his first game, The Brave Hearts, released on itch.io.",
        "Luna Wolf Studios published it on Steam on August 27, 2026. As publisher the studio handled Steam publishing and platform integration, Windows build verification, Steam achievements, Steam Cloud configuration, controller usability, and release quality assurance.",
      ],
    },
    features: [
      { text: "Fast top-down dogfights with fuel, ammo, and heat to manage, and nine combat pickups." },
      { text: "Four teammates, each with a special ability, cooldowns, and synergy in combat." },
      { text: "Five modes: Campaign, Training, Hardcore, FreePlay, and Endless, with a high score for every mission and mode." },
      { text: "21 aircraft to unlock and fly, variants and skins included, and Reputation Points to earn." },
      { text: "An in-game database, a jukebox for the soundtrack, and a movie browser to replay any cutscene." },
      { text: "Full controller support, DualShock and DualSense included, plus Steam achievements and Steam Cloud." },
    ],
    // The trailer is on Steam only; there is no YouTube upload.
    steamTrailer: {
      href: LINKS.braveHearts2Steam,
      image: "games/the-brave-hearts-ii-false-skies/trailer-poster.jpg",
      alt: "",
      title: "Trailer on Steam",
    },
    screenshots: [
      shot("games/the-brave-hearts-ii-false-skies", 1, "A yellow plane flies over cracked stone ruins as an enemy drone explodes, with health, missiles, and fuel on the HUD."),
      shot("games/the-brave-hearts-ii-false-skies", 2, "Clara Willis's teammate card: her ability gives a random pick-up instantly."),
      shot("games/the-brave-hearts-ii-false-skies", 3, "A plane flies down a river between rocky banks while drones close in."),
      shot("games/the-brave-hearts-ii-false-skies", 4, "A cutscene with three pilot silhouettes as Clara Willis says she is not losing another pilot."),
      shot("games/the-brave-hearts-ii-false-skies", 5, "A plane fires on a drone over a snowy canyon."),
      shot("games/the-brave-hearts-ii-false-skies", 6, "A cutscene with four pilot silhouettes as Spencer Hannigan says he and Fryer found something bizarre in the Hexatron code."),
      shot("games/the-brave-hearts-ii-false-skies", 7, "A plane flies over a lava field while red drones attack."),
      shot("games/the-brave-hearts-ii-false-skies", 8, "The sortie screen: pick a teammate, an aircraft such as the Hawker Tempest MKII, and read the mission intel."),
      shot("games/the-brave-hearts-ii-false-skies", 9, "Elizabeth Fryer stands in silhouette in an underground hangar during a cutscene."),
      shot("games/the-brave-hearts-ii-false-skies", 10, "Choose a mission: intel cards for Cold Steel Horizon and Roots & Rotors list each mission's enemies and the teammates available."),
    ],
    art: [
      { image: "games/the-brave-hearts-ii-false-skies/capsule-616x353.jpg", out: "the-brave-hearts-ii-capsule-1232x706.jpg", label: "Logo art (store capsule)", alt: "The Brave Hearts II: False Skies logo: a riveted metal heart over a fighter jet." },
      { image: "games/the-brave-hearts-ii-false-skies/capsule-600x900.jpg", out: "the-brave-hearts-ii-cover-600x900.jpg", label: "Cover art", alt: "The Brave Hearts II: False Skies cover art: a riveted metal heart over a fighter jet." },
      { image: "games/the-brave-hearts-ii-false-skies/header.jpg", out: "the-brave-hearts-ii-header-920x430.jpg", label: "Store header", alt: "The Brave Hearts II: False Skies Steam header." },
    ],
    links: [
      { label: "The Brave Hearts II: False Skies on Steam", href: LINKS.braveHearts2Steam, note: "Windows" },
      { label: "The Brave Hearts on itch.io", href: "https://connor0453.itch.io/the-brave-hearts", note: "Connor Butler's first game" },
      { label: "Publishing with Luna Wolf Studios", href: "/publishing/", note: "How we publish indie games" },
      { label: "Internships and bootcamp", href: "/bootcamp/", note: "The program Connor Butler came through" },
    ],
  },

  // ─── Scriptable Sheets ───────────────────────────────────────────────────────────────
  {
    slug: "scriptable-sheets",
    seo: {
      title: "Scriptable Sheets press kit",
      description:
        "Scriptable Sheets press kit: fact sheet, videos, screenshots, logo, key image, and quotes for our Unity Asset Store tool, a 2025 Unity Awards nominee.",
    },
    h1: "Scriptable Sheets press kit",
    lead: "Screenshots, the logo and key image, videos, quotes, and the facts for our Unity Editor tool that puts your assets in a spreadsheet.",
    hero: {
      image: "scriptable-sheets/key-image.jpg",
      alt: "The Scriptable Sheets key image: the logo and a feature list beside a table of assets in the Unity Editor.",
    },
    facts: [
      { label: "Developer", value: "Luna Wolf Studios (Newark, Delaware, USA)" },
      { label: "Publisher", value: "Luna Wolf Studios" },
      { label: "Release", value: "July 24, 2024, on the Unity Asset Store" },
      { label: "Platform", value: "Unity Editor, Unity 2020.3 LTS and later" },
      { label: "Runs in", value: "The Unity Editor only. It is stripped from builds, except the samples." },
      { label: "Includes", value: "Full source code, sample projects, and unit tests" },
      { label: "License", value: "Standard Unity Asset Store EULA. Extension Asset, licensed per seat." },
      { label: "Documentation", value: "Scriptable Sheets docs on GitHub", href: LINKS.scriptableSheetsDocs },
    ],
    prices: [{ store: "unity", name: "Unity Asset Store" }],
    stores: [{ kind: "unity", href: LINKS.scriptableSheets, verb: "Get it on the" }],
    description: [
      "Scriptable Sheets shows ScriptableObjects, Prefabs, Components, and other Unity assets in a table, so developers can sort, filter, edit, copy, and paste them in bulk instead of opening assets one at a time in the Inspector.",
      "It imports and exports CSV, TSV, and JSON, pulls data from Google Sheets, and runs only in the Editor, so it is stripped from builds. It was a nominee for Best Development Tool at the 17th Unity Awards.",
    ],
    history: {
      items: [
        { when: "July 2024", text: "Scriptable Sheets launches on the Unity Asset Store on July 24." },
        { when: "November 2025", text: "Scriptable Sheets is a nominee for Best Development Tool, and Luna Wolf Studios a nominee for Breakthrough Publisher, at the 17th Unity Awards." },
      ],
    },
    features: [
      { text: "Every asset of a type in one table: ScriptableObjects, Prefabs, Components, AudioClips, Materials, Meshes, and Textures." },
      { text: "Edit in place, pick and sort columns, and the Inspector follows the cell you select." },
      { text: "Copy to Excel or Google Sheets and paste back. Import CSV and TSV, export JSON, or pull from a Google Sheet shared by link." },
      { text: "Arrays and lists open as their own tables. Nested, generic, and SerializeReference fields work too." },
      { text: "Batch create many ScriptableObjects of a type in one click." },
      { text: "No setup and no coding: new and existing assets appear in a table." },
      { text: "Editor only, stripped from builds. Full source code, samples, and unit tests included." },
      { text: "Unity 2020.3 LTS and later, in both Unity Editor themes." },
    ],
    videos: ["r_FJBZjHUpA", "mteCjA1r3pM", "zGyRCzYJAhM", "PKhTuOgsXJ8"],
    screenshots: [
      { image: "scriptable-sheets/screenshot-06.jpg", out: "scriptable-sheets-screenshot-06.jpg", alt: "Scriptable Sheets in the Unity Editor: a table of RPG unit ScriptableObjects with name colors, portrait icons, weapons, materials, highlight gradients, and skill curves, one unit per row." },
      { image: "scriptable-sheets/screenshot-01.jpg", out: "scriptable-sheets-screenshot-01.jpg", alt: "Three Scriptable Sheets windows: meshes with previews, audio clips with waveforms, and textures with thumbnails, each in its own table." },
      { image: "scriptable-sheets/screenshot-02.jpg", out: "scriptable-sheets-screenshot-02.jpg", alt: "A table of weapon ScriptableObjects with a column picker open, beside the Unity Inspector showing the selected weapon." },
      { image: "scriptable-sheets/screenshot-03.jpg", out: "scriptable-sheets-screenshot-03.jpg", alt: "A loot list in the Unity Inspector and the same list as a Scriptable Sheets collection table with name, quantity, drop chance, and rarity columns." },
      { image: "scriptable-sheets/screenshot-04.jpg", out: "scriptable-sheets-screenshot-04.jpg", alt: "Four Scriptable Sheets windows stacked, with the window menu open on Open Sheet and the options to open, rename, delete, and clone sheets." },
      { image: "scriptable-sheets/screenshot-05.jpg", out: "scriptable-sheets-screenshot-05.jpg", alt: "A Google Sheet of language names and the same rows in a Scriptable Sheets table, with arrows showing data moving both ways." },
      { image: "scriptable-sheets/screenshot-07.jpg", out: "scriptable-sheets-screenshot-07.jpg", alt: "The Scriptable Sheets settings panel beside a table of RPG unit ScriptableObjects, with Paste Pad open below holding the same rows as text." },
      { image: "scriptable-sheets/screenshot-08.jpg", out: "scriptable-sheets-screenshot-08.jpg", alt: "A Scriptable Sheets table of Prefabs with tabs for their GameObject, AudioSource, Transform, Rigidbody, and Text components, beside the settings panel and the Project window." },
      { image: "scriptable-sheets/screenshot-09.jpg", out: "scriptable-sheets-screenshot-09.jpg", alt: "Four Scriptable Sheets tables open at once in the Unity Editor, each listing RPG units with colors, gradients, and curves." },
      { image: "scriptable-sheets/screenshot-10.jpg", out: "scriptable-sheets-screenshot-10.jpg", alt: "A Scriptable Sheets table split between the Unity Editor's light and dark themes, under the words Light and Dark." },
      { image: "scriptable-sheets/screenshot-11.jpg", out: "scriptable-sheets-screenshot-11.jpg", alt: "A full-window Scriptable Sheets table of RPG units in the Unity Editor's light theme, with color, gradient, and curve columns." },
      { image: "scriptable-sheets/screenshot-12.jpg", out: "scriptable-sheets-screenshot-12.jpg", alt: "The same full-window table of RPG units in the Unity Editor's dark theme." },
    ],
    art: [
      { image: "scriptable-sheets/logo.png", out: "scriptable-sheets-logo-transparent-1372x569.png", label: "Logo, transparent", alt: "The Scriptable Sheets logo: the words Scriptable Sheets with a cube and curly braces.", transparent: true },
      { image: "scriptable-sheets/key-image.jpg", out: "scriptable-sheets-key-image-1950x1300.jpg", label: "Key image", alt: "The Scriptable Sheets key image: the logo and a feature list beside a table of assets." },
      { image: "scriptable-sheets/key-image-social.jpg", out: "scriptable-sheets-social-1200x630.jpg", label: "Social image", alt: "Scriptable Sheets, the ultimate asset management tool, over a table of assets." },
      { image: "scriptable-sheets/icon.png", out: "scriptable-sheets-icon-160.png", label: "Icon", alt: "The Scriptable Sheets icon: a cube with curly braces." },
    ],
    quotes: ["home-03", "home-04", "home-06", "ss-karinarigby", "ss-zzbrent", "ss-ftvstudios"],
    links: [
      { label: "Scriptable Sheets on the Unity Asset Store", href: LINKS.scriptableSheets, note: "The listing, with reviews" },
      { label: "Documentation", href: LINKS.scriptableSheetsDocumentation, note: "Setup, settings, search filters, and FAQ on GitHub" },
      { label: "Changelog", href: LINKS.scriptableSheetsChangelog, note: "Every release since 1.0.0" },
      { label: "Video tutorials", href: LINKS.scriptableSheetsPlaylist, note: "The full playlist on YouTube" },
      { label: "Unity Discussions", href: LINKS.scriptableSheetsForum, note: "The release thread on Unity's forum" },
      { label: "Luna Wolf Studios on the Asset Store", href: LINKS.assetStorePublisher, note: "Our publisher page" },
    ],
  },

  // ─── HELIX ───────────────────────────────────────────────────────────────────────────
  {
    slug: "helix",
    seo: {
      title: "HELIX VR hearing assessment press kit",
      description:
        "HELIX press kit: facts, history, features, and screenshots of our VR hearing assessment for Meta Quest 2, developed with Nemours Children's Hospital.",
    },
    h1: "HELIX press kit",
    lead: "Screenshots and the facts for HELIX, our VR hearing assessment for auditory processing disorder, developed with Nemours Children's Hospital.",
    hero: {
      image: "games/helix/helix-pure-tone-crop.jpg",
      alt: "The pure-tone test in VR: cartoon gorillas cheer in a forest as a track marks which ear, left or right, heard each tone.",
    },
    facts: [
      { label: "Developer", value: "Luna Wolf Studios, in collaboration with Nemours Children's Hospital" },
      { label: "Platforms", value: "Meta Quest 2 (formerly Oculus Quest 2), and a web dashboard" },
      { label: "Engine", value: "Unity" },
      { label: "Backend", value: "HIPAA-compliant AWS services (RDS, S3, and EC2)" },
      { label: "Funding", value: "An initial round through the DBI CAT grant program", href: "https://research.udel.edu/dbi-cat-grant-program/" },
      { label: "Pilot study", value: "2023, with about 30 subjects" },
    ],
    description: [
      "HELIX (Hearing EvaLuation using Immersive eXtended reality) turns digits-in-noise, pure-tone, and sound-localization hearing tests into VR games on the Meta Quest 2, to help assess auditory processing disorder.",
      "A HIPAA-compliant backend stores the results, and a web dashboard lets organizations, providers, and patients see them. HELIX was developed in collaboration with Nemours Children's Hospital.",
    ],
    history: {
      items: [
        { when: "Funding", text: "An initial round of funding through the DBI CAT grant program starts development on HELIX." },
        { when: "Testing", text: "Youth group testing sessions accurately assess hearing." },
        { when: "2023", text: "A pilot study with about 30 subjects." },
      ],
    },
    features: [
      { text: "Digits-in-noise, pure-tone, and sound-localization tests played as 3D VR games." },
      { text: "Calibrated audio files for accurate test results." },
      { text: "Real-time feedback during testing, so patients understand their results and progress." },
      { text: "Test data encrypted and uploaded in real time to the HELIX database." },
      { text: "A web dashboard for accounts, data collection, calendars, events, charts of progress over time, and assigning tests." },
    ],
    screenshots: [
      { image: "games/helix/helix-digits-in-noise.jpg", out: "helix-digits-in-noise.jpg", alt: "The digits-in-noise test in VR: a console with three dials set to 3, 8, and 6, and a green button to submit.", caption: "Digits-in-noise test" },
      { image: "games/helix/helix-pure-tone.jpg", out: "helix-pure-tone.jpg", alt: "The pure-tone test in VR: gorillas cheer a correct answer while a track shows L and R markers for each tone.", caption: "Pure-tone test" },
      { image: "games/helix/helix-portal-temple.jpg", out: "helix-portal-temple.jpg", alt: "A stone portal glowing red at the end of a ruined temple that floats in space, with a keypad of dials beside it.", caption: "Digits-in-noise: a portal to unlock" },
      { image: "games/helix/helix-portal-gate.jpg", out: "helix-portal-gate.jpg", alt: "A wooden gate on a green platform in space, with a stone portal and its keypad behind it.", caption: "Digits-in-noise: another world" },
      { image: "games/helix/helix-pure-tone-perfect.jpg", out: "helix-pure-tone-perfect.jpg", alt: "A jungle clearing at night: gorillas cheer, the word Perfect appears overhead, and R and L markers show the ear for each tone.", caption: "Pure tone: a correct answer" },
      { image: "games/helix/helix-drums.jpg", out: "helix-drums.jpg", alt: "Looking down at two drums, one edged in blue and one in red, with a bone drumstick in each hand.", caption: "Pure tone: the drums" },
    ],
    art: [],
    links: [
      { label: "DBI CAT grant program", href: "https://research.udel.edu/dbi-cat-grant-program/", note: "University of Delaware" },
      { label: "Serious games", href: "/services/serious-games/", note: "Our work on games for health, education, and training" },
      { label: "VR and AR development", href: "/services/vr-ar-development/", note: "Virtual and mixed reality built in Unity" },
    ],
  },
];

/** The sheet for a slug. Throws for an unknown slug, so a typo fails the build. */
export function pressSheet(slug: string): PressSheet {
  const hit = PRESS_SHEETS.find((s) => s.slug === slug);
  if (!hit) throw new Error(`[presskit] No press sheet for "${slug}".`);
  return hit;
}

/** Published paths for a sheet's downloads (all under /press/<slug>/). */
export const pressPaths = (s: PressSheet) => {
  const dir = `/press/${s.slug}/`;
  const kitZip = `${s.slug}-press-kit.zip`;
  // A sheet with no art has only screenshots: one zip serves both buttons.
  const shotsZip = s.art.length ? `${s.slug}-screenshots.zip` : kitZip;
  return { dir, kitZip, shotsZip };
};

/** The repo-relative original behind a press image. */
export const pressSource = (p: PressImage) => p.file ?? `src/assets/${p.image}`;
