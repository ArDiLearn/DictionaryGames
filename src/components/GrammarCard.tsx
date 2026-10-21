import React from 'react';
import { GrammarTopic } from '../data/grammarData';
import { Language, LearningCourse } from '../types';
import { sounds } from '../utils/soundEffects';
import { CheckCircle2 } from 'lucide-react';

interface GrammarCardProps {
  topic: GrammarTopic;
  language: Language;
  course?: LearningCourse;
  stars?: number;
  onSelect: (topic: GrammarTopic) => void;
}

const COLOR_MAP: Record<string, { bg: string; border: string; shadow: string; bar: string }> = {
  indigo: { bg: 'bg-indigo-50/85', border: 'border-indigo-300 hover:border-indigo-400', shadow: 'shadow-indigo-100/70', bar: 'bg-gradient-to-r from-indigo-400 to-indigo-600' },
  purple: { bg: 'bg-purple-50/85', border: 'border-purple-300 hover:border-purple-400', shadow: 'shadow-purple-100/70', bar: 'bg-gradient-to-r from-purple-400 to-purple-600' },
  sky: { bg: 'bg-sky-50/85', border: 'border-sky-300 hover:border-sky-400', shadow: 'shadow-sky-100/70', bar: 'bg-gradient-to-r from-sky-400 to-blue-600' },
  amber: { bg: 'bg-amber-50/90', border: 'border-amber-300 hover:border-amber-400', shadow: 'shadow-amber-100/70', bar: 'bg-gradient-to-r from-amber-400 to-orange-500' },
  pink: { bg: 'bg-pink-50/85', border: 'border-pink-300 hover:border-pink-400', shadow: 'shadow-pink-100/70', bar: 'bg-gradient-to-r from-pink-400 to-rose-500' },
  emerald: { bg: 'bg-emerald-50/85', border: 'border-emerald-300 hover:border-emerald-400', shadow: 'shadow-emerald-100/70', bar: 'bg-gradient-to-r from-emerald-400 to-teal-600' },
  orange: { bg: 'bg-orange-50/90', border: 'border-orange-300 hover:border-orange-400', shadow: 'shadow-orange-100/70', bar: 'bg-gradient-to-r from-orange-400 to-amber-500' },
  blue: { bg: 'bg-blue-50/85', border: 'border-blue-300 hover:border-blue-400', shadow: 'shadow-blue-100/70', bar: 'bg-gradient-to-r from-blue-400 to-indigo-600' },
  teal: { bg: 'bg-teal-50/85', border: 'border-teal-300 hover:border-teal-400', shadow: 'shadow-teal-100/70', bar: 'bg-gradient-to-r from-teal-400 to-cyan-600' },
  lime: { bg: 'bg-lime-50/85', border: 'border-lime-300 hover:border-lime-400', shadow: 'shadow-lime-100/70', bar: 'bg-gradient-to-r from-lime-400 to-emerald-500' },
  yellow: { bg: 'bg-yellow-50/90', border: 'border-yellow-300 hover:border-yellow-400', shadow: 'shadow-yellow-100/70', bar: 'bg-gradient-to-r from-yellow-400 to-amber-500' },
  rose: { bg: 'bg-rose-50/85', border: 'border-rose-300 hover:border-rose-400', shadow: 'shadow-rose-100/70', bar: 'bg-gradient-to-r from-rose-400 to-pink-500' },
  green: { bg: 'bg-green-50/85', border: 'border-green-300 hover:border-green-400', shadow: 'shadow-green-100/70', bar: 'bg-gradient-to-r from-green-400 to-emerald-600' },
  violet: { bg: 'bg-violet-50/85', border: 'border-violet-300 hover:border-violet-400', shadow: 'shadow-violet-100/70', bar: 'bg-gradient-to-r from-violet-400 to-purple-600' },
  cyan: { bg: 'bg-cyan-50/85', border: 'border-cyan-300 hover:border-cyan-400', shadow: 'shadow-cyan-100/70', bar: 'bg-gradient-to-r from-cyan-400 to-teal-500' },
  fuchsia: { bg: 'bg-fuchsia-50/85', border: 'border-fuchsia-300 hover:border-fuchsia-400', shadow: 'shadow-fuchsia-100/70', bar: 'bg-gradient-to-r from-fuchsia-400 to-pink-600' },
  stone: { bg: 'bg-stone-50/90', border: 'border-stone-300 hover:border-stone-400', shadow: 'shadow-stone-100/70', bar: 'bg-gradient-to-r from-stone-400 to-amber-600' },
  red: { bg: 'bg-red-50/85', border: 'border-red-300 hover:border-red-400', shadow: 'shadow-red-100/70', bar: 'bg-gradient-to-r from-red-400 to-rose-600' },
};

