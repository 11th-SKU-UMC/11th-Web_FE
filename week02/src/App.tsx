import { useState } from "react";
import Header from "./components/header";
import MovieGrid from "./components/movie-grid";
import { movies as initialMovies } from "./data/movies";
import type { Movie } from "./types/movie";
import "./App.css";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);

  function handleToggleBookmark(movieId: number) {
    setMovies((currentMovies) => currentMovies.map((movie) =>
      movie.id === movieId ? { ...movie, isBookmarked: !movie.isBookmarked } : movie,
    ));
  }

  return (
    <div className="app">
      <Header />
      <main className="movie-page">
        <div className="content">
          <h1 className="page-title">영화 목록</h1>
          <MovieGrid movies={movies} onToggleBookmark={handleToggleBookmark} />
        </div>
      </main>
      <footer className="footer">
        <div className="footer-inner">
          <img className="tmdb-logo" src="/images/logos/tmdb-logo.svg" alt="TMDB" />
          <p>This product uses the TMDB API but is not endorsed or certified by <u>TMDB</u>.</p>
        </div>
      </footer>
    </div>
  );
}
