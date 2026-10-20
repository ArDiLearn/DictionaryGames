import { LearningCourse, UserStats } from '../types';
import {
  loadWordProgress,
  saveWordProgressRaw,
  loadTopicProgress,
  saveTopicProgressRaw,
  loadLocalStats,
  saveLocalStatsRaw,
} from './localStorage';
import { triggerCloudSync } from './cloudSync';
import { resolveWordText } from './supabase';

export function recordWordAttempt(
  wordId: string,
  topicId: string,
  isCorrect: boolean,
  totalWordsInTopic: number,
  course: LearningCourse = 'en',
  clearMistake: boolean = false
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

  const timesCorrect = clearMistake && isCorrect
    ? Math.max(2, prev.timesCorrect + 1)
    : prev.timesCorrect + (isCorrect ? 1 : 0);
  const timesWrong = clearMistake && isCorrect
    ? 0
    : prev.timesWrong + (isCorrect ? 0 : 1);
  const isLearned = isCorrect && (clearMistake || (timesCorrect >= 2 && timesCorrect > timesWrong));
  const newlyMastered = !prev.isLearned && isLearned;

  const coursePrefix =
    course === 'lv' ? 'lv:' : course === 'en-lv' ? 'en_lv:' : course === 'lv-en' ? 'lv_en:' : '';

  words[wordId] = {
    word_id: wordId,
    word: resolveWordText(`${coursePrefix}${wordId}`, `${coursePrefix}${topicId}`, prev.word),
    topic_id: topicId,
    timesCorrect,
    timesWrong,
    isLearned,
    lastReviewedAt: new Date().toISOString(),
  };
  saveWordProgressRaw(words, course);

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

  // Calculate stars (capped at maxTopicStars: 0 for <5 words, 2 for 5-8 words, 3 for 9+ words)
  const maxTopicStars = totalWordsInTopic < 5 ? 0 : totalWordsInTopic <= 8 ? 2 : 3;
  const ratio = topic.masteredWordIds.length / Math.max(1, totalWordsInTopic);
  let stars = 0;
  if (maxTopicStars === 3) {
    if (ratio >= 1) {
      stars = 3;
    } else if (ratio >= 0.5) {
      stars = 2;
    } else if (ratio > 0.1 || topic.masteredWordIds.length >= 1) {
      stars = 1;
    }
  } else if (maxTopicStars === 2) {
    if (ratio >= 1) {
      stars = 2;
    } else if (ratio > 0.1 || topic.masteredWordIds.length >= 1) {
      stars = 1;
    }
  } else {
    stars = 0;
  }

  topic.stars = Math.min(Math.max(topic.stars, stars), maxTopicStars);
  topic.lastPlayedAt = new Date().toISOString();
  topics[topicId] = topic;

  saveTopicProgressRaw(topics, course);
  // One cloud sync after both word and topic progress are written
  triggerCloudSync();

  return { stars: topic.stars, newlyMastered };
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
  const bonusKey = course === 'en' ? topicId : `${course}:${topicId}`;

  const isMastered = Boolean(
    topic &&
    totalWordsInTopic >= 5 &&
    topic.masteredWordIds &&
    topic.masteredWordIds.length >= totalWordsInTopic
  );

  if (!topic || !isMastered || claimedList.includes(bonusKey)) {
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
    claimedTopicBonusIds: [...claimedList, bonusKey],
    totalStarsEarned: (currentStats.totalStarsEarned || 0) + bonusStars,
  };
  saveLocalStatsRaw(updatedStats);
  triggerCloudSync();

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
    const msKey = course === 'en' ? ms.id : `${course}:${ms.id}`;
    if (masteredCount >= ms.wordsThreshold && !claimedIds.has(msKey)) {
      claimedIds.add(msKey);
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
    saveLocalStatsRaw(updatedStats);
    triggerCloudSync();
    return { claimedMilestones: newlyClaimed, totalBonusStars: totalBonus, updatedStats };
  }

  return { claimedMilestones: [], totalBonusStars: 0, updatedStats: currentStats };
}
