# Pages & Structure

Total: **18 pages** across 4 sections. Full user-flow covered.

```
klarbill/
├── public/                  # Marketing & legal
│   ├── index.html           # Landing page
│   ├── features.html        # Feature overview
│   ├── pricing.html         # Plans & comparison
│   ├── faq.html             # 6-category FAQ
│   └── impressum.html       # Legal (German law requirement)
│
├── auth/                    # Authentication
│   ├── signup.html
│   ├── login.html
│   └── forgot.html          # Password reset
│
├── onboarding/              # First-time setup
│   ├── welcome.html         # Intro screen
│   ├── onboarding-1.html    # Company details
│   ├── onboarding-2.html    # Tax & Kleinunternehmer flag
│   ├── onboarding-3.html    # Bank info & logo upload
│   └── done.html            # Completion screen
│
└── app/                     # Main application
    ├── dashboard.html       # Overview & statistics
    ├── invoices.html        # Invoice list
    ├── invoice-new.html     # Create new invoice
    ├── clients.html         # Client management
    └── settings.html        # User settings
```

## Page-Level Notes

| Page | Status | Notes |
|------|--------|-------|
| `index.html` | Live | Hero + features |
| `pricing.html` | Live | Comparison table |
| `faq.html` | Live | 6 categories |
| `dashboard.html` | Prototype | Stats cards |
| `invoice-new.html` | Prototype | XRechnung field validation pending |

For active editing tasks see `CURRENT-TASKS.md`.
