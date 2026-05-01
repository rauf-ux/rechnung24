# Current Tasks

> **Resume protocol:** read this file first when starting a new session. Update at the end of each session.

**Last updated:** 2026-05-01

## Active

- [ ] **Switch to terminal-based workflow** — read `TERMINAL-SETUP.md`. One-time setup (~15 min): install gh CLI, clone repo to `~/Projects/klarbill/`, copy Drive contents into clone, push, switch Cowork workspace to local folder. After this, every deploy is `./deploy.sh "msg"` = 5 seconds. Drive becomes archive.
- [ ] **Upload 18 logo-updated pages** — happens automatically as part of TERMINAL-SETUP Faza 2.5 (one big commit). No more web drag-drop.
- [ ] **Brand audit (Rechnung24 → klarbill)** — site logo is now klarbill, but `<title>`, `<meta description>`, footer text and email templates still say "Rechnung24" in 18 files (55 occurrences). Decide: keep dual-brand temporarily or full rebrand?
- [ ] **Auth — go-live checklist** *(skipped for now per user request)* — create Supabase project, configure Google OAuth, see `DEPLOY.md`.
- [ ] **Logo design** — finalize SVG, prepare 3 size variants (16/32/512)
- [ ] **Market validation** — outreach on LinkedIn + r/selbststaendig
- [ ] **Design-system audit** — extract spacing scale + radii from existing HTML, formalize into `docs/02-design-system.md`

## Up Next

- [ ] Apply `guard.js` to all `/app/*` and `/onboarding/*` pages
- [ ] Wire onboarding flow (welcome → 1 → 2 → 3 → done) to `profiles` table via `klarbillAuth.updateProfile`
- [ ] Custom SMTP via Resend (escape Supabase 4-emails/hour limit before launch)
- [ ] Add user-menu (avatar + logout) to app shell header
- [ ] FAQ mobile breakpoint review
- [ ] Onboarding-2 form validation polish
- [ ] Pricing page CTA copy iteration
- [ ] Set up Tailwind config from design tokens (prep for Next.js migration)

## Blockers / Open Questions

- (none recorded)

## Last Session Summary (2026-04-30)

- **Auth system built** (Supabase + email/password + Google OAuth + email verification):
  - `db/schema.sql` — `profiles` table, RLS policies, auto-create trigger on `auth.users` insert
  - `lib/auth.js` — Supabase wrapper (`window.klarbillAuth`): signup/login/Google/reset/profile/strength meter/German error map
  - `lib/config.js` — public config (Supabase URL + anon key)
  - `lib/guard.js` — drop-in session guard for protected pages
  - `auth/signup.html`, `auth/login.html`, `auth/forgot.html`, `auth/callback.html`
  - `auth/auth.css` — shared auth styles, all design-token-aligned
  - `docs/07-auth-setup.md` — Supabase + Google OAuth setup guide w/ smoke test + troubleshooting
  - `docs/06-tech.md` updated with current + future env-var lists
- Polished `README.md` for GitHub: hero + badges, features, tech-stack table, quick-start, project structure, demo accounts, roadmap, contributing, license.
- Restructured backup from corrupted `.docx` into modular `docs/` folder.
- Established resume protocol: read `CURRENT-TASKS.md` first.

## Next Session — Start Here

1. Open this file.
2. Pick top "Active" item.
3. Do the work.
4. Before closing: update **Last Session Summary** + move completed items to `CHANGELOG.md`.
