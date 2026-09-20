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

// --- Bidirectional merge from cloud ---

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
    saveTopicProgressRaw(mergedTopicsEn, 'en');

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
    saveTopicProgressRaw(mergedTopicsLv, 'lv');

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
    saveWordProgressRaw(mergedWordsEn, 'en');

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
    saveWordProgressRaw(mergedWordsLv, 'lv');

    // 3. Merge UserStats
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

    saveLocalStatsRaw(mergedStats);
    localStorage.setItem(STATS_KEY, JSON.stringify(mergedStats));

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
