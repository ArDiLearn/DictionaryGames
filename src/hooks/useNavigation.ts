import { useState, useEffect, useCallback, useRef } from 'react';
import { Topic, GameMode, Grade, Language, LearningCourse } from '../types';
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

export function useNavigation(
  topics: Topic[] = [],
  course: LearningCourse = 'en',
  language: Language = 'ru'
) {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [activeExamGrade, setActiveExamGrade] = useState<Grade | null>(getInitialExamGrade);

  const isGameActive = activeExamGrade !== null || gameMode !== null;

  const activeExamGradeRef = useRef<Grade | null>(activeExamGrade);
  useEffect(() => {
    activeExamGradeRef.current = activeExamGrade;
  }, [activeExamGrade]);

  const courseRef = useRef<LearningCourse>(course);
  useEffect(() => {
    courseRef.current = course;
  }, [course]);

  const languageRef = useRef<Language>(language);
  useEffect(() => {
    languageRef.current = language;
  }, [language]);

  const skipNextHashConfirmRef = useRef<boolean>(false);

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

  // Sync state with Browser History and Hash changes (supports back/forward & deep linking)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      const params = new URLSearchParams(hash);
      const examParam = params.get('exam');

      // If an active exam was running and navigation changed hash away from exam:
      if (activeExamGradeRef.current !== null && !examParam) {
        if (skipNextHashConfirmRef.current) {
          skipNextHashConfirmRef.current = false;
        } else {
          // Check if the user has an unfinished exam with progress
          const sessionKey = `wordymind_exam_session_${activeExamGradeRef.current}_${courseRef.current}`;
          let hasInProgressExam = false;
          try {
            const raw = sessionStorage.getItem(sessionKey);
            if (raw) {
              const data = JSON.parse(raw);
              if (data && typeof data.currentIndex === 'number' && data.currentIndex > 0) {
                hasInProgressExam = true;
              }
            }
          } catch {}

          if (hasInProgressExam) {
            const confirmText =
              languageRef.current === 'ru'
                ? 'Выйти из контрольной? Прогресс будет сохранен, вы сможете продолжить позже.'
                : 'Iziet no pārbaudes darba? Progress tiks saglabāts, varēsiet turpināt vēlāk.';
            if (!window.confirm(confirmText)) {
              // Revert back to exam hash
              window.location.hash = `exam=${activeExamGradeRef.current}`;
              return;
            }
          }
        }
      }

      if (!hash) {
        setSelectedTopic(null);
        setGameMode(null);
        setActiveExamGrade(null);
        return;
      }

      const topicParam = params.get('topic');
      const modeParam = params.get('mode') as GameMode | null;

      if (examParam) {
        const g = parseInt(examParam, 10) as Grade;
        if ([1, 2, 3, 4].includes(g)) {
          setActiveExamGrade(g);
          setSelectedTopic(null);
          setGameMode(null);
          return;
        }
      }

      if (topicParam && topics.length > 0) {
        const foundTopic = topics.find((t) => t.topic_id === topicParam) || null;
        if (foundTopic) {
          setSelectedTopic(foundTopic);
          setActiveExamGrade(null);
          if (
            modeParam &&
            ['flashcards', 'truefalse', 'balloons', 'builder', 'match', 'audio'].includes(modeParam)
          ) {
            setGameMode(modeParam);
          } else {
            setGameMode(null);
          }
          return;
        }
      }
    };

    // Run on mount to support initial deep-linking
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [topics]);

  const selectTopic = useCallback((topic: Topic | null) => {
    setSelectedTopic(topic);
    setGameMode(null);
    if (topic) {
      window.location.hash = `topic=${topic.topic_id}`;
    } else {
      window.location.hash = '';
    }
  }, []);

  const selectMode = useCallback(
    (mode: GameMode | null) => {
      setGameMode(mode);
      if (mode && selectedTopic) {
        window.location.hash = `topic=${selectedTopic.topic_id}&mode=${mode}`;
      } else if (selectedTopic) {
        window.location.hash = `topic=${selectedTopic.topic_id}`;
      } else {
        window.location.hash = '';
      }
    },
    [selectedTopic]
  );

  const startExam = useCallback((grade: Grade) => {
    setSelectedTopic(null);
    setGameMode(null);
    setActiveExamGrade(grade);
    window.location.hash = `exam=${grade}`;
  }, []);

  const finishExam = useCallback(() => {
    skipNextHashConfirmRef.current = true;
    setActiveExamGrade(null);
    window.location.hash = '';
  }, []);

  const navigateToHome = useCallback(
    (lang: Language = language): boolean => {
      if (activeExamGrade !== null) {
        const sessionKey = `wordymind_exam_session_${activeExamGrade}_${course}`;
        let hasInProgressExam = false;
        try {
          const raw = sessionStorage.getItem(sessionKey);
          if (raw) {
            const data = JSON.parse(raw);
            if (data && typeof data.currentIndex === 'number' && data.currentIndex > 0) {
              hasInProgressExam = true;
            }
          }
        } catch {}

        if (hasInProgressExam) {
          const confirmText =
            lang === 'ru'
              ? 'Выйти из контрольной? Прогресс будет сохранен, вы сможете продолжить позже.'
              : 'Iziet no pārbaudes darba? Progress tiks saglabāts, varēsiet turpināt vēlāk.';
          if (!window.confirm(confirmText)) {
            return false;
          }
        }
      }
      skipNextHashConfirmRef.current = true;
      setSelectedTopic(null);
      setGameMode(null);
      setActiveExamGrade(null);
      if (window.location.hash) {
        window.location.hash = '';
      }
      return true;
    },
    [activeExamGrade, course, language]
  );

  const goBack = useCallback(
    (lang: Language = language): boolean => {
      skipNextHashConfirmRef.current = true;
      if (window.history.length > 1 && window.location.hash) {
        window.history.back();
        return true;
      }
      // Fallback if opened without history steps
      if (gameMode && selectedTopic) {
        selectMode(null);
        return true;
      }
      if (selectedTopic) {
        selectTopic(null);
        return true;
      }
      return navigateToHome(lang);
    },
    [gameMode, language, navigateToHome, selectMode, selectTopic, selectedTopic]
  );

  const resetAllNavigation = useCallback(() => {
    skipNextHashConfirmRef.current = true;
    setSelectedTopic(null);
    setGameMode(null);
    setActiveExamGrade(null);
    window.location.hash = '';
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
    goBack,
    resetAllNavigation,
  };
}
