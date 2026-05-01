# Deploy Walkthrough — Auth System

Sıralı, addım-addım təlimat. Sənin əsl repo strukturuna uyğun: bütün fayllar **kökdə**, qovluqlarda deyil. GitHub web (drag & drop) ilə.

**Vaxt:** ~45 dəqiqə
**Repo:** [github.com/rauf-ux/klarbill](https://github.com/rauf-ux/klarbill)
**Live:** klarbill.de (Vercel)

**Sıra:**
1. Supabase project qur (10 dəq)
2. Google OAuth qur (15 dəq)
3. `supabase.js` faylını doldur (2 dəq)
4. GitHub-a 5 fayl yüklə (5 dəq)
5. Vercel auto-deploy yoxla (1 dəq)
6. Smoke test (5 dəq)

> ⚠️ **Vacib qeyd 1:** Köhnə yaratdığım `auth/`, `lib/`, `db/` qovluqları (Drive-da görəcəksən) **istifadə olunmayacaq**. Sənin repo-da hər şey kökdə yerləşir. Onları yüklə**mə**, yalnız `db/schema.sql`-i (Supabase üçün referansdır).
>
> ⚠️ **Vacib qeyd 2:** Sənin HTML faylları "Rechnung24" deyir (`<title>`, logo `R`), domain isə klarbill.de. Mən mövcud brendi qoruyuram. Klarbill-ə re-brand etmək istəsən, ayrı task kimi edərik.

---

## Faza 1 — Supabase project qurulması (10 dəq)

### 1.1 Project yarat

1. [supabase.com/dashboard](https://supabase.com/dashboard) → **New project**
2. Doldur:
   - **Name:** `klarbill-prod`
   - **Database password:** güclü parol → 1Password-a saxla
   - **Region:** `Central EU (Frankfurt)` — alman istifadəçilərə ən yaxın
   - **Pricing:** Free
3. **Create new project** → 1-2 dəqiqə gözlə

### 1.2 Database schema-nı icra et

1. Sol menudan **SQL Editor** → **New query**
2. Drive-dakı `db/schema.sql` faylının məzmununu kopyala (yalnız bu fayl Drive-da qalır)
3. SQL Editor-ə yapışdır → **Run** (Cmd+Enter)
4. "Success. No rows returned" görəcəksən
5. **Yoxlama:** Sol menudan **Table Editor** → siyahıda `profiles` cədvəli olmalıdır

### 1.3 Email ayarları

**Authentication** → **Sign In / Up**:
- **Enable Email provider** ✓
- **Confirm email** ✓
- **Minimum password length:** `8`
- **Save**

### 1.4 URL Configuration

**Authentication** → **URL Configuration**:

| Sahə | Dəyər |
|------|-------|
| **Site URL** | `https://klarbill.de` |
| **Redirect URLs** *(Add URL düyməsi ilə hər biri ayrıca)* | `https://klarbill.de/callback.html` |
|  | `https://klarbill.vercel.app/callback.html` |
|  | `http://localhost:8000/callback.html` |

**Save**.

### 1.5 Email template-ləri (alman dilində)

**Authentication** → **Email Templates**.

**Confirm signup** seç:

Subject:
```
Bestätige deine E-Mail-Adresse — Rechnung24
```

Body (HTML)-i tamamilə bunula əvəz et:
```html
<h2>Willkommen bei Rechnung24</h2>
<p>Klicke auf den folgenden Link, um deine E-Mail-Adresse zu bestätigen und dein Konto zu aktivieren:</p>
<p><a href="{{ .ConfirmationURL }}">E-Mail-Adresse bestätigen</a></p>
<p>Wenn du dich nicht registriert hast, ignoriere diese E-Mail.</p>
<hr>
<small>Rechnung24 · klarbill.de</small>
```

**Save changes**.

**Reset password** seç:

Subject:
```
Passwort zurücksetzen — Rechnung24
```

Body:
```html
<h2>Passwort zurücksetzen</h2>
<p>Klicke auf den folgenden Link, um ein neues Passwort festzulegen:</p>
<p><a href="{{ .ConfirmationURL }}">Neues Passwort festlegen</a></p>
<p>Der Link ist 60 Minuten gültig.</p>
<hr>
<small>Rechnung24 · klarbill.de</small>
```

**Save changes**.

### 1.6 API açarları kopyala

**Project Settings** (dişli ikon) → **API**.

Müvəqqəti notes-a kopyala:
- **Project URL** — formatı `https://abcdefgh.supabase.co`
- **anon public** açarı (uzun string, `eyJ...` ilə başlayır)

> ⚠️ `service_role` açarına toxunma. Frontend-də heç vaxt istifadə etmə.

✅ **Faza 1 tamam.**

---

## Faza 2 — Google OAuth qurulması (15 dəq)

### 2.1 Google Cloud account

1. [console.cloud.google.com](https://console.cloud.google.com) → Google hesabınla daxil ol
2. İlk dəfədirsə: terms qəbul et, billing soruşulsa "Skip"
3. Üst sol-da project dropdown → **NEW PROJECT**:
   - **Project name:** `klarbill`
   - **Location:** No organization
   - **CREATE** → 30 saniyə gözlə
4. Yaranan project-i seç (üst sol dropdown `klarbill` görsün)

### 2.2 OAuth Consent Screen

Sol menu (☰) → **APIs & Services** → **OAuth consent screen**.

1. **User Type:** External → **CREATE**
2. **App information**:
   - **App name:** `Rechnung24`
   - **User support email:** sənin Google email
   - **Application home page:** `https://klarbill.de`
   - **Application privacy policy link:** `https://klarbill.de/impressum.html`
   - **Application terms of service link:** `https://klarbill.de/impressum.html`
3. **Authorized domains:** **+ ADD DOMAIN**:
   - `klarbill.de`
   - `supabase.co`
4. **Developer contact information:** sənin email
5. **SAVE AND CONTINUE**

**Scopes** səhifəsi:
- **ADD OR REMOVE SCOPES** → işarələ:
  - `openid`
  - `.../auth/userinfo.email`
  - `.../auth/userinfo.profile`
- **UPDATE** → **SAVE AND CONTINUE**

**Test users** səhifəsi:
- **+ ADD USERS** → öz email-ini əlavə et
- **SAVE AND CONTINUE**

**Summary** → **BACK TO DASHBOARD**

> 📝 App "Testing" rejimindədir — yalnız test users daxil ola bilər. Public launch üçün sonra **PUBLISH APP** edəcəksən (Google review tələb edə bilər ~1 həftə).

### 2.3 OAuth Client ID yarat

Sol menu → **APIs & Services** → **Credentials**.

1. **+ CREATE CREDENTIALS** → **OAuth client ID**
2. Doldur:
   - **Application type:** Web application
   - **Name:** `Klarbill Web`
   - **Authorized JavaScript origins** (+ ADD URI hər biri üçün):
     - `https://klarbill.de`
     - `https://klarbill.vercel.app`
     - `http://localhost:8000`
   - **Authorized redirect URIs** (+ ADD URI):
     - `https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback`
     - ⚠️ `YOUR-PROJECT-REF` yerinə Faza 1.6-da kopyaladığın Supabase project URL-dən REF hissəsini yaz. Məs: `https://abcdefgh.supabase.co` → `https://abcdefgh.supabase.co/auth/v1/callback`
3. **CREATE**
4. Pop-up açılır → kopyala:
   - **Client ID**
   - **Client secret**

### 2.4 Supabase-də Google provider-i aktivləşdir

1. Supabase dashboard → **Authentication** → **Sign In / Up** tab
2. Aşağı scroll → **Auth Providers** → **Google** → klik
3. **Enable Sign in with Google** toggle-i aç
4. Yapışdır:
   - **Client ID (for OAuth)** — Google-dan kopyaladığın
   - **Client Secret (for OAuth)** — Google-dan kopyaladığın
5. **Save**

✅ **Faza 2 tamam.**

---

## Faza 3 — `supabase.js` faylını doldur (2 dəq)

1. Drive-da `supabase.js` faylını mətn redaktoru ilə aç (TextEdit, VS Code və ya Drive viewer)
2. İlk iki sətri Faza 1.6-dakı dəyərlərlə əvəz et:

**Əvvəl:**
```js
SUPABASE_URL:      'https://YOUR-PROJECT-REF.supabase.co',
SUPABASE_ANON_KEY: 'YOUR-ANON-KEY',
```

**Sonra (nümunə):**
```js
SUPABASE_URL:      'https://abcdefgh.supabase.co',
SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...uzun-string-burada...',
```

3. **Save** (Cmd+S)

✅ **Faza 3 tamam.**

---

## Faza 4 — GitHub-a 5 fayl yüklə (5 dəq)

GitHub web interfeysi ilə drag & drop. **Bütün fayllar repo kökünə**.

### 4.1 Repo aç

[github.com/rauf-ux/klarbill](https://github.com/rauf-ux/klarbill)

### 4.2 Yüklənəcək fayllar

Drive papkasından bu **5 fayl** repo-nun **kökünə** (qovluqsuz) yüklənəcək:

| Fayl | Status | Nə edir |
|------|--------|---------|
| `signup.html` | mövcudu **əvəz et** | Real Supabase signup wiring əlavə olunub |
| `login.html` | mövcudu **əvəz et** | Real Supabase login wiring əlavə olunub |
| `forgot.html` | mövcudu **əvəz et** | Real Supabase password reset wiring + demo toggle silinib |
| `callback.html` | **yeni** | OAuth + email verification + recovery handler |
| `supabase.js` | **yeni** | Bütün auth məntiqi (Faza 3-də doldurulmuş!) |

### 4.3 GitHub web upload addımları

1. Repo ana səhifəsində → yuxarıda **Add file** → **Upload files**
2. Drive-dan bu 5 faylı sürüyüb pəncərəyə bırax:
   - `signup.html`
   - `login.html`
   - `forgot.html`
   - `callback.html`
   - `supabase.js`
3. Aşağıda commit message yaz:
   ```
   feat(auth): wire Supabase auth (email + Google + verification)
   ```
4. **Commit changes** bas

GitHub mövcud `signup.html`/`login.html`/`forgot.html` üçün diff göstərəcək — bu istənilən davranışdır, **commit changes**-i təsdiqlə.

> ⚠️ **YÜKLƏMƏ:** Drive-da gördüyün `auth/`, `lib/`, `db/` qovluqları repo-ya **lazım deyil**. Onları ignore et. `db/schema.sql` yalnız Supabase SQL Editor üçün referansdır (Faza 1.2-də artıq icra etmisən).

✅ **Faza 4 tamam.**

---

## Faza 5 — Vercel auto-deploy (1 dəq)

Vercel GitHub-a hər push-dan sonra avtomatik deploy edir.

1. [vercel.com/dashboard](https://vercel.com/dashboard) aç
2. `klarbill` (və ya rechnung24) project-ini klik et
3. **Deployments** tab — ən üstdə yeni deploy "Building" və ya "Ready" olmalıdır
4. **Ready** olana qədər gözlə (~30-60 saniyə)
5. URL-i yoxla: `https://klarbill.de` açıq qalmalıdır

> Deploy "Failed" olursa → klik et → log-a bax. Adətən path/case-sensitive səhvləridir.

✅ **Faza 5 tamam.**

---

## Faza 6 — Smoke test (5 dəq)

Hər testi **incognito window**-da apar (cookie qarışıqlığı qarşısını alır).

### Test 1 — Email signup + verification

1. `https://klarbill.de/signup.html` aç
2. Real email + güclü parol daxil et
3. Checkbox-u işarələ → **Konto erstellen**
4. Yaşıl mesaj: "Fast fertig! Wir haben dir eine Bestätigungs-E-Mail an … gesendet."
5. Email inbox-ında "Bestätige deine E-Mail-Adresse — Rechnung24" emaili
6. Linki bas → `/callback.html` açılır → ✓ ikon → "Erfolgreich!" → avtomatik `/welcome.html`-ə yönlənir

**Yoxlama:** Supabase → **Authentication** → **Users** → yeni user görünməlidir. **Table Editor** → `profiles` → yeni user üçün avtomatik row.

### Test 2 — Logout + login

1. Browser console-da yaz: `klarbillAuth.signOut()` (Enter)
2. `https://klarbill.de/login.html` aç
3. Eyni email + parol → **Anmelden**
4. `/welcome.html`-ə yönlənir

### Test 3 — Google OAuth

1. Incognito window → `https://klarbill.de/login.html`
2. **Mit Google anmelden** bas
3. Google consent screen → öz hesabını seç (Faza 2.2-də test users siyahısında olmalıdır)
4. Permissions qəbul et → callback → welcome

**Yoxlama:** Supabase → Users → Google email-i ilə ikinci user.

### Test 4 — Forgot password

1. `https://klarbill.de/forgot.html`
2. Email daxil et → **Link senden**
3. Yaşıl ✉️ ikonu + "E-Mail wurde gesendet" görsənir
4. Inbox-da "Passwort zurücksetzen" emaili
5. Linki bas → callback → "Neues Passwort wählen" formu
6. Yeni parol → **Passwort speichern** → welcome

✅ **Faza 6 tamam — qeydiyyat sistemi canlıdır!**

---

## Problem həlli

| Problem | Səbəb | Həll |
|---------|-------|------|
| Form click-də heç nə baş vermir | `supabase.js`-də placeholder qaldı | Faza 3-ü təkrarla, push et |
| Console: "Supabase SDK not loaded" | CDN script blok olunub | Network tab-da CDN URL-ə bax. Adblock-u söndür. |
| "redirect_uri_mismatch" Google-da | Redirect URI Google Cloud-da yoxdur | Faza 2.3-ə qayıt, Supabase callback URL-ini əlavə et |
| Email gəlmir | Supabase free plan: 4 email/saat | Gözlə, ya da custom SMTP (Resend) qur |
| 404 `/signup.html`-də | Vercel hələ deploy etməyib | Vercel dashboard-da "Building" gözlə |
| Login uğurlu, profil yoxdur | Trigger qurulmayıb | `db/schema.sql`-i SQL Editor-də yenidən icra et |
| Console: "Invalid API key" | `anon` açarı kəsildi | Faza 1.6-dan tam açarı yenidən kopyala |
| OAuth-da "App not verified" | App "Testing" rejimindədir | Test users siyahısına email-i əlavə et, ya da APP-i Publish et |

## Bütün fayl xəritəsi

**Repo (deploy olunan):**
```
klarbill/
├── signup.html        ← yeniləndi (Supabase wiring)
├── login.html         ← yeniləndi
├── forgot.html        ← yeniləndi (demo toggle silindi)
├── callback.html      ← yeni
├── supabase.js        ← yeni (config + auth wrapper)
└── ... (digər mövcud HTML faylları toxunulmadı)
```

**Drive (referans, repo-ya yüklənmir):**
```
KlarBill/
├── db/schema.sql      ← Supabase SQL Editor-ə kopyala-yapışdır (Faza 1.2)
├── docs/07-auth-setup.md  ← detallı texniki guide
├── docs/...           ← layihə sənədləri
├── auth/, lib/        ← köhnə struktur, IGNORE et
└── DEPLOY.md          ← bu fayl
```

## Növbəti addımlar

Auth canlıdırsa, sonrakı addımlar:

- **Protected pages-ə guard əlavə et** — `dashboard.html`, `invoices.html`, `clients.html`, `settings.html`, `invoice-new.html`, `welcome.html`, `onboarding-1/2/3.html`, `done.html` üçün hər birinin sonuna bunu əlavə:
  ```html
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script src="/supabase.js"></script>
  <script>klarbillAuth.guard();</script>
  ```
  Login olmayan istifadəçiləri avtomatik `/login.html?next=…`-ə yönləndirəcək.

- **Onboarding flow-u `profiles` table-a bağla** (`klarbillAuth.client.from('profiles').update(...)`)
- **Custom SMTP (Resend)** — launch-dan əvvəl Supabase 4-email/saat limitindən qurtul
- **App shell header-də** user menyusu (avatar + Logout düyməsi)
- **Brand audit** — "Rechnung24" → "Klarbill" rebrand etmək istəsən

---

**Resume protocol:** növbəti session-da bu sənədə qayıtmağa ehtiyac yoxdur — `docs/CURRENT-TASKS.md` davam etmə nöqtəsidir.
