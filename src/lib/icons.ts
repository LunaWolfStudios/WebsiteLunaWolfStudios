/**
 * Icon path library, rendered by src/components/Icon.astro.
 *
 * Brand and platform marks come from simple-icons (filled, 24x24). LinkedIn is drawn by hand
 * because simple-icons no longer ships it.
 *
 * Brand marks are used for social profile links and on store buttons (StoreButton shows the
 * platform's mark beside its label: these are the studio's own products, and the owner wants
 * the platform visible). They render in the surrounding text colour. The full official logos,
 * for "Available on" rows, are separate files in src/assets/brands/. UI glyphs are
 * hand-authored Lucide-style stroke paths on a 24x24 grid with 2px strokes.
 *
 * Add an icon: one entry, a path `d` string (several subpaths are fine), `stroke: true` for
 * line glyphs. Brand marks keep their official shape; never restyle them.
 */
import {
  siSteam,
  siUnity,
  siItchdotio,
  siNewgrounds,
  siYoutube,
  siX,
  siFacebook,
  siInstagram,
  siTwitch,
  siBluesky,
  siGithub,
  siDiscord,
  siKickstarter,
  siApple,
  siLinux,
  siAndroid,
  siMeta,
  siGoogleplay,
  siAppstore,
} from "simple-icons";

export interface IconDef {
  path: string;
  stroke?: boolean;
  viewBox?: string;
  /** For filled marks whose cut-outs rely on the even-odd rule. */
  evenOdd?: boolean;
}

const brand = (i: { path: string }): IconDef => ({ path: i.path });

