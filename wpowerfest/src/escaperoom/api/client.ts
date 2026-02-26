import axios, { type AxiosError, type AxiosInstance } from 'axios';
import { ENV } from '../config/env';

const apiClient: AxiosInstance = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: ENV.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de respuesta para manejo de errores
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      // Error del servidor (4xx, 5xx)
      const errorMessage = (error.response.data as any)?.error || 'Error del servidor';
      // Preservar el error original para que el código pueda acceder a response.status
      const enhancedError = new Error(errorMessage) as any;
      enhancedError.response = error.response;
      return Promise.reject(enhancedError);
    } else if (error.request) {
      // Error de red
      return Promise.reject(new Error('No se pudo conectar con el servidor'));
    } else {
      // Error desconocido
      return Promise.reject(new Error('Error inesperado'));
    }
  }
);

export default apiClient;
