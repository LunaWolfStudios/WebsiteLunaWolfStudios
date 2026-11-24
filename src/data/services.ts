/**
 * The six services, in menu order (nav.ts), and the two adjacent offers. Wording and keywords
 * follow archive/research/seo-plan.md; bullets are capabilities the founder pages state
 * (archive/wordpress/pages/about-jeff.md, about-jeremy.md, about-olivia.md) or the projects in
 * games.ts show. `proof` lists slugs from GAMES or PROJECTS.
 *
 * The studio's body of work includes what its founders worked on, so the copy says "we",
 * treats work for another company as client work ("for Barron Associates"), and puts no
 * founder's name on a project as a label. Olivia's employers are never named.
 */
import type { Service } from "./types";

export const SERVICES: Service[] = [
  {
    slug: "game-development",
    title: "Game development",
    short: "PC, console, and online multiplayer games",
    summary:
      "We design, build, and ship games for PC, Nintendo Switch, and online multiplayer, from first prototype to release and updates after launch. We work in Unity, Unreal, Godot, and more.",
    icon: "gamepad",
    bullets: [
      "Online multiplayer for up to 32 players on Photon Quantum, with bots and US, EU, and AU servers",
      "Gameplay systems, AI behaviors, interfaces, controller support, saves, and procedural content in Unity and C#",
      "Releases on Steam and Nintendo Switch, like Hypno Halo on both",
      "Quality assurance, optimization, and support after release",
    ],
    proof: ["sheep-tag-2", "hypno-halo", "paralily", "the-brave-hearts-ii-false-skies", "haberdashery"],
    page: "/services/game-development/",
    keywords: [
      "game development company",
      "game co-development studio",
      "indie game development studio for hire",
      "multiplayer game development",
      "Steam release support",
      "hire game developers",
    ],
  },
  {
    slug: "unity-development",
    title: "Unity development",
    short: "Unity engineering for games and apps",
    summary:
      "We build Unity games and apps for desktop, mobile, VR, and the web, and handle the builds, servers, and updates around them. We have worked in Unity for more than a decade.",
    icon: "cube",
    bullets: [
      "Gameplay, physics, networking, multiplayer, and user interfaces in Unity and C#",
      "Containerized infrastructure and CI/CD pipelines that automate Unity builds",
      "Interactive 3D simulations streamed over low-bandwidth networks with AWS and WebRTC",
      "Debugging, optimization, and modernizing older Unity projects",
    ],
    proof: ["sheep-tag-2", "hypno-halo", "helix", "haberdashery"],
    page: "/services/unity-development/",
    keywords: [
      "Unity development company",
      "hire Unity developers",
      "Unity developers for hire",
      "Unity game developer for hire",
      "Unity multiplayer development",
      "Unity CI/CD pipeline",
      "Unity WebRTC streaming",
    ],
  },
  {
    slug: "unity-editor-tools",
    title: "Unity editor tools",
    short: "Custom editor tools and extensions",
    summary:
      "We build custom Unity editor tools, extensions, and pipeline tooling that save your team time. We make Scriptable Sheets, a spreadsheet editor for Unity assets on the Unity Asset Store.",
    icon: "wrench",
    bullets: [
      "Editor windows, inspectors, and data editors, like Scriptable Sheets",
      "Import and export with CSV, TSV, JSON, and Google Sheets",
      "Asset import pipelines with scene generation and diagnostic tools",
      "Workflow tools such as Trello Poster, a free Unity bug reporter that files Trello cards",
    ],
    proof: ["scriptable-sheets", "universal-ps1-game-asset-importer", "setup-a-bug-reporter-in-unity-using-trello", "scriptableobject-tutorial-getting-started"],
    page: "/services/unity-editor-tools/",
    keywords: [
      "custom Unity editor tools",
      "Unity editor extensions",
      "Unity editor tool development",
      "Unity tools programmer for hire",
      "Unity pipeline and workflow tools",
      "custom Unity inspectors and editor windows",
      "Unity asset import pipeline",
    ],
  },
  {
    slug: "vr-ar-development",
    title: "VR and AR development",
    short: "VR and AR apps for health, training, and play",
    summary:
      "We build VR and AR apps in Unity for Meta Quest: health assessments, therapy, training, and games. HELIX, our VR hearing assessment, sends results to a provider dashboard on HIPAA-compliant AWS services.",
    icon: "headset",
    bullets: [
      "Gamified hearing tests on Meta Quest 2 with a web dashboard for providers",
      "VR soft-skills training with 360-degree video and composited actors",
      "Mixed reality with Stereolabs ZED depth cameras on Meta Quest 2",
      "Shader Graph materials for Apple Vision Pro",
    ],
    proof: ["helix", "saebovr", "asurion-vr-soft-skills-training", "smu-mixed-reality-software", "syneos-health-unity-software"],
    page: "/services/vr-ar-development/",
    keywords: [
      "VR development company",
      "AR/VR app development",
      "Meta Quest app development",
      "VR training simulation development",
      "medical VR development",
      "Unity VR developer",
      "mixed reality development",
    ],
  },
  {
    slug: "serious-games",
    title: "Serious games",
    short: "Therapy, training, and learning games, plus playable ads",
    summary:
      "We design and build serious games for therapy, fitness, assessment, and learning, working with clinicians and researchers. HELIX, our VR hearing assessment, was made with Nemours, and we have worked on training games and playable ads for Relevate Health Games and on therapy and education games for Barron Associates.",
    icon: "heartPulse",
    bullets: [
      "Assessment games that report results to clinicians, like HELIX for hearing",
      "Training games for patients and healthcare providers, and playable ads in any field",
      "Rehabilitation games driven by electromyography, motion capture, and other alternative controls",
      "Remote progress tracking so clinicians can follow patients at home",
    ],
    proof: [
      "helix",
      "saebovr",
      "kneebright",
      "move-it",
      "icare",
      "grasp",
      "neurosparks",
      "empathie",
      "flexsledding",
      "lab-rat",
      "lanebreak",
      "expression-lab",
      "level-one",
      "discover-td",
      "core-concepts-in-telehealth",
    ],
    page: "/services/serious-games/",
    keywords: [
      "serious game development",
      "serious games developer",
      "healthcare game development",
      "VR rehabilitation games",
      "educational game development company",
      "gamification development",
      "fitness game development",
      "medical training game development",
      "playable ads development",
    ],
  },
  {
    slug: "software-development",
    title: "Software development",
    short: "Web apps, APIs, and cloud backends",
    summary:
      "We build web apps, APIs, and cloud backends in Node.js, TypeScript, and NestJS, and move legacy systems to modern platforms. Games are not all we build: our web apps include FinChat, Reel Gains, and the HELIX provider dashboard.",
    icon: "code",
    bullets: [
      "High-availability APIs and services built for production scale",
      "Legacy rewrites, on-prem to cloud migrations, and platform upgrades",
      "Data pipelines that process millions of records under sustained load",
      "Web dashboards with accounts, scheduling, and charts, like the HELIX dashboard",
    ],
    proof: ["helix", "finchat", "anatomy-of-play", "reel-gains", "fresh-catch", "fishwatch"],
    page: "/services/software-development/",
    keywords: [
      "custom software development company",
      "web app development",
      "Node.js backend development",
      "NestJS development company",
      "legacy system modernization",
      "cloud migration services",
      "AWS backend development",
    ],
  },
];

