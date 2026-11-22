/**
 * Every game and project the site shows.
 *
 * - GAMES: game cards, in display order within each category (studio, published, client,
 *   experience, jam, internship). GameCard takes these.
 * - PROJECTS: everything else the site lists: Scriptable Sheets (category "tool"), web apps,
 *   tutorials, tabletop and screen credits, and prototypes in development.
 *
 * Sources: archive/research/{games-steam,portfolio,small-games-and-videos,scriptable-sheets}.md
 * (portfolio.md's "Second pass" wins where the two passes differ), the old pages in
 * archive/wordpress/pages/, and the Sheep Tag 2 site's src/data/. Rules:
 *
 * - Client and employer projects are credited to their owners. `role` is the old site's own
 *   wording and is left out where the old site states none.
 * - No prices, discounts, ratings, review counts, or version numbers here: src/data/store.json
 *   has them, keyed by `slug` and the store ids (`steamAppId`, `nsuid`, `assetStoreId`).
 * - `year` is left out where sources disagree.
 * - A project with no working official page has no link; a project with no usable art has no
 *   cover (render a text card). No archive.org links.
 * - Cards show wide store or video art where it exists. The old site's square icons and
 *   600x900 covers (Lanebreak, Cell to Singularity, Traveler's Refrain, Save Samia, OK K.O.!,
 *   Lab Rat, Chess) are kept as `icon` and `cover` data and in src/assets/, not all rendered.
 * - Work for other companies is shown as "what we've worked on" (the owner's framing), each
 *   card naming the company that owns the product. No employment or contract labels.
 * - `listedBy` is derived from FOUNDER_PORTFOLIO in team.ts; do not set it by hand.
 */
import { LINKS } from "./links";
import { foundersListing } from "./team";
import type { Game, GameCategory, Project, ProjectCategory } from "./types";

const shots = (folder: string, n: number, ext = "jpg") =>
  Array.from({ length: n }, (_, i) => `${folder}/screenshot-${String(i + 1).padStart(2, "0")}.${ext}`);

