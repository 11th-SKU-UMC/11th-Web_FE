import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { cn } from "../../utils/cn";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <article className="min-w-0">
      <div className="relative aspect-[236/268] overflow-hidden rounded-[9px] bg-slate-200 shadow-sm">
        <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }} aria-label={`${movie.title} 상세 보기`}>
          <img className="block size-full object-cover transition duration-300 hover:scale-105" src={movie.posterPath} alt={`${movie.title} 포스터`} />
        </Link>
        <button
          type="button"
          className={cn(
            "absolute top-3 right-3 grid size-9 cursor-pointer place-items-center rounded-lg border border-white/75 bg-slate-950/80",
            movie.isBookmarked && "border-blue-500 bg-blue-600",
          )}
          aria-label={`${movie.title} 북마크 ${movie.isBookmarked ? "해제" : "추가"}`}
          aria-pressed={movie.isBookmarked}
          onClick={() => onToggleBookmark(movie.id)}
        >
          <img className="size-[22px] brightness-0 invert" src={movie.isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"} alt="" />
        </button>
      </div>
      <div className="pt-2.5">
        <h2 className="truncate text-[13px] leading-5 font-bold text-slate-800" title={movie.title}>
          <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }} className="hover:text-blue-600">{movie.title}</Link>
        </h2>
        <p className="mt-1 text-[11px] text-slate-500">{movie.releaseDate}</p>
      </div>
    </article>
  );
}
