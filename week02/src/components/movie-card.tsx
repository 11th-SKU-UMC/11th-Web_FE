import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <article className="movie-card">
      <div className="poster-container">
        <img src={movie.posterPath} alt={movie.title} className="poster-img" />
        <button
          type="button"
          className="bookmark-btn"
          onClick={() => onToggleBookmark(movie.id)}
          aria-label={`${movie.title} 북마크 토글`}
        >
          <img
            src={movie.isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"}
            alt="북마크 아이콘"
            className="icon-img"
          />
        </button>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="release-date">{movie.releaseDate}</p>
      </div>
    </article>
  );
}