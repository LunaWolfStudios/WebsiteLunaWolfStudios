/**
 * Copy for /scriptable-sheets/ that is data: the benefit blocks, the full feature list, the
 * fact sheet, the FAQ, and how the video playlist is split on the page.
 *
 * Sources: the Asset Store listing and the docs, as recorded in
 * archive/research/scriptable-sheets.md (gathered 2026-11-21). Feature lines restate the
 * listing's own items in plain words; nothing here goes beyond what the listing or the docs say.
 *
 * Never put a price, discount, rating, review count, or version number here: they come from
 * src/data/store.json through src/lib/store.ts (getOffer, getAssetStoreRating).
 */
import { LINKS } from "./links";
import { SCRIPTABLE_SHEETS_VIDEOS } from "./videos";

/**
 * Hidden text placed inside every link in this file that opens a new tab, after its visible
 * text. The page strips it from the FAQ answers before they go into the FAQPage JSON-LD.
 */
export const NEW_TAB = `<span class="visually-hidden"> (opens in a new tab)</span>`;

/** "What Scriptable Sheets does": one heading, one or two sentences, one listing screenshot. */
export interface SheetsBenefit {
  title: string;
  text: string;
  /** Path relative to src/assets/. */
  image: string;
  alt: string;
}

export const SHEETS_BENEFITS: SheetsBenefit[] = [
  {
    title: "Every asset of a type in one table",
    text: "Each asset is a row, each field a column. ScriptableObjects, Prefabs, Components, AudioClips, Materials, Meshes, and Textures.",
    image: "scriptable-sheets/screenshot-01.jpg",
    alt: "Three Scriptable Sheets windows: meshes with previews, audio clips with waveforms, and textures with thumbnails, each in its own table",
  },
  {
    title: "Edit and compare side by side",
    text: "Edit in place, pick and sort columns, and the Inspector follows the cell you select.",
    image: "scriptable-sheets/screenshot-02.jpg",
    alt: "A table of weapon ScriptableObjects with a column picker open, beside the Unity Inspector showing the selected weapon",
  },
  {
    title: "Copy and paste from Google Sheets, CSV, and more",
    text: "Copy to Excel or Google Sheets and paste back. Import CSV and TSV, export JSON, or pull from a Google Sheet shared by link.",
    image: "scriptable-sheets/screenshot-05.jpg",
    alt: "A Google Sheet of language names and the same rows in a Scriptable Sheets table, with arrows showing data moving both ways",
  },
  {
    title: "Lists and arrays get their own tables",
    text: "Open any array or list as its own table, one row per element. Nested, generic, and SerializeReference fields work too.",
    image: "scriptable-sheets/screenshot-03.jpg",
    alt: "A loot list in the Unity Inspector and the same list as a Scriptable Sheets collection table with name, quantity, drop chance, and rarity columns",
  },
];

/** One line of the feature grid. `html` may hold a link. */
export interface SheetsFeature {
  title: string;
  text?: string;
  html?: string;
}

/** One feature group: its listing screenshot and its items. */
export interface SheetsFeatureGroup {
  title: string;
  /** Path relative to src/assets/. A listing screenshot of the group at work. */
  image: string;
  alt: string;
  items: SheetsFeature[];
}

/**
 * The listing's full feature list in its three groups, every item kept, each cut to one line.
 * Each group carries a listing screenshot not used elsewhere on the page.
 */
