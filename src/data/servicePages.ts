/**
 * Long-form content for the services hub and the six service pages. The short version of each
 * service (title, summary, bullets, keywords) stays in services.ts; this file builds on it and
 * never contradicts it. Titles, descriptions, H1s, H2s and FAQ questions follow the blocks in
 * archive/research/seo-plan.md.
 *
 * Sources for every claim: the founder pages (archive/wordpress/pages/about-jeff.md,
 * about-jeremy.md, about-olivia.md), helix.md, bootcamp.md, publishing.md, games.ts, awards.ts,
 * reviews.ts, archive/research/scriptable-sheets.md and portfolio.md, the Sheep Tag 2 press
 * kit (S:\Unity\WebsiteSheepTag2\src\data\presskit.ts), and the owner's answers of 21 November
 * 2026. Rules that shaped the copy:
 *
 * - We make games, and the site shows what we have worked on. The studio's body of work
 *   includes what its founders worked on, so the copy says "we" plainly, with no credit
 *   bookkeeping ("on Jeff's portfolio", "contractor", "Jeremy's role:", "Jeremy's experience"
 *   under a card). Each project still
 *   names the company that owns it, and no sentence says the studio owns, built alone, or
 *   published another company's product: "we worked on Lanebreak", never "we built Lanebreak".
 *   Those companies are not called "our client" in a sentence about a project. Olivia's
 *   employers are never named. Nothing is said about what was done on Cell to Singularity.
 * - No founder is named in this copy, and there is no "who you'll work with" strip: the
 *   services speak as the studio ("we", "our team"). Product and project pages may still
 *   name a founder.
 * - Sheep Tag 2, Hypno Halo, ParaLily, The Brave Hearts II, Lanebreak, and Cell to Singularity
 *   are Unity games (games.ts `engine`). Unity versions and render pipelines are stated
 *   plainly, the owner's way: every render pipeline, versions back to Unity 4, and modern
 *   versions (2022 and up) by preference. No list of which project uses which pipeline.
 *   Warcodes is credited to Emergent Worlds only.
 * - Lanebreak leads the co-development copy. What we built on it is the owner's list: the
 *   MIDI level editor, the F# level validator, the Perlin noise prop generation, and the
 *   interface screens. It ran on the Peloton Bike and Tread.
 * - The platform and online features we integrate (Steam Workshop, Timeline, stats and
 *   leaderboards, Steam login, accounts, friends, chat, microtransactions, live service,
 *   PlayFab, Azure, AWS, accessibility options) are the owner's list too.
 * - Pictures over paragraphs: every project with art in src/assets/ shows it.
 * - No prices, durations, team sizes, guarantees or contract terms. FAQs whose honest answer
 *   is an owner decision (code ownership, maintenance terms, small-business policy) are left
 *   out.
 * - Recognition is worded as awards.ts words it: nominations, never wins.
 *
 * HTML strings (`html`, FAQ `a`) may hold links; they are rendered with set:html and stripped
 * of tags for JSON-LD.
 */
import { LINKS, withUtm } from "./links";

// ─── Types ──────────────────────────────────────────────────────────────────────────────────

export interface Capability {
  title: string;
  text: string;
}

export interface FocusBlock {
  /** H2 from the SEO plan outline. */
  title: string;
  /** Paragraphs, HTML allowed. Keep it to one or two. */
  html: string[];
  /** Optional fact list shown under the text. */
  points?: string[];
  pointsTitle?: string;
  /** Optional picture of the thing the block describes, a path under src/assets/. */
  image?: string;
  imageAlt?: string;
  /** The block's anchor, when other pages link to it. Otherwise it is "focus-<n>". */
  id?: string;
}

export interface ProofItem {
  /** Slug in GAMES or PROJECTS; fills the title, art, link and role. */
  slug?: string;
  /** Title for an item that is not in games.ts. */
  title?: string;
  /** Whose project it is and what kind: "Our game", "Barron Associates". */
  kicker: string;
  /** What the project proves for this service. Facts only. */
  note: string;
  /** Prints "<roleBy>: <role from games.ts>". */
  roleBy?: string;
  /** Art override, a path under src/assets/. */
  image?: string;
  /** object-position for the art ("top", "50% 30%"). */
  imagePosition?: string;
  /** Show the whole image on a panel instead of cropping (square art). */
  contain?: boolean;
  /** Link override; internal path or external URL. */
  href?: string;
  /**
   * Visible link label, for a card whose link goes somewhere other than the project itself.
   * Never a founder's name ("Jeremy's experience"): the owner's rule is "we", with no
   * per-founder credit on the cards.
   */
  linkLabel?: string;
  /** Icon beside the title of a card that has no art (a text card). */
  icon?: string;
}

export interface ProofFeature {
  title: string;
  html: string[];
  points: string[];
  image: string;
  imageAlt: string;
  /** Internal page for the product. */
  page: { label: string; href: string };
  /** Store button (Unity Asset Store). */
  store?: { kind: "unity"; href: string };
  award?: { label: string; href: string };
}

export interface ServicePageContent {
  slug: string;
  /** Page title without the brand suffix (BaseLayout appends " | Luna Wolf Studios"). */
  title: string;
  description: string;
  h1: string;
  lead: string;
  hero: { image: string; alt: string; position?: string };
  /** One-line proof row under the lead. */
  proofLine: string[];
  /** schema.org Service.serviceType */
  serviceType: string;
  what: { title: string; lead: string; items: Capability[]; note?: string };
  focus: FocusBlock[];
  /** Heading for the Anatomy of Play body map (a click-to-load embed), shown before the proof. */
  explore?: { title: string; lead: string };
  work: {
    title: string;
    lead?: string;
    feature?: ProofFeature;
    /** Sub-heading over the cards when a feature block sits above them. */
    itemsTitle?: string;
    /** Cards with art come first in a grid; cards without art follow as a row of text cards. */
    items: ProofItem[];
    more?: { label: string; href: string };
    reviews?: { title: string; lead?: string; ids: string[] };
  };
  stack: { title: string; lead?: string; groups: Array<{ label: string; items: string[] }> };
  /** `steps`: the five engagement steps, with at least two written for this service. */
  process: { title: string; lead: string; steps: Capability[] };
  faq: { title: string; items: Array<{ q: string; a: string }> };
  /** Six tiles: service slugs, "publishing", "scriptable-sheets" or "hub". */
  related: string[];
  cta: { title: string; lead: string };
}

// ─── Helpers ────────────────────────────────────────────────────────────────────────────────

/** Outbound link with UTM tags, opening in a new tab (and saying so to screen readers). */
const ext = (url: string, text: string) =>
  `<a href="${withUtm(url, "services")}" target="_blank" rel="noopener">${text}<span class="visually-hidden"> (opens in a new tab)</span></a>`;
/** Internal link (trailing slash). */
const int = (href: string, text: string) => `<a href="${href}">${text}</a>`;

const BARRON = "https://www.barron-associates.com/";

/** The studio's one sentence on engines. */
const ENGINES = "We work in Unity, Unreal, Godot, and more.";

// ─── How an engagement runs (hub and every service page) ───────────────────────────────────

export const ENGAGEMENT_STEPS: Capability[] = [
  {
    title: "Tell us about it",
    text: "Email or use the contact form: what you want to build, who it is for, the platforms, your timeline, and a budget range if you have one.",
  },
  {
    title: "Scope it together",
    text: "We talk it through, ask the hard questions early, and agree on what the first milestone delivers.",
  },
  {
    title: "Prototype the risky part",
    text: "The part most likely to change the plan gets built first, so you see it working before the rest is committed.",
  },
  {
    title: "Build in milestones",
    text: "Regular builds you can play or use, with check-ins along the way and changes made while they are still cheap.",
  },
  {
    title: "Ship and support",
    text: "Release, store submission where it applies, then fixes and updates after launch.",
  },
];

/** The five steps with some rewritten for one service: `{ 2: { title, text } }` (1-based). */
const stepsWith = (overrides: Record<number, Capability>): Capability[] =>
  ENGAGEMENT_STEPS.map((step, i) => overrides[i + 1] ?? step);

// ─── The six service pages ──────────────────────────────────────────────────────────────────

