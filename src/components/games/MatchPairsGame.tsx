import React, { useState, useEffect } from 'react';
import { Word, Topic, Language, LearningCourse } from '../../types';
import { speakWord } from '../../utils/speech';
import { sounds } from '../../utils/soundEffects';
import { translations, getWordsPlural } from '../../utils/i18n';
import { ArrowLeft } from 'lucide-react';

interface MatchPairsGameProps {
  topic: Topic;
  language: Language;
  course?: LearningCourse;
  onRecordResult: (wordId: string, isCorrect: boolean) => void;
  onComplete: (correctCount: number, totalCount: number) => void;
  onBack: () => void;
}

interface MatchCard {
  id: string; // unique card id
  wordId: string;
  text: string;
  type: 'target' | 'trans';
  matched: boolean;
}

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export const MatchPairsGame: React.FC<MatchPairsGameProps> = ({
  topic,
  language,
  course = 'en',
  onRecordResult,
  onComplete,
  onBack,
}) => {
  const t = translations[language];
  const [shuffledWords, setShuffledWords] = useState<Word[]>(() =>
    shuffleArray(topic.words || [])
  );
  const [roundOffset, setRoundOffset] = useState(0);
  const [cards, setCards] = useState<MatchCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<MatchCard | null>(null);
  const [wrongCardIds, setWrongCardIds] = useState<string[]>([]);
  const [totalMatched, setTotalMatched] = useState(0);

  useEffect(() => {
    setShuffledWords(shuffleArray(topic.words || []));
    setRoundOffset(0);
    setTotalMatched(0);
  }, [topic]);

  const ROUND_SIZE = 4;
  const currentBatch = shuffledWords.slice(roundOffset, roundOffset + ROUND_SIZE);

  useEffect(() => {
    if (currentBatch.length === 0) return;

    const isLatvianCourse = course === 'lv';
    const targetCards: MatchCard[] = currentBatch.map((w) => ({
      id: `target-${w.id}`,
      wordId: w.id,
      text: isLatvianCourse ? w.lv : w.en,
      type: 'target',
      matched: false,
    }));

    const transCards: MatchCard[] = currentBatch.map((w) => ({
      id: `trans-${w.id}`,
      wordId: w.id,
      text: isLatvianCourse ? w.ru : (w[language] || w.ru || w.lv),
      type: 'trans',
      matched: false,
    }));

    const shuffledTarget = shuffleArray(targetCards);
    const shuffledTrans = shuffleArray(transCards);
    setCards([...shuffledTarget, ...shuffledTrans]);
    setSelectedCard(null);
    setWrongCardIds([]);
  }, [roundOffset, course, shuffledWords]);

  const handleCardClick = (card: MatchCard) => {
    if (card.matched || wrongCardIds.length > 0) return;
    if (selectedCard && selectedCard.id === card.id) return;

    sounds.playClick();

    if (!selectedCard) {
      // First card clicked
      setSelectedCard(card);
      if (card.type === 'target') {
        speakWord(card.text, course);
      }
      return;
    }

    // If user clicks another card of the same type (same column), just switch active selection
    if (selectedCard.type === card.type) {
      setSelectedCard(card);
      if (card.type === 'target') {
        speakWord(card.text, course);
      }
      return;
    }

    // Second card clicked from opposite column: check if match
    const isPair = selectedCard.wordId === card.wordId;

    if (isPair) {
      // MATCH!
      sounds.playCorrect();
      const matchedWord = currentBatch.find((w) => w.id === card.wordId);
      if (matchedWord) {
        const textToSpeak = course === 'lv' ? matchedWord.lv : matchedWord.en;
        speakWord(textToSpeak, course);
        onRecordResult(matchedWord.id, true);
      }

      setCards((prev) =>
        prev.map((c) =>
          c.wordId === card.wordId ? { ...c, matched: true } : c
        )
      );
      setSelectedCard(null);

      const nextMatched = totalMatched + 1;
      setTotalMatched(nextMatched);

      // Check if all cards in current round are matched
      const remainingUnmatched = cards.filter(
        (c) => !c.matched && c.wordId !== card.wordId
      );

      if (remainingUnmatched.length === 0) {
        // Move to next round or finish
        setTimeout(() => {
          if (roundOffset + ROUND_SIZE < shuffledWords.length) {
            setRoundOffset((prev) => prev + ROUND_SIZE);
          } else {
            onComplete(nextMatched, shuffledWords.length);
          }
        }, 800);
      }
    } else {
      // MISMATCH!
      sounds.playWrong();
      setWrongCardIds([selectedCard.id, card.id]);
      if (selectedCard.wordId) {
        onRecordResult(selectedCard.wordId, false);
      }

      setTimeout(() => {
        setSelectedCard(null);
        setWrongCardIds([]);
      }, 900);
    }
  };

  const leftCards = cards.filter((c) => c.type === 'target');
  const rightCards = cards.filter((c) => c.type === 'trans');

  const renderCard = (card: MatchCard) => {
    const isSelected = selectedCard?.id === card.id;
    const isWrong = wrongCardIds.includes(card.id);

    let style = '';

    if (card.matched) {
      style =
        'bg-emerald-100 border-emerald-400 text-emerald-800 opacity-50 pointer-events-none scale-95';
    } else if (isWrong) {
      style = 'bg-rose-500 border-rose-600 text-white animate-wiggle';
    } else if (isSelected) {
      style =
        card.type === 'target'
          ? 'bg-sky-100 border-sky-500 text-sky-950 ring-4 ring-sky-300 scale-102 shadow-md'
          : 'bg-amber-100 border-amber-500 text-amber-950 ring-4 ring-amber-300 scale-102 shadow-md';
    } else if (card.type === 'target') {
      style =
        'bg-sky-50/70 border-sky-400 text-slate-800 hover:border-sky-500 hover:bg-sky-100/70 shadow-sm';
    } else {
      style =
        'bg-amber-50/70 border-amber-400 text-slate-800 hover:border-amber-500 hover:bg-amber-100/70 shadow-sm';
    }

    return (
      <button
        key={card.id}
        onClick={() => handleCardClick(card)}
        disabled={card.matched}
        className={`btn-3d w-full min-h-[58px] sm:min-h-[68px] p-2.5 sm:p-3.5 rounded-2xl sm:rounded-3xl border-3 sm:border-4 text-center font-bold text-sm sm:text-base shadow-sm transition-all flex items-center justify-center cursor-pointer select-none leading-snug ${style}`}
      >
        <span className="break-words max-w-full">{card.text}</span>
      </button>
    );
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 flex flex-col items-center">
      {/* Top bar */}
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
          <div className="px-3 py-1 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-emerald-700 font-black text-sm">
            {totalMatched} / {shuffledWords.length} {getWordsPlural(shuffledWords.length, language)}
          </div>
        </div>
      </div>

      <div className="text-center mb-4 sm:mb-5">
        <h2 className="text-2xl font-black text-slate-800">
          {t.modes.match}
        </h2>
        <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
          {course === 'lv'
            ? (language === 'lv' ? 'Atrodi pārus: latviešu vārds un tulkojums' : 'Найди пары: латышское слово и перевод')
            : t.matchPrompt}
        </p>
      </div>

      {/* 2 Columns: Left = Meaning (Target), Right = Translation */}
      <div className="w-full grid grid-cols-2 gap-3 sm:gap-6">
        {/* Left Column: Значение / Слово */}
        <div className="flex flex-col gap-2.5 sm:gap-3">
          <div className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-2xl bg-sky-100/80 border-2 border-sky-300 text-sky-800 text-xs sm:text-sm font-black shadow-xs">
            <span>{course === 'lv' ? '🇱🇻' : '🇬🇧'}</span>
            <span>
              {course === 'lv'
                ? 'Vārds (LV)'
                : language === 'lv'
                ? 'Vārds (EN)'
                : 'Значение (EN)'}
            </span>
          </div>
          {leftCards.map((card) => renderCard(card))}
        </div>

        {/* Right Column: Перевод */}
        <div className="flex flex-col gap-2.5 sm:gap-3">
          <div className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-2xl bg-amber-100/80 border-2 border-amber-300 text-amber-900 text-xs sm:text-sm font-black shadow-xs">
            <span>{course === 'lv' ? '🇷🇺' : language === 'ru' ? '🇷🇺' : '🇱🇻'}</span>
            <span>
              {course === 'lv'
                ? language === 'lv'
                  ? 'Tulkojums (RU)'
                  : 'Перевод (RU)'
                : language === 'lv'
                ? 'Tulkojums'
                : 'Перевод'}
            </span>
          </div>
          {rightCards.map((card) => renderCard(card))}
        </div>
      </div>
    </div>
  );
};
