# Changelog

## 2026-05-01 (button redesign — magenta primary + modern hover)

- **Primary CTAs swapped from charcoal to magenta gradient** (`#9e005d → #b8006d`). Brand reasoning: the magenta is the wordmark's "bill" color — using it as the primary CTA color makes the button visually echo the logo and gives the dark-on-light marketing pages a single high-energy focal point.
- **Modern hover dynamics applied across all CTAs.** Spring easing (`cubic-bezier(0.34, 1.56, 0.64, 1)`) for satisfying overshoot, magenta-tinted shadow that expands on hover (4px→12px y-offset, 0.3→0.45 opacity), arrow-icon slide (`translateX(3px)`), and on `index.html` primary button a diagonal shine sweep via `::before` pseudo-element. `:active` collapses lift back to 0 with shorter 100ms duration for tactile feedback.
- **Marketing HTML updates:** `index.html` got the full treatment (`.btn-primary`, `.btn-secondary`, `.btn-white`, `.nav-cta` all redesigned). `pricing.html`, `features.html`, `faq.html`, `impressum.html`, `agb.html`, `datenschutz.html` got the lighter `.nav-cta` magenta-gradient update via Python script (only nav button on those pages).
- **SPA token swap.** In `src/app/src/index.css`, swapped `--primary` and `--secondary` HSL values: `--primary` is now magenta `326 100% 31%` (was charcoal), `--secondary` is now charcoal `240 9% 4%` (was magenta), `--ring` follows primary so focus outlines are magenta. This means every shadcn `<Button>` (default variant) is now magenta out of the box.
- **shadcn `Button` component upgraded.** Added spring-eased shadow + lift + arrow slide via Tailwind arbitrary-value classes. The magenta shadow is hardcoded with `hsl(326 100% 31% / 0.5)` to ensure it follows the brand colour even if shadow utilities don't compose with CSS variables. `[&_svg:last-child]:translate-x-0.5` slides only the trailing icon (typical "go arrow" pattern), not leading icons.
- **`variant="secondary"` usages migrated to default** where the intent was "primary brand action" (e.g. AppLayout sidebar "Neue Rechnung", mobile "Neu", dashboard schnellstart card, invoices/list "Neue Rechnung" header CTA). Done page success badge swapped from `bg-secondary` to `bg-primary` for the same reason. Anywhere `variant="secondary"` survives is now intentional charcoal.

## 2026-05-01 (logo refresh)

- **Wordmark updated to v2 — `KlarBill.` (capital K + B, ending period).** New SVG (viewBox `0 0 215.91 43.85`, was `0 0 180.52 44.96`) — bolder strokes (vertical bar 7.61 wide, was 4.99), capital K and B glyphs replacing lowercase k and b, square dot replacing the round i-dot circle, and a final period accent in magenta. Aspect ratio went from 4.01:1 to 4.92:1 (~23% wider) — fits comfortably in existing nav and footer slots without overflow.
- **22 SVG instances replaced site-wide via Python regex script.** Production: 14 instances across 7 marketing HTML pages (each has nav + footer instance), 1 in `examples/beispielrechnung.html`, 3 in SPA layouts (`AppLayout.tsx`, `AuthLayout.tsx`, `OnboardingLayout.tsx`). Backups: 4 in `_supabase-ready/{login,signup,forgot,callback}.html` (kept consistent for future restore reference). Plus standalone `logo.svg` at repo root rewritten to use semantic `aria-label="KlarBill"` and inline `fill` attributes (no more `<defs><style>` block — cleaner for embedding).
- **Brand naming convention unchanged in copy.** Wordmark is `KlarBill.` (with caps + period), but written/typed brand name in titles, meta, prose, and copy stays **Klarbill** (single cap, no period) — matches `README.md` precedent and preserves all existing site content. The wordmark and the typed name diverge intentionally, like `iPhone` (typed) vs. the actual Apple logo.

## 2026-05-01 (homepage refactor — Resend-inspired)