const gameDevelopment: ServicePageContent = {
  slug: "game-development",
  title: "Game development and co-development",
  description:
    "Game development studio for hire: we design, build, and ship PC, Nintendo Switch, and online multiplayer games, or join your team as a co-development partner.",
  // A word joiner after the hyphen keeps "co-development" on one line in the h1 on phones.
  h1: "Game development and co-\u2060development services",
  lead: "Luna Wolf Studios is a game development studio in Newark, Delaware. We take games from the first prototype to updates after launch, on PC, Nintendo Switch, and online, or join your team on a game already in production.",
  hero: {
    image: "games/sheep-tag-2/screenshot-01.jpg",
    alt: "A 32 player game of Sheep Tag 2 seen from high above, with hundreds of farms filling a green terrain around the pen in the middle.",
  },
  proofLine: ["Hypno Halo on Steam and Nintendo Switch", "Sheep Tag 2: up to 32 players online", "Publisher of The Brave Hearts II"],
  serviceType: "Video game development",
  what: {
    title: "Games we build for you: prototypes, full games, and updates",
    lead: "The whole lifecycle, from concept and gameplay design through programming, testing, release, and support after launch. Take all of it or the parts you need.",
    items: [
      { title: "Concept and prototypes", text: "Game design and a playable prototype that tests the core idea before the full build starts." },
      { title: "Gameplay systems", text: "Physics, AI behaviors, scene management, game saves, and procedural content in Unity and C#." },
      { title: "Online multiplayer", text: "Networked play with prediction and rollback, regional servers, and bots, as in Sheep Tag 2." },
      { title: "Interfaces and controls", text: "Menus, HUDs, and full controller and touch screen support, as Hypno Halo ships with." },
      { title: "Level editors and mods", text: "In-game level editors with sharing on the Steam Workshop, like the one built into Sheep Tag 2." },
      { title: "Steam integration", text: "Steam Workshop, Steam Timeline, stats and leaderboards, achievements, Steam Cloud, and Steam login." },
      { title: "Nintendo Switch releases", text: "We released Hypno Halo and ParaLily on Nintendo Switch as their publisher." },
      { title: "Testing and optimization", text: "Debugging, performance work, build verification, and release quality assurance." },
      { title: "Updates after launch", text: "Patches, content updates, and post-release support once players are in." },
    ],
  },
  focus: [
    {
      title: "Co-development: we join your team and your pipeline",
      html: [
        `We work in your repository, tools, and schedule and take on a defined part: a system, a platform, a release. We worked on Lanebreak, Peloton's gaming-inspired workout, through its release on the Peloton Bike and Tread. We have also worked on Warcodes by Emergent Worlds, Cell to Singularity by Computer Lunch, and Traveler's Refrain by Red Essence Games. ${int("/games/", "See every game we've worked on")}.`,
      ],
      image: "portfolio/lanebreak.jpg",
      imageAlt: "Peloton Lanebreak: a glowing blue wheel throws sparks as it rolls along a dark track marked with blue beats.",
      pointsTitle: "What we built on Lanebreak",
      points: [
        "A level editor that turns designers' MIDI files into Unity levels",
        "A level validator in F# for playability and fitness metrics",
        "Procedural background props from Perlin noise density maps",
        "Post-ride summaries, metric panels, blast gauges, and difficulty selection",
      ],
    },
    {
      title: "Online multiplayer, from netcode to servers",
      html: [
        `Our own ${int("/sheep-tag-2/", "Sheep Tag 2")} puts up to 32 players in one online match of Sheep against Wolves, on Photon Quantum with prediction and rollback and servers in the US, EU, and Australia. Around the match: joining games in progress, observers, bots at five difficulty levels, replays from any player's view, and native builds for Windows, macOS, and Linux.`,
      ],
      image: "games/sheep-tag-2/screenshot-03.jpg",
      imageAlt: "A Sheep casts Fortify in the middle of a huge grid of farms on ReVoLuTiOn as Wolves close in from the right.",
      pointsTitle: "Sheep Tag 2 in numbers",
      points: [
        "Up to 32 players online, or solo against bots",
        "Photon Quantum with prediction and rollback",
        "US, EU, and AU servers",
        "Funded on Kickstarter in November 2021",
        "Early Access on Steam in 2027",
      ],
    },
    {
      title: "Releasing on Steam and Nintendo Switch",
      html: [
        `We released ${int("/hypno-halo/", "Hypno Halo")} on Steam in October 2025 and on Nintendo Switch in November 2025 as its developer and publisher, with 50+ achievements and leaderboards. We published ${int("/paralily/", "ParaLily")} on Nintendo Switch and ${int("/the-brave-hearts-ii-false-skies/", "The Brave Hearts II: False Skies")}, by Connor Butler, on Steam, where we handled platform integration, Windows build verification, controller usability, and release quality assurance. Want a publisher instead? See ${int("/publishing/", "indie game publishing")}.`,
      ],
      image: "games/hypno-halo/wp-screenshot-medium-98.jpg",
      imageAlt: "Hypno Halo, round 98 on medium: teal and purple rings nest toward the centre over a field of spinning stars.",
    },
    {
      title: "Steam features, online services, and live games",
      html: [
        "We integrate platform features and set up the backend services a live game runs on.",
      ],
      pointsTitle: "What we integrate",
      points: [
        "Steam Workshop",
        "Steam Timeline",
        "Steam stats and leaderboards",
        "Achievements and Steam Cloud",
        "Steam login, player accounts, and account settings",
        "Friends, text chat, and voice chat",
        "Microtransactions",
        "Live service games",
        "Backend services on PlayFab, Azure, and AWS",
        "Accessibility options",
      ],
    },
  ],
  work: {
    title: "Games we've worked on",
    lead: "Our own games, the games we publish, and games by other studios we have worked on.",
    items: [
      {
        slug: "sheep-tag-2",
        kicker: "Our game",
        note: "Online multiplayer for up to 32 players, with bots, a level editor, replays, and Windows, macOS, and Linux builds.",
      },
      {
        slug: "hypno-halo",
        kicker: "Our game",
        note: "300+ handcrafted levels, released on Steam and Nintendo Switch in 2025, developed and published by us.",
      },
      {
        slug: "paralily",
        kicker: "Our game · by Team ParaLily",
        note: "A precision puzzle platformer, published by us on Nintendo Switch and with Team ParaLily on Steam.",
      },
      {
        slug: "the-brave-hearts-ii-false-skies",
        kicker: "Connor Butler · published by us",
        note: "Steam publishing, platform integration, achievements, Steam Cloud, and release QA for a voice-acted shoot 'em up.",
      },
      {
        slug: "cell-to-singularity",
        kicker: "Computer Lunch",
        note: "An idle clicker about the evolution of life, for mobile, PC, and the web.",
      },
      {
        slug: "travelers-refrain",
        kicker: "Red Essence Games",
        note: "A song-casting action RPG on Steam, published by indie.io.",
      },
    ],
    more: { label: "See all our games and projects", href: "/games/" },
    reviews: { title: "What a client said", ids: ["home-17"] },
  },
  stack: {
    title: "Engines, platforms, and tools",
    groups: [
      { label: "Engines and languages", items: ["Unity", "C#", "Unreal Engine 5", "C++"] },
      { label: "Online", items: ["Photon Quantum", "Prediction and rollback", "Regional servers", "Bots"] },
      { label: "Platforms", items: ["Windows", "macOS", "Linux", "Nintendo Switch", "iOS", "Android", "Web"] },
      { label: "Steam", items: ["Steam Workshop", "Steam Timeline", "Stats and leaderboards", "Achievements", "Steam Cloud", "Steam login"] },
      { label: "Backend", items: ["PlayFab", "Azure", "AWS", "Text and voice chat", "Microtransactions"] },
      { label: "Workflow", items: ["Git and GitHub", "ChatGPT and Codex", "Automated testing"] },
    ],
  },
  process: {
    title: "How a game project runs",
    lead: "The same five steps whether we build the whole game or join yours.",
    steps: stepsWith({
      3: {
        title: "Prototype the core idea",
        text: "A playable prototype tests the core idea and the riskiest system, such as online play, before the full build starts.",
      },
      5: {
        title: "Release and update",
        text: "Release on Steam or Nintendo Switch with achievements, cloud saves, and store setup, then patches and content updates.",
      },
    }),
  },
  faq: {
    title: "Questions about hiring a game studio",
    items: [
      {
        q: "How much does it cost to hire a game development studio?",
        a: "It depends on how much game there is, which platforms it ships on, how much art and audio it needs, and whether it plays online. Multiplayer and console releases add work a single-player PC game does not need. We quote each project after a first conversation, so <a href=\"/contact/\">tell us what you have in mind</a> and we will come back with questions and a plan.",
      },
      {
        q: "What is the difference between co-\u2060development and outsourcing?",
        a: "In co-development, our developers work inside your repository, tools, and schedule as part of your team. In outsourcing, you hand over a defined piece of work and we deliver it. We have worked both ways, from systems for other studios' Unity games to whole games of our own. Tell us which fits your game.",
      },
      {
        q: "Can you build an online multiplayer game?",
        a: "Yes. Our own game, <a href=\"/sheep-tag-2/\">Sheep Tag 2</a>, supports up to 32 players online. It is built on Photon Quantum with prediction and rollback, runs on US, EU, and AU servers, lets players join games already in progress, and fills empty seats with bots.",
      },
      {
        q: "Can you help release our game on Steam?",
        a: "Yes. We released <a href=\"/hypno-halo/\">Hypno Halo</a> on Steam as its developer and publisher. For <a href=\"/the-brave-hearts-ii-false-skies/\">The Brave Hearts II: False Skies</a>, we handled Steam publishing and integration, achievements, Steam Cloud, Windows build verification, and release QA. To have us publish your game, see <a href=\"/publishing/\">publishing</a>.",
      },
      {
        q: "Can you port our game to Nintendo Switch?",
        a: "We have released our own games, Hypno Halo and ParaLily, on Nintendo Switch. Porting someone else's game is case by case: it depends on the engine, the code, and your access to Nintendo's developer program. Send us where your build stands and we will tell you what a port would involve.",
      },
      {
        q: "Which engines do you use?",
        a: `${ENGINES} Sheep Tag 2, Hypno Halo, ParaLily, and HELIX are all built in Unity with C#. We also build in Unreal Engine 5 with C++, and our team teaches Unreal Engine at the University of Illinois Urbana-Champaign and Wilmington University.`,
      },
    ],
  },
  related: ["unity-development", "unity-editor-tools", "vr-ar-development", "serious-games", "software-development", "publishing"],
  cta: {
    title: "Start your game",
    lead: "Send us the idea, the platforms, your timeline, and a budget range if you know it. A prototype, a full game, or help with one already underway.",
  },
};

