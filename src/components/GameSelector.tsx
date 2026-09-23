import React from 'react';
import { Topic, Language, GameMode, TopicProgress, LearningCourse } from '../types';
import { translations, getWordsPlural, getGameModeDescriptions } from '../utils/i18n';
import { sounds } from '../utils/soundEffects';
import { ArrowLeft, Play, Layers, SpellCheck, Grid, Headphones, CheckCircle2, Sparkles } from 'lucide-react';

interface GameSelectorProps {
  topic: Topic;
  language: Language;
  course?: LearningCourse;
  progress?: TopicProgress;
  onSelectMode: (mode: GameMode) => void;
  onBack: () => void;
}

export const GameSelector: React.FC<GameSelectorProps> = ({
  topic,
  language,
  course = 'en',
  progress,
  onSelectMode,
  onBack,
}) => {
  const t = translations[language];
  const isLatvianCourse = course === 'lv';
  const primaryTitle = isLatvianCourse
    ? topic.topic_name.lv || topic.topic_name.en
    : topic.topic_name[language] || topic.topic_name.en || topic.topic_id;
  const secondaryTitle = isLatvianCourse ? topic.topic_name.ru : topic.topic_name.en;
  const stars = progress?.stars || 0;
  const totalCount = topic.words.length;
  const topicMaxStars = totalCount < 5 ? 0 : totalCount <= 8 ? 2 : 3;
  const starSlots = Array.from({ length: topicMaxStars }, (_, i) => i + 1);

  const modeDescriptions = getGameModeDescriptions(language, course);

  const MODES: { id: GameMode; title: string; desc: string; icon: React.ReactNode; color: string; border: string; bg: string }[] = [
    {
      id: 'flashcards',
      title: t.modes.flashcards,
      desc: modeDescriptions.flashcards,
      icon: <Layers className="w-8 h-8 text-indigo-600" />,
      color: 'text-indigo-600',
      border: 'border-indigo-300 hover:border-indigo-500',
      bg: 'bg-indigo-50/50 hover:bg-indigo-50',
    },
    {
      id: 'match',
      title: t.modes.match,
      desc: modeDescriptions.match,
      icon: <Grid className="w-8 h-8 text-sky-600" />,
      color: 'text-sky-600',
      border: 'border-sky-300 hover:border-sky-500',
      bg: 'bg-sky-50/50 hover:bg-sky-50',
    },
    {
      id: 'truefalse',
      title: `🚦 ${t.modes.truefalse}`,
      desc: modeDescriptions.truefalse,
      icon: <CheckCircle2 className="w-8 h-8 text-emerald-600" />,
      color: 'text-emerald-600',
      border: 'border-emerald-300 hover:border-emerald-500',
      bg: 'bg-emerald-50/50 hover:bg-emerald-50',
    },
    {
      id: 'balloons',
      title: `🎈 ${t.modes.balloons}`,
      desc: modeDescriptions.balloons,
      icon: <Sparkles className="w-8 h-8 text-rose-500" />,
      color: 'text-rose-600',
      border: 'border-rose-300 hover:border-rose-500',
      bg: 'bg-rose-50/50 hover:bg-rose-50',
    },
    {
      id: 'audio',
      title: t.modes.audio,
      desc: modeDescriptions.audio,
      icon: <Headphones className="w-8 h-8 text-purple-600" />,
      color: 'text-purple-600',
      border: 'border-purple-300 hover:border-purple-500',
      bg: 'bg-purple-50/50 hover:bg-purple-50',
    },
    {
      id: 'builder',
      title: t.modes.builder,
      desc: modeDescriptions.builder,
      icon: <SpellCheck className="w-8 h-8 text-amber-600" />,
      color: 'text-amber-600',
      border: 'border-amber-300 hover:border-amber-500',
      bg: 'bg-amber-50/50 hover:bg-amber-50',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Back button */}
      <button
        onClick={() => {
          sounds.playClick();
          onBack();
        }}
        className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-white rounded-2xl border-2 border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>{t.backToTopics}</span>
      </button>

      {/* Topic Header Card */}
      <div className="bg-white rounded-3xl border-4 border-slate-200 p-6 shadow-xl mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-slate-100 flex items-center justify-center text-4xl sm:text-5xl shadow-inner border-2 border-slate-200">
            {topic.emoji || '📚'}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
              {primaryTitle}
            </h1>
            <p className="text-sm sm:text-base font-bold text-slate-400">
              {secondaryTitle} • {topic.words.length} {getWordsPlural(topic.words.length, language)}
            </p>
          </div>
        </div>

        {/* Stars */}
        {topicMaxStars > 0 ? (
          <div className="flex items-center gap-1.5 bg-amber-50 border-2 border-amber-300 px-4 py-2 rounded-2xl">
            {starSlots.map((starIndex) => (
              <span
                key={starIndex}
                className={`text-2xl sm:text-3xl ${
                  starIndex <= stars ? 'text-amber-400' : 'text-slate-200'
                }`}
              >
                ★
              </span>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-1.5 bg-slate-100 border-2 border-slate-200 px-3 py-1.5 rounded-2xl text-xs font-bold text-slate-500">
            <span>💡</span>
            <span>{t.miniTopicComplete}</span>
          </div>
        )}
      </div>

      {/* Games List */}
      <div className="space-y-3">
        {MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={() => {
              sounds.playClick();
              onSelectMode(mode.id);
            }}
            className={`w-full p-4 sm:p-5 rounded-3xl border-4 ${mode.border} ${mode.bg} shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-1 transition-all flex items-center justify-between text-left group`}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center border-2 border-slate-200 group-hover:scale-110 transition-transform">
                {mode.icon}
              </div>
              <div>
                <h3 className={`text-xl font-black ${mode.color}`}>
                  {mode.title}
                </h3>
                <p className="text-sm font-semibold text-slate-500">
                  {mode.desc}
                </p>
              </div>
            </div>

            <div className="w-10 h-10 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:border-indigo-400 transition-colors">
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
