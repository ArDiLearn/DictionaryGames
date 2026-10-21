import React from 'react';
import { Grade, Language, LearningCourse, ExamResult, ExamPart } from '../types';
import { translations } from '../utils/i18n';
import { ExamDefinition, getExamTotalQuestionsCount } from '../data/exams';
import { sounds } from '../utils/soundEffects';
import { Play, RotateCcw, BarChart3, BookOpen } from 'lucide-react';

interface ExamCardProps {
  grade: Grade;
  part?: ExamPart;
  examDef?: ExamDefinition;
  availableGrades?: Grade[];
  onSelectGradeTab?: (grade: Grade) => void;
  language: Language;
  course: LearningCourse;
  topicsCount?: number;
  wordsCount?: number;
  result?: ExamResult;
  onStart: (grade: Grade, part?: ExamPart) => void;
  onOpenStats?: () => void;
}

function getQuestionsCountText(count: number, lang: Language): string {
  if (lang === 'lv') {
    const isOne = count % 10 === 1 && count % 100 !== 11;
    return `~${count} ${isOne ? 'jautājums' : 'jautājumi'}`;
  }
  const last10 = count % 10;
  const last100 = count % 100;
  if (last10 === 1 && last100 !== 11) {
    return `~${count} вопрос`;
  }
  if ([2, 3, 4].includes(last10) && ![12, 13, 14].includes(last100)) {
    return `~${count} вопроса`;
  }
  return `~${count} вопросов`;
}

const _ExamCard: React.FC<ExamCardProps> = ({
  grade,
  part = 'final',
  examDef,
  language,
  course,
  result,
  onStart,
  onOpenStats,
}) => {
  const t = translations[language];

  const partType = examDef?.part || part;
  const isFinal = partType === 'final';
  const isPart1 = partType === 'part1';

  // Theming based on part type
  const theme = isFinal
    ? {
        cardBg: 'from-amber-50 via-yellow-50 to-orange-50 border-amber-300 hover:border-amber-400 shadow-amber-100/70',
        badgeBg: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
        iconBg: 'from-amber-400 to-yellow-300 border-amber-200 text-amber-950',
        icon: '🏆',
        pillBorder: 'border-amber-300/80 bg-amber-100/90 text-amber-900',
        btnGrad: 'from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600',
      }
    : isPart1
    ? {
        cardBg: 'from-sky-50 via-indigo-50/50 to-blue-50 border-sky-300 hover:border-sky-400 shadow-sky-100/70',
        badgeBg: 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white',
        iconBg: 'from-sky-400 to-indigo-300 border-sky-200 text-sky-950',
        icon: '📘',
        pillBorder: 'border-sky-300/80 bg-sky-100/90 text-sky-900',
        btnGrad: 'from-sky-500 via-blue-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700',
      }
    : {
        cardBg: 'from-emerald-50 via-teal-50/50 to-green-50 border-emerald-300 hover:border-emerald-400 shadow-emerald-100/70',
        badgeBg: 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white',
        iconBg: 'from-emerald-400 to-teal-300 border-emerald-200 text-emerald-950',
        icon: '📗',
        pillBorder: 'border-emerald-300/80 bg-emerald-100/90 text-emerald-900',
        btnGrad: 'from-emerald-500 via-teal-500 to-green-600 hover:from-emerald-600 hover:to-green-700',
      };

  const badgeText = examDef
    ? examDef.badge[language]
    : isFinal
    ? language === 'ru' ? 'Итоговая 🏆' : 'Gada darbs 🏆'
    : partType === 'part1'
    ? language === 'ru' ? '1 полугодие' : '1. semestris'
    : language === 'ru' ? '2 полугодие' : '2. semestris';

  const cardTitle = examDef ? examDef.title[language] : `${grade} класс`;
  const cardSubtitle = examDef ? examDef.subtitle[language] : t.exam.cardSubtitle;
  const cardDescription = examDef?.description[language] || '';
  const topicsSummary = examDef?.topicsSummary[language] || '';

  const questionsCount = examDef
    ? getExamTotalQuestionsCount(examDef, course)
    : isFinal ? 32 : 24;

  const handleStart = () => {
    sounds.playClick();
    onStart(grade, partType);
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
    <div
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${theme.cardBg} border-3 shadow-md hover:shadow-xl transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between`}
    >
      <div className="relative z-10 flex flex-col gap-3.5">
        {/* Top Row: Badge + Questions count + Result / Stats button */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-black/5">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-2xs ${theme.badgeBg}`}
            >
              {badgeText}
            </span>

            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full border ${theme.pillBorder}`}
            >
              {getQuestionsCountText(questionsCount, language)}
            </span>
          </div>

          {result ? (
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                if (onOpenStats) onOpenStats();
              }}
              className="flex items-center gap-2 bg-white/95 hover:bg-white active:scale-95 border-2 border-slate-200 hover:border-amber-400 px-3 py-1 rounded-2xl shadow-2xs transition-all cursor-pointer text-left"
              title={t.statsModal.examsViewHistory}
            >
              <span className="text-xl">{cupInfo ? cupInfo.emoji : '⭐'}</span>
              <div>
                <div className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider flex items-center gap-1">
                  <span>{t.exam.bestScoreLabel}</span>
                  <BarChart3 className="w-3 h-3 text-slate-400" />
                </div>
                <div className="flex items-center gap-1.5">
                  {result.gradeMark && (
                    <span className="text-xs font-black text-amber-950 bg-amber-100 px-1 py-0.2 rounded border border-amber-300">
                      {result.gradeMark}
                    </span>
                  )}
                  <span className="text-xs font-black text-slate-800">
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
                className="inline-flex items-center gap-1.5 bg-white/90 hover:bg-white active:scale-95 border border-slate-200 px-2.5 py-1 rounded-2xl text-xs font-bold text-slate-700 transition-all cursor-pointer shadow-2xs"
                title={t.statsModal.examsViewHistory}
              >
                <BarChart3 className="w-3.5 h-3.5 text-slate-500" />
                <span>{t.statsModal.examsStatsBtn}</span>
              </button>
            )
          )}
        </div>

        {/* Middle Section: Title, Subtitle, and Topics List */}
        <div className="flex items-start gap-3.5">
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr ${theme.iconBg} border-2 shadow-inner flex items-center justify-center text-2xl sm:text-3xl shrink-0 select-none`}
          >
            <span>{theme.icon}</span>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-tight">
              {cardTitle}
            </h3>
            <p className="text-xs sm:text-sm font-bold text-slate-600 mt-0.5">
              {cardSubtitle}
            </p>
            {topicsSummary && (
              <p className="text-[11px] sm:text-xs font-extrabold text-indigo-700/90 mt-1 flex items-center gap-1">
                <BookOpen className="w-3 h-3 inline-block shrink-0" />
                <span>{topicsSummary}</span>
              </p>
            )}
            {cardDescription && (
              <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                {cardDescription}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Section: Action Button */}
        <div className="pt-2 mt-auto">
          <button
            onClick={handleStart}
            className={`w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-2xl font-black text-sm sm:text-base text-white bg-gradient-to-r ${theme.btnGrad} active:scale-95 shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap`}
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
