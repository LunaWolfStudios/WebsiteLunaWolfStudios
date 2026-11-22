/**
 * Store prices for pages: typed access to the snapshot in src/data/store.json.
 *
 * The browser never asks a store for anything. scripts/store-data.mts reads Steam, the
 * Nintendo eShop and the Unity Asset Store, a scheduled workflow redeploys when a price
 * changes, and the prices are baked into the HTML. See README "Store prices".
 *
 *   import Price from "../components/Price.astro";
 *   import { getOffer, offerLd, PRICE_REGION_NOTE } from "../lib/store";
 *   const steam = getOffer("hypno-halo", "steam");
 *   <Price offer={steam} />            // beside a StoreButton
 *   <Price offer={steam} size="lg" />  // product hero
 *   jsonLd: { ...videoGameLd({...}), offers: [offerLd(steam), offerLd(getOffer("hypno-halo", "switch"))] }
 *
 * Amounts are integers in cents with an ISO currency code. Everything is a US store price
 * in US dollars; say so near a fact sheet with PRICE_REGION_NOTE.
 */
import snapshot from "../data/store.json";
import { STORE_CATALOG, type PricedStore } from "../data/storeCatalog";

export type { PricedStore };

/** One product on one store, as the last successful read saw it. */
export interface StoreOffer {
  /** Canonical store page (untagged). */
  url: string;
  /** ISO 4217 code. Always "USD": every read asks the US store. */
  currency: string;
  /** Price without a discount. Null only for an unreleased item that has no price yet. */
  regularCents: number | null;
  /** What a buyer pays now. Equals regularCents when there is no sale. */
  finalCents: number | null;
  /** Whole percent off, 0 when there is no sale. */
  discountPercent: number;
  /** When the sale ends (ISO 8601), or null when there is no sale or the store does not say. */
  saleEndsAt: string | null;
  isFree: boolean;
  isReleased: boolean;
  /** When this entry was last read successfully. Older than fetchedAt when a read failed. */
  checkedAt: string;
  /**
   * Unity Asset Store only: the listing's star rating (0 to 5), as the store reports it. The
   * listing rounds to a whole star, so 5 can stand for an average of 4.5 or more. A whole
   * number is therefore not printed as a rating ("5 stars" or "5 out of 5" would overstate
   * it); pages print the review count, and the average only if it arrives with a decimal.
   */
  rating?: number;
  /** Unity Asset Store only: number of reviews. */
  reviewCount?: number;
  /** Unity Asset Store only: current package version. */
  version?: string;
}

export interface StoreSnapshot {
  /** When the fetcher last ran. */
  fetchedAt: string;
  products: Record<string, Partial<Record<PricedStore, StoreOffer>>>;
}

const DATA = snapshot as StoreSnapshot;

/** One line for near a fact sheet or price list. */
export const PRICE_REGION_NOTE = "Prices are for the US store and may differ in your region.";

/** Store names for labels and messages. */
export const STORE_NAMES: Record<PricedStore, string> = {
  steam: "Steam",
  switch: "Nintendo eShop",
  unity: "Unity Asset Store",
};

/**
 * The offer for a product on a store. Throws (failing the build) for a slug or store that
 * has no data, so a typo never ships as a missing price.
 */
export function getOffer(slug: string, store: PricedStore): StoreOffer {
  const product = DATA.products[slug];
  if (!product) {
    const known = Object.keys(DATA.products).join(", ");
    throw new Error(
      `[store] No store data for "${slug}". Known slugs: ${known}. ` +
        `Add it to src/data/storeCatalog.ts and run \`npm run store:update\`.`,
    );
  }
  const offer = product[store];
  if (!offer) {
    const has = Object.keys(product).join(", ");
    throw new Error(
      `[store] "${slug}" has no ${STORE_NAMES[store] ?? store} data (it has: ${has}). ` +
        `Add the listing to src/data/storeCatalog.ts and run \`npm run store:update\`.`,
    );
  }
  return offer;
}

/** Every store a product is priced on, in catalog order. Throws for an unknown slug. */
export function getOffers(slug: string): Array<{ store: PricedStore; offer: StoreOffer }> {
  const stores = STORE_CATALOG.filter((e) => e.slug === slug).map((e) => e.store);
  if (!stores.length) getOffer(slug, "steam"); // throws the unknown-slug error
  return stores.map((store) => ({ store, offer: getOffer(slug, store) }));
}

/**
 * True while a discount applies. `now` defaults to build time, so a sale that ended before
 * the build shows the regular price (Price.astro also checks the visitor's clock).
 */
export function isOnSale(offer: StoreOffer, now: Date = new Date()): boolean {
  if (offer.isFree || !offer.isReleased) return false;
  if (offer.finalCents === null || offer.regularCents === null) return false;
  if (offer.discountPercent <= 0 || offer.finalCents >= offer.regularCents) return false;
  return offer.saleEndsAt === null || Date.parse(offer.saleEndsAt) > now.getTime();
}

/** The price a visitor sees at build time, in cents (the regular price once a sale ended). */
export function currentCents(offer: StoreOffer, now: Date = new Date()): number | null {
  return isOnSale(offer, now) ? offer.finalCents : offer.regularCents;
}

const formatters = new Map<string, Intl.NumberFormat>();

/** "$19.99". US formatting, since every price is a US store price. */
export function formatPrice(cents: number, currency: string): string {
  let f = formatters.get(currency);
  if (!f) {
    f = new Intl.NumberFormat("en-US", { style: "currency", currency });
    formatters.set(currency, f);
  }
  return f.format(cents / 100);
}

/**
 * "Dec 2": the sale's last day in US Pacific time, the clock Steam and Nintendo of America
 * run their sales on (a Nintendo sale ending 07:59 UTC ends at 11:59 pm the day before).
 */
export function formatSaleEnd(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "America/Los_Angeles",
  }).format(new Date(iso));
}

/**
 * A schema.org Offer for JSON-LD, or undefined for an unreleased item (an Offer needs a
 * price, and a wishlist is not one). Adds priceValidUntil while a sale runs.
 *
 *   offers: offerLd(getOffer("scriptable-sheets", "unity"))
 */
export function offerLd(offer: StoreOffer, now: Date = new Date()): Record<string, unknown> | undefined {
  if (!offer.isReleased) return undefined;
  const cents = offer.isFree ? 0 : currentCents(offer, now);
  if (cents === null) return undefined;
  const ld: Record<string, unknown> = {
    "@type": "Offer",
    price: (cents / 100).toFixed(2),
    priceCurrency: offer.currency,
    url: offer.url,
    availability: "https://schema.org/InStock",
    eligibleRegion: { "@type": "Country", name: "US" },
  };
  if (isOnSale(offer, now) && offer.saleEndsAt) ld.priceValidUntil = offer.saleEndsAt.slice(0, 10);
  return ld;
}

/** The Asset Store rating for a package (Scriptable Sheets by default), with when it was read. */
export function getAssetStoreRating(slug = "scriptable-sheets"): {
  rating: number;
  reviewCount: number;
  checkedAt: string;
} {
  const offer = getOffer(slug, "unity");
  if (offer.rating === undefined || offer.reviewCount === undefined) {
    throw new Error(`[store] "${slug}" has no Asset Store rating in src/data/store.json. Run \`npm run store:update\`.`);
  }
  return { rating: offer.rating, reviewCount: offer.reviewCount, checkedAt: offer.checkedAt };
}

/** When the fetcher last ran. */
export const STORE_DATA_FETCHED_AT = DATA.fetchedAt;
