# Launch runbook

How to take lunawolfstudios.com from the WordPress site on HostGator to this site on GitHub
Pages. The domain is registered at Squarespace Domains, and that is where every DNS change
below is made. Facts and sources behind each step are in
[`archive/research/platform-decisions.md`](../archive/research/platform-decisions.md)
(checked 21 November 2026).

Work through the sections in order. Nothing before "Cutover" changes what visitors see.

## What must not change

Leave these DNS records exactly as they are. Email and the other sites depend on them.

| Record | Why |
|---|---|
| `MX` records (`aspmx.l.google.com` and its alternates) | Google Workspace mail |
| `TXT` at `@`: `v=spf1 include:_spf.google.com ~all` | Mail sender policy |
| `TXT` at `google._domainkey` | Mail signing |
| `CNAME` `games` → `lunawolfstudios.github.io` | games.lunawolfstudios.com |
| `CNAME` `tools` → `lunawolfstudios.github.io` | tools.lunawolfstudios.com |

Add no wildcard records.

## 1. Accounts and IDs (any time)

The site works without these. Until they are set, newsletter signups arrive by email at
support@lunawolfstudios.com and no analytics script loads.

### Newsletter: Kit

1. Create a free account at <https://kit.com>. Set the sender name to "Luna Wolf Studios" and
   the sender address to one on the domain, then confirm it from that inbox.
2. In Kit's email settings, enter the studio's mailing address or choose Kit's substitute
   address. Every marketing email must carry one.
3. Create an inline form named "Website newsletter". In its settings:
   - Keep the confirmation email on (double opt-in).
   - After subscribing, redirect to an external page:
     `https://lunawolfstudios.com/newsletter/?subscribed=1`
   - Turn off "Send subscriber data to thank you page".
   - After confirming, redirect to `https://lunawolfstudios.com/newsletter/?confirmed=1`
4. Open the form's Embed tab and choose HTML. Find the form ID: the number in
   `https://app.kit.com/forms/<ID>/subscriptions`.
5. In [`src/data/site.ts`](../src/data/site.ts), set `FORMS.newsletter.provider` to `"kit"`
   and `kitFormId` to that number. If the embed has hidden `<input>` fields, copy each name
   and value into `hiddenFields`. Commit and push.
6. In Kit's sending settings, verify the domain `lunawolfstudios.com` and add the CNAME
   records Kit shows you in Squarespace (DNS > DNS Settings > Custom Records). Do not edit
   the SPF or MX records.
7. If the domain has no DMARC record yet, add one in Squarespace: type `TXT`, name `_dmarc`,
   value `v=DMARC1; p=none; rua=mailto:support@lunawolfstudios.com`.

### Analytics: pick one

Both are cookieless and load only after the page has finished loading. Neither needs a
cookie banner.

- **GoatCounter** (free, hosted in the EU). Create a site at <https://www.goatcounter.com>,
  choose a code such as `lunawolfstudios`, then in `src/data/site.ts` set
  `ANALYTICS.provider` to `"goatcounter"` and `goatcounterCode` to the code.
- **Metricool** (what sheeptag2.com uses). It needs a web slot on your plan for a Luna Wolf
  Studios brand; the free plan has one, which Sheep Tag 2 may already use. Connect the
  website to that brand, then set `ANALYTICS.provider` to `"metricool"` and `metricoolHash`
  to the brand's tracker hash. Do not reuse the Sheep Tag 2 hash.

Whichever you choose, check that the "Analytics" section of the privacy policy
(`src/pages/privacy-policy.astro`) names it.

### Anatomy of Play: publish its embed build

The home page, the serious games page, and Jeff's page show the Anatomy of Play body map as
a picture with a button; pressing it loads the app in a frame from
`tools.lunawolfstudios.com/anatomy-of-play/?embed=1` (`src/components/AnatomyOfPlay.astro`).
The app lives in the `web-tools` repository. Its working tree holds a build that knows
`?embed=1`: it skips the landing screen, gives the labels more room in a short window, and
lets the hotspots be used from the keyboard. Commit and push that build before, or soon
after, this site goes up.

Until then the frame still works: it opens on the app's own landing screen ("Enter
Experience") instead of the map.

## 2. Preview on GitHub (any time)

No domain or DNS work is needed for this.

