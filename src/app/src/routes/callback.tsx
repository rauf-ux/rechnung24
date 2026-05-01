import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// /callback is the redirect target for Supabase email-verification + password-
// reset links. Phase 1 placeholder — the actual auth handling comes when we
// wire `@supabase/supabase-js`.

export function CallbackPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bestätigung</CardTitle>
        <CardDescription>
          Wir bestätigen deinen Account…
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Wenn du nach einigen Sekunden nicht weitergeleitet wirst, öffne den Link erneut aus deiner E-Mail.
        </p>
      </CardContent>
    </Card>
  );
}
