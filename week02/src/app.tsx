import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { movies as initialMovies } from "./data/movies";
import Header from "./components/header";
import MovieListPage from "./pages/movie-list-page";
import MovieDetailPage from "./pages/movie-detail-page";
import MovieSearchPage from "./pages/movie-search-page";
import MovieSearchResultPage from "./pages/movie-search-result-page";
import LoginPage from "./pages/login-page";
import SignupPage from "./pages/signup-page";
import MyPage from "./pages/my-page";
import MyPageEdit from "./pages/my-page-edit";

function App() {
  const [movies, setMovies] = useState(initialMovies);

  // 선택한 영화의 북마크 상태만 반전
  const toggleBookmark = (id: number) => {
    setMovies((prev) =>
      prev.map((movie) =>
        movie.id === id
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie,
      ),
    );
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <MovieListPage movies={movies} onToggleBookmark={toggleBookmark} />
          }
        />
        <Route
          path="/movies/:id"
          element={
            <MovieDetailPage movies={movies} onToggleBookmark={toggleBookmark} />
          }
        />
        <Route path="/search" element={<MovieSearchPage />} />
        <Route path="/search/results" element={<MovieSearchResultPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/my" element={<MyPage movies={movies} />} />
        <Route path="/my/edit" element={<MyPageEdit />} />
      </Routes>
    </div>
  );
}

export default App;