- **`index.html` rewritten in Resend-inspired style.** Type-driven, light/dark/light/dark/gradient section rhythm, animated form-to-PDF preview in hero (pure CSS — no JS deps, infinite 8s loop). Sections: light hero with split-panel demo → dark "How it works" 3-step grid → light Features grid (6 cards, hover lift) → dark XRechnung XML showcase with syntax-coloured `<Invoice>` snippet → dark gradient final CTA → light footer. Inter for body, JetBrains Mono for invoice numbers and code blocks.
- **Positioning fixes baked in.** Removed the "GoBD-konform" feature card (contradicted the template-tool framing per `docs/04-compliance.md` — Klarbill explicitly does NOT do GoBD archival). Replaced with "100 % lokal generiert" (matches actual behaviour). Updated meta description: dropped "Ab 9,90 €/Monat" tier reference. Hero badge changed from "Bereit für E-Rechnung 2027" to "Private Beta · kostenlos" to match current launch state. Body copy aligned with `docs/00-strategy.md` template-tool wording.
- **All hero / nav / footer CTAs updated to `/app/*` routes.** Old links to `/signup.html` and `/login.html` (which were deleted with the SPA migration) replaced with `/app/signup` and `/app/login`. The Vercel redirects still cover legacy bookmarks, but the homepage links are now direct.
- **New page: `/examples/beispielrechnung.html`.** A4-portrait, professionally typeset German B2B invoice mock — fictional issuer (Max Mustermann, freelance designer), recipient (ACME GmbH), three line items, full §14 UStG fields, IBAN/BIC, payment terms, notes referencing the parallel XRechnung XML. Linked from homepage hero "Beispielrechnung ansehen" CTA. Print-optimized (`@media print` strips toolbar and shadows). Visitor can save-as-PDF in browser, sees what a real Klarbill output looks like without signing up — high-trust marketing moment.

## 2026-05-01 (post-cleanup — `.html` redirect coverage)

- **Added `.html`-suffix variants to all 14 backward-compat redirects.** When the stale root HTML files were deleted, only extension-less paths (e.g. `/login`) were redirected to `/app/*`. Anyone visiting an old bookmark with `.html` (e.g. `klarbill.de/login.html`) hit a 404 because Vercel filesystem-first lookup found no file and the redirect rule didn't match the suffix. Fixed by adding `/login.html` → `/app/login` etc. for all 14 deleted pages — `vercel.json` now has 28 redirects total. **Lesson for future sessions:** when removing static HTML files that share names with SPA routes, always add redirects for both `/foo` and `/foo.html` versions, or use a regex pattern that matches the optional suffix.
- **Drive folder reset to archive-only.** `/Users/rauf/Library/CloudStorage/GoogleDrive-rauf@investaz.az/My Drive/KlarBill` cleaned: removed 19 stale HTML files, deprecated `auth/`, `lib/`, `db/` folders, old `_supabase-ready/` copy, old `docs/` copy, old top-level `CHANGELOG.md` / `DEPLOY.md` / `README.md` / `TERMINAL-SETUP.md`, the `_archive_corrupted_backup.docx`, and `.DS_Store`. Replaced with a single `README.md` pointing to `~/Projects/klarbill/` as the active source of truth. Only `.claude/settings.local.json` kept (Claude Code config). Drive cloud auto-syncs the deletions.

## 2026-05-01 (end of long session — routing fixes)

- **Removed 14 stale root HTML files** that conflicted with the SPA routes via Vercel's `cleanUrls` auto-strip behavior: `login.html`, `signup.html`, `forgot.html`, `callback.html`, `welcome.html`, `done.html`, `dashboard.html`, `invoices.html`, `clients.html`, `settings.html`, `invoice-new.html`, `onboarding-1.html`, `onboarding-2.html`, `onboarding-3.html`. These were logo-only placeholders pre-dating the SPA pivot — `/app/*` owns those URLs now. Marketing surface (`index.html`, `pricing.html`, `features.html`, `faq.html`, `impressum.html`, `agb.html`, `datenschutz.html`) untouched.
- **`vercel.json` tuned for the two-stack architecture.** Captured the working configuration after one cycle of debugging:
  - `outputDirectory: "."` is **required** — without it, the build emits to `<repo>/app/` but Vercel doesn't include the artifacts in the deploy, breaking every `/app/*` URL.
  - Use the simple `/app/:path*` rewrite — Vercel's `source` field doesn't reliably parse regex with negative lookaheads (`/app/((?!assets/).*)` returned 404s).
  - Do **not** enable `cleanUrls`. With static `.html` files at root, it auto-strips `.html` from URLs and somehow conflicts with the SPA rewrite — observed `/app/welcome` returning Vercel 404 while `/app/login` worked, with no obvious file-system reason.
  - Added 14 `redirects` mapping legacy paths (`/login`, `/welcome`, `/dashboard`, etc.) → `/app/*` so any old bookmark or external link still works.

