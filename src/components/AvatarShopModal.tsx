import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Language, UserStats, AvatarShopItem } from '../types';
import { AVATAR_SHOP_ITEMS, DEFAULT_UNLOCKED_AVATARS, AVATAR_ALIASES } from '../data/avatars';
import { translations, getPlayerDisplayName } from '../utils/i18n';
import { sounds } from '../utils/soundEffects';
import { AvatarBadge } from './AvatarBadge';
import { X, Check, Lock, Sparkles, ShoppingBag } from 'lucide-react';

interface AvatarShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  stats: UserStats;
  totalStarsEarned: number;
  onSelectAvatar: (avatarEmoji: string) => void;
  onPurchase: (avatarEmoji: string, price: number) => void;
}

type CategoryFilter = 'all' | 'starter' | 'simple' | 'medium' | 'unique' | 'legendary' | 'mythic';

export const AvatarShopModal: React.FC<AvatarShopModalProps> = ({
  isOpen,
  onClose,
  language,
  stats,
  totalStarsEarned,
  onSelectAvatar,
  onPurchase,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [purchasedJustNow, setPurchasedJustNow] = useState<string | null>(null);

  const t = translations[language];
  const spentStars = stats.spentStars || 0;
  const starBalance = Math.max(0, totalStarsEarned - spentStars);
  const unlockedSet = useMemo(() => {
    const set = new Set(stats.unlockedAvatars || DEFAULT_UNLOCKED_AVATARS);
    DEFAULT_UNLOCKED_AVATARS.forEach((a) => set.add(a));
    return set;
  }, [stats.unlockedAvatars]);

  if (!isOpen) return null;

  const categories: { id: CategoryFilter; label: string }[] = [
    { id: 'all', label: t.categoryAll },
    { id: 'starter', label: t.categoryStarter },
    { id: 'simple', label: t.categorySimple },
    { id: 'medium', label: t.categoryMedium },
    { id: 'unique', label: t.categoryUnique },
    { id: 'legendary', label: t.categoryLegendary },
    { id: 'mythic', label: t.categoryMythic },
  ];

  const filteredItems = AVATAR_SHOP_ITEMS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const handleBuy = (item: AvatarShopItem) => {
    if (starBalance < item.price) return;

    sounds.playCorrect();
    // Confetti pop
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
    });

    setPurchasedJustNow(item.id);
    setTimeout(() => setPurchasedJustNow(null), 2500);

    onPurchase(item.id, item.price);
  };

  const handleEquip = (item: AvatarShopItem) => {
    sounds.playClick();
    onSelectAvatar(item.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border-4 border-amber-300 flex flex-col overflow-hidden animate-pop">
        {/* Modal Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 flex items-center justify-between border-b-2 border-amber-300">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/30 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
              <ShoppingBag className="w-6 h-6 text-amber-950" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-amber-950 font-comic">
                {t.avatarShopTitle}
              </h2>
              <p className="text-xs text-amber-900 font-semibold hidden sm:block">
                {t.avatarShopSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Star Balance Badge */}
            <div className="flex items-center gap-1.5 bg-white/95 px-3.5 py-1.5 rounded-2xl shadow-md border-2 border-amber-300">
              <span className="text-xl">⭐</span>
              <span className="text-lg font-black text-amber-600">{starBalance}</span>
            </div>

            {/* Close Button */}
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="w-10 h-10 rounded-2xl bg-amber-950/10 hover:bg-amber-950/20 text-amber-950 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Player Profile Summary Bar */}
        <div className="px-5 py-3 bg-amber-50/80 border-b border-amber-200/80 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <AvatarBadge avatar={stats.avatar || '🦁'} size="md" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-slate-800 text-sm sm:text-base">
                  {getPlayerDisplayName(stats.playerName, language)}
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full">
                  {t.equipped}
                </span>
              </div>
              <div className="text-xs text-slate-500 font-medium">
                {t.totalEarnedStarsLabel}: <strong className="text-amber-600">⭐ {totalStarsEarned}</strong>
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold text-amber-800 bg-amber-100/80 px-3 py-1 rounded-xl border border-amber-300/60">
              {unlockedSet.size} / {AVATAR_SHOP_ITEMS.length}
            </span>
          </div>
        </div>

        {/* Success toast upon purchase */}
        {purchasedJustNow && (
          <div className="mx-4 mt-3 px-4 py-2 rounded-2xl bg-emerald-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md animate-bounce">
            <Sparkles className="w-5 h-5 text-yellow-200" />
            <span>{t.congratsAvatarPurchased}</span>
            <span className="text-2xl">{purchasedJustNow}</span>
          </div>
        )}

        {/* Category Filter Tabs */}
        <div className="px-3 sm:px-5 pt-3 pb-2.5 flex flex-wrap items-center gap-1.5 sm:gap-2 bg-slate-50/70 border-b border-slate-200/80">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            let activeClasses = 'bg-amber-500 text-white shadow-md scale-105';
            let inactiveClasses = 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs';

            if (cat.id === 'mythic') {
              activeClasses =
                'bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white shadow-md scale-105 ring-2 ring-pink-400 font-black';
              inactiveClasses =
                'bg-purple-50/80 hover:bg-purple-100 text-purple-900 border border-purple-300 shadow-2xs';
            } else if (cat.id === 'legendary') {
              activeClasses =
                'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md scale-105 font-black';
              inactiveClasses =
                'bg-indigo-50/80 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 shadow-2xs';
            } else if (cat.id === 'unique') {
              activeClasses =
                'bg-gradient-to-r from-amber-500 to-yellow-500 text-amber-950 shadow-md scale-105 font-black';
              inactiveClasses =
                'bg-amber-50/80 hover:bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs';
            }

            return (
              <button
                key={cat.id}
                onClick={() => {
                  sounds.playClick();
                  setSelectedCategory(cat.id);
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer ${
                  isSelected ? activeClasses : inactiveClasses
                }`}
              >
                {cat.id === 'mythic' ? `✨ ${cat.label}` : cat.label}
              </button>
            );
          })}
        </div>

        {/* Avatar Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {filteredItems.map((item) => {
            const isUnlocked =
              item.price === 0 ||
              unlockedSet.has(item.id) ||
              unlockedSet.has(item.emoji) ||
              Object.entries(AVATAR_ALIASES).some(([alias, target]) => target === item.id && unlockedSet.has(alias));
            const isEquipped =
              stats.avatar === item.id ||
              stats.avatar === item.emoji ||
              AVATAR_ALIASES[stats.avatar] === item.id;
            const canAfford = starBalance >= item.price;
            const name = item.name[language] || item.name.ru;
            const isUnique = item.category === 'unique';
            const isLegendary = item.category === 'legendary';
            const isMythic = item.category === 'mythic';

            return (
              <div
                key={item.id}
                className={`relative rounded-3xl p-3 sm:p-4 flex flex-col items-center justify-between text-center transition-all ${
                  isEquipped
                    ? 'bg-amber-50 border-3 border-amber-400 shadow-md scale-[1.02]'
                    : isMythic
                    ? `${item.vfx?.cardBg || 'bg-slate-900 border-2 border-purple-400'} shadow-md hover:scale-102`
                    : isLegendary
                    ? 'bg-gradient-to-b from-purple-50/80 via-white to-pink-50/50 border-2 border-purple-300 shadow-sm hover:border-purple-400'
                    : isUnique
                    ? 'bg-gradient-to-b from-amber-50/70 via-white to-yellow-50/40 border-2 border-amber-300 shadow-sm hover:border-amber-400'
                    : isUnlocked
                    ? 'bg-white border-2 border-slate-200 hover:border-amber-300 shadow-sm'
                    : 'bg-slate-50/80 border-2 border-slate-200/80'
                }`}
              >
                {/* Active checkmark */}
                {isEquipped && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                )}

                {/* Tier Badge */}
                <div className="mb-1">
                  {item.category === 'mythic' && (
                    <span className="text-[10px] font-black text-amber-300 bg-slate-950/90 border border-amber-400/80 px-2 py-0.5 rounded-full shadow-xs animate-pulse">
                      {t.tierBadgeMythic}
                    </span>
                  )}
                  {item.category === 'legendary' && (
                    <span className="text-[10px] font-black text-purple-900 bg-purple-100 border border-purple-300 px-2 py-0.5 rounded-full shadow-xs">
                      {t.tierBadgeLegendary}
                    </span>
                  )}
                  {item.category === 'unique' && (
                    <span className="text-[10px] font-black text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full shadow-xs">
                      {t.tierBadgeUnique}
                    </span>
                  )}
                  {item.category === 'medium' && (
                    <span className="text-[10px] font-black text-blue-900 bg-blue-100 border border-blue-300 px-2 py-0.5 rounded-full shadow-xs">
                      {t.tierBadgeMedium}
                    </span>
                  )}
                  {item.category === 'simple' && (
                    <span className="text-[10px] font-black text-emerald-900 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full shadow-xs">
                      {t.tierBadgeSimple}
                    </span>
                  )}
                  {item.category === 'starter' && (
                    <span className="text-[10px] font-black text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                      {t.freeStarter}
                    </span>
                  )}
                </div>

                {/* Avatar Badge & Preview */}
                <div className="mb-2 hover:scale-110 transition-transform select-none">
                  <AvatarBadge avatar={item.id} size="xl" showStars={true} animate={isMythic} />
                </div>

                {/* Avatar Name */}
                <h3 className={`text-xs sm:text-sm font-black mb-2 truncate w-full ${isMythic ? 'text-purple-950' : 'text-slate-800'}`}>
                  {name}
                </h3>

                {/* Action button */}
                {isEquipped ? (
                  <span className="w-full py-1.5 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                    {t.equipped}
                  </span>
                ) : isUnlocked ? (
                  <button
                    onClick={() => handleEquip(item)}
                    className="w-full py-1.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-black text-xs shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    {t.equip}
                  </button>
                ) : (
                  <button
                    onClick={() => handleBuy(item)}
                    disabled={!canAfford}
                    className={`w-full py-1.5 rounded-xl font-black text-xs flex items-center justify-center gap-1 transition-all ${
                      canAfford
                        ? isMythic
                          ? 'btn-3d bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md cursor-pointer hover:scale-105 active:scale-95 border-b-2 border-purple-800'
                          : isUnique
                          ? 'btn-3d bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 border-b-2 border-amber-600 text-amber-950 shadow-md cursor-pointer hover:scale-105 active:scale-95'
                          : 'btn-3d bg-amber-400 hover:bg-amber-300 border-b-2 border-amber-600 text-amber-950 shadow-md cursor-pointer hover:scale-105 active:scale-95'
                        : 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed'
                    }`}
                    title={canAfford ? '' : `${t.notEnoughStars} (${item.price - starBalance} ⭐)`}
                  >
                    {!canAfford && <Lock className="w-3.5 h-3.5" />}
                    <span>⭐ {item.price}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer info note */}
        <div className="px-5 py-2.5 bg-slate-100 border-t border-slate-200 text-center text-xs text-slate-500 font-medium">
          {t.shopNotice}
        </div>
      </div>
    </div>
  );
};
