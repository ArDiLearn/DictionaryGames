/**
 * Cloud synchronization engine.
 * Handles debounced sync to Supabase and bidirectional merge logic.
 * Imports from localStorage.ts (pure I/O) and supabase.ts — no circular dependencies.
 */
import { LearningCourse, TopicProgress, WordProgress, UserStats, ExamResult } from '../types';
import { getCurrentUser, getCurrentUserLogin, syncProgressToCloud, fetchProgressFromCloud } from './supabase';
import { DEFAULT_UNLOCKED_AVATARS } from '../data/avatars';
import { DEFAULT_UNLOCKED_TITLES } from '../data/titles';
import {
  loadLocalStats,
  saveLocalStatsRaw,
  STATS_KEY,
  loadTopicProgress,
  saveTopicProgressRaw,
  loadWordProgress,
  saveWordProgressRaw,
  loadExamResults,
  loadExamHistory,
  getExamResultsKey,
  getExamHistoryKey,
} from './localStorage';

// --- Debounced cloud push ---

let syncTimeout: ReturnType<typeof setTimeout> | null = null;

export function triggerCloudSync() {
  if (syncTimeout) clearTimeout(syncTimeout);
  syncTimeout = setTimeout(async () => {
    try {
      const user = await getCurrentUser();
      if (!user) return;

      const stats = loadLocalStats();

      // Gather progress from all 4 courses (EN-RU, EN-LV, LV-RU, LV-EN)
      const topicProgEn = loadTopicProgress('en');
      const topicProgEnLv = loadTopicProgress('en-lv');
      const topicProgLv = loadTopicProgress('lv');
      const topicProgLvEn = loadTopicProgress('lv-en');
      const mergedTopicProg: Record<string, TopicProgress> = { ...topicProgEn };
      for (const [tid, tp] of Object.entries(topicProgEnLv)) {
        mergedTopicProg[`en_lv:${tid}`] = { ...tp, topic_id: `en_lv:${tid}` };
      }
      for (const [tid, tp] of Object.entries(topicProgLv)) {
        mergedTopicProg[`lv:${tid}`] = { ...tp, topic_id: `lv:${tid}` };
      }
      for (const [tid, tp] of Object.entries(topicProgLvEn)) {
        mergedTopicProg[`lv_en:${tid}`] = { ...tp, topic_id: `lv_en:${tid}` };
      }

      const wordProgEn = loadWordProgress('en');
      const wordProgEnLv = loadWordProgress('en-lv');
      const wordProgLv = loadWordProgress('lv');
      const wordProgLvEn = loadWordProgress('lv-en');
      const mergedWordProg: Record<string, WordProgress> = { ...wordProgEn };
      for (const [wid, wp] of Object.entries(wordProgEnLv)) {
        mergedWordProg[`en_lv:${wid}`] = { ...wp, word_id: `en_lv:${wid}`, topic_id: `en_lv:${wp.topic_id}` };
      }
      for (const [wid, wp] of Object.entries(wordProgLv)) {
        mergedWordProg[`lv:${wid}`] = { ...wp, word_id: `lv:${wid}`, topic_id: `lv:${wp.topic_id}` };
      }
      for (const [wid, wp] of Object.entries(wordProgLvEn)) {
        mergedWordProg[`lv_en:${wid}`] = { ...wp, word_id: `lv_en:${wid}`, topic_id: `lv_en:${wp.topic_id}` };
      }

      // Gather exam results and history from all 4 courses
      const examResultsEn = loadExamResults('en');
      const examResultsEnLv = loadExamResults('en-lv');
      const examResultsLv = loadExamResults('lv');
      const examResultsLvEn = loadExamResults('lv-en');
      const examHistoryEn = loadExamHistory('en');
      const examHistoryEnLv = loadExamHistory('en-lv');
      const examHistoryLv = loadExamHistory('lv');
      const examHistoryLvEn = loadExamHistory('lv-en');

      await syncProgressToCloud(user.id, mergedTopicProg, mergedWordProg, stats, {
        results: { en: examResultsEn, 'en-lv': examResultsEnLv, lv: examResultsLv, 'lv-en': examResultsLvEn },
        history: { en: examHistoryEn, 'en-lv': examHistoryEnLv, lv: examHistoryLv, 'lv-en': examHistoryLvEn },
      });
    } catch {
      // ignore offline errors
    }
  }, 1000);
}

