import React, { useState, useEffect, useMemo, Suspense } from 'react';
import rawWordsData from './data/words.json';
import { Topic, Word, Language, GameMode, TopicProgress, UserStats, Grade, WordProgress, LearningCourse, ExamResult, ExamPart } from './types';
import { Header } from './components/Header';
import { TopicList, ContentTab } from './components/TopicList';
import { GameSelector } from './components/GameSelector';
import { PwaInstallPrompt } from './components/PwaInstallPrompt';
import { RewardToastOverlay } from './components/RewardToastOverlay';
import { trackGameStart, trackExamStart, trackLanguageChange } from './utils/analytics';
import { isTopicExtra } from './utils/i18n';
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
const TopicTestGame = React.lazy(() =>
  import('./components/games/TopicTestGame').then((m) => ({ default: m.TopicTestGame }))
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
const GrammarGame = React.lazy(() =>
  import('./components/games/GrammarGame').then((m) => ({ default: m.GrammarGame }))
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
  purchaseVictoryItem,
  equipVictoryItem,
  loadExamResults,
  loadExamHistory,
  equipTitle,
  evaluateUnlockedTitles,
  recordDailyActivity,
  loadGrammarProgress,
  addEarnedStars,
  GrammarTopicProgress,
} from './services/storage';
import { GrammarTopic } from './data/grammarData';

import { useTopicCatalog } from './hooks/useTopicCatalog';

const MISTAKES_TOPIC_ID = 'mistakes_review';

export const App: React.FC = () => {
  const topics = rawWordsData as Topic[];

  // App State
  const initialCourse: LearningCourse = (() => {
    const storedCourse = getStoredCourse();
    const storedLang = getStoredLanguage();
    if (storedCourse === 'en' && storedLang === 'lv') return 'en-lv';
    return storedCourse;
  })();
  const [course, setCourse] = useState<LearningCourse>(initialCourse);
  const [language, setLanguage] = useState<Language>(() => getStoredLanguage());
  const [selectedGrades, setSelectedGrades] = useState<Grade[]>(getStoredGrades());
  const [stats, setStats] = useState<UserStats>(loadLocalStats());
  const [topicProgress, setTopicProgress] = useState<Record<string, TopicProgress>>(() =>
    loadTopicProgress(initialCourse)
  );
  const {
    selectedTopic,
    setSelectedTopic,
    gameMode,
    activeExamGrade,
    activeExamPart,
    isGameActive,
    selectTopic,
    selectTopicWithMode,
    selectMode,
    startExam,
    navigateToHome,
    goBack,
  } = useNavigation(topics, course, language);
  const [gameSessionId, setGameSessionId] = useState(0);
  const [examResults, setExamResults] = useState<Record<string | number, ExamResult>>(() =>
    loadExamResults(initialCourse)
  );
  const [examHistory, setExamHistory] = useState<ExamResult[]>(() =>
    loadExamHistory(initialCourse)
  );
  const [statsInitialTab, setStatsInitialTab] = useState<'overview' | 'exams' | 'topics' | 'practice' | 'awards'>('overview');
  const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);
  const [isAvatarShopOpen, setIsAvatarShopOpen] = useState<boolean>(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState<boolean>(false);
  const [isTitleSelectOpen, setIsTitleSelectOpen] = useState<boolean>(false);
  const [wordProgress, setWordProgress] = useState<Record<string, WordProgress>>(() =>
    loadWordProgress(initialCourse)
  );
  const [activeGrammarTopic, setActiveGrammarTopic] = useState<GrammarTopic | null>(null);
  const [catalogTab, setCatalogTab] = useState<ContentTab>('main');
  const [grammarProgress, setGrammarProgress] = useState<Record<string, GrammarTopicProgress>>(() =>
    loadGrammarProgress(initialCourse)
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

  const { filteredTopics } = useTopicCatalog({
    topics,
    selectedGrades,
    activeExamGrade,
  });

  const mistakesWords = useMemo(() => {
    const wordMap = new Map<string, Word>();
    filteredTopics.forEach((topic) => {
      topic.words.forEach((w) => {
        wordMap.set(w.id, w);
      });
    });

    const list: { word: Word; timesWrong: number }[] = [];
    Object.entries(wordProgress).forEach(([wordId, wp]) => {
      if ((wp.timesWrong || 0) > 0 && !wp.isLearned) {
        const w = wordMap.get(wordId);
        if (w) {
          list.push({ word: w, timesWrong: wp.timesWrong || 0 });
        }
      }
    });
    list.sort((a, b) => b.timesWrong - a.timesWrong);
    return list.map((item) => item.word);
  }, [filteredTopics, wordProgress]);

  const buildMistakesTopic = (wordsList: Word[]): Topic => ({
    topic_id: MISTAKES_TOPIC_ID,
    topic_name: {
      ru: 'Работа над ошибками',
      lv: 'Kļūdu labošana',
      en: 'Mistakes Review',
    },
    emoji: '🎯',
    words: wordsList,
  });

  const currentTopic = useMemo(() => {
    if (!selectedTopic) return null;
    if (selectedTopic.topic_id === MISTAKES_TOPIC_ID) {
      return gameMode ? selectedTopic : buildMistakesTopic(mistakesWords);
    }
    return filteredTopics.find((t) => t.topic_id === selectedTopic.topic_id) || selectedTopic;
  }, [selectedTopic, filteredTopics, gameMode, mistakesWords]);

  useEffect(() => {
    if (selectedTopic?.topic_id === MISTAKES_TOPIC_ID && !gameMode && mistakesWords.length === 0) {
      navigateToHome(language);
    }
  }, [selectedTopic, gameMode, mistakesWords.length, navigateToHome, language]);

  // Keep catalogTab synchronized with the selected topic (extra vs main)
  useEffect(() => {
    if (selectedTopic && selectedTopic.topic_id !== MISTAKES_TOPIC_ID) {
      const isExtra = isTopicExtra(selectedTopic.topic_id, selectedGrades);
      setCatalogTab(isExtra ? 'extra' : 'main');
    }
  }, [selectedTopic, selectedGrades]);



  useEffect(() => {
    document.documentElement.lang = language;
    const title =
      language === 'lv'
        ? 'WordyMind — Angļu un latviešu valoda bērniem | Английский и Латышский для детей'
        : 'WordyMind — Английский и Латышский для детей | Angļu un latviešu valoda bērniem';
    document.title = title;
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
    if (course === 'en' || course === 'en-lv') {
      const nextCourse: LearningCourse = newLang === 'lv' ? 'en-lv' : 'en';
      if (nextCourse !== course) {
        setCourse(nextCourse);
        saveStoredCourse(nextCourse);
        reloadAllFromLocal(nextCourse);
      }
    }
    trackLanguageChange(newLang);
  };

  const handleCourseChange = (newCourse: LearningCourse) => {
    setCourse(newCourse);
    saveStoredCourse(newCourse);
    if (newCourse === 'en-lv' && language !== 'lv') {
      setLanguage('lv');
      saveStoredLanguage('lv');
    } else if (newCourse === 'en' && language !== 'ru') {
      setLanguage('ru');
      saveStoredLanguage('ru');
    }
    reloadAllFromLocal(newCourse);
    setGrammarProgress(loadGrammarProgress(newCourse));
    setActiveGrammarTopic(null);
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

  const handlePurchaseVictoryItem = (type: 'animation' | 'music', id: string, price: number) => {
    const { success, newStats } = purchaseVictoryItem(type, id, price, totalEarnedStars);
    if (success) {
      setStats(newStats);
    }
  };

  const handleEquipVictoryItem = (type: 'animation' | 'music', id: string) => {
    const newStats = equipVictoryItem(type, id);
    setStats(newStats);
  };

  const handleRecordWordResult = (wordId: string, isCorrect: boolean) => {
    if (!currentTopic) return;
    // In flashcards mode, no stars or mastery rewards are recorded
    if (gameMode === 'flashcards') return;

    const isMistakesReview = currentTopic.topic_id === MISTAKES_TOPIC_ID;
    let targetTopicId = currentTopic.topic_id;
    let targetTopicWordsCount = currentTopic.words.length;

    if (isMistakesReview) {
      const wp = wordProgress[wordId];
      const originalTopic =
        topics.find((t) => t.topic_id === wp?.topic_id) ||
        topics.find((t) => t.words.some((w) => w.id === wordId));
      if (originalTopic) {
        targetTopicId = originalTopic.topic_id;
        targetTopicWordsCount = originalTopic.words.length;
      }
    }

    const { stars: newStars } = recordWordAttempt(
      wordId,
      targetTopicId,
      isCorrect,
      targetTopicWordsCount,
      course,
      isMistakesReview
    );
    // Reload local progress
    setTopicProgress(loadTopicProgress(course));
    setWordProgress(loadWordProgress(course));
    return newStars;
  };

  const handleGameComplete = (correctCount: number, totalCount: number) => {
    onGameComplete(currentTopic, gameMode, correctCount, totalCount);
  };

  const handleBackToGames = () => {
    setCelebration(null);
    setGameSessionId((prev) => prev + 1);
    if (selectedTopic?.topic_id === MISTAKES_TOPIC_ID) {
      if (mistakesWords.length === 0) {
        navigateToHome(language);
        return;
      }
      setSelectedTopic(buildMistakesTopic(mistakesWords));
    }
    selectMode(null);
  };

  const handleStartMistakesTest = () => {
    if (mistakesWords.length === 0) return;
    setCelebration(null);
    setGameSessionId((prev) => prev + 1);
    const mTopic = buildMistakesTopic(mistakesWords);
    selectTopicWithMode(mTopic, 'test');
    trackGameStart('test', MISTAKES_TOPIC_ID, 'Работа над ошибками', course);
  };

  const handleOpenMistakesGames = () => {
    if (mistakesWords.length === 0) return;
    setCelebration(null);
    const mTopic = buildMistakesTopic(mistakesWords);
    selectTopic(mTopic);
  };

  const handleSelectMode = (mode: GameMode) => {
    selectMode(mode);
    if (currentTopic) {
      trackGameStart(mode, currentTopic.topic_id, currentTopic.topic_name.ru, course);
    }
  };

  const handleStartExam = (grade: Grade, part: ExamPart = 'final') => {
    setCelebration(null);
    startExam(grade, part);
    trackExamStart(grade, course);
  };


  const handleSelectGrammarTopic = (topic: GrammarTopic) => {
    setCatalogTab('grammar');
    setGameSessionId((prev) => prev + 1);
    setActiveGrammarTopic(topic);
  };

  const handleGrammarComplete = (topicId: string, earnedStars: number) => {
    if (earnedStars > 0) {
      const prevStars = grammarProgress[topicId]?.stars || 0;
      const starsDiff = Math.max(0, earnedStars - prevStars);
      if (starsDiff > 0) {
        setStats(addEarnedStars(starsDiff));
      }
    }
    setGrammarProgress(loadGrammarProgress(course));
  };

  const handleHomeClick = () => {
    setActiveGrammarTopic(null);
    setCatalogTab('main');
    if (navigateToHome(language)) {
      setCelebration(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] flex flex-col font-sans pb-12 overflow-x-hidden">
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
        isGameActive={isGameActive || activeGrammarTopic !== null}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Screen: Exam Active */}
        {activeExamGrade !== null && (
          <div className="pt-2">
            <Suspense fallback={<GameLoadingFallback />}>
              <ExamGame
                key={`exam-${activeExamGrade}-${activeExamPart}-${course}`}
                grade={activeExamGrade}
                part={activeExamPart}
                topics={topics}
                language={language}
                course={course}
                onComplete={handleExamComplete}
                onBack={() => goBack(language)}
              />
            </Suspense>
          </div>
        )}

        {/* Screen: Grammar Game Active */}
        {activeGrammarTopic !== null && (
          <div className="pt-2">
            <Suspense fallback={<GameLoadingFallback />}>
              <GrammarGame
                key={`${activeGrammarTopic.id}-${gameSessionId}`}
                topic={activeGrammarTopic}
                language={language}
                course={course}
                onComplete={handleGrammarComplete}
                onBack={() => setActiveGrammarTopic(null)}
              />
            </Suspense>
          </div>
        )}

        {/* Screen 1: Topic Catalog */}
        {!selectedTopic && activeExamGrade === null && activeGrammarTopic === null && (
          <TopicList
            topics={filteredTopics}
            allTopics={topics}
            language={language}
            course={course}
            onCourseChange={handleCourseChange}
            onLanguageChange={handleLanguageChange}
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
            mistakesCount={mistakesWords.length}
            onStartMistakesTest={handleStartMistakesTest}
            onOpenMistakesGames={handleOpenMistakesGames}
            onSelectGrammarTopic={handleSelectGrammarTopic}
            grammarProgress={grammarProgress}
            activeTab={catalogTab}
            onTabChange={setCatalogTab}
          />
        )}

        {/* Screen 2: Mode Selector */}
        {currentTopic && !gameMode && (
          <GameSelector
            topic={currentTopic}
            language={language}
            course={course}
            progress={topicProgress[currentTopic.topic_id]}
            onSelectMode={handleSelectMode}
            onBack={() => goBack(language)}
          />
        )}

        {/* Screen 3: Active Game */}
        {currentTopic && gameMode && (
          <div className="pt-2">
            <Suspense fallback={<GameLoadingFallback />}>
              {gameMode === 'flashcards' && (
                <FlashcardsGame
                  key={`${currentTopic.topic_id}-flashcards-${gameSessionId}`}
                  topic={currentTopic}
                  language={language}
                  course={course}
                  onRecordResult={handleRecordWordResult}
                  onComplete={handleGameComplete}
                  onBack={() => goBack(language)}
                />
              )}

              {gameMode === 'truefalse' && (
                <TrueFalseGame
                  key={`${currentTopic.topic_id}-truefalse-${gameSessionId}`}
                  topic={currentTopic}
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
                  key={`${currentTopic.topic_id}-balloons-${gameSessionId}`}
                  topic={currentTopic}
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
                  key={`${currentTopic.topic_id}-builder-${gameSessionId}`}
                  topic={currentTopic}
                  language={language}
                  course={course}
                  onRecordResult={handleRecordWordResult}
                  onComplete={handleGameComplete}
                  onBack={() => goBack(language)}
                />
              )}

              {gameMode === 'match' && (
                <MatchPairsGame
                  key={`${currentTopic.topic_id}-match-${gameSessionId}`}
                  topic={currentTopic}
                  language={language}
                  course={course}
                  onRecordResult={handleRecordWordResult}
                  onComplete={handleGameComplete}
                  onBack={() => goBack(language)}
                />
              )}

              {gameMode === 'audio' && (
                <AudioQuizGame
                  key={`${currentTopic.topic_id}-audio-${gameSessionId}`}
                  topic={currentTopic}
                  allTopics={filteredTopics}
                  language={language}
                  course={course}
                  onRecordResult={handleRecordWordResult}
                  onComplete={handleGameComplete}
                  onBack={() => goBack(language)}
                />
              )}

              {gameMode === 'test' && (
                <TopicTestGame
                  key={`${currentTopic.topic_id}-test-${gameSessionId}`}
                  topic={currentTopic}
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
            victoryMusic={stats.equippedVictoryMusic || 'classic'}
            victoryAnimation={stats.equippedVictoryAnimation || 'confetti'}
            onBackToGames={handleBackToGames}
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
            onPurchaseAnimation={(id, price) => handlePurchaseVictoryItem('animation', id, price)}
            onEquipAnimation={(id) => handleEquipVictoryItem('animation', id)}
            onPurchaseMusic={(id, price) => handlePurchaseVictoryItem('music', id, price)}
            onEquipMusic={(id) => handleEquipVictoryItem('music', id)}
          />
        )}

        {isStatsModalOpen && (
          <ProgressStatsModal
            isOpen={isStatsModalOpen}
            onClose={() => setIsStatsModalOpen(false)}
            language={language}
            course={course}
            stats={stats}
            topics={filteredTopics}
            topicProgress={topicProgress}
            wordProgress={wordProgress}
            examResults={examResults}
            examHistory={examHistory}
            initialTab={statsInitialTab}
            onSelectTopic={(t) => {
              selectTopic(t);
              setIsStatsModalOpen(false);
            }}
            onStartExam={(grade, part) => {
              handleStartExam(grade, part);
              setIsStatsModalOpen(false);
            }}
            onStartMistakesTest={() => {
              setIsStatsModalOpen(false);
              handleStartMistakesTest();
            }}
            onOpenMistakesGames={() => {
              setIsStatsModalOpen(false);
              handleOpenMistakesGames();
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
