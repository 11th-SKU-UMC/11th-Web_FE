import { useState } from "react";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { movies as initialMovies } from "../../data/movies";

export function MovieListPage() {
  const [movies, setMovies] = useState(initialMovies);

  function handleToggleBookmark(movieId: number) {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === movieId
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie,
      ),
    );
  }

  return (
    <main className="mx-auto max-w-[1040px] px-10 pt-8 pb-[60px]">
      <h1 className="mb-5 text-[22px] font-bold">영화 목록</h1>

      <MovieGrid
        movies={movies}
        onToggleBookmark={handleToggleBookmark}
      />

      <Pagination />
    </main>
  );
}