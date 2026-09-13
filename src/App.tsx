import React, { useState, useEffect, useMemo } from 'react';
import rawWordsData from './data/words.json';
import { Topic, Language, GameMode, TopicProgress, UserStats, GradeFilter } from './types';
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
import {
  getStoredLanguage,
  saveStoredLanguage,
  getStoredGradeFilter,
  saveStoredGradeFilter,
  loadLocalStats,
  saveLocalStats,
  loadTopicProgress,
  recordWordAttempt,
  mergeWithCloud,
} from './services/storage';
import { getCurrentUser } from './services/supabase';

export const App: React.FC = () => {
  const topics = rawWordsData as Topic[];

  // App State
  const [language, setLanguage] = useState<Language>(getStoredLanguage());
  const [selectedGrade, setSelectedGrade] = useState<GradeFilter>(getStoredGradeFilter());
  const [stats, setStats] = useState<UserStats>(loadLocalStats());
  const [topicProgress, setTopicProgress] = useState<Record<string, TopicProgress>>(
    loadTopicProgress()
  );
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [isCloudSynced, setIsCloudSynced] = useState<boolean>(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);

  // Grade filtered topics: supports 1st only, 2nd only, or all together
  const filteredTopics = useMemo(() => {
    return topics
      .map((topic) => ({
        ...topic,
        words: topic.words.filter((w) => {
          const g = w.grade || 1;
          if (selectedGrade === '1') return g === 1;
          if (selectedGrade === '2') return g === 2;
          if (selectedGrade === '3') return g === 3;
          return true; // 'all': includes all grades (1, 2, 3)
        }),
      }))
      .filter((topic) => topic.words.length > 0);
  }, [topics, selectedGrade]);

  // Celebration state
  const [celebration, setCelebration] = useState<{
    correct: number;
    total: number;
    stars: number;
  } | null>(null);

  // Initialize and check cloud sync
  useEffect(() => {
    const initSync = async () => {
      const user = await getCurrentUser();
      setIsCloudSynced(!!user);
      if (user) {
        await mergeWithCloud();
        setTopicProgress(loadTopicProgress());
        setStats(loadLocalStats());
      }
    };
    initSync();
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    saveStoredLanguage(newLang);
  };

  const handleGradeChange = (newGrade: GradeFilter) => {
    setSelectedGrade(newGrade);
    saveStoredGradeFilter(newGrade);
    if (selectedTopic) {
      handleHomeClick();
    }
  };

  const handleUpdateStats = (newStats: UserStats) => {
    setStats(newStats);
    saveLocalStats(newStats);
  };

  const handleRecordWordResult = (wordId: string, isCorrect: boolean) => {
    if (!selectedTopic) return;
    const { stars: newStars } = recordWordAttempt(
      wordId,
      selectedTopic.topic_id,
      isCorrect,
      selectedTopic.words.length
    );
    // Reload local progress
    setTopicProgress(loadTopicProgress());
    return newStars;
  };

  const handleGameComplete = (correctCount: number, totalCount: number) => {
    if (!selectedTopic) return;
    const currentProg = topicProgress[selectedTopic.topic_id];
    const stars = currentProg?.stars || (correctCount === totalCount ? 3 : correctCount >= totalCount / 2 ? 2 : 1);

    setCelebration({
      correct: correctCount,
      total: totalCount,
      stars,
    });
  };

  const handleRestartGame = () => {
    setCelebration(null);
    // Keep same topic and gameMode, triggers remount
    const currentMode = gameMode;
    setGameMode(null);
    setTimeout(() => {
      setGameMode(currentMode);
    }, 50);
  };

  const handleHomeClick = () => {
    setCelebration(null);
    setGameMode(null);
    setSelectedTopic(null);
  };

  const totalStars = Object.values(topicProgress).reduce(
    (sum, tp) => sum + (tp.stars || 0),
    0
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans pb-12">
      {/* Top Navigation Bar */}
      <Header
        language={language}
        onLanguageChange={handleLanguageChange}
        selectedGrade={selectedGrade}
        onGradeChange={handleGradeChange}
        stats={stats}
        totalStars={totalStars}
        isCloudSynced={isCloudSynced}
        onOpenSync={() => setIsSyncModalOpen(true)}
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
            selectedGrade={selectedGrade}
            onGradeChange={handleGradeChange}
            onSelectTopic={(topic) => setSelectedTopic(topic)}
            playerName={stats.playerName}
            avatar={stats.avatar}
          />
        )}

        {/* Screen 2: Mode Selector */}
        {selectedTopic && !gameMode && (
          <GameSelector
            topic={selectedTopic}
            language={language}
            progress={topicProgress[selectedTopic.topic_id]}
            onSelectMode={(mode) => setGameMode(mode)}
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
          setStats(loadLocalStats());
        }}
      />

      {/* PWA "Add to Home Screen" prompt */}
      <PwaInstallPrompt language={language} />
    </div>
  );
};

export default App;
