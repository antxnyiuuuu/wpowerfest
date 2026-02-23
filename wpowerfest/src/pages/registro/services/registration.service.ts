import { apiService, type ApiResponse } from './api.service';
import { API_ENDPOINTS } from '../config/api';

// Request types
export interface CreateRegistrationRequest {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  sports: string[];
  cedula: string;
  edad: number;
  sector: string;
}

// Response types
export interface RegistrationResponse {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  sports: string[];
  cedula: string | null;
  edad: number | null;
  sector: string | null;
  status: 'PENDING' | 'CHECKED_IN' | 'NO_SHOW';
  checkInTime: string | null;
  registrationDate: string;
  createdAt: string;
  updatedAt: string;
}

// Registration Service
export const registrationService = {
  /**
   * Create a new registration
   */
  async create(
    data: CreateRegistrationRequest
  ): Promise<ApiResponse<RegistrationResponse>> {
    return apiService.post<RegistrationResponse>(
      API_ENDPOINTS.REGISTER,
      data
    );
  },

  /**
   * Update registration data (email and phone)
   */
  async updateData(
    id: string,
    data: { email?: string; phone?: string }
  ): Promise<ApiResponse<RegistrationResponse>> {
    return apiService.patch<RegistrationResponse>(
      API_ENDPOINTS.GET_REGISTRATION_BY_ID(id),
      data
    );
  },

  /**
   * Resend QR notifications (email only)
   */
  async resendNotifications(
    id: string
  ): Promise<ApiResponse<{
    message: string;
    notifications: {
      email: { sent: boolean; messageId?: string };
    };
  }>> {
    return apiService.post(
      `${API_ENDPOINTS.GET_REGISTRATION_BY_ID(id)}/resend`,
      {}
    );
  },

  /**
   * Send QR to an alternative email
   */
  async sendAltEmail(
    id: string,
    email: string
  ): Promise<ApiResponse<{
    message: string;
    notification: { sent: boolean; messageId?: string };
  }>> {
    return apiService.post(
      `${API_ENDPOINTS.GET_REGISTRATION_BY_ID(id)}/send-alt-email`,
      { email }
    );
  },

  /**
   * Search registration by cedula
   */
  async searchByCedula(
    cedula: string
  ): Promise<ApiResponse<RegistrationResponse>> {
    return apiService.get<RegistrationResponse>(
      `${API_ENDPOINTS.SEARCH_BY_CEDULA}?cedula=${cedula}`
    );
  },
};
