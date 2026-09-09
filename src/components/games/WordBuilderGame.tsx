import React, { useState, useEffect } from 'react';
import { Word, Topic, Language } from '../../types';
import { speakEnglish } from '../../utils/speech';
import { sounds } from '../../utils/soundEffects';
import { translations } from '../../utils/i18n';
import { Volume2, ArrowLeft, RotateCcw } from 'lucide-react';

interface WordBuilderGameProps {
  topic: Topic;
  language: Language;
  onRecordResult: (wordId: string, isCorrect: boolean) => void;
  onComplete: (correctCount: number, totalCount: number) => void;
  onBack: () => void;
}

interface LetterTile {
  id: string;
  char: string;
}

export const WordBuilderGame: React.FC<WordBuilderGameProps> = ({
  topic,
  language,
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
  const [score, setScore] = useState(0);

  const currentWord: Word | undefined = topic.words[currentIndex];

  useEffect(() => {
    if (!currentWord) return;

    setSelectedTiles([]);
    setIsChecking(false);
    setIsError(false);

    // Speak word
    speakEnglish(currentWord.en);

    // Prepare letters (exclude spaces or include them)
    // If word has spaces, let's treat letters cleanly
    const chars = currentWord.en.toLowerCase().split('');
    const tiles: LetterTile[] = chars.map((char, index) => ({
      id: `${char}-${index}-${Math.random()}`,
      char,
    }));

    // Shuffle tiles
    setAvailableTiles([...tiles].sort(() => 0.5 - Math.random()));
  }, [currentIndex, currentWord]);

  const handleSelectTile = (tile: LetterTile) => {
    if (isChecking) return;
    sounds.playClick();

    setAvailableTiles((prev) => prev.filter((t) => t.id !== tile.id));
    const nextSelected = [...selectedTiles, tile];
    setSelectedTiles(nextSelected);

    // Check if finished
    if (currentWord && nextSelected.length === currentWord.en.length) {
      const spelled = nextSelected.map((t) => t.char).join('');
      const target = currentWord.en.toLowerCase();

      if (spelled === target) {
        setIsChecking(true);
        sounds.playCorrect();
        speakEnglish(currentWord.en);
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
        onRecordResult(currentWord.id, false);

        setTimeout(() => {
          setIsError(false);
          // Return all back to available
          const chars = currentWord.en.toLowerCase().split('');
          const resetTiles = chars.map((char, index) => ({
            id: `${char}-${index}-${Math.random()}`,
            char,
          }));
          setAvailableTiles(resetTiles.sort(() => 0.5 - Math.random()));
          setSelectedTiles([]);
        }, 900);
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
    const chars = currentWord.en.toLowerCase().split('');
    const resetTiles = chars.map((char, index) => ({
      id: `${char}-${index}-${Math.random()}`,
      char,
    }));
    setAvailableTiles(resetTiles.sort(() => 0.5 - Math.random()));
    setSelectedTiles([]);
  };

  if (!currentWord) return null;

  const translation = currentWord[language] || currentWord.ru || currentWord.lv;

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

      {/* Target Word Translation Display */}
      <div className="w-full bg-white rounded-3xl border-4 border-amber-300 shadow-xl p-6 text-center mb-6">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          {t.spellTheWord}
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight leading-snug mb-3">
          {translation}
        </h2>
        <button
          onClick={() => speakEnglish(currentWord.en)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-50 border-2 border-amber-200 text-amber-700 font-bold text-sm shadow-sm hover:scale-105 active:scale-95 transition-transform"
        >
          <Volume2 className="w-5 h-5 text-amber-600" />
          <span>{t.listen}</span>
        </button>
      </div>

      {/* Selected Letters Slot */}
      <div
        className={`w-full min-h-[72px] bg-slate-100 rounded-3xl border-4 p-3 flex flex-wrap items-center justify-center gap-2 mb-6 transition-all ${
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
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border-3 border-indigo-400 text-indigo-700 font-black text-2xl shadow-md flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
          >
            {tile.char === ' ' ? '␣' : tile.char.toUpperCase()}
          </button>
        ))}

        {/* Empty placeholder dots if not enough letters */}
        {Array.from({ length: Math.max(0, currentWord.en.length - selectedTiles.length) }).map(
          (_, i) => (
            <div
              key={i}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-300 text-xl font-bold"
            >
              _
            </div>
          )
        )}
      </div>

      {/* Available Letters Pool */}
      <div className="w-full flex flex-wrap items-center justify-center gap-2.5 mb-6">
        {availableTiles.map((tile) => (
          <button
            key={tile.id}
            onClick={() => handleSelectTile(tile)}
            disabled={isChecking}
            className="btn-3d w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-amber-400 hover:bg-amber-300 border-b-4 border-amber-600 text-amber-950 font-black text-2xl sm:text-3xl shadow-md flex items-center justify-center transition-all"
          >
            {tile.char === ' ' ? '␣' : tile.char.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Reset button */}
      {selectedTiles.length > 0 && (
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-sm transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t.clearLetters}</span>
        </button>
      )}
    </div>
  );
};
