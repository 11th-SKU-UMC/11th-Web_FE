import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type MovieSortOrder = "default" | "title";

interface MoviePreferenceStore {
  sortOrder: MovieSortOrder;
  setSortOrder: (sortOrder: MovieSortOrder) => void;
}

export const useMoviePreferenceStore = create<MoviePreferenceStore>()(
  persist(
    (set) => ({
      sortOrder: "default",
      setSortOrder: (sortOrder) => set({ sortOrder }),
    }),
    {
      name: "umcine-movie-preferences",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ sortOrder: state.sortOrder }),
    },
  ),
);
