# Auth Setup Guide

End-to-end setup for the Klarbill authentication system (Supabase + Google OAuth).

**Time estimate:** ~30 minutes
**Prerequisites:** Supabase account, Google Cloud account, access to the `klarbill.de` DNS or Vercel environment.

---

## 1. Create the Supabase project

1. Go to [supabase.com](https://supabase.com) → **New project**.
2. Name: `klarbill-prod` · Region: `eu-central-1` (Frankfurt) — closest to German users.
3. Set a strong DB password — store it in 1Password as `Klarbill / Supabase / DB password`.
4. Wait ~2 minutes for provisioning.

## 2. Run the database schema

1. Open the project → **SQL Editor** → **New query**.
2. Paste the contents of [`db/schema.sql`](../db/schema.sql).
3. Run. You should see `profiles` table created and the `handle_new_user` trigger installed.

## 3. Configure Auth settings

**Settings → Authentication → URL Configuration**

| Field | Value |
|-------|-------|
| Site URL | `https://klarbill.de` |
| Redirect URLs | `https://klarbill.de/auth/callback.html`<br>`https://klarbill.vercel.app/auth/callback.html`<br>`http://localhost:8000/auth/callback.html` |

**Settings → Authentication → Email Auth**

- Enable **Email signups** ✓
- Enable **Confirm email** ✓ (required)
- Minimum password length: `8`

**Settings → Authentication → Email Templates**

Replace the default "Confirm signup" template with:

```html
<h2>Willkommen bei Klarbill</h2>
<p>Klicke auf den folgenden Link, um deine E-Mail-Adresse zu bestätigen und dein Konto zu aktivieren:</p>
<p><a href="{{ .ConfirmationURL }}">E-Mail-Adresse bestätigen</a></p>
<p>Wenn du dich nicht registriert hast, ignoriere diese E-Mail.</p>
<hr>
<small>Klarbill · klarbill.de · hallo@klarbill.de</small>
```

Replace "Reset password" with:

```html
<h2>Passwort zurücksetzen</h2>
<p>Klicke auf den folgenden Link, um ein neues Passwort festzulegen:</p>
<p><a href="{{ .ConfirmationURL }}">Neues Passwort festlegen</a></p>
<p>Der Link ist 60 Minuten gültig.</p>
<hr>
<small>Klarbill · klarbill.de</small>
```

## 4. Set up Google OAuth

### Google Cloud Console

1. [console.cloud.google.com](https://console.cloud.google.com) → **New Project** → `klarbill`.
2. **APIs & Services → OAuth consent screen**
   - User type: **External**
   - App name: `Klarbill`
   - Support email: `hallo@klarbill.de`
   - App logo: upload `logo.svg` (export 120×120 PNG)
   - Application home page: `https://klarbill.de`
   - Privacy policy: `https://klarbill.de/datenschutz.html`
   - Terms of service: `https://klarbill.de/agb.html`
   - Authorized domains: `klarbill.de`, `supabase.co`
   - Scopes: `email`, `profile`, `openid`
3. **Credentials → Create OAuth client ID**
   - Application type: **Web application**
   - Name: `Klarbill Web`
   - Authorized JavaScript origins:
     - `https://klarbill.de`
     - `https://klarbill.vercel.app`
     - `http://localhost:8000`
   - Authorized redirect URIs:
     - `https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback`
4. Save → copy **Client ID** and **Client Secret**.

### Supabase Provider

1. Supabase → **Authentication → Providers → Google** → enable.
2. Paste **Client ID** + **Client Secret**.
3. Save.

## 5. Wire the static frontend

Edit [`lib/config.js`](../lib/config.js) and replace placeholders with your project values:

```js
SUPABASE_URL:      'https://abcdefgh.supabase.co',
SUPABASE_ANON_KEY: 'eyJhbGciOi...your-anon-key...',
```

**Find them:** Supabase → Settings → API → `Project URL` + `anon public` key.

> The `anon` key is safe to commit (RLS protects data). Never commit the `service_role` key.

## 6. Deploy & verify

```bash
git add lib/ auth/ db/ docs/07-auth-setup.md
git commit -m "feat(auth): Supabase auth (email + Google) for static MVP"
git push origin main          # Vercel auto-deploys
```

### Smoke test (5 min)

1. Go to `https://klarbill.de/auth/signup.html`.
2. Sign up with a real email address.
3. Check inbox → click confirmation link → land on `/auth/callback.html` → redirect to `/onboarding/welcome.html`.
4. Sign out → log back in via `/auth/login.html` → success.
5. Try **Mit Google fortfahren** → consent screen → redirect → success.
6. Forgot password flow: `/auth/forgot.html` → email → callback → set new password → success.
7. Confirm row in `auth.users` and matching row in `profiles` table (Supabase → Table editor).

## 7. Protect app pages

Add to the `<head>` of every file under `/app/*` and `/onboarding/*`:

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="/lib/config.js"></script>
<script src="/lib/auth.js"></script>
<script src="/lib/guard.js"></script>
```

`guard.js` will redirect to `/auth/login.html?next=<current-path>` if no session is present.

## File map

```
KlarBill/
├── auth/
│   ├── signup.html      Email + Google signup, password strength meter
│   ├── login.html       Email + Google login, "next" redirect support
│   ├── forgot.html      Password reset request
│   ├── callback.html    OAuth + email-verification + recovery handler
│   └── auth.css         Shared auth styles (design tokens)
├── lib/
│   ├── config.js        Supabase URL + anon key (edit before deploy)
│   ├── auth.js          Auth wrapper API (window.klarbillAuth)
│   └── guard.js         Session guard for protected pages
├── db/
│   └── schema.sql       profiles table + RLS + new-user trigger
└── docs/
    └── 07-auth-setup.md This file
```

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| "redirect_uri_mismatch" on Google | Redirect URI not whitelisted | Add Supabase callback URL in Google Cloud → Credentials |
| Confirmation email never arrives | Supabase rate-limit (4/h) hit, or domain blocked | Wait, or configure custom SMTP (Resend) under Auth → SMTP |
| Logged in but `profiles` row missing | Trigger not installed | Re-run `db/schema.sql` |
| Callback page stuck on "Einen Moment…" | Bad `SUPABASE_URL` in `config.js` | Check console, fix value, redeploy |
| 401 on profile select | RLS policy blocking | Verify `auth.uid() = id` policies exist on `profiles` |

## Security notes

- The `anon` key + RLS is the security boundary. Never disable RLS on user-scoped tables.
- Email verification is **required** — the `signUp` flow returns no session until the user confirms.
- Sessions are stored in `localStorage` (default Supabase behavior). Refresh tokens auto-rotate.
- For the future Next.js migration: move config to env vars (`NEXT_PUBLIC_*`), keep the schema as-is.
