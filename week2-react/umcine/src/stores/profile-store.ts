import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ email: state.email, nickname: state.nickname }),
    },
  ),
);
