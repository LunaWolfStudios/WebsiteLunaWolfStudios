/**
 * Quotes and reviews. The owner curates these, and his versions stand (CLAUDE.md copy rules):
 *
 * - The 18 quotes on the old home page ("Our Howling Reviews"), the quotes on the old Hypno
 *   Halo page, and the four intern testimonials are reproduced with the old site's text
 *   unchanged, including its deliberate trims. Never restore cut passages or reword a quote.
 * - Changed from the old site, as research verified: the Pocket Gamer writer's name
 *   ("Catherine Dellosa", was "Cathering"), the outlet name "IndieGameMag" (was
 *   "IndieGameMagazine"), the Freelancer link, and spelling and capitalisation slips in one
 *   intern testimonial ("i", "Luna wolf", "wasnt", "tought").
 * - New quotes (Asset Store reviews of Scriptable Sheets, the Higher Plain Games curator line)
 *   are the reviewer's own complete sentences, in their order, with nothing reworded and no
 *   feature requests, caveats, or criticism.
 * - A quote links to its source only where the linked page shows the quote or is the review
 *   itself. Judge quotes carry no link. IndieGameMag's page has been taken over, so its quote
 *   links the archived copy: the one archive link on the site.
 * - `verified: false` marks the quotes research could not find a source for (private judge
 *   feedback, unattributed testimonials, reviews that are gone). They are the owner's content
 *   and stay; the orchestrator lists them for him.
 *
 * Sources: archive/wordpress/pages/game-design-and-development.md, hypno-halo.md, bootcamp.md;
 * archive/research/reviews-partners-history.md, scriptable-sheets.md (and .json), games-steam.md.
 */
import { LINKS } from "./links";
import type { PressItem, Review } from "./types";

const ASSET_STORE = "Unity Asset Store";
const STEAM_CURATOR = "Steam Curator";

