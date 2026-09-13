import { TopicProgress, WordProgress, UserStats, Grade, GradeFilter } from '../types';
import { getCurrentUser, syncProgressToCloud, fetchProgressFromCloud } from './supabase';

const STATS_KEY = 'wordykids_user_stats';
const TOPIC_PROGRESS_KEY = 'wordykids_topic_progress';
const WORD_PROGRESS_KEY = 'wordykids_word_progress';
const LANG_KEY = 'wordykids_lang';
const GRADE_KEY = 'wordykids_grade';

export function getStoredLanguage(): 'ru' | 'lv' {
  const lang = localStorage.getItem(LANG_KEY);
  if (lang === 'lv' || lang === 'ru') return lang;
  // Auto-detect from browser if Latvian
  if (typeof navigator !== 'undefined' && navigator.language?.startsWith('lv')) {
    return 'lv';
  }
  return 'ru';
}

export function saveStoredLanguage(lang: 'ru' | 'lv') {
  localStorage.setItem(LANG_KEY, lang);
}

export function getStoredGrades(): Grade[] {
  const g = localStorage.getItem(GRADE_KEY);
  if (!g || g === 'all') return [1, 2, 3];
  if (g === '1') return [1];
  if (g === '2') return [2];
  if (g === '3') return [3];
  try {
    const parsed = g
      .split(',')
      .map(Number)
      .filter((n): n is Grade => n === 1 || n === 2 || n === 3);
    if (parsed.length > 0) {
      return Array.from(new Set(parsed)).sort() as Grade[];
    }
  } catch {}
  return [1, 2, 3];
}

export function saveStoredGrades(grades: Grade[]) {
  const sorted = Array.from(new Set(grades)).sort() as Grade[];
  if (sorted.length >= 3) {
    localStorage.setItem(GRADE_KEY, 'all');
  } else {
    localStorage.setItem(GRADE_KEY, sorted.join(','));
  }
}

export function getStoredGradeFilter(): GradeFilter {
  const g = localStorage.getItem(GRADE_KEY);
  if (g === '1' || g === '2' || g === '3' || g === 'all') return g;
  return 'all';
}

export function saveStoredGradeFilter(filter: GradeFilter) {
  localStorage.setItem(GRADE_KEY, filter);
}

export function getStoredGrade(): Grade {
  const grades = getStoredGrades();
  return grades[0] || 1;
}

export function saveStoredGrade(grade: Grade) {
  saveStoredGrades([grade]);
}

export function getDefaultStats(): UserStats {
  const today = new Date().toISOString().split('T')[0];
  return {
    playerName: 'Знайка',
    avatar: '🦁',
    soundEnabled: true,
    speechRate: 0.85,
    streak: 1,
    lastActiveDate: today,
  };
}

export function loadLocalStats(): UserStats {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return getDefaultStats();
    const stats: UserStats = JSON.parse(raw);
    
    // Check streak
    const today = new Date().toISOString().split('T')[0];
    if (stats.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (stats.lastActiveDate === yesterday) {
        stats.streak = (stats.streak || 0) + 1;
      } else {
        stats.streak = 1;
      }
      stats.lastActiveDate = today;
      saveLocalStats(stats);
    }
    return stats;
  } catch {
    return getDefaultStats();
  }
}

export function saveLocalStats(stats: UserStats) {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  triggerCloudSync();
}

