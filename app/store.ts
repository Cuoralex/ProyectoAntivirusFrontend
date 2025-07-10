import { create } from "zustand";

interface AuthState {
  userId: number | null;
  setUserId: (id: number) => void;
  registrationSuccess: boolean;
  setRegistrationSuccess: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  setUserId: (id) => set({ userId: id }),
  registrationSuccess: false,
  setRegistrationSuccess: (value) => set({ registrationSuccess: value }),
}));
