import apiClient from './client';
import { ENDPOINTS } from './endpoints';
import type {
  TriviaQuestionsResponse,
  ValidateTriviaInput,
  ValidateTriviaResponse,
} from '../types/trivia.types';

export const triviaApi = {
  getQuestions: async (): Promise<TriviaQuestionsResponse> => {
    const response = await apiClient.get<TriviaQuestionsResponse>(
      ENDPOINTS.GET_QUESTIONS
    );
    return response.data;
  },

  validateAnswers: async (
    data: ValidateTriviaInput
  ): Promise<ValidateTriviaResponse> => {
    const response = await apiClient.post<ValidateTriviaResponse>(
      ENDPOINTS.VALIDATE_TRIVIA,
      data
    );
    return response.data;
  },
};
