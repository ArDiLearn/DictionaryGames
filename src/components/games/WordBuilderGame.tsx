import React, { useState, useEffect } from 'react';
import { Word, Topic, Language, LearningCourse } from '../../types';
import { speakWord } from '../../utils/speech';
import { sounds } from '../../utils/soundEffects';
import { translations } from '../../utils/i18n';
import { WordIllustration } from '../WordIllustration';
import { Volume2, ArrowLeft, RotateCcw } from 'lucide-react';

interface WordBuilderGameProps {
  topic: Topic;
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

const getTargetWord = (word: Word, currentCourse: LearningCourse): string => {
  if (currentCourse === 'lv') {
    return (word.lv.split(',')[0] || word.lv).trim();
  }
  return word.en;
};

export const WordBuilderGame: React.FC<WordBuilderGameProps> = ({
  topic,
  language,
  course = 'en',
  onRecordResult,
  onComplete,
  onBack,
}) => {
  const t = translations[language];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [availableTiles, setAvailableTiles] = useState<LetterTile[]>([]);
  const [selectedTiles, setSelectedTiles] = useState<LetterTile[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [isError, setIsError] = useState(false);
  const [wrongVariants, setWrongVariants] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  const currentWord: Word | undefined = topic.words[currentIndex];
  const targetWord = currentWord ? getTargetWord(currentWord, course) : '';

  useEffect(() => {
    if (!currentWord) return;

    setSelectedTiles([]);
    setIsChecking(false);
    setIsError(false);
    setWrongVariants([]);

    const wordToSpell = getTargetWord(currentWord, course);
    // Speak word
    speakWord(wordToSpell, course);

    // Prepare letters
    const chars = wordToSpell.toLowerCase().split('');
    const tiles: LetterTile[] = chars.map((char, index) => ({
      id: `${char}-${index}-${Math.random()}`,
      char,
    }));

    // Shuffle tiles
    setAvailableTiles([...tiles].sort(() => 0.5 - Math.random()));
  }, [currentIndex, currentWord, course]);

  const handleSelectTile = (tile: LetterTile) => {
    if (isChecking || !currentWord) return;
    sounds.playClick();

    setAvailableTiles((prev) => prev.filter((t) => t.id !== tile.id));
    const nextSelected = [...selectedTiles, tile];
    setSelectedTiles(nextSelected);

    // Check if finished
    const wordToSpell = getTargetWord(currentWord, course);
    if (nextSelected.length === wordToSpell.length) {
      const spelled = nextSelected.map((t) => t.char).join('');
      const target = wordToSpell.toLowerCase();

      if (spelled === target) {
        setIsChecking(true);
        sounds.playCorrect();
        speakWord(wordToSpell, course);
        setScore((prev) => prev + 1);
        onRecordResult(currentWord.id, true);

        setTimeout(() => {
          if (currentIndex + 1 < topic.words.length) {
            setCurrentIndex((prev) => prev + 1);
          } else {
            onComplete(score + 1, topic.words.length);
          }
        }, 1200);
      } else {
        setIsError(true);
        sounds.playWrong();
        setWrongVariants((prev) => (prev.includes(spelled) ? prev : [...prev, spelled]));
        onRecordResult(currentWord.id, false);

        setTimeout(() => {
          setIsError(false);
          // Return all back to available
          const chars = wordToSpell.toLowerCase().split('');
          const resetTiles = chars.map((char, index) => ({
            id: `${char}-${index}-${Math.random()}`,
            char,
          }));
          setAvailableTiles(resetTiles.sort(() => 0.5 - Math.random()));
          setSelectedTiles([]);
        }, 1000);
      }
    }
  };

  const handleRemoveTile = (tile: LetterTile) => {
    if (isChecking) return;
    sounds.playClick();
    setSelectedTiles((prev) => prev.filter((t) => t.id !== tile.id));
    setAvailableTiles((prev) => [...prev, tile]);
  };

  const handleReset = () => {
    if (isChecking || !currentWord) return;
    sounds.playClick();
    const wordToSpell = getTargetWord(currentWord, course);
    const chars = wordToSpell.toLowerCase().split('');
    const resetTiles = chars.map((char, index) => ({
      id: `${char}-${index}-${Math.random()}`,
      char,
    }));
    setAvailableTiles(resetTiles.sort(() => 0.5 - Math.random()));
    setSelectedTiles([]);
  };

  if (!currentWord) return null;

  const translation = course === 'lv' ? currentWord.ru : (currentWord[language] || currentWord.ru || currentWord.lv);

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
          <div className="px-3 py-1 rounded-2xl bg-amber-50 border-2 border-amber-200 text-amber-700 font-black text-sm">
            {currentIndex + 1} / {topic.words.length}
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="w-full h-3 bg-slate-200 rounded-full mb-6 overflow-hidden border border-slate-300">
        <div
          className="h-full bg-amber-400 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / topic.words.length) * 100}%` }}
        />
      </div>

      {/* Target Word Translation Display with Picture */}
      <div className="w-full bg-white rounded-3xl border-4 border-amber-300 shadow-xl p-5 sm:p-6 text-center mb-6">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          {t.spellTheWord}
        </div>

        {/* Word Picture Illustration */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl bg-amber-50 border-3 border-amber-300 flex items-center justify-center p-2 shadow-inner mb-3 select-none hover:scale-105 transition-transform">
          <WordIllustration word={currentWord} fallbackEmoji={topic.emoji} />
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight leading-snug mb-3">
          {translation}
        </h2>
        <button
          onClick={() => speakWord(targetWord, course)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-50 border-2 border-amber-200 text-amber-700 font-bold text-sm shadow-sm hover:scale-105 active:scale-95 transition-transform"
        >
          <Volume2 className="w-5 h-5 text-amber-600" />
          <span>{t.listen}</span>
        </button>
      </div>

      {/* Selected Letters Slot */}
      <div
        className={`w-full min-h-[80px] bg-slate-100 rounded-3xl border-4 p-3.5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-6 transition-all ${
          isError
            ? 'border-rose-400 bg-rose-50 animate-wiggle'
            : isChecking
            ? 'border-emerald-400 bg-emerald-50'
            : 'border-slate-300'
        }`}
      >
        {selectedTiles.map((tile) => (
          <button
            key={tile.id}
            onClick={() => handleRemoveTile(tile)}
            disabled={isChecking}
            title={t.clearLetters}
            className={`rounded-2xl bg-white border-3 border-indigo-400 text-indigo-700 font-black font-comic shadow-md flex items-center justify-center hover:scale-105 active:scale-95 transition-transform ${
              tile.char === ' '
                ? 'px-4 h-12 sm:h-14 text-sm font-bold text-indigo-400'
                : 'w-12 h-12 sm:w-14 sm:h-14 text-2xl sm:text-3xl'
            }`}
          >
            {tile.char === ' ' ? '␣' : tile.char.toUpperCase()}
          </button>
        ))}

        {/* Empty placeholder dots if not enough letters */}
        {Array.from({ length: Math.max(0, targetWord.length - selectedTiles.length) }).map(
          (_, i) => (
            <div
              key={i}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50 flex items-center justify-center text-slate-400 text-2xl font-bold font-comic"
            >
              •
            </div>
          )
        )}
      </div>

      {/* Incorrect Variants History (displayed until correct word is spelled) */}
      {wrongVariants.length > 0 && (
        <div className="w-full bg-rose-50/90 border-2 border-rose-200 rounded-3xl p-3.5 mb-6 animate-fadeIn shadow-sm">
          <div className="flex items-center justify-between gap-2 mb-2 px-1">
            <span className="text-xs font-black text-rose-700 uppercase tracking-wider flex items-center gap-1.5">
              <span>❌</span>
              <span>{t.wrongVariantsTitle}</span>
            </span>
            <span className="text-xs font-bold text-rose-500 hidden sm:inline">
              {t.tryAnotherOrder}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {wrongVariants.map((variant, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-white border-2 border-rose-300 text-rose-700 font-black text-base sm:text-lg shadow-sm font-comic"
              >
                <span className="text-xs text-rose-400 font-bold">#{idx + 1}</span>
                <span className="line-through decoration-rose-500 decoration-2 tracking-wider">
                  {variant.toUpperCase()}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Available Letters Pool (letter tray with wide, well-spaced tiles) */}
      <div className="w-full bg-amber-50/80 border-3 border-amber-200 rounded-3xl p-4 sm:p-5 shadow-inner flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6">
        {availableTiles.map((tile) => (
          <button
            key={tile.id}
            onClick={() => handleSelectTile(tile)}
            disabled={isChecking}
            className={`btn-3d rounded-2xl bg-amber-400 hover:bg-amber-300 border-b-4 border-amber-600 text-amber-950 font-black font-comic shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer select-none ${
              tile.char === ' '
                ? 'px-5 h-14 sm:h-16 min-h-[3.5rem] sm:min-h-[4rem] text-lg font-bold'
                : 'w-14 h-14 sm:w-16 sm:h-16 min-w-[3.5rem] min-h-[3.5rem] sm:min-w-[4rem] sm:min-h-[4rem] text-2xl sm:text-3xl'
            }`}
          >
            {tile.char === ' ' ? '␣' : tile.char.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Reset button */}
      {selectedTiles.length > 0 && (
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-sm transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t.clearLetters}</span>
        </button>
      )}
    </div>
  );
};
