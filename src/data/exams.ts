import { Grade, LearningCourse } from '../types';
import {
  GRADE_1_MAIN_TOPICS,
  GRADE_2_MAIN_TOPICS,
  GRADE_3_MAIN_TOPICS,
  GRADE_4_MAIN_TOPICS,
} from './curriculum';

export type ExamPart = 'part1' | 'part2' | 'final';

export interface ExamDefinition {
  id: string; // e.g. '1_part1', '1_part2', '1_final'
  grade: Grade;
  part: ExamPart;
  badge: {
    ru: string;
    lv: string;
  };
  title: {
    ru: string;
    lv: string;
  };
  subtitle: {
    ru: string;
    lv: string;
  };
  description: {
    ru: string;
    lv: string;
  };
  topicsSummary: {
    ru: string;
    lv: string;
  };
  vocabTopicIds: string[];
  grammarTopicIds: string[];
  targetVocabCount: number;
  targetGrammarCount: number;
}

export const EXAM_DEFINITIONS: ExamDefinition[] = [
  // ================= GRADE 1 =================
  {
    id: '1_part1',
    grade: 1,
    part: 'part1',
    badge: {
      ru: '1 полугодие',
      lv: '1. semestris',
    },
    title: {
      ru: '1 класс · Часть 1',
      lv: '1. klase · 1. daļa',
    },
    subtitle: {
      ru: 'Базовые понятия и первые диалоги',
      lv: 'Pamatjēdzieni un pirmie dialogi',
    },
    description: {
      ru: 'Числа 1-10, цвета, школьные принадлежности, классная комната, семья, прилагательные',
      lv: 'Skaitļi 1-10, krāsas, kancelejas piederumi, klase, ģimene, īpašības vārdi',
    },
    topicsSummary: {
      ru: '6 тем лексики + 3 темы грамматики',
      lv: '6 vārdu tēmas + 3 gramatikas tēmas',
    },
    vocabTopicIds: [
      'numbers_1_10',
      'colours',
      'stationery',
      'classroom',
      'family',
      'adjectives',
    ],
    grammarTopicIds: [
      'g1_dialogues',
      'g1_have_got_and_this',
      'g1_family_and_descriptions',
    ],
    targetVocabCount: 18,
    targetGrammarCount: 6,
  },
  {
    id: '1_part2',
    grade: 1,
    part: 'part2',
    badge: {
      ru: '2 полугодие',
      lv: '2. semestris',
    },
    title: {
      ru: '1 класс · Часть 2',
      lv: '1. klase · 2. daļa',
    },
    subtitle: {
      ru: 'Игрушки, животные и предпочтения',
      lv: 'Rotaļlietas, dzīvnieki un intereses',
    },
    description: {
      ru: 'Игрушки, занятия, домашние питомцы, фермерские животные',
      lv: 'Rotaļlietas, aktivitātes, mājdzīvnieki, lauku sētas dzīvnieki',
    },
    topicsSummary: {
      ru: '4 темы лексики + 2 темы грамматики',
      lv: '4 vārdu tēmas + 2 gramatikas tēmas',
    },
    vocabTopicIds: [
      'toys',
      'activities',
      'pets',
      'farm_animals',
    ],
    grammarTopicIds: [
      'g1_have_you_got_and_can',
      'g1_likes_and_colors',
    ],
    targetVocabCount: 18,
    targetGrammarCount: 6,
  },
  {
    id: '1_final',
    grade: 1,
    part: 'final',
    badge: {
      ru: 'Итоговая 🏆',
      lv: 'Gada darbs 🏆',
    },
    title: {
      ru: '1 класс · Итоговая за год',
      lv: '1. klase · Gada noslēgums',
    },
    subtitle: {
      ru: 'Полная проверка всех тем 1 класса',
      lv: 'Visu 1. klases tēmu kopsavilkums',
    },
    description: {
      ru: 'Все основные темы лексики и грамматика первого года обучения',
      lv: 'Visas pirmā mācību gada pamatkursu vārdu un gramatikas tēmas',
    },
    topicsSummary: {
      ru: 'Все темы 1 класса (100% охват программы)',
      lv: 'Visas 1. klases tēmas (100% programmas aptvērums)',
    },
    vocabTopicIds: GRADE_1_MAIN_TOPICS,
    grammarTopicIds: [
      'g1_dialogues',
      'g1_have_got_and_this',
      'g1_family_and_descriptions',
      'g1_have_you_got_and_can',
      'g1_likes_and_colors',
    ],
    targetVocabCount: 24,
    targetGrammarCount: 8,
  },

  // ================= GRADE 2 =================
  {
    id: '2_part1',
    grade: 2,
    part: 'part1',
    badge: {
      ru: '1 полугодие',
      lv: '1. semestris',
    },
    title: {
      ru: '2 класс · Часть 1',
      lv: '2. klase · 1. daļa',
    },
    subtitle: {
      ru: 'Еда, тело и способности',
      lv: 'Ēdiens, ķermenis un prasmes',
    },
    description: {
      ru: 'Еда и напитки, фрукты и овощи, тело, лицо, умения',
      lv: 'Ēdieni un dzērieni, augļi un dārzeņi, ķermenis, seja, prasmes',
    },
    topicsSummary: {
      ru: '5 тем лексики + 2 темы грамматики',
      lv: '5 vārdu tēmas + 2 gramatikas tēmas',
    },
    vocabTopicIds: [
      'food_and_drink',
      'fruit_and_vegetables',
      'body',
      'face',
      'abilities',
    ],
    grammarTopicIds: [
      'g2_meals_and_do_you_like',
      'g2_we_have_got_and_can_they',
    ],
    targetVocabCount: 18,
    targetGrammarCount: 6,
  },
  {
    id: '2_part2',
    grade: 2,
    part: 'part2',
    badge: {
      ru: '2 полугодие',
      lv: '2. semestris',
    },
    title: {
      ru: '2 класс · Часть 2',
      lv: '2. klase · 2. daļa',
    },
    subtitle: {
      ru: 'Одежда, дом и предлоги',
      lv: 'Apģērbs, māja un prievārdi',
    },
    description: {
      ru: 'Одежда, волосы, дома, комнаты',
      lv: 'Apģērbs, mati, māja, istabas',
    },
    topicsSummary: {
      ru: '4 темы лексики + 2 темы грамматики',
      lv: '4 vārdu tēmas + 2 gramatikas tēmas',
    },
    vocabTopicIds: [
      'clothes',
      'hair',
      'at_home',
      'rooms',
    ],
    grammarTopicIds: [
      'g2_clothes_and_appearance',
      'g2_prepositions_and_there_is_are',
    ],
    targetVocabCount: 18,
    targetGrammarCount: 6,
  },
  {
    id: '2_final',
    grade: 2,
    part: 'final',
    badge: {
      ru: 'Итоговая 🏆',
      lv: 'Gada darbs 🏆',
    },
    title: {
      ru: '2 класс · Итоговая за год',
      lv: '2. klase · Gada noslēgums',
    },
    subtitle: {
      ru: 'Полная проверка всех тем 2 класса',
      lv: 'Visu 2. klases tēmu kopsavilkums',
    },
    description: {
      ru: 'Все основные темы лексики и грамматика второго года обучения',
      lv: 'Visas otrā mācību gada pamatkursu vārdu un gramatikas tēmas',
    },
    topicsSummary: {
      ru: 'Все темы 2 класса (100% охват программы)',
      lv: 'Visas 2. klases tēmas (100% programmas aptvērums)',
    },
    vocabTopicIds: GRADE_2_MAIN_TOPICS,
    grammarTopicIds: [
      'g2_meals_and_do_you_like',
      'g2_we_have_got_and_can_they',
      'g2_clothes_and_appearance',
      'g2_prepositions_and_there_is_are',
    ],
    targetVocabCount: 24,
    targetGrammarCount: 8,
  },

  // ================= GRADE 3 =================
  {
    id: '3_part1',
    grade: 3,
    part: 'part1',
    badge: {
      ru: '1 полугодие',
      lv: '1. semestris',
    },
    title: {
      ru: '3 класс · Часть 1',
      lv: '3. klase · 1. daļa',
    },
    subtitle: {
      ru: 'Календарь, алфавит и чувства',
      lv: 'Kalendārs, alfabēts un jūtas',
    },
    description: {
      ru: 'Месяцы, времена года, алфавит, день рождения, чувства',
      lv: 'Mēneši, gadalaiki, alfabēts, dzimšanas diena, jūtas',
    },
    topicsSummary: {
      ru: '4 темы лексики + алфавит и 2 темы грамматики',
      lv: '4 vārdu tēmas + alfabēts un 2 gramatikas tēmas',
    },
    vocabTopicIds: [
      'months',
      'seasons',
      'birthday',
      'feelings',
    ],
    grammarTopicIds: [
      'g3_alphabet',
      'g3_dates_seasons',
      'g3_feelings_pronouns',
    ],
    targetVocabCount: 18,
    targetGrammarCount: 6,
  },
  {
    id: '3_part2',
    grade: 3,
    part: 'part2',
    badge: {
      ru: '2 полугодие',
      lv: '2. semestris',
    },
    title: {
      ru: '3 класс · Часть 2',
      lv: '3. klase · 2. daļa',
    },
    subtitle: {
      ru: 'Город, транспорт, профессии и спорт',
      lv: 'Pilsēta, transports, profesijas un sports',
    },
    description: {
      ru: 'Профессии, транспорт, город, расположение, спорт, активности на перемене',
      lv: 'Profesijas, transports, pilsēta, novietojums, sports, pārtraukuma aktivitātes',
    },
    topicsSummary: {
      ru: '6 тем лексики + 3 темы грамматики',
      lv: '6 vārdu tēmas + 3 gramatikas tēmas',
    },
    vocabTopicIds: [
      'jobs',
      'transport',
      'town',
      'positions',
      'sports',
      'break_time_activities',
    ],
    grammarTopicIds: [
      'g3_jobs_this_these',
      'g3_town_there_is',
      'g3_present_simple',
    ],
    targetVocabCount: 18,
    targetGrammarCount: 6,
  },
  {
    id: '3_final',
    grade: 3,
    part: 'final',
    badge: {
      ru: 'Итоговая 🏆',
      lv: 'Gada darbs 🏆',
    },
    title: {
      ru: '3 класс · Итоговая за год',
      lv: '3. klase · Gada noslēgums',
    },
    subtitle: {
      ru: 'Полная проверка всех тем 3 класса',
      lv: 'Visu 3. klases tēmu kopsavilkums',
    },
    description: {
      ru: 'Все основные темы лексики, алфавит и грамматика третьего года обучения',
      lv: 'Visas trešā mācību gada pamatkursu vārdu un gramatikas tēmas',
    },
    topicsSummary: {
      ru: 'Все темы 3 класса (100% охват программы)',
      lv: 'Visas 3. klases tēmas (100% programmas aptvērums)',
    },
    vocabTopicIds: GRADE_3_MAIN_TOPICS,
    grammarTopicIds: [
      'g3_alphabet',
      'g3_dates_seasons',
      'g3_feelings_pronouns',
      'g3_jobs_this_these',
      'g3_town_there_is',
      'g3_present_simple',
    ],
    targetVocabCount: 24,
    targetGrammarCount: 8,
  },

  // ================= GRADE 4 =================
  {
    id: '4_part1',
    grade: 4,
    part: 'part1',
    badge: {
      ru: '1 полугодие',
      lv: '1. semestris',
    },
    title: {
      ru: '4 класс · Часть 1',
      lv: '4. klase · 1. daļa',
    },
    subtitle: {
      ru: 'Дикие животные и школьные предметы',
      lv: 'Savvaļas dzīvnieki un mācību priekšmeti',
    },
    description: {
      ru: 'Дикие животные, действия диких животных, школьные предметы, занятия',
      lv: 'Savvaļas dzīvnieki, dzīvnieku darbības, mācību priekšmeti, aktivitātes',
    },
    topicsSummary: {
      ru: '4 темы лексики + 2 темы грамматики',
      lv: '4 vārdu tēmas + 2 gramatikas tēmas',
    },
    vocabTopicIds: [
      'wild_animals',
      'wild_animal_actions',
      'school_subjects',
      'activities',
    ],
    grammarTopicIds: [
      'g4_animals_present_simple',
      'g4_present_continuous',
    ],
    targetVocabCount: 18,
    targetGrammarCount: 6,
  },
  {
    id: '4_part2',
    grade: 4,
    part: 'part2',
    badge: {
      ru: '2 полугодие',
      lv: '2. semestris',
    },
    title: {
      ru: '4 класс · Часть 2',
      lv: '4. klase · 2. daļa',
    },
    subtitle: {
      ru: 'Прогулки, еда и творчество',
      lv: 'Pastaigas, ēdiens un radošums',
    },
    description: {
      ru: 'Вещи для прогулки, еда, поделки и творчество, материалы для творчества',
      lv: 'Lietas pastaigai, ēdiens, rokdarbi un radošums, materiāli radošumam',
    },
    topicsSummary: {
      ru: '4 темы лексики + 2 темы грамматики',
      lv: '4 vārdu tēmas + 2 gramatikas tēmas',
    },
    vocabTopicIds: [
      'outdoor_things',
      'food',
      'crafts',
      'arts_and_crafts_materials',
    ],
    grammarTopicIds: [
      'g4_whose_would_you_like',
      'g4_crafts_requests',
    ],
    targetVocabCount: 18,
    targetGrammarCount: 6,
  },
  {
    id: '4_final',
    grade: 4,
    part: 'final',
    badge: {
      ru: 'Итоговая 🏆',
      lv: 'Gada darbs 🏆',
    },
    title: {
      ru: '4 класс · Итоговая за год',
      lv: '4. klase · Gada noslēgums',
    },
    subtitle: {
      ru: 'Полная проверка всех тем 4 класса',
      lv: 'Visu 4. klases tēmu kopsavilkums',
    },
    description: {
      ru: 'Все основные темы лексики и грамматика четвертого года обучения',
      lv: 'Visas ceturtā mācību gada pamatkursu vārdu un gramatikas tēmas',
    },
    topicsSummary: {
      ru: 'Все темы 4 класса (100% охват программы)',
      lv: 'Visas 4. klases tēmas (100% programmas aptvērums)',
    },
    vocabTopicIds: GRADE_4_MAIN_TOPICS,
    grammarTopicIds: [
      'g4_animals_present_simple',
      'g4_present_continuous',
      'g4_whose_would_you_like',
      'g4_crafts_requests',
    ],
    targetVocabCount: 24,
    targetGrammarCount: 8,
  },
];

