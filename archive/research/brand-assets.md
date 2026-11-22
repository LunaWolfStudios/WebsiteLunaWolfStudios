# Brand assets: store and platform marks

Researched 2026-11-21. Files live in `src/assets/brands/` (see its `README.md` for the per-file
source table and the trademark lines). This note gives the sources, the rules that matter on a
web page, and how the site should use each mark.

Short version: almost every brand forbids putting its logo **inside** a button or combining it
with words. The compliant pattern for store buttons is a **text button in our own style**
("Wishlist on Steam") with no logo inside, and, where a brand allows it, the brand's own logo or
official badge shown on its own nearby. itch.io and Apple are the exceptions: they publish a
finished badge that is itself the button.

---

## 1. Steam (Valve)

### Sources

- Branding page: <https://partner.steamgames.com/doc/marketing/branding>
- Brand guidelines PDF (45 pages, dated 2024 in its legal line):
  <https://shared.fastly.steamstatic.com/community_assets/images/steamworks_docs/english/steam_brandGuidelines.pdf>
- Logo master (Illustrator EPS, all Steam marks):
  <https://shared.fastly.steamstatic.com/community_assets/images/steamworks_docs/english/steam_brandAssets.eps>
- Legal attribution: <https://partner.steamgames.com/doc/marketing/branding/attribution>
- Steam Deck guidelines PDF (2022):
  <https://shared.fastly.steamstatic.com/community_assets/images/steamworks_docs/english/steamDeck_guidelines_042922.pdf>
  and page <https://partner.steamgames.com/doc/steamdeck/brandguidelines>
- Deck Verified landing pages: <https://partner.steamgames.com/doc/steamdeck/compat/verified>
- Early Access logos: same branding page (PNG, zip of all languages).

### Rules that matter on a website

- **Approved artwork only.** "Use only approved Valve artwork for the logo."
- **Stands alone.** The logo "must stand alone and may not be combined with any object,
  including but not limited to other logos, words, graphics, photos, slogans, numbers, design
  features, or symbols." Guidelines PDF p. 7: "Physical alterations should not be made to the logo
  and it should not be combined with any other branding elements." So the logo may **not** sit
  inside a button next to "Wishlist on", and there is no symbol-only mark: the logo is the symbol
  plus the STEAM logotype.
- **Colours.** Two versions only: positive black (RGB 0 0 0) for light backgrounds, inverse white
  (RGB 255 255 255) for dark backgrounds. No brand colour version.
- **Clear space:** the diameter of the "main locomotive crank" (the small circle in the symbol)
  on every side.
- **Minimum size:** 50 px tall on screen (12.5 mm print). The ® may be dropped when too small to
  read.
- **Prominence:** "The Steam trademarks may not be displayed as primary or prominent features on
  any non-Valve materials." No implied sponsorship or endorsement.
- **Approval:** Valve "reserves the right to approve any communication using the Steam brand";
  questions to steambranding@valvesoftware.com.
- **Attribution (required):** "©2026 Valve Corporation. Steam and the Steam logo are trademarks
  and/or registered trademarks of Valve Corporation in the U.S. and/or other countries." (The
  PDF version adds "All rights reserved."; the live attribution page, which is newer, does not.)
- **"Available on Steam" badge:** Valve offers none, and the stand-alone rule rules out making
  one. Community "Available on Steam" badges are not Valve artwork.
- **Early Access:** where Steam keys for an Early Access game are sold, the page must show a Steam
  Early Access logo and Valve's Early Access disclaimer text. The site links to Steam rather than
  selling keys, so this is optional for Sheep Tag 2, but the logo is saved in case.
- **Steam Deck logo:** the Deck guidelines apply to materials made "with permission under
  contract with Valve". Below 150 px the logotype gives way to the "Dumpling" mark, which must then
  have the words "Steam Deck" in the same composition. Attribution: "©2021 Valve Corporation.
  Steam Deck and the Steam Deck logo are trademarks and/or registered trademarks of Valve
  Corporation in the U.S. and/or other countries. All rights reserved."
