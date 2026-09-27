import "./App.css";
import Header from "./components/header";
import MovieGrid from "./components/movie-grid";
import { movies } from "./data/movies";

export default function App() {
  return (
    <>
      <Header />

      <main id="movie-list">
        <h1>영화 목록</h1>
        <MovieGrid movies={movies} />
      </main>
    </>
  );
}
