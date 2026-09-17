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

    const shuffled = shuffleArray([...targetCards, ...transCards]);
    setCards(shuffled);
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

    // Second card clicked: check if match
    const isPair =
      selectedCard.wordId === card.wordId && selectedCard.type !== card.type;

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

      <div className="text-center mb-5">
        <h2 className="text-2xl font-black text-slate-800">
          {t.modes.match}
        </h2>
        <p className="text-sm font-semibold text-slate-500 mt-1">
          {course === 'lv'
            ? (language === 'lv' ? 'Atrodi pārus: latviešu vārds un tulkojums' : 'Найди пары: латышское слово и перевод')
            : t.matchPrompt}
        </p>

        {/* Visual Color Legend for Kids */}
        <div className="flex items-center justify-center gap-3 mt-2.5 text-xs font-bold">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-sky-50 border-2 border-sky-400 text-sky-700 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
            {course === 'lv'
              ? (language === 'lv' ? 'Vārds (LV)' : 'Слово (LV)')
              : (language === 'lv' ? 'Vārds (EN)' : 'Слово (EN)')}
          </span>
          <span className="text-slate-300 font-black">↔</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 border-2 border-amber-400 text-amber-800 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            {language === 'lv' ? 'Tulkojums' : 'Перевод'}
          </span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3">
        {cards.map((card) => {
          const isSelected = selectedCard?.id === card.id;
          const isWrong = wrongCardIds.includes(card.id);

          let style = '';

          if (card.matched) {
            style = 'bg-emerald-100 border-emerald-400 text-emerald-800 opacity-60 pointer-events-none scale-95';
          } else if (isWrong) {
            style = 'bg-rose-500 border-rose-600 text-white animate-wiggle';
          } else if (isSelected) {
            style =
              card.type === 'target'
                ? 'bg-sky-100 border-sky-500 text-sky-950 ring-4 ring-sky-200 scale-102 shadow-md'
                : 'bg-amber-100 border-amber-500 text-amber-950 ring-4 ring-amber-200 scale-102 shadow-md';
          } else if (card.type === 'target') {
            style =
              'bg-sky-50/70 border-sky-400 text-slate-800 hover:border-sky-500 hover:bg-sky-100/70 shadow-sm';
          } else {
            style =
              'bg-amber-50/70 border-amber-400 text-slate-800 hover:border-amber-500 hover:bg-amber-100/70 shadow-sm';
          }

          const badgeStyle = card.matched
            ? 'text-emerald-700 bg-emerald-200/60'
            : isWrong
            ? 'text-rose-100 bg-rose-600/60'
            : isSelected
            ? card.type === 'target'
              ? 'text-sky-700 bg-sky-200/80'
              : 'text-amber-800 bg-amber-200/80'
            : card.type === 'target'
            ? 'text-sky-700 bg-sky-100'
            : 'text-amber-800 bg-amber-100';

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              disabled={card.matched}
              className={`btn-3d min-h-[96px] sm:min-h-[104px] p-3 rounded-3xl border-4 text-center font-bold text-base sm:text-lg shadow-md transition-all flex flex-col items-center justify-center ${style}`}
            >
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1 ${badgeStyle}`}
              >
                {card.type === 'target'
                  ? (course === 'lv' ? '🇱🇻 LV' : '🇬🇧 EN')
                  : (course === 'lv' ? '🇷🇺 RU' : (language === 'ru' ? '🇷🇺 RU' : '🇱🇻 LV'))}
              </span>
              <span className="leading-snug">{card.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
