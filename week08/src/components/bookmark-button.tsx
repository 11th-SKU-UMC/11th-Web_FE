import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth-store";
import { useFavoritesQuery, useToggleFavoriteMutation } from "../hooks/use-favorites";
import { cn } from "../lib/cn";
import Icon from "./icon";

interface BookmarkButtonProps {
  movieId: number;
}

export function BookmarkButton({ movieId }: BookmarkButtonProps) {
  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);
  const favoritesQuery = useFavoritesQuery();
  const toggleFavoriteMutation = useToggleFavoriteMutation(movieId);
  const isBookmarked = favoritesQuery.data?.some((favorite) => favorite.movieId === movieId) ?? false;

  const handleToggleFavorite = () => {
    if (!accessToken) {
      navigate("/login");
      return;
    }
    toggleFavoriteMutation.mutate(isBookmarked);
  };

  return (
    <button
      type="button"
      aria-pressed={isBookmarked}
      disabled={toggleFavoriteMutation.isPending}
      onClick={handleToggleFavorite}
      className={cn(
        "flex h-8 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-xs font-extrabold text-gray-600",
        isBookmarked && "border-primary bg-primary text-white",
      )}
    >
      <Icon
        name={isBookmarked ? "bookmark" : "bookmark-outline"}
        size={14}
      />
      {isBookmarked ? "북마크 해제" : "북마크 추가"}
    </button>
  );
}