const unityDevelopment: ServicePageContent = {
  slug: "unity-development",
  title: "Hire Unity developers for games and apps",
  description:
    "Hire Unity developers for gameplay, multiplayer, VR, and mobile, plus CI/CD, cloud streaming, upgrades, and updates after launch. Over a decade in Unity.",
  h1: "Unity development services",
  lead: "We build Unity games, apps, and simulations for desktop, mobile, VR, and the web, with the build pipelines, servers, and updates around them. Hire our Unity developers for a whole project or a defined piece of it.",
  hero: {
    image: "games/sheep-tag-2/screenshot-08.jpg",
    alt: "The Wardrobe screen in Sheep Tag 2: a Sheep stands on its hind legs trying on a Mushroom hat beside a grid of items to choose from.",
  },
  proofLine: ["Hypno Halo and Sheep Tag 2 in Unity", "HELIX on Meta Quest 2", "Unity tutorials on Kodeco"],
  serviceType: "Unity development",
  what: {
    title: "What we build in Unity",
    lead: "Unity and C# engineering for games, apps, and simulations, on every platform Unity ships to.",
    items: [
      { title: "Gameplay programming", text: "Physics, AI behaviors, game controllers, scene management, saves, and procedural content in C#." },
      { title: "User interfaces", text: "Menus, HUDs, and app screens, including interfaces built from Figma designs." },
      { title: "Multiplayer and networking", text: "Photon Quantum with prediction and rollback in Sheep Tag 2, for up to 32 players." },
      { title: "VR and mixed reality", text: "Meta Quest 2 apps, Apple Vision Pro Shader Graph materials, and depth-camera mixed reality." },
      { title: "Mobile apps", text: "iOS and Android builds, from progression systems in Warcodes to the Realize room design app." },
      { title: "Build automation and CI/CD", text: "Containerized infrastructure and pipelines that automate Unity builds across web, mobile, and VR." },
      { title: "Cloud streaming", text: "Fully interactive 3D simulations streamed over low-bandwidth networks with AWS and WebRTC." },
      { title: "Integrations", text: "Backends, HTTP and JSON services, analytics, activity tracking, and third-party SDKs." },
      { title: "Upgrades and optimization", text: "Debugging, performance work, and bringing older projects onto current Unity." },
    ],
    note: `Need tools that run inside the Unity Editor itself? Our ${int("/services/unity-editor-tools/", "custom Unity editor tools")} service covers editor windows, data editors, and import pipelines, and we make Scriptable Sheets.`,
  },
  focus: [
    {
      title: "Joining your existing Unity project",
      html: [
        "Most Unity work starts in someone else's codebase. We get your project building, learn how it is put together, and agree with you what to change before we change it. We have done that on Unity projects for five companies, and worked on Peloton's Lanebreak and Computer Lunch's Cell to Singularity.",
      ],
      pointsTitle: "Unity projects we've joined",
      points: [
        "Syneos Health (2025): healthcare and pharmaceutical software",
        "Emergent Worlds (2025): game systems for Warcodes",
        "Southern Methodist University (2024): mixed reality",
        "Asurion (2021): VR soft-skills training",
        "Realize Design (2020): UI and backend features",
      ],
    },
    {
      title: "Build automation, CI/CD, and cloud streaming",
      html: [
        `We have built containerized infrastructure and CI/CD pipelines that automated Unity builds and service deployments across web, mobile, and VR, shortening release cycles and making releases more stable. We have also built low-latency platforms with Unity, AWS, and WebRTC that stream fully interactive 3D simulations over low-bandwidth networks, so people can use a heavy Unity app without a powerful device.`,
      ],
    },
    {
      title: "Upgrades, optimization, and post-release support",
      html: [
        `Debugging, quality assurance, optimization, and post-release support are part of the work. We are revisiting our own ${int("/haberdashery/", "Haberdashery")} in modern Unity: updated rendering, modernized code, better compatibility, and gameplay refinements. Scriptable Sheets, first released in July 2024, still supports Unity 2020.3 LTS and later alongside Unity 6. If your Unity game needs a full team, see ${int("/services/game-development/", "game development")}.`,
      ],
      image: "games/haberdashery/wp-pc-screenshot-01.jpg",
      imageAlt: "Haberdashery: a sheep in a space helmet runs across a grey moon between boulders, under a Baah-dly Go banner.",
    },
  ],
  work: {
    title: "Unity projects we've built and worked on",
    items: [
      {
        slug: "sheep-tag-2",
        kicker: "Our game",
        note: "32-player online multiplayer on Photon Quantum, bots, replays, and a built-in level editor.",
      },
      {
        slug: "hypno-halo",
        kicker: "Our game",
        note: "Released on Steam and Nintendo Switch in 2025, with controller and touch screen support, achievements, and leaderboards.",
      },
      {
        slug: "helix",
        kicker: "Our project · with Nemours",
        note: "A Unity VR app on Meta Quest 2 that turns hearing tests into games and uploads encrypted results.",
      },
      {
        slug: "paralily",
        kicker: "Our game · by Team ParaLily",
        note: "A precision puzzle platformer, published by us on Nintendo Switch.",
      },
      {
        slug: "lanebreak",
        kicker: "Peloton",
        note: "A gaming-inspired workout for the Peloton Bike and Bike+, built in Unity.",
      },
      {
        slug: "cell-to-singularity",
        kicker: "Computer Lunch",
        note: "An idle clicker for mobile, PC, and the web, built in Unity.",
      },
      {
        slug: "warcodes",
        kicker: "Emergent Worlds",
        note: "Achievement systems, progression logic, reusable C# data structures, and interfaces for a mobile game.",
      },
      {
        slug: "realize",
        kicker: "Realize Design",
        note: "Unity UI systems, backend integrations, and HTTP and JSON features, tested on iOS and Android.",
      },
      {
        slug: "how-to-make-a-match-3-game-in-unity",
        kicker: "Kodeco tutorial",
        note: "One of the Unity tutorials we wrote for Kodeco, alongside the Audio Mixer and ScriptableObject tutorials.",
      },
      {
        slug: "syneos-health-unity-software",
        kicker: "Syneos Health",
        note: "Healthcare and pharmaceutical Unity software: Apple Vision Pro Shader Graph materials, Figma-based interfaces, and Chinese localization.",
        icon: "cube",
      },
    ],
    more: { label: "See all our games and projects", href: "/games/" },
    reviews: { title: "What a client said", ids: ["home-17"] },
  },
  stack: {
    title: "Unity versions, platforms, and services",
    // The owner's statement, plainly: every render pipeline, Unity since version 4, and
    // modern versions by preference.
    lead: "We have worked with every Unity render pipeline, and with Unity versions as far back as Unity 4. We like to work in modern versions: Unity 2022 and up.",
    groups: [
      { label: "Unity", items: ["Unity 2022 and up", "Unity 6", "Built-in", "URP", "HDRP", "Shader Graph", "C#"] },
      { label: "Platforms", items: ["Windows", "macOS", "Linux", "iOS", "Android", "Web", "Meta Quest 2", "Apple Vision Pro"] },
      { label: "Networking and cloud", items: ["Photon Quantum", "AWS", "WebRTC", "HTTP and JSON APIs"] },
      { label: "Delivery", items: ["CI/CD pipelines", "Containerized infrastructure", "Git and GitHub", "Automated testing"] },
      { label: "Also", items: ["Unreal Engine 5", "C++", "Figma", "ChatGPT and Codex"] },
    ],
  },
  process: {
    title: "How a Unity project runs",
    lead: "The same steps for a new project or one already underway.",
    steps: stepsWith({
      2: {
        title: "Read your project",
        text: "For an existing project, we get it building, learn how it is put together, and agree what to change before we change it.",
      },
      4: {
        title: "Build in milestones",
        text: "Regular builds for every platform you target, with build automation where it saves time and check-ins along the way.",
      },
      5: {
        title: "Ship and support",
        text: "Release, then debugging, optimization, and updates after launch, on the Unity version your project uses.",
      },
    }),
  },
  faq: {
    title: "Questions about hiring Unity developers",
    items: [
      {
        q: "Can we hire Unity developers to join our team?",
        a: "Yes, for a defined piece of work. We have joined Unity projects at companies from Syneos Health to Southern Methodist University. Tell us what your team needs and for how long, and we will say plainly whether we are the right fit.",
      },
      {
        q: "Can you speed up our Unity builds and releases?",
        a: "Yes. We have built containerized infrastructure and CI/CD pipelines that automated Unity builds and service deployments across web, mobile, and VR, shortening release cycles and making releases more stable. We start by looking at how you build and ship today.",
      },
      {
        q: "Can a Unity app run in a browser without a download?",
        a: "Yes, two ways. Smaller Unity projects can be built for the web and play in the browser, like our page-turning story Alex and the Amazing Lemonade Stand. For heavy 3D apps, we have built platforms that stream fully interactive Unity simulations over low-bandwidth networks with AWS and WebRTC.",
      },
      {
        q: "Can you upgrade or optimize an older Unity project?",
        a: "Yes. Debugging, optimization, and post-release support are part of our work, and we are revisiting our own Haberdashery with current Unity technology, updated rendering, and modernized code. We measure first, then fix what the measurements show.",
      },
      {
        q: "Do you also build custom editor tools?",
        a: "Yes, as a separate service: see <a href=\"/services/unity-editor-tools/\">custom Unity editor tools</a>.",
      },
      {
        q: "Do you also work in Unreal Engine?",
        a: `Yes. ${ENGINES} We build in Unreal Engine 5 with C++, and our team teaches Unreal Engine at the University of Illinois Urbana-Champaign and Wilmington University.`,
      },
    ],
  },
  related: ["unity-editor-tools", "game-development", "vr-ar-development", "serious-games", "software-development", "hub"],
  cta: {
    title: "Talk to a Unity developer",
    lead: "Tell us about the project: new or existing, the Unity version, the platforms, and what needs doing first.",
  },
};

