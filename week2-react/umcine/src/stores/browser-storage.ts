import { createJSONStorage } from "zustand/middleware";

// SSR에서는 저장소에 접근하지 않고, 마운트 이후 rehydrate()에서 복원해요.
export const browserStorage = createJSONStorage(() => ({
  getItem: (name: string) => typeof localStorage === "undefined" ? null : localStorage.getItem(name),
  setItem: (name: string, value: string) => {
    if (typeof localStorage !== "undefined") localStorage.setItem(name, value);
  },
  removeItem: (name: string) => {
    if (typeof localStorage !== "undefined") localStorage.removeItem(name);
  },
}));
