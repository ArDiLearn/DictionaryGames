export type Language = 'ru' | 'lv';
export type Grade = 1 | 2 | 3;
export type GradeFilter = '1' | '2' | '3' | 'all';

export interface Word {
  id: string;
  en: string;
  lv: string;
  ru: string;
  transcription?: string;
  grade?: number;
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
}

export interface AvatarShopItem {
  id: string;
  emoji: string;
  name: {
    ru: string;
    lv: string;
  };
  price: number;
  category: 'starter' | 'animals' | 'magic' | 'heroes';
}
