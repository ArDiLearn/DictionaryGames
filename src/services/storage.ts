import { TopicProgress, WordProgress, UserStats, Grade, GradeFilter, LearningCourse, ExamResult, GameMode, PlayerTitle } from '../types';
import { getCurrentUser, getCurrentUserLogin, syncProgressToCloud, fetchProgressFromCloud } from './supabase';
import { DEFAULT_UNLOCKED_AVATARS } from '../data/avatars';
import { DEFAULT_UNLOCKED_TITLES, getTitleById } from '../data/titles';

const STATS_KEY = 'wordymind_user_stats';
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

function getItemWithFallback(newKey: string, ...oldKeys: string[]): string | null {
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

function getTopicProgressKey(course: LearningCourse = 'en', legacy: 'none' | 'mindwordy' | 'wordykids' = 'none'): string {
  const base = legacy === 'wordykids' ? LEGACY_TOPIC_PROGRESS_KEY : legacy === 'mindwordy' ? OLD_TOPIC_PROGRESS_KEY : TOPIC_PROGRESS_KEY;
  return course === 'lv' ? `${base}_lv` : base;
}

function getWordProgressKey(course: LearningCourse = 'en', legacy: 'none' | 'mindwordy' | 'wordykids' = 'none'): string {
  const base = legacy === 'wordykids' ? LEGACY_WORD_PROGRESS_KEY : legacy === 'mindwordy' ? OLD_WORD_PROGRESS_KEY : WORD_PROGRESS_KEY;
  return course === 'lv' ? `${base}_lv` : base;
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
  };
}

