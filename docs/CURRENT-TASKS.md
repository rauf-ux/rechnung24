# Current Tasks

> **Resume protocol:** read this file first when starting a new session. Then read [`00-strategy.md`](00-strategy.md) — it defines what Klarbill is and is not, and overrides anything in this file that contradicts it. Update this file at the end of each session.

**Last updated:** 2026-05-01 (strategic pivot to template-tool model)

## Setup state

- ✅ **Lokal repo:** `~/Projects/klarbill/` — connected to GitHub via gh CLI
- ✅ **Cowork workspace:** mounted on lokal repo (Drive folder is now archive only)
- ✅ **Git identity:** Rauf / rauf@investaz.az — commits work
- ✅ **Logo:** klarbill wordmark live on klarbill.de
- ✅ **i-dot fix:** pushed (commit `ea0f650`)
- ✅ **Brand copy:** all user-facing HTML now says "Klarbill" (Rechnung24 fully swept)
- ✅ **Strategy locked:** Klarbill is a template tool (see `00-strategy.md`), not a SaaS bookkeeping platform — minimum-budget, no GoBD/DATEV liability, client-side invoice generation

## Active (Phase 1 — Generator MVP)

Ordered roughly by dependency. Top three are blocking everything else.

- [ ] **AGB + Datenschutzerklärung + Impressum drafts** — codify the three liability clauses from `04-compliance.md` (template tool, user-responsibility, no Art. 28 processor). Lawyer review pending; until then launch posture is private beta only.
- [ ] **`impressum.html` real legal data** — replace placeholders ("Rauf [Nachname]", "Musterstraße 1", "85290 Geisenfeld", VAT-ID `[wird ergänzt]`). Required before any public sign-up.
- [ ] **Invoice generator MVP** — Vite + React island mounted on `invoice-new.html`. Multi-step form, client-side PDF (jsPDF or pdfmake) + XRechnung XML, §19 toggle, draft auto-save to localStorage. **This is the actual product.**
- [ ] **Auth go-live** — restore `_supabase-ready/*.html` to root, create Supabase free-tier project, paste anon key into `supabase.js`. Schema: `profiles` (issuer info) + `clients` (contact list only — no transactions).
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

## Last Session Summary (2026-05-01, end-of-day)

- **Strategic pivot logged.** Klarbill is now positioned as a software **template tool**, not a full bookkeeping SaaS. Goal: minimum-budget operation (~€1/mo at Phase 1), zero liability for invoice content (client-side generation only), focused on solo freelancers and small B2B parties issuing invoices to known counterparts.
- **New `docs/00-strategy.md`** — single source of truth for positioning, scope, what-not-to-build, liability stance, cost model, architecture decision (static HTML for marketing + Vite-React island for the generator + Supabase free tier auth).
- **`docs/01-product.md`, `04-compliance.md`, `05-roadmap.md`, `06-tech.md` rewritten** to align with the new framing. Old subscription pricing (€9.90 / €19.90) deprecated. DATEV, recurring invoices, mobile app, GoBD archive moved to "maybe later." Compliance reframed from "Klarbill complies" to "user is responsible, here's how Klarbill helps."
- **Active task list re-prioritized.** Top three: AGB drafts, real impressum legal data, invoice generator MVP. Old "auth go-live" demoted; can wait until AGB exists.

## Next Session — Start Here

1. Open this file. Then open `docs/00-strategy.md`.
2. Run `git log --oneline -5`.
3. Pick top "Active" item. **Likely starting point: invoice generator MVP** — the one piece that turns Klarbill from a static site into a product. Concretely: scaffold a Vite React project under `src/generator/`, sketch the multi-step form, get a placeholder PDF generating client-side.
4. Do the work.
5. Before closing: update **Last Session Summary** + add a `CHANGELOG.md` entry.
