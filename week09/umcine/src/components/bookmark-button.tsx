import { useFavoriteToggle } from "../hooks/use-favorites";
import { cn } from "../utils/cn";

interface BookmarkButtonProps {
  movieId: number;
}

export function BookmarkButton({ movieId }: BookmarkButtonProps) {
  const { favoriteMovieIds, toggleFavorite, isPending } = useFavoriteToggle();
  const isBookmarked = favoriteMovieIds.includes(movieId);

  return (
    <button
      type="button"
      aria-pressed={isBookmarked}
      disabled={isPending}
      onClick={() => toggleFavorite(movieId)}
      className={cn(
        "flex cursor-pointer items-center gap-1.5 rounded-md border px-2.5 py-1 text-[0.7rem] font-bold disabled:cursor-not-allowed disabled:opacity-60",
        isBookmarked
          ? "border-[#2447cc] bg-[#2447cc] text-white"
          : "border-[#e5e7eb] bg-white text-[#111]",
      )}
    >
      <img
        src={
          isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"
        }
        alt=""
        className={cn("h-3 w-3", isBookmarked && "brightness-0 invert")}
      />
      {isBookmarked ? "북마크 해제" : "북마크 추가"}
    </button>
  );
}