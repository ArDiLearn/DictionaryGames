import { Grade, LearningCourse, ExamQuestion, ExamPart } from '../types';

export interface ExamSessionData {
  questions: ExamQuestion[];
  currentIndex: number;
  correctCount: number;
  grade: Grade;
  part?: ExamPart;
  course: LearningCourse;
  savedAt: number;
}

const EXAM_SESSION_PREFIX = 'wordymind_exam_session_';
const EXAM_SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export function getExamSessionKey(grade: Grade, course: LearningCourse, part: ExamPart = 'final'): string {
  return `${EXAM_SESSION_PREFIX}${grade}_${part}_${course}`;
}

export function getLegacyExamSessionKey(grade: Grade, course: LearningCourse): string {
  return `${EXAM_SESSION_PREFIX}${grade}_${course}`;
}

/**
 * Persists current in-progress exam state to localStorage with a timestamp.
 */
export function saveExamSession(
  grade: Grade,
  course: LearningCourse,
  data: {
    questions: ExamQuestion[];
    currentIndex: number;
    correctCount: number;
    grade: Grade;
    part?: ExamPart;
    course: LearningCourse;
  },
  part: ExamPart = 'final'
): void {
  try {
    const session: ExamSessionData = {
      ...data,
      part: data.part || part,
      savedAt: Date.now(),
    };
    localStorage.setItem(getExamSessionKey(grade, course, part), JSON.stringify(session));
  } catch (e) {
    console.error('Failed to save exam session:', e);
  }
}

/**
 * Loads exam session from localStorage, checking TTL (24h) and migrating from legacy sessionStorage if present.
 */
export function loadExamSession(
  grade: Grade,
  course: LearningCourse,
  part: ExamPart = 'final'
): ExamSessionData | null {
  const key = getExamSessionKey(grade, course, part);
  const legacyKey = getLegacyExamSessionKey(grade, course);
  try {
    // 1. Try reading from persistent localStorage (specific part or legacy key if final)
    let raw = localStorage.getItem(key);
    if (!raw && part === 'final') {
      raw = localStorage.getItem(legacyKey);
    }

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
            if (part === 'final') localStorage.removeItem(legacyKey);
            return null;
          }
        }
        return parsed as ExamSessionData;
      }
    }

    // 2. Migration fallback: check legacy sessionStorage
    if (typeof sessionStorage !== 'undefined') {
      let legacyRaw = sessionStorage.getItem(key);
      if (!legacyRaw && part === 'final') {
        legacyRaw = sessionStorage.getItem(legacyKey);
      }
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
            part: parsed.part || part,
            savedAt: Date.now(),
          };
          localStorage.setItem(key, JSON.stringify(migrated));
          sessionStorage.removeItem(key);
          if (part === 'final') sessionStorage.removeItem(legacyKey);
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
export function clearExamSession(
  grade: Grade,
  course: LearningCourse,
  part: ExamPart = 'final'
): void {
  const key = getExamSessionKey(grade, course, part);
  const legacyKey = getLegacyExamSessionKey(grade, course);
  try {
    localStorage.removeItem(key);
    if (part === 'final') localStorage.removeItem(legacyKey);
  } catch {}
  try {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem(key);
      if (part === 'final') sessionStorage.removeItem(legacyKey);
    }
  } catch {}
}

/**
 * Checks if there is an exam session currently in progress (currentIndex > 0).
 */
export function hasInProgressExamSession(
  grade: Grade,
  course: LearningCourse,
  part: ExamPart = 'final'
): boolean {
  const session = loadExamSession(grade, course, part);
  return (
    !!session &&
    typeof session.currentIndex === 'number' &&
    session.currentIndex > 0 &&
    session.currentIndex < session.questions.length
  );
}

/**
 * Checks all grades and parts to find the first active exam session.
 */
export function findFirstActiveExamGrade(course: LearningCourse): { grade: Grade; part: ExamPart } | null {
  for (const g of [1, 2, 3, 4] as Grade[]) {
    for (const p of ['part1', 'part2', 'final'] as ExamPart[]) {
      const session = loadExamSession(g, course, p);
      if (session) {
        return { grade: g, part: p };
      }
    }
  }
  return null;
}
