import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { cn } from "../../utils/cn";

interface MovieCardProps {
  movie: Movie;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export function MovieCard({ movie, isBookmarked, onToggleBookmark }: MovieCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-[2/3] overflow-hidden bg-gray-200">
        <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }} className="block h-full">
          <img
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        </Link>
        <button
          type="button"
          aria-label={isBookmarked ? "북마크 해제" : "북마크"}
          aria-pressed={isBookmarked}
          onClick={onToggleBookmark}
          className={cn(
            "absolute right-3 top-3 rounded-full p-2 text-lg leading-none text-white shadow-sm transition hover:scale-105",
            isBookmarked ? "bg-blue-600" : "bg-black/60 hover:bg-black/75",
          )}
        >
          {isBookmarked ? "★" : "☆"}
        </button>
      </div>
      <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }} className="block p-4">
        <h3 className="truncate font-semibold text-gray-950">{movie.title}</h3>
        <p className="mt-1 text-sm text-gray-500">{movie.releaseDate}</p>
      </Link>
    </article>
  );
}
