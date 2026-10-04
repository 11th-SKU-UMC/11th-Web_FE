import { useState } from "react";
import Pagination from "../../components/movies/pagination";
import MovieGrid from "../../components/movies/movie-grid";
import { movies as initialMovies } from "../../data/movies";
import { useBookmarkStore } from "../../stores/bookmark-store";
import { cn } from "../../utils/cn";

type CardSize = "small" | "large";

const CARD_SIZE_KEY = "umcine-card-size";

function readCardSize(): CardSize {
  return localStorage.getItem(CARD_SIZE_KEY) === "large" ? "large" : "small";
}

export function MovieListPage() {
  const bookmarkedMovieIds = useBookmarkStore(
    (state) => state.bookmarkedMovieIds,
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);
  const [cardSize, setCardSize] = useState<CardSize>(readCardSize);

  const movies = initialMovies.map((movie) => ({
    ...movie,
    isBookmarked: bookmarkedMovieIds.includes(movie.id),
  }));

  function handleCardSize(size: CardSize) {
    setCardSize(size);
    localStorage.setItem(CARD_SIZE_KEY, size);
  }

  return (
    <main className="mx-auto max-w-[1120px] px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-[1.8rem] font-bold">영화 목록</h1>
        <div className="flex gap-2">
          {(["small", "large"] as const).map((size) => (
            <button
              key={size}
              type="button"
              aria-pressed={cardSize === size}
              onClick={() => handleCardSize(size)}
              className={cn(
                "cursor-pointer rounded-md border px-3 py-1 text-[0.75rem] font-bold",
                cardSize === size
                  ? "border-[#111] bg-[#111] text-white"
                  : "border-[#e5e7eb] bg-white text-[#111]",
              )}
            >
              {size === "small" ? "작게" : "크게"}
            </button>
          ))}
        </div>
      </div>
      <MovieGrid
        movies={movies}
        cardSize={cardSize}
        onToggleBookmark={toggleBookmark}
      />
      <Pagination />
    </main>
  );
}