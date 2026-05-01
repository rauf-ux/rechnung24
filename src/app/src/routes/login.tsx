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

export function LoginPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Anmelden</CardTitle>
        <CardDescription>
          Willkommen zurück. Melde dich mit deiner E-Mail an.
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
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Passwort
              </label>
              <Link
                to="/forgot"
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Vergessen?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Anmelden
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-muted-foreground">
        Noch kein Konto?&nbsp;
        <Link to="/signup" className="font-medium text-foreground hover:underline">
          Registrieren
        </Link>
      </CardFooter>
    </Card>
  );
}
