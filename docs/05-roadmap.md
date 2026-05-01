# Roadmap & Business Model

> See [`00-strategy.md`](00-strategy.md). Phases below are scoped to the **template-tool** positioning. Anything that turns Klarbill into a financial service (DATEV, GoBD archive, Stripe Connect) lives in "Maybe later" and stays there until product-market fit is proven.

## Phase 0 — Foundations (done)

- [x] HTML prototype (18 pages)
- [x] Domain setup (klarbill.de)
- [x] Brand identity foundations (klarbill wordmark, two-tone palette, typography)
- [x] Brand audit (Rechnung24 → Klarbill across all user-facing surfaces)
- [x] Strategic pivot to template-tool positioning

## Phase 1 — Generator MVP (next ~4 weeks)

The core deliverable: a working invoice generator anyone can use.

- [ ] AGB + Datenschutzerklärung + Impressum drafts (template-tool framing, lawyer review pending)
- [ ] Invoice generator built as a Vite + React island mounted on `invoice-new.html`
  - Multi-step form: issuer info → recipient → line items → review
  - Client-side PDF generation (jsPDF or pdfmake — decide during build)
  - Client-side XRechnung XML generation (UBL or UN/CEFACT CII — decide during build)
  - §19 Kleinunternehmer toggle (zeros VAT, appends required notice)
  - Draft auto-save to `localStorage`
- [ ] Auth go-live (restore `_supabase-ready/*.html`, add Supabase free-tier project)
- [ ] Minimal account model: `profiles` (issuer info), `clients` (contact list — no transactions)
- [ ] Pricing copy refresh on `pricing.html` to reflect new model (freemium with cap, OR PAYG — pick one)
- [ ] Real legal data in `impressum.html`

## Phase 2 — Validation (~2 months after MVP ships)

- [ ] Private beta: 10 invited freelancers issuing real invoices
- [ ] Feedback loop: 1:1 calls every 2 weeks
- [ ] Outreach: LinkedIn, r/selbststaendig, Freelancer.de forums
- [ ] Iterate on the generator based on real-use friction
- [ ] Public launch when error rate is low and 5+ users are paying voluntarily

## Phase 3 — Polish & first paid users (~3 months after Phase 2)

- [ ] Stripe checkout for one-time / subscription (whichever pricing model wins)
- [ ] Improved §19 onboarding (revenue tracker the user fills in themselves)
- [ ] Better mobile flow (probably the highest-leverage UX win)
- [ ] OG image + favicon (currently in CURRENT-TASKS but cosmetic)
- [ ] Light analytics (privacy-respecting — Plausible or umami)

## Maybe later (only if Phase 2 validates)

These were in the old roadmap. They're not killed — just deferred until there's evidence of demand and revenue to support the engineering and legal cost.

- DATEV export
- Recurring invoices
- React Native mobile app
- Team accounts
- Tax-advisor white-label
- API
- Stripe Connect / payment processing on behalf of users
- GoBD-compliant server-side archival (would change Klarbill's legal posture — only if it's a paid Pro feature with a separate legal review)

## Business Model

### Revenue (provisional)

The old subscription pricing (€9.90 Starter / €19.90 Pro) anchored against full-suite competitors. That anchoring doesn't fit a template tool. Two candidates under consideration:

- **Freemium with cap.** Free: 5 invoices/month. Paid: €4.90/mo unlimited.
- **One-time / PAYG.** First 3 free, then €0.50/invoice or €29 one-time unlimited.

Decision deferred to Phase 2 — let real users tell us what they'll pay for.

### Cost structure (Phase 1)

| Service | Monthly cost |
|---|---|
| Vercel (free tier) | €0 |
| Supabase (free tier — 500 MB DB, 50K MAU) | €0 |
| Domain (klarbill.de, amortized) | ~€1 |
| Email | None — Supabase free tier handles auth verification |
| Stripe | None until Phase 3 |
| **Total** | **~€1/mo** |

### Cost structure (Phase 3, ~500 paying users)

| Service | Monthly cost |
|---|---|
| Vercel (still free tier likely) | €0 |
| Supabase (free tier may still suffice) | €0–€25 |
| Domain | ~€1 |
| Stripe (1.5% + €0.25 per charge) | ~€20 |
| **Total** | **~€20–50/mo** |

A subscription gross margin of >95% is realistic at this scope. The template-tool model is not a high-revenue rocket ship — it's a small, profitable, low-risk business that pays for itself early.
