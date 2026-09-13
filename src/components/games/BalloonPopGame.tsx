import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Word, Topic, Language } from '../../types';
import { speakEnglish } from '../../utils/speech';
import { sounds } from '../../utils/soundEffects';
import { translations } from '../../utils/i18n';
import { Volume2, ArrowLeft, Sparkles, Cloud } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BalloonPopGameProps {
  topic: Topic;
  allTopics: Topic[];
  language: Language;
  onRecordResult: (wordId: string, isCorrect: boolean) => void;
  onComplete: (correctCount: number, totalCount: number) => void;
  onBack: () => void;
}

interface BalloonOption {
  id: string;
  en: string;
  isCorrect: boolean;
  color: {
    gradient: string;
    shadow: string;
    border: string;
    stringColor: string;
  };
  xPercent: number; // horizontal column position (e.g. 18%, 50%, 82%)
  popped: boolean;
  wobble: boolean;
}

const BALLOON_THEMES = [
  {
    gradient: 'from-pink-400 to-rose-500',
    shadow: 'shadow-pink-300',
    border: 'border-pink-300',
    stringColor: '#f43f5e',
  },
  {
    gradient: 'from-amber-400 to-orange-500',
    shadow: 'shadow-amber-300',
    border: 'border-amber-300',
    stringColor: '#f59e0b',
  },
  {
    gradient: 'from-emerald-400 to-teal-500',
    shadow: 'shadow-emerald-300',
    border: 'border-emerald-300',
    stringColor: '#10b981',
  },
  {
    gradient: 'from-sky-400 to-blue-500',
    shadow: 'shadow-sky-300',
    border: 'border-sky-300',
    stringColor: '#0ea5e9',
  },
  {
    gradient: 'from-purple-400 to-indigo-500',
    shadow: 'shadow-purple-300',
    border: 'border-purple-300',
    stringColor: '#8b5cf6',
  },
];

const FALL_DURATION_SEC = 9; // Gentle 9 seconds to glide down

