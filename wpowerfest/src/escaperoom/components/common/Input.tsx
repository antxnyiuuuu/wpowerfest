import React, { forwardRef } from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="block text-gray-300 font-semibold mb-2 tracking-wide font-mono text-sm">
          <span className="text-code-green">const</span> <span className="text-secondary">{label}</span> <span className="text-gray-500">=</span>
        </label>
        <input
          ref={ref}
          className={clsx(
            'input-field',
            error && 'border-error focus:ring-error',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-error text-sm mt-1 flex items-center gap-1 font-mono">
            <span>⚠</span> {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
