import type { Movie } from "../types/movie";
import { MovieCard } from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
  /** 넘기지 않으면 카드에 즐겨찾기 버튼을 보여주지 않는다. */
  onToggleBookmark?: (movieId: number) => void;
}

export function MovieGrid({ movies, onToggleBookmark }: MovieGridProps) {
  return (
    <div className="grid w-full grid-cols-5 gap-x-[18px] gap-y-5">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onToggleBookmark={
            onToggleBookmark ? () => onToggleBookmark(movie.id) : undefined
          }
        />
      ))}
    </div>
  );
}
