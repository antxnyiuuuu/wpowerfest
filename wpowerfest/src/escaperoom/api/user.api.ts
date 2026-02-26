import apiClient from './client';
import { ENDPOINTS } from './endpoints';
import type { RegisterUserInput, RegisterUserResponse, SearchUserResponse } from '../types/user.types';

export const userApi = {
  register: async (data: RegisterUserInput): Promise<RegisterUserResponse> => {
    const response = await apiClient.post<RegisterUserResponse>(
      ENDPOINTS.REGISTER_USER,
      data
    );
    return response.data;
  },

  registerMultiple: async (data: { users: RegisterUserInput[] }): Promise<{ success: boolean; data: any[] }> => {
    const response = await apiClient.post(
      '/users/register-multiple',
      data
    );
    return response.data;
  },

  searchByEmail: async (email: string): Promise<SearchUserResponse> => {
    const response = await apiClient.get<SearchUserResponse>(
      `${ENDPOINTS.SEARCH_USER}?email=${encodeURIComponent(email)}`
    );
    return response.data;
  },
};
