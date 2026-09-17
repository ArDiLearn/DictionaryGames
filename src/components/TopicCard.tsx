import React from 'react';
import { Topic, Language, TopicProgress, LearningCourse } from '../types';
import { translations, getWordsPlural } from '../utils/i18n';
import { sounds } from '../utils/soundEffects';
import { CheckCircle2 } from 'lucide-react';

interface TopicCardProps {
  topic: Topic;
  language: Language;
  course?: LearningCourse;
  progress?: TopicProgress;
  onSelect: (topic: Topic) => void;
  hasNewWords?: boolean;
  newWordsCount?: number;
}

const COLOR_MAP: Record<string, { bg: string; border: string; badge: string; shadow: string }> = {
  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200 hover:border-indigo-400', badge: 'bg-indigo-500 text-white', shadow: 'shadow-indigo-100' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200 hover:border-purple-400', badge: 'bg-purple-500 text-white', shadow: 'shadow-purple-100' },
  sky: { bg: 'bg-sky-50', border: 'border-sky-200 hover:border-sky-400', badge: 'bg-sky-500 text-white', shadow: 'shadow-sky-100' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-200 hover:border-amber-400', badge: 'bg-amber-500 text-white', shadow: 'shadow-amber-100' },
  pink: { bg: 'bg-pink-50', border: 'border-pink-200 hover:border-pink-400', badge: 'bg-pink-500 text-white', shadow: 'shadow-pink-100' },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200 hover:border-emerald-400', badge: 'bg-emerald-500 text-white', shadow: 'shadow-emerald-100' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200 hover:border-orange-400', badge: 'bg-orange-500 text-white', shadow: 'shadow-orange-100' },
  blue: { bg: 'bg-blue-50', border: 'border-blue-200 hover:border-blue-400', badge: 'bg-blue-500 text-white', shadow: 'shadow-blue-100' },
  teal: { bg: 'bg-teal-50', border: 'border-teal-200 hover:border-teal-400', badge: 'bg-teal-500 text-white', shadow: 'shadow-teal-100' },
  lime: { bg: 'bg-lime-50', border: 'border-lime-200 hover:border-lime-400', badge: 'bg-lime-500 text-white', shadow: 'shadow-lime-100' },
  yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200 hover:border-yellow-400', badge: 'bg-yellow-500 text-white', shadow: 'shadow-yellow-100' },
  rose: { bg: 'bg-rose-50', border: 'border-rose-200 hover:border-rose-400', badge: 'bg-rose-500 text-white', shadow: 'shadow-rose-100' },
  green: { bg: 'bg-green-50', border: 'border-green-200 hover:border-green-400', badge: 'bg-green-500 text-white', shadow: 'shadow-green-100' },
  violet: { bg: 'bg-violet-50', border: 'border-violet-200 hover:border-violet-400', badge: 'bg-violet-500 text-white', shadow: 'shadow-violet-100' },
  cyan: { bg: 'bg-cyan-50', border: 'border-cyan-200 hover:border-cyan-400', badge: 'bg-cyan-500 text-white', shadow: 'shadow-cyan-100' },
  fuchsia: { bg: 'bg-fuchsia-50', border: 'border-fuchsia-200 hover:border-fuchsia-400', badge: 'bg-fuchsia-500 text-white', shadow: 'shadow-fuchsia-100' },
  stone: { bg: 'bg-stone-50', border: 'border-stone-200 hover:border-stone-400', badge: 'bg-stone-500 text-white', shadow: 'shadow-stone-100' },
  red: { bg: 'bg-red-50', border: 'border-red-200 hover:border-red-400', badge: 'bg-red-500 text-white', shadow: 'shadow-red-100' },
};

