import React, { useState, useMemo, useEffect } from 'react';
import { Topic, Language, UserStats, TopicProgress, WordProgress, Word, LearningCourse, Grade, ExamResult } from '../types';
import { translations, getWordsPlural, getPlayerDisplayName } from '../utils/i18n';
import { sounds } from '../utils/soundEffects';
import { speakWord } from '../utils/speech';
import { AvatarBadge } from './AvatarBadge';
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
  Clock,
} from 'lucide-react';

interface ProgressStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  course?: LearningCourse;
  stats: UserStats;
  topics: Topic[];
  topicProgress: Record<string, TopicProgress>;
  wordProgress: Record<string, WordProgress>;
  examResults?: Record<number, ExamResult>;
  examHistory?: ExamResult[];
  initialTab?: TabType;
  onSelectTopic?: (topic: Topic) => void;
  onStartExam?: (grade: Grade) => void;
}

type TabType = 'overview' | 'exams' | 'topics' | 'practice' | 'awards';
type TopicFilter = 'all' | 'completed' | 'inprogress' | 'notstarted';

function formatExamDate(dateStr: string, lang: Language): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'lv-LV', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateStr;
  }
}

export const ProgressStatsModal: React.FC<ProgressStatsModalProps> = ({
  isOpen,
  onClose,
  language,
  course = 'en',
  stats,
  topics,
  topicProgress,
  wordProgress,
  examResults,
  examHistory,
  initialTab,
  onSelectTopic,
  onStartExam,
}) => {
  const t = translations[language];
  const s = t.statsModal;

  const [activeTab, setActiveTab] = useState<TabType>(initialTab || 'overview');
  const [topicFilter, setTopicFilter] = useState<TopicFilter>('all');
  const [examHistoryGradeFilter, setExamHistoryGradeFilter] = useState<number | 'all'>('all');

  // Sync initial tab when modal opens or initialTab changes
  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

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
    return [1, 2, 3, 4].map((grade) => {
      const gWords = allWords.filter((w) => (w.grade || 1) === grade);
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

  // Exam statistics
  const examHistoryList = useMemo(() => examHistory || [], [examHistory]);
  const examsCount = examHistoryList.length;
  const goldCups = useMemo(
    () => examHistoryList.filter((e) => e.cup === 'gold').length,
    [examHistoryList]
  );
  const silverCups = useMemo(
    () => examHistoryList.filter((e) => e.cup === 'silver').length,
    [examHistoryList]
  );
  const bronzeCups = useMemo(
    () => examHistoryList.filter((e) => e.cup === 'bronze').length,
    [examHistoryList]
  );
  const totalCups = goldCups + silverCups + bronzeCups;
  const avgExamScore = useMemo(() => {
    if (examsCount === 0) return 0;
    return Math.round(
      examHistoryList.reduce((acc, e) => acc + e.scorePercent, 0) / examsCount
    );
  }, [examHistoryList, examsCount]);
  const totalExamStars = useMemo(() => {
    return examHistoryList.reduce((acc, e) => acc + (e.starsEarned || 0), 0);
  }, [examHistoryList]);

  const filteredExamHistory = useMemo(() => {
    if (examHistoryGradeFilter === 'all') return examHistoryList;
    return examHistoryList.filter((e) => e.grade === examHistoryGradeFilter);
  }, [examHistoryList, examHistoryGradeFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border-4 border-indigo-200 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden animate-scale-up">
        {/* Modal Header */}
        <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-5 sm:px-7 py-4 sm:py-5 text-white flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-3 sm:gap-4">
            <AvatarBadge avatar={stats.avatar || '🦁'} size="lg" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">{s.title}</h2>
                <span className="bg-white/20 text-white font-extrabold text-xs px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                  {getPlayerDisplayName(stats.playerName, language)}
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
              setActiveTab('exams');
            }}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeTab === 'exams'
                ? 'bg-indigo-600 text-white shadow-sm scale-105'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>{s.tabExams}</span>
            {examsCount > 0 && (
              <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded-full font-bold ml-0.5">
                {examsCount}
              </span>
            )}
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {gradeStats.map(({ grade, mastered, total, percent }) => (
                    <div
                      key={grade}
                      className="bg-white border-2 border-slate-200/80 rounded-2xl p-3.5 shadow-xs flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-black uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                          {grade === 1 ? t.grade1 : grade === 2 ? t.grade2 : grade === 3 ? t.grade3 : t.grade4}
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

              {/* Exam Summary Widget */}
              <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-4 sm:p-5 shadow-xs">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-300 flex items-center justify-center text-xl shrink-0">
                      🎓
                    </div>
                    <div>
                      <h3 className="text-base font-black text-amber-950">
                        {s.examsOverviewSummary}
                      </h3>
                      <p className="text-xs font-semibold text-amber-800/80">
                        {s.examsCompletedTitle}: <span className="font-black text-amber-950">{examsCount}</span>
                        {examsCount > 0 && ` · ${s.examsAverageScore}: ${avgExamScore}%`}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      sounds.playClick();
                      setActiveTab('exams');
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-black text-xs transition-all shadow-xs cursor-pointer self-stretch sm:self-auto justify-center"
                  >
                    <span>{s.examsViewHistory}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1">
                  {[1, 2, 3].map((g) => {
                    const best = examResults?.[g];
                    const gradeLabel = g === 1 ? t.grade1Short : g === 2 ? t.grade2Short : t.grade3Short;
                    return (
                      <div
                        key={g}
                        className="bg-white/90 border border-amber-200 rounded-xl p-2 sm:p-2.5 flex items-center justify-between shadow-2xs"
                      >
                        <span className="text-xs font-black text-amber-900">{gradeLabel}</span>
                        {best ? (
                          <div className="flex items-center gap-1">
                            <span className="text-sm">
                              {best.cup === 'gold' ? '🏆' : best.cup === 'silver' ? '🥈' : best.cup === 'bronze' ? '🥉' : '⭐'}
                            </span>
                            <span className="text-xs font-black text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                              {best.scorePercent}%
                            </span>
                          </div>
                        ) : (
                          <span className="text-[10px] font-bold text-amber-700/60">—</span>
                        )}
                      </div>
                    );
                  })}
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

          {/* TAB: EXAMS */}
          {activeTab === 'exams' && (
            <div className="space-y-6 animate-fade-in">
              {/* 4 Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* 1. Exams Taken */}
                <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between shadow-xs">
                  <div className="flex items-center justify-between text-amber-700 mb-2">
                    <span className="text-xs sm:text-sm font-extrabold">{s.examsCompletedTitle}</span>
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-amber-950">
                      {examsCount}
                    </div>
                    <p className="text-[11px] font-bold text-amber-800/80 mt-1">
                      {examsCount === 0 ? s.examsNotTakenYet : `🎓 ${examsCount} ${language === 'ru' ? 'работ' : 'darbi'}`}
                    </p>
                  </div>
                </div>

                {/* 2. Cups Collection */}
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between shadow-xs">
                  <div className="flex items-center justify-between text-amber-700 mb-2">
                    <span className="text-xs sm:text-sm font-extrabold">{s.examsCupsTitle}</span>
                    <Trophy className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-amber-950 flex items-center gap-1.5">
                      <span>{totalCups}</span>
                      <span className="text-lg">🏆</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-amber-900/80 mt-1">
                      <span title="Gold">🏆 {goldCups}</span>
                      <span title="Silver">🥈 {silverCups}</span>
                      <span title="Bronze">🥉 {bronzeCups}</span>
                    </div>
                  </div>
                </div>

                {/* 3. Average Score */}
                <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between shadow-xs">
                  <div className="flex items-center justify-between text-emerald-700 mb-2">
                    <span className="text-xs sm:text-sm font-extrabold">{s.examsAverageScore}</span>
                    <Target className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-950">
                      {avgExamScore}%
                    </div>
                    <p className="text-[11px] font-bold text-emerald-700/80 mt-1">
                      {avgExamScore >= 80 ? '🌟 Отлично!' : avgExamScore >= 60 ? '👍 Хорошо' : '📚 Повтори темы'}
                    </p>
                  </div>
                </div>

                {/* 4. Stars from exams */}
                <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between shadow-xs">
                  <div className="flex items-center justify-between text-purple-700 mb-2">
                    <span className="text-xs sm:text-sm font-extrabold">{s.starsEarned}</span>
                    <Star className="w-5 h-5 text-purple-500 fill-purple-400" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-purple-950 flex items-center gap-1">
                      <span>{totalExamStars}</span>
                      <span className="text-base text-amber-400">⭐</span>
                    </div>
                    <p className="text-[11px] font-bold text-purple-700/80 mt-1">
                      {t.starsAddedToBank}
                    </p>
                  </div>
                </div>
              </div>

              {/* Best Results by Grade */}
              <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Trophy className="w-5 h-5 text-amber-600" />
                  <h3 className="text-base sm:text-lg font-black text-slate-800">
                    {s.examsBestByGrade}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[1, 2, 3, 4].map((g) => {
                    const grade = g as Grade;
                    const best = examResults?.[grade];
                    const gradeTitle =
                      grade === 1 ? t.grade1 : grade === 2 ? t.grade2 : grade === 3 ? t.grade3 : t.grade4;
                    return (
                      <div
                        key={grade}
                        className="bg-white border-2 border-slate-200 rounded-2xl p-3.5 shadow-xs flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-black uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-200">
                              {gradeTitle}
                            </span>
                            {best?.cup && (
                              <span className="text-xl">
                                {best.cup === 'gold' ? '🏆' : best.cup === 'silver' ? '🥈' : '🥉'}
                              </span>
                            )}
                          </div>

                          {best ? (
                            <div className="space-y-1">
                              <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-black text-slate-900">
                                  {best.scorePercent}%
                                </span>
                                {best.gradeMark && (
                                  <span className="text-xs font-black bg-amber-500 text-white px-2 py-0.5 rounded-md">
                                    {best.gradeMark}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs font-semibold text-slate-500">
                                {best.correctCount} / {best.totalCount} {language === 'ru' ? 'верно' : 'pareizi'} · +{best.starsEarned} ⭐
                              </p>
                              <p className="text-[10px] font-medium text-slate-400">
                                {formatExamDate(best.completedAt, language)}
                              </p>
                            </div>
                          ) : (
                            <div className="py-2">
                              <p className="text-xs font-bold text-slate-400 italic">
                                {s.examsNotTakenYet}
                              </p>
                            </div>
                          )}
                        </div>

                        {onStartExam && (
                          <button
                            onClick={() => {
                              sounds.playClick();
                              onClose();
                              onStartExam(grade);
                            }}
                            className="mt-3 w-full py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 active:scale-95 border border-amber-300 text-amber-900 font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <span>{best ? t.exam.retryBtn : s.examsStartForGrade}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Chronological History Log */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    <span>{s.examsHistoryTitle}</span>
                  </h3>

                  {/* Grade filter pills for history */}
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                    {(['all', 1, 2, 3, 4] as (number | 'all')[]).map((f) => {
                      const isTab = examHistoryGradeFilter === f;
                      const label =
                        f === 'all'
                          ? s.filterAll
                          : f === 1
                          ? t.grade1Short
                          : f === 2
                          ? t.grade2Short
                          : f === 3
                          ? t.grade3Short
                          : t.grade4Short;
                      return (
                        <button
                          key={f}
                          onClick={() => {
                            sounds.playClick();
                            setExamHistoryGradeFilter(f);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                            isTab
                              ? 'bg-indigo-600 text-white shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {filteredExamHistory.length === 0 ? (
                  <div className="text-center py-10 px-4 bg-amber-50/50 border-2 border-dashed border-amber-200 rounded-3xl">
                    <span className="text-4xl mb-2 block">🎓</span>
                    <p className="font-black text-amber-950 text-base">{s.examsHistoryEmpty}</p>
                    <p className="text-xs font-semibold text-amber-800/80 mt-1 max-w-sm mx-auto">
                      {s.examsHistoryEmptyHint}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredExamHistory.map((item, idx) => {
                      const gradeLabel =
                        item.grade === 1
                          ? t.grade1
                          : item.grade === 2
                          ? t.grade2
                          : item.grade === 3
                          ? t.grade3
                          : t.grade4;
                      const cupEmoji =
                        item.cup === 'gold' ? '🏆' : item.cup === 'silver' ? '🥈' : item.cup === 'bronze' ? '🥉' : '💡';
                      return (
                        <div
                          key={`${item.completedAt}-${idx}`}
                          className="bg-white border-2 border-slate-200 hover:border-amber-300 rounded-2xl p-3 sm:p-3.5 flex items-center justify-between gap-3 shadow-2xs transition-all"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-xl shrink-0">
                              {cupEmoji}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-black uppercase text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md">
                                  {gradeLabel}
                                </span>
                                {item.gradeMark && (
                                  <span className="text-xs font-black bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded-md">
                                    {item.gradeMark}
                                  </span>
                                )}
                                <span className="text-sm font-black text-slate-900">
                                  {item.scorePercent}%
                                </span>
                              </div>
                              <p className="text-xs font-medium text-slate-400 mt-0.5">
                                {formatExamDate(item.completedAt, language)} · {item.correctCount}/{item.totalCount} {language === 'ru' ? 'верно' : 'pareizi'}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-xs font-extrabold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200 flex items-center gap-1">
                              <span>+{item.starsEarned}</span>
                              <span>⭐</span>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
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
                  const isLatvianCourse = course === 'lv';
                  const title = isLatvianCourse
                    ? topic.topic_name.lv || topic.topic_name.en
                    : topic.topic_name[language] || topic.topic_name.en || topic.topic_id;
                  const subtitle = isLatvianCourse ? topic.topic_name.ru : topic.topic_name.en;

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
                            {subtitle} • {mastered}/{total} {getWordsPlural(total, language)} ({percent}%)
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
                  {wordsToPractice.map(({ word, topic, wp }) => {
                    const isLatvianCourse = course === 'lv';
                    const wordTarget = isLatvianCourse ? word.lv : word.en;
                    const wordTranslation = isLatvianCourse ? word.ru : (word[language] || word.ru);
                    const topicTitle = isLatvianCourse
                      ? topic.topic_name.lv || topic.topic_name.ru
                      : topic.topic_name[language] || topic.topic_name.ru;

                    return (
                      <div
                        key={word.id}
                        className="bg-white border-2 border-slate-200 hover:border-indigo-300 p-3 rounded-2xl shadow-xs flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <button
                            onClick={() => {
                              sounds.playClick();
                              speakWord(wordTarget, course);
                            }}
                            className="w-9 h-9 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-600 flex items-center justify-center shrink-0 cursor-pointer"
                            title={t.listen}
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <h4 className="font-black text-slate-900 text-sm">{wordTarget}</h4>
                              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded truncate max-w-[120px]">
                                {topic.emoji || '📚'} {topicTitle}
                              </span>
                            </div>
                            <p className="text-xs font-semibold text-slate-500 truncate">
                              {wordTranslation}
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
                    );
                  })}
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
