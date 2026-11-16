import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface BookmarkStore {
  bookmarkedMovieIds: number[];
  toggleBookmark: (movieId: number) => void;
  isBookmarked: (movieId: number) => boolean;
}

export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set, get) => ({
      bookmarkedMovieIds: [],

      toggleBookmark: (movieId: number) =>
        set((state) => {
          const exists = state.bookmarkedMovieIds.includes(movieId);
          return {
            bookmarkedMovieIds: exists
              ? state.bookmarkedMovieIds.filter((id) => id !== movieId)
              : [...state.bookmarkedMovieIds, movieId],
          };
        }),

      isBookmarked: (movieId: number) => get().bookmarkedMovieIds.includes(movieId),
    }),
    {
      name: "umcine-bookmark-store", // Web Storage에 저장될 Key 이름
      storage: createJSONStorage(() => localStorage), // 저장소 종류
      partialize: (state) => ({
        bookmarkedMovieIds: state.bookmarkedMovieIds, // 저장할 상태만 선택
      }),
    }
  )
);