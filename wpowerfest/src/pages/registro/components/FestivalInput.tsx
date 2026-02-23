import React from 'react';
import { motion } from 'framer-motion';
import styles from './FestivalInput.module.css';

interface FestivalInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
  label: string;
  error?: string;
  as?: 'input' | 'select';
  children?: React.ReactNode;
}

export function FestivalInput({
  label,
  error,
  as = 'input',
  className = '',
  children,
  ...props
}: FestivalInputProps) {
  const inputClass = `${styles.input} ${error ? styles.error : ''} ${className}`;

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <motion.div initial={false} whileFocus={{ scale: 1.01 }}>
        {as === 'select' ? (
          <select className={inputClass} {...(props as any)}>
            {children}
          </select>
        ) : (
          <input className={inputClass} {...props} />
        )}
      </motion.div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.errorMessage}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
