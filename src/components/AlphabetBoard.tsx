import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Volume2,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  Trophy,
  BookOpen,
} from 'lucide-react';
import { ALPHABET_LETTERS, AlphabetLetter, speakLetter, speakLetterWord } from '../data/alphabetData';
import { GrammarTopic, GrammarQuestion, getQuestionsForGrammarTopic } from '../data/grammarData';
import { Language, LearningCourse } from '../types';
import { sounds } from '../utils/soundEffects';
import { stopSpeech } from '../utils/speech';
import { saveGrammarProgress } from '../services/storage';

interface AlphabetBoardProps {
  language: Language;
  course?: LearningCourse;
  topic: GrammarTopic;
  onBack: () => void;
  onComplete?: (topicId: string, stars: number, score: number) => void;
  initialTab?: 'board' | 'quiz';
}

type AudioMode = 'letter' | 'word' | 'both';

export const AlphabetBoard: React.FC<AlphabetBoardProps> = ({
  language,
  course = 'en',
  topic,
  onBack,
  onComplete,
  initialTab = 'board',
}) => {
  const [activeTab, setActiveTab] = useState<'board' | 'quiz'>(initialTab);
  const [audioMode, setAudioMode] = useState<AudioMode>('letter');
  const [speechRate, setSpeechRate] = useState<number>(0.85);
  const [speakingLetter, setSpeakingLetter] = useState<string | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const autoPlayIndexRef = useRef<number>(-1);
  const autoPlayTimerRef = useRef<any>(null);

  // --- Quiz state ---
  const [quizQuestions, setQuizQuestions] = useState<GrammarQuestion[]>(() =>
    getQuestionsForGrammarTopic(topic)
  );
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOptIndex, setSelectedOptIndex] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isQuizOver, setIsQuizOver] = useState(false);

  // Stop any audio when unmounting or switching tabs
  useEffect(() => {
    return () => {
      stopAutoPlay();
      stopSpeech();
    };
  }, []);

  const stopAutoPlay = () => {
    setIsAutoPlaying(false);
    autoPlayIndexRef.current = -1;
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
  };

  const playSingleLetter = (letterObj: AlphabetLetter, mode = audioMode, rate = speechRate) => {
    sounds.playClick();
    setSpeakingLetter(letterObj.letter);

    const onEnd = () => {
      setSpeakingLetter((curr) => (curr === letterObj.letter ? null : curr));
    };

    if (mode === 'word') {
      speakLetterWord(letterObj, rate, undefined, onEnd);
    } else if (mode === 'both') {
      speakLetter(letterObj, rate, true, undefined, onEnd);
    } else {
      speakLetter(letterObj, rate, false, undefined, onEnd);
    }
  };

  // Auto-play through all letters A-Z
  const handleToggleAutoPlay = () => {
    sounds.playClick();
    if (isAutoPlaying) {
      stopAutoPlay();
      stopSpeech();
      setSpeakingLetter(null);
    } else {
      setIsAutoPlaying(true);
      playNextAutoLetter(0);
    }
  };

  const playNextAutoLetter = (index: number) => {
    if (index >= ALPHABET_LETTERS.length) {
      stopAutoPlay();
      setSpeakingLetter(null);
      return;
    }

    autoPlayIndexRef.current = index;
    const current = ALPHABET_LETTERS[index];
    setSpeakingLetter(current.letter);

    const onLetterEnd = () => {
      // Pause slightly between letters for clarity
      autoPlayTimerRef.current = setTimeout(() => {
        playNextAutoLetter(index + 1);
      }, 550);
    };

    if (audioMode === 'both') {
      speakLetter(current, speechRate, true, undefined, onLetterEnd);
    } else if (audioMode === 'word') {
      speakLetterWord(current, speechRate, undefined, onLetterEnd);
    } else {
      speakLetter(current, speechRate, false, undefined, onLetterEnd);
    }
  };

  // --- Quiz Handlers ---
  const handleStartQuiz = () => {
    sounds.playClick();
    stopAutoPlay();
    stopSpeech();
    setQuizQuestions(getQuestionsForGrammarTopic(topic));
    setCurrentQIndex(0);
    setSelectedOptIndex(null);
    setIsAnswerChecked(false);
    setCorrectCount(0);
    setIsQuizOver(false);
    setActiveTab('quiz');
  };

  const handleRestartQuiz = () => {
    sounds.playClick();
    setQuizQuestions(getQuestionsForGrammarTopic(topic));
    setCurrentQIndex(0);
    setSelectedOptIndex(null);
    setIsAnswerChecked(false);
    setCorrectCount(0);
    setIsQuizOver(false);
  };

  const currentQ = quizQuestions[currentQIndex];

  const handleSpeakQuestion = () => {
    sounds.playClick();
    if (currentQ?.audioText) {
      speakLetter(
        {
          letter: currentQ.audioText,
          display: currentQ.audioText,
          transcription: '',
          tts: currentQ.audioText,
          example: { en: '', ru: '', lv: '', emoji: '' },
          color: { bg: '', border: '', text: '', badge: '' },
        },
        speechRate
      );
    }
  };

  const handleSelectQuizOption = (idx: number) => {
    if (isAnswerChecked || isQuizOver || !currentQ) return;

    setSelectedOptIndex(idx);
    setIsAnswerChecked(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      sounds.playCorrect();
      setCorrectCount((prev) => prev + 1);
    } else {
      sounds.playWrong();
    }

    setTimeout(() => {
      if (currentQIndex + 1 < quizQuestions.length) {
        setCurrentQIndex((prev) => prev + 1);
        setSelectedOptIndex(null);
        setIsAnswerChecked(false);
      } else {
        const finalScore = isCorrect ? correctCount + 1 : correctCount;
        finishQuiz(finalScore);
      }
    }, isCorrect ? 900 : 1600);
  };

  const finishQuiz = (finalScore: number) => {
    setIsQuizOver(true);
    const total = quizQuestions.length;
    const ratio = total > 0 ? finalScore / total : 0;
    const earnedStars = ratio >= 0.9 ? 3 : ratio >= 0.7 ? 2 : ratio >= 0.5 ? 1 : 0;

    sounds.playFanfare();

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

    if (onComplete) {
      onComplete(topic.id, earnedStars, finalScore);
    }
  };

  // Localized texts
  const t = {
    back: language === 'lv' ? 'Atpakaļ' : 'Назад',
    boardTab: language === 'lv' ? 'Alfabēts' : 'Азбука (A-Z)',
    quizTab: language === 'lv' ? 'Treniņš' : 'Тренажёр',
    title: language === 'lv' ? 'Angļu alfabēts' : 'Английский алфавит',
    subtitle:
      language === 'lv'
        ? 'Nospied uz burta, lai noklausītos pareizu izrunu!'
        : 'Нажми на любую букву, чтобы послушать её произношение!',
    playAll: language === 'lv' ? 'Klausīties visus' : 'Слушать все (A–Z)',
    pause: language === 'lv' ? 'Pauze' : 'Пауза',
    modeLetter: language === 'lv' ? 'Tikai burts' : 'Буквы',
    modeWord: language === 'lv' ? 'Vārds' : 'Слова',
    modeBoth: language === 'lv' ? 'Burts + vārds' : 'Буква + слово',
    speedNormal: '0.85x',
    speedSlow: language === 'lv' ? 'Lēnāk (0.65x)' : 'Медленнее (0.65x)',
    startPractice: language === 'lv' ? 'Sākt treniņu' : 'Начать тренировку',
    questionNum: language === 'lv' ? 'Jautājums' : 'Вопрос',
    of: language === 'lv' ? 'no' : 'из',
    score: language === 'lv' ? 'Rezultāts' : 'Результат',
    greatJob: language === 'lv' ? 'Lieliski!' : 'Отличная работа!',
    playAgain: language === 'lv' ? 'Spēlēt vēlreiz' : 'Попробовать снова',
    backToBoard: language === 'lv' ? 'Atpakaļ pie alfabēta' : 'Вернуться к азбуке',
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 flex flex-col items-center">
      {/* Top Header Bar */}
      <div className="w-full flex items-center justify-between gap-3 mb-4">
        <button
          onClick={() => {
            sounds.playClick();
            stopAutoPlay();
            stopSpeech();
            onBack();
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-white border-2 border-amber-200/90 text-slate-700 font-black text-sm shadow-xs hover:bg-amber-50/60 transition-all active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.back}</span>
        </button>

        {/* Tab switchers: Board vs Quiz */}
        <div className="flex items-center gap-1.5 p-1 bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-indigo-200 shadow-2xs">
          <button
            onClick={() => {
              sounds.playClick();
              stopAutoPlay();
              stopSpeech();
              setActiveTab('board');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeTab === 'board'
                ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-indigo-600'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{t.boardTab}</span>
          </button>

          <button
            onClick={handleStartQuiz}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-amber-600'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.quizTab}</span>
          </button>
        </div>
      </div>

      {/* --- TAB 1: ALPHABET BOARD --- */}
      {activeTab === 'board' && (
        <div className="w-full flex flex-col items-center">
          {/* Title and Controls Card */}
          <div className="w-full bg-white rounded-3xl p-4 sm:p-5 border-3 border-indigo-200 shadow-md mb-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">🔤</span>
                  <h1 className="text-xl sm:text-2xl font-black text-indigo-950 tracking-tight">
                    {t.title}
                  </h1>
                  <span className="text-xs font-black px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                    3 {language === 'lv' ? 'klase' : 'класс'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-500">
                  {t.subtitle}
                </p>
              </div>

              {/* Action Buttons & Play All */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Auto Play / Pause button */}
                <button
                  onClick={handleToggleAutoPlay}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-xs sm:text-sm shadow-sm transition-all active:scale-95 cursor-pointer ${
                    isAutoPlaying
                      ? 'bg-amber-500 text-white hover:bg-amber-600 ring-2 ring-amber-300 ring-offset-1'
                      : 'bg-emerald-500 text-white hover:bg-emerald-600'
                  }`}
                >
                  {isAutoPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-white" />
                      <span>{t.pause}</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-white" />
                      <span>{t.playAll}</span>
                    </>
                  )}
                </button>

                {/* Audio Mode Selectors */}
                <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700">
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setAudioMode('letter');
                    }}
                    className={`px-2.5 py-1 rounded-xl transition-all ${
                      audioMode === 'letter' ? 'bg-white text-indigo-900 shadow-2xs font-black' : 'hover:text-slate-900'
                    }`}
                  >
                    {t.modeLetter}
                  </button>
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setAudioMode('word');
                    }}
                    className={`px-2.5 py-1 rounded-xl transition-all ${
                      audioMode === 'word' ? 'bg-white text-indigo-900 shadow-2xs font-black' : 'hover:text-slate-900'
                    }`}
                  >
                    {t.modeWord}
                  </button>
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setAudioMode('both');
                    }}
                    className={`px-2.5 py-1 rounded-xl transition-all ${
                      audioMode === 'both' ? 'bg-white text-indigo-900 shadow-2xs font-black' : 'hover:text-slate-900'
                    }`}
                  >
                    {t.modeBoth}
                  </button>
                </div>

                {/* Speed Toggle */}
                <button
                  onClick={() => {
                    sounds.playClick();
                    setSpeechRate((prev) => (prev === 0.85 ? 0.65 : 0.85));
                  }}
                  title="Скорость произношения"
                  className={`px-2.5 py-1.5 rounded-xl border text-xs font-black transition-all ${
                    speechRate === 0.65
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {speechRate === 0.65 ? '🐢 0.65x' : '🐇 0.85x'}
                </button>
              </div>
            </div>
          </div>

          {/* 26 Letters Grid */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-3.5 mb-6">
            {ALPHABET_LETTERS.map((letterObj, idx) => {
              const isCurrent = speakingLetter === letterObj.letter;
              const exampleLabel =
                language === 'lv' ? letterObj.example.lv : letterObj.example.ru;

              return (
                <div
                  key={letterObj.letter}
                  onClick={() => playSingleLetter(letterObj)}
                  className={`group relative flex flex-col items-center justify-between p-3.5 rounded-3xl border-3 transition-all duration-200 cursor-pointer text-center select-none ${
                    letterObj.color.bg
                  } ${letterObj.color.border} ${
                    isCurrent
                      ? 'scale-105 ring-4 ring-amber-400 ring-offset-2 shadow-lg bg-amber-50/95 -translate-y-1'
                      : 'hover:-translate-y-1 hover:shadow-md active:scale-95'
                  }`}
                >
                  {/* Top Badge: Order number (1-26) */}
                  <div className="w-full flex items-center justify-between mb-1">
                    <span className="text-[10px] font-black text-slate-400">
                      #{idx + 1}
                    </span>
                    <Volume2
                      className={`w-4 h-4 transition-transform ${
                        isCurrent
                          ? 'text-amber-600 scale-125 animate-pulse'
                          : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                    />
                  </div>

                  {/* Big Letters Display: Aa */}
                  <div
                    className={`text-3xl sm:text-4xl font-black tracking-tight my-0.5 ${letterObj.color.text}`}
                  >
                    {letterObj.display}
                  </div>

                  {/* Phonetic Transcription */}
                  <div
                    className={`text-xs font-mono font-black px-2 py-0.5 rounded-full border mb-2 ${letterObj.color.badge}`}
                  >
                    {letterObj.transcription}
                  </div>

                  {/* Example Word Illustration */}
                  <div className="w-full pt-2 border-t border-slate-200/80 flex flex-col items-center">
                    <div className="text-2xl group-hover:scale-115 transition-transform mb-0.5">
                      {letterObj.example.emoji}
                    </div>
                    <div className="text-xs font-black text-slate-800 capitalize leading-tight">
                      {letterObj.example.en}
                    </div>
                    <div className="text-[10px] font-semibold text-slate-500 leading-tight">
                      {exampleLabel}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Call to Action for Practice */}
          <div className="w-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-4 sm:p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md mb-8">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <span className="text-3xl sm:text-4xl">🎯</span>
              <div>
                <h3 className="text-base sm:text-lg font-black tracking-tight">
                  {language === 'lv'
                    ? 'Pārbaudi savas alfabēta zināšanas!'
                    : 'Проверь свои знания алфавита!'}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-amber-100">
                  {language === 'lv'
                    ? 'Uzdevumi ar izrunu, burtu secību un vārdiem.'
                    : 'Задания на распознавание на слух, пропущенные буквы и алфавитный порядок.'}
                </p>
              </div>
            </div>

            <button
              onClick={handleStartQuiz}
              className="px-5 py-2.5 rounded-2xl bg-white text-orange-600 font-black text-sm shadow-md hover:bg-orange-50 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              {t.startPractice} →
            </button>
          </div>
        </div>
      )}

      {/* --- TAB 2: QUIZ / PRACTICE --- */}
      {activeTab === 'quiz' && (
        <div className="w-full max-w-2xl flex flex-col items-center">
          {!isQuizOver && currentQ && (
            <div className="w-full flex flex-col items-center">
              {/* Progress and Question Counter */}
              <div className="w-full flex items-center justify-between text-xs sm:text-sm font-black text-slate-600 mb-2 px-1">
                <span>
                  {t.questionNum} {currentQIndex + 1} {t.of} {quizQuestions.length}
                </span>
                <span className="text-amber-600 flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5" />
                  {correctCount}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300 rounded-full"
                  style={{
                    width: `${((currentQIndex + 1) / quizQuestions.length) * 100}%`,
                  }}
                />
              </div>

              {/* Question Card */}
              <div className="w-full bg-white rounded-3xl p-5 sm:p-7 border-3 border-indigo-200 shadow-md flex flex-col items-center text-center mb-6">
                <h2 className="text-lg sm:text-xl font-black text-slate-800 mb-4">
                  {currentQ.prompt}
                </h2>

                {/* Speaker button to hear the audio */}
                {currentQ.audioText && (
                  <button
                    onClick={handleSpeakQuestion}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-50 border-2 border-indigo-300 text-indigo-700 font-black text-sm hover:bg-indigo-100 active:scale-95 transition-all shadow-xs mb-4 cursor-pointer"
                  >
                    <Volume2 className="w-5 h-5 text-indigo-600" />
                    <span>{language === 'lv' ? 'Klausīties skaņu' : 'Послушать букву'}</span>
                  </button>
                )}

                {/* Illustration emoji if present */}
                {currentQ.imageWord?.emoji && (
                  <div className="text-5xl my-2 animate-bounce">
                    {currentQ.imageWord.emoji}
                  </div>
                )}
              </div>

              {/* Options Grid */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3">
                {currentQ.options.map((option, idx) => {
                  let optStyle =
                    'bg-white border-3 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 text-slate-800 shadow-xs';

                  if (isAnswerChecked) {
                    if (idx === currentQ.correctIndex) {
                      optStyle =
                        'bg-emerald-50 border-3 border-emerald-400 text-emerald-900 ring-2 ring-emerald-300 shadow-md';
                    } else if (idx === selectedOptIndex) {
                      optStyle =
                        'bg-rose-50 border-3 border-rose-400 text-rose-900 ring-2 ring-rose-300';
                    } else {
                      optStyle = 'bg-white/60 border-2 border-slate-200 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswerChecked}
                      onClick={() => handleSelectQuizOption(idx)}
                      className={`relative flex items-center justify-center p-4 sm:p-5 rounded-2xl font-black text-lg sm:text-xl transition-all cursor-pointer ${optStyle} ${
                        !isAnswerChecked ? 'hover:-translate-y-0.5 active:scale-95' : ''
                      }`}
                    >
                      <span>{option}</span>

                      {isAnswerChecked && idx === currentQ.correctIndex && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 absolute right-3" />
                      )}
                      {isAnswerChecked && idx === selectedOptIndex && idx !== currentQ.correctIndex && (
                        <XCircle className="w-5 h-5 text-rose-500 absolute right-3" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quiz Complete Summary */}
          {isQuizOver && (
            <div className="w-full bg-white rounded-3xl p-6 sm:p-8 border-3 border-amber-300 shadow-lg flex flex-col items-center text-center">
              <div className="text-6xl mb-3">🎉</div>
              <h2 className="text-2xl font-black text-slate-800 mb-1">{t.greatJob}</h2>
              <p className="text-sm font-semibold text-slate-500 mb-4">
                {language === 'lv'
                  ? 'Alfabēta treniņš ir veiksmīgi pabeigts!'
                  : 'Тренировка алфавита успешно завершена!'}
              </p>

              {/* Stars display */}
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3].map((starIdx) => {
                  const total = quizQuestions.length;
                  const ratio = total > 0 ? correctCount / total : 0;
                  const earned =
                    starIdx === 1 ? ratio >= 0.5 : starIdx === 2 ? ratio >= 0.7 : ratio >= 0.9;

                  return (
                    <span
                      key={starIdx}
                      className={`text-4xl transition-transform ${
                        earned ? 'text-amber-400 scale-110 drop-shadow-sm' : 'text-slate-200'
                      }`}
                    >
                      ★
                    </span>
                  );
                })}
              </div>

              {/* Score pill */}
              <div className="px-4 py-2 bg-amber-50 rounded-2xl border-2 border-amber-200 font-black text-amber-900 text-base mb-6">
                {t.score}: {correctCount} / {quizQuestions.length}
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleRestartQuiz}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 text-white font-black text-sm shadow-md hover:bg-amber-600 active:scale-95 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{t.playAgain}</span>
                </button>

                <button
                  onClick={() => {
                    sounds.playClick();
                    setActiveTab('board');
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 text-slate-700 font-black text-sm border-2 border-slate-200 hover:bg-slate-200 active:scale-95 transition-all cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{t.backToBoard}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
