import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function OnboardingStep2() {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Steuerliche Angaben</CardTitle>
        <CardDescription>
          Pflichtangaben gemäß § 14 UStG. Du kannst Steuernummer ODER USt-IdNr. angeben.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            navigate('/onboarding/3');
          }}
        >
          <Field label="Steuernummer" id="taxnr" placeholder="123/456/78901" />
          <Field label="USt-IdNr." id="vatid" placeholder="DE123456789" />
          <div className="flex items-start gap-2 rounded-md bg-muted p-4">
            <input type="checkbox" id="kleinunternehmer" className="mt-0.5" />
            <label htmlFor="kleinunternehmer" className="text-sm">
              <span className="font-medium text-foreground">
                Ich nutze die Kleinunternehmerregelung (§ 19 UStG)
              </span>
              <p className="text-xs text-muted-foreground mt-1">
                Aktiviere diese Option nur, wenn du die §19-Bedingungen erfüllst (Vorjahresumsatz ≤ 22.000 €, laufendes Jahr ≤ 50.000 €). Auf deinen Rechnungen wird automatisch die Pflichtnotiz eingefügt.
              </p>
            </label>
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/onboarding/1')}
            >
              Zurück
            </Button>
            <Button type="submit" className="flex-1">Weiter</Button>
          </div>
        </form>
      </CardContent>
    </Card>
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
