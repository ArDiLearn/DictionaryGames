const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../../../../');
const I18N_PATH = path.resolve(ROOT_DIR, 'src/utils/i18n.ts');

console.log('🌐 Auditing i18n localization parity (RU <-> LV)...');

if (!fs.existsSync(I18N_PATH)) {
  console.error('❌ i18n.ts not found at: ' + I18N_PATH);
  process.exit(1);
}

const content = fs.readFileSync(I18N_PATH, 'utf-8');

// Extract translations object keys
// We can use tsx or compile or simple extraction
function extractKeysFromSection(text, lang) {
  const match = text.match(new RegExp(`${lang}:\\s*\\{([\\s\\S]*?)\\n  \\},`, 'm'));
  if (!match) return [];
  const lines = match[1].split('\n');
  const keys = [];
  lines.forEach(line => {
    const keyMatch = line.match(/^\s*([a-zA-Z0-9_]+):/);
    if (keyMatch) {
      keys.push(keyMatch[1]);
    }
  });
  return keys;
}

const ruKeys = extractKeysFromSection(content, 'ru');
const lvKeys = extractKeysFromSection(content, 'lv');

console.log(`Found ${ruKeys.length} RU keys and ${lvKeys.length} LV keys.`);

const missingInLv = ruKeys.filter(k => !lvKeys.includes(k));
const missingInRu = lvKeys.filter(k => !ruKeys.includes(k));

let errors = 0;

if (missingInLv.length > 0) {
  console.error('❌ Keys present in RU but missing in LV:', missingInLv);
  errors++;
}

if (missingInRu.length > 0) {
  console.error('❌ Keys present in LV but missing in RU:', missingInRu);
  errors++;
}

// Check nested statsModal
function extractNestedKeys(text, lang, section) {
  const match = text.match(new RegExp(`${section}:\\s*\\{([\\s\\S]*?)\\n\\s*\\},`, 'm'));
  if (!match) return [];
  return match[1].split('\n')
    .map(l => l.match(/^\s*([a-zA-Z0-9_]+):/))
    .filter(Boolean)
    .map(m => m[1]);
}

const ruStats = extractNestedKeys(content, 'ru', 'statsModal');
const lvStats = extractNestedKeys(content, 'lv', 'statsModal');
console.log(`Found ${ruStats.length} RU statsModal keys and ${lvStats.length} LV statsModal keys.`);

const missingStatsInLv = ruStats.filter(k => !lvStats.includes(k));
const missingStatsInRu = lvStats.filter(k => !ruStats.includes(k));

if (missingStatsInLv.length > 0) {
  console.error('❌ statsModal keys in RU missing in LV:', missingStatsInLv);
  errors++;
}
if (missingStatsInRu.length > 0) {
  console.error('❌ statsModal keys in LV missing in RU:', missingStatsInRu);
  errors++;
}

if (errors === 0) {
  console.log('✅ 100% Translation parity between RU and LV!');
} else {
  console.error(`❌ Found ${errors} i18n parity issues.`);
  process.exit(1);
}
