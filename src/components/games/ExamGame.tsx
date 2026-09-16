import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Topic, Word, Grade, Language, LearningCourse, ExamResult, ExamQuestionType } from '../../types';
import { translations } from '../../utils/i18n';
import { sounds } from '../../utils/soundEffects';
import { speakEnglish, speakLatvian, stopSpeech } from '../../utils/speech';
import { ArrowLeft, Volume2, CheckCircle2, XCircle, RotateCcw, Home, Sparkles } from 'lucide-react';

interface ExamGameProps {
  grade: Grade;
  topics: Topic[];
  language: Language;
  course: LearningCourse;
  onComplete: (result: ExamResult) => void;
  onBack: () => void;
}

interface ExamQuestion {
  id: string;
  topicId: string;
  type: ExamQuestionType;
  word: Word;
  // For 'audio' and 'choice' questions:
  options?: {
    text: string;
    image?: string;
    isCorrect: boolean;
  }[];
  // For 'truefalse' questions:
  displayWord?: string;
  displayTranslation?: string;
  isTrue?: boolean;
}

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generateExamQuestions(
  topics: Topic[],
  grade: Grade,
  language: Language,
  course: LearningCourse
): ExamQuestion[] {
  const isLatvian = course === 'lv';
  const getLearnWord = (w: Word) => (isLatvian ? w.lv : w.en);
  const getTransWord = (w: Word) => (isLatvian ? w.ru : (w[language] || w.ru));

  // Collect all available words of this grade for distractor pools
  const allGradeWords: Word[] = [];
  topics.forEach((t) => {
    t.words.forEach((w) => {
      if ((w.grade || 1) === grade) {
        allGradeWords.push(w);
      }
    });
  });

  const questionTypes: ExamQuestionType[] = ['audio', 'choice', 'truefalse'];
  const questions: ExamQuestion[] = [];

  // Pick 1 random word from each topic for this grade
  topics.forEach((topic, index) => {
    const topicGradeWords = topic.words.filter((w) => (w.grade || 1) === grade);
    const pool = topicGradeWords.length > 0 ? topicGradeWords : topic.words;
    if (pool.length === 0) return;

    const chosenWord = pool[Math.floor(Math.random() * pool.length)];
    const qType = questionTypes[index % questionTypes.length];

    if (qType === 'truefalse') {
      const isTrue = Math.random() < 0.5;
      let displayTrans = getTransWord(chosenWord);

      if (!isTrue) {
        // Find a different word's translation
        const otherWords = allGradeWords.filter(
          (w) => getTransWord(w).toLowerCase() !== displayTrans.toLowerCase()
        );
        if (otherWords.length > 0) {
          displayTrans = getTransWord(otherWords[Math.floor(Math.random() * otherWords.length)]);
        }
      }

      questions.push({
        id: `q-${topic.topic_id}-${chosenWord.id}-${index}`,
        topicId: topic.topic_id,
        type: 'truefalse',
        word: chosenWord,
        displayWord: getLearnWord(chosenWord),
        displayTranslation: displayTrans,
        isTrue,
      });
    } else {
      // 'audio' or 'choice'
      const correctText = getTransWord(chosenWord);
      const otherWords = allGradeWords.filter(
        (w) => getTransWord(w).toLowerCase() !== correctText.toLowerCase()
      );
      const shuffledOthers = shuffle(otherWords);
      const distractors = shuffledOthers.slice(0, 3).map((w) => ({
        text: getTransWord(w),
        image: w.image,
        isCorrect: false,
      }));

      const options = shuffle([
        { text: correctText, image: chosenWord.image, isCorrect: true },
        ...distractors,
      ]);

      questions.push({
        id: `q-${topic.topic_id}-${chosenWord.id}-${index}`,
        topicId: topic.topic_id,
        type: qType,
        word: chosenWord,
        options,
      });
    }
  });

  return questions;
}

