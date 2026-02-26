import apiClient from './client';
import { ENDPOINTS } from './endpoints';
import type { ResendQRInput, ResendQRResponse } from '../types/reservation.types';

export const reservationApi = {
  createReservation: async (data: { userId: string; timeslotId: string }) => {
    const response = await apiClient.post(ENDPOINTS.RESERVATIONS, data);
    return response.data;
  },

  createMultipleReservations: async (data: { userIds: string[]; timeslotId: string }) => {
    const response = await apiClient.post(`${ENDPOINTS.RESERVATIONS}/multiple`, data);
    return response.data;
  },

  resendQR: async (data: ResendQRInput): Promise<ResendQRResponse> => {
    const response = await apiClient.post<ResendQRResponse>(
      ENDPOINTS.RESEND_QR,
      data
    );
    return response.data;
  },
};
