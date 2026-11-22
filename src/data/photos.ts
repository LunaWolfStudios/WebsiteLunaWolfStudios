/**
 * Photos of the studio at events (src/assets/studio/). The owner picks them: on 22 November
 * 2026 he chose keep or remove for every photo of us on the site and for a shortlist from his
 * own albums (.review/photos/, not in git), and saved the captions. The recent ones lead; the
 * 2015 to 2017 ones are what he kept from the old site and blog
 * (archive/research/reviews-partners-history.md, section 5).
 *
 * Captions are his where he wrote one. People are named only where a caption names them.
 * Files are at most 2000 px, with no camera metadata. Never used: a photo that shows a
 * child's face.
 *
 * The press kit shows every photo and zips them as /press/luna-wolf-studios-photos.zip under
 * `out` (scripts/build.mts). /about/ shows the recent ones in the same arrangement.
 * Plain TypeScript, no Astro imports: the build script reads it.
 */
export interface StudioPhoto {
  /** File in src/assets/. */
  image: string;
  /** Its name in the photo zip. */
  out: string;
  alt: string;
  caption: string;
}

/**
 * A justified gallery (Gallery's `rows`): how many photos each row holds, on a desktop and on
 * a phone. Photos keep their own shape, so the rows are arranged by hand: change the counts
 * when a photo is added or removed.
 */
export interface PhotoLayout {
  rows: number[];
  rowsSm: number[];
}

const studio = (file: string, alt: string, caption: string): StudioPhoto => ({
  image: `studio/${file}`,
  out: file,
  alt,
  caption,
});

/** Recent events, newest first, as /about/ and the press kit show them. */
export const EVENT_PHOTOS: StudioPhoto[] = [
  // ImmerseCon, July 2026
  studio(
    "immersecon-2026-indie-dev-showcase.jpg",
    "Two players, seen from behind, sit at a table with two game screens under a wall banner that reads ImmerseCon Indie Dev Showcase.",
    "At the ImmerseCon 2026 Indie Dev Showcase.",
  ),
  // Thy Geekdom Con, May 2026
  studio(
    "thy-geekdom-con-2026-booth.jpg",
    "A selfie at a table with the Luna Wolf Studios logo on its cloth: two of our interns give thumbs up behind a monitor showing RAILBOUND.",
    "With our interns at our booth, Thy Geekdom Con 2026.",
  ),
  studio(
    "thy-geekdom-con-2026-railbound-banner.jpg",
    "One of our interns stands beside a RAILBOUND banner at the booth, behind a teal table with laptops and flyers.",
    "Our interns showed RAILBOUND at Thy Geekdom Con 2026.",
  ),
  studio(
    "thy-geekdom-con-2026-banner.jpg",
    "One of our interns holds up the Luna Wolf Studios banner by the hall's glass doors, with a RAILBOUND banner in the foreground.",
    "One of our interns with the Luna Wolf Studios banner at Thy Geekdom Con 2026.",
  ),
  // Awesome Con, March 2026
  studio(
    "awesome-con-2026-team-at-banner.jpg",
    "Four people stand in front of the Luna Wolf Studios banner, a wolf's head against a full moon, beside a booth table with a purple cloth.",
    "Our booth at Awesome Con 2026.",
  ),
  studio(
    "awesome-con-2026-thumbs-up.jpg",
    "A smiling man with an exhibitor badge gives a thumbs up and holds a jar of peanut butter, in front of the wolf on the Luna Wolf Studios banner.",
    "At our booth, Awesome Con 2026.",
  ),
  studio(
    "awesome-con-2026-booth-table.jpg",
    "A booth table with a purple cloth, a monitor showing Hypno Halo, and a tablet, with the Luna Wolf Studios banner behind it in a convention hall.",
    "Hypno Halo set up at our Awesome Con 2026 booth.",
  ),
  studio(
    "awesome-con-2026-hypno-halo-banner.jpg",
    "A Hypno Halo banner of neon rings hangs behind the tables of a convention game hall.",
    "The Hypno Halo banner at Awesome Con 2026.",
  ),
  studio(
    "awesome-con-2026-group-at-booth.jpg",
    "Four smiling people hold a small teal figure between them, with rows of game screens behind them.",
    "At Awesome Con 2026.",
  ),
  studio(
    "awesome-con-2026-booth-wide.jpg",
    "The Luna Wolf Studios booth seen from across the hall: players sit at screens on purple tables, with the studio banner on the right.",
    "Players at our booth, Awesome Con 2026.",
  ),
  // PAX East, May 2025
  studio(
    "pax-east-2025-with-tom-fulp.jpg",
    "Three people stand together in the PAX East expo hall, with the show floor behind them.",
    "With Tom Fulp at PAX East 2025.",
  ),
  studio(
    "pax-east-2025-dune-awakening-booth.jpg",
    "A man and a cosplayer in armor pose in front of a giant sandworm sculpture at the Dune: Awakening booth.",
    "At the Dune: Awakening booth, PAX East 2025.",
  ),
  studio(
    "pax-east-2025-meetup.jpg",
    "Five people smile for a group selfie in a crowded, dimly lit venue.",
    "At PAX East 2025.",
  ),
];

