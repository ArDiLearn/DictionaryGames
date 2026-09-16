const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../../../../');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const MANIFEST_PATH = path.resolve(DIST_DIR, 'manifest.webmanifest');
const SW_PATH = path.resolve(DIST_DIR, 'sw.js');

console.log('📱 Auditing PWA build & offline assets in dist/...');

if (!fs.existsSync(DIST_DIR)) {
  console.error('❌ dist/ directory not found. Please run "npm run build" first.');
  process.exit(1);
}

let errors = 0;

// 1. Check Manifest
if (!fs.existsSync(MANIFEST_PATH)) {
  console.error('❌ manifest.webmanifest is missing in dist/');
  errors++;
} else {
  try {
    const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
    console.log(`✅ Web App Manifest found: "${manifest.name}" (${manifest.short_name})`);
    if (!manifest.icons || manifest.icons.length === 0) {
      console.warn('⚠️ Warning: No icons specified in manifest.webmanifest');
    }
    if (manifest.display !== 'standalone') {
      console.warn(`⚠️ Warning: Manifest display mode is "${manifest.display}", recommended: "standalone"`);
    }
  } catch (err) {
    console.error('❌ Failed to parse manifest.webmanifest:', err.message);
    errors++;
  }
}

// 2. Check Service Worker
if (!fs.existsSync(SW_PATH)) {
  console.error('❌ Service Worker (sw.js) is missing in dist/');
  errors++;
} else {
  const swSize = fs.statSync(SW_PATH).size;
  console.log(`✅ Service Worker (sw.js) present (${Math.round(swSize / 1024)} KB)`);
}

// 3. Check Assets
const assetsDir = path.resolve(DIST_DIR, 'assets');
if (fs.existsSync(assetsDir)) {
  const files = fs.readdirSync(assetsDir);
  const fontFiles = files.filter(f => f.endsWith('.ttf') || f.endsWith('.woff2'));
  const jsFiles = files.filter(f => f.endsWith('.js'));
  const cssFiles = files.filter(f => f.endsWith('.css'));

  console.log(`✅ Assets: ${fontFiles.length} fonts, ${jsFiles.length} JS bundles, ${cssFiles.length} CSS stylesheets.`);
}

console.log('--------------------------------------------------');
if (errors === 0) {
  console.log('✅ PWA offline bundle is ready for production and school deployment!');
} else {
  console.error(`❌ Found ${errors} PWA audit errors.`);
  process.exit(1);
}
