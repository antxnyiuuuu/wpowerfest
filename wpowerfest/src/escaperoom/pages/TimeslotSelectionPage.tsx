import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { timeslotApi } from '../api/timeslot.api';
import { reservationApi } from '../api/reservation.api';
import { useUserStore } from '../store/userStore';
import type { TimeSlot } from '../types/timeslot.types';
import { Button } from '../components/common/Button';
import { Loading } from '../components/common/Loading';
import { calculateDuration, getTodayInEcuador } from '../utils/formatters';

export const TimeslotSelectionPage = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const users = useUserStore((state) => state.users);
  const setReservations = useUserStore((state) => state.setReservations);
  const [timeslots, setTimeslots] = useState<TimeSlot[]>([]);
  const [selectedTimeslot, setSelectedTimeslot] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      console.log('No user found, redirecting to home');
      navigate('/escaperoom');
      return;
    }
    if (!user.triviaCompleted) {
      console.log('Trivia not completed, redirecting to trivia');
      navigate('/escaperoom/trivia');
      return;
    }
    console.log('User valid, loading timeslots');
    loadTimeslots();
  }, [user, navigate]);

  const loadTimeslots = async () => {
    try {
      // Obtener fecha actual en zona horaria de Ecuador
      const today = getTodayInEcuador();
      const response = await timeslotApi.getAvailableSlots(today);
      
      if (response.success) {
        // Filtrar solo turnos futuros (desde hora actual en adelante)
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
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!selectedTimeslot) {
      toast.error('Selecciona un turno');
      return;
    }

    console.log('🔍 Verificando datos del store:');
    console.log('  - user:', user);
    console.log('  - users:', users);
    console.log('  - users.length:', users.length);

    // Verificar que tenemos ambos usuarios del grupo
    if (!users || users.length !== 2) {
      console.error('❌ Error: users.length =', users?.length);
      toast.error('Error: No se encontraron los datos del grupo. Completa la trivia nuevamente.');
      navigate('/escaperoom/trivia');
      return;
    }

    console.log('✅ Creando reservas para:', users.map(u => `${u.firstName} ${u.lastName} (${u.email})`));

    try {
      setSubmitting(true);
      
      // Crear 2 reservas simultáneamente
      const response = await reservationApi.createMultipleReservations({
        userIds: [users[0].id, users[1].id],
        timeslotId: selectedTimeslot,
      });

      if (response.success) {
        console.log('✅ Reservas creadas exitosamente:', response.data.reservations);
        // Guardar las reservas con sus QR codes en el store
        setReservations(response.data.reservations);
        toast.success('¡Reservas creadas! QR enviados a ambos emails y WhatsApp');
        navigate('/escaperoom/confirmation');
      }
    } catch (error: any) {
      console.error('❌ Error creando reservas:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Error al crear reservas';
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return <Loading />;
  }

  if (timeslots.length === 0) {
    return (
      <div className="min-h-screen bg-code-pattern py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="card-glow text-center">
            <div className="text-5xl mb-4">⚠️</div>
            <h1 className="subtitle-code mb-4">No hay turnos disponibles</h1>
            <p className="text-gray-400 mb-6">
              No hay turnos disponibles para hoy. Intenta más tarde.
            </p>
            <Button onClick={() => navigate('/escaperoom')}>
              return home()
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-code-pattern py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="card-glow">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">🎯</div>
            <h1 className="subtitle-code mb-2">Selecciona tu Turno</h1>
            <p className="text-gray-400 font-mono text-sm">
              <span className="text-code-green">date:</span> {formatDate(timeslots[0].date)}
            </p>
          </div>

          {/* Contenedor con scroll limitado */}
          <div 
            className="space-y-3 mb-6 overflow-y-auto pr-2" 
            style={{ maxHeight: '400px' }}
          >
            {timeslots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => setSelectedTimeslot(slot.id)}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  selectedTimeslot === slot.id
                    ? 'border-secondary bg-secondary/10'
                    : 'border-gray-700 hover:border-gray-600 bg-[#161b22]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">🕐</div>
                    <div className="text-left">
                      <p className="font-bold text-lg font-mono">
                        {slot.startTime} - {slot.endTime}
                      </p>
                      <p className="text-sm text-gray-400 font-mono">
                        {calculateDuration(slot.startTime, slot.endTime)} minutos
                      </p>
                    </div>
                  </div>
                  {selectedTimeslot === slot.id && (
                    <div className="text-secondary text-2xl">✓</div>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="divider-code"></div>

          {/* Botones siempre visibles */}
          <Button
            onClick={handleConfirm}
            loading={submitting}
            disabled={!selectedTimeslot}
            className="w-full"
          >
            confirm() ✓
          </Button>

          <button
            onClick={() => navigate('/escaperoom')}
            className="w-full mt-3 text-gray-400 hover:text-gray-300 font-mono text-sm"
          >
            ← back()
          </button>
        </div>
      </div>
    </div>
  );
};