const unityEditorTools: ServicePageContent = {
  slug: "unity-editor-tools",
  title: "Custom Unity editor tools and extensions",
  description:
    "We build custom Unity editor tools, extensions, and pipeline tooling that save your team time. Makers of Scriptable Sheets, a 17th Unity Awards nominee.",
  h1: "Custom Unity editor tools and extensions",
  lead: "We build tools that run inside the Unity Editor: editor windows, inspectors, data editors, importers, and workflow automation for your project. We also make Scriptable Sheets, sold on the Unity Asset Store.",
  hero: {
    image: "scriptable-sheets/key-image.jpg",
    alt: "Scriptable Sheets key art: a table of ScriptableObjects inside the Unity Editor, beside the tool's main features.",
  },
  proofLine: ["Scriptable Sheets on the Unity Asset Store", "Nominee, Best Development Tool, 17th Unity Awards"],
  serviceType: "Unity editor tool development",
  what: {
    title: "Tools we build: editor windows, inspectors, and data editors",
    lead: "Code that runs inside the Editor so your team does repeated work in seconds, and ships nothing extra in the game build.",
    items: [
      { title: "Editor windows", text: "Dockable windows for the jobs your team repeats. Open several at once; settings survive a restart." },
      { title: "Spreadsheet data editors", text: "ScriptableObjects, Prefabs, and Components in a table you can sort, filter, and edit in bulk." },
      { title: "Inspector integration", text: "Tools that select objects in the Inspector and Project windows as you move through them." },
      { title: "Import and export", text: "CSV, TSV, JSON, and Google Sheets in and out of Unity, with headers, delimiters, and enum conversion." },
      { title: "Asset import pipelines", text: "Modular importers with geometry reconstruction, scene generation, and diagnostic tools." },
      { title: "Diagnostics and visualization", text: "Debugging and visualization tools that show what the data and the scene are really doing." },
      { title: "Batch operations", text: "Create many ScriptableObjects in one click, or edit many assets in one pass." },
      { title: "Bug reporting", text: "Trello Poster, a free, open-source tool that lets a game and its players file Trello cards." },
      { title: "Source, tests, and docs", text: "Full source code, unit tests, samples, and documentation, as Scriptable Sheets ships with." },
    ],
  },
  focus: [
    {
      title: "Pipeline and workflow tooling: importers, validators, and editor automation",
      html: [
        "The most useful tools often never get a window of their own: they import data from where designers already work, check it on the way in, and create what is missing. Scriptable Sheets pulls data from any Google Sheet shared by link with one-click importers, and can create missing ScriptableObjects during an import or a paste.",
        `Our Universal PS1 Game Asset Importer, a research and tooling project, explores modular import pipelines, game-specific adapters, geometry reconstruction, textures, collision information, scene generation, and diagnostic tools for PlayStation-era assets. It is not a release of anyone's game content. Build servers and CI/CD outside the Editor are part of our ${int("/services/unity-development/", "Unity development services")}.`,
      ],
      image: "scriptable-sheets/screenshot-05.jpg",
      imageAlt: "A Google Sheet of language names and the same rows in a Scriptable Sheets table, with arrows showing data moving both ways.",
    },
  ],
  work: {
    title: "Scriptable Sheets, our own tool on the Unity Asset Store",
    feature: {
      title: "Scriptable Sheets",
      html: [
        "Scriptable Sheets shows ScriptableObjects, Prefabs, Components, and other Unity assets in a spreadsheet-like table inside the Editor, so you can sort, filter, edit, copy, and paste them in bulk. It needs no coding to start.",
        "It handles nested, inherited, and generic fields, arrays and lists, SerializeReference fields, Sub Assets, and Addressable Asset References. It runs only in the Editor and is completely stripped from builds.",
      ],
      points: [
        "On the Unity Asset Store since July 2024",
        "Supports Unity 2020.3 LTS and later",
        "Ships with full source code, samples, and unit tests",
        "Documentation and video tutorials",
      ],
      image: "scriptable-sheets/screenshot-02.jpg",
      imageAlt: "Scriptable Sheets comparing weapon properties side by side in a table, with a column layout menu open.",
      page: { label: "See Scriptable Sheets", href: "/scriptable-sheets/" },
      store: { kind: "unity", href: LINKS.scriptableSheets },
      award: { label: "Nominee, Best Development Tool, 17th Unity Awards (2025)", href: LINKS.unityAwards2025Results },
    },
    itemsTitle: "More tools and tooling work",
    items: [
      {
        slug: "sheep-tag-2",
        kicker: "Our game · level editor",
        note: "A built-in level editor with tilesets, structures, terrain borders, and mirror mode, sharing terrains on the Steam Workshop.",
        image: "games/sheep-tag-2/video-poster-build-your-battlegrounds.jpg",
      },
      {
        slug: "setup-a-bug-reporter-in-unity-using-trello",
        kicker: "Our free tool · video tutorial",
        note: "Trello Poster, a free, open-source Unity tool that files Trello cards from a game, for example as a bug reporter.",
      },
      {
        slug: "scriptableobject-tutorial-getting-started",
        kicker: "Kodeco tutorial",
        note: "Our original Kodeco tutorial on using ScriptableObjects to streamline Unity workflows and decouple code.",
      },
      {
        slug: "universal-ps1-game-asset-importer",
        kicker: "Our R&D",
        note: "Modular import pipelines, geometry reconstruction, scene generation, and diagnostics for PlayStation-era assets.",
        icon: "layers",
      },
    ],
    reviews: {
      title: "What developers say about our tools",
      ids: ["home-03", "home-04", "home-05", "home-06"],
    },
  },
  stack: {
    title: "What our tools are built with",
    groups: [
      { label: "Editor", items: ["C# editor scripting", "IMGUI", "Unity 6", "Unity 2020.3 LTS and later"] },
      { label: "Unity data", items: ["ScriptableObjects", "Prefabs and Components", "SerializeReference", "Sub Assets", "Addressables"] },
      { label: "Formats and services", items: ["CSV", "TSV", "JSON", "Google Sheets", "Trello"] },
      { label: "Quality", items: ["Unit tests", "Samples", "Documentation", "Video tutorials"] },
    ],
  },
  process: {
    title: "How a tool project works",
    lead: "Start with the task that slows your team down most, so the first milestone is a tool your team can use right away.",
    steps: stepsWith({
      1: {
        title: "Tell us the task",
        text: "Email or use the contact form: the task that slows your team down, who does it, how often, and your Unity version.",
      },
      3: {
        title: "Build the first tool",
        text: "A working version of the most-needed tool comes first, tried on the data your project already has.",
      },
      5: {
        title: "Hand over and support",
        text: "The handover agreed before work starts, such as source code, tests, and documentation, then fixes and updates.",
      },
    }),
  },
  faq: {
    title: "Questions about custom Unity tools",
    items: [
      {
        q: "What is a custom Unity editor tool?",
        a: "Code that runs inside the Unity Editor, not in your game: editor windows, inspectors, menu commands, importers, and checks that let your team do repeated work faster. Editor code stays out of the player build. Scriptable Sheets, for example, works only in the Editor and is completely stripped from builds.",
      },
      {
        q: "What kinds of editor tools can you build?",
        a: "Our own work includes a spreadsheet data editor (<a href=\"/scriptable-sheets/\">Scriptable Sheets</a>), import pipelines with geometry reconstruction, scene generation, and diagnostics (our PlayStation-era asset importer research), an in-game level editor (Sheep Tag 2), and a bug reporter that files Trello cards (Trello Poster). Tell us the task your team repeats most.",
      },
      {
        q: "Can you build tools for designers who don't code?",
        a: "Yes, that is who most editor tools are for. Scriptable Sheets needs no coding: designers edit game data in a table and copy and paste between Unity and Excel or Google Sheets. A good tool puts the fields a designer needs in front of them and keeps the rest out of the way.",
      },
      {
        q: "Can you extend or fix a tool our team already built?",
        a: "Send it to us with what it should do. We start by reading the existing code, then agree with you what to keep, what to fix, and what to replace before we change anything.",
      },
      {
        q: "Will the tool work with our Unity version?",
        a: "We build for the version your team uses. Scriptable Sheets supports Unity 2020.3 LTS and later, so we are used to keeping one codebase working across many Unity releases, including Unity 6.",
      },
      {
        q: "What do we get at handover?",
        a: "We agree on that before work starts. Scriptable Sheets shows how we ship a tool: full source code, samples, unit tests, documentation, and video tutorials.",
      },
    ],
  },
  related: ["unity-development", "game-development", "software-development", "vr-ar-development", "serious-games", "scriptable-sheets"],
  cta: {
    title: "Tell us what slows your team down",
    lead: "Describe the task, who does it, and how often. We will tell you what a tool for it could look like.",
  },
};

