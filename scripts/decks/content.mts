/**
 * Content for the pitch decks (scripts/decks/build.mts renders it). Each deck's slug, cover,
 * and slide count come from src/data/decks.ts; everything else is here.
 *
 * Every fact comes from src/data/*.ts, the service pages, CLAUDE.md, or Anatomy of Play (the
 * studio's web app on tools.lunawolfstudios.com, source in the web-tools repository), which
 * records each health project's condition and hardware; where Anatomy of Play and src/data
 * disagree, src/data wins. The comment beside each block names its source. The general device
 * terms used as framing (IoT, smart devices, Bluetooth, motion capture, computer vision, head
 * tracking) are the studio's own description of its work; a specific spec stays with the
 * project that records it.
 *
 * Copy follows CLAUDE.md: "we" for the studio, no founder named, newest work first, the
 * Anatomy of Play projects leading any list of health, fitness, and education work, no
 * prices, reviews quoted exactly. A company appears only as the owner label of a project or
 * award the deck shows, in the "Our Trusted Pack" logo row, in the lines the site itself words
 * about a project's partner, or as a review's source; never as a text-only client mention.
 * Grants are worded as funding for the project, as src/data words them.
 *
 * Image paths are under src/assets/. Alt text is the site's own where it has one
 * (servicePages.ts, presskit.ts), otherwise a description of the picture.
 */
import { deck as deckMeta } from "../../src/data/decks.ts";

/** Cover and page title for a deck, from src/data/decks.ts. */
const cover = (slug: string) => {
  const m = deckMeta(slug);
  return { docTitle: `${m.name} | Luna Wolf Studios`, cover: { eyebrow: m.eyebrow, title: m.title, lead: m.lead } };
};

export interface Card {
  title: string;
  /** Plain label: whose project it is ("by Peloton", "Our game"). */
  owner: string;
  /** Year from games.ts `year` or `releaseNote`, when it has one. */
  year?: string;
  /** One short line: what it is. */
  desc: string;
  img: string;
  alt: string;
  pos?: string;
  contain?: boolean;
  /** Hardware or platform it runs on (Anatomy of Play highlights, games.ts platforms). */
  hw?: string;
}

/** A grant, worded as src/data words it, attached to its project. */
export interface Grant {
  project: string;
  line: string;
}

/** A device shown with the project that used it. */
export interface DeviceTile {
  device: string;
  img: string;
  alt: string;
  pos?: string;
  project: string;
  owner: string;
  text: string;
}

export interface Item {
  icon: string;
  title: string;
  text: string;
}

export interface Picture {
  src: string;
  alt: string;
  caption?: string;
  pos?: string;
}

export type Slide =
  | { kind: "cards"; eyebrow: string; title: string; lead?: string; cards: Card[]; cols?: number; imgH?: number }
  | {
      kind: "feature";
      eyebrow: string;
      title: string;
      picture: Picture;
      heading: string;
      points: string[];
      awards?: Array<{ body: string; title: string; subject: string }>;
      grants?: Grant[];
      thumbs?: Picture[];
      notes?: string[];
    }
  | { kind: "stats"; eyebrow: string; title: string; lead?: string; stats: Array<{ n: string; text: string }>; side: Card }
  | { kind: "games"; eyebrow: string; title: string; cards: Card[]; available: Array<"steam" | "switch"> }
  | {
      kind: "detail";
      eyebrow: string;
      title: string;
      blocks: Array<{ card: Card; points: string[] }>;
      quote?: string;
    }
  | {
      kind: "tool";
      eyebrow: string;
      title: string;
      picture: Picture;
      lead: string;
      points: string[];
      award: string;
      quote: string;
    }
  | {
      kind: "devices";
      eyebrow: string;
      title: string;
      tiles: DeviceTile[];
      /** Devices with no art: a compact labeled list. */
      list?: { title: string; items: Array<{ device: string; text: string }> };
      grants?: Grant[];
    }
  | {
      /** The case for the category: the reader's problem, why this answers it, the evidence. */
      kind: "case";
      eyebrow: string;
      title: string;
      lead?: string;
      points: string[];
      evidence?: Evidence[];
      picture: Picture;
    }
  | {
      /** A short process shown as numbered steps, with a picture. */
      kind: "steps";
      eyebrow: string;
      title: string;
      lead: string;
      steps: Item[];
      picture: Picture;
    };

/**
 * One piece of evidence on a case slide: a figure (or a recorded result in words) with its
 * source. A published figure names its publisher or authors, year, and URL, and is quoted as
 * the source states it; a project result is worded as recorded and names the project's owner.
 */
export interface Evidence {
  n?: string;
  text: string;
  source: string;
}

export interface Deck {
  slug: string;
  /** <title> of the HTML and PDF. */
  docTitle: string;
  cover: { eyebrow: string; title: string; lead: string };
  /** Partner logos (partners.ts) for the "who we are" slide, in partners.ts order. */
  pack: string[];
  /** The case for the category, right after the cover. */
  cases: Slide[];
  what: { eyebrow: string; title: string; items: Item[]; picture: Picture; note?: string };
  work: Slide;
  proof?: Slide[];
  /** Service page whose `process` and `cta` the last slide uses (servicePages.ts). */
  processFrom: string | null;
  cta: { title?: string; lead?: string };
  urls: string[];
}

// ─── Shared art and cards ────────────────────────────────────────────────────────────────────

const A = {
  helixPure: {
    src: "games/helix/helix-pure-tone-crop.jpg",
    // servicePages.ts, vr-ar focus[0].imageAlt
    alt: "The pure tone test in HELIX: cartoon animals stand along a path while the game asks which ear heard the tone.",
  },
  helixDigits: {
    src: "games/helix/helix-digits-in-noise.jpg",
    // servicePages.ts, vr-ar hero.alt
    alt: "The digits-in-noise test in HELIX: a player's VR controllers in front of a keypad of large numbers.",
  },
  helixTemple: {
    src: "games/helix/helix-portal-temple.jpg",
    // presskit.ts, HELIX media
    alt: "A stone portal glowing red at the end of a ruined temple that floats in space, with a keypad of dials beside it.",
  },
};

