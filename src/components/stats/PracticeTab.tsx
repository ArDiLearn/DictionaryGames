import React, { useMemo } from 'react';
import { Topic, Language, LearningCourse, WordProgress, Word } from '../../types';
import { translations } from '../../utils/i18n';
import { sounds } from '../../utils/soundEffects';
import { speakWord } from '../../utils/speech';
import { Volume2 } from 'lucide-react';

interface PracticeTabProps {
  language: Language;
  course: LearningCourse;
  topics: Topic[];
  wordProgress: Record<string, WordProgress>;
}

export const PracticeTab: React.FC<PracticeTabProps> = ({
  language,
  course,
  topics,
  wordProgress,
}) => {
  const t = translations[language];
  const s = t.statsModal;

  const wordsToPractice = useMemo(() => {
    const wordMap = new Map<string, { word: Word; topic: Topic }>();
    topics.forEach((topic) => {
      topic.words.forEach((word) => {
        wordMap.set(word.id, { word, topic });
      });
    });

    const list: { word: Word; topic: Topic; wp: WordProgress }[] = [];
    Object.entries(wordProgress).forEach(([wordId, wp]) => {
      if ((wp.timesWrong || 0) > 0 && !wp.isLearned) {
        const item = wordMap.get(wordId);
        if (item) {
          list.push({ word: item.word, topic: item.topic, wp });
        }
      }
    });

    // Sort by most mistakes descending
    list.sort((a, b) => (b.wp.timesWrong || 0) - (a.wp.timesWrong || 0));
    return list.slice(0, 15);
  }, [topics, wordProgress]);

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-3 sm:p-4">
        <h3 className="text-sm sm:text-base font-black text-amber-950">
          {s.wordsToPracticeTitle}
        </h3>
        <p className="text-xs text-amber-800/80 font-medium mt-0.5">
          {s.wordsToPracticeSubtitle}
        </p>
      </div>

      {wordsToPractice.length === 0 ? (
        <div className="text-center py-12 px-4 bg-emerald-50 border-2 border-emerald-200 rounded-3xl">
          <span className="text-4xl mb-2 block">🎉</span>
          <p className="font-black text-emerald-900 text-base">{s.noWordsToPractice}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {wordsToPractice.map(({ word, topic, wp }) => {
            const isLatvianCourse = course === 'lv';
            const wordTarget = isLatvianCourse ? word.lv : word.en;
            const wordTranslation = isLatvianCourse ? word.ru : (word[language] || word.ru);
            const topicTitle = isLatvianCourse
              ? topic.topic_name.lv || topic.topic_name.ru
              : topic.topic_name[language] || topic.topic_name.ru;

            return (
              <div
                key={word.id}
                className="bg-white border-2 border-slate-200 hover:border-indigo-300 p-3 rounded-2xl shadow-xs flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <button
                    onClick={() => {
                      sounds.playClick();
                      speakWord(wordTarget, course);
                    }}
                    className="w-9 h-9 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-600 flex items-center justify-center shrink-0 cursor-pointer"
                    title={t.listen}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-black text-slate-900 text-sm">{wordTarget}</h4>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded truncate max-w-[120px]">
                        {topic.emoji || '📚'} {topicTitle}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-500 truncate">
                      {wordTranslation}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[11px] bg-rose-100 text-rose-700 font-black px-2 py-0.5 rounded-lg" title={s.wrongAnswers}>
                    -{wp.timesWrong} {s.timesWrongLabel}
                  </span>
                  <span className="text-[11px] bg-emerald-100 text-emerald-700 font-black px-2 py-0.5 rounded-lg" title={s.correctAnswers}>
                    +{wp.timesCorrect}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
