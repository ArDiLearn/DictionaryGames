import React, { useState } from 'react';
import { Language, UserStats, TitleCategory } from '../types';
import { PLAYER_TITLES, DEFAULT_UNLOCKED_TITLES, getTitleById } from '../data/titles';
import { translations, getPlayerDisplayName } from '../utils/i18n';
import { sounds } from '../utils/soundEffects';
import { AvatarBadge } from './AvatarBadge';
import { X, Check, Lock, Sparkles, Calendar, CheckCircle2 } from 'lucide-react';

interface TitleSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  stats: UserStats;
  onEquipTitle: (titleId: string) => void;
}

type FilterCategory = 'all' | TitleCategory;

export const TitleSelectModal: React.FC<TitleSelectModalProps> = ({
  isOpen,
  onClose,
  language,
  stats,
  onEquipTitle,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');

  if (!isOpen) return null;

  const t = translations[language];
  const unlockedSet = new Set(stats.unlockedTitleIds || DEFAULT_UNLOCKED_TITLES);
  const equippedId = stats.equippedTitleId || 'starter';
  const activeDays = stats.totalActiveDays || (stats.activeDates?.length ?? 1);

  // Category filters
  const categories: { id: FilterCategory; label: string }[] = [
    { id: 'all', label: t.titleCategoryAll },
    { id: 'academic', label: t.titleCategoryAcademic },
    { id: 'words', label: t.titleCategoryWords },
    { id: 'topics', label: t.titleCategoryTopics },
    { id: 'activity', label: t.titleCategoryActivity },
  ];

  const filteredTitles = PLAYER_TITLES.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const equippedTitle = getTitleById(equippedId);

  // Next active days goal
  const activityGoals = [3, 7, 15, 30];
  const nextGoal = activityGoals.find((g) => g > activeDays);

  const handleEquip = (titleId: string) => {
    if (titleId === equippedId) return;
    sounds.playClick();
    onEquipTitle(titleId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-white shadow-2xl border-4 border-amber-300 overflow-hidden">
        
        {/* Modal Top Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 border-b-2 border-amber-300 shadow-sm shrink-0">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/30 backdrop-blur border border-white/50 flex items-center justify-center text-2xl sm:text-3xl shadow-sm">
                🎖️
              </div>
              <div>
                <h2 className="text-lg sm:text-2xl font-black text-amber-950 font-comic leading-tight">
                  {t.titlesModalTitle}
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-amber-900/80">
                  {t.titlesModalSubtitle}
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="w-10 h-10 rounded-2xl bg-amber-950/10 hover:bg-amber-950/20 text-amber-950 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Player Banner & "Календарь усердия" */}
        <div className="px-5 py-3.5 bg-amber-50/90 border-b border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          {/* Current equipped title display */}
          <div className="flex items-center gap-3">
            <AvatarBadge avatar={stats.avatar || '🦁'} size="md" />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-black text-slate-800 text-sm sm:text-base">
                  {getPlayerDisplayName(stats.playerName, language)}
                </span>
                <span className="inline-flex items-center gap-1 text-xs bg-amber-200/90 text-amber-900 font-extrabold px-2.5 py-0.5 rounded-full border border-amber-300/80 shadow-xs">
                  <span>{equippedTitle.icon}</span>
                  <span>{equippedTitle.name[language] || equippedTitle.name.ru}</span>
                </span>
              </div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">
                {t.equippedTitleBadge}: <strong>{equippedTitle.name[language] || equippedTitle.name.ru}</strong>
              </div>
            </div>
          </div>

          {/* Activity Days Tracker (Never burns / non-coercive) */}
          <div className="flex items-center gap-3 bg-white/90 px-3.5 py-2 rounded-2xl border border-amber-200 shadow-xs self-start sm:self-auto">
            <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-black text-sm">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-black text-slate-800 flex items-center gap-1">
                <span>{t.activeDaysLabel}:</span>
                <span className="text-amber-600 font-black text-sm">{activeDays}</span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium leading-none">
                {nextGoal ? (
                  <span>{activeDays} / {nextGoal} {t.activeDaysSubtitle}</span>
                ) : (
                  <span className="text-emerald-600 font-bold">✨ {t.activeDaysSubtitle}</span>
                )}
              </div>
            </div>
            <div className="ml-2 pl-2 border-l border-slate-200 text-right">
              <span className="text-xs font-black text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-lg">
                {unlockedSet.size} / {PLAYER_TITLES.length}
              </span>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="px-5 pt-3 pb-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 bg-white border-b border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sounds.playClick();
                setSelectedCategory(cat.id);
              }}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer select-none ${
                selectedCategory === cat.id
                  ? 'bg-amber-400 text-amber-950 shadow-sm scale-102 ring-2 ring-amber-400/40'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Titles Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredTitles.map((title) => {
              const isUnlocked = unlockedSet.has(title.id);
              const isEquipped = title.id === equippedId;
              const titleName = title.name[language] || title.name.ru;
              const titleDesc = title.desc[language] || title.desc.ru;

              return (
                <div
                  key={title.id}
                  className={`relative rounded-2xl p-4 flex flex-col justify-between transition-all border-2 ${
                    isEquipped
                      ? 'bg-gradient-to-br from-amber-50 to-yellow-100/70 border-amber-400 shadow-md ring-2 ring-amber-400/30'
                      : isUnlocked
                      ? 'bg-white hover:bg-amber-50/40 border-slate-200 hover:border-amber-300 shadow-sm'
                      : 'bg-slate-50/70 border-slate-200 opacity-60'
                  }`}
                >
                  <div>
                    {/* Icon & Status Pill */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-xs flex items-center justify-center text-3xl">
                        {title.icon}
                      </div>
                      <div>
                        {isEquipped ? (
                          <span className="inline-flex items-center gap-1 bg-emerald-500 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-xs">
                            <Check className="w-3.5 h-3.5" />
                            <span>{t.equippedTitleBadge}</span>
                          </span>
                        ) : isUnlocked ? (
                          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[11px] font-extrabold px-2 py-0.5 rounded-full border border-amber-200">
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            <span>OK</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-slate-200 text-slate-600 text-[11px] font-bold px-2 py-0.5 rounded-full">
                            <Lock className="w-3 h-3" />
                            <span>{t.lockedTitleBadge}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title Name & Description */}
                    <h3 className="text-base font-black text-slate-800 leading-tight">
                      {titleName}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1 leading-snug">
                      {titleDesc}
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    {isEquipped ? (
                      <span className="text-xs font-extrabold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{t.equippedTitleBadge}</span>
                      </span>
                    ) : isUnlocked ? (
                      <button
                        onClick={() => handleEquip(title.id)}
                        className="w-full py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-500 active:scale-95 text-amber-950 font-black text-xs sm:text-sm shadow-sm transition-all cursor-pointer text-center"
                      >
                        {t.equipTitleAction}
                      </button>
                    ) : (
                      <span className="w-full py-2 px-3 rounded-xl bg-slate-100 text-slate-400 font-bold text-xs text-center flex items-center justify-center gap-1 select-none">
                        <Lock className="w-3.5 h-3.5" />
                        <span>{t.lockedTitleBadge}</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