- **Deck Verified / Playable:** Valve publishes no badge artwork for developers. A Verified game
  gets a Valve landing page at `https://store.steampowered.com/verified/<appid>` that can be
  linked. Per `archive/research/games-steam.md`, Valve's Deck rating is Unknown for every studio
  game, so the site must not show Verified or Playable marks or wording.

### Files saved

- `steam/steam-logo-black.svg`, `steam/steam-logo-white.svg`: vector paths copied losslessly
  from page 7 of Valve's guidelines PDF (the PDF and the EPS hold the same artwork; no EPS
  renderer was available here). Black fill set to #000000, which is the value the guideline
  states; the PDF draws it in process black #231f20.
- `steam/steam-early-access-logo.png` (135 x 20), `steam/steam-early-access-logo-stacked.png`
  (87 x 34): Valve's only sizes.

### What the site may and may not do

| May | May not |
|---|---|
| Write "Steam" in text, in buttons and labels ("Wishlist on Steam") | Put the Steam logo inside a button or beside words in one lockup |
| Show the full Steam logo on its own, black on light or white on dark, at least 50 px tall, with crank-diameter clear space | Use the symbol alone, or a monochrome glyph in a brand or accent colour |
| Link to the Steam store page | Make the Steam logo bigger or more prominent than the game's own title or key art |
| | Show Steam Deck Verified, Playable, or "Steam Deck compatible" claims (Valve rating is Unknown) |

### Recommendation

- **Store button:** text-only `.btn`, "Wishlist on Steam" (Sheep Tag 2) or "Buy on Steam",
  in the site's own style. No Steam logo inside.
- **Optional logo:** where a game page has an "Available on" strip, show the full Steam logo by
  itself (white in dark theme, black in light theme) at 50 px tall or more, with clear space,
  smaller in visual weight than the game's title. Swap the file by theme with `<picture>` or two
  `<Image>` elements toggled by `[data-theme]`.
- **Small platform marks beside titles:** the Steam logo cannot be shown under 50 px and has no
  symbol-only version, so use the word "Steam" (text chip or `.badge`) instead of a glyph.
- **Footer:** the Valve attribution line on every page that shows the logo (simplest: site
  footer).

---

## 2. Nintendo Switch

### Sources

- Official SVGs served by Nintendo Co., Ltd. on its own site:
  - <https://www.nintendo.co.jp/common/v2/img/ncommon/_common/logo/switch.svg> (white logo on a
    Nintendo Red #e60012 square, the "red vignette")
  - <https://www.nintendo.co.jp/common/v2/img/ncommon/_common/logo/switch-white.svg> (white
    logo, transparent). The same white artwork is the `#nc3-svgpack-logo-switch` symbol in
    nintendo.co.jp's site header.
  - Provenance cross-check: Wikimedia Commons `File:Nintendo_Switch_logo.svg` cites the first URL
    as its source.
- Nintendo's licensee guidelines and logo kits (including the Nintendo eShop logo) are on the
  Nintendo Developer Portal, which needs a login. Not accessed.
- Secondary summary of Nintendo's 2016 and 2020 Switch guidelines (not Nintendo's own page, so
  treat as indicative): <https://brand-genome.github.io/brands/nintendo-switch/>
- Trademark line as Nintendo uses it in its own material, e.g. a Nintendo of Europe brochure:
  <https://www.nintendo.com/eu/media/downloads/country_support_4/nl_17/2021_7/december_37/Brochure_NintendoSwitch_Winter2021_FR_Smaller.pdf>
- Nintendo on third-party use: <https://www.nintendo.com/au/legal/nintendo-intellectual-property/>
  ("You are not entitled to use any of this Nintendo property without our specific permission";
  Nintendo licenses third-party publishers to use its IP).

### Rules that matter on a website (from the secondary summary; confirm on the Developer Portal)

- Use the official logo only, unaltered. Never separate "NINTENDO" and "SWITCH". Never use the
  Joy-Con icon by itself. Do not apply red to the logo itself; the standard logo is white, and the
  primary form is the white logo on the Nintendo Red field.
