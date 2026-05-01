import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function SignupPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Konto erstellen</CardTitle>
        <CardDescription>
          14 Tage testen. Keine Kreditkarte erforderlich.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-foreground"
            >
              E-Mail
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="hallo@deinefirma.de"
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-foreground"
            >
              Passwort
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
            />
            <p className="text-xs text-muted-foreground">
              Mindestens 8 Zeichen.
            </p>
          </div>
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <input type="checkbox" id="terms" required className="mt-0.5" />
            <label htmlFor="terms">
              Ich akzeptiere die{' '}
              <a
                href="/agb.html"
                className="text-foreground hover:underline"
              >
                AGB
              </a>{' '}
              und die{' '}
              <a
                href="/datenschutz.html"
                className="text-foreground hover:underline"
              >
                Datenschutzerklärung
              </a>
              .
            </label>
          </div>
          <Button type="submit" className="w-full">
            Konto erstellen
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-muted-foreground">
        Schon ein Konto?&nbsp;
        <Link to="/login" className="font-medium text-foreground hover:underline">
          Anmelden
        </Link>
      </CardFooter>
    </Card>
  );
}
