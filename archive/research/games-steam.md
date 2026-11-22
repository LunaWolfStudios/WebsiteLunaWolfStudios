# Games research: Steam, Nintendo, and official sites

Gathered 2026-11-21 for the game pages. Every fact carries its source. Store data (prices,
review summaries, tags) was read on 2026-11-21 in the US store (`cc=us`) and will drift.
Machine-readable copy: `archive/research/games-steam.json`. Images and their sources:
`src/assets/games/<slug>/SOURCES.md`.

Source shorthand used below:

- **Steam API** = `https://store.steampowered.com/api/appdetails?appids=<id>&l=english&cc=us`
- **Steam page** = `https://store.steampowered.com/app/<id>/` (tags, review summary, developer and publisher links)
- **Steam assets API** = `https://api.steampowered.com/IStoreBrowseService/GetItems/v1/` (review counts, library art paths, Steam Deck category)
- **Deck API** = `https://store.steampowered.com/saleaction/ajaxgetdeckappcompatibilityreport?nAppID=<id>`
- **Steam news** = `https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=<id>`
- **Steam search** = `https://store.steampowered.com/search/?developer=Luna%20Wolf%20Studios` and `?publisher=Luna%20Wolf%20Studios`

Steam Deck note for every game below: Valve's Deck API returns `resolved_category: 0` for all
four games, which Steam shows as "Unknown" (not yet reviewed by Valve). None is Verified or
Playable.

---

## 1. Sheep Tag 2

Facts come from the owner's Sheep Tag 2 site repo (`S:\Unity\WebsiteSheepTag2\src\data\`), as
instructed, not re-researched. Where the Steam API says something different or more precise, it
is noted.

### Fact sheet

| Field | Value | Source |
|---|---|---|
| Title | Sheep Tag 2 | `site.ts` |
| Developer | Luna Wolf Studios (Delaware, USA) | `presskit.ts` FACTSHEET |
| Publisher | Luna Wolf Studios LLC | `site.ts` (`publisher`); Steam API lists "Luna Wolf Studios" for both |
| Release | "Early Access coming 2027" | `presskit.ts` FACTSHEET |
| Release on Steam store | **Feb 2, 2027**, coming soon, flagged Early Access | Steam API 537680 (`release_date`), Steam assets API (`is_early_access: true`) |
| Platforms | Steam (Windows, macOS & Linux) | `presskit.ts`; Steam API agrees |
| Price | "Free-to-play, never pay-to-win" | `presskit.ts`; Steam API `is_free: true` |
| Genre | "Asymmetric multiplayer strategy & survival" | `presskit.ts` |
| Players | "Up to 32 online, or solo vs. bots" | `presskit.ts` |
| Engine | Unity | `presskit.ts` |
| Languages | "English (more planned)" | `presskit.ts`; Steam API: English (full audio) |
| Website | https://www.sheeptag2.com/ | `links.ts` |
| Press contact | support@lunawolfstudios.com | `presskit.ts` |
| Steam | https://store.steampowered.com/app/537680/Sheep_Tag_2 | `links.ts` |
| Soundtrack | https://store.steampowered.com/app/2151350/Sheep_Tag_2_Original_Soundtrack (17 tracks, $4.99, released Dec 31, 2022) | `links.ts`, `presskit.ts`; price and date: Steam API 2151350 |
| Supporter Pack DLC | https://store.steampowered.com/app/5538360/Sheep_Tag_2_Supporter_Pack ($39.99, released Nov 11, 2026) | Steam API 5538360 |
| Kickstarter | https://www.kickstarter.com/projects/lunawolfstudios/sheep-tag-2 (funded Nov 2021, $10,072 from 65 backers) | `links.ts`, `presskit.ts` HISTORY |
| Steam Workshop | https://steamcommunity.com/app/537680/workshop/ | `links.ts` |
| Discord | https://discord.gg/jNf5RsaZPp | `links.ts` |
| Socials | X https://x.com/sheeptag2, Bluesky https://bsky.app/profile/lunawolfstudios.bsky.social, Facebook https://facebook.com/sheeptag2, Instagram https://instagram.com/sheeptag2, YouTube https://www.youtube.com/channel/UCzw57oNyk0mCeVSoi-UCUBQ, Twitch https://twitch.tv/directory/game/Sheep%20Tag%202, IndieDB https://www.indiedb.com/games/sheep-tag-2 | `links.ts` |
| Review summary | No user reviews (not released) | Steam assets API, checked 2026-11-21 |
| Steam tags (top 20) | Early Access, Free to Play, RTS, Action RTS, Indie, Survival, Multiplayer, Singleplayer, Base Building, MOBA, Level Editor, Team-Based, PvP, PvE, Building, Action, Strategy, Fantasy, Werewolves, Top-Down | Steam page |
| Steam genres | Action, Indie, Strategy, Free To Play, Early Access | Steam API |
| Trailer | YouTube `ABIVaCo3QX4`, "Sheep Tag 2 - Official Gameplay Trailer (Early Access 2027)" (channel @sheeptag2). Second: `9eJ0F5nIWL0`, "Sheep Tag 2 - Cinematic Teaser Trailer" | `links.ts`; titles confirmed with YouTube oEmbed |

