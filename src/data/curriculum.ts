import { Grade } from '../types';

export const EXTRA_TOPICS: string[] = [
  'days_of_the_week',
  'shapes',
  'toy_transport',
  'toys_plus',
  'games_and_music',
  'actions',
  'food_and_drink_plus',
  'fruit_and_vegetables_plus',
  'age_and_people',
  'family_and_friends',
  'art_and_games_plus',
  'character_and_feelings_plus',
  'qualities_plus',
  'wild_animals',
  'nature',
  'garden',
  'building_materials',
  'christmas_and_holidays',
  'circus',
  'positions_plus',
  'at_home_plus',
  'town_plus',
  'friendship',
  'routine_and_time',
  'senses',
  'directions',
  'introductions',
  'instructions_actions',
  'instructions_games_art',
  'instructions_logic_numbers',
  'instructions_teamwork_practice',
  'questions',
  'prepositions_and_place',
  'order_and_quantity',
  'logic_and_answers',
  'school_materials',
  'school_and_lessons',
  'pronouns',
  'other_words',
];

export const GRADE_1_EXTRA_TOPICS: string[] = [
  'days_of_the_week',
  'shapes',
  'toy_transport',
  'toys_plus',
  'games_and_music',
  'actions',
  'introductions',
  'instructions_actions',
  'instructions_games_art',
  'instructions_logic_numbers',
  'instructions_teamwork_practice',
  'questions',
  'prepositions_and_place',
  'order_and_quantity',
  'logic_and_answers',
  'school_materials',
  'school_and_lessons',
  'age_and_people',
  'family_and_friends',
  'art_and_games_plus',
  'character_and_feelings_plus',
  'qualities_plus',
  'nature',
  'pronouns',
  'other_words',
];

export const GRADE_1_MAIN_TOPICS: string[] = [
  'numbers_1_10',
  'numbers_11_20',
  'colours',
  'stationery',
  'classroom',
  'family',
  'adjectives',
  'toys',
  'activities',
  'pets',
  'farm_animals',
];

export const GRADE_2_MAIN_TOPICS: string[] = [
  'food_and_drink',
  'fruit_and_vegetables',
  'body',
  'face',
  'abilities',
  'clothes',
  'hair',
  'at_home',
  'rooms',
];

export const GRADE_3_MAIN_TOPICS: string[] = [
  'months',
  'seasons',
  'birthday',
  'feelings',
  'jobs',
  'transport',
  'town',
  'positions',
  'sports',
  'break_time_activities',
  'wild_animals',
  'wild_animal_actions',
];

export const GRADE_1_TOPIC_ORDER: string[] = [
  ...GRADE_1_MAIN_TOPICS,
  ...GRADE_1_EXTRA_TOPICS,
];

export const GRADE_2_TOPIC_ORDER: string[] = [
  ...GRADE_2_MAIN_TOPICS,
  // Extra topics with new Grade 2 words placed first
  'christmas_and_holidays',
  'circus',
  'positions_plus',
  'at_home_plus',
  'town_plus',
  'friendship',
  'routine_and_time',
  'instructions_actions',
  'instructions_games_art',
  'instructions_logic_numbers',
  'instructions_teamwork_practice',
  'order_and_quantity',
  'logic_and_answers',
  'character_and_feelings_plus',
  'qualities_plus',
  'garden',
  'food_and_drink_plus',
  'fruit_and_vegetables_plus',
  'age_and_people',
  'family_and_friends',
  'wild_animals',
  'nature',
  'building_materials',
  'art_and_games_plus',
  'other_words',
  // Extra topics without new Grade 2 words
  'days_of_the_week',
  'shapes',
  'actions',
  'introductions',
  'questions',
  'prepositions_and_place',
  'school_materials',
  'school_and_lessons',
  'pronouns',
];

export const GRADE_3_TOPIC_ORDER: string[] = [
  ...GRADE_3_MAIN_TOPICS,
  ...EXTRA_TOPICS,
];

