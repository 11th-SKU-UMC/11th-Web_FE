import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { cn } from "../../utils/cn";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({
  movie,
  onToggleBookmark,
}: MovieCardProps) {
  return (
    <article className="min-w-0">
      <div className="relative h-[210px] w-full">
        <Link
          to="/movies/$movieId"
          params={{ movieId: String(movie.id) }}
        >
          <img
            className="block h-full w-full rounded-[6px] object-cover"
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
          />
        </Link>

        <button
          className={cn(
          "absolute top-[6px] right-[6px] flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-[4px] border p-[5px]",
          movie.isBookmarked
            ? "border-blue-600 bg-blue-600"
            : "border-white/80 bg-[rgba(20,20,20,0.75)]",
          )}
          onClick={() => onToggleBookmark(movie.id)}
          aria-label={
            movie.isBookmarked ? "북마크 해제" : "북마크 추가"
          }
        >
          <img
            className="block h-4 w-4 brightness-0 invert"
            src={
              movie.isBookmarked
                ? "/icons/bookmark.svg"
                : "/icons/bookmark-outline.svg"
            }
            alt=""
          />
        </button>
      </div>

      <h2 className="mt-[6px] mb-[2px] text-xs font-semibold leading-[1.3]">
        {movie.title}
      </h2>
      <p className="m-0 text-[10px] text-[#8a8a8a]">
        {movie.releaseDate}
      </p>
    </article>
  );
}