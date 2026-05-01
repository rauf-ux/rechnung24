# Current Tasks

> **Resume protocol:** read this file first when starting a new session. Then read [`00-strategy.md`](00-strategy.md) — it defines what Klarbill is and is not, and overrides anything in this file that contradicts it. Update this file at the end of each session.

**Last updated:** 2026-05-01 (legal pages drafted + generator scaffolded)

## Setup state

- ✅ **Lokal repo:** `~/Projects/klarbill/` — connected to GitHub via gh CLI
- ✅ **Cowork workspace:** mounted on lokal repo (Drive folder is now archive only)
- ✅ **Git identity:** Rauf / rauf@investaz.az — commits work
- ✅ **Logo:** klarbill wordmark live on klarbill.de
- ✅ **i-dot fix:** pushed (commit `ea0f650`)
- ✅ **Brand copy:** all user-facing HTML now says "Klarbill" (Rechnung24 fully swept)
- ✅ **Strategy locked:** Klarbill is a template tool (see `00-strategy.md`)
- ✅ **Legal scaffolding:** `agb.html` + `datenschutz.html` drafted with template-tool framing. `impressum.html` trimmed (old contradictory privacy-policy section removed). Footer links updated site-wide. Lawyer review still pending — launch posture remains private beta.
- ✅ **Generator scaffold:** Vite + React + TS at `src/generator/`. `npm run build` produces a 143 kB bundle (46 kB gzipped). Will be renamed `src/app/` and grown into the full `/app/*` SPA.
- ✅ **Architecture refined:** marketing pages stay static HTML (7 files); everything behind login becomes a Vite-React SPA at `klarbill.de/app/*`. Generator scaffold is the seed of this SPA, not a one-off island. See `00-strategy.md` § Architecture decision.

## Active (Phase 1 — App SPA + Generator)

Ordered by dependency.

- [ ] **Build the `/app/*` SPA shell** — extend the Vite scaffold:
  - Rename `src/generator/` → `src/app/`
  - Add `react-router-dom` v6 with placeholder routes for login/signup/forgot/callback/onboarding/dashboard/invoices/clients/settings
  - `<AppLayout>` (sidebar + topbar + outlet) and `<AuthLayout>` (centered card)
  - `<ProtectedRoute>` wrapper (redirects to `/app/login` when no session — mock until auth is wired)
  - Decide component primitive layer: shadcn/ui (Tailwind) vs. hand-rolled (matches existing CSS-in-files style)
  - `vercel.json` at repo root with `/app/*` → `/app/index.html` rewrite
- [ ] **Auth inside the SPA** — Supabase JS SDK, `useSession()` hook, real Supabase project provisioned, login/signup/forgot/callback routes wired
- [ ] **Invoice generator forms** — extend scaffold's 4-step placeholder with real fields, §19 toggle, draft auto-save, jsPDF rendering, XRechnung XML serialization (UBL 2.1)
- [ ] **`impressum.html` real legal data** — replace placeholders. Required before any public sign-up. **User's job — Claude can't supply real address data.**
- [ ] **Marketing → app handoff** — `signup.html`, `login.html`, `welcome.html` etc. redirect to `/app/signup`, `/app/login`, `/app/welcome` (or get retired entirely)
- [ ] **AGB + Datenschutz lawyer review** — find a German Fachanwalt für IT-Recht, hand them `agb.html` + `datenschutz.html` + `00-strategy.md`. Until then, no public sign-up.
- [ ] **Pricing copy refresh** — update `pricing.html` once we pick freemium-with-cap vs. PAYG / one-time.
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

1. Open `docs/CURRENT-TASKS.md`, then `docs/00-strategy.md` § Architecture decision, then `docs/06-tech.md`.
2. Run `git log --oneline -5`.
3. **Starting point: build the `/app/*` SPA shell.** Concretely:
   - Rename `src/generator/` → `src/app/`. Update `vite.config.ts` `outDir` from `../../generator` to `../../app`.
   - `npm install react-router-dom`
   - Replace `App.tsx` with a `<BrowserRouter basename="/app">` containing placeholder routes (`<Routes>` for login, signup, forgot, callback, dashboard, invoices, invoices/new, clients, settings, onboarding/1..3, welcome, done)
   - Build `<AppLayout>` (sidebar + topbar + `<Outlet/>`) and `<AuthLayout>` (centered card). Match existing visual language: Inter, #0A0A0B / #9e005d palette, 8/10/16 radii.
   - Build `<ProtectedRoute>` that wraps app routes — for now, mock the session (`useSession` returns `{ user: null }` initially).
   - Add `vercel.json` at repo root: `{ "buildCommand": "cd src/app && npm install && npm run build", "outputDirectory": ".", "rewrites": [{ "source": "/app/:path*", "destination": "/app/index.html" }] }`
   - Decide upfront: **shadcn/ui or hand-rolled primitives?** Ask the user before installing Tailwind — it's an irreversible-ish choice.
4. Do the work.
5. Before closing: update **Last Session Summary** + add a `CHANGELOG.md` entry.
