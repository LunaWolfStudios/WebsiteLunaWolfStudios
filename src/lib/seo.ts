/**
 * JSON-LD builders. Every page already gets Organization and WebSite (and BreadcrumbList
 * when it passes `breadcrumbs`) from BaseLayout. Pages add their own nodes with these
 * builders and pass them as `jsonLd`; the layout merges everything into one `@graph`.
 *
 *   import { serviceLd, faqLd } from "../../lib/seo";
 *   const jsonLd = [
 *     serviceLd({ name: "Unity development", description, url: "/services/unity-development/" }),
 *     faqLd(faqs),
 *   ];
 *   <BaseLayout title=... description=... breadcrumbs=[...] jsonLd={jsonLd}>
 *
 * Every builder returns a plain object without `@context` (the layout adds it once) and
 * points at the studio by `@id`, so search engines join the nodes into one entity. Relative
 * URLs are made absolute against the site origin. Only pass facts that are on the page.
 */
import { SITE } from "../data/site";
import { SAME_AS } from "../data/links";
import { FOUNDERS } from "../data/team";

export type JsonLd = Record<string, unknown>;

export const ORG_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;
const orgRef = { "@id": ORG_ID };

/** Absolute URL on the site origin. Leaves absolute URLs alone. */
export const abs = (url: string) => new URL(url, SITE.url).href;

/** Drop undefined, null, empty strings and empty arrays so the output stays tidy. */
function clean<T extends JsonLd>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v !== undefined && v !== null && v !== "" && !(Array.isArray(v) && v.length === 0),
    ),
  ) as T;
}

/**
 * The studio itself. The whole node is emitted on every page, so no page adds to it: a page
 * that needs to point at the studio uses `{ "@id": ORG_ID }`.
 */
export function organizationLd(): JsonLd {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    alternateName: SITE.alternateName,
    description: SITE.description,
    url: `${SITE.url}/`,
    logo: {
      "@type": "ImageObject",
      url: abs("/icon-512.png"),
      width: 512,
      height: 512,
    },
    image: abs(SITE.ogImage),
    email: SITE.email,
    foundingDate: SITE.foundingDate,
    foundingLocation: {
      "@type": "Place",
      name: `${SITE.address.locality}, Delaware, USA`,
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.address.locality,
        addressRegion: SITE.address.region,
        addressCountry: SITE.address.country,
      },
    },
    // Names exactly as the site prints them (CLAUDE.md): first names only for two founders.
    founder: FOUNDERS.map((f) => ({ "@type": "Person", "@id": `${abs(f.page)}#person`, name: f.name, url: abs(f.page) })),
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    contactPoint: [
      { "@type": "ContactPoint", contactType: "customer support", email: SITE.email, url: abs("/contact/"), availableLanguage: "English" },
      { "@type": "ContactPoint", contactType: "sales", email: SITE.email, url: abs("/contact/"), availableLanguage: "English" },
    ],
    sameAs: SAME_AS,
    knowsAbout: [...SITE.knowsAbout],
  };
}

export function webSiteLd(): JsonLd {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE.name,
    url: `${SITE.url}/`,
    inLanguage: "en-US",
    publisher: orgRef,
  };
}

export function breadcrumbLd(items: Array<{ label: string; href: string }>): JsonLd {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: abs(item.href),
    })),
  };
}

export function serviceLd(o: {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
  areaServed?: string;
  /** Names of projects or offers that belong to the service. */
  offers?: string[];
}): JsonLd {
  return clean({
    "@type": "Service",
    "@id": `${abs(o.url)}#service`,
    name: o.name,
    serviceType: o.serviceType ?? o.name,
    description: o.description,
    url: abs(o.url),
    provider: orgRef,
    areaServed: o.areaServed ?? "Worldwide",
    hasOfferCatalog: o.offers?.length
      ? {
          "@type": "OfferCatalog",
          name: o.name,
          itemListElement: o.offers.map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name },
          })),
        }
      : undefined,
  });
}