function getQuestionsPlural(count: number, language: Language): string {
  if (language === 'lv') {
    return count % 10 === 1 && count % 100 !== 11 ? 'jautājums' : 'jautājumi';
  }
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return 'вопрос';
  }
  if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
    return 'вопроса';
  }
  return 'вопросов';
}

const _GrammarCard: React.FC<GrammarCardProps> = ({
  topic,
  language,
  stars = 0,
  onSelect,
}) => {
  const title = topic.title[language] || topic.title.ru;
  const description = topic.description[language] || topic.description.ru;
  const isMix = topic.id.endsWith('_mix');
  const questionCount = isMix ? 10 : topic.questions.length;
  const colorScheme = COLOR_MAP[topic.color || 'emerald'] || COLOR_MAP.emerald;
  const isAllMastered = stars >= 3;

  return (
    <button
      onClick={() => {
        sounds.playClick();
        onSelect(topic);
      }}
      className={`group relative flex flex-col justify-between p-4 sm:p-5 rounded-3xl transition-all duration-300 cursor-pointer text-left ${colorScheme.bg} border-4 ${colorScheme.border} hover:shadow-xl hover:${colorScheme.shadow} hover:-translate-y-1.5 active:translate-y-0 active:scale-[0.98] ${
        isAllMastered ? 'ring-2 ring-emerald-400 ring-offset-2' : ''
      }`}
    >
      {/* Top row: Emoji Box and Badges / Stars */}
      <div className="flex items-start justify-between mb-3 gap-2">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/90 border-2 border-white/80 shadow-xs flex items-center justify-center text-3xl sm:text-4xl group-hover:scale-110 transition-all">
          {topic.emoji || '📝'}
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-black bg-white/85 text-slate-700 px-2 py-0.5 rounded-full border border-slate-200/90 shadow-2xs">
              {topic.grade} {language === 'lv' ? 'kl.' : 'кл.'}
            </span>
          </div>

          {/* Stars display */}
          <div className="flex items-center gap-0.5 bg-white/85 border-2 border-amber-200/90 px-2 py-0.5 rounded-2xl shadow-2xs">
            {[1, 2, 3].map((starIndex) => (
              <span
                key={starIndex}
                className={`text-base sm:text-lg transition-transform ${
                  starIndex <= stars
                    ? 'text-amber-400 scale-100'
                    : 'text-slate-300 opacity-60 scale-90'
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Center: Title & Description */}
      <div className="mb-4">
        <h3 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight leading-tight group-hover:text-slate-950 transition-colors">
          {title}
        </h3>
        {description && (
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 line-clamp-2">
            {description}
          </p>
        )}
      </div>

      {/* Bottom row: Question count and progress bar */}
      <div className="w-full pt-2 border-t-2 border-slate-200/60">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1.5">
          <span>
            {questionCount} {getQuestionsPlural(questionCount, language)}
          </span>
          {isAllMastered ? (
            <span className="flex items-center gap-1 text-emerald-600 font-extrabold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {language === 'lv' ? 'Apgūts' : 'Освоено'}
            </span>
          ) : (
            <span>
              {stars}/3 {language === 'lv' ? 'zvaigznes' : 'звёзды'}
            </span>
          )}
        </div>

        {/* Progress bar */}
        <div className="w-full h-2.5 bg-white/80 rounded-full overflow-hidden border border-slate-200/80">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              isAllMastered ? 'bg-emerald-500' : colorScheme.bar
            }`}
            style={{ width: `${Math.round((stars / 3) * 100)}%` }}
          />
        </div>
      </div>
    </button>
  );
};

export const GrammarCard = React.memo(_GrammarCard);
