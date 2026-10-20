import React from 'react';
import { WordIllustration } from './WordIllustration';
import { Language } from '../types';

interface GrammarIllustrationProps {
  imageWord?: {
    en: string;
    emoji: string;
  };
  isNegated?: boolean;
  language?: Language;
  className?: string;
}

export const GrammarIllustration: React.FC<GrammarIllustrationProps> = ({
  imageWord,
  isNegated,
  language = 'ru',
  className = '',
}) => {
  if (!imageWord) return null;

  // Mock word object for WordIllustration
  const mockWord = {
    id: `grammar_${imageWord.en}`,
    en: imageWord.en,
    lv: '',
    ru: '',
    grade: 1,
    image: imageWord.emoji,
  };

  const hasNegation = Boolean(isNegated);

  const statusLabel = hasNegation
    ? language === 'lv'
      ? 'NAV'
      : 'НЕТ'
    : language === 'lv'
    ? 'IR'
    : 'ЕСТЬ';

  return (
    <div
      className={`relative flex flex-col items-center justify-center p-4 rounded-3xl transition-all select-none ${
        hasNegation
          ? 'bg-rose-50/70 border-3 border-rose-300 shadow-rose-100'
          : 'bg-emerald-50/70 border-3 border-emerald-300 shadow-emerald-100'
      } shadow-md ${className}`}
    >
      {/* Status Badge in top-right corner */}
      <div
        className={`absolute top-2.5 right-2.5 flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black shadow-xs ${
          hasNegation
            ? 'bg-rose-500 text-white animate-pulse'
            : 'bg-emerald-500 text-white'
        }`}
      >
        <span>{hasNegation ? '❌' : '✓'}</span>
        <span className="tracking-wide">{statusLabel}</span>
      </div>

      {/* Main Illustration container */}
      <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center p-2">
        <div className={`transition-all duration-300 ${hasNegation ? 'opacity-40 grayscale-40 scale-95' : 'scale-100'}`}>
          <WordIllustration
            word={mockWord}
            fallbackEmoji={imageWord.emoji}
            className="w-24 h-24 sm:w-32 sm:h-32 text-6xl sm:text-7xl"
          />
        </div>

        {/* Big crossed-out diagonal strike overlay when negated */}
        {hasNegation && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* SVG Cancel Sign */}
            <svg viewBox="0 0 100 100" className="w-24 h-24 sm:w-32 sm:h-32 text-rose-500 stroke-current drop-shadow-md">
              <circle cx="50" cy="50" r="42" fill="none" strokeWidth="8" opacity="0.85" />
              <line x1="20" y1="20" x2="80" y2="80" strokeWidth="8" strokeLinecap="round" />
            </svg>
          </div>
        )}
      </div>

      {/* Caption name of item */}
      <span className="mt-1 text-xs sm:text-sm font-black text-slate-700 uppercase tracking-wider font-comic">
        {imageWord.en}
      </span>
    </div>
  );
};
