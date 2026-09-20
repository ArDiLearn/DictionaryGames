/**
 * Tests for progression.ts: word mastery logic, topic star calculation,
 * topic mastery bonus, and word milestone rewards.
 *
 * localStorage is mocked in-memory — no browser required.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';

// --- localStorage mock ---
function createLocalStorageMock() {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
  };
}

let localStorageMock = createLocalStorageMock();

vi.stubGlobal('localStorage', localStorageMock);

// Mock triggerCloudSync to prevent actual network calls
vi.mock('../src/services/cloudSync', () => ({
  triggerCloudSync: vi.fn(),
}));

import {
  recordWordAttempt,
  checkAndClaimTopicMasteryBonus,
  checkAndClaimWordMilestones,
  WORD_MILESTONES,
} from '../src/services/progression';

beforeEach(() => {
  localStorageMock = createLocalStorageMock();
  vi.stubGlobal('localStorage', localStorageMock);
});

// ─── recordWordAttempt ────────────────────────────────────────────────────────

describe('recordWordAttempt', () => {
  it('returns 0 stars for topic with < 5 words', () => {
    const result = recordWordAttempt('cat', 'animals', true, 3);
    expect(result.stars).toBe(0);
  });

  it('gives 1 star after first word is mastered (2 correct answers) in a 9+ word topic', () => {
    // First correct — timesCorrect=1, not yet learned (needs ≥2 correct AND correct > wrong)
    const r1 = recordWordAttempt('cat', 'animals', true, 10);
    expect(r1.stars).toBe(0); // word not yet learned

    // Second correct — timesCorrect=2 > timesWrong=0 → isLearned=true → star awarded
    const r2 = recordWordAttempt('cat', 'animals', true, 10);
    expect(r2.stars).toBeGreaterThanOrEqual(1);
  });

  it('marks word as newly mastered after 2 correct answers', () => {
    recordWordAttempt('cat', 'animals', true, 10);
    const result2 = recordWordAttempt('cat', 'animals', true, 10);
    expect(result2.newlyMastered).toBe(true);
  });

  it('does not mark as learned if wrong answers exceed correct', () => {
    recordWordAttempt('cat', 'animals', true, 10);
    recordWordAttempt('cat', 'animals', false, 10);
    const result = recordWordAttempt('cat', 'animals', false, 10);
    expect(result.newlyMastered).toBe(false);
  });

  it('caps topic stars at 2 for 5-8 word topics', () => {
    // Fully master a 6-word topic
    const words = ['w1', 'w2', 'w3', 'w4', 'w5', 'w6'];
    // Answer each word correctly twice to mark as learned
    for (const w of words) {
      recordWordAttempt(w, 'small_topic', true, 6);
      recordWordAttempt(w, 'small_topic', true, 6);
    }
    const last = recordWordAttempt('w1', 'small_topic', true, 6);
    expect(last.stars).toBeLessThanOrEqual(2);
  });

  it('progresses stars as words are mastered in a 9-word topic', () => {
    // First mastered word should give 1 star
    recordWordAttempt('a', 'big_topic', true, 9);
    const r1 = recordWordAttempt('a', 'big_topic', true, 9);
    expect(r1.stars).toBe(1);

    // Master 4/9 words → still 1 star (< 50% ratio)
    for (const w of ['b', 'c', 'd']) {
      recordWordAttempt(w, 'big_topic', true, 9);
      recordWordAttempt(w, 'big_topic', true, 9);
    }
    const r4 = recordWordAttempt('d', 'big_topic', true, 9);
    expect(r4.stars).toBe(1);

    // Master 5/9 words → 2 stars (≥ 50% ratio)
    recordWordAttempt('e', 'big_topic', true, 9);
    const r5 = recordWordAttempt('e', 'big_topic', true, 9);
    expect(r5.stars).toBe(2);
  });
});

// ─── checkAndClaimTopicMasteryBonus ──────────────────────────────────────────

describe('checkAndClaimTopicMasteryBonus', () => {
  it('does not claim bonus when topic is not fully mastered', () => {
    // Master only 4/10 words
    for (let i = 0; i < 4; i++) {
      recordWordAttempt(`word_${i}`, 'topic_a', true, 10);
      recordWordAttempt(`word_${i}`, 'topic_a', true, 10);
    }
    const result = checkAndClaimTopicMasteryBonus('topic_a', 10);
    expect(result.claimed).toBe(false);
    expect(result.bonusStars).toBe(0);
  });

  it('claims bonus and returns correct stars when all words mastered in a 15+ word topic', () => {
    const total = 16;
    for (let i = 0; i < total; i++) {
      recordWordAttempt(`w${i}`, 'big_topic_b', true, total);
      recordWordAttempt(`w${i}`, 'big_topic_b', true, total);
    }
    const result = checkAndClaimTopicMasteryBonus('big_topic_b', total);
    expect(result.claimed).toBe(true);
    expect(result.bonusStars).toBe(10); // 15+ word topic → 10 stars
  });

  it('does not claim bonus twice for same topic', () => {
    const total = 6;
    for (let i = 0; i < total; i++) {
      recordWordAttempt(`w${i}`, 'topic_c', true, total);
      recordWordAttempt(`w${i}`, 'topic_c', true, total);
    }
    const first = checkAndClaimTopicMasteryBonus('topic_c', total);
    expect(first.claimed).toBe(true);
    const second = checkAndClaimTopicMasteryBonus('topic_c', total);
    expect(second.claimed).toBe(false);
  });
});

// ─── checkAndClaimWordMilestones ──────────────────────────────────────────────

describe('checkAndClaimWordMilestones', () => {
  it('returns no milestones when no words are mastered', () => {
    const result = checkAndClaimWordMilestones();
    expect(result.claimedMilestones).toHaveLength(0);
    expect(result.totalBonusStars).toBe(0);
  });

  it('claims ms_words_25 milestone after 25 words mastered', () => {
    for (let i = 0; i < 25; i++) {
      recordWordAttempt(`word_${i}`, 'some_topic', true, 30);
      recordWordAttempt(`word_${i}`, 'some_topic', true, 30);
    }
    const result = checkAndClaimWordMilestones();
    const ms25 = result.claimedMilestones.find((m) => m.id === 'ms_words_25');
    expect(ms25).toBeDefined();
    expect(result.totalBonusStars).toBeGreaterThanOrEqual(10);
  });

  it('does not re-claim same milestone on subsequent calls', () => {
    for (let i = 0; i < 25; i++) {
      recordWordAttempt(`word_${i}`, 'some_topic', true, 30);
      recordWordAttempt(`word_${i}`, 'some_topic', true, 30);
    }
    checkAndClaimWordMilestones(); // first claim
    const second = checkAndClaimWordMilestones(); // should be empty
    expect(second.claimedMilestones).toHaveLength(0);
  });

  it('WORD_MILESTONES list is sorted by wordsThreshold ascending', () => {
    const thresholds = WORD_MILESTONES.map((m) => m.wordsThreshold);
    for (let i = 1; i < thresholds.length; i++) {
      expect(thresholds[i]).toBeGreaterThan(thresholds[i - 1]);
    }
  });
});
