import { Grade, LearningCourse } from '../types';

export interface ExamSessionData {
  questions: any[];
  currentIndex: number;
  correctCount: number;
  grade: Grade;
  course: LearningCourse;
  savedAt: number;
}

const EXAM_SESSION_PREFIX = 'wordymind_exam_session_';
const EXAM_SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export function getExamSessionKey(grade: Grade, course: LearningCourse): string {
  return `${EXAM_SESSION_PREFIX}${grade}_${course}`;
}

/**
 * Persists current in-progress exam state to localStorage with a timestamp.
 */
export function saveExamSession(
  grade: Grade,
  course: LearningCourse,
  data: {
    questions: any[];
    currentIndex: number;
    correctCount: number;
    grade: Grade;
    course: LearningCourse;
  }
): void {
  try {
    const session: ExamSessionData = {
      ...data,
      savedAt: Date.now(),
    };
    localStorage.setItem(getExamSessionKey(grade, course), JSON.stringify(session));
  } catch (e) {
    console.error('Failed to save exam session:', e);
  }
}

/**
 * Loads exam session from localStorage, checking TTL (24h) and migrating from legacy sessionStorage if present.
 */
export function loadExamSession(grade: Grade, course: LearningCourse): ExamSessionData | null {
  const key = getExamSessionKey(grade, course);
  try {
    // 1. Try reading from persistent localStorage
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (
        parsed &&
        Array.isArray(parsed.questions) &&
        parsed.questions.length > 0 &&
        typeof parsed.currentIndex === 'number' &&
        parsed.currentIndex < parsed.questions.length
      ) {
        // Validate TTL (24 hours)
        if (parsed.savedAt && typeof parsed.savedAt === 'number') {
          if (Date.now() - parsed.savedAt > EXAM_SESSION_TTL_MS) {
            localStorage.removeItem(key);
            return null;
          }
        }
        return parsed as ExamSessionData;
      }
    }

    // 2. Migration fallback: check legacy sessionStorage
    if (typeof sessionStorage !== 'undefined') {
      const legacyRaw = sessionStorage.getItem(key);
      if (legacyRaw) {
        const parsed = JSON.parse(legacyRaw);
        if (
          parsed &&
          Array.isArray(parsed.questions) &&
          parsed.questions.length > 0 &&
          typeof parsed.currentIndex === 'number' &&
          parsed.currentIndex < parsed.questions.length
        ) {
          const migrated: ExamSessionData = {
            ...parsed,
            savedAt: Date.now(),
          };
          localStorage.setItem(key, JSON.stringify(migrated));
          sessionStorage.removeItem(key);
          return migrated;
        }
      }
    }
  } catch (e) {
    console.error('Failed to load exam session:', e);
  }
  return null;
}

/**
 * Clears exam session from both localStorage and legacy sessionStorage.
 */
export function clearExamSession(grade: Grade, course: LearningCourse): void {
  const key = getExamSessionKey(grade, course);
  try {
    localStorage.removeItem(key);
  } catch {}
  try {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem(key);
    }
  } catch {}
}

/**
 * Checks if there is an exam session currently in progress (currentIndex > 0).
 */
export function hasInProgressExamSession(grade: Grade, course: LearningCourse): boolean {
  const session = loadExamSession(grade, course);
  return (
    !!session &&
    typeof session.currentIndex === 'number' &&
    session.currentIndex > 0 &&
    session.currentIndex < session.questions.length
  );
}

/**
 * Checks all grades to find the first grade with an active exam session.
 */
export function findFirstActiveExamGrade(course: LearningCourse): Grade | null {
  for (const g of [1, 2, 3, 4] as Grade[]) {
    const session = loadExamSession(g, course);
    if (session) {
      return g;
    }
  }
  return null;
}
