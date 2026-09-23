import { Link } from "react-router-dom";
import type { Movie } from "../types/movie";
import { Icon } from "./Icon";

interface MovieCardProps {
  movie: Movie;
  /** 넘기지 않으면 즐겨찾기 버튼을 보여주지 않는다. */
  onToggleBookmark?: () => void;
}

export function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <article className="flex flex-col gap-1">
      <div className="relative aspect-[2/3] overflow-hidden rounded-[10px] bg-page">
        <Link to={`/movie/${movie.id}`} className="block size-full">
          <img
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
            className="size-full object-cover"
          />
        </Link>

        {onToggleBookmark && (
          <button
            type="button"
            onClick={onToggleBookmark}
            aria-pressed={movie.isBookmarked}
            aria-label={`${movie.title} 즐겨찾기`}
            className={`absolute top-2.5 right-2.5 flex size-[34px] items-center justify-center rounded-lg border ${
              movie.isBookmarked
                ? "border-action bg-action"
                : "border-surface bg-primary"
            }`}
          >
            <Icon
              name={movie.isBookmarked ? "bookmark" : "bookmark-outline"}
              className="size-6 text-surface"
            />
          </button>
        )}
      </div>

      <Link
        to={`/movie/${movie.id}`}
        className="truncate pt-[5px] text-sm font-bold text-primary"
      >
        {movie.title}
      </Link>

      <p className="text-xs text-tertiary">{movie.releaseDate}</p>
    </article>
  );
}
