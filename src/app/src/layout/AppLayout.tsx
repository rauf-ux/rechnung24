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
            <Button asChild size="sm">
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
    <svg viewBox="0 0 215.91 43.85" height={height}
      role="img"
      aria-label="klarbill"
      className="block"
    ><path fill="#0A0A0B" d="M0,.66h7.61v25.14s2.76-3.94,4.6-6.17L27.44.66h8.99l-15.69,19.89,17.33,22.65h-8.93l-13.19-17.4-8.34,10.04v7.35H0V.66Z"/><path fill="#0A0A0B" d="M42.54,0h7.29v43.19h-7.29V0Z"/><path fill="#0A0A0B" d="M56.06,26.98c0-9.39,6.1-16.94,15.03-16.94,4.4,0,8.27,1.77,10.83,4.79v-4.14h7.29v32.49h-7.29v-4.07c-2.56,3.02-6.43,4.73-10.83,4.73-8.93,0-15.03-7.55-15.03-16.87ZM81.92,26.98c0-5.71-3.81-9.91-8.99-9.91-5.51,0-9.45,4.2-9.45,9.91s3.94,9.85,9.45,9.85c5.12,0,8.99-4.07,8.99-9.85Z"/><path fill="#0A0A0B" d="M96.56,10.7h7.29v6.43c1.25-3.28,4.79-7.09,11.75-7.09v7.94c-7.15,0-11.75,3.41-11.75,11.95v13.26h-7.29V10.7Z"/><path fill="#9e005d" d="M121.64.66h19.82c7.02,0,12.74,3.28,12.74,10.77,0,3.35-2.1,6.43-4.46,7.61,4.86,1.05,8.47,5.38,8.47,10.9,0,8.73-6.63,13.26-16.15,13.26h-20.42V.66ZM141.07,16.74c3.28,0,5.19-1.77,5.19-4.66s-1.84-4.86-5.51-4.86h-11.49v9.52h11.82ZM141.53,36.63c5.32,0,8.73-2.17,8.73-6.56s-3.15-6.83-8.01-6.83h-13v13.39h12.28Z"/><path fill="#9e005d" d="M164.9,14.94h7.29v28.26h-7.29V14.94Z"/><path fill="#9e005d" d="M164.9,0h7.29v10.04h-7.29V0Z"/><path fill="#9e005d" d="M179.54,0h7.29v43.19h-7.29V0Z"/><path fill="#9e005d" d="M194.17,0h7.29v43.19h-7.29V0Z"/><path fill="#9e005d" d="M208.62,36.3h7.29v6.89h-7.29v-6.89Z"/></svg>
  );
}
