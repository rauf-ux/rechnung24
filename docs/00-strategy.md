# Strategy

> **Read this first.** This document defines what Klarbill **is** and — equally important — what it is **not**. Every product, design, and engineering decision flows from here. If a future task contradicts this document, update this document first.

**Last revised:** 2026-05-01 (initial pivot from "full SaaS" to "template tool")

## Positioning

**Klarbill is a software template tool for generating XRechnung-conformant invoice documents.**

Klarbill is **not**:

- A bookkeeping platform (Lexoffice, sevDesk).
- A financial service provider.
- A data processor for invoice content under GDPR Art. 28.
- A tax or legal advisor.
- A long-term archive of the user's financial records.

Klarbill **is**:

- A web form that turns user-entered data into a valid German invoice (PDF + XRechnung XML), generated locally in the user's browser.
- A minimal account layer that remembers the user's own company info and an optional client list, so they don't retype it every time.
- A focused alternative for solo freelancers and small B2B parties who already know each other and just need to issue compliant documents cheaply.

## Why this framing

A "full SaaS" framing (storing invoice content, archiving GoBD-compliant records, sending emails on the user's behalf, integrating DATEV) creates three real problems for a solo founder operating on minimum budget:

1. **Legal liability.** Storing invoice content makes Klarbill an *Auftragsverarbeiter* (data processor) under Art. 28 GDPR, requires DPAs with every customer, drags GoBD retention obligations onto Klarbill, and creates audit-trail and tamper-proofing requirements that take months of engineering and ongoing compliance cost.
2. **Operational cost.** Resend (transactional email), Supabase Pro storage, Stripe Connect for processing, GoBD-grade backup — easily €60-80/month before the first paying customer.
3. **Scope creep.** "Full SaaS" pulls feature work into recurring billing, DATEV export, team accounts, mobile apps. None of these matter until product-market fit is proven.

The template-tool framing inverts all three: Klarbill never touches invoice content on the server, the user is the responsible party for their own retention and submission, and the cost base is ~€1/month until traction.

## Target Users (initial)

- **Solo freelancers (Einzelunternehmer / freie Mitarbeiter)** invoicing 1–10 recurring B2B clients per month.
- **Small companies (1–5 employees)** invoicing other companies they already have a relationship with.
- **Kleinunternehmer (§19 UStG)** who specifically need the §19 notice line and don't want to pay for a full bookkeeping suite.

Out of scope for v1: B2C invoicing, retail receipts, restaurant POS, invoices to anonymous customers, cross-border VAT (§13b reverse-charge, OSS), and any kind of payment processing.

## Scope (Phase 1, v1.0)

**Build:**

- Multi-step invoice form (issuer info, recipient, line items, VAT logic, payment terms, notes).
- Client-side PDF generation (jsPDF or pdfmake).
- Client-side XRechnung XML generation (UBL or UN/CEFACT CII — pick one).
- §19 Kleinunternehmer toggle that auto-inserts the required notice and zeroes the VAT.
- "Save my company info" via Supabase Auth + a single `profiles` row.
- "Save my client list" via a `clients` table — contact data only, no transaction history.
- Optional: invoice draft persisted to `localStorage` so a refresh doesn't lose work.
- AGB + Datenschutzerklärung + Impressum that codify the template-tool framing.

**Do not build (Phase 1):**

- Server-side storage of invoice content (PDF or XML).
- Email sending on behalf of the user.
- DATEV export.
- Recurring invoices.
- Sequential invoice numbering with gap detection across users (each user manages their own numbering — Klarbill suggests but does not enforce).
- Tamper-proof / GoBD-compliant archival.
- Stripe subscription billing (revisit after first 50 active users).
- Mobile native app.
- Team accounts.
- API.

## Liability stance

Klarbill's defensive posture rests on three statements that must appear in AGB and inside the product:

1. Klarbill is a software tool that generates invoice documents from user-entered data. It does not provide tax or legal advice.
2. The legal correctness, GoBD-compliant archiving, transmission, and tax treatment of generated invoices are the sole responsibility of the user.
3. Klarbill stores no invoice content on its servers. Document generation occurs locally in the user's browser. Klarbill is not an *Auftragsverarbeiter* under GDPR Art. 28 with respect to invoice data.

These must be reviewed by a German lawyer before public launch. Until then, the launch posture is "private beta, no sign-ups from strangers."

## Cost model

| Component | Cost (Phase 1) |
|---|---|
| Vercel | Free tier (€0) |
| Supabase | Free tier — 500 MB DB, 50K MAU (€0) |
| Domain (klarbill.de) | ~€1/mo amortized |
| Email (transactional) | None — auth verification handled by Supabase free tier |
| Stripe | None until subscription is added |
| **Total monthly** | **~€1** |

This buys runway for the first ~1,000 users at zero marginal cost.

## Architecture decision

**Keep the existing static HTML for marketing pages.** Marketing surfaces (`index`, `pricing`, `features`, `faq`, `impressum`) need no SSR, no auth, no state. They're shipped and good. Don't churn them.

**Build the invoice generator as a single React island in `invoice-new.html`.** The generator is a multi-step form with non-trivial state — the only place where React's ergonomics earn their keep. Use Vite to bundle a single `InvoiceGenerator` component into a script tag mounted on `invoice-new.html`. Marketing pages stay vanilla.

**Auth is vanilla JS + Supabase JS SDK.** The `_supabase-ready/{signup,login,forgot,callback}.html` files are already wired — restore them when the AGB and impressum are ready.

**Defer Next.js migration** until at least one of: 100+ active users, the marketing surface needs SEO-driven dynamic content (blog), or team accounts demand server-side session management. None of these are true now.

## Pricing model (provisional)

The old "Starter €9.90 / Pro €19.90" subscription was sized to match Lexoffice anchor pricing. For a template tool, anchor pricing is wrong. Two viable alternatives:

- **Freemium with cap.** Free tier: 5 invoices/month. Paid tier: €4.90/month, unlimited.
- **One-time / pay-as-you-go.** €0.50 per generated invoice (downloadable PDF + XML), or €29 one-time for unlimited self-serve.

**Decision deferred** until the generator is built and we can A/B-test landing-page copy.

## Success metrics (Phase 1)

- 10 freelancers issuing real invoices via Klarbill within 60 days of launch.
- Zero legal incidents from the first 100 users.
- Zero invoice-content data on Klarbill's servers (verified via DB inspection).
- Cost per active user: < €0.10/month.
