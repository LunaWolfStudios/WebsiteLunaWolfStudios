/**
 * YouTube videos the site uses, grouped. Every poster is our own copy of the thumbnail (or the
 * Sheep Tag 2 site's poster), so a card costs no request to YouTube until someone presses play.
 * Titles, lengths, and publish dates: archive/research/small-games-and-videos.md (section 5),
 * scriptable-sheets.md ("Videos"), games-steam.md, and the Sheep Tag 2 site's videos.ts.
 *
 * Four thumbnails are 4:3 with letterbox bars (hi8JA0qNE3Q, sRHOBF1CzfI, CZq4V7gRbCw,
 * WjP35zv8zNo): VideoCard's 16:9 frame crops most of the bars away.
 */
import type { VideoItem } from "./types";

const v = (id: string, title: string, rest: Omit<VideoItem, "id" | "title" | "poster"> & { poster?: string } = {}): VideoItem => ({
  id,
  title,
  poster: rest.poster ?? `videos/${id}.jpg`,
  ...rest,
});

/** Sheep Tag 2: the two trailers, then one clip per section of the Steam page (sister site order). */
export const SHEEP_TAG_2_VIDEOS: VideoItem[] = [
  // Upload date from the video's own YouTube page (read 21 November 2026).
  v("ABIVaCo3QX4", "Early Access Gameplay Trailer", { poster: "games/sheep-tag-2/video-poster-gameplay-trailer.jpg", next: "9eJ0F5nIWL0", channel: "Sheep Tag 2", about: "sheep-tag-2", published: "2026-11-13" }),
  v("9eJ0F5nIWL0", "Cinematic Teaser", { poster: "games/sheep-tag-2/video-poster-cinematic-teaser.jpg", channel: "Sheep Tag 2", about: "sheep-tag-2" }),
  v("JwVvkdnIIQg", "Sheep Survive. Wolves Hunt.", { poster: "games/sheep-tag-2/video-poster-sheep-survive-wolves-hunt.jpg", about: "sheep-tag-2" }),
  v("ZAj3N36xC4k", "An Approachable RTS", { poster: "games/sheep-tag-2/video-poster-an-approachable-rts.jpg", about: "sheep-tag-2" }),
  v("_IQO36AQHe0", "Play as Sheep or Wolf", { poster: "games/sheep-tag-2/video-poster-play-as-sheep-or-wolf.jpg", about: "sheep-tag-2" }),
  v("7OzmgL1tVVg", "Play Online, Solo, or Both", { poster: "games/sheep-tag-2/video-poster-play-online-solo-or-both.jpg", about: "sheep-tag-2" }),
  v("PjNLCQmYS1c", "Build Your Battlegrounds", { poster: "games/sheep-tag-2/video-poster-build-your-battlegrounds.jpg", about: "sheep-tag-2" }),
  v("b-kbfnlHRtY", "Twenty Years in the Making", { poster: "games/sheep-tag-2/video-poster-twenty-years-in-the-making.jpg", about: "sheep-tag-2" }),
];

export const HYPNO_HALO_VIDEOS: VideoItem[] = [
  v("GiCsebs_FK4", "Hypno Halo Trailer", { length: "1:06", published: "2025-06-30", about: "hypno-halo" }),
  v("hB-5wimIR_I", "Hypno Halo - Nintendo Switch Trailer", { length: "1:05", published: "2025-12-06", about: "hypno-halo" }),
  v("CZq4V7gRbCw", "Hypno Halo Gameplay: 3 Million High Score", { length: "30:54", published: "2025-12-11", about: "hypno-halo" }),
  v("WjP35zv8zNo", "Hypno Halo Gameplay: Final Round and Credits", { length: "3:55", published: "2025-12-16", about: "hypno-halo" }),
];

