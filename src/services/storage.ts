import { TopicProgress, WordProgress, UserStats, Grade, GradeFilter, LearningCourse, ExamResult } from '../types';
import { getCurrentUser, getCurrentUserLogin, syncProgressToCloud, fetchProgressFromCloud } from './supabase';
import { DEFAULT_UNLOCKED_AVATARS } from '../data/avatars';
import { DEFAULT_UNLOCKED_TITLES } from '../data/titles';

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
 * Explicitly records daily attendance, streak increment and active dates.
 * Called on application startup or activity completion.
 */
export function recordDailyActivity(existingStats?: UserStats): UserStats {
  const stats = existingStats || loadLocalStats();
  const today = new Date().toISOString().split('T')[0];
  let changed = false;

  if (!stats.activeDates || !Array.isArray(stats.activeDates) || stats.activeDates.length === 0) {
    stats.activeDates = [today];
    changed = true;
  } else if (!stats.activeDates.includes(today)) {
    stats.activeDates.push(today);
    changed = true;
  }

  const computedDays = stats.activeDates.length;
  if (stats.totalActiveDays !== computedDays) {
    stats.totalActiveDays = computedDays;
    changed = true;
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
    changed = true;
  }

  if (changed) {
    saveLocalStats(stats);
  }

  return stats;
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

export function purchaseVictoryItem(
  type: 'animation' | 'music',
  id: string,
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

  let newStats: UserStats;
  if (type === 'animation') {
    const unlocked = new Set(currentStats.unlockedVictoryAnimations || ['confetti']);
    unlocked.add(id);
    newStats = {
      ...currentStats,
      spentStars: spentStars + price,
      totalStarsEarned: total,
      unlockedVictoryAnimations: Array.from(unlocked),
      equippedVictoryAnimation: id,
    };
  } else {
    const unlocked = new Set(currentStats.unlockedVictoryMusic || ['classic']);
    unlocked.add(id);
    newStats = {
      ...currentStats,
      spentStars: spentStars + price,
      totalStarsEarned: total,
      unlockedVictoryMusic: Array.from(unlocked),
      equippedVictoryMusic: id,
    };
  }

  saveLocalStats(newStats);
  return { success: true, newStats };
}

export function equipVictoryItem(
  type: 'animation' | 'music',
  id: string
): UserStats {
  const currentStats = loadLocalStats();
  let newStats: UserStats;
  if (type === 'animation') {
    newStats = {
      ...currentStats,
      equippedVictoryAnimation: id,
    };
  } else {
    newStats = {
      ...currentStats,
      equippedVictoryMusic: id,
    };
  }
  saveLocalStats(newStats);
  return newStats;
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

      // Gather exam results and history from both courses
      const examResultsEn = loadExamResults('en');
      const examResultsLv = loadExamResults('lv');
      const examHistoryEn = loadExamHistory('en');
      const examHistoryLv = loadExamHistory('lv');

      await syncProgressToCloud(user.id, mergedTopicProg, mergedWordProg, stats, {
        results: { en: examResultsEn, lv: examResultsLv },
        history: { en: examHistoryEn, lv: examHistoryLv },
      });
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
        const unionModes = Array.from(
          new Set([...(mergedTopicsEn[tid].completedModes || []), ...(cTopic.completedModes || [])])
        );
        mergedTopicsEn[tid] = {
          topic_id: tid,
          stars: Math.max(mergedTopicsEn[tid].stars || 0, cTopic.stars || 0),
          masteredWordIds: unionWords,
          completedModes: unionModes,
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
        const unionModes = Array.from(
          new Set([...(mergedTopicsLv[tid].completedModes || []), ...(cTopic.completedModes || [])])
        );
        mergedTopicsLv[tid] = {
          topic_id: tid,
          stars: Math.max(mergedTopicsLv[tid].stars || 0, cTopic.stars || 0),
          masteredWordIds: unionWords,
          completedModes: unionModes,
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
        const cleanTid = cWord.topic_id?.startsWith('lv:') ? cWord.topic_id.slice(3) : cWord.topic_id;
        cloudWordsLv[cleanWid] = { ...cWord, word_id: cleanWid, topic_id: cleanTid };
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

    const mergedVictoryMusic = Array.from(
      new Set([
        ...(currentStats.unlockedVictoryMusic || ['classic']),
        ...(cloudStats.unlockedVictoryMusic || []),
      ])
    );

    const mergedVictoryAnimations = Array.from(
      new Set([
        ...(currentStats.unlockedVictoryAnimations || ['confetti']),
        ...(cloudStats.unlockedVictoryAnimations || []),
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
      equippedVictoryMusic: cloudStats.equippedVictoryMusic || currentStats.equippedVictoryMusic || 'classic',
      unlockedVictoryMusic: mergedVictoryMusic,
      equippedVictoryAnimation: cloudStats.equippedVictoryAnimation || currentStats.equippedVictoryAnimation || 'confetti',
      unlockedVictoryAnimations: mergedVictoryAnimations,
    };

    saveLocalStats(mergedStats);

    // 4. Merge Exam Results & History for both English and Latvian
    if (cloudData.examResults) {
      for (const c of ['en', 'lv'] as LearningCourse[]) {
        const cloudResults = cloudData.examResults[c] || {};
        if (Object.keys(cloudResults).length > 0) {
          const localResults = loadExamResults(c);
          const mergedResults: Record<number, ExamResult> = { ...localResults };
          for (const [gradeStr, cRes] of Object.entries(cloudResults)) {
            const g = parseInt(gradeStr, 10);
            const lRes = mergedResults[g];
            if (!lRes) {
              mergedResults[g] = cRes;
            } else {
              const shouldPickCloud =
                cRes.scorePercent > lRes.scorePercent ||
                (cRes.scorePercent === lRes.scorePercent && (cRes.starsEarned || 0) > (lRes.starsEarned || 0));
              if (shouldPickCloud) {
                mergedResults[g] = cRes;
              }
            }
          }
          localStorage.setItem(getExamResultsKey(c), JSON.stringify(mergedResults));
        }
      }
    }

    if (cloudData.examHistory) {
      for (const c of ['en', 'lv'] as LearningCourse[]) {
        const cloudHistory = cloudData.examHistory[c] || [];
        if (cloudHistory.length > 0) {
          const localHistory = loadExamHistory(c);
          const historyMap = new Map<string, ExamResult>();
          for (const item of [...localHistory, ...cloudHistory]) {
            const key = `${item.grade}_${item.completedAt}`;
            if (!historyMap.has(key)) {
              historyMap.set(key, item);
            }
          }
          const mergedHistory = Array.from(historyMap.values())
            .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
            .slice(0, 50);
          localStorage.setItem(getExamHistoryKey(c), JSON.stringify(mergedHistory));
        }
      }
    }

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
  triggerCloudSync();
  return { results: updatedResults, history: newHistory };
}

// --- Progression, Titles & Exam Domains ---
export * from './progression';
export * from './titles';
export * from './examSession';


