import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import LoginPage from "../pages/LoginPage";
import MovieDetailPage from "../pages/MovieDetailPage";
import MoviePage from "../pages/MoviePage";
import MyPage from "../pages/MyPage";
import SearchPage from "../pages/SearchPage";
import SignupPage from "../pages/SignupPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <MoviePage />,
      },
      {
        path: "movie/:movieId",
        element: <MovieDetailPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "mypage",
        element: <MyPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
    ],
  },
]);
