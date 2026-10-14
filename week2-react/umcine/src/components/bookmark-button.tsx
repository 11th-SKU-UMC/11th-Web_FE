import { useBookmarkStore } from "../stores/bookmark-store";
import { cn } from "../utils/cn";

interface BookmarkButtonProps {
  movieId: number;
  movieTitle?: string;
  variant?: "text" | "icon";
}

export function BookmarkButton({
  movieId,
  movieTitle,
  variant = "text",
}: BookmarkButtonProps) {
  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(movieId),
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  const label = isBookmarked ? "북마크 해제" : "북마크 추가";

  return (
    <button
      className={cn(
        variant === "icon"
          ? "absolute top-2 right-2 grid size-9 cursor-pointer place-items-center rounded-full border border-white p-2 text-white transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          : "inline-flex cursor-pointer items-center rounded-lg border border-white/15 bg-[#191c23] px-3 py-2 text-sm font-bold text-white transition-colors hover:border-blue-500 hover:text-blue-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        variant === "icon" && isBookmarked
          ? "border-blue-600 bg-blue-600"
          : variant === "icon" && "bg-black/60",
      )}
      type="button"
      aria-label={movieTitle ? `${movieTitle} ${label}` : label}
      aria-pressed={isBookmarked}
      onClick={() => toggleBookmark(movieId)}
    >
      {variant === "icon" ? (
        <img
          className="block invert"
          src={
            isBookmarked
              ? "/icons/movie-icons/bookmark.svg"
              : "/icons/movie-icons/bookmark-outline.svg"
          }
          alt=""
        />
      ) : (
        label
      )}
    </button>
  );
}
