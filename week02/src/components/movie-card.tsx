import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (id: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <div className="movie-card">
      <div className="poster-container">
        <img src={movie.posterPath} alt={movie.title} className="poster-img" />
        <button
          type="button"
          className="bookmark-button"
          onClick={() => onToggleBookmark(movie.id)}
          aria-label="북마크 토글"
        >
          <img
            src={
              movie.isBookmarked
                ? "/icons/bookmark-filled.svg"
                : "/icons/bookmark-empty.svg"
            }
            alt="북마크 아이콘"
          />
        </button>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-release">{movie.releaseDate}</p>
      </div>
    </div>
  );
}