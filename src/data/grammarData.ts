import { Grade } from '../types';

export type GrammarCategory = 'dialogues' | 'what_is_this' | 'have_got';

export interface GrammarQuestion {
  id: string;
  grade: Grade;
  category: GrammarCategory;
  // Prompt heading or question
  prompt: string;
  // Text to read when user clicks the speaker icon next to the question
  audioText: string;
  // Optional illustration info
  imageWord?: {
    en: string;
    emoji: string;
  };
  // Whether the picture represents negation ("haven't got" with a red cross ❌)
  isNegated?: boolean;
  // Options to choose from (typically 3)
  options: string[];
  // 0-indexed correct option
  correctIndex: number;
  // Optional hint/translation for adults or bilingual help
  hint?: {
    ru: string;
    lv: string;
  };
}

export interface GrammarTopic {
  id: string;
  grade: Grade;
  title: {
    ru: string;
    lv: string;
  };
  description: {
    ru: string;
    lv: string;
  };
  emoji: string;
  color: string; // Tailwind color key, e.g. 'emerald', 'sky', 'indigo'
  questions: GrammarQuestion[];
}

export const GRADE_1_GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: 'g1_dialogues',
    grade: 1,
    title: {
      ru: 'Вопросы и знакомство',
      lv: 'Jautājumi un iepazīšanās',
    },
    description: {
      ru: "What's your name? How are you? How old are you?",
      lv: "What's your name? How are you? How old are you?",
    },
    emoji: '💬',
    color: 'emerald',
    questions: [
      {
        id: 'g1_d_1',
        grade: 1,
        category: 'dialogues',
        prompt: "What's your name?",
        audioText: "What's your name?",
        options: [
          'My name is Anna.',
          "I'm seven.",
          "I'm fine, thank you.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Как тебя зовут? → Меня зовут Анна.',
          lv: 'Kā tevi sauc? → Mani sauc Anna.',
        },
      },
      {
        id: 'g1_d_2',
        grade: 1,
        category: 'dialogues',
        prompt: 'How are you?',
        audioText: 'How are you?',
        options: [
          'My name is Max.',
          "I'm fine, thank you.",
          "I'm eight.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Как дела? → Всё хорошо, спасибо.',
          lv: 'Kā tev klājas? → Labi, paldies.',
        },
      },
      {
        id: 'g1_d_3',
        grade: 1,
        category: 'dialogues',
        prompt: 'How old are you?',
        audioText: 'How old are you?',
        options: [
          "I'm seven.",
          'My name is Tom.',
          "I'm fine.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Сколько тебе лет? → Мне семь.',
          lv: 'Cik tev ir gadu? → Man ir septiņi gadi.',
        },
      },
      {
        id: 'g1_d_4',
        grade: 1,
        category: 'dialogues',
        prompt: "What's your name?",
        audioText: "What's your name?",
        options: [
          "I'm six.",
          "I'm fine, thanks.",
          'My name is Ben.',
        ],
        correctIndex: 2,
        hint: {
          ru: 'Как тебя зовут? → Меня зовут Бен.',
          lv: 'Kā tevi sauc? → Mani sauc Bens.',
        },
      },
      {
        id: 'g1_d_5',
        grade: 1,
        category: 'dialogues',
        prompt: 'How are you?',
        audioText: 'How are you?',
        options: [
          "I'm good, thanks!",
          "It's a cat.",
          "I'm seven.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Как дела? → Хорошо, спасибо!',
          lv: 'Kā tev klājas? → Labi, paldies!',
        },
      },
      {
        id: 'g1_d_6',
        grade: 1,
        category: 'dialogues',
        prompt: 'How old are you?',
        audioText: 'How old are you?',
        options: [
          'My name is Emma.',
          "I'm eight.",
          "It's a pencil.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Сколько тебе лет? → Мне восемь.',
          lv: 'Cik tev ir gadu? → Man ir astoņi gadi.',
        },
      },
      {
        id: 'g1_d_7',
        grade: 1,
        category: 'dialogues',
        prompt: 'How old are you?',
        audioText: 'How old are you?',
        options: [
          'My name is Sam.',
          "I'm fine, thank you.",
          "I'm six.",
        ],
        correctIndex: 2,
        hint: {
          ru: 'Сколько тебе лет? → Мне шесть.',
          lv: 'Cik tev ir gadu? → Man ir seši gadi.',
        },
      },
      {
        id: 'g1_d_8',
        grade: 1,
        category: 'dialogues',
        prompt: "What's your name?",
        audioText: "What's your name?",
        options: [
          'My name is Leo.',
          "I'm eight.",
          "It's a book.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Как тебя зовут? → Меня зовут Лео.',
          lv: 'Kā tevi sauc? → Mani sauc Leo.',
        },
      },
    ],
  },
  {
    id: 'g1_have_got_and_this',
    grade: 1,
    title: {
      ru: "I've got / I haven't got & What's this?",
      lv: "I've got / I haven't got & What's this?",
    },
    description: {
      ru: 'Что это? У меня есть / У меня нет предмета',
      lv: 'Kas tas ir? Man ir / Man nav priekšmeta',
    },
    emoji: '✏️',
    color: 'sky',
    questions: [
      {
        id: 'g1_hg_1',
        grade: 1,
        category: 'what_is_this',
        prompt: "What's this?",
        audioText: "What's this?",
        imageWord: { en: 'pencil', emoji: '✏️' },
        isNegated: false,
        options: [
          "It's a pencil.",
          "It's a ruler.",
          "It's an apple.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Что это? → Это карандаш.',
          lv: 'Kas tas ir? → Tas ir zīmulis.',
        },
      },
      {
        id: 'g1_hg_2',
        grade: 1,
        category: 'have_got',
        prompt: 'Choose the correct sentence:',
        audioText: "I have got a pencil.",
        imageWord: { en: 'pencil', emoji: '✏️' },
        isNegated: false,
        options: [
          "I've got a pencil.",
          "I haven't got a pencil.",
          "I've got a cat.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Карандаш есть → I\'ve got a pencil.',
          lv: 'Zīmulis ir → I\'ve got a pencil.',
        },
      },
      {
        id: 'g1_hg_3',
        grade: 1,
        category: 'have_got',
        prompt: 'Choose the correct sentence:',
        audioText: "I haven't got a pencil.",
        imageWord: { en: 'pencil', emoji: '✏️' },
        isNegated: true,
        options: [
          "I've got a pencil.",
          "I haven't got a pencil.",
          "I haven't got a book.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Карандаш перечёркнут (нет) → I haven\'t got a pencil.',
          lv: 'Zīmulis pārsvītrots (nav) → I haven\'t got a pencil.',
        },
      },
      {
        id: 'g1_hg_4',
        grade: 1,
        category: 'what_is_this',
        prompt: "What's this?",
        audioText: "What's this?",
        imageWord: { en: 'book', emoji: '📖' },
        isNegated: false,
        options: [
          "It's a pen.",
          "It's a book.",
          "It's a car.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Что это? → Это книга.',
          lv: 'Kas tas ir? → Tā ir grāmata.',
        },
      },
      {
        id: 'g1_hg_5',
        grade: 1,
        category: 'have_got',
        prompt: 'Choose the correct sentence:',
        audioText: "I've got a book.",
        imageWord: { en: 'book', emoji: '📖' },
        isNegated: false,
        options: [
          "I haven't got a book.",
          "I've got a ruler.",
          "I've got a book.",
        ],
        correctIndex: 2,
        hint: {
          ru: 'Книга есть → I\'ve got a book.',
          lv: 'Grāmata ir → I\'ve got a book.',
        },
      },
      {
        id: 'g1_hg_6',
        grade: 1,
        category: 'have_got',
        prompt: 'Choose the correct sentence:',
        audioText: "I haven't got a book.",
        imageWord: { en: 'book', emoji: '📖' },
        isNegated: true,
        options: [
          "I haven't got a book.",
          "I've got a book.",
          "I haven't got a car.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Книга перечёркнута (нет) → I haven\'t got a book.',
          lv: 'Grāmata pārsvītrota (nav) → I haven\'t got a book.',
        },
      },
      {
        id: 'g1_hg_7',
        grade: 1,
        category: 'what_is_this',
        prompt: "What's this?",
        audioText: "What's this?",
        imageWord: { en: 'cat', emoji: '🐱' },
        isNegated: false,
        options: [
          "It's a dog.",
          "It's a ball.",
          "It's a cat.",
        ],
        correctIndex: 2,
        hint: {
          ru: 'Что это? → Это кот.',
          lv: 'Kas tas ir? → Tas ir kaķis.',
        },
      },
      {
        id: 'g1_hg_8',
        grade: 1,
        category: 'have_got',
        prompt: 'Choose the correct sentence:',
        audioText: "I've got a cat.",
        imageWord: { en: 'cat', emoji: '🐱' },
        isNegated: false,
        options: [
          "I've got a cat.",
          "I haven't got a cat.",
          "I've got a dog.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Кот есть → I\'ve got a cat.',
          lv: 'Kaķis ir → I\'ve got a cat.',
        },
      },
      {
        id: 'g1_hg_9',
        grade: 1,
        category: 'have_got',
        prompt: 'Choose the correct sentence:',
        audioText: "I haven't got a cat.",
        imageWord: { en: 'cat', emoji: '🐱' },
        isNegated: true,
        options: [
          "I've got a cat.",
          "I haven't got a cat.",
          "I haven't got a ball.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Кот перечёркнут (нет) → I haven\'t got a cat.',
          lv: 'Kaķis pārsvītrots (nav) → I haven\'t got a cat.',
        },
      },
      {
        id: 'g1_hg_10',
        grade: 1,
        category: 'what_is_this',
        prompt: "What's this?",
        audioText: "What's this?",
        imageWord: { en: 'ball', emoji: '⚽' },
        isNegated: false,
        options: [
          "It's a ball.",
          "It's a pencil.",
          "It's a book.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Что это? → Это мяч.',
          lv: 'Kas tas ir? → Tā ir bumba.',
        },
      },
      {
        id: 'g1_hg_11',
        grade: 1,
        category: 'have_got',
        prompt: 'Choose the correct sentence:',
        audioText: "I've got a ball.",
        imageWord: { en: 'ball', emoji: '⚽' },
        isNegated: false,
        options: [
          "I haven't got a ball.",
          "I've got a ball.",
          "I've got a car.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Мяч есть → I\'ve got a ball.',
          lv: 'Bumba ir → I\'ve got a ball.',
        },
      },
      {
        id: 'g1_hg_12',
        grade: 1,
        category: 'have_got',
        prompt: 'Choose the correct sentence:',
        audioText: "I haven't got a ball.",
        imageWord: { en: 'ball', emoji: '⚽' },
        isNegated: true,
        options: [
          "I've got a ball.",
          "I haven't got a ball.",
          "I haven't got a pencil.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Мяч перечёркнут (нет) → I haven\'t got a ball.',
          lv: 'Bumba pārsvītrota (nav) → I haven\'t got a ball.',
        },
      },
    ],
  },
  {
    id: 'g1_mix',
    grade: 1,
    title: {
      ru: 'Все задания 1 класса (Микс)',
      lv: 'Visi 1. klases uzdevumi (Mikss)',
    },
    description: {
      ru: 'Диалоги, вопросы и предложения в случайном порядке',
      lv: 'Dialogi, jautājumi un teikumi jauktā secībā',
    },
    emoji: '🎯',
    color: 'amber',
    questions: [], // Populated dynamically or combines topics
  },
];

// Helper to get questions for topic, handling mix
export function getQuestionsForGrammarTopic(topic: GrammarTopic): GrammarQuestion[] {
  if (topic.id === 'g1_mix') {
    const all = [
      ...GRADE_1_GRAMMAR_TOPICS[0].questions,
      ...GRADE_1_GRAMMAR_TOPICS[1].questions,
    ];
    // Return shuffled subset of 10
    return [...all].sort(() => Math.random() - 0.5).slice(0, 10);
  }
  return topic.questions;
}
