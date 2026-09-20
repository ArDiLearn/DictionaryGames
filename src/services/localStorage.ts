/**
 * Pure localStorage I/O adapter. No business logic, no imports from other services.
 * This module is the single source of truth for all localStorage read/write operations.
 * progression.ts, titles.ts, cloudSync.ts all import from here — NOT from storage.ts.
 */
import { TopicProgress, WordProgress, UserStats, Grade, GradeFilter, LearningCourse, ExamResult } from '../types';
import { DEFAULT_UNLOCKED_AVATARS } from '../data/avatars';
import { DEFAULT_UNLOCKED_TITLES } from '../data/titles';

// --- Storage Keys ---

export const STATS_KEY = 'wordymind_user_stats';
const OLD_STATS_KEY = 'mindwordy_user_stats';
const LEGACY_STATS_KEY = 'wordykids_user_stats';

const TOPIC_PROGRESS_KEY = 'wordymind_topic_progress';
const OLD_TOPIC_PROGRESS_KEY = 'mindwordy_topic_progress';
const LEGACY_TOPIC_PROGRESS_KEY = 'wordykids_topic_progress';

const WORD_PROGRESS_KEY = 'wordymind_word_progress';
const OLD_WORD_PROGRESS_KEY = 'mindwordy_word_progress';
const LEGACY_WORD_PROGRESS_KEY = 'wordykids_word_progress';

const LANG_KEY = 'wordymind_lang';
const OLD_LANG_KEY = 'mindwordy_lang';
const LEGACY_LANG_KEY = 'wordykids_lang';

const GRADE_KEY = 'wordymind_grade';
const OLD_GRADE_KEY = 'mindwordy_grade';
const LEGACY_GRADE_KEY = 'wordykids_grade';

const COURSE_KEY = 'wordymind_course';
const OLD_COURSE_KEY = 'mindwordy_course';
const LEGACY_COURSE_KEY = 'wordykids_course';

const EXAM_RESULTS_KEY = 'wordymind_exam_results';
const OLD_EXAM_RESULTS_KEY = 'mindwordy_exam_results';
const LEGACY_EXAM_RESULTS_KEY = 'wordykids_exam_results';

const EXAM_HISTORY_KEY = 'wordymind_exam_history';
const OLD_EXAM_HISTORY_KEY = 'mindwordy_exam_history';
const LEGACY_EXAM_HISTORY_KEY = 'wordykids_exam_history';

// --- Internal key builders ---

export function getItemWithFallback(newKey: string, ...oldKeys: string[]): string | null {
  try {
    const val = localStorage.getItem(newKey);
    if (val !== null) return val;
    for (const oldKey of oldKeys) {
      const oldVal = localStorage.getItem(oldKey);
      if (oldVal !== null) {
        localStorage.setItem(newKey, oldVal);
        return oldVal;
      }
    }
  } catch {}
  return null;
}

function getTopicProgressKey(course: LearningCourse = 'en', legacy: 'none' | 'mindwordy' | 'wordykids' = 'none'): string {
  const base = legacy === 'wordykids' ? LEGACY_TOPIC_PROGRESS_KEY : legacy === 'mindwordy' ? OLD_TOPIC_PROGRESS_KEY : TOPIC_PROGRESS_KEY;
  return course === 'lv' ? `${base}_lv` : base;
}

function getWordProgressKey(course: LearningCourse = 'en', legacy: 'none' | 'mindwordy' | 'wordykids' = 'none'): string {
  const base = legacy === 'wordykids' ? LEGACY_WORD_PROGRESS_KEY : legacy === 'mindwordy' ? OLD_WORD_PROGRESS_KEY : WORD_PROGRESS_KEY;
  return course === 'lv' ? `${base}_lv` : base;
}

export function getExamResultsKey(course: LearningCourse = 'en', legacy: 'none' | 'mindwordy' | 'wordykids' = 'none'): string {
  const base = legacy === 'wordykids' ? LEGACY_EXAM_RESULTS_KEY : legacy === 'mindwordy' ? OLD_EXAM_RESULTS_KEY : EXAM_RESULTS_KEY;
  return course === 'lv' ? `${base}_lv` : base;
}

