import type { StateCreator } from "zustand";
import type { AuthUser } from "../../types/employee.type";

export interface AuthSlice {
  user: AuthUser | null;
  login: (userData: AuthUser) => void;
  logout: () => void;
}
export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  user: null,
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
});
