# Current Tasks

> **Resume protocol:** read this file first when starting a new session. Then read [`00-strategy.md`](00-strategy.md) — it defines what Klarbill is and is not, and overrides anything in this file that contradicts it. Update this file at the end of each session.

**Last updated:** 2026-05-01 (SPA shell live + routing fixes shipped)

## Setup state

- ✅ **Lokal repo:** `~/Projects/klarbill/` — connected to GitHub via gh CLI
- ✅ **Cowork workspace:** mounted on lokal repo (Drive folder is now archive only)
- ✅ **Git identity:** Rauf / rauf@investaz.az — commits work
- ✅ **Logo:** klarbill wordmark live on klarbill.de
- ✅ **i-dot fix:** pushed (commit `ea0f650`)
- ✅ **Brand copy:** all user-facing HTML now says "Klarbill" (Rechnung24 fully swept)
- ✅ **Strategy locked:** Klarbill is a template tool (see `00-strategy.md`)
- ✅ **Legal scaffolding:** `agb.html` + `datenschutz.html` drafted with template-tool framing. `impressum.html` trimmed (old contradictory privacy-policy section removed). Footer links updated site-wide. Lawyer review still pending — launch posture remains private beta.
- ✅ **Architecture refined:** marketing pages stay static HTML (7 files); everything behind login becomes a Vite-React SPA at `klarbill.de/app/*`. See `00-strategy.md` § Architecture decision.
- ✅ **`/app/*` SPA shell live on klarbill.de.** `src/generator/` renamed to `src/app/`. 14 routes mount with placeholder content (login, signup, forgot, callback, welcome, done, onboarding/1-3, dashboard, invoices, invoices/new, clients, settings). Three layouts (AppLayout, AuthLayout, OnboardingLayout) + ProtectedRoute. Tailwind + shadcn/ui (Button, Input, Card). Build emits to `<repo>/app/`: ~221 KB JS (~69 KB gz), 14 KB CSS.
- ✅ **Old conflicting root HTML files deleted.** `login.html`, `signup.html`, `forgot.html`, `callback.html`, `welcome.html`, `done.html`, `dashboard.html`, `invoices.html`, `clients.html`, `settings.html`, `invoice-new.html`, `onboarding-1/2/3.html` were stale logo-only placeholders that conflicted with `/app/*` routes via Vercel's `cleanUrls` auto-strip. They're gone; SPA routes own those URLs now. `_supabase-ready/` backup folder still has the old auth versions for reference but won't be restored.
- ✅ **`vercel.json` working configuration** — `outputDirectory: "."` is required (without it, build artifacts don't get served). Use simple `/app/:path*` rewrite (regex with negative lookahead like `/app/((?!assets/).*)` does NOT parse correctly on Vercel). Skip `cleanUrls` — it caused `/app/welcome` 404 even after the static welcome.html was removed. Redirects map legacy paths (`/login`, `/welcome`, etc.) → `/app/*` for backward-compat with bookmarks.
- ✅ **Mock auth in place.** `useSession()` returns `{ user: null }` by default; `?dev-user=1` URL param simulates a logged-in user for layout development.

## Active (Phase 1 — Auth + Generator inside the SPA)

Ordered by dependency.

- [ ] **Wire real Supabase auth into the SPA.**
  - Provision a Supabase free-tier project (`klarbill` workspace, EU region)
  - Run `db/schema.sql` to create `profiles` + `clients` tables with RLS
  - Replace `useSession.ts` mock with real Supabase client (`@supabase/supabase-js`)
  - Wire login/signup/forgot/callback route forms to `supabase.auth.*` methods
  - Add Supabase URL + anon key to `src/app/src/auth/supabase.ts` (committed — anon key is public-safe)
  - Test the full happy path: signup → email verify → login → dashboard
- [ ] **Invoice generator inside the SPA.** Replace `src/app/src/routes/invoices/new.tsx` placeholder with the real multi-step form:
  - `types.ts` (IssuerProfile, Recipient, LineItem, Invoice)
  - 4-step flow (Absender → Empfänger → Positionen → Vorschau) using shadcn Card + Input + Button primitives
  - §19 Kleinunternehmer toggle (zeros VAT, appends required notice)
  - Draft auto-save to localStorage
  - jsPDF rendering (Helvetica, A4 portrait)
  - XRechnung XML serialization (UBL 2.1)
- [ ] **Wire dashboard / clients / settings to real data** — fetch profile + clients from Supabase via the type-safe client.
- [ ] **`impressum.html` real legal data** — replace placeholders ("Rauf [Nachname]", "Musterstraße 1", "85290 Geisenfeld", VAT-ID `[wird ergänzt]`). Required before any public sign-up. **User's job.**
- [ ] **Marketing → SPA handoff** — once auth is live, redirect `signup.html` → `/app/signup`, `login.html` → `/app/login`, `welcome.html` → `/app/welcome` (or retire those static files entirely).
- [ ] **AGB + Datenschutz lawyer review** — find a German Fachanwalt für IT-Recht.
- [ ] **Pricing copy refresh** — update `pricing.html` once we pick freemium-with-cap vs. PAYG.
- [ ] **`DEPLOY.md` brand cleanup** — Supabase config + email templates (at auth go-live).
- [ ] **Rename GitHub repo `rechnung24` → `klarbill`** — then update `README.md` URLs.

## Up Next (cosmetic / dev-experience — not blocking)

- [ ] **`deploy.sh` helper** — `TERMINAL-SETUP.md` Faza 5 (one-line deploy)
- [ ] **Favicon** — compact "k"/"kb" SVG, `<link rel="icon" type="image/svg+xml" href="/logo.svg">` on all pages
- [ ] **Open Graph image** — 1200×630 social share preview (logo + tagline)
- [ ] **Design-system audit** — extract spacing scale + radii from existing HTML, formalize into `docs/02-design-system.md`
- [ ] **FAQ mobile breakpoint review**
- [ ] **Pricing CTA copy iteration**
- [ ] **User-menu in app shell header** (avatar + logout — once auth is live)

## Phase 2 (don't start until Phase 1 is shipping real invoices)

- [ ] **Private beta** — invite 10 freelancers, 1:1 calls every 2 weeks
- [ ] **Market validation** — outreach on LinkedIn + r/selbststaendig + Freelancer.de
- [ ] **Stripe checkout** — once a pricing model is validated by users
- [ ] **§19 onboarding flow** — revenue tracker the user fills in themselves

## Maybe later (do not work on these)

These were in the old roadmap and are explicitly **out of scope** for v1 per the new strategy. Don't quietly drift back into them. If business reality changes, update `00-strategy.md` first, then move them up.

- DATEV export
- Recurring invoices
- Server-side / GoBD-compliant invoice archive
- Custom SMTP via Resend (irrelevant — we don't send emails on the user's behalf)
- React Native mobile app
- Team accounts
- Tax-advisor white-label / API
- Stripe Connect / payment processing on behalf of users
- Tailwind config + Next.js migration (defer until Phase 2 validates demand)

## Blockers / Open Questions

- **Pricing model decision** — freemium with cap (€4.90/mo unlimited) vs. PAYG (€0.50/invoice or €29 one-time). Defer to Phase 2 validation.
- **PDF library** — jsPDF (small, simple) vs. pdfmake (bigger, table-friendly). Decide during generator build.
- **XRechnung profile** — UBL 2.1 vs. UN/CEFACT CII. Both are accepted by German recipients; pick one for v1 and document.
- **Lawyer for AGB review** — need a German Fachanwalt für IT-Recht. Not yet sourced.

## Workflow reminder

Terminal-based workflow. Drive folder (`/Users/.../KlarBill/`) is archive only — do NOT edit there.

Source of truth: `/Users/rauf/Projects/klarbill/` (lokal git repo).

Daily loop:

1. Claude edits files in `~/Projects/klarbill/` directly.
2. User runs:
   ```bash
   cd ~/Projects/klarbill
   git add . && git commit -m "msg" && git push
   ```
   (or `./deploy.sh "msg"` once that helper exists)
3. Vercel auto-deploys → klarbill.de.

## Last Session Summary (2026-05-01, end of long session — SPA live + routing tuned)

- **klarbill.de/app/* now serves the React SPA in production.** All 14 routes confirmed working in the browser: login, signup, forgot, callback, welcome, done, onboarding/1-3, dashboard, invoices, invoices/new, clients, settings.
- **Legacy URL conflicts resolved.** Deleted 14 stale logo-only HTML files at root (login.html, signup.html, etc.) that conflicted with SPA routes. Marketing surface (index, pricing, features, faq, impressum, agb, datenschutz) stays static HTML, untouched. Backward-compat redirects in `vercel.json` map legacy paths (`/login`, `/welcome`, etc.) to their `/app/*` equivalents.
- **`vercel.json` gotchas captured for future sessions** — see Setup state above. Three rules: keep `outputDirectory: "."`, use simple path patterns not regex with lookahead, do not enable `cleanUrls` (it conflicts with the SPA rewrite even when no static .html files share the path).
- **Five commits this session pushed and live:** `cd3c317` brand sweep, `a7d79e0` strategy pivot to template tool, `aa5823a` legal pages + generator scaffold, `199b184` sandbox-artifact cleanup, `c8be2dc` SPA shell, `6feaa16` legacy HTML cleanup + redirects, plus a final `vercel.json` `outputDirectory` restore commit.

## Last Session Summary (2026-05-01, late night — `/app/*` SPA shell)

- **`/app/*` SPA shell shipped.** Renamed `src/generator/` → `src/app/`. 14 routes (login, signup, forgot, callback, welcome, done, onboarding/1-3, dashboard, invoices, invoices/new, clients, settings) all mount with realistic placeholder content using shadcn primitives. Three layouts: AppLayout (sidebar + topbar + mobile bottom nav), AuthLayout (centered card with footer linking to AGB/Datenschutz/Impressum), OnboardingLayout (focused single-card with 3-dot progress). ProtectedRoute wrapper redirects unauthed users to `/login?next=...`.
- **Tailwind + shadcn/ui adopted.** `tailwind.config.js` maps Klarbill's existing palette (charcoal #0A0A0B, magenta #9e005d, bg #FAFAFA) onto shadcn's semantic CSS variables, so out-of-the-box shadcn components inherit the brand without per-component theming. Three primitives (Button, Input, Card) wired up. `cn()` helper from `lib/utils.ts`.
- **Build verified.** `npm run build` produces 221 KB JS bundle (69 KB gzipped), 14 KB CSS (3.5 KB gzipped). Output goes to `<repo>/app/` (gitignored). `vercel.json` at repo root tells Vercel to run the build on deploy and rewrites `/app/*` URLs to `/app/index.html` for client-side routing.
- **Mock auth ships with the shell.** `useSession()` returns `{ user: null, loading: false }` by default; `ProtectedRoute` redirects to `/login`. Append `?dev-user=1` to any URL during development to simulate a logged-in user and preview authed layouts. Real Supabase auth lands in the next session.
- **Decisions deliberately deferred to later sessions:** form library (`react-hook-form` + `zod`), state library (`zustand`), PDF font embedding, XRechnung schema validation. Native React + Tailwind is sufficient until specific pain shows up.

## Last Session Summary (2026-05-01, night — architecture refinement)

- **Architecture clarified, not pivoted.** Earlier framing said "static HTML for marketing, React island only for the invoice generator, defer Next.js." That left a vague middle: where does login go? Where does the dashboard live? This session sets a clear boundary: **marketing surface (7 pages) stays static HTML; everything behind login becomes a Vite-React SPA at `/app/*`**. The `src/generator/` scaffold is the seed of this SPA — it gets renamed to `src/app/`, gets `react-router-dom`, gets an `<AppLayout>`, and grows route-by-route.
- **Why now:** the app surface is form-heavy, state-heavy, and shares chrome (sidebar, topbar, user menu, toasts) across every page. Doing that in vanilla JS across separate HTML files multiplies boilerplate and creates session-handling bugs. One `<AppLayout>` + one `useSession()` hook collapses all of that. Marketing has none of these concerns, so it stays as it is.
- **Updated docs:** `00-strategy.md` § Architecture decision rewritten with explicit marketing/app boundary and Vercel routing model. `06-tech.md` rewritten — two-stack architecture documented, `vercel.json` rewrite rule shown, eventual `src/app/` package layout sketched, library decisions provisional (shadcn/ui vs. hand-rolled deferred). `05-roadmap.md` Phase 1 reordered: SPA shell first, then auth inside it, then generator forms inside it. `CURRENT-TASKS.md` Active list re-prioritized: **top item is now "build the `/app/*` SPA shell"** — that's the single biggest leverage point for the next 1-2 sessions.
- **Out of scope (still):** Next.js full migration, Astro for marketing, server-side rendering. Trigger conditions for revisiting are documented in `00-strategy.md`.

## Last Session Summary (2026-05-01, late evening)

- **Legal scaffolding drafted.** Three new pages on the new template-tool framing:
  - **`agb.html`** — 10-section Allgemeine Geschäftsbedingungen in German. Codifies that Klarbill is a software tool (not advice), that the user is responsible for legal correctness / GoBD archival / transmission / tax treatment, that no invoice content is stored on Klarbill servers, and that Klarbill is not an Art. 28 DSGVO processor for invoice data. Liability capped under standard German Kardinalpflichten regime. Bears a yellow "vorläufige Fassung — anwaltliche Prüfung steht aus" notice; private-beta posture until reviewed.
  - **`datenschutz.html`** — full DSGVO privacy policy with a green "Was Klarbill *nicht* verarbeitet" highlight box up top. Table mapping each data category (Account, Profil, Kundenliste, Logs) to its specific data, purpose, and Art. 6 legal basis. Sub-processors listed: Vercel (EU), Supabase (EU). Standard sections for retention, cookies, Betroffenenrechte, BayLDA Beschwerderecht.
  - **`impressum.html` trimmed** — old in-page Datenschutzerklärung removed (it contradicted the new positioning by claiming Klarbill stores invoice data). Now contains only the §5 TMG Anbieterkennzeichnung + cross-links to `/datenschutz.html` and `/agb.html`.
  - **Footers updated site-wide** — every marketing page (`index`, `pricing`, `features`, `faq`, `impressum`) now has a `Rechtliches` column with Impressum / Datenschutz / AGB links. `signup.html` consent checkbox links to `/agb.html` + `/datenschutz.html` instead of pointing both at impressum. `_supabase-ready/signup.html` updated identically.
- **Invoice generator scaffold shipped.** Vite + React + TypeScript project at `src/generator/`. `npm install` + `npm run build` succeeds — 143 kB bundle (46 kB gzipped) emitted to `<repo-root>/generator/generator.js`. Placeholder `App.tsx` mounts a 4-step stepper (Absender → Empfänger → Positionen → Vorschau) styled to match the existing visual language. CSS hand-rolled — no UI library, no state library, no validation library. Build output and node_modules are gitignored. Not yet wired into `invoice-new.html` — the existing static page stays in place until the generator is feature-complete enough to replace it.
- **Disclaimer.** The legal drafts are competent template work, not lawyer-reviewed. Sufficient for private-beta posture. A German Fachanwalt für IT-Recht must review before public launch — that's now an explicit Active item.

## Next Session — Start Here

1. Open `docs/CURRENT-TASKS.md` Active list, then `src/app/README.md`.
2. Run `git log --oneline -5`.
3. **Starting point: wire real Supabase auth into the SPA.** Concretely:
   - Provision Supabase free-tier project at supabase.com (region: `eu-central-1` Frankfurt). Note the project URL and anon key.
   - Apply `db/schema.sql` via the Supabase SQL editor. Confirm RLS is on for `profiles` + `clients`.
   - In `src/app/`, run `npm install @supabase/supabase-js`.
   - Create `src/app/src/auth/supabase.ts` exporting a typed Supabase client (commit the URL + anon key — they're public-safe).
   - Replace `useSession.ts` mock body with real `supabase.auth.getSession()` + `onAuthStateChange()`.
   - Wire form submit handlers in `routes/login.tsx`, `signup.tsx`, `forgot.tsx`, `callback.tsx` to `supabase.auth.signInWithPassword`, `signUp`, `resetPasswordForEmail`, etc.
   - Test happy path: open `/app/signup` → enter email/pw → check inbox for verify email → click link → land on `/app/callback` → forwarded to `/app/welcome` → click "Los geht's" → onboarding/1.
4. Do the work.
5. Before closing: update **Last Session Summary** + add a `CHANGELOG.md` entry.