/** The two offers next to the services (the menu shows them under a divider). */
export const ADJACENT_OFFERS: Service[] = [
  {
    slug: "publishing",
    title: "Publishing",
    short: "Bring your game to Steam and Nintendo Switch",
    summary:
      "We work with indie developers to bring their games to platforms like Steam and Nintendo Switch, whether it is a demo, an early build, or a finished release. We published The Brave Hearts II: False Skies on Steam in 2026.",
    icon: "rocket",
    bullets: [
      "Steam publishing and platform integration",
      "Windows build verification and release quality assurance",
      "Steam achievements, Steam Cloud, and controller usability",
    ],
    proof: ["the-brave-hearts-ii-false-skies", "hypno-halo", "paralily"],
    page: "/publishing/",
    keywords: [
      "indie game publisher",
      "indie game publishers accepting submissions",
      "publish my game on Steam",
      "publish a game on Nintendo Switch",
      "pitch your game to a publisher",
    ],
  },
  {
    slug: "internships-and-bootcamp",
    title: "Internships and bootcamp",
    short: "Learn in a working studio",
    summary:
      "Our remote internship puts small teams of students through a game from concept to demo release, and our 10-week remote bootcamp teaches beginners to build games in Unity and C#. Interns have shipped three games since 2025.",
    icon: "graduationCap",
    bullets: [
      "Unpaid remote internship, usually late May to mid-August, with possible college credit",
      "Weekly team meetings and day-to-day feedback from studio developers",
      "A 10-week remote bootcamp: design fundamentals, Unity and C#, and source control with Git",
    ],
    proof: ["coppervalle-rush", "railbound", "on-the-rocks", "the-brave-hearts-ii-false-skies"],
    page: "/bootcamp/",
    keywords: [
      "remote game development internship",
      "game dev internship remote",
      "Unity internship remote",
      "game development bootcamp online",
      "Unity bootcamp for beginners",
    ],
  },
];

export const service = (slug: string): Service => {
  const s = [...SERVICES, ...ADJACENT_OFFERS].find((x) => x.slug === slug);
  if (!s) throw new Error(`[services] No service with slug "${slug}".`);
  return s;
};
