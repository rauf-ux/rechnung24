# Tech Stack

## Current (MVP Prototype)

```
Frontend: Static HTML + CSS + JavaScript
Hosting:  Vercel (klarbill.de)
Domain:   GoDaddy (klarbill.de)
Repo:     github.com/rauf-ux/rechnung24
```

## Planned (Real SaaS)

```
Frontend: Next.js 14 + TypeScript + Tailwind
Backend:  Supabase (PostgreSQL + Auth + Storage)
Payments: Stripe (Subscriptions + Connect)
Email:    Resend
Hosting:  Vercel
```

## Local Development

```bash
git clone https://github.com/rauf-ux/rechnung24.git
cd rechnung24

# Static server
python -m http.server 8000
# or
npx http-server

open http://localhost:8000
```

## Deployment

```bash
# Auto-deploy via Vercel
git push origin main
# Live: https://klarbill.de
```

## Auth (Live)

Static-HTML build uses Supabase Auth via the JS SDK loaded from CDN. Public config lives in [`lib/config.js`](../lib/config.js); never commit the `service_role` key. Full setup in [`docs/07-auth-setup.md`](07-auth-setup.md).

Methods enabled: email + password (with verification), Google OAuth.

## Environment Variables

**Now (static MVP)** — values pasted directly into `lib/config.js`:

```js
SUPABASE_URL:      'https://YOUR-PROJECT-REF.supabase.co'
SUPABASE_ANON_KEY: 'YOUR-ANON-KEY'
```

**Future (Next.js)**

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
RESEND_API_KEY=
GOOGLE_OAUTH_CLIENT_ID=
GOOGLE_OAUTH_CLIENT_SECRET=
```

## Backup Domain

`klarbill.vercel.app` — fallback if klarbill.de is down.
