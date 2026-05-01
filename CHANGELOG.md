# Changelog

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
