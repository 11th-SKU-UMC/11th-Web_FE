import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { cn } from "../../utils/cn";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  const bookmarkIcon = movie.isBookmarked
    ? "/icons/bookmark.svg"
    : "/icons/bookmark-outline.svg";

  return (
    <article className="flex w-full min-w-0 flex-col gap-1">
      <div className="relative h-[274px] w-full overflow-hidden rounded-[10px] bg-[#e3e6eb]">
        <Link
          to="/movies/$movieId"
          params={{ movieId: String(movie.id) }}
          aria-label={`${movie.title} 상세 보기`}
          className="block h-full w-full"
        >
          <img
            className="block h-full w-full object-cover"
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
          />
        </Link>

        <button
          className={cn(
            "bookmark-button absolute right-2.5 top-2.5 grid h-[34px] w-[34px] cursor-pointer place-items-center rounded-lg border border-white p-0",
            movie.isBookmarked ? "bg-blue-600" : "bg-[#17191e]",
          )}
          type="button"
          aria-label={`${movie.title} 북마크`}
          aria-pressed={movie.isBookmarked}
          onClick={() => onToggleBookmark(movie.id)}
        >
          <img className="h-6 w-6 invert" src={bookmarkIcon} alt="" />
        </button>
      </div>

      <h2 className="m-0 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-extrabold leading-[17px] text-[#17191e]">
        {movie.title}
      </h2>
      <p className="m-0 overflow-hidden text-ellipsis whitespace-nowrap text-xs leading-[14px] font-normal text-[#969da8]">
        {movie.releaseDate}
      </p>
    </article>
  );
}