export const ICONS: Record<string, IconDef> = {
  // Brand and platform marks (fill) -------------------------------------------------------
  steam: brand(siSteam),
  // simple-icons no longer ships a Nintendo Switch mark. These are the Joy-Con symbol's own
  // subpaths, taken unchanged from Nintendo's official logo file
  // (src/assets/brands/nintendo-switch/nintendo-switch-logo-white.svg), with the viewBox
  // cropped to the symbol.
  switch: {
    viewBox: "31.5 0 127.3 127.3",
    path: "M106.6,127.3h19.6c18,0,32.6-14.6,32.6-32.6v-62c0-18-14.6-32.6-32.6-32.6h-19.7c-0.5,0-0.8,0.4-0.8,0.8v125.5C105.6,126.9,106,127.3,106.6,127.3z M130.8,57.1c7.1,0,12.9,5.8,12.9,12.9c0,7.1-5.8,12.9-12.9,12.9c-7.1,0-12.9-5.8-12.9-12.9C117.9,62.9,123.7,57.1,130.8,57.1z M51.3,38.2c0,6.6,5.4,12,12,12c6.6,0,12-5.4,12-12c0-6.6-5.4-12-12-12C56.7,26.2,51.3,31.6,51.3,38.2z M91.9,0H64.1c-18,0-32.6,14.6-32.6,32.6v62c0,18,14.6,32.6,32.6,32.6h27.8c0.5,0,0.9-0.4,0.9-0.9V0.9C92.9,0.4,92.5,0,91.9,0z M82.6,117H64.1c-6,0-11.6-2.3-15.8-6.6c-4.2-4.2-6.6-9.8-6.6-15.8v-62c0-6,2.3-11.6,6.6-15.8c4.2-4.2,9.8-6.6,15.8-6.6h18.5V117z",
  },
  unity: brand(siUnity),
  itch: brand(siItchdotio),
  newgrounds: brand(siNewgrounds),
  youtube: brand(siYoutube),
  x: brand(siX),
  facebook: brand(siFacebook),
  instagram: brand(siInstagram),
  twitch: brand(siTwitch),
  bluesky: brand(siBluesky),
  github: brand(siGithub),
  discord: brand(siDiscord),
  kickstarter: brand(siKickstarter),
  apple: brand(siApple),
  linux: brand(siLinux),
  android: brand(siAndroid),
  meta: brand(siMeta),
  googleplay: brand(siGoogleplay),
  appstore: brand(siAppstore),
  linkedin: {
    path: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z",
  },
  windows: { path: "M3 4.2 10.6 3.1v7.6H3zM11.5 3 21 1.7v9H11.5zM3 11.6h7.6v7.6L3 18.1zM11.5 11.6H21v9.1l-9.5-1.3z" },

  // Filled UI marks ------------------------------------------------------------------------
  star: { path: "M12 2l2.9 6.26 6.86.6-5.19 4.52 1.55 6.71L12 17.3l-6.12 3.79 1.55-6.71L2.24 8.86l6.86-.6z" },
  play: { path: "M8 5.14v13.72a1 1 0 0 0 1.52.85l10.9-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14z" },
  pause: { path: "M7 4.5h3a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-13a1 1 0 0 1 1-1zm7 0h3a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-13a1 1 0 0 1 1-1z" },
  quote: {
    path: "M10.2 5.5C6.6 6.9 4.3 9.8 4.3 13.9V18.5h6.3v-6.3H7.7c.15-2.3 1.5-4 3.6-5zM19.7 5.5c-3.6 1.4-5.9 4.3-5.9 8.4V18.5h6.3v-6.3h-2.9c.15-2.3 1.5-4 3.6-5z",
  },

  // UI glyphs (stroke) ----------------------------------------------------------------------
  sun: {
    stroke: true,
    path: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41",
  },
  moon: { stroke: true, path: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" },
  mail: {
    stroke: true,
    path: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6.5l-10 6.5L2 6.5",
  },
  send: { stroke: true, path: "M22 2 11 13M22 2l-7 20-4-9-9-4z" },
  arrowRight: { stroke: true, path: "M5 12h14M13 6l6 6-6 6" },
  arrowLeft: { stroke: true, path: "M19 12H5M11 18l-6-6 6-6" },
  arrowUpRight: { stroke: true, path: "M7 17 17 7M8 7h9v9" },
  external: {
    stroke: true,
    path: "M15 3h6v6M21 3l-9 9M10 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-4",
  },
  menu: { stroke: true, path: "M4 6h16M4 12h16M4 18h16" },
  close: { stroke: true, path: "M6 6l12 12M18 6 6 18" },
  check: { stroke: true, path: "M4 12.5l5 5L20 6.5" },
  checkCircle: { stroke: true, path: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM8 12.5l2.8 2.8L16.5 9.5" },
  alert: { stroke: true, path: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 7.5v5M12 16.5h.01" },
  plus: { stroke: true, path: "M12 5v14M5 12h14" },
  minus: { stroke: true, path: "M5 12h14" },
  chevronLeft: { stroke: true, path: "M15 6l-6 6 6 6" },
  chevronRight: { stroke: true, path: "M9 6l6 6-6 6" },
  chevronDown: { stroke: true, path: "M6 9l6 6 6-6" },
  chevronUp: { stroke: true, path: "M18 15l-6-6-6 6" },
  download: { stroke: true, path: "M12 3v12M7 10l5 5 5-5M5 21h14" },
  expand: {
    stroke: true,
    path: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3",
  },
  home: { stroke: true, path: "M3 10.6 12 3l9 7.6M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" },
  globe: {
    stroke: true,
    path: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  },
  mapPin: { stroke: true, path: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" },
  calendar: {
    stroke: true,
    path: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  },
  users: {
    stroke: true,
    path: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  },
  award: { stroke: true, path: "M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8.21 13.89 7 23l5-3 5 3-1.21-9.12" },
  briefcase: {
    stroke: true,
    path: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z",
  },

  // Service glyphs (stroke) -----------------------------------------------------------------
  gamepad: {
    stroke: true,
    path: "M6 11h4M8 9v4M15 12h.01M18 10h.01M17.32 5H6.68a4 4 0 0 0-3.98 3.59C2.6 9.42 2 14.46 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.41-1.41A2 2 0 0 1 9.83 16h4.34a2 2 0 0 1 1.41.59L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.55-.6-6.58-.69-7.26A4 4 0 0 0 17.32 5z",
  },
  cube: {
    stroke: true,
    path: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.3 7 12 12l8.7-5M12 22V12",
  },
  headset: {
    stroke: true,
    path: "M2.5 9A2.5 2.5 0 0 1 5 6.5h14A2.5 2.5 0 0 1 21.5 9v5.5A2.5 2.5 0 0 1 19 17h-3.3a2 2 0 0 1-1.6-.8l-1.3-1.7a1 1 0 0 0-1.6 0l-1.3 1.7a2 2 0 0 1-1.6.8H5a2.5 2.5 0 0 1-2.5-2.5zM7.5 11.75h.01M16.5 11.75h.01",
  },
  heartPulse: {
    stroke: true,
    path: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7zM3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27",
  },
  code: { stroke: true, path: "M16 18l6-6-6-6M8 6l-6 6 6 6" },
  monitor: { stroke: true, path: "M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM8 21h8M12 17v4" },
  rocket: {
    stroke: true,
    path: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2zM9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",
  },
  graduationCap: { stroke: true, path: "M22 10 12 5 2 10l10 5 10-5zM6 12v5c3 3 9 3 12 0v-5M22 10v6" },
  sheet: { stroke: true, path: "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM3 9h18M3 15h18M9 3v18" },
  layers: { stroke: true, path: "M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
  wrench: {
    stroke: true,
    path: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z",
  },
};

export type IconName = keyof typeof ICONS;
