# Roadmap & Business Model

## Phase 1 — Validation (Current)

- [x] HTML prototype (18 pages)
- [x] Domain setup (klarbill.de)
- [x] Brand identity foundations
- [ ] Logo design — *in progress*
- [ ] Market validation (LinkedIn, Reddit, user interviews)

## Phase 2 — Real SaaS (Q3 2026)

- [ ] Next.js 14 + TypeScript setup
- [ ] Supabase schema (users, invoices, clients, settings)
- [ ] Supabase Auth integration
- [ ] Invoice CRUD + status state machine
- [ ] XRechnung XML export

## Phase 3 — Business Features (Q4 2026)

- [ ] Stripe subscription billing
- [ ] PDF generation + email send (Resend)
- [ ] Recurring invoices
- [ ] DATEV export
- [ ] Mobile app (React Native)

## Phase 4 — Growth (2027)

- [ ] Tax-advisor API integration
- [ ] Light bookkeeping features
- [ ] Team accounts
- [ ] White-label for tax advisors

## Business Model

### Revenue Streams

1. **Subscription (primary)**
   - Starter: €9.90/mo × 1,000 users = €9,900/mo
   - Pro: €19.90/mo × 500 users = €9,950/mo
   - Target: ~€20K MRR at 1,500 users

2. **Transaction fees (secondary)**
   - Stripe Connect: 0.25% on processed invoice volume
   - At €1M processed = €2,500 additional/mo

### Cost Structure (at 1,500 users)

| Service | Monthly cost |
|---------|--------------|
| Supabase Pro | €300 |
| Vercel Pro | €240 |
| Stripe | €500 |
| Resend | €200 |
| Support tooling | €100 |
| **Total** | **€1,340** |

**Profit margin:** ~94% — typical SaaS economics.
