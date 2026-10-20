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
    hideCaption?: boolean;
    isTwoCharacters?: boolean;
    highlightIndex?: 0 | 1;
    fullBodyHeight?: {
      first: { gender: 'boy' | 'girl'; height: 'tall' | 'short' };
      second: { gender: 'boy' | 'girl'; height: 'tall' | 'short' };
    };
    heightScale?: {
      first?: 'tall' | 'short' | 'normal';
      second?: 'tall' | 'short' | 'normal';
    };
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
          "It's a bag.",
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
          ru: 'Карандаш есть (у меня есть)',
          lv: 'Zīmulis ir (man ir)',
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
          ru: 'Карандаш перечёркнут (у меня нет)',
          lv: 'Zīmulis pārsvītrots (man nav)',
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
          ru: 'Книга есть (у меня есть)',
          lv: 'Grāmata ir (man ir)',
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
          ru: 'Книга перечёркнута (у меня нет)',
          lv: 'Grāmata pārsvītrota (man nav)',
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
          ru: 'Машинка есть (у меня есть)',
          lv: 'Mašīna ir (man ir)',
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
          ru: 'Машинка перечёркнута (у меня нет)',
          lv: 'Mašīna pārsvītrota (man nav)',
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
          ru: 'Мяч есть (у меня есть)',
          lv: 'Bumba ir (man ir)',
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
          ru: 'Мяч перечёркнут (у меня нет)',
          lv: 'Bumba pārsvītrota (man nav)',
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
        imageWord: {
          en: 'mum',
          emoji: '👩',
          secondEmoji: '👧',
          isTwoCharacters: true,
          highlightIndex: 0,
          heightScale: {
            first: 'tall',
            second: 'short',
          },
          hideCaption: true,
        },
        options: [
          'This is my mum.',
          'This is my sister.',
          'This is my dad.',
        ],
        correctIndex: 0,
        hint: {
          ru: 'Стрелка указывает на маму (рядом с сестрой)',
          lv: 'Bultiņa rāda uz mammu (blakus māsai)',
        },
      },
      {
        id: 'g1_fd_2',
        grade: 1,
        category: 'family',
        prompt: "Who's this?",
        audioText: "Who's this?",
        imageWord: {
          en: 'dad',
          emoji: '👨',
          secondEmoji: '👦',
          isTwoCharacters: true,
          highlightIndex: 0,
          heightScale: {
            first: 'tall',
            second: 'short',
          },
          hideCaption: true,
        },
        options: [
          'This is my brother.',
          'This is my dad.',
          'This is my mum.',
        ],
        correctIndex: 1,
        hint: {
          ru: 'Стрелка указывает на папу (рядом с братом)',
          lv: 'Bultiņa rāda uz tēti (blakus brālim)',
        },
      },
      {
        id: 'g1_fd_3',
        grade: 1,
        category: 'family',
        prompt: "Who's this?",
        audioText: "Who's this?",
        imageWord: {
          en: 'sister',
          emoji: '👧',
          secondEmoji: '👩',
          isTwoCharacters: true,
          highlightIndex: 0,
          heightScale: {
            first: 'short',
            second: 'tall',
          },
          hideCaption: true,
        },
        options: [
          'This is my mum.',
          'This is my brother.',
          'This is my sister.',
        ],
        correctIndex: 2,
        hint: {
          ru: 'Стрелка указывает на сестру (рядом с мамой)',
          lv: 'Bultiņa rāda uz māsu (blakus mammai)',
        },
      },
      {
        id: 'g1_fd_4',
        grade: 1,
        category: 'family',
        prompt: "Who's this?",
        audioText: "Who's this?",
        imageWord: {
          en: 'brother',
          emoji: '👦',
          secondEmoji: '👨',
          isTwoCharacters: true,
          highlightIndex: 0,
          heightScale: {
            first: 'short',
            second: 'tall',
          },
          hideCaption: true,
        },
        options: [
          'This is my brother.',
          'This is my dad.',
          'This is my grandpa.',
        ],
        correctIndex: 0,
        hint: {
          ru: 'Стрелка указывает на брата (рядом с папой)',
          lv: 'Bultiņa rāda uz brāli (blakus tētim)',
        },
      },
      {
        id: 'g1_fd_5',
        grade: 1,
        category: 'family',
        prompt: "Who's this?",
        audioText: "Who's this?",
        imageWord: {
          en: 'grandma',
          emoji: '👵',
          secondEmoji: '👧',
          isTwoCharacters: true,
          highlightIndex: 0,
          heightScale: {
            first: 'tall',
            second: 'short',
          },
          hideCaption: true,
        },
        options: [
          'This is my mum.',
          'This is my grandma.',
          'This is my sister.',
        ],
        correctIndex: 1,
        hint: {
          ru: 'Стрелка указывает на бабушку (рядом с сестрой)',
          lv: 'Bultiņa rāda uz vecmāmiņu (blakus māsai)',
        },
      },
      {
        id: 'g1_fd_6',
        grade: 1,
        category: 'family',
        prompt: "Who's this?",
        audioText: "Who's this?",
        imageWord: {
          en: 'grandpa',
          emoji: '👴',
          secondEmoji: '👦',
          isTwoCharacters: true,
          highlightIndex: 0,
          heightScale: {
            first: 'tall',
            second: 'short',
          },
          hideCaption: true,
        },
        options: [
          'This is my brother.',
          'This is my dad.',
          'This is my grandpa.',
        ],
        correctIndex: 2,
        hint: {
          ru: 'Стрелка указывает на дедушку (рядом с братом)',
          lv: 'Bultiņa rāda uz vectētiņu (blakus brālim)',
        },
      },
      {
        id: 'g1_fd_7',
        grade: 1,
        category: 'descriptions',
        prompt: 'Look at the picture:',
        audioText: 'Look at the picture.',
        imageWord: {
          en: 'boy',
          emoji: '👦',
          secondEmoji: '👦',
          isTwoCharacters: true,
          highlightIndex: 0,
          fullBodyHeight: {
            first: { gender: 'boy', height: 'short' },
            second: { gender: 'boy', height: 'tall' },
          },
          hideCaption: true,
        },
        options: [
          "He's short.",
          "She's tall.",
          "He's tall.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Стрелка указывает на мальчика низкого роста',
          lv: 'Bultiņa rāda uz zēnu maza auguma',
        },
      },
      {
        id: 'g1_fd_8',
        grade: 1,
        category: 'descriptions',
        prompt: 'Look at the picture:',
        audioText: 'Look at the picture.',
        imageWord: {
          en: 'girl',
          emoji: '👧',
          secondEmoji: '👧',
          isTwoCharacters: true,
          highlightIndex: 0,
          fullBodyHeight: {
            first: { gender: 'girl', height: 'tall' },
            second: { gender: 'girl', height: 'short' },
          },
          hideCaption: true,
        },
        options: [
          "He's short.",
          "She's tall.",
          "She's short.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Стрелка указывает на девочку высокого роста',
          lv: 'Bultiņa rāda uz meiteni gara auguma',
        },
      },
      {
        id: 'g1_fd_9',
        grade: 1,
        category: 'descriptions',
        prompt: 'Look at the picture:',
        audioText: 'Look at the picture.',
        imageWord: {
          en: 'boy',
          emoji: '👦',
          secondEmoji: '👦',
          isTwoCharacters: true,
          highlightIndex: 0,
          fullBodyHeight: {
            first: { gender: 'boy', height: 'tall' },
            second: { gender: 'boy', height: 'short' },
          },
          hideCaption: true,
        },
        options: [
          "He's tall.",
          "She's tall.",
          "He's short.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Стрелка указывает на мальчика высокого роста',
          lv: 'Bultiņa rāda uz zēnu gara auguma',
        },
      },
      {
        id: 'g1_fd_10',
        grade: 1,
        category: 'descriptions',
        prompt: 'Look at the picture:',
        audioText: 'Look at the picture.',
        imageWord: {
          en: 'girl',
          emoji: '👧',
          secondEmoji: '👧',
          isTwoCharacters: true,
          highlightIndex: 0,
          fullBodyHeight: {
            first: { gender: 'girl', height: 'short' },
            second: { gender: 'girl', height: 'tall' },
          },
          hideCaption: true,
        },
        options: [
          "He's tall.",
          "She's short.",
          "He's short.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Стрелка указывает на девочку невысокого роста',
          lv: 'Bultiņa rāda uz meiteni maza auguma',
        },
      },
      {
        id: 'g1_fd_11',
        grade: 1,
        category: 'descriptions',
        prompt: 'Look at the picture:',
        audioText: 'Look at the picture.',
        imageWord: {
          en: 'boy',
          emoji: '🧒',
          secondEmoji: '👴',
          isTwoCharacters: true,
          highlightIndex: 0,
          hideCaption: true,
        },
        options: [
          "He's young.",
          "She's old.",
          "He's old.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Стрелка указывает на юного мальчика',
          lv: 'Bultiņa rāda uz jauno zēnu',
        },
      },
      {
        id: 'g1_fd_12',
        grade: 1,
        category: 'descriptions',
        prompt: 'Look at the picture:',
        audioText: 'Look at the picture.',
        imageWord: {
          en: 'woman',
          emoji: '👵',
          secondEmoji: '👧',
          isTwoCharacters: true,
          highlightIndex: 0,
          hideCaption: true,
        },
        options: [
          "He's young.",
          "She's old.",
          "She's young.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Стрелка указывает на пожилую женщину',
          lv: 'Bultiņa rāda uz vecu sievieti',
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
          ru: 'Велосипед есть (✓)',
          lv: 'Velosipēds ir (✓)',
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
          ru: 'Воздушного змея нет (❌)',
          lv: 'Pūķa nav (❌)',
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
          ru: 'Собака есть (✓)',
          lv: 'Suns ir (✓)',
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
          ru: 'Кошки нет (❌)',
          lv: 'Kaķa nav (❌)',
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
          ru: 'Карандаш есть (✓)',
          lv: 'Zīmulis ir (✓)',
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
          ru: 'Куклы нет (❌)',
          lv: 'Lelles nav (❌)',
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
          'I can rollerblade.',
        ],
        correctIndex: 0,
        hint: {
          ru: 'Умею бегать (✓)',
          lv: 'Protu skriet (✓)',
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
          ru: 'Не умею кататься на роликах (❌)',
          lv: 'Neprotu skrituļot (❌)',
        },
      },
      {
        id: 'g1_can_9',
        grade: 1,
        category: 'can',
        prompt: 'Choose the correct sentence:',
        audioText: 'I can ride a bike.',
        imageWord: { en: 'ride a bike', emoji: '🚲' },
        isNegated: false,
        badgeType: 'can',
        options: [
          "I can't ride a bike.",
          'I can ride a bike.',
          'I can run.',
        ],
        correctIndex: 1,
        hint: {
          ru: 'Умею кататься на велосипеде (✓)',
          lv: 'Protu braukt ar velosipēdu (✓)',
        },
      },
      {
        id: 'g1_can_10',
        grade: 1,
        category: 'can',
        prompt: 'Choose the correct sentence:',
        audioText: "I can't play football.",
        imageWord: { en: 'play football', emoji: '⚽' },
        isNegated: true,
        badgeType: 'can',
        options: [
          'I can play football.',
          "I can't play football.",
          "I can't play tennis.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Не умею играть в футбол (❌)',
          lv: 'Neprotu spēlēt futbolu (❌)',
        },
      },
      {
        id: 'g1_can_11',
        grade: 1,
        category: 'can',
        prompt: 'Choose the correct sentence:',
        audioText: 'I can ride a horse.',
        imageWord: { en: 'ride a horse', emoji: '🐎' },
        isNegated: false,
        badgeType: 'can',
        options: [
          'I can ride a horse.',
          "I can't ride a horse.",
          'I can run.',
        ],
        correctIndex: 0,
        hint: {
          ru: 'Умею ездить на лошади (✓)',
          lv: 'Protu jāt ar zirgu (✓)',
        },
      },
      {
        id: 'g1_can_12',
        grade: 1,
        category: 'can',
        prompt: 'Choose the correct sentence:',
        audioText: "I can't play tennis.",
        imageWord: { en: 'play tennis', emoji: '🎾' },
        isNegated: true,
        badgeType: 'can',
        options: [
          'I can play tennis.',
          "I can't play tennis.",
          'I can play football.',
        ],
        correctIndex: 1,
        hint: {
          ru: 'Не умею играть в теннис (❌)',
          lv: 'Neprotu spēlēt tenisu (❌)',
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
          ru: 'Люблю котиков (❤️)',
          lv: 'Man patīk kaķi (❤️)',
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
          ru: 'Не люблю собак (❌)',
          lv: 'Man nepatīk suņi (❌)',
        },
      },
      {
        id: 'g1_lc_3',
        grade: 1,
        category: 'likes',
        prompt: 'Choose the correct sentence:',
        audioText: 'I like rabbits.',
        imageWord: { en: 'rabbits', emoji: '🐰' },
        isNegated: false,
        badgeType: 'like',
        options: [
          "I don't like rabbits.",
          'I like rabbits.',
          'I like dogs.',
        ],
        correctIndex: 1,
        hint: {
          ru: 'Люблю кроликов (❤️)',
          lv: 'Man patīk truši (❤️)',
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
          "I don't like snakes.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Не люблю пауков (❌)',
          lv: 'Man nepatīk zirnekļi (❌)',
        },
      },
      {
        id: 'g1_lc_5',
        grade: 1,
        category: 'likes',
        prompt: 'Choose the correct sentence:',
        audioText: 'I like robots.',
        imageWord: { en: 'robots', emoji: '🤖' },
        isNegated: false,
        badgeType: 'like',
        options: [
          'I like robots.',
          "I don't like robots.",
          'I like kites.',
        ],
        correctIndex: 0,
        hint: {
          ru: 'Люблю роботов (❤️)',
          lv: 'Man patīk roboti (❤️)',
        },
      },
      {
        id: 'g1_lc_6',
        grade: 1,
        category: 'likes',
        prompt: 'Choose the correct sentence:',
        audioText: "I don't like snakes.",
        imageWord: { en: 'snakes', emoji: '🐍' },
        isNegated: true,
        badgeType: 'like',
        options: [
          'I like snakes.',
          "I don't like snakes.",
          "I don't like spiders.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Не люблю змей (❌)',
          lv: 'Man nepatīk čūskas (❌)',
        },
      },
      {
        id: 'g1_wc_1',
        grade: 1,
        category: 'colors_and_plurals',
        prompt: 'What colour is it?',
        audioText: 'What colour is it?',
        imageWord: { en: 'book', emoji: '📕', customLabel: 'Book' },
        options: [
          "It's red.",
          "It's blue.",
          "It's yellow.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Какого цвета книга? (красная)',
          lv: 'Kādā krāsā ir grāmata? (sarkana)',
        },
      },
      {
        id: 'g1_wc_2',
        grade: 1,
        category: 'colors_and_plurals',
        prompt: 'What colour is it?',
        audioText: 'What colour is it?',
        imageWord: { en: 'duck', emoji: '🐥', customLabel: 'Duck' },
        options: [
          "It's green.",
          "It's yellow.",
          "It's pink.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Какого цвета утёнок? (жёлтый)',
          lv: 'Kādā krāsā ir pīlēns? (dzeltens)',
        },
      },
      {
        id: 'g1_wc_3',
        grade: 1,
        category: 'colors_and_plurals',
        prompt: 'What colour is it?',
        audioText: 'What colour is it?',
        imageWord: { en: 'snake', emoji: '🐍', customLabel: 'Snake' },
        options: [
          "It's green.",
          "It's purple.",
          "It's brown.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Какого цвета змея? (зелёная)',
          lv: 'Kādā krāsā ir čūska? (zaļa)',
        },
      },
      {
        id: 'g1_wc_4',
        grade: 1,
        category: 'colors_and_plurals',
        prompt: 'What colour is it?',
        audioText: 'What colour is it?',
        imageWord: { en: 'boat', emoji: '⛵', customLabel: 'Boat' },
        options: [
          "It's red.",
          "It's white.",
          "It's blue.",
        ],
        correctIndex: 2,
        hint: {
          ru: 'Какого цвета кораблик? (синий)',
          lv: 'Kādā krāsā ir laiva? (zila)',
        },
      },
      {
        id: 'g1_wc_5',
        grade: 1,
        category: 'colors_and_plurals',
        prompt: 'What colour is it?',
        audioText: 'What colour is it?',
        imageWord: { en: 'kite', emoji: '🪁', customLabel: 'Kite' },
        options: [
          "It's orange.",
          "It's black.",
          "It's green.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Какого цвета воздушный змей? (оранжевый)',
          lv: 'Kādā krāsā ir pūķis? (oranžs)',
        },
      },
      {
        id: 'g1_wc_6',
        grade: 1,
        category: 'colors_and_plurals',
        prompt: 'What colour is it?',
        audioText: 'What colour is it?',
        imageWord: { en: 'doll', emoji: '🪆', customLabel: 'Doll' },
        options: [
          "It's brown.",
          "It's pink.",
          "It's grey.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Какого цвета кукла? (розовая)',
          lv: 'Kādā krāsā ir lelle? (rozā)',
        },
      },
      {
        id: 'g1_wc_7',
        grade: 1,
        category: 'colors_and_plurals',
        prompt: 'What colour is it?',
        audioText: 'What colour is it?',
        imageWord: { en: 'mouse', emoji: '🐁', customLabel: 'Mouse' },
        options: [
          "It's yellow.",
          "It's grey.",
          "It's red.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Какого цвета мышка? (серая)',
          lv: 'Kādā krāsā ir pele? (pelēka)',
        },
      },
      {
        id: 'g1_wc_8',
        grade: 1,
        category: 'colors_and_plurals',
        prompt: 'What colour is it?',
        audioText: 'What colour is it?',
        imageWord: { en: 'teddy', emoji: '🧸', customLabel: 'Teddy' },
        options: [
          "It's brown.",
          "It's purple.",
          "It's black.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Какого цвета мишка? (коричневый)',
          lv: 'Kādā krāsā ir lācītis? (brūns)',
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
          ru: 'Какого цвета утки? (зелёные и коричневые)',
          lv: 'Kādā krāsā ir pīles? (zaļas un brūnas)',
        },
      },
      {
        id: 'g1_col_8',
        grade: 1,
        category: 'colors_and_plurals',
        prompt: 'What colour are the cats?',
        audioText: 'What colour are the cats?',
        imageWord: {
          en: 'cats',
          emoji: '🐱',
          customLabel: 'White & Grey Cats',
        },
        options: [
          "They're pink and blue.",
          "They're white and grey.",
          "They're red and green.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Какого цвета кошки? (белые и серые)',
          lv: 'Kādā krāsā ir kaķi? (balti un pelēki)',
        },
      },
      {
        id: 'g1_col_9',
        grade: 1,
        category: 'colors_and_plurals',
        prompt: 'What colour are the cows?',
        audioText: 'What colour are the cows?',
        imageWord: {
          en: 'cows',
          emoji: '🐮',
          secondEmoji: '🐮',
          customLabel: 'Black & White Cows',
        },
        options: [
          "They're black and white.",
          "They're brown and green.",
          "They're red and blue.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Какого цвета коровы? (чёрные и белые)',
          lv: 'Kādā krāsā ir govis? (melnas un baltas)',
        },
      },
      {
        id: 'g1_col_10',
        grade: 1,
        category: 'colors_and_plurals',
        prompt: 'What colour are the balls?',
        audioText: 'What colour are the balls?',
        imageWord: {
          en: 'balls',
          emoji: '⚽',
          customLabel: 'Red & Green Balls',
        },
        options: [
          "They're blue and yellow.",
          "They're red and green.",
          "They're purple and black.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Какого цвета мячи? (красные и зелёные)',
          lv: 'Kādā krāsā ir bumbas? (sarkanas un zaļas)',
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
          customLabel: 'Blue & Yellow Birds',
        },
        options: [
          "They're blue and yellow.",
          "They're brown and grey.",
          "They're pink and black.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Какого цвета птицы? (синие и жёлтые)',
          lv: 'Kādā krāsā ir putni? (zili un dzelteni)',
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
          customLabel: 'Yellow & Red Pencils',
        },
        options: [
          "They're green and white.",
          "They're yellow and red.",
          "They're black and purple.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Какого цвета карандаши? (жёлтые и красные)',
          lv: 'Kādā krāsā ir zīmuļi? (dzelteni un sarkani)',
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
          'I have legs for breakfast.',
        ],
        correctIndex: 0,
        hint: {
          ru: 'Что у тебя на обед? (паста)',
          lv: 'Kas tev ir pusdienās? (pasta)',
        },
      },
      {
        id: 'g2_m_2',
        grade: 2,
        category: 'meals',
        prompt: 'What do you have for breakfast?',
        audioText: 'What do you have for breakfast?',
        imageWord: { en: 'eggs', emoji: '🍳', customLabel: 'Eggs' },
        options: [
          'I have pasta for lunch.',
          'I have eggs for breakfast.',
          'I have legs for breakfast.',
        ],
        correctIndex: 1,
        hint: {
          ru: 'Что у тебя на завтрак? (яйца)',
          lv: 'Kas tev ir brokastīs? (olas)',
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
          'I have legs for breakfast.',
          'I have apples for lunch.',
        ],
        correctIndex: 0,
        hint: {
          ru: 'Что у тебя на ужин? (курица)',
          lv: 'Kas tev ir vakariņās? (vista)',
        },
      },
      {
        id: 'g2_m_4',
        grade: 2,
        category: 'meals',
        prompt: 'What do you have for breakfast?',
        audioText: 'What do you have for breakfast?',
        imageWord: { en: 'bread and cheese', emoji: '🍞', secondEmoji: '🧀', customLabel: 'Bread & cheese' },
        options: [
          'I have rice for lunch.',
          'I have legs for breakfast.',
          'I have bread and cheese for breakfast.',
        ],
        correctIndex: 2,
        hint: {
          ru: 'Что у тебя на завтрак? (хлеб и сыр)',
          lv: 'Kas tev ir brokastīs? (maize un siers)',
        },
      },
      {
        id: 'g2_m_5',
        grade: 2,
        category: 'meals',
        prompt: 'What do you have for lunch?',
        audioText: 'What do you have for lunch?',
        imageWord: { en: 'sandwiches', emoji: '🥪', customLabel: 'Sandwiches' },
        options: [
          'I have sandwiches for lunch.',
          'I have legs for breakfast.',
          'I have fish for dinner.',
        ],
        correctIndex: 0,
        hint: {
          ru: 'Что у тебя на обед? (сэндвичи)',
          lv: 'Kas tev ir pusdienās? (sviestmaizes)',
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
          ru: 'Любишь бананы? (Да ❤️)',
          lv: 'Vai tev garšo banāni? (Jā ❤️)',
        },
      },
      {
        id: 'g2_dyl_7',
        grade: 2,
        category: 'do_you_like',
        prompt: 'Do you like carrots?',
        audioText: 'Do you like carrots?',
        imageWord: { en: 'carrots', emoji: '🥕' },
        isNegated: true,
        badgeType: 'like',
        options: [
          'Yes, I do.',
          "No, I don't.",
          "No, I can't.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Любишь морковь? (Нет ❌)',
          lv: 'Vai tev garšo burkāni? (Nē ❌)',
        },
      },
      {
        id: 'g2_dyl_8',
        grade: 2,
        category: 'do_you_like',
        prompt: 'Do you like cheese?',
        audioText: 'Do you like cheese?',
        imageWord: { en: 'cheese', emoji: '🧀' },
        isNegated: false,
        badgeType: 'like',
        options: [
          "No, I don't.",
          'Yes, I do.',
          'Yes, I am.',
        ],
        correctIndex: 1,
        hint: {
          ru: 'Любишь сыр? (Да ❤️)',
          lv: 'Vai tev garšo siers? (Jā ❤️)',
        },
      },
      {
        id: 'g2_dyl_9',
        grade: 2,
        category: 'do_you_like',
        prompt: 'Do you like tomatoes?',
        audioText: 'Do you like tomatoes?',
        imageWord: { en: 'tomatoes', emoji: '🍅' },
        isNegated: true,
        badgeType: 'like',
        options: [
          'Yes, I do.',
          "No, I haven't.",
          "No, I don't.",
        ],
        correctIndex: 2,
        hint: {
          ru: 'Любишь помидоры? (Нет ❌)',
          lv: 'Vai tev garšo tomāti? (Nē ❌)',
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
          ru: 'Любишь молоко? (Да ❤️)',
          lv: 'Vai tev garšo piens? (Jā ❤️)',
        },
      },
      {
        id: 'g2_dyl_11',
        grade: 2,
        category: 'do_you_like',
        prompt: 'Do you like apples?',
        audioText: 'Do you like apples?',
        imageWord: { en: 'apples', emoji: '🍎' },
        isNegated: true,
        badgeType: 'like',
        options: [
          'Yes, I do.',
          "No, I don't.",
          "No, I'm not.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Любишь яблоки? (Нет ❌)',
          lv: 'Vai tev garšo āboli? (Nē ❌)',
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
          ru: 'У нас есть глаза',
          lv: 'Mums ir acis',
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
          ru: 'У лошадей нет крыльев',
          lv: 'Zirgiem nav spārnu',
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
          ru: 'У птиц есть крылья',
          lv: 'Putniem ir spārni',
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
          "Cats haven't got legs.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'У рыб нет ног',
          lv: 'Zivīm nav kāju',
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
          ru: 'У нас два уха',
          lv: 'Mums ir divas ausis',
        },
      },
      {
        id: 'g2_whg_6',
        grade: 2,
        category: 'we_have_got',
        prompt: 'Choose the correct sentence:',
        audioText: 'Dogs have got four legs.',
        imageWord: { en: 'dogs', emoji: '🐶', customLabel: 'Four legs' },
        options: [
          "Dogs haven't got legs.",
          'Dogs have got four legs.',
          'Dogs have got wings.',
        ],
        correctIndex: 1,
        hint: {
          ru: 'У собак 4 лапы',
          lv: 'Suņiem ir četras kājas',
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
          ru: 'Ты умеешь плавать? (Да ✓)',
          lv: 'Vai tu proti peldēt? (Jā ✓)',
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
          ru: 'Ты умеешь летать? (Нет ❌)',
          lv: 'Vai tu proti lidot? (Nē ❌)',
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
          ru: 'Птицы умеют летать? (Да ✓)',
          lv: 'Vai putni prot lidot? (Jā ✓)',
        },
      },
      {
        id: 'g2_cyt_10',
        grade: 2,
        category: 'can_they',
        prompt: 'Can rabbits jump?',
        audioText: 'Can rabbits jump?',
        imageWord: { en: 'rabbits', emoji: '🐰' },
        isNegated: false,
        badgeType: 'can',
        options: [
          "No, they can't.",
          'Yes, they can.',
          'Yes, I do.',
        ],
        correctIndex: 1,
        hint: {
          ru: 'Кролики умеют прыгать? (Да ✓)',
          lv: 'Vai truši prot lēkt? (Jā ✓)',
        },
      },
      {
        id: 'g2_cyt_11',
        grade: 2,
        category: 'can_they',
        prompt: 'Can dogs talk?',
        audioText: 'Can dogs talk?',
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
          ru: 'Собаки умеют говорить? (Нет ❌)',
          lv: 'Vai suņi prot runāt? (Nē ❌)',
        },
      },
      {
        id: 'g2_cyt_12',
        grade: 2,
        category: 'can_they',
        prompt: 'Can cats climb?',
        audioText: 'Can cats climb?',
        imageWord: { en: 'cats', emoji: '🐱' },
        isNegated: false,
        badgeType: 'can',
        options: [
          'Yes, they can.',
          "No, they can't.",
          'Yes, I have.',
        ],
        correctIndex: 0,
        hint: {
          ru: 'Кошки умеют лазить? (Да ✓)',
          lv: 'Vai kaķi prot kāpt? (Jā ✓)',
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
          ru: 'Что на тебе надето? (шорты)',
          lv: 'Kas tev ir mugurā? (šorti)',
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
          ru: 'Что на тебе надето? (платье)',
          lv: 'Kas tev ir mugurā? (kleita)',
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
          "I'm wearing a hat.",
          "I'm wearing a jacket.",
        ],
        correctIndex: 2,
        hint: {
          ru: 'Что на тебе надето? (куртка)',
          lv: 'Kas tev ir mugurā? (jaka)',
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
          ru: 'Что на тебе надето? (футболка)',
          lv: 'Kas tev ir mugurā? (T-krekls)',
        },
      },
      {
        id: 'g2_wear_5',
        grade: 2,
        category: 'wearing',
        prompt: 'What are you wearing?',
        audioText: 'What are you wearing?',
        imageWord: { en: 'hat', emoji: '👒', customLabel: 'Hat' },
        options: [
          "I'm wearing shoes.",
          "I'm wearing a hat.",
          "I'm wearing shorts.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Что на тебе надето? (шляпа)',
          lv: 'Kas tev ir mugurā? (cepure)',
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
          ru: 'У неё кудрявые волосы? (Нет, прямые)',
          lv: 'Vai viņai ir cirtaini mati? (Nē, taisni)',
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
          ru: 'У него кудрявые волосы? (Да, кудрявые)',
          lv: 'Vai viņam ir cirtaini mati? (Jā, cirtaini)',
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
          ru: 'У неё длинные волосы? (Да, длинные)',
          lv: 'Vai viņai ir gari mati? (Jā, gari)',
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
          ru: 'У него есть очки? (Да)',
          lv: 'Vai viņam ir brilles? (Jā)',
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
          ru: 'У неё тёмные волосы? (Нет, светлые)',
          lv: 'Vai viņai ir tumši mati? (Nē, gaiši)',
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
          ru: 'У него голубые глаза? (Нет, зелёные)',
          lv: 'Vai viņam ir zilas acis? (Nē, zaļas)',
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
          ru: 'Где книга? (на столе)',
          lv: 'Kur ir grāmata? (uz galda)',
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
          ru: 'Где кошка? (под стулом)',
          lv: 'Kur ir kaķis? (zem krēsla)',
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
          ru: 'Где карандаш? (в пенале)',
          lv: 'Kur ir zīmulis? (penālī)',
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
          ru: 'Где мяч? (под кроватью)',
          lv: 'Kur ir bumba? (zem gultas)',
        },
      },
      {
        id: 'g2_prep_5',
        grade: 2,
        category: 'prepositions',
        prompt: "Where's the apple?",
        audioText: "Where's the apple?",
        imageWord: { en: 'apple on table', emoji: '🍎', secondEmoji: '🪵', customLabel: 'On the table' },
        options: [
          "It's on the table.",
          "It's in the table.",
          "It's under the table.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Где яблоко? (на столе)',
          lv: 'Kur ir ābols? (uz galda)',
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
          ru: 'Где линейка? (в рюкзаке)',
          lv: 'Kur ir lineāls? (somā)',
        },
      },
      {
        id: 'g2_t_7',
        grade: 2,
        category: 'there_is_are',
        prompt: 'Look at the picture:',
        audioText: "There's a kitchen.",
        imageWord: { en: 'kitchen', emoji: '🍳', customLabel: '1 Kitchen' },
        options: [
          "There's a kitchen.",
          'There are two kitchens.',
          "There's a plant.",
        ],
        correctIndex: 0,
        hint: {
          ru: 'Одна кухня (единственное число)',
          lv: 'Viena virtuve (vienskaitlis)',
        },
      },
      {
        id: 'g2_t_8',
        grade: 2,
        category: 'there_is_are',
        prompt: 'Look at the picture:',
        audioText: 'There are two bathrooms.',
        imageWord: { en: 'bathrooms', emoji: '🛁', secondEmoji: '🛁', customLabel: '2 Bathrooms' },
        options: [
          "There are two plants.",
          'There are two bathrooms.',
          "There's a bathroom.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Две ванные комнаты (множественное число)',
          lv: 'Divas vannasistabas (daudzskaitlis)',
        },
      },
      {
        id: 'g2_t_9',
        grade: 2,
        category: 'there_is_are',
        prompt: 'Look at the living room:',
        audioText: 'There are three cushions.',
        imageWord: { en: 'cushions', emoji: '🛋️', secondEmoji: '🛋️ 🛋️' },
        options: [
          "There's three cushions.",
          'There are three cushions.',
          "There's a cushion.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Три подушки (множественное число)',
          lv: 'Trīs spilveni (daudzskaitlis)',
        },
      },
      {
        id: 'g2_t_10',
        grade: 2,
        category: 'there_is_are',
        prompt: 'Look at the bedroom:',
        audioText: "There's a big bed.",
        imageWord: { en: 'bed', emoji: '🛏️' },
        options: [
          "There's a big bed.",
          'There are a big bed.',
          'There are three beds.',
        ],
        correctIndex: 0,
        hint: {
          ru: 'Одна большая кровать (единственное число)',
          lv: 'Viena liela gulta (vienskaitlis)',
        },
      },
      {
        id: 'g2_t_11',
        grade: 2,
        category: 'there_is_are',
        prompt: 'Look at the garden:',
        audioText: 'There are four plants.',
        imageWord: { en: 'plants', emoji: '🪴 🪴', secondEmoji: '🪴 🪴' },
        options: [
          "There's four plants.",
          'There are four plants.',
          "There's a plant.",
        ],
        correctIndex: 1,
        hint: {
          ru: 'Четыре растения (множественное число)',
          lv: 'Četri augi (daudzskaitlis)',
        },
      },
      {
        id: 'g2_t_12',
        grade: 2,
        category: 'there_is_are',
        prompt: 'Look at the bedroom:',
        audioText: "There's a red ball.",
        imageWord: { en: 'ball', emoji: '⚽', customLabel: '1 Red Ball' },
        options: [
          "There's a red ball.",
          'There are a red ball.',
          'There are two balls.',
        ],
        correctIndex: 0,
        hint: {
          ru: 'Один красный мяч (единственное число)',
          lv: 'Viena sarkana bumba (vienskaitlis)',
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
