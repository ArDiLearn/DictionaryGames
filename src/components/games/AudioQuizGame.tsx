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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState<Word[]>([]);
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [score, setScore] = useState(0);

  const currentWord: Word | undefined = topic.words[currentIndex];

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
          <div className="px-3 py-1 rounded-2xl bg-sky-50 border-2 border-sky-200 text-sky-700 font-black text-sm">
            {currentIndex + 1} / {topic.words.length}
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="w-full h-3 bg-slate-200 rounded-full mb-6 overflow-hidden border border-slate-300">
        <div
          className="h-full bg-sky-500 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / topic.words.length) * 100}%` }}
        />
      </div>

      {/* Audio Prompter Card */}
      <div className="w-full bg-white rounded-3xl border-4 border-sky-300 shadow-xl p-6 text-center mb-6 flex flex-col items-center">
        <div className="flex items-center gap-1.5 text-xs font-bold text-sky-600 uppercase tracking-wider mb-3">
          <Headphones className="w-4 h-4" />
          <span>{t.modes.audio}</span>
        </div>

        {/* Big tactile speaker button */}
        <button
          onClick={playVoice}
          className={`btn-3d w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 border-4 border-white shadow-xl flex items-center justify-center text-white mb-3 hover:scale-105 active:scale-95 transition-all ${
            isSpeaking ? 'ring-8 ring-sky-200 animate-pulse' : ''
          }`}
        >
          <Volume2 className="w-14 h-14 sm:w-16 sm:h-16" />
        </button>

        <p className="text-sm font-bold text-slate-500">
          {t.audioPrompt}
        </p>

        {isAnswered && (
          <div className="mt-3 text-lg font-black text-indigo-600 font-comic animate-pop">
            {course === 'lv' ? currentWord.lv : currentWord.en}
          </div>
        )}
      </div>

      {/* 4 Choices */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
              className={`btn-3d p-4 rounded-3xl border-4 text-lg sm:text-xl font-black text-center shadow-md transition-all flex items-center justify-center min-h-[72px] ${btnStyle}`}
            >
              <span>{translation}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
