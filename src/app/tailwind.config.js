import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */

// Klarbill design tokens. Match the existing static-page visual language
// exactly so shadcn components inherit the brand without further theming.
//
// Source-of-truth colors (already used across all 18 static HTML pages):
//   #0A0A0B  charcoal — primary text + dark surfaces
//   #FAFAFA  off-white — page background
//   #9e005d  magenta — secondary accent (the "bill" half of the wordmark)
//   #525252  muted text
//   #737373  footer/subtle text
//   #E5E5E5  borders
//   #F5F5F5  subtle dividers
//
// Radii from existing CSS: 8 / 10 / 12 / 16 — mapped onto Tailwind's `rounded-*`.

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: { '2xl': '1100px' },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'system-ui', 'sans-serif'],
      },
      colors: {
        // shadcn semantic tokens, mapped to Klarbill palette
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        // Direct Klarbill accents (use sparingly, prefer semantic tokens above)
        klarbill: {
          charcoal: '#0A0A0B',
          magenta: '#9e005d',
          bg: '#FAFAFA',
        },
      },
      borderRadius: {
        lg: '12px',
        md: '10px',
        sm: '8px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [animate],
};
