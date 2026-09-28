import { Link } from '@tanstack/react-router'
import type { Movie } from '../../types/movie'
import { cn } from '../../utils/cn'

type MovieCardProps = {
  movie: Movie
  onToggleBookmark: (movieId: number) => void
}

export function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  const bookmarkIcon = movie.isBookmarked
    ? '/icons/movie-icons/bookmark.svg'
    : '/icons/movie-icons/bookmark-outline.svg'

  return (
    <article className="min-w-0">
      <div className="relative aspect-[0.89] overflow-hidden rounded-lg bg-[#111318] xl:h-[272px] xl:aspect-auto">
        <Link
          className="group block h-full w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          to="/movies/$movieId"
          params={{ movieId: String(movie.id) }}
        >
          <img
            className="block h-full w-full object-cover transition-transform duration-[240ms] group-hover:scale-[1.025]"
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
          />
        </Link>
        <button
          className={cn(
            'absolute top-2 right-2 grid size-9 cursor-pointer place-items-center rounded-full border border-white p-2 text-white transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
            movie.isBookmarked
              ? 'border-blue-600 bg-blue-600'
              : 'bg-black/60',
          )}
          type="button"
          aria-label={`${movie.title} ${movie.isBookmarked ? '북마크 해제' : '북마크 추가'}`}
          aria-pressed={movie.isBookmarked}
          onClick={() => onToggleBookmark(movie.id)}
        >
          <img className="block invert" src={bookmarkIcon} alt="" />
        </button>
      </div>
      <Link
        className="mt-2.5 mb-px block truncate text-[13px] leading-[18px] font-bold text-white no-underline hover:text-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        to="/movies/$movieId"
        params={{ movieId: String(movie.id) }}
      >
        {movie.title}
      </Link>
      <time
        className="block text-xs leading-[17px] font-medium text-[#969da8]"
        dateTime={movie.releaseDate.replaceAll('.', '-')}
      >
        {movie.releaseDate}
      </time>
    </article>
  )
}
