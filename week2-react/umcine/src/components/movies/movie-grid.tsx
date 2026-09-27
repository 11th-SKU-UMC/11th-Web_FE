import type { Movie } from '../../types/movie'
import { MovieCard } from './movie-card'

type MovieGridProps = {
  movies: Movie[]
  onToggleBookmark: (movieId: number) => void
}

export function MovieGrid({ movies, onToggleBookmark }: MovieGridProps) {
  if (movies.length === 0) {
    return <p className="my-12 text-center text-[#969da8]">표시할 영화가 없어요.</p>
  }

  return (
    <section
      className="grid grid-cols-1 gap-x-3 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-4 xl:gap-y-[22px]"
      aria-label="영화 목록"
    >
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onToggleBookmark={onToggleBookmark}
        />
      ))}
    </section>
  )
}
