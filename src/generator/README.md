# Klarbill Invoice Generator

Vite + React + TypeScript scaffold for the client-side invoice generator. Per [`docs/00-strategy.md`](../../docs/00-strategy.md), this is the one part of Klarbill that needs React; the rest of the site stays as static HTML.

## Status

**Phase 1 scaffold.** The pipeline mounts a placeholder React component that switches between four steps (Absender → Empfänger → Positionen → Vorschau). The actual form, jsPDF rendering, and XRechnung XML serialization come in subsequent sessions.

## Local development

```bash
cd src/generator
npm install
npm run dev
```

Vite starts a dev server (default `http://localhost:5173/`) that serves `index.html` with hot-reloading.

## Production build

```bash
npm run build
```

Outputs to `<repo-root>/generator/`:

```
generator/
├── generator.js         (bundled React + jsPDF)
├── chunks/...           (lazy chunks)
└── assets/...           (CSS, fonts)
```

The host page `invoice-new.html` will load this via:

```html
<div id="generator-root"></div>
<script type="module" src="/generator/generator.js"></script>
```

This is **not yet wired** into `invoice-new.html` — the existing static markup stays in place until the generator is feature-complete enough to replace it.

## Vercel deployment (when ready)

When the generator is wired into `invoice-new.html`, add a `vercel.json` at repo root:

```json
{
  "buildCommand": "cd src/generator && npm install && npm run build",
  "outputDirectory": "."
}
```

This tells Vercel to run the build during deploy. The static HTML files at repo root are served as-is, and the bundled generator is served from `/generator/`.

## What this scaffold deliberately does *not* include

- Form state management library (Zustand, Redux) — `useState` is enough for four steps.
- UI library (Radix, shadcn) — the visual language is already locked in by the static pages; we hand-style to match.
- Form validation library — start with native HTML constraint validation, add Zod later if needed.
- XML library — `xmlbuilder2` is a likely candidate but not installed yet; defer until the XRechnung step.
