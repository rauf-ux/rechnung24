# Tech Stack

> See [`00-strategy.md`](00-strategy.md). The stack is sized for the **template-tool** positioning: low cost, low operational complexity, no service-tier obligations. Two surfaces, two stacks — see the boundary section below.

## Phase 1 stack — at a glance

```
Marketing pages (7): static HTML + inline CSS + minimal vanilla JS
App surface (/app/*): Vite-React SPA with TypeScript
Auth: Supabase JS SDK (called from inside the SPA)
Backend: Supabase free tier (Auth + Postgres for profiles + clients only)
Hosting: Vercel free tier (klarbill.de)
Domain: klarbill.de
Repo: github.com/rauf-ux/klarbill
```

**No Resend, no DATEV, no Stripe, no SSR, no Next.js — none of it is needed for Phase 1.**

## The boundary: marketing vs. app

| Concern | Marketing | App (`/app/*`) |
|---|---|---|
| Pages | `index.html`, `pricing.html`, `features.html`, `faq.html`, `impressum.html`, `agb.html`, `datenschutz.html` | login, signup, forgot, callback, onboarding/1..3, welcome, done, dashboard, invoices, invoices/new, clients, settings |
| Stack | Static HTML + inline CSS + minimal JS | Vite + React 18 + TypeScript |
| Routing | Direct file paths (`pricing.html`) | `react-router-dom` client-side |
| Layout sharing | None — each page is self-contained, edits via sed when needed | Single `<AppLayout>` component |
| State | None | React state + localStorage for drafts |
| Build | None — files served as-is | `vite build` produces single bundle |
| SEO | Important (Google index) | Irrelevant (auth-gated) |

## App SPA — package layout

The Vite scaffold currently lives at `src/generator/`. It will be renamed `src/app/` once it grows beyond the invoice generator (next session). Eventual layout:

```
src/app/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html             ← single HTML shell, mounted at /app/index.html on prod
└── src/
    ├── main.tsx           ← React mount + Router setup
    ├── App.tsx            ← Top-level routes
    ├── routes/
    │   ├── login.tsx, signup.tsx, forgot.tsx, callback.tsx
    │   ├── onboarding/1.tsx, 2.tsx, 3.tsx
    │   ├── welcome.tsx, done.tsx
    │   ├── dashboard.tsx
    │   ├── invoices/index.tsx, new.tsx
    │   ├── clients.tsx
    │   └── settings.tsx
    ├── layout/
    │   ├── AppLayout.tsx    ← sidebar + topbar + outlet
    │   ├── AuthLayout.tsx   ← centered card for login/signup
    │   └── ProtectedRoute.tsx
    ├── auth/
    │   ├── supabase.ts      ← client init
    │   └── useSession.ts    ← session hook + redirect-on-logout
    ├── lib/
    │   ├── pdf.ts           ← jsPDF rendering for invoices
    │   ├── xrechnung.ts     ← XML serialization
    │   └── calc.ts          ← VAT/€19/totals
    ├── components/
    │   ├── ui/              ← shadcn/ui or hand-rolled primitives
    │   └── ...              ← feature-specific components
    └── styles/
        └── globals.css
```

## Why these specific choices

**Vite (not Next.js, not Webpack).** Single-page apps don't need SSR or file-system routing. Vite gives a sub-second dev loop, sub-megabyte production bundles, and zero ceremony.

**react-router-dom v6 (not TanStack Router).** Boring, ubiquitous, well-documented. v6 has the `loader`/`action` API that pairs cleanly with Supabase data fetching when we get there.

**Supabase JS SDK (no @supabase/ssr).** SSR helpers are unnecessary on a client-side SPA. The plain `@supabase/supabase-js` client handles auth, RLS-protected queries, and realtime — that's all we need.

**TypeScript strict mode.** German tax data (Steuernummer formats, USt-IdNr country prefixes, §19 status, VAT rates as a discriminated union) is exactly the kind of domain that benefits from compile-time enforcement.

**Component library: shadcn/ui (provisional, decision pending).** Copy-paste model, owns the source, no runtime dependency. Tailwind-based, but we can use the unstyled Radix primitives if we want to keep our existing Inter/two-tone palette and CSS-in-files style. Alternative: hand-rolled primitives to match the existing static-page look exactly. To be decided when SPA work begins.

**No state management library.** `useState` + `useReducer` + React Router's loaders are enough for Phase 1. Add Zustand only if a clear cross-route shared state emerges.

**No form library yet.** Native HTML5 validation + per-field controlled inputs + a small custom helper. Add `react-hook-form` + `zod` only if forms become unwieldy (likely once the generator grows).

## Vercel deployment

A single `vercel.json` at repo root configures both surfaces:

```jsonc
{
  // Build the SPA bundle before deploy. Marketing HTML is served as-is.
  "buildCommand": "cd src/app && npm install && npm run build",
  "outputDirectory": ".",

  // SPA fallback: any /app/* URL not matching a real file routes to the SPA shell.
  "rewrites": [
    { "source": "/app/:path*", "destination": "/app/index.html" }
  ]
}
```

Vite is configured (`vite.config.ts`) to write the production bundle to `<repo-root>/app/`, mirroring the URL structure. Marketing HTML files at repo root are unaffected.

## Local Development

```bash
# Marketing pages — open in any static server
python3 -m http.server 8000
open http://localhost:8000

# App surface — Vite dev server with hot reload
cd src/app
npm install
npm run dev   # → http://localhost:5173
```

Two terminals, two ports during development. In production they're served from one domain.

## Auth

Supabase Auth via the JS SDK. Public anon key committed (it's safe — RLS protects data). The `_supabase-ready/*.html` files we kept around were the vanilla-HTML version of auth before the SPA pivot; they remain as a reference but won't be restored. Auth pages will be re-implemented as React routes inside the SPA.

Methods enabled at launch: email + password (with verification). Google OAuth is a Phase 3 nice-to-have.

## Environment Variables

**Phase 1** — committed inline in the SPA source, since they're public:

```ts
// src/app/src/auth/supabase.ts
const SUPABASE_URL = 'https://YOUR-PROJECT-REF.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR-ANON-KEY';
```

(Anon keys are safe to ship to the browser — Row Level Security on the Supabase side is what protects data. The `service_role` key is **never** committed.)

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

Row Level Security: each user can only read/write their own `profiles` row and their own `clients` rows. Type-safe Supabase client comes from `supabase gen types typescript` — wired into the SPA build later.

## Backup Domain

`klarbill.vercel.app` — automatic Vercel-issued fallback if klarbill.de DNS has an issue.