const vrArDevelopment: ServicePageContent = {
  slug: "vr-ar-development",
  title: "VR and AR app development studio",
  description:
    "We build VR and AR apps in Unity for Meta Quest: health assessments, therapy, training, and games, with the web dashboards and secure data behind them.",
  h1: "VR and AR app development",
  lead: "We build VR, AR, and mixed reality apps in Unity for Meta Quest, for health assessment, therapy, training, and play, along with the dashboards and data systems behind them.",
  hero: {
    image: "games/helix/helix-digits-in-noise.jpg",
    alt: "The digits-in-noise test in HELIX: a player's VR controllers in front of a keypad of large numbers.",
  },
  proofLine: ["HELIX on Meta Quest 2", "Made with Nemours Children's Hospital", "VR training and mixed reality"],
  serviceType: "VR and AR app development",
  what: {
    title: "What we build in VR and AR",
    lead: "Headset apps with a purpose, and the data systems behind them.",
    items: [
      { title: "Health assessments", text: "Hearing tests as VR games with real-time feedback for patients, as in HELIX." },
      { title: "Therapy and rehabilitation", text: "Exercise games that guide patients with real-time feedback and track their movement." },
      { title: "Training simulations", text: "VR soft-skills training with 360-degree video, composited actors, activity tracking, and analytics." },
      { title: "Mixed reality", text: "Stereolabs ZED depth cameras combined with Meta Quest 2 hardware." },
      { title: "Apple Vision Pro", text: "Shader Graph materials for healthcare and pharmaceutical software." },
      { title: "Alternative inputs", text: "Motion capture, electromyography, and other alternative controls." },
      { title: "Dashboards and data", text: "Encrypted uploads from the headset to a backend, and a web dashboard for providers." },
      { title: "Cloud streaming", text: "Fully interactive 3D simulations streamed over low-bandwidth networks with AWS and WebRTC." },
      { title: "Calibrated audio", text: "Calibrated audio files for accurate test results, played in a 3D scene." },
    ],
  },
  focus: [
    {
      title: "VR for health assessment and therapy",
      html: [
        `Traditional hearing tests can be boring and repetitive, which makes auditory processing disorder hard to assess accurately. ${int("/helix/", "HELIX")} turns three of those tests into VR games on Meta Quest 2: digits-in-noise, pure tone, and sound localization, with calibrated audio for accurate results. We built it in Unity with audiologists and Nemours Children's Hospital. It started with funding from the DBI CAT grant program, held successful youth group testing sessions, and completed a pilot study with about 30 subjects in 2023.`,
      ],
      image: "games/helix/helix-pure-tone-crop.jpg",
      imageAlt: "The pure tone test in HELIX: cartoon animals stand along a path while the game asks which ear heard the tone.",
      pointsTitle: "HELIX, in three parts",
      points: [
        "A Unity VR app for Meta Quest 2",
        "A data system on HIPAA-compliant AWS services (RDS, S3, EC2)",
        "A web dashboard for organizations, providers, and patients",
      ],
    },
    {
      title: "VR training, mixed reality, and new headsets",
      html: [
        "We have worked on headset software for other organizations too: VR soft-skills training for Asurion on Meta Quest 2, with 360-degree video, composited actors, activity tracking, and analytics; interactive mixed reality for Southern Methodist University that pairs Stereolabs ZED depth cameras with Meta Quest 2; and Apple Vision Pro Shader Graph materials in Unity software for Syneos Health.",
      ],
    },
    {
      title: "Dashboards and data behind the headset",
      html: [
        `HELIX encrypts its results and uploads them in real time to a database management system on HIPAA-compliant AWS services, and a web dashboard shows them to providers: accounts, assigned tests, calendars, and charts that track progress over time. We build both halves: see ${int("/services/software-development/", "custom software and web app development")} for the backend side, and ${int("/services/serious-games/", "serious games")} for the health and education work.`,
      ],
    },
  ],
  work: {
    title: "VR and AR projects",
    items: [
      {
        slug: "helix",
        kicker: "Our project · with Nemours",
        note: "A VR hearing assessment on Meta Quest 2 with a HIPAA-compliant AWS backend and a provider dashboard. Pilot study with about 30 subjects in 2023.",
      },
      {
        slug: "saebovr",
        kicker: "Barron Associates",
        note: "Upper-extremity rehabilitation for stroke survivors: Kinect tracks the arm while a virtual assistant guides self-care tasks.",
      },
      {
        slug: "asurion-vr-soft-skills-training",
        kicker: "Asurion",
        note: "VR soft-skills training on Meta Quest 2 with 360-degree video, composited actors, activity tracking, and analytics.",
        icon: "headset",
      },
      {
        slug: "smu-mixed-reality-software",
        kicker: "Southern Methodist University",
        note: "Interactive mixed reality that integrates Stereolabs ZED depth cameras with Meta Quest 2.",
        icon: "layers",
      },
      {
        slug: "syneos-health-unity-software",
        kicker: "Syneos Health",
        note: "Apple Vision Pro Shader Graph materials, Figma-based interfaces, and Chinese localization.",
        icon: "cube",
      },
    ],
    more: { label: "See all our games and projects", href: "/games/" },
  },
  stack: {
    title: "Headsets, inputs, and services",
    groups: [
      { label: "Engine", items: ["Unity", "C#", "Shader Graph"] },
      { label: "Headsets and devices", items: ["Meta Quest 2", "Apple Vision Pro", "Stereolabs ZED", "Microsoft Kinect"] },
      { label: "Inputs and media", items: ["Motion capture", "Electromyography (EMG)", "360-degree video", "Calibrated audio"] },
      { label: "Data and cloud", items: ["AWS RDS", "AWS S3", "AWS EC2", "WebRTC", "Web dashboards"] },
    ],
  },
  process: {
    title: "How a VR project runs",
    lead: "A VR project moves through a prototype, a pilot with real users, and a release.",
    steps: stepsWith({
      3: {
        title: "Prototype in the headset",
        text: "A prototype you can try in the headset, because comfort, readability, and input feel are easiest to judge with it on.",
      },
      4: {
        title: "Pilot with real users",
        text: "The people who will use the app try it, and we change what they show us before release.",
      },
    }),
  },
  faq: {
    title: "Questions about VR development",
    items: [
      {
        q: "Which VR headsets do you develop for?",
        a: "Most of our headset work is on Meta Quest 2: HELIX, VR training for Asurion, and mixed reality for Southern Methodist University. We have also built Shader Graph materials for Apple Vision Pro. If your project needs a different headset, tell us which one and what it has to do.",
      },
      {
        q: "How long does it take to make a VR app?",
        a: "It depends on scope. A VR project usually moves through a prototype you can try in the headset, a pilot with real users, and then a release, and each phase takes as long as its features need. Send us what the app has to do and who will use it, and we will tell you how we would phase it.",
      },
      {
        q: "Can VR be used for medical assessment or therapy?",
        a: "Yes. <a href=\"/helix/\">HELIX</a> turns hearing tests into VR games to help assess auditory processing disorder, and it completed a pilot study with about 30 subjects in 2023. We also worked on SaeboVR by Barron Associates, upper-extremity therapy software for stroke survivors.",
      },
      {
        q: "Can a VR app send results to a web dashboard?",
        a: "Yes. HELIX encrypts its results and uploads them in real time to a backend on AWS (RDS, S3, and EC2). Providers see them in a web dashboard with accounts, assigned tests, calendars, and charts that track progress over time.",
      },
      {
        q: "How do you protect patient data in a VR app?",
        a: "In HELIX, data is encrypted before upload and stored in a database management system built on HIPAA-compliant AWS services (RDS, S3, EC2), with accounts through which organizations, providers, and patients track their own or their patients' results. Tell us your data requirements at the start so the design meets them.",
      },
      {
        q: "Do you build AR apps for phones and tablets?",
        a: "Our experience covers virtual, augmented, and mixed reality, and mobile apps in Unity for iOS and Android. Our shipped headset work is VR and mixed reality, so tell us what your AR app needs to do and we will be straight about how we would approach it.",
      },
    ],
  },
  related: ["serious-games", "unity-development", "software-development", "game-development", "unity-editor-tools", "hub"],
  cta: {
    title: "Plan your VR project",
    lead: "Tell us who will wear the headset, what they need to do in it, and where the data has to go.",
  },
};

