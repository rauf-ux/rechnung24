import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Klarbill button — variants tuned to match the existing static-page style.
// `default` = charcoal primary CTA. `secondary` = magenta accent (use sparingly,
// reserved for the "bill" half of the brand). `ghost` = subtle, for nav items.

const buttonVariants = cva(
  // Spring-eased transitions match the marketing-site CTAs.
  // [&_svg]:transition-transform → arrow icons can slide on hover via per-variant rule.
  'relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[transform,box-shadow,background-color,color] duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:translate-y-0 active:duration-100 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform',
  {
    variants: {
      variant: {
        // Primary = magenta (after token swap). Lift + magenta shadow expands on hover. Trailing arrow slides.
        default:
          'bg-primary text-primary-foreground shadow-[0_4px_14px_-2px_hsl(326_100%_31%/0.35)] hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-4px_hsl(326_100%_31%/0.5)] hover:bg-primary/95 hover:[&_svg:last-child]:translate-x-0.5',
        // Secondary = charcoal. Subtle dark shadow.
        secondary:
          'bg-secondary text-secondary-foreground shadow-[0_4px_14px_-2px_rgba(10,10,11,0.18)] hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-4px_rgba(10,10,11,0.28)] hover:bg-secondary/90 hover:[&_svg:last-child]:translate-x-0.5',
        outline:
          'border border-input bg-background text-foreground hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-[0_8px_20px_-4px_hsl(326_100%_31%/0.15)]',
        ghost:
          'text-muted-foreground hover:bg-muted hover:text-foreground',
        link: 'text-foreground underline-offset-4 hover:underline',
        destructive:
          'bg-destructive text-destructive-foreground shadow-[0_4px_14px_-2px_rgba(220,38,38,0.3)] hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-4px_rgba(220,38,38,0.4)] hover:bg-destructive/95',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-11 px-6',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { buttonVariants };
