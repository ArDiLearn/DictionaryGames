import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import rawWordsData from './data/words.json';
import { Topic, Language, GameMode, TopicProgress, UserStats, Grade, WordProgress, LearningCourse, ExamResult, PlayerTitle } from './types';
import { Header } from './components/Header';
import { TopicList } from './components/TopicList';
import { GameSelector } from './components/GameSelector';
import { FlashcardsGame } from './components/games/FlashcardsGame';
import { TrueFalseGame } from './components/games/TrueFalseGame';
import { BalloonPopGame } from './components/games/BalloonPopGame';
import { WordBuilderGame } from './components/games/WordBuilderGame';
import { MatchPairsGame } from './components/games/MatchPairsGame';
import { AudioQuizGame } from './components/games/AudioQuizGame';
import { ExamGame } from './components/games/ExamGame';
import { CelebrationModal } from './components/CelebrationModal';
import { AuthModal } from './components/AuthModal';
import { PwaInstallPrompt } from './components/PwaInstallPrompt';
import { AvatarShopModal } from './components/AvatarShopModal';
import { ProgressStatsModal } from './components/ProgressStatsModal';
import { TitleSelectModal } from './components/TitleSelectModal';
import { trackGameStart, trackGameComplete, trackLanguageChange } from './utils/analytics';
import { sounds } from './utils/soundEffects';
import { translations } from './utils/i18n';
import {
  getStoredLanguage,
  saveStoredLanguage,
  getStoredCourse,
  saveStoredCourse,
  getStoredGrades,
  saveStoredGrades,
  loadLocalStats,
  saveLocalStats,
  loadTopicProgress,
  loadWordProgress,
  recordWordAttempt,
  mergeWithCloud,
  purchaseAvatar,
  addEarnedStars,
  loadExamResults,
  loadExamHistory,
  recordExamAttempt,
  equipTitle,
  evaluateUnlockedTitles,
  recordGameModePlayed,
  checkAndClaimTopicMasteryBonus,
  checkAndClaimWordMilestones,
} from './services/storage';
import { getCurrentUser, getCurrentUserLogin } from './services/supabase';

import {
  GRADE_1_TOPIC_ORDER,
  GRADE_2_TOPIC_ORDER,
  GRADE_3_TOPIC_ORDER,
  GRADE_4_TOPIC_ORDER,
  GRADE_1_MAIN_TOPICS,
  GRADE_2_MAIN_TOPICS,
  GRADE_3_MAIN_TOPICS,
  GRADE_4_MAIN_TOPICS,
  EXTRA_TOPICS,
  isTopicExtra,
  hasNewWordsForGrades,
  GRADE_3_EXTRA_DUPLICATES,
} from './utils/i18n';

