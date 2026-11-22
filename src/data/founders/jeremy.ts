/**
 * Jeremy Bregermann's founder page (/about-jeremy/). Source: archive/wordpress/pages/about-jeremy.md,
 * which he rewrote on 21 November 2026. The structure is his; the prose is tightened to the copy
 * rules with every fact kept, in the first person.
 *
 * The project lists are FOUNDER_PORTFOLIO.jeremy in src/data/team.ts, and the teaching and
 * industry roles are FOUNDER_FACTS.jeremy; this file adds only the text those do not carry (the
 * descriptions under each heading on his page). His contract roles are his own work "in
 * addition to my work at Luna Wolf Studios": they are never presented as studio clients.
 *
 * "Over 11 years" / "11+ years" is as of November 2026 (his page was rewritten 21 November
 * 2026); revisit it yearly.
 */
import { LINKS } from "../links";
import type { ExtraLink, FounderPageData } from "../../components/about/types";

const DRIVE_BUILDS = "https://drive.google.com/drive/folders/1U2ih1TnhNApZzJpA7O5A4NXsDxNGV8lw?usp=sharing";

export const JEREMY_PAGE: FounderPageData = {
  slug: "jeremy",
  title: "Jeremy Bregermann, lead game designer",
  description:
    "Jeremy Bregermann is co-founder and lead game designer at Luna Wolf Studios, a Unity and Unreal developer, and a university game design professor.",
  h1: "Jeremy Bregermann, co-founder and lead game designer",
  jobTitle: "Co-founder and Lead Game Designer",
  tagline: "Game Developer • Unity & Unreal Engineer • University Professor • AI-Assisted Development Specialist",
  summary:
    "Game designer, software developer, and university professor with over 11 years of professional game development experience.",
  highlights: [
    { icon: "calendar", value: "11+ years", label: "Professional game development" },
    { icon: "cube", value: "Unity and Unreal", label: "C#, Unreal Engine 5, and C++" },
    { icon: "graduationCap", value: "University professor", label: "Game design and curriculum development" },
    { icon: "code", value: "AI-assisted development", label: "Human-directed, with ChatGPT and Codex" },
  ],
  bio: [
    {
      title: "About Jeremy",
      paragraphs: [
        "I'm a game designer, software developer, educator, and co-founder of Luna Wolf Studios, LLC. I have worked on commercial games, independent projects, interactive simulations, virtual and augmented reality, educational software, mobile apps, and emerging technologies.",
        "My work covers the whole game development lifecycle: concept and gameplay design, programming, prototyping, debugging, quality assurance, optimization, publishing, and post-release support.",
        'At Luna Wolf Studios I have helped develop, fund, and publish <a href="/helix/">HELIX</a>, a gamified virtual reality hearing assessment developed in collaboration with Nemours Children\'s Hospital; <a href="/sheep-tag-2/">Sheep Tag 2</a>, a Kickstarter-funded 3D online multiplayer real-time strategy game; and <a href="/the-brave-hearts-ii-false-skies/">The Brave Hearts II: False Skies</a>, released on Steam in August 2026.',
        'I have also contributed to educational games for Legends of Learning, rehabilitation software including Flex Sledding for mTrigger, and independent games such as <a href="/haberdashery/">Haberdashery</a>. Beyond games, I have made interactive training applications, mobile software, websites, videos, digital marketing campaigns, and custom software for clients.',
      ],
    },
    {
      title: "Engines and specialties",
      paragraphs: [
        "My main expertise is <strong>Unity and C#</strong>, alongside Unreal Engine 5, C++, Python, JavaScript, and a wide range of development tools. I specialize in:",
      ],
      chips: [
        "Gameplay systems",
        "Physics",
        "AI behaviors",
        "User interfaces",
        "Game controllers",
        "Scene management",
        "Networking",
        "Multiplayer",
        "Game saves",
        "Procedural content",
        "Third-party integrations",
      ],
    },
    {
      title: "Human-directed AI development",
      paragraphs: [
        "I was making games long before generative AI became part of software development, and that traditional programming foundation still shapes how I design, evaluate, and deliver software. Today I also use AI development assistants, including <strong>OpenAI ChatGPT and Codex</strong>, in production, so my work combines traditional engineering with the speed of AI-assisted production.",
        "AI coding agents speed up implementation, refactoring, debugging, automated testing, documentation, and prototyping. I set the creative vision, technical requirements, architecture, constraints, and acceptance criteria, then oversee the implementation and evaluate the results.",
        "More of my work now centers on directing AI well: building reproducible technical challenges, finding failures, testing complex gameplay interactions, and verifying that each solution meets its requirements.",
      ],
    },
  ],
  knowsAbout: [
    "Game design",
    "Unity",
    "C#",
    "Unreal Engine 5",
    "C++",
    "Virtual reality",
    "AI-assisted software development",
    "Game design education",
  ],
  services: [
    { label: "Game development", href: "/services/game-development/" },
    { label: "Unity development", href: "/services/unity-development/" },
    { label: "Unity editor tools", href: "/services/unity-editor-tools/" },
    { label: "VR and AR development", href: "/services/vr-ar-development/" },
    { label: "Serious games", href: "/services/serious-games/" },
    { label: "Internships and bootcamp", href: "/bootcamp/" },
  ],
  /** "Jeremy Bregermann - Demo Reel Abridged" (videos.ts OTHER_VIDEOS). */
  reelId: "Fhu4tQ1Np-w",
  moreNote:
    "…and many more: my itch.io page and the public development builds below hold further games, prototypes, and experiments.",
};