const GAME_LIST: Game[] = [
  // ─── Studio games ──────────────────────────────────────────────────────────────────────
  {
    slug: "sheep-tag-2",
    engine: "Unity",
    title: "Sheep Tag 2",
    category: "studio",
    status: "upcoming",
    // Steam shows a release date of Feb 2, 2027 (checked 2026-11-21). The site prints only
    // "Early Access 2027" (CLAUDE.md); the date may move.
    releaseNote: "Early Access 2027",
    tagline: "Sheep vs. Wolves strategy and survival for up to 32 players online.",
    summary:
      "A free-to-play multiplayer game of Sheep against Wolves: the Sheep build farms to survive the round, and the Wolves work together to capture them. It is the standalone successor to Sheep Tag, a Warcraft III mod, and was funded on Kickstarter in November 2021.",
    developer: "Luna Wolf Studios",
    publisher: "Luna Wolf Studios",
    platforms: ["Windows", "macOS", "Linux"],
    page: "/sheep-tag-2/",
    links: [
      { kind: "steam", url: LINKS.sheepTag2Steam },
      { kind: "web", url: LINKS.sheepTag2Site, label: "sheeptag2.com" },
      { kind: "kickstarter", url: LINKS.sheepTag2Kickstarter },
    ],
    cover: "games/sheep-tag-2/capsule-600x900.jpg",
    coverShape: "portrait",
    wide: "games/sheep-tag-2/key-art.jpg",
    icon: "games/sheep-tag-2/icon-256.png",
    screenshots: shots("games/sheep-tag-2", 8),
    videoId: "ABIVaCo3QX4",
    featured: true,
    steamAppId: "537680",
    credits: [
      { name: "Jeff", role: "Creator: design, programming, and production" },
      { name: "Quaternius", role: "3D art and animation", url: "https://quaternius.com/" },
      { name: "Nik Hagialas", role: "Illustration, concept, and UI art", url: "https://www.nikhagialasart.com/" },
      { name: "Baelex Metcalf", role: "Original soundtrack" },
      { name: "Lazerwolph", role: "Original soundtrack" },
      { name: "M", role: "Original soundtrack" },
      { name: "Sara Sherlock", role: "Sound effects" },
    ],
  },
  {
    slug: "hypno-halo",
    // The engine of Hypno Halo, ParaLily, and The Brave Hearts II is the owner's word
    // (21 November 2026); no store page states it.
    engine: "Unity",
    title: "Hypno Halo",
    category: "studio",
    year: 2025,
    status: "released",
    tagline: "A minimalist score attack game with 300+ levels and 90+ minutes of electronic music.",
    summary:
      "Hypno Halo is a minimalist score attack game: 300+ handcrafted levels and 51 bonus challenges across 6 difficulties, played alone or with friends sharing the controls. It came out on Steam in October 2025 and on Nintendo Switch in November 2025.",
    developer: "Luna Wolf Studios",
    publisher: "Luna Wolf Studios",
    platforms: ["Windows", "macOS", "Linux", "Nintendo Switch"],
    page: "/hypno-halo/",
    links: [
      { kind: "steam", url: LINKS.hypnoHaloSteam },
      { kind: "switch", url: LINKS.hypnoHaloSwitch },
      { kind: "steam", url: LINKS.hypnoHaloDemo, label: "Free demo on Steam" },
    ],
    cover: "games/hypno-halo/capsule-600x900.jpg",
    coverShape: "portrait",
    wide: "games/hypno-halo/key-art.jpg",
    icon: "games/hypno-halo/icon-1024.jpg",
    screenshots: shots("games/hypno-halo", 8),
    videoId: "GiCsebs_FK4",
    featured: true,
    steamAppId: "3847950",
    nsuid: "70010000112025",
    // archive/wordpress/pages/hypno-halo.md, word for word. Valve rates the game "Unknown" on
    // Steam Deck: never write "Verified" or "Playable".
    features: [
      { text: "Tackle 300+ handcrafted levels and 51 bonus challenges across 6 difficulties" },
      { text: "Immerse yourself in 90+ minutes of electronic and techno music" },
      { text: "Unlock 50+ achievements and climb the leaderboards" },
      { text: "Full controller and touch screen support" },
      { text: "Steam Deck compatible", url: LINKS.hypnoHaloSteamDeck },
      { text: "Share controls with friends for co-op chaos" },
      { text: "Discover secret endings and hidden surprises" },
    ],
    credits: [
      { name: "Damiano Baldoni", role: "Music", url: "https://soundcloud.com/damiano_baldoni" },
      { name: "Rik4k", role: "Music", url: "https://soundcloud.com/rik4k" },
      { name: "Zane Little", role: "Music", url: "https://soundcloud.com/zane-little" },
    ],
  },
  {
    slug: "paralily",
    engine: "Unity",
    title: "ParaLily",
    category: "studio",
    year: 2021,
    status: "released",
    tagline: "A precision and puzzle platformer through a series of parallel universes.",
    summary:
      "Lily shifts between parallel universes to chase her stuffed dinosaur Patches through a mysterious door, and her momentum carries from one universe to the next. ParaLily is made by Team ParaLily, artist Nate Flynn and co-founder Jeff, and published by Luna Wolf Studios on Nintendo Switch and with Team ParaLily on Steam.",
    developer: "Team ParaLily",
    // Nintendo eShop: Luna Wolf Studios. Steam: Team ParaLily and Luna Wolf Studios.
    publisher: "Luna Wolf Studios",
    platforms: ["Windows", "Nintendo Switch"],
    page: "/paralily/",
    links: [
      { kind: "steam", url: LINKS.paralilySteam },
      { kind: "switch", url: LINKS.paralilySwitch },
      { kind: "web", url: LINKS.paralily, label: "paralilygame.com" },
      { kind: "itch", url: LINKS.paralilyItch },
    ],
    cover: "games/paralily/capsule-600x900.jpg",
    coverShape: "portrait",
    wide: "games/paralily/key-art.jpg",
    screenshots: shots("games/paralily", 10),
    videoId: "JcMM36wFX1U",
    featured: true,
    steamAppId: "1156760",
    nsuid: "70010000049873",
    // Steam and Nintendo eShop "Game Features", word for word.
    features: [
      { text: "Familiar platforming and side-scrolling action." },
      { text: "Hand-drawn environments, characters, and animations." },
      { text: "Innovative parallel universe shifting mechanics." },
      { text: "Collectibles, puzzles, and hidden pathways." },
      { text: "Creative multi-layered level designs." },
    ],
    credits: [
      { name: "Nate Flynn", role: "Artist" },
      { name: "Jeff", role: "Programmer" },
    ],
  },

  // ─── Published by the studio ───────────────────────────────────────────────────────────
  {
    slug: "the-brave-hearts-ii-false-skies",
    engine: "Unity",
    title: "The Brave Hearts II: False Skies",
    category: "published",
    year: 2026,
    status: "released",
    tagline: "A fully voice-acted, story-driven top-down shoot 'em up.",
    summary:
      "Fly as a Brave Heart pilot through a voice-acted campaign of arcade air combat against autonomous drones, with training, hardcore, and endless modes. Developer Connor Butler came through the studio's internship program, and Luna Wolf Studios published the game on Steam in August 2026.",
    role: "Publisher",
    owner: "Connor Butler",
    developer: "Connor Butler",
    publisher: "Luna Wolf Studios",
    platforms: ["Windows"],
    page: "/the-brave-hearts-ii-false-skies/",
    links: [{ kind: "steam", url: LINKS.braveHearts2Steam }],
    cover: "games/the-brave-hearts-ii-false-skies/capsule-600x900.jpg",
    coverShape: "portrait",
    wide: "games/the-brave-hearts-ii-false-skies/capsule-616x353.jpg",
    screenshots: shots("games/the-brave-hearts-ii-false-skies", 10),
    // The trailer is on Steam only; there is no YouTube upload.
    featured: true,
    steamAppId: "4918650",
    credits: [{ name: "Connor Butler", role: "Developer" }],
  },

  // ─── Client games (owned by others) ────────────────────────────────────────────────────
  {
    slug: "lanebreak",
    // Unity: the owner's word (21 November 2026), as for Cell to Singularity below.
    engine: "Unity",
    title: "Lanebreak",
    category: "client",
    year: 2022,
    tagline: "A gaming-inspired workout on the Peloton Bike and Bike+.",
    summary:
      "Riders steer a wheel along a six-lane track with the bike's resistance knob, chasing points through music-driven levels. Peloton released it to All-Access Members on February 17, 2022.",
    owner: "Peloton",
    platforms: ["Peloton Bike", "Peloton Bike+"],
    links: [{ kind: "web", url: "https://www.onepeloton.com/bike/lanebreak", label: "Peloton" }],
    cover: "portfolio/lanebreak-portrait.jpg",
    coverShape: "portrait",
    wide: "portfolio/lanebreak.jpg",
    featured: true,
  },
  {
    slug: "cell-to-singularity",
    engine: "Unity",
    title: "Cell to Singularity",
    category: "client",
    // Year left out: the current iOS listing is dated 2019 and the Steam release is Nov 3, 2021.
    tagline: "An idle clicker about the evolution of life, from one cell to the singularity.",
    summary:
      "Start as a single cell and upgrade biology, intellect, and technology until a civilization reaches the brink of technological singularity. Made by Computer Lunch for mobile, PC, and the web.",
    owner: "Computer Lunch",
    developer: "Computer Lunch",
    platforms: ["iOS", "Android", "Windows", "macOS", "Web"],
    links: [
      { kind: "web", url: "https://celltosingularity.com/", label: "celltosingularity.com" },
      { kind: "steam", url: "https://store.steampowered.com/app/977400/" },
    ],
    cover: "portfolio/cell-to-singularity-portrait.jpg",
    coverShape: "portrait",
    wide: "portfolio/cell-to-singularity.jpg",
    featured: true,
  },
  {
    slug: "travelers-refrain",
    // Steam styles it "Traveler's Refrain"; the old site wrote "Travelers Refrain".
    title: "Traveler's Refrain",
    category: "client",
    year: 2025,
    status: "released",
    tagline: "A song-casting, story-driven action RPG.",
    summary:
      "Wield a magical instrument, explore a forbidden forest, and help Traveler reunite with his lost love while defying the mecha-goddesses of fate. Developed by Red Essence Games and published by indie.io.",
    owner: "Red Essence Games",
    developer: "Red Essence Games",
    publisher: "indie.io",
    platforms: ["Windows"],
    links: [{ kind: "steam", url: "https://store.steampowered.com/app/2679660/Travelers_Refrain/" }],
    cover: "portfolio/travelers-refrain-portrait.jpg",
    coverShape: "portrait",
    wide: "portfolio/travelers-refrain.jpg",
    featured: true,
  },
  {
    slug: "citytopia",
    title: "Citytopia",
    category: "client",
    year: 2019,
    tagline: "A mobile city builder: grow a hamlet into a sprawling city.",
    summary:
      "Unlock neighborhoods, place buildings, and collect card packs to grow your city, from the makers of RollerCoaster Tycoon Touch. Atari and developer Nvizzio Creations launched it on iOS in 2019; Reliance Games has published it with Atari since 2022.",
    // The old site credits Reliance Games, the current publisher.
    owner: "Reliance Games",
    developer: "Nvizzio Creations",
    publisher: "Reliance Games",
    platforms: ["iOS", "Android"],
    links: [
      { kind: "web", url: "https://nvizzio.com/game/citytopia/", label: "Nvizzio Creations" },
      { kind: "apple", url: "https://apps.apple.com/us/app/citytopia-build-your-own-city/id1460807595" },
      { kind: "android", url: "https://play.google.com/store/apps/details?id=com.atari.mobile.citytopia" },
    ],
    cover: "portfolio/citytopia-portrait.jpg",
    coverShape: "portrait",
    wide: "portfolio/citytopia.jpg",
  },
  {
    slug: "genfanad",
    // Steam's full title is "Genfanad: A Generic Fantasy Adventure"; the old site uses "Genfanad".
    title: "Genfanad",
    category: "client",
    // Year left out: a 2022 trailer announced a browser release on Sep 27, 2022; Steam says
    // "To be announced".
    tagline: "An MMORPG and trading card game hybrid with bosses, dungeons, and co-op quests.",
    summary:
      "Deckbuilding meets bosses, dungeons, and cooperative quests: players level skills, upgrade gear, and collect cards. Made by Rose Tinted Games.",
    owner: "Rose Tinted Games",
    developer: "Rose Tinted Games",
    platforms: ["Windows", "macOS", "Linux"],
    links: [{ kind: "steam", url: "https://store.steampowered.com/app/1976290/Genfanad_A_Generic_Fantasy_Adventure/" }],
    cover: "portfolio/genfanad.jpg",
    coverShape: "landscape",
    wide: "portfolio/genfanad.jpg",
  },
  {
    slug: "robo-puzzle-smash",
    title: "Robo Puzzle Smash",
    category: "client",
    year: 2018,
    status: "released",
    tagline: "A competitive block-dropping puzzle game.",
    summary:
      "Drop blocks, rotate your field to match colors, and set up combos against an opponent. Made by Pxlplz; Jeremy worked on it as PR and community consultant.",
    role: "PR & Community Consultant",
    owner: "Pxlplz",
    developer: "Pxlplz",
    platforms: ["Windows", "macOS", "Linux"],
    links: [{ kind: "steam", url: "https://store.steampowered.com/app/792850/Robo_Puzzle_Smash/" }],
    cover: "portfolio/robo-puzzle-smash.jpg",
    coverShape: "landscape",
    wide: "portfolio/robo-puzzle-smash.jpg",
  },
  {
    slug: "save-samia",
    title: "Save Samia",
    category: "client",
    year: 2016,
    status: "archived",
    tagline: "An endless runner made for YouTube creator LaToya Forever.",
    summary:
      "Help Samia past obstacles and traps through the streets of Toronto, unlock characters from the LaToya's Life channel, and climb the leaderboard. It came out on iOS, Android, and Facebook on October 7, 2016, and is no longer listed in the stores.",
    // The old blog post (archive/blog/2017-02-05-save-samia-endless-arcade-runner.md):
    // "Luna Wolf Studios headed the development process".
    role: "Headed the development process",
    owner: "LaToya Forever",
    platforms: ["iOS", "Android", "Facebook"],
    links: [{ kind: "youtube", url: "https://www.youtube.com/watch?v=UOKxWUQqUD4&t=58s", label: "Gameplay video" }],
    cover: "portfolio/save-samia.jpg",
    coverShape: "landscape",
    wide: "portfolio/save-samia.jpg",
    icon: "portfolio/save-samia-portrait.png",
  },
  {
    slug: "fruit-slinger",
    title: "Fruit Slinger",
    category: "client",
    year: 2014,
    status: "archived",
    tagline: "A Wild West target-practice game: sling fruit at moving targets.",
    summary:
      "Help Sheriff Larry the Lemur by slinging fruit at moving targets, with 60+ unlockable challenges and four play modes. Made by Exalt Games for iOS and Android; no store listing survives.",
    owner: "Exalt Games",
    developer: "Exalt Games",
    platforms: ["iOS", "Android"],
    links: [{ kind: "youtube", url: "https://www.youtube.com/watch?v=Xto2EFAmkeg", label: "Trailer" }],
    cover: "portfolio/fruit-slinger.jpg",
    coverShape: "landscape",
    wide: "portfolio/fruit-slinger.jpg",
    videoId: "Xto2EFAmkeg",
  },
  {
    slug: "warcodes",
    title: "Warcodes",
    category: "client",
    // The year of Jeremy's role on the old page; the game itself came out in 2024.
    year: 2025,
    tagline: "A mobile monster battler that turns everyday barcodes into AI-made creatures.",
    summary:
      "Scan barcodes on everyday products to generate one-of-a-kind monsters, build a team, and battle other players. As a Unity developer for Emergent Worlds, Jeremy developed achievement systems, progression logic, reusable C# data structures, and user interfaces for it.",
    role: "Unity Developer",
    // Jeremy worked directly with the owner of Emergent Worlds (the studio owner's word,
    // 21 November 2026). The app stores list Cozy Orchards, LLC as the game's publisher.
    owner: "Emergent Worlds",
    platforms: ["iOS", "Android"],
    links: [
      { kind: "web", url: "https://warcodes.app/", label: "warcodes.app" },
      { kind: "apple", url: "https://apps.apple.com/us/app/warcodes/id6670556885" },
      { kind: "android", url: "https://play.google.com/store/apps/details?id=com.cozyorchards.warcodes" },
    ],
    cover: "portfolio/warcodes.jpg",
    coverShape: "landscape",
    wide: "portfolio/warcodes.jpg",
    icon: "portfolio/warcodes-square.png",
  },
  {
    slug: "ok-ko-under-siege",
    title: "OK K.O.! Under Siege",
    category: "client",
    // Year left out: Cartoon Network's video is from 2018; Jeff's 2016 demo reel already lists it.
    tagline: "A mobile game made at Cartoon Network's OK K.O.! Let's Be Heroes game jam.",
    summary:
      "Made at the game jam Cartoon Network held for a new OK K.O.! Let's Be Heroes mobile game. Cartoon Network's video goes behind the scenes of the jam.",
    owner: "Cartoon Network",
    links: [{ kind: "youtube", url: "https://www.youtube.com/watch?v=52Ly5DmDsvk", label: "Cartoon Network video" }],
    cover: "portfolio/ok-ko-under-siege.jpg",
    coverShape: "landscape",
    wide: "portfolio/ok-ko-under-siege.jpg",
    icon: "portfolio/ok-ko-under-siege-portrait.jpg",
    jam: { name: "Cartoon Network game jam" },
  },
  {
    slug: "lab-rat",
    title: "Lab Rat",
    category: "client",
    tagline: "Classroom science and math games hosted by Ratilda, the rat scientist.",
    summary:
      "Instructional games on the Legends of Learning platform, hosted by the scientist rat Ratilda. Legends of Learning lists three Lab Rat games: Molecule Maker, Fungus Muncher, and Math Cannon.",
    owner: "Legends of Learning",
    platforms: ["Web"],
    links: [{ kind: "web", url: "https://www.legendsoflearning.com/", label: "Legends of Learning" }],
    cover: "portfolio/lab-rat.png",
    coverShape: "square",
    icon: "portfolio/lab-rat-portrait.jpg",
    screenshots: ["portfolio/lab-rat.png", "portfolio/lab-rat-fungus-muncher.png", "portfolio/lab-rat-math-cannon.png"],
  },

  // ─── Experiences: health, education, training, and contract work ───────────────────────
  {
    slug: "helix",
    title: "HELIX",
    category: "experience",
    year: 2023,
    tagline: "A VR hearing assessment for auditory processing disorder.",
    summary:
      "HELIX (Hearing EvaLuation using Immersive eXtended reality) turns digits-in-noise, pure-tone, and sound-localization hearing tests into VR games on the Meta Quest 2, with a HIPAA-compliant AWS backend and a web dashboard for providers. It was developed in collaboration with Nemours Children's Hospital, started with funding from the DBI CAT grant program, and completed a pilot study with about 30 subjects in 2023.",
    developer: "Luna Wolf Studios",
    platforms: ["Meta Quest 2", "Web"],
    page: "/helix/",
    links: [],
    // A crop of helix-pure-tone.jpg without its top edge, which cuts through the word "Correct!".
    cover: "games/helix/helix-pure-tone-crop.jpg",
    coverShape: "landscape",
    wide: "games/helix/helix-pure-tone-crop.jpg",
    screenshots: ["games/helix/helix-digits-in-noise.jpg", "games/helix/helix-pure-tone.jpg"],
    featured: true,
  },
  {
    slug: "saebovr",
    title: "SaeboVR",
    category: "experience",
    tagline: "Upper-extremity rehabilitation software for stroke survivors, tracked with Kinect.",
    summary:
      "A Microsoft Kinect tracks shoulder and elbow movement while a virtual assistant guides patients through simulated self-care tasks with real-time feedback. Developed by Barron Associates and sold by Saebo.",
    owner: "Barron Associates",
    developer: "Barron Associates",
    platforms: ["Microsoft Kinect (PC)"],
    links: [
      // The owner's choice: Saebo's own article about SaeboVR (dated July 11, 2017).
      { kind: "web", url: "https://www.saebo.com/blogs/clinical-article/benefits-virtual-reality-stroke-rehabilitation", label: "Saebo" },
      { kind: "web", url: "https://www.barron-associates.com/about/projects/saebovr-upper-extremity-therapy-software/", label: "Barron Associates" },
    ],
    cover: "portfolio/saebovr.jpg",
    coverShape: "landscape",
    wide: "portfolio/saebovr.jpg",
    screenshots: ["portfolio/saebovr-article.jpg"],
  },
  {
    slug: "kneebright",
    title: "KneeBRIGHT",
    category: "experience",
    tagline: "Game-based home therapy for knee osteoarthritis, guided by EMG biofeedback.",
    summary:
      "KneeBRIGHT (Knee Biofeedback Rehabilitation Interface for Game-based Home Therapy) pairs wireless electromyography sensors with video games to guide muscle-strengthening exercise at home. It was supported by NIH NIAMS and developed by Barron Associates.",
    owner: "Barron Associates",
    developer: "Barron Associates",
    links: [{ kind: "web", url: "https://www.barron-associates.com/about/projects/kneebright/", label: "Barron Associates" }],
    cover: "portfolio/kneebright.jpg",
    coverShape: "landscape",
    wide: "portfolio/kneebright.jpg",
  },
  {
    slug: "move-it",
    title: "MOVE-IT",
    category: "experience",
    // Year left out: Barron dates the NIH award 2020; the studio's Anatomy of Play says 2018.
    tagline: "Telehealth therapy games and a smart toy for children with hemiplegia.",
    summary:
      "MOVE-IT (Motivating Occupational Virtual Experiences In Therapy for kids) pairs therapy software with a custom smart toy for home exercise, with remote monitoring. It was funded by an NIH Phase II SBIR grant and developed by Barron Associates.",
    owner: "Barron Associates",
    developer: "Barron Associates",
    links: [
      {
        kind: "web",
        url: "https://www.barron-associates.com/awards/barron-associates-to-develop-telehealth-system-for-pediatric-upper-extremity-therapy/",
        label: "Barron Associates",
      },
    ],
    // The smart toy, lit, from the studio's Anatomy of Play media (Barron's largest gameplay
    // image is 281x191). move-it.png and move-it-smart-toy.png are the earlier, smaller art.
    cover: "portfolio/move-it-smart-toy-photo.jpg",
    coverShape: "landscape",
    wide: "portfolio/move-it-smart-toy-photo.jpg",
  },
  {
    slug: "icare",
    // Barron Associates styles it "iCare"; the old site wrote "iCARE".
    title: "iCare",
    category: "experience",
    tagline: "Vision therapy games for children, played with anaglyph glasses and a webcam.",
    summary:
      "A video game system for vision therapy in children with amblyopia or convergence insufficiency: a webcam tracks red-cyan glasses so the mini-games keep a steady visual challenge, and progress unlocks an open world. Developed by Barron Associates.",
    owner: "Barron Associates",
    developer: "Barron Associates",
    links: [{ kind: "web", url: "https://www.barron-associates.com/about/projects/vision-therapy-based-on-computer-gaming/", label: "Barron Associates" }],
    cover: "portfolio/icare.png",
    coverShape: "landscape",
    wide: "portfolio/icare.png",
  },
  {
    slug: "neurosparks",
    title: "NeuroSPARKS",
    category: "experience",
    // Year left out: Barron cites a 2022 award; the studio's Anatomy of Play says 2021.
    tagline: "Middle school science games controlled by arm-muscle sensors.",
    summary:
      "An NIH-funded game system for middle school science, played with sensors that read arm muscle activity. It includes Neurobots for life science and Total Energy for physical science, and won a 2022 Tech & Learning Award of Excellence. Developed by Barron Associates.",
    owner: "Barron Associates",
    developer: "Barron Associates",
    links: [{ kind: "web", url: "https://www.barron-associates.com/about/projects/neurosparks/", label: "Barron Associates" }],
    // How it is played: the arm sensor's signal drives the Neurobots game (a rendered figure,
    // from the studio's Anatomy of Play media). neurosparks.png is the earlier, smaller art.
    cover: "portfolio/neurosparks-emg-sensor.jpg",
    coverShape: "landscape",
    wide: "portfolio/neurosparks-emg-sensor.jpg",
  },
  {
    slug: "grasp",
    title: "GRASP",
    category: "experience",
    // Year left out: Barron's GRASP post is dated March 31, 2019; the studio's Anatomy of Play says 2020.
    tagline: "Stroke rehabilitation games played with a sensor glove, built on everyday tasks.",
    summary:
      "GRASP (Glove Rehabilitation Application for Stroke Patients) pairs a sensor glove with motion tracking, so patients practice grip and hand use by preparing meals, gardening, shopping, and caring for animals in the game. It was supported by an NIH Fast-Track SBIR grant and developed by Barron Associates.",
    owner: "Barron Associates",
    developer: "Barron Associates",
    links: [
      {
        kind: "web",
        url: "https://www.barron-associates.com/general/journal-paper-published-on-glove-rehabilitation-application-for-stroke-patients-grasp-fast-track-sbir-phase-i-results/",
        label: "Barron Associates",
      },
    ],
    // The glove on a player's hand in front of the garden level (Anatomy of Play media).
    cover: "portfolio/grasp-glove.jpg",
    coverShape: "landscape",
    wide: "portfolio/grasp-glove.jpg",
  },
  {
    slug: "empathie",
    title: "EMPATHIE",
    category: "experience",
    tagline: "An educational game about life with a motor disability, played with an EMG sensor.",
    summary:
      "A game that gives middle school students a look at life with a motor disability and teaches design thinking about mobility, controlled by a wireless EMG sensor. A pilot with 48 students showed significant learning gains. Developed by Barron Associates.",
    owner: "Barron Associates",
    developer: "Barron Associates",
    links: [
      {
        kind: "web",
        url: "https://www.barron-associates.com/research-updates/barron-associates-completes-pilot-testing-with-middle-school-students-for-empathie-video-game/",
        label: "Barron Associates",
      },
    ],
    // No image exists on either Barron post or in Barron's media library.
  },
  {
    slug: "flexsledding",
    title: "mTrigger Flex Sledding",
    category: "experience",
    year: 2019,
    tagline: "A biofeedback therapy game: flex your muscles to steer a sled past rocks.",
    summary:
      "Built for the mTrigger wireless EMG system: patients flex to steer a sled past rocks and collect medals, with reps and contract and relax times set for each exercise. On Google Play and the App Store.",
    owner: "mTrigger",
    developer: "mTrigger, LLC",
    platforms: ["Android", "iOS"],
    links: [
      { kind: "android", url: "https://play.google.com/store/apps/details?id=com.mTrigger.FlexSledding2023" },
      { kind: "apple", url: "https://apps.apple.com/us/app/mtrigger-flex-sledding/id1438462797" },
    ],
    cover: "portfolio/flexsledding.jpg",
    coverShape: "landscape",
    wide: "portfolio/flexsledding.jpg",
    icon: "portfolio/flexsledding-icon.png",
  },
  // Relevate Health Games: the owner's Anatomy of Play files all three under Education. Their
  // media are phone screens (portrait), so each card picture is three of them side by side.
  {
    slug: "expression-lab",
    title: "Expression Lab",
    category: "experience",
    // Year left out: Allergan Medical Institute's Instagram post introducing it is dated
    // January 7, 2026; the studio's Anatomy of Play says 2025.
    tagline: "Anatomy training that links each facial expression to the muscles behind it.",
    summary:
      "An interactive anatomy training game: pick the facial muscles behind an expression, zoom in on each one to learn what it does, and use Explore mode for an overview of the face. Allergan Medical Institute introduced it in January 2026. Developed by Relevate Health Games.",
    owner: "Relevate Health Games",
    developer: "Relevate Health Games",
    links: [{ kind: "web", url: "https://www.instagram.com/p/DTOUkzcEv1V/", label: "Instagram" }],
    // The title card and two screens; the face is a 3D-rendered model, not a photograph.
    cover: "portfolio/expression-lab-screens.jpg",
    coverShape: "landscape",
    wide: "portfolio/expression-lab-screens.jpg",
  },
  {
    slug: "level-one",
    title: "Level One: A Diabetes Game",
    category: "experience",
    // Anatomy of Play says 2025; playlevelone.com gives no release date (checked 22 November
    // 2026). That page says "A Game by Level Ex"; Anatomy of Play credits Relevate Health Games.
    year: 2025,
    tagline: "A free mobile game that teaches type 1 diabetes management in bite-sized levels.",
    summary:
      "Players tap to give insulin before meals and juice when blood sugar drops, and watch insulin and sugar move through the bloodstream as they learn carb counting, insulin doses, and how to handle highs and lows. It is free on iOS and Android, for people with type 1 diabetes and the family, teachers, and nurses who support them. Developed by Relevate Health Games.",
    owner: "Relevate Health Games",
    developer: "Relevate Health Games",
    platforms: ["iOS", "Android"],
    links: [{ kind: "web", url: "https://playlevelone.com/", label: "playlevelone.com" }],
    cover: "portfolio/level-one-screens.jpg",
    coverShape: "landscape",
    wide: "portfolio/level-one-screens.jpg",
  },
  {
    slug: "discover-td",
    title: "Discover TD",
    category: "experience",
    // mind-td.com dates its page 02/2026, as Anatomy of Play does (2026).
    year: 2026,
    tagline: "Case-based training that teaches clinicians to recognize tardive dyskinesia.",
    summary:
      "An educational experience for US healthcare professionals: learn the Abnormal Involuntary Movement Scale (AIMS) exam, then talk with and examine virtual patients to tell tardive dyskinesia (TD) apart from other drug-induced movement disorders, with scored case challenges. Neurocrine Biosciences sponsors it. Developed by Relevate Health Games.",
    owner: "Relevate Health Games",
    developer: "Relevate Health Games",
    platforms: ["Web"],
    links: [{ kind: "web", url: "https://www.mind-td.com/discover-td", label: "MIND-TD" }],
    // The title screen and two others. Its patients are virtual avatars (the title screen
    // says no real patients were involved).
    cover: "portfolio/discover-td-screens.jpg",
    coverShape: "landscape",
    wide: "portfolio/discover-td-screens.jpg",
  },
  {
    slug: "harry-potter-the-exhibition",
    title: "Harry Potter: The Exhibition",
    category: "experience",
    year: 2022,
    tagline: "A touring Wizarding World exhibition with personalized interactive technology.",
    summary:
      "A behind-the-scenes exhibition of the characters, settings, and beasts of Harry Potter, Fantastic Beasts, and the wider Wizarding World, with personalized interactive technology. It premiered at The Franklin Institute in Philadelphia in 2022.",
    platforms: ["In-person exhibition"],
    links: [{ kind: "web", url: "https://fi.edu/en/press-room/press-kits/harry-potter-the-exhibition", label: "The Franklin Institute" }],
    cover: "portfolio/harry-potter-the-exhibition-banner.jpg",
    coverShape: "landscape",
    wide: "portfolio/harry-potter-the-exhibition-banner.jpg",
  },
  {
    slug: "realize",
    title: "Realize",
    category: "experience",
    year: 2020,
    status: "archived",
    tagline: "A room design app: scan a room, furnish it in 3D with real products, and shop.",
    summary:
      "Scan a room, furnish it in 3D with real products from décor brands, share designs, and buy through an in-app cart. As a Unity developer for Realize Design, Jeremy built Unity UI systems, backend integrations, and HTTP and JSON features, and tested on iOS and Android.",
    role: "Unity Developer",
    owner: "Realize Design",
    platforms: ["iPhone", "iPad"],
    // realize.design no longer loads and the app is gone from the App Store: no link.
    links: [],
    cover: "portfolio/realize-banner.jpg",
    coverShape: "landscape",
    wide: "portfolio/realize-banner.jpg",
  },
  {
    slug: "asurion-vr-soft-skills-training",
    title: "Asurion VR soft-skills training",
    category: "experience",
    year: 2021,
    tagline: "A VR soft-skills training experience for Meta Quest 2.",
    summary:
      "A virtual reality soft-skills training experience for Meta Quest 2, with 360-degree video, composited actors, backend activity tracking, and analytics. Jeremy designed and developed it as a contract VR developer for Asurion.",
    role: "VR Developer & Simulation Designer",
    owner: "Asurion",
    platforms: ["Meta Quest 2"],
    links: [],
  },
  {
    slug: "smu-mixed-reality-software",
    title: "Southern Methodist University mixed-reality software",
    category: "experience",
    year: 2024,
    tagline: "Mixed-reality software pairing Stereolabs ZED depth cameras with Meta Quest 2.",
    summary:
      "Interactive mixed-reality software that integrates Stereolabs ZED depth cameras with Meta Quest 2 hardware. Jeremy worked on it as a contract Unity developer for Southern Methodist University.",
    role: "Unity Developer",
    owner: "Southern Methodist University",
    platforms: ["Meta Quest 2"],
    links: [],
  },
  {
    slug: "syneos-health-unity-software",
    title: "Syneos Health Unity software",
    category: "experience",
    year: 2025,
    tagline: "Unity software for healthcare and pharmaceutical applications.",
    summary:
      "Unity software for healthcare and pharmaceutical applications, including Apple Vision Pro Shader Graph materials, Figma-based interfaces, and localization for Chinese-language users. Jeremy developed it as a contract Unity developer for Syneos Health.",
    role: "Unity Developer",
    owner: "Syneos Health",
    platforms: ["Apple Vision Pro"],
    links: [],
  },
  {
    slug: "eternia-the-quest",
    title: "Eternia: The Quest",
    category: "experience",
    tagline: "An educational game from Luna Wolf Studios.",
    summary: "An educational game by Luna Wolf Studios, offered as a downloadable build.",
    developer: "Luna Wolf Studios",
    // Jeremy's page links a Google Drive download of "Eternia The Quest_v1.0.zip".
    links: [
      {
        kind: "web",
        url: "https://drive.google.com/file/d/0B6OjWEv_hksBM0o1LU5oUFlwVms/view?resourcekey=0-CzXsv1vOcxscbg1AceeyjA",
        label: "Download (Google Drive)",
      },
    ],
  },
  {
    slug: "preston-and-steve-campout-for-hunger",
    title: "Preston & Steve Campout for Hunger",
    category: "experience",
    // What the project was is not on record (the only link is a sign-in-walled video).
    tagline: "A Wilmington University project.",
    summary:
      "Listed on Jeremy's page as a Wilmington University project. Camp Out for Hunger is WMMR radio's annual Preston & Steve food drive for Philabundance in Philadelphia.",
    owner: "Wilmington University",
    // The old link is a Facebook video that logged-out visitors cannot see: no link.
    links: [],
  },

  // ─── Studio itch.io and Newgrounds games, and jam entries ──────────────────────────────
  {
    slug: "haberdashery",
    title: "Haberdashery",
    category: "jam",
    year: 2015,
    status: "released",
    tagline: "An endless runner: run a sheep around a rotating world and collect 30+ hats.",
    summary:
      "Run for your little Sheep life past rocks, trees, spike pits, mines, and a dragon while you collect hat boxes and coins; every hat changes the gameplay. Produced by Luna Wolf Studios in collaboration with Geek Monster Games, it was nominated for Indie Video Game of the Year at the 2016 Delaware Innovation Awards.",
    developer: "Luna Wolf Studios, in collaboration with Geek Monster Games",
    platforms: ["Windows", "macOS", "Web"],
    page: "/haberdashery/",
    links: [
      { kind: "itch", url: LINKS.haberdasheryItch },
      { kind: "newgrounds", url: LINKS.haberdasheryNewgrounds },
    ],
    cover: "games/haberdashery/wp-icon-512.png",
    coverShape: "square",
    wide: "games/haberdashery/wp-pc-screenshot-01.jpg",
    icon: "games/haberdashery/wp-icon-512.png",
    screenshots: [
      "games/haberdashery/wp-pc-screenshot-01.jpg",
      "games/haberdashery/wp-pc-screenshot-02.jpg",
      "games/haberdashery/wp-pc-screenshot-03.jpg",
      "games/haberdashery/wp-pc-screenshot-04.jpg",
      "games/haberdashery/wp-pc-screenshot-05.jpg",
      "games/haberdashery/wp-pc-screenshot-06.jpg",
    ],
    videoId: "U7Wu3ZkDE7g",
    // itch.io "FEATURES", word for word.
    features: [
      { text: "Random environment every game!" },
      { text: "30 unlockable Hats!" },
      { text: "Different gameplay with every Hat!" },
      { text: "Extra Arcade modes to unlock and play!" },
      { text: "Leaderboards and Achievements to compete with friends" },
      { text: "Laughs for days!" },
    ],
  },
  {
    slug: "target-crack",
    title: "Target Crack",
    category: "jam",
    // Jeff's 2016 demo reel dates it 2015.
    year: 2015,
    tagline: "A speed and precision arcade game: tap targets to crack them.",
    summary:
      "Tap targets to crack them in three game modes, earn achievements, and challenge your friends on the leaderboards.",
    developer: "Luna Wolf Studios",
    page: "/target-crack/",
    // The mobile store links in the 2016 video description were not checked; itch.io only.
    links: [{ kind: "itch", url: LINKS.targetCrackItch }],
    cover: "games/target-crack/cover.png",
    coverShape: "square",
    icon: "games/target-crack/wp-icon-512.png",
    screenshots: [
      "games/target-crack/wp-phone-screenshot-01.jpg",
      "games/target-crack/wp-phone-screenshot-02.jpg",
      "games/target-crack/wp-phone-screenshot-03.jpg",
      "games/target-crack/wp-phone-screenshot-04.jpg",
      "games/target-crack/wp-phone-screenshot-05.jpg",
    ],
    videoId: "1mg7KmJ6nwE",
  },
  {
    slug: "plan-c",
    title: "Plan C",
    category: "jam",
    year: 2016,
    tagline: "Protect the egg: a wave-defense shooter made in 48 hours.",
    summary:
      "Defend the egg aboard the USS BC743 until Plan B arrives in this multidirectional wave-defense shooter. Made in 48 hours by a two-person team for the 2016 East Coast Reboot game jam at Wilmington University, where it took 1st place.",
    developer: "Luna Wolf Studios",
    platforms: ["Windows", "Web"],
    links: [
      { kind: "itch", url: LINKS.planCItch },
      { kind: "newgrounds", url: LINKS.planCNewgrounds },
    ],
    cover: "games/plan-c/cover.jpg",
    coverShape: "landscape",
    wide: "games/plan-c/screenshot-01.jpg",
    screenshots: shots("games/plan-c", 4),
    videoId: "s-bacelwUc4",
    // The win is the studio's own account (itch page, old blog).
    jam: { name: "East Coast Reboot game jam, Wilmington University", year: 2016, theme: "Eggs", result: "1st place" },
  },
  {
    slug: "turbo-hobo-cannon",
    title: "Turbo Hobo Cannon",
    category: "jam",
    year: 2016,
    tagline: "Launch a hobo out of a circus cannon and see how far he flies.",
    summary:
      "Set your angle, build up power, and launch a hobo out of a circus cannon; the further he flies, the better your score. Jeff's 2016 demo reel lists it as a 10-hour game jam game.",
    developer: "Luna Wolf Studios",
    platforms: ["Windows", "macOS", "Web"],
    links: [
      { kind: "itch", url: LINKS.turboHoboCannonItch },
      { kind: "newgrounds", url: LINKS.turboHoboCannonNewgrounds },
    ],
    cover: "games/turbo-hobo-cannon/cover.jpg",
    coverShape: "landscape",
    wide: "games/turbo-hobo-cannon/screenshot-01.jpg",
    screenshots: shots("games/turbo-hobo-cannon", 4),
    videoId: "QbJLX45ZAB0",
  },
  {
    slug: "lightning-luther",
    title: "Lightning Luther",
    category: "jam",
    year: 2017,
    tagline: "Play as Martin Luther: post the Ninety-five Theses and avoid the lightning.",
    summary:
      "Post Martin Luther's Ninety-five Theses on church doors, collect scrolls, and avoid lightning, reading the theses as you play. All proceeds go to Lutheran Disaster Relief.",
    developer: "Luna Wolf Studios",
    platforms: ["Windows"],
    links: [{ kind: "itch", url: LINKS.lightningLutherItch }],
    cover: "games/lightning-luther/cover.png",
    coverShape: "square",
    wide: "games/lightning-luther/screenshot-01.png",
    screenshots: shots("games/lightning-luther", 4, "png"),
  },
  {
    slug: "a-world-apart",
    title: "A World Apart",
    category: "jam",
    // Year left out: Jeff's demo reel dates it 2015; the builds and video are from March 2016.
    tagline: "Switch points of view to escape a spooky jungle and an eerie dungeon.",
    summary:
      "Control different points of view as you work through a spooky jungle and an eerie dungeon. Made in less than 5 days by a team of four for the IndieGameStand Game Jam, sponsored by Wilmington University, on the theme Point of View.",
    developer: "Luna Wolf Studios",
    platforms: ["Windows", "macOS"],
    links: [{ kind: "itch", url: LINKS.aWorldApartItch }],
    cover: "games/a-world-apart/cover.png",
    coverShape: "square",
    wide: "games/a-world-apart/screenshot-01.jpg",
    screenshots: shots("games/a-world-apart", 4),
    videoId: "kgX6P2j4NuI",
    jam: { name: "IndieGameStand Game Jam, sponsored by Wilmington University", theme: "Point of View" },
  },
  {
    slug: "fungeon-crawler",
    title: "Fungeon Crawler",
    category: "jam",
    year: 2015,
    tagline: "A randomly generated 3D dungeon crawler, made in Unity in 48 hours.",
    summary:
      "Play as Logic, a robot who throws his heart out to attack, and fight through randomly generated dungeons to the final boss. Made in 48 hours for the 2015 East Coast Reboot game jam at Wilmington University on the theme Oxymoron, where it took 1st place.",
    developer: "Luna Wolf Studios",
    platforms: ["Windows", "macOS"],
    links: [{ kind: "itch", url: LINKS.fungeonCrawlerItch }],
    // The old site's logo (archive/wordpress/media/2025/04/fungeon-crawler-logo.jpg); the itch
    // cover is only 128x128.
    cover: "games/fungeon-crawler/logo.jpg",
    coverShape: "square",
    wide: "games/fungeon-crawler/screenshot-01.jpg",
    icon: "games/fungeon-crawler/logo.jpg",
    screenshots: shots("games/fungeon-crawler", 2),
    videoId: "hi8JA0qNE3Q",
    // The win is the studio's own account (itch page, old blog, Jeremy's page).
    jam: { name: "East Coast Reboot game jam, Wilmington University", year: 2015, theme: "Oxymoron", result: "1st place" },
  },
  {
    slug: "chess",
    title: "Chess",
    category: "jam",
    year: 2016,
    tagline: "A 3D chess game built in Unity.",
    summary: "A chess game built in Unity 3D, shown in the studio's 2016 video \"Unity 3D Chess Demo\".",
    developer: "Luna Wolf Studios",
    links: [{ kind: "youtube", url: "https://www.youtube.com/watch?v=aMFrEneGMc0", label: "Demo video" }],
    cover: "videos/aMFrEneGMc0.jpg",
    coverShape: "landscape",
    wide: "videos/aMFrEneGMc0.jpg",
    videoId: "aMFrEneGMc0",
  },
  {
    slug: "beacon-of-hope",
    title: "Beacon of Hope",
    category: "jam",
    // Year left out: the Kickstarter ran in 2015; Jeff's 2016 demo reel dates the game 2014.
    tagline: "A neon logic game about clearing corrosion and lighting beacons.",
    summary:
      "A logic game set in a neon, computer-themed world: eliminate the corrosion and light the beacons. Damocles Thread Development ran its Kickstarter campaign.",
    owner: "Damocles Thread Development",
    links: [{ kind: "kickstarter", url: "https://www.kickstarter.com/projects/673212907/beacon-of-hope" }],
    // Kickstarter project photo; its caption reads "Game footage is alpha".
    cover: "portfolio/beacon-of-hope.jpg",
    coverShape: "landscape",
    wide: "portfolio/beacon-of-hope.jpg",
    icon: "portfolio/beacon-of-hope-portrait.jpg",
  },
  {
    slug: "madlads-tic-tac-toe",
    title: "Madlads Tic Tac Toe",
    category: "jam",
    tagline: "Tic-tac-toe for 1 to 8 players, with a growing board, blockers, and shields.",
    summary:
      "A browser tic-tac-toe variant for 1 to 8 players: get three win tokens in a row while expanding the board, placing triangle and rectangle blockers, protecting cells with dots, and crushing opponents' blocks.",
    developer: "Luna Wolf Studios",
    platforms: ["Web"],
    links: [{ kind: "web", url: LINKS.madladsTicTacToe, label: "Play in the browser" }],
    // Screenshot taken after dismissing the How to Play dialog (portfolio.md second pass).
    cover: "portfolio/madlads-tic-tac-toe.png",
    coverShape: "landscape",
    wide: "portfolio/madlads-tic-tac-toe.png",
  },
  {
    slug: "alex-and-the-amazing-lemonade-stand",
    title: "Alex and the Amazing Lemonade Stand",
    category: "jam",
    year: 2025,
    tagline: "A page-turning story that plays in the browser.",
    summary: "A page-turning story made in Unity that plays in the browser: drag the bottom corner of a page to turn it.",
    developer: "Luna Wolf Studios",
    platforms: ["Web"],
    links: [{ kind: "itch", url: LINKS.alexLemonadeStandItch }],
    cover: "games/alex-and-the-amazing-lemonade-stand/cover.png",
    coverShape: "square",
  },
  {
    slug: "rowan-of-bramblebrook",
    title: "Rowan of Bramblebrook",
    category: "jam",
    year: 2026,
    status: "in-development",
    tagline: "A PS1-inspired 3D fantasy adventure with village life, romance, and a dragon boss.",
    summary:
      "Platforming, exploration, combat, village life, relationships, shopkeeping, and RPG systems in a PS1-inspired fantasy world. Jeremy made it for the Official Unity Game Jam 2026 and is growing it into a larger game.",
    owner: "Jeremy Bregermann",
    developer: "Jeremy Bregermann",
    platforms: ["Windows", "Web"],
    links: [{ kind: "itch", url: LINKS.rowanOfBramblebrookItch }],
    cover: "games/rowan-of-bramblebrook/cover.jpg",
    coverShape: "landscape",
    wide: "games/rowan-of-bramblebrook/screenshot-02.jpg",
    screenshots: shots("games/rowan-of-bramblebrook", 2),
    videoId: "CUkivR_iqNI",
    // Ranking deliberately not recorded (orchestrator decision).
    jam: { name: "Official Unity Game Jam 2026", year: 2026, theme: "Lucky Number" },
  },
  {
    slug: "dead-air",
    title: "Dead Air",
    category: "jam",
    year: 2026,
    tagline: "A short atmospheric trucking horror game.",
    summary:
      "Drive a truck down a lonely highway at night as radio transmissions and unsettling events turn a routine delivery into psychological horror. Jeremy made it for Brackeys Game Jam 2026.2.",
    owner: "Jeremy Bregermann",
    developer: "Jeremy Bregermann",
    links: [{ kind: "itch", url: LINKS.deadAirItch }],
    // No cover or screenshots exist on itch.io.
    // Ranking deliberately not recorded (orchestrator decision).
    jam: { name: "Brackeys Game Jam 2026.2", year: 2026, theme: "Trust No One" },
  },

  // ─── Internship projects (interns are not named) ───────────────────────────────────────
  {
    slug: "coppervalle-rush",
    title: "Coppervalle Rush",
    category: "internship",
    year: 2025,
    status: "released",
    releaseNote: "Summer 2025 internship",
    tagline: "A fast-paced 2D minecart platformer full of hazards, upgrades, humor, and heart.",
    summary:
      "Play as Otis, a retired miner riding a runaway minecart through six levels to rescue his daughter Jade, with Story, FreePlay, and Endless modes. Made by three interns in the Summer 2025 internship program.",
    developer: "Luna Wolf Studios",
    team: "3 interns from Wilmington University and Harrisburg University",
    platforms: ["Windows"],
    links: [{ kind: "itch", url: LINKS.coppervalleRushItch }],
    cover: "games/coppervalle-rush/cover.png",
    coverShape: "landscape",
    wide: "games/coppervalle-rush/screenshot-01.jpg",
    screenshots: shots("games/coppervalle-rush", 7),
    videoId: "_BF9B-jiC7k",
  },
  {
    slug: "railbound",
    title: "RAILBOUND",
    category: "internship",
    year: 2026,
    status: "released",
    releaseNote: "Spring 2026 internship",
    tagline: "A fast-paced 2D roguelike action game aboard an infested train.",
    summary:
      "Fight car by car through procedurally generated railcars with parry, dash, and wall-jump moves, and upgrade weapons between runs. Made by five interns in the Spring 2026 internship program.",
    developer: "Luna Wolf Studios",
    team: "5 interns from Wilmington University",
    platforms: ["Windows"],
    links: [{ kind: "itch", url: LINKS.railboundItch }],
    cover: "games/railbound/cover.png",
    coverShape: "landscape",
    wide: "games/railbound/screenshot-01.jpg",
    screenshots: shots("games/railbound", 6),
    videoId: "X0YH8xkue6o",
  },
  {
    slug: "on-the-rocks",
    title: "On the Rocks",
    category: "internship",
    year: 2026,
    status: "released",
    releaseNote: "Summer 2026 internship",
    tagline: "A 3D cashier simulation set in a rundown liquor store.",
    summary:
      "Scan purchases, inspect IDs, catch fakes, and keep the line moving to hold on to your job. Made by six interns in the Summer 2026 internship program.",
    developer: "Luna Wolf Studios",
    team: "6 interns from Wilmington University, Harrisburg University, George Mason University, and Old Dominion University",
    platforms: ["Windows"],
    links: [{ kind: "itch", url: LINKS.onTheRocksItch }],
    cover: "games/on-the-rocks/cover.png",
    coverShape: "landscape",
    wide: "games/on-the-rocks/screenshot-01.jpg",
    screenshots: shots("games/on-the-rocks", 6),
    videoId: "0uA_8o4aLjQ",
  },
];

