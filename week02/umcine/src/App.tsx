import { useState } from 'react';
import Header from './components/header';
import MovieGrid from './components/movie-grid';
import Pagination from './components/pagination';
import { movies as initialMovies } from './data/movie';
import type { Movie } from './types/movie';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);

  function handleToggleBookmark(movieId: number) {
    setMovies((currentMovies) => currentMovies.map((movie) =>
      movie.id === movieId ? { ...movie, isBookmarked: !movie.isBookmarked } : movie,
    ));
  }

  return (
    <>
      <Header />
      <main className="page-content" id="movies">
        <h1>영화 목록</h1>
        <MovieGrid movies={movies} onToggleBookmark={handleToggleBookmark} />
        <Pagination />
      </main>
      <footer className="site-footer"><img src="/images/logos/tmdb-logo.svg" alt="TMDB" /><span>This product uses the TMDB API but is not endorsed or certified by TMDB.</span></footer>
    </>
  );
}
