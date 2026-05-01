# Current Tasks

> **Resume protocol:** read this file first when starting a new session. Update at the end of each session.

**Last updated:** 2026-05-01 (terminal workflow live)

## Setup state

- ✅ **Lokal repo:** `~/Projects/klarbill/` — connected to GitHub via gh CLI
- ✅ **Cowork workspace:** mounted on lokal repo (Drive folder is now archive only)
- ✅ **Git identity:** Rauf / rauf@investaz.az — commits work
- ✅ **Logo:** klarbill wordmark live on klarbill.de (top-bar + footer/sidebar across 18 pages)
- ⏳ **i-dot fix** — pushed locally, awaiting commit + push (or already done — check `git log`)

## Active

- [ ] **`deploy.sh` helper script** — `TERMINAL-SETUP.md` Faza 5 (one-line deploy)
- [ ] **Brand audit (Rechnung24 → klarbill)** — logo is klarbill but `<title>`, `<meta description>`, footer text and 55 other text mentions still say "Rechnung24" across 18 files
- [ ] **Favicon** — generate compact icon (just "k" or "kb"), add `<link rel="icon" type="image/svg+xml" href="/logo.svg">` to all pages
- [ ] **Open Graph image** — 1200×630 social share preview (logo + tagline)
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

## Last Session Summary (2026-05-01)

- **Logo rolled out site-wide** — replaced fake "R" placeholder with real klarbill wordmark SVG (qara "klar" + macenta "bill") across 19 HTML files (29 instances: top-bar, sidebar, footer). 32px height for primary, 28px for footer.
- **Discovered + fixed i-dot rendering bug** — original SVG combined the dot and i-body into a single `<path>` with `ZM` subpath syntax. Some browsers clipped the dot. Split into separate `<circle>` + `<path>` (33 replacements across 23 HTML files + logo.svg).
- **Migrated from Drive workflow to terminal-based** — installed Homebrew + gh CLI on user's Mac, authenticated GitHub, cloned repo to `~/Projects/klarbill/`, consolidated Drive contents (HTML + docs + db + _supabase-ready + README + CHANGELOG + DEPLOY guides) into the repo.
- **First terminal-driven push:** 39 files, 3522 insertions, +113 deletions. Vercel auto-deploy successful.
- Cowork workspace switched to lokal repo — Claude no longer needs to fetch from GitHub each session (~95% token savings).
- Auth pages (`signup`, `login`, `forgot`) reverted to logo-only versions; Supabase-wired versions backed up to `_supabase-ready/`.

## Next Session — Start Here

1. Open this file.
2. Run `git log --oneline -5` to see recent commits.
3. Pick top "Active" item — likely candidates: brand audit (Rechnung24→klarbill), favicon, or `deploy.sh`.
4. Do the work.
5. Before closing: update **Last Session Summary** + move completed items to `CHANGELOG.md`.