const seriousGames: ServicePageContent = {
  slug: "serious-games",
  title: "Serious games for health and education",
  description:
    "We design and build serious games and training games for health and education, with clinicians and researchers, and playable ads. See HELIX, made with Nemours.",
  h1: "Serious game development for health, education, and training",
  lead: "We design and build serious games that assess, treat, teach, and train, working with clinicians and researchers on healthcare and education projects. Our own HELIX was made with Nemours Children's Hospital. We have worked on dozens of training games and playable ads by Relevate Health Games, and on seven health and education projects by Barron Associates.",
  hero: {
    image: "games/helix/helix-pure-tone-crop.jpg",
    alt: "The pure tone test in HELIX: cartoon animals stand along a path while the game asks which ear heard the tone.",
  },
  proofLine: ["HELIX with Nemours", "Training games by Relevate Health Games", "Therapy games by Barron Associates"],
  serviceType: "Serious game development",
  what: {
    title: "What a serious game is, and what we build",
    lead: "A serious game is made mainly to assess, treat, teach, or train, rather than only to entertain.",
    items: [
      // The latest work first: HELIX, Lanebreak, then the Relevate Health Games projects.
      { title: "Assessment games", text: "HELIX turns hearing tests into VR games and reports the results to providers." },
      { title: "Fitness games", text: "Lanebreak, Peloton's gaming-inspired workout for the Peloton Bike." },
      {
        title: "Clinician training",
        text: "Discover TD for tardive dyskinesia, Expression Lab for facial anatomy, and CORE Concepts in Telehealth for telemedicine.",
      },
      { title: "Patient education", text: "Level One teaches type 1 diabetes care: insulin, carbs, and highs and lows, in short levels." },
      { title: "Playable ads", text: "Short interactive ads that people play instead of watch, in any field." },
      { title: "Classroom games", text: "Lab Rat for Legends of Learning, and NeuroSPARKS and EMPATHIE for middle school." },
      {
        title: "Rehabilitation games",
        text: "Exercise games driven by Kinect tracking, EMG sensors, and a sensor glove, like SaeboVR, KneeBRIGHT, and GRASP.",
      },
      { title: "Therapy at home", text: "Home exercise with remote monitoring, like MOVE-IT's therapy software and smart toy." },
      { title: "Vision therapy", text: "iCare tracks red-cyan glasses with a webcam to keep a steady visual challenge." },
      { title: "Biofeedback games", text: "In mTrigger Flex Sledding, patients flex their muscles to steer a sled." },
      { title: "Clinician dashboards", text: "Results, assignments, and progress over time for providers, as in HELIX." },
      { title: "Research data", text: "Data collection that lets organizations gather results for research." },
    ],
  },
  focus: [
    {
      title: "Games for assessment: HELIX",
      html: [
        `<strong>The problem.</strong> Auditory processing disorder affects how a person understands and interprets sound, even with normal hearing, and traditional hearing tests can be too boring and repetitive to assess it accurately.`,
        `<strong>What we built.</strong> ${int("/helix/", "HELIX")} (Hearing EvaLuation using Immersive eXtended reality) turns digits-in-noise, pure tone, and sound localization tests into VR games on Meta Quest 2, with calibrated audio and real-time feedback. Results are encrypted, stored on HIPAA-compliant AWS services, and followed by providers in a web dashboard. Built with audiologists and Nemours Children's Hospital, it started with DBI CAT grant funding, held successful youth group testing sessions, and completed a pilot study with about 30 subjects in 2023.`,
      ],
      image: "games/helix/helix-digits-in-noise.jpg",
      imageAlt: "The digits-in-noise test in HELIX: a player's VR controllers in front of a keypad of large numbers.",
    },
    {
      // Dozens of Relevate Health Games projects by now, playable ads among them, for patients
      // and for healthcare providers, and a telehealth game for the AHA. The site names a few
      // of them, and no drug brand.
      id: "playable-ads",
      title: "Training games and playable ads",
      html: [
        `We have worked on dozens of training and education projects by Relevate Health Games, for patients and for healthcare providers (HCPs). They include Discover TD, Level One, and Expression Lab, and the ${ext(LINKS.ahaTelehealthGame, "CORE Concepts in Telehealth Interactive Game")} for the American Heart Association, where learners practice telemedicine on five simulated patients.`,
        `<strong>Playable ads.</strong> Some of those projects are playable ads: short interactive ads that people play instead of watch. The ones we worked on teach patients and healthcare providers how a condition works and how a treatment helps. We bring that experience to playable ads in any field.`,
      ],
      image: "portfolio/discover-td-screens.jpg",
      imageAlt:
        "Three screens from Discover TD: the title screen, a choice of six virtual patients, and a seated virtual patient being examined for movement in the face, trunk, and limbs.",
    },
    {
      title: "Games for therapy, rehabilitation, and learning",
      html: [
        `We have worked on seven health and education projects by ${ext(BARRON, "Barron Associates")}: SaeboVR, GRASP, KneeBRIGHT, MOVE-IT, iCare, NeuroSPARKS, and EMPATHIE. Several were funded by NIH grants: KneeBRIGHT was supported by NIH NIAMS, MOVE-IT was funded by an NIH Phase II SBIR grant, GRASP by an NIH Fast-Track SBIR grant, and NeuroSPARKS was NIH-funded and won a 2022 Tech & Learning Award of Excellence. The Barron Associates projects we worked on helped launch FDA-approved treatments. We also worked on Flex Sledding for the mTrigger wireless EMG system and on educational games for Legends of Learning.`,
      ],
      image: "portfolio/saebovr.jpg",
      imageAlt: "SaeboVR: a seated patient raises his arm while a Kinect sensor above the screen tracks it, and the game shows a hand placing a jug of milk in a fridge.",
      pointsTitle: "How these games are played",
      points: [
        "Microsoft Kinect tracking of the shoulder and elbow (SaeboVR)",
        "A sensor glove with motion tracking (GRASP)",
        "Wireless EMG sensors (KneeBRIGHT, EMPATHIE, Flex Sledding)",
        "Arm-muscle sensors in middle school science (NeuroSPARKS)",
        "A custom smart toy with remote monitoring (MOVE-IT)",
        "A webcam and red-cyan glasses (iCare)",
      ],
    },
    {
      title: "Working with clinicians, researchers, and grant teams",
      html: [
        `Serious games are built with experts, not just for them. HELIX was designed with audiologists and Nemours, and its dashboard gives organizations, researchers, providers, and patients each their own view of the data. We have also delivered real-time systems that integrate motion capture and electromyography, helped clinicians track patient progress remotely, and given kids with physical limitations a new way to engage with therapy. ${int("/games/#experiences", "See the health and VR projects we have worked on")}, or our ${int("/services/vr-ar-development/", "VR and AR app development")} service for the headset side.`,
      ],
    },
  ],
  explore: {
    title: "Explore the games on a body map",
    lead: "Health and fitness games we have worked on, laid out by the part of the body each one works with.",
  },
  work: {
    title: "Health, fitness, and education projects",
    items: [
      // Our own HELIX, then the projects on our Anatomy of Play app, newest first (the
      // owner's rule: the latest work leads), then the rest. Twelve picture cards fill four
      // rows of three; the last three have no landscape art and are a row of text cards.
      {
        slug: "helix",
        kicker: "Our project · with Nemours",
        note: "VR hearing assessment for auditory processing disorder; pilot study with about 30 subjects in 2023.",
      },
      {
        slug: "lanebreak",
        kicker: "Peloton",
        note: "A gaming-inspired workout on the Peloton Bike and Bike+, released to All-Access Members in 2022.",
      },
      {
        slug: "discover-td",
        kicker: "Relevate Health Games",
        note: "Case-based training that teaches clinicians to tell tardive dyskinesia from other movement disorders.",
      },
      {
        slug: "level-one",
        kicker: "Relevate Health Games",
        note: "A free mobile game that teaches type 1 diabetes management in short, interactive levels.",
      },
      {
        slug: "expression-lab",
        kicker: "Relevate Health Games",
        note: "Anatomy training that links each facial expression to the muscles behind it.",
      },
      {
        slug: "neurosparks",
        kicker: "Barron Associates",
        note: "Middle school science games controlled by arm-muscle sensors; a 2022 Tech & Learning Award of Excellence.",
      },
      {
        slug: "grasp",
        kicker: "Barron Associates",
        note: "Stroke rehabilitation with a sensor glove: patients practice grip by cooking, gardening, and shopping in the game.",
      },
      {
        slug: "kneebright",
        kicker: "Barron Associates",
        note: "Game-based home therapy for knee osteoarthritis with EMG biofeedback, supported by NIH NIAMS.",
      },
      {
        slug: "move-it",
        kicker: "Barron Associates",
        note: "Telehealth therapy games and a smart toy for children with hemiplegia, funded by an NIH Phase II SBIR grant.",
      },
      {
        slug: "icare",
        kicker: "Barron Associates",
        note: "Vision therapy games for children, played with anaglyph glasses and a webcam.",
      },
      {
        slug: "saebovr",
        kicker: "Barron Associates",
        note: "Upper-extremity rehabilitation for stroke survivors, tracked with Kinect, with real-time feedback.",
      },
      {
        slug: "flexsledding",
        kicker: "mTrigger",
        note: "A biofeedback therapy game for the mTrigger wireless EMG system, on Google Play and the App Store.",
      },
      {
        slug: "core-concepts-in-telehealth",
        kicker: "American Heart Association",
        note: "An interactive game for the AHA Center for Telehealth: learners practice telemedicine on five simulated patients.",
        icon: "heartPulse",
      },
      {
        slug: "lab-rat",
        kicker: "Legends of Learning",
        note: "Classroom science and math games hosted by Ratilda, the rat scientist.",
        icon: "graduationCap",
      },
      {
        slug: "empathie",
        kicker: "Barron Associates",
        note: "A game about life with a motor disability, played with an EMG sensor; its pilot with 48 students showed significant learning gains.",
        icon: "graduationCap",
      },
    ],
    more: { label: "See every health, education, and training project", href: "/games/" },
    reviews: {
      title: "What the press said about Lanebreak",
      ids: ["home-07", "home-08", "home-09"],
    },
  },
  stack: {
    title: "Platforms, sensors, and data",
    groups: [
      { label: "Engine and platforms", items: ["Unity", "C#", "Meta Quest 2", "PC", "iOS", "Android", "Web"] },
      { label: "Sensors and inputs", items: ["Microsoft Kinect", "Wireless EMG sensors", "Sensor gloves", "Motion capture", "Webcam tracking", "Smart toys", "Calibrated audio"] },
      { label: "Data", items: ["HIPAA-compliant AWS services", "AWS RDS, S3, EC2", "Encrypted uploads", "Provider dashboards"] },
    ],
  },
  process: {
    title: "How a serious game project runs",
    lead: "The same steps, with your clinicians, teachers, or researchers in the room for each one.",
    steps: stepsWith({
      2: {
        title: "Scope it with your experts",
        text: "We agree on who the game is for, what it should measure or change, and who on your side knows the field.",
      },
      4: {
        title: "Build and test together",
        text: "Regular builds your experts try with real users, and changes made while they are still cheap.",
      },
    }),
  },
  faq: {
    title: "Questions about serious games",
    items: [
      {
        q: "What is a serious game?",
        a: "A game made mainly to teach, train, assess, or treat, rather than only to entertain. The game design is there to keep people engaged with something that matters, like a hearing test or a therapy exercise. <a href=\"/helix/\">HELIX</a>, our VR hearing assessment, is one example.",
      },
      {
        q: "Do you make playable ads?",
        a: "Yes. A playable ad is a short interactive ad that people play instead of watch. We have worked on playable ads by Relevate Health Games that teach patients and healthcare providers (HCPs) how a condition works and how a treatment helps. We bring that experience to playable ads in any field.",
      },
      {
        q: "Can video games help with physical therapy?",
        a: "Games can guide and motivate therapy exercise. We have worked on therapy software by Barron Associates: SaeboVR and GRASP for stroke survivors, KneeBRIGHT for knee osteoarthritis, and MOVE-IT for children with hemiplegia. We also worked on Flex Sledding, a biofeedback game for the mTrigger EMG system.",
      },
      {
        q: "Can you work with our clinical or research team?",
        a: "Yes, that is how this work gets done. HELIX was built with audiologists and in collaboration with Nemours Children's Hospital, and it began with funding from the DBI CAT grant program. The Barron Associates projects we worked on were research-led, and several were funded by NIH grants.",
      },
      {
        q: "Can the game track progress for clinicians or teachers?",
        a: "Yes. HELIX's web dashboard lets providers assign tests, schedule appointments, and follow results in charts over time, and lets organizations gather data for research. Our systems have also helped clinicians track patient progress remotely.",
      },
      {
        q: "Do you make educational games for schools?",
        a: "Yes. We worked on Lab Rat, classroom science and math games for Legends of Learning, and on NeuroSPARKS and EMPATHIE, middle school games by Barron Associates. EMPATHIE's pilot with 48 students showed significant learning gains.",
      },
      {
        q: "Can a serious game use motion tracking or other controllers?",
        a: "Yes. We have delivered real-time systems that integrate motion capture, electromyography, and other alternative controls. The projects we worked on use Kinect tracking, wireless EMG sensors, a sensor glove, a smart toy, and webcam tracking of anaglyph glasses.",
      },
      {
        q: "Do you build fitness games?",
        a: "Yes. We worked on Lanebreak, Peloton's gaming-inspired workout for the Peloton Bike and Bike+. We also built Reel Gains, our own workout tracker web app with plans, an exercise library, and a consistency calendar.",
      },
    ],
  },
  related: ["vr-ar-development", "software-development", "unity-development", "game-development", "unity-editor-tools", "hub"],
  cta: {
    title: "Start a serious game",
    lead: "Tell us who the game is for, what it should measure or change, and who on your side knows the field.",
  },
};

