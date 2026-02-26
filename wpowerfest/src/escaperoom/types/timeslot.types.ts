export interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  _count: {
    reservations: number;
  };
}
