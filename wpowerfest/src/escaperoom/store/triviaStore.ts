import { create } from 'zustand';
import type { Question, TriviaAnswer } from '../types/trivia.types';

interface TriviaState {
  questions: Question[];
  answers: TriviaAnswer[];
  currentIndex: number;
  setQuestions: (questions: Question[]) => void;
  addAnswer: (answer: TriviaAnswer) => void;
  nextQuestion: () => void;
  resetTrivia: () => void;
}

export const useTriviaStore = create<TriviaState>((set) => ({
  questions: [],
  answers: [],
  currentIndex: 0,
  setQuestions: (questions) => set({ questions }),
  addAnswer: (answer) =>
    set((state) => ({ answers: [...state.answers, answer] })),
  nextQuestion: () =>
    set((state) => ({ currentIndex: state.currentIndex + 1 })),
  resetTrivia: () => set({ questions: [], answers: [], currentIndex: 0 }),
}));
