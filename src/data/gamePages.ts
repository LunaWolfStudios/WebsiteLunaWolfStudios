/**
 * Long-form content for the game and project pages: /sheep-tag-2/, /hypno-halo/, /paralily/,
 * /the-brave-hearts-ii-false-skies/, /haberdashery/, /target-crack/. The GamePage template
 * (src/components/games/GamePage.astro) renders one entry; the card facts (title, platforms,
 * store links, credits, feature lines) stay in games.ts and are read from there.
 *
 * Sources, per page:
 * - Sheep Tag 2: S:\Unity\WebsiteSheepTag2\src\data\{presskit,screenshots,links}.ts (facts,
 *   captions and alt text); archive/research/games-steam.md. Copy here is written fresh, not
 *   lifted from sheeptag2.com, which stays the game's home in search.
 * - Hypno Halo: archive/wordpress/pages/hypno-halo.md (every block is carried over) and
 *   archive/research/games-steam.md (dates, platforms, players, languages, the
 *   photosensitivity warning). The Steam "About" text is a joke and is not used.
 * - ParaLily: archive/research/games-steam.md (Steam, Nintendo eShop, paralilygame.com).
 * - The Brave Hearts II: archive/research/games-steam.md (Steam) and
 *   archive/wordpress/pages/about-jeremy.md (the publishing work).
 * - Haberdashery and Target Crack: archive/wordpress/pages/{haberdashery,target-crack}.md
 *   (carried over in full), archive/research/small-games-and-videos.md and
 *   reviews-partners-history.md (history, platforms).
 *
 * Rules: no prices here (Price reads src/data/store.json); no review scores or ratings; Jeff
 * by first name only; quotes come from reviews.ts. Strings marked `html` are trusted markup.
 */
import { LINKS, withUtm } from "./links";
import type { PricedStore } from "./storeCatalog";
import type { StoreKind } from "./types";

/** An outbound link with an external target, for `html` strings. Screen readers hear that it opens a new tab. */
const ext = (href: string, text: string) =>
  `<a href="${href}" target="_blank" rel="noopener">${text}<span class="visually-hidden"> (opens in a new tab)</span></a>`;
const tagged = (href: string) => withUtm(href, "game_page");

export interface Shot {
  src: string;
  alt: string;
  caption?: string;
}

export interface PriceRef {
  slug: string;
  store: PricedStore;
  unreleasedLabel?: string;
  freeLabel?: string;
}

export interface StoreEntry {
  kind: StoreKind;
  href: string;
  verb: string;
  label?: string;
  price?: PriceRef;
}

export interface Fact {
  label: string;
  /** Plain text, or trusted markup in `html`. */
  value?: string;
  html?: string;
  /** Live prices shown in the row (one per store). */
  prices?: Array<PriceRef & { name: string }>;
}

export type LogoPlatform = "steam" | "switch" | "itch";

/** Extra sections, placed after the about block, after the media, or after the fact sheet. */
export type Block =
  | {
      kind: "prose";
      id: string;
      eyebrow?: string;
      title: string;
      /** Trusted markup, one paragraph each. */
      paragraphs: string[];
      list?: string[];
      listTitle?: string;
    }
  | {
      kind: "links";
      id: string;
      eyebrow?: string;
      title: string;
      lead?: string;
      items: Array<{ title: string; text: string; href: string; icon: string; price?: PriceRef }>;
    }
  | {
      kind: "history";
      id: string;
      eyebrow?: string;
      title: string;
      lead?: string;
      /** Award slugs in awards.ts are shown as badges: pass the game slug. */
      awardsFor?: string;
      items: Array<{ when: string; html: string }>;
      photos?: Shot[];
    }
  | {
      kind: "assets";
      id: string;
      eyebrow?: string;
      title: string;
      lead?: string;
      downloads: Array<{ title: string; meta: string; href: string; image: string; alt: string }>;
      contact: Array<{ label: string; html: string }>;
    };

export interface GamePageData {
  slug: string;
  path: string;
  seo: { title: string; description: string };
  h1: string;
  eyebrow: string;
  lead: string;
  /** A credit line under the lead ("Developed by ... · Published by ..."), trusted markup. */
  credit?: string;
  /** Short status pills: release state, platforms. */
  status: string[];
  stores: StoreEntry[];
  /** Small text links under the store buttons. */
  extraLinks?: Array<{ label: string; href: string }>;
  hero:
    | { kind: "video"; videoId: string; title: string; next?: string; poster: string }
    | { kind: "steam-trailer"; href: string; poster: string; alt: string };
  /**
   * Full-bleed key art for the hero (the studio's own games). Without it the page opens on
   * the shared PageHero with the trailer card. Art comes from src/assets/games/<slug>/ only.
   * - layout "bleed": the art fills the hero behind a scrim (art with room on the left).
   * - layout "right": the art is anchored to the right edge and its left side fades into
   *   the night colour (art with a centred logo, which must stay clear of the text).
   * - layout "inset": the art keeps its own shape on the right, feathered into `backdrop`
   *   (art too small to fill a wide screen).
   * On phones every layout shows the whole art as a band above the text.
   */
  keyArt?: {
    src: string;
    layout: "bleed" | "right" | "inset";
    /** object-position of the art on wide screens. */
    position?: string;
    /** Wide screens only: a full-bleed image behind an "inset" art (phones never load it). */
    backdrop?: string;
    /** A transparent logo: shown in the h1 with the game's title as its alt text. */
    logo?: string;
  };
  about: {
    title: string;
    paragraphs: string[];
    /** A highlighted note under the paragraphs (photosensitivity warning). */
    note?: { title: string; text: string };
    art: { src: string; alt: string; shape?: "portrait" | "square" };
    /** Show this game's awards from awards.ts beside the text. */
    awards?: boolean;
  };
  features?: {
    title: string;
    lead?: string;
    /** "icons": title and text rows. "lines": the official feature lines, word for word. */
    style: "icons" | "lines";
    items: Array<{ title: string; text?: string; icon?: string; url?: string }>;
  };
  videos?: { title: string; ids: string[] };
  screenshots: {
    title: string;
    lead?: string;
    items: Shot[];
    columns?: 2 | 3 | 4;
    portrait?: boolean;
    /** A second, titled gallery under the first (menus and other in-game UI). */
    more?: { title: string; items: Shot[]; columns?: 2 | 3 | 4 };
  };
  reviews?: { title: string; lead?: string; ids?: string[] };
  /** Press slugs read from PRESS in reviews.ts, plus extra items listed here. */
  press?: { title: string; about: string[] };
  facts: Fact[];
  getIt: { title: string; logos: Array<{ platform: LogoPlatform; href: string }>; note?: string };
  creditsTitle?: string;
  blocks?: Array<Block & { place: "afterAbout" | "afterMedia" | "afterFacts" }>;
  related: string[];
  cta: { title: string; lead: string; primary: { label: string; href: string }; secondary?: { label: string; href: string } };
  ld: {
    genre?: string[];
    playMode?: string[];
    datePublished?: string;
    /** VideoGame url when the game's home is another site (Sheep Tag 2). */
    url?: string;
    maxPlayers?: number;
  };
}

