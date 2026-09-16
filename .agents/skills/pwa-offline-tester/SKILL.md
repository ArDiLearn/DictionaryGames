---
name: pwa-offline-tester
description: >-
  Auditing Progressive Web App (PWA) assets, service worker caching, offline capability,
  manifest configuration, and bundle sizes in DictionaryGames.
  Use when building production releases or verifying offline tablet/mobile experience.
---

# PWA & Offline Readiness Tester

This skill guides the verification of Progressive Web App (PWA) features, Workbox service worker caching, and offline playability in the Wordy Kids application.

## Key PWA Assets & Architecture

1. **Manifest Configuration**: Defined in `vite.config.ts` via `VitePWA` plugin:
   - `name`: "WordyKids - English for Kids 1-2 Grade"
   - `display`: "standalone"
   - `theme_color`: "#6366f1"
   - `icons`: Masks and favicons located in `public/`
2. **Service Worker**:
   - Built using Workbox (`mode: generateSW`).
   - Automatically precaches HTML, JS, CSS, and TTF Comic fonts (`comic.ttf`, `comicbd.ttf`) for full offline sound/visual rendering.
3. **Install Prompt Banner**:
   - Component: `src/components/PwaInstallPrompt.tsx` captures the browser's `beforeinstallprompt` event and displays a kid-friendly install button.

## Verification Checklist

### Step 1: Run Production Build
```bash
npm run build
```

### Step 2: Audit Output Directory
Execute the PWA audit script:
```bash
node .agents/skills/pwa-offline-tester/scripts/audit-pwa.cjs
```

### Step 3: Browser Offline Mode Test
1. Run local preview: `npx vite preview`.
2. Open Chrome/Edge DevTools -> **Application** -> **Service Workers** -> Check "Offline".
3. Refresh page and verify all mini-games load and work without internet connectivity.
