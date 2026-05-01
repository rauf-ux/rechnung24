import { Navigate, Route, Routes } from 'react-router-dom';

import { AppLayout } from '@/layout/AppLayout';
import { AuthLayout } from '@/layout/AuthLayout';
import { OnboardingLayout } from '@/layout/OnboardingLayout';
import { ProtectedRoute } from '@/layout/ProtectedRoute';

import { LoginPage } from '@/routes/login';
import { SignupPage } from '@/routes/signup';
import { ForgotPage } from '@/routes/forgot';
import { CallbackPage } from '@/routes/callback';

import { OnboardingStep1 } from '@/routes/onboarding/step-1';
import { OnboardingStep2 } from '@/routes/onboarding/step-2';
import { OnboardingStep3 } from '@/routes/onboarding/step-3';
import { WelcomePage } from '@/routes/welcome';
import { DonePage } from '@/routes/done';

import { DashboardPage } from '@/routes/dashboard';
import { InvoicesListPage } from '@/routes/invoices/list';
import { InvoicesNewPage } from '@/routes/invoices/new';
import { ClientsPage } from '@/routes/clients';
import { SettingsPage } from '@/routes/settings';

// Klarbill app — top-level route table.
//
// Three families of routes, three layouts:
//   1. Public auth — AuthLayout (centered card, no nav)
//   2. Onboarding — OnboardingLayout (focused single-card with progress dots)
//   3. Authenticated app — AppLayout (sidebar + topbar) wrapped in <ProtectedRoute>
//
// `/welcome` and `/done` use AuthLayout because they're celebratory single-card
// moments with no sidebar; `/welcome` is also unauthenticated (it's the post-
// signup splash), `/done` happens after onboarding so it could be either —
// AuthLayout keeps it visually focused.
//
// Catch-all redirects to /dashboard, which itself redirects to /login if the
// user isn't signed in (via ProtectedRoute).

export function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot" element={<ForgotPage />} />
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/done" element={<DonePage />} />
      </Route>

      {/* Onboarding */}
      <Route element={<OnboardingLayout />}>
        <Route path="/onboarding/1" element={<OnboardingStep1 />} />
        <Route path="/onboarding/2" element={<OnboardingStep2 />} />
        <Route path="/onboarding/3" element={<OnboardingStep3 />} />
      </Route>

      {/* Authenticated app */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/invoices" element={<InvoicesListPage />} />
          <Route path="/invoices/new" element={<InvoicesNewPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>

      {/* Catch-all → dashboard (which redirects to /login if no session) */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
