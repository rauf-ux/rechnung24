# Design System

## Color Tokens

```css
/* Primary */
--black:    #0A0A0B;   /* Text, primary buttons */
--white:    #FFFFFF;   /* Background */
--gray-50:  #FAFAFA;   /* Cards, input backgrounds */
--gray-200: #E5E5E5;   /* Borders */

/* Accent */
--indigo:    #4F46E5;  /* Links, CTAs */
--indigo-50: #EEF2FF;  /* Badges, soft accents */

/* Status */
--green:  #16A34A;     /* Paid */
--blue:   #2563EB;     /* Sent */
--yellow: #F59E0B;     /* Draft */
--red:    #DC2626;     /* Overdue */
```

## Typography

```css
--font-sans: 'Inter', sans-serif;          /* UI text */
--font-mono: 'JetBrains Mono', monospace;  /* Numbers, IDs, code */
```

## Layout Tokens

| Token | Value | Notes |
|-------|-------|-------|
| Container max-width | 1100px | Public + app |
| Sidebar width | 240px | Desktop only |
| Public breakpoint | 768px | Marketing pages |
| App breakpoint | 900px | App shell collapse |

## Spacing & Radii

To be formalized — current values inferred from existing HTML/CSS. Audit needed before Tailwind config.

## Component States

To be documented — see `docs/CURRENT-TASKS.md` for design-system audit task.
