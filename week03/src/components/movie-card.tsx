import { Link } from "react-router-dom";
import type { Movie } from "../types/movie";
import Icon from "./icon";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark?: (id: number) => void;
}

function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  const { id, title, releaseDate, posterPath, isBookmarked } = movie;

  return (
    <article className="flex flex-col gap-1">
      <div className="relative aspect-[241.6/274] w-full overflow-hidden rounded-[10px] bg-surface">
        <Link to={`/movies/${id}`}>
          <img
            src={posterPath}
            alt={`${title} 포스터`}
            className="size-full object-cover"
          />
        </Link>

        {onToggleBookmark && (
          <button
            type="button"
            aria-label={`${title} 즐겨찾기`}
            aria-pressed={isBookmarked}
            onClick={() => onToggleBookmark(id)}
            className={`absolute top-2.5 right-2.5 flex size-[34px] items-center justify-center rounded-lg border text-white ${
              isBookmarked
                ? "border-primary bg-primary"
                : "border-white bg-ink"
            }`}
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
