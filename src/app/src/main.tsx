import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';
import './index.css';

// Klarbill app — entry point.
//
// In production, the SPA is served at klarbill.de/app/* and the Vercel rewrite
// rule (vercel.json) sends every /app/* request to /app/index.html.
// `basename="/app"` tells React Router that internal route paths like /login
// correspond to /app/login on the actual URL bar.
//
// In dev (npm run dev), Vite serves at localhost:5173/ and basename is empty
// so /login means /login.

const basename = import.meta.env.PROD ? '/app' : '/';

const mountNode = document.getElementById('app-root');

if (!mountNode) {
  throw new Error('Klarbill app: #app-root not found in DOM');
}

createRoot(mountNode).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
