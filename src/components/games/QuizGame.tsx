import React, { useState, useEffect } from 'react';
import { Word, Topic, Language } from '../../types';
import { speakEnglish } from '../../utils/speech';
import { sounds } from '../../utils/soundEffects';
import { translations } from '../../utils/i18n';
import { Volume2, ArrowLeft } from 'lucide-react';

interface QuizGameProps {
  topic: Topic;
  allTopics: Topic[];
  language: Language;
  onRecordResult: (wordId: string, isCorrect: boolean) => void;
  onComplete: (correctCount: number, totalCount: number) => void;
  onBack: () => void;
}

export const QuizGame: React.FC<QuizGameProps> = ({
  topic,
  allTopics,
  language,
  onRecordResult,
  onComplete,
  onBack,
}) => {
  const t = translations[language];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState<Word[]>([]);
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentWord: Word | undefined = topic.words[currentIndex];

  useEffect(() => {
    if (!currentWord) return;

    setSelectedWordId(null);
    setIsAnswered(false);

    // Speak English word
    speakEnglish(currentWord.en);

    // Pick 3 distractors
    const otherWordsInTopic = topic.words.filter((w) => w.id !== currentWord.id);
    let pool = otherWordsInTopic;

    // If topic has fewer than 4 words, borrow from other topics
    if (pool.length < 3) {
      const externalWords = allTopics
        .flatMap((tp) => tp.words)
        .filter((w) => w.id !== currentWord.id && !pool.some((p) => p.id === w.id));
      pool = [...pool, ...externalWords];
    }

    // Shuffle and pick 3
    const shuffledPool = [...pool].sort(() => 0.5 - Math.random());
    const distractors = shuffledPool.slice(0, 3);
    const combined = [currentWord, ...distractors].sort(() => 0.5 - Math.random());
    setOptions(combined);
  }, [currentIndex, currentWord]);

  const handleSelectOption = (chosenWord: Word) => {
    if (isAnswered || !currentWord) return;

    setIsAnswered(true);
    setSelectedWordId(chosenWord.id);

    const isCorrect = chosenWord.id === currentWord.id;

    if (isCorrect) {
      sounds.playCorrect();
      setScore((prev) => prev + 1);
    } else {
      sounds.playWrong();
    }

    onRecordResult(currentWord.id, isCorrect);

    // Auto advance after short delay
    setTimeout(() => {
      if (currentIndex + 1 < topic.words.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        onComplete(score + (isCorrect ? 1 : 0), topic.words.length);
      }
    }, 1200);
  };

  if (!currentWord) return null;

  return (
    <div className="max-w-xl mx-auto px-4 py-4 flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-4">
        <button
          onClick={() => {
            sounds.playClick();
            onBack();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 font-bold text-sm shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.back}</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-2xl bg-amber-50 border-2 border-amber-200 text-amber-700 font-black text-sm">
            ⭐ {score}
          </div>
          <div className="px-3 py-1 rounded-2xl bg-indigo-50 border-2 border-indigo-200 text-indigo-700 font-black text-sm">
            {currentIndex + 1} / {topic.words.length}
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="w-full h-3 bg-slate-200 rounded-full mb-6 overflow-hidden border border-slate-300">
        <div
          className="h-full bg-pink-500 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / topic.words.length) * 100}%` }}
        />
      </div>

      {/* Target Word Card */}
      <div className="w-full bg-white rounded-3xl border-4 border-pink-300 shadow-xl p-6 text-center mb-6">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          {t.modes.quiz}
        </div>
        <h2 className="text-4xl sm:text-5xl font-black text-slate-800 tracking-tight font-comic mb-4">
          {currentWord.en}
        </h2>
        <button
          onClick={() => speakEnglish(currentWord.en)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-pink-50 border-2 border-pink-200 text-pink-700 font-bold text-sm shadow-sm hover:scale-105 active:scale-95 transition-transform"
        >
          <Volume2 className="w-5 h-5 text-pink-600" />
          <span>{t.listen}</span>
        </button>
      </div>

      {/* 4 Large Choice Buttons */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {options.map((option, idx) => {
          const translation = option[language] || option.ru || option.lv;
          const isCorrect = option.id === currentWord.id;
          const isChosen = option.id === selectedWordId;

          let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:border-pink-400 hover:bg-pink-50/50';

          if (isAnswered) {
            if (isCorrect) {
              btnStyle = 'bg-emerald-500 border-emerald-600 text-white shadow-emerald-200 scale-102';
            } else if (isChosen && !isCorrect) {
              btnStyle = 'bg-rose-500 border-rose-600 text-white animate-wiggle';
            } else {
              btnStyle = 'bg-slate-100 border-slate-200 text-slate-400 opacity-60';
            }
          }

          // Predefined border colors before answer
          const borderAccents = ['border-l-8 border-l-blue-400', 'border-l-8 border-l-amber-400', 'border-l-8 border-l-purple-400', 'border-l-8 border-l-emerald-400'];

          return (
            <button
              key={option.id}
              disabled={isAnswered}
              onClick={() => handleSelectOption(option)}
              className={`btn-3d p-4 rounded-3xl border-4 text-lg sm:text-xl font-black text-center shadow-md transition-all flex items-center justify-center min-h-[72px] ${btnStyle} ${!isAnswered ? borderAccents[idx % 4] : ''}`}
            >
              <span>{translation}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
