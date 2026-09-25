import { useState } from 'react'
import './App.css'
import { Header } from './components/header'
import { MovieGrid } from './components/movie-grid'
import { Pagination } from './components/pagination'
import { movies as initialMovies } from './data/movies'
import type { Movie } from './types/movie'

const TOTAL_PAGES = 5

export default function App() {
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
    <main className="movie-page">
      <Header />
      <MovieGrid movies={movies} onToggleBookmark={handleToggleBookmark} />
      <Pagination
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        onPageChange={setCurrentPage}
      />
    </main>
  )
}
