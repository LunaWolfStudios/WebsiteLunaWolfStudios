/**
 * The three co-founders, named exactly as the old site names them (CLAUDE.md): Jeff and Olivia
 * by first name only, Jeremy Bregermann in full. Facts and links come from
 * archive/wordpress/pages/about-jeff.md, about-jeremy.md and about-olivia.md.
 *
 * FOUNDER_PORTFOLIO reproduces the project lists on the old founder pages, with the credit
 * line each page prints ("by Peloton"), plus four projects from the owner's Anatomy of Play
 * app (GRASP, Expression Lab, Level One, Discover TD). Jeremy's keeps his page's order; Jeff's
 * is in the owner's order, latest work first (November 2026). games.ts derives every entry's
 * `listedBy` from it, so the two never disagree.
 */
import type { Founder, FounderSlug } from "./types";

export const FOUNDERS: Founder[] = [
  {
    slug: "jeff",
    name: "Jeff",
    role: "Co-founder",
    page: "/about-jeff/",
    photo: "team/jeff.png",
    // He is at the right edge of the photo, holding the dog: zoom in until his face fills
    // the circle, as the other two headshots do.
    photoFocus: { x: 0.825, y: 0.47, zoom: 1.7 },
    blurb:
      "Jeff has spent over a decade building games, tools, and platforms in Unity and XR, from multiplayer strategy games to educational experiences and medical simulations. The work spans therapy games driven by motion capture and electromyography, cloud streaming with AWS and WebRTC, and CI/CD pipelines that automate Unity builds.",
    email: "jeff@lunawolfstudios.com",
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/jeff-f-567473ab/", icon: "linkedin" },
      { label: "GitHub", url: "https://github.com/jfisher993", icon: "github" },
    ],
  },
  {
    slug: "jeremy",
    name: "Jeremy Bregermann",
    role: "Co-founder and lead game designer",
    page: "/about-jeremy/",
    photo: "team/jeremy.jpg",
    photoFocus: { x: 0.47, y: 0.43 },
    blurb:
      "Jeremy is a game designer, software developer, and university professor with over 11 years of professional game development experience, working mainly in Unity and C#. At Luna Wolf Studios, Jeremy has helped develop, fund, and publish HELIX, Sheep Tag 2, and The Brave Hearts II: False Skies.",
    email: "jeremy@lunawolfstudios.com",
    links: [
      { label: "LinkedIn", url: "https://linkedin.com/in/bregermann", icon: "linkedin" },
      { label: "GitHub", url: "https://github.com/bregermann", icon: "github" },
      { label: "itch.io", url: "https://bregermann.itch.io/", icon: "itch" },
      {
        label: "Public development builds (Google Drive)",
        url: "https://drive.google.com/drive/folders/1U2ih1TnhNApZzJpA7O5A4NXsDxNGV8lw?usp=sharing",
        icon: "download",
      },
    ],
  },
  {
    slug: "olivia",
    name: "Olivia",
    role: "Co-founder",
    page: "/about-olivia/",
    photo: "team/olivia.jpg",
    photoFocus: { x: 0.57, y: 0.45, zoom: 1.1 },
    blurb:
      "Olivia has close to a decade of experience building enterprise backend systems in Node.js, TypeScript, and NestJS, across finance, logistics, sports media, utilities, and education. Olivia's work centers on modernization: legacy rewrites, on-prem to cloud migrations, and systems that process millions of records daily.",
    links: [],
  },
];

export const founder = (slug: FounderSlug): Founder => FOUNDERS.find((f) => f.slug === slug)!;

/**
 * One line on a founder page's project list. `slug` points into GAMES or PROJECTS (games.ts);
 * `credit` is the text after the title on the old page ("by Barron Associates", "Rose Tinted
 * Games"); `url` overrides the project's own first link where the founder page linked
 * somewhere else. A line with `label` and no slug is a plain link or text the page carried.
 */
export interface PortfolioItem {
  slug?: string;
  label?: string;
  credit?: string;
  url?: string;
}

export interface PortfolioGroup {
  heading: string;
  items: PortfolioItem[];
}

