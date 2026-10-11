import { Link } from '@tanstack/react-router'
import { BookmarkButton } from '../bookmark-button'
import type { MovieCardView } from '../../utils/movies/to-movie-card'

type MovieCardProps = {
  movie: MovieCardView
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="min-w-0">
      <div className="relative aspect-[0.89] overflow-hidden rounded-lg bg-[#111318] xl:h-[272px] xl:aspect-auto">
        <Link
          className="group block h-full w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          to="/movies/$movieId"
          params={{ movieId: String(movie.id) }}
        >
          {movie.posterUrl ? (
            <img
              className="block h-full w-full object-cover transition-transform duration-[240ms] group-hover:scale-[1.025]"
              src={movie.posterUrl}
              alt={`${movie.title} 포스터`}
            />
          ) : (
            <span className="grid h-full w-full place-items-center bg-[#30343c] text-sm text-[#c3c8d0]">
              이미지 없음
            </span>
          )}
        </Link>
        <BookmarkButton
          movieId={movie.id}
          movieTitle={movie.title}
          variant="icon"
        />
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
        dateTime={movie.releaseDate || undefined}
      >
        {movie.releaseDate || '개봉일 미정'}
      </time>
    </article>
  )
}