/** Every quote, home page order first. */
export const REVIEWS: Review[] = [
  // ─── Old home page, "Our Howling Reviews", in its order ────────────────────────────────
  {
    id: "home-01",
    quote:
      "Hypno Halo mesmerizes with minimalist design and pure mechanics. The loop feels meditative and addictive. Halo aesthetics soothe and pull you into chasing high scores",
    author: "OFEN™",
    source: STEAM_CURATOR,
    // The curator page now shows only the group overview, so the quote has no link. The old
    // Hypno Halo page shows the same quote ending in "…".
    about: "Hypno Halo",
    aboutSlug: "hypno-halo",
    kind: "curator",
    verified: false,
  },
  {
    id: "home-02",
    quote:
      "A minimalist and elegant scoring game. Ideal for those who appreciate simplicity and beauty of form. The halo appears as a symbol of infinity and harmony. A very addictive and peaceful game.",
    author: "SOKOL",
    source: STEAM_CURATOR,
    url: "https://steamcommunity.com/groups/-SOKOL-/curation/app/3847950/",
    about: "Hypno Halo",
    aboutSlug: "hypno-halo",
    kind: "curator",
    verified: true,
    note: "Translated from Russian",
    date: "2025-10-23",
  },
  {
    id: "home-03",
    quote:
      "This is incredibly powerful for my kind of a workflow. Being able to see every single member of a scriptable object in one view lets me see the bigger picture much more easily. Highly recommend this one.",
    author: "Quevanto",
    source: ASSET_STORE,
    url: LINKS.scriptableSheetsReviews,
    about: "Scriptable Sheets",
    aboutSlug: "scriptable-sheets",
    kind: "store",
    verified: true,
    date: "2025-09-27",
  },
  {
    id: "home-04",
    quote:
      "I can’t express enough how AMAZING this asset is! If you work with ScriptableObjects, or any serializable asset supported by this tool that you want to edit in List format, this is the asset to buy!",
    author: "Katerlad",
    source: ASSET_STORE,
    url: LINKS.scriptableSheetsReviews,
    about: "Scriptable Sheets",
    aboutSlug: "scriptable-sheets",
    kind: "store",
    verified: true,
    date: "2025-02-28",
  },
  {
    id: "home-05",
    quote:
      "So it’s come to this: I’ve reached the age where I get excited about an embedded spreadsheet tool. smh This is amazing! It helps structure my endless number of Scriptable Objects in my scene. Was about to write something myself, but this is well worth the money! <3",
    author: "deleo",
    source: ASSET_STORE,
    url: LINKS.scriptableSheetsReviews,
    about: "Scriptable Sheets",
    aboutSlug: "scriptable-sheets",
    kind: "store",
    verified: true,
    date: "2024-10-24",
  },
  {
    id: "home-06",
    quote:
      "Quite powerful – especially for larger projects. If you organize data using scriptable objects in your project, this asset is going to be a huge time saver. Definitely a must have asset in my opinion!",
    author: "RestingOwl",
    source: ASSET_STORE,
    url: LINKS.scriptableSheetsReviews,
    about: "Scriptable Sheets",
    aboutSlug: "scriptable-sheets",
    kind: "store",
    verified: true,
    date: "2025-02-26",
  },
  {
    id: "home-07",
    quote:
      "Peloton’s new gamified indoor cycling experience, Lanebreak, might be even more addicting than its workout classes. Spoiler alert: It’s a lot of fun.",
    author: "Angela Moscaritolo",
    source: "PCMag",
    url: "https://www.pcmag.com/news/peloton-lanebreak-test-riding-the-addictive-fitness-game",
    about: "Lanebreak by Peloton",
    aboutSlug: "lanebreak",
    kind: "press",
    verified: true,
    date: "2022-03-10",
  },
  {
    id: "home-08",
    quote:
      "Perhaps the best part of Lanebreak is that it got me back cycling after several months of not doing so. It really made me fall in love with cycling all over again.",
    author: "Nicole Lee",
    source: "Engadget",
    url: "https://www.engadget.com/peloton-lanebreak-irl-140011434.html",
    about: "Lanebreak by Peloton",
    aboutSlug: "lanebreak",
    kind: "press",
    verified: true,
    date: "2022-04-05",
  },
  {
    id: "home-09",
    quote:
      "For the first time, I can wrap my head around where immersive fitness might fit into the real world — and I like what I see.",
    author: "Victoria Song",
    source: "The Verge",
    url: "https://www.theverge.com/2023/6/28/23775357/peloton-tread-lanebreak-immersive-fitness",
    // The article is about Lanebreak on the Peloton Tread.
    about: "Lanebreak by Peloton",
    aboutSlug: "lanebreak",
    kind: "press",
    verified: true,
    date: "2023-06-28",
  },
  {
    id: "home-10",
    quote: "It’s like going deeper in Inception, and it’s extremely fun to play.",
    // The article's section is credited "Zach & Chris"; the old site credits Zach.
    author: "Zach",
    source: "Everything Action",
    url: "https://everythingaction.com/2017/09/21/gamebox-2-0-leatherface-legacy-edition/",
    about: "ParaLily",
    aboutSlug: "paralily",
    kind: "press",
    verified: true,
    date: "2017-09-21",
  },
  {
    id: "home-11",
    quote:
      "This game is spectacular. The puzzles are amazing, the art is amazing, the story is compelling and captivating. The game is very polished and a joy to play!",
    author: "Anonymous Judge",
    source: "MAGFest MIVS",
    about: "ParaLily",
    aboutSlug: "paralily",
    kind: "judge",
    verified: false,
  },
  {
    id: "home-12",
    quote: "Staring into space has never been this rewarding.",
    author: "Catherine Dellosa",
    source: "Pocket Gamer",
    url: "https://www.pocketgamer.com/cell-to-singularity-beyond/review/",
    // The review's headline, about the Beyond expansion of Cell to Singularity.
    about: "Cell to Singularity by Computer Lunch",
    aboutSlug: "cell-to-singularity",
    kind: "press",
    verified: true,
    date: "2021-11-09",
  },
  {
    id: "home-13",
    // The owner's wording, kept as the old site had it. The 2015 article's own sentence reads
    // differently ("Proving that there’s still life (and sillyness) left in the endless runner
    // genre, Luna Wolf Studios is working on Haberdashery.").
    quote: "Haberdashery proves that there’s still life and sillyness left in the endless runner genre.",
    author: "Vinny Parisi",
    source: "IndieGameMag",
    // The live page now carries unrelated adult links: the archived 2015 copy is linked instead.
    url: "https://web.archive.org/web/20150729224832/http://indiegamemag.com:80/screenshot-weekly-disposable-beards-on-sale-at-the-haberdashery/",
    about: "Haberdashery",
    aboutSlug: "haberdashery",
    kind: "press",
    verified: true,
    date: "2015-07-28",
  },
  {
    id: "home-14",
    quote:
      "An interesting take on endless runners, you play as a sheep on a rotating 3D world collecting hats and coins while avoiding obstacles. Different powerups, items to catalog, and a global leaderboard give it good replay value. Overall super fun and hilarious game!",
    author: "Ruthiepee",
    source: "iOS review",
    about: "Haberdashery",
    aboutSlug: "haberdashery",
    kind: "player",
    verified: false,
  },
  {
    id: "home-15",
    quote: "Fun concept. Well put together. I can see it going places. Hats off to the dev.",
    author: "Anonymous Judge",
    source: "Boston Festival of Indie Games",
    about: "Haberdashery",
    aboutSlug: "haberdashery",
    kind: "judge",
    verified: false,
  },
  {
    id: "home-16",
    quote: "I was laughing right when I opened it.",
    author: "Jason Morano",
    source: "East Coast Reboot game jam judge, 2016",
    about: "Plan C",
    aboutSlug: "plan-c",
    kind: "judge",
    verified: false,
  },
  {
    id: "home-17",
    quote:
      "By far the best freelancer I’ve ever encountered. Even though they were under a strict time limit, they presented work that was by far that of perfection. Would love to work with them again!",
    // The profile now shows this client as "Former Client (inactive)".
    author: "Sqe187",
    source: "Freelancer.com",
    url: LINKS.freelancer,
    // A Unity game built to a 10-hour deadline; the review names no project.
    about: "Luna Wolf Studios",
    aboutSlug: "studio",
    kind: "client",
    verified: true,
  },
  {
    id: "home-18",
    quote:
      "You have created a beautifully creative, wonderfully imaginative, realistically difficult, and insanely addictive game. I tip my hats to you.",
    author: "RenfieldHarker",
    source: "Newgrounds",
    url: LINKS.haberdasheryNewgrounds,
    about: "Haberdashery",
    aboutSlug: "haberdashery",
    kind: "player",
    verified: true,
    date: "2015-05-31",
  },

  // ─── Old Hypno Halo page, "Reviews & quotes" (the OFEN quote is home-01) ───────────────
  {
    id: "hh-01",
    quote: "Take some mushrooms, turn out all the lights, blast the music, and just zone out for a good long while",
    author: "MIVS Judge 2025",
    source: "MAGFest MIVS",
    about: "Hypno Halo",
    aboutSlug: "hypno-halo",
    kind: "judge",
    verified: false,
  },
  {
    id: "hh-02",
    quote:
      "This game is an absolute TRIP and I hate how addicting it is xD. Even when my fingers were exhausted, I kept playing because it was tons of fun. The music was sufficiently epic to inspire me to keep playing & trying my hardest",
    author: "MIVS Judge 2025",
    source: "MAGFest MIVS",
    about: "Hypno Halo",
    aboutSlug: "hypno-halo",
    kind: "judge",
    verified: false,
  },
  {
    id: "hh-higher-plain-games",
    // The whole curator review, from Steam's curator list for the game (Recommended).
    quote:
      "Maddeningly simple. Press buttons to match coloured halos before they vanish. Love how it gets faster before adding a new colour in, slowing down, and then ramping up again. Flow state gaming glory.",
    author: "Higher Plain Games",
    source: STEAM_CURATOR,
    url: "https://store.steampowered.com/curators/curatorsreviewing/?appid=3847950",
    about: "Hypno Halo",
    aboutSlug: "hypno-halo",
    kind: "curator",
    verified: true,
  },

  // ─── New Asset Store reviews of Scriptable Sheets (passages chosen as the rules say) ───
  {
    id: "ss-karinarigby",
    quote:
      "This is an excellent tool and is well worth the spend for how much convenience it offers, I can already see how much it's going to help the asset management with the rest of my interdisciplinary team. There are a lot of thoughtful features and customizations, good documentation, and I like that the asset is actively maintained. As others have mentioned the developer is very quick to respond and supportive which is greatly appreciated.",
    author: "karinarigby",
    source: ASSET_STORE,
    url: LINKS.scriptableSheetsReviews,
    about: "Scriptable Sheets",
    aboutSlug: "scriptable-sheets",
    kind: "store",
    verified: true,
    date: "2026-02-19",
  },
  {
    id: "ss-ftvstudios",
    quote:
      "The most useful tool I have in my arsenal especially for my TCG game is Scriptable Sheets! The amount of pure hours I've saved just from navigating from SO folder to SO folder is just insane.",
    author: "FTVStudios",
    source: ASSET_STORE,
    url: LINKS.scriptableSheetsReviews,
    about: "Scriptable Sheets",
    aboutSlug: "scriptable-sheets",
    kind: "store",
    verified: true,
    date: "2025-05-20",
  },
  {
    id: "ss-zzbrent",
    quote:
      "I can make bulk changes instantly here, where it would take me 15-30 minutes before. This helps my development go faster, which is key for ensuring my game actually gets finished and published!",
    author: "ZZBrent",
    source: ASSET_STORE,
    url: LINKS.scriptableSheetsReviews,
    about: "Scriptable Sheets",
    aboutSlug: "scriptable-sheets",
    kind: "store",
    verified: true,
    date: "2024-09-03",
  },
  {
    id: "ss-the-3d-lunatic",
    quote:
      "I needed to work with a lot of data which I prepared in Excel (because it's more convenient for me) and exported as .csv files. Scriptable Sheets let me import the data and view it in a very nice way inside Unity. I'm quite happy with the product and would recommend it!",
    author: "The_3D_Lunatic",
    source: ASSET_STORE,
    url: LINKS.scriptableSheetsReviews,
    about: "Scriptable Sheets",
    aboutSlug: "scriptable-sheets",
    kind: "store",
    verified: true,
    date: "2025-12-08",
  },
  {
    id: "ss-dlberk",
    quote:
      "If you are dealing with a lot of scriptable objects then this asset is a must have. It will speed up the process of creating all your assets rather than using the cumbersome Unity Inspector interface. The creators are also very responsive with support questions!",
    author: "dlberk",
    source: ASSET_STORE,
    url: LINKS.scriptableSheetsReviews,
    about: "Scriptable Sheets",
    aboutSlug: "scriptable-sheets",
    kind: "store",
    verified: true,
    date: "2025-08-23",
  },
  {
    id: "ss-vomiann",
    quote:
      "Excellent asset. Simplifies work with a large number of scriptable objects. The author of the asset promptly responds and adds new functionality. Thanks to the author for his work.",
    author: "Vomiann",
    source: ASSET_STORE,
    url: LINKS.scriptableSheetsReviews,
    about: "Scriptable Sheets",
    aboutSlug: "scriptable-sheets",
    kind: "store",
    verified: true,
    date: "2024-08-04",
  },
  {
    id: "ss-elasto",
    quote: "This asset does everything I need and the dev replied immediately when I needed something clarified. Can't fault it!",
    author: "elasto",
    source: ASSET_STORE,
    url: LINKS.scriptableSheetsReviews,
    about: "Scriptable Sheets",
    aboutSlug: "scriptable-sheets",
    kind: "store",
    verified: true,
    date: "2025-05-12",
  },
  {
    id: "ss-shakyrivers",
    quote:
      "If you use a lot of scriptable objects and need to compare, change or sift through the data this is the way to do it.",
    author: "shakyrivers",
    source: ASSET_STORE,
    url: LINKS.scriptableSheetsReviews,
    about: "Scriptable Sheets",
    aboutSlug: "scriptable-sheets",
    kind: "store",
    verified: true,
    date: "2026-04-15",
  },

  // ─── Intern testimonials (old bootcamp page; interns are not named) ────────────────────
  {
    id: "intern-01",
    quote: "My experience at Luna Wolf taught me a ton about using Unity, as well as working in a professional team setting.",
    author: "Studio intern",
    source: "Internship program",
    about: "Internship program",
    aboutSlug: "internship",
    kind: "intern",
    verified: false,
  },
  {
    id: "intern-02",
    quote:
      "This internship goes all in with showing the intern(s) the entire game development process. From a GDD to a finalized, released demo. I appreciate the skills learned / taught, and the constant feedback every week / day.",
    author: "Studio intern",
    source: "Internship program",
    about: "Internship program",
    aboutSlug: "internship",
    kind: "intern",
    verified: false,
  },
  {
    id: "intern-03",
    // Spelling and capitalisation fixed on the owner's ruling; no words changed.
    quote:
      "Jeff and Jeremy are some of the most caring mentors I have ever had in my life, my time at Luna Wolf wasn’t just an internship, it felt like a small game development family I had always wanted, the skills they taught me and experiences they brought me was some of the most fun I have ever had in my life. 10/10!",
    author: "Studio intern",
    source: "Internship program",
    about: "Internship program",
    aboutSlug: "internship",
    kind: "intern",
    verified: false,
  },
  {
    id: "intern-04",
    quote:
      "My internship with Luna Wolf Studios was an amazing experience that gave me the opportunity to work on a real game project alongside a team. I was able to improve my skills in Unity, C#, Git and GitHub while also learning a lot about collaboration and working through problems during development. I’m grateful for the experience and feel like I’ve grown a lot as a game developer because of it.",
    author: "Studio intern",
    source: "Internship program",
    about: "Internship program",
    aboutSlug: "internship",
    kind: "intern",
    verified: false,
  },
];

