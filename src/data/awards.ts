/**
 * Recognition, most significant first. Each title carries the status word the source uses, so
 * a badge can never read as a win it was not. The two Unity Awards entries are nominations
 * (Unity's results list them as runners-up); never present them as a win or a final place.
 *
 * `source: "studio"` marks items only the studio's own pages state (the old site, the old
 * blog, the studio's itch.io pages, ParaLily's site). The rest were verified by research
 * (archive/research/scriptable-sheets.md, reviews-partners-history.md).
 *
 * ALL_AWARDS is every item. AWARDS, which the studio's pages read, leaves out two kinds:
 * awards that belong to another company's product (`owner`), and items held back for a
 * founder page (`founderOnly`). Both show on /about-jeff/ only. The last three entries came
 * from Jeff's own list (November 2026), with his facts and no more.
 */
import { LINKS } from "./links";
import type { Award } from "./types";

export const ALL_AWARDS: Award[] = [
  {
    year: 2025,
    title: "Nominee, Best Development Tool",
    body: "17th Unity Awards",
    subject: "Scriptable Sheets",
    subjectSlug: "scriptable-sheets",
    status: "Nominee",
    // Unity's nominee list names it; the results post lists it under "Runner-ups".
    url: LINKS.unityAwards2025Results,
  },
  {
    year: 2025,
    title: "Nominee, Breakthrough Publisher",
    body: "17th Unity Awards",
    subject: "Luna Wolf Studios",
    subjectSlug: "studio",
    status: "Nominee",
    url: LINKS.unityAwards2025Results,
  },
  {
    year: 2016,
    title: "Nominee, Indie Video Game of the Year",
    body: "2016 Delaware Innovation Awards",
    subject: "Haberdashery",
    subjectSlug: "haberdashery",
    status: "Nominee",
    url: LINKS.delawareInnovationAwards2016,
  },
  {
    year: 2018,
    title: "Best in Show",
    body: "Replay FX",
    subject: "ParaLily",
    subjectSlug: "paralily",
    status: "Best in Show",
    note: "Pittsburgh, PA, July 26-29, 2018",
    url: "https://paralilygame.com/",
    source: "studio",
  },
  {
    year: 2015,
    title: "Selected for the Boston Festival of Indie Games showcase",
    body: "Boston Festival of Indie Games",
    subject: "Haberdashery",
    subjectSlug: "haberdashery",
    status: "Selected",
    // An accepted game in the 2015 Digital Game Showcase, not a nomination.
  },
  {
    year: 2016,
    title: "1st place",
    body: "East Coast Reboot game jam, Wilmington University",
    subject: "Plan C",
    subjectSlug: "plan-c",
    status: "1st place",
    url: LINKS.planCItch,
    source: "studio",
  },
  {
    year: 2015,
    title: "1st place",
    body: "East Coast Reboot game jam, Wilmington University",
    subject: "Fungeon Crawler",
    subjectSlug: "fungeon-crawler",
    status: "1st place",
    url: LINKS.fungeonCrawlerItch,
    source: "studio",
  },
  {
    year: 2025,
    title: "Neurodiversity Employment Inclusion Excellence Award",
    body: "University of Delaware",
    subject: "Jeremy Bregermann",
    subjectSlug: "jeremy",
    note: "A personal award, listed on Jeremy's founder page",
    source: "studio",
    personal: true,
  },
  {
    // Status word "Nominee", as for the 17th above; Jeff's list calls it runner-up.
    // Year: the 17th edition is 2025 and Unity's 2025 wrap-up says winners were shown live
    // "for the second year in a row", so the 16th is 2024. Jeff's list gives no year.
    year: 2024,
    title: "Nominee, Best Embedded System Project",
    body: "16th Unity Awards",
    subject: "Lanebreak",
    subjectSlug: "lanebreak",
    status: "Nominee",
    owner: "Peloton",
    url: LINKS.unityAwards16Showcase,
    source: "studio",
  },
  {
    year: 2022,
    title: "Winner, Primary Education",
    body: "Tech & Learning Awards of Excellence",
    subject: "NeuroSPARKS",
    subjectSlug: "neurosparks",
    status: "Winner",
    owner: "Barron Associates",
    url: LINKS.neurosparksBarron,
    source: "studio",
  },
  {
    // Three showcases on one badge: `year` sorts it, `yearLabel` is what it prints. Held back
    // from the studio's lists (home, About, press kit, ParaLily's page) whose grids are tuned
    // to seven; drop `founderOnly` to list it there.
    year: 2019,
    yearLabel: "2017, 2018, and 2019",
    title: "Official selection",
    body: "MAGFest Indie Videogame Showcase",
    subject: "ParaLily",
    subjectSlug: "paralily",
    status: "Official selection",
    url: LINKS.magfestMivs,
    source: "studio",
    founderOnly: true,
  },
];

/** What the studio's pages list: every award except another company's and founder-page-only items. */
export const AWARDS: Award[] = ALL_AWARDS.filter((a) => !a.owner && !a.founderOnly);

/** The studio's own recognition (personal awards left out), for the home, about, and press pages. */
export const STUDIO_AWARDS: Award[] = AWARDS.filter((a) => !a.personal);
