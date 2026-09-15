import React, { useState, useEffect, useMemo } from 'react';
import rawWordsData from './data/words.json';
import { Topic, Language, GameMode, TopicProgress, UserStats, Grade, WordProgress } from './types';
import { Header } from './components/Header';
import { TopicList } from './components/TopicList';
import { GameSelector } from './components/GameSelector';
import { FlashcardsGame } from './components/games/FlashcardsGame';
import { TrueFalseGame } from './components/games/TrueFalseGame';
import { BalloonPopGame } from './components/games/BalloonPopGame';
import { WordBuilderGame } from './components/games/WordBuilderGame';
import { MatchPairsGame } from './components/games/MatchPairsGame';
import { AudioQuizGame } from './components/games/AudioQuizGame';
import { CelebrationModal } from './components/CelebrationModal';
import { AuthModal } from './components/AuthModal';
import { PwaInstallPrompt } from './components/PwaInstallPrompt';
import { AvatarShopModal } from './components/AvatarShopModal';
import { ProgressStatsModal } from './components/ProgressStatsModal';
import { trackGameStart, trackGameComplete, trackLanguageChange } from './utils/analytics';
import {
  getStoredLanguage,
  saveStoredLanguage,
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
} from './services/storage';
import { getCurrentUser } from './services/supabase';

const GRADE_2_TOPIC_ORDER: string[] = [
  'food_and_drink',
  'fruit_and_vegetables',
  'garden',
  'body',
  'face',
  'abilities',
  'clothes',
  'hair',
  'family',
  'at_home',
  'rooms',
  'building_materials',
  'days_of_the_week',
  'actions',
];

export const App: React.FC = () => {
  const topics = rawWordsData as Topic[];

  // App State
  const [language, setLanguage] = useState<Language>(() => getStoredLanguage());
  const [selectedGrades, setSelectedGrades] = useState<Grade[]>(getStoredGrades());
  const [stats, setStats] = useState<UserStats>(loadLocalStats());
  const [topicProgress, setTopicProgress] = useState<Record<string, TopicProgress>>(
    loadTopicProgress()
  );
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [isCloudSynced, setIsCloudSynced] = useState<boolean>(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);
  const [isAvatarShopOpen, setIsAvatarShopOpen] = useState<boolean>(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState<boolean>(false);
  const [wordProgress, setWordProgress] = useState<Record<string, WordProgress>>(() =>
    loadWordProgress()
  );

  // Grade filtered topics: supports multi-selection of grades (e.g. [1, 2], [2, 3], [1], [2], [3], [1, 2, 3])
  const filteredTopics = useMemo(() => {
    const gradesSet = new Set(selectedGrades);
    const result = topics
      .map((topic) => ({
        ...topic,
        words: topic.words.filter((w) => {
          const g = (w.grade || 1) as Grade;
          return gradesSet.has(g);
        }),
      }))
      .filter((topic) => topic.words.length > 0);

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

    return result;
  }, [topics, selectedGrades]);

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
        await mergeWithCloud();
        setTopicProgress(loadTopicProgress());
        setWordProgress(loadWordProgress());
        setStats(loadLocalStats());
      }
    };
    initSync();
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    saveStoredLanguage(newLang);
    trackLanguageChange(newLang);
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
    if (selectedTopic) {
      handleHomeClick();
    }
  };

  const handleSelectAllGrades = () => {
    const next: Grade[] = [1, 2, 3];
    setSelectedGrades(next);
    saveStoredGrades(next);
    if (selectedTopic) {
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
      selectedTopic.words.length
    );
    // Reload local progress
    setTopicProgress(loadTopicProgress());
    setWordProgress(loadWordProgress());
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

    const gameStars = correctCount === totalCount ? 3 : correctCount >= Math.ceil(totalCount / 2) ? 2 : 1;
    if (gameMode) {
      trackGameComplete(gameMode, selectedTopic.topic_id, correctCount, gameStars);
    }

    // Add stars to user's piggy bank
    const updatedStats = addEarnedStars(gameStars);
    setStats(updatedStats);

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

  const handleHomeClick = () => {
    setCelebration(null);
    setGameMode(null);
    setSelectedTopic(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans pb-12 overflow-x-hidden">
      {/* Top Navigation Bar */}
      <Header
        language={language}
        onLanguageChange={handleLanguageChange}
        selectedGrades={selectedGrades}
        onToggleGrade={handleToggleGrade}
        onSelectAllGrades={handleSelectAllGrades}
        stats={stats}
        totalStars={totalEarnedStars}
        availableStars={availableStars}
        isCloudSynced={isCloudSynced}
        onOpenSync={() => setIsSyncModalOpen(true)}
        onOpenShop={() => setIsAvatarShopOpen(true)}
        onOpenStats={() => setIsStatsModalOpen(true)}
        onUpdateStats={handleUpdateStats}
        onHomeClick={handleHomeClick}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Screen 1: Topic Catalog */}
        {!selectedTopic && (
          <TopicList
            topics={filteredTopics}
            language={language}
            topicProgress={topicProgress}
            selectedGrades={selectedGrades}
            onToggleGrade={handleToggleGrade}
            onSelectAllGrades={handleSelectAllGrades}
            onSelectTopic={(topic) => setSelectedTopic(topic)}
            playerName={stats.playerName}
            avatar={stats.avatar}
            onOpenShop={() => setIsAvatarShopOpen(true)}
            onOpenStats={() => setIsStatsModalOpen(true)}
          />
        )}

        {/* Screen 2: Mode Selector */}
        {selectedTopic && !gameMode && (
          <GameSelector
            topic={selectedTopic}
            language={language}
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
          setTopicProgress(loadTopicProgress());
          setWordProgress(loadWordProgress());
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
        stats={stats}
        topics={topics}
        topicProgress={topicProgress}
        wordProgress={wordProgress}
        onSelectTopic={(t) => {
          setSelectedTopic(t);
          setGameMode(null);
        }}
      />

      {/* PWA "Add to Home Screen" prompt */}
      <PwaInstallPrompt language={language} />
    </div>
  );
};

export default App;
