/**
 * Single source of truth for every external URL. Components and pages import from here;
 * never paste a store or social URL into a page. Keep these canonical (untagged): JSON-LD
 * `sameAs` must point at the clean page. Rendered outbound links go through `withUtm`.
 */
export const LINKS = {
  // Studio channels
  youtube: "https://www.youtube.com/channel/UChazyMKvfyTFi5tgD3i_SGg",
  x: "https://x.com/lunawolfstudios",
  linkedin: "https://www.linkedin.com/company/luna-wolf-studios",
  facebook: "https://facebook.com/LunaWolfStudio/",
  instagram: "https://www.instagram.com/lunawolfstudios",
  twitch: "https://www.twitch.tv/lunawolfstudios",
  bluesky: "https://bsky.app/profile/lunawolfstudios.bsky.social",
  itch: "https://lunawolfstudios.itch.io/",
  newgrounds: "https://lunawolfstudios.newgrounds.com/",

  // Products
  scriptableSheets: "https://assetstore.unity.com/packages/tools/utilities/scriptable-sheets-284559",
  sheepTag2Site: "https://www.sheeptag2.com/",
  // The Sheep Tag 2 community server. The studio has no Discord of its own, so this is linked
  // from Sheep Tag 2's page and press sheet only.
  sheepTag2Discord: "https://discord.gg/jNf5RsaZPp",
  sheepTag2Steam: "https://store.steampowered.com/app/537680/Sheep_Tag_2",
  hypnoHaloSteam: "https://store.steampowered.com/app/3847950/Hypno_Halo/",
  hypnoHaloSwitch: "https://www.nintendo.com/us/store/products/hypno-halo-switch/",
  paralily: "https://paralilygame.com/",
  braveHearts2Steam: "https://store.steampowered.com/app/4918650/The_Brave_Hearts_II_False_Skies/",

  // Publishing submissions (Google Form)
  publishingForm: "https://forms.gle/mieW4gE5hbsmbwPM8",

  // Store and marketplace profiles. Steam has no developer homepage for the studio; its store
  // pages link to these searches (archive/research/games-steam.md).
  steamDeveloper: "https://store.steampowered.com/search/?developer=Luna%20Wolf%20Studios",
  steamPublisher: "https://store.steampowered.com/search/?publisher=Luna%20Wolf%20Studios",
  assetStorePublisher: "https://assetstore.unity.com/publishers/29230",
  freelancer: "https://www.freelancer.com/u/LunaWolfStudios",
  youtubeInternshipPlaylist: "https://www.youtube.com/playlist?list=PLOBbjXNfDCFE",

  // Scriptable Sheets (links the Asset Store listing gives)
  scriptableSheetsReviews: "https://assetstore.unity.com/packages/tools/utilities/scriptable-sheets-284559#reviews",
  scriptableSheetsDocs: "https://github.com/LunaWolfStudios/ScriptableSheetsDocs",
  scriptableSheetsDocumentation: "https://github.com/LunaWolfStudios/ScriptableSheetsDocs/blob/main/DOCUMENTATION.md",
  scriptableSheetsChangelog: "https://github.com/LunaWolfStudios/ScriptableSheetsDocs/blob/main/CHANGELOG.md",
  scriptableSheetsForum: "https://discussions.unity.com/t/released-scriptable-sheets/1490189",
  scriptableSheetsPlaylist: "https://www.youtube.com/playlist?list=PL6G9X1zrT3BLwLA7pbgM5Aam9RrLsrBZp",

  // Sheep Tag 2 (from the sister site's links.ts)
  sheepTag2Kickstarter: "https://www.kickstarter.com/projects/lunawolfstudios/sheep-tag-2",
  sheepTag2Soundtrack: "https://store.steampowered.com/app/2151350/Sheep_Tag_2_Original_Soundtrack/",
  sheepTag2SupporterPack: "https://store.steampowered.com/app/5538360/Sheep_Tag_2_Supporter_Pack/",
  sheepTag2Workshop: "https://steamcommunity.com/app/537680/workshop/",

  // Hypno Halo
  hypnoHaloDemo: "https://store.steampowered.com/app/4029810/Hypno_Halo_Demo/",
  /** The studio's Steam announcement "Hypno Halo on Steam Deck!" (2025-10-06). */
  hypnoHaloSteamDeck: "https://store.steampowered.com/news/app/3847950/view/535488328615593926",

  // ParaLily
  paralilySteam: "https://store.steampowered.com/app/1156760/ParaLily/",
  paralilySwitch: "https://www.nintendo.com/us/store/products/paralily-switch/",
  paralilyItch: "https://lunawolfstudios.itch.io/paralily",
  paralilyPresskit: "https://paralilygame.com/presskit/",

  // Studio games on itch.io and Newgrounds
  haberdasheryItch: "https://lunawolfstudios.itch.io/haberdashery",
  haberdasheryNewgrounds: "https://www.newgrounds.com/portal/view/658511",
  targetCrackItch: "https://lunawolfstudios.itch.io/target-crack",
  aWorldApartItch: "https://lunawolfstudios.itch.io/a-world-apart",
  turboHoboCannonItch: "https://lunawolfstudios.itch.io/turbo-hobo-cannon",
  turboHoboCannonNewgrounds: "https://www.newgrounds.com/portal/view/675589",
  lightningLutherItch: "https://lunawolfstudios.itch.io/lightning-luther",
  fungeonCrawlerItch: "https://lunawolfstudios.itch.io/fungeon-crawler",
  planCItch: "https://lunawolfstudios.itch.io/plan-c",
  planCNewgrounds: "https://www.newgrounds.com/portal/view/684730",
  alexLemonadeStandItch: "https://lunawolfstudios.itch.io/aals",
  coppervalleRushItch: "https://lunawolfstudios.itch.io/coppervalle-rush",
  railboundItch: "https://lunawolfstudios.itch.io/railbound",
  onTheRocksItch: "https://lunawolfstudios.itch.io/on-the-rocks",

  // Jeremy Bregermann's itch.io page and the jam games on it
  jeremyItch: "https://bregermann.itch.io/",
  rowanOfBramblebrookItch: "https://bregermann.itch.io/rowan-of-bramblebrook",
  deadAirItch: "https://bregermann.itch.io/dead-air",

  // Web apps and browser games on the studio's own subdomains
  anatomyOfPlay: "https://tools.lunawolfstudios.com/anatomy-of-play/",
  fishWatch: "https://tools.lunawolfstudios.com/fishwatch/",
  reelGains: "https://tools.lunawolfstudios.com/reel-gains/",
  freshCatch: "https://tools.lunawolfstudios.com/fresh-catch/",
  lifeQuest: "https://games.lunawolfstudios.com/lifequest-the-next-level/dist/index.html",
  madladsTicTacToe: "https://games.lunawolfstudios.com/madlads-tic-tac-toe/",

  // The American Heart Association's telehealth game, on its Professional Education Hub
  ahaTelehealthGame: "https://store.education.heart.org/core-concepts-in-telehealth-interactive-game",

  // Recognition
  /** Unity blog, "Celebrating excellence: Unity Awards 2025 winners" (Dec 9, 2025). */
  unityAwards2025Results: "https://unity.com/blog/17th-unity-awards-wrap-up-2025-winners-revealed",
  /** Technical.ly, "Here are the nominees for the 2016 Delaware Innovation Awards". */
  delawareInnovationAwards2016: "https://technical.ly/diversity-equity-inclusion/nominees-2016-delaware-innovation-awards/",
  /** YouTube, Unity: "The 16th Unity Awards Showcase - Live October 23rd!" (the owner's link). */
  unityAwards16Showcase: "https://www.youtube.com/watch?v=dCM9sJERXgo",
  /** Barron Associates' NeuroSPARKS product page (the owner's link). */
  neurosparksBarron: "https://www.barron-associates.com/products/neurosparks/",
  /** MAGFest Indie Videogame Showcase (MIVS) page (the owner's link). */
  magfestMivs: "https://super.magfest.org/activities/gaming/indie-games/mivs/",
} as const;

