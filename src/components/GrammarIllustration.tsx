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
  fullBodyHeight?: {
    first: { gender: 'boy' | 'girl'; height: 'tall' | 'short' };
    second: { gender: 'boy' | 'girl'; height: 'tall' | 'short' };
  };
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

// Full-body SVG person component for height comparison (tall vs short)
const FullBodyFigure: React.FC<{
  gender: 'boy' | 'girl';
  height: 'tall' | 'short';
}> = ({ gender, height }) => {
  const isTall = height === 'tall';

  if (gender === 'boy') {
    if (isTall) {
      return (
        <svg viewBox="0 0 60 140" className="w-16 h-36 sm:w-20 sm:h-44 drop-shadow-sm select-none" fill="none">
          {/* Back Hair */}
          <ellipse cx="30" cy="18" rx="14" ry="12.5" fill="#5c2406" />
          {/* Ears */}
          <circle cx="17" cy="22" r="3.2" fill="#fed7aa" />
          <circle cx="43" cy="22" r="3.2" fill="#fed7aa" />
          {/* Face */}
          <circle cx="30" cy="22" r="11.5" fill="#fed7aa" />
          {/* Front Hair & Bangs */}
          <path d="M17 20 C16 10 21 6.5 30 6.5 C39 6.5 44 10 43 20 C41 17.5 38 16 35 17 C32 15 28 15 25 17.5 C22 16 19 17.5 17 20 Z" fill="#78350f" />
          <path d="M23 9.5 C26 8 33 8 37 9.5" stroke="#9a3412" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          {/* Eyes & smile */}
          <circle cx="26" cy="22" r="1.8" fill="#1e293b" />
          <circle cx="34" cy="22" r="1.8" fill="#1e293b" />
          <path d="M26 27 Q30 31 34 27" stroke="#1e293b" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="23" cy="25" r="2" fill="#fb7185" opacity="0.6" />
          <circle cx="37" cy="25" r="2" fill="#fb7185" opacity="0.6" />
          {/* Neck */}
          <rect x="27" y="32" width="6" height="5" fill="#fed7aa" />
          {/* T-Shirt (Blue) */}
          <path d="M21 37 L11 50 L17 53 L21 44 L21 72 L39 72 L39 44 L43 53 L49 50 L39 37 Z" fill="#3b82f6" />
          {/* Collar */}
          <path d="M27 37 Q30 41 33 37" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" />
          {/* Hands */}
          <circle cx="14" cy="52" r="3.5" fill="#fed7aa" />
          <circle cx="46" cy="52" r="3.5" fill="#fed7aa" />
          {/* Shorts (Navy) */}
          <path d="M21 72 L39 72 L38 94 L31 94 L30 82 L29 94 L22 94 Z" fill="#1e3a8a" />
          {/* Legs */}
          <rect x="23" y="94" width="5.5" height="31" fill="#fed7aa" rx="2" />
          <rect x="31.5" y="94" width="5.5" height="31" fill="#fed7aa" rx="2" />
          {/* White socks */}
          <rect x="23" y="121" width="5.5" height="4" fill="#ffffff" />
          <rect x="31.5" y="121" width="5.5" height="4" fill="#ffffff" />
          {/* Red Sneakers */}
          <path d="M19 125 C19 123 28 123 28.5 125 L29 133 L18 133 Z" fill="#ef4444" />
          <rect x="17.5" y="132" width="12" height="3" rx="1" fill="#ffffff" />
          <path d="M31.5 125 C32 123 41 123 41 125 L42 133 L31 133 Z" fill="#ef4444" />
          <rect x="30.5" y="132" width="12" height="3" rx="1" fill="#ffffff" />
        </svg>
      );
    } else {
      // Short Boy
      return (
        <svg viewBox="0 0 60 140" className="w-16 h-36 sm:w-20 sm:h-44 drop-shadow-sm select-none" fill="none">
          {/* Back Hair */}
          <ellipse cx="30" cy="72" rx="13" ry="11.5" fill="#5c2406" />
          {/* Ears */}
          <circle cx="18" cy="76" r="3" fill="#fed7aa" />
          <circle cx="42" cy="76" r="3" fill="#fed7aa" />
          {/* Face */}
          <circle cx="30" cy="76" r="10.5" fill="#fed7aa" />
          {/* Front Hair & Bangs */}
          <path d="M18 74 C17 64.5 21 61 30 61 C39 61 43 64.5 42 74 C40 71.5 38 70 34 71 C32 69 28 69 25 71.5 C22 70 20 71.5 18 74 Z" fill="#78350f" />
          <path d="M23 64 C26 62.5 33 62.5 37 64" stroke="#9a3412" strokeWidth="1.6" strokeLinecap="round" fill="none" />
          {/* Eyes & smile */}
          <circle cx="26" cy="76" r="1.8" fill="#1e293b" />
          <circle cx="34" cy="76" r="1.8" fill="#1e293b" />
          <path d="M26 81 Q30 85 34 81" stroke="#1e293b" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="23" cy="79" r="2" fill="#fb7185" opacity="0.6" />
          <circle cx="37" cy="79" r="2" fill="#fb7185" opacity="0.6" />
          {/* Neck */}
          <rect x="27.5" y="86" width="5" height="4" fill="#fed7aa" />
          {/* T-Shirt (Amber/Orange) */}
          <path d="M22 89 L14 99 L19 101 L22 95 L22 113 L38 113 L38 95 L41 101 L46 99 L38 89 Z" fill="#f97316" />
          {/* Collar */}
          <path d="M27 89 Q30 93 33 89" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
          {/* Hands */}
          <circle cx="16" cy="101" r="3" fill="#fed7aa" />
          <circle cx="44" cy="101" r="3" fill="#fed7aa" />
          {/* Shorts (Teal) */}
          <path d="M22 113 L38 113 L37 125 L31 125 L30 119 L29 125 L23 125 Z" fill="#0891b2" />
          {/* Little Legs */}
          <rect x="24" y="124" width="4.5" height="7" fill="#fed7aa" rx="1" />
          <rect x="31.5" y="124" width="4.5" height="7" fill="#fed7aa" rx="1" />
          {/* Blue Sneakers */}
          <path d="M20 128 C20 126 28 126 28 128 L28.5 133 L19.5 133 Z" fill="#2563eb" />
          <rect x="19" y="132" width="10" height="3" rx="1" fill="#ffffff" />
          <path d="M31.5 128 C32 126 40 126 40 128 L40.5 133 L31 133 Z" fill="#2563eb" />
          <rect x="30.5" y="132" width="10" height="3" rx="1" fill="#ffffff" />
        </svg>
      );
    }
  }

  // Gender: Girl
  if (isTall) {
    return (
      <svg viewBox="0 0 60 140" className="w-16 h-36 sm:w-20 sm:h-44 drop-shadow-sm select-none" fill="none">
        {/* Ponytail puffs behind */}
        <path d="M15 22 C10 24 7 32 10 39 C12 42 16 41 17 37 C18 33 17 26 15 22 Z" fill="#b45309" />
        <path d="M45 22 C50 24 53 32 50 39 C48 42 44 41 43 37 C42 33 43 26 45 22 Z" fill="#b45309" />
        {/* Scrunchies */}
        <ellipse cx="15" cy="24" rx="2.5" ry="3.5" fill="#ec4899" />
        <ellipse cx="45" cy="24" rx="2.5" ry="3.5" fill="#ec4899" />
        {/* Back Hair behind neck */}
        <path d="M18 20 C14 16 14 28 13 36 C17 38 21 34 22 28 C23 32 37 32 38 28 C39 34 43 38 47 36 C46 28 46 16 42 20 Z" fill="#78350f" />
        {/* Ears */}
        <circle cx="17" cy="22" r="3.2" fill="#fed7aa" />
        <circle cx="43" cy="22" r="3.2" fill="#fed7aa" />
        {/* Face */}
        <circle cx="30" cy="22" r="11.5" fill="#fed7aa" />
        {/* Front Hair & Bangs */}
        <path d="M17 21 C15 10.5 21 6.5 30 6.5 C39 6.5 45 10.5 43 21 C41 18 38 18 34 18 C32 16.5 30 16.5 28 18 C24 18 20 18 17 21 Z" fill="#b45309" />
        <path d="M23 9.5 C26 8 34 8 37 9.5" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* Cute Clip */}
        <circle cx="21" cy="11.5" r="2.2" fill="#fb7185" />
        <circle cx="21" cy="11.5" r="0.9" fill="#fef08a" />
        {/* Eyes & smile */}
        <circle cx="26" cy="22" r="1.8" fill="#1e293b" />
        <circle cx="34" cy="22" r="1.8" fill="#1e293b" />
        <path d="M26 27 Q30 31 34 27" stroke="#1e293b" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="23" cy="25" r="2.5" fill="#fb7185" opacity="0.6" />
        <circle cx="37" cy="25" r="2.5" fill="#fb7185" opacity="0.6" />
        {/* Neck */}
        <rect x="27.5" y="33" width="5" height="4" fill="#fed7aa" />
        {/* Pink Top */}
        <path d="M22 37 L13 49 L18 52 L22 44 L21 64 L39 64 L38 44 L42 52 L47 49 L38 37 Z" fill="#ec4899" />
        <circle cx="15" cy="51" r="3" fill="#fed7aa" />
        <circle cx="45" cy="51" r="3" fill="#fed7aa" />
        {/* Purple Flared Skirt */}
        <path d="M21 64 L39 64 L45 88 L15 88 Z" fill="#9333ea" />
        <path d="M15 88 Q30 92 45 88 L45 89 Q30 93 15 89 Z" fill="#7e22ce" />
        {/* Long Legs */}
        <rect x="24" y="88" width="5" height="37" fill="#fed7aa" rx="2" />
        <rect x="31" y="88" width="5" height="37" fill="#fed7aa" rx="2" />
        {/* White Socks */}
        <rect x="24" y="122" width="5" height="4" fill="#ffffff" />
        <rect x="31" y="122" width="5" height="4" fill="#ffffff" />
        {/* Purple / Pink Shoes */}
        <path d="M20 126 C20 124 28 124 28.5 126 L29 133 L19 133 Z" fill="#db2777" />
        <rect x="18.5" y="132" width="11" height="3" rx="1" fill="#ffffff" />
        <path d="M31.5 126 C32 124 40 124 40 126 L41 133 L30.5 133 Z" fill="#db2777" />
        <rect x="30" y="132" width="11" height="3" rx="1" fill="#ffffff" />
      </svg>
    );
  } else {
    // Short Girl
    return (
      <svg viewBox="0 0 60 140" className="w-16 h-36 sm:w-20 sm:h-44 drop-shadow-sm select-none" fill="none">
        {/* Ponytail puffs behind */}
        <path d="M16 76 C11 78 8 85 11 91 C13 94 17 93 18 89 C19 86 18 80 16 76 Z" fill="#b45309" />
        <path d="M44 76 C49 78 52 85 49 91 C47 94 43 93 42 89 C41 86 42 80 44 76 Z" fill="#b45309" />
        {/* Scrunchies */}
        <ellipse cx="16" cy="77" rx="2.2" ry="3" fill="#06b6d4" />
        <ellipse cx="44" cy="77" rx="2.2" ry="3" fill="#06b6d4" />
        {/* Back Hair behind neck */}
        <path d="M18 74 C15 70 15 80 14 87 C18 89 21 86 22 81 C23 85 37 85 38 81 C39 86 42 89 46 87 C45 80 45 70 42 74 Z" fill="#78350f" />
        {/* Ears */}
        <circle cx="18" cy="76" r="3" fill="#fed7aa" />
        <circle cx="42" cy="76" r="3" fill="#fed7aa" />
        {/* Face */}
        <circle cx="30" cy="76" r="10.5" fill="#fed7aa" />
        {/* Front Hair & Bangs */}
        <path d="M18 75 C16 65 21 60.5 30 60.5 C39 60.5 44 65 42 75 C40 72 37 72 34 72 C32 70.5 30 70.5 28 72 C24 72 20 72 18 75 Z" fill="#b45309" />
        <path d="M23 63.5 C26 62 34 62 37 63.5" stroke="#d97706" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        {/* Cute Clip */}
        <circle cx="22" cy="65.5" r="2" fill="#06b6d4" />
        <circle cx="22" cy="65.5" r="0.8" fill="#ffffff" />
        {/* Eyes & smile */}
        <circle cx="26" cy="76" r="1.8" fill="#1e293b" />
        <circle cx="34" cy="76" r="1.8" fill="#1e293b" />
        <path d="M26 81 Q30 85 34 81" stroke="#1e293b" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="23" cy="79" r="2" fill="#fb7185" opacity="0.6" />
        <circle cx="37" cy="79" r="2" fill="#fb7185" opacity="0.6" />
        {/* Neck */}
        <rect x="27.5" y="86" width="5" height="4" fill="#fed7aa" />
        {/* Cyan Top */}
        <path d="M22 89 L14 99 L19 101 L22 95 L22 108 L38 108 L38 95 L41 101 L46 99 L38 89 Z" fill="#06b6d4" />
        <circle cx="16" cy="100" r="2.8" fill="#fed7aa" />
        <circle cx="44" cy="100" r="2.8" fill="#fed7aa" />
        {/* Yellow Skirt */}
        <path d="M22 108 L38 108 L43 123 L17 123 Z" fill="#eab308" />
        {/* Little Legs */}
        <rect x="24" y="123" width="4.5" height="8" fill="#fed7aa" rx="1" />
        <rect x="31.5" y="123" width="4.5" height="8" fill="#fed7aa" rx="1" />
        {/* Shoes */}
        <path d="M20 128 C20 126 28 126 28 128 L28.5 133 L19.5 133 Z" fill="#ec4899" />
        <rect x="19" y="132" width="10" height="3" rx="1" fill="#ffffff" />
        <path d="M31.5 128 C32 126 40 126 40 128 L40.5 133 L31 133 Z" fill="#ec4899" />
        <rect x="30.5" y="132" width="10" height="3" rx="1" fill="#ffffff" />
      </svg>
    );
  }
};

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
    ? 'bg-rose-50/85 border-4 border-rose-300 shadow-rose-100/70'
    : showBadge
    ? 'bg-emerald-50/85 border-4 border-emerald-300 shadow-emerald-100/70'
    : 'bg-amber-50/85 border-4 border-amber-200 shadow-amber-100/70';

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
      {imageWord.fullBodyHeight ? (
        /* Full-body height comparison mode (short vs tall on shared ground line) */
        <div className="relative flex items-end justify-center gap-4 sm:gap-6 py-4 px-3 min-h-[160px] sm:min-h-[190px]">
          {/* Ground baseline */}
          <div className="absolute bottom-3 left-2 right-2 h-2 bg-emerald-400/80 rounded-full shadow-inner" />

          {/* Character 1 */}
          <div
            className={`relative flex flex-col items-center justify-end pb-3 transition-all duration-300 ${
              isFirstHighlighted
                ? 'p-2 rounded-2xl bg-white/95 border-4 border-indigo-500 shadow-lg ring-4 ring-indigo-200/90 ring-offset-1 z-10 scale-105'
                : 'p-2 rounded-2xl bg-white/80 border-2 border-slate-200 shadow-xs opacity-100 scale-100'
            }`}
          >
            {isFirstHighlighted && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center bg-indigo-600 text-white w-7 h-7 rounded-full shadow-lg ring-2 ring-white animate-bounce">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M12 5v14M19 12l-7 7-7-7"/>
                </svg>
              </div>
            )}
            <FullBodyFigure
              gender={imageWord.fullBodyHeight.first.gender}
              height={imageWord.fullBodyHeight.first.height}
            />
          </div>

          {/* Character 2 */}
          <div
            className={`relative flex flex-col items-center justify-end pb-3 transition-all duration-300 ${
              isSecondHighlighted
                ? 'p-2 rounded-2xl bg-white/95 border-4 border-indigo-500 shadow-lg ring-4 ring-indigo-200/90 ring-offset-1 z-10 scale-105'
                : 'p-2 rounded-2xl bg-white/80 border-2 border-slate-200 shadow-xs opacity-100 scale-100'
            }`}
          >
            {isSecondHighlighted && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center bg-indigo-600 text-white w-7 h-7 rounded-full shadow-lg ring-2 ring-white animate-bounce">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M12 5v14M19 12l-7 7-7-7"/>
                </svg>
              </div>
            )}
            <FullBodyFigure
              gender={imageWord.fullBodyHeight.second.gender}
              height={imageWord.fullBodyHeight.second.height}
            />
          </div>
        </div>
      ) : imageWord.isTwoCharacters && imageWord.secondEmoji ? (
        /* Two-character emoji scene (Family, age, etc.) - NO DIMMING on companion */
        <div className="relative flex items-end justify-center gap-3 sm:gap-4 py-4 px-2 min-h-[130px] sm:min-h-[150px]">
          {/* Character 1 */}
          <div
            className={`relative flex flex-col items-center justify-end transition-all duration-300 ${
              isFirstHighlighted
                ? 'p-2 sm:p-2.5 rounded-2xl bg-white/95 border-4 border-indigo-500 shadow-lg ring-4 ring-indigo-200/90 ring-offset-2 scale-105 z-10'
                : 'p-2 sm:p-2.5 rounded-2xl bg-white/90 border-2 border-slate-200 shadow-xs opacity-100 scale-100'
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
                ? 'p-2 sm:p-2.5 rounded-2xl bg-white/95 border-4 border-indigo-500 shadow-lg ring-4 ring-indigo-200/90 ring-offset-2 scale-105 z-10'
                : 'p-2 sm:p-2.5 rounded-2xl bg-white/90 border-2 border-slate-200 shadow-xs opacity-100 scale-100'
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
    </div>
  );
};
