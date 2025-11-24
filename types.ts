export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  OPEN = 'OPEN',
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: string[];
  correctAnswerIndex: number; // 0 for a, 1 for b, 2 for c
}

export interface QuizVariant {
  id: number;
  questions: QuizQuestion[];
}

export interface StationQuestion {
  id: string;
  title: string;
  question: string;
  type: QuestionType;
  options?: string[];
  correctAnswer?: string; // For exact match checking on buttons
  rewardWord: string;
  placeholder?: string;
  wrongReward?: string; // Text to show in password slot if answered incorrectly
}

export enum AppRoute {
  HOME = 'HOME',
  STATIONS = 'STATIONS',
  YA_QUIZ = 'YA_QUIZ',
  CHAT = 'CHAT',
}