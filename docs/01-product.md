# Product

> See [`00-strategy.md`](00-strategy.md) for the strategic framing this document depends on. Klarbill is a **template tool**, not a bookkeeping platform.

## Problem

- **2027:** XRechnung becomes mandatory for all B2B invoices in Germany.
- **Existing tools** (Lexoffice, sevDesk) bundle invoicing into full bookkeeping suites at €40-50/month — overkill for someone who issues 5-20 invoices a month.
- **Free generators** are typically marketing-driven (force you onto a paid plan after a few invoices), not §19/Kleinunternehmer-aware, or not XRechnung-compliant.
- **Target users** want to type in a form, get a compliant PDF + XRechnung XML, send it themselves, and move on with their day.

## Solution

A focused, browser-based invoice generator for German solo freelancers and small B2B parties:

- Generates a §14 UStG-compliant PDF and an XRechnung XML side by side, locally in the user's browser.
- Auto-handles §19 Kleinunternehmer mode (zero VAT + required notice line).
- Saves the user's own company info and an optional client list — nothing else.
- Mobile-first form so an invoice can be issued from a phone in under 60 seconds.

What Klarbill **does not** do (by design):

- Store the generated invoice on a server.
- Send the invoice on the user's behalf.
- Track payment status, send reminders, or chase debts.
- Export to DATEV or any tax-advisor format.
- Provide tax or legal advice.

## Target Audience

**Primary**

- Freelancers (designers, developers, consultants, coaches) issuing 1-20 invoices per month to recurring B2B clients.
- §19 Kleinunternehmer (revenue ≤ €22K previous year / €50K current year) who specifically need the §19 notice and don't want to pay for full bookkeeping.

**Secondary**

- Small companies (1-5 employees) invoicing other companies they already have a relationship with.

**Out of scope (for now)**

- B2C / retail / point-of-sale.
- Cross-border VAT (§13b reverse charge, OSS).
- Anyone needing GoBD-compliant archival as part of the service (Klarbill does not provide this — see [`04-compliance.md`](04-compliance.md)).

## Pricing (provisional — not yet locked)

Two models under consideration. Final decision deferred until the generator is built and we can A/B-test landing-page copy with real users.

| Model | Free tier | Paid |
|---|---|---|
| **Freemium with cap** | 5 invoices/month | €4.90/mo unlimited |
| **One-time / PAYG** | First 3 invoices | €0.50/invoice OR €29 one-time unlimited |

The old "Starter €9.90 / Pro €19.90" subscription tier was anchored against Lexoffice. That anchoring is wrong for a template tool — it implies a service relationship Klarbill explicitly avoids.

## Competitor Comparison

| Feature | Klarbill | Lexoffice / sevDesk | Free generators |
|---|---|---|---|
| Price | €4.90/mo or one-time | €40-50/mo | Free with upsells |
| Scope | Invoice generation only | Full bookkeeping | Invoice generation |
| XRechnung | Built-in | Built-in | Rare |
| §19 Kleinunternehmer | First-class | Configurable | Inconsistent |
| Invoice data on vendor's server | No (client-side) | Yes | Often |
| Mobile-first | Yes | Desktop-first | Varies |
| Subscription required | Optional | Yes | No |

Klarbill's wedge is **scope** (just invoicing), **clarity of liability** (your data stays with you), and **price** (one order of magnitude cheaper).

## Success Criteria (Phase 1)

- 10 freelancers issuing real invoices through Klarbill within 60 days of launch.
- Zero legal complaints or data-protection incidents.
- Zero invoice content stored on Klarbill servers (verified by DB inspection).
- Cost per active user: < €0.10/month.

## Test Accounts (Demo)

```
Demo: demo@klarbill.de
Password: KlarbillDemo2026
```

(A single demo account is enough for the template-tool model — there are no plan tiers to demonstrate.)
