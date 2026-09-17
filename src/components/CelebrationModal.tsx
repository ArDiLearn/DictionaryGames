import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Language } from '../types';
import { translations } from '../utils/i18n';
import { sounds } from '../utils/soundEffects';
import { RotateCcw, Home, Sparkles } from 'lucide-react';

interface CelebrationModalProps {
  language: Language;
  correctCount: number;
  totalCount: number;
  stars: number;
  maxStars?: number;
  isRewardDisabled?: boolean;
  isMiniTopicPractice?: boolean;
  onRestart: () => void;
  onHome: () => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  language,
  correctCount,
  totalCount,
  stars,
  maxStars = 3,
  isRewardDisabled,
  isMiniTopicPractice,
  onRestart,
  onHome,
}) => {
  const t = translations[language];
  const isNoReward = isRewardDisabled || isMiniTopicPractice || maxStars === 0;

  useEffect(() => {
    if (isNoReward) {
      sounds.playCorrect();
    } else {
      sounds.playFanfare();
    }

    // Fire Confetti Cannon
    const duration = 2.5 * 1000;
    const animationEnd = Date.now() + duration;

    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      confetti({
        particleCount: 40,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: Math.random(),
          y: Math.random() * 0.5,
        },
        colors: ['#38bdf8', '#6366f1', '#ec4899', '#facc15', '#4ade80'],
      });
    }, 300);

    return () => clearInterval(interval);
  }, [isNoReward]);

  const percentage = Math.round((correctCount / Math.max(1, totalCount)) * 100);
  const headline =
    percentage >= 80 ? t.awesome : percentage >= 50 ? t.goodJob : t.tryAgain;

  const starCount = Math.max(1, Math.min(3, maxStars));
  const starSlots = Array.from({ length: starCount }, (_, i) => i + 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-pop">
      <div className="bg-white rounded-3xl border-4 border-indigo-300 shadow-2xl p-6 sm:p-8 max-w-md w-full text-center relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-16 -left-16 w-32 h-32 bg-indigo-200 rounded-full blur-2xl opacity-60 pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-pink-200 rounded-full blur-2xl opacity-60 pointer-events-none" />

        {/* Mascot / Trophy */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl bg-gradient-to-tr from-indigo-200 to-purple-300 border-4 border-indigo-200 flex items-center justify-center text-5xl sm:text-6xl shadow-lg mb-4 animate-bounce">
          {isRewardDisabled ? '🎴' : isMiniTopicPractice ? '💡' : '🏆'}
        </div>

        <div className="flex items-center justify-center gap-1 text-indigo-500 mb-1">
          <Sparkles className="w-5 h-5" />
          <span className="text-xs font-black uppercase tracking-wider">
            {isRewardDisabled
              ? t.flashcardsComplete
              : isMiniTopicPractice
              ? t.miniTopicComplete
              : t.roundComplete}
          </span>
          <Sparkles className="w-5 h-5" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mb-3 font-comic">
          {isRewardDisabled ? t.flashcardsFinishedHeadline : headline}
        </h2>

        {/* Stars - only shown when reward is enabled and maxStars > 0 */}
        {!isNoReward && (
          <div className="flex items-center justify-center gap-2 mb-4">
            {starSlots.map((starIndex) => (
              <span
                key={starIndex}
                className={`text-4xl sm:text-5xl transition-all duration-300 ${
                  starIndex <= stars
                    ? 'text-amber-400 scale-110 drop-shadow-md'
                    : 'text-slate-200 scale-90'
                }`}
              >
                ★
              </span>
            ))}
          </div>
        )}

        {/* Reward pill or Practice note */}
        <div className="flex flex-col items-center gap-1.5 mb-6">
          {!isNoReward ? (
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl px-4 py-2 border-2 border-amber-300 shadow-xs">
              <span className="text-xl animate-bounce">⭐</span>
              <span className="text-sm sm:text-base font-black text-amber-900">
                +{stars} {t.starsAddedToBank}
              </span>
            </div>
          ) : isMiniTopicPractice ? (
            <div className="inline-flex items-center gap-2 bg-amber-50 rounded-2xl px-4 py-2.5 border-2 border-amber-200 text-amber-900 text-xs sm:text-sm font-bold shadow-xs max-w-xs">
              <span className="text-base">💡</span>
              <span>{t.miniTopicNoRewardHint}</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 bg-indigo-50 rounded-2xl px-4 py-2.5 border-2 border-indigo-200 text-indigo-800 text-xs sm:text-sm font-bold shadow-xs max-w-xs">
              <span className="text-base">💡</span>
              <span>{t.flashcardsNoRewardHint}</span>
            </div>
          )}
          <div className="text-xs font-bold text-slate-500 mt-1">
            {isRewardDisabled
              ? `${t.cardsViewed}: ${totalCount} / ${totalCount}`
              : `${t.score}: ${correctCount} / ${totalCount} (${percentage}%)`}
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              sounds.playClick();
              onRestart();
            }}
            className="btn-3d py-3.5 px-4 rounded-2xl bg-indigo-50 hover:bg-indigo-100 border-3 border-indigo-300 text-indigo-700 font-black text-base shadow-md flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span>{t.restart}</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onHome();
            }}
            className="btn-3d py-3.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 border-3 border-indigo-700 text-white font-black text-base shadow-md flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            <span>{t.backToTopics}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