export function getExamDefinition(grade: Grade, part: ExamPart = 'final'): ExamDefinition {
  const targetId = `${grade}_${part}`;
  const found = EXAM_DEFINITIONS.find((e) => e.id === targetId);
  if (found) return found;
  // Fallback to final of that grade, or first available
  return (
    EXAM_DEFINITIONS.find((e) => e.grade === grade && e.part === 'final') ||
    EXAM_DEFINITIONS[0]
  );
}

export function getExamsForGrade(grade: Grade): ExamDefinition[] {
  return EXAM_DEFINITIONS.filter((e) => e.grade === grade);
}

export function getExamKey(grade: Grade, part: ExamPart = 'final'): string {
  return `${grade}_${part}`;
}

export function parseExamKey(key: string): { grade: Grade; part: ExamPart } {
  const parts = key.split('_');
  const grade = (Number(parts[0]) || 1) as Grade;
  const part = (parts[1] as ExamPart) || 'final';
  return { grade, part };
}

export function getExamTotalQuestionsCount(def: ExamDefinition, course: LearningCourse): number {
  if (course === 'lv') {
    // Latvian course doesn't have English grammar questions
    return def.targetVocabCount + Math.round(def.targetGrammarCount / 2);
  }
  return def.targetVocabCount + def.targetGrammarCount;
}