// ─── Sheep Tag 2 ─────────────────────────────────────────────────────────────────────────
const ST2_SITE = "https://www.sheeptag2.com/";

const sheepTag2: GamePageData = {
  slug: "sheep-tag-2",
  path: "/sheep-tag-2/",
  seo: {
    title: "Sheep Tag 2, our online multiplayer game | Luna Wolf Studios",
    description:
      "Sheep Tag 2 is our free-to-play Sheep vs. Wolves strategy game for up to 32 players online, built in Unity on Photon Quantum. Early Access on Steam in 2027.",
  },
  h1: "Sheep Tag 2: Sheep vs. Wolves for up to 32 players",
  eyebrow: "Our game",
  lead: "A free-to-play strategy and survival game. The Sheep build farms to survive the round, and the Wolves hunt them down. Play online with up to 32 players, or solo against bots.",
  status: ["Early Access 2027", "Windows, macOS, Linux"],
  stores: [
    {
      kind: "steam",
      href: LINKS.sheepTag2Steam,
      verb: "Wishlist on",
      price: { slug: "sheep-tag-2", store: "steam", unreleasedLabel: "Free to play", freeLabel: "Free to play" },
    },
    { kind: "web", href: LINKS.sheepTag2Site, verb: "The game's home", label: "sheeptag2.com" },
  ],
  hero: {
    kind: "video",
    videoId: "ABIVaCo3QX4",
    title: "Sheep Tag 2 gameplay trailer",
    next: "9eJ0F5nIWL0",
    poster: "games/sheep-tag-2/video-poster-gameplay-trailer.jpg",
  },
  keyArt: { src: "games/sheep-tag-2/key-art.jpg", layout: "bleed", position: "62% 40%", logo: "games/sheep-tag-2/logo.png" },
  about: {
    title: "What Sheep Tag 2 is",
    paragraphs: [
      "Sheep Tag 2 is a team game of Sheep against Wolves. The Sheep build farms to wall themselves in and hold out until the timer runs out. The Wolves work together to break in and capture every Sheep. A captured Sheep becomes a Spirit in the pen, and any teammate still standing can save it.",
      `It is the standalone successor to Sheep Tag, a Warcraft III mod from the early 2000s that people still play more than twenty years later. Our co-founder <a href="/about-jeff/">Jeff</a> helped maintain the original mod, built the first standalone prototypes in August 2015, and is the game's only core developer.`,
      `We build it in <a href="/services/unity-development/">Unity</a>, with online play on Photon Quantum, which uses prediction and rollback to keep every player's game in sync. Backers funded it on Kickstarter in November 2021, and the closed beta has run since December 2022.`,
    ],
    art: { src: "games/sheep-tag-2/capsule-600x900.jpg", alt: "Sheep Tag 2 cover art: a sheep runs across a farmyard with a wolf close behind, under the game's logo." },
  },
  features: {
    title: "Highlights",
    style: "icons",
    items: [
      { icon: "users", title: "Up to 32 players online", text: "Sheep on one team, Wolves on the other, on US, EU, and AU servers. Join a game already in progress." },
      { icon: "gamepad", title: "Solo against bots", text: "Five difficulty levels, and bots fill empty seats in online games." },
      { icon: "cube", title: "More than 20 farm types", text: "From the Straw Farm to Illusion farms your team can walk through and Invisible farms the Wolves cannot see." },
      { icon: "rocket", title: "Wolf spells and upgrades", text: "Summon Pack Wolf, Lunar Strike, Phase Shift, and Snare Trap, plus potions and upgrades bought with gold." },
      { icon: "layers", title: "Five game modes", text: "Classic, Switch, Vamp, VIP, and Practice, with rulesets you can build, save, and share." },
      { icon: "wrench", title: "Level editor and Steam Workshop", text: "Build terrains, share them on the Workshop, or play from a free library of community terrains." },
      { icon: "moon", title: "Day and night", text: "At night the Sheep cannot see as far, and the Wolves get stronger." },
      { icon: "play", title: "Replays and clips", text: "Watch any game from any player's view, and export your best plays as video." },
      { icon: "award", title: "Free to play, never pay to win", text: "Levels, medals, achievements, and leaderboards. The optional Supporter Pack adds cosmetics, profile features, and double Wool and XP." },
      { icon: "headset", title: "A 17-track soundtrack", text: "Original music by Baelex Metcalf, Lazerwolph, and M." },
    ],
  },
  // The Early Access trailer first (the owner's order), then the teaser and four clips.
  videos: { title: "Videos", ids: ["ABIVaCo3QX4", "9eJ0F5nIWL0", "JwVvkdnIIQg", "_IQO36AQHe0", "PjNLCQmYS1c", "b-kbfnlHRtY"] },
  screenshots: {
    title: "Screenshots",
    items: [
      {
        src: "games/sheep-tag-2/screenshot-01.jpg",
        caption: "Thirty two players, one pasture, and a farm on every patch of grass.",
        alt: "A 32 player game seen from high above, with hundreds of farms filling a green terrain around the pen in the middle.",
      },
      {
        src: "games/sheep-tag-2/screenshot-02.jpg",
        caption: "Lunar Strike takes a base apart.",
        alt: "Playing as a Wolf, meteors rain down on a Sheep base while the pack waits at its edge.",
      },
      {
        src: "games/sheep-tag-2/screenshot-03.jpg",
        caption: "Fortify your farms when the pack shows up.",
        alt: "A Sheep casts Fortify in the middle of a huge grid of farms on ReVoLuTiOn as Wolves close in from the right.",
      },
      {
        src: "games/sheep-tag-2/screenshot-04.jpg",
        caption: "Fighting over the pen on Fire and Ice.",
        alt: "Sheep and Wolves clash around the pen on a snowy terrain ringed by ice and lava.",
      },
      {
        src: "games/sheep-tag-2/screenshot-05.jpg",
        caption: "Hunt as a Wolf.",
        alt: "Playing as a Wolf, the hunter chases a Sheep between its farms, with the Wolf's abilities and gold on the HUD.",
      },
      {
        src: "games/sheep-tag-2/screenshot-06.jpg",
        caption: "Night raids on the pen.",
        alt: "At night a meteor falls toward the pen while Sheep rush in to free the Spirits held there.",
      },
      {
        src: "games/sheep-tag-2/screenshot-07.jpg",
        caption: "The Floor Is Lava.",
        alt: "Sheep build on a small island of rock in the middle of a terrain made of lava.",
      },
      {
        src: "games/sheep-tag-2/screenshot-08.jpg",
        caption: "Dress your Sheep in the Wardrobe.",
        alt: "In the Wardrobe, a Sheep up on its hind legs tries on a Mushroom hat and Bass Slippers.",
      },
    ],
    // The in-game UI, from the owner's pitch deck (the same captures, at 1280 px, are in the
    // Sheep Tag 2 repo's November 2026 Kickstarter update). Alt text follows the deck's own.
    more: {
      title: "Menus, reports, and replays",
      columns: 4,
      items: [
        { src: "games/sheep-tag-2/ui-game-report.jpg", caption: "The Game Report.", alt: "The Game Report after a Classic game on Haven: a table of every player's times and stats." },
        { src: "games/sheep-tag-2/ui-round-report.jpg", caption: "The Round Report.", alt: "The Round Report." },
        { src: "games/sheep-tag-2/ui-replay.jpg", caption: "Replays.", alt: "The replay viewer with its timeline, playback speed, viewpoint and clip tools." },
        { src: "games/sheep-tag-2/ui-profile.jpg", caption: "Player profiles.", alt: "A player profile." },
        { src: "games/sheep-tag-2/ui-medals.jpg", caption: "The Medal Case.", alt: "The Medal Case." },
        { src: "games/sheep-tag-2/ui-level-editor.jpg", caption: "The level editor.", alt: "The level editor with mirror mode on." },
        { src: "games/sheep-tag-2/ui-browse-terrains.jpg", caption: "Community terrains.", alt: "Browsing community terrains." },
        { src: "games/sheep-tag-2/ui-rulesets.jpg", caption: "Rulesets.", alt: "Choosing a ruleset." },
      ],
    },
  },
  facts: [
    { label: "Developer", value: "Luna Wolf Studios (Newark, Delaware)" },
    { label: "Publisher", value: "Luna Wolf Studios" },
    { label: "Release", value: "Early Access on Steam in 2027" },
    {
      label: "Price",
      prices: [{ name: "Steam", slug: "sheep-tag-2", store: "steam", unreleasedLabel: "Free to play, never pay to win", freeLabel: "Free to play, never pay to win" }],
    },
    { label: "Platforms", value: "Windows, macOS, and Linux, on Steam" },
    { label: "Genre", value: "Asymmetric multiplayer strategy and survival" },
    { label: "Players", value: "Up to 32 online, or solo against bots" },
    { label: "Engine", value: "Unity, with Photon Quantum for online play" },
    { label: "Languages", value: "English (more planned)" },
    { label: "Coverage", html: ext("https://www.youtube.com/watch?v=ZGcLcwCXzj0", "Interview and gameplay showcase") + " by WTii on YouTube" },
    { label: "Funding", html: `${ext(LINKS.sheepTag2Kickstarter, "Kickstarter")}, funded November 2021` },
    { label: "Website", html: ext(tagged(ST2_SITE), "sheeptag2.com") },
    {
      label: "Press",
      html: `<a href="/presskit/sheep-tag-2/">Sheep Tag 2 press kit</a> · ${ext(`${ST2_SITE}presskit/`, "Full press kit on sheeptag2.com")} · <a href="/presskit/">Studio press kit</a>`,
    },
  ],
  getIt: {
    title: "Wishlist Sheep Tag 2",
    logos: [{ platform: "steam", href: LINKS.sheepTag2Steam }],
  },
  blocks: [
    {
      place: "afterMedia",
      kind: "links",
      id: "sheeptag2-com",
      eyebrow: "sheeptag2.com",
      title: "Go deeper on the game's own site",
      lead: "Guides, terrains, add-ons, and the community, on sheeptag2.com and Steam.",
      items: [
        { icon: "graduationCap", title: "Guides", text: "Farms, spells, upgrades, game modes, and how to play each side.", href: `${ST2_SITE}guides/` },
        { icon: "globe", title: "Terrains", text: "The community terrain library, and how to submit your own.", href: `${ST2_SITE}terrains/` },
        {
          icon: "headset",
          title: "Original soundtrack",
          text: "All 17 tracks on Steam.",
          href: LINKS.sheepTag2Soundtrack,
          price: { slug: "sheep-tag-2-soundtrack", store: "steam" },
        },
        {
          icon: "award",
          title: "Supporter Pack",
          text: "Cosmetics, profile features, and double Wool and XP.",
          href: LINKS.sheepTag2SupporterPack,
          price: { slug: "sheep-tag-2-supporter-pack", store: "steam" },
        },
        { icon: "discord", title: "Discord", text: "Talk to the players and the developer.", href: LINKS.sheepTag2Discord },
        { icon: "steam", title: "Steam Workshop", text: "Share terrains and play other people's.", href: LINKS.sheepTag2Workshop },
      ],
    },
  ],
  related: ["hypno-halo", "paralily", "the-brave-hearts-ii-false-skies"],
  cta: {
    title: "Need multiplayer for your game?",
    lead: "We built Sheep Tag 2's 32-player online play in Unity on Photon Quantum. Tell us what you are building.",
    primary: { label: "Start a project", href: "/contact/" },
    secondary: { label: "Game development services", href: "/services/game-development/" },
  },
  ld: {
    url: ST2_SITE,
    genre: ["Strategy", "Survival", "Multiplayer"],
    playMode: ["MultiPlayer", "SinglePlayer"],
    maxPlayers: 32,
  },
};

