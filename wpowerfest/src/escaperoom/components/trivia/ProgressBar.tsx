import React from 'react';

interface ProgressBarProps {
  progress: number; // 0-100
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs text-gray-500 font-mono">Progress:</span>
        <span className="text-xs text-secondary font-mono font-bold">{Math.round(progress)}%</span>
      </div>
      <div className="w-full h-3 rounded-full border border-gray-700 overflow-hidden" style={{backgroundColor: '#161b22'}}>
        <div
          className="h-full bg-gradient-to-r from-secondary to-code-green rounded-full transition-all duration-500"
          style={{ 
            width: `${progress}%`,
            boxShadow: '0 0 20px rgba(88, 166, 255, 0.5)'
          }}
        />
      </div>
    </div>
  );
};
