# Scriptable Sheets: research notes

Gathered 2026-11-21 for the new `/scriptable-sheets/` page. Every fact carries its source. Items marked **UNVERIFIED** must not be published as fact. The same data is in `scriptable-sheets.json`; that file also holds all 34 reviews verbatim.

## Fact sheet

Source for every row unless noted: the Asset Store listing, https://assetstore.unity.com/packages/tools/utilities/scriptable-sheets-284559

| Field | Value |
|---|---|
| Title | Scriptable Sheets |
| Tagline (listing elevator pitch) | View your Unity assets in a whole new way. Scriptable Sheets revolutionizes Unity by integrating spreadsheet-like views for all your assets, boosting productivity and simplifying data management. |
| Category | Tools / Utilities |
| Publisher (as named on the store) | Luna Wolf Studios LLC ([publisher page](https://assetstore.unity.com/publishers/29230), "Organization Verified", address "DE, US") |
| Price | $49.99 regular. $24.99 on the access date (-50%, during the store-wide sale: "Our biggest sale of the year is here: Save 50% + Flash Deals up to 95% off."). USD, exclusive of tax. Launch price **UNVERIFIED**. |
| License | Standard Unity Asset Store EULA; license type "Extension Asset"; sold per seat ("Seat 1") |
| Latest version | 1.11.0, released Jul 2, 2026 (listing "Latest release date"; changelog `[1.11.0] - 2026-07-02`) |
| First published | 2024-07-24 (listing data `firstPublishedDate` 2024-07-24T15:59:10Z; changelog `[1.0.0] - 2024-07-24` "Initial release.") |
| Unity versions | "Supports Unity LTS versions 2020.3 and up." (listing Technical details). Listing "Original Unity version": 2022.3.62. v1.9.1 fixed Unity 6.5 compiler errors and Unity 6.4 warnings ([changelog](https://github.com/LunaWolfStudios/ScriptableSheetsDocs/blob/main/CHANGELOG.md)). |
| Render pipelines | Listing SRP record for 2022.3.62f3: `standard`, `hd`, `lightweight`, `custom` (shown by the store as Built-in, HDRP, URP, Custom SRP; display names **UNVERIFIED**, see list). Editor-only tool, so the pipeline does not matter at runtime. |
| File size | 456.6 KB (467,520 bytes), 537 files, `.unitypackage` |
| Rating | 34 ratings: 31 five-star, 3 four-star, none lower (average 4.91). Publisher page shows "4.9 (34)". The listing data rounds the average to 5. |
| Reviews | 34 (all with text) |
| Favorites | "705 users have favourite this asset" (sic) |
| Views | "97 views in the past week" (access date) |
| Support | support@lunawolfstudios.com; "Support: Visit site" goes to https://lunawolfstudios.com/contact/ |
| Tags | ScriptableObject, google sheets, Serialization, Data, Spreadsheet, explorer, Editor, asset, Custom, Tool, Utility, table, Inspector, Component, Workflow |
| Other assets by the publisher | None. The publisher page lists 1 result, Scriptable Sheets, and "No public lists available". |
| Frequently bought together (store) | Scriptable Studio Pro (MaharajaStudio); DataForge - ScriptableObject Spreadsheet Editor (Ragendom). Both are competing ScriptableObject spreadsheet tools. |

### Links the listing gives

- Documentation: https://github.com/LunaWolfStudios/ScriptableSheetsDocs
- Forums: https://discussions.unity.com/t/released-scriptable-sheets/1490189 (Link is on the listing. discussions.unity.com refused automated fetches (403 "Crawler is not allowed!"), so the thread content is UNVERIFIED.)
- Video Tutorials: https://www.youtube.com/playlist?list=PL6G9X1zrT3BLwLA7pbgM5Aam9RrLsrBZp
- Email: mailto:support@lunawolfstudios.com
- advanced property-based filters: https://github.com/LunaWolfStudios/ScriptableSheetsDocs/blob/main/DOCUMENTATION.md#advanced-search-filtering
- Unity documentation (ScriptableObject): https://docs.unity3d.com/Manual/class-ScriptableObject.html
- Full changelog: https://github.com/LunaWolfStudios/ScriptableSheetsDocs/blob/main/CHANGELOG.md
- Support: Visit site: https://lunawolfstudios.com/contact/
- No Discord, no public source repository, no separate product website. The GitHub repository holds docs only.

## Verbatim description

From https://assetstore.unity.com/packages/tools/utilities/scriptable-sheets-284559 (Overview), converted from the listing HTML to Markdown with links kept. Text unchanged.

[Documentation](https://github.com/LunaWolfStudios/ScriptableSheetsDocs) | [Forums](https://discussions.unity.com/t/released-scriptable-sheets/1490189) | [Video Tutorials](https://www.youtube.com/playlist?list=PL6G9X1zrT3BLwLA7pbgM5Aam9RrLsrBZp)

Questions? Email us at: [support@lunawolfstudios.com](mailto:support@lunawolfstudios.com)

Inspect your assets in a table list asset explorer, where you can easily manage everything in one window. View and edit your ScriptableObjects, Prefabs, Components, and more. No need for endless searching through folders and Objects.

**Core Features**

- **Seamless Integration**: Instantly explore all your new and existing assets, including ScriptableObjects, in a spreadsheet-like view—no coding required.
- **Asset Management**: Select, read, update, and delete Unity Objects within Scriptable Sheets table list view.
- **Batch Create**: Quickly create multiple instances of any ScriptableObject type with a single click.
- **Import/Export**: Easily import CSV, TSV, and other flat file formats. Export to your preferred format, including Json, with options for headers, wrap settings, custom delimiters, and string-to-enum conversions.
- **Copy/Paste**: Copy entire tables, single columns, rows, or cells into any flat file format. Paste data seamlessly back into Scriptable Sheets, simplifying complex data transfers across serialized fields.
- **Serialization**: Visualize serializable classes, complex data, and serialized property types within a multi-column view.
- **Complex Data**: Handles complex Objects with inherited, nested, and generic fields.
- **Managed References**: Edit serialize reference fields with a per-row type dropdown and a column for every concrete subtype's fields.
- **Object References**: Supports Unity Object types such as AudioClips, Materials, Prefabs, ScriptableObjects, and more!
- **Collections**: View and edit serializable arrays and lists in the grid, or flip a single array or list into its own Table (not recommended for very large or deeply nested collections).
- **Read-only fields**: View Asset Paths, GUIDs, and read-only fields for any Unity Object.
- **Sub Assets**: Manage and filter Sub Assets for ScriptableObject types.
- **Addressable Assets**: Compatible with Addressable Asset References and their Sub Assets.
- **Prefab Components**: Filter, view, and edit Components attached to your Prefabs, including Transforms, Colliders, Rigidbodies, and more.

**User Interface**

- **Keyboard Navigation**: Familiar spreadsheet-like navigation using tab, enter, shift, and arrow keys.
- **Search Filtering**: Search and filter Objects by directory, name, and even [advanced property-based filters](https://github.com/LunaWolfStudios/ScriptableSheetsDocs/blob/main/DOCUMENTATION.md#advanced-search-filtering). Includes additional search settings for case sensitivity and prefixes.
- **Pagination**: Navigate large amounts of Objects with intuitive controls for changing between pages.
- **Hide/Show Columns**: Hide or show specific columns to focus on the data that matters most to you.
- **Resizable Columns**: Adjust column widths to fit your data for a customized view. Includes preset buttons for stretching, compacting, and expanding columns.
- **Adjustable Row Height:** Change the row height to fit your content, including multiline text and asset previews like textures, materials, and models.
- **Sorting**: Sort Unity Objects by any column and property type in the table view, even colors, gradients, animation curves, and read-only fields.
- **Multiple Windows**: Open multiple Scriptable Sheet windows simultaneously, enabling efficient context switching between Unity Object types.
- **Recent Pins**: Recently viewed Unity Object types can be auto pinned for quick access.
- **Session Cache**: Retains the configuration of each Scriptable Sheet across sessions and code changes when possible, but user script modifications may alter results.
- **Lightweight Text Editor**: Includes 'Paste Pad', a lightweight text editor for a quick text editing within Unity.
- **Inspector Compatibility**: Automatically selects Objects in Unity's Inspector and Project windows as you navigate across table cells.
- **Theme Compatibility**: Compatible with both Unity light and dark themes.

**Why Scriptable Sheets?**

- **Boost Productivity**: Streamline your workflow with a familiar spreadsheet-like interface tailored for Unity.
- **Powerful Data Editor**: Easily manage, edit, and transfer large amounts of data both in and out of Unity.
- **Advanced Customization**: Tailor Scriptable Sheets to your specific needs with an extensive list of settings and options to choose from.
- **No Coding Required**: Start using Scriptable Sheets right away without any coding and minimal setup. Scriptable Sheets automatically categorizes and organizes all your Unity Asset Types and serializable ScriptableObject types.

To fully leverage all features of Scriptable Sheets, you will want to use Unity's ScriptableObjects. To learn more about ScriptableObjects in Unity, you can visit the official [Unity documentation](https://docs.unity3d.com/Manual/class-ScriptableObject.html).

Elevate your Unity development experience with Scriptable Sheets. Say goodbye to tedious data management and hello to a new level of efficiency and organization.

### Technical details (verbatim)

- **Full Source Code**: Power-users can customize Scriptable Sheets to fit their specific needs.
- **Samples**: Select from a variety of sample projects to see Scriptable Sheets in action and accelerate your learning curve with ScriptableObjects.
- **Unit Tests**: Ensure reliability and robustness with a comprehensive suite of unit tests.
- **User Settings**: Leverages the "UserSettings" folder for user-specific preferences.
- **Immediate Mode GUI**: Uses Unity's IMGUI system for specific features not available in UI Toolkit.
- **Editor Only:** Functions only in the Editor and is completely stripped in builds, except for the provided Samples.
- **Unity LTS Support**: Supports Unity LTS versions 2020.3 and up.

Get Scriptable Sheets today and transform the way you work with Unity assets!

## Feature summary

Plain-language summary of the description above and the docs. Not for quoting.

- Shows any Unity asset type (ScriptableObjects by default, plus Prefabs, Components, AudioClips, Materials, Textures and more) as a spreadsheet-like table inside the Unity Editor.
- Read, edit, create (in batches) and delete assets from the table, with spreadsheet keyboard navigation (tab, enter, shift, arrows).
- Handles nested, inherited and generic fields, arrays and lists, SerializeReference (managed reference) fields with a per-row type dropdown, Sub Assets and Addressable Asset References.
- Collection Tables (v1.10.0) turn a single array or list field into its own table of rows.
- Import CSV, TSV and other flat files; export to flat files or JSON; copy and paste whole tables, rows, columns or cells to and from Excel or Google Sheets.
- One-click Google Sheets Importers pull data from any Google Sheet shared by link. Auto Generate (v1.10.0) creates missing ScriptableObjects during import or paste.
- Search by name, GUID, path, or property filters that can be chained with & and |.
- Pagination, hide/show, resize and dock columns, sort by any column (even colors, gradients and curves), adjustable row height with asset previews, colored headers, multiple windows, recent pins, session cache.
- Paste Pad, a small built-in text editor.
- Ships with full source code, 7 samples and several hundred unit tests. Editor only: stripped from builds.
- Supports Unity LTS 2020.3 and up; light and dark Editor themes.

## Reviews

Source: https://assetstore.unity.com/packages/tools/utilities/scriptable-sheets-284559#reviews (34 reviews, captured 2026-11-21 by paging the Reviews tab). Twelve selected below, verbatim: title, then body. Dates are UTC. The publisher replies from the account "aFeesh". All 34 are in the JSON.

### shakyrivers: 5 stars, 2026-04-15

Title: **Great Scriptable Object Manager**

> If you use a lot of scriptable objects and need to compare, change or sift through the data this is the way to do it.
>
> My only request if possible would be for coloured headers so it's easier to differentiate columns at a glance and be easier on the eyes.
>
> Update: They added coloured headers, tyvm. You can also play audio inline too which is nice. Good updates all round.

Version reviewed: 1.11.0. Helpful votes: 1. The version (released 2026-07-02) is newer than the review date, so the reviewer edited the review after posting; the "Update:" line is that edit.

### karinarigby: 5 stars, 2026-02-19

Title: **Incredible - amazing time saver**

> This is an excellent tool and is well worth the spend for how much convenience it offers, I can already see how much it's going to help the asset management with the rest of my interdisciplinary team.
>
> There are a lot of thoughtful features and customizations, good documentation, and I like that the asset is actively maintained.
>
> As others have mentioned the developer is very quick to respond and supportive which is greatly appreciated.
>
> Only minor piece of feedback is that the UI for the tool itself isn't extendable by design out of the box (i.e., can't add additional buttons in the Scriptable Sheets window) but that's not a dealbreaker or anything, just a nice-to-have. The developer was quick to support with workarounds when I brought this up.
>
> If you need to display your Scriptable Objects in a tabular way, this is it👏👏

Version reviewed: 1.8.0. Helpful votes: 1.

### Rockaso: 5 stars, 2026-01-10

Title: **One of the most useful assets you can get**

> This is very helpful it let's you easily set up game configurations and specifications.
> Going from excel to unity back and fort let's you speed up your workflow and be more organized.
> Makes game dev feel less cumbersome.
> The dev answers questions very quickly and gives an excellent support.

Version reviewed: 1.8.0. Helpful votes: 1.

### The_3D_Lunatic: 5 stars, 2025-12-08

Title: **Quite useful!**

> I needed to work with a lot of data which I prepared in Excel (because it's more convenient for me) and exported as .csv files. Scriptable Sheets let me import the data and view it in a very nice way inside Unity. I'm quite happy with the product and would recommend it!

Version reviewed: 1.8.0. Helpful votes: 1.

### Quevanto: 5 stars, 2025-09-27

Title: **Amazing asset if your game relies heavily on Scriptable Objects**

> I use scriptable objects to represent items, quests, in-game events, npc types, factions, weapons, cosmetic items etc. any type of a thing you can imagine. This is incredibly powerful for my kind of a workflow. Being able to see every single member of a scriptable object in one view lets me see the bigger picture much more easily. Highly recommend this one. Also video tutorials on Youtube are great. They basically cover every feature you need to know.

Version reviewed: 1.7.2. Helpful votes: 2.

### FTVStudios: 5 stars, 2025-05-20

Title: **The most useful tool I have in my arsenal!**

> The most useful tool I have in my arsenal especially for my TCG game is Scriptable Sheets! 
>
> The amount of pure hours I've saved just from navigating from SO folder to SO folder is just insane. This tool literally lays out EVERYTHING for every single one of my Trading Cards so that I can just EASILY edit information, details, graphics, effects, etc all in one place... 
>
> If your game uses alot of scriptable objects, then this tool will legit save you probably at least 10-30 hours of time going back and forth creating cards or whatever, by the time you have completed your game.
>
> Absolutely a priceless tool to have in your toolkit!

Version reviewed: 1.2.1. Helpful votes: 4.

### VeryBadPenny: 5 stars, 2025-05-05

Title: **A great Power Tool for ScriptableObject fans**

> I use a lot of ScriptableObjects and they're basically data, so a spreadsheet format looks and feels like a big step forward.
>
> I was a bit wary of all the bubbly reviews for this "Really amazing asset! ...etc." but I have 27 types of S.O. in my current project, varying from enum-like usages (a named object of a specific type so I get a nice drop-down in the inspector) up to one which has 20+ data members/fields and functions/methods built into it (and I currently have 96 instances of just that type in my project). This asset really helps manage them all.
>
> After using repeatedly for a few days, it feels almost feature-complete. Some items like a variable-length list inside your S.O. just don't translate easily to column format and the author just shows you the first one by default [edit: this behavior can be changed in the settings! amazing]
>
> Also, I'd written import/export (e.g. to CSV) tools for my own S.O's but this even has that, and probably does it better than mine.
>
> Footnote: I also like that it's completely drop-in/out and doesn't need to move with my project if I share work (e.g. in game jams) with people who do not have a license. That offsets the slight frowny-face when I saw it's an "extension asset" which I understand requires one license per seat/user.

Version reviewed: 1.5.1. Helpful votes: 6.

### Katerlad: 5 stars, 2025-02-28

Title: **I Cant Express Enough How AMAZING this asset is! A MUST for projects with a lot of ScriptableObjects/Assets.**

> If you work with ScriptableObjects, or any serializable asset supported by this tool that you want to edit in List format, this is the asset to buy!
>
> Feature Rich!
> Great Support!
> Intuitive!
>
> Unity should have this functionality built in! 
> - Don't hesitate to buy you will not be disappointed!

Version reviewed: 1.4.0. Helpful votes: 5.

### RestingOwl: 5 stars, 2025-02-26

Title: **Quite powerful - especially for larger projects**

> If you organize data using scriptable objects in your project, this asset is going to be a huge time saver.
>
> This tool makes it really easy for us to view/filter/search/edit across different data types. We do this quite often, so we're using this pretty much every day.
>
> Definitely a must have asset in my opinion!

Version reviewed: 1.4.0. Helpful votes: 2.

### deleo: 5 stars, 2024-10-24

Title: **Great!**

> So it's come to this: I've reached the age where I get excited about an embedded spreadsheet tool. smh
>
> This is amazing! It helps structure my endless number of Scriptable Objects in my scene. Was about to write something myself, but this is well worth the money! <3

Version reviewed: 1.2.1. Helpful votes: 4.

### ZZBrent: 5 stars, 2024-09-03

Title: **Literally game changing!**

> I am building out a TCG.  I keep all of my cards in spreadsheets so that I can immediately add cards as inspiration strikes.  However, previously I needed to copy and paste the values from Google Sheets into the Unity UI.  But now I can use this!  It lets me import for my first iteration of cards, and then it lets me look at a sheet view of all of my cards for making edits as I test things.  I can make bulk changes instantly here, where it would take me 15-30 minutes before.  This helps my development go faster, which is key for ensuring my game actually gets finished and published!

Version reviewed: 1.1.1. Helpful votes: 3.

### nhagialas: 5 stars, 2024-07-26

Title: **An amazing productivity tool**

> Scriptable sheets is an amazing way to clearly organize our assets in the engine. The import / export functionality is extremely helpful for games with large sets of assets, and it also helps how intuitive it is to use! Couldn't recommend it more!

Version reviewed: 1.0.0. Helpful votes: 1.

### Old site quotes checked against the originals

The old home page ("Our Howling Reviews", `archive/wordpress/pages/game-design-and-development.md` and `.html`) quotes four reviewers. Each links to the listing's `#reviews`.

| Reviewer | Verdict | What differs |
|---|---|---|
| Quevanto | Excerpt, unmarked | Excerpt. Words match the original exactly, but the old site drops the first sentence ("I use scriptable objects to represent items, ...") and the last two ("Also video tutorials on Youtube are great. They basically cover every feature you need to know.") without marking the cuts. |
| Katerlad | Edited | Merged and edited. The first sentence is the review TITLE, rewritten: the original title reads "I Cant Express Enough How AMAZING this asset is! A MUST for projects with a lot of ScriptableObjects/Assets." The old site changes the casing, adds an apostrophe ("can’t"), and drops the title's second sentence. The rest is the first paragraph of the body, verbatim. The body's remaining lines ("Feature Rich! / Great Support! / Intuitive! / Unity should have this functionality built in! / - Don't hesitate to buy you will not be disappointed!") are omitted. |
| deleo | Matches | Full text, matches. Only typographic changes: the paragraph break after "smh" is collapsed and straight apostrophes became curly (WordPress smart quotes). |
| RestingOwl | Edited, unmarked cut | Merged and cut. The first sentence is the review TITLE ("Quite powerful - especially for larger projects"), with the hyphen turned into an en dash and a period added. The middle paragraph of the body ("This tool makes it really easy for us to view/filter/search/edit across different data types. We do this quite often, so we're using this pretty much every day.") is omitted without marking the cut. |

Other reviews worth knowing about: three are 4-star (shnary on performance with large ScriptableObjects; DarkCitizen asking for in-place child creation, added in v1.8.0; sharebophar, in Chinese, asking for list support, added as Collection Tables in v1.10.0). Several reviewers praise support speed; one names "the dev (Jeff)".

## Documentation and getting started

- Docs live on GitHub: https://github.com/LunaWolfStudios/ScriptableSheetsDocs (README), https://github.com/LunaWolfStudios/ScriptableSheetsDocs/blob/main/DOCUMENTATION.md (full documentation and FAQ), https://github.com/LunaWolfStudios/ScriptableSheetsDocs/blob/main/CHANGELOG.md.
- Video tutorials: https://www.youtube.com/playlist?list=PL6G9X1zrT3BLwLA7pbgM5Aam9RrLsrBZp
- Install: import from the Asset Store. The package is `com.lunawolfstudios.scriptablesheets`; it shows in Package Manager as "LWS Scriptable Sheets" (Samples section).
- Requirements (docs "Setup"): the Unity packages `com.unity.nuget.newtonsoft-json` and `com.unity.test-framework`; Unity LTS 2020.3 or newer (settings do not persist before 2020.1).
- Open it from `Window -> Scriptable Sheets`. Pick an asset type in the top-left dropdown (ScriptableObjects by default), then an Object type in the next dropdown. Settings: `Edit -> Project Settings -> Preferences -> Scriptable Sheets`.
- Google Sheets: create an importer (`Create -> Scriptable Sheets -> Google Sheets Importer`), set the type, Sheet ID and Sheet Name, share the sheet as "Anyone with the link", scan for importers in settings, then click "Import CSV from Google Sheets".
- Export JSON: Save with a `.json` extension, or "Copy Json" from the window menu.
- Samples: All Samples, Collections, Component Explorer, Component Presets, Deep Inheritance, Localization, RPG, Sampler.
- Limits stated in the docs: no formulas; custom property drawers and attributes are ignored in the table; `uint`/`ulong` need Unity 2022.1+.

### Version history (changelog)

1.11.0 (2026-07-02), 1.10.1 (2026-06-25), 1.10.0 (2026-06-23), 1.9.1 (2026-06-17), 1.9.0 (2026-03-12), 1.8.0 (2025-11-22), 1.7.2 (2025-08-11), 1.7.1 (2025-07-08), 1.7.0 (2025-07-07), 1.6.0 (2025-07-01), 1.5.1 (2025-04-25), 1.5.0 (2025-04-24), 1.4.3 (2025-03-10), 1.4.2 (2025-03-03), 1.4.1 (2025-02-26), 1.4.0 (2025-02-25), 1.3.0 (2025-02-19), 1.2.1 (2024-09-26), 1.2.0 (2024-09-25), 1.1.1 (2024-07-31), 1.1.0 (2024-07-30), 1.0.0 (2024-07-24)

## Videos

Playlist "Scriptable Sheets", https://www.youtube.com/playlist?list=PL6G9X1zrT3BLwLA7pbgM5Aam9RrLsrBZp: 20 videos ("20 videos" in the playlist header; the RSS feed lists the first 15). Lengths and publish dates from each watch page (dates in Pacific time as YouTube reports them). The playlist page length badges run up to 1 second longer than the watch-page lengths used here. "Listing" marks the 18 videos embedded in the Asset Store gallery. Thumbnails are in `src/assets/scriptable-sheets/video-<id>.jpg`.

| # | ID | Title | Length | Published | Listing |
|---|---|---|---|---|---|
| 1 | `r_FJBZjHUpA` | Scriptable Sheets: Introduction | 1:31 | 2024-08-25 | yes |
| 2 | `G0BHLhTyYaA` | Scriptable Sheets: Getting Started | 0:52 | 2024-07-10 | yes |
| 3 | `sopJAKQNJeU` | Scriptable Sheets: Basic Navigation | 1:09 | 2024-07-10 | yes |
| 4 | `g2O8dtBUn3Y` | Scriptable Sheets: Accessing Settings | 0:29 | 2024-07-10 | yes |
| 5 | `6f5wtxGv534` | Scriptable Sheets: Copy-Paste | 0:35 | 2024-07-10 | yes |
| 6 | `m1YgPSdQiLQ` | Scriptable Sheets: Unity Layout | 0:27 | 2024-07-10 | yes |
| 7 | `bDEzlEbm2MA` | Scriptable Sheets: Paste Pad | 0:55 | 2024-07-10 | yes |
| 8 | `xsYu1ppPGWo` | Scriptable Sheets: Google Sheets | 0:36 | 2024-07-10 | yes |
| 9 | `zuawA3XLSAA` | Scriptable Sheets: Data Transfer Settings | 3:58 | 2024-07-11 | yes |
| 10 | `GKOAzSoqr9g` | Scriptable Sheets: Object Settings | 2:10 | 2024-07-11 | yes |
| 11 | `87hi32dq-kw` | Scriptable Sheets: User Interface Settings | 2:53 | 2024-07-11 | yes |
| 12 | `NOdoRur7B4E` | Scriptable Sheets: Table Nav Settings | 1:10 | 2024-07-11 | yes |
| 13 | `tHzB1EbyYk8` | Scriptable Sheets: Supported Types | 1:05 | 2024-07-31 | yes |
| 14 | `q6il9WTZ5ZQ` | Scriptable Sheets: Workload Settings (Rows and Columns) | 0:48 | 2024-07-11 | yes |
| 15 | `wzI1M-I6sJA` | Scriptable Sheets: Scriptable Objects | 3:07 | 2024-07-31 | yes |
| 16 | `eLHztXQKbDM` | Scriptable Sheets: Search Filters | 1:56 | 2024-07-31 | yes |
| 17 | `N9Uwz-fwnLI` | Scriptable Sheets: What's New | 1:30 | 2025-04-24 | yes |
| 18 | `zGyRCzYJAhM` | Scriptable Sheets Case Study: TCG Engine | 3:20 | 2025-05-02 | no |
| 19 | `PKhTuOgsXJ8` | Scriptable Sheets Case Study: DOTS Survivors | 3:06 | 2025-11-23 | no |
| 20 | `mteCjA1r3pM` | Scriptable Sheets: What's New 2026 | 3:04 | 2026-06-23 | yes |

The old home page embeds `r_FJBZjHUpA` ("Scriptable Sheets: Introduction"). The docs README links the playlist with the `G0BHLhTyYaA` ("Getting Started") thumbnail.

## Unity Awards

**Finding: the claim is true as "nominee".** Scriptable Sheets and Luna Wolf Studios LLC were official nominees at the 17th Unity Awards (2025). Neither won. Unity's results list them as "Runner-ups".

| | Best Development Tool | Breakthrough Publisher |
|---|---|---|
| Edition | 17th Unity Awards, 2025 | 17th Unity Awards, 2025 |
| Category group | Unity Asset Store | Unity Asset Store |
| How named in the nominee list | "Scriptable Sheets, Luna Wolf Studios LLC" | "Luna Wolf Studios LLC" |
| How named in the results | "Scriptable Sheets" (under Runner-ups) | "Luna Wolf Studios LLC" (under Runner-ups) |
| Winner | Code Monkey Toolkit | Kay Lousberg |
| Decided by | Public vote | Internal panel (asterisk category) |

### Exact official wording

Unity blog, "Celebrating excellence: Unity Awards 2025 winners", Dec 9, 2025, https://unity.com/blog/17th-unity-awards-wrap-up-2025-winners-revealed:

> Best Development Tool
> Winner: Code Monkey Toolkit
> Runner-ups: vHierarchy 2 , Behavior Designer Pro , Scriptable Sheets , Timeline Mixer , Magic Time , Photon Quantum - Deterministic Game Engine , Sub-Assets Toolbox

> Breakthrough Publisher
> Winner: Kay Lousberg
> Runner-ups: Josh Stubblefield , October Studio , Kyle Rhoads , Luna Wolf Studios LLC , Idle Games Studio , Friday Night Studio , Honda Motor Co.

(Spacing before the commas is as published.) The blog opens: "we're thrilled to celebrate the winners of the 17th Unity Awards, 2025." The results snapshot of the awards page adds: "Here are the winners and runners-up in all categories from this year's awards." (https://web.archive.org/web/20251220155901/https://unity.com/awards)

Unity Awards page during voting (Wayback snapshot 2025-11-16, https://web.archive.org/web/20251116091028/https://unity.com/awards), FAQ "Where can I find the complete list of this year's nominees?", Asset Store section (excerpt):

> Best Development Tool vHierarchy 2, kubacho lab Behavior Designer, Pro Opsive Code Monkey Toolkit, Code Monkey Scriptable Sheets, Luna Wolf Studios LLC Timeline Mixer, Noel Thomas [...] Breakthrough Publisher Kay Lousberg Josh Stubblefield October Studio Kyle Rhoads Luna Wolf Studios LLC Idle Games Studio Friday Night Studio Honda Motor Co.

Category descriptions from the same FAQ ("What categories are in the 17th Unity Awards?"):

> Best Development Tool These Asset Store tools extend Unity’s capabilities to boost your productivity and push performance to the next level.

> Breakthrough Asset Award* Honoring an Asset Store publisher whose work has made a strong impact on the Unity community. Chosen by our internal team, it recognizes new talent whose creativity and quality quickly stood out.

"Categories marked with an asterisk (*) are voted internally". The "What's new" FAQ adds that this award "celebrates a first-time Asset Store publisher". Note the naming: this FAQ list says "Breakthrough Asset Award", while the nominee list and the results say "Breakthrough Publisher".

### How nominees were chosen

- Official rules, section 8 (https://unity.com/legal/unity-awards-program-official-rules): an internal award committee "will select up to eight (8) nominees per category"; "The final winners will be chosen by public vote, with exception to internal award categories".
- Submission site (https://awards.unity.com/): "Nominees are announced through internal selection, and voting opens to the general public and community."
- Asset Store eligibility (awards FAQ): "First released on the Asset Store between July 1, 2024 to June 30, 2025." Scriptable Sheets was first published 2024-07-24.
- Stats from the blog: 700+ project submissions, 14,000 community voters, 36,000+ votes cast.

### Timeline

- nominationsOpen: 2025-08-12 09:00 PT to 2025-09-23 16:00 PT (official rules section 4)
- nomineesAnnounced: 2025-11-05 (Unity YouTube video "2025 Unity Award Nominees" and Unity Discussions post)
- votingCloses: November 21, 2025 per the awards page and the nominee video description; the Unity Discussions post says "Voting closes November 22"
- showcase: December 2, 2025 per the awards page FAQ ("The winners will be announced live during the Unity Awards Showcase on December 2nd, 2025.")
- winnersBlogPost: 2025-12-09 ("Celebrating excellence: Unity Awards 2025 winners")

### Announcements

- Unity YouTube, "2025 Unity Award Nominees", Nov 5, 2025, 1:55: https://www.youtube.com/watch?v=GeKXRU6MVEg. Description: "Explore this year’s nominees across the Games, Asset Store, Education, and Community categories". Whether it shows Scriptable Sheets on screen is **UNVERIFIED** (not watched).
- Unity Discussions, "The Unity Awards 2025 Nominees are here - Vote now on your Favorites", Nov 5, 2025: https://discussions.unity.com/t/the-unity-awards-2025-nominees-are-here-vote-now-on-your-favorites/1693983. Embeds the video; names no nominees in text.
- No Unity X/LinkedIn/Instagram post naming Scriptable Sheets or Luna Wolf Studios was found.
- The live page https://unity.com/awards now returns 308 to `/made-with-unity`; the nominee list survives in the Wayback snapshots above and the results in the blog. No 18th (2026) Unity Awards announcement was found.

### Badges and terms

Official rules (https://unity.com/legal/unity-awards-program-official-rules), section 9 "Awards" (also repeated in the awards FAQ "What are the prizes for the Unity Award Winners?"):

> The Unity Award nominees and winners in each category will receive digital badges to share on their storefronts and socials.

Section 12 "Use of Unity Awards Title and Logo" covers winners only:

> Winners of the Program are entitled to use the title “[category] Unity Awards Winner 2025,” “17th Unity Awards Winner [category],” as well as the corresponding digital badge, logo and word and figurative mark for global advertising purposes upon consultation with Unity. Any additional trademark guidelines provided by Unity must be strictly followed. Modifying, changing, or isolating any parts of the logo or the word and figurative mark is not permitted.

So a nominee badge exists and nominees are told to share it on storefronts and socials. No public nominee badge file and no nominee-specific usage guidelines were found; nothing in `archive/` either. The studio would have received it from Unity directly.

## Related Unity credentials

Kodeco tutorials listed on the old About Jeff page (`archive/wordpress/pages/about-jeff.md`). All five links resolve (HTTP 200, no redirect) on the access date. Dates and bylines as shown on each page.

| Title as shown on Kodeco | URL | Date shown | Byline shown | Notes |
|---|---|---|---|---|
| Audio tutorial for Unity: the Audio Mixer | https://www.kodeco.com/532-audio-tutorial-for-unity-the-audio-mixer | Jul 7 2017 | By Jeff [the page prints his surname]. | Page shows "5 (9) · 1 Review". Old site title: "Audio Tutorial for Unity: the Audio Mixer". |
| How to Make a Match 3 Game in Unity | https://www.kodeco.com/673-how-to-make-a-match-3-game-in-unity | Apr 12 2017 | By Jeff [the page prints his surname]. | - |
| ScriptableObject Tutorial: Getting Started | https://www.kodeco.com/2826197-scriptableobject-tutorial-getting-started | Jul 19 2019 | By Ben MacKinnon . | Current byline is the updater. Page note: "Update May 2019: This tutorial was updated to Unity 2019.1 by Ben MacKinnon. Original post by Jeff [the page prints his surname] ." The shown date is the update, not the original post date (original date UNVERIFIED). |
| Unity Cheat Sheet and Quick Reference 2018 | https://www.kodeco.com/227-unity-cheat-sheet-and-quick-reference-2018 | Jan 19 2018 | By Jeff [the page prints his surname]. | Tagged "C# 6, Unity 2017.x, Unity". |
| How to Create a Tower Defense Game in Unity – Part 1 | https://www.kodeco.com/269-how-to-create-a-tower-defense-game-in-unity-part-1 | Dec 8 2017 | By Jeff [the page prints his surname]. | Update, not original authorship. Page note: "Update note: This tutorial has been updated to Unity 2017.1 by Jeff [the page prints his surname]. The original tutorial was written by Barbara Reichart." Old site title: "How to Create a Tower Defense Game in Unity". |

YouTube tutorial: "[Unity + FREE] Setup a Bug Reporter in Unity using Trello", https://www.youtube.com/watch?v=ryXwG1j4rhI, channel Luna Wolf Studios, published 2018-02-28, 2:41. Old site link text: "Setup a Bug Reporter in Unity using Trello". Thumbnail: `src/assets/scriptable-sheets/video-ryXwG1j4rhI.jpg`.

## Image inventory

All in `src/assets/scriptable-sheets/`; sources in `SOURCES.md` there. Asset Store screenshots come only in the "_scaled" size (1200 wide); the unscaled originals return 403. The CDN offers no larger key image than 1950x1300.

| File | Size (px) | What it is |
|---|---|---|
| `logo.png` | 1372x569 | Scriptable Sheets title logo, copied from the old WordPress site |
| `key-image.jpg` | 1950x1300 | Asset Store key image ("big"), the largest key image offered |
| `key-image-social.jpg` | 1200x630 | Asset Store key image ("facebook" social share crop) |
| `icon.png` | 160x160 | Asset Store key image ("icon") |
| `screenshot-01.jpg` | 1200x800 | Asset Store listing screenshot, "_scaled" size (largest the CDN serves; unscaled originals return 403) |
| `screenshot-02.jpg` | 1200x800 | Asset Store listing screenshot, "_scaled" size (largest the CDN serves; unscaled originals return 403) |
| `screenshot-03.jpg` | 1200x800 | Asset Store listing screenshot, "_scaled" size (largest the CDN serves; unscaled originals return 403) |
| `screenshot-04.jpg` | 1200x800 | Asset Store listing screenshot, "_scaled" size (largest the CDN serves; unscaled originals return 403) |
| `screenshot-05.jpg` | 1200x800 | Asset Store listing screenshot, "_scaled" size (largest the CDN serves; unscaled originals return 403) |
| `screenshot-06.jpg` | 1200x800 | Asset Store listing screenshot, "_scaled" size (largest the CDN serves; unscaled originals return 403) |
| `screenshot-07.jpg` | 1200x800 | Asset Store listing screenshot, "_scaled" size (largest the CDN serves; unscaled originals return 403) |
| `screenshot-08.jpg` | 1200x800 | Asset Store listing screenshot, "_scaled" size (largest the CDN serves; unscaled originals return 403) |
| `screenshot-09.jpg` | 1200x675 | Asset Store listing screenshot, "_scaled" size (largest the CDN serves; unscaled originals return 403) |
| `screenshot-10.jpg` | 1200x675 | Asset Store listing screenshot, "_scaled" size (largest the CDN serves; unscaled originals return 403) |
| `screenshot-11.jpg` | 1200x675 | Asset Store listing screenshot, "_scaled" size (largest the CDN serves; unscaled originals return 403) |
| `screenshot-12.jpg` | 1200x675 | Asset Store listing screenshot, "_scaled" size (largest the CDN serves; unscaled originals return 403) |
| `video-r_FJBZjHUpA.jpg` | 1280x720 | YouTube thumbnail (maxresdefault) for Scriptable Sheets: Introduction |
| `video-G0BHLhTyYaA.jpg` | 1280x720 | YouTube thumbnail (maxresdefault) for Scriptable Sheets: Getting Started |
| `video-sopJAKQNJeU.jpg` | 1280x720 | YouTube thumbnail (maxresdefault) for Scriptable Sheets: Basic Navigation |
| `video-g2O8dtBUn3Y.jpg` | 1280x720 | YouTube thumbnail (maxresdefault) for Scriptable Sheets: Accessing Settings |
| `video-6f5wtxGv534.jpg` | 1280x720 | YouTube thumbnail (maxresdefault) for Scriptable Sheets: Copy-Paste |
| `video-m1YgPSdQiLQ.jpg` | 1280x720 | YouTube thumbnail (maxresdefault) for Scriptable Sheets: Unity Layout |
| `video-bDEzlEbm2MA.jpg` | 1280x720 | YouTube thumbnail (maxresdefault) for Scriptable Sheets: Paste Pad |
| `video-xsYu1ppPGWo.jpg` | 1280x720 | YouTube thumbnail (maxresdefault) for Scriptable Sheets: Google Sheets |
| `video-zuawA3XLSAA.jpg` | 1280x720 | YouTube thumbnail (maxresdefault) for Scriptable Sheets: Data Transfer Settings |
| `video-GKOAzSoqr9g.jpg` | 1280x720 | YouTube thumbnail (maxresdefault) for Scriptable Sheets: Object Settings |
| `video-87hi32dq-kw.jpg` | 1280x720 | YouTube thumbnail (maxresdefault) for Scriptable Sheets: User Interface Settings |
| `video-NOdoRur7B4E.jpg` | 1280x720 | YouTube thumbnail (maxresdefault) for Scriptable Sheets: Table Nav Settings |
| `video-tHzB1EbyYk8.jpg` | 1280x720 | YouTube thumbnail (maxresdefault) for Scriptable Sheets: Supported Types |
| `video-q6il9WTZ5ZQ.jpg` | 1280x720 | YouTube thumbnail (maxresdefault) for Scriptable Sheets: Workload Settings (Rows and Columns) |
| `video-wzI1M-I6sJA.jpg` | 1280x720 | YouTube thumbnail (maxresdefault) for Scriptable Sheets: Scriptable Objects |
| `video-eLHztXQKbDM.jpg` | 1280x720 | YouTube thumbnail (maxresdefault) for Scriptable Sheets: Search Filters |
| `video-N9Uwz-fwnLI.jpg` | 1280x720 | YouTube thumbnail (maxresdefault) for Scriptable Sheets: What's New |
| `video-zGyRCzYJAhM.jpg` | 1280x720 | YouTube thumbnail (maxresdefault) for Scriptable Sheets Case Study: TCG Engine |
| `video-PKhTuOgsXJ8.jpg` | 1280x720 | YouTube thumbnail (maxresdefault) for Scriptable Sheets Case Study: DOTS Survivors |
| `video-mteCjA1r3pM.jpg` | 1280x720 | YouTube thumbnail (maxresdefault) for Scriptable Sheets: What's New 2026 |
| `video-ryXwG1j4rhI.jpg` | 1280x720 | YouTube thumbnail (maxresdefault) for [Unity + FREE] Setup a Bug Reporter in Unity using Trello |

Not downloaded: the Asset Store's smaller key-image crops (420x280 "small", 75x75 "icon75") and its custom video poster thumbnails (`*_thumb.png`), which duplicate the files above at lower size. Screenshot content was not described; look at the files before writing alt text.

## UNVERIFIED

- Launch or original introductory price: no source found. Only the regular price ($49.99) and the sale price on the access date ($24.99) are verified.
- End date of the current 50% sale.
- Render pipeline display names (Built-in / HDRP / URP / Custom SRP): inferred from the raw SRP record (standard, hd, lightweight, custom); not seen rendered.
- The listing gallery counter reads "1 / 31", but the listing data holds 30 media items (12 screenshots, 18 videos). The 31st item is unidentified.
- Unity Discussions release thread (https://discussions.unity.com/t/released-scriptable-sheets/1490189): blocked automated fetches with 403, content not read.
- Unity Awards nominee badge: the rules say nominees receive a digital badge, but the file and any nominee-specific usage terms were not found publicly or in archive/.
- Whether the "2025 Unity Award Nominees" video shows Scriptable Sheets or Luna Wolf Studios on screen (video not watched; the text nominee list is verified).
- The original 2017/2018 publish date of the ScriptableObject tutorial on Kodeco (page shows the July 2019 update date).

## Decisions for the orchestrator

- Awards wording. The owner said "nominated", which matches the official record. Unity's own results page labels non-winning nominees "Runner-ups". Suggested public wording: "Nominee, Best Development Tool, 17th Unity Awards (2025)" and "Luna Wolf Studios: Nominee, Breakthrough Publisher, Unity Awards 2025". Do not say "winner" or "finalist". "Runner-up" is also accurate per Unity's wording, but could read as second place; the orchestrator should pick one term.
- Category name. The nominee list and results say "Breakthrough Publisher"; the awards FAQ category list calls the same award "Breakthrough Asset Award*". Use "Breakthrough Publisher" (the name on the published results).
- Badge. Ask the owner for the official digital nominee badge Unity sent. Do not recreate a Unity laurel. Section 12 title/logo rights are for winners only; showing the nominee badge is covered only by the section 9 line about sharing it on "storefronts and socials".
- Surname. Kodeco credits "Jeff [the page prints his surname]" and the Kodeco URLs contain no name, but CLAUDE.md says Jeff goes by first name only on the site. Link the tutorials without printing the surname, or get the owner's OK.
- Kodeco credit accuracy. The ScriptableObject tutorial is now bylined Ben MacKinnon ("Original post by Jeff [the page prints his surname]"), and the Tower Defense Part 1 tutorial was an update of Barbara Reichart's original. Describe them as "original author" and "updated" respectively, not as sole authorship.
- Reviews. The old site edited two quotes (Katerlad and RestingOwl merge the review title into the body; Quevanto and RestingOwl drop sentences without marks). CLAUDE.md requires exact reproduction: use the verbatim title and body from this file, or mark cuts with an ellipsis.
- Rating display. Unity stores the average as 5 (rounded) but the publisher page shows 4.9 (31 five-star + 3 four-star = 4.91). Say "4.9 out of 5 from 34 reviews" or "34 reviews, 31 of them five-star"; avoid "5 stars".
- Price. $24.99 is a sale price on the access date. Show the regular $49.99, or no price, and link to the listing for the current price.
- Unity version wording. The listing says "Supports Unity LTS versions 2020.3 and up"; the listing's "Original Unity version" is 2022.3.62 (Unity does not say what this field means beyond its label). Use the 2020.3+ claim, citing the listing.