const softwareDevelopment: ServicePageContent = {
  slug: "software-development",
  title: "Custom software and web app development",
  description:
    "We build web apps, APIs, and cloud backends in Node.js, TypeScript, and NestJS, including the HELIX provider dashboard, and we modernize legacy systems.",
  h1: "Custom software and web app development",
  lead: "We build web apps, APIs, and dashboards in Node.js, TypeScript, and NestJS, with the cloud backends behind them, and move legacy systems onto modern platforms. Our work includes the HELIX provider dashboard and the open-source FinChat.",
  hero: {
    image: "portfolio/finchat.jpg",
    alt: "FinChat, our open-source chat app: a channel list on the left and a conversation with messages and an image on the right.",
    position: "top",
  },
  proofLine: ["HELIX dashboard and data system", "Node.js, TypeScript, and NestJS", "Open-source FinChat"],
  serviceType: "Custom software development",
  what: {
    title: "What we build: web apps, APIs, dashboards, and tools",
    lead: "Software built to hold up under real use: web apps, APIs, dashboards, and the cloud systems under them.",
    items: [
      { title: "Web apps", text: "Browser apps like Reel Gains, Fresh Catch, and FishWatch on tools.lunawolfstudios.com." },
      { title: "APIs and backend services", text: "High-availability APIs and services built for production scale." },
      { title: "Data pipelines", text: "Pipelines and services that process millions of records reliably under sustained load." },
      { title: "Legacy modernization", text: "Legacy rewrites, on-prem to cloud migrations, and platform version upgrades." },
      { title: "Cloud infrastructure", text: "Infrastructure as code, SQL databases, and AWS services such as RDS, S3, and EC2." },
      { title: "Dashboards", text: "Accounts, assignments, calendars, and charts, like the HELIX web dashboard." },
      { title: "Real-time 3D streaming", text: "Unity apps streamed to low-bandwidth clients with AWS and WebRTC." },
      { title: "CI/CD and deployment", text: "Containerized infrastructure and pipelines that automate builds and service deployments." },
      { title: "Self-hosted tools", text: "FinChat, an open-source chat app in TypeScript on Node.js, under the MIT license." },
    ],
  },
  focus: [
    {
      title: "Backend and cloud engineering",
      html: [
        "We have close to a decade of experience building enterprise backend systems in Node.js, TypeScript, and NestJS, on cloud infrastructure, infrastructure as code, and SQL databases, across finance, logistics, sports media, utilities, and education, on small focused teams and on initiatives spanning dozens of engineers. We have also worked in Go and Python, and built native iOS apps in Swift.",
      ],
    },
    {
      title: "Modernizing legacy systems",
      html: [
        "Much of that work has been modernization: lifting legacy systems off aging on-prem infrastructure, rewriting brittle codebases, and upgrading platforms. We have worked on systems processing millions of records daily, where an outage reaches other systems and the people who rely on them. That shaped how we build software: for the load people actually put on it, including uses it was not designed for.",
      ],
      pointsTitle: "Areas of work",
      points: [
        "Enterprise backend systems",
        "Platform modernization",
        "High-throughput data systems",
        "Cross-team collaboration",
      ],
    },
    {
      title: "Dashboards for games, devices, and health apps",
      html: [
        `Games and devices produce data someone needs to see. The ${int("/helix/", "HELIX")} web dashboard gives organizations, providers, and patients their own accounts, lets providers assign hearing tests and schedule appointments, hosts events like webinars, and charts results over time, on a data system built on HIPAA-compliant AWS services. For the Unity side of a project, see ${int("/services/unity-development/", "Unity development")}; for headset apps that feed a dashboard, see ${int("/services/vr-ar-development/", "VR and AR app development")}.`,
      ],
    },
  ],
  work: {
    title: "Web apps and systems we've shipped",
    items: [
      {
        slug: "finchat",
        kicker: "Our open-source app",
        note: "A self-hosted chat app with channels, search filters, and light and dark themes, built in TypeScript on Node.js.",
        imagePosition: "top",
      },
      {
        slug: "anatomy-of-play",
        kicker: "Our web app",
        note: "An interactive exhibition of serious games for health and fitness, organized by body region.",
      },
      {
        slug: "reel-gains",
        kicker: "Our web app",
        note: "A workout tracker with plans, an exercise library, and a calendar of past sessions.",
        imagePosition: "top",
      },
      {
        slug: "fresh-catch",
        kicker: "Our web app",
        note: "A shopping list: add items to lists, check them off as you buy them, and clear the done items.",
        imagePosition: "top",
      },
      {
        slug: "fishwatch",
        kicker: "Our web app",
        note: "A stopwatch with start, lap, and reset controls.",
        imagePosition: "top",
      },
      {
        slug: "helix",
        title: "HELIX dashboard and data system",
        kicker: "Our project",
        icon: "monitor",
        note: "A provider web dashboard and a data system on HIPAA-compliant AWS services (RDS, S3, EC2) behind a VR app.",
      },
      {
        title: "Cloud streaming for interactive 3D",
        kicker: "Our experience",
        note: "Low-latency platforms built with Unity, AWS, and WebRTC that stream fully interactive 3D simulations over low-bandwidth networks.",
        icon: "globe",
      },
      {
        title: "Enterprise backends at scale",
        kicker: "Our experience",
        note: "High-availability APIs, platform modernization, and data systems processing millions of records daily.",
        icon: "code",
      },
    ],
    more: { label: "See all our games and projects", href: "/games/" },
  },
  stack: {
    title: "Our stack",
    groups: [
      { label: "Backend", items: ["Node.js", "TypeScript", "NestJS", "Go", "Python", "SQL databases"] },
      { label: "Cloud and delivery", items: ["AWS RDS", "AWS S3", "AWS EC2", "Infrastructure as code", "Containers", "CI/CD pipelines"] },
      { label: "Real time and 3D", items: ["WebRTC", "Unity", "C#"] },
      { label: "Front end and mobile", items: ["Web apps", "JavaScript", "Swift (iOS)"] },
    ],
  },
  process: {
    title: "How a software project runs",
    lead: "New software or a move off an old system: the same five steps.",
    steps: stepsWith({
      1: {
        title: "Tell us about it",
        text: "Email or use the contact form: what the software needs to do, who uses it, what it connects to, and any old system it replaces.",
      },
      3: {
        title: "Prove the riskiest piece",
        text: "For a migration, the riskiest piece of the move is built first; for new software, the part most likely to change the plan.",
      },
      5: {
        title: "Release and support",
        text: "Release, with the old system kept running during the move where it has to, then fixes and updates.",
      },
    }),
  },
  faq: {
    title: "Questions about custom software",
    items: [
      {
        q: "Do you build software that isn't a game?",
        a: `Yes. Our web apps include ${ext(LINKS.anatomyOfPlay, "Anatomy of Play")}, Reel Gains, Fresh Catch, and FishWatch, plus the open-source FinChat. We built the HELIX web dashboard and its data system, and we have close to a decade of enterprise backend experience.`,
      },
      {
        q: "Which languages and frameworks do you use?",
        a: "For backends, Node.js, TypeScript, and NestJS first, with Go, Python, SQL databases, and cloud infrastructure as code. For real-time 3D and games, C# and Unity, with AWS and WebRTC for streaming. We have also built native iOS apps in Swift.",
      },
      {
        q: "Can you modernize or migrate an old system?",
        a: "Yes. Our work covers legacy rewrites, on-prem to cloud migrations, and platform version upgrades. We start by learning how the current system is actually used, because that is where the risk in a migration hides.",
      },
      {
        q: "Can you build a web dashboard for our app or device?",
        a: "Yes. The HELIX web dashboard gives organizations, providers, and patients their own accounts, lets providers assign tests and schedule appointments, and charts results over time, with the data stored on HIPAA-compliant AWS services.",
      },
      {
        q: "How much does custom software development cost?",
        a: "It depends on what the software has to do, how many systems it connects to, how much data it handles, and whether an old system has to keep running during the move. We quote after a first conversation, so <a href=\"/contact/\">describe your project</a> and we will follow up with questions.",
      },
    ],
  },
  related: ["unity-development", "vr-ar-development", "serious-games", "game-development", "unity-editor-tools", "hub"],
  cta: {
    title: "Describe your project",
    lead: "What the software needs to do, who uses it, and what it has to connect to. If there is an old system, tell us about that too.",
  },
};