### Official copy

- Steam short description (Steam API 537680, exact): "Your friends are sheep. You are the wolf. Hunt them down as they build ridiculous farm fortresses to keep you out. Sheep Tag 2 is a Free-To-Play chaotic team-based RTS that's easy to learn and brutal to master. Play solo with bots or battle multiplayer with up to 32 players. Build. Hunt. Survive."
- Site tagline (`site.ts`): "The classic cat-and-mouse game!"
- Site description (`site.ts`): "The classic cat-and-mouse game! It's Sheep vs. Wolves in this unique blend of real-time strategy and survival. Party online with friends or play it solo against bots!"
- Press kit pitch (`presskit.ts` PITCH): "The classic cat-and-mouse game! It's Sheep vs. Wolves in a unique blend of real-time strategy and survival. Party with up to 32 players online."

### Summary of the owner's repo facts (`presskit.ts`)

- Sheep against Wolves. Sheep build farms and survive until the timer runs out; Wolves corner and capture every Sheep. Captured Sheep become Spirits in the pen and can be saved by teammates.
- More than 20 farm types (Straw Farm, Illusion farms, Invisible farms). Wolf spells include Summon Pack Wolf, Lunar Strike, Phase Shift, Snare Trap; potions and upgrades bought with gold.
- Five game modes: Classic, Switch, Vamp, VIP, Practice. Rulesets, victory zones, Field Rescue.
- Online multiplayer on Photon Quantum with prediction and rollback; US, EU, and AU servers; join in progress; bots at five difficulty levels.
- Tutorial with over a dozen lessons; Learn panel.
- Free-to-play and never pay-to-win. Optional Supporter Pack DLC (cosmetics, profile features, 2x Wool and XP).
- Progression: XP and levels, medals and Medal Case, Steam achievements, global and friends leaderboards, profile, over 100 avatar icons, Pack Tag.
- Round and game reports, replays, clips exported as video, highlights.
- Wardrobe (hats, shoes, furs, outfits), ten interface themes.
- Built-in level editor; Steam Workshop sharing; free community terrain library.
- 17-track original soundtrack.
- History: Sheep Tag began in the early 2000s as a Warcraft III mod; first standalone prototypes August 2015; Quaternius joined 2017; Nik Hagialas joined 2019; soundtrack work began 2020; Kickstarter funded November 2021; closed beta from December 2022; Early Access on Steam planned for 2027.
- Jeff is the only core developer (design, programming, production).
- Credits: Jeff (creator); Quaternius (3D art and animation, https://quaternius.com/); Nik Hagialas (illustration, concept and UI art, https://www.nikhagialasart.com/); Baelex Metcalf (lead composer, 12 of 17 tracks); Lazerwolph (4 tracks); M (1 track); Sara Sherlock (sound effects).
- Coverage: WTii (YouTube), "Sheep Tag 2 - interview & gameplay showcase", https://www.youtube.com/watch?v=ZGcLcwCXzj0.

### Videos (`videos.ts`)

| YouTube ID | Title | Poster file |
|---|---|---|
| ABIVaCo3QX4 | Gameplay Trailer | `video-poster-gameplay-trailer.jpg` |
| 9eJ0F5nIWL0 | Cinematic Teaser | `video-poster-cinematic-teaser.jpg` |
| JwVvkdnIIQg | Sheep Survive. Wolves Hunt. | `video-poster-sheep-survive-wolves-hunt.jpg` |
| ZAj3N36xC4k | An Approachable RTS | `video-poster-an-approachable-rts.jpg` |
| _IQO36AQHe0 | Play as Sheep or Wolf | `video-poster-play-as-sheep-or-wolf.jpg` |
| 7OzmgL1tVVg | Play Online, Solo, or Both | `video-poster-play-online-solo-or-both.jpg` |
| PjNLCQmYS1c | Build Your Battlegrounds | `video-poster-build-your-battlegrounds.jpg` |
| b-kbfnlHRtY | Twenty Years in the Making | `video-poster-twenty-years-in-the-making.jpg` |

### Image inventory (`src/assets/games/sheep-tag-2/`)

`key-art.png` 2560x1440, `logo.png` 1280x720 (transparent), `capsule-600x900.png` 600x900,
`header.png` 460x215, `hero.png` 1920x620, `icon-256.png` 256x256, eight `video-poster-*.jpg`
1280x720, and eight screenshots at 2560x1440. Screenshot captions and alt text, exact from
`screenshots.ts`:

| File | Original | Caption | Alt |
|---|---|---|---|
| `screenshot-01.png` | st2-screenshot-00 | Thirty two players, one pasture, and a farm on every patch of grass. | A 32 player game seen from high above, with hundreds of farms filling a green terrain around the pen in the middle. |
| `screenshot-02.png` | st2-screenshot-01 | Lunar Strike takes a base apart. | Playing as a Wolf, meteors rain down on a Sheep base while the pack waits at its edge. |
| `screenshot-03.png` | st2-screenshot-02 | Fortify your farms when the pack shows up. | A Sheep casts Fortify in the middle of a huge grid of farms on ReVoLuTiOn as Wolves close in from the right. |
| `screenshot-04.png` | st2-screenshot-04 | Fighting over the pen on Fire and Ice. | Sheep and Wolves clash around the pen on a snowy terrain ringed by ice and lava. |
| `screenshot-05.png` | st2-screenshot-06 | Hunt as a Wolf. | Playing as a Wolf, the hunter chases a Sheep between its farms, with the Wolf's abilities and gold on the HUD. |
| `screenshot-06.png` | st2-screenshot-08 | Night raids on the pen. | At night a meteor falls toward the pen while Sheep rush in to free the Spirits held there. |
| `screenshot-07.png` | st2-screenshot-13 | The Floor Is Lava. | Sheep build on a small island of rock in the middle of a terrain made of lava. |
| `screenshot-08.png` | st2-screenshot-14 | Dress your Sheep in the Wardrobe. | In the Wardrobe, a Sheep up on its hind legs tries on a Mushroom hat and Bass Slippers. |

Steam store data issue to pass to the owner: the gameplay trailer's name on Steam (movie id
257505643) is "   Skip navigation Search    Create   Avatar image Sheep Tag 2 - Official
Gameplay Trailer (Early Access 2027)", which looks like text pasted from YouTube by mistake
(Steam API 537680, `movies[0].name`).

