import { create } from 'zustand';
import type { User } from '../types/user.types';

interface Reservation {
  id: string;
  userId: string;
  qrCode: string;
  qrImage: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    whatsapp: string;
  };
  timeslot: {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
  };
}

interface UserState {
  user: User | null;
  users: User[];
  qrImage: string | null;
  reservations: Reservation[]; // NUEVO: Array para almacenar las reservas con QR
  setUser: (user: User) => void;
  setUsers: (users: User[]) => void;
  setQrImage: (qrImage: string) => void;
  setReservations: (reservations: Reservation[]) => void; // NUEVO
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  users: [],
  qrImage: null,
  reservations: [], // NUEVO
  setUser: (user) => set({ user }),
  setUsers: (users) => set({ users, user: users[0] || null }),
  setQrImage: (qrImage) => set({ qrImage }),
  setReservations: (reservations) => set({ reservations }), // NUEVO
  clearUser: () => set({ user: null, users: [], qrImage: null, reservations: [] }),
}));
