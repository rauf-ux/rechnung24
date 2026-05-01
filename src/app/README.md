# Klarbill App (SPA)

Vite + React + TypeScript single-page application served at `klarbill.de/app/*`. Per [`docs/00-strategy.md`](../../docs/00-strategy.md) § Architecture decision, the marketing surface stays static HTML; everything behind login lives here.

## What's inside

```
src/app/
├── index.html                  ← single SPA shell, served as /app/index.html in prod
├── package.json
├── vite.config.ts              ← outputs to <repo-root>/app/, base /app/ in prod
├── tailwind.config.js          ← Klarbill design tokens
├── postcss.config.js
├── components.json             ← shadcn/ui config
├── tsconfig.json               ← @/* path alias
└── src/
    ├── main.tsx                ← React mount + BrowserRouter (basename=/app in prod)
    ├── App.tsx                 ← top-level route table
    ├── index.css               ← Tailwind directives + theme CSS vars
    ├── auth/
    │   └── useSession.ts       ← MOCK — returns {user:null} until Supabase wires
    ├── layout/
    │   ├── AppLayout.tsx       ← sidebar + topbar (mobile bottom nav) for authed routes
    │   ├── AuthLayout.tsx      ← centered card for login/signup/forgot/callback/welcome/done
    │   ├── OnboardingLayout.tsx← focused single-card with 3-dot progress
    │   └── ProtectedRoute.tsx  ← redirect to /login if no session, preserves ?next=
    ├── components/
    │   └── ui/
    │       ├── button.tsx      ← shadcn-style primitive, variants tuned to Klarbill
    │       ├── input.tsx
    │       └── card.tsx
    ├── lib/
    │   └── utils.ts            ← cn() helper
    └── routes/
        ├── login.tsx, signup.tsx, forgot.tsx, callback.tsx
        ├── welcome.tsx, done.tsx
        ├── onboarding/step-1.tsx, step-2.tsx, step-3.tsx
        ├── dashboard.tsx
        ├── invoices/list.tsx, new.tsx
        ├── clients.tsx
        └── settings.tsx
```

## Local development

```bash
cd src/app
npm install
npm run dev
```

Vite serves at `http://localhost:5173/` with `basename=""` — so internal routes like `/login` map to `localhost:5173/login`. Hot reload works.

To preview the authenticated routes without wiring real auth, append `?dev-user=1` to any URL — `useSession` will return a fake user and `ProtectedRoute` lets you through.

## Production build

```bash
npm run build
```

Emits to `<repo-root>/app/`:

```
app/
├── index.html
└── assets/
    ├── main-[hash].js
    └── index-[hash].css
```

Vercel serves these as `klarbill.de/app/index.html` + assets, with the rewrite rule in `<repo-root>/vercel.json` sending all `/app/*` URLs to `/app/index.html` so React Router takes over.

## Status

**Phase 1 — SPA shell shipped.** All 14 routes mount with placeholder content styled to match the existing visual language. Auth is mocked; `useSession` always returns `{ user: null }` (or a fake user with `?dev-user=1`).

**Next:**

1. Wire real Supabase auth into `useSession` and the login/signup/forgot/callback routes.
2. Replace `invoices/new.tsx` placeholder with the real multi-step generator (Absender → Empfänger → Positionen → Vorschau, plus jsPDF + XRechnung XML serialization).
3. Wire `dashboard.tsx`, `clients.tsx`, `settings.tsx` to real Supabase data.

## Decisions deliberately deferred

- **Form library.** Native controlled inputs are fine until the invoice generator's line-items step starts pushing complexity. Add `react-hook-form` + `zod` only when the pain shows up.
- **State management library.** `useState`/`useReducer` + React Router loaders are enough for Phase 1.
- **PDF font.** jsPDF default Helvetica for v1 — trying to match Inter inside the PDF isn't worth the embedding effort.
- **XRechnung profile.** UBL 2.1 (decided in `00-strategy.md`); CII deferred unless a recipient explicitly demands it.
