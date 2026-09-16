import { TopicProgress, WordProgress, UserStats, Grade, GradeFilter, LearningCourse, ExamResult } from '../types';
import { getCurrentUser, syncProgressToCloud, fetchProgressFromCloud } from './supabase';
import { DEFAULT_UNLOCKED_AVATARS } from '../data/avatars';

const STATS_KEY = 'mindwordy_user_stats';
const OLD_STATS_KEY = 'wordykids_user_stats';

const TOPIC_PROGRESS_KEY = 'mindwordy_topic_progress';
const OLD_TOPIC_PROGRESS_KEY = 'wordykids_topic_progress';

const WORD_PROGRESS_KEY = 'mindwordy_word_progress';
const OLD_WORD_PROGRESS_KEY = 'wordykids_word_progress';

const LANG_KEY = 'mindwordy_lang';
const OLD_LANG_KEY = 'wordykids_lang';

const GRADE_KEY = 'mindwordy_grade';
const OLD_GRADE_KEY = 'wordykids_grade';

const COURSE_KEY = 'mindwordy_course';
const OLD_COURSE_KEY = 'wordykids_course';

function getItemWithFallback(newKey: string, oldKey: string): string | null {
  try {
    const val = localStorage.getItem(newKey);
    if (val !== null) return val;
    const oldVal = localStorage.getItem(oldKey);
    if (oldVal !== null) {
      localStorage.setItem(newKey, oldVal);
      return oldVal;
    }
  } catch {}
  return null;
}

export function getStoredCourse(): LearningCourse {
  try {
    const c = getItemWithFallback(COURSE_KEY, OLD_COURSE_KEY);
    if (c === 'lv' || c === 'en') return c;
  } catch {}
  return 'en';
}

export function saveStoredCourse(course: LearningCourse) {
  try {
    localStorage.setItem(COURSE_KEY, course);
  } catch {}
}

function getTopicProgressKey(course: LearningCourse = 'en', legacy = false): string {
  const base = legacy ? OLD_TOPIC_PROGRESS_KEY : TOPIC_PROGRESS_KEY;
  return course === 'lv' ? `${base}_lv` : base;
}

function getWordProgressKey(course: LearningCourse = 'en', legacy = false): string {
  const base = legacy ? OLD_WORD_PROGRESS_KEY : WORD_PROGRESS_KEY;
  return course === 'lv' ? `${base}_lv` : base;
}

export function getStoredLanguage(): 'ru' | 'lv' {
  try {
    const lang = getItemWithFallback(LANG_KEY, OLD_LANG_KEY);
    if (lang === 'lv' || lang === 'ru') return lang;
  } catch {}
  return 'lv';
}

export function saveStoredLanguage(lang: 'ru' | 'lv') {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {}
}

export function getStoredGrades(): Grade[] {
  const g = getItemWithFallback(GRADE_KEY, OLD_GRADE_KEY);
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
  const g = getItemWithFallback(GRADE_KEY, OLD_GRADE_KEY);
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
    playerName: 'Zinītis',
    avatar: '🦁',
    soundEnabled: true,
    speechRate: 0.85,
    streak: 1,
    lastActiveDate: today,
    unlockedAvatars: DEFAULT_UNLOCKED_AVATARS,
    spentStars: 0,
    totalStarsEarned: 0,
  };
}

