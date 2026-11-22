/**
 * Shapes for the founder pages' own data (src/data/founders/*.ts) and the components in this
 * folder. Portfolio lists are not here: they are FOUNDER_PORTFOLIO in src/data/team.ts.
 */
import type { FounderSlug } from "../../data/types";

export interface BioSection {
  title: string;
  /** Plain text. May hold inline <a> and <strong> markup written in the data file. */
  paragraphs: string[];
  /** A short list shown after the paragraphs, as chips. */
  chips?: string[];
}

export interface Highlight {
  /** Icon name from src/lib/icons.ts. */
  icon: string;
  value: string;
  label: string;
}

export interface PageLink {
  label: string;
  href: string;
}

export interface FounderPageData {
  slug: FounderSlug;
  /** <title> before the brand suffix BaseLayout adds. */
  title: string;
  description: string;
  h1: string;
  jobTitle: string;
  /** Line under the h1 (a founder's own tagline, where the old page has one). */
  tagline?: string;
  summary: string;
  highlights: Highlight[];
  bio: BioSection[];
  knowsAbout: string[];
  /** Service pages the closing call to action links to. */
  services: PageLink[];
  /** YouTube id of a reel shown with the portfolio. */
  reelId?: string;
  /** What the old page's "…and many more" becomes. */
  moreNote?: string;
}

/** An outbound link shown on a card beside its main link. */
export interface ExtraLink {
  label: string;
  url: string;
  icon?: string;
}
