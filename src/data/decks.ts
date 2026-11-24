/**
 * The pitch decks: one short, generic deck per service, at /decks/<slug>/ with a PDF beside
 * them. This file is the one record of each deck's identity. The /decks/ index reads it, and
 * the generator (scripts/decks/build.mts) takes each deck's cover from it and fails the build
 * if a deck's slide count no longer matches `slides` here.
 *
 * The decks are unlisted: noindex, out of the sitemap, and linked from no other page.
 * Plain TypeScript, no Astro imports: the build script reads it.
 */

export interface DeckMeta {
  slug: string;
  /** Short name: the page <title> (with " | Luna Wolf Studios", 60 characters or fewer). */
  name: string;
  /** The deck in running text, for link names: "View the health games deck". */
  label: string;
  /** The cover's eyebrow. */
  eyebrow: string;
  /** The cover's one title, in the words people search for. */
  title: string;
  /** One line: what we build and for whom. Also the deck page's meta description. */
  lead: string;
  /** Slides in the deck (the generator checks it). */
  slides: number;
  /** The deck's lead project art, under src/assets/. */
  image: string;
  imageAlt: string;
}

/** In index order. */
export const DECKS: DeckMeta[] = [
  {
    slug: "health-games",
    label: "health games",
    name: "Health games",
    eyebrow: "Health games",
    title: "Healthcare game and VR therapy development",
    lead: "We build games and VR apps that assess, treat, and teach, working with clinicians and researchers.",
    slides: 8,
    image: "games/helix/helix-pure-tone-crop.jpg",
    imageAlt: "The pure tone test in HELIX: cartoon animals stand along a path while the game asks which ear heard the tone.",
  },
  {
    slug: "serious-games",
    label: "serious games",
    name: "Serious games and training simulations",
    eyebrow: "Serious games",
    title: "Serious games and training simulations",
    lead: "We design and build games that teach, train, and assess, for healthcare, education, and workplace training.",
    slides: 7,
    image: "portfolio/discover-td-screens.jpg",
    imageAlt:
      "Three screens from Discover TD: the title screen, a choice of six virtual patients, and a seated virtual patient being examined for movement in the face, trunk, and limbs.",
  },
  {
    slug: "playable-ads",
    label: "playable ads",
    name: "Playable ads",
    eyebrow: "Playable ads",
    title: "Playable ad development",
    lead: "Short interactive ads that people play instead of watch, made by a studio that ships its own games.",
    slides: 9,
    image: "portfolio/level-one-screens.jpg",
    imageAlt:
      "Three phone screens from Level One: a level about blood sugar, a food album of meals to count carbs for, and insulin moving through the bloodstream.",
  },
  {
    slug: "mobile-games",
    label: "mobile game development",
    name: "Mobile game development",
    eyebrow: "Mobile games",
    title: "Mobile game development",
    lead: "We build Unity games and apps for iOS and Android, or join your team on a game already in production.",
    slides: 7,
    image: "portfolio/warcodes.jpg",
    imageAlt: "Warcodes art: two people scan products with their phones while the monsters they made sit on their shoulders.",
  },
  {
    slug: "vr-ar",
    label: "VR, AR, and IoT devices",
    name: "VR, AR, and IoT devices",
    eyebrow: "VR, AR, and IoT devices",
    title: "VR, AR, and IoT device development",
    lead: "We build VR and AR apps, and games for IoT and smart devices: Bluetooth and EMG sensors, anaglyph glasses, motion capture, computer vision, and smart toys.",
    slides: 8,
    image: "games/helix/helix-digits-in-noise.jpg",
    imageAlt: "The digits-in-noise test in HELIX: a player's VR controllers in front of a keypad of large numbers.",
  },
  {
    slug: "unity-development",
    label: "Unity development",
    name: "Unity development and co-development",
    eyebrow: "Unity development",
    title: "Unity development and co-development",
    lead: "Hire our Unity developers for a whole project or a defined piece of it: games, apps, editor tools, and upgrades.",
    slides: 7,
    image: "games/sheep-tag-2/key-art-logo.jpg",
    imageAlt: "Sheep Tag 2 key art with the game's logo: two sheep run across a farmyard while wolves close in behind them.",
  },
];

export const deckUrl = (slug: string) => `/decks/${slug}/`;
export const deckPdf = (slug: string) => `/decks/luna-wolf-studios-${slug}.pdf`;

export const deck = (slug: string): DeckMeta => {
  const d = DECKS.find((x) => x.slug === slug);
  if (!d) throw new Error(`[decks] No deck "${slug}".`);
  return d;
};