export type LinkKey = keyof typeof LINKS;

/** Studio profiles, in footer order. `icon` names an entry in src/lib/icons.ts. */
export const SOCIALS: Array<{ key: LinkKey; label: string; icon: string }> = [
  { key: "youtube", label: "YouTube", icon: "youtube" },
  { key: "x", label: "X (Twitter)", icon: "x" },
  { key: "bluesky", label: "Bluesky", icon: "bluesky" },
  { key: "linkedin", label: "LinkedIn", icon: "linkedin" },
  { key: "instagram", label: "Instagram", icon: "instagram" },
  { key: "facebook", label: "Facebook", icon: "facebook" },
  { key: "twitch", label: "Twitch", icon: "twitch" },
  { key: "itch", label: "itch.io", icon: "itch" },
  { key: "newgrounds", label: "Newgrounds", icon: "newgrounds" },
];

/**
 * Profiles that identify the studio itself, for Organization.sameAs in JSON-LD: the social
 * profiles, plus the studio's publisher page on the Unity Asset Store and its Freelancer
 * profile. The studio's GitHub is left out on purpose: we do not point people at our
 * repositories (the owner's rule), here or in the footer.
 */
export const SAME_AS: string[] = [
  ...SOCIALS.map((s) => LINKS[s.key]),
  LINKS.assetStorePublisher,
  LINKS.freelancer,
];

/**
 * Campaign tags for outbound links, as on sheeptag2.com.
 *
 * Steam records a visit only when the URL carries utm_source or utm_campaign, and reports
 * the five standard fields under Steamworks > Traffic > UTM; wishlists and purchases within
 * 72 hours of a tagged visit come back as conversions. The Unity Asset Store and most other
 * stores read the same fields. The first three stay fixed so every link from this site lands
 * in one row; the placement goes in utm_content. Placements are locked once they ship, since
 * Steam cannot rename them after the fact.
 */
const UTM_SITE = {
  utm_source: "lunawolfstudios.com",
  utm_medium: "referral",
  utm_campaign: "website",
} as const;

/** Where the link sits, recorded as utm_content. Keep these stable; add new ones freely. */
export type LinkPlacement =
  | "header"
  | "nav_mobile"
  | "footer"
  | "hero"
  | "home"
  | "games"
  | "game_page"
  | "product_page"
  | "services"
  | "publishing"
  | "about"
  | "bootcamp"
  | "presskit"
  | "styleguide";

/** Tag an outbound URL for campaign reporting. Rendered links only; LINKS stays clean. */
export function withUtm(url: string, placement: LinkPlacement): string {
  const tagged = new URL(url);
  for (const [key, value] of Object.entries(UTM_SITE)) tagged.searchParams.set(key, value);
  tagged.searchParams.set("utm_content", placement);
  return tagged.href;
}

/** True for absolute http(s) URLs, which open in a new tab with rel="noopener". */
export const isExternal = (href: string) => /^https?:\/\//.test(href);
