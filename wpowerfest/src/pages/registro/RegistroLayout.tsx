import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RegistroHeader } from './components/RegistroHeader';
import { RegistroFooter } from './components/RegistroFooter';
import RegistrationPage from './RegistrationPage';
import ResendQRPage from './ResendQRPage';
import styles from './RegistroLayout.module.css';

type View = 'register' | 'resend';

export default function RegistroLayout() {
  const [activeView, setActiveView] = useState<View>('register');

  return (
    <div className={styles.layout}>
      {/* Header */}
      <RegistroHeader activeView={activeView} onViewChange={setActiveView} />

      {/* Main Content */}
      <main className={styles.main}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={styles.content}
          >
            {activeView === 'register' && <RegistrationPage />}
            {activeView === 'resend' && <ResendQRPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <RegistroFooter />
    </div>
  );
}
