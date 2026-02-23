import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { FestivalButton } from './components/FestivalButton';
import { FestivalInput } from './components/FestivalInput';
import { FestivalCard } from './components/FestivalCard';
import { EmailInput } from './components/EmailInput';
import { useEventData } from './hooks/useEventData';
import { registrationService } from './services/registration.service';
import {
  validateEcuadorPhone,
  formatEcuadorPhone,
  validateEmail,
  validateName,
  validateEcuadorCedula,
  formatEcuadorCedula,
  validateEdad,
  validateSector,
  ERROR_MESSAGES,
} from './utils/validation';
import {
  User,
  Mail,
  Sparkles,
  RefreshCw,
  Phone,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Dumbbell,
  AlertCircle,
  X
} from 'lucide-react';
import styles from './RegistrationPage.module.css';

// Sport type definition
type Sport = {
  id: string;
  label: string;
  emoji: string;
  color: string;
};

const AVAILABLE_SPORTS: Sport[] = [
  { id: 'correr', label: 'Correr', emoji: '🏃', color: 'magenta' },
  { id: 'nadar', label: 'Nadar', emoji: '🏊', color: 'violet' },
  { id: 'gimnasio', label: 'Gimnasio', emoji: '💪', color: 'yellow' },
  { id: 'baile', label: 'Baile', emoji: '💃', color: 'red' },
  { id: 'futbol', label: 'Futbol', emoji: '⚽', color: 'blue' },
  { id: 'basket', label: 'Basket', emoji: '🏀', color: 'orange' },
  { id: 'ninguno', label: 'Ninguno', emoji: '❌', color: 'gray' }
];

