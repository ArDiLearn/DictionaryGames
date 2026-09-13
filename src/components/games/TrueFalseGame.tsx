import React, { useState, useEffect, useMemo } from 'react';
import { Word, Topic, Language } from '../../types';
import { speakEnglish } from '../../utils/speech';
import { sounds } from '../../utils/soundEffects';
import { translations } from '../../utils/i18n';
import { Volume2, ArrowLeft, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TrueFalseGameProps {
  topic: Topic;
  allTopics: Topic[];
  language: Language;
  onRecordResult: (wordId: string, isCorrect: boolean) => void;
  onComplete: (correctCount: number, totalCount: number) => void;
  onBack: () => void;
}

interface TFQuestion {
  word: Word;
  displayedTranslation: string;
  isTrue: boolean;
}

export const TrueFalseGame: React.FC<TrueFalseGameProps> = ({
  topic,
  allTopics,
  language,
  onRecordResult,
  onComplete,
  onBack,
}) => {
  const t = translations[language];

  // Generate question set on mount
  const questions = useMemo<TFQuestion[]>(() => {
    if (!topic.words || topic.words.length === 0) return [];

    // Shuffle topic words
    const shuffled = [...topic.words].sort(() => Math.random() - 0.5);

    // Other words pool for false distractors
    const allWords = allTopics.flatMap((tp) => tp.words);

    return shuffled.map((word, idx) => {
      // Alternate or random with balance
      const isTrue = idx % 2 === 0 ? Math.random() < 0.6 : Math.random() < 0.4;

      if (isTrue) {
        return {
          word,
          displayedTranslation: word[language] || word.ru,
          isTrue: true,
        };
      } else {
        // Pick a distractor word
        let distractorPool = topic.words.filter((w) => w.id !== word.id && (w[language] || w.ru));
        if (distractorPool.length === 0) {
          distractorPool = allWords.filter((w) => w.id !== word.id && (w[language] || w.ru));
        }

        const distractor = distractorPool[Math.floor(Math.random() * distractorPool.length)] || word;
        return {
          word,
          displayedTranslation: distractor[language] || distractor.ru,
          isTrue: false,
        };
      }
    });
  }, [topic, allTopics, language]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userChoice, setUserChoice] = useState<boolean | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [score, setScore] = useState(0);

  const currentQ: TFQuestion | undefined = questions[currentIndex];

  const playVoice = () => {
    if (!currentQ) return;
    setIsSpeaking(true);
    speakEnglish(
      currentQ.word.en,
      0.85,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  useEffect(() => {
    if (!currentQ) return;
    setUserChoice(null);
    setIsAnswered(false);
    playVoice();
  }, [currentIndex, currentQ]);

  const handleAnswer = (choice: boolean) => {
    if (isAnswered || !currentQ) return;

    setUserChoice(choice);
    setIsAnswered(true);

    const isCorrect = choice === currentQ.isTrue;

    if (isCorrect) {
      sounds.playCorrect();
      setScore((prev) => prev + 1);
      onRecordResult(currentQ.word.id, true);

      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.7 },
      });

      setTimeout(() => {
        advanceQuestion(score + 1);
      }, 850);
    } else {
      sounds.playWrong();
      onRecordResult(currentQ.word.id, false);

      setTimeout(() => {
        advanceQuestion(score);
      }, 1600);
    }
  };

  const advanceQuestion = (finalScore: number) => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onComplete(finalScore, questions.length);
    }
  };

  if (!currentQ) {
    return (
      <div className="text-center py-12">
        <p className="font-bold text-slate-500">Загрузка...</p>
      </div>
    );
  }

  const progressPercent = ((currentIndex + 1) / questions.length) * 100;
  const isCorrectChoice = userChoice === currentQ.isTrue;

  return (
    <div className="max-w-xl mx-auto px-4 py-4 sm:py-6">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <button
          onClick={() => {
            sounds.playClick();
            onBack();
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white rounded-2xl border-2 border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors shadow-sm cursor-pointer text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.back}</span>
        </button>

        <div className="flex items-center gap-2 bg-indigo-50 border-2 border-indigo-200 px-3 py-1 rounded-full text-indigo-700 font-bold text-xs sm:text-sm">
          <span>{topic.emoji || '📖'}</span>
          <span className="truncate max-w-[120px] sm:max-w-[160px]">
            {topic.topic_name[language] || topic.topic_name.en}
          </span>
        </div>

        <div className="flex items-center gap-1 bg-amber-50 border-2 border-amber-300 px-3 py-1 rounded-full text-amber-600 font-bold text-xs sm:text-sm">
          <span>⭐</span>
          <span>{score}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden mb-5 border border-slate-300 shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-green-500 transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Prompt title */}
      <p className="text-center text-xs sm:text-sm font-bold text-slate-500 mb-3">
        {t.trafficPrompt}
      </p>

      {/* Central Pair Card */}
      <div
        className={`bg-white rounded-3xl border-4 p-6 sm:p-8 shadow-xl text-center mb-6 transition-all duration-300 relative ${
          !isAnswered
            ? 'border-indigo-100 shadow-indigo-100'
            : isCorrectChoice
            ? 'border-emerald-400 bg-emerald-50/40 shadow-emerald-100 scale-102'
            : 'border-rose-400 bg-rose-50/40 shadow-rose-100 animate-shake'
        }`}
      >
        {/* Top English Word */}
        <div className="flex items-center justify-center gap-3 mb-1">
          <h2 className="text-3xl sm:text-4xl font-black text-indigo-700 tracking-tight font-comic">
            {currentQ.word.en}
          </h2>

          <button
            onClick={playVoice}
            className={`w-11 h-11 rounded-2xl bg-indigo-100 hover:bg-indigo-200 border-2 border-indigo-300 flex items-center justify-center text-indigo-700 transition-transform cursor-pointer ${
              isSpeaking ? 'scale-115 ring-4 ring-indigo-200' : 'hover:scale-105 active:scale-95'
            }`}
            title={t.listen}
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Phonetic Transcription */}
        {currentQ.word.transcription && (
          <p className="text-sm font-semibold text-slate-400 tracking-wide font-mono mb-4">
            {currentQ.word.transcription}
          </p>
        )}

        {/* Divider / Equals Icon */}
        <div className="flex items-center justify-center my-3">
          <span className="w-10 h-10 rounded-2xl bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-slate-400 font-black text-lg">
            =
          </span>
        </div>

        {/* Displayed Translation */}
        <div className="mt-2">
          <p className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
            {currentQ.displayedTranslation}
          </p>
        </div>

        {/* Feedback Badge on Answer */}
        {isAnswered && (
          <div className="mt-5 animate-pop">
            {isCorrectChoice ? (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500 text-white rounded-2xl font-black text-sm shadow-md">
                <Sparkles className="w-4 h-4" />
                <span>{t.correct}</span>
              </div>
            ) : (
              <div className="inline-flex flex-col items-center gap-1 px-4 py-1.5 bg-rose-500 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-md">
                <div className="flex items-center gap-1">
                  <span>{t.wrong}</span>
                </div>
                <div className="text-[11px] sm:text-xs opacity-95">
                  {currentQ.isTrue
                    ? (language === 'ru' ? 'Это верная пара!' : 'Tas bija pareizi!')
                    : `${language === 'ru' ? 'Правильно' : 'Pareizi'}: ${currentQ.word[language] || currentQ.word.ru}`}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Traffic Light Buttons (Green & Red) */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        {/* GREEN / TRUE BUTTON */}
        <button
          onClick={() => handleAnswer(true)}
          disabled={isAnswered}
          className={`p-5 sm:p-6 rounded-3xl border-b-6 flex flex-col items-center justify-center gap-2 font-black transition-all cursor-pointer shadow-lg active:border-b-0 active:translate-y-1.5 ${
            isAnswered && userChoice === true
              ? currentQ.isTrue
                ? 'bg-gradient-to-b from-emerald-400 to-green-600 text-white border-green-700 scale-105 shadow-emerald-200'
                : 'bg-gradient-to-b from-rose-400 to-red-600 text-white border-red-700'
              : 'bg-gradient-to-b from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-500 text-white border-emerald-700 hover:scale-102 active:scale-98'
          } ${isAnswered && userChoice !== true ? 'opacity-40 pointer-events-none' : ''}`}
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center text-white shadow-inner">
            <CheckCircle2 className="w-9 h-9 sm:w-10 sm:h-10 stroke-[2.5]" />
          </div>
          <span className="text-xl sm:text-2xl tracking-wide">{t.trueBtn}</span>
          <span className="text-[11px] sm:text-xs text-emerald-100 font-bold -mt-1">
            {language === 'ru' ? 'Зелёный' : 'Zaļš'}
          </span>
        </button>

        {/* RED / FALSE BUTTON */}
        <button
          onClick={() => handleAnswer(false)}
          disabled={isAnswered}
          className={`p-5 sm:p-6 rounded-3xl border-b-6 flex flex-col items-center justify-center gap-2 font-black transition-all cursor-pointer shadow-lg active:border-b-0 active:translate-y-1.5 ${
            isAnswered && userChoice === false
              ? !currentQ.isTrue
                ? 'bg-gradient-to-b from-emerald-400 to-green-600 text-white border-green-700 scale-105 shadow-emerald-200'
                : 'bg-gradient-to-b from-rose-400 to-red-600 text-white border-red-700'
              : 'bg-gradient-to-b from-rose-400 to-rose-500 hover:from-rose-300 hover:to-rose-500 text-white border-rose-700 hover:scale-102 active:scale-98'
          } ${isAnswered && userChoice !== false ? 'opacity-40 pointer-events-none' : ''}`}
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center text-white shadow-inner">
            <XCircle className="w-9 h-9 sm:w-10 sm:h-10 stroke-[2.5]" />
          </div>
          <span className="text-xl sm:text-2xl tracking-wide">{t.falseBtn}</span>
          <span className="text-[11px] sm:text-xs text-rose-100 font-bold -mt-1">
            {language === 'ru' ? 'Красный' : 'Sarkans'}
          </span>
        </button>
      </div>

      {/* Round Counter Footer */}
      <div className="mt-6 text-center text-xs font-bold text-slate-400">
        {currentIndex + 1} / {questions.length}
      </div>
    </div>
  );
};
