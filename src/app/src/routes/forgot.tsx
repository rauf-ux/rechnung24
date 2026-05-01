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

export function ForgotPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Passwort zurücksetzen</CardTitle>
        <CardDescription>
          Wir senden dir einen Link zum Zurücksetzen.
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
          <Button type="submit" className="w-full">
            Link senden
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-muted-foreground">
        <Link to="/login" className="hover:text-foreground">
          ← Zurück zur Anmeldung
        </Link>
      </CardFooter>
    </Card>
  );
}
