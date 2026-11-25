import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import AuthLayout from "./components/auth-layout";
import MovieListPage from "./pages/movie-list-page";
import MovieDetailPage from "./pages/movie-detail-page";
import MovieSearchPage from "./pages/movie-search-page";
import LoginPage from "./pages/login-page";
import SignupPage from "./pages/signup-page";
import MyPage from "./pages/my-page";
import MyPageEdit from "./pages/my-page-edit";
import { useAuthStore } from "./stores/auth-store";

function App() {
  const accessToken = useAuthStore((state) => state.accessToken);

  return (
    <div className="flex min-h-screen flex-col bg-surface font-sans text-ink">
      <Header />
      <Routes>
        <Route path="/" element={<MovieListPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailPage />} />
        <Route path="/search" element={<MovieSearchPage />} />
        <Route
          path="/login"
          element={accessToken ? <Navigate to="/" replace /> : <LoginPage />}
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<AuthLayout />}>
          <Route path="/my" element={<MyPage />} />
          <Route path="/my/edit" element={<MyPageEdit />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
