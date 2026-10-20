import React from 'react';
import { WordIllustration } from './WordIllustration';
import { Language } from '../types';

export type GrammarBadgeType = 'have' | 'can' | 'like' | 'none';

export interface GrammarImageWord {
  en: string;
  emoji: string;
  secondEmoji?: string;
  customLabel?: string;
  hideCaption?: boolean;
  isTwoCharacters?: boolean;
  highlightIndex?: 0 | 1;
  heightScale?: {
    first?: 'tall' | 'short' | 'normal';
    second?: 'tall' | 'short' | 'normal';
  };
}

interface GrammarIllustrationProps {
  imageWord?: GrammarImageWord;
  isNegated?: boolean;
  badgeType?: GrammarBadgeType;
  language?: Language;
  className?: string;
}

export const GrammarIllustration: React.FC<GrammarIllustrationProps> = ({
  imageWord,
  isNegated,
  badgeType,
  language = 'ru',
  className = '',
}) => {
  if (!imageWord) return null;

  const hasNegation = Boolean(isNegated);
  const activeBadgeType: GrammarBadgeType =
    badgeType !== undefined ? badgeType : isNegated !== undefined ? 'have' : 'none';
  const showBadge = activeBadgeType !== 'none' && isNegated !== undefined;

  const getBadgeContent = () => {
    if (activeBadgeType === 'can') {
      return {
        icon: hasNegation ? '❌' : '✓',
        text: hasNegation
          ? language === 'lv'
            ? 'NEPROTU'
            : 'НЕ УМЕЮ'
          : language === 'lv'
          ? 'PROTU'
          : 'УМЕЮ',
      };
    }
    if (activeBadgeType === 'like') {
      return {
        icon: hasNegation ? '❌' : '❤️',
        text: hasNegation
          ? language === 'lv'
            ? 'NEPATĪK'
            : 'НЕ ЛЮБЛЮ'
          : language === 'lv'
          ? 'PATĪK'
          : 'ЛЮБЛЮ',
      };
    }
    // Default 'have'
    return {
      icon: hasNegation ? '❌' : '✓',
      text: hasNegation
        ? language === 'lv'
          ? 'NAV'
          : 'НЕТ'
        : language === 'lv'
          ? 'IR'
          : 'ЕСТЬ',
    };
  };

  const badgeInfo = showBadge ? getBadgeContent() : null;

  const mockWord = {
    id: `grammar_${imageWord.en}`,
    en: imageWord.en,
    lv: '',
    ru: '',
    grade: 1 as const,
    image: imageWord.emoji,
  };

  const borderBgStyle = hasNegation
    ? 'bg-rose-50/70 border-3 border-rose-300 shadow-rose-100'
    : showBadge
    ? 'bg-emerald-50/70 border-3 border-emerald-300 shadow-emerald-100'
    : 'bg-indigo-50/60 border-3 border-indigo-200 shadow-indigo-100';

  const isFirstHighlighted = (imageWord.highlightIndex ?? 0) === 0;
  const isSecondHighlighted = imageWord.highlightIndex === 1;

  const getScaleClass = (scale?: 'tall' | 'short' | 'normal') => {
    if (scale === 'tall') return 'text-6xl sm:text-7xl scale-125 origin-bottom';
    if (scale === 'short') return 'text-3xl sm:text-4xl scale-80 origin-bottom';
    return 'text-4xl sm:text-5xl';
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center p-4 rounded-3xl transition-all select-none shadow-md ${borderBgStyle} ${className}`}
    >
      {/* Status Badge in top-right corner if applicable */}
      {badgeInfo && (
        <div
          className={`absolute top-2.5 right-2.5 flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black shadow-xs ${
            hasNegation
              ? 'bg-rose-500 text-white animate-pulse'
              : activeBadgeType === 'like'
              ? 'bg-pink-500 text-white'
              : 'bg-emerald-500 text-white'
          }`}
        >
          <span>{badgeInfo.icon}</span>
          <span className="tracking-wide">{badgeInfo.text}</span>
        </div>
      )}

      {/* Main Illustration container */}
      {imageWord.isTwoCharacters && imageWord.secondEmoji ? (
        <div className="relative flex items-end justify-center gap-3 sm:gap-4 py-4 px-2 min-h-[130px] sm:min-h-[150px]">
          {/* Character 1 */}
          <div
            className={`relative flex flex-col items-center justify-end transition-all duration-300 ${
              isFirstHighlighted
                ? 'p-2 sm:p-2.5 rounded-2xl bg-white/95 border-3 border-indigo-400 shadow-lg ring-4 ring-indigo-200/90 ring-offset-2 scale-105 z-10'
                : 'p-1.5 sm:p-2 rounded-2xl bg-white/40 border-2 border-dashed border-slate-200 opacity-40 grayscale-40 scale-90'
            }`}
          >
            {isFirstHighlighted && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center bg-indigo-600 text-white w-7 h-7 rounded-full shadow-lg ring-2 ring-white animate-bounce">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M12 5v14M19 12l-7 7-7-7"/>
                </svg>
              </div>
            )}
            <span className={`select-none leading-none transition-transform duration-300 ${getScaleClass(imageWord.heightScale?.first)}`}>
              {imageWord.emoji}
            </span>
          </div>

          {/* Character 2 */}
          <div
            className={`relative flex flex-col items-center justify-end transition-all duration-300 ${
              isSecondHighlighted
                ? 'p-2 sm:p-2.5 rounded-2xl bg-white/95 border-3 border-indigo-400 shadow-lg ring-4 ring-indigo-200/90 ring-offset-2 scale-105 z-10'
                : 'p-1.5 sm:p-2 rounded-2xl bg-white/40 border-2 border-dashed border-slate-200 opacity-40 grayscale-40 scale-90'
            }`}
          >
            {isSecondHighlighted && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center bg-indigo-600 text-white w-7 h-7 rounded-full shadow-lg ring-2 ring-white animate-bounce">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M12 5v14M19 12l-7 7-7-7"/>
                </svg>
              </div>
            )}
            <span className={`select-none leading-none transition-transform duration-300 ${getScaleClass(imageWord.heightScale?.second)}`}>
              {imageWord.secondEmoji}
            </span>
          </div>
        </div>
      ) : (
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center p-2">
          <div
            className={`transition-all duration-300 flex items-center justify-center gap-1 ${
              hasNegation ? 'opacity-40 grayscale-40 scale-95' : 'scale-100'
            }`}
          >
            <WordIllustration
              word={mockWord}
              fallbackEmoji={imageWord.emoji}
              className="w-24 h-24 sm:w-32 sm:h-32 text-6xl sm:text-7xl"
            />
            {imageWord.secondEmoji && (
              <span className="text-4xl sm:text-5xl select-none -ml-2 drop-shadow-sm">
                {imageWord.secondEmoji}
              </span>
            )}
          </div>

          {/* Big crossed-out diagonal strike overlay when negated */}
          {hasNegation && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-24 h-24 sm:w-32 sm:h-32 text-rose-500 stroke-current drop-shadow-md">
                <circle cx="50" cy="50" r="42" fill="none" strokeWidth="8" opacity="0.85" />
                <line x1="20" y1="20" x2="80" y2="80" strokeWidth="8" strokeLinecap="round" />
              </svg>
            </div>
          )}
        </div>
      )}

      {/* Caption name of item (hidden if hideCaption is true) */}
      {!imageWord.hideCaption && (imageWord.customLabel || imageWord.en) && (
        <span className="mt-1 text-xs sm:text-sm font-black text-slate-700 uppercase tracking-wider font-comic">
          {imageWord.customLabel || imageWord.en}
        </span>
      )}
    </div>
  );
};
