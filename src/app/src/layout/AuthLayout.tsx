import { Link, Outlet } from 'react-router-dom';

// Centered single-card layout for login / signup / forgot / callback.
// Returns the user to the marketing homepage via the wordmark click.

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="px-6 py-5">
        <Link to="/" className="inline-block" aria-label="Zur Startseite">
          <Wordmark height={28} />
        </Link>
      </header>

      <main className="flex-1 flex items-start md:items-center justify-center px-4 pb-12">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>

      <footer className="px-6 py-4 text-center text-xs text-muted-foreground">
        © 2026 Klarbill ·{' '}
        <a
          href="/impressum.html"
          className="hover:text-foreground transition-colors"
        >
          Impressum
        </a>{' '}
        ·{' '}
        <a
          href="/datenschutz.html"
          className="hover:text-foreground transition-colors"
        >
          Datenschutz
        </a>{' '}
        ·{' '}
        <a
          href="/agb.html"
          className="hover:text-foreground transition-colors"
        >
          AGB
        </a>
      </footer>
    </div>
  );
}

// Marketing wordmark links externally to the static homepage at /.
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
