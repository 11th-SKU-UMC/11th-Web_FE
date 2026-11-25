import { Link, useNavigate } from "react-router-dom";
import type { Movie } from "../types/movie";
import { cn } from "../lib/cn";
import Icon from "./icon";
import MovieImage from "./movie-image";
import { useAuthStore } from "../stores/auth-store";
import { useFavoritesQuery, useToggleFavoriteMutation } from "../hooks/use-favorites";

interface MovieCardProps {
  movie: Movie;
  showBookmark?: boolean;
}

function MovieCard({ movie, showBookmark = false }: MovieCardProps) {
  const { id, title, releaseDate, posterPath } = movie;
  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);
  const favoritesQuery = useFavoritesQuery();
  const toggleFavoriteMutation = useToggleFavoriteMutation(id);
  const isBookmarked = favoritesQuery.data?.some((favorite) => favorite.movieId === id) ?? false;

  const handleToggleFavorite = () => {
    if (!accessToken) {
      navigate("/login");
      return;
    }
    toggleFavoriteMutation.mutate(isBookmarked);
  };

  return (
    <article className="flex flex-col gap-1">
      <div className="relative aspect-[241.6/274] w-full overflow-hidden rounded-[10px] bg-surface">
        <Link to={`/movies/${id}`}>
          <MovieImage
            src={posterPath}
            alt={`${title} 포스터`}
          />
        </Link>

        {showBookmark && (
          <button
            type="button"
            aria-label={`${title} 즐겨찾기`}
            aria-pressed={isBookmarked}
            disabled={toggleFavoriteMutation.isPending}
            onClick={handleToggleFavorite}
            className={cn(
              "absolute top-2.5 right-2.5 flex size-[34px] items-center justify-center rounded-lg border border-white bg-ink text-white",
              isBookmarked && "border-primary bg-primary",
            )}
          >
            <Icon name={isBookmarked ? "bookmark" : "bookmark-outline"} />
          </button>
        )}
      </div>

      <Link to={`/movies/${id}`} className="pt-[5px] text-sm font-extrabold">
        {title}
      </Link>
      <p className="text-xs text-gray-400">{releaseDate}</p>
    </article>
  );
}

export default MovieCard;
