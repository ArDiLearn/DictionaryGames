import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { TRANSCRIPTIONS } from './transcriptions.js';
import { WORD_IMAGES } from './word-images.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CSV_PATH = path.resolve(__dirname, '../Словарь англ. 1-2 класс.csv');
const OUTPUT_PATH = path.resolve(__dirname, '../src/data/words.json');

// Map topic names to friendly Lucide icons and kid-friendly theme colors
const TOPIC_METADATA = {
  'Numbers': { icon: 'Hash', color: 'indigo', emoji: '🔢' },
  'Numbers 1-20': { icon: 'Hash', color: 'indigo', emoji: '🔢' },
  'Числа': { icon: 'Hash', color: 'indigo', emoji: '🔢' },
  'Skaitļi': { icon: 'Hash', color: 'indigo', emoji: '🔢' },
  'Colours': { icon: 'Palette', color: 'purple', emoji: '🎨' },
  'Days of the week': { icon: 'Calendar', color: 'sky', emoji: '📅' },
  'Months': { icon: 'CalendarDays', color: 'teal', emoji: '🗓️' },
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
  'Introductions': { icon: 'MessageCircle', color: 'purple', emoji: '👋' },
  'Pronouns': { icon: 'UserCheck', color: 'blue', emoji: '🗣️' },
  'Знакомство': { icon: 'MessageCircle', color: 'purple', emoji: '👋' },
  'Местоимения': { icon: 'UserCheck', color: 'blue', emoji: '🗣️' },
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

    let [en, lv, ru, col4, col5] = columns.map((c) => (c ? c.trim() : ''));

    // If there's no current topic, this non-empty row is a Topic Header
    if (!currentTopic) {
      if (!en && ru) {
        if (ru === 'Знакомство') {
          en = 'Introductions';
          lv = lv || 'Iepazīšanās';
        } else if (ru === 'Местоимения') {
          en = 'Pronouns';
          lv = lv || 'Vietniekvārdi';
        } else {
          en = ru;
        }
      }

      let topicId = slugify(en || 'topic');
      if (topicId === 'numbers') {
        topicId = 'numbers_1_20';
      }
      const meta = TOPIC_METADATA[en] || TOPIC_METADATA[ru] || {
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
        let grade = 1;
        let phTrans = '';

        if (col4 === '1' || col4 === '2' || col4 === '3') {
          grade = parseInt(col4, 10);
          if (col5) phTrans = col5;
        } else if (col4 && col4.startsWith('[')) {
          phTrans = col4;
          if (col5 === '1' || col5 === '2' || col5 === '3') {
            grade = parseInt(col5, 10);
          }
        } else if (col4) {
          const parsed = parseInt(col4, 10);
          if (!isNaN(parsed) && (parsed >= 1 && parsed <= 3)) {
            grade = parsed;
          }
        }

        if (!phTrans) {
          phTrans = TRANSCRIPTIONS[en.toLowerCase().trim()] || '';
        }

        const image = WORD_IMAGES[en.toLowerCase().trim()] || meta.emoji || '✨';

        currentTopic.words.push({
          id: String(wordCounter++),
          en,
          lv: lv || '',
          ru: ru || '',
          grade,
          image,
          ...(phTrans ? { transcription: phTrans } : {}),
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
