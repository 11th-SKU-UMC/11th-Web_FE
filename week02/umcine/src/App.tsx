import { useState } from "react";
import "./App.css";
import Pagination from "./components/pagination"
import Header from "./components/header";
import MovieGrid from "./components/movie-grid";
import { movies as initialMovies } from "./data/movies";

export default function App() {
  const [movies, setMovies] = useState(initialMovies);

  function handleToggleBookmark(movieId: number) {
  setMovies((current) => {              // ① "다음 상태를 계산해줄게" 시작
    return current.map((movie) => {     // ② map 결과를 밖으로(setMovies에게) 반환
      return (                           // ③ 각 movie마다 뭘 반환할지
        movie.id === movieId
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie
      );
    });
  });
}

  return (
  <>
    <Header />
      <main className="page">
        <h1 className="page-title">영화 목록</h1>
        <MovieGrid movies={movies} onToggleBookmark={handleToggleBookmark} />
        <Pagination />
      </main>
  </>
);
}