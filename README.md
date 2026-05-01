<div align="center">
  <img src="logo.svg" alt="Klarbill" width="120" />

  <h1>Klarbill</h1>

  <p><strong>XRechnung-conformant invoicing for German freelancers.</strong><br/>
  60-second workflow · 4× cheaper than the suites · 2027-ready.</p>

  <p>
    <a href="https://klarbill.de"><img alt="Live" src="https://img.shields.io/badge/live-klarbill.de-4F46E5?style=flat-square" /></a>
    <a href="docs/05-roadmap.md"><img alt="Status" src="https://img.shields.io/badge/status-MVP%20prototype-F59E0B?style=flat-square" /></a>
    <a href="docs/06-tech.md"><img alt="Stack" src="https://img.shields.io/badge/stack-Next.js%2014%20%C2%B7%20Supabase%20%C2%B7%20Stripe-0A0A0B?style=flat-square" /></a>
    <a href="#license"><img alt="License" src="https://img.shields.io/badge/license-Proprietary-lightgrey?style=flat-square" /></a>
  </p>

  <p>
    <a href="https://klarbill.de">Live Demo</a> ·
    <a href="docs/">Documentation</a> ·
    <a href="docs/05-roadmap.md">Roadmap</a> ·
    <a href="https://github.com/rauf-ux/rechnung24/issues">Report Issue</a>
  </p>
</div>

---

## Why Klarbill

Starting **January 2027**, every B2B invoice in Germany must be issued in the XRechnung format. Existing tools (Lexoffice, sevDesk) bundle invoicing with full bookkeeping at €40–€50/month — overkill for the solo freelancer who just needs to bill a client.

**Klarbill** is the focused alternative: mobile-first, XRechnung-ready from day one, priced for one-person businesses, and aligned with German tax law (UStG §14, §19 Kleinunternehmer, GoBD).

## Features

- **60-second invoice flow** — from blank screen to PDF + XRechnung XML
- **§19 Kleinunternehmer mode** — VAT logic that matches your tax status
- **Mobile-first** — issue invoices from your phone in seconds
- **DATEV export** *(Pro)* — clean handoff to your tax advisor
- **Recurring invoices** *(Pro)* — set it once, bill monthly
- **Bilingual UI** — German + English

## Tech Stack

| Layer    | Current (MVP)        | Planned                                |
|----------|----------------------|----------------------------------------|
| Frontend | HTML · CSS · JS      | Next.js 14 · TypeScript · Tailwind     |
| Backend  | — *(static)*         | Supabase (Postgres · Auth · Storage)   |
| Payments | —                    | Stripe (Subscriptions)                 |
| Email    | —                    | Resend                                 |
| Hosting  | Vercel               | Vercel                                 |

## Quick Start

```bash
git clone https://github.com/rauf-ux/rechnung24.git
cd rechnung24

# serve the static prototype
python -m http.server 8000
# or
npx http-server

open http://localhost:8000
```

Production auto-deploys on `git push origin main` via Vercel → [klarbill.de](https://klarbill.de).

## Project Structure

```
klarbill/
├── public/        Marketing & legal pages (5)
├── auth/          Authentication flow (3)
├── onboarding/    First-time setup (5)
└── app/           Main application (5)
```

18 pages total. See [`docs/03-pages.md`](docs/03-pages.md) for the page-by-page breakdown.

## Demo Accounts

| Plan    | Email                | Password           |
|---------|----------------------|--------------------|
| Starter | `demo@klarbill.de`   | `KlarbillDemo2026` |
| Pro     | `pro@klarbill.de`    | `KlarbillDemo2026` |

## Documentation

| File | Purpose |
|------|---------|
| [`docs/01-product.md`](docs/01-product.md) | Problem, audience, pricing, competitor analysis |
| [`docs/02-design-system.md`](docs/02-design-system.md) | Colors, typography, layout tokens |
| [`docs/03-pages.md`](docs/03-pages.md) | All 18 pages, structure, status |
| [`docs/04-compliance.md`](docs/04-compliance.md) | XRechnung, UStG §14 / §19, GoBD |
| [`docs/05-roadmap.md`](docs/05-roadmap.md) | Phases, timelines, business model |
| [`docs/06-tech.md`](docs/06-tech.md) | Stack, deployment, env vars |
| [`docs/07-auth-setup.md`](docs/07-auth-setup.md) | Supabase + Google OAuth setup walkthrough |
| [`docs/CURRENT-TASKS.md`](docs/CURRENT-TASKS.md) | **Active work — read first when resuming** |
| [`CHANGELOG.md`](CHANGELOG.md) | Session-by-session changes |

## Resume Protocol

Starting a fresh session?

> "Read `docs/CURRENT-TASKS.md` and continue."

That single file restores working context. Skip the full backup unless you need historical detail.

## Roadmap

- **Phase 1 — Validation** *(current)* · prototype, brand, market signals
- **Phase 2 — Real SaaS** *(Q3 2026)* · Next.js + Supabase, XRechnung export
- **Phase 3 — Business** *(Q4 2026)* · Stripe billing, recurring invoices, DATEV
- **Phase 4 — Growth** *(2027)* · tax-advisor API, team accounts, white-label

Full breakdown in [`docs/05-roadmap.md`](docs/05-roadmap.md).

## Contributing

This is currently a closed-source solo project. Bug reports and feature suggestions via [GitHub Issues](https://github.com/rauf-ux/rechnung24/issues) are welcome.

## License

Proprietary. All rights reserved © 2026 Klarbill.

## Contact

[hallo@klarbill.de](mailto:hallo@klarbill.de) · [klarbill.de](https://klarbill.de) · [github.com/rauf-ux/rechnung24](https://github.com/rauf-ux/rechnung24)
