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
  | 'colors_and_plurals'
  | 'meals'
  | 'do_you_like'
  | 'we_have_got'
  | 'can_they'
  | 'wearing'
  | 'has_got'
  | 'prepositions'
  | 'there_is_are';

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
        prompt: 'Look at the boy:',
        audioText: "He's young.",
        imageWord: { en: 'boy', emoji: '🧒', customLabel: 'Young boy 🧒' },
        options: [
          "He's young.",
          "She's old.",
          "He's old.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Мальчик юный / молодой → He\'s young.',
          lv: 'Zēns ir jauns → He\'s young.',
        },
      },
      {
        id: 'g1_fd_12',
        grade: 1,
        category: 'descriptions',
        prompt: 'Look at the woman:',
        audioText: "She's old.",
        imageWord: { en: 'woman', emoji: '👵', customLabel: 'Old woman 👵' },
        options: [
          "He's young.",
          "She's old.",
          "She's young.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Женщина пожилая → She\'s old.',
          lv: 'Sieviete ir veca / gados → She\'s old.',
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
      ru: "I like / don't like & What colour is it? / They're...",
      lv: "I like / don't like & What colour is it? / They're...",
    },
    description: {
      ru: "Предпочтения (I like / don't like) и цвета (What colour is it? / They're green and brown)",
      lv: "Patika (I like / don't like) un krāsas (What colour is it? / They're green and brown)",
    },
    emoji: '🎨',
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
        id: 'g1_wc_1',
        grade: 1,
        category: 'colors_and_plurals',
        prompt: 'What colour is it?',
        audioText: 'What colour is it?',
        imageWord: { en: 'apple', emoji: '🍎', customLabel: 'Apple' },
        options: [
          "It's red.",
          "It's blue.",
          "It's yellow.",
        ],
        correctIndex: 0,
        hint: {
          ru: "Какого цвета яблоко? → It's red. (Красное)",
          lv: "Kādā krāsā ir ābols? → It's red. (Sarkans)",
        },
      },
      {
        id: 'g1_wc_2',
        grade: 1,
        category: 'colors_and_plurals',
        prompt: 'What colour is it?',
        audioText: 'What colour is it?',
        imageWord: { en: 'sun', emoji: '☀️', customLabel: 'Sun' },
        options: [
          "It's green.",
          "It's yellow.",
          "It's pink.",
        ],
        correctIndex: 1,
        hint: {
          ru: "Какого цвета солнце? → It's yellow. (Жёлтое)",
          lv: "Kādā krāsā ir saule? → It's yellow. (Dzeltena)",
        },
      },
      {
        id: 'g1_wc_3',
        grade: 1,
        category: 'colors_and_plurals',
        prompt: 'What colour is it?',
        audioText: 'What colour is it?',
        imageWord: { en: 'frog', emoji: '🐸', customLabel: 'Frog' },
        options: [
          "It's green.",
          "It's purple.",
          "It's brown.",
        ],
        correctIndex: 0,
        hint: {
          ru: "Какого цвета лягушка? → It's green. (Зелёная)",
          lv: "Kādā krāsā ir varde? → It's green. (Zaļa)",
        },
      },
      {
        id: 'g1_wc_4',
        grade: 1,
        category: 'colors_and_plurals',
        prompt: 'What colour is it?',
        audioText: 'What colour is it?',
        imageWord: { en: 'sea', emoji: '🌊', customLabel: 'Sea' },
        options: [
          "It's red.",
          "It's white.",
          "It's blue.",
        ],
        correctIndex: 2,
        hint: {
          ru: "Какого цвета море? → It's blue. (Синее)",
          lv: "Kādā krāsā ir jūra? → It's blue. (Zila)",
        },
      },
      {
        id: 'g1_wc_5',
        grade: 1,
        category: 'colors_and_plurals',
        prompt: 'What colour is it?',
        audioText: 'What colour is it?',
        imageWord: { en: 'orange', emoji: '🍊', customLabel: 'Orange' },
        options: [
          "It's orange.",
          "It's black.",
          "It's green.",
        ],
        correctIndex: 0,
        hint: {
          ru: "Какого цвета апельсин? → It's orange. (Оранжевый)",
          lv: "Kādā krāsā ir apelsīns? → It's orange. (Oranžs)",
        },
      },
      {
        id: 'g1_wc_6',
        grade: 1,
        category: 'colors_and_plurals',
        prompt: 'What colour is it?',
        audioText: 'What colour is it?',
        imageWord: { en: 'flamingo', emoji: '🦩', customLabel: 'Flamingo' },
        options: [
          "It's brown.",
          "It's pink.",
          "It's grey.",
        ],
        correctIndex: 1,
        hint: {
          ru: "Какого цвета фламинго? → It's pink. (Розовый)",
          lv: "Kādā krāsā ir flamingo? → It's pink. (Rozā)",
        },
      },
      {
        id: 'g1_wc_7',
        grade: 1,
        category: 'colors_and_plurals',
        prompt: 'What colour is it?',
        audioText: 'What colour is it?',
        imageWord: { en: 'elephant', emoji: '🐘', customLabel: 'Elephant' },
        options: [
          "It's yellow.",
          "It's grey.",
          "It's red.",
        ],
        correctIndex: 1,
        hint: {
          ru: "Какого цвета слон? → It's grey. (Серый)",
          lv: "Kādā krāsā ir zilonis? → It's grey. (Pelēks)",
        },
      },
      {
        id: 'g1_wc_8',
        grade: 1,
        category: 'colors_and_plurals',
        prompt: 'What colour is it?',
        audioText: 'What colour is it?',
        imageWord: { en: 'bear', emoji: '🐻', customLabel: 'Bear' },
        options: [
          "It's brown.",
          "It's purple.",
          "It's black.",
        ],
        correctIndex: 0,
        hint: {
          ru: "Какого цвета медведь? → It's brown. (Коричневый)",
          lv: "Kādā krāsā ir lācis? → It's brown. (Brūns)",
        },
      },
      {
        id: 'g1_col_7',
        grade: 1,
        category: 'colors_and_plurals',
        prompt: 'What colour are the ducks?',
        audioText: 'What colour are the ducks?',
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
        prompt: 'What colour are the frogs?',
        audioText: 'What colour are the frogs?',
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
        prompt: 'What colour are the zebras?',
        audioText: 'What colour are the zebras?',
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
        prompt: 'What colour are the apples?',
        audioText: 'What colour are the apples?',
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
        prompt: 'What colour are the birds?',
        audioText: 'What colour are the birds?',
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
        prompt: 'What colour are the pencils?',
        audioText: 'What colour are the pencils?',
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
export const GRADE_2_GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: 'g2_meals_and_do_you_like',
    grade: 2,
    title: {
      ru: "What do you have for...? & Do you like...?",
      lv: "What do you have for...? & Do you like...?",
    },
    description: {
      ru: "Приёмы пищи (What do you have for lunch?) и вкусы (Do you like bananas? Yes/No)",
      lv: "Ēdienreizes (What do you have for lunch?) un patika (Do you like bananas?)",
    },
    emoji: '🍝',
    color: 'orange',
    questions: [
      {
        id: 'g2_m_1',
        grade: 2,
        category: 'meals',
        prompt: 'What do you have for lunch?',
        audioText: 'What do you have for lunch?',
        imageWord: { en: 'pasta', emoji: '🍝', customLabel: 'Pasta' },
        options: [
          'I have pasta for lunch.',
          'I have milk for breakfast.',
          "I don't like pasta.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Что у тебя на обед? → У меня паста на обед.',
          lv: 'Kas tev ir pusdienās? → Man pusdienās ir pasta.',
        },
      },
      {
        id: 'g2_m_2',
        grade: 2,
        category: 'meals',
        prompt: 'What do you have for breakfast?',
        audioText: 'What do you have for breakfast?',
        imageWord: { en: 'cereal', emoji: '🥣', customLabel: 'Cereal' },
        options: [
          'I have pasta for lunch.',
          'I have cereal for breakfast.',
          'I have soup for dinner.',
        ],
        correctIndex: 1,
        hint: {
          ru: 'Что у тебя на завтрак? → У меня хлопья на завтрак.',
          lv: 'Kas tev ir brokastīs? → Man brokastīs ir pārslas.',
        },
      },
      {
        id: 'g2_m_3',
        grade: 2,
        category: 'meals',
        prompt: 'What do you have for dinner?',
        audioText: 'What do you have for dinner?',
        imageWord: { en: 'chicken', emoji: '🍗', customLabel: 'Chicken' },
        options: [
          'I have chicken for dinner.',
          'I have cereal for breakfast.',
          'I have apples for lunch.',
        ],
        correctIndex: 0,
        hint: {
          ru: 'Что у тебя на ужин? → У меня курица на ужин.',
          lv: 'Kas tev ir vakariņās? → Man vakariņās ir vista.',
        },
      },
      {
        id: 'g2_m_4',
        grade: 2,
        category: 'meals',
        prompt: 'What do you have for breakfast?',
        audioText: 'What do you have for breakfast?',
        imageWord: { en: 'toast', emoji: '🍞', secondEmoji: '🥚', customLabel: 'Toast & eggs' },
        options: [
          'I have pizza for lunch.',
          'I have soup for dinner.',
          'I have toast and eggs for breakfast.',
        ],
        correctIndex: 2,
        hint: {
          ru: 'Что у тебя на завтрак? → Тост и яйца на завтрак.',
          lv: 'Kas tev ir brokastīs? → Grauzdiņš un olas brokastīs.',
        },
      },
      {
        id: 'g2_m_5',
        grade: 2,
        category: 'meals',
        prompt: 'What do you have for lunch?',
        audioText: 'What do you have for lunch?',
        imageWord: { en: 'sandwich', emoji: '🥪', customLabel: 'Sandwich' },
        options: [
          'I have a sandwich for lunch.',
          'I have tea for breakfast.',
          'I have fish for dinner.',
        ],
        correctIndex: 0,
        hint: {
          ru: 'Что у тебя на обед? → Сэндвич на обед.',
          lv: 'Kas tev ir pusdienās? → Sviestmaize pusdienās.',
        },
      },
      {
        id: 'g2_dyl_6',
        grade: 2,
        category: 'do_you_like',
        prompt: 'Do you like bananas?',
        audioText: 'Do you like bananas?',
        imageWord: { en: 'bananas', emoji: '🍌' },
        isNegated: false,
        badgeType: 'like',
        options: [
          'Yes, I do.',
          "No, I don't.",
          'Yes, I have.',
        ],
        correctIndex: 0,
        hint: {
          ru: 'Любишь бананы? (❤️ Да) → Yes, I do.',
          lv: 'Vai tev garšo banāni? (❤️ Jā) → Yes, I do.',
        },
      },
      {
        id: 'g2_dyl_7',
        grade: 2,
        category: 'do_you_like',
        prompt: 'Do you like broccoli?',
        audioText: 'Do you like broccoli?',
        imageWord: { en: 'broccoli', emoji: '🥦' },
        isNegated: true,
        badgeType: 'like',
        options: [
          'Yes, I do.',
          "No, I don't.",
          "No, I can't.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Любишь брокколи? (❌ Нет) → No, I don\'t.',
          lv: 'Vai tev garšo brokoli? (❌ Nē) → No, I don\'t.',
        },
      },
      {
        id: 'g2_dyl_8',
        grade: 2,
        category: 'do_you_like',
        prompt: 'Do you like pizza?',
        audioText: 'Do you like pizza?',
        imageWord: { en: 'pizza', emoji: '🍕' },
        isNegated: false,
        badgeType: 'like',
        options: [
          "No, I don't.",
          'Yes, I do.',
          'Yes, I am.',
        ],
        correctIndex: 1,
        hint: {
          ru: 'Любишь пиццу? (❤️ Да) → Yes, I do.',
          lv: 'Vai tev garšo pica? (❤️ Jā) → Yes, I do.',
        },
      },
      {
        id: 'g2_dyl_9',
        grade: 2,
        category: 'do_you_like',
        prompt: 'Do you like mushrooms?',
        audioText: 'Do you like mushrooms?',
        imageWord: { en: 'mushrooms', emoji: '🍄' },
        isNegated: true,
        badgeType: 'like',
        options: [
          'Yes, I do.',
          "No, I haven't.",
          "No, I don't.",
        ],
        correctIndex: 2,
        hint: {
          ru: 'Любишь грибы? (❌ Нет) → No, I don\'t.',
          lv: 'Vai tev garšo sēnes? (❌ Nē) → No, I don\'t.',
        },
      },
      {
        id: 'g2_dyl_10',
        grade: 2,
        category: 'do_you_like',
        prompt: 'Do you like milk?',
        audioText: 'Do you like milk?',
        imageWord: { en: 'milk', emoji: '🥛' },
        isNegated: false,
        badgeType: 'like',
        options: [
          'Yes, I do.',
          "No, I don't.",
          'Yes, I can.',
        ],
        correctIndex: 0,
        hint: {
          ru: 'Любишь молоко? (❤️ Да) → Yes, I do.',
          lv: 'Vai tev garšo piens? (❤️ Jā) → Yes, I do.',
        },
      },
      {
        id: 'g2_dyl_11',
        grade: 2,
        category: 'do_you_like',
        prompt: 'Do you like onions?',
        audioText: 'Do you like onions?',
        imageWord: { en: 'onions', emoji: '🧅' },
        isNegated: true,
        badgeType: 'like',
        options: [
          'Yes, I do.',
          "No, I don't.",
          "No, I'm not.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Любишь лук? (❌ Нет) → No, I don\'t.',
          lv: 'Vai tev garšo sīpoli? (❌ Nē) → No, I don\'t.',
        },
      },
    ],
  },
  {
    id: 'g2_we_have_got_and_can_they',
    grade: 2,
    title: {
      ru: "We've got & Can you / they...?",
      lv: "We've got & Can you / they...?",
    },
    description: {
      ru: "Факты о теле и животных (We've got eyes / Horses haven't got wings) и вопросы Can you/they...?",
      lv: "Fakti (We've got eyes / Horses haven't got wings) un jautājumi Can you/they...?",
    },
    emoji: '🐎',
    color: 'indigo',
    questions: [
      {
        id: 'g2_whg_1',
        grade: 2,
        category: 'we_have_got',
        prompt: 'Choose the correct sentence:',
        audioText: "We've got eyes.",
        imageWord: { en: 'eyes', emoji: '👀', customLabel: 'Two eyes' },
        options: [
          "We've got eyes.",
          "We haven't got eyes.",
          'Horses have got wings.',
        ],
        correctIndex: 0,
        hint: {
          ru: 'У нас есть глаза → We\'ve got eyes.',
          lv: 'Mums ir acis → We\'ve got eyes.',
        },
      },
      {
        id: 'g2_whg_2',
        grade: 2,
        category: 'we_have_got',
        prompt: 'Choose the correct sentence:',
        audioText: "Horses haven't got wings.",
        imageWord: { en: 'horse', emoji: '🐎', customLabel: 'Horses & wings' },
        isNegated: true,
        badgeType: 'have',
        options: [
          'Horses have got wings.',
          "Horses haven't got wings.",
          "We haven't got eyes.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'У лошадей нет крыльев → Horses haven\'t got wings.',
          lv: 'Zirgiem nav spārnu → Horses haven\'t got wings.',
        },
      },
      {
        id: 'g2_whg_3',
        grade: 2,
        category: 'we_have_got',
        prompt: 'Choose the correct sentence:',
        audioText: 'Birds have got wings.',
        imageWord: { en: 'birds', emoji: '🦜', customLabel: 'Wings' },
        isNegated: false,
        badgeType: 'have',
        options: [
          "Birds haven't got wings.",
          'Birds have got wings.',
          'Fish have got legs.',
        ],
        correctIndex: 1,
        hint: {
          ru: 'У птиц есть крылья → Birds have got wings.',
          lv: 'Putniem ir spārni → Birds have got wings.',
        },
      },
      {
        id: 'g2_whg_4',
        grade: 2,
        category: 'we_have_got',
        prompt: 'Choose the correct sentence:',
        audioText: "Fish haven't got legs.",
        imageWord: { en: 'fish', emoji: '🐟', customLabel: 'Fish & legs' },
        isNegated: true,
        badgeType: 'have',
        options: [
          'Fish have got legs.',
          "Fish haven't got legs.",
          "Frogs haven't got legs.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'У рыб нет ног → Fish haven\'t got legs.',
          lv: 'Zivīm nav kāju → Fish haven\'t got legs.',
        },
      },
      {
        id: 'g2_whg_5',
        grade: 2,
        category: 'we_have_got',
        prompt: 'Choose the correct sentence:',
        audioText: "We've got two ears.",
        imageWord: { en: 'ears', emoji: '👂', secondEmoji: '👂', customLabel: 'Two ears' },
        options: [
          "We've got two ears.",
          "We haven't got ears.",
          "Dogs haven't got ears.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'У нас два уха → We\'ve got two ears.',
          lv: 'Mums ir divas ausis → We\'ve got two ears.',
        },
      },
      {
        id: 'g2_whg_6',
        grade: 2,
        category: 'we_have_got',
        prompt: 'Choose the correct sentence:',
        audioText: 'Frogs have got four legs.',
        imageWord: { en: 'frogs', emoji: '🐸', customLabel: 'Four legs' },
        options: [
          "Frogs haven't got legs.",
          'Frogs have got four legs.',
          'Frogs have got wings.',
        ],
        correctIndex: 1,
        hint: {
          ru: 'У лягушек 4 лапки → Frogs have got four legs.',
          lv: 'Vardēm ir četras kājas → Frogs have got four legs.',
        },
      },
      {
        id: 'g2_cyt_7',
        grade: 2,
        category: 'can_they',
        prompt: 'Can you swim?',
        audioText: 'Can you swim?',
        imageWord: { en: 'swim', emoji: '🏊' },
        isNegated: false,
        badgeType: 'can',
        options: [
          'Yes, I can.',
          "No, I can't.",
          'Yes, they can.',
        ],
        correctIndex: 0,
        hint: {
          ru: 'Ты умеешь плавать? (✓ Да) → Yes, I can.',
          lv: 'Vai tu proti peldēt? (✓ Jā) → Yes, I can.',
        },
      },
      {
        id: 'g2_cyt_8',
        grade: 2,
        category: 'can_they',
        prompt: 'Can you fly?',
        audioText: 'Can you fly?',
        imageWord: { en: 'fly', emoji: '🦅' },
        isNegated: true,
        badgeType: 'can',
        options: [
          'Yes, I can.',
          "No, I can't.",
          "No, they can't.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Ты умеешь летать? (❌ Нет) → No, I can\'t.',
          lv: 'Vai tu proti lidot? (❌ Nē) → No, I can\'t.',
        },
      },
      {
        id: 'g2_cyt_9',
        grade: 2,
        category: 'can_they',
        prompt: 'Can birds fly?',
        audioText: 'Can birds fly?',
        imageWord: { en: 'birds', emoji: '🦜', secondEmoji: '🕊️' },
        isNegated: false,
        badgeType: 'can',
        options: [
          'Yes, they can.',
          "No, they can't.",
          'Yes, I can.',
        ],
        correctIndex: 0,
        hint: {
          ru: 'Птицы умеют летать? (✓ Да) → Yes, they can.',
          lv: 'Vai putni prot lidot? (✓ Jā) → Yes, they can.',
        },
      },
      {
        id: 'g2_cyt_10',
        grade: 2,
        category: 'can_they',
        prompt: 'Can kangaroos jump?',
        audioText: 'Can kangaroos jump?',
        imageWord: { en: 'kangaroos', emoji: '🦘' },
        isNegated: false,
        badgeType: 'can',
        options: [
          "No, they can't.",
          'Yes, they can.',
          'Yes, I do.',
        ],
        correctIndex: 1,
        hint: {
          ru: 'Кенгуру умеют прыгать? (✓ Да) → Yes, they can.',
          lv: 'Vai ķenguri prot lēkt? (✓ Jā) → Yes, they can.',
        },
      },
      {
        id: 'g2_cyt_11',
        grade: 2,
        category: 'can_they',
        prompt: 'Can dogs speak English?',
        audioText: 'Can dogs speak English?',
        imageWord: { en: 'dogs', emoji: '🐶' },
        isNegated: true,
        badgeType: 'can',
        options: [
          'Yes, they can.',
          "No, they can't.",
          "No, I haven't.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Собаки говорят по-английски? (❌ Нет) → No, they can\'t.',
          lv: 'Vai suņi runā angliski? (❌ Nē) → No, they can\'t.',
        },
      },
      {
        id: 'g2_cyt_12',
        grade: 2,
        category: 'can_they',
        prompt: 'Can monkeys climb trees?',
        audioText: 'Can monkeys climb trees?',
        imageWord: { en: 'monkeys', emoji: '🐒' },
        isNegated: false,
        badgeType: 'can',
        options: [
          'Yes, they can.',
          "No, they can't.",
          'Yes, I have.',
        ],
        correctIndex: 0,
        hint: {
          ru: 'Обезьяны лазят по деревьям? (✓ Да) → Yes, they can.',
          lv: 'Vai pērtiķi prot kāpt kokos? (✓ Jā) → Yes, they can.',
        },
      },
    ],
  },
  {
    id: 'g2_clothes_and_appearance',
    grade: 2,
    title: {
      ru: 'What are you wearing? & Has he/she got...?',
      lv: 'What are you wearing? & Has he/she got...?',
    },
    description: {
      ru: "Одежда (I'm wearing shorts) и внешность (Has she got curly hair? No, she hasn't)",
      lv: "Apģērbs (I'm wearing shorts) un izskats (Has she got curly hair?)",
    },
    emoji: '🩳',
    color: 'teal',
    questions: [
      {
        id: 'g2_wear_1',
        grade: 2,
        category: 'wearing',
        prompt: 'What are you wearing?',
        audioText: 'What are you wearing?',
        imageWord: { en: 'shorts', emoji: '🩳', customLabel: 'Shorts' },
        options: [
          "I'm wearing shorts.",
          "I'm wearing a dress.",
          'I have got a ball.',
        ],
        correctIndex: 0,
        hint: {
          ru: 'Что на тебе надето? → На мне шорты.',
          lv: 'Kas tev ir mugurā? → Man ir mugurā šorti.',
        },
      },
      {
        id: 'g2_wear_2',
        grade: 2,
        category: 'wearing',
        prompt: 'What are you wearing?',
        audioText: 'What are you wearing?',
        imageWord: { en: 'dress', emoji: '👗', customLabel: 'Dress' },
        options: [
          "I'm wearing a jacket.",
          "I'm wearing a dress.",
          "I'm wearing trousers.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Что на тебе надето? → На мне платье.',
          lv: 'Kas tev ir mugurā? → Man ir mugurā kleita.',
        },
      },
      {
        id: 'g2_wear_3',
        grade: 2,
        category: 'wearing',
        prompt: 'What are you wearing?',
        audioText: 'What are you wearing?',
        imageWord: { en: 'jacket', emoji: '🧥', customLabel: 'Jacket' },
        options: [
          "I'm wearing shorts.",
          "I'm wearing a cap.",
          "I'm wearing a jacket.",
        ],
        correctIndex: 2,
        hint: {
          ru: 'Что на тебе надето? → На мне куртка.',
          lv: 'Kas tev ir mugurā? → Man ir mugurā jaka.',
        },
      },
      {
        id: 'g2_wear_4',
        grade: 2,
        category: 'wearing',
        prompt: 'What are you wearing?',
        audioText: 'What are you wearing?',
        imageWord: { en: 't-shirt', emoji: '👕', customLabel: 'T-shirt' },
        options: [
          "I'm wearing a T-shirt.",
          "I'm wearing a skirt.",
          "I'm wearing a hat.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Что на тебе надето? → На мне футболка.',
          lv: 'Kas tev ir mugurā? → Man ir mugurā T-krekls.',
        },
      },
      {
        id: 'g2_wear_5',
        grade: 2,
        category: 'wearing',
        prompt: 'What are you wearing?',
        audioText: 'What are you wearing?',
        imageWord: { en: 'cap', emoji: '🧢', customLabel: 'Cap' },
        options: [
          "I'm wearing boots.",
          "I'm wearing a cap.",
          "I'm wearing shorts.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Что на тебе надето? → На мне кепка.',
          lv: 'Kas tev ir mugurā? → Man ir mugurā cepure.',
        },
      },
      {
        id: 'g2_app_6',
        grade: 2,
        category: 'has_got',
        prompt: 'Has she got curly hair?',
        audioText: 'Has she got curly hair?',
        imageWord: { en: 'straight hair', emoji: '👩', customLabel: 'Straight hair' },
        options: [
          'Yes, she has.',
          "No, she hasn't. She's got straight hair.",
          'Yes, he has.',
        ],
        correctIndex: 1,
        hint: {
          ru: 'У неё кудрявые волосы? → Нет, у неё прямые волосы.',
          lv: 'Vai viņai ir cirtaini mati? → Nē, viņai ir taisni mati.',
        },
      },
      {
        id: 'g2_app_7',
        grade: 2,
        category: 'has_got',
        prompt: 'Has he got curly hair?',
        audioText: 'Has he got curly hair?',
        imageWord: { en: 'curly hair', emoji: '👦', customLabel: 'Curly hair' },
        options: [
          "Yes, he has. He's got curly hair.",
          "No, he hasn't.",
          'Yes, she has.',
        ],
        correctIndex: 0,
        hint: {
          ru: 'У него кудрявые волосы? → Да, у него кудрявые волосы.',
          lv: 'Vai viņam ir cirtaini mati? → Jā, viņam ir cirtaini mati.',
        },
      },
      {
        id: 'g2_app_8',
        grade: 2,
        category: 'has_got',
        prompt: 'Has she got long hair?',
        audioText: 'Has she got long hair?',
        imageWord: { en: 'long hair', emoji: '👧', customLabel: 'Long hair' },
        options: [
          "No, she hasn't.",
          "Yes, she has. She's got long hair.",
          "He's got short hair.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'У неё длинные волосы? → Да, у неё длинные волосы.',
          lv: 'Vai viņai ir gari mati? → Jā, viņai ir gari mati.',
        },
      },
      {
        id: 'g2_app_9',
        grade: 2,
        category: 'has_got',
        prompt: 'Has he got glasses?',
        audioText: 'Has he got glasses?',
        imageWord: { en: 'glasses', emoji: '👓', customLabel: 'Glasses' },
        options: [
          'Yes, he has.',
          "No, he hasn't.",
          'Yes, she has.',
        ],
        correctIndex: 0,
        hint: {
          ru: 'У него есть очки? → Да, у него есть очки.',
          lv: 'Vai viņam ir brilles? → Jā, viņam ir.',
        },
      },
      {
        id: 'g2_app_10',
        grade: 2,
        category: 'has_got',
        prompt: 'Has she got dark hair?',
        audioText: 'Has she got dark hair?',
        imageWord: { en: 'blond hair', emoji: '👱‍♀️', customLabel: 'Blond hair' },
        options: [
          'Yes, she has.',
          "No, she hasn't. She's got blond hair.",
          "She hasn't got hair.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'У неё тёмные волосы? → Нет, у неё светлые волосы.',
          lv: 'Vai viņai ir tumši mati? → Nē, viņai ir gaiši mati.',
        },
      },
      {
        id: 'g2_app_11',
        grade: 2,
        category: 'has_got',
        prompt: 'Has he got blue eyes?',
        audioText: 'Has he got blue eyes?',
        imageWord: { en: 'green eyes', emoji: '👁️', customLabel: 'Green eyes' },
        options: [
          'Yes, he has.',
          "No, he hasn't. He's got green eyes.",
          'Yes, they have.',
        ],
        correctIndex: 1,
        hint: {
          ru: 'У него голубые глаза? → Нет, у него зелёные глаза.',
          lv: 'Vai viņam ir zilas acis? → Nē, viņam ir zaļas acis.',
        },
      },
    ],
  },
  {
    id: 'g2_prepositions_and_there_is_are',
    grade: 2,
    title: {
      ru: "Where's the...? & There's / There are",
      lv: "Where's the...? & There's / There are",
    },
    description: {
      ru: "Предлоги места (It's in / on / under the table) и конструкции There's a kitchen / There are two bathrooms",
      lv: "Prievārdi (It's in / on / under) un teikumi There is / There are",
    },
    emoji: '🏠',
    color: 'rose',
    questions: [
      {
        id: 'g2_prep_1',
        grade: 2,
        category: 'prepositions',
        prompt: "Where's the book?",
        audioText: "Where's the book?",
        imageWord: { en: 'book on table', emoji: '📖', secondEmoji: '🪵', customLabel: 'On the table' },
        options: [
          "It's on the table.",
          "It's in the table.",
          "It's under the table.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Где книга? → Она на столе (on).',
          lv: 'Kur ir grāmata? → Tā ir uz galda (on).',
        },
      },
      {
        id: 'g2_prep_2',
        grade: 2,
        category: 'prepositions',
        prompt: "Where's the cat?",
        audioText: "Where's the cat?",
        imageWord: { en: 'cat under chair', emoji: '🐱', secondEmoji: '🪑', customLabel: 'Under the chair' },
        options: [
          "It's on the chair.",
          "It's under the chair.",
          "It's in the chair.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Где кошка? → Она под стулом (under).',
          lv: 'Kur ir kaķis? → Tas ir zem krēsla (under).',
        },
      },
      {
        id: 'g2_prep_3',
        grade: 2,
        category: 'prepositions',
        prompt: "Where's the pencil?",
        audioText: "Where's the pencil?",
        imageWord: { en: 'pencil in pencil case', emoji: '✏️', secondEmoji: '👝', customLabel: 'In the pencil case' },
        options: [
          "It's under the pencil case.",
          "It's on the pencil case.",
          "It's in the pencil case.",
        ],
        correctIndex: 2,
        hint: {
          ru: 'Где карандаш? → Он в пенале (in).',
          lv: 'Kur ir zīmulis? → Tas ir penālī (in).',
        },
      },
      {
        id: 'g2_prep_4',
        grade: 2,
        category: 'prepositions',
        prompt: "Where's the ball?",
        audioText: "Where's the ball?",
        imageWord: { en: 'ball under bed', emoji: '⚽', secondEmoji: '🛏️', customLabel: 'Under the bed' },
        options: [
          "It's on the bed.",
          "It's under the bed.",
          "It's in the bed.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Где мяч? → Он под кроватью (under).',
          lv: 'Kur ir bumba? → Tā ir zem gultas (under).',
        },
      },
      {
        id: 'g2_prep_5',
        grade: 2,
        category: 'prepositions',
        prompt: "Where's the apple?",
        audioText: "Where's the apple?",
        imageWord: { en: 'apple on plate', emoji: '🍎', secondEmoji: '🍽️', customLabel: 'On the plate' },
        options: [
          "It's on the plate.",
          "It's in the plate.",
          "It's under the plate.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Где яблоко? → Оно на тарелке (on).',
          lv: 'Kur ir ābols? → Tas ir uz šķīvja (on).',
        },
      },
      {
        id: 'g2_prep_6',
        grade: 2,
        category: 'prepositions',
        prompt: "Where's the ruler?",
        audioText: "Where's the ruler?",
        imageWord: { en: 'ruler in bag', emoji: '📏', secondEmoji: '🎒', customLabel: 'In the bag' },
        options: [
          "It's under the bag.",
          "It's in the bag.",
          "It's on the bag.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Где линейка? → Она в рюкзаке (in).',
          lv: 'Kur ir lineāls? → Tas ir somā (in).',
        },
      },
      {
        id: 'g2_t_7',
        grade: 2,
        category: 'there_is_are',
        prompt: 'Look at the house plan:',
        audioText: "There's a kitchen.",
        imageWord: { en: 'kitchen', emoji: '🍳', customLabel: '1 Kitchen' },
        options: [
          "There's a kitchen.",
          'There are two kitchens.',
          "There's two kitchens.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Одна кухня (ед. ч.) → There\'s a kitchen.',
          lv: 'Viena virtuve → There\'s a kitchen.',
        },
      },
      {
        id: 'g2_t_8',
        grade: 2,
        category: 'there_is_are',
        prompt: 'Look at the house plan:',
        audioText: 'There are two bathrooms.',
        imageWord: { en: 'bathrooms', emoji: '🛁', secondEmoji: '🛁', customLabel: '2 Bathrooms' },
        options: [
          "There's two bathrooms.",
          'There are two bathrooms.',
          "There's a bathroom.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Две ванные комнаты (мн. ч.) → There are two bathrooms.',
          lv: 'Divas vannasistabas → There are two bathrooms.',
        },
      },
      {
        id: 'g2_t_9',
        grade: 2,
        category: 'there_is_are',
        prompt: 'Look at the living room:',
        audioText: 'There are three cushions.',
        imageWord: { en: 'cushions', emoji: '🛋️', customLabel: '3 Cushions' },
        options: [
          "There's three cushions.",
          'There are three cushions.',
          "There's a cushion.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Три подушки (мн. ч.) → There are three cushions.',
          lv: 'Trīs spilveni → There are three cushions.',
        },
      },
      {
        id: 'g2_t_10',
        grade: 2,
        category: 'there_is_are',
        prompt: 'Look at the bedroom:',
        audioText: "There's a big bed.",
        imageWord: { en: 'bed', emoji: '🛏️', customLabel: '1 Big Bed' },
        options: [
          "There's a big bed.",
          'There are a big bed.',
          'There are three beds.',
        ],
        correctIndex: 0,
        hint: {
          ru: 'Одна большая кровать → There\'s a big bed.',
          lv: 'Viena liela gulta → There\'s a big bed.',
        },
      },
      {
        id: 'g2_t_11',
        grade: 2,
        category: 'there_is_are',
        prompt: 'Look at the garden:',
        audioText: 'There are four flowers.',
        imageWord: { en: 'flowers', emoji: '🌸', secondEmoji: '🌺', customLabel: '4 Flowers' },
        options: [
          "There's four flowers.",
          'There are four flowers.',
          "There's a flower.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Четыре цветка (мн. ч.) → There are four flowers.',
          lv: 'Četri ziedi → There are four flowers.',
        },
      },
      {
        id: 'g2_t_12',
        grade: 2,
        category: 'there_is_are',
        prompt: 'Look at the garage:',
        audioText: "There's a red car.",
        imageWord: { en: 'car', emoji: '🚗', customLabel: '1 Red Car' },
        options: [
          "There's a red car.",
          'There are a red car.',
          'There are two cars.',
        ],
        correctIndex: 0,
        hint: {
          ru: 'Одна красная машина → There\'s a red car.',
          lv: 'Viena sarkana mašīna → There\'s a red car.',
        },
      },
    ],
  },
  {
    id: 'g2_mix',
    grade: 2,
    title: {
      ru: 'Все задания 2 класса (Микс)',
      lv: 'Visi 2. klases uzdevumi (Mikss)',
    },
    description: {
      ru: 'Случайные 10 вопросов из всех тем 2 класса',
      lv: 'Jaukti 10 jautājumi no visām 2. klases tēmām',
    },
    emoji: '🎯',
    color: 'amber',
    questions: [], // Populated dynamically by getQuestionsForGrammarTopic
  },
];