export default function RegistrationPage() {
  const { addRegistration } = useEventData();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  
  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    emailUsername: '',
    emailDomain: '@gmail.com',
    cedula: '',
    edad: '',
    sector: ''
  });
  
  // Validation Errors
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    cedula: '',
    edad: '',
    sector: ''
  });
  
  // Sports selection state
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  
  // Submission State
  const [ticketData, setTicketData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEmailSent, setShowEmailSent] = useState(false);

  // Resend cooldown states
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);

  // Edit mode state
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState({ email: '', phone: '' });
  const [editErrors, setEditErrors] = useState({ email: '', phone: '' });

  // Alternative email modal state
  const [showAltEmailModal, setShowAltEmailModal] = useState(false);
  const [altEmail, setAltEmail] = useState('');
  const [altEmailError, setAltEmailError] = useState('');
  const [isSendingAltEmail, setIsSendingAltEmail] = useState(false);

  // Error modal state
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Policy acceptance state
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);

  // Cooldown timer effect
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Validate form
  const validateForm = (): boolean => {
    const newErrors = {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      cedula: '',
      edad: '',
      sector: ''
    };

    if (!formData.firstName.trim()) {
      newErrors.firstName = ERROR_MESSAGES.NAME_REQUIRED;
    } else if (!validateName(formData.firstName)) {
      newErrors.firstName = ERROR_MESSAGES.NAME_INVALID;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = ERROR_MESSAGES.NAME_REQUIRED;
    } else if (!validateName(formData.lastName)) {
      newErrors.lastName = ERROR_MESSAGES.NAME_INVALID;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = ERROR_MESSAGES.PHONE_REQUIRED;
    } else if (!validateEcuadorPhone(formData.phone)) {
      newErrors.phone = ERROR_MESSAGES.PHONE_INVALID;
    }

    const fullEmail = formData.emailUsername + formData.emailDomain;
    if (!formData.emailUsername.trim()) {
      newErrors.email = ERROR_MESSAGES.EMAIL_REQUIRED;
    } else if (!formData.emailDomain.trim()) {
      newErrors.email = ERROR_MESSAGES.EMAIL_REQUIRED;
    } else if (!validateEmail(fullEmail)) {
      newErrors.email = ERROR_MESSAGES.EMAIL_INVALID;
    }

    if (!formData.cedula.trim()) {
      newErrors.cedula = ERROR_MESSAGES.CEDULA_REQUIRED;
    } else if (!validateEcuadorCedula(formData.cedula)) {
      newErrors.cedula = ERROR_MESSAGES.CEDULA_INVALID;
    }

    if (!formData.edad.trim()) {
      newErrors.edad = ERROR_MESSAGES.EDAD_REQUIRED;
    } else {
      const edadNum = parseInt(formData.edad);
      if (isNaN(edadNum) || !validateEdad(edadNum)) {
        newErrors.edad = ERROR_MESSAGES.EDAD_INVALID;
      }
    }

    if (!formData.sector.trim()) {
      newErrors.sector = ERROR_MESSAGES.SECTOR_REQUIRED;
    } else if (!validateSector(formData.sector)) {
      newErrors.sector = ERROR_MESSAGES.SECTOR_TOO_LONG;
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== '');
  };

  // Handle phone input with formatting
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatEcuadorPhone(e.target.value);
    setFormData({ ...formData, phone: formatted });
    if (errors.phone) {
      setErrors({ ...errors, phone: '' });
    }
  };

  // Handle cedula input with formatting
  const handleCedulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatEcuadorCedula(e.target.value);
    setFormData({ ...formData, cedula: formatted });
    if (errors.cedula) {
      setErrors({ ...errors, cedula: '' });
    }
  };

  // Handle sport selection
  const handleSportToggle = (sportId: string) => {
    if (sportId === 'ninguno') {
      if (selectedSports.includes('ninguno')) {
        setSelectedSports([]);
      } else {
        setSelectedSports(['ninguno']);
      }
    } else {
      if (selectedSports.includes(sportId)) {
        setSelectedSports(selectedSports.filter(id => id !== sportId));
      } else {
        if (selectedSports.length >= 3 && !selectedSports.includes('ninguno')) {
          return;
        }
        const newSelection = selectedSports.filter(id => id !== 'ninguno');
        setSelectedSports([...newSelection, sportId]);
      }
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const sportsLabels = selectedSports.length > 0 
        ? selectedSports.map(id => AVAILABLE_SPORTS.find(s => s.id === id)?.label || '')
        : [];
      const fullEmail = formData.emailUsername + formData.emailDomain;
      
      const newTicket = await addRegistration(
        formData.firstName,
        formData.lastName,
        formData.phone,
        fullEmail,
        sportsLabels,
        formData.cedula,
        parseInt(formData.edad),
        formData.sector
      );

      setTicketData(newTicket);
      setStep(3);

      // Trigger confetti
      const duration = 3000;
      const end = Date.now() + duration;
      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#E91E8C', '#7C3AED', '#FACC15']
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#E91E8C', '#7C3AED', '#FACC15']
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      setTimeout(() => setShowEmailSent(true), 1000);
    } catch (error) {
      console.error('Error al registrar:', error);
      const errorMsg = error instanceof Error ? error.message : 'Error al crear el registro. Por favor, intenta de nuevo.';
      setErrorMessage(errorMsg);
      setShowErrorModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      emailUsername: '',
      emailDomain: '@gmail.com',
      cedula: '',
      edad: '',
      sector: ''
    });
    setErrors({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      cedula: '',
      edad: '',
      sector: ''
    });
    setSelectedSports([]);
    setStep(1);
    setTicketData(null);
    setShowEmailSent(false);
    setResendCooldown(0);
  };

  const nextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setStep(2);
    }
  };

  // Resend handlers
  const handleResend = async () => {
    if (resendCooldown > 0 || !ticketData) return;
    setIsResending(true);
    try {
      const response = await registrationService.resendNotifications(ticketData.id);
      if (response.success) {
        setResendCooldown(60);
        alert('✅ QR reenviado por correo electrónico');
      } else {
        throw new Error(response.error || 'Error al reenviar');
      }
    } catch (error) {
      console.error('Error al reenviar:', error);
      alert('❌ Error al reenviar. Por favor, intenta de nuevo.');
    } finally {
      setIsResending(false);
    }
  };

  const handleOpenAltEmailModal = () => {
    setAltEmail('');
    setAltEmailError('');
    setShowAltEmailModal(true);
  };

  const handleSendAltEmail = async () => {
    if (!altEmail.trim()) {
      setAltEmailError(ERROR_MESSAGES.EMAIL_REQUIRED);
      return;
    }
    if (!validateEmail(altEmail)) {
      setAltEmailError(ERROR_MESSAGES.EMAIL_INVALID);
      return;
    }

    setIsSendingAltEmail(true);
    try {
      const response = await registrationService.sendAltEmail(ticketData.id, altEmail);
      if (response.success) {
        alert('✅ QR enviado al correo alternativo exitosamente');
        setShowAltEmailModal(false);
      } else {
        throw new Error(response.error || 'Error al enviar email');
      }
    } catch (error) {
      console.error('Error al enviar email alternativo:', error);
      alert('❌ Error al enviar email. Por favor, intenta de nuevo.');
    } finally {
      setIsSendingAltEmail(false);
    }
  };

  // Edit handlers
  const handleEditClick = () => {
    setEditData({ email: ticketData.email, phone: ticketData.phone });
    setEditErrors({ email: '', phone: '' });
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditErrors({ email: '', phone: '' });
  };

  const validateEditForm = (): boolean => {
    const newErrors = { email: '', phone: '' };
    if (!editData.phone.trim()) {
      newErrors.phone = ERROR_MESSAGES.PHONE_REQUIRED;
    } else if (!validateEcuadorPhone(editData.phone)) {
      newErrors.phone = ERROR_MESSAGES.PHONE_INVALID;
    }
    if (!editData.email.trim()) {
      newErrors.email = ERROR_MESSAGES.EMAIL_REQUIRED;
    } else if (!validateEmail(editData.email)) {
      newErrors.email = ERROR_MESSAGES.EMAIL_INVALID;
    }
    setEditErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== '');
  };

  const handleSaveEdit = async () => {
    if (!validateEditForm() || !ticketData) return;
    setIsSubmitting(true);
    try {
      const response = await registrationService.updateData(ticketData.id, {
        email: editData.email,
        phone: editData.phone
      });
      if (response.success && response.data) {
        setTicketData({
          ...ticketData,
          email: response.data.email,
          phone: response.data.phone,
          updatedAt: response.data.updatedAt
        });
        setIsEditMode(false);
        setResendCooldown(60);
        alert('✅ Datos actualizados. QR reenviado a tu nuevo correo.');
      } else {
        throw new Error(response.error || 'Error al actualizar datos');
      }
    } catch (error) {
      console.error('Error al actualizar datos:', error);
      alert('Error al actualizar los datos. Por favor, intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatEcuadorPhone(e.target.value);
    setEditData({ ...editData, phone: formatted });
    if (editErrors.phone) {
      setEditErrors({ ...editErrors, phone: '' });
    }
  };

  return (
    <div className={styles.container}>
      {/* Progress Indicator */}
      <div className={styles.progress}>
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`${styles.progressDot} ${step >= s ? styles.progressDotActive : ''}`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 1: Form */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.header}>
              <h1 className={styles.title}>Regístrate en Warmi PowerFest</h1>
              <p className={styles.subtitle}>¡El evento más inspirador del año!</p>
            </div>

            <div className={styles.infoBox}>
              <div className={styles.infoIcon}>
                <Mail className={styles.infoIconSvg} />
              </div>
              <p className={styles.infoText}>
                <strong>Importante:</strong> Asegúrate de ingresar información verificada; recibirás tu código QR de acceso directamente en tu correo electrónico, preséntalo al ingresar al evento y recibir tu Pasaporte Warmi y participa por increíbles premios.
              </p>
            </div>

            <FestivalCard className={styles.formCard}>
              <form onSubmit={nextStep} className={styles.form}>
                <div className={styles.formGrid}>
                  <FestivalInput
                    label="Nombre"
                    placeholder="ej. Alex"
                    value={formData.firstName}
                    onChange={(e) => {
                      setFormData({ ...formData, firstName: e.target.value });
                      if (errors.firstName) setErrors({ ...errors, firstName: '' });
                    }}
                    error={errors.firstName}
                    required
                  />

                  <FestivalInput
                    label="Apellido"
                    placeholder="ej. Rivera"
                    value={formData.lastName}
                    onChange={(e) => {
                      setFormData({ ...formData, lastName: e.target.value });
                      if (errors.lastName) setErrors({ ...errors, lastName: '' });
                    }}
                    error={errors.lastName}
                    required
                  />
                </div>

                <div>
                  <FestivalInput
                    label="Teléfono"
                    type="tel"
                    placeholder="0990900990"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    error={errors.phone}
                    maxLength={10}
                    required
                  />
                  {!errors.phone && (
                    <p className={styles.hint}>Ingresa 10 dígitos, empezando con 09</p>
                  )}
                </div>

                <EmailInput
                  label="Correo Electrónico"
                  username={formData.emailUsername}
                  domain={formData.emailDomain}
                  onUsernameChange={(value) => {
                    setFormData(prev => ({ ...prev, emailUsername: value }));
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  onDomainChange={(value) => {
                    setFormData(prev => ({ ...prev, emailDomain: value }));
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  error={errors.email}
                  required
                />

                <div>
                  <FestivalInput
                    label="Cédula"
                    type="text"
                    placeholder="1234567890"
                    value={formData.cedula}
                    onChange={handleCedulaChange}
                    error={errors.cedula}
                    maxLength={10}
                    required
                  />
                  {!errors.cedula && (
                    <p className={styles.hint}>Ingresa 10 dígitos de tu cédula ecuatoriana</p>
                  )}
                </div>

                <div className={styles.formGrid}>
                  <div>
                    <FestivalInput
                      label="Edad"
                      type="number"
                      placeholder="25"
                      value={formData.edad}
                      onChange={(e) => {
                        setFormData({ ...formData, edad: e.target.value });
                        if (errors.edad) setErrors({ ...errors, edad: '' });
                      }}
                      error={errors.edad}
                      min={5}
                      max={120}
                      required
                    />
                    {!errors.edad && (
                      <p className={styles.hint}>Entre 5 y 120 años</p>
                    )}
                  </div>

                  <div>
                    <FestivalInput
                      label="Sector donde vive"
                      type="text"
                      placeholder="ej. Conocoto, Cumbayá, Carcelén"
                      value={formData.sector}
                      onChange={(e) => {
                        setFormData({ ...formData, sector: e.target.value });
                        if (errors.sector) setErrors({ ...errors, sector: '' });
                      }}
                      error={errors.sector}
                      maxLength={100}
                      required
                    />
                    {!errors.sector && (
                      <p className={styles.hint}>{formData.sector.length}/100 caracteres</p>
                    )}
                  </div>
                </div>

                {/* Policy Acceptance Checkbox */}
                <div className={styles.policyCheckbox}>
                  <label className={styles.policyLabel}>
                    <input
                      type="checkbox"
                      checked={acceptedPolicy}
                      onChange={(e) => setAcceptedPolicy(e.target.checked)}
                      className={styles.policyInput}
                    />
                    <span className={styles.policyText}>
                      Al dar clic en este recuadro aceptas que has leído, comprendido y aprobado la{' '}
                      <a
                        href="/documents/Política de Protección de Datos Personales y Privacidad.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.policyLink}
                      >
                        Política de Protección de datos y privacidad
                      </a>
                      .
                    </span>
                  </label>
                </div>

                <div className={styles.formActions}>
                  <FestivalButton type="submit" size="lg" disabled={!acceptedPolicy}>
                    Siguiente <ArrowRight className={styles.buttonIcon} />
                  </FestivalButton>
                </div>
              </form>
            </FestivalCard>
          </motion.div>
        )}

        {/* STEP 2: Sports Selection */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.header}>
              <h1 className={styles.title}>¿Cuáles son tus deportes favoritos?</h1>
              <p className={styles.subtitle}>Selecciona hasta 3 deportes (opcional)</p>
              {selectedSports.length > 0 && !selectedSports.includes('ninguno') && (
                <p className={styles.sportsCount}>
                  {selectedSports.length}/3 deportes seleccionados
                </p>
              )}
            </div>

            <FestivalCard className={styles.formCard}>
              <div className={styles.sportsList}>
                {AVAILABLE_SPORTS.map((sport) => {
                  const isSelected = selectedSports.includes(sport.id);
                  const isNinguno = sport.id === 'ninguno';
                  const isDisabled = 
                    (isNinguno && selectedSports.length > 0 && !isSelected) ||
                    (!isNinguno && selectedSports.includes('ninguno')) ||
                    (!isSelected && selectedSports.length >= 3 && !selectedSports.includes('ninguno'));

                  return (
                    <label
                      key={sport.id}
                      className={`${styles.sportItem} ${isSelected ? styles.sportItemSelected : ''} ${isDisabled ? styles.sportItemDisabled : ''} ${styles[`sportItem-${sport.color}`]}`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => !isDisabled && handleSportToggle(sport.id)}
                        disabled={isDisabled}
                        className={styles.sportCheckbox}
                      />
                      <span className={styles.sportEmoji}>{sport.emoji}</span>
                      <span className={styles.sportLabel}>{sport.label}</span>
                      {isDisabled && !isSelected && (
                        <span className={styles.sportDisabledLabel}>
                          {isNinguno ? 'Bloqueado' : selectedSports.includes('ninguno') ? 'Bloqueado' : 'Límite alcanzado'}
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </FestivalCard>

            <div className={styles.stepActions}>
              <FestivalButton
                variant="ghost"
                onClick={() => setStep(1)}
                disabled={isSubmitting}
              >
                <ArrowLeft className={styles.buttonIcon} /> Volver
              </FestivalButton>

              <FestivalButton
                onClick={handleSubmit}
                size="lg"
                isLoading={isSubmitting}
              >
                {isSubmitting ? 'Generando...' : 'Completar Registro'}{' '}
                <Sparkles className={styles.buttonIcon} />
              </FestivalButton>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Confirmation */}
        {step === 3 && ticketData && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className={styles.confirmationContainer}
          >
            <div className={styles.header}>
              <h2 className={styles.title}>¡Estás Dentro! 🎟️</h2>
              <p className={styles.subtitle}>Tu entrada fue enviada a tu correo y teléfono.</p>
            </div>

            {/* Ticket */}
            <div className={styles.ticket}>
              <div className={styles.ticketHeader}>
                <div className={styles.ticketHeaderContent}>
                  <span className={styles.ticketBadge}>ENTRADA OFICIAL</span>
                  <h3 className={styles.ticketTitle}>
                    <Dumbbell className={styles.ticketIcon} /> WARMI POWERFEST
                  </h3>
                  <p className={styles.ticketSubtitle}>Válido para una entrada</p>
                </div>
              </div>

              <div className={styles.ticketBody}>
                <div className={styles.ticketDetails}>
                  <div className={styles.ticketDetail}>
                    <div className={styles.ticketDetailIcon}>
                      <User className={styles.ticketDetailIconSvg} />
                    </div>
                    <div>
                      <p className={styles.ticketDetailLabel}>Asistente</p>
                      <p className={styles.ticketDetailValue}>
                        {ticketData.firstName} {ticketData.lastName}
                      </p>
                    </div>
                  </div>

                  <div className={styles.ticketDetail}>
                    <div className={styles.ticketDetailIcon}>
                      <Phone className={styles.ticketDetailIconSvg} />
                    </div>
                    <div>
                      <p className={styles.ticketDetailLabel}>Teléfono</p>
                      <p className={styles.ticketDetailValue}>{ticketData.phone}</p>
                    </div>
                  </div>

                  <div className={styles.ticketDetail}>
                    <div className={styles.ticketDetailIcon}>
                      <Dumbbell className={styles.ticketDetailIconSvg} />
                    </div>
                    <div>
                      <p className={styles.ticketDetailLabel}>Deportes</p>
                      <div className={styles.ticketSports}>
                        {ticketData.sports.map((sport: string) => (
                          <span key={sport} className={styles.ticketSport}>{sport}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className={styles.ticketEditButton}>
                    <button onClick={handleEditClick} className={styles.editButton}>
                      <Mail className={styles.editButtonIcon} />
                      Editar Datos
                    </button>
                  </div>
                </div>

                <div className={styles.ticketQr}>
                  <div className={styles.ticketQrBox}>
                    <div className={styles.ticketQrIcon}>
                      <Mail className={styles.ticketQrIconSvg} />
                    </div>
                    <h3 className={styles.ticketQrTitle}>¡QR Enviado!</h3>
                    <p className={styles.ticketQrText}>
                      Tu código QR ha sido enviado a tu correo electrónico
                    </p>
                    <p className={styles.ticketQrEmail}>{ticketData.email}</p>
                  </div>
                  <p className={styles.ticketId}>ID: {ticketData.id}</p>
                </div>
              </div>
            </div>

            {/* Sending Status */}
            <div className={styles.statusContainer}>
              <AnimatePresence>
                {showEmailSent && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={styles.statusBox}
                  >
                    <div className={styles.statusHeader}>
                      <div className={styles.statusIcon}>
                        <CheckCircle2 className={styles.statusIconSvg} />
                      </div>
                      <div className={styles.statusContent}>
                        <p className={styles.statusText}>
                          QR enviado por correo electrónico a {ticketData.email}
                        </p>
                      </div>
                    </div>

                    <div className={styles.statusActions}>
                      <button onClick={handleOpenAltEmailModal} className={styles.statusAction}>
                        <Mail className={styles.statusActionIcon} />
                        Enviar por otro correo
                      </button>

                      <button
                        onClick={handleResend}
                        disabled={resendCooldown > 0 || isResending}
                        className={`${styles.statusAction} ${resendCooldown > 0 || isResending ? styles.statusActionDisabled : ''}`}
                      >
                        {isResending
                          ? 'Reenviando...'
                          : resendCooldown > 0
                            ? `Reenviar en ${resendCooldown}s`
                            : '¿No te llegó? Reenviar al correo'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div>
              <FestivalButton variant="secondary" onClick={resetForm}>
                <RefreshCw className={styles.buttonIcon} /> Registrar Otra Persona
              </FestivalButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditMode && ticketData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.modal}
            onClick={handleCancelEdit}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={styles.modalContent}
            >
              <h3 className={styles.modalTitle}>Editar Datos</h3>
              <p className={styles.modalSubtitle}>
                Actualiza tu correo o teléfono. Se reenviará el QR a tu correo.
              </p>

              <div className={styles.modalForm}>
                <FestivalInput
                  label="Correo Electrónico"
                  type="email"
                  placeholder="alex@ejemplo.com"
                  value={editData.email}
                  onChange={(e) => {
                    setEditData({ ...editData, email: e.target.value });
                    if (editErrors.email) setEditErrors({ ...editErrors, email: '' });
                  }}
                  error={editErrors.email}
                  required
                />

                <div>
                  <FestivalInput
                    label="Teléfono"
                    type="tel"
                    placeholder="0990900990"
                    value={editData.phone}
                    onChange={handleEditPhoneChange}
                    error={editErrors.phone}
                    maxLength={10}
                    required
                  />
                  {!editErrors.phone && (
                    <p className={styles.hint}>Ingresa 10 dígitos, empezando con 09</p>
                  )}
                </div>
              </div>

              <div className={styles.modalActions}>
                <FestivalButton
                  variant="ghost"
                  onClick={handleCancelEdit}
                  disabled={isSubmitting}
                  fullWidth
                >
                  Cancelar
                </FestivalButton>
                <FestivalButton
                  onClick={handleSaveEdit}
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                  fullWidth
                >
                  {isSubmitting ? 'Guardando...' : 'Guardar y Reenviar'}
                </FestivalButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Alternative Email Modal */}
      <AnimatePresence>
        {showAltEmailModal && ticketData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.modal}
            onClick={() => setShowAltEmailModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={styles.modalContent}
            >
              <div className={styles.modalHeader}>
                <div className={styles.modalHeaderIcon}>
                  <Mail className={styles.modalHeaderIconSvg} />
                </div>
                <div>
                  <h3 className={styles.modalTitle}>Enviar por otro correo</h3>
                  <p className={styles.modalSubtitle}>Ingresa el correo alternativo</p>
                </div>
              </div>

              <div className={styles.modalForm}>
                <FestivalInput
                  label="Correo Electrónico"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={altEmail}
                  onChange={(e) => {
                    setAltEmail(e.target.value);
                    if (altEmailError) setAltEmailError('');
                  }}
                  error={altEmailError}
                  required
                />
              </div>

              <div className={styles.modalActions}>
                <FestivalButton
                  variant="ghost"
                  onClick={() => setShowAltEmailModal(false)}
                  disabled={isSendingAltEmail}
                  fullWidth
                >
                  Cancelar
                </FestivalButton>
                <FestivalButton
                  onClick={handleSendAltEmail}
                  isLoading={isSendingAltEmail}
                  disabled={isSendingAltEmail}
                  fullWidth
                >
                  {isSendingAltEmail ? 'Enviando...' : 'Enviar QR'}
                </FestivalButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Modal */}
      <AnimatePresence>
        {showErrorModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.modal}
            onClick={() => setShowErrorModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={styles.modalContent}
            >
              <button onClick={() => setShowErrorModal(false)} className={styles.modalClose}>
                <X className={styles.modalCloseIcon} />
              </button>

              <div className={styles.errorModalHeader}>
                <div className={styles.errorModalIcon}>
                  <AlertCircle className={styles.errorModalIconSvg} />
                </div>
                <div className={styles.errorModalContent}>
                  <h3 className={styles.modalTitle}>¡Ups! Algo salió mal</h3>
                  <p className={styles.errorModalText}>{errorMessage}</p>
                </div>
              </div>

              {errorMessage.toLowerCase().includes('email') && errorMessage.toLowerCase().includes('registrado') && (
                <div className={styles.errorModalHelp}>
                  <p className={styles.errorModalHelpText}>
                    <strong>¿Ya te registraste antes?</strong> Revisa tu correo electrónico para encontrar tu código QR de acceso.
                  </p>
                </div>
              )}

              {errorMessage.toLowerCase().includes('cédula') && errorMessage.toLowerCase().includes('registrada') && (
                <div className={styles.errorModalHelp}>
                  <p className={styles.errorModalHelpText}>
                    <strong>¿Ya te registraste antes?</strong> Usa la opción "Reenviar QR" en el menú superior para recuperar tu código de acceso.
                  </p>
                </div>
              )}

              <div className={styles.errorModalActions}>
                <FestivalButton onClick={() => setShowErrorModal(false)} fullWidth>
                  Entendido
                </FestivalButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