/** "Current Projects & Recent Releases": the text under each heading on his page. */
export const JEREMY_CURRENT: Record<
  string,
  { status: string; paragraphs: string[]; tech?: string; linkLabel?: string; link?: string }
> = {
  "rowan-of-bramblebrook": {
    status: "Playable prototype, in development",
    paragraphs: [
      "A PS1-inspired 3D fantasy adventure that combines platforming, exploration, combat, village life, relationships, romance, shopkeeping, and RPG systems. It began as a seven-day challenge for the Official Unity Game Jam 2026 and has grown into a larger game.",
      "I am its sole human developer (design, creative direction, world building, asset integration, production, testing, and technical oversight), with extensive help from ChatGPT and Codex. The downloadable Windows prototype has a connected world, NPCs, an economy, weather, combat, cinematics, and a multi-phase dragon boss.",
    ],
    tech: "Unity 6, C#, URP, AI-assisted development, gameplay systems, automated testing",
    linkLabel: "Play on itch.io",
  },
  "interstate-hauler": {
    status: "Trucking simulator, in development",
    paragraphs: [
      "A large trucking and life simulation about driving, exploration, and life on the road: vehicle physics and interactions, realistic driving controls, AI traffic, highways, navigation, weather, dialogue and characters, saves, and interactive locations. It plays controller-first, supports steering-wheel peripherals, and has a growing connected world.",
    ],
    tech: "Unity 6, C#, vehicle physics, AI, GPS and navigation, environment systems, third-party SDK integration",
  },
  "truck-sports-party": {
    status: "In development",
    paragraphs: [
      "A chaotic, physics-driven party game of unconventional sports played with trucks, with local split-screen multiplayer, AI opponents, scoring, player profiles, and full gamepad support. My work: reusable gameplay architecture, modular sporting events, multiplayer interactions, input systems, and a streamlined player experience.",
    ],
    tech: "Unity, C#, physics simulation, multiplayer architecture, AI, controller systems",
  },
  "the-brave-hearts-ii-false-skies": {
    status: "Published on Steam, 2026",
    paragraphs: [
      "A fully voice-acted, story-driven, top-down arcade shoot 'em up developed by Connor Butler and published by Luna Wolf Studios. Released August 27, 2026.",
      "My contributions: Steam publishing and platform integration, Windows build verification, Steam achievements, Steam Cloud configuration, controller usability, and release quality assurance.",
    ],
    linkLabel: "View on Steam",
    link: "https://store.steampowered.com/app/4918650/",
  },
  haberdashery: {
    status: "Modernization in development",
    paragraphs: [
      "An award-nominated arcade endless runner: a sheep collects hats while navigating a rotating world full of hazards.",
      "Originally developed by Luna Wolf Studios, Haberdashery is being revisited with modern Unity technology: updated rendering, modernized code, better compatibility, and gameplay refinements.",
    ],
    linkLabel: "Play on itch.io",
  },
  "universal-ps1-game-asset-importer": {
    status: "Technical R&D",
    paragraphs: [
      "Ongoing Unity Editor tooling that imports PlayStation-era game assets into modern engines: modular import pipelines, game-specific adapters, geometry reconstruction, textures, collision data, scene generation, and diagnostics. Related research rebuilds legacy levels as interactive Unity scenes, with debugging and visualization tools.",
      "It is research and tooling, not a commercial release of third-party game content.",
    ],
  },
  "dead-air": {
    status: "Game jam prototype, 2026",
    paragraphs: [
      "A short atmospheric trucking horror game for Brackeys Game Jam 2026.2: on a lonely night highway, radio transmissions and unsettling events turn a routine delivery into psychological horror, through narrative events, vehicle interactions, audio-driven storytelling, environmental triggers, and branching outcomes.",
    ],
    linkLabel: "View on itch.io",
  },
};

