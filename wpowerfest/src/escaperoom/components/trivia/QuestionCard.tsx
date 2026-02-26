import React from 'react';
import type { Question } from '../../types/trivia.types';
import { AnswerOption } from './AnswerOption';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string | null;
  onSelectAnswer: (answerId: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
}) => {
  return (
    <div>
      <div className="terminal-window mb-6">
        <div className="terminal-header">
          <div className="terminal-dot bg-error"></div>
          <div className="terminal-dot bg-warning"></div>
          <div className="terminal-dot bg-success"></div>
          <span className="text-xs text-gray-500 ml-2 font-mono">question.js</span>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-display font-bold text-gray-100 leading-relaxed font-mono">
            <span className="text-code-green">{'// '}</span>{question.text}
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        {question.answers.map((answer) => (
          <AnswerOption
            key={answer.id}
            answer={answer}
            selected={selectedAnswer === answer.id}
            onPress={() => onSelectAnswer(answer.id)}
          />
        ))}
      </div>
    </div>
  );
};
