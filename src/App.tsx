import React, { useState, useEffect, useMemo } from 'react';
import rawWordsData from './data/words.json';
import { Topic, Language, GameMode, TopicProgress, UserStats, Grade, WordProgress, LearningCourse, ExamResult } from './types';
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
import { trackGameStart, trackLanguageChange } from './utils/analytics';
import { translations } from './utils/i18n';
import { useNavigation } from './hooks/useNavigation';
import { useGameRewards } from './hooks/useGameRewards';
import { useCloudSync } from './hooks/useCloudSync';
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
    setSelectedTopic,
    setGameMode,
    setActiveExamGrade,
    navigateToHome,
  } = useNavigation();
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
    unlockedTitleToast,
    setUnlockedTitleToast,
    bonusRewardToast,
    setBonusRewardToast,
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
    // Initial evaluation for existing progress to award titles and milestones
    const titleResult = evaluateUnlockedTitles();
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
    onGameComplete(selectedTopic, gameMode, correctCount, totalCount);
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
        onSyncCompleted={handleManualSyncComplete}
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
