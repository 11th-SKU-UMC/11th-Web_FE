import MovieGrid from "../../components/movies/movie-grid";
import { movies } from "../../data/movies";

export function MovieListPage() {
  return (
    <main className="flex-1 bg-[#f5f6f8] px-5 py-6 sm:px-8 min-[1101px]:px-20">
      <h1 className="mb-5 text-[32px] leading-10 font-extrabold text-[#17191e]">
        영화 목록
      </h1>
      <MovieGrid movies={movies} />
    </main>
  );
}
