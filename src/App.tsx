import React, { useState, useEffect, useMemo, Suspense } from 'react';
import rawWordsData from './data/words.json';
import { Topic, Language, GameMode, TopicProgress, UserStats, Grade, WordProgress, LearningCourse, ExamResult } from './types';
import { Header } from './components/Header';
import { TopicList } from './components/TopicList';
import { GameSelector } from './components/GameSelector';
import { PwaInstallPrompt } from './components/PwaInstallPrompt';
import { RewardToastOverlay } from './components/RewardToastOverlay';
import { trackGameStart, trackLanguageChange } from './utils/analytics';
import { useNavigation } from './hooks/useNavigation';
import { useGameRewards } from './hooks/useGameRewards';
import { useCloudSync } from './hooks/useCloudSync';

// Lazy-loaded mini-games and heavy modals for code-splitting
const FlashcardsGame = React.lazy(() =>
  import('./components/games/FlashcardsGame').then((m) => ({ default: m.FlashcardsGame }))
);
const TrueFalseGame = React.lazy(() =>
  import('./components/games/TrueFalseGame').then((m) => ({ default: m.TrueFalseGame }))
);
const BalloonPopGame = React.lazy(() =>
  import('./components/games/BalloonPopGame').then((m) => ({ default: m.BalloonPopGame }))
);
const WordBuilderGame = React.lazy(() =>
  import('./components/games/WordBuilderGame').then((m) => ({ default: m.WordBuilderGame }))
);
const MatchPairsGame = React.lazy(() =>
  import('./components/games/MatchPairsGame').then((m) => ({ default: m.MatchPairsGame }))
);
const AudioQuizGame = React.lazy(() =>
  import('./components/games/AudioQuizGame').then((m) => ({ default: m.AudioQuizGame }))
);
const ExamGame = React.lazy(() =>
  import('./components/games/ExamGame').then((m) => ({ default: m.ExamGame }))
);
const CelebrationModal = React.lazy(() =>
  import('./components/CelebrationModal').then((m) => ({ default: m.CelebrationModal }))
);
const AuthModal = React.lazy(() =>
  import('./components/AuthModal').then((m) => ({ default: m.AuthModal }))
);
const AvatarShopModal = React.lazy(() =>
  import('./components/AvatarShopModal').then((m) => ({ default: m.AvatarShopModal }))
);
const ProgressStatsModal = React.lazy(() =>
  import('./components/ProgressStatsModal').then((m) => ({ default: m.ProgressStatsModal }))
);
const TitleSelectModal = React.lazy(() =>
  import('./components/TitleSelectModal').then((m) => ({ default: m.TitleSelectModal }))
);

const GameLoadingFallback: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-[360px] py-16">
    <div className="w-12 h-12 border-4 border-amber-300 border-t-amber-500 rounded-full animate-spin" />
  </div>
);
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
  purchaseAvatar,
  loadExamResults,
  loadExamHistory,
  equipTitle,
  evaluateUnlockedTitles,
  recordDailyActivity,
} from './services/storage';

