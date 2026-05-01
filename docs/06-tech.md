# Tech Stack

> See [`00-strategy.md`](00-strategy.md). The stack is sized for the **template-tool** positioning: low cost, low operational complexity, no service-tier obligations.

## Current — Phase 1 stack

```
Marketing pages: Static HTML + inline CSS + minimal vanilla JS
Invoice generator: React island (Vite-bundled) mounted on invoice-new.html
Auth pages: Vanilla HTML + Supabase JS SDK from CDN
Backend: Supabase free tier (Auth + Postgres for profiles + clients only)
Hosting: Vercel free tier (klarbill.de)
Domain: klarbill.de
Repo: github.com/rauf-ux/rechnung24 (rename to klarbill pending)
```

**No Resend, no DATEV, no Stripe, no server-side rendering, no Next.js — none of it is needed for Phase 1.**

## Why a React island instead of a full SPA or Next.js

The 18 marketing pages don't need React — they're static, indexed by Google as-is, and load fast. Migrating them adds work and removes value.

The one place that benefits from React is the invoice generator: a multi-step form with cross-field validation, line-item arrays, live preview, §19 toggle that mutates VAT calculations, and PDF/XML output. That's the spot where vanilla JS gets painful and React earns its keep.

So: leave the marketing site alone, build a single React component, mount it on `invoice-new.html`, ship.

## Why Vite (not Next.js)

For a single React component on one page, Next.js is overkill — it brings SSR, file-based routing, middleware, image optimization, and an opinionated build pipeline. None of it is needed.

Vite gives a simple `npm run build` that produces one JS bundle and one CSS file. Drop the bundle into `invoice-new.html` via a `<script type="module" src="/dist/generator.js">` tag. Vercel serves it. Done.

If Phase 2 validation justifies a full SPA, migration from a Vite React island to Next.js or a Vite SPA is a few days, not weeks.

## Local Development

```bash
git clone https://github.com/rauf-ux/rechnung24.git   # rename pending
cd rechnung24

# Static server for marketing pages
python3 -m http.server 8000
# or
npx serve .

# When the generator exists:
cd src/generator && npm install && npm run dev
```

## Deployment

```bash
git push origin main
# Vercel auto-deploys: https://klarbill.de
```

Vercel auto-builds the Vite bundle (when present) via a build step in `vercel.json`. Marketing HTML deploys as-is.

## Auth

Supabase Auth via the JS SDK loaded from CDN. Public anon key is committed to `_supabase-ready/supabase.js`; the `service_role` key is **never** committed. Full setup walkthrough in [`07-auth-setup.md`](07-auth-setup.md).

Methods enabled at launch: email + password (with verification). Google OAuth is a Phase 3 nice-to-have.

## Environment Variables

**Phase 1** — values pasted directly into `_supabase-ready/supabase.js`:

```js
SUPABASE_URL:      'https://YOUR-PROJECT-REF.supabase.co'
SUPABASE_ANON_KEY: 'YOUR-ANON-KEY'
```

(The anon key is safe to ship to the browser — Row Level Security on the Supabase side is what protects data.)

**Phase 3 (if Stripe is added)**

```env
STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

A small Vercel serverless function will handle Stripe webhooks. Until then, no `.env` file is needed.

## Database

Phase 1 schema (see `db/schema.sql`):

- `profiles` (1:1 with `auth.users`) — issuer's company info: name, address, Steuernummer, USt-IdNr, IBAN, BIC, default §19 status.
- `clients` — recipient contact list: name, address, optional VAT ID. No transaction data.

Explicitly **not** stored:

- Invoice content (line items, totals, PDFs, XMLs).
- Sequential invoice numbers (the user maintains their own).
- Payment status, sent/paid timestamps, attachments.

Row Level Security: each user can only read/write their own `profiles` row and their own `clients` rows.

## Backup Domain

`klarbill.vercel.app` — automatic Vercel-issued fallback if klarbill.de DNS has an issue.
