import { Grade } from '../types';

export type GrammarCategory =
  | 'dialogues'
  | 'what_is_this'
  | 'have_got'
  | 'family'
  | 'descriptions'
  | 'have_you_got'
  | 'can'
  | 'likes'
  | 'colors_and_plurals';

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
    secondEmoji?: string;
    customLabel?: string;
  };
  // Whether the picture represents negation with a red cross ❌
  isNegated?: boolean;
  badgeType?: 'have' | 'can' | 'like' | 'none';
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
  color: string; // Tailwind color key, e.g. 'emerald', 'sky', 'indigo', 'purple', 'teal'
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
          "I'm fine, thank you.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Сколько тебе лет? → Мне семь лет.',
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
          'My name is Ben.',
          'Good morning!',
        ],
        correctIndex: 1,
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
          'My name is Mia.',
          "I'm seven.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Как поживаешь? → Хорошо, спасибо!',
          lv: 'Kā iet? → Labi, paldies!',
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
        audioText: 'I have got a pencil.',
        imageWord: { en: 'pencil', emoji: '✏️' },
        isNegated: false,
        badgeType: 'have',
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
        badgeType: 'have',
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
          "It's a bag.",
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
        audioText: 'I have got a book.',
        imageWord: { en: 'book', emoji: '📖' },
        isNegated: false,
        badgeType: 'have',
        options: [
          "I haven't got a book.",
          "I've got a book.",
          "I've got a pen.",
        ],
        correctIndex: 1,
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
        badgeType: 'have',
        options: [
          "I've got a book.",
          "I haven't got a rubber.",
          "I haven't got a book.",
        ],
        correctIndex: 2,
        hint: {
          ru: 'Книги нет → I haven\'t got a book.',
          lv: 'Grāmatas nav → I haven\'t got a book.',
        },
      },
      {
        id: 'g1_hg_7',
        grade: 1,
        category: 'what_is_this',
        prompt: "What's this?",
        audioText: "What's this?",
        imageWord: { en: 'car', emoji: '🚗' },
        isNegated: false,
        options: [
          "It's a plane.",
          "It's a bike.",
          "It's a car.",
        ],
        correctIndex: 2,
        hint: {
          ru: 'Что это? → Это машинка.',
          lv: 'Kas tas ir? → Tā ir mašīna.',
        },
      },
      {
        id: 'g1_hg_8',
        grade: 1,
        category: 'have_got',
        prompt: 'Choose the correct sentence:',
        audioText: 'I have got a car.',
        imageWord: { en: 'car', emoji: '🚗' },
        isNegated: false,
        badgeType: 'have',
        options: [
          "I've got a car.",
          "I haven't got a car.",
          "I've got a train.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Машинка есть → I\'ve got a car.',
          lv: 'Mašīna ir → I\'ve got a car.',
        },
      },
      {
        id: 'g1_hg_9',
        grade: 1,
        category: 'have_got',
        prompt: 'Choose the correct sentence:',
        audioText: "I haven't got a car.",
        imageWord: { en: 'car', emoji: '🚗' },
        isNegated: true,
        badgeType: 'have',
        options: [
          "I've got a car.",
          "I haven't got a car.",
          "I haven't got a bike.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Машинки нет → I haven\'t got a car.',
          lv: 'Mašīnas nav → I haven\'t got a car.',
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
          "It's a doll.",
          "It's a robot.",
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
        badgeType: 'have',
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
        badgeType: 'have',
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
    id: 'g1_family_and_descriptions',
    grade: 1,
    title: {
      ru: "Who's this? & He's / She's",
      lv: "Who's this? & He's / She's",
    },
    description: {
      ru: "Кто это? (This is my mum). Он / Она (He's short / She's tall)",
      lv: "Kas tas ir? (This is my mum). Viņš / Viņa (He's short / She's tall)",
    },
    emoji: '👨‍👩‍👧',
    color: 'purple',
    questions: [
      {
        id: 'g1_fd_1',
        grade: 1,
        category: 'family',
        prompt: "Who's this?",
        audioText: "Who's this?",
        imageWord: { en: 'mum', emoji: '👩', customLabel: 'Mum' },
        options: [
          'This is my mum.',
          'This is my dad.',
          'This is my brother.',
        ],
        correctIndex: 0,
        hint: {
          ru: 'Кто это? → Это моя мама.',
          lv: 'Kas tas ir? → Šī ir mana mamma.',
        },
      },
      {
        id: 'g1_fd_2',
        grade: 1,
        category: 'family',
        prompt: "Who's this?",
        audioText: "Who's this?",
        imageWord: { en: 'dad', emoji: '👨', customLabel: 'Dad' },
        options: [
          'This is my sister.',
          'This is my dad.',
          'This is my grandma.',
        ],
        correctIndex: 1,
        hint: {
          ru: 'Кто это? → Это мой папа.',
          lv: 'Kas tas ir? → Šis ir mans tētis.',
        },
      },
      {
        id: 'g1_fd_3',
        grade: 1,
        category: 'family',
        prompt: "Who's this?",
        audioText: "Who's this?",
        imageWord: { en: 'sister', emoji: '👧', customLabel: 'Sister' },
        options: [
          'This is my brother.',
          'This is my mum.',
          'This is my sister.',
        ],
        correctIndex: 2,
        hint: {
          ru: 'Кто это? → Это моя сестра.',
          lv: 'Kas tas ir? → Šī ir mana māsa.',
        },
      },
      {
        id: 'g1_fd_4',
        grade: 1,
        category: 'family',
        prompt: "Who's this?",
        audioText: "Who's this?",
        imageWord: { en: 'brother', emoji: '👦', customLabel: 'Brother' },
        options: [
          'This is my brother.',
          'This is my dad.',
          'This is my grandpa.',
        ],
        correctIndex: 0,
        hint: {
          ru: 'Кто это? → Это мой брат.',
          lv: 'Kas tas ir? → Šis ir mans brālis.',
        },
      },
      {
        id: 'g1_fd_5',
        grade: 1,
        category: 'family',
        prompt: "Who's this?",
        audioText: "Who's this?",
        imageWord: { en: 'grandma', emoji: '👵', customLabel: 'Grandma' },
        options: [
          'This is my mum.',
          'This is my grandma.',
          'This is my sister.',
        ],
        correctIndex: 1,
        hint: {
          ru: 'Кто это? → Это моя бабушка.',
          lv: 'Kas tas ir? → Šī ir mana vecmāmiņa.',
        },
      },
      {
        id: 'g1_fd_6',
        grade: 1,
        category: 'family',
        prompt: "Who's this?",
        audioText: "Who's this?",
        imageWord: { en: 'grandpa', emoji: '👴', customLabel: 'Grandpa' },
        options: [
          'This is my brother.',
          'This is my dad.',
          'This is my grandpa.',
        ],
        correctIndex: 2,
        hint: {
          ru: 'Кто это? → Это мой дедушка.',
          lv: 'Kas tas ir? → Šis ir mans vectētiņš.',
        },
      },
      {
        id: 'g1_fd_7',
        grade: 1,
        category: 'descriptions',
        prompt: 'Look at the boy:',
        audioText: "He's short.",
        imageWord: { en: 'boy', emoji: '👦', customLabel: 'Short boy 📏' },
        options: [
          "He's short.",
          "She's tall.",
          "He's tall.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Мальчик невысокого роста → He\'s short.',
          lv: 'Zēns ir maza auguma → He\'s short.',
        },
      },
      {
        id: 'g1_fd_8',
        grade: 1,
        category: 'descriptions',
        prompt: 'Look at the girl:',
        audioText: "She's tall.",
        imageWord: { en: 'girl', emoji: '👧', customLabel: 'Tall girl 🦒' },
        options: [
          "He's short.",
          "She's tall.",
          "She's short.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Девочка высокого роста → She\'s tall.',
          lv: 'Meitene ir gara auguma → She\'s tall.',
        },
      },
      {
        id: 'g1_fd_9',
        grade: 1,
        category: 'descriptions',
        prompt: 'Look at the boy:',
        audioText: "He's tall.",
        imageWord: { en: 'boy', emoji: '👦', customLabel: 'Tall boy 🦒' },
        options: [
          "He's tall.",
          "She's tall.",
          "He's short.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Мальчик высокого роста → He\'s tall.',
          lv: 'Zēns ir gara auguma → He\'s tall.',
        },
      },
      {
        id: 'g1_fd_10',
        grade: 1,
        category: 'descriptions',
        prompt: 'Look at the girl:',
        audioText: "She's short.",
        imageWord: { en: 'girl', emoji: '👧', customLabel: 'Short girl 📏' },
        options: [
          "He's tall.",
          "She's short.",
          "He's short.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Девочка невысокого роста → She\'s short.',
          lv: 'Meitene ir maza auguma → She\'s short.',
        },
      },
      {
        id: 'g1_fd_11',
        grade: 1,
        category: 'descriptions',
        prompt: 'How does he feel?',
        audioText: "He's happy.",
        imageWord: { en: 'happy', emoji: '😄', customLabel: 'Happy' },
        options: [
          "He's happy.",
          "She's sad.",
          "He's sad.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Он весёлый/радостный → He\'s happy.',
          lv: 'Viņš ir priecīgs → He\'s happy.',
        },
      },
      {
        id: 'g1_fd_12',
        grade: 1,
        category: 'descriptions',
        prompt: 'How does she feel?',
        audioText: "She's sad.",
        imageWord: { en: 'sad', emoji: '😢', customLabel: 'Sad' },
        options: [
          "He's happy.",
          "She's sad.",
          "She's happy.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Она грустная → She\'s sad.',
          lv: 'Viņa ir bēdīga → She\'s sad.',
        },
      },
    ],
  },
  {
    id: 'g1_have_you_got_and_can',
    grade: 1,
    title: {
      ru: 'Have you got? & I can / I can\'t',
      lv: 'Have you got? & I can / I can\'t',
    },
    description: {
      ru: 'Вопросы о наличии (Yes, I have / No, I haven\'t) и умения (I can / I can\'t)',
      lv: 'Jautājumi (Yes, I have / No, I haven\'t) un prasmes (I can / I can\'t)',
    },
    emoji: '🤸',
    color: 'sky',
    questions: [
      {
        id: 'g1_hyg_1',
        grade: 1,
        category: 'have_you_got',
        prompt: 'Have you got a bike?',
        audioText: 'Have you got a bike?',
        imageWord: { en: 'bike', emoji: '🚲' },
        isNegated: false,
        badgeType: 'have',
        options: [
          'Yes, I have.',
          "No, I haven't.",
          'Yes, I can.',
        ],
        correctIndex: 0,
        hint: {
          ru: 'Велосипед есть (✓) → Yes, I have.',
          lv: 'Velosipēds ir (✓) → Yes, I have.',
        },
      },
      {
        id: 'g1_hyg_2',
        grade: 1,
        category: 'have_you_got',
        prompt: 'Have you got a kite?',
        audioText: 'Have you got a kite?',
        imageWord: { en: 'kite', emoji: '🪁' },
        isNegated: true,
        badgeType: 'have',
        options: [
          'Yes, I have.',
          "No, I haven't.",
          "No, I can't.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Воздушного змея нет (❌) → No, I haven\'t.',
          lv: 'Pūķa nav (❌) → No, I haven\'t.',
        },
      },
      {
        id: 'g1_hyg_3',
        grade: 1,
        category: 'have_you_got',
        prompt: 'Have you got a dog?',
        audioText: 'Have you got a dog?',
        imageWord: { en: 'dog', emoji: '🐶' },
        isNegated: false,
        badgeType: 'have',
        options: [
          "No, I haven't.",
          'Yes, I have.',
          'I like dogs.',
        ],
        correctIndex: 1,
        hint: {
          ru: 'Собака есть (✓) → Yes, I have.',
          lv: 'Suns ir (✓) → Yes, I have.',
        },
      },
      {
        id: 'g1_hyg_4',
        grade: 1,
        category: 'have_you_got',
        prompt: 'Have you got a cat?',
        audioText: 'Have you got a cat?',
        imageWord: { en: 'cat', emoji: '🐱' },
        isNegated: true,
        badgeType: 'have',
        options: [
          'Yes, I have.',
          "No, I haven't.",
          'Yes, I am.',
        ],
        correctIndex: 1,
        hint: {
          ru: 'Кошки нет (❌) → No, I haven\'t.',
          lv: 'Kaķa nav (❌) → No, I haven\'t.',
        },
      },
      {
        id: 'g1_hyg_5',
        grade: 1,
        category: 'have_you_got',
        prompt: 'Have you got a pencil?',
        audioText: 'Have you got a pencil?',
        imageWord: { en: 'pencil', emoji: '✏️' },
        isNegated: false,
        badgeType: 'have',
        options: [
          'Yes, I have.',
          "No, I haven't.",
          "No, I don't.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Карандаш есть (✓) → Yes, I have.',
          lv: 'Zīmulis ir (✓) → Yes, I have.',
        },
      },
      {
        id: 'g1_hyg_6',
        grade: 1,
        category: 'have_you_got',
        prompt: 'Have you got a doll?',
        audioText: 'Have you got a doll?',
        imageWord: { en: 'doll', emoji: '🪆' },
        isNegated: true,
        badgeType: 'have',
        options: [
          'Yes, I have.',
          "No, I haven't.",
          "I haven't got.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Куклы нет (❌) → No, I haven\'t.',
          lv: 'Lelles nav (❌) → No, I haven\'t.',
        },
      },
      {
        id: 'g1_can_7',
        grade: 1,
        category: 'can',
        prompt: 'Choose the correct sentence:',
        audioText: 'I can run.',
        imageWord: { en: 'run', emoji: '🏃' },
        isNegated: false,
        badgeType: 'can',
        options: [
          'I can run.',
          "I can't run.",
          'I can swim.',
        ],
        correctIndex: 0,
        hint: {
          ru: 'Умею бегать (✓) → I can run.',
          lv: 'Protu skriet (✓) → I can run.',
        },
      },
      {
        id: 'g1_can_8',
        grade: 1,
        category: 'can',
        prompt: 'Choose the correct sentence:',
        audioText: "I can't rollerblade.",
        imageWord: { en: 'rollerblade', emoji: '🛼' },
        isNegated: true,
        badgeType: 'can',
        options: [
          'I can rollerblade.',
          "I can't rollerblade.",
          "I can't run.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Не умею кататься на роликах (❌) → I can\'t rollerblade.',
          lv: 'Neprotu skrituļot (❌) → I can\'t rollerblade.',
        },
      },
      {
        id: 'g1_can_9',
        grade: 1,
        category: 'can',
        prompt: 'Choose the correct sentence:',
        audioText: 'I can swim.',
        imageWord: { en: 'swim', emoji: '🏊' },
        isNegated: false,
        badgeType: 'can',
        options: [
          "I can't swim.",
          'I can swim.',
          'I can jump.',
        ],
        correctIndex: 1,
        hint: {
          ru: 'Умею плавать (✓) → I can swim.',
          lv: 'Protu peldēt (✓) → I can swim.',
        },
      },
      {
        id: 'g1_can_10',
        grade: 1,
        category: 'can',
        prompt: 'Choose the correct sentence:',
        audioText: "I can't climb.",
        imageWord: { en: 'climb', emoji: '🧗' },
        isNegated: true,
        badgeType: 'can',
        options: [
          'I can climb.',
          "I can't climb.",
          "I can't fly.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Не умею лазить (❌) → I can\'t climb.',
          lv: 'Neprotu rāpties (❌) → I can\'t climb.',
        },
      },
      {
        id: 'g1_can_11',
        grade: 1,
        category: 'can',
        prompt: 'Choose the correct sentence:',
        audioText: 'I can jump.',
        imageWord: { en: 'jump', emoji: '🦘' },
        isNegated: false,
        badgeType: 'can',
        options: [
          'I can jump.',
          "I can't jump.",
          'I can dance.',
        ],
        correctIndex: 0,
        hint: {
          ru: 'Умею прыгать (✓) → I can jump.',
          lv: 'Protu lēkt (✓) → I can jump.',
        },
      },
      {
        id: 'g1_can_12',
        grade: 1,
        category: 'can',
        prompt: 'Choose the correct sentence:',
        audioText: "I can't fly.",
        imageWord: { en: 'fly', emoji: '🦅' },
        isNegated: true,
        badgeType: 'can',
        options: [
          'I can fly.',
          "I can't fly.",
          'I can sing.',
        ],
        correctIndex: 1,
        hint: {
          ru: 'Не умею летать (❌) → I can\'t fly.',
          lv: 'Neprotu lidot (❌) → I can\'t fly.',
        },
      },
    ],
  },
  {
    id: 'g1_likes_and_colors',
    grade: 1,
    title: {
      ru: "I like / don't like & They're...",
      lv: "I like / don't like & They're...",
    },
    description: {
      ru: "Предпочтения (I like cats / I don't like dogs) и цвета (They're green and brown)",
      lv: "Patika (I like cats / I don't like dogs) un krāsas (They're green and brown)",
    },
    emoji: '🦆',
    color: 'teal',
    questions: [
      {
        id: 'g1_lc_1',
        grade: 1,
        category: 'likes',
        prompt: 'Choose the correct sentence:',
        audioText: 'I like cats.',
        imageWord: { en: 'cats', emoji: '🐱' },
        isNegated: false,
        badgeType: 'like',
        options: [
          'I like cats.',
          "I don't like cats.",
          'I like dogs.',
        ],
        correctIndex: 0,
        hint: {
          ru: 'Люблю котиков (❤️) → I like cats.',
          lv: 'Man patīk kaķi (❤️) → I like cats.',
        },
      },
      {
        id: 'g1_lc_2',
        grade: 1,
        category: 'likes',
        prompt: 'Choose the correct sentence:',
        audioText: "I don't like dogs.",
        imageWord: { en: 'dogs', emoji: '🐶' },
        isNegated: true,
        badgeType: 'like',
        options: [
          'I like dogs.',
          "I don't like dogs.",
          "I don't like cats.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Не люблю собак (❌) → I don\'t like dogs.',
          lv: 'Man nepatīk suņi (❌) → I don\'t like dogs.',
        },
      },
      {
        id: 'g1_lc_3',
        grade: 1,
        category: 'likes',
        prompt: 'Choose the correct sentence:',
        audioText: 'I like apples.',
        imageWord: { en: 'apples', emoji: '🍎' },
        isNegated: false,
        badgeType: 'like',
        options: [
          "I don't like apples.",
          'I like apples.',
          'I like bananas.',
        ],
        correctIndex: 1,
        hint: {
          ru: 'Люблю яблоки (❤️) → I like apples.',
          lv: 'Man garšo āboli (❤️) → I like apples.',
        },
      },
      {
        id: 'g1_lc_4',
        grade: 1,
        category: 'likes',
        prompt: 'Choose the correct sentence:',
        audioText: "I don't like spiders.",
        imageWord: { en: 'spiders', emoji: '🕷️' },
        isNegated: true,
        badgeType: 'like',
        options: [
          'I like spiders.',
          "I don't like spiders.",
          "I don't like frogs.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Не люблю пауков (❌) → I don\'t like spiders.',
          lv: 'Man nepatīk zirnekļi (❌) → I don\'t like spiders.',
        },
      },
      {
        id: 'g1_lc_5',
        grade: 1,
        category: 'likes',
        prompt: 'Choose the correct sentence:',
        audioText: 'I like ice cream.',
        imageWord: { en: 'ice cream', emoji: '🍦' },
        isNegated: false,
        badgeType: 'like',
        options: [
          'I like ice cream.',
          "I don't like ice cream.",
          'I like milk.',
        ],
        correctIndex: 0,
        hint: {
          ru: 'Люблю мороженое (❤️) → I like ice cream.',
          lv: 'Man garšo saldējums (❤️) → I like ice cream.',
        },
      },
      {
        id: 'g1_lc_6',
        grade: 1,
        category: 'likes',
        prompt: 'Choose the correct sentence:',
        audioText: "I don't like carrots.",
        imageWord: { en: 'carrots', emoji: '🥕' },
        isNegated: true,
        badgeType: 'like',
        options: [
          'I like carrots.',
          "I don't like carrots.",
          "I don't like apples.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Не люблю морковку (❌) → I don\'t like carrots.',
          lv: 'Man negaršo burkāni (❌) → I don\'t like carrots.',
        },
      },
      {
        id: 'g1_col_7',
        grade: 1,
        category: 'colors_and_plurals',
        prompt: 'What color are the ducks?',
        audioText: 'What color are the ducks?',
        imageWord: {
          en: 'ducks',
          emoji: '🦆',
          secondEmoji: '🦆',
          customLabel: 'Green & Brown Ducks',
        },
        options: [
          "They're green and brown.",
          "They're yellow and white.",
          "They're black and red.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Утки зелёного и коричневого цвета → They\'re green and brown.',
          lv: 'Pīles ir zaļā un brūnā krāsā → They\'re green and brown.',
        },
      },
      {
        id: 'g1_col_8',
        grade: 1,
        category: 'colors_and_plurals',
        prompt: 'What color are the frogs?',
        audioText: 'What color are the frogs?',
        imageWord: {
          en: 'frogs',
          emoji: '🐸',
          secondEmoji: '🐸',
          customLabel: 'Green & Yellow Frogs',
        },
        options: [
          "They're pink and blue.",
          "They're green and yellow.",
          "They're black and white.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Лягушки зелёного и жёлтого цвета → They\'re green and yellow.',
          lv: 'Vardes ir zaļā un dzeltenā krāsā → They\'re green and yellow.',
        },
      },
      {
        id: 'g1_col_9',
        grade: 1,
        category: 'colors_and_plurals',
        prompt: 'What color are the zebras?',
        audioText: 'What color are the zebras?',
        imageWord: {
          en: 'zebras',
          emoji: '🦓',
          secondEmoji: '🦓',
          customLabel: 'Black & White Zebras',
        },
        options: [
          "They're black and white.",
          "They're brown and green.",
          "They're red and blue.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Зебры чёрного и белого цвета → They\'re black and white.',
          lv: 'Zebras ir melnā un baltā krāsā → They\'re black and white.',
        },
      },
      {
        id: 'g1_col_10',
        grade: 1,
        category: 'colors_and_plurals',
        prompt: 'What color are the apples?',
        audioText: 'What color are the apples?',
        imageWord: {
          en: 'apples',
          emoji: '🍏',
          secondEmoji: '🍎',
          customLabel: 'Red & Green Apples',
        },
        options: [
          "They're blue and yellow.",
          "They're red and green.",
          "They're purple and black.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Яблоки красного и зелёного цвета → They\'re red and green.',
          lv: 'Āboli ir sarkanā un zaļā krāsā → They\'re red and green.',
        },
      },
      {
        id: 'g1_col_11',
        grade: 1,
        category: 'colors_and_plurals',
        prompt: 'What color are the birds?',
        audioText: 'What color are the birds?',
        imageWord: {
          en: 'birds',
          emoji: '🦜',
          secondEmoji: '🦜',
          customLabel: 'Blue & Yellow Birds',
        },
        options: [
          "They're blue and yellow.",
          "They're brown and grey.",
          "They're pink and black.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Птицы синего и жёлтого цвета → They\'re blue and yellow.',
          lv: 'Putni ir zilā un dzeltenā krāsā → They\'re blue and yellow.',
        },
      },
      {
        id: 'g1_col_12',
        grade: 1,
        category: 'colors_and_plurals',
        prompt: 'What color are the pencils?',
        audioText: 'What color are the pencils?',
        imageWord: {
          en: 'pencils',
          emoji: '✏️',
          secondEmoji: '🖍️',
          customLabel: 'Yellow & Red Pencils',
        },
        options: [
          "They're green and white.",
          "They're yellow and red.",
          "They're black and purple.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Карандаши жёлтого и красного цвета → They\'re yellow and red.',
          lv: 'Zīmuļi ir dzeltenā un sarkanā krāsā → They\'re yellow and red.',
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
    questions: [], // Populated dynamically by getQuestionsForGrammarTopic
  },
];

// Helper to get questions for topic, handling mix
export function getQuestionsForGrammarTopic(topic: GrammarTopic): GrammarQuestion[] {
  if (topic.id === 'g1_mix') {
    const all = GRADE_1_GRAMMAR_TOPICS
      .filter((t) => t.id !== 'g1_mix')
      .flatMap((t) => t.questions);
    // Return shuffled subset of 10
    return [...all].sort(() => Math.random() - 0.5).slice(0, 10);
  }
  return topic.questions;
}
