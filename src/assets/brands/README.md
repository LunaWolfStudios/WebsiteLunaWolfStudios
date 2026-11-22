# Brand assets

Official store and platform marks used on the site. Every file below comes from its owner, in the
owner's own colours. Do not redraw, recolour, crop, add effects, or put a file inside another
graphic. Rules, sources, and the reasoning behind each recommendation are in
`archive/research/brand-assets.md` (researched 2026-11-21).

All SVGs are self-contained (no scripts, no external references, no embedded fonts or images).
Cleaning only removed the XML declaration, comments, titles, editor attributes, and turned
`class` styles into `fill` attributes; each cleaned file renders pixel-identical to the download.

## Files

| File | Owner | Variant | Background | Source | Usage rule (one line) |
|---|---|---|---|---|---|
| `steam/steam-logo-black.svg` | Valve | Steam logo, positive (black, RGB 0 0 0) | Light | Vector paths lifted losslessly from page 7 ("positive logo") of Valve's brand guidelines PDF, <https://shared.fastly.steamstatic.com/community_assets/images/steamworks_docs/english/steam_brandGuidelines.pdf>, linked from <https://partner.steamgames.com/doc/marketing/branding>. Fill set to #000000, the value the guideline specifies (the PDF draws it in process black #231f20). Master file: `steam_brandAssets.eps` on the same page | Stand alone, never combined with words or other graphics (so never inside a button); at least 50 px tall on screen; clear space = crank diameter; never the most prominent element; Valve attribution line required |
| `steam/steam-logo-white.svg` | Valve | Steam logo, inverse (white) | Dark | Same PDF, page 7 ("inverse logo") | Same as above |
| `steam/steam-early-access-logo.png` | Valve | Steam Early Access logo, 135 x 20 (largest official size) | Light or dark (logo has its own black field) | <https://shared.fastly.steamstatic.com/community_assets/images/steamworks_docs/english/Logo_SteamEarlyAccess.png> from <https://partner.steamgames.com/doc/marketing/branding> | Only for an Early Access title; Valve requires it, plus Valve's Early Access text, on pages that sell Steam keys for one |
| `steam/steam-early-access-logo-stacked.png` | Valve | Steam Early Access logo, stacked, 87 x 34 | Light or dark | <https://shared.fastly.steamstatic.com/community_assets/images/steamworks_docs/english/Logo_SteamEarlyAccess_Stacked.png> | Same as above |
| `nintendo-switch/nintendo-switch-logo-red.svg` | Nintendo | Nintendo Switch logo, white on Nintendo Red (#e60012) square ("red vignette") | Any | Nintendo Co., Ltd. site: <https://www.nintendo.co.jp/common/v2/img/ncommon/_common/logo/switch.svg> | Use the full logo (icon + wordmark) unaltered; never the Joy-Con icon alone; never red applied to the logo itself; never split "Nintendo" and "Switch"; trademark line required |
| `nintendo-switch/nintendo-switch-logo-white.svg` | Nintendo | Nintendo Switch logo, white | Dark or Nintendo Red | Nintendo Co., Ltd. site: <https://www.nintendo.co.jp/common/v2/img/ncommon/_common/logo/switch-white.svg> | Same as above. No official black version is public; do not recolour this one |
| `unity/unity-logo-black.svg` | Unity Technologies | Unity "house" logo (cube + wordmark), black | Light | Unity's trademark guidelines page (its `og:image`), <https://cdn.sanity.io/images/fuvbjjlp/production/fa8e822f74dc0dc469801f15ac53859e00318ee2-264x97.svg>, page <https://unity.com/legal/branding-trademarks> | Without written permission only for promoting Unity's own products in space used for nothing else, or non-commercial community posts. **Not for promoting our own business, services, or products** |
| `unity/unity-logo-white.svg` | Unity Technologies | Unity house logo, white | Dark | Unity Asset Store site footer, <https://cdn.sanity.io/images/fuvbjjlp/asset-store-production/1b26dd99a7d8df7d483c56a11324460a5a43016f-92x32.svg> | Same as above |
| `unity/unity-asset-store-logo-white.svg` | Unity Technologies | Unity Asset Store logo, white | Dark | Unity Asset Store site header, <https://cdn.sanity.io/images/fuvbjjlp/asset-store-production/fb8b7bce7aa89a11fd47c338b277680bbcaefbae-152x21.svg> | Not covered by Unity's public guidelines: **needs written permission** from trademarks@unity3d.com before use |
| `unity/made-with-unity-black.png` | Unity Technologies | "Made with Unity" logo, black, 415 x 100 (largest public official size) | Light | Unity's trademark guidelines page, <https://cdn.sanity.io/images/fuvbjjlp/production/ed8ae4aba799bd64a04b6dee9e9f4eaee5735bc6-415x100.png> | Allowed beside games we made with Unity and distribute; unaltered; not the most prominent element; Unity notice required |
| `itch/itch-logo-black.svg` | itch corp | itch.io logo and title, black | Light | <https://static.itch.io/images/logo-black-new.svg> from <https://itch.io/press-kit> (also in the press kit zip, v2019.01.02) | No distortion, effects, or non-proportional resizing; pick the colour with the best contrast; do not hotlink, self-host |
| `itch/itch-logo-white.svg` | itch corp | itch.io logo and title, white | Dark | <https://static.itch.io/images/logo-white-new.svg> | Same as above |
| `itch/itch-mark-black.svg` | itch corp | itch.io logo only (storefront mark), black | Light | <https://static.itch.io/images/itchio-textless-black.svg> | Same as above |
| `itch/itch-mark-white.svg` | itch corp | itch.io logo only, white | Dark | <https://static.itch.io/images/itchio-textless-white.svg> | Same as above |
| `itch/itch-badge-dark.svg` | itch corp | "available on itch.io" badge, #222 | Light or dark | <https://static.itch.io/images/badge.svg> | Official badge; use as supplied |
| `itch/itch-badge-color.svg` | itch corp | "available on itch.io" badge, red #ff2449 | Light or dark | <https://static.itch.io/images/badge-color.svg> | Official badge; use as supplied |
| `itch/itch-app-icon.svg` | itch corp | itch desktop app icon | Any | <https://static.itch.io/images/app-icon.svg> | For the itch app only, not the store; not needed by the site today |
| `apple/download-on-the-app-store-black.svg` | Apple | "Download on the App Store" badge, black, US-UK English | Light or dark | <https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg> from <https://developer.apple.com/app-store/marketing/guidelines/> | Only for an app live on the App Store; at least 40 px tall; clear space 1/4 badge height; unmodified; first in a row of store badges; Apple credit line required |

## Not stored here

- **Nintendo eShop logo, Nintendo Switch 2 logo:** no public official file found. Nintendo gives
  these to licensees through the Nintendo Developer Portal (login). Get them there.
- **Newgrounds logo:** official, and Newgrounds says to use it "anytime, anywhere", but
  newgrounds.com blocks automated downloads behind a browser check. Download
  `ng_logo.png` (1200 x 1200) by hand from the "NG Design Assets" wiki page,
  <https://www.newgrounds.com/wiki/creator-resources/ng-design-assets>, and save it as
  `newgrounds/newgrounds-logo.png`.
- **Kickstarter:** brand assets page (<https://www.kickstarter.com/help/brand_assets>) sits
  behind a Cloudflare bot check. Download by hand if the site needs it.
- **Google Play badge:** the download on Google's Partner Marketing Hub requires accepting a
  confidentiality agreement. No current page needs it.
- **Meta Quest:** Meta's public brand center no longer offers Meta Quest logos.
- **Steam Deck logo, Deck Verified / Playable marks:** Valve's Steam Deck guidelines are for
  partners "with permission under contract with Valve", and none of our games has a Valve Deck
  rating. Not stored.
- **Unity logo in black for the Asset Store, white "Made with Unity":** only on Unity's
  Brandfolder, which asks for an email address. Not stored.
- **Social icons:** come from `simple-icons` in `src/lib/icons.ts`. LinkedIn is no longer in
  `simple-icons`; Facebook may not be recoloured (blue, or white on blue/imagery only). See
  section 7 of the research note.

## Trademark notices

The footer (or each page that shows the mark) carries the line for every brand it shows. Update
the year in the Valve line each year (build-time year is fine).

```text
©2026 Valve Corporation. Steam and the Steam logo are trademarks and/or registered trademarks of Valve Corporation in the U.S. and/or other countries.
```

```text
Nintendo Switch is a trademark of Nintendo.
```

```text
Luna Wolf Studios is not sponsored by or affiliated with Unity Technologies or its affiliates. Unity and Unity Asset Store are trademarks or registered trademarks of Unity Technologies or its affiliates in the U.S. and elsewhere.
```

Only when the Apple badge is shown:

```text
Apple and the Apple logo are trademarks of Apple Inc., registered in the U.S. and other countries. App Store is a service mark of Apple Inc.
```

itch.io, Newgrounds, and Kickstarter publish no required notice. A general line covers them and
everything else:

```text
All other trademarks are the property of their respective owners.
```
