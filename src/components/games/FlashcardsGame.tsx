import React, { useState, useEffect } from 'react';
import { Word, Topic, Language } from '../../types';
import { speakEnglish } from '../../utils/speech';
import { sounds } from '../../utils/soundEffects';
import { translations } from '../../utils/i18n';
import { Volume2, RotateCw, ArrowLeft } from 'lucide-react';

interface FlashcardsGameProps {
  topic: Topic;
  language: Language;
  onRecordResult: (wordId: string, isCorrect: boolean) => void;
  onComplete: (correctCount: number, totalCount: number) => void;
  onBack: () => void;
}

export const FlashcardsGame: React.FC<FlashcardsGameProps> = ({
  topic,
  language,
  onRecordResult,
  onComplete,
  onBack,
}) => {
  const t = translations[language];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const currentWord: Word | undefined = topic.words[currentIndex];

  useEffect(() => {
    if (currentWord) {
      setIsFlipped(false);
      // Auto-pronounce new word
      handleSpeak();
    }
  }, [currentIndex]);

  const handleSpeak = () => {
    if (!currentWord) return;
    setIsSpeaking(true);
    speakEnglish(
      currentWord.en,
      0.85,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  const handleFlip = () => {
    sounds.playClick();
    setIsFlipped(!isFlipped);
  };

  const handleNext = (known: boolean) => {
    if (!currentWord) return;

    if (known) {
      sounds.playCorrect();
      setCorrectCount((prev) => prev + 1);
    } else {
      sounds.playWrong();
    }

    onRecordResult(currentWord.id, known);

    if (currentIndex + 1 < topic.words.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onComplete(correctCount + (known ? 1 : 0), topic.words.length);
    }
  };

  if (!currentWord) return null;

  const translation = currentWord[language] || currentWord.ru || currentWord.lv;

  return (
    <div className="max-w-xl mx-auto px-4 py-4 flex flex-col items-center">
      {/* Top bar: Back & Counter */}
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

        <div className="px-3 py-1 rounded-2xl bg-indigo-50 border-2 border-indigo-200 text-indigo-700 font-black text-sm">
          {currentIndex + 1} / {topic.words.length}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-3 bg-slate-200 rounded-full mb-6 overflow-hidden border border-slate-300">
        <div
          className="h-full bg-indigo-500 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / topic.words.length) * 100}%` }}
        />
      </div>

      {/* Flip Card */}
      <div
        onClick={handleFlip}
        className="w-full min-h-[300px] sm:min-h-[340px] bg-white rounded-3xl border-4 border-indigo-300 shadow-2xl p-6 flex flex-col items-center justify-between cursor-pointer transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.99] relative overflow-hidden group"
      >
        <div className="w-full flex justify-between items-center text-slate-400">
          <span className="text-xs font-bold uppercase tracking-wider">
            {isFlipped ? (language === 'ru' ? '🇷🇺 Русский' : '🇱🇻 Latviešu') : '🇬🇧 English'}
          </span>
          <RotateCw className="w-5 h-5 text-indigo-400 group-hover:rotate-180 transition-transform duration-500" />
        </div>

        {/* Word Display */}
        <div className="text-center my-auto py-6">
          {!isFlipped ? (
            <div>
              <h2 className="text-4xl sm:text-5xl font-black text-indigo-600 tracking-tight font-comic">
                {currentWord.en}
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-400 mt-2">
                {t.tapToFlip}
              </p>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-pink-600 tracking-tight leading-snug">
                {translation}
              </h2>
              <p className="text-sm font-bold text-slate-400 mt-2">
                {currentWord.en}
              </p>
            </div>
          )}
        </div>

        {/* Audio Button */}
        <div className="w-full flex justify-center pb-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSpeak();
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-50 border-2 border-indigo-200 text-indigo-700 font-black shadow-sm transition-all hover:scale-105 active:scale-95 ${
              isSpeaking ? 'ring-4 ring-indigo-300 animate-pulse' : ''
            }`}
          >
            <Volume2 className="w-6 h-6 text-indigo-600" />
            <span>{t.listen}</span>
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full grid grid-cols-2 gap-4 mt-6">
        <button
          onClick={() => handleNext(false)}
          className="btn-3d py-4 px-4 rounded-3xl bg-amber-100 hover:bg-amber-200 border-4 border-amber-300 text-amber-800 font-black text-lg sm:text-xl shadow-lg flex items-center justify-center gap-2"
        >
          <span>{t.needPractice}</span>
        </button>

        <button
          onClick={() => handleNext(true)}
          className="btn-3d py-4 px-4 rounded-3xl bg-emerald-400 hover:bg-emerald-500 border-4 border-emerald-600 text-white font-black text-lg sm:text-xl shadow-lg flex items-center justify-center gap-2"
        >
          <span>{t.iKnow}</span>
        </button>
      </div>
    </div>
  );
};
