import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function WelcomePage() {
  return (
    <div className="text-center space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Willkommen bei Klarbill.
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Drei kurze Schritte, dann kannst du deine erste Rechnung erstellen.
        </p>
      </div>
      <Button asChild size="lg">
        <Link to="/onboarding/1">Los geht's</Link>
      </Button>
    </div>
  );
}
