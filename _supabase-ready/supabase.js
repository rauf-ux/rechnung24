// ============================================================================
// supabase.js — Klarbill (rechnung24) auth wrapper
// ----------------------------------------------------------------------------
// Single shared file for all auth pages. Loaded after the Supabase CDN script.
// Edit the two PLACEHOLDER values below before the first deploy.
// ============================================================================

window.KLARBILL_CONFIG = {
  // 🔧 FILL IN — from Supabase → Settings → API
  SUPABASE_URL:      'https://YOUR-PROJECT-REF.supabase.co',
  SUPABASE_ANON_KEY: 'YOUR-ANON-KEY',

  // Where Supabase redirects after email-verify or OAuth
  AUTH_REDIRECT: window.location.origin + '/callback.html',

  // Where the user lands after a successful signup or login
  APP_HOME: '/welcome.html',

  // Where the user lands after logout
  PUBLIC_HOME: '/',
};

(function () {
  if (!window.supabase) {
    console.error('[klarbill] Supabase SDK not loaded — check the <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"> tag.');
    return;
  }

  const cfg = window.KLARBILL_CONFIG;
  const client = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,   // handles OAuth + magic-link callbacks automatically
    },
  });

  function isValidEmail(e) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(e || '').trim());
  }

  function friendlyError(err) {
    const msg = (err && err.message) || String(err || 'Unbekannter Fehler');
    const map = {
      'Invalid login credentials':         'Falsche E-Mail oder Passwort.',
      'Email not confirmed':               'Bitte bestätige zuerst deine E-Mail-Adresse.',
      'User already registered':           'Diese E-Mail ist bereits registriert.',
      'Password should be at least 8 characters': 'Passwort muss mindestens 8 Zeichen haben.',
      'Email rate limit exceeded':         'Zu viele Anfragen — bitte warte einige Minuten.',
      'Unable to validate email address: invalid format': 'Bitte gib eine gültige E-Mail-Adresse ein.',
    };
    for (const k of Object.keys(map)) if (msg.includes(k)) return map[k];
    return msg;
  }

  window.klarbillAuth = {
    client,

    signUpWithEmail: async ({ email, password, fullName }) => {
      const { data, error } = await client.auth.signUp({
        email, password,
        options: {
          data: { full_name: fullName || null },
          emailRedirectTo: cfg.AUTH_REDIRECT,
        },
      });
      if (error) throw error;
      return data;
    },

    signInWithEmail: async ({ email, password }) => {
      const { data, error } = await client.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data;
    },

    signInWithGoogle: async () => {
      const { error } = await client.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: cfg.AUTH_REDIRECT },
      });
      if (error) throw error;
    },

    resetPassword: async (email) => {
      const { error } = await client.auth.resetPasswordForEmail(email, {
        redirectTo: cfg.AUTH_REDIRECT + '?mode=recovery',
      });
      if (error) throw error;
    },

    updatePassword: async (newPassword) => {
      const { data, error } = await client.auth.updateUser({ password: newPassword });
      if (error) throw error;
      return data;
    },

    getSession: async () => {
      const { data } = await client.auth.getSession();
      return data.session;
    },

    getUser: async () => {
      const { data } = await client.auth.getUser();
      return data.user;
    },

    signOut: async () => {
      await client.auth.signOut();
      window.location.href = cfg.PUBLIC_HOME;
    },

    onAuthStateChange: (handler) => client.auth.onAuthStateChange(handler),

    // Drop-in for protected pages: <script>klarbillAuth.guard()</script>
    guard: async () => {
      const { data } = await client.auth.getSession();
      if (!data.session) {
        const next = encodeURIComponent(window.location.pathname + window.location.search);
        window.location.replace('/login.html?next=' + next);
      }
    },

    isValidEmail,
    friendlyError,
  };
})();
