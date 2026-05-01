import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SettingsPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Einstellungen</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Daten, die als Absender auf deinen Rechnungen erscheinen.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Unternehmen</CardTitle>
          <CardDescription>
            Diese Angaben werden bei jeder Rechnung vorausgefüllt.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Field label="Firmenname" id="company" />
            <Field label="Straße & Hausnummer" id="street" />
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-1">
                <Field label="PLZ" id="zip" />
              </div>
              <div className="col-span-2">
                <Field label="Ort" id="city" />
              </div>
            </div>
            <Field label="Steuernummer" id="taxnr" />
            <Field label="USt-IdNr." id="vatid" />
            <div className="pt-2">
              <Button type="submit">Speichern</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Konto</CardTitle>
          <CardDescription>E-Mail und Passwort.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Hier kommen E-Mail-Änderung und Passwort-Reset, sobald die Auth-Wiring in der nächsten Session live ist.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function Field({ label, id, ...props }: { label: string; id: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">{label}</label>
      <Input id={id} {...props} />
    </div>
  );
}
