import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, FileText } from 'lucide-react';

export function InvoicesListPage() {
  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Rechnungen</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Erstellte Rechnungen werden hier nicht gespeichert. Klarbill hilft beim Erzeugen, deine Archivierung erfolgt lokal.
          </p>
        </div>
        <Button asChild>
          <Link to="/invoices/new">
            <Plus />
            Neue Rechnung
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="py-16 flex flex-col items-center text-center gap-3">
          <div className="size-12 rounded-full bg-muted flex items-center justify-center">
            <FileText className="size-6 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium">Noch keine Rechnungen erzeugt</p>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm">
              Erstelle deine erste Rechnung in unter 60 Sekunden.
            </p>
          </div>
          <Button asChild>
            <Link to="/invoices/new">
              <Plus />
              Jetzt starten
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
