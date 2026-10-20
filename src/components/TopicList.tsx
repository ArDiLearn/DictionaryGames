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
  getWordsPlural,
  getCourseActiveLabel,
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
import { Search, Sparkles, BarChart3, ClipboardCheck, Gamepad2 } from 'lucide-react';

interface TopicListProps {
  topics: Topic[];
  language: Language;
  course?: LearningCourse;
  onCourseChange?: (course: LearningCourse) => void;
  onLanguageChange?: (lang: Language) => void;
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
  mistakesCount?: number;
  onStartMistakesTest?: () => void;
  onOpenMistakesGames?: () => void;
}

export const TopicList: React.FC<TopicListProps> = ({
  topics,
  language,
  course = 'en',
  onCourseChange,
  onLanguageChange,
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
  mistakesCount = 0,
  onStartMistakesTest,
  onOpenMistakesGames,
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

  const bannerGradient =
    course === 'lv'
      ? 'bg-gradient-to-r from-[#8C1D2E] via-rose-600 to-amber-600'
      : course === 'lv-en'
      ? 'bg-gradient-to-r from-[#8C1D2E] via-fuchsia-700 to-indigo-700'
      : course === 'en-lv' || language === 'lv'
      ? 'bg-gradient-to-r from-teal-600 via-cyan-600 to-indigo-700'
      : 'bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700';

  const selectLearningPair = (targetCourse: LearningCourse, targetLang?: Language) => {
    sounds.playClick();
    if (onCourseChange && targetCourse !== course) {
      onCourseChange(targetCourse);
    }
    if (targetLang && onLanguageChange && targetLang !== language) {
      onLanguageChange(targetLang);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Welcome Banner */}
      <div
        className={`relative rounded-3xl p-5 sm:p-7 text-white shadow-xl mb-6 transition-colors duration-300 ${bannerGradient}`}
      >
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          {/* Left Column: Avatar + Greeting + Stats Block underneath */}
          <div className="flex flex-col items-start gap-3.5">
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

            {/* Quick stats pills placed directly under the greeting block */}
            <button
              onClick={() => {
                if (onOpenStats) {
                  sounds.playClick();
                  onOpenStats();
                }
              }}
              className="flex items-center gap-3 bg-white/15 hover:bg-white/25 active:scale-95 transition-all backdrop-blur-md px-4 py-2 rounded-2xl border border-white/25 cursor-pointer text-left group"
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

          {/* Right Column: Active Mode Flag Badge on top + 4-Mode Language Direction Switcher below */}
          {onCourseChange && (
            <div className="flex flex-col items-start lg:items-end gap-2">
              {/* Explicit active language course indicator badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/25 border border-white/35 backdrop-blur-md text-white text-xs sm:text-sm font-black shadow-sm">
                <FlagIcon
                  country={course === 'lv' || course === 'lv-en' ? 'lv' : 'gb'}
                  size="sm"
                  className="rounded-xs ring-1 ring-white/60 shrink-0"
                />
                <span className="opacity-80">→</span>
                <FlagIcon
                  country={
                    course === 'lv-en'
                      ? 'gb'
                      : course === 'en-lv' || (course === 'en' && language === 'lv')
                      ? 'lv'
                      : 'ru'
                  }
                  size="sm"
                  className="rounded-xs ring-1 ring-white/60 shrink-0"
                />
                <span className="ml-0.5">
                  {getCourseActiveLabel(course, language)}
                </span>
              </div>

              <div className="flex flex-col gap-1.5 bg-black/20 backdrop-blur-md p-2.5 rounded-2xl border border-white/30">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-white/80 px-1">
                  {t.courseSelectorLabel}:
                </span>
                <div className="flex items-stretch gap-2">
                  {/* Left Column: English Target Modes (Angļu–Latv on top, Англ–Рус underneath) */}
                  <div className="flex flex-col gap-1.5">
                    {/* Mode 1: English - Latvian */}
                    <button
                      onClick={() => selectLearningPair('en-lv', 'lv')}
                      className={`flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer select-none ${
                        course === 'en-lv' || (course === 'en' && language === 'lv')
                          ? 'bg-white text-teal-900 shadow-md scale-[1.03] ring-2 ring-yellow-300'
                          : 'bg-white/15 hover:bg-white/25 text-white border border-white/25'
                      }`}
                      title="Angļu — Latviešu / Английский — Латышский (EN → LV)"
                    >
                      <FlagIcon country="gb" size="xs" />
                      <span>-</span>
                      <FlagIcon country="lv" size="xs" />
                      <span>Angļu–Latv</span>
                    </button>

                    {/* Mode 2: English - Russian (placed directly under Angļu–Latv) */}
                    <button
                      onClick={() => selectLearningPair('en', 'ru')}
                      className={`flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer select-none ${
                        course === 'en' && language === 'ru'
                          ? 'bg-white text-indigo-900 shadow-md scale-[1.03] ring-2 ring-yellow-300'
                          : 'bg-white/15 hover:bg-white/25 text-white border border-white/25'
                      }`}
                      title="Английский — Русский (EN → RU)"
                    >
                      <FlagIcon country="gb" size="xs" />
                      <span>-</span>
                      <FlagIcon country="ru" size="xs" />
                      <span>Англ–Рус</span>
                    </button>
                  </div>

                  {/* Vertical Divider Line */}
                  <div className="w-px self-stretch bg-white/35 my-0.5" />

                  {/* Right Column: Latvian Target Modes with Лат–Рус separated by a divider line */}
                  <div className="flex flex-col justify-between gap-1.5">
                    {/* Mode 3: Latvian - English */}
                    <button
                      onClick={() => selectLearningPair('lv-en')}
                      className={`flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer select-none ${
                        course === 'lv-en'
                          ? 'bg-white text-fuchsia-950 shadow-md scale-[1.03] ring-2 ring-yellow-300'
                          : 'bg-white/15 hover:bg-white/25 text-white border border-white/25'
                      }`}
                      title="Latviešu — Angļu / Латышский — Английский (LV → EN)"
                    >
                      <FlagIcon country="lv" size="xs" />
                      <span>-</span>
                      <FlagIcon country="gb" size="xs" />
                      <span>{language === 'lv' ? 'Latv–Angļu' : 'Лат–Англ'}</span>
                    </button>

                    <div className="h-px w-full bg-white/35" />

                    {/* Mode 4: Latvian - Russian (separated by line) */}
                    <button
                      onClick={() => selectLearningPair('lv')}
                      className={`flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer select-none ${
                        course === 'lv'
                          ? 'bg-white text-rose-900 shadow-md scale-[1.03] ring-2 ring-yellow-300'
                          : 'bg-white/15 hover:bg-white/25 text-white border border-white/25'
                      }`}
                      title="Латышский — Русский (LV → RU)"
                    >
                      <FlagIcon country="lv" size="xs" />
                      <span>-</span>
                      <FlagIcon country="ru" size="xs" />
                      <span>{language === 'lv' ? 'Latv–Krievu' : 'Лат–Рус'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
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

      {/* Mistakes Review Banner */}
      {!searchQuery && mistakesCount > 0 && (
        <div className="mb-6 rounded-3xl bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 p-4 sm:p-5 text-white shadow-lg border-3 border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/20 backdrop-blur-xs border-2 border-white/40 flex items-center justify-center text-2xl sm:text-3xl shrink-0 shadow-inner">
              🎯
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-black tracking-tight">
                  {t.statsModal.mistakesBannerTitle}
                </h3>
                <span className="bg-white/25 text-white text-xs font-black px-2.5 py-0.5 rounded-full border border-white/30">
                  {mistakesCount} {getWordsPlural(mistakesCount, language)}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white/90 font-semibold mt-0.5">
                {t.statsModal.mistakesBannerSubtitle}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {onStartMistakesTest && (
              <button
                onClick={() => {
                  sounds.playClick();
                  onStartMistakesTest();
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white hover:bg-rose-50 active:scale-95 text-rose-600 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                <ClipboardCheck className="w-4 h-4" />
                <span>{t.statsModal.startMistakesTestBtn}</span>
              </button>
            )}
            {onOpenMistakesGames && (
              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenMistakesGames();
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 active:scale-95 border-2 border-white/40 text-white font-black text-xs sm:text-sm transition-all cursor-pointer"
              >
                <Gamepad2 className="w-4 h-4" />
                <span>{t.statsModal.practiceMistakesGamesBtn}</span>
              </button>
            )}
          </div>
        </div>
      )}

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