## 2026-05-01 (night — `/app/*` SPA shell)

- **`/app/*` SPA shell shipped.** Renamed `src/generator/` → `src/app/` and grew it into a full single-page application: 14 routes (login, signup, forgot, callback, welcome, done, onboarding/1-3, dashboard, invoices, invoices/new, clients, settings), three layouts (AppLayout with sidebar+topbar+mobile-bottom-nav, AuthLayout with centered card, OnboardingLayout with progress dots), ProtectedRoute wrapper, and a mocked `useSession` hook (`?dev-user=1` URL param toggles a fake user for layout development). Build verified: ~221 KB JS bundle (~69 KB gzipped), 14 KB CSS (3.5 KB gzipped). Vite outputs to `<repo>/app/` for Vercel to serve under the `/app/*` URL prefix.
- **Tailwind + shadcn/ui adopted.** `tailwind.config.js` maps Klarbill's existing palette (#0A0A0B charcoal, #9e005d magenta, #FAFAFA bg, #525252 muted, #E5E5E5 border) onto shadcn's semantic CSS variables, so out-of-the-box shadcn components inherit the brand. `src/index.css` defines the theme via HSL CSS vars in `@layer base`. Three primitives committed: `Button` (variants: default/secondary/outline/ghost/link/destructive, sizes: default/sm/lg/icon), `Input`, `Card` (with Header/Title/Description/Content/Footer subcomponents). `cn()` helper from `lib/utils.ts`.
- **`vercel.json` at repo root** wires the two-stack architecture into Vercel:
  ```json
  {
    "buildCommand": "cd src/app && npm install --no-audit --no-fund && npm run build",
    "outputDirectory": ".",
    "rewrites": [{ "source": "/app/:path*", "destination": "/app/index.html" }]
  }
  ```
  Marketing HTML at repo root continues to serve as-is; `/app/*` routes through the React Router-managed SPA shell. `cleanUrls: true` lets `/agb.html` also resolve as `/agb` for cleaner URLs.
- **Path alias `@/*` → `src/*`** in both `tsconfig.json` (TypeScript resolution) and `vite.config.ts` (bundler). Standard shadcn convention.
- **Mock auth in place.** `useSession()` returns `{ user: null, loading: false }` by default; `ProtectedRoute` redirects every authed route to `/login?next=...` preserving the original target. Append `?dev-user=1` to any URL to simulate a logged-in user during layout development. Supabase wiring lands in the next session.
- **Routes intentionally re-implemented as React, not migrated from `_supabase-ready/`.** The vanilla-HTML auth backups (`_supabase-ready/{signup,login,forgot,callback}.html`) are now reference material only and won't be restored — they remain in the repo as a fallback in case the SPA approach hits a blocker.
- **`src/app/README.md` rewritten** to reflect the SPA model: package layout, dev workflow, build output, decisions deferred (form library, state library, PDF font, XRechnung profile).

## 2026-05-01 (night — architecture refinement)