const byId = (ids: string[]): Review[] =>
  ids.map((id) => {
    const r = REVIEWS.find((x) => x.id === id);
    if (!r) throw new Error(`[reviews] Unknown review id "${id}".`);
    return r;
  });

/**
 * The old home page's 18 quotes, in its order. Every subject is assigned (none is "unknown").
 * The "Take some mushrooms" judge quote is deliberately not here; it stays on the Hypno Halo page.
 */
export const HOME_REVIEWS: Review[] = byId(Array.from({ length: 18 }, (_, i) => `home-${String(i + 1).padStart(2, "0")}`));

/** The four Asset Store reviews the old home page quoted, then the new ones, newest first. */
export const SCRIPTABLE_SHEETS_REVIEWS: Review[] = byId([
  "home-03",
  "home-04",
  "home-05",
  "home-06",
  "ss-shakyrivers",
  "ss-karinarigby",
  "ss-the-3d-lunatic",
  "ss-dlberk",
  "ss-ftvstudios",
  "ss-elasto",
  "ss-zzbrent",
  "ss-vomiann",
]);

/** The old Hypno Halo page's quotes in its order, then the two Steam curators. */
export const HYPNO_HALO_REVIEWS: Review[] = byId(["hh-01", "hh-02", "home-01", "home-02", "hh-higher-plain-games"]);