---

## 2. Hypno Halo

### Fact sheet

| Field | Value | Source |
|---|---|---|
| Title | Hypno Halo | Steam API 3847950 |
| Developer | Luna Wolf Studios | Steam API; Nintendo eShop |
| Publisher | Luna Wolf Studios | Steam API; Nintendo eShop |
| Release, Steam (Windows, macOS, Linux) | Oct 21, 2025 | Steam API; Steam news "Hypno Halo Launch Day!" (2025-10-21) |
| Free demo, Steam | Oct 2, 2025 (app 4029810, "Hypno Halo Demo") | Steam search; Steam API 4029810 |
| Release, Nintendo Switch (US) | November 25, 2025 | Nintendo eShop https://www.nintendo.com/us/store/products/hypno-halo-switch/ ; Steam news "Hypno Halo on Nintendo Switch" (2025-11-26) |
| Price | $19.99 on Steam; $19.99 on Nintendo eShop (US) | Steam API `price_overview`; Nintendo eShop `prices.regularPrice` |
| Platforms | Windows, macOS, Linux (Steam); Nintendo Switch (also listed "Supported" on Nintendo Switch 2) | Steam API `platforms`; Nintendo eShop compatibility note |
| Steam genres | Action, Casual, Indie | Steam API |
| Steam tags | Psychedelic, Casual, Colorful, Score Attack, Abstract, Action, Indie, Arcade, Rhythm, 2D, Minimalist, Atmospheric, Music, Difficult, Fast-Paced, Replay Value, Great Soundtrack, Addictive, Co-op | Steam page |
| Nintendo tags | Action; Play for a high score; Meet up and play together; Play together on one console | Nintendo eShop |
| Players | Steam: Single-player, Multi-player, Co-op, Shared/Split Screen Co-op, Shared/Split Screen. Switch: single system 1 to 8 players | Steam API `categories`; Nintendo eShop `numberOfPlayers` |
| Controller | Steam: Full controller support, DualShock and DualSense support, plus Keyboard Only, Mouse Only, and Touch Only options. Switch: TV, tabletop, and handheld modes; touch screen | Steam API `controller_support: full`, `categories`; Nintendo eShop |
| Steam Deck | Valve rating: Unknown (not reviewed). The studio posted "Hypno Halo on Steam Deck!" ("Enjoy Hypno Halo on the go!") on 2025-10-06, and the old site calls it "Steam Deck compatible" | Deck API; Steam news; `archive/wordpress/pages/hypno-halo.md` |
| Other Steam features | Steam Achievements, Steam Cloud, Stats, Steam Leaderboards, Remote Play on TV, Remote Play Together, Family Sharing, Color Alternatives, Custom Volume Controls, Adjustable Difficulty, Subtitle Options | Steam API `categories` |
| Achievements | 56 on Steam | Steam API `achievements.total` |
| Languages, Steam | English (full audio), French, Italian, German, Spanish - Spain, Japanese, Korean, Polish, Portuguese - Brazil, Portuguese - Portugal, Russian, Simplified Chinese, Spanish - Latin America, Thai, Traditional Chinese, Turkish, Ukrainian (17) | Steam API `supported_languages` |
| Languages, Switch | Japanese, French, German, Italian, Spanish, Korean, Portuguese, Russian, Simplified Chinese, Latin American Spanish, Brazilian Portuguese, Traditional Chinese, American English (13) | Nintendo eShop |
| Rating | ESRB E (Everyone) | Nintendo eShop |
| Switch file size | 307 MB | Nintendo eShop |
| Review summary, Steam | Positive: 100% of 10 user reviews positive (checked 2026-11-21) | Steam page tooltip; Steam assets API (`review_count: 10, percent_positive: 100`) |
| Website listed on Steam | https://lunawolfstudios.com/hypno-halo/ (also the Nintendo `officialSite`) | Steam API `website`; Nintendo eShop |
| Store links | Steam https://store.steampowered.com/app/3847950/Hypno_Halo/ ; Demo https://store.steampowered.com/app/4029810/ ; Nintendo https://www.nintendo.com/us/store/products/hypno-halo-switch/ | |
| Trailer | YouTube `GiCsebs_FK4`, "Hypno Halo Trailer", channel @lunawolfstudios. Steam movie 257162614 "Hypno Halo Trailer", HLS https://video.akamai.steamstatic.com/store_trailers/3847950/1701632394/278ef97c88a437567b4b35ff9d5c9f820ae59602/1751078263/hls_264_master.m3u8 | YouTube oEmbed; Steam API `movies` |
| Music | Damiano Baldoni (https://soundcloud.com/damiano_baldoni), Rik4k (https://soundcloud.com/rik4k), Zane Little (https://soundcloud.com/zane-little) | Steam API about text; Nintendo eShop; links from `archive/wordpress/pages/hypno-halo.md` |
| Steam Next Fest | The studio streamed the game for Steam Next Fest (post dated 2025-10-13); Everything Action covered the trailer "as part of the Steam Next Fest 2025" | Steam news; Everything Action article |

### Official copy

- Steam short description (exact): "Hypno Halo is a minimalist score attack game."
- Nintendo headline (exact): "Hypno Halo is a minimalist score attack game."
- Opening line used on Steam, Nintendo, and the old site (exact): "There’s only one shape that’s perfect, eternal, and completely unbothered: the halo."
- The rest of the Steam "About" text is deliberate parody (for example "Spiritual stock trading", "a sentient donut named Terrence"). Do not lift its "features" as real features.
- Steam about text also carries this warning (exact): "BUT SERIOUSLY PLAYERS WITH PHOTOSENSITIVITY AND THOSE SUSCEPTIBLE TO MOTION SICKNESS SHOULD STAY AWAY!" Nintendo carries a motion sickness warning too. The game page should keep a photosensitivity note.

### Features

From the old site (`archive/wordpress/pages/hypno-halo.md`), exact:

- Tackle 300+ handcrafted levels and 51 bonus challenges across 6 difficulties
- Immerse yourself in 90+ minutes of electronic and techno music
- Unlock 50+ achievements and climb the leaderboards
- Full controller and touch screen support
- Steam Deck compatible (see the Steam Deck row above)
- Share controls with friends for co-op chaos
- Discover secret endings and hidden surprises

The Nintendo eShop description lists the same features except the achievements, controller, and
Steam Deck lines, and adds "Full touch screen support".

### Press and quotes

| Item | Link | Status |
|---|---|---|
| Everything Action, "Let the colors take control in Hypno Halo", Chris C, 2025-10-07. Calls it "an indie rhythm-puzzle game by Luna Wolf Studios" | https://everythingaction.com/2025/10/07/let-the-colors-take-control-in-hypno-halo/ | Page and date verified |
| Games Ardor, "Top Steam Games to Look Out for in October 2025" | https://gamesardor.net/top-steam-games-to-look-out-for-in-october-2025/#hypno-halo | Page loads (200); mention not re-read |
| The Mimic's Veil Podcast, Episode 73 | https://pocketcasts.com/podcast/the-mimics-veil/581efcf0-2c7d-013d-44ba-0affe62ed029/roid-rage-feat-metroid-prime-4-beyond-the-berlin-apartment-simogo-legacy-collection/b300ab7f-f089-4e12-b7a7-a958a84053d9 | From old site; not re-checked |
| Higher Plain Games, video "Hypno Halo - Review \| Psychedelic Flow State Hedonism [EPILEPSY WARNING]" | https://www.youtube.com/watch?v=Zynq6cc5uTI | Title verified with YouTube oEmbed |
| Russ Play review (written in Belarusian) | https://russplay.com/reviews/hypno-halo/ | Page loads (200) |

Quotes, reproduced exactly:

1. "Take some mushrooms, turn out all the lights, blast the music, and just zone out for a good long while" – MIVS Judge 2025. Source: old site only (`archive/wordpress/pages/hypno-halo.md`). No public page.
2. "This game is an absolute TRIP and I hate how addicting it is xD. Even when my fingers were exhausted, I kept playing because it was tons of fun. The music was sufficiently epic to inspire me to keep playing & trying my hardest" – MIVS Judge 2025. Source: old site only.
3. "Hypno Halo mesmerizes with minimalist design and pure mechanics. The loop feels meditative and addictive. Halo aesthetics soothe and pull you into chasing high scores…" – OFEN™, https://steamcommunity.com/groups/O-F-E-N/curation/app/3847950/ . Source: old site; the curator page needs JavaScript and the text could not be re-read. The "…" shows it is shortened.
4. New, verified on Steam's curator list (https://store.steampowered.com/curators/curatorsreviewing/?appid=3847950), Higher Plain Games, Recommended: "Maddeningly simple. Press buttons to match coloured halos before they vanish. Love how it gets faster before adding a new colour in, slowing down, and then ramping up again. Flow state gaming glory."

### Image inventory (`src/assets/games/hypno-halo/`)

| File | Pixels | Note |
|---|---|---|
| `capsule-600x900.jpg` | 600x900 | Steam library capsule |
| `header.jpg` | 920x430 | Steam header (2x) |
| `hero.jpg` | 3840x1240 | Steam library hero (2x), no logo |
| `capsule-616x353.jpg` | 1232x706 | Steam main capsule (2x) |
| `trailer-poster.jpg` | 599x337 | Steam trailer thumbnail |
| `screenshot-01.jpg` … `screenshot-08.jpg` | 1920x1080 | All 8 Steam screenshots |
| `key-art.png` | 2560x1440 | Title logo on halo background (old site "Download Logo"); same art as the Nintendo hero |
| `icon-1024.png` | 1024x1024 | Old site "Download Icon" |
| `capsule-600x900-wordpress.png` | 600x900 | Old site capsule |
| `featured-image.png` | 1232x706 | Old site featured image |
| `wp-screenshot-easy-50.png`, `wp-screenshot-medium-69.png`, `wp-screenshot-medium-98.png`, `wp-screenshot-hard-113.png` | 1920x1080 | Old site screenshots (level numbers and difficulty from file names) |

No transparent logo exists in any source found.

---

## 3. ParaLily

### What it is

A 2D side-scrolling precision and puzzle platformer. Lily shifts between parallel universes to
chase her stuffed dinosaur Patches through a mysterious door. Hand-drawn art. The released game
is described as a first chapter: "This first chapter sets the tone for the journey ahead."
(Steam API about text; Nintendo eShop). Steam achievements include "End Of Chapter One".

### Fact sheet

| Field | Value | Source |
|---|---|---|
| Title | ParaLily | Steam API 1156760 |
| Developer | Team ParaLily | Steam API; Nintendo eShop (`softwareDeveloper`) |
| Publisher | Steam: Team ParaLily and Luna Wolf Studios. Nintendo: Luna Wolf Studios | Steam API `publishers`; Nintendo eShop (`softwarePublisher`) |
| Team | Nate Flynn (Artist) and Jeff (Programmer, Luna Wolf Studios co-founder). The ParaLily site prints Jeff's full name; per CLAUDE.md the studio site uses "Jeff" only | https://paralilygame.com/ and https://paralilygame.com/presskit/ |
| History | "In early 2017, Nate approached Jeff with a prototype of ParaLily. Having worked on many games together before, and seeing the potential of the prototype, Jeff joined Nate in developing ParaLily." | ParaLily press kit (exact) |
| Team founded | March, 2017; "Based in East Coast - USA" | ParaLily press kit |
| Release, Steam (Windows) | Nov 9, 2021 | Steam API; ParaLily press kit "November 9, 2021" |
| Release, Nintendo Switch (US) | February 2, 2022 | Nintendo eShop https://www.nintendo.com/us/store/products/paralily-switch/ |
| Price | $3.99 on Steam; $4.99 on Nintendo eShop (US) | Steam API; Nintendo eShop |
| Platforms | Windows (Steam) and Nintendo Switch (Switch 2 "Supported"). No macOS, Linux, Xbox, PlayStation, or mobile release found | Steam API `platforms`; Nintendo eShop; web search |
| Steam genres | Action, Adventure, Indie | Steam API |
| Steam tags | Action, Indie, Adventure, Platformer, Female Protagonist, Difficult, Dark, 2D, Atmospheric, Singleplayer, Horror, Surreal, Psychological Horror, Puzzle, Design & Illustration, Stylized, Sci-fi, Side Scroller, Cute, Puzzle Platformer | Steam page |
| Players | Single-player | Steam API; Nintendo eShop |
| Controller | Full controller support (Steam); TV, tabletop, handheld modes, touch screen (Switch) | Steam API; Nintendo eShop |
| Achievements | 7 on Steam | Steam API |
| Languages | English | Steam API; Nintendo eShop ("American English") |
| Rating | ESRB E (Everyone), Mild Fantasy Violence | Nintendo eShop |
| Review summary, Steam | 8 user reviews, "Need more user reviews to generate a score" (checked 2026-11-21) | Steam page; Steam assets API |
| Support email | info@paralilygame.com | Steam API; ParaLily site |
| Official site | https://paralilygame.com/ (WordPress, © 2017-2020 Team ParaLily; blocks plain curl, renders in a browser) | |
| Store links | Steam https://store.steampowered.com/app/1156760/ParaLily/ ; Nintendo https://www.nintendo.com/us/store/products/paralily-switch/ | |
| Other links | Press kit https://paralilygame.com/presskit/ ; Devlog https://paralilygame.com/devlog/ ; IndieDB https://www.indiedb.com/games/paralily ; Discord https://discord.gg/AtSY8SG ; Twitter https://twitter.com/ParaLilyGame ; Facebook https://www.facebook.com/ParaLilyGame/ ; Instagram https://www.instagram.com/paralilygame/ ; Speedrun http://speedrun.com/paralily | ParaLily site and press kit |
| Trailer | YouTube `JcMM36wFX1U`, "ParaLily - Teaser Trailer", channel @paralilygame5092 (embedded on paralilygame.com). Steam movie 256761403 "Teaser Trailer", HLS https://video.akamai.steamstatic.com/store_trailers/1156760/242017/dbff115dd43a8ec0c99e866214c01132cfaa17ae/1751196654/hls_264_master.m3u8 | YouTube oEmbed; Steam API |
| Other video | YouTube `28aCV77kxBM`, "ParaLily WIP Indie Game Preview Footage" | ParaLily press kit; YouTube oEmbed |
| Award | "Best in Show at Replay FX" – Pittsburgh, PA, July 26-29, 2018 | ParaLily home page and press kit |
| First shown | Everything Action (2017-09-21): "Paralily was playable for the first time at the recent A Video Game Con" | http://everythingaction.com/2017/09/21/gamebox-2-0-leatherface-legacy-edition/ |

### Luna Wolf Studios' role

Publisher on Nintendo Switch, co-publisher on Steam (with Team ParaLily). The Switch listing
reads "© Luna Wolf Studios LLC". Co-founder Jeff is one of the two developers. The old studio
site lists "ParaLily by Luna Wolf Studios" (`archive/wordpress/pages/about-jeff.md`) and shows
the capsule `archive/wordpress/media/2025/04/paralily_600x900.png` on the games and services
pages. The studio is not listed as developer on either store.

### Official copy

- Steam short description (exact): "Help Lily survive the paranormal and rescue a friend, on her strange journey through a series of parallel universes, in this special blend of precision and puzzle platforming. Avoid horrifying enemies, collect magical glyphs, and discover the connection between Lily and the parallel universes."
- Nintendo headline (exact): "Help Lily survive the paranormal and rescue a friend, on her strange journey through a series of parallel universes."
- Site tagline (exact): "ParaLily – A girls strange journey through parallaxing parallel universes, to save a friend, and survive the paranormal!"
- Long description (Steam, Nintendo, site, exact): "ParaLily is one little girl’s adventure to retrieve her dear stuffed dinosaur Patches, who in the middle of the night sprung to life and took off through a mysterious door. This strange journey will take Lily through a set of dangerous and terrifying parallel universes, as she attempts to retrieve her little stuffed runaway. Lily can shift between the parallel universes at will; which will help her avoid danger, and solve puzzles while traversing the paranormal universes."

### Features (Steam and Nintendo "Game Features", exact)

- Familiar platforming and side-scrolling action.
- Hand-drawn environments, characters, and animations.
- Innovative parallel universe shifting mechanics.
- Collectibles, puzzles, and hidden pathways.
- Creative multi-layered level designs.

Mechanic, from Steam (exact): "When Lily changes universes her momentum carries with her, allowing her to continue a jump from one universe to the next."

### Press and quotes (from the ParaLily press kit, https://paralilygame.com/presskit/)

1. "It’s like going deeper in Inception, and it’s extremely fun to play." – Zach, Everything Action. Verified in the article http://everythingaction.com/2017/09/21/gamebox-2-0-leatherface-legacy-edition/ (2017-09-21, the section is bylined "Zach & Chris").
2. "This game is spectacular. The puzzles are amazing, the art is amazing, the story is compelling and captivating. The game is very polished and a joy to play!" – MAGFest MIVS Judge (press kit links http://super.magfest.org/mivs/). No public source for the quote; year not stated.
3. "ParaLily is the perfect balance of difficulty and skill with an innovative new mechanic of shifting between visually stunning, dynamic parallel universes. Must play for precision platformers." – Beta Tested, Game Reviewed, http://betatestedgamereviewed.com/game-reviews/post/1297102/paralily-difficult-universe-phasing-platformer/ . That site did not respond on 2026-11-21; quote not re-verified.

### Image inventory (`src/assets/games/paralily/`)

| File | Pixels | Note |
|---|---|---|
| `capsule-600x900.jpg` | 600x900 | Steam library capsule |
| `header.jpg` | 460x215 | Steam header |
| `hero.jpg` | 1920x620 | Steam library hero |
| `capsule-616x353.jpg` | 616x353 | Steam main capsule |
| `trailer-poster.jpg` | 293x164 | Steam teaser thumbnail; too small for a poster |
| `key-art.jpg` | 1920x1080 | Nintendo eShop hero (black and white key art with logo) |
| `key-art-with-url.png` | 1618x911 | Same art from the press kit, with "ParaLilyGame.com" on it |
| `logo-1024x512.jpg` | 1024x512 | Logo on background (site) |
| `presskit-header.png` | 1200x240 | Press kit banner |
| `award-replay-fx-2018-best-in-show.jpg` | 1024x1024 | Replay FX Best in Show badge |
| `screenshot-01.jpg` … `screenshot-10.jpg` | 1920x1080 | First 10 of 13 Steam screenshots |

---

## 4. The Brave Hearts II: False Skies

### Brief claims, checked

| Claim | Result | Source |
|---|---|---|
| Developed by Connor Butler | Verified | Steam API 4918650 `developers` |
| Published by Luna Wolf Studios | Verified | Steam API `publishers` |
| Released August 27, 2026 | Verified ("Aug 27, 2026") | Steam API `release_date`; also `archive/wordpress/pages/about-jeremy.md` |
| Fully voice-acted, story-driven, top-down shoot 'em up | Verified (Steam short description) | Steam API |
| "Arcade" | Steam says "arcade missions", "Fast-paced arcade-style top-down aerial combat", and tags it Arcade | Steam API about text; Steam page |
| Connor Butler is a former Luna Wolf Studios student intern | **UNVERIFIED.** Not on Steam, itch.io, or anywhere in `archive/` | |

### Fact sheet

| Field | Value | Source |
|---|---|---|
| Title | The Brave Hearts II: False Skies | Steam API |
| Developer | Connor Butler | Steam API |
| Publisher | Luna Wolf Studios | Steam API |
| Release | Aug 27, 2026 (Steam, Windows) | Steam API |
| Price | $9.99 | Steam API |
| Platforms | Windows only | Steam API `platforms` |
| Steam genres | Action | Steam API |
| Steam tags | Action, Shoot 'Em Up, Top-Down Shooter, Arcade, Shooter, 2D, Flight, Singleplayer, Dialogue Heavy, Narrative, Story Rich, Controller, Score Attack, Retro, Old School, Linear, War, Military, Combat, Quick-Time Events | Steam page |
| Players | Single-player | Steam API `categories` |
| Controller | Full controller support; DualShock and DualSense support | Steam API |
| Other Steam features | Steam Achievements, Custom Volume Controls, Stereo Sound, Steam Cloud, Family Sharing | Steam API |
| Achievements | 20 | Steam API |
| Languages | English (full audio) | Steam API |
| Review summary | No user reviews (checked 2026-11-21) | Steam page tooltip; Steam assets API |
| Website | None listed on Steam. Support email: support@lunawolfstudios.com | Steam API `website: null`, `support_info` |
| Store link | https://store.steampowered.com/app/4918650/The_Brave_Hearts_II_False_Skies/ | |
| Trailer | Steam only (no YouTube upload found). Movie 257369977, "The Brave Hearts II: False Skies - Official Trailer". HLS https://video.akamai.steamstatic.com/store_trailers/4918650/49150408/54639638da5ae7eeb62671ac3176caed962e75ef/1783117767/hls_264_master.m3u8 ; DASH h264 https://video.akamai.steamstatic.com/store_trailers/4918650/49150408/54639638da5ae7eeb62671ac3176caed962e75ef/1783117767/dash_h264.mpd | Steam API `movies` |
| Updates | "Gameplay and Controller UI Fix", 2026-09-01 | Steam news |
| Luna Wolf Studios' work on it | Jeremy's old bio lists "Steam publishing and platform integration, Windows build verification, Steam achievements, Steam Cloud configuration, controller usability, and release quality assurance" | `archive/wordpress/pages/about-jeremy.md` |

### Official copy

- Steam short description (exact): "Take to the skies in a fully voice-acted, story-driven top-down shoot 'em up. Battle enemy squadrons, survive intense arcade missions, master multiple aircraft, and push your score higher across campaign, training, hardcore, and endless modes."
- Opening line (exact): "Take to the skies once more, fight new drone threats, and become a Brave Heart once again."
- Story (exact, Steam): "Four years after the Cruabar War, peace was supposed to hold." Autonomous drones appear over former war zones and civilian airspace; the player is "a newly assigned Brave Heart pilot" protecting Uflein's airspace.

### Features (Steam about text, exact items)

- Fully voice-acted story campaign spanning 3+ hours, featuring: 30 visual novel styled cutscenes; Story-driven mission progression; High-intensity dogfights and boss encounters; In-game QTE moments and dynamic combat sequences
- 4 unique teammates, each with special abilities; Strategic ability cooldowns and synergy in combat
- Gameplay Features: Fast-paced arcade-style top-down aerial combat; 21 aircraft to unlock and fly, including variants and skins; 9 powerful combat pickups; Variety of maps and environmental conditions; Fuel, ammo, and heat management systems for tactical depth; Reputation Points system; Branching Mission Choices; Checkpoint System
- Game Modes: Campaign Mode – Fully voiced narrative experience; Training Mode – Learn flight systems and combat basics; Hardcore Mode – Increased enemy aggression and challenge; FreePlay Mode – Practice combat freely; Endless Mode – Survive escalating waves of drone attacks
- Systems & Extras: In-game database covering aircraft, enemies, characters, and lore; Achievements to unlock as you progress; Jukebox mode to listen to the full soundtrack anytime; Movie browser to replay any cutscene from the campaign; Fully customizable pilot name system; Full Controller Support; Highscore System for every Mission and Extra Mode
- Characters: returning veterans Wade Sullivan, Roman Fox, and Clara Willis; new Brave Hearts Elizabeth Fryer and Spencer Hannigan

### The first game: The Brave Hearts

- Exists on itch.io only, not on Steam: https://connor0453.itch.io/the-brave-hearts (Steam search for the title and for developer "Connor Butler" returns only the sequel).
- "A downloadable game for Windows and macOS", "Name your own price", status Released, author Connor Butler.
- The itch page says (exact): "The Brave Hearts is a team based creation, by developers, Connor Butler and Ryan Ketchum."
- 2D top-down aerial combat; the player is Wade Sullivan of the Uflein National Air Force fighting the invading Yriris forces, with Clara Willis, Camila Hayden, and Master Sergeant Roman Fox.
- Release date: December 5, 2025 per GameBrain (https://gamebrain.co/game/the-brave-hearts), a third-party aggregator. **UNVERIFIED** on itch.io.
- Luna Wolf Studios is not credited on the first game.

### Press and quotes

None found. No reviews on Steam yet.

### Image inventory (`src/assets/games/the-brave-hearts-ii-false-skies/`)

| File | Pixels | Note |
|---|---|---|
| `capsule-600x900.jpg` | 600x900 | Steam library capsule |
| `header.jpg` | 920x430 | Steam header (2x) |
| `hero.jpg` | 3840x1240 | Steam library hero (2x): abstract dark blue pattern only, no characters or logo |
| `capsule-616x353.jpg` | 1232x706 | Steam main capsule (2x) |
| `trailer-poster.jpg` | 600x337 | Steam trailer thumbnail |
| `screenshot-01.jpg` … `screenshot-10.jpg` | 1920x1080 | First 10 of 15 Steam screenshots |

---

## All Luna Wolf Studios apps on Steam

From the Steam search for developer and publisher "Luna Wolf Studios" (checked 2026-11-21:
5 developer results, 7 publisher results). Steam has no developer or publisher homepage for
the studio; store pages link to these searches:
https://store.steampowered.com/search/?developer=Luna%20Wolf%20Studios and
https://store.steampowered.com/search/?publisher=Luna%20Wolf%20Studios

| App ID | Name | Type | LWS role | Release (Steam) | Price (US) | URL |
|---|---|---|---|---|---|---|
| 537680 | Sheep Tag 2 | Game (Early Access) | Developer, publisher | Feb 2, 2027 (coming soon) | Free to play | https://store.steampowered.com/app/537680/Sheep_Tag_2/ |
| 2151350 | Sheep Tag 2 Original Soundtrack | Soundtrack | Developer, publisher | Dec 31, 2022 | $4.99 | https://store.steampowered.com/app/2151350/Sheep_Tag_2_Original_Soundtrack/ |
| 5538360 | Sheep Tag 2 Supporter Pack | DLC | Developer, publisher | Nov 11, 2026 | $39.99 | https://store.steampowered.com/app/5538360/Sheep_Tag_2_Supporter_Pack/ |
| 3847950 | Hypno Halo | Game | Developer, publisher | Oct 21, 2025 | $19.99 | https://store.steampowered.com/app/3847950/Hypno_Halo/ |
| 4029810 | Hypno Halo Demo | Demo | Developer, publisher | Oct 2, 2025 | Free | https://store.steampowered.com/app/4029810/ (redirects to the Hypno Halo page) |
| 1156760 | ParaLily | Game | Co-publisher (developer: Team ParaLily) | Nov 9, 2021 | $3.99 | https://store.steampowered.com/app/1156760/ParaLily/ |
| 4918650 | The Brave Hearts II: False Skies | Game | Publisher (developer: Connor Butler) | Aug 27, 2026 | $9.99 | https://store.steampowered.com/app/4918650/The_Brave_Hearts_II_False_Skies/ |

Nintendo eShop (US), both published by Luna Wolf Studios: Hypno Halo (Nov 25, 2025, $19.99) and
ParaLily (Feb 2, 2022, $4.99).

---

## UNVERIFIED

1. Connor Butler being a former Luna Wolf Studios student intern. Only in the brief; not on Steam, itch.io, or in `archive/`.
2. Release date of the first game, The Brave Hearts (December 5, 2025): third-party aggregator only.
3. Hypno Halo "Steam Deck compatible": the studio's claim (old site, Steam post 2025-10-06). Valve's rating is Unknown. Say "plays on Steam Deck" at most, or leave it out.
4. The two "MIVS Judge 2025" quotes for Hypno Halo and the "MAGFest MIVS Judge" quote for ParaLily: from the studio's own materials only. No public MAGFest page confirms that either game was submitted to or selected for MIVS, or in which year.
5. OFEN curator quote for Hypno Halo: from the old site; the curator page could not be re-read without JavaScript.
6. Beta Tested, Game Reviewed quote for ParaLily: the site did not respond.
7. The Mimic's Veil podcast and Games Ardor mentions of Hypno Halo: links from the old site, content not re-read.
8. Sheep Tag 2 Steam date: Steam shows Feb 2, 2027, but the owner's repo says only "2027". Whether Feb 2 is a real launch date or a placeholder is unknown.
9. Transparent library logos for Hypno Halo and The Brave Hearts II: not retrievable (hashed paths not exposed). ParaLily's transparent logo may be in the press kit's `logo.zip` (not downloaded).
