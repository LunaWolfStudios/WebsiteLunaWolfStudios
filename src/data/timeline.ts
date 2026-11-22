/**
 * Studio history, oldest first. Every entry comes from archive/research/reviews-partners-history.md
 * (section 3, "Timeline"), the old site and blog in archive/, or the Sheep Tag 2 site's
 * presskit.ts. `source: "studio"` marks entries only the studio's own account supports.
 *
 * Photos: the owner chose which ones stay (src/data/photos.ts has the full set and the recent
 * event photos, which /about/ shows above the timeline). The 2015 East Coast Reboot photo
 * shows six people: it is the team at the jam, not the founders. No photo that shows a child's
 * face is used.
 *
 * The 2026 shows: Awesome Con's month is the date of the owner's photos, Thy Geekdom Con ran
 * over Memorial Day weekend (its public listings), and ImmerseCon was in July (the owner).
 */
import type { TimelineEntry } from "./types";

export const TIMELINE: TimelineEntry[] = [
  {
    date: "2015-01",
    when: "January 2015",
    text: "Three Wilmington University students found Luna Wolf Studios in Newark, Delaware.",
  },
  {
    date: "2015-05",
    when: "May 2015",
    text: "Haberdashery, made with Geek Monster Games, goes up on Newgrounds and is featured on its front page on June 1.",
    slug: "haberdashery",
  },
  {
    date: "2015",
    when: "2015",
    text: "Fungeon Crawler takes 1st place at Wilmington University's East Coast Reboot game jam, built in 48 hours on the theme Oxymoron.",
    slug: "fungeon-crawler",
    photo: "studio/ecrb-2015-game-jam-win-team.jpg",
    caption: "The Luna Wolf Studios team with the East Coast Reboot game jam certificate, 2015.",
    source: "studio",
  },
  {
    date: "2015-08",
    when: "August 2015",
    text: "Jeff builds the first standalone prototypes of Sheep Tag 2.",
    slug: "sheep-tag-2",
    source: "studio",
  },
  {
    date: "2015-09",
    when: "September 2015",
    text: "Haberdashery is selected for the Boston Festival of Indie Games showcase.",
    slug: "haberdashery",
  },
  {
    date: "2015-11",
    when: "2015",
    text: "The studio shows Haberdashery at GameACon in Atlantic City and in the App Arcade at the Delaware Innovation Week Innovation Celebration.",
    slug: "haberdashery",
  },
  {
    date: "2016-10",
    when: "October 2016",
    text: "Save Samia, an endless runner built for YouTube creator LaToya Forever, comes out on iOS, Android, and Facebook, with Luna Wolf Studios leading development.",
    slug: "save-samia",
    source: "studio",
  },
  {
    date: "2016-10-24",
    when: "October 2016",
    text: "Haberdashery is nominated for Indie Video Game of the Year at the 2016 Delaware Innovation Awards.",
    slug: "haberdashery",
    photo: "studio/delaware-innovation-awards-2016-ceremony.jpg",
    caption: "The crowd at the 2016 Delaware Innovation Awards, where Haberdashery was nominated for Indie Video Game of the Year.",
  },
  {
    date: "2016-11",
    when: "November 2016",
    text: "The studio shows Haberdashery and Turbo Hobo Cannon at GameACon 2016 at the Tropicana in Atlantic City.",
    slug: "haberdashery",
    photo: "studio/gameacon-2016-team-at-booth.jpg",
    caption: "The Luna Wolf Studios booth at GameACon 2016 in Atlantic City.",
    source: "studio",
  },
  {
    date: "2016-11-13",
    when: "November 2016",
    text: "Plan C takes 1st place at the East Coast Reboot game jam, made in 48 hours on the theme Eggs.",
    slug: "plan-c",
    source: "studio",
  },
  {
    date: "2016-11-16",
    when: "November 2016",
    text: "Haberdashery is in the Tech2gether demo pit at World Cafe Live in Wilmington during Delaware Innovation Week.",
    slug: "haberdashery",
    photo: "studio/tech2gether-2016-haberdashery-booth.jpg",
    caption: "Jeremy at the Haberdashery booth, Tech2gether 2016.",
    source: "studio",
  },
  {
    date: "2017-02",
    when: "Early 2017",
    text: "Jeremy visits MAGFest 2017 to play other indie developers' games.",
    photo: "studio/magfest-2017-indie-showcase.jpg",
    caption: "Playing other developers' indie games at MAGFest 2017.",
    source: "studio",
  },
  {
    date: "2017-06",
    when: "Summer 2017",
    text: "The studio shows Haberdashery at Awesome Con.",
    slug: "haberdashery",
    source: "studio",
  },
  {
    date: "2017",
    when: "2017",
    text: "Low-poly 3D artist Quaternius joins Sheep Tag 2 to make its models and animations.",
    slug: "sheep-tag-2",
    source: "studio",
  },
  {
    date: "2017-09",
    when: "September 2017",
    text: "ParaLily is playable for the first time, at A Video Game Con.",
    slug: "paralily",
  },
  {
    date: "2018-06-19",
    when: "June 2018",
    text: "WilmU News profiles the studio, including the five educational games it made for Legends of Learning.",
  },
  {
    date: "2018-07",
    when: "July 2018",
    text: "ParaLily wins Best in Show at Replay FX in Pittsburgh.",
    slug: "paralily",
    source: "studio",
  },
  {
    date: "2021-11",
    when: "November 2021",
    text: "The Sheep Tag 2 Kickstarter is funded, raising $10,072 from 65 backers.",
    slug: "sheep-tag-2",
  },
  {
    date: "2021-11-09",
    when: "November 2021",
    text: "ParaLily comes out on Steam. It reaches Nintendo Switch in February 2022, published by Luna Wolf Studios.",
    slug: "paralily",
  },
  {
    date: "2022-12",
    when: "December 2022",
    text: "The Sheep Tag 2 closed beta begins, and every Kickstarter reward is delivered on time.",
    slug: "sheep-tag-2",
    source: "studio",
  },
  {
    date: "2023",
    when: "2023",
    text: "HELIX, a VR hearing assessment developed with Nemours, completes a pilot study with about 30 subjects after initial funding from the DBI CAT grant program.",
    slug: "helix",
    source: "studio",
  },
  {
    date: "2024-07",
    when: "July 2024",
    text: "Scriptable Sheets launches on the Unity Asset Store.",
    slug: "scriptable-sheets",
  },
  {
    date: "2025-08",
    when: "Summer 2025",
    text: "The first internship cohort, three interns, ships Coppervalle Rush.",
    slug: "coppervalle-rush",
  },
  {
    date: "2025-10-21",
    when: "October 2025",
    text: "Hypno Halo comes out on Steam, developed and published by Luna Wolf Studios. It reaches Nintendo Switch in November 2025.",
    slug: "hypno-halo",
  },
  {
    date: "2025-11",
    when: "November 2025",
    text: "Scriptable Sheets is a nominee for Best Development Tool and Luna Wolf Studios a nominee for Breakthrough Publisher at the 17th Unity Awards.",
    slug: "scriptable-sheets",
  },
  {
    date: "2026-03",
    when: "March 2026",
    text: "The studio shows Hypno Halo at Awesome Con 2026.",
    slug: "hypno-halo",
    source: "studio",
  },
  {
    date: "2026-04",
    when: "Spring 2026",
    text: "Five interns ship RAILBOUND, a 2D roguelike action game.",
    slug: "railbound",
  },
  {
    date: "2026-05",
    when: "May 2026",
    text: "The studio and its interns show RAILBOUND at Thy Geekdom Con 2026.",
    slug: "railbound",
    source: "studio",
  },
  {
    date: "2026-07",
    when: "July 2026",
    text: "The studio is in the Indie Dev Showcase at ImmerseCon 2026.",
    source: "studio",
  },
  {
    date: "2026-08-27",
    when: "August 2026",
    text: "Luna Wolf Studios publishes The Brave Hearts II: False Skies on Steam, developed by Connor Butler, who came through the studio's internship program.",
    slug: "the-brave-hearts-ii-false-skies",
  },
  {
    date: "2026-08-31",
    when: "Summer 2026",
    text: "Six interns from Wilmington University, Harrisburg University, George Mason University, and Old Dominion University ship On the Rocks, a 3D cashier simulation.",
    slug: "on-the-rocks",
  },
  {
    date: "2027",
    when: "2027",
    text: "Sheep Tag 2 is planned for Early Access on Steam.",
    slug: "sheep-tag-2",
  },
];

/**
 * The internship program, as the research notes record it. Interns are not named. The schools
 * are the ones itch.io and the trailers name for the three cohorts.
 */
export const INTERNSHIP = {
  cohorts: [
    { term: "Summer 2025", slug: "coppervalle-rush", team: "3 interns" },
    { term: "Spring 2026", slug: "railbound", team: "5 interns" },
    { term: "Summer 2026", slug: "on-the-rocks", team: "6 interns" },
  ],
  schools: ["Wilmington University", "Harrisburg University", "George Mason University", "Old Dominion University"],
  /** The one intern the site names: the developer of The Brave Hearts II (owner-confirmed). */
  namedAlumnus: { name: "Connor Butler", slug: "the-brave-hearts-ii-false-skies" },
} as const;
