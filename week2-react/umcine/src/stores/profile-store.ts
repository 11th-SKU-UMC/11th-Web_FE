import { create } from "zustand";
import { persist } from "zustand/middleware";
import { browserStorage } from "./browser-storage";

interface ProfileStore {
  email: string;
  nickname: string;
  setProfile: (profile: { email: string; nickname: string }) => void;
  setEmail: (email: string) => void;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      email: "",
      nickname: "",
      setProfile: (profile) => set(profile),
      setEmail: (email) => set({ email }),
    }),
    {
      name: "umcine-profile-preview",
      storage: browserStorage,
      skipHydration: true,
      partialize: (state) => ({ email: state.email, nickname: state.nickname }),
    },
  ),
);
