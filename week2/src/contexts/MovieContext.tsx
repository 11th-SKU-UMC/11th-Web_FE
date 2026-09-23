import { createContext, useState, type ReactNode } from "react";
import { movies as initialMovies } from "../data/movies";
import type { Movie } from "../types/movie";

export interface MovieContextValue {
  movies: Movie[];
  toggleBookmark: (movieId: number) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const MovieContext = createContext<MovieContextValue | null>(null);

export function MovieProvider({ children }: { children: ReactNode }) {
  const [movies, setMovies] = useState(initialMovies);

  function toggleBookmark(movieId: number) {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === movieId
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie,
      ),
    );
  }

  return (
    <MovieContext.Provider value={{ movies, toggleBookmark }}>
      {children}
    </MovieContext.Provider>
  );
}