export const ExamGame: React.FC<ExamGameProps> = ({
  grade,
  topics,
  language,
  course,
  onComplete,
  onBack,
}) => {
  const t = translations[language];
  const isLatvian = course === 'lv';

  const [questions, setQuestions] = useState<ExamQuestion[]>(() =>
    generateExamQuestions(topics, grade, language, course)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | boolean | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [finalResult, setFinalResult] = useState<ExamResult | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const playQuestionAudio = (word: Word) => {
    stopSpeech();
    if (isLatvian) {
      speakLatvian(word.lv);
    } else {
      speakEnglish(word.en);
    }
  };

  // Auto-play speech on audio questions or when question changes
  useEffect(() => {
    if (!currentQuestion || isFinished) return;

    if (currentQuestion.type === 'audio') {
      const timeout = setTimeout(() => {
        playQuestionAudio(currentQuestion.word);
      }, 350);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, currentQuestion, isFinished]);

  // Clean up speech and timers on unmount
  useEffect(() => {
    return () => {
      stopSpeech();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSelectChoice = (option: { text: string; isCorrect: boolean }) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedAnswer(option.text);

    if (option.isCorrect) {
      sounds.playCorrect();
      setCorrectCount((prev) => prev + 1);
    } else {
      sounds.playWrong();
    }

    timerRef.current = setTimeout(() => {
      advanceQuestion(option.isCorrect);
    }, 1300);
  };

  const handleSelectTrueFalse = (userChoice: boolean) => {
    if (isAnswered || !currentQuestion) return;
    setIsAnswered(true);
    setSelectedAnswer(userChoice);

    const isCorrect = userChoice === currentQuestion.isTrue;
    if (isCorrect) {
      sounds.playCorrect();
      setCorrectCount((prev) => prev + 1);
    } else {
      sounds.playWrong();
    }

    timerRef.current = setTimeout(() => {
      advanceQuestion(isCorrect);
    }, 1300);
  };

  const advanceQuestion = (lastWasCorrect: boolean) => {
    setIsAnswered(false);
    setSelectedAnswer(null);

    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Exam finished!
      finishExam(lastWasCorrect ? correctCount + 1 : correctCount);
    }
  };

  const finishExam = (finalCorrect: number) => {
    const percent = Math.round((finalCorrect / totalQuestions) * 100);

    let mark: ExamResult['gradeMark'] = null;
    let cup: ExamResult['cup'] = null;
    let starsEarned = 2; // consolation

    if (percent === 100) {
      mark = '5+';
      cup = 'gold';
      starsEarned = 10;
    } else if (percent >= 80) {
      mark = '4';
      cup = 'silver';
      starsEarned = 7;
    } else if (percent >= 60) {
      mark = '3';
      cup = 'bronze';
      starsEarned = 5;
    }

    const result: ExamResult = {
      grade,
      course,
      scorePercent: percent,
      gradeMark: mark,
      cup,
      correctCount: finalCorrect,
      totalCount: totalQuestions,
      starsEarned,
      completedAt: new Date().toISOString(),
    };

    setFinalResult(result);
    setIsFinished(true);

    if (percent >= 60) {
      sounds.playFanfare();
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      sounds.playClick();
    }

    onComplete(result);
  };

  const handleRestart = () => {
    sounds.playClick();
    const newQuestions = generateExamQuestions(topics, grade, language, course);
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setCorrectCount(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsFinished(false);
    setFinalResult(null);
  };

  const gradeName = language === 'ru' ? `${grade} класс` : `${grade}. klase`;

  // Render Final Result Screen
  if (isFinished && finalResult) {
    const isPassed = finalResult.scorePercent >= 60;
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="relative overflow-hidden rounded-3xl bg-white border-4 border-amber-300 shadow-2xl p-6 sm:p-10 text-center">
          {/* Header Trophy Banner */}
          <div className="relative mb-6">
            <div className="w-28 h-28 sm:w-36 sm:h-36 mx-auto rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-200 border-4 border-white shadow-xl flex items-center justify-center text-6xl sm:text-7xl animate-bounce">
              <span>{finalResult.cup === 'gold' ? '🏆' : finalResult.cup === 'silver' ? '🥈' : finalResult.cup === 'bronze' ? '🥉' : '🎓'}</span>
            </div>
            {finalResult.gradeMark && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-500 text-white font-black text-lg sm:text-xl px-4 py-1 rounded-full shadow-md border-2 border-white">
                {finalResult.gradeMark}
              </div>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mb-2">
            {isPassed ? t.exam.passedHeadline : t.exam.needPracticeHeadline}
          </h2>
          <p className="text-sm sm:text-base font-bold text-amber-800/80 mb-6">
            {t.exam.cardTitle}: {gradeName}
          </p>

          {/* Stats Box */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 max-w-md mx-auto">
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-3 sm:p-4 text-center">
              <div className="text-xs font-bold text-amber-800/70 uppercase">
                {language === 'ru' ? 'Правильно' : 'Pareizi'}
              </div>
              <div className="text-xl sm:text-2xl font-black text-amber-950">
                {finalResult.correctCount} / {finalResult.totalCount}
              </div>
            </div>
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-3 sm:p-4 text-center">
              <div className="text-xs font-bold text-amber-800/70 uppercase">
                {language === 'ru' ? 'Результат' : 'Rezultāts'}
              </div>
              <div className="text-xl sm:text-2xl font-black text-amber-950">
                {finalResult.scorePercent}%
              </div>
            </div>
          </div>

          {/* Star Reward Box */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-950 font-black text-base sm:text-lg px-6 py-2.5 rounded-2xl shadow-md border-2 border-white mb-8">
            <Sparkles className="w-5 h-5 text-amber-900 animate-spin" />
            <span>+{finalResult.starsEarned} ⭐ {t.exam.starsAddedToBank}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-black text-slate-700 bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 active:scale-95 transition-all cursor-pointer text-base"
            >
              <RotateCcw className="w-5 h-5" />
              <span>{t.exam.againBtn}</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onBack();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl font-black text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer text-base"
            >
              <Home className="w-5 h-5" />
              <span>{t.exam.backToCatalog}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  const targetLearnWord = isLatvian ? currentQuestion.word.lv : currentQuestion.word.en;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <button
          onClick={() => {
            sounds.playClick();
            stopSpeech();
            onBack();
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-2xl border-2 border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors shadow-xs cursor-pointer text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToTopics}</span>
        </button>

        <div className="flex items-center gap-2 bg-amber-100/80 border border-amber-300 px-3.5 py-1.5 rounded-2xl">
          <span className="text-lg">🎓</span>
          <span className="font-black text-amber-950 text-xs sm:text-sm">
            {t.exam.cardTitle}: {gradeName}
          </span>
        </div>
      </div>

      {/* Progress Bar & Question Counter */}
      <div className="mb-6 bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-xs">
        <div className="flex items-center justify-between text-xs sm:text-sm font-extrabold text-slate-600 mb-2">
          <span>
            {t.exam.questionCounter} {currentIndex + 1} / {totalQuestions}
          </span>
          <span className="text-amber-600 font-black">
            {progressPercent}%
          </span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl border-4 border-amber-200 shadow-xl p-6 sm:p-8 text-center relative overflow-hidden">
        {/* Question Type Banner */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider mb-4 border border-amber-300">
          {currentQuestion.type === 'audio' && (
            <>
              <span>🎧</span>
              <span>{t.exam.promptAudio}</span>
            </>
          )}
          {currentQuestion.type === 'choice' && (
            <>
              <span>🖼️</span>
              <span>{t.exam.promptChoice}</span>
            </>
          )}
          {currentQuestion.type === 'truefalse' && (
            <>
              <span>🚦</span>
              <span>{t.exam.promptTrueFalse}</span>
            </>
          )}
        </div>

        {/* Word Display Section */}
        {currentQuestion.type === 'audio' && (
          <div className="my-6">
            <button
              onClick={() => playQuestionAudio(currentQuestion.word)}
              className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-3xl bg-gradient-to-tr from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 active:scale-95 border-4 border-white shadow-xl flex items-center justify-center text-white cursor-pointer transition-transform group"
              title={t.listen}
            >
              <Volume2 className="w-12 h-12 sm:w-14 sm:h-14 group-hover:scale-110 transition-transform animate-pulse" />
            </button>
            <p className="mt-3 text-xs sm:text-sm font-bold text-slate-500">
              {t.listen}
            </p>
          </div>
        )}

        {currentQuestion.type === 'choice' && (
          <div className="my-6">
            <div className="text-5xl sm:text-6xl mb-3">
              {currentQuestion.word.image || '📖'}
            </div>
            <div className="flex items-center justify-center gap-2">
              <h3 className="text-3xl sm:text-4xl font-black text-slate-800 font-comic tracking-tight">
                {targetLearnWord}
              </h3>
              <button
                onClick={() => playQuestionAudio(currentQuestion.word)}
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors cursor-pointer"
                title={t.listen}
              >
                <Volume2 className="w-6 h-6" />
              </button>
            </div>
            {currentQuestion.word.transcription && !isLatvian && (
              <p className="text-sm text-slate-400 font-medium mt-1">
                {currentQuestion.word.transcription}
              </p>
            )}
          </div>
        )}

        {currentQuestion.type === 'truefalse' && (
          <div className="my-6">
            <div className="text-5xl sm:text-6xl mb-3">
              {currentQuestion.word.image || '📖'}
            </div>
            <div className="inline-flex items-center gap-2 bg-slate-50 border-2 border-slate-200 px-4 py-2 rounded-2xl mb-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-800 font-comic">
                {currentQuestion.displayWord}
              </span>
              <button
                onClick={() => playQuestionAudio(currentQuestion.word)}
                className="p-1 text-indigo-600 hover:bg-indigo-50 rounded-lg cursor-pointer"
                title={t.listen}
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-indigo-600 font-comic">
              = {currentQuestion.displayTranslation}
            </div>
          </div>
        )}

        {/* Answer Options for 'audio' and 'choice' */}
        {currentQuestion.options && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswer === option.text;
              let btnStyle = 'bg-white border-slate-200 hover:border-amber-400 text-slate-800 hover:bg-amber-50/50';

              if (isAnswered) {
                if (option.isCorrect) {
                  btnStyle = 'bg-emerald-500 border-emerald-600 text-white shadow-lg scale-102';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-500 border-rose-600 text-white shadow-md animate-shake';
                } else {
                  btnStyle = 'bg-slate-100 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={`${option.text}-${idx}`}
                  disabled={isAnswered}
                  onClick={() => handleSelectChoice(option)}
                  className={`relative p-4 sm:p-5 rounded-2xl border-3 font-black text-base sm:text-lg shadow-sm transition-all cursor-pointer flex items-center justify-center gap-3 ${btnStyle}`}
                >
                  {option.image && <span className="text-2xl">{option.image}</span>}
                  <span>{option.text}</span>
                  {isAnswered && option.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-white absolute right-4" />
                  )}
                  {isAnswered && isSelected && !option.isCorrect && (
                    <XCircle className="w-5 h-5 text-white absolute right-4" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Answer Buttons for 'truefalse' */}
        {currentQuestion.type === 'truefalse' && (
          <div className="grid grid-cols-2 gap-4 mt-6 max-w-md mx-auto">
            {/* True button */}
            <button
              disabled={isAnswered}
              onClick={() => handleSelectTrueFalse(true)}
              className={`p-4 sm:p-5 rounded-2xl border-3 font-black text-lg sm:text-xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                isAnswered
                  ? currentQuestion.isTrue
                    ? 'bg-emerald-500 border-emerald-600 text-white shadow-lg scale-102'
                    : selectedAnswer === true
                    ? 'bg-rose-500 border-rose-600 text-white animate-shake'
                    : 'bg-slate-100 border-slate-200 text-slate-400 opacity-60'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100 hover:border-emerald-500'
              }`}
            >
              <CheckCircle2 className="w-6 h-6" />
              <span>{t.trueBtn}</span>
            </button>

            {/* False button */}
            <button
              disabled={isAnswered}
              onClick={() => handleSelectTrueFalse(false)}
              className={`p-4 sm:p-5 rounded-2xl border-3 font-black text-lg sm:text-xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                isAnswered
                  ? !currentQuestion.isTrue
                    ? 'bg-emerald-500 border-emerald-600 text-white shadow-lg scale-102'
                    : selectedAnswer === false
                    ? 'bg-rose-500 border-rose-600 text-white animate-shake'
                    : 'bg-slate-100 border-slate-200 text-slate-400 opacity-60'
                  : 'bg-rose-50 border-rose-300 text-rose-800 hover:bg-rose-100 hover:border-rose-500'
              }`}
            >
              <XCircle className="w-6 h-6" />
              <span>{t.falseBtn}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
