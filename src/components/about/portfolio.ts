/**
 * Helpers for the founder portfolios. FOUNDER_PORTFOLIO (src/data/team.ts) lists some projects
 * under more than one heading, as the old pages did. Every line stays, but a project already
 * shown as a full card higher up the page comes back as a compact row, so the page does not
 * repeat itself.
 */
import type { PortfolioGroup, PortfolioItem } from "../../data/team";

export interface MarkedItem {
  item: PortfolioItem;
  repeat: boolean;
}

export interface MarkedGroup {
  heading: string;
  id: string;
  items: MarkedItem[];
}

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Mark repeats in page order. `seen` holds slugs already shown in full above the groups. */
export function markRepeats(groups: PortfolioGroup[], seen: Set<string> = new Set()): MarkedGroup[] {
  return groups.map((g) => ({
    heading: g.heading,
    id: slugify(g.heading),
    items: g.items.map((item) => {
      const repeat = Boolean(item.slug && seen.has(item.slug));
      if (item.slug) seen.add(item.slug);
      return { item, repeat };
    }),
  }));
}

/**
 * Columns for a group of n full cards on a wide screen, chosen so the last row is as full as
 * possible (the last row is centered either way).
 */
export function columnsFor(n: number): number {
  if (n <= 3) return 3;
  if (n === 4) return 4;
  const score = (c: number) => (n % c === 0 ? c : n % c);
  return score(3) >= score(4) ? 3 : 4;
}