export function videoGameLd(o: {
  name: string;
  description: string;
  url: string;
  image?: string;
  genre?: string[];
  gamePlatform?: string[];
  playMode?: string[];
  datePublished?: string;
  /** Who made it, when it is not the studio (the studio is then the publisher). */
  developer?: string;
  /** Store and official pages for sameAs. */
  sameAs?: string[];
  /**
   * Live store offers, from `offerLd()` in src/lib/store.ts (it returns undefined for an
   * unreleased item, so pass the results unfiltered). Preferred over `offersUrl`.
   */
  offers?: Array<JsonLd | undefined>;
  offersUrl?: string;
  /** Recognition, worded as src/data/awards.ts words it. */
  award?: string | string[];
  trailer?: { id: string; name: string; description: string; uploadDate?: string; thumbnail?: string };
}): JsonLd {
  const offers = o.offers?.filter((x): x is JsonLd => Boolean(x)) ?? [];
  return clean({
    "@type": "VideoGame",
    "@id": `${abs(o.url)}#game`,
    name: o.name,
    description: o.description,
    url: abs(o.url),
    image: o.image ? abs(o.image) : undefined,
    genre: o.genre,
    gamePlatform: o.gamePlatform,
    playMode: o.playMode,
    datePublished: o.datePublished,
    author: o.developer ? { "@type": "Organization", name: o.developer } : orgRef,
    publisher: orgRef,
    sameAs: o.sameAs,
    award: o.award,
    offers: offers.length ? offers : o.offersUrl ? { "@type": "Offer", url: o.offersUrl } : undefined,
    trailer: o.trailer ? videoObjectLd(o.trailer) : undefined,
  });
}

export function softwareApplicationLd(o: {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  operatingSystem?: string;
  image?: string;
  softwareVersion?: string;
  /**
   * Live store offers, from `offerLd()` in src/lib/store.ts. Preferred over `offersUrl` and
   * `price`, which stay for products with no store data.
   */
  offers?: Array<JsonLd | undefined>;
  offersUrl?: string;
  price?: string;
  priceCurrency?: string;
  /** Recognition, worded as src/data/awards.ts words it. */
  award?: string | string[];
  sameAs?: string[];
}): JsonLd {
  const offers = o.offers?.filter((x): x is JsonLd => Boolean(x)) ?? [];
  return clean({
    "@type": "SoftwareApplication",
    "@id": `${abs(o.url)}#software`,
    name: o.name,
    description: o.description,
    url: abs(o.url),
    image: o.image ? abs(o.image) : undefined,
    applicationCategory: o.applicationCategory ?? "DeveloperApplication",
    operatingSystem: o.operatingSystem,
    author: orgRef,
    publisher: orgRef,
    softwareVersion: o.softwareVersion,
    sameAs: o.sameAs,
    award: o.award,
    offers: offers.length
      ? offers
      : o.offersUrl || o.price
        ? clean({ "@type": "Offer", url: o.offersUrl, price: o.price, priceCurrency: o.priceCurrency })
        : undefined,
  });
}

export function personLd(o: {
  name: string;
  url: string;
  jobTitle?: string;
  description?: string;
  image?: string;
  sameAs?: string[];
  knowsAbout?: string[];
}): JsonLd {
  return clean({
    "@type": "Person",
    "@id": `${abs(o.url)}#person`,
    name: o.name,
    url: abs(o.url),
    jobTitle: o.jobTitle,
    description: o.description,
    image: o.image ? abs(o.image) : undefined,
    worksFor: orgRef,
    sameAs: o.sameAs,
    knowsAbout: o.knowsAbout,
  });
}

/** Questions and answers as plain text (strip HTML before passing). */
export function faqLd(items: Array<{ q: string; a: string }>): JsonLd {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a.replace(/<[^>]+>/g, "") },
    })),
  };
}

export function videoObjectLd(o: {
  id: string;
  name: string;
  description: string;
  uploadDate?: string;
  /** Poster URL on this site; defaults to YouTube's own thumbnail. */
  thumbnail?: string;
}): JsonLd {
  return clean({
    "@type": "VideoObject",
    name: o.name,
    description: o.description,
    thumbnailUrl: o.thumbnail ? abs(o.thumbnail) : `https://i.ytimg.com/vi/${o.id}/hqdefault.jpg`,
    uploadDate: o.uploadDate,
    contentUrl: `https://www.youtube.com/watch?v=${o.id}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${o.id}`,
    publisher: orgRef,
  });
}

export function courseLd(o: {
  name: string;
  description: string;
  url: string;
  /** "online", "onsite" or "blended". */
  courseMode?: string;
  educationalCredentialAwarded?: string;
  isAccessibleForFree?: boolean;
}): JsonLd {
  return clean({
    "@type": "Course",
    "@id": `${abs(o.url)}#course`,
    name: o.name,
    description: o.description,
    url: abs(o.url),
    provider: orgRef,
    isAccessibleForFree: o.isAccessibleForFree,
    educationalCredentialAwarded: o.educationalCredentialAwarded,
    hasCourseInstance: o.courseMode ? { "@type": "CourseInstance", courseMode: o.courseMode } : undefined,
  });
}

/**
 * Merge the site-wide nodes with a page's own into one JSON-LD document. Used by
 * BaseLayout; pages never call it.
 */
export function graph(nodes: JsonLd[]): string {
  // `<` is escaped so a string can never close the script element early.
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }).replace(/</g, "\\u003c");
}
