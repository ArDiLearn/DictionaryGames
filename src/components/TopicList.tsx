import React, { useState } from 'react';
import { Topic, Language, TopicProgress, GradeFilter } from '../types';
import { TopicCard } from './TopicCard';
import { translations } from '../utils/i18n';
import { Search, Sparkles } from 'lucide-react';

interface TopicListProps {
  topics: Topic[];
  language: Language;
  topicProgress: Record<string, TopicProgress>;
  selectedGrade: GradeFilter;
  onGradeChange: (grade: GradeFilter) => void;
  onSelectTopic: (topic: Topic) => void;
  playerName: string;
  avatar: string;
}

export const TopicList: React.FC<TopicListProps> = ({
  topics,
  language,
  topicProgress,
  selectedGrade,
  onGradeChange,
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
  const visibleWordIds = new Set(topics.flatMap((t) => t.words.map((w) => w.id)));
  const totalMastered = Object.values(topicProgress).reduce(
    (acc, p) =>
      acc + (p.masteredWordIds?.filter((id) => visibleWordIds.has(id)).length || 0),
    0
  );

  const displayName =
    !playerName || playerName === 'Знайка' || playerName === 'Zinītis'
      ? t.defaultPlayerName
      : playerName;

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
                  {t.welcomeGreeting}, {displayName}!
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

      {/* Grade Selector & Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-amber-50/90 border-2 border-amber-200/90 rounded-2xl p-3 sm:px-5 sm:py-3 shadow-sm">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <span className="text-2xl">🎒</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-amber-950 text-sm sm:text-base">
                {selectedGrade === '1'
                  ? t.gradeFilterNotice1
                  : selectedGrade === '2'
                  ? t.gradeFilterNotice2
                  : t.gradeFilterNoticeAll}
              </span>
              <span className="text-[11px] sm:text-xs bg-amber-200 text-amber-900 font-extrabold px-2 py-0.5 rounded-full">
                {selectedGrade === '1'
                  ? t.gradeTitle1
                  : selectedGrade === '2'
                  ? t.gradeTitle2
                  : t.gradeTitleAll}
              </span>
            </div>
            <p className="text-xs text-amber-700/80 font-medium hidden sm:block">
              {selectedGrade === '1'
                ? (language === 'ru' ? 'Слова только для 1 класса' : 'Vārdi tikai 1. klasei')
                : selectedGrade === '2'
                ? (language === 'ru' ? 'Слова только для 2 класса' : 'Vārdi tikai 2. klasei')
                : (language === 'ru' ? 'Включает слова 1-го и 2-го классов' : 'Ietver 1. un 2. klases vārdus')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-white/90 p-1 rounded-2xl border-2 border-amber-200 shadow-inner">
          <button
            onClick={() => onGradeChange('1')}
            className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              selectedGrade === '1'
                ? 'bg-amber-500 text-white shadow-sm scale-105'
                : 'text-amber-800 hover:text-amber-950 hover:bg-amber-50'
            }`}
          >
            {t.grade1}
          </button>
          <button
            onClick={() => onGradeChange('2')}
            className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              selectedGrade === '2'
                ? 'bg-amber-500 text-white shadow-sm scale-105'
                : 'text-amber-800 hover:text-amber-950 hover:bg-amber-50'
            }`}
          >
            {t.grade2}
          </button>
          <button
            onClick={() => onGradeChange('all')}
            className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              selectedGrade === 'all'
                ? 'bg-amber-500 text-white shadow-sm scale-105'
                : 'text-amber-800 hover:text-amber-950 hover:bg-amber-50'
            }`}
          >
            {t.gradeAll}
          </button>
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
            {t.noResultsFound}
          </p>
        </div>
      )}
    </div>
  );
};
