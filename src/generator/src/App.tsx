import { useState } from 'react';

// Klarbill invoice generator — Phase 1 scaffold.
//
// This file is a placeholder skeleton. The full multi-step form, jsPDF
// rendering, and XRechnung XML serialization come in subsequent sessions.
// For now, the goal is to prove that the build pipeline works end-to-end
// and the host HTML page can mount React.
//
// Roadmap:
//   1. [done] Scaffold + mount
//   2. Issuer step    — own company info (read-only from `profiles` once auth is wired)
//   3. Recipient step — pick from clients list or enter ad hoc
//   4. Line items step — add/remove rows, VAT per row, §19 toggle
//   5. Review + Generate — render PDF (jsPDF) + XRechnung XML side by side, both downloadable
//   6. Persist draft to localStorage so a refresh doesn't lose work

type Step = 'issuer' | 'recipient' | 'lines' | 'review';

const STEP_LABELS: Record<Step, string> = {
  issuer: 'Absender',
  recipient: 'Empfänger',
  lines: 'Positionen',
  review: 'Vorschau',
};

const STEPS: Step[] = ['issuer', 'recipient', 'lines', 'review'];

export function App() {
  const [step, setStep] = useState<Step>('issuer');
  const stepIndex = STEPS.indexOf(step);

  return (
    <div className="generator">
      <header className="generator-header">
        <h1>Neue Rechnung</h1>
        <p className="muted">
          Phase 1 Gerüst — die vollständige Eingabemaske kommt in der nächsten Session.
        </p>
      </header>

      <nav className="stepper" aria-label="Fortschritt">
        {STEPS.map((s, i) => (
          <button
            key={s}
            type="button"
            className={`stepper-item ${i === stepIndex ? 'is-active' : ''} ${
              i < stepIndex ? 'is-done' : ''
            }`}
            onClick={() => setStep(s)}
          >
            <span className="stepper-num">{i + 1}</span>
            <span className="stepper-label">{STEP_LABELS[s]}</span>
          </button>
        ))}
      </nav>

      <main className="generator-body">
        <p className="placeholder">
          Schritt: <strong>{STEP_LABELS[step]}</strong>
        </p>
      </main>

      <footer className="generator-actions">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => setStep(STEPS[Math.max(0, stepIndex - 1)])}
          disabled={stepIndex === 0}
        >
          Zurück
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() =>
            setStep(STEPS[Math.min(STEPS.length - 1, stepIndex + 1)])
          }
          disabled={stepIndex === STEPS.length - 1}
        >
          Weiter
        </button>
      </footer>
    </div>
  );
}
