import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Topic, Word, Grade, Language, LearningCourse, ExamResult, ExamQuestionType, ExamQuestion } from '../../types';
import { translations } from '../../utils/i18n';
import { sounds } from '../../utils/soundEffects';
import { speakEnglish, speakLatvian, stopSpeech } from '../../utils/speech';
import { WordIllustration } from '../WordIllustration';
import { ArrowLeft, Volume2, CheckCircle2, XCircle, RotateCcw, Home, Sparkles } from 'lucide-react';
import { saveExamSession, loadExamSession, clearExamSession } from '../../services/examSession';

interface ExamGameProps {
  grade: Grade;
  topics: Topic[];
  language: Language;
  course: LearningCourse;
  onComplete: (result: ExamResult) => void;
  onBack: () => void;
}

interface LetterTile {
  id: string;
  char: string;
}

function getTargetToSpell(word: Word, course: LearningCourse): string {
  if (course === 'lv') {
    return (word.lv.split(',')[0] || word.lv).trim();
  }
  return word.en.trim();
}

function isSingleWord(word: Word, course: LearningCourse): boolean {
  const target = getTargetToSpell(word, course);
  const regex = /^[a-zA-ZāčēģīķļņšūžĀČĒĢĪĶĻŅŠŪŽ]+$/;
  return target.length >= 2 && regex.test(target);
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

  // Target: approximately 65% of all words in the main curriculum topics of this grade
  // Grade 1 (97 words) -> 63 words; Grade 2 (64 words) -> 42 words; Grade 3 (76 words) -> 49 words
  const targetCount = Math.min(
    Math.round(allGradeWords.length * 0.65),
    allGradeWords.length
  );

  // Prepare topic pools: copy and shuffle words per topic
  const topicPools = topics
    .map((topic) => {
      const words = topic.words.filter((w) => (w.grade || 1) === grade);
      return {
        topicId: topic.topic_id,
        topicEmoji: topic.emoji,
        words: shuffle(words.length > 0 ? words : topic.words),
      };
    })
    .filter((tp) => tp.words.length > 0);

  // Select 40 words round-robin across topics
  const selectedItems: { word: Word; topicId: string; topicEmoji?: string }[] = [];
  const usedWordIds = new Set<string>();

  while (selectedItems.length < targetCount) {
    let addedInThisRound = 0;
    for (const pool of topicPools) {
      if (selectedItems.length >= targetCount) break;
      const nextWord = pool.words.find((w) => !usedWordIds.has(w.id));
      if (nextWord) {
        usedWordIds.add(nextWord.id);
        selectedItems.push({
          word: nextWord,
          topicId: pool.topicId,
          topicEmoji: pool.topicEmoji,
        });
        addedInThisRound++;
      }
    }
    if (addedInThisRound === 0) break;
  }

  // Shuffle selected items so questions from different topics are nicely distributed
  const shuffledItems = shuffle(selectedItems);

  const questionTypes: ExamQuestionType[] = ['audio', 'choice', 'truefalse', 'builder'];
  const questions: ExamQuestion[] = [];

  shuffledItems.forEach((item, index) => {
    const chosenWord = item.word;
    let qType = questionTypes[index % questionTypes.length];

    // Single-word restriction for 'builder'
    if (qType === 'builder' && !isSingleWord(chosenWord, course)) {
      qType = index % 2 === 0 ? 'choice' : 'audio';
    }

    if (qType === 'builder') {
      questions.push({
        id: `q-${item.topicId}-${chosenWord.id}-${index}`,
        topicId: item.topicId,
        topicEmoji: item.topicEmoji,
        type: 'builder',
        word: chosenWord,
        displayTranslation: getTransWord(chosenWord),
      });
    } else if (qType === 'truefalse') {
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
        id: `q-${item.topicId}-${chosenWord.id}-${index}`,
        topicId: item.topicId,
        topicEmoji: item.topicEmoji,
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
        word: w,
        isCorrect: false,
      }));

      const options = shuffle([
        {
          text: correctText,
          word: chosenWord,
          isCorrect: true,
        },
        ...distractors,
      ]);

      questions.push({
        id: `q-${item.topicId}-${chosenWord.id}-${index}`,
        topicId: item.topicId,
        topicEmoji: item.topicEmoji,
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

  const [sessionData] = useState(() => loadExamSession(grade, course));

  const [questions, setQuestions] = useState<ExamQuestion[]>(() =>
    sessionData?.questions || generateExamQuestions(topics, grade, language, course)
  );
  const [currentIndex, setCurrentIndex] = useState<number>(sessionData?.currentIndex || 0);
  const [correctCount, setCorrectCount] = useState<number>(sessionData?.correctCount || 0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | boolean | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [finalResult, setFinalResult] = useState<ExamResult | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Automatically save exam progress to persistent storage so tab unload or refresh never loses progress
  useEffect(() => {
    if (!isFinished && questions.length > 0) {
      saveExamSession(grade, course, {
        questions,
        currentIndex,
        correctCount,
        grade,
        course,
      });
    }
  }, [questions, currentIndex, correctCount, isFinished, grade, course]);

  // States for 'builder' question type
  const [availableTiles, setAvailableTiles] = useState<LetterTile[]>([]);
  const [selectedTiles, setSelectedTiles] = useState<LetterTile[]>([]);
  const [builderStatus, setBuilderStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');

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

  // Auto-play speech on audio questions or prepare letters for builder questions
  useEffect(() => {
    if (!currentQuestion || isFinished) return;

    if (currentQuestion.type === 'audio') {
      const timeout = setTimeout(() => {
        playQuestionAudio(currentQuestion.word);
      }, 350);
      return () => clearTimeout(timeout);
    } else if (currentQuestion.type === 'builder') {
      const targetWord = getTargetToSpell(currentQuestion.word, course);
      const chars = targetWord.toLowerCase().split('');
      const tiles: LetterTile[] = chars.map((char, index) => ({
        id: `${char}-${index}-${Math.random()}`,
        char,
      }));
      let shuffled = shuffle(tiles);
      if (tiles.length > 1 && shuffled.map((t) => t.char).join('') === targetWord.toLowerCase()) {
        shuffled = [...tiles].reverse();
      }
      setAvailableTiles(shuffled);
      setSelectedTiles([]);
      setBuilderStatus('idle');
    }
  }, [currentIndex, currentQuestion, isFinished, course]);

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

  const handleSelectTile = (tile: LetterTile) => {
    if (isAnswered || !currentQuestion || currentQuestion.type !== 'builder') return;
    sounds.playClick();

    const nextAvailable = availableTiles.filter((t) => t.id !== tile.id);
    const nextSelected = [...selectedTiles, tile];
    setAvailableTiles(nextAvailable);
    setSelectedTiles(nextSelected);

    const targetWord = getTargetToSpell(currentQuestion.word, course).toLowerCase();
    if (nextSelected.length === targetWord.length) {
      setIsAnswered(true);
      const spelled = nextSelected.map((t) => t.char).join('').toLowerCase();
      const isCorrect = spelled === targetWord;

      if (isCorrect) {
        setBuilderStatus('correct');
        sounds.playCorrect();
        playQuestionAudio(currentQuestion.word);
        setCorrectCount((prev) => prev + 1);
      } else {
        setBuilderStatus('wrong');
        sounds.playWrong();
      }

      timerRef.current = setTimeout(() => {
        advanceQuestion(isCorrect);
      }, isCorrect ? 1300 : 1800);
    }
  };

  const handleRemoveTile = (tile: LetterTile) => {
    if (isAnswered) return;
    sounds.playClick();
    setSelectedTiles((prev) => prev.filter((t) => t.id !== tile.id));
    setAvailableTiles((prev) => [...prev, tile]);
  };

  const handleResetBuilder = () => {
    if (isAnswered || !currentQuestion || currentQuestion.type !== 'builder') return;
    sounds.playClick();
    const targetWord = getTargetToSpell(currentQuestion.word, course);
    const chars = targetWord.toLowerCase().split('');
    const tiles: LetterTile[] = chars.map((char, index) => ({
      id: `${char}-${index}-${Math.random()}`,
      char,
    }));
    let shuffled = shuffle(tiles);
    if (tiles.length > 1 && shuffled.map((t) => t.char).join('') === targetWord.toLowerCase()) {
      shuffled = [...tiles].reverse();
    }
    setAvailableTiles(shuffled);
    setSelectedTiles([]);
  };

  const advanceQuestion = (lastWasCorrect: boolean) => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    setSelectedTiles([]);
    setAvailableTiles([]);
    setBuilderStatus('idle');

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
    let starsEarned = grade === 1 ? 5 : 4; // consolation

    if (grade === 1) {
      if (percent === 100) {
        mark = '5+';
        cup = 'gold';
        starsEarned = 25;
      } else if (percent >= 80) {
        mark = '4';
        cup = 'silver';
        starsEarned = 18;
      } else if (percent >= 60) {
        mark = '3';
        cup = 'bronze';
        starsEarned = 12;
      }
    } else {
      if (percent === 100) {
        mark = '5+';
        cup = 'gold';
        starsEarned = 20;
      } else if (percent >= 80) {
        mark = '4';
        cup = 'silver';
        starsEarned = 15;
      } else if (percent >= 60) {
        mark = '3';
        cup = 'bronze';
        starsEarned = 10;
      }
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

    clearExamSession(grade, course);

    onComplete(result);
  };

  const handleRestart = () => {
    sounds.playClick();
    clearExamSession(grade, course);
    const newQuestions = generateExamQuestions(topics, grade, language, course);
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setCorrectCount(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsFinished(false);
    setFinalResult(null);
    setSelectedTiles([]);
    setAvailableTiles([]);
    setBuilderStatus('idle');
  };

  const handleBackWithConfirm = () => {
    sounds.playClick();
    if (!isFinished && currentIndex > 0) {
      const confirmText =
        language === 'ru'
          ? 'Выйти из контрольной? Прогресс будет сохранен, вы сможете продолжить позже.'
          : 'Iziet no pārbaudes darba? Progress tiks saglabāts, varēsiet turpināt vēlāk.';
      if (!window.confirm(confirmText)) {
        return;
      }
    }
    stopSpeech();
    onBack();
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
          onClick={handleBackWithConfirm}
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
              <span>📝</span>
              <span>{t.exam.promptChoice}</span>
            </>
          )}
          {currentQuestion.type === 'truefalse' && (
            <>
              <span>🚦</span>
              <span>{t.exam.promptTrueFalse}</span>
            </>
          )}
          {currentQuestion.type === 'builder' && (
            <>
              <span>🔤</span>
              <span>{t.exam.promptBuilder}</span>
            </>
          )}
        </div>

        {/* Word Display Section */}
        {currentQuestion.type === 'builder' && (
          <div className="my-4">
            {/* Word Picture Illustration */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-3xl bg-amber-50 border-3 border-amber-200 flex items-center justify-center p-2 shadow-inner mb-3 select-none">
              <WordIllustration
                word={currentQuestion.word}
                fallbackEmoji={currentQuestion.topicEmoji || '📖'}
              />
            </div>

            {/* Translation text */}
            <div className="flex items-center justify-center mb-4">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-800 font-comic text-center">
                {currentQuestion.displayTranslation}
              </h3>
            </div>

            {/* Selected Letters Slot */}
            <div
              className={`min-h-[72px] sm:min-h-[80px] bg-slate-100 rounded-3xl border-4 p-3 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-lg mx-auto transition-all ${
                builderStatus === 'wrong'
                  ? 'border-rose-400 bg-rose-50 animate-shake'
                  : builderStatus === 'correct'
                  ? 'border-emerald-400 bg-emerald-50'
                  : 'border-slate-300'
              }`}
            >
              {selectedTiles.map((tile) => (
                <button
                  key={tile.id}
                  onClick={() => handleRemoveTile(tile)}
                  disabled={isAnswered}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border-3 border-indigo-400 text-indigo-700 font-black font-comic shadow-md flex items-center justify-center hover:scale-105 active:scale-95 transition-transform text-2xl sm:text-3xl cursor-pointer disabled:cursor-default"
                >
                  {tile.char.toUpperCase()}
                </button>
              ))}

              {/* Empty placeholder dots */}
              {Array.from({
                length: Math.max(
                  0,
                  getTargetToSpell(currentQuestion.word, course).length - selectedTiles.length
                ),
              }).map((_, i) => (
                <div
                  key={i}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/60 flex items-center justify-center text-slate-400 text-2xl font-bold font-comic"
                >
                  •
                </div>
              ))}
            </div>

            {/* Wrong reveal */}
            {builderStatus === 'wrong' && (
              <div className="mt-3 text-emerald-700 font-black text-xl sm:text-2xl font-comic animate-fadeIn">
                ✓ {getTargetToSpell(currentQuestion.word, course).toUpperCase()}
              </div>
            )}

            {/* Available Letters Tray */}
            <div className="mt-5 bg-amber-50/80 border-3 border-amber-200 rounded-3xl p-3.5 sm:p-5 shadow-inner flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 max-w-lg mx-auto">
              {availableTiles.map((tile) => (
                <button
                  key={tile.id}
                  onClick={() => handleSelectTile(tile)}
                  disabled={isAnswered}
                  className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 border-b-4 border-amber-600 text-amber-950 font-black font-comic shadow-md flex items-center justify-center transition-all text-2xl sm:text-3xl cursor-pointer select-none disabled:opacity-50 disabled:cursor-default"
                >
                  {tile.char.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Clear / Reset button */}
            {selectedTiles.length > 0 && !isAnswered && (
              <div className="mt-3">
                <button
                  onClick={handleResetBuilder}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.clearLetters}</span>
                </button>
              </div>
            )}
          </div>
        )}
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
          <div className="my-8">
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
            <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-3xl bg-amber-50 border-3 border-amber-200 flex items-center justify-center p-2 shadow-inner mb-4 select-none">
              <WordIllustration
                word={currentQuestion.word}
                fallbackEmoji={currentQuestion.topicEmoji || '📖'}
              />
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

        {/* Answer Options for 'audio' and 'choice' in 2x2 grid */}
        {currentQuestion.options && (
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4 mt-4 sm:mt-6">
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
                  className={`relative p-2.5 sm:p-5 rounded-2xl border-3 font-black text-base sm:text-2xl font-comic shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 sm:gap-3 min-h-[3.75rem] sm:min-h-[5rem] ${btnStyle}`}
                >
                  {option.word && (
                    <div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0 select-none">
                      <WordIllustration
                        word={option.word}
                        fallbackEmoji={currentQuestion.topicEmoji || '📖'}
                        className="w-7 h-7 sm:w-11 sm:h-11 text-2xl sm:text-4xl"
                      />
                    </div>
                  )}
                  <span className="leading-snug">{option.text}</span>
                  {isAnswered && option.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white absolute right-2 sm:right-4" />
                  )}
                  {isAnswered && isSelected && !option.isCorrect && (
                    <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white absolute right-2 sm:right-4" />
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
              className={`p-4 sm:p-5 rounded-2xl border-3 font-black text-xl sm:text-2xl font-comic shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2.5 min-h-[4.25rem] sm:min-h-[4.75rem] ${
                isAnswered
                  ? currentQuestion.isTrue
                    ? 'bg-emerald-500 border-emerald-600 text-white shadow-lg scale-102'
                    : selectedAnswer === true
                    ? 'bg-rose-500 border-rose-600 text-white animate-shake'
                    : 'bg-slate-100 border-slate-200 text-slate-400 opacity-60'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100 hover:border-emerald-500'
              }`}
            >
              <CheckCircle2 className="w-7 h-7" />
              <span>{t.trueBtn}</span>
            </button>

            {/* False button */}
            <button
              disabled={isAnswered}
              onClick={() => handleSelectTrueFalse(false)}
              className={`p-4 sm:p-5 rounded-2xl border-3 font-black text-xl sm:text-2xl font-comic shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2.5 min-h-[4.25rem] sm:min-h-[4.75rem] ${
                isAnswered
                  ? !currentQuestion.isTrue
                    ? 'bg-emerald-500 border-emerald-600 text-white shadow-lg scale-102'
                    : selectedAnswer === false
                    ? 'bg-rose-500 border-rose-600 text-white animate-shake'
                    : 'bg-slate-100 border-slate-200 text-slate-400 opacity-60'
                  : 'bg-rose-50 border-rose-300 text-rose-800 hover:bg-rose-100 hover:border-rose-500'
              }`}
            >
              <XCircle className="w-7 h-7" />
              <span>{t.falseBtn}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
