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

export function OnboardingStep3() {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bankdaten</CardTitle>
        <CardDescription>
          Optional. Wird auf deinen Rechnungen als Zahlungsadresse angegeben.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            navigate('/done');
          }}
        >
          <Field label="IBAN" id="iban" placeholder="DE89 3704 0044 0532 0130 00" />
          <Field label="BIC" id="bic" placeholder="COBADEFFXXX" />
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/onboarding/2')}
            >
              Zurück
            </Button>
            <Button type="submit" className="flex-1">Fertig</Button>
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
