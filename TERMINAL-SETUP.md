# Terminal Setup — klarbill.de

Drive-based workflow-dan tam terminal-based workflow-a keçid. Bundan sonra:
- klarbill **lokal repo**-dur (`~/Projects/klarbill/`)
- Drive **arxiv** olur (toxunmuruq)
- Hər dəyişiklik 1 əmrlə deploy olunur
- Mənim token sərfim ~95% azalır (artıq GitHub-dan fetch etmək lazım deyil)

**Vaxt:** ~15 dəq one-time setup, sonra hər deploy 5 saniyə.

---

## Faza 1 — Tools yüklənməsi (5 dəq)

Terminal-i aç (Spotlight: `Cmd+Space` → "Terminal").

### 1.1 Git yoxla

```bash
git --version
```

- Əgər versiyani göstərirsə → keç 1.2-yə
- Əgər `xcode-select: error` deyirsə → açılan dialogda **Install** bas, Xcode Command Line Tools quraşdırılana qədər gözlə (~5 dəq), sonra yenidən yoxla

### 1.2 Homebrew yüklə (yoxdursa)

```bash
brew --version
```

Yoxdursa:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

(5 dəq, parol soruşacaq)

### 1.3 GitHub CLI yüklə

```bash
brew install gh
```

### 1.4 GitHub-a giriş

```bash
gh auth login
```

Suallara cavab:
- **What account?** → `GitHub.com`
- **Protocol?** → `HTTPS`
- **Authenticate Git?** → `Y`
- **How would you like to authenticate?** → `Login with a web browser`
- One-time code göstərəcək → `Enter` bas → browser açılacaq → kodu yapışdır → authorize

Yoxla:
```bash
gh auth status
```
"Logged in to github.com as rauf-ux" görsənməlidir.

### 1.5 Git identity (yalnız ilk dəfə)

```bash
git config --global user.name "Rauf"
git config --global user.email "rauf@investaz.az"
git config --global init.defaultBranch main
git config --global pull.rebase false
```

✅ **Faza 1 tamam.**

---

## Faza 2 — Repo clone + Drive konsolidasiyası (5 dəq)

### 2.1 Working folder yarat

```bash
mkdir -p ~/Projects && cd ~/Projects
```

### 2.2 Klonla

```bash
gh repo clone rauf-ux/klarbill
cd klarbill
```

İndi `~/Projects/klarbill/` papka yaranıb. `ls` yaz görəcəksən: 18 HTML faylları + `.git/`.

### 2.3 Drive-dakı qiymətli faylları repo-ya köçür

Bütün docs, deploy guide-ları, supabase backup, db schema və yenilənmiş HTML faylları lokal repo-ya köçürək:

```bash
DRIVE="/Users/rauf/Library/CloudStorage/GoogleDrive-rauf@investaz.az/My Drive/KlarBill"

# 1. Yenilənmiş 18 HTML faylı (logo update)
cp "$DRIVE"/*.html .

# 2. Documentation
cp -R "$DRIVE/docs" .

# 3. Database schema (Supabase üçün referans)
cp -R "$DRIVE/db" .

# 4. Supabase auth backup (sonra registration aktivləşdirməyə hazır)
cp -R "$DRIVE/_supabase-ready" .

# 5. Top-level docs
cp "$DRIVE/README.md" .
cp "$DRIVE/CHANGELOG.md" .
cp "$DRIVE/DEPLOY.md" .
cp "$DRIVE/TERMINAL-SETUP.md" .
cp "$DRIVE/logo.svg" .

# 6. Standalone supabase.js (registration üçün; canlıda yoxdur indi)
# Bu faylı upload etməyəcəyik amma backup üçün saxlayırıq
cp "$DRIVE/supabase.js" "_supabase-ready/" 2>/dev/null || true
```

### 2.4 .gitignore yarat (repo-nu təmiz saxlamaq üçün)

```bash
cat > .gitignore << 'EOF'
# macOS
.DS_Store

# Editors
.vscode/
.idea/
*.swp

# Node (gələcək Next.js miqrasiyası üçün)
node_modules/
.next/
.env
.env.local

# Logs
*.log

# Drive sync artifacts
.~lock.*
EOF
```

### 2.5 Tək commit ilə hamısını push et

```bash
git add .
git status   # gör nə dəyişib (ehtiyat üçün)
git commit -m "feat(brand): klarbill logo on 18 pages + consolidate docs from Drive"
git push
```

30-60 saniyə sonra Vercel-də deploy görsənəcək. klarbill.de açıb yoxla.

✅ **Faza 2 tamam.** İndi GitHub repo-da hər şey: HTML, docs, deploy guides, Supabase backup. Drive lazım deyil artıq.

---

## Faza 3 — Cowork workspace-i lokal repo-ya keç (1 dəq)

Cowork app-da hazırda `Drive/KlarBill` mounted-dir. Lokal clone-a keçirək:

1. Cowork app-da workspace folder dropdown-u aç
2. **Change folder** → `~/Projects/klarbill/` seç
3. Drive folder unmount olur, lokal clone mounted olur

Bundan sonra mən birbaşa lokal faylları oxuya/dəyişə bilərəm. Heç bir GitHub fetch lazım deyil.

> 💡 Drive papkasını silmə — `_archive_corrupted_backup.docx` və köhnə `auth/`, `lib/` qovluqları orada qalsın. Lazımsız, amma arxiv kimi.

---

## Faza 4 — Gündəlik workflow

### 4.1 Sessiyanın başlanğıcında

```bash
cd ~/Projects/klarbill
git pull   # hər ehtimal üçün, başqa yerdən dəyişiklik olubsa
```

