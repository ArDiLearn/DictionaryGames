import React, { useMemo } from 'react';
import { Topic, Language, UserStats, TopicProgress, WordProgress, ExamResult } from '../../types';
import { translations, getWordsPlural } from '../../utils/i18n';
import { sounds } from '../../utils/soundEffects';
import {
  BookOpen,
  Star,
  Trophy,
  Flame,
  GraduationCap,
  ChevronRight,
  Target,
} from 'lucide-react';

interface OverviewTabProps {
  language: Language;
  stats: UserStats;
  topics: Topic[];
  topicProgress: Record<string, TopicProgress>;
  wordProgress: Record<string, WordProgress>;
  examResults?: Record<number, ExamResult>;
  examHistory?: ExamResult[];
  onSwitchToExams: () => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  language,
  stats,
  topics,
  topicProgress,
  wordProgress,
  examResults,
  examHistory,
  onSwitchToExams,
}) => {
  const t = translations[language];
  const s = t.statsModal;

  const allWords = useMemo(() => topics.flatMap((tp) => tp.words), [topics]);
  const totalWordsCount = allWords.length;

  const masteredWordIds = useMemo(() => {
    const set = new Set<string>();
    Object.values(topicProgress).forEach((tp) => {
      (tp.masteredWordIds || []).forEach((id) => set.add(id));
    });
    return set;
  }, [topicProgress]);

  const totalMasteredCount = masteredWordIds.size;
  const overallPercent = totalWordsCount > 0 ? Math.round((totalMasteredCount / totalWordsCount) * 100) : 0;

  const topicStarsSum = useMemo(() => {
    return Object.values(topicProgress).reduce((acc, tp) => acc + (tp.stars || 0), 0);
  }, [topicProgress]);
  const totalEarnedStars = Math.max(stats.totalStarsEarned || 0, topicStarsSum);

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

  const examHistoryList = useMemo(() => examHistory || [], [examHistory]);
  const examsCount = examHistoryList.length;
  const avgExamScore = useMemo(() => {
    if (examsCount === 0) return 0;
    return Math.round(
      examHistoryList.reduce((acc, e) => acc + e.scorePercent, 0) / examsCount
    );
  }, [examHistoryList, examsCount]);

  return (
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
              onSwitchToExams();
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
  );
};
