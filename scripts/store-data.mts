/**
 * Store prices: reads current prices and sales from Steam, the Nintendo eShop (US) and the
 * Unity Asset Store for every listing in src/data/storeCatalog.ts.
 *
 * Why a script and not the browser: Steam's API sends no CORS headers, the Asset Store has no
 * API at all, and page load comes first. So prices are read here, baked into the HTML at build
 * time, and .github/workflows/store-data.yml redeploys the site when one changes.
 *
 * Runs two ways: `node scripts/store-data.mts` on Node 24 (it strips the types itself; the
 * scheduled check uses this, with no npm install) or `npx tsx scripts/store-data.mts`. So this
 * file and everything it imports stay erasable TypeScript: `import type` for types, explicit
 * `.ts` extensions, no enums, namespaces or parameter properties.
 *
 *   npx tsx scripts/store-data.mts                     print what the stores say and what differs
 *                                                      from src/data/store.json; writes nothing
 *   ... --write                                        update src/data/store.json
 *   ... --out <file>                                   write the fresh data to <file>
 *   ... --changed-against <file|url>                   print changed=true|false (and write it to
 *                                                      $GITHUB_OUTPUT), comparing prices, sales,
 *                                                      flags, rating, reviews and version; never
 *                                                      timestamps. Also the baseline (below).
 *   ... --baseline <file|url>                          previous values come from here, not the
 *                                                      snapshot (the live site's copy in CI)
 *   ... --strict                                       exit 1 when any read fails (debugging)
 *   ... --self-test                                    run the parsers against scripts/fixtures/store/
 *
 * Failure policy. Each store is read on its own, with a timeout and one retry. A store that
 * fails, or a value that fails validation, keeps the previous value for that product (from the
 * baseline) and logs a warning; the script still exits 0 so a store outage never breaks a build
 * or a deploy. A product is never removed from the data by this script.
 *
 * Endpoint overrides, for testing failure handling (any unreachable URL will do, for example
 * http://127.0.0.1:59999/; avoid ports fetch refuses outright, like 9):
 *   STORE_STEAM_API         default https://api.steampowered.com/IStoreBrowseService/GetItems/v1/
 *   STORE_STEAM_APPDETAILS  default https://store.steampowered.com/api/appdetails (Steam fallback)
 *   STORE_NINTENDO_API      default https://api.ec.nintendo.com/v1/price
 *   STORE_UNITY_ORIGIN      default https://assetstore.unity.com (the catalog URL's path is kept)
 */
