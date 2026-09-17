import React, { useState, useMemo } from 'react';
import { Topic, Language, LearningCourse, TopicProgress } from '../../types';
import { translations, getWordsPlural } from '../../utils/i18n';
import { sounds } from '../../utils/soundEffects';
import { CheckCircle2, ChevronRight } from 'lucide-react';

export type TopicFilter = 'all' | 'completed' | 'inprogress' | 'notstarted';

interface TopicsTabProps {
  language: Language;
  course: LearningCourse;
  topics: Topic[];
  topicProgress: Record<string, TopicProgress>;
  onSelectTopic?: (topic: Topic) => void;
  onClose: () => void;
}

export const TopicsTab: React.FC<TopicsTabProps> = ({
  language,
  course,
  topics,
  topicProgress,
  onSelectTopic,
  onClose,
}) => {
  const t = translations[language];
  const s = t.statsModal;

  const [topicFilter, setTopicFilter] = useState<TopicFilter>('all');

  const filteredTopicsList = useMemo(() => {
    return topics.filter((topic) => {
      const tp = topicProgress[topic.topic_id];
      const stars = tp?.stars || 0;
      const topicWordIds = new Set(topic.words.map((w) => w.id));
      const mastered = (tp?.masteredWordIds || []).filter((id) =>
        topicWordIds.has(id)
      ).length;
      const total = topic.words.length;
      const isCompleted = stars >= 3 || (total > 0 && mastered >= total);
      const isNotStarted = stars === 0 && mastered === 0;

      if (topicFilter === 'completed') return isCompleted;
      if (topicFilter === 'inprogress') return !isCompleted && !isNotStarted;
      if (topicFilter === 'notstarted') return isNotStarted;
      return true;
    });
  }, [topics, topicProgress, topicFilter]);

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {(['all', 'completed', 'inprogress', 'notstarted'] as TopicFilter[]).map((f) => {
          const label =
            f === 'all'
              ? s.filterAll
              : f === 'completed'
              ? s.filterCompleted
              : f === 'inprogress'
              ? s.filterInProgress
              : s.filterNotStarted;
          return (
            <button
              key={f}
              onClick={() => {
                sounds.playClick();
                setTopicFilter(f);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer shrink-0 ${
                topicFilter === f
                  ? 'bg-indigo-600 text-white shadow-xs scale-105'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {filteredTopicsList.map((topic) => {
          const tp = topicProgress[topic.topic_id];
          const stars = tp?.stars || 0;
          const topicWordIds = new Set(topic.words.map((w) => w.id));
          const mastered = (tp?.masteredWordIds || []).filter((id) =>
            topicWordIds.has(id)
          ).length;
          const total = topic.words.length;
          const percent = total > 0 ? Math.round((mastered / total) * 100) : 0;
          const isCompleted = stars >= 3 || (total > 0 && mastered >= total);
          const isLatvianCourse = course === 'lv';
          const title = isLatvianCourse
            ? topic.topic_name.lv || topic.topic_name.en
            : topic.topic_name[language] || topic.topic_name.en || topic.topic_id;
          const subtitle = isLatvianCourse ? topic.topic_name.ru : topic.topic_name.en;

          return (
            <div
              key={topic.topic_id}
              onClick={() => {
                if (onSelectTopic) {
                  sounds.playClick();
                  onSelectTopic(topic);
                  onClose();
                }
              }}
              className="group bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-indigo-400 p-3 rounded-2xl transition-all shadow-xs flex items-center justify-between gap-3 cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-2xl sm:text-3xl shrink-0 group-hover:scale-110 transition-transform">
                  {topic.emoji || '📚'}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-black text-slate-800 text-sm truncate">{title}</h4>
                    {isCompleted && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs font-semibold text-slate-400 truncate">
                    {subtitle} • {mastered}/{total} {getWordsPlural(total, language)} ({percent}%)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Stars */}
                <div className="flex items-center">
                  {[1, 2, 3].map((starIdx) => (
                    <span
                      key={starIdx}
                      className={`text-sm ${
                        starIdx <= stars ? 'text-amber-400' : 'text-slate-200'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