const PROJECT_LIST: Project[] = [
  // ─── The studio's Unity tool ───────────────────────────────────────────────────────────
  {
    slug: "scriptable-sheets",
    title: "Scriptable Sheets",
    category: "tool",
    year: 2024,
    status: "released",
    tagline: "View and edit your Unity assets in a spreadsheet-like table inside the Editor.",
    summary:
      "Scriptable Sheets shows ScriptableObjects, Prefabs, Components, and other Unity assets in a table, so you can sort, filter, edit, copy, and paste them in bulk. It imports and exports CSV, TSV, and JSON, pulls data from Google Sheets, and runs only in the Editor, so it is stripped from builds.",
    developer: "Luna Wolf Studios",
    // The Asset Store names the publisher "Luna Wolf Studios LLC".
    publisher: "Luna Wolf Studios",
    platforms: ["Unity Editor, 2020.3 LTS and later"],
    page: "/scriptable-sheets/",
    links: [
      { kind: "unity", url: LINKS.scriptableSheets },
      { kind: "web", url: LINKS.scriptableSheetsDocs, label: "Documentation" },
      { kind: "youtube", url: LINKS.scriptableSheetsPlaylist, label: "Video tutorials" },
    ],
    cover: "scriptable-sheets/key-image.jpg",
    coverShape: "landscape",
    wide: "scriptable-sheets/key-image.jpg",
    icon: "scriptable-sheets/icon.png",
    screenshots: shots("scriptable-sheets", 12),
    videoId: "r_FJBZjHUpA",
    featured: true,
    assetStoreId: "284559",
  },

  // ─── Web apps ──────────────────────────────────────────────────────────────────────────
  {
    slug: "anatomy-of-play",
    title: "Anatomy of Play",
    category: "app",
    tagline: "An interactive exhibition of serious games for health and fitness.",
    summary:
      "A web exhibition of serious games for health and fitness, organized by body region, with a summary, highlights, and media for each game.",
    developer: "Luna Wolf Studios",
    platforms: ["Web"],
    links: [{ kind: "web", url: LINKS.anatomyOfPlay, label: "Open the web app" }],
    cover: "portfolio/anatomy-of-play.png",
    coverShape: "landscape",
    wide: "portfolio/anatomy-of-play.png",
  },
  {
    slug: "fishwatch",
    title: "FishWatch",
    category: "app",
    tagline: "A stopwatch web app with start, lap, and reset.",
    summary: "A stopwatch web app with start, lap, and reset controls.",
    developer: "Luna Wolf Studios",
    platforms: ["Web"],
    links: [{ kind: "web", url: LINKS.fishWatch, label: "Open the web app" }],
    cover: "portfolio/fishwatch.png",
    coverShape: "landscape",
    wide: "portfolio/fishwatch.png",
  },
  {
    slug: "reel-gains",
    title: "Reel Gains",
    category: "app",
    tagline: "A workout tracker with plans, an exercise library, and a consistency calendar.",
    summary: "Start workouts, follow plans, browse exercises, and see a calendar of past sessions.",
    developer: "Luna Wolf Studios",
    platforms: ["Web"],
    links: [{ kind: "web", url: LINKS.reelGains, label: "Open the web app" }],
    cover: "portfolio/reel-gains.png",
    coverShape: "landscape",
    wide: "portfolio/reel-gains.png",
  },
  {
    slug: "finchat",
    title: "FinChat",
    category: "app",
    year: 2026,
    tagline: "An open-source, self-hosted chat app with channels and search.",
    summary:
      "A self-hosted chat app with channels, search filters, and light and dark themes, built in TypeScript on a Node.js server and released under the MIT license.",
    developer: "Luna Wolf Studios",
    platforms: ["Web"],
    links: [{ kind: "web", url: LINKS.finChat, label: "GitHub" }],
    cover: "portfolio/finchat.jpg",
    coverShape: "square",
  },
  {
    slug: "fresh-catch",
    title: "Fresh Catch",
    category: "app",
    tagline: "A shopping list app: add items, check them off, clear what is done.",
    summary: "A shopping list web app: add items to lists such as Grocery, check them off as you buy them, and clear the done items.",
    developer: "Luna Wolf Studios",
    platforms: ["Web"],
    links: [{ kind: "web", url: LINKS.freshCatch, label: "Open the web app" }],
    cover: "portfolio/fresh-catch.png",
    coverShape: "landscape",
    wide: "portfolio/fresh-catch.png",
  },
  {
    slug: "lifequest",
    title: "LifeQuest: The Next Level",
    category: "app",
    tagline: "A browser game about adult life skills, from budgeting to time management.",
    summary:
      "Mentor characters guide players through mini-games on budgeting, hygiene, nutrition, time management, recycling, boundaries, professionalism, and coping skills.",
    developer: "Luna Wolf Studios",
    platforms: ["Web"],
    links: [{ kind: "web", url: LINKS.lifeQuest, label: "Play in the browser" }],
    cover: "portfolio/lifequest.png",
    coverShape: "landscape",
    wide: "portfolio/lifequest.png",
  },

  // ─── Tutorials. Roles are the credit each Kodeco page shows; never print Jeff's surname. ─
  {
    slug: "audio-tutorial-for-unity-the-audio-mixer",
    title: "Audio Tutorial for Unity: the Audio Mixer",
    category: "tutorial",
    year: 2017,
    tagline: "Route, group, and mix game audio with Unity's Audio Mixer.",
    summary: "A Kodeco tutorial on using Unity's Audio Mixer to route, group, and mix game audio.",
    role: "Author",
    owner: "Kodeco",
    links: [{ kind: "web", url: "https://www.kodeco.com/532-audio-tutorial-for-unity-the-audio-mixer", label: "Kodeco" }],
    cover: "portfolio/audio-tutorial-for-unity-the-audio-mixer.png",
    coverShape: "landscape",
  },
  {
    slug: "how-to-make-a-match-3-game-in-unity",
    title: "How to Make a Match 3 Game in Unity",
    category: "tutorial",
    year: 2017,
    tagline: "Build a Match 3 game in Unity, step by step.",
    summary: "A Kodeco tutorial that builds a Match 3 game in Unity.",
    role: "Author",
    owner: "Kodeco",
    links: [{ kind: "web", url: "https://www.kodeco.com/673-how-to-make-a-match-3-game-in-unity", label: "Kodeco" }],
    cover: "portfolio/how-to-make-a-match-3-game-in-unity.png",
    coverShape: "landscape",
  },
  {
    slug: "scriptableobject-tutorial-getting-started",
    title: "ScriptableObject Tutorial: Getting Started",
    category: "tutorial",
    // No year: the page shows the 2019 update by someone else, and the original publication
    // date is not known. "Original author" next to 2019 would misdate Jeff's post.
    tagline: "Create and use ScriptableObjects to streamline Unity workflows.",
    summary:
      "A Kodeco tutorial on creating and using ScriptableObjects in Unity to streamline workflow, reduce memory use, and decouple code. Jeff wrote the original post; Ben MacKinnon updated it to Unity 2019.1 in May 2019.",
    role: "Original author",
    owner: "Kodeco",
    links: [{ kind: "web", url: "https://www.kodeco.com/2826197-scriptableobject-tutorial-getting-started", label: "Kodeco" }],
    cover: "portfolio/scriptableobject-tutorial-getting-started.png",
    coverShape: "landscape",
  },
  {
    slug: "unity-cheat-sheet-and-quick-reference-2018",
    title: "Unity Cheat Sheet and Quick Reference 2018",
    category: "tutorial",
    year: 2018,
    tagline: "A downloadable Unity cheat sheet and quick reference.",
    summary: "A Kodeco cheat sheet and quick reference for the questions that come up again and again in Unity.",
    role: "Author",
    owner: "Kodeco",
    links: [{ kind: "web", url: "https://www.kodeco.com/227-unity-cheat-sheet-and-quick-reference-2018", label: "Kodeco" }],
    cover: "portfolio/unity-cheat-sheet-and-quick-reference-2018.png",
    coverShape: "landscape",
  },
  {
    slug: "how-to-create-a-tower-defense-game-in-unity",
    title: "How to Create a Tower Defense Game in Unity",
    category: "tutorial",
    year: 2017,
    tagline: "Part 1 of a tutorial that builds a 2D tower defense game in Unity.",
    summary:
      "Part 1 of a Kodeco tutorial that builds a 2D tower defense game in Unity. Barbara Reichart wrote the original; Jeff updated it to Unity 2017.1.",
    role: "Updated for Unity 2017.1",
    owner: "Kodeco",
    links: [{ kind: "web", url: "https://www.kodeco.com/269-how-to-create-a-tower-defense-game-in-unity-part-1", label: "Kodeco" }],
    cover: "portfolio/how-to-create-a-tower-defense-game-in-unity.png",
    coverShape: "landscape",
  },
  {
    slug: "setup-a-bug-reporter-in-unity-using-trello",
    title: "Setup a Bug Reporter in Unity using Trello",
    category: "tutorial",
    year: 2018,
    tagline: "A video tutorial for Trello Poster, a free Unity tool that files Trello cards.",
    summary:
      "A video tutorial for Trello Poster, a free, open-source Unity tool that lets a game and its players create Trello cards directly, for example as a bug reporter.",
    developer: "Luna Wolf Studios",
    links: [{ kind: "youtube", url: "https://www.youtube.com/watch?v=ryXwG1j4rhI", label: "Watch on YouTube" }],
    cover: "portfolio/setup-a-bug-reporter-in-unity-using-trello.jpg",
    coverShape: "landscape",
    videoId: "ryXwG1j4rhI",
  },

  // ─── Jeremy's prototypes and R&D in development (no public page or art yet) ────────────
  {
    slug: "interstate-hauler",
    title: "Interstate: Hauler",
    category: "prototype",
    status: "in-development",
    tagline: "A trucking and life simulation about driving, exploration, and life on the road.",
    summary:
      "A large trucking and life simulation with vehicle physics, AI traffic, navigation, weather, dialogue, and interactive locations, built controller-first with optional steering-wheel support.",
    links: [],
  },
  {
    slug: "truck-sports-party",
    title: "Truck Sports: Party!",
    category: "prototype",
    status: "in-development",
    tagline: "A physics-driven multiplayer party game of unconventional sports played with trucks.",
    summary:
      "Multiple sporting events, local split-screen multiplayer, AI opponents, scoring, player profiles, and full gamepad support.",
    links: [],
  },
  {
    slug: "universal-ps1-game-asset-importer",
    title: "Universal PS1 Game Asset Importer",
    category: "prototype",
    status: "in-development",
    tagline: "Unity Editor R&D for importing PlayStation-era game assets.",
    summary:
      "An ongoing Unity Editor tooling project that analyzes and imports legacy PlayStation-era assets, with modular import pipelines, geometry reconstruction, scene generation, and diagnostic tools. It is a research and tooling project, not a release of third-party game content.",
    links: [],
  },

  // ─── Tabletop credits (Jeremy) ─────────────────────────────────────────────────────────
  {
    slug: "witch-hunter-the-invisible-world",
    title: "Witch Hunter: The Invisible World",
    category: "tabletop",
    year: 2018,
    tagline: "Live action rules for the Witch Hunter: The Invisible World role-playing game.",
    summary: "A live-action role-playing adaptation of the Witch Hunter: The Invisible World RPG, published as a 146-page book.",
    owner: "Alligator Alley Entertainment",
    links: [{ kind: "web", url: "https://www.amazon.com/Witch-Hunter-Invisible-World-AAE2505/dp/1931374988", label: "Amazon" }],
    cover: "portfolio/witch-hunter-the-invisible-world.jpg",
    coverShape: "portrait",
  },
  {
    slug: "the-underground-a-sam-and-fuzzy-rpg",
    title: "The Underground: A Sam & Fuzzy RPG",
    category: "tabletop",
    year: 2014,
    tagline: "A tabletop RPG based on the Sam & Fuzzy webcomic.",
    summary:
      "A tabletop role-playing game based on the Sam & Fuzzy webcomic, where players become ninjas, vampires, or gerbils. Its Kickstarter raised $34,358 from 729 backers.",
    owner: "Damocles Thread Development",
    links: [{ kind: "kickstarter", url: "https://www.kickstarter.com/projects/673212907/the-underground-a-sam-and-fuzzy-rpg" }],
    cover: "portfolio/the-underground-a-sam-and-fuzzy-rpg.jpg",
    coverShape: "landscape",
  },
  {
    slug: "tempters-an-infernally-clever-board-game",
    title: "Tempters: An Infernally Clever Board Game",
    category: "tabletop",
    year: 2014,
    tagline: "A board game for 2 to 5 players who play demons racing to tempt souls.",
    summary:
      "Players are demons, from Mammon to Lilith, racing to tempt souls into hell over about 90 minutes while contending with the forces of heaven. Funded on Kickstarter in 2014.",
    owner: "Damocles Thread Development",
    links: [{ kind: "kickstarter", url: "https://www.kickstarter.com/projects/673212907/tempters-an-infernally-clever-board-game" }],
    cover: "portfolio/tempters-an-infernally-clever-board-game.jpg",
    coverShape: "landscape",
  },

  // ─── Screen credits (Jeremy, background character) ─────────────────────────────────────
  {
    slug: "hustle",
    title: "Hustle",
    category: "screen",
    year: 2022,
    tagline: "A Netflix sports drama starring Adam Sandler.",
    summary: "A 2022 Netflix sports comedy-drama starring Adam Sandler as an NBA scout.",
    role: "Background character",
    owner: "Netflix",
    links: [{ kind: "web", url: "https://www.imdb.com/title/tt8009428/", label: "IMDb" }],
  },
  {
    slug: "mare-of-easttown",
    title: "Mare of Easttown",
    category: "screen",
    year: 2021,
    tagline: "An HBO crime drama miniseries starring Kate Winslet.",
    summary: "A 2021 HBO crime drama miniseries starring Kate Winslet as a detective in a small town outside Philadelphia.",
    role: "Background character",
    owner: "HBO",
    links: [{ kind: "web", url: "https://www.imdb.com/title/tt10155688/", label: "IMDb" }],
  },
];

