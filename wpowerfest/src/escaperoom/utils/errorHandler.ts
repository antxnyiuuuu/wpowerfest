import toast from 'react-hot-toast';

export const handleApiError = (error: any) => {
  let message = 'Error inesperado';

  if (error.response) {
    // Error del servidor
    message = error.response.data?.error || 'Error del servidor';
  } else if (error.request) {
    // Error de red
    message = 'No se pudo conectar con el servidor';
  } else if (error.message) {
    // Error conocido
    message = error.message;
  }

  toast.error(message);
  return message;
};
