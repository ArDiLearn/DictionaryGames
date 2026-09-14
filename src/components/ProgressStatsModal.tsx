import React, { useState, useMemo, useEffect } from 'react';
import { Topic, Language, UserStats, TopicProgress, WordProgress, Word } from '../types';
import { translations, getWordsPlural } from '../utils/i18n';
import { sounds } from '../utils/soundEffects';
import { speakEnglish } from '../utils/speech';
import {
  X,
  Volume2,
  Trophy,
  Star,
  BookOpen,
  Flame,
  Target,
  CheckCircle2,
  ChevronRight,
  BarChart3,
  Check,
  RotateCcw,
  GraduationCap,
} from 'lucide-react';

interface ProgressStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  stats: UserStats;
  topics: Topic[];
  topicProgress: Record<string, TopicProgress>;
  wordProgress: Record<string, WordProgress>;
  onSelectTopic?: (topic: Topic) => void;
}

type TabType = 'overview' | 'topics' | 'practice' | 'awards';
type TopicFilter = 'all' | 'completed' | 'inprogress' | 'notstarted';

export const ProgressStatsModal: React.FC<ProgressStatsModalProps> = ({
  isOpen,
  onClose,
  language,
  stats,
  topics,
  topicProgress,
  wordProgress,
  onSelectTopic,
}) => {
  const t = translations[language];
  const s = t.statsModal;

  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [topicFilter, setTopicFilter] = useState<TopicFilter>('all');

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Calculations
  const allWords = useMemo(() => topics.flatMap((tp) => tp.words), [topics]);
  const totalWordsCount = allWords.length;

  // Mastered words count
  const masteredWordIds = useMemo(() => {
    const set = new Set<string>();
    Object.values(topicProgress).forEach((tp) => {
      (tp.masteredWordIds || []).forEach((id) => set.add(id));
    });
    return set;
  }, [topicProgress]);

  const totalMasteredCount = masteredWordIds.size;
  const overallPercent = totalWordsCount > 0 ? Math.round((totalMasteredCount / totalWordsCount) * 100) : 0;

  // Total stars
  const topicStarsSum = useMemo(() => {
    return Object.values(topicProgress).reduce((acc, tp) => acc + (tp.stars || 0), 0);
  }, [topicProgress]);
  const totalEarnedStars = Math.max(stats.totalStarsEarned || 0, topicStarsSum);

  // Topics completed (3 stars or all mastered)
  const completedTopicsCount = useMemo(() => {
    return topics.filter((topic) => {
      const tp = topicProgress[topic.topic_id];
      if (!tp) return false;
      if ((tp.stars || 0) >= 3) return true;
      const topicWordIds = new Set(topic.words.map((w) => w.id));
      const mastered = (tp.masteredWordIds || []).filter((id) => topicWordIds.has(id)).length;
      return topic.words.length > 0 && mastered >= topic.words.length;
    }).length;
  }, [topics, topicProgress]);

  // Grade Breakdown
  const gradeStats = useMemo(() => {
    return [1, 2, 3].map((grade) => {
      const gWords = allWords.filter((w) => w.grade === grade);
      const gMastered = gWords.filter((w) => masteredWordIds.has(w.id)).length;
      const gTotal = gWords.length;
      const gPercent = gTotal > 0 ? Math.round((gMastered / gTotal) * 100) : 0;
      return {
        grade,
        mastered: gMastered,
        total: gTotal,
        percent: gPercent,
      };
    });
  }, [allWords, masteredWordIds]);

  // Accuracy stats
  const { totalCorrect, totalWrong, totalAttempts, accuracyRate } = useMemo(() => {
    let correct = 0;
    let wrong = 0;
    Object.values(wordProgress).forEach((wp) => {
      correct += wp.timesCorrect || 0;
      wrong += wp.timesWrong || 0;
    });
    const total = correct + wrong;
    const rate = total > 0 ? Math.round((correct / total) * 100) : 100;
    return {
      totalCorrect: correct,
      totalWrong: wrong,
      totalAttempts: total,
      accuracyRate: rate,
    };
  }, [wordProgress]);

  // Words that need practice (mistakes > 0 and (wrong >= correct or not learned))
  const wordsToPractice = useMemo(() => {
    const wordMap = new Map<string, { word: Word; topic: Topic }>();
    topics.forEach((topic) => {
      topic.words.forEach((word) => {
        wordMap.set(word.id, { word, topic });
      });
    });

    const list: { word: Word; topic: Topic; wp: WordProgress }[] = [];
    Object.entries(wordProgress).forEach(([wordId, wp]) => {
      if ((wp.timesWrong || 0) > 0 && !wp.isLearned) {
        const item = wordMap.get(wordId);
        if (item) {
          list.push({ word: item.word, topic: item.topic, wp });
        }
      }
    });

    // Sort by most mistakes descending
    list.sort((a, b) => (b.wp.timesWrong || 0) - (a.wp.timesWrong || 0));
    return list.slice(0, 15);
  }, [topics, wordProgress]);

  // Topics with filter
  const filteredTopicsList = useMemo(() => {
    return topics.filter((topic) => {
      const tp = topicProgress[topic.topic_id];
      const stars = tp?.stars || 0;
      const topicWordIds = new Set(topic.words.map((w) => w.id));
      const mastered = (tp?.masteredWordIds || []).filter((id) =>
        topicWordIds.has(id)
      ).length;
      const total = topic.words.length;
      const isCompleted = stars >= 3 || (total > 0 && mastered >= total);
      const isNotStarted = stars === 0 && mastered === 0;

      if (topicFilter === 'completed') return isCompleted;
      if (topicFilter === 'inprogress') return !isCompleted && !isNotStarted;
      if (topicFilter === 'notstarted') return isNotStarted;
      return true;
    });
  }, [topics, topicProgress, topicFilter]);

  // Achievements evaluation
  const achievements = useMemo(() => {
    const items = [
      {
        id: 'firstWord',
        icon: '🥇',
        title: s.achievements.firstWord.title,
        desc: s.achievements.firstWord.desc,
        unlocked: totalMasteredCount >= 1,
        progress: `${Math.min(totalMasteredCount, 1)} / 1`,
      },
      {
        id: 'tenWords',
        icon: '🔟',
        title: s.achievements.tenWords.title,
        desc: s.achievements.tenWords.desc,
        unlocked: totalMasteredCount >= 10,
        progress: `${Math.min(totalMasteredCount, 10)} / 10`,
      },
      {
        id: 'starCollector',
        icon: '🌟',
        title: s.achievements.starCollector.title,
        desc: s.achievements.starCollector.desc,
        unlocked: totalEarnedStars >= 25,
        progress: `${Math.min(totalEarnedStars, 25)} / 25 ⭐`,
      },
      {
        id: 'fiftyWords',
        icon: '📚',
        title: s.achievements.fiftyWords.title,
        desc: s.achievements.fiftyWords.desc,
        unlocked: totalMasteredCount >= 50,
        progress: `${Math.min(totalMasteredCount, 50)} / 50`,
      },
      {
        id: 'topicMaster',
        icon: '💯',
        title: s.achievements.topicMaster.title,
        desc: s.achievements.topicMaster.desc,
        unlocked: completedTopicsCount >= 1,
        progress: `${Math.min(completedTopicsCount, 1)} / 1 🏆`,
      },
      {
        id: 'streakMaster',
        icon: '🔥',
        title: s.achievements.streakMaster.title,
        desc: s.achievements.streakMaster.desc,
        unlocked: (stats.streak || 1) >= 3,
        progress: `${Math.min(stats.streak || 1, 3)} / 3 📅`,
      },
    ];
    return items;
  }, [s, totalMasteredCount, totalEarnedStars, completedTopicsCount, stats.streak]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border-4 border-indigo-200 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden animate-scale-up">
        {/* Modal Header */}
        <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-5 sm:px-7 py-4 sm:py-5 text-white flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-2xl sm:text-3xl shadow-inner">
              <span>{stats.avatar || '🦁'}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">{s.title}</h2>
                <span className="bg-white/20 text-white font-extrabold text-xs px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                  {stats.playerName || t.defaultPlayerName}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white/85 font-medium mt-0.5 hidden xs:block">
                {s.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white/20 hover:bg-white/30 active:scale-95 text-white flex items-center justify-center transition-transform cursor-pointer"
            title={s.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100/90 border-b-2 border-slate-200 px-3 sm:px-6 py-2 flex items-center gap-1.5 sm:gap-2 shrink-0 overflow-x-auto scrollbar-none">
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('overview');
            }}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-sm scale-105'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>{s.tabOverview}</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('topics');
            }}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeTab === 'topics'
                ? 'bg-indigo-600 text-white shadow-sm scale-105'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{s.tabTopics}</span>
            <span className="text-[10px] bg-indigo-100 text-indigo-800 px-1.5 py-0.2 rounded-full font-bold ml-0.5">
              {completedTopicsCount}/{topics.length}
            </span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('practice');
            }}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeTab === 'practice'
                ? 'bg-indigo-600 text-white shadow-sm scale-105'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>{s.tabPractice}</span>
            {wordsToPractice.length > 0 && (
              <span className="text-[10px] bg-rose-500 text-white px-1.5 py-0.2 rounded-full font-bold ml-0.5">
                {wordsToPractice.length}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('awards');
            }}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeTab === 'awards'
                ? 'bg-indigo-600 text-white shadow-sm scale-105'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>{s.tabAwards}</span>
            <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full font-bold ml-0.5">
              {achievements.filter((a) => a.unlocked).length}/{achievements.length}
            </span>
          </button>
        </div>

        {/* Modal Body with smooth scrolling */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              {/* Key 4 Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* 1. Words Learned */}
                <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between shadow-xs">
                  <div className="flex items-center justify-between text-indigo-600 mb-2">
                    <span className="text-xs sm:text-sm font-extrabold">{s.wordsLearned}</span>
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-indigo-950">
                      {totalMasteredCount}
                      <span className="text-xs sm:text-sm text-indigo-400 font-bold ml-1">
                        / {totalWordsCount}
                      </span>
                    </div>
                    <div className="mt-2 w-full h-2 bg-indigo-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                        style={{ width: `${overallPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Stars Earned */}
                <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between shadow-xs">
                  <div className="flex items-center justify-between text-amber-600 mb-2">
                    <span className="text-xs sm:text-sm font-extrabold">{s.starsEarned}</span>
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-amber-950 flex items-center gap-1">
                      <span>{totalEarnedStars}</span>
                      <span className="text-base text-amber-400">⭐</span>
                    </div>
                    <p className="text-[11px] font-bold text-amber-700/80 mt-1">
                      {t.myStarBalance}: {Math.max(0, totalEarnedStars - (stats.spentStars || 0))} ⭐
                    </p>
                  </div>
                </div>

                {/* 3. Topics Completed */}
                <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between shadow-xs">
                  <div className="flex items-center justify-between text-emerald-600 mb-2">
                    <span className="text-xs sm:text-sm font-extrabold">{s.topicsCompleted}</span>
                    <Trophy className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-950">
                      {completedTopicsCount}
                      <span className="text-xs sm:text-sm text-emerald-400 font-bold ml-1">
                        / {topics.length}
                      </span>
                    </div>
                    <div className="mt-2 w-full h-2 bg-emerald-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                        style={{ width: `${topics.length > 0 ? (completedTopicsCount / topics.length) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Streak */}
                <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between shadow-xs">
                  <div className="flex items-center justify-between text-rose-600 mb-2">
                    <span className="text-xs sm:text-sm font-extrabold">{s.dayStreak}</span>
                    <Flame className="w-5 h-5 text-rose-500 fill-rose-500" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-rose-950 flex items-center gap-1">
                      <span>{stats.streak || 1}</span>
                      <span className="text-xs sm:text-sm font-bold text-rose-500">
                        {s.streakDays}
                      </span>
                    </div>
                    <p className="text-[11px] font-bold text-rose-700/80 mt-1">
                      {stats.streak > 1 ? '🔥 Не сбавляй темп!' : '🌟 Отличное начало!'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress by Grades */}
              <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-base sm:text-lg font-black text-slate-800">
                    {s.gradeBreakdownTitle}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {gradeStats.map(({ grade, mastered, total, percent }) => (
                    <div
                      key={grade}
                      className="bg-white border-2 border-slate-200/80 rounded-2xl p-3.5 shadow-xs flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-black uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                          {grade === 1 ? t.grade1 : grade === 2 ? t.grade2 : t.grade3}
                        </span>
                        <span className="text-xs font-black text-slate-500">{percent}%</span>
                      </div>
                      <div className="text-lg font-black text-slate-800">
                        {mastered}{' '}
                        <span className="text-xs font-bold text-slate-400">
                          / {total} {getWordsPlural(total, language)}
                        </span>
                      </div>
                      <div className="mt-2 w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            percent === 100
                              ? 'bg-emerald-500'
                              : percent > 50
                              ? 'bg-indigo-500'
                              : 'bg-amber-400'
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accuracy & Learning Rate */}
              <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-800">{s.accuracyTitle}</h3>
                    <p className="text-xs font-bold text-slate-500">
                      {s.totalAnswers}: {totalAttempts} ({s.correctAnswers}:{' '}
                      <span className="text-emerald-600">{totalCorrect}</span>, {s.wrongAnswers}:{' '}
                      <span className="text-rose-500">{totalWrong}</span>)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-white border-2 border-indigo-200 px-4 py-2 rounded-2xl shadow-xs">
                  <span className="text-2xl sm:text-3xl font-black text-indigo-700">
                    {accuracyRate}%
                  </span>
                  <span className="text-xs font-extrabold text-indigo-500 uppercase tracking-wider">
                    {s.accuracyRate}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TOPICS BREAKDOWN */}
          {activeTab === 'topics' && (
            <div className="space-y-4 animate-fade-in">
              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {(['all', 'completed', 'inprogress', 'notstarted'] as TopicFilter[]).map((f) => {
                  const label =
                    f === 'all'
                      ? s.filterAll
                      : f === 'completed'
                      ? s.filterCompleted
                      : f === 'inprogress'
                      ? s.filterInProgress
                      : s.filterNotStarted;
                  return (
                    <button
                      key={f}
                      onClick={() => {
                        sounds.playClick();
                        setTopicFilter(f);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer shrink-0 ${
                        topicFilter === f
                          ? 'bg-indigo-600 text-white shadow-xs scale-105'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Topics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {filteredTopicsList.map((topic) => {
                  const tp = topicProgress[topic.topic_id];
                  const stars = tp?.stars || 0;
                  const topicWordIds = new Set(topic.words.map((w) => w.id));
                  const mastered = (tp?.masteredWordIds || []).filter((id) =>
                    topicWordIds.has(id)
                  ).length;
                  const total = topic.words.length;
                  const percent = total > 0 ? Math.round((mastered / total) * 100) : 0;
                  const isCompleted = stars >= 3 || (total > 0 && mastered >= total);
                  const title =
                    topic.topic_name[language] || topic.topic_name.en || topic.topic_id;

                  return (
                    <div
                      key={topic.topic_id}
                      onClick={() => {
                        if (onSelectTopic) {
                          sounds.playClick();
                          onSelectTopic(topic);
                          onClose();
                        }
                      }}
                      className="group bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-indigo-400 p-3 rounded-2xl transition-all shadow-xs flex items-center justify-between gap-3 cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-2xl sm:text-3xl shrink-0 group-hover:scale-110 transition-transform">
                          {topic.emoji || '📚'}
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-black text-slate-800 text-sm truncate">{title}</h4>
                            {isCompleted && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            )}
                          </div>
                          <p className="text-xs font-semibold text-slate-400 truncate">
                            {topic.topic_name.en} • {mastered}/{total} {getWordsPlural(total, language)} ({percent}%)
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {/* Stars */}
                        <div className="flex items-center">
                          {[1, 2, 3].map((starIdx) => (
                            <span
                              key={starIdx}
                              className={`text-sm ${
                                starIdx <= stars ? 'text-amber-400' : 'text-slate-200'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: PRACTICE (Words with mistakes) */}
          {activeTab === 'practice' && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-3 sm:p-4">
                <h3 className="text-sm sm:text-base font-black text-amber-950">
                  {s.wordsToPracticeTitle}
                </h3>
                <p className="text-xs text-amber-800/80 font-medium mt-0.5">
                  {s.wordsToPracticeSubtitle}
                </p>
              </div>

              {wordsToPractice.length === 0 ? (
                <div className="text-center py-12 px-4 bg-emerald-50 border-2 border-emerald-200 rounded-3xl">
                  <span className="text-4xl mb-2 block">🎉</span>
                  <p className="font-black text-emerald-900 text-base">{s.noWordsToPractice}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {wordsToPractice.map(({ word, topic, wp }) => (
                    <div
                      key={word.id}
                      className="bg-white border-2 border-slate-200 hover:border-indigo-300 p-3 rounded-2xl shadow-xs flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <button
                          onClick={() => {
                            sounds.playClick();
                            speakEnglish(word.en);
                          }}
                          className="w-9 h-9 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-600 flex items-center justify-center shrink-0 cursor-pointer"
                          title={t.listen}
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-black text-slate-900 text-sm">{word.en}</h4>
                            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded truncate max-w-[120px]">
                              {topic.emoji || '📚'} {topic.topic_name[language] || topic.topic_name.ru}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-slate-500 truncate">
                            {word[language] || word.ru}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[11px] bg-rose-100 text-rose-700 font-black px-2 py-0.5 rounded-lg" title={s.wrongAnswers}>
                          -{wp.timesWrong} {s.timesWrongLabel}
                        </span>
                        <span className="text-[11px] bg-emerald-100 text-emerald-700 font-black px-2 py-0.5 rounded-lg" title={s.correctAnswers}>
                          +{wp.timesCorrect}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: ACHIEVEMENTS & BADGES */}
          {activeTab === 'awards' && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl p-3.5 sm:p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-black text-amber-950">
                    {s.achievementsTitle}
                  </h3>
                  <p className="text-xs text-amber-800/80 font-medium mt-0.5">
                    {s.achievementsSubtitle}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xl sm:text-2xl font-black text-amber-900">
                    {achievements.filter((a) => a.unlocked).length} / {achievements.length}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {achievements.map((ach) => (
                  <div
                    key={ach.id}
                    className={`p-3.5 rounded-2xl border-2 transition-all flex items-start gap-3 ${
                      ach.unlocked
                        ? 'bg-amber-50/70 border-amber-300 shadow-sm'
                        : 'bg-slate-50 border-slate-200 opacity-60'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                        ach.unlocked
                          ? 'bg-amber-100 border border-amber-300 shadow-xs scale-105'
                          : 'bg-slate-200'
                      }`}
                    >
                      {ach.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="font-black text-slate-800 text-sm">{ach.title}</h4>
                        {ach.unlocked ? (
                          <span className="inline-flex items-center text-[10px] font-black bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-md">
                            <Check className="w-3 h-3 mr-0.5" /> OK
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-400 bg-slate-200 px-1.5 py-0.5 rounded-md">
                            {ach.progress}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">{ach.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t-2 border-slate-200 px-4 py-3 sm:px-6 flex items-center justify-end shrink-0">
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-black text-sm shadow-sm transition-all cursor-pointer"
          >
            {s.close}
          </button>
        </div>
      </div>
    </div>
  );
};
