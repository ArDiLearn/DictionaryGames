import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Language, UserStats, AvatarShopItem, ShopTab, VictoryAnimationItem, VictoryMusicItem } from '../types';
import { AVATAR_SHOP_ITEMS, DEFAULT_UNLOCKED_AVATARS, AVATAR_ALIASES } from '../data/avatars';
import { VICTORY_ANIMATION_ITEMS, VICTORY_MUSIC_ITEMS } from '../data/shopCustomizations';
import { translations } from '../utils/i18n';
import { sounds } from '../utils/soundEffects';
import { triggerVictoryAnimation, cancelVictoryAnimation } from './VictoryEffects';
import { AvatarBadge } from './AvatarBadge';
import { X, Check, Lock, Sparkles, ShoppingBag, Volume2, Play, ChevronDown } from 'lucide-react';

interface AvatarShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  stats: UserStats;
  totalStarsEarned: number;
  onSelectAvatar: (avatarEmoji: string) => void;
  onPurchase: (avatarEmoji: string, price: number) => void;
  onEquipAnimation?: (animationId: string) => void;
  onPurchaseAnimation?: (animationId: string, price: number) => void;
  onEquipMusic?: (musicId: string) => void;
  onPurchaseMusic?: (musicId: string, price: number) => void;
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
  onEquipAnimation,
  onPurchaseAnimation,
  onEquipMusic,
  onPurchaseMusic,
}) => {
  const [activeTab, setActiveTab] = useState<ShopTab>('avatars');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [unlockedItem, setUnlockedItem] = useState<AvatarShopItem | null>(null);
  const [previewingMusicId, setPreviewingMusicId] = useState<string | null>(null);

  React.useEffect(() => {
    return () => {
      cancelVictoryAnimation();
    };
  }, []);

  const t = translations[language];
  const spentStars = stats.spentStars || 0;
  const starBalance = Math.max(0, totalStarsEarned - spentStars);

  const unlockedSet = useMemo(() => {
    const set = new Set(stats.unlockedAvatars || DEFAULT_UNLOCKED_AVATARS);
    DEFAULT_UNLOCKED_AVATARS.forEach((a) => set.add(a));
    return set;
  }, [stats.unlockedAvatars]);

  const unlockedAnimationsSet = useMemo(() => {
    return new Set(stats.unlockedVictoryAnimations || ['confetti']);
  }, [stats.unlockedVictoryAnimations]);

  const unlockedMusicSet = useMemo(() => {
    return new Set(stats.unlockedVictoryMusic || ['classic']);
  }, [stats.unlockedVictoryMusic]);

  const equippedAnimation = stats.equippedVictoryAnimation || 'confetti';
  const equippedMusic = stats.equippedVictoryMusic || 'classic';

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

    // Victory sound!
    const isEpic = item.category === 'mythic' || item.category === 'legendary' || item.category === 'unique';
    sounds.playUnlockFanfare(isEpic);

    // Multi-stage victory confetti bursts!
    confetti({
      particleCount: 65,
      spread: 90,
      origin: { y: 0.55 },
      colors: ['#f59e0b', '#fbbf24', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 60,
        origin: { x: 0.05, y: 0.65 },
        colors: ['#f59e0b', '#fbbf24', '#ec4899', '#8b5cf6'],
      });
    }, 180);

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 60,
        origin: { x: 0.95, y: 0.65 },
        colors: ['#f59e0b', '#fbbf24', '#ec4899', '#8b5cf6'],
      });
    }, 360);

    // Open victory celebration modal for this unlocked hero
    setUnlockedItem(item);

    onPurchase(item.emoji, item.price);
  };

  const handleEquip = (item: AvatarShopItem) => {
    sounds.playClick();
    onSelectAvatar(item.emoji);
  };

  const handlePreviewAnimation = (item: VictoryAnimationItem) => {
    sounds.playClick();
    triggerVictoryAnimation(item.id);
  };

  const handleBuyAnimation = (item: VictoryAnimationItem) => {
    if (starBalance < item.price) return;
    sounds.playUnlockFanfare(true);
    triggerVictoryAnimation(item.id);
    onPurchaseAnimation?.(item.id, item.price);
  };

  const handleEquipAnimation = (item: VictoryAnimationItem) => {
    sounds.playClick();
    triggerVictoryAnimation(item.id);
    onEquipAnimation?.(item.id);
  };

  const handlePreviewMusic = (item: VictoryMusicItem) => {
    setPreviewingMusicId(item.id);
    sounds.playVictoryTheme(item.id);
    setTimeout(() => {
      setPreviewingMusicId((prev) => (prev === item.id ? null : prev));
    }, 2500);
  };

  const handleBuyMusic = (item: VictoryMusicItem) => {
    if (starBalance < item.price) return;
    sounds.playUnlockFanfare(false);
    setTimeout(() => sounds.playVictoryTheme(item.id), 300);
    onPurchaseMusic?.(item.id, item.price);
  };

  const handleEquipMusic = (item: VictoryMusicItem) => {
    sounds.playClick();
    sounds.playVictoryTheme(item.id);
    onEquipMusic?.(item.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl h-[94vh] sm:max-h-[90vh] bg-white rounded-3xl shadow-2xl border-4 border-amber-300 flex flex-col overflow-hidden animate-pop">
        {/* Modal Header */}
        <div className="px-4 py-2.5 sm:px-5 sm:py-3.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 flex items-center justify-between border-b-2 border-amber-300 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white/30 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-amber-950" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-black text-amber-950 font-comic leading-tight">
                {t.avatarShopTitle}
              </h2>
              <p className="text-[11px] sm:text-xs text-amber-900 font-semibold hidden sm:block">
                {t.avatarShopSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Star Balance Badge */}
            <div className="flex items-center gap-1.5 bg-white/95 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-xl sm:rounded-2xl shadow-md border-2 border-amber-300">
              <span className="text-base sm:text-xl">⭐</span>
              <span className="text-base sm:text-lg font-black text-amber-600">{starBalance}</span>
            </div>

            {/* Close Button */}
            <button
              onClick={() => {
                sounds.playClick();
                cancelVictoryAnimation();
                onClose();
              }}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-amber-950/10 hover:bg-amber-950/20 text-amber-950 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Unified Navigation & Filter Bar */}
        <div className="px-3 sm:px-4 py-2 flex items-center justify-between gap-2 bg-gradient-to-r from-amber-100/70 via-yellow-100/60 to-amber-100/70 border-b border-amber-200 shrink-0 flex-wrap">
          {/* Section Tabs: Heroes | Animations | Music */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            <button
              onClick={() => {
                sounds.playClick();
                cancelVictoryAnimation();
                setActiveTab('avatars');
              }}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-1 transition-all cursor-pointer ${
                activeTab === 'avatars'
                  ? 'bg-amber-500 text-white shadow-md scale-102'
                  : 'bg-white text-slate-700 border border-amber-200 hover:bg-amber-50'
              }`}
            >
              <span>🎭</span>
              <span>{t.shopTabAvatars}</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                cancelVictoryAnimation();
                setActiveTab('animations');
              }}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-1 transition-all cursor-pointer ${
                activeTab === 'animations'
                  ? 'bg-amber-500 text-white shadow-md scale-102'
                  : 'bg-white text-slate-700 border border-amber-200 hover:bg-amber-50'
              }`}
            >
              <span>✨</span>
              <span>{t.shopTabAnimations}</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                cancelVictoryAnimation();
                setActiveTab('music');
              }}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-1 transition-all cursor-pointer ${
                activeTab === 'music'
                  ? 'bg-amber-500 text-white shadow-md scale-102'
                  : 'bg-white text-slate-700 border border-amber-200 hover:bg-amber-50'
              }`}
            >
              <span>🎵</span>
              <span>{t.shopTabMusic}</span>
            </button>
          </div>

          {/* Compact Category Dropdown (for Avatars Tab) */}
          {activeTab === 'avatars' && (
            <div className="relative flex items-center ml-auto">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  sounds.playClick();
                  setSelectedCategory(e.target.value as CategoryFilter);
                }}
                className="appearance-none bg-white hover:bg-amber-50 text-slate-800 font-black text-xs sm:text-sm pl-3 pr-8 py-1.5 rounded-xl border-2 border-amber-300 shadow-xs focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.id === 'mythic' ? `✨ ${cat.label}` : cat.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-2.5 pointer-events-none text-amber-700">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          )}

          {/* Counts badge for Animations & Music tabs */}
          {activeTab === 'animations' && (
            <span className="text-[11px] sm:text-xs font-bold text-amber-800 bg-amber-200/60 px-2.5 py-1 rounded-xl border border-amber-300/80 ml-auto">
              {unlockedAnimationsSet.size} / {VICTORY_ANIMATION_ITEMS.length}
            </span>
          )}
          {activeTab === 'music' && (
            <span className="text-[11px] sm:text-xs font-bold text-amber-800 bg-amber-200/60 px-2.5 py-1 rounded-xl border border-amber-300/80 ml-auto">
              {unlockedMusicSet.size} / {VICTORY_MUSIC_ITEMS.length}
            </span>
          )}
        </div>

        {/* Tab 1: Avatars Content */}
        {activeTab === 'avatars' && (
          <>
            {/* Avatar Grid */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-4">
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
                      <AvatarBadge avatar={item.emoji} size="xl" showStars={true} animate={isMythic} />
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
          </>
        )}

        {/* Tab 2: Victory Animations Content */}
        {activeTab === 'animations' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            {VICTORY_ANIMATION_ITEMS.map((item) => {
              const isUnlocked = item.price === 0 || unlockedAnimationsSet.has(item.id);
              const isEquipped = equippedAnimation === item.id;
              const canAfford = starBalance >= item.price;
              const name = item.name[language] || item.name.ru;
              const desc = item.desc[language] || item.desc.ru;

              return (
                <div
                  key={item.id}
                  className={`relative rounded-3xl p-4 flex flex-col justify-between border-2 transition-all ${
                    isEquipped
                      ? 'bg-amber-50/90 border-amber-400 shadow-md ring-2 ring-amber-300'
                      : isUnlocked
                      ? 'bg-white border-slate-200 hover:border-amber-300 shadow-sm'
                      : 'bg-slate-50/90 border-slate-200/80'
                  }`}
                >
                  {isEquipped && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}

                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl shadow-inner shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex-1 pr-6">
                      <h3 className="text-base font-black text-slate-800 leading-snug">
                        {name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => handlePreviewAnimation(item)}
                      className="px-3 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
                      title={t.previewEffect}
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{t.previewEffect}</span>
                    </button>

                    <div className="flex-1">
                      {isEquipped ? (
                        <span className="w-full py-2 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center justify-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>{t.equippedBadge}</span>
                        </span>
                      ) : isUnlocked ? (
                        <button
                          onClick={() => handleEquipAnimation(item)}
                          className="w-full py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-black text-xs shadow-sm hover:scale-102 active:scale-98 transition-all cursor-pointer"
                        >
                          {t.equip}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBuyAnimation(item)}
                          disabled={!canAfford}
                          className={`w-full py-2 rounded-xl font-black text-xs flex items-center justify-center gap-1 transition-all ${
                            canAfford
                              ? 'btn-3d bg-amber-400 hover:bg-amber-300 border-b-2 border-amber-600 text-amber-950 shadow-md cursor-pointer hover:scale-102 active:scale-98'
                              : 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed'
                          }`}
                          title={canAfford ? '' : `${t.notEnoughStars} (${item.price - starBalance} ⭐)`}
                        >
                          {!canAfford && <Lock className="w-3.5 h-3.5" />}
                          <span>⭐ {item.price}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 3: Victory Music Content */}
        {activeTab === 'music' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            {VICTORY_MUSIC_ITEMS.map((item) => {
              const isUnlocked = item.price === 0 || unlockedMusicSet.has(item.id);
              const isEquipped = equippedMusic === item.id;
              const canAfford = starBalance >= item.price;
              const isPlaying = previewingMusicId === item.id;
              const name = item.name[language] || item.name.ru;
              const desc = item.desc[language] || item.desc.ru;

              return (
                <div
                  key={item.id}
                  className={`relative rounded-3xl p-4 flex flex-col justify-between border-2 transition-all ${
                    isEquipped
                      ? 'bg-amber-50/90 border-amber-400 shadow-md ring-2 ring-amber-300'
                      : isUnlocked
                      ? 'bg-white border-slate-200 hover:border-amber-300 shadow-sm'
                      : 'bg-slate-50/90 border-slate-200/80'
                  }`}
                >
                  {isEquipped && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}

                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner shrink-0 transition-transform ${
                      isPlaying ? 'bg-amber-300 scale-110 animate-bounce' : 'bg-amber-100'
                    }`}>
                      {item.icon}
                    </div>
                    <div className="flex-1 pr-6">
                      <h3 className="text-base font-black text-slate-800 leading-snug">
                        {name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => handlePreviewMusic(item)}
                      className={`px-3 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                        isPlaying
                          ? 'bg-amber-400 text-amber-950 animate-pulse'
                          : 'bg-amber-100 hover:bg-amber-200 text-amber-900'
                      }`}
                      title={t.listen}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{isPlaying ? '▶ ...' : t.listen}</span>
                    </button>

                    <div className="flex-1">
                      {isEquipped ? (
                        <span className="w-full py-2 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center justify-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>{t.equippedBadge}</span>
                        </span>
                      ) : isUnlocked ? (
                        <button
                          onClick={() => handleEquipMusic(item)}
                          className="w-full py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-black text-xs shadow-sm hover:scale-102 active:scale-98 transition-all cursor-pointer"
                        >
                          {t.equip}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBuyMusic(item)}
                          disabled={!canAfford}
                          className={`w-full py-2 rounded-xl font-black text-xs flex items-center justify-center gap-1 transition-all ${
                            canAfford
                              ? 'btn-3d bg-amber-400 hover:bg-amber-300 border-b-2 border-amber-600 text-amber-950 shadow-md cursor-pointer hover:scale-102 active:scale-98'
                              : 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed'
                          }`}
                          title={canAfford ? '' : `${t.notEnoughStars} (${item.price - starBalance} ⭐)`}
                        >
                          {!canAfford && <Lock className="w-3.5 h-3.5" />}
                          <span>⭐ {item.price}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer info note */}
        <div className="px-5 py-2.5 bg-slate-100 border-t border-slate-200 text-center text-xs text-slate-500 font-medium">
          {t.shopNotice}
        </div>

        {/* Victory Celebration Overlay */}
        {unlockedItem && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-sm bg-gradient-to-b from-amber-50 via-white to-amber-100 rounded-3xl p-6 sm:p-7 border-4 border-amber-400 shadow-2xl text-center flex flex-col items-center animate-pop overflow-hidden">
              {/* Background ambient light */}
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-amber-300 rounded-full blur-3xl opacity-50 pointer-events-none animate-pulse" />
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-300 rounded-full blur-3xl opacity-40 pointer-events-none animate-pulse" />

              {/* Close X */}
              <button
                onClick={() => setUnlockedItem(null)}
                className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Top banner pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/30 border border-amber-500/40 text-amber-950 text-xs font-black uppercase tracking-wider mb-2 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{t.congratsAvatarPurchased}</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              </div>

              {/* Big Avatar Badge with bouncing animation */}
              <div className="my-3 scale-110 drop-shadow-xl animate-bounce">
                <AvatarBadge
                  avatar={unlockedItem.emoji}
                  size="2xl"
                  showStars={true}
                  animate={true}
                />
              </div>

              {/* Character name */}
              <h3 className="text-2xl font-black text-slate-900 mt-1 font-comic">
                {unlockedItem.name[language] || unlockedItem.name.ru}
              </h3>

              {/* Category tier badge */}
              <div className="mt-1 mb-5">
                <span className="text-xs font-extrabold px-3 py-0.5 rounded-full bg-amber-200 text-amber-900 border border-amber-300 shadow-xs">
                  {unlockedItem.category === 'mythic'
                    ? t.tierBadgeMythic
                    : unlockedItem.category === 'legendary'
                    ? t.tierBadgeLegendary
                    : unlockedItem.category === 'unique'
                    ? t.tierBadgeUnique
                    : unlockedItem.category === 'medium'
                    ? t.tierBadgeMedium
                    : t.tierBadgeSimple}
                </span>
              </div>

              {/* Action buttons */}
              <div className="w-full flex flex-col gap-2">
                <button
                  onClick={() => {
                    handleEquip(unlockedItem);
                    setUnlockedItem(null);
                  }}
                  className="btn-3d w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-base shadow-lg border-2 border-emerald-400 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Check className="w-5 h-5 stroke-[3]" />
                  <span>{t.equipNow}</span>
                </button>

                <button
                  onClick={() => setUnlockedItem(null)}
                  className="py-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  {t.continueShopping}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
