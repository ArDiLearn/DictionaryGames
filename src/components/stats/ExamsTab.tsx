import React, { useState, useMemo } from 'react';
import { Language, Grade, ExamResult } from '../../types';
import { translations } from '../../utils/i18n';
import { sounds } from '../../utils/soundEffects';
import {
  GraduationCap,
  Trophy,
  Target,
  Star,
  Clock,
  ChevronRight,
} from 'lucide-react';

interface ExamsTabProps {
  language: Language;
  examResults?: Record<number, ExamResult>;
  examHistory?: ExamResult[];
  onStartExam?: (grade: Grade) => void;
  onClose: () => void;
}

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

export const ExamsTab: React.FC<ExamsTabProps> = ({
  language,
  examResults,
  examHistory,
  onStartExam,
  onClose,
}) => {
  const t = translations[language];
  const s = t.statsModal;

  const [examHistoryGradeFilter, setExamHistoryGradeFilter] = useState<number | 'all'>('all');

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

  return (
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
  );
};