export const GRADE_4_MAIN_TOPICS: string[] = [
  'school_subjects',
  'activities',
  'outdoor_things',
  'food',
  'crafts',
  'arts_and_crafts_materials',
];

export const GRADE_4_TOPIC_ORDER: string[] = [
  ...GRADE_4_MAIN_TOPICS,
  ...EXTRA_TOPICS,
];

/**
 * Checks if a topic should be categorized as Extra (Дополнительно)
 * taking into account active grade selection.
 * Specifically: 'feelings' is an extra topic for Grade 1,
 * but when Grade 3 is selected, it moves to Main topics and is removed from Extra!
 */
export function isTopicExtra(topicId: string, selectedGrades: Grade[]): boolean {
  if (topicId === 'feelings') {
    return !selectedGrades.includes(3);
  }
  // wild_animals is extra for Grade 1/2, but main for Grade 3
  if (topicId === 'wild_animals') {
    return !selectedGrades.includes(3);
  }
  return EXTRA_TOPICS.includes(topicId);
}

/**
 * Returns the count of new words in an extra topic for the given selected grades.
 * - Grade 1: 0 (baseline grade, no extra topics are highlighted as new).
 * - Grade 2 (and Grade 3 not selected): count of words with w.grade === 2.
 * - Grade 3: count of words with w.grade === 3 ("в 3ем классе слова из 2го не считаются новыми").
 */
export function getNewWordsCountForGrades(topic: { words: { grade?: number }[] }, selectedGrades: Grade[]): number {
  if (selectedGrades.includes(4)) {
    return topic.words.filter((w) => (w.grade || 1) === 4).length;
  }
  if (selectedGrades.includes(3)) {
    return topic.words.filter((w) => (w.grade || 1) === 3).length;
  }
  if (selectedGrades.includes(2)) {
    return topic.words.filter((w) => (w.grade || 1) === 2).length;
  }
  return 0;
}

/**
 * Checks if an extra topic contains new words for the given selected grades.
 * - Grade 1: no topics are highlighted (baseline grade).
 * - Grade 2 (and Grade 3 not selected): topics containing Grade 2 words (w.grade === 2) are highlighted.
 * - Grade 3: words from Grade 2 are NOT new ("в 3ем классе слова из 2го не считаются новыми"),
 *   only topics containing Grade 3 words (w.grade === 3) are highlighted.
 */
export function hasNewWordsForGrades(topic: { words: { grade?: number }[] }, selectedGrades: Grade[]): boolean {
  return getNewWordsCountForGrades(topic, selectedGrades) > 0;
}

/**
 * Words that are taught as Main topics in Grade 3 (town, jobs, birthday),
 * but also appear in lower-grade extra topics (places, classroom_objects_plus, food_and_drink_plus).
 * When Grade 3 is selected, these duplicate words are removed from extra topics.
 */
export const GRADE_3_EXTRA_DUPLICATES = new Set([
  'park',
  'school',
  'teacher',
  'chocolate',
  'car',
  'train',
  'plane',
  'bus',
  'balloon',
  'happy',
  'tired',
]);

/**
 * Words that are taught as Main topics in Grade 4 (school_subjects, crafts, arts_and_crafts_materials, food),
 * but appear in lower-grade extra topics.
 * When Grade 4 is selected, these duplicate words are removed from extra topics.
 */
export const GRADE_4_EXTRA_DUPLICATES = new Set([
  ...GRADE_3_EXTRA_DUPLICATES,
  'art',
  'music',
  'card',
  'box',
  'puppet',
  'decorations',
  'glue',
  'scissors',
  'grapes',
]);

/**
 * Returns ~65% of words from the main curriculum topics for the given grade:
 * - Grade 1: 97 words in main topics -> ~65% is 63 words
 * - Grade 2: 64 words in main topics -> ~65% is 42 words
 * - Grade 3: 76 words in main topics -> ~65% is 49 words
 */
export function getExamWordsCountForGrade(grade: Grade): number {
  switch (grade) {
    case 1:
      return 63;
    case 2:
      return 42;
    case 3:
      return 49;
    case 4:
      return 31;
    default:
      return 31;
  }
}