- Clear space: the width of the "dots" in the Joy-Con icon on every side. Minimum size 12 to
  16 mm in print; no on-screen figure is public.
- Do not use "Switch" as a verb.
- Video end slates carry publisher logo, game title, Nintendo Switch logo, legal lines, and the
  Nintendo eShop logo for digital games. That tells us the eShop logo is a licensee asset.
- Luna Wolf Studios publishes Hypno Halo and ParaLily on Nintendo Switch (both also listed as
  "Supported" on Nintendo Switch 2, per `archive/research/games-steam.md`), so it is a licensee
  and can pull the current kit from the Developer Portal.

### Trademark line

- Use: **"Nintendo Switch is a trademark of Nintendo."** This is the line Nintendo prints in its
  own materials for third-party content.
- The old site's second sentence, "We are not affiliated with or endorsed by Nintendo.", is wrong
  for a licensed Nintendo publisher and should go. If the studio wants a disclaimer, the accurate
  form is that the games are published by Luna Wolf Studios under license; confirm wording in the
  licensee guidelines first.

### Files saved

- `nintendo-switch/nintendo-switch-logo-red.svg` (283.5 square, white logo on #e60012). Same
  artwork as the old site's `NintendoSwitchLogo_Red-150x150-1.png`, now as a vector.
- `nintendo-switch/nintendo-switch-logo-white.svg` (white logo, transparent).
- **No black version saved.** Nintendo publishes none, and the summary of its guidelines names
  white as the standard logo colour; making one would be a recolour. If the licensee kit offers a
  black logo, add it from there.

### What the site may and may not do

| May | May not |
|---|---|
| Show the red-vignette logo on either theme, or the white logo on a dark or Nintendo Red ground | Put the logo inside a button with text, or use the Joy-Con icon alone as a small glyph |
| Write "Nintendo Switch" in text, in buttons and labels | Recolour the logo (black, teal, grey) or put red on the logo itself |
| Link to the game's Nintendo eShop page ("Buy on Nintendo eShop" as text) | Use the Nintendo eShop logo without taking it from the licensee kit |

### Recommendation

- **Store button:** text-only "Buy on Nintendo eShop" (`.btn`). No logo inside.
- **Logo:** on the Hypno Halo and ParaLily pages, show `nintendo-switch-logo-red.svg` on its own
  next to the store buttons, square, about 64 to 96 px. It works on both themes because it
  carries its own red field. In dark theme the white logo may be used instead.
- **Small platform marks beside titles:** use the text "Nintendo Switch", not the icon (the icon
  alone is forbidden, and the full logo is unreadable at glyph size).
- **Footer:** "Nintendo Switch is a trademark of Nintendo."

---

## 3. Unity and the Unity Asset Store

### Sources

- Guidelines for Using Unity Trademarks, v4.2: <https://unity.com/legal/branding-trademarks>
- Unity Trademark List: <https://unity.com/legal/trademarks> (UNITY is US-registered; UNITY ASSET
  STORE is on the list)
- Logo downloads: Unity's Brandfolder share <https://brandfolder.com/s/fj5fnvgrqhwv9g9rtbrc3>.
  It asks for an email address before it opens, so it was not used. The Brandfolder "brand
  guidelines" link (<https://brandguide.brandfolder.com/unity/downloadbrandassets>) is dead (404).
- Style guide and logo usage (Figma prototype, linked from the guidelines page; not readable
  without a browser session): Unity Brand Guidelines 2024.1.
