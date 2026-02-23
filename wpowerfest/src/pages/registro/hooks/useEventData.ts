import { registrationService } from '../services/registration.service';

export interface Attendee {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  sports: string[];
}

export function useEventData() {
  // Add registration
  const addRegistration = async (
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    sports: string[],
    cedula: string,
    edad: number,
    sector: string
  ) => {
    const response = await registrationService.create({
      firstName,
      lastName,
      phone,
      email,
      sports,
      cedula,
      edad,
      sector
    });

    if (response.success && response.data) {
      const newAttendee: Attendee = {
        id: response.data.id,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        phone: response.data.phone,
        email: response.data.email,
        sports: response.data.sports,
      };

      return newAttendee;
    } else {
      throw new Error(response.error || 'Error al crear registro');
    }
  };

  return {
    addRegistration,
  };
}
