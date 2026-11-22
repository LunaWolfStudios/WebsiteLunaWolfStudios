/**
 * Every store listing whose price the site shows, and the identifier each store knows it by.
 * The single place these identifiers live: scripts/store-data.mts reads this list to fetch
 * prices, and src/lib/store.ts reads the snapshot it writes (src/data/store.json).
 *
 * To add a product: add a row here, run `npm run store:update`, and commit both files.
 * `slug` matches the page slug where there is one; extra items that belong to a game
 * (soundtrack, DLC, demo) get their own slug and name the game in `parent`.
 *
 * `store` uses the StoreKind names from types.ts, so a row lines up with its StoreButton.
 *
 * The scheduled price check runs the fetcher with plain Node (no install step), which strips
 * types but does not resolve extensionless imports. So this file and links.ts keep to
 * erasable TypeScript, import types with `import type`, and write the `.ts` extension.
 */
import { LINKS } from "./links.ts";
import type { StoreKind } from "./types.ts";

/** The stores the price pipeline can read. */
export type PricedStore = Extract<StoreKind, "steam" | "switch" | "unity">;

export interface CatalogEntry {
  slug: string;
  store: PricedStore;
  /**
   * What the store calls it: the Steam app id, the Nintendo eShop NSUID (US), or the Unity
   * Asset Store package id. Digits only.
   */
  id: string;
  /** Canonical, untagged store page. Rendered links add UTM tags through withUtm(). */
  url: string;
  /** For logs and the preview page; pages take titles from their own data. */
  name: string;
  /** The game this item belongs to (soundtrack, DLC, demo). */
  parent?: string;
}

export const STORE_CATALOG: readonly CatalogEntry[] = [
  // Sheep Tag 2: free to play, Early Access in 2027. Never show its exact date.
  { slug: "sheep-tag-2", store: "steam", id: "537680", url: LINKS.sheepTag2Steam, name: "Sheep Tag 2" },
  {
    slug: "sheep-tag-2-soundtrack",
    store: "steam",
    id: "2151350",
    url: "https://store.steampowered.com/app/2151350/Sheep_Tag_2_Original_Soundtrack/",
    name: "Sheep Tag 2 Original Soundtrack",
    parent: "sheep-tag-2",
  },
  {
    slug: "sheep-tag-2-supporter-pack",
    store: "steam",
    id: "5538360",
    url: "https://store.steampowered.com/app/5538360/Sheep_Tag_2_Supporter_Pack/",
    name: "Sheep Tag 2 Supporter Pack",
    parent: "sheep-tag-2",
  },

  { slug: "hypno-halo", store: "steam", id: "3847950", url: LINKS.hypnoHaloSteam, name: "Hypno Halo" },
  { slug: "hypno-halo", store: "switch", id: "70010000112025", url: LINKS.hypnoHaloSwitch, name: "Hypno Halo" },
  {
    slug: "hypno-halo-demo",
    store: "steam",
    id: "4029810",
    url: "https://store.steampowered.com/app/4029810/Hypno_Halo_Demo/",
    name: "Hypno Halo Demo",
    parent: "hypno-halo",
  },

  { slug: "paralily", store: "steam", id: "1156760", url: "https://store.steampowered.com/app/1156760/ParaLily/", name: "ParaLily" },
  // NSUID read from the "nsuid" field in the product page's HTML.
  {
    slug: "paralily",
    store: "switch",
    id: "70010000049873",
    url: "https://www.nintendo.com/us/store/products/paralily-switch/",
    name: "ParaLily",
  },

  {
    slug: "the-brave-hearts-ii-false-skies",
    store: "steam",
    id: "4918650",
    url: LINKS.braveHearts2Steam,
    name: "The Brave Hearts II: False Skies",
  },

  { slug: "scriptable-sheets", store: "unity", id: "284559", url: LINKS.scriptableSheets, name: "Scriptable Sheets" },
];
