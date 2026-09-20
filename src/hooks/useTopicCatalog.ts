import { useMemo } from 'react';
import { Topic, Grade } from '../types';
import {
  GRADE_1_TOPIC_ORDER,
  GRADE_2_TOPIC_ORDER,
  GRADE_3_TOPIC_ORDER,
  GRADE_4_TOPIC_ORDER,
  GRADE_1_MAIN_TOPICS,
  GRADE_2_MAIN_TOPICS,
  GRADE_3_MAIN_TOPICS,
  GRADE_4_MAIN_TOPICS,
  EXTRA_TOPICS,
  isTopicExtra,
  hasNewWordsForGrades,
  GRADE_3_EXTRA_DUPLICATES,
  GRADE_4_EXTRA_DUPLICATES,
} from '../data/curriculum';

interface UseTopicCatalogProps {
  topics: Topic[];
  selectedGrades: Grade[];
  activeExamGrade: Grade | null;
}

export function useTopicCatalog({
  topics,
  selectedGrades,
  activeExamGrade,
}: UseTopicCatalogProps) {
  // Grade filtered topics: supports multi-selection of grades (e.g. [1, 2], [2, 3], [1], [2], [3], [1, 2, 3])
  const filteredTopics = useMemo(() => {
    const gradesSet = new Set(selectedGrades);
    const result = topics
      .map((topic) => {
        const isExtra = isTopicExtra(topic.topic_id, selectedGrades);
        if (!isExtra) {
          return {
            ...topic,
            words: topic.words.filter((w) => {
              const g = (w.grade || 1) as Grade;
              // For feelings when Grade 3 is included, include Grade 1 and 3 words!
              if (topic.topic_id === 'feelings' && gradesSet.has(3)) {
                return g === 1 || g === 3;
              }
              return gradesSet.has(g);
            }),
          };
        }

        // For Extra topics:
        let extraWords = topic.words;

        // When Grade 1 is selected alone: ONLY show Grade 1 words!
        if (selectedGrades.length === 1 && selectedGrades[0] === 1) {
          extraWords = topic.words.filter((w) => (w.grade || 1) === 1);
        } else if (selectedGrades.length === 1 && selectedGrades[0] === 2) {
          // When Grade 2 is selected alone: show Grade 2 words first, then Grade 1 words!
          const g2Words = topic.words.filter((w) => (w.grade || 1) === 2);
          const g1Words = topic.words.filter((w) => (w.grade || 1) === 1);
          extraWords = [...g2Words, ...g1Words];
        } else if (selectedGrades.length === 1 && selectedGrades[0] === 3) {
          // When Grade 3 is selected alone: show Grade 3 words first, then Grade 2, then Grade 1!
          const g3Words = topic.words.filter((w) => (w.grade || 1) === 3);
          const g2Words = topic.words.filter((w) => (w.grade || 1) === 2);
          const g1Words = topic.words.filter((w) => (w.grade || 1) === 1);
          extraWords = [...g3Words, ...g2Words, ...g1Words];
        } else if (selectedGrades.length === 1 && selectedGrades[0] === 4) {
          // When Grade 4 is selected alone: show Grade 4 words first, then 3, then 2, then 1!
          const g4Words = topic.words.filter((w) => (w.grade || 1) === 4);
          const g3Words = topic.words.filter((w) => (w.grade || 1) === 3);
          const g2Words = topic.words.filter((w) => (w.grade || 1) === 2);
          const g1Words = topic.words.filter((w) => (w.grade || 1) === 1);
          extraWords = [...g4Words, ...g3Words, ...g2Words, ...g1Words];
        } else if (gradesSet.has(2)) {
          // When multi-grade including Grade 2:
          const g2Words = topic.words.filter((w) => (w.grade || 1) === 2);
          const g1Words = topic.words.filter((w) => (w.grade || 1) === 1);
          const otherWords = topic.words.filter((w) => (w.grade || 1) !== 1 && (w.grade || 1) !== 2);
          extraWords = [...g2Words, ...g1Words, ...otherWords];
        }

        // When Grade 3 is active/selected, remove Group B duplicates (park, school, teacher, chocolate, happy, tired, etc.) from extra topics!
        if (gradesSet.has(3)) {
          extraWords = extraWords.filter(
            (w) => !GRADE_3_EXTRA_DUPLICATES.has(w.en.toLowerCase().trim())
          );
        }

        // When Grade 4 is active/selected, remove Grade 4 main duplicates from extra topics!
        if (gradesSet.has(4)) {
          extraWords = extraWords.filter(
            (w) => !GRADE_4_EXTRA_DUPLICATES.has(w.en.toLowerCase().trim())
          );
        }

        return {
          ...topic,
          words: extraWords,
        };
      })
      .filter((topic) => topic.words.length > 0);

    // If Grade 1 is selected alone, enforce user-defined topic order
    if (selectedGrades.length === 1 && selectedGrades[0] === 1) {
      return [...result].sort((a, b) => {
        const idxA = GRADE_1_TOPIC_ORDER.indexOf(a.topic_id);
        const idxB = GRADE_1_TOPIC_ORDER.indexOf(b.topic_id);
        const posA = idxA === -1 ? 999 : idxA;
        const posB = idxB === -1 ? 999 : idxB;
        return posA - posB;
      });
    }

    // If Grade 2 is selected alone, enforce user-defined topic order
    if (selectedGrades.length === 1 && selectedGrades[0] === 2) {
      return [...result].sort((a, b) => {
        const idxA = GRADE_2_TOPIC_ORDER.indexOf(a.topic_id);
        const idxB = GRADE_2_TOPIC_ORDER.indexOf(b.topic_id);
        const posA = idxA === -1 ? 999 : idxA;
        const posB = idxB === -1 ? 999 : idxB;
        return posA - posB;
      });
    }

    // If Grade 3 is selected alone, enforce user-defined topic order
    if (selectedGrades.length === 1 && selectedGrades[0] === 3) {
      return [...result].sort((a, b) => {
        const idxA = GRADE_3_TOPIC_ORDER.indexOf(a.topic_id);
        const idxB = GRADE_3_TOPIC_ORDER.indexOf(b.topic_id);
        const posA = idxA === -1 ? 999 : idxA;
        const posB = idxB === -1 ? 999 : idxB;
        return posA - posB;
      });
    }

    // If Grade 4 is selected alone, enforce user-defined topic order
    if (selectedGrades.length === 1 && selectedGrades[0] === 4) {
      return [...result].sort((a, b) => {
        const idxA = GRADE_4_TOPIC_ORDER.indexOf(a.topic_id);
        const idxB = GRADE_4_TOPIC_ORDER.indexOf(b.topic_id);
        const posA = idxA === -1 ? 999 : idxA;
        const posB = idxB === -1 ? 999 : idxB;
        return posA - posB;
      });
    }

    // For multi-grade or all grades: main topics first, then extra topics
    return [...result].sort((a, b) => {
      const isExtraA = isTopicExtra(a.topic_id, selectedGrades);
      const isExtraB = isTopicExtra(b.topic_id, selectedGrades);
      if (isExtraA && !isExtraB) return 1;
      if (!isExtraA && isExtraB) return -1;
      if (isExtraA && isExtraB) {
        if (selectedGrades.some((g) => g >= 2)) {
          const aNew = hasNewWordsForGrades(a, selectedGrades);
          const bNew = hasNewWordsForGrades(b, selectedGrades);
          if (aNew && !bNew) return -1;
          if (!aNew && bNew) return 1;
        }
        return EXTRA_TOPICS.indexOf(a.topic_id) - EXTRA_TOPICS.indexOf(b.topic_id);
      }
      return 0;
    });
  }, [topics, selectedGrades]);

  // Main topics for current active exam grade
  const examTopics = useMemo(() => {
    if (!activeExamGrade) return [];
    const mainTopicIds =
      activeExamGrade === 1
        ? GRADE_1_MAIN_TOPICS
        : activeExamGrade === 2
        ? GRADE_2_MAIN_TOPICS
        : activeExamGrade === 3
        ? GRADE_3_MAIN_TOPICS
        : GRADE_4_MAIN_TOPICS;
    return topics.filter((t) => mainTopicIds.includes(t.topic_id));
  }, [topics, activeExamGrade]);

  return {
    filteredTopics,
    examTopics,
  };
}
