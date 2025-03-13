import { create } from "zustand";

interface AuthState {
  registrationSuccess: boolean;
  setRegistrationSuccess: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  registrationSuccess: false,
  setRegistrationSuccess: (value) => set({ registrationSuccess: value }),
}));
