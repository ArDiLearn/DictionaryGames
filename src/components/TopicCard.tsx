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


const _TopicCard: React.FC<TopicCardProps> = ({
  topic,
  language,
  course = 'en',
  progress,
  onSelect,
  hasNewWords = false,
  newWordsCount,
}) => {
  const t = translations[language];

  const isLv = course === 'lv';
  const isEnLv = course === 'en-lv' || language === 'lv';

  const cardTheme = isLv
    ? {
        border: 'border-3 border-[#3DA373]/30 hover:border-[#2B7A56]',
        hoverBg: 'hover:bg-gradient-to-b hover:from-white hover:to-[#F0FAF5]',
        hoverShadow: 'hover:shadow-xl hover:shadow-[#3DA373]/15 shadow-sm',
        emojiBg: 'bg-emerald-50 border-2 border-emerald-200 group-hover:border-[#2B7A56]',
        titleHover: 'group-hover:text-[#1A543A]',
        progressGradient: 'bg-gradient-to-r from-[#3DA373] to-[#1A543A]',
      }
    : isEnLv
    ? {
        border: 'border-3 border-teal-200/90 hover:border-cyan-500',
        hoverBg: 'hover:bg-gradient-to-b hover:from-white hover:to-teal-50/40',
        hoverShadow: 'hover:shadow-xl hover:shadow-teal-500/15 shadow-sm',
        emojiBg: 'bg-gradient-to-br from-teal-50 to-cyan-50/70 border-2 border-teal-200 group-hover:border-cyan-400',
        titleHover: 'group-hover:text-teal-700',
        progressGradient: 'bg-gradient-to-r from-teal-500 via-cyan-500 to-indigo-600',
      }
    : {
        border: 'border-3 border-sky-200/90 hover:border-blue-500',
        hoverBg: 'hover:bg-gradient-to-b hover:from-white hover:to-sky-50/40',
        hoverShadow: 'hover:shadow-xl hover:shadow-blue-500/15 shadow-sm',
        emojiBg: 'bg-gradient-to-br from-sky-50 to-indigo-50/70 border-2 border-sky-200/80 group-hover:border-blue-400',
        titleHover: 'group-hover:text-blue-700',
        progressGradient: 'bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600',
      };

  const stars = progress?.stars || 0;
  const totalCount = topic.words.length;
  const topicWordIds = new Set(topic.words.map((w) => w.id));
  const masteredCount =
    progress?.masteredWordIds?.filter((id) => topicWordIds.has(id)).length || 0;
  const isAllMastered = totalCount > 0 && masteredCount >= totalCount;
  const isHighlightNewWords = hasNewWords || (newWordsCount !== undefined && newWordsCount > 0);

  const localizedTitle =
    course === 'lv' || course === 'en-lv'
      ? topic.topic_name.lv
      : language === 'ru'
      ? topic.topic_name.ru
      : topic.topic_name.lv;

  const subtitle =
    course === 'lv'
      ? topic.topic_name.ru
      : topic.topic_name.en;

  const topicMaxStars = totalCount < 5 ? 0 : totalCount <= 8 ? 2 : 3;
  const starSlots = Array.from({ length: topicMaxStars }, (_, i) => i + 1);

  return (
    <button
      onClick={() => {
        sounds.playClick();
        onSelect(topic);
      }}
      className={`group relative flex flex-col justify-between p-4 sm:p-5 rounded-3xl transition-all duration-300 cursor-pointer text-left bg-white ${
        isHighlightNewWords
          ? 'bg-amber-50/40 border-[5px] border-double border-amber-400 hover:border-amber-500 ring-2 ring-amber-300/70 ring-offset-2'
          : cardTheme.border
      } ${cardTheme.hoverBg} ${cardTheme.hoverShadow} hover:-translate-y-1.5 active:translate-y-0 active:scale-[0.98] ${
        isAllMastered ? 'ring-2 ring-emerald-400 ring-offset-2' : ''
      }`}
    >
      {/* Top row: Topic Emoji and Star Progress */}
      <div className="flex items-start justify-between mb-3 gap-2">
        {/* Topic Emoji Box */}
        <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${cardTheme.emojiBg} shadow-xs flex items-center justify-center text-3xl sm:text-4xl group-hover:scale-110 transition-all`}>
          {topic.emoji || '📖'}
        </div>

        {/* Top-Right: Stars and New Words Badge */}
        <div className="flex flex-col items-end gap-1.5">
          {topicMaxStars > 0 ? (
            <div className="flex items-center gap-0.5 bg-amber-50/90 border-2 border-amber-200/90 px-2 py-0.5 rounded-2xl shadow-2xs">
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
        <h3 className={`text-lg sm:text-xl font-black text-slate-800 tracking-tight leading-tight ${cardTheme.titleHover} transition-colors`}>
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
                : cardTheme.progressGradient
            }`}
            style={{ width: `${Math.min(100, Math.round((masteredCount / Math.max(1, totalCount)) * 100))}%` }}
          />
        </div>
      </div>
    </button>
  );
};

export const TopicCard = React.memo(_TopicCard);
