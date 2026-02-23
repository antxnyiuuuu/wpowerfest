import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Mail,
  Phone,
  User,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';
import { FestivalButton } from './components/FestivalButton';
import { FestivalInput } from './components/FestivalInput';
import { FestivalCard } from './components/FestivalCard';
import { registrationService } from './services/registration.service';
import {
  validateEcuadorCedula,
  formatEcuadorCedula,
  validateEmail,
  ERROR_MESSAGES,
} from './utils/validation';
import styles from './ResendQRPage.module.css';

interface FoundUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cedula: string | null;
}

export default function ResendQRPage() {
  const [step, setStep] = useState<'search' | 'edit'>('search');
  const [cedula, setCedula] = useState('');
  const [cedulaError, setCedulaError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [foundUser, setFoundUser] = useState<FoundUser | null>(null);
  const [newEmail, setNewEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  // Handle cedula input with formatting
  const handleCedulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatEcuadorCedula(e.target.value);
    setCedula(formatted);
    if (cedulaError) {
      setCedulaError('');
    }
  };

  // Search user by cedula
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cedula.trim()) {
      setCedulaError(ERROR_MESSAGES.CEDULA_REQUIRED || 'La cédula es requerida');
      return;
    }

    if (!validateEcuadorCedula(cedula)) {
      setCedulaError(ERROR_MESSAGES.CEDULA_INVALID);
      return;
    }

    setIsSearching(true);
    setCedulaError('');

    try {
      const response = await registrationService.searchByCedula(cedula);

      if (response.success && response.data) {
        setFoundUser(response.data);
        setNewEmail(response.data.email);
        setStep('edit');
      } else {
        setCedulaError('No se encontró ningún registro con esta cédula');
      }
    } catch (error) {
      console.error('Error al buscar usuario:', error);
      setCedulaError('No se encontró ningún registro con esta cédula');
    } finally {
      setIsSearching(false);
    }
  };

  // Resend QR with updated email
  const handleResend = async () => {
    if (!newEmail.trim()) {
      setEmailError(ERROR_MESSAGES.EMAIL_REQUIRED);
      return;
    }

    if (!validateEmail(newEmail)) {
      setEmailError(ERROR_MESSAGES.EMAIL_INVALID);
      return;
    }

    if (!foundUser) return;

    setIsResending(true);
    setEmailError('');

    try {
      // Update email if changed
      if (newEmail !== foundUser.email) {
        const updateResponse = await registrationService.updateData(foundUser.id, {
          email: newEmail,
        });

        if (!updateResponse.success) {
          throw new Error('Error al actualizar el correo');
        }
      }

      // Resend QR
      const resendResponse = await registrationService.resendNotifications(foundUser.id);

      if (resendResponse.success) {
        setResendSuccess(true);
      } else {
        throw new Error('Error al reenviar el QR');
      }
    } catch (error) {
      console.error('Error al reenviar QR:', error);
      setEmailError('Error al reenviar el QR. Por favor, intenta de nuevo.');
    } finally {
      setIsResending(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setStep('search');
    setCedula('');
    setCedulaError('');
    setFoundUser(null);
    setNewEmail('');
    setEmailError('');
    setResendSuccess(false);
  };

  return (
    <div className={styles.container}>
      <AnimatePresence mode="wait">
        {step === 'search' && (
          <motion.div
            key="search"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.header}>
              <div className={styles.iconContainer}>
                <Search className={styles.icon} />
              </div>
              <h1 className={styles.title}>Reenviar QR</h1>
              <p className={styles.subtitle}>
                Busca tu registro con tu número de cédula
              </p>
            </div>

            <FestivalCard className={styles.card}>
              <form onSubmit={handleSearch} className={styles.form}>
                <div>
                  <FestivalInput
                    label="Número de Cédula"
                    type="text"
                    placeholder="1234567890"
                    value={cedula}
                    onChange={handleCedulaChange}
                    error={cedulaError}
                    maxLength={10}
                    required
                  />
                  {!cedulaError && (
                    <p className={styles.hint}>
                      Ingresa 10 dígitos de tu cédula ecuatoriana
                    </p>
                  )}
                </div>

                <FestivalButton
                  type="submit"
                  size="lg"
                  fullWidth
                  isLoading={isSearching}
                  disabled={isSearching}
                >
                  {isSearching ? 'Buscando...' : 'Buscar Usuario'}
                  <Search className={styles.buttonIcon} />
                </FestivalButton>
              </form>
            </FestivalCard>
          </motion.div>
        )}

        {step === 'edit' && foundUser && !resendSuccess && (
          <motion.div
            key="edit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.header}>
              <div className={styles.iconContainerViolet}>
                <User className={styles.icon} />
              </div>
              <h1 className={styles.title}>¡Usuario Encontrado!</h1>
              <p className={styles.subtitle}>
                Hola {foundUser.firstName} {foundUser.lastName}
              </p>
            </div>

            <FestivalCard className={styles.cardViolet}>
              <div className={styles.form}>
                {/* User Info Display */}
                <div className={styles.userInfo}>
                  <div className={styles.userDetail}>
                    <div className={styles.userDetailIconMagenta}>
                      <User className={styles.userDetailIcon} />
                    </div>
                    <div>
                      <p className={styles.userDetailLabel}>Nombre Completo</p>
                      <p className={styles.userDetailValue}>
                        {foundUser.firstName} {foundUser.lastName}
                      </p>
                    </div>
                  </div>

                  <div className={styles.userDetail}>
                    <div className={styles.userDetailIconViolet}>
                      <Phone className={styles.userDetailIcon} />
                    </div>
                    <div>
                      <p className={styles.userDetailLabel}>Teléfono</p>
                      <p className={styles.userDetailValue}>{foundUser.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Email Edit Section */}
                <div className={styles.emailSection}>
                  <p className={styles.emailHint}>
                    Modifica tu correo electrónico para reenviar tu código QR:
                  </p>
                  <FestivalInput
                    label="Correo Electrónico"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={newEmail}
                    onChange={(e) => {
                      setNewEmail(e.target.value);
                      if (emailError) {
                        setEmailError('');
                      }
                    }}
                    error={emailError}
                    required
                  />
                </div>

                {/* Action Buttons */}
                <div className={styles.actions}>
                  <FestivalButton
                    variant="ghost"
                    onClick={handleReset}
                    disabled={isResending}
                  >
                    <ArrowLeft className={styles.buttonIcon} />
                    Volver
                  </FestivalButton>
                  <FestivalButton
                    onClick={handleResend}
                    isLoading={isResending}
                    disabled={isResending}
                    fullWidth
                  >
                    {isResending ? 'Reenviando...' : 'Reenviar QR'}
                    <Mail className={styles.buttonIcon} />
                  </FestivalButton>
                </div>
              </div>
            </FestivalCard>
          </motion.div>
        )}

        {resendSuccess && foundUser && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
          >
            <div className={styles.successContainer}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
                className={styles.successIcon}>
                <CheckCircle2 className={styles.successIconSvg} />
              </motion.div>

              <h1 className={styles.title}>¡QR Reenviado!</h1>
              <p className={styles.subtitle}>
                Tu código QR ha sido enviado exitosamente
              </p>

              <FestivalCard className={styles.successCard}>
                <div className={styles.successContent}>
                  <div className={styles.emailBox}>
                    <Mail className={styles.emailIcon} />
                    <p className={styles.emailLabel}>QR enviado a:</p>
                    <p className={styles.emailValue}>{newEmail}</p>
                  </div>

                  <div className={styles.infoBox}>
                    <div className={styles.infoBoxContent}>
                      <AlertCircle className={styles.infoBoxIcon} />
                      <p className={styles.infoBoxText}>
                        Revisa tu bandeja de entrada y carpeta de spam. El correo puede tardar unos minutos en llegar.
                      </p>
                    </div>
                  </div>
                </div>
              </FestivalCard>

              <FestivalButton onClick={handleReset} size="lg">
                <RefreshCw className={styles.buttonIcon} />
                Buscar Otro Usuario
              </FestivalButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
