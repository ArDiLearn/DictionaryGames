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
  loadTopicProgress,
  saveTopicProgress,
} from '../services/storage';
import { trackGameComplete } from '../utils/analytics';
import { sounds } from '../utils/soundEffects';
import { translations } from '../utils/i18n';
import { RewardToast } from '../components/RewardToastOverlay';

export interface CelebrationState {
  correct: number;
  total: number;
  stars: number;
  maxStars?: number;
  isRewardDisabled?: boolean;
  isMiniTopicPractice?: boolean;
  isFirstClear?: boolean;
  isRepeatClear?: boolean;
  isFailedThreshold?: boolean;
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
          maxStars: 0,
          isRewardDisabled: true,
        });
        return;
      }

      const percentage = Math.round((correctCount / Math.max(1, totalCount)) * 100);
      const isPassThreshold = percentage >= 70;

      // Dynamic star caps based on word count:
      // < 5 words: 0 stars (practice mode, prevents 2-sec micro-farming)
      // 5-8 words: max 2 stars
      // >= 9 words: max 3 stars
      let maxStars = 3;
      if (totalCount < 5) {
        maxStars = 0;
      } else if (totalCount <= 8) {
        maxStars = 2;
      }

      // Check whether this game mode was previously completed with >= 70%
      const allTopicProgress = loadTopicProgress(course);
      const currentTopicProgress = allTopicProgress[selectedTopic.topic_id] || {
        topic_id: selectedTopic.topic_id,
        stars: 0,
        masteredWordIds: [],
        completedModes: [],
      };
      const completedModes = currentTopicProgress.completedModes || [];
      const isFirstClear = Boolean(gameMode && !completedModes.includes(gameMode));

      let gameStars = 0;
      let isFailedThreshold = false;
      let isRepeatClear = false;

      if (maxStars === 0) {
        gameStars = 0;
      } else if (!isPassThreshold) {
        // Less than 70%: no stars earned (practice needed)
        gameStars = 0;
        isFailedThreshold = true;
      } else if (isFirstClear) {
        // First successful pass: full star reward (3 for 9+ words, 2 for 5-8 words)
        gameStars = maxStars;
        if (gameMode) {
          currentTopicProgress.completedModes = [...completedModes, gameMode];
          allTopicProgress[selectedTopic.topic_id] = currentTopicProgress;
          saveTopicProgress(allTopicProgress, course);
        }
      } else {
        // Subsequent pass: 1 star
        gameStars = 1;
        isRepeatClear = true;
      }

      const isFlawless = correctCount === totalCount && totalCount >= 4;
      if (gameMode) {
        trackGameComplete(gameMode, selectedTopic.topic_id, correctCount, gameStars);
        recordGameModePlayed(gameMode, isFlawless);
      }

      // Add stars to user's piggy bank only if gameStars > 0
      let updatedStats = gameStars > 0 ? addEarnedStars(gameStars) : stats;
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
        maxStars: isRepeatClear ? 1 : maxStars,
        isRewardDisabled: false,
        isMiniTopicPractice: maxStars === 0,
        isFirstClear: isPassThreshold && isFirstClear && maxStars > 0,
        isRepeatClear: isPassThreshold && isRepeatClear && maxStars > 0,
        isFailedThreshold,
      });
    },
    [course, language, setStats, stats]
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
