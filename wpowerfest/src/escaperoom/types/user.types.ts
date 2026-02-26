export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  whatsapp: string;
  triviaCompleted: boolean;
  createdAt: string;
  partnerId?: string | null;
  partner?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    whatsapp: string;
    triviaCompleted: boolean;
  } | null;
  reservations?: Array<{
    id: string;
    qrCode: string;
    status: string;
    timeslotId: string;
  }>;
}

export interface RegisterUserInput {
  firstName: string;
  lastName: string;
  email: string;
  whatsapp: string;
}

export interface RegisterUserResponse {
  success: boolean;
  data: User;
}

export interface SearchUserResponse {
  success: boolean;
  data: User;
}
