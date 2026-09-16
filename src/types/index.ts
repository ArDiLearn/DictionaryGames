export type Language = 'ru' | 'lv';
export type LearningCourse = 'en' | 'lv';
export type Grade = 1 | 2 | 3;
export type GradeFilter = '1' | '2' | '3' | 'all';

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
  unlockedAvatars?: string[];
  spentStars?: number;
  totalStarsEarned?: number;
}

export interface AvatarShopItem {
  id: string;
  emoji: string;
  name: {
    ru: string;
    lv: string;
  };
  price: number;
  category: 'starter' | 'simple' | 'medium' | 'unique';
}

export type ExamQuestionType = 'audio' | 'choice' | 'truefalse';

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
