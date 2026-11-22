/**
 * Studio facts and site-wide configuration. Facts come from CLAUDE.md ("Studio facts") and
 * archive/; do not add one that is not sourced there.
 */
export const SITE = {
  name: "Luna Wolf Studios",
  legalName: "Luna Wolf Studios, LLC",
  url: "https://lunawolfstudios.com",
  email: "support@lunawolfstudios.com",
  /** Default <title> and description, used only when a page passes none (every page should). */
  title: "Luna Wolf Studios | Game and software development studio",
  description:
    "Luna Wolf Studios is an independent game and software development studio in Newark, Delaware. We build games, Unity tools, VR and AR, and serious games.",
  tagline: "Game and software development studio",
  ogImage: "/og-default.png",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  locale: "en_US",
  foundingDate: "2015-01",
  /** How the founding reads in copy (old About page; WilmU News, 2018-06-19). */
  founded: "January 2015",
  foundedBy: "three Wilmington University students",
  foundingLocation: "Newark, Delaware",
  /** The name the Unity Asset Store and the Unity Awards use; Organization.alternateName. */
  alternateName: "Luna Wolf Studios LLC",
  address: { locality: "Newark", region: "DE", country: "US" },
  /** Service areas, emitted as Organization.knowsAbout. */
  knowsAbout: [
    "Game development",
    "Unity development",
    "VR and AR development",
    "Serious games",
    "Software development",
    "Game publishing",
  ],
  /** Brand colours for the browser UI, one per theme (keep in sync with tokens.css --lw-bg). */
  themeColor: { dark: "#04070a", light: "#f3f8f8" },
} as const;

/**
 * Website analytics. With provider "none" no analytics script is loaded at all. Either
 * provider is injected by BaseLayout after the window `load` event, in an idle callback, so
 * it never competes with the page. Both are cookieless (archive/research/platform-decisions.md
 * section 3). The privacy policy names whichever one is switched on.
 *
 * - "goatcounter": set `goatcounterCode` to the site code, the part before
 *   `.goatcounter.com` in the dashboard address.
 * - "metricool": set `metricoolHash` to this brand's tracker hash. Each Metricool brand has
 *   its own; do not reuse the Sheep Tag 2 hash.
 */
export const ANALYTICS = {
  provider: "none" as "none" | "goatcounter" | "metricool",
  goatcounterCode: "",
  metricoolHash: "",
};

/**
 * Form relays. The site is static, so forms post to a relay that emails the studio.
 *
 * contact.endpoint is the FormSubmit.co AJAX endpoint for support@lunawolfstudios.com (the
 * random string hides the address from scrapers). The plain endpoint, used when JavaScript
 * is off, is the same URL without `/ajax`.
 *
 * newsletter is the seam for a mailing-list provider:
 * - provider "relay": signups are emailed through the contact relay with the subject
 *   "Newsletter signup". This is the default until the Kit form exists, so the form works
 *   from the first day.
 * - provider "kit": the chosen provider (archive/research/platform-decisions.md section 1).
 *   Set `kitFormId` to the number in the form's embed code
 *   (`https://app.kit.com/forms/<id>/subscriptions`) and copy any hidden inputs from Kit's
 *   HTML embed into `hiddenFields`. The form posts there directly; with JavaScript the
 *   visitor stays on the page and is told to confirm by email.
 * - provider "custom": any other provider. Set `action` to its form POST URL, `emailField`
 *   to the field name it expects, and `hiddenFields` to any fixed fields it needs. The form
 *   posts as a plain HTML form; set `ajax: true` only if the provider accepts a cross-origin
 *   fetch.
 */
export const FORMS = {
  contact: {
    endpoint: "https://formsubmit.co/ajax/2fae3dfa5af1f28e5650fe157a7867ef",
  },
  newsletter: {
    provider: "relay" as "relay" | "kit" | "custom",
    kitFormId: "",
    action: "",
    emailField: "email",
    hiddenFields: {} as Record<string, string>,
    ajax: false,
  },
};

/** Kit's subscribe endpoint for a form ID. */
export const kitAction = (formId: string) => `https://app.kit.com/forms/${formId}/subscriptions`;

/** The non-AJAX twin of a FormSubmit endpoint, for no-JS form posts. */
export const plainEndpoint = (ajaxEndpoint: string) => ajaxEndpoint.replace("/ajax/", "/");