export const SHEETS_FEATURE_GROUPS: SheetsFeatureGroup[] = [
  {
    title: "Core features",
    image: "scriptable-sheets/screenshot-08.jpg",
    alt: "A Scriptable Sheets table of Prefabs with tabs for their GameObject, AudioSource, Transform, Rigidbody, and Text components, beside the settings panel and the Project window",
    items: [
      { title: "No setup", text: "New and existing assets appear in a table with no coding." },
      { title: "Asset management", text: "Select, read, update, and delete Unity Objects." },
      { title: "Batch create", text: "Many ScriptableObjects of a type in one click." },
      { title: "Import and export", text: "CSV, TSV, and flat files in; flat files or JSON out, with header, wrap, delimiter, and enum options." },
      { title: "Copy and paste", text: "Tables, columns, rows, or cells, out to any flat file format and back." },
      { title: "Serialization", text: "Serializable classes and property types in a multi-column view." },
      { title: "Complex data", text: "Inherited, nested, and generic fields." },
      { title: "Managed references", text: "SerializeReference fields, with a type dropdown on each row." },
      { title: "Object references", text: "AudioClips, Materials, Prefabs, ScriptableObjects, and more." },
      { title: "Collections", text: "Arrays and lists in the grid, or as their own table." },
      { title: "Read-only fields", text: "Asset paths, GUIDs, and read-only fields." },
      { title: "Sub Assets", text: "Manage and filter Sub Assets of ScriptableObject types." },
      { title: "Addressables", text: "Addressable Asset References and their Sub Assets." },
      { title: "Prefab Components", text: "Transforms, Colliders, Rigidbodies, and more on your Prefabs." },
    ],
  },
  {
    title: "User interface",
    image: "scriptable-sheets/screenshot-04.jpg",
    alt: "Four Scriptable Sheets windows stacked, with the window menu open on Open Sheet and the options to open, rename, delete, and clone sheets",
    items: [
      { title: "Keyboard navigation", text: "Tab, enter, shift, and arrow keys, as in a spreadsheet." },
      {
        title: "Search filtering",
        html: `By folder, name, or <a href="${LINKS.scriptableSheetsDocumentation}#advanced-search-filtering" target="_blank" rel="noopener">property-based filters${NEW_TAB}</a>, with case and prefix options.`,
      },
      { title: "Pagination", text: "Page through large sets of Objects." },
      { title: "Hide and show columns", text: "Keep only the data you need in view." },
      { title: "Resizable columns", text: "By hand, or with stretch, compact, and expand presets." },
      { title: "Adjustable row height", text: "Fits multiline text and texture, material, and model previews." },
      { title: "Sorting", text: "By any column, even colors, gradients, and curves." },
      { title: "Multiple windows", text: "Several sheets open at once, to switch between Object types." },
      { title: "Recent pins", text: "Recently viewed types pinned for quick access." },
      { title: "Session cache", text: "Each sheet keeps its setup across sessions where possible." },
      { title: "Paste Pad", text: "A lightweight text editor inside Unity." },
      { title: "Inspector sync", text: "The selected cell's Object shows in the Inspector and Project windows." },
      { title: "Light and dark themes", text: "Matches both Unity Editor themes." },
    ],
  },
  {
    title: "Technical details",
    image: "scriptable-sheets/screenshot-07.jpg",
    alt: "The Scriptable Sheets settings panel beside a table of RPG unit ScriptableObjects, with Paste Pad open below holding the same rows as text",
    items: [
      { title: "Full source code", text: "Customize it to fit your project." },
      { title: "Samples", text: "Sample projects to learn from." },
      { title: "Unit tests", text: "Ships with a suite of unit tests." },
      { title: "User settings", text: "Personal preferences in the UserSettings folder." },
      { title: "IMGUI", text: "For features UI Toolkit does not offer." },
      { title: "Editor only", text: "Stripped from builds, except the samples." },
      { title: "Unity LTS support", text: "Unity 2020.3 LTS and later." },
    ],
  },
];

/**
 * Fact sheet rows that do not change with the store. Version and price come from store data.
 * File size is the listing's figure for version 1.11.0 (467,520 bytes), read 2026-11-21.
 */
export const SHEETS_FACTS = {
  firstPublished: { iso: "2024-07-24", label: "July 24, 2024" },
  unityVersions: "Unity 2020.3 LTS and later",
  runsIn: "The Unity Editor only. It is stripped from builds, except the samples.",
  requires: "The Newtonsoft Json and Test Framework packages from Unity",
  includes: "Full source code, sample projects, and unit tests",
  fileSize: "456.6 KB",
  license: "Standard Unity Asset Store EULA. Extension Asset, licensed per seat.",
  /** The Asset Store names the publisher "Luna Wolf Studios LLC". */
  publisher: "Luna Wolf Studios",
} as const;

