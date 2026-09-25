import type { Movie } from '../types/movie'
import { MovieCard } from './movie-card'

type MovieGridProps = {
  movies: Movie[]
  onToggleBookmark: (movieId: number) => void
}

export function MovieGrid({ movies, onToggleBookmark }: MovieGridProps) {
  if (movies.length === 0) {
    return <p className="movie-list__empty">표시할 영화가 없어요.</p>
  }

  return (
    <section className="movie-list" aria-label="영화 목록">
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
