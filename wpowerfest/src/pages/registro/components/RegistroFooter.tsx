import { motion } from 'framer-motion';
import logoFooter from '../assets/logos/footer-logos.jpeg';
import styles from './RegistroFooter.module.css';

export function RegistroFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.content}
        >
          {/* Logo */}
          <div className={styles.logoContainer}>
            <img
              src={logoFooter}
              alt="Warmi PowerFest"
              className={styles.logo}
            />
          </div>

          {/* Divider */}
          <div className={styles.divider}></div>

          {/* Copyright Text */}
          <div className={styles.textContainer}>
            <p className={styles.copyright}>
              © {currentYear} Warmi PowerFest
            </p>
            <p className={styles.rights}>
              Todos los derechos reservados
            </p>
          </div>

          {/* Links */}
          <div className={styles.links}>
            <button className={styles.link}>
              Términos y Condiciones
            </button>
            <span className={styles.separator}>•</span>
            <button className={styles.link}>
              Política de Privacidad
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
