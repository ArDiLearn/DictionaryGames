import React, { useMemo } from 'react';
import { Topic, Language, LearningCourse, WordProgress, Word } from '../../types';
import { translations } from '../../utils/i18n';
import { sounds } from '../../utils/soundEffects';
import { speakWord } from '../../utils/speech';
import { Volume2, ClipboardCheck, Gamepad2 } from 'lucide-react';

interface PracticeTabProps {
  language: Language;
  course: LearningCourse;
  topics: Topic[];
  wordProgress: Record<string, WordProgress>;
  onStartMistakesTest?: () => void;
  onOpenMistakesGames?: () => void;
}

export const PracticeTab: React.FC<PracticeTabProps> = ({
  language,
  course,
  topics,
  wordProgress,
  onStartMistakesTest,
  onOpenMistakesGames,
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
    return list;
  }, [topics, wordProgress]);

  const headerStyle =
    course === 'lv'
      ? {
          card: 'bg-[#FDF2F4] border-2 border-[#F2D1D8]',
          title: 'text-[#852E4B]',
          sub: 'text-[#852E4B]/80',
          btnPrimary: 'bg-[#852E4B] hover:bg-[#6E223B] text-white',
          btnSecondary: 'bg-white hover:bg-[#FDF2F4] border-2 border-[#F2D1D8] text-[#852E4B]',
        }
      : course === 'en-lv'
      ? {
          card: 'bg-teal-50 border-2 border-teal-200',
          title: 'text-teal-950',
          sub: 'text-teal-800/80',
          btnPrimary: 'bg-teal-600 hover:bg-teal-700 text-white',
          btnSecondary: 'bg-white hover:bg-teal-50 border-2 border-teal-300 text-teal-900',
        }
      : {
          card: 'bg-sky-50 border-2 border-sky-200',
          title: 'text-sky-950',
          sub: 'text-sky-800/80',
          btnPrimary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
          btnSecondary: 'bg-white hover:bg-sky-50 border-2 border-sky-300 text-sky-900',
        };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className={`${headerStyle.card} rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
        <div>
          <h3 className={`text-sm sm:text-base font-black ${headerStyle.title}`}>
            {s.wordsToPracticeTitle}
          </h3>
          <p className={`text-xs ${headerStyle.sub} font-medium mt-0.5`}>
            {s.wordsToPracticeSubtitle}
          </p>
        </div>

        {wordsToPractice.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {onStartMistakesTest && (
              <button
                onClick={() => {
                  sounds.playClick();
                  onStartMistakesTest();
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl active:scale-95 font-black text-xs sm:text-sm shadow-sm transition-all cursor-pointer ${headerStyle.btnPrimary}`}
              >
                <ClipboardCheck className="w-4 h-4" />
                <span>{s.startMistakesTestBtn}</span>
              </button>
            )}
            {onOpenMistakesGames && (
              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenMistakesGames();
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl active:scale-95 font-black text-xs sm:text-sm shadow-xs transition-all cursor-pointer ${headerStyle.btnSecondary}`}
              >
                <Gamepad2 className="w-4 h-4" />
                <span>{s.practiceMistakesGamesBtn}</span>
              </button>
            )}
          </div>
        )}
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
            const wordTranslation =
              course === 'lv'
                ? word.ru
                : course === 'en-lv'
                ? word.lv
                : word[language] || word.ru;
            const topicTitle =
              isLatvianCourse || course === 'en-lv'
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
