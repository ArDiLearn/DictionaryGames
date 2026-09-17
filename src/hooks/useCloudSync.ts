import { useState, useEffect, useCallback } from 'react';
import { LearningCourse, TopicProgress, WordProgress, UserStats, ExamResult } from '../types';
import { getCurrentUser, getCurrentUserLogin } from '../services/supabase';
import {
  mergeWithCloud,
  loadLocalStats,
  saveLocalStats,
  loadTopicProgress,
  loadWordProgress,
  loadExamResults,
  loadExamHistory,
} from '../services/storage';

interface UseCloudSyncProps {
  course: LearningCourse;
  isGameActive: boolean;
  setTopicProgress: React.Dispatch<React.SetStateAction<Record<string, TopicProgress>>>;
  setWordProgress: React.Dispatch<React.SetStateAction<Record<string, WordProgress>>>;
  setExamResults: React.Dispatch<React.SetStateAction<Record<number, ExamResult>>>;
  setExamHistory: React.Dispatch<React.SetStateAction<ExamResult[]>>;
  setStats: React.Dispatch<React.SetStateAction<UserStats>>;
}

export function useCloudSync({
  course,
  isGameActive,
  setTopicProgress,
  setWordProgress,
  setExamResults,
  setExamHistory,
  setStats,
}: UseCloudSyncProps) {
  const [isCloudSynced, setIsCloudSynced] = useState<boolean>(false);

  const reloadAllFromLocal = useCallback(
    (targetCourse: LearningCourse = course) => {
      setTopicProgress(loadTopicProgress(targetCourse));
      setWordProgress(loadWordProgress(targetCourse));
      setExamResults(loadExamResults(targetCourse));
      setExamHistory(loadExamHistory(targetCourse));
      setStats(loadLocalStats());
    },
    [course, setTopicProgress, setWordProgress, setExamResults, setExamHistory, setStats]
  );

  // Initialize and check cloud sync on course change or mount
  useEffect(() => {
    let isMounted = true;
    const initSync = async () => {
      const user = await getCurrentUser();
      if (!isMounted) return;
      setIsCloudSynced(!!user);
      if (user) {
        const userLogin = getCurrentUserLogin(user);
        if (userLogin && userLogin !== 'Player') {
          const currentStats = loadLocalStats();
          if (
            !currentStats.playerName ||
            currentStats.playerName === 'Знайка' ||
            currentStats.playerName === 'Zinītis' ||
            currentStats.playerName === 'Супер-Знайка'
          ) {
            saveLocalStats({ ...currentStats, playerName: userLogin });
          }
        }
        await mergeWithCloud();
        if (!isMounted) return;
        reloadAllFromLocal(course);
      }
    };
    initSync();
    return () => {
      isMounted = false;
    };
  }, [course, reloadAllFromLocal]);

  // Auto-sync when returning to tab/app on another device (NEVER during active games or exams)
  useEffect(() => {
    let syncThrottle = false;
    const handleVisibilityOrFocus = async () => {
      // NEVER trigger background cloud sync or state resets during an active exam or mini-game!
      if (isGameActive) return;

      if (document.visibilityState === 'visible' && !syncThrottle) {
        syncThrottle = true;
        setTimeout(() => {
          syncThrottle = false;
        }, 3000);

        const user = await getCurrentUser();
        if (user) {
          await mergeWithCloud();
          setTopicProgress(loadTopicProgress(course));
          setWordProgress(loadWordProgress(course));
          setStats(loadLocalStats());
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityOrFocus);
    window.addEventListener('focus', handleVisibilityOrFocus);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityOrFocus);
      window.removeEventListener('focus', handleVisibilityOrFocus);
    };
  }, [course, isGameActive, setTopicProgress, setWordProgress, setStats]);

  const handleManualSyncComplete = useCallback(async () => {
    const user = await getCurrentUser();
    setIsCloudSynced(!!user);
    if (user) {
      const userLogin = getCurrentUserLogin(user);
      if (userLogin && userLogin !== 'Player') {
        const currentStats = loadLocalStats();
        saveLocalStats({ ...currentStats, playerName: userLogin });
      }
    }
    reloadAllFromLocal(course);
  }, [course, reloadAllFromLocal]);

  return {
    isCloudSynced,
    setIsCloudSynced,
    reloadAllFromLocal,
    handleManualSyncComplete,
  };
}
