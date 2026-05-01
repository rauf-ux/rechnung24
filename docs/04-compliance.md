# Legal Compliance

## XRechnung Timeline (Germany)

| Date | Requirement |
|------|-------------|
| 2025-01-01 | All B2B businesses must **accept** e-invoices |
| 2027-01-01 | Businesses with €800K+ revenue must **send** e-invoices |
| 2028-01-01 | All B2B invoices must be electronic |

Klarbill targets the 2027 deadline as its core differentiator.

## UStG §14 — Mandatory Invoice Fields

Every invoice must include:

- Full company and customer details (name, address)
- Tax number (Steuernummer) or VAT ID (USt-IdNr)
- Invoice date and sequential invoice number
- Delivery date / service period
- Net, VAT, and gross amounts (broken out per VAT rate)

## §19 UStG — Kleinunternehmer Rule

- Revenue threshold: €22,000 (previous year) / €50,000 (current year)
- Required notice on invoice: *"Gemäß § 19 UStG wird keine Umsatzsteuer berechnet."*
- Klarbill auto-detects status based on tracked revenue and toggles the notice.

## §147 AO — Retention

- 8-year archival mandatory
- GoBD-compliant: tamper-proof storage required
- Deletion policy: invoices are never deleted; only status changes (draft → sent → paid → cancelled).

## Implementation Checklist

- [ ] XRechnung XML export (UN/CEFACT CII or UBL)
- [ ] §19 auto-detection logic
- [ ] Tamper-proof PDF + XML hash log
- [ ] Sequential invoice numbering with gap detection
