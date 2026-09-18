export type Language = 'ru' | 'lv';
export type LearningCourse = 'en' | 'lv';
export type Grade = 1 | 2 | 3 | 4;
export type GradeFilter = '1' | '2' | '3' | '4' | 'all';

export interface Word {
  id: string;
  en: string;
  lv: string;
  ru: string;
  transcription?: string;
  grade?: number;
  image?: string;
}

export interface TopicName {
  ru: string;
  lv: string;
  en?: string;
}

export interface Topic {
  topic_id: string;
  topic_name: TopicName;
  icon?: string;
  color?: string;
  emoji?: string;
  words: Word[];
}

export type GameMode = 'flashcards' | 'builder' | 'match' | 'truefalse' | 'balloons' | 'audio';

export interface TopicProgress {
  topic_id: string;
  stars: number; // 0 to 3
  masteredWordIds: string[];
  lastPlayedAt?: string;
  completedModes?: string[];
}

export interface WordProgress {
  word_id: string;
  topic_id: string;
  timesCorrect: number;
  timesWrong: number;
  isLearned: boolean;
  lastReviewedAt?: string;
}

export interface UserStats {
  playerName: string;
  avatar: string; // emoji or avatar id
  soundEnabled: boolean;
  speechRate: number; // 0.8 to 1.0
  streak: number;
  lastActiveDate: string;
  totalActiveDays?: number;
  activeDates?: string[];
  equippedTitleId?: string;
  unlockedTitleIds?: string[];
  claimedTopicBonusIds?: string[];
  claimedMilestoneIds?: string[];
  playedModes?: GameMode[];
  hasSniperAchieved?: boolean;
  unlockedAvatars?: string[];
  spentStars?: number;
  totalStarsEarned?: number;
}

export type AvatarCategory = 'starter' | 'simple' | 'medium' | 'unique' | 'legendary' | 'mythic';

export interface AvatarVFX {
  bgGradient: string;
  borderClass: string;
  glowClass: string;
  sparkles: string[];
  theme: 'cosmic' | 'astral' | 'supernova' | 'cyber' | 'archmage' | 'solar' | 'kitten' | 'pineapple' | 'capybara';
  cardBg: string;
}

export interface AvatarShopItem {
  id: string;
  emoji: string;
  name: {
    ru: string;
    lv: string;
  };
  price: number;
  category: AvatarCategory;
  vfx?: AvatarVFX;
}

export type TitleCategory = 'academic' | 'words' | 'topics' | 'activity';

export interface PlayerTitle {
  id: string;
  name: {
    ru: string;
    lv: string;
  };
  desc: {
    ru: string;
    lv: string;
  };
  icon: string;
  category: TitleCategory;
}

export type ExamQuestionType = 'audio' | 'choice' | 'truefalse' | 'builder';

export interface ExamResult {
  grade: Grade;
  course: LearningCourse;
  scorePercent: number;
  gradeMark: '5+' | '4' | '3' | null;
  cup: 'gold' | 'silver' | 'bronze' | null;
  correctCount: number;
  totalCount: number;
  starsEarned: number;
  completedAt: string;
}