/** "Professional Software Development Experience": his description of each role, keyed by slug. */
export const JEREMY_EXPERIENCE_INTRO =
  "In addition to my work at Luna Wolf Studios, I have held contract engineering, design, simulation, and development roles.";

export const JEREMY_EXPERIENCE: Record<string, { company: string; role: string; year: string; text: string; logo?: string }> = {
  "syneos-health-unity-software": {
    company: "Syneos Health",
    role: "Unity Developer",
    year: "2025",
    text: "Developed Unity software for healthcare and pharmaceutical applications, including Apple Vision Pro Shader Graph materials, Figma-based interfaces, and localization for Chinese-language users.",
  },
  warcodes: {
    company: "Emergent Worlds",
    role: "Unity Developer",
    year: "2025",
    text: "Developed achievement systems, progression logic, reusable C# data structures, and user interfaces for Warcodes, a mobile game.",
  },
  "smu-mixed-reality-software": {
    company: "Southern Methodist University",
    role: "Unity Developer",
    year: "2024",
    text: "Worked on interactive mixed-reality software that integrates Stereolabs ZED depth cameras with Meta Quest 2 hardware.",
    logo: "partners/southern-methodist-university.jpg",
  },
  "asurion-vr-soft-skills-training": {
    company: "Asurion",
    role: "VR Developer & Simulation Designer",
    year: "2021",
    text: "Designed and developed a virtual reality soft-skills training experience for Meta Quest 2, with 360-degree video, composited actors, backend activity tracking, and analytics.",
  },
  realize: {
    company: "Realize Design",
    role: "Unity Developer",
    year: "2020",
    text: "Developed Unity UI systems, backend integrations, HTTP and JSON-driven features, and cross-platform app features, including troubleshooting and testing on iOS and Android.",
  },
};

/** "University Teaching & Curriculum Development". Schools and years are FOUNDER_FACTS.jeremy. */
export const JEREMY_TEACHING_INTRO =
  "Alongside game development, I'm a university professor and curriculum developer in game design, programming, interactive technology, and production.";

export const JEREMY_TEACHING: Record<string, { text: string; logo?: string }> = {
  "University of Illinois Urbana-Champaign": {
    text: "Teach game development, interactive media, game industry studies, Unreal Engine, production processes, and systems design, and develop graduate-level course materials and applied technical learning.",
    logo: "partners/university-of-illinois.jpg",
  },
  "Wilmington University": {
    text: "Teach Unity, C#, Unreal Engine, game design, 3D development, and advanced game production, and mentor students through prototypes, gameplay implementation, debugging, technical design, and capstone projects.",
    logo: "partners/wilmington-university.jpg",
  },
  "West Virginia University": {
    text: "Teach graduate-level game development and production: prototyping, game systems, design documentation, iterative development, and capstone evaluation.",
  },
};

export const JEREMY_PREVIOUS_TEACHING_LOGOS: Record<string, string> = {
  "Delaware College of Art and Design": "partners/delaware-college-of-art-and-design.jpg",
  "Digital Media Institute": "partners/digital-media-institute.jpg",
};