export const App: React.FC = () => {
  const topics = rawWordsData as Topic[];

  // App State
  const [course, setCourse] = useState<LearningCourse>(() => getStoredCourse());
  const [language, setLanguage] = useState<Language>(() => {
    const storedCourse = getStoredCourse();
    if (storedCourse === 'lv') return 'ru';
    return getStoredLanguage();
  });
  const [selectedGrades, setSelectedGrades] = useState<Grade[]>(getStoredGrades());
  const [stats, setStats] = useState<UserStats>(loadLocalStats());
  const [topicProgress, setTopicProgress] = useState<Record<string, TopicProgress>>(() =>
    loadTopicProgress(getStoredCourse())
  );
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [activeExamGrade, setActiveExamGrade] = useState<Grade | null>(null);
  const [examResults, setExamResults] = useState<Record<number, ExamResult>>(() =>
    loadExamResults(getStoredCourse())
  );
  const [examHistory, setExamHistory] = useState<ExamResult[]>(() =>
    loadExamHistory(getStoredCourse())
  );
  const [statsInitialTab, setStatsInitialTab] = useState<'overview' | 'exams' | 'topics' | 'practice' | 'awards'>('overview');
  const [isCloudSynced, setIsCloudSynced] = useState<boolean>(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);
  const [isAvatarShopOpen, setIsAvatarShopOpen] = useState<boolean>(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState<boolean>(false);
  const [isTitleSelectOpen, setIsTitleSelectOpen] = useState<boolean>(false);
  const [unlockedTitleToast, setUnlockedTitleToast] = useState<PlayerTitle | null>(null);
  const [bonusRewardToast, setBonusRewardToast] = useState<{ message: string; stars: number } | null>(null);
  const [wordProgress, setWordProgress] = useState<Record<string, WordProgress>>(() =>
    loadWordProgress(getStoredCourse())
  );

  // Grade filtered topics: supports multi-selection of grades (e.g. [1, 2], [2, 3], [1], [2], [3], [1, 2, 3])
  const filteredTopics = useMemo(() => {
    const gradesSet = new Set(selectedGrades);
    const result = topics
      .map((topic) => {
        const isExtra = isTopicExtra(topic.topic_id, selectedGrades);
        if (!isExtra) {
          return {
            ...topic,
            words: topic.words.filter((w) => {
              const g = (w.grade || 1) as Grade;
              // For feelings when Grade 3 is included, include Grade 1 and 3 words!
              if (topic.topic_id === 'feelings' && gradesSet.has(3)) {
                return g === 1 || g === 3;
              }
              return gradesSet.has(g);
            }),
          };
        }

        // For Extra topics:
        let extraWords = topic.words;

        // When Grade 1 is selected alone: ONLY show Grade 1 words!
        if (selectedGrades.length === 1 && selectedGrades[0] === 1) {
          extraWords = topic.words.filter((w) => (w.grade || 1) === 1);
        } else if (selectedGrades.length === 1 && selectedGrades[0] === 2) {
          // When Grade 2 is selected alone: show Grade 2 words first, then Grade 1 words!
          const g2Words = topic.words.filter((w) => (w.grade || 1) === 2);
          const g1Words = topic.words.filter((w) => (w.grade || 1) === 1);
          extraWords = [...g2Words, ...g1Words];
        } else if (gradesSet.has(2)) {
          // When multi-grade including Grade 2:
          const g2Words = topic.words.filter((w) => (w.grade || 1) === 2);
          const g1Words = topic.words.filter((w) => (w.grade || 1) === 1);
          const otherWords = topic.words.filter((w) => (w.grade || 1) !== 1 && (w.grade || 1) !== 2);
          extraWords = [...g2Words, ...g1Words, ...otherWords];
        }

        // When Grade 3 is active/selected, remove Group B duplicates (park, school, teacher, chocolate) from extra topics!
        if (gradesSet.has(3)) {
          extraWords = extraWords.filter(
            (w) => !GRADE_3_EXTRA_DUPLICATES.has(w.en.toLowerCase().trim())
          );
        }

        return {
          ...topic,
          words: extraWords,
        };
      })
      .filter((topic) => topic.words.length > 0);

    // If Grade 1 is selected alone, enforce user-defined topic order
    if (selectedGrades.length === 1 && selectedGrades[0] === 1) {
      return [...result].sort((a, b) => {
        const idxA = GRADE_1_TOPIC_ORDER.indexOf(a.topic_id);
        const idxB = GRADE_1_TOPIC_ORDER.indexOf(b.topic_id);
        const posA = idxA === -1 ? 999 : idxA;
        const posB = idxB === -1 ? 999 : idxB;
        return posA - posB;
      });
    }

    // If Grade 2 is selected alone, enforce user-defined topic order
    if (selectedGrades.length === 1 && selectedGrades[0] === 2) {
      return [...result].sort((a, b) => {
        const idxA = GRADE_2_TOPIC_ORDER.indexOf(a.topic_id);
        const idxB = GRADE_2_TOPIC_ORDER.indexOf(b.topic_id);
        const posA = idxA === -1 ? 999 : idxA;
        const posB = idxB === -1 ? 999 : idxB;
        return posA - posB;
      });
    }

    // If Grade 3 is selected alone, enforce user-defined topic order
    if (selectedGrades.length === 1 && selectedGrades[0] === 3) {
      return [...result].sort((a, b) => {
        const idxA = GRADE_3_TOPIC_ORDER.indexOf(a.topic_id);
        const idxB = GRADE_3_TOPIC_ORDER.indexOf(b.topic_id);
        const posA = idxA === -1 ? 999 : idxA;
        const posB = idxB === -1 ? 999 : idxB;
        return posA - posB;
      });
    }

    // If Grade 4 is selected alone, enforce user-defined topic order
    if (selectedGrades.length === 1 && selectedGrades[0] === 4) {
      return [...result].sort((a, b) => {
        const idxA = GRADE_4_TOPIC_ORDER.indexOf(a.topic_id);
        const idxB = GRADE_4_TOPIC_ORDER.indexOf(b.topic_id);
        const posA = idxA === -1 ? 999 : idxA;
        const posB = idxB === -1 ? 999 : idxB;
        return posA - posB;
      });
    }

    // For multi-grade or all grades: main topics first, then extra topics
    return [...result].sort((a, b) => {
      const isExtraA = isTopicExtra(a.topic_id, selectedGrades);
      const isExtraB = isTopicExtra(b.topic_id, selectedGrades);
      if (isExtraA && !isExtraB) return 1;
      if (!isExtraA && isExtraB) return -1;
      if (isExtraA && isExtraB) {
        if (selectedGrades.some((g) => g >= 2)) {
          const aNew = hasNewWordsForGrades(a, selectedGrades);
          const bNew = hasNewWordsForGrades(b, selectedGrades);
          if (aNew && !bNew) return -1;
          if (!aNew && bNew) return 1;
        }
        return EXTRA_TOPICS.indexOf(a.topic_id) - EXTRA_TOPICS.indexOf(b.topic_id);
      }
      return 0;
    });
  }, [topics, selectedGrades]);

  // Main topics for current active exam grade
  const examTopics = useMemo(() => {
    if (!activeExamGrade) return [];
    const mainTopicIds =
      activeExamGrade === 1
        ? GRADE_1_MAIN_TOPICS
        : activeExamGrade === 2
        ? GRADE_2_MAIN_TOPICS
        : activeExamGrade === 3
        ? GRADE_3_MAIN_TOPICS
        : GRADE_4_MAIN_TOPICS;
    return topics.filter((t) => mainTopicIds.includes(t.topic_id));
  }, [topics, activeExamGrade]);

  // Celebration state
  const [celebration, setCelebration] = useState<{
    correct: number;
    total: number;
    stars: number;
    isRewardDisabled?: boolean;
  } | null>(null);

  // Initialize and check cloud sync
  useEffect(() => {
    const initSync = async () => {
      const user = await getCurrentUser();
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
        setTopicProgress(loadTopicProgress(course));
        setWordProgress(loadWordProgress(course));
        setExamResults(loadExamResults(course));
        setExamHistory(loadExamHistory(course));
        setStats(loadLocalStats());
      }
    };
    initSync();
  }, [course]);

  useEffect(() => {
    document.documentElement.lang = language;
    const title =
      language === 'lv'
        ? 'WordyMind — Angļu un latviešu valoda bērniem | Английский и Латышский для детей'
        : 'WordyMind — Английский и Латышский для детей | Angļu un latviešu valoda bērniem';
    document.title = title;

    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_title: title,
        page_location: window.location.href,
      });
    }
  }, [language]);

  useEffect(() => {
    // Initial evaluation for existing progress to award titles and milestones
    const titleResult = evaluateUnlockedTitles();
    setStats(titleResult.updatedStats);
  }, []);

  useEffect(() => {
    if (!unlockedTitleToast) return;
    const timer = setTimeout(() => setUnlockedTitleToast(null), 5000);
    return () => clearTimeout(timer);
  }, [unlockedTitleToast]);

  useEffect(() => {
    if (!bonusRewardToast) return;
    const timer = setTimeout(() => setBonusRewardToast(null), 5000);
    return () => clearTimeout(timer);
  }, [bonusRewardToast]);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    saveStoredLanguage(newLang);
    trackLanguageChange(newLang);
  };

  const handleCourseChange = (newCourse: LearningCourse) => {
    setCourse(newCourse);
    saveStoredCourse(newCourse);
    if (newCourse === 'lv') {
      setLanguage('ru');
      saveStoredLanguage('ru');
    }
    setTopicProgress(loadTopicProgress(newCourse));
    setWordProgress(loadWordProgress(newCourse));
    setExamResults(loadExamResults(newCourse));
    setExamHistory(loadExamHistory(newCourse));
    handleHomeClick();
  };

  const handleToggleGrade = (grade: Grade) => {
    let next: Grade[];
    if (selectedGrades.includes(grade)) {
      if (selectedGrades.length === 1) {
        return; // Always keep at least 1 grade active
      }
      next = selectedGrades.filter((g) => g !== grade);
    } else {
      next = [...selectedGrades, grade].sort((a, b) => a - b) as Grade[];
    }
    setSelectedGrades(next);
    saveStoredGrades(next);
    if (selectedTopic || activeExamGrade) {
      handleHomeClick();
    }
  };

  const handleSelectAllGrades = () => {
    const next: Grade[] = [1, 2, 3];
    setSelectedGrades(next);
    saveStoredGrades(next);
    if (selectedTopic || activeExamGrade) {
      handleHomeClick();
    }
  };

  const topicStarsSum = useMemo(() => {
    return Object.values(topicProgress).reduce(
      (sum, tp) => sum + (tp.stars || 0),
      0
    );
  }, [topicProgress]);

  const totalEarnedStars = Math.max(stats.totalStarsEarned || 0, topicStarsSum);
  const availableStars = Math.max(0, totalEarnedStars - (stats.spentStars || 0));

  const handleUpdateStats = (newStats: UserStats) => {
    setStats(newStats);
    saveLocalStats(newStats);
  };

  const handlePurchaseAvatar = (avatarEmoji: string, price: number) => {
    const { success, newStats } = purchaseAvatar(avatarEmoji, price, totalEarnedStars);
    if (success) {
      setStats(newStats);
    }
  };

  const handleSelectAvatar = (avatarEmoji: string) => {
    const newStats = { ...stats, avatar: avatarEmoji };
    setStats(newStats);
    saveLocalStats(newStats);
  };

  const handleRecordWordResult = (wordId: string, isCorrect: boolean) => {
    if (!selectedTopic) return;
    // In flashcards mode, no stars or mastery rewards are recorded
    if (gameMode === 'flashcards') return;

    const { stars: newStars } = recordWordAttempt(
      wordId,
      selectedTopic.topic_id,
      isCorrect,
      selectedTopic.words.length,
      course
    );
    // Reload local progress
    setTopicProgress(loadTopicProgress(course));
    setWordProgress(loadWordProgress(course));
    return newStars;
  };

  const handleGameComplete = (correctCount: number, totalCount: number) => {
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
    const gameStars = correctCount === totalCount ? 3 : correctCount >= Math.ceil(totalCount / 2) ? 2 : 1;
    if (gameMode) {
      trackGameComplete(gameMode, selectedTopic.topic_id, correctCount, gameStars);
      recordGameModePlayed(gameMode, isFlawless);
    }

    // Add stars to user's piggy bank
    let updatedStats = addEarnedStars(gameStars);

    // Topic Mastery Bonus (+25 ⭐ for instructions, +10 ⭐ for >= 15 words, +5 ⭐ for others)
    const mastery = checkAndClaimTopicMasteryBonus(
      selectedTopic.topic_id,
      selectedTopic.words.length,
      course
    );
    if (mastery.claimed) {
      updatedStats = mastery.updatedStats;
      setBonusRewardToast({
        message: `${translations[language].topicMasteryBonusToast} (${selectedTopic.topic_name[language] || selectedTopic.topic_name.ru})`,
        stars: mastery.bonusStars,
      });
    }

    // Word Milestones Bonus
    const msResult = checkAndClaimWordMilestones(course);
    if (msResult.totalBonusStars > 0) {
      updatedStats = msResult.updatedStats;
      setBonusRewardToast({
        message: translations[language].wordMilestoneToast,
        stars: msResult.totalBonusStars,
      });
    }

    // Evaluate Unlocked Titles
    const titleResult = evaluateUnlockedTitles(updatedStats);
    if (titleResult.newlyUnlockedTitles.length > 0) {
      setUnlockedTitleToast(titleResult.newlyUnlockedTitles[0]);
      sounds.playFanfare();
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.4 } });
    }

    setStats(titleResult.updatedStats);

    setCelebration({
      correct: correctCount,
      total: totalCount,
      stars: gameStars,
      isRewardDisabled: false,
    });
  };

  const handleRestartGame = () => {
    setCelebration(null);
    // Keep same topic and gameMode, triggers remount
    const currentMode = gameMode;
    setGameMode(null);
    setTimeout(() => {
      setGameMode(currentMode);
      if (currentMode && selectedTopic) {
        trackGameStart(currentMode, selectedTopic.topic_id);
      }
    }, 50);
  };

  const handleSelectMode = (mode: GameMode) => {
    setGameMode(mode);
    if (selectedTopic) {
      trackGameStart(mode, selectedTopic.topic_id);
    }
  };

  const handleStartExam = (grade: Grade) => {
    setSelectedTopic(null);
    setGameMode(null);
    setCelebration(null);
    setActiveExamGrade(grade);
  };

  const handleExamComplete = (result: ExamResult) => {
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
      setUnlockedTitleToast(titleResult.newlyUnlockedTitles[0]);
      sounds.playFanfare();
      confetti({ particleCount: 90, spread: 90, origin: { y: 0.4 } });
    }
    setStats(titleResult.updatedStats);
  };

  const handleHomeClick = () => {
    setCelebration(null);
    setGameMode(null);
    setSelectedTopic(null);
    setActiveExamGrade(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans pb-12 overflow-x-hidden">
      {/* Top Navigation Bar */}
      <Header
        language={language}
        onLanguageChange={handleLanguageChange}
        course={course}
        stats={stats}
        totalStars={totalEarnedStars}
        availableStars={availableStars}
        isCloudSynced={isCloudSynced}
        onOpenSync={() => setIsSyncModalOpen(true)}
        onOpenShop={() => setIsAvatarShopOpen(true)}
        onOpenStats={() => {
          setStatsInitialTab('overview');
          setIsStatsModalOpen(true);
        }}
        onUpdateStats={handleUpdateStats}
        onHomeClick={handleHomeClick}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Screen: Exam Active */}
        {activeExamGrade !== null && (
          <div className="pt-2">
            <ExamGame
              grade={activeExamGrade}
              topics={examTopics}
              language={language}
              course={course}
              onComplete={handleExamComplete}
              onBack={() => setActiveExamGrade(null)}
            />
          </div>
        )}

        {/* Screen 1: Topic Catalog */}
        {!selectedTopic && activeExamGrade === null && (
          <TopicList
            topics={filteredTopics}
            language={language}
            course={course}
            onCourseChange={handleCourseChange}
            topicProgress={topicProgress}
            selectedGrades={selectedGrades}
            onToggleGrade={handleToggleGrade}
            onSelectAllGrades={handleSelectAllGrades}
            onSelectTopic={(topic) => setSelectedTopic(topic)}
            playerName={stats.playerName}
            avatar={stats.avatar}
            onOpenShop={() => setIsAvatarShopOpen(true)}
            onOpenStats={(tab) => {
              setStatsInitialTab(tab || 'overview');
              setIsStatsModalOpen(true);
            }}
            examResults={examResults}
            onStartExam={handleStartExam}
            equippedTitleId={stats.equippedTitleId}
            onOpenTitles={() => setIsTitleSelectOpen(true)}
          />
        )}

        {/* Screen 2: Mode Selector */}
        {selectedTopic && !gameMode && (
          <GameSelector
            topic={selectedTopic}
            language={language}
            course={course}
            progress={topicProgress[selectedTopic.topic_id]}
            onSelectMode={handleSelectMode}
            onBack={() => setSelectedTopic(null)}
          />
        )}

        {/* Screen 3: Active Game */}
        {selectedTopic && gameMode && (
          <div className="pt-2">
            {gameMode === 'flashcards' && (
              <FlashcardsGame
                key={`${selectedTopic.topic_id}-flashcards`}
                topic={selectedTopic}
                language={language}
                course={course}
                onRecordResult={handleRecordWordResult}
                onComplete={handleGameComplete}
                onBack={() => setGameMode(null)}
              />
            )}

            {gameMode === 'truefalse' && (
              <TrueFalseGame
                key={`${selectedTopic.topic_id}-truefalse`}
                topic={selectedTopic}
                allTopics={filteredTopics}
                language={language}
                course={course}
                onRecordResult={handleRecordWordResult}
                onComplete={handleGameComplete}
                onBack={() => setGameMode(null)}
              />
            )}

            {gameMode === 'balloons' && (
              <BalloonPopGame
                key={`${selectedTopic.topic_id}-balloons`}
                topic={selectedTopic}
                allTopics={filteredTopics}
                language={language}
                course={course}
                onRecordResult={handleRecordWordResult}
                onComplete={handleGameComplete}
                onBack={() => setGameMode(null)}
              />
            )}

            {gameMode === 'builder' && (
              <WordBuilderGame
                key={`${selectedTopic.topic_id}-builder`}
                topic={selectedTopic}
                language={language}
                course={course}
                onRecordResult={handleRecordWordResult}
                onComplete={handleGameComplete}
                onBack={() => setGameMode(null)}
              />
            )}

            {gameMode === 'match' && (
              <MatchPairsGame
                key={`${selectedTopic.topic_id}-match`}
                topic={selectedTopic}
                language={language}
                course={course}
                onRecordResult={handleRecordWordResult}
                onComplete={handleGameComplete}
                onBack={() => setGameMode(null)}
              />
            )}

            {gameMode === 'audio' && (
              <AudioQuizGame
                key={`${selectedTopic.topic_id}-audio`}
                topic={selectedTopic}
                allTopics={filteredTopics}
                language={language}
                course={course}
                onRecordResult={handleRecordWordResult}
                onComplete={handleGameComplete}
                onBack={() => setGameMode(null)}
              />
            )}
          </div>
        )}
      </main>

      {/* Celebration Win Modal */}
      {celebration && (
        <CelebrationModal
          language={language}
          correctCount={celebration.correct}
          totalCount={celebration.total}
          stars={celebration.stars}
          isRewardDisabled={celebration.isRewardDisabled}
          onRestart={handleRestartGame}
          onHome={handleHomeClick}
        />
      )}

      {/* Auth & Cloud Sync Modal */}
      <AuthModal
        language={language}
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        onSyncCompleted={async () => {
          const user = await getCurrentUser();
          setIsCloudSynced(!!user);
          if (user) {
            const userLogin = getCurrentUserLogin(user);
            if (userLogin && userLogin !== 'Player') {
              const currentStats = loadLocalStats();
              saveLocalStats({ ...currentStats, playerName: userLogin });
            }
          }
          setTopicProgress(loadTopicProgress(course));
          setWordProgress(loadWordProgress(course));
          setStats(loadLocalStats());
        }}
      />

      {/* Avatar Shop Modal */}
      <AvatarShopModal
        isOpen={isAvatarShopOpen}
        onClose={() => setIsAvatarShopOpen(false)}
        language={language}
        stats={stats}
        totalStarsEarned={totalEarnedStars}
        onPurchase={handlePurchaseAvatar}
        onSelectAvatar={handleSelectAvatar}
      />

      {/* Progress Statistics Modal */}
      <ProgressStatsModal
        isOpen={isStatsModalOpen}
        onClose={() => setIsStatsModalOpen(false)}
        language={language}
        course={course}
        stats={stats}
        topics={topics}
        topicProgress={topicProgress}
        wordProgress={wordProgress}
        examResults={examResults}
        examHistory={examHistory}
        initialTab={statsInitialTab}
        onSelectTopic={(t) => {
          setSelectedTopic(t);
          setGameMode(null);
          setActiveExamGrade(null);
        }}
        onStartExam={(grade) => {
          handleStartExam(grade);
        }}
      />

      {/* Title Selection & Achievements Modal */}
      <TitleSelectModal
        isOpen={isTitleSelectOpen}
        onClose={() => setIsTitleSelectOpen(false)}
        language={language}
        stats={stats}
        onEquipTitle={(titleId) => {
          const updated = equipTitle(titleId);
          setStats(updated);
        }}
      />

      {/* Floating Toast: Newly Unlocked Title */}
      {unlockedTitleToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce max-w-md w-[92%] p-4 rounded-3xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white shadow-2xl border-2 border-white flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/30 flex items-center justify-center text-3xl shadow-inner shrink-0">
              {unlockedTitleToast.icon}
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider font-extrabold text-amber-950/80">
                {translations[language].titleUnlockedToast}
              </div>
              <div className="font-black text-base leading-tight">
                {unlockedTitleToast.name[language] || unlockedTitleToast.name.ru}
              </div>
            </div>
          </div>
          <button
            onClick={() => setUnlockedTitleToast(null)}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white cursor-pointer shrink-0"
          >
            ✕
          </button>
        </div>
      )}

      {/* Floating Toast: Bonus Stars (Topic Mastery / Word Milestone) */}
      {bonusRewardToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce max-w-md w-[92%] p-4 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-2xl border-2 border-white flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/30 flex items-center justify-center text-3xl shadow-inner shrink-0">
              🎁
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider font-extrabold text-emerald-950/80">
                {bonusRewardToast.message}
              </div>
              <div className="font-black text-base leading-tight flex items-center gap-1">
                <span>+{bonusRewardToast.stars} ⭐ {translations[language].starsAddedToBank}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setBonusRewardToast(null)}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white cursor-pointer shrink-0"
          >
            ✕
          </button>
        </div>
      )}

      {/* PWA "Add to Home Screen" prompt */}
      <PwaInstallPrompt language={language} />
    </div>
  );
};

export default App;
