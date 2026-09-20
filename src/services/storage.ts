/**
 * Storage orchestrator — backward-compatible public API surface.
 *
 * Architecture layers:
 *   localStorage.ts  → pure I/O adapter (no cloud sync, no business logic)
 *   cloudSync.ts     → triggerCloudSync + mergeWithCloud
 *   progression.ts   → word mastery, topic bonuses, milestones
 *   titles.ts        → title evaluation, equip, gameMode tracking
 *   examSession.ts   → exam session persistence (24h TTL)
 *   storage.ts (this) → business-logic orchestration + re-exports for callers
 *
 * External callers import from 'services/storage' and get the full API surface.
 */
import { LearningCourse, UserStats, ExamResult } from '../types';
import { DEFAULT_UNLOCKED_AVATARS } from '../data/avatars';
import {
  loadLocalStats,
  saveLocalStatsRaw,
  saveTopicProgressRaw,
  saveWordProgressRaw,
  saveExamResultRaw,
  loadExamHistory,
  saveExamHistoryRaw,
} from './localStorage';
import { triggerCloudSync } from './cloudSync';

// --- Re-export pure I/O layer for consumers that import from storage ---
export * from './localStorage';

// --- Re-export cloud sync for consumers ---
export { triggerCloudSync, mergeWithCloud } from './cloudSync';

// --- Domain modules (no circular deps: progression/titles import from localStorage.ts) ---
export * from './progression';
export * from './titles';
export * from './examSession';

// --- Cloud-aware save wrappers (I/O + trigger sync) ---

/**
 * Saves UserStats to localStorage and triggers debounced cloud sync.
 * This is the standard external-facing save function.
 */
export function saveLocalStats(stats: UserStats) {
  saveLocalStatsRaw(stats);
  triggerCloudSync();
}

export function saveTopicProgress(progress: Record<string, import('../types').TopicProgress>, course: LearningCourse = 'en') {
  saveTopicProgressRaw(progress, course);
  triggerCloudSync();
}

export function saveWordProgress(progress: Record<string, import('../types').WordProgress>, course: LearningCourse = 'en') {
  saveWordProgressRaw(progress, course);
  triggerCloudSync();
}

export function saveExamHistory(course: LearningCourse = 'en', history: ExamResult[]) {
  saveExamHistoryRaw(course, history);
}

export function saveExamResult(course: LearningCourse = 'en', result: ExamResult): Record<number, ExamResult> {
  return saveExamResultRaw(course, result);
}

// --- Business logic: Stars economy ---

export function addEarnedStars(starsCount: number): UserStats {
  const currentStats = loadLocalStats();
  const currentTotal = currentStats.totalStarsEarned || 0;
  const newStats: UserStats = {
    ...currentStats,
    totalStarsEarned: currentTotal + starsCount,
  };
  saveLocalStats(newStats);
  return newStats;
}

export function purchaseAvatar(
  avatarEmoji: string,
  price: number,
  totalStarsEarned: number
): { success: boolean; newStats: UserStats } {
  const currentStats = loadLocalStats();
  const spentStars = currentStats.spentStars || 0;
  const total = Math.max(currentStats.totalStarsEarned || 0, totalStarsEarned);
  const availableStars = Math.max(0, total - spentStars);

  if (availableStars < price) {
    return { success: false, newStats: currentStats };
  }

  const unlocked = new Set(currentStats.unlockedAvatars || DEFAULT_UNLOCKED_AVATARS);
  unlocked.add(avatarEmoji);

  const newStats: UserStats = {
    ...currentStats,
    spentStars: spentStars + price,
    totalStarsEarned: total,
    unlockedAvatars: Array.from(unlocked),
    avatar: avatarEmoji,
  };

  saveLocalStats(newStats);
  return { success: true, newStats };
}

export function purchaseVictoryItem(
  type: 'animation' | 'music',
  id: string,
  price: number,
  totalStarsEarned: number
): { success: boolean; newStats: UserStats } {
  const currentStats = loadLocalStats();
  const spentStars = currentStats.spentStars || 0;
  const total = Math.max(currentStats.totalStarsEarned || 0, totalStarsEarned);
  const availableStars = Math.max(0, total - spentStars);

  if (availableStars < price) {
    return { success: false, newStats: currentStats };
  }

  let newStats: UserStats;
  if (type === 'animation') {
    const unlocked = new Set(currentStats.unlockedVictoryAnimations || ['confetti']);
    unlocked.add(id);
    newStats = {
      ...currentStats,
      spentStars: spentStars + price,
      totalStarsEarned: total,
      unlockedVictoryAnimations: Array.from(unlocked),
      equippedVictoryAnimation: id,
    };
  } else {
    const unlocked = new Set(currentStats.unlockedVictoryMusic || ['classic']);
    unlocked.add(id);
    newStats = {
      ...currentStats,
      spentStars: spentStars + price,
      totalStarsEarned: total,
      unlockedVictoryMusic: Array.from(unlocked),
      equippedVictoryMusic: id,
    };
  }

  saveLocalStats(newStats);
  return { success: true, newStats };
}

export function equipVictoryItem(type: 'animation' | 'music', id: string): UserStats {
  const currentStats = loadLocalStats();
  let newStats: UserStats;
  if (type === 'animation') {
    newStats = { ...currentStats, equippedVictoryAnimation: id };
  } else {
    newStats = { ...currentStats, equippedVictoryMusic: id };
  }
  saveLocalStats(newStats);
  return newStats;
}

// --- Business logic: Daily activity ---

export function recordDailyActivity(existingStats?: UserStats): UserStats {
  const stats = existingStats || loadLocalStats();
  const today = new Date().toISOString().split('T')[0];
  let changed = false;

  if (!stats.activeDates || !Array.isArray(stats.activeDates) || stats.activeDates.length === 0) {
    stats.activeDates = [today];
    changed = true;
  } else if (!stats.activeDates.includes(today)) {
    stats.activeDates.push(today);
    changed = true;
  }

  const computedDays = stats.activeDates.length;
  if (stats.totalActiveDays !== computedDays) {
    stats.totalActiveDays = computedDays;
    changed = true;
  }

  if (stats.lastActiveDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (stats.lastActiveDate === yesterday) {
      stats.streak = (stats.streak || 0) + 1;
    } else {
      stats.streak = 1;
    }
    stats.lastActiveDate = today;
    changed = true;
  }

  if (changed) {
    saveLocalStats(stats);
  }

  return stats;
}

// --- Business logic: Exam recording ---

export function recordExamAttempt(
  course: LearningCourse = 'en',
  result: ExamResult
): {
  results: Record<number, ExamResult>;
  history: ExamResult[];
} {
  const updatedResults = saveExamResultRaw(course, result);
  const currentHistory = loadExamHistory(course);
  const newHistory = [result, ...currentHistory.filter((item) => item.completedAt !== result.completedAt)].slice(0, 50);
  saveExamHistoryRaw(course, newHistory);
  triggerCloudSync();
  return { results: updatedResults, history: newHistory };
}
