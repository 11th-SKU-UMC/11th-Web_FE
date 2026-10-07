import { MovieGrid } from "../../components/movies/movie-grid";
import { movies } from "../../data/movies";

export function MovieListPage() {
  return (
    <main className="min-h-[calc(100vh-137px)] bg-[#f5f6f8] py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-[34px]">영화 목록</h1>
        <MovieGrid movies={movies} />
      </div>
    </main>
  );
}