1. **Turn on Pages.** Repository > Settings > Pages > Build and deployment > Source:
   **GitHub Actions**. Leave Custom domain empty. Do this before the first deploy: the
   workflow asks Pages for the site's address and fails if Pages is off. (If a deploy ran
   first and failed at "Read the GitHub Pages address", turn Pages on and re-run it.)
2. **Deploy.** Merge to `main`. The "Deploy site" workflow builds, checks links, and
   publishes.
3. **Open and share** <https://lunawolfstudios.github.io/WebsiteLunaWolfStudios/>. Every push
   to `main` updates it.

With no custom domain, GitHub Pages serves the site under the repository name. The workflow
reads that address (`actions/configure-pages`) and builds a preview for it: the same pages,
with every link and asset moved under `/WebsiteLunaWolfStudios/`. There is nothing to switch
on or off. It looks and works like the real site, with these differences:

- **Search engines are told to stay away.** Every page is `noindex` and has no canonical
  tag, so the preview never competes with lunawolfstudios.com in search.
- **Old WordPress addresses exist only on the real domain.** On the preview they work under
  the prefix (`/WebsiteLunaWolfStudios/press/`, `/WebsiteLunaWolfStudios/?p=440`), but links
  out in the world point at lunawolfstudios.com, which is still WordPress until the cutover.
- **The address bar, shared links and link previews** show the github.io address. After the
  cutover GitHub redirects every github.io address to the same page on lunawolfstudios.com,
  so links shared during the preview keep working.
- **Forms are live.** A message sent from `/contact/` reaches support@lunawolfstudios.com.
  The first one may trigger FormSubmit's "Activate Form" email (check spam; click it). The
  newsletter form signs up for real too. If it is switched to Kit, Kit's own "after
  subscribing" redirect still points at the real domain.
- **robots.txt and the sitemap** are published under the prefix, where crawlers do not look
  for them. That is fine for a preview.

## 3. GitHub domain setup (about a week before)

1. **Verify the domain for the organization.** GitHub > LunaWolfStudios > Settings > Pages >
   Add a domain > `lunawolfstudios.com`. GitHub shows a TXT record named
   `_github-pages-challenge-lunawolfstudios`. Add it in Squarespace, wait, then press Verify.
   Leave that record in place for good. It stops anyone else from claiming the domain or its
   subdomains on GitHub Pages.
2. **Optional: a production-identical check on a subdomain.** The github.io preview is
   enough for reviewing pages. To see the exact production build, links at the root and all,
   before the cutover:
   1. Squarespace: add `CNAME`, name `new`, value `lunawolfstudios.github.io`.
   2. Repository > Settings > Pages > Custom domain: `new.lunawolfstudios.com`. Save. Then
      Actions > "Deploy site" > Run workflow, so the site is rebuilt for a domain root. Wait
      for the certificate (up to an hour), then tick **Enforce HTTPS**.
   3. Review `https://new.lunawolfstudios.com/` on a desktop and a phone, in both themes.
      While the subdomain is set, the github.io address redirects to it.

   This build is the production build: its canonical tags point at lunawolfstudios.com, so
   search engines keep indexing the real domain.

## 4. The day before

1. Squarespace: edit the `@` A record (`192.254.184.77`) and set its TTL to `300`. Its old
   TTL is four hours, so wait at least four hours before the cutover.
2. Download a full HostGator backup (files and database). In Search Console, export the
   Performance report for the old site (queries and pages, the longest range offered), so
   you can compare after the move. WordPress (Jetpack) has one email subscriber that the
   export did not include: add that address to the new newsletter list if you want to keep it.
3. Run `npm run build` and `npm run lint:links` locally. The link check must pass and must
   report no PENDING routes.

## 5. Cutover

Pick a quiet hour. Allow about an hour. For up to an hour after step 2, some visitors on
HTTPS will see a certificate warning: GitHub can only issue the certificate once DNS points
at it.

1. Repository > Settings > Pages > Custom domain: `lunawolfstudios.com` (or change
   `new.lunawolfstudios.com` to it). Save. Then Actions > "Deploy site" > **Run workflow**,
   and wait for it to finish green. This is the switch from preview to production: with a
   custom domain set, the workflow builds for the domain root, with canonical tags and every
   link on lunawolfstudios.com. Saving the domain alone does not rebuild the site, and the
   preview build does not work at a domain root. DNS still points at HostGator at this
   point, so visitors see nothing of this; the github.io address redirects to the domain from
   now on.
