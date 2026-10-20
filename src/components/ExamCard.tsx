import React from 'react';
import { Grade, Language, LearningCourse, ExamResult } from '../types';
import { translations, formatWordsCount, getTopicsPlural, getExamWordsCountForGrade } from '../utils/i18n';
import { sounds } from '../utils/soundEffects';
import { Play, RotateCcw, BarChart3 } from 'lucide-react';

interface ExamCardProps {
  grade: Grade;
  availableGrades?: Grade[];
  onSelectGradeTab?: (grade: Grade) => void;
  language: Language;
  course: LearningCourse;
  topicsCount: number;
  wordsCount?: number;
  result?: ExamResult;
  onStart: (grade: Grade) => void;
  onOpenStats?: () => void;
}

const _ExamCard: React.FC<ExamCardProps> = ({
  grade,
  availableGrades,
  onSelectGradeTab,
  language,
  topicsCount,
  wordsCount,
  result,
  onStart,
  onOpenStats,
}) => {
  const t = translations[language];

  const gradeName = language === 'ru' ? `${grade} класс` : `${grade}. klase`;
  const fullTitle = `${t.exam.cardTitle}: ${gradeName}`;

  const handleStart = () => {
    sounds.playClick();
    onStart(grade);
  };

  const getCupDisplay = (cup: ExamResult['cup']) => {
    switch (cup) {
      case 'gold':
        return { emoji: '🏆', text: t.exam.goldCup };
      case 'silver':
        return { emoji: '🥈', text: t.exam.silverCup };
      case 'bronze':
        return { emoji: '🥉', text: t.exam.bronzeCup };
      default:
        return null;
    }
  };

  const cupInfo = result ? getCupDisplay(result.cup) : null;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-3 border-amber-300 shadow-md hover:shadow-xl transition-all p-5 sm:p-6 mb-6">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-200/50 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-200/40 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-4">
        {/* Top Row: Grade + Topics/Words Count + Statistics */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-amber-200/80">
          <div className="flex flex-wrap items-center gap-2">
            {availableGrades && availableGrades.length > 1 && onSelectGradeTab ? (
              <div className="flex items-center gap-1 bg-amber-200/90 p-1 rounded-2xl border border-amber-300 shadow-inner">
                {availableGrades.map((g) => {
                  const isTabActive = g === grade;
                  const label = language === 'ru' ? `${g} класс` : `${g}. klase`;
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        sounds.playClick();
                        onSelectGradeTab(g);
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        isTabActive
                          ? 'bg-amber-600 text-white shadow-xs scale-105'
                          : 'text-amber-900/80 hover:bg-amber-300/60 hover:text-amber-950'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            ) : (
              <span className="text-xs font-black uppercase tracking-wider bg-amber-500 text-white px-2.5 py-1 rounded-full shadow-xs">
                {gradeName}
              </span>
            )}

            <span className="text-xs font-bold text-amber-800 bg-amber-100/90 px-2.5 py-1 rounded-full border border-amber-200">
              {(() => {
                const effectiveWords = wordsCount || getExamWordsCountForGrade(grade);
                const topicsText = `${topicsCount} ${getTopicsPlural(topicsCount, language)}`;
                const wordsText = formatWordsCount(effectiveWords, language);
                return `${topicsText} · ${wordsText}`;
              })()}
            </span>
          </div>

          {result ? (
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                if (onOpenStats) onOpenStats();
              }}
              className="flex items-center gap-2 bg-white/95 hover:bg-white active:scale-95 border-2 border-amber-200 hover:border-amber-400 px-3 py-1.5 rounded-2xl shadow-xs transition-all cursor-pointer text-left group"
              title={t.statsModal.examsViewHistory}
            >
              <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform">
                {cupInfo ? cupInfo.emoji : '⭐'}
              </span>
              <div>
                <div className="text-[10px] font-extrabold uppercase text-amber-800/70 tracking-wider flex items-center gap-1">
                  <span>{t.exam.bestScoreLabel}</span>
                  <BarChart3 className="w-3 h-3 text-amber-600 opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center gap-1.5">
                  {result.gradeMark && (
                    <span className="text-xs sm:text-sm font-black text-amber-950 bg-amber-100 px-1.5 py-0.5 rounded-lg border border-amber-300">
                      {result.gradeMark}
                    </span>
                  )}
                  <span className="text-xs sm:text-sm font-black text-amber-700">
                    {result.scorePercent}%
                  </span>
                </div>
              </div>
            </button>
          ) : (
            onOpenStats && (
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  onOpenStats();
                }}
                className="inline-flex items-center gap-1.5 bg-white/90 hover:bg-white active:scale-95 border border-amber-300 px-3 py-1.5 rounded-2xl text-xs font-bold text-amber-900 transition-all cursor-pointer shadow-2xs"
                title={t.statsModal.examsViewHistory}
              >
                <BarChart3 className="w-3.5 h-3.5 text-amber-700" />
                <span>{t.statsModal.examsStatsBtn}</span>
              </button>
            )
          )}
        </div>

        {/* Bottom Row: Graduation Cap Icon + Exam Title/Subtitle on left, Start Button on right */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 border-2 border-amber-200 shadow-inner flex items-center justify-center text-3xl sm:text-4xl shrink-0 transition-transform">
              <span>🎓</span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-amber-950 tracking-tight">
                {fullTitle}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-amber-800/80 mt-0.5">
                {t.exam.cardSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={handleStart}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-black text-sm sm:text-base text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 active:scale-95 shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
          >
            {result ? (
              <>
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{t.exam.retryBtn}</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                <span>{t.exam.startBtn}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export const ExamCard = React.memo(_ExamCard);
