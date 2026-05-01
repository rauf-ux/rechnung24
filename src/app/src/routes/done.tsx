import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export function DonePage() {
  return (
    <div className="text-center space-y-6">
      <div className="size-16 mx-auto rounded-full bg-primary text-primary-foreground flex items-center justify-center">
        <Check className="size-8" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Alles bereit.
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Dein Konto ist eingerichtet. Du kannst jetzt deine erste Rechnung erstellen.
        </p>
      </div>
      <div className="flex justify-center gap-3">
        <Button asChild variant="outline">
          <Link to="/dashboard">Zur Übersicht</Link>
        </Button>
        <Button asChild>
          <Link to="/invoices/new">Neue Rechnung</Link>
        </Button>
      </div>
    </div>
  );
}
