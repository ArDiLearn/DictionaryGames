import { speakEnglish, stopSpeech } from '../utils/speech';

export interface AlphabetLetter {
  letter: string;       // e.g. 'A'
  display: string;      // e.g. 'Aa'
  transcription: string;// e.g. '[ eɪ ]'
  tts: string;          // Phonetic string for 100% reliable TTS pronunciation: 'ay'
  example: {
    en: string;         // 'apple'
    ru: string;         // 'яблоко'
    lv: string;         // 'ābols'
    emoji: string;      // '🍎'
  };
  color: {
    bg: string;
    border: string;
    text: string;
    badge: string;
  };
}

export const ALPHABET_LETTERS: AlphabetLetter[] = [
  {
    letter: 'A',
    display: 'Aa',
    transcription: '[ eɪ ]',
    tts: 'A.',
    example: { en: 'apple', ru: 'яблоко', lv: 'ābols', emoji: '🍎' },
    color: { bg: 'bg-rose-50', border: 'border-rose-300 hover:border-rose-400', text: 'text-rose-700', badge: 'bg-rose-100 text-rose-800 border-rose-200' },
  },
  {
    letter: 'B',
    display: 'Bb',
    transcription: '[ biː ]',
    tts: 'bee',
    example: { en: 'bear', ru: 'медведь', lv: 'lācis', emoji: '🐻' },
    color: { bg: 'bg-amber-50', border: 'border-amber-300 hover:border-amber-400', text: 'text-amber-800', badge: 'bg-amber-100 text-amber-800 border-amber-200' },
  },
  {
    letter: 'C',
    display: 'Cc',
    transcription: '[ siː ]',
    tts: 'see',
    example: { en: 'cat', ru: 'кот', lv: 'kaķis', emoji: '🐱' },
    color: { bg: 'bg-orange-50', border: 'border-orange-300 hover:border-orange-400', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-800 border-orange-200' },
  },
  {
    letter: 'D',
    display: 'Dd',
    transcription: '[ diː ]',
    tts: 'dee',
    example: { en: 'dog', ru: 'собака', lv: 'suns', emoji: '🐶' },
    color: { bg: 'bg-blue-50', border: 'border-blue-300 hover:border-blue-400', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-800 border-blue-200' },
  },
  {
    letter: 'E',
    display: 'Ee',
    transcription: '[ iː ]',
    tts: 'E.',
    example: { en: 'elephant', ru: 'слон', lv: 'zilonis', emoji: '🐘' },
    color: { bg: 'bg-emerald-50', border: 'border-emerald-300 hover:border-emerald-400', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  },
  {
    letter: 'F',
    display: 'Ff',
    transcription: '[ ef ]',
    tts: 'eff',
    example: { en: 'fish', ru: 'рыба', lv: 'zivs', emoji: '🐟' },
    color: { bg: 'bg-teal-50', border: 'border-teal-300 hover:border-teal-400', text: 'text-teal-700', badge: 'bg-teal-100 text-teal-800 border-teal-200' },
  },
  {
    letter: 'G',
    display: 'Gg',
    transcription: '[ dʒiː ]',
    tts: 'jee',
    example: { en: 'giraffe', ru: 'жираф', lv: 'žirafe', emoji: '🦒' },
    color: { bg: 'bg-lime-50', border: 'border-lime-300 hover:border-lime-400', text: 'text-lime-800', badge: 'bg-lime-100 text-lime-800 border-lime-200' },
  },
  {
    letter: 'H',
    display: 'Hh',
    transcription: '[ eɪtʃ ]',
    tts: 'aitch',
    example: { en: 'house', ru: 'дом', lv: 'māja', emoji: '🏠' },
    color: { bg: 'bg-purple-50', border: 'border-purple-300 hover:border-purple-400', text: 'text-purple-700', badge: 'bg-purple-100 text-purple-800 border-purple-200' },
  },
  {
    letter: 'I',
    display: 'Ii',
    transcription: '[ aɪ ]',
    tts: 'eye',
    example: { en: 'ice cream', ru: 'мороженое', lv: 'saldējums', emoji: '🍦' },
    color: { bg: 'bg-pink-50', border: 'border-pink-300 hover:border-pink-400', text: 'text-pink-700', badge: 'bg-pink-100 text-pink-800 border-pink-200' },
  },
  {
    letter: 'J',
    display: 'Jj',
    transcription: '[ dʒeɪ ]',
    tts: 'jay',
    example: { en: 'juice', ru: 'сок', lv: 'sula', emoji: '🧃' },
    color: { bg: 'bg-amber-50', border: 'border-amber-300 hover:border-amber-400', text: 'text-amber-800', badge: 'bg-amber-100 text-amber-800 border-amber-200' },
  },
  {
    letter: 'K',
    display: 'Kk',
    transcription: '[ keɪ ]',
    tts: 'kay',
    example: { en: 'kite', ru: 'воздушный змей', lv: 'pūķis', emoji: '🪁' },
    color: { bg: 'bg-sky-50', border: 'border-sky-300 hover:border-sky-400', text: 'text-sky-700', badge: 'bg-sky-100 text-sky-800 border-sky-200' },
  },
  {
    letter: 'L',
    display: 'Ll',
    transcription: '[ el ]',
    tts: 'el',
    example: { en: 'lion', ru: 'лев', lv: 'lauva', emoji: '🦁' },
    color: { bg: 'bg-yellow-50', border: 'border-yellow-300 hover:border-yellow-400', text: 'text-yellow-800', badge: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  },
  {
    letter: 'M',
    display: 'Mm',
    transcription: '[ em ]',
    tts: 'em',
    example: { en: 'monkey', ru: 'обезьяна', lv: 'mērkaķis', emoji: '🐒' },
    color: { bg: 'bg-stone-50', border: 'border-stone-300 hover:border-stone-400', text: 'text-stone-700', badge: 'bg-stone-100 text-stone-800 border-stone-200' },
  },
  {
    letter: 'N',
    display: 'Nn',
    transcription: '[ en ]',
    tts: 'en',
    example: { en: 'nose', ru: 'нос', lv: 'deguns', emoji: '👃' },
    color: { bg: 'bg-cyan-50', border: 'border-cyan-300 hover:border-cyan-400', text: 'text-cyan-700', badge: 'bg-cyan-100 text-cyan-800 border-cyan-200' },
  },
  {
    letter: 'O',
    display: 'Oo',
    transcription: '[ əʊ ]',
    tts: 'oh',
    example: { en: 'orange', ru: 'апельсин', lv: 'apelsīns', emoji: '🍊' },
    color: { bg: 'bg-orange-50', border: 'border-orange-300 hover:border-orange-400', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-800 border-orange-200' },
  },
  {
    letter: 'P',
    display: 'Pp',
    transcription: '[ piː ]',
    tts: 'pee',
    example: { en: 'penguin', ru: 'пингвин', lv: 'pingvīns', emoji: '🐧' },
    color: { bg: 'bg-indigo-50', border: 'border-indigo-300 hover:border-indigo-400', text: 'text-indigo-700', badge: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  },
  {
    letter: 'Q',
    display: 'Qq',
    transcription: '[ kjuː ]',
    tts: 'cue',
    example: { en: 'queen', ru: 'королева', lv: 'karaliene', emoji: '👑' },
    color: { bg: 'bg-violet-50', border: 'border-violet-300 hover:border-violet-400', text: 'text-violet-700', badge: 'bg-violet-100 text-violet-800 border-violet-200' },
  },
  {
    letter: 'R',
    display: 'Rr',
    transcription: '[ ɑː ]',
    tts: 'are',
    example: { en: 'rabbit', ru: 'кролик', lv: 'trusis', emoji: '🐰' },
    color: { bg: 'bg-rose-50', border: 'border-rose-300 hover:border-rose-400', text: 'text-rose-700', badge: 'bg-rose-100 text-rose-800 border-rose-200' },
  },
  {
    letter: 'S',
    display: 'Ss',
    transcription: '[ es ]',
    tts: 'ess',
    example: { en: 'sun', ru: 'солнце', lv: 'saule', emoji: '☀️' },
    color: { bg: 'bg-amber-50', border: 'border-amber-300 hover:border-amber-400', text: 'text-amber-800', badge: 'bg-amber-100 text-amber-800 border-amber-200' },
  },
  {
    letter: 'T',
    display: 'Tt',
    transcription: '[ tiː ]',
    tts: 'tee',
    example: { en: 'tiger', ru: 'тигр', lv: 'tīģeris', emoji: '🐯' },
    color: { bg: 'bg-emerald-50', border: 'border-emerald-300 hover:border-emerald-400', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  },
  {
    letter: 'U',
    display: 'Uu',
    transcription: '[ juː ]',
    tts: 'you',
    example: { en: 'umbrella', ru: 'зонт', lv: 'lietussargs', emoji: '☂️' },
    color: { bg: 'bg-blue-50', border: 'border-blue-300 hover:border-blue-400', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-800 border-blue-200' },
  },
  {
    letter: 'V',
    display: 'Vv',
    transcription: '[ viː ]',
    tts: 'vee',
    example: { en: 'van', ru: 'фургон', lv: 'furgons', emoji: '🚐' },
    color: { bg: 'bg-teal-50', border: 'border-teal-300 hover:border-teal-400', text: 'text-teal-700', badge: 'bg-teal-100 text-teal-800 border-teal-200' },
  },
  {
    letter: 'W',
    display: 'Ww',
    transcription: '[ ˈdʌbljuː ]',
    tts: 'double you',
    example: { en: 'wolf', ru: 'волк', lv: 'vilks', emoji: '🐺' },
    color: { bg: 'bg-slate-50', border: 'border-slate-300 hover:border-slate-400', text: 'text-slate-700', badge: 'bg-slate-100 text-slate-800 border-slate-200' },
  },
  {
    letter: 'X',
    display: 'Xx',
    transcription: '[ eks ]',
    tts: 'ex',
    example: { en: 'box', ru: 'коробка', lv: 'kaste', emoji: '📦' },
    color: { bg: 'bg-fuchsia-50', border: 'border-fuchsia-300 hover:border-fuchsia-400', text: 'text-fuchsia-700', badge: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200' },
  },
  {
    letter: 'Y',
    display: 'Yy',
    transcription: '[ waɪ ]',
    tts: 'why',
    example: { en: 'yacht', ru: 'яхта', lv: 'jahta', emoji: '🛥️' },
    color: { bg: 'bg-sky-50', border: 'border-sky-300 hover:border-sky-400', text: 'text-sky-700', badge: 'bg-sky-100 text-sky-800 border-sky-200' },
  },
  {
    letter: 'Z',
    display: 'Zz',
    transcription: '[ zed ]',
    tts: 'zed',
    example: { en: 'zebra', ru: 'зебра', lv: 'zebra', emoji: '🦓' },
    color: { bg: 'bg-emerald-50', border: 'border-emerald-300 hover:border-emerald-400', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  },
];

/**
 * Pronounce an English letter name reliably using phonetic spelling.
 */
export function speakLetter(
  letterObj: AlphabetLetter,
  rate = 0.85,
  withWord = false,
  onStart?: () => void,
  onEnd?: () => void
): boolean {
  stopSpeech();
  const baseTts = letterObj.tts.trim();
  const textToSpeak = withWord
    ? `${baseTts.replace(/\.+$/, '')}. ${letterObj.example.en}.`
    : (baseTts.endsWith('.') ? baseTts : `${baseTts}.`);
  return speakEnglish(textToSpeak, rate, onStart, onEnd);
}

/**
 * Pronounce just the example word.
 */
export function speakLetterWord(
  letterObj: AlphabetLetter,
  rate = 0.85,
  onStart?: () => void,
  onEnd?: () => void
): boolean {
  stopSpeech();
  return speakEnglish(letterObj.example.en, rate, onStart, onEnd);
}