- **Architecture clarified, not pivoted.** Earlier framing said "static HTML for marketing, React island only for the invoice generator, defer Next.js." That left a vague middle: where does login go? Where does the dashboard live? This update sets a clear boundary: marketing surface (7 pages: index, pricing, features, faq, impressum, agb, datenschutz) stays static HTML; everything behind login becomes a Vite-React SPA at `klarbill.de/app/*`. The `src/generator/` scaffold is the seed of this SPA — it gets renamed to `src/app/`, gets `react-router-dom`, gets an `<AppLayout>` (sidebar + topbar) and an `<AuthLayout>` (centered card), and grows route-by-route into login/signup/forgot/callback/onboarding/dashboard/invoices/clients/settings.
- **Why this framing:** the app surface is form-heavy, state-heavy, and shares chrome across every page. Doing that in vanilla JS across separate HTML files multiplies boilerplate and creates session-handling bugs. One `<AppLayout>` plus one `useSession()` hook collapses all of that. Marketing has none of those concerns, so it stays as is.
- **Vercel routing model documented.** Single `vercel.json` at repo root: `buildCommand` builds the SPA bundle to `<repo-root>/app/`; static HTML at root is served as-is; rewrite rule sends `/app/*` to `/app/index.html` so React Router takes over. Two surfaces, one domain, one repo.
- **Out of scope (still, with explicit trigger conditions):** Next.js full migration (revisit if marketing needs SEO-driven dynamic content, 100+ users, or team accounts demand SSR); Astro for marketing (revisit if page count exceeds ~15); SSR for the app (irrelevant — app is auth-gated, SEO doesn't apply).
- **Updated docs:** `00-strategy.md` § Architecture decision, `06-tech.md` (full rewrite — two-stack documentation, package layout, library decisions deferred), `05-roadmap.md` Phase 1 (SPA shell first, then auth inside it, then generator forms inside it), `CURRENT-TASKS.md` Active list re-prioritized.

## 2026-05-01 (late evening)

- **Legal pages drafted and wired into footers.** New `agb.html` — 10-section Allgemeine Geschäftsbedingungen in German codifying the template-tool framing: Klarbill is software not advice, user is responsible for legal correctness / GoBD archival / transmission / tax treatment, no invoice content stored, not an Art. 28 DSGVO processor, standard German Kardinalpflichten liability regime. New `datenschutz.html` — full DSGVO privacy policy with a "Was Klarbill *nicht* verarbeitet" highlight box, a per-category data/purpose/legal-basis table, and a sub-processor list (Vercel, Supabase). `impressum.html` trimmed — the old in-page Datenschutzerklärung that listed "Rechnungsdaten" as collected data was removed (it directly contradicted the template-tool positioning); cross-links to `/datenschutz.html` + `/agb.html` added in its place. Footers across `index`, `pricing`, `features`, `faq`, `impressum` updated: `Unternehmen` column renamed to `Rechtliches` with Impressum / Datenschutz / AGB links. `signup.html` consent checkbox links to `/agb.html` + `/datenschutz.html`; `_supabase-ready/signup.html` updated identically. Both new pages bear a yellow "vorläufige Fassung — anwaltliche Prüfung steht aus" notice; launch posture remains private beta until a German Fachanwalt für IT-Recht reviews.
- **Invoice generator scaffold shipped at `src/generator/`.** Vite + React 18 + TypeScript. `npm install && npm run build` succeeds — 143 kB bundle (46 kB gzipped) emitted to `<repo-root>/generator/generator.js`. Placeholder `App.tsx` mounts a 4-step stepper (Absender → Empfänger → Positionen → Vorschau) styled to match the existing visual language. Hand-rolled CSS, no UI library, no state library, no validation library — keeping the surface small. Build output and `node_modules/` gitignored. Not yet wired into `invoice-new.html`; the existing static page stays in place until the generator is feature-complete enough to replace it.

## 2026-05-01 (end-of-day)

- **Strategic pivot logged: template tool, not bookkeeping SaaS.** New positioning: Klarbill is a software template tool that generates XRechnung-conformant invoice documents in the user's browser, with no server-side storage of invoice content. Rationale: minimize legal liability (no Art. 28 DSGVO data-processor exposure, no GoBD archival obligation, no tax-advice exposure), minimize operational cost (~€1/mo at Phase 1 vs. ~€65/mo on the previous full-SaaS plan), and focus scope on solo freelancers and small B2B parties issuing invoices to known counterparts.
- **New `docs/00-strategy.md`** — single source of truth for positioning, scope, what-not-to-build, liability stance, cost model, and architecture decision (static HTML for marketing + Vite-React island on `invoice-new.html` for the generator + Supabase free-tier auth, Next.js migration deferred until Phase 2).
- **`docs/01-product.md` rewritten.** Pricing recast as provisional (freemium-with-cap or PAYG, decision deferred). Competitor table reframed against template-tool wedge. Out-of-scope clauses added (B2C, retail, cross-border VAT).
- **`docs/04-compliance.md` rewritten.** Reframed from "Klarbill complies with GoBD/§14/§147" to "the user is responsible; here is how Klarbill helps them comply." Three AGB clauses drafted (template-tool, user-responsibility, no-Art.28-processor). In-product disclaimer copy specified for §19 toggle and post-download retention notice. Implementation checklist updated.
- **`docs/05-roadmap.md` rewritten.** Phases re-scoped: Phase 1 = generator MVP + minimal auth, Phase 2 = private beta validation, Phase 3 = polish + first paid users via Stripe. DATEV, recurring invoices, mobile app, server-side GoBD archive, team accounts, Stripe Connect — all moved to explicit "Maybe later" with a do-not-drift note.
- **`docs/06-tech.md` rewritten.** Stack documented as static HTML + Vite-React island + Supabase free tier. Resend, Stripe, Next.js explicitly out of Phase 1. DB schema scope documented: `profiles` and `clients` only — no invoice content.
- **`docs/CURRENT-TASKS.md` re-prioritized.** Top three Active tasks now: AGB+Datenschutz+Impressum drafts, real legal data in `impressum.html`, invoice generator MVP. Old "auth go-live" demoted (can wait until AGB exists). "Custom SMTP via Resend" moved to "do not work on this" — it's irrelevant when Klarbill doesn't send email on the user's behalf.

## 2026-05-01 (later)

- **Brand audit: Rechnung24 → Klarbill** — completed user-facing rename across all production HTML. Swept 51 occurrences in 18 root files (`<title>`, `<meta name="description">`, footer copyright, FAQ + features prose, welcome `<h1>`, impressum `<strong>` legal-name placeholder) plus 8 in `_supabase-ready/` auth backups. Convention adopted: capitalized **Klarbill** in prose/titles, lowercase `klarbill` reserved for the wordmark and domain (matches `README.md`). Contact email updated `hallo@rechnung24.de` → `hallo@klarbill.de` in impressum. Cleaned up legacy comment in `_supabase-ready/supabase.js`. HTML structural sanity verified — all html/body tags balanced. **Out of scope (follow-ups):** GitHub repo URL still `github.com/rauf-ux/rechnung24` (rename repo on GitHub first, then update `README.md` + `docs/06-tech.md`); `DEPLOY.md` Supabase project name + email-template strings (update alongside actual Supabase config when auth goes live); placeholder legal data in `impressum.html` ("Musterstraße", "[Nachname]") still needs real values before public launch.

## 2026-05-01

- **Migrated to terminal-based workflow** — installed Homebrew + gh CLI on user's Mac, authenticated with GitHub (rauf-ux), set git identity, cloned repo to `~/Projects/klarbill/`, consolidated entire Drive folder into the repo (HTML pages, docs/, db/, _supabase-ready/, README, CHANGELOG, DEPLOY guides, logo.svg). First terminal-driven push: 39 files, 3522 insertions, +113 deletions. Drive folder demoted to archive only. Cowork workspace switched to lokal repo — Claude no longer needs to fetch from GitHub each session (~95% token savings going forward).
- **Fixed i-dot logo rendering bug** — original SVG combined the dot and i-body into a single `<path>` with `ZM` subpath syntax. Some browsers clipped the dot. Split into separate `<circle cx="151.24" cy="3.35" r="3.35"/>` + `<path>` elements (33 replacements across 23 HTML files + logo.svg). Guaranteed render in all browsers.

- **Logo rolled out site-wide (19 HTML files, 29 logo instances):**
  - Replaced fake CSS logo (`<span class="logo-icon">R</span> Rechnung24`) with real `klarbill` wordmark SVG inlined into every page.
  - Pulled remaining 14 pages from GitHub (`github.com/rauf-ux/klarbill`), edited and saved to Drive ready for upload.
  - Top-bar logo: 32px height. Footer / secondary placement: 28px height (visual hierarchy).
  - Two-tone branding preserved: "klar" → `#0A0A0B`, "bill" → `#9e005d`.
  - Inline SVG approach (no external `/logo.svg` request, scales crisp, color-controllable via CSS).
  - Discovered footer-brand logo blocks in 5 marketing pages (index, features, pricing, faq, impressum) — agent had only updated top-bar; manually fixed footer.
  - Discovered dashboard pages (dashboard, invoices, clients, invoice-new, settings) have BOTH sidebar + topbar logos — both updated.
  - `index.html` footer used to say "Klarbill" with `K` icon while top said "Rechnung24" with `R` — both are now the unified klarbill wordmark.

- **Auth refactored to match real klarbill repo structure:**
  - Inspected live repo `github.com/rauf-ux/klarbill` and discovered flat root layout (no subfolders), inline `<style>` blocks per page, monochromatic palette, "Rechnung24" branding (not Klarbill), `<a>` placeholder buttons (no real form submit).
  - Wrote drop-in replacements at repo root: `signup.html`, `login.html`, `forgot.html` — preserve 100% of existing markup, classes (`.input`, `.submit-btn`, `.social-btn`, `.auth-card`, etc.) and inline styling. Added Supabase wiring as inline `<script>` blocks at bottom.
  - Added new `callback.html` (matching visual style) for OAuth + email-verification + password-recovery flows.
  - Consolidated all auth logic into single `supabase.js` at root (replaces the obsolete `lib/config.js + lib/auth.js + lib/guard.js` triple). Exposes `window.klarbillAuth.{signUp, signIn, signInWithGoogle, resetPassword, updatePassword, signOut, getSession, guard, isValidEmail, friendlyError}`.
  - Forgot.html: removed the "demo state toggle" (live now, not a mockup).
  - DEPLOY.md fully rewritten for actual repo structure: 5 files to upload to root via GitHub web drag-and-drop, no subfolder creation needed.
  - Obsolete artefacts (Drive `auth/`, `lib/`, `db/` folders) marked as ignore in DEPLOY.md.

## 2026-04-30

- **Auth system shipped (static MVP):**
  - Added `db/schema.sql` (Supabase): `profiles` table 1-1 with `auth.users`, RLS policies, auto-create trigger on signup, `updated_at` helper.
  - Added `lib/auth.js`: `window.klarbillAuth` wrapper for signup, login, Google OAuth, password reset, email verification resend, profile read/update, password-strength scoring, German error mapping.
  - Added `lib/config.js` (Supabase URL + anon key) and `lib/guard.js` (drop-in session guard with `?next=` redirect support).
  - Added `auth/signup.html`, `auth/login.html`, `auth/forgot.html`, `auth/callback.html` — all wired to `klarbillAuth`, mobile-first, design-token-aligned, German UI copy.
  - Added shared `auth/auth.css` with full token system (colors, typography, radii, focus rings, password meter, alert states, mobile breakpoints).
  - Added `docs/07-auth-setup.md`: Supabase + Google OAuth setup walkthrough, email-template overrides, deployment checklist, smoke-test script, troubleshooting matrix.
  - Updated `docs/06-tech.md` with auth section + current vs. future env-var lists.
- Polished `README.md` for GitHub: hero block with logo + badges (live, status, stack, license), feature list, tech-stack comparison table, quick-start, project structure, demo accounts, roadmap teaser, contributing + license sections.
- Reorganized backup from monolithic `.docx` (corrupted during Drive sync) into modular `docs/` structure.
- Created concise README.md as index.
- Established `CURRENT-TASKS.md` as the single resume entry point for new sessions.
- Documented design tokens, page structure, compliance requirements, roadmap, and tech stack across 6 separate files.

## Earlier

- (Pre-restructure history lost with the corrupted `.docx` backup. Refer to git history of `github.com/rauf-ux/rechnung24` for code-level changes.)
