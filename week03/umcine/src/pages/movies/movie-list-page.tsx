import { useState } from "react";
import Pagination from "../../components/movies/pagination";
import MovieGrid from "../../components/movies/movie-grid";
import { movies as initialMovies } from "../../data/movies";

export function MovieListPage() {
  const [movies, setMovies] = useState(initialMovies);

  function handleToggleBookmark(movieId: number) {
    setMovies((current) =>
      current.map((movie) =>
        movie.id === movieId
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie,
      ),
    );
  }

  return (
    <main className="mx-auto max-w-[1120px] px-6 py-8">
      <h1 className="mb-6 text-[1.8rem] font-bold">영화 목록</h1>
      <MovieGrid movies={movies} onToggleBookmark={handleToggleBookmark} />
      <Pagination />
    </main>
  );
}