import apiClient from './client';
import { ENDPOINTS } from './endpoints';
import type { ApiResponse } from '../types/api.types';
import type {
  RegistrationStatus,
  RegistrationControlRequest,
  TimeslotConfigRequest,
  TimeslotConfig,
  GenerateTimeslotsResponse,
  ClearTimeslotsResponse,
} from '../types/admin.types';

export const adminApi = {
  // Obtener estado de registro
  getRegistrationStatus: async (): Promise<ApiResponse<RegistrationStatus>> => {
    const response = await apiClient.get(ENDPOINTS.ADMIN_REGISTRATION_STATUS);
    return response.data;
  },

  // Establecer control manual de registro
  setRegistrationControl: async (
    data: RegistrationControlRequest
  ): Promise<ApiResponse<RegistrationStatus>> => {
    const response = await apiClient.post(ENDPOINTS.ADMIN_REGISTRATION_CONTROL, data);
    return response.data;
  },

  // Volver a modo automático
  resetToAutomatic: async (): Promise<ApiResponse<{ message: string }>> => {
    const response = await apiClient.delete(ENDPOINTS.ADMIN_REGISTRATION_CONTROL);
    return response.data;
  },

  // Obtener configuración de turnos
  getTimeslotConfig: async (): Promise<ApiResponse<TimeslotConfig>> => {
    const response = await apiClient.get(ENDPOINTS.ADMIN_TIMESLOT_CONFIG);
    return response.data;
  },

  // Establecer configuración de turnos
  setTimeslotConfig: async (
    data: TimeslotConfigRequest
  ): Promise<ApiResponse<TimeslotConfig>> => {
    const response = await apiClient.post(ENDPOINTS.ADMIN_TIMESLOT_CONFIG, data);
    return response.data;
  },

  // Generar turnos
  generateTimeslots: async (): Promise<ApiResponse<GenerateTimeslotsResponse>> => {
    const response = await apiClient.post(ENDPOINTS.ADMIN_GENERATE_TIMESLOTS);
    return response.data;
  },

  // Limpiar turnos
  clearTimeslots: async (): Promise<ApiResponse<ClearTimeslotsResponse>> => {
    const response = await apiClient.delete(ENDPOINTS.ADMIN_CLEAR_TIMESLOTS);
    return response.data;
  },

  // Obtener datos de usuarios para exportación
  getUsersData: async (): Promise<ApiResponse<any[]>> => {
    const response = await apiClient.get('/admin/users-data');
    return response.data;
  },
};
