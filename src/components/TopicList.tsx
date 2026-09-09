import React, { useState } from 'react';
import { Topic, Language, TopicProgress } from '../types';
import { TopicCard } from './TopicCard';
import { translations } from '../utils/i18n';
import { Search, Sparkles } from 'lucide-react';

interface TopicListProps {
  topics: Topic[];
  language: Language;
  topicProgress: Record<string, TopicProgress>;
  onSelectTopic: (topic: Topic) => void;
  playerName: string;
  avatar: string;
}

export const TopicList: React.FC<TopicListProps> = ({
  topics,
  language,
  topicProgress,
  onSelectTopic,
  playerName,
  avatar,
}) => {
  const t = translations[language];
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTopics = topics.filter((topic) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    const titleRu = (topic.topic_name.ru || '').toLowerCase();
    const titleLv = (topic.topic_name.lv || '').toLowerCase();
    const titleEn = (topic.topic_name.en || '').toLowerCase();
    return (
      titleRu.includes(query) ||
      titleLv.includes(query) ||
      titleEn.includes(query)
    );
  });

  const totalWords = topics.reduce((acc, t) => acc + t.words.length, 0);
  const totalMastered = Object.values(topicProgress).reduce(
    (acc, p) => acc + (p.masteredWordIds?.length || 0),
    0
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-5 sm:p-7 text-white shadow-xl mb-6">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center text-4xl sm:text-5xl shadow-inner">
              {avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black font-comic tracking-tight">
                  Привет, {playerName}!
                </h1>
                <Sparkles className="w-6 h-6 text-yellow-300 animate-spin-slow" />
              </div>
              <p className="text-white/90 text-sm sm:text-base font-semibold mt-0.5">
                {t.chooseTopic}
              </p>
            </div>
          </div>

          {/* Quick stats pills */}
          <div className="flex items-center gap-2 sm:gap-3 bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/25">
            <div className="text-center">
              <div className="text-xs text-white/80 font-bold uppercase tracking-wider">
                {t.allTopics}
              </div>
              <div className="text-lg sm:text-xl font-black">{topics.length}</div>
            </div>
            <div className="w-px h-8 bg-white/30" />
            <div className="text-center">
              <div className="text-xs text-white/80 font-bold uppercase tracking-wider">
                {t.learnedCount}
              </div>
              <div className="text-lg sm:text-xl font-black text-yellow-300">
                {totalMastered} / {totalWords}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full pl-11 pr-4 py-3 sm:py-3.5 bg-white rounded-2xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none text-slate-800 placeholder-slate-400 font-semibold shadow-sm transition-colors text-base"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 font-bold text-sm"
          >
            ✕
          </button>
        )}
      </div>

      {/* Grid of Topics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredTopics.map((topic) => (
          <TopicCard
            key={topic.topic_id}
            topic={topic}
            language={language}
            progress={topicProgress[topic.topic_id]}
            onSelect={onSelectTopic}
          />
        ))}
      </div>

      {filteredTopics.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border-2 border-slate-200">
          <p className="text-4xl mb-2">🔍</p>
          <p className="text-lg font-bold text-slate-600">
            Ничего не нашлось / Nekas netika atrasts
          </p>
        </div>
      )}
    </div>
  );
};
