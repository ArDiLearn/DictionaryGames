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
  'Farm animals +': { icon: 'Egg', color: 'lime', emoji: '🐴' },
  'Lauku dzīvnieki +': { icon: 'Egg', color: 'lime', emoji: '🐴' },
  'Фермерские животные +': { icon: 'Egg', color: 'lime', emoji: '🐴' },
  'Christmas and holidays': { icon: 'Gift', color: 'red', emoji: '🎄' },
  'Ziemassvētki un svētki': { icon: 'Gift', color: 'red', emoji: '🎄' },
  'Рождество и праздники': { icon: 'Gift', color: 'red', emoji: '🎄' },
  'Circus': { icon: 'Sparkles', color: 'fuchsia', emoji: '🎪' },
  'Cirks': { icon: 'Sparkles', color: 'fuchsia', emoji: '🎪' },
  'Цирк и костюмы': { icon: 'Sparkles', color: 'fuchsia', emoji: '🎪' },
  'Positions +': { icon: 'Compass', color: 'indigo', emoji: '🧭' },
  'Novietojums +': { icon: 'Compass', color: 'indigo', emoji: '🧭' },
  'Расположение +': { icon: 'Compass', color: 'indigo', emoji: '🧭' },
  'At home +': { icon: 'Home', color: 'blue', emoji: '🛋️' },
  'Mājās +': { icon: 'Home', color: 'blue', emoji: '🛋️' },
  'Дом и интерьер': { icon: 'Home', color: 'blue', emoji: '🛋️' },
  'Town +': { icon: 'Building2', color: 'emerald', emoji: '🏰' },
  'Pilsēta +': { icon: 'Building2', color: 'emerald', emoji: '🏰' },
  'Город и мир': { icon: 'Building2', color: 'emerald', emoji: '🏰' },
  'Friendship': { icon: 'Heart', color: 'pink', emoji: '🤝' },
  'Draudzība': { icon: 'Heart', color: 'pink', emoji: '🤝' },
  'Дружба и общение': { icon: 'Heart', color: 'pink', emoji: '🤝' },
  'Routine and time': { icon: 'Clock', color: 'amber', emoji: '⏰' },
  'Dienas ritms un laiks': { icon: 'Clock', color: 'amber', emoji: '⏰' },
  'Время и распорядок': { icon: 'Clock', color: 'amber', emoji: '⏰' },
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
  'Seasons': { icon: 'SunMedium', color: 'amber', emoji: '🌤️' },
  'Gadalaiki': { icon: 'SunMedium', color: 'amber', emoji: '🌤️' },
  'Времена года': { icon: 'SunMedium', color: 'amber', emoji: '🌤️' },
  'Shapes': { icon: 'Shapes', color: 'cyan', emoji: '🔷' },
  'Figūras': { icon: 'Shapes', color: 'cyan', emoji: '🔷' },
  'Фигуры': { icon: 'Shapes', color: 'cyan', emoji: '🔷' },
  'Ģeometriskās figūras': { icon: 'Shapes', color: 'cyan', emoji: '🔷' },
  'Геометрические фигуры': { icon: 'Shapes', color: 'cyan', emoji: '🔷' },
  'Instructions': { icon: 'CheckSquare', color: 'indigo', emoji: '📋' },
  'Norādījumi': { icon: 'CheckSquare', color: 'indigo', emoji: '📋' },
  'Инструкции': { icon: 'CheckSquare', color: 'indigo', emoji: '📋' },
  'Places': { icon: 'MapPin', color: 'emerald', emoji: '🏞️' },
  'Vietas': { icon: 'MapPin', color: 'emerald', emoji: '🏞️' },
  'Места': { icon: 'MapPin', color: 'emerald', emoji: '🏞️' },
  'Questions': { icon: 'HelpCircle', color: 'violet', emoji: '❓' },
  'Jautājumi': { icon: 'HelpCircle', color: 'violet', emoji: '❓' },
  'Вопросы': { icon: 'HelpCircle', color: 'violet', emoji: '❓' },
  'Helper words': { icon: 'Sparkles', color: 'amber', emoji: '🔤' },
  'Palīgvārdi': { icon: 'Sparkles', color: 'amber', emoji: '🔤' },
  'Слова-помощники': { icon: 'Sparkles', color: 'amber', emoji: '🔤' },
  'Birthday': { icon: 'Gift', color: 'pink', emoji: '🎂' },
  'Dzimšanas diena': { icon: 'Gift', color: 'pink', emoji: '🎂' },
  'День рождения': { icon: 'Gift', color: 'pink', emoji: '🎂' },
  'Feelings': { icon: 'Smile', color: 'amber', emoji: '🎭' },
  'Jūtas un emocijas': { icon: 'Smile', color: 'amber', emoji: '🎭' },
  'Чувства и эмоции': { icon: 'Smile', color: 'amber', emoji: '🎭' },
  'Jūtas': { icon: 'Smile', color: 'amber', emoji: '🎭' },
  'Чувства': { icon: 'Smile', color: 'amber', emoji: '🎭' },
  'Jobs': { icon: 'Briefcase', color: 'indigo', emoji: '🧑‍💼' },
  'Profesijas': { icon: 'Briefcase', color: 'indigo', emoji: '🧑‍💼' },
  'Профессии': { icon: 'Briefcase', color: 'indigo', emoji: '🧑‍💼' },
  'Transport': { icon: 'Car', color: 'sky', emoji: '🚗' },
  'Transports': { icon: 'Car', color: 'sky', emoji: '🚗' },
  'Транспорт': { icon: 'Car', color: 'sky', emoji: '🚗' },
  'Senses': { icon: 'Eye', color: 'purple', emoji: '👁️' },
  'Maņas': { icon: 'Eye', color: 'purple', emoji: '👁️' },
  'Органы чувств': { icon: 'Eye', color: 'purple', emoji: '👁️' },
  'Town': { icon: 'Building2', color: 'emerald', emoji: '🏙️' },
  'Pilsēta': { icon: 'Building2', color: 'emerald', emoji: '🏙️' },
  'Город': { icon: 'Building2', color: 'emerald', emoji: '🏙️' },
  'Prepositions of place': { icon: 'MapPin', color: 'teal', emoji: '📍' },
  'Vietas prievārdi': { icon: 'MapPin', color: 'teal', emoji: '📍' },
  'Предлоги места': { icon: 'MapPin', color: 'teal', emoji: '📍' },
  'Positions': { icon: 'MapPin', color: 'teal', emoji: '📍' },
  'Novietojums': { icon: 'MapPin', color: 'teal', emoji: '📍' },
  'Расположение': { icon: 'MapPin', color: 'teal', emoji: '📍' },
  'Directions': { icon: 'Compass', color: 'orange', emoji: '🧭' },
  'Virzieni': { icon: 'Compass', color: 'orange', emoji: '🧭' },
  'Направления': { icon: 'Compass', color: 'orange', emoji: '🧭' },
  'School materials': { icon: 'Scissors', color: 'amber', emoji: '📦' },
  'Skolas materiāli': { icon: 'Scissors', color: 'amber', emoji: '📦' },
  'Школьные материалы': { icon: 'Scissors', color: 'amber', emoji: '📦' },
  'Classroom objects +': { icon: 'School', color: 'amber', emoji: '🎒' },
  'Klases aprīkojums +': { icon: 'School', color: 'amber', emoji: '🎒' },
  'Оборудование класса +': { icon: 'School', color: 'amber', emoji: '🎒' },
  'Other words': { icon: 'Sparkles', color: 'emerald', emoji: '🌟' },
  'Dažādi vārdi': { icon: 'Sparkles', color: 'emerald', emoji: '🌟' },
  'Разные слова': { icon: 'Sparkles', color: 'emerald', emoji: '🌟' },
  'Meals': { icon: 'Utensils', color: 'rose', emoji: '🍽️' },
  'Ēdienreizes': { icon: 'Utensils', color: 'rose', emoji: '🍽️' },
  'Приёмы пищи': { icon: 'Utensils', color: 'rose', emoji: '🍽️' },
  'Age and people': { icon: 'Users', color: 'indigo', emoji: '🧑‍🤝‍🧑' },
  'Vecums un cilvēki': { icon: 'Users', color: 'indigo', emoji: '🧑‍🤝‍🧑' },
  'Возраст и люди': { icon: 'Users', color: 'indigo', emoji: '🧑‍🤝‍🧑' },
  'Family +': { icon: 'Users', color: 'pink', emoji: '👨‍👩‍👧‍👦' },
  'Ģimene +': { icon: 'Users', color: 'pink', emoji: '👨‍👩‍👧‍👦' },
  'Семья +': { icon: 'Users', color: 'pink', emoji: '👨‍👩‍👧‍👦' },
  'Food and drink +': { icon: 'Utensils', color: 'rose', emoji: '🍎' },
  'Ēdiens un dzērieni +': { icon: 'Utensils', color: 'rose', emoji: '🍎' },
  'Еда и напитки +': { icon: 'Utensils', color: 'rose', emoji: '🍎' },
  'Fruit and vegetables +': { icon: 'Apple', color: 'green', emoji: '🥕' },
  'Augļi un dārzeņi +': { icon: 'Apple', color: 'green', emoji: '🥕' },
  'Фрукты и овощи +': { icon: 'Apple', color: 'green', emoji: '🥕' },
  'Art and games +': { icon: 'Palette', color: 'pink', emoji: '🎨' },
  'Māksla un spēles +': { icon: 'Palette', color: 'pink', emoji: '🎨' },
  'Творчество и игры +': { icon: 'Palette', color: 'pink', emoji: '🎨' },
  'Toys +': { icon: 'Gamepad2', color: 'orange', emoji: '🧸' },
  'Rotaļlietas +': { icon: 'Gamepad2', color: 'orange', emoji: '🧸' },
  'Игрушки +': { icon: 'Gamepad2', color: 'orange', emoji: '🧸' },
  'Adjectives +': { icon: 'Sparkles', color: 'emerald', emoji: '✨' },
  'Īpašības vārdi +': { icon: 'Sparkles', color: 'emerald', emoji: '✨' },
  'Прилагательные +': { icon: 'Sparkles', color: 'emerald', emoji: '✨' },
  'Wild animals': { icon: 'Compass', color: 'yellow', emoji: '🦁' },
  'Savvaļas dzīvnieki': { icon: 'Compass', color: 'yellow', emoji: '🦁' },
  'Дикие животные': { icon: 'Compass', color: 'yellow', emoji: '🦁' },
  'Nature': { icon: 'SunMedium', color: 'amber', emoji: '☀️' },
  'Daba': { icon: 'SunMedium', color: 'amber', emoji: '☀️' },
  'Природа': { icon: 'SunMedium', color: 'amber', emoji: '☀️' },
  'Shapes +': { icon: 'Shapes', color: 'cyan', emoji: '🔷' },
  'Figūras +': { icon: 'Shapes', color: 'cyan', emoji: '🔷' },
  'Фигуры +': { icon: 'Shapes', color: 'cyan', emoji: '🔷' },
  'School subjects': { icon: 'BookOpen', color: 'indigo', emoji: '📐' },
  'Mācību priekšmeti': { icon: 'BookOpen', color: 'indigo', emoji: '📐' },
  'Школьные предметы': { icon: 'BookOpen', color: 'indigo', emoji: '📐' },
  'Outdoor things': { icon: 'Compass', color: 'emerald', emoji: '🎒' },
  'Lietas pastaigai': { icon: 'Compass', color: 'emerald', emoji: '🎒' },
  'Вещи для прогулки': { icon: 'Compass', color: 'emerald', emoji: '🎒' },
  'Food': { icon: 'Utensils', color: 'rose', emoji: '🍪' },
  'Ēdiens': { icon: 'Utensils', color: 'rose', emoji: '🍪' },
  'Еда': { icon: 'Utensils', color: 'rose', emoji: '🍪' },
  'Crafts': { icon: 'Scissors', color: 'amber', emoji: '🎭' },
  'Rokdarbi': { icon: 'Scissors', color: 'amber', emoji: '🎭' },
  'Поделки и творчество': { icon: 'Scissors', color: 'amber', emoji: '🎭' },
  'Arts and crafts materials': { icon: 'Palette', color: 'purple', emoji: '🎨' },
  'Materiāli rokdarbiem': { icon: 'Palette', color: 'purple', emoji: '🎨' },
  'Материалы для творчества': { icon: 'Palette', color: 'purple', emoji: '🎨' },
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
    .replace(/\+/g, 'plus')
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
      if (topicId === 'shapes_plus') {
        topicId = 'shapes';
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

        if (col4 === '1' || col4 === '2' || col4 === '3' || col4 === '4') {
          grade = parseInt(col4, 10);
          if (col5) phTrans = col5;
        } else if (col4 && col4.startsWith('[')) {
          phTrans = col4;
          if (col5 === '1' || col5 === '2' || col5 === '3' || col5 === '4') {
            grade = parseInt(col5, 10);
          }
        } else if (col4) {
          const parsed = parseInt(col4, 10);
          if (!isNaN(parsed) && (parsed >= 1 && parsed <= 4)) {
            grade = parsed;
          }
        }

        if (!phTrans) {
          phTrans = TRANSCRIPTIONS[en.toLowerCase().trim()] || '';
        }

        const image =
          WORD_IMAGES[`${currentTopic.topic_id}:${en.toLowerCase().trim()}`] ||
          WORD_IMAGES[en.toLowerCase().trim()] ||
          currentTopic.emoji ||
          '✨';

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