export const JEREMY_PREVIOUS_TEACHING_NOTE =
  "Across these appointments I have designed technical curricula, taught practical game development, evaluated student projects, written assignments and assessment criteria, and mentored new game developers.";

export const JEREMY_INDUSTRY_INTRO =
  "My experience also covers product management, community development, marketing, animation, and interactive entertainment.";

export const JEREMY_INDUSTRY_LOGOS: Record<string, string> = {
  "Damocles Thread Development": "partners/damocles-thread-development.jpg",
};

export const JEREMY_INDUSTRY_NOTE =
  "I have also taken part in gaming conventions as a panelist, exhibiting games and discussing game development, design, and the industry.";

/** "Play My Games & Explore Development Builds", in his order. */
export const JEREMY_PLAY_LINKS: Array<{ label: string; url: string; icon: string; text: string; note?: string }> = [
  {
    label: "Luna Wolf Studios on itch.io",
    url: LINKS.itch,
    icon: "itch",
    text: "Independent games, prototypes, game jam entries, and projects developed or produced by Luna Wolf Studios.",
  },
  {
    label: "Jeremy Bregermann on itch.io",
    url: LINKS.jeremyItch,
    icon: "itch",
    text: "Personal projects, including Rowan of Bramblebrook, Dead Air, and other experimental game development work.",
  },
  {
    label: "Public game development builds (Google Drive)",
    url: DRIVE_BUILDS,
    icon: "download",
    text: "A shared archive of selected playable builds of current and experimental projects.",
    note: "These may be prototypes, works in progress, or technical demonstrations. Features and stability vary as development continues.",
  },
  {
    label: "GitHub: source code and technical projects",
    url: "https://github.com/bregermann",
    icon: "github",
    text: "Public repositories showing game development, C#, Unity, software engineering, and experimental applications.",
  },
];

/** Contact block, in his order. Email addresses are written in lower case, as the site writes them. */
export const JEREMY_CONTACT_INTRO =
  "I'm always glad to talk about game development, software engineering, interactive experiences, AI-assisted production, educational technology, and new professional opportunities.";

export const JEREMY_CONTACT: Array<{ label: string; text: string; href: string; icon: string }> = [
  { label: "Email", text: "jeremy@lunawolfstudios.com", href: "mailto:jeremy@lunawolfstudios.com", icon: "mail" },
  { label: "LinkedIn", text: "linkedin.com/in/bregermann", href: "https://linkedin.com/in/bregermann", icon: "linkedin" },
  { label: "GitHub", text: "github.com/bregermann", href: "https://github.com/bregermann", icon: "github" },
  { label: "Studio", text: "Luna Wolf Studios", href: "/", icon: "home" },
  { label: "Studio itch.io", text: "lunawolfstudios.itch.io", href: LINKS.itch, icon: "itch" },
  { label: "Personal itch.io", text: "bregermann.itch.io", href: LINKS.jeremyItch, icon: "itch" },
  { label: "Public development builds", text: "Google Drive portfolio", href: DRIVE_BUILDS, icon: "download" },
];

/**
 * Links his page gives that differ from the project's own first link in games.ts. FlexSledding
 * pointed at the mTrigger home page (it has no game page); the store links come from games.ts.
 * Genfanad pointed at genfanad.com, which forwards to Steam.
 * Realize (realize.design is dead) and Preston & Steve Campout for Hunger (a login-walled
 * Facebook video) have no working link, as games.ts records.
 */
export const JEREMY_EXTRA_LINKS: Record<string, ExtraLink[]> = {
  flexsledding: [{ label: "mTrigger", url: "https://www.mtrigger.com/", icon: "globe" }],
  // His page links genfanad.com, which now forwards to the Steam page games.ts links.
  genfanad: [{ label: "genfanad.com", url: "https://genfanad.com/", icon: "globe" }],
};

/**
 * Card lines that read differently on his own page. games.ts says the Preston & Steve project
 * is "listed on Jeremy's portfolio", which is this page; here it is just the project.
 */
export const JEREMY_CARD_LINES: Record<string, string> = {
  "preston-and-steve-campout-for-hunger": "A Wilmington University project.",
};
