import type { Movie } from '../types/movie'

type MovieCardProps = {
  movie: Movie
  onToggleBookmark: (movieId: number) => void
}

export function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  const bookmarkIcon = movie.isBookmarked
    ? '/icons/movie-icons/bookmark.svg'
    : '/icons/movie-icons/bookmark-outline.svg'

  return (
    <article className="movie-card">
      <div className="movie-card__poster-wrap">
        <img
          className="movie-card__poster"
          src={movie.posterPath}
          alt={`${movie.title} 포스터`}
        />
        <button
          className={`bookmark-button${movie.isBookmarked ? ' bookmark-button--active' : ''}`}
          type="button"
          aria-label={`${movie.title} ${movie.isBookmarked ? '북마크 해제' : '북마크 추가'}`}
          aria-pressed={movie.isBookmarked}
          onClick={() => onToggleBookmark(movie.id)}
        >
          <img src={bookmarkIcon} alt="" />
        </button>
      </div>
      <h2>{movie.title}</h2>
      <time dateTime={movie.releaseDate.replaceAll('.', '-')}>
        {movie.releaseDate}
      </time>
    </article>
  )
}
