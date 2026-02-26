export const ENDPOINTS = {
  // Health
  HEALTH: '/health',
  
  // Users
  REGISTER_USER: '/users/register',
  SEARCH_USER: '/users/search',
  
  // Trivia
  GET_QUESTIONS: '/trivia/questions',
  VALIDATE_TRIVIA: '/trivia/validate',
  
  // Timeslots
  GET_TIMESLOTS: '/timeslots',
  
  // Reservations
  RESERVATIONS: '/reservations',
  RESEND_QR: '/reservations/resend',
  
  // Admin
  ADMIN_REGISTRATION_STATUS: '/admin/registration-status',
  ADMIN_REGISTRATION_CONTROL: '/admin/registration-control',
  ADMIN_TIMESLOT_CONFIG: '/admin/timeslot-config',
  ADMIN_GENERATE_TIMESLOTS: '/admin/generate-timeslots',
  ADMIN_CLEAR_TIMESLOTS: '/admin/timeslots',
};
