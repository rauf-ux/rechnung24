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

export function OnboardingStep1() {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dein Unternehmen</CardTitle>
        <CardDescription>
          Diese Daten erscheinen als Absender auf deinen Rechnungen.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            navigate('/onboarding/2');
          }}
        >
          <Field label="Firmenname" id="company" placeholder="Max Mustermann" required />
          <Field label="Straße & Hausnummer" id="street" placeholder="Musterstraße 1" required />
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1">
              <Field label="PLZ" id="zip" placeholder="80331" required />
            </div>
            <div className="col-span-2">
              <Field label="Ort" id="city" placeholder="München" required />
            </div>
          </div>
          <Button type="submit" className="w-full">Weiter</Button>
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
