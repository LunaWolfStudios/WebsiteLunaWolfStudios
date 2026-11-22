# SEO plan for lunawolfstudios.com

Research date: 2026-11-21. Inputs: `CLAUDE.md`, every page in `archive/wordpress/pages/`, the five
posts in `archive/blog/`, the sister site's `src/data/presskit.ts` and `links.ts`, the live
WordPress site (head tags, robots, sitemaps), Google autocomplete for about 100 seed phrases, live
web searches, and the pages of 15 ranking studios and agencies. Sources are listed at the
end.

The page plan is also in `seo-plan.json` (one object per route, with character counts). Every
title is 60 characters or fewer and every description is 140 to 160; the script that wrote the
JSON checked both and found no duplicates.

**Revision 2 (2026-11-21).** Updated after the orchestrator's follow-up: re-read the regenerated
`game-design-and-development.md` (the full "Our Howling Reviews" section, 18 quotes, including a
client review) and `about-jeremy.md` (academic appointments, awards, full portfolio); added the
route `/services/unity-editor-tools/` and narrowed `/services/unity-development/` so the two do
not compete; used the owner's confirmation that Connor Butler came through the internship; set
`llms.txt` and crawler access as decided; dropped JobPosting to a follow-up; and made every Unity
Awards mention in a title, description, or H1 neutral ("recognized at the 17th Unity Awards").
The plan now covers 27 routes.

**What I could not measure.** I had no keyword volume tool, no Search Console access, and no rank
tracker. "Relative demand" below is a judgment from three signals: whether Google autocomplete
offers the phrase and how many variants it offers, how many paid-looking agency pages crowd the
results, and whether the results are vendors or something else (docs, job boards, articles).
Treat high, medium, and low as ordinal, not as numbers. Before launch, export the old site's
Search Console Performance report (queries and pages, last 16 months). It is the only real
traffic data for this domain and it will show which old URLs earn clicks.

---

## 1. Keyword map

### How to read the table

- **Demand**: high, medium, or low (judged from autocomplete and results, as above).
- **Competition**: how strong the pages on page one are.
- **Can we rank?**: *head* = realistic for the head phrase; *long tail* = target the longer variant
  named; *no* = cover it on a page for relevance but do not expect traffic.

### A. Game development (hire or vendor intent)

| | |
|---|---|
| Primary | game development company |
| Close variants | game development studio, game development services, hire game developers, hire game development studio, game development outsourcing (companies, studio, services), outsource game development, game co-development studio, game development company USA, game development company near me |
| Intent | Producers and founders looking for a vendor or a partner team |
| Demand / competition | High / very high |
| Who ranks | Large outsourcers and agencies, plus directories. Autocomplete is dominated by India city modifiers (Ahmedabad, Surat, Chennai, Pune), which shows how crowded the term is. Examples: keywordsstudios.com/en/services/create/game-development/co-development/, juegostudio.com/game-development-services/game-co-development, stepico.com/services/game-co-development/, side.inc/services/game-development, game-ace.com/game-development-outsourcing/, ventionteams.com/solutions/gamedev/outsourcing |
| Can we rank? | Head: no. Long tail: yes, if the page shows proof the big pages lack: "indie game co-development studio", "Unity multiplayer game developer", "help releasing my game on Steam", "game developer for hire USA small studio" |

### B. Unity development

| | |
|---|---|
| Primary | hire Unity developers |
| Close variants | Unity developers for hire, Unity game developer for hire, Unity game dev for hire, Unity programmers for hire, Unity development company, Unity 3D game development company in USA, Unity consulting services |
| Intent | Hire a person or a team for Unity work |
| Demand / competition | Medium-high / very high |
| Who ranks | Talent marketplaces and staffing agencies: toptal.com/unity, upwork.com/hire/unity-3d-developers/, ventionteams.com/skills/unity, x-team.com/technologies/hire-unity-developers, mindinventory.com/hire-unity-developers/, yudiz.com/hire-unity-developers/ |
| Can we rank? | Head: no. "Unity development company" autocomplete is polluted by unrelated firms (Unity Development Corporation Guam), so the phrase is ambiguous too. Long tail: "Unity developer for VR health apps", "Unity multiplayer developer", "Unity tools programmer for hire" |

### B2. Custom Unity editor tools (best bet)

| | |
|---|---|
| Primary | custom Unity editor tools |
| Close variants | Unity custom editor tools, Unity editor tool development, Unity tools developer, Unity tools programmer, build custom Unity editor tools, Unity pipeline tools |
| Intent | Mixed: developers learning the API, people hiring a tools programmer, job seekers |
| Demand / competition | Low-medium / **low for vendor intent** |
| Who ranks | Fiverr gigs and Unity's own docs, no studio pages: fiverr.com/rafaelgrativald/do-your-custom-unity-editor-tools, fiverr.com/mrryzen/build-custom-unity-editor-tools-to-automate-your-workflow, docs.unity.com/en-us/engine/current/manual/extending-the-editor/using-custom-editor-tools |
| Can we rank? | **Yes, head and long tail.** The studio sells a tool recognized at the 17th Unity Awards (2025; official term to be verified) with public Asset Store reviews. No other studio in the results has that proof. Target page: `/services/unity-editor-tools/` (added) |

### B3. Unity infrastructure (developer intent, later content)

| | |
|---|---|
| Primary | Unity CI/CD |
| Close variants | Unity CI/CD pipeline, Unity CI/CD GitHub Actions, Unity WebRTC streaming, Unity WebRTC render streaming, Unity pixel streaming |
| Intent | Developers solving a problem; few want to hire |
| Demand / competition | Medium / medium (GameCI, Unity docs, blogs) |
| Can we rank? | Not with service pages. Mention on `/services/unity-development/` for relevance; win later with articles (section 5) |

### C. VR and AR

| | |
|---|---|
| Primary | VR development company |
| Close variants | AR/VR app development, AR VR app development agency, VR software development company, VR game development studio, top AR VR development company, Unity VR developer, VR training development, medical VR development |
| Intent | Buyers in health, training, retail, and games |
| Demand / competition | Medium / high |
| Who ranks | Agencies and directories: innowise.com/services/ar-vr-development/, clutch.co/developers/virtual-reality, scnsoft.com/healthcare/virtual-reality; for medical VR, Unity's own case studies (unity.com/resources/virtamed, unity.com/resources/laerdal-medical, unity.com/resources/lucid-reality-labs) and Fiverr gigs |
| Can we rank? | Head: no. Long tail: yes for health: "VR app development for healthcare", "VR hearing assessment", "VR therapy game developer", "Meta Quest app for clinical research" |

### D. Serious games, health, education, gamification

