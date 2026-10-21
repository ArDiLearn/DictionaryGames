import React, { useState, useEffect, useRef } from 'react';
import { Topic, Word, Language, LearningCourse, VocabExamQuestion } from '../../types';
import {
  translations,
  isLatvianTargetCourse,
  getTargetWordText,
  getTranslationWordText,
} from '../../utils/i18n';
import { sounds } from '../../utils/soundEffects';
import { speakWord, stopSpeech } from '../../utils/speech';
import { WordIllustration } from '../WordIllustration';
import { ArrowLeft, Volume2, CheckCircle2, XCircle, RotateCcw, SkipForward } from 'lucide-react';

interface TopicTestGameProps {
  topic: Topic;
  allTopics: Topic[];
  language: Language;
  course?: LearningCourse;
  onRecordResult: (wordId: string, isCorrect: boolean) => void;
  onComplete: (correctCount: number, totalCount: number) => void;
  onBack: () => void;
}

interface LetterTile {
  id: string;
  char: string;
}

function getTargetToSpell(word: Word, course: LearningCourse): string {
  if (isLatvianTargetCourse(course)) {
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

function generateTestQuestions(
  topic: Topic,
  allTopics: Topic[],
  language: Language,
  course: LearningCourse
): VocabExamQuestion[] {
  const getLearnWord = (w: Word) => getTargetWordText(w, course);
  const getTransWord = (w: Word) => getTranslationWordText(w, course, language);

  const distractorPool: Word[] = [
    ...(topic.words || []),
    ...allTopics.flatMap((t) => t.words),
  ];

  const shuffledWords = shuffle(topic.words || []);
  const questionTypes: ('choice' | 'audio' | 'truefalse' | 'builder')[] = ['choice', 'audio', 'truefalse', 'builder'];
  const questions: VocabExamQuestion[] = [];

  shuffledWords.forEach((chosenWord, index) => {
    let qType = questionTypes[index % questionTypes.length];

    if (qType === 'builder' && !isSingleWord(chosenWord, course)) {
      qType = index % 2 === 0 ? 'choice' : 'audio';
    }

    if (qType === 'builder') {
      questions.push({
        id: `test-q-${chosenWord.id}-${index}`,
        topicId: topic.topic_id,
        topicEmoji: topic.emoji,
        type: 'builder',
        word: chosenWord,
        displayTranslation: getTransWord(chosenWord),
      });
    } else if (qType === 'truefalse') {
      const isTrue = Math.random() < 0.5;
      let displayTrans = getTransWord(chosenWord);

      if (!isTrue) {
        const otherWords = distractorPool.filter(
          (w) => w.id !== chosenWord.id && getTransWord(w).toLowerCase() !== displayTrans.toLowerCase()
        );
        if (otherWords.length > 0) {
          displayTrans = getTransWord(otherWords[Math.floor(Math.random() * otherWords.length)]);
        }
      }

      questions.push({
        id: `test-q-${chosenWord.id}-${index}`,
        topicId: topic.topic_id,
        topicEmoji: topic.emoji,
        type: 'truefalse',
        word: chosenWord,
        displayWord: getLearnWord(chosenWord),
        displayTranslation: displayTrans,
        isTrue,
      });
    } else {
      const correctText = getTransWord(chosenWord);
      const uniqueOthers: Word[] = [];
      const seenTrans = new Set<string>([correctText.toLowerCase()]);

      for (const w of shuffle(distractorPool)) {
        const tr = getTransWord(w).toLowerCase();
        if (w.id !== chosenWord.id && !seenTrans.has(tr)) {
          seenTrans.add(tr);
          uniqueOthers.push(w);
        }
        if (uniqueOthers.length >= 3) break;
      }

      const distractors = uniqueOthers.map((w) => ({
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
        id: `test-q-${chosenWord.id}-${index}`,
        topicId: topic.topic_id,
        topicEmoji: topic.emoji,
        type: qType,
        word: chosenWord,
        options,
      });
    }
  });

  return questions;
}

export const TopicTestGame: React.FC<TopicTestGameProps> = ({
  topic,
  allTopics,
  language,
  course = 'en',
  onRecordResult,
  onComplete,
  onBack,
}) => {
  const t = translations[language];
  const isLatvian = isLatvianTargetCourse(course);

  const [questions] = useState<VocabExamQuestion[]>(() =>
    generateTestQuestions(topic, allTopics, language, course)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | boolean | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [availableTiles, setAvailableTiles] = useState<LetterTile[]>([]);
  const [selectedTiles, setSelectedTiles] = useState<LetterTile[]>([]);
  const [builderStatus, setBuilderStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const playQuestionAudio = (word: Word) => {
    stopSpeech();
    const textToSpeak = isLatvian ? word.lv : word.en;
    speakWord(textToSpeak, course);
  };

  useEffect(() => {
    if (!currentQuestion) return;

    if (currentQuestion.type === 'audio') {
      const timeout = setTimeout(() => {
        playQuestionAudio(currentQuestion.word);
      }, 300);
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
  }, [currentIndex, currentQuestion, course]);

  useEffect(() => {
    return () => {
      stopSpeech();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const advanceQuestion = (nextScore: number) => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    setSelectedTiles([]);
    setAvailableTiles([]);
    setBuilderStatus('idle');

    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onComplete(nextScore, totalQuestions);
    }
  };

  const handleSelectChoice = (option: { text: string; isCorrect: boolean }) => {
    if (isAnswered || !currentQuestion) return;
    setIsAnswered(true);
    setSelectedAnswer(option.text);

    const isCorrect = option.isCorrect;
    const nextScore = isCorrect ? correctCount + 1 : correctCount;

    if (isCorrect) {
      sounds.playCorrect();
      setCorrectCount(nextScore);
    } else {
      sounds.playWrong();
    }

    onRecordResult(currentQuestion.word.id, isCorrect);

    timerRef.current = setTimeout(() => {
      advanceQuestion(nextScore);
    }, 1200);
  };

  const handleSelectTrueFalse = (userChoice: boolean) => {
    if (isAnswered || !currentQuestion) return;
    setIsAnswered(true);
    setSelectedAnswer(userChoice);

    const isCorrect = userChoice === currentQuestion.isTrue;
    const nextScore = isCorrect ? correctCount + 1 : correctCount;

    if (isCorrect) {
      sounds.playCorrect();
      setCorrectCount(nextScore);
    } else {
      sounds.playWrong();
    }

    onRecordResult(currentQuestion.word.id, isCorrect);

    timerRef.current = setTimeout(() => {
      advanceQuestion(nextScore);
    }, 1200);
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
      const nextScore = isCorrect ? correctCount + 1 : correctCount;

      if (isCorrect) {
        setBuilderStatus('correct');
        sounds.playCorrect();
        playQuestionAudio(currentQuestion.word);
        setCorrectCount(nextScore);
      } else {
        setBuilderStatus('wrong');
        sounds.playWrong();
      }

      onRecordResult(currentQuestion.word.id, isCorrect);

      timerRef.current = setTimeout(() => {
        advanceQuestion(nextScore);
      }, isCorrect ? 1200 : 1600);
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

  const handleSkipQuestion = () => {
    if (isAnswered || !currentQuestion) return;
    sounds.playClick();
    setIsAnswered(true);
    setSelectedAnswer(null);

    if (currentQuestion.type === 'builder') {
      setBuilderStatus('wrong');
    }

    onRecordResult(currentQuestion.word.id, false);

    timerRef.current = setTimeout(() => {
      advanceQuestion(correctCount);
    }, 1400);
  };

  if (!currentQuestion) return null;

  const targetLearnWord = isLatvian ? currentQuestion.word.lv : currentQuestion.word.en;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 sm:py-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <button
          onClick={() => {
            sounds.playClick();
            stopSpeech();
            onBack();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 font-bold text-sm shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.back}</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-2xl bg-amber-50 border-2 border-amber-200 text-amber-700 font-black text-sm">
            ⭐ {correctCount}
          </div>
          <div className="px-3 py-1 rounded-2xl bg-indigo-50 border-2 border-indigo-200 text-indigo-700 font-black text-sm">
            {currentIndex + 1} / {totalQuestions}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-slate-200 rounded-full mb-5 overflow-hidden border border-slate-300">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl border-4 border-indigo-200 shadow-xl p-5 sm:p-7 text-center relative overflow-hidden">
        {/* Question Type Banner */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-900 text-xs font-black uppercase tracking-wider mb-4 border border-indigo-200">
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

        {/* Builder Question */}
        {currentQuestion.type === 'builder' && (
          <div className="my-3">
            <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-3xl bg-amber-50 border-3 border-amber-200 flex items-center justify-center p-2 shadow-inner mb-3 select-none">
              <WordIllustration
                word={currentQuestion.word}
                fallbackEmoji={currentQuestion.topicEmoji || '📖'}
              />
            </div>

            <div className="flex items-center justify-center gap-2 mb-4">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-800 font-comic text-center">
                {currentQuestion.displayTranslation}
              </h3>
              <button
                onClick={() => playQuestionAudio(currentQuestion.word)}
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors cursor-pointer"
                title={t.listen}
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

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

            {builderStatus === 'wrong' && (
              <div className="mt-3 text-emerald-700 font-black text-xl sm:text-2xl font-comic animate-fadeIn">
                ✓ {getTargetToSpell(currentQuestion.word, course).toUpperCase()}
              </div>
            )}

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

        {/* Audio Question */}
        {currentQuestion.type === 'audio' && (
          <div className="my-5">
            <button
              onClick={() => playQuestionAudio(currentQuestion.word)}
              className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-3xl bg-gradient-to-tr from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 active:scale-95 border-4 border-white shadow-xl flex items-center justify-center text-white cursor-pointer transition-transform group"
              title={t.listen}
            >
              <Volume2 className="w-12 h-12 sm:w-14 sm:h-14 group-hover:scale-110 transition-transform animate-pulse" />
            </button>
            <p className="mt-2.5 text-xs sm:text-sm font-bold text-slate-500">
              {t.listen}
            </p>
            {isAnswered && (
              <div className="mt-2 text-lg font-black text-indigo-600 font-comic">
                {targetLearnWord}
              </div>
            )}
          </div>
        )}

        {/* Choice Question */}
        {currentQuestion.type === 'choice' && (
          <div className="my-6">
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

        {/* True/False Question */}
        {currentQuestion.type === 'truefalse' && (
          <div className="my-5">
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

        {/* Options for 'audio' and 'choice' */}
        {currentQuestion.options && (
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4 mt-4 sm:mt-6">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswer === option.text;
              let btnStyle = 'bg-white border-slate-200 hover:border-indigo-400 text-slate-800 hover:bg-indigo-50/50';

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
                  className={`relative p-2.5 sm:p-4 rounded-2xl border-3 font-black text-sm sm:text-xl font-comic shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 sm:gap-3 min-h-[3.75rem] sm:min-h-[4.75rem] ${btnStyle}`}
                >
                  {option.word && (
                    <div className="w-8 h-8 sm:w-11 sm:h-11 flex items-center justify-center flex-shrink-0 select-none">
                      <WordIllustration
                        word={option.word}
                        fallbackEmoji={currentQuestion.topicEmoji || '📖'}
                        className="w-7 h-7 sm:w-10 sm:h-10 text-2xl sm:text-3xl"
                      />
                    </div>
                  )}
                  <span className="leading-snug">{option.text}</span>
                  {isAnswered && option.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-white absolute right-2 sm:right-3" />
                  )}
                  {isAnswered && isSelected && !option.isCorrect && (
                    <XCircle className="w-5 h-5 text-white absolute right-2 sm:right-3" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* True/False Buttons */}
        {currentQuestion.type === 'truefalse' && (
          <div className="grid grid-cols-2 gap-4 mt-6 max-w-md mx-auto">
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

        {/* Skip Question button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSkipQuestion}
            disabled={isAnswered}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-slate-50 hover:bg-slate-100 border-2 border-slate-200 text-slate-500 hover:text-slate-700 font-bold text-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-default"
          >
            <span>{t.skipRound}</span>
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
