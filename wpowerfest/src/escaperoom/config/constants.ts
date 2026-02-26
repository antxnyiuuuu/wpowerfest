export const EVENT_DATES = [
  new Date('2026-02-27'),
  new Date('2026-02-28'),
  new Date('2026-03-01'),
];

export const EVENT_INFO = {
  name: 'Escape Room',
  description: 'Expo Educativa 2026',
  duration: 15, // minutos
  startTime: '08:00',
  endTime: '20:00',
};

export const VALIDATION_MESSAGES = {
  REQUIRED: 'Este campo es requerido',
  EMAIL_INVALID: 'Email inválido',
  PHONE_INVALID: 'Formato de teléfono inválido',
  MIN_LENGTH: (min: number) => `Mínimo ${min} caracteres`,
  MAX_LENGTH: (max: number) => `Máximo ${max} caracteres`,
};
