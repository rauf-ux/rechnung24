import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Users } from 'lucide-react';

export function ClientsPage() {
  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Kunden</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Wiederkehrende Empfänger speichern, damit du sie nicht jedes Mal neu eingibst.
          </p>
        </div>
        <Button>
          <Plus />
          Kunde hinzufügen
        </Button>
      </div>

      <Card>
        <CardContent className="py-16 flex flex-col items-center text-center gap-3">
          <div className="size-12 rounded-full bg-muted flex items-center justify-center">
            <Users className="size-6 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium">Noch keine Kunden</p>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm">
              Füge wiederkehrende Empfänger hinzu, um sie beim Erstellen einer Rechnung schnell auszuwählen.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