/** Scriptable Sheets: the introduction first, then the playlist in its order (20 videos). */
export const SCRIPTABLE_SHEETS_VIDEOS: VideoItem[] = [
  v("r_FJBZjHUpA", "Scriptable Sheets: Introduction", { length: "1:31", published: "2024-08-25" }),
  v("G0BHLhTyYaA", "Scriptable Sheets: Getting Started", { length: "0:52", published: "2024-07-10" }),
  v("sopJAKQNJeU", "Scriptable Sheets: Basic Navigation", { length: "1:09", published: "2024-07-10" }),
  v("g2O8dtBUn3Y", "Scriptable Sheets: Accessing Settings", { length: "0:29", published: "2024-07-10" }),
  v("6f5wtxGv534", "Scriptable Sheets: Copy-Paste", { length: "0:35", published: "2024-07-10" }),
  v("m1YgPSdQiLQ", "Scriptable Sheets: Unity Layout", { length: "0:27", published: "2024-07-10" }),
  v("bDEzlEbm2MA", "Scriptable Sheets: Paste Pad", { length: "0:55", published: "2024-07-10" }),
  v("xsYu1ppPGWo", "Scriptable Sheets: Google Sheets", { length: "0:36", published: "2024-07-10" }),
  v("zuawA3XLSAA", "Scriptable Sheets: Data Transfer Settings", { length: "3:58", published: "2024-07-11" }),
  v("GKOAzSoqr9g", "Scriptable Sheets: Object Settings", { length: "2:10", published: "2024-07-11" }),
  v("87hi32dq-kw", "Scriptable Sheets: User Interface Settings", { length: "2:53", published: "2024-07-11" }),
  v("NOdoRur7B4E", "Scriptable Sheets: Table Nav Settings", { length: "1:10", published: "2024-07-11" }),
  v("tHzB1EbyYk8", "Scriptable Sheets: Supported Types", { length: "1:05", published: "2024-07-31" }),
  v("q6il9WTZ5ZQ", "Scriptable Sheets: Workload Settings (Rows and Columns)", { length: "0:48", published: "2024-07-11" }),
  v("wzI1M-I6sJA", "Scriptable Sheets: Scriptable Objects", { length: "3:07", published: "2024-07-31" }),
  v("eLHztXQKbDM", "Scriptable Sheets: Search Filters", { length: "1:56", published: "2024-07-31" }),
  v("N9Uwz-fwnLI", "Scriptable Sheets: What's New", { length: "1:30", published: "2025-04-24" }),
  v("zGyRCzYJAhM", "Scriptable Sheets Case Study: TCG Engine", { length: "3:20", published: "2025-05-02" }),
  v("PKhTuOgsXJ8", "Scriptable Sheets Case Study: DOTS Survivors", { length: "3:06", published: "2025-11-23" }),
  v("mteCjA1r3pM", "Scriptable Sheets: What's New 2026", { length: "3:04", published: "2026-06-23" }),
].map((x) => ({ ...x, about: "scriptable-sheets" }));

/** The introduction alone, for the home page and the product hero. */
export const SCRIPTABLE_SHEETS_INTRO: VideoItem = SCRIPTABLE_SHEETS_VIDEOS[0];

/** The 2025 Unity Awards nomination short (39 seconds, vertical). */
export const UNITY_AWARDS_SHORT: VideoItem = v("pYOiU0RmJio", "Scriptable Sheets Nominated Best Development Tool for 17th Unity Awards", {
  length: "0:39",
  published: "2025-11-18",
  about: "scriptable-sheets",
});

/** The Student Internships playlist, in its order (the old bootcamp page embedded it). */
export const INTERNSHIP_VIDEOS: VideoItem[] = [
  v("0uA_8o4aLjQ", "On the Rocks - Demo Trailer", { length: "0:37", published: "2026-08-31", about: "on-the-rocks" }),
  v("X0YH8xkue6o", "RAILBOUND - Demo Trailer", { length: "0:58", published: "2026-05-01", about: "railbound" }),
  v("_BF9B-jiC7k", "Coppervalle Rush - Demo Trailer", { length: "1:37", published: "2025-08-20", about: "coppervalle-rush" }),
];

/**
 * The studio's 2017 hype trailer, which the old Games page showed above its "Game Jam
 * Graveyard". Its description lists Save Samia, Turbo Hobo Cannon, LWPT Under Siege, A World
 * Apart, Haberdashery, Target Crack, Beacon of Hope, and Fungeon Crawler. The thumbnail is a
 * 480x360 letterboxed hqdefault; a game screenshot makes a sharper poster if one is wanted.
 */
export const JAM_REEL: VideoItem = v("sRHOBF1CzfI", "Hype Trailer - Luna Wolf Studios Indie Game Developers", {
  length: "1:00",
  published: "2017-03-31",
});

