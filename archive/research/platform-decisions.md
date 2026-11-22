# Platform decisions: newsletter, contact form, analytics, privacy, DNS cutover, preview

Research for the lunawolfstudios.com rebuild (static Astro on GitHub Pages). All facts were
checked on **2026-11-21** against the provider's own pages unless a line says otherwise.
"UNVERIFIED" means no primary source confirmed it. Nothing was signed up for, no form was
submitted, and no email address was sent anywhere. CORS was checked with body-less `OPTIONS`
preflights from `Origin: https://example.com` against placeholder IDs, so headers on a real
`POST` with a real ID are still to be confirmed on the first live test.

Live DNS and GitHub state quoted below come from `dns.google` DNS-over-HTTPS and the GitHub
API (`gh api`), both read on 2026-11-21.

| Question | Decision |
|---|---|
| 1. Newsletter | **Kit (free plan)**, plain HTML form with a `fetch` upgrade. Runner-up: **Brevo** |
| 2. Contact form | **FormSubmit.co**, same alias as Sheep Tag 2. Plan on one new activation click |
| 3. Analytics | **GoatCounter** (hosted, free), injected after `load`. No cookie banner. Metricool only if the owner's plan already has a free website slot |
| 4. Privacy policy | Facts and outline below. Link the Sheep Tag 2 policy for game data |
| 5. DNS cutover | Verify the domain for the org, then 4 A + 4 AAAA at the apex and a `www` CNAME, at a low TTL |
| 6. Preview | Temporary custom domain `new.lunawolfstudios.com`, switched to the apex at cutover |

---

## 1. Newsletter provider

**Recommendation: Kit (free plan). Runner-up: Brevo (free plan).**

Why Kit for this site:

- **Scale on free.** Up to 10,000 subscribers and "no sending limits on any of our plans".
  Sheep Tag 2's Early Access launch in 2027 can grow the list fast. Brevo would cap sends at
  300 a day and make the owner requeue a campaign by hand each day.
- **No provider JavaScript.** Kit officially offers an "HTML" embed for "sites that don't
  support JavaScript", and its form endpoint answers CORS with `Access-Control-Allow-Origin: *`,
  so the page can show an inline message with a small `fetch`.
- **Double opt-in is on by default** on free, and both the after-submit page and the
  after-confirm page can be our own URLs.
- **No home address in emails.** CAN-SPAM needs a postal address in every email. Kit lets the
  studio use Kit's own PMB address instead.
- **No silent deletion.** Brevo deletes free accounts after 4 months without a login, with all
  data and no recovery. A studio newsletter that goes quiet between launches is exactly that
  account.

What Kit costs us: data is held in the US (Data Privacy Framework), free emails carry Kit
branding, Kit's behaviour-triggered CAPTCHA cannot be turned off (a flagged signup is sent to
a Kit challenge page), and Kit's DPA lists data-enrichment sub-processors. If EU hosting or a
leaner processor list matters more than send volume, pick Brevo; its integration notes are at
the end of this section.

### Comparison (free plans, checked 2026-11-21)

| Provider | Free subscribers / sends | Forced branding | Double opt-in | Plain HTML POST, no provider JS | CORS for `fetch` | Own redirect after no-JS submit | Spam control on endpoint | Sending domain on free | Processor, data location |
|---|---|---|---|---|---|---|---|---|---|
| **Kit** | 10,000 / no sending limits | "Built with Kit" on emails and Kit forms; removal is paid | Yes, on by default | **Yes, official** "HTML" embed: `https://app.kit.com/forms/<FORM_ID>/subscriptions`, field `email_address` | `ACAO: *`, `Accept: application/json` returns JSON | "Redirect to an external page" setting; no-JS landing UNVERIFIED | Hidden honeypot; behavioural CAPTCHA that **cannot be disabled**; optional invisible reCAPTCHA (needs JS) | Verified sending domain by CNAME; free availability UNVERIFIED (not restricted on pricing page) | Kit (US; exact entity name UNVERIFIED), US hosting, DPF |
| **Brevo** | 100,000 contacts / **300 emails a day** | "Sent with Brevo" footer | Yes ("[Recommended] Double confirmation") | **Yes, official** "Simple HTML": `https://<sub>.sibforms.com/serve/<TOKEN>`, field `EMAIL`, honeypot `email_address_check` | Origin reflected with credentials; `?isAjax=1` returns JSON | Yes, "Confirmation page after submitting the form" | Honeypot only in Simple HTML (no CAPTCHA possible there) | Required: Brevo-code TXT, 2 DKIM CNAMEs, DMARC; no SPF change | Brevo Inc. (US) with Brevo SAS (France); OVH France, Google Cloud Belgium |
| MailerLite | 250 / 2,500 a month | Logo on free | Yes, on by default | Tolerated: `https://assets.mailerlite.com/jsonp/<ACCOUNT>/forms/<FORM>/subscribe`, `fields[email]` | `ACAO: *` | "Custom success page" | Optional reCAPTCHA | Required; **SPF merge** `include:_spf.mlsend.com` | MailerLite, Inc. (Delaware) for US; Google Cloud, Netherlands |
| beehiiv | 2,500 / unlimited | Yes | Yes (toggle) | **No**, script or iframe only | Blocked (Cloudflare 403) | Yes, via its embed | UNVERIFIED | **No** custom domain on free | beehiiv Inc., New York |
| EmailOctopus | 2,500 / 10,000 a month | Yes (terms 8.3) | Yes, **off** by default | **No (officially)**, JS-only; undocumented `https://eomail<N>.com/form/<id>` endpoint, field `field_0` | `ACAO: *`, JSON | Redirect done by their JS; no-JS shows JSON | Honeypot `hp<uuid>`, optional reCAPTCHA | 4 CNAMEs + DMARC, no root SPF edit | Three Hearts Digital Ltd (UK); AWS Ireland |
| Buttondown | **100** subscribers | Footer on free | **Mandatory** | **Yes, official**: `https://buttondown.com/api/emails/embed-subscribe/<username>`, field `email`, hidden `embed=1` | `ACAO: *` but docs say **do not** use `fetch` | **No** custom redirect found | Opt-in firewall, may show CAPTCHA | Yes; root domain needs SPF merge | Buttondown, LLC (Virginia), AWS |
| Sender | 2,500 / 15,000 a month | Required on free | Yes, per form | **No**, needs `cdn.sender.net` script | `ACAO: *` (undocumented endpoint) | Done by their JS | Optional reCAPTCHA | Required SPF merge `include:sendersrv.com` + DKIM + DMARC | UAB "Sender.lt", Lithuania; EEA |
| Mailchimp | 250 contacts / 500 a month, 250 a day | Referral badge required | Yes | **Yes, official** "host your own form": `https://<dc>.list-manage.com/subscribe/post?u=..&id=..` | **No CORS** (needs JSONP or iframe) | Yes, when its JS is disabled | Optional reCAPTCHA | 2 CNAMEs + DMARC | Rocket Science Group LLC (Intuit), US |
| Loops | 1,000 / 4,000 per 30 days | "Powered by Loops" | Yes, off by default | **Yes, official**: `https://app.loops.so/api/newsletter-form/<FORM_ID>`, field `email` | `ACAO: *`, JSON | **No**; no-JS shows JSON | Per-IP rate limit only | Required, subdomain, no root SPF edit | Astrodon Corporation, US |