export function getExamHistoryKey(course: LearningCourse = 'en', legacy: 'none' | 'mindwordy' | 'wordykids' = 'none'): string {
  const base = legacy === 'wordykids' ? LEGACY_EXAM_HISTORY_KEY : legacy === 'mindwordy' ? OLD_EXAM_HISTORY_KEY : EXAM_HISTORY_KEY;
  return course === 'lv' ? `${base}_lv` : base;
}

// --- Preferences ---

export function getStoredCourse(): LearningCourse {
  try {
    const c = getItemWithFallback(COURSE_KEY, OLD_COURSE_KEY, LEGACY_COURSE_KEY);
    if (c === 'lv' || c === 'en') return c;
  } catch {}
  return 'en';
}

export function saveStoredCourse(course: LearningCourse) {
  try {
    localStorage.setItem(COURSE_KEY, course);
  } catch {}
}

export function getStoredLanguage(): 'ru' | 'lv' {
  try {
    const lang = getItemWithFallback(LANG_KEY, OLD_LANG_KEY, LEGACY_LANG_KEY);
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
  const g = getItemWithFallback(GRADE_KEY, OLD_GRADE_KEY, LEGACY_GRADE_KEY);
  if (!g || g === 'all') return [1, 2, 3, 4];
  if (g === '1') return [1];
  if (g === '2') return [2];
  if (g === '3') return [3];
  if (g === '4') return [4];
  try {
    const parsed = g
      .split(',')
      .map(Number)
      .filter((n): n is Grade => n === 1 || n === 2 || n === 3 || n === 4);
    if (parsed.length > 0) {
      return Array.from(new Set(parsed)).sort() as Grade[];
    }
  } catch {}
  return [1, 2, 3, 4];
}

export function saveStoredGrades(grades: Grade[]) {
  const sorted = Array.from(new Set(grades)).sort() as Grade[];
  if (sorted.length >= 4) {
    localStorage.setItem(GRADE_KEY, 'all');
  } else {
    localStorage.setItem(GRADE_KEY, sorted.join(','));
  }
}

export function getStoredGradeFilter(): GradeFilter {
  const g = getItemWithFallback(GRADE_KEY, OLD_GRADE_KEY, LEGACY_GRADE_KEY);
  if (g === '1' || g === '2' || g === '3' || g === '4' || g === 'all') return g;
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

// --- UserStats I/O ---

export function getDefaultStats(): UserStats {
  const today = new Date().toISOString().split('T')[0];
  return {
    playerName: 'Zinītis',
    avatar: '🦁',
    soundEnabled: true,
    speechRate: 0.85,
    streak: 1,
    lastActiveDate: today,
    totalActiveDays: 1,
    activeDates: [today],
    equippedTitleId: 'starter',
    unlockedTitleIds: DEFAULT_UNLOCKED_TITLES,
    claimedTopicBonusIds: [],
    claimedMilestoneIds: [],
    playedModes: [],
    hasSniperAchieved: false,
    unlockedAvatars: DEFAULT_UNLOCKED_AVATARS,
    spentStars: 0,
    totalStarsEarned: 0,
    equippedVictoryMusic: 'classic',
    unlockedVictoryMusic: ['classic'],
    equippedVictoryAnimation: 'confetti',
    unlockedVictoryAnimations: ['confetti'],
  };
}

export function loadLocalStats(): UserStats {
  try {
    const raw = getItemWithFallback(STATS_KEY, OLD_STATS_KEY, LEGACY_STATS_KEY);
    if (!raw) return getDefaultStats();
    const stats: UserStats = JSON.parse(raw);
    let needsLocalSave = false;

    // Ensure unlockedAvatars, spentStars and totalStarsEarned exist
    if (!stats.unlockedAvatars || stats.unlockedAvatars.length === 0) {
      stats.unlockedAvatars = DEFAULT_UNLOCKED_AVATARS;
      needsLocalSave = true;
    } else {
      const currentSet = new Set(stats.unlockedAvatars);
      let added = false;
      for (const def of DEFAULT_UNLOCKED_AVATARS) {
        if (!currentSet.has(def)) {
          stats.unlockedAvatars.push(def);
          added = true;
        }
      }
      if (added) needsLocalSave = true;
    }
    if (stats.spentStars === undefined || typeof stats.spentStars !== 'number') {
      stats.spentStars = 0;
      needsLocalSave = true;
    }
    if (stats.totalStarsEarned === undefined || typeof stats.totalStarsEarned !== 'number') {
      const topics = loadTopicProgress();
      const topicStarsSum = Object.values(topics).reduce((sum, tp) => sum + (tp.stars || 0), 0);
      stats.totalStarsEarned = topicStarsSum;
      needsLocalSave = true;
    }

    // Default structure checks
    if (!stats.activeDates || !Array.isArray(stats.activeDates)) {
      stats.activeDates = [stats.lastActiveDate || new Date().toISOString().split('T')[0]];
      needsLocalSave = true;
    }
    if (typeof stats.totalActiveDays !== 'number') {
      stats.totalActiveDays = stats.activeDates.length;
      needsLocalSave = true;
    }

    // Title systems
    if (!stats.equippedTitleId) {
      stats.equippedTitleId = 'starter';
      needsLocalSave = true;
    }
    if (!stats.unlockedTitleIds || !Array.isArray(stats.unlockedTitleIds) || stats.unlockedTitleIds.length === 0) {
      stats.unlockedTitleIds = DEFAULT_UNLOCKED_TITLES;
      needsLocalSave = true;
    }
    if (!stats.claimedTopicBonusIds || !Array.isArray(stats.claimedTopicBonusIds)) {
      stats.claimedTopicBonusIds = [];
      needsLocalSave = true;
    }
    if (!stats.claimedMilestoneIds || !Array.isArray(stats.claimedMilestoneIds)) {
      stats.claimedMilestoneIds = [];
      needsLocalSave = true;
    }
    if (!stats.playedModes || !Array.isArray(stats.playedModes)) {
      stats.playedModes = [];
      needsLocalSave = true;
    }

    // Victory customizations
    if (!stats.equippedVictoryMusic) {
      stats.equippedVictoryMusic = 'classic';
      needsLocalSave = true;
    }
    if (!stats.unlockedVictoryMusic || !Array.isArray(stats.unlockedVictoryMusic) || stats.unlockedVictoryMusic.length === 0) {
      stats.unlockedVictoryMusic = ['classic'];
      needsLocalSave = true;
    }
    if (!stats.equippedVictoryAnimation) {
      stats.equippedVictoryAnimation = 'confetti';
      needsLocalSave = true;
    }
    if (!stats.unlockedVictoryAnimations || !Array.isArray(stats.unlockedVictoryAnimations) || stats.unlockedVictoryAnimations.length === 0) {
      stats.unlockedVictoryAnimations = ['confetti'];
      needsLocalSave = true;
    }

    // Only update localStorage if schema structure was repaired, WITHOUT triggering network cloud sync
    if (needsLocalSave) {
      localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    }

    return stats;
  } catch {
    return getDefaultStats();
  }
}

/**
 * Saves UserStats to localStorage only — does NOT trigger cloud sync.
 * Cloud sync is triggered separately by the orchestrating storage.ts layer.
 */
export function saveLocalStatsRaw(stats: UserStats) {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

// --- Topic Progress I/O ---

export function loadTopicProgress(course: LearningCourse = 'en'): Record<string, TopicProgress> {
  try {
    const raw = getItemWithFallback(
      getTopicProgressKey(course, 'none'),
      getTopicProgressKey(course, 'mindwordy'),
      getTopicProgressKey(course, 'wordykids')
    );
    const progress: Record<string, TopicProgress> = raw ? JSON.parse(raw) : {};

    // Backward compatibility migration for split topics
    let needsSave = false;
    if (progress['numbers_1_20'] && !progress['numbers_1_10']) {
      const old = progress['numbers_1_20'];
      progress['numbers_1_10'] = { ...old, topic_id: 'numbers_1_10' };
      progress['numbers_11_20'] = { ...old, topic_id: 'numbers_11_20' };
      needsSave = true;
    }
    if (progress['classroom_objects'] && !progress['stationery']) {
      const old = progress['classroom_objects'];
      progress['stationery'] = { ...old, topic_id: 'stationery' };
      progress['classroom'] = { ...old, topic_id: 'classroom' };
      needsSave = true;
    }
    if (progress['instructions'] && !progress['instructions_actions']) {
      const old = progress['instructions'];
      progress['instructions_actions'] = { ...old, topic_id: 'instructions_actions' };
      progress['instructions_games_art'] = { ...old, topic_id: 'instructions_games_art' };
      progress['instructions_logic_numbers'] = { ...old, topic_id: 'instructions_logic_numbers' };
      progress['instructions_teamwork_practice'] = { ...old, topic_id: 'instructions_teamwork_practice' };
      needsSave = true;
    }
    if (progress['helper_words'] && !progress['prepositions_and_place']) {
      const old = progress['helper_words'];
      progress['prepositions_and_place'] = { ...old, topic_id: 'prepositions_and_place' };
      progress['connecting_words'] = { ...old, topic_id: 'connecting_words' };
      needsSave = true;
    }
    if (progress['classroom_objects_plus'] && !progress['school_materials']) {
      const old = progress['classroom_objects_plus'];
      progress['school_materials'] = { ...old, topic_id: 'school_materials' };
      progress['school_and_lessons'] = { ...old, topic_id: 'school_and_lessons' };
      needsSave = true;
    }
    if (progress['places'] && !progress['nature']) {
      const old = progress['places'];
      progress['nature'] = { ...old, topic_id: 'nature' };
      needsSave = true;
    }
    if (needsSave) {
      try {
        localStorage.setItem(getTopicProgressKey(course), JSON.stringify(progress));
      } catch {}
    }

    return progress;
  } catch {
    return {};
  }
}

export function saveTopicProgressRaw(progress: Record<string, TopicProgress>, course: LearningCourse = 'en') {
  localStorage.setItem(getTopicProgressKey(course), JSON.stringify(progress));
}

// --- Word Progress I/O ---

export function loadWordProgress(course: LearningCourse = 'en'): Record<string, WordProgress> {
  try {
    const raw = getItemWithFallback(
      getWordProgressKey(course, 'none'),
      getWordProgressKey(course, 'mindwordy'),
      getWordProgressKey(course, 'wordykids')
    );
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveWordProgressRaw(progress: Record<string, WordProgress>, course: LearningCourse = 'en') {
  localStorage.setItem(getWordProgressKey(course), JSON.stringify(progress));
}

// --- Exam Results I/O ---

export function loadExamResults(course: LearningCourse = 'en'): Record<number, ExamResult> {
  try {
    const raw = getItemWithFallback(
      getExamResultsKey(course, 'none'),
      getExamResultsKey(course, 'mindwordy'),
      getExamResultsKey(course, 'wordykids')
    );
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {}
  return {};
}

export function saveExamResultRaw(
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

export function loadExamHistory(course: LearningCourse = 'en'): ExamResult[] {
  try {
    const raw = getItemWithFallback(
      getExamHistoryKey(course, 'none'),
      getExamHistoryKey(course, 'mindwordy'),
      getExamHistoryKey(course, 'wordykids')
    );
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

export function saveExamHistoryRaw(course: LearningCourse = 'en', history: ExamResult[]) {
  try {
    const key = getExamHistoryKey(course);
    localStorage.setItem(key, JSON.stringify(history));
  } catch (err) {
    console.error('Failed to save exam history:', err);
  }
}