export const FOUNDER_PORTFOLIO: Record<FounderSlug, PortfolioGroup[]> = {
  // about-jeff.md, "My Portfolio", in the owner's order (November 2026), not the old page's:
  // the latest work first (Sheep Tag 2, Scriptable Sheets, Hypno Halo, ParaLily), then the
  // projects on his Anatomy of Play app, then everything else newest first, game jams last.
  // Every line the old page had is still here; the credit lines are the old page's. Each
  // project is listed once. The old page closes with "…and many many more."
  jeff: [
    {
      heading: "Latest work",
      items: [
        { slug: "sheep-tag-2", credit: "by Luna Wolf Studios" },
        { slug: "scriptable-sheets", label: "Scriptable Sheets for Unity", credit: "by Luna Wolf Studios" },
        { slug: "hypno-halo", credit: "by Luna Wolf Studios" },
        { slug: "paralily", credit: "by Luna Wolf Studios" },
      ],
    },
    {
      // The ten projects on Anatomy of Play, in the owner's order. GRASP, Expression Lab,
      // Level One and Discover TD were added from the app (November 2026); the old page did
      // not list them.
      heading: "Health, fitness, and education games",
      items: [
        { slug: "helix", credit: "by Luna Wolf Studios" },
        { slug: "lanebreak", credit: "by Peloton" },
        { slug: "level-one", credit: "by Relevate Health Games" },
        { slug: "discover-td", credit: "by Relevate Health Games" },
        { slug: "expression-lab", credit: "by Relevate Health Games" },
        { slug: "neurosparks", credit: "by Barron Associates" },
        { slug: "grasp", credit: "by Barron Associates" },
        { slug: "kneebright", credit: "by Barron Associates" },
        { slug: "move-it", credit: "by Barron Associates" },
        { slug: "icare", credit: "by Barron Associates" },
      ],
    },
    {
      heading: "More health and education games",
      items: [
        { slug: "core-concepts-in-telehealth", credit: "for the American Heart Association" },
        {
          slug: "saebovr",
          credit: "by Barron Associates",
          url: "https://www.barron-associates.com/about/projects/saebovr-upper-extremity-therapy-software/",
        },
        { slug: "empathie", credit: "by Barron Associates" },
        { slug: "lab-rat", credit: "by Legends of Learning" },
      ],
    },
    {
      heading: "More games",
      items: [
        { slug: "travelers-refrain", credit: "by Red Essence Games" },
        { slug: "cell-to-singularity", credit: "by Computer Lunch" },
        { slug: "save-samia", credit: "by LaToya Forever" },
        { slug: "haberdashery", credit: "by Luna Wolf Studios" },
        { slug: "target-crack", credit: "by Luna Wolf Studios" },
        { slug: "madlads-tic-tac-toe", credit: "by Luna Wolf Studios" },
      ],
    },
    {
      heading: "Web apps",
      items: [
        { slug: "anatomy-of-play", credit: "Serious Games for Health and Fitness." },
        { slug: "fishwatch", credit: "Every second makes a ripple." },
        { slug: "reel-gains", credit: "Track every rep. Catch every gain." },
        { slug: "finchat", credit: "No nets. No traps. Just chat." },
        { slug: "fresh-catch", credit: "Fresh List. Fresh Catch." },
        { slug: "lifequest", credit: "The Next Level." },
      ],
    },
    {
      // Newest first; the ScriptableObject tutorial has no date of its own and goes last.
      heading: "Tutorials and assets",
      items: [
        { slug: "unity-cheat-sheet-and-quick-reference-2018" },
        { slug: "setup-a-bug-reporter-in-unity-using-trello" },
        { slug: "audio-tutorial-for-unity-the-audio-mixer" },
        { slug: "how-to-make-a-match-3-game-in-unity" },
        { slug: "how-to-create-a-tower-defense-game-in-unity" },
        { slug: "scriptableobject-tutorial-getting-started" },
      ],
    },
    {
      // Newest first; the two jams with no date in games.ts go last.
      heading: "Game jams",
      items: [
        { slug: "lightning-luther", credit: "by Luna Wolf Studios" },
        { slug: "plan-c", credit: "by Luna Wolf Studios" },
        { slug: "turbo-hobo-cannon", credit: "by Luna Wolf Studios" },
        { slug: "fungeon-crawler", credit: "by Luna Wolf Studios" },
        { slug: "ok-ko-under-siege", credit: "by Cartoon Network" },
        { slug: "a-world-apart", credit: "by Luna Wolf Studios" },
      ],
    },
  ],

  // about-jeremy.md. "Current projects" and "Professional experience" are the page's own
  // sections; the rest is its "My Portfolio" list. The page closes with "…and many more."
  jeremy: [
    {
      heading: "Current projects and recent releases",
      items: [
        { slug: "rowan-of-bramblebrook", credit: "Playable prototype, in development" },
        { slug: "interstate-hauler", credit: "In development" },
        { slug: "truck-sports-party", credit: "In development" },
        { slug: "the-brave-hearts-ii-false-skies", credit: "Published on Steam, 2026" },
        { slug: "haberdashery", credit: "Modernization in development" },
        { slug: "universal-ps1-game-asset-importer", credit: "Technical R&D" },
        { slug: "dead-air", credit: "Game jam prototype, 2026" },
      ],
    },
    {
      heading: "Professional software development experience",
      items: [
        { slug: "syneos-health-unity-software", credit: "Syneos Health, Unity Developer (2025)" },
        { slug: "warcodes", credit: "Emergent Worlds, Unity Developer (2025)" },
        { slug: "smu-mixed-reality-software", credit: "Southern Methodist University, Unity Developer (2024)" },
        { slug: "asurion-vr-soft-skills-training", credit: "Asurion, VR Developer & Simulation Designer (2021)" },
        { slug: "realize", credit: "Realize Design, Unity Developer (2020)" },
      ],
    },
    {
      heading: "Health and VR games",
      items: [
        { slug: "helix", credit: "Luna Wolf Studios" },
        { slug: "flexsledding", label: "Flex Sledding", credit: "mTrigger" },
        { slug: "preston-and-steve-campout-for-hunger", credit: "Wilmington University" },
      ],
    },
    {
      heading: "Educational games",
      items: [
        { slug: "lab-rat", credit: "Legends of Learning" },
        { slug: "eternia-the-quest", credit: "Luna Wolf Studios" },
      ],
    },
    {
      heading: "Indie games",
      items: [
        { slug: "the-brave-hearts-ii-false-skies", credit: "Developed by Connor Butler; published by Luna Wolf Studios" },
        { slug: "rowan-of-bramblebrook", credit: "Jeremy Bregermann / Luna Wolf Studios" },
        { slug: "genfanad", credit: "Rose Tinted Games" },
        { slug: "sheep-tag-2", credit: "Luna Wolf Studios" },
        { slug: "robo-puzzle-smash", credit: "Pxlplz" },
        { slug: "save-samia", credit: "LaToya Forever" },
        { slug: "haberdashery", credit: "Luna Wolf Studios" },
        { slug: "fruit-slinger", credit: "Exalt Games" },
      ],
    },
    {
      heading: "Additional studio games and prototypes",
      items: [
        { slug: "on-the-rocks", credit: "3D cashier simulation; Summer 2026 internship project" },
        { slug: "railbound", credit: "2D roguelike action game; Spring 2026 internship project" },
        { slug: "coppervalle-rush", credit: "Minecart platformer; Summer 2025 internship project" },
        {
          label: "Luna Wolf Studios Game Collection",
          url: "https://lunawolfstudios.itch.io/",
          credit: "Additional independent games and prototypes",
        },
      ],
    },
    {
      heading: "Game jams",
      items: [
        { slug: "ok-ko-under-siege", credit: "Cartoon Network" },
        { slug: "rowan-of-bramblebrook", credit: "Official Unity Game Jam 2026" },
        { slug: "dead-air", credit: "Brackeys Game Jam 2026.2" },
        { slug: "turbo-hobo-cannon", credit: "Luna Wolf Studios" },
        { slug: "fungeon-crawler", credit: "Luna Wolf Studios" },
        { label: "More personal game jam entries", url: "https://bregermann.itch.io/", credit: "Jeremy Bregermann" },
      ],
    },
    {
      heading: "Apps and interactive software",
      items: [
        { slug: "realize", credit: "Realize Design" },
        { label: "Healthcare, pharmaceutical, XR, and simulation software developed through professional contract engagements" },
      ],
    },
    {
      heading: "Tabletop and live action games",
      items: [
        { slug: "witch-hunter-the-invisible-world", credit: "Alligator Alley Entertainment" },
        { slug: "the-underground-a-sam-and-fuzzy-rpg", credit: "Damocles Thread Development" },
        { slug: "tempters-an-infernally-clever-board-game", credit: "Damocles Thread Development" },
      ],
    },
    {
      heading: "Acting: background character",
      items: [
        { slug: "hustle", credit: "Adam Sandler, Netflix" },
        { slug: "mare-of-easttown", credit: "Kate Winslet, HBO" },
      ],
    },
  ],

  // about-olivia.md lists no projects; its "Areas of Work" are in FOUNDER_FACTS below.
  olivia: [],
};

