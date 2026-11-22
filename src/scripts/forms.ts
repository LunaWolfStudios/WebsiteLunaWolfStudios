/**
 * Progressive enhancement for the contact and newsletter forms.
 *
 * Without JavaScript both forms are ordinary HTML forms that POST to the relay (FormSubmit's
 * plain endpoint), which emails the studio and redirects back with `?sent=1` or
 * `?subscribed=1`. With JavaScript, `enhanceForm` keeps the visitor on the page: it sends the
 * fields as JSON to the AJAX endpoint and shows the result inline in the form's
 * `[data-form-status]` element, which is an aria-live region.
 *
 * Markup contract (ContactForm.astro and NewsletterForm.astro follow it):
 *   <form data-lw-form data-endpoint="https://formsubmit.co/ajax/…" data-mode="relay|kit|post|ajax-post">
 *     …fields…  <input name="_honey" class="hp">
 *     <button type="submit" data-submit>…</button>
 *     <div data-form-status role="status" aria-live="polite"></div>
 *   </form>
 *
 * Modes: "relay" sends JSON to FormSubmit's AJAX endpoint. "kit" posts the form to Kit and
 * reads its JSON answer (see `sendToKit`). "ajax-post" sends FormData with `no-cors` to a
 * provider that accepts it (an opaque response counts as success). "post" is not enhanced
 * at all: the browser submits the form normally.
 */

type Outcome =
  | { ok: true }
  | { ok: false; message?: string }
  /** The provider wants the visitor on its own page (Kit's spam challenge). */
  | { ok: "redirect"; url: string }
  /** The request never completed; let the browser submit the form the ordinary way. */
  | { ok: "fallback" };

/**
 * Kit (the newsletter provider). The form posts as ordinary form data with only an `Accept`
 * header added, which keeps it a "simple" cross-origin request with no preflight. Kit answers:
 *   {"status":"success"}                      the confirmation email is on its way
 *   {"status":"quarantined","url":"…"}        Kit wants a challenge solved on its own page
 *   {"errors":{"messages":["…"]}}             a bad address, or another refusal
 * If the request itself fails (offline, blocked, a changed CORS policy), the caller falls
 * back to a normal form post, which Kit also accepts.
 */
async function sendToKit(endpoint: string, data: Record<string, string>): Promise<Outcome> {
  try {
    const body = new FormData();
    for (const [k, v] of Object.entries(data)) body.append(k, v);
    const res = await fetch(endpoint, { method: "POST", body, headers: { Accept: "application/json" } });
    const json = (await res.json().catch(() => null)) as {
      status?: string;
      url?: string;
      errors?: { messages?: string[] };
    } | null;
    if (!json) return { ok: "fallback" };
    if (json.status === "success") return { ok: true };
    if (json.status === "quarantined" && json.url) return { ok: "redirect", url: json.url };
    return { ok: false, message: json.errors?.messages?.join(" ") };
  } catch {
    return { ok: "fallback" };
  }
}

interface EnhanceOptions {
  /** Message shown on success. Receives the submitted fields. */
  success: (data: Record<string, string>) => string;
  /** Message shown on failure (the fallback mailto link is appended by the caller's markup). */
  failure: string;
  /** Called before sending: add computed fields such as _subject. */
  prepare?: (data: Record<string, string>) => void;
}

/** Plain object from a form, skipping disabled fields and file inputs. */
export function formData(form: HTMLFormElement): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of new FormData(form).entries()) {
    if (typeof value === "string") out[key] = value.trim();
  }
  return out;
}

async function send(form: HTMLFormElement, data: Record<string, string>): Promise<Outcome> {
  const endpoint = form.dataset.endpoint ?? form.action;
  const mode = form.dataset.mode ?? "relay";
  if (mode === "kit") return sendToKit(endpoint, data);
  try {
    if (mode === "ajax-post") {
      const body = new FormData();
      for (const [k, v] of Object.entries(data)) body.append(k, v);
      await fetch(endpoint, { method: "POST", body, mode: "no-cors" });
      return { ok: true };
    }
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    });
    const json = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
    // FormSubmit answers {"success":"true"} (a string) on success.
    if (res.ok && String(json.success) === "true") return { ok: true };
    // FormSubmit's refusals are written for the site owner ("This form needs Activation ..."),
    // so the visitor gets our own message and the relay's goes to the console.
    if (json.message) console.warn(`[forms] The relay answered: ${json.message}`);
    return { ok: false };
  } catch {
    return { ok: false };
  }
}

