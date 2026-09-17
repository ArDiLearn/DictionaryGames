import React from 'react';
import { Language, PlayerTitle } from '../types';
import { translations } from '../utils/i18n';

export type RewardToast =
  | {
      id: string;
      type: 'title';
      title: PlayerTitle;
    }
  | {
      id: string;
      type: 'bonus';
      message: string;
      stars: number;
    };

interface RewardToastOverlayProps {
  toast: RewardToast | null;
  onDismiss: () => void;
  language: Language;
}

export const RewardToastOverlay: React.FC<RewardToastOverlayProps> = ({
  toast,
  onDismiss,
  language,
}) => {
  if (!toast) return null;

  const t = translations[language];

  if (toast.type === 'title') {
    const { title } = toast;
    return (
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce max-w-md w-[92%] p-4 rounded-3xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white shadow-2xl border-2 border-white flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/30 flex items-center justify-center text-3xl shadow-inner shrink-0">
            {title.icon}
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider font-extrabold text-amber-950/80">
              {t.titleUnlockedToast}
            </div>
            <div className="font-black text-base leading-tight">
              {title.name[language] || title.name.ru}
            </div>
          </div>
        </div>
        <button
          onClick={onDismiss}
          className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white cursor-pointer shrink-0"
        >
          ✕
        </button>
      </div>
    );
  }

  // Bonus toast
  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce max-w-md w-[92%] p-4 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-2xl border-2 border-white flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-white/30 flex items-center justify-center text-3xl shadow-inner shrink-0">
          🎁
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider font-extrabold text-emerald-950/80">
            {toast.message}
          </div>
          <div className="font-black text-base leading-tight flex items-center gap-1">
            <span>+{toast.stars} ⭐ {t.starsAddedToBank}</span>
          </div>
        </div>
      </div>
      <button
        onClick={onDismiss}
        className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white cursor-pointer shrink-0"
      >
        ✕
      </button>
    </div>
  );
};