export const INTERN_TESTIMONIALS: Review[] = byId(["intern-01", "intern-02", "intern-03", "intern-04"]);

/** Every quote about one game or project (by slug), in REVIEWS order. */
export const reviewsAbout = (slug: string): Review[] => REVIEWS.filter((r) => r.aboutSlug === slug);

/**
 * Coverage that is linked rather than quoted. The Hypno Halo items are the old page's press
 * list, with each item's exact title (the old link labels shortened two of them).
 */
export const PRESS: PressItem[] = [
  {
    title: "Let the colors take control in Hypno Halo",
    outlet: "Everything Action",
    url: "https://everythingaction.com/2025/10/07/let-the-colors-take-control-in-hypno-halo/",
    date: "2025-10-07",
    about: "hypno-halo",
    kind: "article",
  },
  {
    title: "Top Steam Games to Look Out for in October 2025",
    outlet: "Games Ardor",
    url: "https://gamesardor.net/top-steam-games-to-look-out-for-in-october-2025/#hypno-halo",
    date: "2025-10-23",
    about: "hypno-halo",
    kind: "list",
  },
  {
    title: "Roid Rage (feat. Metroid Prime 4: Beyond, The Berlin Apartment & Simogo Legacy Collection)",
    outlet: "The Mimic's Veil Podcast, Episode 73",
    url: "https://pocketcasts.com/podcast/the-mimics-veil/581efcf0-2c7d-013d-44ba-0affe62ed029/roid-rage-feat-metroid-prime-4-beyond-the-berlin-apartment-simogo-legacy-collection/b300ab7f-f089-4e12-b7a7-a958a84053d9",
    date: "2025-12-11",
    about: "hypno-halo",
    kind: "podcast",
  },
  {
    title: "Hypno Halo - Review | Psychedelic Flow State Hedonism [EPILEPSY WARNING]",
    outlet: "Higher Plain Games",
    url: "https://www.youtube.com/watch?v=Zynq6cc5uTI",
    date: "2026-01-28",
    about: "hypno-halo",
    kind: "video",
  },
  {
    title: "Агляд гульн Hypno Halo",
    outlet: "Russ Play",
    url: "https://russplay.com/reviews/hypno-halo/",
    about: "hypno-halo",
    kind: "review",
    language: "Belarusian",
  },
  {
    title: "Gamebox 2.0: Leatherface Legacy Edition",
    outlet: "Everything Action",
    url: "https://everythingaction.com/2017/09/21/gamebox-2-0-leatherface-legacy-edition/",
    date: "2017-09-21",
    about: "paralily",
    kind: "article",
  },
  {
    title: "Here are the nominees for the 2016 Delaware Innovation Awards",
    outlet: "Technical.ly",
    url: LINKS.delawareInnovationAwards2016,
    date: "2016-10-24",
    about: "haberdashery",
    kind: "article",
  },
  {
    title: "Log off Twitter and try these Delaware-made games",
    outlet: "Technical.ly",
    url: "https://technical.ly/startups/log-off-twitter-and-try-these-delaware-made-video-games/",
    date: "2020-03-25",
    about: "haberdashery",
    kind: "list",
  },
  {
    title: "Games Inspire Science Super Heroes",
    outlet: "WilmU News",
    url: "https://blog.wilmu.edu/news/2018/06/19/games-inspire-science-super-heroes/",
    date: "2018-06-19",
    about: "studio",
    kind: "article",
  },
  {
    title: "Gaming and Animation Students Gain Real-world Experience",
    outlet: "WilmU News",
    url: "https://blog.wilmu.edu/news/2026/08/17/gaming-and-animation-students-gain-real-world-experience/",
    date: "2026-08-17",
    about: "internship",
    kind: "article",
  },
  {
    title: "Sheep Tag 2 - interview & gameplay showcase",
    outlet: "WTii (YouTube)",
    url: "https://www.youtube.com/watch?v=ZGcLcwCXzj0",
    about: "sheep-tag-2",
    kind: "video",
  },
];