export function setStatus(form: HTMLFormElement, kind: "success" | "error" | "idle", message = "") {
  const status = form.querySelector<HTMLElement>("[data-form-status]");
  if (!status) return;
  // The live region stays in the accessibility tree at all times (never `hidden`), so screen
  // readers announce the text the moment it changes. CSS collapses it while idle.
  status.dataset.kind = kind;
  const text = status.querySelector<HTMLElement>("[data-status-text]") ?? status;
  text.textContent = message;
}

export function enhanceForm(form: HTMLFormElement, opts: EnhanceOptions) {
  if (form.dataset.mode === "post" || form.dataset.enhanced) return;
  form.dataset.enhanced = "true";
  const button = form.querySelector<HTMLButtonElement>("[data-submit]");
  const label = button?.querySelector<HTMLElement>("[data-label]");
  const idleLabel = label?.textContent ?? "";

  // Mark a field the browser rejected, so it is styled and announced as invalid, and clear
  // the mark as soon as its value is acceptable again. ("invalid" does not bubble: capture.)
  type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
  form.addEventListener("invalid", (e) => (e.target as Field).setAttribute("aria-invalid", "true"), true);
  const revalidate = (e: Event) => {
    const field = e.target as Field;
    if (field.hasAttribute?.("aria-invalid") && field.validity?.valid) field.removeAttribute("aria-invalid");
  };
  form.addEventListener("input", revalidate);
  form.addEventListener("change", revalidate);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (form.getAttribute("aria-busy") === "true") return;
    const data = formData(form);

    // A filled honeypot is a bot. Show the normal success so it learns nothing.
    if (data._honey) {
      setStatus(form, "success", opts.success(data));
      form.reset();
      return;
    }
    delete data._honey;
    delete data._next; // only for the no-JS redirect
    opts.prepare?.(data);

    form.setAttribute("aria-busy", "true");
    // aria-disabled, not `disabled`: a disabled button loses keyboard focus to <body>. The
    // aria-busy check above is what stops a second submit.
    button?.setAttribute("aria-disabled", "true");
    if (label) label.textContent = button?.dataset.busyLabel ?? "Sending…";
    setStatus(form, "idle");

    const result = await send(form, data);

    form.removeAttribute("aria-busy");
    button?.removeAttribute("aria-disabled");
    if (label) label.textContent = idleLabel;
    if (result.ok === true) {
      setStatus(form, "success", opts.success(data));
      form.reset();
      form.classList.add("is-sent");
      // The newsletter form hides its field and button once sent: put focus on the message,
      // so the next Tab continues from here and not from the top of the page.
      form.querySelector<HTMLElement>("[data-form-status]")?.focus({ preventScroll: true });
    } else if (result.ok === "redirect") {
      location.assign(result.url);
    } else if (result.ok === "fallback") {
      // `submit()` skips this listener, so the browser posts the form the ordinary way.
      form.submit();
    } else {
      // A provider's own message (for example "enter a valid email address") is more use
      // to the visitor than the generic one.
      setStatus(form, "error", result.message || opts.failure);
    }
  });
}

/**
 * After a no-JS submit, the relay redirects back with a flag in the query string. Show the
 * success message on the form that sent it, then tidy the URL.
 */
export function showReturnSuccess(form: HTMLFormElement, flag: string, message: string) {
  const params = new URLSearchParams(location.search);
  if (!params.has(flag)) return;
  setStatus(form, "success", message);
  form.classList.add("is-sent");
  params.delete(flag);
  const qs = params.toString();
  history.replaceState(null, "", location.pathname + (qs ? `?${qs}` : "") + location.hash);
}
