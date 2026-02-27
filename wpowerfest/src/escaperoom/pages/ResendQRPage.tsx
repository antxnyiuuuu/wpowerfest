import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { reservationApi } from '../api/reservation.api';
import { timeslotApi } from '../api/timeslot.api';
import { userApi } from '../api/user.api';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { maskEmail, maskWhatsapp, calculateDuration, getTodayInEcuador } from '../utils/formatters';
import type { User } from '../types/user.types';
import type { TimeSlot } from '../types/timeslot.types';

export const ResendQRPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [userFound, setUserFound] = useState<User | null>(null);
  const [successMessage, setSuccessMessage] = useState<{ 
    email: string; 
    whatsapp: string;
    partnerEmail?: string;
    partnerWhatsapp?: string;
  } | null>(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newWhatsapp, setNewWhatsapp] = useState('');
  const [newPartnerEmail, setNewPartnerEmail] = useState('');
  const [newPartnerWhatsapp, setNewPartnerWhatsapp] = useState('');
  const [timeslots, setTimeslots] = useState<TimeSlot[]>([]);
  const [selectedTimeslot, setSelectedTimeslot] = useState<string | null>(null);
  const [loadingTimeslots, setLoadingTimeslots] = useState(false);

  const handleSearch = async () => {
    if (!email.trim()) {
      toast.error('Ingresa un email');
      return;
    }

    try {
      setSearching(true);
      setUserFound(null);
      setSuccessMessage(null);

      const response = await userApi.searchByEmail(email.trim());

      if (response.success) {
        const user = response.data;

        // Validar que haya completado la trivia
        if (!user.triviaCompleted) {
          toast.error('Debes completar la trivia primero');
          return;
        }

        setUserFound(user);
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        toast.error('Usuario no encontrado');
      } else if (error.response?.status === 403) {
        toast.error('Registro cerrado');
      } else {
        const errorMessage = error.response?.data?.error || error.message || 'Error al buscar usuario';
        toast.error(errorMessage);
      }
    } finally {
      setSearching(false);
    }
  };

  const handleOpenModal = async () => {
    setShowModal(true);
    setNewEmail('');
    setNewWhatsapp('');
    setNewPartnerEmail('');
    setNewPartnerWhatsapp('');
    setSelectedTimeslot(null);
    
    // Cargar turnos disponibles
    try {
      setLoadingTimeslots(true);
      const today = getTodayInEcuador();
      const response = await timeslotApi.getAvailableSlots(today);
      
      if (response.success) {
        // Filtrar turnos futuros
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentTimeInMinutes = currentHour * 60 + currentMinute;

        const futureSlots = response.data.filter((slot: TimeSlot) => {
          const [startHour, startMinute] = slot.startTime.split(':').map(Number);
          const slotTimeInMinutes = startHour * 60 + startMinute;
          return slotTimeInMinutes > currentTimeInMinutes;
        });

        setTimeslots(futureSlots);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message || 'Error al cargar turnos';
      toast.error(errorMessage);
    } finally {
      setLoadingTimeslots(false);
    }
  };

  const handleResendQR = async () => {
    if (!userFound) return;

    // Si no tiene reserva, debe seleccionar un turno obligatoriamente
    if ((!userFound.reservations || userFound.reservations.length === 0) && !selectedTimeslot) {
      toast.error('Debes seleccionar un turno para crear tu reserva');
      return;
    }

    // Validar nuevo email si se proporcionó
    if (newEmail.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newEmail.trim())) {
        toast.error('Email inválido');
        return;
      }
    }

    // Validar nuevo whatsapp si se proporcionó
    if (newWhatsapp.trim()) {
      const whatsappRegex = /^09\d{8}$/;
      if (!whatsappRegex.test(newWhatsapp.trim())) {
        toast.error('WhatsApp debe tener formato 09XXXXXXXX');
        return;
      }
    }

    try {
      setLoading(true);

      const response = await reservationApi.resendQR({
        email: userFound.email,
        newEmail: newEmail.trim() || undefined,
        newWhatsapp: newWhatsapp.trim() || undefined,
        newPartnerEmail: newPartnerEmail.trim() || undefined,
        newPartnerWhatsapp: newPartnerWhatsapp.trim() || undefined,
        newTimeslotId: selectedTimeslot || undefined,
      });

      if (response.success) {
        const message = response.data.reservationCreated 
          ? '¡Reserva creada y QR enviado exitosamente!' 
          : '¡QR reenviado exitosamente!';
        
        toast.success(message);
        
        // Mostrar mensaje de éxito con los datos
        setSuccessMessage({
          email: response.data.sentTo.email,
          whatsapp: response.data.sentTo.whatsapp,
          partnerEmail: response.data.partnerSentTo?.email,
          partnerWhatsapp: response.data.partnerSentTo?.whatsapp,
        });
        
        // Cerrar modal
        setShowModal(false);
        
        // Mostrar mensaje simple
        setTimeout(() => {
          toast.success(
            'Revisa tu email',
            { duration: 4000 }
          );
        }, 500);

        // Resetear formulario después de 5 segundos
        setTimeout(() => {
          setUserFound(null);
          setEmail('');
          setSuccessMessage(null);
        }, 5000);
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        toast.error('Usuario no encontrado');
      } else if (error.response?.status === 400) {
        const errorMessage = error.response.data?.error || 'Error en la solicitud';
        toast.error(errorMessage);
      } else if (error.response?.status === 409) {
        const errorMessage = error.response.data?.error || 'El nuevo email ya está en uso';
        toast.error(errorMessage);
      } else {
        const errorMessage = error.response?.data?.error || error.message || 'Error al reenviar QR';
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-code-pattern py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="card-glow">
          <div className="text-center mb-8">
            <h1 className="title-code mb-3">
              Reenviar QR
            </h1>
            <p className="text-code font-mono text-sm">
              <span className="text-code-green">{'{'}</span>Ingresa tu email para reenviar tu código QR<span className="text-code-green">{'}'}</span>
            </p>
          </div>

          <div className="space-y-5">
            <Input
              label="email"
              type="email"
              placeholder="dev@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              disabled={!!userFound}
            />

            {!userFound && (
              <Button
                onClick={handleSearch}
                loading={searching}
                className="w-full"
              >
                {searching ? 'Buscando...' : 'search() →'}
              </Button>
            )}

            {userFound && (
              <div className="terminal-window border-success/50">
                <div className="terminal-header">
                  <div className="terminal-dot bg-error"></div>
                  <div className="terminal-dot bg-warning"></div>
                  <div className="terminal-dot bg-success"></div>
                </div>
                <div className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-3">✓</div>
                    <p className="text-success font-bold mb-2 font-mono">
                      Usuario encontrado
                    </p>
                  </div>

                  <div className="bg-gray-900/50 p-4 rounded-lg mb-4 font-mono text-sm">
                    <div className="mb-2">
                      <span className="text-code-green">nombre:</span>{' '}
                      <span className="text-gray-300">"{userFound.firstName} {userFound.lastName}"</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-code-green">email:</span>{' '}
                      <span className="text-gray-300 break-all">"{maskEmail(userFound.email)}"</span>
                    </div>
                    <div>
                      <span className="text-code-green">whatsapp:</span>{' '}
                      <span className="text-gray-300">"{maskWhatsapp(userFound.whatsapp)}"</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-code-green">triviaCompleted:</span>{' '}
                      <span className="text-success">true</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-code-green">hasReservation:</span>{' '}
                      <span className={userFound.reservations && userFound.reservations.length > 0 ? "text-success" : "text-warning"}>
                        {userFound.reservations && userFound.reservations.length > 0 ? "true" : "false"}
                      </span>
                    </div>
                    {userFound.partner && (
                      <div className="mt-4 pt-4 border-t border-secondary/30">
                        <div className="mb-2">
                          <span className="text-secondary">👥 Compañero de grupo:</span>
                        </div>
                        <div className="mb-2">
                          <span className="text-code-green">nombre:</span>{' '}
                          <span className="text-gray-300">"{userFound.partner.firstName} {userFound.partner.lastName}"</span>
                        </div>
                        <div className="mb-2">
                          <span className="text-code-green">email:</span>{' '}
                          <span className="text-gray-300 break-all">"{maskEmail(userFound.partner.email)}"</span>
                        </div>
                        <div>
                          <span className="text-code-green">whatsapp:</span>{' '}
                          <span className="text-gray-300">"{maskWhatsapp(userFound.partner.whatsapp)}"</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {(!userFound.reservations || userFound.reservations.length === 0) && (
                    <div className="bg-warning/10 border border-warning/30 p-4 rounded-lg mb-4">
                      <p className="text-warning font-bold mb-2 font-mono text-sm text-center">
                        ⚠️ No tienes reserva
                      </p>
                      <p className="text-gray-400 text-xs font-mono text-center">
                        Debes seleccionar un turno para crear tu reserva
                      </p>
                    </div>
                  )}

                  <Button
                    onClick={handleOpenModal}
                    variant="outline"
                    className="w-full mb-3"
                  >
                    {userFound.reservations && userFound.reservations.length > 0 ? '✏️ Actualizar datos o turno' : '📅 Seleccionar turno y crear reserva'}
                  </Button>

                  {userFound.reservations && userFound.reservations.length > 0 && (
                    <Button
                      onClick={async () => {
                        setLoading(true);
                        try {
                          const response = await reservationApi.resendQR({
                            email: userFound.email,
                          });
                          if (response.success) {
                            toast.success('¡QR reenviado exitosamente!');
                            setSuccessMessage({
                              email: response.data.sentTo.email,
                              whatsapp: response.data.sentTo.whatsapp,
                              partnerEmail: response.data.partnerSentTo?.email,
                              partnerWhatsapp: response.data.partnerSentTo?.whatsapp,
                            });
                          }
                        } catch (error: any) {
                          const errorMessage = error.response?.data?.error || error.message || 'Error al reenviar QR';
                          toast.error(errorMessage);
                        } finally {
                          setLoading(false);
                        }
                      }}
                      loading={loading}
                      className="w-full"
                    >
                      {loading ? 'Reenviando...' : 'resendQR() →'}
                    </Button>
                  )}

                  {successMessage && (
                    <div className="bg-success/10 border border-success/30 p-4 rounded-lg mt-4">
                      <p className="text-success font-bold mb-3 font-mono text-center">
                        ✅ QR Enviado Exitosamente
                      </p>
                      <div className="space-y-3">
                        <div className="bg-gray-900/50 p-3 rounded">
                          <p className="text-xs text-gray-400 font-mono mb-1">📧 Usuario principal:</p>
                          <p className="text-gray-300 text-sm font-mono break-all">
                            {successMessage.email}
                          </p>
                        </div>
                        {successMessage.partnerEmail && (
                          <div className="bg-gray-900/50 p-3 rounded">
                            <p className="text-xs text-gray-400 font-mono mb-1">📧 Compañero:</p>
                            <p className="text-gray-300 text-sm font-mono break-all">
                              {successMessage.partnerEmail}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={() => {
                      setUserFound(null);
                      setEmail('');
                      setSuccessMessage(null);
                    }}
                    variant="outline"
                    className="w-full mt-3"
                  >
                    Buscar otro usuario
                  </Button>
                </div>
              </div>
            )}

            <div className="divider-code"></div>

            <Button
              onClick={() => navigate('/escaperoom')}
              variant="outline"
              className="w-full"
            >
              ← Volver al inicio
            </Button>
          </div>
        </div>
      </div>

      {/* Modal de actualización */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={userFound?.reservations && userFound.reservations.length > 0 ? "Actualizar Datos" : "Crear Reserva"}
      >
        <div className="space-y-4">
          {userFound?.reservations && userFound.reservations.length > 0 ? (
            <p className="text-gray-400 text-sm font-mono mb-4">
              Actualiza los campos que desees cambiar (todos son opcionales)
            </p>
          ) : (
            <div className="bg-warning/10 border border-warning/30 p-3 rounded-lg mb-4">
              <p className="text-warning font-bold text-sm font-mono mb-1">
                ⚠️ Primera reserva
              </p>
              <p className="text-gray-400 text-xs font-mono">
                Debes seleccionar un turno para crear tu reserva. Los otros campos son opcionales.
              </p>
            </div>
          )}

          <Input
            label="nuevoEmail (opcional)"
            type="email"
            placeholder="nuevo@example.com"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />

          <Input
            label="nuevoWhatsapp (opcional)"
            type="tel"
            placeholder="0987654321"
            value={newWhatsapp}
            onChange={(e) => setNewWhatsapp(e.target.value)}
            maxLength={10}
          />

          {userFound?.partner && (
            <div className="border-t border-secondary/30 pt-4 mt-4">
              <p className="text-secondary font-bold text-sm font-mono mb-3">
                👥 Datos del compañero (opcional)
              </p>
              
              <Input
                label="nuevoEmailCompañero (opcional)"
                type="email"
                placeholder="nuevo@example.com"
                value={newPartnerEmail}
                onChange={(e) => setNewPartnerEmail(e.target.value)}
              />

              <Input
                label="nuevoWhatsappCompañero (opcional)"
                type="tel"
                placeholder="0987654321"
                value={newPartnerWhatsapp}
                onChange={(e) => setNewPartnerWhatsapp(e.target.value)}
                maxLength={10}
                className="mt-4"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2">
              {userFound?.reservations && userFound.reservations.length > 0 ? 'nuevoTurno (opcional)' : 'turno (requerido)'}
              {(!userFound?.reservations || userFound.reservations.length === 0) && <span className="text-error ml-1">*</span>}
            </label>
            
            {loadingTimeslots ? (
              <p className="text-gray-400 text-sm font-mono">Cargando turnos...</p>
            ) : timeslots.length === 0 ? (
              <p className="text-warning text-sm font-mono">No hay turnos disponibles</p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {timeslots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => setSelectedTimeslot(slot.id)}
                    className={`w-full p-3 rounded-lg border transition-all text-left ${
                      selectedTimeslot === slot.id
                        ? 'border-secondary bg-secondary/10'
                        : 'border-gray-700 hover:border-gray-600 bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold font-mono text-sm">
                          {slot.startTime} - {slot.endTime}
                        </p>
                        <p className="text-xs text-gray-400 font-mono">
                          {calculateDuration(slot.startTime, slot.endTime)} minutos
                        </p>
                      </div>
                      {selectedTimeslot === slot.id && (
                        <div className="text-secondary">✓</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 space-y-3">
            <Button
              onClick={handleResendQR}
              loading={loading}
              className="w-full"
            >
              {loading ? 'Procesando...' : userFound?.reservations && userFound.reservations.length > 0 ? 'Confirmar y Reenviar QR' : 'Crear Reserva y Enviar QR'}
            </Button>

            <Button
              onClick={() => setShowModal(false)}
              variant="outline"
              className="w-full"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
