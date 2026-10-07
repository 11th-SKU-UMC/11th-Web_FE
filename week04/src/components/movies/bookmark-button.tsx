import { useBookmarkStore } from "../../stores/bookmark-store";
import { cn } from "../../utils/cn";

interface BookmarkButtonProps {
  movieId: number;
  movieTitle: string;
  className?: string;
}

export function BookmarkButton({ movieId, movieTitle, className }: BookmarkButtonProps) {
  const isBookmarked = useBookmarkStore((state) => state.bookmarkedMovieIds.includes(movieId));
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  return (
    <button
      type="button"
      className={cn(
        "grid size-9 cursor-pointer place-items-center rounded-lg border border-white/75 bg-slate-950/80",
        isBookmarked && "border-blue-500 bg-blue-600",
        className,
      )}
      aria-label={`${movieTitle} 북마크 ${isBookmarked ? "해제" : "추가"}`}
      aria-pressed={isBookmarked}
      onClick={() => toggleBookmark(movieId)}
    >
      <img className="size-[22px] brightness-0 invert" src={isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"} alt="" />
    </button>
  );
}