// games.ts: title, owner, year; descriptions cut from tagline/summary and servicePages.ts notes.
const C: Record<string, Card> = {
  helix: {
    title: "HELIX",
    owner: "Our project · with Nemours", // servicePages.ts kicker
    year: "2023",
    desc: "VR hearing assessment",
    img: "games/helix/helix-pure-tone-crop.jpg",
    alt: A.helixPure.alt,
  },
  lanebreak: {
    title: "Lanebreak",
    owner: "by Peloton",
    year: "2022",
    desc: "Gaming-inspired workout",
    img: "portfolio/lanebreak.jpg",
    // servicePages.ts, game-development focus[0].imageAlt
    alt: "Peloton Lanebreak: a glowing blue wheel throws sparks as it rolls along a dark track marked with blue beats.",
  },
  discoverTd: {
    title: "Discover TD",
    owner: "by Relevate Health Games",
    year: "2026",
    desc: "Case-based training for clinicians",
    img: "portfolio/discover-td-screens.jpg",
    // servicePages.ts, serious-games focus[1].imageAlt
    alt: "Three screens from Discover TD: the title screen, a choice of six virtual patients, and a seated virtual patient being examined for movement in the face, trunk, and limbs.",
  },
  levelOne: {
    title: "Level One",
    owner: "by Relevate Health Games",
    year: "2025",
    desc: "Teaches type 1 diabetes care",
    img: "portfolio/level-one-screens.jpg",
    alt: "Three phone screens from Level One: a level about blood sugar, a food album of meals to count carbs for, and insulin moving through the bloodstream.",
  },
  expressionLab: {
    title: "Expression Lab",
    owner: "by Relevate Health Games",
    desc: "Facial anatomy training",
    img: "portfolio/expression-lab-screens.jpg",
    alt: "Three phone screens from Expression Lab: a Game On title card and two screens of a 3D face with its facial muscles marked.",
  },
  neurosparks: {
    title: "NeuroSPARKS",
    owner: "by Barron Associates",
    desc: "Science games for middle school",
    img: "portfolio/neurosparks-emg-sensor.jpg",
    alt: "A rendered student wears an arm sensor whose signal drives the Neurobots science game on a screen beside her.",
  },
  grasp: {
    title: "GRASP",
    owner: "by Barron Associates",
    desc: "Stroke rehab with a sensor glove",
    img: "portfolio/grasp-glove.jpg",
    alt: "A player's hand in the GRASP sensor glove, in front of a garden level on a large screen.",
  },
  kneebright: {
    title: "KneeBRIGHT",
    owner: "by Barron Associates",
    desc: "Knee therapy with EMG biofeedback",
    img: "portfolio/kneebright.jpg",
    alt: "KneeBRIGHT: a boat crosses a lake while a Speed Boost prompt asks the player to extend the impaired leg.",
  },
  moveIt: {
    title: "MOVE-IT",
    owner: "by Barron Associates",
    desc: "Therapy games and a smart toy",
    img: "portfolio/move-it-smart-toy-photo.jpg",
    alt: "The MOVE-IT smart toy, its three round ends lit red, green, and blue.",
  },
  icare: {
    title: "iCare",
    owner: "by Barron Associates",
    desc: "Vision therapy games for children",
    img: "portfolio/icare.png",
    alt: "iCare: a low-poly dragon in a green field beside a floating panel of shapes to pick from.",
  },
  saebovr: {
    title: "SaeboVR",
    owner: "by Barron Associates",
    desc: "Stroke rehab tracked with Kinect",
    img: "portfolio/saebovr.jpg",
    // servicePages.ts, serious-games focus[2].imageAlt
    alt: "SaeboVR: a seated patient raises his arm while a Kinect sensor above the screen tracks it, and the game shows a hand placing a jug of milk in a fridge.",
  },
  flexsledding: {
    title: "mTrigger Flex Sledding",
    owner: "by mTrigger",
    year: "2019",
    desc: "Biofeedback therapy game",
    img: "portfolio/flexsledding.jpg",
    alt: "The mTrigger Flex Sledding menu, with Play, Settings, How To Play, and Testing Mode, over a snowy sled track.",
  },
  sheepTag2: {
    title: "Sheep Tag 2",
    owner: "Our game",
    year: "Early Access 2027", // games.ts releaseNote
    desc: "Up to 32 players online",
    img: "games/sheep-tag-2/key-art-logo.jpg",
    // presskit.ts, Sheep Tag 2 key art with logo
    alt: "Sheep Tag 2 key art with the game's logo: two sheep run across a farmyard while wolves close in behind them.",
  },
  hypnoHalo: {
    title: "Hypno Halo",
    owner: "Our game",
    year: "2025",
    desc: "300+ handcrafted levels",
    img: "games/hypno-halo/capsule-616x353.jpg",
    // presskit.ts, Hypno Halo store capsule
    alt: "The Hypno Halo store capsule: the title in rainbow neon inside glowing rings.",
  },
  paralily: {
    title: "ParaLily",
    owner: "Our game · by Team ParaLily",
    year: "2021",
    desc: "Precision puzzle platformer",
    img: "games/paralily/capsule-616x353.jpg",
    alt: "The ParaLily store capsule: the logo beside Lily stepping out of a purple portal in a dark forest.",
  },
  braveHearts: {
    title: "The Brave Hearts II: False Skies",
    owner: "Connor Butler · published by us",
    year: "2026",
    desc: "Voice-acted shoot 'em up",
    img: "games/the-brave-hearts-ii-false-skies/capsule-616x353.jpg",
    // presskit.ts, The Brave Hearts II logo art
    alt: "The Brave Hearts II: False Skies logo: a riveted metal heart over a fighter jet.",
  },
  warcodes: {
    title: "Warcodes",
    owner: "by Emergent Worlds",
    year: "2025",
    desc: "Mobile monster battler",
    img: "portfolio/warcodes.jpg",
    alt: "Warcodes art: two people scan products with their phones while the monsters they made sit on their shoulders.",
  },
  cellToSingularity: {
    title: "Cell to Singularity",
    owner: "by Computer Lunch",
    desc: "Idle clicker for mobile, PC, and web",
    img: "portfolio/cell-to-singularity.jpg",
    alt: "Cell to Singularity art: a tardigrade floats among cells, DNA strands, and a virus.",
  },
  realize: {
    title: "Realize",
    owner: "by Realize Design",
    year: "2020",
    desc: "Room design app for iPhone and iPad",
    img: "portfolio/realize-banner.jpg",
    alt: "Phone screens from the Realize app: scan a room, design it in 3D, buy the products, and have them shipped.",
  },
  saveSamia: {
    title: "Save Samia",
    owner: "by LaToya Forever",
    year: "2016",
    desc: "Endless runner, iOS and Android",
    img: "portfolio/save-samia.jpg",
    alt: "The Save Samia title screen over a city street, with play, settings, and leaderboard buttons.",
  },
  labRat: {
    title: "Lab Rat",
    owner: "by Legends of Learning",
    desc: "Classroom science and math games",
    img: "portfolio/lab-rat.png",
    alt: "Lab Rat: Molecule Maker title art, with Ratilda the rat scientist holding a ruler.",
    contain: true,
  },
};