// ─── Hypno Halo ──────────────────────────────────────────────────────────────────────────
const hypnoHalo: GamePageData = {
  slug: "hypno-halo",
  path: "/hypno-halo/",
  seo: {
    title: "Hypno Halo: minimalist score attack game | Luna Wolf Studios",
    description:
      "Hypno Halo is a minimalist score attack game with 300+ handcrafted levels, 90+ minutes of electronic music, and shared co-op controls. On Steam and Switch.",
  },
  h1: "Hypno Halo",
  eyebrow: "Our game",
  lead: "Hypno Halo is a minimalist score attack game. There's only one shape that's perfect, eternal, and completely unbothered: the halo.",
  status: ["Out now", "Steam: Windows, macOS, Linux", "Nintendo Switch"],
  stores: [
    { kind: "steam", href: LINKS.hypnoHaloSteam, verb: "Buy on", price: { slug: "hypno-halo", store: "steam" } },
    { kind: "switch", href: LINKS.hypnoHaloSwitch, verb: "Buy on", price: { slug: "hypno-halo", store: "switch" } },
  ],
  extraLinks: [{ label: "Try the free demo on Steam", href: LINKS.hypnoHaloDemo }],
  hero: { kind: "video", videoId: "GiCsebs_FK4", title: "Hypno Halo trailer", poster: "games/hypno-halo/key-art.jpg" },
  keyArt: { src: "games/hypno-halo/key-art.jpg", layout: "right", position: "50% 50%" },
  about: {
    title: "About Hypno Halo",
    paragraphs: [
      "Play more than 300 handcrafted levels and 51 bonus challenges across six difficulties, set to over 90 minutes of electronic and techno music. Chase high scores alone, or share the controls with friends on one screen for co-op chaos.",
      "We released it on Steam for Windows, macOS, and Linux on October 21, 2025, and on Nintendo Switch on November 25, 2025. A free demo is on Steam.",
    ],
    note: {
      title: "Photosensitivity warning",
      text: "Players with photosensitivity, and those susceptible to motion sickness, should not play Hypno Halo.",
    },
    art: { src: "games/hypno-halo/capsule-600x900.jpg", alt: "Hypno Halo cover art: the title in rainbow neon letters inside glowing rings." },
  },
  features: {
    title: "Features",
    style: "lines",
    items: [
      { title: "Tackle 300+ handcrafted levels and 51 bonus challenges across 6 difficulties" },
      { title: "90+ minutes of electronic and techno music" },
      { title: "Unlock 50+ achievements and climb the leaderboards" },
      { title: "Full controller and touch screen support" },
      { title: "Steam Deck compatible", url: LINKS.hypnoHaloSteamDeck },
      { title: "Share controls with friends for co-op chaos" },
      { title: "Discover secret endings and hidden surprises" },
    ],
  },
  videos: { title: "More videos", ids: ["hB-5wimIR_I", "CZq4V7gRbCw", "WjP35zv8zNo"] },
  screenshots: {
    title: "Screenshots",
    items: [
      {
        src: "games/hypno-halo/wp-screenshot-easy-50.jpg",
        caption: "Easy, round 50",
        alt: "Hypno Halo, round 50 on easy: three neon rings around a single red line, with the Q, W, and E keys lit below.",
      },
      {
        src: "games/hypno-halo/wp-screenshot-medium-69.jpg",
        caption: "Medium, round 69",
        alt: "Hypno Halo, round 69 on medium: red, blue, and purple rings around a six-spoke wheel, with four keys below.",
      },
      {
        src: "games/hypno-halo/wp-screenshot-medium-98.jpg",
        caption: "Medium, round 98",
        alt: "Hypno Halo, round 98 on medium: teal and purple rings nest toward the centre over a field of spinning stars.",
      },
      {
        src: "games/hypno-halo/wp-screenshot-hard-113.jpg",
        caption: "Hard, round 113",
        alt: "Hypno Halo, round 113 on hard: red, yellow, and purple rings with five keys below and a x4 multiplier.",
      },
      {
        src: "games/hypno-halo/screenshot-05.jpg",
        caption: "Round 134",
        alt: "Hypno Halo, round 134: a yellow ring and a blue ring frame a many-spoked wheel, with a x5 multiplier.",
      },
      {
        src: "games/hypno-halo/screenshot-06.jpg",
        caption: "Round 155",
        alt: "Hypno Halo, round 155: teal and purple rings over a red background, with six keys below.",
      },
      {
        src: "games/hypno-halo/screenshot-07.jpg",
        caption: "Round 206",
        alt: "Hypno Halo, round 206: purple and yellow rings over a deep red background, with seven keys below.",
      },
      {
        src: "games/hypno-halo/screenshot-08.jpg",
        caption: "Round 219",
        alt: "Hypno Halo, round 219: blue, purple, and green rings around a wheel, with seven keys and a x4 multiplier.",
      },
    ],
  },
  reviews: { title: "Reviews and quotes", ids: ["hh-01", "hh-02", "home-01", "home-02", "hh-higher-plain-games"] },
  press: { title: "Press", about: ["hypno-halo"] },
  facts: [
    { label: "Developer", value: "Luna Wolf Studios" },
    { label: "Publisher", value: "Luna Wolf Studios" },
    { label: "Released", value: "Steam: October 21, 2025. Nintendo Switch: November 25, 2025." },
    {
      label: "Price",
      prices: [
        { name: "Steam", slug: "hypno-halo", store: "steam" },
        { name: "Nintendo eShop", slug: "hypno-halo", store: "switch" },
      ],
    },
    { label: "Free demo", html: ext(tagged(LINKS.hypnoHaloDemo), "Hypno Halo Demo on Steam") },
    { label: "Platforms", value: "Windows, macOS, and Linux on Steam; Nintendo Switch" },
    { label: "Genre", value: "Minimalist score attack" },
    { label: "Players", value: "1 player, or co-op with shared controls. Up to 8 players on one Nintendo Switch." },
    { label: "Controls", value: "Full controller support, keyboard, mouse, and touch screen" },
    { label: "Languages", value: "17 on Steam and 13 on Nintendo Switch, including English, French, German, Italian, Spanish, Japanese, Korean, Portuguese, Russian, and Chinese" },
  ],
  getIt: {
    title: "Get Hypno Halo",
    logos: [
      { platform: "steam", href: LINKS.hypnoHaloSteam },
      { platform: "switch", href: LINKS.hypnoHaloSwitch },
    ],
  },
  creditsTitle: "Music by",
  blocks: [
    {
      place: "afterFacts",
      kind: "assets",
      id: "logo",
      eyebrow: "Press",
      title: "Logo, icon, and contact",
      lead: "Full-size files for press and creators.",
      downloads: [
        {
          title: "Download logo",
          meta: "PNG, 2560 × 1440",
          href: "/wp-content/uploads/2025/10/title-logo-2560x1440-1.png",
          image: "games/hypno-halo/key-art.jpg",
          alt: "The Hypno Halo title logo in rainbow neon on a ring of halos.",
        },
        {
          title: "Download icon",
          meta: "PNG, 1024 × 1024",
          href: "/wp-content/uploads/2025/10/icon-1024x1024-1.png",
          image: "games/hypno-halo/icon-1024.jpg",
          alt: "The Hypno Halo icon: rainbow neon rings crossing over a dark centre.",
        },
      ],
      contact: [
        { label: "Inquiries", html: `<a href="mailto:support@lunawolfstudios.com">support@lunawolfstudios.com</a>` },
        { label: "Steam", html: ext(tagged(LINKS.hypnoHaloSteam), "Hypno Halo on Steam") },
        { label: "Nintendo Switch", html: ext(tagged(LINKS.hypnoHaloSwitch), "Hypno Halo on the Nintendo eShop") },
        { label: "Press kit", html: `<a href="/presskit/hypno-halo/">Hypno Halo press kit</a>` },
        { label: "Studio press kit", html: `<a href="/presskit/">Luna Wolf Studios press kit</a>` },
      ],
    },
  ],
  related: ["sheep-tag-2", "paralily", "the-brave-hearts-ii-false-skies"],
  cta: {
    title: "Have a game you want built or published?",
    lead: "We make games for Steam and Nintendo Switch, and publish other developers' games there.",
    primary: { label: "Start a project", href: "/contact/" },
    secondary: { label: "Game development services", href: "/services/game-development/" },
  },
  ld: {
    genre: ["Score attack", "Arcade", "Casual"],
    playMode: ["SinglePlayer", "MultiPlayer", "CoOp"],
    datePublished: "2025-10-21",
  },
};

