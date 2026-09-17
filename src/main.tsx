import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Auto-update Service Worker immediately when new version is available,
// but NEVER interrupt an active game or exam!
let pendingSWRefresh: (() => void) | null = null;

function isGameOrExamActive(): boolean {
  try {
    return (
      (window as unknown as { __WORDYMIND_GAME_ACTIVE__?: boolean }).__WORDYMIND_GAME_ACTIVE__ === true ||
      sessionStorage.getItem('wordymind_game_active') === 'true'
    );
  } catch {
    return false;
  }
}

const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    if (isGameOrExamActive()) {
      // Postpone refresh until the active game or exam is completed
      pendingSWRefresh = () => updateSW(true);
      return;
    }
    updateSW(true);
  },
  onRegisteredSW(_swUrl, registration) {
    if (registration) {
      // Check for updates when user returns to app only if not in a game
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && !isGameOrExamActive()) {
          registration.update().catch(() => {});
        }
      });
      // Also check periodically every 10 minutes only if not in a game
      setInterval(() => {
        if (!isGameOrExamActive()) {
          registration.update().catch(() => {});
        }
      }, 10 * 60 * 1000);
    }
  },
});

// When active game or exam ends, execute any postponed update
window.addEventListener('wordymind_game_ended', () => {
  if (pendingSWRefresh) {
    const fn = pendingSWRefresh;
    pendingSWRefresh = null;
    fn();
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
