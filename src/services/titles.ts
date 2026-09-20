import { UserStats, PlayerTitle, Grade, GameMode } from '../types';
import { DEFAULT_UNLOCKED_TITLES, getTitleById } from '../data/titles';
import {
  loadLocalStats,
  saveLocalStatsRaw,
  loadExamResults,
  loadWordProgress,
  loadTopicProgress,
} from './localStorage';
import { triggerCloudSync } from './cloudSync';

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
  saveLocalStatsRaw(newStats);
  triggerCloudSync();
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
    return (
      (examResultsEn[g] && examResultsEn[g].scorePercent >= 60) ||
      (examResultsLv[g] && examResultsLv[g].scorePercent >= 60)
    );
  };
  const hasPerfectExam = () => {
    return (
      Object.values(examResultsEn).some((r) => r.scorePercent === 100) ||
      Object.values(examResultsLv).some((r) => r.scorePercent === 100)
    );
  };

  const wordsEn = loadWordProgress('en');
  const wordsLv = loadWordProgress('lv');
  const masteredEnCount = Object.values(wordsEn).filter((w) => w.isLearned).length;
  const masteredLvCount = Object.values(wordsLv).filter((w) => w.isLearned).length;
  const totalMasteredWords = Math.max(masteredEnCount, masteredLvCount);

  const topicsEn = loadTopicProgress('en');
  const topicsLv = loadTopicProgress('lv');
  const isTopicMastered = (topicId: string) => {
    return (
      (topicsEn[topicId] && topicsEn[topicId].stars === 3) ||
      (topicsLv[topicId] && topicsLv[topicId].stars === 3)
    );
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
  checkAndUnlock(
    'true_friend',
    isTopicMastered('family') &&
      isTopicMastered('family_plus') &&
      isTopicMastered('friendship')
  );
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
    saveLocalStatsRaw(updatedStats);
    triggerCloudSync();
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
  saveLocalStatsRaw(updatedStats);
  triggerCloudSync();
  return evaluateUnlockedTitles(updatedStats);
}
