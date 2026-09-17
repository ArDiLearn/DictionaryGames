import React, { useState, useMemo, useEffect } from 'react';
import { Topic, Language, UserStats, TopicProgress, WordProgress, LearningCourse, Grade, ExamResult } from '../types';
import { translations, getPlayerDisplayName } from '../utils/i18n';
import { sounds } from '../utils/soundEffects';
import { AvatarBadge } from './AvatarBadge';
import {
  X,
  Trophy,
  BookOpen,
  BarChart3,
  RotateCcw,
  GraduationCap,
} from 'lucide-react';
import { OverviewTab } from './stats/OverviewTab';
import { ExamsTab } from './stats/ExamsTab';
import { TopicsTab } from './stats/TopicsTab';
import { PracticeTab } from './stats/PracticeTab';
import { AwardsTab } from './stats/AwardsTab';

export interface ProgressStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  course?: LearningCourse;
  stats: UserStats;
  topics: Topic[];
  topicProgress: Record<string, TopicProgress>;
  wordProgress: Record<string, WordProgress>;
  examResults?: Record<number, ExamResult>;
  examHistory?: ExamResult[];
  initialTab?: TabType;
  onSelectTopic?: (topic: Topic) => void;
  onStartExam?: (grade: Grade) => void;
}

export type TabType = 'overview' | 'exams' | 'topics' | 'practice' | 'awards';

export const ProgressStatsModal: React.FC<ProgressStatsModalProps> = ({
  isOpen,
  onClose,
  language,
  course = 'en',
  stats,
  topics,
  topicProgress,
  wordProgress,
  examResults,
  examHistory,
  initialTab,
  onSelectTopic,
  onStartExam,
}) => {
  const t = translations[language];
  const s = t.statsModal;

  const [activeTab, setActiveTab] = useState<TabType>(initialTab || 'overview');

  // Sync initial tab when modal opens or initialTab changes
  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Fast Badge calculations for tab headers
  const examsCount = examHistory?.length || 0;

  const completedTopicsCount = useMemo(() => {
    return topics.filter((topic) => {
      const tp = topicProgress[topic.topic_id];
      if (!tp) return false;
      if ((tp.stars || 0) >= 3) return true;
      const topicWordIds = new Set(topic.words.map((w) => w.id));
      const mastered = (tp.masteredWordIds || []).filter((id) => topicWordIds.has(id)).length;
      return topic.words.length > 0 && mastered >= topic.words.length;
    }).length;
  }, [topics, topicProgress]);

  const wordsToPracticeCount = useMemo(() => {
    let count = 0;
    for (const wp of Object.values(wordProgress)) {
      if ((wp.timesWrong || 0) > 0 && !wp.isLearned) {
        count++;
      }
    }
    return Math.min(count, 15);
  }, [wordProgress]);

  const totalMasteredCount = useMemo(() => {
    const set = new Set<string>();
    Object.values(topicProgress).forEach((tp) => {
      (tp.masteredWordIds || []).forEach((id) => set.add(id));
    });
    return set.size;
  }, [topicProgress]);

  const topicStarsSum = useMemo(() => {
    return Object.values(topicProgress).reduce((acc, tp) => acc + (tp.stars || 0), 0);
  }, [topicProgress]);
  const totalEarnedStars = Math.max(stats.totalStarsEarned || 0, topicStarsSum);

  const unlockedAwardsCount = useMemo(() => {
    let count = 0;
    if (totalMasteredCount >= 1) count++;
    if (totalMasteredCount >= 10) count++;
    if (totalEarnedStars >= 25) count++;
    if (totalMasteredCount >= 50) count++;
    if (completedTopicsCount >= 1) count++;
    if ((stats.streak || 1) >= 3) count++;
    return count;
  }, [totalMasteredCount, totalEarnedStars, completedTopicsCount, stats.streak]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border-4 border-indigo-200 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden animate-scale-up">
        {/* Modal Header */}
        <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-5 sm:px-7 py-4 sm:py-5 text-white flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-3 sm:gap-4">
            <AvatarBadge avatar={stats.avatar || '🦁'} size="lg" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">{s.title}</h2>
                <span className="bg-white/20 text-white font-extrabold text-xs px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                  {getPlayerDisplayName(stats.playerName, language)}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white/85 font-medium mt-0.5 hidden xs:block">
                {s.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white/20 hover:bg-white/30 active:scale-95 text-white flex items-center justify-center transition-transform cursor-pointer"
            title={s.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100/90 border-b-2 border-slate-200 px-3 sm:px-6 py-2 flex items-center gap-1.5 sm:gap-2 shrink-0 overflow-x-auto scrollbar-none">
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('overview');
            }}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-sm scale-105'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>{s.tabOverview}</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('exams');
            }}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeTab === 'exams'
                ? 'bg-indigo-600 text-white shadow-sm scale-105'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>{s.tabExams}</span>
            {examsCount > 0 && (
              <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded-full font-bold ml-0.5">
                {examsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('topics');
            }}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeTab === 'topics'
                ? 'bg-indigo-600 text-white shadow-sm scale-105'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{s.tabTopics}</span>
            <span className="text-[10px] bg-indigo-100 text-indigo-800 px-1.5 py-0.2 rounded-full font-bold ml-0.5">
              {completedTopicsCount}/{topics.length}
            </span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('practice');
            }}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeTab === 'practice'
                ? 'bg-indigo-600 text-white shadow-sm scale-105'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>{s.tabPractice}</span>
            {wordsToPracticeCount > 0 && (
              <span className="text-[10px] bg-rose-500 text-white px-1.5 py-0.2 rounded-full font-bold ml-0.5">
                {wordsToPracticeCount}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('awards');
            }}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeTab === 'awards'
                ? 'bg-indigo-600 text-white shadow-sm scale-105'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>{s.tabAwards}</span>
            <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full font-bold ml-0.5">
              {unlockedAwardsCount}/6
            </span>
          </button>
        </div>

        {/* Modal Body with smooth scrolling: ONLY renders the active tab */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'overview' && (
            <OverviewTab
              language={language}
              stats={stats}
              topics={topics}
              topicProgress={topicProgress}
              wordProgress={wordProgress}
              examResults={examResults}
              examHistory={examHistory}
              onSwitchToExams={() => setActiveTab('exams')}
            />
          )}

          {activeTab === 'exams' && (
            <ExamsTab
              language={language}
              examResults={examResults}
              examHistory={examHistory}
              onStartExam={onStartExam}
              onClose={onClose}
            />
          )}

          {activeTab === 'topics' && (
            <TopicsTab
              language={language}
              course={course}
              topics={topics}
              topicProgress={topicProgress}
              onSelectTopic={onSelectTopic}
              onClose={onClose}
            />
          )}

          {activeTab === 'practice' && (
            <PracticeTab
              language={language}
              course={course}
              topics={topics}
              wordProgress={wordProgress}
            />
          )}

          {activeTab === 'awards' && (
            <AwardsTab
              language={language}
              stats={stats}
              totalMasteredCount={totalMasteredCount}
              totalEarnedStars={totalEarnedStars}
              completedTopicsCount={completedTopicsCount}
            />
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t-2 border-slate-200 px-4 py-3 sm:px-6 flex items-center justify-end shrink-0">
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-black text-sm shadow-sm transition-all cursor-pointer"
          >
            {s.close}
          </button>
        </div>
      </div>
    </div>
  );
};
