import { useEffect, useState } from 'react';

// MOCK session hook — Phase 1 placeholder.
//
// Replaces with real Supabase wiring next session:
//
//   import { supabase } from './supabase';
//   const { data: { session } } = await supabase.auth.getSession();
//   supabase.auth.onAuthStateChange((_, session) => setSession(session));
//
// For now, returns { user: null, loading: false } so ProtectedRoute can
// redirect every protected route to /login. Override via ?dev-user=1 in the
// URL to simulate a logged-in user during layout development.

export interface MockUser {
  id: string;
  email: string;
}

export interface SessionState {
  user: MockUser | null;
  loading: boolean;
}

export function useSession(): SessionState {
  const [state, setState] = useState<SessionState>({
    user: null,
    loading: true,
  });

  useEffect(() => {
    // Pretend to "check session" — completes on next tick so UIs can render
    // a loading state if they want.
    const params = new URLSearchParams(window.location.search);
    const devUser = params.get('dev-user') === '1';

    const t = setTimeout(() => {
      setState({
        user: devUser
          ? { id: 'dev', email: 'dev@klarbill.de' }
          : null,
        loading: false,
      });
    }, 0);

    return () => clearTimeout(t);
  }, []);

  return state;
}