/** Trailers and gameplay videos for the smaller games, by slug. */
export const GAME_VIDEOS: VideoItem[] = [
  v("JcMM36wFX1U", "ParaLily - Teaser Trailer", { length: "1:00", published: "2019-08-25", channel: "ParaLily Game", about: "paralily" }),
  v("U7Wu3ZkDE7g", "Haberdashery Official Trailer", { length: "0:39", published: "2015-10-10", about: "haberdashery" }),
  v("BPf3JLbiTGw", "Haberdashery Teaser Trailer", { length: "0:30", published: "2015-09-02", about: "haberdashery" }),
  v("N8OZRSwbRf0", "Haberdashery Gameplay Sneak Peek", { length: "3:48", published: "2015-09-30", about: "haberdashery" }),
  v("1mg7KmJ6nwE", "Target Crack Gameplay", { length: "0:55", published: "2016-04-07", about: "target-crack" }),
  v("s-bacelwUc4", "Plan C Gameplay", { length: "1:11", published: "2017-01-23", about: "plan-c" }),
  v("QbJLX45ZAB0", "Turbo Hobo Cannon Gameplay", { length: "2:15", published: "2016-08-24", about: "turbo-hobo-cannon" }),
  v("kgX6P2j4NuI", "A World Apart - Gameplay and Walkthrough", { length: "7:00", published: "2016-03-30", about: "a-world-apart" }),
  v("hi8JA0qNE3Q", "Fungeon Crawler Gameplay", { length: "1:45", published: "2015-05-19", about: "fungeon-crawler" }),
  v("aMFrEneGMc0", "Unity 3D Chess Demo", { length: "3:42", published: "2016-03-31", about: "chess" }),
  v("CUkivR_iqNI", "Rowan of Bramblebrook | Official Gameplay Trailer – Cozy Fantasy Adventure & Dragons", {
    length: "1:26",
    published: "2026-11-13",
    channel: "Bregermann",
    about: "rowan-of-bramblebrook",
  }),
  // Other owners' videos that the old site linked for client projects.
  v("UOKxWUQqUD4", "STUD456 vs LATOYA FOREVER [PLAYING SAVE SAMIA]", { length: "20:42", published: "2016-11-26", channel: "Stud 456", about: "save-samia" }),
  v("52Ly5DmDsvk", "Building a NEW Game: Game Jam | OK K.O.! Let's Be Heroes | Cartoon Network", {
    length: "17:36",
    published: "2018-03-17",
    channel: "Cartoon Network",
    about: "ok-ko-under-siege",
  }),
  v("Xto2EFAmkeg", "Fruit Slinger Game Trailer for iOS and Android", { length: "0:32", published: "2014-08-12", channel: "Exalt Games", about: "fruit-slinger" }),
];

/** Tutorials and studio reels. */
export const OTHER_VIDEOS: VideoItem[] = [
  v("ryXwG1j4rhI", "[Unity + FREE] Setup a Bug Reporter in Unity using Trello", {
    length: "2:41",
    published: "2018-02-28",
    about: "setup-a-bug-reporter-in-unity-using-trello",
  }),
  v("qJYKzk2C2zA", "Luna Wolf Studios - Indie Game Developers", { length: "0:30", published: "2016-10-06" }),
  v("zVFeR7N4hiU", "Unity Game Engine Projects (Jeff: 2014 - 2016)", { length: "21:48", published: "2016-09-01" }),
  v("Fhu4tQ1Np-w", "Jeremy Bregermann - Demo Reel Abridged", { length: "0:55", published: "2018-12-27" }),
];

/** Every video above, for lookups. */
export const ALL_VIDEOS: VideoItem[] = [
  ...SHEEP_TAG_2_VIDEOS,
  ...HYPNO_HALO_VIDEOS,
  ...SCRIPTABLE_SHEETS_VIDEOS,
  UNITY_AWARDS_SHORT,
  ...INTERNSHIP_VIDEOS,
  JAM_REEL,
  ...GAME_VIDEOS,
  ...OTHER_VIDEOS,
];

/** The trailer (or main video) for a game slug: the first video about it. */
export const trailerFor = (slug: string): VideoItem | undefined => ALL_VIDEOS.find((x) => x.about === slug);
