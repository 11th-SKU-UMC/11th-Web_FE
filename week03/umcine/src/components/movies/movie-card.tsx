import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";

type MovieCardProps = { movie: Movie; onToggleBookmark: (id: number) => void };

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <article className="movie-card">
      <div className="poster-wrap">
        <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
          <img className="poster" src={movie.posterPath} alt={`${movie.title} 포스터`} />
        </Link>
        <button className={`bookmark-button${movie.isBookmarked ? " is-bookmarked" : ""}`} type="button" aria-label={movie.isBookmarked ? `${movie.title} 북마크 해제` : `${movie.title} 북마크`} aria-pressed={movie.isBookmarked} onClick={() => onToggleBookmark(movie.id)}>
          <img src={`/icons/movie-icons/bookmark${movie.isBookmarked ? "" : "-outline"}.svg`} alt="" />
        </button>
      </div>
      <h2 className="movie-title" title={movie.title}>
        <Link to="/movies/$movieId" 
        params={{ movieId: String(movie.id) }}>
              {movie.title}
        </Link>
      </h2>
      <p className="release-date">{movie.releaseDate}</p>
    </article>
  );
}
import { cn } from "../../utils/cn";

<button
  className={cn(
    "absolute right-2 top-2 rounded-full p-2 text-white",
    movie.isBookmarked ? "bg-blue-600" : "bg-black/60",
  )}
>
  북마크
</button>