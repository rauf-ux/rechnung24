import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Standard shadcn `cn()` helper — merges conditional class lists and
// resolves Tailwind class conflicts (e.g. `px-2` overrides `px-4`).
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