import { appendFile, mkdir, readFile, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { STORE_CATALOG, type CatalogEntry, type PricedStore } from "../src/data/storeCatalog.ts";
import type { StoreOffer, StoreSnapshot } from "../src/lib/store.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SNAPSHOT_PATH = path.join(ROOT, "src", "data", "store.json");
const FIXTURES = path.join(ROOT, "scripts", "fixtures", "store");

const ENDPOINTS = {
  steamItems: process.env.STORE_STEAM_API || "https://api.steampowered.com/IStoreBrowseService/GetItems/v1/",
  steamAppDetails: process.env.STORE_STEAM_APPDETAILS || "https://store.steampowered.com/api/appdetails",
  nintendo: process.env.STORE_NINTENDO_API || "https://api.ec.nintendo.com/v1/price",
  unityOrigin: process.env.STORE_UNITY_ORIGIN || "",
};

/** Generic agent for the JSON APIs; the Asset Store serves its full page only to a browser. */
const API_AGENT = "Mozilla/5.0 (compatible; store-price-check/1.0)";
const BROWSER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";

/**
 * Short timeouts: the scheduled check is billed by the started minute, and a store that has
 * not answered in 8 seconds is down for our purposes (its previous value is kept). Worst case,
 * every store hanging: Steam 2 x (8 + 1 + 8) s with its fallback, all stores in parallel,
 * so well under a minute. The Asset Store page is about 1.2 MB, hence its longer allowance.
 */
const TIMEOUT_MS = 8_000;
const PAGE_TIMEOUT_MS = 12_000;
const RETRY_DELAY_MS = 1_000;

/** Guard rails (see validate()). */
const MAX_DISCOUNT = 95;
const MAX_PRICE_RATIO = 3;
const MAX_CENTS = 100_000;

/** What one store said about one product, before it is checked and stamped. */
type Reading = Omit<StoreOffer, "url" | "checkedAt">;
type Result = { ok: true; reading: Reading; via?: string } | { ok: false; reason: string };
type Readings = Map<string, Result>;

const keyOf = (e: { slug: string; store: string }) => `${e.slug}/${e.store}`;
const fail = (reason: string): Result => ({ ok: false, reason });
/** Error text, with the network cause ("ECONNREFUSED") that fetch hides behind "fetch failed". */
const errText = (e: unknown): string => {
  if (!(e instanceof Error)) return String(e);
  const cause = e.cause instanceof Error ? ((e.cause as NodeJS.ErrnoException).code ?? e.cause.message) : "";
  return cause && !e.message.includes(cause) ? `${e.message} (${cause})` : e.message;
};

// ---------------------------------------------------------------------------------------------
// Logging. In GitHub Actions, warnings become annotations on the run page.

const IN_ACTIONS = !!process.env.GITHUB_ACTIONS;
const warnings: string[] = [];
function warn(msg: string) {
  warnings.push(msg);
  console.warn(IN_ACTIONS ? `::warning::[store] ${msg}` : `[store] warning: ${msg}`);
}
const log = (msg: string) => console.log(`[store] ${msg}`);

// ---------------------------------------------------------------------------------------------
// Fetching

async function fetchText(url: string, agent: string, extra: Record<string, string> = {}, timeoutMs = TIMEOUT_MS) {
  let lastError: unknown;
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": agent, "Accept-Language": "en-US,en;q=0.9", ...extra },
        signal: AbortSignal.timeout(timeoutMs),
        redirect: "follow",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`.trim());
      return await res.text();
    } catch (e) {
      lastError = e;
      if (attempt === 1) await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
    }
  }
  throw new Error(`${new URL(url).host}: ${errText(lastError)}`);
}

async function fetchJson(url: string): Promise<unknown> {
  const text = await fetchText(url, API_AGENT, { Accept: "application/json" });
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`${new URL(url).host}: response is not JSON`);
  }
}

// ---------------------------------------------------------------------------------------------
// Parsing helpers

type Json = Record<string, unknown>;
const isObj = (v: unknown): v is Json => typeof v === "object" && v !== null && !Array.isArray(v);

/** "19.99" or 19.99 -> 1999. Done on the digits so 0.1 + 0.2 never happens. */
export function toCents(value: unknown): number {
  const s = typeof value === "number" ? value.toFixed(2) : typeof value === "string" ? value.trim() : "";
  const m = /^(\d{1,7})(?:\.(\d{1,2}))?$/.exec(s);
  if (!m) throw new Error(`not a price: ${JSON.stringify(value)}`);
  return Number(m[1]) * 100 + Number((m[2] ?? "0").padEnd(2, "0"));
}

/** Steam sends cents as a digit string ("1999"). */
function centsString(value: unknown): number {
  const s = typeof value === "number" ? String(value) : value;
  if (typeof s !== "string" || !/^\d{1,7}$/.test(s)) throw new Error(`not an amount in cents: ${JSON.stringify(value)}`);
  return Number(s);
}

const percentOff = (regular: number, final: number) =>
  regular > 0 && final < regular ? Math.round((1 - final / regular) * 100) : 0;

// ---------------------------------------------------------------------------------------------
// Steam: IStoreBrowseService/GetItems (one call for every app), appdetails as a fallback

export function steamItemsUrl(appids: string[]): string {
  const input = {
    ids: appids.map((appid) => ({ appid: Number(appid) })),
    context: { language: "english", country_code: "US" },
    data_request: { include_basic_info: true, include_reviews: true, include_release: true },
  };
  const url = new URL(ENDPOINTS.steamItems);
  url.searchParams.set("input_json", JSON.stringify(input));
  return url.href;
}

/**
 * Shapes seen on 2026-11-21:
 * - paid, full price: best_purchase_option { final_price_in_cents: "1999", formatted_final_price: "$19.99" }
 * - on sale: adds original_price_in_cents, discount_pct, active_discounts[{ discount_end_date: <unix> }]
 * - free: is_free: true and no best_purchase_option
 * - unreleased: is_coming_soon: true (top level and in release); Sheep Tag 2 is also is_free
 * GetItems gives no currency code; with country_code US the formatted price starts with "$".
 */
export function parseSteamItems(json: unknown, appids: string[]): Readings {
  const out: Readings = new Map();
  const items = isObj(json) && isObj(json.response) ? json.response.store_items : undefined;
  if (!Array.isArray(items)) {
    for (const id of appids) out.set(id, fail("GetItems: response has no store_items"));
    return out;
  }
  for (const appid of appids) {
    const item = items.find((i) => isObj(i) && String(i.appid ?? i.id) === appid);
    try {
      out.set(appid, { ok: true, reading: steamItem(item) });
    } catch (e) {
      out.set(appid, fail(`GetItems: ${errText(e)}`));
    }
  }
  return out;
}

function steamItem(item: unknown): Reading {
  if (!isObj(item)) throw new Error("app missing from the response");
  if (item.success !== 1) throw new Error(`success is ${JSON.stringify(item.success)}`);
  const release = isObj(item.release) ? item.release : {};
  const isReleased = !(item.is_coming_soon === true || release.is_coming_soon === true);
  const isFree = item.is_free === true;
  const bpo = item.best_purchase_option;

  if (isObj(bpo)) {
    const formatted = String(bpo.formatted_final_price ?? "");
    if (!formatted.startsWith("$")) throw new Error(`price is not in US dollars (${JSON.stringify(formatted)})`);
    const finalCents = centsString(bpo.final_price_in_cents);
    let regularCents = bpo.original_price_in_cents === undefined ? finalCents : centsString(bpo.original_price_in_cents);
    let discountPercent = bpo.discount_pct === undefined ? 0 : Number(bpo.discount_pct);
    let saleEndsAt: string | null = null;
    // Steam marks a price that may not be advertised as a discount (EU price rules); obey it.
    if (bpo.price_cannot_be_displayed_as_discount === true || bpo.hide_discount_pct_for_compliance === true) {
      regularCents = finalCents;
      discountPercent = 0;
    }
    if (discountPercent > 0) {
      const ends = (Array.isArray(bpo.active_discounts) ? bpo.active_discounts : [])
        .map((d) => (isObj(d) ? Number(d.discount_end_date) : NaN))
        .filter((t) => Number.isFinite(t) && t > 0);
      // Stacked discounts: the price changes when the first one ends.
      if (ends.length) saleEndsAt = new Date(Math.min(...ends) * 1000).toISOString();
    }
    return { currency: "USD", regularCents, finalCents, discountPercent, saleEndsAt, isFree: isFree && finalCents === 0, isReleased };
  }
  if (isFree) return { currency: "USD", regularCents: 0, finalCents: 0, discountPercent: 0, saleEndsAt: null, isFree: true, isReleased };
  if (!isReleased) return { currency: "USD", regularCents: null, finalCents: null, discountPercent: 0, saleEndsAt: null, isFree: false, isReleased };
  throw new Error("released, not free, and no purchase option (delisted or region locked?)");
}

export const steamAppDetailsUrl = (appid: string) =>
  `${ENDPOINTS.steamAppDetails}?appids=${appid}&cc=us&l=english&filters=price_overview,release_date`;

/**
 * The fallback: store.steampowered.com/api/appdetails, one app per call. It says nothing about
 * free games (no price_overview) or sale end dates, so those come from the previous value when
 * it agrees, and a paid game with no price is refused rather than turned free.
 */
export function parseSteamAppDetails(json: unknown, appid: string, previous?: StoreOffer): Reading {
  const node = isObj(json) ? json[appid] : undefined;
  if (!isObj(node) || node.success !== true) throw new Error("appdetails: success is not true");
  const data = isObj(node.data) ? node.data : {};
  const rd = isObj(data.release_date) ? data.release_date : undefined;
  if (!rd) throw new Error("appdetails: no release_date");
  const isReleased = rd.coming_soon !== true;
  const po = isObj(data.price_overview) ? data.price_overview : undefined;
  if (po) {
    const regularCents = Number(po.initial);
    const finalCents = Number(po.final);
    const discountPercent = Number(po.discount_percent ?? 0);
    if (!Number.isInteger(regularCents) || !Number.isInteger(finalCents)) throw new Error("appdetails: price is not a number");
    const sameSale =
      previous && discountPercent > 0 && previous.finalCents === finalCents && previous.discountPercent === discountPercent;
    return {
      currency: String(po.currency ?? ""),
      regularCents,
      finalCents,
      discountPercent,
      saleEndsAt: sameSale ? previous.saleEndsAt : null,
      isFree: false,
      isReleased,
    };
  }
  if (previous?.isFree) return { currency: "USD", regularCents: 0, finalCents: 0, discountPercent: 0, saleEndsAt: null, isFree: true, isReleased };
  if (!isReleased) return { currency: "USD", regularCents: null, finalCents: null, discountPercent: 0, saleEndsAt: null, isFree: false, isReleased };
  throw new Error("appdetails: no price, and nothing says the app is free");
}

async function readSteam(entries: CatalogEntry[], baseline: StoreSnapshot): Promise<Readings> {
  const appids = entries.map((e) => e.id);
  let byApp: Readings;
  try {
    byApp = parseSteamItems(await fetchJson(steamItemsUrl(appids)), appids);
  } catch (e) {
    byApp = new Map(appids.map((id) => [id, fail(`GetItems: ${errText(e)}`)]));
  }
  // appdetails takes one app per call; the calls run in parallel to keep the job short.
  const results = await Promise.all(
    entries.map(async (entry): Promise<[string, Result]> => {
      const result = byApp.get(entry.id) ?? fail("GetItems: no result");
      if (result.ok) return [keyOf(entry), result];
      const previous = baseline.products[entry.slug]?.steam;
      try {
        const reading = parseSteamAppDetails(await fetchJson(steamAppDetailsUrl(entry.id)), entry.id, previous);
        warn(`${keyOf(entry)}: ${result.reason}; used the appdetails fallback`);
        return [keyOf(entry), { ok: true, reading, via: "appdetails fallback" }];
      } catch (e) {
        return [keyOf(entry), fail(`${result.reason}; fallback ${errText(e)}`)];
      }
    }),
  );
  return new Map(results);
}

// ---------------------------------------------------------------------------------------------
// Nintendo eShop (US): api.ec.nintendo.com/v1/price, up to 50 NSUIDs per call

export const nintendoUrl = (nsuids: string[]) => `${ENDPOINTS.nintendo}?country=US&lang=en&ids=${nsuids.join(",")}`;

/**
 * Shapes seen on 2026-11-21: { prices: [{ title_id, sales_status: "onsale",
 * regular_price: { amount: "$19.99", currency: "USD", raw_value: "19.99" },
 * discount_price?: { raw_value, start_datetime, end_datetime } }] }.
 * "onsale" means "for sale", not "discounted". An unknown NSUID comes back "not_found".
 * The API gives no percentage, so it is computed (as the eShop rounds it).
 */
export function parseNintendoPrices(json: unknown, nsuids: string[], now: Date): Readings {
  const out: Readings = new Map();
  const prices = isObj(json) ? json.prices : undefined;
  for (const nsuid of nsuids) {
    try {
      if (!Array.isArray(prices)) throw new Error("response has no prices");
      const p = prices.find((x) => isObj(x) && String(x.title_id) === nsuid);
      if (!isObj(p)) throw new Error("title missing from the response");
      const status = String(p.sales_status);
      if (status === "not_found") throw new Error("title not found");
      const unreleased = status === "preorder" || status === "unreleased";
      if (status !== "onsale" && !unreleased) throw new Error(`sales_status is "${status}" (not for sale?)`);
      const rp = p.regular_price;
      if (!isObj(rp)) {
        if (unreleased) {
          out.set(nsuid, { ok: true, reading: { currency: "USD", regularCents: null, finalCents: null, discountPercent: 0, saleEndsAt: null, isFree: false, isReleased: false } });
          continue;
        }
        throw new Error("no regular_price");
      }
      const regularCents = toCents(rp.raw_value);
      let finalCents = regularCents;
      let saleEndsAt: string | null = null;
      const dp = p.discount_price;
      if (isObj(dp)) {
        const start = dp.start_datetime ? Date.parse(String(dp.start_datetime)) : -Infinity;
        const end = dp.end_datetime ? Date.parse(String(dp.end_datetime)) : Infinity;
        if (Number.isNaN(start) || Number.isNaN(end)) throw new Error("discount dates are not dates");
        if (start <= now.getTime() && end > now.getTime()) {
          finalCents = toCents(dp.raw_value);
          saleEndsAt = Number.isFinite(end) ? new Date(end).toISOString() : null;
        }
      }
      out.set(nsuid, {
        ok: true,
        reading: {
          currency: String(rp.currency ?? ""),
          regularCents,
          finalCents,
          discountPercent: percentOff(regularCents, finalCents),
          saleEndsAt,
          isFree: regularCents === 0,
          isReleased: !unreleased,
        },
      });
    } catch (e) {
      out.set(nsuid, fail(errText(e)));
    }
  }
  return out;
}

async function readNintendo(entries: CatalogEntry[], now: Date): Promise<Readings> {
  const nsuids = entries.map((e) => e.id);
  let byId: Readings;
  try {
    byId = parseNintendoPrices(await fetchJson(nintendoUrl(nsuids)), nsuids, now);
  } catch (e) {
    byId = new Map(nsuids.map((id) => [id, fail(errText(e))]));
  }
  return new Map(entries.map((e) => [keyOf(e), byId.get(e.id) ?? fail("no result")]));
}

// ---------------------------------------------------------------------------------------------
// Unity Asset Store: no API, so the listing page. The fragile source.

/**
 * Return the JSON object that starts at `text[start]` ("{"), scanning strings properly so a
 * brace inside a description cannot end it early.
 */
function jsonObjectAt(text: string, start: number): Json {
  if (text[start] !== "{") throw new Error("expected an object");
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = start; i < text.length; i++) {
    const c = text[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (c === "\\") escaped = true;
      else if (c === '"') inString = false;
      continue;
    }
    if (c === '"') inString = true;
    else if (c === "{") depth++;
    else if (c === "}" && --depth === 0) {
      const value: unknown = JSON.parse(text.slice(start, i + 1));
      if (!isObj(value)) throw new Error("not an object");
      return value;
    }
  }
  throw new Error("unterminated object");
}

/** Every `"<id>":{"id":"<id>"…}` entry in the page's embedded Apollo state. */
function apolloEntries(html: string, id: string): Json[] {
  const needle = `"${id}":{"id":"${id}"`;
  const found: Json[] = [];
  for (let at = html.indexOf(needle); at !== -1; at = html.indexOf(needle, at + 1)) {
    try {
      found.push(jsonObjectAt(html, at + id.length + 3));
    } catch {
      // A truncated or odd match is skipped; the caller checks that something usable was found.
    }
  }
  return found;
}

function jsonLdProducts(html: string): Json[] {
  const out: Json[] = [];
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (let m = re.exec(html); m; m = re.exec(html)) {
    try {
      const value: unknown = JSON.parse(m[1]);
      for (const node of Array.isArray(value) ? value : [value]) if (isObj(node) && node["@type"] === "Product") out.push(node);
    } catch {
      // Ignore blocks that are not valid JSON.
    }
  }
  return out;
}

/**
 * Shape seen on 2026-11-21 (the listing's own product, under its package id):
 *   { id: "284559", slug: "scriptable-sheets-284559", state: "published",
 *     originalPrice: { originalPrice: "49.99", finalPrice: "24.99", isFree: false, currency: "USD",
 *                      discount: { percentage: 50.01 } },
 *     rating: { average: 5, count: 34 }, reviewCount: 34,
 *     currentVersion: { type: "id", id: ["ProductVersion", "1399762"] } }
 * and the version under "1399762": { id, name: "1.11.0", __typename: "ProductVersion" }.
 * Other products in carousels use price: { price, originPrice }; that shape is accepted too.
 * The JSON-LD Product's offers.price must agree with finalPrice, or the read is refused.
 * The page does not say when a sale ends.
 */
export function parseAssetStore(html: string, packageId: string): Reading {
  const product = apolloEntries(html, packageId).find((o) => o.__typename === "Product" || "originalPrice" in o || "price" in o);
  if (!product) throw new Error(`package ${packageId} not found in the page state`);
  if (product.state !== undefined && product.state !== "published") throw new Error(`package state is "${String(product.state)}"`);

  let regularCents: number;
  let finalCents: number;
  let currency = "USD";
  let isFree = false;
  if (isObj(product.originalPrice)) {
    const op = product.originalPrice;
    regularCents = toCents(op.originalPrice);
    finalCents = toCents(op.finalPrice);
    currency = String(op.currency ?? "");
    isFree = op.isFree === true;
  } else if (isObj(product.price)) {
    regularCents = toCents(product.price.originPrice);
    finalCents = toCents(product.price.price);
  } else {
    throw new Error("no price on the package");
  }

  // Cross-check against the page's JSON-LD, which the store renders separately.
  const ld = jsonLdProducts(html).find((p) => {
    const offers = isObj(p.offers) ? p.offers : {};
    return String(offers.url ?? "").includes(`-${packageId}`);
  });
  if (ld && isObj(ld.offers)) {
    const ldCents = toCents(ld.offers.price);
    if (ldCents !== finalCents) throw new Error(`JSON-LD price ${ldCents} disagrees with the page state ${finalCents}`);
    if (ld.offers.priceCurrency && ld.offers.priceCurrency !== currency) throw new Error("JSON-LD currency disagrees");
  }

  const rating = isObj(product.rating) ? Number(product.rating.average) : NaN;
  const reviewCount = Number(product.reviewCount ?? (isObj(product.rating) ? product.rating.count : NaN));

  let version: unknown;
  const cv = product.currentVersion;
  if (isObj(cv) && typeof cv.name === "string") version = cv.name;
  else if (isObj(cv) && Array.isArray(cv.id) && cv.id[0] === "ProductVersion") {
    const vid = String(cv.id[1]);
    version = apolloEntries(html, vid).find((o) => o.__typename === "ProductVersion")?.name;
  }
  if (typeof version !== "string") throw new Error("current version not found");

  return {
    currency,
    regularCents,
    finalCents,
    discountPercent: percentOff(regularCents, finalCents),
    saleEndsAt: null,
    isFree: isFree || (regularCents === 0 && finalCents === 0),
    isReleased: true,
    rating,
    reviewCount,
    version: version.trim(),
  };
}

function unityUrl(entry: CatalogEntry): string {
  if (!ENDPOINTS.unityOrigin) return entry.url;
  const u = new URL(entry.url);
  return new URL(u.pathname + u.search, ENDPOINTS.unityOrigin).href;
}

async function readUnity(entries: CatalogEntry[]): Promise<Readings> {
  const out: Readings = new Map();
  for (const entry of entries) {
    try {
      const html = await fetchText(unityUrl(entry), BROWSER_AGENT, { Accept: "text/html" }, PAGE_TIMEOUT_MS);
      out.set(keyOf(entry), { ok: true, reading: parseAssetStore(html, entry.id) });
    } catch (e) {
      out.set(keyOf(entry), fail(errText(e)));
    }
  }
  return out;
}

// ---------------------------------------------------------------------------------------------
// Validation: anything odd keeps the previous value instead of reaching the site.

export function validate(r: Reading, previous?: StoreOffer): string | null {
  if (r.currency !== "USD") return `currency is ${JSON.stringify(r.currency)}, expected USD`;
  for (const [name, v] of [["regularCents", r.regularCents], ["finalCents", r.finalCents]] as const) {
    if (v !== null && (!Number.isInteger(v) || v < 0 || v > MAX_CENTS)) return `${name} is ${v}`;
  }
  if ((r.regularCents === null) !== (r.finalCents === null)) return "one price is missing";
  if (r.regularCents === null || r.finalCents === null) {
    if (r.isReleased) return "released but has no price";
  } else {
    if (r.isFree && r.finalCents !== 0) return "marked free but has a price";
    if (!r.isFree && r.isReleased && (r.finalCents === 0 || r.regularCents === 0)) return "price is zero for a paid product";
    if (r.finalCents > r.regularCents) return "sale price is above the regular price";
  }
  if (!Number.isInteger(r.discountPercent) || r.discountPercent < 0) return `discount is ${r.discountPercent}`;
  if (r.discountPercent > MAX_DISCOUNT) return `discount of ${r.discountPercent}% is over ${MAX_DISCOUNT}%`;
  const reduced = r.regularCents !== null && r.finalCents !== null && r.finalCents < r.regularCents;
  if (reduced !== r.discountPercent > 0) return "discount and prices disagree";
  if (r.saleEndsAt !== null) {
    if (r.discountPercent === 0) return "sale end date without a sale";
    if (Number.isNaN(Date.parse(r.saleEndsAt))) return "sale end date is not a date";
  }
  const before = previous?.regularCents;
  if (before && r.regularCents) {
    const ratio = r.regularCents / before;
    if (ratio > MAX_PRICE_RATIO || ratio < 1 / MAX_PRICE_RATIO) {
      return `regular price moved from ${before} to ${r.regularCents} cents (more than ×${MAX_PRICE_RATIO})`;
    }
  }
  if (r.rating !== undefined && !(Number.isFinite(r.rating) && r.rating >= 0 && r.rating <= 5)) return `rating is ${r.rating}`;
  if (r.reviewCount !== undefined && !(Number.isInteger(r.reviewCount) && r.reviewCount >= 0)) return `review count is ${r.reviewCount}`;
  if (r.version !== undefined && !/^[\w.+\- ]{1,40}$/.test(r.version)) return `version is ${JSON.stringify(r.version)}`;
  return null;
}

// ---------------------------------------------------------------------------------------------
// Assembling, comparing, printing

const EMPTY: StoreSnapshot = { fetchedAt: "", products: {} };

/** Fields that decide whether the site needs a redeploy. Timestamps are left out on purpose. */
const COMPARED = [
  "url",
  "currency",
  "regularCents",
  "finalCents",
  "discountPercent",
  "saleEndsAt",
  "isFree",
  "isReleased",
  "rating",
  "reviewCount",
  "version",
] as const satisfies ReadonlyArray<keyof StoreOffer>;

export function merge(readings: Readings, baseline: StoreSnapshot, now: Date, catalog = STORE_CATALOG) {
  const products: StoreSnapshot["products"] = {};
  let failures = 0;
  for (const entry of catalog) {
    const previous = baseline.products[entry.slug]?.[entry.store];
    const result = readings.get(keyOf(entry)) ?? fail("not read");
    const problem = result.ok ? validate(result.reading, previous) : result.reason;
    let offer: StoreOffer | undefined;
    if (result.ok && !problem) {
      offer = { url: entry.url, ...result.reading, checkedAt: now.toISOString() };
    } else {
      failures++;
      if (previous) {
        offer = { ...previous, url: entry.url };
        warn(`${keyOf(entry)}: ${problem}; kept the previous value (checked ${previous.checkedAt})`);
      } else {
        warn(`${keyOf(entry)}: ${problem}; no previous value, so it is left out`);
      }
    }
    if (offer) (products[entry.slug] ??= {})[entry.store] = offer;
  }
  // Never drop a product: anything the baseline has that the catalog no longer lists stays.
  for (const [slug, stores] of Object.entries(baseline.products)) {
    for (const [store, offer] of Object.entries(stores) as Array<[PricedStore, StoreOffer]>) {
      if (products[slug]?.[store]) continue;
      if (!catalog.some((e) => e.slug === slug && e.store === store)) {
        warn(`${slug}/${store} is in the data but not in src/data/storeCatalog.ts; kept. Delete it from src/data/store.json by hand if it is gone for good.`);
      }
      (products[slug] ??= {})[store] = offer;
    }
  }
  return { snapshot: { fetchedAt: now.toISOString(), products } satisfies StoreSnapshot, failures };
}

export function diff(a: StoreSnapshot, b: StoreSnapshot): string[] {
  const lines: string[] = [];
  const slugs = new Set([...Object.keys(a.products), ...Object.keys(b.products)]);
  for (const slug of slugs) {
    const stores = new Set([...Object.keys(a.products[slug] ?? {}), ...Object.keys(b.products[slug] ?? {})]) as Set<PricedStore>;
    for (const store of stores) {
      const x = a.products[slug]?.[store];
      const y = b.products[slug]?.[store];
      if (!x || !y) {
        lines.push(`${slug}/${store}: ${x ? "removed" : "added"}`);
        continue;
      }
      for (const f of COMPARED) {
        if ((x[f] ?? null) !== (y[f] ?? null)) lines.push(`${slug}/${store}: ${f} ${JSON.stringify(x[f] ?? null)} -> ${JSON.stringify(y[f] ?? null)}`);
      }
    }
  }
  return lines;
}

const money = (c: number | null) => (c === null ? "no price" : `$${(c / 100).toFixed(2)}`);

function describe(o: StoreOffer): string {
  const parts: string[] = [];
  if (o.isFree) parts.push("free");
  else if (o.discountPercent > 0) parts.push(`${money(o.finalCents)} (was ${money(o.regularCents)}, -${o.discountPercent}%${o.saleEndsAt ? `, ends ${o.saleEndsAt}` : ""})`);
  else parts.push(money(o.finalCents));
  if (!o.isReleased) parts.push("not released");
  if (o.rating !== undefined) parts.push(`rating ${o.rating} (${o.reviewCount} reviews)`);
  if (o.version !== undefined) parts.push(`v${o.version}`);
  return parts.join(", ");
}

async function loadSnapshot(source: string): Promise<StoreSnapshot> {
  let text: string;
  if (/^https?:\/\//i.test(source)) {
    // Bust the Pages CDN cache (10 minutes) so the comparison sees what is live now.
    const url = new URL(source);
    url.searchParams.set("t", String(Date.now()));
    text = await fetchText(url.href, API_AGENT, { Accept: "application/json", "Cache-Control": "no-cache" });
  } else {
    text = await readFile(path.resolve(source), "utf8");
  }
  const data: unknown = JSON.parse(text);
  if (!isObj(data) || !isObj(data.products) || typeof data.fetchedAt !== "string") throw new Error("not store data");
  return data as unknown as StoreSnapshot;
}

async function writeJson(file: string, data: StoreSnapshot) {
  await mkdir(path.dirname(path.resolve(file)), { recursive: true });
  await writeFile(path.resolve(file), JSON.stringify(data, null, 2) + "\n");
}

/** Read every store and merge with the baseline. Exported for scripts/build.mts. */
export async function collect(baseline: StoreSnapshot, now = new Date()) {
  const byStore = (store: PricedStore) => STORE_CATALOG.filter((e) => e.store === store);
  // The three stores are independent: one failing or hanging never holds up the others.
  const settled = await Promise.allSettled([
    readSteam(byStore("steam"), baseline),
    readNintendo(byStore("switch"), now),
    readUnity(byStore("unity")),
  ]);
  const readings: Readings = new Map();
  for (const s of settled) {
    if (s.status === "fulfilled") for (const [k, v] of s.value) readings.set(k, v);
  }
  return { ...merge(readings, baseline, now), readings };
}

// ---------------------------------------------------------------------------------------------
// Self-test against saved responses

async function selfTest(): Promise<number> {
  const fixture = (name: string) => readFile(path.join(FIXTURES, name), "utf8");
  const now = new Date("2026-11-21T12:00:00Z");
  let failed = 0;
  const check = (name: string, fn: () => void) => {
    try {
      fn();
      console.log(`  ok    ${name}`);
    } catch (e) {
      failed++;
      console.log(`  FAIL  ${name}\n        ${errText(e).split("\n").join("\n        ")}`);
    }
  };
  const reading = (r: Result | undefined): Reading => {
    if (!r?.ok) throw new Error(`expected a reading, got ${r ? r.reason : "nothing"}`);
    return r.reading;
  };
  const base = { currency: "USD", discountPercent: 0, saleEndsAt: null, isFree: false, isReleased: true };
  const nintendoJson = await fixture("nintendo-price.json");
  const unitySale = await fixture("unity-284559-sale.html");
  const unityFull = await fixture("unity-284559-full-price.html");

  console.log("[store] self-test");
  const steam = parseSteamItems(JSON.parse(await fixture("steam-getitems.json")), ["3847950", "1817070", "4029810", "537680", "252950", "999"]);
  check("steam: full price (Hypno Halo)", () =>
    assert.deepEqual(reading(steam.get("3847950")), { ...base, regularCents: 1999, finalCents: 1999 }));
  check("steam: discounted, end date from active_discounts", () =>
    assert.deepEqual(reading(steam.get("1817070")), {
      ...base, regularCents: 5999, finalCents: 2399, discountPercent: 60, saleEndsAt: "2026-12-01T18:00:00.000Z",
    }));
  check("steam: free and released (Hypno Halo Demo)", () =>
    assert.deepEqual(reading(steam.get("4029810")), { ...base, regularCents: 0, finalCents: 0, isFree: true }));
  check("steam: free and unreleased (Sheep Tag 2)", () =>
    assert.deepEqual(reading(steam.get("537680")), { ...base, regularCents: 0, finalCents: 0, isFree: true, isReleased: false }));
  check("steam: released with no purchase option is refused", () => assert.equal(steam.get("252950")?.ok, false));
  check("steam: app missing from the response is refused", () => assert.equal(steam.get("999")?.ok, false));
  check("steam: a broken response fails every app", () =>
    assert.equal(parseSteamItems({ error: 1 }, ["3847950"]).get("3847950")?.ok, false));

  const details: Json = JSON.parse(await fixture("steam-appdetails.json"));
  check("steam fallback: discounted", () =>
    assert.deepEqual(parseSteamAppDetails(details, "1817070"), { ...base, regularCents: 5999, finalCents: 2399, discountPercent: 60 }));
  check("steam fallback: keeps the end date of the same sale", () => {
    const prev = { ...base, url: "", checkedAt: "", regularCents: 5999, finalCents: 2399, discountPercent: 60, saleEndsAt: "2026-12-01T18:00:00.000Z" };
    assert.equal(parseSteamAppDetails(details, "1817070", prev).saleEndsAt, "2026-12-01T18:00:00.000Z");
  });
  check("steam fallback: full price", () =>
    assert.deepEqual(parseSteamAppDetails(details, "3847950"), { ...base, regularCents: 1999, finalCents: 1999 }));
  check("steam fallback: unreleased free game keeps free from the previous value", () => {
    const prev = { ...base, url: "", checkedAt: "", regularCents: 0, finalCents: 0, isFree: true, isReleased: false };
    assert.deepEqual(parseSteamAppDetails(details, "537680", prev), { ...base, regularCents: 0, finalCents: 0, isFree: true, isReleased: false });
  });
  check("steam fallback: released with no price and no free history is refused", () =>
    assert.throws(() => parseSteamAppDetails(details, "4029810")));

  const ns = parseNintendoPrices(JSON.parse(nintendoJson), ["70010000112025", "70010000003967", "70010000000001"], now);
  check("nintendo: off sale (Hypno Halo)", () =>
    assert.deepEqual(reading(ns.get("70010000112025")), { ...base, regularCents: 1999, finalCents: 1999 }));
  check("nintendo: on sale, percentage computed", () =>
    assert.deepEqual(reading(ns.get("70010000003967")), {
      ...base, regularCents: 1999, finalCents: 799, discountPercent: 60, saleEndsAt: "2026-12-07T07:59:59.000Z",
    }));
  check("nintendo: not_found is refused", () => assert.equal(ns.get("70010000000001")?.ok, false));
  check("nintendo: a discount that has not started is ignored", () => {
    const early = parseNintendoPrices(JSON.parse(nintendoJson),["70010000003967"], new Date("2026-11-10T00:00:00Z"));
    assert.equal(reading(early.get("70010000003967")).finalCents, 1999);
  });

  const unity = { rating: 5, reviewCount: 34, version: "1.11.0", isReleased: true, isFree: false, currency: "USD" };
  check("unity: on sale (package 284559, not the other products on the page)", () =>
    assert.deepEqual(parseAssetStore(unitySale, "284559"), { ...base, ...unity, regularCents: 4999, finalCents: 2499, discountPercent: 50 }));
  check("unity: full price", () =>
    assert.deepEqual(parseAssetStore(unityFull, "284559"), { ...base, ...unity, regularCents: 4999, finalCents: 4999 }));
  check("unity: JSON-LD disagreeing with the page state is refused", () =>
    assert.throws(() => parseAssetStore(unitySale.replace('"price": "24.99"', '"price": "19.99"'), "284559"), /disagrees/));
  check("unity: a page without the package is refused", () => assert.throws(() => parseAssetStore(unitySale, "1")));

  const paid = { ...base, regularCents: 1999, finalCents: 1999 };
  const prev: StoreOffer = { ...paid, url: "", checkedAt: "" };
  check("validate: a normal price passes", () => assert.equal(validate(paid, prev), null));
  check("validate: zero for a paid product", () => assert.match(validate({ ...paid, finalCents: 0, discountPercent: 100 }) ?? "", /./));
  check("validate: discount over 95%", () => assert.match(validate({ ...paid, finalCents: 50, discountPercent: 97 }) ?? "", /over 95/));
  check("validate: regular price moved more than x3", () => assert.match(validate({ ...paid, regularCents: 9999, finalCents: 9999 }, prev) ?? "", /moved/));
  check("validate: not a number", () => assert.match(validate({ ...paid, finalCents: Number.NaN }) ?? "", /finalCents/));
  check("validate: not USD", () => assert.match(validate({ ...paid, currency: "EUR" }) ?? "", /USD/));

  const entry: CatalogEntry = { slug: "x", store: "steam", id: "1", url: "https://example.com/", name: "X" };
  const baseline: StoreSnapshot = { fetchedAt: "then", products: { x: { steam: { ...prev, checkedAt: "then" } }, gone: { steam: prev } } };
  const silence = console.warn;
  console.warn = () => {};
  const kept = merge(new Map([["x/steam", fail("down")]]), baseline, now, [entry]);
  const bad = merge(new Map([["x/steam", { ok: true, reading: { ...paid, finalCents: 0, discountPercent: 100 } } as Result]]), baseline, now, [entry]);
  const fresh = merge(new Map([["x/steam", { ok: true, reading: { ...paid, finalCents: 999, discountPercent: 50 } } as Result]]), baseline, now, [entry]);
  console.warn = silence;
  warnings.length = 0;
  check("merge: a failed read keeps the previous value and its checkedAt", () =>
    assert.deepEqual(kept.snapshot.products.x?.steam, { ...prev, url: "https://example.com/", checkedAt: "then" }));
  check("merge: an invalid read keeps the previous value", () => assert.equal(bad.snapshot.products.x?.steam?.finalCents, 1999));
  check("merge: never drops a product the catalog no longer lists", () => assert.ok(fresh.snapshot.products.gone?.steam));
  check("diff: ignores timestamps", () =>
    assert.deepEqual(diff(kept.snapshot, { ...kept.snapshot, fetchedAt: "other" }), []));
  check("diff: sees a sale", () => assert.deepEqual(diff(kept.snapshot, fresh.snapshot), [
    "x/steam: finalCents 1999 -> 999",
    "x/steam: discountPercent 0 -> 50",
  ]));

  console.log(failed ? `[store] self-test: ${failed} failed` : "[store] self-test: all passed");
  return failed ? 1 : 0;
}

// ---------------------------------------------------------------------------------------------
// Command line

const USAGE = `Usage: tsx scripts/store-data.mts [--write] [--out <file>] [--changed-against <file|url>]
                                  [--baseline <file|url>] [--strict] [--self-test]`;

/** Runs the command and returns the exit code. scripts/build.mts calls this with ["--write"]. */
export async function runStoreData(argv: string[]): Promise<number> {
  const opts = { write: false, strict: false, selfTest: false, out: "", against: "", baseline: "" };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const value = () => {
      const v = argv[++i];
      if (!v || v.startsWith("--")) throw new Error(`${a} needs a value`);
      return v;
    };
    if (a === "--write") opts.write = true;
    else if (a === "--strict") opts.strict = true;
    else if (a === "--self-test") opts.selfTest = true;
    else if (a === "--out") opts.out = value();
    else if (a === "--changed-against") opts.against = value();
    else if (a === "--baseline") opts.baseline = value();
    else if (a === "--help" || a === "-h") {
      console.log(USAGE);
      return 0;
    } else throw new Error(`unknown argument ${a}\n${USAGE}`);
  }
  if (opts.selfTest) return selfTest();

  // The committed snapshot is the fallback for every failed read, unless a baseline says
  // otherwise. In CI the baseline is the live site's copy, so a store that is down from a
  // runner keeps what visitors already see instead of reverting to an older commit.
  let snapshot = EMPTY;
  try {
    snapshot = await loadSnapshot(SNAPSHOT_PATH);
  } catch (e) {
    warn(`could not read src/data/store.json (${errText(e)}); starting empty`);
  }

  let against: StoreSnapshot | undefined;
  let againstProblem = "";
  if (opts.against) {
    try {
      against = await loadSnapshot(opts.against);
    } catch (e) {
      againstProblem = errText(e);
    }
  }
  let baseline = snapshot;
  const baselineSource = opts.baseline || (against ? opts.against : "");
  if (opts.baseline) {
    try {
      baseline = await loadSnapshot(opts.baseline);
    } catch (e) {
      warn(`could not read the baseline ${opts.baseline} (${errText(e)}); using src/data/store.json`);
    }
  } else if (against) {
    baseline = against;
  }
  if (baselineSource && baseline !== snapshot) log(`previous values come from ${baselineSource}`);

  const { snapshot: fresh, failures, readings } = await collect(baseline);

  console.log("");
  for (const entry of STORE_CATALOG) {
    const offer = fresh.products[entry.slug]?.[entry.store];
    const r = readings.get(keyOf(entry));
    const tag = r?.ok ? (r.via ? `ok (${r.via})` : "ok") : "KEPT PREVIOUS";
    console.log(`  ${keyOf(entry).padEnd(40)} ${(offer ? describe(offer) : "missing").padEnd(70)} ${tag}`);
  }
  console.log("");

  const changes = diff(snapshot, fresh);
  log(changes.length ? `differs from src/data/store.json:\n    ${changes.join("\n    ")}` : "same as src/data/store.json");

  if (opts.write) {
    await writeJson(SNAPSHOT_PATH, fresh);
    log("wrote src/data/store.json");
  }
  if (opts.out) {
    await writeJson(opts.out, fresh);
    log(`wrote ${opts.out}`);
  }

  if (opts.against) {
    let changed = false;
    if (!against) {
      log(`cannot read ${opts.against} (${againstProblem}); reporting no change, so nothing is deployed`);
    } else {
      const lines = diff(against, fresh);
      changed = lines.length > 0;
      log(changed ? `changed against ${opts.against}:\n    ${lines.join("\n    ")}` : `no change against ${opts.against}`);
    }
    console.log(`changed=${changed}`);
    if (process.env.GITHUB_OUTPUT) await appendFile(process.env.GITHUB_OUTPUT, `changed=${changed}\n`);
  }

  if (failures) log(`${failures} read(s) failed; see the warnings above`);
  return opts.strict && (failures > 0 || (!!opts.against && !against)) ? 1 : 0;
}

const invokedDirectly =
  !!process.argv[1] && path.resolve(process.argv[1]).toLowerCase() === fileURLToPath(import.meta.url).toLowerCase();
if (invokedDirectly) {
  runStoreData(process.argv.slice(2)).then(
    (code) => process.exit(code),
    (e) => {
      console.error(`[store] ${errText(e)}`);
      process.exit(2);
    },
  );
}
