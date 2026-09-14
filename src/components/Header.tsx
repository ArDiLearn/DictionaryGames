import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Volume2, VolumeX, Cloud, Check, Sparkles, BarChart3, ChevronRight, ChevronLeft } from 'lucide-react';
import { Language, UserStats, Grade } from '../types';
import { translations, getGradeFilterInfo, getPlayerDisplayName } from '../utils/i18n';
import { sounds } from '../utils/soundEffects';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  selectedGrades: Grade[];
  onToggleGrade: (grade: Grade) => void;
  onSelectAllGrades: () => void;
  stats: UserStats;
  totalStars: number;
  availableStars: number;
  isCloudSynced: boolean;
  onOpenSync: () => void;
  onOpenShop: () => void;
  onOpenStats: () => void;
  onUpdateStats: (newStats: UserStats) => void;
  onHomeClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  selectedGrades,
  onToggleGrade,
  onSelectAllGrades,
  stats,
  totalStars,
  availableStars,
  isCloudSynced,
  onOpenSync,
  onOpenShop,
  onOpenStats,
  onUpdateStats,
  onHomeClick,
}) => {
  const t = translations[language];
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const hasOverflow = el.scrollWidth > el.clientWidth + 4;
    setCanScrollLeft(hasOverflow && el.scrollLeft > 10);
    setCanScrollRight(hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    checkScroll();
    const timer = setTimeout(checkScroll, 120);
    window.addEventListener('resize', checkScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll, selectedGrades, language]);

  const scrollByAmount = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
      sounds.playClick();
    }
  };

  const toggleSound = () => {
    const updated = !stats.soundEnabled;
    sounds.enabled = updated;
    onUpdateStats({ ...stats, soundEnabled: updated });
    if (updated) sounds.playClick();
  };

  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-40 shadow-sm border-b-2 border-indigo-100 px-2 sm:px-6 py-2 w-full">
      <div className="relative max-w-5xl mx-auto w-full flex items-center">
        {/* Scroll Left Button / Indicator */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 flex items-center pl-0.5 z-20 pointer-events-none">
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white via-white/85 to-transparent pointer-events-none" />
            <button
              type="button"
              onClick={() => scrollByAmount(-180)}
              className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-600 hover:bg-indigo-700 active:scale-90 text-white flex items-center justify-center shadow-md pointer-events-auto cursor-pointer transition-transform"
              title="Прокрутить назад"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        )}

        {/* Scrollable track containing Logo AND All Controls */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex items-center justify-between gap-3 sm:gap-4 overflow-x-auto no-scrollbar scrollbar-none w-full py-0.5 px-0.5 overscroll-x-contain touch-pan-x scroll-smooth"
        >
          {/* Logo and Home Button */}
          <button
            onClick={onHomeClick}
            className="flex items-center gap-1.5 sm:gap-2 group text-left cursor-pointer focus:outline-none shrink-0"
            title={t.allTopics}
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform shrink-0">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
            </div>
            <div className="shrink-0">
              <div className="flex items-center gap-1">
                <span className="text-lg sm:text-2xl font-black tracking-tight text-indigo-600 font-comic whitespace-nowrap">
                  Wordy<span className="text-pink-500">Kids</span>
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-400 font-medium -mt-1 hidden md:block whitespace-nowrap">
                {t.appSubtitle}
              </p>
            </div>
          </button>

          {/* Right side controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Multi-select Grade Switcher (1st / 2nd / 3rd / All) */}
          <div
            className="flex bg-amber-100/90 p-0.5 sm:p-1 rounded-2xl border-2 border-amber-300 shadow-sm shrink-0"
            title={`${t.gradeSelectorLabel}: ${getGradeFilterInfo(selectedGrades, language).notice}`}
          >
            <button
              onClick={() => {
                onToggleGrade(1);
                sounds.playClick();
              }}
              className={`px-1.5 sm:px-2 py-1 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer shrink-0 ${
                selectedGrades.includes(1)
                  ? 'bg-amber-500 text-white shadow-sm scale-105'
                  : 'text-amber-800/60 hover:text-amber-950 hover:bg-amber-200/40'
              }`}
              title={selectedGrades.includes(1) ? t.grade1 : t.grade1}
            >
              {selectedGrades.includes(1) && selectedGrades.length < 3 ? '✓ ' : ''}{t.grade1Short}
            </button>
            <button
              onClick={() => {
                onToggleGrade(2);
                sounds.playClick();
              }}
              className={`px-1.5 sm:px-2 py-1 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer shrink-0 ${
                selectedGrades.includes(2)
                  ? 'bg-amber-500 text-white shadow-sm scale-105'
                  : 'text-amber-800/60 hover:text-amber-950 hover:bg-amber-200/40'
              }`}
              title={selectedGrades.includes(2) ? t.grade2 : t.grade2}
            >
              {selectedGrades.includes(2) && selectedGrades.length < 3 ? '✓ ' : ''}{t.grade2Short}
            </button>
            <button
              onClick={() => {
                onToggleGrade(3);
                sounds.playClick();
              }}
              className={`px-1.5 sm:px-2 py-1 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer shrink-0 ${
                selectedGrades.includes(3)
                  ? 'bg-amber-500 text-white shadow-sm scale-105'
                  : 'text-amber-800/60 hover:text-amber-950 hover:bg-amber-200/40'
              }`}
              title={selectedGrades.includes(3) ? t.grade3 : t.grade3}
            >
              {selectedGrades.includes(3) && selectedGrades.length < 3 ? '✓ ' : ''}{t.grade3Short}
            </button>
            <button
              onClick={() => {
                onSelectAllGrades();
                sounds.playClick();
              }}
              className={`px-1.5 sm:px-2 py-1 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer shrink-0 ${
                selectedGrades.length === 3
                  ? 'bg-amber-500 text-white shadow-sm scale-105'
                  : 'text-amber-800/60 hover:text-amber-950 hover:bg-amber-200/40'
              }`}
              title={t.gradeAll}
            >
              {t.gradeAllShort}
            </button>
          </div>

          {/* Star Balance & Shop Shortcut */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenShop();
            }}
            className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 px-2 sm:px-2.5 py-1 rounded-2xl text-amber-700 font-black text-xs sm:text-sm shadow-sm transition-transform hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            title={`${t.avatarShopTitle} — ${t.myStarBalance}: ${availableStars} ⭐ (${t.totalEarnedStarsLabel}: ${totalStars} ⭐)`}
          >
            <span className="text-base sm:text-lg">⭐</span>
            <span>{availableStars}</span>
            <span className="hidden sm:inline text-xs text-amber-500 font-bold">🛍️</span>
          </button>

          {/* Progress Statistics Button */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenStats();
            }}
            className="flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 border-2 border-indigo-300 px-2 sm:px-2.5 py-1 rounded-2xl text-indigo-700 font-black text-xs sm:text-sm shadow-sm transition-transform hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            title={t.progressStatsTitle}
          >
            <BarChart3 className="w-4 h-4 text-indigo-600" />
            <span className="hidden md:inline text-xs">{t.statsModal.title}</span>
          </button>

          {/* Language Switcher (LV / RU) */}
          <div className="flex bg-slate-100 p-1 rounded-2xl border-2 border-slate-200 shrink-0">
            <button
              onClick={() => {
                onLanguageChange('lv');
                sounds.playClick();
              }}
              className={`px-2 sm:px-2.5 py-1 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                language === 'lv'
                  ? 'bg-white text-indigo-700 shadow-sm scale-105'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Latviešu valoda"
            >
              🇱🇻 LV
            </button>
            <button
              onClick={() => {
                onLanguageChange('ru');
                sounds.playClick();
              }}
              className={`px-2 sm:px-2.5 py-1 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                language === 'ru'
                  ? 'bg-white text-indigo-700 shadow-sm scale-105'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Русский язык"
            >
              🇷🇺 RU
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-200 flex items-center justify-center text-slate-700 transition-colors shrink-0"
            title={stats.soundEnabled ? t.soundOn : t.soundOff}
          >
            {stats.soundEnabled ? (
              <Volume2 className="w-5 h-5 text-indigo-600" />
            ) : (
              <VolumeX className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {/* Cloud Sync Button */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenSync();
            }}
            className={`h-9 sm:h-10 px-2 sm:px-2.5 rounded-2xl border-2 flex items-center gap-1.5 transition-all text-xs font-bold shrink-0 ${
              isCloudSynced
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100'
                : 'bg-indigo-50 border-indigo-200 text-indigo-600 hover:bg-indigo-100'
            }`}
            title={isCloudSynced ? t.sync.synced : t.sync.notSynced}
          >
            {isCloudSynced ? (
              <div className="relative">
                <Cloud className="w-5 h-5 text-emerald-600" />
                <Check className="w-3 h-3 text-emerald-700 absolute -bottom-1 -right-1 stroke-[3]" />
              </div>
            ) : (
              <Cloud className="w-5 h-5 text-indigo-500" />
            )}
            <span className="hidden md:inline">
              {isCloudSynced ? t.sync.cloudShortBtn : t.sync.syncShortBtn}
            </span>
          </button>

          {/* Kid Avatar - opens Avatar Shop */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenShop();
            }}
            className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-amber-100 hover:bg-amber-200 border-2 border-amber-300 flex items-center justify-center text-xl sm:text-2xl shadow-sm hover:scale-105 active:scale-95 transition-transform cursor-pointer shrink-0"
            title={`${t.avatarShopTitle} (${getPlayerDisplayName(stats.playerName, language)})`}
          >
            <span>{stats.avatar || '🦁'}</span>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-amber-400 border border-white rounded-full flex items-center justify-center text-[9px] shadow-sm">
              🛍️
            </span>
          </button>
        </div>
      </div>

      {/* Right Arrow Scroll Indicator */}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 flex items-center pr-0.5 z-20 pointer-events-none">
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white via-white/85 to-transparent pointer-events-none" />
          <button
            type="button"
            onClick={() => scrollByAmount(180)}
            className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-600 hover:bg-indigo-700 active:scale-90 text-white flex items-center justify-center shadow-md animate-pulse pointer-events-auto cursor-pointer transition-transform"
            title="Прокрутить меню вбок"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      )}
    </div>
  </header>
);
};
