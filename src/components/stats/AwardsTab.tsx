import React, { useMemo } from 'react';
import { Language, UserStats } from '../../types';
import { translations } from '../../utils/i18n';
import { Check } from 'lucide-react';

interface AwardsTabProps {
  language: Language;
  stats: UserStats;
  totalMasteredCount: number;
  totalEarnedStars: number;
  completedTopicsCount: number;
}

export const AwardsTab: React.FC<AwardsTabProps> = ({
  language,
  stats,
  totalMasteredCount,
  totalEarnedStars,
  completedTopicsCount,
}) => {
  const t = translations[language];
  const s = t.statsModal;

  const achievements = useMemo(() => {
    return [
      {
        id: 'firstWord',
        icon: '🥇',
        title: s.achievements.firstWord.title,
        desc: s.achievements.firstWord.desc,
        unlocked: totalMasteredCount >= 1,
        progress: `${Math.min(totalMasteredCount, 1)} / 1`,
      },
      {
        id: 'tenWords',
        icon: '🔟',
        title: s.achievements.tenWords.title,
        desc: s.achievements.tenWords.desc,
        unlocked: totalMasteredCount >= 10,
        progress: `${Math.min(totalMasteredCount, 10)} / 10`,
      },
      {
        id: 'starCollector',
        icon: '🌟',
        title: s.achievements.starCollector.title,
        desc: s.achievements.starCollector.desc,
        unlocked: totalEarnedStars >= 25,
        progress: `${Math.min(totalEarnedStars, 25)} / 25 ⭐`,
      },
      {
        id: 'fiftyWords',
        icon: '📚',
        title: s.achievements.fiftyWords.title,
        desc: s.achievements.fiftyWords.desc,
        unlocked: totalMasteredCount >= 50,
        progress: `${Math.min(totalMasteredCount, 50)} / 50`,
      },
      {
        id: 'topicMaster',
        icon: '💯',
        title: s.achievements.topicMaster.title,
        desc: s.achievements.topicMaster.desc,
        unlocked: completedTopicsCount >= 1,
        progress: `${Math.min(completedTopicsCount, 1)} / 1 🏆`,
      },
      {
        id: 'streakMaster',
        icon: '🔥',
        title: s.achievements.streakMaster.title,
        desc: s.achievements.streakMaster.desc,
        unlocked: (stats.streak || 1) >= 3,
        progress: `${Math.min(stats.streak || 1, 3)} / 3 📅`,
      },
    ];
  }, [s, totalMasteredCount, totalEarnedStars, completedTopicsCount, stats.streak]);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl p-3.5 sm:p-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm sm:text-base font-black text-amber-950">
            {s.achievementsTitle}
          </h3>
          <p className="text-xs text-amber-800/80 font-medium mt-0.5">
            {s.achievementsSubtitle}
          </p>
        </div>
        <div className="text-right">
          <span className="text-xl sm:text-2xl font-black text-amber-900">
            {unlockedCount} / {achievements.length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className={`p-3.5 rounded-2xl border-2 transition-all flex items-start gap-3 ${
              ach.unlocked
                ? 'bg-amber-50/70 border-amber-300 shadow-sm'
                : 'bg-slate-50 border-slate-200 opacity-60'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                ach.unlocked
                  ? 'bg-amber-100 border border-amber-300 shadow-xs scale-105'
                  : 'bg-slate-200'
              }`}
            >
              {ach.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <h4 className="font-black text-slate-800 text-sm">{ach.title}</h4>
                {ach.unlocked ? (
                  <span className="inline-flex items-center text-[10px] font-black bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-md">
                    <Check className="w-3 h-3 mr-0.5" /> OK
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-200 px-1.5 py-0.5 rounded-md">
                    {ach.progress}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{ach.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