/**
 * The rest of what the founder pages list, word for word: teaching, other industry roles,
 * awards, and Olivia's areas of work. Jeremy's contract roles are his own work "in addition
 * to my work at Luna Wolf Studios" (about-jeremy.md), so present them as a founder's
 * experience, not as studio clients.
 */
export const FOUNDER_FACTS = {
  jeff: {
    /** about-jeff.md opening lines, condensed into the blurb above. */
    yearsOfExperience: "over a decade",
  },
  jeremy: {
    tagline: "Game Developer • Unity & Unreal Engineer • University Professor • AI-Assisted Development Specialist",
    yearsOfExperience: "over 11 years of professional game development experience",
    engines: "Unity and C#, alongside Unreal Engine 5, C++, Python, and JavaScript",
    teaching: [
      { school: "University of Illinois Urbana-Champaign", role: "Game Design Professor / Curriculum Developer", years: "2024–Present" },
      { school: "Wilmington University", role: "Game Design Professor", years: "2024–Present" },
      { school: "West Virginia University", role: "Graduate Instructor", years: "2026–Present" },
    ],
    previousTeaching: [
      { school: "Salem Community College", years: "2019–2022" },
      { school: "Delaware College of Art and Design", years: "2020" },
      { school: "Digital Media Institute", years: "2023" },
    ],
    industry: [
      { company: "Rose Tinted Games", role: "Marketing Consultant", detail: "Social media marketing, influencer outreach, paid advertising, public relations, email campaigns, marketing automation, and content creation." },
      { company: "CSC", role: "Product Management Intern", detail: "Product management and related business and development workflows." },
      { company: "Robo Puzzle Smash", role: "PR & Community Consultant", detail: "Public relations, community engagement, and promotional support." },
      { company: "Bamn Studios", role: "3D Animator", detail: "3D animation and digital content production." },
      { company: "Damocles Thread Development", role: "Social Media Director", detail: "Community management and social media promotion." },
    ],
  },
  olivia: {
    yearsOfExperience: "close to a decade",
    stack: "Node.js, TypeScript, and NestJS, with cloud infrastructure, infrastructure as code, and SQL databases; also Go and Python, and native iOS in Swift earlier on",
    areasOfWork: [
      { title: "Enterprise Backend Systems", detail: "High-availability APIs and services built for production scale across multiple industry verticals" },
      { title: "Platform Modernization", detail: "Legacy rewrites, on-prem to cloud migrations, and platform version upgrades" },
      { title: "High-Throughput Data Systems", detail: "Pipelines and services designed to process millions of records reliably under sustained load" },
      { title: "Cross-Team Collaboration", detail: "Delivered projects as part of large multi-team engineering organizations" },
    ],
  },
} as const;

/** Founders whose old page lists `slug`, in FOUNDERS order. */
export function foundersListing(slug: string): FounderSlug[] {
  return (Object.keys(FOUNDER_PORTFOLIO) as FounderSlug[]).filter((f) =>
    FOUNDER_PORTFOLIO[f].some((g) => g.items.some((i) => i.slug === slug)),
  );
}
