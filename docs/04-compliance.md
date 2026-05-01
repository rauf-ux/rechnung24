# Legal Compliance

> **Stance.** Klarbill is a software template tool. The legal correctness, GoBD-compliant archiving, transmission, and tax treatment of any generated invoice is the **sole responsibility of the user**. This document is an internal reference for what Klarbill helps the user do — not a list of obligations Klarbill itself fulfills on the user's behalf. See [`00-strategy.md`](00-strategy.md) for the framing this depends on.

## XRechnung Timeline (Germany)

| Date | Requirement |
|---|---|
| 2025-01-01 | All B2B businesses must **accept** e-invoices |
| 2027-01-01 | Businesses with €800K+ revenue must **send** e-invoices |
| 2028-01-01 | All B2B invoices must be electronic |

Klarbill targets the 2027 deadline as its core wedge: by then every freelancer needs the ability to issue XRechnung XML. Klarbill produces it; the user submits it.

## UStG §14 — Mandatory Invoice Fields (what Klarbill helps the user produce)

Klarbill's form prompts the user for, and the generated PDF/XML includes:

- Full company and customer details (name, address).
- The user's tax number (Steuernummer) or VAT ID (USt-IdNr).
- Invoice date and a sequential invoice number entered by the user.
- Delivery date / service period.
- Net, VAT, and gross amounts (broken out per VAT rate).

**The user is responsible** for ensuring the data they enter is accurate and that their invoice numbering is gap-free over time. Klarbill suggests a next number based on what was entered last, but does not enforce, audit, or verify sequential integrity across sessions.

## §19 UStG — Kleinunternehmer Rule (handled in-product)

- Revenue thresholds: €22,000 (previous year) / €50,000 (current year).
- Required notice on invoice: *"Gemäß § 19 UStG wird keine Umsatzsteuer berechnet."*
- Klarbill exposes a §19 toggle in the generator. When on, VAT lines are zeroed and the notice line is appended to the PDF and the XRechnung XML.
- **The user attests** that they qualify for §19 status when they enable the toggle. Klarbill does not track revenue, does not warn when thresholds are exceeded, and does not give tax advice.

## §147 AO — Retention (user's responsibility)

- 8-year archival is mandatory under German tax law.
- GoBD-compliant: tamper-proof storage required.
- **Klarbill does not store invoice content.** The user downloads the PDF and XML at generation time and is responsible for storing them in a GoBD-compliant manner (e.g., DATEV Unternehmen Online, a dedicated DMS, or a notarized cloud archive).
- This is communicated to the user inside the generator UI and in the AGB. A link to a short explainer ("Was ist GoBD-konforme Aufbewahrung?") is shown after the first invoice download.

## GDPR (DSGVO)

- Klarbill is **not** an *Auftragsverarbeiter* (data processor) under Art. 28 DSGVO with respect to invoice content, because invoice content is generated client-side in the user's browser and never reaches Klarbill's servers.
- Klarbill **is** a controller (Verantwortlicher) for: the user's account data (email, hashed password — handled by Supabase Auth) and any profile/client-list data the user opts to save.
- A Datenschutzerklärung is required and must clearly distinguish (a) data Klarbill stores (account, profile, optional client list) from (b) data Klarbill never sees (invoice content).

## AGB Clauses (drafts — must be reviewed by a German lawyer)

Three clauses must appear in AGB before public launch:

1. *"Klarbill ist ein Software-Werkzeug zur Erstellung von Rechnungsdokumenten. Es bietet keine Steuer- oder Rechtsberatung."*
2. *"Die rechtliche Korrektheit, GoBD-konforme Archivierung, Versendung und steuerliche Behandlung der erstellten Rechnungen liegt ausschließlich in der Verantwortung des Nutzers."*
3. *"Klarbill speichert keine Rechnungsinhalte. Die Erstellung erfolgt lokal im Browser des Nutzers. Klarbill ist kein Auftragsverarbeiter im Sinne von Art. 28 DSGVO bezüglich Rechnungsdaten."*

Until those are reviewed, the launch posture is **private beta**: invite-only, no public sign-up form.

## In-product disclaimers

- After the first PDF download, show: *"Du bist für die GoBD-konforme Aufbewahrung deiner Rechnungen selbst verantwortlich. Klarbill speichert keine Kopie."*
- On the §19 toggle, show: *"Aktiviere diese Option nur, wenn du die §19-UStG-Bedingungen erfüllst."*
- In the footer of every invoice form: *"Diese App ersetzt keine Steuer- oder Rechtsberatung."*

## Implementation Checklist

- [ ] XRechnung XML export (UN/CEFACT CII or UBL — pick one)
- [ ] §19 auto-detection toggle + zero-VAT logic
- [ ] PDF generation with all §14 mandatory fields
- [ ] Sequential invoice number suggested (not enforced) based on user's previous entry
- [ ] AGB + Datenschutzerklärung + Impressum drafts reviewed by a German lawyer before public launch
- [ ] In-product disclaimers (post-download retention notice, §19 attestation, footer reminder)
- [ ] Database audit: confirm no invoice content (PDF, XML, line items) is stored server-side
