/**
 * Jeff's founder page (/about-jeff/). The bio is archive/wordpress/pages/about-jeff.md in his
 * six themes, tightened to the copy rules: every fact kept, first person kept. The portfolio
 * lists are FOUNDER_PORTFOLIO.jeff in src/data/team.ts; do not repeat them here.
 *
 * Jeff goes by first name only, everywhere (CLAUDE.md).
 *
 * Experience spans ("over a decade") are as of November 2026; revisit them yearly.
 * His work on other companies' projects is "worked on", with no role or employment label
 * (the owner's answers, 21 November 2026). The FDA sentence is his own statement; the owner
 * confirmed it refers to his Barron Associates projects.
 */
import type { FounderPageData } from "../../components/about/types";

export const JEFF_PAGE: FounderPageData = {
  slug: "jeff",
  title: "Jeff, co-founder and Unity engineer",
  description:
    "Jeff co-founded Luna Wolf Studios and has spent over a decade building Unity, XR, and health games, cloud streaming platforms, and Unity editor tools.",
  h1: "Jeff, co-founder of Luna Wolf Studios",
  jobTitle: "Co-founder",
  summary:
    "Over a decade of games, tools, and platforms in Unity and XR: therapy and fitness games, educational games, cloud streaming, and the Unity tool Scriptable Sheets.",
  highlights: [
    { icon: "calendar", value: "Over a decade", label: "Building games, tools, and platforms" },
    { icon: "headset", value: "Unity and XR", label: "Leading cross-disciplinary teams" },
    { icon: "heartPulse", value: "Motion capture and EMG", label: "Real-time therapy, fitness, and STEM games" },
    { icon: "globe", value: "AWS and WebRTC", label: "Low-latency 3D streaming and CI/CD" },
  ],
  bio: [
    {
      title: "Engineering first",
      paragraphs: [
        "I am an engineer first. For over a decade I have made games, tools, and platforms that use play to teach, motivate, and solve real problems, from therapy software for stroke survivors to a 32-player online game.",
      ],
    },
    {
      title: "Unity and XR",
      paragraphs: [
        "I specialize in Unity and XR and have led cross-disciplinary teams on multiplayer strategy games, educational experiences, and medical simulations. The Barron Associates projects I worked on helped launch FDA-approved treatments, gamify complex training protocols, and raise learning engagement.",
      ],
    },
    {
      title: "Motion capture, EMG, and alternative controls",
      paragraphs: [
        "I build real-time systems driven by motion capture, electromyography (EMG), and other alternative controls. They make therapy, fitness, and STEM education more accessible, give data-driven insight into each player, and have helped clinicians track patients remotely and kids with physical limitations engage with therapy. In EMPATHIE's pilot with 48 middle school students, the game produced significant learning gains.",
      ],
    },
    {
      title: "Cloud streaming and build pipelines",
      paragraphs: [
        "I have built low-latency platforms with Unity, AWS, and WebRTC that stream fully interactive 3D simulations securely over low-bandwidth networks, and containerized CI/CD pipelines that automate Unity builds and deployments for faster, steadier releases on web, mobile, and VR.",
      ],
    },
    {
      title: "Launch support",
      paragraphs: [
        "Beyond engineering, I help teams launch with video production, content creation, web development, and community management, so they start with a consistent brand and the tools to grow an audience.",
      ],
    },
    {
      title: "What drives the work",
      paragraphs: [
        "In every project I aim to push what games can do, combining technology and design to deliver experiences that matter.",
      ],
    },
  ],
  knowsAbout: [
    "Unity",
    "Extended reality",
    "Serious games for health",
    "Motion capture",
    "Electromyography",
    "AWS",
    "WebRTC",
    "CI/CD",
    "Unity editor tools",
  ],
  services: [
    { label: "Unity development", href: "/services/unity-development/" },
    { label: "Serious games", href: "/services/serious-games/" },
    { label: "Unity editor tools", href: "/services/unity-editor-tools/" },
    { label: "VR and AR development", href: "/services/vr-ar-development/" },
    { label: "Software development", href: "/services/software-development/" },
  ],
  /** Jeff's 2016 demo reel (videos.ts OTHER_VIDEOS). */
  reelId: "zVFeR7N4hiU",
  /** The old page closes the list with "…and many many more." */
  moreNote:
    "This is a selection. The reel above covers his 2014 to 2016 projects, and the games page lists more of the studio's work.",
};
