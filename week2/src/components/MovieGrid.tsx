import type { Movie } from "../types/movie";
import { MovieCard } from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
  onToggleBookmark: (movieId: number) => void;
}

export function MovieGrid({ movies, onToggleBookmark }: MovieGridProps) {
  return (
    <div className="grid w-full grid-cols-5 gap-x-[18px] gap-y-5">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onToggleBookmark={() => onToggleBookmark(movie.id)}
        />
      ))}
    </div>
  );
}
