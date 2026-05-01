import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSession } from '@/auth/useSession';

// Wraps a tree of routes that require an authenticated session.
//
// While loading: renders a tiny placeholder (intentionally unstyled — we want
// the auth flicker to be invisible, not a flash of "Loading...").
//
// While unauthenticated: redirects to /login, preserving the original target
// in `?next=` so we can return there post-login.

export function ProtectedRoute() {
  const { user, loading } = useSession();
  const location = useLocation();

  if (loading) {
    // Empty render — < 16 ms in practice. If this ever stretches, replace
    // with a centered logo skeleton.
    return null;
  }

  if (!user) {
    const next = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?next=${next}`} replace />;
  }

  return <Outlet />;
}