// ─── ParaLily ────────────────────────────────────────────────────────────────────────────
const paralily: GamePageData = {
  slug: "paralily",
  path: "/paralily/",
  seo: {
    title: "ParaLily: a precision puzzle platformer | Luna Wolf Studios",
    description:
      "ParaLily is a precision and puzzle platformer about a girl's journey through parallel universes to save a friend. Available on Steam and Nintendo Switch.",
  },
  h1: "ParaLily",
  eyebrow: "Our game",
  lead: "A hand-drawn precision and puzzle platformer. Lily shifts between parallel universes to chase her runaway stuffed dinosaur, and her momentum carries from one universe to the next.",
  credit: `Made by Team ParaLily: artist Nate Flynn and our co-founder <a href="/about-jeff/">Jeff</a>`,
  status: ["Out now", "Steam: Windows", "Nintendo Switch"],
  stores: [
    { kind: "steam", href: LINKS.paralilySteam, verb: "Buy on", price: { slug: "paralily", store: "steam" } },
    { kind: "switch", href: LINKS.paralilySwitch, verb: "Buy on", price: { slug: "paralily", store: "switch" } },
  ],
  extraLinks: [{ label: "Visit paralilygame.com", href: LINKS.paralily }],
  hero: { kind: "video", videoId: "JcMM36wFX1U", title: "ParaLily teaser trailer", poster: "games/paralily/key-art.jpg" },
  keyArt: { src: "games/paralily/key-art.jpg", layout: "right", position: "42% 50%" },
  about: {
    title: "About ParaLily",
    paragraphs: [
      "In the middle of the night, Lily's stuffed dinosaur Patches springs to life and runs off through a mysterious door. Lily follows him through a set of dangerous parallel universes, avoiding enemies and collecting magical glyphs along the way.",
      "Lily can shift between the universes at will to avoid danger and solve puzzles. When she changes universes her momentum carries with her, so a jump that starts in one universe can finish in the next. The released game is the first chapter of her journey.",
    ],
    art: { src: "games/paralily/capsule-600x900.jpg", alt: "ParaLily cover art: Lily steps out of a purple portal while Patches, her stuffed dinosaur, runs ahead." },
    awards: true,
  },
  features: {
    title: "Features",
    style: "lines",
    items: [
      { title: "Familiar platforming and side-scrolling action." },
      { title: "Hand-drawn environments, characters, and animations." },
      { title: "Parallel universe shifting mechanics." },
      { title: "Collectibles, puzzles, and hidden pathways." },
      { title: "Creative multi-layered level designs." },
    ],
  },
  blocks: [
    {
      place: "afterAbout",
      kind: "prose",
      id: "who-made-it",
      eyebrow: "Team ParaLily",
      title: "Who made it",
      paragraphs: [
        `Team ParaLily is artist Nate Flynn and our co-founder <a href="/about-jeff/">Jeff</a>, who programs the game. Nate brought Jeff a prototype in early 2017; they had made games together before.`,
        "ParaLily was first playable at A Video Game Con in September 2017 and won Best in Show at Replay FX in Pittsburgh in July 2018. It came out on Steam on November 9, 2021, and on Nintendo Switch on February 2, 2022.",
        `Luna Wolf Studios publishes ParaLily on Nintendo Switch and co-publishes it with Team ParaLily on Steam. ${ext(tagged(LINKS.paralily), "paralilygame.com")} has the devlog and the ${ext(LINKS.paralilyPresskit, "press kit")}.`,
      ],
    },
  ],
  screenshots: {
    title: "Screenshots",
    items: [
      { src: "games/paralily/screenshot-01.jpg", alt: "Lily stands on a mushroom stump in a dark blue forest, with a glowing door on the right." },
      { src: "games/paralily/screenshot-02.jpg", alt: "Lily leaps toward a purple portal over a glowing orange universe, above white rock." },
      { src: "games/paralily/screenshot-03.jpg", alt: "Lily dashes through a purple portal along a mossy log in a misty forest." },
      { src: "games/paralily/screenshot-04.jpg", alt: "Lily stands between columns of fire in a lava cave." },
      { src: "games/paralily/screenshot-05.jpg", alt: "Lily jumps between two floating creatures inside a red-lit cave." },
      { src: "games/paralily/screenshot-06.jpg", alt: "Lily walks along rock ledges in a pale, washed-out desert universe." },
      { src: "games/paralily/screenshot-07.jpg", alt: "Lily faces a creature on a cave ledge, with a purple wall of another universe on the left." },
      { src: "games/paralily/screenshot-08.jpg", alt: "Lily leaps between tree stumps in a dark blue forest while Patches waits on the path ahead." },
      { src: "games/paralily/screenshot-09.jpg", alt: "A round stone puzzle ringed with purple glyph tiles." },
    ],
  },
  reviews: { title: "What players and press say" },
  press: { title: "Press", about: ["paralily"] },
  facts: [
    { label: "Developer", value: "Team ParaLily (Nate Flynn and Jeff)" },
    { label: "Publisher", value: "Luna Wolf Studios on Nintendo Switch; Team ParaLily and Luna Wolf Studios on Steam" },
    { label: "Released", value: "Steam: November 9, 2021. Nintendo Switch: February 2, 2022." },
    {
      label: "Price",
      prices: [
        { name: "Steam", slug: "paralily", store: "steam" },
        { name: "Nintendo eShop", slug: "paralily", store: "switch" },
      ],
    },
    { label: "Platforms", value: "Windows on Steam; Nintendo Switch" },
    { label: "Genre", value: "Precision and puzzle platformer" },
    { label: "Players", value: "Single-player" },
    { label: "Controls", value: "Full controller support; touch screen on Nintendo Switch" },
    { label: "Languages", value: "English" },
    { label: "Recognition", value: "Best in Show, Replay FX 2018. Official selection, MAGFest Indie Videogame Showcase 2017, 2018, and 2019." },
    { label: "Website", html: `${ext(tagged(LINKS.paralily), "paralilygame.com")} · ${ext(tagged(LINKS.paralilyItch), "itch.io")}` },
    {
      label: "Press",
      html: `<a href="/presskit/paralily/">ParaLily press kit</a> · ${ext(LINKS.paralilyPresskit, "Full press kit on paralilygame.com")}`,
    },
  ],
  getIt: {
    title: "Get ParaLily",
    logos: [
      { platform: "steam", href: LINKS.paralilySteam },
      { platform: "switch", href: LINKS.paralilySwitch },
    ],
  },
  creditsTitle: "Team ParaLily",
  related: ["hypno-halo", "sheep-tag-2", "the-brave-hearts-ii-false-skies"],
  cta: {
    title: "Have a game you want built or published?",
    lead: "We build games in Unity and bring them to Steam and Nintendo Switch. Tell us about yours.",
    primary: { label: "Start a project", href: "/contact/" },
    secondary: { label: "Game development services", href: "/services/game-development/" },
  },
  ld: {
    genre: ["Platformer", "Puzzle"],
    playMode: ["SinglePlayer"],
    datePublished: "2021-11-09",
  },
};