/** Four rows that run on from one event to the next, so the rows come out a similar height. */
export const EVENT_LAYOUT: PhotoLayout = {
  rows: [3, 3, 4, 3],
  rowsSm: [1, 1, 2, 1, 2, 2, 1, 1, 2],
};

/** 2015 to 2017, newest first. */
export const EARLIER_PHOTOS: StudioPhoto[] = [
  {
    image: "studio/magfest-2017-indie-showcase.jpg",
    out: "magfest-2017.jpg",
    alt: "Two photos of a team member in a wolf shirt and a blazer playing other developers' indie games on the MAGFest show floor.",
    caption: "Playing other developers' indie games at MAGFest 2017.",
  },
  {
    image: "studio/tech2gether-2016-haberdashery-booth.jpg",
    out: "tech2gether-2016-haberdashery-booth.jpg",
    alt: "Jeremy Bregermann gives two thumbs up behind a table with Haberdashery on a TV, beside a tall Haberdashery banner.",
    caption: "Jeremy Bregermann at the Haberdashery booth, Tech2gether 2016.",
  },
  {
    image: "studio/gameacon-2016-team-at-booth.jpg",
    out: "gameacon-2016-luna-wolf-studios-booth.jpg",
    alt: "Three people stand behind the Luna Wolf Studios booth, one in a wolf shirt and an exhibitor badge, with Drift Space Zero and Haberdashery on the screens.",
    caption: "The Luna Wolf Studios booth at GameACon 2016 in Atlantic City.",
  },
  {
    image: "studio/delaware-innovation-awards-2016-ceremony.jpg",
    out: "delaware-innovation-awards-2016.jpg",
    alt: "An overhead view of a crowd in an atrium before the 2016 Delaware Innovation Awards, with a Technically banner by the stage.",
    caption: "The crowd at the 2016 Delaware Innovation Awards, where Haberdashery was nominated for Indie Video Game of the Year.",
  },
  {
    image: "studio/ecrb-2015-game-jam-win-team.jpg",
    out: "east-coast-reboot-2015-game-jam-team.jpg",
    alt: "Six people pose with a Game Jam certificate that has Luna Wolf Studios written on it and an East Coast Reboot logo.",
    caption: "The Luna Wolf Studios team with the East Coast Reboot game jam certificate, 2015.",
  },
];

export const EARLIER_LAYOUT: PhotoLayout = { rows: [5], rowsSm: [2, 1, 2] };

/** Every photo, newest first: the photo zip. */
export const STUDIO_PHOTOS: StudioPhoto[] = [...EVENT_PHOTOS, ...EARLIER_PHOTOS];
