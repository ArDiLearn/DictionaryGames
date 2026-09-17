import React, { useState, useEffect } from 'react';
import { Word, Topic, Language, LearningCourse } from '../../types';
import { speakWord } from '../../utils/speech';
import { sounds } from '../../utils/soundEffects';
import { translations } from '../../utils/i18n';
import { Volume2, ArrowLeft, Headphones } from 'lucide-react';

interface AudioQuizGameProps {
  topic: Topic;
  allTopics: Topic[];
  language: Language;
  course?: LearningCourse;
  onRecordResult: (wordId: string, isCorrect: boolean) => void;
  onComplete: (correctCount: number, totalCount: number) => void;
  onBack: () => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export const AudioQuizGame: React.FC<AudioQuizGameProps> = ({
  topic,
  allTopics,
  language,
  course = 'en',
  onRecordResult,
  onComplete,
  onBack,
}) => {
  const t = translations[language];
  const [shuffledWords, setShuffledWords] = useState<Word[]>(() =>
    shuffleArray(topic.words || [])
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState<Word[]>([]);
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setShuffledWords(shuffleArray(topic.words || []));
    setCurrentIndex(0);
    setScore(0);
  }, [topic]);

  const currentWord: Word | undefined = shuffledWords[currentIndex];

  const playVoice = () => {
    if (!currentWord) return;
    setIsSpeaking(true);
    const textToSpeak = course === 'lv' ? currentWord.lv : currentWord.en;
    speakWord(
      textToSpeak,
      course,
      0.85,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  useEffect(() => {
    if (!currentWord) return;

    setSelectedWordId(null);
    setIsAnswered(false);

    playVoice();

    // Pick 3 distractors
    const otherWordsInTopic = topic.words.filter((w) => w.id !== currentWord.id);
    let pool = otherWordsInTopic;

    if (pool.length < 3) {
      const externalWords = allTopics
        .flatMap((tp) => tp.words)
        .filter((w) => w.id !== currentWord.id && !pool.some((p) => p.id === w.id));
      pool = [...pool, ...externalWords];
    }

    const shuffledPool = shuffleArray(pool);
    const distractors = shuffledPool.slice(0, 3);
    const combined = shuffleArray([currentWord, ...distractors]);
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

    setTimeout(() => {
      if (currentIndex + 1 < shuffledWords.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        onComplete(score + (isCorrect ? 1 : 0), shuffledWords.length);
      }
    }, 1200);
  };

  if (!currentWord) return null;

  return (
    <div className="max-w-xl mx-auto px-4 py-3 sm:py-4 flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-3">
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
          <div className="px-3 py-1 rounded-2xl bg-sky-50 border-2 border-sky-200 text-sky-700 font-black text-sm">
            {currentIndex + 1} / {shuffledWords.length}
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="w-full h-2.5 sm:h-3 bg-slate-200 rounded-full mb-3 sm:mb-4 overflow-hidden border border-slate-300">
        <div
          className="h-full bg-sky-500 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / shuffledWords.length) * 100}%` }}
        />
      </div>

      {/* Audio Prompter Card */}
      <div className="w-full bg-white rounded-3xl border-4 border-sky-300 shadow-xl p-4 sm:p-5 text-center mb-3 sm:mb-4 flex flex-col items-center">
        <div className="flex items-center gap-1.5 text-xs font-bold text-sky-600 uppercase tracking-wider mb-2">
          <Headphones className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>{t.modes.audio}</span>
        </div>

        {/* Big tactile speaker button */}
        <button
          onClick={playVoice}
          className={`btn-3d w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 border-4 border-white shadow-xl flex items-center justify-center text-white mb-2 hover:scale-105 active:scale-95 transition-all ${
            isSpeaking ? 'ring-6 sm:ring-8 ring-sky-200 animate-pulse' : ''
          }`}
          title={t.listen}
        >
          <Volume2 className="w-10 h-10 sm:w-12 sm:h-12" />
        </button>

        <p className="text-xs sm:text-sm font-bold text-slate-500">
          {t.audioPrompt}
        </p>

        {isAnswered && (
          <div className="mt-2 text-base sm:text-lg font-black text-indigo-600 font-comic animate-pop">
            {course === 'lv' ? currentWord.lv : currentWord.en}
          </div>
        )}
      </div>

      {/* 4 Choices in 2x2 Grid (2 columns on all devices so button 4 is always visible without scrolling) */}
      <div className="w-full grid grid-cols-2 gap-2.5 sm:gap-3.5">
        {options.map((option) => {
          const translation = course === 'lv' ? option.ru : (option[language] || option.ru || option.lv);
          const isCorrect = option.id === currentWord.id;
          const isChosen = option.id === selectedWordId;

          let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:border-sky-400 hover:bg-sky-50/50';

          if (isAnswered) {
            if (isCorrect) {
              btnStyle = 'bg-emerald-500 border-emerald-600 text-white shadow-emerald-200 scale-102';
            } else if (isChosen && !isCorrect) {
              btnStyle = 'bg-rose-500 border-rose-600 text-white animate-wiggle';
            } else {
              btnStyle = 'bg-slate-100 border-slate-200 text-slate-400 opacity-60';
            }
          }

          return (
            <button
              key={option.id}
              disabled={isAnswered}
              onClick={() => handleSelectOption(option)}
              className={`btn-3d p-2.5 sm:p-4 rounded-2xl sm:rounded-3xl border-3 sm:border-4 text-base sm:text-xl font-black text-center shadow-md transition-all flex items-center justify-center min-h-[58px] sm:min-h-[72px] leading-snug ${btnStyle}`}
            >
              <span>{translation}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