Notes on the table:

- A `fetch` that posts `FormData` with only an `Accept` header is a CORS "simple request", so
  no preflight is sent. It still needs `Access-Control-Allow-Origin` on the real response.
- MailerLite is the only shortlisted provider whose setup edits the existing Google SPF record.
  Kit and Brevo leave `v=spf1 include:_spf.google.com ~all` untouched.
- The domain has Google's DKIM (`google._domainkey`) and **no DMARC record** today. Every
  serious provider now asks for one. Adding `p=none` is safe for Google Workspace mail too.

### Kit details

- Free plan: "Free—up to 10,000 subscribers"; "There are no sending limits on any of our plans
  at Kit."; free excludes sequences, visual automations, RSS, "Remove Kit branding", custom
  tracking domain; API is included. <https://kit.com/pricing>
- Badge: "Built With Kit" on forms, landing pages and email templates; removal greyed out on
  Free. <https://help.kit.com/en/articles/4375211-the-built-with-kit-badge>. Our own HTML form
  carries no Kit badge because Kit does not render it.
- Double opt-in default on ("Send confirmation email" checked, "Auto-confirm" unchecked).
  <https://help.kit.com/en/articles/2971364>. After confirming, subscribers can go to our own
  URL. <https://help.kit.com/en/articles/2502655-the-confirmation-email>
- HTML embed for sites without JavaScript; must be re-copied after every form edit; form
  settings offer "Show a success message" or "Redirect the user to an external page"; leave
  "Send subscriber data to thank you page" **off** (it puts the email address in the URL).
  <https://help.kit.com/en/articles/2502640-the-kit-form-builder>
- Endpoint and field names are confirmed from Kit's own embed script
  <https://f.kit.com/ckjs/ck.5.js> (it POSTs `FormData` to `form.action` with
  `Accept: application/json` and reads `input[name='email_address']`). The help article that
  documented the `/forms/{id}/subscriptions` pattern for Webflow now returns 404. First-name
  field (`fields[first_name]`) and tag fields: UNVERIFIED, copy them from the HTML embed.
- JSON reply (from ck.5.js, not from docs): `{"status":"success", ...}` (may include
  `redirect_url`), `{"status":"quarantined","url":"<challenge URL>"}`, otherwise
  `{"errors":{"fields":[...],"messages":[...]}}`.
- CORS preflight to `https://app.kit.com/forms/1234567/subscriptions`: 200,
  `access-control-allow-origin: *`, methods `GET, POST, PUT, OPTIONS`, max-age 7200.
- CAPTCHA: "Can I disable CAPTCHA on my forms? No." It is behaviour-triggered (repeat IPs,
  same address across accounts, incognito). Honeypot: "Filling out this field will return a
  'success' message, but the email address will not be passed to Kit."
  <https://help.kit.com/en/articles/2502481-captcha-faq> (dated April 30, 2026)
- Sending domain: CNAMEs such as `ckespa` (return-path) and `cka._domainkey` (DKIM), exact
  values shown in the app; "will not interfere with your top-level domain"; Kit offers a default
  DMARC `p=none`. <https://help.kit.com/en/articles/2502558-verify-your-domain-to-optimize-your-deliverability>,
  <https://help.kit.com/en/articles/8540237-how-to-add-a-dmarc-record-to-your-verified-sending-domain>
- Unsubscribe link included by default. <https://help.kit.com/en/articles/5378154-how-to-customize-your-unsubscribe-text>
- Physical address required in all emails; Kit's substitute: 600 1st Ave, Ste 330 PMB 92768,
  Seattle, WA 98104-2246 (mail there is not forwarded).
  <https://help.kit.com/en/articles/2502494-alternatives-for-your-physical-address>
- Privacy policy (Last Updated: October 9, 2026) <https://kit.com/privacy>: Kit complies with
  the EU-U.S. and Swiss-U.S. Data Privacy Frameworks; collects IP address, device and browser
  data. DPA <https://kit.com/dpa>: subscriber data includes IP, usage, cookies, location,
  browser and device data; sub-processors all in the US, including AWS, Cloudflare, OpenAI,
  and enrichment firms BIGDBM, Influencers Club, Genderize.io.
- Export: CSV via bulk action, link expires after 5 days; columns include first name, email,
  created date and time, status, tags, location, attribution, custom fields.
  <https://help.kit.com/en/articles/2502489-how-to-export-subscribers-in-kit>
- Imported lists need proof of permission; purchased or scraped lists are prohibited.
  <https://help.kit.com/en/articles/3038130-acceptable-use-policy> (dated May 7, 2026)
- Inactive free accounts: Kit's AUP only says "We reserve the right to close an account at any
  time." No inactivity rule found (a third-party tracker cites a one-year rule; UNVERIFIED).

### Kit integration spec (for the `/newsletter/` page and any footer signup)

Data the owner supplies, kept in `src/data/` (for example `links.ts`):

```ts
newsletterFormId: "<KIT_FORM_ID>",              // digits, from Kit's HTML embed
newsletterAction: "https://app.kit.com/forms/<KIT_FORM_ID>/subscriptions",
```

HTML (works with JavaScript off):

```html
<form class="newsletter" method="post"
      action="https://app.kit.com/forms/<KIT_FORM_ID>/subscriptions"
      data-newsletter>
  <label for="nl-email">Email address</label>
  <input id="nl-email" type="email" name="email_address" autocomplete="email" required />
  <!-- Copy any hidden inputs Kit's HTML embed contains, including its honeypot input, verbatim. -->
  <!-- Our own trap: no name attribute, so it is never posted; the script checks it. -->
  <input class="visually-hidden" type="text" data-trap tabindex="-1" autocomplete="off"
         aria-hidden="true" />
  <button type="submit" class="btn">Subscribe</button>
  <p class="form-note">We send a confirmation email first. Unsubscribe any time.
    <a href="/privacy-policy/">Privacy policy</a>.</p>
  <p class="form-status" role="status" aria-live="polite" hidden></p>
</form>
```

Inline script (small, page-local, runs only on submit):

```js
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (form.querySelector("[data-trap]").value) return showSuccess();   // bot: pretend success
  setBusy(true);
  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },   // safelisted header: no preflight
    });
    const data = await res.json();
    if (data.status === "success") return showSuccess(); // "Check your inbox to confirm."
    if (data.status === "quarantined" && data.url) return location.assign(data.url); // Kit CAPTCHA
    showError(data.errors?.messages?.join(" ") || "That did not work. Try again.");
  } catch {
    form.submit();   // network or CORS failure: fall back to the plain POST
  } finally {
    setBusy(false);
  }
});
```

Responses to handle:

| Case | What Kit returns (from ck.5.js) | What the page shows |
|---|---|---|
| Accepted, confirmation email sent | `{"status":"success", ...}` | "Check your inbox and click the link to confirm." |
| Flagged by Kit | `{"status":"quarantined","url":"..."}` | Go to Kit's challenge page |
| Invalid address or other error | `{"errors":{"fields":[...],"messages":[...]}}` or HTTP error | The message, focus back on the field |
| No JavaScript | Kit follows the form's "Redirect to an external page" setting (UNVERIFIED until tested) | `/newsletter/?subscribed=1` |
| Confirmed (link in email) | Kit sends the browser to the confirmation redirect | `/newsletter/?confirmed=1` |

