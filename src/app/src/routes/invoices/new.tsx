import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Placeholder for the invoice generator form. The 4-step stepper (Absender →
// Empfänger → Positionen → Vorschau) plus jsPDF + XRechnung XML rendering
// land in the next dedicated session. See `docs/CURRENT-TASKS.md` Active list.

export function InvoicesNewPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Neue Rechnung</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Multi-Step-Formular kommt im nächsten Build.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bald verfügbar</CardTitle>
          <CardDescription>
            Hier entsteht der Rechnungs-Generator: Absender → Empfänger → Positionen → Vorschau, mit lokalem PDF- und XRechnung-XML-Export.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Phase-1-MVP: Multi-Step-Form, §19-Toggle, Entwurf wird automatisch im Browser gesichert. Inhalte deiner Rechnung verlassen deinen Browser nicht.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