export function loadTopicProgress(): Record<string, TopicProgress> {
  try {
    const raw = localStorage.getItem(TOPIC_PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveTopicProgress(progress: Record<string, TopicProgress>) {
  localStorage.setItem(TOPIC_PROGRESS_KEY, JSON.stringify(progress));
  triggerCloudSync();
}

export function loadWordProgress(): Record<string, WordProgress> {
  try {
    const raw = localStorage.getItem(WORD_PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveWordProgress(progress: Record<string, WordProgress>) {
  localStorage.setItem(WORD_PROGRESS_KEY, JSON.stringify(progress));
  triggerCloudSync();
}

export function recordWordAttempt(
  wordId: string,
  topicId: string,
  isCorrect: boolean,
  totalWordsInTopic: number
): { stars: number; newlyMastered: boolean } {
  const words = loadWordProgress();
  const topics = loadTopicProgress();

  const prev = words[wordId] || {
    word_id: wordId,
    topic_id: topicId,
    timesCorrect: 0,
    timesWrong: 0,
    isLearned: false,
  };

  const timesCorrect = prev.timesCorrect + (isCorrect ? 1 : 0);
  const timesWrong = prev.timesWrong + (isCorrect ? 0 : 1);
  const isLearned = timesCorrect >= 2 && timesCorrect > timesWrong;
  const newlyMastered = !prev.isLearned && isLearned;

  words[wordId] = {
    word_id: wordId,
    topic_id: topicId,
    timesCorrect,
    timesWrong,
    isLearned,
    lastReviewedAt: new Date().toISOString(),
  };
  saveWordProgress(words);

  // Update Topic progress
  const topic = topics[topicId] || {
    topic_id: topicId,
    stars: 0,
    masteredWordIds: [],
  };

  const masteredSet = new Set(topic.masteredWordIds);
  if (isLearned) {
    masteredSet.add(wordId);
  }
  topic.masteredWordIds = Array.from(masteredSet);

  // Calculate stars (0-3)
  const ratio = topic.masteredWordIds.length / Math.max(1, totalWordsInTopic);
  let stars = 0;
  if (ratio >= 1) {
    stars = 3;
  } else if (ratio >= 0.5) {
    stars = 2;
  } else if (ratio > 0.1 || topic.masteredWordIds.length >= 1) {
    stars = 1;
  }

  topic.stars = Math.max(topic.stars, stars);
  topic.lastPlayedAt = new Date().toISOString();
  topics[topicId] = topic;

  saveTopicProgress(topics);

  return { stars: topic.stars, newlyMastered };
}

let syncTimeout: ReturnType<typeof setTimeout> | null = null;

export function triggerCloudSync() {
  if (syncTimeout) clearTimeout(syncTimeout);
  syncTimeout = setTimeout(async () => {
    try {
      const user = await getCurrentUser();
      if (!user) return;
      const stats = loadLocalStats();
      const topicProg = loadTopicProgress();
      const wordProg = loadWordProgress();
      await syncProgressToCloud(user.id, topicProg, wordProg, stats);
    } catch {
      // ignore offline errors
    }
  }, 1000);
}

export async function mergeWithCloud(): Promise<boolean> {
  try {
    const user = await getCurrentUser();
    if (!user) return false;

    const cloudData = await fetchProgressFromCloud(user.id);
    if (!cloudData) return false;

    // Merge local and cloud topic progress (taking max stars and union of words)
    const localTopics = loadTopicProgress();
    const mergedTopics = { ...localTopics };

    for (const [tid, cTopic] of Object.entries(cloudData.topicProgress)) {
      if (!mergedTopics[tid]) {
        mergedTopics[tid] = cTopic;
      } else {
        const unionWords = Array.from(
          new Set([...mergedTopics[tid].masteredWordIds, ...cTopic.masteredWordIds])
        );
        mergedTopics[tid] = {
          topic_id: tid,
          stars: Math.max(mergedTopics[tid].stars, cTopic.stars),
          masteredWordIds: unionWords,
          lastPlayedAt: mergedTopics[tid].lastPlayedAt || cTopic.lastPlayedAt,
        };
      }
    }
    saveTopicProgress(mergedTopics);

    // Merge word progress
    const localWords = loadWordProgress();
    const mergedWords = { ...localWords, ...cloudData.wordProgress };
    saveWordProgress(mergedWords);

    // Merge stats
    if (cloudData.statsPartial) {
      const currentStats = loadLocalStats();
      const mergedStats = { ...currentStats, ...cloudData.statsPartial };
      saveLocalStats(mergedStats);
    }

    return true;
  } catch (err) {
    console.error('Failed to merge with cloud:', err);
    return false;
  }
}
