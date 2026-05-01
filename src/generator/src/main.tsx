import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './App.css';

const mountNode = document.getElementById('generator-root');

if (!mountNode) {
  // The host page is responsible for providing #generator-root. If it's
  // missing, fail loudly during development; in production this script tag
  // shouldn't even be served on pages that don't host the generator.
  throw new Error('Klarbill generator: #generator-root not found in DOM');
}

createRoot(mountNode).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
