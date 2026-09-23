import React, { useState, useEffect } from 'react';
import { Word } from '../types';
import { getWordImage } from '../utils/wordImages';

interface WordIllustrationProps {
  word?: Word | null;
  fallbackEmoji?: string;
  className?: string;
}

// Module-level caches
let loadedWordSvgs: Record<string, React.ReactNode> | null = null;
let loadedRuAliases: Record<string, string> | null = null;
let loadPromise: Promise<void> | null = null;

// Lightweight sets of known keys with custom SVG vector illustrations
const KNOWN_SVG_EN_KEYS = new Set([
  'desk', 'pencil sharpener', 'pencil case', 'rubber', 'glue', 'counters', 'doll',
  'skipping rope', 'sweater', 'shirt', 'jacket', 'skirt', 'curly hair', 'dark hair',
  'long hair', 'straight hair', 'wardrobe', 'bookcase', 'table', 'cushion', 'kitchen',
  'dining room', 'garden', 'root', 'plums', 'triangle', 'circle', 'square', 'rectangle',
  'oval', 'spring', 'summer', 'autumn', 'winter', 'tail', 'beak', 'between', 'next to',
  'in front of', 'behind', 'opposite', 'above', 'classroom', 'class', 'ruby', 'children',
  'week', 'water bottle', 'badge', 'puppet', 'colouring pens', 'xylophone', 'marbles',
  'blocks', 'spinning top', 'rocking horse', 'pyramid', 'rubber duck', 'tea set', 'bookshop',
]);

const KNOWN_SVG_RU_KEYS = new Set([
  'хвост', 'клюв', 'весна', 'лето', 'осень', 'зима', 'парта', 'точилка', 'пенал',
  'ластик', 'клей', 'фишки', 'кукла', 'скакалка', 'свитер', 'рубашка', 'куртка',
  'юбка', 'кудрявые волосы', 'темные волосы', 'тёмные волосы', 'длинные волосы',
  'прямые волосы', 'шкаф для одежды', 'книжный шкаф', 'стол', 'диванная подушка',
  'кухня', 'столовая', 'сад', 'корень', 'сливы', 'круг', 'квадрат', 'треугольник',
  'прямоугольник', 'овал', 'между', 'рядом с', 'перед', 'позади, за', 'позади', 'за',
  'напротив', 'над', 'классная комната', 'одноклассники', 'рубин', 'дети', 'неделя',
  'бутылка для воды', 'значок', 'кукла-марионетка', 'марионетка', 'фломастеры',
  'цветные карандаши', 'ксилофон', 'шарики марблс', 'марблс', 'кубики', 'юла',
  'волчок', 'лошадка-качалка', 'лошадка-качелька', 'пирамидка', 'резиновая уточка',
  'резиновые желтые уточки', 'чайный сервиз', 'книжный магазин',
]);

export function loadWordSvgs(): Promise<void> {
  if (!loadPromise) {
    loadPromise = import('../data/wordSvgs').then((mod) => {
      loadedWordSvgs = mod.WORD_SVGS;
      loadedRuAliases = mod.RU_ALIASES;
    });
  }
  return loadPromise;
}

// Background preload during idle time so it's ready before games open
if (typeof window !== 'undefined') {
  if ('requestIdleCallback' in window) {
    (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(() => {
      loadWordSvgs();
    });
  } else {
    setTimeout(loadWordSvgs, 2000);
  }
}

export const WordIllustration: React.FC<WordIllustrationProps> = ({
  word,
  fallbackEmoji,
  className = '',
}) => {
  const [, setLoaded] = useState(loadedWordSvgs !== null);

  if (!word) {
    return <span className={`select-none ${className}`}>{fallbackEmoji || '✨'}</span>;
  }

  const enKey = (word.en || '').toLowerCase().trim();
  const ruKey = (word.ru || '').toLowerCase().trim();
  const ruKeyNormalized = ruKey.replace(/ё/g, 'е');

  const mayHaveSvg =
    KNOWN_SVG_EN_KEYS.has(enKey) ||
    KNOWN_SVG_RU_KEYS.has(ruKey) ||
    KNOWN_SVG_RU_KEYS.has(ruKeyNormalized);

  useEffect(() => {
    if (mayHaveSvg && !loadedWordSvgs) {
      loadWordSvgs().then(() => setLoaded(true));
    }
  }, [mayHaveSvg]);

  let customSvg: React.ReactNode = null;
  if (loadedWordSvgs) {
    const targetKey =
      (loadedWordSvgs[enKey] && enKey) ||
      (loadedRuAliases && (loadedRuAliases[ruKey] || loadedRuAliases[ruKeyNormalized])) ||
      enKey;
    customSvg = loadedWordSvgs[targetKey];
  }

  const hasCustomSize = /\b(w-|h-)/.test(className);
  const sizeClasses = hasCustomSize ? '' : 'w-16 h-16 sm:w-20 sm:h-20';
  const textClasses = /\btext-/.test(className) ? '' : 'text-5xl sm:text-6xl';

  if (customSvg) {
    return (
      <div className={`flex items-center justify-center select-none ${sizeClasses} ${className}`}>
        {customSvg}
      </div>
    );
  }

  // Fallback to emoji
  const emoji = getWordImage(word, fallbackEmoji);
  return (
    <span className={`select-none flex items-center justify-center leading-none ${textClasses} ${className}`}>
      {emoji}
    </span>
  );
};
