/**
 * Olivia's founder page (/about-olivia/). Source: archive/wordpress/pages/about-olivia.md. The
 * old page lists no projects and no personal contact links; enquiries go to the studio. Her
 * "Areas of Work" are FOUNDER_FACTS.olivia.areasOfWork in src/data/team.ts.
 *
 * Olivia goes by first name only, everywhere (CLAUDE.md).
 *
 * "Close to a decade" is as of November 2026 (her page dates from July 2026); revisit it
 * yearly, and once she passes ten years ask her for a start year.
 */
import type { FounderPageData } from "../../components/about/types";

export const OLIVIA_PAGE: FounderPageData = {
  slug: "olivia",
  title: "Olivia, co-founder and backend engineer",
  description:
    "Olivia co-founded Luna Wolf Studios and has close to a decade of enterprise backend work in Node.js, TypeScript, and NestJS, including legacy modernization.",
  h1: "Olivia, co-founder of Luna Wolf Studios",
  jobTitle: "Co-founder",
  summary:
    "Close to a decade building enterprise backend systems in Node.js, TypeScript, and NestJS, with a focus on modernizing legacy platforms.",
  highlights: [
    { icon: "calendar", value: "Close to a decade", label: "Enterprise backend systems" },
    { icon: "code", value: "Node.js and NestJS", label: "TypeScript, cloud, and SQL" },
    { icon: "layers", value: "Millions of records a day", label: "Systems where uptime is not optional" },
    { icon: "briefcase", value: "Five industries", label: "Finance, logistics, sports media, utilities, education" },
  ],
  bio: [
    {
      title: "Built for real-world pressure",
      paragraphs: [
        "I have close to a decade of experience building enterprise backend systems, and I design software that holds up under real-world pressure, not just on the happy path. I have worked in finance, logistics, sports media, utilities, and education, on small focused teams and on multi-team initiatives spanning dozens of engineers.",
      ],
    },
    {
      title: "Stack",
      paragraphs: [
        "My core stack is Node.js, TypeScript, and NestJS, backed by cloud infrastructure, infrastructure as code, and SQL databases. I have also worked in Go and Python. Earlier in my career I did native iOS development in Swift, and that cross-platform view still shapes my backend architecture decisions.",
      ],
    },
    {
      title: "Modernization",
      paragraphs: [
        "Much of my career has been modernization: moving legacy systems off aging on-prem infrastructure, rewriting brittle codebases, and upgrading platforms to meet modern scale. I have worked on systems that process millions of records a day, where uptime is not optional and a failure has downstream consequences.",
        "That shaped how I think about software: not only how it performs under expected load, but how it behaves when people push it in ways it was not designed for. I bring that to every project, and I build systems that are thoughtfully designed, resilient by default, and built to last.",
      ],
    },
  ],
  knowsAbout: [
    "Node.js",
    "TypeScript",
    "NestJS",
    "Go",
    "Python",
    "Swift",
    "Cloud infrastructure",
    "Infrastructure as code",
    "SQL",
    "Platform modernization",
  ],
  services: [{ label: "Software development", href: "/services/software-development/" }],
};

/** The stack as chips (from her "Stack" paragraph). */
export const OLIVIA_STACK = [
  "Node.js",
  "TypeScript",
  "NestJS",
  "Go",
  "Python",
  "Swift",
  "Cloud infrastructure",
  "Infrastructure as code",
  "SQL",
];

/** Icons for the four "Areas of Work" cards, in FOUNDER_FACTS order. */
export const OLIVIA_AREA_ICONS = ["layers", "rocket", "monitor", "users"];
