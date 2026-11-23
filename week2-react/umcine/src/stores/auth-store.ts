import { create } from "zustand";
import { persist } from "zustand/middleware";
import { browserStorage } from "./browser-storage";

interface AuthStore {
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      setAccessToken: (accessToken) => set({ accessToken }),
    }),
    {
      name: "umcine-auth-store",
      storage: browserStorage,
      skipHydration: true,
      partialize: (state) => ({ accessToken: state.accessToken }),
    },
  ),
);
