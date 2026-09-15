import React, { useState, useEffect, useRef } from 'react';
import { Word, Topic, Language } from '../../types';
import { speakEnglish } from '../../utils/speech';
import { sounds } from '../../utils/soundEffects';
import { translations } from '../../utils/i18n';
import { WordIllustration } from '../WordIllustration';
import { Volume2, RotateCw, ArrowLeft, ChevronLeft, ChevronRight, LayoutGrid, X } from 'lucide-react';

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
  const [isWordGridOpen, setIsWordGridOpen] = useState(false);
  const [knownWordIds, setKnownWordIds] = useState<Set<string>>(new Set());
  const ribbonRef = useRef<HTMLDivElement>(null);
  const wordBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);

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

  useEffect(() => {
    if (wordBtnRefs.current[currentIndex]) {
      wordBtnRefs.current[currentIndex]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [currentIndex]);



  const handleNext = (known: boolean) => {
    if (!currentWord) return;

    if (known) {
      sounds.playCorrect();
      setCorrectCount((prev) => prev + 1);
      setKnownWordIds((prev) => new Set([...prev, currentWord.id]));
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

  const handleJumpTo = (index: number) => {
    if (index < 0 || index >= topic.words.length) return;
    if (index === currentIndex) {
      handleSpeak();
      return;
    }
    sounds.playClick();
    setCurrentIndex(index);
    setIsFlipped(false);
  };

  if (!currentWord) return null;

  const translation = currentWord[language] || currentWord.ru || currentWord.lv;

  return (
    <div className="max-w-xl mx-auto px-4 py-4 flex flex-col items-center">
      {/* Top bar: Back & Counter & Grid Button */}
      <div className="w-full flex items-center justify-between mb-4">
        <button
          onClick={() => {
            sounds.playClick();
            onBack();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 font-bold text-sm shadow-sm hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.back}</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Quick Grid Button */}
          <button
            onClick={() => {
              sounds.playClick();
              setIsWordGridOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100 border-2 border-indigo-200 text-indigo-700 font-black text-xs sm:text-sm shadow-sm transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            title={t.allWords}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>{t.allWords}</span>
          </button>

          <div className="px-3 py-1.5 rounded-2xl bg-indigo-50 border-2 border-indigo-200 text-indigo-700 font-black text-sm shadow-sm">
            {currentIndex + 1} / {topic.words.length}
          </div>
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
        className="w-full min-h-[320px] sm:min-h-[360px] bg-white rounded-3xl border-4 border-indigo-300 shadow-2xl p-6 flex flex-col items-center justify-between cursor-pointer transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.99] relative overflow-hidden group"
      >
        <div className="w-full flex justify-between items-center text-slate-400">
          <span className="text-xs font-bold uppercase tracking-wider">
            {isFlipped ? (language === 'ru' ? '🇷🇺 Русский' : '🇱🇻 Latviešu') : '🇬🇧 English'}
          </span>
          <RotateCw className="w-5 h-5 text-indigo-400 group-hover:rotate-180 transition-transform duration-500" />
        </div>

        {/* Word Display */}
        <div className="text-center my-auto py-4">
          {!isFlipped ? (
            <div className="flex flex-col items-center">
              {/* Word Picture */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-indigo-50 border-3 border-indigo-200 flex items-center justify-center p-2 shadow-inner mb-4 group-hover:scale-110 transition-transform select-none">
                <WordIllustration word={currentWord} fallbackEmoji={topic.emoji} />
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-indigo-600 tracking-tight font-comic">
                {currentWord.en}
              </h2>
              {currentWord.transcription && (
                <div className="mt-3 px-4 py-1.5 bg-indigo-50 border-2 border-indigo-200 rounded-2xl text-indigo-700 font-mono text-xl sm:text-2xl font-bold tracking-wider shadow-sm">
                  {currentWord.transcription}
                </div>
              )}
              <p className="text-xs sm:text-sm font-semibold text-slate-400 mt-3">
                {t.tapToFlip}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              {/* Word Picture */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-pink-50 border-3 border-pink-200 flex items-center justify-center p-2 shadow-inner mb-4 select-none">
                <WordIllustration word={currentWord} fallbackEmoji={topic.emoji} />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-pink-600 tracking-tight leading-snug">
                {translation}
              </h2>
              <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
                <span className="text-base font-bold text-slate-600">{currentWord.en}</span>
                {currentWord.transcription && (
                  <span className="px-2.5 py-0.5 bg-slate-100 border border-slate-200 rounded-xl text-indigo-600 font-mono text-sm sm:text-base font-bold">
                    {currentWord.transcription}
                  </span>
                )}
              </div>
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

      {/* Word Picture Icons Carousel Ribbon */}
      <div className="w-full mt-4 bg-white rounded-3xl border-3 border-indigo-200/80 p-2 sm:p-3 shadow-md">
        <div className="flex items-center justify-between px-2 mb-2">
          <span className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <span>🖼️</span>
            <span>{t.selectWord}</span>
          </span>
          <button
            onClick={() => {
              sounds.playClick();
              setIsWordGridOpen(true);
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-colors cursor-pointer"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>{t.allWords} ({topic.words.length})</span>
          </button>
        </div>

        <div className="relative flex items-center">
          {/* Previous Button */}
          <button
            onClick={() => handleJumpTo(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border-2 border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center font-bold shadow-xs transition-all shrink-0 mr-1.5 cursor-pointer"
            title={language === 'ru' ? 'Предыдущее слово' : 'Iepriekšējais vārds'}
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 stroke-[2.5]" />
          </button>

          {/* Horizontal scroll track with word icon tiles */}
          <div
            ref={ribbonRef}
            className="flex items-center gap-2 overflow-x-auto no-scrollbar scrollbar-none py-1.5 px-1 overscroll-x-contain touch-pan-x scroll-smooth w-full"
          >
            {topic.words.map((word, index) => {
              const isCurrent = index === currentIndex;
              const isLearned = knownWordIds.has(word.id);
              const wordTitle = word[language] || word.ru || word.lv;

              return (
                <button
                  key={word.id}
                  ref={(el) => {
                    wordBtnRefs.current[index] = el;
                  }}
                  onClick={() => handleJumpTo(index)}
                  className={`flex flex-col items-center justify-between min-w-[62px] w-[62px] sm:min-w-[70px] sm:w-[70px] h-[74px] sm:h-[82px] p-1.5 rounded-2xl border-3 transition-all shrink-0 cursor-pointer relative select-none ${
                    isCurrent
                      ? 'bg-gradient-to-b from-indigo-500 to-indigo-600 border-indigo-600 text-white shadow-lg scale-105 -translate-y-0.5 ring-3 ring-indigo-200'
                      : 'bg-slate-50 hover:bg-indigo-50/50 border-slate-200 hover:border-indigo-300 text-slate-700 shadow-xs'
                  }`}
                  title={`${word.en} — ${wordTitle}`}
                >
                  {/* Picture / Icon */}
                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center p-0.5 transition-transform ${
                      isCurrent ? 'bg-white/20 scale-105' : 'bg-white shadow-inner'
                    }`}
                  >
                    <WordIllustration
                      word={word}
                      fallbackEmoji={topic.emoji}
                      className="w-7 h-7 sm:w-8 sm:h-8 text-2xl"
                    />
                  </div>

                  {/* Word Text */}
                  <span
                    className={`text-[11px] sm:text-xs font-black truncate w-full text-center font-comic leading-tight px-0.5 ${
                      isCurrent ? 'text-white' : 'text-slate-800'
                    }`}
                  >
                    {word.en}
                  </span>

                  {/* Known checkmark badge */}
                  {isLearned && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black border-2 border-white shadow-xs">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handleJumpTo(currentIndex + 1)}
            disabled={currentIndex >= topic.words.length - 1}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border-2 border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center font-bold shadow-xs transition-all shrink-0 ml-1.5 cursor-pointer"
            title={language === 'ru' ? 'Следующее слово' : 'Nākamais vārds'}
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full grid grid-cols-2 gap-4 mt-5">
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
      {/* Modal: All Words Grid Selection */}
      {isWordGridOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
          onClick={() => setIsWordGridOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-lg rounded-3xl border-4 border-indigo-200 shadow-2xl p-4 sm:p-6 flex flex-col max-h-[85vh] animate-pop"
          >
            <div className="flex items-center justify-between pb-3 border-b-2 border-slate-100 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{topic.emoji || '📖'}</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-800 font-comic">
                    {t.selectWord}
                  </h3>
                  <p className="text-xs font-semibold text-slate-400">
                    {topic.topic_name[language] || topic.topic_name.en} • {topic.words.length}{' '}
                    {language === 'ru' ? 'слов' : 'vārdi'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsWordGridOpen(false)}
                className="w-9 h-9 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                title={language === 'ru' ? 'Закрыть' : 'Aizvērt'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-2.5 overflow-y-auto pr-1 py-1 no-scrollbar">
              {topic.words.map((word, index) => {
                const isCurrent = index === currentIndex;
                const isLearned = knownWordIds.has(word.id);
                const wordTitle = word[language] || word.ru || word.lv;

                return (
                  <button
                    key={word.id}
                    onClick={() => {
                      handleJumpTo(index);
                      setIsWordGridOpen(false);
                    }}
                    className={`flex flex-col items-center p-2.5 rounded-2xl border-2 transition-all cursor-pointer text-center relative select-none hover:scale-105 active:scale-95 ${
                      isCurrent
                        ? 'bg-indigo-50 border-indigo-500 shadow-md ring-3 ring-indigo-200'
                        : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 shadow-xs'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center p-1 mb-1.5 shadow-inner">
                      <WordIllustration
                        word={word}
                        fallbackEmoji={topic.emoji}
                        className="w-10 h-10 text-3xl"
                      />
                    </div>
                    <span className="text-sm font-black text-slate-800 font-comic tracking-tight truncate w-full">
                      {word.en}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 truncate w-full mt-0.5">
                      {wordTitle}
                    </span>
                    {isLearned && (
                      <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black shadow-xs">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