export function loadLocalStats(): UserStats {
  try {
    const raw = getItemWithFallback(STATS_KEY, OLD_STATS_KEY, LEGACY_STATS_KEY);
    if (!raw) return getDefaultStats();
    const stats: UserStats = JSON.parse(raw);
    const today = new Date().toISOString().split('T')[0];
    let needsSave = false;

    // Ensure unlockedAvatars, spentStars and totalStarsEarned exist
    if (!stats.unlockedAvatars || stats.unlockedAvatars.length === 0) {
      stats.unlockedAvatars = DEFAULT_UNLOCKED_AVATARS;
      needsSave = true;
    } else {
      const currentSet = new Set(stats.unlockedAvatars);
      let added = false;
      for (const def of DEFAULT_UNLOCKED_AVATARS) {
        if (!currentSet.has(def)) {
          stats.unlockedAvatars.push(def);
          added = true;
        }
      }
      if (added) needsSave = true;
    }
    if (stats.spentStars === undefined || typeof stats.spentStars !== 'number') {
      stats.spentStars = 0;
      needsSave = true;
    }
    if (stats.totalStarsEarned === undefined || typeof stats.totalStarsEarned !== 'number') {
      const topics = loadTopicProgress();
      const topicStarsSum = Object.values(topics).reduce((sum, tp) => sum + (tp.stars || 0), 0);
      stats.totalStarsEarned = topicStarsSum;
      needsSave = true;
    }

    // Cumulative non-coercive active dates & totalActiveDays
    if (!stats.activeDates || !Array.isArray(stats.activeDates) || stats.activeDates.length === 0) {
      stats.activeDates = [stats.lastActiveDate || today];
      needsSave = true;
    }
    if (!stats.activeDates.includes(today)) {
      stats.activeDates.push(today);
      needsSave = true;
    }
    const computedDays = stats.activeDates.length;
    if (stats.totalActiveDays !== computedDays) {
      stats.totalActiveDays = computedDays;
      needsSave = true;
    }

    // Title systems
    if (!stats.equippedTitleId) {
      stats.equippedTitleId = 'starter';
      needsSave = true;
    }
    if (!stats.unlockedTitleIds || !Array.isArray(stats.unlockedTitleIds) || stats.unlockedTitleIds.length === 0) {
      stats.unlockedTitleIds = DEFAULT_UNLOCKED_TITLES;
      needsSave = true;
    }
    if (!stats.claimedTopicBonusIds || !Array.isArray(stats.claimedTopicBonusIds)) {
      stats.claimedTopicBonusIds = [];
      needsSave = true;
    }
    if (!stats.claimedMilestoneIds || !Array.isArray(stats.claimedMilestoneIds)) {
      stats.claimedMilestoneIds = [];
      needsSave = true;
    }
    if (!stats.playedModes || !Array.isArray(stats.playedModes)) {
      stats.playedModes = [];
      needsSave = true;
    }

    // Streak tracking (legacy backward-compatibility)
    if (stats.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (stats.lastActiveDate === yesterday) {
        stats.streak = (stats.streak || 0) + 1;
      } else {
        stats.streak = 1;
      }
      stats.lastActiveDate = today;
      needsSave = true;
    }

    if (needsSave) {
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
    const raw = getItemWithFallback(
      getTopicProgressKey(course, 'none'),
      getTopicProgressKey(course, 'mindwordy'),
      getTopicProgressKey(course, 'wordykids')
    );
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

      // Gather progress from both English and Latvian courses
      const topicProgEn = loadTopicProgress('en');
      const topicProgLv = loadTopicProgress('lv');
      const mergedTopicProg: Record<string, TopicProgress> = { ...topicProgEn };
      for (const [tid, tp] of Object.entries(topicProgLv)) {
        mergedTopicProg[`lv:${tid}`] = { ...tp, topic_id: `lv:${tid}` };
      }

      const wordProgEn = loadWordProgress('en');
      const wordProgLv = loadWordProgress('lv');
      const mergedWordProg: Record<string, WordProgress> = { ...wordProgEn };
      for (const [wid, wp] of Object.entries(wordProgLv)) {
        mergedWordProg[`lv:${wid}`] = { ...wp, word_id: `lv:${wid}`, topic_id: `lv:${wp.topic_id}` };
      }

      await syncProgressToCloud(user.id, mergedTopicProg, mergedWordProg, stats);
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

    // 1. Separate English and Latvian topic progress from cloud
    const cloudTopicsEn: Record<string, TopicProgress> = {};
    const cloudTopicsLv: Record<string, TopicProgress> = {};

    for (const [tid, cTopic] of Object.entries(cloudData.topicProgress)) {
      if (tid.startsWith('lv:')) {
        const cleanTid = tid.slice(3);
        cloudTopicsLv[cleanTid] = { ...cTopic, topic_id: cleanTid };
      } else {
        cloudTopicsEn[tid] = cTopic;
      }
    }

    // Merge English topics
    const localTopicsEn = loadTopicProgress('en');
    const mergedTopicsEn = { ...localTopicsEn };
    for (const [tid, cTopic] of Object.entries(cloudTopicsEn)) {
      if (!mergedTopicsEn[tid]) {
        mergedTopicsEn[tid] = cTopic;
      } else {
        const unionWords = Array.from(
          new Set([...(mergedTopicsEn[tid].masteredWordIds || []), ...(cTopic.masteredWordIds || [])])
        );
        mergedTopicsEn[tid] = {
          topic_id: tid,
          stars: Math.max(mergedTopicsEn[tid].stars || 0, cTopic.stars || 0),
          masteredWordIds: unionWords,
          lastPlayedAt: mergedTopicsEn[tid].lastPlayedAt || cTopic.lastPlayedAt,
        };
      }
    }
    saveTopicProgress(mergedTopicsEn, 'en');

    // Merge Latvian topics
    const localTopicsLv = loadTopicProgress('lv');
    const mergedTopicsLv = { ...localTopicsLv };
    for (const [tid, cTopic] of Object.entries(cloudTopicsLv)) {
      if (!mergedTopicsLv[tid]) {
        mergedTopicsLv[tid] = cTopic;
      } else {
        const unionWords = Array.from(
          new Set([...(mergedTopicsLv[tid].masteredWordIds || []), ...(cTopic.masteredWordIds || [])])
        );
        mergedTopicsLv[tid] = {
          topic_id: tid,
          stars: Math.max(mergedTopicsLv[tid].stars || 0, cTopic.stars || 0),
          masteredWordIds: unionWords,
          lastPlayedAt: mergedTopicsLv[tid].lastPlayedAt || cTopic.lastPlayedAt,
        };
      }
    }
    saveTopicProgress(mergedTopicsLv, 'lv');

    // 2. Separate English and Latvian word progress
    const cloudWordsEn: Record<string, WordProgress> = {};
    const cloudWordsLv: Record<string, WordProgress> = {};

    for (const [wid, cWord] of Object.entries(cloudData.wordProgress)) {
      if (wid.startsWith('lv:') || cWord.topic_id?.startsWith('lv:')) {
        const cleanWid = wid.startsWith('lv:') ? wid.slice(3) : wid;
        cloudWordsLv[cleanWid] = { ...cWord, word_id: cleanWid };
      } else {
        cloudWordsEn[wid] = cWord;
      }
    }

    // Merge English words
    const localWordsEn = loadWordProgress('en');
    const mergedWordsEn = { ...localWordsEn };
    for (const [wid, cWord] of Object.entries(cloudWordsEn)) {
      if (!mergedWordsEn[wid]) {
        mergedWordsEn[wid] = cWord;
      } else {
        mergedWordsEn[wid] = {
          word_id: wid,
          topic_id: cWord.topic_id || mergedWordsEn[wid].topic_id,
          timesCorrect: Math.max(mergedWordsEn[wid].timesCorrect || 0, cWord.timesCorrect || 0),
          timesWrong: Math.max(mergedWordsEn[wid].timesWrong || 0, cWord.timesWrong || 0),
          isLearned: mergedWordsEn[wid].isLearned || cWord.isLearned,
          lastReviewedAt: mergedWordsEn[wid].lastReviewedAt || cWord.lastReviewedAt,
        };
      }
    }
    saveWordProgress(mergedWordsEn, 'en');

    // Merge Latvian words
    const localWordsLv = loadWordProgress('lv');
    const mergedWordsLv = { ...localWordsLv };
    for (const [wid, cWord] of Object.entries(cloudWordsLv)) {
      if (!mergedWordsLv[wid]) {
        mergedWordsLv[wid] = cWord;
      } else {
        mergedWordsLv[wid] = {
          word_id: wid,
          topic_id: cWord.topic_id || mergedWordsLv[wid].topic_id,
          timesCorrect: Math.max(mergedWordsLv[wid].timesCorrect || 0, cWord.timesCorrect || 0),
          timesWrong: Math.max(mergedWordsLv[wid].timesWrong || 0, cWord.timesWrong || 0),
          isLearned: mergedWordsLv[wid].isLearned || cWord.isLearned,
          lastReviewedAt: mergedWordsLv[wid].lastReviewedAt || cWord.lastReviewedAt,
        };
      }
    }
    saveWordProgress(mergedWordsLv, 'lv');

    // 3. Merge UserStats (Piggy bank stars, spent stars, avatars, titles, milestones)
    const currentStats = loadLocalStats();
    const cloudStats = cloudData.statsPartial || {};

    const totalStarsSumTopics =
      Object.values(mergedTopicsEn).reduce((s, tp) => s + (tp.stars || 0), 0) +
      Object.values(mergedTopicsLv).reduce((s, tp) => s + (tp.stars || 0), 0);

    const mergedTotalStarsEarned = Math.max(
      currentStats.totalStarsEarned || 0,
      cloudStats.totalStarsEarned || 0,
      totalStarsSumTopics
    );

    const mergedSpentStars = Math.max(
      currentStats.spentStars || 0,
      cloudStats.spentStars || 0
    );

    const mergedAvatars = Array.from(
      new Set([
        ...(currentStats.unlockedAvatars || DEFAULT_UNLOCKED_AVATARS),
        ...(cloudStats.unlockedAvatars || []),
      ])
    );

    const mergedTitles = Array.from(
      new Set([
        ...(currentStats.unlockedTitleIds || DEFAULT_UNLOCKED_TITLES),
        ...(cloudStats.unlockedTitleIds || []),
      ])
    );

    const mergedTopicBonuses = Array.from(
      new Set([
        ...(currentStats.claimedTopicBonusIds || []),
        ...(cloudStats.claimedTopicBonusIds || []),
      ])
    );

    const mergedMilestones = Array.from(
      new Set([
        ...(currentStats.claimedMilestoneIds || []),
        ...(cloudStats.claimedMilestoneIds || []),
      ])
    );

    const mergedPlayedModes = Array.from(
      new Set([
        ...(currentStats.playedModes || []),
        ...(cloudStats.playedModes || []),
      ])
    );

    const userLogin = getCurrentUserLogin(user);

    const mergedStats: UserStats = {
      ...currentStats,
      ...cloudStats,
      playerName:
        userLogin && userLogin !== 'Player'
          ? userLogin
          : currentStats.playerName || cloudStats.playerName || 'Zinītis',
      avatar: cloudStats.avatar || currentStats.avatar || '🦁',
      streak: Math.max(currentStats.streak || 1, cloudStats.streak || 1),
      totalActiveDays: Math.max(currentStats.totalActiveDays || 1, cloudStats.totalActiveDays || 1),
      totalStarsEarned: mergedTotalStarsEarned,
      spentStars: mergedSpentStars,
      unlockedAvatars: mergedAvatars,
      unlockedTitleIds: mergedTitles,
      equippedTitleId: cloudStats.equippedTitleId || currentStats.equippedTitleId || 'title_starter',
      claimedTopicBonusIds: mergedTopicBonuses,
      claimedMilestoneIds: mergedMilestones,
      playedModes: mergedPlayedModes,
      hasSniperAchieved: Boolean(currentStats.hasSniperAchieved || cloudStats.hasSniperAchieved),
    };

    saveLocalStats(mergedStats);

    return true;
  } catch (err) {
    console.error('Failed to merge with cloud:', err);
    return false;
  }
}

const EXAM_RESULTS_KEY = 'wordymind_exam_results';
const OLD_EXAM_RESULTS_KEY = 'mindwordy_exam_results';
const LEGACY_EXAM_RESULTS_KEY = 'wordykids_exam_results';

function getExamResultsKey(course: LearningCourse = 'en', legacy: 'none' | 'mindwordy' | 'wordykids' = 'none'): string {
  const base = legacy === 'wordykids' ? LEGACY_EXAM_RESULTS_KEY : legacy === 'mindwordy' ? OLD_EXAM_RESULTS_KEY : EXAM_RESULTS_KEY;
  return course === 'lv' ? `${base}_lv` : base;
}

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

const EXAM_HISTORY_KEY = 'wordymind_exam_history';
const OLD_EXAM_HISTORY_KEY = 'mindwordy_exam_history';
const LEGACY_EXAM_HISTORY_KEY = 'wordykids_exam_history';

function getExamHistoryKey(course: LearningCourse = 'en', legacy: 'none' | 'mindwordy' | 'wordykids' = 'none'): string {
  const base = legacy === 'wordykids' ? LEGACY_EXAM_HISTORY_KEY : legacy === 'mindwordy' ? OLD_EXAM_HISTORY_KEY : EXAM_HISTORY_KEY;
  return course === 'lv' ? `${base}_lv` : base;
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

// --- Title System & Progression Rewards ---

export function equipTitle(titleId: string): UserStats {
  const currentStats = loadLocalStats();
  const unlocked = currentStats.unlockedTitleIds || DEFAULT_UNLOCKED_TITLES;
  if (!unlocked.includes(titleId) && titleId !== 'starter') {
    return currentStats;
  }
  const newStats: UserStats = {
    ...currentStats,
    equippedTitleId: titleId,
  };
  saveLocalStats(newStats);
  return newStats;
}

export function evaluateUnlockedTitles(stats?: UserStats): {
  newlyUnlockedTitles: PlayerTitle[];
  updatedStats: UserStats;
} {
  const currentStats = stats || loadLocalStats();
  const unlockedSet = new Set(currentStats.unlockedTitleIds || DEFAULT_UNLOCKED_TITLES);
  const newlyUnlocked: PlayerTitle[] = [];

  const examResultsEn = loadExamResults('en');
  const examResultsLv = loadExamResults('lv');
  const hasPassedGrade = (g: Grade) => {
    return (examResultsEn[g] && examResultsEn[g].scorePercent >= 60) ||
           (examResultsLv[g] && examResultsLv[g].scorePercent >= 60);
  };
  const hasPerfectExam = () => {
    return Object.values(examResultsEn).some((r) => r.scorePercent === 100) ||
           Object.values(examResultsLv).some((r) => r.scorePercent === 100);
  };

  const wordsEn = loadWordProgress('en');
  const wordsLv = loadWordProgress('lv');
  const masteredEnCount = Object.values(wordsEn).filter((w) => w.isLearned).length;
  const masteredLvCount = Object.values(wordsLv).filter((w) => w.isLearned).length;
  const totalMasteredWords = Math.max(masteredEnCount, masteredLvCount);

  const topicsEn = loadTopicProgress('en');
  const topicsLv = loadTopicProgress('lv');
  const isTopicMastered = (topicId: string) => {
    return (topicsEn[topicId] && topicsEn[topicId].stars === 3) ||
           (topicsLv[topicId] && topicsLv[topicId].stars === 3);
  };

  const checkAndUnlock = (titleId: string, condition: boolean) => {
    if (condition && !unlockedSet.has(titleId)) {
      unlockedSet.add(titleId);
      const title = getTitleById(titleId);
      if (title) newlyUnlocked.push(title);
    }
  };

  // 1. Academic Titles
  checkAndUnlock('grad_g1', Boolean(hasPassedGrade(1)));
  checkAndUnlock('grad_g2', Boolean(hasPassedGrade(2)));
  checkAndUnlock('grad_g3', Boolean(hasPassedGrade(3)));
  checkAndUnlock('grad_g4', Boolean(hasPassedGrade(4)));
  checkAndUnlock('gold_medalist', Boolean(hasPerfectExam()));

  // 2. Word Milestones
  checkAndUnlock('words_25', totalMasteredWords >= 25);
  checkAndUnlock('words_50', totalMasteredWords >= 50);
  checkAndUnlock('words_100', totalMasteredWords >= 100);
  checkAndUnlock('words_250', totalMasteredWords >= 250);
  checkAndUnlock('words_400', totalMasteredWords >= 400);
  checkAndUnlock('words_500', totalMasteredWords >= 500);

  // 3. Topics
  checkAndUnlock(
    'beast_master',
    isTopicMastered('pets') &&
      isTopicMastered('farm_animals') &&
      isTopicMastered('farm_animals_plus') &&
      isTopicMastered('wild_animals')
  );
  checkAndUnlock(
    'master_chef',
    isTopicMastered('food_and_drink') &&
      isTopicMastered('food_and_drink_plus') &&
      isTopicMastered('fruit_and_vegetables') &&
      isTopicMastered('fruit_and_vegetables_plus')
  );
  checkAndUnlock('nature_guardian', isTopicMastered('nature') && isTopicMastered('garden'));
  checkAndUnlock('order_master', isTopicMastered('instructions'));
  checkAndUnlock('true_friend', isTopicMastered('family') && isTopicMastered('family_plus') && isTopicMastered('friendship'));
  checkAndUnlock('circus_star', isTopicMastered('circus'));

  // 4. Activity
  const activeDays = currentStats.totalActiveDays || (currentStats.activeDates?.length ?? 1);
  checkAndUnlock('first_step', activeDays >= 3);
  checkAndUnlock('curious_student', activeDays >= 7);
  checkAndUnlock('persistent_thinker', activeDays >= 15);
  checkAndUnlock('consistency_master', activeDays >= 30);

  const played = currentStats.playedModes || [];
  const allModes: GameMode[] = ['flashcards', 'builder', 'match', 'truefalse', 'balloons', 'audio'];
  checkAndUnlock('explorer', allModes.every((m) => played.includes(m)));
  checkAndUnlock('sniper', Boolean(currentStats.hasSniperAchieved));

  if (newlyUnlocked.length > 0) {
    const updatedStats: UserStats = {
      ...currentStats,
      unlockedTitleIds: Array.from(unlockedSet),
    };
    saveLocalStats(updatedStats);
    return { newlyUnlockedTitles: newlyUnlocked, updatedStats };
  }

  return { newlyUnlockedTitles: [], updatedStats: currentStats };
}

export function recordGameModePlayed(
  mode: GameMode,
  isFlawless: boolean = false
): { newlyUnlockedTitles: PlayerTitle[]; updatedStats: UserStats } {
  const currentStats = loadLocalStats();
  const played = new Set(currentStats.playedModes || []);
  played.add(mode);
  const updatedStats: UserStats = {
    ...currentStats,
    playedModes: Array.from(played),
    hasSniperAchieved: currentStats.hasSniperAchieved || isFlawless,
  };
  saveLocalStats(updatedStats);
  return evaluateUnlockedTitles(updatedStats);
}

export function checkAndClaimTopicMasteryBonus(
  topicId: string,
  totalWordsInTopic: number,
  course: LearningCourse = 'en'
): { claimed: boolean; bonusStars: number; updatedStats: UserStats } {
  const currentStats = loadLocalStats();
  const topics = loadTopicProgress(course);
  const topic = topics[topicId];
  const claimedList = currentStats.claimedTopicBonusIds || [];

  if (!topic || topic.stars < 3 || claimedList.includes(topicId)) {
    return { claimed: false, bonusStars: 0, updatedStats: currentStats };
  }

  let bonusStars = 5;
  if (topicId === 'instructions') {
    bonusStars = 25;
  } else if (totalWordsInTopic >= 15) {
    bonusStars = 10;
  }

  const updatedStats: UserStats = {
    ...currentStats,
    claimedTopicBonusIds: [...claimedList, topicId],
    totalStarsEarned: (currentStats.totalStarsEarned || 0) + bonusStars,
  };
  saveLocalStats(updatedStats);

  return { claimed: true, bonusStars, updatedStats };
}

export interface WordMilestoneReward {
  id: string;
  wordsThreshold: number;
  bonusStars: number;
}

export const WORD_MILESTONES: WordMilestoneReward[] = [
  { id: 'ms_words_25', wordsThreshold: 25, bonusStars: 10 },
  { id: 'ms_words_50', wordsThreshold: 50, bonusStars: 25 },
  { id: 'ms_words_100', wordsThreshold: 100, bonusStars: 50 },
  { id: 'ms_words_250', wordsThreshold: 250, bonusStars: 75 },
  { id: 'ms_words_400', wordsThreshold: 400, bonusStars: 100 },
  { id: 'ms_words_500', wordsThreshold: 500, bonusStars: 150 },
];

export function checkAndClaimWordMilestones(course: LearningCourse = 'en'): {
  claimedMilestones: WordMilestoneReward[];
  totalBonusStars: number;
  updatedStats: UserStats;
} {
  const currentStats = loadLocalStats();
  const words = loadWordProgress(course);
  const masteredCount = Object.values(words).filter((w) => w.isLearned).length;
  const claimedIds = new Set(currentStats.claimedMilestoneIds || []);

  const newlyClaimed: WordMilestoneReward[] = [];
  let totalBonus = 0;

  for (const ms of WORD_MILESTONES) {
    if (masteredCount >= ms.wordsThreshold && !claimedIds.has(ms.id)) {
      claimedIds.add(ms.id);
      newlyClaimed.push(ms);
      totalBonus += ms.bonusStars;
    }
  }

  if (newlyClaimed.length > 0) {
    const updatedStats: UserStats = {
      ...currentStats,
      claimedMilestoneIds: Array.from(claimedIds),
      totalStarsEarned: (currentStats.totalStarsEarned || 0) + totalBonus,
    };
    saveLocalStats(updatedStats);
    return { claimedMilestones: newlyClaimed, totalBonusStars: totalBonus, updatedStats };
  }

  return { claimedMilestones: [], totalBonusStars: 0, updatedStats: currentStats };
}

