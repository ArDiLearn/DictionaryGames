import { Topic } from '../types';
import { TRANSCRIPTIONS } from '../data/transcriptions';

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

/**
 * Parses raw CSV content of 1-2 grade dictionary into structured Topics with Words.
 */
export function parseDictionaryCsv(csvString: string): Topic[] {
  const lines = csvString.split(/\r?\n/);
  const topics: Topic[] = [];
  let currentTopic: Topic | null = null;
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

    // Topic Header
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
      currentTopic = {
        topic_id: topicId,
        topic_name: {
          ru: ru || en,
          lv: lv || en,
          en: en,
        },
        icon: 'BookOpen',
        color: 'sky',
        emoji: '📚',
        words: [],
      };
      topics.push(currentTopic);
    } else {
      // Word row
      if (en) {
        let grade = 1;
        let phTrans = '';

        if (col4 === '1' || col4 === '2') {
          grade = parseInt(col4, 10);
          if (col5) phTrans = col5;
        } else if (col4 && col4.startsWith('[')) {
          phTrans = col4;
          if (col5 === '1' || col5 === '2') {
            grade = parseInt(col5, 10);
          }
        } else if (col4) {
          const parsed = parseInt(col4, 10);
          if (!isNaN(parsed) && (parsed === 1 || parsed === 2)) {
            grade = parsed;
          }
        }

        if (!phTrans) {
          phTrans = TRANSCRIPTIONS[en.toLowerCase().trim()] || '';
        }

        currentTopic.words.push({
          id: String(wordCounter++),
          en,
          lv: lv || '',
          ru: ru || '',
          grade,
          ...(phTrans ? { transcription: phTrans } : {}),
        });
      }
    }
  }

  return topics;
}
