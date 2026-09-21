import { useState } from "react";
import { MovieGrid } from "../components/MovieGrid";
import { Pagination } from "../components/Pagination";
import { movies as initialMovies } from "../data/movies";

const TOTAL_PAGES = 5;

export default function MoviePage() {
  const [movies, setMovies] = useState(initialMovies);
  const [page, setPage] = useState(1);

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
    <main className="flex flex-col gap-5 px-20 py-6">
      <h1 className="text-[38px] leading-11 font-bold tracking-[-1.71px] text-primary">
        영화 목록
      </h1>

      <MovieGrid movies={movies} onToggleBookmark={handleToggleBookmark} />

      <Pagination page={page} totalPages={TOTAL_PAGES} onChange={setPage} />
    </main>
  );
}
