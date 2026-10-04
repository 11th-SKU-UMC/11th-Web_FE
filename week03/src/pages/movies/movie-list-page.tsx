import { useState } from "react";
import { movies } from "../../data/movies";
import { MovieGrid } from "../../components/movies/movie-grid";

export function MovieListPage() {
  const [bookmarkedMovieIds, setBookmarkedMovieIds] = useState<number[]>(
    movies.filter((movie) => movie.isBookmarked).map((movie) => movie.id),
  );

  function handleToggleBookmark(movieId: number) {
    setBookmarkedMovieIds((current) =>
      current.includes(movieId)
        ? current.filter((id) => id !== movieId)
        : [...current, movieId],
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-[1126px] px-5 py-10 sm:py-14">
      <section className="mb-8">
        <p className="mb-2 text-sm font-semibold text-blue-600">UMCINE</p>
        <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">영화</h1>
        <p className="mt-3 text-gray-500">지금 확인할 수 있는 영화 목록이에요.</p>
      </section>
      <MovieGrid
        movies={movies}
        bookmarkedMovieIds={bookmarkedMovieIds}
        onToggleBookmark={handleToggleBookmark}
      />
    </main>
  );
}
