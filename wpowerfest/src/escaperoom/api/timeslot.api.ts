import apiClient from './client';
import { ENDPOINTS } from './endpoints';

export const timeslotApi = {
  getAvailableSlots: async (date: string) => {
    const response = await apiClient.get(`${ENDPOINTS.GET_TIMESLOTS}?date=${date}`);
    return response.data;
  },
};