const withDesc = (c: Card, desc: string): Card => ({ ...c, desc });
/** A card with its condition or therapy (desc) and its hardware (hw). */
const therapy = (c: Card, desc: string, hw?: string): Card => ({ ...c, desc, hw });

/**
 * Grant funding, worded as src/data words it ("funded by", "supported by"), attached to its
 * project. Anatomy of Play records no grants. None of these sources says the studio was the
 * awardee.
 */
const GRANTS: Grant[] = [
  // games.ts helix.summary; servicePages.ts vr-ar focus[0] ("started with funding from the DBI CAT grant program")
  { project: "HELIX", line: "Started with funding from the DBI CAT grant program" },
  // games.ts move-it.summary
  { project: "MOVE-IT", line: "Funded by an NIH Phase II SBIR grant" },
  // games.ts grasp.summary
  { project: "GRASP", line: "Supported by an NIH Fast-Track SBIR grant" },
  // games.ts kneebright.summary
  { project: "KneeBRIGHT", line: "Supported by NIH NIAMS" },
  // games.ts neurosparks.summary ("An NIH-funded game system"); servicePages.ts serious-games focus[2]
  { project: "NeuroSPARKS", line: "NIH-funded" },
];

/**
 * Our own games and tools, latest first as CLAUDE.md orders them, on the "who we are" slide.
 * The words come from games.ts (releaseNote, platforms) and servicePages.ts.
 */
export const PRODUCTS: Array<{ name: string; words: string; img: string; alt: string; pos?: string }> = [
  {
    name: "Sheep Tag 2",
    words: "Early Access 2027",
    img: "games/sheep-tag-2/key-art-logo.jpg",
    alt: "Sheep Tag 2 key art with the game's logo: two sheep run across a farmyard while wolves close in behind them.",
  },
  {
    name: "Scriptable Sheets",
    words: "On the Unity Asset Store",
    img: "scriptable-sheets/key-image.jpg",
    // servicePages.ts unity-editor-tools hero.alt
    alt: "Scriptable Sheets key art: a table of ScriptableObjects inside the Unity Editor, beside the tool's main features.",
    pos: "0 0",
  },
  {
    name: "Hypno Halo",
    words: "On Steam and Nintendo Switch",
    img: "games/hypno-halo/capsule-616x353.jpg",
    alt: "The Hypno Halo store capsule: the title in rainbow neon inside glowing rings.",
  },
  {
    name: "ParaLily",
    words: "On Nintendo Switch and Steam",
    img: "games/paralily/capsule-616x353.jpg",
    alt: "The ParaLily store capsule: the logo beside Lily stepping out of a purple portal in a dark forest.",
  },
];

// ─── Published evidence, quoted as each source states it ───────────────────────────────────

/** Game-based training (University of Colorado Denver release on the meta-analysis). */
const GAME_TRAINING_META: Evidence = {
  n: "+14%",
  text: "skill-based knowledge for trainees taught with computer-based simulation games, against comparison groups; 11% higher factual knowledge and a 9% higher retention rate. 65 studies, 6,476 trainees.",
  source:
    "Meta-analysis of computer-based simulation games, Personnel Psychology (2011), as released by the University of Colorado Denver, Oct 20, 2010: business-news.ucdenver.edu/2010/10/20/business-school-professors-study-finds-video-games-highly-effective-training-tool",
};

/** VR soft-skills training (PwC's 2020 study of new managers, Feb 2019 to Jan 2020). */
const PWC_VR: Evidence = {
  n: "Up to 4×",
  text: "faster: learners finished VR soft-skills training up to four times faster than in a classroom (classroom time only), and were 40% more confident than classroom learners to act on it.",
  source: "PwC, study of VR soft-skills training for new managers in 12 US locations, 2020: pwc.com/us/vlearning",
};

/** Virtual reality in stroke rehabilitation (Cochrane systematic review). */
const COCHRANE_VR: Evidence = {
  n: "190 studies",
  text: "of 7,188 people after stroke. Adding virtual reality to usual care improved arm function (moderate-certainty evidence).",
  source:
    "Virtual reality for stroke rehabilitation, Cochrane Database of Systematic Reviews, 2025, plain language summary: cochrane.org/evidence/CD008349_virtual-reality-stroke-rehabilitation",
};

/** Mobile's share of the games market (Newzoo's final 2024 figures). */
const NEWZOO_MOBILE: Evidence = {
  n: "$100.3B",
  text: "Mobile games were the largest segment of the 2024 games market: $100.3 billion (+5.5%) of $182.7 billion.",
  source:
    "Newzoo, final 2024 figures, as reported by Game World Observer, Jun 26, 2025: gameworldobserver.com/2025/06/26/newzoo-in-2024-the-global-video-game-market-generated-182-7-billion-which-is-below-projections",
};

/** Unity's share of top mobile games (Unity's own page; data as of Q4 2022, from Apptopia). */
const UNITY_SHARE: Evidence = {
  n: "70%+",
  text: "of the top 1,000 mobile games were made with Unity (top 1,000 on Google Play and the App Store, as of Q4 2022).",
  source: "Unity Technologies, citing Apptopia: unity.com/solutions/mobile-game-development",
};

/** Playables against non-playable formats (Liftoff's index of 4.7 trillion impressions, Jan 1, 2023 to May 31, 2025). */
const LIFTOFF_PLAYABLE: Evidence = {
  n: "8× to 16×",
  text: "Playable ads' impression-to-install rates were 8 times those of non-playable formats for top-spending mobile game advertisers, and 16 times for other game advertisers.",
  source:
    "Liftoff, 2025 Mobile Ad Creative Index (4.7 trillion impressions, Jan 2023 to May 2025), Jul 7, 2025: newswire.ca/news-releases/liftoff-s-2025-mobile-ad-creative-index-reveals-ugc-is-a-key-differentiator-for-top-apps-837345804.html",
};