| | |
|---|---|
| Primary | serious game development |
| Close variants | serious games developer, serious games company, healthcare game development, games for health, VR physical therapy games, therapeutic VR games, gamified rehabilitation, gamification development company, educational game development company, edtech game development, fitness game development |
| Intent | Health systems, researchers, schools, edtech and corporate training buyers |
| Demand / competition | Medium (health terms low) / medium |
| Who ranks | game-ace.com/serious-game-development/, breakawaygames.com/what-we-do, Ranj, filamentgames.com/services, juegostudio.com/educational-game-development, stepico.com/educational-games, plus academic papers and research labs (shu.ac.uk Impact VR, USC) and products (Penumbra, AVRwell) |
| Can we rank? | Long tail: yes, the most realistic service bet. The results are fragmented, few vendors show shipped health work, and the studio has named projects (HELIX with Nemours, SaeboVR, KneeBRIGHT, MOVE-IT, iCARE with Barron Associates, Peloton's Lanebreak, Legends of Learning). Target "serious games for health", "VR rehabilitation game developer", "healthcare game development studio" |

### E. Custom software

| | |
|---|---|
| Primary | custom software development company |
| Close variants | custom software development company in USA, custom software development for small businesses, software development companies in Delaware, NestJS development company, Node.js backend development, legacy modernization, cloud migration |
| Intent | Businesses buying web apps and backends |
| Demand / competition | High / very high |
| Who ranks | Large agencies and directories (Clutch, GoodFirms, DesignRush) |
| Can we rank? | Head: no. Long tail: "NestJS development company" (autocomplete exists, agency results), "software development companies in Delaware" (autocomplete exists, directory results). The page mainly needs to exist so a client already talking to us sees the capability |

### F. Game porting

| | |
|---|---|
| Primary | game porting services |
| Close variants | port game to Nintendo Switch, how does game porting work, what is game porting |
| Intent | Studios with a PC game who want console |
| Demand / competition | Medium / high. Bare "game porting" means Apple's Game Porting Toolkit in autocomplete, so it is the wrong intent |
| Who ranks | Keywords Studios porting, Pingle Studio, Room 8 Studio, Unity's Switch pages (unity.com/solutions/nintendo-switch) |
| Can we rank? | No as a page today. Cover it as an H2 on game development, with Hypno Halo and ParaLily on Switch as proof |

### G. Local

| | |
|---|---|
| Primary | game development company Delaware |
| Close variants | game studio Delaware, game developers near Philadelphia, game development Wilmington DE, Unity developer Delaware, software development companies in Delaware, game studio near me |
| Intent | Local buyers, schools, health systems, and press |
| Demand / competition | **Low** (autocomplete offered nothing for any Delaware or Philadelphia phrase except "software development companies in delaware") / **low** |
| Who ranks | No strong studio pages. Technical.ly Delaware articles (technical.ly/startups/log-off-twitter-and-try-these-delaware-made-video-games), builtin.com/companies/location/na/usa/de/type/gaming-companies, superbcompanies.com/categories/game-development-companies-in-delaware/, hyperlinkinfosystem.com/game-development-company-delaware (an outsourcer's doorway page), clutch.co/developers/unity/philadelphia, twine.net Philadelphia lists |
| Can we rank? | **Yes.** Low traffic, but the visitors who search this are buyers, and "near me" searches add more. Do it with real signals (home, about, contact, Organization address, directory listings, Technical.ly coverage), not a doorway page |

### H. Product: Scriptable Sheets

| | |
|---|---|
| Primary | Scriptable Sheets |
| Close variants | Scriptable Sheets Unity, Unity ScriptableObject editor, Unity ScriptableObject custom editor, Unity spreadsheet editor, ScriptableObject spreadsheet, edit ScriptableObjects in a table, Unity data table, bulk edit ScriptableObjects |
| Intent | Unity developers looking for a tool |
| Demand / competition | Brand: low-medium; generic: low-medium / **rising**: DataForge, Game Data Workbench, Rowsmith ScriptableObject Spreadsheet Editor, Athena Asset Tables, TableForge, Scriptable Studio Pro all appeared in 2026 |
| Who ranks | The Asset Store listing (assetstore.unity.com/packages/tools/utilities/scriptable-sheets-284559) and the Unity forum thread (discussions.unity.com/t/released-scriptable-sheets/1490189) already rank first for the generic table queries. Competitors use GitHub Pages docs (ragendom69.github.io/dataforge/documentation.html, maharajastudiocustomerservice-cell.github.io/MaharajaStudioWeb/scriptable-studio-pro-docs.html) |
| Can we rank? | Yes. A product page on the studio domain adds a second or third result. Autocomplete offers "scriptable sheets unity free download" (piracy intent), so the official page should hold the brand results |

### I. Education

| | |
|---|---|
| Primary | game development internship remote |
| Close variants | game dev internships remote, game dev internships summer 2027, Unity internship remote, Unity developer internship remote, game design internship remote, game development bootcamp online, Unity bootcamp for beginners, learn game development, game development course for beginners |
| Intent | Students and career changers |
| Demand / competition | Internships: medium and seasonal (autocomplete already offers "summer 2027") / medium (Handshake, LinkedIn, Indeed, join.com, thehub.io). Courses: high / very high (Udemy, Coursera, GameDev.tv, Unity Learn, Reddit) |
| Can we rank? | Internship: hard from a page alone; Google's job results (JobPosting markup) are the way in once a dated, open posting exists (follow-up, section 5). Bootcamp: long tail only, "10-week online Unity bootcamp for beginners". The intern-to-Steam story (The Brave Hearts II) is the page's best proof |

### J. Publishing

| | |
|---|---|
| Primary | indie game publisher |
| Close variants | indie game publishers accepting submissions, indie game publishers list, how do I publish my game on Steam, can I publish my game on Steam for free, publish game on Nintendo Switch, how much do indie game publishers take, do I need a publisher for Steam, what does an indie game publisher do |
| Intent | Developers looking for a publisher, or learning how to self-publish |
| Demand / competition | Medium-high / high |
| Who ranks | List articles (blog.udonis.co/mobile-marketing/mobile-games/indie-game-publishers), publishers' submit pages (kwalee.com/submit-your-game, chucklefish.org/publishing-with-chucklefish/, playsaurus.com/publishing), Steamworks docs, Reddit, news posts |
| Can we rank? | Head: no. Long tail: FAQ answers ("do I need a publisher for Steam") can earn some queries. The page mainly converts developers who find The Brave Hearts II on Steam and see the publisher name |

### K. Brand and entity

| | |
|---|---|
| Primary | Luna Wolf Studios |
| Problem | Autocomplete rewrites "luna wolf studios" to **"lunar wolf studios"**, and "luna wolf" means the Warhammer 40k Luna Wolves. A web search for the brand returned ZoomInfo, village.ai, playpile.gg, and itch.io, and did not surface lunawolfstudios.com in the top results |
| Fix | Section 4, "Entity": one exact name everywhere, a full Organization node with sameAs, and the same name and URL on every profile. This is the cheapest win in the plan |

### Long-tail bets where the studio has unusual proof

1. **Unity editor tools** (now its own page, `/services/unity-editor-tools/`). "Custom Unity editor
   tools", "Unity editor extensions", "Unity tools developer for hire". Proof: Scriptable Sheets and
   the studio, both recognized at the 17th Unity Awards (official term to be verified, section 6);
   four archived Asset Store reviews; Kodeco Unity tutorials, including the ScriptableObject
   tutorial.
2. **Serious games for health and therapy.** "VR rehabilitation game developer", "healthcare game
   development studio", "VR hearing assessment". Proof: HELIX (Nemours, DBI CAT grant, pilot
   with about 30 subjects in 2023), SaeboVR, KneeBRIGHT, MOVE-IT, iCARE, Lanebreak, Flex Sledding.
3. **Unity multiplayer.** "Unity multiplayer game developer", "Photon Quantum developer". Proof:
   Sheep Tag 2, up to 32 players, Photon Quantum with prediction and rollback, US, EU, and AU servers.
4. **Delaware and Philadelphia.** "Game development company Delaware", "game studio near
   Philadelphia". Proof: founded in Newark in 2015 by Wilmington University students; the
   founders teach at Wilmington University; Haberdashery's nomination for Delaware Indie Game of
   the Year.

---

## 2. Page plan

Shared rules for every page:

- `<title>` as listed; it is unique and at most 60 characters. Brand suffix is ` | Luna Wolf
  Studios`, written the same way every time.
- One `<h1>`, as listed. H2s follow the outline; agents may reword for flow but keep the keyword.
- Meta description as listed (140 to 160 characters). If a page agent changes a fact, it
  re-counts.
- Every subpage passes `breadcrumbs` (Home > Section > Page) and emits `BreadcrumbList`.
- Every page ends with a contact call to action whose link text names the action ("Start a
  project", "Pitch your game"), never "Click here" or "Learn more".
- Copy rules from `CLAUDE.md` apply to every heading: sentence case, no hype words, no
  exclamation marks, no invented facts.
- FAQ answers are 40 to 80 words, written by the page agent from the archive. FAQPage markup is
  still valid schema.org and helps other engines and AI answers, but Google stopped showing FAQ
  rich results on May 7, 2026. Do not expect a visual result from it.

### Routes to add, merge, or treat with care

| Route | Recommendation | Reason |
|---|---|---|
| `/services/unity-editor-tools/` | **Added** (orchestrator decision) | The weakest SERP of all the vendor terms, and the strongest proof. It owns "custom Unity editor tools", "editor extensions", and "pipeline and workflow tooling". `/services/unity-development/` now covers Unity engineering and support in general, targets hire-intent phrases, and links to the tools page in one short paragraph. Build servers and CI/CD stay on the Unity page |
| `/services/game-porting/` | Do not add now | Medium demand, strong porting specialists, and the only Switch proof is the studio's own games. Keep as an H2 on game development |
| A Delaware or Philadelphia landing page | **Do not add** | It would be a thin doorway page. The local signal belongs on home, about, contact, and in the Organization address |
| `/sheep-tag-2/` | Keep, but write it as a short "game we built" page | sheeptag2.com must keep ranking for "Sheep Tag 2". Point the VideoGame `url` at sheeptag2.com and do not reuse its text |
| `/newsletter/` | Keep; noindex only if it ends up a bare form | Thin pages do not hurt much, but they dilute the sitemap |
| `/privacy-policy/` | Keep indexed | Required page; links from the footer |
| `/games/` | Keep; label each card own, published, or client | The hub is where client contributions get credit without claiming them as ours |
| Old attachment URLs (29) | Redirect (section 4) | WordPress attachment pages such as `/lws_512x512/` and `/haberdashery_pc_.../` are in the old image sitemap and are likely indexed |

### Recommended section order for every service page

1. **Hero.** H1, one sentence on what we build and for whom, primary button (Start a project),
   secondary link (See our work). A one-line proof row right under it: three or four client or
   project names, or "recognized at the 17th Unity Awards" where it fits.
2. **What we build.** Four to six cards. Each card names a real project, never a generic icon
   and a verb.
3. **Featured projects.** Two or three short case blocks: the problem, what we built, what
   happened, with a link to the project page. Only archive facts.
4. **The specialty.** One deeper section that only this studio can write (editor tools,
   multiplayer, health, publishing).
5. **How a project works.** Four or five steps (talk, prototype or plan, build in milestones,
   test and release, support). Keep it short and true to how the studio works.
6. **Ways to work with us.** Only after the owner confirms the engagement models (full project,
   co-development or team extension, consulting). No prices unless the owner supplies them.
7. **Who you'll work with.** The founders with one line each and links to their pages.
8. **Clients and partners.** Logo strip from the archive's "Our Trusted Pack" with real alt
   text, and a quote from "Our Howling Reviews", exactly as archived with its source link. The
   archive has one client review (Sqe187 on Freelancer.com, "By far the best freelancer I've ever
   encountered", which names no project) and four Asset Store reviews of Scriptable Sheets; press
   quotes about Lanebreak fit the serious games page. Ask past clients for more.
9. **FAQ.** Five to seven questions, as planned below.
10. **Closing call to action.** What to send us (goal, platform, timeline, budget range if
    known), the email address, and the form.
11. **Related services.** Two or three links to sibling service pages.

**Target length:** 1,200 to 1,800 words of main content for each service page; 700 to 1,000 for
the services hub; 600 to 900 for the home page; 400 to 800 for game pages. The pages that rank
run 1,400 to 3,000 words, but much of that is repeated keywords, logo walls, and duplicated
blocks (section 3). A tighter page with named projects is a better trade for a small studio.

### Summary table

| Route | Primary keyword | Title (chars) | H1 |
|---|---|---|---|
| `/` | game development studio | Game and software development studio \| Luna Wolf Studios (56) | Game and software development studio |
| `/services/` | game development services | Game, Unity, and VR development services \| Luna Wolf Studios (60) | Game, Unity, VR, and software development services |
| `/services/game-development/` | game development company | Game development and co-development \| Luna Wolf Studios (55) | Game development and co-development services |
| `/services/unity-development/` | Unity development company | Hire Unity developers for games and apps \| Luna Wolf Studios (60) | Unity development services |
| `/services/unity-editor-tools/` | custom Unity editor tools | Custom Unity editor tools and extensions \| Luna Wolf Studios (60) | Custom Unity editor tools and extensions |
| `/services/vr-ar-development/` | VR development company | VR and AR app development studio \| Luna Wolf Studios (52) | VR and AR app development |
| `/services/serious-games/` | serious game development | Serious games for health and education \| Luna Wolf Studios (58) | Serious game development for health, education, and training |
| `/services/software-development/` | custom software development company | Custom software and web app development \| Luna Wolf Studios (59) | Custom software and web app development |
| `/games/` | Luna Wolf Studios games | Our games and projects \| Luna Wolf Studios (42) | Our games and projects |
| `/scriptable-sheets/` | Scriptable Sheets | Scriptable Sheets: edit ScriptableObjects in a spreadsheet (58) | Scriptable Sheets: a spreadsheet editor for Unity ScriptableObjects |
| `/sheep-tag-2/` | Sheep Tag 2 | Sheep Tag 2, our online multiplayer game \| Luna Wolf Studios (60) | Sheep Tag 2: Sheep vs. Wolves for up to 32 players |
| `/hypno-halo/` | Hypno Halo | Hypno Halo: minimalist score attack game \| Luna Wolf Studios (60) | Hypno Halo |
| `/paralily/` | ParaLily | ParaLily: a precision puzzle platformer \| Luna Wolf Studios (59) | ParaLily |
| `/the-brave-hearts-ii-false-skies/` | The Brave Hearts II: False Skies | The Brave Hearts II: False Skies \| Luna Wolf Studios (52) | The Brave Hearts II: False Skies |
| `/helix/` | VR hearing assessment | HELIX: a VR hearing assessment game \| Luna Wolf Studios (55) | HELIX: a VR hearing assessment for auditory processing disorder |
| `/haberdashery/` | Haberdashery game | Haberdashery, a sheep endless runner \| Luna Wolf Studios (56) | Haberdashery |
| `/target-crack/` | Target Crack game | Target Crack: tap-to-crack arcade game \| Luna Wolf Studios (58) | Target Crack |
| `/about/` | Luna Wolf Studios | About Luna Wolf Studios, a Delaware game studio (47) | About Luna Wolf Studios |
| `/about-jeff/` | Jeff Luna Wolf Studios | Jeff, co-founder and Unity engineer \| Luna Wolf Studios (55) | Jeff, co-founder of Luna Wolf Studios |
| `/about-jeremy/` | Jeremy Bregermann | Jeremy Bregermann, lead game designer \| Luna Wolf Studios (57) | Jeremy Bregermann, co-founder and lead game designer |
| `/about-olivia/` | Olivia Luna Wolf Studios | Olivia, co-founder and backend engineer \| Luna Wolf Studios (59) | Olivia, co-founder of Luna Wolf Studios |
| `/publishing/` | indie game publisher | Indie game publisher open to pitches \| Luna Wolf Studios (56) | Indie game publishing: pitch us your game |
| `/bootcamp/` | remote game development internship | Remote game dev internship and bootcamp \| Luna Wolf Studios (59) | Remote game development internship and bootcamp |
| `/contact/` | contact Luna Wolf Studios | Contact Luna Wolf Studios: start a project (42) | Contact Luna Wolf Studios |
| `/newsletter/` | Luna Wolf Studios newsletter | Luna Wolf Studios newsletter (28) | Get the Luna Wolf Studios newsletter |
| `/presskit/` | Luna Wolf Studios press kit | Press kit: logos and studio facts \| Luna Wolf Studios (53) | Luna Wolf Studios press kit |
| `/privacy-policy/` | Luna Wolf Studios privacy policy | Privacy policy \| Luna Wolf Studios (34) | Privacy policy |

### `/`

- **Primary keyword:** game development studio
- **Secondary:** game development company, game and software development studio, Unity development studio, VR development studio, serious games developer, game studio Delaware
- **Title (56):** Game and software development studio | Luna Wolf Studios
- **Description (153):** Luna Wolf Studios builds games, Unity tools, VR apps, and custom software for clients and ships its own games. An independent studio in Newark, Delaware.
- **H1:** Game and software development studio
- **H2 outline:** What we build for clients / Our own games and tools / Projects we've built with partners / What clients and players say / Our trusted pack / Awards and recognition / Publishing and teaching / Start a project
- **Internal links:** `/services/`, `/services/game-development/`, `/services/unity-development/`, `/services/unity-editor-tools/`, `/services/vr-ar-development/`, `/services/serious-games/`, `/services/software-development/`, `/scriptable-sheets/`, `/sheep-tag-2/`, `/hypno-halo/`, `/helix/`, `/publishing/`, `/bootcamp/`, `/about/`, `/contact/`
- **Schema:** Organization (full node, @id https://lunawolfstudios.com/#organization); WebSite (@id https://lunawolfstudios.com/#website, publisher -> Organization); WebPage
- **Notes:** Lead with the offer, not the mood: one line under the H1 such as 'We build games, Unity tools, VR apps, and software for clients, and we ship our own.' Keep 'Luna Wolf Studios' and 'Newark, Delaware' in visible text above the fold. In 'Awards and recognition', say Scriptable Sheets and the studio were 'recognized at the 17th Unity Awards' until the official term is verified, plus the Haberdashery nominations. 'What clients and players say' uses the archived 'Our Howling Reviews' quotes exactly, with source and link: the Freelancer.com client review first, then one Asset Store review and one press quote. 600 to 900 words.

### `/services/`

- **Primary keyword:** game development services
- **Secondary:** hire game developers, Unity development services, AR/VR app development, serious game development, custom software development, game development company USA
- **Title (60):** Game, Unity, and VR development services | Luna Wolf Studios
- **Description (145):** Hire Luna Wolf Studios to design and build games, Unity tools, VR and AR apps, serious games for health and education, and web or cloud software.
- **H1:** Game, Unity, VR, and software development services
- **H2 outline:** What we build / Who we work with: studios, health teams, schools, and businesses / Projects that prove it / What clients say / How a project works / Ways to work with us / Questions clients ask / Tell us about your project
- **Internal links:** `/services/game-development/`, `/services/unity-development/`, `/services/unity-editor-tools/`, `/services/vr-ar-development/`, `/services/serious-games/`, `/services/software-development/`, `/helix/`, `/scriptable-sheets/`, `/sheep-tag-2/`, `/about/`, `/contact/`
- **Schema:** WebPage (CollectionPage); ItemList of the six Service nodes; Service x6 (provider -> Organization @id); BreadcrumbList; FAQPage (understanding only; no Google rich result since May 2026)
- **Notes:** Hub, 700 to 1,000 words. One card per service with a named project on each card; Unity development and Unity editor tools are separate cards with separate one-line pitches (engineering vs. tools). 'What clients say' carries the Freelancer.com review from the archive, quoted exactly. 'Ways to work with us' only after the owner confirms the engagement models.
- **FAQ:**
  - *What does Luna Wolf Studios build for clients?* List the six service lines in one sentence and name one shipped project for each (Sheep Tag 2, Unity CI/CD and streaming work, Scriptable Sheets, HELIX, SaeboVR or Lanebreak, the web apps).
  - *How much does it cost to hire a game development studio?* Say cost depends on scope, platforms, and team size and that we quote after a first call; publish no figures unless the owner supplies them.
  - *Do you work with small teams and first-time clients?* Owner decision; if yes, point to the indie and education work (Legends of Learning, intern projects, The Brave Hearts II) as evidence.
  - *Can you join a project that is already in progress?* Yes for Unity projects, as co-development; cite contract work on existing games such as Cell to Singularity and Citytopia as contributions, not as our own titles.
  - *Where are you based, and do you work remotely?* Newark, Delaware, USA; the team works remotely (the internship and bootcamp are remote); state in-person availability only if the owner confirms it.

### `/services/game-development/`

- **Primary keyword:** game development company
- **Secondary:** game co-development studio, indie game development studio for hire, multiplayer game development, port game to Nintendo Switch, Steam release support, hire game developers
- **Title (55):** Game development and co-development | Luna Wolf Studios
- **Description (151):** We design, build, and ship PC, console, and online multiplayer games, or join your team as a co-development partner. Our games are on Steam and Switch.
- **H1:** Game development and co-development services
- **H2 outline:** Games we build for you: prototypes, full games, and updates / Co-development: we join your team and your pipeline / Online multiplayer, from netcode to servers / Releasing on Steam and Nintendo Switch / Games we've worked on / What clients say / How a game project runs / Questions about hiring a game studio / Start your game
- **Internal links:** `/services/unity-editor-tools/`, `/sheep-tag-2/`, `/hypno-halo/`, `/paralily/`, `/the-brave-hearts-ii-false-skies/`, `/games/`, `/services/unity-development/`, `/publishing/`, `/about-jeremy/`, `/contact/`
- **Schema:** Service (serviceType 'Video game development', provider -> Organization, areaServed Worldwide); BreadcrumbList; FAQPage (understanding only)
- **Notes:** Head term 'game development company' is dominated by large outsourcers; the page wins on long-tail: 'indie game co-development studio', 'Unity multiplayer game developer', 'Steam release help'. Label client titles (Cell to Singularity, Citytopia, Travelers Refrain, Lanebreak) as games we contributed to; they are not ours. 'What clients say' uses the Freelancer.com review by Sqe187, quoted exactly with a link to freelancer.com/u/LunaWolfStudios.html. The review does not name a project, so do not attach it to one.
- **FAQ:**
  - *How much does it cost to hire a game development studio?* Explain the cost drivers (scope, platforms, art, multiplayer) and that we quote per project after a call; no invented ranges.
  - *What is the difference between co-development and outsourcing?* Co-development means our developers work inside your repo, tools, and schedule; outsourcing hands off a defined piece. Say which the studio offers (owner to confirm).
  - *Can you build an online multiplayer game?* Yes: Sheep Tag 2 supports up to 32 players online on Photon Quantum with prediction and rollback, US, EU, and AU servers, and bots.
  - *Can you help release our game on Steam?* Yes: we released Hypno Halo on Steam and handled Steam integration, achievements, Steam Cloud, and release QA for The Brave Hearts II as its publisher.
  - *Can you port our game to Nintendo Switch?* We have released our own games (Hypno Halo, ParaLily) on Nintendo Switch; say porting a client game is case by case and needs the client's platform access; add the Nintendo trademark note.
  - *Which engines do you use?* Unity and C# first; Jeremy also works in Unreal Engine 5 and C++ (about-jeremy). Do not claim Godot or others.
  - *Who owns the code and the game when the project ends?* Owner decision; state the studio's actual contract position or leave this question out.

### `/services/unity-development/`

- **Primary keyword:** Unity development company
- **Secondary:** hire Unity developers, Unity developers for hire, Unity game developer for hire, Unity multiplayer development, Unity CI/CD pipeline, Unity WebRTC streaming
- **Title (60):** Hire Unity developers for games and apps | Luna Wolf Studios
- **Description (153):** Hire Unity developers for gameplay, multiplayer, VR, and mobile, plus CI/CD, cloud streaming, upgrades, and updates after launch. Over a decade in Unity.
- **H1:** Unity development services
- **H2 outline:** What we build in Unity / Joining your existing Unity project / Multiplayer and networking in Unity / VR, AR, and mobile builds / Build automation, CI/CD, and cloud streaming / Upgrades, optimization, and post-release support / Questions about hiring Unity developers / Talk to a Unity developer
- **Internal links:** `/services/unity-editor-tools/`, `/sheep-tag-2/`, `/services/vr-ar-development/`, `/services/game-development/`, `/about-jeff/`, `/about-jeremy/`, `/bootcamp/`, `/contact/`
- **Schema:** Service (serviceType 'Unity development', provider -> Organization); BreadcrumbList; FAQPage (understanding only)
- **Notes:** Covers Unity engineering and support in general and targets hire-intent phrases. It must not target 'custom Unity editor tools', 'editor extensions', or 'pipeline tooling': mention tools in one short paragraph inside 'What we build in Unity' that links to /services/unity-editor-tools/ with the anchor 'custom Unity editor tools'. 'Over a decade in Unity' rests on Jeff's 'over a decade' and Jeremy's 'over 11 years' with Unity as his primary engine (founder pages). Head terms are agency territory; the long tail is 'Unity multiplayer developer', 'Unity developer for VR health apps'.
- **FAQ:**
  - *Can we hire Unity developers to join our team?* Owner decision on team extension; if offered, say how (part time or full time, remote, US time zones).
  - *Which Unity versions and render pipelines do you work with?* Name only what the team uses (archive: Unity 6, URP, Shader Graph); do not list every version.
  - *Can you speed up our Unity builds and releases?* Yes: Jeff built containerized infrastructure and CI/CD pipelines that automated Unity builds across web, mobile, and VR (about-jeff).
  - *Can a Unity app run in a browser without a download?* Yes: we have streamed interactive Unity 3D simulations over low-bandwidth networks with AWS and WebRTC; do not name the client.
  - *Can you upgrade or optimize an older Unity project?* Yes: Jeremy's work covers optimization and post-release support, and Haberdashery is being modernized on current Unity (about-jeremy); give no speed-up numbers.
  - *Do you also build custom editor tools?* One sentence: yes, it is a separate service; link to /services/unity-editor-tools/ and do not repeat that page's content here.
  - *Do you also work in Unreal Engine?* Yes, Jeremy works in Unreal Engine 5 and teaches it; keep Unity as the lead specialty.

### `/services/unity-editor-tools/`

- **Primary keyword:** custom Unity editor tools
- **Secondary:** Unity editor extensions, Unity editor tool development, Unity tools programmer for hire, Unity pipeline and workflow tools, custom Unity inspectors and editor windows, Unity asset import pipeline
- **Title (60):** Custom Unity editor tools and extensions | Luna Wolf Studios
- **Description (160):** We build custom Unity editor tools, extensions, and pipeline tooling that save your team time. Makers of Scriptable Sheets, recognized at the 17th Unity Awards.
- **H1:** Custom Unity editor tools and extensions
- **H2 outline:** Tools we build: editor windows, inspectors, and data editors / Pipeline and workflow tooling: importers, validators, and editor automation / Scriptable Sheets, our own tool on the Unity Asset Store / What developers say about our tools / How a tool project works / Questions about custom Unity tools / Tell us what slows your team down
- **Internal links:** `/scriptable-sheets/`, `/services/unity-development/`, `/services/game-development/`, `/about-jeff/`, `/about-jeremy/`, `/contact/`
- **Schema:** Service (serviceType 'Unity editor tool development', provider -> Organization); BreadcrumbList; FAQPage (understanding only)
- **Notes:** Owns 'custom Unity editor tools', 'Unity editor extensions', and 'pipeline and workflow tooling' (tools that run inside the editor). Build servers and CI/CD stay on /services/unity-development/; link there for them. The SERP for these is Fiverr gigs and Unity docs, with no studio pages. Proof order: Scriptable Sheets (Asset Store; say 'recognized at the 17th Unity Awards' until the official term is verified), the four archived Asset Store reviews quoted exactly (Quevanto, Katerlad, deleo, RestingOwl) with the link to the listing's reviews, Jeff's Kodeco ScriptableObject tutorial, and the PS1 importer R&D (a research project, not a product). Do not add Review markup for Asset Store reviews (Google does not allow reviews copied from other sites). 1,000 to 1,500 words.
- **FAQ:**
  - *What is a custom Unity editor tool?* Code that runs inside the Unity Editor (windows, inspectors, menu items, importers) so a team does repeated work faster; it does not ship in the game build, as Scriptable Sheets' listing notes for itself.
  - *What kinds of editor tools can you build?* Name archive-backed examples: a spreadsheet data editor (Scriptable Sheets), an asset import pipeline with scene generation and diagnostics (Jeremy's PS1 asset importer R&D), and an in-editor bug reporter (Jeff's Trello tutorial video).
  - *Can you build tools for designers who don't code?* Yes; Scriptable Sheets lets anyone edit game data in a table, with copy and paste from Google Sheets and other flat files (Asset Store listing and forum thread).
  - *Can you extend or fix a tool our team already built?* Owner decision; if yes, say we start by reading the existing code and agreeing what to keep.
  - *Will the tool work with our Unity version?* We build for the version the client uses; cite only versions the team confirms, and Scriptable Sheets' supported versions from its live listing.
  - *What do we get at handover?* Describe what the studio delivers (source, docs, a walkthrough); Scriptable Sheets ships with documentation on GitHub and a video walkthrough as the model. Owner confirms.
  - *Who owns the source code of a custom tool?* Owner decision; state the studio's contract position or leave this question out.

### `/services/vr-ar-development/`

- **Primary keyword:** VR development company
- **Secondary:** AR/VR app development, Meta Quest app development, VR training simulation development, medical VR development, Unity VR developer, mixed reality development
- **Title (52):** VR and AR app development studio | Luna Wolf Studios
- **Description (154):** We build VR and AR apps in Unity for Meta Quest and other headsets: health assessments, therapy, training, and games, with web dashboards and secure data.
- **H1:** VR and AR app development
- **H2 outline:** What we build in VR and AR / VR for health assessment and therapy / VR training and simulation / Mixed reality and new headsets / Motion capture, EMG, and other inputs / Dashboards and data behind the headset / Questions about VR development / Plan your VR project
- **Internal links:** `/helix/`, `/services/serious-games/`, `/services/unity-development/`, `/services/software-development/`, `/about-jeff/`, `/about-jeremy/`, `/contact/`
- **Schema:** Service (serviceType 'VR and AR app development', provider -> Organization); BreadcrumbList; FAQPage (understanding only)
- **Notes:** Several VR credits (Asurion, SMU, Syneos) are Jeremy's contract work outside the studio (about-jeremy says 'In addition to my work at Luna Wolf Studios'). Present them as 'our founders have built', not as studio clients.
- **FAQ:**
  - *Which VR headsets do you develop for?* Name only archive-backed hardware: Meta Quest 2 (HELIX, Asurion training, SMU mixed reality) and Apple Vision Pro shader work (Syneos); say others on request.
  - *How long does it take to make a VR app?* Describe phases (prototype, pilot, release) and that timing depends on scope; give no invented durations.
  - *Can VR be used for medical assessment or therapy?* Yes: HELIX gamifies hearing tests for auditory processing disorder and had a pilot study with about 30 subjects in 2023; SaeboVR is upper-extremity therapy software.
  - *Can a VR app send results to a web dashboard?* Yes: HELIX encrypts and uploads results to a backend on AWS (RDS, S3, EC2) and shows them in a provider web dashboard.
  - *How do you protect patient data in a VR app?* Describe HELIX: encryption in transit and storage on HIPAA-compliant AWS services, as the archive words it; do not claim certification or audits.
  - *Do you build AR apps for phones and tablets?* Keep modest: the founders have AR and mixed reality experience (about-jeremy); name a shipped AR project only if the owner supplies one.

### `/services/serious-games/`

- **Primary keyword:** serious game development
- **Secondary:** serious games developer, healthcare game development, VR rehabilitation games, educational game development company, gamification development, fitness game development
- **Title (58):** Serious games for health and education | Luna Wolf Studios
- **Description (155):** We design and build serious games for therapy, fitness, assessment, and learning, working with clinicians and researchers. Work includes HELIX and SaeboVR.
- **H1:** Serious game development for health, education, and training
- **H2 outline:** What a serious game is / Games for therapy and rehabilitation / Games for assessment: HELIX / Fitness games / Educational games / Working with clinicians, researchers, and grant teams / Questions about serious games / Start a serious game
- **Internal links:** `/helix/`, `/services/vr-ar-development/`, `/services/software-development/`, `/about-jeff/`, `/games/`, `/contact/`
- **Schema:** Service (serviceType 'Serious game development', provider -> Organization); BreadcrumbList; FAQPage (understanding only)
- **Notes:** The studio's strongest proof. Keep Jeff's 'FDA-approved treatments' sentence only as he wrote it, without tying it to a named product. Barron Associates project pages are public and can be linked. Under 'Fitness games', the archived press quotes about Lanebreak (PCMag, Engadget, The Verge) can be quoted exactly with source links; make clear they review Peloton's product and state our role only as the owner confirms it.
- **FAQ:**
  - *What is a serious game?* A game made mainly to teach, train, assess, or treat rather than only to entertain; one sentence, then link to examples.
  - *Can video games help with physical therapy?* Point to the therapy software built with Barron Associates (SaeboVR, KneeBRIGHT, MOVE-IT) and Flex Sledding for the mTrigger; avoid clinical outcome claims beyond the archive.
  - *Can you work with our clinical or research team?* Yes: HELIX was built with audiologists and Nemours Children's Health and funded by a DBI CAT grant; Barron Associates projects were research-led.
  - *Can the game track progress for clinicians or teachers?* Yes: HELIX's dashboard tracks results over time, and Jeff's systems helped clinicians track patient progress remotely (about-jeff).
  - *Do you make educational games for schools?* Yes: Lab Rat for Legends of Learning, plus NeuroSPARKS and EMPATHIE with Barron Associates.
  - *Can a serious game use motion tracking or other controllers?* Yes: we have integrated motion capture, electromyography, and other alternative controls (about-jeff).
  - *Do you build fitness games?* Yes: Jeff worked on Peloton's Lanebreak; describe our role only as the owner confirms it.

### `/services/software-development/`

- **Primary keyword:** custom software development company
- **Secondary:** web app development, Node.js backend development, NestJS development company, legacy system modernization, cloud migration services, AWS backend development
- **Title (59):** Custom software and web app development | Luna Wolf Studios
- **Description (152):** We build web apps, APIs, and cloud backends in Node.js, TypeScript, and NestJS, and move legacy systems to modern platforms. Games are not all we build.
- **H1:** Custom software and web app development
- **H2 outline:** What we build: web apps, APIs, dashboards, and tools / Backend and cloud engineering / Modernizing legacy systems / Dashboards for games, devices, and health apps / Web apps we've shipped / Our stack / Questions about custom software / Describe your project
- **Internal links:** `/about-olivia/`, `/helix/`, `/services/unity-development/`, `/services/vr-ar-development/`, `/about-jeff/`, `/contact/`
- **Schema:** Service (serviceType 'Custom software development', provider -> Organization); BreadcrumbList; FAQPage (understanding only)
- **Notes:** Olivia's enterprise work (finance, logistics, sports media, utilities, education) was for employers, not studio clients; say 'our team has built' and name no companies. Head term is unwinnable; target 'NestJS development', 'Node.js backend', 'legacy modernization' long tail.
- **FAQ:**
  - *Do you build software that isn't a game?* Yes: web apps (Anatomy of Play, FishWatch, Reel Gains, Fresh Catch), the HELIX dashboard and backend, and enterprise backend work by Olivia.
  - *Which languages and frameworks do you use?* Node.js, TypeScript, NestJS, Go, Python, SQL, cloud infrastructure as code, plus C# and Unity; Swift from earlier iOS work (about-olivia).
  - *Can you modernize or migrate an old system?* Yes: Olivia's work covers legacy rewrites, on-prem to cloud migrations, and platform upgrades on systems processing millions of records daily.
  - *Can you build a web dashboard for our app or device?* Yes: HELIX's web dashboard has accounts, assignments, calendars, and charts for providers and patients.
  - *Do you maintain software after launch?* Owner decision; state the support offer only if the studio provides one.
  - *Do you work with small businesses?* Owner decision; answer with the kinds of clients the studio wants.

### `/games/`

- **Primary keyword:** Luna Wolf Studios games
- **Secondary:** indie games made in Delaware, Sheep Tag 2, Hypno Halo, ParaLily, games published by Luna Wolf Studios
- **Title (42):** Our games and projects | Luna Wolf Studios
- **Description (149):** Games from Luna Wolf Studios: Sheep Tag 2, Hypno Halo, ParaLily, and The Brave Hearts II, plus projects with Peloton, Barron Associates, and Nemours.
- **H1:** Our games and projects
- **H2 outline:** Our games / Games we publish / Projects with clients and partners / Health and research projects / Game jams and intern games / Play more on itch.io and Newgrounds / Want a game like these?
- **Internal links:** `/sheep-tag-2/`, `/hypno-halo/`, `/paralily/`, `/the-brave-hearts-ii-false-skies/`, `/haberdashery/`, `/target-crack/`, `/helix/`, `/bootcamp/`, `/publishing/`, `/services/game-development/`, `/contact/`
- **Schema:** CollectionPage; ItemList of VideoGame (each item url -> its page); BreadcrumbList
- **Notes:** Separate the studio's own games, the games it publishes, and client contributions, with a label on each card (Kitfox and Finji do not, and lose clarity). Archived quotes usable here: Catherine Dellosa's Pocket Gamer line on Cell to Singularity (archive spells the name 'Cathering'; check the source before printing). Two quotes do not say which game they review (Zach at Everything Action, linked to a 2017 'Gamebox 2.0' article, and an anonymous MAGFest MIVS judge); confirm the game with the owner before using them.

### `/scriptable-sheets/`

- **Primary keyword:** Scriptable Sheets
- **Secondary:** Unity ScriptableObject editor, ScriptableObject spreadsheet, edit ScriptableObjects in a table, Unity data table editor, bulk edit ScriptableObjects, Unity spreadsheet editor
- **Title (58):** Scriptable Sheets: edit ScriptableObjects in a spreadsheet
- **Description (156):** Scriptable Sheets is a Unity editor tool that lists ScriptableObjects and other assets in a spreadsheet so you can sort, edit, copy, and paste them in bulk.
- **H1:** Scriptable Sheets: a spreadsheet editor for Unity ScriptableObjects
- **H2 outline:** What Scriptable Sheets does / Features / Copy and paste from Google Sheets, CSV, and more / Video walkthrough / Recognized at the 17th Unity Awards / What developers say / Documentation and support / Get Scriptable Sheets on the Unity Asset Store / Need a custom Unity tool?
- **Internal links:** `/services/unity-editor-tools/`, `/services/unity-development/`, `/about-jeff/`, `/contact/`, `/newsletter/`
- **Schema:** SoftwareApplication (applicationCategory DeveloperApplication, operatingSystem 'Windows, macOS, Linux (Unity Editor)', offers USD price, publisher -> Organization); aggregateRating only if the page shows the live Asset Store rating and count; VideoObject (walkthrough r_FJBZjHUpA); BreadcrumbList
- **Notes:** Take version support, price, and features from the live Asset Store listing at build time (it shows 1.11.0, released Jul 2, 2026; 34 ratings; price changes during sales). Keep the price out of static copy or source it from src/data. Autocomplete shows 'scriptable sheets unity free download', so this page should rank above piracy sites for the brand term. 'What developers say' uses the four Asset Store reviews archived in 'Our Howling Reviews', quoted exactly with the reviewer name and the listing link; show them as quotes, not as Review markup. 'Need a custom Unity tool?' links to /services/unity-editor-tools/.

### `/sheep-tag-2/`

- **Primary keyword:** Sheep Tag 2
- **Secondary:** Sheep Tag 2 Steam, Sheep Tag standalone game, Warcraft III Sheep Tag, Sheep vs. Wolves multiplayer, Photon Quantum game
- **Title (60):** Sheep Tag 2, our online multiplayer game | Luna Wolf Studios
- **Description (156):** Sheep Tag 2 is our free-to-play Sheep vs. Wolves strategy game for up to 32 players online, built in Unity on Photon Quantum. Early Access on Steam in 2027.
- **H1:** Sheep Tag 2: Sheep vs. Wolves for up to 32 players
- **H2 outline:** What Sheep Tag 2 is / From Warcraft III mod to standalone game / How we built the multiplayer / Level editor and Steam Workshop / Funded on Kickstarter / Wishlist on Steam and visit sheeptag2.com / Need multiplayer for your game?
- **Internal links:** `/services/game-development/`, `/services/unity-development/`, `/about-jeff/`, `/games/`, `/presskit/`, `/contact/`
- **Schema:** VideoGame (url https://www.sheeptag2.com/, sameAs Steam app 537680, author/publisher -> Organization, gamePlatform, playMode MultiPlayer, numberOfPlayers max 32); VideoObject (gameplay trailer ABIVaCo3QX4); BreadcrumbList
- **Notes:** sheeptag2.com is the game's home and must keep ranking for 'Sheep Tag 2'. Write short, original copy (do not paste the sister site's press kit text), point the VideoGame url at https://www.sheeptag2.com/, and frame the page as 'a game we built', with a link to the multiplayer service.

### `/hypno-halo/`

- **Primary keyword:** Hypno Halo
- **Secondary:** Hypno Halo Nintendo Switch, Hypno Halo Steam, minimalist score attack game, Hypno Halo review, Hypno Halo press kit
- **Title (60):** Hypno Halo: minimalist score attack game | Luna Wolf Studios
- **Description (155):** Hypno Halo is a minimalist score attack game with 300+ handcrafted levels, 90+ minutes of electronic music, and shared co-op controls. On Steam and Switch.
- **H1:** Hypno Halo
- **H2 outline:** About Hypno Halo / Features / Trailer / Screenshots / Press and reviews / Music / Logo and press assets / Get Hypno Halo on Steam and Nintendo Switch
- **Internal links:** `/games/`, `/services/game-development/`, `/presskit/`, `/contact/`
- **Schema:** VideoGame (+SoftwareApplication type if offers are added; gamePlatform PC, Nintendo Switch; sameAs Steam 3847950 and Nintendo eShop); VideoObject (trailer GiCsebs_FK4); BreadcrumbList
- **Notes:** Existing indexed URL with press links pointing to it; keep the press list and quotes exactly as archived. The home page reviews add a second curator quote (SOKOL, Steam curator) to the OFEN quote already on the archived page; use both exactly.

### `/paralily/`

- **Primary keyword:** ParaLily
- **Secondary:** ParaLily game, ParaLily Nintendo Switch, ParaLily Steam, puzzle platformer parallel universes
- **Title (59):** ParaLily: a precision puzzle platformer | Luna Wolf Studios
- **Description (153):** ParaLily is a precision and puzzle platformer about a girl's journey through parallel universes to save a friend. Available on Steam and Nintendo Switch.
- **H1:** ParaLily
- **H2 outline:** About ParaLily / Trailer and screenshots / Who made it / Get ParaLily on Steam and Nintendo Switch
- **Internal links:** `/games/`, `/services/game-development/`, `/about-jeff/`, `/contact/`
- **Schema:** VideoGame (sameAs Steam 1156760, Nintendo eShop, paralilygame.com); BreadcrumbList
- **Notes:** Facts are thin in the archive (only 'ParaLily by Luna Wolf Studios'). The game's own site credits 'Team ParaLily'. Confirm the description, platforms, and credits with the owner before writing. Do not use Jeff's surname, which appears on paralilygame.com.

### `/the-brave-hearts-ii-false-skies/`

- **Primary keyword:** The Brave Hearts II: False Skies
- **Secondary:** Brave Hearts 2 False Skies, The Brave Hearts II Steam, voice-acted top-down shoot 'em up, Connor Butler game
- **Title (52):** The Brave Hearts II: False Skies | Luna Wolf Studios
- **Description (148):** The Brave Hearts II: False Skies is a voice-acted top-down shoot 'em up by Connor Butler, who came through our internship. We published it on Steam.
- **H1:** The Brave Hearts II: False Skies
- **H2 outline:** About the game / Trailer / From our internship program to Steam: Connor Butler's game / What we did as publisher / Get it on Steam / Publish your game with us
- **Internal links:** `/publishing/`, `/bootcamp/`, `/games/`, `/about-jeremy/`, `/contact/`
- **Schema:** VideoGame (author Person 'Connor Butler', publisher -> Organization, datePublished 2026-08-27, sameAs Steam 4918650); VideoObject if a trailer is embedded; BreadcrumbList
- **Notes:** Facts from about-jeremy and the Steam page: developer Connor Butler, publisher Luna Wolf Studios, released Aug 27, 2026, Windows. The owner confirmed that Connor Butler came through the studio's student internship program; say so plainly once, without inventing the year or the intern project.

### `/helix/`

- **Primary keyword:** VR hearing assessment
- **Secondary:** HELIX VR, virtual reality hearing test, auditory processing disorder VR assessment, digits-in-noise test VR, Nemours VR hearing
- **Title (55):** HELIX: a VR hearing assessment game | Luna Wolf Studios
- **Description (154):** HELIX turns hearing tests into VR games on Meta Quest to help assess auditory processing disorder, with a web dashboard for providers. Built with Nemours.
- **H1:** HELIX: a VR hearing assessment for auditory processing disorder
- **H2 outline:** The problem with traditional hearing tests / How HELIX works / Hearing tests in VR: digits-in-noise, pure tone, and sound localization / A web dashboard for providers and patients / Secure data on AWS / Funding and pilot study / Build a health app with us
- **Internal links:** `/services/serious-games/`, `/services/vr-ar-development/`, `/services/software-development/`, `/about-jeremy/`, `/about-jeff/`, `/contact/`
- **Schema:** Article (case study; about -> HELIX as SoftwareApplication without offers); BreadcrumbList
- **Notes:** Expand the acronym once: Hearing EvaLuation using Immersive eXtended reality. 'Oculus Quest 2' is now 'Meta Quest 2'. 'Nemours' credit comes from about-jeremy ('in collaboration with Nemours Children's Hospital').

### `/haberdashery/`

- **Primary keyword:** Haberdashery game
- **Secondary:** Haberdashery endless runner, sheep hat game, Haberdashery itch.io, Haberdashery Newgrounds
- **Title (56):** Haberdashery, a sheep endless runner | Luna Wolf Studios
- **Description (148):** Haberdashery is a fast endless runner: guide a sheep past rocks, spike pits, and a dragon while you collect hat boxes, coins, and more than 30 hats.
- **H1:** Haberdashery
- **H2 outline:** About Haberdashery / Trailer and screenshots / What players and judges said / Awards and nominations / Play on PC or the web / History: GameACon, Delaware Innovation Week, and festivals
- **Internal links:** `/games/`, `/about/`, `/contact/`
- **Schema:** VideoGame (sameAs itch.io, Newgrounds, IndieDB); VideoObject (U7Wu3ZkDE7g); BreadcrumbList
- **Notes:** Nominations: Boston Festival of Indie Games (2015) and Delaware's Indie Video Game of the Year (Delaware Innovation Awards 2016, archive/blog/2017-02-05-plan-c-diw-ecrb-t2g.md, with a Technical.ly link). Quotes from 'Our Howling Reviews', exactly as archived: Vinny Parisi (IndieGameMagazine), Ruthiepee (Haberdashery iOS review), an anonymous Boston FIG judge, Jason Morano (ECRB Game Jam judge 2016), and RenfieldHarker (Newgrounds). The iOS review means there was an iOS release; say it is no longer listed unless the owner confirms it is. Produced with Geek Monster Games.

### `/target-crack/`

- **Primary keyword:** Target Crack game
- **Secondary:** tap target arcade game, speed and precision arcade game, Target Crack itch.io
- **Title (58):** Target Crack: tap-to-crack arcade game | Luna Wolf Studios
- **Description (153):** Target Crack is a speed and precision arcade game: tap targets to crack them in three game modes, earn achievements, and take on friends on leaderboards.
- **H1:** Target Crack
- **H2 outline:** About Target Crack / Trailer and screenshots / Where to play
- **Internal links:** `/games/`, `/contact/`
- **Schema:** VideoGame; VideoObject (1mg7KmJ6nwE); BreadcrumbList
- **Notes:** The archive does not say where Target Crack is available now; name a platform or store only if the owner confirms it.

### `/about/`

- **Primary keyword:** Luna Wolf Studios
- **Secondary:** about Luna Wolf Studios, game studio Newark Delaware, Delaware game development company, independent game studio founded 2015
- **Title (47):** About Luna Wolf Studios, a Delaware game studio
- **Description (153):** Luna Wolf Studios is an independent game and software studio in Newark, Delaware, founded in 2015 by three Wilmington University students. Meet the pack.
- **H1:** About Luna Wolf Studios
- **H2 outline:** Our story / What we do / The founders / Clients and partners / Awards and recognition / Teaching and community / Work with us
- **Internal links:** `/about-jeff/`, `/about-jeremy/`, `/about-olivia/`, `/services/`, `/games/`, `/bootcamp/`, `/presskit/`, `/contact/`
- **Schema:** AboutPage (about/mainEntity -> Organization @id); BreadcrumbList
- **Notes:** This page carries the local signal: Newark, Delaware; Wilmington University; founded January 2015. Do not create a separate thin 'Delaware game studio' page. 'Awards and recognition': recognized at the 17th Unity Awards (Scriptable Sheets and the studio; neutral wording until verified); Haberdashery nominated at the Boston Festival of Indie Games (2015) and for Delaware Indie Game of the Year; 1st place at the Wilmington University East Coast Reboot 48-Hour Game Jam (2015), listed on Jeremy's page, so confirm whether it was a studio team win before crediting the studio. Jeremy's 2025 Neurodiversity Employment Inclusion Excellence Award (University of Delaware) is personal; mention it in his founder card, not as a studio award. 'Teaching and community' can name the universities Jeremy teaches at.

### `/about-jeff/`

- **Primary keyword:** Jeff Luna Wolf Studios
- **Secondary:** Unity and XR engineer, serious games for health developer, Kodeco Unity tutorials, Unity cloud streaming WebRTC
- **Title (55):** Jeff, co-founder and Unity engineer | Luna Wolf Studios
- **Description (150):** Jeff co-founded Luna Wolf Studios and has spent over a decade building Unity, XR, and health games, cloud streaming platforms, and Unity editor tools.
- **H1:** Jeff, co-founder of Luna Wolf Studios
- **H2 outline:** About Jeff / Health and fitness games / Educational games / Indie games / Game jams / Web apps / Tutorials and assets / Contact
- **Internal links:** `/services/unity-editor-tools/`, `/helix/`, `/scriptable-sheets/`, `/sheep-tag-2/`, `/hypno-halo/`, `/paralily/`, `/services/unity-development/`, `/services/serious-games/`, `/about/`, `/contact/`
- **Schema:** ProfilePage (mainEntity Person: name 'Jeff', jobTitle 'Co-founder', worksFor -> Organization, sameAs LinkedIn and GitHub from the archive); BreadcrumbList
- **Notes:** Jeff goes by first name only on the site. The archived LinkedIn and GitHub links stay; they work as Person sameAs.

### `/about-jeremy/`

- **Primary keyword:** Jeremy Bregermann
- **Secondary:** game design professor, Unity and Unreal developer, Rowan of Bramblebrook, AI-assisted game development
- **Title (57):** Jeremy Bregermann, lead game designer | Luna Wolf Studios
- **Description (146):** Jeremy Bregermann is co-founder and lead game designer at Luna Wolf Studios, a Unity and Unreal developer, and a university game design professor.
- **H1:** Jeremy Bregermann, co-founder and lead game designer
- **H2 outline:** About Jeremy / Game development, engineering, and AI / Current projects and recent releases / Professional software development / University teaching and curriculum / Previous academic appointments / Additional industry experience / Awards and recognition / Portfolio / Contact
- **Internal links:** `/services/unity-editor-tools/`, `/helix/`, `/sheep-tag-2/`, `/the-brave-hearts-ii-false-skies/`, `/haberdashery/`, `/bootcamp/`, `/services/game-development/`, `/about/`, `/contact/`
- **Schema:** ProfilePage (mainEntity Person: name 'Jeremy Bregermann', jobTitle 'Co-founder and Lead Game Designer', worksFor -> Organization, award [his four listed awards and nominations], sameAs linkedin.com/in/bregermann, github.com/bregermann, bregermann.itch.io); BreadcrumbList
- **Notes:** The regenerated archive has the full page: previous appointments (Salem Community College 2019-2022, Delaware College of Art and Design 2020, Digital Media Institute 2023), additional industry experience, awards (2025 Neurodiversity Employment Inclusion Excellence Award, University of Delaware; 2015 1st place, Wilmington University East Coast Reboot 48-Hour Game Jam; 2015 Boston Festival of Indie Games nomination for Haberdashery; Delaware Indie Game of the Year nomination for Haberdashery), the full portfolio, and the contact block. Keep the portfolio as grouped lists with descriptive link text. The acting credits and tabletop games can stay on this page but do not belong on service pages.

### `/about-olivia/`

- **Primary keyword:** Olivia Luna Wolf Studios
- **Secondary:** enterprise backend engineer, Node.js NestJS engineer, platform modernization, high-throughput data systems
- **Title (59):** Olivia, co-founder and backend engineer | Luna Wolf Studios
- **Description (156):** Olivia co-founded Luna Wolf Studios and has close to a decade of enterprise backend work in Node.js, TypeScript, and NestJS, including legacy modernization.
- **H1:** Olivia, co-founder of Luna Wolf Studios
- **H2 outline:** About Olivia / Areas of work / Stack / Contact
- **Internal links:** `/services/software-development/`, `/about/`, `/contact/`
- **Schema:** ProfilePage (mainEntity Person: name 'Olivia', jobTitle 'Co-founder', worksFor -> Organization); BreadcrumbList

### `/publishing/`

- **Primary keyword:** indie game publisher
- **Secondary:** indie game publishers accepting submissions, publish my game on Steam, publish a game on Nintendo Switch, pitch your game to a publisher, what does an indie game publisher do
- **Title (56):** Indie game publisher open to pitches | Luna Wolf Studios
- **Description (155):** Building a game? Pitch it to us. We help indie developers bring games to Steam and Nintendo Switch, from demo to release. We published The Brave Hearts II.
- **H1:** Indie game publishing: pitch us your game
- **H2 outline:** What we do as a publisher / Games we've published / From intern to published developer: The Brave Hearts II / Steam and Nintendo Switch / What to send us / How we review pitches / Questions about publishing / Submit your game
- **Internal links:** `/the-brave-hearts-ii-false-skies/`, `/bootcamp/`, `/hypno-halo/`, `/paralily/`, `/services/game-development/`, `/about-jeremy/`, `/contact/`
- **Schema:** Service (serviceType 'Video game publishing', provider -> Organization); BreadcrumbList; FAQPage (understanding only)
- **Notes:** Competes with publisher list articles (Udonis, Reddit) and big indie publishers; realistic target is the brand plus 'indie publisher accepting submissions' long tail, and developers who find The Brave Hearts II on Steam.
- **FAQ:**
  - *Do I need a publisher to release my game on Steam?* No; say plainly that developers can self-publish, and list what we add (Steam setup and integration, build checks, achievements, Steam Cloud, release QA).
  - *What does an indie game publisher do?* List only the work we actually did for The Brave Hearts II and our own releases; add marketing or funding only if the owner confirms we offer it.
  - *Can you help me release my game on Nintendo Switch?* We have released our own games on Switch (Hypno Halo, ParaLily); say we work with developers toward Switch and keep the Nintendo trademark note.
  - *Does my game have to be finished before I pitch it?* No: the old page accepts demos, early builds, and finished games.
  - *What should I include in my pitch?* Point to the submission form; list its fields once the owner confirms them (build or video, platform, stage, contact).
  - *What share of revenue does a publisher take?* Owner decision; state the studio's terms or say terms are agreed per game.
  - *Do you only publish games made by your interns?* No: the submission form is open to any indie developer; The Brave Hearts II's developer, Connor Butler, came through our internship, which shows the path is real.

### `/bootcamp/`

- **Primary keyword:** remote game development internship
- **Secondary:** game dev internship remote, Unity internship remote, game development bootcamp online, Unity bootcamp for beginners, learn game development for beginners, game design internship college credit
- **Title (59):** Remote game dev internship and bootcamp | Luna Wolf Studios
- **Description (149):** Join our remote game development internship to ship a game demo with a small team, or learn Unity and C# from scratch in our 10-week online bootcamp.
- **H1:** Remote game development internship and bootcamp
- **H2 outline:** Two ways to learn with the pack / Remote internship program / Games our interns shipped / From intern to Steam release: The Brave Hearts II / What interns say / How to apply / Introductory game dev bootcamp (10 weeks, online) / What you'll learn / Who teaches / Questions about the internship and bootcamp
- **Internal links:** `/the-brave-hearts-ii-false-skies/`, `/publishing/`, `/about-jeff/`, `/about-jeremy/`, `/games/`, `/newsletter/`, `/contact/`
- **Schema:** Course (bootcamp; provider -> Organization; hasCourseInstance courseMode 'online', duration P10W); VideoObject (0uA_8o4aLjQ); BreadcrumbList; FAQPage (understanding only)
- **Notes:** No JobPosting markup for now (no dated, open posting exists); add it as a follow-up when a season opens, with datePosted and validThrough. 'Who teaches': Jeremy teaches game design at the University of Illinois Urbana-Champaign, Wilmington University, and West Virginia University, and previously at Salem Community College, Delaware College of Art and Design, and Digital Media Institute (about-jeremy). The Brave Hearts II block: Connor Butler came through the internship and the studio published his game on Steam (owner-confirmed).
- **FAQ:**
  - *Is the internship paid?* No, it is unpaid; say so up front.
  - *Can I get college credit for the internship?* Possibly, depending on your school's policy.
  - *When does the internship run?* Typically late May to mid August; past cohorts also ran in spring (RAILBOUND, Spring 2026).
  - *Do I need experience to join?* The internship suits students who have already built games; the bootcamp is for beginners, career changers, and hobbyists.
  - *What do I need for the bootcamp?* A laptop or desktop that can run Unity; one live class a week plus weekly assignments, for 10 weeks.
  - *How much does the bootcamp cost?* The archive only says a deposit reserves a spot; the owner must supply the price or the page says to email for details.

### `/contact/`

- **Primary keyword:** contact Luna Wolf Studios
- **Secondary:** hire a game development studio, game development quote, Unity development quote, start a game project
- **Title (42):** Contact Luna Wolf Studios: start a project
- **Description (149):** Tell us about your game, Unity tool, VR app, or software project. Email support@lunawolfstudios.com or use the form. We are in Newark, Delaware, USA.
- **H1:** Contact Luna Wolf Studios
- **H2 outline:** Tell us about your project / What to include / Other questions: press, publishing, internships
- **Internal links:** `/services/`, `/publishing/`, `/bootcamp/`, `/presskit/`
- **Schema:** ContactPage; Organization contactPoint (email, contactType 'sales' and 'customer support'); BreadcrumbList

### `/newsletter/`

- **Primary keyword:** Luna Wolf Studios newsletter
- **Secondary:** Sheep Tag 2 news, Scriptable Sheets updates, indie game studio newsletter
- **Title (28):** Luna Wolf Studios newsletter
- **Description (155):** Sign up for the Luna Wolf Studios newsletter for news on Sheep Tag 2, Scriptable Sheets updates, new releases, and openings in our internship and bootcamp.
- **H1:** Get the Luna Wolf Studios newsletter
- **H2 outline:** What you'll get / Sign up / Privacy
- **Internal links:** `/privacy-policy/`, `/games/`, `/scriptable-sheets/`, `/bootcamp/`
- **Schema:** WebPage; BreadcrumbList
- **Notes:** Index it only if it has the short 'what you'll get' copy; a bare form page can carry noindex.

### `/presskit/`

- **Primary keyword:** Luna Wolf Studios press kit
- **Secondary:** Luna Wolf Studios logo, Luna Wolf Studios press, studio fact sheet
- **Title (53):** Press kit: logos and studio facts | Luna Wolf Studios
- **Description (156):** Download Luna Wolf Studios logos, the wordmark font and color, and studio facts for press, plus links to press kits for Hypno Halo, Sheep Tag 2, and others.
- **H1:** Luna Wolf Studios press kit
- **H2 outline:** Fact sheet / Awards and recognition / Selected press quotes / Logos / Font and color / Game press kits / Press contact
- **Internal links:** `/hypno-halo/`, `/sheep-tag-2/`, `/about/`, `/contact/`
- **Schema:** WebPage; ImageObject for each logo (contentUrl, width, height); BreadcrumbList
- **Notes:** Awards list: recognized at the 17th Unity Awards (neutral wording until verified), Haberdashery's Boston FIG 2015 and Delaware Indie Game of the Year nominations, and the 2015 ECRB game jam win if the owner confirms it was the studio's. Press quotes come from 'Our Howling Reviews', exactly as archived, with outlet and link.

### `/privacy-policy/`

- **Primary keyword:** Luna Wolf Studios privacy policy
- **Title (34):** Privacy policy | Luna Wolf Studios
- **Description (150):** How Luna Wolf Studios collects, uses, and protects personal data on this website, in our games, and in our newsletter, and how to contact us about it.
- **H1:** Privacy policy
- **H2 outline:** Copy the archived policy's sections as they are
- **Internal links:** `/contact/`, `/newsletter/`
- **Schema:** WebPage; BreadcrumbList

---

## 3. How ranking studio sites do it

I read the service pages that came up for the main vendor queries and four studio sites. Word
counts are approximate main-content counts, excluding navigation and footer.

| Page | Query it ranks for | Shape | Words | Proof | FAQ |
|---|---|---|---|---|---|
| Juego Studios, game co-development | game co-development | Hero CTA, why us, six service H3s, fit check, pipeline and IP, portfolio, logos, case studies, six-step process, engagement-model table with price floors, FAQ, form | 2,500-3,000 | Big-brand logos (Tencent, Sony, Disney, WB), case studies, four testimonials, ISO and award badges | 12 |
| Stepico, game co-development | game co-development services | Co-development vs outsourcing comparison, six services, projects, eight "why" blocks, six-step pipeline, FAQ, form | 1,800-2,000 | Four project cards, one named testimonial, "5 star Clutch" | 5 |
| Keywords Studios, co-development | co-development | Short intro, network of 19 studios, contact, related services, client logos | 800-900 | 23 client logos, studio network | 0 |
| Side, game development services | game development services | Title only in my fetch. Side also publishes a Markdown copy of the page (`side.inc/services/game-development.md`), which then appeared in search results | n/a | n/a | n/a |
| Vention, hire Unity developers | hire Unity developers | Services, expert quote, industries, solutions, three case studies, testimonials, platforms, why us, three engagement models, three-phase process, tech stack, guides, FAQ, contact | 1,700-1,900 | Case studies with specific numbers, named testimonials, expert quote | 5 |
| Game-Ace, serious game development | serious game development | Six services, quick facts, what makes it effective, formats, cost ranges, six-step process, deliverables, one case study, logos, testimonials, FAQ | 1,400-1,600 | Logos and testimonials, none of them about serious games | 7 |
| Innowise, AR/VR app development | AR/VR app development | Business impact, partners and awards, nine services, solutions, playbook, projects, six-step process, industries | 1,500-2,000 plus repeated award walls | 40 awards (most unrelated), four of five case studies not AR/VR | yes |
| Filament Games, services | educational game development | Eleven service sections, each with "What we do / Why we do it well / Service includes" and a related game card | ~2,000 | Named clients in text, game cards linking to project pages | 0 |
| BreakAway Games, what we do | serious games developer | H1, industries, awards | ~150 | Five named awards and finalists | 0 |
| Schell Games, home | games studio for hire | H1, three service pillars, genre strip, portfolio tagged Original or Client, logos, CEO, news, CTA | ~500 unique | Big-brand logos, CEO credentials | 0 |
| Akupara Games, home | studio plus publisher | Upcoming titles, "We do it all", three pillars, contact, testimonials, partners, news | 400-500 | Three named testimonials, partner logos | 0 |
| Finji, home | indie publisher | Games grid, news, merch; "Pitches" in main nav; one-line footer identity with city | 350-400 | none | 0 |
| Kitfox Games, home | indie studio | Same card for every game: platforms, title, "Developed by", one-line tagline, trailer, press kit, newsletter | 700-800 | Developer credits | 0 |
| Playsaurus, indie game publishing | indie game publishing | Offer list, extras, funding, success stories, CTA | 800-900 | Four developer testimonials, published titles | 0 |
| Mega Cat Studios, home | studio plus publisher | Featured games, one services tagline, logo strip, newsletter twice | ~250 | Logo strip (no alt text) | 0 |

### Patterns worth copying

- **Proof next to every claim.** The strongest pages (Vention, Juego) attach a named project and a
  number to each service. Filament ends every service with a "related game" card. Our version:
  every service card names a project from the archive.
- **A comparison block that answers a real question.** Stepico and Juego both explain
  "co-development vs outsourcing" in a small table. People search that question.
- **A short numbered process.** Every vendor page has one (three to six steps). Buyers want to
  know what happens after they email.
- **Engagement models, stated plainly.** Vention's three models (dedicated team, staff
  augmentation, project) and Juego's table answer "how would this work" before the call.
- **Calls to action at the top, the middle, and the end,** each with a different, specific verb.
- **Labels that separate own work from client work.** Schell tags every portfolio item
  "Original" or "Client". Kitfox credits the developer on every card. Finji does neither, so
  visitors cannot tell what Finji made.
- **A developer-facing "Pitch your game" link in the main navigation** (Akupara, Finji). It fits
  `/publishing/`.
- **One plain sentence of identity with the city** (Finji's footer: "A collaborative game studio
  in Grand Rapids, Michigan."). Good for entity and local signals.
- **Named testimonials with role and company** (Akupara, Vention, Playsaurus).

### Patterns to avoid

- **Keyword stuffing.** Juego repeats "co-development" in every H3 ("Co-Development Support
  for..."); Stepico writes "co-development game studios" and "game co-development services
  providers"; Vention and Schell repeat keyword strips. Use the primary phrase in the title, H1,
  first paragraph, and one H2, then write naturally.
- **Unsourced numbers.** "Up to 5x faster", "cut training time by 50%", "200+ games" with no
  backing. CLAUDE.md already forbids this; the competitors show how it reads.
- **Off-topic proof.** Innowise's AR/VR page shows bitcoin and EV case studies; Game-Ace's serious
  games page shows logos from entertainment clients. Proof must match the page.
- **Duplicated blocks.** Stepico, Keywords, and Innowise render whole sections twice. On a static
  Astro site, make sure a component never prints the same content in a desktop and a mobile copy.
- **Walls of logos and badges with no context.** Forty award badges say less than one named
  project.
- **Thin service copy on a games-first site.** Mega Cat gives services one line and BreakAway one
  paragraph. Our home page has to show services in the first screen.
- **Generic link text.** "Learn more" 19 times (Keywords) and "Explore" 18 times (Filament).
- **A missing or vague H1** (Kitfox, Finji, Akupara, Schell's "Your Games Expert").

---

## 4. Technical and entity SEO checklist

### URLs, canonicals, and redirects

- [ ] `astro.config.mjs`: `site: 'https://lunawolfstudios.com'`, `trailingSlash: 'always'`,
  `build.format: 'directory'`. GitHub Pages then serves `/about/index.html` and redirects
  `/about` to `/about/` with a 301 by itself.
- [ ] Every indexable page has a self-referencing absolute canonical with the trailing slash,
  and `og:url` matches it. The sister site's `BaseLayout` already does this; copy it.
- [ ] Internal links are always written with the trailing slash, never to a redirect.
- [ ] **`www.lunawolfstudios.com` does not resolve today** (DNS returns no record). Add a `www`
  CNAME to the GitHub Pages host so that GitHub redirects `www` to the apex. Old links and people
  typing `www` currently get an error.
- [ ] Enforce HTTPS in the GitHub Pages settings.
- [ ] Redirect pages (Astro `redirects`) are instant meta refreshes. Google treats an instant
  meta refresh like a permanent redirect. Check that each generated page has
  `<meta name="robots" content="noindex">` and `<link rel="canonical">` pointing at the target,
  and keep them out of the sitemap (the sister site filters them in the sitemap integration).
- [ ] Old blog posts (all five are in the old sitemap). Suggested targets:
  `/haberdashery-at-gameacon-2016/` → `/haberdashery/`;
  `/plan-c-diw-ecrb-t2g/` → `/haberdashery/` (the post is mostly about Haberdashery and its
  nomination); `/save-samia-endless-arcade-runner/` → `/games/`; `/magfest-2017/` → `/about/`;
  `/luna-wolf-studios-summer-2017-project-update/` → `/sheep-tag-2/` (Sheep Tag is the main topic).
  `/our-blog/` and `/blog/` → `/` or `/games/`.
- [ ] WordPress attachment pages in the old image sitemap, 29 of them. Redirect so they do
  not turn into 404s on indexed URLs: the `lws_*` logo pages and `cropped-lws_512x512-jpg` →
  `/presskit/`; `haberdashery_pc_*` → `/haberdashery/`; `screenshot_2017-10-19_*` and
  `img_1199` → `/games/` (or the game they show); `jeff_headshot` → `/about-jeff/`;
  `sheep-tag-2_600x900` → `/sheep-tag-2/`; `paralily_600x900` → `/paralily/`;
  `lanebreak_600x900`, `cell-to-singularity_600x900`, `citytopia_469x704`,
  `travelers-refrain_600x900` → `/games/`. The full list is in the old
  `https://lunawolfstudios.com/image-sitemap-1.xml`.
- [ ] `/category/uncategorized/` returns 200 today → redirect to `/`. `/feed/` cannot be
  redirected on GitHub Pages; letting it 404 is fine.
- [ ] **Keep files under `/wp-content/uploads/` that others link to.** Press and stores hotlink
  press kit logos (`2025/10/LWS_2048x2048.png` and the other logo files), Hypno Halo's logo and
  icon (`2025/10/title-logo-2560x1440-1.png`, `2025/10/icon-1024x1024-1.png`), and the OG image
  (`2025/04/LWS_1024x512.jpg`). Copy those exact paths into `public/wp-content/uploads/...`.
  `archive/wordpress/media-index.json` lists every original URL, including an uploaded
  `2026/02/index.html` that may be linked from somewhere; check it with the owner.

### Sitemap and robots

- [ ] `@astrojs/sitemap` with a filter that drops redirect pages, the 404, and any noindex page.
  Set `lastmod` from a real date (content change), not the build time, or leave it out.
- [ ] The old `robots.txt` names `/sitemap.xml` and `/news-sitemap.xml`. The new robots should
  name `https://lunawolfstudios.com/sitemap-index.xml`. Also emit a copy of the index at
  `/sitemap.xml` (or a redirect page) so old references resolve.
- [ ] `robots.txt`: allow everything, AI crawlers included (decided). No per-bot rules.
- [ ] Before the DNS switch, verify a **Domain property** in Search Console (DNS TXT record), export
  the Performance report, and after launch submit the sitemap and watch Page indexing and the
  redirects for two to four weeks. Add Bing Webmaster Tools (it imports from Search Console); Bing
  feeds several AI assistants.

### Structured data

Build one graph per page in the frontmatter and give shared nodes stable `@id`s so pages
reference rather than repeat them:

- `https://lunawolfstudios.com/#organization` (Organization)
- `https://lunawolfstudios.com/#website` (WebSite)
- `https://lunawolfstudios.com/about-jeff/#person` and likewise for Jeremy and Olivia
- `https://lunawolfstudios.com/services/<slug>/#service`

**Organization (home, full; elsewhere by `@id`):** `name` "Luna Wolf Studios", `legalName`
"Luna Wolf Studios, LLC", `alternateName` "Luna Wolf Studios LLC" (the Asset Store spelling),
`url`, `logo` (square PNG, at least 112 px), `image`, `description` (one plain sentence),
`email` support@lunawolfstudios.com, `foundingDate` "2015-01", `foundingLocation` Newark,
Delaware, `address` PostalAddress with **only** `addressLocality` Newark, `addressRegion` DE,
`addressCountry` US (no street address for a home office), `areaServed` "Worldwide", `founder`
→ the three Person `@id`s, `knowsAbout` (Unity, game development, multiplayer games, virtual
reality, serious games, Unity editor tools, Node.js, NestJS, AWS), `hasOfferCatalog` → the five
Service nodes (six), `award` only once the official Unity Awards term is verified, and `sameAs`:

```
https://www.linkedin.com/company/luna-wolf-studios
https://x.com/lunawolfstudios
https://www.instagram.com/lunawolfstudios
https://facebook.com/LunaWolfStudio/
https://www.youtube.com/channel/UChazyMKvfyTFi5tgD3i_SGg
https://www.twitch.tv/lunawolfstudios
https://bsky.app/profile/lunawolfstudios.bsky.social
https://github.com/LunaWolfStudios
https://lunawolfstudios.itch.io/
https://lunawolfstudios.newgrounds.com/
https://assetstore.unity.com/publishers/29230
https://www.freelancer.com/u/LunaWolfStudios.html
```

These come from the old site's footer (every archived page), `about-jeff.md`, `games.md`, the
"Our Howling Reviews" section of `game-design-and-development.md` (the Freelancer.com profile), and
the sister site's `links.ts`. Note the Facebook handle is `LunaWolfStudio`, singular. Add a Steam
developer homepage once one exists (section on citations).

**What Google shows rich results for today, and what only helps understanding:**

| Type | Use on | Google rich result in 2026? | Notes |
|---|---|---|---|
| Organization | home (full), all pages by `@id` | No visual result, but it feeds the knowledge panel, logo, and name | Most important node on the site |
| WebSite | home | Site name in results | `name` must match the brand exactly; the sitelinks search box is gone |
| BreadcrumbList | every subpage | Yes, breadcrumb trail on mobile and desktop | Cheap and reliable |
| VideoObject | pages with a YouTube poster | Yes, video results, if the video is the main content or prominent | Needs `name`, `description`, `thumbnailUrl`, `uploadDate`, `embedUrl`; the poster-and-dialog pattern is fine because the thumbnail and embed URL are in the markup |
| SoftwareApplication | `/scriptable-sheets/` | Yes (Software app), **only** with `offers.price` plus `aggregateRating` or `review` | Use the Asset Store rating only if the page shows it with the count and the source, and update it when it changes |
| VideoGame | game pages | Same Software app result if typed `["VideoGame","SoftwareApplication"]` with offers and a rating; otherwise understanding only | Check each page in the Rich Results Test. Do not invent ratings; Steam review scores are not ours to mark up |
| ProfilePage + Person | founder pages | Profile page result is meant for creator and forum profiles; for us it helps entity understanding | `mainEntity` Person with `worksFor` → Organization, `sameAs` |
| JobPosting | **Not now** (decided); follow-up for `/bootcamp/` | Yes, Google job results | There is no dated, open internship posting to mark up. When a season opens: `datePosted`, `validThrough`, `employmentType` "INTERN", `jobLocationType` "TELECOMMUTE", `applicantLocationRequirements`, `hiringOrganization`; remove it when the season closes |
| Course | `/bootcamp/` | No. Course info results were retired in 2025; Course list needs three or more courses | Understanding only |
| Service | service pages | No | Understanding only; `provider` → Organization |
| FAQPage | service pages, publishing, bootcamp | **No.** FAQ rich results stopped appearing on May 7, 2026 | Valid schema.org; other engines and AI answers may use it. The visible FAQ is what matters |
| Article | `/helix/` and future case studies | Article enhancements (headline, image, date) | `author` → Organization or Person |
| ImageObject | `/presskit/` logos | Image metadata (license, creator) in Images | Optional |
| LocalBusiness | none | Local results come from a Business Profile, not markup | Do not use; it would invite a street address |

### Images

- [ ] File names say what is in the image: `hypno-halo-hard-level-screenshot.png`, not
  `113_HypnoHalo_Hard_1920x1080.png`. Astro hashes output names, so set descriptive names on the
  source files in `src/assets/`.
- [ ] Alt text describes the image in a sentence; logos read "Peloton logo", not "peloton.jpg".
  Decorative images get `alt=""`.
- [ ] Every image has `width` and `height`; AVIF or WebP through `astro:assets`; responsive
  `sizes`; the hero image eager with `fetchpriority="high"`, the rest lazy.
- [ ] One 1200 × 630 Open Graph image per page type at least (home, each service, each game), with
  the page's own title in it. Social previews are how service links get shared.
- [ ] No image sitemap needed; images are in the HTML.

### Internal linking

- [ ] Header: Services (with the six service pages), Games, Scriptable Sheets, Publishing, About,
  Contact. Footer: every service, every game, bootcamp, press kit, newsletter, privacy, and the
  one-line identity "An independent game and software studio in Newark, Delaware."
- [ ] Every service page links to the two or three project pages that prove it, and each project
  page links back to its services ("Need a VR app like HELIX?").
- [ ] Founder pages link to the projects they name; projects link to the founders who built them.
- [ ] Home links to all six services above the fold or in the first scroll.
- [ ] `/services/unity-development/` and `/services/unity-editor-tools/` link to each other with
  distinct anchors ("Unity development services" and "custom Unity editor tools"); every other
  page that mentions editor tools or the maker of Scriptable Sheets links to the tools page, not
  the Unity page.
- [ ] `/the-brave-hearts-ii-false-skies/`, `/publishing/`, and `/bootcamp/` link to each other
  (intern to published developer).
- [ ] Link text names the target ("VR and AR app development", "HELIX VR hearing assessment").
- [ ] `npm run lint:links` in CI catches broken links and links to redirect pages.

### Core Web Vitals

Targets at the 75th percentile, mobile: **LCP under 2.5 s (aim for under 1.5 s on a static
page), INP under 200 ms, CLS under 0.1.** The CLAUDE.md performance rules already meet these:
inline CSS, preloaded fonts, sized images, no third-party script on load, YouTube as poster only.
Two more: keep the hero image under about 150 KB, and keep the logo strip lazy and sized. Check
with PageSpeed Insights after launch; field data in Search Console appears once traffic is
enough.

### llms.txt

**Decided: publish it.** Google says it does not use `llms.txt` for Search or AI Overviews and
that the file neither helps nor hurts; other AI tools may read it. Put it in `public/llms.txt`
(plain Markdown), keep it to the facts below, and update it when a service or product changes:

```
# Luna Wolf Studios

> Independent game and software studio in Newark, Delaware, USA, founded in 2015. We build games,
> Unity tools, VR and AR apps, serious games for health and education, and custom software for
> clients, and we make our own games and tools.

## Services
- [Game development and co-development](https://lunawolfstudios.com/services/game-development/)
- [Unity development](https://lunawolfstudios.com/services/unity-development/)
- [Custom Unity editor tools](https://lunawolfstudios.com/services/unity-editor-tools/)
- [VR and AR app development](https://lunawolfstudios.com/services/vr-ar-development/)
- [Serious games for health and education](https://lunawolfstudios.com/services/serious-games/)
- [Custom software and web apps](https://lunawolfstudios.com/services/software-development/)

## Products and games
- [Scriptable Sheets](https://lunawolfstudios.com/scriptable-sheets/): Unity editor tool for ScriptableObjects
- [Sheep Tag 2](https://www.sheeptag2.com/): online multiplayer strategy game, Early Access 2027
- [Hypno Halo](https://lunawolfstudios.com/hypno-halo/): score attack game on Steam and Nintendo Switch
- [HELIX](https://lunawolfstudios.com/helix/): VR hearing assessment

## Contact
- support@lunawolfstudios.com
- [Contact page](https://lunawolfstudios.com/contact/)
```

### Google Business Profile and local citations

- **Eligibility.** Google gives a profile to a business that has a location customers can visit or
  that travels to customers. A remote studio that never meets clients in person is not clearly
  eligible, and a virtual office is explicitly not. If the founders do meet clients in person in
  the Delaware and Philadelphia area, create a **service-area profile with the home address
  hidden** (Google's own example is a plumber working from a residential address), service area
  within about two hours' drive. If not, skip the profile; the local plan still works through the
  site and citations. **Owner decision.**
- **Consistency (NAP).** Use exactly "Luna Wolf Studios" as the name (legal name "Luna Wolf
  Studios, LLC" where a legal name field exists), `https://lunawolfstudios.com/` as the URL, "Newark,
  Delaware, USA" as the location, and support@lunawolfstudios.com. Use one short description
  everywhere, for example: "Independent game and software studio in Newark, Delaware. We build
  games, Unity tools, VR apps, serious games, and custom software for clients, and make our own
  games and tools."

Where to check or create the listing (all free):

| Profile | Status found | Action |
|---|---|---|
| Unity Asset Store publisher (`/publishers/29230`) | Exists as "Luna Wolf Studios LLC" | Set website to the new URL, description to the shared one |
| Steam (developer and publisher on Hypno Halo; publisher on The Brave Hearts II) | Name is consistent; no developer homepage found | Create a Steam Developer/Publisher Homepage in Steamworks, link the website, then add it to `sameAs` |
| Nintendo eShop publisher name | Hypno Halo, ParaLily | Check that the name matches |
| itch.io (`lunawolfstudios.itch.io`) | Exists | Website link, description |
| Newgrounds (`lunawolfstudios.newgrounds.com`) | Linked from the old site | Website link |
| GitHub org (`github.com/LunaWolfStudios`) | Exists; hosts the Scriptable Sheets docs | Website, description, location |
| LinkedIn company (`/company/luna-wolf-studios`) | Linked from the old site | Website, the service list in "Specialties", location |
| IndieDB / ModDB company page | Hypno Halo, Haberdashery, ParaLily, and Sheep Tag 2 have game pages; company page not confirmed | Claim or create the company page and attach the games |
| Freelancer.com (`/u/LunaWolfStudios.html`) | Exists; the source of the archived client review | Website link, description |
| Crunchbase | No profile found | Create a free organization profile |
| Clutch | No profile found | Create the free profile; ask two clients for reviews. Clutch pages rank for "VR companies" and "Unity developers Philadelphia" |
| GoodFirms, DesignRush | No profile found | Free listings; both rank for "game development companies in Delaware" style queries |
| MobyGames company page | Not checked | Credits for released games |
| Kickstarter creator profile | Exists (Sheep Tag 2) | Website link |
| Social bios (X, Instagram, Facebook, YouTube, Twitch, Bluesky) | Linked from the old site | Same name, URL, one-line description |
| Wikidata | Not checked | An item with official website, founding date, location, and references (Steam, Unity Awards) helps search engines tie the name to the site. Optional |
| Local: Technical.ly Delaware | Covered the studio's events in the past (blog archive) | Pitch news (The Brave Hearts II release, Unity Awards) for a fresh article that links to the site |

---

## 5. Content gaps (follow-ups, not in the current scope)

1. **Case study pages** under a `/work/` path or as sections of the services: SaeboVR, KneeBRIGHT,
   Lanebreak, Legends of Learning, the Unity cloud streaming project, Cell to Singularity. Each
   needs the client's permission and the studio's exact role. These are what buyers read before
   they email.
2. **Scriptable Sheets documentation hub** on this domain (`/scriptable-sheets/docs/`), moved or
   mirrored from the GitHub docs. Competitors host docs on GitHub Pages; docs on the studio
   domain build topical authority for ScriptableObject queries and link to the Unity service.
3. **Unity articles** that answer what developers search: "edit ScriptableObjects in bulk",
   "import CSV into ScriptableObjects", "ScriptableObjects vs JSON for game data", "Unity CI/CD
   with GitHub Actions", "stream a Unity app to a browser with WebRTC", "what we learned building
   32-player multiplayer on Photon Quantum". This is where a blog earns links; keep it to articles
   with real engineering content.
4. **Publishing guides**: "how to release a game on Steam: our checklist" and "porting a Unity game
   to Nintendo Switch: what we learned from Hypno Halo". They match the publishing questions in
   autocomplete.
5. **JobPosting markup for the internship** once a dated, open posting exists (section 4).
6. **More client testimonials.** The archive has one client review (Freelancer.com) plus Asset
   Store and press quotes. Ask past clients for one or two sentences with permission, naming the
   project, for the service pages.
7. **Engagement and pricing page** (how projects are scoped and billed) once the owner decides.
8. **Intern showcase**: a page or card per intern game (Coppervalle Rush, RAILBOUND, On the Rocks).
   It supports both the internship and the "we ship games" story.
9. **Kodeco tutorials list** on `/about-jeff/` or a `/tutorials/` page with links. It is authority
   proof for Unity and ScriptableObject queries.
10. **Game porting service page** if the studio wants to sell porting and has a client port to
    show.

---

## 6. Claims, decisions, and open questions

### Claims checked during research

| Claim | Status | Source |
|---|---|---|
| Scriptable Sheets at the Unity Awards | **Not in the archive.** Unity's 17th Unity Awards (2025) winners post lists Scriptable Sheets under "Runner-ups" for Best Development Tool (the winner was Code Monkey Toolkit). The official term is being verified separately, so titles, descriptions, and H1s say only "recognized at the 17th Unity Awards" | https://unity.com/blog/17th-unity-awards-wrap-up-2025-winners-revealed |
| Studio at the Unity Awards | **Not in the archive.** The same post lists "Luna Wolf Studios LLC" under "Runner-ups" for Breakthrough Publisher. Same neutral wording | same page |
| Client and press quotes | 18 quotes in "Our Howling Reviews": one client review (Sqe187, Freelancer.com), four Asset Store reviews of Scriptable Sheets, Hypno Halo curator quotes (OFEN, SOKOL), Lanebreak press (PCMag, Engadget, The Verge), Cell to Singularity (Pocket Gamer), Haberdashery quotes (IndieGameMagazine, an iOS review, Boston FIG and ECRB judges, Newgrounds), and two quotes that do not name their game (Everything Action, a MAGFest MIVS judge) | `game-design-and-development.md` |
| Jeremy's awards | 2025 Neurodiversity Employment Inclusion Excellence Award (University of Delaware, personal); 2015 1st place, Wilmington University East Coast Reboot 48-Hour Game Jam (on his page; studio or personal to be confirmed); 2015 Boston Festival of Indie Games nomination and Delaware Indie Game of the Year nomination, both for Haberdashery | `about-jeremy.md` |
| Jeremy's earlier teaching | Salem Community College (2019-2022), Delaware College of Art and Design (2020), Digital Media Institute (2023) | `about-jeremy.md` |
| Connor Butler and the internship | The developer of The Brave Hearts II came through the studio's student internship program | Owner, via the orchestrator (2026-11-21) |
| Scriptable Sheets facts | Asset Store listing: publisher "Luna Wolf Studios LLC", version 1.11.0 released Jul 2, 2026, 34 ratings, $49.99 list (on sale at $24.99 on the research date) | https://assetstore.unity.com/packages/tools/utilities/scriptable-sheets-284559 |
| Haberdashery award nomination | Nominated for Delaware's Indie Video Game of the Year, Delaware Innovation Awards 2016 | `archive/blog/2017-02-05-plan-c-diw-ecrb-t2g.md` |
| The Brave Hearts II | Developer Connor Butler, publisher Luna Wolf Studios, Aug 27, 2026, Windows | `about-jeremy.md`; https://store.steampowered.com/app/4918650/ |
| Hypno Halo | Developer and publisher Luna Wolf Studios on Steam; also on Nintendo Switch | `hypno-halo.md` |
| ParaLily | Archive says only "by Luna Wolf Studios". The game site lists Steam and Nintendo Switch and credits "Team ParaLily" | https://paralilygame.com/ |
| HELIX and Nemours | "in collaboration with Nemours Children's Hospital" (about-jeremy); the brief says Nemours Children's Health | `about-jeremy.md` |

### Decisions for the orchestrator

1. **Unity Awards term.** Being verified separately. The plan uses "recognized at the 17th Unity
   Awards" in every title, description, and H1. Once the term is confirmed, body copy and the
   Organization `award` property can name it; never "winner" or "award-winning".
2. **ECRB 2015 game jam win**: studio team or Jeremy alone? It decides whether About and the press
   kit list it as a studio award.
3. **Engagement models and pricing** to show on service pages: which of full project,
   co-development or team extension, and consulting the studio offers; whether to show any price.
   Several FAQs depend on it.
4. **IP and contract position** (who owns the code), **post-launch support**, and **in-person
   availability**; each has an FAQ that is left out if undecided.
5. **Google Business Profile**: only if the studio meets clients in person (section 4).
6. **Team credits vs studio credits.** Asurion, SMU, Syneos, Emergent Worlds, Realize Design
   (Jeremy) and Olivia's enterprise employers were not studio clients. The plan presents them as
   founders' experience. Confirm that framing.
7. **Lanebreak, Cell to Singularity, Citytopia, Travelers Refrain**: confirm the studio's exact
   role so pages say "we worked on" accurately.
8. **Bootcamp price and internship dates** for 2027; needed for the FAQ (and later the JobPosting
   follow-up).
9. **`www` DNS record** and the **Search Console** export before the DNS switch.
10. **Which game two archived quotes review** (Everything Action's "going deeper in Inception" and
    the anonymous MAGFest MIVS judge), before anyone uses them.

Settled on 2026-11-21: `/services/unity-editor-tools/` is added; `llms.txt` is published and all
crawlers are allowed; no JobPosting markup for now; Connor Butler came through the internship.

### Facts the page agents will find missing

- Only one client testimonial, and it names no project (Freelancer.com review).
- No ParaLily or Target Crack platform and release details in the archive.
- No bootcamp price.
- No list of AR (phone or tablet) projects.

---

## Sources

Search results and pages read on 2026-11-21.

Ranking pages analyzed:
- https://www.keywordsstudios.com/en/services/create/game-development/co-development/
- https://www.juegostudio.com/game-development-services/game-co-development
- https://stepico.com/services/game-co-development/
- https://side.inc/services/game-development
- https://ventionteams.com/skills/unity
- https://game-ace.com/serious-game-development/
- https://innowise.com/services/ar-vr-development/
- https://www.filamentgames.com/services
- https://breakawaygames.com/what-we-do
- https://schellgames.com/
- https://akuparagames.com
- https://finji.co/
- https://kitfoxgames.com/
- https://playsaurus.com/publishing
- https://megacatstudios.com/

Other results cited in the keyword map:
- https://www.toptal.com/unity, https://www.upwork.com/hire/unity-3d-developers/, https://x-team.com/technologies/hire-unity-developers, https://www.mindinventory.com/hire-unity-developers/, https://www.yudiz.com/hire-unity-developers/
- https://fiverr.com/rafaelgrativald/do-your-custom-unity-editor-tools, https://docs.unity.com/en-us/engine/current/manual/extending-the-editor/using-custom-editor-tools
- https://clutch.co/developers/virtual-reality, https://www.scnsoft.com/healthcare/virtual-reality, https://unity.com/resources/virtamed, https://unity.com/resources/lucid-reality-labs
- https://www.healthysimulation.com/top-serious-games/, https://shu.ac.uk/centre-culture-media-society/impact-vr, https://arborxr.com/content-creator/avrwell
- https://juegostudio.com/educational-game-development, https://stepico.com/educational-games, https://ilogos.biz/educational-game-development/
- https://technical.ly/startups/log-off-twitter-and-try-these-delaware-made-video-games.md, https://builtin.com/companies/location/na/usa/de/type/gaming-companies, https://superbcompanies.com/categories/game-development-companies-in-delaware/, https://www.hyperlinkinfosystem.com/game-development-company-delaware, https://clutch.co/developers/unity/philadelphia
- https://assetstore.unity.com/packages/tools/utilities/scriptable-sheets-284559, https://discussions.unity.com/t/released-scriptable-sheets/1490189, https://assetstore.unity.com/packages/tools/utilities/rowsmith-scriptableobject-spreadsheet-editor-405186, https://ragendom69.github.io/dataforge/documentation.html, https://discussions.unity.com/t/game-data-workbench-core-spreadsheet-style-editor-with-computed-columns-bulk-ops-and-cross-schema-search/1717051
- https://www.blog.udonis.co/mobile-marketing/mobile-games/indie-game-publishers, https://www.kwalee.com/submit-your-game, https://chucklefish.org/publishing-with-chucklefish/
- https://unity.com/solutions/nintendo-switch, https://www.gamedeveloper.com/business/donut-county-quick-porting-from-pc-to-nintendo-switch
- https://join.com/companies/smokestab/14358184-internship-unity-gameplay-developer-remote-unpaid, https://thehub.io/jobs/664eed4094a3b57bc7eb3d80
- https://playpile.gg/publishers/luna-wolf-studios, https://village.ai/company/luna-wolf-studios, https://www.zoominfo.com/c/luna-wolf-studios-llc/403200255

Google documentation and reporting:
- https://developers.google.com/search/docs/appearance/structured-data/search-gallery
- https://developers.google.com/search/blog/2025/06/simplifying-search-results
- https://www.seroundtable.com/google-drops-faq-rich-results-41298.html (FAQ rich results end, May 7, 2026)
- https://searchengineland.com/google-says-llms-txt-files-wont-harm-or-help-your-search-rankings-480264
- https://support.google.com/business/answer/3038177 (Business Profile eligibility)
- https://unity.com/blog/17th-unity-awards-wrap-up-2025-winners-revealed

Autocomplete: Google's public suggest endpoint (`suggestqueries.google.com`, `hl=en`, `gl=us`),
about 100 seed phrases; raw output is not kept in the repo.

Live site checks: `https://lunawolfstudios.com/` head tags, `robots.txt`, `sitemap.xml`,
`sitemap-1.xml`, `image-sitemap-1.xml`; `www.lunawolfstudios.com` DNS lookup.