// ─── The Brave Hearts II: False Skies ────────────────────────────────────────────────────
const braveHearts: GamePageData = {
  slug: "the-brave-hearts-ii-false-skies",
  path: "/the-brave-hearts-ii-false-skies/",
  seo: {
    title: "The Brave Hearts II: False Skies | Luna Wolf Studios",
    description:
      "The Brave Hearts II: False Skies is a voice-acted top-down shoot 'em up by Connor Butler, who came through our internship. We published it on Steam.",
  },
  h1: "The Brave Hearts II: False Skies",
  eyebrow: "Published by Luna Wolf Studios",
  lead: "A fully voice-acted, story-driven top-down shoot 'em up. Fly as a Brave Heart pilot against autonomous drones across campaign, training, hardcore, and endless modes.",
  credit: `Developed by <strong>Connor Butler</strong> · Published by <strong>Luna Wolf Studios</strong>`,
  status: ["Out now", "Steam: Windows"],
  stores: [
    { kind: "steam", href: LINKS.braveHearts2Steam, verb: "Buy on", price: { slug: "the-brave-hearts-ii-false-skies", store: "steam" } },
  ],
  hero: {
    kind: "steam-trailer",
    href: LINKS.braveHearts2Steam,
    poster: "games/the-brave-hearts-ii-false-skies/capsule-616x353.jpg",
    alt: "The Brave Hearts II: False Skies logo: a riveted metal heart over a fighter jet.",
  },
  keyArt: {
    src: "games/the-brave-hearts-ii-false-skies/capsule-616x353.jpg",
    layout: "inset",
    backdrop: "games/the-brave-hearts-ii-false-skies/hero.jpg",
  },
  about: {
    title: "About the game",
    paragraphs: [
      "Four years after the Cruabar War, peace was supposed to hold. Then autonomous drones start appearing over former war zones and civilian airspace, and you join the Brave Hearts as a newly assigned pilot to protect Uflein's airspace.",
      "The campaign runs more than three hours, fully voiced, with 30 visual novel-style cutscenes, boss fights, quick-time moments, and branching mission choices. Fly with four teammates, each with a special ability, and unlock 21 aircraft, variants and skins included.",
    ],
    art: {
      src: "games/the-brave-hearts-ii-false-skies/capsule-600x900.jpg",
      alt: "The Brave Hearts II: False Skies cover art: a riveted metal heart over a fighter jet.",
    },
  },
  features: {
    title: "Features",
    style: "icons",
    items: [
      { icon: "rocket", title: "Arcade air combat", text: "Fast top-down dogfights with fuel, ammo, and heat to manage, and nine combat pickups." },
      { icon: "users", title: "Four teammates", text: "Each brings a special ability, with cooldowns and synergy in combat." },
      { icon: "layers", title: "Five modes", text: "Campaign, Training, Hardcore, FreePlay, and Endless, with a high score for every mission and mode." },
      { icon: "star", title: "21 aircraft", text: "Unlock and fly them, variants and skins included, and earn Reputation Points." },
      { icon: "monitor", title: "Extras", text: "An in-game database, a jukebox for the soundtrack, and a movie browser to replay any cutscene." },
      { icon: "gamepad", title: "Full controller support", text: "DualShock and DualSense included, plus Steam achievements and Steam Cloud." },
    ],
  },
  blocks: [
    {
      place: "afterAbout",
      kind: "prose",
      id: "from-our-internship",
      eyebrow: "Connor Butler",
      title: "From our internship program to Steam",
      paragraphs: [
        `Connor Butler came through our <a href="/bootcamp/">student internship program</a>. The Brave Hearts II: False Skies is his game: he developed it, and Luna Wolf Studios published it on Steam on August 27, 2026.`,
        `It follows his first game, ${ext("https://connor0453.itch.io/the-brave-hearts", "The Brave Hearts")}, which he made with Ryan Ketchum and released on itch.io.`,
      ],
      listTitle: `What we did as publisher, led by our co-founder <a href="/about-jeremy/">Jeremy</a>:`,
      list: [
        "Steam publishing and platform integration",
        "Windows build verification",
        "Steam achievements",
        "Steam Cloud configuration",
        "Controller usability",
        "Release quality assurance",
      ],
    },
  ],
  screenshots: {
    title: "Screenshots",
    items: [
      { src: "games/the-brave-hearts-ii-false-skies/screenshot-01.jpg", alt: "A yellow plane flies over cracked stone ruins as an enemy drone explodes, with health, missiles, and fuel on the HUD." },
      { src: "games/the-brave-hearts-ii-false-skies/screenshot-02.jpg", alt: "Clara Willis's teammate card: her ability gives a random pick-up instantly." },
      { src: "games/the-brave-hearts-ii-false-skies/screenshot-03.jpg", alt: "A plane flies down a river between rocky banks while drones close in." },
      { src: "games/the-brave-hearts-ii-false-skies/screenshot-04.jpg", alt: "A cutscene with three pilot silhouettes as Clara Willis says she is not losing another pilot." },
      { src: "games/the-brave-hearts-ii-false-skies/screenshot-05.jpg", alt: "A plane fires on a drone over a snowy canyon." },
      { src: "games/the-brave-hearts-ii-false-skies/screenshot-07.jpg", alt: "A plane flies over a lava field while red drones attack." },
      { src: "games/the-brave-hearts-ii-false-skies/screenshot-08.jpg", alt: "The sortie screen: pick a teammate, an aircraft such as the Hawker Tempest MKII, and read the mission intel." },
      { src: "games/the-brave-hearts-ii-false-skies/screenshot-09.jpg", alt: "Elizabeth Fryer stands in silhouette in an underground hangar during a cutscene." },
      { src: "games/the-brave-hearts-ii-false-skies/screenshot-10.jpg", alt: "Choose a mission: intel cards for Cold Steel Horizon and Roots & Rotors list each mission's enemies and the teammates available." },
    ],
  },
  facts: [
    { label: "Developer", value: "Connor Butler" },
    { label: "Publisher", value: "Luna Wolf Studios" },
    { label: "Released", value: "August 27, 2026, on Steam" },
    { label: "Price", prices: [{ name: "Steam", slug: "the-brave-hearts-ii-false-skies", store: "steam" }] },
    { label: "Platform", value: "Windows" },
    { label: "Genre", value: "Story-driven top-down shoot 'em up" },
    { label: "Players", value: "Single-player" },
    { label: "Controls", value: "Full controller support, including DualShock and DualSense" },
    { label: "Languages", value: "English, fully voiced" },
    { label: "Modes", value: "Campaign, Training, Hardcore, FreePlay, and Endless" },
    { label: "Press", html: `<a href="/presskit/the-brave-hearts-ii-false-skies/">The Brave Hearts II: False Skies press kit</a>` },
    { label: "Support", html: `<a href="mailto:support@lunawolfstudios.com">support@lunawolfstudios.com</a>` },
  ],
  getIt: {
    title: "Get The Brave Hearts II",
    logos: [{ platform: "steam", href: LINKS.braveHearts2Steam }],
  },
  creditsTitle: "Credits",
  related: ["sheep-tag-2", "hypno-halo", "paralily"],
  cta: {
    title: "Publish your game with us",
    lead: "We publish indie games on Steam and Nintendo Switch. Send us a demo, an early build, or a finished release.",
    primary: { label: "Pitch your game", href: "/publishing/" },
    secondary: { label: "Contact us", href: "/contact/" },
  },
  ld: {
    genre: ["Shoot 'em up", "Action"],
    playMode: ["SinglePlayer"],
    datePublished: "2026-08-27",
  },
};

