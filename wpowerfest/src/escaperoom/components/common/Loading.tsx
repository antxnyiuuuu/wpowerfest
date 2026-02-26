import React from 'react';

export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-700"></div>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-secondary absolute top-0 left-0"></div>
      </div>
      <p className="text-gray-400 mt-4 font-display tracking-wider font-mono">
        <span className="text-code-green">Loading</span>
        <span className="animate-blink">_</span>
      </p>
    </div>
  );
};
