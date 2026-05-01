import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Users } from 'lucide-react';

export function DashboardPage() {
  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Übersicht</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Willkommen zurück. Hier siehst du deinen Status auf einen Blick.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Stat label="Rechnungen diesen Monat" value="0" />
        <Stat label="Offene Beträge" value="0,00 €" />
        <Stat label="Kunden" value="0" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Schnellstart</CardTitle>
          <CardDescription>Die wichtigsten Aktionen.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <Button asChild className="h-auto py-4 flex-col items-start gap-2">
            <Link to="/invoices/new">
              <Plus className="size-5" />
              <span className="text-left">
                <span className="block font-medium">Neue Rechnung</span>
                <span className="block text-xs opacity-80">PDF + XRechnung XML</span>
              </span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto py-4 flex-col items-start gap-2">
            <Link to="/invoices">
              <FileText className="size-5" />
              <span className="text-left">
                <span className="block font-medium">Alle Rechnungen</span>
                <span className="block text-xs text-muted-foreground">Suchen, filtern, herunterladen</span>
              </span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto py-4 flex-col items-start gap-2">
            <Link to="/clients">
              <Users className="size-5" />
              <span className="text-left">
                <span className="block font-medium">Kundenliste</span>
                <span className="block text-xs text-muted-foreground">Wiederkehrende Empfänger</span>
              </span>
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-3xl font-semibold tracking-tight mt-1">{value}</p>
      </CardContent>
    </Card>
  );
}