export function loadLocalStats(): UserStats {
  try {
    const raw = getItemWithFallback(STATS_KEY, OLD_STATS_KEY);
    if (!raw) return getDefaultStats();
    const stats: UserStats = JSON.parse(raw);
    
    // Ensure unlockedAvatars, spentStars and totalStarsEarned exist
    if (!stats.unlockedAvatars || stats.unlockedAvatars.length === 0) {
      stats.unlockedAvatars = DEFAULT_UNLOCKED_AVATARS;
    }
    if (stats.spentStars === undefined || typeof stats.spentStars !== 'number') {
      stats.spentStars = 0;
    }
    if (stats.totalStarsEarned === undefined || typeof stats.totalStarsEarned !== 'number') {
      const topics = loadTopicProgress();
      const topicStarsSum = Object.values(topics).reduce((sum, tp) => sum + (tp.stars || 0), 0);
      stats.totalStarsEarned = topicStarsSum;
    }

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

export function addEarnedStars(starsCount: number): UserStats {
  const currentStats = loadLocalStats();
  const currentTotal = currentStats.totalStarsEarned || 0;
  const newStats: UserStats = {
    ...currentStats,
    totalStarsEarned: currentTotal + starsCount,
  };
  saveLocalStats(newStats);
  return newStats;
}

export function purchaseAvatar(
  avatarEmoji: string,
  price: number,
  totalStarsEarned: number
): { success: boolean; newStats: UserStats } {
  const currentStats = loadLocalStats();
  const spentStars = currentStats.spentStars || 0;
  const total = Math.max(currentStats.totalStarsEarned || 0, totalStarsEarned);
  const availableStars = Math.max(0, total - spentStars);

  if (availableStars < price) {
    return { success: false, newStats: currentStats };
  }

  const unlocked = new Set(currentStats.unlockedAvatars || DEFAULT_UNLOCKED_AVATARS);
  unlocked.add(avatarEmoji);

  const newStats: UserStats = {
    ...currentStats,
    spentStars: spentStars + price,
    totalStarsEarned: total,
    unlockedAvatars: Array.from(unlocked),
    avatar: avatarEmoji, // auto-equip newly purchased avatar
  };

  saveLocalStats(newStats);
  return { success: true, newStats };
}

export function saveLocalStats(stats: UserStats) {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  triggerCloudSync();
}

export function loadTopicProgress(course: LearningCourse = 'en'): Record<string, TopicProgress> {
  try {
    const raw = getItemWithFallback(getTopicProgressKey(course), getTopicProgressKey(course, true));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveTopicProgress(progress: Record<string, TopicProgress>, course: LearningCourse = 'en') {
  localStorage.setItem(getTopicProgressKey(course), JSON.stringify(progress));
  triggerCloudSync();
}

export function loadWordProgress(course: LearningCourse = 'en'): Record<string, WordProgress> {
  try {
    const raw = getItemWithFallback(getWordProgressKey(course), getWordProgressKey(course, true));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveWordProgress(progress: Record<string, WordProgress>, course: LearningCourse = 'en') {
  localStorage.setItem(getWordProgressKey(course), JSON.stringify(progress));
  triggerCloudSync();
}

export function recordWordAttempt(
  wordId: string,
  topicId: string,
  isCorrect: boolean,
  totalWordsInTopic: number,
  course: LearningCourse = 'en'
): { stars: number; newlyMastered: boolean } {
  const words = loadWordProgress(course);
  const topics = loadTopicProgress(course);

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
  saveWordProgress(words, course);

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

  saveTopicProgress(topics, course);

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

const EXAM_RESULTS_KEY = 'mindwordy_exam_results';
const OLD_EXAM_RESULTS_KEY = 'wordykids_exam_results';

function getExamResultsKey(course: LearningCourse = 'en', legacy = false): string {
  const base = legacy ? OLD_EXAM_RESULTS_KEY : EXAM_RESULTS_KEY;
  return course === 'lv' ? `${base}_lv` : base;
}

export function loadExamResults(course: LearningCourse = 'en'): Record<number, ExamResult> {
  try {
    const key = getExamResultsKey(course);
    const oldKey = getExamResultsKey(course, true);
    const raw = getItemWithFallback(key, oldKey);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {}
  return {};
}

export function saveExamResult(
  course: LearningCourse = 'en',
  result: ExamResult
): Record<number, ExamResult> {
  try {
    const current = loadExamResults(course);
    const existing = current[result.grade];
    // Keep best result: higher score percent, or same score with higher stars
    const shouldUpdate =
      !existing ||
      result.scorePercent > existing.scorePercent ||
      (result.scorePercent === existing.scorePercent && result.starsEarned > (existing.starsEarned || 0));

    if (shouldUpdate) {
      current[result.grade] = result;
      const key = getExamResultsKey(course);
      localStorage.setItem(key, JSON.stringify(current));
    }
    return current;
  } catch (err) {
    console.error('Failed to save exam result:', err);
    return loadExamResults(course);
  }
}

const EXAM_HISTORY_KEY = 'mindwordy_exam_history';
const OLD_EXAM_HISTORY_KEY = 'wordykids_exam_history';

function getExamHistoryKey(course: LearningCourse = 'en', legacy = false): string {
  const base = legacy ? OLD_EXAM_HISTORY_KEY : EXAM_HISTORY_KEY;
  return course === 'lv' ? `${base}_lv` : base;
}

export function loadExamHistory(course: LearningCourse = 'en'): ExamResult[] {
  try {
    const key = getExamHistoryKey(course);
    const oldKey = getExamHistoryKey(course, true);
    const raw = getItemWithFallback(key, oldKey);
    if (raw) {
      const parsed: ExamResult[] = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {}

  // Fallback: seed history with existing best results if history is empty
  try {
    const bestResults = loadExamResults(course);
    const seeded = Object.values(bestResults);
    if (seeded.length > 0) {
      return seeded.sort(
        (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
      );
    }
  } catch {}

  return [];
}

export function saveExamHistory(course: LearningCourse = 'en', history: ExamResult[]) {
  try {
    const key = getExamHistoryKey(course);
    localStorage.setItem(key, JSON.stringify(history));
  } catch (err) {
    console.error('Failed to save exam history:', err);
  }
}

export function recordExamAttempt(
  course: LearningCourse = 'en',
  result: ExamResult
): {
  results: Record<number, ExamResult>;
  history: ExamResult[];
} {
  const updatedResults = saveExamResult(course, result);
  const currentHistory = loadExamHistory(course);
  // Add to beginning of history, max 50 items
  const newHistory = [result, ...currentHistory.filter((item) => item.completedAt !== result.completedAt)].slice(0, 50);
  saveExamHistory(course, newHistory);
  return { results: updatedResults, history: newHistory };
}

