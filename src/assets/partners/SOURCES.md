# Partner logos

Tiles for the "Our Trusted Pack" wall. `PartnerCloud` shows each one as a single-colour mark
(inverted on the dark theme, multiplied onto the tile on the light theme), so every file is a
logo on a plain white square.

| Files | Source |
|---|---|
| The 24 `.jpg` tiles | The old WordPress site's media library (`archive/wordpress/media/2025/04/`), as the studio uploaded them in April 2025. Three were renamed to fix spelling: `kodeco.jpg`, `university-of-illinois.jpg`, `wilmington-university.jpg` |
| `brightpoint-community-college.png` | <https://www.brightpoint.edu/images/BCClogo_vertical_fullcolor_RGB_pad2_2022.png>, from the college's own site, fetched 21 November 2026 |
| `old-dominion-university.png` | <https://www.odu.edu/themes/custom/odumain/images/odu-logo-blue.svg>, from the university's own site, fetched 21 November 2026 |
| `george-mason-university.png` | <https://www.gmu.edu/themes/custom/sf_mason_2024/logo.png>, from the university's own site, fetched 21 November 2026 |

The three school `.png` files were added in November 2026 at the owner's request (schools
whose students have interned with the studio, and sponsors). None is redrawn. They are
converted to greyscale, because the owner's rule is that every logo on the wall is shown in
black and white, like the rest: a file with no colour in it cannot show any, whatever the
theme, the hover state, or the component.

Four long wordmarks are trimmed to the mark with a small white margin, instead of sitting in
a square, so the wall can show them two columns wide and readable: `george-mason-university.png`,
`old-dominion-university.png`, `delaware-college-of-art-and-design.png` and
`digital-media-institute.png` (the last two cut from the WordPress `.jpg` tiles; the square
`.jpg` tiles are kept too, for the small square logo tiles on the founder pages). They are
marked `wide: true` in `src/data/partners.ts`. Brightpoint's logo is square and stays on its
360 px white square.

To add a partner: put a logo on a white square here (at least 180 px), then add a row to
`src/data/partners.ts`.
