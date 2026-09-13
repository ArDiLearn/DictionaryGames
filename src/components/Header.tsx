import React, { useState } from 'react';
import { Volume2, VolumeX, Cloud, Check, Sparkles } from 'lucide-react';
import { Language, UserStats, Grade } from '../types';
import { translations } from '../utils/i18n';
import { sounds } from '../utils/soundEffects';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  selectedGrade: Grade;
  onGradeChange: (grade: Grade) => void;
  stats: UserStats;
  totalStars: number;
  isCloudSynced: boolean;
  onOpenSync: () => void;
  onUpdateStats: (newStats: UserStats) => void;
  onHomeClick: () => void;
}

const AVATARS = ['🦁', '🐱', '🐶', '🐼', '🦊', '🦄', '🚀', '⭐', '🦖', '🐬'];

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  selectedGrade,
  onGradeChange,
  stats,
  totalStars,
  isCloudSynced,
  onOpenSync,
  onUpdateStats,
  onHomeClick,
}) => {
  const t = translations[language];
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const toggleSound = () => {
    const updated = !stats.soundEnabled;
    sounds.enabled = updated;
    onUpdateStats({ ...stats, soundEnabled: updated });
    if (updated) sounds.playClick();
  };

  const handleSelectAvatar = (avatar: string) => {
    onUpdateStats({ ...stats, avatar });
    setShowAvatarPicker(false);
    sounds.playCorrect();
  };

  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-40 shadow-sm border-b-2 border-indigo-100 px-3 sm:px-6 py-2.5">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
        {/* Logo and Home Button */}
        <button
          onClick={onHomeClick}
          className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
          title={t.allTopics}
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-indigo-600 font-comic">
                Wordy<span className="text-pink-500">Kids</span>
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-medium -mt-1 hidden xs:block">
              {t.appSubtitle}
            </p>
          </div>
        </button>

        {/* Right side controls */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Grade Switcher (1st / 2nd Grade) */}
          <div
            className="flex bg-amber-100/90 p-1 rounded-2xl border-2 border-amber-300 shadow-sm"
            title={`${t.gradeSelectorLabel}: ${selectedGrade === 1 ? t.grade1 : t.grade2}`}
          >
            <button
              onClick={() => {
                onGradeChange(1);
                sounds.playClick();
              }}
              className={`px-2 sm:px-2.5 py-1 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                selectedGrade === 1
                  ? 'bg-amber-500 text-white shadow-sm scale-105'
                  : 'text-amber-800 hover:text-amber-950'
              }`}
              title={t.grade1}
            >
              {t.grade1Short}
            </button>
            <button
              onClick={() => {
                onGradeChange(2);
                sounds.playClick();
              }}
              className={`px-2 sm:px-2.5 py-1 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                selectedGrade === 2
                  ? 'bg-amber-500 text-white shadow-sm scale-105'
                  : 'text-amber-800 hover:text-amber-950'
              }`}
              title={t.grade2}
            >
              {t.grade2Short}
            </button>
          </div>

          {/* Total Stars Counter */}
          <div className="flex items-center gap-1 bg-amber-50 border-2 border-amber-300 px-2.5 py-1 rounded-full text-amber-600 font-bold text-sm sm:text-base shadow-sm">
            <span className="text-lg">⭐</span>
            <span>{totalStars}</span>
          </div>

          {/* Language Switcher (RU / LV) */}
          <div className="flex bg-slate-100 p-1 rounded-2xl border-2 border-slate-200">
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
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-200 flex items-center justify-center text-slate-700 transition-colors"
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
            className={`h-9 sm:h-10 px-2 sm:px-2.5 rounded-2xl border-2 flex items-center gap-1.5 transition-all text-xs font-bold ${
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

          {/* Kid Avatar */}
          <div className="relative">
            <button
              onClick={() => {
                sounds.playClick();
                setShowAvatarPicker(!showAvatarPicker);
              }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-xl sm:text-2xl shadow-sm hover:scale-105 active:scale-95 transition-transform"
              title={t.changeAvatar}
            >
              {stats.avatar || '🦁'}
            </button>

            {/* Avatar Dropdown Picker */}
            {showAvatarPicker && (
              <div className="absolute right-0 mt-2 p-2 bg-white rounded-3xl shadow-xl border-2 border-slate-200 z-50 flex gap-2 flex-wrap w-56 animate-pop">
                <div className="w-full text-center text-xs font-bold text-slate-500 mb-1">
                  {t.changeAvatar}
                </div>
                {AVATARS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleSelectAvatar(emoji)}
                    className="w-10 h-10 rounded-2xl bg-slate-50 hover:bg-amber-100 flex items-center justify-center text-2xl transition-transform hover:scale-110 active:scale-95"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
