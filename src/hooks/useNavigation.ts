import { useState, useEffect, useCallback, useRef } from 'react';
import { Topic, GameMode, Grade, Language, LearningCourse, ExamPart } from '../types';
import { getStoredCourse, findFirstActiveExamGrade, hasInProgressExamSession } from '../services/storage';

export type Screen = 'catalog' | 'mode_select' | 'game' | 'exam';

function getInitialExamState(): { grade: Grade; part: ExamPart } | null {
  try {
    const storedCourse = getStoredCourse();
    return findFirstActiveExamGrade(storedCourse);
  } catch {}
  return null;
}

export function useNavigation(
  topics: Topic[] = [],
  course: LearningCourse = 'en',
  language: Language = 'ru'
) {
  const initialExam = getInitialExamState();
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [activeExamGrade, setActiveExamGrade] = useState<Grade | null>(initialExam?.grade || null);
  const [activeExamPart, setActiveExamPart] = useState<ExamPart>(initialExam?.part || 'final');

  const isGameActive = activeExamGrade !== null || gameMode !== null;

  const activeExamGradeRef = useRef<Grade | null>(activeExamGrade);
  useEffect(() => {
    activeExamGradeRef.current = activeExamGrade;
  }, [activeExamGrade]);

  const activeExamPartRef = useRef<ExamPart>(activeExamPart);
  useEffect(() => {
    activeExamPartRef.current = activeExamPart;
  }, [activeExamPart]);

  const selectedTopicRef = useRef<Topic | null>(selectedTopic);
  useEffect(() => {
    selectedTopicRef.current = selectedTopic;
  }, [selectedTopic]);

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
          const hasInProgressExam = hasInProgressExamSession(
            activeExamGradeRef.current,
            courseRef.current,
            activeExamPartRef.current
          );

          if (hasInProgressExam) {
            const confirmText =
              languageRef.current === 'ru'
                ? 'Выйти из контрольной? Прогресс будет сохранен, вы сможете продолжить позже.'
                : 'Iziet no pārbaudes darba? Progress tiks saglabāts, varēsiet turpināt vēlāk.';
            if (!window.confirm(confirmText)) {
              // Revert back to exam hash
              const p = activeExamPartRef.current;
              window.location.hash = p === 'final' ? `exam=${activeExamGradeRef.current}` : `exam=${activeExamGradeRef.current}_${p}`;
              return;
            }
          }
        }
      }

      if (!hash) {
        setSelectedTopic(null);
        setGameMode(null);
        setActiveExamGrade(null);
        setActiveExamPart('final');
        return;
      }

      const topicParam = params.get('topic');
      const modeParam = params.get('mode') as GameMode | null;

      if (examParam) {
        const parts = examParam.split('_');
        const g = parseInt(parts[0], 10) as Grade;
        const p = (parts[1] as ExamPart) || 'final';
        if ([1, 2, 3, 4].includes(g)) {
          setActiveExamGrade(g);
          setActiveExamPart(p);
          setSelectedTopic(null);
          setGameMode(null);
          return;
        }
      }

      if (topicParam && topics.length > 0) {
        const foundTopic =
          topics.find((t) => t.topic_id === topicParam) ||
          (selectedTopicRef.current?.topic_id === topicParam ? selectedTopicRef.current : null);
        if (foundTopic) {
          setSelectedTopic(foundTopic);
          setActiveExamGrade(null);
          if (
            modeParam &&
            ['flashcards', 'truefalse', 'balloons', 'builder', 'match', 'audio', 'test'].includes(modeParam)
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

  const selectTopicWithMode = useCallback((topic: Topic, mode: GameMode) => {
    setActiveExamGrade(null);
    setSelectedTopic(topic);
    setGameMode(mode);
    window.location.hash = `topic=${topic.topic_id}&mode=${mode}`;
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

  const startExam = useCallback((grade: Grade, part: ExamPart = 'final') => {
    setSelectedTopic(null);
    setGameMode(null);
    setActiveExamGrade(grade);
    setActiveExamPart(part);
    window.location.hash = part === 'final' ? `exam=${grade}` : `exam=${grade}_${part}`;
  }, []);

  const finishExam = useCallback(() => {
    skipNextHashConfirmRef.current = true;
    setActiveExamGrade(null);
    setActiveExamPart('final');
    window.location.hash = '';
  }, []);

  const navigateToHome = useCallback(
    (lang: Language = language): boolean => {
      if (activeExamGrade !== null) {
        const hasInProgressExam = hasInProgressExamSession(activeExamGrade, course, activeExamPart);

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
      setActiveExamPart('final');
      if (window.location.hash) {
        window.location.hash = '';
      }
      return true;
    },
    [activeExamGrade, activeExamPart, course, language]
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
    activeExamPart,
    isGameActive,
    setSelectedTopic,
    setGameMode,
    setActiveExamGrade,
    setActiveExamPart,
    selectTopic,
    selectTopicWithMode,
    selectMode,
    startExam,
    finishExam,
    navigateToHome,
    goBack,
    resetAllNavigation,
  };
}