Sonra Claude-a desən: "X-i et" → mən birbaşa lokal faylları edirəm.

### 4.2 Dəyişiklik təsdiqi və deploy

Mən faylları edib hazır deyəndən sonra, sən terminalda:

```bash
git status                # nə dəyişib gör
git diff                  # detallı görmək üçün (q çıxış)
git add .
git commit -m "təsvir"
git push
```

Hər şey mərkəzi bir əmrə yığışsın deyə **deploy script** yaradacam (aşağıda).

### 4.3 Lokal preview (push etmədən HTML-i brauzerda yoxlamaq)

```bash
cd ~/Projects/klarbill
python3 -m http.server 8000
```

Sonra brauzerda: `http://localhost:8000`. `Ctrl+C` dayandırmaq üçün.

---

## Faza 5 — `klarbill-deploy` helper script

Hər deploy 1 əmrlə olsun:

```bash
cat > ~/Projects/klarbill/deploy.sh << 'EOF'
#!/bin/bash
# Klarbill quick deploy
# Usage: ./deploy.sh "commit message"

set -e

if [ -z "$1" ]; then
  echo "❌ Usage: ./deploy.sh \"commit message\""
  echo "   Misal: ./deploy.sh \"fix: pricing CTA copy\""
  exit 1
fi

cd "$(dirname "$0")"

# Status göstər
echo "📋 Dəyişikliklər:"
git status --short

# Stage + commit + push
git add .
git commit -m "$1"
git push

# Vercel deploy info
echo ""
echo "✓ Push olundu."
echo "  Vercel dashboard: https://vercel.com/dashboard"
echo "  Live: https://klarbill.de (30-60 saniyə sonra)"
EOF

chmod +x ~/Projects/klarbill/deploy.sh
```

İndi hər deploy:

```bash
cd ~/Projects/klarbill
./deploy.sh "feat: yeni faq səhifəsi"
```

5 saniyə.

---

## Faza 6 — Optional: Vercel CLI (deploy logs üçün)

```bash
brew install vercel-cli
vercel login         # browser açılır
cd ~/Projects/klarbill
vercel link          # mövcud project-i link et
```

Bundan sonra:

```bash
vercel ls              # son deploy-lar
vercel logs            # canlı log
vercel --prod          # manual deploy (push olmadan)
```

---

## Niyə bu workflow daha yaxşıdır

| Köhnə workflow (Drive + web upload) | Yeni workflow (terminal) |
|--------------------------------------|--------------------------|
| Hər upload 5-10 dəq drag/drop | `./deploy.sh "msg"` = 5 saniyə |
| Diff görünmür | `git diff` ilə hər dəyişiklik aydın |
| History yoxdur | `git log` ilə bütün commit-lər |
| Branch yoxdur — risky dəyişikliklər production-a düşür | `git checkout -b feature/...` ilə təcrübə üçün branch |
| Mən hər session GitHub-dan fetch edirəm (~50k token/fayl) | Mən birbaşa lokal Read edirəm (~5k token/fayl) |
| Drive sync conflict-ləri | `.git/` təmiz, no conflict |

---

## Problem həlli

| Problem | Həll |
|---------|------|
| `git: command not found` | Xcode CLT yüklə: `xcode-select --install` |
| `gh: command not found` | Homebrew ilə: `brew install gh` |
| `Permission denied (publickey)` | HTTPS istifadə et: `gh auth login` (yuxarıdakı 1.4 addımı) |
| `pre-receive hook declined` (push fail) | `git pull --rebase` sonra `git push` |
| `Your branch is ahead of origin/main by N commits` | Sadəcə `git push` — sənin local commit-lərin push olunmamış |
| `nothing to commit, working tree clean` | Heç bir dəyişiklik yoxdur — push üçün yeni dəyişiklik et |
| `error: failed to push some refs` | Başqası eyni vaxtda push edib. `git pull --rebase` sonra `git push` |
| Vercel deploy etmir | Vercel dashboard-a bax, project link olunduğuna əmin ol |

---

## Folder strukturu (Faza 2 sonra)

```
~/Projects/klarbill/
├── .git/                       # version control (avtomatik)
├── .gitignore
├── auth-pages/                 # (yoxdur — köhnə auth/, lib/ artıq lazımsızdır)
├── _supabase-ready/            # registration üçün backup
│   ├── signup.html
│   ├── login.html
│   ├── forgot.html
│   ├── callback.html
│   └── supabase.js
├── db/
│   └── schema.sql
├── docs/
│   ├── 01-product.md ... 07-auth-setup.md
│   └── CURRENT-TASKS.md
├── 18 HTML pages...            # index, signup, login, dashboard, etc.
├── logo.svg
├── README.md
├── CHANGELOG.md
├── DEPLOY.md
├── TERMINAL-SETUP.md           # bu fayl
└── deploy.sh                   # helper
```

---

## Yekunda

Faza 1-3 bir dəfə (~15 dəq). Sonra hər iş loop:

1. Mənə nə isə de
2. Mən lokal faylları redaktə edirəm
3. Sən: `./deploy.sh "təsvir"` (5 san)
4. 30 san sonra klarbill.de yenilənir

Drive folder-i artıq aktiv deyil — yalnız tarixi backup. Hər şey GitHub-da, hər şey versiya altında, hər şey 1 əmrlə deploy edilir.

**Resume protocol:** növbəti session-da mən birbaşa `~/Projects/klarbill/`-də işləyəcəm. `docs/CURRENT-TASKS.md`-ni oxuyub davam edəcəm.
