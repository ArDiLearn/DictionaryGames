import { useState, useEffect, useCallback } from 'react';
import { Topic, GameMode, Grade, Language } from '../types';
import { getStoredCourse } from '../services/storage';

export type Screen = 'catalog' | 'mode_select' | 'game' | 'exam';

function getInitialExamGrade(): Grade | null {
  try {
    const storedCourse = getStoredCourse();
    for (const g of [1, 2, 3, 4] as Grade[]) {
      const raw = sessionStorage.getItem(`wordymind_exam_session_${g}_${storedCourse}`);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (
          parsed &&
          Array.isArray(parsed.questions) &&
          parsed.questions.length > 0 &&
          typeof parsed.currentIndex === 'number' &&
          parsed.currentIndex < parsed.questions.length
        ) {
          return g;
        }
      }
    }
  } catch {}
  return null;
}

export function useNavigation() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [activeExamGrade, setActiveExamGrade] = useState<Grade | null>(getInitialExamGrade);

  const isGameActive = activeExamGrade !== null || gameMode !== null;

  // Sync game active state with window and sessionStorage for ServiceWorker updates
  useEffect(() => {
    try {
      (window as unknown as { __WORDYMIND_GAME_ACTIVE__?: boolean }).__WORDYMIND_GAME_ACTIVE__ = isGameActive;
      if (isGameActive) {
        sessionStorage.setItem('wordymind_game_active', 'true');
      } else {
        sessionStorage.removeItem('wordymind_game_active');
        window.dispatchEvent(new CustomEvent('wordymind_game_ended'));
      }
    } catch {}
  }, [isGameActive]);

  const navigateToHome = useCallback((language: Language = 'ru'): boolean => {
    if (activeExamGrade !== null) {
      const confirmText =
        language === 'ru'
          ? 'Выйти из контрольной? Прогресс будет сохранен, вы сможете продолжить позже.'
          : 'Iziet no pārbaudes darba? Progress tiks saglabāts, varēsiet turpināt vēlāk.';
      if (!window.confirm(confirmText)) {
        return false;
      }
    }
    setSelectedTopic(null);
    setGameMode(null);
    setActiveExamGrade(null);
    return true;
  }, [activeExamGrade]);

  const resetAllNavigation = useCallback(() => {
    setSelectedTopic(null);
    setGameMode(null);
    setActiveExamGrade(null);
  }, []);

  const selectTopic = useCallback((topic: Topic | null) => {
    setSelectedTopic(topic);
    setGameMode(null);
  }, []);

  const selectMode = useCallback((mode: GameMode | null) => {
    setGameMode(mode);
  }, []);

  const startExam = useCallback((grade: Grade) => {
    setSelectedTopic(null);
    setGameMode(null);
    setActiveExamGrade(grade);
  }, []);

  const finishExam = useCallback(() => {
    setActiveExamGrade(null);
  }, []);

  const currentScreen: Screen =
    activeExamGrade !== null
      ? 'exam'
      : selectedTopic && gameMode
      ? 'game'
      : selectedTopic
      ? 'mode_select'
      : 'catalog';

  return {
    currentScreen,
    selectedTopic,
    gameMode,
    activeExamGrade,
    isGameActive,
    setSelectedTopic,
    setGameMode,
    setActiveExamGrade,
    selectTopic,
    selectMode,
    startExam,
    finishExam,
    navigateToHome,
    resetAllNavigation,
  };
}