`?subscribed=1` and `?confirmed=1` are read by the same small inline script, the pattern
Sheep Tag 2 uses for `?submitted=1`. If the orchestrator prefers no query strings, use two
static pages instead (`/newsletter/thanks/`, `/newsletter/confirmed/`, both `noindex`).

### Owner setup for Kit (numbered, by hand)

1. Create a free Kit account. Set the sender name "Luna Wolf Studios" and a sender address on
   the domain (for example `support@lunawolfstudios.com`); confirm it from the inbox.
2. In Kit's email settings, enter the studio's mailing address, or choose Kit's substitute
   address. (Menu paths here are from Kit's help articles; the exact labels may differ.)
3. In Kit's sending settings, verify a sending domain: `lunawolfstudios.com`. Add the CNAME records Kit
   shows (named like `ckespa` and `cka._domainkey`) in Squarespace → DNS → Custom records. Do
   not change the SPF or MX records.
4. Add DMARC in Squarespace if Kit or step 3 did not: TXT, name `_dmarc`, value
   `v=DMARC1; p=none; rua=mailto:support@lunawolfstudios.com`. (Leave `p=none` for a few weeks,
   then consider `quarantine`.)
5. Grow → Landing pages & forms → create an inline form named "Website newsletter".
6. Form settings: confirmation email on (default); after subscribing, "Redirect to an external
   page" `https://lunawolfstudios.com/newsletter/?subscribed=1`; "Send subscriber data to thank
   you page" off; after confirming, redirect to
   `https://lunawolfstudios.com/newsletter/?confirmed=1`.
7. Embed → HTML. Copy the whole snippet and give it to the builder. The builder needs the form
   ID in the `action` URL and every hidden input, including Kit's honeypot field.
8. After launch, subscribe once with your own address from the live page, with and without
   JavaScript, and confirm both land on our pages.

### Brevo (runner-up) notes, if chosen instead

- Free plan: "Once we approve your account for sending, you can start sending up to 300 emails
  per day." <https://www.brevo.com/pricing/> (rendered page). A campaign to more than 300 people
  reaches 300 on the day; the rest need a manual "Requeue" each day. 100,000 contacts; "Sent
  with Brevo" sticker always on free. <https://help.brevo.com/hc/en-us/articles/208580669>
- "Free plan accounts that are not used for 4 months will be automatically deleted. All data
  will be permanently lost"; any active automation counts as activity.
  <https://help.brevo.com/hc/en-us/articles/4410311028626>
- "Simple HTML: A simplified version of HTML form code that does not require calling
  JavaScript." CAPTCHA, default confirmation pages, and success and error messages "cannot be
  included". "Confirmation page after submitting the form" can link our own page.
  <https://help.brevo.com/hc/en-us/articles/208771869> (article updated 2026-11-21)
- Form: `action="https://<sub>.sibforms.com/serve/<TOKEN>" method="POST"`, fields `EMAIL`,
  `email_address_check` (honeypot, empty), hidden `locale=en`, hidden `html_type=simple`. The
  honeypot name and AJAX behaviour come from Brevo's script
  <https://sibforms.com/forms/end-form/build/main.js>; `html_type=simple` comes only from a
  public third-party example (UNVERIFIED), so copy the generated Simple HTML.
- AJAX: POST the same `FormData` to `<action>?isAjax=1`; JSON `{success, message, redirect,
  errors:{<field>: <message>}}` (from main.js). Preflight reflected the origin with
  `allow-credentials: true`.
- Domain authentication (Brevo code TXT, DKIM, DMARC) is mandatory; no SPF change needed.
  <https://help.brevo.com/hc/en-us/articles/12163873383186>
- Processor: Brevo Inc. for US customers, Brevo SAS (Paris) as sub-processor; hosting OVH
  (France) and Google Cloud (Belgium). <https://www.brevo.com/legal/termsofuse/>,
  privacy <https://www.brevo.com/legal/privacypolicy/>. Double opt-in confirmations log date,
  time and IP. <https://help.brevo.com/hc/en-us/articles/208733449>

### Other providers' sources (checked 2026-11-21)

MailerLite <https://www.mailerlite.com/pricing>, <https://www.mailerlite.com/help/how-to-use-double-opt-in-when-collecting-subscribers>,
<https://www.mailerlite.com/help/troubleshooting-domain-authentication>, <https://www.mailerlite.com/legal/privacy-policy>,
<https://developers.mailerlite.com/docs/subscribers.html>.
beehiiv <https://www.beehiiv.com/pricing>, <https://www.beehiiv.com/support/article/12977090590487>,
<https://www.beehiiv.com/support/article/14492990172823>, <https://www.beehiiv.com/dpa>.
EmailOctopus <https://emailoctopus.com/pricing>, <https://emailoctopus.com/legal/terms>,
<https://help.emailoctopus.com/article/251-how-to-add-the-form-code-to-my-website>,
<https://help.emailoctopus.com/article/160-verifying-a-new-domain>.
Buttondown <https://buttondown.com/pricing>, <https://docs.buttondown.com/building-your-subscriber-base>,
<https://docs.buttondown.com/double-opt-in>, <https://docs.buttondown.com/firewall>,
<https://docs.buttondown.com/sending-from-a-custom-domain>.
Sender <https://www.sender.net/pricing/>, <https://sender.net/help/lead-capture/embedded-signup-form/>,
<https://www.sender.net/help/deliverability-compliance/spf-dkim-dmarc-setup/>.
Mailchimp <https://mailchimp.com/pricing/marketing/>, <https://mailchimp.com/help/host-your-own-signup-forms/>,
<https://mailchimp.com/help/about-campaign-footers/>, <https://mailchimp.com/help/set-up-email-domain-authentication/>.
Loops <https://loops.so/pricing>, <https://loops.so/docs/forms/custom-form>, <https://loops.so/docs/sending-domain>.

---

## 2. Contact form relay

**Recommendation: keep FormSubmit.co with the existing alias
`https://formsubmit.co/2fae3dfa5af1f28e5650fe157a7867ef`. Expect one new "Activate Form" email
the first time the form is used from the new domain.**

It is the only option that is free with no account and no monthly cap, needs no script, and
supports everything the Sheep Tag 2 form uses (`_next`, `_cc`, `_template`, uploads). No real
problem found. Weak points: no named legal entity, a 2019 privacy PDF, no status page, and a
few short Cloudflare 52x outages a year.

### How FormSubmit works today (checked 2026-11-21)

- **Activation.** "Submit the form once. This first-time-use will trigger an email requesting
  confirmation." <https://formsubmit.co/>. "In the event that you have multiple active forms,
  you will receive a unique deactivation link for each one." <https://formsubmit.co/help>. So
  activation is per form, not only per address. The docs never say "per domain", but several
  developers reported in Sep–Oct 2026 that activation is tied to the posting site (www and apex
  separately) and that a non-matching Referer returns "This form needs Activation."
  (<https://github.com/anamaria-didenco/barfranco/pull/39>,
  <https://github.com/shaheertiger/the-loop-social-club/pull/10>,
  <https://github.com/yb700/--latest/pull/29>). Whether the already-activated alias works from
  lunawolfstudios.com without a new click: **UNVERIFIED, assume it does not.** Submissions made
  before activation are kept and delivered once activated (<https://formsubmit.co/help>).
- **Referer.** Browsers send only the origin by default, so FormSubmit recommends a hidden
  `_url` with the full page URL. <https://formsubmit.co/help>
- **AJAX.** `POST https://formsubmit.co/ajax/<email-or-alias>`, "this even works
  cross-origin", official example sends JSON with `Accept: application/json`.
  <https://formsubmit.co/ajax-documentation>. Preflight on a placeholder returned 200,
  `Access-Control-Allow-Origin: *`, methods `GET, POST, PUT, OPTIONS`, headers
  `Content-Type, Accept, X-Requested-With, Application`. Response shape is not documented;
  third-party reports show `{"success":"true","message":"The form was submitted
  successfully."}` and `{"success":"false","message":"This form needs Activation..."}` with
  HTTP 200, so test `data.success === "true"` (UNVERIFIED from FormSubmit itself).
- **Special fields** (<https://formsubmit.co/documentation>):
  `_subject` email subject; `_honey` honeypot (a filled value silently drops the submission;
  use `type="text"` hidden by CSS, not `type="hidden"`); `_captcha=false` turns off their
  reCAPTCHA page ("We highly recommend you use the reCAPTCHA ... to avoid some technical
  limitations which we impose from time to time"); `_template` `basic` / `table` / `box`
  (<https://formsubmit.co/email-templates>); `_next` full thank-you URL (a path fails; query
  strings are fine); `_replyto` is documented by heading but its example is a field named
  `email`, which sets Reply-To, so name the visitor's address field `email`; `_cc`
  comma-separated copies; `_autoresponse` reply to the sender, which "won't work with forms
  that are disabled reCAPTCHA and forms that are submitting through AJAX"; `_blacklist`
  comma-separated phrases that drop a submission (keep under 20); `_webhook`; `_url`. Nothing
  is paid-only; there are no paid plans.
- **Limits.** "unlimited submissions from unlimited forms"; files need
  `multipart/form-data`, total 10 MB; archive API 5 calls a day. Rate limits UNVERIFIED.
- **Spam without their CAPTCHA:** honeypot, `_blacklist`, and an unspecified "intelligent spam
  prevention system". AJAX submissions never show the CAPTCHA page.
- **Stores:** "We retain your form submissions for 30 days. Uploaded files won't retain." Each
  archived record has `form_url`, `form_data`, `submitted_at`. IP storage UNVERIFIED. Privacy
  and terms are one PDF, effective January 17, 2019: <https://formsubmit.co/privacy.pdf>
  ("FormSubmit doesn't collect personally identifiable information"). Operator: Devro LABS
  (<https://devrolabs.com>); entity type and country UNVERIFIED. Contact
  support@formsubmit.co.
- **Reliability, Nov 2025 to Nov 2026:** isolated reports only. Outage comments 2025-11-12 and
  2025-12-06 (<https://updownradar.com/status/formsubmit.co>); a Cloudflare 522 on an alias
  endpoint 2026-11-03 (<https://github.com/coastal-science/call-catalog-viewer/issues/62>);
  a 521 on 2026-10-29 reported by a competitor's blog. FormSubmit itself warns its emails can
  land in spam. The common pattern is activation friction, not lost mail.

### Alternatives (checked 2026-11-21)

| Service | Free limit | Account | Uploads free | `_next`-style redirect free | Honeypot | CAPTCHA forced | Own JS needed | Operator |
|---|---|---|---|---|---|---|---|---|
| **FormSubmit** | Unlimited | No | Yes, 10 MB | Yes | `_honey` | No (`_captcha=false`) | No | Devro LABS (country UNVERIFIED) |
| Web3Forms | 250 a month | Access key | No (Pro) | Yes | `botcheck` | No | No | Web3Creative, India; AWS US-East |
| Formspree | 50 a month | Yes | No | **No** (paid) | `_gotcha` | reCAPTCHA page on by default, can disable | No | Formspree, Inc., US |
| Basin | 1 form, 50 a month | Yes | Yes, 100 MB | **No** | Custom honeypot paid | No | No | Moonshot Ventures Inc., Canada |
| Forminit (was Getform, renamed Jan 2026) | 1 form, 100 a month | Yes | Yes, 100 MB | Yes | UNVERIFIED tier | UNVERIFIED tier | No | UXPLUS LTD, UK; AWS EU |

Sources: <https://web3forms.com/pricing>, <https://docs.web3forms.com/getting-started/api-reference>,
<https://formspree.io/plans>, <https://help.formspree.io/hc/en-us/articles/360013580813>,
<https://usebasin.com/pricing>, <https://usebasin.com/privacy>, <https://forminit.com/pricing/>,
<https://forminit.com/privacy-policy/>. Web3Forms contradicts itself on retention (FAQ "We do
not store any form submissions" vs privacy policy up to 3 years).

### FormSubmit integration spec (`/contact/`)

```html
<form method="post" action="https://formsubmit.co/2fae3dfa5af1f28e5650fe157a7867ef" data-contact>
  <input type="hidden" name="_subject" value="Luna Wolf Studios: new message from the website" />
  <input type="hidden" name="_template" value="table" />
  <input type="hidden" name="_captcha" value="false" />
  <input type="hidden" name="_next" value="https://lunawolfstudios.com/contact/?sent=1" />
  <input type="hidden" name="_url" value="https://lunawolfstudios.com/contact/" />
  <input type="hidden" name="_blacklist" value="(owner's spam phrases, comma-separated)" />
  <input type="text" name="_honey" class="visually-hidden" tabindex="-1" autocomplete="off"
         aria-hidden="true" />

  <label for="c-name">Name</label>    <input id="c-name" name="name" autocomplete="name" required />
  <label for="c-email">Email</label>  <input id="c-email" type="email" name="email" autocomplete="email" required />
  <label for="c-topic">What is it about?</label>
  <select id="c-topic" name="topic">...</select>
  <label for="c-msg">Message</label>  <textarea id="c-msg" name="message" required></textarea>
  <button class="btn" type="submit">Send message</button>
  <p class="form-status" role="status" aria-live="polite" hidden></p>
</form>
```

Optional `fetch` upgrade: on submit, `POST https://formsubmit.co/ajax/2fae3dfa5af1f28e5650fe157a7867ef`
with `JSON.stringify(Object.fromEntries(new FormData(form)))`, headers
`Content-Type: application/json` and `Accept: application/json`. Show success only when
`data.success === "true"`. On anything else (including "needs Activation" or a 52x), show the
message plus "or email support@lunawolfstudios.com". Leave out `_next` from the JSON body. No
file field on this form, so JSON is fine.

The `?sent=1` success state is read by an inline script, as on Sheep Tag 2.

---

## 3. Analytics

**Recommendation: GoatCounter (hosted, free), injected after the `load` event in
`requestIdleCallback`. No cookie banner is needed for EU visitors in practice** (it stores
nothing on a visitor's device, keeps no IP, and has no visitor ID). The legal caveat is below.

Use Metricool only if the owner's Metricool plan already has a free website slot for a
Luna Wolf Studios brand. The free plan covers 1 brand and 1 website, which Sheep Tag 2 may
already use.

### Comparison (checked 2026-11-21)

| | Metricool | **GoatCounter** | Cloudflare Web Analytics | Umami Cloud Hobby |
|---|---|---|---|---|
| Cost for this site | Free plan: 1 brand, 1 web/blog; a 2nd site needs a paid plan | Free; "small-to-medium business on it is fine" | Free, 10 non-proxied sites | Free: 100K events/month, 1 site, 6-month retention |
| Script | `tracker.metricool.com/resources/be.js`, 379 bytes | `gc.zgo.at/count.js`, 9.2 KB; no-JS pixel option | `static.cloudflareinsights.com/beacon.min.js`, 31.8 KB | `cloud.umami.is/script.js`, ~4.2 KB gzip |
| Cookies / storage | None (no cookie, localStorage or sessionStorage) | No cookies; reads localStorage `skipgc`, written only if the owner opts out own visits | None | No cookies; reads localStorage `umami.disabled` |
| IP | Identifiable max 36 hours, then deleted or anonymised | Not stored; held in memory up to 8 h for unique counts | No fingerprinting by IP (Cloudflare statement) | Not stored in analytics; may appear in operational logs |
| Data location | EU | Hetzner, Finland and Germany | US company; location UNVERIFIED | US or EU, chosen at signup |
| Operator | Metricool Software, S.L., Madrid, Spain | Martin Tournoij (individual), Ireland | Cloudflare, Inc., San Francisco | Umami Software, Inc., Delaware |
| Needs DNS change | No | No | No ("without changing your DNS or using Cloudflare's proxy") | No |

Facts and sources:

- **Metricool's tracker** (read from <https://tracker.metricool.com/resources/be.js>, Last-Modified
  18 Nov 2026): one GET image beacon to `https://tracker.metricool.com/c3po.jpg` with `hash`
  (per brand), `u` (full page URL), `bw`/`bh` (viewport size), `ref` (referrer). No cookie,
  storage or fingerprinting APIs; the beacon response sets no cookie. Privacy policy section 12
  "Website Tracker" (last updated 3 Nov 2026): "The Website Tracker does not install, read or
  use cookies, localStorage or sessionStorage"; IPs "only processed in identifiable form for a
  maximum period of thirty-six (36) hours"; customer is controller, Metricool is processor;
  data stored in the EU. Entity: METRICOOL SOFTWARE, S.L., NIF B87527115, c/ Téllez 12, 28007
  Madrid. <https://metricool.com/privacy-policy/>. Each brand has its own hash ("each brand has a
  different code"): <https://help.metricool.com/i-have-connected-the-web-blog-but-no-data-appears-bevvv>,
  setup: <https://help.metricool.com/how-to-connect-your-website-or-blog-to-metricool-ejuy1>.
  Free plan "Manage 1 brand", Web/Blog 1 / 10 / 50 by plan: <https://metricool.com/pricing/>.
- **GoatCounter**: terms "Running your personal website or small-to-medium business on it is
  fine, but sending millions of pageviews/day isn't" (terms dated 16 January 2020)
  <https://www.goatcounter.com/help/terms>. Snippet
  `<script data-goatcounter="https://CODE.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>`
  <https://www.goatcounter.com/help/start>; pixel <https://www.goatcounter.com/help/pixel>.
  Privacy (8 June 2025): "GoatCounter doesn't store IP addresses, the full User-Agent header,
  or any tracker ID"; data at Hetzner in Finland and Germany; operated by Martin Tournoij,
  Ireland. <https://www.goatcounter.com/privacy>. GDPR note: <https://www.goatcounter.com/gdpr>.
  count.js sends path, referrer, title, screen width, query string, bot flag via `sendBeacon`.
- **Cloudflare Web Analytics**: <https://www.cloudflare.com/web-analytics/> ("does not use any
  client-side state, such as cookies or localStorage"),
  <https://developers.cloudflare.com/web-analytics/about/>,
  <https://developers.cloudflare.com/web-analytics/faq/> (unsampled 7 days, six months
  viewable), <https://developers.cloudflare.com/web-analytics/limits/>, privacy
  <https://www.cloudflare.com/privacypolicy/>.
- **Umami**: <https://umami.is/pricing>, <https://umami.is/terms>, <https://umami.is/privacy>,
  <https://docs.umami.is/docs/cloud/faq>.
- **GitHub Pages gives the owner no traffic data.** No server or access logs reach the site
  owner; the repo Insights traffic tab "displays traffic for your repo, not your GitHub pages
  site" (GitHub staff, <https://github.com/orgs/community/discussions/23048>; no docs page
  states it outright, UNVERIFIED in docs). GitHub itself logs visitors: "When a GitHub Pages
  site is visited, the visitor's IP address is logged and stored for security purposes,
  regardless of whether the visitor has signed into GitHub or not."
  <https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages>

### Cookie banner: plain answer

**No banner is needed for the recommended setup** (GoatCounter + FormSubmit + Kit form on our
own page + click-to-load YouTube). Nothing is written to a normal visitor's device by any of
them before the visitor acts. Caveat: the EDPB's Guidelines 2/2023 (v2, 7 Oct 2024) read
ePrivacy Art. 5(3) to cover scripts that make the browser send device information even without
cookies <https://www.edpb.europa.eu/system/files/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf>;
France's CNIL exempts compliant first-party audience measurement
<https://www.cnil.fr/fr/mesurer-la-frequentation-de-vos-sites-web-et-de-vos-applications>;
some German regulators are stricter. Low risk, common practice, not legal advice. The privacy
policy must still name GoatCounter and GitHub's IP logging.

### Integration spec

```html
<script is:inline>
  addEventListener("load", () =>
    (window.requestIdleCallback || ((f) => setTimeout(f, 1)))(() => {
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://gc.zgo.at/count.js";
      s.dataset.goatcounter = "https://<CODE>.goatcounter.com/count";
      document.body.appendChild(s);
    }),
  );
</script>
```

Put `<CODE>` in `src/data/`. If a Content-Security-Policy is added later, allow `gc.zgo.at`
and `<CODE>.goatcounter.com`. If Metricool is chosen instead, inject `be.js` the same way and
call `beTracker.t({ hash: "<NEW_BRAND_HASH>" })` in its `onload`; the Sheep Tag 2 hash
`3fac8c71469ad058538d7e1aa17b22bd` must not be reused.

---

## 4. Privacy policy inputs

### Service providers to name (checked 2026-11-21)

| Service | Provider (exact name) | What it receives and why | Policy |
|---|---|---|---|
| Hosting | GitHub, Inc. (GitHub B.V. also named as controller; Microsoft subsidiary) | Every request: IP address (logged "for security purposes"), browser headers, page requested | <https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement> (effective April 27, 2026); privacy@github.com |
| Newsletter | Kit (US; entity name UNVERIFIED, use "Kit") | Email address, first name if asked, signup and confirmation date/time, IP address, approximate location, email opens and clicks; to send the newsletter | <https://kit.com/privacy>, DPA <https://kit.com/dpa> |
| Contact form | FormSubmit (Devro LABS) | Everything typed in the form; relays it to support@ by email; keeps submissions 30 days | <https://formsubmit.co/privacy.pdf> |
| Contact replies | Google LLC (Google Workspace mail) | The email and any reply thread | <https://policies.google.com/privacy> |
| Analytics | GoatCounter (operated by Martin Tournoij, Ireland) | Page path, referrer, title, screen width, browser and OS family, approximate location; no IP stored, no cookies | <https://www.goatcounter.com/privacy> |
| Video | Google LLC (YouTube), privacy-enhanced mode, loaded only after a click | When played: IP address, device and browser data, viewing; Google says views in this mode are not used to personalize YouTube browsing or ads outside the site | <https://support.google.com/youtube/answer/171780>, <https://policies.google.com/privacy> |
| Fonts | None (self-hosted Fontsource files) | No third party | — |

Whether the `youtube-nocookie.com` player sets cookies or local storage once played is not
stated by Google (UNVERIFIED). Since it loads only on click, describe it as "when you choose to
play a video".

### Games (keep covering them)

- Old WordPress policy (`archive/wordpress/pages/privacy-policy.md`, updated April 2025)
  says: email is collected for the newsletter "or where you nominate to specifically allow our
  games to collect your email"; lists Google privacy and terms, the Unity privacy policy
  (`http://unity3d.com/legal/privacy-policy`, now <https://unity.com/legal/privacy-policy>), and
  reCAPTCHA. It cites the US Privacy Act and "NPP 6", which do not apply to a private company;
  drop them.
- Sheep Tag 2 policy (<https://sheeptag2.com/privacy/>, last updated November 8, 2026) covers:
  username; email only for PlayFab-created accounts; 2FA secrets; country and age confirmation;
  gameplay, multiplayer and telemetry data; sign-in through Steam (Valve) and Microsoft
  PlayFab; Photon (Exit Games GmbH) networking; Metricool for sheeptag2.com only; minimum age
  13 (or higher local minimum); account deletion 14 days after request; custom terrains under
  CC BY 4.0 that cannot be recalled. Its provider wording is the model for this site:
  "**Name** (Legal entity) - what it does ... Privacy Policy is available at <link>."
- New policy: a short "Our games" section saying each game may process data through its
  platforms (Steam, Unity, PlayFab, Photon), and that Sheep Tag 2 has its own policy, linked.

### Rights and contact routes (basics for a small US company)

- **GDPR** (EU/UK visitors and subscribers): access, correction, deletion, restriction,
  portability, objection, withdrawing consent, complaint to a supervisory authority. Lawful
  bases: consent (newsletter, double opt-in), legitimate interest (contact replies, aggregate
  analytics, hosting security logs).
- **CCPA**: applies to for-profit businesses with "gross annual revenue of over $25 million",
  or that buy, sell or share data of 100,000+ California residents, or earn 50%+ of revenue
  from selling it (<https://oag.ca.gov/privacy/ccpa>, updated August 28, 2026). The studio
  very likely does not qualify; the policy can still say plainly "We do not sell or share
  personal information."
- **Delaware Personal Data Privacy Act**: threshold 35,000 Delaware consumers today; an
  amendment (HB 380) reportedly lowers it to 10,000 from 1 January 2027 (secondary sources
  only, UNVERIFIED). Very likely not applicable.
- **Children**: the site is not directed at children under 13 and does not knowingly collect
  their data; a parent can ask for deletion.
- **Unsubscribe**: link in every email (Kit), or email support@.
- **Deletion and access requests**: support@lunawolfstudios.com; Kit subscriber deletion is done
  by the owner in Kit; FormSubmit copies expire after 30 days.

### Recommended outline for `/privacy-policy/`

1. Who we are (Luna Wolf Studios, LLC, Newark, Delaware; support@lunawolfstudios.com) and last
   updated date.
2. Summary in plain words: no cookies, no ads, no selling data.
3. What we collect and why: newsletter; contact form and email; analytics; hosting logs;
   videos.
4. Service providers (table above, Sheep Tag 2 wording style).
5. Our games, with a link to the Sheep Tag 2 policy.
6. Cookies and similar technologies: none set by us; YouTube only after you press play.
7. How long we keep data.
8. Your rights and how to use them (GDPR, US state law statement, unsubscribe, deletion).
9. Children's privacy.
10. International transfers (US hosting and Kit; EU analytics).
11. Changes to this policy.
12. Contact.

Keep the `/privacy/` and `/privacy.html` redirects to `/privacy-policy/` (already in
CLAUDE.md); the old policy pointed readers at `/privacy.html`.

---

## 5. DNS cutover to GitHub Pages (Squarespace Domains)

**Recommendation: verify the domain for the org first, preview on `new.lunawolfstudios.com`,
then on cutover day point the apex with 4 A + 4 AAAA records and add a `www` CNAME, with TTLs
lowered the day before.**

### Current state (read 2026-11-21)

| Name | Type | Value | TTL |
|---|---|---|---|
| `@` | NS | `ns-cloud-c1..c4.googledomains.com` | 21600 |
| `@` | A | `192.254.184.77` (HostGator WordPress) | 14400 |
| `@` | AAAA | none | — |
| `@` | MX | `1 aspmx.l.google.com`, `5 alt1/alt2`, `10 alt3/alt4` | 14400 |
| `@` | TXT | `v=spf1 include:_spf.google.com ~all` | 14400 |
| `google._domainkey` | TXT | Google Workspace DKIM | 14400 |
| `_dmarc` | TXT | none | — |
| `@` | CAA | none (so Let's Encrypt is allowed) | — |
| `www` | any | **none (NXDOMAIN)** | — |
| `games` | CNAME | `lunawolfstudios.github.io` (repo `web-games`, HTTPS enforced) | 14400 |
| `tools` | CNAME | `lunawolfstudios.github.io` (repo `web-tools`, HTTPS **not** enforced) | 14400 |
| DNSSEC | — | off (no DS record) | — |

GitHub: org `LunaWolfStudios`, free plan; repo `WebsiteLunaWolfStudios` public, Pages off.
No org-level `lunawolfstudios.github.io` repo exists. Sister site Pages: custom domain
`sheeptag2.com`, `build_type: workflow`, certificate covers `sheeptag2.com` and
`www.sheeptag2.com`, HTTPS enforced, domain **not** verified (`protected_domain_state: null`).
The old site sends no HSTS header and 301s HTTP to HTTPS.

### GitHub facts (checked 2026-11-21)

- Apex A: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`. Apex
  AAAA: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`,
  `2606:50c0:8003::153`. `www` CNAME "points directly to `<user>.github.io` or
  `<organization>.github.io` without including the repository name"; with both set "GitHub
  Pages will automatically create redirects between the domains". Add the custom domain in
  Pages settings **before** changing DNS. Avoid wildcard records.
  <https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site>
- **`CNAME` file:** "If you are publishing from a custom GitHub Actions workflow, any CNAME file
  is ignored and is not required." Set the domain in Settings → Pages only.
  <https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages>
- **Org verification:** org Settings → Pages → Add a domain → TXT record
  `_github-pages-challenge-ORGANIZATION.example.com`; "keep the TXT record in your domain's DNS
  configuration"; may take up to 24 hours; verification also protects immediate subdomains
  (so `games.` and `tools.` too).
  <https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages>
- **HTTPS:** "It can take up to an hour for your site to become available over HTTPS after you
  configure your custom domain." If provisioning stalls "several minutes after you clicked
  Save", remove the domain, retype it and save. "Enforce HTTPS" is a checkbox in Settings →
  Pages. <https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https>
- **Unavoidable gap:** GitHub can only issue the Let's Encrypt certificate after DNS points to
  it, so for minutes up to about an hour after the switch, HTTPS visitors whose resolvers
  already see GitHub get a certificate warning. Do the switch at a quiet hour with low TTLs.

### Squarespace facts (checked 2026-11-21)

- Domains dashboard → domain → **DNS** → **DNS Settings** → **Custom Records** → **Add record**
  (password or 2FA re-auth required). A records take a Name and IP; for AAAA, Name blank or
  `@`; CNAME cannot be `@`. ALIAS needs DNSSEC off (not needed here: use A/AAAA).
  <https://support.squarespace.com/hc/en-us/articles/31119879125645-DNS-records-for-web-hosting> (updated 2026-11-11)
- Edit with the pencil; delete with the red trash can. "All custom records have a 4-hour TTL
  by default"; the TTL dropdown takes a custom value in seconds. With Google Cloud DNS
  nameservers, changing one TTL on a name updates all records on that name (applies to the
  apex: A, MX and TXT would all move together; harmless). "it can take 24 to 48 hours for the
  change to your records to update."
  <https://support.squarespace.com/hc/en-us/articles/360002101888-Edit-your-domain-s-DNS-records> (updated 2026-09-24)
- Conflicts: an error offers **Replace record** (adds yours, deletes the conflicting one) or
  **Manage rules** for a conflicting forwarding rule.
  <https://support.squarespace.com/hc/en-us/articles/42180412940429-DNS-record-conflicts>
- "Squarespace defaults" are a preset that points the domain at a Squarespace site. This
  domain was migrated from Google Domains and points at HostGator through a custom A record;
  if a Squarespace defaults preset appears, leave it absent. Exact current panel contents:
  UNVERIFIED (the owner sees them when logged in).

### Cutover steps

**T-7 days or earlier (no visible change)**

1. Org verification: GitHub → org LunaWolfStudios → Settings → Pages → Add a domain →
   `lunawolfstudios.com`. Squarespace: TXT, name `_github-pages-challenge-lunawolfstudios`,
   value from GitHub. Wait, then **Verify**. Leave the record in place forever.
2. Repo `WebsiteLunaWolfStudios` → Settings → Pages → Build and deployment → Source: **GitHub
   Actions**. Merge to `main` so the deploy workflow runs.
3. Preview (section 6): Squarespace CNAME `new` → `lunawolfstudios.github.io`; Pages custom
   domain `new.lunawolfstudios.com`; wait for the certificate; tick **Enforce HTTPS**; review.

**T-1 day**

4. Squarespace: edit the apex A record (`192.254.184.77`) and set TTL to 300. Note the time;
   the old 14400 s (4 h) must expire before cutover, so wait at least 4 hours.
5. Final content checks on the preview; `npm run lint:links` green; old-URL list checked
   against the build.

**Cutover (quiet hour, about 1 hour of attention)**

6. Repo → Settings → Pages → Custom domain: replace `new.lunawolfstudios.com` with
   `lunawolfstudios.com`, Save. (The preview stops working; the live site is still on
   HostGator.)
7. Optional pre-check against GitHub without touching DNS:
   `curl -sk --resolve lunawolfstudios.com:443:185.199.108.153 https://lunawolfstudios.com/ | grep -i "<title>"`
   and `curl -s --resolve lunawolfstudios.com:80:185.199.108.153 http://lunawolfstudios.com/about/ -o /dev/null -w "%{http_code}\n"`.
   (`-k` because the certificate is not issued yet.)
8. Squarespace → DNS Settings → Custom Records:
   - Edit the `@` A record: replace `192.254.184.77` with `185.199.108.153`; add three more
     `@` A records `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (TTL 300). If the
     panel reports a conflict, use **Replace record** only on the old HostGator A record.
   - Add four `@` AAAA records: `2606:50c0:8000::153`, `2606:50c0:8001::153`,
     `2606:50c0:8002::153`, `2606:50c0:8003::153` (TTL 300).
   - Add `www` CNAME → `lunawolfstudios.github.io` (TTL 300).
9. Check: `Resolve-DnsName lunawolfstudios.com -Type A` and `-Type AAAA`,
   `Resolve-DnsName www.lunawolfstudios.com` (PowerShell), or <https://dns.google/query?name=lunawolfstudios.com>.
10. Repo → Settings → Pages: wait for "DNS check successful" and the certificate (up to an
    hour). If it stalls, Remove the domain, retype `lunawolfstudios.com`, Save. When available,
    tick **Enforce HTTPS**. Confirm `https://www.lunawolfstudios.com/` 301s to the apex.
11. Submit the contact form once from `https://lunawolfstudios.com/contact/`; click the
    FormSubmit "Activate Form" email in support@ (check spam). Subscribe once to the newsletter.
12. Delete the `new` CNAME in Squarespace.

**T+1 day**

13. Raise the TTL on the apex records and `www` back to 3600 (or the 14400 default).

### Must not be touched

MX records (Google), the SPF TXT `v=spf1 include:_spf.google.com ~all`, `google._domainkey`,
any `google-site-verification` or `.googlehosted.com` records, the `games` and `tools` CNAMEs,
and the `_github-pages-challenge-...` TXT once added. Add no wildcard records.

### Rollback

1. Squarespace: delete the four GitHub A records and the four AAAA records (HostGator has no
   IPv6; leftover AAAA records would keep sending IPv6 visitors to GitHub); restore `@` A
   `192.254.184.77`.
2. Leave or delete the `www` CNAME (with no Pages site claiming `www`, delete it).
3. Optionally remove the custom domain in repo Pages settings. Keep the org verification TXT.
4. With TTL 300, most visitors are back within minutes; caches can take up to the old TTL.

### After launch

1. **Google Search Console**: add a **Domain** property for `lunawolfstudios.com` (TXT
   `google-site-verification=...` at `@`, a new TXT next to SPF, not merged into it). Submit
   `https://lunawolfstudios.com/sitemap-index.xml`. Use URL Inspection on the old top URLs
   (from `archive/wordpress/urls.json`) and the redirected ones (`/press/`, `/privacy/`,
   `/our-blog/`, old posts). Watch Pages → "Not found (404)" for two weeks. The old WordPress
   sitemap `https://lunawolfstudios.com/sitemap.xml` answered 200 on 2026-11-21; it will 404
   after cutover, which is fine once the new sitemap is submitted.
2. **Bing Webmaster Tools**: import the site from Search Console; submit the same sitemap.
3. **Links**: the URLs stay the same, so most links keep working. Update store pages, Asset
   Store publisher page, Steam, itch.io, socials and the GitHub org `blog` field (currently
   `http://lunawolfstudios.com/`) to `https://lunawolfstudios.com/` and point to the new
   service pages where useful.
4. **Keep HostGator** paid and untouched for a 30 to 60 day rollback window. Take a full
   backup (files + database) before cancelling.
5. **Export from WordPress before cancelling**: Jetpack Newsletter subscribers (Jetpack Cloud
   → Subscribers → "⋯" → download CSV, <https://jetpack.com/support/newsletter/export-subscribers/>),
   any OptinMonster leads and any list it fed, Contact Form 7 / Flamingo messages if stored,
   media not already in `archive/`. Import only people with proof of opt-in into Kit, ideally
   tagged "imported 2026" and sent a re-confirmation.
6. **Cleanup on old services**: delete the Google Analytics property and reCAPTCHA keys for the
   old site; remove the WordPress site from Jetpack.

---

## 6. Preview before cutover

**Recommendation: a temporary Pages custom domain `new.lunawolfstudios.com`, switched to the
apex at cutover. No code change, the real build, real HTTPS.**

| Option | How | Risk |
|---|---|---|
| `lunawolfstudios.github.io/WebsiteLunaWolfStudios/` | Needs Astro `base: "/WebsiteLunaWolfStudios"` for that build only, e.g. `base: process.env.PAGES_BASE ?? "/"` in `astro.config.mjs` | **High.** Astro uses `base` for its own asset URLs and `import.meta.env.BASE_URL`, but "all of your static asset imports and URLs should add the base as a prefix" (<https://docs.astro.build/en/reference/configuration-reference/>): every hand-written `/about/` link, `public/` path, redirect page and JSON-LD URL would need the prefix. The preview would test a different build from production. It also stops working the moment any custom domain is set (github.io then 301s to it, as `web-games` does). |
| **`new.lunawolfstudios.com`** | Squarespace CNAME `new` → `lunawolfstudios.github.io`; set it as the Pages custom domain; certificate in up to an hour | **Low.** Root-relative URLs work unchanged. Canonical tags already point to the apex, which keeps search engines on the real domain. Covered by the org domain verification. Remove the record after cutover. |
| `npm run preview` only | Local `dist/` | Safe but proves nothing about Pages, HTTPS, the deploy workflow, FormSubmit activation, or Kit CORS from the real origin. |

Notes:

- The preview site will be crawlable. Do not add a build-time `noindex` switch: forgetting to
  turn it off at cutover would deindex the real site. The canonical tags plus a short preview
  window are enough; the preview URLs stop resolving to content once the custom domain moves.
- Forms on the preview: FormSubmit will likely ask for activation for the `new.` origin, and
  again for the apex at cutover. `_next` URLs point at the apex, so a no-JS test from the
  preview lands on the old WordPress `/contact/` page; test the `fetch` path there instead.

---

## Owner checklist (in order)

**Accounts and IDs (any time now)**

1. Kit: create a free account; set sender name and address; set the email footer address (studio
   address or Kit's substitute).
2. Kit: create the "Website newsletter" form; double opt-in on; after-submit redirect
   `https://lunawolfstudios.com/newsletter/?subscribed=1`; "Send subscriber data to thank you
   page" off; after-confirm redirect `https://lunawolfstudios.com/newsletter/?confirmed=1`.
3. Kit: Embed → HTML; send the snippet (form ID and hidden inputs) to the builder.
4. Kit: verify the sending domain; add its CNAMEs in Squarespace.
5. Squarespace: add DMARC TXT `_dmarc` = `v=DMARC1; p=none; rua=mailto:support@lunawolfstudios.com`
   if Kit did not add one.
6. GoatCounter: create an account and site code (for example `lunawolfstudios`); send the code
   to the builder. (If choosing Metricool instead: check the plan has a free web/blog slot;
   connect the website to a Luna Wolf Studios brand; send the new hash. Do not reuse Sheep Tag
   2's hash.)
7. Decide the mailing address for email footers (studio address, a PO box, or Kit's
   substitute) before the first send.

**GitHub and preview (about a week before launch)**

8. GitHub org Settings → Pages → Add a domain `lunawolfstudios.com`; add the
   `_github-pages-challenge-lunawolfstudios` TXT in Squarespace; Verify.
9. Repo Settings → Pages → Source: GitHub Actions. Merge to `main`.
10. Squarespace: CNAME `new` → `lunawolfstudios.github.io`. Repo Pages custom domain
    `new.lunawolfstudios.com`; wait for HTTPS; tick Enforce HTTPS.
11. Review the preview on desktop and phone; send a test contact message (click the FormSubmit
    activation email if one arrives); test a newsletter signup with your own address.

**Day before**

12. Squarespace: set the apex A record TTL to 300. Wait at least 4 hours.
13. Download a full HostGator backup (files and database). Export Jetpack subscribers and
    OptinMonster leads.

**Cutover**

14. Repo Pages custom domain → `lunawolfstudios.com`, Save.
15. Squarespace: A records `185.199.108.153`, `.109.153`, `.110.153`, `.111.153` (replacing
    `192.254.184.77`); AAAA `2606:50c0:8000::153`, `8001`, `8002`, `8003`; CNAME `www` →
    `lunawolfstudios.github.io`. Do not touch MX, SPF, DKIM, `games`, `tools`.
16. Wait for the certificate (up to an hour; Remove and re-add the domain if it stalls). Tick
    Enforce HTTPS. Check `https://www.lunawolfstudios.com/` redirects to the apex.
17. Send a contact message from the live site; click the FormSubmit activation email. Subscribe
    once to the newsletter.
18. Delete the `new` CNAME.

**After launch**

19. Next day: raise apex and `www` TTLs to 3600 or 14400.
20. Search Console: Domain property (TXT), submit `sitemap-index.xml`, inspect old URLs, watch
    404s for two weeks.
21. Bing Webmaster Tools: import from Search Console.
22. Update links: store pages, Steam, Asset Store, itch.io, socials, GitHub org website field.
23. Import consented old subscribers into Kit (tagged), optionally send a re-confirmation.
24. Keep HostGator 30 to 60 days, then cancel; remove the old Google Analytics property and
    reCAPTCHA keys.
25. Rollback if needed: restore `@` A `192.254.184.77`, delete the GitHub A and all AAAA
    records.

---

## UNVERIFIED

- Whether the existing FormSubmit alias works from lunawolfstudios.com without a new
  activation (expect it does not). FormSubmit's AJAX response shape, IP storage, rate limits,
  operator's legal entity and country.
- Kit: where a no-JavaScript POST lands (redirect setting vs Kit page); first-name, tag and
  honeypot field names (copy from the HTML embed); JSON reply shape (taken from Kit's script,
  not docs); whether a verified sending domain is on the free plan (no restriction stated);
  exact legal entity name; inactive-account rule.
- Brevo: `html_type=simple` hidden field (third-party example only); footer address rules.
- CORS headers on real POST responses with real IDs (only placeholder preflights were tested).
- Whether the Sheep Tag 2 site already uses the Metricool free plan's single website slot.
- Cloudflare Web Analytics data location; official snippet markup.
- Whether `youtube-nocookie.com` sets cookies or local storage after play.
- GitHub docs stating that Pages owners get no logs (only a GitHub staff forum reply).
- Delaware privacy law amendment HB 380 thresholds (secondary sources only).
- Exact Squarespace panel contents for this domain (presets, forwarding rules, the existing A
  record's form) and whether the "same TTL on a name" rule applies to `googledomains.com`
  nameservers.

## Side finding for the orchestrator

Sheep Tag 2's Pages custom domain is the apex `sheeptag2.com` (www 301s to it), but its Astro
`site` is `https://www.sheeptag2.com` and its pages print
`<link rel="canonical" href="https://www.sheeptag2.com/">`. Canonicals point at a URL that
redirects. Not in scope here; this site must use the apex in both `site` and the Pages setting.