// ─── Haberdashery ────────────────────────────────────────────────────────────────────────
const haberdashery: GamePageData = {
  slug: "haberdashery",
  path: "/haberdashery/",
  seo: {
    title: "Haberdashery: an endless runner in hats",
    description:
      "Haberdashery is a fast endless runner: guide a sheep past rocks, spike pits, mines, and a dragon while you collect hat boxes, coins, and 30+ hats.",
  },
  h1: "Haberdashery",
  eyebrow: "Our game · 2015",
  lead: "Run for your little Sheep life and look dashing doing it. A fast endless runner on a rotating world, with 30+ hats to collect.",
  status: ["Windows and macOS on itch.io", "Web on Newgrounds"],
  stores: [
    { kind: "itch", href: LINKS.haberdasheryItch, verb: "Download for PC on", label: "itch.io" },
    { kind: "newgrounds", href: LINKS.haberdasheryNewgrounds, verb: "Play in your browser on", label: "Newgrounds" },
  ],
  hero: { kind: "video", videoId: "U7Wu3ZkDE7g", title: "Haberdashery official trailer", poster: "games/haberdashery/wp-pc-screenshot-01.jpg" },
  about: {
    title: "About Haberdashery",
    paragraphs: [
      "Collect hat boxes and coins while the game throws new mechanics at you at a rapid-fire pace.",
      "In this challenging, fast-paced endless runner, the goal is to avoid rocks, trees, spike pits, and mines while you collect your treasures. Be careful not to end up as dragon food.",
      "Ever wanted to be a Viking? Or maybe a Wizard? How about good ol' Uncle Sam? With 30+ hats to unlock, there is something for everyone in this hilarious and outrageous game, and every hat changes how it plays.",
      "Collect coins, buy hats, avoid that dragon, play the slots, or try the arcade. Whatever you prefer, the game keeps you coming back for more, with laughs every time.",
      "Haberdashery is produced by Luna Wolf Studios, in collaboration with Geek Monster Games. A modernized version, revisited with current Unity technology, is in development.",
    ],
    art: { src: "games/haberdashery/wp-icon-512.png", alt: "The Haberdashery icon: a sheep in a top hat and monocle.", shape: "square" },
  },
  features: {
    title: "Features",
    style: "lines",
    items: [
      { title: "Random environment every game" },
      { title: "30+ unlockable hats" },
      { title: "Different gameplay with every hat" },
      { title: "Extra arcade modes to unlock and play" },
      { title: "Leaderboards and achievements to compete with friends" },
      { title: "Laughs for days" },
    ],
  },
  videos: { title: "More videos", ids: ["BPf3JLbiTGw", "N8OZRSwbRf0"] },
  screenshots: {
    title: "Screenshots",
    items: [
      { src: "games/haberdashery/wp-pc-screenshot-01.jpg", alt: "A sheep in a space helmet runs across a grey moon between boulders, under a Baah-dly Go banner." },
      { src: "games/haberdashery/wp-pc-screenshot-02.jpg", alt: "A sheep in a wizard hat leaves a rainbow trail across a green planet, under an I'm Magic banner." },
      { src: "games/haberdashery/wp-pc-screenshot-03.jpg", alt: "A sheep in an Uncle Sam top hat runs past spiked mines in front of red, white, and blue stripes." },
      { src: "games/haberdashery/wp-pc-screenshot-04.jpg", alt: "A sheep in a laurel wreath runs over a marble planet lined with Greek columns." },
      { src: "games/haberdashery/wp-pc-screenshot-05.jpg", alt: "In a dark, grey world under a No Baah-dy Understands Me banner, a sheep runs toward a pile of boulders." },
      { src: "games/haberdashery/wp-pc-screenshot-06.jpg", alt: "A sheep in a green cap chases gold coins under an I Need Me Gold banner, with rainbows behind." },
    ],
  },
  reviews: { title: "What players and judges said" },
  press: { title: "Press", about: ["haberdashery"] },
  facts: [
    { label: "Developer", value: "Luna Wolf Studios, in collaboration with Geek Monster Games" },
    { label: "Released", value: "2015: on Newgrounds in May, on itch.io in November" },
    { label: "Platforms", value: "Windows and macOS (download on itch.io); web browser (Newgrounds)" },
    { label: "Genre", value: "Endless runner" },
    { label: "Recognition", value: "Nominee, Indie Video Game of the Year, 2016 Delaware Innovation Awards" },
    { label: "Tip", value: "Under Options, enter the promo code SheepInHats to get your Haberdashery started." },
    {
      label: "Play",
      html: `${ext(tagged(LINKS.haberdasheryItch), "itch.io")} · ${ext(tagged(LINKS.haberdasheryNewgrounds), "Newgrounds")}`,
    },
  ],
  getIt: {
    title: "Play Haberdashery",
    logos: [{ platform: "itch", href: LINKS.haberdasheryItch }],
  },
  blocks: [
    {
      place: "afterMedia",
      kind: "history",
      id: "history",
      eyebrow: "History",
      title: "Awards, festivals, and shows",
      lead: "From a Newgrounds front page in 2015 to festival showcases and an award nomination.",
      awardsFor: "haberdashery",
      items: [
        { when: "May 2015", html: `Released on ${ext(LINKS.haberdasheryNewgrounds, "Newgrounds")}, and featured on its front page on June 1.` },
        { when: "July 2015", html: "Previewed in IndieGameMag's Screenshot Weekly." },
        { when: "September 2015", html: "Selected for the Boston Festival of Indie Games 2015 Digital Game Showcase." },
        { when: "2015", html: "Shown at GameACon 2015 in Atlantic City." },
        { when: "November 2015", html: `Released for Windows and macOS on ${ext(LINKS.haberdasheryItch, "itch.io")}.` },
        { when: "October 2016", html: `Nominated for Indie Video Game of the Year at the ${ext(LINKS.delawareInnovationAwards2016, "2016 Delaware Innovation Awards")}.` },
        { when: "November 2016", html: "Shown at GameACon 2016 in Atlantic City, and in the Tech2gether demo pit at World Cafe Live in Wilmington." },
        { when: "June 2017", html: "Shown at Awesome Con." },
      ],
      photos: [
        {
          src: "studio/tech2gether-2016-haberdashery-booth.jpg",
          alt: "Jeremy gives two thumbs up behind a table with Haberdashery on a TV, beside a tall Haberdashery banner.",
          caption: "Jeremy at the Haberdashery booth, Tech2gether 2016.",
        },
        {
          src: "studio/gameacon-2016-team-at-booth.jpg",
          alt: "Three people stand behind the Luna Wolf Studios booth, one in a wolf shirt and an exhibitor badge, with Drift Space Zero and Haberdashery on the screens.",
          caption: "The Luna Wolf Studios booth at GameACon 2016 in Atlantic City.",
        },
      ],
    },
  ],
  related: ["target-crack", "sheep-tag-2", "hypno-halo"],
  cta: {
    title: "Have a game you want built?",
    lead: "We have been making games since 2015, from jam games to Steam and Nintendo Switch releases. Tell us about yours.",
    primary: { label: "Start a project", href: "/contact/" },
    secondary: { label: "Game development services", href: "/services/game-development/" },
  },
  ld: {
    genre: ["Endless runner", "Arcade"],
    playMode: ["SinglePlayer"],
    datePublished: "2015",
  },
};

