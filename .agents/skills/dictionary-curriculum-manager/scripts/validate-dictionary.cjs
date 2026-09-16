const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../../../../');
const CSV_PATH = path.resolve(ROOT_DIR, 'Словарь англ. 1-2 класс.csv');
const JSON_PATH = path.resolve(ROOT_DIR, 'src/data/words.json');

console.log('🔍 Validating dictionary curriculum...');

if (!fs.existsSync(CSV_PATH)) {
  console.error('❌ CSV file missing at: ' + CSV_PATH);
  process.exit(1);
}

if (!fs.existsSync(JSON_PATH)) {
  console.error('❌ words.json missing. Run: node scripts/parse-csv.js');
  process.exit(1);
}

const wordsData = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));
let errors = 0;
let warnings = 0;

const totalTopics = wordsData.length;
const allWords = wordsData.flatMap(t => t.words);
const totalWords = allWords.length;

console.log(`📊 Topics found: ${totalTopics}, Total words: ${totalWords}`);

// Check grades breakdown
const gradeCounts = { 1: 0, 2: 0, 3: 0 };
allWords.forEach(w => {
  if (gradeCounts[w.grade] !== undefined) {
    gradeCounts[w.grade]++;
  } else {
    console.error(`❌ Word ${w.en} (id: ${w.id}) has invalid grade: ${w.grade}`);
    errors++;
  }
});

console.log(`   Grade 1: ${gradeCounts[1]} words | Grade 2: ${gradeCounts[2]} words | Grade 3: ${gradeCounts[3]} words`);

// Validate each topic
wordsData.forEach(t => {
  if (!t.topic_id) {
    console.error('❌ Topic missing topic_id');
    errors++;
  }
  if (!t.topic_name || !t.topic_name.ru || !t.topic_name.lv || !t.topic_name.en) {
    console.error(`❌ Topic ${t.topic_id} missing translations in topic_name`);
    errors++;
  }
  if (!t.words || t.words.length === 0) {
    console.error(`❌ Topic ${t.topic_id} has 0 words`);
    errors++;
  }

  // Check word duplicates within topic
  const seenEn = new Set();
  t.words.forEach(w => {
    const key = w.en.trim().toLowerCase();
    if (seenEn.has(key)) {
      console.warn(`⚠️ Warning: Duplicate word '${w.en}' in topic ${t.topic_id}`);
      warnings++;
    }
    seenEn.add(key);

    if (!w.en || !w.lv || !w.ru) {
      console.error(`❌ Word id ${w.id} in ${t.topic_id} has missing translations`);
      errors++;
    }
    if (!w.image) {
      console.warn(`⚠️ Word '${w.en}' has no image/emoji`);
      warnings++;
    }
  });
});

console.log('--------------------------------------------------');
if (errors === 0) {
  console.log(`✅ Dictionary is VALID! (${warnings} warnings)`);
} else {
  console.error(`❌ Dictionary validation failed with ${errors} errors and ${warnings} warnings.`);
  process.exit(1);
}