// --- Bidirectional merge from cloud ---

export async function mergeWithCloud(): Promise<boolean> {
  try {
    const user = await getCurrentUser();
    if (!user) return false;

    const cloudData = await fetchProgressFromCloud(user.id);
    if (!cloudData) return false;

    // 1. Separate EN-RU, EN-LV, LV-RU, and LV-EN topic progress from cloud
    const cloudTopicsEn: Record<string, TopicProgress> = {};
    const cloudTopicsEnLv: Record<string, TopicProgress> = {};
    const cloudTopicsLv: Record<string, TopicProgress> = {};
    const cloudTopicsLvEn: Record<string, TopicProgress> = {};

    for (const [tid, cTopic] of Object.entries(cloudData.topicProgress)) {
      if (tid.startsWith('lv:')) {
        const cleanTid = tid.slice(3);
        cloudTopicsLv[cleanTid] = { ...cTopic, topic_id: cleanTid };
      } else if (tid.startsWith('lv_en:') || tid.startsWith('lv-en:')) {
        const cleanTid = tid.slice(6);
        cloudTopicsLvEn[cleanTid] = { ...cTopic, topic_id: cleanTid };
      } else if (tid.startsWith('en_lv:') || tid.startsWith('en-lv:')) {
        const cleanTid = tid.slice(6);
        cloudTopicsEnLv[cleanTid] = { ...cTopic, topic_id: cleanTid };
      } else {
        cloudTopicsEn[tid] = cTopic;
      }
    }

    const mergeTopicMap = (
      localMap: Record<string, TopicProgress>,
      cloudMap: Record<string, TopicProgress>
    ): Record<string, TopicProgress> => {
      const merged = { ...localMap };
      for (const [tid, cTopic] of Object.entries(cloudMap)) {
        if (!merged[tid]) {
          merged[tid] = cTopic;
        } else {
          const unionWords = Array.from(
            new Set([...(merged[tid].masteredWordIds || []), ...(cTopic.masteredWordIds || [])])
          );
          const unionModes = Array.from(
            new Set([...(merged[tid].completedModes || []), ...(cTopic.completedModes || [])])
          );
          merged[tid] = {
            topic_id: tid,
            stars: Math.max(merged[tid].stars || 0, cTopic.stars || 0),
            masteredWordIds: unionWords,
            completedModes: unionModes,
            lastPlayedAt: merged[tid].lastPlayedAt || cTopic.lastPlayedAt,
          };
        }
      }
      return merged;
    };

    const mergedTopicsEn = mergeTopicMap(loadTopicProgress('en'), cloudTopicsEn);
    saveTopicProgressRaw(mergedTopicsEn, 'en');

    const mergedTopicsEnLv = mergeTopicMap(loadTopicProgress('en-lv'), cloudTopicsEnLv);
    saveTopicProgressRaw(mergedTopicsEnLv, 'en-lv');

    const mergedTopicsLv = mergeTopicMap(loadTopicProgress('lv'), cloudTopicsLv);
    saveTopicProgressRaw(mergedTopicsLv, 'lv');

    const mergedTopicsLvEn = mergeTopicMap(loadTopicProgress('lv-en'), cloudTopicsLvEn);
    saveTopicProgressRaw(mergedTopicsLvEn, 'lv-en');

    // 2. Separate EN-RU, EN-LV, LV-RU, and LV-EN word progress
    const cloudWordsEn: Record<string, WordProgress> = {};
    const cloudWordsEnLv: Record<string, WordProgress> = {};
    const cloudWordsLv: Record<string, WordProgress> = {};
    const cloudWordsLvEn: Record<string, WordProgress> = {};

    for (const [wid, cWord] of Object.entries(cloudData.wordProgress)) {
      if (wid.startsWith('lv:') || cWord.topic_id?.startsWith('lv:')) {
        const cleanWid = wid.startsWith('lv:') ? wid.slice(3) : wid;
        const cleanTid = cWord.topic_id?.startsWith('lv:') ? cWord.topic_id.slice(3) : cWord.topic_id;
        cloudWordsLv[cleanWid] = { ...cWord, word_id: cleanWid, topic_id: cleanTid };
      } else if (
        wid.startsWith('lv_en:') ||
        wid.startsWith('lv-en:') ||
        cWord.topic_id?.startsWith('lv_en:') ||
        cWord.topic_id?.startsWith('lv-en:')
      ) {
        const cleanWid = wid.replace(/^(lv_en:|lv-en:)/, '');
        const cleanTid = cWord.topic_id ? cWord.topic_id.replace(/^(lv_en:|lv-en:)/, '') : cWord.topic_id;
        cloudWordsLvEn[cleanWid] = { ...cWord, word_id: cleanWid, topic_id: cleanTid };
      } else if (
        wid.startsWith('en_lv:') ||
        wid.startsWith('en-lv:') ||
        cWord.topic_id?.startsWith('en_lv:') ||
        cWord.topic_id?.startsWith('en-lv:')
      ) {
        const cleanWid = wid.replace(/^(en_lv:|en-lv:)/, '');
        const cleanTid = cWord.topic_id ? cWord.topic_id.replace(/^(en_lv:|en-lv:)/, '') : cWord.topic_id;
        cloudWordsEnLv[cleanWid] = { ...cWord, word_id: cleanWid, topic_id: cleanTid };
      } else {
        cloudWordsEn[wid] = cWord;
      }
    }

    const mergeWordMap = (
      localMap: Record<string, WordProgress>,
      cloudMap: Record<string, WordProgress>
    ): Record<string, WordProgress> => {
      const merged = { ...localMap };
      for (const [wid, cWord] of Object.entries(cloudMap)) {
        if (!merged[wid]) {
          merged[wid] = cWord;
        } else {
          merged[wid] = {
            word_id: wid,
            word: cWord.word || merged[wid].word,
            topic_id: cWord.topic_id || merged[wid].topic_id,
            timesCorrect: Math.max(merged[wid].timesCorrect || 0, cWord.timesCorrect || 0),
            timesWrong: Math.max(merged[wid].timesWrong || 0, cWord.timesWrong || 0),
            isLearned: merged[wid].isLearned || cWord.isLearned,
            lastReviewedAt: merged[wid].lastReviewedAt || cWord.lastReviewedAt,
          };
        }
      }
      return merged;
    };

    const mergedWordsEn = mergeWordMap(loadWordProgress('en'), cloudWordsEn);
    saveWordProgressRaw(mergedWordsEn, 'en');

    const mergedWordsEnLv = mergeWordMap(loadWordProgress('en-lv'), cloudWordsEnLv);
    saveWordProgressRaw(mergedWordsEnLv, 'en-lv');

    const mergedWordsLv = mergeWordMap(loadWordProgress('lv'), cloudWordsLv);
    saveWordProgressRaw(mergedWordsLv, 'lv');

    const mergedWordsLvEn = mergeWordMap(loadWordProgress('lv-en'), cloudWordsLvEn);
    saveWordProgressRaw(mergedWordsLvEn, 'lv-en');

    // 3. Merge UserStats
    const currentStats = loadLocalStats();
    const cloudStats = cloudData.statsPartial || {};

    const totalStarsSumTopics =
      Object.values(mergedTopicsEn).reduce((s, tp) => s + (tp.stars || 0), 0) +
      Object.values(mergedTopicsEnLv).reduce((s, tp) => s + (tp.stars || 0), 0) +
      Object.values(mergedTopicsLv).reduce((s, tp) => s + (tp.stars || 0), 0) +
      Object.values(mergedTopicsLvEn).reduce((s, tp) => s + (tp.stars || 0), 0);

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

    saveLocalStatsRaw(mergedStats);
    localStorage.setItem(STATS_KEY, JSON.stringify(mergedStats));

    // 4. Merge Exam Results & History for all 4 courses
    if (cloudData.examResults) {
      for (const c of ['en', 'en-lv', 'lv', 'lv-en'] as LearningCourse[]) {
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
      for (const c of ['en', 'en-lv', 'lv', 'lv-en'] as LearningCourse[]) {
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
