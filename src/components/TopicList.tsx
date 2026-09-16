import React, { useState } from 'react';
import { Topic, Language, TopicProgress, Grade, LearningCourse, ExamResult } from '../types';
import { TopicCard } from './TopicCard';
import { ExamCard } from './ExamCard';
import { FlagIcon } from './FlagIcon';
import {
  translations,
  getGradeFilterInfo,
  getPlayerDisplayName,
  EXTRA_TOPICS,
  GRADE_1_MAIN_TOPICS,
  GRADE_2_MAIN_TOPICS,
  GRADE_3_MAIN_TOPICS,
  getMainTopicsSubtitle,
  getExtraTopicsSubtitle,
} from '../utils/i18n';
import { sounds } from '../utils/soundEffects';
import { Search, Sparkles, BarChart3 } from 'lucide-react';

interface TopicListProps {
  topics: Topic[];
  language: Language;
  course?: LearningCourse;
  onCourseChange?: (course: LearningCourse) => void;
  topicProgress: Record<string, TopicProgress>;
  selectedGrades: Grade[];
  onToggleGrade: (grade: Grade) => void;
  onSelectAllGrades: () => void;
  onSelectTopic: (topic: Topic) => void;
  playerName: string;
  avatar: string;
  onOpenShop?: () => void;
  onOpenStats?: () => void;
  examResults?: Record<number, ExamResult>;
  onStartExam?: (grade: Grade) => void;
}