- Official files taken instead from Unity's own pages:
  - Black Unity logo SVG: the `og:image` of the guidelines page,
    <https://cdn.sanity.io/images/fuvbjjlp/production/fa8e822f74dc0dc469801f15ac53859e00318ee2-264x97.svg>
  - White Unity logo SVG and white Asset Store logo SVG: the Unity Asset Store site header and
    footer, <https://cdn.sanity.io/images/fuvbjjlp/asset-store-production/1b26dd99a7d8df7d483c56a11324460a5a43016f-92x32.svg>
    and <https://cdn.sanity.io/images/fuvbjjlp/asset-store-production/fb8b7bce7aa89a11fd47c338b277680bbcaefbae-152x21.svg>
  - Made with Unity PNG (415 x 100, black): the image on the guidelines page,
    <https://cdn.sanity.io/images/fuvbjjlp/production/ed8ae4aba799bd64a04b6dee9e9f4eaee5735bc6-415x100.png>

### The old "Download on the Asset Store" badge

`archive/wordpress/media/2025/04/download-on-the-unity-asset-store.png` (848 x 228) is **not**
Unity artwork that can be found anywhere official. It uses Unity's pre-2021 shaded cube, which
Unity retired in 2021, in an App Store style frame. Unity's guidelines, its Asset Store publisher
resources page (<https://assetstore.unity.com/publishing/resources-main>), and its docs offer no
publisher badge. No vector exists. Treat it as unofficial and outdated; do not reuse it.

### Rules that matter on a website

- **Word marks are fine** when true and relevant: you may say a product is "for Unity software"
  or is available on the Unity Asset Store, as long as Unity's marks are not more prominent than
  ours and the trademark notice is present. Use "Unity" as an adjective ("Unity software", "the
  Unity Asset Store"), never as a noun or verb ("Get Unity!" is Unity's own "wrong" example).
- **Unity "house" logo (cube + Unity) and the tab cube:** without written permission, only for
  promoting Unity's own products in space used for nothing else, or for non-commercial community
  posts. "It is especially important that you do not use the Unity logo in any way to promote
  you, your business/products/services". A studio site that sells services and products is
  commercial, so the Unity logo cannot go on service pages, the Scriptable Sheets page, or a
  store button.
- **Unity Asset Store logo:** not listed as a permitted logo. Any logo not in the guidelines needs
  a request to trademarks@unity3d.com.
- **Made with Unity logo:** "may be used in association with games or other software
  applications you created with the Unity software platform and that you distribute to end
  users." So it may appear on the pages of studio games built in Unity.
- **All logos:** current, official, unmodified (no colour change, strokes, rearranging,
  stretching, animating); legible size; clear space per Unity's style guide (exact figure not
  public outside the Figma file); not decorative; not the most prominent element; no implied
  endorsement or affiliation; no copying Unity's trade dress.
- **Notice (required wherever Unity marks appear, footer is fine):** "[This website] is not
  sponsored by or affiliated with Unity Technologies or its affiliates. [Unity Trademark(s)]
  [is a/are] trademark[s] or registered trademark[s] of Unity Technologies or its affiliates in
  the U.S. and elsewhere."
- **Unity marks may not be used as ad keywords** or in our domain, handles, or product names.

### Files saved

- `unity/unity-logo-black.svg`, `unity/unity-logo-white.svg`: saved for completeness; **not
  usable on this site without written permission**.
- `unity/unity-asset-store-logo-white.svg`: **needs written permission**. No black version is
  public.
- `unity/made-with-unity-black.png`: allowed on Unity-made game pages. Largest public size is
  415 x 100; that is enough for up to 50 px tall at 2x. No white version is public (Brandfolder
  only), so in dark theme place it on a light panel or get the white file from Unity.

### Recommendation

- **Scriptable Sheets store button:** text-only "Get it on the Unity Asset Store" in the site's
  `.btn` style, no Unity cube. Optionally a line such as "A tool for Unity software" in body copy.
  If the owner wants the Asset Store logo on the button, email trademarks@unity3d.com first.
- **Game pages built in Unity:** the Made with Unity logo is allowed, small, below the store
  buttons or in the credits area. Confirm which games were made in Unity before adding it
  (not verified here).
- **Services pages ("Unity development"):** words only, no Unity logo.
- **Footer:** "Luna Wolf Studios is not sponsored by or affiliated with Unity Technologies or its
  affiliates. Unity and Unity Asset Store are trademarks or registered trademarks of Unity
  Technologies or its affiliates in the U.S. and elsewhere." Add "Made with Unity" to the list if
  that logo is shown.

---

## 4. itch.io

### Sources

- Press kit and brand assets: <https://itch.io/press-kit>
- Zip (logos and badges, SVG + PNG): <https://github.com/itchio/press-kit/archive/v2019.01.02.zip>
  (logos identical to the files on the page; the zip's badges use live `<text>` in a system font,
  so the outlined badges shown on the page were used instead)

### Rules

- Do not distort, add effects, or resize without keeping the aspect ratio.
- Choose the logo colour with the best contrast against the background.
- "Please do not hotlink images." Self-host (done).
- Brand colour "itchy carnation" #fa5c5c; text greys #222222, #434343, #858585. Font: Lato.
- Write "itch.io" (the site and company) and "itch" (the desktop app), always lowercase.
- No required trademark line. No stated minimum size or clear space.
- itch.io supplies an official "available on itch.io" badge, meant to be used as a link.

### Files saved

`itch/itch-logo-black.svg`, `itch/itch-logo-white.svg` (logo and title),
`itch/itch-mark-black.svg`, `itch/itch-mark-white.svg` (logo only),
`itch/itch-badge-dark.svg` (#222 badge), `itch/itch-badge-color.svg` (red #ff2449 badge),
`itch/itch-app-icon.svg` (desktop app icon; not needed today).

### Recommendation

- **Store button:** use the official badge itself as the link (`itch-badge-dark.svg` in both
  themes, or `itch-badge-color.svg` for more colour), about 40 to 48 px tall, `alt="Available on
  itch.io"`. Or, to match the other buttons, a text button "Play on itch.io".
- **Small platform marks:** `itch-mark-black.svg` / `itch-mark-white.svg` by theme are allowed
  (black or white, unaltered). A single accent colour is not offered by itch; stay with black or
  white.

---

## 5. Newgrounds

### Sources

- Official "NG Design Assets" page: <https://www.newgrounds.com/wiki/creator-resources/ng-design-assets>.
  newgrounds.com answers automated requests with a browser check ("NG Guard"), so the page was
  read from the Internet Archive snapshot of 2026-10-13
  (<http://web.archive.org/web/20261013121926/https://www.newgrounds.com/wiki/creator-resources/ng-design-assets>).
- It offers "Official NG Logo. The full, official, NG logo. Use it anytime, anywhere!" as
  `https://www.newgrounds.com/downloads/designassets/assets/ng_logo.png` (1200 x 1200,
  transparent) plus FLA, PSD, BMP; also the NG tank alone (`ng_tank.png`), sunbeams, and a
  Flash file of logo variations. No SVG, no stated rules beyond "anytime, anywhere".

### Files saved

None. The download is behind the same browser check, and fetching it through the archive was
refused by the session's permission check. The owner can download `ng_logo.png` in a browser from
the page above and save it as `src/assets/brands/newgrounds/newgrounds-logo.png`.

### Recommendation

- **Store button:** text-only "Play on Newgrounds".
- **Small platform mark:** the `simple-icons` Newgrounds glyph (its listed source is the same NG
  Design Assets page) in the site's text colour, or the official PNG once downloaded. Newgrounds
  states no colour rules.
- No trademark line required; the general "property of their respective owners" line covers it.

---

## 6. Lower priority: Kickstarter, Meta Quest, Apple App Store, Google Play

Which pages need them (from `archive/` and `archive/research/games-steam.md`):

- **Kickstarter:** Sheep Tag 2 was funded on Kickstarter (Nov 2021). The Sheep Tag 2 page will
  likely mention it.
- **Meta Quest:** HELIX ran on Meta Quest 2 (`/helix/` project page).
- **Apple App Store / Google Play:** only the old mobile game Save Samia (2017 blog post, which is
  not published on the new site). No page in the URL plan needs these badges unless a live mobile
  app is added.

### Kickstarter

- Brand assets: <https://www.kickstarter.com/help/brand_assets> (Kickstarter's help center points
  there: <https://help.kickstarter.com/en-us/articles/16236452-is-there-a-place-i-can-download-the-kickstarter-logo>).
- The page is behind a Cloudflare bot check; rules and files could not be read. Not obtained.
- **Recommendation:** text only, "Funded on Kickstarter in November 2021", linking to the campaign.
  If a logo is wanted, the owner downloads it from the brand assets page and follows its terms.

### Meta Quest

- Developer brand guidelines: <https://developers.meta.com/horizon/resources/publish-brand-guidelines/>.
  The logo or word mark "must only be used to communicate the platform on which the game or VR
  experience runs", "must not be used to claim or imply partnership, sponsorship, or
  endorsement", and "must not be covered, modified, or altered in any way". Always write "Meta
  Quest" (never "Quest" alone). The store is "Meta Horizon Store". Phrases like "for use with Meta
  Quest" are fine.
- Meta's public brand center (<https://www.meta.com/brand/resources/meta/company-brand/>) no
  longer lists Meta Quest logos; the old Meta Quest page returns "This page isn't available".
  Meta's company logo "requires approval".
- **Recommendation:** text only on the HELIX page, "Built for Meta Quest 2". No logo file.

### Apple App Store

- Guidelines: <https://developer.apple.com/app-store/marketing/guidelines/>. Badge file:
  <https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg> (saved as
  `apple/download-on-the-app-store-black.svg`).
- Rules: only Apple's artwork; black badge preferred, white only when it is the only badge; at
  least 40 px tall; clear space one quarter of the badge height; first in a row of store badges;
  one per layout; no modification, no added ™; the badge is subordinate to the main message.
  Credit Apple and the Apple Logo where legal notices appear.
- **Recommendation:** do not show it unless an app is live on the App Store. If shown, credit
  line: "Apple and the Apple logo are trademarks of Apple Inc., registered in the U.S. and other
  countries. App Store is a service mark of Apple Inc." (wording follows Apple's credit-line
  format; confirm against Apple's trademark list).

### Google Play

- Badge guidelines: Google's Partner Marketing Hub, Google Play "Lockups, icons, & badges" (the
  old <https://play.google.com/intl/en_us/badges/> now lands there). Rules read: badge at least
  28 px tall; same size or larger than other store badges beside it; clear space one quarter of
  the badge height; solid or simple backgrounds; no colour change, no rearranging; use the badge
  (not the lockup) to drive downloads.
- The download asks the user to accept a confidentiality and usage agreement. Not accepted, not
  downloaded.
- **Recommendation:** none needed today. If a live Android app is added, the owner downloads the
  badge from the hub.

---

## 7. Social icons (`simple-icons` monochrome glyphs)

`simple-icons` (v16.38.0 checked) has YouTube, X, Facebook, Instagram, Twitch, Bluesky, GitHub,
Discord, Newgrounds, Kickstarter, Steam, Unity. LinkedIn is **not** in `simple-icons` any more
(removed in <https://github.com/simple-icons/simple-icons/pull/11380>), so the LinkedIn icon
needs another source, ideally LinkedIn's own "in" logo from <https://brand.linkedin.com/>.

Brands whose guidelines restrict a recoloured or monochrome glyph:

| Brand | Rule found | Effect on the social row |
|---|---|---|
| Facebook | <https://www.meta.com/brand/resources/facebook/logo/>: primary logo is Facebook Blue with a white "f"; secondary is white with a transparent "f", on Facebook Blue or imagery. "Do not recolor our logo to your own brand colors." "Do not use just the 'f' from our logo." Minimum 16 px wide; clear space 1/4 of the logo width | A grey, teal, or black Facebook glyph breaks the rules. Compliant: the blue circle logo, or white on dark. The `simple-icons` glyph is the full circle logo, so use it in white (dark theme) or in #0866FF (light theme), not in an accent or muted grey |
| Discord | <https://discord.com/branding>: "Feel free to use our logo in color, black or white"; "do not edit, change, distort, recolor, or reconfigure" | Black or white glyph is fine; an accent colour is not |
| Instagram | <https://www.meta.com/brand/resources/instagram/instagram-brand/>: use only assets from Meta's Brand Resource Center; detailed glyph rules are in its Brand Elements section (not read) | UNVERIFIED whether a single-colour glyph in a custom colour is allowed; black or white is the safe choice |
| X, YouTube, LinkedIn, Twitch, Bluesky, GitHub | Pages fetched (brand.youtube, brand.twitch.com, brand.linkedin.com) did not state colour rules in readable text | UNVERIFIED. Common published practice for these brands is black or white mono, or the brand colour; keep icons in pure black or white per theme to be safe |

**Recommendation:** render the social row in the theme's text colour only if that colour is
pure white (dark theme) and near black (light theme); do not tint icons teal or grey. Facebook
should use its blue logo in light theme.

---

## Recommended store-button and platform-mark treatment (all brands)

1. **One button style for every store**: the site's own `.btn`, text only, naming the store:
   "Wishlist on Steam", "Buy on Steam", "Buy on Nintendo eShop", "Get it on the Unity Asset
   Store", "Play on itch.io", "Play on Newgrounds". This satisfies Valve, Nintendo, and Unity,
   whose logos may not sit inside buttons or beside words.
2. **Official badges where the brand makes one**: itch.io ("available on itch.io") and Apple
   (only for a live app) may be used as the link itself instead of a text button.
3. **Brand logos on their own**, never in a lockup: Steam logo (≥ 50 px tall, black or white by
   theme) and the Nintendo Switch red logo, in an "Available on" row on game pages, with clear
   space and less weight than the game's title. The Unity and Asset Store logos are not used
   without written permission. Made with Unity may go on Unity-made game pages.
4. **Small platform marks beside game titles**: plain text chips ("Steam", "Nintendo Switch",
   "itch.io", "Meta Quest 2"). Neither Valve nor Nintendo allows a symbol-only glyph, so mixing
   glyphs for some stores and text for others would look uneven. If glyphs are wanted for itch.io
   or Newgrounds only, use black or white.
5. **Footer legal block** with the Valve, Nintendo, and Unity lines from
   `src/assets/brands/README.md`, plus "All other trademarks are the property of their respective
   owners."

---

## UNVERIFIED / could not obtain

1. **Nintendo licensee guidelines, Nintendo eShop logo, Nintendo Switch 2 logo:** Developer Portal
   only (login). Nintendo's on-screen minimum size, clear space in pixels, black-logo permission,
   and exact legal-line wording for licensees are not confirmed from a Nintendo document; the
   rules above come from a third-party summary and Nintendo's own brochures.
2. **Nintendo Switch logo in black:** not published by Nintendo; not created.
3. **Unity Brandfolder kit** (Made with Unity in white, Unity logos in all colourways, Asset Store
   logo in black): requires an email address; not used. Unity's style-guide clear-space and
   minimum-size figures (Figma) not read.
4. **Unity Asset Store badge:** no official badge exists publicly. The old site's badge is
   unofficial and uses the retired cube.
5. **Newgrounds logo file:** official, but the download is blocked to automated clients; needs a
   manual download.
6. **Kickstarter brand assets and rules:** Cloudflare bot check; not read.
7. **Google Play badge:** behind an agreement on the Partner Marketing Hub; not downloaded.
   Google's exact attribution line not confirmed.
8. **Meta Quest logo:** no longer on Meta's public brand center.
9. **Apple credit line wording:** follows Apple's template; the "service mark" phrase was not
   re-checked against Apple's trademark list.
10. **Steam EPS:** not rendered (no PostScript renderer); the SVGs come from the identical
    artwork in Valve's PDF.
11. **Social brand colour rules** for X, YouTube, LinkedIn, Twitch, Bluesky, GitHub, Instagram:
    not confirmed (see section 7).
12. **Which studio games were made with Unity** (for the Made with Unity logo): not checked here.
