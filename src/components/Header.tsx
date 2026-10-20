import React from 'react';
import { Volume2, VolumeX, Cloud, Check, Sparkles, BarChart3 } from 'lucide-react';
import { Language, UserStats, LearningCourse } from '../types';
import { translations, getPlayerDisplayName } from '../utils/i18n';
import { sounds } from '../utils/soundEffects';
import { FlagIcon } from './FlagIcon';
import { AvatarBadge } from './AvatarBadge';

interface HeaderProps {
  course: LearningCourse;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  stats: UserStats;
  totalStars: number;
  availableStars: number;
  isCloudSynced: boolean;
  onOpenSync: () => void;
  onOpenShop: () => void;
  onOpenStats: () => void;
  onUpdateStats: (newStats: UserStats) => void;
  onHomeClick: () => void;
  isGameActive?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  course,
  language,
  onLanguageChange,
  stats,
  totalStars,
  availableStars,
  isCloudSynced,
  onOpenSync,
  onOpenShop,
  onOpenStats,
  onUpdateStats,
  onHomeClick,
  isGameActive = false,
}) => {
  const t = translations[language];

  const toggleSound = () => {
    const updated = !stats.soundEnabled;
    sounds.enabled = updated;
    onUpdateStats({ ...stats, soundEnabled: updated });
    if (updated) sounds.playClick();
  };

  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-40 shadow-sm border-b-2 border-indigo-100 px-2 sm:px-6 py-1.5 sm:py-2 w-full">
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between gap-1.5 sm:gap-4">
        {/* Logo and Home Button */}
        <button
          onClick={onHomeClick}
          className="flex items-center gap-1.5 sm:gap-2 group text-left cursor-pointer focus:outline-none shrink-0"
          title={t.allTopics}
        >
          <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform shrink-0">
            <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 animate-pulse" />
          </div>
          <div className="flex flex-col items-start shrink-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1.5">
              <span className="text-base sm:text-2xl font-black tracking-tight text-indigo-600 font-comic whitespace-nowrap leading-none sm:leading-normal">
                Wordy<span className="text-pink-500">Mind</span>
              </span>
              <span
                className={`inline-flex items-center gap-1 px-1.5 sm:px-2 py-0 sm:py-0.5 mt-0.5 sm:mt-0 rounded-full text-[9px] sm:text-[11px] font-black border shadow-2xs w-fit ${
                  course === 'lv'
                    ? 'bg-emerald-50 text-[#1E5E43] border-emerald-200'
                    : course === 'en-lv' || language === 'lv'
                    ? 'bg-teal-50 text-teal-800 border-teal-200'
                    : 'bg-sky-50 text-sky-800 border-sky-200'
                }`}
              >
                <FlagIcon country={course === 'lv' ? 'lv' : 'gb'} size="xs" />
                <span>
                  {course === 'lv'
                    ? 'LV–RU'
                    : course === 'en-lv' || language === 'lv'
                    ? 'EN–LV'
                    : 'EN–RU'}
                </span>
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium -mt-0.5 hidden md:flex items-center gap-1.5 whitespace-nowrap">
              <span>
                {course === 'lv' ? t.courseLatvianSubtitle : t.appSubtitle}
              </span>
            </p>
          </div>
        </button>

        {/* Right side controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Combined Avatar + Star Balance & Shop Shortcut */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenShop();
            }}
            className="flex items-center gap-1 sm:gap-1.5 bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 pl-1 pr-2 sm:px-2.5 py-0.5 sm:py-1 rounded-xl sm:rounded-2xl text-amber-700 font-black text-xs sm:text-sm shadow-sm transition-transform hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            title={`${t.avatarShopTitle} (${getPlayerDisplayName(stats.playerName, language)}) — ${t.myStarBalance}: ${availableStars} ⭐ (${t.totalEarnedStarsLabel}: ${totalStars} ⭐)`}
          >
            <div className="scale-75 sm:scale-90 -my-1 -ml-0.5 shrink-0">
              <AvatarBadge avatar={stats.avatar || '🦁'} size="sm" />
            </div>
            <span className="text-xs sm:text-base leading-none">⭐</span>
            <span>{availableStars}</span>
            <span className="hidden sm:inline text-xs text-amber-500 font-bold">🛍️</span>
          </button>

          {/* Progress Statistics Button */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenStats();
            }}
            className="w-8 h-8 sm:w-auto sm:h-10 sm:px-2.5 rounded-xl sm:rounded-2xl bg-indigo-50 hover:bg-indigo-100 border-2 border-indigo-300 flex items-center justify-center gap-1.5 text-indigo-700 font-black text-sm shadow-sm transition-transform hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            title={t.progressStatsTitle}
          >
            <BarChart3 className="w-4 h-4 text-indigo-600" />
            <span className="hidden md:inline text-xs">{t.statsModal.title}</span>
          </button>

          {/* Interface Language Switcher (LV / RU) */}
          <div
            className="flex items-center bg-slate-100/90 p-0.5 sm:p-1 rounded-xl sm:rounded-2xl border-2 border-slate-200 shrink-0"
            title={`${t.interfaceLanguageLabel}: LV / RU`}
          >
            <button
              onClick={() => {
                onLanguageChange('lv');
                sounds.playClick();
              }}
              className={`px-1.5 sm:px-2.5 py-1 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-bold transition-all cursor-pointer ${
                language === 'lv'
                  ? 'bg-white text-indigo-700 shadow-sm scale-105 font-black'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Latviešu valoda (interfeiss)"
            >
              LV
            </button>
            <button
              onClick={() => {
                onLanguageChange('ru');
                sounds.playClick();
              }}
              className={`px-1.5 sm:px-2.5 py-1 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-bold transition-all cursor-pointer ${
                language === 'ru'
                  ? 'bg-white text-indigo-700 shadow-sm scale-105 font-black'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Русский язык (интерфейс)"
            >
              RU
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-200 flex items-center justify-center text-slate-700 transition-colors shrink-0 cursor-pointer"
            title={stats.soundEnabled ? t.soundOn : t.soundOff}
          >
            {stats.soundEnabled ? (
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
            ) : (
              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
            )}
          </button>

          {/* Cloud Sync Button */}
          <button
            onClick={() => {
              if (isGameActive) return;
              sounds.playClick();
              onOpenSync();
            }}
            disabled={isGameActive}
            className={`w-8 h-8 sm:w-auto sm:h-10 sm:px-2.5 rounded-xl sm:rounded-2xl border-2 flex items-center justify-center gap-1.5 transition-all text-sm font-bold shrink-0 ${
              isGameActive
                ? 'opacity-50 cursor-not-allowed bg-slate-100 border-slate-200 text-slate-400'
                : isCloudSynced
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100 cursor-pointer'
                : 'bg-indigo-50 border-indigo-200 text-indigo-600 hover:bg-indigo-100 cursor-pointer'
            }`}
            title={
              isGameActive
                ? language === 'ru'
                  ? 'Синхронизация на паузе во время игры'
                  : 'Sinhronizācija ir pauzēta spēles laikā'
                : isCloudSynced
                ? t.sync.synced
                : t.sync.notSynced
            }
          >
            {isCloudSynced ? (
              <div className="relative">
                <Cloud className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-700 absolute -bottom-1 -right-1 stroke-[3]" />
              </div>
            ) : (
              <Cloud className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />
            )}
            <span className="hidden md:inline">
              {isCloudSynced ? t.sync.cloudShortBtn : t.sync.syncShortBtn}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

