import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (date: string | Date): string => {
  return format(new Date(date), "d 'de' MMMM 'de' yyyy", { locale: es });
};

export const formatTime = (time: string): string => {
  return time;
};

export const formatDateTime = (dateTime: string | Date): string => {
  return format(new Date(dateTime), "d 'de' MMMM 'a las' HH:mm", {
    locale: es,
  });
};

export const formatPhoneNumber = (phone: string): string => {
  // +593987654321 → +593 98 765 4321
  if (phone.startsWith('+593')) {
    return phone.replace(/(\+593)(\d{2})(\d{3})(\d{4})/, '$1 $2 $3 $4');
  }
  return phone;
};

export const maskEmail = (email: string): string => {
  // ejemplo@dominio.com → eje*******@dominio.com
  const [localPart, domain] = email.split('@');
  
  if (!localPart || !domain) {
    return email;
  }
  
  // Mostrar los primeros 3 caracteres y enmascarar el resto
  const visibleChars = Math.min(3, localPart.length);
  const maskedPart = localPart.substring(0, visibleChars) + '*'.repeat(Math.max(7, localPart.length - visibleChars));
  
  return `${maskedPart}@${domain}`;
};

export const maskWhatsapp = (whatsapp: string): string => {
  // 0987654321 → 098****321
  if (whatsapp.length < 6) {
    return whatsapp;
  }
  
  const start = whatsapp.substring(0, 3);
  const end = whatsapp.substring(whatsapp.length - 3);
  const masked = '*'.repeat(whatsapp.length - 6);
  
  return `${start}${masked}${end}`;
};

/**
 * Calcula la duración en minutos entre dos horas en formato HH:MM
 * @param startTime - Hora de inicio (ej: "08:00")
 * @param endTime - Hora de fin (ej: "08:15")
 * @returns Duración en minutos
 */
export const calculateDuration = (startTime: string, endTime: string): number => {
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  
  const startInMinutes = startHour * 60 + startMinute;
  const endInMinutes = endHour * 60 + endMinute;
  
  return endInMinutes - startInMinutes;
};

/**
 * Obtiene la fecha actual en zona horaria de Ecuador (UTC-5) en formato YYYY-MM-DD
 * @returns Fecha actual en Ecuador
 */
export const getTodayInEcuador = (): string => {
  const now = new Date();
  const ecuadorDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/Guayaquil' }));
  
  const year = ecuadorDate.getFullYear();
  const month = String(ecuadorDate.getMonth() + 1).padStart(2, '0');
  const day = String(ecuadorDate.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};
