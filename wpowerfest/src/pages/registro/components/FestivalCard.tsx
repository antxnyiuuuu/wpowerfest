import React from 'react';
import { motion } from 'framer-motion';
import styles from './FestivalCard.module.css';

interface FestivalCardProps {
  children: React.ReactNode;
  className?: string;
  accent?: 'magenta' | 'violet' | 'yellow' | 'none';
  delay?: number;
  hoverEffect?: boolean;
}

export function FestivalCard({
  children,
  className = '',
  accent = 'none',
  delay = 0,
  hoverEffect = false,
}: FestivalCardProps) {
  const accentClass = accent !== 'none' ? styles[`accent-${accent}`] : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={
        hoverEffect
          ? {
              y: -5,
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            }
          : {}
      }
      className={`${styles.card} ${accentClass} ${className}`}
    >
      {children}
    </motion.div>
  );
}