// ─── The six decks ──────────────────────────────────────────────────────────────────────────

export const DECKS: Deck[] = [
  // ── Health games ──────────────────────────────────────────────────────────────────────────
  {
    slug: "health-games",
    ...cover("health-games"),
    pack: ["Peloton", "Legends of Learning", "Barron Associates", "Nemours Children's Health", "mTrigger"],
    cases: [
      {
        kind: "case",
        eyebrow: "Why health games",
        title: "Therapy that measures itself",
        points: [
          // servicePages.ts vr-ar focus[0] ("Traditional hearing tests can be boring and repetitive")
          "Standard tests can be boring and repetitive. A game gives each repetition a goal, as HELIX does with hearing tests.",
          // Anatomy of Play: MOVE-IT ("In-game performance metrics strongly correlate with clinical motor assessments"), GRASP ("Strong correlation with clinical assessments")
          "The game measures while the patient plays: in MOVE-IT and GRASP, by Barron Associates, in-game metrics correlate strongly with clinical assessments.",
          // services.ts serious-games bullets
          "Results reach clinicians remotely, so they can follow patients at home.",
        ],
        evidence: [
          // Anatomy of Play, KneeBRIGHT highlights
          { n: "+25%", text: "knee torque against control in KneeBRIGHT, by Barron Associates.", source: "Anatomy of Play, our web app: tools.lunawolfstudios.com/anatomy-of-play/" },
          // Anatomy of Play, iCare highlights
          { n: "20 min/day", text: "Equivalent clinical effectiveness to patching therapy, in 20 minutes a day against hours of traditional therapy: iCare, by Barron Associates.", source: "Anatomy of Play, our web app: tools.lunawolfstudios.com/anatomy-of-play/" },
          COCHRANE_VR,
        ],
        picture: { src: "portfolio/kneebright.jpg", alt: "KneeBRIGHT: a boat crosses a lake while a Speed Boost prompt asks the player to extend the impaired leg.", caption: "KneeBRIGHT, by Barron Associates" },
      },
    ],
    what: {
      eyebrow: "What we build",
      title: "Games for assessment, therapy, and training",
      // Conditions and hardware: Anatomy of Play config.ts (HELIX, GRASP, KneeBRIGHT, MOVE-IT,
      // iCare) and games.ts summaries (SaeboVR, HELIX); training and dashboards: services.ts
      // serious-games bullets, servicePages.ts vr-ar what.items.
      items: [
        { icon: "headset", title: "Hearing assessment", text: "VR hearing tests for auditory processing disorder on Meta Quest 2, with calibrated audio." },
        { icon: "heartPulse", title: "Stroke rehabilitation", text: "Grip and arm practice with a sensor glove, and with Kinect motion capture." },
        { icon: "home", title: "Knee therapy at home", text: "Exercise games for knee osteoarthritis, controlled by wireless EMG sensors." },
        { icon: "users", title: "Therapy for children", text: "A smart toy with LEDs and haptics for cerebral palsy, and vision therapy with anaglyph glasses and head tracking." },
        { icon: "monitor", title: "Training and dashboards", text: "Training games for patients and healthcare providers, and web dashboards for providers." },
      ],
      picture: { ...A.helixPure, caption: "HELIX, our VR hearing assessment" },
    },
    work: {
      kind: "cards",
      eyebrow: "Selected work",
      title: "Health and fitness games we've worked on",
      imgH: 122,
      // The Anatomy of Play ten lead, in the order CLAUDE.md and servicePages.ts give them.
      // desc: the condition or subject (Anatomy of Play summary); hw: the hardware or platform
      // (Anatomy of Play highlights, games.ts platforms).
      cards: [
        therapy(C.helix, "Auditory processing disorder", "Meta Quest 2 headset"),
        therapy(C.lanebreak, "Fitness: rhythm-based cardio", "Bike resistance and cadence"),
        therapy(C.discoverTd, "Tardive dyskinesia, for clinicians", "Web"),
        therapy(C.levelOne, "Type 1 diabetes education", "iOS and Android"),
        therapy(C.expressionLab, "Facial anatomy, for clinicians"),
        therapy(C.neurosparks, "Middle school science", "Bluetooth EMG sensor"),
      ],
    },
    proof: [
      {
        kind: "cards",
        eyebrow: "Therapies",
        title: "Therapy and rehabilitation games",
        imgH: 122,
        // Rest of the Anatomy of Play ten, then SaeboVR and Flex Sledding (servicePages.ts order).
        cards: [
          therapy(C.grasp, "Stroke rehabilitation", "Sensor glove and motion capture"),
          therapy(C.kneebright, "Knee osteoarthritis", "Wireless EMG sensors"),
          therapy(C.moveIt, "Hemiplegic cerebral palsy", "Smart toy: LEDs, haptics, 9-axis sensor"),
          therapy(C.icare, "Amblyopia, convergence insufficiency", "Anaglyph glasses, computer vision"),
          therapy(C.saebovr, "Stroke, arm and shoulder", "Kinect motion capture"),
          therapy(C.flexsledding, "Biofeedback therapy", "Wireless EMG, iOS and Android"),
        ],
      },
      {
        kind: "feature",
        eyebrow: "Research and recognition",
        // servicePages.ts serious-games focus[3] ("Serious games are built with experts, not just for them.")
        title: "Built with experts, not just for them",
        picture: { ...A.helixDigits, caption: "HELIX on Meta Quest 2" },
        heading: "HELIX, our VR hearing assessment",
        // games.ts helix.summary; servicePages.ts vr-ar focus[0]
        points: [
          "Built with audiologists and Nemours Children's Hospital",
          "Pilot study with about 30 subjects in 2023",
          "Results stored on HIPAA-compliant AWS services",
        ],
        grants: GRANTS,
        // awards.ts ALL_AWARDS; the owner shows on the project's card, not here.
        awards: [
          { body: "16th Unity Awards", title: "Nominee, Best Embedded System Project", subject: "Lanebreak, by Peloton · 2024" },
          { body: "Tech & Learning Awards of Excellence", title: "Winner, Primary Education", subject: "NeuroSPARKS, by Barron Associates · 2022" },
        ],
        // servicePages.ts serious-games focus[2]
        notes: ["The Barron Associates projects we worked on helped launch FDA-approved treatments."],
      },
    ],
    processFrom: "serious-games",
    cta: { title: "Start a health game" },
    urls: ["/services/serious-games/", "/services/vr-ar-development/"],
  },

  // ── Serious games and training simulations ───────────────────────────────────────────────
  {
    slug: "serious-games",
    ...cover("serious-games"),
    pack: ["Peloton", "Legends of Learning", "Kodeco", "Barron Associates", "Nemours Children's Health", "mTrigger"],
    cases: [
      {
        kind: "case",
        eyebrow: "Why train with a game",
        title: "Practice the decision, not the reading",
        points: [
          // games.ts discover-td, core-concepts-in-telehealth
          "Learners make the calls themselves, with simulated patients in Discover TD and the CORE Concepts in Telehealth game.",
          // servicePages.ts vr-ar what.items (activity tracking, analytics); HELIX dashboard
          "Every choice can be recorded, with activity tracking, analytics, and dashboards, as in our VR training and HELIX.",
          // games.ts platforms
          "It runs where your learners are: the web, phones, and VR headsets.",
        ],
        evidence: [GAME_TRAINING_META, PWC_VR],
        picture: { src: "portfolio/discover-td-screens.jpg", alt: C.discoverTd.alt, caption: "Discover TD, by Relevate Health Games" },
      },
    ],
    what: {
      eyebrow: "What we build",
      title: "Games that teach, train, and assess",
      items: [
        // servicePages.ts serious-games what.items; vr-ar what.items (training simulations)
        { icon: "users", title: "Clinician training", text: "Discover TD for tardive dyskinesia, Expression Lab for facial anatomy, and CORE Concepts in Telehealth for telemedicine." },
        { icon: "heartPulse", title: "Patient education", text: "Level One teaches type 1 diabetes care: insulin, carbs, and highs and lows, in short levels." },
        { icon: "headset", title: "VR training simulations", text: "VR soft-skills training with 360-degree video, composited actors, activity tracking, and analytics." },
        // games.ts lab-rat, neurosparks, empathie summaries, without the companies
        { icon: "graduationCap", title: "Classroom games", text: "Lab Rat for Legends of Learning, and NeuroSPARKS and EMPATHIE for middle school." },
        { icon: "play", title: "Playable ads", text: "Short interactive ads that people play instead of watch, in any field." },
      ],
      picture: {
        src: "portfolio/discover-td-screens.jpg",
        alt: C.discoverTd.alt,
        caption: "Discover TD, by Relevate Health Games",
      },
    },
    work: {
      kind: "cards",
      eyebrow: "Selected work",
      title: "Training and education games we've worked on",
      cards: [
        withDesc(C.helix, "Hearing tests as VR games"),
        C.lanebreak,
        C.discoverTd,
        C.levelOne,
        C.expressionLab,
        C.neurosparks,
      ],
    },
    proof: [
      {
        kind: "stats",
        eyebrow: "In numbers",
        title: "Training and education work, by the numbers",
        stats: [
          // servicePages.ts serious-games lead and focus[1]
          { n: "Dozens", text: "of training and education projects by Relevate Health Games that we have worked on" },
          // servicePages.ts serious-games focus[1]; games.ts core-concepts-in-telehealth
          { n: "5", text: "simulated patients in the CORE Concepts in Telehealth game for the American Heart Association" },
          // games.ts empathie.summary
          { n: "48", text: "students in the EMPATHIE pilot, by Barron Associates, with significant learning gains" },
          // games.ts helix.summary
          { n: "About 30", text: "subjects in the HELIX pilot study, with Nemours Children's Hospital, in 2023" },
        ],
        side: C.labRat,
      },
    ],
    processFrom: "serious-games",
    cta: {},
    urls: ["/services/serious-games/"],
  },

  // ── Playable ads ─────────────────────────────────────────────────────────────────────────
  {
    slug: "playable-ads",
    ...cover("playable-ads"),
    pack: ["Peloton", "Computer Lunch", "Cartoon Network", "Mega Cat Studios", "Red Essence Games"],
    cases: [
      {
        kind: "steps",
        eyebrow: "Playable ads",
        title: "What a playable ad is",
        lead: "A short, interactive slice of a game or product that people play inside the ad, ending in a call to action.",
        steps: [
          { icon: "monitor", title: "See the ad", text: "It appears in an app or game, where a video ad would." },
          { icon: "gamepad", title: "Play for a few seconds", text: "The viewer taps, swipes, or drags to try the core idea." },
          { icon: "arrowRight", title: "Tap the call to action", text: "It leads to a game, an app, a website, or a product." },
        ],
        picture: {
          src: "games/hypno-halo/wp-screenshot-medium-98.jpg",
          alt: "Hypno Halo, round 98 on medium: teal and purple rings nest toward the centre over a field of spinning stars.",
          caption: "Hypno Halo, our game: a few seconds of play",
        },
      },
      {
        kind: "case",
        eyebrow: "Why it works",
        title: "Playing instead of scrolling past",
        points: [
          "A banner or a video is watched or skipped. A playable asks for a few seconds of play.",
          "The viewer tries the product before choosing to install, sign up, or buy.",
          "The call to action comes after they have played, when they know what they are getting.",
        ],
        evidence: [LIFTOFF_PLAYABLE],
        picture: {
          src: "games/hypno-halo/key-art.jpg",
          alt: "Hypno Halo key art: the title in rainbow neon inside glowing rings.",
          caption: "Hypno Halo, our game",
        },
      },
      {
        kind: "case",
        eyebrow: "For your business",
        title: "What a playable ad can do for you",
        // The studio's statement on playable ads (CLAUDE.md "Pitch decks"); servicePages.ts serious-games focus[1]
        points: [
          "Lead anywhere: the call to action can open a game, your app, a website, or a product.",
          "Any field: we have worked on playable ads by Relevate Health Games that teach patients and healthcare providers how a condition works and how a treatment helps.",
          "Welcome new users: deferred deep links take a new user to the right place in your app, with a reward waiting.",
          "Measure it: click-throughs and engagement, with A/B tests to compare versions.",
        ],
        picture: { src: "portfolio/level-one-screens.jpg", alt: C.levelOne.alt, caption: "Level One, by Relevate Health Games" },
      },
    ],
    what: {
      eyebrow: "How we build and run it",
      title: "Built, targeted, and measured",
      // The studio's statement on playable ads (CLAUDE.md "Pitch decks"). Each network named
      // publishes specs for advertiser playables.
      items: [
        { icon: "code", title: "Unity or HTML5", text: "Built in Unity or HTML5, whichever the idea and the networks need." },
        { icon: "globe", title: "On the networks that take playables", text: "We can build for and run on Unity Ads, InMobi, AppLovin, Google Ads, Meta, and TikTok Ad Network." },
        { icon: "users", title: "Your audience", text: "Targeting from MAID lists: lists of the mobile advertising IDs of the people you want to reach." },
        { icon: "sheet", title: "Analytics", text: "Click-throughs, engagement, and more, for every version." },
        { icon: "layers", title: "A/B tests", text: "Run versions side by side and keep the one that works best." },
      ],
      picture: {
        src: "games/sheep-tag-2/screenshot-03.jpg",
        alt: "A Sheep casts Fortify in the middle of a huge grid of farms on ReVoLuTiOn as Wolves close in from the right.",
        caption: "Sheep Tag 2, our game, built in Unity",
      },
    },
    work: {
      kind: "cards",
      eyebrow: "Selected work",
      title: "Projects we've worked on by Relevate Health Games",
      // servicePages.ts serious-games focus[1], word for word
      lead: "We have worked on dozens of training and education projects by Relevate Health Games, for patients and for healthcare providers (HCPs). Some of those projects are playable ads. We bring that experience to playable ads in any field.",
      cards: [C.discoverTd, C.levelOne, C.expressionLab],
      imgH: 268,
    },
    proof: [
      {
        kind: "games",
        eyebrow: "Our games",
        title: "Games we make and publish",
        // servicePages.ts game-development work.items order
        // Release facts from games.ts and servicePages.ts game-development focus[1] and focus[2].
        cards: [
          { ...C.sheepTag2, year: undefined, desc: "Early Access on Steam in 2027" },
          { ...C.hypnoHalo, year: undefined, desc: "On Steam and Nintendo Switch" },
          { ...C.paralily, year: undefined, desc: "Published by us on Nintendo Switch" },
          { ...C.braveHearts, year: undefined, desc: "Published by us on Steam in 2026" },
        ],
        available: ["steam", "switch"],
      },
    ],
    processFrom: null,
    cta: {
      title: "Plan a playable ad",
      // servicePages.ts ENGAGEMENT_STEPS[0].text, cut
      lead: "Send us what you want to build, who it is for, the platforms, your timeline, and a budget range if you have one.",
    },
    urls: ["/services/serious-games/#playable-ads"],
  },

  // ── Mobile games ─────────────────────────────────────────────────────────────────────────
  {
    slug: "mobile-games",
    ...cover("mobile-games"),
    pack: ["Peloton", "Computer Lunch", "Cartoon Network", "Red Essence Games", "mTrigger"],
    cases: [
      {
        kind: "case",
        eyebrow: "Why mobile",
        title: "Where the players are",
        points: [
          "Mobile is the largest part of the games market, and it is still growing.",
          // games.ts warcodes, realize platforms; servicePages.ts unity-development work.items
          "We ship iOS and Android builds in Unity, as on Warcodes and Realize.",
          // servicePages.ts game-development focus[0] and focus[3]
          "Co-development adds people to a defined part of your game, in your repository, tools, and schedule.",
          "Player accounts, purchases, and live service are part of the build.",
        ],
        evidence: [NEWZOO_MOBILE, UNITY_SHARE],
        picture: { src: "portfolio/warcodes.jpg", alt: C.warcodes.alt, caption: "Warcodes, by Emergent Worlds" },
      },
    ],
    what: {
      eyebrow: "What we build",
      title: "Mobile games and apps in Unity",
      items: [
        // servicePages.ts unity-development what.items
        { icon: "cube", title: "Mobile apps", text: "iOS and Android builds, from progression systems in Warcodes to the Realize room design app." },
        { icon: "gamepad", title: "Gameplay programming", text: "Physics, game controllers, scene management, saves, and procedural content in C#." },
        { icon: "sheet", title: "Interfaces and touch controls", text: "Menus, HUDs, and app screens, with full controller and touch screen support." },
        // servicePages.ts game-development focus[3] points
        { icon: "users", title: "Accounts, purchases, and live games", text: "Player accounts and social features, microtransactions and DLC, and live service games." },
        // servicePages.ts game-development focus[0]
        { icon: "layers", title: "Co-development", text: "We work in your repository, tools, and schedule and take on a defined part." },
      ],
      picture: { src: C.levelOne.img, alt: C.levelOne.alt, caption: "Level One, by Relevate Health Games" },
    },
    work: {
      kind: "cards",
      eyebrow: "Selected work",
      title: "Mobile games and apps we've worked on",
      // Newest first by games.ts `year`; Cell to Singularity has no year there.
      cards: [C.warcodes, withDesc(C.levelOne, "Type 1 diabetes care, iOS and Android"), C.cellToSingularity, C.realize, C.flexsledding, C.saveSamia],
    },
    proof: [
      {
        kind: "detail",
        eyebrow: "Co-development",
        title: "What we built on two mobile apps",
        blocks: [
          {
            card: C.warcodes,
                        // servicePages.ts unity-development work.items warcodes.note
            points: ["Achievement systems", "Progression logic", "Reusable C# data structures", "User interfaces"],
          },
          {
            card: C.realize,
                        // servicePages.ts unity-development work.items realize.note
            points: ["Unity UI systems", "Backend integrations", "HTTP and JSON features", "Tested on iOS and Android"],
          },
        ],
        quote: "home-17",
      },
    ],
    processFrom: "game-development",
    cta: {},
    urls: ["/services/game-development/", "/services/unity-development/"],
  },

  // ── VR, AR, and connected devices ────────────────────────────────────────────────────────
  {
    slug: "vr-ar",
    ...cover("vr-ar"),
    pack: ["Peloton", "Barron Associates", "Nemours Children's Health", "mTrigger"],
    cases: [
      {
        kind: "case",
        eyebrow: "Why headsets and devices",
        title: "Measure what a screen cannot",
        points: [
          // games.ts saebovr, grasp; Anatomy of Play KneeBRIGHT, MOVE-IT
          "A device turns movement into data: Kinect, a sensor glove, EMG sensors, and a smart toy measure what a patient does.",
          // Anatomy of Play MOVE-IT
          "Those measures hold up: in MOVE-IT, by Barron Associates, in-game metrics correlate strongly with clinical motor assessments.",
          // servicePages.ts vr-ar what.items and focus[2]
          "A headset puts a learner in the room with 360-degree video, and results go to a dashboard for providers or trainers.",
        ],
        evidence: [PWC_VR, COCHRANE_VR],
        picture: { src: "games/helix/meta-quest-2-headset.jpg", alt: "A white Meta Quest 2 headset between its two hand controllers.", caption: "Meta Quest 2, the headset HELIX runs on" },
      },
    ],
    what: {
      eyebrow: "What we build",
      title: "Apps for headsets, IoT, and smart devices",
      items: [
        // servicePages.ts vr-ar-development what.items (headsets, mixed reality, Apple Vision Pro, training)
        { icon: "headset", title: "VR headsets", text: "Meta Quest 2 apps like HELIX, and Shader Graph materials in Unity for Apple Vision Pro." },
        { icon: "layers", title: "Mixed reality and depth cameras", text: "We have built mixed reality with Stereolabs ZED depth cameras and Meta Quest 2." },
        // games.ts saebovr, grasp; Anatomy of Play iCare ("A webcam tracks red-cyan anaglyph glasses to measure patient position")
        { icon: "users", title: "Motion capture, computer vision, and head tracking", text: "Microsoft Kinect, a sensor glove with motion tracking, and a webcam that tracks anaglyph glasses." },
        // Anatomy of Play: NeuroSPARKS ("Bluetooth-enabled sensor"), KneeBRIGHT (EMG), MOVE-IT (9-axis sensor, LEDs, haptics)
        { icon: "heartPulse", title: "IoT, Bluetooth sensors, and smart toys", text: "EMG sensors, including a Bluetooth muscle sensor, and a smart toy with a 9-axis sensor, LEDs, and haptics." },
        { icon: "graduationCap", title: "VR training", text: "We have built VR soft-skills training with 360-degree video, composited actors, activity tracking, and analytics." },
      ],
      picture: {
        src: "games/helix/meta-quest-2-headset.jpg",
        alt: "A white Meta Quest 2 headset between its two hand controllers.",
        caption: "Meta Quest 2, the headset HELIX runs on",
      },
    },
    work: {
      kind: "devices",
      eyebrow: "Devices we have built for",
      title: "Headsets, motion capture, and computer vision",
      tiles: [
        {
          device: "VR headset",
          img: "games/helix/helix-digits-in-noise.jpg",
          alt: "The digits-in-noise test in HELIX: a player's VR controllers in front of a keypad of large numbers.",
          project: "HELIX",
          owner: "Our project · with Nemours",
          // games.ts helix.summary; Anatomy of Play HELIX
          text: "Hearing tests as VR games on Meta Quest 2, for auditory processing disorder.",
        },
        {
          device: "Kinect motion capture",
          img: "portfolio/saebovr.jpg",
          alt: "SaeboVR: a seated patient raises his arm while a Kinect sensor above the screen tracks it, and the game shows a hand placing a jug of milk in a fridge.",
          project: "SaeboVR",
          owner: "by Barron Associates",
          // games.ts saebovr.summary
          text: "Tracks shoulder and elbow movement in stroke rehabilitation.",
        },
        {
          device: "Anaglyph glasses and computer vision",
          img: "portfolio/icare-anaglyph-glasses.jpg",
          alt: "A pair of paper red-cyan anaglyph glasses lying on a desk.",
          pos: "50% 30%",
          project: "iCare",
          owner: "by Barron Associates",
          // Anatomy of Play iCare summary
          text: "A webcam and computer vision track anaglyph (red-cyan) glasses for head tracking in vision therapy.",
        },
        {
          device: "Sensor glove",
          img: "portfolio/grasp-glove.jpg",
          alt: "A player's hand in the GRASP sensor glove, in front of a garden level on a large screen.",
          project: "GRASP",
          owner: "by Barron Associates",
          // games.ts grasp.summary; Anatomy of Play GRASP ("Glove-based motion tracking")
          text: "Glove-based motion tracking as stroke patients practice grip and hand use.",
        },
      ],
      // servicePages.ts vr-ar-development what.items and focus[1], without the companies.
      list: {
        title: "More headset work",
        items: [
          { device: "Stereolabs ZED depth cameras", text: "Mixed reality with Meta Quest 2" },
          { device: "Apple Vision Pro", text: "Shader Graph materials in Unity" },
          { device: "360-degree video", text: "VR soft-skills training on Meta Quest 2" },
        ],
      },
    },
    proof: [
      {
        kind: "devices",
        eyebrow: "Devices we have built for",
        title: "IoT, Bluetooth sensors, and smart devices",
        tiles: [
          {
            device: "Smart toy",
            img: "portfolio/move-it-smart-toy-photo.jpg",
            alt: "The MOVE-IT smart toy, its three round ends lit red, green, and blue.",
            project: "MOVE-IT",
            owner: "by Barron Associates",
            // Anatomy of Play MOVE-IT highlights
            text: "A 9-axis sensor, LED cues, and haptic feedback guide arm movement for hemiplegic cerebral palsy.",
          },
          {
            device: "Bluetooth EMG sensors",
            img: "portfolio/neurosparks-emg-sensors.jpg",
            alt: "Two small blue wireless muscle sensors, one turned over to show its three electrode snaps.",
            pos: "50% 45%",
            project: "NeuroSPARKS and KneeBRIGHT",
            owner: "by Barron Associates",
            // Anatomy of Play NeuroSPARKS ("Bluetooth-enabled sensor") and KneeBRIGHT ("EMG-controlled gameplay")
            text: "A Bluetooth muscle sensor drives science games; EMG guides knee osteoarthritis therapy.",
          },
          {
            device: "EMG sensor and phone",
            img: "portfolio/flexsledding.jpg",
            alt: "The mTrigger Flex Sledding menu, with Play, Settings, How To Play, and Testing Mode, over a snowy sled track.",
            project: "mTrigger Flex Sledding",
            owner: "by mTrigger",
            // games.ts flexsledding.summary
            text: "Patients flex to steer a sled, on the mTrigger wireless EMG system for iOS and Android.",
          },
          {
            device: "Connected bike",
            img: "portfolio/lanebreak.jpg",
            alt: "Peloton Lanebreak: a glowing blue wheel throws sparks as it rolls along a dark track marked with blue beats.",
            project: "Lanebreak",
            owner: "by Peloton",
            // Anatomy of Play Lanebreak ("Real-time resistance + cadence control"); games.ts lanebreak.summary
            text: "The bike's resistance and cadence steer a wheel through music-driven levels.",
          },
        ],
        grants: GRANTS,
      },
      {
        kind: "feature",
        eyebrow: "HELIX",
        title: "From headset to dashboard",
        picture: { ...A.helixTemple, caption: "HELIX: a portal to unlock in the digits-in-noise test" },
        thumbs: [
          // presskit.ts, HELIX media
          { src: "games/helix/helix-drums.jpg", alt: "Looking down at two drums, one edged in blue and one in red, with a bone drumstick in each hand." },
          { src: "games/helix/helix-portal-gate.jpg", alt: "A wooden gate on a green platform in space, with a stone portal and its keypad behind it." },
        ],
        heading: "HELIX, in three parts",
        // servicePages.ts vr-ar focus[0] points and html; games.ts helix.summary
        points: [
          "A Unity VR app for Meta Quest 2",
          "A data system on HIPAA-compliant AWS services (RDS, S3, EC2)",
          "A web dashboard for organizations, providers, and patients",
        ],
        notes: [
          "Built with audiologists and Nemours Children's Hospital.",
          "Started with funding from the DBI CAT grant program. Pilot study with about 30 subjects in 2023.",
        ],
      },
    ],
    processFrom: "vr-ar-development",
    cta: {},
    urls: ["/services/vr-ar-development/", "/services/serious-games/"],
  },

  // ── Unity development ────────────────────────────────────────────────────────────────────
  {
    slug: "unity-development",
    ...cover("unity-development"),
    pack: ["Peloton", "Computer Lunch", "Cartoon Network", "Red Essence Games", "Kodeco", "Nemours Children's Health"],
    cases: [
      {
        kind: "case",
        eyebrow: "Why Unity specialists",
        title: "The engine most top mobile games run on",
        points: [
          // servicePages.ts unity-development stack.lead (the studio's statement)
          "We keep Unity projects current: we have worked with every render pipeline and with Unity versions back to Unity 4, and we like to work in Unity 2022 and up.",
          // servicePages.ts unity-development focus[1]
          "Build automation: CI/CD pipelines we built for Unity shortened release cycles and made releases more stable.",
          // servicePages.ts unity-editor-tools
          "Editor tools take repeated work off your team, as Scriptable Sheets does for game data.",
        ],
        evidence: [UNITY_SHARE],
        picture: {
          src: "games/sheep-tag-2/screenshot-08.jpg",
          alt: "The Wardrobe screen in Sheep Tag 2: a Sheep stands on its hind legs trying on a Mushroom hat beside a grid of items to choose from.",
          caption: "Sheep Tag 2, our game, built in Unity",
        },
      },
    ],
    what: {
      eyebrow: "What we build",
      title: "Unity engineering, from gameplay to builds",
      items: [
        // servicePages.ts unity-development what.items and focus[0]; unity-editor-tools what
        { icon: "gamepad", title: "Gameplay and multiplayer", text: "Gameplay systems in C#, and Photon Quantum with prediction and rollback for up to 32 players." },
        // servicePages.ts unity-development focus[0]
        { icon: "layers", title: "Joining your project", text: "We get your project building, learn how it is put together, and agree what to change before we change it." },
        { icon: "wrench", title: "Editor tools", text: "Editor windows, inspectors, data editors, and import pipelines, like Scriptable Sheets." },
        { icon: "rocket", title: "Build automation and streaming", text: "CI/CD pipelines that automate Unity builds, and 3D simulations streamed with AWS and WebRTC." },
        { icon: "cube", title: "Upgrades and optimization", text: "Debugging, performance work, and bringing older projects onto current Unity." },
      ],
      picture: {
        src: "games/sheep-tag-2/screenshot-03.jpg",
        // servicePages.ts game-development focus[1].imageAlt
        alt: "A Sheep casts Fortify in the middle of a huge grid of farms on ReVoLuTiOn as Wolves close in from the right.",
        caption: "Sheep Tag 2, our game, built in Unity",
      },
      // servicePages.ts unity-development stack.lead (the studio's statement)
      note: "We have worked with every Unity render pipeline, and with Unity versions as far back as Unity 4. We like to work in modern versions: Unity 2022 and up.",
    },
    work: {
      kind: "cards",
      eyebrow: "Selected work",
      title: "Unity projects we've built and worked on",
      cards: [
        withDesc(C.sheepTag2, "32-player online multiplayer"),
        withDesc(C.hypnoHalo, "On Steam and Nintendo Switch"),
        withDesc(C.warcodes, "Achievements and progression"),
        withDesc(C.helix, "Unity VR app on Meta Quest 2"),
        C.lanebreak,
        C.cellToSingularity,
      ],
    },
    proof: [
      {
        kind: "tool",
        eyebrow: "Our own tool",
        title: "Scriptable Sheets, on the Unity Asset Store",
        picture: {
          src: "scriptable-sheets/screenshot-02.jpg",
          // presskit.ts, Scriptable Sheets screenshot-02
          alt: "A table of weapon ScriptableObjects with a column picker open, beside the Unity Inspector showing the selected weapon.",
        },
        // servicePages.ts unity-editor-tools work.feature
        lead: "ScriptableObjects, Prefabs, Components, and other Unity assets in a spreadsheet-like table inside the Editor.",
        points: [
          "On the Unity Asset Store since July 2024",
          "Supports Unity 2020.3 LTS and later",
          "Ships with full source code, samples, and unit tests",
        ],
        award: "Nominee, Best Development Tool, 17th Unity Awards (2025)",
        quote: "home-03",
      },
    ],
    processFrom: "unity-development",
    cta: {},
    urls: ["/services/unity-development/", "/services/unity-editor-tools/"],
  },
];