export const TopicList: React.FC<TopicListProps> = ({
  topics,
  language,
  course = 'en',
  onCourseChange,
  topicProgress,
  selectedGrades,
  onToggleGrade,
  onSelectAllGrades,
  onSelectTopic,
  playerName,
  avatar,
  onOpenShop,
  onOpenStats,
  examResults,
  onStartExam,
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

  const mainTopics = filteredTopics.filter((t) => !EXTRA_TOPICS.includes(t.topic_id));
  const extraTopics = filteredTopics.filter((t) => EXTRA_TOPICS.includes(t.topic_id));

  const displayName = getPlayerDisplayName(playerName, language);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-5 sm:p-7 text-white shadow-xl mb-6">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (onOpenShop) {
                  sounds.playClick();
                  onOpenShop();
                }
              }}
              className="relative group w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white/20 hover:bg-white/30 backdrop-blur-md border-2 border-white/40 flex items-center justify-center text-4xl sm:text-5xl shadow-inner transition-transform hover:scale-105 active:scale-95 cursor-pointer shrink-0"
              title={t.avatarShopTitle}
            >
              <span>{avatar}</span>
              <span className="absolute -bottom-1.5 -right-1.5 bg-amber-400 text-amber-950 font-black text-[10px] px-1.5 py-0.5 rounded-full shadow-md border border-white flex items-center gap-0.5">
                <span>🛍️</span>
                <span className="hidden sm:inline">{t.avatarShopTitle}</span>
              </span>
            </button>
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

          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            {/* Single Course Toggle Button with Tooltip */}
            {onCourseChange && (
              <div className="relative group">
                <button
                  onClick={() => {
                    const nextCourse = course === 'en' ? 'lv' : 'en';
                    sounds.playClick();
                    onCourseChange(nextCourse);
                  }}
                  className="flex items-center gap-2.5 bg-white/20 hover:bg-white/30 active:scale-95 transition-all backdrop-blur-md px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl border-2 border-white/40 cursor-pointer text-white shadow-md select-none group/btn"
                  title={t.courseSwitchHint}
                >
                  <FlagIcon
                    country={course === 'en' ? 'gb' : 'lv'}
                    size="xl"
                    className="shadow-md rounded-md ring-1.5 ring-white/50 group-hover/btn:scale-105 transition-transform"
                  />
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-xs sm:text-sm font-black whitespace-nowrap drop-shadow-sm">
                      {course === 'en' ? t.courseEnglish : t.courseLatvian}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-yellow-200 font-bold flex items-center gap-1">
                      <span>🔄</span>
                      <span>{t.courseSwitchHint}</span>
                    </span>
                  </div>
                </button>

                {/* Floating tooltip on hover */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xl border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30 flex items-center gap-1.5">
                  <FlagIcon country={course === 'en' ? 'lv' : 'gb'} size="xs" />
                  <span>💡</span>
                  <span>{t.courseSwitchHint}</span>
                </div>
              </div>
            )}

            {/* Quick stats pills (opens stats modal) */}
            <button
              onClick={() => {
                if (onOpenStats) {
                  sounds.playClick();
                  onOpenStats();
                }
              }}
              className="flex items-center gap-2 sm:gap-3 bg-white/15 hover:bg-white/25 active:scale-95 transition-all backdrop-blur-md px-4 py-2 sm:py-2.5 rounded-2xl border border-white/25 cursor-pointer text-left group"
              title={t.progressStatsTitle}
            >
              <div className="text-center">
                <div className="text-xs text-white/80 font-bold uppercase tracking-wider">
                  {t.allTopics}
                </div>
                <div className="text-lg sm:text-xl font-black">{topics.length}</div>
              </div>
              <div className="w-px h-8 bg-white/30" />
              <div className="text-center">
                <div className="text-xs text-white/80 font-bold uppercase tracking-wider flex items-center justify-center gap-1">
                  <span>{t.learnedCount}</span>
                  <BarChart3 className="w-3.5 h-3.5 text-yellow-300 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-lg sm:text-xl font-black text-yellow-300">
                  {totalMastered} / {totalWords}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Multi-select Grade Switcher & Info Bar */}
      {(() => {
        const gradeInfo = getGradeFilterInfo(selectedGrades, language);
        return (
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-amber-50/90 border-2 border-amber-200/90 rounded-2xl p-3 sm:px-5 sm:py-3 shadow-sm">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <span className="text-2xl">🎒</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-amber-950 text-sm sm:text-base">
                    {gradeInfo.notice}
                  </span>
                  <span className="text-[11px] sm:text-xs bg-amber-200 text-amber-900 font-extrabold px-2 py-0.5 rounded-full">
                    {gradeInfo.badge}
                  </span>
                </div>
                <p className="text-xs text-amber-700/80 font-medium hidden sm:block">
                  {gradeInfo.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-1.5 bg-white/90 p-1 rounded-2xl border-2 border-amber-200 shadow-inner flex-wrap">
              <button
                onClick={() => onToggleGrade(1)}
                className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedGrades.includes(1)
                    ? 'bg-amber-500 text-white shadow-sm scale-105'
                    : 'text-amber-800/70 hover:text-amber-950 hover:bg-amber-50'
                }`}
                title={selectedGrades.includes(1) ? t.grade1 : t.grade1}
              >
                <span>{selectedGrades.includes(1) ? '✓' : '○'}</span>
                <span>{t.grade1}</span>
              </button>
              <button
                onClick={() => onToggleGrade(2)}
                className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedGrades.includes(2)
                    ? 'bg-amber-500 text-white shadow-sm scale-105'
                    : 'text-amber-800/70 hover:text-amber-950 hover:bg-amber-50'
                }`}
                title={selectedGrades.includes(2) ? t.grade2 : t.grade2}
              >
                <span>{selectedGrades.includes(2) ? '✓' : '○'}</span>
                <span>{t.grade2}</span>
              </button>
              <button
                onClick={() => onToggleGrade(3)}
                className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedGrades.includes(3)
                    ? 'bg-amber-500 text-white shadow-sm scale-105'
                    : 'text-amber-800/70 hover:text-amber-950 hover:bg-amber-50'
                }`}
                title={selectedGrades.includes(3) ? t.grade3 : t.grade3}
              >
                <span>{selectedGrades.includes(3) ? '✓' : '○'}</span>
                <span>{t.grade3}</span>
              </button>
              <button
                onClick={onSelectAllGrades}
                className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                  selectedGrades.length === 3
                    ? 'bg-amber-500 text-white shadow-sm scale-105'
                    : 'text-amber-800/70 hover:text-amber-950 hover:bg-amber-50'
                }`}
                title={t.gradeAll}
              >
                {t.gradeAll}
              </button>
            </div>
          </div>
        );
      })()}

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
      <div className="space-y-8">
        {/* Main Topics */}
        {mainTopics.length > 0 && (
          <div>
            <div className="flex items-center justify-between gap-3 mb-4 pb-2 border-b-2 border-amber-200">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">📚</span>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight">
                    {t.mainTopicsTitle}
                  </h2>
                  <p className="text-xs sm:text-sm font-semibold text-slate-500">
                    {getMainTopicsSubtitle(mainTopics.length, language)}
                  </p>
                </div>
              </div>
              <span className="text-xs font-black bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full border border-amber-300">
                {mainTopics.length}
              </span>
            </div>

            {/* Exam Super Card(s) (Variant A) */}
            {!searchQuery && onStartExam && (
              <div className="space-y-4 mb-6">
                {selectedGrades.map((grade) => {
                  const topicsCount =
                    grade === 1
                      ? GRADE_1_MAIN_TOPICS.length
                      : grade === 2
                      ? GRADE_2_MAIN_TOPICS.length
                      : GRADE_3_MAIN_TOPICS.length;
                  return (
                    <ExamCard
                      key={`exam-grade-${grade}`}
                      grade={grade}
                      language={language}
                      course={course}
                      topicsCount={topicsCount}
                      result={examResults ? examResults[grade] : undefined}
                      onStart={onStartExam}
                    />
                  );
                })}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {mainTopics.map((topic) => (
                <TopicCard
                  key={topic.topic_id}
                  topic={topic}
                  language={language}
                  course={course}
                  progress={topicProgress[topic.topic_id]}
                  onSelect={onSelectTopic}
                />
              ))}
            </div>
          </div>
        )}

        {/* Extra Topics */}
        {extraTopics.length > 0 && (
          <div>
            <div className="flex items-center justify-between gap-3 mb-4 pb-2 border-b-2 border-indigo-200">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">⭐</span>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-indigo-950 tracking-tight">
                    {t.extraTopicsTitle}
                  </h2>
                  <p className="text-xs sm:text-sm font-semibold text-indigo-600/80">
                    {getExtraTopicsSubtitle(extraTopics.length, language)}
                  </p>
                </div>
              </div>
              <span className="text-xs font-black bg-indigo-100 text-indigo-900 px-2.5 py-1 rounded-full border border-indigo-300">
                {extraTopics.length}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {extraTopics.map((topic) => (
                <TopicCard
                  key={topic.topic_id}
                  topic={topic}
                  language={language}
                  course={course}
                  progress={topicProgress[topic.topic_id]}
                  onSelect={onSelectTopic}
                />
              ))}
            </div>
          </div>
        )}
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
