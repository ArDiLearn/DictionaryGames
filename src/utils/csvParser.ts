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

    const [en, lv, ru, transcription] = columns.map((c) => (c ? c.trim() : ''));

    // Topic Header
    if (!currentTopic) {
      const topicId = slugify(en);
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
        const phTrans = transcription || TRANSCRIPTIONS[en.toLowerCase().trim()] || '';
        currentTopic.words.push({
          id: String(wordCounter++),
          en,
          lv: lv || '',
          ru: ru || '',
          ...(phTrans ? { transcription: phTrans } : {}),
        });
      }
    }
  }

  return topics;
}