// ─── Target Crack ────────────────────────────────────────────────────────────────────────
const targetCrack: GamePageData = {
  slug: "target-crack",
  path: "/target-crack/",
  seo: {
    title: "Target Crack: tap-to-crack arcade game | Luna Wolf Studios",
    description:
      "Target Crack is a speed and precision arcade game: tap targets to crack them in three game modes, earn achievements, and take on friends on leaderboards.",
  },
  h1: "Target Crack",
  eyebrow: "Our game · 2015",
  lead: "A speed and precision arcade game for phones: tap targets to crack them.",
  status: ["Made for iOS and Android", "Three game modes"],
  stores: [{ kind: "itch", href: LINKS.targetCrackItch, verb: "See it on", label: "itch.io" }],
  hero: { kind: "video", videoId: "1mg7KmJ6nwE", title: "Target Crack gameplay", poster: "videos/1mg7KmJ6nwE.jpg" },
  about: {
    title: "About Target Crack",
    paragraphs: [
      "Choose from three game modes to test your speed and aim, earn achievements, and challenge your friends on the leaderboards.",
    ],
    art: { src: "games/target-crack/wp-icon-512.png", alt: "The Target Crack icon: a red, blue, and yellow target split by a crack.", shape: "square" },
  },
  screenshots: {
    title: "Screenshots",
    portrait: true,
    items: [
      { src: "games/target-crack/wp-phone-screenshot-01.jpg", alt: "A phone screen full of red and blue targets, with a countdown timer at the top." },
      { src: "games/target-crack/wp-phone-screenshot-02.jpg", alt: "Targets scatter as the word CRACK splashes across the screen." },
      { src: "games/target-crack/wp-phone-screenshot-03.jpg", alt: "The title screen, with three game mode buttons and the best score for each." },
      { src: "games/target-crack/wp-phone-screenshot-04.jpg", alt: "The end of a round, with buttons to retry, go home, or share." },
      { src: "games/target-crack/wp-phone-screenshot-05.jpg", alt: "Cracked targets among grey ones while the timer counts down." },
    ],
  },
  facts: [
    { label: "Developer", value: "Luna Wolf Studios" },
    { label: "Year", value: "2015" },
    { label: "Platforms", value: "iOS and Android" },
    { label: "Genre", value: "Speed and precision arcade" },
    { label: "Game modes", value: "Three, with achievements and leaderboards" },
    { label: "Links", html: ext(tagged(LINKS.targetCrackItch), "Target Crack on itch.io") },
  ],
  getIt: {
    title: "Find Target Crack",
    logos: [{ platform: "itch", href: LINKS.targetCrackItch }],
  },
  related: ["haberdashery", "hypno-halo", "sheep-tag-2"],
  cta: {
    title: "Have a game you want built?",
    lead: "We make games for phones, PC, and Nintendo Switch, from arcade games to online multiplayer. Tell us about yours.",
    primary: { label: "Start a project", href: "/contact/" },
    secondary: { label: "Game development services", href: "/services/game-development/" },
  },
  ld: {
    genre: ["Arcade"],
    playMode: ["SinglePlayer"],
    datePublished: "2015",
  },
};

export const GAME_PAGES = {
  "sheep-tag-2": sheepTag2,
  "hypno-halo": hypnoHalo,
  paralily,
  "the-brave-hearts-ii-false-skies": braveHearts,
  haberdashery,
  "target-crack": targetCrack,
} satisfies Record<string, GamePageData>;

export type GamePageSlug = keyof typeof GAME_PAGES;
