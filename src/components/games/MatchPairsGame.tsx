import React, { useState, useEffect } from 'react';
import { Topic, Language } from '../../types';
import { speakEnglish } from '../../utils/speech';
import { sounds } from '../../utils/soundEffects';
import { translations, getWordsPlural } from '../../utils/i18n';
import { ArrowLeft } from 'lucide-react';

interface MatchPairsGameProps {
  topic: Topic;
  language: Language;
  onRecordResult: (wordId: string, isCorrect: boolean) => void;
  onComplete: (correctCount: number, totalCount: number) => void;
  onBack: () => void;
}

interface MatchCard {
  id: string; // unique card id
  wordId: string;
  text: string;
  type: 'en' | 'trans';
  matched: boolean;
}

export const MatchPairsGame: React.FC<MatchPairsGameProps> = ({
  topic,
  language,
  onRecordResult,
  onComplete,
  onBack,
}) => {
  const t = translations[language];
  const [roundOffset, setRoundOffset] = useState(0);
  const [cards, setCards] = useState<MatchCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<MatchCard | null>(null);
  const [wrongCardIds, setWrongCardIds] = useState<string[]>([]);
  const [totalMatched, setTotalMatched] = useState(0);

  const ROUND_SIZE = 4;
  const currentBatch = topic.words.slice(roundOffset, roundOffset + ROUND_SIZE);

  useEffect(() => {
    if (currentBatch.length === 0) return;

    const enCards: MatchCard[] = currentBatch.map((w) => ({
      id: `en-${w.id}`,
      wordId: w.id,
      text: w.en,
      type: 'en',
      matched: false,
    }));

    const transCards: MatchCard[] = currentBatch.map((w) => ({
      id: `trans-${w.id}`,
      wordId: w.id,
      text: w[language] || w.ru || w.lv,
      type: 'trans',
      matched: false,
    }));

    const shuffled = [...enCards, ...transCards].sort(() => 0.5 - Math.random());
    setCards(shuffled);
    setSelectedCard(null);
    setWrongCardIds([]);
  }, [roundOffset]);

  const handleCardClick = (card: MatchCard) => {
    if (card.matched || wrongCardIds.length > 0) return;
    if (selectedCard && selectedCard.id === card.id) return;

    sounds.playClick();

    if (!selectedCard) {
      // First card clicked
      setSelectedCard(card);
      if (card.type === 'en') {
        speakEnglish(card.text);
      }
      return;
    }

    // Second card clicked: check if match
    const isPair =
      selectedCard.wordId === card.wordId && selectedCard.type !== card.type;

    if (isPair) {
      // MATCH!
      sounds.playCorrect();
      const matchedWord = currentBatch.find((w) => w.id === card.wordId);
      if (matchedWord) {
        speakEnglish(matchedWord.en);
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
          if (roundOffset + ROUND_SIZE < topic.words.length) {
            setRoundOffset((prev) => prev + ROUND_SIZE);
          } else {
            onComplete(nextMatched, topic.words.length);
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
            {totalMatched} / {topic.words.length} {getWordsPlural(topic.words.length, language)}
          </div>
        </div>
      </div>

      <div className="text-center mb-5">
        <h2 className="text-2xl font-black text-slate-800">
          {t.modes.match}
        </h2>
        <p className="text-sm font-semibold text-slate-500 mt-1">
          {t.matchPrompt}
        </p>
      </div>

      {/* Cards Grid */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3">
        {cards.map((card) => {
          const isSelected = selectedCard?.id === card.id;
          const isWrong = wrongCardIds.includes(card.id);

          let style = 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300';

          if (card.matched) {
            style = 'bg-emerald-100 border-emerald-400 text-emerald-800 opacity-60 pointer-events-none scale-95';
          } else if (isWrong) {
            style = 'bg-rose-500 border-rose-600 text-white animate-wiggle';
          } else if (isSelected) {
            style = 'bg-indigo-50 border-indigo-500 text-indigo-700 ring-4 ring-indigo-200 scale-102';
          }

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              disabled={card.matched}
              className={`btn-3d min-h-[96px] sm:min-h-[104px] p-3 rounded-3xl border-4 text-center font-bold text-base sm:text-lg shadow-md transition-all flex flex-col items-center justify-center ${style}`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                {card.type === 'en' ? '🇬🇧 EN' : language === 'ru' ? '🇷🇺 RU' : '🇱🇻 LV'}
              </span>
              <span className="leading-snug">{card.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
