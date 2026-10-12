import { useState } from "react";
import type { Movie } from "../../types/movie";
import MovieCard from "./movie-card";

interface MovieGridProps {
  movies: Movie[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  const [movieList, setMovieList] = useState<Movie[]>(movies);

  const handleToggleBookmark = (movieId: number) => {
    setMovieList((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === movieId
          ? {
              ...movie,
              isBookmarked: !movie.isBookmarked,
            }
          : movie,
      ),
    );
  };

  return (
    <section
      className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      aria-label="영화 목록"
    >
      {movieList.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onToggleBookmark={handleToggleBookmark}
        />
      ))}
    </section>
  );
}
