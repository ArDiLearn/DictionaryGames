/**
 * Tests for examSession.ts: save/load lifecycle, TTL expiry, and migration from sessionStorage.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { ExamQuestion } from '../src/types';

// --- localStorage mock ---
function createLocalStorageMock() {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
    _store: () => store,
  };
}

// --- sessionStorage mock ---
function createSessionStorageMock() {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
    _store: () => store,
  };
}

let lsMock = createLocalStorageMock();
let ssMock = createSessionStorageMock();

vi.stubGlobal('localStorage', lsMock);
vi.stubGlobal('sessionStorage', ssMock);

import {
  saveExamSession,
  loadExamSession,
  clearExamSession,
  hasInProgressExamSession,
  findFirstActiveExamGrade,
  getExamSessionKey,
} from '../src/services/examSession';

// Minimal ExamQuestion mock
const makeQuestion = (id: string): ExamQuestion => ({
  id,
  topicId: 'colors',
  type: 'choice',
  word: { id, en: 'red', lv: 'sarkans', ru: 'красный' },
  options: [{ text: 'sarkans', isCorrect: true }],
});

const SAMPLE_QUESTIONS: ExamQuestion[] = [
  makeQuestion('q1'),
  makeQuestion('q2'),
  makeQuestion('q3'),
];

beforeEach(() => {
  lsMock = createLocalStorageMock();
  ssMock = createSessionStorageMock();
  vi.stubGlobal('localStorage', lsMock);
  vi.stubGlobal('sessionStorage', ssMock);
});

// ─── saveExamSession / loadExamSession ────────────────────────────────────────

describe('saveExamSession / loadExamSession', () => {
  it('saves and loads a session correctly', () => {
    saveExamSession(1, 'en', {
      questions: SAMPLE_QUESTIONS,
      currentIndex: 1,
      correctCount: 1,
      grade: 1,
      course: 'en',
    });
    const session = loadExamSession(1, 'en');
    expect(session).not.toBeNull();
    expect(session!.currentIndex).toBe(1);
    expect(session!.correctCount).toBe(1);
    expect(session!.questions).toHaveLength(3);
  });

  it('returns null if session does not exist', () => {
    expect(loadExamSession(2, 'en')).toBeNull();
  });

  it('returns null when session is expired (> 24h)', () => {
    const expiredSavedAt = Date.now() - 25 * 60 * 60 * 1000; // 25 hours ago
    const key = getExamSessionKey(1, 'en');
    lsMock.setItem(key, JSON.stringify({
      questions: SAMPLE_QUESTIONS,
      currentIndex: 1,
      correctCount: 0,
      grade: 1,
      course: 'en',
      savedAt: expiredSavedAt,
    }));
    expect(loadExamSession(1, 'en')).toBeNull();
  });

  it('loads fresh session within 24h TTL', () => {
    const freshSavedAt = Date.now() - 60 * 1000; // 1 minute ago
    const key = getExamSessionKey(1, 'en');
    lsMock.setItem(key, JSON.stringify({
      questions: SAMPLE_QUESTIONS,
      currentIndex: 2,
      correctCount: 2,
      grade: 1,
      course: 'en',
      savedAt: freshSavedAt,
    }));
    const session = loadExamSession(1, 'en');
    expect(session).not.toBeNull();
    expect(session!.currentIndex).toBe(2);
  });

  it('uses session key format: grade_course', () => {
    expect(getExamSessionKey(3, 'lv')).toContain('3_lv');
  });
});

// ─── clearExamSession ─────────────────────────────────────────────────────────

describe('clearExamSession', () => {
  it('removes session from localStorage', () => {
    saveExamSession(1, 'en', {
      questions: SAMPLE_QUESTIONS,
      currentIndex: 1,
      correctCount: 0,
      grade: 1,
      course: 'en',
    });
    clearExamSession(1, 'en');
    expect(loadExamSession(1, 'en')).toBeNull();
  });
});

// ─── hasInProgressExamSession ─────────────────────────────────────────────────

describe('hasInProgressExamSession', () => {
  it('returns false when no session exists', () => {
    expect(hasInProgressExamSession(1, 'en')).toBe(false);
  });

  it('returns false when currentIndex === 0 (not started)', () => {
    saveExamSession(1, 'en', {
      questions: SAMPLE_QUESTIONS,
      currentIndex: 0,
      correctCount: 0,
      grade: 1,
      course: 'en',
    });
    expect(hasInProgressExamSession(1, 'en')).toBe(false);
  });

  it('returns true when currentIndex > 0 and < questions.length', () => {
    saveExamSession(1, 'en', {
      questions: SAMPLE_QUESTIONS,
      currentIndex: 1,
      correctCount: 1,
      grade: 1,
      course: 'en',
    });
    expect(hasInProgressExamSession(1, 'en')).toBe(true);
  });
});

// ─── findFirstActiveExamGrade ─────────────────────────────────────────────────

describe('findFirstActiveExamGrade', () => {
  it('returns null when no sessions exist', () => {
    expect(findFirstActiveExamGrade('en')).toBeNull();
  });

  it('returns the grade with an active session', () => {
    saveExamSession(2, 'en', {
      questions: SAMPLE_QUESTIONS,
      currentIndex: 1,
      correctCount: 0,
      grade: 2,
      course: 'en',
    });
    expect(findFirstActiveExamGrade('en')).toBe(2);
  });

  it('returns the lowest grade when multiple sessions exist', () => {
    saveExamSession(3, 'en', {
      questions: SAMPLE_QUESTIONS,
      currentIndex: 1,
      correctCount: 0,
      grade: 3,
      course: 'en',
    });
    saveExamSession(1, 'en', {
      questions: SAMPLE_QUESTIONS,
      currentIndex: 1,
      correctCount: 0,
      grade: 1,
      course: 'en',
    });
    expect(findFirstActiveExamGrade('en')).toBe(1);
  });

  it('does not return session for different course', () => {
    saveExamSession(1, 'lv', {
      questions: SAMPLE_QUESTIONS,
      currentIndex: 1,
      correctCount: 0,
      grade: 1,
      course: 'lv',
    });
    expect(findFirstActiveExamGrade('en')).toBeNull();
  });
});
