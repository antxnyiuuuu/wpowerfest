export interface ResendQRInput {
  email: string;
  newEmail?: string;
  newWhatsapp?: string;
  newPartnerEmail?: string;
  newPartnerWhatsapp?: string;
  newTimeslotId?: string;
}

export interface ResendQRResponse {
  success: boolean;
  data: {
    message: string;
    sentTo: {
      email: string;
      whatsapp: string;
    };
    emailUpdated: boolean;
    whatsappUpdated: boolean;
    timeslotUpdated: boolean;
    reservationCreated?: boolean;
  };
}