export const BalloonPopGame: React.FC<BalloonPopGameProps> = ({
  topic,
  allTopics,
  language,
  onRecordResult,
  onComplete,
  onBack,
}) => {
  const t = translations[language];

  // Questions order
  const shuffledWords = useMemo(() => {
    if (!topic.words) return [];
    return [...topic.words].sort(() => Math.random() - 0.5);
  }, [topic]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [balloons, setBalloons] = useState<BalloonOption[]>([]);
  const [fallProgress, setFallProgress] = useState(0); // 0 to 1
  const [roundState, setRoundState] = useState<'playing' | 'won' | 'missed'>('playing');

  const currentWord: Word | undefined = shuffledWords[currentIndex];
  const animRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // Setup balloons for current word
  const setupRound = useCallback(() => {
    if (!currentWord) return;

    // Pick 2 distractors from topic or allTopics
    const otherInTopic = topic.words.filter((w) => w.id !== currentWord.id);
    let pool = otherInTopic;
    if (pool.length < 2) {
      const allWords = allTopics.flatMap((tp) => tp.words);
      pool = allWords.filter((w) => w.id !== currentWord.id);
    }

    const shuffledPool = [...pool].sort(() => Math.random() - 0.5);
    const distractor1 = shuffledPool[0] || currentWord;
    const distractor2 = shuffledPool[1] || currentWord;

    const rawOptions = [
      { id: currentWord.id, en: currentWord.en, isCorrect: true },
      { id: distractor1.id, en: distractor1.en, isCorrect: false },
      { id: distractor2.id, en: distractor2.en, isCorrect: false },
    ];

    // Shuffle options order
    const shuffledOptions = rawOptions.sort(() => Math.random() - 0.5);

    // Shuffle colors
    const shuffledThemes = [...BALLOON_THEMES].sort(() => Math.random() - 0.5);

    // Positions across 3 horizontal lanes: 18%, 50%, 82% with slight random nudge
    const xPositions = [18, 50, 82];
    const shuffledX = [...xPositions].sort(() => Math.random() - 0.5);

    const newBalloons: BalloonOption[] = shuffledOptions.map((opt, i) => ({
      ...opt,
      color: shuffledThemes[i % shuffledThemes.length],
      xPercent: shuffledX[i] + (Math.random() * 6 - 3),
      popped: false,
      wobble: false,
    }));

    setBalloons(newBalloons);
    setFallProgress(0);
    setRoundState('playing');
    startTimeRef.current = performance.now();
  }, [currentWord, topic, allTopics]);

  // Next round / game completion
  const advanceRound = useCallback(
    (newScore: number) => {
      if (currentIndex + 1 < shuffledWords.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        onComplete(newScore, shuffledWords.length);
      }
    },
    [currentIndex, shuffledWords.length, onComplete]
  );

  // Initialize round on currentIndex change
  useEffect(() => {
    setupRound();
  }, [currentIndex, setupRound]);

  // Animation Loop for falling balloons
  useEffect(() => {
    if (roundState !== 'playing') {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }

    let isCancelled = false;

    const animate = (now: number) => {
      if (isCancelled) return;
      const elapsedSec = (now - startTimeRef.current) / 1000;
      const prog = Math.min(1, elapsedSec / FALL_DURATION_SEC);

      setFallProgress(prog);

      if (prog >= 1) {
        // Balloons reached bottom without hitting correct one
        setRoundState('missed');
        sounds.playWrong();
        if (currentWord) {
          onRecordResult(currentWord.id, false);
          speakEnglish(currentWord.en);
        }

        setTimeout(() => {
          advanceRound(score);
        }, 1800);
      } else {
        animRef.current = requestAnimationFrame(animate);
      }
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      isCancelled = true;
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [roundState, currentWord, advanceRound, score, onRecordResult]);

  // Click handler on balloon
  const handleBalloonClick = (balloonIndex: number) => {
    if (roundState !== 'playing') return;

    const target = balloons[balloonIndex];
    if (!target || target.popped) return;

    if (target.isCorrect) {
      // WIN this round!
      setRoundState('won');
      sounds.playCorrect();
      setScore((prev) => prev + 1);

      // Speak the English word!
      speakEnglish(target.en);

      if (currentWord) {
        onRecordResult(currentWord.id, true);
      }

      // Pop the balloon
      setBalloons((prev) =>
        prev.map((b, i) => (i === balloonIndex ? { ...b, popped: true } : b))
      );

      // Confetti burst
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { x: target.xPercent / 100, y: Math.min(0.8, fallProgress * 0.7 + 0.2) },
      });

      setTimeout(() => {
        advanceRound(score + 1);
      }, 950);
    } else {
      // Wrong balloon clicked! Pop only this balloon with wrong sound
      sounds.playWrong();

      setBalloons((prev) =>
        prev.map((b, i) =>
          i === balloonIndex ? { ...b, popped: true, wobble: true } : b
        )
      );
    }
  };

  const playVoice = () => {
    if (!currentWord) return;
    speakEnglish(currentWord.en);
  };

  if (!currentWord) {
    return (
      <div className="text-center py-12 font-bold text-slate-500">
        Загрузка...
      </div>
    );
  }

  const targetTranslation = currentWord[language] || currentWord.ru;
  const progressPercent = ((currentIndex + 1) / shuffledWords.length) * 100;

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 sm:py-6 select-none">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between gap-2 mb-3">
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
          <span className="truncate max-w-[130px] sm:max-w-[170px]">
            {topic.topic_name[language] || topic.topic_name.en}
          </span>
        </div>

        <div className="flex items-center gap-1 bg-amber-50 border-2 border-amber-300 px-3 py-1 rounded-full text-amber-600 font-bold text-xs sm:text-sm shadow-sm">
          <span>⭐</span>
          <span>{score}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden mb-4 border border-slate-300 shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Target Word Card */}
      <div className="bg-white rounded-3xl border-3 border-indigo-200 p-4 sm:p-5 shadow-md mb-4 text-center relative overflow-hidden">
        <p className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">
          {t.balloonPrompt}
        </p>
        <div className="flex items-center justify-center gap-3">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
            {targetTranslation}
          </h2>
          <button
            onClick={playVoice}
            className="w-10 h-10 rounded-2xl bg-indigo-50 hover:bg-indigo-100 border-2 border-indigo-200 flex items-center justify-center text-indigo-600 transition-transform active:scale-95 cursor-pointer"
            title={t.listen}
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Playground Area: Sky with clouds and falling balloons */}
      <div className="relative h-[390px] sm:h-[430px] rounded-3xl overflow-hidden bg-gradient-to-b from-sky-300 via-sky-100 to-indigo-50 border-4 border-sky-300 shadow-xl">
        {/* Background Clouds */}
        <div className="absolute top-4 left-6 text-white/70 animate-pulse pointer-events-none">
          <Cloud className="w-16 h-16 fill-white" />
        </div>
        <div className="absolute top-12 right-8 text-white/60 pointer-events-none">
          <Cloud className="w-20 h-20 fill-white" />
        </div>
        <div className="absolute bottom-6 left-1/3 text-white/50 pointer-events-none">
          <Cloud className="w-14 h-14 fill-white" />
        </div>

        {/* Status overlay banner on win or miss */}
        {roundState === 'won' && (
          <div className="absolute inset-0 bg-emerald-500/20 backdrop-blur-[2px] z-30 flex items-center justify-center animate-pop">
            <div className="bg-white/95 px-6 py-3.5 rounded-3xl border-4 border-emerald-400 shadow-2xl flex items-center gap-2 text-emerald-700 font-black text-xl sm:text-2xl">
              <Sparkles className="w-7 h-7 text-amber-400 animate-spin" />
              <span>{t.correct} {currentWord.en}!</span>
            </div>
          </div>
        )}

        {roundState === 'missed' && (
          <div className="absolute inset-0 bg-rose-500/20 backdrop-blur-[2px] z-30 flex items-center justify-center animate-pop">
            <div className="bg-white/95 px-6 py-3.5 rounded-3xl border-4 border-rose-400 shadow-2xl text-center">
              <p className="text-xs font-bold text-rose-500 uppercase mb-0.5">
                {t.balloonMissed}
              </p>
              <p className="text-xl sm:text-2xl font-black text-slate-800">
                {currentWord.en}
              </p>
            </div>
          </div>
        )}

        {/* Floating / Falling Balloons */}
        {balloons.map((balloon, index) => {
          if (balloon.popped) {
            // Popped animation: burst / poof
            return (
              <div
                key={balloon.id + index}
                className="absolute transition-all duration-300 pointer-events-none flex items-center justify-center animate-ping"
                style={{
                  left: `${balloon.xPercent}%`,
                  top: `${fallProgress * 75}%`,
                  transform: 'translate(-50%, 0)',
                }}
              >
                <span className="text-3xl">💥</span>
              </div>
            );
          }

          // Top position calculated from fall progress (from -10% down to 72%)
          const topPercent = fallProgress * 78 - 5;
          // Sine sway calculation for organic floating
          const swayPx = Math.sin(fallProgress * Math.PI * 4 + index * 2) * 12;

          return (
            <button
              key={balloon.id + index}
              onClick={() => handleBalloonClick(index)}
              className="absolute group focus:outline-none transition-transform active:scale-95 cursor-pointer z-20"
              style={{
                left: `calc(${balloon.xPercent}% + ${swayPx}px)`,
                top: `${topPercent}%`,
                transform: 'translate(-50%, 0)',
              }}
            >
              {/* Balloon Body */}
              <div
                className={`relative w-24 sm:w-28 h-28 sm:h-32 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] bg-gradient-to-br ${balloon.color.gradient} shadow-lg ${balloon.color.shadow} border-2 ${balloon.color.border} flex items-center justify-center p-2 group-hover:scale-105 transition-transform`}
              >
                {/* Glossy highlight reflection */}
                <div className="absolute top-2.5 left-3.5 w-4 sm:w-5 h-6 sm:h-7 rounded-full bg-white/45 -rotate-35 pointer-events-none blur-[0.5px]" />

                {/* English Word */}
                <span className="text-white font-black text-sm sm:text-base font-comic tracking-tight text-center leading-tight drop-shadow-md px-1 break-words">
                  {balloon.en}
                </span>

                {/* Balloon Knot */}
                <div
                  className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3.5 h-2.5 rounded-b-md bg-inherit filter brightness-90 shadow-sm`}
                />
              </div>

              {/* Balloon String */}
              <div className="flex justify-center -mt-0.5">
                <svg
                  width="18"
                  height="34"
                  viewBox="0 0 18 34"
                  fill="none"
                  className="overflow-visible pointer-events-none opacity-80"
                >
                  <path
                    d="M9 0 C13 10, 5 18, 10 26 C12 30, 8 34, 9 34"
                    stroke={balloon.color.stringColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-400 mt-3 px-2">
        <span>{currentIndex + 1} / {shuffledWords.length}</span>
        <span>{language === 'ru' ? 'Нажимай на шарик!' : 'Spied uz balona!'}</span>
      </div>
    </div>
  );
};
