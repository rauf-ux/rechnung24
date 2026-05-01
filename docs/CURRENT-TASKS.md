# Current Tasks

> **Resume protocol:** read this file first when starting a new session. Update at the end of each session.

**Last updated:** 2026-05-01 (brand audit complete)

## Setup state

- ✅ **Lokal repo:** `~/Projects/klarbill/` — connected to GitHub via gh CLI
- ✅ **Cowork workspace:** mounted on lokal repo (Drive folder is now archive only)
- ✅ **Git identity:** Rauf / rauf@investaz.az — commits work
- ✅ **Logo:** klarbill wordmark live on klarbill.de (top-bar + footer/sidebar across 18 pages)
- ✅ **i-dot fix:** pushed (commit `ea0f650`)
- ✅ **Brand copy:** all user-facing HTML now says "Klarbill" (51 swaps across 18 root files + 8 in `_supabase-ready/`)

## Active

- [ ] **`deploy.sh` helper script** — `TERMINAL-SETUP.md` Faza 5 (one-line deploy)
- [ ] **Favicon** — generate compact icon (just "k" or "kb"), add `<link rel="icon" type="image/svg+xml" href="/logo.svg">` to all pages
- [ ] **Open Graph image** — 1200×630 social share preview (logo + tagline)
- [ ] **Rename GitHub repo `rechnung24` → `klarbill`** — then update `README.md` + `docs/06-tech.md` URLs (currently still point to `github.com/rauf-ux/rechnung24`)
- [ ] **`DEPLOY.md` brand cleanup** — update Supabase "App name" config + email-template strings to match Klarbill (do this together with actual Supabase config update at auth go-live)
- [ ] **`impressum.html` real legal data** — replace placeholders ("Rauf [Nachname]", "Musterstraße 1", "85290 Geisenfeld", VAT-ID `[wird ergänzt]`) with real values before public launch
- [ ] **Auth — go-live** *(skipped per user request)* — when ready, restore `_supabase-ready/*.html` to root, add Supabase keys, see `DEPLOY.md` + `docs/07-auth-setup.md`
- [ ] **Design-system audit** — extract spacing scale + radii from existing HTML, formalize into `docs/02-design-system.md`
- [ ] **Market validation** — outreach on LinkedIn + r/selbststaendig

## Up Next

- [ ] Apply session guard to `/app/*` + `/onboarding/*` pages (when auth is on)
- [ ] Wire onboarding flow to `profiles` table
- [ ] Custom SMTP via Resend (escape Supabase 4-emails/hour limit)
- [ ] User-menu in app shell header (avatar + logout)
- [ ] FAQ mobile breakpoint review
- [ ] Onboarding-2 form validation polish
- [ ] Pricing CTA copy iteration
- [ ] Tailwind config from design tokens (prep for Next.js migration)

## Blockers / Open Questions

- (none recorded)

## Workflow reminder

We are now on **terminal-based workflow**. Drive folder (`/Users/.../KlarBill/`) is archive only — do NOT edit there.

Source of truth: `/Users/rauf/Projects/klarbill/` (lokal git repo).

Daily loop:
1. Claude edits files in `~/Projects/klarbill/` directly
2. User runs:
   ```bash
   cd ~/Projects/klarbill
   git add . && git commit -m "msg" && git push
   ```
   (or `./deploy.sh "msg"` once Faza 5 is set up)
3. Vercel auto-deploys → klarbill.de

## Last Session Summary (2026-05-01, late)

- **Brand audit complete (Rechnung24 → Klarbill).** Single sed pass on all 18 root `*.html` files swapped 51 user-facing occurrences: page titles, meta descriptions, footer copyright, FAQ + features inline prose, welcome `<h1>`, and the impressum `<strong>` legal-name placeholder. Same pass applied to 4 `_supabase-ready/*.html` auth backups (8 swaps) so they stay consistent for restore. Contact email updated `hallo@rechnung24.de` → `hallo@klarbill.de`. Convention: capitalized **Klarbill** in prose/titles, lowercase `klarbill` reserved for the wordmark and domain (matches `README.md`).
- **Verification:** repo-wide `grep -i rechnung24` confirmed zero stray matches in production HTML. Spot-checked titles, footers, meta descriptions, impressum block. HTML structure intact (html/body tags balanced across all 19 files).
- **Out-of-scope but flagged as new Active items:** GitHub repo rename (`rechnung24` → `klarbill` — affects `README.md` + `docs/06-tech.md` URLs), `DEPLOY.md` Supabase + email-template strings, and replacing placeholder legal data in `impressum.html`.

## Next Session — Start Here

1. Open this file.
2. Run `git log --oneline -5` to see recent commits.
3. Pick top "Active" item — likely candidates now: **`deploy.sh`** (smallest, biggest dev-loop win), then **favicon + OG image** (brand-visible, ships together).
4. Do the work.
5. Before closing: update **Last Session Summary** + add a `CHANGELOG.md` entry.
