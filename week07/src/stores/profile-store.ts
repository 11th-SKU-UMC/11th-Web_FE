import { create } from "zustand";
import { user } from "../data/user";

const PROFILE_STORAGE_KEY = "umcine-profile";

interface ProfileState {
  nickname: string;
  updateNickname: (nickname: string) => void;
}

function readNickname() {
  try {
    const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (storedProfile) {
      const profile = JSON.parse(storedProfile) as { nickname?: unknown };
      if (typeof profile.nickname === "string" && profile.nickname.trim()) {
        return profile.nickname;
      }
    }
  } catch {
    // 저장된 값이 없거나 읽을 수 없으면 기본 프로필을 사용합니다.
  }
  return user.nickname;
}

export const useProfileStore = create<ProfileState>((set) => ({
  nickname: readNickname(),
  updateNickname: (nickname) => {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify({ nickname }));
    set({ nickname });
  },
}));
