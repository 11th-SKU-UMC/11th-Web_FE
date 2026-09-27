import { useState } from "react";
import { movies as initialMovies } from "./data/movies";
import Header from "./components/header";
import MovieGrid from "./components/movie-grid";
import Pagination from "./components/pagination";
import "./App.css";

export default function App() {
  const [movieList, setMovieList] = useState(initialMovies);

  const handleToggleBookmark = (movieId: number) => {
    setMovieList((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === movieId
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie
      )
    );
  };

  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        <h2 className="page-title">영화 목록</h2>
        <MovieGrid movies={movieList} onToggleBookmark={handleToggleBookmark} />
        <Pagination 
            currentPage={1} 
            totalPages={3} 
            onPageChange={(page) => console.log(page)} 
            />
      </main>
    </div>
  );
}