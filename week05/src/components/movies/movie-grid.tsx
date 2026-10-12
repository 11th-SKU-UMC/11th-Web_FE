import type { TmdbMovieListItem } from "../../api/movies/models";
import { useBookmarkStore } from "../../stores/bookmark-store";
import MovieCard from "./movie-card";

interface MovieGridProps {
  movies: TmdbMovieListItem[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  const bookmarkedMovieIds = useBookmarkStore(
    (state) => state.bookmarkedMovieIds,
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  return (
    <section
      className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      aria-label="영화 목록"
    >
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isBookmarked={bookmarkedMovieIds.includes(movie.id)}
          onToggleBookmark={toggleBookmark}
        />
      ))}
    </section>
  );
}
