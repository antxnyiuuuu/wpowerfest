import React from 'react';
import clsx from 'clsx';
import type { Answer } from '../../types/trivia.types';

interface AnswerOptionProps {
  answer: Answer;
  selected: boolean;
  onPress: () => void;
}

export const AnswerOption: React.FC<AnswerOptionProps> = ({
  answer,
  selected,
  onPress,
}) => {
  return (
    <button
      onClick={onPress}
      className={clsx(
        'w-full p-5 rounded-lg border-2 text-left transition-all duration-300 transform hover:scale-[1.02] font-mono',
        selected
          ? 'bg-secondary/20 border-secondary text-gray-100 font-semibold'
          : 'border-gray-600 text-gray-300 hover:border-secondary/50'
      )}
      style={
        selected 
          ? {boxShadow: '0 0 20px rgba(88, 166, 255, 0.4)'} 
          : !selected 
            ? {backgroundColor: '#161b22'} 
            : undefined
      }
    >
      <span className="flex items-center gap-3">
        <span className={clsx(
          'flex-shrink-0 transition-all font-mono text-sm',
          selected 
            ? 'text-secondary' 
            : 'text-gray-600'
        )}>
          {selected ? '▶' : '○'}
        </span>
        <span className="text-sm">{answer.text}</span>
      </span>
    </button>
  );
};
