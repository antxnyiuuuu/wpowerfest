import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-50 border border-error rounded-lg p-4">
      <p className="text-error text-sm">{message}</p>
    </div>
  );
};
