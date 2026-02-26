import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';
import { adminApi } from '../api/admin.api';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';

export const AdminPage = () => {
  // Estados para control de registro
  const [isOpen, setIsOpen] = useState<boolean | null>(null);
  const [reason, setReason] = useState('');
  
  // Estados para configuración de turnos
  const [eventDates, setEventDates] = useState<string[]>([]);
  const [durationMinutes, setDurationMinutes] = useState(15);
  const [startHour, setStartHour] = useState(8);
  const [endHour, setEndHour] = useState(20);
  const [calculatedSlots, setCalculatedSlots] = useState(0);
  const [duplicateDateError, setDuplicateDateError] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  useEffect(() => {
    loadStatus();
    loadTimeslotConfig();
  }, []);

  // Calcular slots automáticamente cuando cambian los parámetros
  useEffect(() => {
    if (startHour < endHour && durationMinutes > 0) {
      const totalMinutes = (endHour - startHour) * 60;
      const slots = Math.floor(totalMinutes / durationMinutes);
      setCalculatedSlots(slots);
    } else {
      setCalculatedSlots(0);
    }
  }, [durationMinutes, startHour, endHour]);

  const loadStatus = async () => {
    try {
      const response = await adminApi.getRegistrationStatus();
      if (response.success && response.data) {
        setIsOpen(response.data.manualOverride);
      }
    } catch (error: any) {
      console.error('Error al cargar estado:', error);
    }
  };

  const loadTimeslotConfig = async () => {
    try {
      const response = await adminApi.getTimeslotConfig();
      if (response.success && response.data) {
        const config = response.data;
        // Convertir fechas ISO a formato YYYY-MM-DD para los inputs
        const formattedDates = (config.eventDates || []).map((dateStr: string) => {
          const date = new Date(dateStr);
          return date.toISOString().split('T')[0];
        });
        setEventDates(formattedDates);
        setDurationMinutes(config.durationMinutes || 15);
        setStartHour(config.startHour || 8);
        setEndHour(config.endHour || 20);
      }
    } catch (error: any) {
      console.error('Error al cargar configuración:', error);
    }
  };

  const handleToggleRegistration = async (newStatus: boolean) => {
    try {
      setLoading(true);
      await adminApi.setRegistrationControl({
        isOpen: newStatus,
        reason,
        adminEmail: 'admin@escaperoom.com',
      });
      setIsOpen(newStatus);
      toast.success(`Registro ${newStatus ? 'abierto' : 'cerrado'} manualmente`);
    } catch (error: any) {
      toast.error(error.message || 'Error al cambiar estado');
    } finally {
      setLoading(false);
    }
  };

  const handleResetToAutomatic = async () => {
    try {
      setLoading(true);
      await adminApi.resetToAutomatic();
      setIsOpen(null);
      setReason('');
      toast.success('Volviendo a modo automático');
      await loadStatus(); // Recargar estado
    } catch (error: any) {
      toast.error(error.message || 'Error al resetear a automático');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTimeslotConfig = async () => {
    // Filtrar fechas vacías
    const filledDates = eventDates.filter(d => d && d.trim() !== '');
    
    if (filledDates.length !== 3) {
      toast.error('Debe seleccionar exactamente 3 fechas');
      return;
    }

    if (durationMinutes < 1) {
      toast.error('Duración debe ser mayor a 0');
      return;
    }

    if (startHour >= endHour) {
      toast.error('Hora de inicio debe ser menor a hora de fin');
      return;
    }

    try {
      setLoading(true);
      await adminApi.setTimeslotConfig({
        eventDates: filledDates,
        durationMinutes,
        startHour,
        endHour,
        adminEmail: 'admin@escaperoom.com',
      });
      toast.success('Configuración guardada exitosamente');
    } catch (error: any) {
      toast.error(error.message || 'Error al guardar configuración');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateTimeslots = async () => {
    if (!confirm('¿Generar turnos según la configuración actual? Esto eliminará los turnos existentes.')) {
      return;
    }

    try {
      setLoading(true);
      const response = await adminApi.generateTimeslots();
      if (response.success && response.data) {
        toast.success(response.data.message);
        setShowPreview(false);
      }
    } catch (error: any) {
      toast.error(error.message || 'Error al generar turnos');
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (index: number, value: string) => {
    const newDates = [...eventDates];
    newDates[index] = value;
    
    // Verificar si la fecha ya está seleccionada en otro campo
    const filledDates = newDates.filter(d => d && d.trim() !== '');
    const uniqueDates = new Set(filledDates);
    
    if (filledDates.length !== uniqueDates.size) {
      setDuplicateDateError('Esta fecha ya ha sido seleccionada');
    } else {
      setDuplicateDateError(null);
    }
    
    setEventDates(newDates);
  };

  const addDateField = () => {
    if (eventDates.length < 3) {
      setEventDates([...eventDates, '']);
    }
  };

  const removeDateField = (index: number) => {
    const newDates = eventDates.filter((_, i) => i !== index);
    setEventDates(newDates);
  };

  const handleExportCSV = async () => {
    try {
      setExportLoading(true);
      const response = await adminApi.getUsersData();
      
      if (!response.success || !response.data || response.data.length === 0) {
        toast.error('No hay datos para exportar');
        return;
      }

      // Preparar datos para Excel
      const excelData = response.data.map((user: any) => ({
        'Nombre': user.firstName,
        'Apellido': user.lastName,
        'Email': user.email,
        'WhatsApp': user.whatsapp,
        'Nivel de Interés': user.interestLevel,
        'Compañero': user.partnerName,
        'Turno': user.timeslot,
        'Check-in': user.checkedIn ? 'Sí' : 'No',
        'Fecha Registro': new Date(user.createdAt).toLocaleDateString('es-EC'),
      }));

      // Crear libro de Excel
      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios');

      // Ajustar ancho de columnas
      const columnWidths = [
        { wch: 15 }, // Nombre
        { wch: 15 }, // Apellido
        { wch: 30 }, // Email
        { wch: 12 }, // WhatsApp
        { wch: 20 }, // Nivel de Interés
        { wch: 25 }, // Compañero
        { wch: 20 }, // Turno
        { wch: 10 }, // Check-in
        { wch: 15 }, // Fecha Registro
      ];
      worksheet['!cols'] = columnWidths;

      // Aplicar estilo a los encabezados (primera fila)
      const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
        if (!worksheet[cellAddress]) continue;
        
        worksheet[cellAddress].s = {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "4472C4" } },
          alignment: { horizontal: "center", vertical: "center" },
        };
      }

      // Generar archivo Excel
      const fileName = `usuarios_escape_room_${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(workbook, fileName);

      toast.success(`Exportados ${response.data.length} usuarios a Excel`);
    } catch (error: any) {
      toast.error(error.message || 'Error al exportar datos');
    } finally {
      setExportLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-mystery py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* SECCIÓN 1: Control de Registro */}
        <div className="card-glow">
          <h1 className="title-mystery mb-6 text-center">
            🔧 Panel de Administración
          </h1>

          <h2 className="subtitle-mystery mb-4">
            1. Control de Registro
          </h2>

          <div className="p-6 rounded-lg mb-6 border border-secondary/30" style={{backgroundColor: '#1f1f35'}}>
            <p className="text-sm text-gray-400 mb-2">Estado actual:</p>
            <p className="text-2xl font-bold font-display">
              {isOpen === null ? '🤖 Automático' : isOpen ? '✅ Abierto (Manual)' : '🔒 Cerrado (Manual)'}
            </p>
          </div>

          <Input
            label="Razón del cambio"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Ej: Pruebas de desarrollo"
          />

          <div className="flex gap-3 mt-6">
            <Button
              onClick={() => handleToggleRegistration(true)}
              loading={loading}
              className="flex-1"
            >
              Abrir Registro
            </Button>

            <Button
              onClick={() => handleToggleRegistration(false)}
              loading={loading}
              variant="danger"
              className="flex-1"
            >
              Cerrar Registro
            </Button>
          </div>

          <Button
            onClick={handleResetToAutomatic}
            variant="outline"
            className="w-full mt-3"
          >
            Volver a Automático
          </Button>
        </div>

        {/* SECCIÓN 2: Configuración de Turnos */}
        <div className="card-glow">
          <h2 className="subtitle-mystery mb-4">
            2. Configuración de Turnos
          </h2>

          <div className="space-y-4">
            {/* Selector de fechas */}
            <div>
              <label className="block text-gray-300 font-semibold mb-3 tracking-wide">
                Fechas del Evento (seleccionar 3)
              </label>
              
              {eventDates.map((date, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => handleDateChange(index, e.target.value)}
                    className="input-field flex-1 cursor-pointer"
                    style={{
                      colorScheme: 'dark',
                    }}
                  />
                  <Button
                    onClick={() => removeDateField(index)}
                    variant="danger"
                    className="px-4"
                  >
                    ✕
                  </Button>
                </div>
              ))}
              
              {eventDates.length < 3 && (
                <Button
                  onClick={addDateField}
                  variant="outline"
                  className="w-full mt-2"
                >
                  + Agregar Fecha
                </Button>
              )}
              
              {duplicateDateError && (
                <p className="text-error text-sm mt-2 flex items-center gap-1 font-mono">
                  <span>⚠</span> {duplicateDateError}
                </p>
              )}
              
              <p className="text-xs text-gray-500 mt-2">
                Fechas seleccionadas: {eventDates.filter(d => d).length}/3
              </p>
            </div>

            {/* Duración de cada turno */}
            <Input
              label="Duración de cada turno (minutos)"
              type="number"
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(Number(e.target.value))}
              placeholder="15"
            />

            {/* Hora de inicio */}
            <Input
              label="Hora de inicio (0-23)"
              type="number"
              min="0"
              max="23"
              value={startHour}
              onChange={(e) => setStartHour(Number(e.target.value))}
              placeholder="8"
            />

            {/* Hora de fin */}
            <Input
              label="Hora de fin (0-23)"
              type="number"
              min="0"
              max="23"
              value={endHour}
              onChange={(e) => setEndHour(Number(e.target.value))}
              placeholder="20"
            />

            {/* Display calculado */}
            <div className="bg-secondary/20 border border-secondary/50 p-5 rounded-lg">
              <p className="text-sm text-secondary mb-1 font-display">
                📊 Turnos calculados por día:
              </p>
              <p className="text-4xl font-bold text-secondary font-display">
                {calculatedSlots} turnos
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Total para {eventDates.filter(d => d).length} días: {calculatedSlots * eventDates.filter(d => d).length} turnos
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Los turnos son seguidos (sin espacios entre ellos)
              </p>
            </div>

            {/* Botón guardar configuración */}
            <Button
              onClick={handleSaveTimeslotConfig}
              loading={loading}
              disabled={!!duplicateDateError}
              className="w-full"
            >
              💾 Guardar Configuración
            </Button>
          </div>
        </div>

        {/* SECCIÓN 3: Gestión de Turnos */}
        <div className="card-glow">
          <h2 className="subtitle-mystery mb-4">
            3. Gestión de Turnos
          </h2>

          <div className="bg-warning/20 border border-warning/50 p-5 rounded-lg mb-4">
            <p className="font-bold text-warning mb-3 font-display">⚠️ Advertencia:</p>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-secondary">•</span>
                <span>Generar turnos eliminará los turnos existentes y creará nuevos registros en la base de datos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary">•</span>
                <span>No se pueden eliminar turnos si hay reservas activas</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => setShowPreview(!showPreview)}
              variant="outline"
              className="w-full"
            >
              {showPreview ? '🔼 Ocultar' : '🔽 Ver'} Preview de Turnos
            </Button>

            {showPreview && (
              <div className="p-5 rounded-lg border border-gray-700" style={{backgroundColor: '#1f1f35'}}>
                <p className="font-semibold mb-2 text-gray-300">Preview de turnos:</p>
                <p className="text-sm text-gray-400 mb-2">
                  Se generarán {calculatedSlots} turnos por día, 
                  desde las {startHour.toString().padStart(2, '0')}:00 hasta las {endHour.toString().padStart(2, '0')}:00, 
                  con duración de {durationMinutes} minutos cada uno (turnos seguidos).
                </p>
                <p className="text-sm font-semibold text-secondary">
                  Total: {calculatedSlots * eventDates.filter(d => d).length} turnos
                </p>
              </div>
            )}

            <Button
              onClick={handleGenerateTimeslots}
              loading={loading}
              className="w-full"
            >
              ✨ Generar Turnos
            </Button>
          </div>
        </div>

        {/* SECCIÓN 4: Exportación de Datos */}
        <div className="card-glow">
          <h2 className="subtitle-mystery mb-4">
            4. Exportación de Datos
          </h2>

          <div className="p-5 rounded-lg border border-secondary/30 mb-4" style={{backgroundColor: '#1f1f35'}}>
            <p className="text-gray-300 mb-2">
              Exporta todos los datos de usuarios registrados a un archivo Excel (.xlsx).
            </p>
            <p className="text-sm text-gray-400">
              Incluye: Nombre, Apellido, Email, WhatsApp, Nivel de Interés, Compañero, Turno, Check-in y Fecha de Registro.
            </p>
          </div>

          <Button
            onClick={handleExportCSV}
            loading={exportLoading}
            className="w-full"
          >
            📥 Exportar a Excel
          </Button>
        </div>

      </div>
    </div>
  );
};
