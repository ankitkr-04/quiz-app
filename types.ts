export interface QuizOptions {
  categories: string[];
  numQuestions: number;
  difficulty: string;
}
export interface UserFormProps { }
export interface Question {
  category: string;
  id: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  question: {
    text: string;
  };
  tags: string[];
  type: string;
  difficulty: string;
  regions: string[];
  isNiche: boolean;
}

export interface QuestionType {
  text: string;
}

export type QuestionCardProps = {
  question: QuestionType;
  answers: string[];
  selected: string;
  handleCheck: (answer: string) => void;
  handleSelect: (answer: string) => string | undefined;
};

export interface LeaderboardData {
  id: string
  name: string;
  email: string;
  gender: string;
  totalQuestions: number;
  correctAnswers: number;
  avgTime: number;
}

export interface MultiSelectProps {
  options: string[];
  selectedOptions: string[];
  onChange: (selectedOptions: string[]) => void;
}

export interface ResultData {
  totalQuestions: number;
  correct: number;
  totalTime: number;
}

export interface UserDataProps {
  name: string,
  email: string,
  gender: string
}

export type QuizState = {
  curr: number;
  answers: string[];
  selected: string;
  progressValue: number;
  score: number;
  timeLeft: number;
  totalTime: number;
  questionStartTime: number;
};

export type QuizProps = {
  questions: Question[];
  limit: number;
};