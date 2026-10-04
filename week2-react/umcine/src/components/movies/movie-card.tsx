import { Link } from '@tanstack/react-router'
import { BookmarkButton } from '../bookmark-button'
import type { Movie } from '../../types/movie'

type MovieCardProps = {
  movie: Movie
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
          <img
            className="block h-full w-full object-cover transition-transform duration-[240ms] group-hover:scale-[1.025]"
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
          />
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
        dateTime={movie.releaseDate.replaceAll('.', '-')}
      >
        {movie.releaseDate}
      </time>
    </article>
  )
}
