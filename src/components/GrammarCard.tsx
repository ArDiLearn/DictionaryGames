import React from 'react';
import { Sparkles } from 'lucide-react';
import { GrammarTopic } from '../data/grammarData';
import { Language, LearningCourse } from '../types';
import { sounds } from '../utils/soundEffects';

interface GrammarCardProps {
  topic: GrammarTopic;
  language: Language;
  course?: LearningCourse;
  stars?: number;
  onSelect: (topic: GrammarTopic) => void;
}

export const GrammarCard: React.FC<GrammarCardProps> = ({
  topic,
  language,
  course = 'en',
  stars = 0,
  onSelect,
}) => {
  const title = topic.title[language] || topic.title.ru;
  const description = topic.description[language] || topic.description.ru;
  const isMix = topic.id.endsWith('_mix');
  const questionCount = isMix ? 10 : topic.questions.length;

  const isEnLv = course === 'en-lv' || language === 'lv';

  const theme = isEnLv
    ? {
        bg: 'bg-teal-50/60',
        border: 'border-4 border-teal-300 hover:border-cyan-500',
        hoverShadow: 'hover:shadow-xl hover:shadow-cyan-500/15 shadow-xs',
        emojiBg: 'bg-white/90 border-2 border-teal-200/90 group-hover:border-teal-400',
        badge: 'bg-teal-100/90 text-teal-900 border border-teal-300',
        titleHover: 'group-hover:text-teal-700',
        ctaText: 'text-teal-700',
      }
    : {
        bg: 'bg-sky-50/50',
        border: 'border-4 border-sky-300 hover:border-indigo-400',
        hoverShadow: 'hover:shadow-xl hover:shadow-indigo-500/15 shadow-xs',
        emojiBg: 'bg-white/90 border-2 border-sky-200/90 group-hover:border-sky-400',
        badge: 'bg-sky-100/90 text-indigo-900 border border-sky-300',
        titleHover: 'group-hover:text-indigo-700',
        ctaText: 'text-indigo-600',
      };

  return (
    <button
      onClick={() => {
        sounds.playClick();
        onSelect(topic);
      }}
      className={`group relative flex flex-col justify-between p-4 sm:p-5 rounded-3xl ${theme.bg} ${theme.border} ${theme.hoverShadow} transition-all duration-300 text-left cursor-pointer active:scale-[0.98] hover:-translate-y-1`}
    >
      <div>
        {/* Top bar in card: Emoji icon & Question count / Stars */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${theme.emojiBg} flex items-center justify-center text-2xl sm:text-3xl shadow-inner group-hover:scale-105 transition-transform`}>
            {topic.emoji}
          </div>

          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded-md border border-slate-200">
                {topic.grade} {language === 'lv' ? 'kl.' : 'кл.'}
              </span>
              <span className={`text-[11px] font-black ${theme.badge} px-2 py-0.5 rounded-full`}>
                {questionCount} {language === 'lv' ? 'jaut.' : 'вопр.'}
              </span>
            </div>

            {/* Stars row */}
            <div className="flex items-center gap-0.5 text-sm">
              {[1, 2, 3].map((slot) => (
                <span
                  key={slot}
                  className={slot <= stars ? 'text-amber-400' : 'text-slate-200'}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className={`text-base sm:text-lg font-black text-slate-800 tracking-tight leading-snug ${theme.titleHover} transition-colors`}>
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-500 font-semibold mt-1 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Bottom CTA */}
      <div className={`mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black ${theme.ctaText}`}>
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'lv' ? 'Sākt uzdevumus' : 'Начать тренировку'}</span>
        </span>
        <span className="text-slate-400 group-hover:translate-x-1 transition-transform">
          →
        </span>
      </div>
    </button>
  );
};
