export interface RegistrationStatus {
  manualOverride: boolean | null;
  reason: string | null;
  updatedAt: string | null;
  updatedBy: string | null;
  eventDates: string[];
  durationMinutes: number;
  startHour: number;
  endHour: number;
  slotsPerDay: number;
}

export interface RegistrationControlRequest {
  isOpen: boolean;
  reason: string;
  adminEmail: string;
}

export interface TimeslotConfigRequest {
  eventDates: string[];
  durationMinutes: number;
  startHour: number;
  endHour: number;
  adminEmail: string;
}

export interface TimeslotConfig {
  eventDates: string[];
  durationMinutes: number;
  startHour: number;
  endHour: number;
  slotsPerDay: number;
}

export interface GenerateTimeslotsResponse {
  message: string;
  totalSlots: number;
  slotsPerDay: number;
  days: number;
}

export interface ClearTimeslotsResponse {
  message: string;
  deletedCount: number;
}