/** Documentation and support links, in the order the listing gives them. */
export const SHEETS_SUPPORT_LINKS: Array<{ label: string; note: string; href: string; icon: string }> = [
  { label: "Documentation", note: "Setup, settings, search filters, and FAQ", href: LINKS.scriptableSheetsDocumentation, icon: "sheet" },
  { label: "Changelog", note: "Every release since 1.0.0", href: LINKS.scriptableSheetsChangelog, icon: "layers" },
  { label: "Video tutorials", note: "The full playlist on YouTube", href: LINKS.scriptableSheetsPlaylist, icon: "youtube" },
  { label: "Unity Discussions", note: "The release thread on Unity's forum", href: LINKS.scriptableSheetsForum, icon: "unity" },
  { label: "support@lunawolfstudios.com", note: "Email the developer", href: "mailto:support@lunawolfstudios.com", icon: "mail" },
];

/** FAQ: answers from the listing and the docs, 40 to 80 words each. `a` may hold simple HTML. */
export const SHEETS_FAQ: Array<{ q: string; a: string }> = [
  {
    q: "What is Scriptable Sheets?",
    a: "Scriptable Sheets is a Unity Editor tool that shows your ScriptableObjects, Prefabs, Components, and other assets in a spreadsheet-like table. Instead of opening assets one at a time in the Inspector, you see every asset of a type in one window, then sort, filter, edit, copy, and paste them in bulk. It is sold on the Unity Asset Store by Luna Wolf Studios.",
  },
  {
    q: "Which Unity versions does it support?",
    a: `It supports Unity 2020.3 LTS and later, and it follows Unity's light and dark Editor themes. It needs two Unity packages, Newtonsoft Json and Test Framework. Unsigned <code>uint</code> and <code>ulong</code> fields need Unity 2022.1 or later. The <a href="${LINKS.scriptableSheetsChangelog}" target="_blank" rel="noopener">changelog${NEW_TAB}</a> records fixes for new Unity releases, such as Unity 6.5 in version 1.9.1.`,
  },
  {
    q: "Does Scriptable Sheets add anything to my game build?",
    a: "No. Scriptable Sheets runs only in the Unity Editor and is stripped from your builds completely, apart from the optional sample projects that come with it. Because none of it runs in your game, the render pipeline your project uses does not matter, and there is nothing extra for players to download.",
  },
  {
    q: "Can I move data between Unity and Google Sheets, Excel, or CSV files?",
    a: "Yes. Copy whole tables, rows, columns, or single cells and paste them into Excel or Google Sheets, then paste edited data back. You can import CSV, TSV, and other flat files and export to flat files or JSON. A Google Sheets Importer pulls data from any sheet shared by link, and Auto Generate can create missing ScriptableObjects during an import or paste.",
  },
  {
    q: "Do I need to write code to use it?",
    a: "No. Open it from <strong>Window &gt; Scriptable Sheets</strong> and it finds and organizes your asset types and serializable ScriptableObject types on its own. Pick a type and start editing. The package includes full source code, so programmers who want to change how it works can, but nobody on the team has to.",
  },
  {
    q: "Does it handle nested data, lists, and SerializeReference fields?",
    a: "Yes. It shows inherited, nested, and generic fields, Unity Object references, Sub Assets, and Addressable Asset References. Arrays and lists can be edited in the grid or opened as their own table, and SerializeReference fields get a type dropdown on each row with a column for every concrete subtype's fields.",
  },
  {
    q: "Where do I get help?",
    a: `Start with the <a href="${LINKS.scriptableSheetsDocumentation}" target="_blank" rel="noopener">documentation${NEW_TAB}</a> and the video tutorials on this page, which cover setup, the settings panels, search filters, and two case studies. For anything else, email <a href="mailto:support@lunawolfstudios.com">support@lunawolfstudios.com</a> or post in the <a href="${LINKS.scriptableSheetsForum}" target="_blank" rel="noopener">release thread on Unity Discussions${NEW_TAB}</a>.`,
  },
];

/** The playlist split for the page: the first eight show, the rest open on request. */
export const SHEETS_VIDEOS_SHOWN = 8;
export const SHEETS_VIDEOS = SCRIPTABLE_SHEETS_VIDEOS;