import { useTopicCatalog } from './hooks/useTopicCatalog';

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
  const {
    selectedTopic,
    gameMode,
    activeExamGrade,
    isGameActive,
    selectTopic,
    selectMode,
    startExam,
    navigateToHome,
    goBack,
  } = useNavigation(topics, course, language);
  const [gameSessionId, setGameSessionId] = useState(0);
  const [examResults, setExamResults] = useState<Record<number, ExamResult>>(() =>
    loadExamResults(getStoredCourse())
  );
  const [examHistory, setExamHistory] = useState<ExamResult[]>(() =>
    loadExamHistory(getStoredCourse())
  );
  const [statsInitialTab, setStatsInitialTab] = useState<'overview' | 'exams' | 'topics' | 'practice' | 'awards'>('overview');
  const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);
  const [isAvatarShopOpen, setIsAvatarShopOpen] = useState<boolean>(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState<boolean>(false);
  const [isTitleSelectOpen, setIsTitleSelectOpen] = useState<boolean>(false);
  const [wordProgress, setWordProgress] = useState<Record<string, WordProgress>>(() =>
    loadWordProgress(getStoredCourse())
  );
  const { isCloudSynced, reloadAllFromLocal, handleManualSyncComplete } = useCloudSync({
    course,
    isGameActive,
    setTopicProgress,
    setWordProgress,
    setExamResults,
    setExamHistory,
    setStats,
  });
  const {
    celebration,
    setCelebration,
    currentToast,
    dismissToast,
    handleGameComplete: onGameComplete,
    handleExamComplete,
  } = useGameRewards(course, language, stats, setStats, setExamResults, setExamHistory);

  const { filteredTopics, examTopics } = useTopicCatalog({
    topics,
    selectedGrades,
    activeExamGrade,
  });



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
    // Record daily attendance and streak on startup
    const dailyStats = recordDailyActivity();
    // Initial evaluation for existing progress to award titles and milestones
    const titleResult = evaluateUnlockedTitles(dailyStats);
    setStats(titleResult.updatedStats);
  }, []);


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
    reloadAllFromLocal(newCourse);
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
    const next: Grade[] = [1, 2, 3, 4];
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
    onGameComplete(selectedTopic, gameMode, correctCount, totalCount);
  };

  const handleRestartGame = () => {
    setCelebration(null);
    setGameSessionId((prev) => prev + 1);
    if (gameMode && selectedTopic) {
      trackGameStart(gameMode, selectedTopic.topic_id);
    }
  };

  const handleSelectMode = (mode: GameMode) => {
    selectMode(mode);
    if (selectedTopic) {
      trackGameStart(mode, selectedTopic.topic_id);
    }
  };

  const handleStartExam = (grade: Grade) => {
    setCelebration(null);
    startExam(grade);
  };


  const handleHomeClick = () => {
    if (navigateToHome(language)) {
      setCelebration(null);
    }
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
        isGameActive={isGameActive}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Screen: Exam Active */}
        {activeExamGrade !== null && (
          <div className="pt-2">
            <Suspense fallback={<GameLoadingFallback />}>
              <ExamGame
                key={`exam-${activeExamGrade}-${course}`}
                grade={activeExamGrade}
                topics={examTopics}
                language={language}
                course={course}
                onComplete={handleExamComplete}
                onBack={() => goBack(language)}
              />
            </Suspense>
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
            onSelectTopic={selectTopic}
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
            onBack={() => goBack(language)}
          />
        )}

        {/* Screen 3: Active Game */}
        {selectedTopic && gameMode && (
          <div className="pt-2">
            <Suspense fallback={<GameLoadingFallback />}>
              {gameMode === 'flashcards' && (
                <FlashcardsGame
                  key={`${selectedTopic.topic_id}-flashcards-${gameSessionId}`}
                  topic={selectedTopic}
                  language={language}
                  course={course}
                  onRecordResult={handleRecordWordResult}
                  onComplete={handleGameComplete}
                  onBack={() => goBack(language)}
                />
              )}

              {gameMode === 'truefalse' && (
                <TrueFalseGame
                  key={`${selectedTopic.topic_id}-truefalse-${gameSessionId}`}
                  topic={selectedTopic}
                  allTopics={filteredTopics}
                  language={language}
                  course={course}
                  onRecordResult={handleRecordWordResult}
                  onComplete={handleGameComplete}
                  onBack={() => goBack(language)}
                />
              )}

              {gameMode === 'balloons' && (
                <BalloonPopGame
                  key={`${selectedTopic.topic_id}-balloons-${gameSessionId}`}
                  topic={selectedTopic}
                  allTopics={filteredTopics}
                  language={language}
                  course={course}
                  onRecordResult={handleRecordWordResult}
                  onComplete={handleGameComplete}
                  onBack={() => goBack(language)}
                />
              )}

              {gameMode === 'builder' && (
                <WordBuilderGame
                  key={`${selectedTopic.topic_id}-builder-${gameSessionId}`}
                  topic={selectedTopic}
                  language={language}
                  course={course}
                  onRecordResult={handleRecordWordResult}
                  onComplete={handleGameComplete}
                  onBack={() => goBack(language)}
                />
              )}

              {gameMode === 'match' && (
                <MatchPairsGame
                  key={`${selectedTopic.topic_id}-match-${gameSessionId}`}
                  topic={selectedTopic}
                  language={language}
                  course={course}
                  onRecordResult={handleRecordWordResult}
                  onComplete={handleGameComplete}
                  onBack={() => goBack(language)}
                />
              )}

              {gameMode === 'audio' && (
                <AudioQuizGame
                  key={`${selectedTopic.topic_id}-audio-${gameSessionId}`}
                  topic={selectedTopic}
                  allTopics={filteredTopics}
                  language={language}
                  course={course}
                  onRecordResult={handleRecordWordResult}
                  onComplete={handleGameComplete}
                  onBack={() => goBack(language)}
                />
              )}
            </Suspense>
          </div>
        )}
      </main>

      {/* Lazy-loaded Modals */}
      <Suspense fallback={null}>
        {celebration && (
          <CelebrationModal
            language={language}
            correctCount={celebration.correct}
            totalCount={celebration.total}
            stars={celebration.stars}
            maxStars={celebration.maxStars}
            isRewardDisabled={celebration.isRewardDisabled}
            isMiniTopicPractice={celebration.isMiniTopicPractice}
            isFirstClear={celebration.isFirstClear}
            isRepeatClear={celebration.isRepeatClear}
            isFailedThreshold={celebration.isFailedThreshold}
            onRestart={handleRestartGame}
            onHome={handleHomeClick}
          />
        )}

        {isSyncModalOpen && (
          <AuthModal
            language={language}
            isOpen={isSyncModalOpen}
            onClose={() => setIsSyncModalOpen(false)}
            onSyncCompleted={handleManualSyncComplete}
          />
        )}

        {isAvatarShopOpen && (
          <AvatarShopModal
            isOpen={isAvatarShopOpen}
            onClose={() => setIsAvatarShopOpen(false)}
            language={language}
            stats={stats}
            totalStarsEarned={totalEarnedStars}
            onPurchase={handlePurchaseAvatar}
            onSelectAvatar={handleSelectAvatar}
          />
        )}

        {isStatsModalOpen && (
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
              selectTopic(t);
              setIsStatsModalOpen(false);
            }}
            onStartExam={(grade) => {
              handleStartExam(grade);
              setIsStatsModalOpen(false);
            }}
          />
        )}

        {isTitleSelectOpen && (
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
        )}
      </Suspense>

      {/* Floating Toast Overlay with Queue Support */}
      <RewardToastOverlay
        toast={currentToast}
        onDismiss={dismissToast}
        language={language}
      />

      {/* PWA "Add to Home Screen" prompt */}
      <PwaInstallPrompt language={language} />
    </div>
  );
};

export default App;
