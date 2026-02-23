import { motion } from 'framer-motion';
import { Ticket, RotateCcw } from 'lucide-react';
import logoHeader from '../assets/logos/logo-header.jpeg';
import styles from './RegistroHeader.module.css';

interface RegistroHeaderProps {
  activeView: 'register' | 'resend';
  onViewChange: (view: 'register' | 'resend') => void;
}

export function RegistroHeader({ activeView, onViewChange }: RegistroHeaderProps) {
  const tabs = [
    {
      id: 'register' as const,
      label: 'Registro',
      icon: Ticket
    },
    {
      id: 'resend' as const,
      label: 'Reenviar QR',
      icon: RotateCcw
    }
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Logo */}
          <div className={styles.logoContainer}>
            <img 
              src={logoHeader} 
              alt="Warmi PowerFest Logo" 
              className={styles.logo}
            />
          </div>

          {/* Tabs */}
          <div className={styles.tabs}>
            {tabs.map((tab) => {
              const isActive = activeView === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onViewChange(tab.id)}
                  className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
                >
                  <Icon className={`${styles.tabIcon} ${isActive ? styles.tabIconActive : ''}`} />
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className={styles.tabIndicator}
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
