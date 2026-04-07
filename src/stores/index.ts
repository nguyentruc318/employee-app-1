import { create } from "zustand";
import { createAuthSlice, type AuthSlice } from "./slice/auth.slice";
import { persist } from "zustand/middleware";
type AppSlice = AuthSlice;
export const useAppStore = create<AppSlice>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
    }),
    {
      name: "auth-storage",
    },
  ),
);
