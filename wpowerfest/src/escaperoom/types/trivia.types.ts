export interface Answer {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  order: number;
  answers: Answer[];
}

export interface TriviaQuestionsResponse {
  success: boolean;
  data: Question[];
}

export interface TriviaAnswer {
  questionId: string;
  answerId: string;
}

export interface ValidateTriviaInput {
  userId: string;
  answers: TriviaAnswer[];
}

export interface ValidateTriviaResponse {
  success: boolean;
  data: {
    correct: boolean;
    message: string;
  };
}
