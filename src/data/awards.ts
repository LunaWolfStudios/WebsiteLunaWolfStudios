/**
 * Recognition, most significant first. Each title carries the status word the source uses, so
 * a badge can never read as a win it was not. The two Unity Awards entries are nominations
 * (Unity's results list them as runners-up); never present them as a win or a final place.
 *
 * `source: "studio"` marks items only the studio's own pages state (the old site, the old
 * blog, the studio's itch.io pages, ParaLily's site). The rest were verified by research
 * (archive/research/scriptable-sheets.md, reviews-partners-history.md).
 */
import { LINKS } from "./links";
import type { Award } from "./types";

export const AWARDS: Award[] = [
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
];

/** The studio's own recognition (personal awards left out), for the home, about, and press pages. */
export const STUDIO_AWARDS: Award[] = AWARDS.filter((a) => !a.personal);
