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
- ✅ **Generator scaffold:** Vite + React + TS at `src/generator/`. `npm run build` produces a 143 kB bundle (46 kB gzipped) at `<repo-root>/generator/`. Build output gitignored. Not yet wired into `invoice-new.html`.

## Active (Phase 1 — Generator MVP)

Ordered roughly by dependency.

- [ ] **`impressum.html` real legal data** — replace placeholders ("Rauf [Nachname]", "Musterstraße 1", "85290 Geisenfeld", VAT-ID `[wird ergänzt]`). Required before any public sign-up. **User's job — Claude can't supply real address data.**
- [ ] **Invoice generator — fill in the form** — scaffold mounts and switches steps; the actual fields, jsPDF rendering, and XRechnung XML serialization are next. Order: (1) Issuer step reads from `profiles`, (2) Recipient step reads from `clients` or accepts ad hoc, (3) Line items step with §19 toggle, (4) Review step renders PDF + XML side by side with download buttons.
- [ ] **Wire generator into `invoice-new.html`** — replace the existing static markup with `<div id="generator-root"></div><script type="module" src="/generator/generator.js"></script>`. Also add `vercel.json` so Vercel runs the build on deploy.
- [ ] **Auth go-live** — restore `_supabase-ready/*.html` to root, create Supabase free-tier project, paste anon key into `supabase.js`. Schema: `profiles` (issuer info) + `clients` (contact list only — no transactions).
- [ ] **AGB + Datenschutz lawyer review** — find a German Fachanwalt für IT-Recht, hand them `agb.html` + `datenschutz.html` + `00-strategy.md`. Until then, no public sign-up.
- [ ] **Pricing copy refresh** — update `pricing.html` once we pick freemium-with-cap vs. PAYG / one-time. Old €9.90/€19.90 tiers no longer match positioning.
- [ ] **`DEPLOY.md` brand cleanup** — update Supabase "App name" config + email-template strings (do at auth go-live, not before).
- [ ] **Rename GitHub repo `rechnung24` → `klarbill`** — then update `README.md` + `docs/06-tech.md` URLs.

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

## Last Session Summary (2026-05-01, late evening)

- **Legal scaffolding drafted.** Three new pages on the new template-tool framing:
  - **`agb.html`** — 10-section Allgemeine Geschäftsbedingungen in German. Codifies that Klarbill is a software tool (not advice), that the user is responsible for legal correctness / GoBD archival / transmission / tax treatment, that no invoice content is stored on Klarbill servers, and that Klarbill is not an Art. 28 DSGVO processor for invoice data. Liability capped under standard German Kardinalpflichten regime. Bears a yellow "vorläufige Fassung — anwaltliche Prüfung steht aus" notice; private-beta posture until reviewed.
  - **`datenschutz.html`** — full DSGVO privacy policy with a green "Was Klarbill *nicht* verarbeitet" highlight box up top. Table mapping each data category (Account, Profil, Kundenliste, Logs) to its specific data, purpose, and Art. 6 legal basis. Sub-processors listed: Vercel (EU), Supabase (EU). Standard sections for retention, cookies, Betroffenenrechte, BayLDA Beschwerderecht.
  - **`impressum.html` trimmed** — old in-page Datenschutzerklärung removed (it contradicted the new positioning by claiming Klarbill stores invoice data). Now contains only the §5 TMG Anbieterkennzeichnung + cross-links to `/datenschutz.html` and `/agb.html`.
  - **Footers updated site-wide** — every marketing page (`index`, `pricing`, `features`, `faq`, `impressum`) now has a `Rechtliches` column with Impressum / Datenschutz / AGB links. `signup.html` consent checkbox links to `/agb.html` + `/datenschutz.html` instead of pointing both at impressum. `_supabase-ready/signup.html` updated identically.
- **Invoice generator scaffold shipped.** Vite + React + TypeScript project at `src/generator/`. `npm install` + `npm run build` succeeds — 143 kB bundle (46 kB gzipped) emitted to `<repo-root>/generator/generator.js`. Placeholder `App.tsx` mounts a 4-step stepper (Absender → Empfänger → Positionen → Vorschau) styled to match the existing visual language. CSS hand-rolled — no UI library, no state library, no validation library. Build output and node_modules are gitignored. Not yet wired into `invoice-new.html` — the existing static page stays in place until the generator is feature-complete enough to replace it.
- **Disclaimer.** The legal drafts are competent template work, not lawyer-reviewed. Sufficient for private-beta posture. A German Fachanwalt für IT-Recht must review before public launch — that's now an explicit Active item.

## Next Session — Start Here

1. Open `docs/CURRENT-TASKS.md`, then `docs/00-strategy.md`.
2. Run `git log --oneline -5`.
3. **Likely starting point: fill in the invoice generator form.** The scaffold mounts and switches steps; the next chunk of work is the Issuer step. Open `src/generator/src/App.tsx` and start replacing the placeholder body with real form fields. Add a `types.ts` with `IssuerProfile`, `Recipient`, `LineItem`, `Invoice` — those will become both the form state and the inputs to the PDF/XML serializers.
4. Do the work.
5. Before closing: update **Last Session Summary** + add a `CHANGELOG.md` entry.
