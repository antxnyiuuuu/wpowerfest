import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QRCode from 'qrcode';
import {
  Search,
  QrCode,
  User,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';
import { FestivalButton } from './components/FestivalButton';
import { FestivalInput } from './components/FestivalInput';
import { FestivalCard } from './components/FestivalCard';
import { registrationService } from './services/registration.service';
import {
  validateEcuadorCedula,
  formatEcuadorCedula,
  ERROR_MESSAGES,
} from './utils/validation';
import styles from './ViewQRPage.module.css';

interface FoundUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cedula: string | null;
  sports: string[];
}

export default function ViewQRPage() {
  const [step, setStep] = useState<'search' | 'view'>('search');
  const [cedula, setCedula] = useState('');
  const [cedulaError, setCedulaError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [foundUser, setFoundUser] = useState<FoundUser | null>(null);
  const [qrCodeImage, setQrCodeImage] = useState<string>('');
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);

  // Generate QR code when user is found
  useEffect(() => {
    if (foundUser && step === 'view') {
      generateQRCode(foundUser.id);
    }
  }, [foundUser, step]);

  // Generate QR code from user ID
  const generateQRCode = async (userId: string) => {
    setIsGeneratingQR(true);
    try {
      const qrDataURL = await QRCode.toDataURL(userId, {
        width: 400,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodeImage(qrDataURL);
    } catch (error) {
      console.error('Error generando QR:', error);
    } finally {
      setIsGeneratingQR(false);
    }
  };

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
        setStep('view');
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

  // Reset form
  const handleReset = () => {
    setStep('search');
    setCedula('');
    setCedulaError('');
    setFoundUser(null);
    setQrCodeImage('');
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
                <QrCode className={styles.icon} />
              </div>
              <h1 className={styles.title}>Ver mi Código QR</h1>
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
                  {isSearching ? 'Buscando...' : 'Buscar mi QR'}
                  <Search className={styles.buttonIcon} />
                </FestivalButton>
              </form>
            </FestivalCard>
          </motion.div>
        )}

        {step === 'view' && foundUser && (
          <motion.div
            key="view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.header}>
              <div className={styles.iconContainerSuccess}>
                <CheckCircle2 className={styles.icon} />
              </div>
              <h1 className={styles.title}>¡Registro Encontrado!</h1>
              <p className={styles.subtitle}>
                Hola {foundUser.firstName} {foundUser.lastName}
              </p>
            </div>

            <FestivalCard className={styles.cardSuccess}>
              <div className={styles.qrSection}>
                {/* User Info */}
                <div className={styles.userInfo}>
                  <div className={styles.userDetail}>
                    <div className={styles.userDetailIcon}>
                      <User className={styles.userDetailIconSvg} />
                    </div>
                    <div>
                      <p className={styles.userDetailLabel}>Nombre Completo</p>
                      <p className={styles.userDetailValue}>
                        {foundUser.firstName} {foundUser.lastName}
                      </p>
                    </div>
                  </div>
                </div>

                {/* QR Code Display */}
                <div className={styles.qrContainer}>
                  <h3 className={styles.qrTitle}>Tu Código QR de Acceso</h3>
                  
                  {isGeneratingQR ? (
                    <div className={styles.qrLoading}>
                      <div className={styles.spinner}></div>
                      <p>Generando QR...</p>
                    </div>
                  ) : qrCodeImage ? (
                    <div className={styles.qrImageWrapper}>
                      <img 
                        src={qrCodeImage} 
                        alt="Código QR de acceso" 
                        className={styles.qrImage}
                      />
                      <p className={styles.qrCaption}>
                        <strong>Presenta este código en la entrada del evento</strong>
                      </p>
                      <p className={styles.qrId}>ID: {foundUser.id}</p>
                    </div>
                  ) : (
                    <div className={styles.qrError}>
                      <AlertCircle className={styles.qrErrorIcon} />
                      <p>Error al generar el código QR</p>
                    </div>
                  )}
                </div>

                {/* Info Box */}
                <div className={styles.infoBox}>
                  <div className={styles.infoBoxContent}>
                    <AlertCircle className={styles.infoBoxIcon} />
                    <p className={styles.infoBoxText}>
                      También puedes encontrar este código QR en el correo que te enviamos a: <strong>{foundUser.email}</strong>
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className={styles.actions}>
                  <FestivalButton
                    variant="ghost"
                    onClick={handleReset}
                    fullWidth
                  >
                    <ArrowLeft className={styles.buttonIcon} />
                    Buscar Otro Registro
                  </FestivalButton>
                </div>
              </div>
            </FestivalCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
