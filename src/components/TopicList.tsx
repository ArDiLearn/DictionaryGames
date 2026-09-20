import React, { useState, useMemo } from 'react';
import { Topic, Language, TopicProgress, Grade, LearningCourse, ExamResult } from '../types';
import { TopicCard } from './TopicCard';
import { ExamCard } from './ExamCard';
import { FlagIcon } from './FlagIcon';
import { AvatarBadge } from './AvatarBadge';
import {
  translations,
  getGradeFilterInfo,
  getPlayerDisplayName,
  getMainTopicsSubtitle,
  getExtraTopicsSubtitle,
} from '../utils/i18n';
import {
  isTopicExtra,
  hasNewWordsForGrades,
  getNewWordsCountForGrades,
  GRADE_1_MAIN_TOPICS,
  GRADE_2_MAIN_TOPICS,
  GRADE_3_MAIN_TOPICS,
  GRADE_4_MAIN_TOPICS,
} from '../data/curriculum';
import { sounds } from '../utils/soundEffects';
import { getTitleById } from '../data/titles';
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
  onOpenStats?: (initialTab?: 'overview' | 'exams' | 'topics' | 'practice' | 'awards') => void;
  examResults?: Record<number, ExamResult>;
  onStartExam?: (grade: Grade) => void;
  equippedTitleId?: string;
  onOpenTitles?: () => void;
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
  equippedTitleId,
  onOpenTitles,
}) => {
  const t = translations[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [examGradeTab, setExamGradeTab] = useState<Grade>(() => selectedGrades[0] || 1);

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

  const mainTopics = filteredTopics.filter((t) => !isTopicExtra(t.topic_id, selectedGrades));
  const extraTopics = useMemo(() => {
    const list = filteredTopics.filter((t) => isTopicExtra(t.topic_id, selectedGrades));
    if (!selectedGrades.some((g) => g >= 2)) {
      return list;
    }
    return [...list].sort((a, b) => {
      const aNew = hasNewWordsForGrades(a, selectedGrades);
      const bNew = hasNewWordsForGrades(b, selectedGrades);
      if (aNew && !bNew) return -1;
      if (!aNew && bNew) return 1;
      return 0;
    });
  }, [filteredTopics, selectedGrades]);

  const displayName = getPlayerDisplayName(playerName, language);
  const equippedTitle = getTitleById(equippedTitleId);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-5 sm:p-7 text-white shadow-xl mb-6">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 sm:gap-4">
            <button
              onClick={() => {
                if (onOpenShop) {
                  sounds.playClick();
                  onOpenShop();
                }
              }}
              className="relative group flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer shrink-0"
              title={t.avatarShopTitle}
            >
              <AvatarBadge avatar={avatar || '🦁'} size="xl" showStars={true} />
              <span className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 bg-amber-400 border-2 border-white rounded-full shadow-md flex items-center justify-center text-xs sm:text-sm pointer-events-none z-20">
                🛍️
              </span>
            </button>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black font-comic tracking-tight leading-tight">
                  {t.welcomeGreeting}, {displayName}!
                </h1>
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 animate-spin-slow shrink-0" />
              </div>

              {/* Equipped Title Badge Button */}
              {onOpenTitles && (
                <div className="mt-1 flex items-center">
                  <button
                    onClick={() => {
                      sounds.playClick();
                      onOpenTitles();
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 border border-white/40 backdrop-blur-md text-white text-xs sm:text-sm font-black shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer group select-none"
                    title={t.titlesModalTitle}
                  >
                    <span>{equippedTitle.icon}</span>
                    <span className="underline decoration-dotted decoration-yellow-200/80 underline-offset-2">
                      {equippedTitle.name[language] || equippedTitle.name.ru}
                    </span>
                    <span className="text-[11px] opacity-80 group-hover:opacity-100 transition-opacity">🎖️</span>
                  </button>
                </div>
              )}

              <p className="text-white/90 text-sm sm:text-base font-semibold mt-1 leading-snug">
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
                onClick={() => onToggleGrade(4)}
                className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedGrades.includes(4)
                    ? 'bg-amber-500 text-white shadow-sm scale-105'
                    : 'text-amber-800/70 hover:text-amber-950 hover:bg-amber-50'
                }`}
                title={selectedGrades.includes(4) ? t.grade4 : t.grade4}
              >
                <span>{selectedGrades.includes(4) ? '✓' : '○'}</span>
                <span>{t.grade4}</span>
              </button>
              <button
                onClick={onSelectAllGrades}
                className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                  selectedGrades.length === 4
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

            {/* Exam Super Card (Variant A with Grade Switcher) */}
            {!searchQuery && onStartExam && selectedGrades.length > 0 && (() => {
              const activeGrade: Grade = selectedGrades.includes(examGradeTab)
                ? examGradeTab
                : selectedGrades[0];
              const topicsCount =
                activeGrade === 1
                  ? GRADE_1_MAIN_TOPICS.length
                  : activeGrade === 2
                  ? GRADE_2_MAIN_TOPICS.length
                  : activeGrade === 3
                  ? GRADE_3_MAIN_TOPICS.length
                  : GRADE_4_MAIN_TOPICS.length;

              return (
                <div className="mb-6">
                  <ExamCard
                    key={`exam-grade-${activeGrade}`}
                    grade={activeGrade}
                    availableGrades={selectedGrades.length > 1 ? selectedGrades : undefined}
                    onSelectGradeTab={(g) => setExamGradeTab(g)}
                    language={language}
                    course={course}
                    topicsCount={topicsCount}
                    result={examResults ? examResults[activeGrade] : undefined}
                    onStart={onStartExam}
                    onOpenStats={() => onOpenStats && onOpenStats('exams')}
                  />
                </div>
              );
            })()}

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
              {extraTopics.map((topic) => {
                const newCount = getNewWordsCountForGrades(topic, selectedGrades);
                return (
                  <TopicCard
                    key={topic.topic_id}
                    topic={topic}
                    language={language}
                    course={course}
                    progress={topicProgress[topic.topic_id]}
                    onSelect={onSelectTopic}
                    hasNewWords={newCount > 0}
                    newWordsCount={newCount}
                  />
                );
              })}
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
