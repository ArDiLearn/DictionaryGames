import React, { useState, useMemo } from 'react';
import { ArrowLeft, Volume2, RotateCcw, CheckCircle2 } from 'lucide-react';
import { GrammarTopic, GrammarQuestion, getQuestionsForGrammarTopic } from '../../data/grammarData';
import { Language, LearningCourse } from '../../types';
import { sounds } from '../../utils/soundEffects';
import { speakWord } from '../../utils/speech';
import { GrammarIllustration } from '../GrammarIllustration';
import { saveGrammarProgress } from '../../services/storage';

interface GrammarGameProps {
  topic: GrammarTopic;
  language: Language;
  course?: LearningCourse;
  onComplete: (topicId: string, stars: number, score: number) => void;
  onBack: () => void;
}

export const GrammarGame: React.FC<GrammarGameProps> = ({
  topic,
  language,
  course = 'en',
  onComplete,
  onBack,
}) => {
  const questions: GrammarQuestion[] = useMemo(() => {
    return getQuestionsForGrammarTopic(topic);
  }, [topic]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentQ = questions[currentIndex];
  const progressPercent = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  // Manual speech for prompt
  const handleSpeakPrompt = () => {
    sounds.playClick();
    if (currentQ?.audioText) {
      speakWord(currentQ.audioText, 'en');
    }
  };

  // Manual speech for an option
  const handleSpeakOption = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    sounds.playClick();
    speakWord(text, 'en');
  };

  // Handle option select
  const handleSelectOption = (idx: number) => {
    if (isAnswerChecked || isGameOver) return;

    setSelectedOptionIndex(idx);
    setIsAnswerChecked(true);

    const isCorrect = idx === currentQ.correctIndex;

    if (isCorrect) {
      sounds.playCorrect();
      setCorrectCount((prev) => prev + 1);
    } else {
      sounds.playWrong();
    }

    // Delay before next question
    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOptionIndex(null);
        setIsAnswerChecked(false);
      } else {
        // Finish game
        const finalScore = isCorrect ? correctCount + 1 : correctCount;
        finishGame(finalScore);
      }
    }, isCorrect ? 900 : 1500);
  };

  const finishGame = (finalScore: number) => {
    setIsGameOver(true);
    const ratio = questions.length > 0 ? finalScore / questions.length : 0;
    const earnedStars = ratio >= 0.9 ? 3 : ratio >= 0.7 ? 2 : ratio >= 0.5 ? 1 : 0;

    sounds.playFanfare();

    // Persist progress
    try {
      saveGrammarProgress(
        {
          [topic.id]: {
            stars: earnedStars,
            bestScore: finalScore,
            completedAt: new Date().toISOString(),
          },
        },
        course
      );
    } catch {}

    onComplete(topic.id, earnedStars, finalScore);
  };

  const handleRestart = () => {
    sounds.playClick();
    setCurrentIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswerChecked(false);
    setCorrectCount(0);
    setIsGameOver(false);
  };

  // Localized texts
  const t = {
    back: language === 'lv' ? 'Atpakaļ' : 'Назад',
    listen: language === 'lv' ? 'Klausīties' : 'Послушать',
    questionNum: language === 'lv' ? 'Jautājums' : 'Вопрос',
    of: language === 'lv' ? 'no' : 'из',
    score: language === 'lv' ? 'Rezultāts' : 'Результат',
    greatJob: language === 'lv' ? 'Lieliski!' : 'Отличная работа!',
    playAgain: language === 'lv' ? 'Spēlēt vēlreiz' : 'Попробовать снова',
    allTopics: language === 'lv' ? 'Uz sarakstu' : 'К списку тем',
  };

  if (!currentQ && !isGameOver) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 flex flex-col items-center">
      {/* Top Header Bar */}
      <div className="w-full flex items-center justify-between gap-3 mb-4">
        <button
          onClick={() => {
            sounds.playClick();
            onBack();
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 font-bold text-sm shadow-xs hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.back}</span>
        </button>

        {/* Topic Title pill */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border-2 border-slate-200 text-xs sm:text-sm font-black text-slate-700 shadow-2xs">
          <span>{topic.emoji}</span>
          <span className="truncate max-w-[180px] sm:max-w-[280px]">
            {topic.title[language] || topic.title.ru}
          </span>
        </div>

        {/* Question Counter */}
        <div className="text-xs sm:text-sm font-black text-slate-500 bg-white px-2.5 py-1 rounded-xl border border-slate-200">
          {currentIndex + 1} / {questions.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 rounded-full h-2.5 mb-6 overflow-hidden">
        <div
          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Game Content */}
      {!isGameOver ? (
        <div className="w-full flex flex-col items-center animate-fadeIn">
          {/* Illustration if present */}
          {currentQ.imageWord && (
            <div className="mb-5">
              <GrammarIllustration
                imageWord={currentQ.imageWord}
                isNegated={currentQ.isNegated}
                badgeType={currentQ.badgeType}
                language={language}
                className="w-48 sm:w-56"
              />
            </div>
          )}

          {/* Question Prompt Card */}
          <div className="w-full bg-white rounded-3xl p-4 sm:p-5 border-3 border-indigo-100 shadow-md flex items-center justify-between gap-3 mb-6">
            <div className="flex flex-col">
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-400">
                {t.questionNum} {currentIndex + 1}
              </span>
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 font-comic tracking-tight mt-0.5">
                {currentQ.prompt}
              </h2>
              {currentQ.hint && (
                <p className="text-xs text-slate-400 font-semibold mt-1">
                  {currentQ.hint[language] || currentQ.hint.ru}
                </p>
              )}
            </div>

            {/* Manual Speaker Button (No Autoplay) */}
            <button
              onClick={handleSpeakPrompt}
              className="w-12 h-12 rounded-2xl bg-indigo-50 hover:bg-indigo-100 active:scale-95 border-2 border-indigo-200 text-indigo-600 flex items-center justify-center shrink-0 transition-transform cursor-pointer shadow-xs"
              title={t.listen}
            >
              <Volume2 className="w-6 h-6 stroke-[2.2]" />
            </button>
          </div>

          {/* Options List */}
          <div className="w-full flex flex-col gap-3">
            {currentQ.options.map((opt, idx) => {
              const letter = String.fromCharCode(65 + idx); // A, B, C
              const isSelected = selectedOptionIndex === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let btnStyle =
                'bg-white border-3 border-slate-200 text-slate-800 hover:border-indigo-300 hover:bg-indigo-50/30';

              if (isAnswerChecked) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-500 border-3 border-emerald-600 text-white shadow-md animate-pop';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-500 border-3 border-rose-600 text-white shadow-md animate-shake';
                } else {
                  btnStyle = 'bg-slate-50 border-3 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerChecked}
                  className={`w-full p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl flex items-center justify-between gap-3 text-left font-black text-base sm:text-lg font-comic transition-all cursor-pointer shadow-xs active:scale-[0.98] select-none ${btnStyle}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black shrink-0 ${
                        isAnswerChecked && isCorrect
                          ? 'bg-white/25 text-white'
                          : isAnswerChecked && isSelected
                          ? 'bg-white/25 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {letter}
                    </span>
                    <span className="truncate">{opt}</span>
                  </div>

                  {/* Manual Option Speaker Button */}
                  <div
                    onClick={(e) => handleSpeakOption(e, opt)}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform hover:scale-110 active:scale-95 cursor-pointer ${
                      isAnswerChecked && (isCorrect || isSelected)
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 hover:bg-indigo-100 text-indigo-600'
                    }`}
                    title={t.listen}
                  >
                    <Volume2 className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* Results Screen */
        <div className="w-full bg-white rounded-3xl p-6 sm:p-8 border-3 border-emerald-100 shadow-xl flex flex-col items-center text-center animate-pop">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 text-4xl shadow-inner">
            🎉
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-comic">
            {t.greatJob}
          </h2>
          <p className="text-slate-500 font-semibold text-sm mt-1">
            {topic.title[language] || topic.title.ru}
          </p>

          {/* Stars */}
          <div className="flex items-center gap-2 my-5 text-4xl">
            {Array.from({ length: 3 }).map((_, i) => {
              const ratio = correctCount / questions.length;
              const hasStar =
                (i === 0 && ratio >= 0.5) ||
                (i === 1 && ratio >= 0.7) ||
                (i === 2 && ratio >= 0.9);
              return (
                <span
                  key={i}
                  className={`transition-all transform ${hasStar ? 'text-amber-400 scale-110 animate-bounce' : 'text-slate-200 scale-95'}`}
                >
                  ★
                </span>
              );
            })}
          </div>

          <div className="bg-slate-50 px-6 py-3 rounded-2xl border-2 border-slate-200 mb-6">
            <span className="text-sm font-bold text-slate-500">{t.score}: </span>
            <span className="text-xl font-black text-slate-800">
              {correctCount} / {questions.length}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-md transition-all cursor-pointer active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.playAgain}</span>
            </button>
            <button
              onClick={onBack}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-sm transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.allTopics}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