export const ALL_GRAMMAR_TOPICS: GrammarTopic[] = [
  ...GRADE_1_GRAMMAR_TOPICS,
  ...GRADE_2_GRAMMAR_TOPICS,
];

// Helper to get grammar topics based on active grades filter
export function getGrammarTopicsForGrades(selectedGrades: Grade[]): GrammarTopic[] {
  const list: GrammarTopic[] = [];
  if (selectedGrades.includes(1)) {
    list.push(...GRADE_1_GRAMMAR_TOPICS);
  }
  if (selectedGrades.includes(2)) {
    list.push(...GRADE_2_GRAMMAR_TOPICS);
  }
  return list;
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Helper to get questions for topic, handling mix and randomizing order
export function getQuestionsForGrammarTopic(topic: GrammarTopic): GrammarQuestion[] {
  if (topic.id === 'g1_mix') {
    const all = GRADE_1_GRAMMAR_TOPICS
      .filter((t) => t.id !== 'g1_mix')
      .flatMap((t) => t.questions);
    return shuffleArray(all).slice(0, 10);
  }
  if (topic.id === 'g2_mix') {
    const all = GRADE_2_GRAMMAR_TOPICS
      .filter((t) => t.id !== 'g2_mix')
      .flatMap((t) => t.questions);
    return shuffleArray(all).slice(0, 10);
  }
  return shuffleArray(topic.questions);
}