for (const item of [...GAME_LIST, ...PROJECT_LIST]) {
  const founders = foundersListing(item.slug);
  if (founders.length) item.listedBy = founders;
}

export const GAMES: Game[] = GAME_LIST;
export const PROJECTS: Project[] = PROJECT_LIST;

/** Display order of the game categories, with headings for the games hub. */
export const GAME_CATEGORIES: Array<{ category: GameCategory; heading: string }> = [
  { category: "studio", heading: "Our games" },
  { category: "published", heading: "Games we publish" },
  // The owner's framing: "We make games, here's what we've worked on." Each card still names
  // the company that owns the game.
  { category: "client", heading: "Games we've worked on" },
  { category: "experience", heading: "Health, education, and training projects" },
  { category: "jam", heading: "Game jams and small games" },
  { category: "internship", heading: "Intern games" },
];

export const PROJECT_CATEGORIES: Array<{ category: ProjectCategory; heading: string }> = [
  { category: "tool", heading: "Unity tools" },
  { category: "app", heading: "Web apps" },
  { category: "tutorial", heading: "Tutorials" },
  { category: "prototype", heading: "In development" },
  { category: "tabletop", heading: "Tabletop games" },
  { category: "screen", heading: "Screen credits" },
];

export const gamesIn = (category: GameCategory): Game[] => GAMES.filter((g) => g.category === category);
export const projectsIn = (category: ProjectCategory): Project[] => PROJECTS.filter((p) => p.category === category);

/** Look up a game or project by slug. Throws for an unknown slug, so a typo fails the build. */
export function work(slug: string): Game | Project {
  const hit = GAMES.find((g) => g.slug === slug) ?? PROJECTS.find((p) => p.slug === slug);
  if (!hit) throw new Error(`[games] No game or project with slug "${slug}".`);
  return hit;
}

/** Look up a game card by slug. Throws for an unknown slug. */
export function game(slug: string): Game {
  const hit = GAMES.find((g) => g.slug === slug);
  if (!hit) throw new Error(`[games] No game with slug "${slug}".`);
  return hit;
}

/** The cards the home page shows: studio and published games first, then partner projects. */
export const FEATURED_GAMES: Game[] = GAMES.filter((g) => g.featured);

/** Scriptable Sheets, the studio's Unity Asset Store tool. */
export const SCRIPTABLE_SHEETS: Project = PROJECTS.find((p) => p.slug === "scriptable-sheets")!;
