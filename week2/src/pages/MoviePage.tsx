import { useState } from "react";
import { MovieGrid } from "../components/MovieGrid";
import { Pagination } from "../components/Pagination";
import { useMovies } from "../hooks/useMovies";

const TOTAL_PAGES = 5;

export default function MoviePage() {
  const { movies, toggleBookmark } = useMovies();
  const [page, setPage] = useState(1);

  return (
    <main className="flex flex-col gap-5 px-20 py-6">
      <h1 className="text-[38px] leading-11 font-bold tracking-[-1.71px] text-primary">
        영화 목록
      </h1>

      <MovieGrid movies={movies} onToggleBookmark={toggleBookmark} />

      <Pagination page={page} totalPages={TOTAL_PAGES} onChange={setPage} />
    </main>
  );
}