export const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  language,
  course = 'en',
  progress,
  onSelect,
  hasNewWords = false,
  newWordsCount,
}) => {
  const t = translations[language];
  const colorScheme = COLOR_MAP[topic.color || 'sky'] || COLOR_MAP.sky;

  const stars = progress?.stars || 0;
  const totalCount = topic.words.length;
  const topicWordIds = new Set(topic.words.map((w) => w.id));
  const masteredCount =
    progress?.masteredWordIds?.filter((id) => topicWordIds.has(id)).length || 0;
  const isAllMastered = totalCount > 0 && masteredCount >= totalCount;
  const isHighlightNewWords = hasNewWords || (newWordsCount !== undefined && newWordsCount > 0);

  const localizedTitle =
    course === 'lv'
      ? topic.topic_name.lv
      : language === 'ru'
      ? topic.topic_name.ru
      : topic.topic_name.lv;

  const subtitle =
    course === 'lv'
      ? topic.topic_name.ru
      : language === 'ru'
      ? topic.topic_name.en
      : topic.topic_name.en;

  const topicMaxStars = totalCount < 5 ? 0 : totalCount <= 8 ? 2 : 3;
  const starSlots = Array.from({ length: topicMaxStars }, (_, i) => i + 1);

  return (
    <button
      onClick={() => {
        sounds.playClick();
        onSelect(topic);
      }}
      className={`group relative flex flex-col justify-between p-4 sm:p-5 rounded-3xl transition-all duration-300 cursor-pointer text-left ${
        isHighlightNewWords
          ? 'bg-amber-50/40 border-[6px] border-double border-amber-400 hover:border-amber-500 ring-2 ring-amber-300/70 ring-offset-2'
          : `border-4 ${colorScheme.border} ${colorScheme.bg}`
      } hover:shadow-xl hover:-translate-y-1.5 active:translate-y-0 active:scale-[0.98] ${
        isAllMastered ? 'ring-2 ring-emerald-400 ring-offset-2' : ''
      }`}
    >
      {/* Top row: Topic Emoji and Star Progress */}
      <div className="flex items-start justify-between mb-3 gap-2">
        {/* Topic Emoji Box */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-3xl sm:text-4xl group-hover:scale-110 transition-transform">
          {topic.emoji || '📖'}
        </div>

        {/* Top-Right: Stars and New Words Badge */}
        <div className="flex flex-col items-end gap-1.5">
          {topicMaxStars > 0 ? (
            <div className="flex items-center gap-0.5 bg-amber-50 border-2 border-amber-200 px-2 py-1 rounded-2xl">
              {starSlots.map((starIndex) => (
                <span
                  key={starIndex}
                  className={`text-base sm:text-lg transition-transform ${
                    starIndex <= stars
                      ? 'text-amber-400 scale-100'
                      : 'text-slate-200 opacity-60 scale-90'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 px-2 py-1 rounded-2xl text-[11px] font-bold text-slate-400">
              <span>💡</span>
            </div>
          )}

          {/* New words label */}
          {isHighlightNewWords && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm border border-amber-300 tracking-tight whitespace-nowrap">
              <span>✨</span>
              <span>
                {t.newWordsBadge}
                {newWordsCount && newWordsCount > 0 ? ` (+${newWordsCount})` : ''}
              </span>
            </span>
          )}
        </div>
      </div>

      {/* Center: Topic Names */}
      <div className="mb-4">
        <h3 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight leading-tight group-hover:text-indigo-600 transition-colors">
          {localizedTitle}
        </h3>
        {subtitle && subtitle !== localizedTitle && (
          <p className="text-xs sm:text-sm font-semibold text-slate-400 mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      {/* Bottom row: Word count and progress bar */}
      <div className="w-full pt-2 border-t-2 border-slate-100">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1.5">
          <span>
            {totalCount} {getWordsPlural(totalCount, language)}
          </span>
          {isAllMastered ? (
            <span className="flex items-center gap-1 text-emerald-600 font-extrabold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {t.allTopics}
            </span>
          ) : (
            <span>
              {masteredCount}/{totalCount} {t.learnedCount}
            </span>
          )}
        </div>

        {/* Progress bar */}
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              isAllMastered
                ? 'bg-emerald-500'
                : stars > 0
                ? 'bg-amber-400'
                : 'bg-indigo-400'
            }`}
            style={{ width: `${Math.min(100, Math.round((masteredCount / Math.max(1, totalCount)) * 100))}%` }}
          />
        </div>
      </div>
    </button>
  );
};
