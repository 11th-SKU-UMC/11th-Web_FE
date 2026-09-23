import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export function MovieCard({
  movie,
  isBookmarked,
  onToggleBookmark,
}: MovieCardProps) {
  return (
    <article className="movie-card">
      <div className="movie-card-poster">
        <img src={movie.posterPath} alt={movie.title} />

        <button onClick={onToggleBookmark}>
          {isBookmarked ? "★" : "☆"}
        </button>
      </div>

      <div className="movie-card-info">
        <h3>{movie.title}</h3>
        <p>{movie.releaseDate}</p>
      </div>
    </article>
  );
}