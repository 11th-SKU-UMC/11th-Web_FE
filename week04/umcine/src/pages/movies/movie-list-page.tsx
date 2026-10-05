import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { movies as initialMovies } from "../../data/movies";
import { useBookmarkStore } from "../../stores/bookmark-store";

export function MovieListPage() {
  const bookmarkedMovieIds = useBookmarkStore((state) => state.bookmarkedMovieIds);
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);
  const movies = initialMovies.map((movie) => ({
    ...movie,
    isBookmarked: bookmarkedMovieIds.includes(movie.id),
  }));

  return (
    <>
      <main className="mx-auto w-[calc(100%-48px)] max-w-[1280px] flex-1 pt-6 max-sm:w-[calc(100%-36px)] max-sm:pt-[22px]">
        <h1 className="mb-3 text-[23px] leading-[1.4] font-bold tracking-[-0.65px]">영화 목록</h1>
        <MovieGrid movies={movies} onToggleBookmark={toggleBookmark} />
        <Pagination />
      </main>
      <footer className="mx-auto flex min-h-[34px] w-[calc(100%-48px)] max-w-[1280px] items-center justify-end gap-1.5 border-t border-[#e8eaee] text-[9px] text-[#9299a2] max-sm:w-[calc(100%-36px)] max-sm:justify-center">
        <img className="h-auto w-[42px]" src="/images/logos/tmdb-logo.svg" alt="TMDB" />
        <span>This product uses the TMDB API but is not endorsed or certified by TMDB.</span>
      </footer>
    </>
  );
}
