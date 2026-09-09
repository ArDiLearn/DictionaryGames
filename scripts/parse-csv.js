import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CSV_PATH = path.resolve(__dirname, '../Словарь англ. 1-2 класс.csv');
const OUTPUT_PATH = path.resolve(__dirname, '../src/data/words.json');

// Map topic names to friendly Lucide icons and kid-friendly theme colors
const TOPIC_METADATA = {
  'Numbers 1-20': { icon: 'Hash', color: 'indigo', emoji: '🔢' },
  'Colours': { icon: 'Palette', color: 'purple', emoji: '🎨' },
  'Days of the week': { icon: 'Calendar', color: 'sky', emoji: '📅' },
  'Classroom objects': { icon: 'School', color: 'amber', emoji: '🎒' },
  'Family': { icon: 'Users', color: 'pink', emoji: '👨‍👩‍👧‍👦' },
  'Adjectives': { icon: 'Sparkles', color: 'emerald', emoji: '✨' },
  'Toys': { icon: 'Gamepad2', color: 'orange', emoji: '🧸' },
  'Activities': { icon: 'Bike', color: 'blue', emoji: '⚽' },
  'Pets': { icon: 'Cat', color: 'teal', emoji: '🐶' },
  'Farm animals': { icon: 'Egg', color: 'lime', emoji: '🐮' },
  'Wild animals': { icon: 'Compass', color: 'yellow', emoji: '🦁' },
  'Food and drink': { icon: 'Utensils', color: 'rose', emoji: '🍎' },
  'Fruit and vegetables': { icon: 'Apple', color: 'green', emoji: '🥕' },
  'Body': { icon: 'User', color: 'violet', emoji: '🧍' },
  'Face': { icon: 'Smile', color: 'amber', emoji: '👀' },
  'Abilities': { icon: 'Zap', color: 'cyan', emoji: '🚀' },
  'Clothes': { icon: 'Shirt', color: 'fuchsia', emoji: '👕' },
  'Hair': { icon: 'Scissors', color: 'yellow', emoji: '💇' },
  'At home': { icon: 'Home', color: 'blue', emoji: '🏠' },
  'Rooms': { icon: 'DoorOpen', color: 'indigo', emoji: '🚪' },
  'Garden': { icon: 'Flower2', color: 'emerald', emoji: '🌻' },
  'Building materials': { icon: 'Hammer', color: 'stone', emoji: '🧱' },
  'Actions': { icon: 'Flame', color: 'red', emoji: '⚡' },
};

/**
 * Parses a single CSV line taking quoted fields with commas into account.
 */
function parseCsvLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

export function parseDictionaryCsv(csvString) {
  const lines = csvString.split(/\r?\n/);
  const topics = [];
  let currentTopic = null;
  let wordCounter = 1;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i].trim();
    if (!rawLine) {
      currentTopic = null;
      continue;
    }

    const columns = parseCsvLine(rawLine);
    const isEmptyRow = columns.every((col) => !col || col === '');

    if (isEmptyRow) {
      currentTopic = null;
      continue;
    }

    const [en, lv, ru] = columns.map((c) => (c ? c.trim() : ''));

    // If there's no current topic, this non-empty row is a Topic Header
    if (!currentTopic) {
      const topicId = slugify(en);
      const meta = TOPIC_METADATA[en] || {
        icon: 'BookOpen',
        color: 'sky',
        emoji: '📚',
      };

      currentTopic = {
        topic_id: topicId,
        topic_name: {
          ru: ru || en,
          lv: lv || en,
          en: en,
        },
        icon: meta.icon,
        color: meta.color,
        emoji: meta.emoji,
        words: [],
      };
      topics.push(currentTopic);
    } else {
      // This is a word in the current topic
      if (en) {
        currentTopic.words.push({
          id: String(wordCounter++),
          en,
          lv: lv || '',
          ru: ru || '',
        });
      }
    }
  }

  return topics;
}

function run() {
  console.log(`Reading CSV from: ${CSV_PATH}`);
  if (!fs.existsSync(CSV_PATH)) {
    console.error(`CSV file not found at ${CSV_PATH}`);
    process.exit(1);
  }

  const csvContent = fs.readFileSync(CSV_PATH, 'utf-8');
  const topics = parseDictionaryCsv(csvContent);

  const totalWords = topics.reduce((sum, t) => sum + t.words.length, 0);
  console.log(`Parsed ${topics.length} topics and ${totalWords} total words.`);

  // Ensure target directory exists
  const outDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(topics, null, 2), 'utf-8');
  console.log(`Successfully written JSON to: ${OUTPUT_PATH}`);
}

run();
