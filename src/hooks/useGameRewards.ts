import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Topic, GameMode, Language, LearningCourse, UserStats, ExamResult } from '../types';
import {
  addEarnedStars,
  checkAndClaimTopicMasteryBonus,
  checkAndClaimWordMilestones,
  evaluateUnlockedTitles,
  recordGameModePlayed,
  recordExamAttempt,
} from '../services/storage';
import { trackGameComplete } from '../utils/analytics';
import { sounds } from '../utils/soundEffects';
import { translations } from '../utils/i18n';
import { RewardToast } from '../components/RewardToastOverlay';

export interface CelebrationState {
  correct: number;
  total: number;
  stars: number;
  isRewardDisabled?: boolean;
}

export function useGameRewards(
  course: LearningCourse,
  language: Language,
  stats: UserStats,
  setStats: (updater: UserStats | ((prev: UserStats) => UserStats)) => void,
  setExamResults: React.Dispatch<React.SetStateAction<Record<number, ExamResult>>>,
  setExamHistory: React.Dispatch<React.SetStateAction<ExamResult[]>>
) {
  const [celebration, setCelebration] = useState<CelebrationState | null>(null);
  const [toastQueue, setToastQueue] = useState<RewardToast[]>([]);

  const currentToast = toastQueue[0] || null;

  const dismissToast = useCallback(() => {
    setToastQueue((prev) => prev.slice(1));
  }, []);

  // Auto-dismiss current active toast after 4 seconds
  useEffect(() => {
    if (!currentToast) return;
    const timer = setTimeout(() => {
      dismissToast();
    }, 4000);
    return () => clearTimeout(timer);
  }, [currentToast, dismissToast]);

  const handleGameComplete = useCallback(
    (
      selectedTopic: Topic | null,
      gameMode: GameMode | null,
      correctCount: number,
      totalCount: number
    ) => {
      if (!selectedTopic) return;

      if (gameMode === 'flashcards') {
        trackGameComplete('flashcards', selectedTopic.topic_id, correctCount, 0);
        // Flashcards is a study mode: no reward is granted (no stars added to avatar bank)
        setCelebration({
          correct: correctCount,
          total: totalCount,
          stars: 0,
          isRewardDisabled: true,
        });
        return;
      }

      const isFlawless = correctCount === totalCount && totalCount >= 4;
      const gameStars =
        correctCount === totalCount ? 3 : correctCount >= Math.ceil(totalCount / 2) ? 2 : 1;
      if (gameMode) {
        trackGameComplete(gameMode, selectedTopic.topic_id, correctCount, gameStars);
        recordGameModePlayed(gameMode, isFlawless);
      }

      // Add stars to user's piggy bank
      let updatedStats = addEarnedStars(gameStars);
      const newToasts: RewardToast[] = [];

      // Topic Mastery Bonus (+25 ⭐ for instructions, +10 ⭐ for >= 15 words, +5 ⭐ for others)
      const mastery = checkAndClaimTopicMasteryBonus(
        selectedTopic.topic_id,
        selectedTopic.words.length,
        course
      );
      if (mastery.claimed) {
        updatedStats = mastery.updatedStats;
        newToasts.push({
          id: `mastery-${selectedTopic.topic_id}`,
          type: 'bonus',
          message: `${translations[language].topicMasteryBonusToast} (${
            selectedTopic.topic_name[language] || selectedTopic.topic_name.ru
          })`,
          stars: mastery.bonusStars,
        });
      }

      // Word Milestones Bonus
      const msResult = checkAndClaimWordMilestones(course);
      if (msResult.totalBonusStars > 0) {
        updatedStats = msResult.updatedStats;
        newToasts.push({
          id: `milestone-${Date.now()}`,
          type: 'bonus',
          message: translations[language].wordMilestoneToast,
          stars: msResult.totalBonusStars,
        });
      }

      // Evaluate Unlocked Titles
      const titleResult = evaluateUnlockedTitles(updatedStats);
      if (titleResult.newlyUnlockedTitles.length > 0) {
        titleResult.newlyUnlockedTitles.forEach((title) => {
          newToasts.push({
            id: `title-${title.id}`,
            type: 'title',
            title,
          });
        });
        sounds.playFanfare();
        confetti({ particleCount: 80, spread: 80, origin: { y: 0.4 } });
      }

      if (newToasts.length > 0) {
        setToastQueue((prev) => [...prev, ...newToasts]);
      }

      setStats(titleResult.updatedStats);

      setCelebration({
        correct: correctCount,
        total: totalCount,
        stars: gameStars,
        isRewardDisabled: false,
      });
    },
    [course, language, setStats]
  );

  const handleExamComplete = useCallback(
    (result: ExamResult) => {
      const { results, history } = recordExamAttempt(course, result);
      setExamResults(results);
      setExamHistory(history);
      let updatedStats = stats;
      if (result.starsEarned > 0) {
        updatedStats = addEarnedStars(result.starsEarned);
      }

      // Evaluate Unlocked Titles after exam
      const titleResult = evaluateUnlockedTitles(updatedStats);
      if (titleResult.newlyUnlockedTitles.length > 0) {
        const newToasts: RewardToast[] = titleResult.newlyUnlockedTitles.map((title) => ({
          id: `exam-title-${title.id}`,
          type: 'title',
          title,
        }));
        setToastQueue((prev) => [...prev, ...newToasts]);
        sounds.playFanfare();
        confetti({ particleCount: 90, spread: 90, origin: { y: 0.4 } });
      }
      setStats(titleResult.updatedStats);
    },
    [course, stats, setStats, setExamResults, setExamHistory]
  );

  return {
    celebration,
    setCelebration,
    currentToast,
    dismissToast,
    handleGameComplete,
    handleExamComplete,
  };
}