2. Squarespace > DNS > DNS Settings > Custom Records:

   | Type | Name | Value | TTL |
   |---|---|---|---|
   | A | `@` | `185.199.108.153` (replace `192.254.184.77`) | 300 |
   | A | `@` | `185.199.109.153` | 300 |
   | A | `@` | `185.199.110.153` | 300 |
   | A | `@` | `185.199.111.153` | 300 |
   | AAAA | `@` | `2606:50c0:8000::153` | 300 |
   | AAAA | `@` | `2606:50c0:8001::153` | 300 |
   | AAAA | `@` | `2606:50c0:8002::153` | 300 |
   | AAAA | `@` | `2606:50c0:8003::153` | 300 |
   | CNAME | `www` | `lunawolfstudios.github.io` | 300 |

   `www` has no record today, which is why `www.lunawolfstudios.com` does not load. The CNAME
   fixes that: GitHub redirects it to the apex.
3. Check the records have taken effect:

   ```powershell
   Resolve-DnsName lunawolfstudios.com -Type A
   ```

   ```powershell
   Resolve-DnsName www.lunawolfstudios.com
   ```

4. Repository > Settings > Pages: wait for "DNS check successful" and the certificate. If it
   stalls for more than a few minutes, remove the custom domain, type it again, and save.
   Then tick **Enforce HTTPS**.
5. Open `https://lunawolfstudios.com/` and `https://www.lunawolfstudios.com/` (the second
   should redirect to the first). Check a few old addresses: `/about/`, `/hypno-halo/`,
   `/press/`, `/privacy.html`, `/?p=440`.
6. Send a contact message from the live site and click FormSubmit's activation email if one
   arrives. Subscribe once to the newsletter.
7. View the source of any page: it must have a `<link rel="canonical"
   href="https://lunawolfstudios.com/...">` and no `noindex`, and no link may contain
   `/WebsiteLunaWolfStudios/`. If it still looks like the preview, run "Deploy site" again.
8. Squarespace: delete the `new` CNAME, if you made one.

## 6. After launch

1. The next day, raise the TTL on the `@` and `www` records to `3600`.
2. **Google Search Console.** Add a Domain property for `lunawolfstudios.com` (a new TXT
   record at `@`, added beside the SPF record, not merged into it). Submit
   `https://lunawolfstudios.com/sitemap-index.xml`, and remove the three WordPress sitemaps
   that no longer exist (`sitemap-1.xml`, `image-sitemap-1.xml`, `news-sitemap.xml`).
   Inspect a few old URLs, and watch Pages > "Not found (404)" for two weeks.
3. **Bing Webmaster Tools.** Import the site from Search Console and submit the same sitemap.
4. **Links elsewhere.** Addresses have not changed, so existing links keep working. Update
   the website field on Steam, the Unity Asset Store publisher page, itch.io, the social
   profiles, and the GitHub organization to `https://lunawolfstudios.com/`.
5. **HostGator** stays, with the old site on `legacy.lunawolfstudios.com` (next section).
   Before the plan is ever cancelled, remove the old Google Analytics property and
   reCAPTCHA keys, and disconnect the WordPress site from Jetpack.

## The old site: legacy.lunawolfstudios.com

The WordPress site is kept on HostGator and answers at <https://legacy.lunawolfstudios.com/>.

| Piece | Where |
|---|---|
| DNS | Squarespace: `A` `legacy` → `192.254.184.77` |
| Hosting | cPanel > Domains: `legacy.lunawolfstudios.com`, document root `public_html` (the WordPress folder). AutoSSL issues its certificate |
| WordPress | `wp-content/mu-plugins/lws-legacy-host.php`. For requests to the legacy name only, it answers with that name as the site address, rewrites links and images saved with the old address, and sends `noindex, nofollow` (header and meta tag). Delete the file to undo |

The `cpanel` and `ftp` CNAMEs point at `mail.lunawolfstudios.com`, which stays on
HostGator, so they did not follow the apex to GitHub. HostGator can no longer renew its own
certificate for `lunawolfstudios.com`; that is expected, since GitHub serves that name now.

## Rollback

1. Squarespace: delete the four GitHub `A` records and all four `AAAA` records (HostGator
   has no IPv6 address, so a leftover AAAA would keep sending some visitors to GitHub), and
   restore `A` `@` → `192.254.184.77`.
2. Delete the `www` CNAME.
3. Visitors are back on the old site once the records' TTL runs out: minutes at a TTL of
   300, up to 4 hours at Squarespace's default of 4 hours, which is what the records have.
