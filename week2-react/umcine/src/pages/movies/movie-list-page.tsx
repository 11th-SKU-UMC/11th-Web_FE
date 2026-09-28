import { useState } from 'react'
import { MovieGrid } from '../../components/movies/movie-grid'
import { Pagination } from '../../components/movies/pagination'
import { movies as initialMovies } from '../../data/movies'
import type { Movie } from '../../types/movie'

const TOTAL_PAGES = 5

export function MovieListPage() {
  const [movies, setMovies] = useState<Movie[]>(initialMovies)
  const [currentPage, setCurrentPage] = useState(1)

  const handleToggleBookmark = (movieId: number) => {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === movieId
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie,
      ),
    )
  }

  return (
    <main className="mx-auto min-h-[calc(100vh-64px)] w-full max-w-[1440px] px-5 py-9 sm:min-h-[calc(100vh-72px)] sm:px-7 sm:py-12 lg:px-12 xl:px-20">
      <div className="mb-6">
        <p className="mb-1 text-[11px] font-extrabold tracking-[0.14em] text-[#4f83ff]">
          UMCINE COLLECTION
        </p>
        <h1 className="text-[28px] leading-10 font-extrabold tracking-[-0.04em] text-white sm:text-[34px] lg:text-[40px] lg:leading-12">
          영화 목록
        </h1>
      </div>
      <MovieGrid movies={movies} onToggleBookmark={handleToggleBookmark} />
      <Pagination
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        onPageChange={setCurrentPage}
      />
    </main>
  )
}