export const SERVICE_PAGES: Record<string, ServicePageContent> = {
  "game-development": gameDevelopment,
  "unity-development": unityDevelopment,
  "unity-editor-tools": unityEditorTools,
  "vr-ar-development": vrArDevelopment,
  "serious-games": seriousGames,
  "software-development": softwareDevelopment,
};

export const servicePage = (slug: string): ServicePageContent => {
  const p = SERVICE_PAGES[slug];
  if (!p) throw new Error(`[servicePages] No service page "${slug}".`);
  return p;
};

// ─── The hub ────────────────────────────────────────────────────────────────────────────────

export const HUB = {
  title: "Game, Unity, and VR development services",
  description:
    "Hire Luna Wolf Studios to design and build games, Unity tools, VR and AR apps, serious games for health and education, and web or cloud software.",
  h1: "Game, Unity, VR, and software development services",
  lead: "We build games, Unity tools, VR and AR apps, serious games, and custom software for studios, companies, researchers, and educators. We ship our own games and tools too, so we know what it takes to finish a project.",
  /** The owner's line, used once on the hub, followed by the six services. */
  servicesLead:
    "Games, Unity tools, VR and AR apps, health software, web platforms: nothing is out of reach for us to build.",
  /** Visible link text of each hub card (describes its target). */
  cardCta: {
    "game-development": "Game development services",
    "unity-development": "Unity development services",
    "unity-editor-tools": "Unity editor tool services",
    "vr-ar-development": "VR and AR app services",
    "serious-games": "Serious game development",
    "software-development": "Software development services",
  } as Record<string, string>,
  /** Why Luna Wolf Studios: each fact tied to named evidence. */
  why: [
    {
      title: "Shipped on Steam and Nintendo Switch",
      html: `${int("/hypno-halo/", "Hypno Halo")} is on both, developed and published by us. We also publish ParaLily on Switch and The Brave Hearts II on Steam.`,
    },
    {
      title: "Nominated at the 17th Unity Awards",
      html: `${int("/scriptable-sheets/", "Scriptable Sheets")} was a nominee for Best Development Tool, and Luna Wolf Studios for Breakthrough Publisher, in 2025.`,
    },
    {
      title: "Online multiplayer for up to 32 players",
      html: `${int("/sheep-tag-2/", "Sheep Tag 2")} runs on Photon Quantum with prediction and rollback, on US, EU, and AU servers.`,
    },
    {
      title: "VR health software with a children's hospital",
      html: `${int("/helix/", "HELIX")}, our VR hearing assessment, was built in collaboration with Nemours Children's Hospital and piloted with about 30 subjects.`,
    },
    {
      title: "Building since 2015",
      html: `Founded in January 2015 in Newark, Delaware, by three Wilmington University students. ${int("/about/", "About the studio")}.`,
    },
    {
      title: "We teach game development",
      html: `Our team teaches game design at the University of Illinois Urbana-Champaign and Wilmington University, and we run a ${int("/bootcamp/", "remote internship and bootcamp")}.`,
    },
  ],
  reviews: ["home-17", "ss-karinarigby", "ss-dlberk"],
  faq: [
    {
      q: "What does Luna Wolf Studios build for clients?",
      a: "Six things: games, like our 32-player <a href=\"/sheep-tag-2/\">Sheep Tag 2</a>; Unity engineering, from gameplay to CI/CD and cloud streaming; custom Unity editor tools, like <a href=\"/scriptable-sheets/\">Scriptable Sheets</a>; VR and AR apps, like <a href=\"/helix/\">HELIX</a>; serious games for health and education, like HELIX and the Barron Associates therapy games we worked on; and web apps and backends, like the HELIX dashboard.",
    },
    {
      q: "How much does a project cost?",
      a: "It depends on scope, platforms, and how much the project has to do, so we do not publish a price list. We quote each project after a first conversation. <a href=\"/contact/\">Tell us what you are building</a>, your timeline, and a budget range if you have one, and we will come back with questions and a plan.",
    },
    {
      q: "Do you work with small teams and first-time clients?",
      a: "Yes. We published The Brave Hearts II: False Skies for Connor Butler, an independent developer who came through our internship program, and our <a href=\"/publishing/\">publishing</a> door is open to indie developers with a demo, an early build, or a finished game. If your project is small or your first, tell us about it.",
    },
    {
      q: "Can you join a project that is already in progress?",
      a: "Yes, especially Unity projects, as co-development. We worked on Lanebreak, Peloton's gaming-inspired workout, and on Warcodes by Emergent Worlds and Cell to Singularity by Computer Lunch.",
    },
    {
      q: "Which engines do you work in?",
      a: `${ENGINES} Tell us what your project uses.`,
    },
    {
      q: "Where are you based, and do you work remotely?",
      a: "We are based in Newark, Delaware, USA, and work with clients remotely, wherever they are. Start with an email to <a href=\"mailto:support@lunawolfstudios.com\">support@lunawolfstudios.com</a> or the <a href=\"/contact/\">contact form</a>.",
    },
  ],
} as const;
