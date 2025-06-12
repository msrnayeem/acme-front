import { create } from "zustand";

export type User = {
  id: number;
  name?: string | null;
  email: string;
  password: string;
  otp?: string | null;
  otpExpiresAt?: string | null; // DateTime comes as string in JSON
  verified: boolean;
  role: string;
  createdAt: string; // ISO string when fetched from API
  updatedAt: string;
};

type UserState = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
