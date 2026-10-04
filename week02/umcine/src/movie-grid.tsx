import type { Movie } from "../types/movie";
import { MovieCard } from "./movie-card";

interface MovieGridProps {
  movies: Movie[];
  bookmarkedMovieIds: number[];
  onToggleBookmark: (movieId: number) => void;
}

export function MovieGrid({
  movies,
  bookmarkedMovieIds,
  onToggleBookmark,
}: MovieGridProps) {
  return (
    <section className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isBookmarked={bookmarkedMovieIds.includes(movie.id)}
          onToggleBookmark={() => onToggleBookmark(movie.id)}
        />
      ))}
    </section>
  );
}