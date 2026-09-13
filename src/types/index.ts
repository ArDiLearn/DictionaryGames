export type Language = 'ru' | 'lv';

export interface Word {
  id: string;
  en: string;
  lv: string;
  ru: string;
  transcription?: string;
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

export type GameMode = 'flashcards' | 'quiz' | 'builder' | 'match' | 'audio';

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
}
