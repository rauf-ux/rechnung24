import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  Plus,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useSession } from '@/auth/useSession';

// Authenticated app shell — sidebar (desktop) / topbar (mobile) + outlet.
//
// Visual language matches the existing static pages: Inter, charcoal #0A0A0B,
// magenta #9e005d as the secondary accent (used here for the "Neue Rechnung"
// CTA, since invoice creation is the core action).

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Übersicht', icon: LayoutDashboard },
  { to: '/invoices', label: 'Rechnungen', icon: FileText },
  { to: '/clients', label: 'Kunden', icon: Users },
  { to: '/settings', label: 'Einstellungen', icon: Settings },
] as const;

export function AppLayout() {
  const { user } = useSession();

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar — desktop only */}
        <aside className="hidden md:flex md:w-60 md:flex-col md:border-r md:border-border md:bg-card md:min-h-screen md:sticky md:top-0">
          <div className="px-6 py-5 border-b border-border">
            <Wordmark height={28} />
          </div>

          <div className="px-3 py-3">
            <Button
              asChild
              variant="secondary"
              className="w-full justify-start"
            >
              <NavLink to="/invoices/new">
                <Plus />
                Neue Rechnung
              </NavLink>
            </Button>
          </div>

          <nav className="flex-1 px-3 py-2 space-y-1">
            {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )
                }
              >
                <Icon className="size-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-border p-3">
            <div className="px-3 py-2 mb-1">
              <p className="text-xs text-muted-foreground truncate">
                {user?.email ?? '—'}
              </p>
            </div>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <LogOut className="size-4" />
              Abmelden
            </button>
          </div>
        </aside>

        {/* Mobile topbar + content */}
        <div className="flex-1 min-w-0">
          <header className="md:hidden flex items-center justify-between border-b border-border bg-card px-4 py-3 sticky top-0 z-10">
            <Wordmark height={24} />
            <Button asChild variant="secondary" size="sm">
              <NavLink to="/invoices/new">
                <Plus />
                Neu
              </NavLink>
            </Button>
          </header>

          <main className="px-4 py-6 md:px-8 md:py-8">
            <Outlet />
          </main>

          {/* Mobile bottom nav */}
          <nav className="md:hidden fixed bottom-0 inset-x-0 border-t border-border bg-card flex justify-around py-2 z-10">
            {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(
                    'flex flex-col items-center gap-1 px-3 py-1 text-xs font-medium transition-colors',
                    isActive
                      ? 'text-foreground'
                      : 'text-muted-foreground',
                  )
                }
              >
                <Icon className="size-5" />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

// Inline klarbill wordmark — inlined SVG keeps marketing/app visually consistent
// without requiring a shared asset pipeline.
function Wordmark({ height }: { height: number }) {
  return (
    <svg
      viewBox="0 0 180.52 44.96"
      height={height}
      role="img"
      aria-label="klarbill"
      className="block"
    >
      <path
        fill="#0A0A0B"
        d="M0,1.12h4.99v29.08l15.62-17.85h6.3l-12.73,14.18,14.9,17.79h-6.17l-11.82-14.31-6.1,6.89v7.42H0V1.12Z"
      />
      <path fill="#0A0A0B" d="M33.87,1.12h4.99v43.19h-4.99V1.12Z" />
      <path
        fill="#0A0A0B"
        d="M45.95,28.36c0-9.39,6.24-16.67,15.1-16.67,5.12,0,9.65,2.1,12.01,6.24v-5.58h4.99v31.97h-4.99v-5.58c-2.36,4.2-6.89,6.24-12.01,6.24-8.86,0-15.1-7.35-15.1-16.61ZM73.06,28.36c0-6.7-4.79-11.82-10.9-11.82s-11.09,4.99-11.09,11.82,4.73,11.75,11.09,11.75,10.9-5.05,10.9-11.75Z"
      />
      <path
        fill="#0A0A0B"
        d="M86.45,12.34h4.99v6.76c1.84-4.2,5.97-7.42,12.34-7.42v5.45c-7.48,0-12.34,4.2-12.34,12.01v15.16h-4.99V12.34Z"
      />
      <path
        fill="#9e005d"
        d="M114.35,38.73v5.58h-4.79V1.12h4.99v16.8c2.36-4.13,6.96-6.24,12.01-6.24,8.86,0,15.1,7.29,15.1,16.67s-6.24,16.61-15.1,16.61c-5.19,0-9.85-2.03-12.21-6.24ZM136.54,28.36c0-6.83-4.73-11.82-11.09-11.82s-10.9,5.12-10.9,11.82,4.79,11.75,10.9,11.75,11.09-4.99,11.09-11.75Z"
      />
      <circle fill="#9e005d" cx="151.24" cy="3.35" r="3.35" />
      <path fill="#9e005d" d="M148.75,12.34h4.99v31.97h-4.99V12.34Z" />
      <path fill="#9e005d" d="M162.14,1.12h4.99v43.19h-4.99V1.12Z" />
      <path fill="#9e005d" d="M175.53,1.12h4.99v43.19h-4.99V1.12Z" />
    </svg>
  );
}
