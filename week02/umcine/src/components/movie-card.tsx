import type { Movie } from '../types/movie';

type MovieCardProps = { movie: Movie; onToggleBookmark: (id: number) => void };

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <article className="movie-card">
      <div className="poster-wrap">
        <img className="poster" src={movie.posterPath} alt={`${movie.title} 포스터`} />
        <button
          className={`bookmark-button${movie.isBookmarked ? ' is-bookmarked' : ''}`}
          type="button"
          aria-label={movie.isBookmarked ? `${movie.title} 북마크 해제` : `${movie.title} 북마크`}
          aria-pressed={movie.isBookmarked}
          onClick={() => onToggleBookmark(movie.id)}
        >
          <img src={`/icons/movie-icons/bookmark${movie.isBookmarked ? '' : '-outline'}.svg`} alt="" />
        </button>
      </div>
      <h2 className="movie-title" title={movie.title}>{movie.title}</h2>
      <p className="release-date">{movie.releaseDate}</p>
    </article>
  );
}
